-- ===================================
-- CREATE MENU TABLE
-- ===================================
-- Run this in Supabase SQL Editor

-- 1. Create menu_items table
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL, -- breakfast, lunch, dinner, drinks, desserts, snacks
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  dietary_info TEXT[], -- vegetarian, vegan, gluten-free, dairy-free, etc.
  spice_level VARCHAR(50), -- mild, medium, hot, extra-hot
  prep_time INTEGER, -- in minutes
  calories INTEGER,
  display_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_available ON menu_items(is_available);
CREATE INDEX IF NOT EXISTS idx_menu_items_featured ON menu_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_menu_items_display_order ON menu_items(display_order);

-- 3. Enable RLS (Row Level Security)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

-- 4. Create policies (allow public read, authenticated write)
CREATE POLICY "Allow public read access to menu items"
  ON menu_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert menu items"
  ON menu_items FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update menu items"
  ON menu_items FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to delete menu items"
  ON menu_items FOR DELETE
  TO authenticated
  USING (true);

-- 5. Insert sample menu items
INSERT INTO menu_items (name, slug, description, category, price, image_url, is_available, is_featured, dietary_info, spice_level, prep_time, calories, display_order)
VALUES 
-- BREAKFAST
(
  'WorkNest Breakfast Platter',
  'worknest-breakfast-platter',
  'Scrambled eggs, bacon, sausages, toast, baked beans, grilled tomatoes, and hash browns',
  'breakfast',
  850,
  'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666',
  true,
  true,
  ARRAY['dairy'],
  NULL,
  15,
  650,
  1
),
(
  'Pancake Stack',
  'pancake-stack',
  'Fluffy pancakes served with maple syrup, butter, and fresh berries',
  'breakfast',
  550,
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
  true,
  false,
  ARRAY['vegetarian', 'dairy'],
  NULL,
  10,
  450,
  2
),
(
  'Avocado Toast',
  'avocado-toast',
  'Smashed avocado on toasted sourdough with poached eggs and cherry tomatoes',
  'breakfast',
  650,
  'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d',
  true,
  true,
  ARRAY['vegetarian'],
  NULL,
  12,
  380,
  3
),

-- LUNCH
(
  'Grilled Chicken Salad',
  'grilled-chicken-salad',
  'Mixed greens, grilled chicken breast, avocado, cherry tomatoes, and balsamic dressing',
  'lunch',
  750,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
  true,
  true,
  ARRAY['gluten-free'],
  NULL,
  18,
  420,
  1
),
(
  'Beef Burger & Fries',
  'beef-burger-fries',
  'Juicy beef patty, lettuce, tomato, cheese, pickles, and crispy fries',
  'lunch',
  900,
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
  true,
  true,
  ARRAY['dairy'],
  NULL,
  20,
  850,
  2
),
(
  'Pasta Carbonara',
  'pasta-carbonara',
  'Creamy pasta with bacon, parmesan, and black pepper',
  'lunch',
  850,
  'https://images.unsplash.com/photo-1612874742237-6526221588e3',
  true,
  false,
  ARRAY['dairy'],
  NULL,
  15,
  680,
  3
),

-- DINNER
(
  'Grilled Salmon',
  'grilled-salmon',
  'Atlantic salmon fillet with roasted vegetables and lemon butter sauce',
  'dinner',
  1200,
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2',
  true,
  true,
  ARRAY['gluten-free', 'dairy'],
  NULL,
  25,
  520,
  1
),
(
  'Steak & Chips',
  'steak-chips',
  '250g sirloin steak cooked to perfection with hand-cut chips and peppercorn sauce',
  'dinner',
  1450,
  'https://images.unsplash.com/photo-1600891964092-4316c288032e',
  true,
  true,
  ARRAY['gluten-free'],
  NULL,
  30,
  780,
  2
),

-- DRINKS
(
  'Freshly Brewed Coffee',
  'freshly-brewed-coffee',
  'Premium Kenyan AA coffee, expertly brewed',
  'drinks',
  250,
  'https://images.unsplash.com/photo-1509042239860-f550ce710b93',
  true,
  true,
  ARRAY['vegan'],
  NULL,
  5,
  5,
  1
),
(
  'Fresh Juice',
  'fresh-juice',
  'Choice of orange, passion, mango, or mixed fruit juice',
  'drinks',
  300,
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba',
  true,
  false,
  ARRAY['vegan', 'gluten-free'],
  NULL,
  5,
  120,
  2
),
(
  'Smoothie Bowl',
  'smoothie-bowl',
  'Blended tropical fruits topped with granola, coconut, and honey',
  'drinks',
  550,
  'https://images.unsplash.com/photo-1590301157890-4810ed352733',
  true,
  false,
  ARRAY['vegetarian'],
  NULL,
  8,
  280,
  3
),

-- DESSERTS
(
  'Chocolate Lava Cake',
  'chocolate-lava-cake',
  'Warm chocolate cake with a molten center, served with vanilla ice cream',
  'desserts',
  450,
  'https://images.unsplash.com/photo-1563805042-7684c019e1cb',
  true,
  true,
  ARRAY['vegetarian', 'dairy'],
  NULL,
  12,
  520,
  1
),
(
  'Tiramisu',
  'tiramisu',
  'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
  'desserts',
  500,
  'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9',
  true,
  false,
  ARRAY['vegetarian', 'dairy'],
  NULL,
  10,
  380,
  2
);

-- 6. Verify
SELECT 
  id,
  name,
  category,
  price,
  is_available,
  is_featured,
  display_order
FROM menu_items
ORDER BY category, display_order;

SELECT 'Menu items table created successfully!' as status;
SELECT category, COUNT(*) as items_count 
FROM menu_items 
GROUP BY category 
ORDER BY category;

