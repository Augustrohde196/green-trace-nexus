
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
import MatchingEngine from "./pages/MatchingEngine";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import CorporateDashboard from "./pages/corporate/CorporateDashboard";
import CorporateCertificates from "./pages/corporate/CorporateCertificates";
import CorporateConsumption from "./pages/corporate/CorporateConsumption";
import CorporateAnalytics from "./pages/corporate/CorporateAnalytics";
import CorporateBilling from "./pages/corporate/CorporateBilling";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
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
            <Route path="/matching" element={<AppLayout><MatchingEngine /></AppLayout>} />
            <Route path="/billing" element={<AppLayout><Billing /></AppLayout>} />
            
            {/* Corporate Portal Routes */}
            <Route path="/corporate" element={<CorporateLayout><CorporateDashboard /></CorporateLayout>} />
            <Route path="/corporate/certificates" element={<CorporateLayout><CorporateCertificates /></CorporateLayout>} />
            <Route path="/corporate/consumption" element={<CorporateLayout><CorporateConsumption /></CorporateLayout>} />
            <Route path="/corporate/analytics" element={<CorporateLayout><CorporateAnalytics /></CorporateLayout>} />
            <Route path="/corporate/billing" element={<CorporateLayout><CorporateBilling /></CorporateLayout>} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
