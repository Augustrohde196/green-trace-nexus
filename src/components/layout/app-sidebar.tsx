
import { Home, PieChart, Users, BarChart3, Activity, Receipt } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
    icon: PieChart,
    url: "/assets",
  },
  {
    title: "Corporate Customers",
    icon: Users,
    url: "/customers",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/analytics",
  },
  {
    title: "Matching Engine",
    icon: Activity,
    url: "/matching",
  },
  {
    title: "Billing",
    icon: Receipt,
    url: "/billing",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-techGreen">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="font-bold text-techDark text-2xl">R</div>
            </div>
            <div className="absolute -right-1 -top-1 h-6 w-6 rounded-full bg-[#2C2C2C] flex items-center justify-center">
              <div className="h-3 w-3 rounded-full bg-techGreen"></div>
            </div>
          </div>
          <span className="font-bold text-white text-xl tracking-tight">Renuw</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon size={20} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="px-6 py-4">
        <div className="text-xs text-white/70">
          Renuw Platform v1.0
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
