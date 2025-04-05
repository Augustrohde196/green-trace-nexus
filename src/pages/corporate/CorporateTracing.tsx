
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { goService } from "@/services/go-service";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { GOTrackingTable } from "@/components/go/go-tracking-table";
import { AssetMap } from "@/components/map/asset-map";
import { Button } from "@/components/ui/button";
import { Calendar, Download, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CorporateTracing = () => {
  const [allocatedGOs, setAllocatedGOs] = useState<GuaranteeOfOrigin[]>([]);
  const [viewMode, setViewMode] = useState<"map" | "list">("map");
  const [loading, setLoading] = useState(true);
  
  // Get current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Company ID would normally come from auth context
  const companyId = "company-1";
  
  useEffect(() => {
    // Fetch allocated GOs for the current company
    setLoading(true);
    // In a real app, filter by date range for current/last month
    const gos = goService.getGOsByCustomer(companyId);
    setAllocatedGOs(gos);
    setLoading(false);
  }, [companyId]);
  
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
              {Math.round((windVolume / totalVolume) * 100)}% of total
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
              {Math.round((solarVolume / totalVolume) * 100)}% of total
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
              {Math.round(allocatedGOs.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / allocatedGOs.length)}
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
          <MapPin className="mr-2 h-4 w-4" />
          Map View
        </Button>
        <Button 
          variant={viewMode === "list" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("list")}
        >
          <Calendar className="mr-2 h-4 w-4" />
          List View
        </Button>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>
      
      {viewMode === "map" ? (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="h-[600px]">
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
    </div>
  );
};

export default CorporateTracing;
