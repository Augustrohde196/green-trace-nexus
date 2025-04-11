
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Building2, FileCheck, Wind, SunMedium, AlertTriangle, TrendingUp, ArrowUp, ArrowDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, Line, ComposedChart } from "recharts";

// Sample data for GO commitments and production projections
const projectedData = [
  { month: "Jan", commitments: 18, production: 15, shortfall: 3 },
  { month: "Feb", commitments: 20, production: 18, shortfall: 2 },
  { month: "Mar", commitments: 22, production: 25, surplus: 3 },
  { month: "Apr", commitments: 24, production: 22, shortfall: 2 },
  { month: "May", commitments: 25, production: 28, surplus: 3 },
  { month: "Jun", commitments: 28, production: 30, surplus: 2 },
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
              Projected GO Commitments & Production
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={projectedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="commitments" fill="#8884d8" name="GO Commitments" />
                  <Bar dataKey="production" fill="#4DA167" name="Projected Production" />
                  <Bar dataKey="shortfall" fill="#FF6B6B" name="Shortfall" stackId="stack" />
                  <Bar dataKey="surplus" fill="#4CAF50" name="Surplus" stackId="stack" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Upcoming Shortfall</h3>
                  <p className="text-muted-foreground text-sm">Next 3 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-red-500">7 GWh</span>
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Projected Surplus</h3>
                  <p className="text-muted-foreground text-sm">Next 6 months</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-green-500">8 GWh</span>
                  <ArrowUp className="h-5 w-5 text-green-500" />
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
            <div className="h-[200px] flex items-center justify-center">
              <p className="text-muted-foreground">Consumption charts will appear here</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CorporateDashboard;
