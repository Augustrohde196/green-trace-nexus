
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export type Language = 'en' | 'da';

// Define translations interface
export interface Translations {
  [key: string]: string;
}

// Define language context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// English translations
const enTranslations: Translations = {
  "dashboard": "Dashboard",
  "traceability": "Traceability",
  "reporting": "Reporting",
  "mapView": "Map View",
  "downloadMap": "Download Map",
  "assets": "Assets",
  "customers": "Customers",
  "allocation": "Allocation",
  "billing": "Billing",
  "settings": "Settings",
  "portfolio": "Portfolio",
  "consumption": "Consumption",
  "utilityPortal": "Utility Portal",
  "corporatePortal": "Corporate Portal",
  "profile": "Profile",
  "signOut": "Sign out",
  "language": "Language"
};

// Danish translations
const daTranslations: Translations = {
  "dashboard": "Kontrolpanel",
  "traceability": "Sporbarhed",
  "reporting": "Rapportering",
  "mapView": "Kortvisning",
  "downloadMap": "Download kort",
  "assets": "Aktiver",
  "customers": "Kunder",
  "allocation": "Tildeling",
  "billing": "Fakturering",
  "settings": "Indstillinger",
  "portfolio": "Portefølje",
  "consumption": "Forbrug",
  "utilityPortal": "Forsyningsportal",
  "corporatePortal": "Virksomhedsportal",
  "profile": "Profil",
  "signOut": "Log ud",
  "language": "Sprog"
};

// Get translations object based on language
const getTranslations = (language: Language): Translations => {
  return language === 'en' ? enTranslations : daTranslations;
};

// Language provider component
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage === 'en' || savedLanguage === 'da') ? savedLanguage : 'en';
  });

  // Update localStorage when language changes
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    const translations = getTranslations(language);
    return translations[key] || enTranslations[key] || key;
  };

  // Update localStorage on language change
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for using language context
export const useLanguage = () => useContext(LanguageContext);
