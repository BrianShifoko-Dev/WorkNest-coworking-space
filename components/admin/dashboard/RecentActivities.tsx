'use client'

import { Card } from '@/components/ui/card'
import { Activity } from 'lucide-react'

export function RecentActivities() {
  return (
    <Card className="p-6 border-[#D4AF37]/20 h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#5C4033]">Recent Activities</h2>
        <Activity className="w-5 h-5 text-[#D4AF37]" />
      </div>
      
      <div className="space-y-4">
        <div className="text-sm text-[#5C4033]/60 text-center py-8">
          Activity feed coming soon
        </div>
      </div>
    </Card>
  )
}

