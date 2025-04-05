
import { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  Download, 
  Search,
  ChevronLeft,
  ChevronRight,
  FileText,
  Building,
  Euro,
  CreditCard,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useMockCustomers } from "@/hooks/use-mock-customers";

export default function Billing() {
  const { customers } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  
  // Calculate the first day of the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  
  // Calculate the last day of the selected month
  const lastDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth() + 1, 0);
  
  // Format the date range for display
  const dateRangeDisplay = `${format(firstDayOfMonth, "MMMM yyyy")}`;
  
  // Billing rate in DKK per MWh
  const RATE_PER_MWH = 20;

  // Function to handle going to the previous month
  const goToPreviousMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    setSelectedMonth(newDate);
  };

  // Function to handle going to the next month
  const goToNextMonth = () => {
    const newDate = new Date(selectedMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    setSelectedMonth(newDate);
  };

  // Mock single utility/trader
  const utility = {
    id: "ut1",
    name: "Energi Danmark A/S",
    country: "Denmark",
    invoiceNumber: `INV-ED-${format(firstDayOfMonth, "yyyyMM")}`,
    invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
    dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    paymentStatus: "pending"
  };
  
  // Assign all customers to this utility for the demo
  const utilityCustomers = customers;
  
  // Calculate monthly consumption and billing amount
  const monthlyConsumption = utilityCustomers.reduce((acc, customer) => acc + customer.annualConsumption / 12, 0);
  const billingAmount = monthlyConsumption * 1000 * RATE_PER_MWH; // Convert GWh to MWh for billing
  
  // Filter customers based on search query
  const filteredCustomers = utilityCustomers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate previous month stats for comparison
  const prevMonthConsumption = monthlyConsumption * 0.95; // 5% less for demo
  const prevMonthAmount = prevMonthConsumption * 1000 * RATE_PER_MWH;
  const monthlyChange = (monthlyConsumption - prevMonthConsumption) / prevMonthConsumption * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">
            Monthly billing for {utility.name}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => {}}
          >
            <Calendar size={16} />
            Select Period
          </Button>
          <Button 
            className="gap-2"
            onClick={() => {}}
          >
            <Download size={16} />
            Export Invoice
          </Button>
        </div>
      </div>

      {/* Date navigation controls */}
      <div className="flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-medium">{dateRangeDisplay}</h3>
        <Button variant="outline" size="icon" onClick={goToNextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Utility/Trader Invoice Details */}
      <Card className="border-primary/20">
        <CardHeader className="pb-2">
          <div className="flex justify-between">
            <CardTitle className="flex items-center gap-2">
              Invoice Details
              {utility.paymentStatus === "paid" ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : utility.paymentStatus === "overdue" ? (
                <AlertTriangle className="h-5 w-5 text-red-500" />
              ) : (
                <FileText className="h-5 w-5 text-yellow-500" />
              )}
            </CardTitle>
            <Badge
              variant="outline"
              className={
                utility.paymentStatus === "paid"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : utility.paymentStatus === "pending"
                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              }
            >
              {utility.paymentStatus === "paid"
                ? "Paid"
                : utility.paymentStatus === "pending"
                ? "Pending"
                : "Overdue"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div>
              <div className="text-sm text-muted-foreground">Utility/Trader</div>
              <div className="font-medium">{utility.name}</div>
              <div className="text-xs text-muted-foreground">{utility.country}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Invoice Number</div>
              <div className="font-medium">{utility.invoiceNumber}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Invoice Date</div>
              <div className="font-medium">{utility.invoiceDate}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Due Date</div>
              <div className="font-medium">{utility.dueDate}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Consumption
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyConsumption.toFixed(1)} GWh</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {monthlyChange >= 0 ? (
                <span className="text-green-500 flex items-center">
                  ↑ {monthlyChange.toFixed(1)}%
                </span>
              ) : (
                <span className="text-red-500 flex items-center">
                  ↓ {Math.abs(monthlyChange).toFixed(1)}%
                </span>
              )}
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Billed
            </CardTitle>
            <Euro className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DKK {billingAmount.toLocaleString("da-DK")}</div>
            <p className="text-xs text-muted-foreground">
              For {format(firstDayOfMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rate
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              DKK {RATE_PER_MWH}/MWh
            </div>
            <p className="text-xs text-muted-foreground">
              Standard GO allocation rate
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Corporate Customers
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {utilityCustomers.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Total customers served
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search for customers */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search customers..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Customer Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Volume (MWh)</TableHead>
                <TableHead className="text-right">Billing Amount (DKK)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map(customer => {
                const consumption = customer.annualConsumption / 12 * 1000; // Monthly in MWh
                const amount = consumption * RATE_PER_MWH;
                
                return (
                  <TableRow key={customer.id}>
                    <TableCell className="font-medium">{customer.name}</TableCell>
                    <TableCell>{customer.industry}</TableCell>
                    <TableCell>{customer.location}</TableCell>
                    <TableCell>{consumption.toFixed(0)}</TableCell>
                    <TableCell className="text-right">{amount.toLocaleString("da-DK")}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <p>
              Our billing model charges utilities and energy traders for the GO matching and allocation services
              we provide to their corporate customers. The standard rate is <span className="font-medium">DKK 20 per MWh</span> of 
              allocated renewable energy.
            </p>
            <p>
              This fee covers:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>AI-powered GO allocation and matching</li>
              <li>Temporal matching between production and consumption</li>
              <li>Portfolio mix optimization based on customer preferences</li>
              <li>GO tracking and verification services</li>
              <li>Customer-specific analytics and reporting</li>
            </ul>
            <p>
              Invoices are generated monthly based on the total volume of renewable energy
              allocated to corporate customers during the billing period.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
