import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (2.12) ---
  {
    id: 1,
    title: "Lanjutan Modul Excel: Mencetak Dokumen",
    type: "content",
    icon: "1",
    subtitle: "Topik 2.12",
    content: [
      "Tahap terakhir dari pengolahan data adalah mencetak (Printing).",
      "Excel memiliki fitur cetak yang spesifik: bisa mencetak hanya sel yang dipilih, satu sheet penuh, atau seluruh file workbook sekaligus.",
      "Kita juga akan melakukan **Praktikum Akhir (Final Project)** yang menggabungkan semua ilmu dari Bab 2.",
    ],
  },

  // --- TOPIK 2.12: MENCETAK DOKUMEN ---
  {
    id: 2,
    title: "Opsi Pencetakan Dasar",
    type: "content",
    icon: "2",
    subtitle: "Active Sheet vs Workbook",
    content: [
      "Saat menu **Print (Ctrl + P)** dibuka, perhatikan bagian Settings:",
      "**Print Active Sheets:** Hanya mencetak sheet yang sedang Anda buka.",
      "**Print Entire Workbook:** Mencetak semua sheet yang ada di file Excel (Sheet1, Sheet2, dst).",
      "**Print Selection:** Hanya mencetak sel yang sedang Anda blok/sorot saat itu.",
    ],
  },
  {
    id: 3,
    title: "Mencetak Tabel & Area Tertentu",
    type: "content",
    icon: "3",
    subtitle: "Set Print Area",
    content: [
      "Agar tidak repot memilih setiap saat, kita bisa mengunci area cetak.",
      "**Caranya:** Blok tabel/area yang mau dicetak > Tab **Page Layout** > **Print Area** > **Set Print Area**.",
      "Excel akan mengabaikan data di luar area tersebut saat dicetak.",
      "**Print Titles:** Fitur untuk mengulang baris judul (Header Tabel) di setiap halaman cetak secara otomatis.",
    ],
  },
  {
    id: 4,
    title: "Mencetak ke File (PDF)",
    type: "content",
    icon: "4",
    subtitle: "Digital Printing",
    content: [
      "Jika tidak terhubung printer fisik, gunakan **Microsoft Print to PDF**.",
      "Hasilnya berupa file .pdf yang rapi dan tidak bisa diedit.",
      "Sangat berguna untuk mengirim laporan resmi via email agar format tidak berantakan saat dibuka di HP/Komputer lain.",
    ],
  },
  {
    id: 5,
    title: "Tugas 1: Simulasi Cetak PDF",
    type: "task",
    icon: "5",
    subtitle: "Praktik Printing - 5 Menit",
    content: ["Gunakan file latihan sebelumnya (yang ada tabel nilai/harga)."],
    checklist: [
      "Blok hanya area tabel saja.",
      "Pergi ke menu Print, pilih setting **Print Selection** (pastikan hanya tabel yang muncul di preview).",
      "Ubah orientasi menjadi **Landscape**.",
      "Pilih Printer: **Microsoft Print to PDF** (atau Save as PDF).",
      "Cetak dan simpan dengan nama 'Laporan_Siap_Cetak.pdf'.",
    ],
    tasks: ["Upload file PDF hasil cetak tersebut."],
    requireUpload: true,
  },

  // --- REVIEW MATERI PRINTING ---
  {
    id: 6,
    title: "Quiz Printing",
    type: "quiz",
    icon: "6",
    subtitle: "Cek Pemahaman",
    content: ["Sebelum masuk ke Final Project, jawab pertanyaan ini."],
    quiz: [
      {
        question:
          "Jika kita hanya ingin mencetak tabel yang sedang kita blok (sorot), opsi yang dipilih adalah...",
        options: [
          { label: "a", text: "Print Active Sheets" },
          { label: "b", text: "Print Selection", correct: true },
          { label: "c", text: "Print Entire Workbook" },
        ],
        explanation:
          "Print Selection membatasi pencetakan hanya pada area sel yang sedang dipilih (diblok) oleh pengguna.",
      },
      {
        question:
          "Fitur untuk menentukan area cetak secara permanen agar Excel selalu mencetak bagian itu saja disebut...",
        options: [
          { label: "a", text: "Set Print Area", correct: true },
          { label: "b", text: "Print Preview" },
          { label: "c", text: "Page Break" },
        ],
        explanation:
          "Set Print Area di tab Page Layout digunakan untuk menetapkan wilayah spesifik yang akan dicetak.",
      },
    ],
  },

  // --- PRAKTIKUM AKHIR BAB 2 (ADVANCED) ---
  {
    id: 7,
    title: "Final Project Bab 2",
    type: "content",
    icon: "7",
    subtitle: "Studi Kasus Kompleks",
    content: [
      "**Tantangan:** Anda adalah admin toko elektronik.",
      "**Misi:** Buat 'Laporan Penjualan Bulanan' yang menggabungkan:",
      "1. Input Data & Autofill.",
      "2. Fungsi Teks (Memecah Kode).",
      "3. Fungsi Aritmatika & Logika (Hitung Diskon).",
      "4. Fungsi Statistik (Rekapitulasi).",
      "5. Formatting Profesional.",
    ],
  },
  {
    id: 8,
    title: "Langkah 1: Struktur Tabel",
    type: "task",
    icon: "8",
    subtitle: "Setup Data - 10 Menit",
    content: [
      "Buat Sheet baru bernama 'Final Project'. Buat tabel dengan kolom berikut:",
    ],
    checklist: [
      "A: **No** (Gunakan Autofill 1-10).",
      "B: **Kode Transaksi** (Input manual: KUL-2023-A, TVS-2023-B, SET-2023-A, dst variatif).",
      "C: **Nama Barang** (Biarkan kosong dulu).",
      "D: **Tahun** (Biarkan kosong).",
      "E: **Harga Satuan** (Input angka jutaan, format Accounting Rp).",
      "F: **Qty** (Input angka 1-10).",
      "G: **Total Harga** (Biarkan kosong).",
      "H: **Status Diskon** (Biarkan kosong).",
    ],
    tasks: [
      "Buat kerangka tabel dan input data mentah (No, Kode, Harga, Qty).",
    ],
    requireUpload: false,
  },
  {
    id: 9,
    title: "Langkah 2: Pengolahan Rumus",
    type: "task",
    icon: "9",
    subtitle: "Logika & Teks - 15 Menit",
    content: [
      "Gunakan rumus untuk mengisi kolom kosong berdasarkan **Kode Transaksi (Contoh: KUL-2023-A)**.",
    ],
    checklist: [
      "**Nama Barang:** Gunakan **LEFT**. Jika 3 huruf awal 'KUL' maka 'Kulkas', 'TVS' maka 'Televisi', 'SET' maka 'Setrika'. (Gunakan IF bertingkat atau IF sederhana sesuai kemampuan). *Opsional: Boleh manual jika IF bertingkat terlalu sulit, tapi gunakan rumus untuk nilai plus.*",
      "**Tahun:** Gunakan **MID** untuk mengambil 4 digit tahun (mulai karakter ke-5).",
      "**Total Harga:** Rumus Perkalian (Harga * Qty).",
      "**Status Diskon:** Gunakan **IF**. Jika Qty > 3, maka tulis 'Dapat Diskon', jika tidak 'Normal'.",
    ],
    tasks: ["Lengkapi tabel dengan rumus-rumus tersebut."],
    requireUpload: false,
  },
  {
    id: 10,
    title: "Langkah 3: Statistik & Visual",
    type: "task",
    icon: "10",
    subtitle: "Finishing - 15 Menit",
    content: ["Lakukan rekapitulasi data dan percantik tampilan."],
    checklist: [
      "**Rekap:** Di bawah tabel, hitung **Total Penjualan** (SUM), **Penjualan Tertinggi** (MAX), **Terendah** (MIN), dan **Rata-rata** (AVERAGE).",
      "**Formatting:**",
      "- Judul Utama 'LAPORAN PENJUALAN' di Merge & Center, Font 14, Bold.",
      "- Header Tabel beri warna Background Biru, Font Putih.",
      "- Seluruh tabel diberi Border (All Borders) dan bingkai luar tebal (Thick Box Border).",
      "- Kolom Harga & Total wajib format **Accounting (Rp)**.",
    ],
    tasks: ["Pastikan tampilan rapi dan profesional."],
    requireUpload: false,
  },
  {
    id: 11,
    title: "Upload Final Project",
    type: "challenge",
    icon: "11",
    subtitle: "Pengumpulan Tugas",
    content: [
      "Simpan pekerjaan Anda dengan nama **Final_Bab2_NIM.xlsx**.",
      "Pastikan semua rumus berjalan (Coba ubah Qty, apakah Total dan Status berubah?).",
      "Pastikan layout siap cetak (Page Layout > Landscape, Scale to fit).",
    ],
    checklist: [
      "File Excel (.xlsx) mengandung rumus aktif.",
      "Terdapat Sheet 'Final Project'.",
      "Format Rupiah dan Tanggal sesuai (Indonesia).",
    ],
    tasks: ["Upload file Final Project Anda di sini."],
    requireUpload: true,
  },

  // --- PENUTUP ---
  {
    id: 12,
    title: "Selesai Bab 2",
    type: "content",
    icon: "12",
    subtitle: "Congratulations!",
    content: [
      "Luar biasa! Anda telah menyelesaikan Modul Microsoft Excel Dasar hingga Menengah.",
      "Anda kini menguasai:",
      "1. Manajemen Worksheet & Cell.",
      "2. Input & Formatting Data yang presisi.",
      "3. Penggunaan Rumus Vital (Logika, Teks, Statistik).",
      "4. Teknik Pencetakan Dokumen.",
      "Keahlian ini adalah standar kompetensi utama di dunia kerja administrasi.",
    ],
  },
];