import { Metadata } from 'next'
import { GalleryClient } from './gallery-client'

export const metadata: Metadata = {
  title: 'Gallery Management | WorkNest Admin',
  description: 'Manage gallery images',
}

export default function AdminGalleryPage() {
  return <GalleryClient />
}

