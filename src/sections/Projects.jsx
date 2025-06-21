// 📁 src/sections/Projects.jsx
import React from "react";
import { motion } from "framer-motion";
import Section from "../components/Section";
import SectionTitle from "../components/SectionTitle";
import { usePublicProjectsQuery } from "../api/projectApi"; // ✅ API dan foydalanish saqlanib qoldi

// Ikonkalar (SVG formatida, tashqi kutubxonasiz)
const GitHubIcon = (props) => (
  <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

const LiveDemoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m-5.25 0H21v5.25"
    />
  </svg>
);

const Projects = () => {
  const { data: projects = [], isLoading, isError } = usePublicProjectsQuery();

  if (isLoading)
    return (
      <Section>
        <SectionTitle>Yuklanmoqda...</SectionTitle>
      </Section>
    );
  if (isError)
    return (
      <Section>
        <SectionTitle>Loyihalarni yuklashda xatolik</SectionTitle>
      </Section>
    );

  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || index}
            className="group flex flex-col rounded-xl overflow-hidden border transition-all duration-500
                       bg-white/40 dark:bg-slate-800/40 backdrop-blur-lg 
                       border-slate-300/40 dark:border-slate-700/60
                       hover:shadow-cyan-500/10 hover:dark:shadow-cyan-400/10 hover:shadow-2xl hover:border-cyan-400/80 hover:-translate-y-2"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden">
              <img
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                className="w-full h-48 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/600x400/1a202c/ffffff?text=Image+Not+Found";
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center p-4
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center space-x-4">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-cyan-500/80 rounded-full hover:bg-cyan-500 transition-all transform hover:scale-105"
                  >
                    <LiveDemoIcon className="w-4 h-4" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-600/80 rounded-full hover:bg-slate-600 transition-all transform hover:scale-105"
                  >
                    <GitHubIcon className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">
                {project.description}
              </p>
              <div className="mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">
                  Tech Stack:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-200/80 text-slate-800 dark:bg-slate-700/80 dark:text-slate-200 text-xs font-mono rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;
