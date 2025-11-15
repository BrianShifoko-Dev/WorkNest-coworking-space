# 🚀 Quick Start: Notification System

## ⚡ 3-Step Setup

### Step 1: Create the Database Table
```sql
-- Go to Supabase Dashboard → SQL Editor
-- Copy and paste the entire contents of: CREATE-NOTIFICATIONS-TABLE.sql
-- Click "Run" button
-- ✅ Wait for "Success" message
```

### Step 2: Restart Your Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

### Step 3: Test It!
```
1. Log in to admin: http://localhost:3000/login
2. Look at the top right - you'll see a 🔔 bell icon
3. Click it - you'll see sample notifications!
4. Create a test booking from the frontend
5. Check the bell again - new notification appears! 🎉
```

---

## 🔔 What You'll See

### In the Header:
```
┌─────────────────────────────────┐
│  🔔  [Red Badge: 3]             │  ← Click this!
└─────────────────────────────────┘
```

### Dropdown Panel:
```
┌─────────────────────────────────────┐
│ 🔔 Notifications      [3 new]      │
│ [✅✅ Mark all as read]             │
├─────────────────────────────────────┤
│ 📅 🆕 New Booking Received         │
│    John Doe booked Conference...   │
│    5 minutes ago         [✓] [🗑] │
├─────────────────────────────────────┤
│ 💳 💰 Payment Received             │
│    KES 5,000 from Jane Smith       │
│    10 minutes ago        [✓] [🗑] │
├─────────────────────────────────────┤
│ 👤 New Customer Registered         │
│    Sarah Johnson (sarah@...)       │
│    1 hour ago            [✓] [🗑] │
└─────────────────────────────────────┘
```

---

## 👥 What Each Role Sees

### **Manager** 👑
- ✅ New bookings
- ✅ Payments
- ✅ New customers
- ✅ Cancellations
- ✅ System updates
- **Sees:** Everything

### **Reception** 📋
- ✅ New bookings
- ✅ Payment confirmations
- ✅ Upcoming bookings
- **Doesn't see:** Customer registrations, system updates

### **Staff** 👨‍💼
- ✅ Upcoming bookings only
- **Doesn't see:** Payments, new customers, system updates

---

## 🎯 Common Actions

### Mark a Notification as Read
```
1. Click the ✓ checkmark button
2. Notification becomes less bold
3. Badge count decreases
```

### Mark All as Read
```
1. Click "✅✅ Mark all as read" at top
2. All notifications marked
3. Badge disappears
```

### Delete a Notification
```
1. Click the 🗑️ trash icon
2. Notification disappears
3. Count updates
```

### Go to Related Page
```
1. Click anywhere on the notification card
2. Automatically marked as read
3. Navigates to the relevant page (e.g., /admin/bookings)
```

---

## 🔴 Notification Triggers

Notifications are automatically sent when:

1. **Someone books a space** (frontend or admin)
   - → Manager & Reception get notified

2. **Payment is received** (M-Pesa callback)
   - → Manager & Reception get notified

3. **New customer registers**
   - → Manager gets notified

4. **Booking is cancelled**
   - → Manager & Reception get notified

---

## 💡 Pro Tips

1. **Auto-Refresh:** Notifications update every 30 seconds automatically
2. **Badge Pulse:** Unread count badge pulses to grab attention
3. **Color Codes:** Look at the left border color:
   - 🔵 Blue = Booking
   - 🟢 Green = Payment
   - 🟣 Purple = Customer
   - 🟠 Orange = System
4. **Click to Act:** Click a notification to go directly to that page
5. **Clean Regularly:** Delete old notifications to keep the list clean

---

## 🐛 Quick Fixes

### "No notifications showing"
- Wait 30 seconds (auto-refresh)
- Click the bell to force refresh
- Check if table was created in Supabase

### "Badge not updating"
- Refresh the page
- Check browser console for errors
- Ensure you're logged in

### "Wrong notifications appearing"
- Check your user role (top right corner)
- Ensure you logged in with correct account

---

## 🎊 You're Ready!

The notification system is now:
- ✅ Live in your admin header
- ✅ Automatically sending alerts
- ✅ Filtering by role
- ✅ Updating in real-time

**Click the 🔔 bell and see your first notification!**

---

## 📚 Full Documentation

For complete details, see: `NOTIFICATION-SYSTEM-COMPLETE.md`

