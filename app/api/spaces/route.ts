import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET all spaces (with optional filters)
export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)
    
    const featured = searchParams.get('featured')
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    console.log('📍 Fetching spaces with filters:', { featured, type, status })

    let query = supabase
      .from('spaces')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }
    if (type) {
      query = query.eq('type', type)
    }
    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching spaces:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found spaces:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create new space
export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    const { data, error } = await supabase
      .from('spaces')
      .insert({
        name: body.name,
        type: body.type,
        description: body.description,
        capacity: body.capacity,
        hourly_rate: body.hourly_rate,
        daily_rate: body.daily_rate,
        weekly_rate: body.weekly_rate,
        monthly_rate: body.monthly_rate,
        images: body.images || [],
        amenities: body.amenities || [],
        status: 'available',
        is_featured: body.is_featured || false
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating space:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ space: data }, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

