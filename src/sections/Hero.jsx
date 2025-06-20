import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useHeroQuery } from "../api/heroApi";
import Typewriter from "../components/Typewriter";
import Section from "../components/Section";

const Hero = () => {
  const { data, isLoading } = useHeroQuery();

  if (isLoading || !data) return null;

  return (
    <Section
      id="home"
      className="pt-32 md:pt-48 min-h-screen flex items-center"
    >
      <div className="text-center w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-800 dark:text-slate-100"
        >
          {data.name}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 text-xl md:text-2xl text-slate-600 dark:text-slate-300"
        >
          <span className="mr-2">{data.tagline}</span>
          <Typewriter
            sequence={data.technologies}
            className="font-mono text-cyan-500 dark:text-cyan-400"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Link
            to="/projects"
            className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all transform hover:scale-105"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-semibold rounded-lg shadow-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all transform hover:scale-105"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
