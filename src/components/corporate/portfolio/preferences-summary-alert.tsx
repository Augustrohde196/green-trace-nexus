
import { InfoIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useLanguage } from "@/contexts/LanguageContext";

type PreferencesSummaryProps = {
  windPreference: number;
  solarPreference: number;
  locationMatchingEnabled: boolean;
  maxDistance: number;
};

export const PreferencesSummaryAlert = ({
  windPreference,
  solarPreference,
  locationMatchingEnabled,
  maxDistance
}: PreferencesSummaryProps) => {
  const { t } = useLanguage();
  
  return (
    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
      <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      <AlertTitle>{t("currentPreferenceSummary")}</AlertTitle>
      <AlertDescription>
        {t("wind")} {windPreference}%, {t("solar")} {solarPreference}%, 
        {locationMatchingEnabled ? ` ${t("local")} (${maxDistance}km)` : ` ${t("noLocationConstraints")}`}
      </AlertDescription>
    </Alert>
  );
};
