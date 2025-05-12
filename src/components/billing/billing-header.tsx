
import { motion } from "framer-motion";
import { Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@/components/ui/popover";
import { format } from "date-fns";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BillingHeaderProps {
  calendarOpen: boolean;
  setCalendarOpen: (open: boolean) => void;
  selectDate: (date: Date) => void;
  selectedMonth: Date;
}

export function BillingHeader({ 
  calendarOpen, 
  setCalendarOpen, 
  selectDate,
  selectedMonth 
}: BillingHeaderProps) {
  const { t } = useLanguage();
  
  return (
    <motion.div 
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{t("billing")}</h2>
        <p className="text-muted-foreground">
          {t("platformUsage")}
        </p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline"
              className="gap-2"
              onClick={() => setCalendarOpen(true)}
            >
              <Calendar size={16} />
              {t("selectPeriod")}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <div className="p-4">
              <div className="space-y-2">
                <h4 className="font-medium">Select Month</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const monthDate = new Date(2025, i, 1);
                    return (
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        onClick={() => selectDate(monthDate)}
                        className={selectedMonth.getMonth() === i ? "bg-primary text-primary-foreground" : ""}
                      >
                        {format(monthDate, "MMM")}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        <Button 
          className="gap-2"
        >
          <Download size={16} />
          {t("downloadInvoice")}
        </Button>
      </div>
    </motion.div>
  );
}
