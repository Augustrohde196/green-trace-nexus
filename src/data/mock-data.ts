
import { Asset, Customer, DashboardMetrics, ProductionData } from "./models";

export const mockAssets: Asset[] = [
  {
    id: "wind-1",
    name: "Coastal Winds",
    type: "wind",
    location: "North Sea",
    capacity: 120,
    annualProduction: 450,
    commissioned: "2019-05-15",
    availableCapacity: 35,
    currentOutput: 95,
    coordinates: {
      lat: 57.8,
      lng: 5.2,
    },
    customers: [
      { customerId: "c-1", customerName: "EcoRetail", allocatedCapacity: 45 },
      { customerId: "c-3", customerName: "GreenTech", allocatedCapacity: 40 },
    ],
  },
  {
    id: "wind-2",
    name: "Highland Turbines",
    type: "wind",
    location: "Central Highlands",
    capacity: 80,
    annualProduction: 320,
    commissioned: "2020-11-03",
    availableCapacity: 15,
    currentOutput: 62,
    coordinates: {
      lat: 56.7,
      lng: 4.1,
    },
    customers: [
      { customerId: "c-2", customerName: "SustainCorp", allocatedCapacity: 45 },
      { customerId: "c-4", customerName: "CleanManufacturing", allocatedCapacity: 20 },
    ],
  },
  {
    id: "solar-1",
    name: "Meadow Solar",
    type: "solar",
    location: "Southern Plains",
    capacity: 65,
    annualProduction: 110,
    commissioned: "2022-03-21",
    availableCapacity: 10,
    currentOutput: 53,
    coordinates: {
      lat: 55.3,
      lng: 3.9,
    },
    customers: [
      { customerId: "c-1", customerName: "EcoRetail", allocatedCapacity: 25 },
      { customerId: "c-3", customerName: "GreenTech", allocatedCapacity: 30 },
    ],
  },
  {
    id: "solar-2",
    name: "Valley Photovoltaics",
    type: "solar",
    location: "Eastern Valley",
    capacity: 45,
    annualProduction: 85,
    commissioned: "2022-07-10",
    availableCapacity: 5,
    currentOutput: 33,
    coordinates: {
      lat: 56.1,
      lng: 6.2,
    },
    customers: [
      { customerId: "c-2", customerName: "SustainCorp", allocatedCapacity: 20 },
      { customerId: "c-4", customerName: "CleanManufacturing", allocatedCapacity: 20 },
    ],
  },
  {
    id: "wind-3",
    name: "Offshore Array",
    type: "wind",
    location: "Eastern Coastline",
    capacity: 150,
    annualProduction: 580,
    commissioned: "2021-09-12",
    availableCapacity: 30,
    currentOutput: 132,
    coordinates: {
      lat: 58.5,
      lng: 7.1,
    },
    customers: [
      { customerId: "c-1", customerName: "EcoRetail", allocatedCapacity: 60 },
      { customerId: "c-2", customerName: "SustainCorp", allocatedCapacity: 60 },
    ],
  },
];

