// 📁 src/sections/About.jsx
import React from 'react';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import portfolioData from '../data/portfolioData';

const About = () => (
  <Section id="about">
    <SectionTitle>About Me</SectionTitle>
    <div className="max-w-3xl mx-auto text-center text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
      <p>{portfolioData.about.bio}</p>
    </div>
  </Section>
);

export default About;