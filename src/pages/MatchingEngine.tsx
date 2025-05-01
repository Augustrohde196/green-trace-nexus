
import { useState } from "react";
import { Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { matchingEngineService } from "@/services/matching-engine-service";
import { goService } from "@/services/go-service";
import { mockCustomers } from "@/data/mock-data";
import { motion } from "framer-motion";
import { DateNavigation } from "@/components/billing/date-navigation";
import { CustomerBreakdown } from "@/components/billing/customer-breakdown";
import { 
  AllocationMetrics,
  AllocationOverviewChart,
  AllocationIndicators,
  AllocationByCustomerChart
} from "@/components/go-allocation";
import { getTimeBasedData, getPeriodText, TimeRangeType } from "@/lib/allocation-data";

export default function GOAllocation() {
  const [metrics, setMetrics] = useState(goService.getMetrics());
  const [view, setView] = useState<"overview" | "customers">("overview");
  const [timeRange, setTimeRange] = useState<TimeRangeType>("month");
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());
  
  // Chart colors for better visual distinction
  const CHART_COLORS = [
    "#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", 
    "#00C49F", "#FFBB28", "#FF8042", "#a4de6c", "#d0ed57"
  ];
  
  // Get allocation data based on the selected time range
  const allocationData = getTimeBasedData(timeRange);
  const periodText = getPeriodText(timeRange);
  
  // Navigate through dates
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonth(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
  };
  
  // Mock customer allocation data
  const customerAllocations = mockCustomers.map(customer => ({
    id: customer.id,
    name: customer.name,
    location: customer.location,
    volume: Math.round(customer.annualConsumption * 83.33), // Monthly allocation in MWh
    percentOfTotal: Math.round((customer.annualConsumption / mockCustomers.reduce((acc, c) => acc + c.annualConsumption, 0)) * 100),
    matchingScore: customer.matchingScore,
    traderSource: customer.id === "c3" || customer.id === "c5" ? Math.round(customer.annualConsumption * 0.2 * 83.33) : 0, // 20% from trader for some customers
    amount: Math.round(customer.annualConsumption * 83.33 * 140), // DKK amount based on volume and rate
  }));

  return (
    <div className="space-y-6 bg-background">
      <motion.div 
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">GO Allocation</h2>
          <p className="text-muted-foreground">
            AI-powered GO allocation between assets and corporate customers
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <DateNavigation
            selectedMonth={selectedMonth}
            goToPreviousMonth={goToPreviousMonth}
            goToNextMonth={goToNextMonth}
          />
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Select Period
          </Button>
          <Button className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </motion.div>
      
      <AllocationMetrics 
        totalGOs={metrics.totalGOs}
        totalMWh={metrics.totalMWh}
        allocatedGOs={metrics.allocatedGOs}
        allocatedMWh={metrics.allocatedMWh}
        availableGOs={metrics.availableGOs}
        availableMWh={metrics.availableMWh}
        averageMatchingScore={metrics.averageMatchingScore}
      />

      <div className="flex justify-between items-center">
        <Tabs defaultValue={view} value={view} onValueChange={(value) => setView(value as "overview" | "customers")} className="w-full">
          <TabsList className="grid w-64 grid-cols-2">
            <TabsTrigger value="overview">Allocation Overview</TabsTrigger>
            <TabsTrigger value="customers">Customer Breakdown</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Allocation Overview */}
      {view === "overview" && (
        <>
          <AllocationOverviewChart 
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            allocationData={allocationData}
            periodText={periodText}
          />
          <AllocationIndicators 
            currentData={allocationData[allocationData.length - 1]} 
          />
        </>
      )}

      {/* Customer Breakdown */}
      {view === "customers" && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="md:col-span-1">
            <AllocationByCustomerChart 
              customerAllocations={customerAllocations}
              chartColors={CHART_COLORS}
            />
          </div>
          
          <div className="md:col-span-2">
            <CustomerBreakdown customerBreakdown={customerAllocations} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
