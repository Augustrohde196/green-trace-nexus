
import { useEffect, useRef, useState } from "react";
import { MapPin, Wind, Sun, Info, Map as MapIcon } from "lucide-react";
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
import { Card } from "@/components/ui/card";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// This would be stored in an environment variable in a real application
// For this demo, we'll use a public token with restricted capabilities
const MAPBOX_TOKEN = 'pk.eyJ1IjoibHVjaWRjaGFydHMiLCJhIjoiY2luMjRzMnluMGRsdXdlbTQxdGVydmVrZSJ9.KQ8YQOSUBRGvIHXH2rGYAw';

// Denmark boundaries for map centering
const DENMARK_CENTER = [10.4, 56.0];
const DENMARK_BOUNDS = [
  [8.0, 54.5], // Southwest coordinates
  [13.0, 57.8]  // Northeast coordinates
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
  
  // Group GOs by asset for map display
  const assetGOMap = guaranteesOfOrigin.reduce((map, go) => {
    if (!map[go.assetId]) {
      map[go.assetId] = [];
    }
    map[go.assetId].push(go);
    return map;
  }, {} as Record<string, GuaranteeOfOrigin[]>);
  
  const assetData = Object.entries(assetGOMap).map(([assetId, gos]) => {
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
  });
  
  useEffect(() => {
    // Initialize map
    if (!mapContainer.current || map.current) return;
    
    mapboxgl.accessToken = MAPBOX_TOKEN;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: DENMARK_CENTER,
      zoom: 6,
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
        // Add Denmark's regions as a background layer
        map.current.addSource('denmark-regions', {
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
            }
          }
        });
        
        map.current.addLayer({
          id: 'denmark-outline',
          type: 'line',
          source: 'denmark-regions',
          layout: {},
          paint: {
            'line-color': '#627BC1',
            'line-width': 2
          }
        });
      }
      
      setMapLoaded(true);
    });
    
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);
  
  // Add markers when map is loaded
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
      
      // Create popup with asset information
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
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
      new mapboxgl.Marker(markerEl)
        .setLngLat([asset.coordinates.lng, asset.coordinates.lat])
        .setPopup(popup)
        .addTo(map.current!);
    });
  }, [assetData, mapLoaded, heatmapMode]);
  
  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      
      {/* Map controls */}
      <div className="absolute top-4 left-4 space-y-2 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white dark:bg-gray-800 shadow-md"
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
      </div>
      
      {/* Map legend */}
      <Card className="absolute bottom-4 left-4 z-10 p-2 shadow-md bg-white/90 dark:bg-gray-800/90">
        <div className="text-sm font-medium mb-1">Certificate Sources</div>
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
      </Card>
    </div>
  );
}
