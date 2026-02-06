"use client";

import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import Header from "@/components/Header";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";
import type { Project } from "@/types/project";

const ProjectsPage = () => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.active)
    .sort((a, b) => {
      const orderA = a.status?.activeOrder ?? 0;
      const orderB = b.status?.activeOrder ?? 0;
      return orderA - orderB;
    });

  return (
    <div className="mx-auto">
      <Header socialLink={basics.socialLinks[0]} />

      <div className="text-base text-dark-2 dark:text-light-2">
        <ProjectGrid projects={projects} path="projects" />
      </div>

      <Footer name={basics.name} socialLinks={basics.socialLinks} />
    </div>
  );
};

export default ProjectsPage;
