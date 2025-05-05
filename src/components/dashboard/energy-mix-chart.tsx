
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
    name: item.type === 'wind' ? 'Wind' : 'Solar',
    value: item.value,
    type: item.type
  }));
  
  const COLORS = ["#3B82F6", "#4DA167"]; // Blue = Wind, Green = Solar - matching Production Timeline
  const totalProduction = chartData.reduce((sum, item) => sum + item.value, 0);

  // Custom tooltip to show detailed information on hover
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const percentage = Math.round((value/totalProduction)*100);
      return (
        <div className="bg-background/90 backdrop-blur-sm p-2 border border-border/50 rounded shadow text-sm">
          <p>{name}: {value} GWh ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  // Custom legend that shows the energy type name
  const renderLegend = (props: any) => {
    const { payload } = props;
    return (
      <div className="flex justify-center items-center gap-6 py-3">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="h-3 w-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="flex-none w-full md:w-[30%] energy-mix-chart-container group hover:border-primary/50 transition-colors">
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
                innerRadius={50} 
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={false} // Remove labels inside the chart
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
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                content={renderLegend}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </CardContent>
    </Card>
  );
}