export const mockCustomers: Customer[] = [
  {
    id: "c-1",
    name: "EcoRetail",
    industry: "Retail",
    location: "Copenhagen",
    annualConsumption: 120,
    portfolioMix: {
      solar: 25,
      wind: 75,
    },
    assets: [
      { assetId: "wind-1", assetName: "Coastal Winds", assetType: "wind", allocatedCapacity: 45 },
      { assetId: "solar-1", assetName: "Meadow Solar", assetType: "solar", allocatedCapacity: 25 },
      { assetId: "wind-3", assetName: "Offshore Array", assetType: "wind", allocatedCapacity: 60 },
    ],
    matchingScore: 87,
  },
  {
    id: "c-2",
    name: "SustainCorp",
    industry: "Manufacturing",
    location: "Aarhus",
    annualConsumption: 180,
    portfolioMix: {
      solar: 20,
      wind: 80,
    },
    assets: [
      { assetId: "wind-2", assetName: "Highland Turbines", assetType: "wind", allocatedCapacity: 45 },
      { assetId: "solar-2", assetName: "Valley Photovoltaics", assetType: "solar", allocatedCapacity: 20 },
      { assetId: "wind-3", assetName: "Offshore Array", assetType: "wind", allocatedCapacity: 60 },
    ],
    matchingScore: 92,
  },
  {
    id: "c-3",
    name: "GreenTech",
    industry: "Technology",
    location: "Odense",
    annualConsumption: 95,
    portfolioMix: {
      solar: 40,
      wind: 60,
    },
    assets: [
      { assetId: "wind-1", assetName: "Coastal Winds", assetType: "wind", allocatedCapacity: 40 },
      { assetId: "solar-1", assetName: "Meadow Solar", assetType: "solar", allocatedCapacity: 30 },
    ],
    matchingScore: 78,
  },
  {
    id: "c-4",
    name: "CleanManufacturing",
    industry: "Manufacturing",
    location: "Aalborg",
    annualConsumption: 75,
    portfolioMix: {
      solar: 30,
      wind: 70,
    },
    assets: [
      { assetId: "wind-2", assetName: "Highland Turbines", assetType: "wind", allocatedCapacity: 20 },
      { assetId: "solar-2", assetName: "Valley Photovoltaics", assetType: "solar", allocatedCapacity: 20 },
    ],
    matchingScore: 81,
  },
];

// Generate mock time-series data
export const generateProductionData = (days: number): ProductionData[] => {
  const data: ProductionData[] = [];
  const now = new Date();
  
  for (let i = 0; i < days * 24; i++) {
    const date = new Date(now);
    date.setHours(now.getHours() - i);
    
    // Generate varying output with some randomness but following a pattern
    // Solar has a bell curve during daylight hours
    // Wind is more random but has some patterns
    
    const hour = date.getHours();
    let solarOutput = 0;
    if (hour >= 6 && hour <= 18) { // Daylight hours
      const midPoint = 12;
      const distance = Math.abs(hour - midPoint);
      solarOutput = Math.max(0, 100 - (distance * 12)) * (0.8 + Math.random() * 0.4);
    }
    
    const windOutput = (70 + Math.random() * 60) * (0.8 + Math.random() * 0.4);
    
    const timestamp = date.toISOString();
    data.push({
      timestamp,
      output: Math.round(solarOutput + windOutput),
    });
  }
  
  return data;
};

// Calculate dashboard metrics
export const calculateDashboardMetrics = (): DashboardMetrics => {
  const totalAssets = mockAssets.length;
  const totalCapacity = mockAssets.reduce((sum, asset) => sum + asset.capacity, 0);
  const availableCapacity = mockAssets.reduce((sum, asset) => sum + asset.availableCapacity, 0);
  const allocatedCapacity = totalCapacity - availableCapacity;
  const totalProduction = mockAssets.reduce((sum, asset) => sum + asset.annualProduction, 0);
  const totalCustomers = mockCustomers.length;
  const averageMatchingScore = mockCustomers.reduce((sum, customer) => sum + customer.matchingScore, 0) / totalCustomers;
  
  // Calculate production by type
  const windAssets = mockAssets.filter(a => a.type === "wind");
  const solarAssets = mockAssets.filter(a => a.type === "solar");
  
  const windProduction = windAssets.reduce((sum, asset) => sum + asset.annualProduction, 0);
  const solarProduction = solarAssets.reduce((sum, asset) => sum + asset.annualProduction, 0);
  
  return {
    totalAssets,
    totalCapacity,
    allocatedCapacity,
    availableCapacity,
    totalProduction,
    totalCustomers,
    averageMatchingScore,
    productionByType: [
      { type: "Wind", value: windProduction },
      { type: "Solar", value: solarProduction },
    ],
    recentProduction: generateProductionData(7),
  };
};
