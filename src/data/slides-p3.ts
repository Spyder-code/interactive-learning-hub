import type { Slide } from "./slides";

export const slidesP3: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (1.12 - 1.17) ---
  {
    id: 1,
    title: "Lanjutan Modul Word: Editing & Objek",
    type: "content",
    icon: "1",
    subtitle: "Topik 1.12 - 1.17",
    content: [
      "Sesi ini akan membahas cara bekerja lebih efisien dan memperkaya dokumen dengan objek visual.",
      "**Fokus Materi:**",
      "1. Teknik Menyalin (Cut, Copy, Paste Special).",
      "2. Elemen Halaman (Header, Footer, Page Number).",
      "3. Tabel & Gambar (Insert, Crop, Resize).",
    ],
  },

  // --- TOPIK 1.12 & 1.13: COPY, PASTE, UNDO ---
  {
    id: 2,
    title: "Menyalin Teks (Cut & Copy)",
    type: "content",
    icon: "2",
    subtitle: "Memindahkan vs Menyalin",
    content: [
      "**Copy (Ctrl+C):** Menyalin teks ke clipboard tanpa menghapus teks asli.",
      "**Cut (Ctrl+X):** Memindahkan teks dengan menghapus teks dari lokasi asal.",
      "**Clipboard:** Tempat penyimpanan sementara di memori komputer untuk item yang di-copy/cut.",
    ],
  },
  {
    id: 3,
    title: "Opsi Paste (Tempel)",
    type: "content",
    icon: "3",
    subtitle: "Tidak Sekadar Ctrl+V",
    content: [
      "Saat melakukan Paste, Word menyediakan beberapa opsi canggih:",
      "**Keep Source Formatting:** Mempertahankan format asli dari sumber (warna, font).",
      "**Merge Formatting:** Menyesuaikan format teks agar cocok dengan teks di sekitarnya.",
      "**Keep Text Only:** Hanya mengambil teksnya saja, semua format (bold/warna/link) dibuang.",
    ],
  },
  {
    id: 4,
    title: "Undo & Redo",
    type: "content",
    icon: "4",
    subtitle: "Penyelamat Kesalahan",
    content: [
      "**Undo (Ctrl+Z):** Membatalkan perintah atau tindakan terakhir. Jika salah hapus, gunakan ini.",
      "**Redo (Ctrl+Y):** Mengulang kembali tindakan yang baru saja di-undo.",
      "Terletak di **Quick Access Toolbar** (pojok kiri atas).",
    ],
  },
  {
    id: 5,
    title: "Tugas 1: Teknik Paste",
    type: "task",
    icon: "5",
    subtitle: "Praktik Clipboard - 5 Menit",
    content: ["Buka artikel dengan link dibawah ini."],
    hyperlink: {
      text: "Buka artikel latihan",
      url: "/article-example",
    },
    checklist: [
      "Paste paragraf tersebut ke Word dengan opsi **Keep Source Formatting**.",
      "Di bawahnya, Paste lagi paragraf yang sama dengan opsi **Keep Text Only** (Pastikan teks jadi polos).",
      "Gunakan fitur **Cut** untuk memindahkan paragraf polos ke atas paragraf berwarna.",
    ],
    tasks: ["Upload Screenshot hasil dokumen Anda."],
    requireUpload: true,
  },

  // --- TOPIK 1.14: HEADER & FOOTER ---
  {
    id: 6,
    title: "Header & Footer",
    type: "content",
    icon: "6",
    subtitle: "Info Berulang di Halaman",
    content: [
      "Digunakan untuk menampilkan info di setiap halaman (Judul Bab, Kop Surat, Nomor Halaman).",
      "**Cara:** Klik Tab Insert > Header atau Footer.",
      "**Page Number:** Untuk memberi nomor halaman otomatis. Bisa diletakkan di atas (Top) atau bawah (Bottom).",
      "**Tips:** Klik dua kali di area atas/bawah halaman untuk mengedit cepat.",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Identitas Halaman",
    type: "task",
    icon: "7",
    subtitle: "Praktik Header Footer - 5 Menit",
    content: ["Pada dokumen yang sama atau baru:"],
    checklist: [
      "Tambahkan **Header** dengan teks: 'Latihan Praktikum Word'.",
      "Tambahkan **Page Number** di posisi **Bottom of Page - Right** (Kanan Bawah).",
      "Pastikan muncul di setiap halaman jika Anda membuat halaman baru (Ctrl+Enter).",
    ],
    tasks: ["Upload dokumen yang sudah ber-Header dan ber-Nomor Halaman."],
    requireUpload: true,
  },

  // --- MID QUIZ ---
  {
    id: 8,
    title: "Quiz Pertengahan",
    type: "quiz",
    icon: "8",
    subtitle: "Review Singkat",
    content: ["Cek pemahaman tentang Clipboard dan Halaman."],
    quiz: [
      {
        question:
          "Jika Anda ingin menyalin teks dari web tetapi tidak ingin format (warna/link) ikut terbawa, gunakan opsi Paste...",
        options: [
          { label: "a", text: "Keep Source Formatting" },
          { label: "b", text: "Keep Text Only", correct: true },
          { label: "c", text: "Merge Formatting" },
        ],
        explanation:
          "Keep Text Only menghapus semua format asli dan hanya menempelkan teks polos.",
      },
      {
        question:
          "Fitur untuk membatalkan kesalahan terakhir yang dilakukan disebut...",
        options: [
          { label: "a", text: "Redo" },
          { label: "b", text: "Delete" },
          { label: "c", text: "Undo", correct: true },
        ],
        explanation: "Undo digunakan untuk membatalkan perintah terakhir.",
      },
      {
        question:
          "Untuk menambahkan nomor halaman otomatis, kita mengakses Tab...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "View" },
        ],
        explanation:
          "Menu Page Number, Header, dan Footer berada di dalam Tab Insert.",
      },
    ],
  },

  // --- TOPIK 1.15: MENYIMPAN DOKUMEN ---
  {
    id: 9,
    title: "Format Penyimpanan",
    type: "content",
    icon: "9",
    subtitle: "Save As Type",
    content: [
      "Selain format standar `.docx`, Word bisa menyimpan ke format lain:",
      "**Word 97-2003 Document (.doc):** Untuk kompatibilitas dengan Word versi lama.",
      "**PDF:** Agar dokumen tidak bisa diedit dan tampilan tetap sama di semua perangkat.",
      "**Cara:** File > Save As > Pilih tipe pada kotak 'Save as type'.",
    ],
  },

  // --- TOPIK 1.16: TABEL ---
  {
    id: 10,
    title: "Bekerja dengan Tabel",
    type: "content",
    icon: "10",
    subtitle: "Membuat & Mengedit",
    content: [
      "**Menyisipkan:** Insert > Table > Tarik jumlah kotak (baris x kolom).",
      "**Menambah Baris/Kolom:** Klik pada tabel > Tab Layout > Insert Above/Below/Left/Right.",
      "**Menghapus:** Gunakan tombol **Backspace** untuk hapus tabel, atau menu Delete di Tab Layout.",
    ],
  },
  {
    id: 11,
    title: "Tugas 3: Tabel Data",
    type: "task",
    icon: "11",
    subtitle: "Praktik Tabel - 10 Menit",
    content: [
      "Buat tabel ukuran **3 kolom x 4 baris**.",
      "Isi Header: No, Nama Barang, Harga.",
    ],
    checklist: [
      "Isi data barang bebas (min 3 barang).",
      "Tambahkan **1 baris baru** di bagian paling atas (di atas header) dan gabungkan selnya (Merge Cells) untuk judul tabel 'DAFTAR HARGA'.",
      "Hapus salah satu baris data menggunakan fitur Delete Rows.",
    ],
    tasks: ["Upload dokumen berisi tabel ini."],
    requireUpload: true,
  },

  // --- TOPIK 1.17: GAMBAR & CLIP ART ---
  {
    id: 12,
    title: "Menyisipkan Gambar",
    type: "content",
    icon: "12",
    subtitle: "Insert Pictures",
    content: [
      "**Pictures:** Mengambil gambar dari file komputer.",
      "**Online Pictures:** Mencari gambar langsung dari internet (Bing Image Search).",
      "**Cara:** Tab Insert > Grup Illustrations > Pictures.",
    ],
  },
  {
    id: 13,
    title: "Edit Gambar (Resize & Crop)",
    type: "content",
    icon: "13",
    subtitle: "Format Picture Tools",
    content: [
      "**Resize:** Klik gambar, tarik bulatan di sudut untuk mengubah ukuran.",
      "**Crop (Potong):** Membuang bagian gambar yang tidak diinginkan.",
      "**Cara Crop:** Klik Gambar > Tab Format > Crop > Geser garis hitam di pinggir gambar.",
      "**Uncrop:** Gambar yang di-crop bisa dikembalikan (uncrop) selama belum dikompres permanen.",
    ],
  },
  {
    id: 14,
    title: "Tugas 4: Olah Gambar",
    type: "task",
    icon: "14",
    subtitle: "Praktik Gambar - 5 Menit",
    content: ["Masukkan sebuah foto/gambar bebas ke dokumen."],
    checklist: [
      "Ubah ukuran gambar menjadi lebih kecil (Resize).",
      "Lakukan **Crop** untuk membuang bagian tepi gambar.",
      "Beri bingkai pada gambar (Picture Border/Style) dari Tab Format.",
    ],
    tasks: ["Upload dokumen hasil olah gambar ini."],
    requireUpload: true,
  },
  {
    id: 15,
    title: "Tugas 5: Dokumen Komplit",
    type: "task",
    icon: "15",
    subtitle: "Integrasi Materi - 10 Menit",
    content: ["Buat satu dokumen rangkuman 'Laporan Stok'."],
    checklist: [
      "Ada **Header** nama Anda.",
      "Ada **Tabel** stok barang.",
      "Ada **Gambar** produk di bawah tabel.",
      "Simpan file tersebut dalam format **PDF**.",
    ],
    tasks: ["Upload file **PDF** hasil akhirnya."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 16,
    title: "Quiz Akhir Sesi",
    type: "quiz",
    icon: "16",
    subtitle: "Evaluasi Bab 1.12 - 1.17 (15 Soal)",
    content: ["Jawablah pertanyaan berikut untuk menguji pemahaman Anda."],
    quiz: [
      {
        question: "Perbedaan utama antara Cut dan Copy adalah...",
        options: [
          {
            label: "a",
            text: "Cut menghapus teks asli, Copy tidak",
            correct: true,
          },
          { label: "b", text: "Copy menghapus teks asli, Cut tidak" },
          { label: "c", text: "Keduanya sama saja" },
        ],
        explanation:
          "Cut memindahkan teks dengan menghapusnya dari lokasi asal, sedangkan Copy menggandakannya.",
      },
      {
        question:
          "Jika ingin menempelkan teks tanpa membawa format aslinya (menjadi teks polos), pilih opsi Paste...",
        options: [
          { label: "a", text: "Keep Source Formatting" },
          { label: "b", text: "Keep Text Only", correct: true },
          { label: "c", text: "Merge Formatting" },
        ],
        explanation:
          "Keep Text Only menghapus semua format dan menyisakan teks saja.",
      },
      {
        question: "Shortcut keyboard untuk perintah Undo adalah...",
        options: [
          { label: "a", text: "Ctrl + C" },
          { label: "b", text: "Ctrl + Y" },
          { label: "c", text: "Ctrl + Z", correct: true },
        ],
        explanation:
          "Ctrl + Z adalah shortcut standar untuk membatalkan perintah terakhir (Undo).",
      },
      {
        question:
          "Informasi seperti judul bab yang muncul berulang di bagian ATAS setiap halaman disebut...",
        options: [
          { label: "a", text: "Footer" },
          { label: "b", text: "Header", correct: true },
          { label: "c", text: "Footnote" },
        ],
        explanation:
          "Header adalah area di margin atas untuk informasi berulang.",
      },
      {
        question: "Untuk menghapus nomor halaman, langkah yang benar adalah...",
        options: [
          { label: "a", text: "Menghapus file" },
          {
            label: "b",
            text: "Klik Page Number > Remove Page Numbers",
            correct: true,
          },
          { label: "c", text: "Klik Layout > Delete" },
        ],
        explanation:
          "Menu Remove Page Numbers tersedia di dropdown Page Number untuk menghapus penomoran.",
      },
      {
        question:
          "Format file yang menjamin tampilan dokumen tetap sama di semua perangkat adalah...",
        options: [
          { label: "a", text: "Word 97-2003" },
          { label: "b", text: "PDF", correct: true },
          { label: "c", text: "TXT" },
        ],
        explanation:
          "PDF (Portable Document Format) mempertahankan format dokumen secara tetap.",
      },
      {
        question:
          "Untuk menyisipkan tabel ke dalam dokumen, kita menggunakan tab...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "View" },
        ],
        explanation: "Perintah Table berada di dalam Tab Insert.",
      },
      {
        question: "Bagaimana cara menambahkan baris baru di tabel?",
        options: [
          {
            label: "a",
            text: "Klik Tab Layout > Insert Above/Below",
            correct: true,
          },
          { label: "b", text: "Tekan tombol Delete" },
          { label: "c", text: "Klik Tab Design > Draw Table" },
        ],
        explanation:
          "Tab Layout (Table Tools) menyediakan opsi Insert Rows Above atau Below.",
      },
      {
        question:
          "Jika Anda menghapus isi sel tabel (tekan Delete), apa yang terjadi pada tabelnya?",
        options: [
          { label: "a", text: "Tabel ikut terhapus" },
          {
            label: "b",
            text: "Hanya tulisan yang hilang, tabel tetap ada",
            correct: true,
          },
          { label: "c", text: "Kolom tabel hilang" },
        ],
        explanation:
          "Menghapus isi (content) tidak menghapus struktur tabel/sel.",
      },
      {
        question:
          "Untuk memasukkan gambar yang tersimpan di laptop, pilih menu...",
        options: [
          { label: "a", text: "Online Pictures" },
          { label: "b", text: "Pictures (From File)", correct: true },
          { label: "c", text: "Shapes" },
        ],
        explanation:
          "Pictures digunakan untuk menyisipkan gambar dari penyimpanan lokal komputer.",
      },
      {
        question:
          "Fitur untuk memotong bagian gambar yang tidak diinginkan disebut...",
        options: [
          { label: "a", text: "Resize" },
          { label: "b", text: "Rotate" },
          { label: "c", text: "Crop", correct: true },
        ],
        explanation:
          "Crop berfungsi membuang area luar gambar yang tidak diperlukan.",
      },
      {
        question: "Di tab manakah tool 'Crop' berada?",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Format (Picture Tools)", correct: true },
          { label: "c", text: "Review" },
        ],
        explanation:
          "Tab Format muncul otomatis saat gambar diklik, dan berisi tool Crop.",
      },
      {
        question: "Apa fungsi dari 'Resize' pada gambar?",
        options: [
          { label: "a", text: "Mengubah warna gambar" },
          {
            label: "b",
            text: "Mengubah ukuran besar/kecil gambar",
            correct: true,
          },
          { label: "c", text: "Memutar gambar" },
        ],
        explanation:
          "Resize (menggunakan handle di sudut) mengubah dimensi ukuran gambar.",
      },
      {
        question:
          "Jika ingin menyimpan dokumen agar kompatibel dengan Word versi lama (97-2003), gunakan format...",
        options: [
          { label: "a", text: ".docx" },
          { label: "b", text: ".doc (Word 97-2003 Document)", correct: true },
          { label: "c", text: ".pdf" },
        ],
        explanation:
          "Format Word 97-2003 (.doc) digunakan untuk kompatibilitas versi lama.",
      },
      {
        question:
          "Menu Clip Art (pada versi lama) atau Online Pictures digunakan untuk...",
        options: [
          {
            label: "a",
            text: "Mencari gambar dari internet/koleksi Office",
            correct: true,
          },
          { label: "b", text: "Menggambar sendiri" },
          { label: "c", text: "Membuat grafik" },
        ],
        explanation:
          "Fitur ini memungkinkan pencarian dan penyisipan gambar dari sumber online atau pustaka Office.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 17,
    title: "Selesai",
    type: "content",
    icon: "17",
    subtitle: "Modul Tuntas",
    content: [
      "Selamat! Anda telah menyelesaikan materi Topik 1.12 hingga 1.17.",
      "Anda kini mampu menyalin data dengan cerdas, mengatur elemen halaman, membuat tabel, dan mengolah gambar.",
      "Sampai jumpa di materi selanjutnya!",
    ],
  },
];
