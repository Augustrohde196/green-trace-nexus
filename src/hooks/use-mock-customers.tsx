import { useState, useEffect } from "react";
import { mockCustomers } from "@/data/mock-data";
import { Customer } from "@/types";
import { useToast } from "@/hooks/use-toast"; // Fixed import path

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

  return { customers };
};

