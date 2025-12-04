import nodemailer from 'nodemailer'
import { supabase } from './db'
import { BookingConfirmationEmail, AdminNotificationEmail } from './email-templates'

// Create SMTP transporter for cPanel email
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.theworknest.co.ke',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_PORT === '465' || parseInt(process.env.SMTP_PORT || '465', 10) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'manager@theworknest.co.ke',
    pass: process.env.SMTP_PASSWORD || '',
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
})

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
  const fromEmail = process.env.SMTP_FROM || 'WorkNest <manager@theworknest.co.ke>'

  try {
    console.log('📧 Sending email to:', to)
    
    // Send email via SMTP
    const info = await transporter.sendMail({
      from: fromEmail,
      to: to,
      subject: subject,
      html: html,
    })

    console.log('✅ Email sent successfully:', info.messageId)

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

    return { success: true, data: { id: info.messageId } }
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
  
  // Always include info@worknest.co.ke
  const allAdminEmails = [...new Set([...adminEmails.map(e => e.trim()), 'info@worknest.co.ke', 'manager@theworknest.co.ke'])]

  const results = []
  for (const adminEmail of allAdminEmails) {
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

