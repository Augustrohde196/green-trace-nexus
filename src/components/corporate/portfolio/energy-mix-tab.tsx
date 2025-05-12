
import { useState } from "react";
import { Wind, SunMedium, InfoIcon, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";

type EnergyMixTabProps = {
  windPreference: number;
  setWindPreference: (value: number) => void;
  solarPreference: number;
  setSolarPreference: (value: number) => void;
  btmPriorityEnabled: boolean;
  setBtmPriorityEnabled: (value: boolean) => void;
  onSave: () => void;
};

export const EnergyMixTab = ({
  windPreference,
  setWindPreference,
  solarPreference,
  setSolarPreference,
  btmPriorityEnabled,
  setBtmPriorityEnabled,
  onSave
}: EnergyMixTabProps) => {
  const { t } = useLanguage();
  
  const handleSolarChange = (value: number[]) => {
    const newSolarValue = value[0];
    setSolarPreference(newSolarValue);
    setWindPreference(100 - newSolarValue);
  };

  const handleWindChange = (value: number[]) => {
    const newWindValue = value[0];
    setWindPreference(newWindValue);
    setSolarPreference(100 - newWindValue);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("sourceTypeMix")}</CardTitle>
        <CardDescription>
          {t("setPercentageSplit")}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Wind className="h-5 w-5 text-blue-500" />
              <Label htmlFor="wind-slider" className="font-medium">{t("windEnergy")}</Label>
            </div>
            <span className="font-medium">{windPreference}%</span>
          </div>
          <Slider
            id="wind-slider"
            value={[windPreference]}
            max={100}
            step={1}
            onValueChange={handleWindChange}
            className="mb-6"
          />
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <SunMedium className="h-5 w-5 text-yellow-500" />
              <Label htmlFor="solar-slider" className="font-medium">{t("solarEnergy")}</Label>
            </div>
            <span className="font-medium">{solarPreference}%</span>
          </div>
          <Slider
            id="solar-slider"
            value={[solarPreference]}
            max={100}
            step={1}
            onValueChange={handleSolarChange}
          />
          
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              <Label htmlFor="btm-priority" className="font-medium">{t("behindTheMeterPriority")}</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    If your facility has on-site (BTM) energy generation, Renuw will automatically prioritise it to optimise coverage and time-matching.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Switch 
              id="btm-priority" 
              checked={btmPriorityEnabled}
              onCheckedChange={setBtmPriorityEnabled}
            />
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex items-start gap-3">
            <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm">
                These preferences will guide how your renewable energy is sourced. 
                Our allocation engine will try to match your consumption with these 
                preferences when possible.
              </p>
            </div>
          </div>
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
