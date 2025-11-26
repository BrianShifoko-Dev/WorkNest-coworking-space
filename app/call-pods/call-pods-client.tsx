'use client'

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { SpaceImage } from "@/components/site/ImageLightbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Lock, Headphones, Wifi, Zap, Clock, CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/site/BookingForm";
import Link from "next/link";

export function CallPodsClient() {
  const features = [
    {
      icon: Lock,
      title: "Complete Privacy",
      description: "Soundproof pods for confidential calls and focused conversations",
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
    { duration: "Hourly", price: "KES 250", popular: false },
    { duration: "Half Day", price: "KES 600", popular: true },
    { duration: "Full Day", price: "KES 950", popular: false },
    { duration: "Weekly", price: "KES 4,500", popular: false },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]" data-section="spaces">
      <Breadcrumbs
        items={[{ name: "Workspace Solutions", path: "/spaces" }, { name: "Call Pods" }]}
      />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1716703435698-031227389c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWxlcGhvbmUlMjBib290aHxlbnwxfHx8fDE3NjIyMzM2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Private Call Pods"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Phone className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Private Call Pods</h1>
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
              call pods provide the perfect sanctuary for confidential calls, video conferences, 
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

      {/* Features Grid */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-10 text-[#5C4033]">Why Choose Our Call Pods?</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white p-6 rounded-xl border border-[#D4AF37]/20 hover:shadow-xl transition-shadow group"
                >
                  <Icon className="w-10 h-10 text-[#D4AF37] mb-3 transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
                  <h3 className="text-lg font-bold text-[#5C4033] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#5C4033]">Perfect For</h2>
          <p className="text-center text-[#5C4033]/70 mb-12 max-w-2xl mx-auto">
            From confidential discussions to focused work, our call pods serve multiple purposes
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-6 rounded-xl border border-[#D4AF37]/20"
              >
                <div className="text-4xl mb-3">{useCase.icon}</div>
                <h3 className="font-bold text-[#5C4033] mb-2">{useCase.title}</h3>
                <p className="text-sm text-[#5C4033]/70">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-[#5C4033]">Flexible Pricing</h2>
          <p className="text-center text-[#5C4033]/70 mb-12">Pay only for the time you need</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {pricing.map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-xl border-2 ${
                  plan.popular
                    ? "border-[#D4AF37] bg-gradient-to-br from-[#D4AF37]/10 to-white shadow-lg"
                    : "border-[#D4AF37]/20 bg-white"
                }`}
              >
                {plan.popular && (
                  <Badge className="mb-4 bg-[#D4AF37] text-white">Most Popular</Badge>
                )}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-[#5C4033] mb-2">{plan.duration}</h3>
                  <div className="text-4xl font-bold text-[#D4AF37] mb-6">{plan.price}</div>
                  <Link href="/book">
                    <Button
                      className={
                        plan.popular
                          ? "w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A]"
                          : "w-full bg-[#5C4033] hover:bg-[#5C4033]/90"
                      }
                    >
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#5C4033]">Pod Specifications</h2>
          <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Dimensions</h4>
                <p className="text-[#5C4033]/70">1.2m x 1.2m x 2.2m (W x D x H)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Capacity</h4>
                <p className="text-[#5C4033]/70">1 person (standing or sitting)</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Sound Reduction</h4>
                <p className="text-[#5C4033]/70">30+ dB noise cancellation</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Connectivity</h4>
                <p className="text-[#5C4033]/70">High-speed WiFi, USB-C, USB-A</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Lighting</h4>
                <p className="text-[#5C4033]/70">Adjustable LED with motion sensor</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-[#5C4033]">Ventilation</h4>
                <p className="text-[#5C4033]/70">Active airflow system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Booking */}
      <section className="py-20 bg-gradient-to-br from-[#5C4033] to-[#3D2A22]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Phone className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Private Call Pod Today</h2>
            <p className="text-xl mb-8 text-white/80">
              Reserve a pod for your next important call or video meeting
            </p>
            <Link href="/book">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white px-8 py-6 text-lg"
              >
                Reserve a Pod Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gradient-to-b from-white via-[#FFFFF0]/50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Elegant Header */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <Phone className="w-8 h-8 text-[#D4AF37]" />
                  <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-[#5C4033] mb-4 tracking-tight">
                  Reserve Your Call Pod
                </h2>
                <p className="text-xl text-[#5C4033]/70 max-w-2xl mx-auto leading-relaxed">
                  Complete the form below and we'll confirm your booking within 24 hours
                </p>
              </div>
            </div>

            {/* Elegant Form Card */}
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#D4AF37]/10 rounded-full blur-3xl" />
              
              {/* Form container */}
              <div className="relative bg-white rounded-3xl shadow-2xl border-2 border-[#D4AF37]/10 p-10 md:p-14 backdrop-blur-sm">
                <BookingForm 
                  variant="full"
                  defaultSpaceType="call-pod"
                  spaceTypeOptions={[
                    { value: "call-pod", label: "Call Pod" }
                  ]}
                />
              </div>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-semibold text-[#5C4033]">Instant Confirmation</p>
                <p className="text-xs text-[#5C4033]/60 mt-1">Get confirmed within 24 hours</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                  <Lock className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-semibold text-[#5C4033]">Secure Booking</p>
                <p className="text-xs text-[#5C4033]/60 mt-1">Your data is protected</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-3">
                  <Clock className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <p className="text-sm font-semibold text-[#5C4033]">Flexible Hours</p>
                <p className="text-xs text-[#5C4033]/60 mt-1">Book by hour, day, or week</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

