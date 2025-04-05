
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface OnboardingProgressProps<T extends string> {
  steps: Array<{ id: T; label: string }>;
  currentStep: T;
  onStepClick: (stepId: T) => void;
}

export function OnboardingProgress<T extends string>({ 
  steps, 
  currentStep, 
  onStepClick 
}: OnboardingProgressProps<T>) {
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  return (
    <div className="flex justify-between">
      {steps.map((step, index) => {
        const isActive = step.id === currentStep;
        const isCompleted = index < currentStepIndex;
        const isClickable = index <= currentStepIndex;

        return (
          <div 
            key={step.id} 
            className="flex flex-col items-center relative"
            onClick={() => isClickable && onStepClick(step.id)}
          >
            {/* Line connecting steps */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "absolute top-4 h-0.5 w-full right-0 translate-x-1/2",
                  isCompleted ? "bg-primary" : "bg-muted"
                )}
                style={{ width: `${100 / (steps.length - 1)}%` }}
              />
            )}

            {/* Step circle */}
            <div 
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-2 z-10 transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground"
                  : isCompleted 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-muted text-muted-foreground",
                isClickable && "cursor-pointer hover:opacity-80"
              )}
            >
              {isCompleted ? <Check size={16} /> : index + 1}
            </div>

            {/* Step label */}
            <span 
              className={cn(
                "text-xs font-medium",
                isActive 
                  ? "text-primary" 
                  : isCompleted 
                    ? "text-primary" 
                    : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
