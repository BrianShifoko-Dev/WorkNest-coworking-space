-- ============================================
-- CREATE SAMPLE BOOKING FOR TESTING
-- Run this in Supabase SQL Editor
-- ============================================

-- Step 1: Create a test customer (if not exists)
INSERT INTO customers (full_name, email, phone, company)
VALUES (
  'John Doe',
  'john.doe@example.com',
  '+254712345678',
  'Test Company Ltd'
)
ON CONFLICT (email) DO NOTHING;

-- Step 2: Get the customer ID
-- (You'll need to copy this ID for the next step)
SELECT id, full_name, email FROM customers WHERE email = 'john.doe@example.com';

-- Step 3: Make sure you have at least one space
-- Check if you have spaces:
SELECT id, name, type, status FROM spaces LIMIT 5;

-- If you don't have any spaces, create one:
-- INSERT INTO spaces (name, type, description, capacity, hourly_rate, daily_rate, status)
-- VALUES (
--   'Test Office Space',
--   'office',
--   'A test office for demos',
--   5,
--   500,
--   3000,
--   'available'
-- );

-- Step 4: Create a sample booking
-- IMPORTANT: Replace these IDs with actual IDs from your database!
-- Get space_id from: SELECT id FROM spaces LIMIT 1;
-- Get customer_id from: SELECT id FROM customers WHERE email = 'john.doe@example.com';

INSERT INTO bookings (
  space_id,
  customer_id,
  start_datetime,
  end_datetime,
  number_of_people,
  purpose,
  status,
  total_amount,
  receipt_number,
  booking_type
)
SELECT 
  (SELECT id FROM spaces WHERE status = 'available' LIMIT 1) as space_id,
  (SELECT id FROM customers WHERE email = 'john.doe@example.com') as customer_id,
  (NOW() + INTERVAL '1 day')::timestamp as start_datetime,
  (NOW() + INTERVAL '1 day' + INTERVAL '3 hours')::timestamp as end_datetime,
  5 as number_of_people,
  'Team Meeting' as purpose,
  'pending' as status,
  3000 as total_amount,
  'WN25110001' as receipt_number,
  'online' as booking_type
WHERE 
  EXISTS (SELECT 1 FROM spaces WHERE status = 'available')
  AND EXISTS (SELECT 1 FROM customers WHERE email = 'john.doe@example.com');

-- Step 5: Verify the booking was created
SELECT 
  b.id,
  b.receipt_number,
  b.status,
  b.start_datetime,
  b.end_datetime,
  c.full_name as customer_name,
  s.name as space_name
FROM bookings b
JOIN customers c ON b.customer_id = c.id
JOIN spaces s ON b.space_id = s.id
ORDER BY b.created_at DESC
LIMIT 5;

-- ============================================
-- If you get an error, check:
-- 1. Do you have spaces? Run: SELECT COUNT(*) FROM spaces;
-- 2. Do you have customers? Run: SELECT COUNT(*) FROM customers;
-- 3. Check receipt_number is unique
-- ============================================

-- Clean up test data (optional - run only if you want to delete the sample):
-- DELETE FROM bookings WHERE receipt_number = 'WN25110001';
-- DELETE FROM customers WHERE email = 'john.doe@example.com';


