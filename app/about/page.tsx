import type { Metadata } from "next";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import AboutContent from "@/components/AboutContent";
import AboutDetails from "@/components/AboutDetails";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About | WebEquate",
  description:
    "Learn about WebEquate and our team. We are passionate about creating exceptional web experiences for our clients.",
  openGraph: {
    title: "About | WebEquate",
    description:
      "Learn about WebEquate and our team. We are passionate about creating exceptional web experiences for our clients.",
    url: "https://webequate.com/about",
  },
  twitter: {
    title: "About | WebEquate",
    description:
      "Learn about WebEquate and our team. We are passionate about creating exceptional web experiences for our clients.",
  },
};

const AboutPage = () => {
  return (
    <div className="mx-auto">
      <Header socialLink={basics.socialLinks[0]} />

      <div className="flex flex-col lg:flex-row-reverse text-base text-dark-2 dark:text-light-2">
        <div className="w-full lg:w-1/2 mb-2 lg:mb-0 md:ml-6">
          <AboutContent
            aboutIntro={basics.aboutIntro}
            aboutItems={basics.aboutItems}
          />
        </div>

        <div className="w-full lg:w-1/2 mb-2 lg:mb-0 md:mr-6">
          <AboutDetails
            name={basics.name}
            location={basics.location}
            phone={basics.phone}
            website={basics.website}
          />
        </div>
      </div>

      <Footer name={basics.name} socialLinks={basics.socialLinks} />
    </div>
  );
};

export default AboutPage;
