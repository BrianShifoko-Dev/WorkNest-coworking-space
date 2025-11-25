'use client'

import { useState, useEffect } from 'react'
import { Breadcrumbs } from "@/components/site/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { 
  Users, 
  Wifi, 
  Coffee, 
  Monitor, 
  Mic, 
  Video, 
  Calendar,
  Check,
  ArrowRight,
  Maximize2,
} from 'lucide-react'

// Workspace data with your exact prices - Reordered as requested
const workspaces = [
  {
    id: 1,
    name: "Executive Boardroom",
    capacity: "16-20 people",
    size: "Premium venue",
    image: "/gallery/DJI_20000609074140_0081_D.jpg",
    dailyRate: 12000,
    weeklyRate: null,
    monthlyRate: null,
    amenities: [
      "4K Display Screen",
      "Video Conference System",
      "Premium Sound System",
      "Executive Seating",
      "Whiteboard & Flipchart",
      "Refreshments Available",
    ],
    featured: true,
    popular: false,
    comingSoon: false,
  },
  {
    id: 2,
    name: "Lounge",
    capacity: "Relaxation space",
    size: "Social area",
    image: "/gallery/IMG_0971.jpg",
    dailyRate: null,
    weeklyRate: null,
    monthlyRate: null,
    amenities: [
      "Comfortable Seating",
      "Coffee & Tea",
      "WiFi Access",
      "Social Space",
      "Natural Lighting",
      "Refreshments",
    ],
    featured: false,
    popular: false,
    comingSoon: true,
  },
  {
    id: 3,
    name: "Kids Zone",
    capacity: "Family friendly",
    size: "Play area",
    image: "/gallery/IMG_0975.jpg",
    dailyRate: null,
    weeklyRate: null,
    monthlyRate: null,
    amenities: [
      "Safe Play Area",
      "Educational Toys",
      "Supervised Space",
      "Parent Lounge",
      "Entertainment",
      "Refreshments",
    ],
    featured: false,
    popular: false,
    comingSoon: true,
  },
]

export function SpacesClient() {
  const [currentBgImage, setCurrentBgImage] = useState(0)
  const [selectedSpace, setSelectedSpace] = useState<number | null>(null)

  const heroBackgrounds = [
    '/gallery/DJI_20000609063058_0006_D.jpg',
    '/gallery/DJI_20000609063128_0009_D.jpg',
    '/gallery/DJI_20000609064227_0023_D.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number | null) => {
    if (price === null) return null
    return `KES ${price.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFFF0]/50 to-white">
      <Breadcrumbs items={[{ name: "Products & Book", path: "/products" }, { name: "Spaces" }]} />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Carousel Background */}
        <div className="absolute inset-0 z-0">
          {heroBackgrounds.map((bg, index) => (
            <div
              key={bg}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentBgImage ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={bg}
                alt={`Workspace ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
        </div>

        {/* Frosted Glass Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div 
              className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-10 shadow-2xl"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]" />
                  <Monitor className="w-10 h-10 text-[#D4AF37]" />
                  <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                  Choose Your Meeting Space
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 drop-shadow-md">
                  Premium workspaces designed for productivity and success
                </p>
                
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm px-5 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    {workspaces.length} Options
                  </Badge>
                  <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm px-5 py-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Flexible Booking
                  </Badge>
                </div>
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {heroBackgrounds.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBgImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentBgImage 
                      ? 'w-8 bg-[#D4AF37]' 
                      : 'bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-[5]" />
      </section>

      {/* Workspaces Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {workspaces.map((space) => (
              <div
                key={space.id}
                className="group relative"
              >
                {/* Featured/Popular Badges */}
                {(space.featured || space.popular) && (
                  <div className="absolute top-4 right-4 z-20 flex gap-2">
                    {space.popular && (
                      <Badge className="bg-[#D4AF37] text-white border-none shadow-lg">
                        Most Popular
                      </Badge>
                    )}
                    {space.featured && (
                      <Badge className="bg-gradient-to-r from-[#5C4033] to-[#3D2A22] text-white border-none shadow-lg">
                        Featured
                      </Badge>
                    )}
                  </div>
                )}

                {/* Frosted Glass Card */}
                <div 
                  className="backdrop-blur-xl bg-white/90 border border-[#D4AF37]/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col"
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Image Section */}
                  <div className="relative h-56 overflow-hidden group">
                    <Image
                      src={space.image}
                      alt={space.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Coming Soon Badge or Capacity Badge */}
                    <div className="absolute top-4 left-4">
                      {space.comingSoon ? (
                        <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white backdrop-blur-sm border-none animate-pulse">
                          Coming Soon
                        </Badge>
                      ) : (
                        <Badge className="bg-white/90 text-[#5C4033] backdrop-blur-sm border-none">
                          <Users className="w-3 h-3 mr-1" />
                          {space.capacity}
                        </Badge>
                      )}
                    </div>

                    {/* Size Badge */}
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="outline" className="border-white/60 bg-white/10 text-white backdrop-blur-sm">
                        <Maximize2 className="w-3 h-3 mr-1" />
                        {space.size}
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-[#5C4033] mb-4">{space.name}</h3>

                    {/* Pricing Table */}
                    {!space.comingSoon && (
                      <div className="mb-6 space-y-2 bg-[#FFFFF0]/50 rounded-lg p-4 border border-[#D4AF37]/10">
                        {space.dailyRate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#5C4033]/70">Daily Rate:</span>
                            <span className="font-bold text-[#D4AF37]">{formatPrice(space.dailyRate)}</span>
                          </div>
                        )}
                        {space.weeklyRate && (
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#5C4033]/70">Weekly Rate:</span>
                            <span className="font-semibold text-[#5C4033]">{formatPrice(space.weeklyRate)}</span>
                          </div>
                        )}
                        {space.monthlyRate && (
                          <div className="flex justify-between items-center pt-2 border-t border-[#D4AF37]/20">
                            <span className="text-sm font-semibold text-[#5C4033]">Monthly Rate:</span>
                            <span className="font-bold text-[#D4AF37] text-lg">{formatPrice(space.monthlyRate)}</span>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {space.comingSoon && (
                      <div className="mb-6 bg-gradient-to-r from-[#D4AF37]/10 to-[#B8941F]/10 rounded-lg p-6 border border-[#D4AF37]/30 text-center">
                        <p className="text-lg font-semibold text-[#5C4033] mb-2">Coming Soon</p>
                        <p className="text-sm text-[#5C4033]/70">Stay tuned for updates on this exciting new space!</p>
                      </div>
                    )}

                    {/* Amenities */}
                    <div className="mb-6 flex-1">
                      <h4 className="text-sm font-semibold text-[#5C4033] mb-3 uppercase tracking-wide">
                        Amenities Included:
                      </h4>
                      <ul className="grid grid-cols-2 gap-2">
                        {space.amenities.map((amenity, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-[#5C4033]/80">
                            <Check className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                            <span className="leading-tight">{amenity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Book Button */}
                    {space.comingSoon ? (
                      <Button
                        disabled
                        className="w-full bg-gray-300 text-gray-500 cursor-not-allowed"
                      >
                        Coming Soon
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white shadow-lg hover:shadow-xl transition-all"
                      >
                        <Link href="/book">
                          Book Now
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5C4033] to-[#3D2A22]">
        <div className="container mx-auto px-4">
          <div 
            className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 text-center"
            style={{
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <Calendar className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Schedule a tour and let us help you find the perfect workspace
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white px-10 py-6 text-lg"
              >
                <Link href="/book-tour">
                  Schedule a Tour
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-10 py-6 text-lg"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

