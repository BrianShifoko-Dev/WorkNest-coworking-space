import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single gallery image by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    
    const { data, error } = await supabase
      .from('gallery_images')
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

// PUT update gallery image
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    console.log('📸 Updating gallery image:', params.id)

    const { data, error } = await supabase
      .from('gallery_images')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('❌ Error updating gallery image:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Gallery image updated:', data.id)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// DELETE gallery image
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    console.log('📸 Deleting gallery image:', params.id)

    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('❌ Error deleting gallery image:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Gallery image deleted:', params.id)
    return NextResponse.json({ message: 'Gallery image deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

