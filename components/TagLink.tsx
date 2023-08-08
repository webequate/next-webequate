// components/TagLink.tsx
import Link from "next/link";
import { FaTag } from "react-icons/fa";

interface TagLinkProps {
  name: string;
}

const TagLink: React.FC<TagLinkProps> = ({ name }) => {
  const iconFromName = (name: string) => {
    switch (name) {
      case "Tag":
        return <FaTag />;
      case "Tag":
        return <FaTag />;
      default:
        return <FaTag />;
    }
  };

  return (
    <Link
      href="#"
      // href={`/projects/tag/${name}`}
      // target="_blank"
      className="flex justify-between mx-2 md:mx-3 hover:text-accent-dark dark:hover:text-accent-light"
    >
      <i className="mr-1 mt-1">{iconFromName(name)}</i>
      <span>{name}</span>
    </Link>
  );
};

export default TagLink;
