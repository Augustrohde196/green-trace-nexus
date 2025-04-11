
import { useEffect, useRef, useState } from "react";
import { MapPin, Wind, Sun, Info, Map as MapIcon, Filter, ZoomIn, ZoomOut } from "lucide-react";
import { GuaranteeOfOrigin } from "@/data/go-models";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This would be stored in an environment variable in a real application
// For this demo, we'll use a public token with restricted capabilities
const MAPBOX_TOKEN = 'pk.eyJ1IjoibHVjaWRjaGFydHMiLCJhIjoiY2luMjRzMnluMGRsdXdlbTQxdGVydmVrZSJ9.KQ8YQOSUBRGvIHXH2rGYAw';

// Denmark boundaries for map centering
// Using proper LngLatLike type (as tuples)
const DENMARK_CENTER: [number, number] = [10.4, 56.0];
const DENMARK_BOUNDS: [[number, number], [number, number]] = [
  [8.0, 54.5], // Southwest coordinates
  [13.0, 57.8]  // Northeast coordinates
];

// Danish administrative regions for visualization
const DENMARK_REGIONS = [
  {
    name: "North Jutland",
    color: "#88CCEE",
    coordinates: [
      [9.70, 57.50], [8.70, 57.00], [8.10, 56.55], 
      [8.80, 56.10], [9.40, 56.20], [10.20, 56.60],
      [10.60, 57.10], [10.20, 57.75], [9.70, 57.50]
    ]
  },
  {
    name: "Central Jutland",
    color: "#44AA99",
    coordinates: [
      [10.20, 56.60], [9.40, 56.20], [8.80, 56.10], 
      [8.40, 55.30], [9.50, 55.10], [10.90, 55.40],
      [11.20, 56.20], [10.20, 56.60]
    ]
  },
  {
    name: "South Denmark",
    color: "#117733",
    coordinates: [
      [8.40, 55.30], [9.50, 55.10], [10.90, 55.40],
      [11.70, 54.80], [10.80, 54.60], [9.20, 54.90],
      [8.40, 55.30]
    ]
  },
  {
    name: "Zealand",
    color: "#DDCC77",
    coordinates: [
      [11.20, 56.20], [10.90, 55.40], [11.70, 54.80],
      [12.50, 54.95], [12.80, 55.60], [12.10, 56.00],
      [11.20, 56.20]
    ]
  },
  {
    name: "Capital Region",
    color: "#CC6677",
    coordinates: [
      [12.10, 56.00], [12.80, 55.60], [12.50, 54.95],
      [13.10, 55.20], [12.70, 55.90], [12.10, 56.00]
    ]
  }
];

interface AssetMapProps {
  guaranteesOfOrigin: GuaranteeOfOrigin[];
}

