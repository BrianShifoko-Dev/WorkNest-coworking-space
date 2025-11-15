# 📅 Booking System Guide

## ✅ **WHAT'S WORKING NOW**

### **🎯 Core Features:**
1. ✅ **Create Bookings** (from admin panel)
2. ✅ **Conflict Prevention** (no double bookings!)
3. ✅ **Capacity Checking** (auto-validates)
4. ✅ **Unique Receipt Numbers** (e.g., WN25110001)
5. ✅ **Customer Management** (auto-create or find existing)
6. ✅ **Status Tracking** (Pending → Confirmed → Completed/Cancelled)
7. ✅ **Availability Checker** (real-time validation)
8. ✅ **Activity Logging** (audit trail)

---

## 🚀 **HOW TO USE**

### **Step 1: Go to Bookings Page**
```
http://localhost:3000/admin/bookings
```

### **Step 2: Click "New Booking"**

### **Step 3: Fill in Customer Details**
- **Full Name:** John Doe
- **Email:** john@example.com
- **Phone:** +254712345678
- **Company:** (optional)

### **Step 4: Select Space & Time**
- **Space:** Choose from dropdown
- **Start Date:** Select date
- **Start Time:** Select time
- **End Date:** Select end date
- **End Time:** Select end time

### **Step 5: Check Availability** 🔍
**Click "Check Availability" button**
- ✅ **Green = Available** → You can proceed
- ❌ **Red = Unavailable** → Choose different time

### **Step 6: Add Details**
- **Number of People:** 5
- **Total Amount:** 5000
- **Purpose:** Team workshop
- **Special Requests:** (optional)

### **Step 7: Create Booking**
- System generates unique receipt number
- Booking created with "Confirmed" status
- Customer automatically added to database

---

## 🎨 **Booking Status Flow**

```
PENDING → CONFIRMED → COMPLETED
    ↓
CANCELLED (any time)
```

### **Status Actions:**
- **Pending:** Can confirm or cancel
- **Confirmed:** Can mark as completed
- **Completed:** Final state (done!)
- **Cancelled:** Final state (refund?)

---

## 🛡️ **Conflict Prevention**

The system **automatically prevents**:

1. ✅ **Double Bookings**
   - Same space, same time = BLOCKED
   - System checks database in real-time

2. ✅ **Capacity Violations**
   - 10 people in 5-person room = BLOCKED
   - Auto-validates against space capacity

3. ✅ **Time Overlap**
   - If any part of time overlaps = BLOCKED
   - Example: 
     - Existing: 9:00 AM - 12:00 PM
     - New: 11:00 AM - 2:00 PM → **BLOCKED**

---

## 📊 **Dashboard Stats**

At the top of the bookings page, you'll see:

- **Total Bookings:** All bookings
- **Pending:** Awaiting confirmation
- **Confirmed:** Ready to go
- **Completed:** Successfully finished
- **Cancelled:** Cancelled bookings

---

## 🔍 **Search & Filter**

### **Search:**
Type in search box to find bookings by:
- Receipt number
- Customer name
- Customer email
- Space name

### **Filter by Status:**
- All Status
- Pending only
- Confirmed only
- Completed only
- Cancelled only

---

## 🎯 **Example Booking Flow**

### **Scenario:** Reception booking for walk-in customer

1. **Customer walks in:**
   "Hi, I need a boardroom for 8 people tomorrow 2-5 PM"

2. **Reception goes to:** `/admin/bookings`

3. **Clicks:** "New Booking"

4. **Fills in:**
   ```
   Name: Jane Smith
   Email: jane@company.com
   Phone: +254700123456
   Company: ABC Ltd
   
   Space: Executive Boardroom
   Date: Tomorrow
   Start: 2:00 PM
   End: 5:00 PM
   People: 8
   Amount: 4500
   Purpose: Board meeting
   ```

5. **Clicks:** "Check Availability" → ✅ Available!

6. **Clicks:** "Create Booking"

7. **Success!** Receipt: `WN25110001`

8. **Customer pays** → Reception marks as "Confirmed"

9. **After meeting** → Reception marks as "Completed"

---

## 🎫 **Receipt Numbers**

Format: `WN + YEAR + MONTH + SEQUENCE`

Examples:
- `WN25110001` - First booking in November 2025
- `WN25110042` - 42nd booking in November 2025
- `WN25120001` - First booking in December 2025

**Benefits:**
- ✅ Unique (never repeats)
- ✅ Sortable by date
- ✅ Professional looking
- ✅ Easy to search

---

## 👥 **Customer Management**

### **Auto-Detection:**
When creating a booking, system checks:
- Email exists in database?
  - ✅ **Yes:** Uses existing customer
  - ❌ **No:** Creates new customer

### **Benefits:**
- No duplicate customers
- Automatic history tracking
- Easy repeat bookings
- Contact database builds automatically

---

## 📱 **API Endpoints**

### **For Developers:**

```
GET    /api/bookings              - List all bookings
POST   /api/bookings              - Create new booking
GET    /api/bookings/[id]         - Get single booking
PUT    /api/bookings/[id]         - Update booking
DELETE /api/bookings/[id]         - Cancel booking

POST   /api/bookings/check-availability - Check if space available

GET    /api/customers             - List customers
POST   /api/customers             - Create/find customer
```

---

## 🎉 **What's Working:**

✅ Admin can create bookings  
✅ Reception can book for walk-ins  
✅ Conflict prevention (no double bookings)  
✅ Capacity validation  
✅ Unique receipt numbers  
✅ Customer auto-management  
✅ Status workflow  
✅ Search & filter  
✅ Real-time availability check  
✅ Activity logging  

---

## 🚧 **Coming Next:**

📅 **Calendar View** - Visual booking calendar  
🌐 **Frontend Booking Form** - Customers can book online  
📧 **Email Notifications** - Auto-send booking confirmations  
💳 **Payment Integration** - M-Pesa, Card payments  
📄 **PDF Receipts** - Downloadable receipts  
📊 **Reports** - Booking analytics  

---

## 💡 **Pro Tips**

1. **Always check availability** before creating booking
2. **Use search** to find existing customers (avoid duplicates)
3. **Add special requests** to remember customer needs
4. **Mark completed** after service for accurate records
5. **Use purpose field** for better reporting later

---

## 🐛 **Troubleshooting**

### **"Space not available"**
- Check if space has existing booking at that time
- Try different time slot
- Check space status (might be in maintenance)

### **"Customer already exists"**
- This is normal! System uses existing customer
- No action needed, proceed with booking

### **"Capacity exceeded"**
- Reduce number of people
- Or choose larger space

---

**Happy Booking! 🎉**

Next: Calendar view, frontend booking form, and email notifications!


