# 🔧 Booking System Troubleshooting

## ❌ Error: "Failed to load bookings"

This error usually means one of these:

### **1. Database is Empty (Most Common)**

**Problem:** No bookings exist yet in the database.

**Solution:** Create a sample booking!

#### **Option A: Create from Admin Panel**
1. Go to: `http://localhost:3000/admin/bookings`
2. Click "New Booking"
3. Fill in the form
4. Check availability
5. Create booking
6. **Done!** Refresh the page

#### **Option B: Create from SQL (Fastest)**
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Copy & paste the SQL from `CREATE-SAMPLE-BOOKING.sql`
4. Click "Run"
5. **Done!** Refresh the bookings page

---

## 🔍 **Check Your Database:**

### **Step 1: Do you have SPACES?**

Run this in Supabase SQL Editor:
```sql
SELECT COUNT(*) FROM spaces;
```

**If 0:**
1. Go to: `http://localhost:3000/admin/spaces`
2. Click "Add Space"
3. Fill in details (see `ADMIN-SPACE-MANAGEMENT-GUIDE.md`)
4. Create at least one space

---

### **Step 2: Do you have CUSTOMERS?**

Run this:
```sql
SELECT COUNT(*) FROM customers;
```

**If 0:** Don't worry! Customers are created automatically when:
- Someone books from frontend (`/book`)
- Admin creates a booking

---

### **Step 3: Do you have BOOKINGS?**

Run this:
```sql
SELECT COUNT(*) FROM bookings;
```

**If 0:** Create your first booking (see Option A or B above)

---

## 🚀 **Quick Start Guide:**

If you're seeing "Failed to load bookings", follow these steps:

### **1. Add a Space First**
```
Go to: /admin/spaces
Click: "Add Space"
Fill in:
  Name: Executive Office
  Type: Office
  Capacity: 5
  Hourly Rate: 500
  Daily Rate: 3000
  Images: (any Unsplash URLs)
  Amenities: WiFi, Desk, Chair
Create Space ✅
```

### **2. Create a Booking**

**Option A - From Admin:**
```
Go to: /admin/bookings
Click: "New Booking"
Fill in:
  Customer Name: John Doe
  Email: john@example.com
  Phone: +254712345678
  Space: Executive Office
  Date: Tomorrow
  Time: 10:00 AM - 2:00 PM
  People: 3
  Amount: 3000
Check Availability ✅
Create Booking ✅
```

**Option B - From Frontend:**
```
Go to: /book
Fill in same details as above
Check Availability ✅
Submit Booking ✅
```

### **3. Refresh Bookings Page**
```
Go to: /admin/bookings
Should see your booking! 🎉
```

---

## 📋 **Common Issues:**

### **Issue 1: "Failed to load bookings"**
- **Cause:** No bookings in database
- **Fix:** Create a booking (see above)

### **Issue 2: "Space not available"**
- **Cause:** Time slot is already booked
- **Fix:** Choose different time or space

### **Issue 3: "No spaces found"**
- **Cause:** No spaces in database
- **Fix:** Add spaces from `/admin/spaces`

### **Issue 4: "Error creating booking"**
- **Check:** Do you have spaces?
- **Check:** Are dates/times valid?
- **Check:** Is receipt number unique?

---

## 🐛 **Debug Mode:**

### **Check Browser Console:**

1. Open browser DevTools (F12)
2. Go to "Console" tab
3. Look for errors in red

**Common errors:**
- `404 /api/bookings` → API route not found (restart server)
- `500 Internal Server Error` → Database issue (check Supabase)
- `Failed to fetch` → Server not running (restart dev server)

### **Check Server Terminal:**

Look for these logs:
```
📊 Fetching bookings with filters: { status: 'all' }
✅ Found bookings: 0
📭 No bookings found
```

This is **NORMAL** if database is empty!

---

## ✅ **Expected Behavior:**

### **When Database is Empty:**
- Page loads successfully ✅
- Shows "No bookings found" message ✅
- Shows "Create First Booking" button ✅
- Stats show all zeros (0/0/0/0/0) ✅

**This is NOT an error!** It means your system is working correctly, you just need to create your first booking.

---

### **When You Have Bookings:**
- Page loads successfully ✅
- Shows booking cards ✅
- Stats show real numbers ✅
- Search/filter works ✅

---

## 🎯 **Test Your Setup:**

Run these checks:

### ✅ **1. Server Running?**
```
Check terminal for: "✓ Ready in 3.2s"
Visit: http://localhost:3000
Should load homepage
```

### ✅ **2. Can Login?**
```
Go to: /login
Email: admin@worknest.co.ke
Password: Admin@123
Should redirect to /admin/dashboard
```

### ✅ **3. Can See Spaces?**
```
Go to: /admin/spaces
Should see spaces page (empty or with spaces)
Can click "Add Space"
```

### ✅ **4. Can See Bookings?**
```
Go to: /admin/bookings
Should see bookings page (empty or with bookings)
Can click "New Booking"
```

### ✅ **5. Can Book from Frontend?**
```
Go to: /book
Should see booking form
Can fill in details
```

---

## 🔄 **Quick Reset:**

If things are really broken:

### **1. Restart Dev Server:**
```powershell
Press Ctrl+C in terminal
npm run dev
```

### **2. Clear Next.js Cache:**
```powershell
Remove-Item -Recurse -Force .next
npm run dev
```

### **3. Check Environment Variables:**
Make sure `.env.local` has:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 📞 **Still Having Issues?**

### **Check These:**

1. ✅ Is dev server running? (`npm run dev`)
2. ✅ Can you access Supabase dashboard?
3. ✅ Do you have at least one space?
4. ✅ Is your database schema set up? (see `supabase-schema.sql`)
5. ✅ Are environment variables correct?

### **Get More Info:**

Check server logs in terminal for:
- `📊 Fetching bookings` → API is being called
- `✅ Found bookings: X` → Found X bookings
- `❌ Error` → Shows the actual error

---

## 🎉 **Success Indicators:**

You'll know it's working when:

1. ✅ No red errors in browser console
2. ✅ Bookings page loads (even if empty)
3. ✅ Can create bookings from admin panel
4. ✅ Can create bookings from `/book`
5. ✅ Bookings show up in list after creation
6. ✅ Search and filter work

---

## 💡 **Pro Tip:**

**Start Fresh:**
1. Add 2-3 spaces first
2. Create 1 test booking from admin
3. Create 1 test booking from frontend
4. Play with search/filter
5. Test conflict prevention (try double booking)

**This will give you confidence that everything works!** ✅

---

**Need sample data? Use `CREATE-SAMPLE-BOOKING.sql`!** 🚀


