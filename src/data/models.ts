
export interface Asset {
  id: string;
  name: string;
  type: "solar" | "wind";
  location: string;
  capacity: number; // MW
  annualProduction: number; // GWh
  commissioned: string; // Date
  availableCapacity: number; // MW that hasn't been allocated
  currentOutput: number; // current MW output
  coordinates: {
    lat: number;
    lng: number;
  };
  customers: CustomerAllocation[];
}

export interface Customer {
  id: string;
  name: string;
  industry: string;
  location: string;
  annualConsumption: number; // GWh
  portfolioMix: {
    solar: number; // percentage
    wind: number; // percentage
  };
  assets: AssetAllocation[];
  matchingScore: number; // 0-100%, how well their consumption matches production
}

export interface CustomerAllocation {
  customerId: string;
  customerName: string;
  allocatedCapacity: number; // MW
}

export interface AssetAllocation {
  assetId: string;
  assetName: string;
  assetType: "solar" | "wind";
  allocatedCapacity: number; // MW
}

export interface ProductionData {
  timestamp: string;
  output: number; // MW
}

export interface ProductionByType {
  type: string;
  value: number;
}

export interface DashboardMetrics {
  totalAssets: number;
  totalCapacity: number; // MW
  allocatedCapacity: number; // MW
  availableCapacity: number; // MW
  totalProduction: number; // GWh
  totalCustomers: number;
  averageMatchingScore: number;
  productionByType: ProductionByType[];
  recentProduction: ProductionData[];
}
