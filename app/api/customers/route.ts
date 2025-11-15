import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


// GET all customers or search by email/phone
export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')

    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }
    if (email) {
      query = query.eq('email', email)
    }
    if (phone) {
      query = query.eq('phone', phone)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching customers:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create or find customer
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    // Validate required fields
    if (!body.email || !body.full_name || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: email, full_name, phone' },
        { status: 400 }
      )
    }

    // Check if customer already exists by email
    const { data: existing, error: checkError } = await supabase
      .from('customers')
      .select('*')
      .eq('email', body.email)
      .single()

    if (existing) {
      // Customer exists, return existing customer
      return NextResponse.json({ 
        customer: existing, 
        message: 'Customer already exists',
        isNew: false 
      })
    }

    // Create new customer
    const { data: customer, error: createError } = await supabase
      .from('customers')
      .insert({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
      })
      .select()
      .single()

    if (createError) {
      console.error('Error creating customer:', createError)
      return NextResponse.json({ error: createError.message }, { status: 500 })
    }

    return NextResponse.json({ 
      customer, 
      message: 'Customer created successfully',
      isNew: true 
    }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


