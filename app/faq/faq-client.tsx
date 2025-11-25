'use client'

import Link from "next/link";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FAQClient() {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is The WorkNest?",
          a: "The WorkNest is Eldoret's premier coworking and flexible workspace provider, offering private offices, shared desks, meeting rooms, event spaces, and family-friendly amenities in the heart of Eldoret, Kenya.",
        },
        {
          q: "What are your operating hours?",
          a: "We're open Monday-Friday 8AM-8PM, Saturday 9AM-5PM, and Sunday Closed. Members with access can use the space on convenient Hours.",
        },
        {
          q: "Where are you located?",
          a: "The WorkNest Eldoret, Elgon View Mall 3rd Floor, Near Eldoret Sports Club ",
        },
      ],
    },
    {
      category: "Membership & Booking",
      questions: [
        {
          q: "What membership plans do you offer?",
          a: "We offer daily, monthly, and yearly plans for hot desks, dedicated desks, and private offices. Pricing varies by space type and includes amenities like high-speed WiFi, meeting room access, and complimentary refreshments.",
        },
        {
          q: "How do I book a space?",
          a: "You can book through our website booking form, call us, WhatsApp us, or visit in person. Our team will help you find the perfect space for your needs in Eldoret.",
        },
        {
          q: "Can I upgrade or downgrade my membership?",
          a: "Yes! We offer flexible membership options. You can adjust your plan at any time to suit your changing business needs.",
        },
        {
          q: "Is there a deposit required?",
          a: "Yes, we require a refundable security deposit equal to one month's rent for private office spaces. Daily and hot desk bookings don't require a deposit.",
        },
      ],
    },
    {
      category: "Facilities & Amenities",
      questions: [
        {
          q: "What amenities are included?",
          a: "All memberships include high-speed WiFi (100Mbps+), printing services, complimentary coffee/tea, kitchen access, cleaning services, 24/7 security, power backup, and access to communal areas.",
        },
        {
          q: "Do you have parking?",
          a: "Yes, we provide Ample secure parking for everyone fro Free. Visitor parking is also available.",
        },
        {
          q: "Is there a café or restaurant on-site?",
          a: "Yes! Our on-site restaurant serves artisan coffee, fresh meals, and snacks throughout the day. Members receive a 10% discount on all food and beverages.",
        },
        {
          q: "Can I receive mail and packages?",
          a: "Yes, we provide mail handling services for members. You can use our business address in Eldoret and we'll notify you when packages arrive.",
        },
        {
          q: "Do you have a kids zone?",
          a: "Yes! We have a dedicated supervised kids zone, making WorkNest perfect for working parents who need flexible childcare options.",
        },
      ],
    },
    {
      category: "Events & Meetings",
      questions: [
        {
          q: "Can I book meeting rooms by the hour?",
          a: "Yes, meeting rooms and boardrooms can be booked hourly, half-day, or full-day. Members receive preferential rates on all bookings.",
        },
        {
          q: "Do you host events?",
          a: "Yes, we regularly host networking events, workshops, training sessions, and community gatherings. Check our Events page for upcoming activities in Eldoret.",
        },
        {
          q: "Can I host my own event at WorkNest?",
          a: "Absolutely! Our event spaces are available for private bookings including product launches, workshops, corporate training, and celebrations. We can help with planning, catering, and AV setup.",
        },
        {
          q: "What AV equipment is available?",
          a: "All meeting rooms and boardrooms include HD displays, video conferencing systems, projectors, whiteboards, and premium sound systems.",
        },
      ],
    },
    {
      category: "Payments",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept M-PESA, bank transfers, credit/debit cards, and mobile money. Monthly memberships can be set up for auto-billing for your convenience.",
        },
        {
          q: "Are there any hidden fees?",
          a: "No hidden fees! All our pricing is transparent. Any additional services (extra printing, parking, meeting room hours beyond credits, etc.) are clearly communicated upfront.",
        },
        {
          q: "Do you offer refunds?",
          a: "Monthly and yearly memberships are non-refundable, but can be transferred to another person. Security deposits are fully refundable upon checkout with proper notice.",
        },
        {
          q: "Do you offer discounts?",
          a: "Yes! We offer a 17% discount on yearly plans compared to monthly rates. We also offer corporate discounts for teams of 5+ members.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <Breadcrumbs items={[{ name: "Get Started" }, { name: "FAQ" }]} />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-1 bg-[#D4AF37] mb-6 mx-auto" />
          <h1 className="text-5xl text-[#5C4033] mb-6 font-playfair">Frequently Asked Questions</h1>
          <p className="text-xl text-[#5C4033]/70 max-w-3xl mx-auto">
            Find answers to common questions about WorkNest coworking space in Eldoret
          </p>
        </div>
      </section>

      <section className="py-16 bg-[#FFFFF0]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {faqs.map((category, catIndex) => (
              <div key={catIndex} className="bg-white rounded-lg p-8 shadow-md border border-[#5C4033]/10">
                <h3 className="text-[#5C4033] mb-6 text-2xl font-playfair">{category.category}</h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, qIndex) => (
                    <AccordionItem key={qIndex} value={`${catIndex}-${qIndex}`}>
                      <AccordionTrigger className="text-left text-[#5C4033] hover:text-[#D4AF37]">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-[#5C4033]/70">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-[#5C4033] mb-4 text-3xl font-playfair">Still Have Questions?</h3>
          <p className="text-[#5C4033]/70 mb-8 max-w-2xl mx-auto">
            Our team in Eldoret is here to help. Reach out and we'll get back to you promptly.
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
                className="border-2 border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white px-8 py-6 text-lg"
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

