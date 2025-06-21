// src/components/LanguageSwitcher.jsx
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const languages = [
    { code: "en", flag: "🇬🇧" },
    { code: "uz", flag: "🇺🇿" },
    { code: "ru", flag: "🇷🇺" },
    { code: "fr", flag: "🇫🇷" },
    { code: "zh", flag: "🇨🇳" },
  ];

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  useEffect(() => {
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  const handleChange = (code) => {
    i18n.changeLanguage(code).then(() => {
      localStorage.setItem("i18nextLng", code);
      document.documentElement.lang = code;
    });
    setOpen(false);
  };

  const current =
    languages.find((l) => l.code === i18n.language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative text-sm z-50">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1 px-3 py-1 border dark:border-slate-600 border-slate-300 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
      >
        <span>{current.flag}</span>
        <span className="hidden sm:inline" translate="no">
          {t(`languages.${current.code}`)}
        </span>
        <ChevronDown size={16} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded shadow-lg">
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
              <span translate="no">{t(`languages.${lang.code}`)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
