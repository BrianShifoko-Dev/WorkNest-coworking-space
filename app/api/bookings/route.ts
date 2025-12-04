import { NextResponse } from 'next/server'
import { supabase, getMySQLPool } from '@/lib/db'
import { sendBookingConfirmation, sendAdminNotification } from '@/lib/email-service'
import { format } from 'date-fns'

// GET all bookings (with filters)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    const status = searchParams.get('status')
    const spaceId = searchParams.get('space_id')
    const date = searchParams.get('date')

    console.log('📊 Fetching bookings with filters:', { status, spaceId, date })

    // First, try simple query without relationships
    let query = supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }
    if (spaceId) {
      query = query.eq('space_id', spaceId)
    }
    if (date) {
      const startOfDay = new Date(date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(date)
      endOfDay.setHours(23, 59, 59, 999)
      query = query.gte('start_datetime', startOfDay.toISOString())
      query = query.lte('start_datetime', endOfDay.toISOString())
    }

    const { data: bookings, error: bookingsError } = await query

    if (bookingsError) {
      console.error('❌ Error fetching bookings:', bookingsError)
      return NextResponse.json({ error: bookingsError.message }, { status: 500 })
    }

    console.log('✅ Found bookings:', bookings?.length || 0)

    // If no bookings, return empty array
    if (!bookings || bookings.length === 0) {
      console.log('📭 No bookings found')
      return NextResponse.json([])
    }

    // Fetch related data separately (more reliable)
    const enrichedBookings = await Promise.all(
      bookings.map(async (booking) => {
        // Get space details
        const { data: space } = await supabase
          .from('spaces')
          .select('id, name, type')
          .eq('id', booking.space_id)
          .single()

        // Get customer details
        const { data: customer } = await supabase
          .from('customers')
          .select('id, full_name, email, phone')
          .eq('id', booking.customer_id)
          .single()

        return {
          ...booking,
          space: space || { id: booking.space_id, name: 'Unknown Space', type: 'unknown' },
          customer: customer || { id: booking.customer_id, full_name: 'Unknown Customer', email: '', phone: '' }
        }
      })
    )

    console.log('✅ Enriched bookings:', enrichedBookings.length)
    return NextResponse.json(enrichedBookings)
  } catch (error: any) {
    console.error('❌ Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal server error' }, { status: 500 })
  }
}

