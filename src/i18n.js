import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const languageDetectorOptions = {
    order: ['localStorage', 'querystring', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
    htmlTag: document.documentElement,
    lookupLocalStorage: 'i18nextLng'
};

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'uz', 'ru', 'fr', 'zh'],
        detection: languageDetectorOptions,
        interpolation: {
            escapeValue: false,
        },
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;
