
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

const languages = [
  { code: "tr", name: "Türkçe" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
  { code: "ru", name: "Русский" },
  { code: "zh", name: "中文" }
];

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    
    // Show feedback toast when language changes
    const selectedLang = languages.find(l => l.code === lang);
    toast({
      title: "Language Changed",
      description: `Language set to ${selectedLang?.name}`,
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 px-3"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline-block">
            {languages.find(lang => lang.code === language)?.name || "Language"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem 
            key={lang.code}
            className={language === lang.code ? "bg-accent font-semibold" : ""}
            onClick={() => handleLanguageChange(lang.code as Language)}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
