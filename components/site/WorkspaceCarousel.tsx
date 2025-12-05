'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { ImageLightbox } from './ImageLightbox'

interface WorkspaceCarouselProps {
  images: {
    url: string
    title: string
    description?: string
  }[]
}

export function WorkspaceCarousel({ images }: WorkspaceCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No image available</span>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full h-full group">
        {/* Main Image */}
        <Image
          src={images[currentIndex].url}
          alt={images[currentIndex].title}
          fill
          className="object-cover transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={() => setLightboxOpen(true)}
            className="bg-[#D4AF37] text-[#5C4033] px-4 py-2 rounded-lg flex items-center gap-2 transform scale-90 group-hover:scale-100 transition-transform"
          >
            <ZoomIn className="w-4 h-4" />
            View Full Size
          </button>
        </div>

        {/* Navigation Arrows - Show on hover if multiple images */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#5C4033] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#5C4033] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-[#D4AF37] w-6'
                      : 'bg-white/60 hover:bg-white/80'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded z-10">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={images}
        currentIndex={currentIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}

