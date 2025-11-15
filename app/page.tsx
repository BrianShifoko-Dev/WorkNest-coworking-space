import { generatePageMetadata } from '@/lib/seo'
import { HomePageClient } from './home-client'

export const metadata = generatePageMetadata({
  title: 'The WorkNest Coworking Space in Eldoret',
  description: 'The WorkNest offers flexible workspace solutions in Eldoret, Kenya. Private offices, meeting rooms, event spaces, and a vibrant community for entrepreneurs and businesses.',
  keywords: [
    'coworking Eldoret',
    'office space Eldoret Kenya',
    'workspace Eldoret',
    'meeting rooms Eldoret',
    'business center Eldoret',
  ],
  path: '/',
})

export default function Home() {
  return <HomePageClient />
}

