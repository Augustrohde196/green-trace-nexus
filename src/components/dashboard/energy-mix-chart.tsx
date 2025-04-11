
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionByType } from "@/data/models";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

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
  
  const COLORS = ["#3B82F6", "#F59E0B"]; // Wind: blue, Solar: amber
  const totalProduction = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Energy Mix (Last Year Production)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, value}) => `${name}: ${value} GWh`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number, name: string) => [`${value} GWh (${Math.round((value/totalProduction)*100)}%)`, name]}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
