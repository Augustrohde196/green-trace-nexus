
import { BarChart3, Wind, SunMedium, Users, LightbulbIcon, Battery, ExternalLink, UserPlus } from "lucide-react";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { ProductionChart } from "@/components/dashboard/production-chart";
import { EnergyMixChart } from "@/components/dashboard/energy-mix-chart";
import { AssetAllocation } from "@/components/dashboard/asset-allocation";
import { CustomersTable } from "@/components/dashboard/customers-table";
import { calculateDashboardMetrics, mockAssets, mockCustomers } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <AssetAllocation assets={mockAssets} />
        <CustomersTable customers={mockCustomers} />
      </div>
    </div>
  );
};

export default Dashboard;
