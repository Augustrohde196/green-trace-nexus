
import { Home, BarChart3, Users, FileText, Zap, Receipt, Settings } from "lucide-react";
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
    url: "/",
  },
  {
    title: "Assets",
    icon: BarChart3,
    url: "/assets",
  },
  {
    title: "Customers",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Allocation",
    icon: Zap,
    url: "/matching",
  },
  {
    title: "Reporting",
    icon: FileText,
    url: "/reporting",
  },
  {
    title: "Billing",
    icon: Receipt,
    url: "/billing",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/settings",
  }
];

export function AppSidebar() {
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
                            (item.url !== '/' && location.pathname.startsWith(item.url));
            
            return (
              <SidebarMenuItem key={item.title} className="sidebar-menu-item">
                <SidebarMenuButton 
                  className={`transition-all duration-200 ${isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground/90"}`}
                  asChild
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon size={18} className={`${isActive ? "text-primary" : "text-sidebar-foreground/70"}`} />
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
          Renuw Utility Portal v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
