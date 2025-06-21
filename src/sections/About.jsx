// 📁 src/sections/About.jsx
import React from 'react';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Section id="about">
      <SectionTitle>{t("about.title")}</SectionTitle>
      <div className="max-w-3xl mx-auto text-center text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        <p>{t("about.bio")}</p>
      </div>
    </Section>
  );
};

export default About;