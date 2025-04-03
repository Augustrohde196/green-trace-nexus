
import { Customer } from "@/data/models";
import { GuaranteeOfOrigin, AllocationPrediction } from "@/data/go-models";
import { goService } from "./go-service";
import { mockAssets, mockCustomers } from "@/data/mock-data";
import { toast } from "@/hooks/use-toast";

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
  public predictOptimalAllocations(
    availableGOs: GuaranteeOfOrigin[],
    customers: Customer[]
  ): AllocationPrediction[] {
    const predictions: AllocationPrediction[] = [];
    
    // Group GOs by asset
    const gosByAsset = availableGOs.reduce((acc, go) => {
      if (!acc[go.assetId]) acc[go.assetId] = [];
      acc[go.assetId].push(go);
      return acc;
    }, {} as Record<string, GuaranteeOfOrigin[]>);
    
    // For each customer, predict allocations based on their preferences
    customers.forEach(customer => {
      // Calculate total volume needed for this customer
      const totalConsumptionMWh = customer.annualConsumption * 1000; // Convert GWh to MWh
      let allocatedVolume = 0;
      
      // Get current allocations for this customer
      const currentCustomerGOs = goService.getGOsByCustomer(customer.id);
      const currentAllocationMWh = currentCustomerGOs.reduce((sum, go) => sum + go.volume, 0);
      
      // Calculate remaining volume needed
      const remainingNeedMWh = Math.max(0, totalConsumptionMWh - currentAllocationMWh);
      
      if (remainingNeedMWh <= 0) return; // Customer has all they need
      
      // Create consumption pattern (simulated)
      const consumptionPattern = this.generateConsumptionPattern(customer);
      
      // For each asset, check if it matches customer preferences
      Object.entries(gosByAsset).forEach(([assetId, gos]) => {
        const asset = mockAssets.find(a => a.id === assetId);
        if (!asset) return;
        
        // Check if asset type matches customer portfolio preferences
        const assetTypePreference = asset.type === 'solar' ? customer.portfolioMix.solar : customer.portfolioMix.wind;
        if (assetTypePreference < 10) return; // Skip if customer has low preference for this type
        
        // Calculate available volume from this asset
        const availableVolume = gos.reduce((sum, go) => sum + go.volume, 0);
        
        // Determine volume to allocate (limited by both availability and need)
        const volumeToAllocate = Math.min(availableVolume, remainingNeedMWh);
        if (volumeToAllocate <= 0) return;
        
        // Generate production pattern for this asset (simulated)
        const productionPattern = this.generateProductionPattern(asset.type);
        
        // Calculate match score between consumption and production
        const matchScore = this.calculateMatchScore(consumptionPattern, productionPattern);
        
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
      });
    });
    
    // Sort predictions by match score (descending)
    return predictions.sort((a, b) => b.predictedScore - a.predictedScore);
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
  
  // Helper methods to simulate ML functionality
  
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
  
  private calculateMatchScore(consumption: number[], production: number[]): number {
    if (consumption.length !== production.length) {
      return 0; // Patterns must be same length
    }
    
    // Calculate correlation and scale to 0-100
    let sumProduct = 0;
    let sumConsumptionSquared = 0;
    let sumProductionSquared = 0;
    
    for (let i = 0; i < consumption.length; i++) {
      sumProduct += consumption[i] * production[i];
      sumConsumptionSquared += consumption[i] * consumption[i];
      sumProductionSquared += production[i] * production[i];
    }
    
    const correlation = sumProduct / (Math.sqrt(sumConsumptionSquared) * Math.sqrt(sumProductionSquared));
    
    // Convert correlation (-1 to 1) to score (0 to 100)
    return Math.round(((correlation + 1) / 2) * 100);
  }
}

export const matchingEngineService = MatchingEngineService.getInstance();
