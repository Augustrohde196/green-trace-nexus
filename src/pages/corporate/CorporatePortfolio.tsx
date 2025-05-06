
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, Clock, BarChart4, CalendarClock, Calendar } from "lucide-react";

export default function CorporatePortfolio() {
  const [activeTab, setActiveTab] = useState("general");
  const [selectedMatching, setSelectedMatching] = useState<"hourly" | "monthly" | "yearly">("hourly");
  const [matchingScore, setMatchingScore] = useState(85);
  const { toast } = useToast();
  
  const handleSavePreferences = () => {
    toast({
      title: "Preferences saved",
      description: "Your portfolio preferences have been updated successfully."
    });
  };
  
  const getMatchingDescription = (type: "hourly" | "monthly" | "yearly") => {
    switch (type) {
      case "hourly":
        return "Hourly matching ensures that your renewable energy consumption aligns with production on an hour-by-hour basis, providing the highest level of accuracy.";
      case "monthly":
        return "Monthly matching balances your renewable energy consumption with production over each month, offering a good balance of accuracy and flexibility.";
      case "yearly":
        return "Yearly matching ensures your total annual consumption matches renewable production, offering maximum flexibility but less temporal precision.";
    }
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
        <p className="text-muted-foreground">
          Customize how you want to manage your renewable energy portfolio
        </p>
      </div>
      
      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList>
          <TabsTrigger value="general">General Preferences</TabsTrigger>
          <TabsTrigger value="matching">Time Matching</TabsTrigger>
          <TabsTrigger value="reporting">Reporting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Source Preferences</CardTitle>
              <CardDescription>
                Set your preferences for energy source types
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Energy source preferences content */}
              <div className="text-center text-muted-foreground py-8">
                Energy source preference settings coming soon
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSavePreferences}>Save Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="matching" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Time Matching Score</CardTitle>
              <CardDescription>
                Choose how closely your consumption should match production in time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between mb-1">
                  <span className="font-medium">Matching Precision</span>
                  <span className="text-primary font-bold">{matchingScore}%</span>
                </div>
                <Progress value={matchingScore} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  Your current time matching score indicates a {matchingScore >= 80 ? "high" : matchingScore >= 60 ? "moderate" : "low"} level of temporal correlation between your energy consumption and renewable production.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <h3 className="font-medium">Select Time Matching Preference</h3>
                
                <div className="grid gap-4 md:grid-cols-3">
                  <Card 
                    className={`cursor-pointer ${selectedMatching === "hourly" ? "border-primary bg-primary/5" : "hover:border-muted-foreground/20"}`}
                    onClick={() => setSelectedMatching("hourly")}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Clock className="h-5 w-5 text-primary" />
                        {selectedMatching === "hourly" && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                      <h4 className="font-medium">Hourly Matching</h4>
                      <p className="text-xs text-muted-foreground">Highest precision, matching energy on an hourly basis</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer ${selectedMatching === "monthly" ? "border-primary bg-primary/5" : "hover:border-muted-foreground/20"}`}
                    onClick={() => setSelectedMatching("monthly")}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <CalendarClock className="h-5 w-5 text-primary" />
                        {selectedMatching === "monthly" && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                      <h4 className="font-medium">Monthly Matching</h4>
                      <p className="text-xs text-muted-foreground">Balance energy usage with production on a monthly basis</p>
                    </CardContent>
                  </Card>
                  
                  <Card 
                    className={`cursor-pointer ${selectedMatching === "yearly" ? "border-primary bg-primary/5" : "hover:border-muted-foreground/20"}`}
                    onClick={() => setSelectedMatching("yearly")}
                  >
                    <CardContent className="p-4 space-y-2">
                      <div className="flex justify-between items-center">
                        <Calendar className="h-5 w-5 text-primary" />
                        {selectedMatching === "yearly" && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>
                      <h4 className="font-medium">Yearly Matching</h4>
                      <p className="text-xs text-muted-foreground">Maximum flexibility with yearly balancing</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <h4 className="font-medium flex items-center gap-2">
                    <BarChart4 className="h-4 w-4 text-primary" />
                    About {selectedMatching} matching
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getMatchingDescription(selectedMatching)}
                  </p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button onClick={handleSavePreferences}>Save Time Matching Preference</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reporting" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Reporting Preferences</CardTitle>
              <CardDescription>
                Configure how you want to receive reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground py-8">
                Reporting preference settings coming soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
