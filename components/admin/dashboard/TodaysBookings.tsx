'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { format } from 'date-fns'
import { Calendar, Clock, Users, MapPin } from 'lucide-react'

interface Booking {
  id: string
  receipt_number: string
  start_datetime: string
  end_datetime: string
  number_of_people: number
  purpose?: string
  status: string
  total_amount: number
  space: {
    name: string
    type: string
  }
  customer: {
    full_name: string
    email: string
  }
}

export function TodaysBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchTodaysBookings()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchTodaysBookings()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchTodaysBookings = async () => {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const response = await fetch(`/api/bookings?date=${today.toISOString().split('T')[0]}`)
      
      if (response.ok) {
        const data = await response.json()
        setBookings(Array.isArray(data) ? data.slice(0, 10) : [])
      } else {
        console.error('Failed to fetch bookings')
        setBookings([])
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      setBookings([])
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'pending':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      case 'completed':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'cancelled':
        return 'bg-red-100 text-red-700 border-red-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#5C4033]">Today's Bookings</h2>
        <span className="text-sm text-[#5C4033]/60">{bookings.length} booking{bookings.length !== 1 ? 's' : ''}</span>
      </div>
      
      {loading ? (
        <div className="text-center py-8 text-[#5C4033]/60">Loading...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-8 text-[#5C4033]/60">
          <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p>No bookings for today</p>
          <p className="text-xs mt-1">New bookings will appear here automatically</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border border-[#D4AF37]/20 rounded-lg hover:shadow-md transition-all hover:border-[#D4AF37]/40"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-[#5C4033]">{booking.space?.name || 'Unknown Space'}</h3>
                  <p className="text-sm text-[#5C4033]/70">{booking.customer?.full_name || 'Unknown Customer'}</p>
                  {booking.purpose && (
                    <p className="text-xs text-[#5C4033]/60 mt-1 italic">{booking.purpose}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                  {booking.status.toUpperCase()}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center text-[#5C4033]/70">
                  <Clock className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  <div>
                    <div>{format(new Date(booking.start_datetime), 'h:mm a')}</div>
                    <div className="text-xs">to {format(new Date(booking.end_datetime), 'h:mm a')}</div>
                  </div>
                </div>
                <div className="flex items-center text-[#5C4033]/70">
                  <Users className="w-4 h-4 mr-2 text-[#D4AF37]" />
                  {booking.number_of_people} {booking.number_of_people === 1 ? 'person' : 'people'}
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between">
                <div className="text-xs text-[#5C4033]/50 font-mono">
                  {booking.receipt_number}
                </div>
                <div className="text-sm font-semibold text-[#D4AF37]">
                  KES {booking.total_amount?.toLocaleString() || '0'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

