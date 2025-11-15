-- ================================================
-- CREATE NOTIFICATIONS TABLE
-- ================================================
-- This creates the missing notifications table
-- that your app is trying to use
-- ================================================

-- Enable UUID extension (required for uuid generation)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop table if exists (for clean setup)
DROP TABLE IF EXISTS notifications CASCADE;

-- Create notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Target user/role
  user_id UUID, -- Made nullable since we use target_role for role-based notifications
  target_role VARCHAR(50), -- 'manager', 'reception', 'staff', 'accountant', etc.
  
  -- Notification content
  type VARCHAR(50) NOT NULL, -- 'booking', 'payment', 'customer', 'system', etc.
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  link VARCHAR(500), -- Optional link to related resource
  
  -- Status
  is_read BOOLEAN DEFAULT FALSE,
  
  -- Related entities (optional)
  related_id UUID, -- ID of related booking, payment, etc.
  related_type VARCHAR(50), -- 'booking', 'payment', 'customer', etc.
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  read_at TIMESTAMPTZ,
  
  -- Indexes for performance
  CONSTRAINT notifications_type_check CHECK (type IN (
    'booking', 'payment', 'customer', 'system', 'event', 'space', 'user', 'alert'
  ))
);

-- Create indexes for faster queries
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_target_role ON notifications(target_role);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX idx_notifications_type ON notifications(type);

-- Enable Row Level Security (RLS) - DISABLED FOR NOW (easier testing)
-- We'll enable it later when authentication is fully set up
-- ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Note: RLS policies are commented out for easier development
-- Uncomment when you're ready for production security

-- -- Policy: Users can view their own notifications
-- CREATE POLICY "Users can view own notifications"
-- ON notifications FOR SELECT
-- USING (auth.uid() = user_id);

-- -- Policy: Service role can insert notifications (for backend)
-- CREATE POLICY "Service role can insert notifications"
-- ON notifications FOR INSERT
-- WITH CHECK (true);

-- -- Policy: Users can update their own notifications (mark as read)
-- CREATE POLICY "Users can update own notifications"
-- ON notifications FOR UPDATE
-- USING (auth.uid() = user_id);

-- -- Policy: Users can delete their own notifications
-- CREATE POLICY "Users can delete own notifications"
-- ON notifications FOR DELETE
-- USING (auth.uid() = user_id);

-- ================================================
-- ADD SAMPLE NOTIFICATIONS (for testing)
-- ================================================

-- Welcome notification for all managers
INSERT INTO notifications (
  target_role,
  type,
  title,
  message,
  link
) VALUES (
  'manager',
  'system',
  '🎉 Welcome to WorkNest Admin!',
  'Your dashboard is ready. Start managing bookings, spaces, and customers.',
  '/admin/dashboard'
);

-- Sample booking notification
INSERT INTO notifications (
  target_role,
  type,
  title,
  message,
  link
) VALUES (
  'reception',
  'booking',
  '📅 New Booking Received',
  'A new booking has been submitted. Please review and confirm.',
  '/admin/bookings'
);

-- Sample system notification
INSERT INTO notifications (
  target_role,
  type,
  title,
  message,
  link
) VALUES (
  'staff',
  'system',
  '🔔 System Update Complete',
  'The WorkNest system has been updated with new features.',
  '/admin/dashboard'
);

-- ================================================
-- VERIFY TABLE WAS CREATED
-- ================================================

-- Check table structure
SELECT 
  column_name, 
  data_type, 
  column_default
FROM information_schema.columns
WHERE table_name = 'notifications'
ORDER BY ordinal_position;

-- Check sample data
SELECT 
  id,
  target_role,
  type,
  title,
  is_read,
  created_at
FROM notifications
ORDER BY created_at DESC;

-- Show counts
SELECT 
  'Total Notifications:' as info,
  COUNT(*) as count
FROM notifications;

-- ================================================
-- DONE! ✅
-- ================================================
-- Your notifications table is now ready!
-- Refresh your admin dashboard to see notifications
-- ================================================

-- ================================================
-- OPTIONAL: Clear all notifications (for fresh start)
-- ================================================
-- Uncomment to delete all notifications:
-- DELETE FROM notifications;

-- ================================================
-- OPTIONAL: Disable RLS for development
-- ================================================
-- Uncomment to disable RLS (easier testing):
-- ALTER TABLE notifications DISABLE ROW LEVEL SECURITY;

-- ================================================
