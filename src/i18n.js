// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'uz', 'ru', 'fr', 'zh'],
        detection: {
            order: ['localStorage', 'navigator', 'querystring', 'htmlTag'], // localStorage birinchi
            lookupLocalStorage: 'i18nextLng', // 🔐 key nomi
            caches: ['localStorage'],         // 🌐 saqlash joyi
            htmlTag: document.documentElement,
        },
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;
