import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GOTrackingTable } from "@/components/go/go-tracking-table";
import { AssetMap } from "@/components/map/asset-map";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Map, List, FileDown, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { useToast } from "@/components/ui/use-toast";
import html2canvas from "html2canvas";
import { motion } from "framer-motion";

const DENMARK_COORDINATES = [
  { region: "Capital Region", name: "Copenhagen", lat: 55.676, lng: 12.568 },
  { region: "North Denmark", name: "Aalborg", lat: 57.048, lng: 9.921 },
  { region: "South Denmark", name: "Odense", lat: 55.403, lng: 10.402 },
  { region: "Central Denmark", name: "Aarhus", lat: 56.156, lng: 10.203 },
  { region: "Central Denmark", name: "Vejle", lat: 55.708, lng: 9.536 },
  { region: "Central Denmark", name: "Horsens", lat: 55.862, lng: 9.850 },
  { region: "South Denmark", name: "Svendborg", lat: 55.230, lng: 10.139 },
  { region: "Central Denmark", name: "Herning", lat: 55.859, lng: 8.526 },
  { region: "South Denmark", name: "Esbjerg", lat: 55.477, lng: 8.459 },
  { region: "North Denmark", name: "Thisted", lat: 56.950, lng: 8.699 },
  { region: "Zealand", name: "Slagelse", lat: 55.312, lng: 11.557 },
  { region: "Zealand", name: "Roskilde", lat: 55.640, lng: 12.081 },
  { region: "South Denmark", name: "Sønderborg", lat: 54.912, lng: 9.792 },
  { region: "South Denmark", name: "Middelfart", lat: 55.503, lng: 9.732 },
  { region: "North Denmark", name: "Frederikshavn", lat: 57.458, lng: 10.538 },
  { region: "North Jutland", name: "Skagen", lat: 57.721, lng: 10.590 },
  { region: "Zealand", name: "Hillerød", lat: 55.927, lng: 12.300 },
  { region: "Zealand", name: "Kalundborg", lat: 55.681, lng: 11.088 },
  { region: "Zealand", name: "Køge", lat: 55.457, lng: 12.182 },
  { region: "South Denmark", name: "Nyborg", lat: 55.312, lng: 10.789 }
];

const DENMARK_ASSET_NAMES = [
  "Anholt Offshore Wind Farm", "Kriegers Flak Wind Farm", "Horns Rev 3", 
  "Middelgrunden Wind Farm", "Rødsand Wind Farm", "Vesterhav Nord", 
  "Nissum Bredning Wave Energy", "Nordjylland Solar Park", "Nørhede Wind Park",
  "Tjæreborg Wind Farm", "Zealand Solar Array", "Holstebro Solar Park",
  "Copenhagen Energy Community", "Samsø Renewable Energy Island", "Bornholm Green Energy",
  "Djursland Wind Collective", "Hvide Sande Harbor Wind", "Ringkøbing Solar Field",
  "Lolland Community Energy", "Hirsholm Island Offshore"
];

const GRID_AREAS = [
  "DK1 - West Jutland", "DK2 - East Denmark", "N1 - North Jutland", "FYN - Funen",
  "KBH - Copenhagen", "SJL - South Jutland", "MJL - Mid Jutland",
  "ZEA - Zealand", "BOR - Bornholm", "NOR - Northern Zealand"
];

const getRandomDate = () => {
  const now = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(now.getMonth() - 1);
  
  const randomDate = new Date(
    lastMonth.getTime() + Math.random() * (now.getTime() - lastMonth.getTime())
  );
  
  return randomDate.toISOString();
};

const generateSimulatedGOs = (count: number): GuaranteeOfOrigin[] => {
  const gos: GuaranteeOfOrigin[] = [];
  
  for (let i = 0; i < count; i++) {
    const locationIndex = Math.floor(Math.random() * DENMARK_COORDINATES.length);
    const location = DENMARK_COORDINATES[locationIndex];
    const assetNameIndex = Math.floor(Math.random() * DENMARK_ASSET_NAMES.length);
    const gridAreaIndex = Math.floor(Math.random() * GRID_AREAS.length);
    
    const assetName = DENMARK_ASSET_NAMES[assetNameIndex];
    const type = assetName.toLowerCase().includes("wind") || assetName.toLowerCase().includes("offshore") ? 
                "wind" : "solar";
    
    const volume = Math.floor(Math.random() * 50) + 10;
    const allocationScore = Math.floor(Math.random() * 40) + 60;
    
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.15;
    
    gos.push({
      id: `go-${i}`,
      assetId: `asset-${assetNameIndex}`,
      assetName: assetName,
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
      trackingCode: `DK-TRK-${Math.floor(Math.random() * 10000)}`,
      coordinates: {
        lat: location.lat + latOffset,
        lng: location.lng + lngOffset
      }
    });
  }
  
  return gos;
};

