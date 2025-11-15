'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, Users, MapPin, Phone, Mail, CheckCircle, XCircle, Eye } from 'lucide-react'
import { format } from 'date-fns'

interface Booking {
  id: string
  receipt_number: string
  space: {
    id: string
    name: string
    type: string
  }
  customer: {
    id: string
    full_name: string
    email: string
    phone: string
  }
  start_datetime: string
  end_datetime: string
  number_of_people: number
  purpose?: string
  special_requests?: string
  status: string
  total_amount: number
  booking_type?: string
  created_at: string
}

interface BookingsListProps {
  bookings: Booking[]
  onStatusChange: (bookingId: string, newStatus: string) => void
  onCancel: (bookingId: string) => void
  onRefresh: () => void
}

const statusColors = {
  pending: 'bg-amber-100 text-amber-800 border-amber-300',
  confirmed: 'bg-green-100 text-green-800 border-green-300',
  completed: 'bg-blue-100 text-blue-800 border-blue-300',
  cancelled: 'bg-red-100 text-red-800 border-red-300',
}

export function BookingsList({ bookings, onStatusChange, onCancel, onRefresh }: BookingsListProps) {
  // Check if booking is new (created in last 5 minutes)
  const isNewBooking = (createdAt: string) => {
    const created = new Date(createdAt).getTime()
    const now = Date.now()
    const fiveMinutes = 5 * 60 * 1000
    return (now - created) < fiveMinutes
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <Card 
          key={booking.id} 
          className={`p-6 bg-white border-[#D4AF37]/20 hover:shadow-lg transition-all ${
            isNewBooking(booking.created_at) ? 'border-2 border-[#D4AF37] shadow-lg animate-pulse' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-xl font-semibold text-[#5C4033]">{booking.space.name}</h3>
                <Badge className={statusColors[booking.status as keyof typeof statusColors]}>
                  {booking.status.toUpperCase()}
                </Badge>
                {isNewBooking(booking.created_at) && (
                  <Badge className="bg-[#D4AF37] text-white border-[#D4AF37] animate-bounce">
                    🔔 NEW
                  </Badge>
                )}
              </div>
              <div className="text-sm text-[#5C4033]/60">
                Receipt: <span className="font-mono font-semibold">{booking.receipt_number}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-[#D4AF37]">
                KES {booking.total_amount.toLocaleString()}
              </div>
              <div className="text-xs text-[#5C4033]/60">
                Booked {format(new Date(booking.created_at), 'MMM dd, yyyy')}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {/* Left Column - Booking Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#5C4033]">Booking Date & Time</div>
                  <div className="text-sm text-[#5C4033]/70">
                    {format(new Date(booking.start_datetime), 'EEEE, MMM dd, yyyy')}
                  </div>
                  <div className="text-sm text-[#5C4033]/70">
                    {format(new Date(booking.start_datetime), 'hh:mm a')} - {format(new Date(booking.end_datetime), 'hh:mm a')}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#5C4033]">Number of People</div>
                  <div className="text-sm text-[#5C4033]/70">{booking.number_of_people} people</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] mt-0.5" />
                <div>
                  <div className="text-sm font-medium text-[#5C4033]">Space Type</div>
                  <div className="text-sm text-[#5C4033]/70 capitalize">{booking.space.type.replace('_', ' ')}</div>
                </div>
              </div>
            </div>

            {/* Right Column - Customer Details */}
            <div className="space-y-3">
              <div>
                <div className="text-sm font-medium text-[#5C4033] mb-2">Customer Information</div>
                <div className="text-base font-semibold text-[#5C4033]">{booking.customer.full_name}</div>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <a
                  href={`mailto:${booking.customer.email}`}
                  className="text-sm text-[#5C4033]/70 hover:text-[#D4AF37] underline"
                >
                  {booking.customer.email}
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <a
                  href={`tel:${booking.customer.phone}`}
                  className="text-sm text-[#5C4033]/70 hover:text-[#D4AF37]"
                >
                  {booking.customer.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Purpose & Special Requests */}
          {(booking.purpose || booking.special_requests || booking.booking_type) && (
            <div className="mt-4 p-4 bg-[#FFFFF0] rounded-lg border border-[#D4AF37]/20 space-y-2">
              {booking.booking_type && (
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {booking.booking_type === 'online' ? '🌐 Online Booking' : '🏢 Front Desk'}
                  </Badge>
                </div>
              )}
              {booking.purpose && (
                <div>
                  <span className="text-sm font-semibold text-[#5C4033]">Purpose: </span>
                  <span className="text-sm text-[#5C4033]/80">{booking.purpose}</span>
                </div>
              )}
              {booking.special_requests && (
                <div>
                  <span className="text-sm font-semibold text-[#5C4033]">Special Requests: </span>
                  <span className="text-sm text-[#5C4033]/80">{booking.special_requests}</span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-4 border-t border-[#D4AF37]/20 mt-4">
            {booking.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  onClick={() => onStatusChange(booking.id, 'confirmed')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Confirm
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onCancel(booking.id)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
              </>
            )}
            {booking.status === 'confirmed' && (
              <Button
                size="sm"
                onClick={() => onStatusChange(booking.id, 'completed')}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark Completed
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              className="ml-auto border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/10"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

