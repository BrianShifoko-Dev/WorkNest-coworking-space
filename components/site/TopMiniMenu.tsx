'use client'

import { useState, useEffect } from "react";
import {
  Phone,
  Clock,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Globe,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "../providers/LanguageProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function TopMiniMenu() {
  const { language, setLanguage } = useLanguage();
  
  // Opening hours schedule
  const schedule = [
    { day: "Mon-Fri", hours: "8AM - 8PM", color: "text-[#FFFFF0]" },
    { day: "Saturday", hours: "9AM - 5PM", color: "text-[#D4AF37]" },
    { day: "Sunday", hours: "Closed", color: "text-red-300" },
  ];
  
  const [currentScheduleIndex, setCurrentScheduleIndex] = useState(0);
  
  // Rotate through schedule every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScheduleIndex((prev) => (prev + 1) % schedule.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const languages = [
    { code: "en" as const, name: "English", flag: "🇬🇧" },
    { code: "sw" as const, name: "Swahili", flag: "🇰🇪" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "es" as const, name: "Español", flag: "🇪🇸" },
    { code: "de" as const, name: "Deutsch", flag: "🇩🇪" },
    { code: "pt" as const, name: "Português", flag: "🇵🇹" },
  ];

  const currentLang = languages.find((l) => l.code === language);

  return (
    <div className="bg-[#5C4033] text-[#FFFFF0] py-2.5 border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-4">
        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-center">
          <div className="flex items-center gap-6 text-sm">
            <a
              href="tel:+254745319042"
              className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>254 745 319 042</span>
            </a>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className={`transition-all duration-300 ${schedule[currentScheduleIndex].color}`}>
                {schedule[currentScheduleIndex].day}: {schedule[currentScheduleIndex].hours}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Eldoret, Kenya</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/profile.php?id=61583324491287"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://twitter.com/worknest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="X (formerly Twitter)"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/the_worknest_eldoret/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://linkedin.com/company/worknest"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D4AF37] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="border-l border-[#FFFFF0]/20 pl-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 text-xs hover:text-[#D4AF37] transition-colors">
                  <Globe className="w-3.5 h-3.5" />
                  <span>
                    {currentLang?.flag} {currentLang?.code.toUpperCase()}
                  </span>
                  <ChevronDown className="w-3 h-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white border-[#5C4033]/20"
                >
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex items-center gap-2 cursor-pointer ${
                        language === lang.code
                          ? "bg-[#D4AF37]/10 text-[#5C4033]"
                          : "text-[#5C4033]/80"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Layout - Language on Right */}
        <div className="md:hidden flex justify-between items-center gap-2 text-xs">
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            <a
              href="tel:+254745319042"
              className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors whitespace-nowrap"
            >
              <Phone className="w-3 h-3" />
              <span className="text-xs">254 745 319 042</span>
            </a>
            <div className="flex items-center gap-1.5 whitespace-nowrap">
              <Clock className="w-3 h-3 text-[#D4AF37]" />
              <span className={`transition-all duration-300 text-xs ${schedule[currentScheduleIndex].color}`}>
                {schedule[currentScheduleIndex].day}: {schedule[currentScheduleIndex].hours}
              </span>
            </div>
          </div>
          
          {/* Language Selector - Right Side on Mobile */}
          <div className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 text-xs hover:text-[#D4AF37] transition-colors">
                <Globe className="w-3 h-3" />
                <span className="text-xs">
                  {currentLang?.flag} {currentLang?.code.toUpperCase()}
                </span>
                <ChevronDown className="w-2.5 h-2.5" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bg-white border-[#5C4033]/20"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`flex items-center gap-2 cursor-pointer ${
                      language === lang.code
                        ? "bg-[#D4AF37]/10 text-[#5C4033]"
                        : "text-[#5C4033]/80"
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}

