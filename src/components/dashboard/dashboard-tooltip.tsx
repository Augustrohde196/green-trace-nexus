
import { InfoIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";

interface DashboardTooltipProps {
  content: string | ReactNode;
}

export function DashboardTooltip({ content }: DashboardTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <InfoIcon className="h-4 w-4 text-muted-foreground hover:text-primary cursor-help transition-colors ml-1" />
        </TooltipTrigger>
        <TooltipContent className="max-w-xs bg-background/95 backdrop-blur-sm border border-border/50 shadow-lg">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
