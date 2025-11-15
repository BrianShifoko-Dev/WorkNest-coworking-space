import { generatePageMetadata } from '@/lib/seo'
import { ReserveTableClient } from './reserve-table-client'

export const metadata = generatePageMetadata({
  title: 'Reserve a Table - The WorkNest Restaurant Eldoret',
  description: 'Reserve a table at The WorkNest restaurant in Eldoret. Enjoy premium dining, artisan coffee, and gourmet cuisine in a beautiful setting.',
  keywords: [
    'restaurant booking Eldoret',
    'reserve table Kenya',
    'WorkNest restaurant',
    'dining Eldoret',
    'cafe Eldoret',
  ],
  path: '/reserve-table',
})

export default function ReserveTablePage() {
  return <ReserveTableClient />
}

