
const id = {
  sidebar: {
    announcements: 'Pengumuman',
    residents: 'Warga',
    associationManagement: 'Pengurus Paguyuban',
    staffManagement: 'Manajemen Staf',
    iplManagement: 'Iuran IPL',
    classifieds: 'Iklan Kita',
    postAd: 'Pasang Iklan',
    classifiedsManagement: 'Manajemen Iklan',
    adReview: 'Tinjauan Iklan',
    events: 'Acara',
    gallery: 'Galeri Foto',
    reportIssue: 'Lapor Masalah',
    curhatWarga: 'Curhat Warga',
    whatsappFeed: 'Obrolan Warga',
    security: 'Keamanan',
    schedule: 'Jadwal',
    management: 'Manajemen',
    finance: 'Keuangan',
    paymentConfirmation: 'Konfirmasi Pembayaran',
    financialReport: 'Laporan Keuangan',
    wasteManagement: 'Manajemen Sampah',
    landingPage: 'Halaman Utama',
    general: 'Umum',
    management_tools: 'Alat Manajemen',
  },
  userNav: {
    profile: 'Profil',
    settings: 'Pengaturan',
    language: 'Bahasa',
    currency: 'Mata Uang',
    theme: 'Tema',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    english: 'Inggris',
    indonesian: 'Indonesia',
    role: 'Peran',
    roles: {
      superadmin: 'Super Admin',
      admin: 'Admin',
      warga: 'Warga'
    }
  },
  auth: {
    login: {
      title: 'Masuk',
      description: 'Masukkan kredensial Anda untuk mengakses hub.',
      emailLabel: 'Email',
      passwordLabel: 'Kata Sandi',
      button: 'Masuk',
      noAccount: 'Belum punya akun?',
      register: 'Daftar',
      demoHint: 'Untuk keperluan demo, kolom sudah terisi untuk akun admin. Anda juga dapat menggunakan "john.doe@example.com" untuk akun warga atau mendaftarkan pengguna baru.'
    },
    register: {
      title: 'Daftar',
      description: 'Buat akun baru untuk bergabung dengan komunitas.',
      nameLabel: 'Nama Lengkap',
      emailLabel: 'Email',
      passwordLabel: 'Kata Sandi',
      button: 'Buat Akun',
      haveAccount: 'Sudah punya akun?',
      login: 'Masuk'
    },
    logout: 'Keluar',
    success: {
        register: 'Pendaftaran berhasil! Silakan masuk.'
    },
    error: {
        login: 'Gagal masuk. Silakan periksa kredensial Anda.',
        login_demo: 'Gagal masuk. Jika Anda mencoba menggunakan akun demo (misalnya admin@, john.doe@), silakan daftarkan terlebih dahulu.',
        register: 'Pendaftaran gagal. Email mungkin sudah digunakan.',
        not_configured: 'Firebase tidak dikonfigurasi. Harap tambahkan kredensial Anda ke file .env untuk mengaktifkan autentikasi.',
        invalid_api_key: 'Kesalahan Konfigurasi: Kunci API Firebase tidak valid. Silakan periksa file .env Anda.'
    }
  },
  landing: {
    header: {
      title: 'Nextacular Community Hub',
      login: 'Masuk'
    },
    hero: {
      title: 'Cara yang lebih baik untuk mengelola komunitas Anda',
      subtitle: 'Nextacular Community Hub adalah starter kit sumber terbuka yang membantu Anda membangun dan mengelola platform komunitas secara efisien.',
      cta: 'Mulai'
    },
    features: {
      announcements: {
        title: 'Pengumuman',
        value: '+1,200',
        description: 'anggota tetap terinformasi'
      },
      classifieds: {
        title: 'Pasar',
        value: '+500',
        description: 'barang terjual setiap bulan'
      },
      reporting: {
        title: 'Laporan Masalah',
        value: '98%',
        description: 'tingkat penyelesaian'
      }
    },
    gallery: {
      title: "Galeri Komunitas",
      description: "Momen-momen dari acara komunitas kami yang semarak.",
      cta: "Lihat Galeri Lengkap",
    },
    footer: {
      copyright: '© {year} Nextacular. Hak Cipta Dilindungi.'
    }
  },
  announcements: {
    title: 'Pengumuman',
    description: 'Berita dan pembaruan terkini untuk komunitas Cimahpar Stoneyard.',
  },
  associationManagement: {
    title: 'Pengurus Paguyuban',
    description: 'Daftar pengurus paguyuban warga Cimahpar Stoneyard.',
    tableTitle: 'Pengurus',
    tableDescription: 'Daftar semua pengurus di paguyuban.',
    addManager: 'Tambah Pengurus',
    name: 'Nama',
    position: 'Jabatan',
    phone: 'Telepon',
    email: 'Email',
    salary: 'Gaji',
    positions: {
      chairman: 'Ketua',
      vice_chairman: 'Wakil Ketua',
      secretary: 'Sekretaris',
      treasurer: 'Bendahara'
    }
  },
  staffManagement: {
    title: 'Manajemen Staf',
    description: 'Kelola staf operasional untuk keamanan dan pertamanan, termasuk gaji dan kinerja.',
    addStaff: 'Tambah Staf',
    roles: {
      security: 'Keamanan',
      gardener: 'Taman'
    },
    tableTitle: 'Daftar Staf',
    tableDescription: 'Daftar semua staf operasional. Gaji dibayarkan setiap tanggal 28 melalui transfer bank.',
    name: 'Nama',
    role: 'Peran',
    phone: 'Telepon',
    salary: 'Gaji',
    actions: 'Aksi',
    edit: 'Ubah',
    viewReport: 'Lihat Laporan',
    performanceReportTitle: "Laporan Kinerja untuk {name}",
    performanceReportDescription: "Ringkasan kinerja bulanan dan catatan.",
    delete: {
      button: 'Hapus',
      title: 'Apakah Anda yakin?',
      description: 'Tindakan ini akan menghapus anggota staf "{name}" secara permanen.',
      cancel: 'Batal',
      confirm: 'Hapus Anggota Staf',
      toastSuccessTitle: 'Staf Dihapus',
      toastSuccessDescription: '{name} telah dihapus dari daftar staf.',
    },
    form: {
      addTitle: 'Tambah Anggota Staf Baru',
      addDescription: 'Isi detail untuk anggota staf baru.',
      editTitle: 'Ubah Data Staf',
      editDescription: 'Perbarui detail anggota staf.',
      name: 'Nama Lengkap',
      role: 'Peran',
      rolePlaceholder: 'Pilih peran',
      phone: 'Nomor Telepon',
      salary: 'Gaji Bulanan (IDR)',
      photo: 'URL Foto (Opsional)',
      performanceSummary: 'Ringkasan Kinerja',
      submitAdd: 'Tambah Staf',
      submitEdit: 'Simpan Perubahan',
      toastAddSuccessTitle: 'Staf Ditambahkan',
      toastAddSuccessDescription: '{name} telah ditambahkan ke daftar staf.',
      toastEditSuccessTitle: 'Staf Diperbarui',
      toastEditSuccessDescription: 'Detail untuk {name} telah diperbarui.',
    }
  },
  events: {
    title: 'Acara Komunitas',
    description: 'Acara dan pertemuan mendatang untuk warga Cimahpar Stoneyard.',
    recurring: {
      every_saturday: 'Setiap Sabtu'
    },
  },
  reportIssue: {
    title: 'Lapor Masalah',
    description: 'Laporkan masalah keamanan, pemeliharaan, sampah, atau lainnya di lingkungan.',
    form: {
      title: 'Laporan Masalah Baru',
      description: 'Harap berikan deskripsi rinci tentang masalah tersebut. Asisten AI kami akan merangkum dan mengkategorikannya untuk pemrosesan yang lebih cepat.',
      label: 'Deskripsi Masalah',
      placeholder: 'Contoh: Tempat sampah di depan blok C sudah penuh dan tidak diangkut selama 3 hari...',
      description2: 'Jelaskan sedetail mungkin untuk hasil terbaik.',
      validation: 'Laporan harus minimal 10 karakter.',
      submit: 'Kirim Laporan',
      submitting: 'Menganalisis...',
      addPhoto: 'Tambah Foto',
      takePicture: 'Ambil Gambar',
      retakePicture: 'Ambil Ulang',
    },
    summary: {
      title: 'Analisis AI',
      description: 'Ini adalah ringkasan dan kategori yang akan dikirim ke tim manajemen kami.',
      loading: 'Menghasilkan ringkasan & kategori...',
      category: 'Kategori',
    },
    category: {
      security: 'Keamanan',
      maintenance: 'Pemeliharaan',
      waste: 'Sampah',
      other: 'Lainnya',
    },
    toast: {
      success: {
        title: 'Laporan Terkirim',
        description: 'Masalah Anda telah dianalisis dan berhasil dikirim.',
      },
      error: {
        title: 'Pengiriman Gagal',
        description: 'Terjadi kesalahan saat memproses laporan Anda. Silakan coba lagi.',
      },
    },
    camera: {
      accessRequired: 'Akses Kamera Diperlukan',
      permissionDenied: 'Mohon izinkan akses kamera untuk menggunakan fitur ini.',
      toast: {
        deniedTitle: 'Akses Kamera Ditolak',
        deniedDescription: 'Mohon aktifkan izin kamera di pengaturan browser Anda.',
        notFoundTitle: 'Kamera Tidak Ditemukan',
        notFoundDescription: 'Tidak ada perangkat kamera yang ditemukan. Harap sambungkan kamera untuk menggunakan fitur ini.',
      },
    }
  },
  security: {
    management: {
      title: 'Manajemen Keamanan',
      description: 'Kelola personel keamanan, shift, dan laporan insiden.',
      personnel: 'Personel',
      incidents: 'Laporan Insiden',
      personnelTitle: 'Personel Keamanan',
      personnelDescription: 'Daftar semua staf keamanan.',
      addPersonnel: 'Tambah Personel',
      id: 'ID',
      name: 'Nama',
      phone: 'Telepon',
      shift: 'Shift',
      incidentsTitle: 'Laporan Insiden',
      incidentsDescription: 'Catatan semua insiden yang dilaporkan.',
      date: 'Tanggal',
      type: 'Jenis',
      summary: 'Ringkasan',
      status: 'Status',
    },
    schedule: {
      title: 'Jadwal Patroli Keamanan',
      description: 'Jadwal mingguan patroli keamanan di lingkungan.',
      rosterTitle: 'Daftar Jaga Patroli',
      rosterDescription: 'Shift dan area yang dicakup oleh tim keamanan kami.',
      shift: 'Shift',
      area: 'Area Cakupan',
      personnel: 'Personel Bertugas',
      shifts: {
        morning: 'Patroli Pagi (06.00 - 14.00)',
        afternoon: 'Patroli Sore (14.00 - 22.00)',
        night: 'Patroli Malam (22.00 - 06.00)',
        weekend: 'Patroli Akhir Pekan'
      }
    },
    shifts: {
      morning: 'Pagi',
      afternoon: 'Sore',
      night: 'Malam',
      weekend: 'Akhir Pekan'
    },
    status: {
      resolved: 'Terselesaikan',
      closed: 'Ditutup',
      investigation: 'Dalam Investigasi',
    },
    incidents: {
      suspicious_vehicle: 'Kendaraan Mencurigakan',
      suspicious_vehicle_summary: 'Kendaraan mencurigakan dilaporkan di dekat taman. Petugas menyelidiki dan memastikan milik kerabat yang berkunjung.',
      noise_complaint: 'Keluhan Kebisingan',
      noise_complaint_summary: 'Musik keras dilaporkan pukul 11 malam. Petugas menasihati penghuni untuk mengecilkan volume.',
      stray_animal: 'Hewan Liar',
      stray_animal_summary: 'Seekor anjing hilang ditemukan dan dikembalikan dengan selamat ke pemiliknya di Cimahpar Circle.',
      vandalism: 'Vandalisme',
      vandalism_summary: 'Grafiti ditemukan di dinding pusat komunitas. Menunggu tinjauan rekaman kamera keamanan.'
    }
  },
  classifieds: {
    title: 'Iklan Kita',
    description: 'Jual, beli, atau tukar barang dengan tetangga Anda.',
    contactViaWhatsapp: 'Pesan via WhatsApp',
    items: {
      sepeda_gunung: {
        title: 'Sepeda Gunung',
        description: 'Sepeda gunung bekas, kondisi bagus. Sempurna untuk jalur di sekitar lingkungan.'
      },
      kursi_mobil_balita: {
        title: 'Kursi Mobil Balita',
        description: 'Kursi mobil balita bersih dan aman. Anak kami sudah tidak muat lagi. Semua tali dan gesper lengkap.'
      },
      set_mebel_teras: {
        title: 'Set Mebel Teras',
        description: 'Set rotan teras dengan dua kursi dan meja kecil. Termasuk bantal. Cocok untuk balkon atau teras kecil.'
      },
      berbagai_tanaman_hias: {
        title: 'Berbagai Tanaman Hias',
        description: 'Berbagai tanaman hias dijual. Tersedia lidah mertua, sirih gading, dan sukulen. Cerahkan rumah Anda!'
      },
      jasa_potong_rumput: {
        title: 'Jasa Potong Rumput',
        description: 'Menawarkan jasa potong rumput untuk blok A & B. Kerja rapi dan dapat diandalkan. Jadwal mingguan atau dua mingguan tersedia.'
      }
    }
  },
  postAd: {
    title: 'Pasang Iklan Baru',
    description: 'Isi formulir di bawah untuk memasang iklan Anda di pasar komunitas.',
    form: {
      title: 'Detail Iklan',
      submit: 'Kirim Iklan untuk Ditinjau',
      submitting: 'Mengirim...',
    },
    pricing: {
      title: 'Informasi Harga',
      description: 'Per iklan untuk 30 hari.',
      note1: 'Iklan Anda akan ditinjau oleh pengurus sebelum dipublikasikan.',
      note2: 'Instruksi pembayaran akan diberikan setelah iklan Anda disetujui.'
    },
    toast: {
      success: {
        title: 'Iklan Terkirim',
        description: 'Iklan Anda telah dikirim untuk ditinjau. Anda akan diberitahu setelah disetujui.',
      },
      error: {
        title: 'Gagal Mengirim',
        description: 'Terjadi kesalahan saat mengirim iklan Anda. Silakan coba lagi.'
      }
    },
    validation: {
        title: "Judul harus minimal 3 karakter.",
        description: "Deskripsi harus minimal 10 karakter.",
        price: "Harga harus diisi.",
        phone: "Nomor telepon harus minimal 10 digit.",
    }
  },
  classifiedsManagement: {
    title: 'Manajemen Iklan',
    description: 'Kelola iklan baris untuk komunitas.',
    tableTitle: 'Daftar Iklan',
    tableDescription: 'Daftar semua iklan aktif dan kedaluwarsa.',
    addAd: 'Tambah Iklan',
    titleColumn: 'Judul',
    price: 'Harga',
    status: 'Status',
    submittedBy: 'Dikirim Oleh',
    expiryDate: 'Tanggal Kedaluwarsa',
    actions: 'Aksi',
    edit: 'Ubah',
    delete: {
      button: 'Hapus',
      title: 'Apakah Anda yakin?',
      description: 'Tindakan ini akan menghapus iklan "{title}" secara permanen.',
      cancel: 'Batal',
      confirm: 'Hapus Iklan',
    },
    form: {
      addTitle: 'Tambah Iklan Baru',
      addDescription: 'Isi detail untuk iklan baris yang baru.',
      editTitle: 'Ubah Iklan',
      editDescription: 'Perbarui detail iklan.',
      title: 'Judul Iklan',
      description: 'Deskripsi Iklan',
      price: 'Harga',
      phone: 'Nomor WhatsApp',
      submitAdd: 'Buat Iklan',
      submitEdit: 'Simpan Perubahan',
      adPhoto: 'Foto Iklan',
      takePicture: 'Ambil Gambar',
      removePicture: 'Hapus Gambar',
      uploadFile: 'Unggah File',
      noImagePlaceholder: 'Tampilan kamera tidak tersedia',
      uploadOrCapture: 'Unggah foto atau gunakan kamera untuk menambahkan gambar.',
      capture: 'Ambil',
      cancel: 'Batal',
    },
    statuses: {
      active: 'Aktif',
      expired: 'Kedaluwarsa',
      pending_review: 'Menunggu Tinjauan',
    },
    toast: {
      error: 'Iklan dengan judul ini sudah ada.',
    },
    camera: {
      accessRequired: 'Akses Kamera Diperlukan',
      permissionDenied: 'Mohon izinkan akses kamera untuk menggunakan fitur ini.',
      toast: {
        deniedTitle: 'Akses Kamera Ditolak',
        deniedDescription: 'Mohon aktifkan izin kamera di pengaturan browser Anda.',
        notFoundTitle: 'Kamera Tidak Ditemukan',
        notFoundDescription: 'Tidak ada perangkat kamera yang ditemukan. Harap sambungkan kamera untuk menggunakan fitur ini.',
      },
    },
  },
  adReview: {
    title: 'Tinjauan Iklan',
    description: 'Setujui atau tolak iklan yang dikirimkan oleh warga.',
    tableTitle: 'Iklan Tertunda',
    tableDescription: 'Iklan berikut sedang menunggu tinjauan Anda.',
    columnTitle: 'Judul',
    columnSubmittedBy: 'Dikirim Oleh',
    columnActions: 'Aksi',
    reviewButton: 'Tinjau',
    dialog: {
      title: 'Tinjau Iklan',
      description: 'Gunakan AI untuk membantu memoderasi dan meningkatkan konten iklan.',
      loading: 'AI sedang meninjau iklan...',
      originalTitle: 'Iklan Asli',
      aiReviewTitle: 'Tinjauan & Saran AI',
      suggestion: 'Saran',
      category: 'Kategori yang Disarankan',
      approveButton: 'Setujui Iklan',
      rejectButton: 'Tolak Iklan',
      closeButton: 'Tutup',
      rejectionReason: 'Alasan Penolakan',
      approvedMessage: 'AI merekomendasikan untuk menyetujui iklan ini.',
      rejectedMessage: 'AI merekomendasikan untuk menolak iklan ini.',
    },
    toast: {
      approved: {
        title: 'Iklan Disetujui',
        description: 'Iklan "{title}" sekarang sudah tayang.',
      },
      rejected: {
        title: 'Iklan Ditolak',
        description: 'Iklan "{title}" telah ditolak dan dihapus dari antrian.',
      },
      error: {
        title: 'Tinjauan AI Gagal',
        description: 'Tidak dapat menerima respons dari AI. Silakan coba lagi.',
      }
    },
    categories: {
      electronics: 'Elektronik',
      furniture: 'Furnitur',
      vehicles: 'Kendaraan',
      clothing: 'Pakaian',
      household: 'Rumah Tangga',
      services: 'Jasa',
      other: 'Lainnya'
    }
  },
  gallery: {
    title: 'Galeri Foto',
    description: 'Dokumentasi foto kegiatan warga Cimahpar Stoneyard.',
    items: {
      independence_day_race: "Lomba 17 Agustus",
      community_cleanup: "Kerja Bakti Lingkungan",
      resident_meeting: "Rapat Warga",
      iftar_gathering: "Buka Puasa Bersama",
      eid_celebration: "Acara Halal Bihalal",
      morning_aerobics: "Senam Pagi Bersama",
      community_bazaar: "Bazar Warga",
      kids_art_performance: "Pentas Seni Anak",
    },
    edit: 'Ubah',
    delete: {
      button: 'Hapus',
      title: 'Apakah Anda yakin?',
      description: 'Tindakan ini akan menghapus foto ini dari galeri secara permanen.',
      cancel: 'Batal',
      confirm: 'Hapus Foto',
      toastSuccessTitle: 'Foto Dihapus',
      toastSuccessDescription: 'Foto telah dihapus dari galeri.',
    },
    form: {
      addPhoto: 'Tambah Foto',
      addTitle: 'Tambah Foto Baru',
      addDescription: 'Isi detail untuk foto baru.',
      editTitle: 'Ubah Foto',
      editDescription: 'Perbarui detail foto.',
      titleKey: 'Kunci Judul (Title Key)',
      image: 'URL Gambar',
      imageHint: 'Petunjuk Gambar (untuk AI)',
      submitAdd: 'Tambah Foto',
      submitEdit: 'Simpan Perubahan',
      toastAddSuccessTitle: 'Foto Ditambahkan',
      toastEditSuccessTitle: 'Foto Diperbarui',
    }
  },
  ipl: {
      title: 'Iuran IPL Warga',
      description: 'Kelola iuran pemeliharaan lingkungan bulanan warga. Iuran bulanan adalah Rp 125.000 (Rp 55.000 untuk layanan komunitas & Rp 70.000 untuk iuran developer).',
      tableTitle: 'Daftar Iuran',
      tableDescription: 'Daftar status pembayaran iuran IPL semua warga.',
      addPayment: 'Tambah Pembayaran',
      confirmPayment: 'Konfirmasi Bayar',
      residentName: 'Nama Warga',
      address: 'Alamat',
      period: 'Periode',
      amount: 'Jumlah',
      status: 'Status',
      paid: 'Lunas',
      unpaid: 'Belum Lunas',
  },
  residents: {
    title: 'Direktori Warga',
    description: 'Informasi kontak untuk warga Cimahpar Stoneyard.',
    tableTitle: 'Warga',
    tableDescription: 'Daftar semua warga di dalam komunitas.',
    addResident: 'Tambah Warga',
    name: 'Nama',
    address: 'Alamat',
    phone: 'Telepon',
    email: 'Email',
    actions: 'Aksi',
    edit: 'Ubah',
    delete: {
      button: 'Hapus',
      title: 'Apakah Anda benar-benar yakin?',
      description: 'Tindakan ini tidak dapat dibatalkan. Ini akan menghapus warga "{name}" secara permanen dari direktori.',
      cancel: 'Batal',
      confirm: 'Lanjutkan',
    },
    form: {
      addTitle: 'Tambah Warga Baru',
      addDescription: 'Isi detail untuk menambahkan warga baru ke direktori.',
      editTitle: 'Ubah Data Warga',
      editDescription: 'Perbarui detail warga. Email tidak dapat diubah.',
      name: 'Nama Lengkap',
      block: 'Blok',
      number: 'Nomor',
      phone: 'Nomor Telepon',
      email: 'Alamat Email',
      submitAdd: 'Tambah Warga',
      submitEdit: 'Simpan Perubahan',
    }
  },
  finance: {
    confirmation: {
      title: 'Konfirmasi Pembayaran',
      description: 'Kirimkan konfirmasi pembayaran iuran IPL Anda di sini.',
      copied: 'Nomor rekening disalin!',
      form: {
        title: 'Formulir Konfirmasi',
        description: 'Isi formulir di bawah ini dan unggah bukti pembayaran Anda.',
        residentEmail: {
          required: 'Silakan pilih nama warga.',
          placeholder: 'Pilih nama warga',
        },
        paymentMethod: {
          label: 'Metode Pembayaran',
          required: 'Harap pilih metode pembayaran.',
          transfer: 'Transfer Bank',
          cash: 'Tunai',
        },
        paymentMonth: {
          label: 'Bulan Pembayaran',
          required: 'Silakan pilih bulan pembayaran.',
          placeholder: 'Pilih bulan',
        },
        paymentDate: {
          label: 'Tanggal Pembayaran',
          required: 'Tanggal pembayaran harus diisi.',
          placeholder: 'Pilih tanggal',
        },
        amount: {
          label: 'Jumlah Dibayar',
          required: 'Silakan masukkan jumlah yang dibayar.',
        },
        proof: {
          label: 'Bukti Pembayaran',
          required: 'Bukti pembayaran harus diunggah.',
          requiredTransfer: 'Bukti pembayaran wajib diunggah untuk transfer bank.',
          description: 'Unggah tangkapan layar atau foto bukti transfer Anda.',
          cashDescription: 'Opsional: Unggah foto struk pembayaran tunai.',
        },
        notes: {
          label: 'Catatan (Opsional)',
          placeholder: 'Tambahkan catatan tambahan di sini...',
        },
        submit: 'Kirim Konfirmasi',
      },
      paymentInfo: {
        title: 'Informasi Pembayaran',
      },
      toast: {
        title: 'Konfirmasi Terkirim',
        description: 'Konfirmasi pembayaran Anda telah diterima dan akan segera diverifikasi.',
      },
    },
    report: {
      title: 'Laporan Keuangan',
      description: 'Ringkasan keuangan paguyuban warga.',
      totalIncome: 'Total Pemasukan',
      totalExpense: 'Total Pengeluaran',
      currentBalance: 'Saldo Saat Ini',
      monthlyOverview: 'Tinjauan Bulanan',
      monthlyOverviewDescription: 'Pemasukan vs. Pengeluaran selama 6 bulan terakhir.',
      income: 'Pemasukan',
      expense: 'Pengeluaran',
      transactionHistory: 'Riwayat Transaksi',
      transactionHistoryDescription: 'Daftar transaksi keuangan terkini.',
      date: 'Tanggal',
      descriptionColumn: 'Keterangan',
      type: 'Tipe',
      amount: 'Jumlah',
      types: {
        income: 'Pemasukan',
        expense: 'Pengeluaran',
      },
      transactions: {
        security_salary: 'Gaji Keamanan - Juli',
        ipl_dues: 'Penerimaan Iuran IPL - Juli',
        cleaning_fee: 'Biaya Kebersihan',
        street_light_repair: 'Perbaikan Lampu Jalan',
        facility_rental: 'Sewa Fasilitas (Aula)'
      },
      months: {
        mar: 'Mar',
        apr: 'Apr',
        may: 'Mei',
        jun: 'Jun',
        jul: 'Jul',
        aug: 'Agu',
      }
    }
  },
  curhatWarga: {
    title: "Ruang Curhat Warga",
    description: "Ruang aman untuk berbagi pikiran dan perasaan Anda. Teman AI kami siap mendengarkan.",
    form: {
      title: "Bagikan Isi Hati Anda",
      description: "Tuliskan apa pun yang ada di pikiran Anda. Ruang ini bersifat pribadi dan anonim.",
      label: "Cerita Anda",
      placeholder: "Silakan bagikan apa saja...",
      submit: "Kirim",
      submitting: "Mengirim...",
      validation: "Curhatan harus minimal 10 karakter.",
    },
    response: {
      title: "Catatan dari Tetangga AI Anda",
      description: "Berikut adalah tanggapan suportif untuk Anda.",
      loading: "Memikirkan tanggapan...",
    },
    toast: {
      success: {
        title: "Pesan Terkirim",
        description: "Anda telah menerima tanggapan dari tetangga AI Anda.",
      },
      error: {
        title: "Terjadi Kesalahan",
        description: "Terjadi masalah. Silakan coba lagi.",
      }
    }
  },
  whatsappFeed: {
    title: 'Obrolan Warga',
    description: 'Feed langsung pengumuman dan diskusi dari grup WhatsApp warga.',
    chatTitle: 'Warga Cimahpar Stoneyard',
    onlineStatus: 'John, Jane, Budi, Siti & 12 lainnya',
  },
  wasteManagement: {
    title: 'Manajemen Sampah',
    description: 'Jadwal dan informasi mengenai pengangkutan sampah.',
    scheduleTitle: 'Jadwal Pengangkutan',
    scheduleDescription: 'Jadwal mingguan untuk pengangkutan sampah rumah tangga.',
    day: 'Hari',
    area: 'Area',
    type: 'Jenis Sampah',
    days: {
      mon_thu: 'Senin & Kamis',
      tue_fri: 'Selasa & Jumat',
      first_saturday: 'Sabtu Pertama setiap bulan'
    },
    areas: {
      north_sector: 'Sektor Utara (Blok A, B)',
      south_sector: 'Sektor Selatan (Blok C, D)',
      all_sectors: 'Semua Sektor'
    },
    types: {
      general_recyclable: 'Sampah Umum & Daur Ulang',
      garden_bulky: 'Sampah Kebun & Ukuran Besar'
    },
    statusTitle: 'Status Pengangkutan Sampah Anda',
    statusCheckDescription: 'Status ini diperbarui berdasarkan riwayat pembayaran iuran IPL Anda.',
    statusActive: {
      title: 'Layanan Aktif',
      description: 'Sampah Anda akan diangkut sesuai jadwal yang tertera di bawah ini.'
    },
    statusSuspended: {
      title: 'Layanan Ditangguhkan',
      description: 'Terdeteksi ada iuran IPL yang tertunggak. Mohon segera selesaikan pembayaran untuk mengaktifkan kembali layanan pengangkutan sampah.'
    },
    confirmPaymentButton: 'Konfirmasi Pembayaran di sini.'
  },
    profile: {
    title: 'Perbarui Profil',
    description: 'Kelola informasi dan pengaturan pribadi Anda.',
    form: {
      photo: {
        label: 'Foto Profil',
        change: 'Ambil Foto',
        remove: 'Hapus Foto',
      },
      name: {
        label: 'Nama Lengkap',
      },
      email: {
        label: 'Alamat Email',
      },
      address: {
        label: 'Alamat',
      },
      phone: {
        label: 'Nomor Telepon',
      },
      location: {
        label: 'Lokasi GPS',
        description: 'Ambil lokasi akurat Anda untuk membantu pengiriman dan layanan darurat. Ini opsional.',
        capture: 'Ambil Lokasi Saat Ini',
        capturing: 'Mengambil...',
        denied: 'Akses lokasi ditolak. Mohon aktifkan di pengaturan browser Anda.',
        notSupported: 'Geolocation tidak didukung oleh browser Anda.',
        latitude: 'Lintang',
        longitude: 'Bujur',
      },
      family: {
        label: 'Anggota Keluarga',
        placeholder: 'Sebutkan anggota keluarga Anda, satu per baris...',
      },
      submit: 'Simpan Perubahan',
      submitting: 'Menyimpan...',
    },
    toast: {
      success: {
        title: 'Profil Diperbarui',
        description: 'Informasi Anda telah berhasil disimpan.',
      },
      error: {
        title: 'Gagal Memperbarui',
        description: 'Terjadi kesalahan saat menyimpan profil Anda. Silakan coba lagi.',
      },
    },
  },
  notifications: {
    ipl: {
      dueSoon: {
        title: "Pengingat Pembayaran IPL",
        message: "Iuran IPL bulan ini akan jatuh tempo dalam 5 hari (tanggal 28). Mohon segera lakukan pembayaran. Terima kasih.",
      },
      overdue: {
        title: "Pemberitahuan Tunggakan IPL",
        message: "Yth. Bpk/Ibu {name}, tercatat Anda memiliki tunggakan iuran IPL. Mohon untuk segera menyelesaikannya untuk menghindari penangguhan layanan. Terima kasih.",
      }
    }
  },
};
export default id;
