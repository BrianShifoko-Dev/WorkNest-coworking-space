import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single booking
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch booking
    const { data: booking, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
      }
      console.error('Error fetching booking:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Fetch related space and customer manually (MySQL doesn't support relationship queries)
    const space = booking.space_id ? await supabase
      .from('spaces')
      .select('id, name, type, capacity, hourly_rate, daily_rate')
      .eq('id', booking.space_id)
      .single() : { data: null }

    const customer = booking.customer_id ? await supabase
      .from('customers')
      .select('id, full_name, email, phone')
      .eq('id', booking.customer_id)
      .single() : { data: null }

    return NextResponse.json({
      ...booking,
      space: space.data,
      customer: customer.data,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update booking
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // If updating time, check for conflicts
    if (body.start_datetime || body.end_datetime) {
      const { data: existingBooking } = await supabase
        .from('bookings')
        .select('space_id, start_datetime, end_datetime')
        .eq('id', params.id)
        .single()

      if (existingBooking) {
        const newStart = body.start_datetime || existingBooking.start_datetime
        const newEnd = body.end_datetime || existingBooking.end_datetime

        const { data: conflicts } = await supabase
          .from('bookings')
          .select('*')
          .eq('space_id', existingBooking.space_id)
          .neq('id', params.id) // Exclude current booking
          .in('status', ['pending', 'confirmed'])
          .or(`and(start_datetime.lt.${newEnd},end_datetime.gt.${newStart})`)

        if (conflicts && conflicts.length > 0) {
          return NextResponse.json(
            { error: 'Space is already booked for this time' },
            { status: 409 }
          )
        }
      }
    }

    const { data: updatedBooking, error } = await supabase
      .from('bookings')
      .update({
        ...body,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select('*')
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
      }
      console.error('Error updating booking:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Fetch related space and customer manually
    const space = updatedBooking.space_id ? await supabase
      .from('spaces')
      .select('id, name, type')
      .eq('id', updatedBooking.space_id)
      .single() : { data: null }

    const customer = updatedBooking.customer_id ? await supabase
      .from('customers')
      .select('id, full_name, email, phone')
      .eq('id', updatedBooking.customer_id)
      .single() : { data: null }

    // Log activity
    if (body.status) {
      await supabase.from('audit_logs').insert({
        action: `booking_${body.status}`,
        entity_type: 'booking',
        entity_id: params.id,
        details: JSON.stringify({
          old_status: body.old_status,
          new_status: body.status,
        }),
      })
    }

    return NextResponse.json({
      ...updatedBooking,
      space: space.data,
      customer: customer.data,
    })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE booking (soft delete - change status to cancelled)
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {

    // Soft delete - update status to cancelled
    const { data, error } = await supabase
      .from('bookings')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
      }
      console.error('Error cancelling booking:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Log cancellation
    await supabase.from('audit_logs').insert({
      action: 'booking_cancelled',
      entity_type: 'booking',
      entity_id: params.id,
      details: {
        receipt_number: data.receipt_number,
      },
    })

    return NextResponse.json({ message: 'Booking cancelled successfully', booking: data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


