
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink } from "lucide-react";

const IntegrationsSection = () => {
  const { toast } = useToast();
  
  const handleEnerginetConnect = () => {
    // Open a new window to the Energinet authorization URL
    window.open('https://energinet.dk/authorize', '_blank');
    
    toast({
      title: "Redirecting to Energinet",
      description: "Please complete the authorization process with your MitID."
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Energinet Integration</CardTitle>
          <CardDescription>Connect your account with Energinet for meter data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* New Energinet banner for non-connected state */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-2">
                <h3 className="font-medium text-blue-800 dark:text-blue-400">Your account is not yet linked to Energinet</h3>
                <p className="text-sm text-blue-700/80 dark:text-blue-500/80">
                  Connect to Energinet to enable automated data updates for official meter readings and certificate handling.
                </p>
                <p className="text-xs text-blue-700/80 dark:text-blue-500/80">
                  You will need to use your MitID (national digital ID) to authorize this connection.
                </p>
              </div>
              <Button 
                onClick={handleEnerginetConnect} 
                className="gap-2 whitespace-nowrap"
              >
                Connect Now
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationsSection;
