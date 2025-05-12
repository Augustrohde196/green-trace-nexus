
import { Home, BarChart3, FileText, MapPin, LayoutDashboard, Settings, LineChart, FolderOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/contexts/LanguageContext";

const menuItems = [
  {
    titleKey: "dashboard",
    icon: Home,
    url: "/corporate",
  },
  {
    titleKey: "traceability",
    icon: MapPin,
    url: "/corporate/traceability",
  },
  {
    titleKey: "consumption",
    icon: LineChart,
    url: "/corporate/consumption",
  },
  {
    titleKey: "portfolio",
    icon: FolderOpen,
    url: "/corporate/portfolio",
  },
  {
    titleKey: "reporting",
    icon: FileText,
    url: "/corporate/reporting",
  },
  {
    titleKey: "settings",
    icon: Settings,
    url: "/corporate/settings",
  }
];

export function CorporateSidebar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center px-6 py-5">
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Renuw</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url || 
                           (item.url !== '/corporate' && location.pathname.startsWith(item.url));
            
            return (
              <SidebarMenuItem key={item.titleKey} className="sidebar-menu-item">
                <SidebarMenuButton 
                  className={`transition-all duration-200 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground/90"}`}
                  asChild
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon size={18} className={`${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`} />
                    <span className={`text-sm ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/90"}`}>{t(item.titleKey)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        <div className="text-xs text-sidebar-foreground/50 font-medium">
          Renuw Corporate Portal v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
