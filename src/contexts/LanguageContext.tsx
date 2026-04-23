import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
}

const STORAGE_KEY = 'site_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY);
    return savedLanguage === 'en' ? 'en' : 'es';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }

  return context;
}