
import React, { createContext, useContext, useEffect, useState } from "react";

type Language = "en" | "da";

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const defaultLanguage: Language = "en";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
}

interface LanguageProviderProps {
  children: React.ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage
    const storedLanguage = localStorage.getItem("app-language");
    return (storedLanguage as Language) || defaultLanguage;
  });

  const translations = {
    en: {
      "app.title": "Utility Portal",
      "theme.light": "Switch to light mode",
      "theme.dark": "Switch to dark mode",
      "notifications": "Notifications & Walkthrough",
      "profile": "Profile",
      "settings": "Settings",
      "signout": "Sign out",
      "dashboard": "Dashboard",
      "assets": "Assets",
      "customers": "Customers",
      "matching": "Matching Engine",
      "reporting": "Reporting",
      "billing": "Billing",
      "analytics": "Analytics",
      "traceability": "Traceability",
      "certificates": "Certificates",
      "portfolio": "Portfolio",
      "consumption": "Consumption",
      "language": "Language",
      "english": "English",
      "danish": "Danish"
    },
    da: {
      "app.title": "Forsyningsportal",
      "theme.light": "Skift til lys tilstand",
      "theme.dark": "Skift til mørk tilstand",
      "notifications": "Notifikationer & Rundvisning",
      "profile": "Profil",
      "settings": "Indstillinger",
      "signout": "Log ud",
      "dashboard": "Dashboard",
      "assets": "Aktiver",
      "customers": "Kunder",
      "matching": "Matching Engine",
      "reporting": "Rapportering",
      "billing": "Fakturering",
      "analytics": "Analyser",
      "traceability": "Sporbarhed",
      "certificates": "Certifikater",
      "portfolio": "Portefølje",
      "consumption": "Forbrug",
      "language": "Sprog",
      "english": "Engelsk",
      "danish": "Dansk"
    }
  };

  useEffect(() => {
    localStorage.setItem("app-language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
