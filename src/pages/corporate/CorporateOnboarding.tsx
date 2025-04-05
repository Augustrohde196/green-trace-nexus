
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { OnboardingForm } from "@/components/corporate/onboarding/onboarding-form";
import { useToast } from "@/components/ui/use-toast";

const CorporateOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComplete = () => {
    setIsSubmitting(true);
    
    // Simulate API call to create account and finalize onboarding
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Onboarding complete",
        description: "Your account has been set up successfully. Welcome to Renuw!",
      });
      navigate("/corporate");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome to Renuw</CardTitle>
          <CardDescription>
            Complete the following steps to set up your corporate account and start managing your renewable energy portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OnboardingForm onComplete={handleComplete} isSubmitting={isSubmitting} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Need help? Contact support@renuw.com
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CorporateOnboarding;
