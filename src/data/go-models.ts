
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
