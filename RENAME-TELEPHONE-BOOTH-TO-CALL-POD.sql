-- ================================================
-- RENAME TELEPHONE BOOTH TO CALL POD
-- ================================================
-- This script updates all references from "telephone_booth"
-- to "call_pod" in the database
-- ================================================

-- 1. Update existing spaces with type 'telephone_booth' to 'call_pod'
UPDATE spaces
SET type = 'call_pod'
WHERE type = 'telephone_booth';

-- 2. Update the space names if they contain "Telephone" or "Booth"
UPDATE spaces
SET name = REPLACE(REPLACE(name, 'Telephone Booth', 'Call Pod'), 'Private Call Booth', 'Private Call Pod')
WHERE type = 'call_pod';

-- 3. Update descriptions that mention "telephone booth" or "booth"
UPDATE spaces
SET description = REPLACE(REPLACE(description, 'telephone booth', 'call pod'), 'booth', 'pod')
WHERE type = 'call_pod';

-- 4. Drop the old CHECK constraint on the type column
ALTER TABLE spaces DROP CONSTRAINT IF EXISTS spaces_type_check;

-- 5. Add new CHECK constraint with 'call_pod' instead of 'telephone_booth'
ALTER TABLE spaces
ADD CONSTRAINT spaces_type_check
CHECK (type IN ('office', 'boardroom', 'event_space', 'call_pod', 'restaurant_table'));

-- ================================================
-- VERIFY CHANGES
-- ================================================
SELECT 'Migration complete! Updated spaces from telephone_booth to call_pod' AS status;

-- Show updated spaces
SELECT id, name, type, description
FROM spaces
WHERE type = 'call_pod';

-- Count by type
SELECT type, COUNT(*) as count
FROM spaces
GROUP BY type
ORDER BY type;

