
import React from 'react';
import { GuaranteeOfOrigin } from "@/data/go-models";
import { Badge } from "@/components/ui/badge";
import { Wind, Sun, Waves, Navigation, Compass } from "lucide-react";

interface AssetMapProps {
  assets: GuaranteeOfOrigin[];
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onAssetClick?: (asset: GuaranteeOfOrigin) => void;
  className?: string;
}

export function AssetMap({ 
  assets, 
  onAssetClick,
  className = ""
}: AssetMapProps) {
  // Calculate total volume for percentage calculations
  const totalVolume = assets.reduce((sum, asset) => sum + asset.volume, 0);
  
  // Select a limited number of assets
  const windAssets = assets.filter(asset => asset.type === 'wind').slice(0, 4);
  const solarAssets = assets.filter(asset => asset.type === 'solar').slice(0, 3);
  
  return (
    <div className={`relative w-full h-full rounded-md overflow-hidden ${className}`}>
      {/* Denmark-inspired map background */}
      <div className="absolute inset-0 bg-blue-100 dark:bg-blue-950">
        {/* Map landmass */}
        <div className="absolute inset-[5%] bg-amber-50 dark:bg-amber-950/30 rounded-lg">
          {/* Main peninsula (Jutland) */}
          <div className="absolute left-[10%] top-[5%] w-[40%] h-[75%] bg-green-50 dark:bg-green-950/30 rounded-[30%_70%_55%_45%/55%_30%_70%_45%]"></div>
          
          {/* Zealand island */}
          <div className="absolute right-[15%] top-[30%] w-[30%] h-[40%] bg-green-50 dark:bg-green-950/30 rounded-[40%_60%_60%_40%/60%_30%_70%_40%]"></div>
          
          {/* Funen island */}
          <div className="absolute left-[53%] top-[50%] w-[20%] h-[30%] bg-green-50 dark:bg-green-950/30 rounded-[40%_60%_60%_40%/60%_40%_60%_40%]"></div>
          
          {/* Small islands */}
          <div className="absolute right-[10%] bottom-[15%] w-[15%] h-[10%] bg-green-50 dark:bg-green-950/30 rounded-[40%_60%_60%_40%]"></div>
          <div className="absolute left-[20%] bottom-[10%] w-[10%] h-[15%] bg-green-50 dark:bg-green-950/30 rounded-[60%_40%_70%_30%]"></div>
        </div>
        
        {/* Water features */}
        <div className="absolute left-[45%] top-[20%] w-[15%] h-[25%] bg-blue-200/50 dark:bg-blue-800/30 rounded-full blur-sm"></div>
        <div className="absolute left-[35%] bottom-[30%] w-[20%] h-[15%] bg-blue-200/50 dark:bg-blue-800/30 rounded-full blur-sm"></div>
        
        {/* Grid lines */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(20,80,160,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,80,160,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Compass rose */}
      <div className="absolute right-[8%] bottom-[8%] bg-white/80 dark:bg-gray-800/80 p-1 rounded-full shadow-sm backdrop-blur-sm flex items-center justify-center">
        <Compass className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
      
      {/* Asset Markers - Wind */}
      <div className="absolute inset-0">
        {windAssets.map((asset, index) => {
          // Randomized positions for wind assets
          const positions = [
            { left: '15%', top: '22%' },  // North Jutland
            { left: '25%', top: '45%' },  // Mid Jutland
            { left: '18%', top: '75%' },  // South Jutland
            { left: '75%', top: '35%' },  // East Zealand
          ];
          
          const pos = positions[index] || { left: '20%', top: '30%' };
          const volumePercent = Math.round((asset.volume / totalVolume) * 100);
          
          return (
            <div 
              key={asset.id} 
              className="absolute cursor-pointer group"
              style={{ left: pos.left, top: pos.top }}
              onClick={() => onAssetClick?.(asset)}
            >
              {/* Asset Icon with animation */}
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg relative animate-pulse-slow">
                <div className="absolute w-14 h-14 bg-blue-400/20 rounded-full animate-ping-slow"></div>
                <Wind className="h-5 w-5" />
              </div>
              
              {/* Asset Name */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                {asset.assetName}
              </div>
              
              {/* Popup with asset details */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-64 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg text-sm hidden group-hover:block z-10 backdrop-blur-sm">
                <div className="font-bold text-base mb-2">{asset.assetName}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500">Energy Type</div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                      <span>Wind Energy</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="font-medium">{(asset.volume / 24).toFixed(1)} MW</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Production</div>
                    <div className="font-medium">{Math.round(asset.volume)} MWh</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Share</div>
                    <div className="font-medium">{volumePercent}% of total</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* Asset Markers - Solar */}
        {solarAssets.map((asset, index) => {
          // Randomized positions for solar assets
          const positions = [
            { left: '65%', top: '60%' },  // South Zealand
            { left: '48%', top: '52%' },  // Funen
            { left: '35%', top: '30%' }   // East Jutland
          ];
          
          const pos = positions[index] || { left: '40%', top: '40%' };
          const volumePercent = Math.round((asset.volume / totalVolume) * 100);
          
          return (
            <div 
              key={asset.id} 
              className="absolute cursor-pointer group"
              style={{ left: pos.left, top: pos.top }}
              onClick={() => onAssetClick?.(asset)}
            >
              {/* Asset Icon with animation */}
              <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg relative animate-pulse-slow">
                <div className="absolute w-14 h-14 bg-amber-400/20 rounded-full animate-ping-slow"></div>
                <Sun className="h-5 w-5" />
              </div>
              
              {/* Asset Name */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 px-2 py-1 rounded text-xs font-medium shadow-md whitespace-nowrap">
                {asset.assetName}
              </div>
              
              {/* Popup with asset details */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-64 bg-white/90 dark:bg-gray-800/90 p-3 rounded-lg shadow-lg text-sm hidden group-hover:block z-10 backdrop-blur-sm">
                <div className="font-bold text-base mb-2">{asset.assetName}</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-gray-500">Energy Type</div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                      <span>Solar Energy</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Capacity</div>
                    <div className="font-medium">{(asset.volume / 24).toFixed(1)} MW</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Production</div>
                    <div className="font-medium">{Math.round(asset.volume)} MWh</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Share</div>
                    <div className="font-medium">{volumePercent}% of total</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 p-2 rounded-md shadow-md backdrop-blur-sm border border-gray-100 dark:border-gray-700">
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
      
      {/* City markers */}
      <div className="absolute left-[25%] top-[15%] flex items-center">
        <div className="h-1.5 w-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
        <span className="text-[10px] ml-1 text-gray-700 dark:text-gray-300">Aalborg</span>
      </div>
      
      <div className="absolute right-[25%] top-[40%] flex items-center">
        <div className="h-1.5 w-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
        <span className="text-[10px] ml-1 text-gray-700 dark:text-gray-300">Copenhagen</span>
      </div>
      
      <div className="absolute left-[50%] top-[50%] flex items-center">
        <div className="h-1.5 w-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
        <span className="text-[10px] ml-1 text-gray-700 dark:text-gray-300">Odense</span>
      </div>
      
      <div className="absolute left-[35%] top-[45%] flex items-center">
        <div className="h-1.5 w-1.5 bg-gray-700 dark:bg-gray-300 rounded-full"></div>
        <span className="text-[10px] ml-1 text-gray-700 dark:text-gray-300">Aarhus</span>
      </div>
      
      {/* Map Title */}
      <div className="absolute top-4 left-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-md text-sm font-medium shadow-md backdrop-blur-sm border border-gray-100 dark:border-gray-700 flex items-center">
        <Navigation className="h-4 w-4 mr-2 text-primary" />
        Denmark Renewable Energy Assets
      </div>

      {/* Add the animation styles */}
      <style>
        {`
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
        `}
      </style>
    </div>
  );
}
