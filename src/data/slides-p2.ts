import type { Slide } from "./slides";

export const slidesP2: Slide[] = [
  // --- PEMBUKAAN SESI LANJUTAN ---
  {
    id: 1,
    title: "Lanjutan Modul Word Dasar",
    type: "content",
    icon: "1",
    subtitle: "Topik 1.6 - 1.11",
    content: [
      "Selamat datang kembali! Pada sesi ini kita akan memperdalam kemampuan formatting dokumen.",
      "**Fokus Materi:**",
      "1. Pengaturan Paragraf & Halaman (Spacing, Margins).",
      "2. Efisiensi Kerja (Format Painter, Find & Replace).",
      "3. Pengorganisasian Data (Lists, Ruler, Tab Stops).",
    ],
  },

  // --- TOPIK 1.6: LINE SPACING ---
  {
    id: 2,
    title: "Mengatur Line Spacing",
    type: "content",
    icon: "2",
    subtitle: "Jarak Antar Baris",
    content: [
      "**Default:** Word 2013 biasanya menggunakan spasi 1.15 dan memberikan jarak 10 poin setelah paragraf.",
      "**Cara Mengubah:**",
      "1. Sorot paragraf yang ingin diubah.",
      "2. Tab Home > Grup Paragraph > Klik Ikon Line and Paragraph Spacing.",
      "**Opsi Umum:** 1.0 (Single), 1.5, dan 2.0 (Double).",
    ],
    note: "Tips: Pilih 'Remove Space After Paragraph' jika ingin jarak yang lebih rapat antar paragraf.",
  },
  {
    id: 3,
    title: "Tugas 1: Kerapian Paragraf",
    type: "task",
    icon: "3",
    subtitle: "Praktik Spacing - 5 Menit",
    content: [
      "Buka dokumen baru atau dokumen latihan sebelumnya.",
      "Buat 3 paragraf teks dummy (bebas).",
    ],
    checklist: [
      "Paragraf 1: Atur menjadi **Spasi 1.0 (Single)**.",
      "Paragraf 2: Atur menjadi **Spasi 2.0 (Double)**.",
      "Paragraf 3: Atur menjadi **Spasi 1.5** dan hapus jarak setelah paragraf (**Remove Space After Paragraph**).",
    ],
    tasks: ["Simpan file dengan nama 'Latihan_Spasi.docx' dan upload."],
    requireUpload: true,
  },

  // --- TOPIK 1.7: MARGINS ---
  {
    id: 4,
    title: "Mengatur Margins",
    type: "content",
    icon: "4",
    subtitle: "Batas Tepi Kertas",
    content: [
      "**Definisi:** Area kosong di antara tepi kertas dan teks dokumen.",
      "**Default:** Biasanya 2.54 cm (1 inci) untuk semua sisi (Atas, Bawah, Kiri, Kanan).",
      "**Cara Mengubah:**",
      "Tab Page Layout > Grup Page Setup > Margins.",
      "Anda bisa memilih preset (Normal, Narrow, Wide) atau **Custom Margins** untuk ukuran spesifik.",
    ],
  },
  {
    id: 5,
    title: "Tugas 2: Margins Skripsi",
    type: "task",
    icon: "5",
    subtitle: "Praktik Margins - 5 Menit",
    content: [
      "Atur dokumen Anda menggunakan standar margin skripsi umum (4-4-3-3).",
    ],
    checklist: [
      "Buka menu **Custom Margins**.",
      "Top (Atas): **4 cm**.",
      "Left (Kiri): **4 cm**.",
      "Bottom (Bawah): **3 cm**.",
      "Right (Kanan): **3 cm**.",
    ],
    tasks: [
      "Screenshot jendela 'Page Setup' yang menunjukkan angka margin tersebut, lalu upload.",
    ],
    requireUpload: true,
  },

  // --- TOPIK 1.8: MENGATUR DOKUMEN (FORMAT PAINTER & EDITING) ---
  {
    id: 6,
    title: "Format Painter",
    type: "content",
    icon: "6",
    subtitle: "Salin Format Cepat",
    content: [
      "Fitur ini menyalin **gaya/format** teks (font, warna, ukuran), bukan teksnya.",
      "**Langkah:**",
      "1. Blok teks sumber yang formatnya bagus.",
      "2. Klik **Format Painter** (ikon kuas) di Tab Home > Clipboard.",
      "3. Sapukan kursor ke teks target.",
      "**Tips:** Klik dua kali ikon Format Painter untuk menggunakannya berulang kali.",
    ],
  },
  {
    id: 7,
    title: "Fitur Editing (Find & Replace)",
    type: "content",
    icon: "7",
    subtitle: "Menemukan & Mengganti Kata",
    content: [
      "Terletak di Tab Home > Grup Editing.",
      "**Find:** Menemukan kata tertentu dalam dokumen panjang.",
      "**Replace:** Mengganti kata secara otomatis (misal: mengganti semua kata 'Siswa' menjadi 'Mahasiswa').",
      "**Select:** Memilih objek atau teks tertentu.",
    ],
  },
  {
    id: 8,
    title: "Tugas 3: Editing Massal",
    type: "task",
    icon: "8",
    subtitle: "Praktik Find & Replace - 10 Menit",
    content: [
      "Download dokumen latihan yang sudah disediakan, lalu gunakan fitur Find & Replace untuk mengeditnya sesuai instruksi.",
    ],
    hyperlink: {
      text: "Download dokumen latihan",
      url: "/docs/Pintu di Balik Kabut.docx",
    },
    checklist: [
      "Gunakan fitur **Replace**.",
      "Cari kata-kata anomali dalam cerita, lalu rubah menjadi kata yang benar",
      "Pastikan semua kata berubah sekaligus (Replace All).",
    ],
    tasks: ["Upload hasil dokumen yang sudah diedit."],
    requireUpload: true,
  },

  // --- MID QUIZ ---
  {
    id: 9,
    title: "Quiz Pertengahan",
    type: "quiz",
    icon: "9",
    subtitle: "Review Singkat",
    content: ["Mari tes pemahaman Anda tentang Spacing, Margin, dan Editing."],
    quiz: [
      {
        question: "Berapa ukuran margin default (Normal) pada Microsoft Word?",
        options: [
          { label: "a", text: "1 cm di semua sisi" },
          { label: "b", text: "2.54 cm di semua sisi", correct: true },
          { label: "c", text: "4 cm kiri, 3 cm kanan" },
        ],
        explanation:
          "Ukuran default margin Normal adalah 2.54 cm (setara 1 inci) untuk atas, bawah, kiri, dan kanan.",
      },
      {
        question: "Ikon 'Kuas' (Format Painter) berfungsi untuk...",
        options: [
          { label: "a", text: "Mewarnai latar belakang kertas" },
          {
            label: "b",
            text: "Menyalin format teks ke teks lain",
            correct: true,
          },
          { label: "c", text: "Menggambar bentuk bebas" },
        ],
        explanation:
          "Format Painter memungkinkan pengguna menyalin format (jenis font, warna, ukuran) dari satu teks ke teks lain dengan cepat.",
      },
      {
        question:
          "Jika ingin mengganti kata 'Sekolah' menjadi 'Universitas' di seluruh dokumen sekaligus, fitur apa yang digunakan?",
        options: [
          { label: "a", text: "Find" },
          { label: "b", text: "Select" },
          { label: "c", text: "Replace", correct: true },
        ],
        explanation:
          "Replace digunakan untuk menemukan kata tertentu dan menggantinya dengan kata lain secara otomatis.",
      },
    ],
  },

  // --- TOPIK 1.9: BULLETS & NUMBERING ---
  {
    id: 10,
    title: "Bulleted & Numbered Lists",
    type: "content",
    icon: "10",
    subtitle: "Membuat Daftar",
    content: [
      "**Bullets:** Menggunakan simbol (titik, panah) untuk daftar yang tidak berurutan.",
      "**Numbering:** Menggunakan angka/huruf (1, 2, A, B) untuk daftar berurutan.",
      "**Multilevel List:** Daftar bertingkat (misal 1, 1.1, 1.1.1).",
      "Anda bisa mengubah simbol bullet melalui panah kecil di samping ikonnya.",
    ],
  },

  // --- TOPIK 1.10 & 1.11: RULER & TAB STOPS ---
  {
    id: 11,
    title: "Ruler & Tab Stops",
    type: "content",
    icon: "11",
    subtitle: "Meratakan Teks Manual",
    content: [
      "**Ruler:** Penggaris untuk melihat ukuran dan mengatur tab.",
      "**Tab Stops:** Penanda posisi pemberhentian kursor saat tombol Tab ditekan.",
      "Jenis Tab Stop:",
      "- **Left Tab:** Teks rata kiri dari titik tab.",
      "- **Center Tab:** Teks rata tengah di titik tab.",
      "- **Right Tab:** Teks rata kanan (biasanya untuk angka/harga).",
      "- **Decimal Tab:** Meratakan angka desimal (koma).",
    ],
  },
  {
    id: 12,
    title: "Tab Leaders (Titik-Titik Daftar Isi)",
    type: "content",
    icon: "12",
    subtitle: "Fitur Rahasia",
    content: [
      "Pernah melihat Daftar Isi atau Menu Harga dengan titik-titik rapi? Itu menggunakan **Tab Leaders**.",
      "**Caranya:**",
      "1. Buka kotak dialog Paragraph > Klik tombol **Tabs** di pojok kiri bawah.",
      "2. Tentukan posisi Tab Stop (misal 15 cm).",
      "3. Pilih Alignment (misal Right).",
      "4. Pilih **Leader** (pilih opsi titik-titik '2.......').",
      "5. Klik Set > OK.",
    ],
  },
  {
    id: 13,
    title: "Tugas 4: Membuat Daftar Menu",
    type: "task",
    icon: "13",
    subtitle: "Praktik Tab Stops - 15 Menit",
    content: [
      "Buatlah daftar menu sederhana menggunakan **Tab Leaders** (bukan diketik titik manual!).",
    ],
    checklist: [
      "Buat judul 'DAFTAR MENU'.",
      "Isi item: 'Nasi Goreng', 'Es Teh', 'Ayam Bakar'.",
      "Atur **Right Tab** di posisi 14 cm.",
      "Aktifkan **Leader (titik-titik)** agar muncul otomatis antara nama makanan dan harga.",
      "Masukkan harga di sebelah kanan (misal Rp 15.000).",
    ],
    tasks: ["Upload file 'Menu_TabLeaders.docx'."],
    requireUpload: true,
    note: "Pastikan titik-titik muncul otomatis saat Anda menekan tombol Tab, bukan diketik manual.",
  },
  {
    id: 14,
    title: "Tugas 5: Daftar Bertingkat",
    type: "task",
    icon: "14",
    subtitle: "Praktik Multilevel List - 10 Menit",
    content: [
      "Buat daftar urutan Bab dan Sub-bab menggunakan fitur **Multilevel List**.",
    ],
    checklist: [
      "1. Pendahuluan",
      "   a. Latar Belakang (Gunakan Increase Indent)",
      "   b. Rumusan Masalah",
      "2. Tinjauan Pustaka",
      "   a. Teori A",
      "   b. Teori B",
    ],
    tasks: ["Upload dokumen hasil daftar bertingkat ini."],
    requireUpload: true,
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 15,
    title: "Quiz Akhir Modul",
    type: "quiz",
    icon: "15",
    subtitle: "Evaluasi Bab 1.6 - 1.11 (15 Soal)",
    content: [
      "Jawablah pertanyaan berikut untuk menguji penguasaan materi formatting Anda.",
    ],
    quiz: [
      {
        question: "Berapa spasi baris (line spacing) default pada Word 2013?",
        options: [
          { label: "a", text: "1.0 (Single)" },
          { label: "b", text: "1.15", correct: true },
          { label: "c", text: "1.5" },
        ],
        explanation:
          "Secara default, Microsoft Word 2013 mengatur spasi sebesar 1.15 antar baris.",
      },
      {
        question:
          "Jika Anda ingin menghilangkan jarak tambahan setelah paragraf, opsi apa yang dipilih?",
        options: [
          { label: "a", text: "Add Space Before Paragraph" },
          { label: "b", text: "Remove Space After Paragraph", correct: true },
          { label: "c", text: "Double Space" },
        ],
        explanation:
          "Remove Space After Paragraph digunakan untuk menghapus baris/jarak tambahan otomatis setelah paragraf.",
      },
      {
        question: "Di tab manakah pengaturan Margins berada?",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Insert" },
          { label: "c", text: "Page Layout", correct: true },
        ],
        explanation:
          "Pengaturan Margins terdapat di dalam tab Page Layout pada grup Page Setup.",
      },
      {
        question: "Apa fungsi dari fitur 'Format Painter'?",
        options: [
          { label: "a", text: "Menggambar tabel" },
          {
            label: "b",
            text: "Menyalin format teks (font, warna, dll) ke teks lain",
            correct: true,
          },
          { label: "c", text: "Menghapus teks" },
        ],
        explanation:
          "Format Painter memungkinkan penyalinan format dari satu bagian teks ke bagian lain dengan cepat.",
      },
      {
        question: "Fitur 'Show/Hide' (simbol ¶) berguna untuk...",
        options: [
          {
            label: "a",
            text: "Melihat karakter tersembunyi seperti spasi dan enter",
            correct: true,
          },
          { label: "b", text: "Menyembunyikan gambar" },
          { label: "c", text: "Mengunci dokumen" },
        ],
        explanation:
          "Fitur ini menampilkan tanda paragraf dan simbol pemformatan tersembunyi untuk membantu melihat struktur dokumen.",
      },
      {
        question:
          "Tombol keyboard untuk menghapus format teks (Clear Formatting) ikonnya berbentuk...",
        options: [
          {
            label: "a",
            text: "Huruf A dengan penghapus (karet)",
            correct: true,
          },
          { label: "b", text: "Gunting" },
          { label: "c", text: "Disket" },
        ],
        explanation:
          "Ikon Clear Formatting biasanya digambarkan sebagai huruf A dengan penghapus berwarna pink/ungu.",
      },
      {
        question:
          "Untuk menemukan kata tertentu dalam dokumen, kita menggunakan fitur...",
        options: [
          { label: "a", text: "Find", correct: true },
          { label: "b", text: "Replace" },
          { label: "c", text: "Select" },
        ],
        explanation:
          "Find digunakan untuk mencari kata, frase, atau angka tertentu dalam dokumen.",
      },
      {
        question:
          "Jika ingin mengganti kata 'Januari' menjadi 'Februari' secara otomatis, gunakan...",
        options: [
          { label: "a", text: "Find" },
          { label: "b", text: "Replace", correct: true },
          { label: "c", text: "Go To" },
        ],
        explanation:
          "Replace berfungsi untuk mengganti teks yang ditemukan dengan teks baru yang ditentukan.",
      },
      {
        question: "Apa bedanya Bullets dan Numbering?",
        options: [
          { label: "a", text: "Bullets pakai angka, Numbering pakai simbol" },
          {
            label: "b",
            text: "Bullets pakai simbol, Numbering pakai angka/huruf",
            correct: true,
          },
          { label: "c", text: "Sama saja" },
        ],
        explanation:
          "Bullets menggunakan simbol (titik, kotak), sedangkan Numbering menggunakan urutan (1, 2, 3 atau a, b, c).",
      },
      {
        question:
          "Untuk membuat daftar 1.1, 1.2, dst, fitur yang paling tepat adalah...",
        options: [
          { label: "a", text: "Bullets" },
          { label: "b", text: "Multilevel List", correct: true },
          { label: "c", text: "Indent" },
        ],
        explanation:
          "Multilevel List digunakan untuk membuat daftar bertingkat seperti struktur bab (1.1, 1.2).",
      },
      {
        question:
          "Untuk menampilkan penggaris di bagian atas dokumen, kita harus mencentang 'Ruler' di tab...",
        options: [
          { label: "a", text: "Review" },
          { label: "b", text: "View", correct: true },
          { label: "c", text: "Home" },
        ],
        explanation:
          "Opsi untuk menampilkan/menyembunyikan Ruler terdapat di tab View grup Show.",
      },
      {
        question:
          "Jenis Tab Stop yang membuat teks rata kanan (ujung kanan teks lurus) adalah...",
        options: [
          { label: "a", text: "Left Tab" },
          { label: "b", text: "Center Tab" },
          { label: "c", text: "Right Tab", correct: true },
        ],
        explanation:
          "Right Tab Stop mengatur agar teks berjalan ke kiri saat diketik, sehingga sisi kanannya rata.",
      },
      {
        question:
          "Tab Stop yang digunakan untuk meluruskan angka desimal (koma) adalah...",
        options: [
          { label: "a", text: "Decimal Tab", correct: true },
          { label: "b", text: "Bar Tab" },
          { label: "c", text: "Center Tab" },
        ],
        explanation:
          "Decimal Tab menyelaraskan angka berdasarkan letak titik desimalnya.",
      },
      {
        question:
          "Fitur untuk membuat titik-titik otomatis (seperti di Daftar Isi) disebut...",
        options: [
          { label: "a", text: "Bullet" },
          { label: "b", text: "Leader", correct: true },
          { label: "c", text: "Footer" },
        ],
        explanation:
          "Leader adalah karakter (biasanya titik-titik) yang mengisi ruang kosong sebelum tab stop.",
      },
      {
        question: "Bagaimana cara cepat menghapus Tab Stop dari Ruler?",
        options: [
          { label: "a", text: "Klik kanan > Delete" },
          {
            label: "b",
            text: "Klik dan tarik ikon Tab ke bawah menjauhi Ruler",
            correct: true,
          },
          { label: "c", text: "Tekan Backspace" },
        ],
        explanation:
          "Tab stop dapat dihapus dengan cara mengklik dan menariknya ke bawah keluar dari area ruler.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 16,
    title: "Selesai",
    type: "content",
    icon: "16",
    subtitle: "Materi 1.6 - 1.11 Tuntas",
    content: [
      "Selamat! Anda telah menguasai teknik formatting lanjutan.",
      "Kemampuan mengatur Tab Stops dan Margins sangat krusial untuk membuat dokumen formal yang rapi.",
      "Sampai jumpa di materi selanjutnya!",
    ],
  },
];
