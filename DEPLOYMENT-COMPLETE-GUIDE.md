# 🚀 WorkNest Complete Deployment Guide - cPanel + MySQL

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [cPanel Configuration](#cpanel-configuration)
4. [Project Build & Upload](#project-build--upload)
5. [Email Setup](#email-setup)
6. [Domain & SSL](#domain--ssl)
7. [Testing & Verification](#testing--verification)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Prerequisites

### What You Need:
- ✅ cPanel access with Node.js support
- ✅ Domain: **theworknest.co.ke** (already configured)
- ✅ MySQL database access
- ✅ Email accounts created in cPanel
- ✅ FTP/SSH access (optional, but helpful)
- ✅ This project code

---

## 💾 Database Setup

### Step 1: Create MySQL Database in cPanel

1. **Login to cPanel**
2. Navigate to **"MySQL® Databases"**
3. Create a new database:
   - Database Name: `worknest`
   - Click **"Create Database"**

### Step 2: Create MySQL User

1. In the same MySQL Databases section
2. Under **"Add New User"**:
   - Username: `worknest_user`
   - Password: `&wmV5jg9+VrP#MQ9`
   - Click **"Create User"**

### Step 3: Grant Privileges

1. Under **"Add User to Database"**:
   - Select User: `worknest_user`
   - Select Database: `worknest`
   - Click **"Add"**
2. On the privileges page, select **"ALL PRIVILEGES"**
3. Click **"Make Changes"**

### Step 4: Import Database Schema

1. Navigate to **phpMyAdmin** in cPanel
2. Select the `worknest` database
3. Click the **"Import"** tab
4. Click **"Choose File"** and select `mysql-schema.sql` from this project
5. Click **"Go"** to import

**Expected Result:**
- 12 tables created (users, spaces, customers, bookings, etc.)
- 1 default admin user created
- All indexes and relationships established

### Step 5: Verify Database

Run this test query in phpMyAdmin:
```sql
SELECT COUNT(*) FROM users WHERE role = 'manager';
```
Should return: `1` (the default admin user)

---

## ⚙️ cPanel Configuration

### Step 1: Setup Node.js Application

1. In cPanel, navigate to **"Software"** section
2. Click **"Setup Node.js App"**
3. Click **"Create Application"**

### Step 2: Configure Application Settings

Fill in the following:

| Field | Value |
|-------|-------|
| Node.js Version | **18.x** (or 20.x if available) |
| Application Mode | **Production** |
| Application Root | `/home/yourusername/worknest` |
| Application URL | `theworknest.co.ke` |
| Application Startup File | `server.js` |

**Notes:**
- Replace `yourusername` with your actual cPanel username
- The Application Root is where you'll upload files
- Port will be auto-assigned by cPanel

### Step 3: Add Environment Variables

In the Node.js App settings, click **"Add Variable"** for each:

```bash
# Database Configuration
DB_HOST=localhost
DB_USER=worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=worknest

# Email Configuration
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=info@theworknest.co.ke
SMTP_PASSWORD=K@8[6c@vOs{&?*hK
SMTP_FROM=WorkNest <info@theworknest.co.ke>

# Admin Emails
ADMIN_EMAILS=manager@theworknest.co.ke,info@theworknest.co.ke

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://theworknest.co.ke
NODE_ENV=production

# NextAuth
NEXTAUTH_URL=https://theworknest.co.ke
NEXTAUTH_SECRET=+2nv3zWNQ8NMeCIgRzoJMPE7FFFn/h34tcAh1SFZB7s=
```

**Important:** Add each variable one by one, then click **"Save"**

---

## 📦 Project Build & Upload

### Step 1: Build the Project Locally

On your local machine:

```bash
# Navigate to project directory
cd WorkNest-coworking-space

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

**What this does:**
- Creates an optimized `.next` folder
- Compiles TypeScript to JavaScript
- Optimizes images and assets
- Generates static pages

### Step 2: Prepare Files for Upload

You need to upload these folders/files:

```
worknest/
├── .next/                 ✅ (production build)
├── public/                ✅ (images, assets)
├── app/                   ✅ (application code)
├── components/            ✅ (React components)
├── lib/                   ✅ (utilities)
├── styles/                ✅ (CSS files)
├── node_modules/          ⚠️ (install on server OR upload)
├── package.json           ✅
├── package-lock.json      ✅
├── next.config.js         ✅
├── server.js              ✅
├── tsconfig.json          ✅
└── tailwind.config.ts     ✅
```

### Step 3: Upload Files

**Option A: Using cPanel File Manager**

1. Navigate to **"File Manager"** in cPanel
2. Go to your Application Root directory (e.g., `/home/yourusername/worknest`)
3. Upload files:
   - Create a ZIP of your project locally
   - Upload the ZIP file
   - Extract it in File Manager

**Option B: Using FTP/SFTP**

1. Connect using FileZilla or similar FTP client
2. Upload all files to Application Root directory

**Option C: Using Git (Recommended)**

```bash
# SSH into your server
ssh yourusername@theworknest.co.ke

# Navigate to application root
cd worknest

# Clone or pull from your Git repository
git clone https://your-repo-url.git .

# Or if already cloned:
git pull origin main
```

### Step 4: Install Dependencies on Server

**If you uploaded node_modules:**
- Skip this step

**If you didn't upload node_modules:**

1. Access **"Terminal"** in cPanel
2. Navigate to your app directory:
   ```bash
   cd worknest
   ```
3. Install production dependencies:
   ```bash
   npm install --production
   ```

**Expected Time:** 3-5 minutes

---

## 📧 Email Setup

### Emails Already Created:

| Email Address | Password | Purpose |
|---------------|----------|---------|
| manager@theworknest.co.ke | `OEJQZfy_o3~C~,I*` | Admin notifications |
| info@theworknest.co.ke | `K@8[6c@vOs{&?*hK` | General inquiries |
| reservations@theworknest.co.ke | `q#Es)Nr.nb,Q+7N1` | Booking confirmations |
| reception@theworknest.co.ke | `(MO1@)HjwZQdVUOA` | Front desk |

### Email Routing Logic:

**Customer Booking Confirmation:**
- Sent FROM: `reservations@theworknest.co.ke`
- Contains booking details, receipt number

**Admin Notifications:**
- Sent TO: `info@theworknest.co.ke` (primary)
- CC TO: `manager@theworknest.co.ke` (awareness)
- Contains new booking alerts

### Verify Email Settings in cPanel:

1. Navigate to **"Email Accounts"** in cPanel
2. Verify all 4 accounts exist
3. Click **"Connect Devices"** for SMTP settings
4. Confirm:
   - **Incoming Server:** `mail.theworknest.co.ke`
   - **IMAP Port:** 993
   - **Outgoing Server:** `mail.theworknest.co.ke`
   - **SMTP Port:** 465

### SPF Record (Prevent Spam):

Add this SPF record in your DNS settings:

```
Type: TXT
Name: @
Value: v=spf1 include:theworknest.co.ke ~all
```

---

## 🚀 Start the Application

### Step 1: Start Node.js App

1. Go back to **"Setup Node.js App"** in cPanel
2. Find your application in the list
3. Click **"Restart"** or **"Start"**

### Step 2: Check Status

- Status should show: **"Running"** ✅
- Note the assigned Port (usually 3000 or auto-assigned)

### Step 3: Check Logs

Click **"Show Log"** to see startup messages:

```
🚀 Starting WorkNest Server...
📍 Environment: Production
📍 Hostname: localhost
📍 Port: 3000
✅ WorkNest server ready!
🌐 Server running at: http://localhost:3000
```

**If you see errors:** See [Troubleshooting](#troubleshooting) section

---

## 🌐 Domain & SSL

### Verify Domain Points to Server

1. In cPanel, go to **"Zone Editor"** or **"DNS Zone Editor"**
2. Verify A record points to your server IP:
   ```
   Type: A
   Name: @
   Value: [Your Server IP]
   ```

3. Verify CNAME for www:
   ```
   Type: CNAME
   Name: www
   Value: theworknest.co.ke
   ```

### Enable SSL Certificate

1. Navigate to **"SSL/TLS Status"** in cPanel
2. Find `theworknest.co.ke` and `www.theworknest.co.ke`
3. Click **"Run AutoSSL"** if not already enabled
4. Wait 2-5 minutes for certificate to be issued

**Alternative:** Use Let's Encrypt in cPanel

---

## ✅ Testing & Verification

### Test 1: Homepage Loads

Visit: **https://theworknest.co.ke**

Expected: Homepage loads with hero section, featured spaces

### Test 2: Admin Login

1. Visit: **https://theworknest.co.ke/admin**
2. Login with default credentials:
   - Email: `admin@theworknest.co.ke`
   - Password: `Admin@123` (⚠️ Change this immediately!)

Expected: Admin dashboard loads with statistics

### Test 3: Database Connection

In admin dashboard:
- Check if statistics load (Today's Bookings, Total Revenue, etc.)
- Navigate to **Spaces** - should list any spaces
- Navigate to **Customers** - should be empty initially

**If data doesn't load:** Database connection issue (see Troubleshooting)

### Test 4: Booking Form

1. Visit: **https://theworknest.co.ke/book**
2. Fill out the booking form
3. Submit booking

Expected:
- Success message displayed
- Email sent to customer
- Email notification sent to admin
- Booking appears in admin panel

### Test 5: Email Delivery

Check these inboxes:
- Customer email (booking confirmation)
- `info@theworknest.co.ke` (admin notification)
- `manager@theworknest.co.ke` (admin notification)

**If emails not received:** See Email Troubleshooting below

---

## 🔧 Troubleshooting

### Error: "Cannot find module"

**Cause:** Missing dependencies

**Solution:**
```bash
cd worknest
npm install --production
```

### Error: "Port already in use"

**Cause:** Another app is using the port

**Solution:**
1. In cPanel Node.js App settings
2. Change PORT environment variable
3. Restart application

### Error: "Database connection failed"

**Possible Causes:**
1. Wrong database credentials
2. Database user doesn't have privileges
3. Database doesn't exist

**Solution:**
1. Verify environment variables in cPanel:
   - DB_HOST=localhost
   - DB_USER=worknest_user
   - DB_PASSWORD=&wmV5jg9+VrP#MQ9
   - DB_NAME=worknest

2. Test connection in phpMyAdmin:
   ```sql
   SELECT 1;
   ```

3. Grant all privileges again if needed

### Error: "SMTP connection failed"

**Possible Causes:**
1. Wrong email password
2. Email account doesn't exist
3. Firewall blocking port 465

**Solution:**
1. Verify email account exists in cPanel
2. Check SMTP_PASSWORD environment variable
3. Try port 587 (TLS) instead of 465 (SSL):
   ```
   SMTP_PORT=587
   ```

### Error: "Site shows 404 Not Found"

**Possible Causes:**
1. Application URL mismatch
2. Domain not pointing to server
3. .htaccess issue

**Solution:**
1. Verify Application URL in Node.js App matches domain
2. Check DNS propagation: https://dnschecker.org
3. Check .htaccess in public_html

### Build fails during npm run build

**Possible Causes:**
1. TypeScript errors
2. Missing environment variables
3. Node.js version mismatch

**Solution:**
```bash
# Check for TypeScript errors
npm run type-check

# Use correct Node.js version
nvm use 18

# Rebuild
rm -rf .next
npm run build
```

### Emails go to spam folder

**Solution:**
1. Add SPF record (see Email Setup)
2. Add DKIM record in cPanel:
   - Navigate to **"Email Deliverability"**
   - Click **"Manage"** for your domain
   - Enable DKIM
3. Add DMARC record:
   ```
   Type: TXT
   Name: _dmarc
   Value: v=DMARC1; p=none; rua=mailto:postmaster@theworknest.co.ke
   ```

---

## 📊 Post-Deployment Checklist

After successful deployment:

- [ ] Change default admin password
- [ ] Test all booking flows
- [ ] Verify email delivery
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Business Profile
- [ ] Configure Google Analytics
- [ ] Test mobile responsiveness
- [ ] Test payment integration (if enabled)
- [ ] Set up automated backups
- [ ] Document any custom configuration
- [ ] Train staff on admin panel

---

## 🔐 Security Recommendations

1. **Change Default Passwords:**
   - Admin user password
   - Database password (if using default)
   - Email passwords

2. **Enable Firewall:**
   - In cPanel, configure IP blocker
   - Block suspicious IPs

3. **Regular Backups:**
   - Enable automated backups in cPanel
   - Test restore procedure

4. **Monitor Logs:**
   - Regularly check Node.js app logs
   - Monitor email logs for suspicious activity

5. **Update Dependencies:**
   ```bash
   npm audit
   npm update
   ```

---

## 📞 Support Contacts

- **Hosting Support:** HostPinnacle cPanel support
- **Domain Support:** Your domain registrar
- **Email Issues:** cPanel email support
- **Application Issues:** Check logs in cPanel Node.js App

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Website loads at https://theworknest.co.ke
✅ Admin panel accessible at /admin
✅ Bookings can be created through frontend
✅ Booking confirmation emails are received
✅ Admin notifications are received
✅ Database is populated with booking data
✅ All pages load without errors
✅ Mobile version works correctly
✅ SSL certificate is active (green padlock)
✅ Site appears in Google Search (after indexing)

---

**Congratulations! WorkNest is now live! 🚀**

For ongoing maintenance and updates, refer to this guide and keep your Node.js application, database, and dependencies up to date.

---

*Last Updated: 2025-12-03*
*Project: WorkNest Coworking Space*
*Version: 2.0.0 - MySQL Production*
