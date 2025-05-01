
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface DateNavigationProps {
  selectedMonth: Date;
  goToPreviousMonth: () => void;
  goToNextMonth: () => void;
}

export function DateNavigation({ 
  selectedMonth, 
  goToPreviousMonth, 
  goToNextMonth 
}: DateNavigationProps) {
  // Calculate the first day of the selected month
  const firstDayOfMonth = new Date(selectedMonth.getFullYear(), selectedMonth.getMonth(), 1);
  
  // Format the date range for display
  const dateRangeDisplay = `${format(firstDayOfMonth, "MMMM yyyy")}`;

  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h3 className="text-xl font-medium">{dateRangeDisplay}</h3>
      <Button variant="outline" size="icon" onClick={goToNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
