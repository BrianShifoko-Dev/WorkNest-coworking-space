import { generatePageMetadata } from '@/lib/seo'
import { JoinCommunityClient } from './join-client'

export const metadata = generatePageMetadata({
  title: 'Join Our Community - The WorkNest Eldoret',
  description: 'Become part of The WorkNest coworking community in Eldoret. Connect with 500+ entrepreneurs, freelancers, and businesses in Kenya.',
  keywords: [
    'join coworking Eldoret',
    'WorkNest membership',
    'coworking community Kenya',
    'networking Eldoret',
    'business community',
  ],
  path: '/join',
})

export default function JoinCommunityPage() {
  return <JoinCommunityClient />
}

