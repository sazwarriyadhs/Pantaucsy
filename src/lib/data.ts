
export type Resident = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export type ClassifiedAd = {
  id: string;
  titleKey: string;
  price: number;
  image: string;
  imageHint: string;
  phone:string;
  status: "active" | "expired" | "pending_review";
  expiryDate: string;
  submittedBy: string;
};

export type WhatsAppMessage = {
  id: string;
  sender: string;
  isMe: boolean;
  message: string;
  timestamp: string;
};

export const announcements = [
  {
    titleKey: "tpq_congratulations",
    date: "2024-08-16",
    image: "/images/mumtaz.jpg",
    imageHint: "children students",
  },
  {
    titleKey: "obituary_aswin",
    date: "2025-06-24",
    image: "/images/obituary_aswin.jpg",
    imageHint: "condolence flowers",
  },
  {
    titleKey: "garden_meeting",
    date: "2024-08-15",
  },
  {
    titleKey: "watch_update",
    date: "2024-08-12",
  },
  {
    titleKey: "summer_bbq",
    date: "2024-08-10",
  },
   {
    titleKey: "road_maintenance",
    date: "2024-08-09",
  },
];

export const residents: Resident[] = [
  {
    name: "John Doe",
    address: "Blok A No. 1",
    phone: "555-1234",
    email: "john.doe@example.com",
  },
  {
    name: "Jane Smith",
    address: "Blok A No. 2",
    phone: "555-5678",
    email: "jane.smith@example.com",
  },
  {
    name: "Ahmad Subarjo",
    address: "Blok A No. 3",
    phone: "555-9012",
    email: "ahmad.subarjo@example.com",
  },
  {
    name: "Siti Rahayu",
    address: "Blok A No. 4",
    phone: "555-3456",
    email: "siti.rahayu@example.com",
  },
  {
    name: "Budi Santoso",
    address: "Blok B No. 1",
    phone: "0812-3333-4444",
    email: "budi.santoso@example.com",
  },
  {
    name: "Citra Lestari",
    address: "Blok B No. 2",
    phone: "0812-5555-6666",
    email: "citra.lestari@example.com",
  },
  {
    name: "Doni Hidayat",
    address: "Blok B No. 3",
    phone: "0812-7777-8888",
    email: "doni.hidayat@example.com",
  },
  {
    name: "Eka Putri",
    address: "Blok B No. 4",
    phone: "0813-1111-2222",
    email: "eka.putri@example.com",
  },
  {
    name: "Fajar Nugraha",
    address: "Blok C No. 1",
    phone: "0813-3333-4444",
    email: "fajar.nugraha@example.com",
  },
  {
    name: "Gita Permata",
    address: "Blok C No. 2",
    phone: "0813-5555-6666",
    email: "gita.permata@example.com",
  },
  {
    name: "Hendra Wijaya",
    address: "Blok C No. 3",
    phone: "0813-7777-8888",
    email: "hendra.wijaya@example.com",
  },
  {
    name: "Indah Sari",
    address: "Blok C No. 4",
    phone: "0815-1111-2222",
    email: "indah.sari@example.com",
  },
  {
    name: "Joko Susanto",
    address: "Blok D No. 1",
    phone: "0815-3333-4444",
    email: "joko.susanto@example.com",
  },
  {
    name: "Kartika Dewi",
    address: "Blok D No. 2",
    phone: "0815-5555-6666",
    email: "kartika.dewi@example.com",
  },
  {
    name: "Lutfi Hakim",
    address: "Blok D No. 3",
    phone: "0815-7777-8888",
    email: "lutfi.hakim@example.com",
  },
   {
    name: "Maria Yuliana",
    address: "Blok D No. 4",
    phone: "0816-1111-2222",
    email: "maria.yuliana@example.com",
  },
];

export const classifieds: ClassifiedAd[] = [
  {
    id: '1',
    titleKey: 'sepeda_gunung',
    price: 2500000,
    image: "/images/sepeda.jpg",
    imageHint: "mountain bike",
    phone: "6281234567890",
    status: 'active',
    expiryDate: '2024-09-30',
    submittedBy: 'Budi Santoso',
  },
  {
    id: '2',
    titleKey: 'kursi_mobil_balita',
    price: 500000,
    image: "https://placehold.co/600x400.png",
    imageHint: "car seat",
    phone: "6281234567890",
    status: 'active',
    expiryDate: '2024-09-25',
    submittedBy: 'Siti Rahayu',
  },
  {
    id: '3',
    titleKey: 'set_mebel_teras',
    price: 1500000,
    image: "https://placehold.co/600x400.png",
    imageHint: "patio furniture",
    phone: "6281234567890",
    status: 'expired',
    expiryDate: '2024-08-01',
    submittedBy: 'Ahmad Subarjo',
  },
  {
    id: '4',
    titleKey: 'berbagai_tanaman_hias',
    price: 100000,
    image: "https://placehold.co/600x400.png",
    imageHint: "house plants",
    phone: "6281234567890",
    status: 'active',
    expiryDate: '2024-09-28',
    submittedBy: 'Citra Lestari',
  },
  {
    id: '5',
    titleKey: 'jasa_potong_rumput',
    price: 75000,
    image: "https://placehold.co/600x400.png",
    imageHint: "lawn mower",
    phone: "6281512345678",
    status: 'pending_review',
    expiryDate: '2025-12-31',
    submittedBy: 'Fajar Nugraha',
  },
];

