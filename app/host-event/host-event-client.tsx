'use client'

import { useState } from "react";
import Image from "next/image";
import { Calendar as CalendarIcon, Users, Wifi, Coffee, Monitor, Utensils, Mic, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";

export function HostEventClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    attendees: "",
    requirements: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event inquiry submitted! We'll contact you soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      attendees: "",
      requirements: "",
    });
  };

  const eventTypes = [
    {
      title: "Workshops & Training",
      capacity: "Up to 50 people",
      price: "From KES 15,000/day",
      image: "https://images.unsplash.com/photo-1758518731572-7791381c5ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMTg4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Corporate Events",
      capacity: "Up to 100 people",
      price: "From KES 25,000/day",
      image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwYm9hcmRyb29tfGVufDF8fHx8MTc2MjIzMzYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      title: "Product Launches",
      capacity: "Up to 150 people",
      price: "From KES 35,000/day",
      image: "https://images.unsplash.com/photo-1759873148521-c49d9497cf64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHNwYWNlJTIwdmVudWV8ZW58MXx8fHwxNzYyMTgyNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  const amenities = [
    { icon: Monitor, name: "AV Equipment" },
    { icon: Wifi, name: "High-Speed WiFi" },
    { icon: Coffee, name: "Catering Services" },
    { icon: Utensils, name: "Kitchen Access" },
    { icon: Mic, name: "Sound System" },
    { icon: Users, name: "Event Support" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1759873148521-c49d9497cf64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHNwYWNlJTIwdmVudWV8ZW58MXx8fHwxNzYyMTgyNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Event Space"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Host Your Event at WorkNest</h1>
            <p className="text-xl">
              Premium event spaces in the heart of Eldoret for memorable experiences
            </p>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Event Spaces</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Flexible venues for any occasion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {eventTypes.map((event, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg border border-[#5C4033]/10 hover:shadow-xl transition-shadow">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#5C4033] mb-2">{event.title}</h3>
                  <p className="text-sm text-[#5C4033]/70 mb-2">{event.capacity}</p>
                  <p className="text-[#D4AF37] font-bold">{event.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">What's Included</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {amenities.map((amenity, index) => {
              const Icon = amenity.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <p className="text-sm text-[#5C4033]">{amenity.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Request Event Booking
              </h2>
              <p className="text-lg text-[#5C4033]/60">
                Tell us about your event and we'll create a custom package for you
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-[#F5F5DC] p-10 md:p-12 rounded-2xl shadow-xl border border-[#5C4033]/5">
              <div className="space-y-6">
                {/* Row 1: Name & Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] placeholder:text-[#5C4033]/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] placeholder:text-[#5C4033]/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Row 2: Phone & Event Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] placeholder:text-[#5C4033]/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Event Type
                    </Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => setFormData({ ...formData, eventType: value })}
                    >
                      <SelectTrigger id="eventType" className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="launch">Product Launch</SelectItem>
                        <SelectItem value="conference">Conference</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="training">Training Session</SelectItem>
                        <SelectItem value="networking">Networking Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 3: Event Date & Expected Attendees */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="eventDate" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Event Date
                    </Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="attendees" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Expected Attendees
                    </Label>
                    <Input
                      id="attendees"
                      type="number"
                      value={formData.attendees}
                      onChange={(e) => setFormData({ ...formData, attendees: e.target.value })}
                      placeholder="e.g., 50"
                      required
                      min="1"
                      className="h-12 bg-white border-[#5C4033]/20 text-[#5C4033] placeholder:text-[#5C4033]/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg"
                    />
                  </div>
                </div>

                {/* Row 4: Special Requirements (Full Width) */}
                <div>
                  <Label htmlFor="requirements" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                    Special Requirements
                  </Label>
                  <Textarea
                    id="requirements"
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    placeholder="Tell us about catering, AV needs, setup preferences, etc."
                    rows={5}
                    className="bg-white border-[#5C4033]/20 text-[#5C4033] placeholder:text-[#5C4033]/40 focus:border-[#D4AF37] focus:ring-[#D4AF37] rounded-lg resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full h-14 bg-[#D4AF37] hover:bg-[#C5A028] text-[#5C4033] font-bold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                >
                  Submit Event Inquiry
                </Button>

                {/* Trust Badge */}
                <div className="flex items-center justify-center gap-2 pt-4 border-t border-[#5C4033]/10">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37]" />
                  <p className="text-sm text-[#5C4033]/60">
                    We'll respond within 24 hours
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Need More Information?</h2>
          <p className="text-[#5C4033]/70 mb-6 max-w-2xl mx-auto">
            Our events team is here to help you plan the perfect occasion
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/event-spaces">
              <Button className="bg-[#5C4033] hover:bg-[#4A3329] text-white">
                View Event Spaces
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white">
                Contact Events Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

