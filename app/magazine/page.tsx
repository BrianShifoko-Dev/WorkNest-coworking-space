import { Suspense } from 'react'
import { generatePageMetadata } from '@/lib/seo'
import { MagazineClient } from './magazine-client'

export const metadata = generatePageMetadata({
  title: 'Magazine - Stories & Insights from The WorkNest Eldoret',
  description: 'Read inspiring success stories, workspace tips, and insights from The WorkNest coworking community in Eldoret, Kenya. Discover how members are transforming their businesses.',
  keywords: [
    'coworking magazine Kenya',
    'workspace stories Eldoret',
    'business success Kenya',
    'coworking insights',
    'entrepreneur stories Eldoret',
  ],
  path: '/magazine',
})

export default function MagazinePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">Loading...</div>}>
      <MagazineClient />
    </Suspense>
  )
}

