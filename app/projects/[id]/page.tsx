import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import type { Project } from "@/types/project";

type ProjectPageProps = {
  params: { id: string };
};

export const generateMetadata = ({ params }: ProjectPageProps): Metadata => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.active)
    .sort((a, b) => {
      const orderA = a.status?.activeOrder ?? 0;
      const orderB = b.status?.activeOrder ?? 0;
      return orderA - orderB;
    });

  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    return {};
  }

  return generateSeoMetadata({
    title: `WebEquate | ${project.name}`,
    description: project.description,
    path: `/projects/${project.id}`,
    ogImage: `/${project.mainImage}`,
    ogImageAlt: project.name,
    ogType: "article",
  });
};

export const generateStaticParams = async () => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.active)
    .sort((a, b) => {
      const orderA = a.status?.activeOrder ?? 0;
      const orderB = b.status?.activeOrder ?? 0;
      return orderA - orderB;
    });

  return projects.map((project) => ({ id: project.id }));
};

const ProjectPage = ({ params }: ProjectPageProps) => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.active)
    .sort((a, b) => {
      const orderA = a.status?.activeOrder ?? 0;
      const orderB = b.status?.activeOrder ?? 0;
      return orderA - orderB;
    });

  const projectIndex = projects.findIndex((p) => p.id === params.id);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  return (
    <ProjectDetailClient
      name={basics.name}
      socialLinks={basics.socialLinks}
      project={project}
      prevProject={prevProject}
      nextProject={nextProject}
      path="projects"
    />
  );
};

export default ProjectPage;
