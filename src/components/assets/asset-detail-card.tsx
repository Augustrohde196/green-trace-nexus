
import { Asset } from "@/data/models";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Wind, 
  Sun, 
  Database,
  FileText,
  Activity,
  User,
  Zap
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

interface AssetDetailCardProps {
  asset: Asset;
}

export function AssetDetailCard({ asset }: AssetDetailCardProps) {
  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate utilization percentage
  const utilization = Math.round(((asset.capacity - asset.availableCapacity) / asset.capacity) * 100);
  
  // Calculate energy figures in MWh
  const availableEnergyMWh = useMemo(() => {
    // Using capacity factor to estimate annual MWh production
    const capacityFactor = asset.type === "wind" ? 0.35 : 0.25;
    return Math.round(asset.availableCapacity * 24 * 365 * capacityFactor);
  }, [asset]);
  
  const totalEnergyMWh = useMemo(() => {
    const capacityFactor = asset.type === "wind" ? 0.35 : 0.25;
    return Math.round(asset.capacity * 24 * 365 * capacityFactor);
  }, [asset]);
  
  const allocatedEnergyMWh = totalEnergyMWh - availableEnergyMWh;

  return (
    <div className="space-y-6">
      {/* Asset Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium mb-3">Asset Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {asset.type === "wind" ? (
                  <Wind className="h-4 w-4 text-wind" />
                ) : (
                  <Sun className="h-4 w-4 text-solar" />
                )}
                <span className="text-muted-foreground">Type</span>
              </div>
              <span className="capitalize font-medium">{asset.type}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Capacity</span>
              <span className="font-medium">{asset.capacity} MW</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Available Energy</span>
              <span className="font-medium">{availableEnergyMWh} MWh</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Annual Production</span>
              <span className="font-medium">{asset.annualProduction} GWh</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Output</span>
              <span className="font-medium">{asset.currentOutput} MW</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <Badge className="capitalize" variant={asset.status === "online" ? "success" : asset.status === "offline" ? "destructive" : "warning"}>
                {asset.status || "online"}
              </Badge>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Technical Details</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Installation Type</span>
              <span className="font-medium">{asset.installationType || "FTM"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Owner</span>
              <span className="font-medium">{asset.owner || "Unknown"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">GSRN</span>
              <span className="font-medium">{asset.gsrn || "Not available"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Grid Connection</span>
              <span className="font-medium">{asset.gridConnection || "Standard"}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Carbon Intensity</span>
              <span className="font-medium">{asset.carbonIntensity || "0"} gCO2eq/kWh</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Matching Score</span>
              <span className="font-medium">{asset.matchingScore || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Location */}
      <div>
        <h3 className="text-sm font-medium mb-2">Location</h3>
        <div className="flex items-center text-sm mb-1">
          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
          {asset.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span>Coordinates: {asset.coordinates.lat.toFixed(4)}, {asset.coordinates.lng.toFixed(4)}</span>
        </div>
      </div>
      
      {/* Commissioned Date */}
      <div>
        <h3 className="text-sm font-medium mb-2">Commissioned</h3>
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-1 text-gray-500" />
          {formatDate(asset.commissioned)}
        </div>
      </div>
      
      {/* Energy Utilization */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium">Energy Utilization</h3>
          <span className="text-sm font-medium">{utilization}%</span>
        </div>
        <Progress value={utilization} className="h-2" />
        <div className="flex justify-between mt-1">
          <span className="text-xs text-muted-foreground">Allocated: {allocatedEnergyMWh} MWh</span>
          <span className="text-xs text-muted-foreground">Total: {totalEnergyMWh} MWh</span>
        </div>
      </div>
      
      {/* Customer Allocations */}
      <div>
        <h3 className="text-sm font-medium mb-2">Customer Allocations</h3>
        {asset.customers.length > 0 ? (
          <div className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
            {asset.customers.map((customer) => (
              <div key={customer.customerId} className="flex items-center justify-between border-b border-border/40 pb-2">
                <div className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5 text-primary" />
                  <span className="text-sm">{customer.customerName}</span>
                </div>
                <span className="text-sm font-medium">{customer.allocatedCapacity} MW</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No customers allocated</p>
        )}
      </div>
      
      {/* Asset Energy Production Indicator */}
      {asset.status === "online" && (
        <div className="flex items-center justify-center py-2">
          <div className="flex items-center gap-2">
            <div className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </div>
            <span className="text-sm text-muted-foreground">Producing {asset.currentOutput} MW right now</span>
          </div>
        </div>
      )}
    </div>
  );
}
