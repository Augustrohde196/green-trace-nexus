
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export const TimeMatchingPreference = () => {
  const [selectedLevel, setSelectedLevel] = useState<"hourly" | "daily" | "monthly">("hourly");
  const [saved, setSaved] = useState(true);

  const handleSave = () => {
    setSaved(true);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Time Matching Preference
        </CardTitle>
        <CardDescription>
          Set your preferred temporal granularity for matching production to consumption
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">Time Matching Precision</div>
          {saved && <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>}
        </div>
        
        <Progress value={selectedLevel === "hourly" ? 100 : selectedLevel === "daily" ? 67 : 33} className="h-2 mb-6" />
        
        <div className="flex flex-col gap-3">
          <Toggle 
            variant="outline"
            pressed={selectedLevel === "hourly"}
            onPressedChange={() => {
              setSelectedLevel("hourly");
              setSaved(false);
            }}
            className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Hourly Matching</span>
              <span className="text-xs text-muted-foreground">Highest precision - matches each hour</span>
            </div>
            {selectedLevel === "hourly" && (
              <Badge className="bg-primary text-white ml-2">Selected</Badge>
            )}
          </Toggle>
          
          <Toggle 
            variant="outline"
            pressed={selectedLevel === "daily"}
            onPressedChange={() => {
              setSelectedLevel("daily");
              setSaved(false);
            }}
            className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Daily Matching</span>
              <span className="text-xs text-muted-foreground">Medium precision - matches each day</span>
            </div>
            {selectedLevel === "daily" && (
              <Badge className="bg-primary text-white ml-2">Selected</Badge>
            )}
          </Toggle>
          
          <Toggle 
            variant="outline"
            pressed={selectedLevel === "monthly"}
            onPressedChange={() => {
              setSelectedLevel("monthly");
              setSaved(false);
            }}
            className="flex items-center justify-between w-full px-4 py-2 h-auto data-[state=on]:bg-primary/10"
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">Monthly Matching</span>
              <span className="text-xs text-muted-foreground">Standard precision - matches each month</span>
            </div>
            {selectedLevel === "monthly" && (
              <Badge className="bg-primary text-white ml-2">Selected</Badge>
            )}
          </Toggle>
        </div>
        
        <div className="bg-muted/50 p-3 rounded-md text-sm">
          <p className="text-muted-foreground">
            <strong>Hourly matching</strong> is the most precise temporal matching of renewable energy production 
            to your consumption. This ensures your renewable energy is produced the same hour it's consumed.
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSave} disabled={saved}>Save Preference</Button>
      </CardFooter>
    </Card>
  );
};
