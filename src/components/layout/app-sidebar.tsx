
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
      <SidebarHeader className="flex items-center justify-center p-6">
        <img 
          src="/lovable-uploads/419093cd-a308-42b6-b46a-779e847ce4f1.png" 
          alt="Renuw" 
          className="h-10" 
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.url || 
                            (item.url !== '/' && location.pathname.startsWith(item.url));
            
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  className={isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}
                  asChild
                >
                  <Link to={item.url}>
                    <item.icon size={20} />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
