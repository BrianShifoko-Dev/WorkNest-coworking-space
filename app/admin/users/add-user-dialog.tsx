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
import { Loader2, UserPlus, Eye, EyeOff, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'
import { 
  validatePassword, 
  getPasswordStrengthColor, 
  getPasswordStrengthBgColor,
  getPasswordStrengthLabel,
  generateStrongPassword,
  type PasswordValidation
} from '@/lib/password-validation'

interface AddUserDialogProps {
  onClose: () => void
}

export function AddUserDialog({ onClose }: AddUserDialogProps) {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'staff',
    phone: '',
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordValidation, setPasswordValidation] = useState<PasswordValidation | null>(null)

  useEffect(() => {
    if (formData.password) {
      setPasswordValidation(validatePassword(formData.password))
    } else {
      setPasswordValidation(null)
    }
  }, [formData.password])

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword(16)
    setFormData({ ...formData, password: newPassword })
    setShowPassword(true)
    toast.success('Strong password generated!')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate password
    const validation = validatePassword(formData.password)
    if (!validation.isValid) {
      toast.error('Password does not meet requirements', {
        description: validation.errors[0]
      })
      return
    }
    
    setLoading(true)

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('User created successfully')
        onClose()
      } else {
        toast.error(data.error || 'Failed to create user')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      toast.error('Error creating user')
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
          <DialogTitle className="text-2xl font-bold text-[#5C4033] flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-[#D4AF37]" />
            Add New User
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
              placeholder="John Doe"
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
              placeholder="john@worknest.co.ke"
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
                <SelectValue placeholder="Select role" />
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
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="password">Password *</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleGeneratePassword}
                className="h-7 text-xs text-[#D4AF37] hover:text-[#B8941F] hover:bg-[#D4AF37]/10"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Generate
              </Button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="border-[#D4AF37]/30 pr-10"
                placeholder="••••••••"
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C4033]/60 hover:text-[#5C4033]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Strength Indicator */}
            {passwordValidation && (
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#5C4033]/60">Password Strength:</span>
                  <span className={`text-xs font-semibold ${getPasswordStrengthColor(passwordValidation.strength)}`}>
                    {getPasswordStrengthLabel(passwordValidation.strength)}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPasswordStrengthBgColor(passwordValidation.strength)} transition-all duration-300`}
                    style={{ width: `${(passwordValidation.score / 7) * 100}%` }}
                  />
                </div>
                {passwordValidation.errors.length > 0 && (
                  <div className="space-y-1">
                    {passwordValidation.errors.map((error, idx) => (
                      <div key={idx} className="flex items-start gap-1 text-xs text-red-600">
                        <XCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    ))}
                  </div>
                )}
                {passwordValidation.isValid && (
                  <div className="flex items-start gap-1 text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mt-0.5" />
                    <span>Password meets all requirements</span>
                  </div>
                )}
              </div>
            )}

            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs text-blue-700">
              <strong>Requirements:</strong>
              <ul className="mt-1 ml-4 space-y-0.5 list-disc">
                <li>At least 8 characters</li>
                <li>One uppercase & one lowercase letter</li>
                <li>One number & one special character</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-[#FFFFF0] border border-[#D4AF37]/20 rounded-lg">
            <p className="text-sm text-[#5C4033]/70">
              <strong>Note:</strong> The new user will be able to log in immediately with the provided credentials.
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
                  Creating...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create User
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

