'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Attempting login with:', formData.email)
      
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      console.log('Login result:', result)

      if (result?.error) {
        console.error('Login error:', result.error)
        toast.error('Login failed', {
          description: result.error || 'Invalid email or password. Please try again.'
        })
      } else if (result?.ok) {
        toast.success('Login successful!', {
          description: 'Redirecting to dashboard...'
        })
        window.location.href = '/admin/dashboard'
      }
    } catch (error) {
      console.error('Login exception:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-[#5C4033] font-medium">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="admin@worknest.co.ke"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          disabled={isLoading}
          className="h-12 border-[#D4AF37]/30 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <Label htmlFor="password" className="text-[#5C4033] font-medium">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={isLoading}
            className="h-12 pr-12 border-[#D4AF37]/30 focus:border-[#D4AF37] focus:ring-[#D4AF37]"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C4033]/50 hover:text-[#5C4033]"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>🔒 Secure Login</strong>
        </p>
        <p className="text-xs text-blue-600 mt-1">
          Use your WorkNest credentials to access the admin panel.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#9A7A1A] text-white font-semibold text-base shadow-lg"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </Button>

      {/* Forgot Password Link */}
      <div className="text-center">
        <button
          type="button"
          className="text-sm text-[#D4AF37] hover:text-[#B8941F] font-medium"
          onClick={() => toast.info('Contact system administrator to reset password')}
        >
          Forgot password?
        </button>
      </div>
    </form>
  )
}

