
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GOTrackingTable } from "@/components/go/go-tracking-table";
import { AssetMap } from "@/components/map/asset-map";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Map, List, FileDown, Filter, FileText, Award, Search, MapPin, BarChart3, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { useToast } from "@/hooks/use-toast"; 
import html2canvas from "html2canvas";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { HourlyMatchingView } from "@/components/tracing/hourly-matching-view";
import { calculateCenter, calculateZoomLevel } from "@/utils/map-utils";

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

const ASSET_DESCRIPTIONS = {
  "Anholt Offshore Wind Farm": "111 turbines with a total capacity of 400 MW, located between Anholt and Djursland",
  "Kriegers Flak Wind Farm": "72 turbines with a total capacity of 605 MW, Denmark's largest offshore wind farm",
  "Horns Rev 3": "49 turbines with a total capacity of 406.7 MW, located in the North Sea",
  "Middelgrunden Wind Farm": "20 turbines with a total capacity of 40 MW, located in the Øresund",
  "Rødsand Wind Farm": "72 turbines with a total capacity of 207 MW, located south of Lolland",
  "Vesterhav Nord": "21 turbines with a total capacity of 180 MW, located off the west coast of Jutland",
  "Nissum Bredning Wave Energy": "Wave energy converters with a total capacity of 1.5 MW",
  "Nordjylland Solar Park": "Solar panels with a total capacity of 75 MW",
  "Nørhede Wind Park": "13 turbines with a total capacity of 39 MW",
  "Tjæreborg Wind Farm": "8 turbines with a total capacity of 24 MW",
  "Zealand Solar Array": "Solar panels with a total capacity of 50 MW",
  "Holstebro Solar Park": "Solar panels with a total capacity of 60 MW",
  "Copenhagen Energy Community": "Rooftop solar installations with a total capacity of 2.5 MW",
  "Samsø Renewable Energy Island": "11 turbines with a total capacity of 22.5 MW",
  "Bornholm Green Energy": "Mixed renewable sources with a total capacity of 35 MW",
  "Djursland Wind Collective": "Community-owned wind turbines with a capacity of 12 MW",
  "Hvide Sande Harbor Wind": "3 turbines with a total capacity of 9 MW",
  "Ringkøbing Solar Field": "Solar panels with a total capacity of 40 MW",
  "Lolland Community Energy": "Mixed renewable sources with a total capacity of 15 MW",
  "Hirsholm Island Offshore": "5 turbines with a total capacity of 20 MW"
};

const ASSET_OPERATORS = {
  "Anholt Offshore Wind Farm": "Ørsted A/S",
  "Kriegers Flak Wind Farm": "Vattenfall",
  "Horns Rev 3": "Vattenfall",
  "Middelgrunden Wind Farm": "Middelgrundens Vindmøllelaug",
  "Rødsand Wind Farm": "E.ON",
  "Vesterhav Nord": "Vattenfall",
  "Nissum Bredning Wave Energy": "Wavestar ApS",
  "Nordjylland Solar Park": "Better Energy",
  "Nørhede Wind Park": "Vestas Wind Systems A/S",
  "Tjæreborg Wind Farm": "Ørsted A/S",
  "Zealand Solar Array": "European Energy",
  "Holstebro Solar Park": "Better Energy",
  "Copenhagen Energy Community": "Copenhagen Municipality",
  "Samsø Renewable Energy Island": "Samsø Energy Academy",
  "Bornholm Green Energy": "Bornholms Energi & Forsyning",
  "Djursland Wind Collective": "Wind People ApS",
  "Hvide Sande Harbor Wind": "Hvide Sande Community Fund",
  "Ringkøbing Solar Field": "European Energy",
  "Lolland Community Energy": "Lolland Municipality",
  "Hirsholm Island Offshore": "Ørsted A/S"
};

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

const certificates = [
  { 
    id: "GH-23985-A", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q1 2025", 
    volume: "45.2 GWh",
    status: "active"
  },
  { 
    id: "GH-23765-B", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Sweden", 
    period: "Q1 2025", 
    volume: "32.8 GWh",
    status: "active"
  },
  { 
    id: "GH-24001-C", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q1 2025", 
    volume: "18.5 GWh",
    status: "active"
  },
  { 
    id: "GH-22456-D", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q4 2023", 
    volume: "41.7 GWh",
    status: "active"
  },
  { 
    id: "GH-22127-E", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q4 2023", 
    volume: "15.2 GWh",
    status: "active"
  },
  { 
    id: "GH-21875-F", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Sweden", 
    period: "Q4 2023", 
    volume: "37.8 GWh",
    status: "active"
  },
  { 
    id: "GH-21003-G", 
    type: "Wind", 
    asset: "Vestas Wind Farm, Denmark", 
    period: "Q3 2023", 
    volume: "38.9 GWh",
    status: "expired"
  },
  { 
    id: "GH-20876-H", 
    type: "Solar", 
    asset: "SolarEdge Farm, Spain", 
    period: "Q3 2023", 
    volume: "21.4 GWh",
    status: "expired"
  },
];

