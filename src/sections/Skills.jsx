// 📁 src/sections/Skills.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import portfolioData from '../data/portfolioData';

const Skills = () => {
  const { hard, soft, languages } = portfolioData.skills;

  const SkillCard = ({ title, skills }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">{title}</h3>
      <ul className="space-y-3">
        {skills.map((skill, index) => (
          <motion.li
            key={index}
            className="group flex items-center text-slate-600 dark:text-slate-300"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-500 dark:text-cyan-400 mr-3 transition-transform duration-300 group-hover:rotate-12">
              {skill.icon}
            </span>
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
        <SkillCard title="Hard Skills" skills={hard} />
        <SkillCard title="Soft Skills" skills={soft} />
        <SkillCard title="Languages" skills={languages} />
      </div>
    </Section>
  );
};

export default Skills;
