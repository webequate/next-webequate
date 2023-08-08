// components/ProjectFooter.tsx
import Link from "next/link";
import TagLink from "@/components/TagLink";
import ExternalLink from "@/components/ExternalLink";
import ScreenshotLink from "@/components/ScreenshotLink";

interface ProjectFooterProps {
  description: string;
  tags: string;
  details?: string;
  link?: string;
  path?: string;
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
}

const ProjectFooter: React.FC<ProjectFooterProps> = ({
  description,
  tags,
  details,
  link,
  path,
  mobile,
  tablet,
  laptop,
  desktop,
}) => {
  const splitTags = tags.split(", ");
  return (
    <div className="text-base text-center items-center mx-auto">
      <p className="mb-4 md:mb-6">{description}</p>
      {tags && (
        <div className="flex mx-auto justify-center mb-4 md:mb-6">
          <div className="hidden md:flex md:mr-6">Tags: </div>
          {splitTags.map((tag, index) => (
            <TagLink key={index} name={tag} />
          ))}
        </div>
      )}
      {(details || link) && (
        <div className="flex mx-auto justify-center mb-4 md:mb-6">
          <div className="hidden md:flex md:mr-6">Links: </div>
          {link && <ExternalLink name="Live Site" url={link} />}
          {details && <ExternalLink name="Further Details" url={details} />}
        </div>
      )}
      {path && (
        <div className="flex mx-auto justify-center mb-4 md:mb-6">
          <div className="hidden md:flex md:mr-6">Screenshots: </div>
          {mobile && <ScreenshotLink name="Mobile" path={path} url={mobile} />}
          {tablet && <ScreenshotLink name="Tablet" path={path} url={tablet} />}
          {laptop && <ScreenshotLink name="Laptop" path={path} url={laptop} />}
          {desktop && (
            <ScreenshotLink name="Desktop" path={path} url={desktop} />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectFooter;
