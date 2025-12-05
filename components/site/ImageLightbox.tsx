'use client'

import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Image from "next/image";

interface ImageLightboxProps {
  images: {
    url: string;
    title: string;
    description?: string;
  }[];
  currentIndex: number;
  onClose: () => void;
  open: boolean;
}

export function ImageLightbox({ images, currentIndex, onClose, open }: ImageLightboxProps) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  const currentImage = images[activeIndex];

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-7xl w-[95vw] h-[95vh] p-0 overflow-hidden border-2"
        style={{
          background: "#0A0A0A",
          borderColor: "#D4AF37",
        }}
      >
        <DialogTitle className="sr-only">{currentImage?.title}</DialogTitle>
        <DialogDescription className="sr-only">
          {currentImage?.description || "View full size image"}
        </DialogDescription>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-3 rounded-lg transition-all duration-300 hover:scale-110 shadow-xl"
          style={{
            background: "#D4AF37",
            color: "#5C4033",
          }}
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-lg transition-all duration-300 hover:scale-110 shadow-xl"
              style={{
                background: "rgba(212, 175, 55, 0.95)",
                color: "#5C4033",
              }}
              aria-label="Previous image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 p-4 rounded-lg transition-all duration-300 hover:scale-110 shadow-xl"
              style={{
                background: "rgba(212, 175, 55, 0.95)",
                color: "#5C4033",
              }}
              aria-label="Next image"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </>
        )}

        {/* Main Content Area */}
        <div className="flex flex-col h-full">
          {/* Image Container - Takes most of the space */}
          <div className="relative flex-1 flex items-center justify-center p-8 overflow-hidden">
            <Image
              src={currentImage?.url || ''}
              alt={currentImage?.title || ''}
              width={1920}
              height={1080}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              style={{
                boxShadow: "0 20px 60px rgba(212, 175, 55, 0.3)",
                width: 'auto',
                height: 'auto',
              }}
              unoptimized
            />
          </div>

          {/* Image Info Panel - Fixed height at bottom */}
          <div 
            className="p-8 border-t-2"
            style={{ 
              background: "linear-gradient(180deg, rgba(92, 64, 51, 0.98) 0%, rgba(92, 64, 51, 1) 100%)",
              borderColor: "#D4AF37",
              minHeight: "140px",
            }}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 
                  className="text-3xl"
                  style={{ color: "#D4AF37" }}
                >
                  {currentImage?.title}
                </h3>
                {images.length > 1 && (
                  <div 
                    className="px-4 py-2 rounded-lg text-sm shrink-0"
                    style={{
                      background: "rgba(212, 175, 55, 0.2)",
                      color: "#D4AF37",
                      border: "1px solid rgba(212, 175, 55, 0.4)",
                    }}
                  >
                    {activeIndex + 1} / {images.length}
                  </div>
                )}
              </div>
              {currentImage?.description && (
                <p 
                  className="text-lg leading-relaxed"
                  style={{ color: "#FFFFF0" }}
                >
                  {currentImage?.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface SpaceImageProps {
  src: string;
  alt: string;
  title: string;
  description?: string;
  allImages?: {
    url: string;
    title: string;
    description?: string;
  }[];
  className?: string;
}

export function SpaceImage({ 
  src, 
  alt, 
  title, 
  description, 
  allImages,
  className = "" 
}: SpaceImageProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = allImages || [{ url: src, title, description }];
  const currentIndex = allImages 
    ? allImages.findIndex(img => img.url === src)
    : 0;

  return (
    <>
      <div 
        className={`cursor-pointer group relative overflow-hidden ${className}`}
        onClick={() => setLightboxOpen(true)}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 px-6 py-3 rounded-lg shadow-xl" style={{
            background: "#D4AF37",
            color: "#5C4033",
          }}>
            <svg className="w-6 h-6 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
            View Full Size
          </div>
        </div>
      </div>

      <ImageLightbox
        images={images}
        currentIndex={Math.max(0, currentIndex)}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}

