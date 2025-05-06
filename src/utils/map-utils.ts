
/**
 * Map utility functions for working with geographic data
 */

/**
 * Calculate the distance between two points on Earth (using Haversine formula)
 * @param lat1 Latitude of first point in degrees
 * @param lon1 Longitude of first point in degrees
 * @param lat2 Latitude of second point in degrees
 * @param lon2 Longitude of second point in degrees
 * @returns Distance in kilometers
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

/**
 * Convert degrees to radians
 */
function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate the center point from an array of lat/lng coordinates
 * @param coordinates Array of coordinate objects with lat and lng properties
 * @returns Center point as {lat, lng}
 */
export function calculateCenter(coordinates: Array<{lat: number, lng: number}>): {lat: number, lng: number} {
  if (!coordinates.length) return { lat: 0, lng: 0 };
  
  const totalLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
  const totalLng = coordinates.reduce((sum, coord) => sum + coord.lng, 0);
  
  return {
    lat: totalLat / coordinates.length,
    lng: totalLng / coordinates.length
  };
}

/**
 * Calculate appropriate zoom level based on the bounding box of coordinates
 * @param coordinates Array of coordinate objects with lat and lng properties
 * @returns A zoom level between 1 and 20
 */
export function calculateZoomLevel(coordinates: Array<{lat: number, lng: number}>): number {
  if (coordinates.length < 2) return 7; // Default zoom for single point or empty array
  
  const lats = coordinates.map(c => c.lat);
  const lngs = coordinates.map(c => c.lng);
  
  const minLat = Math.min(...lats);
  const maxLat = Math.max(...lats);
  const minLng = Math.min(...lngs);
  const maxLng = Math.max(...lngs);
  
  const latDiff = maxLat - minLat;
  const lngDiff = maxLng - minLng;
  const maxDiff = Math.max(latDiff, lngDiff);
  
  // Rough heuristic for zoom level based on the size of the bounding box
  if (maxDiff > 20) return 3;
  if (maxDiff > 10) return 4;
  if (maxDiff > 5) return 5;
  if (maxDiff > 2) return 6;
  if (maxDiff > 1) return 7;
  if (maxDiff > 0.5) return 8;
  if (maxDiff > 0.2) return 9;
  if (maxDiff > 0.1) return 10;
  if (maxDiff > 0.05) return 11;
  if (maxDiff > 0.02) return 12;
  if (maxDiff > 0.01) return 13;
  
  return 14; // Very close points
}
