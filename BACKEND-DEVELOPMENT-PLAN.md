# 🚀 WorkNest Backend Development Plan

## 📋 **COMPLETE FEATURE LIST**

### **Your Requirements:**
1. ✅ Admin Dashboard (Modern, Elegant, Professional)
2. ✅ Event Management (Add/Edit/Delete from backend → Auto-update frontend)
3. ✅ Dynamic Pricing (Update prices from backend)
4. ✅ Booking System with Email Notifications
5. ✅ Time/Space Conflict Prevention (No double bookings)
6. ✅ Capacity Management (Auto-block when full)
7. ✅ Menu Management (Update from backend)
8. ✅ Gallery Management (Upload images from backend)
9. ✅ Multi-Role Authentication (Manager, Reception, Staff)
10. ✅ Role-Based Permissions (Different access levels)
11. ✅ Email Receipts (Unique receipt numbers)
12. ✅ Payment Integration (M-Pesa)
13. ✅ Reception Desk Booking (Book on behalf of customers)
14. ✅ Booking History & Reports

### **Additional Professional Features (Recommended):**
15. ✅ Real-time Availability Calendar
16. ✅ Customer Database & CRM
17. ✅ Automated Reminders (Before booking date)
18. ✅ Analytics Dashboard (Revenue, Bookings, Popular spaces)
19. ✅ Invoice Generation (PDF receipts)
20. ✅ Refund Management
21. ✅ Waitlist System (When space is full)
22. ✅ Member Management (Regular customers)
23. ✅ Payment History & Tracking
24. ✅ Audit Logs (Track all admin actions)
25. ✅ Email Templates Manager
26. ✅ Notification System (SMS + Email)
27. ✅ Booking Status Workflow (Pending → Confirmed → Completed → Cancelled)
28. ✅ Multi-location Support (Future expansion)

---

## 🏗️ **BACKEND ARCHITECTURE**

### **Tech Stack:**
```
Frontend:         Next.js 14 (Already done ✅)
Backend API:      Next.js API Routes (/app/api)
Database:         Supabase (PostgreSQL) - Recommended
                  OR MongoDB Atlas
Authentication:   NextAuth.js v5 (Auth.js)
File Storage:     Supabase Storage OR Cloudinary
Email Service:    Resend (Modern, reliable)
Payments:         M-Pesa Daraja API
Admin UI:         Tremor + Tailwind CSS (Beautiful dashboards)
PDF Generation:   React-PDF
Real-time:        Supabase Realtime OR Pusher
```

### **Why This Stack?**
- ✅ **Supabase:** Free tier, PostgreSQL, real-time, file storage, authentication
- ✅ **NextAuth.js:** Industry standard, secure, role-based access
- ✅ **Resend:** Modern email API, beautiful templates
- ✅ **Tremor:** Professional dashboard components
- ✅ **All-in-one:** No separate backend server needed!

---

## 📊 **DATABASE SCHEMA**

### **Core Tables:**

