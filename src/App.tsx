
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

// Layout components
import { AppLayout } from "@/components/layout/app-layout";
import { AuthLayout } from "@/components/layout/auth-layout";
import { CorporateLayout } from "@/components/layout/corporate-layout";

// App pages
import Index from "@/pages/Index";
import Assets from "@/pages/Assets";
import Customers from "@/pages/Customers";
import MatchingEngine from "@/pages/MatchingEngine";
import Dashboard from "@/pages/Dashboard";
import Reporting from "@/pages/Reporting";
import Billing from "@/pages/Billing";
import Settings from "@/pages/Settings";
import Analytics from "@/pages/Analytics";
import NotFound from "@/pages/NotFound";

// Auth pages
import SignInPage from "@/pages/auth/SignInPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

// Corporate pages
import CorporateDashboard from "@/pages/corporate/CorporateDashboard";
import CorporatePortfolio from "@/pages/corporate/CorporatePortfolio";
import CorporateTracing from "@/pages/corporate/CorporateTracing";
import CorporateAnalytics from "@/pages/corporate/CorporateAnalytics";
import CorporateCertificates from "@/pages/corporate/CorporateCertificates";
import CorporateConsumption from "@/pages/corporate/CorporateConsumption";
import CorporateOnboarding from "@/pages/corporate/CorporateOnboarding";
import CorporateReporting from "@/pages/corporate/CorporateReporting";
import CorporateSettings from "@/pages/corporate/CorporateSettings";

// Provider components
import { ThemeProvider } from "@/components/theme-provider";
import { WalkthroughProvider } from "@/hooks/use-walkthrough";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <WalkthroughProvider>
        <Router>
          <Routes>
            {/* Auth routes */}
            <Route element={<AuthLayout><Outlet /></AuthLayout>}>
              <Route path="/auth/sign-in" element={<SignInPage />} />
              <Route path="/auth/sign-up" element={<SignUpPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
            </Route>
            
            {/* Corporate routes */}
            <Route element={<CorporateLayout><Outlet /></CorporateLayout>}>
              <Route path="/corporate" element={<CorporateDashboard />} />
              <Route path="/corporate/certificates" element={<CorporateCertificates />} />
              <Route path="/corporate/traceability" element={<CorporateTracing />} />
              <Route path="/corporate/consumption" element={<CorporateConsumption />} />
              <Route path="/corporate/analytics" element={<CorporateAnalytics />} />
              <Route path="/corporate/portfolio" element={<CorporatePortfolio />} />
              <Route path="/corporate/onboarding" element={<CorporateOnboarding />} />
              <Route path="/corporate/reporting" element={<CorporateReporting />} />
              <Route path="/corporate/settings" element={<CorporateSettings />} />
            </Route>
            
            {/* Main app routes */}
            <Route element={<AppLayout><Outlet /></AppLayout>}>
              <Route index element={<Dashboard />} />
              <Route path="/assets" element={<Assets />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/matching" element={<MatchingEngine />} />
              <Route path="/reporting" element={<Reporting />} />
              <Route path="/billing" element={<Billing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
        <Toaster />
      </WalkthroughProvider>
    </ThemeProvider>
  );
}

export default App;
