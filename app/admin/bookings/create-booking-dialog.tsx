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
import { X, Loader2, AlertCircle, CheckCircle } from 'lucide-react'

interface CreateBookingDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

interface Space {
  id: string
  name: string
  type: string
  capacity: number
  hourly_rate: number
  daily_rate: number
}

export function CreateBookingDialog({ open, onClose, onSuccess }: CreateBookingDialogProps) {
  const [loading, setLoading] = useState(false)
  const [spaces, setSpaces] = useState<Space[]>([])
  const [checkingAvailability, setCheckingAvailability] = useState(false)
  const [availabilityStatus, setAvailabilityStatus] = useState<'idle' | 'available' | 'unavailable'>('idle')
  
  const [formData, setFormData] = useState({
    // Customer info
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_company: '',
    
    // Booking info
    space_id: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    number_of_people: '1',
    purpose: '',
    special_requests: '',
    
    // Payment
    total_amount: '0',
  })

  useEffect(() => {
    if (open) {
      fetchSpaces()
    }
  }, [open])

  const fetchSpaces = async () => {
    try {
      const response = await fetch('/api/spaces')
      if (response.ok) {
        const data = await response.json()
        setSpaces(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching spaces:', error)
    }
  }

  const checkAvailability = async () => {
    if (!formData.space_id || !formData.start_date || !formData.start_time || !formData.end_date || !formData.end_time) {
      toast.error('Please fill in space and time details first')
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
        toast.success('Space is available!')
      } else {
        setAvailabilityStatus('unavailable')
        toast.error('Space is not available for this time')
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
          full_name: formData.customer_name,
          email: formData.customer_email,
          phone: formData.customer_phone,
          company: formData.customer_company || null,
        }),
      })

      const customerData = await customerResponse.json()

      if (!customerResponse.ok) {
        toast.error('Error creating customer')
        return
      }

      const customerId = customerData.customer.id

      // Step 2: Get current user from localStorage
      const userStr = localStorage.getItem('worknest_user')
      const user = userStr ? JSON.parse(userStr) : null

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
          total_amount: parseFloat(formData.total_amount),
          status: 'confirmed', // Front desk bookings are confirmed immediately
          booking_type: 'front_desk',
          booked_by: user?.id || null,
        }),
      })

      if (bookingResponse.ok) {
        const booking = await bookingResponse.json()
        toast.success(`Booking created! Receipt: ${booking.receipt_number}`)
        onSuccess()
      } else {
        const error = await bookingResponse.json()
        toast.error(error.error || 'Failed to create booking')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error creating booking')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white flex items-center justify-between p-6 border-b border-[#D4AF37]/20 z-10">
          <h2 className="text-2xl font-bold text-[#5C4033]">Create New Booking</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#5C4033]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5C4033] border-b border-[#D4AF37]/20 pb-2">
              Customer Information
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="customer_name" className="text-[#5C4033]">Full Name *</Label>
                <Input
                  id="customer_name"
                  value={formData.customer_name}
                  onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="customer_email" className="text-[#5C4033]">Email *</Label>
                <Input
                  id="customer_email"
                  type="email"
                  value={formData.customer_email}
                  onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="customer_phone" className="text-[#5C4033]">Phone *</Label>
                <Input
                  id="customer_phone"
                  type="tel"
                  value={formData.customer_phone}
                  onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  required
                  className="mt-1"
                  placeholder="+254..."
                />
              </div>
              <div>
                <Label htmlFor="customer_company" className="text-[#5C4033]">Company</Label>
                <Input
                  id="customer_company"
                  value={formData.customer_company}
                  onChange={(e) => setFormData({ ...formData, customer_company: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5C4033] border-b border-[#D4AF37]/20 pb-2">
              Booking Details
            </h3>
            <div>
              <Label htmlFor="space_id" className="text-[#5C4033]">Space *</Label>
              <Select
                value={formData.space_id}
                onValueChange={(value) => {
                  setFormData({ ...formData, space_id: value })
                  setAvailabilityStatus('idle')
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a space" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {spaces.map((space) => (
                    <SelectItem key={space.id} value={space.id}>
                      {space.name} (Capacity: {space.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
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
                  className="mt-1"
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
                  className="mt-1"
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
                  className="mt-1"
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
                  className="mt-1"
                />
              </div>
            </div>

            {/* Availability Check */}
            <div className="bg-[#FFFFF0] border border-[#D4AF37]/30 rounded-lg p-4">
              <Button
                type="button"
                onClick={checkAvailability}
                disabled={checkingAvailability}
                className="w-full bg-[#D4AF37] hover:bg-[#B8941F]"
              >
                {checkingAvailability ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Checking...</>
                ) : (
                  'Check Availability'
                )}
              </Button>
              
              {availabilityStatus === 'available' && (
                <div className="mt-3 flex items-center text-green-700 text-sm">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Space is available for this time!
                </div>
              )}
              {availabilityStatus === 'unavailable' && (
                <div className="mt-3 flex items-center text-red-700 text-sm">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Space is not available. Please choose a different time.
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="number_of_people" className="text-[#5C4033]">Number of People *</Label>
                <Input
                  id="number_of_people"
                  type="number"
                  value={formData.number_of_people}
                  onChange={(e) => setFormData({ ...formData, number_of_people: e.target.value })}
                  required
                  min="1"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="total_amount" className="text-[#5C4033]">Total Amount (KSh) *</Label>
                <Input
                  id="total_amount"
                  type="number"
                  step="0.01"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  required
                  min="0"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="purpose" className="text-[#5C4033]">Purpose</Label>
              <Input
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                className="mt-1"
                placeholder="e.g., Team meeting, Workshop"
              />
            </div>

            <div>
              <Label htmlFor="special_requests" className="text-[#5C4033]">Special Requests</Label>
              <Textarea
                id="special_requests"
                value={formData.special_requests}
                onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
                rows={3}
                className="mt-1"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/20">
            <Button type="button" onClick={onClose} variant="outline" className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
              disabled={loading || availabilityStatus !== 'available'}
            >
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Creating...</> : 'Create Booking'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}


