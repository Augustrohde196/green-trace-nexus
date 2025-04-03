
import { Home, Wind, SunMedium, Users, PieChart, BarChart3, Activity } from "lucide-react";
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
    title: "Wind Production",
    icon: Wind,
    url: "/wind",
  },
  {
    title: "Solar Production",
    icon: SunMedium,
    url: "/solar",
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
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center p-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center">
            <span className="text-renuwGreen font-bold text-lg">R</span>
          </div>
          <span className="font-semibold text-white text-xl">Renuw</span>
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
