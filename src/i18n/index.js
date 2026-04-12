import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';

const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    supportedLngs: ['ar', 'en'],
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
      lookupQuerystring: 'lang',
      caches: ['localStorage']
    }
  });

const normalizeLanguage = (lng) => (lng || '').startsWith('en') ? 'en' : 'ar';

// Function to update document direction based on language
export const updateDirection = (lng) => {
  const normalizedLanguage = normalizeLanguage(lng);
  const dir = normalizedLanguage === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = normalizedLanguage;
  
  // Update body class for RTL-specific styles
  if (normalizedLanguage === 'ar') {
    document.body.classList.add('rtl');
    document.body.classList.remove('ltr');
  } else {
    document.body.classList.add('ltr');
    document.body.classList.remove('rtl');
  }
};

export const syncLanguageUrl = (lng) => {
  if (typeof window === 'undefined') {
    return;
  }

  const normalizedLanguage = normalizeLanguage(lng);
  const url = new URL(window.location.href);

  if (normalizedLanguage === 'en') {
    url.searchParams.set('lang', 'en');
  } else {
    url.searchParams.delete('lang');
  }

  const nextUrl = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState(window.history.state, '', nextUrl || '/');
};

// Set initial direction
updateDirection(i18n.language);
syncLanguageUrl(i18n.language);

// Listen for language changes
i18n.on('languageChanged', (lng) => {
  updateDirection(lng);
  syncLanguageUrl(lng);
});

export default i18n;
