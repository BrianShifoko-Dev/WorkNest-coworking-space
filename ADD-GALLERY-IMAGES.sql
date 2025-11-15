-- ================================================
-- ADD SAMPLE GALLERY IMAGES
-- ================================================
-- This script adds sample gallery images to populate
-- the gallery page and admin gallery management.
-- ================================================

-- Add sample gallery images
INSERT INTO gallery_images (
  title, 
  description, 
  image_url, 
  category, 
  is_featured, 
  display_order,
  tags
)
VALUES
  -- SPACES CATEGORY (Featured)
  (
    'Modern Office Space', 
    'Bright and spacious coworking area with natural lighting and modern furniture',
    'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80',
    'spaces',
    true,
    1,
    '["office", "coworking", "modern"]'::jsonb
  ),
  (
    'Conference Room', 
    'Professional meeting space equipped with presentation technology',
    'https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=1080&q=80',
    'spaces',
    true,
    2,
    '["boardroom", "meeting", "professional"]'::jsonb
  ),
  (
    'Executive Office Suite',
    'Premium private office with stunning city views',
    'https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?w=1080&q=80',
    'spaces',
    true,
    3,
    '["executive", "private", "premium"]'::jsonb
  ),
  
  -- SPACES CATEGORY (Regular)
  (
    'Collaborative Workspace',
    'Open area perfect for team collaboration and creativity',
    'https://images.unsplash.com/photo-1692133226337-55e513450a32?w=1080&q=80',
    'spaces',
    false,
    4,
    '["collaboration", "teamwork", "creative"]'::jsonb
  ),
  (
    'Phone Booth',
    'Soundproof booth for private calls and focused work',
    'https://images.unsplash.com/photo-1716703435698-031227389c1c?w=1080&q=80',
    'spaces',
    false,
    5,
    '["phone booth", "privacy", "quiet"]'::jsonb
  ),
  
  -- EVENTS CATEGORY
  (
    'Networking Event',
    'Community gathering and professional networking session',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1080&q=80',
    'events',
    true,
    6,
    '["networking", "community", "social"]'::jsonb
  ),
  (
    'Workshop Session',
    'Learning and skill development workshop',
    'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1080&q=80',
    'events',
    false,
    7,
    '["workshop", "learning", "training"]'::jsonb
  ),
  (
    'Grand Event Hall',
    'Large venue for corporate events and celebrations',
    'https://images.unsplash.com/photo-1759873148521-c49d9497cf64?w=1080&q=80',
    'events',
    true,
    8,
    '["event hall", "corporate", "celebration"]'::jsonb
  ),
  
  -- COMMUNITY CATEGORY
  (
    'Team Collaboration',
    'Team members working together on a project',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1080&q=80',
    'community',
    false,
    9,
    '["team", "collaboration", "project"]'::jsonb
  ),
  (
    'Casual Meeting',
    'Informal discussion over coffee',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1080&q=80',
    'community',
    false,
    10,
    '["casual", "coffee", "discussion"]'::jsonb
  ),
  (
    'Community Lunch',
    'Monthly community lunch gathering',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1080&q=80',
    'community',
    false,
    11,
    '["lunch", "community", "food"]'::jsonb
  ),
  
  -- AMENITIES CATEGORY
  (
    'Reception Area',
    'Welcoming entrance and reception desk',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1080&q=80',
    'amenities',
    false,
    12,
    '["reception", "entrance", "lobby"]'::jsonb
  ),
  (
    'Coffee Bar',
    'Premium coffee and refreshment station',
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1080&q=80',
    'amenities',
    true,
    13,
    '["coffee", "refreshments", "bar"]'::jsonb
  ),
  (
    'Lounge Area',
    'Comfortable space for relaxation and informal meetings',
    'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=1080&q=80',
    'amenities',
    false,
    14,
    '["lounge", "relaxation", "comfort"]'::jsonb
  ),
  (
    'High-Speed WiFi',
    'Reliable internet connectivity throughout the space',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1080&q=80',
    'amenities',
    false,
    15,
    '["wifi", "internet", "technology"]'::jsonb
  )

ON CONFLICT DO NOTHING;

-- ================================================
-- VERIFY GALLERY IMAGES
-- ================================================
SELECT 'Gallery images added successfully!' AS status;
SELECT 
  COUNT(*) AS total_images,
  COUNT(*) FILTER (WHERE is_featured = TRUE) AS featured_images,
  COUNT(*) FILTER (WHERE category = 'spaces') AS space_images,
  COUNT(*) FILTER (WHERE category = 'events') AS event_images,
  COUNT(*) FILTER (WHERE category = 'community') AS community_images,
  COUNT(*) FILTER (WHERE category = 'amenities') AS amenity_images
FROM gallery_images;

-- Show sample of added images
SELECT title, category, is_featured, display_order
FROM gallery_images
ORDER BY display_order
LIMIT 10;

