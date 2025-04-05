
import { useState, useEffect } from "react";
import { PlayCircle, StopCircle, RefreshCw, AlertCircle } from "lucide-react";
import { ApiTestUtils } from "@/utils/api-test-utils";
import { mockAssets, mockCustomers } from "@/data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

export function DataSimulationPanel() {
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedAsset, setSelectedAsset] = useState("");
  const [activeSimulations, setActiveSimulations] = useState<{ type: string; id: string }[]>([]);
  const [updateInterval, setUpdateInterval] = useState(10000); // 10 seconds default
  const [autoRefresh, setAutoRefresh] = useState(true);
  
  // Refresh active simulations periodically
  useEffect(() => {
    const refreshActiveSimulations = () => {
      setActiveSimulations(ApiTestUtils.getActiveSimulations());
    };
    
    // Initial refresh
    refreshActiveSimulations();
    
    // Set up periodic refresh if enabled
    let intervalId: NodeJS.Timeout | null = null;
    if (autoRefresh) {
      intervalId = setInterval(refreshActiveSimulations, 5000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoRefresh]);
  
  const handleStartConsumptionSimulation = () => {
    if (!selectedCustomer) {
      toast({
        title: "No customer selected",
        description: "Please select a customer to start simulation",
        variant: "destructive"
      });
      return;
    }
    
    ApiTestUtils.startConsumptionSimulation(selectedCustomer, updateInterval);
    setActiveSimulations(ApiTestUtils.getActiveSimulations());
  };
  
  const handleStartProductionSimulation = () => {
    if (!selectedAsset) {
      toast({
        title: "No asset selected",
        description: "Please select an asset to start simulation",
        variant: "destructive"
      });
      return;
    }
    
    ApiTestUtils.startProductionSimulation(selectedAsset, updateInterval);
    setActiveSimulations(ApiTestUtils.getActiveSimulations());
  };
  
  const handleStopSimulation = (type: string, id: string) => {
    if (type === "consumption") {
      ApiTestUtils.stopConsumptionSimulation(id);
    } else if (type === "production") {
      ApiTestUtils.stopProductionSimulation(id);
    }
    setActiveSimulations(ApiTestUtils.getActiveSimulations());
  };
  
  const handleStopAllSimulations = () => {
    ApiTestUtils.stopAllSimulations();
    setActiveSimulations([]);
  };
  
  const refreshActiveSimulations = () => {
    setActiveSimulations(ApiTestUtils.getActiveSimulations());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5" />
          Data Simulation Panel
        </CardTitle>
        <CardDescription>
          Test API with ongoing simulated production and consumption data
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Simulation Controls</h3>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-refresh status:</span>
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-sm">Update interval:</span>
              <Select
                value={updateInterval.toString()}
                onValueChange={(value) => setUpdateInterval(parseInt(value))}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Intervals</SelectLabel>
                    <SelectItem value="5000">5 seconds</SelectItem>
                    <SelectItem value="10000">10 seconds</SelectItem>
                    <SelectItem value="30000">30 seconds</SelectItem>
                    <SelectItem value="60000">1 minute</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Consumption Data</h3>
              <Select
                value={selectedCustomer}
                onValueChange={setSelectedCustomer}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Customers</SelectLabel>
                    {mockCustomers.map(customer => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleStartConsumptionSimulation}
                disabled={!selectedCustomer}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Consumption Simulation
              </Button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Production Data</h3>
              <Select
                value={selectedAsset}
                onValueChange={setSelectedAsset}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Assets</SelectLabel>
                    {mockAssets.map(asset => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.name} ({asset.type})
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={handleStartProductionSimulation}
                disabled={!selectedAsset}
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Production Simulation
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Active Simulations</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={refreshActiveSimulations}
                className="h-8 px-2"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleStopAllSimulations}
                disabled={activeSimulations.length === 0}
                className="h-8"
              >
                Stop All
              </Button>
            </div>
          </div>
          
          {activeSimulations.length > 0 ? (
            <div className="space-y-2">
              {activeSimulations.map(({ type, id }) => {
                const entityName = type === "consumption" 
                  ? mockCustomers.find(c => c.id === id)?.name
                  : mockAssets.find(a => a.id === id)?.name;
                  
                return (
                  <div key={`${type}-${id}`} className="flex justify-between items-center p-2 bg-muted rounded-md">
                    <div className="flex items-center gap-2">
                      <Badge variant={type === "consumption" ? "outline" : "secondary"}>
                        {type === "consumption" ? "Consumption" : "Production"}
                      </Badge>
                      <span className="text-sm font-medium">{entityName || id}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleStopSimulation(type, id)}
                      className="h-7 w-7 p-0"
                    >
                      <StopCircle className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-4 text-center text-muted-foreground">
              <AlertCircle className="h-8 w-8 mb-2" />
              <p>No active simulations</p>
              <p className="text-xs">Start a simulation using the controls above</p>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between text-xs text-muted-foreground">
        <div>Update interval: {updateInterval / 1000}s</div>
        <div>Active simulations: {activeSimulations.length}</div>
      </CardFooter>
    </Card>
  );
}
