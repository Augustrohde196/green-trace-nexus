
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SunMedium, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-background dark:bg-background">
      {/* Logo and theme toggle */}
      <div className="absolute top-6 left-6 flex items-center justify-between z-10 w-[calc(100%-3rem)]">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-techPurple to-wind">
            Renuw
          </span>
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="mr-6"
        >
          {theme === "dark" ? <SunMedium size={20} /> : <Moon size={20} />}
        </Button>
      </div>

      {/* Left side - branding/illustration side */}
      <div className="hidden md:flex relative bg-gradient-to-br from-techPurple/90 to-techPurple/50 dark:from-techPurple/80 dark:to-techDark flex-col items-center justify-center p-12 text-white">
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <h1 className="text-4xl font-bold mb-6">Renewable Energy Certificates</h1>
          <p className="text-lg mb-8">
            Connecting renewable energy producers with corporate consumers for a sustainable future
          </p>
          <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="font-bold text-2xl mb-1">300+</div>
              <div className="text-sm">Renewable Assets</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="font-bold text-2xl mb-1">250+</div>
              <div className="text-sm">Corporate Clients</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="font-bold text-2xl mb-1">1.5 GW</div>
              <div className="text-sm">Energy Managed</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <div className="font-bold text-2xl mb-1">12+</div>
              <div className="text-sm">Countries</div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072')] bg-cover bg-center opacity-10"></div>
      </div>

      {/* Right side - form side */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        {children}
      </div>
    </div>
  );
}
