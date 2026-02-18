import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: MENGELOLA DOKUMEN (5.4) ---
  {
    id: 1,
    title: "Lanjutan Modul Zotero: Manajemen & Sitasi",
    type: "content",
    icon: "1",
    subtitle: "Topik 5.4 - 5.6",
    content: [
      "Setelah instalasi, saatnya mengisi 'perpustakaan' Zotero Anda dan menggunakannya untuk menulis.",
      "**Fokus Materi:**",
      "1. **Input Data:** Dari Web, Manual, ISBN, dan PDF.",
      "2. **Manajemen:** Folder, Catatan, Duplikat, dan Grup.",
      "3. **Integrasi Word:** Membuat kutipan dan daftar pustaka otomatis.",
    ],
  },

  // --- 5.4.1 - 5.4.3: INPUT DATA ---
  {
    id: 2,
    title: "Menyimpan dari Web",
    type: "content",
    icon: "2",
    subtitle: "Satu Klik (5.4.1)",
    content: [
      "**Zotero Connector** mendeteksi konten di browser.",
      "**Ikon Berubah-ubah:**",
      "- Ikon **Buku Biru**: Jika membuka halaman buku.",
      "- Ikon **Lembar Putih**: Jika membuka artikel jurnal.",
      "- Ikon **Folder**: Jika ada banyak hasil pencarian.",
      "**Caranya:** Klik ikon tersebut di pojok kanan atas browser > Simpan ke Zotero.",
    ],
  },
  {
    id: 3,
    title: "Input Manual & ISBN",
    type: "content",
    icon: "3",
    subtitle: "Alternatif Input (5.4.2 - 5.4.3)",
    content: [
      "**Manual:** Klik ikon **'Plus Hijau'** > Pilih jenis (Buku/Jurnal) > Isi judul, penulis, tahun di panel kanan.",
      "**Otomatis via Kode (Magic Wand):**",
      "- Klik ikon **'Tongkat Sihir'** (Add Item by Identifier).",
      "- Masukkan **ISBN** (buku), **DOI** (jurnal), atau **PMID**.",
      "- Zotero akan mencari metadata secara online dan menyimpannya.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Input Referensi",
    type: "task",
    icon: "4",
    subtitle: "Praktik Input Data - 10 Menit",
    content: ["Isi library Zotero Anda dengan 3 metode berbeda."],
    checklist: [
      "**Web:** Buka Google Scholar, cari topik riset Anda, simpan 1 artikel via ikon Zotero di browser.",
      "**Manual:** Klik ikon Plus Hijau > Book. Masukkan data buku fiktif (Judul: Belajar Zotero, Penulis: Nama Anda).",
      "**ISBN:** Klik ikon Tongkat Sihir > Masukkan ISBN buku favorit Anda (cari di cover belakang buku atau Google).",
    ],
    tasks: [
      "Upload screenshot Zotero Desktop yang menampilkan ketiga item tersebut.",
    ],
    requireUpload: true,
  },

  // --- 5.4.4: INPUT PDF ---
  {
    id: 5,
    title: "Input File PDF",
    type: "content",
    icon: "5",
    subtitle: "Retrieve Metadata (5.4.4)",
    content: [
      "Punya banyak file PDF jurnal di laptop? Masukkan saja ke Zotero.",
      "**Caranya:** Drag & Drop file PDF ke tengah aplikasi Zotero.",
      "**Retrieve Metadata:** Klik kanan pada PDF > Pilih **Retrieve Metadata for PDF**. Zotero akan membaca isi file dan membuatkan sitasinya otomatis.",
      "*Syarat: Fitur PDF Indexing harus terinstal (Cek di Edit > Preferences > Search).* ",
    ],
  },

  // --- 5.4.5 - 5.4.7: MANAJEMEN ---
  {
    id: 6,
    title: "Catatan, Tag & Folder",
    type: "content",
    icon: "6",
    subtitle: "Organisasi Data (5.4.5 - 5.4.6)",
    content: [
      "**Catatan (Notes):** Klik tab 'Notes' di panel kanan untuk menambah ringkasan.",
      "**Tag:** Kata kunci untuk memfilter dokumen (misal: 'Penting', 'Bab 1').",
      "**Folder (Collection):** Klik ikon **Folder Kuning** di kiri atas > Beri nama (misal: 'Skripsi'). Drag file ke folder tersebut.",
    ],
  },
  {
    id: 7,
    title: "Mencari Duplikat",
    type: "content",
    icon: "7",
    subtitle: "Membersihkan Data (5.4.7)",
    content: [
      "Data ganda akan mengacaukan daftar pustaka.",
      "**Cara Cek:**",
      "1. Klik folder **Duplicate Items** di panel kiri bawah.",
      "2. Pilih item yang ganda.",
      "3. Klik **Merge** (Gabungkan) di panel kanan untuk menyatukannya menjadi satu referensi utuh.",
    ],
  },
  {
    id: 8,
    title: "Tugas 2: Manajemen Library",
    type: "task",
    icon: "8",
    subtitle: "Praktik Kerapian - 5 Menit",
    content: ["Rapikan data yang sudah Anda input."],
    checklist: [
      "Buat **Koleksi (Folder)** baru dengan nama 'Latihan Bab 5'.",
      "Pindahkan semua referensi tadi ke folder ini.",
      "Pilih salah satu referensi, tambahkan **Catatan (Note)**: 'Referensi utama'.",
      "Cek folder **Duplicate Items**, jika ada isinya, lakukan Merge.",
    ],
    tasks: [
      "Upload screenshot tampilan folder 'Latihan Bab 5' beserta panel kanan yang menampilkan catatan.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 2: KOLABORASI GRUP (5.5) ---
  {
    id: 9,
    title: "Bekerja dengan Grup",
    type: "content",
    icon: "9",
    subtitle: "Kolaborasi Tim (5.5)",
    content: [
      "Zotero memungkinkan berbagi referensi dengan tim riset.",
      "**Membuat Grup:** Klik ikon **New Group** (kotak coklat biru) > Arahkan ke zotero.org > Create Group.",
      "**Jenis Grup:**",
      "- **Public:** Semua orang bisa melihat dan gabung.",
      "- **Private:** Hanya undangan (bisa share file PDF).",
      "**Mengundang:** Di web Zotero > Member Settings > Send More Invitations.",
    ],
  },

  // --- BAGIAN 3: INTEGRASI WORD (5.6) ---
  {
    id: 10,
    title: "Interaksi dengan Naskah",
    type: "content",
    icon: "10",
    subtitle: "Plugin Word (5.6.1 - 5.6.2)",
    content: [
      "Zotero otomatis memasang plugin di Microsoft Word (Tab **Zotero**).",
      "**Menyisipkan Sitasi:**",
      "1. Klik **Add/Edit Citation**.",
      "2. Pilih Gaya Sitasi (misal: APA atau Chicago).",
      "3. Ketik nama penulis/judul di kotak merah Zotero > Enter.",
      "4. Sitasi muncul di teks, misal: (Santoso, 2020).",
    ],
  },
  {
    id: 11,
    title: "Membuat Daftar Pustaka",
    type: "content",
    icon: "11",
    subtitle: "Bibliografi Otomatis (5.6.3)",
    content: [
      "Tidak perlu mengetik daftar pustaka manual!",
      "**Caranya:**",
      "1. Letakkan kursor di halaman akhir.",
      "2. Klik **Add/Edit Bibliography**.",
      "3. Zotero akan menyusun semua referensi yang *telah disitasi* di dokumen tersebut secara alfabetis.",
    ],
  },
  {
    id: 12,
    title: "Mengganti Style (Gaya)",
    type: "content",
    icon: "12",
    subtitle: "Format Sitasi (5.6.4 - 5.6.5)",
    content: [
      "**Ganti Style:** Klik **Document Preferences** > Pilih gaya lain (misal dari APA ke IEEE). Format akan berubah otomatis.",
      "**Tambah Style:** Jika gaya kampus tidak ada, klik **Manage Styles** > **Get additional styles** > Cari nama gaya (misal: 'Gadjah Mada University').",
    ],
  },
  {
    id: 13,
    title: "Tugas 3: Menulis Ilmiah",
    type: "task",
    icon: "13",
    subtitle: "Praktik Word - 15 Menit",
    content: ["Buka Microsoft Word dan buat dokumen baru."],
    checklist: [
      "Tulis kalimat: 'Zotero memudahkan manajemen referensi'.",
      "Sisipkan **Sitasi** di akhir kalimat (gunakan salah satu referensi dari Tugas 1).",
      "Tulis kalimat kedua dan sisipkan sitasi berbeda.",
      "Di baris baru, buat **Daftar Pustaka** otomatis (Add Bibliography).",
      "Ubah Style menjadi **IEEE** (Angka kurung siku [1]).",
    ],
    tasks: ["Upload file Word (.docx) hasil praktik sitasi ini."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 14,
    title: "Quiz Akhir Bab 5",
    type: "quiz",
    icon: "14",
    subtitle: "Evaluasi Zotero (10 Soal)",
    content: ["Uji pemahaman Anda tentang pengoperasian Zotero."],
    quiz: [
      {
        question:
          "Fitur untuk memasukkan data buku secara otomatis hanya dengan mengetikkan kodenya disebut...",
        options: [
          { label: "a", text: "Add by Identifier (Magic Wand)" },
          { label: "b", text: "Add Note" },
          { label: "c", text: "New Collection" },
        ],
        explanation:
          "Ikon tongkat sihir digunakan untuk input otomatis via ISBN, DOI, atau PMID.",
      },
      {
        question:
          "Jika ingin mengambil metadata dari file PDF yang sudah ada di komputer, langkahnya adalah...",
        options: [
          { label: "a", text: "Klik kanan PDF > Retrieve Metadata for PDF" },
          { label: "b", text: "Klik kanan PDF > Create Bibliography" },
          { label: "c", text: "Klik kanan PDF > Rename" },
        ],
        explanation:
          "Retrieve Metadata memerintahkan Zotero membaca isi PDF dan mencari datanya di Google Scholar/Database.",
      },
      {
        question: "Di mana kita bisa menemukan file yang terduplikasi (ganda)?",
        options: [
          { label: "a", text: "Folder 'Trash'" },
          { label: "b", text: "Folder 'Duplicate Items'" },
          { label: "c", text: "Folder 'Unfiled Items'" },
        ],
        explanation:
          "Duplicate Items adalah folder khusus yang menampung referensi yang terdeteksi ganda.",
      },
      {
        question:
          "Untuk menampilkan daftar pustaka di Word, tombol yang diklik adalah...",
        options: [
          { label: "a", text: "Add/Edit Citation" },
          { label: "b", text: "Add/Edit Bibliography" },
          { label: "c", text: "Document Preferences" },
        ],
        explanation:
          "Add/Edit Bibliography digunakan untuk men-generate daftar referensi lengkap.",
      },
      {
        question:
          "Jika ingin mengubah format sitasi dari (Author, Year) menjadi angka [1], kita harus...",
        options: [
          { label: "a", text: "Mengetik ulang manual" },
          {
            label: "b",
            text: "Mengklik Document Preferences dan memilih style IEEE",
          },
          { label: "c", text: "Menginstal ulang Zotero" },
        ],
        explanation:
          "Perubahan format dilakukan melalui Document Preferences dengan memilih Style yang sesuai (misal IEEE).",
      },
      {
        question:
          "Ikon 'Folder Kuning' di pojok kiri atas aplikasi Zotero berfungsi untuk...",
        options: [
          { label: "a", text: "Membuat Grup Baru" },
          { label: "b", text: "Membuat Koleksi (Collection) baru" },
          { label: "c", text: "Menghapus data" },
        ],
        explanation:
          "New Collection (ikon folder) digunakan untuk mengelompokkan referensi.",
      },
      {
        question:
          "Agar Zotero bisa mendeteksi metadata PDF, kita perlu menginstal...",
        options: [
          { label: "a", text: "Zotero Connector" },
          { label: "b", text: "PDF Indexing (pdf2text & pdfinfo)" },
          { label: "c", text: "Microsoft Word" },
        ],
        explanation:
          "Fitur PDF indexing diperlukan untuk membaca teks dalam file PDF.",
      },
      {
        question: "Fitur 'Sync' (panah hijau melengkung) berguna untuk...",
        options: [
          { label: "a", text: "Menghapus data di komputer" },
          {
            label: "b",
            text: "Menyamakan data di aplikasi Desktop dengan akun Web Zotero",
          },
          { label: "c", text: "Membuat sitasi" },
        ],
        explanation:
          "Sync melakukan sinkronisasi data lokal ke server cloud Zotero.",
      },
      {
        question:
          "Apa fungsi dari 'Suppress Author' saat mengedit sitasi di Word?",
        options: [
          { label: "a", text: "Menghapus sitasi" },
          {
            label: "b",
            text: "Menyembunyikan nama penulis (hanya menampilkan tahun)",
          },
          { label: "c", text: "Menambah nama penulis" },
        ],
        explanation:
          "Suppress Author digunakan jika nama penulis sudah disebutkan dalam kalimat, sehingga sitasi hanya butuh tahun.",
      },
      {
        question: "Grup tipe 'Private' di Zotero memiliki kelebihan...",
        options: [
          { label: "a", text: "Bisa dilihat semua orang" },
          {
            label: "b",
            text: "Bisa berbagi file PDF (attachment) antar anggota",
          },
          { label: "c", text: "Tidak butuh akun Zotero" },
        ],
        explanation:
          "Hanya Private Group yang mengizinkan file sharing (PDF) antar anggotanya.",
      },
    ],
  },

  // --- PENUTUP MODUL ---
  {
    id: 15,
    title: "Selesai Modul Zotero",
    type: "content",
    icon: "15",
    subtitle: "Kompetensi Tercapai",
    content: [
      "Selamat! Anda telah menyelesaikan seluruh materi Bab 5.",
      "Anda kini mampu menggunakan Zotero untuk manajemen referensi dan penulisan karya ilmiah yang efisien.",
      "**Tips:** Selalu lakukan Sync agar data Anda aman di cloud.",
    ],
  },
];