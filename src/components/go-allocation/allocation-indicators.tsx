
import { AlertTriangle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AllocationDataPoint } from "./allocation-overview-chart";

interface AllocationIndicatorsProps {
  currentData: AllocationDataPoint;
}

export function AllocationIndicators({ currentData }: AllocationIndicatorsProps) {
  return (
    <div className="mt-6 space-y-4">
      {currentData.shortfall && currentData.shortfall > 0 && (
        <div className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300 rounded-md">
          <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Shortfall Alert</p>
            <p className="text-sm">{currentData.shortfall} MWh of customer consumption went unfulfilled due to lack of supply.</p>
          </div>
        </div>
      )}
      
      {currentData.excess && currentData.excess > 0 && (
        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 text-amber-800 dark:text-amber-300 rounded-md">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Excess Supply</p>
            <p className="text-sm">{currentData.excess} MWh of renewable energy was not allocated (excess).</p>
          </div>
        </div>
      )}
      
      <TooltipProvider>
        <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md">
          <Info className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Certificate Retirement Notice</p>
            <p className="text-sm">Allocated GOs need to be formally cancelled/retired in the official registry. 
              <Tooltip>
                <TooltipTrigger className="underline ml-1 cursor-help">Learn more</TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p>Renuw marks GOs as internally retired in its ledger, but the utility/trader must execute the actual retirement in Energinet or the relevant registry.</p>
                </TooltipContent>
              </Tooltip>
            </p>
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
}
