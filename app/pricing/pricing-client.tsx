'use client'

import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function PricingClient() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  
  const getPlans = () => [
    {
      name: "Hot Desk",
      description: "Flexible workspace solution for individuals",
      hourly: formatPrice(180, t("price.hour")),
      halfDay: formatPrice(450, t("price.halfDay")),
      daily: formatPrice(650, t("price.day")),
      weekly: formatPrice(2500, t("price.weekly")),
      monthly: formatPrice(8700, t("price.month")),
      popular: false,
      features: [
        "Access to shared workspace",
        "High-speed WiFi",
        "Free call pod Access (1hr/ session)",
        "Lounge access",
        "Community events",
        "Free Ample onsite Packing",
      ],
    },
    {
      name: "Dedicated Desk",
      description: "Your own desk in a shared environment",
      hourly: formatPrice(250, t("price.hour")),
      halfDay: formatPrice(600, t("price.halfDay")),
      daily: formatPrice(1000, t("price.day")),
      weekly: formatPrice(5000, t("price.weekly")),
      monthly: formatPrice(14000, t("price.month")),
      popular: true,
      features: [
        "All Hot Desk features",
        "Reserved desk space",
        "Personal storage locker",
        "Meeting room credits (2hrs/month)",
        "Priority booking",
        "Convenient Access Hours",
      ],
    },
    {
      name: "Private Office (1-Person)",
      description: "Private office for individuals",
      hourly: formatPrice(350, t("price.hour")),
      halfDay: formatPrice(1000, t("price.halfDay")),
      daily: formatPrice(2500, t("price.day")),
      weekly: formatPrice(6000, t("price.weekly")),
      monthly: formatPrice(16000, t("price.month")),
      popular: false,
      features: [
        "All Dedicated Desk features",
        "Private lockable office",
        "Desk & ergonomic chair",
        "Natural lighting",
        "access to printing (500pages/month)",
        "Professional setup",
      ],
    },
  ];
  
  const plans = getPlans();

  const getAddOns = () => [
    { name: "Meeting Room (6-8 pax)", price: formatPrice(1000, t("price.hour")) },
    { name: "Boardroom (16-20 pax)", price: formatPrice(2500, t("price.hour")) },
    { name: "Call Pod Access", price: formatPrice(250, t("price.hour")) },
    { name: "Printing Services", price: formatPrice(5, t("price.page")) },
    { name: "Front office support", price: t("pricing.free") },
    { name: "", price: "" },
  ];
  
  const addOns = getAddOns();

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Get Started" }, { name: "Pricing" }]} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">{t("pricing.title")}</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow border-2 ${
                  plan.popular ? "border-[#D4AF37]" : "border-[#5C4033]/10"
                } relative`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-[#5C4033]">
                    {t("pricing.popular")}
                  </Badge>
                )}
                <h3 className="text-[#5C4033] mb-2 text-2xl font-playfair">{plan.name}</h3>
                <p className="text-sm text-[#5C4033]/70 mb-6">{plan.description}</p>

                <div className="space-y-2 mb-6 pb-6 border-b border-[#5C4033]/10">
                  <div>
                    <span className="text-sm text-[#5C4033]/60">{t("officeSpaces.hourly")}:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.hourly}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">{t("officeSpaces.halfDay")}:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.halfDay}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">{t("price.day")}:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.daily}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">{t("officeSpaces.weekly")}:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.weekly}</span>
                  </div>
                  <div className="pt-2 border-t border-[#D4AF37]/20">
                    <span className="text-sm font-semibold text-[#5C4033]">{t("officeSpaces.monthly")}:</span>
                    <span className="text-2xl text-[#D4AF37] ml-2 font-bold">{plan.monthly}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-[#5C4033]/70">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/book-tour">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
                        : "bg-[#5C4033] hover:bg-[#4A3329] text-white"
                    }`}
                  >
                    {t("home.getStarted")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">{t("pricing.addOns")}</h2>
            <div className="bg-[#FFFFF0] rounded-lg p-8 border border-[#5C4033]/10">
              <div className="grid md:grid-cols-2 gap-6">
                {addOns.map((addon, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-white rounded-lg border border-[#5C4033]/10 hover:shadow-md transition-shadow"
                  >
                    <span className="text-[#5C4033]">{addon.name}</span>
                    <span className="text-[#D4AF37] font-semibold">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-[#5C4033] mb-4 text-3xl font-playfair">{t("pricing.needCustomSolution")}</h3>
          <p className="text-[#5C4033]/70 mb-8">
            {t("pricing.customSolutionDesc")}
          </p>
          <Link href="/contact">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
              {t("pricing.contactSales")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

