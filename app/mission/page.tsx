import { generatePageMetadata } from '@/lib/seo'
import { MissionClient } from './mission-client'

export const metadata = generatePageMetadata({
  title: 'Our Mission & Vision - WorkNest Coworking Eldoret',
  description: 'WorkNest\'s mission is to provide world-class flexible workspaces in Eldoret that enhance productivity and foster meaningful connections. Our vision: be Kenya\'s leading hub for innovation and collaboration.',
  keywords: [
    'WorkNest mission Eldoret',
    'coworking vision Kenya',
    'workspace values Eldoret',
    'business community Kenya',
  ],
  path: '/mission',
})

export default function MissionPage() {
  return <MissionClient />
}

