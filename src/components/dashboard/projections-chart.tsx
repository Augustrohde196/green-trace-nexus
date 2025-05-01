
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardTooltip } from "@/components/dashboard/dashboard-tooltip";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart, TooltipProps } from "recharts";
import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

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

export function ProjectionsChart() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  // Check if there is a shortfall in the projected data
  const hasShortfall = projectedData.some(item => item.shortfall);
  
  return (
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
              className={`flex items-center justify-between p-4 border rounded-lg transition-all duration-300 hover:bg-accent/20 ${hasShortfall ? 'bg-red-50 border-red-100 text-red-800' : ''}`}
            >
              <div>
                <h3 className="font-medium">Projected Shortfall</h3>
                <p className="text-muted-foreground text-sm">Next 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xl font-bold ${hasShortfall ? 'text-red-500' : 'text-red-500'}`}>7 GWh</span>
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
  );
}
