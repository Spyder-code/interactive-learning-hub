import React from "react";

export type SlideType = "content" | "quiz" | "task" | "challenge";

export interface QuizOption {
  label: string;
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  question: string;
  questionType?: "multiple-choice" | "free-text"; // Default to multiple-choice if not specified
  options?: QuizOption[]; // Optional for multiple-choice questions
  correctAnswer?: string; // For free-text questions (optional)
  explanation?: string;
  placeholder?: string; // Placeholder text for free-text input
}

export interface Hyperlink {
  url: string;
  text: string;
}

export interface Slide {
  id: number;
  title: string;
  type: SlideType;
  icon: React.ReactNode;
  subtitle?: string;
  content?: string[];
  checklist?: string[];
  tasks?: string[];
  quiz?: QuizQuestion[];
  timer?: number; // minutes
  note?: string;
  requireUpload?: boolean; // Enable file upload for tasks
  hyperlink?: Hyperlink; // Enable clickable hyperlinks
}

export const slides: Slide[] = [
  // --- BAGIAN 1: PENDAHULUAN (1.1) ---
  {
    id: 1,
    title: "Pengenalan Microsoft Word",
    type: "content",
    icon: "1",
    subtitle: "Modul Pembelajaran Dasar",
    content: [
      "**Definisi:** Microsoft Word adalah perangkat lunak pengolah kata yang digunakan untuk membuat surat, laporan, karya ilmiah, dan lain sebagainya.",
      "Fungsi utamanya meliputi:",
    ],
    checklist: [
      "Membuat dokumen baru dan menyimpannya",
      "Mengedit dan memformat dokumen yang telah ada",
      "Membuat dokumen grafis (gambar, grafik, tabel)",
    ],
  },
  {
    id: 2,
    title: "Operasi Dasar Program",
    type: "content",
    icon: "2",
    subtitle: "Membuka & Menutup",
    content: [
      "**Cara Mengaktifkan:**",
      "1. Klik dua kali ikon Microsoft Word di desktop, atau",
      "2. Klik tombol Windows > Pilih Microsoft Office > Klik Microsoft Word.",
      "**Cara Mengakhiri:**",
      "1. Klik Menu File > Pilih Exit, atau",
      "2. Tekan tombol Close (X) di kanan atas jendela program.",
    ],
  },
  {
    id: 3,
    title: "Tugas 1: Pemanasan",
    type: "task",
    icon: "3",
    subtitle: "Praktik Dasar - 5 Menit",
    content: [
      "Mari kita pastikan aplikasi Microsoft Word Anda berfungsi dengan baik.",
      "1. Buka aplikasi Microsoft Word di komputer Anda.",
      "2. Ketikkan Nama Lengkap dan NIM Anda di halaman kosong.",
      "3. Capture layar (screenshot) dokumen tersebut dan simpan sebagai file gambar.",
    ],
    tasks: ["Upload screenshot dokumen Word Anda yang berisi nama dan NIM."],
    requireUpload: true,
    note: "Tugas ini bertujuan memastikan Anda bisa membuka dan menulis dokumen sederhana.",
  },

  // --- BAGIAN 2: PENGENALAN TAMPILAN (1.2) ---
  {
    id: 4,
    title: "Mengenal Antarmuka (Interface)",
    type: "content",
    icon: "4",
    subtitle: "Navigasi Layar Utama",
    content: [
      "**Title Bar:** Menampilkan judul dokumen yang sedang aktif.",
      "**Quick Access Toolbar:** Toolbar untuk perintah cepat (Save, Undo, Redo).",
      "**Ribbon:** Deretan menu utama (Home, Insert, dll) yang berisi grup ikon.",
      "**Ruler:** Penggaris untuk mengatur margin di lembar kerja.",
    ],
  },
  {
    id: 5,
    title: "Status Bar & View",
    type: "content",
    icon: "5",
    subtitle: "Informasi Dokumen",
    content: [
      "Terletak di bagian bawah jendela aplikasi:",
      "**Page Number:** Informasi nomor halaman kerja.",
      "**Word Count:** Menghitung jumlah kata yang sudah diketik.",
      "**Zoom:** Mengatur besar kecilnya tampilan halaman.",
      "**Language:** Informasi bahasa yang digunakan untuk pengecekan ejaan.",
    ],
  },
  {
    id: 6,
    title: "Quiz Sesi 1: Interface",
    type: "quiz",
    icon: "6",
    subtitle: "Uji Pemahaman Antarmuka",
    content: ["Mari cek seberapa teliti Anda memperhatikan tampilan Word."],
    quiz: [
      {
        question:
          "Bagian yang menampilkan judul dokumen yang sedang aktif disebut...",
        options: [
          { label: "a", text: "Ribbon" },
          { label: "b", text: "Title Bar", correct: true },
          { label: "c", text: "Status Bar" },
        ],
        explanation:
          "Title Bar berada di bagian paling atas dan menampilkan nama file/judul dokumen.",
      },
      {
        question:
          "Dimana kita bisa melihat jumlah kata (Word Count) yang sudah diketik?",
        options: [
          { label: "a", text: "Title Bar" },
          { label: "b", text: "Status Bar", correct: true },
          { label: "c", text: "Ruler" },
        ],
        explanation:
          "Status Bar di bagian bawah jendela menampilkan informasi statistik seperti jumlah halaman dan jumlah kata.",
      },
      {
        question:
          "Toolbar yang berisi ikon Save, Undo, dan Redo secara default adalah...",
        options: [
          { label: "a", text: "Quick Access Toolbar", correct: true },
          { label: "b", text: "Scroll Bar" },
          { label: "c", text: "View Toolbar" },
        ],
        explanation:
          "Quick Access Toolbar menyediakan akses cepat ke perintah umum tanpa harus mencari di dalam tab menu.",
      },
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Identifikasi Layar",
    type: "task",
    icon: "7",
    subtitle: "Eksplorasi Interface - 10 Menit",
    content: [
      "Buka kembali dokumen Word Anda.",
      "Temukan bagian **Zoom Slider** (biasanya di pojok kanan bawah) dan ubah tampilan menjadi 50%.",
      "Pastikan **Ruler** (penggaris) terlihat di bagian atas kertas.",
    ],
    tasks: [
      "Screenshot tampilan Word Anda yang menunjukkan Zoom 50% dan Ruler yang aktif, lalu upload gambar tersebut.",
    ],
    requireUpload: true,
    note: "Jika Ruler tidak muncul, cari di Tab View > centang Ruler.",
  },

  // --- BAGIAN 3: MEMULAI DOKUMEN (1.3) ---
  {
    id: 8,
    title: "Membuat & Membuka Dokumen",
    type: "content",
    icon: "8",
    subtitle: "Tab File",
    content: [
      "**New (Baru):**",
      "Gunakan 'Blank Document' untuk kertas kosong, atau 'Template' untuk desain siap pakai (seperti Resume/Agenda).",
      "**Open (Buka):**",
      "Untuk membuka file yang tersimpan. Klik Tab File > Open > Pilih lokasi file.",
    ],
  },
  {
    id: 9,
    title: "Tugas 3: Menggunakan Template",
    type: "task",
    icon: "9",
    subtitle: "Praktik Template - 10 Menit",
    content: [
      "Word memiliki fitur *Built-in Template* yang memudahkan pekerjaan.",
    ],
    checklist: [
      "Klik Tab File > New.",
      "Cari dan pilih salah satu template (misalnya: 'Resume', 'Letter', atau 'Report').",
      "Klik 'Create'.",
      "Edit sedikit teks di dalamnya dengan nama Anda.",
    ],
    tasks: ["Simpan dokumen hasil template tersebut dan upload di sini."],
    requireUpload: true,
  },

  // --- BAGIAN 4: ORIENTASI HALAMAN (1.4) ---
  {
    id: 10,
    title: "Orientasi Halaman",
    type: "content",
    icon: "10",
    subtitle: "Portrait vs Landscape",
    content: [
      "Kita dapat mengatur posisi kertas sesuai kebutuhan:",
      "**Portrait:** Posisi tegak/vertikal (standar surat).",
      "**Landscape:** Posisi tidur/horizontal (standar tabel lebar).",
      "**Caranya:** Klik Tab Page Layout > Orientation > Pilih Portrait/Landscape.",
    ],
  },
  {
    id: 11,
    title: "Page Breaks (Memutus Halaman)",
    type: "content",
    icon: "11",
    subtitle: "Jangan Tekan Enter Berkali-kali!",
    content: [
      "**Masalah:** Menekan Enter terus-menerus untuk pindah ke halaman baru membuat dokumen berantakan saat diedit.",
      "**Solusi:** Gunakan fitur **Page Break**.",
      "**Caranya:** Klik Tab Insert > Page Break (atau Ctrl+Enter).",
      "Ini akan memaksa kursor pindah ke halaman baru dengan rapi.",
    ],
  },
  {
    id: 12,
    title: "Tugas 4: Layouting",
    type: "task",
    icon: "12",
    subtitle: "Praktik Halaman - 10 Menit",
    content: [
      "Buat dokumen baru.",
      "Halaman 1: Tulis 'Halaman Portrait'. Biarkan orientasi Portrait.",
      "Gunakan **Page Break** untuk membuat halaman 2.",
      "Halaman 2: Tulis 'Halaman Landscape'. Ubah orientasi halaman ini menjadi Landscape (gunakan Page Setup > Apply to: This Point Forward/This Section).",
    ],
    tasks: [
      "Upload file dokumen yang memiliki dua orientasi halaman berbeda tersebut.",
    ],
    requireUpload: true,
    note: "Tantangan: Cobalah membuat satu file dengan Portrait dan Landscape sekaligus.",
  },

  // --- BAGIAN 5: FORMAT FONT (1.5) ---
  {
    id: 13,
    title: "Format Font Dasar",
    type: "content",
    icon: "13",
    subtitle: "Tab Home > Grup Font",
    content: [
      "Gunakan grup Font untuk mempercantik teks:",
      "**Bold (B):** Menebalkan teks.",
      "**Italic (I):** Memiringkan teks.",
      "**Underline (U):** Garis bawah.",
      "**Font Size:** Mengubah ukuran huruf.",
      "**Font Color:** Mengubah warna huruf.",
    ],
  },
  {
    id: 14,
    title: "Change Case",
    type: "content",
    icon: "14",
    subtitle: "Mengubah Kapitalisasi Otomatis",
    content: [
      "Fitur 'Change Case' (ikon Aa) sangat berguna untuk mengubah teks tanpa mengetik ulang:",
      "**Sentence case:** Huruf besar di awal kalimat.",
      "**lowercase:** Huruf kecil semua.",
      "**UPPERCASE:** Huruf besar semua.",
      "**Capitalize Each Word:** Huruf besar di setiap awal kata.",
      "**Toggle Case:** Membalikkan kapitalisasi (kecil jadi besar, besar jadi kecil).",
    ],
  },
  {
    id: 15,
    title: "Efek Teks & Clear Formatting",
    type: "content",
    icon: "15",
    subtitle: "Fitur Lanjutan Font",
    content: [
      "**Text Effect:** Menambahkan bayangan (Shadow), pantulan (Reflection), atau cahaya (Glow) pada teks agar artistik.",
      "**Clear Formatting:** (Ikon penghapus dengan huruf A) Berfungsi menghapus seluruh format (warna, bold, font) dan mengembalikan teks ke bentuk standar/polos.",
    ],
  },
  {
    id: 16,
    title: "Tugas 5: Kreasi Teks",
    type: "task",
    icon: "16",
    subtitle: "Praktik Formatting - 10 Menit",
    content: [
      "Ketik kalimat: 'Pelatihan Microsoft Word Dasar'.",
      "Copy kalimat tersebut menjadi 3 baris.",
    ],
    checklist: [
      "Baris 1: Ubah menjadi **UPPERCASE** dan **Bold**.",
      "Baris 2: Beri efek **Text Effect** (Shadow/Glow) dan perbesar ukuran font.",
      "Baris 3: Tulis dengan format acak, lalu gunakan tombol **Clear Formatting** untuk meresetnya.",
    ],
    tasks: ["Upload capture layar (screenshot) hasil dokumen Word Anda."],
    requireUpload: true,
  },

  // --- BAGIAN 6: PENUTUP & EVALUASI ---
  {
    id: 17,
    title: "Rangkuman Materi",
    type: "content",
    icon: "17",
    subtitle: "Review Bab 1.1 - 1.5",
    content: [
      "Kita telah mempelajari:",
      "1. Pengenalan & Fungsi Word (Surat, Laporan).",
      "2. Antarmuka (Ribbon, Ruler, Status Bar).",
      "3. Manajemen File (New, Open, Save, Templates).",
      "4. Layout (Orientation, Page Break).",
      "5. Formatting (Font style, Change Case, Clear Formatting).",
    ],
  },
  {
    id: 18,
    title: "Quiz Akhir: Pemahaman Menyeluruh",
    type: "quiz",
    icon: "18",
    subtitle: "Evaluasi Akhir (15 Soal)",
    content: [
      "Jawablah pertanyaan berikut untuk menguji pemahaman Anda dari Bab 1.1 hingga 1.5.",
    ],
    quiz: [
      {
        question: "Microsoft Word dikategorikan sebagai perangkat lunak...",
        options: [
          { label: "a", text: "Pengolah Angka" },
          { label: "b", text: "Pengolah Kata", correct: true },
          { label: "c", text: "Pengolah Video" },
        ],
        explanation:
          "Microsoft Word merupakan perangkat lunak pengolah kata yang umum digunakan untuk membuat surat dan laporan.",
      },
      {
        question: "Manakah yang merupakan fungsi utama Microsoft Word?",
        options: [
          { label: "a", text: "Membuat presentasi animasi" },
          {
            label: "b",
            text: "Membuat dokumen grafis (gambar, grafik, tabel)",
            correct: true,
          },
          { label: "c", text: "Mengedit video" },
        ],
        explanation:
          "Salah satu fungsi Word adalah membuat dokumen grafis yang terdiri dari gambar, grafik, dan tabel.",
      },
      {
        question: "Cara paling umum membuka program Microsoft Word adalah...",
        options: [
          { label: "a", text: "Klik kanan desktop > Refresh" },
          {
            label: "b",
            text: "Klik dua kali ikon Microsoft Word di desktop",
            correct: true,
          },
          { label: "c", text: "Menekan tombol Power" },
        ],
        explanation:
          "Cara paling umum adalah dengan mengklik dua kali ikon Microsoft Word di desktop.",
      },
      {
        question: "Untuk menutup program Word, langkah yang benar adalah...",
        options: [
          { label: "a", text: "File > New" },
          { label: "b", text: "File > Exit", correct: true },
          { label: "c", text: "Insert > Close" },
        ],
        explanation:
          "Untuk mengakhiri program dapat dilakukan dengan Klik Menu File > pilih Exit.",
      },
      {
        question:
          "Bagian antarmuka yang menampilkan nama file dokumen yang sedang aktif adalah...",
        options: [
          { label: "a", text: "Status Bar" },
          { label: "b", text: "Title Bar", correct: true },
          { label: "c", text: "Ruler" },
        ],
        explanation:
          "Title Bar berfungsi menampilkan judul halaman dokumen yang sedang dioperasikan atau sedang aktif.",
      },
      {
        question:
          "Toolbar yang secara default berisi tombol Save, Undo, dan Redo disebut...",
        options: [
          { label: "a", text: "Ribbon" },
          { label: "b", text: "Quick Access Toolbar", correct: true },
          { label: "c", text: "Scroll Bar" },
        ],
        explanation:
          "Quick Access toolbar berfungsi untuk melakukan perintah-perintah cepat seperti shortcut Save, Undo, dan Redo.",
      },
      {
        question: "Informasi jumlah kata (Word Count) terletak di bagian...",
        options: [
          { label: "a", text: "Title Bar" },
          { label: "b", text: "Status Bar", correct: true },
          { label: "c", text: "Tab View" },
        ],
        explanation:
          "Status Bar berisikan informasi-informasi di halaman kerja seperti Page Number dan Word Count.",
      },
      {
        question:
          "Fitur untuk memperbesar dan memperkecil tampilan halaman kerja adalah...",
        options: [
          { label: "a", text: "Minimize" },
          { label: "b", text: "Zoom", correct: true },
          { label: "c", text: "Maximize" },
        ],
        explanation:
          "Zoom digunakan untuk memperkecil dan memperbesar tampilan halaman kerja.",
      },
      {
        question: "Apa perbedaan Save dan Save As?",
        options: [
          {
            label: "a",
            text: "Save As membuat file baru tanpa menghapus file lama",
            correct: true,
          },
          { label: "b", text: "Save As menghapus file lama" },
          { label: "c", text: "Tidak ada bedanya" },
        ],
        explanation:
          "Save As digunakan untuk membuat file baru. Jika kita memilih Save As maka kita akan membuat file yang baru tanpa menghapus yang lama.",
      },
      {
        question: "Orientasi kertas 'Landscape' berarti...",
        options: [
          { label: "a", text: "Posisi kertas berdiri (vertikal)" },
          {
            label: "b",
            text: "Posisi kertas tidur (horizontal)",
            correct: true,
          },
          { label: "c", text: "Ukuran kertas A4" },
        ],
        explanation:
          "Landscape adalah pengaturan posisi kertas secara tidur atau horizontal.",
      },
      {
        question:
          "Fitur untuk memutus halaman dan memulai halaman baru secara rapi adalah...",
        options: [
          { label: "a", text: "Tekan Enter berkali-kali" },
          { label: "b", text: "Page Break", correct: true },
          { label: "c", text: "Margins" },
        ],
        explanation:
          "Page Break merupakan fitur untuk memutus halaman. Secara otomatis Word menyisipkan page break jika mencapai akhir halaman, tapi bisa juga manual.",
      },
      {
        question: "Fitur 'Change Case' digunakan untuk...",
        options: [
          { label: "a", text: "Mengubah warna teks" },
          {
            label: "b",
            text: "Mengubah kapitalisasi huruf (besar/kecil)",
            correct: true,
          },
          { label: "c", text: "Menghapus teks" },
        ],
        explanation:
          "Change Case berfungsi untuk mengubah kapitalisasi setiap kata, seperti Sentence case, UPPERCASE, dll.",
      },
      {
        question:
          "Untuk memberikan efek bayangan atau pantulan pada teks, gunakan fitur...",
        options: [
          { label: "a", text: "Text Effect", correct: true },
          { label: "b", text: "Highlight" },
          { label: "c", text: "Bold" },
        ],
        explanation:
          "Text Effect digunakan untuk menambahkan efek bergaya pada teks seperti bayangan, pantulan, dan cahaya.",
      },
      {
        question: "Fungsi dari tombol 'Clear Formatting' adalah...",
        options: [
          { label: "a", text: "Menghapus tulisan" },
          {
            label: "b",
            text: "Mereset format teks menjadi standar",
            correct: true,
          },
          { label: "c", text: "Mengubah teks menjadi miring" },
        ],
        explanation:
          "Clear Formatting berfungsi untuk menghapus/mereset segala bentuk pemformatan pada teks dan menjadikannya teks standar.",
      },
      {
        question: "Grup Font, Paragraph, dan Clipboard terletak pada Tab...",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Home", correct: true },
          { label: "c", text: "Design" },
        ],
        explanation:
          "Tab Home adalah tampilan default yang menggabungkan fitur format teks seperti font dan paragraf.",
      },
    ],
  },
  {
    id: 19,
    title: "Penutup",
    type: "content",
    icon: "19",
    subtitle: "Selesai",
    content: [
      "Selamat! Anda telah menyelesaikan materi dasar Microsoft Word Bab 1.1 hingga 1.5.",
      "Teruslah berlatih menggunakan fitur-fitur ini agar semakin mahir dalam membuat dokumen yang rapi dan profesional.",
    ],
  },
];