-- ===================================
-- CREATE GALLERY TABLE
-- ===================================
-- Run this in Supabase SQL Editor

-- 1. Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255),
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100), -- spaces, events, restaurant, people, exterior, interior
  tags TEXT[], -- array of tags for filtering
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery_images(is_featured);
CREATE INDEX IF NOT EXISTS idx_gallery_display_order ON gallery_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery_images(created_at);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (allow public read, authenticated write)
CREATE POLICY "Allow public read access to gallery images"
  ON gallery_images FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert gallery images"
  ON gallery_images FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update gallery images"
  ON gallery_images FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete gallery images"
  ON gallery_images FOR DELETE
  TO authenticated
  USING (true);

-- 5. Insert sample gallery images
INSERT INTO gallery_images (title, description, image_url, category, tags, is_featured, display_order)
VALUES 
-- WORKSPACES
(
  'Modern Private Office',
  'Elegant private office space with natural lighting',
  'https://images.unsplash.com/photo-1497366216548-37526070297c',
  'spaces',
  ARRAY['office', 'workspace', 'private'],
  true,
  1
),
(
  'Executive Boardroom',
  'Professional boardroom equipped with AV technology',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  'spaces',
  ARRAY['boardroom', 'meeting', 'professional'],
  true,
  2
),
(
  'Open Coworking Area',
  'Collaborative workspace with modern amenities',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
  'spaces',
  ARRAY['coworking', 'open-space', 'collaborative'],
  true,
  3
),

-- EVENTS
(
  'Networking Event',
  'Community networking session at The WorkNest',
  'https://images.unsplash.com/photo-1511578314322-379afb476865',
  'events',
  ARRAY['networking', 'community', 'social'],
  true,
  4
),
(
  'Workshop Session',
  'Educational workshop in our event space',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0',
  'events',
  ARRAY['workshop', 'learning', 'training'],
  false,
  5
),

-- RESTAURANT
(
  'Coffee & Beverages',
  'Premium coffee and fresh beverages',
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  'restaurant',
  ARRAY['coffee', 'drinks', 'cafe'],
  true,
  6
),
(
  'Fresh Cuisine',
  'Delicious meals prepared by our chef',
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  'restaurant',
  ARRAY['food', 'lunch', 'healthy'],
  false,
  7
),

-- INTERIOR
(
  'Reception Area',
  'Welcoming reception with modern design',
  'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
  'interior',
  ARRAY['reception', 'lobby', 'entrance'],
  false,
  8
),
(
  'Relaxation Lounge',
  'Comfortable lounge area for breaks',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2',
  'interior',
  ARRAY['lounge', 'relaxation', 'comfort'],
  false,
  9
),

-- EXTERIOR
(
  'Building Facade',
  'Modern architecture in Eldoret',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
  'exterior',
  ARRAY['building', 'architecture', 'exterior'],
  false,
  10
),

-- PEOPLE
(
  'Team Collaboration',
  'Members working together',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
  'people',
  ARRAY['team', 'collaboration', 'work'],
  false,
  11
),
(
  'Professional Meeting',
  'Business discussion in boardroom',
  'https://images.unsplash.com/photo-1553877522-43269d4ea984',
  'people',
  ARRAY['meeting', 'business', 'professional'],
  false,
  12
);

-- 6. Verify
SELECT 
  id,
  title,
  category,
  is_featured,
  display_order,
  created_at
FROM gallery_images
ORDER BY display_order;

SELECT 'Gallery images table created successfully!' as status;
SELECT category, COUNT(*) as images_count 
FROM gallery_images 
GROUP BY category 
ORDER BY category;

