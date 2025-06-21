// 📁 src/components/LanguageSwitcher.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: "en", label: "🇬🇧 English" },
    { code: "uz", label: "🇺🇿 O\u2018zbek" },
    { code: "ru", label: "🇷🇺 \u0420\u0443\u0441\u0441\u043A\u0438\u0439" },
    { code: "fr", label: "🇫🇷 Fran\u00E7ais" },
    { code: "zh", label: "🇨🇳 \u4E2D\u6587" },
  ];

  <select
  className="bg-transparent border rounded px-2 py-1 text-sm dark:text-slate-200"
  value={i18n.language}
  onChange={(e) => i18n.changeLanguage(e.target.value)}
>
      {languages.map(({ code, label }) => (
            <option key={code} value={code}>

          {label}
          </option>
      ))}
    </select>

};

export default LanguageSwitcher;
