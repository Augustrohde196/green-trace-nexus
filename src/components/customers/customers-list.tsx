
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/data/models";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FileText, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomersListProps {
  customers: Customer[];
}

export function CustomersList({ customers }: CustomersListProps) {
  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No customers found</h3>
          <p className="text-muted-foreground">
            There are no customers matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Annual Consumption</TableHead>
              <TableHead>Portfolio Mix</TableHead>
              <TableHead>Assets Allocation</TableHead>
              <TableHead>Matching Score</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="font-medium">{customer.name}</div>
                  <div className="text-xs text-muted-foreground">{customer.location}</div>
                </TableCell>
                <TableCell>{customer.industry}</TableCell>
                <TableCell>{customer.annualConsumption} GWh</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {customer.portfolioMix.solar > 0 && (
                      <Badge variant="outline" className="bg-[#D9F0C2]/20 text-[#D9F0C2] hover:bg-[#D9F0C2]/30">
                        Solar {customer.portfolioMix.solar}%
                      </Badge>
                    )}
                    {customer.portfolioMix.wind > 0 && (
                      <Badge variant="outline" className="bg-[#735DFF]/20 text-[#735DFF] hover:bg-[#735DFF]/30">
                        Wind {customer.portfolioMix.wind}%
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {customer.assets.length > 0 ? (
                    <div className="text-sm">
                      {customer.assets.length} asset{customer.assets.length > 1 ? 's' : ''}
                      <div className="text-xs text-muted-foreground">
                        {customer.assets.reduce((sum, asset) => sum + asset.allocatedCapacity, 0)} MW allocated
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-muted-foreground">No allocations</div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={getScoreBadgeClass(customer.matchingScore)}>
                    {customer.matchingScore}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                      <DropdownMenuItem>Manage Allocations</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function getScoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
  if (score >= 50) return "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30";
  return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
}