```sql
-- 1. USERS & AUTHENTICATION
users
├── id (uuid)
├── email (unique)
├── password_hash
├── full_name
├── phone
├── role (manager, reception, staff, customer)
├── status (active, inactive)
├── created_at
└── updated_at

-- 2. SPACES (Rooms, Boardrooms, etc.)
spaces
├── id (uuid)
├── name
├── type (office, boardroom, event_space, telephone_booth)
├── description
├── capacity
├── hourly_rate
├── daily_rate
├── weekly_rate
├── monthly_rate
├── images (json array)
├── amenities (json array)
├── status (available, maintenance, disabled)
├── created_at
└── updated_at

-- 3. BOOKINGS
bookings
├── id (uuid)
├── receipt_number (unique, auto-generated)
├── space_id (foreign key)
├── customer_id (foreign key to users)
├── booked_by (foreign key to users - for reception bookings)
├── booking_date
├── start_time
├── end_time
├── duration_hours
├── number_of_people
├── total_amount
├── payment_status (pending, partial, paid, refunded)
├── booking_status (pending, confirmed, in_progress, completed, cancelled)
├── payment_method (mpesa, cash, bank_transfer)
├── mpesa_code
├── special_requests (text)
├── created_at
└── updated_at

-- 4. EVENTS
events
├── id (uuid)
├── title
├── slug (unique)
├── description
├── event_date
├── start_time
├── end_time
├── location
├── capacity
├── price
├── image_url
├── category
├── status (upcoming, ongoing, completed, cancelled)
├── created_by (foreign key to users)
├── created_at
└── updated_at

-- 5. EVENT REGISTRATIONS
event_registrations
├── id (uuid)
├── event_id (foreign key)
├── customer_id (foreign key)
├── receipt_number (unique)
├── number_of_tickets
├── total_amount
├── payment_status
├── payment_method
├── mpesa_code
├── created_at
└── updated_at

-- 6. MENU ITEMS
menu_items
├── id (uuid)
├── name
├── description
├── category (breakfast, lunch, dinner, drinks, snacks)
├── price
├── image_url
├── available (boolean)
├── created_at
└── updated_at

-- 7. TABLE RESERVATIONS
table_reservations
├── id (uuid)
├── receipt_number (unique)
├── customer_name
├── customer_email
├── customer_phone
├── reservation_date
├── reservation_time
├── number_of_guests
├── special_requests
├── status (pending, confirmed, seated, completed, cancelled)
├── created_at
└── updated_at

-- 8. GALLERY
gallery_images
├── id (uuid)
├── title
├── description
├── image_url
├── category (spaces, events, team, facilities)
├── order (for sorting)
├── uploaded_by (foreign key to users)
├── created_at
└── updated_at

-- 9. PRICING PLANS
pricing_plans
├── id (uuid)
├── plan_name
├── space_type
├── duration (hourly, daily, weekly, monthly)
├── price
├── features (json array)
├── is_active (boolean)
├── created_at
└── updated_at

-- 10. PAYMENTS
payments
├── id (uuid)
├── booking_id (foreign key)
├── receipt_number (unique)
├── amount
├── payment_method
├── mpesa_code
├── phone_number
├── status (pending, success, failed, refunded)
├── transaction_date
├── created_at
└── updated_at

-- 11. EMAIL LOGS
email_logs
├── id (uuid)
├── recipient_email
├── email_type (booking_confirmation, payment_receipt, reminder, etc.)
├── subject
├── sent_at
├── status (sent, failed, bounced)
├── booking_id (nullable)
└── created_at

-- 12. AUDIT LOGS
audit_logs
├── id (uuid)
├── user_id (foreign key)
├── action (create, update, delete, login, etc.)
├── table_name
├── record_id
├── old_values (json)
├── new_values (json)
├── ip_address
└── created_at

-- 13. CUSTOMERS
customers
├── id (uuid)
├── full_name
├── email
├── phone
├── company (nullable)
├── total_bookings
├── total_spent
├── member_since
├── notes (text)
└── updated_at

-- 14. WAITLIST
waitlist
├── id (uuid)
├── space_id (foreign key)
├── customer_email
├── customer_phone
├── preferred_date
├── preferred_time
├── status (waiting, notified, converted, expired)
├── created_at
└── updated_at
```

---

## 🎯 **DEVELOPMENT PHASES**

### **PHASE 1: Foundation (Week 1-2)**
**Priority: CRITICAL**

#### **1.1 Database Setup**
- [ ] Set up Supabase project
- [ ] Create all database tables
- [ ] Set up relationships and foreign keys
- [ ] Create database indexes for performance
- [ ] Set up Row Level Security (RLS) policies

#### **1.2 Authentication System**
- [ ] Install NextAuth.js
- [ ] Configure authentication providers
- [ ] Create login page
- [ ] Create role-based middleware
- [ ] Set up session management
- [ ] Create protected API routes

#### **1.3 User Management**
- [ ] Create user registration (admin only)
- [ ] Implement role assignment (Manager, Reception, Staff)
- [ ] Build user list/edit interface
- [ ] Password reset functionality

**Deliverable:** Working authentication with role-based access

---

### **PHASE 2: Admin Dashboard (Week 2-3)**
**Priority: HIGH**

#### **2.1 Dashboard Layout**
- [ ] Create admin layout component
- [ ] Build sidebar navigation
- [ ] Create dashboard header with user menu
- [ ] Implement mobile-responsive sidebar
- [ ] Add breadcrumbs navigation

