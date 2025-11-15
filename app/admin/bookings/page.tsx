import { BookingsClient } from './bookings-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bookings Management - WorkNest Admin',
  description: 'Manage all space bookings, view calendar, and handle reservations.',
}

export default function BookingsPage() {
  return <BookingsClient />
}


