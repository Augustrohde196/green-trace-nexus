
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Customer } from "@/data/models";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CustomersTableProps {
  customers: Customer[];
}

export function CustomersTable({ customers }: CustomersTableProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Corporate Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Consumption (GWh)</TableHead>
              <TableHead>Portfolio Mix</TableHead>
              <TableHead className="text-right">Matching Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>{customer.industry}</TableCell>
                <TableCell>{customer.annualConsumption}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Badge variant="secondary" className="bg-wind/20 text-wind hover:bg-wind/30">
                      Wind {customer.portfolioMix.wind}%
                    </Badge>
                    <Badge variant="secondary" className="bg-solar/20 text-solar hover:bg-solar/30">
                      Solar {customer.portfolioMix.solar}%
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={getScoreBadgeVariant(customer.matchingScore)}>
                    {customer.matchingScore}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function getScoreBadgeVariant(score: number): "default" | "destructive" | "outline" {
  if (score >= 80) return "default";
  if (score >= 60) return "outline";
  return "destructive";
}
