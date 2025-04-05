
import { useEffect, useRef, useState } from "react";
import { MapPin, Wind, Sun, Info } from "lucide-react";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { mockAssets } from "@/data/mock-data";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/utils";

// Mock coordinates for different parts of Denmark
const DENMARK_COORDINATES = [
  { lat: 55.676098, lng: 12.568337 }, // Copenhagen
  { lat: 57.048820, lng: 9.921747 }, // Aalborg
  { lat: 55.403756, lng: 10.402370 }, // Odense
  { lat: 56.156361, lng: 10.203921 }, // Aarhus
  { lat: 55.708870, lng: 9.536067 }, // Vejle
  { lat: 55.862982, lng: 9.850121 }, // Horsens
  { lat: 55.230573, lng: 10.139542 }, // Svendborg
  { lat: 55.859631, lng: 8.526903 }, // Herning
  { lat: 55.477592, lng: 8.459305 }, // Esbjerg
  { lat: 56.950249, lng: 8.699974 }, // Thisted
];

interface AssetMapProps {
  guaranteesOfOrigin: GuaranteeOfOrigin[];
}

export function AssetMap({ guaranteesOfOrigin }: AssetMapProps) {
  const [selectedAsset, setSelectedAsset] = useState<GuaranteeOfOrigin | null>(null);
  const [heatmapMode, setHeatmapMode] = useState(true);
  
  // Group GOs by asset for map display
  const assetGOMap = guaranteesOfOrigin.reduce((map, go) => {
    if (!map[go.assetId]) {
      map[go.assetId] = [];
    }
    map[go.assetId].push(go);
    return map;
  }, {} as Record<string, GuaranteeOfOrigin[]>);
  
  const assetData = Object.entries(assetGOMap).map(([assetId, gos]) => {
    const asset = mockAssets.find(a => a.id === assetId);
    const totalVolume = gos.reduce((sum, go) => sum + go.volume, 0);
    const averageScore = Math.round(
      gos.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / gos.length
    );
    
    // Assign random coordinates from Denmark list if the asset doesn't have coordinates
    const coordinates = asset?.coordinates || 
      DENMARK_COORDINATES[Math.floor(Math.random() * DENMARK_COORDINATES.length)];
    
    return {
      id: assetId,
      name: gos[0].assetName,
      type: gos[0].type,
      location: gos[0].gridArea,
      coordinates,
      totalCertificates: gos.length,
      totalVolume,
      averageScore,
      gos
    };
  });
  
  // Center the map on Denmark
  const mapCenter = { lat: 55.676098, lng: 12.568337 }; // Copenhagen
  
  // In a real application, this would be a proper interactive map using a library like Leaflet or Google Maps
  return (
    <div className="relative w-full h-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
      {/* Denmark map outline (simplified for demo) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-slate-300 dark:text-slate-700 text-8xl font-bold">
          Denmark Map
        </div>
      </div>
      
      {/* Asset markers */}
      <div className="absolute inset-0">
        {assetData.map(asset => {
          // Calculate position based on coordinates relative to map size
          const left = `${30 + (asset.coordinates.lng - 8.0) * 20}%`;
          const top = `${70 - (asset.coordinates.lat - 54.5) * 30}%`;
          
          // Calculate marker size based on volume (for heatmap mode)
          const size = heatmapMode 
            ? Math.max(30, Math.min(100, 30 + (asset.totalVolume / 50))) 
            : 40;
          
          return (
            <Popover key={asset.id}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={`absolute rounded-full ${
                    heatmapMode ? 'bg-opacity-60 hover:bg-opacity-80' : ''
                  } ${
                    asset.type === 'wind' 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-amber-500 hover:bg-amber-600 text-white'
                  }`}
                  style={{
                    left,
                    top,
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {asset.type === 'wind' ? (
                    <Wind className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{asset.name}</h3>
                  <div className="text-sm font-medium flex items-center gap-1">
                    {asset.type === 'wind' ? (
                      <>
                        <Wind className="h-4 w-4 text-blue-500" />
                        <span>Wind Power</span>
                      </>
                    ) : (
                      <>
                        <Sun className="h-4 w-4 text-amber-500" />
                        <span>Solar Power</span>
                      </>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div>
                      <p className="text-muted-foreground">Location:</p>
                      <p className="font-medium">{asset.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Volume:</p>
                      <p className="font-medium">{asset.totalVolume} MWh</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Certificates:</p>
                      <p className="font-medium">{asset.totalCertificates}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Match Score:</p>
                      <p className="font-medium">{asset.averageScore}%</p>
                    </div>
                  </div>
                  
                  <h4 className="font-medium mt-2">Recent Certificates:</h4>
                  <div className="max-h-40 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-1">Date</th>
                          <th className="text-right py-1">Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {asset.gos.slice(0, 5).map(go => (
                          <tr key={go.id} className="border-b border-dashed">
                            <td className="py-1">{formatDate(go.productionTimestamp)}</td>
                            <td className="text-right py-1">{go.volume} MWh</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          );
        })}
      </div>
      
      {/* Map controls */}
      <div className="absolute top-4 right-4 space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white dark:bg-gray-800"
                onClick={() => setHeatmapMode(!heatmapMode)}
              >
                <MapPin className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{heatmapMode ? "Switch to Marker View" : "Switch to Heatmap View"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white dark:bg-gray-800"
              >
                <Info className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Note: This is a simplified map visualization. In a production app, this would use a proper map library.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-md p-2 shadow-md">
        <div className="text-sm font-medium mb-1">Legend</div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1">
            <div className="bg-blue-500 rounded-full w-3 h-3"></div>
            <span>Wind</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="bg-amber-500 rounded-full w-3 h-3"></div>
            <span>Solar</span>
          </div>
          {heatmapMode && (
            <div className="flex items-center gap-1">
              <span>Size</span>
              <span>=</span>
              <span>Volume</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
