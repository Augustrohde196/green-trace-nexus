
import { BarChart3, SunMedium, Users, LightbulbIcon, Battery } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { DashboardMetrics } from "@/data/models";
import { DashboardTooltip } from "@/components/dashboard/dashboard-tooltip";
import { motion } from "framer-motion";

interface DashboardMetricsProps {
  metrics: DashboardMetrics;
}

export function DashboardMetricsCards({ metrics }: DashboardMetricsProps) {
  // Animation variants for elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
      }}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeInUp}>
        <DashboardCard
          title="Total Capacity"
          value={`${metrics.totalCapacity} MW`}
          description={`${metrics.totalAssets} assets in portfolio`}
          icon={BarChart3}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <DashboardCard
          title="Total Production"
          value={`${metrics.totalProduction} GWh`}
          description="Annual renewable energy production"
          icon={LightbulbIcon}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <DashboardCard
          title="Available Capacity"
          value={`${metrics.availableCapacity} MW`}
          description={`${Math.round((metrics.availableCapacity / metrics.totalCapacity) * 100)}% of total capacity`}
          icon={Battery}
        />
      </motion.div>
      <motion.div variants={fadeInUp}>
        <DashboardCard
          title="Corporate Customers"
          value={metrics.totalCustomers}
          description={
            <div className="flex items-center">
              <span>{Math.round(metrics.averageMatchingScore)}% avg. matching score</span>
              <DashboardTooltip content="Time-matching score: The percentage of your electricity consumption that was covered by renewable energy produced during the same hour." />
            </div>
          }
          icon={Users}
        />
      </motion.div>
    </motion.div>
  );
}
