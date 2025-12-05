'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Users,
  Coffee,
  Calendar,
  Building,
  Phone,
  TrendingUp,
  Shield,
  MapPin,
  Network,
  Clock,
  Star,
  CheckCircle,
  Award,
  Target,
  Heart,
  ArrowRight,
  Play,
  Zap,
  Globe,
  MessageCircle,
  Monitor,
  Layout,
} from "lucide-react";
import Link from "next/link";
import { BookingForm } from "@/components/site/BookingForm";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SpaceImage } from "@/components/site/ImageLightbox";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useCurrency } from "@/components/providers/CurrencyProvider";

// Hero slides will use translation keys instead of hardcoded text
const getHeroSlides = (t: (key: string) => string) => [
  {
    image: "/gallery/DJI_20000609070609_0057_D.jpg",
    title: t('hero.title1'),
    subtitle: t('hero.subtitle1'),
  },
  {
    image: "/gallery/DJI_20000609074712_0098_D.jpg",
    title: t('hero.title2'),
    subtitle: t('hero.subtitle2'),
  },
  {
    image: "/gallery/DJI_20000609074357_0094_D.jpg",
    title: t('hero.title3'),
    subtitle: t('hero.subtitle3'),
  },
  {
    image: "/gallery/IMG_0971.jpg",
    title: t('hero.title1'),
    subtitle: t('hero.subtitle1'),
  },
  {
    image: "/gallery/DJI_20000609065230_0035_D(1).jpg",
    title: t('hero.title2'),
    subtitle: t('hero.subtitle2'),
  },
  {
    image: "/gallery/DJI_20000609071150_0065_D.jpg",
    title: t('hero.title3'),
    subtitle: t('hero.subtitle3'),
  },
];

// Static fallback spaces factory function (needs translations and currency)
const getStaticFallbackSpaces = (t: (key: string) => string, formatPrice: (amount: number, period?: string) => string) => [
  {
    title: t("spaces.privateOffices"),
    description: t("spaces.privateOfficesDesc"),
    image: "/gallery/DJI_20000609074809_0100_D.jpg",
    link: "/office-spaces",
    price: `${t("spaces.from")} ${formatPrice(2500, t("price.day"))}`,
  },
  {
    title: t("spaces.meetingRooms"),
    description: t("spaces.meetingRoomsDesc"),
    image: "/gallery/DJI_20000609075034_0108_D.jpg",
    link: "/boardrooms",
    price: `${t("spaces.from")} ${formatPrice(2500, t("price.hour"))}`,
  },
  {
    title: t("spaces.eventSpaces"),
    description: t("spaces.eventSpacesDesc"),
    image: "https://images.unsplash.com/photo-1759873148521-c49d9497cf64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHNwYWNlJTIwdmVudWV8ZW58MXx8fHwxNzYyMTgyNDEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/events",
    price: t("spaces.requestQuote"),
  },
  {
    title: t("spaces.callPods"),
    description: t("spaces.callPodsDesc"),
    image: "https://images.unsplash.com/photo-1716703435698-031227389c1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWxlcGhvbmUlMjBib290aHxlbnwxfHx8fDE3NjIyMzM2Mjl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    link: "/call-pods",
    price: `${t("spaces.from")} ${formatPrice(250, t("price.hour"))}`,
  },
  {
    title: t("spaces.kidsZone"),
    description: t("spaces.kidsZoneDesc"),
    image: "/gallery/28813a126a418396b4062ab859168dc4.jpg",
    link: "/kids-zone",
    price: t("spaces.comingSoon"),
  },
];

const upcomingEvents = [
  {
    title: "Startup Pitch Night",
    date: "November 15, 2025",
    time: "6:00 PM - 9:00 PM",
    description:
      "Watch emerging startups pitch their innovative ideas to investors and mentors",
    category: "Networking",
  },
  {
    title: "Digital Marketing Masterclass",
    date: "November 22, 2025",
    time: "2:00 PM - 5:00 PM",
    description:
      "Learn advanced strategies to grow your business online with industry experts",
    category: "Workshop",
  },
  {
    title: "Women in Business Lunch",
    date: "November 28, 2025",
    time: "12:00 PM - 2:00 PM",
    description:
      "Connect with fellow female entrepreneurs over a premium lunch experience",
    category: "Community",
  },
];

