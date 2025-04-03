
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { formatDate } from "@/lib/utils";
import { Wind, Sun, Search } from "lucide-react";

interface GOTrackingTableProps {
  guaranteesOfOrigin: GuaranteeOfOrigin[];
  title?: string;
  showSearch?: boolean;
}

export function GOTrackingTable({
  guaranteesOfOrigin,
  title = "Guarantees of Origin",
  showSearch = true,
}: GOTrackingTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredGOs = guaranteesOfOrigin.filter(go => {
    const lowerQuery = searchQuery.toLowerCase();
    return (
      go.assetName.toLowerCase().includes(lowerQuery) ||
      go.trackingCode.toLowerCase().includes(lowerQuery) ||
      (go.customerName && go.customerName.toLowerCase().includes(lowerQuery)) ||
      go.gridArea.toLowerCase().includes(lowerQuery)
    );
  });

  // Status badge styling
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Available</Badge>;
      case "allocated":
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Allocated</Badge>;
      case "transferred":
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Transferred</Badge>;
      case "redeemed":
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">Redeemed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        {showSearch && (
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by asset, customer or tracking code..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking Code</TableHead>
              <TableHead>Asset</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Production Date</TableHead>
              <TableHead>Volume (MWh)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Matching Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGOs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-4">
                  No guarantees of origin found matching your criteria
                </TableCell>
              </TableRow>
            ) : (
              filteredGOs.map((go) => (
                <TableRow key={go.id} className="hover:bg-muted/50">
                  <TableCell className="font-mono text-xs">{go.trackingCode}</TableCell>
                  <TableCell>{go.assetName}</TableCell>
                  <TableCell>
                    {go.type === "wind" ? (
                      <div className="flex items-center">
                        <Wind className="h-4 w-4 text-blue-500 mr-1" />
                        Wind
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Sun className="h-4 w-4 text-amber-500 mr-1" />
                        Solar
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{formatDate(go.productionTimestamp)}</TableCell>
                  <TableCell>{go.volume}</TableCell>
                  <TableCell>{getStatusBadge(go.status)}</TableCell>
                  <TableCell>{go.customerName || "-"}</TableCell>
                  <TableCell>
                    {go.allocationScore 
                      ? <span className={`font-medium ${
                          go.allocationScore >= 80 ? "text-green-500" :
                          go.allocationScore >= 50 ? "text-yellow-500" : "text-red-500"
                        }`}>
                          {go.allocationScore}%
                        </span>
                      : "-"
                    }
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
