
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { languages } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full hover:bg-muted transition-colors border-none"
          type="button"
        >
          <languages size={18} />
          <span className="sr-only">{t("language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className={language === "en" ? "bg-muted cursor-pointer" : "cursor-pointer"}
          onClick={() => setLanguage("en")}
        >
          <span className="mr-2">🇬🇧</span> {t("english")}
        </DropdownMenuItem>
        <DropdownMenuItem 
          className={language === "da" ? "bg-muted cursor-pointer" : "cursor-pointer"}
          onClick={() => setLanguage("da")}
        >
          <span className="mr-2">🇩🇰</span> {t("danish")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