#### **2.2 Dashboard Homepage**
- [ ] Today's bookings widget
- [ ] Revenue statistics (today, week, month)
- [ ] Upcoming events widget
- [ ] Recent activities feed
- [ ] Quick actions panel
- [ ] Charts (bookings trend, revenue trend)

#### **2.3 Design System**
- [ ] Set up Tremor components
- [ ] Create consistent color scheme (gold/brown theme)
- [ ] Design reusable admin components
- [ ] Create form components
- [ ] Build table components

**Deliverable:** Beautiful, functional admin dashboard

---

### **PHASE 3: Booking System (Week 3-4)**
**Priority: CRITICAL**

#### **3.1 Space Management**
- [ ] Create API: List all spaces
- [ ] Create API: Add/Edit/Delete spaces
- [ ] Build admin interface for space management
- [ ] Upload space images
- [ ] Set pricing for each space

#### **3.2 Availability System**
- [ ] Create real-time availability checker API
- [ ] Build calendar view (show all bookings)
- [ ] Implement time slot validation
- [ ] Check capacity before booking
- [ ] Block conflicting time slots

#### **3.3 Booking Creation (Frontend)**
- [ ] Connect booking form to API
- [ ] Real-time availability check as user selects date/time
- [ ] Show available spaces only
- [ ] Calculate total price dynamically

#### **3.4 Booking Creation (Reception)**
- [ ] Create reception booking interface
- [ ] Quick customer search/add
- [ ] Book on behalf of customers
- [ ] Generate unique receipt number
- [ ] Print/email receipt

#### **3.5 Booking Management (Admin)**
- [ ] View all bookings (list + calendar view)
- [ ] Filter by date, space, status
- [ ] Edit booking details
- [ ] Cancel bookings (with refund option)
- [ ] Mark booking as completed
- [ ] View booking history

**Deliverable:** Complete booking system with conflict prevention

---

### **PHASE 4: Payment Integration (Week 4-5)**
**Priority: HIGH**

#### **4.1 M-Pesa Integration**
- [ ] Set up M-Pesa Daraja API credentials
- [ ] Create STK Push API endpoint
- [ ] Create payment callback handler
- [ ] Update booking payment status
- [ ] Handle payment failures

#### **4.2 Receipt Generation**
- [ ] Design receipt template (PDF)
- [ ] Generate unique receipt numbers (format: WN-2025-00001)
- [ ] Create receipt API endpoint
- [ ] Download receipt as PDF
- [ ] Email receipt automatically

#### **4.3 Payment Tracking**
- [ ] View all payments (admin)
- [ ] Filter by date, method, status
- [ ] Export payment reports
- [ ] Refund management interface
- [ ] Payment analytics

**Deliverable:** Working payment system with receipts

---

### **PHASE 5: Email System (Week 5)**
**Priority: HIGH**

#### **5.1 Email Service Setup**
- [ ] Set up Resend API
- [ ] Create email templates (React Email)
  - Booking confirmation
  - Payment receipt
  - Booking reminder (24 hours before)
  - Cancellation notice
  - Welcome email
  - Password reset

#### **5.2 Email Automation**
- [ ] Send confirmation on booking
- [ ] Send receipt on payment
- [ ] Send reminder 24h before booking
- [ ] Send follow-up after booking
- [ ] Log all emails sent

#### **5.3 Email Management (Admin)**
- [ ] View email logs
- [ ] Resend failed emails
- [ ] Preview email templates
- [ ] Edit email templates

**Deliverable:** Automated email system with beautiful templates

---

### **PHASE 6: Events Management (Week 6)**
**Priority: MEDIUM**

#### **6.1 Event Creation**
- [ ] Create API: Add/Edit/Delete events
- [ ] Build admin interface for events
- [ ] Upload event images
- [ ] Set event capacity and pricing
- [ ] Auto-publish to frontend

#### **6.2 Event Registrations**
- [ ] Connect event registration form to API
- [ ] Check availability (capacity)
- [ ] Generate registration receipt
- [ ] Send confirmation email
- [ ] Payment integration for events

#### **6.3 Event Management**
- [ ] View all registrations
- [ ] Export attendee list
- [ ] Check-in system (QR codes?)
- [ ] Event analytics

**Deliverable:** Complete event management system

