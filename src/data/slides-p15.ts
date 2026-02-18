import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PENDAHULUAN (4.1) ---
  {
    id: 1,
    title: "Pengenalan Manajemen Referensi",
    type: "content",
    icon: "1",
    subtitle: "Pentingnya Sitasi",
    content: [
      "**Definisi:** Sitasi adalah pengambilan ide, argumentasi, atau hasil penelitian orang lain untuk mendukung tulisan ilmiah kita.",
      "**Tujuan Sitasi:**",
      "1. Menghindari plagiarisme.",
      "2. Menghargai penulis asli.",
      "3. Membantu pembaca menelusuri sumber informasi asli.",
      "**Sumber Sitasi:** Buku, jurnal, website, laporan, video, dll.",
    ],
  },
  {
    id: 2,
    title: "Mengenal Mendeley",
    type: "content",
    icon: "2",
    subtitle: "Aplikasi Manajemen Referensi",
    content: [
      "**Apa itu Mendeley?** Aplikasi gratis berbasis web dan desktop untuk mengelola referensi, membuat sitasi, dan daftar pustaka secara otomatis.",
      "**Keunggulan Utama:**",
      "- Otomatis mengekstrak detail (metadata) dari file PDF.",
      "- Terintegrasi dengan Microsoft Word.",
      "- Sinkronisasi Cloud (akses data di mana saja).",
      "- Fitur kolaborasi dan jejaring sosial akademik.",
    ],
  },
  {
    id: 3,
    title: "Mendeley Desktop vs Reference Manager",
    type: "content",
    icon: "3",
    subtitle: "Memilih Versi yang Tepat",
    content: [
      "Ada dua versi Mendeley:",
      "1. **Mendeley Desktop (Versi Lama):** Fitur lebih lengkap, bisa bekerja offline total, plugin mendukung Word versi lama (2010, 2013).",
      "2. **Mendeley Reference Manager (Versi Baru):** Tampilan lebih modern, berbasis cloud (butuh internet), plugin 'Mendeley Cite' hanya untuk Word 2016 ke atas.",
      "**Catatan Modul:** Kita akan fokus menggunakan **Mendeley Desktop** karena kompatibilitasnya yang luas.",
    ],
  },

  // --- BAGIAN 2: INSTALASI & AKUN (4.2) ---
  {
    id: 4,
    title: "Tugas 1: Pendaftaran Akun",
    type: "task",
    icon: "4",
    subtitle: "Langkah Awal - 5 Menit",
    content: [
      "Sebelum menginstal, Anda wajib memiliki akun Elsevier/Mendeley.",
    ],
    checklist: [
      "Buka browser dan kunjungi **mendeley.com**.",
      "Klik **Create Account**.",
      "Gunakan email institusi/kampus jika ada (misal: nama@student.univ.ac.id).",
      "Lengkapi profil (Status Akademis & Bidang Studi).",
      "Verifikasi email Anda.",
    ],
    tasks: ["Screenshot halaman profil Mendeley Web Anda setelah berhasil login."],
    requireUpload: true,
  },
  {
    id: 5,
    title: "Instalasi Mendeley Desktop",
    type: "content",
    icon: "5",
    subtitle: "Persiapan Software",
    content: [
      "**Langkah Instalasi:**",
      "1. Unduh installer 'Mendeley Desktop for Windows' dari website.",
      "2. Jalankan file .exe.",
      "3. Ikuti petunjuk (Next > I Agree > Install > Finish).",
      "4. Buka aplikasi dan **Sign In** menggunakan email & password yang baru dibuat.",
    ],
  },
  {
    id: 6,
    title: "Antarmuka Mendeley Desktop",
    type: "content",
    icon: "6",
    subtitle: "3 Panel Utama",
    content: [
      "Setelah login, Anda akan melihat 3 bagian utama:",
      "1. **Left Panel (Kiri):** Struktur folder (My Library), Filter, dan Grup.",
      "2. **Central Panel (Tengah):** Daftar referensi/dokumen yang ada di library.",
      "3. **Right Panel (Kanan):** Detail metadata (Judul, Penulis, Abstrak) dari dokumen yang dipilih.",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Instalasi & Login",
    type: "task",
    icon: "7",
    subtitle: "Setup Desktop - 10 Menit",
    content: [
      "Pastikan software sudah terpasang di komputer lab/laptop Anda.",
    ],
    checklist: [
      "Install Mendeley Desktop.",
      "Lakukan Login.",
      "Kenali area 'My Library' di sebelah kiri.",
    ],
    tasks: ["Upload screenshot tampilan awal Mendeley Desktop Anda yang sudah login."],
    requireUpload: true,
  },

  // --- MID QUIZ ---
  {
    id: 8,
    title: "Quiz Pemahaman Dasar",
    type: "quiz",
    icon: "8",
    subtitle: "Review Konsep",
    content: ["Mari cek pemahaman tentang fungsi dasar Mendeley."],
    quiz: [
      {
        question: "Apa fungsi utama dari panel sebelah kanan (Right Panel) di Mendeley Desktop?",
        options: [
          { label: "a", text: "Menampilkan daftar semua file" },
          { label: "b", text: "Menampilkan detail/metadata referensi yang dipilih", correct: true },
          { label: "c", text: "Membuat folder baru" },
        ],
        explanation: "Panel kanan berfungsi untuk melihat dan mengedit detail informasi (metadata) seperti judul, penulis, dan tahun terbit.",
      },
      {
        question: "Mengapa disarankan menggunakan email institusi saat mendaftar?",
        options: [
          { label: "a", text: "Agar dapat diskon belanja" },
          { label: "b", text: "Agar terintegrasi dengan database kampus dan terlihat profesional", correct: true },
          { label: "c", text: "Tidak ada alasan khusus" },
        ],
        explanation: "Menggunakan email institusi memudahkan identifikasi akademis dan integrasi dengan layanan perpustakaan kampus.",
      },
      {
        question: "Manakah pernyataan yang BENAR tentang Mendeley?",
        options: [
          { label: "a", text: "Hanya bisa digunakan saat online" },
          { label: "b", text: "Data di Desktop dan Web tidak bisa disinkronkan" },
          { label: "c", text: "Data tersimpan di cloud dan bisa diakses di mana saja", correct: true },
        ],
        explanation: "Mendeley memiliki fitur sinkronisasi cloud sehingga library dapat diakses dari berbagai perangkat.",
      },
    ],
  },

  // --- BAGIAN 3: MENGOPERASIKAN MENDELEY (4.3) ---
  {
    id: 9,
    title: "Membuat Library & Folder",
    type: "content",
    icon: "9",
    subtitle: "Manajemen Direktori (4.3.1.1)",
    content: [
      "Agar referensi tidak berantakan, kelompokkan berdasarkan topik.",
      "**Cara Membuat Folder:**",
      "1. Klik **Create Folder** di panel kiri.",
      "2. Ketik nama folder (misal: 'Bab 1', 'Jurnal TI').",
      "**Sub-Folder:** Klik kanan pada folder yang sudah ada > New Folder.",
    ],
  },
  {
    id: 10,
    title: "Menambahkan Referensi (Desktop)",
    type: "content",
    icon: "10",
    subtitle: "Cara Input Data (4.3.1.2)",
    content: [
      "Ada beberapa cara memasukkan referensi:",
      "1. **Add Files:** Memilih file PDF satu per satu dari komputer.",
      "2. **Add Folder:** Memasukkan semua file dalam satu folder sekaligus.",
      "3. **Drag & Drop:** Menarik file PDF langsung dari Windows Explorer ke Mendeley.",
      "4. **Add Entry Manually:** Mengetik data manual (jika tidak punya file PDF, misal buku cetak).",
    ],
  },
  {
    id: 11,
    title: "Mencari & Sinkronisasi",
    type: "content",
    icon: "11",
    subtitle: "Fitur Lanjutan",
    content: [
      "**Literature Search:** Cari referensi baru langsung dari database Mendeley lewat kolom pencarian di pojok kiri atas.",
      "**Sync (Sinkronisasi):** Tombol hijau melengkung di toolbar. Wajib diklik agar data di Laptop tersimpan ke Web (Cloud), atau sebaliknya.",
    ],
  },
  {
    id: 12,
    title: "Tugas 3: Membangun Library",
    type: "task",
    icon: "12",
    subtitle: "Praktik Input Data - 10 Menit",
    content: [
      "Siapkan minimal 2 file PDF jurnal/artikel (bebas).",
    ],
    checklist: [
      "Buat Folder baru dengan nama **'Latihan Mendeley'**.",
      "Masukkan 2 file PDF tersebut ke dalam folder ini (gunakan cara Drag & Drop atau Add Files).",
      "Periksa panel kanan, apakah Judul dan Penulis sudah terbaca otomatis dengan benar? Jika salah, perbaiki manual.",
      "Klik tombol **Sync**.",
    ],
    tasks: ["Upload screenshot Mendeley Anda yang menampilkan folder dan isi filenya."],
    requireUpload: true,
  },

  // --- BAGIAN 4: MENDELEY WEB (4.3.2) ---
  {
    id: 13,
    title: "Mengoperasikan Mendeley Web",
    type: "content",
    icon: "13",
    subtitle: "Akses via Browser",
    content: [
      "Selain di aplikasi, Anda bisa mengakses library lewat browser.",
      "**Web Importer:**",
      "- Ekstensi browser (Chrome/Edge) untuk menyimpan artikel langsung dari internet ke Mendeley.",
      "- Cara pakai: Buka halaman jurnal online > Klik ikon Mendeley Web Importer di browser > Add.",
    ],
  },
  {
    id: 14,
    title: "Fitur Web Library",
    type: "content",
    icon: "14",
    subtitle: "Membaca & Mencatat",
    content: [
      "Di Mendeley Web, Anda juga bisa:",
      "1. **Membaca PDF:** Klik file untuk membuka viewer online.",
      "2. **Highlight & Note:** Memberi warna pada teks penting atau menambah catatan kecil (Sticky Note).",
      "3. **Notebook:** Membuat catatan rangkuman terpisah yang tersimpan di akun.",
    ],
  },
  {
    id: 15,
    title: "Tugas 4: Web Importer",
    type: "task",
    icon: "15",
    subtitle: "Praktik Online - 10 Menit",
    content: [
      "Pasang ekstensi **Mendeley Web Importer** di browser Anda.",
    ],
    checklist: [
      "Buka Google Scholar, cari topik 'Machine Learning' (atau topik skripsi Anda).",
      "Buka salah satu artikel PDF.",
      "Klik ikon Mendeley Web Importer di browser.",
      "Klik **Add to Mendeley**.",
      "Cek di aplikasi Desktop (klik Sync) apakah file tersebut masuk?",
    ],
    tasks: ["Upload screenshot bukti file berhasil masuk melalui Web Importer."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 16,
    title: "Quiz Akhir Bab 4 (Topik 4.1-4.3)",
    type: "quiz",
    icon: "16",
    subtitle: "Evaluasi Mendeley Dasar (15 Soal)",
    content: ["Uji pemahaman Anda tentang manajemen referensi dasar."],
    quiz: [
      {
        question: "Apa tujuan utama penulisan sitasi dan daftar pustaka?",
        options: [
          { label: "a", text: "Agar tulisan menjadi lebih panjang" },
          { label: "b", text: "Menghindari plagiarisme dan menghargai penulis asli", correct: true },
          { label: "c", text: "Agar terlihat pintar" },
        ],
        explanation: "Sitasi bertujuan etis untuk mengakui karya orang lain dan menghindari klaim ide (plagiarisme).",
      },
      {
        question: "Software pengolah kata apa yang paling umum terintegrasi dengan Mendeley?",
        options: [
          { label: "a", text: "Notepad" },
          { label: "b", text: "Microsoft Word", correct: true },
          { label: "c", text: "Adobe Photoshop" },
        ],
        explanation: "Mendeley memiliki plugin khusus untuk Microsoft Word dan LibreOffice.",
      },
      {
        question: "Untuk memasukkan file PDF ke dalam Mendeley, menu yang digunakan adalah...",
        options: [
          { label: "a", text: "File > Export" },
          { label: "b", text: "File > Add Files", correct: true },
          { label: "c", text: "Tools > Install" },
        ],
        explanation: "Menu Add Files digunakan untuk mengimpor dokumen referensi ke dalam library.",
      },
      {
        question: "Apa fungsi tombol 'Sync' di Mendeley Desktop?",
        options: [
          { label: "a", text: "Menghapus semua data" },
          { label: "b", text: "Menyamakan data antara Desktop dan Cloud (Web)", correct: true },
          { label: "c", text: "Menginstall plugin Word" },
        ],
        explanation: "Sync melakukan sinkronisasi agar data di komputer lokal sama dengan data di server Mendeley.",
      },
      {
        question: "Jika kita tidak memiliki file PDF (misal buku cetak), cara input ke Mendeley adalah...",
        options: [
          { label: "a", text: "Tidak bisa dimasukkan" },
          { label: "b", text: "Add Entry Manually", correct: true },
          { label: "c", text: "Scan buku lalu upload" },
        ],
        explanation: "Add Entry Manually memungkinkan pengguna mengetik detail referensi (Judul, Penulis, Tahun, dll) secara manual.",
      },
      {
        question: "Fitur untuk mengelompokkan referensi berdasarkan topik tertentu disebut...",
        options: [
          { label: "a", text: "Create Folder", correct: true },
          { label: "b", text: "Create Account" },
          { label: "c", text: "Create Citation" },
        ],
        explanation: "Folder digunakan untuk manajemen direktori agar referensi tertata rapi.",
      },
      {
        question: "Di mana kita bisa memeriksa apakah detail (metadata) jurnal sudah benar?",
        options: [
          { label: "a", text: "Left Panel" },
          { label: "b", text: "Right Panel (Details)", correct: true },
          { label: "c", text: "Toolbar" },
        ],
        explanation: "Panel kanan menampilkan rincian metadata yang bisa diedit jika hasil ekstraksi otomatis kurang tepat.",
      },
      {
        question: "Mendeley Web Importer berfungsi untuk...",
        options: [
          { label: "a", text: "Menginstal aplikasi desktop" },
          { label: "b", text: "Menyimpan referensi langsung dari browser internet", correct: true },
          { label: "c", text: "Mengedit file PDF" },
        ],
        explanation: "Web Importer adalah ekstensi browser untuk 'menangkap' referensi dari halaman web/jurnal.",
      },
      {
        question: "Apa yang terjadi jika kita menekan tombol 'Watch Folder' (di menu File)?",
        options: [
          { label: "a", text: "Mendeley akan memutar video" },
          { label: "b", text: "Mendeley otomatis memantau folder komputer dan menambahkan PDF baru yang masuk ke situ", correct: true },
          { label: "c", text: "Mendeley akan menghapus folder" },
        ],
        explanation: "Watch Folder mengotomatisasi penambahan file; setiap PDF yang ditaruh di folder tersebut di komputer akan otomatis masuk Mendeley.",
      },
      {
        question: "File format apa yang paling optimal dibaca metadatanya oleh Mendeley?",
        options: [
          { label: "a", text: ".jpg" },
          { label: "b", text: ".pdf", correct: true },
          { label: "c", text: ".doc" },
        ],
        explanation: "Mendeley dirancang untuk mengekstrak metadata dari file PDF secara otomatis.",
      },
      {
        question: "Berapa kapasitas penyimpanan gratis (free web storage) yang diberikan Mendeley (umumnya)?",
        options: [
          { label: "a", text: "100 MB" },
          { label: "b", text: "2 GB", correct: true },
          { label: "c", text: "Unlimited" },
        ],
        explanation: "Akun gratis Mendeley biasanya mendapatkan ruang penyimpanan cloud sebesar 2 GB.",
      },
      {
        question: "Jika judul referensi di Mendeley salah ketik, apa yang harus dilakukan?",
        options: [
          { label: "a", text: "Menghapus file dan download ulang" },
          { label: "b", text: "Mengeditnya secara manual di Right Panel", correct: true },
          { label: "c", text: "Membiarkannya saja" },
        ],
        explanation: "Metadata seringkali tidak sempurna, pengguna wajib memeriksanya dan bisa mengedit langsung di panel kanan.",
      },
      {
        question: "Fitur 'Literature Search' di Mendeley Desktop digunakan untuk...",
        options: [
          { label: "a", text: "Mencari file di komputer saya" },
          { label: "b", text: "Mencari referensi di database Mendeley secara online", correct: true },
          { label: "c", text: "Mencari virus" },
        ],
        explanation: "Literature Search memungkinkan pencarian katalog global Mendeley untuk menemukan referensi baru.",
      },
      {
        question: "Metode 'Drag and Drop' memudahkan pengguna untuk...",
        options: [
          { label: "a", text: "Menghapus aplikasi" },
          { label: "b", text: "Memasukkan file PDF ke library dengan cepat", correct: true },
          { label: "c", text: "Mengirim email" },
        ],
        explanation: "Drag and Drop adalah cara tercepat memasukkan file tanpa melalui menu navigasi.",
      },
      {
        question: "Untuk login ke Mendeley Desktop, data apa yang diperlukan?",
        options: [
          { label: "a", text: "Nama Lengkap dan NIM" },
          { label: "b", text: "Email dan Password yang terdaftar", correct: true },
          { label: "c", text: "Kunci Produk (Product Key)" },
        ],
        explanation: "Login membutuhkan kredensial akun (email & password) yang dibuat saat registrasi.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 17,
    title: "Selesai Bab 4 (Part 1)",
    type: "content",
    icon: "17",
    subtitle: "Rangkuman",
    content: [
      "Selamat! Anda telah menguasai dasar-dasar Mendeley.",
      "Anda sekarang memiliki akun, aplikasi terinstal, dan library referensi yang siap digunakan.",
      "Materi selanjutnya: **Manajemen File Lanjutan & Integrasi Word (Membuat Sitasi Otomatis)**.",
    ],
  },
];