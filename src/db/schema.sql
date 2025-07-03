-- Skema Database untuk Aplikasi Cimahpar Hub

-- Hapus tabel jika sudah ada untuk memungkinkan pembuatan ulang yang bersih
DROP TABLE IF EXISTS ipl_payments, issue_reports, classifieds, incident_reports, curhat_warga, announcements, events, gallery_photos, waste_schedules, security_personnel, association_management, residents CASCADE;

-- Tabel untuk menyimpan data semua warga
CREATE TABLE residents (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk pengurus paguyuban
CREATE TABLE association_management (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(100) NOT NULL,
    phone VARCHAR(50),
    email VARCHAR(255) UNIQUE
);

-- Tabel untuk personel keamanan
CREATE TABLE security_personnel (
    id VARCHAR(50) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    shift VARCHAR(50)
);

-- Tabel jadwal pengangkutan sampah
CREATE TABLE waste_schedules (
    id SERIAL PRIMARY KEY,
    day_key VARCHAR(100) NOT NULL,
    area_key VARCHAR(100) NOT NULL,
    type_key VARCHAR(100) NOT NULL
);

-- Tabel untuk foto galeri kegiatan
CREATE TABLE gallery_photos (
    id SERIAL PRIMARY KEY,
    title_key VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    image_hint VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk acara/event komunitas
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title_key VARCHAR(255) NOT NULL,
    description_key TEXT,
    event_date VARCHAR(100) NOT NULL,
    event_time VARCHAR(100),
    location VARCHAR(255),
    is_recurring BOOLEAN DEFAULT FALSE
);

-- Tabel untuk pengumuman warga
CREATE TABLE announcements (
    id SERIAL PRIMARY KEY,
    title_key VARCHAR(255) NOT NULL,
    content_key TEXT,
    publish_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk curhat warga (anonim atau dengan referensi)
CREATE TABLE curhat_warga (
    id SERIAL PRIMARY KEY,
    curhat_text TEXT NOT NULL,
    response_text TEXT,
    reporter_email VARCHAR(255) REFERENCES residents(email) ON DELETE SET NULL, -- Opsional, jika ingin dilacak
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk laporan insiden keamanan
CREATE TABLE incident_reports (
    id SERIAL PRIMARY KEY,
    report_date DATE NOT NULL,
    type_key VARCHAR(100) NOT NULL,
    summary_key TEXT,
    status VARCHAR(50) NOT NULL,
    reported_by_email VARCHAR(255) REFERENCES residents(email)
);

-- Tabel untuk iklan baris
CREATE TABLE classifieds (
    id SERIAL PRIMARY KEY,
    title_key VARCHAR(255) NOT NULL,
    description_key TEXT,
    price DECIMAL(12, 2) NOT NULL,
    image_url VARCHAR(255),
    image_hint VARCHAR(100),
    seller_email VARCHAR(255) NOT NULL REFERENCES residents(email) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk laporan masalah umum dari warga
CREATE TABLE issue_reports (
    id SERIAL PRIMARY KEY,
    reporter_email VARCHAR(255) REFERENCES residents(email),
    report_text TEXT NOT NULL,
    photo_url VARCHAR(255),
    summary TEXT,
    category VARCHAR(50),
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabel untuk iuran IPL warga
CREATE TABLE ipl_payments (
    id SERIAL PRIMARY KEY,
    resident_email VARCHAR(255) NOT NULL REFERENCES residents(email) ON DELETE CASCADE,
    period_month INT NOT NULL,
    period_year INT NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL, -- 'paid', 'unpaid'
    payment_date DATE,
    proof_url VARCHAR(255),
    UNIQUE(resident_email, period_month, period_year)
);


-- Contoh Data untuk Warga (50 entri)
INSERT INTO residents (email, name, address, phone) VALUES
('budi.santoso@example.com', 'Budi Santoso', 'Blok A No. 1', '081234567890'),
('siti.aminah@example.com', 'Siti Aminah', 'Blok A No. 2', '081234567891'),
('agus.wijaya@example.com', 'Agus Wijaya', 'Blok A No. 3', '081234567892'),
('dewi.lestari@example.com', 'Dewi Lestari', 'Blok A No. 4', '081234567893'),
('eko.prasetyo@example.com', 'Eko Prasetyo', 'Blok A No. 5', '081234567894'),
('rini.hartono@example.com', 'Rini Hartono', 'Blok B No. 1', '081345678901'),
('joko.susilo@example.com', 'Joko Susilo', 'Blok B No. 2', '081345678902'),
('ani.rahayu@example.com', 'Ani Rahayu', 'Blok B No. 3', '081345678903'),
('hendra.gunawan@example.com', 'Hendra Gunawan', 'Blok B No. 4', '081345678904'),
('maya.sari@example.com', 'Maya Sari', 'Blok B No. 5', '081345678905'),
('putu.ariyanto@example.com', 'Putu Ariyanto', 'Blok C No. 1', '081567890123'),
('made.wulandari@example.com', 'Made Wulandari', 'Blok C No. 2', '081567890124'),
('nyoman.jaya@example.com', 'Nyoman Jaya', 'Blok C No. 3', '081567890125'),
('ketut.pertiwi@example.com', 'Ketut Pertiwi', 'Blok C No. 4', '081567890126'),
('ida.bagus@example.com', 'Ida Bagus Oka', 'Blok C No. 5', '081567890127'),
('doni.saputra@example.com', 'Doni Saputra', 'Blok D No. 1', '081789012345'),
('fitri.cahyani@example.com', 'Fitri Cahyani', 'Blok D No. 2', '081789012346'),
('guntur.perkasa@example.com', 'Guntur Perkasa', 'Blok D No. 3', '081789012347'),
('halimah.putri@example.com', 'Halimah Putri', 'Blok D No. 4', '081789012348'),
('irfan.hakim@example.com', 'Irfan Hakim', 'Blok D No. 5', '081789012349'),
('lia.marina@example.com', 'Lia Marina', 'Blok E No. 1', '081901234567'),
('muhammad.arif@example.com', 'Muhammad Arif', 'Blok E No. 2', '081901234568'),
('nurul.hidayah@example.com', 'Nurul Hidayah', 'Blok E No. 3', '081901234569'),
('omar.syarif@example.com', 'Omar Syarif', 'Blok E No. 4', '081901234570'),
('pipit.lestari@example.com', 'Pipit Lestari', 'Blok E No. 5', '081901234571'),
('qomar.udin@example.com', 'Qomar Udin', 'Blok F No. 1', '085211223344'),
('ratna.juwita@example.com', 'Ratna Juwita', 'Blok F No. 2', '085211223345'),
('surya.pranata@example.com', 'Surya Pranata', 'Blok F No. 3', '085211223346'),
('tiara.anindita@example.com', 'Tiara Anindita', 'Blok F No. 4', '085211223347'),
('ucup.maulana@example.com', 'Ucup Maulana', 'Blok F No. 5', '085211223348'),
('vina.panduwinata@example.com', 'Vina Panduwinata', 'Blok G No. 1', '085622334455'),
('wawan.setiawan@example.com', 'Wawan Setiawan', 'Blok G No. 2', '085622334456'),
('xenia.larasati@example.com', 'Xenia Larasati', 'Blok G No. 3', '085622334457'),
('yusuf.effendi@example.com', 'Yusuf Effendi', 'Blok G No. 4', '085622334458'),
('zainal.abidin@example.com', 'Zainal Abidin', 'Blok G No. 5', '085622334459'),
('ahmad.zulkarnain@example.com', 'Ahmad Zulkarnain', 'Blok H No. 1', '087733445566'),
('bella.saphira@example.com', 'Bella Saphira', 'Blok H No. 2', '087733445567'),
('chandra.kirana@example.com', 'Chandra Kirana', 'Blok H No. 3', '087733445568'),
('dian.paramita@example.com', 'Dian Paramita', 'Blok H No. 4', '087733445569'),
('fahrul.rozi@example.com', 'Fahrul Rozi', 'Blok H No. 5', '087733445570'),
('galih.prakoso@example.com', 'Galih Prakoso', 'Blok I No. 1', '089944556677'),
('indah.permatasari@example.com', 'Indah Permatasari', 'Blok I No. 2', '089944556678'),
('kurniawan.dwi@example.com', 'Kurniawan Dwi', 'Blok I No. 3', '089944556679'),
('lutfi.hadi@example.com', 'Lutfi Hadi', 'Blok I No. 4', '089944556680'),
('marwan.hamid@example.com', 'Marwan Hamid', 'Blok I No. 5', '089944556681'),
('nadia.vega@example.com', 'Nadia Vega', 'Blok J No. 1', '082155667788'),
('prabowo.adi@example.com', 'Prabowo Adi', 'Blok J No. 2', '082155667789'),
('rahmat.hidayat@example.com', 'Rahmat Hidayat', 'Blok J No. 3', '082155667790'),
('saskia.gotik@example.com', 'Saskia Gotik', 'Blok J No. 4', '082155667791'),
('teuku.umar@example.com', 'Teuku Umar', 'Blok J No. 5', '082155667792');

-- Contoh Data untuk Tabel Lainnya
INSERT INTO association_management (name, position, email, phone) VALUES
('Bapak Ketua RT', 'Chairman', 'ketua.rt@cimahpar.com', '555-0101'),
('Ibu Sekretaris', 'Secretary', 'sekretaris@cimahpar.com', '555-0102'),
('Bapak Bendahara', 'Treasurer', 'bendahara@cimahpar.com', '555-0103');

INSERT INTO security_personnel (id, name, phone, shift) VALUES
('SP001', 'Budi Santoso', '555-1111', 'Morning'),
('SP002', 'Chandra Wijaya', '555-2222', 'Morning'),
('SP003', 'Dewi Lestari', '555-3333', 'Afternoon');

INSERT INTO ipl_payments (resident_email, period_month, period_year, amount, status) VALUES
('budi.santoso@example.com', 8, 2024, 150000, 'paid'),
('siti.aminah@example.com', 8, 2024, 150000, 'paid'),
('agus.wijaya@example.com', 8, 2024, 150000, 'unpaid');

INSERT INTO announcements (title_key, content_key, publish_date) VALUES
('garden_meeting', 'Join us this Saturday at 10 AM to plan the new community garden. All residents are welcome to participate and share their ideas.', '2024-08-15'),
('watch_update', 'There will be a brief meeting on Tuesday evening to discuss recent security enhancements and neighborhood watch patrol schedules.', '2024-08-12');
