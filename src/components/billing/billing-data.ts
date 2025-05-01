
// Mock billing data model
export interface BillingData {
  subscriptionTier: string;
  pricePerMWh: number;
  commission: number;
  monthlyUsage: number;
  estimatedCost: number;
  billingFrequency: string;
  lastInvoice: {
    number: string;
    amount: number;
    date: string;
    status: string;
  };
  contractDetails: {
    title: string;
    version: string;
    startDate: string;
    endDate: string;
    subscriptionTiers: Array<{
      name: string;
      price: number;
      description: string;
    }>;
    pricingModel: string;
    commissionStructure: string;
    revenueSharing: string;
    whiteLabeling: string;
  };
}

export interface UsageHistoryItem {
  month: string;
  usage: number;
  cost: number;
}

export interface CustomerBreakdownItem {
  name: string;
  location: string;
  volume: number;
  amount: number;
}

// Mock billing data
export const getBillingData = (): BillingData => ({
  subscriptionTier: "Enterprise",
  pricePerMWh: 20, // DKK per MWh
  commission: 5, // Percentage
  monthlyUsage: 3650, // MWh
  estimatedCost: 3650 * 20, // MWh * price
  billingFrequency: "Monthly",
  lastInvoice: {
    number: "INV-2025-04",
    amount: 70000,
    date: "2025-04-01",
    status: "Paid"
  },
  contractDetails: {
    title: "Renuw Platform Utility Agreement",
    version: "v3.1",
    startDate: "2024-01-01",
    endDate: "2026-12-31",
    subscriptionTiers: [
      { name: "Basic", price: 10000, description: "Up to 1,000 MWh/month" },
      { name: "Professional", price: 25000, description: "Up to 5,000 MWh/month" },
      { name: "Enterprise", price: 50000, description: "Unlimited MWh/month" }
    ],
    pricingModel: "Fixed rate per MWh with volume discounts",
    commissionStructure: "5% on all GO transactions",
    revenueSharing: "10% of end-user subscription fees for white-labeled solutions",
    whiteLabeling: "Licensed for corporate customer portal customization"
  }
});

// Usage history data for chart with full monthly data
export const getUsageHistory = (): UsageHistoryItem[] => [
  { month: "Jan", usage: 3200, cost: 64000 },
  { month: "Feb", usage: 3400, cost: 68000 },
  { month: "Mar", usage: 3500, cost: 70000 },
  { month: "Apr", usage: 3650, cost: 73000 },
];

// Customer breakdown data
export const getCustomerBreakdown = (): CustomerBreakdownItem[] => [
  { name: "TechCorp ApS", location: "Copenhagen", volume: 1250, amount: 25000 },
  { name: "Nordic Green Energy", location: "Aarhus", volume: 950, amount: 19000 },
  { name: "SustainaBiz", location: "Odense", volume: 800, amount: 16000 },
  { name: "EcoSolutions", location: "Aalborg", volume: 650, amount: 13000 }
];
