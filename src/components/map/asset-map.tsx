
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
        // Fix: Ensure we're passing a proper LngLatLike object, not an array
        const center = initialCenter && initialCenter.lat && initialCenter.lng ? 
          [initialCenter.lng, initialCenter.lat] as [number, number] : // Explicitly type as tuple
          [9.5018, 56.2639] as [number, number]; // Denmark's center coordinates

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

        // Make sure the map is fully loaded before adding markers
        map.current.on('load', () => {
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
              
              // Create marker element
              const el = document.createElement('div');
              el.className = 'relative group cursor-pointer';
              
              const markerIcon = document.createElement('div');
              markerIcon.className = type === 'wind' 
                ? 'bg-blue-500 p-1 rounded-full h-5 w-5 flex items-center justify-center text-white' 
                : 'bg-amber-500 p-1 rounded-full h-5 w-5 flex items-center justify-center text-white';
              
              const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
              iconSvg.setAttribute('width', '14');
              iconSvg.setAttribute('height', '14');
              iconSvg.setAttribute('viewBox', '0 0 24 24');
              iconSvg.setAttribute('fill', 'none');
              iconSvg.setAttribute('stroke', 'currentColor');
              iconSvg.setAttribute('stroke-width', '2');
              iconSvg.setAttribute('stroke-linecap', 'round');
              iconSvg.setAttribute('stroke-linejoin', 'round');
              
              // Add path for the icon based on asset type
              if (type === 'wind') {
                const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path1.setAttribute('d', 'M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2');
                iconSvg.appendChild(path1);
                
                const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path2.setAttribute('d', 'M9.6 4.6A2 2 0 1 1 11 8H2');
                iconSvg.appendChild(path2);
                
                const path3 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                path3.setAttribute('d', 'M12.6 19.4A2 2 0 1 0 14 16H2');
                iconSvg.appendChild(path3);
              } else {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', '12');
                circle.setAttribute('cy', '12');
                circle.setAttribute('r', '5');
                iconSvg.appendChild(circle);
                
                const line1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line1.setAttribute('x1', '12');
                line1.setAttribute('y1', '1');
                line1.setAttribute('x2', '12');
                line1.setAttribute('y2', '3');
                iconSvg.appendChild(line1);
                
                const line2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line2.setAttribute('x1', '12');
                line2.setAttribute('y1', '21');
                line2.setAttribute('x2', '12');
                line2.setAttribute('y2', '23');
                iconSvg.appendChild(line2);
                
                const line3 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line3.setAttribute('x1', '4.22');
                line3.setAttribute('y1', '4.22');
                line3.setAttribute('x2', '5.64');
                line3.setAttribute('y2', '5.64');
                iconSvg.appendChild(line3);
                
                const line4 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line4.setAttribute('x1', '18.36');
                line4.setAttribute('y1', '18.36');
                line4.setAttribute('x2', '19.78');
                line4.setAttribute('y2', '19.78');
                iconSvg.appendChild(line4);
                
                const line5 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line5.setAttribute('x1', '1');
                line5.setAttribute('y1', '12');
                line5.setAttribute('x2', '3');
                line5.setAttribute('y2', '12');
                iconSvg.appendChild(line5);
                
                const line6 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line6.setAttribute('x1', '21');
                line6.setAttribute('y1', '12');
                line6.setAttribute('x2', '23');
                line6.setAttribute('y2', '12');
                iconSvg.appendChild(line6);
              }
              
              markerIcon.appendChild(iconSvg);
              el.appendChild(markerIcon);
              
              // Add tooltip
              const tooltip = document.createElement('div');
              tooltip.className = 'absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-2 rounded shadow-md text-xs hidden group-hover:block whitespace-nowrap z-10';
              tooltip.innerHTML = `
                <div class="font-semibold">${assetName}</div>
                <div class="text-gray-500">${Math.round(volume)} MWh</div>
              `;
              el.appendChild(tooltip);
              
              // Create and add marker
              try {
                // Fix: Ensure coordinates are properly passed as a tuple
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
    </div>
  );
}
