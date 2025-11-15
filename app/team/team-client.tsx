'use client'

import { Mail, Linkedin } from "lucide-react";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Button } from "@/components/ui/button";

export function TeamClient() {
  const teamMembers = [
    {
      name: "James Kariuki",
      role: "Founder & CEO",
      bio: "Visionary leader with 15 years in hospitality and workspace management",
      image: "https://images.unsplash.com/photo-1758518731572-7791381c5ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMG1lZXRpbmd8ZW58MXx8fHwxNzYyMTg4NzE1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Sarah Wanjiru",
      role: "Head of Operations",
      bio: "Expert in creating seamless member experiences and operational excellence",
      image: "https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzYyMjMzNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "David Omondi",
      role: "Community Manager",
      bio: "Passionate about building connections and fostering collaboration",
      image: "https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3NjIxNTc0NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Grace Muthoni",
      role: "Events Coordinator",
      bio: "Specialist in creating memorable experiences and seamless events",
      image: "https://images.unsplash.com/photo-1462826303086-329426d1aef5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwYm9hcmRyb29tfGVufDF8fHx8MTc2MjIzMzYyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Michael Ngugi",
      role: "Business Development",
      bio: "Focused on partnerships and expanding our community reach",
      image: "https://images.unsplash.com/photo-1692133226337-55e513450a32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcml2YXRlJTIwb2ZmaWNlJTIwcm9vbXxlbnwxfHx8fDE3NjIyMzM2Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
      name: "Lucy Akinyi",
      role: "Customer Success",
      bio: "Dedicated to ensuring every member has an exceptional experience",
      image: "https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwY2FmZXxlbnwxfHx8fDE3NjIyMzM2Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Discover Us", path: "/discover" }, { name: "The Team" }]} />

      {/* Hero */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#5C4033] mb-6">Meet Our Team</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Dedicated professionals committed to your success
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-[#5C4033]/10 group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#5C4033] mb-1">{member.name}</h3>
                  <p className="text-sm text-[#D4AF37] font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-[#5C4033]/70 mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a
                      href={`mailto:${member.name.toLowerCase().replace(' ', '.')}@worknest.co.ke`}
                      className="w-8 h-8 bg-[#D4AF37]/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="w-4 h-4 text-[#D4AF37]" />
                    </a>
                    <a
                      href="#"
                      className="w-8 h-8 bg-[#D4AF37]/10 rounded-full flex items-center justify-center hover:bg-[#D4AF37]/20 transition-colors"
                      aria-label={`LinkedIn profile of ${member.name}`}
                    >
                      <Linkedin className="w-4 h-4 text-[#D4AF37]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center bg-[#FFFFF0] p-12 rounded-lg border border-[#5C4033]/10">
            <h2 className="text-3xl font-bold text-[#5C4033] mb-4">Join Our Team</h2>
            <p className="text-[#5C4033]/70 mb-6 leading-relaxed">
              We're always looking for talented individuals who share our passion for excellence 
              and community building.
            </p>
            <Button
              asChild
              className="bg-[#D4AF37] hover:bg-[#B8941F] text-[#5C4033] font-semibold"
            >
              <a href="mailto:careers@worknest.co.ke">
                View Open Positions
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

