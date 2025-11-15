import { Metadata } from 'next'
import { PaymentsClient } from './payments-client'

export const metadata: Metadata = {
  title: 'Payments | WorkNest Admin',
  description: 'View and manage all payments',
}

export default function PaymentsPage() {
  return <PaymentsClient />
}

