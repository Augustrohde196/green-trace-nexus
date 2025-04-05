
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionByType } from "@/data/models";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface EnergyMixChartProps {
  data: ProductionByType[];
}

export function EnergyMixChart({ data }: EnergyMixChartProps) {
  const COLORS = ["#3B82F6", "#F59E0B"]; // Wind: blue, Solar: amber
  const totalProduction = data.reduce((sum, item) => sum + item.value, 0);

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
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={(entry) => `${entry.type}: ${entry.value} GWh`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value} GWh (${Math.round((value/totalProduction)*100)}%)`, 'Production']}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
