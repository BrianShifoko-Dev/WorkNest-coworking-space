'use client'

import { Card } from '@/components/ui/card'
import { BarChart3 } from 'lucide-react'

export function RevenueChart() {
  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#5C4033]">Revenue Overview</h2>
        <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
      </div>
      
      <div className="h-64 flex items-center justify-center text-[#5C4033]/40">
        Chart will be implemented with Recharts
      </div>
    </Card>
  )
}

