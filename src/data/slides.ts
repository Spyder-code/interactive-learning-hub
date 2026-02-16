export type SlideType = "content" | "quiz" | "task" | "challenge";

export interface QuizOption {
  label: string;
  text: string;
  correct?: boolean;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
  explanation?: string;
}

export interface Slide {
  id: number;
  title: string;
  type: SlideType;
  icon: string;
  subtitle?: string;
  content?: string[];
  checklist?: string[];
  tasks?: string[];
  quiz?: QuizQuestion[];
  timer?: number; // minutes
  note?: string;
}

export const slides: Slide[] = [
  {
    id: 1,
    title: "Tantangan 90 Menit",
    type: "content",
    icon: "🟢",
    subtitle: "Opening Challenge",
    content: ["Hari ini kamu harus bisa membuat:"],
    checklist: [
      "Dokumen akademik rapi",
      "Tanpa spasi manual",
      "Tanpa enter berlebihan",
      "Dengan format standar kampus",
    ],
    note: "👉 Tidak ada ceramah panjang. Kamu akan eksplorasi sendiri.",
  },
  {
    id: 2,
    title: "Pre-Test",
    type: "quiz",
    icon: "📝",
    subtitle: "Quiz 1",
    timer: 5,
    quiz: [
      {
        question: "Fungsi Save As adalah…",
        options: [
          { label: "a", text: "Menyimpan file dengan nama/lokasi baru", correct: true },
          { label: "b", text: "Menghapus file lama" },
          { label: "c", text: "Membuka file baru" },
        ],
        explanation: "Save As memungkinkan kamu menyimpan file dengan nama atau lokasi yang berbeda.",
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
        explanation: "Justify membuat teks rata kanan-kiri, standar untuk dokumen akademik.",
      },
    ],
  },
  {
    id: 3,
    title: "Kenali Interface",
    type: "task",
    icon: "🔍",
    subtitle: "Eksplorasi 1",
    content: ["Buka Microsoft Word dan temukan elemen-elemen berikut:"],
    tasks: ["Ribbon", "Tab Home", "Tab Layout", "Ruler"],
    note: "📸 Screenshot & kirim ke LMS",
  },
  {
    id: 4,
    title: "Mini Quiz",
    type: "quiz",
    icon: "⚡",
    subtitle: "Quiz 2",
    quiz: [
      {
        question: "Tab untuk mengatur margin ada di:",
        options: [
          { label: "a", text: "Insert" },
          { label: "b", text: "Layout", correct: true },
          { label: "c", text: "View" },
        ],
        explanation: "Tab Layout berisi pengaturan margin, orientasi, dan ukuran halaman.",
      },
      {
        question: "Font dan paragraph ada di tab:",
        options: [
          { label: "a", text: "Home", correct: true },
          { label: "b", text: "Review" },
          { label: "c", text: "Design" },
        ],
        explanation: "Tab Home berisi pengaturan font, paragraph, dan formatting dasar.",
      },
    ],
  },
  {
    id: 5,
    title: "Formatting Dasar",
    type: "task",
    icon: "✏️",
    subtitle: "Eksplorasi 2",
    content: ["Buat dokumen dengan spesifikasi berikut:"],
    tasks: [
      "Judul (Bold, 14, Center)",
      "Nama & NIM",
      "2 paragraf isi",
    ],
    checklist: [
      "Font: Times New Roman",
      "Size: 12",
      "Spasi: 1.5",
      "Alignment: Justify",
    ],
  },
  {
    id: 6,
    title: "Cek Mandiri",
    type: "task",
    icon: "🔎",
    subtitle: "Self Check",
    content: ["Aktifkan tombol ¶ (Show/Hide Formatting) dan periksa:"],
    checklist: [
      "Ada spasi berlebihan?",
      "Ada enter terlalu banyak?",
      "Ada font berbeda?",
    ],
    note: "Perbaiki sendiri sebelum lanjut!",
  },
  {
    id: 7,
    title: "Logika Praktik",
    type: "quiz",
    icon: "🧠",
    subtitle: "Quiz 3",
    quiz: [
      {
        question: "Jika ingin semua teks berubah font sekaligus, lebih efektif:",
        options: [
          { label: "a", text: "Ubah satu per satu" },
          { label: "b", text: "Select All (Ctrl+A)", correct: true },
          { label: "c", text: "Copy paste ulang" },
        ],
        explanation: "Ctrl+A memilih semua teks sekaligus, lalu kamu bisa mengubah font dalam satu langkah.",
      },
    ],
  },
  {
    id: 8,
    title: "Page Layout",
    type: "task",
    icon: "📄",
    subtitle: "Eksplorasi 3",
    timer: 15,
    content: ["Atur dokumen dengan pengaturan berikut:"],
    checklist: [
      "Ukuran kertas: A4",
      "Margin: 4-3-3-3",
      "Orientation: Portrait",
      "Page Number ditambahkan",
    ],
  },
  {
    id: 9,
    title: "Challenge Case",
    type: "challenge",
    icon: "🏆",
    subtitle: "Tantangan",
    timer: 15,
    content: ["Saya beri teks acak (tidak rapi). Tugas kamu:"],
    checklist: [
      "Rata kanan kiri (Justify)",
      "Spasi 1.5",
      "Margin benar",
      "Tidak ada spasi manual",
    ],
  },
  {
    id: 10,
    title: "Refleksi",
    type: "quiz",
    icon: "💭",
    subtitle: "Quiz 4",
    quiz: [
      {
        question: "Kenapa tidak boleh pakai spasi berkali-kali untuk rata tengah?",
        options: [
          { label: "a", text: "Karena dokumen jadi tidak konsisten dan sulit diedit", correct: true },
          { label: "b", text: "Karena tidak masalah" },
          { label: "c", text: "Karena Word tidak mendukungnya" },
        ],
        explanation: "Spasi manual membuat format tidak konsisten dan sulit diedit ulang.",
      },
      {
        question: "Apa fungsi ruler?",
        options: [
          { label: "a", text: "Mengukur panjang dokumen" },
          { label: "b", text: "Mengatur indent dan tab stop", correct: true },
          { label: "c", text: "Menghitung kata" },
        ],
        explanation: "Ruler digunakan untuk mengatur indent, margin, dan tab stop secara visual.",
      },
    ],
  },
  {
    id: 11,
    title: "Mini Project",
    type: "challenge",
    icon: "🎯",
    subtitle: "Assessment",
    timer: 20,
    content: ["Buat 1 halaman esai dengan format akademik lengkap:"],
    tasks: ["Judul", "3 paragraf", "Format akademik lengkap"],
    note: "File dikumpulkan: NIM_Nama_P1.docx",
  },
  {
    id: 12,
    title: "Penutup",
    type: "content",
    icon: "🎉",
    subtitle: "Refleksi Akhir",
    content: [
      "Tuliskan 1 hal baru yang kamu pelajari hari ini.",
      "Dan 1 fitur Word yang belum kamu pahami.",
    ],
    note: "Selamat! Kamu telah menyelesaikan Pertemuan 1. 🎊",
  },
];
