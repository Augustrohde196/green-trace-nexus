
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Asset } from "@/data/models";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Progress } from "@/components/ui/progress";

interface PortfolioDistributionProps {
  assets: Asset[];
}

export function PortfolioDistribution({ assets }: PortfolioDistributionProps) {
  // Calculate distribution by type (wind/solar)
  const typeDistribution = assets.reduce(
    (acc, asset) => {
      if (asset.type === "wind") {
        acc.wind += asset.capacity;
      } else {
        acc.solar += asset.capacity;
      }
      acc.total += asset.capacity;
      return acc;
    },
    { wind: 0, solar: 0, total: 0 }
  );

  // Calculate distribution by installation type (BTM/FTM)
  const installationDistribution = assets.reduce(
    (acc, asset) => {
      if (asset.installationType === "BTM") {
        acc.btm += asset.capacity;
      } else {
        acc.ftm += asset.capacity;
      }
      return acc;
    },
    { btm: 0, ftm: 0 }
  );

  // Updated colors to match dashboard - Wind blue, Solar green
  const typeChartData = [
    { name: "Wind", value: typeDistribution.wind, color: "#735DFF" }, // Using the techPurple color
    { name: "Solar", value: typeDistribution.solar, color: "#D9F0C2" }, // Using the techGreen color
  ];

  // Different colors for installation types (not blue/green)
  const installationChartData = [
    { name: "Behind-the-Meter", value: installationDistribution.btm, color: "#F59E0B" }, // Amber color
    { name: "Front-of-the-Meter", value: installationDistribution.ftm, color: "#8B5CF6" }, // Violet color
  ];

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium mb-4">Energy Source Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value} MW`, 'Capacity']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-wind" />
                    <span className="text-sm">Wind</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((typeDistribution.wind / typeDistribution.total) * 100)}% ({typeDistribution.wind} MW)
                  </span>
                </div>
                <Progress value={(typeDistribution.wind / typeDistribution.total) * 100} className="mt-1" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-solar" />
                    <span className="text-sm">Solar</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((typeDistribution.solar / typeDistribution.total) * 100)}% ({typeDistribution.solar} MW)
                  </span>
                </div>
                <Progress value={(typeDistribution.solar / typeDistribution.total) * 100} className="mt-1 bg-muted" />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium mb-4">Installation Type Distribution</h3>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={installationChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {installationChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`${value} MW`, 'Capacity']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 mt-4">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="text-sm">Behind-the-Meter (BTM)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((installationDistribution.btm / typeDistribution.total) * 100)}% ({installationDistribution.btm} MW)
                  </span>
                </div>
                <Progress value={(installationDistribution.btm / typeDistribution.total) * 100} className="mt-1 bg-muted" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-violet-500" />
                    <span className="text-sm">Front-of-the-Meter (FTM)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {Math.round((installationDistribution.ftm / typeDistribution.total) * 100)}% ({installationDistribution.ftm} MW)
                  </span>
                </div>
                <Progress value={(installationDistribution.ftm / typeDistribution.total) * 100} className="mt-1 bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
