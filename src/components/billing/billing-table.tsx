
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface BillingItem {
  id: number;
  name: string;
  invoiceDate: string;
  dueDate: string;
  goIssued: number;
  goFeeAmount: number;
  registrationFeeAmount: number;
  totalAmount: number;
  paymentStatus: string;
  allocatedGOs: number;
  unallocatedGOs: number;
}

interface BillingTableProps {
  billings: BillingItem[];
  goRate: number;
  registrationFeeRate: number;
}

export function BillingTable({ billings, goRate, registrationFeeRate }: BillingTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Utility/Trader</TableHead>
            <TableHead>Invoice Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>GOs Issued</TableHead>
            <TableHead>GO Fee (DKK)</TableHead>
            <TableHead>Registration Fee (DKK)</TableHead>
            <TableHead className="text-right">Total (DKK)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>GO Allocation</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billings.map((billing) => (
            <TableRow key={billing.id}>
              <TableCell className="font-medium">{billing.name}</TableCell>
              <TableCell>{billing.invoiceDate}</TableCell>
              <TableCell>{billing.dueDate}</TableCell>
              <TableCell>{billing.goIssued.toLocaleString()}</TableCell>
              <TableCell>
                {billing.goFeeAmount.toLocaleString("da-DK")}
                <div className="text-xs text-muted-foreground">{goRate} DKK/GO</div>
              </TableCell>
              <TableCell>
                {billing.registrationFeeAmount.toLocaleString("da-DK")}
                <div className="text-xs text-muted-foreground">{registrationFeeRate} DKK/GO</div>
              </TableCell>
              <TableCell className="text-right">{billing.totalAmount.toLocaleString("da-DK")}</TableCell>
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
              <TableCell>
                <div className="flex flex-col">
                  <span>{billing.allocatedGOs.toLocaleString()} allocated</span>
                  <span className="text-xs text-muted-foreground">
                    {billing.unallocatedGOs.toLocaleString()} unallocated
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
