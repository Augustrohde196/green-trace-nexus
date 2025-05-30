
import { FileText, Calendar, FileCheck, Shield, CreditCard, ChevronDown, ChevronUp } from "lucide-react";
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
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [expandedSection, setExpandedSection] = useState<string | null>("tiers");
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Identify the user's current tier
  const currentTier = contractDetails.subscriptionTiers.find(tier => 
    tier.name === "Professional"
  );
  
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        {/* Hero Header - Updated to use primary gradient instead of blue */}
        <div className="bg-gradient-to-r from-primary to-primary/80 text-white p-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-lg">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{contractDetails.title}</h2>
              <p className="text-white/90 flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                Valid from {contractDetails.startDate} to {contractDetails.endDate}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              v{contractDetails.version}
            </Badge>
            <Badge variant="secondary" className="bg-green-500/90 hover:bg-green-500 text-white">
              Active
            </Badge>
          </div>
        </div>
        
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {/* Contract Status Cards - Removed User card as requested */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-4 rounded-xl flex flex-col items-center text-center">
              <div className="bg-primary text-white p-2 rounded-full mb-2">
                <FileCheck className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-primary-foreground dark:text-primary">Active Contract</h3>
              <p className="text-xs text-muted-foreground mt-1">Legally binding</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 p-4 rounded-xl flex flex-col items-center text-center">
              <div className="bg-green-500 text-white p-2 rounded-full mb-2">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-green-900 dark:text-green-300">Legal Protection</h3>
              <p className="text-xs text-green-700 dark:text-green-400 mt-1">Terms & privacy included</p>
            </div>
          </div>
          
          {/* Subscription Tiers - With added notes and highlighting current tier */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection("tiers")}
              className="w-full flex justify-between items-center mb-3 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Badge className="h-5 w-5 text-primary p-0 flex items-center justify-center" variant="outline">
                  <span className="text-xs font-bold">$</span>
                </Badge>
                <h3 className="text-lg font-medium">Subscription Tiers</h3>
              </div>
              {expandedSection === "tiers" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSection === "tiers" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {contractDetails.subscriptionTiers.map((tier, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "flex flex-col p-5 border rounded-xl transition-shadow",
                        currentTier?.name === tier.name
                          ? "bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-md"
                          : "bg-gradient-to-br from-white to-muted/20 dark:from-muted/5 dark:to-muted/10 hover:shadow-md"
                      )}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-lg">{tier.name}</h4>
                          {currentTier?.name === tier.name && (
                            <Badge className="bg-primary text-white">Current</Badge>
                          )}
                        </div>
                        <div className="font-bold text-primary text-lg">
                          DKK {tier.price.toLocaleString()}<span className="text-xs text-muted-foreground">/month</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{tier.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-700/30 rounded-md">
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    <strong>Note:</strong> These tiers are specifically designed for white label utility customers. 
                    Higher tiers include additional features such as API access, custom branding options, 
                    and enhanced customer support levels.
                  </p>
                </div>
              </>
            )}
          </div>
          
          {/* Financial Terms - Removed commission structure as requested */}
          <div className="mb-6">
            <button 
              onClick={() => toggleSection("financial")}
              className="w-full flex justify-between items-center mb-3 bg-muted/30 p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-medium">Financial Terms</h3>
              </div>
              {expandedSection === "financial" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
            
            {expandedSection === "financial" && (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    Pricing Model
                  </h4>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm">{contractDetails.pricingModel}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                    Revenue Sharing Model
                  </h4>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm">{contractDetails.revenueSharing}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-medium flex items-center gap-1">
                    <span className="h-2 w-2 bg-amber-500 rounded-full"></span>
                    White-Label Licensing Terms
                  </h4>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm">
                      The Utility Portal can be white-labeled with your company's branding, including logo, colors, and domain name.
                      This license allows you to present the platform as your own service to end-users, while we maintain and update the 
                      underlying technology. All data reporting capabilities and verification features remain intact regardless of branding.
                      Any custom development requests will be subject to additional fees and approval.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-5 rounded-lg text-sm flex items-center gap-4 mt-6 border border-primary/20">
            <FileText className="h-10 w-10 text-primary shrink-0" />
            <div>
              <h4 className="font-medium">Legal Notice</h4>
              <p className="text-muted-foreground mt-1">
                This is a summary of your agreement. Please refer to the full contract document for complete terms and conditions.
              </p>
            </div>
          </div>
        </div>
        
        <DialogFooter className="p-4 border-t bg-muted/10">
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            className="mr-2"
          >
            Close
          </Button>
          <Button>
            Download PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
