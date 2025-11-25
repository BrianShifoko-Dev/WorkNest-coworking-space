'use client'

import { useState } from 'react'
import Link from "next/link"
import { Breadcrumbs } from "@/components/site/Breadcrumbs"
import { WorkspaceCarousel } from "@/components/site/WorkspaceCarousel"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookingForm } from "@/components/site/BookingForm"
import { 
  Users, 
  Calendar, 
  Wifi, 
  Coffee, 
  Mic, 
  Video, 
  Projector, 
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Briefcase,
  PartyPopper,
  Globe,
  Award
} from "lucide-react"

export function EventSpacesClient() {
  const [selectedEventType, setSelectedEventType] = useState<string>('all')

  const eventTypes = [
    { id: 'all', name: 'All Events', icon: Sparkles },
    { id: 'corporate', name: 'Corporate Events', icon: Briefcase },
    { id: 'workshop', name: 'Workshops & Training', icon: GraduationCap },
    { id: 'conference', name: 'Conferences', icon: Globe },
    { id: 'social', name: 'Social Events', icon: PartyPopper },
    { id: 'awards', name: 'Award Ceremonies', icon: Award },
  ]

  const eventSpaces = [
    {
      name: "Main Event Hall",
      capacity: "100-150 people",
      size: "180 sqm",
      hourlyRate: "KES 5,000",
      halfDayRate: "KES 18,000",
      fullDayRate: "KES 35,000",
      images: [
        { url: "/gallery/DJI_20000609074140_0081_D.jpg", title: "Main Event Hall", description: "Spacious event hall for large gatherings and conferences" },
        { url: "/gallery/DJI_20000609074238_0084_D.jpg", title: "Main Event Hall", description: "Professional setup with modern AV equipment" },
        { url: "/gallery/IMG_1020.jpg", title: "Main Event Hall", description: "Flexible layout for various event types" },
      ],
      suitableFor: ['corporate', 'conference', 'awards'],
      description: "Our flagship event space perfect for large conferences, product launches, award ceremonies, and corporate gatherings. Features professional AV equipment, flexible seating arrangements, and a sophisticated ambiance.",
      features: [
        "Seating for 100-150 guests",
        "Professional PA system",
        "HD projector & screen",
        "Stage with podium",
        "Adjustable lighting",
        "High-speed WiFi",
        "Climate control",
        "Catering facilities",
      ],
    },
    {
      name: "Workshop & Training Room",
      capacity: "30-50 people",
      size: "80 sqm",
      hourlyRate: "KES 3,000",
      halfDayRate: "KES 10,000",
      fullDayRate: "KES 18,000",
      images: [
        { url: "/gallery/IMG_1039.jpg", title: "Workshop Room", description: "Interactive training space with modern setup" },
        { url: "/gallery/IMG_0975.jpg", title: "Workshop Room", description: "Collaborative environment for workshops" },
        { url: "/gallery/IMG_0977.jpg", title: "Workshop Room", description: "Professional training facilities" },
      ],
      suitableFor: ['workshop', 'corporate'],
      description: "Ideal for workshops, training sessions, and interactive seminars. Equipped with whiteboards, flip charts, and breakout areas for group activities and collaborative learning.",
      features: [
        "Seating for 30-50 participants",
        "Multiple whiteboards",
        "Flip charts & markers",
        "HD display screens",
        "Breakout areas",
        "High-speed WiFi",
        "Refreshment station",
        "Natural lighting",
      ],
    },
    {
      name: "Social Event Lounge",
      capacity: "50-80 people",
      size: "120 sqm",
      hourlyRate: "KES 4,000",
      halfDayRate: "KES 14,000",
      fullDayRate: "KES 25,000",
      images: [
        { url: "/gallery/IMG_0971.jpg", title: "Social Event Lounge", description: "Elegant space for social gatherings" },
        { url: "/gallery/DJI_20000609074140_0081_D.jpg", title: "Social Event Lounge", description: "Perfect for celebrations and parties" },
        { url: "/gallery/DJI_20000609074238_0084_D.jpg", title: "Social Event Lounge", description: "Modern ambiance for special occasions" },
      ],
      suitableFor: ['social', 'corporate'],
      description: "A versatile space perfect for cocktail parties, networking events, birthday celebrations, and corporate mixers. Features modern décor, ambient lighting, and a built-in bar area.",
      features: [
        "Seating for 50-80 guests",
        "Ambient mood lighting",
        "Sound system & DJ booth",
        "Bar counter area",
        "Lounge furniture",
        "Dance floor space",
        "Outdoor terrace access",
        "Catering-ready kitchen",
      ],
    },
  ]

  const filteredSpaces = selectedEventType === 'all' 
    ? eventSpaces 
    : eventSpaces.filter(space => space.suitableFor.includes(selectedEventType))

  const amenities = [
    { icon: Projector, title: "AV Equipment", description: "Professional presentation tools" },
    { icon: Mic, title: "PA System", description: "High-quality sound system" },
    { icon: Video, title: "Video Conferencing", description: "HD cameras and screens" },
    { icon: Wifi, title: "High-Speed WiFi", description: "Reliable internet connection" },
    { icon: Coffee, title: "Catering Services", description: "In-house catering available" },
    { icon: Users, title: "Event Support", description: "Dedicated event coordinator" },
  ]

  const popularEvents = [
    {
      type: "Corporate Conferences",
      icon: Briefcase,
      description: "Product launches, AGMs, team summits",
      examples: "50-150 attendees",
    },
    {
      type: "Workshops & Training",
      icon: GraduationCap,
      description: "Professional development, skill-building",
      examples: "20-50 participants",
    },
    {
      type: "Networking Events",
      icon: Users,
      description: "Business mixers, industry meetups",
      examples: "30-80 guests",
    },
    {
      type: "Award Ceremonies",
      icon: Award,
      description: "Recognition events, gala dinners",
      examples: "60-150 attendees",
    },
    {
      type: "Social Celebrations",
      icon: PartyPopper,
      description: "Birthdays, anniversaries, parties",
      examples: "30-80 guests",
    },
    {
      type: "Seminars & Talks",
      icon: Mic,
      description: "Guest speakers, panel discussions",
      examples: "40-100 attendees",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Products & Book" }, { name: "Event Spaces" }]}
      />

      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <img
          src="/gallery/DJI_20000609074140_0081_D.jpg"
          alt="Event Spaces in Eldoret"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <Badge className="bg-[#D4AF37] text-[#5C4033] mb-4 px-4 py-1">
              Premium Event Venues
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-playfair">Event Spaces in Eldoret</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Host unforgettable events in our versatile spaces - from corporate conferences 
              to celebrations, we've got you covered
            </p>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-[#5C4033] mb-8 text-3xl font-playfair">
            What Type of Event Are You Planning?
          </h2>
          <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
            {eventTypes.map((type) => {
              const Icon = type.icon
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedEventType(type.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    selectedEventType === type.id
                      ? 'bg-[#D4AF37] text-white shadow-lg scale-105'
                      : 'bg-white text-[#5C4033] border-2 border-[#D4AF37]/30 hover:border-[#D4AF37]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {type.name}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Popular Event Types */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-4 text-4xl font-playfair">
            Events We Host
          </h2>
          <p className="text-center text-[#5C4033]/70 mb-12 text-lg max-w-3xl mx-auto">
            Our versatile spaces can accommodate a wide range of events
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {popularEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all border border-[#5C4033]/10 group hover:scale-105"
                >
                  <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors">
                    <Icon className="w-7 h-7 text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#5C4033] mb-2">{event.type}</h3>
                  <p className="text-[#5C4033]/70 mb-3">{event.description}</p>
                  <p className="text-sm text-[#D4AF37] font-medium">{event.examples}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Event Spaces */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">
            Our Event Spaces
          </h2>
          
          {filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/20" />
              <p className="text-[#5C4033]/60 text-lg">
                No spaces match this event type. Try selecting "All Events"
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {filteredSpaces.map((space, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#5C4033]/10"
                >
                  {/* Image Gallery */}
                  <div className="relative h-64 overflow-hidden">
                    <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-[#5C4033] z-10">
                      <Users className="w-3 h-3 mr-1" />
                      {space.capacity}
                    </Badge>
                    <WorkspaceCarousel images={space.images} />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl text-[#5C4033] mb-2 font-playfair">{space.name}</h3>
                    <p className="text-sm text-[#5C4033]/60 mb-6">{space.size}</p>

                    {/* Pricing */}
                    <div className="bg-[#FFFFF0] rounded-lg p-4 mb-6">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-[#5C4033]/70">Hourly Rate:</span>
                          <span className="font-semibold text-[#D4AF37]">{space.hourlyRate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#5C4033]/70">Half Day (4hrs):</span>
                          <span className="font-semibold text-[#D4AF37]">{space.halfDayRate}</span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-[#D4AF37]/20">
                          <span className="font-semibold text-[#5C4033]">Full Day (8hrs):</span>
                          <span className="text-lg font-bold text-[#D4AF37]">{space.fullDayRate}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-[#5C4033]/70 mb-6 leading-relaxed">
                      {space.description}
                    </p>

                    {/* Features */}
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {space.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-[#5C4033]/80">
                          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link href="/contact">
                      <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] font-semibold">
                        Request Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-4 text-4xl font-playfair">
              What's Included
            </h2>
            <p className="text-center text-[#5C4033]/70 mb-12 text-lg">
              Every event space comes with premium amenities and support
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <amenity.icon className="w-8 h-8 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-[#5C4033] mb-2 font-semibold">{amenity.title}</h3>
                  <p className="text-sm text-[#5C4033]/70">{amenity.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Catering & Add-ons */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">
              Catering & Add-ons
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#FFFFF0] rounded-lg p-6 border-2 border-[#D4AF37]/20">
                <Coffee className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-semibold text-[#5C4033] mb-3">Catering Packages</h3>
                <ul className="space-y-2 text-[#5C4033]/70">
                  <li>• Coffee & Tea Station - KES 300/person</li>
                  <li>• Light Refreshments - KES 800/person</li>
                  <li>• Full Lunch Buffet - KES 1,500/person</li>
                  <li>• Cocktail Reception - KES 2,000/person</li>
                </ul>
              </div>
              <div className="bg-[#FFFFF0] rounded-lg p-6 border-2 border-[#D4AF37]/20">
                <Sparkles className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-xl font-semibold text-[#5C4033] mb-3">Event Services</h3>
                <ul className="space-y-2 text-[#5C4033]/70">
                  <li>• Event Planning Assistance</li>
                  <li>• Professional Photography</li>
                  <li>• Custom Branding & Signage</li>
                  <li>• Dedicated Event Coordinator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact/Booking CTA */}
      <section className="py-20 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]">
        <div className="container mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-[#5C4033]" />
          <h2 className="text-4xl font-bold text-[#5C4033] mb-4 font-playfair">
            Ready to Host Your Event?
          </h2>
          <p className="text-xl mb-8 text-[#5C4033]/90 max-w-2xl mx-auto">
            Contact our events team for a personalized quote and venue walkthrough
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#5C4033] hover:bg-[#4A3329] text-white px-8 py-6 text-lg">
                Get a Quote
              </Button>
            </Link>
            <Link href="/book-tour">
              <Button className="bg-white hover:bg-gray-100 text-[#5C4033] px-8 py-6 text-lg">
                Schedule a Viewing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

