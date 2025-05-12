
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
  // Navigation & Header
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
  "language": "Language",
  
  // Dashboard Page
  "portfolioMetrics": "Portfolio Metrics",
  "totalProduction": "Total Production",
  "allocatedEnergy": "Allocated Energy",
  "averagePrice": "Average Price",
  "productionForecast": "Production Forecast",
  "energyMix": "Energy Mix",
  "solarProduction": "Solar Production",
  "windProduction": "Wind Production",
  "monthlyProjections": "Monthly Projections",
  "viewReport": "View Report",
  "selectPeriod": "Select Period",
  
  // Portfolio Page
  "portfolioPreferences": "Portfolio Preferences",
  "customizePortfolio": "Customize your energy portfolio preferences",
  "yourUtilityProvider": "Your Utility Provider",
  "contractSince": "Contract since January 2023",
  "accountManager": "Account Manager",
  "contactEmail": "Contact Email",
  "phoneNumber": "Phone Number",
  "contractEnd": "Contract End",
  "currentPreferenceSummary": "Current Preference Summary",
  "energyMixTab": "Energy Mix",
  "locationTab": "Location Preferences",
  "timeMatchingTab": "Time Matching",
  "sourceTypeMix": "Source Type Mix",
  "setPercentageSplit": "Set your preferred percentage split between renewable energy sources",
  "windEnergy": "Wind Energy",
  "solarEnergy": "Solar Energy",
  "behindTheMeterPriority": "Behind-the-Meter Priority",
  "savePreferences": "Save Preferences",
  "geographicalPreferences": "Geographical Preferences",
  "setLocationPreferences": "Set your location-based preferences to prioritize energy production closer to your consumption",
  "prioritizeLocal": "Prioritize local production",
  "whenEnabled": "When enabled, we will prioritize energy produced closer to your consumption location",
  "maximumDistance": "Maximum Distance",
  "local": "Local (50km)",
  "regional": "Regional (500km)",
  "international": "International (1000km)",
  "lowerDistances": "Lower distances prioritize energy produced closer to your consumption, but may limit available options. The system will always try to meet your volume requirements first, even if it means going beyond your preferred distance.",
  "timeMatchingPreference": "Time Matching Preference",
  "setPreferredLevel": "Set your preferred level of time matching between consumption and generation",
  "timeMatching": "Time Matching",
  "timeMatchingExplained": "Time Matching Explained",
  "higherPriorityMeans": "Higher priority means more focus on matching your consumption on an hourly basis with renewable generation.",
  
  // Certificates Page
  "myCertificates": "My Certificates",
  "viewAndManage": "View and manage your energy certificates",
  "energyCertificates": "Energy Certificates",
  "searchCertificates": "Search certificates...",
  "filter": "Filter",
  "certificateID": "Certificate ID",
  "type": "Type",
  "asset": "Asset",
  "period": "Period",
  "volume": "Volume",
  "status": "Status",
  "actions": "Actions",
  "active": "Active",
  "expired": "Expired",
  "export": "Export",
  
  // Billing Page
  "platformUsage": "Platform usage, pricing terms, and monthly billing estimate",
  "downloadInvoice": "Download Invoice PDF",
  "subscriptionDetails": "Subscription Details",
  "billingPeriod": "Billing Period",
  "nextInvoice": "Next Invoice",
  "paymentMethod": "Payment Method",
  "viewContract": "View Contract",
  "monthlyUsage": "Monthly Usage",
  "baseSubscription": "Base Subscription",
  "assetsMonitored": "Assets Monitored",
  "usageFees": "Usage Fees",
  "totalMonthlyPrice": "Total Monthly Price",
  "usageHistory": "Usage History",
  "customerBreakdown": "Customer Breakdown",
  "upcomingInvoices": "Upcoming Invoices",
  
  // Not Found Page
  "pageNotFound": "Page not found",
  "couldNotFindPage": "We couldn't find the page you were looking for. Please check the URL and try again.",
  "returnToDashboard": "Return to Dashboard",
  
  // Reset Password Page
  "resetPassword": "Reset Password",
  "enterEmail": "Enter your email address and we'll send you a link to reset your password",
  "email": "Email",
  "sendResetLink": "Send Reset Link",
  "sending": "Sending",
  "checkEmail": "Check your email",
  "resetLinkSent": "We've sent a password reset link to",
  "didntReceiveEmail": "Didn't receive the email? Check your spam folder or try again.",
  "backToSignIn": "Back to sign in",
  
  // Review Step (Onboarding)
  "reviewInformation": "Review Your Information",
  "reviewBeforeFinalizing": "Please review the information below before finalizing your account setup.",
  "accountInformation": "Account Information",
  "companyName": "Company Name",
  "notProvided": "Not provided",
  "industry": "Industry",
  "portfolioPreferencesTitle": "Portfolio Preferences",
  "energyMixLabel": "Energy Mix",
  "solar": "Solar",
  "wind": "Wind",
  "electricityProvider": "Electricity Provider",
  "provider": "Provider",
  "contractNumber": "Contract Number",
  "annualConsumption": "Annual Consumption",
  "peakLoad": "Peak Load",
  "powerOfAttorney": "Power of Attorney",
  "documentUploaded": "Document Uploaded",
  "noDocumentUploaded": "No document uploaded",
  "completeSetup": "By clicking \"Complete Setup\", you agree to our",
  "termsOfService": "Terms of Service",
  "privacyPolicy": "Privacy Policy"
};

