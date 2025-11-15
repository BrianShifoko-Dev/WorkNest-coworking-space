import { Resend } from 'resend'
import { supabase } from './supabase'
import { BookingConfirmationEmail, AdminNotificationEmail } from './email-templates'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface SendEmailParams {
  to: string
  subject: string
  html: string
  emailType?: string
  bookingId?: string
  customerId?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  emailType = 'general',
  bookingId,
  customerId,
}: SendEmailParams) {
  const fromEmail = 'WorkNest <onboarding@resend.dev>' // Will be replaced with your domain

  try {
    console.log('📧 Sending email to:', to)
    
    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [to],
      subject: subject,
      html: html,
    })

    if (error) {
      console.error('❌ Resend error:', error)
      
      // Log failed email
      await logEmail({
        to_email: to,
        from_email: fromEmail,
        subject,
        email_type: emailType,
        status: 'failed',
        error_message: error.message || 'Unknown error',
        booking_id: bookingId,
        customer_id: customerId,
      })

      return { success: false, error: error.message }
    }

    console.log('✅ Email sent successfully:', data?.id)

    // Log successful email
    await logEmail({
      to_email: to,
      from_email: fromEmail,
      subject,
      email_type: emailType,
      status: 'sent',
      booking_id: bookingId,
      customer_id: customerId,
      sent_at: new Date().toISOString(),
    })

    return { success: true, data }
  } catch (error: any) {
    console.error('❌ Email service error:', error)

    // Log failed email
    await logEmail({
      to_email: to,
      from_email: fromEmail,
      subject,
      email_type: emailType,
      status: 'failed',
      error_message: error?.message || 'Unknown error',
      booking_id: bookingId,
      customer_id: customerId,
    })

    return { success: false, error: error?.message || 'Unknown error' }
  }
}

async function logEmail(emailData: any) {
  try {
    // Map old field names to new column names
    const logData = {
      recipient_email: emailData.to_email,
      sender_email: emailData.from_email,
      email_subject: emailData.subject,
      email_type: emailData.email_type,
      email_status: emailData.status,
      error_message: emailData.error_message,
      booking_id: emailData.booking_id,
      customer_id: emailData.customer_id,
      sent_at: emailData.sent_at,
    }

    const { error } = await supabase
      .from('email_logs')
      .insert(logData)

    if (error) {
      console.error('Failed to log email:', error)
    }
  } catch (error) {
    console.error('Error logging email:', error)
  }
}

// Send booking confirmation to customer
export async function sendBookingConfirmation(bookingData: {
  customerName: string
  customerEmail: string
  spaceName: string
  bookingDate: string
  startTime: string
  endTime: string
  numberOfPeople: number
  receiptNumber: string
  totalAmount: number
  purpose?: string
  specialRequests?: string
  bookingId: string
  customerId: string
}) {
  const html = BookingConfirmationEmail({
    customerName: bookingData.customerName,
    spaceName: bookingData.spaceName,
    bookingDate: bookingData.bookingDate,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    numberOfPeople: bookingData.numberOfPeople,
    receiptNumber: bookingData.receiptNumber,
    totalAmount: bookingData.totalAmount,
    purpose: bookingData.purpose,
    specialRequests: bookingData.specialRequests,
  })

  return sendEmail({
    to: bookingData.customerEmail,
    subject: `Booking Confirmed - ${bookingData.receiptNumber} | WorkNest`,
    html,
    emailType: 'booking_confirmation',
    bookingId: bookingData.bookingId,
    customerId: bookingData.customerId,
  })
}

// Send notification to admin
export async function sendAdminNotification(bookingData: {
  customerName: string
  customerEmail: string
  customerPhone: string
  spaceName: string
  bookingDate: string
  startTime: string
  endTime: string
  numberOfPeople: number
  receiptNumber: string
  totalAmount: number
  purpose?: string
  bookingId: string
  customerId: string
}) {
  const html = AdminNotificationEmail({
    customerName: bookingData.customerName,
    customerEmail: bookingData.customerEmail,
    customerPhone: bookingData.customerPhone,
    spaceName: bookingData.spaceName,
    bookingDate: bookingData.bookingDate,
    startTime: bookingData.startTime,
    endTime: bookingData.endTime,
    numberOfPeople: bookingData.numberOfPeople,
    receiptNumber: bookingData.receiptNumber,
    totalAmount: bookingData.totalAmount,
    purpose: bookingData.purpose,
  })

  // Get admin emails from environment or database
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || ['admin@worknest.co.ke']

  const results = []
  for (const adminEmail of adminEmails) {
    const result = await sendEmail({
      to: adminEmail.trim(),
      subject: `🔔 New Booking - ${bookingData.receiptNumber}`,
      html,
      emailType: 'admin_notification',
      bookingId: bookingData.bookingId,
      customerId: bookingData.customerId,
    })
    results.push(result)
  }

  return results
}

