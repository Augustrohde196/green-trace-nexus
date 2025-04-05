
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const CorporateConsumption = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Energy Consumption</h2>
        <p className="text-muted-foreground">Monitor and analyze your energy consumption</p>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Data</TabsTrigger>
          <TabsTrigger value="daily">Daily Data</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Daily Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">671 MWh</div>
                <p className="text-xs text-muted-foreground">Based on last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Monthly Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">20.1 GWh</div>
                <p className="text-xs text-muted-foreground">For current month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Peak Demand</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32.4 MW</div>
                <p className="text-xs text-muted-foreground">Highest in last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">YTD Consumption</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">82.5 GWh</div>
                <p className="text-xs text-muted-foreground">+3.2% vs same period last year</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Consumption Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-muted-foreground">Consumption trend charts will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hourly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Consumption Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Hourly consumption data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Daily Consumption Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Daily consumption data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Consumption Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center">
                <p className="text-muted-foreground">Monthly consumption data will appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateConsumption;
