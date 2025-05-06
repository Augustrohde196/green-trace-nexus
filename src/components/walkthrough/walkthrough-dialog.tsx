import { useEffect, useState, useRef, CSSProperties } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalkthroughStep } from "./walkthrough-steps";
import { useWalkthrough } from "@/hooks/use-walkthrough";

interface WalkthroughDialogProps {
  onClose: () => void;
}

export function WalkthroughDialog({ onClose }: WalkthroughDialogProps) {
  const { currentStep, currentStepIndex, totalSteps, nextStep, prevStep, isLastStep } = useWalkthrough();
  const [spotlightStyles, setSpotlightStyles] = useState<CSSProperties>({});
  const [overlayVisible, setOverlayVisible] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Position dialog based on spotlight element and placement
  useEffect(() => {
    if (!currentStep) return;
    
    setTimeout(() => setOverlayVisible(true), 100);
    
    if (currentStep.spotlight) {
      const element = document.getElementById(currentStep.spotlight);
      
      if (element) {
        // Add class to spotlight element
        element.classList.add("spotlight-element");
        
        // Get element position and size
        const rect = element.getBoundingClientRect();
        
        // Set spotlight styles
        setSpotlightStyles({
          position: "absolute",
          top: `${rect.top}px`,
          left: `${rect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          borderRadius: "4px",
          boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.75)",
          pointerEvents: "none" as "none",
          zIndex: 1000,
        });
        
        // Position dialog based on placement
        if (dialogRef.current) {
          const dialogRect = dialogRef.current.getBoundingClientRect();
          let top, left;
          
          switch (currentStep.placement) {
            case "top":
              top = rect.top - dialogRect.height - 10;
              left = rect.left + (rect.width / 2) - (dialogRect.width / 2);
              break;
            case "bottom":
              top = rect.bottom + 10;
              left = rect.left + (rect.width / 2) - (dialogRect.width / 2);
              break;
            case "left":
              top = rect.top + (rect.height / 2) - (dialogRect.height / 2);
              left = rect.left - dialogRect.width - 10;
              break;
            case "right":
              top = rect.top + (rect.height / 2) - (dialogRect.height / 2);
              left = rect.right + 10;
              break;
            default:
              top = rect.bottom + 10;
              left = rect.left + (rect.width / 2) - (dialogRect.width / 2);
          }
          
          // Keep dialog in viewport
          const maxLeft = window.innerWidth - dialogRect.width - 10;
          const maxTop = window.innerHeight - dialogRect.height - 10;
          
          dialogRef.current.style.top = `${Math.max(10, Math.min(maxTop, top))}px`;
          dialogRef.current.style.left = `${Math.max(10, Math.min(maxLeft, left))}px`;
        }
      } else {
        // Reset spotlight if element not found
        setSpotlightStyles({});
      }
    } else {
      // Center dialog if no spotlight
      setSpotlightStyles({});
      
      if (dialogRef.current) {
        dialogRef.current.style.top = "50%";
        dialogRef.current.style.left = "50%";
        dialogRef.current.style.transform = "translate(-50%, -50%)";
      }
    }
    
    return () => {
      // Clean up spotlight on element
      if (currentStep?.spotlight) {
        const element = document.getElementById(currentStep.spotlight);
        if (element) {
          element.classList.remove("spotlight-element");
        }
      }
    };
  }, [currentStep]);

  if (!currentStep) return null;

  return (
    <>
      {/* Full screen overlay with spotlight cutout */}
      {overlayVisible && <div className="fixed inset-0 bg-black bg-opacity-0 z-50 transition-all duration-300" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} />}
      {overlayVisible && Object.keys(spotlightStyles).length > 0 && <div className="spotlight" style={spotlightStyles} />}
      
      {/* Dialog */}
      <div 
        ref={dialogRef}
        className="fixed bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md z-[1001] animate-fade-in"
        style={{ width: "380px" }}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{currentStep.title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X size={20} />
            <span className="sr-only">Close</span>
          </button>
        </div>
        
        <div className="mb-6 text-gray-600 dark:text-gray-300">
          {currentStep.description}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Step {currentStepIndex + 1} of {totalSteps}
          </div>
          
          <div className="flex space-x-2">
            {currentStepIndex > 0 && (
              <Button variant="outline" onClick={prevStep}>Back</Button>
            )}
            
            <Button onClick={isLastStep ? onClose : nextStep}>
              {isLastStep ? "Done" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
