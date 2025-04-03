
import { useState, useEffect } from "react";
import { Zap, BarChart3, Check, Waves, Activity, Lightbulb } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { GOTrackingTable } from "@/components/go/go-tracking-table";
import { matchingEngineService } from "@/services/matching-engine-service";
import { goService } from "@/services/go-service";
import { mockCustomers } from "@/data/mock-data";
import { AllocationPrediction } from "@/data/go-models";
import { toast } from "@/hooks/use-toast";

export default function MatchingEngine() {
  const [activeTab, setActiveTab] = useState("overview");
  const [predictions, setPredictions] = useState<AllocationPrediction[]>([]);
  const [isRunningPrediction, setIsRunningPrediction] = useState(false);
  const [isAllocating, setIsAllocating] = useState(false);
  const [metrics, setMetrics] = useState(goService.getMetrics());
  
  // Generate predictions on initial load
  useEffect(() => {
    runPredictionModel();
  }, []);
  
  // Refresh metrics when tab changes
  useEffect(() => {
    setMetrics(goService.getMetrics());
  }, [activeTab]);
  
  const runPredictionModel = () => {
    setIsRunningPrediction(true);
    
    // Simulate ML processing time
    setTimeout(() => {
      const availableGOs = goService.getAvailableGOs();
      const predictions = matchingEngineService.predictOptimalAllocations(
        availableGOs,
        mockCustomers
      );
      setPredictions(predictions);
      setIsRunningPrediction(false);
      
      toast({
        title: "Model Execution Complete",
        description: `Generated ${predictions.length} allocation predictions`,
      });
    }, 1500);
  };
  
  const executeAllocations = () => {
    if (predictions.length === 0) {
      toast({
        title: "No Predictions Available",
        description: "Run the prediction model first to generate allocations",
        variant: "destructive"
      });
      return;
    }
    
    setIsAllocating(true);
    
    // Simulate processing time
    setTimeout(() => {
      const allocatedCount = matchingEngineService.executeAllocations(predictions);
      
      // Refresh data
      setMetrics(goService.getMetrics());
      setPredictions([]);
      setIsAllocating(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Matching Engine</h2>
        <p className="text-muted-foreground">
          AI-powered GO allocation between assets and corporate customers
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total GOs"
          value={metrics.totalGOs}
          description={`${metrics.totalMWh} MWh of renewable energy`}
          icon={Lightbulb}
        />
        <DashboardCard
          title="Allocated GOs"
          value={metrics.allocatedGOs}
          description={`${metrics.allocatedMWh} MWh allocated to customers`}
          icon={Check}
        />
        <DashboardCard
          title="Available GOs"
          value={metrics.availableGOs}
          description={`${metrics.availableMWh} MWh available for allocation`}
          icon={Activity}
        />
        <DashboardCard
          title="Average Match Score"
          value={`${Math.round(metrics.averageMatchingScore)}%`}
          description="Temporal matching between production and consumption"
          icon={Waves}
        />
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button 
          onClick={runPredictionModel} 
          disabled={isRunningPrediction}
          className="gap-2"
        >
          <Zap size={16} />
          {isRunningPrediction ? "Running Prediction Model..." : "Run Prediction Model"}
        </Button>
        
        <Button 
          onClick={executeAllocations} 
          disabled={isAllocating || predictions.length === 0}
          variant="outline" 
          className="gap-2"
        >
          <Check size={16} />
          {isAllocating ? "Executing Allocations..." : "Execute Allocations"}
        </Button>
      </div>
      
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="predictions">ML Predictions</TabsTrigger>
          <TabsTrigger value="allocations">Allocated GOs</TabsTrigger>
          <TabsTrigger value="available">Available GOs</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>ML-Based Matching Engine</CardTitle>
              <CardDescription>
                Our machine learning model optimizes GO allocation based on customer preferences and consumption patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available GO capacity</span>
                  <span className="font-medium">{metrics.availableMWh} MWh</span>
                </div>
                <Progress value={metrics.availableMWh / metrics.totalMWh * 100} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Allocated GO capacity</span>
                  <span className="font-medium">{metrics.allocatedMWh} MWh</span>
                </div>
                <Progress value={metrics.allocatedMWh / metrics.totalMWh * 100} />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average matching score</span>
                  <span className="font-medium">{Math.round(metrics.averageMatchingScore)}%</span>
                </div>
                <Progress value={metrics.averageMatchingScore} />
              </div>
              
              <div className="pt-4">
                <h4 className="text-sm font-medium mb-2">Model Features</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Customer portfolio preferences (solar vs wind mix)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    24-hour consumption pattern analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Temporal matching of production and consumption
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Industry-specific consumption behaviors
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Predictive allocation for future production
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <GOTrackingTable 
            guaranteesOfOrigin={goService.getGuaranteesOfOrigin().slice(0, 10)} 
            title="Recent Guarantees of Origin" 
          />
        </TabsContent>
        
        <TabsContent value="predictions" className="mt-6">
          {predictions.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Allocation Predictions</CardTitle>
                <CardDescription>
                  Machine learning predictions for optimal GO allocations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Asset</TableHead>
                      <TableHead>Volume (MWh)</TableHead>
                      <TableHead>Predicted Score</TableHead>
                      <TableHead>Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {predictions.map((prediction, index) => (
                      <TableRow key={index}>
                        <TableCell>{prediction.customerName}</TableCell>
                        <TableCell>{prediction.assetName}</TableCell>
                        <TableCell>{prediction.allocatedVolume}</TableCell>
                        <TableCell>
                          <span className={`font-medium ${
                            prediction.predictedScore >= 80 ? "text-green-500" :
                            prediction.predictedScore >= 50 ? "text-yellow-500" : "text-red-500"
                          }`}>
                            {prediction.predictedScore}%
                          </span>
                        </TableCell>
                        <TableCell>{Math.round(prediction.matchConfidence * 100)}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center">
                <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium">No Predictions Available</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Run the prediction model to generate new allocation predictions
                </p>
                <Button 
                  onClick={runPredictionModel} 
                  disabled={isRunningPrediction}
                  className="mt-4 gap-2"
                >
                  <Zap size={16} />
                  {isRunningPrediction ? "Running Model..." : "Run Prediction Model"}
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="allocations" className="mt-6">
          <GOTrackingTable 
            guaranteesOfOrigin={goService.getGuaranteesOfOrigin().filter(go => go.status === "allocated")} 
            title="Allocated Guarantees of Origin" 
          />
        </TabsContent>
        
        <TabsContent value="available" className="mt-6">
          <GOTrackingTable 
            guaranteesOfOrigin={goService.getAvailableGOs()} 
            title="Available Guarantees of Origin" 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
