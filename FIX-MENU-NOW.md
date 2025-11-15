# 🔧 FIX MENU ERROR - Step by Step

## ❌ Current Error:
**"Failed to save item"** - This means the database table structure doesn't match what the API expects.

---

## ✅ SOLUTION (Follow These Exact Steps):

### **STEP 1: Open Supabase Dashboard**
```
1. Go to: https://supabase.com
2. Click on your project: WorkNest
3. Click "SQL Editor" in the left sidebar
4. Click "New Query"
```

---

### **STEP 2: Run This SQL Query**

**Copy and paste this ENTIRE script into the SQL Editor:**

```sql
-- Fix menu_items table structure
-- This will make the database match what your API expects

-- Step 1: Rename 'available' to 'is_available'
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'menu_items' AND column_name = 'available'
    ) THEN
        ALTER TABLE menu_items RENAME COLUMN available TO is_available;
        RAISE NOTICE 'Renamed available to is_available';
    ELSE
        RAISE NOTICE 'Column already named is_available';
    END IF;
END $$;

-- Step 2: Add missing columns
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS dietary_info TEXT,
ADD COLUMN IF NOT EXISTS spice_level VARCHAR(20),
ADD COLUMN IF NOT EXISTS prep_time INTEGER,
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_by UUID;

-- Step 3: Generate slugs for existing items
UPDATE menu_items 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Step 4: Make slug unique
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_slug_key;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_slug_key UNIQUE (slug);

-- Step 5: Verify the fix
SELECT 'SUCCESS! Table fixed. You can now add menu items!' as status;
```

---

### **STEP 3: Click "Run" Button**
```
1. Look for green "Run" button in Supabase SQL Editor
2. Click it
3. Wait 2-3 seconds
4. You should see: "SUCCESS! Table fixed..."
```

---

### **STEP 4: Test Adding Menu Item**
```
1. Go back to: http://localhost:3000/admin/menu
2. Click "Add Menu Item"
3. Fill in:
   - Name: Ugali cabbage
   - Description: wertyujikl
   - Category: Lunch
   - Price: 560
   - ✅ Available for Order
4. Click "Create Item"
5. ✅ Should work now!
```

---

## 🎯 **What This SQL Does:**

### **Problem:**
Your database table has column `available` but your API code uses `is_available`

### **Solution:**
1. ✅ Renames `available` → `is_available`
2. ✅ Adds 8 missing columns
3. ✅ Creates slugs for items
4. ✅ Adds unique constraint
5. ✅ Verifies everything worked

---

## 📸 **Visual Guide:**

### **Supabase SQL Editor Should Look Like:**
```
┌─────────────────────────────────────┐
│ [New Query ▼]              [Run] ✓  │
├─────────────────────────────────────┤
│                                     │
│  -- Fix menu_items table...         │
│  DO $$                              │
│  BEGIN                              │
│    ...                              │
│                                     │
│  (paste the SQL here)               │
│                                     │
└─────────────────────────────────────┘
```

### **After Clicking Run:**
```
┌─────────────────────────────────────┐
│ Results                              │
├─────────────────────────────────────┤
│ ✅ SUCCESS! Table fixed. You can    │
│    now add menu items!              │
└─────────────────────────────────────┘
```

---

## 🔍 **If You Get an Error:**

### **Error: "column available does not exist"**
```
✅ This is GOOD! It means the column is already renamed.
The script will still add the missing columns.
Just ignore this error and continue.
```

### **Error: "relation menu_items does not exist"**
```
❌ This means the table wasn't created yet.
Solution:
1. Go to Supabase → SQL Editor
2. Run the CREATE TABLE script from supabase-schema.sql first
3. Then run this fix script
```

---

## 📋 **Quick Verification:**

### **After Running SQL, Check:**
```sql
-- Run this to verify columns exist:
SELECT column_name 
FROM information_schema.columns 
WHERE table_name = 'menu_items'
ORDER BY ordinal_position;
```

### **You Should See:**
```
id
name
description
category
price
image_url
is_available        ← Should be "is_available" NOT "available"
is_featured         ← Should exist
slug                ← Should exist
dietary_info        ← Should exist
spice_level         ← Should exist
prep_time           ← Should exist
calories            ← Should exist
display_order       ← Should exist
created_by          ← Should exist
created_at
updated_at
```

---

## 🚀 **After Fix Works:**

### **You'll Be Able To:**
1. ✅ Add menu items from admin panel
2. ✅ Edit existing items
3. ✅ Delete items
4. ✅ See items on restaurant page
5. ✅ Mark items as featured
6. ✅ Toggle availability

---

## 💡 **Why This Happened:**

The original database schema was created with:
- `available` (old column name)

But the API was updated to use:
- `is_available` (new column name)

This SQL script fixes the mismatch!

---

## ✅ **Summary:**

1. ✅ Open Supabase SQL Editor
2. ✅ Paste the SQL script
3. ✅ Click "Run"
4. ✅ Wait for "SUCCESS!" message
5. ✅ Go back to admin panel
6. ✅ Add your menu item
7. ✅ It will work!

---

## 📞 **Still Not Working?**

### **Check Browser Console:**
```
1. Press F12 in browser
2. Go to "Console" tab
3. Look for red error messages
4. Share the exact error message
```

### **Check Supabase Logs:**
```
1. Go to Supabase Dashboard
2. Click "Logs" in left sidebar
3. Look for recent errors
4. Share what you see
```

---

## 🎊 **That's It!**

Just run the SQL script in Supabase and your menu system will work perfectly!

**File to use:** Copy the SQL from this guide or use `SIMPLE-FIX-MENU.sql`

