# Complete cPanel Deployment Guide for WorkNest

## Prerequisites
- cPanel access with Node.js App support
- MySQL database already created
- FTP/File Manager access

---

## Step 1: Prepare Files for Upload

### Files and Folders to Upload:

1. **`.next/` folder** (Build output - REQUIRED)
2. **`public/` folder** (Static assets)
3. **`app/` folder** (Next.js app directory)
4. **`components/` folder** (React components)
5. **`lib/` folder** (Utility libraries)
6. **`styles/` folder** (CSS files)
7. **`server.js`** (Node.js server file)
8. **`package.json`** (Dependencies)
9. **`package-lock.json`** (Lock file)
10. **`.env.local`** (Environment variables - IMPORTANT!)

### Files to EXCLUDE:
- `node_modules/` (Will be installed on server)
- `.git/` folder
- `README.md` and other documentation
- `*.log` files
- `next.config.js` (if not needed)

---

## Step 2: Build the Application Locally

**IMPORTANT:** Build the app on your local machine first, then upload the `.next` folder.

```bash
# Navigate to project directory
cd "C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space"

# Install dependencies locally (if not already done)
npm install

# Build the application
npm run build

# Verify .next folder was created
# The .next folder should be large (several MB)
```

**After build completes:**
- Check that `.next` folder exists and has content
- Folder should contain: `BUILD_ID`, `static/`, `server/`, etc.

---

## Step 3: Create Environment Variables File

Create a file named `.env.local` in your project root with these exact variables:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=theworkn_worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=theworkn_worknest_db

# SMTP Email Configuration
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=manager@theworknest.co.ke
SMTP_PASSWORD=[YOUR_EMAIL_PASSWORD_HERE]
SMTP_FROM=WorkNest <manager@theworknest.co.ke>

# Admin Notifications
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke

# Exchange Rate API (for currency conversion)
EXCHANGE_RATE_API_KEY=[YOUR_API_KEY_IF_AVAILABLE]

# Node Environment
NODE_ENV=production
```

**IMPORTANT:** Replace `[YOUR_EMAIL_PASSWORD_HERE]` with your actual email password.

---

## Step 4: Upload Files to cPanel

### Option A: Using cPanel File Manager

1. **Login to cPanel**
2. **Open File Manager**
3. **Navigate to:** `/home1/theworkn/worknest` (or your app directory)
4. **Delete any existing files** (if redeploying)
5. **Upload files in this order:**

   **Method 1: Upload folders individually**
   - Click "Upload" button
   - Upload `.next` folder (as ZIP, then extract)
   - Upload `public` folder (as ZIP, then extract)
   - Upload `app` folder (as ZIP, then extract)
   - Upload `components` folder (as ZIP, then extract)
   - Upload `lib` folder (as ZIP, then extract)
   - Upload `styles` folder (as ZIP, then extract)
   - Upload individual files: `server.js`, `package.json`, `package-lock.json`, `.env.local`

   **Method 2: Upload as single ZIP (Recommended)**
   - Create a ZIP file containing all folders and files
   - Upload the ZIP file
   - Extract it in the target directory

6. **Set File Permissions:**
   - Folders: `755`
   - Files: `644`
   - `.env.local`: `600` (more secure)

### Option B: Using FTP Client

1. Connect via FTP (FileZilla, WinSCP, etc.)
2. Upload all files and folders to `/home1/theworkn/worknest`
3. Set permissions as above

---

## Step 5: Configure Node.js App in cPanel

### 5.1 Access Node.js App Manager

1. In cPanel, find **"Node.js App"** or **"Node.js Selector"**
2. Click to open

### 5.2 Create New Application (or Edit Existing)

**If creating new:**
1. Click **"Create Application"** or **"Add Application"**

**If editing existing:**
1. Find your app in the list
2. Click **"Edit"** or the app name

### 5.3 Application Settings

Fill in these **EXACT** settings:

```
Application Root: /home1/theworkn/worknest
Application URL: / (or /worknest if subdirectory)
Application Startup File: server.js
Application Mode: Production
Node.js Version: 18.x (or latest available)
```

### 5.4 Environment Variables

In the Node.js App settings, add these environment variables:

```
NODE_ENV=production
DB_HOST=localhost
DB_USER=theworkn_worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=theworkn_worknest_db
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=manager@theworknest.co.ke
SMTP_PASSWORD=[YOUR_EMAIL_PASSWORD]
SMTP_FROM=WorkNest <manager@theworknest.co.ke>
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke
```

**Note:** Some cPanel versions have a separate "Environment Variables" section. Add them there if available.

### 5.5 Save Application Settings

Click **"Save"** or **"Create"** to save the application.

---

## Step 6: Install Dependencies on Server

### Option A: Using cPanel Terminal

1. In cPanel, open **"Terminal"** (or **"SSH Access"**)
2. Run these commands:

```bash
# Navigate to app directory
cd /home1/theworkn/worknest

