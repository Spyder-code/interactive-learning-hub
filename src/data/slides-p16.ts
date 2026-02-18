import type { Slide } from "./slides";
export const slides: Slide[] = [
  // --- BAGIAN 1: MANAJEMEN FILE LANJUTAN (4.4.1) ---
  {
    id: 1,
    title: "Lanjutan Modul Mendeley: Manajemen & Sitasi",
    type: "content",
    icon: "1",
    subtitle: "Topik 4.4 - 4.5",
    content: [
      "Setelah memiliki library, tantangan berikutnya adalah merapikan data dan menggunakannya untuk menulis.",
      "**Fokus Materi:**",
      "1. **Manajemen File:** Menghapus duplikat, memperbaiki metadata, dan anotasi PDF.",
      "2. **Integrasi Word:** Membuat kutipan (sitasi) dan daftar pustaka otomatis.",
      "3. **Kolaborasi:** Membuat grup riset dan berbagi referensi.",
    ],
  },
  {
    id: 2,
    title: "Membersihkan Duplikat",
    type: "content",
    icon: "2",
    subtitle: "Fitur Check for Duplicates",
    content: [
      "Seringkali kita tidak sengaja memasukkan file yang sama dua kali. Ini mengacaukan daftar pustaka.",
      "**Solusi:**",
      "1. Klik folder **All Documents**.",
      "2. Klik menu **Tools** > **Check for Duplicates**.",
      "3. Mendeley akan menampilkan file ganda. Klik **Confirm Merge** untuk menggabungkannya menjadi satu referensi yang utuh.",
    ],
  },
  {
    id: 3,
    title: "Anotasi PDF (Membaca & Menandai)",
    type: "content",
    icon: "3",
    subtitle: "Highlight & Notes",
    content: [
      "Anda bisa membaca jurnal langsung di Mendeley tanpa aplikasi lain.",
      "**Fitur PDF Viewer:**",
      "- **Highlight Text:** Memberi warna stabilo pada kalimat penting.",
      "- **Highlight Rectangle:** Menandai area gambar atau grafik.",
      "- **Sticky Note:** Menempelkan catatan kecil/komentar pada halaman.",
      "Semua tanda ini tersimpan dan bisa dilihat oleh anggota tim (jika dalam Grup).",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Manajemen Library",
    type: "task",
    icon: "4",
    subtitle: "Praktik Kerapian - 10 Menit",
    content: ["Buka Mendeley Desktop Anda."],
    checklist: [
      "Lakukan **Check for Duplicates**. Jika ada, gabungkan (Merge).",
      "Buka salah satu file PDF (klik dua kali).",
      "Gunakan fitur **Highlight** (warna kuning) pada judul jurnal.",
      "Tambahkan **Sticky Note** di bagian Abstrak dengan tulisan: 'Penting untuk Skripsi'.",
    ],
    tasks: [
      "Upload screenshot tampilan PDF yang sudah di-highlight dan ada note-nya.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 2: SITASI & DAFTAR PUSTAKA (4.4.2) ---
  {
    id: 5,
    title: "Integrasi Microsoft Word",
    type: "content",
    icon: "5",
    subtitle: "Install Plugin",
    content: [
      "Agar Mendeley bisa 'berbicara' dengan Word, kita butuh jembatan (Plugin).",
      "**Cara Install:**",
      "1. Tutup Microsoft Word (Wajib!).",
      "2. Di Mendeley, klik menu **Tools** > **Install MS Word Plugin**.",
      "3. Jika berhasil, akan muncul notifikasi sukses.",
      "4. Buka Word, cek Tab **References**. Pastikan ada blok menu **Mendeley Cite-O-Matic**.",
    ],
  },
  {
    id: 6,
    title: "Membuat Sitasi (Kutipan)",
    type: "content",
    icon: "6",
    subtitle: "Insert Citation",
    content: [
      "Jangan mengetik (Nama, Tahun) secara manual!",
      "**Langkah:**",
      "1. Letakkan kursor di akhir kalimat yang ingin disitasi.",
      "2. Klik **Insert Citation** di Tab References.",
      "3. Ketik kata kunci (Judul/Penulis) di kotak pencarian popup.",
      "4. Pilih artikel yang sesuai > Klik **OK**.",
      "Format sitasi akan muncul otomatis, misal: (Susanto, 2023).",
    ],
  },
  {
    id: 7,
    title: "Membuat Daftar Pustaka Otomatis",
    type: "content",
    icon: "7",
    subtitle: "Insert Bibliography",
    content: [
      "Ini adalah fitur paling hemat waktu.",
      "**Langkah:**",
      "1. Buat halaman baru 'Daftar Pustaka'.",
      "2. Letakkan kursor di bawah judul.",
      "3. Klik **Insert Bibliography** di Tab References.",
      "4. Semua referensi yang *pernah disitasi* di atas akan muncul otomatis, urut sesuai abjad.",
    ],
  },
  {
    id: 8,
    title: "Mengubah Gaya Sitasi (Style)",
    type: "content",
    icon: "8",
    subtitle: "APA, IEEE, Harvard",
    content: [
      "Beda kampus, beda aturan format.",
      "**Cara Mengubah:**",
      "Klik dropdown **Style** di Tab References.",
      "- **APA (American Psychological Association):** Umum untuk sosial humaniora (Nama, Tahun).",
      "- **IEEE:** Umum untuk teknik (Angka [1]).",
      "- **Chicago/Harvard:** Format lain yang populer.",
      "Daftar pustaka akan berubah formatnya secara instan.",
    ],
  },
  {
    id: 9,
    title: "Tugas 2: Praktik Menulis Ilmiah",
    type: "task",
    icon: "9",
    subtitle: "Simulasi Skripsi - 15 Menit",
    content: ["Buka Microsoft Word (dokumen kosong)."],
    checklist: [
      "Tulis 1 paragraf sembarang tentang topik penelitian Anda.",
      "Sisipkan **2 Sitasi** berbeda menggunakan Mendeley (Insert Citation).",
      "Buat Daftar Pustaka otomatis di bawahnya (Insert Bibliography).",
      "Ubah Style menjadi **IEEE** (pastikan sitasi berubah jadi angka [1]).",
    ],
    tasks: ["Upload file Word (.docx) hasil praktik ini."],
    requireUpload: true,
  },

  // --- BAGIAN 3: KOLABORASI (4.5) ---
  {
    id: 10,
    title: "Membuat Grup Riset",
    type: "content",
    icon: "10",
    subtitle: "Kerja Tim",
    content: [
      "Mendeley memungkinkan Anda berbagi referensi dengan dosen atau teman kelompok.",
      "**Membuat Grup:**",
      "1. Di panel kiri Mendeley, klik **Create Group**.",
      "2. Beri Nama (misal: 'Tim Skripsi').",
      "3. Pilih **Private Group** (agar bisa berbagi PDF full text).",
    ],
  },
  {
    id: 11,
    title: "Mengundang & Berbagi",
    type: "content",
    icon: "11",
    subtitle: "Invite Members",
    content: [
      "**Mengundang Anggota:**",
      "- Klik kanan nama Grup > **Manage Group**.",
      "- Klik **Invite Members** > Masukkan email teman > Send Invites.",
      "**Berbagi Dokumen:**",
      "- Drag & Drop file PDF dari 'My Library' ke folder Grup.",
      "- Semua anggota grup bisa membaca, memberi highlight, dan melihat catatan satu sama lain.",
    ],
  },
  {
    id: 12,
    title: "Tugas 3: Simulasi Grup",
    type: "task",
    icon: "12",
    subtitle: "Setup Kolaborasi - 5 Menit",
    content: ["Praktikkan pembuatan wadah kolaborasi."],
    checklist: [
      "Buat satu **Private Group** dengan nama 'Riset [Nama Anda]'.",
      "Masukkan minimal 1 file PDF ke dalam grup tersebut (Drag & drop).",
      "Coba fitur **Invite Members** (masukkan email teman sebelah atau email kedua Anda).",
    ],
    tasks: [
      "Screenshot tampilan Mendeley yang menunjukkan Grup dan Anggotanya.",
    ],
    requireUpload: true,
  },

  // --- FINAL PROJECT (ADVANCED) ---
  {
    id: 13,
    title: "Final Project: Makalah Mini Terintegrasi",
    type: "challenge",
    icon: "13",
    subtitle: "Uji Kompetensi Bab 4",
    content: [
      "**Skenario:** Anda sedang menyusun Bab 1 Skripsi.",
      "**Misi:** Buat dokumen Word yang terintegrasi penuh dengan library Mendeley yang rapi.",
    ],
  },
  {
    id: 14,
    title: "Langkah 1: Persiapan Library",
    type: "task",
    icon: "14",
    subtitle: "Setup Data",
    content: ["Siapkan amunisi referensi Anda."],
    checklist: [
      "Pastikan ada minimal **5 Referensi** di Mendeley Anda (Jurnal/Buku).",
      "Pastikan metadatanya (Judul, Penulis, Tahun) sudah bersih/benar.",
      "Tandai 2 referensi terpenting sebagai **Favorites** (Bintang).",
    ],
    tasks: ["Tidak perlu upload, lanjut ke langkah berikutnya."],
    requireUpload: false,
  },
  {
    id: 15,
    title: "Langkah 2: Penulisan & Sitasi",
    type: "task",
    icon: "15",
    subtitle: "Integrasi Word",
    content: ["Tulis dokumen di Word."],
    checklist: [
      "Buat Judul: 'Tinjauan Pustaka'.",
      "Tulis 3 paragraf. Setiap paragraf **WAJIB** mengandung minimal 1 sitasi Mendeley.",
      "Gunakan Style **APA 7th Edition**.",
      "Di akhir dokumen, generate **Daftar Pustaka** otomatis.",
    ],
    tasks: ["Pastikan tidak ada sitasi manual (diketik sendiri)."],
    requireUpload: false,
  },
  {
    id: 16,
    title: "Langkah 3: Finishing",
    type: "task",
    icon: "16",
    subtitle: "Upload Final",
    content: ["Kumpulkan hasil kerja Anda."],
    checklist: [
      "Simpan file Word dengan nama **Final_Mendeley_NIM.docx**.",
      "Pastikan plugin Mendeley bekerja (jika diklik sitasinya, akan terblok abu-abu).",
    ],
    tasks: ["Upload file Word Final Project di sini."],
    requireUpload: true,
  },

  // --- FINAL QUIZ ---
  {
    id: 17,
    title: "Quiz Akhir Bab 4 (Mendeley)",
    type: "quiz",
    icon: "17",
    subtitle: "Evaluasi Komprehensif (15 Soal)",
    content: [
      "Uji pemahaman Anda tentang manajemen referensi, sitasi, dan kolaborasi.",
    ],
    quiz: [
      {
        question:
          "Langkah pertama sebelum bisa menggunakan Mendeley Cite di Word adalah...",
        options: [
          { label: "a", text: "Membuka Word" },
          {
            label: "b",
            text: "Install MS Word Plugin dari menu Tools",
            correct: true,
          },
          { label: "c", text: "Membuat Daftar Pustaka" },
        ],
        explanation:
          "Plugin harus diinstal terlebih dahulu melalui menu Tools di Mendeley Desktop saat Word tertutup.",
      },
      {
        question:
          "Fitur untuk memeriksa apakah ada file jurnal yang sama ganda di library adalah...",
        options: [
          { label: "a", text: "Watch Folder" },
          { label: "b", text: "Check for Duplicates", correct: true },
          { label: "c", text: "Merge Documents" },
        ],
        explanation:
          "Check for Duplicates (di menu Tools) memindai library untuk menemukan entri ganda.",
      },
      {
        question: "Di mana letak tombol 'Insert Citation' pada Microsoft Word?",
        options: [
          { label: "a", text: "Tab Home" },
          { label: "b", text: "Tab Insert" },
          { label: "c", text: "Tab References", correct: true },
        ],
        explanation:
          "Semua alat sitasi Mendeley berkumpul di Tab References pada MS Word.",
      },
      {
        question:
          "Jika ingin mengubah format sitasi dari (Nama, Tahun) menjadi angka [1], bagian apa yang harus diubah?",
        options: [
          { label: "a", text: "Style", correct: true },
          { label: "b", text: "Font" },
          { label: "c", text: "Layout" },
        ],
        explanation:
          "Style menentukan gaya penulisan sitasi (misal: APA vs IEEE).",
      },
      {
        question: "Fitur 'Sync' wajib dilakukan ketika...",
        options: [
          { label: "a", text: "Ingin mencetak dokumen" },
          {
            label: "b",
            text: "Ingin data di Laptop tersimpan ke Web/Cloud agar aman",
            correct: true,
          },
          { label: "c", text: "Ingin menghapus aplikasi" },
        ],
        explanation:
          "Sync menyinkronkan data lokal dengan server cloud Mendeley.",
      },
      {
        question: "Apa fungsi dari 'Insert Bibliography'?",
        options: [
          { label: "a", text: "Memasukkan satu sitasi" },
          {
            label: "b",
            text: "Membuat daftar pustaka lengkap secara otomatis",
            correct: true,
          },
          { label: "c", text: "Menghapus sitasi" },
        ],
        explanation:
          "Insert Bibliography men-generate daftar semua referensi yang telah disitasi dalam dokumen.",
      },
      {
        question:
          "Untuk memberi catatan tempel pada halaman PDF di Mendeley, gunakan fitur...",
        options: [
          { label: "a", text: "Highlight Text" },
          { label: "b", text: "Sticky Note", correct: true },
          { label: "c", text: "Select Text" },
        ],
        explanation:
          "Sticky Note berfungsi seperti kertas catatan tempel pada dokumen fisik.",
      },
      {
        question:
          "Berapa kapasitas anggota maksimal untuk Private Group (pada akun gratis standar)?",
        options: [
          { label: "a", text: "5" },
          { label: "b", text: "25", correct: true },
          { label: "c", text: "100" },
        ],
        explanation:
          "Mendeley membatasi anggota Private Group hingga 25 orang.",
      },
      {
        question:
          "Jika detail judul jurnal di Mendeley salah (typo), cara memperbaikinya adalah...",
        options: [
          {
            label: "a",
            text: "Edit manual di kolom kanan (Details)",
            correct: true,
          },
          { label: "b", text: "Edit di Word" },
          { label: "c", text: "Download ulang" },
        ],
        explanation:
          "Panel kanan (Details) memungkinkan pengeditan metadata secara manual.",
      },
      {
        question: "Gaya sitasi 'APA' adalah singkatan dari...",
        options: [
          {
            label: "a",
            text: "American Psychological Association",
            correct: true,
          },
          { label: "b", text: "Asian Publisher Agency" },
          { label: "c", text: "Academic Paper Association" },
        ],
        explanation:
          "APA Style adalah standar umum dalam penulisan akademis psikologi dan sosial.",
      },
      {
        question:
          "Untuk membatalkan aksi terakhir (misal salah hapus) di Mendeley, shortcut-nya adalah...",
        options: [
          { label: "a", text: "Ctrl + S" },
          { label: "b", text: "Ctrl + Z (Undo)", correct: true },
          { label: "c", text: "Ctrl + P" },
        ],
        explanation: "Ctrl + Z adalah shortcut universal untuk Undo.",
      },
      {
        question:
          "File format apa yang bisa di-drag & drop ke Mendeley untuk otomatis membaca metadatanya?",
        options: [
          { label: "a", text: ".jpg" },
          { label: "b", text: ".mp3" },
          { label: "c", text: ".pdf", correct: true },
        ],
        explanation:
          "Mendeley dirancang khusus untuk mengekstrak metadata dari file PDF.",
      },
      {
        question:
          "Jika Anda menambahkan highlight pada PDF di dalam Group, siapa yang bisa melihatnya?",
        options: [
          { label: "a", text: "Hanya saya sendiri" },
          { label: "b", text: "Semua anggota grup", correct: true },
          { label: "c", text: "Semua orang di internet" },
        ],
        explanation:
          "Anotasi dalam grup bersifat kolaboratif dan bisa dilihat oleh anggota lain.",
      },
      {
        question:
          "Apa yang terjadi pada Daftar Pustaka di Word jika kita menghapus satu sitasi di dalam teks?",
        options: [
          { label: "a", text: "Daftar pustaka tetap sama" },
          {
            label: "b",
            text: "Daftar pustaka otomatis ter-update (menghapus referensi tsb) setelah di-Refresh",
            correct: true,
          },
          { label: "c", text: "Word akan error" },
        ],
        explanation:
          "Daftar pustaka Mendeley bersifat dinamis dan akan menyesuaikan dengan sitasi yang ada di teks (perlu klik Refresh jika tidak langsung berubah).",
      },
      {
        question:
          "Tombol untuk memperbarui metadata dokumen secara otomatis (mencari data online) adalah...",
        options: [
          { label: "a", text: "Update Details", correct: true },
          { label: "b", text: "Mark as Read" },
          { label: "c", text: "Export" },
        ],
        explanation:
          "Klik kanan > Update Details akan memaksa Mendeley mencari informasi lengkap dokumen tersebut dari database online.",
      },
    ],
  },

  // --- PENUTUP MODUL ---
  {
    id: 18,
    title: "Selesai Modul Mendeley",
    type: "content",
    icon: "18",
    subtitle: "Kompetensi Tercapai",
    content: [
      "Selamat! Anda telah menguasai manajemen referensi modern.",
      "Kemampuan ini akan sangat mempermudah Anda dalam menyusun Skripsi, Jurnal, dan Karya Ilmiah lainnya.",
      "Ingat: **Sitasi yang baik = Integritas Akademik yang tinggi.**",
    ],
  },
];