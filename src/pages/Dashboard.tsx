
import { BarChart3, Wind, SunMedium, Users, LightbulbIcon, Battery, ExternalLink, UserPlus, AlertTriangle, ArrowUp } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EnergyMixChart } from "@/components/dashboard/energy-mix-chart";
import { AssetAllocation } from "@/components/dashboard/asset-allocation";
import { CustomersTable } from "@/components/dashboard/customers-table";
import { calculateDashboardMetrics, mockAssets, mockCustomers } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ComposedChart } from "recharts";

// Sample data for GO commitments and production projections for the utility
const projectedData = [
  { month: "Jun", commitments: 28, production: 30, surplus: 2 },
  { month: "Jul", commitments: 32, production: 29, shortfall: 3 },
  { month: "Aug", commitments: 35, production: 33, shortfall: 2 },
  { month: "Sep", commitments: 30, production: 28, shortfall: 2 },
  { month: "Oct", commitments: 25, production: 28, surplus: 3 },
  { month: "Nov", commitments: 22, production: 20, shortfall: 2 },
];

const Dashboard = () => {
  // In a real app, we would fetch this data from a server
  const metrics = calculateDashboardMetrics();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Manage your Guarantees of Origin portfolio and customers</p>
        </div>
        <div className="flex gap-2">
          <Link to="/corporate/onboarding">
            <Button variant="outline" className="gap-2">
              <UserPlus size={16} />
              Add New Customer
            </Button>
          </Link>
          <Link to="/corporate">
            <Button className="gap-2">
              <ExternalLink size={16} />
              Corporate Portal
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total Capacity"
          value={`${metrics.totalCapacity} MW`}
          description={`${metrics.totalAssets} assets in portfolio`}
          icon={BarChart3}
        />
        <DashboardCard
          title="Total Production"
          value={`${metrics.totalProduction} GWh`}
          description="Annual renewable energy production"
          icon={LightbulbIcon}
        />
        <DashboardCard
          title="Available Capacity"
          value={`${metrics.availableCapacity} MW`}
          description={`${Math.round((metrics.availableCapacity / metrics.totalCapacity) * 100)}% of total capacity`}
          icon={Battery}
        />
        <DashboardCard
          title="Corporate Customers"
          value={metrics.totalCustomers}
          description={`${Math.round(metrics.averageMatchingScore)}% avg. matching score`}
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <ProductionChart data={metrics.recentProduction} />
        <EnergyMixChart data={metrics.productionByType} />
      </div>

      {/* New section for GO commitments and surplus/shortfall projections */}
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Projected GO Commitments & Production (Next 6 Months)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={projectedData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis label={{ value: 'GWh', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Bar dataKey="commitments" fill="#8884d8" name="Customer GO Commitments" />
                <Bar dataKey="production" fill="#4DA167" name="Projected Production" />
                <Bar dataKey="shortfall" fill="#FF6B6B" name="Shortfall" stackId="stack" />
                <Bar dataKey="surplus" fill="#4CAF50" name="Surplus" stackId="stack" />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Projected Shortfall</h3>
                <p className="text-muted-foreground text-sm">Next 6 months</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-red-500">7 GWh</span>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Sourcing Recommendations</h3>
                <p className="text-muted-foreground text-sm">Based on market analysis</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-green-500">5 assets</span>
                <ArrowUp className="h-5 w-5 text-green-500" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <AssetAllocation assets={mockAssets} />
        <CustomersTable customers={mockCustomers} />
      </div>
    </div>
  );
};

export default Dashboard;
