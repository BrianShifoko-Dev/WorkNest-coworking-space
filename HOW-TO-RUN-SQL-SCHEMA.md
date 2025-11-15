# 📝 How to Run SQL Schema in Supabase

## 🎯 **Follow These Exact Steps:**

### **Step 1: Open Supabase Dashboard**
1. Go to: https://supabase.com/dashboard
2. You should see your "WorkNest" project
3. Click on the "WorkNest" project to open it

---

### **Step 2: Open SQL Editor**
1. On the left sidebar, look for **"SQL Editor"** icon (looks like `</>`)
2. Click on **"SQL Editor"**
3. You'll see a page with a text editor

---

### **Step 3: Create New Query**
1. Click the **"+ New query"** button (top left)
2. A blank query editor will open

---

### **Step 4: Copy the SQL Schema**
1. In your project, open the file: `supabase-schema.sql`
2. Select ALL content (Ctrl+A or Cmd+A)
3. Copy it (Ctrl+C or Cmd+C)

---

### **Step 5: Paste and Run**
1. Go back to Supabase SQL Editor
2. Paste the copied SQL (Ctrl+V or Cmd+V)
3. Click **"Run"** button (or press Ctrl+Enter)
4. ⏱️ Wait 5-10 seconds...

---

### **Step 6: Check for Success**
You should see a message like:
```
✅ Success. No rows returned
```

OR you might see some notices:
```
NOTICE: ✅ WorkNest database schema created successfully!
NOTICE: 📊 14 tables created with indexes and relationships
NOTICE: 🔐 Default admin user created: admin@worknest.co.ke
```

**This means it worked!** 🎉

---

### **Step 7: Verify Tables Were Created**
1. On the left sidebar, click **"Table Editor"**
2. You should now see a list of tables:
   - users
   - spaces
   - bookings
   - events
   - event_registrations
   - menu_items
   - table_reservations
   - gallery_images
   - pricing_plans
   - payments
   - email_logs
   - audit_logs
   - customers
   - waitlist

**If you see these 14 tables, you're done!** ✅

---

## 🚨 **If You Get an Error:**

### **Error: "relation already exists"**
- **Meaning:** Tables already exist
- **Solution:** Skip this, you're already good!

### **Error: "syntax error"**
- **Meaning:** SQL wasn't copied correctly
- **Solution:** 
  1. Delete everything in the editor
  2. Re-copy from `supabase-schema.sql` (make sure you got everything!)
  3. Try again

### **Error: "permission denied"**
- **Meaning:** You're not the owner
- **Solution:** Make sure you're logged into YOUR Supabase account

---

## 📸 **Visual Guide:**

**What SQL Editor Looks Like:**
```
┌─────────────────────────────────────┐
│ SQL Editor                    [Run] │
├─────────────────────────────────────┤
│                                     │
│  [Paste your SQL here]             │
│                                     │
│  CREATE TABLE users (               │
│    id UUID PRIMARY KEY...           │
│  );                                 │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

---

## ✅ **After Success:**

### **1. Create `.env.local` File**
In your project root (WorkNest folder), create a file named `.env.local` and copy the contents from `YOUR-ENV-LOCAL-CONTENTS.txt`

**In VS Code:**
1. Right-click in file explorer (left sidebar)
2. Click "New File"
3. Name it: `.env.local`
4. Paste the contents from `YOUR-ENV-LOCAL-CONTENTS.txt`
5. Save (Ctrl+S)

### **2. Verify Setup**
Run this command in terminal:
```bash
npm run dev
```

If no errors, you're ready! ✅

### **3. Let Me Know!**
Tell me: "SQL schema is running successfully!" and I'll start building the authentication system!

---

## 🎯 **Summary:**

```
1. Open Supabase Dashboard
2. Click "SQL Editor"
3. Click "+ New query"
4. Copy supabase-schema.sql
5. Paste in editor
6. Click "Run"
7. ✅ Success!
8. Create .env.local with your credentials
9. Tell me you're ready!
```

**You've got this! 💪**

