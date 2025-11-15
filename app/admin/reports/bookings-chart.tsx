'use client'

import { Card } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'

interface BookingsChartProps {
  data: Array<{
    date: string
    total: number
    confirmed: number
    pending: number
    cancelled: number
  }>
  timeRange: string
}

export function BookingsChart({ data, timeRange }: BookingsChartProps) {
  const formatXAxis = (dateStr: string) => {
    try {
      const date = new Date(dateStr)
      if (timeRange === '7days' || timeRange === '30days') {
        return format(date, 'MMM d')
      } else if (timeRange === '90days') {
        return format(date, 'MMM d')
      } else {
        return format(date, 'MMM yyyy')
      }
    } catch {
      return dateStr
    }
  }

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border-2 border-[#D4AF37] rounded-lg shadow-lg">
          <p className="text-sm text-[#5C4033]/60 mb-2">
            {formatXAxis(data.date)}
          </p>
          <div className="space-y-1">
            <p className="text-xs flex items-center justify-between gap-4">
              <span className="text-[#5C4033]/70">Total:</span>
              <span className="font-bold text-[#5C4033]">{data.total}</span>
            </p>
            <p className="text-xs flex items-center justify-between gap-4">
              <span className="text-green-600">Confirmed:</span>
              <span className="font-bold text-green-600">{data.confirmed}</span>
            </p>
            <p className="text-xs flex items-center justify-between gap-4">
              <span className="text-amber-600">Pending:</span>
              <span className="font-bold text-amber-600">{data.pending}</span>
            </p>
            <p className="text-xs flex items-center justify-between gap-4">
              <span className="text-red-600">Cancelled:</span>
              <span className="font-bold text-red-600">{data.cancelled}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  const totalBookings = data.reduce((sum, item) => sum + item.total, 0)

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5C4033]">Bookings Over Time</h3>
            <p className="text-sm text-[#5C4033]/60">
              Total: {totalBookings} bookings
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-[#5C4033]/60">
          <p>No booking data for this period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.1} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="#5C4033"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#5C4033" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="confirmed" fill="#10b981" name="Confirmed" />
            <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
            <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

