
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format, parseISO, formatISO, subDays } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy")
  } catch (error) {
    return dateString
  }
}

export function formatDateTime(dateString: string): string {
  try {
    return format(parseISO(dateString), "MMM d, yyyy HH:mm")
  } catch (error) {
    return dateString
  }
}

// New utility functions for data processing

export function formatDateTimeForAPI(date: Date): string {
  return formatISO(date, { representation: 'complete' });
}

export function getDateRangeParams(days: number = 7): { start: string, end: string } {
  const end = new Date();
  const start = subDays(end, days);
  
  return {
    start: formatDateTimeForAPI(start),
    end: formatDateTimeForAPI(end)
  };
}

export function aggregateHourlyData(data: Array<{ timestamp: string, value: number }>): Array<{ timestamp: string, value: number }> {
  const hourlyMap = new Map<string, number>();
  
  data.forEach(point => {
    const date = parseISO(point.timestamp);
    const hourKey = formatISO(new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours()));
    
    const currentValue = hourlyMap.get(hourKey) || 0;
    hourlyMap.set(hourKey, currentValue + point.value);
  });
  
  return Array.from(hourlyMap.entries()).map(([timestamp, value]) => ({
    timestamp,
    value
  })).sort((a, b) => parseISO(a.timestamp).getTime() - parseISO(b.timestamp).getTime());
}

export function calculateMatchingScore(consumption: number[], production: number[]): number {
  if (consumption.length !== production.length || consumption.length === 0) {
    return 0;
  }
  
  // Calculate correlation between consumption and production patterns
  let sumProduct = 0;
  let sumConsumptionSquared = 0;
  let sumProductionSquared = 0;
  
  for (let i = 0; i < consumption.length; i++) {
    sumProduct += consumption[i] * production[i];
    sumConsumptionSquared += consumption[i] * consumption[i];
    sumProductionSquared += production[i] * production[i];
  }
  
  const correlation = sumProduct / (Math.sqrt(sumConsumptionSquared) * Math.sqrt(sumProductionSquared));
  
  // Convert correlation (-1 to 1) to score (0 to 100)
  return Math.round(((correlation + 1) / 2) * 100);
}
