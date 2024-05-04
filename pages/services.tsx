// pages/services.tsx
import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import type { Service } from "@/types/service";
import { SocialLink } from "@/types/basics";
import basics from "@/data/basics.json";
import servicesData from "@/data/services.json";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import ServiceGrid from "@/components/ServiceGrid";
import Footer from "@/components/Footer";

interface ServicesPageProps {
  name: string;
  socialLinks: SocialLink[];
  services: Service[];
}

const ServicesPage: NextPage<ServicesPageProps> = ({
  name,
  socialLinks,
  services,
}) => {
  return (
    <div className="mx-auto">
      <Head>
        <title>{`${name} | Services`}</title>
        <meta
          name="description"
          content="Services offered by WebEquate."
          key="desc"
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header socialLink={socialLinks[0]} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.9, delay: 0.2 }}
        className="text-base text-dark-2 dark:text-light-2"
      >
        <Heading text="Services" />
        <ServiceGrid services={services} />
      </motion.div>

      <Footer name={name} socialLinks={socialLinks} />
    </div>
  );
};

export const getStaticProps: GetStaticProps<ServicesPageProps> = async () => {
  // Filter and sort services data
  const services: Service[] = servicesData
    .filter((service) => service.display)
    .sort((a, b) => {
      const orderA = a.order ?? 0;
      const orderB = b.order ?? 0;
      return orderA - orderB;
    });

  return {
    props: {
      name: basics.name,
      socialLinks: basics.socialLinks,
      services: services,
    },
    revalidate: 60,
  };
};

export default ServicesPage;
