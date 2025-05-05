
import { useEffect, useState } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { walkthroughSteps, WalkthroughStep } from "./walkthrough-steps";

interface WalkthroughDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WalkthroughDialog({ open, onClose }: WalkthroughDialogProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasAgreed, setHasAgreed] = useState(false);
  
  const currentStep = walkthroughSteps[currentStepIndex];
  
  // For highlighting UI elements
  useEffect(() => {
    if (open && currentStep?.spotlight) {
      const element = document.getElementById(currentStep.spotlight);
      if (element) {
        // Highlight logic - add pulse animation and border
        element.classList.add("ring-2", "ring-primary", "ring-offset-2", "transition-all");
        
        // Scroll to element if needed
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        
        return () => {
          // Clean up highlight
          element.classList.remove("ring-2", "ring-primary", "ring-offset-2", "transition-all");
        };
      }
    }
  }, [open, currentStep]);
  
  const nextStep = () => {
    // For first step, require agreement
    if (currentStepIndex === 0) {
      const agreeCheckbox = document.getElementById("agree-checkbox") as HTMLInputElement;
      if (agreeCheckbox && !agreeCheckbox.checked) {
        setHasAgreed(false);
        // Animation to indicate required checkbox
        agreeCheckbox.classList.add("animate-pulse");
        setTimeout(() => {
          agreeCheckbox.classList.remove("animate-pulse");
        }, 1000);
        return;
      }
      setHasAgreed(true);
    }
    
    if (currentStepIndex < walkthroughSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Close on last step
      onClose();
    }
  };
  
  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleSkip = () => {
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 shadow-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 p-6 pt-12 text-white">
              <div 
                className="absolute top-2 right-2 cursor-pointer rounded-full hover:bg-white/20 p-1"
                onClick={onClose}
              >
                <X size={16} />
              </div>
              <h2 className="text-xl font-bold">{currentStep.title}</h2>
              <div className="flex mt-4">
                {walkthroughSteps.map((_, idx) => (
                  <div 
                    key={idx} 
                    className={`h-1 flex-1 mx-0.5 rounded-full ${idx === currentStepIndex ? "bg-white" : "bg-white/30"}`}
                  />
                ))}
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-sm text-gray-700 dark:text-gray-300">
                {currentStep.description}
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-900 flex justify-between items-center border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
              >
                Skip
              </Button>
              
              <div className="flex gap-2">
                {currentStepIndex > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevStep}
                    className="gap-1"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </Button>
                )}
                
                <Button
                  onClick={nextStep}
                  size="sm"
                  className="gap-1"
                  disabled={currentStepIndex === 0 && !hasAgreed}
                >
                  {currentStepIndex === walkthroughSteps.length - 1 ? "Finish" : "Next"}
                  {currentStepIndex < walkthroughSteps.length - 1 && <ArrowRight size={16} />}
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
