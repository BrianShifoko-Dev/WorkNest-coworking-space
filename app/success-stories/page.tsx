import { generatePageMetadata } from '@/lib/seo'
import { SuccessStoriesClient } from './success-stories-client'

export const metadata = generatePageMetadata({
  title: 'Success Stories - The WorkNest Eldoret',
  description: 'Discover inspiring success stories from our WorkNest community. Read how entrepreneurs, startups, and professionals have grown their businesses in our coworking space.',
  keywords: [
    'WorkNest success stories',
    'coworking success Eldoret',
    'startup stories Kenya',
    'entrepreneur testimonials',
    'business growth Eldoret',
  ],
  path: '/success-stories',
})

export default function SuccessStoriesPage() {
  return <SuccessStoriesClient />
}

