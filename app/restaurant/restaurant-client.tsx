'use client'

import { useState, useEffect } from "react";
import { Coffee, UtensilsCrossed, Cookie, Wine, Calendar, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

interface MenuItem {
  id: string
  name: string
  description: string
  category: string
  price: number
  image_url: string
  is_available: boolean
  is_featured: boolean
}

const categoryIcons: { [key: string]: any } = {
  breakfast: Coffee,
  lunch: UtensilsCrossed,
  dinner: UtensilsCrossed,
  drinks: Wine,
  snacks: Cookie,
  desserts: Cookie,
}

const categoryDisplayNames: { [key: string]: string } = {
  breakfast: "Breakfast",
  lunch: "Lunch Specials",
  dinner: "Dinner",
  drinks: "Specialty Drinks",
  snacks: "Snacks & Pastries",
  desserts: "Desserts",
}

export function RestaurantClient() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("lunch")
  const [reservationForm, setReservationForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    specialRequests: "",
  });

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/menu?available=true')
      if (response.ok) {
        const data = await response.json()
        setMenuItems(Array.isArray(data) ? data : [])
      } else {
        console.error('Failed to fetch menu items')
        toast.error('Failed to load menu items')
      }
    } catch (error) {
      console.error('Error fetching menu:', error)
      toast.error('Error loading menu')
    } finally {
      setLoading(false)
    }
  }

  const handleReservation = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Reservation:", reservationForm);
    toast.success("Table reserved! We'll send you a confirmation shortly.");
    setReservationForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      specialRequests: "",
    });
  };

  // Group menu items by category
  const categories = Array.from(new Set(menuItems.map(item => item.category)))
  const menuByCategory = categories.map(category => ({
    name: categoryDisplayNames[category] || category.charAt(0).toUpperCase() + category.slice(1),
    icon: categoryIcons[category] || UtensilsCrossed,
    category: category,
    items: menuItems.filter(item => item.category === category && item.is_available)
  })).filter(cat => cat.items.length > 0)

  const galleryImages = [
    "https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NjIyMzM2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1640587662002-ae577f8f96dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBlc3ByZXNzbyUyMGN1cHxlbnwxfHx8fDE3NjIxOTQyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjIxNTc0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Restaurant" }]} />

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden" data-section="restaurant">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <img
          src="https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NjIyMzM2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Restaurant"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white mb-4 px-6 py-2 text-lg animate-pulse">
              Coming Soon
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Eat & Drink</h1>
            <p className="text-xl">Artisan coffee, gourmet meals, and refreshing drinks</p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Welcome to Our Café</h2>
            <p className="text-[#5C4033]/70 leading-relaxed">
              Fuel your workday with our carefully curated menu featuring premium Kenyan coffee, 
              wholesome meals, and delicious snacks. Whether you're grabbing a quick bite or 
              enjoying a leisurely lunch, our café offers the perfect blend of quality and convenience.
            </p>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Our Menu</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-[#D4AF37]" />
            </div>
          ) : menuByCategory.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#5C4033]/60">No menu items available at the moment.</p>
            </div>
          ) : (
            <>
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {menuByCategory.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.category}
                      onClick={() => setSelectedCategory(category.category)}
                      variant={selectedCategory === category.category ? "default" : "outline"}
                      className={
                        selectedCategory === category.category
                          ? "bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
                          : "border-[#5C4033]/20 text-[#5C4033] hover:bg-[#D4AF37]/10"
                      }
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>

              {/* Menu Items */}
              <div className="max-w-4xl mx-auto">
                {menuByCategory.filter(cat => cat.category === selectedCategory).map(category => (
                  <div key={category.category} className="bg-white rounded-lg shadow-lg p-8 border border-[#5C4033]/10">
                    <div className="flex items-center gap-3 mb-6">
                      {(() => {
                        const Icon = category.icon;
                        return <Icon className="w-8 h-8 text-[#D4AF37]" />;
                      })()}
                      <h3 className="text-2xl font-semibold text-[#5C4033]">{category.name}</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      {category.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between items-start p-4 bg-[#FFFFF0] rounded-lg hover:bg-[#D4AF37]/10 transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[#5C4033] font-medium">{item.name}</span>
                              {item.is_featured && (
                                <span className="text-xs bg-[#D4AF37] text-white px-2 py-0.5 rounded">Featured</span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-xs text-[#5C4033]/60 mt-1">{item.description}</p>
                            )}
                          </div>
                          <span className="text-[#D4AF37] font-semibold ml-3 whitespace-nowrap">KES {item.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Reserve a Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-[#D4AF37] mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[#5C4033] mb-2">Reserve a Table</h2>
              <p className="text-[#5C4033]/70">
                Planning a business lunch or team meal? Book your table in advance
              </p>
            </div>

            <form
              onSubmit={handleReservation}
              className="bg-[#FFFFF0] p-8 rounded-lg shadow-lg border border-[#5C4033]/10"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-[#5C4033]">Name</Label>
                  <Input
                    id="name"
                    value={reservationForm.name}
                    onChange={(e) => setReservationForm({ ...reservationForm, name: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[#5C4033]">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={reservationForm.email}
                    onChange={(e) => setReservationForm({ ...reservationForm, email: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#5C4033]">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={reservationForm.phone}
                    onChange={(e) => setReservationForm({ ...reservationForm, phone: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <Label htmlFor="guests" className="text-[#5C4033]">Number of Guests</Label>
                  <Select
                    value={reservationForm.guests}
                    onValueChange={(value) => setReservationForm({ ...reservationForm, guests: value })}
                  >
                    <SelectTrigger className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]">
                      <SelectValue placeholder="Select guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={String(num)}>
                          {num} {num === 1 ? "Guest" : "Guests"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="date" className="text-[#5C4033]">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={reservationForm.date}
                    onChange={(e) => setReservationForm({ ...reservationForm, date: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-[#5C4033]">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={reservationForm.time}
                    onChange={(e) => setReservationForm({ ...reservationForm, time: e.target.value })}
                    required
                    className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="specialRequests" className="text-[#5C4033]">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={reservationForm.specialRequests}
                  onChange={(e) =>
                    setReservationForm({ ...reservationForm, specialRequests: e.target.value })
                  }
                  className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                  placeholder="Dietary restrictions, seating preferences, etc."
                  rows={3}
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033]"
              >
                Reserve Table
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-[#5C4033] mb-12">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow-lg aspect-square">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opening Hours */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-[#5C4033] mb-6">Opening Hours</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                <p className="font-semibold text-[#5C4033]">Monday - Friday</p>
                <p className="text-sm text-[#5C4033]/80">8:00 AM - 8:00 PM</p>
              </div>
              <div className="p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg">
                <p className="font-semibold text-[#5C4033]">Saturday</p>
                <p className="text-sm text-[#5C4033]/80">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

