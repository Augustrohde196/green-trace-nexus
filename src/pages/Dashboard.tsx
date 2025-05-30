
import { calculateDashboardMetrics } from "@/data/mock-data";
import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardMetricsCards } from "@/components/dashboard/dashboard-metrics";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EnergyMixChart } from "@/components/dashboard/energy-mix-chart";
import { ProjectionsChart } from "@/components/dashboard/projections-chart";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  // In a real app, we would fetch this data from a server
  const metrics = calculateDashboardMetrics();
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="space-y-6 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <DashboardHeader />
      
      <div id="dashboard-metrics-cards">
        <DashboardMetricsCards metrics={metrics} />
      </div>

      <motion.div 
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        id="dashboard-charts"
      >
        <ProductionChart timeRange={timeRange} setTimeRange={setTimeRange} />
        <EnergyMixChart data={metrics.productionByType} />
      </motion.div>

      <ProjectionsChart />
    </motion.div>
  );
};

export default Dashboard;
