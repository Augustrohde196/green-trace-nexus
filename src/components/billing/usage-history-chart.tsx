
import { BarChart } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";

interface UsageHistoryItem {
  month: string;
  usage: number;
  cost: number;
}

interface UsageHistoryChartProps {
  usageHistory: UsageHistoryItem[];
}

export function UsageHistoryChart({ usageHistory }: UsageHistoryChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="border hover:border-primary/50 hover:shadow-sm transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-primary" />
            Usage History
          </CardTitle>
          <CardDescription>
            Monthly MWh usage and cost over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 mt-4">
            <div className="flex h-full items-end gap-2">
              {usageHistory.map((month, index) => (
                <div key={index} className="flex flex-col items-center flex-1 h-full">
                  <div className="flex-1 flex flex-col items-center justify-end w-full">
                    <div className="text-xs mb-1">DKK {month.cost.toLocaleString()}</div>
                    <div 
                      className="bg-primary/80 w-full rounded-t-md transition-all duration-500 relative group"
                      style={{ 
                        height: `${(month.usage / 4000) * 100}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <div className="absolute top-0 left-0 transform -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded p-1 text-xs whitespace-nowrap">
                        {month.usage} MWh - DKK {month.cost.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs pt-2">{month.month}</div>
                  <div className="text-xs text-muted-foreground">{month.usage} MWh</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
