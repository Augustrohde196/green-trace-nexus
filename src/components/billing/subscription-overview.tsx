
import { motion } from "framer-motion";
import { CreditCard, FileText } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            <div className="text-sm text-muted-foreground">Commission Rate</div>
            <div className="text-lg font-bold">{billingData.commission}%</div>
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
