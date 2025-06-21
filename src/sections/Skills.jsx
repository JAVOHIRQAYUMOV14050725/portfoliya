import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { useSkillsQuery } from "../api/skillApi";
import { useTranslation } from "react-i18next";

// Ikonkalarni kategoriyalar uchun ham olamiz
import { FaBrain, FaRegHandshake, FaGlobeAmericas } from "react-icons/fa";
import { getIcon } from "../constants/iconMap";

// Hard Skill uchun Progress Bar komponenti
const SkillBar = ({ skill }) => {
  const { name, level, icon } = skill;

  return (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-1 text-slate-600 dark:text-slate-300">
        <div className="flex items-center text-base font-medium">
          <span className="text-cyan-500 dark:text-cyan-400 mr-2 text-lg">
            {getIcon(icon)}
          </span>
          {name}
        </div>
        <span className="text-sm font-bold text-cyan-500 dark:text-cyan-400">
          {level}%
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <motion.div
          className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  );
};

// Boshqa ko'nikmalar uchun Teg (Chip) komponenti
const SkillChip = ({ skill }) => (
  <motion.div
    className="flex items-center bg-slate-200/50 dark:bg-slate-800/80 rounded-full px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 transition-transform duration-300 hover:scale-105"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.3 }}
    viewport={{ once: true }}
  >
    <span className="text-cyan-500 dark:text-cyan-400 mr-2 text-base">
      {getIcon(skill.icon)}
    </span>
    {skill.name}{" "}
    {skill.level && (
      <span className="text-slate-400 ml-1.5">({skill.level})</span>
    )}
  </motion.div>
);

const Skills = () => {
  const { t } = useTranslation();
  const { data = [], isLoading } = useSkillsQuery();

  const grouped = {
    hard: data
      .filter((s) => s.category === "hard")
      .sort((a, b) => b.level - a.level),
    soft: data.filter((s) => s.category === "soft"),
    languages: data.filter((s) => s.category === "language"),
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  return (
    <Section id="skills" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>{t("skills.title")}</SectionTitle>

      {isLoading ? (
        <div className="text-center text-slate-400">{t("skills.loading")}</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Hard Skills Card */}
          <motion.div
            className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-xl border border-transparent dark:border-slate-700 backdrop-blur-sm"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center mb-6">
              <FaBrain className="text-3xl text-cyan-500 mr-4" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {t("skills.hard")}
              </h3>
            </div>
            <div>
              {grouped.hard.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </div>
          </motion.div>

          {/* Soft Skills Card */}
          <motion.div
            className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-xl border border-transparent dark:border-slate-700 backdrop-blur-sm"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center mb-6">
              <FaRegHandshake className="text-3xl text-cyan-500 mr-4" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {t("skills.soft")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {grouped.soft.map((skill) => (
                <SkillChip key={skill.id} skill={skill} />
              ))}
            </div>
          </motion.div>

          {/* Languages Card */}
          <motion.div
            className="bg-white dark:bg-slate-800/60 p-6 rounded-2xl shadow-xl border border-transparent dark:border-slate-700 backdrop-blur-sm"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <div className="flex items-center mb-6">
              <FaGlobeAmericas className="text-3xl text-cyan-500 mr-4" />
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {t("skills.languages")}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {grouped.languages.map((skill) => (
                <SkillChip key={skill.id} skill={skill} />
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </Section>
  );
};

export default Skills;
