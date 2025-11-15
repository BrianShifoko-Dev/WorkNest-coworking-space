-- ================================================
-- ADD SPACES FOR BOOKING SYSTEM
-- ================================================
-- This adds real spaces that users can book
-- ================================================

-- Enable UUID extension (if not already enabled)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Add is_featured column if it doesn't exist (from earlier fix)
ALTER TABLE spaces ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT FALSE;

-- ================================================
-- ADD OFFICE SPACES
-- ================================================

-- Executive Office Suite
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Executive Office Suite',
  'office',
  'Premium private office with modern furniture, natural lighting, and stunning city views. Perfect for executives and small teams.',
  8,
  1500.00,
  10000.00,
  60000.00,
  200000.00,
  '["https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?w=1080&q=80", "https://images.unsplash.com/photo-1692133226337-55e513450a32?w=1080&q=80"]'::jsonb,
  '["WiFi", "AC", "Whiteboard", "Coffee Machine", "24/7 Access", "Printer", "Meeting Room Access"]'::jsonb,
  'available',
  true
) ON CONFLICT DO NOTHING;

-- Startup Office
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Startup Office',
  'office',
  'Flexible office space ideal for growing startups. Modern, collaborative environment with all essential amenities.',
  6,
  1200.00,
  8000.00,
  48000.00,
  160000.00,
  '["https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80"]'::jsonb,
  '["WiFi", "AC", "Standing Desks", "Coffee", "Lockers"]'::jsonb,
  'available',
  false
) ON CONFLICT DO NOTHING;

-- ================================================
-- ADD BOARDROOMS
-- ================================================

-- Conference Boardroom
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Conference Boardroom',
  'boardroom',
  'Professional meeting room equipped with state-of-the-art AV equipment, projector, and video conferencing facilities.',
  12,
  2500.00,
  15000.00,
  NULL,
  NULL,
  '["https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1080&q=80"]'::jsonb,
  '["Projector", "Video Conferencing", "WiFi", "Whiteboard", "AC", "Coffee Service"]'::jsonb,
  'available',
  true
) ON CONFLICT DO NOTHING;

-- Small Meeting Room
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Small Meeting Room',
  'boardroom',
  'Intimate meeting space perfect for team meetings, client presentations, and brainstorming sessions.',
  6,
  1500.00,
  8000.00,
  NULL,
  NULL,
  '["https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1080&q=80"]'::jsonb,
  '["TV Screen", "WiFi", "Whiteboard", "AC", "Coffee"]'::jsonb,
  'available',
  false
) ON CONFLICT DO NOTHING;

-- ================================================
-- ADD EVENT SPACES
-- ================================================

-- Grand Event Hall
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Grand Event Hall',
  'event_space',
  'Spacious event venue perfect for workshops, product launches, seminars, and corporate celebrations.',
  50,
  5000.00,
  30000.00,
  NULL,
  NULL,
  '["https://images.unsplash.com/photo-1759873148521-c49d9497cf64?w=1080&q=80"]'::jsonb,
  '["Stage", "Sound System", "Projector", "WiFi", "AC", "Catering Setup", "Flexible Seating"]'::jsonb,
  'available',
  true
) ON CONFLICT DO NOTHING;

-- ================================================
-- ADD CALL PODS
-- ================================================

-- Private Call Pod
INSERT INTO spaces (
  name, type, description, capacity,
  hourly_rate, daily_rate, weekly_rate, monthly_rate,
  images, amenities, status, is_featured
) VALUES (
  'Private Call Pod',
  'call_pod',
  'Soundproof pod for private calls and video meetings. Perfect for focused work and confidential conversations.',
  1,
  250.00,
  950.00,
  4500.00,
  NULL,
  '["https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80"]'::jsonb,
  '["Soundproof", "WiFi", "Power Outlet", "AC", "Desk"]'::jsonb,
  'available',
  false
) ON CONFLICT DO NOTHING;

-- ================================================
-- VERIFY SPACES WERE ADDED
-- ================================================

-- Show all spaces
SELECT 
  id,
  name,
  type,
  capacity,
  hourly_rate,
  daily_rate,
  status,
  is_featured
FROM spaces
ORDER BY 
  CASE 
    WHEN is_featured = true THEN 0
    ELSE 1
  END,
  created_at DESC;

-- Show count
SELECT 
  'Total Spaces:' as info,
  COUNT(*) as count,
  SUM(CASE WHEN status = 'available' THEN 1 ELSE 0 END) as available_count,
  SUM(CASE WHEN is_featured = true THEN 1 ELSE 0 END) as featured_count
FROM spaces;

-- ================================================
-- DONE! ✅
-- ================================================
-- Your spaces table now has bookable spaces
-- They will appear in the dropdown on /book page
-- ================================================

-- ================================================
-- OPTIONAL: Remove all spaces (for fresh start)
-- ================================================
-- Uncomment to delete all spaces:
-- DELETE FROM spaces;

-- ================================================

