
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionByType } from "@/data/models";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { motion } from "framer-motion";

interface EnergyMixChartProps {
  data: ProductionByType[];
}

export function EnergyMixChart({ data }: EnergyMixChartProps) {
  // Make sure we use the correct names for Wind and Solar
  const chartData = data.map(item => ({
    name: item.type === 'wind' ? 'Wind' : 'Solar', // Ensure proper capitalization
    value: item.value,
    type: item.type
  }));
  
  const COLORS = ["#3B82F6", "#4DA167"]; // Wind: blue, Solar: green - matching Production Timeline
  const totalProduction = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="flex-none w-full md:w-[30%]">
      <CardHeader>
        <CardTitle>Energy Mix</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Current production by source type</p>
        <motion.div 
          className="h-[220px]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={50} // Add inner radius for donut chart
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, value}) => `${name}: ${value} GWh`}
                animationDuration={1500}
                animationBegin={300}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                    strokeWidth={2}
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} GWh (${Math.round((value/totalProduction)*100)}%)`, name]}
              />
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center" 
                iconSize={10}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
