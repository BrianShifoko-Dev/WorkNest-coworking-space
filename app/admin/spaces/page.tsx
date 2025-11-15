import { SpacesClient } from './spaces-client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Spaces - WorkNest Admin',
  description: 'Manage bookable spaces',
}

export default function SpacesPage() {
  return <SpacesClient />
}

