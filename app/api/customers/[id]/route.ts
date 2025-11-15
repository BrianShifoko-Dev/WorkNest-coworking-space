import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// GET single customer with booking history
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { id } = params

    // Get customer details
    const { data: customer, error: customerError } = await supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .single()

    if (customerError) {
      return NextResponse.json({ error: customerError.message }, { status: 404 })
    }

    // Get customer's booking history with space details
    const { data: bookings, error: bookingsError } = await supabase
      .from('bookings')
      .select(`
        *,
        space:spaces(name, type),
        payment:payments(payment_status, amount, mpesa_receipt_number)
      `)
      .eq('customer_id', id)
      .order('created_at', { ascending: false })

    // Get customer's payment history
    const { data: payments, error: paymentsError } = await supabase
      .from('payments')
      .select('*')
      .eq('customer_id', id)
      .order('created_at', { ascending: false })

    // Calculate stats
    const totalBookings = bookings?.length || 0
    const completedBookings = bookings?.filter(b => b.status === 'completed').length || 0
    const totalSpent = payments
      ?.filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + Number(p.amount || 0), 0) || 0

    return NextResponse.json({
      ...customer,
      bookings: bookings || [],
      payments: payments || [],
      stats: {
        totalBookings,
        completedBookings,
        totalSpent,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT update customer
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { id } = params
    const body = await request.json()

    const { data: customer, error } = await supabase
      .from('customers')
      .update({
        full_name: body.full_name,
        email: body.email,
        phone: body.phone,
        company: body.company,
        notes: body.notes,
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(customer)
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE customer
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { id } = params

    // Check if customer has bookings
    const { data: bookings } = await supabase
      .from('bookings')
      .select('id')
      .eq('customer_id', id)

    if (bookings && bookings.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete customer with existing bookings' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Customer deleted successfully' })
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

