// Payment Receipt Email Template

interface PaymentReceiptProps {
  customerName: string
  receiptNumber: string
  mpesaReceiptNumber: string
  spaceName: string
  bookingDate: string
  startTime: string
  endTime: string
  numberOfPeople: number
  totalAmount: number
  paymentDate: string
  paymentMethod: string
  phoneNumber: string
}

export const PaymentReceiptEmail = ({
  customerName,
  receiptNumber,
  mpesaReceiptNumber,
  spaceName,
  bookingDate,
  startTime,
  endTime,
  numberOfPeople,
  totalAmount,
  paymentDate,
  paymentMethod,
  phoneNumber,
}: PaymentReceiptProps) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Receipt - WorkNest</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #FFFFF0;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFF0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: bold;">✓ Payment Successful!</h1>
              <p style="margin: 10px 0 0; color: #ffffff; font-size: 18px; opacity: 0.95;">Thank you for your payment</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px; color: #5C4033; font-size: 16px;">Dear <strong>${customerName}</strong>,</p>
              
              <p style="margin: 0 0 30px; color: #5C4033; font-size: 16px; line-height: 1.6;">
                We have successfully received your payment for WorkNest space booking. Below are your receipt and booking details:
              </p>

              <!-- Payment Receipt Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%); border-radius: 8px; margin-bottom: 30px; box-shadow: 0 2px 4px rgba(212, 175, 55, 0.3);">
                <tr>
                  <td style="padding: 30px; text-align: center;">
                    <div style="color: rgba(255,255,255,0.9); font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">M-PESA Payment Receipt</div>
                    <div style="color: #ffffff; font-size: 32px; font-weight: bold; font-family: 'Courier New', monospace; margin-bottom: 20px; letter-spacing: 2px;">${mpesaReceiptNumber}</div>
                    <div style="border-top: 1px solid rgba(255,255,255,0.3); padding-top: 15px;">
                      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 8px;">
                        <strong style="color: #ffffff;">Amount Paid:</strong> KES ${totalAmount.toLocaleString()}
                      </div>
                      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 8px;">
                        <strong style="color: #ffffff;">Payment Method:</strong> ${paymentMethod.toUpperCase()}
                      </div>
                      <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 8px;">
                        <strong style="color: #ffffff;">Phone Number:</strong> ${phoneNumber}
                      </div>
                      <div style="color: rgba(255,255,255,0.9); font-size: 14px;">
                        <strong style="color: #ffffff;">Date:</strong> ${paymentDate}
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Booking Details Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFF0; border: 2px solid #D4AF37; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 25px;">
                    <h3 style="margin: 0 0 15px; color: #5C4033; font-size: 18px; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Booking Details</h3>
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #5C4033; font-size: 14px; width: 40%;">Booking Reference:</td>
                        <td style="color: #D4AF37; font-weight: bold; text-align: right; font-family: 'Courier New', monospace;">${receiptNumber}</td>
                      </tr>
                      <tr style="background-color: #ffffff;">
                        <td style="color: #5C4033; font-size: 14px;">Space:</td>
                        <td style="color: #5C4033; font-weight: bold; text-align: right;">${spaceName}</td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px;">Date:</td>
                        <td style="color: #5C4033; text-align: right;">${bookingDate}</td>
                      </tr>
                      <tr style="background-color: #ffffff;">
                        <td style="color: #5C4033; font-size: 14px;">Time:</td>
                        <td style="color: #5C4033; text-align: right;">${startTime} - ${endTime}</td>
                      </tr>
                      <tr>
                        <td style="color: #5C4033; font-size: 14px;">Number of People:</td>
                        <td style="color: #5C4033; text-align: right;">${numberOfPeople}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Status Badge -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 12px 35px; border-radius: 25px; font-weight: bold; font-size: 16px; box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);">
                  ✓ BOOKING CONFIRMED & PAID
                </div>
              </div>

              <!-- Next Steps -->
              <div style="background-color: #E8F5E9; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <h4 style="margin: 0 0 10px; color: #5C4033; font-size: 16px;">📋 What's Next?</h4>
                <ul style="margin: 0; padding-left: 20px; color: #5C4033; font-size: 14px; line-height: 1.8;">
                  <li>Please arrive 10 minutes before your booking time</li>
                  <li>Show this email or your receipt number at our reception</li>
                  <li>Your space is confirmed and reserved for you</li>
                  <li>Keep this email as proof of payment</li>
                </ul>
              </div>

              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FFFFF0; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="text-align: center;">
                    <p style="margin: 0 0 10px; color: #5C4033; font-size: 14px;">
                      Need help or have questions?
                    </p>
                    <p style="margin: 0 0 5px; color: #5C4033; font-size: 14px;">
                      📧 <a href="mailto:hello@worknest.co.ke" style="color: #D4AF37; text-decoration: none; font-weight: 600;">hello@worknest.co.ke</a>
                    </p>
                    <p style="margin: 0; color: #5C4033; font-size: 14px;">
                      📞 <a href="tel:+254712345678" style="color: #D4AF37; text-decoration: none; font-weight: 600;">+254 712 345 678</a>
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
            <td style="background-color: #5C4033; padding: 30px; text-align: center; border-radius: 0 0 8px 8px;">
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

