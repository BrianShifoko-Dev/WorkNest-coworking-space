import { generatePageMetadata } from '@/lib/seo'
import { SpacesClient } from './spaces-client'

export const metadata = generatePageMetadata({
  title: 'Meeting Spaces & Offices - The WorkNest Eldoret',
  description: 'Choose from our flexible workspace options: hot desks, dedicated desks, private offices, meeting rooms, and boardrooms. Professional spaces with premium amenities in Eldoret.',
  keywords: [
    'coworking spaces Eldoret',
    'meeting rooms Eldoret',
    'private office rental Kenya',
    'hot desk Eldoret',
    'boardroom rental',
  ],
  path: '/spaces',
})

export default function SpacesPage() {
  return <SpacesClient />
}

