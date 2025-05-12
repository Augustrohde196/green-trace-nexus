
import { Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type LocationTabProps = {
  locationMatchingEnabled: boolean;
  setLocationMatchingEnabled: (value: boolean) => void;
  maxDistance: number;
  setMaxDistance: (value: number) => void;
  onSave: () => void;
};

export const LocationTab = ({
  locationMatchingEnabled,
  setLocationMatchingEnabled,
  maxDistance,
  setMaxDistance,
  onSave
}: LocationTabProps) => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("geographicalPreferences")}</CardTitle>
        <CardDescription>
          {t("setLocationPreferences")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch 
            id="location-matching" 
            checked={locationMatchingEnabled}
            onCheckedChange={setLocationMatchingEnabled}
          />
          <div>
            <Label htmlFor="location-matching" className="font-medium">{t("prioritizeLocal")}</Label>
            <p className="text-sm text-muted-foreground mt-1">
              {t("whenEnabled")}
            </p>
          </div>
        </div>
        
        {locationMatchingEnabled && (
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="distance-slider">{t("maximumDistance")}</Label>
                <span className="font-medium">{maxDistance} km</span>
              </div>
              <Slider
                id="distance-slider"
                value={[maxDistance]}
                min={50}
                max={1000}
                step={50}
                onValueChange={(value) => setMaxDistance(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{t("local")}</span>
                <span>{t("regional")}</span>
                <span>{t("international")}</span>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg mt-4">
              <p className="text-sm">
                {t("lowerDistances")}
              </p>
            </div>
          </div>
        )}
        
        <div className="flex justify-end">
          <Button onClick={onSave}>
            <Save className="mr-2 h-4 w-4" />
            {t("savePreferences")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
