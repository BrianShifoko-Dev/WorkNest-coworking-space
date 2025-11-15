-- ===================================
-- CREATE PAYMENTS TABLE
-- ===================================
-- Run this in Supabase SQL Editor

-- 1. Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL,
  customer_id UUID NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'KES',
  payment_method VARCHAR(50) DEFAULT 'mpesa', -- mpesa, card, cash
  payment_status VARCHAR(50) DEFAULT 'pending', -- pending, processing, completed, failed, refunded
  
  -- M-Pesa specific fields
  mpesa_receipt_number VARCHAR(255) UNIQUE,
  mpesa_phone_number VARCHAR(20),
  mpesa_transaction_id VARCHAR(255),
  mpesa_checkout_request_id VARCHAR(255),
  
  -- Transaction details
  transaction_date TIMESTAMPTZ,
  description TEXT,
  reference_number VARCHAR(255),
  
  -- Metadata
  metadata JSONB,
  error_message TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create indexes
CREATE INDEX IF NOT EXISTS idx_payments_booking ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_customer ON payments(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_payments_method ON payments(payment_method);
CREATE INDEX IF NOT EXISTS idx_payments_mpesa_receipt ON payments(mpesa_receipt_number);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at);

-- 3. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 4. Create trigger for updated_at
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. Enable RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 6. Create policies
CREATE POLICY "Allow service role all operations"
  ON payments FOR ALL
  TO service_role
  USING (true) WITH CHECK (true);

CREATE POLICY "Allow anon to insert"
  ON payments FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow anon to read"
  ON payments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Allow anon to update"
  ON payments FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- 7. Verify
SELECT 'Payments table created successfully!' as status;
SELECT COUNT(*) as total_payments FROM payments;

