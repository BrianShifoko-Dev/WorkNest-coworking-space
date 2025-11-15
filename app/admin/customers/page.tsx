import { Metadata } from 'next'
import { CustomersClient } from './customers-client'

export const metadata: Metadata = {
  title: 'Customers | WorkNest Admin',
  description: 'View and manage all customers',
}

export default function CustomersPage() {
  return <CustomersClient />
}

