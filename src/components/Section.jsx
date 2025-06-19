// 📁 src/components/Section.jsx
import React, { useEffect } from 'react';
import { useAnimation } from 'framer-motion';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Section = ({ children, id, className = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start('visible');
  }, [controls, inView]);

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`py-16 md:py-24 ${className}`}
      initial="hidden"
      animate={controls}
      variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 50 } }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-4 md:px-8">
        {children}
      </div>
    </motion.section>
  );
};

export default Section;