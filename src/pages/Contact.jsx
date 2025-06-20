import React from "react";
import ContactForm from "../components/ContactForm";

const Contact = () => {
  return (
    <section id="contact" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-6 text-slate-800 dark:text-white">
        📬 Contact Me
      </h2>
      <ContactForm />
    </section>
  );
};

export default Contact;
