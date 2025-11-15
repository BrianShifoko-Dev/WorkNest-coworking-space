import { generatePageMetadata } from '@/lib/seo'
import { AboutClient } from './about-client'

export const metadata = generatePageMetadata({
  title: 'About WorkNest - Premium Coworking Space in Eldoret',
  description: 'Learn about WorkNest, Eldoret\'s premier coworking space founded in 2025. Our mission is to create a workspace where businesses, entrepreneurs, and professionals thrive through collaboration and innovation.',
  keywords: [
    'about WorkNest Eldoret',
    'coworking space history Kenya',
    'Eldoret business community',
    'workspace innovation Eldoret',
  ],
  path: '/about',
})

export default function AboutPage() {
  return <AboutClient />
}

