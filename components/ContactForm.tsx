"use client";

// components/ContactForm.tsx
import { useState } from "react";
import { ContactForm as ContactFormData } from "@/interfaces/ContactForm";
import Heading from "@/components/Heading";
import FormInput from "@/components/FormInput";

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot field
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: result.message });
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          website: "", // honeypot field
        });
      } else {
        setMessage({ type: "error", text: result.message });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Error sending email. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="leading-loose">
      <form
        onSubmit={handleSubmit}
        className="bg-light-1 dark:bg-dark-1 rounded-xl text-left lg:mr-4 p-6 pb-2 sm:p-8"
      >
        <div className="flex justify-start">
          <Heading text="Contact Form" />
        </div>
        <FormInput
          inputLabel="Full Name"
          labelFor="name"
          inputType="text"
          inputId="name"
          inputName="name"
          placeholderText="Your Name"
          ariaLabelName="Name"
          onChange={handleChange}
          value={formData.name}
        />
        <FormInput
          inputLabel="Email"
          labelFor="email"
          inputType="email"
          inputId="email"
          inputName="email"
          placeholderText="Your Email"
          ariaLabelName="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <FormInput
          inputLabel="Subject"
          labelFor="subject"
          inputType="text"
          inputId="subject"
          inputName="subject"
          placeholderText="Subject"
          ariaLabelName="Subject"
          onChange={handleChange}
          value={formData.subject}
        />

        <div className="mb-4">
          <label
            className="block text-lg text-dark-2 dark:text-light-2 mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            className="w-full px-5 py-2 border text-dark-2 dark:text-light-2 bg-white dark:bg-black border-dark-2 dark:border-light-2 rounded-md shadow-sm text-md"
            id="message"
            name="message"
            cols={14}
            rows={6}
            aria-label="Message"
            onChange={handleChange}
            value={formData.message}
            required
          ></textarea>
        </div>

        {/* Honeypot field - hidden from humans, visible to bots */}
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          style={{ position: "absolute", left: "-9999px" }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div>
          <button
            type="submit"
            disabled={isLoading}
            aria-label="Send Message"
            className="text-light-1 dark:text-light-1 bg-accent-dark dark:bg-accent-dark hover:bg-accent-light dark:hover:bg-accent-light disabled:opacity-60 disabled:cursor-not-allowed font-general-medium flex justify-center items-center w-40 sm:w-40 mb-3 sm:mb-3 text-lg py-2.5 sm:py-3 rounded-lg duration-300"
          >
            <span className="text-sm sm:text-lg">
              {isLoading ? "Sending..." : "Send Message"}
            </span>
          </button>
          {message && (
            <p
              className={`text-sm sm:text-base font-medium ${
                message.type === "success"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {message.text}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
