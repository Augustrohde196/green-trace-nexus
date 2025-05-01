
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomerForm, CustomerFormData } from "@/components/customers/customer-form";
import { CustomerDetailsDialog } from "@/components/customers/customer-details-dialog";
import { useMockCustomers, NewCustomer } from "@/hooks/use-mock-customers";
import { Customer } from "@/data/models";
import { CustomerPageHeader } from "@/components/customers/customer-page-header";
import { CustomerMetricsCards } from "@/components/customers/customer-metrics-cards";
import { CustomerFilters } from "@/components/customers/customer-filters";

export default function Customers() {
  const { customers, addCustomer } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        customer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedTab === "all") return matchesSearch;
    if (selectedTab === "high") return matchesSearch && customer.matchingScore >= 80;
    if (selectedTab === "medium") return matchesSearch && customer.matchingScore >= 50 && customer.matchingScore < 80;
    return matchesSearch && customer.matchingScore < 50;
  });

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
      <Sheet open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Corporate Customer</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <CustomerForm 
              onSubmit={(formData: CustomerFormData) => {
                const newCustomer: NewCustomer = {
                  name: formData.name,
                  location: formData.location,
                  industry: formData.industry,
                  annualConsumption: formData.annualConsumption,
                  portfolioMix: {
                    solar: formData.solarPercentage,
                    wind: 100 - formData.solarPercentage
                  },
                  preferredMix: { 
                    wind: 100 - formData.solarPercentage,
                    solar: formData.solarPercentage 
                  },
                  portfolioStatus: "Not Allocated",
                  matchingScore: Math.floor(Math.random() * (85 - 60) + 60), // Random score between 60-85
                  localOnly: true,
                  status: "pending"
                };
                
                addCustomer(newCustomer);
                setIsAddCustomerOpen(false);
              }} 
              onCancel={() => setIsAddCustomerOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
