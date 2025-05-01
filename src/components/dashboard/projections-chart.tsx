
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectionsChart() {
  const projected = {
    producedLastMonth: 1700,
    projectedNextMonth: 1830,
    shortfall: 180,
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Card className="bg-red-50/30 hover:bg-red-50/70 transition-colors dark:bg-red-900/10 dark:hover:bg-red-900/20 border-red-100 dark:border-red-900/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-red-600 dark:text-red-400">
              Projected Shortfall
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-800/20 flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">{projected.shortfall} MWh</div>
            <p className="text-xs text-red-600/70 dark:text-red-400/70 mt-1">
              Based on current customer consumption patterns
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Sourcing Recommendations
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Purchase 120 MWh from Wind Trader</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Purchase 60 MWh from Solar Trader</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
