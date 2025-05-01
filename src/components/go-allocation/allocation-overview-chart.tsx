
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

export type TimeRangeType = "week" | "month" | "year";

export type AllocationDataPoint = {
  month: string;
  production: number;
  allocated: number;
  shortfall?: number;
  excess?: number;
};

interface AllocationOverviewChartProps {
  timeRange: TimeRangeType;
  setTimeRange: (value: TimeRangeType) => void;
  allocationData: AllocationDataPoint[];
  periodText: string;
}

export function AllocationOverviewChart({ 
  timeRange, 
  setTimeRange, 
  allocationData,
  periodText
}: AllocationOverviewChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>{periodText} Allocation</CardTitle>
            <CardDescription>
              {periodText} analysis of renewable energy production vs. customer allocation
            </CardDescription>
          </div>
          <div>
            <ToggleGroup 
              type="single" 
              value={timeRange} 
              onValueChange={(value) => value && setTimeRange(value as "week" | "month" | "year")} 
              className="bg-muted rounded-md"
            >
              <ToggleGroupItem value="week" aria-label="View weekly data" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">
                Week
              </ToggleGroupItem>
              <ToggleGroupItem value="month" aria-label="View monthly data" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">
                Month
              </ToggleGroupItem>
              <ToggleGroupItem value="year" aria-label="View yearly data" className="data-[state=on]:bg-background data-[state=on]:text-foreground data-[state=on]:shadow-sm">
                Year
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={allocationData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                barGap={0}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis unit=" MWh" />
                <RechartsTooltip 
                  formatter={(value: number, name: string) => {
                    const formattedName = name === 'production' ? 'Production' : 
                                        name === 'allocated' ? 'Allocated' : 
                                        name === 'shortfall' ? 'Shortfall' : 'Excess';
                    return [`${value} MWh`, formattedName];
                  }}
                />
                <Legend />
                <Bar dataKey="production" name="Production" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="allocated" name="Allocated" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="shortfall" name="Shortfall" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="allocation" />
                <Bar dataKey="excess" name="Excess" fill="#F59E0B" radius={[4, 4, 0, 0]} stackId="allocation" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
