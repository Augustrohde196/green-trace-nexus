
import { BarChart3, SunMedium, Users, LightbulbIcon, Battery, ExternalLink, ArrowUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EnergyMixChart } from "@/components/dashboard/energy-mix-chart";
import { calculateDashboardMetrics } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, TooltipProps } from "recharts";
import { DashboardTooltip } from "@/components/dashboard/dashboard-tooltip";
import { useState } from "react";
import { motion } from "framer-motion";

// Sample data for GO commitments and production projections for the utility
const projectedData = [
  { month: "Jun", commitments: 28, production: 30, surplus: 2 },
  { month: "Jul", commitments: 32, production: 29, shortfall: 3 },
  { month: "Aug", commitments: 35, production: 33, shortfall: 2 },
  { month: "Sep", commitments: 30, production: 28, shortfall: 2 },
  { month: "Oct", commitments: 25, production: 28, surplus: 3 },
  { month: "Nov", commitments: 22, production: 20, shortfall: 2 },
];

// Custom tooltip for the Commitments vs Production chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<any, any>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/95 backdrop-blur-sm p-3 border border-border/50 shadow-lg rounded">
        <p className="font-medium mb-1">{`${label}`}</p>
        {payload.map((entry: any, index: number) => {
          if (entry.value !== undefined && entry.name) {
            const name = entry.name === "commitments" ? "Customer GO Commitments" :
                        entry.name === "production" ? "Projected Production" : 
                        entry.name === "shortfall" ? "Shortfall" : "Surplus";
            return (
              <div key={`item-${index}`} className="flex items-center gap-2 text-sm">
                <div 
                  className="h-3 w-3 rounded" 
                  style={{ backgroundColor: entry.fill || entry.color }}
                />
                <span className="text-muted-foreground">{name}:</span>
                <span className="font-medium">{`${entry.value} GWh`}</span>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  }
  return null;
};

const Dashboard = () => {
  // In a real app, we would fetch this data from a server
  const metrics = calculateDashboardMetrics();
  
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  // Animation variants for elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your renewable energy portfolio</p>
        </div>
        <div className="flex gap-2">
          <Button className="gap-2">
            <ExternalLink size={16} />
            Corporate Portal
          </Button>
        </div>
      </div>
      
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

      <motion.div 
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <ProductionChart timeRange={timeRange} setTimeRange={setTimeRange} />
        <EnergyMixChart data={metrics.productionByType} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Commitments vs Production</CardTitle>
              <DashboardTooltip content="Shortfall: The amount of corporate consumption not fully matched by renewable energy production during the same time period." />
            </div>
          </CardHeader>
          <CardContent>
            <motion.div 
              className="h-[300px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="commitments" fill="#8884d8" name="commitments" />
                  <Bar dataKey="production" fill="#4DA167" name="production" />
                  <Bar dataKey="shortfall" fill="#FF6B6B" name="shortfall" stackId="stack" />
                  <Bar dataKey="surplus" fill="#4CAF50" name="surplus" stackId="stack" />
                </ComposedChart>
              </ResponsiveContainer>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                variants={fadeInUp}
                className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-accent/20"
              >
                <div>
                  <h3 className="font-medium">Projected Shortfall</h3>
                  <p className="text-muted-foreground text-sm">Next 6 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-500">7 GWh</span>
                </div>
              </motion.div>
              <motion.div 
                variants={fadeInUp}
                className="flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-accent/20"
              >
                <div>
                  <h3 className="font-medium">Sourcing Recommendations</h3>
                  <p className="text-muted-foreground text-sm">Based on market analysis</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-500">5 assets</span>
                  <ArrowUp className="h-5 w-5 text-green-500" />
                </div>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;
