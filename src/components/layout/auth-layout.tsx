
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
      <div className="absolute top-6 left-6 z-20 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-3xl tracking-tight text-white drop-shadow-md">
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

      {/* Left side - value proposition with dynamic background */}
      <div className="hidden md:flex relative overflow-hidden">
        {/* Animated background with brand elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70">
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white/20 mix-blend-overlay animate-pulse" style={{ animationDuration: '15s' }}></div>
            <div className="absolute top-3/4 left-2/3 w-96 h-96 rounded-full bg-white/10 mix-blend-overlay animate-pulse" style={{ animationDuration: '20s' }}></div>
            <div className="absolute top-1/2 left-1/6 w-48 h-48 rounded-full bg-white/15 mix-blend-overlay animate-pulse" style={{ animationDuration: '12s' }}></div>
            
            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-grid-white/10 pointer-events-none"></div>
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-white w-full">
          <div className="max-w-xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-8 text-white">
              Granular Guarantees of Origin
            </h1>
            <p className="text-xl mb-12 text-white/90">
              Transparent, verifiable, and time-matched clean energy certificates
            </p>
            
            {/* Reorganized to 2x2 grid */}
            <div className="grid grid-cols-2 gap-6 w-full max-w-lg mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                <div className="font-bold text-2xl mb-3 text-white">Traceability</div>
                <div className="text-white/90">Track your clean energy from source to consumption with blockchain-verified certificates</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                <div className="font-bold text-2xl mb-3 text-white">Time-Matching</div>
                <div className="text-white/90">Match your energy consumption to renewable production in real-time, hour by hour</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                <div className="font-bold text-2xl mb-3 text-white">Granularity</div>
                <div className="text-white/90">Access detailed data on when and where your renewable energy was produced</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:shadow-lg transition-all duration-300">
                <div className="font-bold text-2xl mb-3 text-white">Optimization</div>
                <div className="text-white/90">AI-powered matching to maximize impact and minimize costs for your organization</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - form side */}
      <div className="flex flex-col items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