// POST create new booking
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.space_id || !body.customer_id || !body.start_datetime || !body.end_datetime) {
      return NextResponse.json(
        { error: 'Missing required fields: space_id, customer_id, start_datetime, end_datetime' },
        { status: 400 }
      )
    }

    // 1. CHECK FOR CONFLICTS - prevent double booking
    // Use direct MySQL query for complex date range check
    const pool = getMySQLPool()
    
    try {
      const [conflicts]: any = await pool.execute(
        `SELECT * FROM bookings 
         WHERE space_id = ? 
         AND status IN ('pending', 'confirmed')
         AND start_datetime < ? 
         AND end_datetime > ?`,
        [body.space_id, body.end_datetime, body.start_datetime]
      )

      if (conflicts && conflicts.length > 0) {
        return NextResponse.json(
          {
            error: 'Space is already booked for this time',
            conflicts: conflicts,
            message: 'This space is not available for the selected time. Please choose a different time or space.'
          },
          { status: 409 }
        )
      }
    } catch (conflictError: any) {
      console.error('Error checking conflicts:', conflictError)
      return NextResponse.json({ error: 'Error checking availability' }, { status: 500 })
    }

    // 2. CHECK SPACE CAPACITY (if number_of_people provided)
    if (body.number_of_people) {
      const { data: space, error: spaceError } = await supabase
        .from('spaces')
        .select('capacity')
        .eq('id', body.space_id)
        .single()

      if (spaceError) {
        return NextResponse.json({ error: 'Invalid space ID' }, { status: 400 })
      }

      if (body.number_of_people > space.capacity) {
        return NextResponse.json(
          {
            error: 'Capacity exceeded',
            message: `This space has a maximum capacity of ${space.capacity} people. You requested ${body.number_of_people} people.`
          },
          { status: 400 }
        )
      }
    }

    // 3. GENERATE UNIQUE RECEIPT NUMBER
    const receiptNumber = await generateUniqueReceiptNumber(supabase)

    // 4. CREATE BOOKING
    const insertResult = await supabase
      .from('bookings')
      .insert({
        space_id: body.space_id,
        customer_id: body.customer_id,
        start_datetime: body.start_datetime,
        end_datetime: body.end_datetime,
        number_of_people: body.number_of_people || 1,
        purpose: body.purpose || null,
        special_requests: body.special_requests || null,
        status: body.status || 'pending',
        total_amount: body.total_amount || 0,
        receipt_number: receiptNumber,
        booking_type: body.booking_type || 'online',
        booked_by: body.booked_by || null, // ID of staff who made the booking
      })

    if (insertResult.error) {
      console.error('Error creating booking:', insertResult.error)
      return NextResponse.json({ error: insertResult.error.message }, { status: 500 })
    }

    // Fetch the created booking with relationships
    const bookingId = insertResult.data?.id || (Array.isArray(insertResult.data) ? insertResult.data[0]?.id : null)
    if (!bookingId) {
      return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 })
    }

    const { data: bookingData, error: fetchError } = await supabase
      .from('bookings')
      .select('*')
      .eq('id', bookingId)
      .single()

    if (fetchError || !bookingData) {
      console.error('Error fetching created booking:', fetchError)
      return NextResponse.json({ error: 'Booking created but failed to fetch details' }, { status: 500 })
    }

    // Fetch related data
    const { data: space } = await supabase
      .from('spaces')
      .select('id, name, type, hourly_rate, daily_rate')
      .eq('id', bookingData.space_id)
      .single()

    const { data: customer } = await supabase
      .from('customers')
      .select('id, full_name, email, phone')
      .eq('id', bookingData.customer_id)
      .single()

    const booking = {
      ...bookingData,
      space: space || null,
      customer: customer || null
    }

    // 5. LOG ACTIVITY
    await supabase.from('audit_logs').insert({
      user_id: body.booked_by || body.customer_id,
      action: 'booking_created',
      entity_type: 'booking',
      entity_id: booking.id,
      details: {
        receipt_number: receiptNumber,
        space_name: booking.space?.name,
        customer_name: booking.customer?.full_name,
        booking_date: booking.start_datetime,
      },
    })

    // 6. SEND EMAIL NOTIFICATIONS
    try {
      const emailData = {
        customerName: booking.customer?.full_name || 'Customer',
        customerEmail: booking.customer?.email || '',
        customerPhone: booking.customer?.phone || '',
        spaceName: booking.space?.name || 'Space',
        bookingDate: format(new Date(booking.start_datetime), 'EEEE, MMMM d, yyyy'),
        startTime: format(new Date(booking.start_datetime), 'h:mm a'),
        endTime: format(new Date(booking.end_datetime), 'h:mm a'),
        numberOfPeople: booking.number_of_people,
        receiptNumber: booking.receipt_number,
        totalAmount: booking.total_amount,
        purpose: booking.purpose,
        specialRequests: booking.special_requests,
        bookingId: booking.id,
        customerId: booking.customer_id,
      }

      // Send confirmation email to customer
      if (booking.customer?.email) {
        console.log('📧 Sending confirmation email to customer...')
        await sendBookingConfirmation(emailData)
      }

      // Send notification to admin
      console.log('📧 Sending notification to admin...')
      await sendAdminNotification(emailData)
    } catch (emailError) {
      console.error('⚠️ Email sending failed (non-blocking):', emailError)
      // Don't fail the booking if emails fail
    }

    // 7. CREATE IN-APP NOTIFICATIONS (Direct database insert - more reliable!)
    try {
      console.log('📢 Creating notifications for new booking...')
      
      // Create notifications directly in database
      await supabase.from('notifications').insert([
        {
          target_role: 'manager',
          type: 'booking',
          title: '🆕 New Booking Received',
          message: `${booking.customer?.full_name} booked ${booking.space?.name} for ${format(new Date(booking.start_datetime), 'MMM d, yyyy')}`,
          link: '/admin/bookings',
          related_id: booking.id,
          related_type: 'booking',
        },
        {
          target_role: 'reception',
          type: 'booking',
          title: '🆕 New Booking',
          message: `${booking.customer?.full_name} - ${booking.space?.name} (${booking.receipt_number})`,
          link: '/admin/bookings',
          related_id: booking.id,
          related_type: 'booking',
        }
      ])
      
      console.log('✅ Notifications created successfully')
    } catch (notifError) {
      console.error('⚠️ In-app notification failed (non-blocking):', notifError)
      // Don't fail the booking if notifications fail
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Helper function to generate unique receipt number
async function generateUniqueReceiptNumber(supabase: any): Promise<string> {
  const prefix = 'WN'
  const date = new Date()
  const year = date.getFullYear().toString().slice(-2)
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  
  // Get count of bookings today to generate sequence
  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const endOfDay = new Date()
  endOfDay.setHours(23, 59, 59, 999)

  const { count } = await supabase
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', startOfDay.toISOString())
    .lte('created_at', endOfDay.toISOString())

  const sequence = ((count || 0) + 1).toString().padStart(4, '0')
  
  return `${prefix}${year}${month}${sequence}` // e.g., WN25110001
}

