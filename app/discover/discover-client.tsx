'use client'

import Link from "next/link";
import { Target, Users, Zap, Heart, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function DiscoverClient() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Zap,
      title: "Flexibility",
      description: "Daily, monthly, or yearly plans that adapt to your changing needs",
    },
    {
      icon: Award,
      title: "Premium Design",
      description: "Thoughtfully designed spaces that inspire creativity and productivity",
    },
    {
      icon: Users,
      title: "Community",
      description: "Network with like-minded professionals and entrepreneurs in Eldoret",
    },
    {
      icon: Shield,
      title: "Convenient Access Hours",
      description: "Work on your schedule with flexible access",
    },
  ];

  const galleryImages = [
    "/gallery/DJI_20000609074712_0098_D.jpg",
    "/gallery/DJI_20000609071222_0066_D.jpg",
    "/gallery/DJI_20000609064317_0024_D.jpg",
    "/gallery/DJI_20000609070717_0059_D.jpg",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="/gallery/Eldoret.jpg"
          alt="Eldoret City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl mb-4 font-playfair">{t("discover.title")}</h1>
            <p className="text-xl">{t("discover.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">{t("discover.whoWeAre")}</h2>
              <p className="text-[#5C4033]/70 mb-4 text-lg">
                {t("discover.whoWeAreDesc1")}
              </p>
              <p className="text-[#5C4033]/70 mb-4 text-lg">
                {t("discover.whoWeAreDesc2")}
              </p>
              <p className="text-[#5C4033]/70 text-lg">
                {t("discover.whoWeAreDesc3")}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-lg shadow-lg">
                  <img src={img} alt={`Workspace ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">{t("discover.whyChoose")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md border border-[#5C4033]/10 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h4 className="text-[#5C4033] mb-2 text-xl font-semibold">{feature.title}</h4>
                <p className="text-sm text-[#5C4033]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">{t("discover.whatWeOffer")}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: t("discover.hotDeskDedicated"), desc: t("discover.hotDeskDedicatedDesc") },
                { title: t("discover.privateOffices"), desc: t("discover.privateOfficesDesc") },
                { title: t("discover.meetingRooms"), desc: t("discover.meetingRoomsDesc") },
                { title: t("discover.eventSpace"), desc: t("discover.eventSpaceDesc") },
                { title: t("discover.restaurantCafe"), desc: t("discover.restaurantCafeDesc") },
                { title: t("discover.kidsZone"), desc: t("discover.kidsZoneDesc") },
                { title: t("discover.highSpeedWifi"), desc: t("discover.highSpeedWifiDesc") },
                { title: t("discover.convenientAccess"), desc: t("discover.convenientAccessDesc") },
                { title: t("discover.freeParking"), desc: t("discover.freeParkingDesc") },
              ].map((offer, index) => (
                <div key={index} className="p-6 bg-[#FFFFF0] rounded-lg border border-[#5C4033]/10">
                  <h4 className="text-[#5C4033] mb-2 font-semibold">{offer.title}</h4>
                  <p className="text-sm text-[#5C4033]/70">{offer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white mb-4 text-3xl font-playfair">{t("discover.readyToExperience")}</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            {t("discover.readyDescription")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-tour">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
                {t("discover.bookTour")}
              </Button>
            </Link>
            <Link href="/pricing">
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-8 py-6 text-lg"
              >
                {t("discover.viewPricing")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

