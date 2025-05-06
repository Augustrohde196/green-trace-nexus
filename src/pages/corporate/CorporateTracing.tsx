
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssetMap } from '@/components/map/asset-map';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ListFilter, Map, Wind, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { GuaranteeOfOrigin } from '@/data/go-models';

// Sample data - in a real app this would come from an API
const assets: GuaranteeOfOrigin[] = [
  {
    id: "WT001",
    assetId: "DK-WT-001",
    assetName: "Vindeby Wind Farm",
    type: "wind",
    volume: 1450,
    date: new Date("2025-04-01"),
    status: "active",
    coordinates: { lat: 55.1934, lng: 11.1283 }
  },
  {
    id: "WT002",
    assetId: "DK-WT-002",
    assetName: "Anholt Offshore Wind Farm",
    type: "wind",
    volume: 3200,
    date: new Date("2025-04-05"),
    status: "active",
    coordinates: { lat: 56.5987, lng: 11.2088 }
  },
  {
    id: "SL001",
    assetId: "DK-SL-001",
    assetName: "Lerchenborg Solar Park",
    type: "solar",
    volume: 900,
    date: new Date("2025-03-28"),
    status: "active",
    coordinates: { lat: 55.5812, lng: 11.1057 }
  },
  {
    id: "SL002",
    assetId: "DK-SL-002",
    assetName: "Kalundborg Solar Farm",
    type: "solar",
    volume: 780,
    date: new Date("2025-04-02"),
    status: "active",
    coordinates: { lat: 55.6809, lng: 11.0969 }
  }
];

export default function CorporateTracing() {
  // Changed default view to "list" instead of "map"
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  
  // Function to handle asset selection (placeholder)
  const handleAssetClick = (asset: GuaranteeOfOrigin) => {
    console.log("Selected asset:", asset);
    // In a real app, this would show details or navigate to a detail page
  };
  
  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Traceability</h2>
        <p className="text-muted-foreground">
          View and track the source of your renewable energy
        </p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <ListFilter size={16} />
            Filter
          </Button>
          <span className="text-sm text-muted-foreground">
            Showing {assets.length} energy sources
          </span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={viewMode === "list" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <ListFilter size={16} />
            List
          </Button>
          <Button 
            variant={viewMode === "map" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("map")}
            className="gap-2"
          >
            <Map size={16} />
            Map
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px] relative">
              <AssetMap 
                assets={assets}
                initialCenter={{ lat: 55.9, lng: 11.4 }}
                initialZoom={7}
                onAssetClick={handleAssetClick}
                className="h-full"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {assets.map(asset => (
            <Card 
              key={asset.id} 
              className="overflow-hidden hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => handleAssetClick(asset)}
            >
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${asset.type === "wind" ? "bg-blue-100 text-blue-600" : "bg-amber-100 text-amber-600"}`}>
                      {asset.type === "wind" ? <Wind size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                      <h3 className="font-medium">{asset.assetName}</h3>
                      <div className="text-sm text-muted-foreground">{asset.assetId}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-medium">{asset.volume.toLocaleString()} MWh</div>
                      <div className="text-sm text-muted-foreground">
                        {asset.date.toLocaleDateString('en-DK', {day: 'numeric', month: 'short', year: 'numeric'})}
                      </div>
                    </div>
                    <Badge className={`${asset.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" : "bg-amber-100 text-amber-800"}`}>
                      {asset.status === "active" ? "Active" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
