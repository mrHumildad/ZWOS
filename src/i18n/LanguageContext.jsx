import { createContext, useContext, useState } from 'react';
import translations from './translations';

const LanguageContext = createContext();

const languages = ['en', 'es', 'it'];

export function LanguageProvider({ children }) {
  const [langIndex, setLangIndex] = useState(0);

  const cycleLanguage = () => {
    setLangIndex((prev) => (prev + 1) % languages.length);
  };

  const lang = languages[langIndex];

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[lang];
    for (const k of keys) {
      value = value?.[k];
    }
    return value ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, t, cycleLanguage, langIndex }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
