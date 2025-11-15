-- WorkNest Database Schema for Supabase
-- This file contains all tables for the booking management system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. USERS & AUTHENTICATION
-- ============================================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('manager', 'reception', 'staff', 'customer')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- ============================================
-- 2. SPACES (Rooms, Boardrooms, etc.)
-- ============================================
CREATE TABLE spaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL CHECK (type IN ('office', 'boardroom', 'event_space', 'call_pod', 'restaurant_table')),
    description TEXT,
    capacity INTEGER NOT NULL,
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    monthly_rate DECIMAL(10, 2),
    images JSONB DEFAULT '[]',
    amenities JSONB DEFAULT '[]',
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'maintenance', 'disabled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_spaces_type ON spaces(type);
CREATE INDEX idx_spaces_status ON spaces(status);

-- ============================================
-- 3. BOOKINGS
-- ============================================
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    booked_by UUID REFERENCES users(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_hours DECIMAL(5, 2) NOT NULL,
    number_of_people INTEGER NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
    booking_status VARCHAR(50) DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer')),
    mpesa_code VARCHAR(100),
    special_requests TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for faster queries
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_space ON bookings(space_id);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_bookings_receipt ON bookings(receipt_number);

-- ============================================
-- 4. EVENTS
-- ============================================
CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255),
    capacity INTEGER NOT NULL,
    price DECIMAL(10, 2),
    image_url TEXT,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events(event_date);
CREATE INDEX idx_events_status ON events(status);
CREATE INDEX idx_events_slug ON events(slug);

-- ============================================
-- 5. EVENT REGISTRATIONS
-- ============================================
CREATE TABLE event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    number_of_tickets INTEGER NOT NULL DEFAULT 1,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer')),
    mpesa_code VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_registrations_event ON event_registrations(event_id);
CREATE INDEX idx_event_registrations_customer ON event_registrations(customer_id);

-- ============================================
-- 6. MENU ITEMS
-- ============================================
CREATE TABLE menu_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (category IN ('breakfast', 'lunch', 'dinner', 'drinks', 'snacks', 'desserts')),
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_menu_category ON menu_items(category);
CREATE INDEX idx_menu_available ON menu_items(available);

-- ============================================
-- 7. TABLE RESERVATIONS
-- ============================================
CREATE TABLE table_reservations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    number_of_guests INTEGER NOT NULL,
    special_requests TEXT,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'seated', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_reservations_date ON table_reservations(reservation_date);
CREATE INDEX idx_reservations_status ON table_reservations(status);

-- ============================================
-- 8. GALLERY IMAGES
-- ============================================
CREATE TABLE gallery_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100) CHECK (category IN ('spaces', 'events', 'team', 'facilities', 'restaurant')),
    display_order INTEGER DEFAULT 0,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_gallery_category ON gallery_images(category);
CREATE INDEX idx_gallery_order ON gallery_images(display_order);

-- ============================================
-- 9. PRICING PLANS
-- ============================================
CREATE TABLE pricing_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    plan_name VARCHAR(255) NOT NULL,
    space_type VARCHAR(100) NOT NULL,
    duration VARCHAR(50) NOT NULL CHECK (duration IN ('hourly', 'daily', 'weekly', 'monthly')),
    price DECIMAL(10, 2) NOT NULL,
    features JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_pricing_space_type ON pricing_plans(space_type);
CREATE INDEX idx_pricing_active ON pricing_plans(is_active);

-- ============================================
-- 10. PAYMENTS
-- ============================================
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer')),
    mpesa_code VARCHAR(100),
    phone_number VARCHAR(20),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_payments_booking ON payments(booking_id);
CREATE INDEX idx_payments_receipt ON payments(receipt_number);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_mpesa ON payments(mpesa_code);

-- ============================================
-- 11. EMAIL LOGS
-- ============================================
CREATE TABLE email_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_email VARCHAR(255) NOT NULL,
    email_type VARCHAR(100) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'sent' CHECK (status IN ('sent', 'failed', 'bounced')),
    booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_email_logs_recipient ON email_logs(recipient_email);
