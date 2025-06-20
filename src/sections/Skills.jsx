import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { useSkillsQuery } from "../api/skillApi";

// 🔁 Icon kutubxonalarni dinamik import qilish
import * as FaIcons from "react-icons/fa";
import * as SiIcons from "react-icons/si";
import * as MdIcons from "react-icons/md";
import * as GiIcons from "react-icons/gi";
import * as GrIcons from "react-icons/gr";
import * as TbIcons from "react-icons/tb";

const getIconComponent = (iconName) => {
  const Icon =
    FaIcons[iconName] ||
    SiIcons[iconName] ||
    MdIcons[iconName] ||
    GiIcons[iconName] ||
    GrIcons[iconName] ||
    TbIcons[iconName];
  return Icon ? (
    <Icon className="text-cyan-500 dark:text-cyan-400 mr-2 text-lg" />
  ) : null;
};

const Skills = () => {
  const { data = [] } = useSkillsQuery();

  const grouped = {
    hard: data.filter((s) => s.category === "hard"),
    soft: data.filter((s) => s.category === "soft"),
    languages: data.filter((s) => s.category === "language"),
  };

  const SkillCard = ({ title, skills }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <motion.li
            key={skill.id}
            className="group flex items-center text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            {/* ✅ Icon render qilinadi */}
            {getIconComponent(skill.icon)}
            <span>
              {skill.name} {skill.level && `(${skill.level})`}
            </span>
          </motion.li>
        ))}
      </ul>
    </div>
  );

  return (
    <Section id="skills" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>My Technical Arsenal</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <SkillCard title="Hard Skills" skills={grouped.hard} />
        <SkillCard title="Soft Skills" skills={grouped.soft} />
        <SkillCard title="Languages" skills={grouped.languages} />
      </div>
    </Section>
  );
};

export default Skills;
