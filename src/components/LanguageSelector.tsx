import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Languages, Globe } from "lucide-react";

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

export const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isExpanded, setIsExpanded] = useState(false);

  const languages: Language[] = [
    { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
    { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇧🇩" },
    { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  ];

  const currentLanguage = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  const changeLanguage = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    setIsExpanded(false);
    // In a real app, this would trigger translation updates
    console.log(`Language changed to: ${languageCode}`);
  };

  return (
    <div className="relative">
      <Button
        variant="hero"
        onClick={() => setIsExpanded(!isExpanded)}
        className="min-w-[160px] justify-between"
      >
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          <span className="text-base">
            {currentLanguage.flag} {currentLanguage.nativeName}
          </span>
        </div>
        <Languages className="w-4 h-4" />
      </Button>

      {isExpanded && (
        <Card className="absolute top-full mt-2 right-0 z-50 min-w-[200px] glass-effect border-white/20">
          <CardContent className="p-2">
            {languages.map((language) => (
              <Button
                key={language.code}
                variant={selectedLanguage === language.code ? "default" : "ghost"}
                onClick={() => changeLanguage(language.code)}
                className="w-full justify-start mb-1 h-12"
              >
                <span className="text-xl mr-3">{language.flag}</span>
                <div className="text-left">
                  <div className="font-semibold">{language.nativeName}</div>
                  <div className="text-xs opacity-75">{language.name}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};