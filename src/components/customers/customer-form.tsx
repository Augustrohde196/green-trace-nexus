
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

export interface CustomerFormData {
  name: string;
  industry: string;
  location: string;
  annualConsumption: number;
  solarPercentage: number;
}

interface CustomerFormProps {
  onSubmit: (customer: CustomerFormData) => void;
  onCancel: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  industry: z.string().min(2, "Industry must be at least 2 characters."),
  location: z.string().min(2, "Location must be at least 2 characters."),
  annualConsumption: z.coerce.number().positive("Must be a positive number."),
  solarPercentage: z.number().min(0).max(100)
});

export function CustomerForm({ onSubmit, onCancel }: CustomerFormProps) {
  const [solarPercentage, setSolarPercentage] = useState(50);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      location: "",
      annualConsumption: 50,
      solarPercentage: 50
    }
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 pt-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry</FormLabel>
              <FormControl>
                <Input placeholder="e.g. Technology, Manufacturing, Retail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="City, State/Country" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="annualConsumption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Consumption (GWh)</FormLabel>
              <FormControl>
                <Input type="number" min="0" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="solarPercentage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Energy Portfolio Mix</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[field.value]}
                  onValueChange={(value) => {
                    field.onChange(value[0]);
                    setSolarPercentage(value[0]);
                  }}
                  className="py-4"
                />
              </FormControl>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#D9F0C2]"></div>
                  <span>Solar: {solarPercentage}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#735DFF]"></div>
                  <span>Wind: {100 - solarPercentage}%</span>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </Form>
  );
}
