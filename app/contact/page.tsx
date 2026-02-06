import type { Metadata } from "next";
import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | WebEquate",
  description:
    "Get in touch with WebEquate. We'd love to hear about your next project and discuss how we can help bring your vision to life.",
  openGraph: {
    title: "Contact | WebEquate",
    description:
      "Get in touch with WebEquate. We'd love to hear about your next project and discuss how we can help bring your vision to life.",
    url: "https://webequate.com/contact",
  },
  twitter: {
    title: "Contact | WebEquate",
    description:
      "Get in touch with WebEquate. We'd love to hear about your next project and discuss how we can help bring your vision to life.",
  },
};

const ContactPage = () => {
  return (
    <div className="mx-auto">
      <Header socialLink={basics.socialLinks[0]} />

      <div className="flex flex-col-reverse lg:flex-row text-base text-dark-2 dark:text-light-2">
        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:mr-6">
          <ContactForm />
        </div>

        <div className="w-full lg:w-1/2 mb-10 lg:mb-0 md:ml-6">
          <ContactDetails
            name={basics.name}
            contactIntro={basics.contactIntro}
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

export default ContactPage;
