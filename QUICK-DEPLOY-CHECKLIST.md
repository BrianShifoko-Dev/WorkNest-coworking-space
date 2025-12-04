# ✅ Quick Deployment Checklist

## 🎯 **Before You Start**

- [ ] Domain `www.theworknest.co.ke` is pointed to HostPinnacle
- [ ] You have cPanel access
- [ ] You have Supabase database credentials
- [ ] You have Resend API key for emails
- [ ] Node.js support is enabled (✅ Confirmed!)

---

## 📋 **STEP-BY-STEP CHECKLIST**

### **STEP 1: Setup Node.js App in cPanel** (5 min)

- [ ] Go to cPanel → Software → **"Setup Node.js App"**
- [ ] Click **"Create Application"**
- [ ] Fill in:
  - [ ] Node.js Version: **18.x** (or 20.x)
  - [ ] Application Root: `/home/yourusername/worknest`
  - [ ] Application URL: **www.theworknest.co.ke**
  - [ ] Application Startup File: **server.js**
  - [ ] Application Mode: **Production**
- [ ] Click **"Create"**
- [ ] **Note the Application Root path** (you'll need it!)

---

### **STEP 2: Add Environment Variables** (5 min)

- [ ] In Node.js App settings, find **"Environment Variables"**
- [ ] Add each variable from `.env.production.example`:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] `RESEND_API_KEY`
  - [ ] `ADMIN_EMAILS`
  - [ ] `NODE_ENV=production`
  - [ ] `PORT=3000` (or use auto-assigned port)
- [ ] Click **"Save"**

---

### **STEP 3: Build Application Locally** (5 min)

**On your computer, run:**

```bash
cd "C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space"
npm install
npm run build
```

- [ ] Verify build completed successfully
- [ ] Check `.next/` folder exists

---

### **STEP 4: Upload Files** (10-15 min)

**Upload these to Application Root directory:**

- [ ] `.next/` folder (entire folder)
- [ ] `public/` folder (entire folder)
- [ ] `node_modules/` folder (or install on server)
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `server.js` (the file we created)
- [ ] `next.config.js`
- [ ] `tsconfig.json`
- [ ] `tailwind.config.js`
- [ ] `app/` folder (entire folder)
- [ ] `components/` folder (entire folder)
- [ ] `lib/` folder (entire folder)

**Upload Methods:**
- [ ] Option A: cPanel File Manager (zip and extract)
- [ ] Option B: FTP/SFTP client
- [ ] Option C: Git clone on server

---

### **STEP 5: Install Dependencies on Server** (5 min)

**Via cPanel Terminal or SSH:**

```bash
cd /home/yourusername/worknest
npm install --production
```

- [ ] Verify `node_modules/` folder exists
- [ ] Check for any errors

---

### **STEP 6: Start Application** (2 min)

- [ ] Go back to **"Setup Node.js App"** in cPanel
- [ ] Find your application
- [ ] Click **"Restart"** or **"Start"**
- [ ] Status should show **"Running"** ✅
- [ ] Check logs for errors

---

### **STEP 7: Test Your Site** (5 min)

- [ ] Visit `https://www.theworknest.co.ke`
- [ ] Test homepage loads ✅
- [ ] Test booking form ✅
- [ ] Test admin panel login ✅
- [ ] Test API routes work ✅

---

## 🎉 **DEPLOYMENT COMPLETE!**

If all checkboxes are done and site works, you're live! 🚀

---

## 🆘 **If Something Goes Wrong**

1. **Check Node.js App Logs** in cPanel
2. **Verify environment variables** are set correctly
3. **Check file permissions** (should be 755 for folders, 644 for files)
4. **Verify domain DNS** points to HostPinnacle
5. **Test database connection** separately

---

**Ready? Let's start with STEP 1!** 🎯

