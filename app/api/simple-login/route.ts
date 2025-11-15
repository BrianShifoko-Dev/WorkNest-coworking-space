import { NextResponse } from 'next/server'
import { compare } from 'bcryptjs'
import { getSupabaseClient } from '@/lib/supabase-server'


export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    console.log('🔐 Simple login attempt:', email)

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password required' },
        { status: 400 }
      )
    }

    // Create Supabase client
    const supabase = getSupabaseClient()

    // Get user
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('status', 'active')
      .single()

    if (error || !user) {
      console.log('❌ User not found')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ User found:', user.email)

    // Verify password
    const isValid = await compare(password, user.password_hash)

    if (!isValid) {
      console.log('❌ Invalid password')
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    console.log('✅ Login successful!')

    // Return user data (create simple session)
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.full_name,
        role: user.role,
        phone: user.phone
      }
    })

    // Set a simple cookie
    response.cookies.set('worknest_user', JSON.stringify({
      id: user.id,
      email: user.email,
      name: user.full_name,
      role: user.role
    }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    return response
  } catch (error) {
    console.error('❌ Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

