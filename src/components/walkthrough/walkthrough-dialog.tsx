
import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface WalkthroughDialogProps {
  open: boolean;
  onClose: () => void;
}

const walkthroughSteps = [
  {
    title: "Welcome to Renuw",
    description: "Please review and sign the service agreement to get started.",
    content: (
      <>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Service Agreement</h3>
          <ScrollArea className="h-[240px] border rounded-md p-4 bg-muted/20">
            <div className="text-sm text-muted-foreground">
              <p className="mb-3"><strong>RENUW SERVICE AGREEMENT</strong></p>
              <p className="mb-3">This Service Agreement ("Agreement") is entered into by and between Renuw Energy Solutions ("Renuw") and the user ("User") of Renuw's renewable energy management platform.</p>
              <p className="mb-3"><strong>1. SERVICES</strong></p>
              <p className="mb-3">Renuw provides a digital platform for managing, tracking, and optimizing renewable energy assets, certificates, and energy consumption data. Services include but are not limited to asset management, certificate tracking, portfolio optimization, and sustainability reporting.</p>
              <p className="mb-3"><strong>2. USER RESPONSIBILITIES</strong></p>
              <p className="mb-3">User agrees to provide accurate information, maintain account security, comply with applicable laws and regulations, and use the platform in accordance with its intended purpose.</p>
              <p className="mb-3"><strong>3. TERM AND TERMINATION</strong></p>
              <p className="mb-3">This Agreement commences upon User's acceptance and continues until terminated. Either party may terminate with 30 days written notice. Renuw may terminate immediately if User violates this Agreement.</p>
              <p className="mb-3"><strong>4. CONFIDENTIALITY</strong></p>
              <p className="mb-3">Both parties agree to maintain the confidentiality of proprietary information shared during the course of using the platform.</p>
              <p className="mb-3"><strong>5. DATA PRIVACY</strong></p>
              <p className="mb-3">Renuw collects and processes data in accordance with its Privacy Policy and applicable data protection laws. User consents to such collection and processing for the purpose of providing the services.</p>
              <p className="mb-3"><strong>6. INTELLECTUAL PROPERTY</strong></p>
              <p className="mb-3">All intellectual property rights in the platform belong to Renuw. User is granted a non-exclusive, non-transferable license to use the platform for the duration of this Agreement.</p>
              <p className="mb-3"><strong>7. LIMITATION OF LIABILITY</strong></p>
              <p className="mb-3">Renuw's liability is limited to the fees paid by User in the preceding 12 months. Renuw is not liable for indirect, consequential, or incidental damages.</p>
              <p className="mb-3"><strong>8. WARRANTY DISCLAIMER</strong></p>
              <p className="mb-3">The platform is provided "as is" without warranties of any kind, either express or implied.</p>
              <p className="mb-3"><strong>9. GOVERNING LAW</strong></p>
              <p className="mb-3">This Agreement is governed by the laws of Denmark without regard to its conflict of law provisions.</p>
              <p className="mb-3"><strong>10. ENTIRE AGREEMENT</strong></p>
              <p className="mb-3">This Agreement constitutes the entire agreement between the parties regarding the subject matter hereof.</p>
            </div>
          </ScrollArea>
        </div>
      </>
    ),
    requiresScroll: true,
    requiresCheck: true
  },
  {
    title: "Dashboard Overview",
    description: "Your dashboard provides a centralized view of your renewable energy assets.",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs">1</span>
            Energy Portfolio Overview
          </h3>
          <p className="text-sm text-muted-foreground">
            View your total capacity, production metrics, and availability at a glance.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs">2</span>
            Production Charts
          </h3>
          <p className="text-sm text-muted-foreground">
            Track production trends, energy mix distribution, and future projections.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500 text-white text-xs">3</span>
            Customer Insights
          </h3>
          <p className="text-sm text-muted-foreground">
            Monitor corporate customer metrics and matching scores for efficient energy allocation.
          </p>
        </div>
      </div>
    ),
    requiresScroll: false,
    requiresCheck: false
  },
  {
    title: "Asset Management",
    description: "Explore and manage your renewable energy assets with ease.",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Asset Overview</h3>
          <p className="text-sm text-muted-foreground">
            View all renewable assets in your portfolio, including production metrics, location data, and status information.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Asset Map</h3>
          <p className="text-sm text-muted-foreground">
            Geographically visualize your assets across regions and monitor their performance in real-time.
          </p>
        </div>
      </div>
    ),
    requiresScroll: false,
    requiresCheck: false
  },
  {
    title: "Customer Management",
    description: "Manage corporate customers and their renewable energy needs.",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Customer Directory</h3>
          <p className="text-sm text-muted-foreground">
            Access your customer portfolio with detailed information on energy consumption, certificate allocation, and matching scores.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Customer Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Analyze customer energy needs, consumption patterns, and certificate requirements to optimize allocation strategies.
          </p>
        </div>
      </div>
    ),
    requiresScroll: false,
    requiresCheck: false
  },
  {
    title: "Certificate Matching",
    description: "Optimize certificate allocation across your customer base.",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Matching Engine</h3>
          <p className="text-sm text-muted-foreground">
            Our matching engine helps you allocate renewable energy certificates to customers based on their specific requirements and preferences.
          </p>
        </div>
        <div className="rounded-lg border p-4 bg-muted/20">
          <h3 className="font-semibold mb-2">Allocation Overview</h3>
          <p className="text-sm text-muted-foreground">
            View allocation metrics, shortfall/excess analyses, and customer breakdown statistics for better decision-making.
          </p>
        </div>
      </div>
    ),
    requiresScroll: false,
    requiresCheck: false
  },
  {
    title: "Onboarding Complete",
    description: "You're all set to use the Renuw platform!",
    content: (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Ready to Go!</h3>
        <div className="space-y-2 w-full max-w-md">
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-sm">Agreement signed</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-sm">Dashboard walkthrough completed</p>
          </div>
          <div className="flex items-center gap-2">
            <Check className="h-4 w-4 text-green-600" />
            <p className="text-sm">Portal features explored</p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            You can restart this walkthrough anytime by clicking the help icon in the header.
          </p>
        </div>
      </div>
    ),
    requiresScroll: false,
    requiresCheck: false
  }
];

