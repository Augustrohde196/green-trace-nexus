
import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
} from "@/components/ui/table";

interface CustomerBreakdownItem {
  name: string;
  location: string;
  volume: number;
  amount: number;
}

interface CustomerBreakdownProps {
  customerBreakdown: CustomerBreakdownItem[];
}

export function CustomerBreakdown({ customerBreakdown }: CustomerBreakdownProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border hover:border-primary/50 hover:shadow-sm transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Customer Allocation
          </CardTitle>
          <CardDescription>
            Detailed breakdown of customer allocations for the current period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium">Customer Name</TableHead>
                <TableHead className="font-medium">Location</TableHead>
                <TableHead className="text-right font-medium">Volume (MWh)</TableHead>
                <TableHead className="text-right font-medium">Billing Amount (DKK)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerBreakdown.map((customer, i) => (
                <TableRow 
                  key={i} 
                  className={`hover:bg-muted/50 transition-colors ${i % 2 === 0 ? 'bg-muted/20' : ''}`}
                >
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.location}</TableCell>
                  <TableCell className="text-right">{customer.volume.toLocaleString()}</TableCell>
                  <TableCell className="text-right font-medium text-primary">
                    {customer.amount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-muted/10 border-t">
                <TableCell colSpan={2} className="font-bold">Total</TableCell>
                <TableCell className="text-right font-bold">
                  {customerBreakdown.reduce((sum, c) => sum + c.volume, 0).toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  {customerBreakdown.reduce((sum, c) => sum + c.amount, 0).toLocaleString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
}
