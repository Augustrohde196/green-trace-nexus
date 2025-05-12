
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export const PortfolioHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{t("portfolioPreferences")}</h2>
      <p className="text-muted-foreground">{t("customizePortfolio")}</p>
    </div>
  );
};
