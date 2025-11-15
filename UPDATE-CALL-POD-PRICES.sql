-- ================================================
-- UPDATE CALL POD PRICES
-- ================================================
-- This script updates the pricing for all Call Pods
-- to the new pricing structure
-- ================================================

-- Update Call Pod pricing
UPDATE spaces
SET 
  hourly_rate = 250.00,
  daily_rate = 950.00,
  weekly_rate = 4500.00,
  monthly_rate = NULL
WHERE type = 'call_pod';

-- Also update description to use "pod" instead of "booth"
UPDATE spaces
SET description = REPLACE(description, 'booth', 'pod')
WHERE type = 'call_pod';

-- ================================================
-- VERIFY CHANGES
-- ================================================
SELECT 'Call Pod prices updated successfully!' AS status;

-- Show updated Call Pods
SELECT 
  id, 
  name, 
  type,
  hourly_rate,
  daily_rate,
  weekly_rate,
  monthly_rate
FROM spaces
WHERE type = 'call_pod';

