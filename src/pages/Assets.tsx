
import { useState, useMemo } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { 
  Wind, 
  Sun, 
  MapPin, 
  Calendar,
  Activity,
  Plus,
  Search,
  Grid2X2,
  List,
  Pencil,
  Trash2,
  Check,
  AlertTriangle
} from "lucide-react";
import { mockAssets } from "@/data/mock-data";
import { Asset } from "@/data/models";
import { PortfolioDistribution } from "@/components/assets/portfolio-distribution";
import { motion } from "framer-motion";

// Mock data for maintenance schedules
const mockMaintenanceSchedules = [
  { assetId: "w1", date: "2025-05-03", description: "Routine maintenance" },
  { assetId: "w2", date: "2025-05-04", description: "Turbine inspection" },
  { assetId: "s1", date: "2025-05-05", description: "Panel cleaning" },
];

export default function Assets() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddAssetOpen, setIsAddAssetOpen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Filter assets based on search query
  const filteredAssets = useMemo(() => {
    return mockAssets.filter(asset => 
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Calculate asset health stats
  const assetHealth = useMemo(() => {
    return {
      online: mockAssets.filter(a => a.status === "online").length,
      offline: mockAssets.filter(a => a.status === "offline").length,
      maintenance: mockAssets.filter(a => a.status === "maintenance").length
    };
  }, []);

  // Get upcoming maintenance schedules
  const upcomingMaintenance = useMemo(() => {
    const now = new Date();
    const threeDaysLater = new Date(now);
    threeDaysLater.setDate(now.getDate() + 3);
    
    return mockMaintenanceSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.date);
      return scheduleDate >= now && scheduleDate <= threeDaysLater;
    }).map(schedule => {
      const asset = mockAssets.find(a => a.id === schedule.assetId);
      return {
        ...schedule,
        assetName: asset ? asset.name : "Unknown Asset"
      };
    });
  }, []);

  // Define status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case "online":
        return "success";
      case "offline":
        return "destructive";
      case "maintenance":
        return "warning";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold">Renewable Assets</h1>
          <p className="text-muted-foreground">Manage your renewable energy assets</p>
        </div>
        <Button 
          onClick={() => setIsAddAssetOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Asset
        </Button>
      </motion.div>

      {/* Portfolio Distribution Section - with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <PortfolioDistribution assets={mockAssets} />
      </motion.div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search assets by name or location..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Asset Inventory */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Asset Inventory</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid2X2 size={16} />
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                <List size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === "table" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Capacity (MW)</TableHead>
                    <TableHead>Available (MW)</TableHead>
                    <TableHead>Installation</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data Integration</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssets.map((asset) => (
                    <TableRow key={asset.id} className="cursor-pointer hover:bg-muted/80">
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
                        <Badge 
                          variant={getStatusBadgeVariant(asset.status || "online")}
                          className="capitalize"
                        >
                          {asset.status || "online"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {asset.dataIntegrated ? (
                          <div className="flex items-center text-green-500">
                            <Check size={16} className="mr-1" />
                            Up-to-date
                          </div>
                        ) : (
                          <div className="flex items-center text-amber-500">
                            <AlertTriangle size={16} className="mr-1" />
                            Manual data
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map((asset) => (
                  <Card key={asset.id} className="cursor-pointer hover:bg-muted/30">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{asset.name}</CardTitle>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3 mr-1" />
                            {asset.location}
                          </div>
                        </div>
                        {asset.type === "wind" ? (
                          <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                            <Wind className="h-4 w-4 text-blue-500" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 bg-amber-100 dark:bg-amber-900/20 rounded-full flex items-center justify-center">
                            <Sun className="h-4 w-4 text-amber-500" />
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Capacity:</span>
                          <span>{asset.capacity} MW</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Available:</span>
                          <span>{asset.availableCapacity} MW</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Installation:</span>
                          <span>{asset.installationType || "FTM"}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span>Status:</span>
                          <Badge 
                            variant={getStatusBadgeVariant(asset.status || "online")}
                            className="capitalize"
                          >
                            {asset.status || "online"}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Data:</span>
                          {asset.dataIntegrated ? (
                            <span className="flex items-center text-green-500">
                              <Check size={14} className="mr-1" />
                              Up-to-date
                            </span>
                          ) : (
                            <span className="flex items-center text-amber-500">
                              <AlertTriangle size={14} className="mr-1" />
                              Manual
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="ghost" size="sm">
                          <Pencil className="h-3.5 w-3.5 mr-1" />
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500">
                          <Trash2 className="h-3.5 w-3.5 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Asset Health and Maintenance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Asset Health Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Asset Health Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="font-bold text-green-600">{assetHealth.online}</span>
                </div>
                <div>
                  <div className="text-green-600 font-medium">Online</div>
                  <div className="text-xs text-muted-foreground">Assets operating normally</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
                  <span className="font-bold text-red-600">{assetHealth.offline}</span>
                </div>
                <div>
                  <div className="text-red-600 font-medium">Offline</div>
                  <div className="text-xs text-muted-foreground">Assets currently unavailable</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                  <span className="font-bold text-amber-600">{assetHealth.maintenance}</span>
                </div>
                <div>
                  <div className="text-amber-600 font-medium">Maintenance</div>
                  <div className="text-xs text-muted-foreground">Assets undergoing planned work</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Maintenance Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Maintenance Schedule
              </CardTitle>
              <CardDescription>
                Upcoming maintenance in the next 3 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingMaintenance.length > 0 ? (
                <div className="space-y-4">
                  {upcomingMaintenance.map((schedule, index) => (
                    <div key={index} className="border-l-2 border-amber-400 pl-3">
                      <div className="font-medium">{schedule.assetName}</div>
                      <div className="text-sm text-muted-foreground">{schedule.description}</div>
                      <div className="text-xs text-amber-600 mt-1">
                        {new Date(schedule.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No scheduled maintenance in the next 3 days</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Add Asset Sheet */}
      <Sheet open={isAddAssetOpen} onOpenChange={setIsAddAssetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Renewable Asset</SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="assetName" className="text-sm font-medium">Asset Name</label>
              <Input id="assetName" placeholder="Enter asset name" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Asset Type</label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="wind" name="assetType" className="h-4 w-4" />
                  <label htmlFor="wind" className="text-sm">Wind</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="solar" name="assetType" className="h-4 w-4" />
                  <label htmlFor="solar" className="text-sm">Solar</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium">Location</label>
              <div className="relative">
                <Input id="location" placeholder="Enter location or coordinates" />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 top-0"
                >
                  <MapPin size={16} />
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="capacity" className="text-sm font-medium">Energy Capacity (MW)</label>
              <Input id="capacity" type="number" placeholder="0" />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="availableGO" className="text-sm font-medium">Available GO Allocation (%)</label>
              <Input id="availableGO" type="number" placeholder="100" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Installation</label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="ftm" name="installation" className="h-4 w-4" />
                  <label htmlFor="ftm" className="text-sm">Front of the meter (FTM)</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="btm" name="installation" className="h-4 w-4" />
                  <label htmlFor="btm" className="text-sm">Behind the meter (BTM)</label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input type="radio" id="online" name="status" className="h-4 w-4" />
                  <label htmlFor="online" className="text-sm">Online</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="offline" name="status" className="h-4 w-4" />
                  <label htmlFor="offline" className="text-sm">Offline</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="radio" id="maintenance" name="status" className="h-4 w-4" />
                  <label htmlFor="maintenance" className="text-sm">Maintenance</label>
                </div>
              </div>
            </div>
            
            <div className="pt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddAssetOpen(false)}>Cancel</Button>
              <Button>Add Asset</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
