'use client'

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Calendar, User, Mail, Phone, ArrowRight, Clock } from "lucide-react";

interface BookingFormProps {
  variant?: "hero" | "full";
  defaultSpaceType?: string;
  spaceTypeOptions?: Array<{ value: string; label: string }>;
}

// Pricing data for different space types
const spacePricing: Record<string, { hourly?: number; halfDay?: number; daily?: number; weekly?: number; monthly?: number }> = {
  'hot-desk': {
    hourly: 180,
    halfDay: 450,
    daily: 650,
    weekly: 2500,
    monthly: 8700,
  },
  'dedicated-desk': {
    hourly: 250,
    halfDay: 600,
    daily: 1000,
    weekly: 5000,
    monthly: 14000,
  },
  'office-1-person': {
    hourly: 350,
    halfDay: 1000,
    daily: 2500,
    weekly: 6000,
    monthly: 16000,
  },
  'office-2-person': {
    hourly: 550,
    halfDay: 1500,
    daily: 3000,
    weekly: 8000,
    monthly: 24000,
  },
  'meeting-room': {
    hourly: 1000,
    halfDay: 4000,
    daily: 7000,
  },
  'boardroom': {
    hourly: 2500,
    halfDay: 6000,
    daily: 12000,
  },
  'call-pod': {
    hourly: 250,
    halfDay: 600,
    daily: 950,
    weekly: 4500,
  },
}

