// components/ExternalLink.tsx
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ExternalLinkProps {
  name: string;
  url: string;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ name, url }) => {
  const iconFromName = (name: string) => {
    switch (name) {
      case "Details":
        return <FaExternalLinkAlt />;
      case "Link":
        return <FaExternalLinkAlt />;
      default:
        return <FaExternalLinkAlt />;
    }
  };

  return (
    <Link
      href={url}
      target="_blank"
      className="flex justify-between mx-2 md:mx-3 hover:text-accent-dark dark:hover:text-accent-light"
    >
      <i className="mr-1 mt-1">{iconFromName(name)}</i>
      <span>{name}</span>
    </Link>
  );
};

export default ExternalLink;
