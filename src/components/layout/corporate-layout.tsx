
import { useEffect } from 'react';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { CorporateSidebar } from "@/components/layout/corporate-sidebar";

export function CorporateLayout({ children }: { children: React.ReactNode }) {
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <CorporateSidebar />
        <SidebarInset className="p-4 md:p-6">
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
