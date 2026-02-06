"use client";

import basics from "@/data/basics.json";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import ContactDetails from "@/components/ContactDetails";
import Footer from "@/components/Footer";

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
