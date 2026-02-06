import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/seo";
import basics from "@/data/basics.json";
import servicesData from "@/data/services.json";
import Header from "@/components/Header";
import ServiceGrid from "@/components/ServiceGrid";
import Footer from "@/components/Footer";
import type { Service } from "@/types/service";

export const metadata: Metadata = generateSeoMetadata({
  title: "Services | WebEquate",
  description:
    "Discover our web development services including design, development, and deployment.",
  path: "/services",
});

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

      <div className="text-base text-dark-2 dark:text-light-2">
        <ServiceGrid services={services} />
      </div>

      <Footer name={basics.name} socialLinks={basics.socialLinks} />
    </div>
  );
};

export default ServicesPage;
