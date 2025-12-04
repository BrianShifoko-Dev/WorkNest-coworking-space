import { BookingClient } from './booking-client'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Book a Space - WorkNest Eldoret',
  description: 'Book your coworking space, boardroom, or event venue at WorkNest Eldoret.',
  keywords: ['book coworking space eldoret', 'reserve office eldoret', 'boardroom booking kenya'],
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">
      <div className="text-[#5C4033]">Loading...</div>
    </div>}>
      <BookingClient />
    </Suspense>
  )
}
