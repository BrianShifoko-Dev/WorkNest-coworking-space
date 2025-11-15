-- ===================================
-- CHECK DATABASE - See what's in your database
-- ===================================
-- Run this in Supabase SQL Editor to check your data

-- 1. CHECK SPACES
SELECT 
  'SPACES' as table_name,
  COUNT(*) as total_count
FROM spaces;

SELECT * FROM spaces LIMIT 5;

-- 2. CHECK CUSTOMERS
SELECT 
  'CUSTOMERS' as table_name,
  COUNT(*) as total_count
FROM customers;

SELECT * FROM customers LIMIT 5;

-- 3. CHECK BOOKINGS
SELECT 
  'BOOKINGS' as table_name,
  COUNT(*) as total_count
FROM bookings;

SELECT 
  b.id,
  b.receipt_number,
  b.status,
  b.start_datetime,
  b.end_datetime,
  b.total_amount,
  b.created_at,
  s.name as space_name,
  c.full_name as customer_name
FROM bookings b
LEFT JOIN spaces s ON b.space_id = s.id
LEFT JOIN customers c ON b.customer_id = c.id
ORDER BY b.created_at DESC
LIMIT 10;

-- 4. CHECK USERS (admin users)
SELECT 
  'USERS' as table_name,
  COUNT(*) as total_count
FROM users;

SELECT id, email, full_name, role, created_at 
FROM users;

