
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Wind, Sun } from "lucide-react";
import { GuaranteeOfOrigin } from "@/data/go-models";

interface AssetMapProps {
  assets: GuaranteeOfOrigin[];
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
  onAssetClick?: (asset: GuaranteeOfOrigin) => void;
  className?: string;
}

// Mock data for Denmark map regions
const DENMARK_REGIONS = [
  { id: "north", name: "North Jutland", path: "M60,30 L40,60 L80,70 L100,40 Z" },
  { id: "central", name: "Central Jutland", path: "M40,60 L30,100 L70,110 L80,70 Z" },
  { id: "south", name: "South Jutland", path: "M30,100 L20,140 L60,145 L70,110 Z" },
  { id: "funen", name: "Funen", path: "M80,120 L100,110 L120,130 L100,140 Z" },
  { id: "zealand", name: "Zealand", path: "M130,100 L150,90 L170,110 L150,130 Z" },
  { id: "bornholm", name: "Bornholm", path: "M200,110 L210,110 L210,120 L200,120 Z" }
];

// Default mock assets if none provided
const DEFAULT_ASSETS: GuaranteeOfOrigin[] = [
  {
    id: 'default-wind-1',
    assetId: 'asset-1',
    assetName: 'Hvide Sande Wind Farm',
    type: 'wind',
    volume: 28,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 85,
    gsrn: '578999123456',
    gridArea: 'DK1 - West Jutland',
    trackingCode: 'DK-TRK-1234',
    coordinates: { lat: 55.9, lng: 8.13, x: 45, y: 110 }
  },
  {
    id: 'default-wind-2',
    assetId: 'asset-2',
    assetName: 'Nordsee Wind Farm',
    type: 'wind',
    volume: 35,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 92,
    gsrn: '578999123457',
    gridArea: 'DK1 - West Jutland',
    trackingCode: 'DK-TRK-1235',
    coordinates: { lat: 55.5, lng: 8.0, x: 20, y: 135 }
  },
  {
    id: 'default-wind-3',
    assetId: 'asset-3',
    assetName: 'Middelgrunden Wind',
    type: 'wind',
    volume: 22,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 78,
    gsrn: '578999123458',
    gridArea: 'DK2 - East Denmark',
    trackingCode: 'DK-TRK-1236',
    coordinates: { lat: 55.7, lng: 12.6, x: 150, y: 95 }
  },
  {
    id: 'default-solar-1',
    assetId: 'asset-4',
    assetName: 'Nykøbing Solar Park',
    type: 'solar',
    volume: 18,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 75,
    gsrn: '578999123459',
    gridArea: 'Zealand',
    trackingCode: 'DK-TRK-1237',
    coordinates: { lat: 56.9, lng: 10.3, x: 120, y: 70 }
  },
  {
    id: 'default-solar-2',
    assetId: 'asset-5',
    assetName: 'Copenhagen Energy',
    type: 'solar',
    volume: 15,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 68,
    gsrn: '578999123460',
    gridArea: 'DK2 - East Denmark',
    trackingCode: 'DK-TRK-1238',
    coordinates: { lat: 55.6, lng: 12.5, x: 155, y: 110 }
  },
  {
    id: 'default-solar-3',
    assetId: 'asset-6',
    assetName: 'Horsens Solar Array',
    type: 'solar',
    volume: 25,
    productionTimestamp: new Date().toISOString(),
    customerId: 'customer-1',
    customerName: 'EcoTech Solutions',
    status: 'allocated',
    allocationTimestamp: new Date().toISOString(),
    allocationScore: 82,
    gsrn: '578999123461',
    gridArea: 'Central Denmark',
    trackingCode: 'DK-TRK-1239',
    coordinates: { lat: 55.9, lng: 9.8, x: 70, y: 110 }
  }
];

