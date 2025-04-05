
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { PlugIcon, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  utilityProvider: z.string().min(1, {
    message: "Please select your electricity provider.",
  }),
  contractNumber: z.string().min(3, {
    message: "Please enter a valid contract number.",
  }),
  annualConsumption: z.number().min(1, {
    message: "Annual consumption must be greater than 0.",
  }),
  peakLoad: z.number().min(0.1, {
    message: "Peak load must be greater than 0.1 MW.",
  }),
});

interface ProviderSelectionStepProps {
  data: {
    utilityProvider: string;
    contractNumber: string;
    consumptionDetails: {
      annualConsumption: number;
      peakLoad: number;
    };
  };
  updateData: (data: {
    utilityProvider: string;
    contractNumber: string;
    consumptionDetails: {
      annualConsumption: number;
      peakLoad: number;
    };
  }) => void;
}

export function ProviderSelectionStep({ data, updateData }: ProviderSelectionStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      utilityProvider: data.utilityProvider,
      contractNumber: data.contractNumber,
      annualConsumption: data.consumptionDetails.annualConsumption || 0,
      peakLoad: data.consumptionDetails.peakLoad || 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData({
      utilityProvider: values.utilityProvider,
      contractNumber: values.contractNumber,
      consumptionDetails: {
        annualConsumption: values.annualConsumption,
        peakLoad: values.peakLoad,
      },
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <PlugIcon className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Electricity Provider Details</h3>
          <p className="text-sm text-muted-foreground">
            Provide information about your current electricity setup so we can connect with your data.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="utilityProvider"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Electricity Provider</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your electricity provider" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="energinet">Energinet</SelectItem>
                    <SelectItem value="orsted">Ørsted</SelectItem>
                    <SelectItem value="vattenfall">Vattenfall</SelectItem>
                    <SelectItem value="eon">E.ON</SelectItem>
                    <SelectItem value="nrgi">NRGi</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the company that supplies your electricity
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contract Number</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. ELS-12345678" {...field} />
                </FormControl>
                <FormDescription>
                  Found on your electricity bill or contract
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-muted/40 p-4 rounded-lg space-y-4">
            <div className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              <h4 className="text-base font-medium">Consumption Information</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="annualConsumption"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annual Consumption (GWh)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g. 25" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="peakLoad"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peak Load (MW)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g. 5.5" 
                        {...field} 
                        onChange={e => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="hidden">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
