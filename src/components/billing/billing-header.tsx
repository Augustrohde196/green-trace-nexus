
import { Button } from "@/components/ui/button";
import { Calendar, Download } from "lucide-react";

export function BillingHeader() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">GO Billing</h2>
        <p className="text-muted-foreground">
          Manage billing for Guarantees of Origin (GOs) issued to utilities and traders
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button 
          variant="outline"
          className="gap-2"
          onClick={() => {}}
        >
          <Calendar size={16} />
          Select Period
        </Button>
        <Button 
          className="gap-2"
          onClick={() => {}}
        >
          <Download size={16} />
          Export Data
        </Button>
      </div>
    </div>
  );
}
