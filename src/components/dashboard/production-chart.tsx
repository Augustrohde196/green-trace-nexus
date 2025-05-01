
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionData } from "@/data/models";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductionChartProps {
  data?: ProductionData[];
  timeRange: "week" | "month" | "year";
  setTimeRange: Dispatch<SetStateAction<"week" | "month" | "year">>;
}

export function ProductionChart({ data, timeRange, setTimeRange }: ProductionChartProps) {
  // Generate data based on selected timeRange
  const generateChartData = () => {
    const today = new Date();
    let dataPoints: { date: string; formattedDate: string; output: number }[] = [];
    let format: string;
    
    switch(timeRange) {
      case "week":
        // Generate daily data for the last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toLocaleDateString([], { weekday: 'short' });
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            output: Math.floor(Math.random() * 150) + 50
          });
        }
        break;
      case "month":
        // Generate daily data for the last 30 days
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            output: Math.floor(Math.random() * 150) + 50
          });
        }
        break;
      case "year":
        // Generate monthly data for the last 12 months
        for (let i = 11; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(today.getMonth() - i);
          const dateStr = date.toLocaleDateString([], { month: 'short' });
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            output: Math.floor(Math.random() * 1200) + 500
          });
        }
        break;
    }
    
    return dataPoints;
  };
  
  const chartData = generateChartData();

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 justify-between items-start">
          <CardTitle>Production Timeline Chart</CardTitle>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant={timeRange === "week" ? "default" : "outline"}
              onClick={() => setTimeRange("week")}
              className="h-8"
            >
              Week
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "month" ? "default" : "outline"}
              onClick={() => setTimeRange("month")}
              className="h-8"
            >
              Month
            </Button>
            <Button 
              size="sm" 
              variant={timeRange === "year" ? "default" : "outline"}
              onClick={() => setTimeRange("year")}
              className="h-8"
            >
              Year
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <AnimatePresence mode="wait">
          <motion.div 
            key={timeRange}
            className="h-[300px] w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date"
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => {
                    return value;
                  }}
                  formatter={(value: number) => [`${value.toFixed(1)} GWh`, 'Production']}
                />
                <Bar 
                  dataKey="output" 
                  fill="#4DA167"
                  name="Production"
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
