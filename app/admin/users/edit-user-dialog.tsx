'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2, Save, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

interface User {
  id: string
  email: string
  full_name: string
  role: string
  phone?: string
}

interface EditUserDialogProps {
  user: User
  onClose: () => void
}

export function EditUserDialog({ user, onClose }: EditUserDialogProps) {
  const [formData, setFormData] = useState({
    email: user.email,
    full_name: user.full_name,
    password: '', // Leave empty to not change
    role: user.role,
    phone: user.phone || '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Only include password if it was changed
      const updateData = { ...formData }
      if (!updateData.password) {
        delete updateData.password
      }

      const response = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('User updated successfully')
        onClose()
      } else {
        toast.error(data.error || 'Failed to update user')
      }
    } catch (error) {
      console.error('Error updating user:', error)
      toast.error('Error updating user')
    } finally {
      setLoading(false)
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'manager':
        return 'Full access to all features'
      case 'accountant':
        return 'Access to financial data: Payments, Reports, Bookings'
      case 'reception':
        return 'Manage bookings, customers, payments'
      case 'staff':
        return 'View bookings and customers'
      default:
        return ''
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#5C4033]">
            Edit User
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              required
              className="mt-2 border-[#D4AF37]/30"
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="mt-2 border-[#D4AF37]/30"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-2 border-[#D4AF37]/30"
              placeholder="+254 712 345 678"
            />
          </div>

          <div>
            <Label htmlFor="role">Role *</Label>
            <Select
              value={formData.role}
              onValueChange={(value) => setFormData({ ...formData, role: value })}
            >
              <SelectTrigger className="mt-2 border-[#D4AF37]/30">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999]">
                <SelectItem value="manager">👑 Manager</SelectItem>
                <SelectItem value="accountant">💰 Accountant</SelectItem>
                <SelectItem value="reception">📞 Reception</SelectItem>
                <SelectItem value="staff">👤 Staff</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-[#5C4033]/60 mt-1">
              {getRoleDescription(formData.role)}
            </p>
          </div>

          <div>
            <Label htmlFor="password">New Password (optional)</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-[#D4AF37]/30 pr-10"
                placeholder="Leave empty to keep current"
                minLength={6}
              />
              {formData.password && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C4033]/60 hover:text-[#5C4033]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              )}
            </div>
            <p className="text-xs text-[#5C4033]/60 mt-1">
              {formData.password ? 'Minimum 6 characters' : 'Leave empty to keep current password'}
            </p>
          </div>

          <div className="p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-lg">
            <p className="text-sm text-[#5C4033]/70">
              <strong>Note:</strong> Changes will take effect immediately. The user may need to log in again if their password was changed.
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="flex-1 border-[#D4AF37]/30"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#D4AF37] hover:bg-[#B8941F] text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

