-- ===================================
-- CREATE EMAIL LOGS TABLE
-- ===================================
-- Run this in Supabase SQL Editor

-- 1. Create email_logs table
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  to_email VARCHAR(255) NOT NULL,
  from_email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  email_type VARCHAR(100), -- booking_confirmation, receipt, admin_notification, general
  status VARCHAR(50) DEFAULT 'pending', -- pending, sent, failed
  error_message TEXT,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  customer_id UUID REFERENCES customers(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_email_logs_email ON email_logs(to_email);
CREATE INDEX IF NOT EXISTS idx_email_logs_type ON email_logs(email_type);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_booking ON email_logs(booking_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- 3. Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- 4. Create policies
CREATE POLICY "Allow authenticated users to read email logs"
  ON email_logs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow authenticated users to insert email logs"
  ON email_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- 5. Verify
SELECT 'Email logs table created successfully!' as status;
SELECT COUNT(*) as total_logs FROM email_logs;

