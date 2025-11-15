# 🔧 Fix Notifications Error - Quick Guide

## ❌ **THE ERROR:**

```
❌ Error fetching notifications: {
  code: 'PGRST205',
  message: "Could not find the table 'public.notifications' in the schema cache"
}
```

**Problem:** The `notifications` table doesn't exist in your database!

---

## ✅ **SOLUTION - Create the Table**

### **Step 1: Open Supabase SQL Editor**
1. Go to **Supabase Dashboard**
2. Click **"SQL Editor"** (left sidebar)
3. Click **"New query"**

### **Step 2: Run the SQL Script**
1. Open file: **`CREATE-NOTIFICATIONS-TABLE.sql`**
2. Copy **ALL** content
3. Paste into Supabase SQL Editor
4. Click **"Run"**

### **Step 3: Verify It Worked**
- You should see success messages
- Check "Table Editor" → you'll see new `notifications` table
- The terminal error should disappear!

---

## 📊 **WHAT THE SCRIPT DOES:**

### **Creates Notifications Table:**
```
notifications
├── id (UUID)
├── user_id (UUID) - specific user
├── target_role (VARCHAR) - role-based notifications
├── type (VARCHAR) - booking, payment, system, etc.
├── title (VARCHAR) - notification title
├── message (TEXT) - notification content
├── link (VARCHAR) - optional link
├── is_read (BOOLEAN) - read status
├── related_id (UUID) - related entity
├── related_type (VARCHAR) - entity type
├── created_at (TIMESTAMPTZ)
└── read_at (TIMESTAMPTZ)
```

### **Adds Sample Notifications:**
- 🎉 Welcome notification (for managers)
- 📅 Booking notification (for reception)
- 🔔 System notification (for staff)

### **Sets Up Security:**
- ✅ Row Level Security (RLS) enabled
- ✅ Users can view their own notifications
- ✅ Users can update/delete their notifications
- ✅ Backend can create notifications

---

## 🎯 **AFTER RUNNING THE SCRIPT:**

### **Terminal Error Will Stop:**
- ❌ **Before:** "Could not find the table 'notifications'"
- ✅ **After:** No error, notifications load successfully

### **You Can Now:**
- ✅ See notification bell icon in admin panel
- ✅ Receive notifications for new bookings
- ✅ Mark notifications as read
- ✅ Delete notifications
- ✅ Filter by notification type

---

## 🔔 **HOW NOTIFICATIONS WORK:**

### **Automatic Triggers:**

**When a booking is created:**
```javascript
// Backend automatically creates notification
POST /api/notifications
{
  target_role: "manager",
  type: "booking",
  title: "🆕 New Booking",
  message: "John Kamau booked Executive Office for Nov 15",
  link: "/admin/bookings"
}
```

**When a payment is received:**
```javascript
POST /api/notifications
{
  target_role: "accountant",
  type: "payment",
  title: "💰 Payment Received",
  message: "Payment of KES 6,000 received",
  link: "/admin/payments"
}
```

### **Role-Based Notifications:**

| Role | Receives Notifications For |
|------|---------------------------|
| **Manager** | Everything (bookings, payments, customers, system) |
| **Reception** | Bookings, customers, events |
| **Accountant** | Payments, bookings, invoices |
| **Staff** | System updates, assigned tasks |

---

## 🧪 **TEST THE NOTIFICATIONS:**

### **Method 1: Check Admin Panel**
1. Go to `/admin/dashboard`
2. Look at top-right corner
3. Click **bell icon** 🔔
4. You should see 3 sample notifications

### **Method 2: Create a Real Notification**
1. Make a test booking from frontend
2. Check admin panel
3. You should see "New Booking Received" notification

### **Method 3: API Test**
```bash
# Visit in browser or use curl
GET /api/notifications

# Should return JSON array of notifications
```

---

## 🎨 **NOTIFICATION FEATURES:**

### **In the UI:**
- 🔔 Bell icon with unread count badge
- 📋 Dropdown list of recent notifications
- ✅ Mark as read functionality
- 🗑️ Delete notification
- 🔗 Click to navigate to related page
- 🎯 Real-time updates (polls every 30 seconds)

### **Notification Types:**
- 📅 **Booking** - New bookings, cancellations
- 💰 **Payment** - Payments received, pending
- 👥 **Customer** - New customers, inquiries
- 🏢 **Space** - Space updates, maintenance
- 🎉 **Event** - Event registrations, updates
- 👤 **User** - User activities, permissions
- 🔔 **System** - Updates, alerts, announcements

---

## 🔧 **OPTIONAL CONFIGURATIONS:**

### **Disable RLS for Testing:**
If you want easier testing without authentication:
```sql
ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;
```

### **Clear All Notifications:**
```sql
DELETE FROM notifications;
```

### **Add Custom Notification:**
```sql
INSERT INTO notifications (
  target_role,
  type,
  title,
  message,
  link
) VALUES (
  'manager',
  'alert',
  '⚠️ Important Alert',
  'Please review the pending bookings',
  '/admin/bookings?status=pending'
);
```

---

## 🆘 **TROUBLESHOOTING:**

### **Error: "relation already exists"**
- Table was already created
- That's fine! The error will still be fixed

### **Error: "column does not exist"**
- Make sure you copied the ENTIRE script
- Check that all columns were created

### **Still seeing the error?**
1. Clear your browser cache (Ctrl+Shift+Delete)
2. Restart your dev server:
   ```bash
   npm run dev
   ```
3. Hard refresh page (Ctrl+Shift+R)

### **Notifications not showing in UI?**
1. Check that table was created in Supabase
2. Verify sample notifications exist:
   ```sql
   SELECT * FROM notifications;
   ```
3. Check browser console for errors (F12)

---

## ✅ **VERIFICATION CHECKLIST:**

- [ ] Run `CREATE-NOTIFICATIONS-TABLE.sql` in Supabase
- [ ] See success messages in SQL Editor
- [ ] Check Table Editor - `notifications` table exists
- [ ] Terminal error stops appearing
- [ ] Admin dashboard loads without errors
- [ ] Bell icon appears in top navigation
- [ ] Click bell icon - see sample notifications
- [ ] Test: Make a booking → see notification

---

## 🎉 **RESULT:**

**Before:**
- ❌ Terminal showing "table not found" error
- ❌ Notifications not working
- ❌ Bell icon empty or broken

**After:**
- ✅ No errors in terminal
- ✅ Notifications table exists
- ✅ Sample notifications appear
- ✅ Real-time notifications work
- ✅ Admin panel fully functional

---

## 💡 **WHY THIS HAPPENED:**

The notification system was implemented in the code, but the database table was never created. This is common when:
- Database wasn't migrated properly
- Table creation script wasn't run
- Working on new features incrementally

**Now it's fixed!** 🚀

---

## 📋 **FILES TO KEEP:**

- ✅ `CREATE-NOTIFICATIONS-TABLE.sql` - The fix script
- ✅ `FIX-NOTIFICATIONS-ERROR.md` - This guide

**Run the SQL script now and your notifications will work!** 🔔

