
import { Link, useNavigate } from "react-router-dom";
import { Home, FileText, Activity, MapPin, BarChart3, Sliders, Bell, Moon, Sun, User, LogOut } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
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
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    title: "My Certificates",
    icon: FileText,
    url: "/corporate/certificates",
  },
  {
    title: "Consumption",
    icon: Activity,
    url: "/corporate/consumption",
  },
  {
    title: "Certificate Tracing",
    icon: MapPin,
    url: "/corporate/tracing",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    url: "/corporate/analytics",
  },
  {
    title: "Portfolio Settings",
    icon: Sliders,
    url: "/corporate/portfolio",
  },
];

export function CorporateLayout({ children }: CorporateLayoutProps) {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = () => {
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
    navigate("/auth/sign-in");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <Sidebar>
          <SidebarHeader className="flex items-center justify-center px-6 py-5">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Renuw</span>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/60 px-3 py-2">Corporate Portal</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="px-2">
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        className="transition-all duration-200 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground/90"
                        asChild
                      >
                        <Link to={item.url} className="flex items-center gap-3">
                          <item.icon size={18} className="text-sidebar-foreground/70" />
                          <span className="text-sm text-sidebar-foreground/90">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-4 py-3">
            <div className="text-xs text-sidebar-foreground/50 font-medium">
              Renuw Corporate Portal v1.0
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 flex flex-col bg-background">
          <header className="sticky top-0 z-[51] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center gap-4 px-6">
              <div className="flex-1">
                {/* Header space */}
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  className="rounded-full hover:bg-muted transition-colors border-none"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-full hover:bg-muted transition-colors border-none relative"
                >
                  <Bell size={18} />
                  <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="rounded-full hover:bg-muted transition-colors border-none bg-primary/10"
                    >
                      <User size={16} className="mr-2" />
                      My Account
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User size={16} className="mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <Sliders size={16} className="mr-2" />
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
          <main className="flex-1 p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
