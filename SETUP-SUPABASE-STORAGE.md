# 📁 Setup Supabase Storage for Image Uploads

## Step 1: Create Storage Bucket

1. Go to **Supabase Dashboard**: https://supabase.com/dashboard
2. Select your project
3. Click **Storage** in left sidebar
4. Click **"Create a new bucket"**
5. Enter bucket name: `worknest-images`
6. Make it **Public** (check the box)
7. Click **Create bucket**

## Step 2: Set Bucket Policies

After creating the bucket, click on it and go to **Policies** tab:

### Policy 1: Allow public read
- Click **"New Policy"** → **"For full customization"**
- Policy name: `Public Read Access`
- Allowed operations: `SELECT`
- Target roles: `public`
- Policy definition: `true`
- Click **Save**

### Policy 2: Allow authenticated upload
- Click **"New Policy"** → **"For full customization"**
- Policy name: `Authenticated Upload`
- Allowed operations: `INSERT`
- Target roles: `authenticated`
- Policy definition: `true`
- Click **Save**

### Policy 3: Allow authenticated delete
- Click **"New Policy"** → **"For full customization"**
- Policy name: `Authenticated Delete`
- Allowed operations: `DELETE`
- Target roles: `authenticated`
- Policy definition: `true`
- Click **Save**

## Step 3: Done!

Your storage bucket is ready for file uploads! 🎉

The code will automatically:
- Upload images to: `worknest-images/gallery/`
- Generate public URLs
- Store URLs in database

