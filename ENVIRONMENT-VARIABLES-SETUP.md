# Environment Variables Setup for cPanel

## Database Configuration (MySQL - cPanel)

Set these environment variables in your cPanel Node.js App settings:

```bash
# MySQL Database (REQUIRED)
DB_HOST=localhost
DB_USER=theworkn_worknest_user
DB_PASSWORD=&wmV5jg9+VrP#MQ9
DB_NAME=theworkn_worknest_db
```

## Email Configuration (SMTP - cPanel)

```bash
# SMTP Email Settings (REQUIRED for booking confirmations)
SMTP_HOST=mail.theworknest.co.ke
SMTP_PORT=465
SMTP_USER=manager@theworknest.co.ke
SMTP_PASSWORD=your_smtp_password_here
SMTP_FROM=WorkNest <manager@theworknest.co.ke>

# Admin Email Notifications
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke
```

## How to Set Environment Variables in cPanel

1. **Go to cPanel → Node.js App**
2. **Select your app** (worknest)
3. **Click "Edit" or "Settings"**
4. **Find "Environment Variables" section**
5. **Add each variable** (one per line):
   - Key: `DB_HOST`, Value: `localhost`
   - Key: `DB_USER`, Value: `theworkn_worknest_user`
   - Key: `DB_PASSWORD`, Value: `&wmV5jg9+VrP#MQ9`
   - Key: `DB_NAME`, Value: `theworkn_worknest_db`
   - Key: `SMTP_HOST`, Value: `mail.theworknest.co.ke`
   - Key: `SMTP_PORT`, Value: `465`
   - Key: `SMTP_USER`, Value: `manager@theworknest.co.ke`
   - Key: `SMTP_PASSWORD`, Value: `[your email password]`
   - Key: `SMTP_FROM`, Value: `WorkNest <manager@theworknest.co.ke>`
   - Key: `ADMIN_EMAILS`, Value: `admin@worknest.co.ke,manager@worknest.co.ke`
6. **Click "Save"**
7. **Restart your Node.js app**

## Verification Checklist

After setting environment variables:

- [ ] Database connection works (check app logs)
- [ ] Bookings can be created
- [ ] Email notifications are sent
- [ ] Admin panel can access data

## Important Notes

1. **Database User**: `theworkn_worknest_user` has access to `theworkn_worknest_db`
2. **Password**: Contains special characters - ensure it's copied exactly
3. **SMTP Password**: You'll need to provide the email account password for `manager@theworknest.co.ke`
4. **No Supabase**: All database operations use MySQL only (no Supabase environment variables needed)

## Testing Database Connection

After setting variables, test the connection by:
1. Creating a test booking
2. Checking the admin panel for data
3. Viewing application logs for any connection errors

---

**Last Updated**: Based on cPanel database setup
**Database**: `theworkn_worknest_db` (1.51 MB)
**Privileged Users**: `theworkn_worknest_user`, `theworkn_brian`

