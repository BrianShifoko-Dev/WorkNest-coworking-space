// Email Templates for WorkNest

interface BookingConfirmationProps {
  customerName: string
  spaceName: string
  bookingDate: string
  startTime: string
  endTime: string
  numberOfPeople: number
  receiptNumber: string
  totalAmount: number
  purpose?: string
  specialRequests?: string
}

export const BookingConfirmationEmail = ({
  customerName,
  spaceName,
  bookingDate,
  startTime,
  endTime,
  numberOfPeople,
  receiptNumber,
  totalAmount,
  purpose,
  specialRequests,
}: BookingConfirmationProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation - WorkNest</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFFFF0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFF0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #5C4033 0%, #4A3329 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #D4AF37; font-size: 32px; font-weight: bold;">WorkNest</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 18px;">Booking Confirmation</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #5C4033; font-size: 16px;">Dear <strong>${customerName}</strong>,</p>
              
              <p style="margin: 0 0 30px; color: #5C4033; font-size: 16px; line-height: 1.6;">
                Thank you for choosing WorkNest! Your booking has been confirmed. Below are the details:
              </p>

              <!-- Booking Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFF0; border: 2px solid #D4AF37; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #5C4033; font-weight: bold; font-size: 14px; padding: 8px 0;">Receipt Number:</td>
                        <td style="color: #D4AF37; font-weight: bold; font-size: 16px; text-align: right; font-family: 'Courier New', monospace; padding: 8px 0;">${receiptNumber}</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="border-top: 1px solid #D4AF37; padding: 8px 0;"></td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; padding: 8px 0;">Space:</td>
                        <td style="color: #5C4033; font-weight: bold; text-align: right; padding: 8px 0;">${spaceName}</td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; padding: 8px 0;">Date:</td>
                        <td style="color: #5C4033; text-align: right; padding: 8px 0;">${bookingDate}</td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; padding: 8px 0;">Time:</td>
                        <td style="color: #5C4033; text-align: right; padding: 8px 0;">${startTime} - ${endTime}</td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; padding: 8px 0;">Number of People:</td>
                        <td style="color: #5C4033; text-align: right; padding: 8px 0;">${numberOfPeople}</td>
                      </tr>
                      ${purpose ? `
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; padding: 8px 0;">Purpose:</td>
                        <td style="color: #5C4033; text-align: right; padding: 8px 0;">${purpose}</td>
                      </tr>
                      ` : ''}
                      <tr>
                        <td colspan="2" style="border-top: 2px solid #D4AF37; padding: 8px 0;"></td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-weight: bold; font-size: 16px; padding: 8px 0;">Total Amount:</td>
                        <td style="color: #D4AF37; font-weight: bold; font-size: 20px; text-align: right; padding: 8px 0;">KES ${totalAmount.toLocaleString()}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              ${specialRequests ? `
              <div style="background-color: #FFF9E6; border-left: 4px solid #D4AF37; padding: 15px; margin-bottom: 30px;">
                <p style="margin: 0; color: #5C4033; font-size: 14px;"><strong>Special Requests:</strong></p>
                <p style="margin: 8px 0 0; color: #5C4033; font-size: 14px;">${specialRequests}</p>
              </div>
              ` : ''}

              <!-- Next Steps -->
              <div style="background-color: #F5F5DC; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 15px; color: #5C4033; font-size: 18px;">What's Next?</h3>
                <ol style="margin: 0; padding-left: 20px; color: #5C4033; font-size: 14px; line-height: 1.8;">
                  <li>Please arrive 10 minutes before your booking time</li>
                  <li>Check in at our reception desk</li>
                  <li>Show this email or your receipt number</li>
                  <li>Enjoy your workspace at WorkNest!</li>
                </ol>
              </div>

              <p style="margin: 0 0 20px; color: #5C4033; font-size: 14px; line-height: 1.6;">
                If you have any questions or need to make changes to your booking, please contact us at:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 20px; background-color: #FFFFF0; border-radius: 8px; text-align: center;">
                    <p style="margin: 0 0 10px; color: #5C4033; font-size: 14px;">
                      📧 <a href="mailto:hello@worknest.co.ke" style="color: #D4AF37; text-decoration: none;">hello@worknest.co.ke</a>
                    </p>
                    <p style="margin: 0; color: #5C4033; font-size: 14px;">
                      📞 <a href="tel:+254712345678" style="color: #D4AF37; text-decoration: none;">+254 712 345 678</a>
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; color: #5C4033; font-size: 16px;">
                We look forward to welcoming you!
              </p>

              <p style="margin: 20px 0 0; color: #5C4033; font-size: 16px;">
                Best regards,<br>
                <strong style="color: #D4AF37;">The WorkNest Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #5C4033; padding: 30px; text-align: center;">
              <p style="margin: 0 0 10px; color: #D4AF37; font-size: 20px; font-weight: bold;">WorkNest</p>
              <p style="margin: 0 0 15px; color: #ffffff; font-size: 14px;">Premium Coworking Space in Eldoret</p>
              <p style="margin: 0; color: #ffffff; font-size: 12px; opacity: 0.8;">
                Eldoret, Kenya | hello@worknest.co.ke | +254 712 345 678
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

interface AdminNotificationProps {
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
}

export const AdminNotificationEmail = ({
  customerName,
  customerEmail,
  customerPhone,
  spaceName,
  bookingDate,
  startTime,
  endTime,
  numberOfPeople,
  receiptNumber,
  totalAmount,
  purpose,
}: AdminNotificationProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Booking Alert - WorkNest Admin</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px;">
          <tr>
            <td style="background-color: #D4AF37; padding: 20px; text-align: center;">
              <h2 style="margin: 0; color: #ffffff;">🔔 New Booking Alert</h2>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px; font-size: 16px; color: #5C4033;">
                <strong>A new booking has been made!</strong>
              </p>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="border: 1px solid #D4AF37; border-radius: 4px;">
                <tr style="background-color: #FFFFF0;">
                  <td colspan="2" style="padding: 15px; border-bottom: 2px solid #D4AF37;">
                    <strong style="color: #5C4033; font-size: 16px;">Receipt: ${receiptNumber}</strong>
                  </td>
                </tr>
                <tr>
                  <td style="color: #5C4033; font-weight: bold; width: 40%;">Customer:</td>
                  <td style="color: #5C4033;">${customerName}</td>
                </tr>
                <tr style="background-color: #FFFFF0;">
                  <td style="color: #5C4033; font-weight: bold;">Email:</td>
                  <td style="color: #5C4033;">${customerEmail}</td>
                </tr>
                <tr>
                  <td style="color: #5C4033; font-weight: bold;">Phone:</td>
                  <td style="color: #5C4033;">${customerPhone}</td>
                </tr>
                <tr style="background-color: #FFFFF0;">
                  <td style="color: #5C4033; font-weight: bold;">Space:</td>
                  <td style="color: #5C4033;">${spaceName}</td>
                </tr>
                <tr>
                  <td style="color: #5C4033; font-weight: bold;">Date:</td>
                  <td style="color: #5C4033;">${bookingDate}</td>
                </tr>
                <tr style="background-color: #FFFFF0;">
                  <td style="color: #5C4033; font-weight: bold;">Time:</td>
                  <td style="color: #5C4033;">${startTime} - ${endTime}</td>
                </tr>
                <tr>
                  <td style="color: #5C4033; font-weight: bold;">People:</td>
                  <td style="color: #5C4033;">${numberOfPeople}</td>
                </tr>
                ${purpose ? `
                <tr style="background-color: #FFFFF0;">
                  <td style="color: #5C4033; font-weight: bold;">Purpose:</td>
                  <td style="color: #5C4033;">${purpose}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="color: #5C4033; font-weight: bold; padding-top: 15px; border-top: 2px solid #D4AF37;">Amount:</td>
                  <td style="color: #D4AF37; font-weight: bold; font-size: 18px; padding-top: 15px; border-top: 2px solid #D4AF37;">KES ${totalAmount.toLocaleString()}</td>
                </tr>
              </table>

              <p style="margin: 30px 0 0; text-align: center;">
                <a href="http://localhost:3000/admin/bookings" style="display: inline-block; background-color: #D4AF37; color: #ffffff; text-decoration: none; padding: 12px 30px; border-radius: 4px; font-weight: bold;">View in Admin Panel</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

