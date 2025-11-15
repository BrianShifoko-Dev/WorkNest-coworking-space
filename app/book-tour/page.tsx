import { generatePageMetadata } from '@/lib/seo'
import { BookTourClient } from './book-tour-client'

export const metadata = generatePageMetadata({
  title: 'Book a Tour - Visit WorkNest Coworking Space in Eldoret',
  description: 'Schedule a personalized tour of WorkNest coworking space in Eldoret, Kenya. See our private offices, meeting rooms, amenities, and meet our team. Book your visit today.',
  keywords: [
    'tour coworking Eldoret',
    'visit workspace Kenya',
    'schedule tour Eldoret office',
    'view coworking space',
  ],
  path: '/book-tour',
})

export default function BookTourPage() {
  return <BookTourClient />
}

