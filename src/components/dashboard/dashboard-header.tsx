
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useWalkthrough } from "@/hooks/use-walkthrough";
import { HelpCircle } from "lucide-react";

export function DashboardHeader() {
  const { startWalkthrough } = useWalkthrough();
  
  return (
    <motion.div 
      className="flex justify-between items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Overview of your renewable energy portfolio</p>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800"
        onClick={startWalkthrough}
        title="Start guided walkthrough"
      >
        <HelpCircle className="h-5 w-5 text-blue-500" />
      </Button>
    </motion.div>
  );
}
