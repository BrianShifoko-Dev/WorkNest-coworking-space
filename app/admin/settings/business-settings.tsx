'use client'

import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Building2, Mail, Phone, MapPin, FileText } from 'lucide-react'

interface BusinessSettingsProps {
  settings: any
  changes: any
  onChange: (key: string, value: any) => void
}

export function BusinessSettings({ settings, changes, onChange }: BusinessSettingsProps) {
  const getValue = (key: string) => {
    if (changes[key] !== undefined) return changes[key]
    return settings[key] || ''
  }

  return (
    <Card className="p-6 border-[#D4AF37]/20">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="w-6 h-6 text-[#D4AF37]" />
        <div>
          <h2 className="text-xl font-bold text-[#5C4033]">Business Information</h2>
          <p className="text-sm text-[#5C4033]/60">Update your business details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="business_name" className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            Business Name
          </Label>
          <Input
            id="business_name"
            value={getValue('business_name')}
            onChange={(e) => onChange('business_name', e.target.value)}
            className="mt-2 border-[#D4AF37]/30"
            placeholder="WorkNest"
          />
        </div>

        <div>
          <Label htmlFor="business_email" className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#D4AF37]" />
            Business Email
          </Label>
          <Input
            id="business_email"
            type="email"
            value={getValue('business_email')}
            onChange={(e) => onChange('business_email', e.target.value)}
            className="mt-2 border-[#D4AF37]/30"
            placeholder="hello@worknest.co.ke"
          />
        </div>

        <div>
          <Label htmlFor="business_phone" className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#D4AF37]" />
            Business Phone
          </Label>
          <Input
            id="business_phone"
            type="tel"
            value={getValue('business_phone')}
            onChange={(e) => onChange('business_phone', e.target.value)}
            className="mt-2 border-[#D4AF37]/30"
            placeholder="+254 712 345 678"
          />
        </div>

        <div>
          <Label htmlFor="business_address" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            Business Address
          </Label>
          <Input
            id="business_address"
            value={getValue('business_address')}
            onChange={(e) => onChange('business_address', e.target.value)}
            className="mt-2 border-[#D4AF37]/30"
            placeholder="Eldoret, Kenya"
          />
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="business_description" className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#D4AF37]" />
            Business Description
          </Label>
          <Textarea
            id="business_description"
            value={getValue('business_description')}
            onChange={(e) => onChange('business_description', e.target.value)}
            className="mt-2 border-[#D4AF37]/30"
            rows={4}
            placeholder="Premium Coworking Space in Eldoret"
          />
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-lg">
        <p className="text-sm text-[#5C4033]/70">
          <strong>Note:</strong> These details will appear on your website, emails, and official documents.
        </p>
      </div>
    </Card>
  )
}

