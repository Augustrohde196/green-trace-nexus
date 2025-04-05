
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Building2, FileCheck, Wind, SunMedium } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
