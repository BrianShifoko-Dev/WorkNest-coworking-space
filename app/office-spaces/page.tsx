import { generatePageMetadata } from '@/lib/seo'
import { OfficeSpacesClient } from './office-spaces-client'

export const metadata = generatePageMetadata({
  title: 'Private Office Spaces in Eldoret',
  description: 'Rent fully-furnished private office spaces in Eldoret, Kenya. From small 1-2 person offices to executive suites for teams of 10+. 24/7 access, high-speed WiFi, and premium amenities included.',
  keywords: [
    'private office Eldoret',
    'office rental Eldoret Kenya',
    'furnished office space Eldoret',
    'executive office Eldoret',
    'small office Eldoret',
    'team office space Kenya',
  ],
  path: '/office-spaces',
})

export default function OfficeSpacesPage() {
  return <OfficeSpacesClient />
}

