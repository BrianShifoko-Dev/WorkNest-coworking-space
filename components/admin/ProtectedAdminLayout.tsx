'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'

export function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Don't check auth on login pages
    if (pathname === '/admin/login' || pathname === '/admin/simple-login' || pathname === '/login') {
      setIsLoading(false)
      return
    }

    // Check if user is logged in (simple auth)
    const checkAuth = () => {
      const userStr = localStorage.getItem('worknest_user')
      
      if (!userStr) {
        console.log('❌ No user in localStorage, redirecting to login')
        router.push('/login')
        return
      }

      try {
        const user = JSON.parse(userStr)
        if (user && user.email) {
          console.log('✅ User authenticated:', user.email)
          setIsAuthenticated(true)
        } else {
          console.log('❌ Invalid user data, redirecting to login')
          router.push('/login')
        }
      } catch (error) {
        console.error('❌ Error parsing user data:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFFFF0] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-[#5C4033]/60">Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page layout (no sidebar/header)
  if (pathname === '/admin/login' || pathname === '/admin/simple-login' || pathname === '/login') {
    return <>{children}</>
  }

  // Show nothing if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null
  }

  // Show admin layout
  return (
    <div className="min-h-screen bg-[#FFFFF0]">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <AdminSidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <AdminHeader />
          
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

