'use client'

import { useState } from "react";
import Image from "next/image";
import { Coffee, Users, Calendar as CalendarIcon, Clock, Utensils, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";

export function ReserveTableClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    occasion: "",
    requests: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Table reserved! We'll send you a confirmation shortly.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      occasion: "",
      requests: "",
    });
  };

  const features = [
    {
      icon: Coffee,
      title: "Artisan Coffee",
      description: "Premium espresso and specialty drinks",
    },
    {
      icon: Utensils,
      title: "Gourmet Cuisine",
      description: "Fresh, locally-sourced ingredients",
    },
    {
      icon: Wine,
      title: "Full Bar",
      description: "Curated selection of wines and cocktails",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1687945512099-400cbe94460c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyMTc0NzczfDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Restaurant"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Reserve Your Table</h1>
            <p className="text-xl">
              Experience exceptional dining at The WorkNest Restaurant
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Make a Reservation</h2>
              <p className="text-[#5C4033]/70">
                Complete the form below to secure your table
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-[#5C4033]/10">
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-[#5C4033]">
                      <Users className="w-4 h-4 inline mr-2" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#5C4033]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-[#5C4033]">
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-1"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests" className="text-[#5C4033]">
                      Number of Guests
                    </Label>
                    <Select
                      value={formData.guests}
                      onValueChange={(value) => setFormData({ ...formData, guests: value })}
                    >
                      <SelectTrigger id="guests" className="mt-1">
                        <SelectValue placeholder="Select guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Guest</SelectItem>
                        <SelectItem value="2">2 Guests</SelectItem>
                        <SelectItem value="3">3 Guests</SelectItem>
                        <SelectItem value="4">4 Guests</SelectItem>
                        <SelectItem value="5">5 Guests</SelectItem>
                        <SelectItem value="6">6+ Guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-[#5C4033]">
                      <CalendarIcon className="w-4 h-4 inline mr-2" />
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      min={getTodayDate()}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-[#5C4033]">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Time
                    </Label>
                    <Select
                      value={formData.time}
                      onValueChange={(value) => setFormData({ ...formData, time: value })}
                    >
                      <SelectTrigger id="time" className="mt-1">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12:00">12:00 PM</SelectItem>
                        <SelectItem value="12:30">12:30 PM</SelectItem>
                        <SelectItem value="13:00">1:00 PM</SelectItem>
                        <SelectItem value="13:30">1:30 PM</SelectItem>
                        <SelectItem value="14:00">2:00 PM</SelectItem>
                        <SelectItem value="18:00">6:00 PM</SelectItem>
                        <SelectItem value="18:30">6:30 PM</SelectItem>
                        <SelectItem value="19:00">7:00 PM</SelectItem>
                        <SelectItem value="19:30">7:30 PM</SelectItem>
                        <SelectItem value="20:00">8:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="occasion" className="text-[#5C4033]">
                    Special Occasion (Optional)
                  </Label>
                  <Select
                    value={formData.occasion}
                    onValueChange={(value) => setFormData({ ...formData, occasion: value })}
                  >
                    <SelectTrigger id="occasion" className="mt-1">
                      <SelectValue placeholder="Select occasion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="anniversary">Anniversary</SelectItem>
                      <SelectItem value="business">Business Meeting</SelectItem>
                      <SelectItem value="celebration">Celebration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="requests" className="text-[#5C4033]">
                    Special Requests (Optional)
                  </Label>
                  <Textarea
                    id="requests"
                    value={formData.requests}
                    onChange={(e) => setFormData({ ...formData, requests: e.target.value })}
                    className="mt-1"
                    placeholder="Dietary restrictions, seating preferences, etc."
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] font-semibold"
                >
                  Confirm Reservation
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Explore Our Menu</h2>
          <p className="text-[#5C4033]/70 mb-6 max-w-2xl mx-auto">
            Discover our full range of dishes and beverages
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/menu">
              <Button className="bg-[#5C4033] hover:bg-[#4A3329] text-white">
                View Menu
              </Button>
            </Link>
            <Link href="/restaurant">
              <Button variant="outline" className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white">
                About Our Restaurant
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

