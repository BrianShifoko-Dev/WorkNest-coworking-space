import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const timeRange = searchParams.get('range') || '30days' // 7days, 30days, 90days, year, all

    console.log('📊 Fetching analytics for range:', timeRange)

    // Calculate date range
    const now = new Date()
    let startDate = new Date()
    
    switch (timeRange) {
      case '7days':
        startDate.setDate(now.getDate() - 7)
        break
      case '30days':
        startDate.setDate(now.getDate() - 30)
        break
      case '90days':
        startDate.setDate(now.getDate() - 90)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case 'all':
        startDate = new Date('2020-01-01')
        break
    }

    // 1. Revenue Over Time
    const { data: payments } = await supabase
      .from('payments')
      .select('amount, created_at, payment_status')
      .eq('payment_status', 'completed')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    // 2. Bookings Over Time
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id, created_at, status, total_amount, space_id')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true })

    // 3. Popular Spaces
    const { data: spaceBookings } = await supabase
      .from('bookings')
      .select(`
        space_id,
        space:spaces(name, type),
        total_amount
      `)
      .gte('created_at', startDate.toISOString())

    // 4. Customer Stats
    const { data: customers } = await supabase
      .from('customers')
      .select('id, created_at')
      .gte('created_at', startDate.toISOString())

    // 5. Total Stats
    const { count: totalBookings } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })

    const { count: totalCustomers } = await supabase
      .from('customers')
      .select('*', { count: 'exact', head: true })

    const { data: allPayments } = await supabase
      .from('payments')
      .select('amount')
      .eq('payment_status', 'completed')

    const totalRevenue = allPayments?.reduce((sum, p) => sum + Number(p.amount || 0), 0) || 0

    // Process revenue data by day/week/month
    const revenueByDate = processRevenueData(payments || [], timeRange)

    // Process bookings data
    const bookingsByDate = processBookingsData(bookings || [], timeRange)

    // Process popular spaces
    const popularSpaces = processPopularSpaces(spaceBookings || [])

    // Process customer growth
    const customerGrowth = processCustomerGrowth(customers || [], timeRange)

    // Calculate conversion rate
    const confirmedBookings = bookings?.filter(b => b.status === 'confirmed').length || 0
    const conversionRate = totalBookings ? Math.round((confirmedBookings / totalBookings) * 100) : 0

    // Calculate average booking value
    const avgBookingValue = bookings?.length 
      ? Math.round(bookings.reduce((sum, b) => sum + Number(b.total_amount || 0), 0) / bookings.length)
      : 0

    return NextResponse.json({
      overview: {
        totalRevenue,
        totalBookings,
        totalCustomers,
        conversionRate,
        avgBookingValue,
      },
      revenueChart: revenueByDate,
      bookingsChart: bookingsByDate,
      popularSpaces: popularSpaces,
      customerGrowth: customerGrowth,
      timeRange,
    })
  } catch (error: any) {
    console.error('❌ Analytics error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

// Helper: Process revenue data
function processRevenueData(payments: any[], timeRange: string) {
  const grouped: Record<string, number> = {}

  payments.forEach(payment => {
    const date = new Date(payment.created_at)
    let key: string

    if (timeRange === '7days' || timeRange === '30days') {
      key = date.toISOString().split('T')[0] // YYYY-MM-DD
    } else if (timeRange === '90days') {
      // Group by week
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = weekStart.toISOString().split('T')[0]
    } else {
      // Group by month
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    grouped[key] = (grouped[key] || 0) + Number(payment.amount || 0)
  })

  return Object.entries(grouped)
    .map(([date, revenue]) => ({ date, revenue }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Helper: Process bookings data
function processBookingsData(bookings: any[], timeRange: string) {
  const grouped: Record<string, { total: number; confirmed: number; pending: number; cancelled: number }> = {}

  bookings.forEach(booking => {
    const date = new Date(booking.created_at)
    let key: string

    if (timeRange === '7days' || timeRange === '30days') {
      key = date.toISOString().split('T')[0]
    } else if (timeRange === '90days') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = weekStart.toISOString().split('T')[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    if (!grouped[key]) {
      grouped[key] = { total: 0, confirmed: 0, pending: 0, cancelled: 0 }
    }

    grouped[key].total++
    if (booking.status === 'confirmed') grouped[key].confirmed++
    else if (booking.status === 'pending') grouped[key].pending++
    else if (booking.status === 'cancelled') grouped[key].cancelled++
  })

  return Object.entries(grouped)
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// Helper: Process popular spaces
function processPopularSpaces(bookings: any[]) {
  const grouped: Record<string, { name: string; type: string; bookings: number; revenue: number }> = {}

  bookings.forEach(booking => {
    const spaceId = booking.space_id
    const spaceName = booking.space?.name || 'Unknown Space'
    const spaceType = booking.space?.type || 'unknown'

    if (!grouped[spaceId]) {
      grouped[spaceId] = { name: spaceName, type: spaceType, bookings: 0, revenue: 0 }
    }

    grouped[spaceId].bookings++
    grouped[spaceId].revenue += Number(booking.total_amount || 0)
  })

  return Object.values(grouped)
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)
}

// Helper: Process customer growth
function processCustomerGrowth(customers: any[], timeRange: string) {
  const grouped: Record<string, number> = {}

  customers.forEach(customer => {
    const date = new Date(customer.created_at)
    let key: string

    if (timeRange === '7days' || timeRange === '30days') {
      key = date.toISOString().split('T')[0]
    } else if (timeRange === '90days') {
      const weekStart = new Date(date)
      weekStart.setDate(date.getDate() - date.getDay())
      key = weekStart.toISOString().split('T')[0]
    } else {
      key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
    }

    grouped[key] = (grouped[key] || 0) + 1
  })

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, customers: count }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

