
// Guarantee of Origin (GO) tracking models
export interface GuaranteeOfOrigin {
  id: string;
  assetId: string;
  assetName: string;
  type: "solar" | "wind";
  productionTimestamp: string;
  volume: number; // in MWh
  customerId: string | null;
  customerName: string | null;
  status: "available" | "allocated" | "transferred" | "redeemed";
  allocationTimestamp: string | null;
  allocationScore: number | null; // matching score at time of allocation
  gsrn: string; // Global Service Relation Number of the producing asset
  gridArea: string; // Grid area where the energy was produced
  trackingCode: string; // Unique tracking code for this GO
}

export interface AllocationPrediction {
  customerId: string;
  customerName: string;
  assetId: string;
  assetName: string;
  allocatedVolume: number; // MWh
  predictedScore: number; // 0-100
  consumptionPattern: number[]; // 24 hour consumption pattern
  productionPattern: number[]; // 24 hour production pattern
  matchConfidence: number; // ML model confidence
}

export interface MatchingMetrics {
  totalGOs: number;
  allocatedGOs: number;
  availableGOs: number;
  averageMatchingScore: number;
  totalMWh: number;
  allocatedMWh: number;
  availableMWh: number;
}

// New models for granular data collection
export interface ConsumptionData {
  id: string;
  customerId: string;
  timestamp: string;
  value: number; // kWh
  meteringPointId: string; // Metering point ID from Energinet
  source: "energinet" | "manual" | "api"; // Data source
  resolution: "15min" | "hourly" | "daily"; // Data resolution
  validationStatus: "validated" | "provisional" | "estimated";
}

export interface ProductionData {
  id: string;
  assetId: string;
  timestamp: string;
  value: number; // kWh
  meteringPointId: string; // Metering point ID from Energinet
  source: "energinet" | "manual" | "api"; // Data source
  resolution: "15min" | "hourly" | "daily"; // Data resolution
  validationStatus: "validated" | "provisional" | "estimated";
  weatherConditions?: {
    temperature?: number;
    windSpeed?: number;
    cloudCover?: number;
    precipitation?: number;
  };
}

// Energinet API response models
export interface EnerginetMeteringPoint {
  id: string;
  gsrn: string;
  address: string;
  type: "consumption" | "production";
  connectionState: "connected" | "disconnected";
  gridArea: string;
  ownerName: string;
  ownerHasConsent: boolean;
}

export interface EnerginetTimeSeries {
  meteringPointId: string;
  period: {
    start: string;
    end: string;
  };
  resolution: string;
  points: Array<{
    timestamp: string;
    quantity: number;
    quality: string;
  }>;
}
