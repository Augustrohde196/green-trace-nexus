
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { walkthroughSteps, WalkthroughStep } from "./walkthrough-steps";
import { X } from "lucide-react";

interface WalkthroughDialogProps {
  open: boolean;
  onClose: () => void;
}

export function WalkthroughDialog({ open, onClose }: WalkthroughDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [agreementAccepted, setAgreementAccepted] = useState(false);
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>({});
  const [spotlightStyle, setSpotlightStyle] = useState<React.CSSProperties>({});
  const [spotlightElement, setSpotlightElement] = useState<HTMLElement | null>(null);
  const [dialogPosition, setDialogPosition] = useState<{ top?: string; bottom?: string; left?: string; right?: string }>({});
  const [sidebarIndex, setSidebarIndex] = useState(0);

  const step = walkthroughSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === walkthroughSteps.length - 1;

  // When the walkthrough opens, always start from the first step
  useEffect(() => {
    if (open) {
      setCurrentStep(0);
      setAgreementAccepted(false);
    }
  }, [open]);

  // Add a custom class to the body to style the background overlay
  useEffect(() => {
    if (open) {
      document.body.classList.add("walkthrough-active");
      
      // For sidebar navigation steps with subIndex, update the sidebar item to highlight
      if (step && step.subIndex !== undefined) {
        setSidebarIndex(step.subIndex);
      }
      
      if (step && step.spotlight) {
        // Add custom data attribute to the sidebar menu items for targeting
        const sidebarItems = document.querySelectorAll(".sidebar-menu-item");
        sidebarItems.forEach((item, index) => {
          item.setAttribute("id", `sidebar-menu-item-${index}`);
        });
        
        // Remove previous spotlight styles
        const previousSpotlight = document.querySelector(".spotlight-element");
        if (previousSpotlight) {
          previousSpotlight.classList.remove("spotlight-element");
        }
        
        // Find the spotlight element and apply the spotlight
        const element = document.getElementById(step.spotlight);
        if (element) {
          setSpotlightElement(element);
          element.classList.add("spotlight-element");
          
          // Calculate positions for the spotlight and dialog based on the element
          const rect = element.getBoundingClientRect();
          const padding = 10; // Add some padding around the element
          
          // Calculate the spotlight style (element's position + padding)
          const newSpotlightStyle = {
            position: "fixed",
            top: `${rect.top - padding}px`,
            left: `${rect.left - padding}px`,
            width: `${rect.width + padding * 2}px`,
            height: `${rect.height + padding * 2}px`,
            borderRadius: "4px",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.6)",
            pointerEvents: "none",
            zIndex: 1000,
          };
          setSpotlightStyle(newSpotlightStyle);
          
          // Calculate the dialog position based on placement
          const placement = step.placement || "bottom";
          let newDialogPosition = {};
          
          switch (placement) {
            case "bottom":
              newDialogPosition = {
                top: `${rect.bottom + padding + 20}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translateX(-50%)",
              };
              break;
            case "top":
              newDialogPosition = {
                bottom: `${window.innerHeight - rect.top + padding + 20}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: "translateX(-50%)",
              };
              break;
            case "left":
              newDialogPosition = {
                top: `${rect.top + rect.height / 2}px`,
                right: `${window.innerWidth - rect.left + padding + 20}px`,
                transform: "translateY(-50%)",
              };
              break;
            case "right":
              newDialogPosition = {
                top: `${rect.top + rect.height / 2}px`,
                left: `${rect.right + padding + 20}px`,
                transform: "translateY(-50%)",
              };
              break;
          }
          
          setDialogPosition(newDialogPosition);
          setOverlayStyle({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)", // Semi-transparent overlay
            backdropFilter: "blur(1px)",
            zIndex: 999,
            pointerEvents: "none",
          });
        } else {
          // If no spotlight, center the dialog
          setSpotlightStyle({});
          setDialogPosition({});
          setOverlayStyle({
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(1px)",
            zIndex: 999,
            pointerEvents: "none",
          });
        }
      } else {
        // No spotlight for this step, center the dialog
        setSpotlightStyle({});
        setDialogPosition({});
        setOverlayStyle({
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(1px)",
          zIndex: 999,
          pointerEvents: "none",
        });
      }
    } else {
      document.body.classList.remove("walkthrough-active");
      
      // Clean up spotlight classes
      const spotlightElements = document.querySelectorAll(".spotlight-element");
      spotlightElements.forEach(element => {
        element.classList.remove("spotlight-element");
      });
      
      setOverlayStyle({});
      setSpotlightStyle({});
      setDialogPosition({});
    }
  }, [open, currentStep, step]);

  // Handle next and back buttons
  const handleNext = () => {
    if (currentStep < walkthroughSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  // Get the button label based on step
  const getButtonLabel = () => {
    if (isLastStep) return "Finish";
    
    // For sidebar navigation steps, use "Next Item" unless it's the last navigation step
    if (step.subIndex !== undefined) {
      const nextStep = walkthroughSteps[currentStep + 1];
      if (nextStep && nextStep.subIndex !== undefined) {
        return "Next Item";
      }
    }
    
    return "Next";
  };

  // Check if the next button should be disabled (only for the first step if agreement not accepted)
  const isNextDisabled = isFirstStep && !agreementAccepted;

  return (
    <>
      {/* Semi-transparent overlay */}
      {open && <div style={overlayStyle} />}
      
      {/* Spotlight highlight */}
      {open && spotlightElement && <div style={spotlightStyle} />}
      
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent 
          className="sm:max-w-md"
          style={{
            position: Object.keys(dialogPosition).length > 0 ? "fixed" : "relative",
            ...dialogPosition,
            zIndex: 1001,
          }}
        >
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <DialogHeader>
            <DialogTitle>{step.title}</DialogTitle>
            <DialogDescription className="pt-2">
              {step.description}
              
              {isFirstStep && (
                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox 
                    id="terms" 
                    checked={agreementAccepted} 
                    onCheckedChange={(checked) => setAgreementAccepted(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the agreement
                  </label>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter className="flex flex-row justify-between sm:justify-between gap-2">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isFirstStep}
              >
                Back
              </Button>
              
              {!isLastStep && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSkip}
                >
                  Skip
                </Button>
              )}
            </div>
            
            <Button 
              type="button" 
              disabled={isNextDisabled}
              onClick={handleNext}
            >
              {getButtonLabel()}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
