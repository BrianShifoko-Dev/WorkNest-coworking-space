-- Fix menu_items table to match API expectations
-- Run this in Supabase SQL Editor

-- Step 1: Rename 'available' column to 'is_available'
ALTER TABLE menu_items 
RENAME COLUMN available TO is_available;

-- Step 2: Add missing columns
ALTER TABLE menu_items 
ADD COLUMN IF NOT EXISTS slug VARCHAR(255) UNIQUE,
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS dietary_info TEXT,
ADD COLUMN IF NOT EXISTS spice_level VARCHAR(20),
ADD COLUMN IF NOT EXISTS prep_time INTEGER,
ADD COLUMN IF NOT EXISTS calories INTEGER,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_by UUID;

-- Step 3: Generate slugs for existing items (if any)
UPDATE menu_items 
SET slug = LOWER(REPLACE(REGEXP_REPLACE(name, '[^a-zA-Z0-9 ]', '', 'g'), ' ', '-'))
WHERE slug IS NULL;

-- Step 4: Update indexes
DROP INDEX IF EXISTS idx_menu_available;
CREATE INDEX IF NOT EXISTS idx_menu_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_menu_display_order ON menu_items(display_order);

-- Verify the changes
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'menu_items'
ORDER BY ordinal_position;

-- Show count
SELECT COUNT(*) as total_menu_items FROM menu_items;

SELECT 'Menu items table fixed successfully!' as status;

