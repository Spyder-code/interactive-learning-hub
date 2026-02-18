import type { Slide } from "./slides";

export const slidesP5: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (1.23 - 1.25) ---
  {
    id: 1,
    title: "Lanjutan Modul Word: Otomatisasi Dokumen",
    type: "content",
    icon: "1",
    subtitle: "Topik 1.23 - 1.25",
    content: [
      "Selamat datang di sesi tingkat lanjut! Kita akan mengubah cara kerja manual menjadi otomatis.",
      "**Fokus Materi:**",
      "1. **Styles:** Format konsisten untuk judul dan sub-judul.",
      "2. **Mail Merge:** Membuat ratusan surat undangan otomatis dari satu data.",
      "3. **Table of Contents:** Membuat Daftar Isi otomatis dalam hitungan detik.",
    ],
  },

  // --- TOPIK 1.23: STYLES ---
  {
    id: 2,
    title: "Mengenal Styles",
    type: "content",
    icon: "2",
    subtitle: "Kunci Dokumen Rapi",
    content: [
      "Styles adalah kumpulan format yang disimpan (font, ukuran, warna) untuk menjaga konsistensi dokumen.",
      "**Jenis Styles Penting:**",
      "**Normal:** Untuk isi paragraf/teks biasa.",
      "**Heading 1:** Untuk Judul Bab (Misal: BAB I PENDAHULUAN).",
      "**Heading 2:** Untuk Sub-Bab (Misal: 1.1 Latar Belakang).",
      "**Heading 3:** Untuk Sub-Sub-Bab.",
    ],
    note: "Styles terletak di Tab Home > Grup Styles.",
  },
  {
    id: 3,
    title: "Mengapa Harus Pakai Styles?",
    type: "content",
    icon: "3",
    subtitle: "Manfaat Utama",
    content: [
      "1. **Navigasi Cepat:** Memunculkan 'Navigation Pane' di sebelah kiri untuk loncat antar bab.",
      "2. **Daftar Isi Otomatis:** Word hanya bisa membuat Daftar Isi jika Anda menggunakan Styles (Heading).",
      "3. **Perubahan Massal:** Ubah satu setting Heading 1 (misal jadi warna merah), semua Judul Bab di dokumen otomatis berubah merah.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Menerapkan Styles",
    type: "task",
    icon: "4",
    subtitle: "Praktik Styles - 10 Menit",
    content: ["Buat dokumen baru dan ketik kerangka skripsi berikut:"],
    checklist: [
      "BAB 1 PENDAHULUAN (Terapkan **Heading 1**, Rata Tengah).",
      "1.1 Latar Belakang (Terapkan **Heading 2**).",
      "1.2 Rumusan Masalah (Terapkan **Heading 2**).",
      "BAB 2 PEMBAHASAN (Terapkan **Heading 1**, Rata Tengah).",
      "Isi sembarang teks 'lorem ipsum' di bawah setiap sub-bab (Terapkan style **Normal**).",
    ],
    tasks: ["Upload dokumen yang sudah menggunakan Heading Styles ini."],
    requireUpload: true,
    note: "Gunakan rumus =lorem(jumlah_paragraf,jumlah_kalimat) untuk generate teks dummy.",
  },

  // --- TOPIK 1.24: MAIL MERGE ---
  {
    id: 5,
    title: "Mail Merge (Surat Massal)",
    type: "content",
    icon: "5",
    subtitle: "Satu Surat, Banyak Penerima",
    content: [
      "Fitur untuk mengirim surat/sertifikat yang sama ke banyak orang berbeda.",
      "**Komponen Utama:**",
      "1. **Dokumen Utama (Main Document):** Template surat di Word.",
      "2. **Sumber Data (Data Source):** Daftar nama/alamat (biasanya file Excel).",
      "**Lokasi:** Tab Mailings.",
    ],
  },
  {
    id: 6,
    title: "Langkah Mail Merge",
    type: "content",
    icon: "6",
    subtitle: "Proses Pembuatan",
    content: [
      "1. **Start Mail Merge:** Pilih jenis (Letters/E-mail).",
      "2. **Select Recipients:** Pilih 'Use an Existing List' lalu cari file Excel datamu.",
      "3. **Insert Merge Field:** Masukkan variabel (misal: <<Nama>>, <<Alamat>>) ke posisi yang sesuai di surat.",
      "4. **Preview Results:** Melihat hasil data asli.",
      "5. **Finish & Merge:** Cetak atau simpan sebagai dokumen individual.",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Simulasi Mail Merge",
    type: "task",
    icon: "7",
    subtitle: "Praktik Tingkat Lanjut - 15 Menit",
    content: ["Kita akan mensimulasikan pembuatan surat undangan."],
    checklist: [
      "Buat file Excel sederhana (Nama, Kota). Isi 10 baris data. Simpan.",
      "Buka Word, buat surat singkat: 'Halo [Nama], kami mengundang Anda di [Kota]'.",
      "Hubungkan Word dengan Excel tadi (Mailings > Select Recipients).",
      "Masukkan Field Nama dan Kota di tempat yang sesuai.",
      "Klik **Preview Results** untuk melihat nama berubah.",
    ],
    tasks: [
      "Upload dokumen Word (.docx) hasil Mail Merge",
      "Upload file Excel (.xlsx) yang berisi data penerima.",
    ],
    requireUpload: true,
  },

  // --- TOPIK 1.25: TABLE OF CONTENTS ---
  {
    id: 8,
    title: "Table of Contents (Daftar Isi)",
    type: "content",
    icon: "8",
    subtitle: "Membuat Daftar Isi Otomatis",
    content: [
      "Jika Anda sudah menggunakan **Styles (Heading 1, 2, 3)**, membuat daftar isi sangat mudah.",
      "**Langkah:**",
      "1. Letakkan kursor di halaman kosong (biasanya halaman awal).",
      "2. Tab **References** > **Table of Contents**.",
      "3. Pilih 'Automatic Table 1' atau 'Automatic Table 2'.",
    ],
  },
  {
    id: 9,
    title: "Mengupdate Daftar Isi",
    type: "content",
    icon: "9",
    subtitle: "Menjaga Keakuratan Data",
    content: [
      "Daftar isi tidak berubah otomatis saat Anda mengetik. Anda harus meng-update manual.",
      "Klik kanan pada Daftar Isi > **Update Table**.",
      "**Update page numbers only:** Jika hanya halaman yang bergeser.",
      "**Update entire table:** Jika ada perubahan judul bab atau penambahan sub-bab baru.",
    ],
  },
  {
    id: 10,
    title: "Tugas 3: Daftar Isi Otomatis",
    type: "task",
    icon: "10",
    subtitle: "Finalisasi Dokumen - 10 Menit",
    content: ["Buka kembali dokumen Tugas 1 (yang ada Heading-nya)."],
    checklist: [
      "Sisipkan halaman kosong di paling atas (Ctrl+Enter).",
      "Buat **Daftar Isi Otomatis** di halaman tersebut (Tab References).",
      "Coba ubah 'BAB 1 PENDAHULUAN' menjadi 'BAB 1 INTRODUCTION' di halaman isi.",
      "Lakukan **Update Entire Table** pada daftar isi untuk melihat perubahannya.",
    ],
    tasks: ["Upload dokumen akhir yang sudah memiliki Daftar Isi otomatis."],
    requireUpload: true,
  },

  // --- REVIEW MATERI (MID QUIZ) ---
  {
    id: 11,
    title: "Quiz Review Fitur",
    type: "quiz",
    icon: "11",
    subtitle: "Cek Pemahaman Singkat",
    content: ["Mari review konsep Styles dan Mail Merge."],
    quiz: [
      {
        question:
          "Apa syarat utama agar Daftar Isi bisa dibuat secara otomatis?",
        options: [
          { label: "a", text: "Judul harus ditebalkan (Bold) manual" },
          {
            label: "b",
            text: "Judul harus menggunakan Styles (Heading)",
            correct: true,
          },
          { label: "c", text: "Dokumen harus lebih dari 10 halaman" },
        ],
        explanation:
          "Table of Contents bekerja dengan membaca teks yang diformat menggunakan Styles Heading.",
      },
      {
        question:
          "Dalam Mail Merge, file Excel yang berisi daftar nama penerima disebut...",
        options: [
          { label: "a", text: "Main Document" },
          { label: "b", text: "Data Source", correct: true },
          { label: "c", text: "Preview Results" },
        ],
        explanation:
          "Data Source adalah sumber data (seperti Excel) yang berisi informasi variabel penerima.",
      },
    ],
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 12,
    title: "Quiz Akhir Modul 1.23 - 1.25",
    type: "quiz",
    icon: "12",
    subtitle: "Evaluasi Otomatisasi (15 Soal)",
    content: [
      "Jawablah pertanyaan berikut untuk menguji pemahaman materi Styles, Mail Merge, dan Daftar Isi.",
    ],
    quiz: [
      {
        question:
          "Fitur untuk menjaga konsistensi format judul dan sub-judul dalam dokumen disebut...",
        options: [
          { label: "a", text: "Themes" },
          { label: "b", text: "Styles", correct: true },
          { label: "c", text: "Font Family" },
        ],
        explanation:
          "Styles digunakan untuk mempermudah penjagaan konsistensi penulisan dan tata tulis.",
      },
      {
        question: "Style 'Heading 1' biasanya digunakan untuk...",
        options: [
          { label: "a", text: "Isi paragraf biasa" },
          { label: "b", text: "Judul Bab Utama", correct: true },
          { label: "c", text: "Catatan kaki" },
        ],
        explanation:
          "Heading 1 secara default digunakan untuk level teratas hierarki dokumen seperti Judul Bab.",
      },
      {
        question:
          "Jika ingin mengubah format Heading 1 (misal font size) agar berlaku ke seluruh dokumen, caranya adalah...",
        options: [
          { label: "a", text: "Ubah satu per satu manual" },
          {
            label: "b",
            text: "Klik kanan pada Style Heading 1 > Modify",
            correct: true,
          },
          { label: "c", text: "Hapus dan buat baru" },
        ],
        explanation:
          "Menu Modify pada Styles memungkinkan perubahan format diterapkan ke seluruh teks yang menggunakan style tersebut.",
      },
      {
        question:
          "Fitur untuk mengirim satu surat ke banyak penerima dengan data berbeda disebut...",
        options: [
          { label: "a", text: "Mass Email" },
          { label: "b", text: "Mail Merge", correct: true },
          { label: "c", text: "Broadcast" },
        ],
        explanation:
          "Mail Merge digunakan untuk membuat surat massal ke beberapa penerima berbeda.",
      },
      {
        question:
          "Dokumen yang berisi data penerima (nama, alamat) dalam Mail Merge disebut...",
        options: [
          { label: "a", text: "Main Document" },
          { label: "b", text: "Data Source", correct: true },
          { label: "c", text: "Merge Field" },
        ],
        explanation:
          "Data Source (sumber data) bisa berupa file Excel yang berisi tabel informasi penerima.",
      },
      {
        question: "Langkah pertama membuat Mail Merge adalah klik tombol...",
        options: [
          { label: "a", text: "Start Mail Merge", correct: true },
          { label: "b", text: "Insert Merge Field" },
          { label: "c", text: "Finish & Merge" },
        ],
        explanation:
          "Start Mail Merge adalah langkah awal untuk menentukan jenis dokumen (Surat/Email).",
      },
      {
        question:
          "Untuk memasukkan variabel 'Nama' ke dalam surat, kita menggunakan fitur...",
        options: [
          { label: "a", text: "Select Recipients" },
          { label: "b", text: "Insert Merge Field", correct: true },
          { label: "c", text: "Address Block" },
        ],
        explanation:
          "Insert Merge Field digunakan untuk memasukkan kolom data tertentu (seperti Nama) ke dalam dokumen.",
      },
      {
        question:
          "Tombol untuk melihat tampilan surat dengan data asli sebelum dicetak adalah...",
        options: [
          { label: "a", text: "View Data" },
          { label: "b", text: "Preview Results", correct: true },
          { label: "c", text: "Check Errors" },
        ],
        explanation:
          "Preview Results menampilkan data asli dari Data Source menggantikan nama field.",
      },
      {
        question:
          "Jika ingin mencetak surat Mail Merge menjadi dokumen individual, pilih menu...",
        options: [
          { label: "a", text: "Print Preview" },
          { label: "b", text: "Finish & Merge", correct: true },
          { label: "c", text: "Save As" },
        ],
        explanation:
          "Finish & Merge adalah tahap penyelesaian untuk mencetak atau menyimpan dokumen gabungan.",
      },
      {
        question:
          "Menu untuk membuat Daftar Isi otomatis (Table of Contents) terdapat di Tab...",
        options: [
          { label: "a", text: "Layout" },
          { label: "b", text: "Insert" },
          { label: "c", text: "References", correct: true },
        ],
        explanation: "Table of Contents terletak di dalam Tab References.",
      },
      {
        question:
          "Apa yang terjadi jika kita mengklik 'Automatic Table 1' tanpa menerapkan Styles Heading?",
        options: [
          { label: "a", text: "Daftar isi tetap muncul sempurna" },
          {
            label: "b",
            text: "Akan muncul pesan error / daftar isi kosong",
            correct: true,
          },
          { label: "c", text: "Komputer akan restart" },
        ],
        explanation:
          "Daftar isi otomatis tidak dapat mendeteksi teks jika tidak ada Styles Heading yang diterapkan.",
      },
      {
        question:
          "Jika Anda hanya mengubah nomor halaman tanpa mengubah judul bab, opsi update yang dipilih adalah...",
        options: [
          { label: "a", text: "Update entire table" },
          { label: "b", text: "Update page numbers only", correct: true },
          { label: "c", text: "Update styles" },
        ],
        explanation:
          "Update page numbers only digunakan bila perubahan hanya terjadi pada letak halaman.",
      },
      {
        question:
          "Jika Anda menambahkan Bab baru dan ingin menampilkannya di Daftar Isi, pilih opsi update...",
        options: [
          { label: "a", text: "Update page numbers only" },
          { label: "b", text: "Update entire table", correct: true },
          { label: "c", text: "Refresh" },
        ],
        explanation:
          "Update entire table diperlukan bila ada penambahan heading atau perubahan teks judul.",
      },
      {
        question:
          "Panel di sebelah kiri yang menampilkan struktur Heading dokumen disebut...",
        options: [
          { label: "a", text: "Clipboard" },
          { label: "b", text: "Navigation Pane", correct: true },
          { label: "c", text: "Selection Pane" },
        ],
        explanation:
          "Navigation Pane menampilkan struktur dokumen berdasarkan Heading untuk navigasi cepat.",
      },
      {
        question: "Bagaimana cara menghapus Daftar Isi otomatis?",
        options: [
          { label: "a", text: "Hapus satu per satu" },
          {
            label: "b",
            text: "Klik Table of Contents > Remove Table of Contents",
            correct: true,
          },
          { label: "c", text: "Tekan Ctrl+Z" },
        ],
        explanation:
          "Menu Remove Table of Contents tersedia di dropdown Table of Contents untuk menghapusnya dengan bersih.",
      },
    ],
  },

  // --- PENUTUP MODUL ---
  {
    id: 13,
    title: "Penutup Modul Bab 1",
    type: "content",
    icon: "13",
    subtitle: "Misi Selesai!",
    content: [
      "Selamat! Anda telah menuntaskan seluruh materi Bab 1 Microsoft Word.",
      "Anda sekarang menguasai:",
      "1. Dasar & Formatting.",
      "2. Layout & Visual.",
      "3. Otomatisasi (Styles, Mail Merge, Daftar Isi).",
      "Keahlian ini adalah standar wajib untuk dunia perkuliahan dan kerja profesional.",
    ],
  },
];
