import { Customer } from "@/data/models";
import { GuaranteeOfOrigin, AllocationPrediction } from "@/data/go-models";
import { goService } from "./go-service";
import { dataCollectionService } from "./data-collection-service";
import { mockAssets, mockCustomers } from "@/data/mock-data";
import { toast } from "@/hooks/use-toast";
import { calculateMatchingScore } from "@/lib/utils";

// This class simulates a machine learning model for GO matching
// In a real application, this would call a backend ML service built with scikit-learn
class MatchingEngineService {
  private static instance: MatchingEngineService;
  
  private constructor() {}
  
  public static getInstance(): MatchingEngineService {
    if (!MatchingEngineService.instance) {
      MatchingEngineService.instance = new MatchingEngineService();
    }
    return MatchingEngineService.instance;
  }
  
  // Simulate ML prediction for optimal GO allocation
  public async predictOptimalAllocations(
    availableGOs: GuaranteeOfOrigin[],
    customers: Customer[]
  ): Promise<AllocationPrediction[]> {
    // Return a Promise that resolves with the prediction results
    return new Promise((resolve) => {
      const predictions: AllocationPrediction[] = [];
      
      // Group GOs by asset
      const gosByAsset = availableGOs.reduce((acc, go) => {
        if (!acc[go.assetId]) acc[go.assetId] = [];
        acc[go.assetId].push(go);
        return acc;
      }, {} as Record<string, GuaranteeOfOrigin[]>);
      
      // For each customer, predict allocations based on their preferences
      for (const customer of customers) {
        // Calculate total volume needed for this customer
        const totalConsumptionMWh = customer.annualConsumption * 1000; // Convert GWh to MWh
        let allocatedVolume = 0;
        
        // Get current allocations for this customer
        const currentCustomerGOs = goService.getGOsByCustomer(customer.id);
        const currentAllocationMWh = currentCustomerGOs.reduce((sum, go) => sum + go.volume, 0);
        
        // Calculate remaining volume needed
        const remainingNeedMWh = Math.max(0, totalConsumptionMWh - currentAllocationMWh);
        
        if (remainingNeedMWh <= 0) continue; // Customer has all they need
        
        // Try to get real consumption pattern from collected data
        let consumptionPattern = dataCollectionService.getConsumptionPattern(customer.id);
        
        // If no real data, generate a simulated pattern
        if (consumptionPattern.every(val => val === 0)) {
          consumptionPattern = this.generateConsumptionPattern(customer);
          
          // Collect data for future use
          dataCollectionService.collectCustomerConsumption(customer.id).catch(err => {
            console.error("Failed to collect consumption data:", err);
          });
        }
        
        // For each asset, check if it matches customer preferences
        for (const [assetId, gos] of Object.entries(gosByAsset)) {
          const asset = mockAssets.find(a => a.id === assetId);
          if (!asset) continue;
          
          // Check if asset type matches customer portfolio preferences
          const assetTypePreference = asset.type === 'solar' ? customer.portfolioMix.solar : customer.portfolioMix.wind;
          if (assetTypePreference < 10) continue; // Skip if customer has low preference for this type
          
          // Calculate available volume from this asset
          const availableVolume = gos.reduce((sum, go) => sum + go.volume, 0);
          
          // Determine volume to allocate (limited by both availability and need)
          const volumeToAllocate = Math.min(availableVolume, remainingNeedMWh);
          if (volumeToAllocate <= 0) continue;
          
          // Try to get real production pattern from collected data
          let productionPattern = dataCollectionService.getProductionPattern(asset.id);
          
          // If no real data, generate a simulated pattern or collect it
          if (productionPattern.every(val => val === 0)) {
            productionPattern = this.generateProductionPattern(asset.type);
            
            // Collect data for future use
            dataCollectionService.collectAssetProduction(asset.id).catch(err => {
              console.error("Failed to collect production data:", err);
            });
          }
          
          // Calculate match score between consumption and production
          const matchScore = calculateMatchingScore(consumptionPattern, productionPattern);
          
          // Create prediction
          predictions.push({
            customerId: customer.id,
            customerName: customer.name,
            assetId: asset.id,
            assetName: asset.name,
            allocatedVolume: volumeToAllocate,
            predictedScore: matchScore,
            consumptionPattern,
            productionPattern,
            matchConfidence: 0.8 + (Math.random() * 0.15) // 80-95% confidence
          });
          
          // Update remaining need
          allocatedVolume += volumeToAllocate;
        }
      }
      
      // Sort predictions by match score (descending)
      resolve(predictions.sort((a, b) => b.predictedScore - a.predictedScore));
    });
  }
  
