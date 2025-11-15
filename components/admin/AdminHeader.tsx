'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { toast } from 'sonner'
import { NotificationBell } from './NotificationBell'

export function AdminHeader() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Get user from localStorage
    const userStr = localStorage.getItem('worknest_user')
    if (userStr) {
      try {
        setUser(JSON.parse(userStr))
      } catch (error) {
        console.error('Error parsing user:', error)
      }
    }
  }, [])

  // Don't show header on login pages
  if (pathname === '/admin/login' || pathname === '/login') {
    return null
  }

  // Get page title from pathname
  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    return lastSegment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const handleSignOut = () => {
    // Clear user from localStorage
    localStorage.removeItem('worknest_user')
    toast.success('Signed out successfully')
    router.push('/login')
  }

  return (
    <header className="h-16 bg-white border-b border-[#D4AF37]/20 flex items-center justify-between px-6 shadow-sm">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-bold text-[#5C4033]">{getPageTitle()}</h1>
        <p className="text-sm text-[#5C4033]/60">
          Welcome back, {user?.name || 'User'}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <button className="p-2 text-[#5C4033]/60 hover:text-[#5C4033] hover:bg-[#D4AF37]/10 rounded-lg transition-colors">
          <Search className="w-5 h-5" />
        </button>

        {/* Notifications Bell */}
        <NotificationBell />

        {/* Divider */}
        <div className="h-8 w-px bg-[#D4AF37]/20"></div>

        {/* User Menu */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-medium text-[#5C4033]">{user?.name || 'User'}</div>
            <div className="text-xs text-[#5C4033]/60 capitalize">{user?.role || 'staff'}</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="text-[#5C4033] hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}

