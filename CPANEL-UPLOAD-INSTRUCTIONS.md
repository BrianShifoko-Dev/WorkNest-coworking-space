# 📦 cPanel Upload Instructions - WorkNest

## ✅ BUILD COMPLETED SUCCESSFULLY!

Your WorkNest project has been built and is ready for deployment to cPanel.

---

## 📂 FOLDERS/FILES TO UPLOAD TO CPANEL

Upload these to your cPanel application root (e.g., `/home/username/worknest`):

### **REQUIRED FOLDERS** (Must Upload):
```
✅ .next/                     ← Production build (CRITICAL!)
✅ app/                       ← Application pages & API routes
✅ components/                ← React components
✅ lib/                       ← Database & utilities (includes lib/db.ts)
✅ public/                    ← Images, logos, assets
✅ styles/                    ← CSS files
✅ node_modules/              ← Dependencies (Option A: Upload | Option B: Install on server)
```

### **REQUIRED FILES** (Must Upload):
```
✅ server.js                  ← Production server (CRITICAL!)
✅ package.json               ← Dependencies list
✅ package-lock.json          ← Lock file
✅ next.config.js             ← Next.js configuration
✅ tsconfig.json              ← TypeScript config
✅ tailwind.config.ts         ← Tailwind config
✅ postcss.config.js          ← PostCSS config
✅ mysql-schema.sql           ← Database schema (for phpMyAdmin import)
```

### **OPTIONAL FILES** (Nice to Have):
```
📄 .env.production            ← Environment template (don't upload with real passwords!)
📄 DEPLOYMENT-COMPLETE-GUIDE.md  ← Deployment instructions
📄 QUICK-REFERENCE.md         ← Quick credentials reference
```

### **DO NOT UPLOAD**:
```
❌ .env.local                 ← Contains local dev credentials
❌ .git/                      ← Git repository
❌ .next.zip                  ← Unnecessary
❌ *.zip files                ← Unnecessary
❌ node_modules/ (if installing on server)
```

---

## 🚀 DEPLOYMENT STEPS

### **Step 1: Create ZIP for Upload**

Create a ZIP file containing ONLY the required folders/files listed above.

**Windows PowerShell:**
```powershell
# From project root
Compress-Archive -Path .next,app,components,lib,public,styles,server.js,package.json,package-lock.json,next.config.js,tsconfig.json,tailwind.config.ts,postcss.config.js,mysql-schema.sql -DestinationPath worknest-production.zip
```

**Or manually:**
1. Select the folders/files listed above
2. Right-click → "Send to" → "Compressed (zipped) folder"
3. Name it `worknest-production.zip`

---

### **Step 2: Upload to cPanel**

1. **Login to cPanel**
2. **Go to File Manager**
3. **Navigate to your application root** (e.g., `/home/username/worknest`)
4. **Upload the ZIP file**
5. **Extract the ZIP file**
6. **Delete the ZIP file** (to save space)

---

### **Step 3: Set Up Environment Variables in cPanel**

1. **Go to "Setup Node.js App"** in cPanel
2. **Find your application**
3. **Click "Edit"**
4. **Add these Environment Variables** (click "Add Variable" for each):

```bash
# DATABASE
DB_HOST=localhost
DB_USER=theworkn_worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=theworkn_worknest_db

# EMAIL
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=info@theworknest.co.ke
SMTP_PASSWORD=K@8[6c@vOs{&?*hK
SMTP_FROM=WorkNest <info@theworknest.co.ke>
ADMIN_EMAILS=manager@theworknest.co.ke,info@theworknest.co.ke

# SITE
NEXT_PUBLIC_SITE_URL=https://theworknest.co.ke
NODE_ENV=production

# AUTH
NEXTAUTH_URL=https://theworknest.co.ke
NEXTAUTH_SECRET=+2nv3zWNQ8NMeCIgRzoJMPE7FFFn/h34tcAh1SFZB7s=
```

5. **Click "Save"**

---

### **Step 4: Import Database Schema**

