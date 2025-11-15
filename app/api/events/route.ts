import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'

// GET all events (with filters)
export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    console.log('📅 Fetching events with filters:', { status, category, featured })

    let query = supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Error fetching events:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found events:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new event
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    console.log('📅 Creating event:', body.title)

    // Validate required fields
    if (!body.title || !body.event_date) {
      return NextResponse.json(
        { error: 'Missing required fields: title, event_date' },
        { status: 400 }
      )
    }

    // Generate slug from title
    const slug = body.slug || body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        title: body.title,
        slug: slug,
        description: body.description || null,
        event_date: body.event_date,
        start_time: body.start_time || null,
        end_time: body.end_time || null,
        location: body.location || null,
        category: body.category || 'networking',
        image_url: body.image_url || null,
        price: body.price || 0,
        capacity: body.capacity || null,
        status: body.status || 'upcoming',
        is_featured: body.is_featured || false,
        created_by: body.created_by || null,
      })
      .select()
      .single()

    if (eventError) {
      console.error('❌ Error creating event:', eventError)
      return NextResponse.json({ error: eventError.message }, { status: 500 })
    }

    console.log('✅ Event created:', event.id)
    return NextResponse.json(event, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

