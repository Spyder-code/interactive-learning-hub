import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (2.8 - 2.9) ---
  {
    id: 1,
    title: "Lanjutan Modul Excel: Perataan & Rumus",
    type: "content",
    icon: "1",
    subtitle: "Topik 2.8 - 2.9",
    content: [
      "Setelah menguasai input data, saatnya membuat tampilan rapi dan mulai melakukan perhitungan.",
      "**Fokus Materi:**",
      "1. **Alignment:** Mengatur posisi teks, menggabungkan sel, dan melipat teks panjang.",
      "2. **Fungsi Aritmatika:** Perhitungan dasar (+, -, *, /).",
      "3. **Fungsi Statistik:** Rumus otomatis (SUM, AVERAGE, MAX, MIN).",
      "4. **Fungsi Logika:** Pengambilan keputusan otomatis (IF).",
    ],
  },

  // --- TOPIK 2.8: ALIGNMENT (PERATAAN) ---
  {
    id: 2,
    title: "Pengaturan Perataan (Alignment)",
    type: "content",
    icon: "2",
    subtitle: "Horizontal & Vertikal",
    content: [
      "Excel memiliki dua jenis perataan teks:",
      "**Horizontal:** Rata Kiri (Left), Tengah (Center), Kanan (Right), Justify.",
      "**Vertikal:** Atas (Top), Tengah (Middle), Bawah (Bottom).",
      "**Orientation:** Memutar teks menjadi miring atau vertikal (berguna untuk judul kolom yang sempit).",
    ],
  },
  {
    id: 3,
    title: "Wrap Text (Melipat Teks)",
    type: "content",
    icon: "3",
    subtitle: "Menangani Teks Panjang",
    content: [
      "**Masalah:** Teks panjang seringkali menimpa sel di sebelahnya atau terpotong.",
      "**Solusi:** Gunakan fitur **Wrap Text**.",
      "Fitur ini memaksa teks turun ke baris baru di dalam sel yang sama, sehingga tinggi baris akan bertambah otomatis.",
    ],
  },
  {
    id: 4,
    title: "Merge & Center (Menggabung Sel)",
    type: "content",
    icon: "4",
    subtitle: "Membuat Judul Tabel",
    content: [
      "Digunakan untuk menggabungkan beberapa sel menjadi satu sel besar.",
      "**Peringatan:**",
      "- Hanya data di sel kiri-atas yang akan disimpan.",
      "- Data di sel lain yang digabung akan **dihapus**.",
      "- Jangan gunakan Merge pada bagian data yang akan diurutkan (Sort).",
    ],
  },
  {
    id: 5,
    title: "Tugas 1: Merapikan Tabel",
    type: "task",
    icon: "5",
    subtitle: "Praktik Alignment - 10 Menit",
    content: ["Buat tabel baru dengan spesifikasi berikut:"],
    checklist: [
      "Sel A1: Ketik 'LAPORAN KEUANGAN TAHUNAN'.",
      "Gabungkan sel (Merge & Center) dari A1 sampai E1.",
      "Sel A2: Ketik 'Keterangan Transaksi Yang Sangat Panjang Sekali'.",
      "Aktifkan **Wrap Text** pada sel A2 agar teks tidak memanjang ke samping, tapi ke bawah.",
      "Atur perataan judul (A1) menjadi **Middle Align** (Tengah Vertikal).",
    ],
    tasks: ["Upload file Excel hasil formatting ini."],
    requireUpload: true,
  },

  // --- TOPIK 2.9.1: FUNGSI ARITMATIKA ---
  {
    id: 6,
    title: "Operator Aritmatika Dasar",
    type: "content",
    icon: "6",
    subtitle: "Matematika Excel",
    content: [
      "Setiap rumus Excel WAJIB diawali dengan tanda sama dengan (**=**).",
      "**Simbol Operasi:**",
      "- **+** (Tambah): `=A1+A2`",
      "- **-** (Kurang): `=A1-A2`",
      "- ***** (Kali): `=A1*A2` (Bintang, bukan X)",
      "- **/** (Bagi): `=A1/A2` (Garis miring)",
      "- **^** (Pangkat): `=A1^2`",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Kalkulator Sederhana",
    type: "task",
    icon: "7",
    subtitle: "Praktik Rumus Dasar - 5 Menit",
    content: ["Buat sheet baru bernama 'Kalkulator'."],
    checklist: [
      "Sel A1: Input angka 100.",
      "Sel B1: Input angka 20.",
      "Sel C1: Hitung perkalian A1 dan B1 (`=A1*B1`).",
      "Sel C2: Hitung pembagian A1 dan B1.",
      "Sel C3: Hitung A1 dipangkat 2.",
    ],
    tasks: ["Upload file Excel kalkulator ini."],
    requireUpload: true,
  },

  // --- TOPIK 2.9.2: FUNGSI STATISTIK (SUM, AVERAGE, DLL) ---
  {
    id: 8,
    title: "Fungsi Statistik Wajib Tahu",
    type: "content",
    icon: "8",
    subtitle: "Rumus Cepat",
    content: [
      "**SUM:** Menjumlahkan total (`=SUM(A1:A10)`).",
      "**AVERAGE:** Menghitung rata-rata (`=AVERAGE(A1:A10)`).",
      "**MAX:** Mencari nilai tertinggi (`=MAX(A1:A10)`).",
      "**MIN:** Mencari nilai terendah (`=MIN(A1:A10)`).",
      "**COUNT:** Menghitung jumlah sel yang berisi angka (`=COUNT(A1:A10)`).",
    ],
  },
  {
    id: 9,
    title: "Tugas 3: Rekap Nilai Siswa",
    type: "task",
    icon: "9",
    subtitle: "Studi Kasus Sekolah - 15 Menit",
    content: [
      "Buat tabel Daftar Nilai 5 Siswa (Nama, Nilai MTK, Nilai Bindo).",
    ],
    checklist: [
      "Input data nilai bebas (0-100).",
      "Di bawah kolom nilai, hitung **Jumlah Total** (SUM).",
      "Hitung **Rata-Rata Kelas** (AVERAGE).",
      "Cari siapa yang dapat **Nilai Tertinggi** (MAX) dan **Terendah** (MIN).",
      "Hitung **Jumlah Siswa** menggunakan rumus COUNT.",
    ],
    tasks: ["Upload file rekap nilai ini."],
    requireUpload: true,
  },

  // --- TOPIK 2.9.3: FUNGSI LOGIKA (IF) ---
  {
    id: 10,
    title: "Fungsi Logika (IF)",
    type: "content",
    icon: "10",
    subtitle: "Jika... Maka...",
    content: [
      "Digunakan untuk menghasilkan nilai berdasarkan kondisi tertentu.",
      "**Rumus:** `=IF(Syarat, Nilai_Jika_Benar, Nilai_Jika_Salah)`",
      '**Contoh:** `=IF(B2>70, "Lulus", "Remidi")`',
      "Artinya: Jika nilai di B2 lebih besar dari 70, maka tulis 'Lulus'. Jika tidak, tulis 'Remidi'.",
    ],
  },
  {
    id: 11,
    title: "Tips Penulisan IF",
    type: "content",
    icon: "11",
    subtitle: "Aturan Penting",
    content: [
      '1. **Teks harus diapit tanda kutip dua ("").** Contoh: "Lulus".',
      "2. **Angka tidak perlu kutip.** Contoh: 100.",
      "3. **Pemisah Argumen:** Gunakan titik koma (; ) atau koma (,) tergantung setting komputer Anda. (Cek tooltip saat mengetik rumus).",
    ],
  },
  {
    id: 12,
    title: "Tugas 4: Status Kelulusan",
    type: "task",
    icon: "12",
    subtitle: "Praktik Logika - 10 Menit",
    content: ["Lanjutkan tabel Nilai Siswa tadi."],
    checklist: [
      "Tambahkan kolom baru 'Status'.",
      "Gunakan rumus **IF**: Jika Rata-rata siswa >= 75, maka 'Lulus', jika tidak 'Gagal'.",
      "Gunakan **Autofill** untuk meng-copy rumus ke semua siswa.",
    ],
    tasks: ["Upload file update dengan status kelulusan."],
    requireUpload: true,
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 13,
    title: "Quiz Akhir Topik 2.8 - 2.9",
    type: "quiz",
    icon: "13",
    subtitle: "Evaluasi Formatting & Rumus (15 Soal)",
    content: ["Uji pemahaman Anda tentang Perataan Teks dan Rumus Excel."],
    quiz: [
      {
        question:
          "Fitur untuk melipat teks panjang agar muat dalam satu sel dengan menambah tinggi baris adalah...",
        options: [
          { label: "a", text: "Merge Cells" },
          { label: "b", text: "Wrap Text", correct: true },
          { label: "c", text: "Shrink to Fit" },
        ],
        explanation:
          "Wrap Text memaksa teks turun ke bawah jika melebihi lebar kolom.",
      },
      {
        question:
          "Perataan teks secara vertikal yang membuat teks berada di tengah-tengah tinggi sel adalah...",
        options: [
          { label: "a", text: "Center Align" },
          { label: "b", text: "Middle Align", correct: true },
          { label: "c", text: "Top Align" },
        ],
        explanation:
          "Middle Align mengatur posisi teks di tengah secara vertikal (atas-bawah).",
      },
      {
        question: "Apa risiko utama menggunakan fitur 'Merge & Center'?",
        options: [
          { label: "a", text: "Teks menjadi miring" },
          {
            label: "b",
            text: "Data di sel selain sel kiri-atas akan dihapus",
            correct: true,
          },
          { label: "c", text: "Warna sel berubah" },
        ],
        explanation:
          "Merge Cells hanya mempertahankan isi sel kiri atas dan menghapus isi sel lainnya yang digabung.",
      },
      {
        question: "Simbol operator untuk perkalian di Excel adalah...",
        options: [
          { label: "a", text: "x" },
          { label: "b", text: "*", correct: true },
          { label: "c", text: ":" },
        ],
        explanation:
          "Excel menggunakan tanda bintang (*) sebagai operator perkalian.",
      },
      {
        question: "Simbol operator untuk pemangkatan di Excel adalah...",
        options: [
          { label: "a", text: "^", correct: true },
          { label: "b", text: "#" },
          { label: "c", text: "&" },
        ],
        explanation: "Tanda caret (^) digunakan untuk operasi pangkat.",
      },
      {
        question:
          "Fungsi untuk mencari nilai rata-rata dari sekumpulan data adalah...",
        options: [
          { label: "a", text: "MEDIAN" },
          { label: "b", text: "AVERAGE", correct: true },
          { label: "c", text: "MEAN" },
        ],
        explanation:
          "AVERAGE adalah rumus standar Excel untuk menghitung rata-rata aritmatika.",
      },
      {
        question:
          "Fungsi untuk mencari nilai tertinggi dalam suatu range adalah...",
        options: [
          { label: "a", text: "HIGH" },
          { label: "b", text: "MAX", correct: true },
          { label: "c", text: "UPPER" },
        ],
        explanation: "MAX digunakan untuk menemukan nilai maksimum (terbesar).",
      },
      {
        question: "Apa perbedaan antara COUNT dan SUM?",
        options: [
          {
            label: "a",
            text: "SUM menjumlahkan nilai, COUNT menghitung banyak data",
            correct: true,
          },
          {
            label: "b",
            text: "COUNT menjumlahkan nilai, SUM menghitung banyak data",
          },
          { label: "c", text: "Sama saja" },
        ],
        explanation:
          "SUM menjumlahkan angka (misal 10+20=30), COUNT menghitung jumlah item (misal ada 2 item).",
      },
      {
        question:
          "Penulisan rumus IF yang benar untuk: 'Jika A1 lebih dari 50, maka Lulus, jika tidak Gagal' adalah...",
        options: [
          { label: "a", text: '=IF(A1>50; "Lulus"; "Gagal")', correct: true },
          { label: "b", text: "=IF(A1>50; Lulus; Gagal)" },
          { label: "c", text: '=IF("Lulus"; "Gagal"; A1>50)' },
        ],
        explanation:
          "Teks dalam rumus IF harus diapit tanda kutip, dan urutannya adalah Syarat, Nilai Benar, Nilai Salah.",
      },
      {
        question:
          'Jika sel B5 berisi angka 100, rumus =IF(B5>80; "A"; "B") akan menghasilkan...',
        options: [
          { label: "a", text: "A", correct: true },
          { label: "b", text: "B" },
          { label: "c", text: "Error" },
        ],
        explanation:
          "Karena 100 lebih besar dari 80 (Benar), maka hasilnya adalah nilai pertama ('A').",
      },
      {
        question:
          "Tombol Orientation (ab->) di grup Alignment berfungsi untuk...",
        options: [
          { label: "a", text: "Mengganti warna teks" },
          { label: "b", text: "Memutar kemiringan teks", correct: true },
          { label: "c", text: "Memperbesar huruf" },
        ],
        explanation:
          "Orientation digunakan untuk mengubah sudut kemiringan teks (diagonal atau vertikal).",
      },
      {
        question: "Fungsi MIN berguna untuk...",
        options: [
          { label: "a", text: "Mencari nilai rata-rata" },
          { label: "b", text: "Mencari nilai terendah/minimum", correct: true },
          { label: "c", text: "Mengurangi angka" },
        ],
        explanation: "MIN mengembalikan nilai terkecil dari sekumpulan angka.",
      },
      {
        question:
          "Setiap penulisan rumus di Excel harus diawali dengan tanda...",
        options: [
          { label: "a", text: "@" },
          { label: "b", text: "=", correct: true },
          { label: "c", text: "#" },
        ],
        explanation:
          "Tanda sama dengan (=) memberitahu Excel bahwa karakter selanjutnya adalah rumus.",
      },
      {
        question:
          "Jika ingin menghitung jumlah siswa yang mengikuti ujian (berdasarkan data angka di kolom nilai), gunakan...",
        options: [
          { label: "a", text: "TOTAL" },
          { label: "b", text: "COUNT", correct: true },
          { label: "c", text: "NUMBER" },
        ],
        explanation: "COUNT menghitung sel yang berisi angka.",
      },
      {
        question:
          "Pesan error ##### pada hasil perhitungan biasanya berarti...",
        options: [
          { label: "a", text: "Rumus salah total" },
          {
            label: "b",
            text: "Kolom kurang lebar untuk menampilkan angka",
            correct: true,
          },
          { label: "c", text: "Data hilang" },
        ],
        explanation:
          "Tanda pagar muncul jika lebar kolom tidak cukup untuk menampilkan hasil angka/tanggal.",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 14,
    title: "Selesai Bab 2 (Part 2)",
    type: "content",
    icon: "14",
    subtitle: "Pencapaian",
    content: [
      "Selamat! Anda kini bisa:",
      "1. Merapikan tabel dengan Alignment dan Merge.",
      "2. Melakukan perhitungan matematika dasar.",
      "3. Menggunakan fungsi statistik dan logika untuk analisis data sederhana.",
      "Materi selanjutnya akan membahas fungsi teks (LEFT, MID, RIGHT) dan Border lebih dalam.",
    ],
  },
];