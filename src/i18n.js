import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

const detectionOptions = {
    order: ['localStorage', 'navigator', 'htmlTag'],
    caches: ['localStorage'],
};
  
i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        supportedLngs: ['en', 'uz', 'ru', 'fr', 'zh'],
        debug: false,
        interpolation: { escapeValue: false },
        detection: detectionOptions,
        backend: {
            loadPath: '/locales/{{lng}}/translation.json',
        },
    });

export default i18n;