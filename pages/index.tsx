// pages/index.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import Social from "@/components/Social";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

type HomePageProps = {
  name: string;
  titles: string[];
  summaryItems: string[];
  socialLinks: SocialLink[];
  projects: Project[];
};

const HomePage: NextPage<HomePageProps> = ({
  name,
  titles,
  summaryItems,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
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
          <ProjectGrid projects={projects} path="featured" />
        </div>
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find({ "status.webequateFeatured": true })
    .sort({ "status.webequateFeaturedOrder": 1 })
    .toArray();

  return {
    props: {
      name: basics.name,
      titles: basics.titles,
      summaryItems: basics.summaryItems,
      socialLinks: basics.socialLinks,
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 60,
  };
};

export default HomePage;
