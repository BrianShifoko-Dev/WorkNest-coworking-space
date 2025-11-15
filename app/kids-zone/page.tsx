import { generatePageMetadata } from '@/lib/seo'
import { KidsZoneClient } from './kids-zone-client'

export const metadata = generatePageMetadata({
  title: 'Kids Zone - Supervised Childcare at WorkNest Eldoret',
  description: 'Safe, supervised kids zone at WorkNest coworking space in Eldoret. Perfect for working parents. Age-appropriate activities, educational toys, and trained staff. Book by the hour or full day.',
  keywords: [
    'kids zone Eldoret',
    'coworking childcare Kenya',
    'working parents workspace',
    'supervised play area Eldoret',
  ],
  path: '/kids-zone',
})

export default function KidsZonePage() {
  return <KidsZoneClient />
}

