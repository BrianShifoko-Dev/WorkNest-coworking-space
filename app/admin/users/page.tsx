import { Metadata } from 'next'
import { UsersClient } from './users-client'

export const metadata: Metadata = {
  title: 'User Management | WorkNest Admin',
  description: 'Manage admin users and permissions',
}

export default function UsersPage() {
  return <UsersClient />
}