1. **Go to phpMyAdmin** in cPanel
2. **Select your `worknest` database**
3. **Click "Import" tab**
4. **Choose file**: Select `mysql-schema.sql` from uploaded files
5. **Click "Go"**

**Expected Result:**
- 12 tables created
- 1 default admin user created (admin@theworknest.co.ke / Admin@123)

---

### **Step 5: Install Dependencies (If Not Uploaded)**

If you didn't upload `node_modules/`:

1. **Go to Terminal** in cPanel (or SSH)
2. **Navigate to your app directory**:
   ```bash
   cd /home/username/worknest
   ```
3. **Install dependencies**:
   ```bash
   npm install --production
   ```
4. **Wait 3-5 minutes** for installation to complete

---

### **Step 6: Start the Application**

1. **Go to "Setup Node.js App"** in cPanel
2. **Find your application**
3. **Verify settings**:
   - ✅ Application Startup File: `server.js`
   - ✅ Application Mode: `Production`
   - ✅ Application URL: `theworknest.co.ke`
4. **Click "Restart"** or "Start"

**Expected Output:**
```
✅ WorkNest server ready!
🌐 Server running at: http://localhost:3000
```

---

### **Step 7: Verify Deployment**

1. **Visit your site**: https://theworknest.co.ke
2. **Check homepage loads** ✅
3. **Test admin login**: https://theworknest.co.ke/admin
   - Email: `admin@theworknest.co.ke`
   - Password: `Admin@123`
4. **Verify database connection** - Dashboard statistics should load
5. **Test booking form** - Create a test booking
6. **Check email** - Verify booking confirmation emails are sent

---

## ✅ SUCCESS INDICATORS

Your deployment is successful when:

- ✅ Website loads at https://theworknest.co.ke
- ✅ SSL certificate shows green padlock
- ✅ Admin panel accessible and functional
- ✅ Dashboard statistics load (proves database connection)
- ✅ Bookings can be created
- ✅ Emails are sent and received
- ✅ All pages load without errors
- ✅ No console errors in browser developer tools

---

## 🔍 VERIFICATION CHECKLIST

```
☐ Homepage loads
☐ All navigation links work
☐ Admin login successful
☐ Dashboard shows statistics
☐ Can view/create bookings
☐ Can view customers
☐ Can view spaces
☐ Booking confirmation emails sent
☐ Admin notification emails sent
☐ SSL certificate active
☐ Mobile version works
☐ All images load correctly
```

---

## ⚠️ COMMON ISSUES & SOLUTIONS

### **Issue: "Module not found" error**
**Solution:** Run `npm install` in the app directory

### **Issue: "Database connection failed"**
**Solution:**
- Verify environment variables in cPanel
- Check database credentials in phpMyAdmin
- Ensure database user has ALL PRIVILEGES

### **Issue: "Emails not sending"**
**Solution:**
- Verify SMTP credentials
- Check email account exists in cPanel
- Test SMTP connection: `telnet mail.theworknest.co.ke 465`

### **Issue: "Site shows 404"**
**Solution:**
- Verify Application URL in Node.js App settings
- Check domain DNS points to server
- Restart Node.js application

---

## 📞 NEED HELP?

Refer to:
- [DEPLOYMENT-COMPLETE-GUIDE.md](DEPLOYMENT-COMPLETE-GUIDE.md) - Full deployment guide
- [QUICK-REFERENCE.md](QUICK-REFERENCE.md) - Quick credentials reference
- [MIGRATION-SUMMARY.md](MIGRATION-SUMMARY.md) - Technical details

---

## 🎉 YOU'RE READY!

**Your WorkNest platform is:**
- ✅ Built and optimized
- ✅ Ready for production
- ✅ MySQL database configured
- ✅ Email system set up
- ✅ SEO optimized

**Follow the steps above to deploy!**

---

**Last Updated:** December 3, 2025
**Project:** WorkNest Coworking Space v2.0.0
**Database:** MySQL (cPanel)
