// components/ProjectHeader.tsx
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

interface ProjectHeaderProps {
  title: string;
  prevId?: string;
  nextId?: string;
  path: string;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  title,
  prevId,
  nextId,
  path,
}) => {
  return (
    <div className="flex justify-between text-xl sm:text-2xl md:text-3xl">
      {prevId ? (
        <Link
          href={`/${path}/${prevId}`}
          title="Previous Project"
          aria-label="Previous Project"
        >
          <FaArrowLeft className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowLeft />
        </div>
      )}
      <h2 className="text-xl sm:text-2xl md:text-3xl text-center mb-2">
        {title}
      </h2>
      {nextId ? (
        <Link
          href={`/${path}/${nextId}`}
          title="Next Project"
          aria-label="Next Project"
        >
          <FaArrowRight className="sm:hover:text-accent-dark sm:dark:hover:text-accent-light" />
        </Link>
      ) : (
        <div className="invisible">
          <FaArrowRight />
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
