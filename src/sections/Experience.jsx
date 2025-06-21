import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "../utils/axios";
import { Briefcase, GraduationCap } from "lucide-react"; // Yangi ikonkalarni import qilamiz
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { useTranslation } from "react-i18next";

const fetchExperience = async () => {
  // Ma'lumotlarni serverdan olish
  const res = await axios.get("/experience");
  // Ma'lumotlarni sana bo'yicha saralab qaytarish (eng yangisi birinchi)
  return res.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
};

// Har bir turdagi band uchun konfiguratsiya
const timelineItemConfig = {
  work: {
    icon: Briefcase,
    iconBg: "bg-emerald-200 dark:bg-emerald-900",
    iconColor: "text-emerald-800 dark:text-emerald-300",
  },
  education: {
    icon: GraduationCap,
    iconBg: "bg-sky-200 dark:bg-sky-900",
    iconColor: "text-sky-800 dark:text-sky-300",
  },
};

const Experience = () => {
  const { t } = useTranslation();
  const { data: experienceList = [], isLoading } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperience,
  });

  if (isLoading) {
    return (
      <Section id="experience">
        <SectionTitle>{t("experience.title")}</SectionTitle>
        <div className="text-center text-slate-400">
          {t("experience.loading")}
        </div>
      </Section>
    );
  }

  return (
    <Section id="experience" className="font-sans">
      <SectionTitle>{t("experience.title")}</SectionTitle>

      {/* Asosiy timeline container */}
      <div className="relative max-w-5xl mx-auto mt-12">
        {/* Vertikal chiziq */}
        <div className="absolute left-1/2 -translate-x-1/2 h-full w-0.5 bg-slate-300/60 dark:bg-slate-700/60"></div>

        {experienceList.map((item, index) => {
          const config =
            timelineItemConfig[item.type] || timelineItemConfig.work;
          const IconComponent = config.icon;
          const isLeft = index % 2 === 0;

          return (
            <div
              key={item.id}
              className={`relative mb-12 flex w-full items-center ${
                isLeft ? "justify-start" : "justify-end"
              }`}
            >
              {/* Elementning chap yoki o'ngda joylashishi uchun bo'sh joy */}
              {!isLeft && <div className="w-1/2"></div>}

              <motion.div
                className={`w-1/2 px-6 ${isLeft ? "text-right" : "text-left"}`}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true }}
              >
                {/* Kartochka dizayni */}
                <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-transparent dark:border-slate-700/50 hover:border-cyan-500 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {item.title || t("experience.untitled")}
                  </h3>
                  <p className="text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-1">
                    {item.company || t("experience.unknownCompany")}
                  </p>
                  <time className="block mb-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {item.startDate || "—"} — {item.endDate || "Present"}
                  </time>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {item.description || t("experience.noDescription")}
                  </p>
                </div>
              </motion.div>

              {/* Timeline'dagi dumaloq ikonka */}
              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <div
                  className={`flex items-center justify-center w-12 h-12 rounded-full ring-4 ring-white dark:ring-slate-900 ${config.iconBg}`}
                >
                  <IconComponent className={`w-6 h-6 ${config.iconColor}`} />
                </div>
              </div>

              {isLeft && <div className="w-1/2"></div>}
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Experience;
