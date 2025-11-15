import { Metadata } from 'next'
import { MenuClient } from './menu-client'

export const metadata: Metadata = {
  title: 'Menu Management | WorkNest Admin',
  description: 'Manage restaurant menu items',
}

export default function AdminMenuPage() {
  return <MenuClient />
}

