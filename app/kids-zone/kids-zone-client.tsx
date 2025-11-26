'use client'

import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/site/BookingForm";
import { Baby, Heart, Shield, Clock, Users, Sparkles, BookOpen, Palette } from "lucide-react";

export function KidsZoneClient() {
  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "Monitored play area with safety measures and trained staff supervision",
    },
    {
      icon: Users,
      title: "Age-Appropriate",
      description: "Activities and toys designed for children aged 2-10 years",
    },
    {
      icon: BookOpen,
      title: "Educational Play",
      description: "Learning toys, books, and interactive activities that inspire creativity",
    },
    {
      icon: Palette,
      title: "Creative Corner",
      description: "Arts & crafts station for imaginative expression and development",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Available during workspace operating hours with hourly booking",
    },
    {
      icon: Heart,
      title: "Parent-Friendly",
      description: "Located near common areas so parents can stay productive nearby",
    },
  ];

  const activities = [
    "Building Blocks & Puzzles",
    "Reading Corner with Children's Books",
    "Arts & Crafts Station",
    "Educational Games",
    "Soft Play Equipment",
  ];

  const pricingOptions = [
    { duration: "1 Hour", price: "KES 500", description: "Perfect for quick meetings" },
    { duration: "Half Day (4 hours)", price: "KES 1,500", description: "Morning or afternoon care" },
    { duration: "Full Day (8 hours)", price: "KES 2,500", description: "All-day supervision" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Workspace Solutions" }, { name: "Kids Zone" }]}
      />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10" />
        <img
          src="/gallery/DJI_20000609070609_0057_D.jpg"
          alt="Kids Zone"
          className="w-full h-full object-cover"
        />
        {/* Coming Soon Badge */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
          <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-lg px-8 py-3 animate-pulse shadow-2xl">
            <Sparkles className="w-5 h-5 mr-2" />
            Coming Soon
          </Badge>
        </div>
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Baby className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Kids Zone</h1>
            <p className="text-xl max-w-3xl mx-auto">
              A safe, fun, and supervised play area where your little ones can enjoy 
              while you focus on work
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-3xl font-bold text-[#5C4033] mb-6">Work-Life Balance Made Easy</h2>
            <p className="text-xl text-[#5C4033]/70 mb-8">
              We understand that parenting and professional life go hand-in-hand. Our Kids Zone 
              provides a safe, engaging environment where children can play and learn while parents 
              work productively just steps away.
            </p>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">2-10</div>
                <p className="text-sm text-[#5C4033]/70">Years Old</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">Mon-Sat</div>
                <p className="text-sm text-[#5C4033]/70">8AM - 6PM</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#D4AF37] mb-2">Supervised</div>
                <p className="text-sm text-[#5C4033]/70">Trained Staff</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-2xl font-bold text-[#5C4033] mb-10">Why Parents Love Our Kids Zone</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-5 rounded-lg shadow-md border border-[#5C4033]/10 hover:shadow-lg transition-shadow group">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-3">
                    <Icon className="w-6 h-6 text-[#D4AF37] transition-transform duration-500 group-hover:rotate-[360deg] group-hover:scale-110" />
                  </div>
                  <h3 className="text-base font-semibold text-[#5C4033] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-1 bg-[#D4AF37] mb-6" />
                <h2 className="text-3xl font-bold text-[#5C4033] mb-6">Engaging Activities & Amenities</h2>
                <p className="text-[#5C4033]/70 mb-6">
                  Our Kids Zone is thoughtfully designed with age-appropriate toys, games, and 
                  activities that keep children entertained, engaged, and learning throughout the day.
                </p>
                <ul className="space-y-3">
                  {activities.map((activity, index) => (
                    <li key={index} className="flex items-center gap-3 text-[#5C4033]/80">
                      <Sparkles className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-64 rounded-lg overflow-hidden shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZ3xlbnwwfHx8fDE3MzA3Mjk2MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Kids playing"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="h-64 rounded-lg overflow-hidden shadow-md mt-8">
                  <img
                    src="https://images.unsplash.com/photo-1560421683-6856ea585c78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nfGVufDB8fHx8MTczMDcyOTYwMHww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Learning activities"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-3xl font-bold text-[#5C4033] mb-12">Flexible Pricing Options</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 shadow-md border border-[#5C4033]/10 hover:border-[#D4AF37] transition-all text-center"
              >
                <h3 className="text-2xl font-semibold text-[#5C4033] mb-2">{option.duration}</h3>
                <div className="text-4xl font-bold text-[#D4AF37] mb-4">{option.price}</div>
                <p className="text-sm text-[#5C4033]/60 mb-6">{option.description}</p>
                <Link href="/book">
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                    Book Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-[#5C4033]/60 mt-8">
            * Advance booking required • Snacks and refreshments available for purchase
          </p>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10 rounded-lg p-8 border-l-4 border-[#D4AF37]">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-[#D4AF37] flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-[#5C4033] mb-3">Safety First</h3>
                <p className="text-[#5C4033]/80 mb-4">
                  The safety and wellbeing of your children is our top priority. All staff members 
                  are trained in child care and first aid. The Kids Zone is equipped with:
                </p>
                <ul className="space-y-2 text-sm text-[#5C4033]/70">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    CCTV monitoring and secure entry system
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    Child-safe furniture and equipment
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    Regular cleaning and sanitization protocols
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                    Emergency procedures and first aid kit
                  </li>
                </ul>
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
            <h2 className="text-center text-3xl font-bold text-[#5C4033] mb-4">Reserve Kids Zone</h2>
            <p className="text-center text-[#5C4033]/70 mb-12 max-w-2xl mx-auto">
              Book your child's spot in advance. Please provide child's age and any special 
              requirements in the notes section.
            </p>
            <div className="bg-white rounded-lg shadow-md p-8 border border-[#5C4033]/10">
              <BookingForm variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-[#5C4033] mb-4">Want to See the Kids Zone?</h3>
          <p className="text-[#5C4033]/80 mb-8 max-w-2xl mx-auto">
            Schedule a tour to visit our Kids Zone and meet our friendly staff. 
            We're happy to answer any questions about safety, activities, and booking.
          </p>
          <Link href="/book-tour">
            <Button className="bg-[#5C4033] hover:bg-[#4A3329] text-white">
              Book a Tour
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

