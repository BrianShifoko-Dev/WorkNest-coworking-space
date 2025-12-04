# cPanel Node.js App Settings - Quick Reference

## Exact Settings to Enter

### Application Configuration

```
Application Root: /home1/theworkn/worknest
Application URL: / (or leave default)
Application Startup File: server.js
Application Mode: Production
Node.js Version: 18.x (or latest available)
```

### Environment Variables (Add These)

Copy and paste these EXACTLY into the Environment Variables section:

```
NODE_ENV=production
DB_HOST=localhost
DB_USER=theworkn_worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=theworkn_worknest_db
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=manager@theworknest.co.ke
SMTP_PASSWORD=[YOUR_EMAIL_PASSWORD_HERE]
SMTP_FROM=WorkNest <manager@theworknest.co.ke>
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke
```

**⚠️ IMPORTANT:** Replace `[YOUR_EMAIL_PASSWORD_HERE]` with your actual email password!

---

## Step-by-Step: Node.js App Setup

### 1. Open Node.js App Manager
- Login to cPanel
- Find "Node.js App" or "Node.js Selector"
- Click to open

### 2. Create New Application
- Click "Create Application" or "Add Application"
- Fill in the settings above
- Click "Create" or "Save"

### 3. Add Environment Variables
- After creating app, click "Edit" or app name
- Find "Environment Variables" section
- Add each variable one by one, OR
- If there's a bulk import option, paste all at once

### 4. Install Dependencies
- In Node.js App Manager, find your app
- Click "Run NPM Install" button
- Wait for completion (5-10 minutes)
- OR use Terminal:
  ```bash
  cd /home1/theworkn/worknest
  npm install --production
  ```

### 5. Start Application
- Click "Start App" or "Restart App"
- Wait for status to show "Running" (green)
- Check logs if there are errors

---

## Verification Checklist

After setup, verify:

- [ ] Application status shows "Running"
- [ ] No errors in application logs
- [ ] Website loads at your domain
- [ ] Database connection works (check admin panel)
- [ ] Email sending works (test contact form)

---

## Common Issues & Solutions

### Issue: "Cannot find module 'next'"
**Solution:** Run `npm install --production` in Terminal

### Issue: "Port already in use"
**Solution:** Change PORT in environment variables to a different number

### Issue: "503 Service Unavailable"
**Solution:** 
1. Check app is "Running"
2. Verify `.next` folder exists
3. Check `stderr.log` for errors
4. Restart application

### Issue: "Database connection failed"
**Solution:**
1. Verify environment variables are set correctly
2. Check database credentials
3. Ensure `.env.local` file exists

---

## File Permissions

After upload, set these permissions:

```bash
# Folders
chmod 755 .next public app components lib styles

# Files
chmod 644 server.js package.json package-lock.json

# Environment file (more secure)
chmod 600 .env.local
```

---

## Quick Commands (Terminal)

```bash
# Navigate to app directory
cd /home1/theworkn/worknest

# Check if files exist
ls -la

# Check .next folder
ls -la .next

# Install dependencies
npm install --production

# Check node_modules
ls -la node_modules | head -20

# View logs (if available)
tail -f stderr.log
```

---

**Remember:** Always build locally first, then upload the `.next` folder!

