
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col bg-background">
          <AppHeader />
          <main className="flex-1 p-6 relative z-0 bg-background" id="app-main-content">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
