import { Metadata } from 'next'
import { ReportsClient } from './reports-client'

export const metadata: Metadata = {
  title: 'Analytics & Reports | WorkNest Admin',
  description: 'View business analytics and generate reports',
}

export default function ReportsPage() {
  return <ReportsClient />
}

