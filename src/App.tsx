
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/app-layout";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Customers from "./pages/Customers";
import NotFound from "./pages/NotFound";
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
            <Route path="/analytics" element={<AppLayout><div className="p-4"><h1 className="text-2xl font-bold">Analytics</h1><p className="text-muted-foreground">This page is under construction.</p></div></AppLayout>} />
            <Route path="/matching" element={<AppLayout><div className="p-4"><h1 className="text-2xl font-bold">Matching Engine</h1><p className="text-muted-foreground">This page is under construction.</p></div></AppLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
