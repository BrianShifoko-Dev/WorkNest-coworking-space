import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


// GET all menu items (with filters)
export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const available = searchParams.get('available')

    console.log('🍽️ Fetching menu items with filters:', { category, available })

    let query = supabase
      .from('menu_items')
      .select('*')
      .order('display_order', { ascending: true })

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (available === 'true') {
      query = query.eq('is_available', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Error fetching menu items:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found menu items:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new menu item
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    console.log('🍽️ Creating menu item:', body.name)

    // Validate required fields
    if (!body.name || !body.category || !body.price) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, price' },
        { status: 400 }
      )
    }

    // Generate slug from name
    const slug = body.slug || body.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create menu item
    const { data, error } = await supabase
      .from('menu_items')
      .insert({
        name: body.name,
        slug: slug,
        description: body.description || null,
        category: body.category,
        price: body.price,
        image_url: body.image_url || null,
        is_available: body.is_available !== undefined ? body.is_available : true,
        is_featured: body.is_featured || false,
        dietary_info: body.dietary_info || null,
        spice_level: body.spice_level || null,
        prep_time: body.prep_time || null,
        calories: body.calories || null,
        display_order: body.display_order || 0,
        created_by: body.created_by || null,
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Error creating menu item:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Menu item created:', data.id)
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

