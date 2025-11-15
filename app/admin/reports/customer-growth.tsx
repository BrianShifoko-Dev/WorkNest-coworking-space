'use client'

import { Card } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users } from 'lucide-react'
import { format } from 'date-fns'

interface CustomerGrowthProps {
  data: Array<{ date: string; customers: number }>
  timeRange: string
}

export function CustomerGrowth({ data, timeRange }: CustomerGrowthProps) {
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
        <div className="bg-white p-3 border-2 border-green-500 rounded-lg shadow-lg">
          <p className="text-sm text-[#5C4033]/60 mb-1">
            {formatXAxis(payload[0].payload.date)}
          </p>
          <p className="text-lg font-bold text-green-600">
            {payload[0].value} new {payload[0].value === 1 ? 'customer' : 'customers'}
          </p>
        </div>
      )
    }
    return null
  }

  const totalNewCustomers = data.reduce((sum, item) => sum + item.customers, 0)

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-[#5C4033]">Customer Growth</h3>
            <p className="text-sm text-[#5C4033]/60">
              {totalNewCustomers} new {totalNewCustomers === 1 ? 'customer' : 'customers'}
            </p>
          </div>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-[#5C4033]/60">
          <p>No customer data for this period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#D4AF37" opacity={0.1} />
            <XAxis
              dataKey="date"
              tickFormatter={formatXAxis}
              stroke="#5C4033"
              style={{ fontSize: '12px' }}
            />
            <YAxis stroke="#5C4033" style={{ fontSize: '12px' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="customers"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#colorCustomers)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}

