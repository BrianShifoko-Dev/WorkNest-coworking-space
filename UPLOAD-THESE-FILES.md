# 📤 Upload These Files - Step by Step

## ✅ **FILES ARE READY IN YOUR FOLDER:**

**Your working folder:**
```
C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space
```

---

## 📁 **FILES TO UPLOAD:**

### **File 1: `supabase-mysql.ts`**
**On your computer:**
```
C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space\lib\supabase-mysql.ts
```

**Upload to server:**
```
/home1/theworkn/worknest/lib/supabase-mysql.ts
```

---

### **File 2: `route.ts`**
**On your computer:**
```
C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space\app\api\bookings\route.ts
```

**Upload to server:**
```
/home1/theworkn/worknest/app/api/bookings/route.ts
```

---

## 📤 **HOW TO UPLOAD:**

### **Step 1: Open cPanel File Manager**

1. **Login to cPanel**
2. **Click:** "File Manager" (in Files section)
3. **Navigate to:** `/home1/theworkn/worknest`

---

### **Step 2: Upload File 1 (`supabase-mysql.ts`)**

1. **In File Manager**, click on **`lib`** folder
2. **Click:** "Upload" button (top menu)
3. **Click:** "Select File" or drag and drop
4. **On your computer**, go to:
   ```
   C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space\lib
   ```
5. **Select:** `supabase-mysql.ts`
6. **Click:** "Upload"
7. **If asked:** Click "Replace" or "Yes"

---

### **Step 3: Upload File 2 (`route.ts`)**

1. **Go back to:** `/home1/theworkn/worknest`
2. **Click on:** `app` folder
3. **Click on:** `api` folder
4. **Click on:** `bookings` folder
5. **Click:** "Upload" button
6. **On your computer**, go to:
   ```
   C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space\app\api\bookings
   ```
7. **Select:** `route.ts`
8. **Click:** "Upload"
9. **If asked:** Click "Replace" or "Yes"

---

### **Step 4: Rebuild on Server**

1. **Go to:** cPanel → **Terminal** (search for it)
2. **Run this command:**
   ```
   source /home1/theworkn/nodevenv/worknest/18/bin/activate && cd /home1/theworkn/worknest && npm run build
   ```
3. **Wait 5-10 minutes** for build to complete

---

### **Step 5: Restart App**

1. **Go to:** cPanel → **Setup Node.js App**
2. **Click on your `worknest` app**
3. **Click:** "RESTART" button
4. **Wait 30 seconds**

---

### **Step 6: Test**

1. **Visit:** `https://theworknest.co.ke`
2. **Submit a test booking**
3. **Check admin panel** → Bookings should appear! ✅

---

## 🎯 **QUICK CHECK:**

**On your computer, open:**
```
C:\Users\Eldohub Academy\Documents\PROJECT\W\WorkNest-coworking-space
```

**You should see:**
- ✅ `lib` folder → `supabase-mysql.ts` inside
- ✅ `app` folder → `api` → `bookings` → `route.ts` inside

**These are the files to upload!** 📤

---

**Files are ready in your working folder!** ✅

