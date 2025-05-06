
import { useState, createContext, useContext, useCallback, useEffect } from "react";
import { WalkthroughDialog } from "@/components/walkthrough/walkthrough-dialog";
import { useToast } from "@/components/ui/use-toast";
import { walkthroughSteps, WalkthroughStep } from "@/components/walkthrough/walkthrough-steps";

interface WalkthroughContextType {
  isWalkthroughOpen: boolean;
  startWalkthrough: () => void;
  closeWalkthrough: () => void;
  currentStep: WalkthroughStep | undefined;
  currentStepIndex: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  isLastStep: boolean;
}

const WalkthroughContext = createContext<WalkthroughContextType>({
  isWalkthroughOpen: false,
  startWalkthrough: () => {},
  closeWalkthrough: () => {},
  currentStep: undefined,
  currentStepIndex: 0,
  totalSteps: 0,
  nextStep: () => {},
  prevStep: () => {},
  isLastStep: false
});

// Check if this is the first visit to show walkthrough automatically
const isFirstVisit = () => {
  const visited = localStorage.getItem('walkthrough-visited');
  return !visited;
};

export const WalkthroughProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const { toast } = useToast();
  
  const totalSteps = walkthroughSteps.length;
  const currentStep = isWalkthroughOpen ? walkthroughSteps[currentStepIndex] : undefined;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Show walkthrough on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstVisit()) {
        setIsWalkthroughOpen(true);
        localStorage.setItem('walkthrough-visited', 'true');
      }
    }, 1500); // Small delay to allow the UI to load
    
    return () => clearTimeout(timer);
  }, []);

  const startWalkthrough = useCallback(() => {
    // Always start from the beginning when opening walkthrough
    setCurrentStepIndex(0);
    setIsWalkthroughOpen(true);
  }, []);

  const closeWalkthrough = useCallback(() => {
    setIsWalkthroughOpen(false);
    toast({
      title: "Walkthrough closed",
      description: "You can restart the walkthrough anytime from the notification icon in the header.",
      duration: 3000,
    });
  }, [toast]);

  const nextStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.min(prev + 1, totalSteps - 1));
  }, [totalSteps]);

  const prevStep = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(prev - 1, 0));
  }, []);

  return (
    <WalkthroughContext.Provider 
      value={{ 
        isWalkthroughOpen, 
        startWalkthrough, 
        closeWalkthrough, 
        currentStep, 
        currentStepIndex, 
        totalSteps, 
        nextStep, 
        prevStep, 
        isLastStep 
      }}
    >
      {children}
      {isWalkthroughOpen && <WalkthroughDialog onClose={closeWalkthrough} />}
    </WalkthroughContext.Provider>
  );
};

export const useWalkthrough = () => {
  return useContext(WalkthroughContext);
};
