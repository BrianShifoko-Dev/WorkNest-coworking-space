import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import bcrypt from 'bcryptjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET all users
export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('👥 Fetching all users')

    const { data: users, error } = await supabase
      .from('users')
      .select('id, email, full_name, role, phone, created_at')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching users:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found users:', users?.length || 0)
    return NextResponse.json(users || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new user
export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    console.log('👥 Creating new user:', body.email)

    // Validate required fields
    if (!body.email || !body.full_name || !body.password || !body.role) {
      return NextResponse.json(
        { error: 'Missing required fields: email, full_name, password, role' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', body.email)
      .single()

    if (existing) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // Create user
    const { data: user, error: createError } = await supabase
      .from('users')
      .insert({
        email: body.email,
        full_name: body.full_name,
        password_hash: hashedPassword,
        role: body.role,
        phone: body.phone || null,
      })
      .select('id, email, full_name, role, phone, created_at')
      .single()

    if (createError) {
      console.error('❌ Error creating user:', createError)
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    // Log activity
    await supabase.from('audit_logs').insert({
      user_id: user.id,
      action: 'user_created',
      entity_type: 'user',
      entity_id: user.id,
      details: {
        email: user.email,
        role: user.role,
      },
    })

    console.log('✅ User created:', user.id)
    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

