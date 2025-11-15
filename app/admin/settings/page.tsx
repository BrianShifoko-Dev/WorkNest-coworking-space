import { Metadata } from 'next'
import { SettingsClient } from './settings-client'

export const metadata: Metadata = {
  title: 'Settings | WorkNest Admin',
  description: 'Manage system settings and configuration',
}

export default function SettingsPage() {
  return <SettingsClient />
}

