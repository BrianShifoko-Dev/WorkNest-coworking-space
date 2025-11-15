import { generatePageMetadata } from '@/lib/seo'
import { GetStartedClient } from './get-started-client'

export const metadata = generatePageMetadata({
  title: 'Get Started - Join WorkNest Coworking in Eldoret',
  description: 'Begin your workspace journey at WorkNest Eldoret. Book a private office, schedule a tour, explore pricing plans, or host an event. Join Kenya\'s premier business community today.',
  keywords: [
    'join coworking Eldoret',
    'workspace signup Kenya',
    'book office Eldoret',
    'start coworking membership',
  ],
  path: '/get-started',
})

export default function GetStartedPage() {
  return <GetStartedClient />
}

