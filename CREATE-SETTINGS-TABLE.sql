-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  category VARCHAR(100) NOT NULL, -- 'business', 'operating_hours', 'system', 'email', 'notifications'
  type VARCHAR(50) NOT NULL DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_settings_key ON settings(key);
CREATE INDEX IF NOT EXISTS idx_settings_category ON settings(category);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow all operations for service role"
  ON settings FOR ALL TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon to read"
  ON settings FOR SELECT TO anon
  USING (true);

CREATE POLICY "Allow anon to update"
  ON settings FOR UPDATE TO anon
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon to insert"
  ON settings FOR INSERT TO anon
  WITH CHECK (true);

-- Insert default settings
INSERT INTO settings (key, value, category, type, description) VALUES
-- Business Information
('business_name', 'The WorkNest', 'business', 'string', 'Business name'),
('business_email', 'info@worknest.co.ke', 'business', 'string', 'Contact email'),
('business_phone', '+254 745 319 042', 'business', 'string', 'Contact phone'),
('business_address', 'Eldoret, Kenya', 'business', 'string', 'Physical address'),
('business_description', 'Premium coworking space in Eldoret', 'business', 'string', 'Business description'),
('business_website', 'https://worknest.co.ke', 'business', 'string', 'Website URL'),
('tax_rate', '16', 'business', 'number', 'VAT/Tax rate percentage'),
('currency', 'KES', 'business', 'string', 'Currency code'),

-- Operating Hours (JSON format)
('hours_monday', '{"open": "08:00", "close": "18:00", "is_open": true}', 'operating_hours', 'json', 'Monday hours'),
('hours_tuesday', '{"open": "08:00", "close": "18:00", "is_open": true}', 'operating_hours', 'json', 'Tuesday hours'),
('hours_wednesday', '{"open": "08:00", "close": "18:00", "is_open": true}', 'operating_hours', 'json', 'Wednesday hours'),
('hours_thursday', '{"open": "08:00", "close": "18:00", "is_open": true}', 'operating_hours', 'json', 'Thursday hours'),
('hours_friday', '{"open": "08:00", "close": "18:00", "is_open": true}', 'operating_hours', 'json', 'Friday hours'),
('hours_saturday', '{"open": "09:00", "close": "14:00", "is_open": true}', 'operating_hours', 'json', 'Saturday hours'),
('hours_sunday', '{"open": "00:00", "close": "00:00", "is_open": false}', 'operating_hours', 'json', 'Sunday hours'),

-- System Settings
('site_maintenance', 'false', 'system', 'boolean', 'Maintenance mode'),
('booking_advance_days', '30', 'system', 'number', 'Max days in advance to book'),
('booking_min_duration', '1', 'system', 'number', 'Minimum booking duration (hours)'),
('booking_max_duration', '24', 'system', 'number', 'Maximum booking duration (hours)'),
('cancellation_hours', '24', 'system', 'number', 'Hours before booking to allow cancellation'),
('auto_confirm_bookings', 'false', 'system', 'boolean', 'Auto-confirm bookings'),
('require_payment', 'false', 'system', 'boolean', 'Require payment before booking confirmation'),

-- Email Settings
('email_from_name', 'WorkNest', 'email', 'string', 'Email sender name'),
('email_from_address', 'noreply@worknest.co.ke', 'email', 'string', 'Email sender address'),
('email_footer', 'Thank you for choosing WorkNest!', 'email', 'string', 'Email footer text'),

-- Notification Settings
('notifications_enabled', 'true', 'notifications', 'boolean', 'Enable notifications'),
('notification_sound', 'true', 'notifications', 'boolean', 'Play sound for notifications'),
('desktop_notifications', 'true', 'notifications', 'boolean', 'Enable desktop notifications')

ON CONFLICT (key) DO NOTHING;

-- Verify
SELECT 'Settings table created successfully!' as status;
SELECT COUNT(*) as total_settings FROM settings;
