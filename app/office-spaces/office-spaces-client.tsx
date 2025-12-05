'use client'

import Link from "next/link";
import Image from "next/image";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { WorkspaceCarousel } from "@/components/site/WorkspaceCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/site/BookingForm";
import { Users, Monitor, Wifi, Coffee, Clock, Zap, Shield, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function OfficeSpacesClient() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  // Helper function to get workspaces with translated prices
  const getWorkspaces = () => [
    {
      name: "Hot Desk",
      capacity: "",
      hourlyRate: formatPrice(180, t("price.hour")),
      halfDayRate: formatPrice(450, t("price.halfDay")),
      fullDayRate: formatPrice(650, t("price.day")),
      weeklyRate: formatPrice(2500, t("price.weekly")),
      monthlyRate: formatPrice(8700, t("price.month")),
      images: [
        { url: "/gallery/DJI_20000609074127_0080_D.jpg", title: "Hot Desk", description: "Flexible workspace in vibrant coworking environment" },
        { url: "/gallery/DJI_20000609074140_0081_D.jpg", title: "Hot Desk", description: "Modern desk setup with ergonomic chair" },
        { url: "/gallery/IMG_0996.jpg", title: "Hot Desk", description: "Collaborative open workspace atmosphere" },
        { url: "/gallery/IMG_0994.jpg", title: "Hot Desk", description: "Professional coworking space setup" },
      ],
      description: "Flexible workspace solution perfect for freelancers, remote workers, and entrepreneurs. Choose any available desk in our vibrant coworking space with access to all shared amenities.",
      features: [
        "Access to shared workspace",
        "High-speed WiFi",
        "A bottle of water",
        "Kitchen access",
        "Community events",
        "Mail handling",
      ],
    },
    {
      name: "Dedicated Desk",
      capacity: t("spaces.comingSoon"),
      hourlyRate: formatPrice(250, t("price.hour")),
      halfDayRate: formatPrice(600, t("price.halfDay")),
      fullDayRate: formatPrice(1000, t("price.day")),
      weeklyRate: formatPrice(5000, t("price.weekly")),
      monthlyRate: formatPrice(14000, t("price.month")),
      images: [
        { url: "/gallery/WhatsApp Image 2025-11-30 at 07.27.32_cf6d4362.jpg", title: "Dedicated Desk", description: "Your own permanent desk in shared environment" },
        { url: "/gallery/WhatsApp Image 2025-11-30 at 07.27.31_3b5e80b8.jpg", title: "Dedicated Desk", description: "Personal workspace with storage locker" },
        { url: "/gallery/WhatsApp Image 2025-11-30 at 07.27.31_80463d8e.jpg", title: "Dedicated Desk", description: "Professional setup with dual monitors available" },
        { url: "/gallery/WhatsApp Image 2025-11-30 at 07.27.32_6894ba13.jpg", title: "Dedicated Desk", description: "Reserved space that's always ready for you" },
      ],
      description: "Your own permanent desk in a shared workspace environment. Perfect for professionals who want consistency and their own space while enjoying the coworking community vibe.",
      features: [
        "Reserved desk space",
        "Personal storage locker",
        "Meeting room credits (2hrs/month)",
        "Priority booking",
        "Convenient Access Hours",
        "All Hot Desk features",
      ],
    },
    {
      name: "1-Person Private Office",
      capacity: `1 ${t("boardrooms.people")}`,
      hourlyRate: formatPrice(350, t("price.hour")),
      halfDayRate: formatPrice(1000, t("price.halfDay")),
      fullDayRate: formatPrice(2500, t("price.day")),
      weeklyRate: formatPrice(6000, t("price.weekly")),
      monthlyRate: formatPrice(16000, t("price.month")),
      images: [
        { url: "/gallery/DJI_20000609063628_0017_D.jpg", title: "1-Person Private Office", description: "Compact private office with modern desk and ergonomic chair" },
        { url: "/gallery/DJI_20000609063058_0006_D.jpg", title: "1-Person Private Office", description: "Lockable door ensuring complete privacy for focused work" },
        { url: "/gallery/DJI_20000609074357_0094_D.jpg", title: "1-Person Private Office", description: "Adjustable desk with premium workspace setup" },
        { url: "/gallery/DJI_20000609064158_0022_D.jpg", title: "1-Person Private Office", description: "Elegant interior with professional lighting and storage" },
      ],
      description: "Compact private office designed for solopreneurs and professionals who need complete privacy. Features lockable door, ergonomic furniture, and all essential amenities for focused productivity.",
      features: [
        "Private lockable office",
        "Desk & ergonomic chair",
        "Natural lighting",
        "Storage space",
        "Professional setup",
        "All Dedicated Desk features",
      ],
    },
    {
      name: "2-Person Private Office",
      capacity: `2 ${t("boardrooms.people")}`,
      hourlyRate: formatPrice(550, t("price.hour")),
      halfDayRate: formatPrice(1500, t("price.halfDay")),
      fullDayRate: formatPrice(3000, t("price.day")),
      weeklyRate: formatPrice(8000, t("price.weekly")),
      monthlyRate: formatPrice(24000, t("price.month")),
      images: [
        { url: "/gallery/DJI_20000609074709_0097_D.jpg", title: "2-Person Private Office", description: "Spacious office with workstations for 2 people" },
        { url: "/gallery/DJI_20000609074712_0098_D.jpg", title: "2-Person Private Office", description: "Modern workspace layout with collaborative setup" },
        { url: "/gallery/DJI_20000609064007_0020_D.jpg", title: "2-Person Private Office", description: "Professional design with premium finishes" },
        { url: "/gallery/DJI_20000609064227_0023_D.jpg", title: "2-Person Private Office", description: "Dual workstations with ergonomic furniture" },
      ],
      description: "Spacious private office perfect for small teams, business partners, or growing startups. Features dual workstations, lockable door, and room for collaboration while maintaining privacy.",
      features: [
        "Private lockable office",
        "2 workstations included",
        "Meeting space for 4",
        "Whiteboard & storage",
        "Premium furniture",
        "All 1-Person Office features",
      ],
    },
  ];
  
  const workspaces = getWorkspaces();

  const amenities = [
    { icon: Wifi, title: "High-Speed WiFi", description: "Reliable 100Mbps+ internet" },
    { icon: Coffee, title: "Coffee & Tea", description: "On first booking" },
    { icon: Shield, title: "24/7 Security", description: "Secure access control" },
    { icon: Clock, title: "Flexible Access", description: "Round-the-clock availability" },
    { icon: Users, title: "Meeting Rooms", description: "Included credits monthly" },
    { icon: Zap, title: "Power Backup", description: "Uninterrupted operations" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Workspace Solutions" }, { name: "Office Spaces" }]}
      />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <Image
          src="/gallery/DJI_20000609064317_0024_D.jpg"
          alt="Office Spaces in Eldoret"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="bg-[#D4AF37] text-[#5C4033] mb-4 px-4 py-1">
              Flexible Workspaces
            </Badge>
            <h1 className="text-5xl mb-4 font-playfair">{t("officeSpaces.title")}</h1>
            <p className="text-xl max-w-3xl mx-auto">
              {t("officeSpaces.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">Work Your Way</h2>
            <p className="text-xl text-[#5C4033]/70 mb-8">
              Choose from flexible hot desks, dedicated workstations, or private offices. All options include 
              high-speed WiFi, and access to our premium amenities in the heart of Eldoret.
            </p>
          </div>
        </div>
      </section>

      {/* Workspace Options */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Choose Your Workspace</h2>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {workspaces.map((workspace, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#5C4033]/10 group"
              >
                {/* Image Gallery */}
                <div className="relative h-64 overflow-hidden">
                  {workspace.capacity && (
                    <Badge className={`absolute top-4 right-4 z-10 ${
                      workspace.capacity === 'Coming Soon' 
                        ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white animate-pulse' 
                        : 'bg-[#D4AF37] text-[#5C4033]'
                    }`}>
                      {workspace.capacity !== 'Coming Soon' && <Users className="w-3 h-3 mr-1" />}
                      {workspace.capacity}
                    </Badge>
                  )}
                  <WorkspaceCarousel images={workspace.images} />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-[#5C4033] mb-2 font-playfair">{workspace.name}</h3>

                  {/* Pricing */}
                  <div className="bg-[#FFFFF0] rounded-lg p-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">{t("price.hourlyRate")}</span>
                        <span className="font-semibold text-[#D4AF37]">{workspace.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">{t("price.halfDayLabel")}</span>
                        <span className="font-semibold text-[#D4AF37]">{workspace.halfDayRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">{t("price.fullDayLabel")}</span>
                        <span className="font-semibold text-[#D4AF37]">{workspace.fullDayRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">{t("price.weeklyLabel")}</span>
                        <span className="font-semibold text-[#D4AF37]">{workspace.weeklyRate}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-[#D4AF37]/20">
                        <span className="font-semibold text-[#5C4033]">{t("price.monthlyLabel")}</span>
                        <span className="text-lg font-bold text-[#D4AF37]">{workspace.monthlyRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#5C4033]/70 mb-6 leading-relaxed">
                    {workspace.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {workspace.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-[#5C4033]/80">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={`/book?space=${encodeURIComponent(workspace.name.toLowerCase().replace(/\s+/g, '-'))}`}>
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] font-semibold">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-4 text-4xl font-playfair">Included Amenities</h2>
            <p className="text-center text-[#5C4033]/70 mb-12 text-lg">
              Every workspace comes with premium amenities
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-[#5C4033] mb-2 font-semibold">{amenity.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-4 text-4xl font-playfair">Book Your Workspace</h2>
            <p className="text-center text-[#5C4033]/70 mb-12 text-lg">
              Reserve your ideal workspace today
            </p>
            <div className="bg-white rounded-xl shadow-lg p-8">
              <BookingForm variant="full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