export function AssetMap({ guaranteesOfOrigin }: AssetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<GuaranteeOfOrigin | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [heatmapMode, setHeatmapMode] = useState(true);
  const [filterType, setFilterType] = useState<"all" | "wind" | "solar">("all");
  const [showRegions, setShowRegions] = useState(true);
  
  // Group GOs by asset for map display
  const assetGOMap = guaranteesOfOrigin.reduce((map, go) => {
    if (!map[go.assetId]) {
      map[go.assetId] = [];
    }
    map[go.assetId].push(go);
    return map;
  }, {} as Record<string, GuaranteeOfOrigin[]>);
  
  const assetData = Object.entries(assetGOMap)
    .map(([assetId, gos]) => {
      const totalVolume = gos.reduce((sum, go) => sum + go.volume, 0);
      const averageScore = Math.round(
        gos.reduce((sum, go) => sum + (go.allocationScore || 0), 0) / gos.length
      );
      
      return {
        id: assetId,
        name: gos[0].assetName,
        type: gos[0].type,
        location: gos[0].gridArea,
        coordinates: gos[0].coordinates,
        totalCertificates: gos.length,
        totalVolume,
        averageScore,
        gos
      };
    })
    .filter(asset => filterType === "all" || asset.type === filterType);
  
  useEffect(() => {
    // Initialize map
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: DENMARK_CENTER,
      zoom: 6.5,
      minZoom: 5,
      maxZoom: 12,
      bounds: DENMARK_BOUNDS,
      fitBoundsOptions: { padding: 40 }
    });
    
    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    
    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl(), 'top-right');
    
    // Add scale control
    map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left');
    
    map.current.on('load', () => {
      // Add Denmark's borders for better visualization
      if (map.current) {
        // Add Denmark outline
        map.current.addSource('denmark-outline', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [8.0, 54.5],  // Southwest Jutland
                [8.0, 57.8],  // Northwest Jutland
                [13.0, 57.8], // Northeast
                [13.0, 54.5], // Southeast
                [8.0, 54.5]   // Back to start
              ]]
            },
            properties: {} // Required empty properties object
          }
        });
        
        map.current.addLayer({
          id: 'denmark-outline',
          type: 'line',
          source: 'denmark-outline',
          layout: {},
          paint: {
            'line-color': '#627BC1',
            'line-width': 2
          }
        });
        
        // Add regions as separate layers
        DENMARK_REGIONS.forEach((region, index) => {
          const regionId = `region-${index}`;
          
          // Convert region coordinates to proper GeoJSON format
          const coordinates = [region.coordinates.map(coord => [coord[0], coord[1]])];
          
          map.current!.addSource(regionId, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates
              },
              properties: {
                name: region.name
              }
            }
          });
          
          map.current!.addLayer({
            id: `${regionId}-fill`,
            type: 'fill',
            source: regionId,
            layout: {
              visibility: showRegions ? 'visible' : 'none'
            },
            paint: {
              'fill-color': region.color,
              'fill-opacity': 0.2
            }
          });
          
          map.current!.addLayer({
            id: `${regionId}-line`,
            type: 'line',
            source: regionId,
            layout: {
              visibility: showRegions ? 'visible' : 'none'
            },
            paint: {
              'line-color': region.color,
              'line-width': 1.5,
              'line-opacity': 0.8
            }
          });
          
          // Add region name labels
          const centerLat = region.coordinates.reduce((sum, coord) => sum + coord[1], 0) / region.coordinates.length;
          const centerLng = region.coordinates.reduce((sum, coord) => sum + coord[0], 0) / region.coordinates.length;
          
          map.current!.addSource(`${regionId}-label`, {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [centerLng, centerLat]
              },
              properties: {
                name: region.name
              }
            }
          });
          
          map.current!.addLayer({
            id: `${regionId}-label`,
            type: 'symbol',
            source: `${regionId}-label`,
            layout: {
              'visibility': showRegions ? 'visible' : 'none',
              'text-field': ['get', 'name'],
              'text-font': ['DIN Pro Medium', 'Arial Unicode MS Bold'],
              'text-size': 12,
              'text-offset': [0, 0],
              'text-anchor': 'center'
            },
            paint: {
              'text-color': '#333',
              'text-halo-color': '#fff',
              'text-halo-width': 1.5
            }
          });
        });
      }
      
      setMapLoaded(true);
    });
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);
  
  // Update region visibility when showRegions changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    DENMARK_REGIONS.forEach((region, index) => {
      const regionId = `region-${index}`;
      
      map.current!.setLayoutProperty(
        `${regionId}-fill`,
        'visibility',
        showRegions ? 'visible' : 'none'
      );
      
      map.current!.setLayoutProperty(
        `${regionId}-line`,
        'visibility',
        showRegions ? 'visible' : 'none'
      );
      
      map.current!.setLayoutProperty(
        `${regionId}-label`,
        'visibility',
        showRegions ? 'visible' : 'none'
      );
    });
  }, [showRegions, mapLoaded]);
  
  // Add markers when map is loaded or when filter changes
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Remove any existing markers first
    const markers = document.querySelectorAll('.mapboxgl-marker');
    markers.forEach(marker => marker.remove());
    
    // Add new markers for each asset
    assetData.forEach(asset => {
      // Create custom marker element
      const markerEl = document.createElement('div');
      markerEl.className = 'flex items-center justify-center rounded-full shadow-lg cursor-pointer transition-all duration-300 hover:scale-110';
      
      // Set size based on volume in heatmap mode
      const size = heatmapMode 
        ? Math.max(30, Math.min(80, 30 + (asset.totalVolume / 50))) 
        : 40;
      
      markerEl.style.width = `${size}px`;
      markerEl.style.height = `${size}px`;
      markerEl.style.backgroundColor = asset.type === 'wind' ? '#3b82f6' : '#f59e0b';
      
      // Create icon element
      const iconEl = document.createElement('div');
      iconEl.className = 'text-white';
      iconEl.innerHTML = asset.type === 'wind' 
        ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>'
        : '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>';
      
      markerEl.appendChild(iconEl);
      
      // Add count indicator for multiple certificates
      if (asset.totalCertificates > 1) {
        const countEl = document.createElement('div');
        countEl.className = 'absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2';
        countEl.style.borderColor = asset.type === 'wind' ? '#3b82f6' : '#f59e0b';
        countEl.textContent = asset.totalCertificates.toString();
        markerEl.appendChild(countEl);
      }
      
      // Add volume indicator
      const volumeEl = document.createElement('div');
      volumeEl.className = 'absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 text-xs font-medium rounded-full px-2 py-0.5 shadow border';
      volumeEl.style.borderColor = asset.type === 'wind' ? '#3b82f6' : '#f59e0b';
      volumeEl.textContent = `${asset.totalVolume} MWh`;
      markerEl.appendChild(volumeEl);
      
      // Add click handler to show detailed info
      markerEl.addEventListener('click', () => {
        // Find the actual GO object
        const go = asset.gos[0];
        setSelectedAsset(go);
      });
      
      // Create popup with asset information
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: false,
        closeOnClick: false,
        maxWidth: '300px'
      }).setHTML(`
        <div class="p-2">
          <h3 class="font-medium text-base">${asset.name}</h3>
          <div class="text-sm font-medium flex items-center gap-1 my-1">
            ${asset.type === 'wind' 
              ? '<span class="text-blue-500">Wind Power</span>' 
              : '<span class="text-amber-500">Solar Power</span>'}
          </div>
          <div class="grid grid-cols-2 gap-1 text-xs mt-1">
            <div>
              <p class="text-gray-500">Location:</p>
              <p class="font-medium">${asset.location}</p>
            </div>
            <div>
              <p class="text-gray-500">Total Volume:</p>
              <p class="font-medium">${asset.totalVolume} MWh</p>
            </div>
            <div>
              <p class="text-gray-500">Certificates:</p>
              <p class="font-medium">${asset.totalCertificates}</p>
            </div>
            <div>
              <p class="text-gray-500">Match Score:</p>
              <p class="font-medium">${asset.averageScore}%</p>
            </div>
          </div>
        </div>
      `);
      
      // Add marker to map
      const marker = new mapboxgl.Marker(markerEl)
        .setLngLat([asset.coordinates.lng, asset.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      // Show popup on hover
      markerEl.addEventListener('mouseenter', () => {
        marker.getPopup().addTo(map.current!);
      });
      
      markerEl.addEventListener('mouseleave', () => {
        marker.getPopup().remove();
      });
    });
  }, [assetData, mapLoaded, heatmapMode, filterType]);
  
  const zoomIn = () => {
    map.current?.zoomIn();
  };
  
  const zoomOut = () => {
    map.current?.zoomOut();
  };
  
  const flyToAsset = (asset: GuaranteeOfOrigin) => {
    if (!map.current) return;
    
    map.current.flyTo({
      center: [asset.coordinates.lng, asset.coordinates.lat],
      zoom: 9,
      duration: 1500,
      essential: true
    });
  };
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 space-y-2 z-10">
        <Card className="p-2 shadow-md">
          <div className="flex flex-col gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white dark:bg-gray-800"
                    onClick={() => setHeatmapMode(!heatmapMode)}
                  >
                    <MapIcon className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{heatmapMode ? "Switch to Marker View" : "Switch to Heatmap View"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white dark:bg-gray-800"
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-44 p-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Filter by Type</p>
                  <div className="flex flex-col gap-1.5">
                    <Button 
                      variant={filterType === "all" ? "default" : "outline"} 
                      size="sm" 
                      onClick={() => setFilterType("all")}
                      className="justify-start h-8"
                    >
                      All Types
                    </Button>
                    <Button 
                      variant={filterType === "wind" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFilterType("wind")}
                      className="justify-start h-8"
                    >
                      <Wind className="h-3.5 w-3.5 mr-1.5" />
                      Wind Power
                    </Button>
                    <Button 
                      variant={filterType === "solar" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setFilterType("solar")}
                      className="justify-start h-8"
                    >
                      <Sun className="h-3.5 w-3.5 mr-1.5" />
                      Solar Power
                    </Button>
                  </div>
                  <div className="pt-2 border-t">
                    <p className="text-sm font-medium mb-1.5">Display Options</p>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 h-8"
                        onClick={() => setShowRegions(!showRegions)}
                      >
                        {showRegions ? "Hide Regions" : "Show Regions"}
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="bg-white dark:bg-gray-800"
                    onClick={zoomIn}
                  >
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom In</p>
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
                    onClick={zoomOut}
                  >
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Zoom Out</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Card>
      </div>
      
      {/* Map legend */}
      <Card className="absolute bottom-4 left-4 z-10 p-3 shadow-md bg-white/90 dark:bg-gray-800/90">
        <div className="text-sm font-medium mb-2">Certificate Sources</div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Badge className="bg-blue-500 h-3 w-3 p-0" />
              <span>Wind</span>
            </div>
            <div className="flex items-center gap-1">
              <Badge className="bg-amber-500 h-3 w-3 p-0" />
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
          
          <div className="text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Click on a marker to view details</span>
            </div>
          </div>
        </div>
      </Card>
      
      {/* Asset detail sidebar */}
      {selectedAsset && (
        <Card className="absolute top-4 right-4 z-10 w-64 shadow-lg bg-white/95 dark:bg-gray-800/95">
          <div className="absolute top-2 right-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6" 
              onClick={() => setSelectedAsset(null)}
            >
              &times;
            </Button>
          </div>
          <CardContent className="p-4">
            <h3 className="font-medium text-base mb-2">{selectedAsset.assetName}</h3>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center">
                <Badge className={selectedAsset.type === 'wind' ? 'bg-blue-500' : 'bg-amber-500'}>
                  {selectedAsset.type === 'wind' ? 'Wind Power' : 'Solar Power'}
                </Badge>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Grid Area</p>
                <p className="font-medium">{selectedAsset.gridArea}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Certificate ID</p>
                <p className="font-medium text-xs">{selectedAsset.id}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Production Date</p>
                <p className="font-medium">{formatDate(selectedAsset.productionTimestamp)}</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Volume</p>
                <p className="font-medium">{selectedAsset.volume} MWh</p>
              </div>
              
              <div>
                <p className="text-xs text-muted-foreground">Matching Score</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full" 
                    style={{ width: `${selectedAsset.allocationScore || 0}%` }}
                  ></div>
                </div>
                <p className="text-right text-xs mt-0.5">{selectedAsset.allocationScore || 0}%</p>
              </div>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full" 
                  onClick={() => flyToAsset(selectedAsset)}
                >
                  <MapPin className="h-3.5 w-3.5 mr-1.5" />
                  Center on Map
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
