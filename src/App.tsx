
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { AppLayout } from "@/components/layout/app-layout";
import { CorporateLayout } from "@/components/layout/corporate-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { SignInPage } from "@/pages/auth/SignInPage";
import { SignUpPage } from "@/pages/auth/SignUpPage";
import { ResetPasswordPage } from "@/pages/auth/ResetPasswordPage";
import { CorporateOnboarding } from "@/pages/corporate/CorporateOnboarding";
import { WalkthroughProvider } from "@/hooks/use-walkthrough";

// Utility Portal Routes
import Index from "@/pages/Index";
import Assets from "@/pages/Assets";
import Customers from "@/pages/Customers";
import MatchingEngine from "@/pages/MatchingEngine";
import Analytics from "@/pages/Analytics";
import Billing from "@/pages/Billing";
import Reporting from "@/pages/Reporting";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

// Corporate Portal Routes
import { CorporateDashboard } from "@/pages/corporate/CorporateDashboard";
import { CorporatePortfolio } from "@/pages/corporate/CorporatePortfolio";
import { CorporateCertificates } from "@/pages/corporate/CorporateCertificates";
import { CorporateConsumption } from "@/pages/corporate/CorporateConsumption";
import { CorporateTracing } from "@/pages/corporate/CorporateTracing";
import { CorporateAnalytics } from "@/pages/corporate/CorporateAnalytics";
import { CorporateBilling } from "@/pages/corporate/CorporateBilling";

import { Toaster } from "@/components/ui/toaster";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <WalkthroughProvider>
        <Router>
          <Routes>
            {/* Utility Portal Routes */}
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/matching" element={<MatchingEngine />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
            
            {/* Corporate Portal Routes */}
            <Route element={<CorporateLayout />}>
              <Route path="/corporate" element={<CorporateDashboard />} />
              <Route path="/corporate/portfolio" element={<CorporatePortfolio />} />
              <Route path="/corporate/certificates" element={<CorporateCertificates />} />
              <Route path="/corporate/consumption" element={<CorporateConsumption />} />
              <Route path="/corporate/tracing" element={<CorporateTracing />} />
              <Route path="/corporate/analytics" element={<CorporateAnalytics />} />
              <Route path="/corporate/billing" element={<CorporateBilling />} />
            </Route>

            {/* Onboarding */}
            <Route path="/corporate/onboarding" element={<CorporateOnboarding />} />
            
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/auth/signin" element={<SignInPage />} />
              <Route path="/auth/signup" element={<SignUpPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
        <Toaster />
      </WalkthroughProvider>
    </ThemeProvider>
  );
}

export default App;
