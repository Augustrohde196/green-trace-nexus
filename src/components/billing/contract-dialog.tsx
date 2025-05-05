
import { FileText, Calendar, FileCheck, User, Bookmark, Shield, CreditCard } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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
        <DialogHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-full">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <DialogTitle className="text-2xl">{contractDetails.title}</DialogTitle>
            </div>
            <Badge variant="outline" className="ml-2">v{contractDetails.version}</Badge>
          </div>
          <DialogDescription className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Valid from <span className="font-medium">{contractDetails.startDate}</span> to <span className="font-medium">{contractDetails.endDate}</span>
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
          <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
            <FileCheck className="h-8 w-8 text-green-500 mb-2" />
            <h3 className="font-medium">Active Contract</h3>
            <p className="text-sm text-muted-foreground text-center">All terms and conditions apply</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
            <User className="h-8 w-8 text-blue-500 mb-2" />
            <h3 className="font-medium">Authorized Users</h3>
            <p className="text-sm text-muted-foreground text-center">Unlimited platform access</p>
          </div>
          
          <div className="flex flex-col items-center justify-center p-4 bg-muted/20 rounded-lg">
            <Shield className="h-8 w-8 text-purple-500 mb-2" />
            <h3 className="font-medium">Legal Protection</h3>
            <p className="text-sm text-muted-foreground text-center">Terms & privacy included</p>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        {/* Subscription Tiers */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            Subscription Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {contractDetails.subscriptionTiers.map((tier, i) => (
              <div 
                key={i} 
                className="flex flex-col p-4 border rounded-lg hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{tier.name}</h4>
                  <div className="font-bold text-primary">
                    DKK {tier.price.toLocaleString()}<span className="text-xs text-muted-foreground">/month</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Financial Terms */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Financial Terms
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Pricing Model</h4>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-sm">{contractDetails.pricingModel}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Commission Structure</h4>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-sm">{contractDetails.commissionStructure}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Revenue Sharing Model</h4>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-sm">{contractDetails.revenueSharing}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">White-Label Licensing Terms</h4>
              <div className="p-3 bg-muted/20 rounded-lg">
                <p className="text-sm">{contractDetails.whiteLabeling}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md text-sm mt-6 border border-blue-100 dark:border-blue-900/30">
          <p className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-500" />
            <span>This is a summary of your agreement. Please refer to the full contract document for complete terms and conditions.</span>
          </p>
        </div>
        
        <DialogFooter className="mt-6">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
