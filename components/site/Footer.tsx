'use client'

import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <footer className="bg-[#5C4033] text-[#FFFFF0]">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="WorkNest Logo"
                width={40}
                height={40}
                className="w-10 h-10 object-contain bg-transparent transition-transform duration-200 hover:scale-105"
              />
              <div>
                <div className="text-lg text-white font-semibold">The WorkNest</div>
                <div className="text-xs text-[#D4AF37]">Coworking space</div>
              </div>
            </div>

            <p className="text-sm text-[#FFFFF0]/80 mb-4">
              Premium coworking and workspace solutions in the heart of Eldoret,
              Kenya.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-[#D4AF37]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/discover" className="hover:text-[#D4AF37] transition-colors">
                  Discover Us
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-[#D4AF37] transition-colors">
                  Products & Book
                </Link>
              </li>
              <li>
                <Link href="/restaurant" className="hover:text-[#D4AF37] transition-colors">
                  Restaurant
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#D4AF37] transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/magazine/workstyle" className="hover:text-[#D4AF37] transition-colors">
                  Magazine
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-[#D4AF37]">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 text-[#D4AF37]" />
                <a href="tel:+254745319042" className="hover:text-[#D4AF37] transition-colors">
                  +254 745 319042
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 text-[#D4AF37]" />
                <a href="mailto:info@theworknest.co.ke" className="hover:text-[#D4AF37] transition-colors">
                  info@theworknest.co.ke
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#D4AF37]" />
                <span>Eldoret, Kenya</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-[#D4AF37]">Newsletter</h4>
            <p className="text-sm text-[#FFFFF0]/80 mb-4">
              Subscribe to get updates and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FFFFF0]/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#FFFFF0]/80 text-center md:text-left">
            © 2025 WorkNest coworking space Kenya. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link
              href="/terms"
              className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-[#FFFFF0]/40">•</span>
            <Link
              href="/privacy"
              className="hover:text-[#D4AF37] transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://facebook.com/worknest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/worknest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
              aria-label="X (formerly Twitter)"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://instagram.com/worknest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/company/worknest"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

