import { Link, useNavigate, useLocation } from "react-router-dom";
import { Home, FileText, Activity, MapPin, Sliders, Bell, Moon, Sun, User, LogOut, Receipt, Settings } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useWalkthrough } from "@/hooks/use-walkthrough";
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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";
import { useEffect } from "react";

interface CorporateLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    url: "/corporate",
  },
  {
    title: "Consumption",
    icon: Activity,
    url: "/corporate/consumption",
  },
  {
    title: "Traceability",
    icon: MapPin,
    url: "/corporate/tracing",
  },
  {
    title: "Preferences",
    icon: Sliders,
    url: "/corporate/portfolio",
  },
  {
    title: "Reporting",
    icon: FileText,
    url: "/corporate/reporting",
  },
  {
    title: "Billing",
    icon: Receipt,
    url: "/corporate/billing",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/corporate/settings",
  }
];

export function CorporateLayout({ children }: CorporateLayoutProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { startWalkthrough } = useWalkthrough();

  // Force dashboard to be highlighted when the user is at the root corporate path
  const currentPath = location.pathname;
  const isRootPath = currentPath === "/corporate";

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/auth/sign-in");
  };

  const handleNotificationClick = () => {
    startWalkthrough();
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center px-6 py-5">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Renuw</span>
          </SidebarHeader>
          <SidebarContent className="pb-12">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu className="px-2 space-y-1">
                  {menuItems.map((item) => {
                    const isActive = isRootPath 
                      ? item.url === "/corporate" 
                      : location.pathname === item.url || 
                        (item.url !== '/corporate' && location.pathname.startsWith(item.url));
                    
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton 
                          className={`transition-all duration-200 ${
                            isActive 
                              ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium" 
                              : "hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground/90"
                          }`}
                          asChild
                        >
                          <Link to={item.url} className="flex items-center gap-3 py-2 px-3 rounded-md">
                            <item.icon size={18} className={isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/70"} />
                            <span className={`text-sm ${isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground/90"}`}>
                              {item.title}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-4 py-3 absolute bottom-0 w-full">
            <div className="text-xs text-sidebar-foreground/50 font-medium">
              Renuw Corporate Portal v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col bg-background">
          <header className="sticky top-0 z-[51] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <div className="flex-1">
                <h1 className="text-xl font-semibold text-[#2C2C2C] dark:text-white">Corporate Portal</h1>
              </div>
              <div className="flex items-center gap-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    className="rounded-full hover:bg-muted transition-colors border-none"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </Button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  id="notification-bell"
                >
                  <Button 
                    variant="outline" 
                    size="icon"
                    className="rounded-full hover:bg-muted transition-colors border-none relative"
                    onClick={handleNotificationClick}
                  >
                    <Bell size={18} />
                    <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                  </Button>
                </motion.div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full hover:bg-muted transition-colors border-none bg-primary/10"
                    >
                      <User size={16} className="mr-2" />
                      Alex Nielsen
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/corporate/settings')}>
                      <User size={16} className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => navigate('/corporate/settings')}>
                      <Settings size={16} className="mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:text-red-400">
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <motion.main 
            className="flex-1 p-6 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
}
