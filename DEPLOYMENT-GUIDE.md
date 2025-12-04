# 🚀 WorkNest Deployment Guide - HostPinnacle

## 📋 **Prerequisites**

✅ Node.js support enabled in cPanel  
✅ Domain: `www.theworknest.co.ke`  
✅ Database credentials ready (Supabase or MySQL)  
✅ Email SMTP settings ready  

---

## 🎯 **STEP 1: Setup Node.js App in cPanel**

### **1.1 Access Node.js Setup**
1. Login to cPanel
2. Go to **Software** section
3. Click **"Setup Node.js App"**

### **1.2 Create New Application**
Click **"Create Application"** button

### **1.3 Configure Application Settings**

Fill in these values:

```
Node.js Version: 18.x (or 20.x if available)
Application Root: /home/yourusername/worknest
Application URL: www.theworknest.co.ke
Application Startup File: server.js
Application Mode: Production
```

**Important Notes:**
- **Application Root**: This is where your files will be uploaded
- **Application URL**: Your domain (www.theworknest.co.ke)
- **Startup File**: We'll create `server.js` (Next.js production server)

### **1.4 Save Configuration**
Click **"Create"** and note the:
- ✅ Application path
- ✅ Port number (usually 3000 or auto-assigned)
- ✅ Environment variables section

---

## 📦 **STEP 2: Prepare Your Project**

### **2.1 Build the Application Locally**

Run these commands in your project directory:

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

This creates:
- `.next/` folder (production build)
- `node_modules/` (dependencies)
- `package.json` (dependencies list)

### **2.2 Create Production Server File**

We need to create `server.js` for Node.js to start the app.

---

## 🔐 **STEP 3: Environment Variables**

### **3.1 Required Environment Variables**

In cPanel Node.js App settings, add these environment variables:

```bash
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Email Service (Resend)
RESEND_API_KEY=re_your_key_here
ADMIN_EMAILS=manager@theworknest.co.ke,reception@theworknest.co.ke

# M-Pesa (Optional - for payments)
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://www.theworknest.co.ke/api/payments/callback

# Next.js
NODE_ENV=production
PORT=3000
```

### **3.2 How to Add in cPanel**
1. In Node.js App settings
2. Find **"Environment Variables"** section
3. Click **"Add Variable"**
4. Add each variable one by one
5. Click **"Save"**

---

## 📤 **STEP 4: Upload Files**

### **4.1 Files to Upload**

Upload these folders/files to your **Application Root** directory:

```
worknest/
├── .next/              (production build)
├── public/             (images, assets)
├── node_modules/       (dependencies - or install on server)
├── package.json
├── package-lock.json
├── next.config.js
├── server.js           (we'll create this)
├── tsconfig.json
└── tailwind.config.js
```

### **4.2 Upload Methods**

**Option A: cPanel File Manager**
1. Go to **File Manager** in cPanel
2. Navigate to your Application Root
3. Upload files (zip and extract, or upload individually)

**Option B: FTP/SFTP**
- Use FileZilla or similar
- Connect to your hosting
- Upload to Application Root directory

**Option C: Git (Recommended)**
- Clone your repo on the server
- Run `npm install` and `npm run build`

---

## ⚙️ **STEP 5: Install Dependencies on Server**

### **5.1 SSH Access (if available)**

```bash
cd /home/yourusername/worknest
npm install --production
```

### **5.2 Or via cPanel Terminal**

1. Go to **Terminal** in cPanel
2. Navigate to your app directory
3. Run `npm install --production`

---

## 🚀 **STEP 6: Start the Application**

### **6.1 In Node.js App Settings**

1. Go back to **"Setup Node.js App"**
2. Find your application
3. Click **"Restart"** or **"Start"**

### **6.2 Verify It's Running**

- Status should show **"Running"** ✅
- Check logs for any errors

---

## 🧪 **STEP 7: Test Your Site**

1. Visit `https://www.theworknest.co.ke`
2. Test key pages:
   - Homepage ✅
   - Booking form ✅
   - Admin panel ✅
   - API routes ✅

---

## 🔧 **Troubleshooting**

### **Error: "Cannot find module"**
- Run `npm install` in the app directory
- Check `node_modules/` exists

### **Error: "Port already in use"**
- Change PORT in environment variables
- Or stop other Node.js apps

### **Error: "Database connection failed"**
- Check Supabase credentials
- Verify environment variables are set correctly

### **Site shows "404 Not Found"**
- Check Application URL matches your domain
- Verify domain DNS points to HostPinnacle

### **Build fails**
- Check Node.js version (use 18.x or 20.x)
- Verify all dependencies in `package.json`

---

## 📝 **Next Steps After Deployment**

1. ✅ Test booking system
2. ✅ Test email notifications
3. ✅ Configure SSL certificate (if not auto)
4. ✅ Setup domain DNS (if not done)
5. ✅ Test admin panel
6. ✅ Test payment integration (if enabled)

---

## 🆘 **Need Help?**

If you encounter issues:
1. Check cPanel error logs
2. Check Node.js app logs
3. Verify environment variables
4. Test database connection separately

---

**Ready to deploy? Let's continue!** 🚀

