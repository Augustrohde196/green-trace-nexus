
import { GuaranteeOfOrigin, MatchingMetrics, AllocationPrediction } from "@/data/go-models";
import { mockAssets } from "@/data/mock-data";
import { toast } from "@/hooks/use-toast";

// Mock data for GOs - in a real application this would come from a database
const generateMockGOs = (): GuaranteeOfOrigin[] => {
  const gos: GuaranteeOfOrigin[] = [];
  
  // Generate 1 GO per MWh of production for each asset
  mockAssets.forEach(asset => {
    // Convert annual production to a specific number of GOs
    const goCount = Math.floor(asset.annualProduction * 1000); // Convert GWh to MWh
    
    for (let i = 0; i < goCount; i++) {
      const isAllocated = Math.random() > 0.3; // 70% allocated, 30% available
      const customer = isAllocated ? asset.customers[Math.floor(Math.random() * asset.customers.length)] : null;
      
      gos.push({
        id: `GO-${asset.id}-${i}`,
        assetId: asset.id,
        assetName: asset.name,
        type: asset.type,
        productionTimestamp: new Date(
          Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)
        ).toISOString(), // Random date within last 30 days
        volume: 1, // Each GO represents 1 MWh
        customerId: isAllocated ? customer?.customerId : null,
        customerName: isAllocated ? customer?.customerName : null,
        status: isAllocated ? "allocated" : "available",
        allocationTimestamp: isAllocated 
          ? new Date(
              Date.now() - Math.floor(Math.random() * 20 * 24 * 60 * 60 * 1000)
            ).toISOString() 
          : null,
        allocationScore: isAllocated ? Math.floor(Math.random() * 100) : null,
        gsrn: asset.gsrn || `GSRN-${asset.id}`,
        gridArea: asset.location,
        trackingCode: `RENUW-GO-${asset.id.substring(0, 4)}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      });
    }
  });
  
  return gos;
};

// Singleton pattern to maintain consistent data during the session
class GOService {
  private guaranteesOfOrigin: GuaranteeOfOrigin[] = [];
  private static instance: GOService;
  
  private constructor() {
    this.guaranteesOfOrigin = generateMockGOs();
  }
  
  public static getInstance(): GOService {
    if (!GOService.instance) {
      GOService.instance = new GOService();
    }
    return GOService.instance;
  }
  
  // Get all GOs
  public getGuaranteesOfOrigin(): GuaranteeOfOrigin[] {
    return this.guaranteesOfOrigin;
  }
  
  // Get GOs for a specific asset
  public getGOsByAsset(assetId: string): GuaranteeOfOrigin[] {
    return this.guaranteesOfOrigin.filter(go => go.assetId === assetId);
  }
  
  // Get GOs allocated to a specific customer
  public getGOsByCustomer(customerId: string): GuaranteeOfOrigin[] {
    return this.guaranteesOfOrigin.filter(go => go.customerId === customerId);
  }
  
  // Get available GOs
  public getAvailableGOs(): GuaranteeOfOrigin[] {
    return this.guaranteesOfOrigin.filter(go => go.status === "available");
  }
  
  // Allocate a GO to a customer
  public allocateGO(goId: string, customerId: string, customerName: string, matchingScore: number): boolean {
    const goIndex = this.guaranteesOfOrigin.findIndex(go => go.id === goId);
    
    if (goIndex === -1) {
      toast({
        title: "Error",
        description: "Guarantee of Origin not found",
        variant: "destructive"
      });
      return false;
    }
    
    if (this.guaranteesOfOrigin[goIndex].status !== "available") {
      toast({
        title: "Error",
        description: "This Guarantee of Origin is not available for allocation",
        variant: "destructive"
      });
      return false;
    }
    
    this.guaranteesOfOrigin[goIndex] = {
      ...this.guaranteesOfOrigin[goIndex],
      customerId,
      customerName,
      status: "allocated",
      allocationTimestamp: new Date().toISOString(),
      allocationScore: matchingScore
    };
    
    toast({
      title: "Success",
      description: `GO successfully allocated to ${customerName}`,
    });
    
    return true;
  }
  
  // Calculate metrics
  public getMetrics(): MatchingMetrics {
    const totalGOs = this.guaranteesOfOrigin.length;
    const allocatedGOs = this.guaranteesOfOrigin.filter(go => go.status === "allocated").length;
    const availableGOs = this.guaranteesOfOrigin.filter(go => go.status === "available").length;
    
    const totalMWh = this.guaranteesOfOrigin.reduce((sum, go) => sum + go.volume, 0);
    const allocatedMWh = this.guaranteesOfOrigin
      .filter(go => go.status === "allocated")
      .reduce((sum, go) => sum + go.volume, 0);
    
    const averageMatchingScore = this.guaranteesOfOrigin
      .filter(go => go.allocationScore !== null)
      .reduce((sum, go) => sum + (go.allocationScore || 0), 0) / allocatedGOs || 0;
    
    return {
      totalGOs,
      allocatedGOs,
      availableGOs,
      totalMWh,
      allocatedMWh,
      availableMWh: totalMWh - allocatedMWh,
      averageMatchingScore
    };
  }
}

export const goService = GOService.getInstance();
