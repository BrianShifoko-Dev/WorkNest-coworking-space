import { generatePageMetadata } from '@/lib/seo'
import { FAQClient } from './faq-client'

export const metadata = generatePageMetadata({
  title: 'Frequently Asked Questions - WorkNest Coworking Eldoret',
  description: 'Common questions about WorkNest coworking space in Eldoret, Kenya. Learn about membership plans, facilities, booking, payments, and amenities. Get answers before you join.',
  keywords: [
    'coworking FAQ Eldoret',
    'workspace questions Kenya',
    'coworking membership info',
    'Eldoret office space help',
  ],
  path: '/faq',
})

export default function FAQPage() {
  return <FAQClient />
}

