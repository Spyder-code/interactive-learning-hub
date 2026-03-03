import type { Slide } from "./slides";
export const slidesP21: Slide[] = [
  // --- PEMBUKAAN PRAKTIKUM ---
  {
    id: 1,
    title: "Final Project Integrasi Office",
    type: "content",
    icon: "1",
    subtitle: "Uji Kompetensi Komprehensif",
    content: [
      "Selamat datang di tantangan terakhir!",
      "Anda diminta untuk menyelesaikan 3 Misi Utama yang mensimulasikan pekerjaan administrasi profesional.",
      "**Tools:** Microsoft Word, Excel, dan PowerPoint.",
      "**Waktu Pengerjaan:** 90 Menit.",
    ],
  },

  // --- MISI 1: MICROSOFT WORD (ADVANCED) ---
  {
    id: 2,
    title: "Misi 1: Word (Naskah & Mail Merge)",
    type: "task",
    icon: "2",
    subtitle: "Membuat Laporan & Undangan Otomatis",
    content: [
      "**Skenario:** Anda adalah sekretaris panitia seminar. Anda harus membuat Laporan Kegiatan yang rapi dan Surat Undangan untuk 50 peserta berbeda.",
    ],
    checklist: [
      "**Bagian A: Laporan Kegiatan (File: Laporan_NIM.docx)**",
      "Gunakan **Styles (Heading 1, 2)** untuk Judul Bab dan Sub-bab.",
      "Buat **Daftar Isi Otomatis** (Table of Contents) di halaman depan.",
      "Sisipkan **Nomor Halaman**: Halaman Cover tidak bernomor, Daftar Isi angka Romawi (i, ii), Isi Laporan angka Latin (1, 2, 3). *(Gunakan Section Break)*.",
      "**Bagian B: Surat Massal (File: Undangan_NIM.docx)**",
      "Buat dokumen surat undangan satu halaman.",
      "Gunakan fitur **Mail Merge**.",
      "Buat sumber data (Excel) berisi 5 nama penerima dan alamat berbeda.",
      "Masukkan field <<Nama>> dan <<Alamat>> ke dalam surat.",
    ],
    tasks: ["Upload 2 File Word: Laporan dan Master Surat Undangan."],
    requireUpload: true,
    note: "Pastikan fitur 'Preview Results' pada Mail Merge berfungsi dengan baik.",
  },

  // --- MISI 2: MICROSOFT EXCEL (ADVANCED) ---
  {
    id: 3,
    title: "Misi 2: Excel (Logic & String Data)",
    type: "task",
    icon: "3",
    subtitle: "Analisis Data Penjualan",
    content: [
      "**Skenario:** Anda harus mengolah data mentah transaksi toko elektronik menjadi laporan informatif.",
      "Buat tabel dengan kolom: No, Kode Barang, Nama Barang, Merek, Harga, Diskon, Harga Akhir.",
    ],
    checklist: [
      "**Input Data:** Masukkan 5 data dengan Kode Barang format unik (Contoh: **SAM-TV-001**, **LG-AC-002**).",
      "**Rumus Teks:**",
      "- Kolom **Merek**: Ambil 2-3 huruf pertama dari Kode (gunakan rumus **LEFT**). Jika 'SAM' maka Samsung, 'LG' maka LG (Gunakan **IF** kombinasi).",
      "- Kolom **Nama Barang**: Ambil kata tengah dari Kode (gunakan rumus **MID**).",
      "**Rumus Logika:**",
      "- Kolom **Diskon**: Jika Harga > 5.000.000, diskon 10%, jika tidak 0% (Gunakan **IF**).",
      "**Formatting:**",
      "- Format semua angka uang dengan **Accounting (Rp)**.",
      "- Beri **Conditional Formatting** (Warna Merah) pada Harga Akhir di atas 5 Juta.",
    ],
    tasks: ["Upload file Excel (.xlsx) dengan rumus yang aktif."],
    requireUpload: true,
    note: "Tantangan: Gunakan VLOOKUP jika Anda sudah mempelajarinya secara mandiri, atau Nested IF (IF bertingkat).",
  },

  // --- MISI 3: POWERPOINT (ADVANCED) ---
  {
    id: 4,
    title: "Misi 3: PowerPoint (Interactive Kiosk)",
    type: "task",
    icon: "4",
    subtitle: "Presentasi Non-Linear",
    content: [
      "**Skenario:** Buat slide profil diri/perusahaan yang bisa dijalankan sendiri oleh user (seperti aplikasi).",
    ],
    checklist: [
      "**Navigasi Menu:** Slide 2 adalah 'Menu Utama' berisi tombol ke materi A, B, dan C.",
      "**Hyperlink:** Pastikan tombol di Menu nge-link ke slide tujuan.",
      "**Action Buttons:** Di setiap slide materi, buat tombol **'Home'** yang berfungsi kembali ke Slide 2.",
      "**Animasi:** Berikan animasi masuk yang berbeda untuk Judul (Fly In) dan Isi (Fade).",
      "**Transisi:** Gunakan efek transisi 'Morph' atau 'Push' antar slide.",
      "**Format:** Simpan file sebagai **PowerPoint Show (.ppsx)** agar langsung jalan saat diklik.",
    ],
    tasks: ["Upload file .ppsx hasil karya Anda."],
    requireUpload: true,
    note: "Pastikan tidak ada 'jalan buntu', user harus selalu bisa kembali ke menu utama.",
  },

  // --- PENUTUP ---
  {
    id: 5,
    title: "Submission",
    type: "challenge",
    icon: "5",
    subtitle: "Pengumpulan Akhir",
    content: [
      "Periksa kembali seluruh file Anda sebelum di-upload.",
      "**Checklist Akhir:**",
      "1. Word: Daftar Isi rapi & Mail Merge aktif.",
      "2. Excel: Rumus IF dan String (Left/Mid) benar.",
      "3. PowerPoint: Tombol navigasi berfungsi & format PPSX.",
    ],
    checklist: [
      "File Word Laporan (.docx)",
      "File Word Undangan (.docx) + Data Excel (.xlsx)",
      "File Excel Laporan (.xlsx)",
      "File PowerPoint Show (.ppsx)",
    ],
    tasks: [
      "Kumpulkan semua file dalam satu folder ZIP dengan nama **UAS_NIM_NamaLengkap.zip**",
    ],
    requireUpload: true,
    note: "Selamat! Anda telah menyelesaikan seluruh rangkaian praktikum Office Advanced.",
  },
];