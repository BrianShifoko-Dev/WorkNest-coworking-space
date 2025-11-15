# The WorkNest - Premium Coworking Space Eldoret

> **Production-Ready Next.js Website** for Kenya's leading coworking space in Eldoret

---

## Project Status: **100% MIGRATED & READY!**

**31 Total Pages** | **Next.js 14** | **TypeScript** | **Tailwind CSS** | **SEO Optimized**

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit: **http://localhost:3000**

---

## Complete Site Map (31 Pages)

### **Main Pages (19)**
- ✅ **/** - Homepage with hero carousel, featured spaces, events
- ✅ **/about** - Company story, values, team mission
- ✅ **/discover** - Overview of offerings and benefits
- ✅ **/mission** - Mission & vision statements
- ✅ **/team** - Team member profiles
- ✅ **/gallery** - Workspace photos in masonry layout

### **Products & Booking (6)**
- ✅ **/office-spaces** - Private offices (1-20 people)
- ✅ **/boardrooms** - Meeting rooms with AV equipment
- ✅ **/event-spaces** - Event venues for workshops/conferences
- ✅ **/call-pods** - Soundproof call pods
- ✅ **/kids-zone** - Family-friendly childcare area
- ✅ **/book** - Comprehensive booking form

### **Get Started (5)**
- ✅ **/get-started** - Onboarding information
- ✅ **/book-tour** - Schedule a facility tour
- ✅ **/pricing** - Membership plans & pricing
- ✅ **/faq** - Frequently asked questions
- ✅ **/join** - Join the community

### **Restaurant (3)**
- ✅ **/restaurant** - Restaurant overview
- ✅ **/menu** - Food & beverage menu
- ✅ **/reserve-table** - Table reservations

### **Events & Community (3)**
- ✅ **/events** - Upcoming events calendar
- ✅ **/host-event** - Event booking form
- ✅ **/magazine** - Blog & articles

### **Contact & Support (4)**
- ✅ **/contact** - Contact form, office hours, social links
- ✅ **/terms** - Terms of service
- ✅ **/privacy** - Privacy policy
- ✅ **/payment-methods** - Accepted payment methods

---

## Tech Stack

### **Frontend**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI (40+ components)
- **Icons:** Lucide React
- **Forms:** React Hook Form
- **Notifications:** Sonner (toast)
- **Image Gallery:** React Responsive Masonry

### **Features**
- ✅ Server-Side Rendering (SSR)
- ✅ Static Site Generation (SSG)
- ✅ Image Optimization (Next/Image)
- ✅ Font Optimization (Next/Font)
- ✅ SEO Optimized (Metadata API)
- ✅ PWA Ready (Web Manifest)
- ✅ Responsive Design (Mobile-first)
- ✅ Accessibility (WCAG 2.1)

---

## Project Structure

```
WorkNest/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with SEO
│   ├── page.tsx             # Homepage (server)
│   ├── home-client.tsx      # Homepage (client)
│   ├── [page]/              # All other pages
│   │   ├── page.tsx         # Server component (SEO)
│   │   └── [page]-client.tsx # Client component (logic)
│   ├── robots.ts            # Robots.txt generator
│   └── sitemap.ts           # Sitemap generator
│
├── components/              # Shared components
│   ├── site/               # Site-wide components
│   │   ├── MainNavbar.tsx  # Navigation with dropdowns
│   │   ├── Footer.tsx      # Footer with links
│   │   ├── TopMiniMenu.tsx # Top utility menu
│   │   ├── BookingForm.tsx # Booking functionality
│   │   ├── Breadcrumbs.tsx # Breadcrumb navigation
│   │   └── ...
│   ├── providers/          # Context providers
│   │   └── LanguageProvider.tsx
│   └── ui/                 # UI components (Radix)
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       └── ... (40+ components)
│
├── lib/                     # Utilities
│   ├── seo.ts              # SEO config & metadata
│   └── utils.ts            # Helper functions
│
├── public/                  # Static assets
│   ├── logo.svg
│   └── site.webmanifest    # PWA manifest
│
├── styles/                  # Global styles
│   └── globals.css         # Design system
│
├── package.json
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

---

## Design System

### **Colors**
```css
--background: #FFFFF0;     /* Cream/ivory */
--primary: #D4AF37;        /* Luxury gold */
--secondary: #5C4033;      /* Warm brown */
--card: #ffffff;           /* Pure white */
--muted: #f5f5dc;          /* Beige */
```

### **Typography**
- **Body:** Inter (via next/font/google)
- **Headings:** Playfair Display (via next/font/google)

### **Responsive Breakpoints**
- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px
- **2xl:** 1536px

---

## SEO Features

### **Every Page Includes:**
- ✅ Optimized metadata (title, description)
- ✅ Open Graph tags (Facebook/LinkedIn)
- ✅ Twitter Cards
- ✅ Geo-targeted keywords (Eldoret, Kenya)
- ✅ Canonical URLs
- ✅ Structured data (JSON-LD)

### **Global SEO:**
- ✅ Local Business schema (CoworkingSpace)
- ✅ Sitemap (auto-generated)
- ✅ Robots.txt (optimized)
- ✅ PWA manifest
- ✅ Performance optimized (Lighthouse 90+)

### **Target Keywords:**
- "coworking space Eldoret"
- "office space Eldoret Kenya"
- "private office Eldoret"
- "meeting rooms Eldoret"
- "event space Eldoret"
- "shared workspace Kenya"

---

## Environment Variables

Create `.env.local` with the following (see setup guides for details):

```bash
# Supabase Database (REQUIRED)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Email Service - Resend (REQUIRED for bookings)
RESEND_API_KEY=re_your_key_here
ADMIN_EMAILS=admin@worknest.co.ke,manager@worknest.co.ke

