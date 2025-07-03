
export type Resident = {
  name: string;
  address: string;
  phone: string;
  email: string;
};

export const announcements = [
  {
    title: "Community Garden Meeting",
    content: "Join us this Saturday at 10 AM to plan the new community garden. All residents are welcome to participate and share their ideas.",
    date: "2024-08-15",
  },
  {
    title: "Neighborhood Watch Update",
    content: "There will be a brief meeting on Tuesday evening to discuss recent security enhancements and neighborhood watch patrol schedules.",
    date: "2024-08-12",
  },
  {
    title: "Annual Summer BBQ",
    content: "Get ready for our annual summer BBQ! It will be held at the community park on August 25th. Food, games, and fun for the whole family.",
    date: "2024-08-10",
  },
   {
    title: "Road Maintenance Notice",
    content: "Please be aware that road maintenance will be conducted on Stoneyard Lane from August 18th to 20th. Expect minor delays.",
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

export const classifieds = [
  {
    id: '1',
    title: "Mountain Bike",
    price: 250,
    description: "Slightly used mountain bike, great condition. Perfect for trails around the neighborhood.",
    image: "https://placehold.co/600x400.png",
    imageHint: "mountain bike",
  },
  {
    id: '2',
    title: "Toddler Car Seat",
    price: 50,
    description: "Clean and safe toddler car seat. Our child has outgrown it. All straps and buckles included.",
    image: "https://placehold.co/600x400.png",
    imageHint: "car seat",
  },
  {
    id: '3',
    title: "Patio Furniture Set",
    price: 150,
    description: "Wicker patio set with two chairs and a small table. Cushions included. Great for a small balcony or porch.",
    image: "https://placehold.co/600x400.png",
    imageHint: "patio furniture",
  },
  {
    id: '4',
    title: "Assorted House Plants",
    price: 10,
    description: "Various house plants for sale. Snake plants, pothos, and succulents available. Brighten up your home!",
    image: "https://placehold.co/600x400.png",
    imageHint: "house plants",
  },
];

export const events = [
  {
    title: "National Night Out",
    date: "August 6, 2024",
    time: "6:00 PM - 8:00 PM",
    location: "Community Park",
    description: "Join your neighbors and local law enforcement for an evening of community building.",
  },
  {
    title: "Yoga in the Park",
    date: "Every Saturday",
    time: "9:00 AM",
    location: "Green Valley Park",
    description: "Start your weekend with a relaxing and rejuvenating yoga session. All levels welcome.",
  },
  {
    title: "Cimahpar Stoneyard Garage Sale",
    date: "September 14, 2024",
    time: "8:00 AM - 2:00 PM",
    location: "Throughout the neighborhood",
    description: "Community-wide garage sale. Find hidden treasures and meet your neighbors.",
  },
];

export const securitySchedule = [
    {
        shift: "Morning Patrol (6 AM - 2 PM)",
        area: "North Sector (Stoneyard Lane, Green Valley Rd)",
        personnel: "Officer Budi & Officer Chandra",
    },
    {
        shift: "Afternoon Patrol (2 PM - 10 PM)",
        area: "South Sector (Cimahpar Circle, Suburbia Ave)",
        personnel: "Officer Dewi & Officer Eka",
    },
    {
        shift: "Night Patrol (10 PM - 6 AM)",
        area: "All Sectors",
        personnel: "Officer Fajar & Officer Gita",
    },
    {
        shift: "Weekend Rover",
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
    { id: "IR001", date: "2024-07-28", type: "Suspicious Vehicle", status: "Resolved", summary: "A suspicious vehicle was reported near the park. Officers investigated and confirmed it belonged to a visiting relative."},
    { id: "IR002", date: "2024-07-25", type: "Noise Complaint", status: "Closed", summary: "Loud music reported at 11 PM. Officers advised the resident to lower the volume."},
    { id: "IR003", date: "2024-07-22", type: "Stray Animal", status: "Resolved", summary: "A lost dog was found and safely returned to its owner on Cimahpar Circle."},
    { id: "IR004", date: "2024-07-20", type: "Vandalism", status: "Under Investigation", summary: "Graffiti found on the community center wall. Awaiting security camera footage review."},
]

export const associationManagement = [
    {
        name: "Bapak Ketua RT",
        position: "Ketua RT",
        phone: "555-0101",
        email: "ketua.rt@cimahpar.com",
    },
    {
        name: "Ibu Sekretaris",
        position: "Sekretaris",
        phone: "555-0102",
        email: "sekretaris@cimahpar.com",
    },
    {
        name: "Bapak Bendahara",
        position: "Bendahara",
        phone: "555-0103",
        email: "bendahara@cimahpar.com",
    },
];

export const iplManagement = [
  {
    residentName: "John Doe",
    address: "Blok A No. 1",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "Lunas",
  },
  {
    residentName: "Jane Smith",
    address: "Blok A No. 2",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "Lunas",
  },
  {
    residentName: "Ahmad Subarjo",
    address: "Blok A No. 3",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "Belum Lunas",
  },
  {
    residentName: "Siti Rahayu",
    address: "Blok A No. 4",
    month: "Juli",
    year: 2024,
    amount: 150000,
    status: "Lunas",
  },
    {
    residentName: "John Doe",
    address: "Blok A No. 1",
    month: "Juni",
    year: 2024,
    amount: 150000,
    status: "Lunas",
  },
];

export const financialReportData = {
  summary: {
    totalIncome: 45000000,
    totalExpense: 12500000,
    currentBalance: 32500000,
  },
  monthlyOverview: [
    { month: "Mar", income: 7000000, expense: 2000000 },
    { month: "Apr", income: 7500000, expense: 2200000 },
    { month: "Mei", income: 7200000, expense: 2500000 },
    { month: "Jun", income: 7800000, expense: 1800000 },
    { month: "Jul", income: 8000000, expense: 2100000 },
    { month: "Agu", income: 7500000, expense: 1900000 },
  ],
  transactions: [
    { id: 1, date: "2024-08-05", description: "Gaji Keamanan - Juli", type: "expense", amount: 5000000 },
    { id: 2, date: "2024-08-05", description: "Iuran IPL Warga - Juli", type: "income", amount: 7500000 },
    { id: 3, date: "2024-08-02", description: "Biaya Kebersihan", type: "expense", amount: 1200000 },
    { id: 4, date: "2024-07-28", description: "Perbaikan Lampu Jalan", type: "expense", amount: 800000 },
    { id: 5, date: "2024-07-15", description: "Sewa Fasilitas (Hall)", type: "income", amount: 500000 },
  ],
};
