-- Define custom types for roles and statuses to ensure data integrity.
CREATE TYPE user_role AS ENUM ('superadmin', 'admin', 'warga');
CREATE TYPE ad_status AS ENUM ('active', 'expired', 'sold');
CREATE TYPE payment_status AS ENUM ('paid', 'unpaid');
CREATE TYPE issue_category AS ENUM ('security', 'maintenance', 'waste', 'other');

-- Table for user authentication and roles.
-- This table would store user information from Firebase Auth and app-specific roles.
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY, -- Firebase Auth UID
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(255),
    role user_role NOT NULL DEFAULT 'warga',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for the resident directory.
CREATE TABLE residents (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) UNIQUE REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for community announcements.
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    image_hint VARCHAR(100),
    address TEXT,
    published_at DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for classified ads in the marketplace.
CREATE TABLE classified_ads (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(12, 2) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    image_url VARCHAR(255),
    image_data_uri TEXT, -- For user-uploaded images via camera
    image_hint VARCHAR(100),
    status ad_status NOT NULL DEFAULT 'active',
    expiry_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Table for IPL (Iuran Pemeliharaan Lingkungan) or monthly dues.
CREATE TABLE ipl_payments (
    id SERIAL PRIMARY KEY,
    resident_id INT NOT NULL REFERENCES residents(id) ON DELETE CASCADE,
    period_month INT NOT NULL,
    period_year INT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    status payment_status NOT NULL DEFAULT 'unpaid',
    payment_date DATE,
    payment_proof_url VARCHAR(255),
    confirmed_by_user_id VARCHAR(255) REFERENCES users(id), -- Admin/Superadmin who confirms
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (resident_id, period_month, period_year)
);

-- Table for issue reports from residents.
CREATE TABLE issue_reports (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    report_text TEXT NOT NULL,
    photo_data_uri TEXT,
    ai_summary TEXT,
    ai_category issue_category,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_residents_email ON residents(email);
CREATE INDEX idx_classified_ads_user_id ON classified_ads(user_id);
CREATE INDEX idx_ipl_payments_resident_id ON ipl_payments(resident_id);