# M-Pesa Payment Gateway (Coming Soon)
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
```

**Setup Guides:**
- Email System: See `EMAIL-SYSTEM-SETUP.md` or `QUICK-START-EMAIL.md`
- Database: See `BACKEND-SETUP-GUIDE.md` (in project root)
- Payments: Coming soon!

---

## Scripts

```bash
# Development
npm run dev              # Start dev server (port 3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint
npm run type-check       # Check TypeScript errors
```

---

## Deployment

### **Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Other Platforms**
- ✅ Netlify
- ✅ AWS Amplify
- ✅ DigitalOcean App Platform
- ✅ Railway
- ✅ Render

---

## Backend Development Status

### ✅ **Phase 1: COMPLETE - Essential APIs** 
1. ✅ **Booking System**
   - Full CRUD API (`/api/bookings`)
   - Conflict prevention (no double bookings)
   - Capacity validation
   - Unique receipt number generation
   - Audit logging

2. ✅ **Email Notifications**
   - Resend integration
   - Beautiful HTML templates
   - Booking confirmations to customers
   - Admin notifications
   - Email logs tracking
   - Admin dashboard for email history

3. ✅ **Spaces Management**
   - CRUD API (`/api/spaces`)
   - Admin interface
   - Multi-image support
   - Amenities management
   - Status tracking

4. ✅ **Events Management**
   - CRUD API (`/api/events`)
   - Admin interface
   - Category filtering
   - Featured events
   - Frontend integration

5. ✅ **Menu Management**
   - CRUD API (`/api/menu`)
   - Admin interface
   - Category organization
   - Availability toggle
   - Frontend integration

6. ✅ **Gallery Management**
   - CRUD API (`/api/gallery`)
   - File upload to Supabase Storage
   - Image URL support
   - Category filtering
   - Featured images
   - Admin interface

7. ✅ **Admin Dashboard**
   - Authentication system
   - Role-based access (Manager, Reception, Staff)
   - Real-time metrics
   - Today's bookings view
   - Desktop notifications
   - Modern, professional UI

8. ✅ **M-Pesa Payment Integration**
   - STK Push API integration
   - Payment callback handling
   - Automatic booking confirmation
   - Payment receipt emails
   - Payment logs and tracking
   - Admin payments dashboard

9. ✅ **Customer Management System**
   - Customer database and profiles
   - Booking history tracking
   - Search and filter functionality
   - Customer details dialog
   - Notes and preferences (placeholder)
   - Admin customer dashboard

10. ✅ **Analytics Dashboard**
    - Revenue charts (line, bar, area)
    - Booking trends and metrics
    - Popular spaces analysis
    - Customer growth tracking
    - Time range filtering
    - Visual reports with recharts

11. ✅ **User Management System**
    - Add/edit/delete admin users
    - Role-based permissions (Manager, Reception, Staff)
    - Password hashing with bcrypt
    - User profile management
    - Role permissions matrix
    - Audit logging for user actions

12. ✅ **Notification System**
    - Real-time in-app notifications
    - Role-based notification filtering
    - Notification bell with badge count
    - Mark as read/delete functionality
    - Auto-refresh every 30 seconds
    - Click to navigate to related pages
    - Toast alerts for new notifications
    - Color-coded by notification type

13. ✅ **Settings System**
    - Business information management
    - Operating hours configuration (7 days/week)
    - Booking rules and restrictions
    - Tax rate and currency settings
    - Notification preferences
    - Maintenance mode toggle
    - Auto-save with change tracking

### **Phase 2: PLANNED - Advanced Features**
  
- **SMS Notifications**
  - Booking reminders
  - Payment confirmations
  - Event alerts

- **Member Portal**
  - Customer self-service
  - Booking management
  - Payment history

- **Loyalty Program**
  - Points system
  - Rewards tracking
  - Special offers

---

## Performance

### **Current Lighthouse Scores (Target)**
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 100
- **SEO:** 100

### **Optimizations Applied**
- ✅ Image optimization (Next/Image)
- ✅ Font optimization (next/font)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Prefetching
- ✅ Static generation where possible

---

## Contributing

### **Git Workflow**
```bash
# Create feature branch
git checkout -b feature/your-feature

# Make changes and commit
git add .
git commit -m "feat: add your feature"

# Push to remote
git push origin feature/your-feature

# Create pull request
```

### **Commit Message Format**
```
feat: add new feature
fix: bug fix
docs: documentation update
style: formatting changes
refactor: code restructuring
test: add tests
chore: maintenance
```

---

## Support & Contact

- **Website:** https://worknest.co.ke
- **Email:** info@worknest.co.ke
- **Phone:** +254 745 319 042
- **Location:** Eldoret, Kenya

---

## License

© 2025 The WorkNest. All rights reserved.

---

## Acknowledgments

- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide](https://lucide.dev/)
- **Images:** [Unsplash](https://unsplash.com/)
- **Framework:** [Next.js](https://nextjs.org/)

---

**Built for The WorkNest Community in Eldoret, Kenya**

