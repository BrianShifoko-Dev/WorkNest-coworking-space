import { NextResponse } from 'next/server'
import { supabase } from '@/lib/db'

// GET single payment
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Fetch payment
    const { data: payment, error } = await supabase
      .from('payments')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    // Fetch related booking, space, and customer manually
    if (payment.booking_id) {
      const { data: booking } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', payment.booking_id)
        .single()

      if (booking) {
        const space = booking.space_id ? await supabase
          .from('spaces')
          .select('name, type')
          .eq('id', booking.space_id)
          .single() : { data: null }

        const customer = booking.customer_id ? await supabase
          .from('customers')
          .select('full_name, email, phone')
          .eq('id', booking.customer_id)
          .single() : { data: null }

        return NextResponse.json({
          ...payment,
          booking: {
            ...booking,
            space: space.data,
            customer: customer.data,
          },
        })
      }
    }

    return NextResponse.json(payment)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