const CorporateTracing = () => {
  const { toast } = useToast();
  const [allocatedGOs, setAllocatedGOs] = useState<GuaranteeOfOrigin[]>([]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map"); // Default to map view
  const [loading, setLoading] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"origin" | "certificates">("origin");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<GuaranteeOfOrigin | null>(null);
  const [isAssetDialogOpen, setIsAssetDialogOpen] = useState(false);
  const [showHourlyMatching, setShowHourlyMatching] = useState(true);
  
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
  
  const handleAssetClick = (asset: GuaranteeOfOrigin) => {
    setSelectedAsset(asset);
    setIsAssetDialogOpen(true);
  };

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
  
  // Filter certificates based on search query
  const filteredCertificates = certificates.filter(cert => 
    cert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.asset.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleHourlyMatching = () => {
    setShowHourlyMatching(!showHourlyMatching);
  };
  
  // Get map center and zoom from assets
  const mapCenter = calculateCenter(allocatedGOs.map(go => go.coordinates));
  const mapZoom = calculateZoomLevel(allocatedGOs.map(go => go.coordinates));
  
  return (
    <motion.div 
      className="space-y-6 bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Traceability</h2>
          <p className="text-muted-foreground">
            Explore the origin and certificates of your renewable energy
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {currentMonth} {currentYear}
          </Button>
        </div>
      </div>
      
      <Tabs 
        defaultValue="origin" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "origin" | "certificates")}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
          <TabsTrigger value="origin" className="flex gap-2">
            <MapPin className="w-4 h-4" />
            Origin Tracking
          </TabsTrigger>
          <TabsTrigger value="certificates" className="flex gap-2">
            <Award className="w-4 h-4" />
            Energy Certificates
          </TabsTrigger>
        </TabsList>
        
        {/* Origin Tracking Tab Content */}
        <TabsContent value="origin" className="space-y-6">
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
                {/* Removed "From x certificates" text */}
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
          
          {/* Reordered: Map view first, then hourly matching details */}
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
              <CardContent className="p-0">
                <div ref={mapContainerRef} className="relative h-[600px]">
                  <AssetMap 
                    assets={allocatedGOs} 
                    initialCenter={mapCenter} 
                    initialZoom={mapZoom}
                    onAssetClick={handleAssetClick}
                    className="w-full h-full"
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Renewable Energy Assets</CardTitle>
                <CardDescription>Assets providing your renewable energy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">Asset Name</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Volume (MWh)</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Grid Area</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Time Matching</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocatedGOs.map((asset) => (
                        <tr 
                          key={asset.id} 
                          className="border-t border-border hover:bg-muted/30 cursor-pointer"
                          onClick={() => handleAssetClick(asset)}
                        >
                          <td className="px-4 py-3 text-sm">{asset.assetName}</td>
                          <td className="px-4 py-3 text-sm">
                            <Badge variant="outline" className={asset.type === 'wind' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}>
                              {asset.type === 'wind' ? 'Wind' : 'Solar'}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{asset.volume.toFixed(1)}</td>
                          <td className="px-4 py-3 text-sm">{asset.gridArea}</td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center">
                              <Progress value={asset.allocationScore} className="h-2 w-16 mr-2" />
                              <span>{asset.allocationScore}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Button variant="ghost" size="sm" onClick={(e) => {
                              e.stopPropagation();
                              handleAssetClick(asset);
                            }}>
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
          
          <Card className="bg-muted/20 border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                Hourly Matching Details
              </CardTitle>
              <CardDescription>
                View your hour-by-hour renewable energy matching status
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-medium">Time Matching Performance</h3>
                    <p className="text-sm text-muted-foreground">Hour-by-hour renewable coverage for May 2025</p>
                  </div>
                  <Button onClick={toggleHourlyMatching} variant="outline" className="gap-2">
                    <Clock className="h-4 w-4" />
                    {showHourlyMatching ? "Hide Hourly Detail" : "View Hourly Detail"}
                  </Button>
                </div>
                
                {showHourlyMatching ? (
                  <div className="border rounded-lg overflow-hidden">
                    <HourlyMatchingView />
                  </div>
                ) : (
                  <div className="text-center p-8 border border-dashed rounded-lg">
                    <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <h3 className="text-muted-foreground font-medium mb-1">Hourly Matching Details</h3>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Click "View Hourly Detail" to see your hour-by-hour renewable energy matching status for this period.
                    </p>
                  </div>
                )}
                
                <div className="flex mt-4">
                  <Button variant="outline" size="sm" className="ml-auto gap-2">
                    <FileDown className="h-4 w-4" />
                    Export Hourly Data (CSV)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Energy Certificates Tab Content */}
        <TabsContent value="certificates" className="space-y-6">
          {/* New Certificate Example Component */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Certificate Overview
                </CardTitle>
                <CardDescription>
                  Your Guarantee of Origin (GO) certificates show proof of renewable energy consumption
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="relative md:w-1/2">
                    <div className="bg-[url('https://images.unsplash.com/photo-1548337138-e87d889cc369?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80')] bg-cover bg-center h-64 rounded-lg"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex flex-col justify-end p-4">
                      <div className="flex justify-between items-center mb-2">
                        <Badge className="bg-green-500 text-white border-none">Active</Badge>
                        <div className="flex items-center gap-1 text-white text-xs">
                          <Calendar size={12} />
                          <span>May 2025</span>
                        </div>
                      </div>
                      <h3 className="text-white font-semibold text-lg">Guarantee of Origin</h3>
                      <div className="text-white/80 text-sm">Certificate #GH-25585-A</div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-500/20 text-blue-100 border-blue-400/30">Wind</Badge>
                        <Badge variant="outline" className="bg-yellow-500/20 text-yellow-100 border-yellow-400/30">Solar</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-lg">Certificate Details</h3>
                        <p className="text-sm text-muted-foreground">
                          This certificate verifies your consumption of renewable energy from specific sources
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Total Volume</div>
                          <div className="font-medium">78.0 GWh</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Time Period</div>
                          <div className="font-medium">Q2 2025</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Issuing Authority</div>
                          <div className="font-medium">Energinet</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-sm text-muted-foreground">Energy Mix</div>
                          <div className="font-medium">70% Wind / 30% Solar</div>
                        </div>
                      </div>
                      
                      <div className="space-y-2 pt-2">
                        <div className="text-sm text-muted-foreground">Time Matching</div>
                        <div className="space-y-1">
                          <div className="flex justify-between items-center text-sm">
                            <span>Hourly Matching Score</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <Progress value={85} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex gap-3 pt-3">
                        <Button className="w-1/2">View Certificate</Button>
                        <Button variant="outline" className="w-1/2">Download PDF</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Search and filter */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search certificates by ID, asset or type..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
          
          {/* Certificates List */}
          <Card>
            <CardHeader>
              <CardTitle>Your Energy Certificates</CardTitle>
              <CardDescription>Certificates that verify your renewable energy consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Certificate ID</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Energy Type</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Asset</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Period</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Volume</th>
                      <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCertificates.map((cert, index) => (
                      <tr key={cert.id} className="border-t border-border hover:bg-muted/30">
                        <td className="px-4 py-3 text-sm font-medium">{cert.id}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge variant="outline" className={cert.type === 'Wind' ? 'bg-blue-500/10 text-blue-500' : 'bg-amber-500/10 text-amber-500'}>
                            {cert.type}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">{cert.asset}</td>
                        <td className="px-4 py-3 text-sm">{cert.period}</td>
                        <td className="px-4 py-3 text-sm">{cert.volume}</td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={cert.status === 'active' ? 
                            'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 
                            'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'}>
                            {cert.status === 'active' ? 'Active' : 'Expired'}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" className="gap-1">
                            <FileText size={14} />
                            View
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-1">
                            <Download size={14} />
                            PDF
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Asset Detail Dialog - Fix positioning issue */}
      <Dialog open={isAssetDialogOpen} onOpenChange={setIsAssetDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" style={{ zIndex: 1000 }}>
          <DialogHeader>
            <DialogTitle>{selectedAsset?.assetName || "Asset Details"}</DialogTitle>
            <DialogDescription>
              Detailed information about this renewable energy asset
            </DialogDescription>
          </DialogHeader>
          {selectedAsset && (
            <div className="space-y-4">
              <div className="bg-muted rounded-md p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Asset Type</div>
                    <div className="font-medium capitalize">
                      {selectedAsset.type}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Location</div>
                    <div className="font-medium">
                      {selectedAsset.gridArea}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Coordinates</div>
                    <div className="font-medium">
                      {selectedAsset.coordinates.lat.toFixed(4)}, {selectedAsset.coordinates.lng.toFixed(4)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Operator</div>
                    <div className="font-medium">
                      {ASSET_OPERATORS[selectedAsset.assetName as keyof typeof ASSET_OPERATORS] || "Unknown"}
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Asset Description</h3>
                <p className="text-sm text-muted-foreground">
                  {ASSET_DESCRIPTIONS[selectedAsset.assetName as keyof typeof ASSET_DESCRIPTIONS] || 
                  `This is a ${selectedAsset.type} energy asset located in ${selectedAsset.gridArea}.`}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Energy Allocation</h3>
                <div className="bg-muted/50 rounded-md p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Volume allocated to you</span>
                      <span className="font-medium">{selectedAsset.volume.toFixed(1)} MWh</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Time matching score</span>
                      <span className="font-medium">{selectedAsset.allocationScore}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Production timestamp</span>
                      <span className="font-medium">{new Date(selectedAsset.productionTimestamp).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Allocation timestamp</span>
                      <span className="font-medium">{new Date(selectedAsset.allocationTimestamp).toLocaleString()}</span>
                    </div>
                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between text-sm">
                        <span>Consumption coverage</span>
                        <span className="font-medium">~{Math.round(selectedAsset.volume / totalVolume * 100)}% of your total</span>
                      </div>
                      <Progress value={Math.round(selectedAsset.volume / totalVolume * 100)} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button className="mr-2 gap-2">
                  <FileText className="h-4 w-4" />
                  View Certificate
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileDown className="h-4 w-4" />
                  Export Data
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default CorporateTracing;
