# 🚀 Quick Guide: Add Accountant Role

## ⏱️ **5 Minutes Setup**

---

## **Step 1: Update Database** (2 minutes)

```bash
1. Open Supabase Dashboard
2. Go to SQL Editor
3. Paste this SQL:
```

```sql
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE users ADD CONSTRAINT users_role_check 
CHECK (role IN ('manager', 'reception', 'staff', 'customer', 'accountant'));

SELECT 'Accountant role enabled!' as status;
```

```bash
4. Click "Run"
5. ✅ Done!
```

---

## **Step 2: Create Accountant** (2 minutes)

```bash
1. Go to: http://localhost:3000/admin/users
2. Click "Add New User" button
3. Fill in:
```

| Field | Value |
|-------|-------|
| Full Name | Jane Doe (Accountant) |
| Email | accountant@worknest.co.ke |
| Phone | +254 712 345 678 |
| Role | 💰 Accountant |
| Password | AccountPass123! |

```bash
4. Click "Create User"
5. ✅ Done!
```

---

## **Step 3: Test Login** (1 minute)

```bash
1. Sign out from current account
2. Go to login page
3. Login with:
   - Email: accountant@worknest.co.ke
   - Password: AccountPass123!
4. ✅ See financial modules!
```

---

## ✅ **What Accountant Can See:**

- ✅ Dashboard (revenue, bookings)
- ✅ Bookings (view only)
- ✅ Spaces (view pricing)
- ✅ Customers (view data)
- ✅ Payments (view + edit status)
- ✅ Reports (generate)
- ✅ Email Logs (view)

---

## ❌ **What Accountant CANNOT See:**

- ❌ Events
- ❌ Menu
- ❌ Gallery
- ❌ Users
- ❌ Settings

---

## 💡 **Quick Tips:**

### **Create Multiple Accountants:**
```
You can create multiple accountant users for different staff members.
Each will have the same financial-only access.
```

### **Edit Existing User:**
```
1. Go to Users page
2. Click "Edit" on any user
3. Change Role to "💰 Accountant"
4. Save
```

### **Remove Accountant Access:**
```
1. Edit the user
2. Change role to "Staff" or other
3. Save
```

---

## 🎯 **That's It!**

Your accountant role is now active and ready to use!

**Time:** 5 minutes  
**Result:** Full financial access for accountants 💰

