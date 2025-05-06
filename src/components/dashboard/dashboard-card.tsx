
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
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
  return (
    <div id={`dashboard-card-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <Card className={`overflow-hidden border border-border/40 ${className}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 relative">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
          {Icon && (
            <div className={`flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 ${iconColor}`}>
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
    </div>
  );
}
