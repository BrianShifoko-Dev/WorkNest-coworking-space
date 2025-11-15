import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


// GET all email logs (with filters)
export async function GET(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const emailType = searchParams.get('email_type')
    const email = searchParams.get('email')
    const bookingId = searchParams.get('booking_id')

    console.log('📧 Fetching email logs with filters:', { status, emailType, email, bookingId })

    let query = supabase
      .from('email_logs')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters (using new column names)
    if (status && status !== 'all') {
      query = query.eq('email_status', status)
    }
    if (emailType && emailType !== 'all') {
      query = query.eq('email_type', emailType)
    }
    if (email) {
      query = query.eq('recipient_email', email)
    }
    if (bookingId) {
      query = query.eq('booking_id', bookingId)
    }

    const { data: emails, error } = await query

    if (error) {
      console.error('❌ Error fetching email logs:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found email logs:', emails?.length || 0)
    return NextResponse.json(emails || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

