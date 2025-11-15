import { ProtectedAdminLayout } from '@/components/admin/ProtectedAdminLayout'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedAdminLayout>{children}</ProtectedAdminLayout>
}

