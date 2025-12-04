import { generatePageMetadata } from '@/lib/seo'
import { BookTourClient } from './book-tour-client'

export const metadata = generatePageMetadata({
  title: 'Book a Meeting Room - WorkNest Coworking Space in Eldoret',
  description: 'Reserve a professional meeting room or boardroom at WorkNest coworking space in Eldoret, Kenya. Book your meeting space today.',
  keywords: [
    'book meeting room Eldoret',
    'reserve boardroom Kenya',
    'meeting room booking Eldoret',
    'conference room Eldoret',
  ],
  path: '/book-tour',
})

export default function BookTourPage() {
  return <BookTourClient />
}
