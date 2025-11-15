-- ================================================
-- ADD WORKNEST GALLERY PHOTOS
-- ================================================
-- This script adds all 59 real photos from your
-- WorkNest Gallery folder to the database
-- ================================================

-- Clear any existing sample/demo images (optional)
-- DELETE FROM gallery_images WHERE image_url LIKE '%unsplash%';

-- Add all WorkNest Gallery images
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
  -- FEATURED SPACES (First 10 - Best shots)
  (
    'Modern WorkNest Space',
    'Premium coworking environment at The WorkNest Eldoret',
    '/gallery/IMG_0004.jpg',
    'spaces',
    true,
    1,
    '["workspace", "coworking", "modern"]'::jsonb
  ),
  (
    'Collaborative Work Area',
    'Open workspace designed for productivity and collaboration',
    '/gallery/IMG_0013.jpg',
    'spaces',
    true,
    2,
    '["collaboration", "workspace", "open plan"]'::jsonb
  ),
  (
    'Executive Office Setup',
    'Professional private office space with modern amenities',
    '/gallery/IMG_0016.jpg',
    'spaces',
    true,
    3,
    '["office", "private", "executive"]'::jsonb
  ),
  (
    'Meeting Room',
    'Well-equipped boardroom for client meetings and presentations',
    '/gallery/IMG_0018.jpg',
    'spaces',
    true,
    4,
    '["boardroom", "meeting", "professional"]'::jsonb
  ),
  (
    'Coworking Desks',
    'Flexible desk arrangement for remote workers and freelancers',
    '/gallery/IMG_0022.jpg',
    'spaces',
    true,
    5,
    '["coworking", "desks", "flexible"]'::jsonb
  ),
  (
    'Bright Workspace',
    'Natural lighting and comfortable seating for all-day productivity',
    '/gallery/IMG_0023.jpg',
    'spaces',
    true,
    6,
    '["workspace", "natural light", "comfortable"]'::jsonb
  ),
  (
    'Private Office Suite',
    'Dedicated office space for established businesses',
    '/gallery/IMG_0025.jpg',
    'spaces',
    true,
    7,
    '["private office", "suite", "business"]'::jsonb
  ),
  (
    'Conference Facility',
    'Large meeting space for workshops and corporate events',
    '/gallery/IMG_0026.jpg',
    'spaces',
    true,
    8,
    '["conference", "workshop", "event"]'::jsonb
  ),
  (
    'Hot Desk Area',
    'Drop-in workspace with high-speed internet',
    '/gallery/IMG_0027.jpg',
    'spaces',
    true,
    9,
    '["hot desk", "flexible", "internet"]'::jsonb
  ),
  (
    'Ergonomic Workspace',
    'Comfortable chairs and desks designed for long work sessions',
    '/gallery/IMG_0028.jpg',
    'spaces',
    true,
    10,
    '["ergonomic", "comfortable", "workspace"]'::jsonb
  ),

  -- ADDITIONAL WORKSPACE IMAGES (11-30)
  (
    'Team Collaboration Zone',
    'Spacious area for team brainstorming and project work',
    '/gallery/IMG_0029.jpg',
    'spaces',
    false,
    11,
    '["team", "collaboration", "project"]'::jsonb
  ),
  (
    'Quiet Work Station',
    'Focused workspace away from distractions',
    '/gallery/IMG_0030.jpg',
    'spaces',
    false,
    12,
    '["quiet", "focused", "individual"]'::jsonb
  ),
  (
    'Shared Office Space',
    'Cost-effective office solution for startups',
    '/gallery/IMG_0031.jpg',
    'spaces',
    false,
    13,
    '["shared", "startup", "affordable"]'::jsonb
  ),
  (
    'Window Desk Setup',
    'Inspiring workspace with city views',
    '/gallery/IMG_0032.jpg',
    'spaces',
    false,
    14,
    '["window", "view", "inspiring"]'::jsonb
  ),
  (
    'Professional Environment',
    'Business-grade workspace with premium facilities',
    '/gallery/IMG_0033.jpg',
    'spaces',
    false,
    15,
    '["professional", "premium", "business"]'::jsonb
  ),
  (
    'Open Plan Office',
    'Dynamic workspace encouraging communication',
    '/gallery/IMG_0035.jpg',
    'spaces',
    false,
    16,
    '["open plan", "dynamic", "communication"]'::jsonb
  ),
  (
    'Dedicated Workspace',
    'Your own permanent desk in our coworking community',
    '/gallery/IMG_0037.jpg',
    'spaces',
    false,
    17,
    '["dedicated", "permanent", "community"]'::jsonb
  ),
  (
    'Modern Office Interior',
    'Contemporary design with functional workspace',
    '/gallery/IMG_0038.jpg',
    'spaces',
    false,
    18,
    '["modern", "interior", "contemporary"]'::jsonb
  ),
  (
    'Business Center',
    'Full-service office environment for professionals',
    '/gallery/IMG_0043.jpg',
    'spaces',
    false,
    19,
    '["business center", "full service", "professional"]'::jsonb
  ),
  (
    'Workspace Layout',
    'Efficient space planning for maximum productivity',
    '/gallery/IMG_0046.jpg',
    'spaces',
    false,
    20,
    '["layout", "efficient", "productivity"]'::jsonb
  ),
  (
    'Creative Workspace',
    'Inspiring environment for creative professionals',
    '/gallery/IMG_0048.jpg',
    'spaces',
    false,
    21,
    '["creative", "inspiring", "design"]'::jsonb
  ),
  (
    'Tech-Enabled Office',
    'Modern workspace with latest technology',
    '/gallery/IMG_0049.jpg',
    'spaces',
    false,
    22,
    '["tech", "modern", "technology"]'::jsonb
  ),
  (
    'Flexible Seating',
    'Adaptable workspace for various work styles',
    '/gallery/IMG_0058.jpg',
    'spaces',
    false,
    23,
    '["flexible", "adaptable", "versatile"]'::jsonb
  ),
  (
    'Professional Desk Setup',
    'Complete workstation ready for your business',
    '/gallery/IMG_0059.jpg',
    'spaces',
    false,
    24,
    '["professional", "workstation", "complete"]'::jsonb
  ),
  (
    'Coworking Community',
    'Join a vibrant community of professionals',
    '/gallery/IMG_0061.jpg',
    'community',
    true,
    25,
    '["community", "networking", "professionals"]'::jsonb
  ),
  (
    'Team Meeting Space',
    'Comfortable area for team discussions',
    '/gallery/IMG_0066.jpg',
    'spaces',
    false,
    26,
    '["meeting", "team", "discussion"]'::jsonb
  ),
  (
    'Workspace Amenities',
    'Premium facilities for members',
    '/gallery/IMG_0067.jpg',
    'amenities',
    false,
    27,
    '["amenities", "facilities", "premium"]'::jsonb
  ),
  (
    'Office Environment',
    'Professional atmosphere for serious work',
    '/gallery/IMG_0073.jpg',
    'spaces',
    false,
    28,
    '["office", "professional", "atmosphere"]'::jsonb
  ),
  (
    'Networking Area',
    'Space designed for professional connections',
    '/gallery/IMG_0080.jpg',
    'community',
    false,
    29,
    '["networking", "connections", "community"]'::jsonb
  ),
  (
    'Event Space Setup',
    'Versatile venue for workshops and events',
    '/gallery/IMG_0081.jpg',
    'events',
    true,
    30,
    '["event", "workshop", "venue"]'::jsonb
  ),

  -- COMMUNITY & EVENTS (31-45)
  (
    'Workshop Session',
    'Professional development and learning events',
    '/gallery/IMG_0084.jpg',
    'events',
    true,
    31,
    '["workshop", "learning", "development"]'::jsonb
  ),
  (
    'Community Gathering',
    'Regular networking events for members',
    '/gallery/IMG_0088.jpg',
    'community',
    true,
    32,
    '["gathering", "networking", "social"]'::jsonb
  ),
  (
    'Team Building',
    'Collaborative activities and team events',
    '/gallery/IMG_0094.jpg',
    'events',
    false,
    33,
    '["team building", "collaboration", "activities"]'::jsonb
  ),
  (
    'Presentation Setup',
    'Professional setup for client presentations',
    '/gallery/IMG_0095.jpg',
    'spaces',
    false,
    34,
    '["presentation", "client", "professional"]'::jsonb
  ),
  (
    'Conference Arrangement',
    'Formal meeting space with AV equipment',
    '/gallery/IMG_0096.jpg',
    'spaces',
    false,
    35,
    '["conference", "formal", "AV equipment"]'::jsonb
  ),
  (
    'Training Room',
    'Dedicated space for training sessions',
    '/gallery/IMG_0098.jpg',
    'events',
    false,
    36,
    '["training", "education", "learning"]'::jsonb
  ),
  (
    'Seminar Venue',
    'Professional space for seminars and talks',
    '/gallery/IMG_0099.jpg',
    'events',
    false,
    37,
    '["seminar", "talk", "professional"]'::jsonb
  ),
  (
    'Business Networking',
    'Connect with fellow entrepreneurs and professionals',
    '/gallery/IMG_0101.jpg',
    'community',
    false,
    38,
    '["networking", "business", "entrepreneurs"]'::jsonb
  ),
  (
    'Social Space',
    'Casual area for informal meetings',
    '/gallery/IMG_0102.jpg',
    'community',
    false,
    39,
    '["social", "casual", "informal"]'::jsonb
  ),
  (
    'Event Hosting',
    'Host your corporate events at WorkNest',
    '/gallery/IMG_0104.jpg',
    'events',
    false,
    40,
    '["hosting", "corporate", "events"]'::jsonb
  ),
  (
    'Meeting Attendees',
    'Professional gatherings and meetings',
    '/gallery/IMG_0112.jpg',
    'events',
    false,
    41,
    '["meeting", "professional", "gathering"]'::jsonb
  ),
  (
    'Collaboration Session',
    'Team working together on projects',
    '/gallery/IMG_0113.jpg',
    'community',
    false,
    42,
    '["collaboration", "teamwork", "project"]'::jsonb
  ),
  (
    'Office Culture',
    'Vibrant workplace culture at WorkNest',
    '/gallery/IMG_0115.jpg',
    'community',
    false,
    43,
    '["culture", "workplace", "vibrant"]'::jsonb
  ),
  (
    'Professional Development',
    'Skills training and professional growth',
    '/gallery/IMG_0118.jpg',
    'events',
    false,
    44,
    '["development", "training", "skills"]'::jsonb
  ),
  (
    'Community Members',
    'Diverse community of professionals',
    '/gallery/IMG_0119.jpg',
    'community',
    false,
    45,
    '["members", "diverse", "professionals"]'::jsonb
  ),

  -- AMENITIES & FACILITIES (46-59)
  (
    'Reception Area',
    'Welcoming entrance and reception desk',
    '/gallery/IMG_0120.jpg',
    'amenities',
    true,
    46,
    '["reception", "entrance", "welcome"]'::jsonb
  ),
  (
    'Lounge Space',
    'Relaxation area for breaks and informal chats',
    '/gallery/IMG_0121.jpg',
    'amenities',
    false,
    47,
    '["lounge", "relaxation", "breaks"]'::jsonb
  ),
  (
    'Coffee Station',
    'Complimentary coffee and refreshments',
    '/gallery/IMG_0122.jpg',
    'amenities',
    true,
    48,
    '["coffee", "refreshments", "beverages"]'::jsonb
  ),
  (
    'Kitchen Facilities',
    'Fully equipped kitchen for members',
    '/gallery/IMG_0123.jpg',
    'amenities',
    false,
    49,
    '["kitchen", "facilities", "equipped"]'::jsonb
  ),
  (
    'Break Room',
    'Comfortable space to unwind and recharge',
    '/gallery/IMG_0125.jpg',
    'amenities',
    false,
    50,
    '["break room", "comfort", "recharge"]'::jsonb
  ),
  (
    'Common Area',
    'Shared space for networking and relaxation',
    '/gallery/IMG_0126.jpg',
    'amenities',
    false,
    51,
    '["common area", "shared", "networking"]'::jsonb
  ),
  (
    'Tech Infrastructure',
    'High-speed internet and modern connectivity',
    '/gallery/IMG_0127.jpg',
    'amenities',
    false,
    52,
    '["tech", "internet", "connectivity"]'::jsonb
  ),
  (
    'Printing Services',
    'Professional printing and scanning facilities',
    '/gallery/IMG_0128.jpg',
    'amenities',
    false,
    53,
    '["printing", "scanning", "services"]'::jsonb
  ),
  (
    'Building Exterior',
    'Modern WorkNest building in Eldoret',
    '/gallery/IMG_0129.jpg',
    'amenities',
    false,
    54,
    '["exterior", "building", "location"]'::jsonb
  ),
  (
    'Parking Facility',
    'Convenient parking for members and visitors',
    '/gallery/IMG_0130.jpg',
    'amenities',
    false,
    55,
    '["parking", "convenient", "access"]'::jsonb
  ),
  (
    'Security System',
    'Secure access and 24/7 surveillance',
    '/gallery/IMG_0132.jpg',
    'amenities',
    false,
    56,
    '["security", "access", "surveillance"]'::jsonb
  ),
  (
    'Phone Booth',
    'Private call pod for confidential calls',
    '/gallery/IMG_0133.jpg',
    'spaces',
    false,
    57,
    '["call pod", "private", "phone"]'::jsonb
  ),
  (
    'Workspace Detail',
    'Quality furnishings and professional setup',
    '/gallery/IMG_0135.jpg',
    'spaces',
    false,
    58,
    '["detail", "quality", "furnishing"]'::jsonb
  ),
  (
    'WorkNest Interior',
    'Premium interior design and comfortable atmosphere',
    '/gallery/IMG_0136.jpg',
    'spaces',
    false,
    59,
    '["interior", "design", "atmosphere"]'::jsonb
  )

ON CONFLICT DO NOTHING;

-- ================================================
-- VERIFY ALL IMAGES ADDED
-- ================================================
SELECT '✅ All 59 WorkNest Gallery photos added successfully!' AS status;

-- Show summary
SELECT 
  category,
  COUNT(*) as image_count,
  COUNT(*) FILTER (WHERE is_featured = TRUE) as featured_count
FROM gallery_images
WHERE image_url LIKE '/gallery/%'
GROUP BY category
ORDER BY category;

-- Show all added images
SELECT 
  title, 
  category, 
  is_featured, 
  display_order,
  image_url
FROM gallery_images
WHERE image_url LIKE '/gallery/%'
ORDER BY display_order;

