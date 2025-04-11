
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Building2, FileCheck, Wind, SunMedium, AlertTriangle, TrendingUp, ArrowUp, Check, Download } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Line, ComposedChart, AreaChart, Area, HorizontalBarChart } from "recharts";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

// Sample data for time-matching scores by month
const timeMatchingData = [
  { month: "Jan", score: 72, consumption: 18, production: 15 },
  { month: "Feb", score: 68, consumption: 20, production: 18 },
  { month: "Mar", score: 85, consumption: 22, production: 25 },
  { month: "Apr", score: 76, consumption: 24, production: 22 },
  { month: "May", score: 82, consumption: 25, production: 28 },
  { month: "Jun", score: 89, consumption: 28, production: 30 },
];

// Sample data for consumption profile
const consumptionData = [
  { hour: "00:00", weekday: 18, weekend: 22 },
  { hour: "04:00", weekday: 15, weekend: 17 },
  { hour: "08:00", weekday: 28, weekend: 19 },
  { hour: "12:00", weekday: 32, weekend: 24 },
  { hour: "16:00", weekday: 35, weekend: 27 },
  { hour: "20:00", weekday: 25, weekend: 30 },
];

// Updated portfolio performance data - now includes actual vs target allocation parameters
const portfolioPerformanceData = [
  { parameter: "Wind %", actual: 70, target: 65 },
  { parameter: "Solar %", actual: 30, target: 35 },
  { parameter: "BTM %", actual: 45, target: 50 },
  { parameter: "FTM %", actual: 55, target: 50 },
  { parameter: "Local (<100km)", actual: 35, target: 40 },
  { parameter: "Regional (<300km)", actual: 65, target: 60 },
];

// Portfolio match score data in different format for horizontal bar chart
const portfolioMatchScores = [
  { name: "Technology Mix", value: 92, fill: "#8884d8" },
  { name: "Location Distance", value: 88, fill: "#82ca9d" },
  { name: "Time Matching", value: 78, fill: "#ffc658" },
  { name: "Capacity Factor", value: 95, fill: "#0088fe" },
  { name: "Additionality", value: 70, fill: "#ff8042" },
];

// Time period options for reports
const timePeriods = [
  { label: "Last Month", value: "1m" },
  { label: "Last 3 Months", value: "3m" },
  { label: "Last 6 Months", value: "6m" },
  { label: "Last Year", value: "1y" },
];

const CorporateDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");

  // Function to handle downloading the chart as an image
  const downloadChart = (chartId: string, filename: string) => {
    const chartElement = document.getElementById(chartId);
    if (!chartElement) return;
    
    // This is a simplified example - in a real app you would use a library 
    // like html2canvas or dom-to-image to create an actual image
    console.log(`Downloading ${chartId} as ${filename}_${selectedPeriod}.png`);
    
    // Mock alert to show functionality
    alert(`Chart "${filename}" for period ${selectedPeriod} would be downloaded in a production environment.`);
  };

  // Function to download a full report
  const downloadFullReport = () => {
    console.log(`Downloading full report for period: ${selectedPeriod}`);
    alert(`Full report for period ${selectedPeriod} would be downloaded in a production environment.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Vestas Wind Systems A/S</p>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                {timePeriods.find(p => p.value === selectedPeriod)?.label || "Select Period"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {timePeriods.map((period) => (
                <DropdownMenuItem 
                  key={period.value} 
                  onClick={() => setSelectedPeriod(period.value)}
                >
                  {period.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={downloadFullReport} className="gap-2">
            <Download size={16} />
            Download Report
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Consumption</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245 GWh</div>
            <p className="text-xs text-muted-foreground">+2.5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates Coverage</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">225 GWh covered with GOs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matching Score</CardTitle>
            <Battery className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Temporal matching score</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Mix</CardTitle>
            <div className="flex items-center space-x-1">
              <Wind className="h-4 w-4 text-[#735DFF]" />
              <SunMedium className="h-4 w-4 text-[#D9F0C2]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">70% / 30%</div>
            <p className="text-xs text-muted-foreground">Wind / Solar split</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Time-Matching Scores (Last 6 Months)
            </CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadChart('time-matching-chart', 'time_matching')}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]" id="time-matching-chart">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={timeMatchingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" orientation="left" label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Score %', angle: 90, position: 'insideRight' }} domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="consumption" fill="#8884d8" name="Consumption (GWh)" />
                  <Bar yAxisId="left" dataKey="production" fill="#4DA167" name="Production (GWh)" />
                  <Line yAxisId="right" type="monotone" dataKey="score" stroke="#ff7300" name="Matching Score (%)" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Average Matching Score</h3>
                  <p className="text-muted-foreground text-sm">Last 6 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-500">78.7%</span>
                  <ArrowUp className="h-5 w-5 text-green-500" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Best Month</h3>
                  <p className="text-muted-foreground text-sm">June 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-500">89%</span>
                  <Check className="h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Energy Certificates</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadChart('certificates-chart', 'certificates')}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4" id="certificates-chart">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Wind Certificates</div>
                  <div className="text-sm text-muted-foreground">157.5 GWh</div>
                </div>
                <Progress value={70} className="mt-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Solar Certificates</div>
                  <div className="text-sm text-muted-foreground">67.5 GWh</div>
                </div>
                <Progress value={30} className="mt-2" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Total Coverage</div>
                  <div className="text-sm text-muted-foreground">225 GWh / 245 GWh</div>
                </div>
                <Progress value={92} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Consumption Profile</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadChart('consumption-profile-chart', 'consumption')}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]" id="consumption-profile-chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={consumptionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="hour" />
                  <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} MWh`, '']}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="weekday" name="Weekday" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  <Area type="monotone" dataKey="weekend" name="Weekend" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Allocation vs Target</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadChart('portfolio-allocation-chart', 'portfolio_allocation')}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]" id="portfolio-allocation-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={portfolioPerformanceData} layout="vertical" margin={{ top: 10, right: 30, left: 50, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="parameter" type="category" width={100} />
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="target" name="Target Allocation" fill="#8884d8" />
                  <Bar dataKey="actual" name="Actual Allocation" fill="#4DA167" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-medium">Portfolio Allocation Match</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your portfolio is achieving a 92% match to your desired allocation parameters.
                The largest deviation is in BTM assets (5% below target) and Regional assets (5% above target).
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Portfolio Match Scores</CardTitle>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadChart('portfolio-match-chart', 'portfolio_match')}
            >
              <Download size={16} className="mr-2" />
              Download
            </Button>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]" id="portfolio-match-chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={portfolioMatchScores}
                  margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    width={100}
                    tickLine={false}
                  />
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                  <Legend />
                  <Bar dataKey="value" name="Match Score (%)" radius={[0, 4, 4, 0]}>
                    {portfolioMatchScores.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-medium">Overall Portfolio Performance</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Your portfolio is performing well across most dimensions, with high scores in Capacity Factor (95%)
                and Technology Mix (92%). The area with the most room for improvement is Additionality (70%).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateDashboard;
