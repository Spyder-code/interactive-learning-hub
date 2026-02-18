import type { Slide } from "./slides";

export const slidesP4: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (1.18 - 1.22) ---
  {
    id: 1,
    title: "Lanjutan Modul Word: Visual & Finalisasi",
    type: "content",
    icon: "1",
    subtitle: "Topik 1.18 - 1.22",
    content: [
      "Sesi ini berfokus pada elemen visual artistik dan tahap akhir penyelesaian dokumen.",
      "**Fokus Materi:**",
      "1. Elemen Grafis (WordArt, Shapes, SmartArt).",
      "2. Tata Letak Koran (Columns).",
      "3. Tahap Akhir (Print Preview & Print).",
    ],
  },

  // --- TOPIK 1.18: WORDART ---
  {
    id: 2,
    title: "WordArt",
    type: "content",
    icon: "2",
    subtitle: "Teks Artistik",
    content: [
      "**Fungsi:** Menambahkan efek artistik pada teks (bayangan, 3D, lengkungan) yang dapat dipindah-pindahkan seperti gambar.",
      "**Cara Membuat:**",
      "1. Tab Insert > Grup Text > Klik WordArt.",
      "2. Pilih gaya yang diinginkan.",
      "3. Ketik teks Anda di dalam kotak yang muncul.",
    ],
  },
  {
    id: 3,
    title: "Tugas 1: Judul Kreatif",
    type: "task",
    icon: "3",
    subtitle: "Praktik WordArt - 5 Menit",
    content: [
      "Buatlah dokumen baru.",
      "Buat tulisan 'PENGUMUMAN PENTING' menggunakan fitur **WordArt**.",
    ],
    checklist: [
      "Pilih gaya WordArt dengan efek bayangan atau refleksi.",
      "Ubah warna teks WordArt tersebut (Text Fill) menjadi Merah.",
      "Geser posisinya ke tengah halaman.",
    ],
    tasks: ["Upload dokumen hasil WordArt ini."],
    requireUpload: true,
  },

  // --- TOPIK 1.19: SHAPES & TEXT BOX ---
  {
    id: 4,
    title: "Shapes (Bentuk)",
    type: "content",
    icon: "4",
    subtitle: "Menggambar Bentuk Dasar",
    content: [
      "Word menyediakan bentuk dasar seperti kotak, panah, lingkaran, dan diagram alir.",
      "**Menyisipkan:** Tab Insert > Shapes > Pilih bentuk > Tarik kursor di halaman.",
      "**Menulis di Shape:** Cukup klik gambar Shape lalu langsung ketik teksnya.",
      "**Format:** Gunakan tab 'Format' (muncul saat Shape diklik) untuk ubah warna/garis.",
    ],
  },
  {
    id: 5,
    title: "Text Box",
    type: "content",
    icon: "5",
    subtitle: "Kotak Teks Bebas",
    content: [
      "Text Box adalah kotak berisi teks yang bisa diletakkan di mana saja (di atas gambar, di margin, dll).",
      "**Cara:** Tab Insert > Text Box > Draw Text Box.",
      "**Menghapus:** Klik pada garis tepinya (border) hingga garis putus-putus menjadi garis utuh, lalu tekan **Delete**.",
    ],
  },
  {
    id: 6,
    title: "Tugas 2: Diagram Alir Sederhana",
    type: "task",
    icon: "6",
    subtitle: "Praktik Shapes - 10 Menit",
    content: ["Buat diagram alir sederhana menggunakan **Shapes**."],
    checklist: [
      "Gunakan bentuk **Oval** untuk 'Mulai'.",
      "Gunakan bentuk **Persegi Panjang** untuk 'Proses'.",
      "Gunakan **Panah (Arrows)** untuk menghubungkan keduanya.",
      "Isi teks di dalam masing-masing shape.",
    ],
    tasks: [
      "Upload dokumen diagram ini (bisa digabung dengan tugas sebelumnya).",
    ],
    requireUpload: true,
  },

  // --- TOPIK 1.20: KOLOM (COLUMNS) ---
  {
    id: 7,
    title: "Kolom Koran (Columns)",
    type: "content",
    icon: "7",
    subtitle: "Membagi Teks Vertikal",
    content: [
      "Digunakan untuk membuat layout seperti koran atau buletin.",
      "**Cara:**",
      "1. Blok teks yang ingin dibagi (atau biarkan kursor untuk seluruh dokumen).",
      "2. Tab Page Layout > Columns.",
      "3. Pilih Two, Three, atau Left/Right.",
      "**More Columns:** Untuk pengaturan lebih detail seperti garis antar kolom (Line between).",
    ],
  },
  {
    id: 8,
    title: "Tugas 3: Layout Artikel",
    type: "task",
    icon: "8",
    subtitle: "Praktik Kolom - 10 Menit",
    content: [
      "Copy-paste sembarang artikel berita (2-3 paragraf) ke dokumen Word.",
    ],
    checklist: [
      "Judul artikel biarkan satu kolom (rata tengah).",
      "Isi artikel ubah menjadi **2 Kolom (Two Columns)**.",
      "Aktifkan garis pemisah antar kolom (**Line between**) melalui menu More Columns.",
    ],
    tasks: ["Upload dokumen artikel berkolom ini."],
    requireUpload: true,
  },

  // --- MID QUIZ ---
  {
    id: 9,
    title: "Quiz Pertengahan",
    type: "quiz",
    icon: "9",
    subtitle: "Review Topik 1.18 - 1.20",
    content: ["Cek pemahaman tentang objek visual dan layout."],
    quiz: [
      {
        question:
          "Fitur untuk membuat teks dengan efek artistik seperti 3D atau lengkungan disebut...",
        options: [
          { label: "a", text: "Drop Cap" },
          { label: "b", text: "WordArt", correct: true },
          { label: "c", text: "SmartArt" },
        ],
        explanation:
          "WordArt digunakan untuk menambahkan efek terhadap teks seperti bayangan, pantulan, dan cahaya.",
      },
      {
        question: "Bagaimana cara menulis teks di dalam sebuah Shape (Bentuk)?",
        options: [
          { label: "a", text: "Harus membuat Text Box di atasnya" },
          { label: "b", text: "Klik kanan > Add Caption" },
          {
            label: "c",
            text: "Klik shape tersebut dan langsung ketik",
            correct: true,
          },
        ],
        explanation:
          "Teks dapat disisipkan ke dalam Shapes dengan klik bagian dalam Shape dan mulai mengetik.",
      },
      {
        question:
          "Menu untuk membagi teks menjadi dua bagian vertikal (seperti koran) adalah...",
        options: [
          { label: "a", text: "Orientation" },
          { label: "b", text: "Columns", correct: true },
          { label: "c", text: "Margins" },
        ],
        explanation:
          "Columns digunakan untuk membuat dokumen seperti pada brosur, buletin, dan koran.",
      },
    ],
  },

  // --- TOPIK 1.21: SMARTART ---
  {
    id: 10,
    title: "SmartArt Grafis",
    type: "content",
    icon: "10",
    subtitle: "Diagram Visual Cerdas",
    content: [
      "Berbeda dengan Shapes manual, SmartArt adalah template diagram siap pakai untuk hierarki, proses, atau siklus.",
      "**Cara:** Tab Insert > SmartArt > Pilih kategori (misal: Hierarchy, Cycle).",
      "**Text Pane:** Kotak kecil di samping SmartArt untuk mengetik teks poin-poinnya.",
    ],
  },
  {
    id: 11,
    title: "Modifikasi SmartArt",
    type: "content",
    icon: "11",
    subtitle: "Menambah Kotak & Warna",
    content: [
      "**Menambah Kotak:** Klik kanan kotak yang ada > Add Shape (Before/After/Below).",
      "**Mengubah Warna:** Tab Design (SmartArt Tools) > Change Colors.",
      "**Layout:** Anda bisa mengubah jenis diagram tanpa mengetik ulang isinya melalui menu Layouts.",
    ],
  },
  {
    id: 12,
    title: "Tugas 4: Struktur Organisasi",
    type: "task",
    icon: "12",
    subtitle: "Praktik SmartArt - 10 Menit",
    content: [
      "Buatlah Struktur Organisasi Kelas sederhana menggunakan **SmartArt (Hierarchy)**.",
    ],
    checklist: [
      "Pilih layout **Organization Chart**.",
      "Isi level teratas: 'Ketua Kelas'.",
      "Level kedua: 'Sekretaris' dan 'Bendahara'.",
      "Ubah warna diagram menjadi **Colorful Range** (warna-warni).",
    ],
    tasks: ["Upload dokumen berisi SmartArt ini."],
    requireUpload: true,
  },

  // --- TOPIK 1.22: MENYELESAIKAN DOKUMEN ---
  {
    id: 13,
    title: "Print Preview & Cetak",
    type: "content",
    icon: "13",
    subtitle: "Tab File > Print",
    content: [
      "Sebelum mencetak ke kertas, WAJIB cek tampilan dulu.",
      "**Print Preview:** Tampil otomatis di sebelah kanan menu Print. Gunakan zoom di pojok kanan bawah untuk cek detail.",
      "**Settings:**",
      "- **Print All Pages:** Cetak semua.",
      "- **Print Current Page:** Cetak halaman yang sedang aktif saja.",
      "- **Print Custom Range:** Cetak halaman tertentu (misal: 5-10).",
    ],
  },
  {
    id: 14,
    title: "Tugas 5: Cetak ke PDF",
    type: "task",
    icon: "14",
    subtitle: "Simulasi Mencetak - 5 Menit",
    content: [
      "Gunakan dokumen Tugas 4 (SmartArt) tadi.",
      "Kita akan mensimulasikan pencetakan dengan menyimpannya sebagai PDF.",
    ],
    checklist: [
      "Klik File > Print.",
      "Pada pilihan **Printer**, ubah menjadi **Microsoft Print to PDF** (atau Save as PDF).",
      "Klik tombol **Print**.",
      "Simpan file dengan nama 'Final_SmartArt.pdf'.",
    ],
    tasks: ["Upload file PDF hasil 'cetak' tersebut."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 15,
    title: "Quiz Akhir Modul",
    type: "quiz",
    icon: "15",
    subtitle: "Evaluasi Bab 1.18 - 1.22 (15 Soal)",
    content: [
      "Jawablah pertanyaan berikut untuk menguji penguasaan materi visual dan finalisasi.",
    ],
    quiz: [
      {
        question: "Di tab manakah letak fitur WordArt?",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "Insert", correct: true },
          { label: "c", text: "Design" },
        ],
        explanation: "WordArt berada di dalam Tab Insert pada grup Text.",
      },
      {
        question:
          "Untuk menghapus Shape atau Text Box, tombol keyboard apa yang ditekan setelah mengklik garis tepinya?",
        options: [
          { label: "a", text: "Backspace" },
          { label: "b", text: "Enter" },
          { label: "c", text: "Delete", correct: true },
        ],
        explanation:
          "Tombol Delete digunakan untuk menghapus objek shape atau text box yang terpilih.",
      },
      {
        question:
          "Jika ingin membuat tulisan terbagi menjadi 3 kolom seperti koran, kita menggunakan menu...",
        options: [
          { label: "a", text: "Size" },
          { label: "b", text: "Orientation" },
          { label: "c", text: "Columns", correct: true },
        ],
        explanation:
          "Menu Columns pada Tab Page Layout berfungsi membagi teks menjadi beberapa kolom.",
      },
      {
        question: "SmartArt paling cocok digunakan untuk membuat...",
        options: [
          { label: "a", text: "Surat resmi" },
          {
            label: "b",
            text: "Diagram struktur organisasi atau siklus",
            correct: true,
          },
          { label: "c", text: "Mengedit foto pemandangan" },
        ],
        explanation:
          "SmartArt adalah diagram visual untuk menyampaikan informasi seperti hierarki, proses, atau siklus.",
      },
      {
        question:
          "Untuk melihat tampilan dokumen sebelum dicetak agar tidak salah, kita menggunakan fitur...",
        options: [
          { label: "a", text: "Print Preview", correct: true },
          { label: "b", text: "Save As" },
          { label: "c", text: "Web Layout" },
        ],
        explanation:
          "Print Preview ditampilkan secara otomatis di tab Print untuk melihat hasil sebelum dicetak.",
      },
      {
        question: "Opsi 'Print Current Page' berfungsi untuk...",
        options: [
          { label: "a", text: "Mencetak semua halaman" },
          {
            label: "b",
            text: "Mencetak halaman yang sedang aktif/dibuka saja",
            correct: true,
          },
          { label: "c", text: "Mencetak halaman ganjil saja" },
        ],
        explanation:
          "Current Page berarti hanya halaman dimana kursor sedang berada yang akan dicetak.",
      },
      {
        question:
          "Bagaimana cara menambahkan kotak baru dalam diagram SmartArt?",
        options: [
          { label: "a", text: "Klik Insert > Shape manual" },
          { label: "b", text: "Klik kanan > Add Shape", correct: true },
          { label: "c", text: "Tidak bisa ditambah" },
        ],
        explanation:
          "Dalam SmartArt Tools, Add Shape digunakan untuk menambah elemen baru ke dalam diagram.",
      },
      {
        question:
          "Jika ingin menyisipkan teks di dalam Shape, langkah yang paling cepat adalah...",
        options: [
          { label: "a", text: "Klik Shape lalu langsung ketik", correct: true },
          { label: "b", text: "Klik kanan > Edit Points" },
          { label: "c", text: "Insert > WordArt di atasnya" },
        ],
        explanation:
          "Teks dapat disisipkan ke dalam Shapes dengan klik bagian dalam Shape dan mulai mengetik.",
      },
      {
        question:
          "Di menu manakah kita bisa memberi garis pemisah (garis tegak) antar kolom?",
        options: [
          {
            label: "a",
            text: "Columns > More Columns > Line between",
            correct: true,
          },
          { label: "b", text: "Insert > Line" },
          { label: "c", text: "Page Borders" },
        ],
        explanation:
          "Opsi Line between terdapat di dalam kotak dialog More Columns.",
      },
      {
        question: "Fitur Text Box berada di dalam Tab...",
        options: [
          { label: "a", text: "Home" },
          { label: "b", text: "View" },
          { label: "c", text: "Insert", correct: true },
        ],
        explanation: "Text Box adalah bagian dari menu Insert pada grup Text.",
      },
      {
        question: "Apa fungsi dari 'Text Pane' pada SmartArt?",
        options: [
          { label: "a", text: "Mengubah warna diagram" },
          {
            label: "b",
            text: "Mengetik teks poin-poin diagram dengan mudah",
            correct: true,
          },
          { label: "c", text: "Menghapus diagram" },
        ],
        explanation:
          "Panel teks (Text Pane) memudahkan input teks ke dalam elemen-elemen SmartArt.",
      },
      {
        question:
          "Jika ingin mencetak halaman 5 sampai 10 saja, opsi mana yang diisi?",
        options: [
          { label: "a", text: "Print All Pages" },
          { label: "b", text: "Pages (isi: 5-10)", correct: true },
          { label: "c", text: "Copies" },
        ],
        explanation:
          "Kita dapat mencetak custom range dengan mengisi nomor halaman pada kotak Pages.",
      },
      {
        question:
          "Untuk mengubah warna keseluruhan diagram SmartArt secara instan, gunakan menu...",
        options: [
          { label: "a", text: "Shape Fill satu per satu" },
          { label: "b", text: "Change Colors", correct: true },
          { label: "c", text: "Font Color" },
        ],
        explanation:
          "Change Colors pada SmartArt Tools Design memungkinkan penggantian variasi warna diagram sekaligus.",
      },
      {
        question: "Apa fungsi dari 'Copies' pada menu Print?",
        options: [
          {
            label: "a",
            text: "Menentukan jumlah rangkap cetakan",
            correct: true,
          },
          { label: "b", text: "Menyalin teks" },
          { label: "c", text: "Memilih printer" },
        ],
        explanation:
          "Copies menentukan berapa kali dokumen akan dicetak rangkap.",
      },
      {
        question: "Jenis Shape 'Flowchart' biasanya digunakan untuk...",
        options: [
          { label: "a", text: "Menggambar bintang" },
          { label: "b", text: "Membuat diagram alir proses", correct: true },
          { label: "c", text: "Menulis surat" },
        ],
        explanation:
          "Kategori Flowchart pada Shapes berisi simbol-simbol untuk membuat diagram alir.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 16,
    title: "Selesai",
    type: "content",
    icon: "16",
    subtitle: "Modul Bab 1 Tuntas",
    content: [
      "Selamat! Anda telah menyelesaikan seluruh rangkaian materi Bab 1 (1.1 - 1.22).",
      "Anda kini memiliki kemampuan lengkap mulai dari mengetik dasar, formatting, layout, hingga menambahkan elemen visual dan mencetak dokumen.",
      "Siap untuk lanjut ke Bab 2!",
    ],
  },
];