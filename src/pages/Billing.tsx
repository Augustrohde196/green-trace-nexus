
import { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  Download, 
  Filter, 
  Receipt, 
  Search,
  ChevronLeft,
  ChevronRight
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useMockCustomers } from "@/hooks/use-mock-customers";

export default function Billing() {
  const { customers } = useMockCustomers();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState("all");
  
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

  // Calculate billing for each customer
  const customerBillings = customers.map(customer => {
    // Calculate monthly consumption (simplified for this demo: yearly / 12)
    const monthlyConsumption = customer.annualConsumption / 12;
    
    // Calculate billing amount
    const billingAmount = monthlyConsumption * 1000 * RATE_PER_MWH; // Convert GWh to MWh
    
    // Randomly assign a payment status for demo purposes
    const statuses = ["paid", "pending", "overdue"];
    const paymentStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      ...customer,
      monthlyConsumption,
      billingAmount,
      paymentStatus,
      invoiceDate: format(firstDayOfMonth, "yyyy-MM-dd"),
      dueDate: format(new Date(firstDayOfMonth.getTime() + 30 * 24 * 60 * 60 * 1000), "yyyy-MM-dd")
    };
  });

  // Filter the billings based on search query and status filter
  const filteredBillings = customerBillings.filter(billing => {
    const matchesSearch = billing.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (filterStatus === "all") return matchesSearch;
    return matchesSearch && billing.paymentStatus === filterStatus;
  });

  // Calculate totals
  const totalConsumption = customerBillings.reduce((sum, billing) => sum + billing.monthlyConsumption, 0);
  const totalBilled = customerBillings.reduce((sum, billing) => sum + billing.billingAmount, 0);
  const totalPaid = customerBillings
    .filter(billing => billing.paymentStatus === "paid")
    .reduce((sum, billing) => sum + billing.billingAmount, 0);
  const totalPending = customerBillings
    .filter(billing => billing.paymentStatus === "pending")
    .reduce((sum, billing) => sum + billing.billingAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">
            Manage billing for corporate customers based on GO consumption
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
            Export Data
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

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Consumption
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalConsumption.toFixed(1)} GWh</div>
            <p className="text-xs text-muted-foreground">
              {(totalConsumption * 1000).toFixed(0)} MWh
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Billed
            </CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">DKK {totalBilled.toLocaleString("da-DK")}</div>
            <p className="text-xs text-muted-foreground">
              For {format(firstDayOfMonth, "MMMM yyyy")}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Paid
            </CardTitle>
            <Receipt className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              DKK {totalPaid.toLocaleString("da-DK")}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalPaid / totalBilled) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending
            </CardTitle>
            <Receipt className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              DKK {totalPending.toLocaleString("da-DK")}
            </div>
            <p className="text-xs text-muted-foreground">
              {((totalPending / totalBilled) * 100).toFixed(1)}% of total
            </p>
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
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Billing table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Consumption (MWh)</TableHead>
              <TableHead>Rate (DKK/MWh)</TableHead>
              <TableHead className="text-right">Amount (DKK)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBillings.map((billing) => (
              <TableRow key={billing.id}>
                <TableCell className="font-medium">{billing.name}</TableCell>
                <TableCell>{billing.invoiceDate}</TableCell>
                <TableCell>{billing.dueDate}</TableCell>
                <TableCell>{(billing.monthlyConsumption * 1000).toFixed(0)}</TableCell>
                <TableCell>{RATE_PER_MWH}</TableCell>
                <TableCell className="text-right">{billing.billingAmount.toLocaleString("da-DK")}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      billing.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : billing.paymentStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                        : "bg-red-100 text-red-800 hover:bg-red-100"
                    }
                  >
                    {billing.paymentStatus === "paid"
                      ? "Paid"
                      : billing.paymentStatus === "pending"
                      ? "Pending"
                      : "Overdue"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
