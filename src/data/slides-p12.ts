import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PENDAHULUAN (3.1) ---
  {
    id: 1,
    title: "Pengenalan Microsoft PowerPoint",
    type: "content",
    icon: "1",
    subtitle: "Modul Dasar Presentasi",
    content: [
      "**Definisi:** Microsoft PowerPoint adalah program aplikasi untuk membuat presentasi elektronik yang dinamis.",
      "**Komponen Presentasi:** Bisa terdiri dari teks, grafik, gambar, clipart, film (movie), dan suara.",
      "**Kelebihan Versi Baru:**",
      "- Tampilan antarmuka Ribbon yang lebih datar.",
      "- Panduan pintar (Smart Guides) untuk meratakan objek.",
      "- Dukungan gambar online (Bing/Flickr).",
    ],
  },
  {
    id: 2,
    title: "Output PowerPoint",
    type: "content",
    icon: "2",
    subtitle: "Bukan Hanya Slide Layar",
    content: [
      "Selain ditampilkan di proyektor, file PowerPoint bisa dicetak dalam berbagai bentuk:",
      "1. **Handout:** Materi pegangan audiens (berisi beberapa slide per halaman).",
      "2. **Notes:** Slide beserta catatan pembicara.",
      "3. **Outline:** Hanya kerangka teks presentasi.",
      "4. **Transparansi:** Untuk OHP (Overhead Projector - teknologi lama).",
    ],
  },
  {
    id: 3,
    title: "Operasi Dasar Program",
    type: "content",
    icon: "3",
    subtitle: "Membuka & Menutup",
    content: [
      "**Membuka PowerPoint:**",
      "Klik dua kali ikon PowerPoint di desktop atau melalui tombol Start > All Programs > Microsoft Office.",
      "**Menutup PowerPoint:**",
      "Klik tab **File** > pilih **Exit**, atau klik tombol **Close (X)** di pojok kanan atas jendela.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Hello PowerPoint",
    type: "task",
    icon: "4",
    subtitle: "Praktik Awal - 5 Menit",
    content: ["Mari kita pastikan aplikasi siap digunakan."],
    checklist: [
      "Buka aplikasi Microsoft PowerPoint.",
      "Pilih **Blank Presentation**.",
      "Pada slide pertama (Judul), ketik: 'Latihan 1 - [Nama Anda]'.",
      "Simpan file dengan nama **Latihan1_Nama.pptx**.",
    ],
    tasks: ["Upload file PowerPoint (.pptx) yang baru saja Anda buat."],
    requireUpload: true,
  },

  // --- BAGIAN 2: ANTARMUKA POWERPOINT (3.2) ---
  {
    id: 5,
    title: "Mengenal Tampilan (Interface)",
    type: "content",
    icon: "5",
    subtitle: "Peta Navigasi Layar",
    content: [
      "**Slide Pane:** Area kerja utama di tengah untuk mengedit slide.",
      "**Thumbnail Slide:** Deretan slide kecil di sebelah kiri untuk navigasi cepat.",
      "**Notes Pane:** Area di bawah slide untuk menulis catatan pembicara (tidak terlihat audiens).",
      "**View Buttons:** Tombol di pojok kanan bawah untuk mengubah mode baca/presentasi.",
      "**Zoom Slider:** Pengatur besar/kecil tampilan layar.",
    ],
  },
  {
    id: 6,
    title: "Bedah Tab Menu (Bagian 1)",
    type: "content",
    icon: "6",
    subtitle: "Home, Insert, Design",
    content: [
      "**Home:** Menu standar (New Slide, Font, Paragraph, Drawing). Tempat paling sering kita bekerja.",
      "**Insert:** Menyisipkan objek (Tabel, Gambar, Grafik/Chart, Video, Audio, Text Box).",
      "**Design:** Mengatur tampilan visual (Themes, Variants) dan ukuran slide (Slide Size).",
    ],
  },
  {
    id: 7,
    title: "Bedah Tab Menu (Bagian 2)",
    type: "content",
    icon: "7",
    subtitle: "Transitions vs Animations",
    content: [
      "Sering tertukar! Perhatikan bedanya:",
      "**Transitions:** Efek pergerakan PERPINDAHAN antar slide (misal dari Slide 1 ke Slide 2).",
      "**Animations:** Efek pergerakan OBJEK di dalam slide (misal teks terbang masuk, gambar berputar).",
    ],
  },
  {
    id: 8,
    title: "Bedah Tab Menu (Bagian 3)",
    type: "content",
    icon: "8",
    subtitle: "Slide Show, Review, View",
    content: [
      "**Slide Show:** Pengaturan saat presentasi dijalankan (Mulai dari awal, loop, setting monitor).",
      "**Review:** Pengecekan ejaan (Spelling), komentar, dan proteksi.",
      "**View:** Mengatur cara kita melihat area kerja (Slide Master, Handout Master, Ruler, Gridlines).",
    ],
  },
  {
    id: 9,
    title: "Tugas 2: Eksplorasi Menu",
    type: "task",
    icon: "9",
    subtitle: "Praktik Tab Design - 5 Menit",
    content: ["Buka kembali file latihan Anda."],
    checklist: [
      "Pergi ke Tab **Design**.",
      "Pilih salah satu **Themes** (Tema) agar slide tidak putih polos.",
      "Masih di Tab Design, cari menu **Slide Size** dan pastikan ukurannya **Widescreen (16:9)**.",
    ],
    tasks: [
      "Screenshot tampilan slide Anda yang sudah bertema, upload di sini.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 3: MEMBUAT PRESENTASI (3.3) ---
  {
    id: 10,
    title: "Manajemen File Presentasi",
    type: "content",
    icon: "10",
    subtitle: "New, Save, Open",
    content: [
      "**Membuat Baru (New):**",
      "Klik File > New. Bisa pilih 'Blank Presentation' (kosong) atau 'Templates' (desain siap pakai).",
      "**Menyimpan (Save As):**",
      "Klik File > Save As > Browse > Tentukan lokasi > Beri Nama > Save.",
      "**Membuka (Open):**",
      "Klik File > Open > Computer > Browse > Pilih File > Open.",
    ],
  },
  {
    id: 11,
    title: "Tugas 3: Menggunakan Template",
    type: "task",
    icon: "11",
    subtitle: "Praktik Template - 10 Menit",
    content: ["PowerPoint menyediakan template profesional secara gratis."],
    checklist: [
      "Klik File > New.",
      "Jangan pilih Blank. Pilih salah satu **Template** bergambar/berwarna yang tersedia.",
      "Klik **Create**.",
      "Isi Judul: 'Profil Perusahaan' dan Sub-judul: 'Dibuat oleh [Nama Anda]'.",
    ],
    tasks: ["Simpan dan upload file hasil template tersebut."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 12,
    title: "Quiz Akhir Topik 3.1 - 3.3",
    type: "quiz",
    icon: "12",
    subtitle: "Evaluasi Dasar PowerPoint (10 Soal)",
    content: [
      "Uji pemahaman Anda tentang pengenalan dan antarmuka PowerPoint.",
    ],
    quiz: [
      {
        question:
          "Microsoft PowerPoint adalah perangkat lunak yang dikhususkan untuk...",
        options: [
          { label: "a", text: "Mengolah angka dan laporan keuangan" },
          { label: "b", text: "Membuat presentasi elektronik", correct: true },
          { label: "c", text: "Mengedit foto profesional" },
        ],
        explanation:
          "PowerPoint dirancang sebagai media pembuat presentasi yang dinamis.",
      },
      {
        question:
          "Jika ingin mencetak slide beserta catatan pembicara di bawahnya, kita memilih format cetak...",
        options: [
          { label: "a", text: "Handouts" },
          { label: "b", text: "Notes Pages", correct: true },
          { label: "c", text: "Outline" },
        ],
        explanation:
          "Notes Pages mencetak slide di bagian atas dan catatan speaker di bagian bawah halaman.",
      },
      {
        question:
          "Area di bawah slide yang digunakan untuk menuliskan naskah/catatan bagi presenter disebut...",
        options: [
          { label: "a", text: "Slide Pane" },
          { label: "b", text: "Notes Pane", correct: true },
          { label: "c", text: "Status Bar" },
        ],
        explanation:
          "Notes Pane adalah area khusus untuk catatan yang tidak akan dilihat oleh audiens saat slide show.",
      },
      {
        question:
          "Menu untuk menambahkan slide baru (New Slide) terdapat di Tab...",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Home", correct: true },
          { label: "c", text: "Design" },
        ],
        explanation:
          "Tombol New Slide terletak di grup Slides pada Tab Home (meski juga bisa dari Insert, posisi utamanya di Home).",
      },
      {
        question: "Perbedaan utama antara Transitions dan Animations adalah...",
        options: [
          {
            label: "a",
            text: "Transitions untuk teks, Animations untuk gambar",
          },
          {
            label: "b",
            text: "Transitions untuk perpindahan antar slide, Animations untuk objek dalam slide",
            correct: true,
          },
          { label: "c", text: "Sama saja" },
        ],
        explanation:
          "Transitions mengatur efek ganti halaman slide, Animations mengatur gerak objek (teks/gambar) di dalam slide.",
      },
      {
        question:
          "Jika ingin mengubah tema warna dan background seluruh slide, kita menggunakan Tab...",
        options: [
          { label: "a", text: "Design", correct: true },
          { label: "b", text: "View" },
          { label: "c", text: "Review" },
        ],
        explanation:
          "Tab Design berisi pengaturan Themes, Variants, dan Format Background.",
      },
      {
        question:
          "Untuk menyisipkan Grafik (Chart) atau Tabel ke dalam slide, gunakan Tab...",
        options: [
          { label: "a", text: "Design" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "Animations" },
        ],
        explanation:
          "Semua perintah untuk memasukkan objek eksternal ada di Tab Insert.",
      },
      {
        question:
          "Tombol pintas (shortcut) untuk menutup program PowerPoint adalah...",
        options: [
          {
            label: "a",
            text: "Klik tombol X (Close) di pojok kanan atas",
            correct: true,
          },
          { label: "b", text: "Klik Slide Show" },
          { label: "c", text: "Klik Minimize" },
        ],
        explanation:
          "Tombol Close (X) atau File > Exit digunakan untuk mengakhiri program.",
      },
      {
        question: "Fitur 'Smart Guides' pada PowerPoint berfungsi untuk...",
        options: [
          { label: "a", text: "Menerjemahkan bahasa" },
          {
            label: "b",
            text: "Membantu meratakan (align) objek secara otomatis",
            correct: true,
          },
          { label: "c", text: "Membuat animasi otomatis" },
        ],
        explanation:
          "Smart Guides adalah garis bantu yang muncul otomatis saat menggeser objek untuk memastikan kerapian.",
      },
      {
        question:
          "Untuk melihat kerangka teks saja tanpa gambar pada hasil cetak, pilih format...",
        options: [
          { label: "a", text: "Outline", correct: true },
          { label: "b", text: "Full Page Slides" },
          { label: "c", text: "Frame Slides" },
        ],
        explanation: "Outline hanya menampilkan teks struktur presentasi.",
      },
    ],
  },
  {
    id: 13,
    title: "Penutup Sesi Awal",
    type: "content",
    icon: "13",
    subtitle: "Rangkuman",
    content: [
      "Anda telah mempelajari:",
      "1. Fungsi dan output PowerPoint.",
      "2. Navigasi antarmuka dan fungsi Tab Menu.",
      "3. Cara membuat, menyimpan, dan membuka presentasi.",
      "Selanjutnya, kita akan belajar cara **Menambah Slide dan Mengatur Layout**.",
    ],
  },
];