
import { useState } from "react";
import { Customer } from "@/data/models";
import { toast } from "@/components/ui/use-toast";

// Import initial mock data
const initialCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "TechCorp Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    annualConsumption: 120.5,
    portfolioMix: {
      solar: 60,
      wind: 40
    },
    assets: [
      {
        assetId: "asset-001",
        assetName: "Mountain View Solar Farm",
        assetType: "solar",
        allocatedCapacity: 20
      },
      {
        assetId: "asset-003",
        assetName: "Coastal Wind Farm",
        assetType: "wind",
        allocatedCapacity: 15
      }
    ],
    matchingScore: 87
  },
  {
    id: "cust-002",
    name: "EcoRetail",
    industry: "Retail",
    location: "Seattle, WA",
    annualConsumption: 85.3,
    portfolioMix: {
      solar: 40,
      wind: 60
    },
    assets: [
      {
        assetId: "asset-002",
        assetName: "Desert Sun Array",
        assetType: "solar",
        allocatedCapacity: 10
      },
      {
        assetId: "asset-004",
        assetName: "Highland Wind Park",
        assetType: "wind",
        allocatedCapacity: 25
      }
    ],
    matchingScore: 76
  },
  {
    id: "cust-003",
    name: "BioPharm Solutions",
    industry: "Healthcare",
    location: "Boston, MA",
    annualConsumption: 150.8,
    portfolioMix: {
      solar: 30,
      wind: 70
    },
    assets: [
      {
        assetId: "asset-001",
        assetName: "Mountain View Solar Farm",
        assetType: "solar",
        allocatedCapacity: 15
      },
      {
        assetId: "asset-003",
        assetName: "Coastal Wind Farm",
        assetType: "wind",
        allocatedCapacity: 30
      }
    ],
    matchingScore: 92
  },
  {
    id: "cust-004",
    name: "Global Manufacturing",
    industry: "Manufacturing",
    location: "Detroit, MI",
    annualConsumption: 210.2,
    portfolioMix: {
      solar: 20,
      wind: 80
    },
    assets: [
      {
        assetId: "asset-004",
        assetName: "Highland Wind Park",
        assetType: "wind",
        allocatedCapacity: 55
      }
    ],
    matchingScore: 68
  },
  {
    id: "cust-005",
    name: "Sustainable Foods",
    industry: "Food & Beverage",
    location: "Portland, OR",
    annualConsumption: 45.6,
    portfolioMix: {
      solar: 70,
      wind: 30
    },
    assets: [
      {
        assetId: "asset-002",
        assetName: "Desert Sun Array",
        assetType: "solar",
        allocatedCapacity: 25
      }
    ],
    matchingScore: 89
  },
  {
    id: "cust-006",
    name: "Consumer Electronics",
    industry: "Technology",
    location: "Austin, TX",
    annualConsumption: 95.7,
    portfolioMix: {
      solar: 50,
      wind: 50
    },
    assets: [],
    matchingScore: 42
  }
];

export interface NewCustomer {
  name: string;
  industry: string;
  location: string;
  annualConsumption: number;
  portfolioMix: {
    solar: number;
    wind: number;
  }
}

export function useMockCustomers() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const addCustomer = (newCustomer: NewCustomer) => {
    // Create a new customer with a generated ID and default values
    const customer: Customer = {
      id: `cust-${String(customers.length + 1).padStart(3, '0')}`,
      name: newCustomer.name,
      industry: newCustomer.industry,
      location: newCustomer.location,
      annualConsumption: newCustomer.annualConsumption,
      portfolioMix: newCustomer.portfolioMix,
      assets: [],
      matchingScore: Math.floor(Math.random() * 101) // Random score between 0-100
    };

    setCustomers([...customers, customer]);
    toast({
      title: "Customer Added",
      description: `${customer.name} has been added successfully.`
    });
    
    return customer;
  };

  return {
    customers,
    addCustomer
  };
}
