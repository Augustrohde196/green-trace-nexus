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
  gsrn: string; // Global Service Relation Number
  installationType: "BTM" | "FTM"; // Behind-the-Meter or Front-of-the-Meter
  gridConnection: string; // Grid connection details
  owner: string; // Asset owner information
  matchingScore?: number; // How well the asset's production profile matches consumption
  carbonIntensity?: number; // Carbon intensity in gCO2eq/kWh
  status?: "online" | "offline" | "maintenance"; // Asset operational status
  dataIntegrated?: boolean; // Whether data is automatically integrated via API
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
  utilityProvider?: string; // The utility or energy trader servicing this customer
  status?: "active" | "pending"; // Customer status
  preferredMix?: {
    wind: number;
    solar: number;
  };
  localOnly?: boolean;
  portfolioStatus?: string;
}

// For the customer form data
export interface NewCustomer {
  name: string;
  location: string;
  industry: string;
  annualConsumption: number;
  preferredMix?: {
    wind: number;
    solar: number;
  };
  portfolioStatus?: string;
  matchingScore?: number;
  localOnly?: boolean;
  status?: "active" | "pending";
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
