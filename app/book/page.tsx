import { BookingClient } from './booking-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Book a Space - WorkNest Eldoret',
  description: 'Book your coworking space, boardroom, or event venue at WorkNest Eldoret.',
  keywords: ['book coworking space eldoret', 'reserve office eldoret', 'boardroom booking kenya'],
}

export default function BookPage() {
  return <BookingClient />
}
