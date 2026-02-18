import { Slide } from "./slides";

export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (2.6 - 2.7) ---
  {
    id: 1,
    title: "Lanjutan Modul Excel: Otomatisasi & Format",
    type: "content",
    icon: "1",
    subtitle: "Topik 2.6 - 2.7",
    content: [
      "Selamat datang di sesi fitur cerdas Excel! Kita akan mempelajari cara mempercepat pekerjaan dan merapikan tampilan angka.",
      "**Fokus Materi:**",
      "1. **Autofill:** Membuat nomor urut 1-1000 dalam sekejap.",
      "2. **Format Number:** Mengubah angka biasa menjadi Rupiah (Rp), Tanggal, atau Waktu.",
    ],
  },

  // --- TOPIK 2.6: MENGGUNAKAN AUTOFILL ---
  {
    id: 2,
    title: "Mengenal Autofill",
    type: "content",
    icon: "2",
    subtitle: "Fitur Pengisi Otomatis",
    content: [
      "**Autofill** adalah fasilitas untuk mengisi data secara otomatis, baik itu menyalin data yang sama, membuat urutan angka, atau melanjutkan pola.",
      "**Fill Handle:** Kotak kecil di pojok kanan bawah sel aktif. Saat kursor diarahkan ke sini, bentuknya berubah menjadi tanda plus hitam (+).",
      "**Fungsi:** Menarik Fill Handle ke bawah/samping akan menjalankan Autofill.",
    ],
  },
  {
    id: 3,
    title: "Cara Kerja Autofill",
    type: "content",
    icon: "3",
    subtitle: "Pola & Urutan",
    content: [
      "1. **Menyalin Data:** Jika hanya 1 sel berisi angka/teks yang ditarik, Excel akan menyalin data tersebut (Contoh: 1, 1, 1).",
      "2. **Membuat Urutan (Seri):** Ketik dua angka pertama (misal 1 dan 2), blok keduanya, lalu tarik Fill Handle. Excel akan melanjutkan polanya (3, 4, 5...).",
      "3. **Pola Kelipatan:** Jika diketik 10 dan 20, Excel akan melanjutkan 30, 40, 50.",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Praktik Autofill",
    type: "task",
    icon: "4",
    subtitle: "Efisiensi Kerja - 5 Menit",
    content: ["Buat sheet baru dan praktikkan:"],
    checklist: [
      "Kolom A: Buat Nomor Urut 1 sampai 20 menggunakan Autofill.",
      "Kolom B: Buat Kelipatan 5 (5, 10, 15...) sampai 100.",
      "Kolom C: Ketik 'Senin', lalu tarik ke bawah. Apakah muncul Selasa, Rabu, dst?",
      "Kolom D: Ketik 'Januari', lalu tarik ke bawah.",
    ],
    tasks: ["Upload file Excel hasil eksperimen Autofill ini."],
    requireUpload: true,
    note: "Perhatikan bahwa Excel cukup pintar untuk mengenali nama hari dan bulan secara otomatis.",
  },

  // --- TOPIK 2.7: FORMAT NUMBER (ANGKA) ---
  {
    id: 5,
    title: "Format Number",
    type: "content",
    icon: "5",
    subtitle: "Mengatur Tampilan Angka",
    content: [
      "Secara default, angka di Excel berformat **General** (Umum). Kita bisa mengubahnya menjadi mata uang, tanggal, atau persen tanpa mengubah nilai aslinya.",
      "**Cara Mengakses:**",
      "1. Tab **Home** > Grup **Number** > Pilih dari dropdown.",
      "2. Tekan **Ctrl + 1** (Shortcut Format Cells).",
    ],
  },
  {
    id: 6,
    title: "Format Mata Uang (Accounting)",
    type: "content",
    icon: "6",
    subtitle: "Menampilkan Rupiah (Rp)",
    content: [
      "Jangan mengetik 'Rp' secara manual! Gunakan format **Accounting** atau **Currency**.",
      "**Langkah:**",
      "1. Blok sel berisi angka.",
      "2. Klik ikon **$** (Accounting Number Format) di Tab Home.",
      "3. Pilih **Rp (Indonesian)** atau More Accounting Formats jika tidak muncul.",
      "**Accounting vs Currency:** Format Accounting meratakan simbol Rp di kiri dan angka di kanan (lebih rapi).",
    ],
  },
  {
    id: 7,
    title: "Tugas 2: Daftar Harga",
    type: "task",
    icon: "7",
    subtitle: "Praktik Rupiah - 10 Menit",
    content: ["Buat tabel Daftar Harga Barang."],
    checklist: [
      "Input data angka polos: 5000, 15000, 1250000.",
      "Ubah formatnya menjadi **Accounting (Rp)**.",
      "Pastikan ada pemisah ribuan (titik) dan 2 desimal di belakang koma (opsional, bisa dikurangi dengan tombol Decrease Decimal).",
    ],
    tasks: ["Upload file Excel tabel harga ini."],
    requireUpload: true,
  },

  // --- TOPIK 2.7.3 & 2.7.4: DATE & TIME ---
  {
    id: 8,
    title: "Format Tanggal (Date)",
    type: "content",
    icon: "8",
    subtitle: "Short vs Long Date",
    content: [
      "Jika Anda mengetik '1/1/2023', Excel otomatis mengenalinya sebagai tanggal.",
      "**Pilihan Format:**",
      "- **Short Date:** 01/01/2023.",
      "- **Long Date:** Minggu, 1 Januari 2023.",
      "Gunakan **Ctrl + 1** > Tab **Number** > Kategori **Date** untuk memilih format lokal (Indonesia).",
    ],
  },
  {
    id: 9,
    title: "Format Waktu (Time)",
    type: "content",
    icon: "9",
    subtitle: "Jam & Menit",
    content: [
      "Gunakan titik dua (:) untuk memisahkan jam dan menit (Contoh: 13:30).",
      "**Format:**",
      "- 13:30 (24 Jam).",
      "- 1:30 PM (12 Jam AM/PM).",
      "Excel menyimpan waktu sebagai pecahan desimal dari satu hari (24 jam).",
    ],
  },
  {
    id: 10,
    title: "Tugas 3: Jadwal Kegiatan",
    type: "task",
    icon: "10",
    subtitle: "Praktik Tanggal & Waktu - 10 Menit",
    content: ["Buat tabel Jadwal Kegiatan Harian."],
    checklist: [
      "Kolom A (Tanggal): Input tanggal hari ini. Ubah format menjadi **Long Date** (agar muncul nama hari).",
      "Kolom B (Jam): Input jam kegiatan (misal 08:00).",
      "Kolom C (Kegiatan): Teks bebas.",
      "Gunakan **Autofill** pada tanggal untuk membuat jadwal satu minggu ke depan.",
    ],
    tasks: ["Upload file jadwal kegiatan ini."],
    requireUpload: true,
  },

  // --- REVIEW MATERI (MID QUIZ) ---
  {
    id: 11,
    title: "Quiz Review Format",
    type: "quiz",
    icon: "11",
    subtitle: "Cek Pemahaman",
    content: ["Mari tes pemahaman tentang Autofill dan Format Angka."],
    quiz: [
      {
        question:
          "Untuk membuat urutan angka 1, 2, 3 secara otomatis, kita harus...",
        options: [
          { label: "a", text: "Mengetik angka 1 lalu tarik Fill Handle" },
          {
            label: "b",
            text: "Mengetik 1 dan 2, blok keduanya, lalu tarik Fill Handle",
            correct: true,
          },
          { label: "c", text: "Mengetik rumus =1+2" },
        ],
        explanation:
          "Jika hanya satu angka yang ditarik, Excel akan menyalinnya (Copy). Dua angka dibutuhkan untuk membentuk pola urutan.",
      },
      {
        question:
          "Shortcut keyboard untuk membuka kotak dialog Format Cells adalah...",
        options: [
          { label: "a", text: "Ctrl + C" },
          { label: "b", text: "Ctrl + 1", correct: true },
          { label: "c", text: "Ctrl + P" },
        ],
        explanation:
          "Ctrl + 1 adalah shortcut universal untuk membuka menu pengaturan format sel secara lengkap.",
      },
    ],
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 12,
    title: "Quiz Akhir Topik 2.6 - 2.7",
    type: "quiz",
    icon: "12",
    subtitle: "Evaluasi Menyeluruh (15 Soal)",
    content: ["Uji pemahaman Anda tentang Autofill dan Format Number."],
    quiz: [
      {
        question:
          "Fitur Excel untuk mengisi data berurutan secara otomatis disebut...",
        options: [
          { label: "a", text: "AutoCorrect" },
          { label: "b", text: "Autofill", correct: true },
          { label: "c", text: "AutoSum" },
        ],
        explanation:
          "Autofill digunakan untuk menyalin atau mengurutkan data secara otomatis.",
      },
      {
        question:
          "Bagian di pojok kanan bawah sel aktif yang digunakan untuk Autofill disebut...",
        options: [
          { label: "a", text: "Scroll Bar" },
          { label: "b", text: "Fill Handle", correct: true },
          { label: "c", text: "Name Box" },
        ],
        explanation:
          "Fill Handle adalah titik kecil yang ditarik untuk menjalankan fungsi Autofill.",
      },
      {
        question:
          "Apa yang terjadi jika kita mengetik 'Senin' lalu menarik Fill Handle ke bawah?",
        options: [
          { label: "a", text: "Muncul Senin semua (Copy)" },
          {
            label: "b",
            text: "Muncul Selasa, Rabu, Kamis... (Urutan)",
            correct: true,
          },
          { label: "c", text: "Muncul Error" },
        ],
        explanation:
          "Excel memiliki daftar bawaan (Custom Lists) untuk nama hari dan bulan, sehingga otomatis mengurutkannya.",
      },
      {
        question:
          "Jika sel A1 berisi 10 dan A2 berisi 20, saat keduanya ditarik ke bawah hasilnya adalah...",
        options: [
          { label: "a", text: "10, 20, 10, 20" },
          { label: "b", text: "30, 40, 50", correct: true },
          { label: "c", text: "11, 21, 31" },
        ],
        explanation:
          "Excel mendeteksi pola selisih (kelipatan 10) dan melanjutkannya.",
      },
      {
        question: "Format angka default di Excel sebelum diubah adalah...",
        options: [
          { label: "a", text: "Text" },
          { label: "b", text: "General (Umum)", correct: true },
          { label: "c", text: "Number" },
        ],
        explanation:
          "General adalah format bawaan di mana angka ditampilkan apa adanya.",
      },
      {
        question:
          "Untuk menambahkan simbol mata uang (Rp) dengan rapi (simbol di kiri, angka di kanan), gunakan format...",
        options: [
          { label: "a", text: "Currency" },
          { label: "b", text: "Accounting", correct: true },
          { label: "c", text: "Number" },
        ],
        explanation:
          "Format Accounting mensejajarkan simbol mata uang di sisi kiri sel.",
      },
      {
        question:
          "Tanda pagar (#####) yang muncul pada sel berisi tanggal/angka berarti...",
        options: [
          { label: "a", text: "Rumus salah" },
          { label: "b", text: "Kolom kurang lebar", correct: true },
          { label: "c", text: "Data hilang" },
        ],
        explanation:
          "Tanda pagar menunjukkan bahwa lebar kolom tidak cukup untuk menampilkan seluruh digit angka atau tanggal.",
      },
      {
        question:
          "Jika ingin memasukkan tanggal hari ini secara otomatis dengan shortcut keyboard, gunakan...",
        options: [
          { label: "a", text: "Ctrl + ; (Titik Koma)", correct: true },
          { label: "b", text: "Ctrl + D" },
          { label: "c", text: "Alt + F4" },
        ],
        explanation:
          "Ctrl + ; adalah shortcut untuk menyisipkan tanggal saat ini (Current Date).",
      },
      {
        question: "Rumus =TODAY() digunakan untuk...",
        options: [
          { label: "a", text: "Menampilkan jam sekarang" },
          {
            label: "b",
            text: "Menampilkan tanggal hari ini yang selalu update",
            correct: true,
          },
          { label: "c", text: "Menulis kata 'Today'" },
        ],
        explanation:
          "Fungsi TODAY() menghasilkan tanggal hari ini dan akan berubah otomatis setiap hari.",
      },
      {
        question: "Format 'Long Date' akan menampilkan tanggal dalam bentuk...",
        options: [
          { label: "a", text: "Angka saja (01/01/2023)" },
          {
            label: "b",
            text: "Lengkap dengan nama hari dan bulan (Minggu, 1 Januari 2023)",
            correct: true,
          },
          { label: "c", text: "Hanya tahun" },
        ],
        explanation:
          "Long Date menampilkan format tanggal panjang termasuk nama hari dan bulan.",
      },
      {
        question: "Dalam penulisan waktu, Excel menggunakan pemisah...",
        options: [
          { label: "a", text: "Koma (,)" },
          { label: "b", text: "Titik Dua (:)", correct: true },
          { label: "c", text: "Garis Miring (/)" },
        ],
        explanation:
          "Standar penulisan waktu adalah menggunakan titik dua, misal 12:30.",
      },
      {
        question:
          "Fitur untuk menambah atau mengurangi jumlah angka desimal (angka di belakang koma) adalah...",
        options: [
          { label: "a", text: "Increase/Decrease Indent" },
          { label: "b", text: "Increase/Decrease Decimal", correct: true },
          { label: "c", text: "Format Painter" },
        ],
        explanation:
          "Tombol Increase/Decrease Decimal di tab Home digunakan untuk mengatur presisi desimal.",
      },
      {
        question:
          "Jika kita mengetik angka '0812345' di Excel (format General), apa yang terjadi?",
        options: [
          { label: "a", text: "Angka 0 di depan akan hilang", correct: true },
          { label: "b", text: "Tetap 0812345" },
          { label: "c", text: "Menjadi Error" },
        ],
        explanation:
          "Dalam format angka/general, nol di depan angka dianggap tidak bernilai dan akan dihilangkan otomatis.",
      },
      {
        question:
          "Agar angka nol di depan nomor telepon tidak hilang, format sel harus diubah menjadi...",
        options: [
          { label: "a", text: "Number" },
          { label: "b", text: "Text", correct: true },
          { label: "c", text: "Date" },
        ],
        explanation:
          "Format Text memperlakukan angka sebagai karakter teks biasa, sehingga nol di depan tidak dihapus.",
      },
      {
        question: "Format Persentase (%) bekerja dengan cara...",
        options: [
          { label: "a", text: "Menambah nol dua kali" },
          {
            label: "b",
            text: "Mengalikan nilai dengan 100 dan memberi simbol %",
            correct: true,
          },
          { label: "c", text: "Membagi nilai dengan 100" },
        ],
        explanation:
          "Format persentase menampilkan nilai pecahan sebagai persen (0.5 menjadi 50%).",
      },
    ],
  },

  // --- PENUTUP ---
  {
    id: 13,
    title: "Selesai",
    type: "content",
    icon: "13",
    subtitle: "Rangkuman",
    content: [
      "Anda telah menguasai teknik **Autofill** untuk mempercepat input data dan **Format Number** untuk menyajikan data angka secara profesional.",
      "Kemampuan ini sangat vital untuk pengolahan data keuangan dan administrasi.",
    ],
  },
];