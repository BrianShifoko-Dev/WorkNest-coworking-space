import { generatePageMetadata } from '@/lib/seo'
import { EventsClient } from './events-client'

export const metadata = generatePageMetadata({
  title: 'Events & Workshops - The WorkNest Eldoret',
  description: 'Join networking events, workshops, and conferences at The WorkNest coworking space in Eldoret. Connect with entrepreneurs, learn new skills, and grow your business.',
  keywords: [
    'events Eldoret',
    'networking events Kenya',
    'WorkNest events',
    'business workshops Eldoret',
    'tech meetup Eldoret',
  ],
  path: '/events',
})

export default function EventsPage() {
  return <EventsClient />
}

