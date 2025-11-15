import { Metadata } from 'next'
import { EmailsClient } from './emails-client'

export const metadata: Metadata = {
  title: 'Email Logs | WorkNest Admin',
  description: 'View all sent emails and notifications',
}

export default function EmailsPage() {
  return <EmailsClient />
}

