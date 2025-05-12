
import { useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CorporateSidebar } from "@/components/layout/corporate-sidebar";
import { CorporateHeader } from "@/components/layout/corporate-header";

export function CorporateLayout({ children }: { children: React.ReactNode }) {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <CorporateSidebar />
        <div className="flex flex-1 flex-col bg-background">
          <CorporateHeader />
          <SidebarInset className="p-4 md:p-6">
            {children}
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}
