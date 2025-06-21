// 📁 src/components/LanguageSwitcher.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, ChevronDown } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "uz", label: "O'zbek", flag: "🇺🇿" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
  ];

  const handleChange = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("i18nextLng", code);
    setOpen(false);
  };

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  return (
    <div className="relative text-sm">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 border dark:border-slate-600 border-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-100 ${
                lang.code === current.code
                  ? "font-semibold bg-slate-100 dark:bg-slate-700"
                  : ""
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