export function WalkthroughDialog({ open, onClose }: WalkthroughDialogProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [hasCheckedAgreement, setHasCheckedAgreement] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const step = walkthroughSteps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === walkthroughSteps.length - 1;
  const progress = ((currentStep + 1) / walkthroughSteps.length) * 100;
  
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (step.requiresScroll) {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      const scrollPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollProgress(Math.min(scrollPercentage, 100));
      
      if (scrollTop + clientHeight >= scrollHeight - 10) {
        setHasScrolledToBottom(true);
      }
    }
  };
  
  const canProceed = () => {
    if (step.requiresScroll && !hasScrolledToBottom) return false;
    if (step.requiresCheck && !hasCheckedAgreement) return false;
    return true;
  };
  
  const handleNext = () => {
    if (canProceed()) {
      if (isLastStep) {
        onClose();
      } else {
        setCurrentStep(prev => prev + 1);
        setHasScrolledToBottom(false);
      }
    }
  };
  
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setHasScrolledToBottom(false);
    }
  };

  useEffect(() => {
    setHasScrolledToBottom(false);
    setScrollProgress(0);
  }, [currentStep]);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{step.title}</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 rounded-full p-0">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>{step.description}</DialogDescription>
          <Progress value={progress} className="h-1 mt-2" />
        </DialogHeader>
        
        <div className="flex-1 overflow-hidden">
          <div 
            className="pr-1 max-h-[400px] overflow-auto" 
            onScroll={handleScroll}
          >
            {step.content}
            
            {step.requiresCheck && (
              <div className="flex items-center space-x-2 mt-4 border-t pt-4">
                <Checkbox 
                  id="agreement" 
                  checked={hasCheckedAgreement} 
                  onCheckedChange={(checked) => setHasCheckedAgreement(checked === true)}
                  disabled={!hasScrolledToBottom}
                />
                <label
                  htmlFor="agreement"
                  className={cn(
                    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                    !hasScrolledToBottom && "text-muted-foreground"
                  )}
                >
                  I have read and agree to the service agreement
                </label>
              </div>
            )}
          </div>
        </div>
        
        {step.requiresScroll && !hasScrolledToBottom && (
          <div className="mb-2 mt-1 text-center">
            <Progress value={scrollProgress} className="h-1 mb-1" />
            <p className="text-xs text-muted-foreground">
              {scrollProgress < 100 ? "Please scroll to read the full agreement" : "You can now check the agreement box below"}
            </p>
          </div>
        )}
        
        <DialogFooter className="flex justify-between items-center mt-4 gap-2">
          <div>
            <span className="text-xs text-muted-foreground">
              Step {currentStep + 1} of {walkthroughSteps.length}
            </span>
          </div>
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {isLastStep ? (
              <Button onClick={handleNext}>
                Finish <Check className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
