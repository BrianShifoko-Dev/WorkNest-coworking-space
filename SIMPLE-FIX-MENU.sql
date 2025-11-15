-- SIMPLE FIX: Just rename the column and add missing ones
-- Run this in Supabase SQL Editor

-- Step 1: Check current structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'menu_items';

-- Step 2: Rename 'available' to 'is_available' (if it exists)
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'menu_items' AND column_name = 'available'
    ) THEN
        ALTER TABLE menu_items RENAME COLUMN available TO is_available;
    END IF;
END $$;

-- Step 3: Add missing columns (if they don't exist)
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255),
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS dietary_info TEXT,
ADD COLUMN IF NOT EXISTS spice_level VARCHAR(20),
ADD COLUMN IF NOT EXISTS prep_time INTEGER,
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_by UUID;

-- Step 4: Generate slugs for any existing items
UPDATE menu_items 
SET slug = LOWER(REGEXP_REPLACE(name, '[^a-zA-Z0-9]+', '-', 'g'))
WHERE slug IS NULL;

-- Step 5: Create unique constraint on slug
ALTER TABLE menu_items DROP CONSTRAINT IF EXISTS menu_items_slug_key;
ALTER TABLE menu_items ADD CONSTRAINT menu_items_slug_key UNIQUE (slug);

-- Verify the fix
SELECT 'SUCCESS! Table structure fixed.' as status;
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'menu_items'
ORDER BY ordinal_position;

