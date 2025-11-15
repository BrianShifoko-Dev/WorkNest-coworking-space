import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { compare } from "bcryptjs"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          console.log('🔐 Auth attempt for:', credentials?.email)
          
          if (!credentials?.email || !credentials?.password) {
            console.log('❌ Missing credentials')
            return null
          }

          // Create Supabase client in the route
          const supabase = createClient(supabaseUrl, supabaseKey)

          // Get user from Supabase
          const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', credentials.email)
            .eq('status', 'active')
            .single()

          if (error || !user) {
            console.log('❌ User not found or error:', error?.message)
            return null
          }

          console.log('✅ User found:', user.email)

          // Verify password
          const isPasswordValid = await compare(credentials.password, user.password_hash)

          if (!isPasswordValid) {
            console.log('❌ Invalid password')
            return null
          }

          console.log('✅ Password valid, login successful!')

          // Return user object (without password)
          return {
            id: user.id,
            email: user.email,
            name: user.full_name,
            role: user.role,
            phone: user.phone
          }
        } catch (error) {
          console.error('❌ Auth error:', error)
          return null
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = user.role
        token.phone = user.phone
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.phone = token.phone as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode
})

export { handler as GET, handler as POST }

