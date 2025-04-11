
import { Link } from "react-router-dom";
import { BarChart3, Home, User, Activity, FileText, Sliders, MapPin } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Bell, Moon, Sun } from "lucide-react";

interface CorporateLayoutProps {
  children: React.ReactNode;
}

export function CorporateLayout({ children }: CorporateLayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* Header */}
      <header className="sticky top-0 z-[51] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center gap-4 px-6">
          <div className="flex-1">
            <Link to="/corporate" className="flex items-center gap-2">
              <span className="font-bold text-xl text-primary">Renuw</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell size={20} />
            </Button>
            <Button variant="outline" size="sm">
              <User size={16} className="mr-2" />
              My Account
            </Button>
          </div>
        </div>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar - now with black background */}
        <aside className="w-64 bg-black text-white">
          <div className="p-4 border-b border-gray-800">
            <Link to="/corporate" className="flex items-center gap-2">
              <span className="font-bold text-xl text-white">Renuw</span>
            </Link>
          </div>
          <nav className="p-4 space-y-2">
            <Link to="/corporate" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link to="/corporate/certificates" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <FileText size={20} />
              <span>My Certificates</span>
            </Link>
            <Link to="/corporate/consumption" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <Activity size={20} />
              <span>Consumption</span>
            </Link>
            <Link to="/corporate/tracing" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <MapPin size={20} />
              <span>Certificate Tracing</span>
            </Link>
            <Link to="/corporate/analytics" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <BarChart3 size={20} />
              <span>Analytics</span>
            </Link>
            <Link to="/corporate/portfolio" className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-800">
              <Sliders size={20} />
              <span>Portfolio Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
