'use client'

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SpaceImage } from "@/components/site/ImageLightbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Lock, Headphones, Wifi, Zap, Clock, CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/site/BookingForm";
import Link from "next/link";

export function TelephoneBoothsClient() {
  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description: "Soundproof booths for confidential calls and focused conversations",
    },
    {
      icon: Headphones,
      title: "Acoustic Excellence",
      description: "Professional sound insulation ensures crystal-clear communication",
    },
    {
      icon: Wifi,
      title: "Tech-Equipped",
      description: "WiFi, USB charging ports, and power outlets built-in",
    },
    {
      icon: Zap,
      title: "Ventilation System",
      description: "Climate-controlled comfort during extended calls",
    },
    {
      icon: Clock,
      title: "Flexible Booking",
      description: "Reserve by the hour or drop in when available",
    },
    {
      icon: Phone,
      title: "Perfect for Calls",
      description: "Video conferences, client calls, interviews, and more",
    },
  ];

  const useCases = [
    {
      title: "Confidential Calls",
      description: "Discuss sensitive matters without worrying about eavesdropping",
      icon: "🔒",
    },
    {
      title: "Video Interviews",
      description: "Professional setting for job interviews and candidate screenings",
      icon: "💼",
    },
    {
      title: "Client Meetings",
      description: "Impress clients with privacy and professionalism",
      icon: "🤝",
    },
    {
      title: "Focus Time",
      description: "Escape distractions for deep work or important research",
      icon: "🎯",
    },
  ];

  const pricing = [
    { duration: "30 Minutes", price: "KES 300", popular: false },
    { duration: "1 Hour", price: "KES 500", popular: true },
    { duration: "2 Hours", price: "KES 900", popular: false },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]" data-section="spaces">
      <Breadcrumbs
        items={[{ name: "Products & Book", path: "/products" }, { name: "Telephone Booths" }]}
      />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1716703435698-031227389c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWxlcGhvbmUlMjBib290aHxlbnwxfHx8fDE3NjIyMzM2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Private Telephone Booths"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Phone className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Private Telephone Booths</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Soundproof, tech-enabled privacy pods for calls, interviews, and focused work
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-[#5C4033] mb-6">Privacy When You Need It Most</h2>
            <p className="text-xl text-[#5C4033]/70 mb-8">
              In an open coworking environment, sometimes you need complete privacy. Our soundproof 
              telephone booths provide the perfect sanctuary for confidential calls, video conferences, 
              and focused work sessions.
            </p>
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <div className="text-center">
                <div className="text-3xl mb-2">🔇</div>
                <p className="text-sm text-[#5C4033]/70">Soundproof</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <p className="text-sm text-[#5C4033]/70">Fast WiFi</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔌</div>
                <p className="text-sm text-[#5C4033]/70">Power & USB</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">❄️</div>
                <p className="text-sm text-[#5C4033]/70">Climate Control</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Designed for Privacy & Comfort</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-[#5C4033]/10">
                <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{feature.title}</h3>
                <p className="text-sm text-[#5C4033]/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Perfect For</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {useCases.map((useCase, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-6 bg-[#FFFFF0] rounded-lg border border-[#5C4033]/10 hover:border-[#D4AF37] transition-all"
                >
                  <div className="text-4xl">{useCase.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{useCase.title}</h3>
                    <p className="text-sm text-[#5C4033]/70">{useCase.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Affordable Hourly Rates</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {pricing.map((option, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg p-8 shadow-lg border-2 transition-all text-center ${
                  option.popular
                    ? "border-[#D4AF37] shadow-xl scale-105"
                    : "border-[#5C4033]/10 hover:border-[#D4AF37]"
                }`}
              >
                {option.popular && (
                  <Badge className="bg-[#D4AF37] text-[#5C4033] mb-4">Most Popular</Badge>
                )}
                <h3 className="text-2xl font-bold text-[#5C4033] mb-2">{option.duration}</h3>
                <div className="text-4xl font-bold text-[#D4AF37] mb-6">{option.price}</div>
                <ul className="space-y-2 mb-6 text-sm text-[#5C4033]/70">
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Full Privacy</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>WiFi & Power</span>
                  </li>
                  <li className="flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                    <span>Climate Control</span>
                  </li>
                </ul>
                <Button
                  asChild
                  className={
                    option.popular
                      ? "w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
                      : "w-full bg-white border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#5C4033]"
                  }
                >
                  <Link href="/contact">Book Now</Link>
                </Button>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#5C4033]/60 mt-8">
            * Available for members and day pass holders • Subject to availability
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">How to Use Our Phone Booths</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#D4AF37]">1</span>
                </div>
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Book or Walk In</h3>
                <p className="text-sm text-[#5C4033]/70">
                  Reserve in advance or check availability at reception
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#D4AF37]">2</span>
                </div>
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Enter & Lock</h3>
                <p className="text-sm text-[#5C4033]/70">
                  Step inside, close the door for complete soundproofing
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[#D4AF37]">3</span>
                </div>
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Make Your Call</h3>
                <p className="text-sm text-[#5C4033]/70">
                  Enjoy private, professional communication space
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-4">Reserve a Phone Booth</h2>
            <p className="text-center text-[#5C4033]/70 mb-12 max-w-2xl mx-auto">
              Book your preferred time slot to guarantee availability. Walk-ins welcome based on availability.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#5C4033]/10">
              <BookingForm />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">Need More Information?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Contact our team to learn more about phone booth availability, 
            membership packages, or to schedule a visit.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              asChild
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#5C4033]"
            >
              <Link href="/office-spaces">View All Spaces</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

