import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "../utils/axios";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ThemeToggle from "./ThemeToggle";
import LanguageSwitcher from "./LanguageSwitcher";
import portfolioData from "../data/portfolioData";
import { useTranslation } from "react-i18next";

const Header = ({ theme, setTheme }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    axios
      .get("/auth/me", { withCredentials: true })
      .then((res) => setIsAuthenticated(!!res.data?.id))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const publicLinks = [
    { to: "/", label: t("header.nav.home") },
    { to: "/skills", label: t("header.nav.skills") },
    { to: "/experience", label: t("header.nav.experience") },
    { to: "/projects", label: t("header.nav.projects") },
    { to: "/contact", label: t("header.nav.contact") },
  ];

  const adminLinks = {
    manage: [
      { to: "/admin/projects", label: t("header.admin.manageProjects") },
      { to: "/admin/skills", label: t("header.admin.manageSkills") },
      { to: "/admin/experience", label: t("header.admin.manageExperience") },
      { to: "/admin/hero", label: t("header.admin.manageHero") },
      { to: "/admin/messages", label: t("header.admin.adminMessages") },
      { to: "/admin/contact-info", label: t("header.admin.manageContact") },
    ],
    public: [
      { to: "/projects", label: t("header.admin.publicProjects") },
      { to: "/skills", label: t("header.admin.publicSkills") },
    ],
  };

  const handleLogout = async () => {
    await axios.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
    setIsAuthenticated(false);
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          <NavLink
            to="/"
            end
            className="text-xl font-bold text-slate-800 dark:text-slate-100"
          >
            {portfolioData.personalInfo.name}
          </NavLink>

          <nav className="hidden md:flex items-center space-x-6">
            {publicLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? "text-cyan-500 dark:text-cyan-400"
                      : "text-slate-600 dark:text-slate-300 hover:text-cyan-500 dark:hover:text-cyan-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {isAuthenticated && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button className="px-3 py-1 border border-cyan-500 text-cyan-500 rounded text-sm hover:bg-cyan-100 dark:hover:bg-slate-800">
                    {t("header.admin.panel")}
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="w-64 p-3 bg-white dark:bg-slate-800 shadow-lg rounded space-y-2 z-50">
                  <h4 className="text-xs uppercase font-semibold text-gray-400">
                    {t("header.admin.manageTitle")}
                  </h4>
                  {adminLinks.manage.map((link) => (
                    <DropdownMenu.Item key={link.to} asChild>
                      <NavLink
                        to={link.to}
                        className="block text-sm px-2 py-1 rounded hover:text-cyan-500"
                      >
                        {link.label}
                      </NavLink>
                    </DropdownMenu.Item>
                  ))}
                  <hr className="border-slate-300 dark:border-slate-600" />
                  <h4 className="text-xs uppercase font-semibold text-gray-400">
                    {t("header.admin.previewTitle")}
                  </h4>
                  {adminLinks.public.map((link) => (
                    <DropdownMenu.Item key={link.to} asChild>
                      <NavLink
                        to={link.to}
                        className="block text-xs px-2 py-1 text-slate-500 hover:text-cyan-400"
                      >
                        {link.label}
                      </NavLink>
                    </DropdownMenu.Item>
                  ))}
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <ThemeToggle theme={theme} setTheme={setTheme} />
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="hidden md:inline-block px-4 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {t("header.logout")}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-slate-500 dark:text-slate-400"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 p-4 space-y-4">
          {[
            ...publicLinks,
            ...(isAuthenticated
              ? [...adminLinks.manage, ...adminLinks.public]
              : []),
          ].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block text-sm ${
                  isActive
                    ? "text-cyan-500"
                    : "text-slate-600 dark:text-slate-300 hover:text-cyan-500"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="w-full py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              {t("header.logout")}
            </button>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
