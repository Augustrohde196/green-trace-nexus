
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
  TooltipProps,
} from "recharts";
import { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";

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

// Custom tooltip component to ensure correct formatting and display
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length > 0) {
    // Filter out undefined or zero values to avoid showing empty entries
    const validPayload = payload.filter(entry => {
      const value = entry.value as number;
      return value !== undefined && value > 0;
    });

    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium mb-2">{label}</p>
        <div className="space-y-1">
          {validPayload.map((entry, index) => {
            // Determine the display name and color based on the dataKey
            let displayName = entry.dataKey as string;
            let color = entry.color;

            switch (displayName) {
              case "production":
                displayName = "Production";
                break;
              case "allocated":
                displayName = "Allocated";
                break;
              case "shortfall":
                displayName = "Shortfall";
                break;
              case "excess":
                displayName = "Excess";
                break;
            }

            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-sm mr-2"
                    style={{ backgroundColor: color }}
                  ></div>
                  <span className="text-xs text-gray-600 dark:text-gray-300">
                    {displayName}
                  </span>
                </div>
                <span className="text-xs font-medium ml-4">
                  {(entry.value as number).toLocaleString()} MWh
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

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
              className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 shadow-sm"
            >
              <ToggleGroupItem 
                value="week" 
                aria-label="View weekly data" 
                className="data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-primary data-[state=on]:shadow-sm px-4 py-1.5 rounded-md font-medium text-sm"
              >
                Week
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="month" 
                aria-label="View monthly data" 
                className="data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-primary data-[state=on]:shadow-sm px-4 py-1.5 rounded-md font-medium text-sm"
              >
                Month
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="year" 
                aria-label="View yearly data" 
                className="data-[state=on]:bg-white dark:data-[state=on]:bg-slate-700 data-[state=on]:text-primary data-[state=on]:shadow-sm px-4 py-1.5 rounded-md font-medium text-sm"
              >
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
                barGap={2}
                barSize={20}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} vertical={false} />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  dy={10}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <YAxis 
                  unit=" MWh" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666', fontSize: 12 }}
                />
                <RechartsTooltip 
                  content={<CustomTooltip />}
                  cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: '10px' }}
                />
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