# Install production dependencies
npm install --production

# Wait for installation to complete (5-10 minutes)
```

### Option B: Using Node.js App Manager

1. In Node.js App Manager, find your app
2. Look for **"Run NPM Install"** button
3. Click it and wait for completion

### Option C: Using cPanel File Manager Terminal

1. Open File Manager
2. Navigate to your app directory
3. Right-click → **"Open Terminal Here"**
4. Run: `npm install --production`

---

## Step 7: Verify Installation

### Check Node Modules

```bash
cd /home1/theworkn/worknest
ls -la node_modules
```

Should see many folders (mysql2, next, react, etc.)

### Check .next Folder

```bash
ls -la .next
```

Should see BUILD_ID, static/, server/ folders

### Check File Permissions

```bash
# Folders should be 755
ls -ld .next public app components lib

# Files should be 644
ls -l server.js package.json
```

---

## Step 8: Start/Restart Application

### In Node.js App Manager:

1. Find your application
2. Click **"Restart App"** or **"Start App"**
3. Wait for status to show **"Running"**

### Verify App is Running:

1. Check application status (should be green/running)
2. View application logs (if available)
3. Check for any error messages

---

## Step 9: Test the Application

1. **Visit your domain:** `https://theworknest.co.ke` (or your domain)
2. **Check homepage loads**
3. **Test key pages:**
   - Homepage
   - Office Spaces
   - Boardrooms
   - Event Spaces
   - Contact page

4. **Check for errors:**
   - Open browser console (F12)
   - Look for any JavaScript errors
   - Check Network tab for failed requests

---

## Step 10: Troubleshooting

### If you see "503 Service Unavailable":

1. **Check Node.js App Status:**
   - Ensure app is "Running"
   - Restart the app

2. **Check Application Logs:**
   - In Node.js App Manager, click "View Logs"
   - Look for error messages in `stderr.log`

3. **Verify .next folder:**
   ```bash
   ls -la .next
   ```
   - Should exist and have content
   - If missing, rebuild locally and re-upload

4. **Verify node_modules:**
   ```bash
   ls -la node_modules
   ```
   - Should exist with many packages
   - If missing, run `npm install --production`

5. **Check server.js exists:**
   ```bash
   ls -l server.js
   ```
   - Should exist in root directory

### If you see "Cannot find module":

1. **Reinstall dependencies:**
   ```bash
   cd /home1/theworkn/worknest
   rm -rf node_modules
   npm install --production
   ```

2. **Restart application**

### If database connection fails:

1. **Verify .env.local file exists:**
   ```bash
   ls -l .env.local
   ```

2. **Check environment variables in Node.js App settings**

3. **Verify database credentials are correct**

### If build errors occur:

1. **Build locally first:**
   ```bash
   npm run build
   ```

2. **Upload the .next folder**

3. **Don't run `npm run build` on server** (may fail due to memory limits)

---

## Step 11: Final Checklist

Before going live, verify:

- [ ] All files uploaded to correct directory
- [ ] `.next` folder exists and has content
- [ ] `node_modules` folder exists
- [ ] `server.js` file exists in root
- [ ] `.env.local` file exists with correct values
- [ ] Environment variables set in Node.js App Manager
- [ ] Application status is "Running"
- [ ] Dependencies installed (`npm install --production` completed)
- [ ] File permissions correct (755 for folders, 644 for files)
- [ ] Application accessible via browser
- [ ] No errors in browser console
- [ ] Database connection working
- [ ] Email configuration correct

---

## Quick Reference: File Structure on Server

```
/home1/theworkn/worknest/
├── .next/              (Build output - REQUIRED)
├── public/             (Static files)
├── app/                (Next.js app directory)
├── components/         (React components)
├── lib/                (Utilities)
├── styles/             (CSS files)
├── node_modules/       (Installed on server)
├── server.js           (Node.js entry point)
├── package.json        (Dependencies)
├── package-lock.json   (Lock file)
└── .env.local          (Environment variables)
```

---

## Important Notes

1. **Always build locally** - Don't run `npm run build` on cPanel server
2. **Upload .next folder** - This is the compiled application
3. **Install dependencies on server** - Use `npm install --production`
4. **Set environment variables** - Both in `.env.local` and Node.js App Manager
5. **Check logs regularly** - Monitor `stderr.log` for errors
6. **Restart after changes** - Always restart app after configuration changes

---

## Support

If you encounter issues:
1. Check application logs in Node.js App Manager
2. Verify all files are uploaded correctly
3. Ensure environment variables are set
4. Confirm database credentials are correct
5. Check file permissions

---

**Last Updated:** December 2024

