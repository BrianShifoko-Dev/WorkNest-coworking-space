'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Settings2, AlertTriangle } from 'lucide-react'

interface SystemSettingsProps {
  settings: any
  changes: any
  onChange: (key: string, value: any) => void
}

export function SystemSettings({ settings, changes, onChange }: SystemSettingsProps) {
  const getValue = (key: string) => {
    if (changes[key] !== undefined) return changes[key]
    return settings[key]
  }

  return (
    <div className="space-y-6">
      {/* Booking Settings */}
      <Card className="p-6 border-[#D4AF37]/20">
        <div className="flex items-center gap-3 mb-6">
          <Settings2 className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-xl font-bold text-[#5C4033]">Booking Settings</h2>
            <p className="text-sm text-[#5C4033]/60">Configure booking rules and restrictions</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="booking_advance_days">Max Advance Booking (Days)</Label>
              <Input
                id="booking_advance_days"
                type="number"
                value={getValue('booking_advance_days') || 30}
                onChange={(e) => onChange('booking_advance_days', e.target.value)}
                className="mt-2 border-[#D4AF37]/30"
                min="1"
                max="365"
              />
              <p className="text-xs text-[#5C4033]/50 mt-1">How far in advance customers can book</p>
            </div>

            <div>
              <Label htmlFor="booking_min_duration">Min Duration (Hours)</Label>
              <Input
                id="booking_min_duration"
                type="number"
                value={getValue('booking_min_duration') || 1}
                onChange={(e) => onChange('booking_min_duration', e.target.value)}
                className="mt-2 border-[#D4AF37]/30"
                min="1"
                max="24"
              />
              <p className="text-xs text-[#5C4033]/50 mt-1">Minimum booking duration</p>
            </div>

            <div>
              <Label htmlFor="booking_max_duration">Max Duration (Hours)</Label>
              <Input
                id="booking_max_duration"
                type="number"
                value={getValue('booking_max_duration') || 24}
                onChange={(e) => onChange('booking_max_duration', e.target.value)}
                className="mt-2 border-[#D4AF37]/30"
                min="1"
                max="168"
              />
              <p className="text-xs text-[#5C4033]/50 mt-1">Maximum booking duration</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="cancellation_hours">Cancellation Notice (Hours)</Label>
              <Input
                id="cancellation_hours"
                type="number"
                value={getValue('cancellation_hours') || 24}
                onChange={(e) => onChange('cancellation_hours', e.target.value)}
                className="mt-2 border-[#D4AF37]/30"
                min="0"
                max="168"
              />
              <p className="text-xs text-[#5C4033]/50 mt-1">Hours before booking to allow cancellation</p>
            </div>

            <div>
              <Label htmlFor="tax_rate">Tax Rate (%)</Label>
              <Input
                id="tax_rate"
                type="number"
                value={getValue('tax_rate') || 16}
                onChange={(e) => onChange('tax_rate', e.target.value)}
                className="mt-2 border-[#D4AF37]/30"
                min="0"
                max="100"
                step="0.1"
              />
              <p className="text-xs text-[#5C4033]/50 mt-1">VAT/Tax percentage</p>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20">
            <div className="flex items-center justify-between p-3 bg-[#FFFFF0] rounded-lg">
              <div>
                <Label htmlFor="auto_confirm_bookings" className="font-semibold text-[#5C4033]">
                  Auto-Confirm Bookings
                </Label>
                <p className="text-xs text-[#5C4033]/60 mt-1">
                  Automatically confirm bookings without manual approval
                </p>
              </div>
              <Switch
                id="auto_confirm_bookings"
                checked={getValue('auto_confirm_bookings') === true || getValue('auto_confirm_bookings') === 'true'}
                onCheckedChange={(checked) => onChange('auto_confirm_bookings', checked)}
              />
            </div>

            <div className="flex items-center justify-between p-3 bg-[#FFFFF0] rounded-lg">
              <div>
                <Label htmlFor="require_payment" className="font-semibold text-[#5C4033]">
                  Require Payment Before Confirmation
                </Label>
                <p className="text-xs text-[#5C4033]/60 mt-1">
                  Bookings must be paid before they are confirmed
                </p>
              </div>
              <Switch
                id="require_payment"
                checked={getValue('require_payment') === true || getValue('require_payment') === 'true'}
                onCheckedChange={(checked) => onChange('require_payment', checked)}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 border-[#D4AF37]/20">
        <div className="flex items-center gap-3 mb-6">
          <Settings2 className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-xl font-bold text-[#5C4033]">Notification Settings</h2>
            <p className="text-sm text-[#5C4033]/60">Configure notification preferences</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#FFFFF0] rounded-lg">
            <div>
              <Label htmlFor="notifications_enabled" className="font-semibold text-[#5C4033]">
                Enable Notifications
              </Label>
              <p className="text-xs text-[#5C4033]/60 mt-1">
                Show in-app notifications for important events
              </p>
            </div>
            <Switch
              id="notifications_enabled"
              checked={getValue('notifications_enabled') === true || getValue('notifications_enabled') === 'true'}
              onCheckedChange={(checked) => onChange('notifications_enabled', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#FFFFF0] rounded-lg">
            <div>
              <Label htmlFor="notification_sound" className="font-semibold text-[#5C4033]">
                Notification Sound
              </Label>
              <p className="text-xs text-[#5C4033]/60 mt-1">
                Play sound when new notifications arrive
              </p>
            </div>
            <Switch
              id="notification_sound"
              checked={getValue('notification_sound') === true || getValue('notification_sound') === 'true'}
              onCheckedChange={(checked) => onChange('notification_sound', checked)}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-[#FFFFF0] rounded-lg">
            <div>
              <Label htmlFor="desktop_notifications" className="font-semibold text-[#5C4033]">
                Desktop Notifications
              </Label>
              <p className="text-xs text-[#5C4033]/60 mt-1">
                Show browser desktop notifications (requires permission)
              </p>
            </div>
            <Switch
              id="desktop_notifications"
              checked={getValue('desktop_notifications') === true || getValue('desktop_notifications') === 'true'}
              onCheckedChange={(checked) => onChange('desktop_notifications', checked)}
            />
          </div>
        </div>
      </Card>

      {/* Maintenance Mode */}
      <Card className="p-6 border-red-300 bg-red-50/50">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
          <div>
            <h2 className="text-xl font-bold text-red-900">Maintenance Mode</h2>
            <p className="text-sm text-red-700">Use with caution - will disable customer access</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-300">
          <div>
            <Label htmlFor="site_maintenance" className="font-semibold text-red-900">
              Enable Maintenance Mode
            </Label>
            <p className="text-xs text-red-700 mt-1">
              Display maintenance page to customers (admin access not affected)
            </p>
          </div>
          <Switch
            id="site_maintenance"
            checked={getValue('site_maintenance') === true || getValue('site_maintenance') === 'true'}
            onCheckedChange={(checked) => onChange('site_maintenance', checked)}
          />
        </div>
      </Card>
    </div>
  )
}
