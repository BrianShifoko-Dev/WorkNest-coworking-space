# 📧 Email System Setup Guide

## ✅ What's Been Built

The complete email notification system for WorkNest, including:

1. **Email Templates** - Beautiful HTML emails for booking confirmations and admin notifications
2. **Email Service** - Integration with Resend API for reliable email delivery
3. **Email Logs** - Database tracking of all sent emails
4. **Admin Dashboard** - View and monitor all sent emails
5. **Auto-Notifications** - Automatic emails when bookings are created

---

## 🚀 SETUP STEPS (5 Minutes!)

### Step 1: Create Resend Account (FREE)

1. Go to **https://resend.com**
2. Click **"Sign Up"** (it's FREE - 3,000 emails/month!)
3. Verify your email
4. You'll get an API key immediately

### Step 2: Get Your API Key

1. In Resend dashboard, go to **API Keys**
2. Click **"Create API Key"**
3. Copy the key (starts with `re_...`)

### Step 3: Add API Key to `.env.local`

Open your `.env.local` file and add:

```bash
# Add this line at the bottom
RESEND_API_KEY=re_your_key_here

# Optional: Set admin emails (comma-separated)
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke
```

**Replace `re_your_key_here` with your actual Resend API key!**

### Step 4: Create Email Logs Table

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open the file `CREATE-EMAIL-LOGS-TABLE.sql` from your project
3. Copy the entire SQL code
4. Paste it into Supabase SQL Editor
5. Click **"Run"**
6. You should see: ✅ "Email logs table created successfully!"

### Step 5: Restart Your Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 6: Test It! 🎉

1. Go to your frontend: **http://localhost:3000/book**
2. Fill in the booking form with a **real email address**
3. Submit the booking
4. Check:
   - ✉️ Your email inbox (booking confirmation)
   - 📊 Admin Dashboard → Email Logs (see the sent email)
   - 📧 Admin email (if configured)

---

## 📧 What Emails Are Sent?

### 1. **Booking Confirmation** (to customer)
- Sent immediately when booking is created
- Contains:
  - Receipt number
  - Space details
  - Date, time, duration
  - Number of people
  - Total amount
  - Special requests
  - Contact information

### 2. **Admin Notification** (to admin/manager)
- Sent immediately when booking is created
- Contains:
  - All customer details
  - Booking information
  - Link to admin panel

---

## 🎨 Email Template Preview

Emails are professionally designed with:
- ✅ WorkNest branding (gold & brown colors)
- ✅ Responsive design (mobile-friendly)
- ✅ Clear formatting and tables
- ✅ Receipt numbers
- ✅ Contact information
- ✅ Professional footer

---

## 🔍 How to View Sent Emails

1. Go to **Admin Dashboard** → **Email Logs**
2. You'll see:
   - 📊 Stats (Total, Sent, Failed, Pending)
   - 🔍 Search by email or subject
   - 🎯 Filter by status (sent/failed/pending)
   - 🏷️ Filter by type (booking confirmation, admin notification, etc.)
   - 📅 Date and time of each email
   - ⚠️ Error messages (if email failed)

---

## ⚙️ Configuration Options

### Change Admin Email(s)

In `.env.local`:

```bash
# Single admin email
ADMIN_EMAILS=admin@worknest.co.ke

# Multiple admin emails (comma-separated)
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke,reception@worknest.co.ke
```

### Use Your Own Domain (Later)

Right now, emails come from `onboarding@resend.dev` (Resend's test domain).

To use your own domain (e.g., `hello@worknest.co.ke`):
1. In Resend dashboard, click **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `worknest.co.ke`)
4. Follow DNS setup instructions
5. Update `lib/email-service.ts` line 21:
   ```typescript
   const fromEmail = 'WorkNest <hello@worknest.co.ke>'
   ```

---

## 🐛 Troubleshooting

### Email Not Sending?

1. **Check API Key**: Make sure `RESEND_API_KEY` is correct in `.env.local`
2. **Restart Server**: Always restart after changing `.env.local`
3. **Check Email Logs**: Go to Admin → Email Logs to see error messages
4. **Check Console**: Look for `📧` emoji in terminal logs

### Email Goes to Spam?

This is normal with `onboarding@resend.dev`. Once you set up your own domain, emails will go to inbox.

### API Key Not Working?

- Make sure there are no spaces before/after the key
- Make sure you copied the entire key (starts with `re_`)
- Try creating a new API key in Resend dashboard

### Supabase Error When Creating Table?

If you get an error about the table already existing, that's fine! It means it's already created.

---

## 📊 Email Logs Database Schema

The `email_logs` table stores:

| Field | Type | Description |
|-------|------|-------------|
| `id` | UUID | Unique ID |
| `to_email` | VARCHAR | Recipient email |
| `from_email` | VARCHAR | Sender email |
| `subject` | VARCHAR | Email subject |
| `email_type` | VARCHAR | Type (booking_confirmation, admin_notification, etc.) |
| `status` | VARCHAR | Status (sent, failed, pending) |
| `error_message` | TEXT | Error if failed |
| `booking_id` | UUID | Related booking (if any) |
| `customer_id` | UUID | Related customer (if any) |
| `sent_at` | TIMESTAMPTZ | When email was sent |
| `created_at` | TIMESTAMPTZ | When log was created |

---

## 🎯 Next Steps

- ✅ Test bookings with real email addresses
- ✅ Check Email Logs in admin panel
- ✅ Monitor email delivery rates
- 🔜 Add payment confirmation emails (when we build payments)
- 🔜 Set up your own domain for professional emails

---

## 🆘 Need Help?

Common issues:
1. **"Invalid API key"**: Check `.env.local` and restart server
2. **"Email not received"**: Check spam folder, verify email address, check Email Logs for errors
3. **"Table already exists"**: This is fine, the table was already created

---

## 🎉 You're All Set!

Your WorkNest email system is ready! Every booking will now automatically send:
- ✉️ Professional confirmation email to customer
- 📧 Notification to admin/manager
- 📊 Logged in Email Logs for tracking

**Test it now by creating a booking!** 🚀

