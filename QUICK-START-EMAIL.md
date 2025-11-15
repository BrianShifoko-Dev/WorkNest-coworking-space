# 📧 Email System - Quick Start (5 Minutes!)

## ✅ What You Get

- ✉️ **Automatic booking confirmations** to customers
- 📧 **Admin notifications** for every booking
- 📊 **Email tracking** in admin dashboard
- 🎨 **Professional templates** with WorkNest branding

---

## 🚀 Setup in 3 Steps

### 1️⃣ Create Resend Account (2 min)

```
1. Go to: https://resend.com
2. Click "Sign Up" (FREE - 3,000 emails/month)
3. Verify your email
4. Go to "API Keys" → "Create API Key"
5. Copy the key (starts with re_...)
```

### 2️⃣ Add to `.env.local` (1 min)

Open `.env.local` and add:

```bash
# Add these lines at the bottom
RESEND_API_KEY=re_your_actual_key_here
ADMIN_EMAILS=your_email@example.com
```

**Replace with your actual Resend API key and email!**

### 3️⃣ Create Database Table (2 min)

```
1. Go to Supabase Dashboard → SQL Editor
2. Open CREATE-EMAIL-LOGS-TABLE.sql from your project
3. Copy all the SQL
4. Paste in Supabase SQL Editor
5. Click "Run"
6. Should see: ✅ "Email logs table created successfully!"
```

### 4️⃣ Restart Server

```bash
npm run dev
```

---

## 🧪 Test It Now!

1. Go to: **http://localhost:3000/book**
2. Fill in the form with **your real email**
3. Submit booking
4. Check:
   - ✉️ **Your inbox** (confirmation email)
   - 📊 **Admin → Email Logs** (see sent email)

---

## 📊 View Email Logs

Go to: **http://localhost:3000/admin/emails**

You'll see:
- 📈 Stats (Total, Sent, Failed)
- 🔍 Search emails
- 🎯 Filter by status/type
- 📅 Date and time sent
- ⚠️ Error messages (if any)

---

## ❓ Problems?

### Email not sending?
- Check API key in `.env.local`
- Restart dev server
- Check terminal for errors

### Email in spam?
- Normal! Using test domain `onboarding@resend.dev`
- Once you add your own domain, goes to inbox

### Need help?
- See `EMAIL-SYSTEM-SETUP.md` for full guide
- See `EMAIL-SYSTEM-COMPLETE.md` for technical details

---

## 🎉 That's It!

Every booking now automatically sends:
- ✅ Beautiful confirmation email to customer
- ✅ Notification to admin
- ✅ Logged in admin dashboard

**No manual work - 100% automated!** 🚀

---

**Next up:** Payment integration, then you can send payment receipts too! 💰

