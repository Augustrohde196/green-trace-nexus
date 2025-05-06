
import { useState, useEffect } from "react";
import { mockCustomers } from "@/data/mock-data";
import { Customer, NewCustomer } from "@/data/models"; // Changed import path from @/types to @/data/models
import { useToast } from "@/hooks/use-toast"; // Keep using the correct import path

export const useMockCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setCustomers(mockCustomers);
      toast({
        title: "Mock Customers Loaded",
        description: "Successfully loaded mock customer data.",
      });
    }, 500);
  }, [toast]);

  // Add the addCustomer function
  const addCustomer = (newCustomer: NewCustomer) => {
    // Create a new customer with an ID
    const customer: Customer = {
      id: `customer-${Date.now()}`,
      name: newCustomer.name,
      industry: newCustomer.industry,
      location: newCustomer.location,
      annualConsumption: newCustomer.annualConsumption,
      portfolioMix: newCustomer.portfolioMix,
      preferredMix: newCustomer.preferredMix,
      assets: [],
      matchingScore: newCustomer.matchingScore || 70,
      status: newCustomer.status || "pending",
      portfolioStatus: newCustomer.portfolioStatus || "Not Allocated",
      localOnly: newCustomer.localOnly || false
    };

    setCustomers(prev => [...prev, customer]);
    
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been added successfully.`,
    });
  };

  return { customers, addCustomer };
};
