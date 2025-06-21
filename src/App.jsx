import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast"; // ✅ toast uchun

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminHero from "./pages/admin/AdminHero";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminContactInfo from "./pages/admin/AdminContactInfo";
import { useTranslation } from "react-i18next";

const App = () => {
  const [theme, setTheme] = useState("dark");

  const { i18n } = useTranslation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setTheme(savedTheme || (prefersDark ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    document.documentElement.style.scrollBehavior = "smooth";
  }, [theme]);
  
  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300 min-h-screen flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route
            path="/admin/projects"
            element={
              <ProtectedRoute>
                <AdminProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <ProtectedRoute>
                <AdminMessages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/skills"
            element={
              <ProtectedRoute>
                <AdminSkills />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/experience"
            element={
              <ProtectedRoute>
                <AdminExperience />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/hero"
            element={
              <ProtectedRoute>
                <AdminHero />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/contact-info"
            element={
              <ProtectedRoute>
                <AdminContactInfo />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};



export default App;
