import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET all gallery images (with filters)
export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')

    console.log('📸 Fetching gallery images with filters:', { category, featured })

    let query = supabase
      .from('gallery_images')
      .select('*')
      .order('display_order', { ascending: true })

    // Apply filters
    if (category && category !== 'all') {
      query = query.eq('category', category)
    }
    if (featured === 'true') {
      query = query.eq('is_featured', true)
    }

    const { data, error } = await query

    if (error) {
      console.error('❌ Error fetching gallery images:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found gallery images:', data?.length || 0)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new gallery image
export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    console.log('📸 Creating gallery image:', body.title)

    // Validate required fields
    if (!body.image_url) {
      return NextResponse.json(
        { error: 'Missing required field: image_url' },
        { status: 400 }
      )
    }

    // Create gallery image
    const { data, error } = await supabase
      .from('gallery_images')
      .insert({
        title: body.title || null,
        description: body.description || null,
        image_url: body.image_url,
        category: body.category || 'spaces',
        tags: body.tags || null,
        is_featured: body.is_featured || false,
        display_order: body.display_order || 0,
        uploaded_by: body.uploaded_by || null,
      })
      .select()
      .single()

    if (error) {
      console.error('❌ Error creating gallery image:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Gallery image created:', data.id)
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

