
import { Bell, User, Settings, Moon, Sun, LogOut, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { motion } from "framer-motion";
import { useWalkthrough } from "@/hooks/use-walkthrough";

export function AppHeader() {
  const { theme, setTheme } = useTheme();
  const { startWalkthrough } = useWalkthrough();

  return (
    <motion.header 
      className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex h-16 items-center gap-4 px-6">
        <SidebarTrigger />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-[#2C2C2C] dark:text-white">Utility Portal</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => startWalkthrough()}
            title="Start walkthrough guide"
            className="rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors border-blue-100 dark:border-blue-800"
          >
            <HelpCircle size={18} className="text-blue-500" />
          </Button>
          
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
                size="icon" 
                className="rounded-full bg-primary/10 hover:bg-primary/20 transition-colors border-none"
              >
                <User size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-60">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>Anders Jensen</span>
                  <span className="text-xs text-muted-foreground">anders.jensen@energidanmark.dk</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User size={16} className="mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings size={16} className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 dark:text-red-400 focus:text-red-600 focus:bg-red-50 dark:focus:text-red-400">
                <LogOut size={16} className="mr-2" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  );
}
