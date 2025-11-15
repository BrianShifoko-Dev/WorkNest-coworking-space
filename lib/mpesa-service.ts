// M-Pesa Payment Service for WorkNest
// Production-ready with proper error handling

import { supabase } from './supabase'

// M-Pesa Configuration
const MPESA_CONFIG = {
  consumerKey: process.env.MPESA_CONSUMER_KEY!,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET!,
  shortcode: process.env.MPESA_SHORTCODE!,
  passkey: process.env.MPESA_PASSKEY!,
  environment: process.env.MPESA_ENVIRONMENT || 'sandbox', // 'sandbox' or 'production'
  callbackUrl: process.env.MPESA_CALLBACK_URL || 'https://your-domain.com/api/mpesa/callback',
}

// M-Pesa API URLs
const MPESA_URLS = {
  sandbox: {
    oauth: 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkPush: 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    stkQuery: 'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
  },
  production: {
    oauth: 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    stkPush: 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
    stkQuery: 'https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query',
  },
}

const urls = MPESA_URLS[MPESA_CONFIG.environment as 'sandbox' | 'production']

/**
 * Get M-Pesa OAuth Access Token
 */
async function getAccessToken(): Promise<string> {
  try {
    const auth = Buffer.from(
      `${MPESA_CONFIG.consumerKey}:${MPESA_CONFIG.consumerSecret}`
    ).toString('base64')

    const response = await fetch(urls.oauth, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get M-Pesa access token')
    }

    const data = await response.json()
    return data.access_token
  } catch (error) {
    console.error('❌ M-Pesa OAuth Error:', error)
    throw new Error('Failed to authenticate with M-Pesa')
  }
}

/**
 * Generate M-Pesa Password (Base64 encoded)
 */
function generatePassword(): { password: string; timestamp: string } {
  const timestamp = new Date()
    .toISOString()
    .replace(/[^0-9]/g, '')
    .slice(0, 14)

  const password = Buffer.from(
    `${MPESA_CONFIG.shortcode}${MPESA_CONFIG.passkey}${timestamp}`
  ).toString('base64')

  return { password, timestamp }
}

/**
 * Initiate STK Push (Lipa na M-Pesa)
 */
export async function initiateSTKPush({
  phoneNumber,
  amount,
  accountReference,
  transactionDesc,
}: {
  phoneNumber: string
  amount: number
  accountReference: string
  transactionDesc: string
}): Promise<{
  success: boolean
  checkoutRequestId?: string
  merchantRequestId?: string
  error?: string
}> {
  try {
    console.log('💰 Initiating M-Pesa STK Push...')
    
    // Validate phone number (must be 254XXXXXXXXX format)
    let formattedPhone = phoneNumber.replace(/\s/g, '')
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.substring(1)
    } else if (formattedPhone.startsWith('+')) {
      formattedPhone = formattedPhone.substring(1)
    }

    if (!formattedPhone.startsWith('254') || formattedPhone.length !== 12) {
      return {
        success: false,
        error: 'Invalid phone number format. Use 0712345678 or 254712345678',
      }
    }

    // Get access token
    const accessToken = await getAccessToken()

    // Generate password and timestamp
    const { password, timestamp } = generatePassword()

    // Prepare STK Push request
    const stkPushData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount), // Must be integer
      PartyA: formattedPhone,
      PartyB: MPESA_CONFIG.shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: MPESA_CONFIG.callbackUrl,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
    }

    console.log('📤 Sending STK Push request...')

    const response = await fetch(urls.stkPush, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stkPushData),
    })

    const data = await response.json()

    if (data.ResponseCode === '0') {
      console.log('✅ STK Push initiated successfully')
      return {
        success: true,
        checkoutRequestId: data.CheckoutRequestID,
        merchantRequestId: data.MerchantRequestID,
      }
    } else {
      console.error('❌ STK Push failed:', data)
      return {
        success: false,
        error: data.ResponseDescription || data.errorMessage || 'Payment request failed',
      }
    }
  } catch (error: any) {
    console.error('❌ M-Pesa STK Push Error:', error)
    return {
      success: false,
      error: error?.message || 'Failed to initiate payment',
    }
  }
}

