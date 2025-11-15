import { generatePageMetadata } from '@/lib/seo'
import { BoardroomsClient } from './boardrooms-client'

export const metadata = generatePageMetadata({
  title: 'Boardroom & Meeting Room Rentals in Eldoret',
  description: 'Professional boardrooms and meeting rooms for rent in Eldoret, Kenya. Hourly and daily rates available. Equipped with video conferencing, high-speed WiFi, and presentation tools.',
  keywords: [
    'boardroom Eldoret',
    'meeting room rental Eldoret',
    'conference room Eldoret Kenya',
    'video conferencing Eldoret',
    'presentation room Eldoret',
  ],
  path: '/boardrooms',
})

export default function BoardroomsPage() {
  return <BoardroomsClient />
}