export const events = [
  {
    titleKey: "national_night_out",
    date: "2024-08-06",
    time: "6:00 PM - 8:00 PM",
    location: "Community Park",
    isRecurring: false,
  },
  {
    titleKey: "yoga_in_the_park",
    date: "every_saturday",
    time: "9:00 AM",
    location: "Green Valley Park",
    isRecurring: true,
  },
  {
    titleKey: "garage_sale",
    date: "2024-09-14",
    time: "8:00 AM - 2:00 PM",
    location: "Throughout the neighborhood",
    isRecurring: false,
  },
];

export const securitySchedule = [
    {
        shiftKey: "morning",
        area: "North Sector (Stoneyard Lane, Green Valley Rd)",
        personnel: "Officer Budi & Officer Chandra",
    },
    {
        shiftKey: "afternoon",
        area: "South Sector (Cimahpar Circle, Suburbia Ave)",
        personnel: "Officer Dewi & Officer Eka",
    },
    {
        shiftKey: "night",
        area: "All Sectors",
        personnel: "Officer Fajar & Officer Gita",
    },
    {
        shiftKey: "weekend",
        area: "Community Park and common areas",
        personnel: "Officer Haryono",
    },
]

export const securityPersonnel = [
    { id: "SP001", name: "Budi Santoso", phone: "555-1111", shift: "Morning"},
    { id: "SP002", name: "Chandra Wijaya", phone: "555-2222", shift: "Morning"},
    { id: "SP003", name: "Dewi Lestari", phone: "555-3333", shift: "Afternoon"},
    { id: "SP004", name: "Eka Prasetya", phone: "555-4444", shift: "Afternoon"},
    { id: "SP005", name: "Fajar Nugraha", phone: "555-5555", shift: "Night"},
    { id: "SP006", name: "Gita Permata", phone: "555-6666", shift: "Night"},
    { id: "SP007", name: "Haryono Adi", phone: "555-7777", shift: "Weekend"},
]

export const incidentReports = [
    { id: "IR001", date: "2024-07-28", typeKey: "suspicious_vehicle", status: "resolved", summaryKey: "suspicious_vehicle_summary"},
    { id: "IR002", date: "2024-07-25", typeKey: "noise_complaint", status: "closed", summaryKey: "noise_complaint_summary"},
    { id: "IR003", date: "2024-07-22", typeKey: "stray_animal", status: "resolved", summaryKey: "stray_animal_summary"},
    { id: "IR004", date: "2024-07-20", typeKey: "vandalism", status: "investigation", summaryKey: "vandalism_summary"},
]

export const associationManagement = [
    {
        name: "Bapak Ketua RT",
        position: "Chairman",
        phone: "555-0101",
        email: "ketua.rt@cimahpar.com",
        photo: "https://placehold.co/400x400.png",
        photoHint: "man portrait",
    },
    {
        name: "Bapak Wakil Ketua",
        position: "Vice_Chairman",
        phone: "555-0104",
        email: "wakil.ketua@cimahpar.com",
        photo: "https://placehold.co/400x400.png",
        photoHint: "man portrait",
    },
    {
        name: "Ibu Sekretaris",
        position: "Secretary",
        phone: "555-0102",
        email: "sekretaris@cimahpar.com",
        photo: "https://placehold.co/400x400.png",
        photoHint: "woman portrait",
    },
    {
        name: "Bapak Bendahara",
        position: "Treasurer",
        phone: "555-0103",
        email: "bendahara@cimahpar.com",
        photo: "https://placehold.co/400x400.png",
        photoHint: "man portrait",
    },
];

export const iplManagement = [
  {
    residentName: "John Doe",
    address: "Blok A No. 1",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "paid",
  },
  {
    residentName: "Jane Smith",
    address: "Blok A No. 2",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "paid",
  },
  {
    residentName: "Ahmad Subarjo",
    address: "Blok A No. 3",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "unpaid",
  },
  {
    residentName: "Siti Rahayu",
    address: "Blok A No. 4",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "paid",
  },
    {
    residentName: "John Doe",
    address: "Blok A No. 1",
    month: "Juni",
    year: 2024,
    amount: 150000,
    status: "paid",
  },
];

