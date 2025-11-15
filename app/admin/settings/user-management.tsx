'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ExternalLink } from 'lucide-react'

export function UserManagement() {
  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-6 h-6 text-[#D4AF37]" />
        <div>
          <h2 className="text-xl font-bold text-[#5C4033]">User Management</h2>
          <p className="text-sm text-[#5C4033]/60">Manage admin users and their permissions</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-6 bg-gradient-to-br from-[#FFFFF0] to-white border-2 border-[#D4AF37]/30 rounded-lg text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 text-[#D4AF37]" />
          <h3 className="text-xl font-bold text-[#5C4033] mb-2">
            Full User Management Available
          </h3>
          <p className="text-[#5C4033]/70 mb-6">
            Add, edit, and manage all admin users with role-based permissions
          </p>
          <Link href="/admin/users">
            <Button className="bg-[#D4AF37] hover:bg-[#B8941F] text-white">
              Go to User Management
              <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-lg">
          <h4 className="font-semibold text-[#5C4033] mb-3">Role Permissions:</h4>
          <div className="space-y-2 text-sm text-[#5C4033]/70">
            <div className="flex items-start gap-2">
              <span className="font-semibold text-purple-600 min-w-[100px]">Manager:</span>
              <span>Full access to all features including settings, reports, and user management</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-blue-600 min-w-[100px]">Reception:</span>
              <span>Can manage bookings, customers, and payments. View-only for reports</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-semibold text-green-600 min-w-[100px]">Staff:</span>
              <span>View-only access to bookings and customer information</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

