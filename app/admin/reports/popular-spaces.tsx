'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, TrendingUp, DollarSign } from 'lucide-react'

interface PopularSpacesProps {
  data: Array<{
    name: string
    type: string
    bookings: number
    revenue: number
  }>
}

export function PopularSpaces({ data }: PopularSpacesProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'office':
        return 'bg-blue-100 text-blue-700 border-blue-300'
      case 'boardroom':
      case 'meeting_room':
        return 'bg-purple-100 text-purple-700 border-purple-300'
      case 'event_space':
        return 'bg-green-100 text-green-700 border-green-300'
      case 'call_pod':
        return 'bg-amber-100 text-amber-700 border-amber-300'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#5C4033]">Popular Spaces</h3>
          <p className="text-sm text-[#5C4033]/60">Top performing spaces</p>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-12 text-[#5C4033]/60">
          <Building2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p>No space data for this period</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {data.map((space, index) => (
            <div
              key={space.name}
              className="p-4 border border-[#D4AF37]/20 rounded-lg hover:bg-[#FFFFF0]/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-[#5C4033]">{space.name}</h4>
                  </div>
                  <Badge className={`${getTypeColor(space.type)} border text-xs`}>
                    {space.type.replace('_', ' ').toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-[#D4AF37]/10">
                <div>
                  <p className="text-xs text-[#5C4033]/60 mb-1">Bookings</p>
                  <p className="text-lg font-bold text-blue-600">{space.bookings}</p>
                </div>
                <div>
                  <p className="text-xs text-[#5C4033]/60 mb-1">Revenue</p>
                  <p className="text-lg font-bold text-[#D4AF37]">
                    KES {space.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}

