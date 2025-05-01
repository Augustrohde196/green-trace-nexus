
export type TimeRangeType = "week" | "month" | "year";

export interface AllocationDataPoint {
  month: string;
  production: number;
  allocated: number;
  shortfall?: number;
  excess?: number;
}

// Generate allocation data based on timeRange
export function getTimeBasedData(timeRange: TimeRangeType): AllocationDataPoint[] {
  switch (timeRange) {
    case "week":
      return [
        { month: "Mon", production: 140, allocated: 135, shortfall: 5 },
        { month: "Tue", production: 155, allocated: 150, shortfall: 5 },
        { month: "Wed", production: 180, allocated: 175, shortfall: 5 },
        { month: "Thu", production: 165, allocated: 160, shortfall: 5 },
        { month: "Fri", production: 190, allocated: 180, shortfall: 0, excess: 10 },
        { month: "Sat", production: 110, allocated: 100, shortfall: 0, excess: 10 },
        { month: "Sun", production: 100, allocated: 90, shortfall: 0, excess: 10 },
      ];
    case "year":
      return [
        { month: "Jan", production: 680, allocated: 650, shortfall: 30 },
        { month: "Feb", production: 720, allocated: 700, shortfall: 20 },
        { month: "Mar", production: 800, allocated: 800, shortfall: 0 },
        { month: "Apr", production: 850, allocated: 830, shortfall: 0, excess: 20 },
        { month: "May", production: 920, allocated: 880, shortfall: 0, excess: 40 },
        { month: "Jun", production: 980, allocated: 950, shortfall: 0, excess: 30 },
        { month: "Jul", production: 1050, allocated: 1000, shortfall: 0, excess: 50 },
        { month: "Aug", production: 900, allocated: 870, shortfall: 0, excess: 30 },
        { month: "Sep", production: 830, allocated: 800, shortfall: 0, excess: 30 },
        { month: "Oct", production: 780, allocated: 760, shortfall: 20 },
        { month: "Nov", production: 740, allocated: 720, shortfall: 20 },
        { month: "Dec", production: 720, allocated: 690, shortfall: 30 },
      ];
    case "month":
    default:
      return [
        { month: "Week 1", production: 680, allocated: 650, shortfall: 30 },
        { month: "Week 2", production: 720, allocated: 700, shortfall: 20 },
        { month: "Week 3", production: 800, allocated: 800, shortfall: 0 },
        { month: "Week 4", production: 850, allocated: 830, shortfall: 0, excess: 20 },
      ];
  }
}

// Get period text based on timeRange
export function getPeriodText(timeRange: TimeRangeType): string {
  switch(timeRange) {
    case "week": return "Weekly";
    case "month": return "Monthly";
    case "year": return "Yearly";
    default: return "Monthly";
  }
}
