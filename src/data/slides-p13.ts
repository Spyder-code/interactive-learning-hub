import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (3.4 - 3.5) ---
  {
    id: 1,
    title: "Lanjutan Modul PowerPoint: Visual & Gerak",
    type: "content",
    icon: "1",
    subtitle: "Topik 3.4 - 3.5",
    content: [
      "Presentasi yang baik tidak hanya berisi teks. Kita perlu menambahkan elemen visual dan efek gerak agar tidak membosankan.",
      "**Fokus Materi:**",
      "1. **Menyisipkan Gambar:** Dari file komputer, online, atau drag & drop.",
      "2. **Transisi:** Efek perpindahan antar halaman slide.",
      "3. **Animasi:** Efek gerak pada objek (teks/gambar) di dalam slide.",
    ],
  },

  // --- TOPIK 3.4: MENYISIPKAN GAMBAR ---
  {
    id: 2,
    title: "Menyisipkan Gambar (Pictures)",
    type: "content",
    icon: "2",
    subtitle: "Mempercantik Slide",
    content: [
      "**Cara 1: Gambar dari Komputer**",
      "Klik Tab **Insert** > Pilih **Pictures**. Cari file gambar di folder laptop Anda (C: atau D:), lalu klik Insert.",
      "**Cara 2: Gambar Online**",
      "Klik Tab **Insert** > Pilih **Online Pictures**. Ketik kata kunci di kolom pencarian (misal: 'Bunga'), pilih gambar, lalu Insert.",
    ],
  },
  {
    id: 3,
    title: "Metode Drag & Drop",
    type: "content",
    icon: "3",
    subtitle: "Cara Cepat",
    content: [
      "Anda bisa memasukkan gambar tanpa melalui menu Insert.",
      "**Langkah:**",
      "1. Buka folder gambar dan PowerPoint secara berdampingan (Gunakan tombol **Windows + Panah Kanan/Kiri** untuk membagi layar).",
      "2. Klik dan tahan gambar dari folder, lalu **seret (drag)** masuk ke dalam slide.",
      "3. Lepaskan (drop) gambar.",
    ],
    note: "Perhatikan: Cara ini mungkin tidak mengompres ukuran file seefisien menu Insert, sehingga file PPT bisa menjadi lebih besar.",
  },
  {
    id: 4,
    title: "Tugas 1: Insert Gambar",
    type: "task",
    icon: "4",
    subtitle: "Praktik Visual - 5 Menit",
    content: ["Buka file presentasi latihan Anda sebelumnya."],
    checklist: [
      "Buat slide baru (Title and Content).",
      "Pada bagian judul, ketik 'Galeri Foto'.",
      "Sisipkan 1 gambar menggunakan menu **Insert > Pictures**.",
      "Sisipkan 1 gambar lagi menggunakan metode **Drag & Drop**.",
    ],
    tasks: ["Upload file PowerPoint yang sudah berisi gambar tersebut."],
    requireUpload: true,
  },

  // --- TOPIK 3.5.1: TRANSISI (TRANSITIONS) ---
  {
    id: 5,
    title: "Menambahkan Transisi",
    type: "content",
    icon: "5",
    subtitle: "Efek Pindah Slide",
    content: [
      "Transisi adalah animasi yang terjadi saat perpindahan dari satu slide ke slide berikutnya.",
      "**Caranya:**",
      "1. Pilih slide.",
      "2. Klik Tab **Transitions**.",
      "3. Pilih efek yang diinginkan (misal: Fade, Push, Wipe). Klik panah kecil ke bawah untuk melihat lebih banyak pilihan.",
      "**Indikator:** Slide yang memiliki transisi akan memiliki tanda **Bintang** kecil di panel sebelah kiri.",
    ],
  },
  {
    id: 6,
    title: "Pengaturan Transisi (Timing)",
    type: "content",
    icon: "6",
    subtitle: "Sound, Duration, Advance Slide",
    content: [
      "Di Tab Transitions grup Timing, Anda bisa mengatur:",
      "**Sound:** Menambahkan efek suara saat pindah slide (misal: Tepuk tangan).",
      "**Duration:** Mengatur kecepatan transisi (semakin besar angka, semakin lambat).",
      "**Apply to All:** Menerapkan efek yang sama ke SEMUA slide.",
      "**Advance Slide:**",
      "- *On Mouse Click:* Pindah jika diklik (Manual).",
      "- *After:* Pindah otomatis setelah sekian detik.",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Transisi Slide",
    type: "task",
    icon: "7",
    subtitle: "Praktik Gerak Slide - 5 Menit",
    content: ["Terapkan transisi pada presentasi Anda."],
    checklist: [
      "Pilih Slide 1.",
      "Berikan transisi tipe **Curtains** (atau efek lain yang dramatis).",
      "Ubah **Duration** menjadi 3.00 detik.",
      "Aktifkan suara **Camera** atau **Chime** pada transisi tersebut.",
    ],
    tasks: ["Tidak perlu upload, lanjut ke materi animasi."],
    requireUpload: false,
  },

  // --- TOPIK 3.5.2: ANIMASI (ANIMATIONS) ---
  {
    id: 8,
    title: "Menambahkan Animasi",
    type: "content",
    icon: "8",
    subtitle: "Efek Gerak Objek",
    content: [
      "Berbeda dengan transisi, Animasi diterapkan pada **Objek** (Teks, Gambar, Shape).",
      "**Caranya:**",
      "1. Klik objek yang mau digerakkan.",
      "2. Klik Tab **Animations**.",
      "3. Pilih jenis animasi (Hijau=Masuk, Kuning=Penekanan, Merah=Keluar).",
      "**Add Animation:** Gunakan tombol ini jika ingin menambahkan LEBIH DARI SATU animasi pada satu objek (misal: Masuk lalu Berputar).",
    ],
  },
  {
    id: 9,
    title: "Animation Pane & Timing",
    type: "content",
    icon: "9",
    subtitle: "Kontrol Penuh",
    content: [
      "**Animation Pane:** Tombol untuk membuka panel kanan yang berisi daftar urutan animasi.",
      "**Start Options:**",
      "- *On Click:* Animasi jalan kalau mouse diklik.",
      "- *With Previous:* Jalan bareng dengan animasi sebelumnya.",
      "- *After Previous:* Jalan otomatis setelah animasi sebelumnya selesai.",
      "**Delay:** Menunda waktu mulai animasi.",
    ],
  },
  {
    id: 10,
    title: "Tugas 3: Animasi Teks & Gambar",
    type: "task",
    icon: "10",
    subtitle: "Praktik Animasi - 10 Menit",
    content: ["Lanjutkan file 'Galeri Foto' tadi."],
    checklist: [
      "Klik Judul 'Galeri Foto', beri animasi **Fly In**.",
      "Klik Gambar pertama, beri animasi **Zoom**.",
      "Klik Gambar kedua, beri animasi **Spin**.",
      "Atur Gambar kedua agar **Start: After Previous** (otomatis berputar setelah gambar pertama muncul).",
    ],
    tasks: [
      "Upload file PowerPoint final yang sudah berisi Gambar, Transisi, dan Animasi.",
    ],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 11,
    title: "Quiz Akhir Topik 3.4 - 3.5",
    type: "quiz",
    icon: "11",
    subtitle: "Evaluasi Visual & Gerak (10 Soal)",
    content: [
      "Uji pemahaman Anda tentang gambar dan efek gerak di PowerPoint.",
    ],
    quiz: [
      {
        question:
          "Menu untuk memasukkan gambar yang tersimpan di dalam folder komputer adalah...",
        options: [
          { label: "a", text: "Insert > Online Pictures" },
          { label: "b", text: "Insert > Pictures", correct: true },
          { label: "c", text: "Insert > Screenshot" },
        ],
        explanation:
          "Menu 'Pictures' digunakan untuk menyisipkan file gambar dari penyimpanan lokal.",
      },
      {
        question:
          "Efek pergerakan saat perpindahan dari satu slide ke slide berikutnya disebut...",
        options: [
          { label: "a", text: "Animation" },
          { label: "b", text: "Transition", correct: true },
          { label: "c", text: "Slide Show" },
        ],
        explanation:
          "Transisi adalah efek visual yang terjadi saat Anda berpindah dari satu slide ke slide lain.",
      },
      {
        question:
          "Jika ingin membuat slide berpindah secara otomatis tanpa diklik, pengaturan yang diubah adalah...",
        options: [
          {
            label: "a",
            text: "Uncheck 'On Mouse Click', Check 'After'",
            correct: true,
          },
          { label: "b", text: "Check 'On Mouse Click', Uncheck 'After'" },
          { label: "c", text: "Ubah Duration menjadi 0" },
        ],
        explanation:
          "Menu 'After' pada grup Timing digunakan untuk mengatur durasi slide berjalan otomatis.",
      },
      {
        question:
          "Tombol 'Apply to All' pada tab Transitions berfungsi untuk...",
        options: [
          { label: "a", text: "Menghapus semua transisi" },
          {
            label: "b",
            text: "Menerapkan jenis transisi yang sama ke seluruh slide",
            correct: true,
          },
          { label: "c", text: "Menyimpan presentasi" },
        ],
        explanation:
          "Apply to All akan menyalin efek transisi slide aktif ke semua slide dalam presentasi.",
      },
      {
        question: "Apa fungsi dari tombol 'Add Animation'?",
        options: [
          { label: "a", text: "Menambahkan slide baru" },
          {
            label: "b",
            text: "Menambahkan lebih dari satu efek animasi pada satu objek",
            correct: true,
          },
          { label: "c", text: "Mengganti animasi yang sudah ada" },
        ],
        explanation:
          "Jika Anda memilih animasi langsung dari galeri utama, animasi lama akan terganti. Gunakan Add Animation untuk menumpuk animasi.",
      },
      {
        question: "Opsi 'Start: With Previous' pada animasi berarti...",
        options: [
          { label: "a", text: "Animasi berjalan setelah diklik" },
          {
            label: "b",
            text: "Animasi berjalan bersamaan dengan animasi sebelumnya",
            correct: true,
          },
          {
            label: "c",
            text: "Animasi berjalan setelah animasi sebelumnya selesai",
          },
        ],
        explanation:
          "With Previous membuat animasi berjalan serentak dengan kejadian sebelumnya.",
      },
      {
        question:
          "Untuk membagi layar agar bisa melakukan Drag & Drop gambar dengan mudah, tombol shortcut-nya adalah...",
        options: [
          { label: "a", text: "Ctrl + C" },
          { label: "b", text: "Alt + Tab" },
          {
            label: "c",
            text: "Tombol Windows + Panah Kanan/Kiri",
            correct: true,
          },
        ],
        explanation:
          "Tombol Windows + Panah Arah digunakan untuk menata jendela aplikasi (Snap Assist).",
      },
      {
        question:
          "Panel di sebelah kanan yang digunakan untuk mengatur urutan dan durasi animasi disebut...",
        options: [
          { label: "a", text: "Selection Pane" },
          { label: "b", text: "Animation Pane", correct: true },
          { label: "c", text: "Transition Pane" },
        ],
        explanation:
          "Animation Pane menampilkan daftar detail semua efek animasi di slide aktif.",
      },
      {
        question:
          "Tanda bintang kecil di sebelah thumbnail slide menandakan...",
        options: [
          { label: "a", text: "Slide tersebut slide favorit" },
          {
            label: "b",
            text: "Slide tersebut memiliki efek transisi atau animasi",
            correct: true,
          },
          { label: "c", text: "Slide tersebut error" },
        ],
        explanation:
          "Ikon bintang menunjukkan bahwa slide memiliki elemen gerak (transisi/animasi).",
      },
      {
        question:
          "Jika Anda ingin melihat pratinjau (preview) efek transisi atau animasi yang baru dibuat, tekan tombol...",
        options: [
          { label: "a", text: "Preview (di pojok kiri ribbon)", correct: true },
          { label: "b", text: "Save" },
          { label: "c", text: "Close" },
        ],
        explanation:
          "Tombol Preview di Tab Transitions atau Animations digunakan untuk memutar ulang efek di slide aktif.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 12,
    title: "Selesai Sesi Ini",
    type: "content",
    icon: "12",
    subtitle: "Rangkuman",
    content: [
      "Anda telah mempelajari cara membuat presentasi lebih hidup dengan:",
      "1. Gambar (Insert & Drag-Drop).",
      "2. Transisi Slide.",
      "3. Animasi Objek.",
      "Selanjutnya kita akan membahas tentang **Hyperlink dan Menjalankan Presentasi (Slide Show)**.",
    ],
  },
];