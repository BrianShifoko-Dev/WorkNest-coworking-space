import { generatePageMetadata } from '@/lib/seo'
import { GalleryClient } from './gallery-client'

export const metadata = generatePageMetadata({
  title: 'Spaces Gallery - The WorkNest Eldoret',
  description: 'Explore our beautifully designed workspace environments at The WorkNest in Eldoret. View photos of our coworking spaces, private offices, boardrooms, and event venues.',
  keywords: [
    'WorkNest gallery',
    'coworking space photos Eldoret',
    'office space gallery Kenya',
    'workspace images Eldoret',
    'coworking environment Eldoret',
  ],
  path: '/gallery',
})

export default function GalleryPage() {
  return <GalleryClient />
}

