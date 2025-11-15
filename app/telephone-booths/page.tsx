import { generatePageMetadata } from '@/lib/seo'
import { TelephoneBoothsClient } from './telephone-booths-client'

export const metadata = generatePageMetadata({
  title: 'Private Telephone Booths - The WorkNest Eldoret',
  description: 'Soundproof telephone booths at The WorkNest for private calls, video interviews, and confidential meetings. Hourly booking available in Eldoret.',
  keywords: [
    'phone booths Eldoret',
    'private call space Kenya',
    'soundproof booth coworking',
    'telephone pod Eldoret',
    'privacy booth workspace',
  ],
  path: '/telephone-booths',
})

export default function TelephoneBoothsPage() {
  return <TelephoneBoothsClient />
}

