'use client'

import Link from "next/link";
import { Briefcase, Calendar as CalendarIcon, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function GetStartedClient() {
  const { t } = useLanguage();
  
  const steps = [
    {
      number: "01",
      title: t("getStarted.chooseSpace"),
      description: t("getStarted.chooseSpaceDesc")
    },
    {
      number: "02",
      title: t("getStarted.scheduleTour"),
      description: t("getStarted.scheduleTourDesc")
    },
    {
      number: "03",
      title: t("getStarted.selectPlan"),
      description: t("getStarted.selectPlanDesc")
    },
    {
      number: "04",
      title: t("getStarted.moveIn"),
      description: t("getStarted.moveInDesc")
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C4033]/90 to-[#4A3329]/90 z-10" />
        <img
          src="/gallery/DJI_20000609070609_0057_D.jpg"
          alt="Get Started with WorkNest"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl mb-4 font-playfair">{t("getStarted.title")}</h1>
            <p className="text-xl max-w-2xl mx-auto">
              {t("getStarted.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">{t("getStarted.welcome")}</h2>
            <p className="text-[#5C4033]/70 mb-4 text-lg">
              {t("getStarted.welcomeDesc1")}
            </p>
            <p className="text-[#5C4033]/70 text-lg">
              {t("getStarted.welcomeDesc2")}
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Cards */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Book a Space */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-[#5C4033]/10 text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-[#5C4033] mb-4 text-2xl font-playfair">{t("getStarted.bookSpace")}</h3>
              <p className="text-sm text-[#5C4033]/70 mb-6">
                {t("getStarted.bookSpaceDesc")}
              </p>
              <Link href="/office-spaces">
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                  {t("getStarted.browseSpaces")}
                </Button>
              </Link>
            </div>

            {/* Host an Event */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-[#5C4033]/10 text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarIcon className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-[#5C4033] mb-4 text-2xl font-playfair">Host an Event</h3>
              <p className="text-sm text-[#5C4033]/70 mb-6">
                Our event spaces in Eldoret are perfect for conferences, workshops, product launches, and corporate 
                gatherings of all sizes.
              </p>
              <Link href="/events">
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                  {t("getStarted.viewEvents")}
                </Button>
              </Link>
            </div>

            {/* View Pricing */}
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-[#5C4033]/10 text-center">
              <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-[#5C4033] mb-4 text-2xl font-playfair">{t("discover.viewPricing")}</h3>
              <p className="text-sm text-[#5C4033]/70 mb-6">
                {t("getStarted.viewPricingDesc")}
              </p>
              <Link href="/pricing">
                <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                  {t("discover.viewPricing")}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-16 text-4xl font-playfair">How It Works</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#D4AF37]">{step.number}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xl text-[#5C4033] mb-2 font-semibold">{step.title}</h4>
                    <p className="text-[#5C4033]/70">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Why Choose WorkNest?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                "Prime location in Eldoret city center",
                "High-speed WiFi and modern technology",
                "Convenient Access Hours",
                "Professional meeting rooms",
                "Vibrant community of entrepreneurs",
                "On-site restaurant and café",
                "Kids zone for working parents",
                "Secure parking available"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg border border-[#5C4033]/10">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                  <span className="text-[#5C4033]">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white mb-4 text-3xl font-playfair">Ready to Get Started?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Schedule a tour and see firsthand why WorkNest is Eldoret's #1 choice for professionals
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-tour">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
                Book a Tour
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-8 py-6 text-lg"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

