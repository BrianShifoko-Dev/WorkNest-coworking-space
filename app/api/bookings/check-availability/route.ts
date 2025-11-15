import { NextResponse } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase-server'


// POST check if a space is available for given time
export async function POST(request: Request) {
  try {
    const supabase = getSupabaseClient()
    const body = await request.json()

    if (!body.space_id || !body.start_datetime || !body.end_datetime) {
      return NextResponse.json(
        { error: 'Missing required fields: space_id, start_datetime, end_datetime' },
        { status: 400 }
      )
    }

    // Check for conflicts
    const { data: conflicts, error } = await supabase
      .from('bookings')
      .select('*, customer:customers(full_name)')
      .eq('space_id', body.space_id)
      .in('status', ['pending', 'confirmed'])
      .or(`and(start_datetime.lt.${body.end_datetime},end_datetime.gt.${body.start_datetime})`)

    if (error) {
      console.error('Error checking availability:', error)
      return NextResponse.json({ error: 'Error checking availability' }, { status: 500 })
    }

    const available = !conflicts || conflicts.length === 0

    return NextResponse.json({
      available,
      conflicts: conflicts || [],
      message: available
        ? 'Space is available for this time'
        : 'Space is already booked for this time',
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


