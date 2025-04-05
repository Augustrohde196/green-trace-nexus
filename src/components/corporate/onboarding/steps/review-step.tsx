
import { BarChart3, User, PlugIcon, FileText, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ReviewStepProps {
  data: {
    companyName: string;
    email: string;
    industry: string;
    portfolioPreferences: {
      solarPercentage: number;
      windPercentage: number;
      timeMatching: "hourly" | "daily" | "monthly";
      locationPreference: "local" | "regional" | "national";
    };
    utilityProvider: string;
    contractNumber: string;
    consumptionDetails: {
      annualConsumption: number;
      peakLoad: number;
    };
    poaUploaded: boolean;
  };
}

export function ReviewStep({ data }: ReviewStepProps) {
  // Format industry label
  const getIndustryLabel = (value: string) => {
    if (!value) return "Not specified";
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Format time matching label
  const getTimeMatchingLabel = (value: string) => {
    switch (value) {
      case "hourly": return "Hourly (Premium)";
      case "daily": return "Daily";
      case "monthly": return "Monthly";
      default: return value;
    }
  };

  // Format location preference label
  const getLocationLabel = (value: string) => {
    switch (value) {
      case "local": return "Local (≤ 50km)";
      case "regional": return "Regional (≤ 200km)";
      case "national": return "National";
      default: return value;
    }
  };

  // Format utility provider label
  const getUtilityLabel = (value: string) => {
    if (!value) return "Not specified";
    const providers: Record<string, string> = {
      energinet: "Energinet",
      orsted: "Ørsted",
      vattenfall: "Vattenfall",
      eon: "E.ON",
      nrgi: "NRGi",
      other: "Other"
    };
    return providers[value] || value;
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review the information below before finalizing your account setup.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <User className="h-5 w-5 mr-2 text-primary" />
              <h4 className="font-medium">Account Information</h4>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Company Name</p>
                  <p className="font-medium">{data.companyName || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{data.email || "Not provided"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Industry</p>
                <p className="font-medium">{getIndustryLabel(data.industry)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              <h4 className="font-medium">Portfolio Preferences</h4>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Energy Mix</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div 
                      className="bg-amber-500 h-2.5 rounded-l-full" 
                      style={{ width: `${data.portfolioPreferences.solarPercentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Solar: {data.portfolioPreferences.solarPercentage}%</span>
                  <span>Wind: {data.portfolioPreferences.windPercentage}%</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Time Matching</p>
                  <p className="font-medium">
                    {getTimeMatchingLabel(data.portfolioPreferences.timeMatching)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Location Preference</p>
                  <p className="font-medium">
                    {getLocationLabel(data.portfolioPreferences.locationPreference)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <PlugIcon className="h-5 w-5 mr-2 text-primary" />
              <h4 className="font-medium">Electricity Provider</h4>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Provider</p>
                  <p className="font-medium">{getUtilityLabel(data.utilityProvider)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Contract Number</p>
                  <p className="font-medium">{data.contractNumber || "Not provided"}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-sm text-muted-foreground">Annual Consumption</p>
                  <p className="font-medium">
                    {data.consumptionDetails.annualConsumption} GWh
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Peak Load</p>
                  <p className="font-medium">
                    {data.consumptionDetails.peakLoad} MW
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-5 w-5 mr-2 text-primary" />
              <h4 className="font-medium">Power of Attorney</h4>
            </div>
            <div>
              <div className="flex items-center">
                {data.poaUploaded ? (
                  <>
                    <div className="bg-green-100 text-green-600 rounded-full p-1 mr-2">
                      <Check className="h-4 w-4" />
                    </div>
                    <p className="font-medium text-green-600">Document Uploaded</p>
                  </>
                ) : (
                  <p className="text-amber-600 font-medium">No document uploaded</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 bg-muted/40 rounded-lg">
        <p className="text-sm text-center">
          By clicking "Complete Setup", you agree to our{" "}
          <a href="#" className="text-primary hover:underline">Terms of Service</a>{" "}
          and acknowledge our{" "}
          <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
