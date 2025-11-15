-- ==========================================
-- CREATE ADMIN USER WITH REAL BCRYPT HASH
-- ==========================================
-- Password: Admin@123
-- This is a REAL bcrypt hash generated with bcryptjs

DELETE FROM users WHERE email = 'admin@worknest.co.ke';

INSERT INTO users (email, password_hash, full_name, phone, role, status)
VALUES (
  'admin@worknest.co.ke',
  '$2b$10$P42PXY6nkNLlLUivA2lzIeRcWNqSDHAfuwZEU31hbewc5jA5hg7tS',
  'WorkNest Administrator',
  '+254700000000',
  'manager',
  'active'
);

SELECT id, email, full_name, role FROM users WHERE email = 'admin@worknest.co.ke';

-- ==========================================
-- Done! Now try login:
-- Email:    admin@worknest.co.ke
-- Password: Admin@123
-- ==========================================

