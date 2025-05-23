
import React from 'react';
import { GuaranteeOfOrigin } from "@/data/go-models";
import { Badge } from "@/components/ui/badge";
import { Wind, Sun } from "lucide-react";

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
  
  // Group assets by type
  const windAssets = assets.filter(asset => asset.type === 'wind');
  const solarAssets = assets.filter(asset => asset.type === 'solar');
  
  return (
    <div className={`relative w-full h-full rounded-md overflow-hidden ${className}`}>
      {/* Static map background - using a gradient background to simulate a map */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-slate-800 dark:to-slate-900">
        {/* Grid lines to simulate map grid */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Some terrain features to make it look like a map */}
        <div className="absolute left-[10%] top-[20%] w-[30%] h-[15%] bg-green-100/30 dark:bg-green-900/20 rounded-full blur-xl"></div>
        <div className="absolute right-[15%] bottom-[25%] w-[25%] h-[20%] bg-green-100/40 dark:bg-green-900/30 rounded-full blur-xl"></div>
        <div className="absolute left-[40%] bottom-[10%] w-[35%] h-[10%] bg-blue-100/40 dark:bg-blue-900/30 rounded-3xl blur-xl"></div>
      </div>
      
      {/* Asset Markers */}
      <div className="absolute inset-0">
        {/* Map Wind assets */}
        {windAssets.map((asset, index) => {
          // Calculate position based on index for demonstration
          const leftPos = 15 + (index % 5) * 15;
          const topPos = 10 + Math.floor(index / 5) * 20;
          const volumePercent = Math.round((asset.volume / totalVolume) * 100);
          
          return (
            <div 
              key={asset.id} 
              className="absolute cursor-pointer group"
              style={{ left: `${leftPos}%`, top: `${topPos}%` }}
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
        
        {/* Map Solar assets */}
        {solarAssets.map((asset, index) => {
          // Calculate position based on index for demonstration
          const leftPos = 20 + (index % 4) * 18;
          const topPos = 35 + Math.floor(index / 4) * 20;
          const volumePercent = Math.round((asset.volume / totalVolume) * 100);
          
          return (
            <div 
              key={asset.id} 
              className="absolute cursor-pointer group"
              style={{ left: `${leftPos}%`, top: `${topPos}%` }}
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
      
      {/* Map Title */}
      <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 dark:bg-gray-800/90 rounded-md text-sm font-medium shadow-md backdrop-blur-sm border border-gray-100 dark:border-gray-700">
        Renewable Energy Assets Map
      </div>

      {/* Add custom CSS animation styles */}
      <style jsx>{`
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
      `}</style>
    </div>
  );
}
