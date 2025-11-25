'use client'

import { useState, useEffect } from 'react'
import { Breadcrumbs } from "@/components/site/Breadcrumbs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Award, TrendingUp, Users, Building2, Quote, ArrowRight } from 'lucide-react'

// Success stories data
const successStories = [
  {
    id: 1,
    name: "Sarah Kimani",
    role: "Founder & CEO",
    company: "TechHub Kenya",
    industry: "Technology",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    story: "Starting from a single desk at WorkNest, we've grown into a team of 15 and secured $500K in funding. The collaborative environment and networking opportunities were invaluable.",
    achievement: "Grew from 1 to 15 employees",
    duration: "2 years at WorkNest",
    featured: true,
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Creative Director",
    company: "Pixel Perfect Studio",
    industry: "Design & Marketing",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
    story: "WorkNest provided the professional space and creative energy I needed to scale my design agency. The amenities and community support made all the difference.",
    achievement: "3x revenue growth",
    duration: "18 months at WorkNest",
    featured: true,
  },
  {
    id: 3,
    name: "Grace Wanjiru",
    role: "Consultant",
    company: "Business Advisory Services",
    industry: "Consulting",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    story: "As a solo consultant, WorkNest gave me credibility with a professional address and meeting rooms. I've tripled my client base and built lasting partnerships.",
    achievement: "200+ successful consultations",
    duration: "3 years at WorkNest",
    featured: false,
  },
  {
    id: 4,
    name: "Michael Otieno",
    role: "Co-founder",
    company: "AgriTech Solutions",
    industry: "Agriculture & Tech",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    story: "The flexible workspace allowed us to scale efficiently. We started with 2 desks and now occupy a full private office. WorkNest adapted to our growth.",
    achievement: "Expanded to 3 counties",
    duration: "1.5 years at WorkNest",
    featured: false,
  },
  {
    id: 5,
    name: "Mercy Akinyi",
    role: "Founder",
    company: "EduTech Innovations",
    industry: "Education Technology",
    image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
    story: "WorkNest's supportive community helped me overcome early challenges. The networking events connected me with mentors and partners who shaped my success.",
    achievement: "10,000+ students impacted",
    duration: "2.5 years at WorkNest",
    featured: true,
  },
  {
    id: 6,
    name: "James Mwangi",
    role: "CEO",
    company: "FinTech Ventures",
    industry: "Financial Technology",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    story: "From bootstrapping in a shared desk to raising Series A funding. WorkNest was more than a workspace—it was our launchpad to success.",
    achievement: "$1M funding raised",
    duration: "2 years at WorkNest",
    featured: false,
  },
]

export function SuccessStoriesClient() {
  const [currentBgImage, setCurrentBgImage] = useState(0)

  const heroBackgrounds = [
    '/gallery/DJI_20000609074329_0089_D.jpg', // Community gathering
    '/gallery/DJI_20000609075054_0111_D.jpg', // Collaboration
    '/gallery/DJI_20000609075339_0118_D.jpg', // Members
  ]

  // Auto-rotate background
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const featuredStories = successStories.filter(s => s.featured)
  const regularStories = successStories.filter(s => !s.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFFF0]/50 to-white">
      <Breadcrumbs items={[{ name: "Discover Us", path: "/discover" }, { name: "Success Stories" }]} />

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
                alt={`Success Background ${index + 1}`}
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
                  <Award className="w-10 h-10 text-[#D4AF37]" />
                  <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                  Success Stories
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 drop-shadow-md">
                  Inspiring journeys from our WorkNest community members
                </p>
                
                <div className="flex items-center justify-center gap-3 flex-wrap">
                  <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm px-5 py-2">
                    <Users className="w-4 h-4 mr-2" />
                    {successStories.length} Stories
                  </Badge>
                  <Badge variant="outline" className="border-white/40 bg-white/10 text-white backdrop-blur-sm px-5 py-2">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Growing Community
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

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-[5]" />
      </section>

      {/* Featured Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">Featured Success Stories</h2>
            <p className="text-lg text-[#5C4033]/70 max-w-2xl mx-auto">
              Exceptional achievements from our community members
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {featuredStories.map((story) => (
              <div
                key={story.id}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500"
              >
                {/* Background with gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#5C4033] to-[#3D2A22] opacity-95" />
                
                {/* Frosted glass card */}
                <div 
                  className="relative backdrop-blur-sm bg-white/5 border border-white/10 p-8 md:p-10"
                  style={{
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Profile Image */}
                    <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] p-1">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={story.image}
                            alt={story.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      {/* Featured badge */}
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-white mb-1">{story.name}</h3>
                        <p className="text-[#D4AF37] font-semibold">{story.role}</p>
                        <p className="text-white/70 text-sm">{story.company}</p>
                      </div>

                      {/* Quote icon */}
                      <Quote className="w-8 h-8 text-[#D4AF37]/30 mb-3" />

                      <p className="text-white/90 leading-relaxed mb-6 italic">
                        "{story.story}"
                      </p>

                      <div className="flex flex-wrap gap-3">
                        <Badge className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/30">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {story.achievement}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                          {story.duration}
                        </Badge>
                        <Badge variant="outline" className="border-white/30 text-white">
                          <Building2 className="w-3 h-3 mr-1" />
                          {story.industry}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Stories Grid */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">More Success Stories</h2>
            <p className="text-lg text-[#5C4033]/70">
              Every member has a unique journey at WorkNest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {regularStories.map((story) => (
              <div
                key={story.id}
                className="group"
              >
                {/* Frosted glass card */}
                <div 
                  className="backdrop-blur-xl bg-white/80 border border-[#D4AF37]/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 h-full"
                  style={{
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Profile Section */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] p-0.5">
                        <div className="relative w-full h-full rounded-full overflow-hidden bg-white">
                          <Image
                            src={story.image}
                            alt={story.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-[#5C4033] text-lg">{story.name}</h3>
                      <p className="text-[#D4AF37] text-sm font-semibold">{story.role}</p>
                      <p className="text-[#5C4033]/60 text-xs">{story.company}</p>
                    </div>
                  </div>

                  {/* Story */}
                  <Quote className="w-6 h-6 text-[#D4AF37]/20 mb-2" />
                  <p className="text-[#5C4033]/80 leading-relaxed mb-6 italic text-sm">
                    "{story.story}"
                  </p>

                  {/* Badges */}
                  <div className="space-y-2">
                    <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 w-full justify-start">
                      <TrendingUp className="w-3 h-3 mr-2" />
                      {story.achievement}
                    </Badge>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="border-[#5C4033]/20 text-[#5C4033] text-xs">
                        {story.duration}
                      </Badge>
                      <Badge variant="outline" className="border-[#5C4033]/20 text-[#5C4033] text-xs">
                        {story.industry}
                      </Badge>
                    </div>
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
            <Award className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Join our thriving community and take your business to the next level
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
                <Link href="/book">Book a Space</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

