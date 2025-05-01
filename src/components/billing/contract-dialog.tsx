
import { FileText } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface ContractDetails {
  title: string;
  version: string;
  startDate: string;
  endDate: string;
  subscriptionTiers: Array<{
    name: string;
    price: number;
    description: string;
  }>;
  pricingModel: string;
  commissionStructure: string;
  revenueSharing: string;
  whiteLabeling: string;
}

interface ContractDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  contractDetails: ContractDetails;
}

export function ContractDialog({ 
  isOpen, 
  onOpenChange, 
  contractDetails 
}: ContractDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            {contractDetails.title}
          </DialogTitle>
          <DialogDescription>
            Version {contractDetails.version} · Valid from {contractDetails.startDate} to {contractDetails.endDate}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Subscription Tiers */}
          <div>
            <h3 className="text-lg font-medium mb-2">Subscription Tiers</h3>
            <div className="space-y-2">
              {contractDetails.subscriptionTiers.map((tier, i) => (
                <div key={i} className="flex justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{tier.name}</div>
                    <div className="text-sm text-muted-foreground">{tier.description}</div>
                  </div>
                  <div className="font-medium">DKK {tier.price.toLocaleString()}/month</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Pricing Model */}
          <div>
            <h3 className="text-lg font-medium mb-2">Pricing Model</h3>
            <div className="p-4 border rounded-lg">
              <p>{contractDetails.pricingModel}</p>
            </div>
          </div>
          
          {/* Commission Structure */}
          <div>
            <h3 className="text-lg font-medium mb-2">Commission Structure</h3>
            <div className="p-4 border rounded-lg">
              <p>{contractDetails.commissionStructure}</p>
            </div>
          </div>
          
          {/* Revenue Sharing */}
          <div>
            <h3 className="text-lg font-medium mb-2">Revenue Sharing Model</h3>
            <div className="p-4 border rounded-lg">
              <p>{contractDetails.revenueSharing}</p>
            </div>
          </div>
          
          {/* White-Label Licensing */}
          <div>
            <h3 className="text-lg font-medium mb-2">White-Label Licensing Terms</h3>
            <div className="p-4 border rounded-lg">
              <p>{contractDetails.whiteLabeling}</p>
            </div>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-md text-sm">
            This is a summary of your agreement. Please refer to the full contract document for complete terms and conditions.
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
