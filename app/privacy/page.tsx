import { generatePageMetadata } from '@/lib/seo'
import { PrivacyClient } from './privacy-client'

export const metadata = generatePageMetadata({
  title: 'Privacy Policy - The WorkNest Eldoret',
  description: 'Learn how The WorkNest protects your privacy and personal data. Our commitment to data security and transparency for our Eldoret coworking community.',
  keywords: [
    'WorkNest privacy',
    'data protection Kenya',
    'privacy policy coworking',
    'data security Eldoret',
    'personal information protection',
  ],
  path: '/privacy',
})

export default function PrivacyPage() {
  return <PrivacyClient />
}

