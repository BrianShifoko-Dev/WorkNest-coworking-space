'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Plus, Calendar, Search, Loader2, Edit, Trash2, Users } from 'lucide-react'
import { toast } from 'sonner'
import { CreateEventDialog } from './create-event-dialog'
import { EditEventDialog } from './edit-event-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'

interface Event {
  id: string
  title: string
  slug: string
  description: string
  event_date: string
  start_time: string
  end_time: string
  location: string
  category: string
  image_url: string
  price: number
  capacity: number
  registered_count: number
  status: string
  is_featured: boolean
  created_at: string
}

export function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchEvents()
  }, [statusFilter, categoryFilter])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      let url = '/api/events'
      const params = new URLSearchParams()
      
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (categoryFilter !== 'all') params.append('category', categoryFilter)
      
      if (params.toString()) url += `?${params.toString()}`

      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        setEvents(Array.isArray(data) ? data : [])
      } else {
        toast.error('Failed to load events')
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      toast.error('Error loading events')
    } finally {
      setLoading(false)
    }
  }

  const handleEventCreated = () => {
    setShowCreateDialog(false)
    fetchEvents()
    toast.success('Event created successfully!')
  }

  const handleEventUpdated = () => {
    setEditingEvent(null)
    fetchEvents()
    toast.success('Event updated successfully!')
  }

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Event deleted successfully!')
        fetchEvents()
      } else {
        toast.error('Failed to delete event')
      }
    } catch (error) {
      console.error('Error deleting event:', error)
      toast.error('Error deleting event')
    }
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const styles = {
      upcoming: 'bg-blue-100 text-blue-800 border-blue-300',
      ongoing: 'bg-green-100 text-green-800 border-green-300',
      completed: 'bg-gray-100 text-gray-800 border-gray-300',
      cancelled: 'bg-red-100 text-red-800 border-red-300',
    }
    return styles[status as keyof typeof styles] || styles.upcoming
  }

  const getCategoryBadge = (category: string) => {
    const styles = {
      workshop: 'bg-purple-100 text-purple-800',
      networking: 'bg-orange-100 text-orange-800',
      social: 'bg-pink-100 text-pink-800',
      conference: 'bg-indigo-100 text-indigo-800',
    }
    return styles[category as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Events Management</h1>
          <p className="text-[#5C4033]/60 mt-1">Create and manage workshops, networking events, and conferences</p>
        </div>
        <Button
          onClick={() => setShowCreateDialog(true)}
          className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Total Events</div>
          <div className="text-2xl font-bold text-[#5C4033]">{events.length}</div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Upcoming</div>
          <div className="text-2xl font-bold text-blue-600">
            {events.filter(e => e.status === 'upcoming').length}
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">Featured</div>
          <div className="text-2xl font-bold text-[#D4AF37]">
            {events.filter(e => e.is_featured).length}
          </div>
        </Card>
        <Card className="p-4 border-[#D4AF37]/20">
          <div className="text-sm text-[#5C4033]/60">This Month</div>
          <div className="text-2xl font-bold text-green-600">
            {events.filter(e => {
              const eventDate = new Date(e.event_date)
              const now = new Date()
              return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear()
            }).length}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 border-[#D4AF37]/20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm text-[#5C4033]/70 mb-2 block">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5C4033]/40" />
              <Input
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#D4AF37]/30"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#5C4033]/70 mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[#D4AF37]/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-[#5C4033]/70 mb-2 block">Category</label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-[#D4AF37]/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="networking">Networking</SelectItem>
                <SelectItem value="social">Social</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Events List */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <Card className="p-12 text-center border-[#D4AF37]/20">
          <Calendar className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/20" />
          <h3 className="text-lg font-semibold text-[#5C4033] mb-2">No events found</h3>
          <p className="text-[#5C4033]/60 mb-4">Get started by creating your first event</p>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden border-[#D4AF37]/20 hover:shadow-lg transition-shadow">
              {/* Event Image */}
              {event.image_url && (
                <div className="relative h-48 overflow-hidden bg-[#5C4033]/5">
                  <Image
                    src={event.image_url}
                    alt={event.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {event.is_featured && (
                    <Badge className="absolute top-3 right-3 bg-[#D4AF37] text-white border-0">
                      Featured
                    </Badge>
                  )}
                </div>
              )}

              <div className="p-4">
                {/* Title & Badges */}
                <div className="mb-3">
                  <h3 className="font-bold text-lg text-[#5C4033] mb-2">{event.title}</h3>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`text-xs border ${getStatusBadge(event.status)}`}>
                      {event.status.toUpperCase()}
                    </Badge>
                    <Badge className={`text-xs ${getCategoryBadge(event.category)}`}>
                      {event.category}
                    </Badge>
                  </div>
                </div>

                {/* Description */}
                {event.description && (
                  <p className="text-sm text-[#5C4033]/70 mb-3 line-clamp-2">
                    {event.description}
                  </p>
                )}

                {/* Event Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-[#5C4033]/70">
                    <Calendar className="w-4 h-4 mr-2 text-[#D4AF37]" />
                    {format(new Date(event.event_date), 'MMM dd, yyyy')}
                  </div>
                  {event.start_time && (
                    <div className="flex items-center text-[#5C4033]/70">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-[#D4AF37]">🕐</span>
                      {event.start_time} {event.end_time && `- ${event.end_time}`}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-[#5C4033]/70">
                      <span className="w-4 h-4 mr-2 flex items-center justify-center text-[#D4AF37]">📍</span>
                      {event.location}
                    </div>
                  )}
                  {event.capacity && (
                    <div className="flex items-center text-[#5C4033]/70">
                      <Users className="w-4 h-4 mr-2 text-[#D4AF37]" />
                      {event.registered_count || 0} / {event.capacity} registered
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="text-lg font-bold text-[#D4AF37] mb-4">
                  {event.price > 0 ? `KES ${event.price.toLocaleString()}` : 'FREE'}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setEditingEvent(event)}
                    className="flex-1 border-[#D4AF37]/50 text-[#5C4033] hover:bg-[#D4AF37]/10"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteEvent(event.id)}
                    className="border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Dialogs */}
      {showCreateDialog && (
        <CreateEventDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
          onSuccess={handleEventCreated}
        />
      )}

      {editingEvent && (
        <EditEventDialog
          event={editingEvent}
          open={!!editingEvent}
          onClose={() => setEditingEvent(null)}
          onSuccess={handleEventUpdated}
        />
      )}
    </div>
  )
}

