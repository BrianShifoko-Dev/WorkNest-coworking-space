'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  BarChart3,
  TrendingUp,
  Download,
  DollarSign,
  Calendar,
  Users,
  Target,
  Loader2
} from 'lucide-react'
import { RevenueChart } from './revenue-chart'
import { BookingsChart } from './bookings-chart'
import { PopularSpaces } from './popular-spaces'
import { CustomerGrowth } from './customer-growth'
import { format } from 'date-fns'

interface Analytics {
  overview: {
    totalRevenue: number
    totalBookings: number
    totalCustomers: number
    conversionRate: number
    avgBookingValue: number
  }
  revenueChart: Array<{ date: string; revenue: number }>
  bookingsChart: Array<{ date: string; total: number; confirmed: number; pending: number; cancelled: number }>
  popularSpaces: Array<{ name: string; type: string; bookings: number; revenue: number }>
  customerGrowth: Array<{ date: string; customers: number }>
  timeRange: string
}

export function ReportsClient() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30days')

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/analytics?range=${timeRange}`)
      const data = await response.json()
      
      if (response.ok) {
        setAnalytics(data)
      } else {
        console.error('Failed to load analytics')
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportReport = () => {
    if (!analytics) return

    const csvData = [
      ['WorkNest Analytics Report'],
      [`Generated: ${format(new Date(), 'PPP')}`],
      [`Time Range: ${timeRange}`],
      [''],
      ['Overview'],
      ['Total Revenue', `KES ${analytics.overview.totalRevenue.toLocaleString()}`],
      ['Total Bookings', analytics.overview.totalBookings],
      ['Total Customers', analytics.overview.totalCustomers],
      ['Conversion Rate', `${analytics.overview.conversionRate}%`],
      ['Avg Booking Value', `KES ${analytics.overview.avgBookingValue.toLocaleString()}`],
      [''],
      ['Top Spaces'],
      ['Space Name', 'Bookings', 'Revenue'],
      ...analytics.popularSpaces.map(s => [s.name, s.bookings, `KES ${s.revenue.toLocaleString()}`]),
    ]

    const csvContent = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `worknest-analytics-${format(new Date(), 'yyyy-MM-dd')}.csv`
    a.click()
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#5C4033]">Analytics & Reports</h1>
          <p className="text-[#5C4033]/60 mt-1">View business performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px] border-[#D4AF37]/30">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-white z-[9999]">
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={exportReport}
            className="bg-[#D4AF37] hover:bg-[#B8941F] text-white"
            disabled={!analytics || loading}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-[#D4AF37]" />
        </div>
      ) : analytics ? (
        <div className="space-y-6">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <Card className="p-6 border-[#D4AF37]/20 bg-gradient-to-br from-[#FFFFF0] to-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5C4033]/60 mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold text-[#D4AF37]">
                    KES {analytics.overview.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5C4033]/60 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {analytics.overview.totalBookings}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5C4033]/60 mb-1">Total Customers</p>
                  <p className="text-2xl font-bold text-green-600">
                    {analytics.overview.totalCustomers}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5C4033]/60 mb-1">Conversion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {analytics.overview.conversionRate}%
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#5C4033]/60 mb-1">Avg Booking Value</p>
                  <p className="text-2xl font-bold text-orange-600">
                    KES {analytics.overview.avgBookingValue.toLocaleString()}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </div>

          {/* Revenue Chart */}
          <RevenueChart data={analytics.revenueChart} timeRange={timeRange} />

          {/* Bookings Chart */}
          <BookingsChart data={analytics.bookingsChart} timeRange={timeRange} />

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Popular Spaces */}
            <PopularSpaces data={analytics.popularSpaces} />

            {/* Customer Growth */}
            <CustomerGrowth data={analytics.customerGrowth} timeRange={timeRange} />
          </div>
        </div>
      ) : (
        <Card className="p-20 text-center border-[#D4AF37]/20">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 text-[#5C4033]/30" />
          <p className="text-xl font-semibold text-[#5C4033]">No analytics data available</p>
          <p className="text-sm text-[#5C4033]/60 mt-2">
            Data will appear here once you have bookings and payments
          </p>
        </Card>
      )}
    </div>
  )
}

