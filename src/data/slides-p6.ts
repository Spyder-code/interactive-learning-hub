import type { Slide } from "./slides";

export const slides: Slide[] = [
  // --- BAGIAN 1: PENGENALAN EXCEL (2.1) ---
  {
    id: 1,
    title: "Pengenalan Microsoft Excel",
    type: "content",
    icon: "1",
    subtitle: "Definisi & Fungsi Dasar",
    content: [
      "**Definisi:** Microsoft Excel adalah program pengolah kata sekaligus pengolah angka yang menawarkan fungsionalitas lebih mudah dibanding Word.",
      "**Fungsi Utama:**",
      "Selain memproses angka, Excel digunakan untuk membuat tabel, grafik, dan database sederhana.",
    ],
  },
  {
    id: 2,
    title: "Manfaat & Fitur Unggulan",
    type: "content",
    icon: "2",
    subtitle: "Kenapa Menggunakan Excel?",
    content: [
      "**1. Autofill:** Fasilitas untuk menyalin atau mengurutkan data yang sifatnya sama, berurutan, atau kelipatan.",
      "**2. Autosum:** Fasilitas untuk penjumlahan data secara otomatis.",
      "**3. Function Wizard:** Fasilitas untuk memudahkan penulisan rumus atau fungsi.",
    ],
  },
  {
    id: 3,
    title: "Workbook vs Worksheet",
    type: "content",
    icon: "3",
    subtitle: "Struktur File",
    content: [
      "**Workbook (Buku Kerja):** File Excel tempat kita bekerja yang bisa menampung beberapa data berbeda.",
      "**Worksheet (Lembar Kerja):** Halaman-halaman yang ada di dalam sebuah Workbook.",
      "Bayangkan Workbook sebagai 'Buku Tulis' dan Worksheet sebagai 'Halaman Kertas' di dalamnya.",
    ],
  },
  {
    id: 4,
    title: "Operasi Dasar",
    type: "content",
    icon: "4",
    subtitle: "Membuka & Menutup",
    content: [
      "**Mengaktifkan Excel:**",
      "- Klik ganda (double click) ikon Excel di desktop.",
      "- Atau Klik Start > Program > Microsoft Excel.",
      "**Mengakhiri Excel:**",
      "- Klik Menu File > Exit.",
      "- Atau tekan tombol Close (X) di kanan atas.",
    ],
  },
  {
    id: 5,
    title: "Tugas 1: Persiapan",
    type: "task",
    icon: "5",
    subtitle: "Praktik Dasar",
    content: [
      "Lakukan langkah berikut untuk memulai:",
    ],
    checklist: [
      "Buka aplikasi Microsoft Excel di komputer Anda.",
      "Perhatikan tampilan awal yang muncul.",
      "Coba tutup aplikasi, lalu buka kembali.",
    ],
    tasks: ["Screenshot tampilan awal Excel yang kosong (Blank Workbook) dan upload di sini."],
    requireUpload: true,
  },

  // --- BAGIAN 2: PENGENALAN TAMPILAN (2.2.1) ---
  {
    id: 6,
    title: "Antarmuka Excel (Interface)",
    type: "content",
    icon: "6",
    subtitle: "Bagian-Bagian Layar (1-8)",
    content: [
      "**1. Quick Access:** Kumpulan ikon perintah cepat (Save, Undo, Redo).",
      "**2. Title Bar:** Menampilkan nama file dan program yang aktif.",
      "**3. Tab Menu Ribbon:** Barisan menu utama (Home, Insert, dll).",
      "**4. Ribbon:** Tombol fungsi untuk menjalankan perintah dengan cepat.",
      "**5. Kontrol Jendela:** Mengatur ukuran jendela (Minimize, Maximize, Close).",
      "**6. Tab Worksheet:** Tempat berpindah ke kertas kerja lain.",
      "**7. Column (Kolom):** Lajur vertikal berinisial Abjad (A-Z, AA-XFD).",
      "**8. Baris (Row):** Lajur horizontal berinisial Angka (1-1.048.576).",
    ],
  },
  {
    id: 7,
    title: "Antarmuka Excel Lanjutan",
    type: "content",
    icon: "7",
    subtitle: "Bagian-Bagian Layar (9-17)",
    content: [
      "**9. Document Area:** Lembar kerja yang aktif.",
      "**10. Name Box:** Kotak berisi nama sel yang aktif.",
      "**11. Formula Bar:** Kotak berisi rumus atau fungsi sel.",
      "**12. Scroll Bar (Vertikal/Horizontal):** Menggeser layar ke atas-bawah atau kiri-kanan.",
      "**13. Sel Aktif:** Tempat menulis data, dikelilingi garis tebal.",
      "**14. Status Bar:** Informasi status program di bagian bawah.",
      "**15. Zoom:** Memperbesar/kecil tampilan.",
      "**16. Tombol Viewer:** Mengubah mode tampilan (Normal, Page Layout).",
    ],
  },
  {
    id: 8,
    title: "Tugas 2: Identifikasi Layar",
    type: "task",
    icon: "8",
    subtitle: "Praktik Navigasi",
    content: [
      "Buka Excel dan temukan bagian-bagian berikut:",
    ],
    checklist: [
      "Klik sel **C5**. Perhatikan **Name Box** harus tertulis 'C5'.",
      "Ketik 'Halo' di Formula Bar.",
      "Geser **Zoom** menjadi 120%.",
    ],
    tasks: ["Upload screenshot layar Excel Anda dengan posisi sel aktif di C5."],
    requireUpload: true,
  },

  // --- BAGIAN 3: FUNGSI TAB MENU (2.2.2) ---
  
  // 1. TAB HOME
  {
    id: 9,
    title: "Tab Home (Menu Standar)",
    type: "content",
    icon: "9",
    subtitle: "Clipboard, Font, Alignment",
    content: [
      "Tab Home berisi menu standar yang paling sering digunakan.",
      "**Grup Clipboard:** Paste, Cut, Copy, Format Painter.",
      "**Grup Font:** Ukuran huruf, Bold, Italic, Underline, Border, Fill Color, Font Color.",
      "**Grup Alignment:** Perataan teks (kiri, tengah, kanan), Merge Cell (gabung sel), Wrap Text.",
    ],
  },
  {
    id: 10,
    title: "Tab Home Lanjutan",
    type: "content",
    icon: "10",
    subtitle: "Number, Styles, Cells, Editing",
    content: [
      "**Grup Number:** Format angka (Currency/Mata Uang, Persen, Koma).",
      "**Grup Styles:** Conditional Formatting, Format as Table, Cell Styles.",
      "**Grup Cells:** Insert (tambah sel), Delete (hapus sel), Format.",
      "**Grup Editing:** Autosum, Fill, Clear, Sort & Filter, Find & Select.",
    ],
  },
  
  // 2. TAB INSERT
  {
    id: 11,
    title: "Tab Insert",
    type: "content",
    icon: "11",
    subtitle: "Menambah Objek",
    content: [
      "Digunakan untuk memasukkan objek lain ke lembar kerja.",
      "**Grup Tables:** Pivot Table, Table.",
      "**Grup Illustrations:** Picture (Gambar), Clip Art, Shapes (Bentuk), SmartArt.",
      "**Grup Charts:** Grafik Kolom, Garis (Line), Pie, Batang (Bar).",
      "**Grup Text:** Textbox, Header & Footer, WordArt, Symbol.",
    ],
  },

  // 3. TAB PAGE LAYOUT
  {
    id: 12,
    title: "Tab Page Layout",
    type: "content",
    icon: "12",
    subtitle: "Menata Halaman",
    content: [
      "Mengatur tampilan monitor dan hasil cetak.",
      "**Grup Themes:** Mengubah tema, warna, dan font tema.",
      "**Grup Page Setup:** Margin, Orientation (Tegak/Tidur), Size (Ukuran Kertas), Print Area, Background.",
      "**Grup Scale to Fit:** Menyesuaikan lebar/tinggi hasil cetak.",
      "**Grup Arrange:** Bring to Front, Send to Back, Align, Rotate.",
    ],
  },

  // --- MID QUIZ ---
  {
    id: 13,
    title: "Quiz Pertengahan",
    type: "quiz",
    icon: "13",
    subtitle: "Review Tab Menu Dasar",
    content: ["Mari tes pemahaman tentang Tab Home, Insert, dan Page Layout."],
    quiz: [
      {
        question: "Menu untuk menggabungkan beberapa sel menjadi satu (Merge Cell) terdapat di Tab...",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Home", correct: true },
          { label: "c", text: "Data" },
        ],
        explanation: "Merge Cell berada di Grup Alignment pada Tab Home.",
      },
      {
        question: "Untuk mengatur orientasi kertas menjadi Landscape, kita menggunakan Tab...",
        options: [
          { label: "a", text: "Page Layout", correct: true },
          { label: "b", text: "View" },
          { label: "c", text: "Review" },
        ],
        explanation: "Orientation berada di Grup Page Setup pada Tab Page Layout.",
      },
      {
        question: "Grup 'Charts' untuk membuat grafik batang atau pie terdapat di Tab...",
        options: [
          { label: "a", text: "Formulas" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "Home" },
        ],
        explanation: "Grup Charts berada di Tab Insert.",
      },
    ],
  },

  // 4. TAB FORMULAS
  {
    id: 14,
    title: "Tab Formulas",
    type: "content",
    icon: "14",
    subtitle: "Alat Pendukung Rumus",
    content: [
      "**Grup Function Library:**",
      "- Insert Function: Menambah fungsi.",
      "- AutoSum: Perhitungan sederhana otomatis.",
      "- Kategori Fungsi: Financial, Logical, Text, Date & Time, Math & Trig.",
      "**Grup Defined Names:** Membuat nama untuk sel/range (Name Manager).",
      "**Grup Formula Auditing:** Trace Precedents/Dependents (melacak alur rumus), Show Formulas, Error Checking.",
      "**Grup Calculation:** Mengatur opsi kalkulasi otomatis/manual.",
    ],
  },

  // 5. TAB DATA
  {
    id: 15,
    title: "Tab Data",
    type: "content",
    icon: "15",
    subtitle: "Manajemen Data",
    content: [
      "Fungsionalitas penataan data tanpa mengubah isi.",
      "**Grup Get External Data:** Mengambil data dari Access, Web, atau Teks.",
      "**Grup Sort & Filter:**",
      "- Sort: Mengurutkan data (A-Z atau Z-A).",
      "- Filter: Menyaring data sesuai kriteria.",
      "**Grup Data Tools:** Text to Columns (memisah isi sel), Remove Duplicates (hapus ganda), Data Validation.",
      "**Grup Outline:** Group, Ungroup, Subtotal.",
    ],
  },

  // 6. TAB REVIEW
  {
    id: 16,
    title: "Tab Review",
    type: "content",
    icon: "16",
    subtitle: "Penyedia Informasi & Koreksi",
    content: [
      "**Grup Proofing:** Spelling (cek ejaan), Thesaurus (sinonim).",
      "**Grup Language:** Translate (menerjemahkan bahasa).",
      "**Grup Comments:** New Comment (buat komentar), Delete, Show/Hide Comment.",
      "**Grup Changes:** Protect Sheet/Workbook (mengunci data), Track Changes (menelusuri perubahan).",
    ],
  },

  // 7. TAB VIEW
  {
    id: 17,
    title: "Tab View",
    type: "content",
    icon: "17",
    subtitle: "Pengatur Tampilan",
    content: [
      "**Grup Workbook Views:** Normal, Page Layout, Page Break Preview.",
      "**Grup Show:** Menampilkan/menyembunyikan Ruler, Gridlines (garis kisi), Formula Bar, Headings.",
      "**Grup Zoom:** Mengatur besar tampilan, Zoom to Selection.",
      "**Grup Window:** Freeze Panes (membekukan layar), Split (membagi layar), Switch Windows.",
    ],
  },
  {
    id: 18,
    title: "Tugas 3: Eksplorasi Menu",
    type: "task",
    icon: "18",
    subtitle: "Praktik Tab Lanjutan",
    content: [
      "Lakukan eksplorasi pada tab View:",
    ],
    checklist: [
      "Masuk ke Tab **View**.",
      "Hilangkan centang pada **Gridlines** (agar garis kotak-kotak hilang).",
      "Klik **Page Layout** di grup Workbook Views untuk melihat tampilan cetak.",
    ],
    tasks: ["Upload screenshot tampilan Excel Anda yang tanpa Gridlines."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 19,
    title: "Quiz Akhir Bab 2 (Topik 2.1-2.2)",
    type: "quiz",
    icon: "19",
    subtitle: "Evaluasi Lengkap (15 Soal)",
    content: ["Uji pemahaman Anda mengenai seluruh fitur dasar antarmuka Excel."],
    quiz: [
      {
        question: "Kotak yang menampilkan nama sel yang sedang aktif disebut...",
        options: [
          { label: "a", text: "Formula Bar" },
          { label: "b", text: "Name Box", correct: true },
          { label: "c", text: "Title Bar" },
        ],
        explanation: "Name Box adalah kotak yang berisi nama sel yang sedang aktif.",
      },
      {
        question: "Fasilitas untuk menyalin atau mengurutkan data yang berurutan secara otomatis adalah...",
        options: [
          { label: "a", text: "Autosum" },
          { label: "b", text: "Autofill", correct: true },
          { label: "c", text: "Filter" },
        ],
        explanation: "Autofill adalah fasilitas untuk pengurutan data yang sifatnya sama atau berurutan.",
      },
      {
        question: "Tab yang berisi perintah untuk mengatur margin dan ukuran kertas adalah...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Page Layout", correct: true },
          { label: "c", text: "View" },
        ],
        explanation: "Tab Page Layout digunakan untuk menata halaman seperti margin dan ukuran kertas.",
      },
      {
        question: "Ikon 'Merge Cell' terdapat pada Tab Home di grup...",
        options: [
          { label: "a", text: "Font" },
          { label: "b", text: "Alignment", correct: true },
          { label: "c", text: "Cells" },
        ],
        explanation: "Merge Cell terdapat di Grup Alignment pada Tab Home.",
      },
      {
        question: "Untuk menampilkan atau menyembunyikan Gridlines (garis kisi), kita menggunakan Tab...",
        options: [
          { label: "a", text: "Data" },
          { label: "b", text: "View", correct: true },
          { label: "c", text: "Review" },
        ],
        explanation: "Gridlines dapat diatur tampilannya melalui Grup Show pada Tab View.",
      },
      {
        question: "Grup yang berisi ikon 'Sort & Filter' terdapat pada Tab...",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Data", correct: true },
          { label: "c", text: "Formulas" },
        ],
        explanation: "Grup Sort & Filter terdapat pada Tab Data (dan juga Home).",
      },
      {
        question: "Fungsi untuk membekukan sebagian lembar kerja agar tetap terlihat saat digulung adalah...",
        options: [
          { label: "a", text: "Split" },
          { label: "b", text: "Freeze Panes", correct: true },
          { label: "c", text: "Hide" },
        ],
        explanation: "Freeze Panes membuat sebagian lembar kerja terlihat dan lainnya menggulung.",
      },
      {
        question: "Grup 'Function Library' yang berisi kategori rumus Matematika & Trigonometri ada di Tab...",
        options: [
          { label: "a", text: "Formulas", correct: true },
          { label: "b", text: "Data" },
          { label: "c", text: "Insert" },
        ],
        explanation: "Function Library berada di Tab Formulas.",
      },
      {
        question: "Untuk memberikan komentar pada sel, fitur yang digunakan ada di Tab...",
        options: [
          { label: "a", text: "View" },
          { label: "b", text: "Review", correct: true },
          { label: "c", text: "Page Layout" },
        ],
        explanation: "Grup Comments untuk membuat komentar baru ada di Tab Review.",
      },
      {
        question: "Fitur 'Remove Duplicates' untuk menghapus data ganda terdapat di Tab...",
        options: [
          { label: "a", text: "Data", correct: true },
          { label: "b", text: "Home" },
          { label: "c", text: "Insert" },
        ],
        explanation: "Remove Duplicates berada di Grup Data Tools pada Tab Data.",
      },
      {
        question: "Kolom dalam Excel dinamai berdasarkan...",
        options: [
          { label: "a", text: "Angka (1, 2, 3)" },
          { label: "b", text: "Abjad (A, B, C)", correct: true },
          { label: "c", text: "Simbol" },
        ],
        explanation: "Setiap kolom memiliki nama berdasarkan Abjad dari A hingga Z dst.",
      },
      {
        question: "Untuk menyisipkan gambar (Picture) ke dalam worksheet, gunakan Tab...",
        options: [
          { label: "a", text: "Insert", correct: true },
          { label: "b", text: "Page Layout" },
          { label: "c", text: "View" },
        ],
        explanation: "Picture berada di Grup Illustrations pada Tab Insert.",
      },
      {
        question: "Ikon untuk format mata uang (Currency) terdapat di Tab Home grup...",
        options: [
          { label: "a", text: "Number", correct: true },
          { label: "b", text: "Styles" },
          { label: "c", text: "Cells" },
        ],
        explanation: "Currency untuk format mata uang berada di Grup Number.",
      },
      {
        question: "Tombol untuk memperbesar tampilan layar (Zoom) terletak di...",
        options: [
          { label: "a", text: "Kiri Atas" },
          { label: "b", text: "Kanan Bawah", correct: true },
          { label: "c", text: "Kiri Bawah" },
        ],
        explanation: "Zoom dan Tombol Ukuran biasanya terletak di pojok kanan bawah jendela aplikasi.",
      },
      {
        question: "Autosum adalah fasilitas untuk...",
        options: [
          { label: "a", text: "Mengurutkan data" },
          { label: "b", text: "Penjumlahan data otomatis", correct: true },
          { label: "c", text: "Membuat grafik" },
        ],
        explanation: "Autosum adalah fasilitas yang diberikan Ms.Excel untuk penjumlahan data secara otomatis.",
      },
    ],
  },
  {
    id: 20,
    title: "Penutup",
    type: "content",
    icon: "20",
    subtitle: "Selesai",
    content: [
      "Selamat! Anda telah mempelajari seluruh bagian antarmuka dan fungsi menu Microsoft Excel.",
      "Pemahaman ini adalah fondasi penting sebelum mulai mengolah data dan rumus di bab selanjutnya.",
    ],
  },
];