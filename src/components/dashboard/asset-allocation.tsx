
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Asset } from "@/data/models";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AssetAllocationProps {
  assets: Asset[];
}

export function AssetAllocation({ assets }: AssetAllocationProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Asset Allocation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assets.map((asset) => {
            const allocatedPercentage = ((asset.capacity - asset.availableCapacity) / asset.capacity) * 100;
            
            return (
              <div key={asset.id} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={cn(
                      "h-3 w-3 rounded-full",
                      asset.type === "wind" ? "bg-wind" : "bg-solar"
                    )} />
                    <span className="text-sm font-medium">{asset.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {asset.capacity - asset.availableCapacity}/{asset.capacity} MW
                  </span>
                </div>
                <Progress value={allocatedPercentage} className={cn(
                  asset.type === "wind" ? "text-wind" : "text-solar"
                )} />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{allocatedPercentage.toFixed(0)}% Allocated</span>
                  <span>{asset.customers.length} Customers</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
