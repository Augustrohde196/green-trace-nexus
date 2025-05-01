

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/data/models";

interface CustomersListProps {
  customers: Customer[];
  onCustomerClick: (customer: Customer) => void;
}

export function CustomersList({ customers, onCustomerClick }: CustomersListProps) {
  if (customers.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-center">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">No customers found</h3>
          <p className="text-muted-foreground">
            There are no customers matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {customers.map((customer) => (
        <motion.div
          key={customer.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => onCustomerClick(customer)}
          className="cursor-pointer"
        >
          <Card className="overflow-hidden hover:border-primary/30 hover:bg-muted/20 transition-all">
            <CardContent className="p-0">
              <div className="grid grid-cols-11 items-center p-4">
                <div className="col-span-3">
                  <div className="font-semibold">{customer.name}</div>
                  <div className="text-sm text-muted-foreground">{customer.location}</div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm flex items-center space-x-2">
                    <span>Portfolio Status:</span>
                    <span className="font-medium">{customer.portfolioStatus}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {customer.annualConsumption.toFixed(1)} GWh/year
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="text-sm mb-1">Portfolio Mix</div>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="bg-[#735DFF]/20 text-[#735DFF] hover:bg-[#735DFF]/30 cursor-default">
                      Wind: {customer.preferredMix?.wind || customer.portfolioMix.wind}%
                    </Badge>
                    <Badge variant="outline" className="bg-[#D9F0C2]/20 text-[#D9F0C2] hover:bg-[#D9F0C2]/30 cursor-default">
                      Solar: {customer.preferredMix?.solar || customer.portfolioMix.solar}%
                    </Badge>
                  </div>
                </div>
                <div className="col-span-2 px-4">
                  <div className="text-sm mb-1">Time Matching</div>
                  <Badge 
                    className={getScoreBadgeClass(customer.matchingScore) + " cursor-default"}
                  >
                    {customer.matchingScore}%
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

function getScoreBadgeClass(score: number): string {
  if (score >= 80) return "bg-green-500/20 text-green-500 hover:bg-green-500/30";
  if (score >= 50) return "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30";
  return "bg-red-500/20 text-red-500 hover:bg-red-500/30";
}

