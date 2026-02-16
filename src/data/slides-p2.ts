import type { Slide } from "./slides";

export const slidesP2: Slide[] = [
  {
    id: 1,
    title: "Opening Challenge",
    type: "content",
    icon: "🟢",
    subtitle: "Tantangan Hari Ini",
    content: ["Hari ini kamu akan membuat dokumen yang terlihat seperti:"],
    checklist: [
      "Proposal",
      "Makalah",
      "Laporan resmi",
    ],
    note: "🎯 Target: Dokumen 3 halaman dengan struktur profesional. Tanpa bantuan dosen menjelaskan panjang.",
  },
  {
    id: 2,
    title: "Pre-Check Quiz",
    type: "quiz",
    icon: "📝",
    subtitle: "Quiz 1",
    timer: 5,
    quiz: [
      {
        question: "Untuk membuat halaman berbeda (misalnya cover tanpa nomor), kita butuh…",
        options: [
          { label: "a", text: "Page break" },
          { label: "b", text: "Section break", correct: true },
          { label: "c", text: "Enter berkali-kali" },
        ],
        explanation: "Section Break memisahkan dokumen menjadi bagian-bagian independen dengan pengaturan berbeda.",
      },
      {
        question: "Header dan Footer digunakan untuk…",
        options: [
          { label: "a", text: "Menambahkan gambar di tengah halaman" },
          { label: "b", text: "Menampilkan informasi berulang di setiap halaman", correct: true },
          { label: "c", text: "Mengubah font dokumen" },
        ],
        explanation: "Header & Footer menampilkan informasi konsisten (nama, nomor halaman) di setiap halaman.",
      },
    ],
  },
  {
    id: 3,
    title: "Header & Footer",
    type: "task",
    icon: "📄",
    subtitle: "Eksplorasi 1",
    timer: 15,
    content: ["Buka dokumen baru dan tambahkan elemen berikut:"],
    tasks: [
      "Header berisi: Nama kamu",
      "Footer berisi: Page number",
      "Halaman pertama TANPA nomor halaman",
    ],
    note: "💡 Petunjuk: Cari di tab Insert.",
  },
  {
    id: 4,
    title: "Mini Quiz",
    type: "quiz",
    icon: "⚡",
    subtitle: "Quiz 2",
    quiz: [
      {
        question: "Di mana kita menemukan pengaturan Header & Footer?",
        options: [
          { label: "a", text: "Tab Home" },
          { label: "b", text: "Tab Insert", correct: true },
          { label: "c", text: "Tab Layout" },
        ],
        explanation: "Header & Footer dapat ditemukan dan diatur melalui tab Insert.",
      },
      {
        question: "Bagaimana cara membuat halaman pertama tanpa nomor?",
        options: [
          { label: "a", text: "Hapus manual nomor di halaman pertama" },
          { label: "b", text: "Centang 'Different First Page'", correct: true },
          { label: "c", text: "Buat file terpisah untuk cover" },
        ],
        explanation: "Opsi 'Different First Page' memungkinkan halaman pertama memiliki header/footer berbeda.",
      },
    ],
  },
  {
    id: 5,
    title: "Section Break",
    type: "task",
    icon: "✂️",
    subtitle: "Eksplorasi 2",
    timer: 20,
    content: ["Buat dokumen dengan 3 halaman:"],
    tasks: [
      "Halaman 1 = Cover (tanpa nomor)",
      "Halaman 2 = Nomor mulai dari 1",
      "Halaman 3 = Lanjutan otomatis",
    ],
    note: "💡 Petunjuk: Cari \"Breaks\" di tab Layout.",
  },
  {
    id: 6,
    title: "Refleksi Singkat",
    type: "content",
    icon: "💭",
    subtitle: "Refleksi",
    content: [
      "Kenapa Section Break penting untuk skripsi?",
      "Tuliskan jawaban 2–3 kalimat.",
    ],
    note: "📝 Pikirkan bagaimana skripsi memiliki halaman cover, daftar isi, dan isi dengan format berbeda.",
  },
  {
    id: 7,
    title: "Styles (Paling Penting)",
    type: "task",
    icon: "🎨",
    subtitle: "Eksplorasi 3",
    timer: 15,
    content: ["Buat struktur dokumen berikut:"],
    tasks: [
      "BAB I PENDAHULUAN → Heading 1",
      "1.1 Latar Belakang → Heading 2",
    ],
    checklist: [
      "Gunakan Heading 1",
      "Gunakan Heading 2",
      "JANGAN format manual (bold/perbesar font manual)",
    ],
  },
  {
    id: 8,
    title: "Quiz Logika",
    type: "quiz",
    icon: "🧠",
    subtitle: "Quiz 3",
    quiz: [
      {
        question: "Kenapa lebih baik pakai Styles dibanding bold manual dan perbesar font manual?",
        options: [
          { label: "a", text: "Karena Styles otomatis konsisten dan bisa digunakan untuk Daftar Isi", correct: true },
          { label: "b", text: "Karena bold manual lebih lambat saja" },
          { label: "c", text: "Tidak ada bedanya" },
        ],
        explanation: "Styles memastikan format konsisten dan memungkinkan pembuatan Daftar Isi otomatis.",
      },
    ],
  },
  {
    id: 9,
    title: "Navigation Pane",
    type: "task",
    icon: "🧭",
    subtitle: "Eksplorasi 4",
    timer: 10,
    content: ["Aktifkan Navigation Pane dan periksa:"],
    checklist: [
      "Apakah heading kamu muncul terstruktur?",
      "Jika tidak → berarti format salah, perbaiki!",
    ],
    note: "💡 Buka tab View → centang Navigation Pane.",
  },
  {
    id: 10,
    title: "Challenge Case",
    type: "challenge",
    icon: "🏆",
    subtitle: "Tantangan",
    timer: 20,
    content: ["Buat dokumen lengkap dengan struktur:"],
    tasks: [
      "Halaman Cover",
      "Daftar Isi",
      "BAB I",
      "BAB II",
    ],
    checklist: [
      "Gunakan Styles (Heading 1 & 2)",
      "Gunakan Section Break",
      "Page Number berbeda per section",
    ],
  },
  {
    id: 11,
    title: "Quiz Akhir",
    type: "quiz",
    icon: "📋",
    subtitle: "Quiz 4",
    quiz: [
      {
        question: "Apa fungsi Section Break?",
        options: [
          { label: "a", text: "Memisahkan dokumen menjadi bagian dengan pengaturan independen", correct: true },
          { label: "b", text: "Menghapus halaman" },
          { label: "c", text: "Menambahkan gambar" },
        ],
        explanation: "Section Break memisahkan dokumen agar setiap bagian bisa punya format halaman berbeda.",
      },
      {
        question: "Kenapa Heading penting?",
        options: [
          { label: "a", text: "Hanya untuk membuat teks besar" },
          { label: "b", text: "Untuk struktur dokumen dan pembuatan Daftar Isi otomatis", correct: true },
          { label: "c", text: "Untuk mengubah warna teks" },
        ],
        explanation: "Heading memberi struktur dan memungkinkan Navigation Pane serta Daftar Isi otomatis.",
      },
      {
        question: "Apa beda Page Break dan Section Break?",
        options: [
          { label: "a", text: "Page Break hanya pindah halaman, Section Break memisahkan pengaturan format", correct: true },
          { label: "b", text: "Tidak ada bedanya" },
          { label: "c", text: "Page Break lebih canggih" },
        ],
        explanation: "Page Break hanya memindahkan ke halaman baru, sedangkan Section Break memungkinkan pengaturan format berbeda.",
      },
    ],
  },
  {
    id: 12,
    title: "Exit Ticket",
    type: "content",
    icon: "🎉",
    subtitle: "Penutup",
    content: [
      "Tuliskan 1 fitur Word yang baru kamu pahami hari ini.",
      "Dan 1 fitur yang masih membingungkan.",
    ],
    note: "Selamat! Kamu telah menyelesaikan Pertemuan 2. 🎊",
  },
];
