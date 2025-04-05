
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Save, Wind, SunMedium, Droplets } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const CorporatePortfolio = () => {
  // Portfolio preference state
  const [windPreference, setWindPreference] = useState(40);
  const [solarPreference, setSolarPreference] = useState(40);
  const [hydroPreference, setHydroPreference] = useState(20);
  
  // Time matching preferences
  const [timeMatchingEnabled, setTimeMatchingEnabled] = useState(true);
  const [timeMatchingTarget, setTimeMatchingTarget] = useState(80);
  
  // Location preferences
  const [locationMatchingEnabled, setLocationMatchingEnabled] = useState(true);
  const [maxDistance, setMaxDistance] = useState(300);

  const handleSave = () => {
    toast({
      title: "Portfolio preferences saved",
      description: "Your portfolio settings have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Portfolio Settings</h2>
        <p className="text-muted-foreground">Customize your energy portfolio preferences</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Your Utility Provider</CardTitle>
          <CardDescription>You are currently working with</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 bg-primary/5 p-4 rounded-lg">
            <div className="h-16 w-16 flex items-center justify-center bg-primary/10 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8a2 2 0 0 0 0-4h-2a2 2 0 0 0 0 4h2zM6 15a2 2 0 0 0 0 4h2a2 2 0 0 0 0-4H6zM16 15a2 2 0 0 1 0 4h-2a2 2 0 0 1 0-4h2zM8 8a2 2 0 0 1 0-4h2a2 2 0 0 1 0 4H8zM12 9v6"/></svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Energi Danmark A/S</h3>
              <p className="text-muted-foreground">Contract since January 2023</p>
              <p className="text-sm mt-1">Contact: support@energidanmark.dk | +45 7015 1060</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="energy-mix">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="energy-mix">Energy Mix</TabsTrigger>
          <TabsTrigger value="time-matching">Time Matching</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>
        
        <TabsContent value="energy-mix" className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Energy Mix Preferences</AlertTitle>
            <AlertDescription>
              Set your preferred energy mix for your portfolio. The system will try to match your consumption with these preferences.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Wind Energy</CardTitle>
              <CardDescription>Set your preferred percentage of wind energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4">
                <Wind className="h-5 w-5 text-blue-500" />
                <Slider
                  value={[windPreference]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setWindPreference(value[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{windPreference}%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Solar Energy</CardTitle>
              <CardDescription>Set your preferred percentage of solar energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4">
                <SunMedium className="h-5 w-5 text-yellow-500" />
                <Slider
                  value={[solarPreference]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setSolarPreference(value[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{solarPreference}%</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Hydro Energy</CardTitle>
              <CardDescription>Set your preferred percentage of hydro energy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-4">
                <Droplets className="h-5 w-5 text-cyan-500" />
                <Slider
                  value={[hydroPreference]}
                  max={100}
                  step={1}
                  onValueChange={(value) => setHydroPreference(value[0])}
                  className="flex-1"
                />
                <span className="w-10 text-right">{hydroPreference}%</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="time-matching" className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Time Matching</AlertTitle>
            <AlertDescription>
              Enable time matching to ensure your consumption is matched with renewable production at the same time.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Time Matching Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="time-matching" 
                  checked={timeMatchingEnabled}
                  onCheckedChange={setTimeMatchingEnabled}
                />
                <Label htmlFor="time-matching">Enable time matching</Label>
              </div>
              
              {timeMatchingEnabled && (
                <div className="space-y-2 pt-2">
                  <Label>Target Time Matching Score: {timeMatchingTarget}%</Label>
                  <Slider
                    value={[timeMatchingTarget]}
                    max={100}
                    step={5}
                    onValueChange={(value) => setTimeMatchingTarget(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Higher targets may cost more but will ensure better temporal matching of your consumption.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="location" className="space-y-4">
          <Alert>
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Location Preferences</AlertTitle>
            <AlertDescription>
              Set your location preferences to prioritize energy production closer to your consumption.
            </AlertDescription>
          </Alert>
          
          <Card>
            <CardHeader>
              <CardTitle>Location Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="location-matching" 
                  checked={locationMatchingEnabled}
                  onCheckedChange={setLocationMatchingEnabled}
                />
                <Label htmlFor="location-matching">Prioritize local production</Label>
              </div>
              
              {locationMatchingEnabled && (
                <div className="space-y-2 pt-2">
                  <Label>Maximum Distance: {maxDistance} km</Label>
                  <Slider
                    value={[maxDistance]}
                    min={50}
                    max={1000}
                    step={50}
                    onValueChange={(value) => setMaxDistance(value[0])}
                  />
                  <p className="text-sm text-muted-foreground">
                    Lower distances may limit available options but will ensure energy is produced closer to your consumption.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Preferences
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporatePortfolio;
