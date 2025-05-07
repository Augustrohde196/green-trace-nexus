
import { Home, BarChart3, FileText, MapPin, Power, Settings } from "lucide-react";
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
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/corporate",
  },
  {
    title: "Traceability",
    icon: MapPin,
    url: "/corporate/traceability",
  },
  {
    title: "Consumption",
    icon: Power,
    url: "/corporate/consumption",
  },
  {
    title: "Certificates",
    icon: BarChart3,
    url: "/corporate/certificates",
  },
  {
    title: "Reporting",
    icon: FileText,
    url: "/corporate/reporting",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/corporate/settings",
  }
];

export function CorporateSidebar() {
  const location = useLocation();

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
              <SidebarMenuItem key={item.title} className="sidebar-menu-item">
                <SidebarMenuButton 
                  className={`transition-all duration-200 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground/90"}`}
                  asChild
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon size={18} className={`${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70"}`} />
                    <span className={`text-sm ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/90"}`}>{item.title}</span>
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
