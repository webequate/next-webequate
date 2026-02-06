import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Projects | WebEquate",
  description:
    "Explore our portfolio of custom web development projects. We specialize in building responsive, high-performance websites and applications.",
  openGraph: {
    title: "Projects | WebEquate",
    description:
      "Explore our portfolio of custom web development projects. We specialize in building responsive, high-performance websites and applications.",
    url: "https://webequate.com/projects",
  },
  twitter: {
    title: "Projects | WebEquate",
    description:
      "Explore our portfolio of custom web development projects. We specialize in building responsive, high-performance websites and applications.",
  },
};

type ProjectsLayoutProps = {
  children: ReactNode;
};

const ProjectsLayout = ({ children }: ProjectsLayoutProps) => {
  return <>{children}</>;
};

export default ProjectsLayout;
