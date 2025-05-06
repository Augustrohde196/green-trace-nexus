import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Save, Wind, SunMedium } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast"; // Fixed import path
import { motion } from "framer-motion";

const CorporatePortfolio = () => {
  // Portfolio preference state
  const [windPreference, setWindPreference] = useState(70);
  const [solarPreference, setSolarPreference] = useState(30);
  
  // Time matching preferences
  const [timeMatchingEnabled, setTimeMatchingEnabled] = useState(true);
  const [timeMatchingTarget, setTimeMatchingTarget] = useState(80);
  
  // Location preferences
  const [locationMatchingEnabled, setLocationMatchingEnabled] = useState(true);
  const [maxDistance, setMaxDistance] = useState(300);
  
  // BTM vs FTM preferences
  const [btmPercentage, setBtmPercentage] = useState(45);
  const [ftmPercentage, setFtmPercentage] = useState(55);

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
  
  const handleBtmChange = (value: number[]) => {
    const newBtmValue = value[0];
    setBtmPercentage(newBtmValue);
    setFtmPercentage(100 - newBtmValue);
  };

  const handleSave = () => {
    toast({
      title: "Portfolio preferences saved",
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
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio Preferences</h2>
        <p className="text-muted-foreground">Customize your energy portfolio preferences</p>
      </div>
      
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5">
          <CardTitle className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2zM6 15a2 2 0 0 0 0 4h2a2 2 0 0 0 0-4H6zM16 15a2 2 0 0 1 0 4h-2a2 2 0 0 1 0-4h2zM8 8a2 2 0 0 1 0-4h2a2 2 0 0 1 0 4H8zM12 9v6"/></svg>
            </div>
            Your Utility Provider
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold">Energi Danmark A/S</h3>
              <p className="text-muted-foreground mt-1">Contract since January 2023</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-medium">Account Manager:</span>
                <span className="text-sm">Marie Jørgensen</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0 p-4 bg-muted/30 rounded-lg">
              <div className="text-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <span className="text-muted-foreground">Contact Email:</span>
                  <span>support@energidanmark.dk</span>
                  <span className="text-muted-foreground">Phone Number:</span>
                  <span>+45 7015 1060</span>
                  <span className="text-muted-foreground">Contract End:</span>
                  <span>December 2025</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <InfoIcon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
        <AlertTitle>Current Preference Summary</AlertTitle>
        <AlertDescription>
          Your current preferences: Wind {windPreference}%, Solar {solarPreference}%, 
          {locationMatchingEnabled ? ` Local sources prioritized (max ${maxDistance}km)` : ' No location constraints'}, 
          BTM {btmPercentage}% / FTM {ftmPercentage}%
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="energy-mix" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="energy-mix">Energy Mix</TabsTrigger>
          <TabsTrigger value="location">Location Preferences</TabsTrigger>
          <TabsTrigger value="distribution">Source Distribution</TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy-mix" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Source Type Mix</CardTitle>
              <CardDescription>
                Set your preferred percentage split between renewable energy sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-blue-500" />
                    <Label htmlFor="wind-slider" className="font-medium">Wind Energy</Label>
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
                    <Label htmlFor="solar-slider" className="font-medium">Solar Energy</Label>
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
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Geographical Preferences</CardTitle>
              <CardDescription>
                Set your location-based preferences to prioritize energy production closer to your consumption
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
                  <Label htmlFor="location-matching" className="font-medium">Prioritize local production</Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    When enabled, we will prioritize energy produced closer to your consumption location
                  </p>
                </div>
              </div>
              
              {locationMatchingEnabled && (
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="distance-slider">Maximum Distance</Label>
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
                      <span>Local (50km)</span>
                      <span>Regional (500km)</span>
                      <span>International (1000km)</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg mt-4">
                    <p className="text-sm">
                      Lower distances prioritize energy produced closer to your consumption, 
                      but may limit available options. The system will always try to meet your 
                      volume requirements first, even if it means going beyond your preferred distance.
                    </p>
                  </div>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="distribution" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>BTM vs FTM Distribution</CardTitle>
              <CardDescription>
                Set your preferred distribution between Behind-the-Meter and Front-of-Meter energy sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="btm-slider" className="font-medium">Behind-the-Meter (BTM)</Label>
                    <span>{btmPercentage}%</span>
                  </div>
                  <Slider
                    id="btm-slider"
                    value={[btmPercentage]}
                    max={100}
                    step={5}
                    onValueChange={handleBtmChange}
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="ftm-slider" className="font-medium">Front-of-Meter (FTM)</Label>
                    <span>{ftmPercentage}%</span>
                  </div>
                  <Slider
                    id="ftm-slider"
                    value={[ftmPercentage]}
                    max={100}
                    step={5}
                    disabled
                  />
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What's the difference?</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Behind-the-Meter (BTM):</strong> Energy generated on-site or directly connected to your facility, like rooftop solar.</li>
                  <li><strong>Front-of-Meter (FTM):</strong> Energy from grid-connected renewable sources like utility-scale wind farms or solar plants.</li>
                </ul>
                <p className="text-sm mt-2">
                  If you have on-site generation facilities, you can prioritize their use through BTM allocation.
                </p>
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default CorporatePortfolio;
