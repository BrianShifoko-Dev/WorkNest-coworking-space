'use client'

import { useState } from "react";
import { Calendar, Clock, Users, Mail, Phone, User } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export function BookTourClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    attendees: "",
    interests: "",
    notes: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API route at /api/tour
    console.log("Tour booking:", formData);
    
    toast.success("Tour booked successfully! We'll send you a confirmation email.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      attendees: "",
      interests: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Get Started" }, { name: "Book a Tour" }]} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">Book Your Workspace Tour</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Experience our Eldoret coworking spaces firsthand. Schedule a personalized tour with our team.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg border border-[#5C4033]/10">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[#5C4033]">
                    <User className="w-4 h-4 inline mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#5C4033]">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#5C4033]">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>

                <div>
                  <Label htmlFor="attendees" className="text-[#5C4033]">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Attendees
                  </Label>
                  <Select
                    value={formData.attendees}
                    onValueChange={(value) => setFormData({ ...formData, attendees: value })}
                  >
                    <SelectTrigger id="attendees" className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Just me</SelectItem>
                      <SelectItem value="2-3">2-3 people</SelectItem>
                      <SelectItem value="4-5">4-5 people</SelectItem>
                      <SelectItem value="6+">6+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="date" className="text-[#5C4033]">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Preferred Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={getTodayDate()}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-[#5C4033]">
                    <Clock className="w-4 h-4 inline mr-2" />
                    Preferred Time
                  </Label>
                  <Select
                    value={formData.time}
                    onValueChange={(value) => setFormData({ ...formData, time: value })}
                  >
                    <SelectTrigger id="time" className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="11:00">11:00 AM</SelectItem>
                      <SelectItem value="12:00">12:00 PM</SelectItem>
                      <SelectItem value="14:00">2:00 PM</SelectItem>
                      <SelectItem value="15:00">3:00 PM</SelectItem>
                      <SelectItem value="16:00">4:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="interests" className="text-[#5C4033]">
                    What spaces are you interested in?
                  </Label>
                  <Select
                    value={formData.interests}
                    onValueChange={(value) => setFormData({ ...formData, interests: value })}
                  >
                    <SelectTrigger id="interests" className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]">
                      <SelectValue placeholder="Select space type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private-office">Private Office</SelectItem>
                      <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                      <SelectItem value="hot-desk">Hot Desk</SelectItem>
                      <SelectItem value="meeting-rooms">Meeting Rooms</SelectItem>
                      <SelectItem value="event-space">Event Space</SelectItem>
                      <SelectItem value="all">See Everything</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes" className="text-[#5C4033]">
                    Additional Notes or Questions
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                    rows={4}
                    placeholder="Tell us about your workspace needs..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] py-6 text-lg"
              >
                Schedule My Tour
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-[#5C4033]/70">
              <p>Have questions? Call us at <span className="text-[#D4AF37] font-semibold">+254 XXX XXX XXX</span> or WhatsApp us anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">What to Expect on Your Tour</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-[#D4AF37] font-bold">1</span>
                </div>
                <h4 className="text-[#5C4033] mb-2 font-semibold">Meet Your Guide</h4>
                <p className="text-sm text-[#5C4033]/70">A friendly team member will greet you and learn about your needs</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-[#D4AF37] font-bold">2</span>
                </div>
                <h4 className="text-[#5C4033] mb-2 font-semibold">Explore the Space</h4>
                <p className="text-sm text-[#5C4033]/70">Tour our offices, meeting rooms, and amenities at your pace</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-[#D4AF37] font-bold">3</span>
                </div>
                <h4 className="text-[#5C4033] mb-2 font-semibold">Find Your Fit</h4>
                <p className="text-sm text-[#5C4033]/70">Discuss membership options and get answers to all your questions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

