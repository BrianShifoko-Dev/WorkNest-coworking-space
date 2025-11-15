# 🔧 Quick Fix: Menu Items Not Saving

## ❌ **Problem:**
Menu items fail to save with "Failed to save item" error.

## ✅ **Solution:**
The database table has different column names than the API expects.

---

## 🚀 **Fix It Now (2 Steps):**

### **Step 1: Run SQL Fix**
```sql
1. Go to Supabase Dashboard → SQL Editor
2. Open file: FIX-MENU-ITEMS-TABLE.sql
3. Copy entire contents
4. Paste in SQL Editor
5. Click "Run"
6. ✅ Wait for success message
```

### **Step 2: Test It**
```
1. Go to: http://localhost:3000/admin/menu
2. Click "Add Item" button
3. Fill in the form:
   - Name: Grilled Chicken Salad
   - Description: Fav dish in kenya
   - Category: Lunch
   - Price: 800
   - Image URL: (any Unsplash food URL)
   - Check "Available for Order"
4. Click "Create Item"
5. ✅ Should save successfully!
```

---

## 🐛 **What Was Wrong:**

### Database Had:
```sql
available BOOLEAN  -- ❌ Wrong name
```

### API Expected:
```sql
is_available BOOLEAN  -- ✅ Correct name
```

### Also Missing:
- `slug` - URL-friendly name
- `is_featured` - Featured flag
- `dietary_info` - Diet information
- `spice_level` - Spice level
- `prep_time` - Preparation time
- `calories` - Calorie count
- `display_order` - Sort order
- `created_by` - Creator user ID

---

## ✨ **What Gets Fixed:**

1. ✅ Column `available` → `is_available`
2. ✅ Adds all missing columns
3. ✅ Generates slugs for existing items
4. ✅ Updates database indexes
5. ✅ Menu items save successfully

---

## 📝 **After Running SQL:**

Your menu form will work perfectly:
- ✅ Create items
- ✅ Edit items
- ✅ Delete items
- ✅ Toggle availability
- ✅ Mark as featured
- ✅ All fields save correctly

---

## 🎉 **That's It!**

Just run the SQL script and your menu management will be fully functional!

**File to run:** `FIX-MENU-ITEMS-TABLE.sql`

