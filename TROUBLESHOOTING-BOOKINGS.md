# 🔧 Troubleshooting: "Error Fetching Bookings"

## ✅ **WHAT I JUST FIXED:**

### **1. Dashboard Stats - Now Working!**
- ✅ Fixed field names (`start_datetime` instead of `booking_date`)
- ✅ Added **Total Bookings** metric
- ✅ Added **auto-refresh every 30 seconds**
- ✅ Shows real-time counts that update when someone books

### **2. Today's Bookings Widget - Completely Updated!**
- ✅ Fetches from API (not direct Supabase)
- ✅ Shows all booking details
- ✅ Auto-refreshes every 30 seconds
- ✅ Beautiful cards with purpose, time, people, amount

### **3. Metrics That Now Update Automatically:**
- 📊 **Today's Bookings** - Count of bookings today
- 📊 **Total Bookings** - All bookings ever
- 📊 **Revenue (This Month)** - From confirmed bookings
- 📊 **Total Customers** - Unique customers

---

## 🚨 **IF YOU STILL SEE "ERROR FETCHING BOOKINGS":**

This means your database is **empty** or **tables don't exist**.

---

## ✅ **SOLUTION: Run These SQL Scripts**

### **Step 1: Check if Database is Empty**

Go to **Supabase SQL Editor** and run:

```sql
SELECT COUNT(*) FROM bookings;
SELECT COUNT(*) FROM spaces;
SELECT COUNT(*) FROM customers;
```

**If all show `0`**, your database is empty!

---

### **Step 2: Create Test Data**

Run the script I just created: **`CREATE-TEST-BOOKING-COMPLETE.sql`**

**This will:**
1. Create an Executive Office space
2. Create a test customer
3. Create a booking for tomorrow
4. Show you all the data

**Copy the entire file and paste into Supabase SQL Editor**, then click **RUN**.

---

### **Step 3: Verify Data Was Created**

After running the script, you should see output like:

```
✅ Space created: Executive Office
✅ Customer created: John Test Customer
✅ Booking created: WN25110001
```

---

### **Step 4: Refresh Admin Dashboard**

Go to:
```
http://localhost:3000/admin/dashboard
```

**Within 30 seconds, you should see:**
- ✅ Metrics update with real numbers
- ✅ Today's Bookings widget shows the booking (if you created it for today)

---

## 📊 **WHAT METRICS SHOW:**

### **Dashboard Metrics (4 Cards):**

```
┌──────────────────────┐  ┌──────────────────────┐
│ 📅 Today's Bookings  │  │ 🏢 Total Bookings    │
│       2              │  │       15             │
└──────────────────────┘  └──────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│ 💰 Revenue (Month)   │  │ 👥 Total Customers   │
│   KES 45,000         │  │       8              │
└──────────────────────┘  └──────────────────────┘
```

**These update automatically every 30 seconds!**

---

## 🔍 **CHECK DATABASE STATUS:**

I created a script: **`CHECK-DATABASE.sql`**

**Run this to see:**
- How many spaces you have
- How many customers you have
- How many bookings you have
- Details of recent bookings

---

## 🧪 **CREATE MORE TEST BOOKINGS:**

### **Option 1: Via Frontend (Recommended)**

1. Go to: `http://localhost:3000/book`
2. Fill in the form
3. Submit
4. Within 30 seconds, dashboard updates!

---

### **Option 2: Via Admin Panel**

1. Go to: `http://localhost:3000/admin/bookings`
2. Click **+ Create Booking**
3. Fill in details
4. Submit
5. Metrics update immediately!

---

### **Option 3: Via SQL**

Run the SQL script to add more bookings:

```sql
-- Quick booking for TODAY
WITH space_data AS (
  SELECT id FROM spaces LIMIT 1
),
customer_data AS (
  SELECT id FROM customers LIMIT 1
)
INSERT INTO bookings (
  space_id,
  customer_id,
  start_datetime,
  end_datetime,
  number_of_people,
  purpose,
  status,
  total_amount,
  receipt_number,
  booking_type
)
SELECT 
  space_data.id,
  customer_data.id,
  NOW()::date + TIME '14:00:00',  -- TODAY at 2:00 PM
  NOW()::date + TIME '17:00:00',  -- TODAY at 5:00 PM
  3,
  'Client meeting',
  'confirmed',
  4500,
  'WN' || TO_CHAR(NOW(), 'YYMM') || LPAD(FLOOR(RANDOM() * 9999 + 1)::TEXT, 4, '0'),
  'online'
FROM space_data, customer_data;
```

