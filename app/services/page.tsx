import type { Metadata } from "next";
import basics from "@/data/basics.json";
import servicesData from "@/data/services.json";
import Header from "@/components/Header";
import ServiceGrid from "@/components/ServiceGrid";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import type { Service } from "@/types/service";

export const metadata: Metadata = {
  title: "Services | WebEquate",
  description:
    "Discover our web development services. We offer custom web design, full-stack development, and ongoing support for businesses of all sizes.",
  openGraph: {
    title: "Services | WebEquate",
    description:
      "Discover our web development services. We offer custom web design, full-stack development, and ongoing support for businesses of all sizes.",
    url: "https://webequate.com/services",
  },
  twitter: {
    title: "Services | WebEquate",
    description:
      "Discover our web development services. We offer custom web design, full-stack development, and ongoing support for businesses of all sizes.",
  },
};

const ServicesPage = () => {
  const services: Service[] = servicesData
    .filter((service) => service.status.active)
    .map((service) => ({
      ...service,
      status: {
        ...service.status,
        featuredOrder: service.status.featuredOrder ?? 0,
      },
    }))
    .sort((a, b) => {
      const orderA = a.status.activeOrder ?? 0;
      const orderB = b.status.activeOrder ?? 0;
      return orderA - orderB;
    });

  return (
    <div className="mx-auto">
      <Header socialLink={basics.socialLinks[0]} />

      <PageTransition>
        <div className="text-base text-dark-2 dark:text-light-2">
          <ServiceGrid services={services} />
        </div>
      </PageTransition>

      <Footer name={basics.name} socialLinks={basics.socialLinks} />
    </div>
  );
};

export default ServicesPage;
