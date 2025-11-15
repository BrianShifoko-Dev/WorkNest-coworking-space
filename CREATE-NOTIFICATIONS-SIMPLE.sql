-- ================================================
-- CREATE NOTIFICATIONS TABLE - SIMPLIFIED VERSION
-- ================================================
-- This is a simplified version that will work for sure
-- ================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  target_role VARCHAR(50),
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500),
  is_read BOOLEAN DEFAULT FALSE,
  related_id UUID,
  related_type VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_notifications_target_role ON notifications(target_role);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);

-- Add sample notifications
INSERT INTO notifications (target_role, type, title, message, link)
VALUES 
  ('manager', 'system', '🎉 Welcome to WorkNest Admin!', 'Your dashboard is ready.', '/admin/dashboard'),
  ('reception', 'booking', '📅 New Booking Received', 'A new booking has been submitted.', '/admin/bookings'),
  ('staff', 'system', '🔔 System Ready', 'The WorkNest system is ready to use.', '/admin/dashboard');

-- Show results
SELECT * FROM notifications ORDER BY created_at DESC;

