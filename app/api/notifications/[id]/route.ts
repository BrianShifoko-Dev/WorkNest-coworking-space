import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// Mark notification as read
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    console.log('🔔 Marking notification as read:', id)

    const { data: notification, error } = await supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('id', id)
      .select('*')
      .single()

    if (error) {
      console.error('❌ Error updating notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Notification marked as read')
    return NextResponse.json(notification)
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// Delete notification
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    console.log('🔔 Deleting notification:', id)

    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('❌ Error deleting notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Notification deleted')
    return NextResponse.json({ message: 'Notification deleted' })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

