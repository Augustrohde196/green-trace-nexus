import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoTrackingTable } from "@/components/go/go-tracking-table";
import { AssetMap } from "@/components/map/asset-map";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Map, List } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GuaranteeOfOrigin } from "@/data/go-models";

// Denmark coordinates for simulating asset locations
const DENMARK_COORDINATES = [
  { region: "Capital Region", lat: 55.676, lng: 12.568 }, // Copenhagen
  { region: "North Denmark", lat: 57.048, lng: 9.921 }, // Aalborg
  { region: "South Denmark", lat: 55.403, lng: 10.402 }, // Odense
  { region: "Central Denmark", lat: 56.156, lng: 10.203 }, // Aarhus
  { region: "Central Denmark", lat: 55.708, lng: 9.536 }, // Vejle
  { region: "Central Denmark", lat: 55.862, lng: 9.850 }, // Horsens
  { region: "South Denmark", lat: 55.230, lng: 10.139 }, // Svendborg
  { region: "Central Denmark", lat: 55.859, lng: 8.526 }, // Herning
  { region: "South Denmark", lat: 55.477, lng: 8.459 }, // Esbjerg
  { region: "North Denmark", lat: 56.950, lng: 8.699 }, // Thisted
  { region: "Zealand", lat: 55.312, lng: 11.557 }, // Slagelse
  { region: "Zealand", lat: 55.640, lng: 12.081 }, // Roskilde
  { region: "South Denmark", lat: 54.912, lng: 9.792 }, // Sønderborg
  { region: "South Denmark", lat: 55.059, lng: 10.612 }, // Svendborg
  { region: "North Denmark", lat: 57.458, lng: 10.038 }, // Frederikshavn
];

// Asset names
const ASSET_NAMES = [
  "Middelgrunden Wind Farm", "Anholt Offshore", "Nordjylland Solar Park", 
  "Horns Rev Wind Farm", "Thy National Park Solar", "Zealand Wind Cooperative", 
  "Aarhus Harbor Wind", "Esbjerg Energy Park", "Copenhagen Solar Array",
  "Odense Clean Energy", "Vejle Green Power", "Aalborg Sustainable",
  "Roskilde Solar Plant", "Herning Wind Collective", "Skagen Coastal Wind"
];

// Grid areas in Denmark
const GRID_AREAS = [
  "DK1 - West", "DK2 - East", "N1 - North Jutland", "FYN - Funen",
  "KBH - Copenhagen", "SYD - South Jutland", "MID - Central Jutland",
  "ZEA - Zealand", "BOR - Bornholm"
];

// Generate a random date in the last month
const getRandomDate = () => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);
  
  const randomDate = new Date(
    lastMonth.getTime() + Math.random() * (now.getTime() - lastMonth.getTime())
  );
  
  return randomDate.toISOString();
};

// Generate random simulated GO data
const generateSimulatedGOs = (count: number): GuaranteeOfOrigin[] => {
  const gos: GuaranteeOfOrigin[] = [];
  
  for (let i = 0; i < count; i++) {
    const assetIndex = Math.floor(Math.random() * ASSET_NAMES.length);
    const locationIndex = Math.floor(Math.random() * DENMARK_COORDINATES.length);
    const gridAreaIndex = Math.floor(Math.random() * GRID_AREAS.length);
    const type = Math.random() > 0.6 ? "wind" : "solar";
    const volume = Math.floor(Math.random() * 50) + 10;
    const allocationScore = Math.floor(Math.random() * 40) + 60;
    
    // Add small random offset to prevent assets from stacking exactly
    const latOffset = (Math.random() - 0.5) * 0.2;
    const lngOffset = (Math.random() - 0.5) * 0.3;
    
    gos.push({
      id: `go-${i}`,
      assetId: `asset-${assetIndex}`,
      assetName: ASSET_NAMES[assetIndex],
      type,
      productionTimestamp: getRandomDate(),
      volume,
      customerId: "company-1",
      customerName: "EcoTech Solutions",
      status: "allocated",
      allocationTimestamp: getRandomDate(),
      allocationScore,
      gsrn: `578999${Math.floor(Math.random() * 1000000)}`,
      gridArea: GRID_AREAS[gridAreaIndex],
      trackingCode: `TRK-${Math.floor(Math.random() * 10000)}`,
      coordinates: {
        lat: DENMARK_COORDINATES[locationIndex].lat + latOffset,
        lng: DENMARK_COORDINATES[locationIndex].lng + lngOffset
      }
    });
  }
  
  return gos;
};

const CorporateTracing = () => {
  const [allocatedGOs, setAllocatedGOs] = useState<GuaranteeOfOrigin[]>([]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [loading, setLoading] = useState(true);
  
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  useEffect(() => {
    // Generate simulated data
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      const simulatedGOs = generateSimulatedGOs(30);
      setAllocatedGOs(simulatedGOs);
      setLoading(false);
    }, 500);
  }, []);
  
  const totalVolume = allocatedGOs.reduce((sum, go) => sum + go.volume, 0);
  const solarGOs = allocatedGOs.filter(go => go.type === "solar");
  const windGOs = allocatedGOs.filter(go => go.type === "wind");
  const solarVolume = solarGOs.reduce((sum, go) => sum + go.volume, 0);
  const windVolume = windGOs.reduce((sum, go) => sum + go.volume, 0);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Certificate Tracing</h2>
          <p className="text-muted-foreground">
            Track your certificates and view production assets on a map
          </p>
        </div>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          {currentMonth} {currentYear}
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
              MWh
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              From {allocatedGOs.length} certificates
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wind Energy</CardTitle>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              MWh
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{windVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalVolume ? Math.round((windVolume / totalVolume) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Solar Energy</CardTitle>
            <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
              MWh
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{solarVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {totalVolume ? Math.round((solarVolume / totalVolume) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Match Score</CardTitle>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              %
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allocatedGOs.length > 0 
                ? Math.round(allocatedGOs.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / allocatedGOs.length)
                : 0}
            </div>
            <p className="text-xs text-muted-foreground">
              Production-consumption matching
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end space-x-2 mb-4">
        <Button
          variant={viewMode === "map" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("map")}
        >
          <Map className="mr-2 h-4 w-4" />
          Map View
        </Button>
        <Button 
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <List className="mr-2 h-4 w-4" />
          List View
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      {loading ? (
        <Card className="p-8">
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </Card>
      ) : viewMode === "map" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px]">
              <AssetMap guaranteesOfOrigin={allocatedGOs} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <GoTrackingTable 
          guaranteesOfOrigin={allocatedGOs} 
          title="Allocated Certificates" 
          showSearch={true}
        />
      )}
    </div>
  );
};

export default CorporateTracing;
