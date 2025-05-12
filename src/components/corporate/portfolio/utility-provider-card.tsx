
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const UtilityProviderCard = () => {
  const { t } = useLanguage();
  
  return (
    <Card className="border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2zM6 15a2 2 0 0 0 0 4h2a2 2 0 0 0 0-4H6zM16 15a2 2 0 0 1 0 4h-2a2 2 0 0 1 0-4h2zM8 8a2 2 0 0 1 0-4h2a2 2 0 0 1 0 4H8zM12 9v6"/></svg>
          </div>
          {t("yourUtilityProvider")}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">Energi Danmark A/S</h3>
            <p className="text-muted-foreground mt-1">{t("contractSince")}</p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-sm font-medium">{t("accountManager")}:</span>
              <span className="text-sm">Marie Jørgensen</span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 p-4 bg-muted/30 rounded-lg">
            <div className="text-sm">
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                <span className="text-muted-foreground">{t("contactEmail")}:</span>
                <span>support@energidanmark.dk</span>
                <span className="text-muted-foreground">{t("phoneNumber")}:</span>
                <span>+45 7015 1060</span>
                <span className="text-muted-foreground">{t("contractEnd")}:</span>
                <span>December 2025</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
