
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
          <div className="relative h-10 w-10 overflow-hidden rounded-md bg-techGreen flex items-center justify-center">
            {/* Simple sun/energy logo */}
            <div className="absolute">
              <div className="h-4 w-4 rounded-full bg-[#2C2C2C]"></div>
              <div className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-[#2C2C2C]"></div>
              <div className="absolute right-0 top-1/2 h-0.5 w-5 -translate-y-1/2 translate-x-1/2 bg-[#2C2C2C]"></div>
              <div className="absolute bottom-0 left-1/2 h-5 w-0.5 -translate-x-1/2 translate-y-1/2 bg-[#2C2C2C]"></div>
              <div className="absolute left-0 top-1/2 h-0.5 w-5 -translate-x-1/2 -translate-y-1/2 bg-[#2C2C2C]"></div>
              <div className="absolute right-[15%] top-[15%] h-4 w-0.5 rotate-45 bg-[#2C2C2C]"></div>
              <div className="absolute bottom-[15%] right-[15%] h-4 w-0.5 -rotate-45 bg-[#2C2C2C]"></div>
              <div className="absolute bottom-[15%] left-[15%] h-4 w-0.5 rotate-45 bg-[#2C2C2C]"></div>
              <div className="absolute left-[15%] top-[15%] h-4 w-0.5 -rotate-45 bg-[#2C2C2C]"></div>
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
