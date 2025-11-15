import { generatePageMetadata } from '@/lib/seo'
import { ContactClient } from './contact-client'

export const metadata = generatePageMetadata({
  title: 'Contact Us - The WorkNest Eldoret',
  description: 'Get in touch with The WorkNest coworking space in Eldoret, Kenya. Contact us for bookings, inquiries, or to schedule a tour of our facilities.',
  keywords: [
    'contact WorkNest',
    'coworking Eldoret contact',
    'WorkNest phone',
    'WorkNest email',
    'Eldoret office location',
  ],
  path: '/contact',
})

export default function ContactPage() {
  return <ContactClient />
}
