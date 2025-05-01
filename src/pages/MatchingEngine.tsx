import { useState, useEffect } from "react";
import { Zap, PieChart, Calendar, Download, AlertTriangle, Info, Check, CheckCircle2, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { matchingEngineService } from "@/services/matching-engine-service";
import { goService } from "@/services/go-service";
import { mockCustomers } from "@/data/mock-data";
import { AllocationPrediction } from "@/data/go-models";
import { toast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

// Chart component imports from recharts
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts";

export default function GOAllocation() {
  const [metrics, setMetrics] = useState(goService.getMetrics());
  const [view, setView] = useState<"overview" | "customers">("overview");
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("month");
  
  // Mock allocation data for charts
  const allocationData = [
    { month: "Jan", production: 680, allocated: 650, shortfall: 30 },
    { month: "Feb", production: 720, allocated: 700, shortfall: 20 },
    { month: "Mar", production: 800, allocated: 800, shortfall: 0 },
    { month: "Apr", production: 850, allocated: 830, shortfall: 0, excess: 20 },
    { month: "May", production: 920, allocated: 880, shortfall: 0, excess: 40 },
  ];
  
  // Mock customer allocation data
  const customerAllocations = mockCustomers.map(customer => ({
    id: customer.id,
    name: customer.name,
    allocation: Math.round(customer.annualConsumption * 83.33), // Monthly allocation in MWh
    percentOfTotal: Math.round((customer.annualConsumption / mockCustomers.reduce((acc, c) => acc + c.annualConsumption, 0)) * 100),
    matchingScore: customer.matchingScore,
    traderSource: customer.id === "c3" || customer.id === "c5" ? Math.round(customer.annualConsumption * 0.2 * 83.33) : 0, // 20% from trader for some customers
  }));

  return (
    <div className="space-y-6 bg-background">
      <motion.div 
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">GO Allocation</h2>
          <p className="text-muted-foreground">
            AI-powered GO allocation between assets and corporate customers
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar size={16} />
            Select Period
          </Button>
          <Button className="gap-2">
            <Download size={16} />
            Export Report
          </Button>
        </div>
      </motion.div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Total GOs
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Zap size={18} className="text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">{metrics.totalGOs}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.totalMWh} MWh of renewable energy
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Allocated GOs
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">{metrics.allocatedGOs}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.allocatedMWh} MWh allocated to customers
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Available GOs
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <ArrowRight size={18} className="text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">{metrics.availableGOs}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {metrics.availableMWh} MWh available for allocation
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Card className="overflow-hidden group hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium">
                Average Match Score
              </CardTitle>
              <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <PieChart size={18} className="text-purple-600 dark:text-purple-400" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-2xl font-bold">{Math.round(metrics.averageMatchingScore)}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                Temporal matching between production and consumption
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="flex justify-between items-center">
        <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as "overview" | "customers")}>
          <ToggleGroupItem value="overview" aria-label="Toggle overview">
            Allocation Overview
          </ToggleGroupItem>
          <ToggleGroupItem value="customers" aria-label="Toggle customers">
            Customer Breakdown
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Allocation Overview */}
      {view === "overview" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Production & Allocation</CardTitle>
                <CardDescription>
                  Monthly analysis of renewable energy production vs. customer allocation
                </CardDescription>
              </div>
              <div>
                <ToggleGroup type="single" value={timeRange} onValueChange={(value) => value && setTimeRange(value as "week" | "month" | "year")}>
                  <ToggleGroupItem value="week" aria-label="View weekly data">
                    Week
                  </ToggleGroupItem>
                  <ToggleGroupItem value="month" aria-label="View monthly data">
                    Month
                  </ToggleGroupItem>
                  <ToggleGroupItem value="year" aria-label="View yearly data">
                    Year
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={allocationData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                    barGap={0}
                    barSize={20}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis unit=" MWh" />
                    <RechartsTooltip 
                      formatter={(value: number, name: string) => {
                        const formattedName = name === 'production' ? 'Production' : 
                                            name === 'allocated' ? 'Allocated' : 
                                            name === 'shortfall' ? 'Shortfall' : 'Excess';
                        return [`${value} MWh`, formattedName];
                      }}
                    />
                    <Legend />
                    <Bar dataKey="production" name="Production" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="allocated" name="Allocated" fill="#22C55E" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="shortfall" name="Shortfall" fill="#EF4444" radius={[4, 4, 0, 0]} stackId="allocation" />
                    <Bar dataKey="excess" name="Excess" fill="#F59E0B" radius={[4, 4, 0, 0]} stackId="allocation" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              {/* Shortfall/Excess Indicators */}
              <div className="mt-6 space-y-4">
                {allocationData[allocationData.length - 1].shortfall > 0 && (
                  <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300 rounded-md">
                    <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Shortfall Alert</p>
                      <p className="text-sm">{allocationData[allocationData.length - 1].shortfall} MWh of customer consumption went unfulfilled due to lack of supply.</p>
                    </div>
                  </div>
                )}
                
                {allocationData[allocationData.length - 1].excess && (
                  <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300 rounded-md">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Excess Supply</p>
                      <p className="text-sm">{allocationData[allocationData.length - 1].excess} MWh of renewable energy was not allocated (excess).</p>
                    </div>
                  </div>
                )}
                
                <TooltipProvider>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Certificate Retirement Notice</p>
                      <p className="text-sm">Allocated GOs need to be formally cancelled/retired in the official registry. 
                        <Tooltip>
                          <TooltipTrigger className="underline ml-1 cursor-help">Learn more</TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>Renuw marks GOs as internally retired in its ledger, but the utility/trader must execute the actual retirement in Energinet or the relevant registry.</p>
                          </TooltipContent>
                        </Tooltip>
                      </p>
                    </div>
                  </div>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Customer Breakdown */}
      {view === "customers" && (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Allocation By Customer</CardTitle>
                <CardDescription>Proportion of total allocation by customer</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie 
                        data={customerAllocations.map(c => ({name: c.name, value: c.allocation}))} 
                        dataKey="value"
                        cx="50%" 
                        cy="50%" 
                        outerRadius={80} 
                        fill="#8884d8" 
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      />
                      <RechartsTooltip />
                      <Legend />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Customer Allocation</CardTitle>
                <CardDescription>Detailed breakdown of customer allocations for the current period</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Allocation (MWh)</TableHead>
                      <TableHead>% of Total</TableHead>
                      <TableHead>Matching Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerAllocations.map((customer) => (
                      <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>
                          {customer.allocation}
                          {customer.traderSource > 0 && (
                            <div className="text-xs text-muted-foreground">
                              (incl. {customer.traderSource} MWh from Trader GOs)
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{customer.percentOfTotal}%</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={customer.matchingScore} className="h-2 w-16" />
                            <span className="text-sm">{customer.matchingScore}%</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      )}
    </div>
  );
}
