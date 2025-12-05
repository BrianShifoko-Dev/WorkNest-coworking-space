'use client'

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Send, Clock, MessageCircle, Linkedin, Facebook, Instagram, Twitter, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Link from "next/link";
import { useLanguage } from "@/components/providers/LanguageProvider";

export function ContactClient() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form:", formData);
    toast.success(t("contact.messageSent"));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      {/* Hero Section */}
      <section className="relative h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Contact Us"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#5C4033]/95 to-[#4A3329]/90" />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center text-white">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl max-w-2xl mx-auto mb-6">
            {t("contact.subtitle")}
          </p>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>{t("contact.responseTime")}</span>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-[#5C4033] mb-8">{t("contact.title")}</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#5C4033] mb-1">{t("contact.phone")}</h4>
                    <p className="text-[#5C4033]/70">+254 745 319 042</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#5C4033] mb-1">{t("contact.email")}</h4>
                    <p className="text-[#5C4033]/70">
                      info@worknest.co.ke
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#5C4033] mb-1">{t("contact.address")}</h4>
                    <p className="text-[#5C4033]/70">
                      The WorkNest Eldoret, Elgon View Mall 3rd floor, 
                      <br />
                      Near Eldoret Sports club, Kenya
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white rounded-lg shadow-lg border border-[#5C4033]/10">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <h4 className="text-lg font-semibold text-[#5C4033]">Office Hours</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#5C4033]/70">Monday - Friday</span>
                    <span className="text-[#5C4033] font-medium">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C4033]/70">Saturday</span>
                    <span className="text-[#5C4033] font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#5C4033]/70">Sunday</span>
                    <span className="text-[#5C4033] font-medium">Closed</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-[#5C4033] mb-4">Connect With Us</h4>
                <div className="flex gap-3">
                  <a
                    href="https://www.facebook.com/profile.php?id=61583324491287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://twitter.com/worknest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.instagram.com/the_worknest_eldoret/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/worknest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </a>
                  <a
                    href="https://wa.me/254745319042"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 rounded-lg flex items-center justify-center transition-colors group"
                    aria-label="WhatsApp"
                  >
                    <MessageCircle className="w-5 h-5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg border border-[#5C4033]/10"
              >
                <h3 className="text-2xl font-bold text-[#5C4033] mb-6">{t("contact.sendMessage")}</h3>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-[#5C4033]">
                      {t("contact.name")}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#5C4033]">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-[#5C4033]">
                      {t("contact.subject")}
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      required
                      className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                      placeholder="How can we help?"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#5C4033]">
                      {t("contact.message")}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      className="mt-1 border-[#5C4033]/20 focus:border-[#D4AF37]"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] font-semibold"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {t("contact.sendMessage")}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Need Something Specific?</h2>
              <p className="text-[#5C4033]/70">Quick access to our most requested services</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/book">
                <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Book a Space</h3>
                  <p className="text-sm text-[#5C4033]/70">Reserve your workspace online instantly</p>
                </div>
              </Link>

              <Link href="/book-tour">
                <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">Schedule a Tour</h3>
                  <p className="text-sm text-[#5C4033]/70">Visit us and see our facilities firsthand</p>
                </div>
              </Link>

              <Link href="/faq">
                <div className="bg-[#FFFFF0] p-6 rounded-lg border border-[#5C4033]/10 hover:shadow-lg transition-all cursor-pointer group">
                  <div className="w-12 h-12 bg-[#D4AF37]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#D4AF37]/30 transition-colors">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-2">FAQs</h3>
                  <p className="text-sm text-[#5C4033]/70">Find answers to common questions</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-96">
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
