-- ===================================
-- CREATE COMPLETE TEST BOOKING
-- ===================================
-- This script creates a space, customer, and booking all at once
-- Run this ENTIRE script in Supabase SQL Editor

-- Step 1: Create a test space (if none exist)
INSERT INTO spaces (name, type, capacity, hourly_rate, daily_rate, description, amenities, images, status)
VALUES (
  'Executive Office',
  'private_office',
  5,
  1500,
  10000,
  'Premium executive office with modern furnishings',
  ARRAY['Wi-Fi', 'Air Conditioning', 'Whiteboard', 'Projector'],
  ARRAY['https://images.unsplash.com/photo-1497366216548-37526070297c'],
  'active'
)
ON CONFLICT (name) DO NOTHING
RETURNING id, name;

-- Step 2: Create a test customer
INSERT INTO customers (full_name, email, phone)
VALUES (
  'John Test Customer',
  'john@example.com',
  '+254712345678'
)
ON CONFLICT (email) DO UPDATE 
SET full_name = EXCLUDED.full_name,
    phone = EXCLUDED.phone
RETURNING id, full_name, email;

-- Step 3: Create a test booking for TOMORROW
-- This uses the IDs from steps 1 and 2
WITH space_data AS (
  SELECT id FROM spaces WHERE name = 'Executive Office' LIMIT 1
),
customer_data AS (
  SELECT id FROM customers WHERE email = 'john@example.com' LIMIT 1
)
INSERT INTO bookings (
  space_id,
  customer_id,
  start_datetime,
  end_datetime,
  number_of_people,
  purpose,
  special_requests,
  status,
  total_amount,
  receipt_number,
  booking_type
)
SELECT 
  space_data.id,
  customer_data.id,
  (CURRENT_DATE + INTERVAL '1 day' + TIME '10:00:00')::timestamp,  -- Tomorrow at 10:00 AM
  (CURRENT_DATE + INTERVAL '1 day' + TIME '14:00:00')::timestamp,  -- Tomorrow at 2:00 PM
  4,
  'Team strategy meeting',
  'Need projector, whiteboard, and coffee service',
  'pending',
  6000,
  'WN' || TO_CHAR(NOW(), 'YYMM') || LPAD(FLOOR(RANDOM() * 9999 + 1)::TEXT, 4, '0'),
  'online'
FROM space_data, customer_data
RETURNING 
  id,
  receipt_number,
  status,
  start_datetime,
  end_datetime,
  total_amount;

-- Step 4: Verify the booking was created
SELECT 
  b.id,
  b.receipt_number,
  b.status,
  b.start_datetime,
  b.end_datetime,
  b.number_of_people,
  b.purpose,
  b.special_requests,
  b.total_amount,
  b.booking_type,
  b.created_at,
  s.name as space_name,
  s.type as space_type,
  c.full_name as customer_name,
  c.email as customer_email,
  c.phone as customer_phone
FROM bookings b
JOIN spaces s ON b.space_id = s.id
JOIN customers c ON b.customer_id = c.id
ORDER BY b.created_at DESC
LIMIT 5;

-- Step 5: Show counts
SELECT 'Summary' as info, 
       (SELECT COUNT(*) FROM spaces) as total_spaces,
       (SELECT COUNT(*) FROM customers) as total_customers,
       (SELECT COUNT(*) FROM bookings) as total_bookings;

