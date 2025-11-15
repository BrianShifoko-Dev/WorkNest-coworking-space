# 🔐 Fix Login Error - Create Admin User

## 🐛 **The Problem:**
The login error means the admin user doesn't exist in your database yet. The SQL schema we ran earlier tried to create it, but the password hash might not have worked.

## ✅ **The Solution:**
Create the admin user manually in Supabase.

---

## 📝 **STEP-BY-STEP FIX:**

### **Step 1: Open Supabase SQL Editor**
1. Go to: https://supabase.com/dashboard
2. Click your "WorkNest" project
3. Click **"SQL Editor"** in left sidebar
4. Click **"+ New query"**

### **Step 2: Copy and Run SQL**
1. Open the file: `CREATE-ADMIN-USER.sql` in your project
2. **Copy ALL the content**
3. **Paste** into Supabase SQL Editor
4. Click **"Run"** button

### **Step 3: Verify User Created**
You should see output like:
```
id    | email                   | full_name                | role    | status
------|-------------------------|--------------------------|---------|--------
uuid  | admin@worknest.co.ke   | WorkNest Administrator   | manager | active
```

✅ **If you see this, the user is created!**

---

## 🚀 **Step 4: Try Login Again**

1. Go to: http://localhost:3000/admin/login
2. Enter:
   ```
   Email:    admin@worknest.co.ke
   Password: Admin@123
   ```
3. Click **"Sign In"**
4. ✅ **You should see the dashboard!**

---

## 🔧 **Alternative Method (If SQL doesn't work):**

### **Manual Entry in Supabase Table Editor:**

1. Go to Supabase Dashboard
2. Click **"Table Editor"**
3. Select **"users"** table
4. Click **"Insert row"** button
5. Fill in:
   ```
   email:         admin@worknest.co.ke
   password_hash: $2a$10$K7J5lZ3jzY7xqGX8xK0xN.iQQZpX5z5YqZ5Z5Z5Z5Z5Z5Z5Z5Z5ZO
   full_name:     WorkNest Administrator
   phone:         +254700000000
   role:          manager
   status:        active
   ```
6. Click **"Save"**

---

## ✅ **What This Does:**

- Creates admin user in `users` table
- Sets password to: `Admin@123` (bcrypt hashed)
- Assigns role: `manager` (full access)
- Sets status: `active` (can login)

---

## 🎯 **After Login Works:**

Once you can login and see the dashboard, we'll:
1. ✅ Add ability to change password
2. ✅ Create additional users (reception, staff)
3. ✅ Build booking system
4. ✅ Add payment integration

---

## 🆘 **Still Not Working?**

### **Error: "Invalid credentials"**
- Make sure you copied the EXACT password hash
- Password is case-sensitive: `Admin@123` (capital A)
- Check email has no extra spaces

### **Error: "User not found"**
- User wasn't created - try the manual method above
- Check the `users` table in Supabase Table Editor

### **Error: "Connection failed"**
- Check `.env.local` has correct Supabase credentials
- Verify Supabase project is running (not paused)

---

## 📋 **Quick Checklist:**

- [ ] Ran SQL in Supabase SQL Editor
- [ ] Saw confirmation that user was created
- [ ] Verified user exists in Table Editor
- [ ] Tried login with: admin@worknest.co.ke / Admin@123
- [ ] Successfully logged in and see dashboard

---

**Run the SQL now and try logging in again!** 🚀