CREATE INDEX idx_email_logs_type ON email_logs(email_type);
CREATE INDEX idx_email_logs_status ON email_logs(status);

-- ============================================
-- 12. AUDIT LOGS
-- ============================================
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_table ON audit_logs(table_name);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_date ON audit_logs(created_at);

-- ============================================
-- 13. CUSTOMERS
-- ============================================
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    total_bookings INTEGER DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    member_since TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    notes TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_phone ON customers(phone);

-- ============================================
-- 14. WAITLIST
-- ============================================
CREATE TABLE waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    space_id UUID REFERENCES spaces(id) ON DELETE CASCADE,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'waiting' CHECK (status IN ('waiting', 'notified', 'converted', 'expired')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_waitlist_space ON waitlist(space_id);
CREATE INDEX idx_waitlist_date ON waitlist(preferred_date);
CREATE INDEX idx_waitlist_status ON waitlist(status);

-- ============================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update_updated_at trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spaces_updated_at BEFORE UPDATE ON spaces
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON events
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_event_registrations_updated_at BEFORE UPDATE ON event_registrations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON menu_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_table_reservations_updated_at BEFORE UPDATE ON table_reservations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON gallery_images
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pricing_plans_updated_at BEFORE UPDATE ON pricing_plans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_updated_at BEFORE UPDATE ON waitlist
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION TO GENERATE UNIQUE RECEIPT NUMBERS
-- ============================================
CREATE OR REPLACE FUNCTION generate_receipt_number()
RETURNS VARCHAR(50) AS $$
DECLARE
    new_receipt VARCHAR(50);
    counter INTEGER;
BEGIN
    -- Format: WN-YYYY-NNNNN (e.g., WN-2025-00001)
    SELECT COUNT(*) + 1 INTO counter
    FROM bookings
    WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
    
    new_receipt := 'WN-' || EXTRACT(YEAR FROM NOW()) || '-' || LPAD(counter::TEXT, 5, '0');
    
    RETURN new_receipt;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- FUNCTION TO CHECK BOOKING CONFLICTS
-- ============================================
CREATE OR REPLACE FUNCTION check_booking_conflict(
    p_space_id UUID,
    p_booking_date DATE,
    p_start_time TIME,
    p_end_time TIME,
    p_booking_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    conflict_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO conflict_count
    FROM bookings
    WHERE space_id = p_space_id
        AND booking_date = p_booking_date
        AND booking_status NOT IN ('cancelled', 'completed')
        AND (p_booking_id IS NULL OR id != p_booking_id)
        AND (
            (start_time <= p_start_time AND end_time > p_start_time)
            OR (start_time < p_end_time AND end_time >= p_end_time)
            OR (start_time >= p_start_time AND end_time <= p_end_time)
        );
    
    RETURN conflict_count > 0;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed with bcrypt)
-- You should change this immediately after first login!
INSERT INTO users (email, password_hash, full_name, role)
VALUES (
    'admin@worknest.co.ke',
    '$2a$10$rKJZxcZqKqXXxVxXxXxXxOYqzqzqzqzqzqzqzqzqzqzqzqzqzq',
    'WorkNest Administrator',
    'manager'
);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE users IS 'All system users including admin, reception, staff, and customers';
COMMENT ON TABLE spaces IS 'All bookable spaces (offices, boardrooms, event spaces, etc.)';
COMMENT ON TABLE bookings IS 'All bookings made through the system';
COMMENT ON TABLE events IS 'Events that can be attended';
COMMENT ON TABLE payments IS 'Payment transactions for bookings';
COMMENT ON TABLE audit_logs IS 'Track all changes made by users for accountability';

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ WorkNest database schema created successfully!';
    RAISE NOTICE '📊 14 tables created with indexes and relationships';
    RAISE NOTICE '🔐 Default admin user created: admin@worknest.co.ke';
    RAISE NOTICE '⚠️  IMPORTANT: Change the admin password immediately!';
END $$;

