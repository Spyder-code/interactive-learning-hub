import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- SESI 1: MICROSOFT WORD (BAB 1) ---
  {
    id: 1,
    title: "Quiz 1: Dasar Microsoft Word",
    type: "quiz",
    icon: "1",
    subtitle: "Bab 1 - Basic",
    content: ["Uji pemahaman tentang operasi dasar dan formatting di Word."],
    quiz: [
      {
        question: "Apa fungsi utama dari fitur 'Save As'?",
        options: [
          { label: "a", text: "Menyimpan perubahan pada file yang sama" },
          {
            label: "b",
            text: "Menyimpan dokumen dengan nama atau lokasi baru",
            correct: true,
          },
          { label: "c", text: "Menghapus file lama" },
        ],
        explanation:
          "Save As memungkinkan Anda membuat salinan file dengan nama atau lokasi berbeda tanpa menimpa file asli.",
      },
      {
        question:
          "Shortcut keyboard untuk meratakan teks 'Justify' (Rata Kanan-Kiri) adalah...",
        options: [
          { label: "a", text: "Ctrl + L" },
          { label: "b", text: "Ctrl + E" },
          { label: "c", text: "Ctrl + J", correct: true },
        ],
        explanation:
          "Ctrl + J digunakan untuk perataan Justify, Ctrl + L untuk Left, dan Ctrl + E untuk Center.",
      },
      {
        question:
          "Fitur untuk membuat teks kecil di atas huruf normal (seperti pangkat m²) disebut...",
        options: [
          { label: "a", text: "Subscript" },
          { label: "b", text: "Superscript", correct: true },
          { label: "c", text: "Strikethrough" },
        ],
        explanation: "Superscript (x²) menaikkan karakter ke atas garis teks.",
      },
      {
        question:
          "Untuk pindah ke halaman baru dengan rapi tanpa menekan Enter berkali-kali, gunakan...",
        options: [
          { label: "a", text: "Page Break", correct: true },
          { label: "b", text: "Line Break" },
          { label: "c", text: "Paragraph Spacing" },
        ],
        explanation:
          "Page Break (Ctrl+Enter) memaksa kursor pindah ke awal halaman berikutnya.",
      },
      {
        question:
          "Di tab manakah pengaturan Margin dan Orientasi kertas berada?",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Page Layout", correct: true },
          { label: "c", text: "Insert" },
        ],
        explanation:
          "Pengaturan halaman fisik (Page Setup) ada di tab Page Layout.",
      },
    ],
  },
  {
    id: 2,
    title: "Quiz 2: Word Lanjutan",
    type: "quiz",
    icon: "2",
    subtitle: "Bab 1 - Advanced",
    content: ["Uji pemahaman tentang fitur otomatisasi dokumen."],
    quiz: [
      {
        question:
          "Syarat utama agar Daftar Isi (Table of Contents) bisa dibuat otomatis adalah...",
        options: [
          { label: "a", text: "Judul harus ditebalkan (Bold)" },
          {
            label: "b",
            text: "Judul harus menggunakan Styles (Heading)",
            correct: true,
          },
          { label: "c", text: "Dokumen harus disimpan PDF" },
        ],
        explanation:
          "Word membaca format Heading 1, 2, 3 untuk menyusun struktur daftar isi.",
      },
      {
        question:
          "Fitur untuk mengirim satu surat ke banyak penerima dengan nama berbeda disebut...",
        options: [
          { label: "a", text: "Mail Merge", correct: true },
          { label: "b", text: "SmartArt" },
          { label: "c", text: "Track Changes" },
        ],
        explanation:
          "Mail Merge menggabungkan dokumen utama dengan sumber data penerima.",
      },
      {
        question:
          "Dalam Mail Merge, file Excel yang berisi daftar nama alamat disebut...",
        options: [
          { label: "a", text: "Main Document" },
          { label: "b", text: "Data Source", correct: true },
          { label: "c", text: "Preview" },
        ],
        explanation:
          "Data Source adalah sumber data eksternal yang dibaca oleh Word.",
      },
      {
        question:
          "Jika Anda ingin mengubah format seluruh Judul Bab dalam satu klik, Anda harus memodifikasi...",
        options: [
          { label: "a", text: "Font Size manual" },
          { label: "b", text: "Styles Heading", correct: true },
          { label: "c", text: "Page Border" },
        ],
        explanation:
          "Memodifikasi Style Heading akan menerapkan perubahan ke seluruh teks yang menggunakan style tersebut.",
      },
      {
        question: "Menu 'Update Table' pada Daftar Isi berfungsi untuk...",
        options: [
          { label: "a", text: "Menghapus daftar isi" },
          {
            label: "b",
            text: "Memperbarui nomor halaman atau judul yang berubah",
            correct: true,
          },
          { label: "c", text: "Mengubah warna kertas" },
        ],
        explanation:
          "Daftar isi tidak update otomatis realtime, harus diklik Update Table.",
      },
    ],
  },

  // --- SESI 2: MICROSOFT EXCEL (BAB 2) ---
  {
    id: 3,
    title: "Quiz 3: Dasar Excel",
    type: "quiz",
    icon: "3",
    subtitle: "Bab 2 - Basic",
    content: ["Uji pemahaman tentang sel, data, dan formatting."],
    quiz: [
      {
        question: "Pertemuan antara Kolom dan Baris (misal A1) disebut...",
        options: [
          { label: "a", text: "Range" },
          { label: "b", text: "Cell (Sel)", correct: true },
          { label: "c", text: "Sheet" },
        ],
        explanation: "Sel adalah unit terkecil dalam worksheet.",
      },
      {
        question:
          "Fitur untuk membuat urutan angka 1, 2, 3... secara otomatis dengan menarik ujung sel disebut...",
        options: [
          { label: "a", text: "Autosum" },
          { label: "b", text: "Autofill", correct: true },
          { label: "c", text: "Filter" },
        ],
        explanation: "Autofill menyalin data atau membuat urutan logis.",
      },
      {
        question:
          "Untuk menggabungkan beberapa sel menjadi satu dan menengahkan teks, gunakan...",
        options: [
          { label: "a", text: "Wrap Text" },
          { label: "b", text: "Merge & Center", correct: true },
          { label: "c", text: "Group" },
        ],
        explanation: "Merge & Center menggabungkan sel terpilih.",
      },
      {
        question:
          "Jika teks terlalu panjang dan ingin dilipat ke bawah dalam satu sel, gunakan...",
        options: [
          { label: "a", text: "Wrap Text", correct: true },
          { label: "b", text: "Shrink to Fit" },
          { label: "c", text: "Merge Cells" },
        ],
        explanation:
          "Wrap Text membuat teks turun ke baris baru jika lebar kolom tidak cukup.",
      },
      {
        question:
          "Setiap penulisan rumus di Excel WAJIB diawali dengan tanda...",
        options: [
          { label: "a", text: ":" },
          { label: "b", text: "=", correct: true },
          { label: "c", text: "#" },
        ],
        explanation: "Tanda sama dengan (=) adalah indikator mode rumus.",
      },
    ],
  },
  {
    id: 4,
    title: "Quiz 4: Rumus & Fungsi Excel",
    type: "quiz",
    icon: "4",
    subtitle: "Bab 2 - Formulas",
    content: ["Uji logika rumus aritmatika, statistik, dan teks."],
    quiz: [
      {
        question: "Fungsi untuk mencari nilai rata-rata adalah...",
        options: [
          { label: "a", text: "SUM" },
          { label: "b", text: "AVERAGE", correct: true },
          { label: "c", text: "MEDIAN" },
        ],
        explanation: "AVERAGE menghitung rata-rata aritmatika.",
      },
      {
        question: "Jika sel A1='JAKARTA', rumus =LEFT(A1, 3) hasilnya...",
        options: [
          { label: "a", text: "JAK", correct: true },
          { label: "b", text: "RTA" },
          { label: "c", text: "KAR" },
        ],
        explanation: "LEFT mengambil 3 karakter dari kiri (J-A-K).",
      },
      {
        question:
          "Rumus logika =IF(80>75, 'Lulus', 'Gagal') akan menghasilkan...",
        options: [
          { label: "a", text: "Gagal" },
          { label: "b", text: "Lulus", correct: true },
          { label: "c", text: "Error" },
        ],
        explanation:
          "Karena 80 lebih besar dari 75 (Benar), maka hasil yang diambil adalah 'Lulus'.",
      },
      {
        question:
          "Fungsi untuk menghitung BANYAKNYA data angka (bukan menjumlahkan) adalah...",
        options: [
          { label: "a", text: "SUM" },
          { label: "b", text: "COUNT", correct: true },
          { label: "c", text: "MAX" },
        ],
        explanation: "COUNT menghitung jumlah sel yang berisi angka.",
      },
      {
        question: "Rumus =MID('INDONESIA', 3, 3) akan mengambil karakter...",
        options: [
          { label: "a", text: "IND" },
          { label: "b", text: "DON", correct: true },
          { label: "c", text: "NES" },
        ],
        explanation: "Mulai dari karakter ke-3 (D), ambil 3 huruf -> D-O-N.",
      },
    ],
  },

  // --- SESI 3: POWERPOINT (BAB 3) ---
  {
    id: 5,
    title: "Quiz 5: Dasar PowerPoint",
    type: "quiz",
    icon: "5",
    subtitle: "Bab 3 - Basic",
    content: ["Uji pemahaman interface dan manajemen slide."],
    quiz: [
      {
        question: "Ekstensi file standar untuk PowerPoint adalah...",
        options: [
          { label: "a", text: ".xlsx" },
          { label: "b", text: ".pptx", correct: true },
          { label: "c", text: ".docx" },
        ],
        explanation: ".pptx adalah format file presentasi standar.",
      },
      {
        question:
          "Tombol shortcut untuk memulai Slide Show dari awal adalah...",
        options: [
          { label: "a", text: "F5", correct: true },
          { label: "b", text: "Shift + F5" },
          { label: "c", text: "Esc" },
        ],
        explanation: "F5 memulai presentasi dari slide pertama.",
      },
      {
        question:
          "Area di bawah slide untuk menulis skrip pembicara disebut...",
        options: [
          { label: "a", text: "Slide Pane" },
          { label: "b", text: "Notes Pane", correct: true },
          { label: "c", text: "Outline" },
        ],
        explanation: "Notes Pane digunakan untuk catatan presenter.",
      },
      {
        question:
          "Untuk mencetak 3 slide dalam satu halaman beserta garis catatan, pilih layout...",
        options: [
          { label: "a", text: "Full Page Slides" },
          { label: "b", text: "Handouts (3 Slides)", correct: true },
          { label: "c", text: "Notes Pages" },
        ],
        explanation:
          "Handout 3 slide memberikan ruang garis untuk audiens mencatat.",
      },
      {
        question: "Tab menu untuk mengubah Tema dan Ukuran Slide adalah...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Design", correct: true },
          { label: "c", text: "Transitions" },
        ],
        explanation: "Tab Design berisi Themes dan Page Setup.",
      },
    ],
  },
  {
    id: 6,
    title: "Quiz 6: Animasi & Interaktif",
    type: "quiz",
    icon: "6",
    subtitle: "Bab 3 - Advanced",
    content: ["Uji pemahaman tentang efek gerak dan link."],
    quiz: [
      {
        question: "Efek perpindahan antar halaman slide disebut...",
        options: [
          { label: "a", text: "Animation" },
          { label: "b", text: "Transition", correct: true },
          { label: "c", text: "Hyperlink" },
        ],
        explanation:
          "Transition adalah efek pada slide, Animation adalah efek pada objek.",
      },
      {
        question:
          "Fitur agar teks/gambar bisa diklik untuk menuju slide lain adalah...",
        options: [
          { label: "a", text: "Hyperlink", correct: true },
          { label: "b", text: "Trigger" },
          { label: "c", text: "Morph" },
        ],
        explanation:
          "Hyperlink menjadikan objek interaktif menuju tujuan tertentu.",
      },
      {
        question:
          "Format file yang langsung menjalankan presentasi (Show Only) saat diklik adalah...",
        options: [
          { label: "a", text: ".pptx" },
          { label: "b", text: ".ppsx", correct: true },
          { label: "c", text: ".pdf" },
        ],
        explanation: "PPSX (PowerPoint Show) langsung masuk mode slide show.",
      },
      {
        question: "Opsi 'Start: With Previous' pada animasi berarti...",
        options: [
          { label: "a", text: "Animasi jalan setelah klik mouse" },
          {
            label: "b",
            text: "Animasi jalan bersamaan dengan sebelumnya",
            correct: true,
          },
          { label: "c", text: "Animasi jalan setelah sebelumnya selesai" },
        ],
        explanation: "With Previous menjalankan animasi secara serentak.",
      },
      {
        question:
          "Tombol 'Action Button' berlambang Rumah biasanya berfungsi untuk...",
        options: [
          { label: "a", text: "Keluar program" },
          { label: "b", text: "Kembali ke Slide Pertama", correct: true },
          { label: "c", text: "Ke slide terakhir" },
        ],
        explanation: "Tombol Home secara default dilink ke First Slide.",
      },
    ],
  },

  // --- SESI 4: MENDELEY (BAB 4) ---
  {
    id: 7,
    title: "Quiz 7: Dasar Mendeley",
    type: "quiz",
    icon: "7",
    subtitle: "Bab 4 - Basic",
    content: ["Uji pemahaman manajemen referensi."],
    quiz: [
      {
        question: "Apa fungsi utama aplikasi Mendeley?",
        options: [
          { label: "a", text: "Mengedit foto" },
          { label: "b", text: "Manajemen referensi dan sitasi", correct: true },
          { label: "c", text: "Membuat presentasi" },
        ],
        explanation: "Mendeley adalah software citation & reference manager.",
      },
      {
        question: "Plugin Mendeley di Microsoft Word terdapat pada tab...",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "References", correct: true },
          { label: "c", text: "View" },
        ],
        explanation: "Plugin Mendeley Cite-O-Matic muncul di tab References.",
      },
      {
        question:
          "Fitur untuk menyamakan data antara aplikasi Desktop dan Web Cloud adalah...",
        options: [
          { label: "a", text: "Refresh" },
          { label: "b", text: "Sync (Sinkronisasi)", correct: true },
          { label: "c", text: "Update" },
        ],
        explanation: "Sync menyinkronkan library lokal dengan server Mendeley.",
      },
      {
        question:
          "Cara paling cepat memasukkan file PDF yang sudah ada ke Mendeley adalah...",
        options: [
          { label: "a", text: "Mengetik manual" },
          { label: "b", text: "Drag & Drop file ke aplikasi", correct: true },
          { label: "c", text: "Web Importer" },
        ],
        explanation: "Drag & drop memungkinkan input file instan.",
      },
      {
        question:
          "Jika ingin bekerja sama berbagi referensi dengan teman, fitur yang digunakan adalah...",
        options: [
          { label: "a", text: "Create Folder" },
          { label: "b", text: "Create Group", correct: true },
          { label: "c", text: "Create Account" },
        ],
        explanation: "Groups memungkinkan kolaborasi dan sharing referensi.",
      },
    ],
  },
  {
    id: 8,
    title: "Quiz 8: Mendeley Lanjutan",
    type: "quiz",
    icon: "8",
    subtitle: "Bab 4 - Advanced",
    content: ["Uji pemahaman sitasi dan pengelolaan."],
    quiz: [
      {
        question:
          "Tombol untuk menampilkan daftar pustaka otomatis di Word adalah...",
        options: [
          { label: "a", text: "Insert Citation" },
          { label: "b", text: "Insert Bibliography", correct: true },
          { label: "c", text: "Refresh" },
        ],
        explanation:
          "Insert Bibliography men-generate daftar referensi dari sitasi yang ada.",
      },
      {
        question:
          "Gaya sitasi yang menggunakan angka kurung siku [1] adalah...",
        options: [
          { label: "a", text: "APA" },
          { label: "b", text: "IEEE", correct: true },
          { label: "c", text: "Harvard" },
        ],
        explanation: "IEEE adalah standar sitasi numerik teknik.",
      },
      {
        question:
          "Ekstensi browser untuk menyimpan jurnal dari internet ke Mendeley disebut...",
        options: [
          { label: "a", text: "Web Importer", correct: true },
          { label: "b", text: "Web Exporter" },
          { label: "c", text: "PDF Viewer" },
        ],
        explanation: "Mendeley Web Importer adalah add-on browser.",
      },
      {
        question: "Fitur 'Check for Duplicates' berfungsi untuk...",
        options: [
          { label: "a", text: "Menghapus akun" },
          {
            label: "b",
            text: "Mencari dan menggabungkan referensi ganda",
            correct: true,
          },
          { label: "c", text: "Mengecek plagiasi" },
        ],
        explanation: "Fitur ini membersihkan library dari entri yang sama.",
      },
      {
        question:
          "Jika judul artikel di Mendeley salah, perbaikannya dilakukan di panel...",
        options: [
          { label: "a", text: "Kiri" },
          { label: "b", text: "Kanan (Details)", correct: true },
          { label: "c", text: "Tengah" },
        ],
        explanation: "Panel kanan (Details) tempat mengedit metadata.",
      },
    ],
  },

  // --- SESI 5: ZOTERO (BAB 5) ---
  {
    id: 9,
    title: "Quiz 9: Dasar Zotero",
    type: "quiz",
    icon: "9",
    subtitle: "Bab 5 - Basic",
    content: ["Uji pemahaman tentang Zotero."],
    quiz: [
      {
        question: "Perbedaan utama Zotero dibanding Mendeley adalah...",
        options: [
          { label: "a", text: "Zotero berbayar" },
          { label: "b", text: "Zotero Open Source", correct: true },
          { label: "c", text: "Zotero hanya untuk Mac" },
        ],
        explanation: "Zotero adalah software open source.",
      },
      {
        question: "Alat penghubung antara Browser dan Zotero disebut...",
        options: [
          { label: "a", text: "Zotero Link" },
          { label: "b", text: "Zotero Connector", correct: true },
          { label: "c", text: "Zotero Plugin" },
        ],
        explanation:
          "Zotero Connector dipasang di browser untuk menangkap metadata.",
      },
      {
        question: "Kapasitas penyimpanan cloud gratis Zotero adalah...",
        options: [
          { label: "a", text: "2 GB" },
          { label: "b", text: "300 MB", correct: true },
          { label: "c", text: "Unlimited" },
        ],
        explanation: "Akun basic Zotero mendapat 300MB.",
      },
      {
        question: "Ikon 'Tongkat Sihir' di Zotero berfungsi untuk...",
        options: [
          { label: "a", text: "Menghapus data" },
          { label: "b", text: "Menambah item via ISBN/DOI", correct: true },
          { label: "c", text: "Membuat folder" },
        ],
        explanation:
          "Add Item by Identifier (ikon tongkat) mencari metadata via kode.",
      },
      {
        question:
          "Agar Zotero bisa membaca file PDF, fitur yang harus diinstall adalah...",
        options: [
          { label: "a", text: "PDF Indexing", correct: true },
          { label: "b", text: "PDF Reader" },
          { label: "c", text: "Java" },
        ],
        explanation: "PDF Indexing diperlukan untuk retrieve metadata.",
      },
    ],
  },
  {
    id: 10,
    title: "Quiz 10: Zotero Lanjutan",
    type: "quiz",
    icon: "10",
    subtitle: "Bab 5 - Advanced",
    content: ["Uji pemahaman integrasi dan manajemen Zotero."],
    quiz: [
      {
        question: "Tombol 'Green Plus' (+) di Zotero digunakan untuk...",
        options: [
          { label: "a", text: "Input data manual", correct: true },
          { label: "b", text: "Input PDF" },
          { label: "c", text: "Sync" },
        ],
        explanation: "Ikon plus hijau untuk membuat item baru secara manual.",
      },
      {
        question: "Istilah 'Collection' di Zotero setara dengan...",
        options: [
          { label: "a", text: "File" },
          { label: "b", text: "Folder", correct: true },
          { label: "c", text: "Tag" },
        ],
        explanation:
          "Collection adalah cara Zotero mengelompokkan referensi (folder).",
      },
      {
        question:
          "Fitur untuk mengambil metadata dari file PDF yang sudah ada disebut...",
        options: [
          { label: "a", text: "Scan PDF" },
          { label: "b", text: "Retrieve Metadata for PDF", correct: true },
          { label: "c", text: "Read PDF" },
        ],
        explanation: "Klik kanan PDF > Retrieve Metadata.",
      },
      {
        question: "Di Word, Zotero menambahkan tab menu bernama...",
        options: [
          { label: "a", text: "References" },
          { label: "b", text: "Zotero", correct: true },
          { label: "c", text: "Add-Ins" },
        ],
        explanation:
          "Zotero biasanya membuat tab menu sendiri bernama 'Zotero' di Word.",
      },
      {
        question:
          "Mengapa disarankan memindahkan Data Directory Zotero ke drive non-sistem?",
        options: [
          { label: "a", text: "Agar lebih cepat" },
          {
            label: "b",
            text: "Agar data aman saat install ulang Windows",
            correct: true,
          },
          { label: "c", text: "Agar bisa diakses orang lain" },
        ],
        explanation:
          "Memindahkan dari Drive C menjaga keamanan data saat sistem di-reset.",
      },
    ],
  },
];