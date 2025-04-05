
import { useState, useMemo } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ToggleGroup, 
  ToggleGroupItem 
} from "@/components/ui/toggle-group";
import { 
  Wind, 
  Sun, 
  MapPin, 
  Info,
  Database,
  FileText
} from "lucide-react";
import { mockAssets } from "@/data/mock-data";
import { Asset } from "@/data/models";
import { AssetDetailCard } from "@/components/assets/asset-detail-card";
import { PortfolioDistribution } from "@/components/assets/portfolio-distribution";

export default function Assets() {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const filteredAssets = useMemo(() => {
    if (selectedType === "all") {
      return mockAssets;
    }
    return mockAssets.filter(asset => asset.type === selectedType);
  }, [selectedType]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Assets</h1>
        <ToggleGroup type="single" value={selectedType} onValueChange={(value) => setSelectedType(value || "all")}>
          <ToggleGroupItem value="all" aria-label="All Assets">
            <Database className="h-4 w-4 mr-2" />
            All
          </ToggleGroupItem>
          <ToggleGroupItem value="wind" aria-label="Wind Assets">
            <Wind className="h-4 w-4 mr-2" />
            Wind
          </ToggleGroupItem>
          <ToggleGroupItem value="solar" aria-label="Solar Assets">
            <Sun className="h-4 w-4 mr-2" />
            Solar
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      {/* Portfolio Distribution Section */}
      <PortfolioDistribution assets={mockAssets} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Asset Inventory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity (MW)</TableHead>
                    <TableHead>Available (MW)</TableHead>
                    <TableHead>Installation</TableHead>
                    <TableHead>Details</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/80" onClick={() => setSelectedAsset(asset)}>
                      <TableCell className="font-medium">{asset.name}</TableCell>
                      <TableCell>
                        {asset.type === "wind" ? (
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
                      <TableCell>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                          {asset.location}
                        </div>
                      </TableCell>
                      <TableCell>{asset.capacity}</TableCell>
                      <TableCell>{asset.availableCapacity}</TableCell>
                      <TableCell>{asset.installationType || "FTM"}</TableCell>
                      <TableCell>
                        <button 
                          className="flex items-center text-blue-600 hover:text-blue-800"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedAsset(asset);
                          }}
                        >
                          <Info className="h-4 w-4 mr-1" />
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedAsset ? (
            <AssetDetailCard asset={selectedAsset} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Asset Details</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-64 text-center text-muted-foreground">
                <FileText className="h-16 w-16 mb-4 opacity-30" />
                <p>Select an asset to view its details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
