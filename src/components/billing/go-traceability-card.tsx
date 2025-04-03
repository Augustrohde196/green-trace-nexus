
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function GOTraceabilityCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>GO Traceability</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Each Guarantee of Origin (GO) is uniquely tracked for every 1 MWh of renewable energy produced.
          GOs are allocated to corporate customers based on their portfolio preferences using our ML-powered matching engine.
        </p>
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => {}}
          >
            <FileText size={16} />
            Generate GO Traceability Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
