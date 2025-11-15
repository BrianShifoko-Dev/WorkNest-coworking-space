-- Run this in Supabase SQL Editor to check your menu_items table

-- Check if table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_name = 'menu_items'
) as table_exists;

-- Show all columns
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'menu_items'
ORDER BY ordinal_position;

-- Show any existing menu items
SELECT * FROM menu_items LIMIT 5;

-- Count total items
SELECT COUNT(*) as total_items FROM menu_items;

