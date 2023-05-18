// pages/projects.tsx
import clientPromise from "@/lib/mongodb";
import { GetStaticProps, NextPage } from "next";
import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
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
      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <Heading text="Projects" />
        <ProjectGrid projects={projects} path="projects" />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const client = await clientPromise;
  const db = client.db("Portfolio");

  const projectsCollection = db.collection<Project>("projects");
  const projects: Project[] = await projectsCollection
    .find({ "status.webequate": true })
    .sort({ "status.webequateOrder": 1 })
    .toArray();

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: 60,
  };
};

export default ProjectsPage;