---

### **PHASE 7: Content Management (Week 7)**
**Priority: MEDIUM**

#### **7.1 Menu Management**
- [ ] Create API: Add/Edit/Delete menu items
- [ ] Build admin interface
- [ ] Upload menu item images
- [ ] Update prices
- [ ] Mark items as available/unavailable
- [ ] Auto-update frontend menu page

#### **7.2 Gallery Management**
- [ ] Create API: Upload/Delete gallery images
- [ ] Build admin interface
- [ ] Bulk upload images
- [ ] Organize by category
- [ ] Set image order
- [ ] Auto-update frontend gallery

#### **7.3 Pricing Management**
- [ ] Create API: Update pricing plans
- [ ] Build admin interface
- [ ] Update space prices
- [ ] Create special offers/discounts
- [ ] Auto-update frontend pricing page

**Deliverable:** Complete CMS for dynamic content

---

### **PHASE 8: Customer Management (Week 8)**
**Priority: MEDIUM**

#### **8.1 Customer Database**
- [ ] Auto-create customer records on booking
- [ ] Customer profile view
- [ ] View customer booking history
- [ ] View customer payment history
- [ ] Add notes to customers
- [ ] Track total spent

#### **8.2 Customer Portal (Optional)**
- [ ] Customer login
- [ ] View my bookings
- [ ] View my receipts
- [ ] Cancel bookings
- [ ] Update profile

**Deliverable:** Customer relationship management

---

### **PHASE 9: Reporting & Analytics (Week 9)**
**Priority: LOW**

#### **9.1 Reports**
- [ ] Daily booking report
- [ ] Revenue report (daily, weekly, monthly)
- [ ] Popular spaces report
- [ ] Customer report
- [ ] Payment report
- [ ] Export to Excel/PDF

#### **9.2 Analytics Dashboard**
- [ ] Revenue charts
- [ ] Booking trends
- [ ] Occupancy rates
- [ ] Customer acquisition
- [ ] Peak hours/days analysis

**Deliverable:** Business intelligence dashboard

---

### **PHASE 10: Advanced Features (Week 10+)**
**Priority: OPTIONAL**

