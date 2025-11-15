import { generatePageMetadata } from '@/lib/seo'
import { MenuClient } from './menu-client'

export const metadata = generatePageMetadata({
  title: 'Menu - The WorkNest Café & Restaurant Eldoret',
  description: 'View our full menu featuring artisan coffee, gourmet meals, snacks, and specialty drinks at The WorkNest café in Eldoret, Kenya.',
  keywords: [
    'menu Eldoret',
    'café menu Kenya',
    'WorkNest food',
    'restaurant menu Eldoret',
    'coffee menu Kenya',
  ],
  path: '/menu',
})

export default function MenuPage() {
  return <MenuClient />
}

