'use client'

import { useEffect, useState } from 'react'
import { Calendar, MapPin, Users, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
}

export function EventsClient() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?status=upcoming')
      if (response.ok) {
        const data = await response.json()
        setEvents(Array.isArray(data) ? data : [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = selectedCategory === 'all'
    ? events
    : events.filter(event => event.category === selectedCategory)

  const categories = ['all', 'workshop', 'networking', 'social', 'conference']
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#5C4033] to-[#4A3329] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Events & Workshops</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join our community events, learn new skills, and network with like-minded professionals
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">What's Happening at The WorkNest</h2>
            <p className="text-[#5C4033]/70 leading-relaxed">
              From networking sessions to skill-building workshops, our events are designed to help you 
              grow professionally, connect with peers, and stay ahead in your industry. Whether you're 
              looking to learn, network, or simply unwind, there's something for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#D4AF37] text-white'
                    : 'bg-white text-[#5C4033] border border-[#D4AF37]/30 hover:border-[#D4AF37]'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-[#FFFFF0]" data-type="event">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Upcoming Events</h2>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-12 h-12 animate-spin text-[#D4AF37]" />
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/20" />
              <h3 className="text-2xl font-bold text-[#5C4033] mb-2">No Events Found</h3>
              <p className="text-[#5C4033]/60">Check back soon for upcoming events!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow border border-[#5C4033]/10"
              >
                {event.image_url && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-[#D4AF37] text-[#5C4033]">
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </Badge>
                      {event.is_featured && (
                        <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#5C4033] mb-3">{event.title}</h3>
                  <p className="text-sm text-[#5C4033]/70 mb-4 line-clamp-2">{event.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#5C4033]/60">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{format(new Date(event.event_date), 'MMMM dd, yyyy')}</span>
                    </div>
                    {event.start_time && (
                      <div className="flex items-center gap-2 text-sm text-[#5C4033]/60">
                        <Clock className="w-4 h-4 text-[#D4AF37]" />
                        <span>
                          {event.start_time} {event.end_time && `- ${event.end_time}`}
                        </span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm text-[#5C4033]/60">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <span>{event.location}</span>
                      </div>
                    )}
                    {event.capacity && (
                      <div className="flex items-center gap-2 text-sm text-[#5C4033]/60">
                        <Users className="w-4 h-4 text-[#D4AF37]" />
                        <span>
                          {event.registered_count || 0} / {event.capacity} registered
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4 text-lg font-bold text-[#D4AF37]">
                    {event.price > 0 ? `KES ${event.price.toLocaleString()}` : 'FREE'}
                  </div>

                  <Button
                    asChild
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-white"
                  >
                    <Link href="/host-event">Register Now</Link>
                  </Button>
                </div>
              </div>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Host Your Event */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Host Your Event at The WorkNest</h2>
                <p className="text-[#5C4033]/70 mb-6 leading-relaxed">
                  Looking for the perfect venue for your next corporate event, workshop, or celebration? 
                  Our versatile event spaces can accommodate gatherings of all sizes, from intimate 
                  meetings to large conferences.
                </p>
                <ul className="space-y-3 mb-6">
                  {[
                    "State-of-the-art AV equipment",
                    "Flexible seating arrangements",
                    "In-house catering options",
                    "Dedicated event support team",
                    "High-speed WiFi throughout",
                    "Professional ambiance",
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[#5C4033]/70">
                      <div className="w-2 h-2 bg-[#D4AF37] rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className="bg-[#5C4033] hover:bg-[#4A3329] text-white"
                >
                  <Link href="/contact">Book Event Space</Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1759873148521-c49d9497cf64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHNwYWNlJTIwdmVudWV8ZW58MXx8fHwxNzYyMTgyNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Event space"
                  className="w-full h-48 object-cover rounded-lg shadow-lg"
                />
                <img
                  src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwYm9hcmRyb29tfGVufDF8fHx8MTc2MjIzMzYyN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Boardroom"
                  className="w-full h-48 object-cover rounded-lg shadow-lg mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Past Events Highlight */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Past Events Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Startup Pitch Night",
                date: "October 2025",
                image: "https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMjMzNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "10 startups pitched to investors",
              },
              {
                title: "Leadership Workshop",
                date: "September 2025",
                image: "https://images.unsplash.com/photo-1758518731572-7791381c5ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMTg4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "35 professionals attended",
              },
              {
                title: "Tech Community Mixer",
                date: "August 2025",
                image: "https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjIxNTc0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
                description: "50+ attendees networking",
              },
            ].map((event, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-[#5C4033] mb-1">{event.title}</h4>
                  <p className="text-xs text-[#5C4033]/60 mb-2">{event.date}</p>
                  <p className="text-sm text-[#5C4033]/70">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-[#5C4033]/80 max-w-2xl mx-auto">
            Never miss an event! Subscribe to our newsletter to get the latest updates on upcoming events and workshops
          </p>
          <Button
            asChild
            className="bg-[#5C4033] hover:bg-[#4A3329] text-white"
          >
            <Link href="/contact">Subscribe Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

