
import { useState, createContext, useContext } from "react";
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

export const WalkthroughProvider = ({ children }: { children: React.ReactNode }) => {
  const [isWalkthroughOpen, setIsWalkthroughOpen] = useState(false);
  const { toast } = useToast();

  const startWalkthrough = () => {
    setIsWalkthroughOpen(true);
  };

  const closeWalkthrough = () => {
    setIsWalkthroughOpen(false);
    toast({
      title: "Walkthrough closed",
      description: "You can restart the walkthrough anytime from the help icon.",
      duration: 3000,
    });
  };

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
