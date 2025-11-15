'use client'

import { useState, useEffect } from 'react'
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
import { Calendar, Clock, Users, CheckCircle, AlertCircle, Loader2, Building2 } from 'lucide-react'
import Link from 'next/link'

interface Space {
  id: string
  name: string
  type: string
  description: string
  capacity: number
  hourly_rate: number
  daily_rate: number
  weekly_rate: number
  monthly_rate: number
  images: string[]
  status: string
}

export function BookingClient() {
  const [loading, setLoading] = useState(false)
  const [spaces, setSpaces] = useState<Space[]>([])
  const [loadingSpaces, setLoadingSpaces] = useState(true)
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'available' | 'unavailable'>('idle')
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

  const fetchSpaces = async () => {
    setLoadingSpaces(true)
    try {
      console.log('🏢 Fetching available spaces...')
      const response = await fetch('/api/spaces?status=available')
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Spaces fetched:', data.length)
        
        if (Array.isArray(data)) {
          const availableSpaces = data.filter((s: Space) => s.status === 'available')
          setSpaces(availableSpaces)
          
          if (availableSpaces.length === 0) {
            toast.info('No spaces available at the moment. Please check back later.')
          }
        } else {
          setSpaces([])
        }
      } else {
        console.error('❌ Failed to fetch spaces:', response.status)
        toast.error('Failed to load spaces. Please refresh the page.')
      }
    } catch (error) {
      console.error('❌ Error fetching spaces:', error)
      toast.error('Error loading spaces. Please check your connection.')
    } finally {
      setLoadingSpaces(false)
    }
  }

  const checkAvailability = async () => {
    if (!formData.space_id || !formData.start_date || !formData.start_time || !formData.end_date || !formData.end_time) {
      toast.error('Please select space, date, and time first')
      return
    }

    setCheckingAvailability(true)
    setAvailabilityStatus('idle')

    try {
      const startDatetime = `${formData.start_date}T${formData.start_time}:00`
      const endDatetime = `${formData.end_date}T${formData.end_time}:00`

      const response = await fetch('/api/bookings/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          space_id: formData.space_id,
          start_datetime: startDatetime,
          end_datetime: endDatetime,
        }),
      })

      const result = await response.json()

      if (result.available) {
        setAvailabilityStatus('available')
        toast.success('Space is available! You can proceed with booking.')
      } else {
        setAvailabilityStatus('unavailable')
        toast.error('Sorry, this space is not available for the selected time.')
      }
    } catch (error) {
      console.error('Error checking availability:', error)
      toast.error('Error checking availability')
    } finally {
      setCheckingAvailability(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (availabilityStatus !== 'available') {
      toast.error('Please check availability first')
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

      const customerId = customerData.customer.id

      // Step 2: Calculate total amount based on space rates
      const selectedSpace = spaces.find(s => s.id === formData.space_id)
      const totalAmount = selectedSpace?.daily_rate || selectedSpace?.hourly_rate || 0

      // Step 3: Create booking
      const startDatetime = `${formData.start_date}T${formData.start_time}:00`
      const endDatetime = `${formData.end_date}T${formData.end_time}:00`

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
          status: 'pending', // Online bookings start as pending
          booking_type: 'online',
        }),
      })

      if (bookingResponse.ok) {
        const booking = await bookingResponse.json()
        setReceiptNumber(booking.receipt_number)
        setBookingSuccess(true)
        toast.success('Booking request submitted successfully!')
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
              Thank you for your booking request. We'll confirm your reservation shortly.
            </p>

            <div className="bg-[#FFFFF0] border-2 border-[#D4AF37] rounded-xl p-6 mb-8">
              <div className="text-sm text-[#5C4033]/60 mb-2">Your Receipt Number</div>
              <div className="text-3xl font-bold text-[#D4AF37] font-mono">{receiptNumber}</div>
              <div className="text-sm text-[#5C4033]/60 mt-2">Please keep this for your records</div>
            </div>

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
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
          alt="Book Your Space"
          className="w-full h-full object-cover"
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
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Information */}
              <div className="bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#5C4033] mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6 text-[#D4AF37]" />
                  Your Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="full_name" className="text-[#5C4033]">Full Name *</Label>
                    <Input
                      id="full_name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-[#5C4033]">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-[#5C4033]">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="+254712345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="company" className="text-[#5C4033]">Company (Optional)</Label>
                    <Input
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="Your Company Ltd"
                    />
                  </div>
                </div>
              </div>

              {/* Space Selection */}
              <div className="bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#5C4033] mb-6 flex items-center gap-3">
                  <Building2 className="w-6 h-6 text-[#D4AF37]" />
                  Choose Your Space
                </h2>
                <div>
                  <Label htmlFor="space_id" className="text-[#5C4033]">Space *</Label>
                  
                  {loadingSpaces ? (
                    <div className="mt-2 h-12 border border-[#D4AF37]/30 rounded-lg flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37] mr-2" />
                      <span className="text-[#5C4033]/60">Loading spaces...</span>
                    </div>
                  ) : spaces.length === 0 ? (
                    <div className="mt-2 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                      <div className="flex items-center text-yellow-800">
                        <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" />
                        <div>
                          <div className="font-semibold">No spaces available</div>
                          <div className="text-sm">Please contact us or check back later.</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Select
                      value={formData.space_id}
                      onValueChange={(value) => {
                        setFormData({ ...formData, space_id: value })
                        setAvailabilityStatus('idle')
                      }}
                    >
                      <SelectTrigger className="mt-2 h-12 border-[#D4AF37]/30">
                        <SelectValue placeholder="Select a space" />
                      </SelectTrigger>
                      <SelectContent className="bg-white max-h-[300px]">
                        {spaces.map((space) => (
                          <SelectItem key={space.id} value={space.id}>
                            <div className="flex justify-between items-center w-full gap-4">
                              <div>
                                <div className="font-semibold">{space.name}</div>
                                <div className="text-xs text-[#5C4033]/60">
                                  Capacity: {space.capacity} people
                                </div>
                              </div>
                              <span className="text-[#D4AF37] font-semibold whitespace-nowrap">
                                {space.daily_rate && `KES ${space.daily_rate.toLocaleString()}/day`}
                                {!space.daily_rate && space.hourly_rate && `KES ${space.hourly_rate.toLocaleString()}/hour`}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {selectedSpace && (
                    <div className="mt-4 p-4 bg-white border border-[#D4AF37]/20 rounded-lg">
                      <div className="text-sm text-[#5C4033]/70 mb-2">Selected Space Details:</div>
                      <div className="font-semibold text-[#5C4033]">{selectedSpace.name}</div>
                      <div className="text-sm text-[#5C4033]/70">Capacity: {selectedSpace.capacity} people</div>
                      {selectedSpace.description && (
                        <div className="text-sm text-[#5C4033]/70 mt-2">{selectedSpace.description}</div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#5C4033] mb-6 flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-[#D4AF37]" />
                  When Do You Need It?
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="start_date" className="text-[#5C4033]">Start Date *</Label>
                    <Input
                      id="start_date"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => {
                        setFormData({ ...formData, start_date: e.target.value })
                        setAvailabilityStatus('idle')
                      }}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="start_time" className="text-[#5C4033]">Start Time *</Label>
                    <Input
                      id="start_time"
                      type="time"
                      value={formData.start_time}
                      onChange={(e) => {
                        setFormData({ ...formData, start_time: e.target.value })
                        setAvailabilityStatus('idle')
                      }}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_date" className="text-[#5C4033]">End Date *</Label>
                    <Input
                      id="end_date"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => {
                        setFormData({ ...formData, end_date: e.target.value })
                        setAvailabilityStatus('idle')
                      }}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      min={formData.start_date || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end_time" className="text-[#5C4033]">End Time *</Label>
                    <Input
                      id="end_time"
                      type="time"
                      value={formData.end_time}
                      onChange={(e) => {
                        setFormData({ ...formData, end_time: e.target.value })
                        setAvailabilityStatus('idle')
                      }}
                      required
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                {/* Availability Check */}
                <div className="mt-6">
                  <Button
                    type="button"
                    onClick={checkAvailability}
                    disabled={checkingAvailability}
                    className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white text-lg"
                  >
                    {checkingAvailability ? (
                      <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Checking Availability...</>
                    ) : (
                      <><Clock className="w-5 h-5 mr-2" />Check Availability</>
                    )}
                  </Button>

                  {availabilityStatus === 'available' && (
                    <div className="mt-4 p-4 bg-green-50 border-2 border-green-300 rounded-lg flex items-center text-green-800">
                      <CheckCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Space is available!</div>
                        <div className="text-sm">You can proceed with your booking.</div>
                      </div>
                    </div>
                  )}
                  {availabilityStatus === 'unavailable' && (
                    <div className="mt-4 p-4 bg-red-50 border-2 border-red-300 rounded-lg flex items-center text-red-800">
                      <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">Space is not available</div>
                        <div className="text-sm">Please choose a different time or space.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Additional Details */}
              <div className="bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-[#5C4033] mb-6">Additional Details</h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="number_of_people" className="text-[#5C4033]">Number of People *</Label>
                    <Input
                      id="number_of_people"
                      type="number"
                      value={formData.number_of_people}
                      onChange={(e) => setFormData({ ...formData, number_of_people: e.target.value })}
                      required
                      min="1"
                      max={selectedSpace?.capacity || 100}
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="purpose" className="text-[#5C4033]">Purpose (Optional)</Label>
                    <Input
                      id="purpose"
                      value={formData.purpose}
                      onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                      className="mt-2 h-12 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="e.g., Team meeting, Workshop, Client presentation"
                    />
                  </div>
                  <div>
                    <Label htmlFor="special_requests" className="text-[#5C4033]">Special Requests (Optional)</Label>
                    <Textarea
                      id="special_requests"
                      value={formData.special_requests}
                      onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                      rows={4}
                      className="mt-2 border-[#D4AF37]/30 focus:border-[#D4AF37]"
                      placeholder="Any special requirements? We'll do our best to accommodate..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Link href="/" className="flex-1">
                  <Button type="button" variant="outline" className="w-full h-14 text-lg border-[#D4AF37] text-[#5C4033]">
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading || availabilityStatus !== 'available'}
                  className="flex-1 h-14 text-lg bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white disabled:opacity-50"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 mr-2 animate-spin" />Submitting...</>
                  ) : (
                    <>Submit Booking Request</>
                  )}
                </Button>
              </div>

              {availabilityStatus !== 'available' && (
                <p className="text-center text-sm text-red-600">
                  Please check availability before submitting your booking
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}