// Danish translations
const daTranslations: Translations = {
  // Navigation & Header
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
  "language": "Sprog",
  
  // Dashboard Page
  "portfolioMetrics": "Porteføljenøgletal",
  "totalProduction": "Samlet produktion",
  "allocatedEnergy": "Tildelt energi",
  "averagePrice": "Gennemsnitlig pris",
  "productionForecast": "Produktionsprognose",
  "energyMix": "Energimiks",
  "solarProduction": "Solproduktion",
  "windProduction": "Vindproduktion",
  "monthlyProjections": "Månedlige prognoser",
  "viewReport": "Se rapport",
  "selectPeriod": "Vælg periode",
  
  // Portfolio Page
  "portfolioPreferences": "Porteføljepræferencer",
  "customizePortfolio": "Tilpas dine energiporteføljepræferencer",
  "yourUtilityProvider": "Din energileverandør",
  "contractSince": "Kontrakt siden januar 2023",
  "accountManager": "Kontaktperson",
  "contactEmail": "Kontakt e-mail",
  "phoneNumber": "Telefonnummer",
  "contractEnd": "Kontraktudløb",
  "currentPreferenceSummary": "Oversigt over nuværende præferencer",
  "energyMixTab": "Energimiks",
  "locationTab": "Placeringspræferencer",
  "timeMatchingTab": "Tidsmatchning",
  "sourceTypeMix": "Kildetypemiks",
  "setPercentageSplit": "Angiv din foretrukne procentvise fordeling mellem vedvarende energikilder",
  "windEnergy": "Vindenergi",
  "solarEnergy": "Solenergi",
  "behindTheMeterPriority": "Prioritet bag måleren",
  "savePreferences": "Gem præferencer",
  "geographicalPreferences": "Geografiske præferencer",
  "setLocationPreferences": "Angiv dine placeringspræferencer for at prioritere energiproduktion tættere på dit forbrug",
  "prioritizeLocal": "Prioriter lokal produktion",
  "whenEnabled": "Når dette er aktiveret, vil vi prioritere energi produceret tættere på dit forbrugssted",
  "maximumDistance": "Maksimal afstand",
  "local": "Lokal (50km)",
  "regional": "Regional (500km)",
  "international": "International (1000km)",
  "lowerDistances": "Kortere afstande prioriterer energi produceret tættere på dit forbrug, men kan begrænse tilgængelige muligheder. Systemet vil altid forsøge at opfylde dine mængdekrav først, selvom det betyder at gå ud over din foretrukne afstand.",
  "timeMatchingPreference": "Tidsmatchningspræference",
  "setPreferredLevel": "Angiv dit foretrukne niveau af tidsmatchning mellem forbrug og produktion",
  "timeMatching": "Tidsmatchning",
  "timeMatchingExplained": "Tidsmatchning forklaret",
  "higherPriorityMeans": "Højere prioritet betyder mere fokus på at matche dit forbrug på timebasis med vedvarende energiproduktion.",
  
  // Certificates Page
  "myCertificates": "Mine certifikater",
  "viewAndManage": "Se og administrer dine energicertifikater",
  "energyCertificates": "Energicertifikater",
  "searchCertificates": "Søg efter certifikater...",
  "filter": "Filter",
  "certificateID": "Certifikat-ID",
  "type": "Type",
  "asset": "Aktiv",
  "period": "Periode",
  "volume": "Volumen",
  "status": "Status",
  "actions": "Handlinger",
  "active": "Aktiv",
  "expired": "Udløbet",
  "export": "Eksporter",
  
  // Billing Page
  "platformUsage": "Platformbrug, prisbetingelser og månedlig faktureringsestimering",
  "downloadInvoice": "Download faktura-PDF",
  "subscriptionDetails": "Abonnementsdetaljer",
  "billingPeriod": "Faktureringsperiode",
  "nextInvoice": "Næste faktura",
  "paymentMethod": "Betalingsmetode",
  "viewContract": "Se kontrakt",
  "monthlyUsage": "Månedlig brug",
  "baseSubscription": "Basisabonnement",
  "assetsMonitored": "Overvågede aktiver",
  "usageFees": "Brugsgebyrer",
  "totalMonthlyPrice": "Samlet månedlig pris",
  "usageHistory": "Brugshistorik",
  "customerBreakdown": "Kundeopdeling",
  "upcomingInvoices": "Kommende fakturaer",
  
  // Not Found Page
  "pageNotFound": "Siden blev ikke fundet",
  "couldNotFindPage": "Vi kunne ikke finde den side, du leder efter. Kontroller venligst URL'en og prøv igen.",
  "returnToDashboard": "Tilbage til kontrolpanelet",
  
  // Reset Password Page
  "resetPassword": "Nulstil adgangskode",
  "enterEmail": "Indtast din e-mailadresse, og vi sender dig et link til at nulstille din adgangskode",
  "email": "E-mail",
  "sendResetLink": "Send nulstillingslink",
  "sending": "Sender",
  "checkEmail": "Tjek din e-mail",
  "resetLinkSent": "Vi har sendt et link til nulstilling af adgangskode til",
  "didntReceiveEmail": "Modtog du ikke e-mailen? Tjek din spammappe eller prøv igen.",
  "backToSignIn": "Tilbage til login",
  
  // Review Step (Onboarding)
  "reviewInformation": "Gennemgå dine oplysninger",
  "reviewBeforeFinalizing": "Gennemgå venligst oplysningerne nedenfor, før du færdiggør din kontoopsætning.",
  "accountInformation": "Kontooplysninger",
  "companyName": "Virksomhedsnavn",
  "notProvided": "Ikke angivet",
  "industry": "Branche",
  "portfolioPreferencesTitle": "Porteføljepræferencer",
  "energyMixLabel": "Energimiks",
  "solar": "Sol",
  "wind": "Vind",
  "electricityProvider": "Elleverandør",
  "provider": "Leverandør",
  "contractNumber": "Kontraktnummer",
  "annualConsumption": "Årligt forbrug",
  "peakLoad": "Spidsbelastning",
  "powerOfAttorney": "Fuldmagt",
  "documentUploaded": "Dokument uploadet",
  "noDocumentUploaded": "Intet dokument uploadet",
  "completeSetup": "Ved at klikke på \"Fuldfør opsætning\" accepterer du vores",
  "termsOfService": "Servicevilkår",
  "privacyPolicy": "Privatlivspolitik"
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
