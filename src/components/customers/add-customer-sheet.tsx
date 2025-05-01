
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CustomerForm, CustomerFormData } from "@/components/customers/customer-form";
import { NewCustomer } from "@/hooks/use-mock-customers";

interface AddCustomerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (customer: NewCustomer) => void;
}

export function AddCustomerSheet({
  open,
  onOpenChange,
  onSubmit
}: AddCustomerSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Corporate Customer</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <CustomerForm 
            onSubmit={(formData: CustomerFormData) => {
              const newCustomer: NewCustomer = {
                name: formData.name,
                location: formData.location,
                industry: formData.industry,
                annualConsumption: formData.annualConsumption,
                portfolioMix: {
                  solar: formData.solarPercentage,
                  wind: 100 - formData.solarPercentage
                },
                preferredMix: { 
                  wind: 100 - formData.solarPercentage,
                  solar: formData.solarPercentage 
                },
                portfolioStatus: "Not Allocated",
                matchingScore: Math.floor(Math.random() * (85 - 60) + 60), // Random score between 60-85
                localOnly: true,
                status: "pending"
              };
              
              onSubmit(newCustomer);
            }} 
            onCancel={() => onOpenChange(false)}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
