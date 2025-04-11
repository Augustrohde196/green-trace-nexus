
import { format, subDays, addHours } from "date-fns";

// Types for consumption data
export interface ConsumptionDataPoint {
  timestamp: string;
  value: number;
  category?: string;
}

// Generate random consumption data with daily and hourly patterns
export const generateConsumptionData = (days: number = 30): ConsumptionDataPoint[] => {
  const data: ConsumptionDataPoint[] = [];
  const now = new Date();
  
  // Base hourly patterns (0-23 hours)
  const weekdayPattern = [
    0.4, 0.3, 0.25, 0.2, 0.3, 0.5, 0.7, 0.9, 1.0, 0.95, 
    0.9, 0.85, 0.9, 0.95, 0.9, 0.85, 0.8, 0.85, 0.9, 0.85, 
    0.8, 0.7, 0.6, 0.5
  ];
  
  const weekendPattern = [
    0.3, 0.25, 0.2, 0.2, 0.2, 0.25, 0.35, 0.45, 0.6, 0.7,
    0.8, 0.85, 0.9, 0.8, 0.7, 0.65, 0.7, 0.75, 0.8, 0.75,
    0.7, 0.6, 0.5, 0.4
  ];
  
  // Generate data for each day
  for (let d = days - 1; d >= 0; d--) {
    const date = subDays(now, d);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const pattern = isWeekend ? weekendPattern : weekdayPattern;
    
    // Base load for the day (MWh)
    const baseLoad = 300 + Math.random() * 50;
    
    // Generate hourly data
    for (let h = 0; h < 24; h++) {
      const timestamp = addHours(date, h).toISOString();
      const hourlyFactor = pattern[h];
      
      // Add some randomness
      const randomFactor = 0.9 + Math.random() * 0.2;
      
      // Calculate consumption for this hour
      const value = Math.round(baseLoad * hourlyFactor * randomFactor);
      
      data.push({
        timestamp,
        value
      });
    }
  }
  
  return data;
};

// Aggregate hourly data to daily data
export const aggregateToDaily = (data: ConsumptionDataPoint[]): ConsumptionDataPoint[] => {
  const dailyMap = new Map<string, number>();
  
  data.forEach(point => {
    const date = new Date(point.timestamp).toISOString().split('T')[0];
    const currentValue = dailyMap.get(date) || 0;
    dailyMap.set(date, currentValue + point.value);
  });
  
  return Array.from(dailyMap.entries()).map(([date, value]) => ({
    timestamp: date,
    value
  })).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};

// Aggregate hourly data to monthly data
export const aggregateToMonthly = (data: ConsumptionDataPoint[]): ConsumptionDataPoint[] => {
  const monthlyMap = new Map<string, number>();
  
  data.forEach(point => {
    const date = new Date(point.timestamp);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const currentValue = monthlyMap.get(monthKey) || 0;
    monthlyMap.set(monthKey, currentValue + point.value);
  });
  
  return Array.from(monthlyMap.entries()).map(([month, value]) => ({
    timestamp: month,
    value
  })).sort((a, b) => a.timestamp.localeCompare(b.timestamp));
};

// Generate GO production data aligned with consumption timeframe
export const generateGOData = (consumptionData: ConsumptionDataPoint[]): ConsumptionDataPoint[] => {
  // Extract unique timestamps from consumption data
  const timestamps = [...new Set(consumptionData.map(point => point.timestamp))];
  
  return timestamps.map(timestamp => {
    // Find matching consumption data point
    const consumptionPoint = consumptionData.find(point => point.timestamp === timestamp);
    const consumptionValue = consumptionPoint ? consumptionPoint.value : 0;
    
    // Generate GO production value - simulate varying renewable coverage
    const coverageRatio = 0.6 + Math.random() * 0.7; // Between 60-130% coverage
    const goValue = Math.round(consumptionValue * coverageRatio);
    
    return {
      timestamp,
      value: goValue,
      category: 'Renewable Production'
    };
  });
};

// Format timestamp for display
export const formatTimestamp = (timestamp: string, format: 'hourly' | 'daily' | 'monthly'): string => {
  const date = new Date(timestamp);
  
  switch (format) {
    case 'hourly':
      return `${date.getHours()}:00`;
    case 'daily':
      return format(date, 'MMM dd');
    case 'monthly':
      return format(date, 'MMM yyyy');
    default:
      return timestamp;
  }
};
