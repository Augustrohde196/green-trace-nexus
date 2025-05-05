
import { motion } from "framer-motion";

export function DashboardHeader() {
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
    </motion.div>
  );
}
