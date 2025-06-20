import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Server } from "lucide-react";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";

const fetchExperience = async () => {
  const res = await axios.get("http://localhost:3000/experience");
  return res.data;
};

const Experience = () => {
  const { data: experienceList = [] } = useQuery({
    queryKey: ["experience"],
    queryFn: fetchExperience,
  });

  return (
    <Section id="experience" className="font-sans">
      <SectionTitle>Career & Education</SectionTitle>
      <div className="max-w-3xl mx-auto">
        <div className="relative border-l-2 border-cyan-500/30 dark:border-cyan-400/30">
          {experienceList.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-10 ml-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
            >
              <span className="absolute flex items-center justify-center w-6 h-6 bg-cyan-200 rounded-full -left-3 ring-8 ring-white dark:ring-slate-900 dark:bg-cyan-900">
                <Server className="w-3 h-3 text-cyan-800 dark:text-cyan-300" />
              </span>
              <h3 className="flex items-center mb-1 text-lg font-semibold text-slate-900 dark:text-white">
                {item.title || "Untitled"}
                <span className="text-cyan-500 mx-2">{"\u0040"}</span>
                {item.company || "Unknown Company"}
              </h3>
              <time className="block mb-2 text-sm font-medium text-slate-400 dark:text-slate-500">
                {item.startDate || "—"} — {item.endDate || "Present"}
              </time>
              <p className="text-slate-500 dark:text-slate-400 text-sm">
                {item.description || "No description provided."}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