export function BookingForm({ 
  variant = "hero",
  defaultSpaceType = "",
  spaceTypeOptions
}: BookingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    spaceType: defaultSpaceType,
    date: "",
    time: "",
    duration: "",
    paymentPlan: "",
    additionalRequests: "",
  });

  // Get pricing options based on selected space type
  const priceOptions = useMemo(() => {
    if (!formData.spaceType) return [];
    
    const pricing = spacePricing[formData.spaceType];
    if (!pricing) return [];
    
    const options: Array<{ value: string; label: string }> = [];
    
    if (pricing.hourly) {
      options.push({ value: 'hourly', label: `Hourly - KES ${pricing.hourly.toLocaleString()}` });
    }
    if (pricing.halfDay) {
      options.push({ value: 'halfday', label: `Half Day - KES ${pricing.halfDay.toLocaleString()}` });
    }
    if (pricing.daily) {
      options.push({ value: 'daily', label: `Full Day - KES ${pricing.daily.toLocaleString()}` });
    }
    if (pricing.weekly) {
      options.push({ value: 'weekly', label: `Weekly - KES ${pricing.weekly.toLocaleString()}` });
    }
    if (pricing.monthly) {
      options.push({ value: 'monthly', label: `Monthly - KES ${pricing.monthly.toLocaleString()}` });
    }
    
    return options;
  }, [formData.spaceType]);

  // Get today's date in YYYY-MM-DD format for min date
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get current time in HH:MM format for min time
  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  // Check if selected date is today
  const isSelectedDateToday = () => {
    return formData.date === getTodayDate();
  };

  // Get minimum time based on selected date
  const getMinTime = () => {
    return isSelectedDateToday() ? getCurrentTime() : undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Implement API route for bookings at /api/bookings
    console.log("Booking submitted:", formData);
    
    toast.success(
      "Booking request submitted! Our team will contact you shortly."
    );
    
    setFormData({
      name: "",
      email: "",
      phone: "",
      spaceType: "",
      date: "",
      time: "",
      duration: "",
      paymentPlan: "",
      additionalRequests: "",
    });
  };

  const isHero = variant === "hero";

  if (isHero) {
    // Hero variant with frosted glass glassmorphism effect
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl rounded-3xl shadow-2xl p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
        data-api="bookings"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <User className="w-4 h-4" />
              Full Name
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Enter your name"
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="your@email.com"
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Phone className="w-4 h-4" />
              Phone
            </label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              placeholder="+254 7XX XXX XXX"
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 placeholder:text-gray-500 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Space Type */}
          <div className="md:col-span-1">
            <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              Space Type
            </label>
            <Select
              value={formData.spaceType}
              onValueChange={(value) => setFormData({ ...formData, spaceType: value })}
            >
              <SelectTrigger className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl">
                <SelectValue placeholder="Select worksp" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypeOptions ? (
                  spaceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="hot-desk">Hot Desk</SelectItem>
                    <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                    <SelectItem value="office-1-person">1-Person Private Office</SelectItem>
                    <SelectItem value="office-2-person">2-Person Private Office</SelectItem>
                    <SelectItem value="meeting-room">Meeting Room</SelectItem>
                    <SelectItem value="boardroom">Executive Boardroom</SelectItem>
                    <SelectItem value="call-pod">Call Pod</SelectItem>
                    <SelectItem value="event-space">Event Space</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="md:col-span-1">
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Calendar className="w-4 h-4" />
              Start Date
            </label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={getTodayDate()}
              required
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>

          {/* Time */}
          <div className="md:col-span-1">
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Clock className="w-4 h-4" />
              Time
            </label>
            <Input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              min={getMinTime()}
              required
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>

          {/* Payment Plan */}
          <div className="md:col-span-1">
            <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              Payment Plan
            </label>
            <Select
              value={formData.paymentPlan}
              onValueChange={(value) => setFormData({ ...formData, paymentPlan: value })}
              disabled={!formData.spaceType || priceOptions.length === 0}
            >
              <SelectTrigger className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl">
                <SelectValue placeholder={formData.spaceType ? "Select plan" : "Select space type first"} />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-1">
            <Button
              type="submit"
              className="w-full h-12 bg-[#D4AF37] hover:bg-[#C5A028] text-[#5C4033] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Book Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    );
  }

  // Full variant - Professional elegant layout
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl shadow-xl border border-[#D4AF37]/20 p-8 md:p-10"
      data-api="bookings"
    >
      {/* Form Header */}
      <div className="mb-8 pb-6 border-b border-[#D4AF37]/20">
        <h3 className="text-2xl font-bold text-[#5C4033] mb-2">Book Your Space</h3>
        <p className="text-[#5C4033]/60 text-sm">Fill in your details to reserve your perfect workspace</p>
      </div>

      <div className="space-y-7">
        {/* Personal Information Section */}
        <div className="space-y-5">
          <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Personal Information</h4>
          
          <div>
            <Label htmlFor="full-name" className="text-[#5C4033]/80 font-medium text-sm flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-[#D4AF37]" />
              FULL NAME
            </Label>
            <Input
              id="full-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/30 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="full-email" className="text-[#5C4033]/80 font-medium text-sm flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                EMAIL
              </Label>
              <Input
                id="full-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/30 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="full-phone" className="text-[#5C4033]/80 font-medium text-sm flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                PHONE
              </Label>
              <Input
                id="full-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/30 transition-all"
                placeholder="+254 712 345 678"
              />
            </div>
          </div>
        </div>

        {/* Booking Details Section */}
        <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
          <h4 className="text-sm font-bold text-[#D4AF37] uppercase tracking-wider mb-4">Booking Details</h4>
          
          <div>
            <Label htmlFor="full-spaceType" className="text-[#5C4033]/80 font-medium text-sm mb-2 block">
              SPACE TYPE
            </Label>
            <Select
              value={formData.spaceType}
              onValueChange={(value) => setFormData({ ...formData, spaceType: value })}
            >
              <SelectTrigger
                id="full-spaceType"
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl bg-[#FFFFF0]/30 text-base"
              >
                <SelectValue placeholder="Select your preferred workspace" />
              </SelectTrigger>
              <SelectContent>
                {spaceTypeOptions ? (
                  spaceTypeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <>
                    <SelectItem value="hot-desk">Hot Desk</SelectItem>
                    <SelectItem value="dedicated-desk">Dedicated Desk</SelectItem>
                    <SelectItem value="office-1-person">1-Person Private Office</SelectItem>
                    <SelectItem value="office-2-person">2-Person Private Office</SelectItem>
                    <SelectItem value="meeting-room">Meeting Room</SelectItem>
                    <SelectItem value="boardroom">Executive Boardroom</SelectItem>
                    <SelectItem value="call-pod">Call Pod</SelectItem>
                    <SelectItem value="event-space">Event Space</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="full-date" className="text-[#5C4033]/80 font-medium text-sm flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-[#D4AF37]" />
                START DATE
              </Label>
              <Input
                id="full-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                min={getTodayDate()}
                required
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/30 transition-all"
              />
            </div>

            <div>
              <Label htmlFor="full-time" className="text-[#5C4033]/80 font-medium text-sm flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                TIME
              </Label>
              <Input
                id="full-time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                min={getMinTime()}
                required
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/30 transition-all"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="full-paymentPlan" className="text-[#5C4033]/80 font-medium text-sm mb-2 block">
              PAYMENT PLAN
            </Label>
            <Select
              value={formData.paymentPlan}
              onValueChange={(value) => setFormData({ ...formData, paymentPlan: value })}
              disabled={!formData.spaceType || priceOptions.length === 0}
            >
              <SelectTrigger
                id="full-paymentPlan"
                className="h-14 border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl bg-[#FFFFF0]/30 text-base"
              >
                <SelectValue placeholder={formData.spaceType ? "Choose your payment plan" : "Please select space type first"} />
              </SelectTrigger>
              <SelectContent>
                {priceOptions.length > 0 ? (
                  priceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>
                    Select a space type first
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="full-additionalRequests" className="text-[#5C4033]/80 font-medium text-sm mb-2 block">
              ADDITIONAL NOTES <span className="text-[#5C4033]/40 font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="full-additionalRequests"
              value={formData.additionalRequests}
              onChange={(e) => setFormData({ ...formData, additionalRequests: e.target.value })}
              className="border-[#5C4033]/10 focus:border-[#D4AF37] rounded-xl resize-none text-base bg-[#FFFFF0]/30 transition-all"
              placeholder="Any special requirements, dietary preferences, or questions?"
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-16 bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#B8941F] hover:from-[#C5A028] hover:via-[#B8941F] hover:to-[#9A7A1A] text-[#5C4033] text-lg font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 group"
          >
            <span>Complete Booking</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-center text-xs text-[#5C4033]/50 mt-4">
            Secure booking • Instant confirmation • Flexible cancellation
          </p>
        </div>
      </div>
    </form>
  );
}

