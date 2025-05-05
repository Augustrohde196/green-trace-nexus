
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionData } from "@/data/models";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
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
    let dataPoints: { date: string; formattedDate: string; wind: number; solar: number; total: number }[] = [];
    
    switch(timeRange) {
      case "week":
        // Generate daily data for the last 7 days
        for (let i = 6; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toLocaleDateString([], { weekday: 'short' });
          const windOutput = Math.floor(Math.random() * 100) + 40;
          const solarOutput = Math.floor(Math.random() * 50) + 20;
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            wind: windOutput,
            solar: solarOutput,
            total: windOutput + solarOutput
          });
        }
        break;
      case "month":
        // Generate daily data for the last 30 days
        for (let i = 29; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(today.getDate() - i);
          const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
          const windOutput = Math.floor(Math.random() * 100) + 40;
          const solarOutput = Math.floor(Math.random() * 50) + 20;
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            wind: windOutput,
            solar: solarOutput,
            total: windOutput + solarOutput
          });
        }
        break;
      case "year":
        // Generate monthly data for the last 12 months
        for (let i = 11; i >= 0; i--) {
          const date = new Date(today);
          date.setMonth(today.getMonth() - i);
          const dateStr = date.toLocaleDateString([], { month: 'short' });
          const windOutput = Math.floor(Math.random() * 800) + 300;
          const solarOutput = Math.floor(Math.random() * 400) + 200;
          dataPoints.push({
            date: dateStr,
            formattedDate: dateStr,
            wind: windOutput,
            solar: solarOutput,
            total: windOutput + solarOutput
          });
        }
        break;
    }
    
    return dataPoints;
  };
  
  const chartData = generateChartData();
  const energyUnit = timeRange === "year" ? "GWh" : "MWh";

  return (
    <Card className="flex-1 w-full md:w-[70%] production-chart-container">
      <CardHeader>
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 justify-between items-start">
          <div>
            <CardTitle>Production Timeline</CardTitle>
          </div>
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
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
                <defs>
                  <linearGradient id="colorWind" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSolar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4DA167" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4DA167" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis 
                  dataKey="date"
                  padding={{ left: 10, right: 10 }}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  label={{ 
                    value: energyUnit, 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fontSize: '10px', textAnchor: 'middle' },
                    offset: 0,
                    dx: -15
                  }} 
                />
                <Tooltip 
                  labelFormatter={(value) => `Date: ${value}`}
                  formatter={(value: number, name: string) => {
                    const displayName = name === "wind" ? "Wind" : name === "solar" ? "Solar" : "Total";
                    return [`${value} ${energyUnit}`, displayName];
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="wind" 
                  stackId="1"
                  stroke="#3B82F6" 
                  fillOpacity={1}
                  fill="url(#colorWind)" 
                  name="wind"
                />
                <Area 
                  type="monotone" 
                  dataKey="solar" 
                  stackId="1"
                  stroke="#4DA167" 
                  fillOpacity={1}
                  fill="url(#colorSolar)" 
                  name="solar"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center items-center gap-6 py-4 mt-1">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#3B82F6]"></div>
            <span className="text-sm">Wind</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#4DA167]"></div>
            <span className="text-sm">Solar</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
