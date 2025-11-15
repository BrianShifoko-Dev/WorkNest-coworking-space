'use client'

import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { WorkspaceCarousel } from "@/components/site/WorkspaceCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/site/BookingForm";
import { Users, Monitor, Wifi, Coffee, Clock, Video, Projector, CheckCircle2 } from "lucide-react";

export function BoardroomsClient() {
  const boardrooms = [
    {
      name: "Executive Boardroom",
      capacity: "16-20 people",
      size: "45 sqm",
      hourlyRate: "KES 2,500",
      halfDayRate: "KES 6,000",
      fullDayRate: "KES 12,000",
      images: [
        { url: "/gallery/IMG_0073.jpg", title: "Executive Boardroom", description: "Premium boardroom with executive seating for 16-20 people" },
        { url: "/gallery/IMG_0081.jpg", title: "Executive Boardroom", description: "State-of-the-art presentation and video conferencing setup" },
        { url: "/gallery/IMG_0073.jpg", title: "Executive Boardroom", description: "Professional ambiance perfect for board meetings" },
      ],
      description: "Our flagship boardroom designed for high-level meetings and presentations. Features state-of-the-art AV equipment, executive seating for up to 16 guests, and a professional ambiance perfect for board meetings, investor pitches, and strategic planning sessions.",
      features: [
        "4K Display Screen",
        "Video Conferencing System",
        "Premium Sound System",
        "Executive Seating",
        "Whiteboard & Flipchart",
        "Climate Control",
      ],
    },
    {
      name: "Meeting Room - Large",
      capacity: "6-8 people",
      size: "30 sqm",
      hourlyRate: "KES 1,000",
      halfDayRate: "KES 4,000",
      fullDayRate: "KES 7,000",
      images: [
        { url: "/gallery/IMG_0073.jpg", title: "Meeting Room - Large", description: "Spacious meeting room for 6-8 people with modern setup" },
        { url: "/gallery/IMG_0081.jpg", title: "Meeting Room - Large", description: "HD display and presentation tools for workshops" },
        { url: "/gallery/IMG_0073.jpg", title: "Meeting Room - Large", description: "Professional environment for client presentations" },
      ],
      description: "Spacious meeting room ideal for team workshops, client presentations, and collaborative sessions. Equipped with HD display, video conferencing capabilities, and comfortable seating for productive discussions.",
      features: [
        "HD Display",
        "Video Calling Setup",
        "High-Speed WiFi",
        "Conference Table",
        "Presentation Tools",
        "Refreshments Available",
      ],
    },
  ];

  const amenities = [
    { icon: Projector, title: "AV Equipment", description: "Professional presentation tools" },
    { icon: Video, title: "Video Conferencing", description: "HD cameras and microphones" },
    { icon: Wifi, title: "High-Speed WiFi", description: "Dedicated fiber connection" },
    { icon: Coffee, title: "Refreshments", description: "Complimentary coffee & tea" },
    { icon: Monitor, title: "Smart Displays", description: "4K screens in all rooms" },
    { icon: Clock, title: "Flexible Booking", description: "Hourly, half-day, or full-day" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Products & Book" }, { name: "Boardrooms" }]}
      />

      {/* Hero */}
      <section className="relative h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 z-10" />
        <img
          src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1920&q=80"
          alt="Professional Boardrooms in Eldoret"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="bg-[#D4AF37] text-[#5C4033] mb-4 px-4 py-1">
              Premium Meeting Spaces
            </Badge>
            <h1 className="text-5xl mb-4 font-playfair">Professional Boardrooms in Eldoret</h1>
            <p className="text-xl max-w-3xl mx-auto">
              State-of-the-art meeting rooms designed for presentations, client meetings, 
              and important discussions
            </p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">Impress Clients, Close Deals</h2>
            <p className="text-xl text-[#5C4033]/70 mb-8">
              Our fully-equipped boardrooms provide the perfect setting for board meetings, client 
              presentations, team workshops, and important discussions. Book by the hour, half-day, 
              or full day with all amenities included.
            </p>
          </div>
        </div>
      </section>

      {/* Boardroom Options */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Choose Your Meeting Space</h2>
          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {boardrooms.map((room, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all border border-[#5C4033]/10 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <Badge className="absolute top-4 right-4 bg-[#D4AF37] text-[#5C4033] z-10">
                    <Users className="w-3 h-3 mr-1" />
                    {room.capacity}
                  </Badge>
                  <WorkspaceCarousel images={room.images} />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl text-[#5C4033] mb-2 font-playfair">{room.name}</h3>
                  <p className="text-sm text-[#5C4033]/60 mb-6">{room.size}</p>

                  {/* Pricing */}
                  <div className="bg-[#FFFFF0] rounded-lg p-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">Hourly Rate:</span>
                        <span className="text-[#D4AF37] font-semibold">{room.hourlyRate}/hr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">Half Day (4hrs):</span>
                        <span className="text-[#D4AF37] font-semibold">{room.halfDayRate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#5C4033]/70">Full Day (8hrs):</span>
                        <span className="text-[#D4AF37] font-semibold">{room.fullDayRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {room.features.map((feature, idx) => (
                      <li key={idx} className="text-sm text-[#5C4033]/70 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href="/book-tour">
                    <Button className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]">
                      Book Now
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Everything You Need</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex gap-4 p-6 bg-[#FFFFF0] rounded-lg border border-[#5C4033]/10 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#D4AF37]/15 rounded-lg flex items-center justify-center flex-shrink-0">
                  <amenity.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-[#5C4033] mb-1 font-semibold">{amenity.title}</h4>
                  <p className="text-sm text-[#5C4033]/60">{amenity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-4 text-4xl font-playfair">Book Your Boardroom</h2>
            <p className="text-center text-[#5C4033]/70 mb-12 max-w-2xl mx-auto">
              Reserve your preferred meeting space today. Our team will confirm availability 
              and prepare the room to your specifications.
            </p>
            <div className="bg-white rounded-lg shadow-lg p-8 border border-[#5C4033]/10">
              <BookingForm variant="full" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-white mb-4 text-3xl font-playfair">Need Help Choosing?</h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Our team can help you select the perfect boardroom for your meeting needs 
            and provide custom setup options.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] px-8 py-6 text-lg">
                Contact Us
              </Button>
            </Link>
            <Link href="/book-tour">
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-[#5C4033] px-8 py-6 text-lg"
              >
                Schedule a Tour
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

