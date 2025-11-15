-- Add Accountant Role to WorkNest System
-- Run this in Supabase SQL Editor

-- Step 1: Update users table to allow 'accountant' role
-- The CHECK constraint needs to include 'accountant'

-- Drop existing constraint
ALTER TABLE users DROP CONSTRAINT IF EXISTS users_role_check;

-- Add new constraint with accountant included
ALTER TABLE users ADD CONSTRAINT users_role_check 
CHECK (role IN ('manager', 'reception', 'staff', 'customer', 'accountant'));

-- Step 2: Create a sample accountant user (optional)
-- Password: AccountantPass123! (hashed with bcrypt)
-- You can create accountants from the admin panel after this

-- Verify the change
SELECT constraint_name, check_clause 
FROM information_schema.check_constraints 
WHERE constraint_name = 'users_role_check';

-- Show all roles now allowed
SELECT 'SUCCESS! Accountant role added. Allowed roles: manager, reception, staff, customer, accountant' as status;

-- Optional: Show all current users and their roles
SELECT id, email, full_name, role, created_at 
FROM users 
ORDER BY created_at DESC;