---

## 🔄 **AUTO-REFRESH FEATURES:**

### **What Updates Automatically:**

1. **Dashboard Stats** - Every 30 seconds
   - Today's bookings count
   - Total bookings count
   - Revenue
   - Customer count

2. **Today's Bookings Widget** - Every 30 seconds
   - New bookings appear
   - Status updates show
   - Details refresh

3. **Bookings Page** - Every 30 seconds
   - New bookings with 🔔 NEW badge
   - Toast notification
   - Desktop notification

**You don't need to refresh the page!**

---

## 🎯 **TYPICAL ISSUES & FIXES:**

### **Issue 1: "Error fetching bookings"**
- **Cause:** Database is empty or tables don't exist
- **Fix:** Run `CREATE-TEST-BOOKING-COMPLETE.sql`

---

### **Issue 2: Metrics show 0**
- **Cause:** No bookings in database
- **Fix:** Create a booking via frontend or admin panel

---

### **Issue 3: Today's Bookings is empty**
- **Cause:** No bookings scheduled for today
- **Fix:** Create a booking for TODAY (see SQL above)

---

### **Issue 4: Stats not updating**
- **Cause:** Browser cache or server not running
- **Fix:** Hard refresh (Ctrl+Shift+R) or restart dev server

---

## 📱 **REAL-TIME UPDATES WORKFLOW:**

### **When Someone Books:**

```
CUSTOMER ACTION:
└─> Fills form at /book
    └─> Clicks "Submit Booking"
        └─> Booking saved to database
            └─> Status: PENDING
            └─> Receipt: WN25110001
            
⏱️ WITHIN 30 SECONDS:
    
ADMIN DASHBOARD UPDATES:
├─> 📊 Metrics refresh
│   ├─> Today's Bookings: 1 → 2
│   └─> Total Bookings: 15 → 16
│
├─> 🔔 Notification pops up
│   └─> "🔔 1 new booking received!"
│
├─> 📅 Today's Bookings widget
│   └─> New booking card appears
│
└─> 📋 Bookings page
    └─> Booking shows with 🔔 NEW badge
```

**All automatic - no manual refresh needed!**

---

## 🧪 **TEST RIGHT NOW:**

### **Quick Test (2 minutes):**

1. **Check if database has data:**
   - Run `CHECK-DATABASE.sql` in Supabase

2. **If empty, create test data:**
   - Run `CREATE-TEST-BOOKING-COMPLETE.sql` in Supabase

3. **Open admin dashboard:**
   ```
   http://localhost:3000/admin/dashboard
   ```

4. **Watch metrics:**
   - Should show real numbers (not 0)
   - Today's Bookings shows booking (if created for today)

5. **Create a booking:**
   - Open `http://localhost:3000/book` in new tab
   - Fill form and submit
   - Go back to dashboard tab
   - Within 30 seconds, see metrics update!

---

## 📊 **WHAT EACH METRIC SHOWS:**

### **1. Today's Bookings**
- Counts bookings with `start_datetime` = TODAY
- Status must be `pending` or `confirmed`
- Updates every 30 seconds

### **2. Total Bookings**
- Counts ALL bookings in database
- Any status
- Cumulative count

### **3. Revenue (This Month)**
- Sum of `total_amount` from bookings
- Only `confirmed` status
- `start_datetime` in current month

### **4. Total Customers**
- Count of all records in `customers` table
- Unique customers who booked

---

## ✅ **VERIFICATION CHECKLIST:**

After running the test SQL:

- [ ] Spaces table has at least 1 space
- [ ] Customers table has at least 1 customer
- [ ] Bookings table has at least 1 booking
- [ ] Admin dashboard loads without errors
- [ ] Metrics show real numbers (not all 0)
- [ ] Today's Bookings widget works (or says "No bookings for today")
- [ ] Creating a new booking updates metrics within 30 seconds

---

## 🚀 **YOU'RE ALL SET!**

Once you run the test SQL script, everything should work!

**Dashboard will show:**
- Real-time metrics
- Auto-updating counts
- Beautiful booking cards
- Notifications for new bookings

**Questions?**
- Check browser console (F12) for errors
- Check terminal for server logs
- Look for SQL errors in Supabase

---

## 🔥 **PRO TIP:**

Keep **TWO browser windows** open:

1. **Window 1:** Admin Dashboard
   - See real-time updates
   - Watch notifications

2. **Window 2:** Customer Booking Page
   - Create test bookings
   - See them appear in Window 1

**You'll see the magic happen in real-time!** ✨

