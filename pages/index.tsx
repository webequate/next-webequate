import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import type { Service } from "@/types/service";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import servicesData from "@/data/services.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import ServiceGrid from "@/components/ServiceGrid";
import Footer from "@/components/Footer";

type HomePageProps = {
  name: string;
  titles: string[];
  summaryItems: string[];
  socialLinks: SocialLink[];
  projects: Project[];
  services: Service[];
};

const HomePage: NextPage<HomePageProps> = ({
  name,
  titles,
  summaryItems,
  socialLinks,
  projects,
  services,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name}`}</title>
        <meta
          name="description"
          content="WebEquate. A full service web development partner. Intelligent Design, Creative Evolution."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webequate.com" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
      >
        <div className="w-full text-center">
          {titles.map((title, index) => (
            <h2
              key={index}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-dark dark:text-gradient-light mb-6"
            >
              <span>{title}</span>
            </h2>
          ))}
          {summaryItems.map((summaryItem, index) => (
            <p
              key={index}
              className="text-lg text-dark-2 dark:text-light-2 mb-4"
            >
              {summaryItem}
            </p>
          ))}
        </div>
        <div className="pt-8 border-t-2 border-light-1 dark:border-dark-2 mb-8">
          <Heading text="Featured Projects" />
          <ProjectGrid projects={projects} path="featured" />
          <div className="text-center mt-6">
            <Link
              href="/projects"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              More Projects
            </Link>
          </div>
        </div>
        <div className="pt-8 border-t-2 border-light-1 dark:border-dark-2 mb-8">
          <Heading text="Featured Services" />
          <ServiceGrid services={services} />
          <div className="text-center mt-6">
            <Link
              href="/services"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              More Services
            </Link>
          </div>
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // Filter and sort projects data
  const projects: Project[] = projectsData
    .filter((project) => project.status.featured)
    .sort((a, b) => {
      const orderA = a.status?.featuredOrder ?? 0;
      const orderB = b.status?.featuredOrder ?? 0;
      return orderA - orderB;
    });

  // Filter and sort featured services data
  const services: Service[] = servicesData
    .map((service) => ({
      ...service,
      status: {
        ...service.status,
        featuredOrder: service.status.featuredOrder ?? 0,
      },
    }))
    .filter((service) => service.status.featured) // Only include featured services
    .sort((a, b) => {
      const orderA = a.status.featuredOrder;
      const orderB = b.status.featuredOrder;
      return orderA - orderB;
    });

  return {
    props: {
      name: basics.name,
      titles: basics.titles,
      summaryItems: basics.summaryItems,
      socialLinks: basics.socialLinks,
      projects: projects,
      services: services, // Only featured services
    },
    revalidate: 60,
  };
};

export default HomePage;
