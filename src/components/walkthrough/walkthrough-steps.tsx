
import { ReactNode } from "react";

export type WalkthroughStep = {
  id: string;
  title: string;
  description: ReactNode;
  spotlight?: string; // Element ID to spotlight
  placement?: "top" | "bottom" | "left" | "right";
  subIndex?: number; // For steps that have multiple sub-steps, like sidebar navigation
}

export const walkthroughSteps: WalkthroughStep[] = [
  {
    id: "welcome",
    title: "Welcome to the Utility Portal",
    description: (
      <div className="space-y-4">
        <p>Welcome to your personalized utility dashboard. This walkthrough will guide you through the key features of the portal.</p>
        
        <div className="border rounded-md p-4 max-h-48 overflow-y-auto bg-slate-50 dark:bg-slate-900 text-sm">
          <h4 className="font-bold mb-2">Service Agreement</h4>
          <p className="mb-2">This Utility Service Agreement ("Agreement") is made between You ("User") and Our Company.</p>
          <p className="mb-2">1. <strong>Services:</strong> We provide access to the Utility Portal for monitoring and managing your renewable energy portfolio.</p>
          <p className="mb-2">2. <strong>User Responsibilities:</strong> You agree to provide accurate information, maintain account security, and use the portal in compliance with all applicable laws.</p>
          <p className="mb-2">3. <strong>Data Collection:</strong> We collect usage data to improve the service and provide analytics.</p>
          <p className="mb-2">4. <strong>Confidentiality:</strong> We maintain the confidentiality of your data and will not share it with unauthorized third parties.</p>
          <p className="mb-2">5. <strong>Term:</strong> This agreement is effective from the date of acceptance until terminated.</p>
          <p className="mb-2">6. <strong>Termination:</strong> Either party may terminate this agreement with written notice.</p>
          <p>7. <strong>Governing Law:</strong> This agreement is governed by the laws of the jurisdiction in which our company is registered.</p>
        </div>
      </div>
    ),
    placement: "bottom"
  },
  {
    id: "dashboard",
    title: "Your Dashboard",
    description: "This is your main dashboard where you can view key metrics about your renewable energy portfolio at a glance. The cards show your total capacity, production, availability, and customer information.",
    spotlight: "dashboard-metrics-cards",
    placement: "bottom"
  },
  {
    id: "charts",
    title: "Performance Charts",
    description: "These charts provide detailed insights into your energy production, energy mix distribution, and future projections. You can filter time ranges and download reports.",
    spotlight: "dashboard-charts", 
    placement: "bottom"
  },
  {
    id: "notification",
    title: "Notifications",
    description: "Click here to view important updates, alerts, and messages related to your portfolio and the platform. You can also restart this walkthrough anytime by clicking this notification bell.",
    spotlight: "notification-bell",
    placement: "bottom"
  },
  {
    id: "sidebar",
    title: "Navigation Menu",
    description: "Use the sidebar to navigate between different sections of the portal. We'll highlight each section one by one. Click 'Next Item' to see each section.",
    placement: "right",
    subIndex: 0 // Start with the first item (Assets)
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "You've completed the onboarding walkthrough. Feel free to explore the portal, and if you need this guide again, click the notification bell in the header.",
    placement: "bottom"
  }
];
