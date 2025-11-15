import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)
    
    const userId = searchParams.get('userId')
    const role = searchParams.get('role')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'

    console.log('🔔 Fetching notifications for:', { userId, role, unreadOnly })

    let query = supabase
      .from('notifications')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by user if provided
    if (userId) {
      query = query.or(`user_id.eq.${userId},user_id.is.null`)
    }

    // Filter by role (role-specific notifications)
    if (role) {
      query = query.or(`target_role.eq.${role},target_role.is.null`)
    }

    // Filter unread only
    if (unreadOnly) {
      query = query.eq('is_read', false)
    }

    // Limit to recent notifications
    query = query.limit(50)

    const { data: notifications, error } = await query

    if (error) {
      console.error('❌ Error fetching notifications:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found notifications:', notifications?.length || 0)
    return NextResponse.json(notifications || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    console.log('🔔 Creating notification:', body.title)

    const { data: notification, error } = await supabase
      .from('notifications')
      .insert({
        user_id: body.user_id || null,
        target_role: body.target_role || null,
        type: body.type || 'info',
        title: body.title,
        message: body.message || null,
        link: body.link || null,
        is_read: false,
      })
      .select('*')
      .single()

    if (error) {
      console.error('❌ Error creating notification:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Notification created:', notification.id)
    return NextResponse.json(notification, { status: 201 })
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

