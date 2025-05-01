
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string | ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  className,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.2 }}
    >
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {Icon && (
            <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && (
            <div className="text-xs text-muted-foreground mt-1 flex items-center">
              {description}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
