import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (3.6 - 3.9) ---
  {
    id: 1,
    title: "Lanjutan Modul PowerPoint: Interaktivitas & Finalisasi",
    type: "content",
    icon: "1",
    subtitle: "Topik 3.6 - 3.9",
    content: [
      "Kita akan mengubah presentasi linier menjadi interaktif dan mempelajari cara menyajikannya secara profesional.",
      "**Fokus Materi:**",
      "1. **Hyperlink:** Membuat tombol navigasi antar slide atau ke website.",
      "2. **Slide Show:** Teknik menjalankan presentasi.",
      "3. **Saving & Printing:** Format penyimpanan khusus dan teknik mencetak Handout.",
    ],
  },

  // --- TOPIK 3.6: HYPERLINK ---
  {
    id: 2,
    title: "Mengenal Hyperlink",
    type: "content",
    icon: "2",
    subtitle: "Membuat Tombol Pintas",
    content: [
      "Hyperlink menjadikan teks atau gambar bisa diklik untuk loncat ke halaman lain.",
      "**Jenis Link:**",
      "- **Existing File/Web Page:** Membuka website atau file lain di komputer.",
      "- **Place in This Document:** Loncat ke slide tertentu dalam file yang sama (Misal: Dari Daftar Isi ke Bab 1).",
      "**Cara:** Klik Kanan Objek > Hyperlink (atau Insert > Hyperlink).",
    ],
  },
  {
    id: 3,
    title: "Action Buttons",
    type: "content",
    icon: "3",
    subtitle: "Tombol Navigasi Siap Pakai",
    content: [
      "PowerPoint menyediakan tombol navigasi standar (Home, Next, Previous, End).",
      "**Cara:** Insert > Shapes > Bagian paling bawah (Action Buttons).",
      "Saat digambar di slide, kotak dialog 'Action Settings' akan otomatis muncul untuk mengatur tujuannya.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Menu Interaktif",
    type: "task",
    icon: "4",
    subtitle: "Praktik Hyperlink - 15 Menit",
    content: ["Buat sistem navigasi sederhana."],
    checklist: [
      "Slide 1: Buat Daftar Isi dengan 3 poin (Materi 1, Materi 2, Penutup).",
      "Slide 2, 3, 4: Beri judul sesuai poin di atas.",
      "Di Slide 1: Beri **Hyperlink** pada teks 'Materi 1' agar saat diklik loncat ke Slide 2.",
      "Di Slide 2, 3, 4: Tambahkan **Action Button 'Home'** di pojok kanan bawah yang nge-link kembali ke Slide 1.",
    ],
    tasks: ["Upload file PPTX yang tombol-tombolnya berfungsi."],
    requireUpload: true,
  },

  // --- TOPIK 3.7 & 3.8: SLIDE SHOW & SAVING ---
  {
    id: 5,
    title: "Menjalankan Presentasi",
    type: "content",
    icon: "5",
    subtitle: "Tab Slide Show",
    content: [
      "**From Beginning (F5):** Mulai dari slide pertama.",
      "**From Current Slide (Shift+F5):** Mulai dari slide yang sedang diedit.",
      "**Presenter View:** Mode khusus jika terhubung proyektor (Laptop menampilkan catatan, Proyektor menampilkan slide).",
      "**Keluar:** Tekan tombol **Esc**.",
    ],
  },
  {
    id: 6,
    title: "Format Penyimpanan Khusus",
    type: "content",
    icon: "6",
    subtitle: "Save As Type",
    content: [
      "Selain .pptx, kenali format ini:",
      "1. **PowerPoint Show (.ppsx):** File langsung jalan sebagai slide show saat diklik (tidak masuk mode edit). Cocok untuk dikirim ke klien.",
      "2. **PDF:** Dokumen statis, cocok untuk dibagikan agar font/gambar tidak berantakan.",
      "3. **PowerPoint 97-2003 (.ppt):** Kompatibel dengan versi lama.",
    ],
  },

  // --- TOPIK 3.9: MENCETAK (PRINTING) ---
  {
    id: 7,
    title: "Mencetak Presentasi",
    type: "content",
    icon: "7",
    subtitle: "Layout Cetak",
    content: [
      "Jangan boros kertas! Pilih layout yang tepat di menu Print:",
      "**Full Page Slides:** 1 slide per lembar (Boros).",
      "**Handouts:** Mencetak 3, 4, 6, atau 9 slide per lembar. (Pilih '3 Slides' untuk ada garis catatan di sampingnya).",
      "**Notes Pages:** Mencetak slide beserta catatan pembicara di bawahnya.",
      "**Outline:** Hanya mencetak teks poin-poin saja.",
    ],
  },
  {
    id: 8,
    title: "Tugas 2: Handout PDF",
    type: "task",
    icon: "8",
    subtitle: "Praktik Printing - 5 Menit",
    content: ["Simulasikan mencetak materi untuk audiens."],
    checklist: [
      "Buka menu Print.",
      "Ubah setting Layout menjadi **Handouts (3 Slides)**.",
      "Pastikan orientasi kertas **Portrait**.",
      "Pilih printer **Microsoft Print to PDF**.",
      "Simpan dengan nama 'Handout_Materi.pdf'.",
    ],
    tasks: ["Upload file PDF Handout tersebut."],
    requireUpload: true,
  },

  // --- REVIEW QUIZ ---
  {
    id: 9,
    title: "Quiz Interaktif",
    type: "quiz",
    icon: "9",
    subtitle: "Cek Pemahaman",
    content: ["Mari review fitur navigasi dan cetak."],
    quiz: [
      {
        question:
          "Fitur untuk membuat teks 'Klik Disini' yang jika diklik akan membuka website Google disebut...",
        options: [
          { label: "a", text: "Animation" },
          { label: "b", text: "Hyperlink", correct: true },
          { label: "c", text: "Transition" },
        ],
        explanation:
          "Hyperlink menghubungkan objek slide ke destinasi lain seperti website atau file.",
      },
      {
        question:
          "Format file yang membuat presentasi langsung berjalan (Play) saat dibuka adalah...",
        options: [
          { label: "a", text: ".pptx" },
          { label: "b", text: ".pdf" },
          { label: "c", text: ".ppsx (PowerPoint Show)", correct: true },
        ],
        explanation:
          "PowerPoint Show (.ppsx) didesain untuk langsung masuk mode Slide Show tanpa membuka editor.",
      },
      {
        question:
          "Layout cetak yang menampilkan 3 slide per halaman beserta garis untuk catatan tulis tangan adalah...",
        options: [
          { label: "a", text: "Full Page Slides" },
          { label: "b", text: "Handouts (3 Slides)", correct: true },
          { label: "c", text: "Outline View" },
        ],
        explanation:
          "Handout 3 slides adalah format standar untuk membagikan materi ke audiens agar bisa dicatat.",
      },
    ],
  },

  // --- PRAKTIKUM AKHIR (ADVANCED FINAL PROJECT) ---
  {
    id: 10,
    title: "Final Project: Kios Informasi Interaktif",
    type: "challenge",
    icon: "10",
    subtitle: "Studi Kasus Advanced",
    content: [
      "**Skenario:** Anda diminta membuat tampilan layar sentuh (Kiosk) untuk profil sebuah Universitas/Perusahaan.",
      "**Syarat Utama:** Pengguna harus bisa navigasi sendiri tanpa keyboard (hanya klik mouse).",
    ],
  },
  {
    id: 11,
    title: "Langkah 1: Struktur & Desain",
    type: "task",
    icon: "11",
    subtitle: "Setup Slide",
    content: [
      "Buat minimal 5 Slide:",
      "1. **Cover:** Judul & Tombol 'Masuk'.",
      "2. **Menu Utama:** Tombol ke 'Sejarah', 'Visi Misi', 'Kontak'.",
      "3. **Slide Sejarah:** Isi konten + Tombol 'Kembali'.",
      "4. **Slide Visi Misi:** Isi konten + Tombol 'Kembali'.",
      "5. **Slide Kontak:** Isi konten + Tombol 'Kembali' & Tombol 'Selesai'.",
    ],
    checklist: [
      "Gunakan **Slide Master** (View > Slide Master) untuk menempatkan Logo Universitas di pojok kanan atas SEMUA slide secara otomatis.",
      "Gunakan Tema (Design) yang profesional.",
    ],
    tasks: ["Siapkan kerangka slide ini."],
    requireUpload: false,
  },
  {
    id: 12,
    title: "Langkah 2: Interaktivitas (Hyperlink)",
    type: "task",
    icon: "12",
    subtitle: "Membuat Navigasi",
    content: ["Hubungkan semua tombol."],
    checklist: [
      "Tombol 'Masuk' di Cover -> Link ke Slide 2 (Menu).",
      "Tombol-tombol di Menu -> Link ke slide tujuan masing-masing.",
      "Tombol 'Kembali' di setiap slide konten -> Link ke Slide 2 (Menu).",
      "Tombol 'Selesai' -> Link ke **End Show**.",
      "Tambahkan **Transition** 'Push' atau 'Cover' pada semua slide.",
    ],
    tasks: ["Pastikan tidak ada 'Link Mati'."],
    requireUpload: false,
  },
  {
    id: 13,
    title: "Langkah 3: Finishing & Upload",
    type: "task",
    icon: "13",
    subtitle: "Pengumpulan Tugas",
    content: ["Sempurnakan dengan animasi."],
    checklist: [
      "Beri Animasi **Entrance** (misal: Zoom/Fade) pada teks isi.",
      "Beri Animasi pada Tombol Menu agar muncul satu per satu (**Start: After Previous**).",
      "Simpan file dalam format **PowerPoint Show (.ppsx)** agar dosen bisa langsung memainkannya.",
    ],
    tasks: ["Upload file **Final_Project_NIM.ppsx** di sini."],
    requireUpload: true,
    note: "File .ppsx membuktikan bahwa navigasi Anda berjalan lancar tanpa mode edit.",
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 14,
    title: "Quiz Akhir Bab 3 (PowerPoint)",
    type: "quiz",
    icon: "14",
    subtitle: "Evaluasi Kompetensi (15 Soal)",
    content: ["Uji seluruh pengetahuan Anda tentang Microsoft PowerPoint."],
    quiz: [
      {
        question: "Tombol F5 pada keyboard berfungsi untuk...",
        options: [
          { label: "a", text: "Menyimpan file" },
          {
            label: "b",
            text: "Menjalankan presentasi dari awal",
            correct: true,
          },
          { label: "c", text: "Menutup program" },
        ],
        explanation:
          "F5 adalah shortcut standar untuk 'Start Slide Show From Beginning'.",
      },
      {
        question: "Apa fungsi dari 'Action Button' berlambang Rumah?",
        options: [
          { label: "a", text: "Menutup presentasi" },
          {
            label: "b",
            text: "Kembali ke slide pertama/menu utama",
            correct: true,
          },
          { label: "c", text: "Membuka website" },
        ],
        explanation:
          "Tombol Home biasanya di-setting secara default untuk Hyperlink to First Slide.",
      },
      {
        question:
          "Jika ingin mencetak slide agar hemat kertas (6 slide per lembar), pilih layout...",
        options: [
          { label: "a", text: "Notes Pages" },
          { label: "b", text: "Handouts", correct: true },
          { label: "c", text: "Full Page Slides" },
        ],
        explanation:
          "Handouts memungkinkan pencetakan multiple slides (hingga 9) dalam satu lembar kertas.",
      },
      {
        question:
          "Format file yang TIDAK bisa diedit lagi kontennya (cocok untuk sebar luas) adalah...",
        options: [
          { label: "a", text: ".pptx" },
          { label: "b", text: ".pdf", correct: true },
          { label: "c", text: ".potx" },
        ],
        explanation:
          "PDF (Portable Document Format) mengunci tampilan dokumen agar tidak berubah.",
      },
      {
        question: "Menu 'Hyperlink' terdapat di Tab...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "Design" },
        ],
        explanation: "Perintah Hyperlink berada di grup Links pada Tab Insert.",
      },
      {
        question:
          "Untuk keluar dari mode Slide Show di tengah presentasi, tekan tombol...",
        options: [
          { label: "a", text: "Enter" },
          { label: "b", text: "Esc (Escape)", correct: true },
          { label: "c", text: "Ctrl + S" },
        ],
        explanation:
          "Esc digunakan untuk membatalkan atau keluar dari mode layar penuh (Slide Show).",
      },
      {
        question: "Opsi Hyperlink 'Place in This Document' digunakan untuk...",
        options: [
          { label: "a", text: "Membuka file Excel" },
          {
            label: "b",
            text: "Menghubungkan ke slide lain dalam file yang sama",
            correct: true,
          },
          { label: "c", text: "Membuka website Google" },
        ],
        explanation:
          "Opsi ini membuat link internal antar slide dalam satu file presentasi.",
      },
      {
        question: "Perbedaan 'Save' dan 'Save As' adalah...",
        options: [
          {
            label: "a",
            text: "Save As membuat file duplikat/baru, Save menimpa file lama",
            correct: true,
          },
          { label: "b", text: "Save As untuk file PDF saja" },
          { label: "c", text: "Tidak ada bedanya" },
        ],
        explanation:
          "Save As memungkinkan penyimpanan dengan nama baru, lokasi baru, atau format baru.",
      },
      {
        question:
          "Fitur untuk melihat urutan slide dalam bentuk thumbnail kecil-kecil adalah...",
        options: [
          { label: "a", text: "Normal View" },
          { label: "b", text: "Slide Sorter", correct: true },
          { label: "c", text: "Reading View" },
        ],
        explanation:
          "Slide Sorter View menampilkan seluruh slide dalam bentuk kotak-kotak kecil untuk memudahkan pengurutan.",
      },
      {
        question:
          "Jika ingin menyisipkan suara tepuk tangan saat transisi, gunakan fitur...",
        options: [
          { label: "a", text: "Animation Sound" },
          { label: "b", text: "Transition Sound", correct: true },
          { label: "c", text: "Insert Audio" },
        ],
        explanation:
          "Pada Tab Transitions grup Timing, terdapat opsi Sound untuk efek suara perpindahan slide.",
      },
      {
        question: "Shortcut Shift + F5 berfungsi untuk...",
        options: [
          { label: "a", text: "Mulai presentasi dari awal" },
          {
            label: "b",
            text: "Mulai presentasi dari slide yang sedang aktif",
            correct: true,
          },
          { label: "c", text: "Menutup presentasi" },
        ],
        explanation:
          "Shift+F5 memulai slideshow dari halaman yang sedang Anda lihat (Current Slide).",
      },
      {
        question:
          "Untuk mencetak slide tanpa warna (Hitam Putih) agar hemat tinta, ubah setting Color menjadi...",
        options: [
          {
            label: "a",
            text: "Pure Black and White / Grayscale",
            correct: true,
          },
          { label: "b", text: "Blue only" },
          { label: "c", text: "Dark Mode" },
        ],
        explanation:
          "Grayscale atau Pure Black and White adalah mode cetak hemat tinta warna.",
      },
      {
        question: "Hyperlink ke 'E-mail Address' berfungsi untuk...",
        options: [
          { label: "a", text: "Membuka website email" },
          {
            label: "b",
            text: "Membuka aplikasi mail untuk mengirim pesan ke alamat tujuan",
            correct: true,
          },
          { label: "c", text: "Mendownload email" },
        ],
        explanation:
          "Link email (mailto:) akan memicu aplikasi email default komputer untuk membuat pesan baru.",
      },
      {
        question:
          "Format file .ppsx (PowerPoint Show) sangat berguna ketika...",
        options: [
          { label: "a", text: "Kita masih ingin mengedit slide" },
          {
            label: "b",
            text: "Kita ingin presentasi langsung jalan tanpa membuka editor",
            correct: true,
          },
          { label: "c", text: "Kita ingin mencetak" },
        ],
        explanation:
          "PPSX adalah format 'Show Only' yang langsung mengeksekusi presentasi.",
      },
      {
        question:
          "Jika tombol Action Button 'Next' diletakkan di Slide Master, maka...",
        options: [
          { label: "a", text: "Tombol hanya muncul di slide 1" },
          {
            label: "b",
            text: "Tombol akan muncul di semua slide secara otomatis",
            correct: true,
          },
          { label: "c", text: "Tombol tidak bisa diklik" },
        ],
        explanation:
          "Objek yang diletakkan di Slide Master akan tereplikasi ke seluruh slide yang menggunakan master tersebut.",
      },
    ],
  },

  // --- PENUTUP MODUL ---
  {
    id: 15,
    title: "Selesai Modul PowerPoint",
    type: "content",
    icon: "15",
    subtitle: "Mission Complete!",
    content: [
      "Selamat! Anda telah menyelesaikan seluruh rangkaian materi Bab 3 PowerPoint.",
      "Anda kini mampu membuat presentasi yang:",
      "1. Terstruktur (Layout & Master).",
      "2. Menarik (Visual, Transisi, Animasi).",
      "3. Interaktif (Hyperlink & Menu).",
      "4. Siap Distribusi (PDF/PPSX & Cetak).",
    ],
  },
];