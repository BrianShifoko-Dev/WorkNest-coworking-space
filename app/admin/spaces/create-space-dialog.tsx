'use client'

import { useState } from 'react'
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

interface CreateSpaceDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: () => void
}

export function CreateSpaceDialog({ open, onClose, onSuccess }: CreateSpaceDialogProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: 'office',
    description: '',
    capacity: '',
    hourly_rate: '',
    daily_rate: '',
    weekly_rate: '',
    monthly_rate: '',
    image1: '',
    image2: '',
    image3: '',
    image4: '',
    amenities: '',
    is_featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Prepare images array
      const images = [
        formData.image1,
        formData.image2,
        formData.image3,
        formData.image4
      ].filter(img => img.trim() !== '')

      // Prepare amenities array
      const amenities = formData.amenities
        .split(',')
        .map(a => a.trim())
        .filter(a => a !== '')

      const response = await fetch('/api/spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          type: formData.type,
          description: formData.description,
          capacity: parseInt(formData.capacity),
          hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
          daily_rate: formData.daily_rate ? parseFloat(formData.daily_rate) : null,
          weekly_rate: formData.weekly_rate ? parseFloat(formData.weekly_rate) : null,
          monthly_rate: formData.monthly_rate ? parseFloat(formData.monthly_rate) : null,
          images,
          amenities,
          is_featured: formData.is_featured
        })
      })

      if (response.ok) {
        toast.success('Space created successfully!')
        onSuccess()
      } else {
        const data = await response.json()
        toast.error(data.error || 'Failed to create space')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error creating space')
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#D4AF37]/20">
          <h2 className="text-2xl font-bold text-[#5C4033]">Add New Space</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#D4AF37]/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#5C4033]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-[#5C4033]">Space Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Executive Office 1"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="type" className="text-[#5C4033]">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
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
              <Label htmlFor="description" className="text-[#5C4033]">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the space..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="capacity" className="text-[#5C4033]">Capacity (people) *</Label>
              <Input
                id="capacity"
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                placeholder="e.g., 10"
                required
                min="1"
                className="mt-1"
              />
            </div>
          </div>

          {/* Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5C4033]">Images (URLs)</h3>
            <p className="text-sm text-[#5C4033]/60">Add up to 4 image URLs (e.g., from Unsplash)</p>
            
            <div className="space-y-3">
              <Input
                placeholder="Image 1 URL (Main image)"
                value={formData.image1}
                onChange={(e) => setFormData({ ...formData, image1: e.target.value })}
              />
              <Input
                placeholder="Image 2 URL"
                value={formData.image2}
                onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
              />
              <Input
                placeholder="Image 3 URL"
                value={formData.image3}
                onChange={(e) => setFormData({ ...formData, image3: e.target.value })}
              />
              <Input
                placeholder="Image 4 URL"
                value={formData.image4}
                onChange={(e) => setFormData({ ...formData, image4: e.target.value })}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-2">
            <Label htmlFor="amenities" className="text-[#5C4033]">Amenities</Label>
            <Input
              id="amenities"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              placeholder="e.g., Lockable door, Adjustable desk, Ergonomic chair"
            />
            <p className="text-xs text-[#5C4033]/50">Separate with commas</p>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#5C4033]">Pricing</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="hourly_rate" className="text-[#5C4033]">Hourly Rate (KSh)</Label>
                <Input
                  id="hourly_rate"
                  type="number"
                  value={formData.hourly_rate}
                  onChange={(e) => setFormData({ ...formData, hourly_rate: e.target.value })}
                  placeholder="e.g., 500"
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="daily_rate" className="text-[#5C4033]">Daily Rate (KSh)</Label>
                <Input
                  id="daily_rate"
                  type="number"
                  value={formData.daily_rate}
                  onChange={(e) => setFormData({ ...formData, daily_rate: e.target.value })}
                  placeholder="e.g., 3000"
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="weekly_rate" className="text-[#5C4033]">Weekly Rate (KSh)</Label>
                <Input
                  id="weekly_rate"
                  type="number"
                  value={formData.weekly_rate}
                  onChange={(e) => setFormData({ ...formData, weekly_rate: e.target.value })}
                  placeholder="e.g., 18000"
                  min="0"
                  step="0.01"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="monthly_rate" className="text-[#5C4033]">Monthly Rate (KSh)</Label>
                <Input
                  id="monthly_rate"
                  type="number"
                  value={formData.monthly_rate}
                  onChange={(e) => setFormData({ ...formData, monthly_rate: e.target.value })}
                  placeholder="e.g., 60000"
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

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/20">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Space'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

