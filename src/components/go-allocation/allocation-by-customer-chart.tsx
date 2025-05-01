
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
  Legend,
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

// Improved chart colors with better contrast
const ENHANCED_COLORS = [
  "#8884d8",  // Purple
  "#82ca9d",  // Green
  "#ffc658",  // Yellow
  "#ff8042",  // Orange
  "#0088fe",  // Blue
  "#d0ed57",  // Lime
  "#ff6b6b",  // Red
  "#a4de6c",  // Light green
  "#8dd1e1",  // Light blue
  "#f06292",  // Pink
];

// Custom renderer for Pie Chart labels to ensure clarity and prevent truncation
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text 
      x={x} 
      y={y} 
      fill="#333333" 
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${name} (${(percent * 100).toFixed(0)}%)`}
    </text>
  );
};

export function AllocationByCustomerChart({ customerAllocations, chartColors }: AllocationByCustomerChartProps) {
  // Use enhanced colors or fallback to provided chartColors
  const colors = ENHANCED_COLORS.length >= customerAllocations.length ? ENHANCED_COLORS : chartColors;
  
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
                data={customerAllocations.map(c => ({
                  name: c.name,
                  value: c.volume,
                  percentOfTotal: c.percentOfTotal
                }))} 
                dataKey="value"
                nameKey="name"
                cx="50%" 
                cy="50%" 
                outerRadius={80}
                labelLine={true}
                label={renderCustomizedLabel}
                paddingAngle={2}
              >
                {customerAllocations.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]} 
                    stroke="#ffffff" 
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Legend 
                layout="vertical" 
                verticalAlign="bottom" 
                align="center"
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px"
                }}
              />
              <RechartsTooltip 
                formatter={(value: number, name: string, props: any) => {
                  const item = customerAllocations.find(c => c.name === name);
                  return [
                    <>
                      <div className="font-medium">{name}</div>
                      <div>{value.toLocaleString()} MWh</div>
                      <div>{item ? `${item.percentOfTotal}% of total` : ""}</div>
                    </>,
                    ""
                  ];
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "6px",
                  border: "1px solid #e2e8f0",
                  padding: "8px 12px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  fontSize: "12px"
                }}
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
