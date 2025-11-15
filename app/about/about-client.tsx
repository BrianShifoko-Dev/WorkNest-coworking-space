'use client'

import Link from "next/link";
import { Award, Users, Target, TrendingUp } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";

export function AboutClient() {
  const milestones = [
    { year: "2025", title: "Founded", description: "The WorkNest Coworking space was established in Eldoret." },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Premium space and services, every time",
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building connections that drive growth.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Inspiring creativity and forward-thinking solutions.",
    },
    {
      icon: TrendingUp,
      title: "Flexibility",
      description: "Space designed to adapt to your needs",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Discover Us" }, { name: "About Us" }]} />

      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=1920&q=80"
          alt="About WorkNest Eldoret"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl mb-4 font-playfair">About The WorkNest</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Redefining coworking space excellence in Eldoret, Kenya since 2025
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-6 text-4xl font-playfair">Our Story</h2>
            <div className="prose prose-lg mx-auto text-[#5C4033]/70 text-lg leading-relaxed">
              <p className="mb-6">
                The WorkNest Eldoret was born from a vision to create a workspace where businesses, entrepreneurs, and professionals could thrive in comfort, creativity, and collaboration. Located in the prestigious Elgon View, we designed every space from private offices and meeting rooms to hot desks and a kids' zone to inspire productivity and connection.
              </p>
              <p className="mb-6">
                Our journey began with a simple idea: workspaces should do more than house desks they should foster growth, innovation, and community. Today, The WorkNest stands as a hub where ideas flourish, teams connect, and businesses reach their full potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-16 text-4xl font-playfair">Our Journey</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0 w-24">
                    <div className="text-4xl text-[#D4AF37] font-bold">{milestone.year}</div>
                  </div>
                  <div className="flex-1 bg-white rounded-lg p-6 shadow-md border border-[#5C4033]/10">
                    <h4 className="text-xl text-[#5C4033] mb-2 font-semibold">{milestone.title}</h4>
                    <p className="text-[#5C4033]/70">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-[#FFFFF0] rounded-lg border border-[#5C4033]/10 hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-[#D4AF37]" />
                </div>
                <h4 className="text-[#5C4033] mb-2 text-xl font-semibold">{value.title}</h4>
                <p className="text-sm text-[#5C4033]/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white mb-4 text-3xl font-playfair">Ready to Join Our Community?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Experience the WorkNest difference. Book a tour today and see why Eldoret's top professionals choose us.
          </p>
          <Link href="/book-tour">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
              Schedule a Tour
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

