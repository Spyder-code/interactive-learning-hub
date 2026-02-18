import { Slide } from "./slides";

export const slides: Slide[] = [
  // --- BAGIAN 1: PEMBUKAAN (2.3 - 2.5) ---
  {
    id: 1,
    title: "Lanjutan Modul Excel: Struktur & Data",
    type: "content",
    icon: "1",
    subtitle: "Topik 2.3 - 2.5",
    content: [
      "Setelah mengenal tampilan, sekarang kita akan membedah struktur dasar Excel dan cara memasukkan data dengan benar.",
      "**Fokus Materi:**",
      "1. **Struktur:** Sel, Range, Kolom, Baris.",
      "2. **Modifikasi:** Mengatur ukuran, menambah/menghapus baris & kolom.",
      "3. **Input Data:** Membedakan Teks, Angka, dan Rumus.",
    ],
  },

  // --- TOPIK 2.3: PENGERTIAN SEL & RANGE ---
  {
    id: 2,
    title: "Sel, Baris, & Kolom",
    type: "content",
    icon: "2",
    subtitle: "Unit Penyusun Excel",
    content: [
      "**Sel (Cell):** Kotak pertemuan antara baris dan kolom (Contoh: B4).",
      "**Kolom (Column):** Sekumpulan sel yang tersusun vertikal (atas-bawah), ditandai dengan **Huruf** (A, B, C).",
      "**Baris (Row):** Sekumpulan sel yang tersusun horizontal (kiri-kanan), ditandai dengan **Angka** (1, 2, 3).",
    ],
  },
  {
    id: 3,
    title: "Range (Rentang)",
    type: "content",
    icon: "3",
    subtitle: "Kumpulan Sel",
    content: [
      "**Range:** Kumpulan dari beberapa sel yang diblok/dipilih.",
      "**Jenis Range:**",
      "- **Vertikal:** B4 sampai B8.",
      "- **Horizontal:** A5 sampai D5.",
      "- **Persegi (Blok):** D4 sampai G10.",
      "Penulisan rumus range menggunakan titik dua (:) misal **A1:C5**.",
    ],
  },
  {
    id: 4,
    title: "Quiz Konsep Dasar",
    type: "quiz",
    icon: "4",
    subtitle: "Cek Pemahaman",
    content: ["Pastikan Anda paham bedanya Sel dan Range."],
    quiz: [
      {
        question: "Manakah penulisan alamat Sel yang benar?",
        options: [
          { label: "a", text: "1A" },
          { label: "b", text: "A1", correct: true },
          { label: "c", text: "A:1" },
        ],
        explanation:
          "Alamat sel selalu diawali dengan Huruf Kolom diikuti Angka Baris (misal: A1, B5).",
      },
      {
        question: "Sekumpulan sel yang diblok dari A1 sampai A5 disebut...",
        options: [
          { label: "a", text: "Range", correct: true },
          { label: "b", text: "Sheet" },
          { label: "c", text: "Cell" },
        ],
        explanation: "Range adalah kumpulan dari beberapa sel.",
      },
    ],
  },

  // --- TOPIK 2.4: PENGATURAN SEL, BARIS, KOLOM, SHEET ---
  {
    id: 5,
    title: "Melebarkan Baris & Kolom",
    type: "content",
    icon: "5",
    subtitle: "Mengatur Ukuran",
    content: [
      "Terkadang teks terlalu panjang dan tidak muat di sel.",
      "**Cara Manual:** Arahkan kursor ke garis batas antara huruf kolom (atau angka baris) sampai muncul tanda panah dua arah, lalu **Tarik/Geser**.",
      "**Cara Presisi:** Klik menu **Format** > **Row Height** atau **Column Width** > Masukkan angka ukuran.",
    ],
  },
  {
    id: 6,
    title: "Menyisipkan & Menghapus",
    type: "content",
    icon: "6",
    subtitle: "Insert & Delete",
    content: [
      "**Menyisipkan (Insert):**",
      "- Klik kanan pada huruf kolom/angka baris > Pilih **Insert**.",
      "- Baris baru akan muncul di *atas*, Kolom baru muncul di *kiri*.",
      "**Menghapus (Delete):**",
      "- Klik kanan pada huruf kolom/angka baris > Pilih **Delete**.",
      "- **Hati-hati:** Data di dalamnya akan hilang permanen.",
    ],
  },
  {
    id: 7,
    title: "Tugas 1: Modifikasi Tabel",
    type: "task",
    icon: "7",
    subtitle: "Praktik Ukuran & Insert - 10 Menit",
    content: ["Buat tabel Nama dan Nilai sederhana."],
    checklist: [
      "Ketik 'No' di A1, 'Nama Lengkap Siswa' di B1, 'Nilai' di C1.",
      "Lebarkan **Kolom B** agar tulisan 'Nama Lengkap Siswa' muat sepenuhnya (tidak terpotong).",
      "Sisipkan 1 Baris baru di atas Baris 1 (sehingga judul turun ke Baris 2).",
      "Di sel baru A1, ketik judul 'DATA KELAS'.",
    ],
    tasks: ["Upload file Excel hasil modifikasi ini."],
    requireUpload: true,
  },
  {
    id: 8,
    title: "Mengelola Sheet",
    type: "content",
    icon: "8",
    subtitle: "Manajemen Lembar Kerja",
    content: [
      "Tab Sheet ada di bagian bawah kiri.",
      "**Rename:** Klik kanan nama sheet (Sheet1) > Rename > Ganti nama.",
      "**Tab Color:** Klik kanan > Tab Color > Pilih warna agar mudah dikenali.",
      "**Insert/Delete:** Klik kanan > Insert (tambah) atau Delete (hapus sheet).",
    ],
  },
  {
    id: 9,
    title: "Tugas 2: Kelola Sheet",
    type: "task",
    icon: "9",
    subtitle: "Praktik Sheet - 5 Menit",
    content: ["Gunakan file latihan sebelumnya."],
    checklist: [
      "Ubah nama 'Sheet1' menjadi **Latihan A**.",
      "Beri warna **Merah** pada tab Latihan A.",
      "Tambah sheet baru, beri nama **Latihan B**.",
      "Beri warna **Biru** pada tab Latihan B.",
    ],
    tasks: ["Upload file Excel yang sudah memiliki 2 sheet berwarna ini."],
    requireUpload: true,
  },

  // --- TOPIK 2.5: MENULIS DATA (ENTRY DATA) ---
  {
    id: 10,
    title: "Jenis Data di Excel",
    type: "content",
    icon: "10",
    subtitle: "Penting Diketahui!",
    content: [
      "Excel mengenali tipe data secara otomatis:",
      "1. **Label (Teks):** Huruf atau gabungan angka & huruf. Otomatis **Rata Kiri**.",
      "2. **Value (Angka):** Murni angka (0-9) yang bisa dihitung. Otomatis **Rata Kanan**.",
      "3. **Formula (Rumus):** Diawali dengan tanda sama dengan (=).",
    ],
  },
  {
    id: 11,
    title: "Memperbaiki Isi Sel",
    type: "content",
    icon: "11",
    subtitle: "Cara Edit Data",
    content: [
      "Jika salah ketik, jangan dihapus lalu ketik ulang semua!",
      "Gunakan cara edit:",
      "1. **F2:** Tekan tombol F2 pada keyboard.",
      "2. **Double Click:** Klik dua kali pada sel.",
      "3. **Formula Bar:** Klik sel, lalu edit teksnya di Formula Bar.",
    ],
  },
  {
    id: 12,
    title: "Tugas 3: Input Data & Tipe Data",
    type: "task",
    icon: "12",
    subtitle: "Praktik Entry Data - 10 Menit",
    content: [
      "Di sheet 'Latihan B', buat tabel berikut dan perhatikan perataannya (Alignment).",
    ],
    checklist: [
      "Sel A1 (Teks): Ketik 'ID Barang'.",
      "Sel B1 (Teks): Ketik 'Harga'.",
      "Sel A2 (Campuran): Ketik 'B-001' (Harus rata kiri otomatis).",
      "Sel B2 (Angka): Ketik '5000' (Harus rata kanan otomatis).",
      "Sel B3 (Salah Input): Ketik '5.000' (titik) atau '5000 ' (spasi). Perhatikan apakah dia rata kiri (dianggap teks)?",
    ],
    tasks: ["Upload file Excel hasil input data ini."],
    requireUpload: true,
    note: "Jangan menekan tombol rata kiri/kanan manual! Biarkan Excel mengatur otomatis agar kita tahu tipe datanya.",
  },

  // --- REVIEW MATERI (MID QUIZ) ---
  {
    id: 13,
    title: "Quiz Review Data",
    type: "quiz",
    icon: "13",
    subtitle: "Cek Pemahaman Tipe Data",
    content: ["Excel sangat sensitif terhadap tipe data. Cek pemahamanmu."],
    quiz: [
      {
        question:
          "Secara default, jika kita mengetik angka '100' di Excel, teks akan merapat ke...",
        options: [
          { label: "a", text: "Kiri" },
          { label: "b", text: "Kanan", correct: true },
          { label: "c", text: "Tengah" },
        ],
        explanation:
          "Data numerik (angka) secara default akan rata kanan (align right).",
      },
      {
        question:
          "Tombol keyboard untuk mengedit isi sel (Edit Mode) adalah...",
        options: [
          { label: "a", text: "F1" },
          { label: "b", text: "F2", correct: true },
          { label: "c", text: "F5" },
        ],
        explanation:
          "Tombol F2 digunakan untuk masuk ke mode edit pada sel aktif.",
      },
    ],
  },

  // --- FINAL QUIZ (15 SOAL) ---
  {
    id: 14,
    title: "Quiz Akhir Topik 2.3 - 2.5",
    type: "quiz",
    icon: "14",
    subtitle: "Evaluasi Menyeluruh (15 Soal)",
    content: ["Uji pemahaman Anda tentang Sel, Range, dan Input Data."],
    quiz: [
      {
        question: "Pertemuan antara kolom dan baris disebut...",
        options: [
          { label: "a", text: "Range" },
          { label: "b", text: "Sel", correct: true },
          { label: "c", text: "Sheet" },
        ],
        explanation:
          "Sel adalah unit terkecil dalam worksheet yang merupakan pertemuan kolom dan baris.",
      },
      {
        question:
          "Kumpulan dari beberapa sel, baik vertikal, horizontal, atau persegi disebut...",
        options: [
          { label: "a", text: "Range", correct: true },
          { label: "b", text: "Column" },
          { label: "c", text: "Row" },
        ],
        explanation: "Range adalah sekumpulan sel yang dipilih/diblok.",
      },
      {
        question: "Penanda kolom dalam Excel berupa...",
        options: [
          { label: "a", text: "Angka (1, 2, 3)" },
          { label: "b", text: "Huruf (A, B, C)", correct: true },
          { label: "c", text: "Simbol" },
        ],
        explanation:
          "Kolom ditandai dengan huruf abjad di bagian atas worksheet.",
      },
      {
        question: "Penanda baris dalam Excel berupa...",
        options: [
          { label: "a", text: "Huruf" },
          { label: "b", text: "Angka", correct: true },
          { label: "c", text: "Romawi" },
        ],
        explanation: "Baris ditandai dengan angka urut di sisi kiri worksheet.",
      },
      {
        question:
          "Untuk melebarkan kolom secara manual, kita harus mengarahkan mouse ke...",
        options: [
          { label: "a", text: "Tengah sel" },
          { label: "b", text: "Batas tepi kanan huruf kolom", correct: true },
          { label: "c", text: "Menu File" },
        ],
        explanation:
          "Arahkan mouse pointer pada batas tepi kolom yang akan dilebarkan sampai muncul panah dua arah.",
      },
      {
        question:
          "Jika kita menyisipkan kolom baru (Insert Column), kolom baru akan muncul di sebelah...",
        options: [
          { label: "a", text: "Kanan kolom yang diblok" },
          { label: "b", text: "Kiri kolom yang diblok", correct: true },
          { label: "c", text: "Bawah kolom" },
        ],
        explanation:
          "Penambahan kolom terdapat di sebelah kiri kolom yang ter-blok.",
      },
      {
        question:
          "Jika kita menyisipkan baris baru (Insert Row), baris baru akan muncul di...",
        options: [
          { label: "a", text: "Bawah baris yang diblok" },
          { label: "b", text: "Atas baris yang diblok", correct: true },
          { label: "c", text: "Tengah baris" },
        ],
        explanation: "Penambahan baris terdapat di atas baris yang di blok.",
      },
      {
        question:
          "Apa yang terjadi jika kita menghapus baris (Delete Entire Row)?",
        options: [
          {
            label: "a",
            text: "Isi sel hilang, baris di bawahnya naik",
            correct: true,
          },
          {
            label: "b",
            text: "Hanya tulisan yang hilang, baris kosong tetap ada",
          },
          { label: "c", text: "Baris menjadi tersembunyi" },
        ],
        explanation:
          "Delete Entire Row akan menghilangkan baris beserta isinya dan menggeser baris bawah ke atas.",
      },
      {
        question:
          "Untuk mengganti nama Sheet (misal Sheet1 jadi Latihan), perintahnya adalah...",
        options: [
          { label: "a", text: "Klik Kanan > Insert" },
          { label: "b", text: "Klik Kanan > Rename", correct: true },
          { label: "c", text: "Klik Kanan > Delete" },
        ],
        explanation: "Rename digunakan untuk mengganti nama sheet.",
      },
      {
        question:
          "Data berupa 'Nama Orang' atau 'Nama Barang' dikategorikan sebagai...",
        options: [
          { label: "a", text: "Numerik" },
          { label: "b", text: "Label / Teks", correct: true },
          { label: "c", text: "Formula" },
        ],
        explanation: "Data label atau teks adalah jenis data berupa huruf.",
      },
      {
        question: "Data teks (Label) secara otomatis akan memiliki perataan...",
        options: [
          { label: "a", text: "Kanan" },
          { label: "b", text: "Kiri", correct: true },
          { label: "c", text: "Tengah" },
        ],
        explanation:
          "Hasil dari penulisan data label secara otomatis berada di sebelah kiri dalam sel.",
      },
      {
        question:
          "Data angka (Numerik) secara otomatis akan memiliki perataan...",
        options: [
          { label: "a", text: "Kiri" },
          { label: "b", text: "Kanan", correct: true },
          { label: "c", text: "Tengah" },
        ],
        explanation:
          "Hasil dari penulisan data numeric secara otomatis berada di sebelah kanan dalam sel.",
      },
      {
        question: "Data yang diawali dengan tanda sama dengan (=) disebut...",
        options: [
          { label: "a", text: "Label" },
          { label: "b", text: "Formula / Rumus", correct: true },
          { label: "c", text: "Konstan" },
        ],
        explanation:
          "Data rumus atau formula digunakan untuk melakukan perhitungan.",
      },
      {
        question:
          "Cara mengedit isi sel tanpa menghapus seluruh isinya adalah dengan menekan tombol...",
        options: [
          { label: "a", text: "F2", correct: true },
          { label: "b", text: "F4" },
          { label: "c", text: "Esc" },
        ],
        explanation: "Tekan tombol F2 untuk masuk ke mode edit pada sel aktif.",
      },
      {
        question: "Selain F2, kita bisa mengedit isi sel dengan cara...",
        options: [
          { label: "a", text: "Klik sekali pada sel" },
          {
            label: "b",
            text: "Klik ganda (Double Click) pada sel",
            correct: true,
          },
          { label: "c", text: "Klik kanan > Copy" },
        ],
        explanation:
          "Klik ganda atau double klik (2x) pada sel akan mengaktifkan kursor untuk mengedit data.",
      },
    ],
  },
  {
    id: 15,
    title: "Penutup Sesi Ini",
    type: "content",
    icon: "15",
    subtitle: "Rangkuman",
    content: [
      "Anda telah menguasai dasar struktur Excel (Sel, Baris, Kolom) dan cara menginput data dengan benar.",
      "Selanjutnya, kita akan belajar fitur sakti Excel: **Autofill** dan **Format Number** (Topik 2.6 - 2.7).",
    ],
  },
];
