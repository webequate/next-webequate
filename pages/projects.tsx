// pages/projects.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import type { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

interface ProjectsPageProps {
  name: string;
  socialLinks: SocialLink[];
  projects: Project[];
}

const ProjectsPage: NextPage<ProjectsPageProps> = ({
  name,
  socialLinks,
  projects,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Projects`}</title>
        <meta
          name="description"
          content="Selected projects by WebEquate."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://webequate.com/projects" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <ProjectGrid projects={projects} path="projects" />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  // Filter and sort projects data
  const projects: Project[] = projectsData
    .filter((project) => project.status.active)
    .sort((a, b) => {
      const orderA = a.status?.activeOrder ?? 0;
      const orderB = b.status?.activeOrder ?? 0;
      return orderA - orderB;
    });

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      projects: projects,
    },
    revalidate: 60,
  };
};

export default ProjectsPage;
