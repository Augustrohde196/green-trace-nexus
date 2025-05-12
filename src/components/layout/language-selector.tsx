
import React from 'react';
import { Flag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:bg-muted transition-colors border-none cursor-pointer"
                type="button"
              >
                <Flag size={18} />
                <span className="sr-only">{t('language')}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => setLanguage('en')}
                className={`cursor-pointer ${language === 'en' ? 'bg-primary/10' : ''}`}
              >
                🇬🇧 English
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setLanguage('da')}
                className={`cursor-pointer ${language === 'da' ? 'bg-primary/10' : ''}`}
              >
                🇩🇰 Dansk
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent>
          <p>{t('language')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
