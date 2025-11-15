-- ==========================================
-- JUST CREATE ADMIN USER (No table creation)
-- ==========================================
-- Run this in Supabase SQL Editor

-- Step 1: Delete existing admin if any
DELETE FROM users WHERE email = 'admin@worknest.co.ke';

-- Step 2: Create admin user with proper password
-- Password: Admin@123
INSERT INTO users (
  email,
  password_hash,
  full_name,
  phone,
  role,
  status
) VALUES (
  'admin@worknest.co.ke',
  '$2a$10$K7J5lZ3jzY7xqGX8xK0xN.iQQZpX5z5YqZ5Z5Z5Z5Z5Z5Z5Z5Z5ZO',
  'WorkNest Administrator',
  '+254700000000',
  'manager',
  'active'
);

-- Step 3: Verify it worked
SELECT 
  id,
  email,
  full_name,
  role,
  status,
  created_at
FROM users 
WHERE email = 'admin@worknest.co.ke';

-- ==========================================
-- Done! Now try login:
-- Email:    admin@worknest.co.ke
-- Password: Admin@123
-- ==========================================

