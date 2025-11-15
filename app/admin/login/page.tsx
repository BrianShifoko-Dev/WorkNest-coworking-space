import { LoginForm } from './login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Login - WorkNest Management',
  description: 'Login to WorkNest admin dashboard',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFFF0] via-[#FFF8DC] to-[#D4AF37]/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#5C4033] mb-2">WorkNest Admin</h1>
          <p className="text-[#5C4033]/60">Management Dashboard</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-[#D4AF37]/20">
          <h2 className="text-2xl font-semibold text-[#5C4033] mb-6">Sign In</h2>
          <LoginForm />
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-[#5C4033]/60 mt-6">
          © 2025 The WorkNest. All rights reserved.
        </p>
      </div>
    </div>
  )
}

