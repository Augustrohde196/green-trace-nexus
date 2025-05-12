
import { Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

type TimeMatchingTabProps = {
  timeMatchingTarget: number;
  setTimeMatchingTarget: (value: number) => void;
  onSave: () => void;
};

export const TimeMatchingTab = ({
  timeMatchingTarget,
  setTimeMatchingTarget,
  onSave
}: TimeMatchingTabProps) => {
  const { t } = useLanguage();
  
  const handleTimeMatchingChange = (value: number[]) => {
    setTimeMatchingTarget(value[0]);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("timeMatchingPreference")}</CardTitle>
        <CardDescription>
          {t("setPreferredLevel")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="time-matching-slider" className="font-medium">{t("timeMatching")}</Label>
              <span>{timeMatchingTarget}%</span>
            </div>
            <Slider
              id="time-matching-slider"
              value={[timeMatchingTarget]}
              max={100}
              step={5}
              onValueChange={handleTimeMatchingChange}
            />
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <h4 className="font-medium mb-2">{t("timeMatchingExplained")}</h4>
          <p className="text-sm">
            {t("higherPriorityMeans")}
          </p>
        </div>
        
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
