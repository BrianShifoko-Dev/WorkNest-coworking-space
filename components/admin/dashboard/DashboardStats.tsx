'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Calendar, DollarSign, Users, TrendingUp, Building2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

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
      // Set up date ranges
      const now = new Date()
      const todayStart = new Date(now)
      todayStart.setHours(0, 0, 0, 0)
      const todayEnd = new Date(now)
      todayEnd.setHours(23, 59, 59, 999)
      
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      firstDayOfMonth.setHours(0, 0, 0, 0)

      console.log('📊 Fetching dashboard stats...')

      // Today's bookings (using start_datetime)
      const { count: todaysBookings, error: todayError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .gte('start_datetime', todayStart.toISOString())
        .lte('start_datetime', todayEnd.toISOString())
        .in('status', ['pending', 'confirmed'])

      console.log('Today\'s bookings:', todaysBookings, todayError)

      // Total bookings (all time)
      const { count: totalBookings, error: totalError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })

      console.log('Total bookings:', totalBookings, totalError)

      // Total revenue (this month - confirmed bookings)
      const { data: revenueData, error: revenueError } = await supabase
        .from('bookings')
        .select('total_amount')
        .gte('start_datetime', firstDayOfMonth.toISOString())
        .eq('status', 'confirmed')

      const totalRevenue = revenueData?.reduce((sum, booking) => sum + Number(booking.total_amount || 0), 0) || 0
      console.log('Revenue this month:', totalRevenue, revenueError)

      // Total customers
      const { count: totalCustomers, error: customersError } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })

      console.log('Total customers:', totalCustomers, customersError)

      // Total spaces
      const { count: totalSpaces, error: spacesError } = await supabase
        .from('spaces')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active')

      console.log('Total spaces:', totalSpaces, spacesError)

      // Occupancy rate (today's bookings / total spaces)
      const occupancyRate = totalSpaces && todaysBookings 
        ? Math.round((todaysBookings / totalSpaces) * 100) 
        : 0

      setStats({
        todaysBookings: todaysBookings || 0,
        totalBookings: totalBookings || 0,
        totalRevenue,
        totalCustomers: totalCustomers || 0,
        occupancyRate
      })

      console.log('✅ Stats updated:', {
        todaysBookings: todaysBookings || 0,
        totalBookings: totalBookings || 0,
        totalRevenue,
        totalCustomers: totalCustomers || 0,
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

