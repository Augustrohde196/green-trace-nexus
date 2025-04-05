
import { useState } from "react";
import { 
  BarChart3, 
  LineChart, 
  PieChart, 
  Calendar, 
  ArrowUpDown, 
  FileDown,
  Filter,
  Search,
  Info
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMockCustomers } from "@/hooks/use-mock-customers";
import { goService } from "@/services/go-service";
import { formatDate } from "@/lib/utils";

// Custom Chart component for hourly matching
const HourlyMatchingChart = () => {
  // Simulated data for hourly matching
  const hourlyData = Array.from({ length: 24 }).map((_, hour) => {
    // Sample production and consumption data
    const consumption = 50 + Math.random() * 50;
    const production = hour >= 8 && hour <= 18 
      ? 80 + Math.random() * 40 // Daytime: higher production
      : 20 + Math.random() * 30; // Nighttime: lower production
    
    return {
      hour: `${hour}:00`,
      consumption,
      production,
      match: Math.min(consumption, production) / Math.max(consumption, production) * 100
    };
  });

  return (
    <div className="h-80 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-medium">Hourly Matching Pattern</h3>
          <p className="text-sm text-muted-foreground">
            Production vs Consumption 24-hour profile
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-muted-foreground">Production</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs text-muted-foreground">Consumption</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {hourlyData.map((data) => (
          <div key={data.hour} className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs w-10">{data.hour}</span>
              <div className="flex-1 h-5 bg-muted rounded-sm overflow-hidden relative">
                <div 
                  className="absolute top-0 left-0 h-full bg-green-500 opacity-60"
                  style={{ width: `${data.production}%` }}
                ></div>
                <div 
                  className="absolute top-0 left-0 h-full bg-blue-500 opacity-60" 
                  style={{ width: `${data.consumption}%` }}
                ></div>
              </div>
              <span className="text-xs w-16 text-right">
                {Math.round(data.match)}% match
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Custom Chart component for portfolio mix
const PortfolioMixChart = ({ actual, target }) => {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Target Portfolio Mix</h4>
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          <div 
            className="bg-amber-400" 
            style={{ width: `${target.solar}%` }}
          ></div>
          <div 
            className="bg-sky-400" 
            style={{ width: `${target.wind}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-amber-400 mt-0.5"></div>
            <span>Solar ({target.solar}%)</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-sky-400 mt-0.5"></div>
            <span>Wind ({target.wind}%)</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-2">
        <h4 className="text-sm font-medium">Actual Portfolio Mix</h4>
        <div className="flex h-4 w-full overflow-hidden rounded-full">
          <div 
            className="bg-amber-400" 
            style={{ width: `${actual.solar}%` }}
          ></div>
          <div 
            className="bg-sky-400" 
            style={{ width: `${actual.wind}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-amber-400 mt-0.5"></div>
            <span>Solar ({actual.solar}%)</span>
          </div>
          <div className="flex space-x-1">
            <div className="h-2 w-2 rounded-full bg-sky-400 mt-0.5"></div>
            <span>Wind ({actual.wind}%)</span>
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <span className="text-sm font-medium mr-2">Portfolio Deviation:</span>
          <span className={
            Math.abs(target.solar - actual.solar) < 5 
              ? "text-green-500" 
              : Math.abs(target.solar - actual.solar) < 15 
                ? "text-amber-500" 
                : "text-red-500"
          }>
            {Math.abs(target.solar - actual.solar)}%
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 ml-1 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">
                  The deviation shows how far the actual portfolio mix is from the customer's requested mix.
                  Less than 5% is excellent, 5-15% is acceptable, above 15% needs improvement.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default function Analytics() {
  const { customers } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [selectedCustomer, setSelectedCustomer] = useState("all");

  // Get the GO data from services
  const gos = goService.getGuaranteesOfOrigin();
  const metrics = goService.getMetrics();
  
  // Calculate metrics for temporal matching
  const temporalMatchingCustomers = customers.map(customer => {
    // Get customer's GOs
    const customerGOs = goService.getGOsByCustomer(customer.id);
    
    // Calculate average matching score
    const avgScore = customerGOs.length > 0
      ? customerGOs.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / customerGOs.length
      : 0;

    // Generate simulated actual portfolio mix (based on allocated GOs)
    const solarGOs = customerGOs.filter(go => go.type === "solar").length;
    const windGOs = customerGOs.filter(go => go.type === "wind").length;
    const total = solarGOs + windGOs;
    
    const actualMix = {
      solar: total > 0 ? Math.round(solarGOs / total * 100) : 0,
      wind: total > 0 ? Math.round(windGOs / total * 100) : 0
    };

    return {
      ...customer,
      averageMatchingScore: avgScore,
      goCount: customerGOs.length,
      totalVolume: customerGOs.reduce((sum, go) => sum + go.volume, 0),
      actualPortfolioMix: actualMix,
      portfolioMixDeviation: Math.abs(customer.portfolioMix.solar - actualMix.solar)
    };
  });

  // Filter customers based on search
  const filteredCustomers = temporalMatchingCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const selectedCustomerData = selectedCustomer === "all" 
    ? temporalMatchingCustomers 
    : temporalMatchingCustomers.filter(c => c.id === selectedCustomer);
  
  // Calculate overall metrics
  const avgTemporalMatching = temporalMatchingCustomers.reduce(
    (sum, c) => sum + c.averageMatchingScore, 0
  ) / (temporalMatchingCustomers.length || 1);
  
  const avgPortfolioDeviation = temporalMatchingCustomers.reduce(
    (sum, c) => sum + c.portfolioMixDeviation, 0
  ) / (temporalMatchingCustomers.length || 1);
  
  // Get customer data for detail view
  const customerDetail = selectedCustomer !== "all" 
    ? temporalMatchingCustomers.find(c => c.id === selectedCustomer)
    : null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Analyze GO allocation performance and customer matching
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button 
            variant="outline"
            className="gap-2"
          >
            <Calendar size={16} />
            Select Period
          </Button>
          <Button 
            className="gap-2"
          >
            <FileDown size={16} />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temporal Matching Score
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgTemporalMatching)}%</div>
            <p className="text-xs text-muted-foreground">
              Average hourly matching between production and consumption
            </p>
            <div className="mt-3">
              <Progress value={avgTemporalMatching} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Mix Accuracy
            </CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{100 - Math.round(avgPortfolioDeviation)}%</div>
            <p className="text-xs text-muted-foreground">
              How well allocated GOs match customer's requested energy mix
            </p>
            <div className="mt-3">
              <Progress value={100 - avgPortfolioDeviation} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Allocated GOs
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.allocatedGOs}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.allocatedMWh.toLocaleString()} MWh of renewable energy allocated
            </p>
            <div className="mt-3">
              <Progress 
                value={(metrics.allocatedGOs / metrics.totalGOs) * 100} 
                className="h-2" 
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last Week</SelectItem>
            <SelectItem value="month">Last Month</SelectItem>
            <SelectItem value="quarter">Last Quarter</SelectItem>
            <SelectItem value="year">Last Year</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
          <SelectTrigger className="w-[220px]">
            <SelectValue placeholder="Select customer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Customers</SelectItem>
            {customers.map(customer => (
              <SelectItem key={customer.id} value={customer.id}>
                {customer.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="temporal">Temporal Matching</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio Mix</TabsTrigger>
          <TabsTrigger value="customers">Customer Details</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Temporal Matching Performance</CardTitle>
                <CardDescription>
                  How well production timing matches consumption patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HourlyMatchingChart />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Customer Portfolio Mix Adherence</CardTitle>
                <CardDescription>
                  How well allocated GOs match customers' requested energy mix
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedCustomerData.slice(0, 3).map(customer => (
                  <div key={customer.id} className="space-y-2">
                    <h3 className="text-sm font-medium">{customer.name}</h3>
                    <PortfolioMixChart 
                      actual={customer.actualPortfolioMix}
                      target={customer.portfolioMix}
                    />
                  </div>
                ))}
                
                {selectedCustomerData.length > 3 && (
                  <div className="text-center text-sm text-muted-foreground mt-4">
                    + {selectedCustomerData.length - 3} more customers
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Customer Performance Overview</CardTitle>
              <CardDescription>
                Summary of matching performance by customer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Allocated GOs</TableHead>
                    <TableHead>Volume (MWh)</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Temporal Matching
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Portfolio Accuracy
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.slice(0, 10).map((customer) => (
                    <TableRow 
                      key={customer.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.industry}</TableCell>
                      <TableCell>{customer.goCount}</TableCell>
                      <TableCell>{customer.totalVolume}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={
                            customer.averageMatchingScore >= 80 
                              ? "text-green-500" 
                              : customer.averageMatchingScore >= 50 
                                ? "text-amber-500" 
                                : "text-red-500"
                          }>
                            {Math.round(customer.averageMatchingScore)}%
                          </span>
                          <div className="ml-2 w-16">
                            <Progress 
                              value={customer.averageMatchingScore} 
                              className="h-1" 
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <span className={
                            customer.portfolioMixDeviation <= 5 
                              ? "text-green-500" 
                              : customer.portfolioMixDeviation <= 15 
                                ? "text-amber-500" 
                                : "text-red-500"
                          }>
                            {100 - customer.portfolioMixDeviation}%
                          </span>
                          <div className="ml-2 w-16">
                            <Progress 
                              value={100 - customer.portfolioMixDeviation} 
                              className="h-1" 
                            />
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Temporal Matching Tab */}
        <TabsContent value="temporal" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temporal Matching Analysis</CardTitle>
              <CardDescription>
                Detailed analysis of hourly production vs. consumption patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Temporal matching measures how well the timing of renewable energy production aligns with 
                  when customers actually consume electricity. A high score means production occurs at the 
                  same time as consumption, reducing the need for energy storage or grid balancing.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Solar Production Pattern</h3>
                    <div className="relative h-24 w-full bg-muted rounded-md overflow-hidden">
                      {/* Simplified solar curve */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end h-full">
                        {Array.from({ length: 24 }).map((_, hour) => {
                          let height = "10%";
                          if (hour >= 6 && hour < 8) height = "30%";
                          if (hour >= 8 && hour < 10) height = "60%";
                          if (hour >= 10 && hour < 15) height = "90%";
                          if (hour >= 15 && hour < 17) height = "60%";
                          if (hour >= 17 && hour < 19) height = "30%";
                          return (
                            <div 
                              key={hour}
                              className="flex-1 bg-amber-500 opacity-80 mx-px"
                              style={{ height }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Wind Production Pattern</h3>
                    <div className="relative h-24 w-full bg-muted rounded-md overflow-hidden">
                      {/* Simplified wind curve - more sporadic */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end h-full">
                        {Array.from({ length: 24 }).map((_, hour) => {
                          // Random but somewhat consistent wind pattern
                          const height = 30 + (Math.sin(hour / 3) * 25) + (Math.random() * 40);
                          return (
                            <div 
                              key={hour}
                              className="flex-1 bg-sky-500 opacity-80 mx-px"
                              style={{ height: `${height}%` }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:00</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Typical Consumption Pattern</h3>
                    <div className="relative h-24 w-full bg-muted rounded-md overflow-hidden">
                      {/* Simplified consumption curve - business hours peak */}
                      <div className="absolute bottom-0 left-0 right-0 flex items-end h-full">
                        {Array.from({ length: 24 }).map((_, hour) => {
                          let height = "20%";
                          if (hour >= 6 && hour < 8) height = "40%";
                          if (hour >= 8 && hour < 18) height = "80%";
                          if (hour >= 18 && hour < 22) height = "50%";
                          return (
                            <div 
                              key={hour}
                              className="flex-1 bg-blue-500 opacity-80 mx-px"
                              style={{ height }}
                            ></div>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>00:00</span>
                      <span>12:00</span>
                      <span>23:00</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Customer-Specific Matching</h3>
                <HourlyMatchingChart />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Matching Score Distribution</CardTitle>
              <CardDescription>
                How customers perform on temporal matching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Excellent (80-100%)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.averageMatchingScore >= 80).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.averageMatchingScore >= 80).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Good (60-79%)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.averageMatchingScore >= 60 && c.averageMatchingScore < 80).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.averageMatchingScore >= 60 && c.averageMatchingScore < 80).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average (40-59%)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.averageMatchingScore >= 40 && c.averageMatchingScore < 60).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.averageMatchingScore >= 40 && c.averageMatchingScore < 60).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Poor (0-39%)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.averageMatchingScore < 40).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.averageMatchingScore < 40).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Portfolio Mix Tab */}
        <TabsContent value="portfolio" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Mix Analysis</CardTitle>
              <CardDescription>
                How well allocated GOs match customers' requested energy mix
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Portfolio mix accuracy measures how closely we've matched each customer's requested 
                  energy source preferences (solar vs. wind). A high accuracy means we've allocated GOs 
                  that closely match what the customer has specified in their portfolio requirements.
                </p>
              </div>
              
              <div className="space-y-8">
                {selectedCustomerData.slice(0, 4).map(customer => (
                  <div key={customer.id} className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">{customer.name}</h3>
                    <PortfolioMixChart 
                      actual={customer.actualPortfolioMix}
                      target={customer.portfolioMix}
                    />
                  </div>
                ))}
              </div>
              
              {selectedCustomer === "all" && selectedCustomerData.length > 4 && (
                <div className="mt-4 text-center">
                  <Button variant="outline">
                    View All Customers
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Accuracy Distribution</CardTitle>
              <CardDescription>
                How customers perform on portfolio mix adherence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Excellent (≤5% deviation)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.portfolioMixDeviation <= 5).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.portfolioMixDeviation <= 5).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Good (6-10% deviation)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.portfolioMixDeviation > 5 && c.portfolioMixDeviation <= 10).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.portfolioMixDeviation > 5 && c.portfolioMixDeviation <= 10).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Average (11-15% deviation)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.portfolioMixDeviation > 10 && c.portfolioMixDeviation <= 15).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.portfolioMixDeviation > 10 && c.portfolioMixDeviation <= 15).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Poor (>15% deviation)</span>
                    <span className="font-medium">
                      {filteredCustomers.filter(c => c.portfolioMixDeviation > 15).length} customers
                    </span>
                  </div>
                  <Progress 
                    value={filteredCustomers.filter(c => c.portfolioMixDeviation > 15).length / filteredCustomers.length * 100} 
                    className="h-2 bg-muted" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Customer Details Tab */}
        <TabsContent value="customers" className="mt-6">
          {selectedCustomer === "all" ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Allocated GOs</TableHead>
                    <TableHead>Volume (MWh)</TableHead>
                    <TableHead>Request Mix (Solar/Wind)</TableHead>
                    <TableHead>Actual Mix (Solar/Wind)</TableHead>
                    <TableHead>Temporal Matching</TableHead>
                    <TableHead>Portfolio Accuracy</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow 
                      key={customer.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.industry}</TableCell>
                      <TableCell>{customer.goCount}</TableCell>
                      <TableCell>{customer.totalVolume}</TableCell>
                      <TableCell>{customer.portfolioMix.solar}% / {customer.portfolioMix.wind}%</TableCell>
                      <TableCell>{customer.actualPortfolioMix.solar}% / {customer.actualPortfolioMix.wind}%</TableCell>
                      <TableCell>
                        <span className={
                          customer.averageMatchingScore >= 80 
                            ? "text-green-500" 
                            : customer.averageMatchingScore >= 50 
                              ? "text-amber-500" 
                              : "text-red-500"
                        }>
                          {Math.round(customer.averageMatchingScore)}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className={
                          customer.portfolioMixDeviation <= 5 
                            ? "text-green-500" 
                            : customer.portfolioMixDeviation <= 15 
                              ? "text-amber-500" 
                              : "text-red-500"
                        }>
                          {100 - customer.portfolioMixDeviation}%
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            customerDetail && (
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{customerDetail.name}</CardTitle>
                    <CardDescription>
                      {customerDetail.industry} | {customerDetail.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Annual Consumption</p>
                        <p className="text-lg font-medium">{customerDetail.annualConsumption} GWh</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Allocated GOs</p>
                        <p className="text-lg font-medium">{customerDetail.goCount} ({customerDetail.totalVolume} MWh)</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Temporal Matching</p>
                        <p className="text-lg font-medium">{Math.round(customerDetail.averageMatchingScore)}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Portfolio Accuracy</p>
                        <p className="text-lg font-medium">{100 - customerDetail.portfolioMixDeviation}%</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-sm font-medium mb-3">Portfolio Mix</h3>
                      <PortfolioMixChart 
                        actual={customerDetail.actualPortfolioMix}
                        target={customerDetail.portfolioMix}
                      />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Allocated GOs</CardTitle>
                    <CardDescription>
                      List of Guarantees of Origin allocated to this customer
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Asset</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Volume</TableHead>
                            <TableHead>Match</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {goService.getGOsByCustomer(customerDetail.id).slice(0, 5).map((go) => (
                            <TableRow key={go.id}>
                              <TableCell className="font-medium">{go.assetName}</TableCell>
                              <TableCell>
                                <span className={go.type === "solar" ? "text-amber-500" : "text-sky-500"}>
                                  {go.type.charAt(0).toUpperCase() + go.type.slice(1)}
                                </span>
                              </TableCell>
                              <TableCell>{formatDate(go.productionTimestamp)}</TableCell>
                              <TableCell>{go.volume} MWh</TableCell>
                              <TableCell>
                                <span className={
                                  (go.allocationScore || 0) >= 80 
                                    ? "text-green-500" 
                                    : (go.allocationScore || 0) >= 50 
                                      ? "text-amber-500" 
                                      : "text-red-500"
                                }>
                                  {Math.round(go.allocationScore || 0)}%
                                </span>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    
                    {goService.getGOsByCustomer(customerDetail.id).length > 5 && (
                      <div className="text-center text-sm text-muted-foreground mt-4">
                        + {goService.getGOsByCustomer(customerDetail.id).length - 5} more GOs
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Hourly Matching Pattern</CardTitle>
                    <CardDescription>
                      24-hour production vs. consumption profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <HourlyMatchingChart />
                  </CardContent>
                </Card>
              </div>
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
