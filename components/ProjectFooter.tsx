// components/ProjectFooter.tsx
import ScreenshotLink from "@/components/ScreenshotLink";

interface ProjectFooterProps {
  description: string;
  tags: string;
  path?: string;
  mobile?: string;
  tablet?: string;
  laptop?: string;
  desktop?: string;
}

const ProjectFooter: React.FC<ProjectFooterProps> = ({
  description,
  tags,
  path,
  mobile,
  tablet,
  laptop,
  desktop,
}) => {
  return (
    <div className="text-base text-center items-center mx-auto">
      <p className="mb-4 md:mb-6">{description}</p>
      <p className="mb-4 md:mb-6">Tags: {tags}</p>
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
