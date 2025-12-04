'use client'

import { useState } from "react";
import { Calendar, Clock, Users, Mail, Phone, User, Building2 } from "lucide-react";
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
    space: "",
    notes: "",
  });

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API route for meeting room booking
    console.log("Meeting room booking:", formData);
    
    toast.success("Booking request submitted successfully! We'll send you a confirmation email.");
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      attendees: "",
      space: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Get Started" }, { name: "Book Meeting Room" }]} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">Book Your Meeting Room</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Reserve a professional meeting room or boardroom for your next business meeting or presentation.
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
                      <SelectItem value="1-5">1-5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="11-15">11-15 people</SelectItem>
                      <SelectItem value="16-20">16-20 people</SelectItem>
                      <SelectItem value="20+">20+ people</SelectItem>
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
                  <Label htmlFor="space" className="text-[#5C4033]">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Select Meeting Room
                  </Label>
                  <Select
                    value={formData.space}
                    onValueChange={(value) => setFormData({ ...formData, space: value })}
                  >
                    <SelectTrigger id="space" className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]">
                      <SelectValue placeholder="Select space type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="executive-boardroom">Executive Boardroom</SelectItem>
                      <SelectItem value="meeting-room-large">Meeting Room - Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="notes" className="text-[#5C4033]">
                    Additional Notes or Special Requirements
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                    rows={4}
                    placeholder="Any special requirements for your meeting..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] py-6 text-lg"
              >
                Submit Booking Request
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-[#5C4033]/70">
              <p>Have questions? Call us at <span className="text-[#D4AF37] font-semibold">+254 745 319 042</span> or WhatsApp us anytime.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
