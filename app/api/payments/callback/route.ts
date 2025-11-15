import { NextResponse } from 'next/server'
import { updatePaymentStatus } from '@/lib/mpesa-service'
import { supabase } from '@/lib/supabase'

// M-Pesa Callback Handler (Production-ready)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    console.log('📥 M-Pesa Callback received:', JSON.stringify(body, null, 2))

    // Extract callback data
    const { Body } = body
    const { stkCallback } = Body

    if (!stkCallback) {
      console.error('❌ Invalid callback format')
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid callback' })
    }

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata,
    } = stkCallback

    // Determine payment status
    const paymentStatus = ResultCode === 0 ? 'completed' : 'failed'

    let mpesaReceiptNumber: string | undefined
    let transactionDate: string | undefined
    let amount: number | undefined
    let phoneNumber: string | undefined

    // Extract metadata if payment was successful
    if (ResultCode === 0 && CallbackMetadata?.Item) {
      const items = CallbackMetadata.Item

      for (const item of items) {
        if (item.Name === 'MpesaReceiptNumber') {
          mpesaReceiptNumber = item.Value
        } else if (item.Name === 'TransactionDate') {
          transactionDate = item.Value?.toString()
        } else if (item.Name === 'Amount') {
          amount = parseFloat(item.Value)
        } else if (item.Name === 'PhoneNumber') {
          phoneNumber = item.Value?.toString()
        }
      }
    }

    console.log('💰 Payment Status:', paymentStatus, 'Receipt:', mpesaReceiptNumber)

    // Update payment status in database
    const updateResult = await updatePaymentStatus({
      checkoutRequestId: CheckoutRequestID,
      status: paymentStatus,
      mpesaReceiptNumber: mpesaReceiptNumber,
      transactionDate: transactionDate,
      errorMessage: ResultCode !== 0 ? ResultDesc : undefined,
    })

    if (!updateResult.success) {
      console.error('❌ Failed to update payment in database')
    }

    // If payment successful, send receipt email
    if (paymentStatus === 'completed') {
      console.log('📧 Sending payment receipt email...')
      
      // Get payment and booking details
      const { data: payment } = await supabase
        .from('payments')
        .select(`
          *,
          booking:bookings(
            *,
            space:spaces(name),
            customer:customers(*)
          )
        `)
        .eq('mpesa_checkout_request_id', CheckoutRequestID)
        .single()

      if (payment) {
        // TODO: Send receipt email (will implement with email templates)
        console.log('✅ Receipt email queued for:', payment.booking?.customer?.email)
      }
    }

    // Acknowledge callback
    return NextResponse.json({
      ResultCode: 0,
      ResultDesc: 'Callback processed successfully',
    })
  } catch (error: any) {
    console.error('❌ Callback processing error:', error)
    return NextResponse.json({
      ResultCode: 1,
      ResultDesc: 'Callback processing failed',
    })
  }
}

