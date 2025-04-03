
import { Asset } from "@/data/models";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  MapPin, 
  Calendar, 
  Wind, 
  Sun, 
  Database,
  FileText
} from "lucide-react";

interface AssetDetailCardProps {
  asset: Asset;
}

export function AssetDetailCard({ asset }: AssetDetailCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {asset.type === "wind" ? (
            <Wind className="h-5 w-5 text-blue-500" />
          ) : (
            <Sun className="h-5 w-5 text-amber-500" />
          )}
          {asset.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">Type:</span>
          <span className="capitalize font-medium">{asset.type}</span>
          
          <span className="text-muted-foreground">Capacity:</span>
          <span className="font-medium">{asset.capacity} MW</span>
          
          <span className="text-muted-foreground">Available:</span>
          <span className="font-medium">{asset.availableCapacity} MW</span>
          
          <span className="text-muted-foreground">Annual Production:</span>
          <span className="font-medium">{asset.annualProduction} GWh</span>
          
          <span className="text-muted-foreground">Current Output:</span>
          <span className="font-medium">{asset.currentOutput} MW</span>
          
          <span className="text-muted-foreground">Installation Type:</span>
          <span className="font-medium">{asset.installationType || "FTM"}</span>
          
          <span className="text-muted-foreground">Owner:</span>
          <span className="font-medium">{asset.owner || "Unknown"}</span>
          
          <span className="text-muted-foreground">GSRN:</span>
          <span className="font-medium">{asset.gsrn || "Not available"}</span>
          
          <span className="text-muted-foreground">Grid Connection:</span>
          <span className="font-medium">{asset.gridConnection || "Standard"}</span>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Location</h4>
          <div className="flex items-center text-sm mb-1">
            <MapPin className="h-4 w-4 mr-1 text-gray-500" />
            {asset.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Coordinates: {asset.coordinates.lat}, {asset.coordinates.lng}</span>
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Commissioned</h4>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-gray-500" />
            {new Date(asset.commissioned).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h4 className="font-medium mb-2">Customer Allocations</h4>
          {asset.customers.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {asset.customers.map((customer) => (
                <li key={customer.customerId} className="flex justify-between">
                  <span>{customer.customerName}</span>
                  <span className="font-medium">{customer.allocatedCapacity} MW</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">No customers allocated</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
