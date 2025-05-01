
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Customer } from "@/data/models";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Building, MapPin, Factory, Zap, BarChart3, Calendar } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CustomerDetailsDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CustomerDetailsDialog({ 
  customer, 
  open, 
  onOpenChange 
}: CustomerDetailsDialogProps) {
  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">{customer.name}</DialogTitle>
          <div className="flex items-center text-muted-foreground mt-1 gap-2">
            <MapPin size={16} />
            <span>{customer.location}</span>
          </div>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh]">
          <div className="p-6 pt-2 space-y-6">
            {/* Customer Status */}
            <div className="flex justify-between items-center">
              <Badge 
                variant={customer.status === 'active' ? 'success' : 'outline'} 
                className={`${customer.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'} cursor-default px-3 py-1`}
              >
                {customer.status === 'active' ? (
                  <><Check size={14} className="mr-2" /> Active</>
                ) : (
                  <><Clock size={14} className="mr-2" /> Pending</>
                )}
              </Badge>
              
              <Badge 
                className={getScoreBadgeClass(customer.matchingScore) + " cursor-default px-3 py-1"}
              >
                Matching Score: {customer.matchingScore}%
              </Badge>
            </div>
            
            <Separator />
            
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-medium mb-3">Company Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Building size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Industry</div>
                    <div>{customer.industry}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Factory size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Portfolio Status</div>
                    <div>{customer.portfolioStatus}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Annual Consumption</div>
                    <div>{customer.annualConsumption.toFixed(1)} GWh/year</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <div>
                    <div className="text-sm text-muted-foreground">Onboarded</div>
                    <div>January 15, 2023</div>
                  </div>
                </div>
              </div>
            </div>
            
            <Separator />
            
            {/* Portfolio Mix */}
            <div>
              <h3 className="text-lg font-medium mb-3">Energy Portfolio</h3>
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">Portfolio Mix</div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-[#735DFF]/20 text-[#735DFF] hover:bg-[#735DFF]/30 cursor-default px-3 py-1">
                    Wind: {customer.preferredMix?.wind || customer.portfolioMix.wind}%
                  </Badge>
                  <Badge variant="outline" className="bg-[#D9F0C2]/20 text-[#D9F0C2] hover:bg-[#D9F0C2]/30 cursor-default px-3 py-1">
                    Solar: {customer.preferredMix?.solar || customer.portfolioMix.solar}%
                  </Badge>
                </div>
              </div>
              
              {/* Asset Allocations */}
              {customer.assets.length > 0 && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Asset Allocations</div>
                  <div className="space-y-2">
                    {customer.assets.map((asset) => (
                      <div key={asset.assetId} className="bg-muted/30 rounded-md p-3 flex justify-between">
                        <div>
                          <div className="font-medium">{asset.assetName}</div>
                          <div className="text-sm text-muted-foreground">
                            {asset.assetType === 'wind' ? (
                              <Badge variant="outline" className="bg-[#735DFF]/20 text-[#735DFF] cursor-default">Wind</Badge>
                            ) : (
                              <Badge variant="outline" className="bg-[#D9F0C2]/20 text-[#D9F0C2] cursor-default">Solar</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">{asset.allocatedCapacity} MW</div>
                          <div className="text-sm text-muted-foreground">Allocated Capacity</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {customer.assets.length === 0 && (
                <div className="bg-muted/30 rounded-md p-4 text-center text-muted-foreground">
                  No assets have been allocated to this customer yet.
                </div>
              )}
            </div>
            
            <Separator />
            
            {/* Matching Score Details */}
            <div>
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <BarChart3 size={18} className="mr-2" />
                Time Matching Details
              </h3>
              <div className="bg-muted/30 rounded-md p-4">
                <div className="font-medium text-center text-lg mb-2">{customer.matchingScore}%</div>
                <div className="text-sm text-muted-foreground text-center">
                  Temporal matching between renewable production and customer consumption patterns.
                  {customer.matchingScore >= 80 ? (
                    <p className="text-green-500 mt-1">Excellent matching score! This customer's consumption pattern aligns very well with the production profile.</p>
                  ) : customer.matchingScore >= 60 ? (
                    <p className="text-amber-500 mt-1">Good matching score. There is moderate alignment between consumption and production patterns.</p>
                  ) : (
                    <p className="text-red-500 mt-1">Low matching score. This customer's consumption pattern does not align well with the production profile.</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-2">
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

function getScoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
  if (score >= 50) return "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30";
  return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
}
