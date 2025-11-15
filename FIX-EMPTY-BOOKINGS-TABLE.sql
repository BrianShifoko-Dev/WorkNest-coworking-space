-- ================================================
-- FIX EMPTY BOOKINGS TABLE
-- ================================================
-- This script will:
-- 1. Check if you have spaces and customers
-- 2. Add test data if needed
-- 3. Create a test booking
-- 4. Verify everything works
-- ================================================

-- ================================================
-- STEP 1: CHECK CURRENT DATA
-- ================================================

-- Check if we have spaces
SELECT 'SPACES CHECK:' as info, COUNT(*) as count FROM spaces;

-- Check if we have customers
SELECT 'CUSTOMERS CHECK:' as info, COUNT(*) as count FROM customers;

-- Check bookings (should be 0 for now)
SELECT 'BOOKINGS CHECK:' as info, COUNT(*) as count FROM bookings;

-- ================================================
-- STEP 2: ADD TEST SPACE (if spaces table is empty)
-- ================================================

-- Insert a test office space
INSERT INTO spaces (
  name,
  type,
  description,
  capacity,
  hourly_rate,
  daily_rate,
  weekly_rate,
  monthly_rate,
  images,
  amenities,
  status,
  is_featured
)
SELECT 
  'Executive Office Suite',
  'office',
  'Premium office space with modern amenities and natural lighting',
  8,
  1500.00,
  10000.00,
  60000.00,
  200000.00,
  ARRAY[
    'https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?w=1080&q=80',
    'https://images.unsplash.com/photo-1692133226337-55e513450a32?w=1080&q=80'
  ],
  ARRAY['WiFi', 'AC', 'Whiteboard', 'Coffee Machine', '24/7 Access'],
  'available',
  true
WHERE NOT EXISTS (SELECT 1 FROM spaces LIMIT 1);

-- Insert a test boardroom
INSERT INTO spaces (
  name,
  type,
  description,
  capacity,
  hourly_rate,
  daily_rate,
  images,
  amenities,
  status,
  is_featured
)
SELECT 
  'Conference Boardroom',
  'boardroom',
  'Professional meeting room with AV equipment',
  12,
  2500.00,
  15000.00,
  ARRAY[
    'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1080&q=80'
  ],
  ARRAY['Projector', 'Video Conferencing', 'WiFi', 'Whiteboard'],
  'available',
  false
WHERE NOT EXISTS (SELECT 1 FROM spaces WHERE type = 'boardroom');

-- ================================================
-- STEP 3: ADD TEST CUSTOMERS (if customers table is empty)
-- ================================================

-- Insert test customer 1
INSERT INTO customers (
  full_name,
  email,
  phone,
  company
)
SELECT 
  'John Kamau',
  'john.kamau@example.com',
  '+254712345678',
  'Tech Innovations Ltd'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE email = 'john.kamau@example.com');

-- Insert test customer 2
INSERT INTO customers (
  full_name,
  email,
  phone,
  company
)
SELECT 
  'Sarah Wanjiku',
  'sarah.wanjiku@example.com',
  '+254723456789',
  'Creative Agency Co'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE email = 'sarah.wanjiku@example.com');

-- Insert test customer 3
INSERT INTO customers (
  full_name,
  email,
  phone,
  company
)
SELECT 
  'Michael Omondi',
  'michael.omondi@example.com',
  '+254734567890',
  'StartUp Hub Kenya'
WHERE NOT EXISTS (SELECT 1 FROM customers WHERE email = 'michael.omondi@example.com');

-- ================================================
-- STEP 4: CREATE TEST BOOKINGS
-- ================================================

-- Booking 1: Pending office booking for today
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
  s.id,
  c.id,
  NOW(),
  NOW() + INTERVAL '4 hours',
  5,
  'Team Strategy Meeting',
  'Need projector and coffee setup',
  'pending',
  6000.00,
  'WN' || TO_CHAR(NOW(), 'YYMM') || '0001',
  'online'
FROM 
  (SELECT id FROM spaces WHERE type = 'office' LIMIT 1) s,
  (SELECT id FROM customers WHERE email = 'john.kamau@example.com' LIMIT 1) c
WHERE NOT EXISTS (
  SELECT 1 FROM bookings WHERE receipt_number = 'WN' || TO_CHAR(NOW(), 'YYMM') || '0001'
);

-- Booking 2: Confirmed boardroom booking for tomorrow
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
  s.id,
  c.id,
  NOW() + INTERVAL '1 day',
  NOW() + INTERVAL '1 day' + INTERVAL '3 hours',
  8,
  'Client Presentation',
  'Video conferencing required',
  'confirmed',
  7500.00,
  'WN' || TO_CHAR(NOW(), 'YYMM') || '0002',
  'online'
FROM 
  (SELECT id FROM spaces WHERE type = 'boardroom' LIMIT 1) s,
  (SELECT id FROM customers WHERE email = 'sarah.wanjiku@example.com' LIMIT 1) c
WHERE NOT EXISTS (
  SELECT 1 FROM bookings WHERE receipt_number = 'WN' || TO_CHAR(NOW(), 'YYMM') || '0002'
);

-- Booking 3: Pending office booking for next week
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
  s.id,
  c.id,
  NOW() + INTERVAL '7 days',
  NOW() + INTERVAL '7 days' + INTERVAL '8 hours',
  3,
  'Workshop Training',
  'pending',
  12000.00,
  'WN' || TO_CHAR(NOW(), 'YYMM') || '0003',
  'walk_in'
FROM 
  (SELECT id FROM spaces WHERE type = 'office' LIMIT 1) s,
  (SELECT id FROM customers WHERE email = 'michael.omondi@example.com' LIMIT 1) c
WHERE NOT EXISTS (
  SELECT 1 FROM bookings WHERE receipt_number = 'WN' || TO_CHAR(NOW(), 'YYMM') || '0003'
);

-- ================================================
-- STEP 5: VERIFY EVERYTHING WAS CREATED
-- ================================================

-- Show summary
SELECT 'FINAL COUNTS:' as info;
SELECT 'Spaces:' as table_name, COUNT(*) as total_records FROM spaces
UNION ALL
SELECT 'Customers:', COUNT(*) FROM customers
UNION ALL
SELECT 'Bookings:', COUNT(*) FROM bookings;

-- Show the bookings we just created
SELECT 
  'BOOKINGS CREATED:' as info;

SELECT 
  b.id,
  b.receipt_number,
  c.full_name as customer,
  s.name as space,
  b.start_datetime,
  b.end_datetime,
  b.status,
  b.total_amount
FROM bookings b
JOIN customers c ON b.customer_id = c.id
JOIN spaces s ON b.space_id = s.id
ORDER BY b.created_at DESC
LIMIT 10;

-- ================================================
-- DONE! ✅
-- ================================================
-- Your bookings table should now have test data
-- Refresh your Supabase UI to see the bookings
-- ================================================

-- ================================================
-- OPTIONAL: If you want to delete test data later
-- ================================================
-- Uncomment these lines to remove test data:

-- DELETE FROM bookings WHERE receipt_number LIKE 'WN' || TO_CHAR(NOW(), 'YYMM') || '%';
-- DELETE FROM customers WHERE email LIKE '%@example.com';
-- DELETE FROM spaces WHERE name IN ('Executive Office Suite', 'Conference Boardroom');

-- ================================================

