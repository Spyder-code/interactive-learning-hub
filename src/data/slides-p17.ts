import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PENDAHULUAN & INSTALASI (5.1) ---
  {
    id: 1,
    title: "Pengenalan Zotero",
    type: "content",
    icon: "1",
    subtitle: "Manajemen Referensi Open Source",
    content: [
      "**Definisi:** Zotero adalah perangkat lunak manajemen referensi (bibliographic software) yang bersifat *open source* dan gratis.",
      "**Perbedaan dengan Mendeley:** Meskipun sama-sama gratis, Zotero bersifat terbuka (open source), sedangkan Mendeley tidak.",
      "**Platform:** Tersedia untuk Windows, Macintosh, dan Linux.",
    ],
  },
  {
    id: 2,
    title: "Tiga Fungsi Utama Zotero",
    type: "content",
    icon: "2",
    subtitle: "Manfaat bagi Peneliti",
    content: [
      "1. **Menyimpan:** Mengatur dan menyimpan referensi dari berbagai jenis publikasi dan format.",
      "2. **Mensitasi:** Melakukan sitasi otomatis saat penulisan di dokumen Word.",
      "3. **Bibliografi:** Membuat daftar pustaka secara otomatis.",
      "Intinya: Mengumpulkan, Mengorganisasi, dan Mensitasi informasi.",
    ],
  },
  {
    id: 3,
    title: "Instalasi Zotero Desktop",
    type: "content",
    icon: "3",
    subtitle: "Zotero 5.0 Standalone",
    content: [
      "Versi Zotero saat ini (5.0) berjalan sebagai aplikasi mandiri (Standalone), berbeda dengan versi lama yang menempel di Firefox.",
      "**Langkah Instalasi:**",
      "1. Buka browser dan kunjungi **zotero.org**.",
      "2. Klik **Download**.",
      "3. Pilih **Zotero 5.0 for Windows** (atau sesuai OS Anda).",
      "4. Jalankan installer dan ikuti petunjuk (Standard/Custom).",
      "**Penting:** Pastikan Microsoft Office tidak aktif saat proses instalasi.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Install Aplikasi",
    type: "task",
    icon: "4",
    subtitle: "Praktik Instalasi - 10 Menit",
    content: ["Mari siapkan perangkat lunak Zotero di komputer Anda."],
    checklist: [
      "Download installer dari situs resmi.",
      "Lakukan instalasi hingga selesai.",
      "Pastikan muncul ikon **huruf Z merah** di desktop Anda.",
      "Buka aplikasi Zotero.",
    ],
    tasks: [
      "Upload screenshot tampilan awal aplikasi Zotero yang sudah terbuka.",
    ],
    requireUpload: true,
  },
  {
    id: 5,
    title: "Zotero Connector",
    type: "content",
    icon: "5",
    subtitle: "Penghubung Browser",
    content: [
      "Agar Zotero bisa 'menangkap' data dari internet, Anda wajib menginstall Connector.",
      "**Fungsi:** Sebagai jembatan komunikasi antara browser (Chrome/Firefox/Edge) dengan aplikasi Zotero.",
      "**Cara:** Di halaman download zotero.org, di sebelah kanan ada opsi **Install Chrome/Firefox Connector**. Klik dan Add to Browser.",
    ],
  },
  {
    id: 6,
    title: "Tugas 2: Install Connector",
    type: "task",
    icon: "6",
    subtitle: "Praktik Browser - 5 Menit",
    content: ["Pasang ekstensi Zotero di browser favorit Anda."],
    checklist: [
      "Klik tombol 'Install Connector' di website Zotero.",
      "Izinkan (Allow/Add) ekstensi tersebut dipasang di browser.",
      "Pastikan muncul **ikon Zotero** (biasanya bentuk lembaran kertas atau huruf Z) di pojok kanan atas browser.",
    ],
    tasks: [
      "Upload screenshot browser yang menampilkan ikon Zotero Connector.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 2: AKUN ZOTERO (5.2) ---
  {
    id: 7,
    title: "Membuat Akun Zotero",
    type: "content",
    icon: "7",
    subtitle: "Penyimpanan Cloud",
    content: [
      "Zotero menyediakan penyimpanan *cloud* gratis sebesar **300 MB**.",
      "**Manfaat Akun:**",
      "1. Sinkronisasi data antar komputer.",
      "2. Akses library via web.",
      "3. Bergabung dengan Grup Riset.",
      "**Cara:** Buka zotero.org > Klik **Register** > Isi Username, Email, Password > Verifikasi Email.",
    ],
  },
  {
    id: 8,
    title: "Sinkronisasi Akun",
    type: "content",
    icon: "8",
    subtitle: "Menghubungkan Desktop & Cloud",
    content: [
      "Setelah punya akun, hubungkan dengan aplikasi desktop:",
      "1. Buka Zotero Desktop.",
      "2. Klik menu **Edit** > **Preferences**.",
      "3. Pilih tab **Sync**.",
      "4. Masukkan Username dan Password, lalu klik **Set Up Syncing**.",
    ],
  },
  {
    id: 9,
    title: "Tugas 3: Registrasi & Login",
    type: "task",
    icon: "9",
    subtitle: "Praktik Akun - 10 Menit",
    content: ["Lakukan registrasi dan sinkronisasi."],
    checklist: [
      "Daftar akun di zotero.org (gunakan email pribadi/kampus).",
      "Login di aplikasi Zotero Desktop (Menu Preferences > Sync).",
      "Pastikan status tombol berubah menjadi **Unlink Account** (artinya sudah terhubung).",
    ],
    tasks: [
      "Upload screenshot tab Sync yang menunjukkan akun Anda sudah login.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 3: PENGATURAN PENYIMPANAN (5.3) ---
  {
    id: 10,
    title: "Mengatur Penyimpanan Data",
    type: "content",
    icon: "10",
    subtitle: "Manajemen Direktori",
    content: [
      "Secara default, Zotero menyimpan data di drive C (Windows). Ini berisiko hilang jika komputer di-install ulang.",
      "Disarankan memindahkan lokasi data ke drive lain (misal D:).",
      "**Caranya:**",
      "1. Klik **Edit** > **Preferences** > **Advanced**.",
      "2. Pilih tab **Files and Folders**.",
      "3. Pada bagian 'Data Directory Location', pilih **Custom** dan tentukan folder aman.",
    ],
  },
  {
    id: 11,
    title: "Quiz Review Bab 5.1 - 5.3",
    type: "quiz",
    icon: "11",
    subtitle: "Evaluasi Awal Zotero (5 Soal)",
    content: [
      "Uji pemahaman Anda tentang instalasi dan konfigurasi dasar Zotero.",
    ],
    quiz: [
      {
        question: "Apa perbedaan utama lisensi Zotero dibandingkan Mendeley?",
        options: [
          { label: "a", text: "Zotero berbayar, Mendeley gratis" },
          {
            label: "b",
            text: "Zotero Open Source, Mendeley tidak",
            correct: true,
          },
          {
            label: "c",
            text: "Zotero hanya untuk Mac, Mendeley untuk Windows",
          },
        ],
        explanation:
          "Zotero adalah perangkat lunak open source dan free, berbeda dengan Mendeley yang free namun proprietary.",
      },
      {
        question:
          "Berapa kapasitas penyimpanan cloud gratis yang diberikan Zotero?",
        options: [
          { label: "a", text: "2 GB" },
          { label: "b", text: "300 MB", correct: true },
          { label: "c", text: "1 GB" },
        ],
        explanation:
          "Akun gratis Zotero mendapatkan ruang penyimpanan sebesar 300 MB.",
      },
      {
        question: "Fungsi dari Zotero Connector adalah...",
        options: [
          { label: "a", text: "Menghubungkan Zotero dengan Microsoft Word" },
          {
            label: "b",
            text: "Jembatan komunikasi antara browser dan aplikasi Zotero",
            correct: true,
          },
          { label: "c", text: "Mengedit file PDF" },
        ],
        explanation:
          "Connector dipasang di browser untuk menyimpan referensi dari internet langsung ke aplikasi.",
      },
      {
        question:
          "Mengapa disarankan memindahkan lokasi direktori data (Data Directory)?",
        options: [
          { label: "a", text: "Agar Zotero berjalan lebih cepat" },
          {
            label: "b",
            text: "Agar data aman jika komputer di-install ulang",
            correct: true,
          },
          { label: "c", text: "Agar kapasitas penyimpanan bertambah" },
        ],
        explanation:
          "Memindahkan data dari default (Drive C) ke partisi lain mencegah kehilangan data saat instalasi ulang sistem operasi.",
      },
      {
        question: "Menu untuk mengatur sinkronisasi akun terdapat di...",
        options: [
          { label: "a", text: "File > Save" },
          { label: "b", text: "Tools > Plugins" },
          { label: "c", text: "Edit > Preferences > Sync", correct: true },
        ],
        explanation:
          "Pengaturan akun dan sinkronisasi dilakukan melalui menu Preferences pada tab Sync.",
      },
    ],
  },
  {
    id: 12,
    title: "Penutup Sesi Awal Zotero",
    type: "content",
    icon: "12",
    subtitle: "Siap Digunakan",
    content: [
      "Selamat! Anda sudah berhasil:",
      "1. Menginstal Zotero dan Connector.",
      "2. Membuat dan menyinkronkan akun.",
      "3. Mengamankan lokasi penyimpanan data.",
      "Selanjutnya kita akan belajar cara **Mengelola Dokumen (Input Data)**.",
    ],
  },
];