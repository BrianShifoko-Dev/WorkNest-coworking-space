import { generatePageMetadata } from '@/lib/seo'
import { EventSpacesClient } from './event-spaces-client'

export const metadata = generatePageMetadata({
  title: 'Event Spaces - The WorkNest Eldoret',
  description: 'Host your next corporate event, workshop, conference, or celebration at The WorkNest. Versatile event spaces with modern amenities, catering options, and professional support in Eldoret.',
  keywords: [
    'event space Eldoret',
    'conference venue Kenya',
    'workshop space Eldoret',
    'corporate event venue',
    'party venue Eldoret',
    'seminar hall Eldoret',
  ],
  path: '/event-spaces',
})

export default function EventSpacesPage() {
  return <EventSpacesClient />
}

