
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Cell,
} from "recharts";

interface CustomerAllocation {
  id: string;
  name: string;
  location: string;
  volume: number;
  percentOfTotal: number;
  matchingScore: number;
  traderSource: number;
  amount: number;
}

interface AllocationByCustomerChartProps {
  customerAllocations: CustomerAllocation[];
  chartColors: string[];
}

export function AllocationByCustomerChart({ customerAllocations, chartColors }: AllocationByCustomerChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Allocation By Customer</CardTitle>
        <CardDescription>Proportion of total allocation by customer</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie 
                data={customerAllocations.map(c => ({name: c.name, value: c.volume}))} 
                dataKey="value"
                cx="50%" 
                cy="50%" 
                outerRadius={80} 
                label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {customerAllocations.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number, name: string) => [`${value.toLocaleString()} MWh`, name]}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
