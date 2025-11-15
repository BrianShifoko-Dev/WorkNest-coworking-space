-- ===================================
-- CREATE EMAIL LOGS TABLE (FIXED VERSION)
-- ===================================
-- This version avoids column name conflicts and foreign key issues

-- Drop existing table if there are issues
DROP TABLE IF EXISTS email_logs CASCADE;

-- Create email_logs table
CREATE TABLE email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_email VARCHAR(255) NOT NULL,
  sender_email VARCHAR(255) NOT NULL,
  email_subject VARCHAR(500) NOT NULL,
  email_type VARCHAR(100), -- booking_confirmation, receipt, admin_notification, general
  email_status VARCHAR(50) DEFAULT 'pending', -- pending, sent, failed
  error_message TEXT,
  booking_id UUID,
  customer_id UUID,
  sent_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_status ON email_logs(email_status);
CREATE INDEX idx_email_logs_booking ON email_logs(booking_id);
CREATE INDEX idx_email_logs_created ON email_logs(created_at);

-- Enable Row Level Security
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (allow service role and anon to access)
CREATE POLICY "Allow all operations for service role"
  ON email_logs
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow anon to insert"
  ON email_logs
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to read"
  ON email_logs
  FOR SELECT
  TO anon
  USING (true);

-- Verify table creation
SELECT 'Email logs table created successfully!' as status;
SELECT COUNT(*) as total_logs FROM email_logs;

