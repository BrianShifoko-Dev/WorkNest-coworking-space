# 🔐 Login Troubleshooting Guide

## ✅ **Current Status:**
- Database connection: **WORKING** ✅
- Admin user exists: **YES** ✅  
- Password hash: **CORRECT** ✅ (`$2b$10$P42PXY6...`)
- Password verification: **SUCCESS** ✅

## 🚀 **Try Login Now (Server Restarted):**

### **Step 1: Wait 15 seconds** 
Server is restarting...

### **Step 2: Open Fresh Browser Tab**
- **IMPORTANT:** Open a NEW incognito/private window
- Or clear your browser cache (Ctrl+Shift+Delete)
- This ensures no old session data

### **Step 3: Go to Login Page**
```
http://localhost:3000/admin/login
```

### **Step 4: Enter Credentials**
```
Email:    admin@worknest.co.ke
Password: Admin@123
```
**(Case sensitive! Capital A in Admin)**

### **Step 5: Open Browser Console**
- Press **F12** on keyboard
- Click **"Console"** tab
- Keep it open to see any errors

### **Step 6: Click "Sign In"**
Watch the console for messages

---

## 🔍 **What You Should See:**

### **In Console:**
```
Attempting login with: admin@worknest.co.ke
Login result: { ok: true, status: 200, ... }
```

### **Then:**
- ✅ Toast notification: "Login successful!"
- ✅ Page redirects to: `/admin/dashboard`
- ✅ You see the beautiful dashboard!

---

## 🐛 **If Still Getting Error:**

### **Check Console Messages:**

**1. If you see: "Invalid API key"**
- Check `.env.local` exists in project root
- Verify Supabase keys are correct

**2. If you see: "Network error"**
- Check dev server is running (look at terminal)
- Visit http://localhost:3001 - should show error or redirect

**3. If you see: "Invalid credentials"**
- Password is case-sensitive: `Admin@123`
- Email has no spaces: `admin@worknest.co.ke`

**4. If page keeps redirecting to error:**
- Clear browser cache completely
- Try different browser
- Use incognito mode

---

## 🔧 **Emergency Fix:**

If nothing works, run these commands:

```bash
# 1. Stop dev server
# Press Ctrl+C in terminal

# 2. Clear Next.js cache
rm -rf .next

# 3. Restart server
npm run dev

# 4. Wait 20 seconds

# 5. Try login in INCOGNITO window
```

---

## ✅ **Verification Checklist:**

- [ ] Dev server is running (check terminal)
- [ ] Using incognito/private browser window
- [ ] Going to: http://localhost:3000/admin/login
- [ ] Email: admin@worknest.co.ke (no spaces)
- [ ] Password: Admin@123 (capital A)
- [ ] Browser console open (F12)
- [ ] Watching for console messages

---

## 📞 **What to Tell Me:**

If still not working, tell me:
1. What URL you see in browser
2. What error message in console (F12)
3. What you see in terminal
4. Screenshot if possible

---

**Try logging in now with INCOGNITO window!** 🚀

