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
import { Calendar, User, Mail, Phone, ArrowRight, Clock, Building2, Users, FileText, Info } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

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
  variant = "full",
  defaultSpaceType = "",
  spaceTypeOptions
}: BookingFormProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    spaceType: defaultSpaceType,
    startDate: "",
    startTime: "",
    paymentPlan: "",
    numberOfPeople: "1",
    purpose: "",
    specialRequests: "",
  });

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
  const isSelectedDateToday = (date: string) => {
    return date === getTodayDate();
  };

  // Get minimum time based on selected date
  const getMinTime = (date: string) => {
    return isSelectedDateToday(date) ? getCurrentTime() : undefined;
  };

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || !formData.spaceType || 
          !formData.startDate || !formData.startTime || !formData.paymentPlan) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Calculate start and end datetime
      const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
      let endDateTime = new Date(startDateTime);
      
      // Calculate end time based on payment plan
      const pricing = spacePricing[formData.spaceType];
      if (formData.paymentPlan === 'hourly' && pricing?.hourly) {
        endDateTime.setHours(endDateTime.getHours() + 1);
      } else if (formData.paymentPlan === 'halfday' && pricing?.halfDay) {
        endDateTime.setHours(endDateTime.getHours() + 4);
      } else if (formData.paymentPlan === 'daily' && pricing?.daily) {
        endDateTime.setHours(endDateTime.getHours() + 8);
      } else if (formData.paymentPlan === 'weekly' && pricing?.weekly) {
        endDateTime.setDate(endDateTime.getDate() + 7);
      } else if (formData.paymentPlan === 'monthly' && pricing?.monthly) {
        endDateTime.setMonth(endDateTime.getMonth() + 1);
      } else {
        endDateTime.setHours(endDateTime.getHours() + 1); // Default 1 hour
      }

      // Calculate total amount based on payment plan
      let totalAmount = 0;
      if (pricing) {
        if (formData.paymentPlan === 'hourly' && pricing.hourly) {
          totalAmount = pricing.hourly;
        } else if (formData.paymentPlan === 'halfday' && pricing.halfDay) {
          totalAmount = pricing.halfDay;
        } else if (formData.paymentPlan === 'daily' && pricing.daily) {
          totalAmount = pricing.daily;
        } else if (formData.paymentPlan === 'weekly' && pricing.weekly) {
          totalAmount = pricing.weekly;
        } else if (formData.paymentPlan === 'monthly' && pricing.monthly) {
          totalAmount = pricing.monthly;
        }
      }

      // Step 1: Create or find customer
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });

      if (!customerResponse.ok) {
        throw new Error('Failed to create customer');
      }

      const customerData = await customerResponse.json();
      const customerId = customerData.customer?.id || customerData.id;

      // Step 2: Find or create space
      const spaceResponse = await fetch('/api/spaces?type=' + encodeURIComponent(formData.spaceType));
      let spaceId = null;
      
      if (spaceResponse.ok) {
        const spaces = await spaceResponse.json();
        if (spaces && spaces.length > 0) {
          spaceId = spaces[0].id;
        }
      }

      // If no space found, create a default one
      if (!spaceId) {
        const createSpaceResponse = await fetch('/api/spaces', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.spaceType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            type: formData.spaceType,
            capacity: parseInt(formData.numberOfPeople) || 10,
            status: 'active',
          }),
        });
        
        if (createSpaceResponse.ok) {
          const spaceData = await createSpaceResponse.json();
          spaceId = spaceData.id || spaceData.space?.id;
        } else {
          // Use a fallback UUID if space creation fails
          spaceId = '00000000-0000-0000-0000-000000000001';
        }
      }

      // Step 3: Create booking
      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space_id: spaceId,
          customer_id: customerId,
          start_datetime: startDateTime.toISOString(),
          end_datetime: endDateTime.toISOString(),
          number_of_people: parseInt(formData.numberOfPeople) || 1,
          purpose: formData.purpose || null,
          special_requests: formData.specialRequests || null,
          status: 'pending',
          total_amount: totalAmount,
          booking_type: 'online',
        }),
      });

      if (!bookingResponse.ok) {
        const errorData = await bookingResponse.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }

      const bookingData = await bookingResponse.json();
      
      toast.success(
        "Booking request submitted successfully! We'll send you a confirmation email shortly."
      );
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        spaceType: defaultSpaceType,
        startDate: "",
        startTime: "",
        paymentPlan: "",
        numberOfPeople: "1",
        purpose: "",
        specialRequests: "",
      });
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || "Failed to submit booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isHero = variant === "hero";

  if (isHero) {
    // Hero variant - simplified for hero sections
    return (
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-6xl rounded-3xl shadow-2xl p-8 md:p-12 bg-white/10 backdrop-blur-xl border border-white/20"
        style={{
          background: 'rgba(255, 255, 255, 0.08)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
          <div>
            <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              Space Type
            </label>
            <Select
              value={formData.spaceType}
              onValueChange={(value) => setFormData({ ...formData, spaceType: value, paymentPlan: '' })}
            >
              <SelectTrigger className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl">
                <SelectValue placeholder="Select workspace" />
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
          <div>
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Calendar className="w-4 h-4" />
              Date
            </label>
            <Input
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              min={getTodayDate()}
              required
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              <Clock className="w-4 h-4" />
              Time
            </label>
            <Input
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              min={getMinTime(formData.startDate)}
              required
              className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs text-[#D4AF37] mb-2 uppercase tracking-wider font-semibold">
              Payment Plan
            </label>
            <Select
              value={formData.paymentPlan}
              onValueChange={(value) => setFormData({ ...formData, paymentPlan: value })}
              disabled={!formData.spaceType || priceOptions.length === 0}
            >
              <SelectTrigger className="h-12 bg-white/20 backdrop-blur-sm border-white/30 text-gray-800 focus:bg-white/30 focus:border-white/50 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
                <SelectValue placeholder={formData.spaceType ? "Select plan" : "Select space type first"} />
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
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 bg-[#D4AF37] hover:bg-[#C5A028] text-[#5C4033] font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Book Now"}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </form>
    );
  }

  // Full variant - Professional elegant layout matching the image design
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl shadow-xl border border-[#D4AF37]/20 overflow-hidden"
      data-api="bookings"
    >
      {/* Form Header */}
      <div className="bg-gradient-to-r from-[#5C4033] to-[#4A3329] p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white">Book Your Space</h3>
            <p className="text-white/80 text-sm mt-1">Complete the form below to submit your booking request</p>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10 space-y-8">
        {/* Section 1: Your Information */}
        <div className="space-y-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <User className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-bold text-[#5C4033]">Your Information</h4>
          </div>
          
          <div>
            <Label htmlFor="full-name" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="full-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
              placeholder="John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="full-email" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full-email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <Label htmlFor="full-phone" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                Phone Number <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
                placeholder="+254 712 345 678"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="full-company" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Company <span className="text-[#5C4033]/50 font-normal text-xs">(Optional)</span>
            </Label>
            <Input
              id="full-company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
              placeholder="Your Company Ltd"
            />
          </div>
        </div>

        {/* Section 2: Choose Your Space */}
        <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-bold text-[#5C4033]">Choose Your Space</h4>
          </div>
          
          <div>
            <Label htmlFor="full-spaceType" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Space <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.spaceType}
              onValueChange={(value) => setFormData({ ...formData, spaceType: value })}
            >
              <SelectTrigger
                id="full-spaceType"
                className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl bg-[#FFFFF0]/50 text-base"
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
        </div>

        {/* Section 3: When Do You Need It? */}
        <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-bold text-[#5C4033]">When Do You Need It?</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="start-date" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="start-date"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  min={getTodayDate()}
                  required
                  className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all pr-12"
                />
                <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40 pointer-events-none" />
              </div>
            </div>

            <div>
              <Label htmlFor="start-time" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                Start Time <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="start-time"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  min={getMinTime(formData.startDate)}
                  required
                  className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all pr-12"
                />
                <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40 pointer-events-none" />
              </div>
            </div>

          </div>
        </div>

        {/* Section 4: Additional Details */}
        <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <h4 className="text-lg font-bold text-[#5C4033]">Additional Details</h4>
          </div>
          
          <div>
            <Label htmlFor="number-of-people" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Number of People <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="number-of-people"
                type="number"
                min="1"
                value={formData.numberOfPeople}
                onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                required
                className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all pr-12"
              />
              <Users className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40 pointer-events-none" />
            </div>
          </div>

          <div>
            <Label htmlFor="purpose" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Purpose <span className="text-[#5C4033]/50 font-normal text-xs">(Optional)</span>
            </Label>
            <Input
              id="purpose"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
              placeholder="e.g. Team meeting, Workshop, Client presentation"
            />
          </div>

          <div>
            <Label htmlFor="special-requests" className="text-[#5C4033] font-semibold text-sm mb-2 block">
              Special Requests <span className="text-[#5C4033]/50 font-normal text-xs">(Optional)</span>
            </Label>
            <Textarea
              id="special-requests"
              value={formData.specialRequests}
              onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
              className="border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl resize-none text-base bg-[#FFFFF0]/50 transition-all min-h-[100px]"
              placeholder="Any special requirements? We'll do our best to accommodate...."
              rows={4}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-[#D4AF37]/20">
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  company: "",
                  spaceType: defaultSpaceType,
                  startDate: "",
                  startTime: "",
                  paymentPlan: "",
                  numberOfPeople: "1",
                  purpose: "",
                  specialRequests: "",
                });
              }}
              className="h-14 px-8 border-2 border-[#D4AF37] text-[#5C4033] hover:bg-[#D4AF37]/10 rounded-xl font-semibold transition-all"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-14 px-8 bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#B8941F] hover:from-[#C5A028] hover:via-[#B8941F] hover:to-[#9A7A1A] text-[#5C4033] text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? "Submitting..." : "Submit Booking Request"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