#### **10.1 Notifications**
- [ ] SMS notifications (Africa's Talking)
- [ ] WhatsApp notifications
- [ ] Push notifications
- [ ] In-app notifications

#### **10.2 Waitlist System**
- [ ] Add to waitlist when full
- [ ] Auto-notify when slot available
- [ ] Convert waitlist to booking

#### **10.3 Member Packages**
- [ ] Monthly membership plans
- [ ] Member discounts
- [ ] Loyalty points

#### **10.4 Multi-location**
- [ ] Support multiple branches
- [ ] Location-specific pricing
- [ ] Transfer bookings between locations

---

## 👥 **ROLE-BASED PERMISSIONS**

### **Manager (Full Access)**
✅ View everything
✅ Manage users
✅ Manage spaces and pricing
✅ View all bookings and payments
✅ Access all reports
✅ Manage events
✅ Manage menu and gallery
✅ System settings

### **Reception (Limited Access)**
✅ View today's bookings
✅ Create bookings (walk-in customers)
✅ Process payments
✅ Generate receipts
✅ View customer information
✅ Check availability
✅ Cancel bookings (with manager approval)
❌ Cannot change prices
❌ Cannot manage users
❌ Cannot access full reports

### **Staff (View Only)**
✅ View today's schedule
✅ Check room availability
✅ View customer information
❌ Cannot create bookings
❌ Cannot process payments
❌ Cannot access admin settings

---

## 📱 **API ENDPOINTS**

### **Authentication**
```
POST   /api/auth/signin           - Login
POST   /api/auth/signout          - Logout
POST   /api/auth/register         - Register user (admin only)
POST   /api/auth/reset-password   - Reset password
```

### **Users**
```
GET    /api/users                 - List all users
GET    /api/users/[id]            - Get user details
POST   /api/users                 - Create user
PUT    /api/users/[id]            - Update user
DELETE /api/users/[id]            - Delete user
```

### **Spaces**
```
GET    /api/spaces                - List all spaces
GET    /api/spaces/[id]           - Get space details
POST   /api/spaces                - Create space
PUT    /api/spaces/[id]           - Update space
DELETE /api/spaces/[id]           - Delete space
GET    /api/spaces/availability   - Check availability
```

### **Bookings**
```
GET    /api/bookings              - List all bookings
GET    /api/bookings/[id]         - Get booking details
POST   /api/bookings              - Create booking
PUT    /api/bookings/[id]         - Update booking
DELETE /api/bookings/[id]         - Cancel booking
GET    /api/bookings/calendar     - Calendar view
POST   /api/bookings/check        - Check availability
```

### **Payments**
```
POST   /api/payments/mpesa        - Initiate M-Pesa payment
POST   /api/payments/callback     - M-Pesa callback
GET    /api/payments              - List all payments
GET    /api/payments/[id]         - Get payment details
GET    /api/receipts/[id]         - Download receipt PDF
```

### **Events**
```
GET    /api/events                - List all events
GET    /api/events/[id]           - Get event details
POST   /api/events                - Create event
PUT    /api/events/[id]           - Update event
DELETE /api/events/[id]           - Delete event
POST   /api/events/[id]/register  - Register for event
```

### **Menu**
```
GET    /api/menu                  - List all menu items
POST   /api/menu                  - Create menu item
PUT    /api/menu/[id]             - Update menu item
DELETE /api/menu/[id]             - Delete menu item
```

### **Gallery**
```
GET    /api/gallery               - List all images
POST   /api/gallery               - Upload image
DELETE /api/gallery/[id]          - Delete image
PUT    /api/gallery/[id]          - Update image details
```

### **Customers**
```
GET    /api/customers             - List all customers
GET    /api/customers/[id]        - Get customer details
GET    /api/customers/[id]/bookings - Customer booking history
```

### **Reports**
```
GET    /api/reports/revenue       - Revenue report
GET    /api/reports/bookings      - Bookings report
GET    /api/reports/analytics     - Analytics data
```

---

## 🎨 **ADMIN DASHBOARD UI STRUCTURE**

```
/admin
├── /dashboard                     (Overview, stats, quick actions)
├── /bookings
│   ├── /calendar                  (Calendar view of all bookings)
│   ├── /list                      (Table view with filters)
│   ├── /create                    (Create booking for walk-in)
│   └── /[id]                      (View/Edit booking details)
├── /spaces
│   ├── /list                      (All spaces)
│   ├── /create                    (Add new space)
│   └── /[id]/edit                 (Edit space)
├── /events
│   ├── /list                      (All events)
│   ├── /create                    (Create event)
│   ├── /[id]/edit                 (Edit event)
│   └── /[id]/registrations        (View registrations)
├── /payments
│   ├── /list                      (All payments)
│   ├── /receipts                  (All receipts)
│   └── /refunds                   (Refund management)
├── /customers
│   ├── /list                      (All customers)
│   └── /[id]                      (Customer profile + history)
├── /content
│   ├── /menu                      (Manage menu items)
│   ├── /gallery                   (Manage gallery)
│   └── /pricing                   (Manage pricing plans)
├── /reports
│   ├── /revenue                   (Revenue reports)
│   ├── /bookings                  (Booking reports)
│   └── /analytics                 (Analytics dashboard)
├── /users
│   ├── /list                      (All users)
│   └── /create                    (Add user)
├── /settings
│   ├── /general                   (Site settings)
│   ├── /email                     (Email templates)
│   └── /notifications             (Notification settings)
└── /logs
    ├── /emails                    (Email logs)
    └── /audit                     (Audit logs)
```

---

## 🔐 **SECURITY FEATURES**

1. ✅ **Password Hashing** (bcrypt)
2. ✅ **JWT Tokens** (secure session)
3. ✅ **Role-Based Access Control** (RBAC)
4. ✅ **API Rate Limiting** (prevent abuse)
5. ✅ **SQL Injection Prevention** (parameterized queries)
6. ✅ **XSS Protection** (input sanitization)
7. ✅ **CSRF Protection** (Next.js built-in)
8. ✅ **Audit Logs** (track all admin actions)
9. ✅ **Secure File Uploads** (validate file types)
10. ✅ **Environment Variables** (sensitive data)

---

## 📦 **REQUIRED NPM PACKAGES**

```json
{
  "dependencies": {
    "next-auth": "^5.0.0",           // Authentication
    "@supabase/supabase-js": "^2.x", // Database
    "resend": "^3.x",                 // Email service
    "react-email": "^2.x",            // Email templates
    "@react-pdf/renderer": "^3.x",   // PDF generation
    "tremor": "^3.x",                // Dashboard components
    "recharts": "^2.x",              // Charts (already installed)
    "date-fns": "^3.x",              // Date utilities
    "zod": "^3.x",                   // Schema validation
    "bcryptjs": "^2.x",              // Password hashing
    "nanoid": "^5.x",                // Unique ID generation
    "axios": "^1.x",                 // HTTP requests (M-Pesa)
    "react-hot-toast": "^2.x"        // Better notifications
  }
}
```

---

## 🚀 **RECOMMENDED DEVELOPMENT ORDER**

### **SPRINT 1 (Week 1-2): Foundation**
1. Set up Supabase database
2. Create all database tables
3. Install NextAuth.js
4. Build authentication system
5. Create login page
6. Set up role-based middleware

### **SPRINT 2 (Week 2-3): Dashboard**
7. Create admin layout
8. Build dashboard homepage
9. Install Tremor components
10. Design consistent UI

### **SPRINT 3 (Week 3-4): Bookings - CORE**
11. Create space management API
12. Build space management UI
13. Create availability checker API
14. Build booking form (frontend)
15. Create booking API
16. Build reception booking interface
17. Build booking management UI (admin)

### **SPRINT 4 (Week 4-5): Payments - CORE**
18. Integrate M-Pesa
19. Create receipt generation
20. Build payment tracking UI
21. Test payment flow end-to-end

### **SPRINT 5 (Week 5): Emails**
22. Set up Resend
23. Create email templates
24. Build email automation
25. Create email logs UI

### **SPRINT 6 (Week 6): Events**
26. Create events API
27. Build events management UI
28. Connect event registration
29. Test event flow

### **SPRINT 7 (Week 7): Content Management**
30. Build menu management
31. Build gallery management
32. Build pricing management

### **SPRINT 8 (Week 8): Customers & Polish**
33. Build customer database
34. Add customer profiles
35. Bug fixes and optimization
36. UI/UX improvements

### **SPRINT 9 (Week 9): Reports**
37. Build revenue reports
38. Build booking reports
39. Create analytics dashboard

### **SPRINT 10 (Week 10+): Advanced Features**
40. SMS notifications (optional)
41. Waitlist system (optional)
42. Member packages (optional)

---

## 💰 **ESTIMATED COSTS**

### **Monthly Running Costs:**
```
Supabase:           Free (up to 500MB database, 1GB storage)
                    OR $25/month (Pro plan)
Resend:             Free (100 emails/day)
                    OR $20/month (unlimited)
M-Pesa:             Transaction fees only (~Ksh 10-50 per transaction)
Domain:             $12/year
Hosting (Vercel):   Free (unlimited)
                    OR $20/month (Pro - for team features)

TOTAL:              $0 - $65/month
```

### **Development Time:**
```
Phase 1-5 (Core):   4-5 weeks (CRITICAL)
Phase 6-8:          3 weeks (Important)
Phase 9-10:         2+ weeks (Optional)

TOTAL:              8-10 weeks for full system
```

---

## ✅ **NEXT STEPS - START NOW!**

### **Immediate Actions:**
1. ✅ **Create Supabase Account** - Set up database
2. ✅ **Install Dependencies** - NextAuth, Supabase, etc.
3. ✅ **Create Database Schema** - Set up all tables
4. ✅ **Build Authentication** - Login system
5. ✅ **Start Dashboard UI** - Admin layout

### **What You Should Decide:**
❓ **Database:** Supabase (recommended) or MongoDB?
❓ **Email:** Resend (recommended) or SendGrid?
❓ **File Storage:** Supabase Storage or Cloudinary?
❓ **Start with:** Full booking system OR Basic dashboard first?

---

## 📞 **YOUR FEEDBACK NEEDED**

1. ✅ Does this plan cover all your requirements?
2. ✅ Any features you want to add/remove?
3. ✅ Which sprint should we start with?
4. ✅ Do you want me to start coding now?

**Let me know and I'll start building!** 🚀


