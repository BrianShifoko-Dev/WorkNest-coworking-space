'use client'

import { Briefcase, Users, Calendar as CalendarIcon, Building } from "lucide-react";
import { BookingForm } from "@/components/site/BookingForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BookSpaceClient() {
  const spaceTypes = [
    {
      icon: Users,
      title: "Hot Desk",
      description: "Flexible seating in our shared workspace",
      price: "From KES 500/day",
      link: "/pricing",
    },
    {
      icon: Briefcase,
      title: "Dedicated Desk",
      description: "Your own desk in a shared environment",
      price: "From KES 15,000/month",
      link: "/pricing",
    },
    {
      icon: Building,
      title: "Private Office",
      description: "Fully furnished offices for teams",
      price: "From KES 35,000/month",
      link: "/office-spaces",
    },
    {
      icon: CalendarIcon,
      title: "Meeting Room",
      description: "Professional boardrooms by the hour",
      price: "From KES 2,500/hour",
      link: "/boardrooms",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero */}
      <section className="bg-gradient-to-r from-[#5C4033] to-[#4A3329] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Workspace</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Choose the perfect space for your needs and start working in minutes
          </p>
        </div>
      </section>

      {/* Space Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Choose Your Space Type</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Select from our range of flexible workspace solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {spaceTypes.map((space, index) => {
              const Icon = space.icon;
              return (
                <Link key={index} href={space.link}>
                  <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10 hover:shadow-xl transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                      <Icon className="w-6 h-6 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{space.title}</h3>
                    <p className="text-sm text-[#5C4033]/70 mb-3">{space.description}</p>
                    <p className="text-[#D4AF37] font-medium">{space.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Complete Your Booking</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Fill in your details and we'll get back to you with confirmation
            </p>
          </div>
          
          <BookingForm variant="full" />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Need Help Choosing?</h2>
          <p className="text-[#5C4033]/70 mb-6 max-w-2xl mx-auto">
            Not sure which space is right for you? Book a tour and we'll show you around.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-tour">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                Schedule a Tour
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

