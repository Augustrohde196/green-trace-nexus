
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface CustomerPageHeaderProps {
  onAddCustomerClick: () => void;
}

export function CustomerPageHeader({ onAddCustomerClick }: CustomerPageHeaderProps) {
  return (
    <motion.div 
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">
          Manage your corporate customers, their portfolios and allocations.
        </p>
      </div>
      <Button 
        onClick={onAddCustomerClick}
        className="gap-2"
      >
        <Plus size={16} />
        Add Customer
      </Button>
    </motion.div>
  );
}
