
import { useState } from "react";
import { format } from "date-fns";
import { BillingHeader } from "@/components/billing/billing-header";
import { DateNavigation } from "@/components/billing/date-navigation";
import { BillingMetrics } from "@/components/billing/billing-metrics";
import { BillingFilters } from "@/components/billing/billing-filters";
import { BillingTable } from "@/components/billing/billing-table";
import { GOTraceabilityCard } from "@/components/billing/go-traceability-card";
import { calculateBillingAmounts, getUtilityBillings } from "@/data/utility-billing";

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  
  // GO fee rates
  const RATE_PER_GO = 15;
  const REGISTRATION_FEE_PER_GO = 5;
  
  // Calculate the first day of the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  
  // Format the date range for display
  const dateRangeDisplay = format(firstDayOfMonth, "MMMM yyyy");

  // Function to handle going to the previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonth(newDate);
  };

  // Function to handle going to the next month
  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
  };

  // Get utility billings and calculate amounts
  const utilities = getUtilityBillings(firstDayOfMonth);
  const utilityBillings = calculateBillingAmounts(
    utilities,
    RATE_PER_GO,
    REGISTRATION_FEE_PER_GO
  );

  // Filter the billings based on search query and status filter
  const filteredBillings = utilityBillings.filter(billing => {
    const matchesSearch = billing.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && billing.paymentStatus === filterStatus;
  });

  // Calculate totals
  const totalGOsIssued = utilityBillings.reduce((sum, billing) => sum + billing.goIssued, 0);
  const totalAllocatedGOs = utilityBillings.reduce((sum, billing) => sum + billing.allocatedGOs, 0);
  const totalBilled = utilityBillings.reduce((sum, billing) => sum + (billing.totalAmount || 0), 0);
  const totalPaid = utilityBillings
    .filter(billing => billing.paymentStatus === "paid")
    .reduce((sum, billing) => sum + (billing.totalAmount || 0), 0);

  return (
    <div className="space-y-6">
      <BillingHeader />
      
      <DateNavigation 
        dateRangeDisplay={dateRangeDisplay}
        onPreviousMonth={goToPreviousMonth}
        onNextMonth={goToNextMonth}
      />

      <BillingMetrics 
        totalGOsIssued={totalGOsIssued}
        totalBilled={totalBilled}
        totalPaid={totalPaid}
        totalAllocatedGOs={totalAllocatedGOs}
        dateRangeDisplay={dateRangeDisplay}
      />

      <BillingFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <BillingTable 
        billings={filteredBillings}
        goRate={RATE_PER_GO}
        registrationFeeRate={REGISTRATION_FEE_PER_GO}
      />
      
      <GOTraceabilityCard />
    </div>
  );
}
