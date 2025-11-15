'use client'

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Shield, Lock, Eye, Database, UserCheck, AlertCircle } from "lucide-react";

export function PrivacyClient() {
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs
        items={[{ name: "Privacy Policy" }]}
      />

      {/* Header */}
      <section className="bg-gradient-to-br from-[#5C4033] to-[#5C4033]/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-[#D4AF37]" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-lg text-white/90">
              Last Updated: November 4, 2025
            </p>
            <p className="text-white/80 max-w-2xl mx-auto mt-4">
              Your privacy is important to us. This policy explains how we
              collect, use, and protect your personal information.
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
                  Our Commitment to Privacy
                </h2>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  The WorkNest ("we," "our," or "us") is committed to
                  protecting your privacy. This Privacy Policy explains how we
                  collect, use, disclose, and safeguard your information when
                  you visit our facility, use our services, or interact with our
                  website located in Eldoret, Kenya.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Database className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">1. Information We Collect</h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-[#5C4033] mb-2">
                      Personal Information
                    </h4>
                    <p className="text-[#5C4033]/80 leading-relaxed mb-2">
                      We may collect personal information that you voluntarily
                      provide to us when you:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-[#5C4033]/80 ml-4">
                      <li>Register for membership or create an account</li>
                      <li>Make a booking or reservation</li>
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us for support or inquiries</li>
                      <li>Attend our events</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#5C4033] mb-2">
                      Information Collected Includes:
                    </h4>
                    <ul className="grid md:grid-cols-2 gap-2 text-[#5C4033]/80">
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Full name</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Email address</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Phone number</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Business information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Payment information</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#D4AF37] mt-1">•</span>
                        <span>Identification documents</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-[#5C4033] mb-2">
                      Automatically Collected Information
                    </h4>
                    <p className="text-[#5C4033]/80 leading-relaxed">
                      When you access our facility or website, we may
                      automatically collect certain information including IP
                      address, browser type, access times, pages viewed, and the
                      page that referred you to our website.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Eye className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">
                    2. How We Use Your Information
                  </h3>
                </div>

                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  We use the information we collect for various purposes
                  including:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-[#FFFFF0] p-4 rounded-lg border border-[#5C4033]/10">
                    <h4 className="font-semibold text-[#5C4033] mb-2">Service Delivery</h4>
                    <ul className="space-y-1 text-sm text-[#5C4033]/80">
                      <li>• Process bookings and payments</li>
                      <li>• Manage your membership</li>
                      <li>• Provide customer support</li>
                      <li>• Send service notifications</li>
                    </ul>
                  </div>

                  <div className="bg-[#FFFFF0] p-4 rounded-lg border border-[#5C4033]/10">
                    <h4 className="font-semibold text-[#5C4033] mb-2">Communication</h4>
                    <ul className="space-y-1 text-sm text-[#5C4033]/80">
                      <li>• Send newsletters and updates</li>
                      <li>• Inform about events and offers</li>
                      <li>• Respond to inquiries</li>
                      <li>• Request feedback</li>
                    </ul>
                  </div>

                  <div className="bg-[#FFFFF0] p-4 rounded-lg border border-[#5C4033]/10">
                    <h4 className="font-semibold text-[#5C4033] mb-2">Security & Safety</h4>
                    <ul className="space-y-1 text-sm text-[#5C4033]/80">
                      <li>• Monitor facility access</li>
                      <li>• Prevent fraud and abuse</li>
                      <li>• Ensure member safety</li>
                      <li>• Comply with legal obligations</li>
                    </ul>
                  </div>

                  <div className="bg-[#FFFFF0] p-4 rounded-lg border border-[#5C4033]/10">
                    <h4 className="font-semibold text-[#5C4033] mb-2">Improvement</h4>
                    <ul className="space-y-1 text-sm text-[#5C4033]/80">
                      <li>• Analyze usage patterns</li>
                      <li>• Improve our services</li>
                      <li>• Develop new features</li>
                      <li>• Enhance user experience</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <Lock className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">
                    3. How We Protect Your Information
                  </h3>
                </div>

                <p className="text-[#5C4033]/80 leading-relaxed mb-4">
                  We implement appropriate technical and organizational security
                  measures to protect your personal information, including:
                </p>

                <ul className="space-y-2 text-[#5C4033]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>
                      <strong>Encryption:</strong> SSL/TLS encryption for data
                      transmission
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>
                      <strong>Access Controls:</strong> Limited access to
                      personal information on a need-to-know basis
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>
                      <strong>Secure Storage:</strong> Protected databases and
                      secure servers
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>
                      <strong>Regular Audits:</strong> Periodic security
                      assessments and updates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">✓</span>
                    <span>
                      <strong>Staff Training:</strong> Employee education on
                      data protection
                    </span>
                  </li>
                </ul>
              </div>

              {/* Section 4 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  4. Information Sharing & Disclosure
                </h3>

                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  We do not sell or rent your personal information to third
                  parties. We may share your information in the following
                  circumstances:
                </p>

                <ul className="space-y-3 text-[#5C4033]/80">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <div>
                      <strong className="text-[#5C4033]">
                        Service Providers:
                      </strong>{" "}
                      With trusted third-party service providers who assist in
                      operating our business (payment processors, IT support,
                      etc.)
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <div>
                      <strong className="text-[#5C4033]">
                        Legal Requirements:
                      </strong>{" "}
                      When required by law, court order, or legal process
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <div>
                      <strong className="text-[#5C4033]">
                        Business Transfers:
                      </strong>{" "}
                      In connection with a merger, sale, or acquisition
                    </div>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <div>
                      <strong className="text-[#5C4033]">
                        With Your Consent:
                      </strong>{" "}
                      When you explicitly authorize us to share information
                    </div>
                  </li>
                </ul>
              </div>

              {/* Section 5 */}
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <UserCheck className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <h3 className="text-xl font-semibold text-[#5C4033]">5. Your Rights & Choices</h3>
                </div>

                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  You have the following rights regarding your personal
                  information:
                </p>

                <div className="bg-[#D4AF37]/5 rounded-lg p-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] font-bold">→</span>
                    <div>
                      <strong className="text-[#5C4033]">Access:</strong>
                      <span className="text-[#5C4033]/80">
                        {" "}
                        Request a copy of your personal information
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] font-bold">→</span>
                    <div>
                      <strong className="text-[#5C4033]">Correction:</strong>
                      <span className="text-[#5C4033]/80">
                        {" "}
                        Update or correct inaccurate information
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] font-bold">→</span>
                    <div>
                      <strong className="text-[#5C4033]">Deletion:</strong>
                      <span className="text-[#5C4033]/80">
                        {" "}
                        Request deletion of your personal information
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] font-bold">→</span>
                    <div>
                      <strong className="text-[#5C4033]">Opt-Out:</strong>
                      <span className="text-[#5C4033]/80">
                        {" "}
                        Unsubscribe from marketing communications
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] font-bold">→</span>
                    <div>
                      <strong className="text-[#5C4033]">Portability:</strong>
                      <span className="text-[#5C4033]/80">
                        {" "}
                        Receive your data in a structured format
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  6. Cookies & Tracking Technologies
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed mb-3">
                  We use cookies and similar tracking technologies to enhance
                  your experience on our website. Cookies are small files stored
                  on your device that help us:
                </p>
                <ul className="list-disc list-inside space-y-2 text-[#5C4033]/80 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you use our website</li>
                  <li>Improve website performance and functionality</li>
                  <li>Provide personalized content and recommendations</li>
                </ul>
                <p className="text-[#5C4033]/80 leading-relaxed mt-3">
                  You can control cookies through your browser settings.
                  However, disabling cookies may affect your ability to use
                  certain features of our website.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">7. Data Retention</h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  We retain your personal information only for as long as
                  necessary to fulfill the purposes outlined in this Privacy
                  Policy, unless a longer retention period is required by law.
                  When we no longer need your information, we will securely
                  delete or anonymize it.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">8. Children's Privacy</h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  Our services are not intended for individuals under the age of
                  18. We do not knowingly collect personal information from
                  children. If you believe we have collected information from a
                  child, please contact us immediately.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  9. International Data Transfers
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  Your information is primarily stored and processed in Kenya.
                  If we transfer your data internationally, we will ensure
                  appropriate safeguards are in place to protect your
                  information in accordance with this Privacy Policy.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 className="text-xl font-semibold text-[#5C4033] mb-4">
                  10. Changes to This Policy
                </h3>
                <p className="text-[#5C4033]/80 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will
                  notify you of any material changes by posting the new policy
                  on our website and updating the "Last Updated" date. We
                  encourage you to review this policy periodically.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-[#D4AF37]/10 rounded-lg p-6 mt-8">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-lg font-semibold text-[#5C4033] mb-3">
                      Questions About Privacy?
                    </h3>
                    <p className="text-[#5C4033]/80 mb-4">
                      If you have questions or concerns about this Privacy
                      Policy or how we handle your information, please contact
                      us:
                    </p>
                    <div className="space-y-2 text-[#5C4033]/80">
                      <p>
                        <strong>Data Protection Officer:</strong>{" "}
                        privacy@worknest.co.ke
                      </p>
                      <p>
                        <strong>General Inquiries:</strong>{" "}
                        hello@worknest.co.ke
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

