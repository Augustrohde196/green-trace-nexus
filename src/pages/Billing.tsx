
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

// Import billing components
import { BillingHeader } from "@/components/billing/billing-header";
import { DateNavigation } from "@/components/billing/date-navigation";
import { SubscriptionOverview } from "@/components/billing/subscription-overview";
import { MonthlyUsageSummary } from "@/components/billing/monthly-usage-summary";
import { UsageHistoryChart } from "@/components/billing/usage-history-chart";
import { CustomerBreakdown } from "@/components/billing/customer-breakdown";
import { UpcomingInvoices } from "@/components/billing/upcoming-invoices";
import { ContractDialog } from "@/components/billing/contract-dialog";

// Import billing data
import { 
  getBillingData, 
  getUsageHistory, 
  getCustomerBreakdown 
} from "@/components/billing/billing-data";

export default function Billing() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [isContractDialogOpen, setIsContractDialogOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { t } = useLanguage();
  
  // Get billing data
  const billingData = getBillingData();
  const usageHistory = getUsageHistory();
  const customerBreakdown = getCustomerBreakdown();
  
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

  // Function to select a specific date
  const selectDate = (date: Date) => {
    setSelectedMonth(date);
    setCalendarOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <BillingHeader 
        calendarOpen={calendarOpen} 
        setCalendarOpen={setCalendarOpen}
        selectDate={selectDate}
        selectedMonth={selectedMonth}
      />

      {/* Date navigation controls */}
      <DateNavigation 
        selectedMonth={selectedMonth}
        goToPreviousMonth={goToPreviousMonth}
        goToNextMonth={goToNextMonth}
      />

      {/* Subscription and Usage Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SubscriptionOverview 
          billingData={billingData} 
          onViewContract={() => setIsContractDialogOpen(true)}
        />
        
        <MonthlyUsageSummary 
          billingData={billingData}
          selectedMonth={selectedMonth}
        />
      </motion.div>

      {/* Usage History Chart */}
      <UsageHistoryChart usageHistory={usageHistory} />

      {/* Customer Breakdown */}
      <CustomerBreakdown customerBreakdown={customerBreakdown} />

      {/* Upcoming Invoices */}
      <UpcomingInvoices />

      {/* Contract Details Dialog */}
      <ContractDialog 
        isOpen={isContractDialogOpen} 
        onOpenChange={setIsContractDialogOpen}
        contractDetails={billingData.contractDetails}
      />
    </div>
  );
}
