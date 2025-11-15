'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { CalendarPlus, Building2, UserPlus, ImagePlus } from 'lucide-react'

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      name: 'New Booking',
      description: 'Create a booking for walk-in customer',
      icon: CalendarPlus,
      onClick: () => router.push('/admin/bookings'),
      color: 'from-[#D4AF37] to-[#B8941F]'
    },
    {
      name: 'Add Space',
      description: 'Add a new bookable space',
      icon: Building2,
      onClick: () => router.push('/admin/spaces'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'New Customer',
      description: 'Register a new customer',
      icon: UserPlus,
      onClick: () => router.push('/admin/customers'),
      color: 'from-green-500 to-green-600'
    },
    {
      name: 'Upload Images',
      description: 'Add photos to gallery',
      icon: ImagePlus,
      onClick: () => router.push('/admin/gallery'),
      color: 'from-purple-500 to-purple-600'
    }
  ]

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <h2 className="text-lg font-bold text-[#5C4033] mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.name}
            onClick={action.onClick}
            className="p-4 border border-[#D4AF37]/20 rounded-lg hover:shadow-md transition-all hover:border-[#D4AF37] cursor-pointer group text-left w-full"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-semibold text-[#5C4033] mb-1">{action.name}</h3>
            <p className="text-xs text-[#5C4033]/60">{action.description}</p>
          </button>
        ))}
      </div>
    </Card>
  )
}