/**
 * Query STK Push Status
 */
export async function querySTKPushStatus(checkoutRequestId: string): Promise<{
  success: boolean
  status?: string
  data?: any
  error?: string
}> {
  try {
    const accessToken = await getAccessToken()
    const { password, timestamp } = generatePassword()

    const queryData = {
      BusinessShortCode: MPESA_CONFIG.shortcode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    const response = await fetch(urls.stkQuery, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(queryData),
    })

    const data = await response.json()

    if (data.ResponseCode === '0') {
      return {
        success: true,
        status: data.ResultCode === '0' ? 'completed' : 'failed',
        data: data,
      }
    } else {
      return {
        success: false,
        error: data.ResponseDescription || 'Query failed',
      }
    }
  } catch (error: any) {
    console.error('❌ STK Query Error:', error)
    return {
      success: false,
      error: error?.message || 'Failed to query payment status',
    }
  }
}

/**
 * Create Payment Record in Database
 */
export async function createPaymentRecord({
  bookingId,
  customerId,
  amount,
  phoneNumber,
  checkoutRequestId,
  merchantRequestId,
}: {
  bookingId: string
  customerId: string
  amount: number
  phoneNumber: string
  checkoutRequestId: string
  merchantRequestId?: string
}): Promise<{ success: boolean; paymentId?: string; error?: string }> {
  try {
    const { data: payment, error } = await supabase
      .from('payments')
      .insert({
        booking_id: bookingId,
        customer_id: customerId,
        amount: amount,
        currency: 'KES',
        payment_method: 'mpesa',
        payment_status: 'processing',
        mpesa_phone_number: phoneNumber,
        mpesa_checkout_request_id: checkoutRequestId,
        description: `Payment for booking ${bookingId}`,
        reference_number: checkoutRequestId,
        metadata: {
          merchant_request_id: merchantRequestId,
          initiated_at: new Date().toISOString(),
        },
      })
      .select('id')
      .single()

    if (error) {
      console.error('❌ Failed to create payment record:', error)
      return { success: false, error: error.message }
    }

    return { success: true, paymentId: payment.id }
  } catch (error: any) {
    console.error('❌ Payment record error:', error)
    return { success: false, error: error?.message || 'Database error' }
  }
}

/**
 * Update Payment Status
 */
export async function updatePaymentStatus({
  checkoutRequestId,
  status,
  mpesaReceiptNumber,
  transactionDate,
  errorMessage,
}: {
  checkoutRequestId: string
  status: 'completed' | 'failed'
  mpesaReceiptNumber?: string
  transactionDate?: string
  errorMessage?: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const updateData: any = {
      payment_status: status,
      error_message: errorMessage,
    }

    if (status === 'completed' && mpesaReceiptNumber) {
      updateData.mpesa_receipt_number = mpesaReceiptNumber
      updateData.mpesa_transaction_id = mpesaReceiptNumber
      updateData.transaction_date = transactionDate || new Date().toISOString()
    }

    const { error } = await supabase
      .from('payments')
      .update(updateData)
      .eq('mpesa_checkout_request_id', checkoutRequestId)

    if (error) {
      console.error('❌ Failed to update payment:', error)
      return { success: false, error: error.message }
    }

    // If payment completed, update booking status
    if (status === 'completed') {
      const { data: payment } = await supabase
        .from('payments')
        .select('booking_id')
        .eq('mpesa_checkout_request_id', checkoutRequestId)
        .single()

      if (payment?.booking_id) {
        await supabase
          .from('bookings')
          .update({ status: 'confirmed' })
          .eq('id', payment.booking_id)
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('❌ Update payment error:', error)
    return { success: false, error: error?.message || 'Update failed' }
  }
}

