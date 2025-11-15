-- ===================================
-- CREATE EVENTS TABLE
-- ===================================
-- Run this in Supabase SQL Editor

-- 1. Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  location VARCHAR(255),
  category VARCHAR(100), -- workshop, networking, social, conference
  image_url TEXT,
  price DECIMAL(10, 2) DEFAULT 0,
  capacity INTEGER,
  registered_count INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'upcoming', -- upcoming, ongoing, completed, cancelled
  is_featured BOOLEAN DEFAULT false,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_category ON events(category);
CREATE INDEX IF NOT EXISTS idx_events_featured ON events(is_featured);

-- 3. Create event_registrations table (for tracking who registered)
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  registration_date TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'registered', -- registered, attended, cancelled
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, refunded
  amount_paid DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, customer_id)
);

-- 4. Create indexes for registrations
CREATE INDEX IF NOT EXISTS idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_registrations_customer ON event_registrations(customer_id);

-- 5. Enable RLS (Row Level Security)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;

-- 6. Create policies (allow public read, authenticated write)
CREATE POLICY "Allow public read access to events"
  ON events FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert events"
  ON events FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update events"
  ON events FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete events"
  ON events FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Allow public read access to registrations"
  ON event_registrations FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to manage registrations"
  ON event_registrations FOR ALL
  TO authenticated
  USING (true);

-- 7. Insert sample events
INSERT INTO events (title, slug, description, date, start_time, end_time, location, category, image_url, price, capacity, status, is_featured)
VALUES 
(
  'Startup Networking Mixer',
  'startup-networking-mixer',
  'Connect with fellow entrepreneurs and startup founders over drinks and conversation.',
  CURRENT_DATE + INTERVAL '7 days',
  '18:00:00',
  '21:00:00',
  'The WorkNest Lounge',
  'networking',
  'https://images.unsplash.com/photo-1511578314322-379afb476865',
  500,
  50,
  'upcoming',
  true
),
(
  'Digital Marketing Workshop',
  'digital-marketing-workshop',
  'Learn proven strategies to grow your business online with social media and SEO.',
  CURRENT_DATE + INTERVAL '14 days',
  '14:00:00',
  '17:00:00',
  'The WorkNest Boardroom A',
  'workshop',
  'https://images.unsplash.com/photo-1557804506-669a67965ba0',
  1500,
  30,
  'upcoming',
  true
),
(
  'Friday Social Hour',
  'friday-social-hour',
  'Unwind with the community every Friday evening. Complimentary snacks and drinks!',
  CURRENT_DATE + INTERVAL '5 days',
  '17:00:00',
  '19:00:00',
  'The WorkNest Terrace',
  'social',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622',
  0,
  100,
  'upcoming',
  false
),
(
  'Pitch Perfect: Investor Presentation Skills',
  'pitch-perfect-investor-presentation',
  'Master the art of pitching to investors. Get feedback from experienced VCs.',
  CURRENT_DATE + INTERVAL '21 days',
  '10:00:00',
  '13:00:00',
  'The WorkNest Conference Hall',
  'workshop',
  'https://images.unsplash.com/photo-1475721027785-f74eccf877e2',
  2000,
  25,
  'upcoming',
  true
);

-- 8. Verify
SELECT 
  id,
  title,
  date,
  start_time,
  category,
  price,
  capacity,
  status,
  is_featured
FROM events
ORDER BY date;

SELECT 'Events table created successfully!' as status;

