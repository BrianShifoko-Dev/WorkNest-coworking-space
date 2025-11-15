import { generatePageMetadata } from '@/lib/seo'
import { HostEventClient } from './host-event-client'

export const metadata = generatePageMetadata({
  title: 'Host Your Event - The WorkNest Eldoret',
  description: 'Host your next workshop, conference, or corporate event at The WorkNest Eldoret. Premium event spaces with modern AV equipment and catering services.',
  keywords: [
    'event space Eldoret',
    'host event Kenya',
    'conference venue Eldoret',
    'workshop space Eldoret',
    'corporate events Kenya',
  ],
  path: '/host-event',
})

export default function HostEventPage() {
  return <HostEventClient />
}

