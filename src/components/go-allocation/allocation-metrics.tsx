
import { motion } from "framer-motion";
import { Zap, CheckCircle2, ArrowRight, PieChart } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MetricsProps {
  totalGOs: number;
  totalMWh: number;
  allocatedGOs: number;
  allocatedMWh: number;
  availableGOs: number;
  availableMWh: number;
  averageMatchingScore: number;
}

export function AllocationMetrics({ 
  totalGOs,
  totalMWh,
  allocatedGOs,
  allocatedMWh,
  availableGOs,
  availableMWh,
  averageMatchingScore
}: MetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="h-full"
      >
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Total GOs
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Zap size={18} className="text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{totalGOs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {totalMWh} MWh of renewable energy
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="h-full"
      >
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Allocated GOs
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{allocatedGOs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {allocatedMWh} MWh allocated to customers
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="h-full"
      >
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Available GOs
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
              <ArrowRight size={18} className="text-amber-600 dark:text-amber-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{availableGOs}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {availableMWh} MWh available for allocation
            </p>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="h-full"
      >
        <Card className="overflow-hidden group hover:border-primary/50 transition-colors h-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
            <CardTitle className="text-sm font-medium">
              Average Match Score
            </CardTitle>
            <div className="h-9 w-9 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <PieChart size={18} className="text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-2xl font-bold">{Math.round(averageMatchingScore)}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Temporal matching between production and consumption
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
