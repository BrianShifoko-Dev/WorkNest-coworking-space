import { Metadata } from 'next'
import { EventsClient } from './events-client'

export const metadata: Metadata = {
  title: 'Events Management | WorkNest Admin',
  description: 'Manage events and workshops',
}

export default function AdminEventsPage() {
  return <EventsClient />
}

