import { generatePageMetadata } from '@/lib/seo'
import { DiscoverClient } from './discover-client'

export const metadata = generatePageMetadata({
  title: 'Discover WorkNest - Premium Coworking in Eldoret',
  description: 'Discover WorkNest coworking space in Eldoret\'s prestigious Elgon View. Flexible workspace with hot desks, private offices, meeting rooms, event space, restaurant, and kids zone. Perfect for entrepreneurs and businesses.',
  keywords: [
    'discover WorkNest Eldoret',
    'coworking amenities Kenya',
    'flexible workspace Eldoret',
    'business community Eldoret',
  ],
  path: '/discover',
})

export default function DiscoverPage() {
  return <DiscoverClient />
}

