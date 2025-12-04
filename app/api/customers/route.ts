import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET all customers or search by email/phone
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const search = searchParams.get('search')
    const email = searchParams.get('email')
    const phone = searchParams.get('phone')

    let query = supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false })

    // Handle search with direct MySQL query for better performance
    if (search) {
      const { getMySQLPool } = await import('@/lib/db')
      const pool = getMySQLPool()
      try {
        const [results]: any = await pool.execute(
          `SELECT * FROM customers 
           WHERE LOWER(full_name) LIKE LOWER(?) 
           OR LOWER(email) LIKE LOWER(?) 
           OR phone LIKE ?
           ORDER BY created_at DESC`,
          [`%${search}%`, `%${search}%`, `%${search}%`]
        )
        return NextResponse.json(results || [])
      } catch (searchError: any) {
        console.error('Search error:', searchError)
        return NextResponse.json({ error: searchError.message }, { status: 500 })
      }
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
    const insertResult = await supabase
      .from('customers')
      .insert({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
      })

    if (insertResult.error) {
      console.error('Error creating customer:', insertResult.error)
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 })
    }

    // Fetch the created customer
    const customerId = insertResult.data?.id || (Array.isArray(insertResult.data) ? insertResult.data[0]?.id : null)
    if (!customerId) {
      return NextResponse.json({ error: 'Failed to create customer' }, { status: 500 })
    }

    const { data: customer, error: fetchError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .single()

    if (fetchError || !customer) {
      console.error('Error fetching created customer:', fetchError)
      return NextResponse.json({ error: 'Customer created but failed to fetch details' }, { status: 500 })
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


