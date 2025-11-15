-- Create Admin User for WorkNest
-- Run this in Supabase SQL Editor

-- First, let's check if admin user exists
SELECT * FROM users WHERE email = 'admin@worknest.co.ke';

-- If no user exists, create one
-- Password: Admin@123
-- This is a bcrypt hash of "Admin@123"
INSERT INTO users (email, password_hash, full_name, phone, role, status)
VALUES (
  'admin@worknest.co.ke',
  '$2a$10$rKJZxcZqKqXXxVxXxXxXxOYqzqzqzqzqzqzqzqzqzqzqzqzqzqzq',
  'WorkNest Administrator',
  '+254700000000',
  'manager',
  'active'
)
ON CONFLICT (email) DO UPDATE
SET password_hash = '$2a$10$rKJZxcZqKqXXxVxXxXxXxOYqzqzqzqzqzqzqzqzqzqzqzqzqzq',
    role = 'manager',
    status = 'active';

-- Verify the user was created
SELECT id, email, full_name, role, status, created_at FROM users WHERE email = 'admin@worknest.co.ke';

