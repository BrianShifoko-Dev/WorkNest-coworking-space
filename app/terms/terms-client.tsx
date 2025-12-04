'use client'

import { useState, useRef } from "react"
import { Breadcrumbs } from "@/components/site/Breadcrumbs"
import { Scale, FileText, Shield, AlertCircle, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Script from "next/script"

export function TermsClient() {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return

    setIsGeneratingPDF(true)

    try {
      // Check if html2pdf is loaded
      if (typeof window !== 'undefined' && (window as any).html2pdf) {
        const html2pdf = (window as any).html2pdf
        const element = contentRef.current

        // Calculate proper width for A4 (210mm = 794px at 96 DPI)
        // Minimal margins: only top and bottom, no side margins
        const a4WidthMM = 210
        const marginTopMM = 5
        const marginBottomMM = 5
        const marginLeftMM = 0 // No left margin
        const marginRightMM = 0 // No right margin
        const contentWidthMM = a4WidthMM - marginLeftMM - marginRightMM
        
        // Temporarily set fixed width for PDF generation to prevent cutoff
        const originalWidth = element.style.width
        const originalMaxWidth = element.style.maxWidth
        const originalPadding = element.style.padding
        const originalMargin = element.style.margin
        
        // Set width to match full A4 width (in pixels)
        const contentWidthPx = (contentWidthMM / 25.4) * 96 // Convert mm to pixels
        element.style.width = `${contentWidthPx}px`
        element.style.maxWidth = `${contentWidthPx}px`
        element.style.padding = '15px 20px'
        element.style.margin = '0'
        element.style.boxSizing = 'border-box'
        
        const opt = {
          margin: [marginTopMM, marginRightMM, marginBottomMM, marginLeftMM], // Top, Right, Bottom, Left - no side margins
          filename: 'WorkNest_Terms_and_Conditions.pdf',
          image: { type: 'jpeg', quality: 1.0 }, // Maximum quality
          html2canvas: { 
            scale: 3, // Higher scale for better quality (was 1)
            useCORS: true,
            logging: false,
            letterRendering: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            width: contentWidthPx,
            height: element.scrollHeight + 100, // Add extra height to ensure footer is included
            windowWidth: contentWidthPx,
            windowHeight: element.scrollHeight + 100, // Add extra height
            x: 0,
            y: 0,
            scrollX: 0,
            scrollY: 0,
            onclone: (clonedDoc: Document) => {
              // Ensure all content is visible in cloned document
              const clonedElement = clonedDoc.getElementById('terms-content')
              if (clonedElement) {
                clonedElement.style.height = 'auto'
                clonedElement.style.overflow = 'visible'
              }
            }
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: false // Disable compression for better quality
          },
          pagebreak: { 
            mode: ['avoid-all', 'css', 'legacy'],
            before: '.page-break-before',
            after: '.page-break-after',
            avoid: ['.no-break', 'h3', 'h2']
          }
        }

        try {
          await html2pdf().set(opt).from(element).save()
        } finally {
          // Restore original styles
          element.style.width = originalWidth
          element.style.maxWidth = originalMaxWidth
          element.style.padding = originalPadding
          element.style.margin = originalMargin
        }
      } else {
        // Fallback: Open print dialog
        window.print()
      }
    } catch (error) {
      console.error('PDF generation error:', error)
      // Fallback: Open print dialog
      window.print()
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          // Library loaded
        }}
      />
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
              <p className="text-lg text-white/90 mb-6">
                Last Updated: November 28, 2025
              </p>
              <Button
                onClick={handleDownloadPDF}
                disabled={isGeneratingPDF}
                className="bg-[#D4AF37] hover:bg-[#C5A028] text-[#5C4033] font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto"
              >
                <Download className="w-5 h-5" />
                {isGeneratingPDF ? 'Generating PDF...' : 'Download as PDF'}
              </Button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div
                ref={contentRef}
                className="bg-white rounded-lg shadow-lg border border-[#5C4033]/10 p-6 md:p-8 space-y-6 pdf-content"
                id="terms-content"
                style={{
                  fontSize: '13px',
                  lineHeight: '1.5',
                  maxWidth: '100%',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              >
                {/* PDF Header - Visible in PDF */}
                <div className="pdf-header mb-6 pb-4 border-b-2 border-[#D4AF37]" style={{ pageBreakInside: 'avoid', marginTop: '0' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0">
                      <Image
                        src="/logo.svg"
                        alt="WorkNest Logo"
                        width={60}
                        height={60}
                        className="w-16 h-16 object-contain"
                        unoptimized
                      />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-[#5C4033] leading-tight">The WorkNest Eldoret Limited</h1>
                      <p className="text-[#5C4033]/70 text-base">Premium Coworking Space</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#5C4033]/80 bg-[#FFFFF0] p-3 rounded">
                    <div>
                      <p><strong>Phone:</strong> +254 745 319 042</p>
                      <p><strong>Email:</strong> info@theworknest.co.ke</p>
                    </div>
                    <div>
                      <p><strong>Address:</strong> Eldoret, Kenya</p>
                      <p><strong>Website:</strong> www.theworknest.co.ke</p>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <div className="text-center mb-6" style={{ pageBreakInside: 'avoid' }}>
                  <h2 className="text-2xl font-bold text-[#5C4033] mb-2 leading-tight">
                    General Terms & Conditions and Policy Manual
                  </h2>
                  <p className="text-[#5C4033]/80 text-base leading-relaxed">
                    These Terms and Conditions and policies govern the use of all coworking spaces, private offices, meeting rooms, and related services provided by The WorkNest Eldoret Limited at its premises in Eldoret, Kenya.
                  </p>
                </div>

                {/* Section 1 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex items-start gap-2 mb-3">
                    <FileText className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-semibold text-[#5C4033] leading-tight">1. Acceptance of Terms</h3>
                  </div>
                  <p className="text-[#5C4033]/80 leading-relaxed text-sm">
                    By booking, accessing, or using The WorkNest services and facilities, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. They apply to all members, guests, and visitors. By signing a membership agreement, you also agree to comply with these Terms.
                  </p>
                </div>

                {/* Section 2 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <div className="flex items-start gap-2 mb-3">
                    <Shield className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-semibold text-[#5C4033] leading-tight">2. Services Provided</h3>
                  </div>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-5 list-disc text-sm">
                    <li>Coworking desks (hot desk and dedicated desk options).</li>
                    <li>Private offices.</li>
                    <li>Meeting and event rooms.</li>
                    <li>Kids Zone</li>
                    <li>Lounge</li>
                    <li>Internet, utilities, and cleaning services.</li>
                    <li>Reception and mail handling (where applicable).</li>
                    <li>Printing and copying services (subject to fees).</li>
                    <li>Community networking and events.</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">3. Membership & Booking</h3>
                  <div className="space-y-2 text-[#5C4033]/80 text-sm">
                    <p className="leading-relaxed">
                      <strong className="text-[#5C4033]">Membership Plans:</strong> We offer various membership plans including daily, weekly, monthly, and annually options. All membership plans are subject to availability and may be modified with prior notice.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-[#5C4033]">Booking process:</strong> All bookings must be made through our official channels (website, phone or in-person). Bookings are confirmed only upon payment receipt and written confirmation from our team.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-[#5C4033]">Access Rights:</strong> Standard members – Mon–Fri, 8:00 am – 8:00 pm, Sat. 9:00 am – 5 pm. Guests must be registered at the reception.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-[#5C4033]">Non-transferability:</strong> Membership is personal and non-transferable. Subletting or sharing access without consent is prohibited.
                    </p>
                    <p className="leading-relaxed">
                      <strong className="text-[#5C4033]">Cancellation policy:</strong> Cancellations must be made at least 48 hours before the scheduled booking. Late cancellations may incur fees up to 50% of the booking cost.
                    </p>
                  </div>
                </div>

                {/* Section 4 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">4. Facility Usage & Conduct</h3>
                  <p className="text-[#5C4033]/80 leading-relaxed mb-2 text-sm">
                    Members and guests are expected to maintain professional conduct at all times. The following behaviors are prohibited:
                  </p>
                  <ul className="grid md:grid-cols-2 gap-1.5 text-[#5C4033]/80 ml-4 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Disruptive or offensive behavior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Damage to property or equipment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Unauthorized use of facilities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Smoking, drugs, or alcohol (except during approved events)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Illegal activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#D4AF37]">×</span>
                      <span>Bringing prohibited items to the premises</span>
                    </li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">5. Health, Safety & Security</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>Fire exits and safety instructions must always be followed.</li>
                    <li>The Company provides CCTV and general security but is not liable for personal belongings.</li>
                    <li>Members must immediately report hazards, theft, or suspicious activity.</li>
                    <li>Personal equipment must be safe and not overload electrical systems.</li>
                    <li>Lost or stolen access cards/keys must be reported immediately and replacement fees may apply. Sharing access credentials is prohibited and may result in membership termination.</li>
                    <li>While we implement security measures, we cannot guarantee absolute security. Members use their facility at their own risk.</li>
                  </ul>
                </div>

                {/* Section 6 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">6. Payments Terms</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>All fees are payable in advance. Monthly memberships are billed on the first day of each month.</li>
                    <li>All payments must be made in Kenyan Shillings (KES) unless otherwise agreed</li>
                    <li>Late payments may result in service suspension and additional fees.</li>
                    <li>We accept M-Pesa, bank transfers, and major credit/debit cards.</li>
                    <li>No refunds for unused services or early termination unless otherwise agreed.</li>
                    <li>The Company may revise fees with 30 days' notice.</li>
                    <li>Refunds are processed within 14 business days of approval.</li>
                  </ul>
                </div>

                {/* Section 7 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">7. Internet & IT Policy</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>Internet use must comply with Kenyan law.</li>
                    <li>No illegal downloads, hacking, or hosting of unlawful content.</li>
                    <li>The Company is not responsible for data loss, breaches, or connectivity interruptions.</li>
                    <li>Members should use VPNs and antivirus software for their own protection.</li>
                    <li>We provide high-speed Wi-Fi and technology infrastructure. While we strive for 100% uptime, we do not guarantee uninterrupted service. Members are responsible for backing up their own data.</li>
                  </ul>
                </div>

                {/* Section 8 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">8. Events & Community</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>The Company organizes networking, workshops, and social events.</li>
                    <li>Members are encouraged to participate but must follow community guidelines.</li>
                    <li>Private events hosted by members must be approved in advance and may attract additional fees.</li>
                  </ul>
                </div>

                {/* Section 9 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">9. Kids Zone</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li><strong>Purpose:</strong> The Kids Zone provides a safe, designated play area for children while parents or guardians work within the coworking space. It is not a daycare service.</li>
                    <li><strong>Age Eligibility:</strong> The Kids Zone may be used by children aged 7–10 years, unless otherwise agreed. Sick children are not allowed</li>
                    <li><strong>Supervision:</strong> Parents or guardians must supervise their children at all times unless otherwise stated by management.</li>
                    <li><strong>Liability:</strong> The coworking space is not liable for injuries, illnesses, allergic reactions, behavioral incidents, or lost/damaged items. Parents assume full responsibility.</li>
                    <li><strong>Food & Drinks:</strong> No food or drinks are allowed in the Kids Zone, except water.</li>
                    <li><strong>Behavior:</strong> Unsafe or disruptive behavior may result in the child being removed from the Kids Zone.</li>
                    <li><strong>Access & Closures:</strong> Management may close or restrict access to the Kids Zone as needed for safety, cleaning, or events.</li>
                    <li><strong>Agreement:</strong> By using the Kids Zone, parents agree to follow all rules and accept full responsibility for their child's safety.</li>
                  </ul>
                </div>

                {/* Section 10 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">10. Confidentiality & Privacy</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>Respect other members' business information.</li>
                    <li>Do not take photographs, videos, or recordings of others without consent.</li>
                    <li>The Company handles personal data in accordance with Kenya Data Protection Act, 2019.</li>
                  </ul>
                </div>

                {/* Section 11 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">11. Intellectual Property</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>All the WorkNest branding, logos, website content, and materials are protected by intellectual property laws.</li>
                    <li>You may not use our branding without written permission.</li>
                    <li>Members retain all rights to their own work and intellectual property created at our facilities.</li>
                  </ul>
                </div>

                {/* Section 12 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">12. Liability</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>Members are responsible for their own equipment, data, and business outcomes.</li>
                    <li>The Company is not liable for indirect damages (loss of income, opportunities, etc.).</li>
                    <li>Direct liability is capped at one month's membership fee.</li>
                  </ul>
                </div>

                {/* Section 13 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">13. Modification to Terms</h3>
                  <p className="text-[#5C4033]/80 leading-relaxed text-sm">
                    We reserve the right to modify these Terms at any time. Changes will be communicated via Email or posted on our website. Continued use of our services after changes constitutes acceptance of the modified terms.
                  </p>
                </div>

                {/* Section 14 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">14. Termination</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>Standard termination notice: 30 days in writing.</li>
                    <li>Immediate termination for: Non-payment, Illegal activity, Repeated breach of policies.</li>
                    <li>Members must vacate and return all access cards/keys upon termination.</li>
                  </ul>
                </div>

                {/* Section 15 */}
                <div style={{ pageBreakInside: 'avoid' }}>
                  <h3 className="text-lg font-semibold text-[#5C4033] mb-3 leading-tight">15. Governing Law & Dispute Resolution</h3>
                  <ul className="space-y-1.5 text-[#5C4033]/80 ml-4 list-disc text-sm">
                    <li>This agreement is governed by the laws of Kenya.</li>
                    <li>Disputes shall be settled amicably. If unresolved, they will be referred to arbitration in Eldoret under the Arbitration Act of Kenya.</li>
                  </ul>
                </div>

                {/* Contact */}
                <div className="bg-[#D4AF37]/10 rounded-lg p-4 mt-6 no-break" style={{ pageBreakInside: 'avoid', pageBreakAfter: 'avoid' }}>
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-base font-semibold text-[#5C4033] mb-2">
                        Questions About Our Terms?
                      </h3>
                      <p className="text-[#5C4033]/80 mb-3 text-sm">
                        If you have any questions about these Terms of Service, please contact us:
                      </p>
                      <div className="space-y-1 text-[#5C4033]/80 text-sm">
                        <p>
                          <strong>Phone:</strong> +254 745 319 042
                        </p>
                        <p>
                          <strong>Email:</strong> info@theworknest.co.ke
                        </p>
                        <p>
                          <strong>Address:</strong> Eldoret, Kenya
                        </p>
                        <p>
                          <strong>Website:</strong> www.theworknest.co.ke
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PDF Footer */}
                <div className="pdf-footer mt-6 pt-4 border-t border-[#5C4033]/20 text-center text-xs text-[#5C4033]/60 no-break" style={{ pageBreakInside: 'avoid', pageBreakAfter: 'avoid', marginBottom: '20px' }}>
                  <p className="font-semibold">The WorkNest Eldoret Limited - Terms & Conditions</p>
                  <p>Last Updated: November 28, 2025</p>
                  <p>www.theworknest.co.ke | info@theworknest.co.ke | +254 745 319 042</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
