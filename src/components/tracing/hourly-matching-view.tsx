
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Generate random hourly matching data for demo
const generateHourlyData = () => {
  const days = 31; // May has 31 days
  const hours = 24;
  const data: { day: number; hour: number; matched: boolean; percentage: number }[] = [];
  
  for (let day = 1; day <= days; day++) {
    for (let hour = 0; hour < hours; hour++) {
      // Higher chance of matching during daylight hours (for solar) and generally high matching rate
      let matchChance = 0.7;
      
      // Solar power is stronger during the day
      if (hour >= 6 && hour <= 18) {
        matchChance = 0.9;
      }
      
      // Wind power can be strong at night
      if (hour >= 19 || hour <= 5) {
        // Random wind days
        if (day % 5 === 0 || day % 7 === 0) {
          matchChance = 0.85;
        }
      }
      
      const matched = Math.random() < matchChance;
      const percentage = matched ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30) + 10;
      
      data.push({
        day,
        hour,
        matched,
        percentage
      });
    }
  }
  
  return data;
};

export const HourlyMatchingView = () => {
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('week');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedDay, setSelectedDay] = useState(1);
  
  const hourlyData = generateHourlyData();
  
  // Helper function to get week number (1-indexed) from day (1-indexed)
  const getWeekNumber = (day: number) => Math.ceil(day / 7);
  
  // Filter data based on view mode
  const filteredData = hourlyData.filter(item => {
    if (viewMode === 'day') {
      return item.day === selectedDay;
    }
    if (viewMode === 'week') {
      return getWeekNumber(item.day) === selectedWeek;
    }
    return true; // month view shows all
  });
  
  // Get days for the current week or the selected day
  const daysToShow = viewMode === 'day' 
    ? [selectedDay] 
    : viewMode === 'week'
      ? Array.from({ length: 7 }, (_, i) => (selectedWeek - 1) * 7 + i + 1).filter(day => day <= 31)
      : Array.from({ length: 31 }, (_, i) => i + 1);
  
  const hoursToShow = Array.from({ length: 24 }, (_, i) => i);
  
  // Handle navigation
  const goToPrevious = () => {
    if (viewMode === 'day' && selectedDay > 1) {
      setSelectedDay(selectedDay - 1);
    } else if (viewMode === 'week' && selectedWeek > 1) {
      setSelectedWeek(selectedWeek - 1);
    }
  };
  
  const goToNext = () => {
    if (viewMode === 'day' && selectedDay < 31) {
      setSelectedDay(selectedDay + 1);
    } else if (viewMode === 'week' && selectedWeek < 5) {
      setSelectedWeek(selectedWeek + 1);
    }
  };
  
  // Label for current view
  const viewLabel = viewMode === 'day' 
    ? `May ${selectedDay}, 2025` 
    : viewMode === 'week'
      ? `Week ${selectedWeek} of May 2025`
      : 'May 2025';
      
  // Calculate daily and overall matching percentages
  const calculateDailyMatchingPercentage = (day: number) => {
    const dayData = hourlyData.filter(item => item.day === day);
    const matchedHours = dayData.filter(item => item.matched).length;
    return Math.round((matchedHours / dayData.length) * 100);
  };
  
  const overallMatchingPercentage = Math.round(
    (hourlyData.filter(item => item.matched).length / hourlyData.length) * 100
  );
  
  // Get cell color based on matching status and percentage
  const getCellColor = (matched: boolean, percentage: number) => {
    if (!matched) return 'bg-gray-100 dark:bg-gray-800';
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 80) return 'bg-green-400';
    if (percentage >= 70) return 'bg-green-300';
    if (percentage >= 60) return 'bg-green-200';
    if (percentage >= 50) return 'bg-yellow-200';
    return 'bg-yellow-100';
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center pb-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline"
            size="sm" 
            onClick={() => setViewMode('day')}
            className={viewMode === 'day' ? 'bg-primary text-primary-foreground' : ''}
          >
            Day
          </Button>
          <Button 
            variant="outline"
            size="sm" 
            onClick={() => setViewMode('week')}
            className={viewMode === 'week' ? 'bg-primary text-primary-foreground' : ''}
          >
            Week
          </Button>
          <Button 
            variant="outline"
            size="sm" 
            onClick={() => setViewMode('month')}
            className={viewMode === 'month' ? 'bg-primary text-primary-foreground' : ''}
          >
            Month
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToPrevious}
            disabled={viewMode === 'day' ? selectedDay <= 1 : viewMode === 'week' ? selectedWeek <= 1 : true}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center px-2">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{viewLabel}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={goToNext}
            disabled={viewMode === 'day' ? selectedDay >= 31 : viewMode === 'week' ? selectedWeek >= 5 : true}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>
      
      <div className="flex items-center space-x-4 mb-3">
        <Badge className="bg-green-100 text-green-800">
          {overallMatchingPercentage}% Time Matched
        </Badge>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-1 text-sm">
            <div className="w-3 h-3 rounded bg-green-500"></div>
            <span>90-100%</span>
          </div>
          <div className="flex items-center space-x-1 text-sm ml-3">
            <div className="w-3 h-3 rounded bg-green-300"></div>
            <span>70-89%</span>
          </div>
          <div className="flex items-center space-x-1 text-sm ml-3">
            <div className="w-3 h-3 rounded bg-yellow-200"></div>
            <span>50-69%</span>
          </div>
          <div className="flex items-center space-x-1 text-sm ml-3">
            <div className="w-3 h-3 rounded bg-gray-100 dark:bg-gray-800"></div>
            <span>&lt;50%</span>
          </div>
        </div>
      </div>
      
      <div className="heatmap-container overflow-x-auto">
        <div className="min-w-full">
          <div className="flex">
            <div className="w-12 shrink-0"></div>
            {daysToShow.map(day => (
              <div key={day} className="flex-1 min-w-[40px] text-center text-xs font-medium">
                {viewMode === 'month' ? (day) : (
                  viewMode === 'week' ? `${day}` : ''
                )}
              </div>
            ))}
          </div>
          
          {hoursToShow.map(hour => (
            <div key={hour} className="flex">
              <div className="w-12 shrink-0 text-xs font-medium flex items-center justify-end pr-2">
                {hour}:00
              </div>
              {daysToShow.map(day => {
                const hourData = hourlyData.find(d => d.day === day && d.hour === hour);
                return (
                  <div 
                    key={`${day}-${hour}`} 
                    className={`flex-1 min-w-[40px] h-7 border-r border-b border-gray-100 dark:border-gray-800 ${
                      hourData ? getCellColor(hourData.matched, hourData.percentage) : 'bg-gray-50'
                    }`}
                    title={hourData ? `Day ${day}, ${hour}:00 - ${hourData.matched ? `${hourData.percentage}% matched` : 'Not matched'}` : ''}
                  >
                    {viewMode === 'day' && hourData && (
                      <div className="h-full w-full flex items-center justify-center text-xs font-medium">
                        {hourData.percentage}%
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex items-center justify-between pt-2 text-sm">
        <div className="text-muted-foreground">
          Showing {viewMode === 'day' ? '24 hours' : viewMode === 'week' ? `${daysToShow.length} days` : '31 days'} 
          of hourly renewable matching data.
        </div>
        
        <div className="font-medium">
          {viewMode === 'day' ? `${calculateDailyMatchingPercentage(selectedDay)}% matched on May ${selectedDay}` : ''}
        </div>
      </div>
    </div>
  );
};
