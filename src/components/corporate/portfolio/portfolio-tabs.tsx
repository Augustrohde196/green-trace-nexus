
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnergyMixTab } from "./energy-mix-tab";
import { LocationTab } from "./location-tab";
import { TimeMatchingTab } from "./time-matching-tab";
import { useLanguage } from "@/contexts/LanguageContext";

type PortfolioTabsProps = {
  windPreference: number;
  setWindPreference: (value: number) => void;
  solarPreference: number;
  setSolarPreference: (value: number) => void;
  btmPriorityEnabled: boolean;
  setBtmPriorityEnabled: (value: boolean) => void;
  timeMatchingTarget: number;
  setTimeMatchingTarget: (value: number) => void;
  locationMatchingEnabled: boolean;
  setLocationMatchingEnabled: (value: boolean) => void;
  maxDistance: number;
  setMaxDistance: (value: number) => void;
  onSave: () => void;
};

export const PortfolioTabs = ({
  windPreference,
  setWindPreference,
  solarPreference,
  setSolarPreference,
  btmPriorityEnabled,
  setBtmPriorityEnabled,
  timeMatchingTarget,
  setTimeMatchingTarget,
  locationMatchingEnabled,
  setLocationMatchingEnabled,
  maxDistance,
  setMaxDistance,
  onSave
}: PortfolioTabsProps) => {
  const { t } = useLanguage();
  
  return (
    <Tabs defaultValue="energy-mix" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="energy-mix">{t("energyMixTab")}</TabsTrigger>
        <TabsTrigger value="location">{t("locationTab")}</TabsTrigger>
        <TabsTrigger value="time-matching">{t("timeMatchingTab")}</TabsTrigger>
      </TabsList>
      
      <TabsContent value="energy-mix" className="space-y-4 pt-4">
        <EnergyMixTab
          windPreference={windPreference}
          setWindPreference={setWindPreference}
          solarPreference={solarPreference}
          setSolarPreference={setSolarPreference}
          btmPriorityEnabled={btmPriorityEnabled}
          setBtmPriorityEnabled={setBtmPriorityEnabled}
          onSave={onSave}
        />
      </TabsContent>
      
      <TabsContent value="location" className="space-y-4 pt-4">
        <LocationTab
          locationMatchingEnabled={locationMatchingEnabled}
          setLocationMatchingEnabled={setLocationMatchingEnabled}
          maxDistance={maxDistance}
          setMaxDistance={setMaxDistance}
          onSave={onSave}
        />
      </TabsContent>
      
      <TabsContent value="time-matching" className="space-y-4 pt-4">
        <TimeMatchingTab
          timeMatchingTarget={timeMatchingTarget}
          setTimeMatchingTarget={setTimeMatchingTarget}
          onSave={onSave}
        />
      </TabsContent>
    </Tabs>
  );
};
