
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

// Import our new components
import { PortfolioHeader } from "@/components/corporate/portfolio/portfolio-header";
import { UtilityProviderCard } from "@/components/corporate/portfolio/utility-provider-card";
import { PreferencesSummaryAlert } from "@/components/corporate/portfolio/preferences-summary-alert";
import { PortfolioTabs } from "@/components/corporate/portfolio/portfolio-tabs";

const CorporatePortfolio = () => {
  // Get translation function
  const { t } = useLanguage();
  
  // Portfolio preference state
  const [windPreference, setWindPreference] = useState(70);
  const [solarPreference, setSolarPreference] = useState(30);
  
  // Time matching preferences
  const [timeMatchingEnabled, setTimeMatchingEnabled] = useState(true);
  const [timeMatchingTarget, setTimeMatchingTarget] = useState(80);
  
  // Location preferences
  const [locationMatchingEnabled, setLocationMatchingEnabled] = useState(true);
  const [maxDistance, setMaxDistance] = useState(300);
  
  // BTM priority preference
  const [btmPriorityEnabled, setBtmPriorityEnabled] = useState(true);
  
  // Initialize the toast hook
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: t("savePreferences"),
      description: "Your portfolio settings have been updated successfully. Future allocations will use these settings.",
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <PortfolioHeader />
      
      <UtilityProviderCard />
      
      <PreferencesSummaryAlert 
        windPreference={windPreference}
        solarPreference={solarPreference}
        locationMatchingEnabled={locationMatchingEnabled}
        maxDistance={maxDistance}
      />
      
      <PortfolioTabs
        windPreference={windPreference}
        setWindPreference={setWindPreference}
        solarPreference={solarPreference}
        setSolarPreference={setSolarPreference}
        btmPriorityEnabled={btmPriorityEnabled}
        setBtmPriorityEnabled={setBtmPriorityEnabled}
        timeMatchingTarget={timeMatchingTarget}
        setTimeMatchingTarget={setTimeMatchingTarget}
        locationMatchingEnabled={locationMatchingEnabled}
        setLocationMatchingEnabled={setLocationMatchingEnabled}
        maxDistance={maxDistance}
        setMaxDistance={setMaxDistance}
        onSave={handleSave}
      />
    </motion.div>
  );
};

export default CorporatePortfolio;
