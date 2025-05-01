
import { useState, useMemo } from "react";
import { Customer } from "@/data/models";

interface UseCustomerFiltersProps {
  customers: Customer[];
}

interface UseCustomerFiltersReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  filteredCustomers: Customer[];
}

export function useCustomerFilters({ 
  customers 
}: UseCustomerFiltersProps): UseCustomerFiltersReturn {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (selectedTab === "all") return matchesSearch;
      if (selectedTab === "high") return matchesSearch && customer.matchingScore >= 80;
      if (selectedTab === "medium") return matchesSearch && customer.matchingScore >= 50 && customer.matchingScore < 80;
      return matchesSearch && customer.matchingScore < 50;
    });
  }, [customers, searchQuery, selectedTab]);

  return {
    searchQuery,
    setSearchQuery,
    selectedTab,
    setSelectedTab,
    filteredCustomers
  };
}
