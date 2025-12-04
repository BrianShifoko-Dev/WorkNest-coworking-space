# 🚀 WorkNest Quick Reference Card

## 📞 **Contact Information**

**Business Name:** The WorkNest
**Domain:** https://theworknest.co.ke
**Location:** Elgon View Mall, Kisumu Road Highway, Eldoret
**Phone:** +254 745 319 042

---

## 🔐 **Critical Credentials**

### Database (MySQL):
```
Host: localhost
User: worknest_user
Password: &wmV5jg9+VrP#MQ9
Database: worknest
```

### Email Accounts:
```
manager@theworknest.co.ke     → OEJQZfy_o3~C~,I*
info@theworknest.co.ke        → K@8[6c@vOs{&?*hK
reservations@theworknest.co.ke → q#Es)Nr.nb,Q+7N1
reception@theworknest.co.ke    → (MO1@)HjwZQdVUOA
```

### Default Admin Login:
```
URL: https://theworknest.co.ke/admin
Email: admin@theworknest.co.ke
Password: Admin@123
⚠️ CHANGE THIS IMMEDIATELY AFTER FIRST LOGIN
```

---

## 🕐 **Operating Hours**

| Day | Hours |
|-----|-------|
| Monday - Friday | 8:00 AM - 8:00 PM |
| Saturday | 9:00 AM - 5:00 PM |
| Sunday | Closed |

---

## 📧 **Email Routing**

| Purpose | Sender/Recipient |
|---------|------------------|
| Booking Confirmations → Customer | FROM: reservations@ |
| Admin Notifications | TO: info@ + manager@ |
| System Alerts | TO: manager@ |

---

## 🛠️ **Quick Commands**

### Local Development:
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
npm start            # Start production server
```

### Deployment:
```bash
npm run build        # Build first
# Upload files to: /home/username/worknest
# Restart Node.js app in cPanel
```

---

## 📂 **Key Files**

| File | Purpose |
|------|---------|
| `lib/db.ts` | MySQL database client |
| `lib/email-service.ts` | Email configuration |
| `lib/seo.ts` | SEO settings |
| `server.js` | Production server |
| `.env.production` | Production environment variables |
| `mysql-schema.sql` | Database schema |

---

## 🔗 **Important URLs**

| Page | URL |
|------|-----|
| Homepage | https://theworknest.co.ke |
| Admin Panel | https://theworknest.co.ke/admin |
| Booking Page | https://theworknest.co.ke/book |
| Contact | https://theworknest.co.ke/contact |

---

## 📊 **Database Tables (12 Total)**

```
users, spaces, customers, bookings, events, menu_items,
payments, email_logs, notifications, settings,
gallery_images, audit_logs
```

---

## 🚨 **Emergency Contacts**

- **Hosting Issues:** cPanel support
- **Domain Issues:** Domain registrar
- **Database Issues:** Check phpMyAdmin logs
- **Application Issues:** Check Node.js app logs in cPanel

---

## 📖 **Documentation**

1. **DEPLOYMENT-COMPLETE-GUIDE.md** - Full deployment instructions
2. **MIGRATION-SUMMARY.md** - Technical migration details
3. **README.md** - Project overview
4. **QUICK-REFERENCE.md** - This file

---

## ✅ **Post-Deployment Checklist**

- [ ] Database imported successfully
- [ ] Environment variables set in cPanel
- [ ] Node.js app running
- [ ] Admin login works
- [ ] Booking form works
- [ ] Emails being sent
- [ ] SSL certificate active
- [ ] Change default admin password
- [ ] Test all major features
- [ ] Submit sitemap to Google

---

**Version:** 2.0.0 - MySQL Production
**Last Updated:** December 3, 2025

---

*Keep this file secure - it contains sensitive credentials*
