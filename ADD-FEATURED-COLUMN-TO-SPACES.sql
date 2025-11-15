-- ================================================
-- ADD IS_FEATURED COLUMN TO SPACES TABLE
-- ================================================
-- This allows marking spaces as "featured" to appear on homepage
-- Run this in your Supabase SQL Editor
-- ================================================

-- Step 1: Add is_featured column to spaces table
ALTER TABLE spaces
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- Step 2: Mark some existing spaces as featured (optional - customize as needed)
-- Example: Mark first 3 spaces as featured
UPDATE spaces
SET is_featured = TRUE
WHERE id IN (
  SELECT id FROM spaces
  ORDER BY created_at ASC
  LIMIT 3
);

-- Step 3: Verify the column was added
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'spaces' 
  AND column_name = 'is_featured';

-- ================================================
-- DONE! ✅
-- ================================================
-- Now you can:
-- 1. Mark spaces as featured in admin panel
-- 2. Featured spaces will appear on homepage
-- 3. Non-featured spaces still show on their category pages
-- ================================================

