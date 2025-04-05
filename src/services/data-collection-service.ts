
import { toast } from "@/hooks/use-toast";
import { fetchCustomerConsumption, fetchAssetProduction } from "./energinet-api";
import { ConsumptionData, ProductionData } from "@/data/go-models";
import { aggregateHourlyData } from "@/lib/utils";

// Simulate database with in-memory storage
class DataCollectionService {
  private static instance: DataCollectionService;
  private consumptionData: Map<string, ConsumptionData[]> = new Map();
  private productionData: Map<string, ProductionData[]> = new Map();
  
  private constructor() {}
  
  public static getInstance(): DataCollectionService {
    if (!DataCollectionService.instance) {
      DataCollectionService.instance = new DataCollectionService();
    }
    return DataCollectionService.instance;
  }
  
  /**
   * Fetch and store consumption data for a customer
   */
  public async collectCustomerConsumption(customerId: string, days: number = 7): Promise<ConsumptionData[]> {
    try {
      console.log(`Collecting consumption data for customer ${customerId}`);
      
      // Fetch data from Energinet API
      const consumptionData = await fetchCustomerConsumption(customerId, days);
      
      // Store in local cache
      this.consumptionData.set(customerId, consumptionData);
      
      toast({
        title: "Consumption data collected",
        description: `Successfully collected ${consumptionData.length} data points for customer`
      });
      
      return consumptionData;
    } catch (error) {
      console.error("Error collecting consumption data:", error);
      toast({
        title: "Error collecting consumption data",
        description: "Failed to collect consumption data for customer",
        variant: "destructive"
      });
      return [];
    }
  }
  
  /**
   * Fetch and store production data for an asset
   */
  public async collectAssetProduction(assetId: string, days: number = 7): Promise<ProductionData[]> {
    try {
      console.log(`Collecting production data for asset ${assetId}`);
      
      // Fetch data from Energinet API
      const productionData = await fetchAssetProduction(assetId, days);
      
      // Store in local cache
      this.productionData.set(assetId, productionData);
      
      toast({
        title: "Production data collected",
        description: `Successfully collected ${productionData.length} data points for asset`
      });
      
      return productionData;
    } catch (error) {
      console.error("Error collecting production data:", error);
      toast({
        title: "Error collecting production data",
        description: "Failed to collect production data for asset",
        variant: "destructive"
      });
      return [];
    }
  }
  
  /**
   * Get consumption data for a customer
   */
  public getCustomerConsumption(customerId: string): ConsumptionData[] {
    return this.consumptionData.get(customerId) || [];
  }
  
  /**
   * Get production data for an asset
   */
  public getAssetProduction(assetId: string): ProductionData[] {
    return this.productionData.get(assetId) || [];
  }
  
  /**
   * Get consumption pattern for a customer (24-hour)
   */
  public getConsumptionPattern(customerId: string): number[] {
    const data = this.getCustomerConsumption(customerId);
    
    if (data.length === 0) {
      return new Array(24).fill(0);
    }
    
    // Process data to get average consumption by hour of day
    const hourlyTotals = new Array(24).fill(0);
    const hourlyCount = new Array(24).fill(0);
    
    data.forEach(point => {
      const hour = new Date(point.timestamp).getHours();
      hourlyTotals[hour] += point.value;
      hourlyCount[hour]++;
    });
    
    // Calculate averages
    return hourlyTotals.map((total, index) => 
      hourlyCount[index] === 0 ? 0 : total / hourlyCount[index]
    );
  }
  
  /**
   * Get production pattern for an asset (24-hour)
   */
  public getProductionPattern(assetId: string): number[] {
    const data = this.getAssetProduction(assetId);
    
    if (data.length === 0) {
      return new Array(24).fill(0);
    }
    
    // Process data to get average production by hour of day
    const hourlyTotals = new Array(24).fill(0);
    const hourlyCount = new Array(24).fill(0);
    
    data.forEach(point => {
      const hour = new Date(point.timestamp).getHours();
      hourlyTotals[hour] += point.value;
      hourlyCount[hour]++;
    });
    
    // Calculate averages
    return hourlyTotals.map((total, index) => 
      hourlyCount[index] === 0 ? 0 : total / hourlyCount[index]
    );
  }
  
  /**
   * Upload consumption data manually
   */
  public uploadConsumptionData(customerId: string, data: ConsumptionData[]): boolean {
    try {
      const existingData = this.consumptionData.get(customerId) || [];
      
      // Merge new data with existing data
      const mergedData = [...existingData];
      
      data.forEach(newPoint => {
        // Check if this data point already exists
        const existingIndex = mergedData.findIndex(
          existing => existing.timestamp === newPoint.timestamp
        );
        
        if (existingIndex >= 0) {
          // Update existing point
          mergedData[existingIndex] = newPoint;
        } else {
          // Add new point
          mergedData.push(newPoint);
        }
      });
      
      // Sort by timestamp
      mergedData.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      // Update stored data
      this.consumptionData.set(customerId, mergedData);
      
      toast({
        title: "Consumption data uploaded",
        description: `Successfully uploaded ${data.length} consumption data points`
      });
      
      return true;
    } catch (error) {
      console.error("Error uploading consumption data:", error);
      toast({
        title: "Error uploading data",
        description: "Failed to process the uploaded consumption data",
        variant: "destructive"
      });
      return false;
    }
  }
  
  /**
   * Upload production data manually
   */
  public uploadProductionData(assetId: string, data: ProductionData[]): boolean {
    try {
      const existingData = this.productionData.get(assetId) || [];
      
      // Merge new data with existing data
      const mergedData = [...existingData];
      
      data.forEach(newPoint => {
        // Check if this data point already exists
        const existingIndex = mergedData.findIndex(
          existing => existing.timestamp === newPoint.timestamp
        );
        
        if (existingIndex >= 0) {
          // Update existing point
          mergedData[existingIndex] = newPoint;
        } else {
          // Add new point
          mergedData.push(newPoint);
        }
      });
      
      // Sort by timestamp
      mergedData.sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      // Update stored data
      this.productionData.set(assetId, mergedData);
      
      toast({
        title: "Production data uploaded",
        description: `Successfully uploaded ${data.length} production data points`
      });
      
      return true;
    } catch (error) {
      console.error("Error uploading production data:", error);
      toast({
        title: "Error uploading data",
        description: "Failed to process the uploaded production data",
        variant: "destructive"
      });
      return false;
    }
  }
}

export const dataCollectionService = DataCollectionService.getInstance();
