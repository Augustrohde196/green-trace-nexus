
import { useState, createContext, useContext, useCallback, useEffect } from "react";
import { WalkthroughDialog } from "@/components/walkthrough/walkthrough-dialog";
import { useToast } from "@/components/ui/use-toast";

interface WalkthroughContextType {
  isWalkthroughOpen: boolean;
  startWalkthrough: () => void;
  closeWalkthrough: () => void;
}

const WalkthroughContext = createContext<WalkthroughContextType>({
  isWalkthroughOpen: false,
  startWalkthrough: () => {},
  closeWalkthrough: () => {},
});

// Check if this is the first visit to show walkthrough automatically
const isFirstVisit = () => {
  const visited = localStorage.getItem('walkthrough-visited');
  return !visited;
};

export const WalkthroughProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const { toast } = useToast();

  // Show walkthrough on first visit
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFirstVisit()) {
        setIsWalkthroughOpen(true);
        localStorage.setItem('walkthrough-visited', 'true');
      }
    }, 1500); // Small delay to allow the UI to load
    
    return () => clearTimeout(timer);
  }, []);

  const startWalkthrough = useCallback(() => {
    setIsWalkthroughOpen(true);
  }, []);

  const closeWalkthrough = useCallback(() => {
    setIsWalkthroughOpen(false);
    toast({
      title: "Walkthrough closed",
      description: "You can restart the walkthrough anytime from the notification icon in the header.",
      duration: 3000,
    });
  }, [toast]);

  return (
    <WalkthroughContext.Provider value={{ isWalkthroughOpen, startWalkthrough, closeWalkthrough }}>
      {children}
      <WalkthroughDialog open={isWalkthroughOpen} onClose={closeWalkthrough} />
    </WalkthroughContext.Provider>
  );
};

export const useWalkthrough = () => {
  return useContext(WalkthroughContext);
};
