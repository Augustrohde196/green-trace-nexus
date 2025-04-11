
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionData } from "@/data/models";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ProductionChartProps {
  data: ProductionData[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  // Aggregate hourly data into daily data
  const dailyData = data.reduce((acc, item) => {
    const date = new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' });
    
    // Find or create the entry for this date
    const existingEntry = acc.find(d => d.date === date);
    if (existingEntry) {
      // Add the output to the existing entry (converting MW to MWh for hourly data)
      existingEntry.output += item.output; // Assuming hourly data, so MW * 1 hour = MWh
    } else {
      // Create a new entry for this date
      acc.push({
        date,
        formattedDate: date,
        output: item.output // Assuming hourly data, so MW * 1 hour = MWh
      });
    }
    
    return acc;
  }, [] as { date: string; formattedDate: string; output: number }[]);
  
  // Sort by date (oldest first)
  const sortedData = dailyData.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateA.getTime() - dateB.getTime();
  });
  
  // Take the last 30 days (changed from 14 days)
  const displayData = sortedData.slice(-30);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Production (MWh) - Last 30 Days</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
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
                formatter={(value: number) => [`${value.toFixed(1)} MWh`, 'Daily Production']}
              />
              <Bar 
                dataKey="output" 
                fill="#4DA167"
                name="Daily Production"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
