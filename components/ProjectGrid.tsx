// components/ProjectGrid.tsx
import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

interface ProjectGridProps {
  projects: Project[];
  path: string;
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, path }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-10 text-light-1 dark:text-light-1">
      {projects.map((project, index) => (
        <Link
          key={index}
          href={`/${path}/${project.id}`}
          className="group relative cursor-pointer"
        >
          <Image
            src={`/${project.thumbImage}`}
            alt={project.name}
            width={314}
            height={314}
            className="rounded shadow-md transition ease-in-out transform duration-300"
          />
          <div className="absolute inset-0 bg-black opacity-0 md:group-hover:opacity-50 transition duration-300 rounded shadow-md"></div>
          <div className="absolute inset-0 items-center justify-center opacity-0 md:group-hover:opacity-100 transition duration-300 p-4">
            <h2 className="text-xl mb-2">{project.name}</h2>
            <p className="mb-2">{project.type}</p>
            <p>@ {project.company}</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 md:group-hover:opacity-100 transition duration-300">
            <span className="text-4xl">+</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectGrid;
