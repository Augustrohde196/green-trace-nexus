
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Receipt, Tag, Zap } from "lucide-react";

interface BillingMetricsProps {
  totalGOsIssued: number;
  totalBilled: number;
  totalPaid: number;
  totalAllocatedGOs: number;
  dateRangeDisplay: string;
}

export function BillingMetrics({
  totalGOsIssued,
  totalBilled,
  totalPaid,
  totalAllocatedGOs,
  dateRangeDisplay
}: BillingMetricsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total GOs Issued
          </CardTitle>
          <Tag className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalGOsIssued.toLocaleString()} GOs</div>
          <p className="text-xs text-muted-foreground">
            Each GO represents 1 MWh of renewable energy
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
            For {dateRangeDisplay}
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
            {totalBilled > 0 ? ((totalPaid / totalBilled) * 100).toFixed(1) : "0"}% of total
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            GO Allocation
          </CardTitle>
          <Zap className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-500">
            {totalAllocatedGOs.toLocaleString()} GOs
          </div>
          <p className="text-xs text-muted-foreground">
            {totalGOsIssued > 0 ? ((totalAllocatedGOs / totalGOsIssued) * 100).toFixed(1) : "0"}% of total
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
