import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET all payments (with filters)
export async function GET(request: Request) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const bookingId = searchParams.get('booking_id')
    const customerId = searchParams.get('customer_id')

    console.log('💰 Fetching payments with filters:', { status, bookingId, customerId })

    let query = supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('payment_status', status)
    }
    if (bookingId) {
      query = query.eq('booking_id', bookingId)
    }
    if (customerId) {
      query = query.eq('customer_id', customerId)
    }

    const { data: payments, error } = await query

    if (error) {
      console.error('❌ Error fetching payments:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log('✅ Found payments:', payments?.length || 0)
    return NextResponse.json(payments || [])
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

