import { NextResponse } from 'next/server'
import { initiateSTKPush, createPaymentRecord } from '@/lib/mpesa-service'

// Force dynamic rendering to prevent build-time initialization
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('💰 Initiating payment for booking:', body.bookingId)

    // Validate required fields
    if (!body.bookingId || !body.customerId || !body.amount || !body.phoneNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: bookingId, customerId, amount, phoneNumber' },
        { status: 400 }
      )
    }

    // Validate amount
    const amount = parseFloat(body.amount)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Initiate M-Pesa STK Push
    const stkResult = await initiateSTKPush({
      phoneNumber: body.phoneNumber,
      amount: amount,
      accountReference: body.bookingId.substring(0, 12), // Max 12 chars for M-Pesa
      transactionDesc: `WorkNest Booking Payment`,
    })

    if (!stkResult.success) {
      return NextResponse.json(
        { error: stkResult.error || 'Failed to initiate payment' },
        { status: 400 }
      )
    }

    // Create payment record in database
    const paymentRecord = await createPaymentRecord({
      bookingId: body.bookingId,
      customerId: body.customerId,
      amount: amount,
      phoneNumber: body.phoneNumber,
      checkoutRequestId: stkResult.checkoutRequestId!,
      merchantRequestId: stkResult.merchantRequestId,
    })

    if (!paymentRecord.success) {
      console.error('⚠️ Payment initiated but failed to save record')
      // Don't fail the request, STK Push was successful
    }

    return NextResponse.json({
      success: true,
      message: 'Payment request sent to your phone. Please enter your M-Pesa PIN.',
      checkoutRequestId: stkResult.checkoutRequestId,
      paymentId: paymentRecord.paymentId,
    })
  } catch (error: any) {
    console.error('❌ Payment initiation error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to initiate payment' },
      { status: 500 }
    )
  }
}

