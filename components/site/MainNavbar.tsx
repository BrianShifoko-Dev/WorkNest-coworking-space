'use client'

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface DropdownItem {
  name: string;
  href: string;
}

interface NavItem {
  name: string;
  href?: string;
  dropdown?: DropdownItem[];
}

export function MainNavbar() {
  const { t } = useLanguage();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    {
      name: t('nav.discover'),
      dropdown: [
        { name: "About Our Spaces", href: "/about" },
        { name: "Why Choose Us", href: "/discover" },
        { name: "Gallery", href: "/gallery" },
        { name: "Our Mission & Vision", href: "/mission" },
      ],
    },
    {
      name: t('nav.products'),
      dropdown: [
        { name: "Office Spaces", href: "/office-spaces" },
        { name: "Boardrooms", href: "/boardrooms" },
        { name: "Event Spaces", href: "/event-spaces" },
        { name: "Kids Zone", href: "/kids-zone" },
        { name: "Call Pods", href: "/call-pods" },
      ],
    },
    {
      name: t('nav.restaurant'),
      dropdown: [
        { name: "Eat & Drink", href: "/restaurant" },
        { name: "Reserve a Table", href: "/reserve-table" },
      ],
    },
    {
      name: t('nav.events'),
      dropdown: [
        { name: "Upcoming Events", href: "/events" },
        { name: "Host Your Event", href: "/host-event" },
        { name: "Past Highlights", href: "/events#past" },
      ],
    },
    {
      name: t('nav.magazine'),
      dropdown: [
        { name: "All Articles", href: "/magazine" },
        { name: "Workstyle Tips", href: "/magazine?category=Workstyle Tips" },
        { name: "Design Inspirations", href: "/magazine?category=Design Inspirations" },
        { name: "Success Stories", href: "/magazine?category=Success Stories" },
      ],
    },
    {
      name: t('nav.getstarted'),
      dropdown: [
        { name: t('common.bookNow'), href: "/book" },
        { name: "Join Our Community", href: "/join" },
        { name: "Host an Event", href: "/host-event" },
      ],
    },
    { name: t('common.contactUs'), href: "/contact" },
  ];

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavClick = () => {
    setOpenDropdown(null);
    setMobileOpenDropdown(null);
    setIsOpen(false);
  };

  const handleMouseEnter = (itemName: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
      setOpenDropdown(itemName);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleDropdownMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
  };

  const toggleMobileDropdown = (itemName: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === itemName ? null : itemName);
  };

  return (
    <nav
      ref={navRef}
      className="bg-white/95 backdrop-blur-sm shadow-refined sticky top-0 z-50 border-b border-[#5C4033]/10"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group" title="">
            <div className="flex items-center gap-2">
              <div className="flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt=""
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain transition-transform duration-200 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="pointer-events-none">
                <div className="text-2xl text-[#5C4033] font-bold whitespace-nowrap">
                  The Work<span className="text-[#D4AF37]">Nest</span>
                </div>
                <div className="text-[10px] text-[#8B7355] tracking-[0.15em] uppercase -mt-1">
                  Eldoret Coworking Space
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.name, !!item.dropdown)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors rounded-md ${
                      pathname === item.href
                        ? "text-[#D4AF37] bg-[#D4AF37]/5"
                        : "text-[#5C4033] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                    }`}
                    onClick={handleNavClick}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    className="px-4 py-2 text-sm font-medium text-[#5C4033] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-md flex items-center gap-1 transition-colors"
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4" />}
                  </button>
                )}

                {/* Desktop Dropdown */}
                {item.dropdown && openDropdown === item.name && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-refined-lg border border-[#5C4033]/10 py-2 animate-in fade-in slide-in-from-top duration-200"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {item.dropdown.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.href}
                        href={dropdownItem.href}
                        className={`block px-4 py-2.5 text-sm transition-colors ${
                          pathname === dropdownItem.href
                            ? "text-[#D4AF37] bg-[#D4AF37]/5 font-medium"
                            : "text-[#5C4033] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                        }`}
                        onClick={handleNavClick}
                      >
                        {dropdownItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/book"
            className="hidden xl:flex items-center px-6 py-2.5 bg-[#D4AF37] text-[#5C4033] font-medium rounded-md hover:bg-[#C19B2F] transition-colors shadow-sm"
          >
            Book a Tour
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden p-2 text-[#5C4033] hover:text-[#D4AF37] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="xl:hidden py-4 border-t border-[#5C4033]/10 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={`block px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        pathname === item.href
                          ? "text-[#D4AF37] bg-[#D4AF37]/5"
                          : "text-[#5C4033] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                      }`}
                      onClick={handleNavClick}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <>
                      <button
                        onClick={() => toggleMobileDropdown(item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-[#5C4033] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-md transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform ${
                            mobileOpenDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Mobile Dropdown */}
                      {item.dropdown && mobileOpenDropdown === item.name && (
                        <div className="ml-4 mt-1 space-y-1">
                          {item.dropdown.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.href}
                              href={dropdownItem.href}
                              className={`block px-4 py-2.5 text-sm rounded-md transition-colors ${
                                pathname === dropdownItem.href
                                  ? "text-[#D4AF37] bg-[#D4AF37]/5 font-medium"
                                  : "text-[#5C4033]/80 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5"
                              }`}
                              onClick={handleNavClick}
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
              <Link
                href="/book"
                className="mt-4 block text-center px-6 py-3 bg-[#D4AF37] text-[#5C4033] font-medium rounded-md hover:bg-[#C19B2F] transition-colors"
                onClick={handleNavClick}
              >
                Book a Tour
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

