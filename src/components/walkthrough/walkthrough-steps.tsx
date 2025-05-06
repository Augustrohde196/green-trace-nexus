
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
    title: "Navigation Menu - Dashboard",
    description: "Use the sidebar to navigate between different sections of the portal. We'll highlight each section one by one. The Dashboard gives you an overview of your renewable energy portfolio.",
    spotlight: "sidebar-menu-item-0",
    placement: "right",
    subIndex: 0
  },
  {
    id: "sidebar-certificates",
    title: "Navigation Menu - My Certificates",
    description: "View and manage your renewable energy certificates. Track your certificates' status, expiration, and allocation details.",
    spotlight: "sidebar-menu-item-1",
    placement: "right",
    subIndex: 1
  },
  {
    id: "sidebar-consumption",
    title: "Navigation Menu - Consumption",
    description: "Monitor your energy consumption patterns, view historical data, and analyze your usage trends over time.",
    spotlight: "sidebar-menu-item-2",
    placement: "right",
    subIndex: 2
  },
  {
    id: "sidebar-tracing",
    title: "Navigation Menu - Certificate Tracing",
    description: "Trace the origin of your renewable energy certificates with detailed visualization of production assets.",
    spotlight: "sidebar-menu-item-3",
    placement: "right",
    subIndex: 3
  },
  {
    id: "sidebar-analytics",
    title: "Navigation Menu - Analytics",
    description: "Access detailed analytics about your energy portfolio, including time matching scores and performance metrics.",
    spotlight: "sidebar-menu-item-4",
    placement: "right",
    subIndex: 4
  },
  {
    id: "sidebar-portfolio",
    title: "Navigation Menu - Portfolio Settings",
    description: "Customize your energy portfolio preferences including energy mix, location, and other settings.",
    spotlight: "sidebar-menu-item-5",
    placement: "right",
    subIndex: 5
  },
  {
    id: "sidebar-reporting",
    title: "Navigation Menu - ESG Reporting",
    description: "Generate sustainability reports and download data for compliance purposes.",
    spotlight: "sidebar-menu-item-6",
    placement: "right",
    subIndex: 6
  },
  {
    id: "sidebar-billing",
    title: "Navigation Menu - Billing",
    description: "Manage your subscription and payment details, and view your billing history.",
    spotlight: "sidebar-menu-item-7",
    placement: "right",
    subIndex: 7
  },
  {
    id: "sidebar-settings",
    title: "Navigation Menu - Settings",
    description: "Configure your account settings, security options, and integration preferences.",
    spotlight: "sidebar-menu-item-8",
    placement: "right",
    subIndex: 8
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "You've completed the onboarding walkthrough. Feel free to explore the portal, and if you need this guide again, click the notification bell in the header.",
    placement: "bottom"
  }
];