const CorporateTracing = () => {
  const { toast } = useToast();
  const [allocatedGOs, setAllocatedGOs] = useState<GuaranteeOfOrigin[]>([]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  useEffect(() => {
    setLoading(true);
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
  
  const uniqueAssetCount = new Set(allocatedGOs.map(go => go.assetId)).size;
  
  const downloadMap = async () => {
    try {
      if (!mapContainerRef.current) {
        toast({
          title: "Error",
          description: "Map not available for download",
          variant: "destructive"
        });
        return;
      }
      
      setLoading(true);
      toast({
        title: "Preparing map",
        description: "Please wait while we prepare your map for download..."
      });
      
      setTimeout(async () => {
        try {
          const mapElement = mapContainerRef.current;
          const canvas = await html2canvas(mapElement as HTMLElement, {
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
          });
          
          const image = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = image;
          link.download = `certificate_tracing_map_${new Date().toISOString().split('T')[0]}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setLoading(false);
          toast({
            title: "Download complete",
            description: "Map has been downloaded successfully."
          });
        } catch (error) {
          console.error("Error capturing map:", error);
          setLoading(false);
          toast({
            title: "Download failed",
            description: "There was a problem downloading the map.",
            variant: "destructive"
          });
        }
      }, 500);
    } catch (error) {
      console.error("Error in download process:", error);
      setLoading(false);
      toast({
        title: "Download failed",
        description: "There was a problem downloading the map.",
        variant: "destructive"
      });
    }
  };
  
  const exportData = () => {
    try {
      const exportData = allocatedGOs.map(go => ({
        assetName: go.assetName,
        type: go.type,
        volume: go.volume,
        productionTimestamp: go.productionTimestamp,
        allocationTimestamp: go.allocationTimestamp,
        allocationScore: go.allocationScore,
        gridArea: go.gridArea,
        trackingCode: go.trackingCode,
        latitude: go.coordinates.lat,
        longitude: go.coordinates.lng
      }));
      
      const headers = Object.keys(exportData[0]).join(',');
      const rows = exportData.map(row => Object.values(row).join(',')).join('\n');
      const csvContent = `${headers}\n${rows}`;
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `certificate_data_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Data exported",
        description: "Certificate data has been exported successfully."
      });
    } catch (error) {
      console.error("Error exporting data:", error);
      toast({
        title: "Export failed",
        description: "There was a problem exporting the data.",
        variant: "destructive"
      });
    }
  };
  
  const timePeriods = [
    { label: "This Month", value: "current" },
    { label: "Last Month", value: "last" },
    { label: "Last Quarter", value: "quarter" },
    { label: "Year to Date", value: "ytd" },
    { label: "Custom Range", value: "custom" },
  ];
  
  return (
    <motion.div 
      className="space-y-6 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Certificate Traceability</h2>
          <p className="text-muted-foreground">
            Trace the origin of your renewable energy certificates
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="border rounded-md px-3 py-1.5 bg-background text-sm"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            {timePeriods.map((period) => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {currentMonth} {currentYear}
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
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
            <div className="text-2xl font-bold">{(allocatedGOs.reduce((sum, go) => sum + go.volume, 0)).toLocaleString()}</div>
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
            <div className="text-2xl font-bold">{(allocatedGOs.filter(go => go.type === "wind").reduce((sum, go) => sum + go.volume, 0)).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {allocatedGOs.length ? Math.round((allocatedGOs.filter(go => go.type === "wind").reduce((sum, go) => sum + go.volume, 0) / allocatedGOs.reduce((sum, go) => sum + go.volume, 0)) * 100) : 0}% of total
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
            <div className="text-2xl font-bold">{(allocatedGOs.filter(go => go.type === "solar").reduce((sum, go) => sum + go.volume, 0)).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {allocatedGOs.length ? Math.round((allocatedGOs.filter(go => go.type === "solar").reduce((sum, go) => sum + go.volume, 0) / allocatedGOs.reduce((sum, go) => sum + go.volume, 0)) * 100) : 0}% of total
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Production Sites</CardTitle>
            <Badge variant="outline" className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              Count
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{new Set(allocatedGOs.map(go => go.assetId)).size}</div>
            <p className="text-xs text-muted-foreground">
              Across Denmark
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-muted/20 border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-3/5">
              <h3 className="text-lg font-medium mb-4">Hourly Matching Performance</h3>
              <div className="bg-background rounded-lg p-4 border">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">Time-matching heatmap</h4>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-3 w-3" />
                    Export
                  </Button>
                </div>
                <div className="h-[200px] bg-muted/30 rounded flex items-center justify-center">
                  {/* Placeholder for heatmap visualization */}
                  <span className="text-muted-foreground">Hourly matching heatmap visualization</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  This heatmap shows hours where your consumption was matched with renewable production.
                  Green cells indicate full matching, yellow indicates partial matching, and red indicates no matching.
                </p>
              </div>
            </div>
            <div className="md:w-2/5">
              <h3 className="text-lg font-medium mb-4">Certificate Integrity</h3>
              <div className="space-y-4">
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-700">Verified</Badge>
                      <span className="font-medium">Chain of Custody</span>
                    </div>
                    <span className="text-green-600">✓</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    All certificates have verified chain of custody from generation to your allocation.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-700">Verified</Badge>
                      <span className="font-medium">Registry Validation</span>
                    </div>
                    <span className="text-green-600">✓</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    All certificates are validated against the official AIB registry.
                  </p>
                </div>
                <div className="bg-background rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-green-100 text-green-700">Available</Badge>
                      <span className="font-medium">Audit Report</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-primary">Download</Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Download the full audit report of your certificate tracing for compliance purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
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
        {viewMode === "map" ? (
          <Button variant="outline" size="sm" onClick={downloadMap}>
            <Download className="mr-2 h-4 w-4" />
            Download Map
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={exportData}>
            <FileDown className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        )}
      </div>
      
      {loading ? (
        <Card className="p-8">
          <div className="flex items-center justify-center h-[400px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </Card>
      ) : viewMode === "map" ? (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Asset Locations</CardTitle>
            <CardDescription>Geographic overview of your energy sources</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-[600px]" ref={mapContainerRef}>
              <AssetMap guaranteesOfOrigin={allocatedGOs} />
            </div>
          </CardContent>
        </Card>
      ) : (
        <GOTrackingTable 
          guaranteesOfOrigin={allocatedGOs} 
          title="Allocated Certificates" 
          showSearch={true}
        />
      )}
    </motion.div>
  );
};

export default CorporateTracing;
