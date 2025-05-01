import { motion } from "framer-motion";
import { Users, Activity, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Customer } from "@/data/models";
interface CustomerMetricsCardsProps {
  customers: Customer[];
  countCustomersByStatus: (status: string) => number;
}
export function CustomerMetricsCards({
  customers,
  countCustomersByStatus
}: CustomerMetricsCardsProps) {
  return <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.4,
      delay: 0.1
    }}>
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-blue-500/5 opacity-70 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Users size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {countCustomersByStatus('active')} active, {countCustomersByStatus('pending')} pending
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.4,
      delay: 0.2
    }}>
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-500/5 opacity-70 group-hover:opacity-100 transition-opacity" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Total Consumption
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <Activity size={18} className="text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">
              {customers.reduce((acc, customer) => acc + customer.annualConsumption, 0).toFixed(1)} GWh
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Annual energy allocation
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{
      opacity: 0,
      scale: 0.95
    }} animate={{
      opacity: 1,
      scale: 1
    }} transition={{
      duration: 0.4,
      delay: 0.3
    }}>
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <div className="" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Average Matching Score
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <BarChart3 size={18} className="text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-3xl font-bold">
              {Math.round(customers.reduce((acc, customer) => acc + customer.matchingScore, 0) / customers.length)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Temporal matching between production and consumption
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>;
}