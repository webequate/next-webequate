import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateSeoMetadata } from "@/lib/seo";
import basics from "@/data/basics.json";
import projectsData from "@/data/projects.json";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import type { Project } from "@/types/project";

type FeaturedProjectPageProps = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: FeaturedProjectPageProps): Promise<Metadata> => {
  const { id } = await params;
  const projects: Project[] = projectsData
    .filter((project) => project.status?.featured)
    .sort((a, b) => {
      const orderA = a.status?.featuredOrder ?? 0;
      const orderB = b.status?.featuredOrder ?? 0;
      return orderA - orderB;
    });

  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {};
  }

  return generateSeoMetadata({
    title: `WebEquate | ${project.name}`,
    description: project.description,
    path: `/featured/${project.id}`,
    ogImage: `/${project.mainImage}`,
    ogImageAlt: project.name,
    ogType: "article",
    robots: {
      index: false,
      follow: true,
    },
  });
};

export const generateStaticParams = async () => {
  const projects: Project[] = projectsData
    .filter((project) => project.status?.featured)
    .sort((a, b) => {
      const orderA = a.status?.featuredOrder ?? 0;
      const orderB = b.status?.featuredOrder ?? 0;
      return orderA - orderB;
    });

  return projects.map((project) => ({ id: project.id }));
};

const FeaturedProjectPage = async ({ params }: FeaturedProjectPageProps) => {
  const { id } = await params;
  const projects: Project[] = projectsData
    .filter((project) => project.status?.featured)
    .sort((a, b) => {
      const orderA = a.status?.featuredOrder ?? 0;
      const orderB = b.status?.featuredOrder ?? 0;
      return orderA - orderB;
    });

  const projectIndex = projects.findIndex((p) => p.id === id);
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
      path="featured"
    />
  );
};

export default FeaturedProjectPage;
