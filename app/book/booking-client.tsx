'use client'

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { Breadcrumbs } from '@/components/site/Breadcrumbs'
import { Calendar, Clock, Users, CheckCircle, Loader2, Building2, User, Mail, Phone, FileText, ArrowRight, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/components/providers/LanguageProvider'

interface Space {
  id: string
  name: string
  type: string
  description: string
  capacity: number | null
  hourly_rate: number | null
  daily_rate: number | null
  weekly_rate: number | null
  monthly_rate: number | null
  images: string[] | string
  status: string
}

export function BookingClient() {
  const { t } = useLanguage();
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loadingSpaces, setLoadingSpaces] = useState(true)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [receiptNumber, setReceiptNumber] = useState('')

  const [formData, setFormData] = useState({
    // Customer info
    full_name: '',
    email: '',
    phone: '',
    company: '',

    // Booking info
    space_id: '',
    pricing_package: '', // hourly, halfday, daily, weekly, monthly
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    number_of_people: '1',
    purpose: '',
    special_requests: '',
  })

  useEffect(() => {
    fetchSpaces()
  }, [])

  // Pre-select space from URL parameter
  useEffect(() => {
    if (spaces.length > 0 && !formData.space_id) {
      const spaceParam = searchParams.get('space')
      if (spaceParam) {
        // Map URL space names to actual space names/types
        const spaceNameMap: Record<string, string[]> = {
          'hot-desk': ['Hot Desk', 'hot-desk'],
          'dedicated-desk': ['Dedicated Desk', 'dedicated-desk'],
          '1-person-private-office': ['1-Person Private Office', 'office-1-person'],
          '2-person-private-office': ['2-Person Private Office', 'office-2-person'],
        }
        
        const normalizedParam = spaceParam.toLowerCase().trim()
        const mappedNames = spaceNameMap[normalizedParam] || [spaceParam]
        
        // Try to find space by name or type
        const foundSpace = spaces.find(s => {
          const spaceNameLower = s.name.toLowerCase()
          const spaceTypeLower = s.type.toLowerCase()
          const paramLower = normalizedParam
          
          return (
            mappedNames.some(name => spaceNameLower === name.toLowerCase()) ||
            spaceTypeLower === paramLower ||
            spaceNameLower.replace(/\s+/g, '-') === paramLower ||
            spaceNameLower.replace(/\s+/g, '') === paramLower.replace(/-/g, '')
          )
        })
        
        if (foundSpace) {
          setFormData(prev => ({ ...prev, space_id: foundSpace.id }))
          toast.success(`Selected: ${foundSpace.name}`)
        }
      }
    }
  }, [spaces, searchParams])

  const fetchSpaces = async () => {
    setLoadingSpaces(true)
    try {
      console.log('🏢 Fetching available spaces...')
      const response = await fetch('/api/spaces')
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Spaces fetched:', data.length)
        
        if (Array.isArray(data)) {
          // Filter for active spaces and coming soon spaces (like Kids Zone)
          const activeSpaces = data.filter((s: Space) => 
            s.status === 'active' || s.status === 'coming-soon'
          )
          setSpaces(activeSpaces)
          
          if (activeSpaces.length === 0) {
            // If no spaces from DB, create fallback spaces
            setSpaces(getFallbackSpaces())
          }
        } else {
          setSpaces(getFallbackSpaces())
        }
      } else {
        console.error('❌ Failed to fetch spaces:', response.status)
        // Use fallback spaces if API fails
        setSpaces(getFallbackSpaces())
      }
    } catch (error) {
      console.error('❌ Error fetching spaces:', error)
      // Use fallback spaces if error
      setSpaces(getFallbackSpaces())
    } finally {
      setLoadingSpaces(false)
    }
  }

  // Fallback spaces if database is empty
  const getFallbackSpaces = (): Space[] => {
    return [
      {
        id: 'hot-desk-1',
        name: 'Hot Desk',
        type: 'hot-desk',
        description: 'Flexible workspace solution perfect for freelancers and remote workers',
        capacity: 1,
        hourly_rate: 180,
        daily_rate: 650,
        weekly_rate: 2500,
        monthly_rate: 8700,
        images: [],
        status: 'active',
      },
      {
        id: 'dedicated-desk-1',
        name: 'Dedicated Desk',
        type: 'dedicated-desk',
        description: 'Your own desk in a shared environment with personal storage',
        capacity: 1,
        hourly_rate: 250,
        daily_rate: 1000,
        weekly_rate: 5000,
        monthly_rate: 14000,
        images: [],
        status: 'active',
      },
      {
        id: 'office-1-person-1',
        name: '1-Person Private Office',
        type: 'office-1-person',
        description: 'Fully furnished private office for individuals',
        capacity: 1,
        hourly_rate: 350,
        daily_rate: 2500,
        weekly_rate: 6000,
        monthly_rate: 16000,
        images: [],
        status: 'active',
      },
      {
        id: 'office-2-person-1',
        name: '2-Person Private Office',
        type: 'office-2-person',
        description: 'Fully furnished private office for small teams',
        capacity: 2,
        hourly_rate: 550,
        daily_rate: 3000,
        weekly_rate: 8000,
        monthly_rate: 24000,
        images: [],
        status: 'active',
      },
      {
        id: 'meeting-room-1',
        name: 'Meeting Room',
        type: 'meeting-room',
        description: 'Professional meeting room for team collaboration',
        capacity: 10,
        hourly_rate: 1000,
        daily_rate: 7000,
        weekly_rate: null,
        monthly_rate: null,
        images: [],
        status: 'active',
      },
      {
        id: 'boardroom-1',
        name: 'Executive Boardroom',
        type: 'boardroom',
        description: 'Premium boardroom for executive meetings and presentations',
        capacity: 20,
        hourly_rate: 2500,
        daily_rate: 12000,
        weekly_rate: null,
        monthly_rate: null,
        images: [],
        status: 'active',
      },
      {
        id: 'call-pod-1',
        name: 'Call Pod',
        type: 'call-pod',
        description: 'Private soundproof pod for phone calls and video conferences',
        capacity: 1,
        hourly_rate: 250,
        daily_rate: 950,
        weekly_rate: 4500,
        monthly_rate: null,
        images: [],
        status: 'active',
      },
      {
        id: 'kids-zone-1',
        name: 'Kids Zone',
        type: 'kids-zone',
        description: 'Dedicated space for children while parents work',
        capacity: null,
        hourly_rate: null,
        daily_rate: null,
        weekly_rate: null,
        monthly_rate: null,
        images: [],
        status: 'coming-soon',
      },
    ]
  }

  // Get pricing options for selected space
  const pricingOptions = useMemo(() => {
    if (!formData.space_id) return []
    
    const selectedSpace = spaces.find(s => s.id === formData.space_id)
    if (!selectedSpace) return []

    const options: Array<{ value: string; label: string; rate: number }> = []
    
    if (selectedSpace.hourly_rate) {
      options.push({ 
        value: 'hourly', 
        label: `Hourly - KES ${selectedSpace.hourly_rate.toLocaleString()}/hour`,
        rate: selectedSpace.hourly_rate
      })
    }
    
    if (selectedSpace.daily_rate) {
      // Half day (4 hours)
      const halfDayRate = selectedSpace.hourly_rate 
        ? Math.round(selectedSpace.hourly_rate * 4)
        : Math.round(selectedSpace.daily_rate * 0.5)
      options.push({ 
        value: 'halfday', 
        label: `Half Day (4 hours) - KES ${halfDayRate.toLocaleString()}`,
        rate: halfDayRate
      })
      
      // Full day
      options.push({ 
        value: 'daily', 
        label: `Full Day - KES ${selectedSpace.daily_rate.toLocaleString()}/day`,
        rate: selectedSpace.daily_rate
      })
    }
    
    if (selectedSpace.weekly_rate) {
      options.push({ 
        value: 'weekly', 
        label: `Weekly - KES ${selectedSpace.weekly_rate.toLocaleString()}/week`,
        rate: selectedSpace.weekly_rate
      })
    }
    
    if (selectedSpace.monthly_rate) {
      options.push({ 
        value: 'monthly', 
        label: `Monthly - KES ${selectedSpace.monthly_rate.toLocaleString()}/month`,
        rate: selectedSpace.monthly_rate
      })
    }

    return options
  }, [formData.space_id, spaces])

  // Calculate end date/time based on pricing package
  const calculateEndDateTime = (startDate: string, startTime: string, packageType: string) => {
    if (!startDate || !startTime || !packageType) return { endDate: '', endTime: '' }

    const start = new Date(`${startDate}T${startTime}`)
    const end = new Date(start)

    switch (packageType) {
      case 'hourly':
        end.setHours(end.getHours() + 1)
        break
      case 'halfday':
        end.setHours(end.getHours() + 4)
        break
      case 'daily':
        end.setHours(end.getHours() + 8)
        break
      case 'weekly':
        end.setDate(end.getDate() + 7)
        break
      case 'monthly':
        end.setMonth(end.getMonth() + 1)
        break
      default:
        end.setHours(end.getHours() + 1)
    }

    const endDate = end.toISOString().split('T')[0]
    const endTime = end.toTimeString().slice(0, 5)

    return { endDate, endTime }
  }

  // Update end date/time when package or start date/time changes
  useEffect(() => {
    if (formData.pricing_package && formData.start_date && formData.start_time) {
      const { endDate, endTime } = calculateEndDateTime(
        formData.start_date,
        formData.start_time,
        formData.pricing_package
      )
      setFormData(prev => ({
        ...prev,
        end_date: endDate,
        end_time: endTime,
      }))
    }
  }, [formData.pricing_package, formData.start_date, formData.start_time])

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Get current time in HH:MM format
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.full_name || !formData.email || !formData.phone || !formData.space_id || 
        !formData.pricing_package || !formData.start_date || !formData.start_time) {
      toast.error('Please fill in all required fields')
      return
    }

    // Calculate end datetime if not set
    let endDate = formData.end_date
    let endTime = formData.end_time
    
    if (!endDate || !endTime) {
      const calculated = calculateEndDateTime(formData.start_date, formData.start_time, formData.pricing_package)
      endDate = calculated.endDate
      endTime = calculated.endTime
    }

    const startDateTime = new Date(`${formData.start_date}T${formData.start_time}`)
    const endDateTime = new Date(`${endDate}T${endTime}`)
    
    if (endDateTime <= startDateTime) {
      toast.error('End date and time must be after start date and time')
      return
    }

    setLoading(true)

    try {
      // Step 1: Create or find customer
      const customerResponse = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          full_name: formData.full_name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company || null,
        }),
      })

      const customerData = await customerResponse.json()

      if (!customerResponse.ok) {
        toast.error('Error processing your information')
        return
      }

      const customerId = customerData.customer?.id || customerData.id

      // Step 2: Get total amount from selected pricing package
      const selectedPackage = pricingOptions.find(p => p.value === formData.pricing_package)
      const totalAmount = selectedPackage?.rate || 0

      // Step 3: Create booking
      const startDatetime = `${formData.start_date}T${formData.start_time}:00`
      const endDatetime = `${endDate}T${endTime}:00`

      const bookingResponse = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space_id: formData.space_id,
          customer_id: customerId,
          start_datetime: startDatetime,
          end_datetime: endDatetime,
          number_of_people: parseInt(formData.number_of_people),
          purpose: formData.purpose || null,
          special_requests: formData.special_requests || null,
          total_amount: totalAmount,
          status: 'pending',
          booking_type: 'online',
        }),
      })

      if (bookingResponse.ok) {
        const booking = await bookingResponse.json()
        setReceiptNumber(booking.receipt_number || booking.booking?.receipt_number)
        setBookingSuccess(true)
        toast.success('Booking request submitted successfully! Check your email for confirmation.')
      } else {
        const error = await bookingResponse.json()
        toast.error(error.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error submitting booking')
    } finally {
      setLoading(false)
    }
  }

  const selectedSpace = spaces.find(s => s.id === formData.space_id)

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-[#FFFFF0]">
        <Breadcrumbs items={[{ name: 'Book a Space' }, { name: 'Success' }]} />

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-12 text-center border border-[#D4AF37]/20">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-bold text-[#5C4033] mb-4 font-playfair">Booking Request Submitted!</h1>
            <p className="text-xl text-[#5C4033]/70 mb-8">
              Thank you for your booking request. We'll send you a confirmation email shortly.
            </p>

            {receiptNumber && (
              <div className="bg-[#FFFFF0] border-2 border-[#D4AF37] rounded-xl p-6 mb-8">
                <div className="text-sm text-[#5C4033]/60 mb-2">Your Receipt Number</div>
                <div className="text-3xl font-bold text-[#D4AF37] font-mono">{receiptNumber}</div>
                <div className="text-sm text-[#5C4033]/60 mt-2">Please keep this for your records</div>
              </div>
            )}

            <div className="space-y-4 text-left mb-8">
              <h3 className="text-lg font-semibold text-[#5C4033] border-b border-[#D4AF37]/20 pb-2">
                What's Next?
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#D4AF37] font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#5C4033]">Confirmation Email</div>
                    <div className="text-sm text-[#5C4033]/70">
                      You'll receive a confirmation email at <span className="font-semibold">{formData.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#D4AF37] font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#5C4033]">Our Team Will Contact You</div>
                    <div className="text-sm text-[#5C4033]/70">
                      We'll call you at <span className="font-semibold">{formData.phone}</span> to confirm details and payment
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#D4AF37] font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#5C4033]">Make Payment</div>
                    <div className="text-sm text-[#5C4033]/70">
                      Complete payment to secure your booking
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#D4AF37] font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[#5C4033]">Enjoy Your Space!</div>
                    <div className="text-sm text-[#5C4033]/70">
                      Arrive on your booking date and enjoy WorkNest
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/" className="flex-1">
                <Button className="w-full bg-white border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10">
                  Back to Home
                </Button>
              </Link>
              <Link href="/book" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white">
                  Make Another Booking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: 'Book a Space' }]} />

      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="/gallery/IMG_0975.jpg"
          alt="Book Your Space"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl mb-4 font-playfair">Book Your Space</h1>
            <p className="text-xl max-w-2xl mx-auto">
              Reserve your perfect workspace at WorkNest Eldoret
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl border border-[#D4AF37]/20 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#5C4033] to-[#4A3329] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-white">Book Your Space</h2>
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
                    <h3 className="text-lg font-bold text-[#5C4033]">Your Information</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="full_name" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                      className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="email" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                        Email Address <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                        Phone Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="phone"
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
                    <Label htmlFor="company" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Company <span className="text-[#5C4033]/50 font-normal text-xs">(Optional)</span>
                    </Label>
                    <Input
                      id="company"
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
                    <h3 className="text-lg font-bold text-[#5C4033]">Choose Your Space</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="space_id" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Space <span className="text-red-500">*</span>
                    </Label>
                    
                    {loadingSpaces ? (
                      <div className="h-14 border border-[#D4AF37]/30 rounded-xl flex items-center justify-center bg-[#FFFFF0]/50">
                        <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37] mr-2" />
                        <span className="text-[#5C4033]/60">Loading spaces...</span>
                      </div>
                    ) : (
                      <Select
                        value={formData.space_id}
                        onValueChange={(value) => {
                          setFormData({ 
                            ...formData, 
                            space_id: value,
                            pricing_package: '' // Reset pricing package when space changes
                          })
                        }}
                      >
                        <SelectTrigger className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl bg-[#FFFFF0]/50 text-base">
                          <SelectValue placeholder="Select your preferred workspace" />
                        </SelectTrigger>
                        <SelectContent className="bg-white max-h-[300px]">
                          {spaces.map((space) => (
                            <SelectItem key={space.id} value={space.id}>
                              <div className="flex items-center gap-2 w-full">
                                <div className="font-semibold text-[#5C4033]">{space.name}</div>
                                {space.type === 'kids-zone' ? (
                                  <span className="text-xs text-[#D4AF37] font-semibold">
                                    Coming Soon
                                  </span>
                                ) : space.capacity ? (
                                  <span className="text-xs text-[#5C4033]/60">
                                    Capacity: {space.capacity} {space.capacity === 1 ? 'person' : 'people'}
                                  </span>
                                ) : null}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {selectedSpace && (
                      <div className="mt-4 p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-xl">
                        <div className="text-sm text-[#5C4033]/70 mb-2">Selected Space Details:</div>
                        <div className="font-semibold text-[#5C4033]">{selectedSpace.name}</div>
                        {selectedSpace.type === 'kids-zone' ? (
                          <div className="text-sm text-[#D4AF37] font-semibold mt-1">Coming Soon</div>
                        ) : selectedSpace.capacity ? (
                          <div className="text-sm text-[#5C4033]/70">Capacity: {selectedSpace.capacity} {selectedSpace.capacity === 1 ? 'person' : 'people'}</div>
                        ) : null}
                        {selectedSpace.description && (
                          <div className="text-sm text-[#5C4033]/70 mt-2">{selectedSpace.description}</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Pricing Package Selection */}
                  {formData.space_id && pricingOptions.length > 0 && (
                    <div>
                      <Label htmlFor="pricing_package" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                        Pricing Package <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.pricing_package}
                        onValueChange={(value) => setFormData({ ...formData, pricing_package: value })}
                      >
                        <SelectTrigger className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl bg-[#FFFFF0]/50 text-base">
                          <SelectValue placeholder="Select a pricing package" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {pricingOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                                <span>{option.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Section 3: When Do You Need It? */}
                <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#5C4033]">When Do You Need It?</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <Label htmlFor="start_date" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                        Start Date <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="start_date"
                          type="date"
                          value={formData.start_date}
                          onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                          required
                          min={getTodayDate()}
                          className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all pr-12"
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40 pointer-events-none" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="start_time" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                        Start Time <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="start_time"
                          type="time"
                          value={formData.start_time}
                          onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                          required
                          min={getMinTime(formData.start_date)}
                          className="h-14 border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all pr-12"
                        />
                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5C4033]/40 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  {formData.pricing_package && (
                    <p className="text-xs text-[#5C4033]/60 italic">
                      End date and time are automatically calculated based on your selected pricing package.
                    </p>
                  )}
                </div>

                {/* Section 4: Additional Details */}
                <div className="space-y-5 pt-6 border-t border-[#D4AF37]/20">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#5C4033]">Additional Details</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="number_of_people" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Number of People <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="number_of_people"
                        type="number"
                        min="1"
                        max={selectedSpace?.capacity || 100}
                        value={formData.number_of_people}
                        onChange={(e) => setFormData({ ...formData, number_of_people: e.target.value })}
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
                    <Label htmlFor="special_requests" className="text-[#5C4033] font-semibold text-sm mb-2 block">
                      Special Requests <span className="text-[#5C4033]/50 font-normal text-xs">(Optional)</span>
                    </Label>
                    <Textarea
                      id="special_requests"
                      value={formData.special_requests}
                      onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                      rows={4}
                      className="border-[#5C4033]/20 focus:border-[#D4AF37] rounded-xl text-base bg-[#FFFFF0]/50 transition-all resize-none min-h-[100px]"
                      placeholder="Any special requirements? We'll do our best to accommodate...."
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
                          full_name: '',
                          email: '',
                          phone: '',
                          company: '',
                          space_id: '',
                          pricing_package: '',
                          start_date: '',
                          start_time: '',
                          end_date: '',
                          end_time: '',
                          number_of_people: '1',
                          purpose: '',
                          special_requests: '',
                        });
                      }}
                      className="h-14 px-8 border-2 border-[#D4AF37] text-[#5C4033] hover:bg-[#D4AF37]/10 rounded-xl font-semibold transition-all"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="h-14 px-8 bg-gradient-to-r from-[#D4AF37] via-[#C5A028] to-[#B8941F] hover:from-[#C5A028] hover:via-[#B8941F] hover:to-[#9A7A1A] text-[#5C4033] text-base font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>{loading ? "Submitting..." : "Submit Booking Request"}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
