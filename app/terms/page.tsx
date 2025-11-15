import { generatePageMetadata } from '@/lib/seo'
import { TermsClient } from './terms-client'

export const metadata = generatePageMetadata({
  title: 'Terms of Service - The WorkNest Eldoret',
  description: 'Terms and conditions for using The WorkNest coworking space in Eldoret, Kenya. Learn about membership, booking policies, and facility usage guidelines.',
  keywords: [
    'WorkNest terms',
    'coworking terms of service',
    'membership agreement Eldoret',
    'workspace policies Kenya',
    'coworking rules Eldoret',
  ],
  path: '/terms',
})

export default function TermsPage() {
  return <TermsClient />
}

