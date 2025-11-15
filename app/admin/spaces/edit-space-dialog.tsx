'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toast } from 'sonner'
import { X, Loader2, Star } from 'lucide-react'

interface Space {
  id: string
  name: string
  type: string
  description: string
  capacity: number
  hourly_rate: number
  daily_rate: number
  weekly_rate: number
  monthly_rate: number
  status: string
  is_featured?: boolean
}

interface EditSpaceDialogProps {
  open: boolean
  space: Space
  onClose: () => void
  onSuccess: () => void
}

export function EditSpaceDialog({ open, space, onClose, onSuccess }: EditSpaceDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: space.name,
    type: space.type,
    description: space.description,
    capacity: space.capacity.toString(),
    hourly_rate: space.hourly_rate?.toString() || '',
    daily_rate: space.daily_rate?.toString() || '',
    weekly_rate: space.weekly_rate?.toString() || '',
    monthly_rate: space.monthly_rate?.toString() || '',
    status: space.status,
    is_featured: space.is_featured || false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/spaces/${space.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          capacity: parseInt(formData.capacity),
          hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
          daily_rate: formData.daily_rate ? parseFloat(formData.daily_rate) : null,
          weekly_rate: formData.weekly_rate ? parseFloat(formData.weekly_rate) : null,
          monthly_rate: formData.monthly_rate ? parseFloat(formData.monthly_rate) : null,
          is_featured: formData.is_featured
        })
      })

      if (response.ok) {
        toast.success('Space updated successfully!')
        onSuccess()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to update space')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error updating space')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
          <h2 className="text-2xl font-bold text-[#5C4033]">Edit Space</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors">
            <X className="w-5 h-5 text-[#5C4033]" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#5C4033]">Space Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type" className="text-[#5C4033]">Type *</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="office">Office</SelectItem>
                    <SelectItem value="boardroom">Boardroom</SelectItem>
                    <SelectItem value="event_space">Event Space</SelectItem>
                    <SelectItem value="call_pod">Call Pod</SelectItem>
                    <SelectItem value="restaurant_table">Restaurant Table</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status" className="text-[#5C4033]">Status *</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="disabled">Disabled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description" className="text-[#5C4033]">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="capacity" className="text-[#5C4033]">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                required
                min="1"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourly_rate">Hourly Rate (KSh)</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="daily_rate">Daily Rate (KSh)</Label>
                <Input
                  id="daily_rate"
                  type="number"
                  value={formData.daily_rate}
                  onChange={(e) => setFormData({ ...formData, daily_rate: e.target.value })}
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="is_featured"
                checked={formData.is_featured}
                onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                className="mt-1 w-5 h-5 rounded border-[#D4AF37] text-[#D4AF37] focus:ring-[#D4AF37] cursor-pointer"
              />
              <div className="flex-1">
                <Label htmlFor="is_featured" className="text-[#5C4033] font-semibold flex items-center gap-2 cursor-pointer">
                  <Star className="w-5 h-5 text-[#D4AF37]" />
                  Mark as Featured
                </Label>
                <p className="text-sm text-[#5C4033]/60 mt-1">
                  Featured spaces will appear on the homepage and get priority visibility
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/20">
            <Button type="button" onClick={onClose} variant="outline" className="flex-1" disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]" disabled={loading}>
              {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Updating...</> : 'Update Space'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

