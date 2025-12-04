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
  Projector, 
  CheckCircle2,
  Sparkles,
  GraduationCap,
  Briefcase,
  PartyPopper,
  Globe,
  Award
} from "lucide-react"
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

export function EventSpacesClient() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const [selectedEventType, setSelectedEventType] = useState<string>('all')

  const eventTypes = [
    { id: 'all', name: t('eventSpaces.allEvents'), icon: Sparkles },
    { id: 'corporate', name: t('eventSpaces.corporateEvents'), icon: Briefcase },
    { id: 'workshop', name: t('eventSpaces.workshopsTraining'), icon: GraduationCap },
    { id: 'conference', name: t('eventSpaces.conferences'), icon: Globe },
    { id: 'social', name: t('eventSpaces.socialEvents'), icon: PartyPopper },
    { id: 'awards', name: t('eventSpaces.awardCeremonies'), icon: Award },
  ]

  const eventSpaces = [
    {
      name: "Event Hall",
      capacity: `40-50 ${t("boardrooms.people")}`,
      images: [
        { url: "/gallery/DJI_20000609074140_0081_D.jpg", title: "Event Hall", description: "Spacious event hall for gatherings and conferences" },
        { url: "/gallery/DJI_20000609074238_0084_D.jpg", title: "Event Hall", description: "Professional setup with modern AV equipment" },
        { url: "/gallery/IMG_1020.jpg", title: "Event Hall", description: "Flexible layout for various event types" },
      ],
      suitableFor: ['corporate', 'conference', 'awards'],
      description: "Our flagship event space perfect for conferences, product launches, award ceremonies, and corporate gatherings. Features professional AV equipment, flexible seating arrangements for 40-50 guests, and a sophisticated ambiance.",
      features: [
        "Seating for 40-50 guests",
        "Professional PA system",
        "Premium projector & screen",
        "Adjustable lighting",
        "High-speed WiFi",
        "Catering facilities",
      ],
    },
    {
      name: "Workshop & Training Room",
      capacity: `25-30 ${t("boardrooms.people")}`,
      images: [
        { url: "/gallery/IMG_1039.jpg", title: "Workshop Room", description: "Interactive training space with modern setup" },
        { url: "/gallery/IMG_0975.jpg", title: "Workshop Room", description: "Collaborative environment for workshops" },
        { url: "/gallery/IMG_0977.jpg", title: "Workshop Room", description: "Professional training facilities" },
      ],
      suitableFor: ['workshop', 'corporate'],
      description: "Ideal for workshops, training sessions, and interactive seminars. Equipped with whiteboards, flip charts, and breakout areas for group activities and collaborative learning. Accommodates 25-30 participants.",
      features: [
        "Seating for 25-30 participants",
        "Multiple whiteboards",
        "Flip charts & markers",
        "Premium display screens",
        "Breakout areas",
        "High-speed WiFi",
        "Refreshment station",
        "Natural lighting",
      ],
    },
    {
      name: "Social Event Lounge",
      capacity: `50-80 ${t("boardrooms.people")}`,
      comingSoon: true,
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
    { icon: Projector, title: "Presentation Tools", description: "Professional presentation tools" },
    { icon: Wifi, title: "High-Speed WiFi", description: "Reliable internet connection" },
    { icon: Coffee, title: "Catering Services", description: "In-house catering available" },
    { icon: Users, title: "Event Support", description: "Dedicated event coordinator" },
  ]

  const popularEvents = [
    {
      type: "Corporate Conferences",
      icon: Briefcase,
      description: "Product launches, AGMs, team summits",
      examples: "40-50 attendees",
    },
    {
      type: "Workshops & Training",
      icon: GraduationCap,
      description: "Professional development, skill-building",
      examples: "25-30 participants",
    },
    {
      type: "Networking Events",
      icon: Users,
      description: "Business mixers, industry meetups",
      examples: "40-50 guests",
    },
    {
      type: "Award Ceremonies",
      icon: Award,
      description: "Recognition events, gala dinners",
      examples: "40-50 attendees",
    },
    {
      type: "Social Celebrations",
      icon: PartyPopper,
      description: "Birthdays, anniversaries, parties",
      examples: "50-80 guests",
    },
    {
      type: "Seminars & Talks",
      icon: Globe,
      description: "Guest speakers, panel discussions",
      examples: "40-50 attendees",
    },
  ]

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Workspace Solutions" }, { name: "Event Spaces" }]}
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
              {t("eventSpaces.premiumEventVenues")}
            </Badge>
            <h1 className="text-5xl md:text-6xl mb-6 font-playfair">{t("eventSpaces.title")}</h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              {t("eventSpaces.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Event Type Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-[#5C4033] mb-8 text-3xl font-playfair">
            {t("eventSpaces.whatTypeOfEvent")}
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
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 max-w-6xl mx-auto">
            {popularEvents.map((event, index) => {
              const Icon = event.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-3 md:p-6 shadow-lg hover:shadow-xl transition-all border border-[#5C4033]/10 group hover:scale-105"
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-2 md:mb-4 group-hover:bg-[#D4AF37] transition-colors">
                    <Icon className="w-5 h-5 md:w-7 md:h-7 text-[#D4AF37] group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm md:text-xl font-semibold text-[#5C4033] mb-1 md:mb-2">{event.type}</h3>
                  <p className="text-xs md:text-base text-[#5C4033]/70 mb-2 md:mb-3">{event.description}</p>
                  <p className="text-xs md:text-sm text-[#D4AF37] font-medium">{event.examples}</p>
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
                    {space.comingSoon && (
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40">
                        <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white px-6 py-3 text-lg font-bold animate-pulse shadow-2xl">
                          Coming Soon
                        </Badge>
                      </div>
                    )}
                    <WorkspaceCarousel images={space.images} />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl text-[#5C4033] mb-2 font-playfair">{space.name}</h3>

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
              {t("eventSpaces.whatsIncluded")}
            </h2>
            <p className="text-center text-[#5C4033]/70 mb-12 text-lg">
              Every event space comes with premium amenities and support
            </p>
            <div className="grid grid-cols-4 gap-4 md:gap-8">
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

