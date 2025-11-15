'use client'

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: { name: string; href?: string; path?: string }[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="py-4 bg-white/50 border-b border-[#5C4033]/5">
      <div className="container mx-auto px-4">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-[#5C4033]/60 hover:text-[#D4AF37] transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
          </li>
          {items.map((item, index) => {
            const link = item.href || item.path;
            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-[#5C4033]/30" />
                {link && index !== items.length - 1 ? (
                  <Link
                    href={link}
                    className="text-[#5C4033]/60 hover:text-[#D4AF37] transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-[#D4AF37]">{item.name}</span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

