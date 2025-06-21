// 📁 src/components/Footer.jsx
import React from 'react';
import portfolioData from '../data/portfolioData';
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-slate-100 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 md:px-8 py-6 text-center text-slate-500 dark:text-slate-400">
        <p>
          {t("footer.copy", {
            year: new Date().getFullYear(),
            name: portfolioData.personalInfo.name,
          })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
