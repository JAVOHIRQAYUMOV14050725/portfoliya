// 📁 src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', label: '🇺🇸' },
    { code: 'uz', label: '🇺🇿' },
    { code: 'ru', label: '🇷🇺' }
  ];

  return (
    <div className="flex items-center space-x-2">
      {languages.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => i18n.changeLanguage(code)}
          className={`text-xl transition-all hover:scale-110 ${i18n.language === code ? 'text-cyan-500 font-bold' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
