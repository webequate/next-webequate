"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSwipeable } from "react-swipeable";
import { useEffect, useState } from "react";
import type { Project } from "@/types/project";
import type { SocialLink } from "@/types/basics";
import Header from "@/components/Header";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectFooter from "@/components/ProjectFooter";
import Footer from "@/components/Footer";

type ProjectDetailClientProps = {
  name: string;
  socialLinks: SocialLink[];
  project: Project;
  prevProject: Project | null;
  nextProject: Project | null;
  path: "projects" | "featured";
};

const ProjectDetailClient = ({
  name,
  socialLinks,
  project,
  prevProject,
  nextProject,
  path,
}: ProjectDetailClientProps) => {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", checkMobile);
    checkMobile();

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (!nextProject) return;
      if (isMobile) {
        router.push(`/${path}/${nextProject.id}`);
      }
    },
    onSwipedRight: () => {
      if (!prevProject) return;
      if (isMobile) {
        router.push(`/${path}/${prevProject.id}`);
      }
    },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  return (
    <div className="mx-auto">
      <Header socialLink={socialLinks[0]} />

      <div className="justify-center mx-auto text-dark-1 dark:text-light-1">
        <ProjectHeader
          title={project.name}
          prevId={prevProject?.id}
          nextId={nextProject?.id}
          path={path}
        />
        <Image
          {...handlers}
          src={`/${project.mainImage}`}
          alt={project.name}
          width={1022}
          height={662}
          priority
          className="mx-auto ring-1 ring-dark-3 dark:ring-light-3 mb-4"
        />
        <ProjectFooter
          description={project.description}
          tags={project.tags}
          details={project.details}
          link={project.link}
          path={project.screenshots?.path}
          mobile={project.screenshots?.mobile}
          tablet={project.screenshots?.tablet}
          laptop={project.screenshots?.laptop}
          desktop={project.screenshots?.desktop}
        />
      </div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export default ProjectDetailClient;
