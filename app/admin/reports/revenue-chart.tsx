'use client'

import { Card } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { DollarSign } from 'lucide-react'
import { format } from 'date-fns'

interface RevenueChartProps {
  data: Array<{ date: string; revenue: number }>
  timeRange: string
}

export function RevenueChart({ data, timeRange }: RevenueChartProps) {
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
      return (
        <div className="bg-white p-3 border-2 border-[#D4AF37] rounded-lg shadow-lg">
          <p className="text-sm text-[#5C4033]/60 mb-1">
            {formatXAxis(payload[0].payload.date)}
          </p>
          <p className="text-lg font-bold text-[#D4AF37]">
            KES {payload[0].value.toLocaleString()}
          </p>
        </div>
      )
    }
    return null
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5C4033]">Revenue Over Time</h3>
            <p className="text-sm text-[#5C4033]/60">
              Total: KES {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-[#5C4033]/60">
          <p>No revenue data for this period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.1} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="#5C4033"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#5C4033"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#D4AF37"
              strokeWidth={3}
              dot={{ fill: '#D4AF37', r: 4 }}
              activeDot={{ r: 6 }}
              name="Revenue (KES)"
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