  // Execute the allocations based on predictions
  public executeAllocations(predictions: AllocationPrediction[]): number {
    let successfulAllocations = 0;
    const availableGOs = goService.getAvailableGOs();
    
    // Process each prediction
    predictions.forEach(prediction => {
      // Find GOs from the predicted asset
      const assetGOs = availableGOs.filter(go => go.assetId === prediction.assetId);
      if (assetGOs.length === 0) return;
      
      // Determine how many GOs to allocate
      const goCount = Math.min(assetGOs.length, Math.floor(prediction.allocatedVolume));
      
      // Allocate GOs
      for (let i = 0; i < goCount; i++) {
        if (i >= assetGOs.length) break;
        
        const success = goService.allocateGO(
          assetGOs[i].id,
          prediction.customerId,
          prediction.customerName,
          prediction.predictedScore
        );
        
        if (success) successfulAllocations++;
      }
    });
    
    // Show toast with results
    if (successfulAllocations > 0) {
      toast({
        title: "Allocation Complete",
        description: `Successfully allocated ${successfulAllocations} GOs based on machine learning predictions`,
      });
    } else {
      toast({
        title: "No Allocations Made",
        description: "No suitable allocations found or all GOs already allocated",
        variant: "destructive"
      });
    }
    
    return successfulAllocations;
  }
  
  // Helper methods
  
  private generateConsumptionPattern(customer: Customer): number[] {
    // Simulate 24-hour consumption pattern based on industry
    const pattern = new Array(24).fill(0).map((_, hour) => {
      // Business hours have higher consumption for most industries
      const businessHourFactor = (hour >= 8 && hour <= 18) ? 1.5 : 0.5;
      
      // Industry-specific patterns
      let industryFactor = 1.0;
      if (customer.industry === "Manufacturing") {
        industryFactor = (hour >= 6 && hour <= 22) ? 1.8 : 0.4; // Manufacturing runs longer shifts
      } else if (customer.industry === "Retail") {
        industryFactor = (hour >= 10 && hour <= 20) ? 2.0 : 0.3; // Retail has peak during store hours
      } else if (customer.industry === "Technology") {
        industryFactor = (hour >= 9 && hour <= 17) ? 1.7 : 0.6; // Tech has standard office hours with some off-hours
      }
      
      return businessHourFactor * industryFactor * (0.8 + Math.random() * 0.4);
    });
    
    return pattern;
  }
  
  private generateProductionPattern(type: "solar" | "wind"): number[] {
    // Simulate 24-hour production pattern
    return new Array(24).fill(0).map((_, hour) => {
      if (type === "solar") {
        // Solar production peaks during daylight hours
        const daylight = hour >= 6 && hour <= 18;
        const peakHours = hour >= 10 && hour <= 16;
        
        if (!daylight) return 0.1 * Math.random(); // Minimal at night
        if (peakHours) return 0.7 + Math.random() * 0.3; // Peak production
        return 0.3 + Math.random() * 0.3; // Morning/evening
      } else {
        // Wind is more consistent but still has some variation
        return 0.3 + Math.random() * 0.7;
      }
    });
  }
}

export const matchingEngineService = MatchingEngineService.getInstance();
