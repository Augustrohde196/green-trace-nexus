
import { useState } from "react";
import { CustomerDetailsDialog } from "@/components/customers/customer-details-dialog";
import { useMockCustomers } from "@/hooks/use-mock-customers";
import { Customer } from "@/data/models";
import { CustomerPageHeader } from "@/components/customers/customer-page-header";
import { CustomerMetricsCards } from "@/components/customers/customer-metrics-cards";
import { CustomerFilters } from "@/components/customers/customer-filters";
import { useCustomerFilters } from "@/hooks/use-customer-filters";
import { AddCustomerSheet } from "@/components/customers/add-customer-sheet";

export default function Customers() {
  const { customers, addCustomer } = useMockCustomers();
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  
  // Use the extracted custom hook for filtering
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedTab, 
    setSelectedTab, 
    filteredCustomers 
  } = useCustomerFilters({ customers });

  // Function to count customers by status
  const countCustomersByStatus = (status: string) => {
    return customers.filter(c => c.status === status).length || 0;
  };

  const handleCustomerClick = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <CustomerPageHeader onAddCustomerClick={() => setIsAddCustomerOpen(true)} />

      {/* Metrics Cards */}
      <CustomerMetricsCards 
        customers={customers}
        countCustomersByStatus={countCustomersByStatus}
      />

      {/* Customer Filters and List */}
      <CustomerFilters
        customers={customers}
        filteredCustomers={filteredCustomers}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCustomerClick={handleCustomerClick}
      />

      {/* Customer Details Dialog */}
      <CustomerDetailsDialog
        customer={selectedCustomer}
        open={!!selectedCustomer}
        onOpenChange={(open) => {
          if (!open) setSelectedCustomer(null);
        }}
      />

      {/* Add Customer Sheet */}
      <AddCustomerSheet 
        open={isAddCustomerOpen}
        onOpenChange={setIsAddCustomerOpen}
        onSubmit={(newCustomer) => {
          addCustomer(newCustomer);
          setIsAddCustomerOpen(false);
        }}
      />
    </div>
  );
}
