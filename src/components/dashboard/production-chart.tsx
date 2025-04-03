
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductionData } from "@/data/models";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface ProductionChartProps {
  data: ProductionData[];
}

export function ProductionChart({ data }: ProductionChartProps) {
  // Format the data for the chart
  const formattedData = data
    .slice() // Create a copy of the array
    .reverse() // Reverse to show oldest to newest
    .map(item => ({
      ...item,
      hour: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' }),
      formattedDate: `${new Date(item.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })} ${new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    }));

  // Take the last 48 hours (2 days of hourly data)
  const displayData = formattedData.slice(-48);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Production (MW) - Last 48 Hours</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={displayData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="hour"
                tickFormatter={(value, index) => index % 6 === 0 ? value : ''}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(value) => {
                  // Check if the value is a valid index and displayData[value] exists
                  if (typeof value === 'number' && displayData[value] && displayData[value].formattedDate) {
                    return displayData[value].formattedDate;
                  }
                  // Fallback if the index is out of range or the data doesn't exist
                  return 'Data not available';
                }}
                formatter={(value: number) => [`${value} MW`, 'Output']}
              />
              <Bar 
                dataKey="output" 
                fill="#4DA167"
                name="Output"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
