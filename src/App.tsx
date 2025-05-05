
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import { CorporateLayout } from "./components/layout/corporate-layout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Customers from "./pages/Customers";
import Billing from "./pages/Billing";
import GOAllocation from "./pages/MatchingEngine";
import Reporting from "./pages/Reporting";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import CorporateDashboard from "./pages/corporate/CorporateDashboard";
import CorporateCertificates from "./pages/corporate/CorporateCertificates";
import CorporateConsumption from "./pages/corporate/CorporateConsumption";
import CorporateAnalytics from "./pages/corporate/CorporateAnalytics";
import CorporatePortfolio from "./pages/corporate/CorporatePortfolio";
import CorporateTracing from "./pages/corporate/CorporateTracing";
import CorporateOnboarding from "./pages/corporate/CorporateOnboarding";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import { ThemeProvider } from "@/components/theme-provider";
import { WalkthroughProvider } from "@/hooks/use-walkthrough";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <WalkthroughProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/auth/sign-in" element={<SignInPage />} />
              <Route path="/auth/sign-up" element={<SignUpPage />} />
              <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
              
              {/* Admin Portal Routes */}
              <Route
                path="/"
                element={
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                }
              />
              <Route path="/assets" element={<AppLayout><Assets /></AppLayout>} />
              <Route path="/customers" element={<AppLayout><Customers /></AppLayout>} />
              <Route path="/analytics" element={<AppLayout><Analytics /></AppLayout>} />
              <Route path="/matching" element={<AppLayout><GOAllocation /></AppLayout>} />
              <Route path="/reporting" element={<AppLayout><Reporting /></AppLayout>} />
              <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
              <Route path="/billing" element={<AppLayout><Billing /></AppLayout>} />
              
              {/* Corporate Portal Routes */}
              <Route path="/corporate" element={<CorporateLayout><CorporateDashboard /></CorporateLayout>} />
              <Route path="/corporate/certificates" element={<CorporateLayout><CorporateCertificates /></CorporateLayout>} />
              <Route path="/corporate/consumption" element={<CorporateLayout><CorporateConsumption /></CorporateLayout>} />
              <Route path="/corporate/analytics" element={<CorporateLayout><CorporateAnalytics /></CorporateLayout>} />
              <Route path="/corporate/portfolio" element={<CorporateLayout><CorporatePortfolio /></CorporateLayout>} />
              <Route path="/corporate/tracing" element={<CorporateLayout><CorporateTracing /></CorporateLayout>} />
              
              {/* Corporate Onboarding */}
              <Route path="/corporate/onboarding" element={<CorporateOnboarding />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </WalkthroughProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
