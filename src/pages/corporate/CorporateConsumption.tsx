
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  ComposedChart, 
  Line,
  ReferenceLine
} from "recharts";
import { Download, ZoomIn, ZoomOut, RefreshCw, Power, Info, BarChart3, Activity, Clock } from "lucide-react";
import { 
  generateConsumptionData, 
  aggregateToDaily, 
  aggregateToMonthly, 
  generateGOData, 
  formatTimestamp,
  ConsumptionDataPoint
} from "@/utils/consumption-data";
import { format } from "date-fns";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const CorporateConsumption = () => {
  // State for data
  const [hourlyData, setHourlyData] = useState<(ConsumptionDataPoint & { goValue?: number })[]>([]);
  const [dailyData, setDailyData] = useState<(ConsumptionDataPoint & { goValue?: number })[]>([]);
  const [monthlyData, setMonthlyData] = useState<(ConsumptionDataPoint & { goValue?: number })[]>([]);
  const [showGOs, setShowGOs] = useState(false);
  const [timeframe, setTimeframe] = useState("30");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();
  
  // Generate and prepare data
  const generateData = () => {
    setIsRefreshing(true);
    try {
      // Generate consumption data
      const rawConsumptionData = generateConsumptionData(parseInt(timeframe));
      
      // Generate GO data
      const rawGOData = generateGOData(rawConsumptionData);
      
      // Prepare hourly data with GO values
      const prepared = rawConsumptionData.map(point => {
        const matchingGO = rawGOData.find(go => go.timestamp === point.timestamp);
        return {
          ...point,
          goValue: matchingGO?.value || 0,
          timestamp: new Date(point.timestamp).toISOString(),
          hour: format(new Date(point.timestamp), 'HH:mm'),
          date: format(new Date(point.timestamp), 'MMM dd'),
          category: 'Consumption'
        };
      });
      
      setHourlyData(prepared);
      
      // Prepare daily data
      const dailyConsumption = aggregateToDaily(rawConsumptionData);
      const dailyGO = aggregateToDaily(rawGOData);
      const preparedDaily = dailyConsumption.map(point => {
        const matchingGO = dailyGO.find(go => go.timestamp === point.timestamp);
        return {
          ...point,
          goValue: matchingGO?.value || 0,
          date: format(new Date(point.timestamp), 'MMM dd')
        };
      });
      
      setDailyData(preparedDaily);
      
      // Prepare monthly data
      const monthlyConsumption = aggregateToMonthly(rawConsumptionData);
      const monthlyGO = aggregateToMonthly(rawGOData);
      const preparedMonthly = monthlyConsumption.map(point => {
        const matchingGO = monthlyGO.find(go => go.timestamp === point.timestamp);
        return {
          ...point,
          goValue: matchingGO?.value || 0,
          date: format(new Date(point.timestamp + "-01"), 'MMM yyyy')
        };
      });
      
      setMonthlyData(preparedMonthly);
      
      console.log("Data generated successfully:", {
        hourly: prepared.length,
        daily: preparedDaily.length,
        monthly: preparedMonthly.length
      });
    } catch (error) {
      console.error("Error generating data:", error);
      toast({
        title: "Error",
        description: "There was a problem loading consumption data",
        variant: "destructive"
      });
    }
    
    setTimeout(() => setIsRefreshing(false), 600);
  };
  
  // Initial data load
  useEffect(() => {
    generateData();
  }, [timeframe]);
  
  // Calculate total consumption and green coverage
  const totalConsumption = dailyData.reduce((sum, point) => sum + point.value, 0);
  const totalGOs = dailyData.reduce((sum, point) => sum + (point.goValue || 0), 0);
  const coveragePercentage = Math.round((totalGOs / totalConsumption) * 100);
  
  // Calculate time matching score (simplified example - in reality would be more complex)
  const timeMatchingScore = Math.round(coveragePercentage * 0.85);
  
  // Handle download
  const downloadCSV = (data: any[], prefix: string) => {
    try {
      // Create CSV content
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map(row => Object.values(row).join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `${prefix}_${timeframe}_days_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download complete",
        description: `${prefix} data has been downloaded successfully.`
      });
    } catch (error) {
      console.error("Error downloading data:", error);
      toast({
        title: "Download failed",
        description: "There was a problem downloading the data",
        variant: "destructive"
      });
    }
  };
  
  // Custom tooltip formatter for consumption chart
  const customTooltipFormatter = (value: any, name: string, props: any) => {
    if (name === "value") {
      return [`${value.toLocaleString()} MWh`, 'Consumption'];
    }
    if (name === "goValue") {
      return [`${value.toLocaleString()} MWh`, 'GO Production'];
    }
    return [value, name];
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Energy Consumption</h2>
          <p className="text-muted-foreground">Monitor and analyze your energy consumption</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">7 days</SelectItem>
              <SelectItem value="30">30 days</SelectItem>
              <SelectItem value="90">90 days</SelectItem>
              <SelectItem value="180">180 days</SelectItem>
              <SelectItem value="365">1 year</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={generateData}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="overflow-hidden border border-border/40 transition-colors hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Daily Average</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary transition-colors">
                <BarChart3 className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(totalConsumption / dailyData.length).toLocaleString()} MWh</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                Based on last {timeframe} days
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="overflow-hidden border border-border/40 transition-colors hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Consumption</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary transition-colors">
                <Power className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(totalConsumption / 1000).toFixed(1)} GWh</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                For selected period
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="overflow-hidden border border-border/40 transition-colors hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Peak Demand</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary transition-colors">
                <Activity className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.max(...hourlyData.map(h => h.value)).toLocaleString()} MWh
              </div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                Highest in selected period
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="overflow-hidden border border-border/40 transition-colors hover:border-primary/30">
            <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Time Matching Score</CardTitle>
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary transition-colors">
                <Clock className="h-5 w-5" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{timeMatchingScore}%</div>
              <div className="text-xs text-muted-foreground mt-1 flex items-center">
                {timeMatchingScore >= 80 ? "Excellent time matching" : timeMatchingScore >= 60 ? "Good time matching" : "Needs improvement"}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Card>
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <div>
            <CardTitle>Consumption Overview</CardTitle>
            <CardDescription>Energy consumption with optional GO overlay</CardDescription>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-gos" 
                checked={showGOs} 
                onCheckedChange={setShowGOs}
              />
              <Label htmlFor="show-gos" className="flex items-center gap-1">
                <span>Show GOs</span>
                <TooltipProvider>
                  <UITooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Shows renewable energy (GO) production overlaid with consumption to
                        visualize green energy coverage.
                      </p>
                    </TooltipContent>
                  </UITooltip>
                </TooltipProvider>
              </Label>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => downloadCSV(dailyData, 'consumption_data')}
              className="ml-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Data
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'MWh', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  formatter={customTooltipFormatter}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  fill="#8884d8" 
                  stroke="#8884d8" 
                  fillOpacity={0.3} 
                  name="Consumption"
                  yAxisId="left"
                />
                {showGOs && (
                  <Line 
                    type="monotone" 
                    dataKey="goValue" 
                    stroke="#4DA167" 
                    strokeWidth={2}
                    name="GO Production"
                    yAxisId="left"
                    dot={{ r: 0 }}
                    activeDot={{ r: 4 }}
                  />
                )}
                {showGOs && (
                  <ReferenceLine 
                    y={0} 
                    stroke="#000" 
                    strokeWidth={1}
                    yAxisId="left"
                  />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Data</TabsTrigger>
          <TabsTrigger value="daily">Daily Data</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Consumption Pattern</CardTitle>
              <CardDescription>Average consumption by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={Array.from({ length: 24 }, (_, hour) => {
                      // Calculate average for this hour across all days
                      const hourPoints = hourlyData.filter(p => new Date(p.timestamp).getHours() === hour);
                      const avgConsumption = hourPoints.length > 0 
                        ? hourPoints.reduce((sum, p) => sum + p.value, 0) / hourPoints.length 
                        : 0;
                      
                      const avgGO = hourPoints.length > 0 && showGOs
                        ? hourPoints.reduce((sum, p) => sum + (p.goValue || 0), 0) / hourPoints.length
                        : 0;
                        
                      return {
                        hour: `${hour}:00`,
                        consumption: Math.round(avgConsumption),
                        go: Math.round(avgGO)
                      };
                    })}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="hour" />
                    <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number) => [`${value.toLocaleString()} MWh`, 'Avg. Consumption']} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="consumption" 
                      name="Avg. Consumption" 
                      fill="#8884d8" 
                    />
                    {showGOs && (
                      <Bar 
                        dataKey="go" 
                        name="Avg. GO Production" 
                        fill="#4DA167"
                      />
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>This chart shows the average consumption pattern by hour of day across the selected period.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="hourly" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Hourly Consumption Data</CardTitle>
                <CardDescription>Last 48 hours detail view</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => downloadCSV(hourlyData.slice(0, 48), 'hourly_consumption')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Hourly Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart 
                    data={hourlyData.slice(-48).map(d => ({
                      ...d,
                      hour: format(new Date(d.timestamp), 'MM/dd HH:00')
                    }))}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="hour" 
                      tick={{ fontSize: 10 }} 
                      interval={2}
                    />
                    <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === "value") return [`${value.toLocaleString()} MWh`, 'Consumption'];
                        if (name === "goValue") return [`${value.toLocaleString()} MWh`, 'GO Production'];
                        return [value, name];
                      }}
                      labelFormatter={(label) => `Time: ${label}`}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Consumption" 
                      fill="#8884d8" 
                      barSize={20}
                    />
                    {showGOs && (
                      <Line 
                        type="monotone" 
                        dataKey="goValue" 
                        stroke="#4DA167" 
                        name="GO Production" 
                        strokeWidth={2}
                        dot={false}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="daily" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Daily Consumption Data</CardTitle>
                <CardDescription>Consumption aggregated by day</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => downloadCSV(dailyData, 'daily_consumption')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Daily Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                      interval="preserveStartEnd"
                    />
                    <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === "value") return [`${value.toLocaleString()} MWh`, 'Consumption'];
                        if (name === "goValue") return [`${value.toLocaleString()} MWh`, 'GO Production'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Consumption" 
                      fill="#8884d8" 
                      barSize={timeframe === "7" ? 30 : timeframe === "30" ? 15 : 8}
                    />
                    {showGOs && (
                      <Line 
                        type="monotone" 
                        dataKey="goValue" 
                        stroke="#4DA167" 
                        name="GO Production" 
                        strokeWidth={2}
                        dot={timeframe === "7"}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Monthly Consumption Data</CardTitle>
                <CardDescription>Consumption aggregated by month</CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => downloadCSV(monthlyData, 'monthly_consumption')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Monthly Data
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis label={{ value: 'MWh', angle: -90, position: 'insideLeft' }} />
                    <Tooltip 
                      formatter={(value: number, name: string) => {
                        if (name === "value") return [`${value.toLocaleString()} MWh`, 'Consumption'];
                        if (name === "goValue") return [`${value.toLocaleString()} MWh`, 'GO Production'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="value" 
                      name="Consumption" 
                      fill="#8884d8" 
                      barSize={50}
                    />
                    {showGOs && (
                      <Bar 
                        dataKey="goValue" 
                        name="GO Production" 
                        fill="#4DA167" 
                        barSize={25}
                      />
                    )}
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CorporateConsumption;
