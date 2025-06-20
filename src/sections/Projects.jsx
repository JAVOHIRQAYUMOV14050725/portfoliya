// 📁 src/sections/Projects.jsx
import React from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import { usePublicProjectsQuery } from '../api/projectApi'; // ✅ API dan foydalanamiz

const Projects = () => {
  const { data: projects = [], isLoading, isError } = usePublicProjectsQuery();

  if (isLoading) return <Section><SectionTitle>Loading...</SectionTitle></Section>;
  if (isError) return <Section><SectionTitle>Failed to load projects</SectionTitle></Section>;

  return (
    <Section id="projects" className="bg-slate-50 dark:bg-slate-900/50">
      <SectionTitle>Featured Projects</SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id || index}
            className="group flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img
                src={project.imageUrl}
                alt={`${project.title} screenshot`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/1a202c/ffffff?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-semibold text-white bg-cyan-500/80 rounded-md hover:bg-cyan-500 transition-colors"
                >
                  Live Demo
                </a>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-sm font-semibold text-white bg-slate-600/80 rounded-md hover:bg-slate-600 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-4 flex-grow">{project.description}</p>
              <div className="mt-auto">
                <h4 className="text-sm font-semibold mb-2 text-slate-700 dark:text-slate-200">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 text-xs font-mono rounded-full"
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
  