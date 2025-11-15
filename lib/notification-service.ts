/**
 * Notification Service
 * Helper functions to create notifications for different events
 */

interface NotificationPayload {
  user_id?: string
  target_role?: 'manager' | 'reception' | 'staff'
  type: 'booking' | 'payment' | 'customer' | 'system' | 'info'
  title: string
  message?: string
  link?: string
}

/**
 * Send a notification
 */
export async function sendNotification(payload: NotificationPayload) {
  try {
    const response = await fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Failed to send notification')
    }

    return await response.json()
  } catch (error) {
    console.error('Error sending notification:', error)
    return null
  }
}

/**
 * Notify about new booking
 */
export async function notifyNewBooking(bookingData: {
  id: string
  customer_name: string
  space_name: string
  booking_date: string
  receipt_number: string
}) {
  // Notify managers and reception
  await sendNotification({
    target_role: 'manager',
    type: 'booking',
    title: '🆕 New Booking Received',
    message: `${bookingData.customer_name} booked ${bookingData.space_name} for ${bookingData.booking_date}`,
    link: `/admin/bookings`,
  })

  await sendNotification({
    target_role: 'reception',
    type: 'booking',
    title: '🆕 New Booking',
    message: `${bookingData.customer_name} - ${bookingData.space_name} (${bookingData.receipt_number})`,
    link: `/admin/bookings`,
  })
}

/**
 * Notify about payment received
 */
export async function notifyPaymentReceived(paymentData: {
  customer_name: string
  amount: number
  receipt_number: string
}) {
  // Notify managers and reception
  await sendNotification({
    target_role: 'manager',
    type: 'payment',
    title: '💰 Payment Received',
    message: `KES ${paymentData.amount.toLocaleString()} from ${paymentData.customer_name}`,
    link: `/admin/payments`,
  })

  await sendNotification({
    target_role: 'reception',
    type: 'payment',
    title: '💳 Payment Confirmed',
    message: `${paymentData.customer_name} - KES ${paymentData.amount.toLocaleString()}`,
    link: `/admin/payments`,
  })
}

/**
 * Notify about new customer registration
 */
export async function notifyNewCustomer(customerData: {
  name: string
  email: string
  type: string
}) {
  // Notify managers only
  await sendNotification({
    target_role: 'manager',
    type: 'customer',
    title: '👤 New Customer Registered',
    message: `${customerData.name} (${customerData.email}) - ${customerData.type}`,
    link: `/admin/customers`,
  })
}

/**
 * Notify about booking cancellation
 */
export async function notifyBookingCancelled(bookingData: {
  customer_name: string
  space_name: string
  booking_date: string
}) {
  await sendNotification({
    target_role: 'manager',
    type: 'booking',
    title: '❌ Booking Cancelled',
    message: `${bookingData.customer_name} cancelled ${bookingData.space_name} for ${bookingData.booking_date}`,
    link: `/admin/bookings`,
  })

  await sendNotification({
    target_role: 'reception',
    type: 'booking',
    title: '❌ Booking Cancelled',
    message: `${bookingData.customer_name} - ${bookingData.space_name}`,
    link: `/admin/bookings`,
  })
}

/**
 * Notify about upcoming booking (reminder)
 */
export async function notifyUpcomingBooking(bookingData: {
  customer_name: string
  space_name: string
  start_time: string
}) {
  await sendNotification({
    target_role: 'reception',
    type: 'booking',
    title: '⏰ Upcoming Booking',
    message: `${bookingData.customer_name} - ${bookingData.space_name} starts at ${bookingData.start_time}`,
    link: `/admin/bookings`,
  })

  await sendNotification({
    target_role: 'staff',
    type: 'booking',
    title: '⏰ Upcoming Booking',
    message: `${bookingData.space_name} - ${bookingData.start_time}`,
    link: `/admin/bookings`,
  })
}

/**
 * Send system notification to all users
 */
export async function notifySystemUpdate(message: string) {
  await sendNotification({
    type: 'system',
    title: '⚙️ System Update',
    message: message,
  })
}

/**
 * Notify specific user
 */
export async function notifyUser(
  userId: string,
  title: string,
  message: string,
  type: 'booking' | 'payment' | 'customer' | 'system' | 'info' = 'info',
  link?: string
) {
  await sendNotification({
    user_id: userId,
    type,
    title,
    message,
    link,
  })
}

