'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Calendar, Filter, Search, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { CreateBookingDialog } from './create-booking-dialog'
import { BookingsList } from './bookings-list'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'

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

export function BookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [lastBookingCount, setLastBookingCount] = useState(0)

  useEffect(() => {
    fetchBookings()
    
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission()
    }
    
    // Poll for new bookings every 30 seconds
    const interval = setInterval(() => {
      fetchBookings(true) // Silent fetch (don't show loading)
    }, 30000)

    return () => clearInterval(interval)
  }, [statusFilter])

  const fetchBookings = async (silent = false) => {
    if (!silent) setLoading(true)
    
    try {
      let url = '/api/bookings'
      if (statusFilter !== 'all') {
        url += `?status=${statusFilter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        const newBookings = Array.isArray(data) ? data : []
        
        // Check for new bookings and show notification
        if (silent && newBookings.length > lastBookingCount && lastBookingCount > 0) {
          const newBookingsCount = newBookings.length - lastBookingCount
          
          // Show notification for new bookings
          toast.success(`🔔 ${newBookingsCount} new booking${newBookingsCount > 1 ? 's' : ''} received!`, {
            description: 'Click to view details',
            duration: 10000,
          })
          
          // Play notification sound (browser notification)
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('New Booking Received!', {
              body: `You have ${newBookingsCount} new booking${newBookingsCount > 1 ? 's' : ''}`,
              icon: '/logo.svg',
            })
          }
        }
        
        setBookings(newBookings)
        setLastBookingCount(newBookings.length)
      } else {
        if (!silent) toast.error('Failed to load bookings')
      }
    } catch (error) {
      console.error('Error fetching bookings:', error)
      if (!silent) toast.error('Error loading bookings')
    } finally {
      if (!silent) setLoading(false)
    }
  }

  const handleBookingCreated = () => {
    setShowCreateDialog(false)
    fetchBookings()
    toast.success('Booking created successfully!')
  }

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        toast.success(`Booking ${newStatus}!`)
        fetchBookings()
      } else {
        toast.error('Failed to update booking')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error updating booking')
    }
  }

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Booking cancelled')
        fetchBookings()
      } else {
        toast.error('Failed to cancel booking')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error cancelling booking')
    }
  }

  // Filter bookings by search query
  const filteredBookings = bookings.filter((booking) => {
    if (!searchQuery) return true
    const query = searchQuery.toLowerCase()
    return (
      booking.receipt_number.toLowerCase().includes(query) ||
      booking.customer.full_name.toLowerCase().includes(query) ||
      booking.customer.email.toLowerCase().includes(query) ||
      booking.space.name.toLowerCase().includes(query)
    )
  })

  // Stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Bookings Management</h1>
          <p className="text-[#5C4033]/60 mt-1">Manage all space reservations and bookings</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:opacity-90 text-white"
        >
          <Plus className="w-5 h-5 mr-2" />
          New Booking
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-6 bg-white border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60 mb-1">Total Bookings</div>
          <div className="text-3xl font-bold text-[#5C4033]">{stats.total}</div>
        </Card>
        <Card className="p-6 bg-amber-50 border-amber-200">
          <div className="text-sm text-amber-800/60 mb-1">Pending</div>
          <div className="text-3xl font-bold text-amber-800">{stats.pending}</div>
        </Card>
        <Card className="p-6 bg-green-50 border-green-200">
          <div className="text-sm text-green-800/60 mb-1">Confirmed</div>
          <div className="text-3xl font-bold text-green-800">{stats.confirmed}</div>
        </Card>
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="text-sm text-blue-800/60 mb-1">Completed</div>
          <div className="text-3xl font-bold text-blue-800">{stats.completed}</div>
        </Card>
        <Card className="p-6 bg-red-50 border-red-200">
          <div className="text-sm text-red-800/60 mb-1">Cancelled</div>
          <div className="text-3xl font-bold text-red-800">{stats.cancelled}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6 bg-white border-[#D4AF37]/20">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="text-sm font-medium text-[#5C4033] mb-2 block">
              <Search className="w-4 h-4 inline mr-2" />
              Search
            </label>
            <Input
              placeholder="Search by receipt, customer, or space..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-[#D4AF37]/30"
            />
          </div>
          <div className="w-48">
            <label className="text-sm font-medium text-[#5C4033] mb-2 block">
              <Filter className="w-4 h-4 inline mr-2" />
              Status
            </label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D4AF37]/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Bookings List */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
          <span className="ml-3 text-[#5C4033]/70">Loading bookings...</span>
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card className="p-12 text-center bg-white border-[#D4AF37]/20">
          <Calendar className="w-16 h-16 text-[#D4AF37]/40 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[#5C4033] mb-2">No bookings found</h3>
          <p className="text-[#5C4033]/60 mb-6">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Start by creating your first booking'}
          </p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create First Booking
          </Button>
        </Card>
      ) : (
        <BookingsList
          bookings={filteredBookings}
          onStatusChange={handleStatusChange}
          onCancel={handleCancelBooking}
          onRefresh={fetchBookings}
        />
      )}

      {/* Create Booking Dialog */}
      <CreateBookingDialog
        open={showCreateDialog}
        onClose={() => setShowCreateDialog(false)}
        onSuccess={handleBookingCreated}
      />
    </div>
  )
}

