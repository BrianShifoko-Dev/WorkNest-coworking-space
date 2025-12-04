'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar, DollarSign, Users, TrendingUp, Building2 } from 'lucide-react'

interface Stats {
  todaysBookings: number
  totalBookings: number
  totalRevenue: number
  totalCustomers: number
  occupancyRate: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    todaysBookings: 0,
    totalBookings: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    occupancyRate: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()

    // Auto-refresh stats every 30 seconds
    const interval = setInterval(() => {
      fetchStats()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching dashboard stats via API...')

      // Fetch all data in parallel for better performance
      const [bookingsRes, customersRes, spacesRes] = await Promise.all([
        fetch('/api/bookings'),
        fetch('/api/customers'),
        fetch('/api/spaces')
      ])

      if (!bookingsRes.ok || !customersRes.ok || !spacesRes.ok) {
        throw new Error('Failed to fetch data from API')
      }

      const bookings = await bookingsRes.json()
      const customers = await customersRes.json()
      const spaces = await spacesRes.json()

      // Calculate statistics
      const now = new Date()
      const todayStart = new Date(now)
      todayStart.setHours(0, 0, 0, 0)
      const todayEnd = new Date(now)
      todayEnd.setHours(23, 59, 59, 999)
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      firstDayOfMonth.setHours(0, 0, 0, 0)

      // Today's bookings
      const todaysBookings = bookings.filter((b: any) => {
        const bookingDate = new Date(b.booking_date || b.start_datetime)
        return bookingDate >= todayStart && bookingDate <= todayEnd &&
               ['pending', 'confirmed'].includes(b.status || b.booking_status)
      }).length

      // Total bookings
      const totalBookings = bookings.length

      // Total revenue this month (confirmed bookings)
      const totalRevenue = bookings
        .filter((b: any) => {
          const bookingDate = new Date(b.booking_date || b.start_datetime)
          return bookingDate >= firstDayOfMonth &&
                 (b.status === 'confirmed' || b.booking_status === 'confirmed')
        })
        .reduce((sum: number, b: any) => sum + Number(b.total_amount || 0), 0)

      // Total customers
      const totalCustomers = customers.length

      // Occupancy rate (today's bookings / active spaces)
      const activeSpaces = spaces.filter((s: any) =>
        s.status === 'available' || s.status === 'active'
      ).length
      const occupancyRate = activeSpaces > 0
        ? Math.round((todaysBookings / activeSpaces) * 100)
        : 0

      setStats({
        todaysBookings,
        totalBookings,
        totalRevenue,
        totalCustomers,
        occupancyRate
      })

      console.log('✅ Stats updated:', {
        todaysBookings,
        totalBookings,
        totalRevenue,
        totalCustomers,
        occupancyRate
      })
    } catch (error) {
      console.error('❌ Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      name: "Today's Bookings",
      value: loading ? '...' : stats.todaysBookings,
      icon: Calendar,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      name: 'Total Bookings',
      value: loading ? '...' : stats.totalBookings,
      icon: Building2,
      color: 'from-[#D4AF37] to-[#B8941F]',
      bgColor: 'bg-[#FFFFF0]',
      textColor: 'text-[#D4AF37]'
    },
    {
      name: 'Revenue (This Month)',
      value: loading ? '...' : `KES ${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      name: 'Total Customers',
      value: loading ? '...' : stats.totalCustomers,
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat) => (
        <Card key={stat.name} className="p-6 border-[#D4AF37]/20 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#5C4033]/60 font-medium mb-1">{stat.name}</p>
              <p className="text-2xl font-bold text-[#5C4033]">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
