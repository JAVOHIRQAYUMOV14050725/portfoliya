// 📁 src/sections/Contact.jsx
import React from "react";
import { Mail, Smartphone, MapPin, Github, Send, Linkedin } from "lucide-react";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { usePublicContactInfo } from "../api/contactInfoApi";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const { data, isLoading } = usePublicContactInfo();

  if (isLoading)
    return <p className="text-center">{t("contactSection.loading")}</p>;

  return (
    <Section id="contact">
      <SectionTitle>{t("contactSection.title")}</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t("contactSection.information")}
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            {t("contactSection.description")}
          </p>
          <div className="space-y-4">
            <a href={`tel:${data.phone}`} className="flex items-center group">
              <Smartphone className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300 group-hover:text-cyan-500 transition-colors">
                {data.phone}
              </span>
            </a>
            <a
              href={`mailto:${data.email}`}
              className="flex items-center group"
            >
              <Mail className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300 group-hover:text-cyan-500 transition-colors">
                {data.email}
              </span>
            </a>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300">
                {data.location}
              </span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={data.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              <Send className="w-6 h-6" />
            </a>
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* ...form qoladi o‘z holida (ContactForm.jsx yoki form jsx) */}
      </div>
    </Section>
  );
};

export default Contact;
