'use client'

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { TopMiniMenu } from "@/components/site/TopMiniMenu";
import { MainNavbar } from "@/components/site/MainNavbar";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFloat } from "@/components/site/WhatsAppFloat";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FFFFF0]">
        <TopMiniMenu />
        <MainNavbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </LanguageProvider>
  );
}

