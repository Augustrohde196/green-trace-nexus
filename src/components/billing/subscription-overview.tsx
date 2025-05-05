
import { motion } from "framer-motion";
import { CreditCard, FileText, HelpCircle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SubscriptionOverviewProps {
  billingData: {
    subscriptionTier: string;
    pricePerMWh: number;
    commission: number;
    billingFrequency: string;
  };
  onViewContract: () => void;
}

export function SubscriptionOverview({ billingData, onViewContract }: SubscriptionOverviewProps) {
  return (
    <Card className="overflow-hidden border hover:border-primary/50 hover:shadow-sm transition-all">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-primary" />
          Subscription Overview
        </CardTitle>
        <CardDescription>
          Details of your platform subscription and pricing
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Subscription Tier</div>
            <div className="text-lg font-bold">{billingData.subscriptionTier}</div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Price per MWh</div>
            <div className="text-lg font-bold">DKK {billingData.pricePerMWh}</div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              Renuw Spread
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>The fixed margin Renuw earns per MWh transacted through the platform. This includes infrastructure, reporting, and platform services.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="text-lg font-bold">DKK 20</div>
          </div>
          
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-sm text-muted-foreground">Billing Frequency</div>
            <div className="text-lg font-bold">{billingData.billingFrequency}</div>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="text-sm font-medium mb-1">Service Agreement</div>
          <div className="flex items-center justify-between gap-2 p-3 border rounded-lg">
            <div className="text-sm">
              Renuw Platform Utility Agreement
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1"
              onClick={onViewContract}
              type="button"
            >
              <FileText size={14} />
              View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
