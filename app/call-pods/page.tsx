import { generatePageMetadata } from '@/lib/seo'
import { CallPodsClient } from './call-pods-client'

export const metadata = generatePageMetadata({
  title: 'Private Call Pods - The WorkNest Eldoret',
  description: 'Soundproof call pods at The WorkNest for private calls, video interviews, and confidential meetings. Hourly booking available in Eldoret.',
  keywords: [
    'call pods Eldoret',
    'private call space Kenya',
    'soundproof booth coworking',
    'call pod Eldoret',
    'privacy pod workspace',
  ],
  path: '/call-pods',
})

export default function CallPodsPage() {
  return <CallPodsClient />
}

