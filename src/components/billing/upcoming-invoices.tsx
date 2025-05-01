
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function UpcomingInvoices() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card className="border hover:border-primary/50 hover:shadow-sm transition-all">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Upcoming Invoices
          </CardTitle>
          <CardDescription>
            Preview of upcoming billing cycles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-muted/20 rounded-lg border">
              <div className="flex-1">
                <div className="font-medium">May 2025 Invoice</div>
                <div className="text-sm text-muted-foreground">Estimated: DKK 73,000</div>
              </div>
              <Badge variant="warning" className="pointer-events-none">
                Upcoming
              </Badge>
            </div>
            
            <div className="flex items-center p-4 bg-muted/20 rounded-lg border">
              <div className="flex-1">
                <div className="font-medium">June 2025 Invoice</div>
                <div className="text-sm text-muted-foreground">Estimated: DKK 75,000</div>
              </div>
              <Badge variant="outline" className="pointer-events-none">
                Projected
              </Badge>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/10 text-blue-800 dark:text-blue-300 rounded-md">
            <h4 className="font-medium">Billing Information</h4>
            <p className="text-sm mt-2">
              The standard rate for GO matching and allocation services is <span className="font-medium">DKK 20 per MWh</span> of 
              allocated renewable energy. This fee covers AI-powered GO allocation, temporal matching between production and consumption,
              portfolio optimization, GO tracking, and customer-specific analytics.
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
