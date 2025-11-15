'use client'

import { Users, Network, TrendingUp, Award, CheckCircle, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function JoinCommunityClient() {
  const benefits = [
    {
      icon: Users,
      title: "500+ Active Members",
      description: "Join a vibrant community of entrepreneurs, freelancers, and professionals",
    },
    {
      icon: Network,
      title: "Networking Events",
      description: "Weekly meetups, workshops, and social events to expand your network",
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Access to mentorship programs, partnerships, and collaboration opportunities",
    },
    {
      icon: Award,
      title: "Exclusive Perks",
      description: "Member discounts, priority booking, and access to premium amenities",
    },
  ];

  const memberTypes = [
    {
      title: "Entrepreneurs",
      description: "Build and scale your startup with like-minded founders",
      count: "200+",
    },
    {
      title: "Freelancers",
      description: "Find clients, collaborate on projects, and grow your portfolio",
      count: "150+",
    },
    {
      title: "Remote Workers",
      description: "Escape home isolation and work in a productive environment",
      count: "100+",
    },
    {
      title: "Small Businesses",
      description: "Establish your presence with a professional workspace",
      count: "50+",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyMjAwMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C4033]/90 to-[#5C4033]/70" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Community</h1>
            <p className="text-xl mb-6">
              Become part of Kenya's most vibrant professional community in Eldoret
            </p>
            <Link href="/book">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                Get Started Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Why Join WorkNest?</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              More than just a workspace - it's a community that helps you succeed
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{benefit.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Member Types */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Our Diverse Community</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Professionals from all industries thriving together
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {memberTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-[#5C4033]/10 hover:shadow-lg transition-shadow">
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">{type.count}</div>
                <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{type.title}</h3>
                <p className="text-sm text-[#5C4033]/70">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Join */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">How to Join</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Book a Tour</h3>
              <p className="text-sm text-[#5C4033]/70">Visit our space and meet the team</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Choose Your Plan</h3>
              <p className="text-sm text-[#5C4033]/70">Select a membership that fits your needs</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Start Working</h3>
              <p className="text-sm text-[#5C4033]/70">Move in and connect with the community</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] to-[#C5A028]">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 text-[#5C4033] mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Ready to Join?</h2>
          <p className="text-[#5C4033]/80 mb-8 max-w-2xl mx-auto">
            Take the first step towards building your business in a supportive community
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-tour">
              <Button className="bg-[#5C4033] hover:bg-[#4A3329] text-white">
                Schedule a Tour
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

