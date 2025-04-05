
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AccountCreationStep } from "./steps/account-creation-step";
import { PortfolioSelectionStep } from "./steps/portfolio-selection-step";
import { ProviderSelectionStep } from "./steps/provider-selection-step";
import { PoaUploadStep } from "./steps/poa-upload-step";
import { ReviewStep } from "./steps/review-step";
import { OnboardingProgress } from "./onboarding-progress";

interface OnboardingFormProps {
  onComplete: () => void;
  isSubmitting: boolean;
}

type OnboardingStep = 
  | "account" 
  | "portfolio" 
  | "provider" 
  | "poa" 
  | "review";

type OnboardingData = {
  // Account data
  companyName: string;
  email: string;
  password: string;
  industry: string;
  // Portfolio preferences
  portfolioPreferences: {
    solarPercentage: number;
    windPercentage: number;
    timeMatching: "hourly" | "daily" | "monthly";
    locationPreference: "local" | "regional" | "national";
  };
  // Provider data
  utilityProvider: string;
  contractNumber: string;
  consumptionDetails: {
    annualConsumption: number;
    peakLoad: number;
  };
  // PoA data
  poaUploaded: boolean;
  poaFile: File | null;
};

const defaultData: OnboardingData = {
  companyName: "",
  email: "",
  password: "",
  industry: "",
  portfolioPreferences: {
    solarPercentage: 50,
    windPercentage: 50,
    timeMatching: "hourly",
    locationPreference: "regional",
  },
  utilityProvider: "",
  contractNumber: "",
  consumptionDetails: {
    annualConsumption: 0,
    peakLoad: 0,
  },
  poaUploaded: false,
  poaFile: null
};

const steps: Array<{ id: OnboardingStep; label: string }> = [
  { id: "account", label: "Account" },
  { id: "portfolio", label: "Portfolio" },
  { id: "provider", label: "Provider" },
  { id: "poa", label: "Authorization" },
  { id: "review", label: "Review" },
];

export function OnboardingForm({ onComplete, isSubmitting }: OnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("account");
  const [formData, setFormData] = useState<OnboardingData>(defaultData);

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStep === "review";

  const updateFormData = (stepId: OnboardingStep, data: Partial<OnboardingData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };

  const goToPreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };

  const handleSubmit = () => {
    if (isLastStep) {
      onComplete();
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="space-y-8">
      <OnboardingProgress 
        steps={steps} 
        currentStep={currentStep} 
        onStepClick={(stepId: OnboardingStep) => {
          // Only allow clicking on previous steps or the current step
          const clickedIndex = steps.findIndex(step => step.id === stepId);
          if (clickedIndex <= currentStepIndex) {
            setCurrentStep(stepId);
          }
        }} 
      />

      <Tabs value={currentStep} className="w-full">
        <TabsContent value="account">
          <AccountCreationStep 
            data={formData} 
            updateData={(data) => updateFormData("account", data)} 
          />
        </TabsContent>
        <TabsContent value="portfolio">
          <PortfolioSelectionStep 
            data={formData.portfolioPreferences} 
            updateData={(data) => updateFormData("portfolio", { portfolioPreferences: data })} 
          />
        </TabsContent>
        <TabsContent value="provider">
          <ProviderSelectionStep 
            data={{ 
              utilityProvider: formData.utilityProvider, 
              contractNumber: formData.contractNumber,
              consumptionDetails: formData.consumptionDetails
            }} 
            updateData={(data) => updateFormData("provider", data)} 
          />
        </TabsContent>
        <TabsContent value="poa">
          <PoaUploadStep 
            data={{ poaUploaded: formData.poaUploaded, poaFile: formData.poaFile }} 
            updateData={(data) => updateFormData("poa", data)} 
          />
        </TabsContent>
        <TabsContent value="review">
          <ReviewStep data={formData} />
        </TabsContent>
      </Tabs>

      <div className="flex justify-between pt-4">
        {!isFirstStep && (
          <Button 
            variant="outline" 
            onClick={goToPreviousStep}
            disabled={isSubmitting}
          >
            Previous
          </Button>
        )}
        <div className="flex-1"></div>
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isLastStep ? "Complete Setup" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
