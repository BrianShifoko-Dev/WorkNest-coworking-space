'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Calendar,
  Building2,
  CreditCard,
  Users,
  Image,
  Settings,
  FileText,
  UtensilsCrossed,
  CalendarCheck,
  UserCircle,
  Mail,
  BarChart3
} from 'lucide-react'

const navigation = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    roles: ['manager', 'reception', 'staff', 'accountant']
  },
  {
    name: 'Bookings',
    href: '/admin/bookings',
    icon: Calendar,
    roles: ['manager', 'reception', 'staff', 'accountant']
  },
  {
    name: 'Spaces',
    href: '/admin/spaces',
    icon: Building2,
    roles: ['manager', 'accountant']
  },
  {
    name: 'Events',
    href: '/admin/events',
    icon: CalendarCheck,
    roles: ['manager']
  },
  {
    name: 'Customers',
    href: '/admin/customers',
    icon: Users,
    roles: ['manager', 'reception', 'accountant']
  },
  {
    name: 'Payments',
    href: '/admin/payments',
    icon: CreditCard,
    roles: ['manager', 'reception', 'accountant']
  },
  {
    name: 'Reports',
    href: '/admin/reports',
    icon: BarChart3,
    roles: ['manager', 'accountant']
  },
  {
    name: 'Email Logs',
    href: '/admin/emails',
    icon: Mail,
    roles: ['manager', 'accountant']
  },
  {
    name: 'Menu',
    href: '/admin/menu',
    icon: UtensilsCrossed,
    roles: ['manager']
  },
  {
    name: 'Gallery',
    href: '/admin/gallery',
    icon: Image,
    roles: ['manager']
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: UserCircle,
    roles: ['manager']
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    roles: ['manager']
  },
]

export function AdminSidebar() {
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

  const userRole = user?.role || 'staff'

  // Filter navigation based on user role
  const filteredNav = navigation.filter(item => item.roles.includes(userRole))

  // Don't show sidebar on login pages
  if (pathname === '/admin/login' || pathname === '/login') {
    return null
  }

  return (
    <div className="w-64 bg-gradient-to-b from-[#5C4033] to-[#3D2B23] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-lg">WorkNest</div>
            <div className="text-xs text-white/60">Admin Panel</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-[#D4AF37] text-white shadow-lg'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
            <span className="text-sm font-bold text-white">
              {user?.name?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name || 'User'}</div>
            <div className="text-xs text-white/60 capitalize">{userRole}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

