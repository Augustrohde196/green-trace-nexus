
import { Receipt, Download } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface MonthlyUsageSummaryProps {
  billingData: {
    monthlyUsage: number;
    estimatedCost: number;
    lastInvoice: {
      number: string;
      amount: number;
      date: string;
      status: string;
    };
  };
  selectedMonth: Date;
}

export function MonthlyUsageSummary({ billingData, selectedMonth }: MonthlyUsageSummaryProps) {
  // Calculate the first day of the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);

  return (
    <Card className="overflow-hidden border hover:border-primary/50 hover:shadow-sm transition-all">
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
          <Progress value={80} className="h-2" /> {/* Example progress */}
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
              <Badge variant="success">
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
          <Button className="gap-2">
            <Download size={16} />
            Download Invoice PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
