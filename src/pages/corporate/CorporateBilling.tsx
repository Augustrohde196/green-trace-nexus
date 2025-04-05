
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const invoices = [
  {
    id: "INV-2024-0045",
    date: "Apr 1, 2024",
    amount: "€45,250.00",
    status: "Paid",
    period: "Q1 2024"
  },
  {
    id: "INV-2024-0012",
    date: "Jan 3, 2024",
    amount: "€42,785.00",
    status: "Paid",
    period: "Q4 2023"
  },
  {
    id: "INV-2023-0098",
    date: "Oct 2, 2023",
    amount: "€38,920.00",
    status: "Paid",
    period: "Q3 2023"
  },
  {
    id: "INV-2023-0067",
    date: "Jul 1, 2023",
    amount: "€41,350.00",
    status: "Paid",
    period: "Q2 2023"
  },
  {
    id: "INV-2023-0034",
    date: "Apr 3, 2023",
    amount: "€39,780.00",
    status: "Paid",
    period: "Q1 2023"
  },
];

const CorporateBilling = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">View your invoices and payment history</p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Period Charges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€16,240.00</div>
            <p className="text-xs text-muted-foreground">For April 2024 (Month to date)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Invoice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€45,250.00</div>
            <p className="text-xs text-muted-foreground">For Q1 2024 (Paid)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Monthly Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€14,230.00</div>
            <p className="text-xs text-muted-foreground">Based on last 12 months</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Invoices</CardTitle>
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Statement
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.period}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="text-sm font-medium">Billing Method</div>
              <div className="text-sm">Invoice with Net 30 payment terms</div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Billing Contact</div>
              <div className="text-sm">
                Finance Department<br />
                billing@vestas.com<br />
                +45 20 123 456
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-sm font-medium">Billing Address</div>
              <div className="text-sm">
                Vestas Wind Systems A/S<br />
                Hedeager 42<br />
                8200 Aarhus N<br />
                Denmark
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CorporateBilling;
