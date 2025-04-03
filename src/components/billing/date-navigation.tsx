
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DateNavigationProps {
  dateRangeDisplay: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function DateNavigation({ 
  dateRangeDisplay,
  onPreviousMonth,
  onNextMonth
}: DateNavigationProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" size="icon" onClick={onPreviousMonth}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h3 className="text-xl font-medium">{dateRangeDisplay}</h3>
      <Button variant="outline" size="icon" onClick={onNextMonth}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
