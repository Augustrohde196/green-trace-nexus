
import { useState } from "react";
import { 
  BarChart3, 
  PieChart, 
  FileDown,
  Search,
  SortAsc,
  SortDesc,
  Info 
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Badge } from "@/components/ui/badge";
import { useMockCustomers } from "@/hooks/use-mock-customers";
import { goService } from "@/services/go-service";
import { formatDate } from "@/lib/utils";

// Custom Chart component for portfolio mix
const PortfolioMixChart = ({ actual, target }) => {
  return (
    <div className="space-y-2">
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
          <span>Solar {actual.solar}%</span>
        </div>
        <div className="flex space-x-1">
          <div className="h-2 w-2 rounded-full bg-sky-400 mt-0.5"></div>
          <span>Wind {actual.wind}%</span>
        </div>
      </div>
      <div className="text-xs text-muted-foreground">
        Target: {target.solar}% Solar / {target.wind}% Wind
      </div>
    </div>
  );
};

export default function Analytics() {
  const { customers } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");

  // Get the GO data from services
  const gos = goService.getGuaranteesOfOrigin();
  const metrics = goService.getMetrics();
  
  // Calculate metrics for customers
  const customersWithMetrics = customers.map(customer => {
    // Get customer's GOs
    const customerGOs = goService.getGOsByCustomer(customer.id);
    
    // Calculate average matching score
    const avgScore = customerGOs.length > 0
      ? customerGOs.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / customerGOs.length
      : 0;

    // Generate actual portfolio mix (based on allocated GOs)
    const solarGOs = customerGOs.filter(go => go.type === "solar").length;
    const windGOs = customerGOs.filter(go => go.type === "wind").length;
    const total = solarGOs + windGOs;
    
    const actualMix = {
      solar: total > 0 ? Math.round(solarGOs / total * 100) : 0,
      wind: total > 0 ? Math.round(windGOs / total * 100) : 0
    };

    // Calculate portfolio accuracy (100 - deviation)
    const portfolioDeviation = Math.abs(customer.portfolioMix.solar - actualMix.solar);
    const portfolioAccuracy = 100 - portfolioDeviation;

    return {
      ...customer,
      timeMatchingScore: Math.round(avgScore),
      goCount: customerGOs.length,
      totalVolume: customerGOs.reduce((sum, go) => sum + go.volume, 0),
      actualPortfolioMix: actualMix,
      portfolioAccuracy
    };
  });

  // Filter customers based on search
  const filteredCustomers = customersWithMetrics.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "industry":
        comparison = a.industry.localeCompare(b.industry);
        break;
      case "consumption":
        comparison = a.annualConsumption - b.annualConsumption;
        break;
      case "timeMatching":
        comparison = a.timeMatchingScore - b.timeMatchingScore;
        break;
      case "portfolioAccuracy":
        comparison = a.portfolioAccuracy - b.portfolioAccuracy;
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  // Get customer data for detail view
  const customerDetail = selectedCustomer !== "all" 
    ? customersWithMetrics.find(c => c.id === selectedCustomer)
    : null;
  
  // Calculate overall metrics
  const avgTimeMatching = customersWithMetrics.reduce(
    (sum, c) => sum + c.timeMatchingScore, 0
  ) / (customersWithMetrics.length || 1);
  
  const avgPortfolioAccuracy = customersWithMetrics.reduce(
    (sum, c) => sum + c.portfolioAccuracy, 0
  ) / (customersWithMetrics.length || 1);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Helper to render sort indicator
  const renderSortIndicator = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? 
      <SortAsc className="h-4 w-4 ml-1" /> : 
      <SortDesc className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Performance analysis of GO allocations across corporate customers
          </p>
        </div>
        <Button 
          className="gap-2 w-fit"
          onClick={() => alert("Export functionality would be implemented here")}
        >
          <FileDown size={16} />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Time Matching Score
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(avgTimeMatching)}%</div>
            <p className="text-xs text-muted-foreground">
              Average hourly matching between production and consumption
            </p>
            <div className="mt-3">
              <Progress value={avgTimeMatching} className="h-2" />
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
            <div className="text-2xl font-bold">{Math.round(avgPortfolioAccuracy)}%</div>
            <p className="text-xs text-muted-foreground">
              How well allocated GOs match customer's requested energy mix
            </p>
            <div className="mt-3">
              <Progress value={avgPortfolioAccuracy} className="h-2" />
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

      {selectedCustomer === "all" ? (
        <Card>
          <CardHeader>
            <CardTitle>Corporate Customer Performance</CardTitle>
            <CardDescription>
              Overview of matching performance by customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    <div className="flex items-center">
                      Customer
                      {renderSortIndicator("name")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("industry")}
                  >
                    <div className="flex items-center">
                      Industry
                      {renderSortIndicator("industry")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("consumption")}
                  >
                    <div className="flex items-center">
                      Consumption (GWh)
                      {renderSortIndicator("consumption")}
                    </div>
                  </TableHead>
                  <TableHead>
                    Portfolio Mix
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("timeMatching")}
                  >
                    <div className="flex items-center">
                      Time Matching
                      {renderSortIndicator("timeMatching")}
                    </div>
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer"
                    onClick={() => handleSort("portfolioAccuracy")}
                  >
                    <div className="flex items-center">
                      Portfolio Accuracy
                      {renderSortIndicator("portfolioAccuracy")}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedCustomers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No customers found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedCustomers.map((customer) => (
                    <TableRow 
                      key={customer.id}
                      className="cursor-pointer hover:bg-accent/50"
                      onClick={() => setSelectedCustomer(customer.id)}
                    >
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.industry}</TableCell>
                      <TableCell>{customer.annualConsumption}</TableCell>
                      <TableCell className="min-w-[200px]">
                        <PortfolioMixChart 
                          actual={customer.actualPortfolioMix}
                          target={customer.portfolioMix}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={getScoreBadgeVariant(customer.timeMatchingScore)}>
                            {customer.timeMatchingScore}%
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">
                                  Time matching score indicates how well production timing aligns with consumption patterns.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={getScoreBadgeVariant(customer.portfolioAccuracy)}>
                            {customer.portfolioAccuracy}%
                          </Badge>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-xs max-w-xs">
                                  Portfolio accuracy measures how closely allocated GOs match the customer's requested energy mix.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
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
                    <p className="text-sm text-muted-foreground">Time Matching Score</p>
                    <p className="text-lg font-medium flex items-center">
                      <Badge variant={getScoreBadgeVariant(customerDetail.timeMatchingScore)} className="mr-2">
                        {customerDetail.timeMatchingScore}%
                      </Badge>
                      {getScoreLabel(customerDetail.timeMatchingScore)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Portfolio Accuracy</p>
                    <p className="text-lg font-medium flex items-center">
                      <Badge variant={getScoreBadgeVariant(customerDetail.portfolioAccuracy)} className="mr-2">
                        {customerDetail.portfolioAccuracy}%
                      </Badge>
                      {getScoreLabel(customerDetail.portfolioAccuracy)}
                    </p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium mb-3">Portfolio Mix</h3>
                  <PortfolioMixChart 
                    actual={customerDetail.actualPortfolioMix}
                    target={customerDetail.portfolioMix}
                  />
                  <p className="text-sm mt-2">
                    <strong>Mix Deviation:</strong> {Math.abs(customerDetail.portfolioMix.solar - customerDetail.actualPortfolioMix.solar)}%
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Allocated GOs</CardTitle>
                <CardDescription>
                  Guarantees of Origin allocated to this customer
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
                        <TableHead>Match</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {goService.getGOsByCustomer(customerDetail.id).slice(0, 5).map((go) => (
                        <TableRow key={go.id}>
                          <TableCell className="font-medium">{go.assetName}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              go.type === "solar" 
                                ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
                                : "bg-sky-500/10 text-sky-500 border-sky-500/20"
                            }>
                              {go.type.charAt(0).toUpperCase() + go.type.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(go.productionTimestamp)}</TableCell>
                          <TableCell>
                            <Badge variant={getScoreBadgeVariant(go.allocationScore || 0)}>
                              {Math.round(go.allocationScore || 0)}%
                            </Badge>
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
          </div>
        )
      )}
    </div>
  );
}

function getScoreBadgeVariant(score: number): "default" | "destructive" | "outline" | "secondary" {
  if (score >= 80) return "default";
  if (score >= 60) return "secondary";
  if (score >= 40) return "outline";
  return "destructive";
}

function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Poor";
}
