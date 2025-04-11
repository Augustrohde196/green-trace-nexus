
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Building2, FileCheck, Wind, SunMedium, AlertTriangle, TrendingUp, ArrowUp, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Line, ComposedChart, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";

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

// Portfolio match score data
const portfolioMatchScores = [
  { name: "Technology Mix", value: 92 },
  { name: "Location Distance", value: 88 },
  { name: "Time Matching", value: 78 },
  { name: "Capacity Factor", value: 95 },
  { name: "Additionality", value: 70 },
];

const CorporateDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Corporate Dashboard</h2>
        <p className="text-muted-foreground">Welcome back, Vestas Wind Systems A/S</p>
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
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Time-Matching Scores (Last 6 Months)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
          <CardHeader>
            <CardTitle>Energy Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
          <CardHeader>
            <CardTitle>Consumption Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
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
          <CardHeader>
            <CardTitle>Portfolio Allocation vs Target</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
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
          <CardHeader>
            <CardTitle>Portfolio Match Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={portfolioMatchScores}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="name" />
                  <PolarRadiusAxis domain={[0, 100]} />
                  <Radar name="Portfolio Match" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                  <Tooltip formatter={(value: number) => [`${value}%`, '']} />
                </RadarChart>
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
