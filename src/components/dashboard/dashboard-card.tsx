
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  description?: string | ReactNode;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export function DashboardCard({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  className,
}: DashboardCardProps) {
  // Get a custom shadow color based on the iconColor
  const getShadowColor = () => {
    if (iconColor.includes("blue")) return "shadow-blue-200/50";
    if (iconColor.includes("amber")) return "shadow-amber-200/50";
    if (iconColor.includes("green")) return "shadow-green-200/50";
    if (iconColor.includes("purple")) return "shadow-purple-200/50";
    return "shadow-primary/20";
  };

  const shadowColor = getShadowColor();

  return (
    <motion.div
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`group overflow-hidden border hover:border-primary/50 hover:shadow-sm transition-all ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {Icon && (
            <div className={`flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 ${iconColor} ${shadowColor} group-hover:bg-primary/15 transition-colors`}>
              <Icon className="h-5 w-5" />
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
