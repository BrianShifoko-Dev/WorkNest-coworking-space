'use client'

import { Target, Eye, Heart, Zap } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export function MissionClient() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Discover Us" }, { name: "Our Mission" }]} />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-white to-[#FFFFF0]">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Target className="w-10 h-10 text-[#5C4033]" />
          </div>
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">Our Mission & Vision</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Driving workspace excellence and empowering Eldoret's business community
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-16 h-1 bg-[#D4AF37] mb-6" />
                <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">Our Mission</h2>
                <p className="text-[#5C4033]/70 mb-4 text-lg">
                  To provide flexible, world-class workspaces in Eldoret that enhance productivity, foster meaningful connections, and support growth through exceptional service, modern design, and a vibrant community.
                </p>
                <p className="text-[#5C4033]/70 text-lg">
                  We believe that the right workspace isn't just about desks and chairs—it's about 
                  creating an ecosystem that supports success, encourages community, and inspires excellence.
                </p>
              </div>
              <div className="bg-[#D4AF37]/10 p-8 rounded-lg border-l-4 border-[#D4AF37]">
                <Target className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="text-[#5C4033] mb-3 text-2xl font-semibold">Mission Statement</h3>
                <p className="text-[#5C4033]/80 italic text-lg">
                  "To be the catalyst for professional success in Eldoret and Kenya by delivering premium coworking space 
                  solutions, fostering meaningful connections, and creating an environment where innovation thrives."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="bg-[#5C4033] p-8 rounded-lg text-white">
                <Eye className="w-12 h-12 text-[#D4AF37] mb-4" />
                <h3 className="mb-3 text-2xl font-semibold">Vision Statement</h3>
                <p className="text-white/90 italic text-lg">
                  "To be Eldoret and Kenya's leading hub for innovation and collaboration—empowering professionals, entrepreneurs, and businesses to thrive in a dynamic, inspiring workspace."
                </p>
              </div>
              <div>
                <div className="w-16 h-1 bg-[#D4AF37] mb-6" />
                <h2 className="text-[#5C4033] mb-6 text-4xl font-playfair">Our Vision</h2>
                <p className="text-[#5C4033]/70 mb-4 text-lg">
                  We envision a future where flexible, premium coworking is accessible to all 
                  professionals across Kenya and beyond. A future where work is not confined to 
                  traditional offices, but flourishes in dynamic, collaborative environments.
                </p>
                <p className="text-[#5C4033]/70 text-lg">
                  Through continuous innovation and unwavering commitment to our members, we aim to 
                  set new standards for workspace excellence throughout East Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
            <h2 className="text-center text-[#5C4033] mb-12 text-4xl font-playfair">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#FFFFF0] p-8 rounded-lg border border-[#5C4033]/10">
                <Heart className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-[#5C4033] mb-3 text-xl font-semibold">Community First</h3>
                <p className="text-[#5C4033]/70">
                  We build genuine relationships and foster a culture of collaboration, support, and shared success among our members.
                </p>
              </div>

              <div className="bg-[#FFFFF0] p-8 rounded-lg border border-[#5C4033]/10">
                <Target className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-[#5C4033] mb-3 text-xl font-semibold">Excellence in Service</h3>
                <p className="text-[#5C4033]/70">
                  Every detail matters. We're committed to providing world-class facilities, amenities, and support that exceed expectations.
                </p>
              </div>

              <div className="bg-[#FFFFF0] p-8 rounded-lg border border-[#5C4033]/10">
                <Zap className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-[#5C4033] mb-3 text-xl font-semibold">Innovation & Growth</h3>
                <p className="text-[#5C4033]/70">
                  We embrace change, encourage creativity, and continuously evolve to meet the needs of modern professionals.
                </p>
              </div>

              <div className="bg-[#FFFFF0] p-8 rounded-lg border border-[#5C4033]/10">
                <Eye className="w-10 h-10 text-[#D4AF37] mb-4" />
                <h3 className="text-[#5C4033] mb-3 text-xl font-semibold">Transparency & Trust</h3>
                <p className="text-[#5C4033]/70">
                  Open communication, fair pricing, and honest relationships form the foundation of everything we do.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 bg-gradient-to-r from-[#5C4033] to-[#4A3329]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white mb-6 text-4xl font-playfair">Our Commitment to Eldoret</h2>
          <p className="text-white/90 mb-8 max-w-3xl mx-auto text-lg">
            As a proud member of the Eldoret business community, we're dedicated to supporting local entrepreneurs, 
            creating jobs, and contributing to the city's economic growth. Your success is our success.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div>
              <div className="text-5xl text-[#D4AF37] font-bold mb-2">100+</div>
              <div className="text-white/80">Members Supported</div>
            </div>
            <div>
              <div className="text-5xl text-[#D4AF37] font-bold mb-2">24/7</div>
              <div className="text-white/80">Access Available</div>
            </div>
            <div>
              <div className="text-5xl text-[#D4AF37] font-bold mb-2">1st</div>
              <div className="text-white/80">Premium Space in Eldoret</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

