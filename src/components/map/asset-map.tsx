
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

        // Use a more visually appealing map style
        map.current = new mapboxgl.default.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/outdoors-v12', // More detailed and visually appealing style
          center: center,
          zoom: initialZoom || 7,
        });
        
        // Mark map as initialized after it's created
        mapInitialized.current = true;

        // Add navigation controls
        map.current.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
        
        // Enhance map visual appearance
        map.current.on('load', () => {
          // Add a light blue background with terrain effect
          if (map.current.getSource('mapbox-dem')) return;
          
          // Add terrain and sky for more visual appeal
          map.current.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
          });
          
          // Add terrain effect to make map more 3D-like
          map.current.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

          // Add water color enhancement
          map.current.setPaintProperty('water', 'fill-color', '#a4d1e8');
          
          console.log('Map loaded, adding markers for', assets.length, 'assets');
          // Clear existing markers
          if (markers.current && markers.current.length) {
            markers.current.forEach(marker => {
              if (marker) marker.remove();
            });
            markers.current = [];
          }
          
          // Add markers for each asset with improved styling
          if (assets && assets.length > 0) {
            const newMarkers = [];
            
            // Calculate total volume for percentage calculations
            const totalVolume = assets.reduce((sum, asset) => sum + asset.volume, 0);
            
            for (const asset of assets) {
              if (!asset.coordinates || !asset.coordinates.lat || !asset.coordinates.lng) {
                console.error('Asset has invalid coordinates:', asset);
                continue;
              }
              
              const { coordinates, type, assetName, volume } = asset;
              
              // Create marker element with enhanced styling
              const el = document.createElement('div');
              el.className = 'relative group cursor-pointer';
              
              // Create detailed popup content with more information
              const popupContent = document.createElement('div');
              popupContent.className = 'absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 p-4 rounded-lg shadow-xl text-sm hidden group-hover:block z-10 w-72 backdrop-blur-sm border border-gray-200 dark:border-gray-700';
              
              const volumePercent = Math.round((volume / totalVolume) * 100);
              const capacityMW = (volume / 24).toFixed(1); // Simulated capacity based on volume
              
              popupContent.innerHTML = `
                <div class="font-bold text-base mb-2">${assetName}</div>
                <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div class="text-xs text-gray-500 mb-1">Energy Type</div>
                    <div class="flex items-center">
                      ${type === 'wind' ? 
                        '<div class="w-4 h-4 bg-blue-500 rounded-full mr-2"></div> Wind Energy' : 
                        '<div class="w-4 h-4 bg-amber-500 rounded-full mr-2"></div> Solar Energy'}
                    </div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">Capacity</div>
                    <div class="font-medium">${capacityMW} MW</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">Production</div>
                    <div class="font-medium">${Math.round(volume)} MWh</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-500 mb-1">Share</div>
                    <div class="font-medium">${volumePercent}% of total</div>
                  </div>
                </div>
                <div class="text-xs text-blue-600 dark:text-blue-400">Click for more details</div>
              `;
              
              // Create the marker icon with enhanced visual styling
              const markerIcon = document.createElement('div');
              
              if (type === 'wind') {
                // Wind icon with pulsing effect and shadow
                markerIcon.className = 'flex items-center justify-center';
                markerIcon.innerHTML = `
                  <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg relative animate-pulse-slow">
                    <div class="absolute w-14 h-14 bg-blue-400/20 rounded-full animate-ping-slow"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"></path>
                      <path d="M9.6 4.6A2 2 0 1 1 11 8H2"></path>
                      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"></path>
                    </svg>
                  </div>
                `;
              } else {
                // Solar icon with pulsing effect and shadow
                markerIcon.className = 'flex items-center justify-center';
                markerIcon.innerHTML = `
                  <div class="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg relative animate-pulse-slow">
                    <div class="absolute w-14 h-14 bg-amber-400/20 rounded-full animate-ping-slow"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
              
              // Add name label under the icon with improved styling
              const nameLabel = document.createElement('div');
              nameLabel.className = 'absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded-md shadow-md text-xs font-medium whitespace-nowrap border border-gray-100 dark:border-gray-700 backdrop-blur-sm';
              nameLabel.textContent = assetName;
              
              // Assemble the marker elements
              el.appendChild(markerIcon);
              el.appendChild(nameLabel);
              el.appendChild(popupContent);
              
              // Create and add marker with custom offsets to improve positioning
              try {
                const marker = new mapboxgl.default.Marker({
                  element: el,
                  anchor: 'bottom',
                  offset: [0, 0]
                })
                .setLngLat([coordinates.lng, coordinates.lat] as [number, number])
                .addTo(map.current);
                
                // Add click event for detailed view
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
          
          // Add a custom layer for map styling to enhance visual appeal
          if (!map.current.getLayer('custom-atmosphere')) {
            map.current.addLayer({
              'id': 'custom-atmosphere',
              'type': 'sky',
              'paint': {
                'sky-opacity': [
                  'interpolate',
                  ['linear'],
                  ['zoom'],
                  0, 0,
                  5, 0.3,
                  8, 0.5
                ],
                'sky-type': 'atmosphere',
                'sky-atmosphere-sun': [0.0, 0.0],
                'sky-atmosphere-sun-intensity': 20
              }
            });
          }
        });

        // Add map interaction effects for better user experience
        map.current.on('mouseenter', 'water', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });
        
        map.current.on('mouseleave', 'water', () => {
          map.current.getCanvas().style.cursor = '';
        });

        // Add animation to the map to make it more engaging
        let rotateInterval: number | null = null;
        const startRotation = () => {
          if (rotateInterval) clearInterval(rotateInterval);
          
          rotateInterval = window.setInterval(() => {
            if (map.current) {
              map.current.easeTo({ 
                bearing: map.current.getBearing() + 0.1,
                duration: 0,
                easing: (n) => n
              });
            }
          }, 100);
        };
        
        // Add interactive rotation when the user clicks on the map
        map.current.on('click', () => {
          if (rotateInterval) {
            clearInterval(rotateInterval);
            rotateInterval = null;
          } else {
            startRotation();
          }
        });
        
        // Apply custom marker animations via CSS
        const style = document.createElement('style');
        style.textContent = `
          @keyframes pulse-slow {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes ping-slow {
            0% { transform: scale(0.95); opacity: 1; }
            75%, 100% { transform: scale(1.25); opacity: 0; }
          }
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          .animate-ping-slow {
            animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
        `;
        document.head.appendChild(style);
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
      <div className="absolute bottom-4 right-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md backdrop-blur-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm font-medium">
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
      <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-md text-sm font-medium shadow-md backdrop-blur-sm border border-gray-100 dark:border-gray-700">
        Renewable Energy Assets Map
      </div>
    </div>
  );
}