export const financialReportData = {
  summary: {
    totalIncome: 45000000,
    totalExpense: 12500000,
    currentBalance: 32500000,
  },
  monthlyOverview: [
    { monthKey: "mar", income: 7000000, expense: 2000000 },
    { monthKey: "apr", income: 7500000, expense: 2200000 },
    { monthKey: "may", income: 7200000, expense: 2500000 },
    { monthKey: "jun", income: 7800000, expense: 1800000 },
    { monthKey: "jul", income: 8000000, expense: 2100000 },
    { monthKey: "aug", income: 7500000, expense: 1900000 },
  ],
  transactions: [
    { id: 1, date: "2024-08-05", descriptionKey: "security_salary", type: "expense", amount: 5000000 },
    { id: 2, date: "2024-08-05", descriptionKey: "ipl_dues", type: "income", amount: 7500000 },
    { id: 3, date: "2024-08-02", descriptionKey: "cleaning_fee", type: "expense", amount: 1200000 },
    { id: 4, date: "2024-07-28", descriptionKey: "street_light_repair", type: "expense", amount: 800000 },
    { id: 5, date: "2024-07-15", descriptionKey: "facility_rental", type: "income", amount: 500000 },
  ],
};

export const gallery = [
  {
    id: '1',
    titleKey: "independence_day_race",
    image: "https://placehold.co/600x400.png",
    imageHint: "community celebration",
  },
  {
    id: '2',
    titleKey: "community_cleanup",
    image: "https://placehold.co/600x400.png",
    imageHint: "community service",
  },
  {
    id: '3',
    titleKey: "resident_meeting",
    image: "https://placehold.co/600x400.png",
    imageHint: "community meeting",
  },
  {
    id: '4',
    titleKey: "iftar_gathering",
    image: "https://placehold.co/600x400.png",
    imageHint: "community gathering",
  },
  {
    id: '5',
    titleKey: "eid_celebration",
    image: "https://placehold.co/600x400.png",
    imageHint: "traditional celebration",
  },
  {
    id: '6',
    titleKey: "morning_aerobics",
    image: "https://placehold.co/600x400.png",
    imageHint: "morning exercise",
  },
  {
    id: '7',
    titleKey: "community_bazaar",
    image: "https://placehold.co/600x400.png",
    imageHint: "local market",
  },
  {
    id: '8',
    titleKey: "kids_art_performance",
    image: "https://placehold.co/600x400.png",
    imageHint: "children performance",
  },
];

export const wasteManagementSchedule = [
  {
    dayKey: "mon_thu",
    areaKey: "north_sector",
    typeKey: "general_recyclable",
  },
  {
    dayKey: "tue_fri",
    areaKey: "south_sector",
    typeKey: "general_recyclable",
  },
  {
    dayKey: "first_saturday",
    areaKey: "all_sectors",
    typeKey: "garden_bulky",
  },
];

export const whatsappFeed: WhatsAppMessage[] = [
  { id: '1', sender: 'Admin Paguyuban', isMe: false, message: 'Selamat pagi warga, jangan lupa besok ada kerja bakti jam 8 pagi ya.', timestamp: '08:00' },
  { id: '2', sender: 'John Doe', isMe: false, message: 'Siap, Pak Admin! Saya akan ikut serta.', timestamp: '08:05' },
  { id: '3', sender: 'Siti Rahayu', isMe: false, message: 'Alat-alat apa saja yang perlu dibawa, Pak?', timestamp: '08:06' },
  { id: '4', sender: 'Admin Paguyuban', isMe: false, message: 'Cukup bawa alat kebersihan pribadi seperti sapu lidi atau cangkul kecil. Sarung tangan dan kantong sampah akan disediakan.', timestamp: '08:10' },
  { id: '5', sender: 'You', isMe: true, message: 'Baik, terima kasih informasinya!', timestamp: '08:15' },
  { id: '6', sender: 'Budi Santoso', isMe: false, message: 'Saya ada beberapa gerobak dorong yang tidak terpakai, nanti saya bawa untuk membantu angkut sampah.', timestamp: '08:20' },
  { id: '7', sender: 'Admin Paguyuban', isMe: false, message: 'Wah, bagus sekali Pak Budi. Sangat membantu. Terima kasih banyak!', timestamp: '08:21' },
  { id: '8', sender: 'You', isMe: true, message: 'Luar biasa! Sampai jumpa besok pagi semua.', timestamp: '08:25' },
];
    

    



    






