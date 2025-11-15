'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Clock } from 'lucide-react'

interface OperatingHoursSettingsProps {
  settings: any
  changes: any
  onChange: (key: string, value: any) => void
}

const DAYS = [
  { key: 'hours_monday', label: 'Monday' },
  { key: 'hours_tuesday', label: 'Tuesday' },
  { key: 'hours_wednesday', label: 'Wednesday' },
  { key: 'hours_thursday', label: 'Thursday' },
  { key: 'hours_friday', label: 'Friday' },
  { key: 'hours_saturday', label: 'Saturday' },
  { key: 'hours_sunday', label: 'Sunday' },
]

export function OperatingHoursSettings({ settings, changes, onChange }: OperatingHoursSettingsProps) {
  const getValue = (key: string) => {
    if (changes[key] !== undefined) return changes[key]
    return settings[key] || { open: '08:00', close: '18:00', is_open: true }
  }

  const updateDayHours = (key: string, field: 'open' | 'close' | 'is_open', value: any) => {
    const currentValue = getValue(key)
    onChange(key, {
      ...currentValue,
      [field]: value,
    })
  }

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-6 h-6 text-[#D4AF37]" />
        <div>
          <h2 className="text-xl font-bold text-[#5C4033]">Operating Hours</h2>
          <p className="text-sm text-[#5C4033]/60">Set your business operating hours for each day</p>
        </div>
      </div>

      <div className="space-y-4">
        {DAYS.map((day) => {
          const hours = getValue(day.key)
          return (
            <div
              key={day.key}
              className="p-4 border border-[#D4AF37]/20 rounded-lg hover:bg-[#FFFFF0]/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#5C4033]">{day.label}</h3>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`${day.key}_open`} className="text-sm font-normal text-[#5C4033]/70">
                    {hours.is_open ? 'Open' : 'Closed'}
                  </Label>
                  <Switch
                    id={`${day.key}_open`}
                    checked={hours.is_open}
                    onCheckedChange={(checked) => updateDayHours(day.key, 'is_open', checked)}
                  />
                </div>
              </div>

              {hours.is_open && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`${day.key}_open_time`} className="text-sm">Opening Time</Label>
                    <Input
                      id={`${day.key}_open_time`}
                      type="time"
                      value={hours.open}
                      onChange={(e) => updateDayHours(day.key, 'open', e.target.value)}
                      className="mt-1 border-[#D4AF37]/30"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${day.key}_close_time`} className="text-sm">Closing Time</Label>
                    <Input
                      id={`${day.key}_close_time`}
                      type="time"
                      value={hours.close}
                      onChange={(e) => updateDayHours(day.key, 'close', e.target.value)}
                      className="mt-1 border-[#D4AF37]/30"
                    />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-lg">
        <p className="text-sm text-[#5C4033]/70">
          <strong>Note:</strong> These hours will be displayed on your website and used for booking availability.
        </p>
      </div>
    </Card>
  )
}
