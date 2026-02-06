import type { Metadata } from "next";
import Link from "next/link";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import servicesData from "@/data/services.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import ServiceGrid from "@/components/ServiceGrid";
import Footer from "@/components/Footer";
import type { Project } from "@/types/project";
import type { Service } from "@/types/service";

export const metadata: Metadata = {
  title: "WebEquate | Full Service Web Development",
  description:
    "WebEquate is your full service web development partner. We build custom websites, web applications, and digital solutions.",
  openGraph: {
    title: "WebEquate | Full Service Web Development",
    description:
      "WebEquate is your full service web development partner. We build custom websites, web applications, and digital solutions.",
    url: "https://webequate.com",
  },
  twitter: {
    title: "WebEquate | Full Service Web Development",
    description:
      "WebEquate is your full service web development partner. We build custom websites, web applications, and digital solutions.",
  },
};

const HomePage = () => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.featured)
    .sort((a, b) => {
      const orderA = a.status?.featuredOrder ?? 0;
      const orderB = b.status?.featuredOrder ?? 0;
      return orderA - orderB;
    });

  const services: Service[] = servicesData
    .map((service) => ({
      ...service,
      status: {
        ...service.status,
        featuredOrder: service.status.featuredOrder ?? 0,
      },
    }))
    .filter((service) => service.status.featured)
    .sort((a, b) => {
      const orderA = a.status.featuredOrder;
      const orderB = b.status.featuredOrder;
      return orderA - orderB;
    });

  return (
    <div className="mx-auto">
      <Header socialLink={basics.socialLinks[0]} />

      <div className="w-full text-center">
        {basics.titles.map((title, index) => (
          <h2
            key={index}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-dark dark:text-gradient-light mb-6"
          >
            <span>{title}</span>
          </h2>
        ))}
        {basics.summaryItems.map((summaryItem, index) => (
          <p key={index} className="text-lg text-dark-2 dark:text-light-2 mb-4">
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

      <Footer name={basics.name} socialLinks={basics.socialLinks} />
    </div>
  );
};

export default HomePage;
