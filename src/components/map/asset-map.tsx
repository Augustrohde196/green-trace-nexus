
import React, { useEffect, useRef } from 'react';
import { GuaranteeOfOrigin } from "@/data/go-models";
import { Badge } from "@/components/ui/badge";
import { Wind, Sun } from "lucide-react";

interface AssetMapProps {
  assets: GuaranteeOfOrigin[];
  initialCenter: { lat: number; lng: number };
  initialZoom: number;
  onAssetClick?: (asset: GuaranteeOfOrigin) => void;
  className?: string;
}

const MAPBOX_TOKEN = 'pk.eyJ1IjoibG92YWJsZWRldiIsImEiOiJjbHl5a3o1OXgwNnV3MmpvYTZ2ZjNrbTdlIn0.NLuM76Vr5oFhVzRSdlbLxw';

export function AssetMap({ 
  assets, 
  initialCenter, 
  initialZoom = 7,
  onAssetClick,
  className = ""
}: AssetMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);
  const markers = useRef<any[]>([]);
  const mapInitialized = useRef<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Don't run on server-side

    // Only import mapboxgl on the client side
    const loadMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        await import('mapbox-gl/dist/mapbox-gl.css');
        
        if (!mapContainer.current) return;
        
        // Clean up previous map if it exists
        if (map.current) {
          // Remove existing markers first
          if (markers.current && markers.current.length) {
            markers.current.forEach(marker => {
              if (marker) marker.remove();
            });
            markers.current = [];
          }
          
          // Check if map is initialized before trying to remove it
          if (mapInitialized.current) {
            try {
              map.current.remove();
            } catch (e) {
              console.warn('Error removing map:', e);
            }
          }
        }

        mapboxgl.default.accessToken = MAPBOX_TOKEN;

        // Use the provided center or default to Denmark
        const center = initialCenter && initialCenter.lat && initialCenter.lng ? 
          [initialCenter.lng, initialCenter.lat] as [number, number] : 
          [9.5018, 56.2639] as [number, number]; // Denmark's center coordinates

        // Updated map style to light blue background to match screenshot
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/light-v11',
          center: center,
          zoom: initialZoom || 7,
        });
        
        // Mark map as initialized after it's created
        mapInitialized.current = true;

        // Add navigation controls
        map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
        
        // Customize the map to have a light blue background
        map.current.on('load', () => {
          // Add light blue background
          map.current.addLayer({
            id: 'background',
            type: 'background',
            paint: {
              'background-color': '#f0f8ff' // Light blue background
            }
          }, 'land');
          
          console.log('Map loaded, adding markers for', assets.length, 'assets');
          // Clear existing markers
          if (markers.current && markers.current.length) {
            markers.current.forEach(marker => {
              if (marker) marker.remove();
            });
            markers.current = [];
          }
          
          // Add markers for each asset
          if (assets && assets.length > 0) {
            const newMarkers = [];
            
            for (const asset of assets) {
              if (!asset.coordinates || !asset.coordinates.lat || !asset.coordinates.lng) {
                console.error('Asset has invalid coordinates:', asset);
                continue;
              }
              
              const { coordinates, type, assetName, volume } = asset;
              
              // Create marker element - updated to match screenshot
              const el = document.createElement('div');
              el.className = 'relative group cursor-pointer';
              
              // Create popup content - updated design to match screenshot
              const popupContent = document.createElement('div');
              popupContent.className = 'absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-md shadow-lg text-sm hidden group-hover:block whitespace-nowrap z-10 w-64';
              popupContent.innerHTML = `
                <div class="font-bold mb-2">${assetName}</div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <div class="text-xs text-gray-500">Type:</div>
                    <div>${type === 'wind' ? 'Wind' : 'Solar'}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">Location:</div>
                    <div>Denmark</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500">Supply:</div>
                    <div>${Math.round(volume)} MWh (${Math.round(volume / totalVolume * 100)}%)</div>
                  </div>
                </div>
              `;
              
              // Create the marker icon - using custom design to match screenshot
              const markerIcon = document.createElement('div');
              
              if (type === 'wind') {
                // Wind icon with blue background
                markerIcon.className = 'flex items-center justify-center';
                markerIcon.innerHTML = `
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                    </svg>
                  </div>
                `;
              } else {
                // Solar icon with amber background
                markerIcon.className = 'flex items-center justify-center';
                markerIcon.innerHTML = `
                  <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </div>
                `;
              }
              
              // Add name label under the icon to match screenshot
              const nameLabel = document.createElement('div');
              nameLabel.className = 'absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-sm text-xs whitespace-nowrap font-medium';
              nameLabel.textContent = assetName;
              
              el.appendChild(markerIcon);
              el.appendChild(nameLabel);
              el.appendChild(popupContent);
              
              // Create and add marker
              try {
                const marker = new mapboxgl.default.Marker(el)
                  .setLngLat([coordinates.lng, coordinates.lat] as [number, number])
                  .addTo(map.current);
                
                // Add click event
                el.addEventListener('click', () => {
                  if (onAssetClick) {
                    onAssetClick(asset);
                  }
                });
                
                newMarkers.push(marker);
              } catch (err) {
                console.error('Error creating marker:', err);
              }
            }
            
            markers.current = newMarkers.filter(Boolean);
          }
        });
      } catch (error) {
        console.error("Error loading mapbox-gl:", error);
      }
    };

    loadMap();

    // Cleanup function
    return () => {
      // First remove all markers
      if (markers.current && markers.current.length) {
        markers.current.forEach(marker => {
          try {
            if (marker) marker.remove();
          } catch (e) {
            console.warn('Error removing marker:', e);
          }
        });
        markers.current = [];
      }
      
      // Then remove the map if it was initialized
      if (map.current && mapInitialized.current) {
        try {
          map.current.remove();
          mapInitialized.current = false;
        } catch (e) {
          console.warn('Error cleaning up map:', e);
        }
      }
    };
  }, [assets, initialCenter, initialZoom, onAssetClick]);

  // Calculate total volume for percentage display in marker popups
  const totalVolume = assets.reduce((sum, asset) => sum + asset.volume, 0);

  return (
    <div className={className}>
      <div ref={mapContainer} className="w-full h-full rounded-md overflow-hidden" />
      <div className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 p-2 rounded-md shadow-md">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            <div className="bg-blue-500 rounded-full h-3 w-3 mr-1"></div>
            <span>Wind</span>
          </div>
          <div className="flex items-center ml-2">
            <div className="bg-amber-500 rounded-full h-3 w-3 mr-1"></div>
            <span>Solar</span>
          </div>
        </div>
      </div>
      <div className="absolute top-4 right-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-md text-sm">
        Map view of asset locations
      </div>
    </div>
  );
}
