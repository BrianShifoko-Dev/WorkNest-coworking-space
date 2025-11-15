# 🚀 Quick Start: User Management

## 📍 **Access the User Management Page**

1. Log in to admin dashboard: `http://localhost:3000/login`
2. Click **"Users"** in the sidebar (only visible to Managers)
3. URL: `/admin/users`

---

## 👤 **Adding Your First User**

### **Example: Adding a Reception Staff Member**

```
Step 1: Click "Add User" button

Step 2: Fill in the form:
┌─────────────────────────────────────┐
│ Full Name: Jane Doe                 │
│ Email: jane@worknest.co.ke          │
│ Phone: +254 712 345 678             │
│ Role: Reception                     │
│ Password: ••••••••                  │
└─────────────────────────────────────┘

Step 3: Click "Create User"

✅ Done! Jane can now log in and access:
   - Dashboard
   - Bookings (view & create)
   - Customers (view & create)
   - Payments (view)
```

---

## 🔐 **Role Selection Guide**

### **Choose "Manager" if they need to:**
- ✅ Access ALL features
- ✅ Add/edit spaces, events, menu, gallery
- ✅ View reports and analytics
- ✅ Manage other users
- ✅ Change settings

**Example:** Business owner, Operations manager

---

### **Choose "Reception" if they need to:**
- ✅ Create bookings for customers
- ✅ View customer information
- ✅ Check payment status
- ❌ NOT change menu, gallery, or settings

**Example:** Front desk staff, Customer service

---

### **Choose "Staff" if they need to:**
- ✅ View today's bookings
- ✅ See customer names and booking details
- ❌ NOT create bookings
- ❌ NOT access any other features

**Example:** Security, Cleaning staff, Part-time helpers

---

## ✏️ **Editing a User**

```
Step 1: Find the user card
Step 2: Click "Edit" button
Step 3: Update information:
   - Change name, email, phone
   - Change role (upgrades/downgrades permissions)
   - Change password (leave empty to keep current)
Step 4: Click "Save Changes"

✅ Changes take effect immediately!
```

---

## 🗑️ **Deleting a User**

```
Step 1: Find the user card
Step 2: Click the red trash icon
Step 3: Confirm deletion
Step 4: ✅ User is removed and can no longer log in
```

**⚠️ Warning:** Deleted users lose access immediately!

---

## 🎯 **Common Scenarios**

### **Scenario 1: New Employee**
```
Action: Add user with "Reception" role
Result: They can book for customers at front desk
```

### **Scenario 2: Temporary Manager Coverage**
```
Action: Edit user, change role to "Manager"
Result: They get full access temporarily
Action: Edit again later, change back to original role
```

### **Scenario 3: Employee Leaves**
```
Action: Delete user
Result: They immediately lose all access
```

### **Scenario 4: Forgot Password**
```
Action: Edit user, enter new password
Result: They can log in with the new password
```

---

## 📊 **What You'll See**

### **User Management Dashboard:**
```
┌─────────────────────────────────────────────┐
│  👥 User Management              [Add User] │
├─────────────────────────────────────────────┤
│                                             │
│  📊 Stats:                                  │
│  ┌──────────┬──────────┬──────────┐        │
│  │ Total: 5 │ Managers │ Reception│        │
│  │          │     2    │     3    │        │
│  └──────────┴──────────┴──────────┘        │
│                                             │
│  🔐 Role Permissions Info Panel             │
│  ┌─────────────────────────────────┐       │
│  │ MANAGER: Full access to all     │       │
│  │ RECEPTION: Bookings, customers  │       │
│  │ STAFF: View-only                │       │
│  └─────────────────────────────────┘       │
│                                             │
│  📇 User Cards:                             │
│  ┌─────────────┐  ┌─────────────┐         │
│  │ John Doe    │  │ Jane Smith  │         │
│  │ MANAGER     │  │ RECEPTION   │         │
│  │ john@...    │  │ jane@...    │         │
│  │ [Edit] [X]  │  │ [Edit] [X]  │         │
│  └─────────────┘  └─────────────┘         │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 💡 **Pro Tips**

1. **Start Small:** Add 1-2 users first, test their access
2. **Document Credentials:** Keep a secure record of who has what role
3. **Regular Audits:** Review user list monthly, remove inactive accounts
4. **Role Changes:** Don't create new users for temporary access - just change roles
5. **Security:** Use strong passwords (min 6 characters, but longer is better)
6. **Training:** Show new users their specific features before giving access

---

## ⚡ **Quick Commands**

### **Add Reception Staff:**
```
Name: [Staff Name]
Email: [their-email]@worknest.co.ke
Phone: +254 7XX XXX XXX
Role: Reception
Password: [strong-password]
```

### **Promote to Manager:**
```
1. Edit user
2. Change role: Reception → Manager
3. Save
```

### **Demote to Staff:**
```
1. Edit user
2. Change role: [Current Role] → Staff
3. Save
```

### **Reset Password:**
```
1. Edit user
2. Enter new password: ••••••••
3. Leave empty to keep current
4. Save
```

---

## 🎊 **You're Ready!**

You can now:
- ✅ Add new admin users
- ✅ Assign appropriate roles
- ✅ Edit user information
- ✅ Manage permissions
- ✅ Remove users when needed

**Navigate to `/admin/users` and start managing your team!**

---

## 📞 **Need Help?**

See `USER-MANAGEMENT-COMPLETE.md` for full documentation and advanced features.

