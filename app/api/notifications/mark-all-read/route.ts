import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()
    const { userId, role } = body

    console.log('🔔 Marking all notifications as read for:', { userId, role })

    let query = supabase
      .from('notifications')
      .update({ is_read: true, read_at: new Date().toISOString() })
      .eq('is_read', false)

    // Filter by user and role
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`)
    }
    if (role) {
      query = query.or(`target_role.eq.${role},target_role.is.null`)
    }

    const { error } = await query

    if (error) {
      console.error('❌ Error marking all as read:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ All notifications marked as read')
    return NextResponse.json({ message: 'All notifications marked as read' })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

