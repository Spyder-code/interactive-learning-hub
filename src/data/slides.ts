import React from "react";

export type SlideType = "content" | "quiz" | "task" | "challenge";

export interface QuizOption {
  label: string;
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  question: string;
  questionType?: "multiple-choice" | "free-text"; // Default to multiple-choice if not specified
  options?: QuizOption[]; // Optional for multiple-choice questions
  correctAnswer?: string; // For free-text questions (optional)
  explanation?: string;
  placeholder?: string; // Placeholder text for free-text input
}

export interface Hyperlink {
  url: string;
  text: string;
}

export interface Slide {
  id: number;
  title: string;
  type: SlideType;
  icon: React.ReactNode;
  subtitle?: string;
  content?: string[];
  checklist?: string[];
  tasks?: string[];
  quiz?: QuizQuestion[];
  timer?: number; // minutes
  note?: string;
  requireUpload?: boolean; // Enable file upload for tasks
  hyperlink?: Hyperlink; // Enable clickable hyperlinks
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Tantangan 90 Menit",
    type: "content",
    icon: "1",
    subtitle: "Opening Challenge",
    content: ["Hari ini kamu harus bisa membuat:"],
    checklist: [
      "Dokumen akademik rapi",
      "Tanpa spasi manual",
      "Tanpa enter berlebihan",
      "Dengan format standar kampus",
    ],
    // note: "👉 Tidak ada ceramah panjang. Kamu akan eksplorasi sendiri.",
  },
  {
    id: 2,
    title: "Pre-Test",
    type: "quiz",
    icon: "2",
    subtitle: "Quiz 1",
    timer: 5,
    content: [
      "Mari kita review pemahaman dasar tentang Microsoft Word sebelum memulai eksplorasi:",
    ],
    quiz: [
      {
        question: "Fungsi Save As adalah…",
        options: [
          {
            label: "a",
            text: "Menyimpan file dengan nama/lokasi baru",
            correct: true,
          },
          { label: "b", text: "Menghapus file lama" },
          { label: "c", text: "Membuka file baru" },
        ],
        explanation:
          "Save As memungkinkan kamu menyimpan file dengan nama atau lokasi yang berbeda.",
      },
      {
        question: "Margin digunakan untuk…",
        options: [
          { label: "a", text: "Mengatur warna halaman" },
          { label: "b", text: "Mengatur jarak tepi halaman", correct: true },
          { label: "c", text: "Mengatur ukuran font" },
        ],
        explanation: "Margin mengatur jarak antara teks dan tepi halaman.",
      },
      {
        question: "Alignment untuk laporan sebaiknya…",
        options: [
          { label: "a", text: "Left" },
          { label: "b", text: "Center" },
          { label: "c", text: "Justify", correct: true },
        ],
        explanation:
          "Justify membuat teks rata kanan-kiri, standar untuk dokumen akademik.",
      },
      {
        question: "Shortcut untuk Save adalah…",
        options: [
          { label: "a", text: "Ctrl + S", correct: true },
          { label: "b", text: "Ctrl + A" },
          { label: "c", text: "Ctrl + P" },
        ],
        explanation:
          "Ctrl + S adalah shortcut untuk menyimpan dokumen dengan cepat.",
      },
      {
        question: "Font standar untuk dokumen akademik adalah…",
        options: [
          { label: "a", text: "Arial" },
          { label: "b", text: "Times New Roman", correct: true },
          { label: "c", text: "Comic Sans" },
        ],
        explanation:
          "Times New Roman adalah font standar yang sering digunakan untuk dokumen akademik.",
      },
    ],
  },
  {
    id: 3,
    title: "Kenali Interface",
    type: "task",
    icon: "3",
    subtitle: "Eksplorasi 1",
    content: ["Buka Microsoft Word dan temukan elemen-elemen berikut:"],
    tasks: ["Ribbon", "Tab Home", "Tab Layout", "Ruler"],
    note: "📸 Screenshot & kirim ke LMS",
    requireUpload: true,
  },
  {
    id: 4,
    title: "Mini Quiz",
    type: "quiz",
    icon: "4",
    subtitle: "Quiz 2",
    content: [
      "Setelah eksplorasi interface, mari review apa yang sudah kamu temukan:",
    ],
    quiz: [
      {
        question: "Tab untuk mengatur margin ada di:",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Layout", correct: true },
          { label: "c", text: "View" },
        ],
        explanation:
          "Tab Layout berisi pengaturan margin, orientasi, dan ukuran halaman.",
      },
      {
        question: "Font dan paragraph ada di tab:",
        options: [
          { label: "a", text: "Home", correct: true },
          { label: "b", text: "Review" },
          { label: "c", text: "Design" },
        ],
        explanation:
          "Tab Home berisi pengaturan font, paragraph, dan formatting dasar.",
      },
      {
        question:
          "Menu kecil di pojok kiri atas yang berisi ikon Save, Undo, dan Redo secara default disebut:",
        options: [
          { label: "a", text: "Ribbon" },
          { label: "b", text: "Quick Access Toolbar", correct: true },
          { label: "c", text: "Status Bar" },
        ],
        explanation:
          "Quick Access Toolbar menyediakan akses cepat ke perintah yang sering digunakan (seperti Save) di mana pun tab Ribbon yang sedang aktif.",
      },
      {
        question:
          "Bagian di pojok kanan bawah yang berfungsi untuk memperbesar atau memperkecil tampilan dokumen adalah:",
        options: [
          { label: "a", text: "Scroll Bar" },
          { label: "b", text: "Ruler" },
          { label: "c", text: "Zoom Slider", correct: true },
        ],
        explanation:
          "Zoom Slider  memungkinkan pengguna menggeser persentase untuk mengatur ukuran tampilan halaman kerja.",
      },
      {
        question:
          "Nama file dokumen yang sedang aktif ditampilkan pada bagian paling atas tengah jendela disebut:",
        options: [
          { label: "a", text: "Title Bar", correct: true },
          { label: "b", text: "Taskbar" },
          { label: "c", text: "Menu Bar" },
        ],
        explanation:
          "Title Bar (Baris Judul) menampilkan nama dokumen yang sedang dibuka dan nama aplikasi (Word).",
      },
      {
        question:
          "Fitur berbentuk penggaris horizontal dan vertikal untuk membantu mensejajarkan teks atau mengatur indentasi disebut:",
        options: [
          { label: "a", text: "Gridlines" },
          { label: "b", text: "Ruler", correct: true },
          { label: "c", text: "Navigation Pane" },
        ],
        explanation:
          "Ruler (penggaris) membantu mengatur indentasi paragraf, posisi tab, dan margin secara visual.",
      },
      {
        question:
          "Untuk memunculkan panel navigasi (Navigation Pane) atau garis bantu (Gridlines), Anda harus membuka tab:",
        options: [
          { label: "a", text: "References" },
          { label: "b", text: "View", correct: true },
          { label: "c", text: "Mailings" },
        ],
        explanation:
          "Tab View berisi grup 'Show' yang memiliki opsi untuk menampilkan atau menyembunyikan Ruler, Gridlines, dan Navigation Pane.",
      },
    ],
  },
  {
    id: 5,
    title: "Formatting Dasar",
    type: "task",
    icon: "5",
    subtitle: "Eksplorasi 2",
    content: ["Buat dokumen dengan spesifikasi berikut:"],
    tasks: ["Nama file = NIM_P1.docx"],
    checklist: [
      "Font: Times New Roman",
      "Size: 12",
      "Spasi: 1.5",
      "Alignment: Justify",
      "Minimal 3 paragraf",
    ],
    requireUpload: true,
    note: "Isi dokumen harus bertema tentang Bulan Ramadhan",
  },
  {
    id: 6,
    title: "Cek Mandiri",
    type: "quiz",
    icon: "6",
    subtitle: "Self Check",
    content: [
      "Mari review kemampuan mengidentifikasi kesalahan formatting. Download file dari link berikut, buka di MS Word, aktifkan tombol ¶ (Show/Hide Formatting) dan periksa:",
    ],
    hyperlink: {
      url: "/docs/Jam Saku yang Terhenti.docx",
      text: "Download Sample Document",
    },
    quiz: [
      {
        question: "Ada spasi berlebihan?",
        options: [
          { label: "a", text: "Ada", correct: true },
          { label: "b", text: "Tidak ada" },
          { label: "c", text: "Tidak yakin" },
        ],
        explanation:
          "Spasi berlebihan biasanya muncul sebagai simbol titik (·) di mode Show/Hide. Pastikan hanya ada satu spasi antar kata.",
      },
      {
        question: "Ada Enter terlalu banyak?",
        options: [
          { label: "a", text: "Ada", correct: true },
          { label: "b", text: "Tidak ada" },
          { label: "c", text: "Tidak yakin" },
        ],
        explanation:
          "Enter terlalu banyak biasanya muncul sebagai simbol ¶ di mode Show/Hide. Pastikan hanya ada satu Enter antar paragraf.",
      },
      {
        question: "Ada Font berbeda?",
        options: [
          { label: "a", text: "Ada" },
          { label: "b", text: "Tidak ada", correct: true },
          { label: "c", text: "Tidak yakin" },
        ],
        explanation:
          "Font yang berbeda biasanya muncul dengan nama font yang berbeda di mode Show/Hide. Pastikan semua teks memiliki font yang sama.",
      },
    ],
    note: "Perbaiki sendiri sebelum lanjut!",
  },
  {
    id: 7,
    title: "Logika Praktik",
    type: "quiz",
    icon: "7",
    subtitle: "Quiz 3",
    content: [
      "Sekarang mari review logika dan cara kerja efisien di Microsoft Word:",
    ],
    quiz: [
      {
        question:
          "Jika ingin semua teks berubah font sekaligus, lebih efektif:",
        options: [
          { label: "a", text: "Ubah satu per satu" },
          { label: "b", text: "Select All (Ctrl+A)", correct: true },
          { label: "c", text: "Copy paste ulang" },
        ],
        explanation:
          "Ctrl+A memilih semua teks sekaligus, lalu kamu bisa mengubah font dalam satu langkah.",
      },
      {
        question:
          "Jika ingin memindahkan paragraf pertama ke bawah paragraf ketiga, langkah tercepat adalah:",
        options: [
          { label: "a", text: "Hapus dan ketik ulang" },
          { label: "b", text: "Copy dan Paste" },
          { label: "c", text: "Cut dan Paste", correct: true },
        ],
        explanation:
          "Cut (Ctrl+X) menghilangkan teks dari posisi lama dan menyimpannya di clipboard untuk diletakkan (Paste) di posisi baru.",
      },
      {
        question:
          "Untuk membuat dokumen otomatis rapi dan konsisten, fitur apa yang sebaiknya digunakan untuk judul?",
        options: [
          { label: "a", text: "Menebalkan (Bold) manual" },
          { label: "b", text: "Styles", correct: true },
          { label: "c", text: "Menambah ukuran font manual" },
        ],
        explanation:
          "Styles memungkinkan Anda mengatur format judul secara konsisten di seluruh dokumen dan mempermudah pembuatan daftar isi otomatis.",
      },
      {
        question:
          "Jika teks pada halaman 1 meluap sedikit ke halaman 2 dan ingin menjadikannya 1 halaman saja, fitur yang digunakan:",
        options: [
          {
            label: "a",
            text: "Mengurangi margin atau ukuran font",
            correct: true,
          },
          { label: "b", text: "Mengubah orientasi jadi Landscape" },
          { label: "c", text: "Menghapus gambar" },
        ],
        explanation:
          "Mengurangi margin atau sedikit memperkecil font adalah solusi logis agar teks muat dalam satu halaman tanpa mengubah orientasi kertas.",
      },
      {
        question:
          "Saat ingin mengganti kata 'Kucing' menjadi 'Anjing' di seluruh dokumen, gunakanlah:",
        options: [
          { label: "a", text: "Find" },
          { label: "b", text: "Replace", correct: true },
          { label: "c", text: "Undo" },
        ],
        explanation:
          "Fitur Replace (Ctrl+H) memungkinkan Anda mencari kata tertentu dan menggantinya dengan kata lain secara otomatis di seluruh dokumen.",
      },
      {
        question:
          "Jika halaman kerja terasa terlalu kecil dan ingin melihat dokumen secara keseluruhan, Anda sebaiknya:",
        options: [
          { label: "a", text: "Memperkecil Zoom", correct: true },
          { label: "b", text: "Menutup penggaris (Ruler)" },
          { label: "c", text: "Mengubah ukuran kertas" },
        ],
        explanation:
          "Zoom  berfungsi untuk mengatur tingkat perbesaran tampilan dokumen di layar tanpa mengubah ukuran dokumen saat dicetak.",
      },
    ],
  },
  {
    id: 8,
    title: "Page Layout",
    type: "task",
    icon: "8",
    subtitle: "Eksplorasi 3",
    timer: 15,
    content: ["Atur dokumen dengan pengaturan berikut:"],
    checklist: [
      "Ukuran kertas: A4",
      "Margin: 4-3-3-3",
      "Orientation: Portrait",
      "Buat 3 page dengan teks dummy (bebas)",
      "Tambahkan nomor halaman di footer",
    ],
    tasks: ["Nama file = NIM_P2.docx"],
    requireUpload: true,
  },
  {
    id: 9,
    title: "Challenge Case",
    type: "challenge",
    icon: "9",
    subtitle: "Tantangan",
    timer: 15,
    content: ["Saya beri teks acak (tidak rapi). Tugas kamu:"],
    hyperlink: {
      url: "/docs/Pintu di Balik Kabut.docx",
      text: "Download Challenge Case",
    },
    checklist: [
      "Rata kanan kiri (Justify)",
      "Spasi 1.5",
      "Margin benar",
      "Tidak ada spasi manual",
      "Ukuran font 12, Times New Roman",
    ],
    tasks: ["Nama file = NIM_P3.docx"],
    requireUpload: true,
  },
  {
    id: 10,
    title: "Refleksi",
    type: "quiz",
    icon: "10",
    subtitle: "Quiz 4",
    content: [
      "Mari review kembali konsep penting yang sudah kita pelajari hari ini:",
    ],
    quiz: [
      {
        question:
          "Kenapa tidak boleh pakai spasi berkali-kali untuk rata tengah?",
        options: [
          {
            label: "a",
            text: "Karena dokumen jadi tidak konsisten dan sulit diedit",
            correct: true,
          },
          { label: "b", text: "Karena tidak masalah" },
          { label: "c", text: "Karena Word tidak mendukungnya" },
        ],
        explanation:
          "Spasi manual membuat format tidak konsisten dan sulit diedit ulang.",
      },
      {
        question: "Apa fungsi ruler?",
        options: [
          { label: "a", text: "Mengukur panjang dokumen" },
          { label: "b", text: "Mengatur indent dan tab stop", correct: true },
          { label: "c", text: "Menghitung kata" },
        ],
        explanation:
          "Ruler digunakan untuk mengatur indent, margin, dan tab stop secara visual.",
      },
      {
        question: "Format margin standar untuk dokumen akademik adalah:",
        options: [
          { label: "a", text: "4-3-3-3", correct: true },
          { label: "b", text: "2-2-2-2" },
          { label: "c", text: "1-1-1-1" },
        ],
        explanation:
          "Margin 4-3-3-3 (atas 4cm, kanan 3cm, bawah 3cm, kiri 3cm) adalah standar umum untuk dokumen akademik di Indonesia.",
      },
      {
        question: "Spasi yang tepat untuk dokumen akademik adalah:",
        options: [
          { label: "a", text: "Single (1.0)" },
          { label: "b", text: "1.5", correct: true },
          { label: "c", text: "Double (2.0)" },
        ],
        explanation:
          "Spasi 1.5 memberikan keterbacaan yang baik dan merupakan standar untuk sebagian besar dokumen akademik.",
      },
      {
        question: "Fitur Show/Hide (¶) digunakan untuk melihat:",
        options: [
          { label: "a", text: "Gambar tersembunyi" },
          {
            label: "b",
            text: "Formatting marks seperti spasi dan enter",
            correct: true,
          },
          { label: "c", text: "Komentar" },
        ],
        explanation:
          "Show/Hide (¶) menampilkan karakter-karakter tersembunyi seperti spasi, enter, dan tab untuk membantu mengidentifikasi kesalahan formatting.",
      },
      {
        question: "Ukuran kertas standar untuk dokumen adalah:",
        options: [
          { label: "a", text: "A4", correct: true },
          { label: "b", text: "Letter" },
          { label: "c", text: "Legal" },
        ],
        explanation:
          "A4 adalah ukuran kertas standar internasional yang umum digunakan untuk dokumen di Indonesia.",
      },
      {
        question: "Untuk menyimpan dokumen dengan nama baru, gunakan:",
        options: [
          { label: "a", text: "Save (Ctrl+S)" },
          { label: "b", text: "Save As", correct: true },
          { label: "c", text: "Export" },
        ],
        explanation:
          "Save As memungkinkan Anda menyimpan dokumen dengan nama atau lokasi berbeda tanpa menimpa file asli.",
      },
      {
        question:
          "Orientasi kertas yang paling umum untuk dokumen laporan adalah:",
        options: [
          { label: "a", text: "Portrait", correct: true },
          { label: "b", text: "Landscape" },
          { label: "c", text: "Square" },
        ],
        explanation:
          "Portrait (tegak) adalah orientasi standar untuk dokumen laporan dan tulisan akademik.",
      },
      {
        question: "Untuk memilih semua teks di dokumen, gunakan:",
        options: [
          { label: "a", text: "Ctrl+C" },
          { label: "b", text: "Ctrl+A", correct: true },
          { label: "c", text: "Ctrl+X" },
        ],
        explanation:
          "Ctrl+A (Select All) memilih seluruh isi dokumen sekaligus.",
      },
      {
        question: "Perbedaan utama antara Cut dan Copy adalah:",
        options: [
          { label: "a", text: "Cut tidak menyimpan ke clipboard" },
          {
            label: "b",
            text: "Cut menghapus teks dari lokasi asal",
            correct: true,
          },
          { label: "c", text: "Copy lebih cepat dari Cut" },
        ],
        explanation:
          "Cut (Ctrl+X) memindahkan teks dengan menghapusnya dari lokasi asal, sedangkan Copy (Ctrl+C) hanya menyalin tanpa menghapus.",
      },
    ],
  },
  {
    id: 11,
    title: "Penutup",
    type: "quiz",
    icon: "11",
    subtitle: "Refleksi Akhir",
    content: ["Tuliskan refleksi mengenai pembelajaran hari ini."],
    quiz: [
      {
        question: "Tuliskan 1 hal baru yang kamu pelajari hari ini:",
        questionType: "free-text",
        placeholder:
          "Contoh: Saya belajar cara menggunakan styles untuk formatting otomatis...",
        explanation: "Terima kasih atas refleksimu! Terus semangat belajar! ",
      },
      {
        question:
          "Tuliskan 1 hal dari Microsoft Word yang belum kamu pahami dan ingin kita bahas lebih lanjut:",
        questionType: "free-text",
        placeholder:
          "Contoh: Saya masih belum paham cara membuat nomor halaman otomatis...",
        explanation:
          "Pertanyaan yang bagus! Hal tersebut akan kita bahas di pertemuan berikutnya.",
      },
    ],
    note: "Selamat! Kamu telah menyelesaikan Pertemuan 1. ",
  },
];