const magazineArticles = [
  {
    title: "5 Tips for Productive Remote Work in Kenya",
    category: "Workstyle Tips",
    image:
      "https://images.unsplash.com/photo-1559310451-19481b3c7ec8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMHBlb3BsZSUyMHdvcmtpbmd8ZW58MXx8fHwxNzYyMjQwNDI2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt:
      "Discover how successful professionals are maximizing productivity in flexible workspaces...",
    slug: "5-tips-productive-remote-work",
  },
  {
    title: "How Sarah Built Her Tech Startup at The WorkNest",
    category: "Success Stories",
    image:
      "https://images.unsplash.com/photo-1720700126957-769e2f2fc0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZW55YSUyMGJ1c2luZXNzJTIwdGVhbSUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzYyMjQwNDI0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt:
      "From a one-person team to a thriving 15-member company, here's Sarah's inspiring journey...",
    slug: "sarah-tech-startup-story",
  },
  {
    title: "The Future of Coworking in East Africa",
    category: "Inside Kenya Spaces",
    image:
      "https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyMjAwMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt:
      "Exploring the trends shaping workspace design and business culture across Kenya and beyond...",
    slug: "future-coworking-east-africa",
  },
];

export function HomePageClient() {
  const { t } = useLanguage();
  const { formatPrice } = useCurrency();
  const heroSlides = getHeroSlides(t); // Get translated hero slides
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSpaceIndex, setCurrentSpaceIndex] = useState(0);
  const [isFormActive, setIsFormActive] = useState(false);
  const staticSpaces = getStaticFallbackSpaces(t, formatPrice);
  const [featuredSpaces, setFeaturedSpaces] = useState(staticSpaces);
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loadingSpaces, setLoadingSpaces] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  
  // Update static spaces when language/currency changes
  useEffect(() => {
    const updatedSpaces = getStaticFallbackSpaces(t, formatPrice);
    setFeaturedSpaces(prev => {
      // Only update if we're using static spaces (not from database)
      // Check if current spaces match the pattern of static spaces
      const isUsingStaticSpaces = prev.length >= 5 && prev.some(s => s.link === '/office-spaces');
      if (isUsingStaticSpaces) {
        return updatedSpaces;
      }
      return prev;
    });
  }, [t, formatPrice]);

  // Fetch featured spaces from database
  useEffect(() => {
    fetchFeaturedSpaces();
  }, []);

  // Fetch upcoming events from database
  useEffect(() => {
    fetchUpcomingEvents();
  }, []);

  // Helper function to determine route based on space name/type
  const getSpaceRoute = (space: any): string => {
    const name = (space.name || '').toLowerCase();
    const type = (space.type || '').toLowerCase();
    
    // Route based on space name keywords
    if (name.includes('executive') || name.includes('office') || type === 'office') {
      return '/office-spaces';
    }
    if (name.includes('event') || name.includes('hall') || type === 'event' || type === 'event space') {
      return '/event-spaces';
    }
    if (name.includes('conference') || name.includes('boardroom') || name.includes('meeting') || type === 'boardroom' || type === 'meeting room') {
      return '/boardrooms';
    }
    
    // Default fallback
    return `/book?space=${space.id}`;
  };

  const fetchFeaturedSpaces = async () => {
    try {
      const response = await fetch('/api/spaces?featured=true');
      if (response.ok) {
        const data = await response.json();
        
        // Map database spaces to homepage format
        if (Array.isArray(data) && data.length > 0) {
          const mappedSpaces = data.map((space: any) => ({
            title: space.name,
            description: space.description || 'Premium workspace solution',
            image: space.images && space.images[0] ? space.images[0] : staticSpaces[0].image,
            link: getSpaceRoute(space),
            price: space.monthly_rate 
              ? `${t("spaces.from")} ${formatPrice(space.monthly_rate, t("price.month"))}`
              : space.daily_rate
              ? `${t("spaces.from")} ${formatPrice(space.daily_rate, t("price.day"))}`
              : space.hourly_rate
              ? `${t("spaces.from")} ${formatPrice(space.hourly_rate, t("price.hour"))}`
              : t("spaces.requestQuote"),
          }));
          
          // Combine database spaces with static fallback (database first)
          setFeaturedSpaces([...mappedSpaces, ...staticSpaces]);
        }
      }
    } catch (error) {
      console.error('Error fetching featured spaces:', error);
      // Keep static fallback on error
    } finally {
      setLoadingSpaces(false);
    }
  };

  const fetchUpcomingEvents = async () => {
    try {
      const response = await fetch('/api/events?status=upcoming&featured=true');
      if (response.ok) {
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
          // Take first 3 upcoming events
          const mappedEvents = data.slice(0, 3).map((event: any) => ({
            title: event.title,
            date: new Date(event.event_date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
            time: event.start_time && event.end_time 
              ? `${event.start_time} - ${event.end_time}`
              : 'Time TBA',
            description: event.description || 'Join us for this exciting event',
            category: event.category ? event.category.charAt(0).toUpperCase() + event.category.slice(1) : 'Event',
          }));
          
          setUpcomingEvents(mappedEvents);
        }
      }
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      // Keep empty array on error (static events removed for cleaner look)
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    // Only auto-play carousel if form is not active
    if (isFormActive) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isFormActive]);

  const handleFormInteraction = () => {
    if (!isFormActive) {
      setCurrentSlide(2); // Set to third image (index 2)
      setIsFormActive(true); // Stop carousel auto-play
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsFormActive(true); // Stop auto-play when user manually navigates
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
    setIsFormActive(true); // Stop auto-play when user manually navigates
  };

  const nextSpace = () => {
    setCurrentSpaceIndex((prev) => (prev + 1) % featuredSpaces.length);
  };

  const prevSpace = () => {
    setCurrentSpaceIndex(
      (prev) => (prev - 1 + featuredSpaces.length) % featuredSpaces.length
    );
  };

  return (
    <div className="min-h-screen">
      {/* Trust Indicators Bar */}
      <div
        className="bg-white border-b border-[#5C4033]/10 pt-[6px] pr-[0px] pb-[0px] pl-[0px]"
        data-section="trust-bar"
      >
        <div className="container mx-auto px-4 py-2">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">500+</span>
                <span className="text-[10px] text-[#5C4033]/60">
                  {t("stats.activeMembers")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">20+</span>
                <span className="text-[10px] text-[#5C4033]/60">
                  {t("stats.hotDesks")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">8+</span>
                <span className="text-[10px] text-[#5C4033]/60">
                  {t("stats.dedicatedDesks")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">5+</span>
                <span className="text-[10px] text-[#5C4033]/60">
                  {t("stats.privateOffices")}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">2+</span>
                <span className="text-[10px] text-[#5C4033]/60">{t("stats.meetingRooms")}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-[#5C4033] font-semibold">Since 2025</span>
                <span className="text-[10px] text-[#5C4033]/60">{t("stats.servingKenya")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Carousel with Booking Form */}
      <section
        className="relative h-[600px] overflow-hidden"
        data-section="hero"
      >
        {/* Top Gradient Vignette */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent z-[15] pointer-events-none" />

        {/* Ambient Light Flare - Top Left */}
        <div
          className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl z-[15] pointer-events-none animate-pulse"
          style={{ animationDuration: "4s" }}
        />

        {/* Ambient Light Flare - Bottom Right */}
        <div
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl z-[15] pointer-events-none animate-pulse"
          style={{ animationDuration: "6s", animationDelay: "1s" }}
        />

        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          >
            {/* Enhanced overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center transition-transform duration-700"
              priority={index === 0}
              sizes="100vw"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center md:justify-start md:pt-24">
              <div className="container mx-auto px-4">
                {/* Row 1: Hero Text Content - Centered on mobile, top positioned on desktop with refined typography */}
                <div className="text-white text-center animate-in fade-in slide-in-from-top-4 duration-700 flex flex-col items-center justify-center">
                  <p
                    className="text-xs md:text-sm mb-3 tracking-wide uppercase text-[#D4AF37] max-w-4xl"
                    style={{ letterSpacing: "0.15em", fontWeight: 500 }}
                  >
                    {slide.subtitle}
                  </p>
                  <h1
                    className="text-3xl md:text-5xl lg:text-6xl drop-shadow-2xl max-w-5xl"
                    style={{ fontWeight: 600, lineHeight: 1.1 }}
                  >
                    {slide.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Static Booking Form (Desktop Only) - Stays in place while carousel slides change */}
        <div
          className="hidden lg:flex absolute top-1/2 left-0 right-0 z-30 justify-center pointer-events-none"
          style={{ transform: "translateY(-10%)" }}
        >
          <div className="pointer-events-auto" onClick={handleFormInteraction}>
            <BookingForm variant="hero" />
          </div>
        </div>

        {/* Enhanced Carousel Controls - Hidden on mobile for better readability */}
        <button
          onClick={prevSlide}
          className="hidden lg:block absolute left-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20 hover:border-white/40 hover:scale-110 shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 z-30 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-all border border-white/20 hover:border-white/40 hover:scale-110 shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2 bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsFormActive(true); // Stop auto-play when user manually selects a slide
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-[#D4AF37] w-8 shadow-lg shadow-[#D4AF37]/50"
                  : "bg-white/40 w-2 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Mobile Booking Form */}
      <section
        className="lg:hidden py-8 bg-white"
        data-section="mobile-booking"
      >
        <div className="container mx-auto px-4">
          <BookingForm variant="hero" />
        </div>
      </section>

      {/* Intro / About Preview Section */}
      <section
        className="py-16 bg-[#FFFFF0] px-[0px] py-[48px]"
        data-section="intro-about"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">
              {t("intro.title")}
            </h2>
            <p className="text-[#5C4033]/80 leading-relaxed">
              {t("intro.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card
              className="p-8 text-center border-[#5C4033]/10 bg-white hover:shadow-lg transition-all"
              data-card="who-we-are"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5C4033] mb-3">{t("intro.whoWeAre")}</h3>
              <p className="text-sm text-[#5C4033]/70 mb-4">
                {t("intro.whoWeAreDesc")}
              </p>
            </Card>

            <Card
              className="p-8 text-center border-[#5C4033]/10 bg-white hover:shadow-lg transition-all"
              data-card="our-mission"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5C4033] mb-3">{t("intro.ourMission")}</h3>
              <p className="text-sm text-[#5C4033]/70 mb-4">
                {t("intro.ourMissionDesc")}
              </p>
            </Card>

            <Card
              className="p-8 text-center border-[#5C4033]/10 bg-white hover:shadow-lg transition-all"
              data-card="our-vision"
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="text-xl font-semibold text-[#5C4033] mb-3">{t("intro.ourVision")}</h3>
              <p className="text-sm text-[#5C4033]/70 mb-4">
                {t("intro.ourVisionDesc")}
              </p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              className="bg-[#5C4033] hover:bg-[#4A3329] text-white"
            >
              <Link href="/discover">{t("intro.discoverStory")}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Workspaces Showcase */}
      <section
        className="py-16 bg-white px-[0px] py-[32px]"
        data-section="featured-spaces"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">{t('home.exploreSpaces')}</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              {t("spaces.discoverSolutions")}
            </p>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredSpaces.map((space, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#5C4033]/10 hover:shadow-xl transition-all group"
                data-workspace={space.link}
              >
                <div className="relative h-64 overflow-hidden">
                  <SpaceImage
                    src={space.image}
                    alt={space.title}
                    title={space.title}
                    description={space.description}
                    className="h-full"
                  />
                  <div className="absolute top-4 right-4 z-10 pointer-events-none">
                    <Badge className="bg-[#D4AF37] text-[#5C4033] border-0">
                      {space.price}
                    </Badge>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#5C4033] mb-2">{space.title}</h3>
                  <p className="text-sm text-[#5C4033]/70 mb-4">
                    {space.description}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-0"
                  >
                    <Link href={space.link}>
                      {t('common.bookNow')} <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Mobile Grid View - 2 columns, show at least 6 spaces */}
          <div className="md:hidden grid grid-cols-2 gap-4">
            {featuredSpaces.slice(0, 6).map((space, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#5C4033]/10"
                data-workspace={space.link}
              >
                <div className="relative h-40 overflow-hidden">
                  <SpaceImage
                    src={space.image}
                    alt={space.title}
                    title={space.title}
                    description={space.description}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 z-10 pointer-events-none">
                    <Badge className="bg-[#D4AF37] text-[#5C4033] border-0 text-xs">
                      {space.price}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-[#5C4033] mb-1 line-clamp-1">
                    {space.title}
                  </h3>
                  <p className="text-xs text-[#5C4033]/70 mb-3 line-clamp-2">
                    {space.description}
                  </p>
                  <Button
                    asChild
                    variant="ghost"
                    className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-0 h-auto text-xs"
                  >
                    <Link href={space.link}>
                      {t('common.bookNow')} <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              variant="outline"
              className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
            >
              <Link href="/office-spaces">{t('home.viewAll')} Spaces</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-[#FFFFF0]" data-section="why-choose-us">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">{t('home.whyChoose')}</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Experience the difference that premium amenities and thoughtful
              design make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group" data-feature="flexible-plans">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all">
                <Calendar className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Flexible Plans</h3>
              <p className="text-sm text-[#5C4033]/70">
                Daily, monthly, or yearly memberships that adapt to your
                business needs
              </p>
            </div>

            <div className="text-center group" data-feature="prime-locations">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all">
                <MapPin className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Prime Location</h3>
              <p className="text-sm text-[#5C4033]/70">
                Strategically located in Eldoret's most accessible business
                district
              </p>
            </div>

            <div className="text-center group" data-feature="modern-design">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all">
                <Zap className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Modern Design</h3>
              <p className="text-sm text-[#5C4033]/70">
                Aesthetically stunning spaces with ergonomic furniture and
                natural lighting
              </p>
            </div>

            <div className="text-center group" data-feature="community-network">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all">
                <Network className="w-10 h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Vibrant Community</h3>
              <p className="text-sm text-[#5C4033]/70">
                Network with 500+ professionals, entrepreneurs, and innovators
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div
              className="text-center p-4 bg-white rounded-lg"
              data-amenity="wifi"
            >
              <CheckCircle className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-sm text-[#5C4033]">High-Speed WiFi</p>
            </div>
            <div
              className="text-center p-4 bg-white rounded-lg"
              data-amenity="access"
            >
              <Clock className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-sm text-[#5C4033]">Convenient Access Hours</p>
            </div>
            <div
              className="text-center p-4 bg-white rounded-lg"
              data-amenity="security"
            >
              <Shield className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-sm text-[#5C4033]">Secure Premises</p>
            </div>
            <div
              className="text-center p-4 bg-white rounded-lg"
              data-amenity="cafe"
            >
              <Coffee className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
              <p className="text-sm text-[#5C4033]">On-Site Café</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Spaces in Action */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        data-section="spaces-in-action"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1750124662229-47a8e16b8f14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzYyMjAwMDY1fDA&ixlib=rb-4.1.0&q=80&w=1080)`,
        }}
      >
        <div className="absolute inset-0 bg-[#5C4033]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
              <Play className="w-10 h-10 text-[#5C4033]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Work, Connect, and Grow in Style
            </h2>
            <p className="text-xl mb-8 text-white/90">
              See how our members are transforming their businesses in inspiring
              environments
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                asChild
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                <Link href="/gallery">Explore Gallery</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#5C4033]"
              >
                <Link href="/book-tour">Book a Tour</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section
        className="py-16 bg-[#FFFFF0] px-[0px] py-[48px]"
        data-section="events-preview"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">{t('home.upcomingEvents')}</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Connect, learn, and grow with our community through exclusive
              networking events and educational workshops
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="p-6 border-[#5C4033]/10 bg-white hover:shadow-lg transition-all"
                data-event={index}
              >
                <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-0 mb-4">
                  {event.category}
                </Badge>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-2">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm text-[#5C4033]/70 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#5C4033]/70 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <p className="text-sm text-[#5C4033]/70 mb-4">
                  {event.description}
                </p>
                <Button
                  variant="ghost"
                  className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-0"
                >
                  Register Now <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
            >
              <Link href="/events">{t('home.viewAll')} Events</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Magazine Highlights Section */}
      <section className="py-16 bg-white" data-section="magazine-highlights">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#5C4033] mb-4">Stories from Our Community</h2>
            <p className="text-[#5C4033]/70 max-w-2xl mx-auto">
              Insights, inspiration, and success stories from The WorkNest
              community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {magazineArticles.map((article, index) => (
              <Card
                key={index}
                className="overflow-hidden border-[#5C4033]/10 hover:shadow-xl transition-all cursor-pointer group"
                data-article={article.slug}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <Badge className="absolute top-4 left-4 bg-[#D4AF37] text-[#5C4033] border-0">
                    {article.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">{article.title}</h3>
                  <p className="text-sm text-[#5C4033]/70 mb-4">
                    {article.excerpt}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#D4AF37] hover:bg-[#D4AF37]/10 p-0"
                  >
                    {t('home.readMore')} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white"
            >
              <Link href="/contact">{t('home.viewAll')} Articles</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Restaurant / Eat & Drink Preview */}
      <section
        className="relative py-32 bg-fixed bg-center bg-cover"
        data-section="restaurant-preview"
        style={{
          backgroundImage: `url(https://images.unsplash.com/photo-1687945512099-400cbe94460c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYyMTc0NzczfDA&ixlib=rb-4.1.0&q=80&w=1080)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#5C4033]/90 to-[#5C4033]/70" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl text-white">
            <Coffee className="w-16 h-16 text-[#D4AF37] mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Fuel Your Day at Our Restaurant & Café
            </h2>
            <p className="text-xl mb-6 text-white/90">
              From artisan coffee to gourmet lunches, enjoy premium dining
              without leaving your workspace
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <p className="text-sm text-[#D4AF37] mb-1">Breakfast</p>
                <p className="text-white/90">7:00 AM - 11:00 AM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <p className="text-sm text-[#D4AF37] mb-1">Lunch & Dinner</p>
                <p className="text-white/90">12:00 PM - 8:00 PM</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg border border-white/20">
                <p className="text-sm text-[#D4AF37] mb-1">Coffee Bar</p>
                <p className="text-white/90">All Day</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                <Link href="/restaurant">Explore Our Menu</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#5C4033]"
              >
                <Link href="/restaurant">Reserve a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Community CTA */}
      <section
        className="py-20 bg-gradient-to-br from-[#5C4033] via-[#4A3329] to-[#5C4033]"
        data-section="join-community"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <Globe className="w-16 h-16 text-[#D4AF37] mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Your Next Great Idea Deserves the Right Space
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Join a thriving community of entrepreneurs, freelancers, and
              established businesses in Kenya's most inspiring workspace
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <div className="text-center">
                <TrendingUp className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <p className="text-white/90">Grow Your Business</p>
              </div>
              <div className="text-center">
                <Users className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <p className="text-white/90">Build Your Network</p>
              </div>
              <div className="text-center">
                <Award className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
                <p className="text-white/90">Achieve Excellence</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Button
                asChild
                className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                <Link href="/get-started">Get Started Today</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#5C4033]"
              >
                <Link href="/book-tour">Book a Tour</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#5C4033]"
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>

            {/* Social Community Links */}
            <div className="border-t border-white/20 pt-8 mt-8">
              <p className="text-white/80 mb-4">Join our online communities:</p>
              <div className="flex flex-wrap gap-3 justify-center">
                <a
                  href="https://chat.whatsapp.com/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>WhatsApp Community</span>
                </a>
                <a
                  href="https://t.me/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Telegram Channel</span>
                </a>
                <a
                  href="https://discord.gg/worknest"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Discord Server</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="h-96" data-section="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63819.18831384601!2d35.23685139999999!3d0.51432585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x178101e99e3a0d8b%3A0x7cf7d1a7b3e6f8d0!2sEldoret%2C%20Kenya!5e0!3m2!1sen!2ske!4v1699999999999!5m2!1sen!2ske"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="The WorkNest Coworking Space - Eldoret, Kenya"
        />
      </section>
    </div>
  );
}
