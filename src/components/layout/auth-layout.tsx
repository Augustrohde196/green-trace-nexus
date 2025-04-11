
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
      <div className="absolute top-6 left-6 flex items-center justify-between z-20 w-[calc(100%-3rem)]">
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

      {/* Left side - value proposition */}
      <div className="hidden md:flex relative bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 flex-col items-center justify-center p-12 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 mask-gradient-to-b pointer-events-none"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 animate-pulse [animation-duration:7s]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white/5 animate-pulse [animation-duration:10s]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-white/5 animate-pulse [animation-duration:15s]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
          <h1 className="text-5xl font-bold mb-6 text-white">
            Renewable Energy Simplified
          </h1>
          <p className="text-xl mb-12 text-white/90">
            Transparent, efficient, and verifiable clean energy certificates
          </p>
          
          <div className="grid grid-cols-2 gap-5 w-full">
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="font-bold text-2xl mb-3 text-white group-hover:translate-x-1 transition-transform">Traceability</div>
              <div className="text-white/80">Full transparency with blockchain-verified energy certificates</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="font-bold text-2xl mb-3 text-white group-hover:translate-x-1 transition-transform">Customization</div>
              <div className="text-white/80">Tailor your energy portfolio to your specific sustainability goals</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="font-bold text-2xl mb-3 text-white group-hover:translate-x-1 transition-transform">Optimization</div>
              <div className="text-white/80">AI-powered matching to maximize impact while minimizing costs</div>
            </div>
            
            <div className="group bg-white/10 hover:bg-white/15 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 hover:shadow-lg transition-all duration-300">
              <div className="font-bold text-2xl mb-3 text-white group-hover:translate-x-1 transition-transform">Time-Matching</div>
              <div className="text-white/80">Real-time matching between energy consumption and production</div>
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
