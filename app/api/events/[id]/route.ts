import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single event by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// PUT update event
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    console.log('📅 Updating event:', params.id)

    // Update slug if title changed
    if (body.title && !body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    const { data, error } = await supabase
      .from('events')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('❌ Error updating event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Event updated:', data.id)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// DELETE event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    console.log('📅 Deleting event:', params.id)

    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('❌ Error deleting event:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Event deleted:', params.id)
    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

