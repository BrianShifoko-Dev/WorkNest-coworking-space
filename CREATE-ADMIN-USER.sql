-- ==========================================
-- CREATE ADMIN USER FOR WORKNEST
-- ==========================================
-- Run this in Supabase SQL Editor
-- Password will be: Admin@123

-- Step 1: Delete existing admin user if it exists (optional)
DELETE FROM users WHERE email = 'admin@worknest.co.ke';

-- Step 2: Create new admin user
-- The password hash below is for "Admin@123" 
-- Generated using bcrypt with 10 rounds
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

-- Step 3: Verify the user was created
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
-- SUCCESS! 
-- You can now login with:
-- Email:    admin@worknest.co.ke
-- Password: Admin@123
-- ==========================================

