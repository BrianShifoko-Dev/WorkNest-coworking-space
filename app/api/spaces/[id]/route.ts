import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single space
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const { data, error } = await supabase
      .from('spaces')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json({ space: data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update space
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from('spaces')
      .update({
        name: body.name,
        type: body.type,
        description: body.description,
        capacity: body.capacity,
        hourly_rate: body.hourly_rate,
        daily_rate: body.daily_rate,
        weekly_rate: body.weekly_rate,
        monthly_rate: body.monthly_rate,
        images: body.images,
        amenities: body.amenities,
        status: body.status,
        is_featured: body.is_featured !== undefined ? body.is_featured : false
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ space: data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE space
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    const { error } = await supabase
      .from('spaces')
      .delete()
      .eq('id', params.id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Space deleted successfully' })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

