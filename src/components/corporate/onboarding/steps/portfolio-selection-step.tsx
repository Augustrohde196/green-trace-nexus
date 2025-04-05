import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { BarChart3, Wind, SunMedium, Clock, MapPin } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  solarPercentage: z.number().min(0).max(100),
  windPercentage: z.number().min(0).max(100),
  timeMatching: z.enum(["hourly", "daily", "monthly"]),
  locationPreference: z.enum(["local", "regional", "national"]),
});

interface PortfolioSelectionStepProps {
  data: {
    solarPercentage: number;
    windPercentage: number;
    timeMatching: "hourly" | "daily" | "monthly";
    locationPreference: "local" | "regional" | "national";
  };
  updateData: (data: {
    solarPercentage: number;
    windPercentage: number;
    timeMatching: "hourly" | "daily" | "monthly";
    locationPreference: "local" | "regional" | "national";
  }) => void;
}

export function PortfolioSelectionStep({ data, updateData }: PortfolioSelectionStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      solarPercentage: data.solarPercentage,
      windPercentage: data.windPercentage,
      timeMatching: data.timeMatching,
      locationPreference: data.locationPreference,
    },
  });

  // Keep solar and wind percentages in sync (always add up to 100%)
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "solarPercentage") {
        const solarValue = value.solarPercentage as number;
        form.setValue("windPercentage", 100 - solarValue);
      } else if (name === "windPercentage") {
        const windValue = value.windPercentage as number;
        form.setValue("solarPercentage", 100 - windValue);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData(values);
  }

  const solarPercentage = form.watch("solarPercentage");
  const windPercentage = form.watch("windPercentage");

  return (
    <div className="space-y-4">
      <div className="flex items-start space-x-4">
        <div className="bg-primary/10 p-3 rounded-full">
          <BarChart3 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Customize Your Portfolio</h3>
          <p className="text-sm text-muted-foreground">
            Configure your renewable energy preferences to match your sustainability goals.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <h4 className="text-base font-medium mb-4">Energy Source Mix</h4>
            <div className="space-y-8">
              <FormField
                control={form.control}
                name="solarPercentage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <SunMedium className="h-5 w-5 mr-2 text-amber-500" />
                        <FormLabel>Solar</FormLabel>
                      </div>
                      <span className="font-medium">{solarPercentage}%</span>
                    </div>
                    <FormControl>
                      <Slider 
                        defaultValue={[field.value]} 
                        max={100} 
                        step={1} 
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="windPercentage"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <Wind className="h-5 w-5 mr-2 text-blue-500" />
                        <FormLabel>Wind</FormLabel>
                      </div>
                      <span className="font-medium">{windPercentage}%</span>
                    </div>
                    <FormControl>
                      <Slider 
                        defaultValue={[field.value]} 
                        max={100} 
                        step={1} 
                        onValueChange={(vals) => field.onChange(vals[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <FormField
                control={form.control}
                name="timeMatching"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center mb-3">
                      <Clock className="h-5 w-5 mr-2" />
                      <FormLabel className="text-base font-medium">Time Matching</FormLabel>
                    </div>
                    <FormDescription className="mb-3">
                      Choose how closely your consumption should match production.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hourly" id="hourly" />
                          <Label htmlFor="hourly">Hourly (Premium)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="daily" id="daily" />
                          <Label htmlFor="daily">Daily</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="monthly" id="monthly" />
                          <Label htmlFor="monthly">Monthly</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <FormField
                control={form.control}
                name="locationPreference"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center mb-3">
                      <MapPin className="h-5 w-5 mr-2" />
                      <FormLabel className="text-base font-medium">Location Preference</FormLabel>
                    </div>
                    <FormDescription className="mb-3">
                      Choose your preferred proximity to power generation.
                    </FormDescription>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="local" id="local" />
                          <Label htmlFor="local">Local (≤ 50km)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="regional" id="regional" />
                          <Label htmlFor="regional">Regional (≤ 200km)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="national" id="national" />
                          <Label htmlFor="national">National</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                  Price Impact
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">+14%</span>
                  <span className="text-xs text-muted-foreground ml-1">est.</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                  Additionality
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">High</span>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/5">
              <CardContent className="p-4">
                <div className="text-xs uppercase font-semibold text-muted-foreground mb-1">
                  Availability
                </div>
                <div className="flex items-center">
                  <span className="text-lg font-bold">Good</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button type="submit" className="hidden">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
