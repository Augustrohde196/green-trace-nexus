
import { calculateDashboardMetrics } from "@/data/mock-data";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMetricsCards } from "@/components/dashboard/dashboard-metrics";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EnergyMixChart } from "@/components/dashboard/energy-mix-chart";
import { ProjectionsChart } from "@/components/dashboard/projections-chart";
import { useState } from "react";

const Dashboard = () => {
  // In a real app, we would fetch this data from a server
  const metrics = calculateDashboardMetrics();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  return (
    <div className="space-y-6 bg-background">
      <DashboardHeader />
      
      <div id="dashboard-metrics-cards">
        <DashboardMetricsCards metrics={metrics} />
      </div>

      <div 
        className="flex flex-col md:flex-row gap-4"
        id="dashboard-charts"
      >
        <ProductionChart timeRange={timeRange} setTimeRange={setTimeRange} />
        <EnergyMixChart data={metrics.productionByType} />
      </div>

      <ProjectionsChart />
    </div>
  );
};

export default Dashboard;
