
import { useState } from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  Download, 
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Receipt,
  BarChart,
  FileText,
  Clock,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

export default function Billing() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [showContractModal, setShowContractModal] = useState(false);
  const [showDatePickerPopover, setShowDatePickerPopover] = useState(false);
  const [usageProgressValue, setUsageProgressValue] = useState(0);
  
  // Calculate the first day of the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  
  // Format the date range for display
  const dateRangeDisplay = `${format(firstDayOfMonth, "MMMM yyyy")}`;
  
  // Mock billing data
  const billingData = {
    subscriptionTier: "Enterprise",
    pricePerMWh: 20, // DKK per MWh
    commission: 5, // Percentage
    monthlyUsage: 3650, // MWh
    estimatedCost: 3650 * 20, // MWh * price
    billingFrequency: "Monthly",
    lastInvoice: {
      number: "INV-2025-04",
      amount: 70000,
      date: "2025-04-01",
      status: "Paid"
    }
  };
  
  // Usage history data for chart
  const usageHistory = [
    { month: "Jan", usage: 3200 },
    { month: "Feb", usage: 3400 },
    { month: "Mar", usage: 3500 },
    { month: "Apr", usage: 3650 },
    { month: "May", usage: 3800, projected: true }
  ];

  const maxUsage = Math.max(...usageHistory.map(item => item.usage));
  
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

  // Function to download invoice
  const downloadInvoice = () => {
    // In a real app, this would generate and download a PDF
    alert("Invoice PDF downloaded successfully");
  };

  // Animate progress bar on page load
  useState(() => {
    setTimeout(() => {
      setUsageProgressValue(80);
    }, 300);
  });

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
          <p className="text-muted-foreground">
            Platform usage, pricing terms, and monthly billing estimate
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Popover open={showDatePickerPopover} onOpenChange={setShowDatePickerPopover}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline"
                className="gap-2"
              >
                <Calendar size={16} />
                Select Period
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <CalendarComponent
                mode="single"
                selected={selectedMonth}
                onSelect={(date) => {
                  if (date) {
                    setSelectedMonth(date);
                    setShowDatePickerPopover(false);
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button 
            className="gap-2"
            onClick={downloadInvoice}
          >
            <Download size={16} />
            Download Invoice PDF
          </Button>
        </div>
      </motion.div>

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

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Subscription Overview
            </CardTitle>
            <CardDescription>
              Details of your platform subscription and pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Subscription Tier</div>
                <div className="text-lg font-bold">{billingData.subscriptionTier}</div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Price per MWh</div>
                <div className="text-lg font-bold">DKK {billingData.pricePerMWh}</div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Commission Rate</div>
                <div className="text-lg font-bold">{billingData.commission}%</div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="text-sm text-muted-foreground">Billing Frequency</div>
                <div className="text-lg font-bold">{billingData.billingFrequency}</div>
              </div>
            </div>
            
            <div className="pt-2">
              <div className="text-sm font-medium mb-1">Service Agreement</div>
              <div className="flex items-center justify-between gap-2 p-3 border rounded-lg">
                <div className="text-sm">
                  Renuw Platform Utility Agreement
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => setShowContractModal(true)}
                >
                  <FileText size={14} />
                  View
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5 text-primary" />
              Monthly Usage Summary
            </CardTitle>
            <CardDescription>
              Current month's platform usage and estimated costs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Monthly MWh Usage</span>
                <span className="font-medium">{billingData.monthlyUsage} MWh</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary/70 to-primary transition-all duration-1000 ease-out rounded-full"
                  style={{ width: `${usageProgressValue}%` }}  
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg">
                <div className="text-sm text-muted-foreground">Estimated Cost</div>
                <div className="text-2xl font-bold">DKK {billingData.estimatedCost.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">For {format(firstDayOfMonth, "MMMM yyyy")}</div>
              </div>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex justify-between">
                  <div className="text-sm text-muted-foreground">Last Invoice</div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 pointer-events-none">
                    {billingData.lastInvoice.status}
                  </Badge>
                </div>
                <div className="text-lg font-bold mt-1">DKK {billingData.lastInvoice.amount.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {billingData.lastInvoice.number} ({new Date(billingData.lastInvoice.date).toLocaleDateString()})
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className="gap-2" onClick={downloadInvoice}>
                <Download size={16} />
                Download Invoice PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Usage History
            </CardTitle>
            <CardDescription>
              Monthly MWh usage over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 mt-4">
              <div className="flex h-full items-end gap-2">
                {usageHistory.map((month, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className={`w-full rounded-t-md transition-all duration-700 ease-out ${
                        month.projected 
                          ? "bg-primary/30 border border-primary/40 border-dashed" 
                          : "bg-gradient-to-t from-primary to-primary/70"
                      }`}
                      style={{ 
                        height: `${(month.usage / maxUsage) * 100}%`,
                        animationDelay: `${index * 300}ms`
                      }}
                    ></div>
                    <div className="text-xs pt-2">{month.month}</div>
                    <div className="text-xs text-muted-foreground flex items-center">
                      {month.usage} MWh
                      {month.projected && <span className="text-xs text-amber-500 ml-1">(Est.)</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Invoices
            </CardTitle>
            <CardDescription>
              Preview of upcoming billing cycles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-muted/20 rounded-lg border">
                <div className="flex-1">
                  <div className="font-medium">May 2025 Invoice</div>
                  <div className="text-sm text-muted-foreground">Estimated: DKK 73,000</div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 pointer-events-none">
                  Upcoming
                </Badge>
              </div>
              
              <div className="flex items-center p-4 bg-muted/20 rounded-lg border">
                <div className="flex-1">
                  <div className="font-medium">June 2025 Invoice</div>
                  <div className="text-sm text-muted-foreground">Estimated: DKK 75,000</div>
                </div>
                <Badge variant="outline" className="pointer-events-none">
                  Projected
                </Badge>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md">
              <h4 className="font-medium">Billing Information</h4>
              <p className="text-sm mt-2">
                The standard rate for GO matching and allocation services is <span className="font-medium">DKK 20 per MWh</span> of 
                allocated renewable energy. This fee covers AI-powered GO allocation, temporal matching between production and consumption,
                portfolio optimization, GO tracking, and customer-specific analytics.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Service Agreement Modal */}
      <Dialog open={showContractModal} onOpenChange={setShowContractModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Renuw Platform Utility Agreement</DialogTitle>
            <DialogDescription>
              Service contract between Renuw and Energi Danmark A/S
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6 border rounded-md">
            <div className="space-y-4">
              <h3 className="text-lg font-bold">Platform Subscription Agreement</h3>
              <div className="space-y-2">
                <h4 className="font-medium">1. Subscription Details</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Subscription Tier:</div>
                  <div>Enterprise</div>
                  <div className="font-medium">Billing Frequency:</div>
                  <div>Monthly</div>
                  <div className="font-medium">Contract Start:</div>
                  <div>January 1, 2025</div>
                  <div className="font-medium">Contract Duration:</div>
                  <div>12 months (auto-renewing)</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">2. Pricing Structure</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Base Rate:</div>
                  <div>DKK 20 per MWh of allocated renewable energy</div>
                  <div className="font-medium">Commission Rate:</div>
                  <div>5% of transaction value</div>
                  <div className="font-medium">Additional Fees:</div>
                  <div>None</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">3. Platform Services</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>AI-powered GO matching and allocation</li>
                  <li>Temporal matching between production and consumption</li>
                  <li>Portfolio optimization and management</li>
                  <li>Customer-specific analytics and reporting</li>
                  <li>Regulatory compliance automation</li>
                  <li>Custom branding options</li>
                  <li>API access for system integration</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">4. Revenue Sharing</h4>
                <p className="text-sm">
                  Renuw will provide a 10% revenue share on all new corporate customers onboarded through the platform,
                  calculated based on the platform fees collected from these customers.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">5. White-label Terms</h4>
                <p className="text-sm">
                  The Enterprise tier includes white-label options allowing Energi Danmark A/S to present the platform
                  under their own branding to end customers. Renuw retains all intellectual property rights to the
                  underlying technology.
                </p>
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">Signed by:</p>
                  <p className="text-sm">Anders Jensen, Energi Danmark A/S</p>
                  <p className="text-sm text-muted-foreground">April 15, 2025</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle size={12} className="mr-1" />
                  Contract Active
                </Badge>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => downloadInvoice()} className="gap-2">
              <Download size={16} />
              Download PDF
            </Button>
            <DialogClose asChild>
              <Button variant="default">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
