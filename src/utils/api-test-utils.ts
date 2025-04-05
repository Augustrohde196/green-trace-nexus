
import { dataCollectionService } from "@/services/data-collection-service";
import { energinetApiService } from "@/services/energinet-api";
import { mockAssets, mockCustomers } from "@/data/mock-data";
import { toast } from "@/hooks/use-toast";

/**
 * Utility for testing the data collection API with simulated data
 */
export class ApiTestUtils {
  private static intervalIds: Record<string, NodeJS.Timeout> = {};
  
  /**
   * Start simulating ongoing consumption data for a customer
   */
  public static startConsumptionSimulation(customerId: string, intervalMs: number = 10000): void {
    if (this.intervalIds[`consumption-${customerId}`]) {
      toast({
        title: "Simulation already running",
        description: `Consumption data simulation already running for customer ${customerId}`,
      });
      return;
    }
    
    toast({
      title: "Starting consumption simulation",
      description: `Beginning to collect consumption data for customer ${customerId}`,
    });
    
    // Run initial data collection
    energinetApiService.fetchCustomerConsumption(customerId, 1)
      .then(data => {
        dataCollectionService.uploadConsumptionData(customerId, data);
      })
      .catch(error => {
        console.error("Error in initial consumption data collection:", error);
      });
    
    // Set up interval for ongoing data collection
    this.intervalIds[`consumption-${customerId}`] = setInterval(() => {
      energinetApiService.fetchCustomerConsumption(customerId, 1)
        .then(data => {
          // Add small random variation to simulate changing consumption
          const modifiedData = data.map(point => ({
            ...point,
            value: point.value * (0.9 + Math.random() * 0.2) // +/- 10% random variation
          }));
          dataCollectionService.uploadConsumptionData(customerId, modifiedData);
          console.log(`[${new Date().toISOString()}] Collected ${modifiedData.length} consumption data points for customer ${customerId}`);
        })
        .catch(error => {
          console.error("Error in ongoing consumption data collection:", error);
        });
    }, intervalMs);
  }
  
  /**
   * Start simulating ongoing production data for an asset
   */
  public static startProductionSimulation(assetId: string, intervalMs: number = 10000): void {
    if (this.intervalIds[`production-${assetId}`]) {
      toast({
        title: "Simulation already running",
        description: `Production data simulation already running for asset ${assetId}`,
      });
      return;
    }
    
    toast({
      title: "Starting production simulation",
      description: `Beginning to collect production data for asset ${assetId}`,
    });
    
    // Run initial data collection
    energinetApiService.fetchAssetProduction(assetId, 1)
      .then(data => {
        dataCollectionService.uploadProductionData(assetId, data);
      })
      .catch(error => {
        console.error("Error in initial production data collection:", error);
      });
    
    // Set up interval for ongoing data collection
    this.intervalIds[`production-${assetId}`] = setInterval(() => {
      energinetApiService.fetchAssetProduction(assetId, 1)
        .then(data => {
          // Add small random variation to simulate changing production
          const modifiedData = data.map(point => ({
            ...point,
            value: point.value * (0.85 + Math.random() * 0.3) // +/- 15% random variation
          }));
          dataCollectionService.uploadProductionData(assetId, modifiedData);
          console.log(`[${new Date().toISOString()}] Collected ${modifiedData.length} production data points for asset ${assetId}`);
        })
        .catch(error => {
          console.error("Error in ongoing production data collection:", error);
        });
    }, intervalMs);
  }
  
  /**
   * Stop simulating data collection for a customer
   */
  public static stopConsumptionSimulation(customerId: string): void {
    const intervalId = this.intervalIds[`consumption-${customerId}`];
    if (intervalId) {
      clearInterval(intervalId);
      delete this.intervalIds[`consumption-${customerId}`];
      toast({
        title: "Stopped consumption simulation",
        description: `Stopped ongoing data collection for customer ${customerId}`,
      });
    }
  }
  
  /**
   * Stop simulating data collection for an asset
   */
  public static stopProductionSimulation(assetId: string): void {
    const intervalId = this.intervalIds[`production-${assetId}`];
    if (intervalId) {
      clearInterval(intervalId);
      delete this.intervalIds[`production-${assetId}`];
      toast({
        title: "Stopped production simulation",
        description: `Stopped ongoing data collection for asset ${assetId}`,
      });
    }
  }
  
  /**
   * Stop all simulations
   */
  public static stopAllSimulations(): void {
    Object.keys(this.intervalIds).forEach(key => {
      clearInterval(this.intervalIds[key]);
      delete this.intervalIds[key];
    });
    
    toast({
      title: "All simulations stopped",
      description: "Stopped all ongoing data collection simulations",
    });
  }
  
  /**
   * Get all active simulations
   */
  public static getActiveSimulations(): { type: string, id: string }[] {
    return Object.keys(this.intervalIds).map(key => {
      const [type, id] = key.split('-');
      return { type, id };
    });
  }
}

