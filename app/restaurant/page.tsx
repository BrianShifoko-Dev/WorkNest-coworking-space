import { generatePageMetadata } from '@/lib/seo'
import { RestaurantClient } from './restaurant-client'

export const metadata = generatePageMetadata({
  title: 'Café & Restaurant - The WorkNest Eldoret',
  description: 'Artisan coffee, gourmet meals, and refreshing drinks at The WorkNest café in Eldoret. Premium Kenyan coffee, wholesome meals, and delicious snacks for coworking members.',
  keywords: [
    'café Eldoret',
    'coworking restaurant Kenya',
    'WorkNest café',
    'coffee shop Eldoret',
    'business lunch Eldoret',
  ],
  path: '/restaurant',
})

export default function RestaurantPage() {
  return <RestaurantClient />
}

