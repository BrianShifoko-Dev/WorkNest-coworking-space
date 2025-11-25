'use client'

import Link from "next/link";
import { Check } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function PricingClient() {
  const plans = [
    {
      name: "Hot Desk",
      description: "Flexible workspace solution for individuals",
      hourly: "KES 180",
      halfDay: "KES 450",
      daily: "KES 650",
      weekly: "KES 2,500",
      monthly: "KES 8,700",
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
      hourly: "KES 250",
      halfDay: "KES 600",
      daily: "KES 1,000",
      weekly: "KES 5,000",
      monthly: "KES 14,000",
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
      description: "6 sqm private office for individuals",
      hourly: "KES 350",
      halfDay: "KES 1,000",
      daily: "KES 2,500",
      weekly: "KES 6,000",
      monthly: "KES 16,000",
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

  const addOns = [
    { name: "Meeting Room (6-8 pax)", price: "KES 1,000/hr" },
    { name: "Boardroom (16-20 pax)", price: "KES 2,500/hr" },
    { name: "Call Pod Access", price: "KES 250/hr" },
    { name: "Printing Services", price: "KES 5/page" },
    { name: "Front office support", price: "Free" },
    { name: "", price: "" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Get Started" }, { name: "Pricing" }]} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">Simple, Transparent Pricing</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Choose the plan that works best for you in Eldoret. All plans include our core amenities.
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
                    Most Popular
                  </Badge>
                )}
                <h3 className="text-[#5C4033] mb-2 text-2xl font-playfair">{plan.name}</h3>
                <p className="text-sm text-[#5C4033]/70 mb-6">{plan.description}</p>

                <div className="space-y-2 mb-6 pb-6 border-b border-[#5C4033]/10">
                  <div>
                    <span className="text-sm text-[#5C4033]/60">Hourly:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.hourly}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">Half Day:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.halfDay}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">Daily:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.daily}</span>
                  </div>
                  <div>
                    <span className="text-sm text-[#5C4033]/60">Weekly:</span>
                    <span className="text-xl text-[#D4AF37] ml-2 font-semibold">{plan.weekly}</span>
                  </div>
                  <div className="pt-2 border-t border-[#D4AF37]/20">
                    <span className="text-sm font-semibold text-[#5C4033]">Monthly:</span>
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
                    Get Started
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
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Add-On Services</h2>
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
          <h3 className="text-[#5C4033] mb-4 text-3xl font-playfair">Need a Custom Solution?</h3>
          <p className="text-[#5C4033]/70 mb-8">
            Contact us for enterprise plans and custom workspace solutions in Eldoret
          </p>
          <Link href="/contact">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
              Contact Sales
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

