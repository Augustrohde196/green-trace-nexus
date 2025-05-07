
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gauge, MapPin, Clock } from "lucide-react";
import { TimeMatchingPreference } from "./time-matching-preference";
import { cn } from "@/lib/utils";

type PreferenceView = "energy-mix" | "location" | "time-matching";

export function PreferencesNavigation() {
  const [activeView, setActiveView] = useState<PreferenceView>("energy-mix");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          variant="outline"
          onClick={() => setActiveView("energy-mix")}
          className={cn(
            "flex flex-col h-auto py-4 gap-2 items-center justify-center",
            activeView === "energy-mix" && "border-primary bg-primary/5"
          )}
        >
          <Gauge className={cn("h-6 w-6", activeView === "energy-mix" ? "text-primary" : "text-muted-foreground")} />
          <span className={activeView === "energy-mix" ? "text-primary" : "text-muted-foreground"}>Energy Mix</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveView("location")}
          className={cn(
            "flex flex-col h-auto py-4 gap-2 items-center justify-center",
            activeView === "location" && "border-primary bg-primary/5"
          )}
        >
          <MapPin className={cn("h-6 w-6", activeView === "location" ? "text-primary" : "text-muted-foreground")} />
          <span className={activeView === "location" ? "text-primary" : "text-muted-foreground"}>Location Preferences</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setActiveView("time-matching")}
          className={cn(
            "flex flex-col h-auto py-4 gap-2 items-center justify-center",
            activeView === "time-matching" && "border-primary bg-primary/5"
          )}
        >
          <Clock className={cn("h-6 w-6", activeView === "time-matching" ? "text-primary" : "text-muted-foreground")} />
          <span className={activeView === "time-matching" ? "text-primary" : "text-muted-foreground"}>Time Matching</span>
        </Button>
      </div>

      {activeView === "energy-mix" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Energy Mix Preferences</h2>
          <p className="text-muted-foreground mb-6">Configure your preferred mix of renewable energy sources.</p>
          
          <div className="space-y-4">
            {/* Placeholder content for energy mix preferences */}
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <label className="font-medium">Wind</label>
                <span>60%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="font-medium">Solar</label>
                <span>30%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '30%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="font-medium">Hydro</label>
                <span>10%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-full bg-cyan-500 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <Button className="mt-6">Save Preferences</Button>
          </div>
        </Card>
      )}
      
      {activeView === "location" && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Location Preferences</h2>
          <p className="text-muted-foreground mb-6">Choose geographic regions for your renewable energy supply.</p>
          
          <div className="space-y-4">
            {/* Placeholder content for location preferences */}
            <div className="grid gap-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="denmark" className="rounded text-primary" defaultChecked />
                <label htmlFor="denmark">Denmark</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="sweden" className="rounded text-primary" defaultChecked />
                <label htmlFor="sweden">Sweden</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="norway" className="rounded text-primary" />
                <label htmlFor="norway">Norway</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="germany" className="rounded text-primary" />
                <label htmlFor="germany">Germany</label>
              </div>
            </div>
            
            <Button className="mt-6">Save Preferences</Button>
          </div>
        </Card>
      )}
      
      {activeView === "time-matching" && <TimeMatchingPreference />}
    </div>
  );
}
