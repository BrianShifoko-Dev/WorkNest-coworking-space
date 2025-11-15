import { generatePageMetadata } from '@/lib/seo'
import { PricingClient } from './pricing-client'

export const metadata = generatePageMetadata({
  title: 'Coworking Space Pricing in Eldoret - Flexible Plans',
  description: 'Transparent pricing for coworking spaces in Eldoret, Kenya. Hot desks from KES 800/day, dedicated desks from KES 25,000/month, private offices from KES 80,000/month. No hidden fees.',
  keywords: [
    'coworking prices Eldoret',
    'office space rates Eldoret',
    'workspace pricing Kenya',
    'hot desk pricing Eldoret',
    'private office cost Eldoret',
  ],
  path: '/pricing',
})

export default function PricingPage() {
  return <PricingClient />
}