/**
 * Create a singleton instance of the Energinet API service
 */
export const energinetApiService = {
  fetchCustomerConsumption: async (customerId: string, days: number = 7) => {
    const timestamp = new Date().toISOString();
    console.log(`Fetching customer consumption data at ${timestamp}`);
    return energinetApiService.generateSimulatedConsumptionData(customerId, days);
  },
  
  fetchAssetProduction: async (assetId: string, days: number = 7) => {
    const timestamp = new Date().toISOString();
    console.log(`Fetching asset production data at ${timestamp}`);
    return energinetApiService.generateSimulatedProductionData(assetId, days);
  },
  
  // Helper method to generate simulated consumption data
  generateSimulatedConsumptionData: (customerId: string, days: number = 1) => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) return [];
    
    const data = [];
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(now.getHours() - (days * 24));
    
    // Generate hourly data points
    let currentTime = new Date(startTime);
    while (currentTime <= now) {
      const hour = currentTime.getHours();
      
      // Base value depends on customer size
      let baseValue = (customer.annualConsumption * 1000) / 8760; // Average hourly consumption in MWh
      
      // Apply time-of-day pattern
      let modifier = 1.0;
      if (hour >= 8 && hour <= 18) {
        // Business hours
        modifier = 1.5 + (Math.random() * 0.5);
      } else if (hour >= 22 || hour <= 5) {
        // Night hours
        modifier = 0.4 + (Math.random() * 0.3);
      } else {
        // Morning/evening transitions
        modifier = 0.7 + (Math.random() * 0.5);
      }
      
      // Apply industry-specific patterns
      if (customer.industry === "Manufacturing") {
        // Manufacturing has steady daytime consumption
        if (hour >= 6 && hour <= 20) {
          modifier *= 1.2;
        }
      } else if (customer.industry === "Retail") {
        // Retail peaks during shopping hours
        if (hour >= 10 && hour <= 18) {
          modifier *= 1.4;
        }
      }
      
      // Convert to kWh for the hourly value
      const value = Math.round(baseValue * modifier * 1000); // Convert MWh to kWh
      
      data.push({
        id: `sim-consumption-${customerId}-${currentTime.getTime()}`,
        customerId,
        timestamp: currentTime.toISOString(),
        value,
        meteringPointId: `MP-${customerId}-1`,
        source: "energinet",
        resolution: "hourly",
        validationStatus: Math.random() > 0.9 ? "estimated" : "validated"
      });
      
      // Advance to next hour
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    }
    
    return data;
  },
  
  // Helper method to generate simulated production data
  generateSimulatedProductionData: (assetId: string, days: number = 1) => {
    const asset = mockAssets.find(a => a.id === assetId);
    if (!asset) return [];
    
    const data = [];
    const now = new Date();
    const startTime = new Date(now);
    startTime.setHours(now.getHours() - (days * 24));
    
    // Generate hourly data points
    let currentTime = new Date(startTime);
    while (currentTime <= now) {
      const hour = currentTime.getHours();
      
      // Base value depends on asset capacity
      let baseValue = asset.capacity / 2; // Average at 50% capacity
      
      // Apply time-of-day pattern based on asset type
      let modifier = 1.0;
      if (asset.type === "solar") {
        // Solar production follows daylight hours
        if (hour >= 10 && hour <= 15) {
          // Peak sun hours
          modifier = 1.6 + (Math.random() * 0.4);
        } else if (hour >= 7 && hour <= 9 || hour >= 16 && hour <= 18) {
          // Morning/evening sun
          modifier = 0.8 + (Math.random() * 0.4);
        } else if (hour >= 6 || hour <= 19) {
          // Dawn/dusk
          modifier = 0.3 + (Math.random() * 0.2);
        } else {
          // Night (minimal or no production)
          modifier = 0.05 * Math.random();
        }
      } else if (asset.type === "wind") {
        // Wind is more consistent but still has some variation
        modifier = 0.5 + (Math.random() * 1.0);
      }
      
      // Apply weather conditions (simulated)
      const temperature = 15 + (Math.random() * 15) - 5; // 10-25°C
      const windSpeed = 2 + (Math.random() * 10); // 2-12 m/s
      const cloudCover = Math.random(); // 0-1 (percentage)
      
      // Convert to kWh for the hourly value and add randomness
      const value = Math.round(baseValue * modifier * 1000); // Convert MW to kWh
      
      data.push({
        id: `sim-production-${assetId}-${currentTime.getTime()}`,
        assetId,
        timestamp: currentTime.toISOString(),
        value,
        meteringPointId: `MP-${assetId}`,
        source: "energinet",
        resolution: "hourly",
        validationStatus: Math.random() > 0.9 ? "estimated" : "validated",
        weatherConditions: {
          temperature,
          windSpeed,
          cloudCover,
          precipitation: cloudCover > 0.7 ? Math.random() * 5 : 0
        }
      });
      
      // Advance to next hour
      currentTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
    }
    
    return data;
  }
};
