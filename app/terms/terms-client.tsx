'use client'

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Scale, FileText, Shield, AlertCircle } from "lucide-react";

export function TermsClient() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Terms of Service" }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#5C4033] to-[#5C4033]/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Scale className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-lg text-white/90">
              Last Updated: November 4, 2025
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg border border-[#5C4033]/10 p-8 md:p-12 space-y-8">
              {/* Introduction */}
              <div>
                <h2 className="text-2xl font-bold text-[#5C4033] mb-4">
                  Welcome to The WorkNest
                </h2>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of The WorkNest
                  facilities, services, and amenities located in
                  Eldoret, Kenya. By accessing our premises or using our
                  services, you agree to be bound by these Terms. Please read
                  them carefully.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <FileText className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">1. Acceptance of Terms</h3>
                </div>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  By booking, accessing, or using any The WorkNest services,
                  you acknowledge that you have read, understood, and agree to
                  be bound by these Terms and our Privacy Policy.
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#5C4033]/80 ml-4">
                  <li>
                    You must be at least 18 years of age to use our services
                  </li>
                  <li>
                    You represent that all information provided is accurate and
                    current
                  </li>
                  <li>
                    You agree to comply with all applicable laws and regulations
                  </li>
                </ul>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">2. Membership & Booking</h3>
                </div>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  <strong className="text-[#5C4033]">Membership Plans:</strong>{" "}
                  We offer various membership plans including daily, monthly,
                  and annual options. All memberships are subject to
                  availability and may be modified with prior notice.
                </p>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  <strong className="text-[#5C4033]">Booking Process:</strong>{" "}
                  All bookings must be made through our official channels
                  (website, phone, or in-person). Bookings are confirmed only
                  upon payment receipt and written confirmation from our team.
                </p>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  <strong className="text-[#5C4033]">
                    Cancellation Policy:
                  </strong>{" "}
                  Cancellations must be made at least 48 hours before the
                  scheduled booking. Late cancellations may incur fees up to 50%
                  of the booking cost.
                </p>
              </div>

              {/* Section 3 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">3. Payment Terms</h3>
                <ul className="space-y-3 text-[#5C4033]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>
                      All payments must be made in Kenyan Shillings (KES) unless
                      otherwise agreed
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>
                      Monthly memberships are billed on the first day of each
                      month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>
                      Late payments may result in service suspension and
                      additional fees
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>
                      We accept M-Pesa, bank transfers, and major credit/debit
                      cards
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>
                      Refunds are processed within 14 business days of approval
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  4. Facility Usage & Conduct
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  Members and guests are expected to maintain professional
                  conduct at all times. The following behaviors are prohibited:
                </p>
                <ul className="grid md:grid-cols-2 gap-2 text-[#5C4033]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Disruptive or offensive behavior</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Unauthorized use of facilities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Damage to property or equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Illegal activities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Smoking in non-designated areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37]">×</span>
                    <span>Bringing prohibited items</span>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">5. Security & Access</h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  Members receive access cards or codes for 24/7 facility access
                  (where applicable). You are responsible for maintaining the
                  security of your access credentials. Lost or stolen access
                  cards must be reported immediately and replacement fees may
                  apply. Sharing access credentials is strictly prohibited and
                  may result in membership termination.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  6. Liability & Insurance
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  The WorkNest is not liable for loss, theft, or damage to
                  personal property. Members are responsible for insuring their
                  own belongings. We maintain general liability insurance for
                  our premises, but recommend members obtain their own business
                  insurance.
                </p>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  While we implement security measures, we cannot guarantee
                  absolute security. Members use the facility at their own risk.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  7. Internet & Technology
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  We provide high-speed WiFi and technology infrastructure.
                  While we strive for 100% uptime, we do not guarantee
                  uninterrupted service. Members are responsible for backing up
                  their own data. Use of our network for illegal activities or
                  excessive bandwidth consumption is prohibited.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  8. Intellectual Property
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  All The WorkNest branding, logos, website content, and
                  materials are protected by intellectual property laws. You may
                  not use our branding without written permission. Members
                  retain all rights to their own work and intellectual property
                  created at our facilities.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  9. Modifications to Terms
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  We reserve the right to modify these Terms at any time.
                  Changes will be communicated via email and posted on our
                  website. Continued use of our services after changes
                  constitutes acceptance of the modified Terms.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">10. Termination</h3>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  Either party may terminate membership with 30 days written
                  notice. The WorkNest reserves the right to immediately
                  terminate membership for:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#5C4033]/80 ml-4">
                  <li>Violation of these Terms</li>
                  <li>Non-payment of fees</li>
                  <li>Misconduct or disruptive behavior</li>
                  <li>Fraudulent activity</li>
                </ul>
              </div>

              {/* Section 11 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">11. Governing Law</h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  These Terms are governed by the laws of the Republic of Kenya.
                  Any disputes will be resolved in the courts of Kenya.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-[#D4AF37]/10 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#5C4033] mb-3">
                      Questions About Our Terms?
                    </h3>
                    <p className="text-[#5C4033]/80 mb-4">
                      If you have any questions about these Terms of Service,
                      please contact us:
                    </p>
                    <div className="space-y-2 text-[#5C4033]/80">
                      <p>
                        <strong>Email:</strong> legal@worknest.co.ke
                      </p>
                      <p>
                        <strong>Phone:</strong> +254 XXX XXX XXX
                      </p>
                      <p>
                        <strong>Address:</strong> The WorkNest, Eldoret, Kenya
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

