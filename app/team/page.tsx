import { generatePageMetadata } from '@/lib/seo'
import { TeamClient } from './team-client'

export const metadata = generatePageMetadata({
  title: 'Our Team - The WorkNest Eldoret',
  description: 'Meet the dedicated team behind The WorkNest coworking space in Eldoret, Kenya. Professionals committed to creating exceptional workspace experiences.',
  keywords: [
    'WorkNest team',
    'coworking staff Eldoret',
    'workspace management Kenya',
    'coworking team Eldoret',
    'business center staff',
  ],
  path: '/team',
})

export default function TeamPage() {
  return <TeamClient />
}

