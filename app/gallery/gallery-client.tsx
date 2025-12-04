'use client'

import { useState, useEffect } from 'react'
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Camera, Grid3x3, LayoutGrid, Maximize2 } from 'lucide-react';

// Selected gallery images only
const galleryImages = [
  { id: 1, src: '/gallery/DJI_20000609070609_0057_D.jpg' },
  { id: 2, src: '/gallery/DJI_20000609071222_0066_D.jpg' },
  { id: 3, src: '/gallery/DJI_20000609074809_0100_D.jpg' },
  { id: 4, src: '/gallery/DJI_20000609075456_0128_D.jpg' },
  { id: 5, src: '/gallery/DJI_20000609065230_0035_D(1).jpg' },
  { id: 6, src: '/gallery/DJI_20000609074329_0089_D.jpg' },
  { id: 7, src: '/gallery/IMG_0971.jpg' },
]

export function GalleryClient() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [currentBgImage, setCurrentBgImage] = useState(0)

  const heroBackgrounds = [
    '/gallery/DJI_20000609070609_0057_D.jpg',
    '/gallery/DJI_20000609071222_0066_D.jpg',
    '/gallery/DJI_20000609074809_0100_D.jpg',
  ]

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgImage((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000) // Change every 5 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-[#FFFFF0]/50 to-white">
      <Breadcrumbs items={[{ name: "Discover Us", path: "/discover" }, { name: "Gallery" }]} />

      {/* Hero Section with Carousel Background */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Carousel Background Images */}
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
                alt={`WorkNest Background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />
        </div>

        {/* Frosted Glass Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto">
            {/* Smaller Frosted Glass Card */}
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
                  <Camera className="w-10 h-10 text-[#D4AF37]" />
                  <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]" />
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                  The WorkNest Gallery
                </h1>
                
                <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-6 drop-shadow-md">
                  Explore our beautifully designed workspace environments in Eldoret
                </p>
                
                <div className="flex items-center justify-center gap-3">
                  <Badge 
                    variant="outline" 
                    className="border-white/40 bg-white/10 text-white backdrop-blur-sm px-5 py-2"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    {galleryImages.length} Photos
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
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FFFFF0] to-transparent z-[5]" />
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                {/* Image */}
                <Image
                  src={image.src}
                  alt={`WorkNest Gallery ${image.id}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                
                {/* Simple Overlay with Zoom Icon */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                      <Maximize2 className="w-6 h-6 text-[#5C4033]" />
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
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Experience It Yourself?
            </h3>
            <p className="text-xl text-white/80 mb-10">
              Book a tour and see our premium workspace environments in person
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white px-10 py-6 text-lg"
              >
                <Link href="/book-tour">Schedule a Tour</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-10 py-6 text-lg"
              >
                <Link href="/book">Book a Space Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ✕
          </button>
          
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            <Image
              src={galleryImages[selectedImage].src}
              alt={`WorkNest Photo ${selectedImage + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
            
            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3">
              <p className="text-white text-lg font-semibold">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>

            {/* Previous Button */}
            {selectedImage > 0 && (
              <button
                className="absolute left-4 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors text-2xl"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(selectedImage - 1)
                }}
              >
                ‹
              </button>
            )}

            {/* Next Button */}
            {selectedImage < galleryImages.length - 1 && (
              <button
                className="absolute right-4 w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-colors text-2xl"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImage(selectedImage + 1)
                }}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

