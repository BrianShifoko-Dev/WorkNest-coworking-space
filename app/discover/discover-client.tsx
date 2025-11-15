'use client'

import Link from "next/link";
import { Target, Users, Zap, Heart, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DiscoverClient() {
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
      title: "Security",
      description: "24/7 secure access with modern security systems",
    },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?w=800&q=80",
    "https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?w=800&q=80",
    "https://images.unsplash.com/photo-1692133226337-55e513450a32?w=800&q=80",
    "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=800&q=80",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img
          src="https://images.unsplash.com/photo-1693902997450-7e912c0d3554?w=1920&q=80"
          alt="Eldoret City"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl mb-4 font-playfair">Discover WorkNest</h1>
            <p className="text-xl">Your premier workspace partner in Eldoret, Kenya</p>
          </div>
        </div>
      </section>

      {/* About Company */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">Who We Are</h2>
              <p className="text-[#5C4033]/70 mb-4 text-lg">
                The WorkNest is a premium coworking and innovation space in the prestigious Elgon View, Eldoret. We offer flexible, executive-grade workspace designed to boost productivity, collaboration, and business growth.
              </p>
              <p className="text-[#5C4033]/70 mb-4 text-lg">
                Our facilities include hot desks, private offices, meeting suites, event space, a lounge, an eatery, and a kids' zone—all thoughtfully designed with ergonomic furniture, high-speed internet, natural light, and inspiring views.
              </p>
              <p className="text-[#5C4033]/70 text-lg">
                At The WorkNest, we provide the ideal environment for businesses to thrive, teams to connect, and ideas to grow.
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
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Why Choose WorkNest?</h2>
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
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Hot Desks", desc: "Flexible seating in shared spaces" },
                { title: "Private Offices", desc: "Lockable offices for 1-10 people" },
                { title: "Meeting Rooms", desc: "Professional boardrooms with AV" },
                { title: "Event Space", desc: "Venues for workshops and launches" },
                { title: "Restaurant & Café", desc: "On-site dining and refreshments" },
                { title: "Kids Zone", desc: "Supervised childcare facility" },
                { title: "High-Speed WiFi", desc: "100Mbps+ internet throughout" },
                { title: "24/7 Access", desc: "Work on your schedule" },
                { title: "Parking", desc: "Secure parking for members" },
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
          <h3 className="text-white mb-4 text-3xl font-playfair">Ready to Experience WorkNest?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Schedule a tour and see why Eldoret's top professionals choose WorkNest
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/book-tour">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
                Book a Tour
              </Button>
            </Link>
            <Link href="/pricing">
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-8 py-6 text-lg"
              >
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

