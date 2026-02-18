import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (2.10 - 2.11) ---
  {
    id: 1,
    title: "Lanjutan Modul Excel: Fungsi Teks & Visual",
    type: "content",
    icon: "1",
    subtitle: "Topik 2.10 - 2.11",
    content: [
      "Sesi ini akan mengajarkan cara memanipulasi data teks dan mempercantik tabel agar layak cetak.",
      "**Fokus Materi:**",
      "1. **Fungsi Teks:** Mengambil sebagian kata (LEFT, MID, RIGHT).",
      "2. **Border & Color:** Memberikan garis bingkai dan warna pada tabel.",
    ],
  },

  // --- TOPIK 2.10: FUNGSI TEKS (LEFT, MID, RIGHT) ---
  {
    id: 2,
    title: "Fungsi LEFT",
    type: "content",
    icon: "2",
    subtitle: "Mengambil Karakter dari Kiri",
    content: [
      "Digunakan untuk mengambil sejumlah karakter pertama (paling kiri) dari suatu sel.",
      "**Rumus:** `=LEFT(Teks, Jumlah_Karakter)`",
      "**Contoh:** Jika A1 berisi 'MICROSOFT'",
      "`=LEFT(A1, 5)` hasilnya adalah **MICRO** (5 huruf dari kiri).",
    ],
  },
  {
    id: 3,
    title: "Fungsi RIGHT",
    type: "content",
    icon: "3",
    subtitle: "Mengambil Karakter dari Kanan",
    content: [
      "Digunakan untuk mengambil sejumlah karakter terakhir (paling kanan) dari suatu sel.",
      "**Rumus:** `=RIGHT(Teks, Jumlah_Karakter)`",
      "**Contoh:** Jika A1 berisi 'MICROSOFT'",
      "`=RIGHT(A1, 4)` hasilnya adalah **SOFT** (4 huruf dari kanan).",
    ],
  },
  {
    id: 4,
    title: "Fungsi MID",
    type: "content",
    icon: "4",
    subtitle: "Mengambil Karakter di Tengah",
    content: [
      "Digunakan untuk mengambil karakter yang berada di tengah-tengah teks.",
      "**Rumus:** `=MID(Teks, Mulai_Karakter_Ke, Jumlah_Karakter)`",
      "**Contoh:** Jika A1 berisi 'INDONESIA'",
      "`=MID(A1, 4, 3)` hasilnya adalah **ONE**.",
      "(Dimulai dari huruf ke-4 'O', ambil sebanyak 3 huruf).",
    ],
  },
  {
    id: 5,
    title: "Tugas 1: Memecah Kode Barang",
    type: "task",
    icon: "5",
    subtitle: "Praktik Fungsi Teks - 10 Menit",
    content: [
      "Buat tabel baru dengan data Kode Barang: **'JKT-2023-A'** di sel A1.",
    ],
    checklist: [
      "Sel B1 (Lokasi): Gunakan **LEFT** untuk mengambil 'JKT'.",
      "Sel C1 (Tahun): Gunakan **MID** untuk mengambil '2023'.",
      "Sel D1 (Kelas): Gunakan **RIGHT** untuk mengambil 'A'.",
    ],
    tasks: ["Upload file Excel hasil pemecahan kode ini."],
    requireUpload: true,
    note: "Perhatikan posisi karakter untuk rumus MID. Huruf pertama '2' pada '2023' ada di urutan ke-5 (J-K-T-Strip-2).",
  },

  // --- REVIEW MATERI (MID QUIZ) ---
  {
    id: 6,
    title: "Quiz Fungsi Teks",
    type: "quiz",
    icon: "6",
    subtitle: "Cek Logika Rumus",
    content: ["Uji pemahaman Anda tentang pengambilan karakter."],
    quiz: [
      {
        question:
          "Jika sel A1 berisi 'SURABAYA', rumus =LEFT(A1, 4) akan menghasilkan...",
        options: [
          { label: "a", text: "BAYA" },
          { label: "b", text: "SURA", correct: true },
          { label: "c", text: "SURAB" },
        ],
        explanation:
          "LEFT mengambil karakter dari kiri. 4 karakter pertama dari SURABAYA adalah SURA.",
      },
      {
        question:
          "Rumus untuk mengambil kata 'EXCEL' dari teks 'BELAJAR EXCEL PEMULA' adalah...",
        options: [
          { label: "a", text: "=LEFT()" },
          { label: "b", text: "=RIGHT()" },
          { label: "c", text: "=MID()", correct: true },
        ],
        explanation:
          "Karena kata 'EXCEL' berada di tengah kalimat, fungsi yang tepat adalah MID.",
      },
    ],
  },

  // --- TOPIK 2.11: PENGGUNAAN BORDER & COLOR ---
  {
    id: 7,
    title: "Border (Bingkai Tabel)",
    type: "content",
    icon: "7",
    subtitle: "Membuat Garis Tabel",
    content: [
      "Secara default, garis gridlines abu-abu di Excel tidak akan tercetak. Kita harus membuat Border.",
      "**Cara Cepat:** Blok tabel > Tab Home > Klik ikon **Border** (kotak-kotak) > Pilih **All Borders**.",
      "**Jenis Border:**",
      "- **All Borders:** Garis di semua sisi sel.",
      "- **Thick Box Border:** Garis tebal hanya di bagian luar.",
      "- **No Border:** Menghapus garis.",
    ],
  },
  {
    id: 8,
    title: "Warna Sel (Fill & Font)",
    type: "content",
    icon: "8",
    subtitle: "Mempercantik Tampilan",
    content: [
      "Gunakan warna untuk membedakan Judul Tabel (Header) dan Isi Data.",
      "**Fill Color (Ikon Ember Cat):** Mewarnai latar belakang sel.",
      "**Font Color (Ikon Huruf A):** Mewarnai teks.",
      "**Tips:** Gunakan warna kontras. Jika background gelap, gunakan font putih/terang.",
    ],
  },
  {
    id: 9,
    title: "Format Cells Lanjutan",
    type: "content",
    icon: "9",
    subtitle: "Kustomisasi Garis",
    content: [
      "Untuk garis ganda atau putus-putus:",
      "1. Blok sel.",
      "2. Tekan **Ctrl + 1** (Format Cells).",
      "3. Masuk Tab **Border**.",
      "4. Pilih **Style** (jenis garis) dan **Color** (warna garis).",
      "5. Klik **Presets** (Outline / Inside) untuk menerapkannya.",
    ],
  },
  {
    id: 10,
    title: "Tugas 2: Desain Tabel",
    type: "task",
    icon: "10",
    subtitle: "Praktik Border & Warna - 10 Menit",
    content: [
      "Buat tabel Daftar Nilai (Nama, Nilai A, Nilai B, Rata-rata) dengan 5 data siswa.",
    ],
    checklist: [
      "Judul Tabel (Header): Beri **Fill Color Biru Tua** dan **Font Putih**.",
      "Isi Data: Beri **All Borders** (garis tipis biasa).",
      "Keliling Luar Tabel: Beri **Thick Box Border** (garis tebal).",
      "Gunakan **Merge & Center** untuk judul utama di atas tabel.",
    ],
    tasks: ["Upload file Excel yang sudah didesain rapi ini."],
    requireUpload: true,
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 11,
    title: "Quiz Akhir Topik 2.10 - 2.11",
    type: "quiz",
    icon: "11",
    subtitle: "Evaluasi Fungsi Teks & Visual (15 Soal)",
    content: [
      "Uji kemampuan Anda dalam memanipulasi teks dan memformat tabel.",
    ],
    quiz: [
      {
        question:
          "Fungsi LEFT digunakan untuk mengambil karakter dari sebelah...",
        options: [
          { label: "a", text: "Kanan" },
          { label: "b", text: "Kiri", correct: true },
          { label: "c", text: "Tengah" },
        ],
        explanation:
          "LEFT mengambil karakter dimulai dari posisi paling kiri teks.",
      },
      {
        question:
          "Jika sel A1 berisi 'INDONESIA', rumus =RIGHT(A1, 3) hasilnya adalah...",
        options: [
          { label: "a", text: "IND" },
          { label: "b", text: "SIA", correct: true },
          { label: "c", text: "NES" },
        ],
        explanation: "RIGHT mengambil 3 karakter dari kanan: S-I-A.",
      },
      {
        question: "Argumen 'Start_num' pada fungsi MID berfungsi untuk...",
        options: [
          { label: "a", text: "Menentukan jumlah karakter yang diambil" },
          {
            label: "b",
            text: "Menentukan posisi awal pengambilan karakter",
            correct: true,
          },
          { label: "c", text: "Menentukan teks sumber" },
        ],
        explanation:
          "Start_num menentukan dari urutan karakter keberapa pengambilan teks dimulai.",
      },
      {
        question:
          "Jika ingin mengambil 2 digit tahun '22' dari teks '2022', fungsi yang paling tepat jika '2022' ada di sel A1 adalah...",
        options: [
          { label: "a", text: "=LEFT(A1, 2)" },
          { label: "b", text: "=RIGHT(A1, 2)", correct: true },
          { label: "c", text: "=MID(A1, 2, 2)" },
        ],
        explanation:
          "Angka '22' berada di posisi paling kanan, jadi gunakan RIGHT.",
      },
      {
        question: 'Rumus =MID("KOMPUTER", 4, 3) akan menghasilkan teks...',
        options: [
          { label: "a", text: "PUT", correct: true },
          { label: "b", text: "MPU" },
          { label: "c", text: "UTE" },
        ],
        explanation:
          "Mulai karakter ke-4 adalah 'P', diambil 3 karakter menjadi P-U-T.",
      },
      {
        question:
          "Garis bantu tipis abu-abu di layar Excel yang tidak ikut tercetak disebut...",
        options: [
          { label: "a", text: "Borders" },
          { label: "b", text: "Gridlines", correct: true },
          { label: "c", text: "Outline" },
        ],
        explanation:
          "Gridlines adalah garis bantu visual di layar, sedangkan Border adalah garis cetak.",
      },
      {
        question:
          "Untuk memberi garis bingkai pada seluruh bagian sel yang diblok, pilih opsi Border...",
        options: [
          { label: "a", text: "Outside Borders" },
          { label: "b", text: "All Borders", correct: true },
          { label: "c", text: "Bottom Border" },
        ],
        explanation:
          "All Borders akan memberikan garis pada setiap sisi sel yang dipilih.",
      },
      {
        question: "Ikon 'Ember Cat' (Fill Color) digunakan untuk...",
        options: [
          { label: "a", text: "Mewarnai huruf" },
          { label: "b", text: "Mewarnai latar belakang sel", correct: true },
          { label: "c", text: "Mewarnai garis border" },
        ],
        explanation: "Fill Color mengubah warna background dari sel.",
      },
      {
        question:
          "Untuk mengubah warna garis border menjadi merah, kita harus mengakses menu...",
        options: [
          { label: "a", text: "Font Color" },
          { label: "b", text: "Line Color di menu Border", correct: true },
          { label: "c", text: "Fill Color" },
        ],
        explanation:
          "Pengaturan warna garis ada di opsi Line Color pada menu Border.",
      },
      {
        question:
          "Tab di kotak dialog Format Cells yang digunakan untuk mengatur bingkai adalah...",
        options: [
          { label: "a", text: "Number" },
          { label: "b", text: "Border", correct: true },
          { label: "c", text: "Alignment" },
        ],
        explanation:
          "Tab Border khusus digunakan untuk pengaturan garis tepi sel.",
      },
      {
        question: "Apa fungsi dari 'Thick Box Border'?",
        options: [
          { label: "a", text: "Memberi garis tipis di semua sel" },
          {
            label: "b",
            text: "Memberi garis tebal di sekeliling luar range yang dipilih",
            correct: true,
          },
          { label: "c", text: "Menghapus border" },
        ],
        explanation:
          "Thick Box Border hanya memberi garis tebal pada perimeter luar area yang diblok.",
      },
      {
        question:
          "Jika ingin teks berwarna putih agar terbaca jelas di background gelap, gunakan fitur...",
        options: [
          { label: "a", text: "Fill Color" },
          { label: "b", text: "Font Color", correct: true },
          { label: "c", text: "Bold" },
        ],
        explanation: "Font Color mengubah warna karakter teks.",
      },
      {
        question:
          "Untuk menghapus semua garis border pada sel yang dipilih, gunakan opsi...",
        options: [
          { label: "a", text: "Erase Border" },
          { label: "b", text: "No Border", correct: true },
          { label: "c", text: "White Border" },
        ],
        explanation:
          "No Border akan menghilangkan semua format garis yang ada.",
      },
      {
        question: "Salah satu fungsi utama Border pada tabel adalah...",
        options: [
          { label: "a", text: "Agar bisa dihitung rumusnya" },
          {
            label: "b",
            text: "Menonjolkan bagian tertentu dan memudahkan pembacaan data",
            correct: true,
          },
          { label: "c", text: "Menghemat tinta printer" },
        ],
        explanation:
          "Border membantu memisahkan data secara visual agar lebih mudah dibaca dan dipahami.",
      },
      {
        question: "Perbedaan utama fungsi MID dengan LEFT/RIGHT adalah...",
        options: [
          { label: "a", text: "MID hanya untuk angka" },
          {
            label: "b",
            text: "MID memerlukan argumen posisi awal (Start Num)",
            correct: true,
          },
          { label: "c", text: "MID tidak bisa mengambil spasi" },
        ],
        explanation:
          "MID membutuhkan parameter tambahan yaitu posisi start karakter, sedangkan LEFT/RIGHT otomatis dari ujung.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 12,
    title: "Selesai Bab 2 (Part 3)",
    type: "content",
    icon: "12",
    subtitle: "Pencapaian",
    content: [
      "Selamat! Anda kini bisa membedah data teks menggunakan rumus dan membuat tabel yang rapi dan profesional dengan Border.",
      "Materi selanjutnya akan membahas tentang mencetak dokumen (Printing).",
    ],
  },
];