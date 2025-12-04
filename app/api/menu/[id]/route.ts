import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single menu item by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    
    const { data, error } = await supabase
      .from('menu_items')
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

// PUT update menu item
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    console.log('🍽️ Updating menu item:', params.id)

    const { data, error } = await supabase
      .from('menu_items')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('❌ Error updating menu item:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Menu item updated:', data.id)
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// DELETE menu item
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    console.log('🍽️ Deleting menu item:', params.id)

    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('❌ Error deleting menu item:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Menu item deleted:', params.id)
    return NextResponse.json({ message: 'Menu item deleted successfully' })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

