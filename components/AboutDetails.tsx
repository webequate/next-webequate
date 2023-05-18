// components/AboutDetails.tsx
import Image from "next/image";

interface AboutDetailsProps {
  name: string;
  location: string;
  phone: string;
  website: string;
}

const AboutDetails: React.FC<AboutDetailsProps> = ({
  name,
  location,
  phone,
  website,
}) => {
  return (
    <div className="text-base text-left text-dark-2 dark:text-light-2 mt-0">
      <Image
        src="/images/allen-ai.jpg"
        alt="Allen"
        width={574}
        height={718}
        priority
        className="w-100 h-100 rounded-xl ring-1 ring-dark-3 dark:ring-light-3 md:mr-4"
      />
    </div>
  );
};

export default AboutDetails;
