// 📁 src/sections/Contact.jsx
import React, { useState } from 'react';
import { Mail, Smartphone, MapPin, Github, Send, Linkedin } from 'lucide-react';
import Section from '../components/Section';
import SectionTitle from '../components/SectionTitle';
import portfolioData from '../data/portfolioData';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ submitting: false, success: false, error: false, message: '' });
  const { personalInfo } = portfolioData;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: '' });

    try {
      // Replace with real endpoint later
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStatus({ submitting: false, success: true, error: false, message: 'Message sent successfully!' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ submitting: false, success: false, error: true, message: 'Something went wrong.' });
    }
  };

  return (
    <Section id="contact">
      <SectionTitle>📬 Let's Connect</SectionTitle>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Contact Information</h3>
          <p className="text-slate-600 dark:text-slate-300">
            I'm open to meaningful collaborations and exciting backend opportunities. Let's build something impactful together!
          </p>
          <div className="space-y-4">
            <a href={`tel:${personalInfo.phone}`} className="flex items-center group">
              <Smartphone className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300 group-hover:text-cyan-500 transition-colors">{personalInfo.phone}</span>
            </a>
            <a href={`mailto:${personalInfo.email}`} className="flex items-center group">
              <Mail className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300 group-hover:text-cyan-500 transition-colors">{personalInfo.email}</span>
            </a>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-3 text-cyan-500" />
              <span className="text-slate-600 dark:text-slate-300">{personalInfo.location}</span>
            </div>
          </div>
          <div className="flex space-x-4 pt-4">
            <a href={personalInfo.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><Github className="w-6 h-6" /></a>
            <a href={personalInfo.socials.telegram} target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><Send className="w-6 h-6" /></a>
            <a href={personalInfo.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors"><Linkedin className="w-6 h-6" /></a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
            <textarea
              name="message"
              id="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={status.submitting}
            className="w-full flex justify-center items-center px-6 py-3 bg-cyan-500 text-white font-semibold rounded-lg shadow-lg hover:bg-cyan-600 transition-all disabled:bg-cyan-300 disabled:cursor-not-allowed"
          >
            {status.submitting ? 'Sending...' : 'Send Message'}
          </button>
          {status.message && (
            <p className={`text-sm text-center ${status.error ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </Section>
  );
};

export default Contact;