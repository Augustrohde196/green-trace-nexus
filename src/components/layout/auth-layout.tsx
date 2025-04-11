
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
          <span className="font-bold text-3xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-primary/80 drop-shadow-sm">
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

      {/* Left side - value proposition */}
      <div className="hidden md:flex relative bg-gradient-to-br from-primary/90 to-primary/50 dark:from-primary/80 dark:to-primary/30 flex-col items-center justify-center p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2072')] bg-cover bg-center opacity-10"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-md">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
            Renewable Energy Simplified
          </h1>
          <p className="text-xl mb-12 text-white/90">
            The future of clean energy certificates is here
          </p>
          
          <div className="grid grid-cols-1 gap-5 w-full max-w-sm">
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl text-left transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg">
              <div className="font-bold text-2xl mb-2 group-hover:translate-x-1 transition-transform">Traceability</div>
              <div className="text-base text-white/80">Track the origin of your energy certificates with transparent blockchain technology</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl text-left transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg">
              <div className="font-bold text-2xl mb-2 group-hover:translate-x-1 transition-transform">Customization</div>
              <div className="text-base text-white/80">Tailor your renewable energy portfolio to match your sustainability goals</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl text-left transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg">
              <div className="font-bold text-2xl mb-2 group-hover:translate-x-1 transition-transform">Optimization</div>
              <div className="text-base text-white/80">Maximize impact and minimize costs with our AI-powered matching engine</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl text-left transition-all duration-300 border border-white/10 hover:border-white/20 hover:shadow-lg">
              <div className="font-bold text-2xl mb-2 group-hover:translate-x-1 transition-transform">Time-Matching</div>
              <div className="text-base text-white/80">Match your energy consumption with renewable production in real-time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form side */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12 bg-gradient-to-br from-background to-background/90">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
