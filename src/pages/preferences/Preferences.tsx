
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Wind, Sun, Waves, Clock } from "lucide-react";
import { TimeMatchingPreference } from "@/components/preferences/time-matching-preference";

export default function Preferences() {
  const [energyPreference, setEnergyPreference] = useState({
    wind: true,
    solar: true,
    hydro: false
  });
  
  const [strictness, setStrictness] = useState("balanced");
  const [priority, setPriority] = useState("proximity");
  
  const calculateProgress = (preference: string) => {
    if (preference === "local") return 100;
    if (preference === "balanced") return 65;
    if (preference === "lowest-cost") return 30;
    return 50;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Preferences</h2>
        <p className="text-muted-foreground">
          Customize how we allocate renewable energy to your consumption
        </p>
      </div>
      
      {/* Energy Type Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            Energy Type Preference
          </CardTitle>
          <CardDescription>
            Select which types of renewable energy sources you prefer
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">Source Diversity</div>
            <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <Progress value={Object.values(energyPreference).filter(Boolean).length * 33} className="h-2 mb-6" />
          
          <div className="flex flex-col gap-3">
            <Toggle 
              variant="outline"
              pressed={energyPreference.wind}
              onPressedChange={(pressed) => setEnergyPreference({...energyPreference, wind: pressed})}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex items-center">
                <Wind className="mr-2 h-4 w-4 text-blue-500" />
                <span>Wind Energy</span>
              </div>
              {energyPreference.wind && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={energyPreference.solar}
              onPressedChange={(pressed) => setEnergyPreference({...energyPreference, solar: pressed})}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex items-center">
                <Sun className="mr-2 h-4 w-4 text-amber-500" />
                <span>Solar Energy</span>
              </div>
              {energyPreference.solar && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={energyPreference.hydro}
              onPressedChange={(pressed) => setEnergyPreference({...energyPreference, hydro: pressed})}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex items-center">
                <Waves className="mr-2 h-4 w-4 text-cyan-500" />
                <span>Hydro Energy</span>
              </div>
              {energyPreference.hydro && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
      
      {/* Geographic Preference */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapIcon className="h-5 w-5 text-primary" />
            Geographic Preference
          </CardTitle>
          <CardDescription>
            Choose how important location is for your energy sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">Location Priority</div>
            <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <Progress value={calculateProgress(priority)} className="h-2 mb-6" />
          
          <div className="flex flex-col gap-3">
            <Toggle 
              variant="outline"
              pressed={priority === 'proximity'}
              onPressedChange={() => setPriority('proximity')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Prioritize Proximity</span>
                <span className="text-xs text-muted-foreground">Favor energy from sources closest to you</span>
              </div>
              {priority === 'proximity' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={priority === 'country'}
              onPressedChange={() => setPriority('country')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Country of Origin</span>
                <span className="text-xs text-muted-foreground">Prefer energy from within your country</span>
              </div>
              {priority === 'country' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={priority === 'any'}
              onPressedChange={() => setPriority('any')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">No Geographic Preference</span>
                <span className="text-xs text-muted-foreground">Allow energy from any location</span>
              </div>
              {priority === 'any' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
      
      {/* Matching Strictness */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <StrictnessIcon className="h-5 w-5 text-primary" />
            Matching Strictness
          </CardTitle>
          <CardDescription>
            Set your preferred balance between cost and strict matching
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm font-medium">Strictness Level</div>
            <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>
          </div>
          
          <Progress value={calculateProgress(strictness)} className="h-2 mb-6" />
          
          <div className="flex flex-col gap-3">
            <Toggle 
              variant="outline"
              pressed={strictness === 'strict'}
              onPressedChange={() => setStrictness('strict')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Maximum Strictness</span>
                <span className="text-xs text-muted-foreground">Highest precision matching (potentially higher cost)</span>
              </div>
              {strictness === 'strict' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={strictness === 'balanced'}
              onPressedChange={() => setStrictness('balanced')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Balanced Approach</span>
                <span className="text-xs text-muted-foreground">Good matching while managing costs</span>
              </div>
              {strictness === 'balanced' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
            
            <Toggle 
              variant="outline"
              pressed={strictness === 'flexible'}
              onPressedChange={() => setStrictness('flexible')}
              className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">Cost-Optimized</span>
                <span className="text-xs text-muted-foreground">Prioritize cost-effectiveness over strict matching</span>
              </div>
              {strictness === 'flexible' && (
                <Badge className="bg-primary text-white ml-2">Selected</Badge>
              )}
            </Toggle>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Preferences</Button>
        </CardFooter>
      </Card>
      
      {/* Time Matching Preference */}
      <TimeMatchingPreference />
    </div>
  );
}

// Helper Icon components
const MapIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0116 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const StrictnessIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="4" y1="21" x2="4" y2="14"/>
    <line x1="4" y1="10" x2="4" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12" y2="3"/>
    <line x1="20" y1="21" x2="20" y2="16"/>
    <line x1="20" y1="12" x2="20" y2="3"/>
    <line x1="1" y1="14" x2="7" y2="14"/>
    <line x1="9" y1="8" x2="15" y2="8"/>
    <line x1="17" y1="16" x2="23" y2="16"/>
  </svg>
);
