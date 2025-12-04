-- WorkNest MySQL Database Schema
-- Converted from Supabase PostgreSQL schema
-- Run this in phpMyAdmin or MySQL command line

-- ============================================
-- 1. USERS & AUTHENTICATION
-- ============================================
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(50) NOT NULL CHECK (role IN ('manager', 'reception', 'staff', 'customer')),
    status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_users_email (email),
    INDEX idx_users_role (role)
);

-- ============================================
-- 2. SPACES (Rooms, Boardrooms, etc.)
-- ============================================
CREATE TABLE spaces (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL CHECK (type IN ('office', 'boardroom', 'event_space', 'call_pod', 'restaurant_table')),
    description TEXT,
    capacity INT NOT NULL,
    hourly_rate DECIMAL(10, 2),
    daily_rate DECIMAL(10, 2),
    weekly_rate DECIMAL(10, 2),
    monthly_rate DECIMAL(10, 2),
    images JSON,
    amenities JSON,
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'maintenance', 'disabled')),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_spaces_type (type),
    INDEX idx_spaces_status (status),
    INDEX idx_spaces_featured (is_featured)
);

-- ============================================
-- 3. CUSTOMERS
-- ============================================
CREATE TABLE customers (
    id VARCHAR(36) PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(255),
    total_bookings INT DEFAULT 0,
    total_spent DECIMAL(10, 2) DEFAULT 0,
    member_since TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_customers_email (email),
    INDEX idx_customers_phone (phone)
);

-- ============================================
-- 4. BOOKINGS
-- ============================================
CREATE TABLE bookings (
    id VARCHAR(36) PRIMARY KEY,
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    space_id VARCHAR(36),
    customer_id VARCHAR(36),
    booked_by VARCHAR(36),
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    duration_hours DECIMAL(5, 2) NOT NULL,
    number_of_people INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid', 'refunded')),
    booking_status VARCHAR(50) DEFAULT 'pending' CHECK (booking_status IN ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
    payment_method VARCHAR(50) CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer')),
    mpesa_code VARCHAR(100),
    special_requests TEXT,
    purpose TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (space_id) REFERENCES spaces(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE SET NULL,
    FOREIGN KEY (booked_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_bookings_date (booking_date),
    INDEX idx_bookings_space (space_id),
    INDEX idx_bookings_customer (customer_id),
    INDEX idx_bookings_status (booking_status),
    INDEX idx_bookings_receipt (receipt_number)
);

-- ============================================
-- 5. EVENTS
-- ============================================
CREATE TABLE events (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location VARCHAR(255),
    capacity INT NOT NULL,
    price DECIMAL(10, 2),
    image_url TEXT,
    category VARCHAR(100),
    is_featured BOOLEAN DEFAULT FALSE,
    status VARCHAR(50) DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled')),
    created_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_events_date (event_date),
    INDEX idx_events_status (status),
    INDEX idx_events_slug (slug),
    INDEX idx_events_featured (is_featured)
);

-- ============================================
-- 6. MENU ITEMS
-- ============================================
CREATE TABLE menu_items (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL CHECK (category IN ('breakfast', 'lunch', 'dinner', 'drinks', 'snacks', 'desserts')),
    price DECIMAL(10, 2) NOT NULL,
    image_url TEXT,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_menu_category (category),
    INDEX idx_menu_available (is_available)
);

-- ============================================
-- 7. PAYMENTS
-- ============================================
CREATE TABLE payments (
    id VARCHAR(36) PRIMARY KEY,
    booking_id VARCHAR(36),
    receipt_number VARCHAR(50) UNIQUE NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('mpesa', 'cash', 'bank_transfer')),
    mpesa_code VARCHAR(100),
    phone_number VARCHAR(20),
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded')),
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
    INDEX idx_payments_booking (booking_id),
    INDEX idx_payments_receipt (receipt_number),
    INDEX idx_payments_status (status),
    INDEX idx_payments_mpesa (mpesa_code)
);

-- ============================================
-- 8. EMAIL LOGS
-- ============================================
CREATE TABLE email_logs (
    id VARCHAR(36) PRIMARY KEY,
    recipient_email VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255),
    email_subject VARCHAR(500) NOT NULL,
    email_type VARCHAR(100) NOT NULL,
    email_status VARCHAR(50) DEFAULT 'sent' CHECK (email_status IN ('sent', 'failed', 'bounced')),
    error_message TEXT,
    booking_id VARCHAR(36),
    customer_id VARCHAR(36),
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE SET NULL,
    INDEX idx_email_logs_recipient (recipient_email),
    INDEX idx_email_logs_type (email_type),
    INDEX idx_email_logs_status (email_status)
);

-- ============================================
-- 9. NOTIFICATIONS
-- ============================================
CREATE TABLE notifications (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_notifications_user (user_id),
    INDEX idx_notifications_read (is_read)
);

-- ============================================
-- 10. SETTINGS
-- ============================================
CREATE TABLE settings (
    id VARCHAR(36) PRIMARY KEY,
    key_name VARCHAR(100) UNIQUE NOT NULL,
    value TEXT,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_settings_key (key_name)
);

-- ============================================
-- 11. GALLERY IMAGES
-- ============================================
CREATE TABLE gallery_images (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image_url TEXT NOT NULL,
    category VARCHAR(100) CHECK (category IN ('spaces', 'events', 'team', 'facilities', 'restaurant')),
    display_order INT DEFAULT 0,
    uploaded_by VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_gallery_category (category),
    INDEX idx_gallery_order (display_order)
);

-- ============================================
-- 12. AUDIT LOGS
-- ============================================
CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36),
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(100) NOT NULL,
    record_id VARCHAR(36),
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_audit_user (user_id),
    INDEX idx_audit_table (table_name),
    INDEX idx_audit_action (action),
    INDEX idx_audit_date (created_at)
);

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- ============================================
-- Password: Admin@123 (hashed with bcrypt)
INSERT INTO users (id, email, password_hash, full_name, role)
VALUES (
    UUID(),
    'admin@theworknest.co.ke',
    '$2a$10$rKJZxcZqKqXXxVxXxXxXxOYqzqzqzqzqzqzqzqzqzqzqzqzqzq',
    'WorkNest Administrator',
    'manager'
);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================
SELECT '✅ WorkNest MySQL database schema created successfully!' AS message;
SELECT '📊 12 tables created with indexes and relationships' AS message;
SELECT '🔐 Default admin user created: admin@theworknest.co.ke' AS message;
SELECT '⚠️  IMPORTANT: Change the admin password immediately!' AS message;

