
import { useEffect, useState } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { walkthroughSteps, WalkthroughStep } from "./walkthrough-steps";
import { Checkbox } from "@/components/ui/checkbox";

interface WalkthroughDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WalkthroughDialog({ open, onClose }: WalkthroughDialogProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasAgreed, setHasAgreed] = useState(false);
  
  const currentStep = walkthroughSteps[currentStepIndex];
  
  // Reset to first step when reopening
  useEffect(() => {
    if (open) {
      setCurrentStepIndex(0);
      setHasAgreed(false);
    }
  }, [open]);
  
  // For highlighting UI elements
  useEffect(() => {
    // Remove highlights from all elements first
    const clearAllHighlights = () => {
      document.querySelectorAll('.walkthrough-highlight').forEach(el => {
        el.classList.remove('walkthrough-highlight', 'ring-2', 'ring-primary', 'ring-offset-2', 'transition-all', 'z-50');
      });
      
      // Remove overlay
      const existingOverlay = document.getElementById('walkthrough-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }
    };
    
    clearAllHighlights();
    
    if (open && currentStep?.spotlight) {
      // Create semi-transparent overlay
      const overlay = document.createElement('div');
      overlay.id = 'walkthrough-overlay';
      overlay.className = 'fixed inset-0 bg-black/60 pointer-events-none z-40';
      document.body.appendChild(overlay);
      
      // Handle spotlight on multiple elements for menu walkthrough
      if (currentStep.id === 'sidebar') {
        // For the navigation menu step, highlight menu items one by one
        const menuItemIndices = [1, 2, 3, 4, 5, 6]; // Skipping Dashboard (index 0)
        const menuItemIndex = currentStep.subIndex || 0;
        
        if (menuItemIndex < menuItemIndices.length) {
          const menuItems = document.querySelectorAll('.sidebar-menu-item');
          if (menuItems && menuItems[menuItemIndices[menuItemIndex]]) {
            const element = menuItems[menuItemIndices[menuItemIndex]] as HTMLElement;
            element.classList.add('walkthrough-highlight', 'ring-2', 'ring-primary', 'ring-offset-2', 'transition-all', 'z-50');
            element.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
      else if (currentStep.id === 'charts') {
        // For charts step, highlight both charts
        const productionChart = document.querySelector('.production-chart-container');
        const energyMixChart = document.querySelector('.energy-mix-chart-container');
        
        if (productionChart) {
          productionChart.classList.add('walkthrough-highlight', 'ring-2', 'ring-primary', 'ring-offset-2', 'transition-all', 'z-50');
        }
        
        if (energyMixChart) {
          energyMixChart.classList.add('walkthrough-highlight', 'ring-2', 'ring-primary', 'ring-offset-2', 'transition-all', 'z-50');
        }
        
        // Scroll to the first chart
        if (productionChart) {
          productionChart.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
      else {
        // For other steps, use the spotlight ID
        const element = document.getElementById(currentStep.spotlight);
        if (element) {
          element.classList.add('walkthrough-highlight', 'ring-2', 'ring-primary', 'ring-offset-2', 'transition-all', 'z-50');
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
    
    return () => {
      clearAllHighlights();
    };
  }, [open, currentStep, currentStep?.subIndex]);
  
  // Handle checkbox change for agreement
  const handleCheckboxChange = (checked: boolean) => {
    setHasAgreed(checked);
  };

  const nextStep = () => {
    // For first step, require agreement
    if (currentStepIndex === 0 && !hasAgreed) {
      // Animation to indicate required checkbox
      const agreeCheckbox = document.getElementById("agree-checkbox-container");
      if (agreeCheckbox) {
        agreeCheckbox.classList.add("animate-pulse");
        setTimeout(() => {
          agreeCheckbox.classList.remove("animate-pulse");
        }, 1000);
      }
      return;
    }
    
    // For navigation menu step, cycle through menu items
    if (currentStep.id === 'sidebar') {
      const nextSubIndex = (currentStep.subIndex || 0) + 1;
      if (nextSubIndex < 6) { // We have 6 menu items to highlight
        walkthroughSteps[currentStepIndex].subIndex = nextSubIndex;
        // Force a re-render
        setCurrentStepIndex(currentStepIndex);
        return;
      }
    }
    
    if (currentStepIndex < walkthroughSteps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      // Close on last step
      onClose();
    }
  };
  
  const prevStep = () => {
    // For navigation menu step, cycle back through menu items
    if (currentStep.id === 'sidebar' && currentStep.subIndex && currentStep.subIndex > 0) {
      walkthroughSteps[currentStepIndex].subIndex = currentStep.subIndex - 1;
      // Force a re-render
      setCurrentStepIndex(currentStepIndex);
      return;
    }
    
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  
  const handleSkip = () => {
    onClose();
  };
  
  const renderAgreementCheckbox = () => {
    if (currentStepIndex === 0) {
      return (
        <div className="flex items-center space-x-2" id="agree-checkbox-container">
          <Checkbox 
            id="agree-checkbox" 
            checked={hasAgreed}
            onCheckedChange={handleCheckboxChange}
            className="h-4 w-4"
          />
          <label htmlFor="agree-checkbox" className="text-sm cursor-pointer">
            I have read and agree to the Service Agreement
          </label>
        </div>
      );
    }
    return null;
  };

  // Determine button label based on current step
  const getNextButtonLabel = () => {
    if (currentStepIndex === walkthroughSteps.length - 1) {
      return "Finish";
    }
    
    if (currentStep.id === 'sidebar') {
      const subIndex = currentStep.subIndex || 0;
      if (subIndex < 5) { // If not on the last menu item
        return "Next Item";
      }
    }
    
    return "Next";
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="p-0 gap-0 max-w-md border-0 shadow-lg overflow-hidden z-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentStep.id}-${currentStep.subIndex || 0}`}
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
              {renderAgreementCheckbox()}
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
                {(currentStepIndex > 0 || (currentStep.id === 'sidebar' && (currentStep.subIndex || 0) > 0)) && (
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
                  {getNextButtonLabel()}
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
