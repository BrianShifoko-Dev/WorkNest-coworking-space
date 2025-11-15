import { DashboardStats } from '@/components/admin/dashboard/DashboardStats'
import { TodaysBookings } from '@/components/admin/dashboard/TodaysBookings'
import { RevenueChart } from '@/components/admin/dashboard/RevenueChart'
import { QuickActions } from '@/components/admin/dashboard/QuickActions'
import { RecentActivities } from '@/components/admin/dashboard/RecentActivities'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - WorkNest Admin',
  description: 'WorkNest admin dashboard overview',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <DashboardStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Charts and Tables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart - 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Recent Activities - 1 column */}
        <div>
          <RecentActivities />
        </div>
      </div>

      {/* Today's Bookings */}
      <TodaysBookings />
    </div>
  )
}