export function AssetMap({ 
  assets = [], 
  onAssetClick,
  className = ""
}: AssetMapProps) {
  // State for hovering
  const [hoveredAsset, setHoveredAsset] = useState<string | null>(null);
  
  // Use provided assets or fallback to default assets if empty
  const displayAssets = assets.length > 0 ? assets : DEFAULT_ASSETS;
  
  // Calculate total volume for percentage display
  const totalVolume = displayAssets.reduce((sum, asset) => sum + asset.volume, 0);
  
  // Handle mouse enter/leave for assets
  const handleMouseEnter = (assetId: string) => {
    setHoveredAsset(assetId);
  };
  
  const handleMouseLeave = () => {
    setHoveredAsset(null);
  };
  
  // Calculate percentage for an asset
  const calculatePercentage = (volume: number) => {
    return Math.round((volume / totalVolume) * 100);
  };
  
  // Get region for asset based on rough coordinates
  const getRegionForAsset = (asset: GuaranteeOfOrigin) => {
    // Using gridArea as the region for simplicity
    return asset.gridArea || 'Denmark';
  };

  return (
    <div className={`relative overflow-hidden rounded-lg bg-[#F5F8FC] border border-gray-200 ${className}`}>
      {/* Static Denmark Map */}
      <div className="relative w-full h-full min-h-[600px]">
        {/* Map background with subtle grid lines */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTEgMXYzOGgzOFYxSDEwem00IDRoMzB2MzBINXYtMzB6IiBmaWxsPSIjZjBmM2Y5IiBmaWxsLXJ1bGU9Im5vbnplcm8iIG9wYWNpdHk9Ii41Ii8+PC9nPjwvc3ZnPg==')] opacity-30"></div>
        
        {/* Water color */}
        <div className="absolute inset-0 bg-[#E7F1FF] opacity-30"></div>
        
        {/* Denmark SVG Map */}
        <svg 
          viewBox="0 0 240 240" 
          className="absolute inset-0 w-full h-full" 
          style={{ filter: 'drop-shadow(0px 1px 3px rgba(0,0,0,0.1))' }}
        >
          {/* Main regions */}
          {DENMARK_REGIONS.map(region => (
            <path
              key={region.id}
              id={region.id}
              d={region.path}
              fill={region.id === 'bornholm' ? '#EAEEF5' : '#EAEEF5'}
              stroke="#D1D9E6"
              strokeWidth="1.5"
              className="transition-colors hover:fill-gray-100"
            />
          ))}
          
          {/* Water connecting regions */}
          <path 
            d="M70,110 Q75,115 80,120 L100,110 L90,90 L80,70 Z" 
            fill="#E7F1FF" 
            opacity="0.5" 
            strokeWidth="1" 
            stroke="#D1D9E6" 
          />
          <path 
            d="M130,100 Q125,115 120,130 L100,140 L80,120 Z" 
            fill="#E7F1FF" 
            opacity="0.5" 
            strokeWidth="1" 
            stroke="#D1D9E6" 
          />
          
          {/* Asset Markers */}
          {displayAssets.map(asset => {
            // Calculate x, y coordinates based on lat, lng or use predefined x, y if available
            const x = (asset.coordinates as any).x || (150 + (asset.coordinates.lng - 10) * 10);
            const y = (asset.coordinates as any).y || (120 - (asset.coordinates.lat - 55) * 20);
            
            const isHovered = hoveredAsset === asset.id;
            
            return (
              <g 
                key={asset.id}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer transition-transform duration-200"
                style={{ transform: isHovered ? 'scale(1.2) translate(-50%, -50%)' : 'scale(1) translate(-50%, -50%)' }}
                onMouseEnter={() => handleMouseEnter(asset.id)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onAssetClick && onAssetClick(asset)}
              >
                {/* Background circle */}
                <circle 
                  r="12" 
                  fill={asset.type === 'wind' ? '#3B82F6' : '#F59E0B'} 
                  fillOpacity="0.2"
                  className={`transition-all duration-300 ${isHovered ? 'r-14' : 'r-12'}`}
                />
                
                {/* Main icon circle */}
                <circle 
                  r="8" 
                  fill={asset.type === 'wind' ? '#3B82F6' : '#F59E0B'} 
                  className="drop-shadow-md"
                />
                
                {/* Icon */}
                <g transform="translate(-5.5, -5.5) scale(0.6)">
                  {asset.type === 'wind' ? (
                    <path 
                      d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2 M9.6 4.6A2 2 0 1 1 11 8H2 M12.6 19.4A2 2 0 1 0 14 16H2" 
                      stroke="white" 
                      strokeWidth="2" 
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  ) : (
                    <g transform="translate(0, 0)">
                      <circle cx="12" cy="12" r="5" stroke="white" strokeWidth="2" fill="none" />
                      <line x1="12" y1="1" x2="12" y2="3" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="12" y1="21" x2="12" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="1" y1="12" x2="3" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="21" y1="12" x2="23" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="white" strokeWidth="2" strokeLinecap="round" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </g>
                  )}
                </g>
                
                {/* Asset label */}
                <text 
                  y="20" 
                  textAnchor="middle" 
                  className="text-[7px] font-medium fill-gray-800"
                >
                  {asset.assetName.length > 15 
                    ? asset.assetName.substring(0, 13) + '...' 
                    : asset.assetName}
                </text>
                
                {/* Tooltip on hover */}
                {isHovered && (
                  <foreignObject 
                    x="-80" 
                    y="-80" 
                    width="160" 
                    height="75"
                    className="overflow-visible pointer-events-none"
                  >
                    <div 
                      className="bg-white rounded-md shadow-lg p-3 text-xs border border-gray-100 w-[160px]"
                      style={{
                        transform: 'translateY(-100%)',
                      }}
                    >
                      <div className="font-bold mb-1.5">{asset.assetName}</div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div>
                          <div className="text-[10px] text-gray-500">Type:</div>
                          <div className="flex items-center">
                            <div 
                              className={`w-2 h-2 rounded-full mr-1 ${asset.type === 'wind' 
                                ? 'bg-blue-500' 
                                : 'bg-amber-500'}`}
                            ></div>
                            <span className="capitalize">{asset.type}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-gray-500">Location:</div>
                          <div>{getRegionForAsset(asset)}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-[10px] text-gray-500">Supply:</div>
                          <div>
                            {Math.round(asset.volume)} MWh ({calculatePercentage(asset.volume)}%)
                          </div>
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                )}
              </g>
            );
          })}
        </svg>
        
        {/* Legend */}
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
        
        {/* Map Title */}
        <div className="absolute top-4 right-4 px-4 py-2 bg-white/80 dark:bg-gray-800/80 rounded-md text-sm">
          Map view of asset locations
        </div>
      </div>
    </div>
  );
}
