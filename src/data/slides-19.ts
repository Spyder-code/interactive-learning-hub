import { Slide } from "./slides";

export const slidesP19: Slide[] = [
  // --- BAGIAN 1: PENDAHULUAN & SETUP (Slide 1-4) ---
  {
    id: 1,
    title: "Pengenalan LaTeX",
    type: "content",
    icon: "1",
    subtitle: "Standar Penulisan Akademik Global",
    content: [
      "**LaTeX** (dibaca: Lah-tech atau Lay-tech) adalah sistem penyiapan dokumen berkualitas tinggi.",
      "Sangat populer di kalangan akademisi, ilmuwan, dan insinyur untuk menulis jurnal, skripsi, dan buku.",
      "**Perbedaan Utama dengan Word:**",
      "- Word = **WYSIWYG** (What You See Is What You Get) - Anda mendesain sambil mengetik.",
      "- LaTeX = **WYSIWYM** (What You See Is What You Mean) - Anda menulis 'kode/struktur', lalu sistem yang me-render desainnya menjadi PDF yang sangat rapi.",
    ],
  },
  {
    id: 2,
    title: "Memulai dengan Overleaf",
    type: "content",
    icon: "2",
    subtitle: "Editor LaTeX Berbasis Cloud",
    content: [
      "Untuk menggunakan LaTeX, kita butuh *compiler* dan *editor*.",
      "Daripada menginstal software berat seperti MiKTeX, kita akan menggunakan **Overleaf**.",
      "**Keunggulan Overleaf:**",
      "- Gratis dan berbasis web (tidak perlu install).",
      "- Fitur kolaborasi realtime (seperti Google Docs).",
      "- Ribuan template jurnal dan skripsi siap pakai.",
      "Kunjungi: **www.overleaf.com**",
    ],
  },
  {
    id: 3,
    title: "Struktur Dasar Dokumen LaTeX",
    type: "content",
    icon: "3",
    subtitle: "Preamble & Body",
    content: [
      "Setiap file LaTeX (berakhiran `.tex`) dibagi menjadi dua bagian utama:",
      "1. **Preamble (Pengaturan):** Berada di paling atas, sebelum `\\begin{document}`. Tempat mengatur jenis kertas dan memanggil paket (package).",
      "2. **Body (Isi):** Berada di antara `\\begin{document}` dan `\\end{document}`. Di sinilah teks diketik.",
      "**Aturan Emas:** Setiap perintah (command) di LaTeX selalu diawali dengan *backslash* (`\\`).",
    ],
  },
  {
    id: 4,
    title: "Tugas 1: Hello World",
    type: "task",
    icon: "4",
    subtitle: "Praktik Overleaf - 10 Menit",
    content: ["Mari buat dokumen LaTeX pertama Anda!"],
    checklist: [
      "Buka overleaf.com dan buat akun / Login dengan Google.",
      "Klik **New Project** > **Blank Project**.",
      "Beri nama proyek: 'Latihan_LaTeX_NamaAnda'.",
      "Di panel kode (tengah), ubah teks judul di bagian `\\title{}` menjadi 'Belajar LaTeX Pertama'.",
      "Ketik 'Halo Dunia! Ini dokumen LaTeX pertama saya.' di bawah `\\maketitle`.",
      "Klik tombol hijau **Recompile** (atau tekan Ctrl+Enter).",
    ],
    tasks: [
      "Download hasil PDF-nya (ikon panah ke bawah di sebelah Recompile) dan upload.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 2: FORMATTING, STRUKTUR & LAYOUT (Slide 5-10) ---
  {
    id: 5,
    title: "Formatting Teks Dasar",
    type: "content",
    icon: "5",
    subtitle: "Tebal, Miring, Paragraf Baru",
    content: [
      "Cara mengubah gaya huruf di LaTeX:",
      "- **Tebal (Bold):** Gunakan `\\textbf{teks di sini}`",
      "- *Miring (Italic):* Gunakan `\\textit{teks di sini}`",
      "- Garis Bawah (Underline): Gunakan `\\underline{teks di sini}`",
      "**Paragraf Baru:** Untuk membuat paragraf baru, biarkan **satu baris kosong** (tekan Enter 2x) di editor. Jangan gunakan `\\\\` untuk paragraf baru!",
    ],
  },
  {
    id: 6,
    title: "Struktur Bab & Sub-bab",
    type: "content",
    icon: "6",
    subtitle: "Sectioning Otomatis",
    content: [
      "Penomoran bab di LaTeX dilakukan secara otomatis. Cukup gunakan perintah berikut:",
      "- `\\section{Judul Bab}` (Menghasilkan: 1. Judul Bab)",
      "- `\\subsection{Judul Sub-bab}` (Menghasilkan: 1.1. Judul Sub-bab)",
      "- `\\subsubsection{Judul Sub-sub-bab}` (Menghasilkan: 1.1.1.)",
      "Jika tidak ingin diberi nomor (misal untuk Kata Pengantar), tambahkan tanda bintang: `\\section*{Kata Pengantar}`.",
    ],
  },
  {
    id: 7,
    title: "Pengaturan Margin Halaman",
    type: "content",
    icon: "7",
    subtitle: "Package Geometry",
    content: [
      "Secara default, margin LaTeX cukup lebar. Untuk mengubahnya sesuai standar skripsi (misal: A4, margin 3cm), kita gunakan paket `geometry`.",
      "**Letakkan kode ini di Preamble (sebelum begin document):**",
      "`\\usepackage[a4paper, margin=3cm]{geometry}`",
      "Anda juga bisa mengatur tiap sisi secara spesifik:",
      "`\\usepackage[a4paper, left=4cm, right=3cm, top=3cm, bottom=3cm]{geometry}`",
    ],
  },
  {
    id: 8,
    title: "Daftar Isi Otomatis",
    type: "content",
    icon: "8",
    subtitle: "Keajaiban LaTeX",
    content: [
      "Di Word, Daftar Isi butuh beberapa langkah. Di LaTeX, hanya butuh **SATU KATA**.",
      "Ketik `\\tableofcontents` tepat di bawah `\\begin{document}` (setelah `\\maketitle`).",
      "LaTeX akan membaca seluruh `\\section` dan `\\subsection` Anda lalu men-generate Daftar Isi beserta nomor halamannya secara otomatis.",
      "Gunakan perintah `\\newpage` setelahnya agar isi bab dimulai di halaman baru.",
    ],
  },
  {
    id: 9,
    title: "Tugas 2: Layout & Struktur",
    type: "task",
    icon: "9",
    subtitle: "Praktik Margin & TOC - 15 Menit",
    content: ["Modifikasi dokumen Tugas 1 Anda."],
    checklist: [
      "Tambahkan paket geometry di Preamble: `\\usepackage[a4paper, margin=2.5cm]{geometry}`.",
      "Buat Daftar Isi otomatis menggunakan `\\tableofcontents` dan lanjutkan dengan `\\newpage`.",
      "Buat `\\section{Pendahuluan}` dan tulis 1 paragraf sembarang.",
      "Buat `\\section{Tinjauan Pustaka}` dan berikan 2 `\\subsection` di dalamnya.",
      "Recompile **2 KALI** (Terkadang LaTeX butuh 2x compile agar halaman Daftar Isi ter-update).",
    ],
    tasks: ["Upload file PDF hasil struktur ini."],
    requireUpload: true,
  },

  // --- BAGIAN 3: LISTS & MATEMATIKA (Slide 10-14) ---
  {
    id: 10,
    title: "Membuat Daftar (Lists)",
    type: "content",
    icon: "10",
    subtitle: "Itemize & Enumerate",
    content: [
      "Environment digunakan untuk blok teks khusus. Diawali `\\begin{...}` dan diakhiri `\\end{...}`.",
      "**Bullets (Titik):**",
      "`\\begin{itemize}` \n `\\item Apel` \n `\\item Jeruk` \n `\\end{itemize}`",
      "**Numbering (Angka 1, 2, 3):**",
      "`\\begin{enumerate}` \n `\\item Kesatu` \n `\\item Kedua` \n `\\end{enumerate}`",
    ],
  },
  {
    id: 11,
    title: "Kekuatan Utama LaTeX",
    type: "content",
    icon: "11",
    subtitle: "Penulisan Rumus Matematika",
    content: [
      "LaTeX adalah raja dalam tipografi matematika.",
      "Ada dua mode matematika:",
      "1. **Inline Math:** Rumus menyatu di dalam teks. Apit dengan tanda Dolar `$ ... $`.",
      "   *Contoh:* Rumus energi adalah `$E = mc^2$`.",
      "2. **Display Math:** Rumus berdiri sendiri di tengah baris. Gunakan `\\[ ... \\]` atau environment `\\begin{equation} ... \\end{equation}` jika ingin bernomor.",
    ],
  },
  {
    id: 12,
    title: "Sintaks Matematika Lanjutan",
    type: "content",
    icon: "12",
    subtitle: "Pecahan, Akar, dan Simbol",
    content: [
      "Beberapa perintah penting dalam math mode:",
      "- **Pangkat/Superscript:** `x^{2}`",
      "- **Indeks/Subscript:** `H_{2}O`",
      "- **Pecahan (Fraction):** `\\frac{atas}{bawah}`",
      "- **Akar Kuadrat:** `\\sqrt{x}` atau `\\sqrt[3]{x}`",
      "- **Simbol Yunani:** `\\alpha`, `\\beta`, `\\sum`, `\\int`",
      "*Wajib panggil `\\usepackage{amsmath}` di Preamble untuk fitur matematika yang kompleks.*",
    ],
  },
  {
    id: 13,
    title: "Tugas 3: Menulis Rumus",
    type: "task",
    icon: "13",
    subtitle: "Praktik Matematika - 10 Menit",
    content: ["Tambahkan `\\section{Rumus Matematika}` di dokumen Anda."],
    checklist: [
      "Tulis satu paragraf dengan Inline Math: 'Luas lingkaran dirumuskan dengan $L = \\pi r^2$'.",
      "Buat Rumus Kuadrat (ABC) menggunakan `\\begin{equation}`.",
      "Kode rumus ABC: `x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`",
      "Buat daftar bernomor (enumerate) di bawahnya berisi 2 penjelasan variabel.",
    ],
    tasks: ["Upload PDF hasil compile rumus matematika ini."],
    requireUpload: true,
  },

  // --- BAGIAN 4: OBJEK VISUAL & CROSS-REFERENCING (Slide 14-18) ---
  {
    id: 14,
    title: "Menyisipkan Gambar",
    type: "content",
    icon: "14",
    subtitle: "Package graphicx",
    content: [
      "Wajib panggil `\\usepackage{graphicx}` di Preamble.",
      "Di Overleaf, Anda harus meng-upload gambar ke panel kiri (file tree) terlebih dahulu.",
      "**Kode menyisipkan gambar:**",
      "`\\begin{figure}[h]`",
      "`  \\centering`",
      "`  \\includegraphics[width=0.6\\textwidth]{nama_file.jpg}`",
      "`  \\caption{Ini judul gambar}`",
      "`\\end{figure}`",
    ],
  },
  {
    id: 15,
    title: "Membuat Tabel",
    type: "content",
    icon: "15",
    subtitle: "Environment Tabular",
    content: [
      "Tabel di LaTeX disusun manual baris per baris.",
      "- `&` digunakan untuk memisahkan kolom.",
      "- `\\\\` digunakan untuk pindah baris.",
      "- `\\hline` digunakan untuk membuat garis horizontal.",
      "**Contoh:** `\\begin{tabular}{|c|c|}` (artinya 2 kolom rata tengah dengan garis vertikal pinggir).",
      "*Tips: Gunakan web seperti **tablesgenerator.com** untuk men-generate kode tabel LaTeX dengan mudah.*",
    ],
  },
  {
    id: 16,
    title: "Referensi Silang (Cross-Referencing)",
    type: "content",
    icon: "16",
    subtitle: "Label & Ref",
    content: [
      "Di Word, jika Gambar 1 berubah menjadi Gambar 2, teks 'Lihat Gambar 1' harus diubah manual. Di LaTeX, itu otomatis!",
      "**Langkah:**",
      "1. Beri label pada objek: `\\caption{Logo Kampus} \\label{fig:logo}`",
      "2. Panggil di dalam teks: `Seperti yang terlihat pada Gambar \\ref{fig:logo}...`",
      "Jika gambar bergeser nomornya, `\\ref` akan otomatis menyesuaikan diri setelah direcompile.",
    ],
  },
  {
    id: 17,
    title: "Tugas 4: Gambar & Referensi",
    type: "task",
    icon: "17",
    subtitle: "Praktik Cross-Ref - 10 Menit",
    content: ["Uji kemampuan menyisipkan gambar dan menautkannya."],
    checklist: [
      "Upload 1 gambar ke Overleaf.",
      "Sisipkan gambar tersebut menggunakan `\\begin{figure}`. Beri `\\caption` dan `\\label{fig:gambar1}`.",
      "Di paragraf sebelum gambar, tulis kalimat: 'Berdasarkan Gambar \\ref{fig:gambar1}, kita dapat melihat bahwa...'",
      "Recompile 2x agar tanda '??' pada referensi berubah menjadi angka yang benar.",
    ],
    tasks: [
      "Upload PDF yang menampilkan gambar dan referensi angkanya dengan benar.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 5: BIBLIOGRAFI & INTEGRASI MENDELEY/ZOTERO (Slide 18-21) ---
  {
    id: 18,
    title: "Daftar Pustaka di LaTeX",
    type: "content",
    icon: "18",
    subtitle: "Mengenal BibTeX",
    content: [
      "LaTeX menggunakan sistem bernama **BibTeX** untuk daftar pustaka.",
      "Alih-alih mengetik daftar pustaka manual, Anda menyimpan data referensi dalam file terpisah berakhiran `.bib` (misal: `referensi.bib`).",
      "File `.bib` berisi kode informasi jurnal. Anda tidak perlu mengetik ini manual, **Mendeley atau Zotero bisa mengekspornya untuk Anda!**",
    ],
  },
  {
    id: 19,
    title: "Integrasi Mendeley/Zotero ke Overleaf",
    type: "content",
    icon: "19",
    subtitle: "Jembatan Manajemen Referensi",
    content: [
      "**Cara kerja:**",
      "1. Buka Zotero/Mendeley Anda.",
      "2. Blok referensi yang ingin dipakai > Klik Kanan > **Export Items**.",
      "3. Pilih format **BibTeX (*.bib)** > Save file tersebut ke laptop.",
      "4. Buka Overleaf > Upload file `.bib` tersebut ke project Anda.",
    ],
  },
  {
    id: 20,
    title: "Melakukan Sitasi (Citation)",
    type: "content",
    icon: "20",
    subtitle: "Cite & Bibliography",
    content: [
      "Setiap referensi di file `.bib` punya 'Citation Key' (misal: `purwoko2014`).",
      "**Di dalam teks LaTeX:**",
      "Gunakan perintah `\\cite{purwoko2014}` untuk memunculkan sitasi.",
      "**Di akhir dokumen (untuk memunculkan daftar pustaka):**",
      "`\\bibliographystyle{apa}` (Pilih style, misal apa atau ieee)",
      "`\\bibliography{nama_file_bib_anda}` (Tanpa ekstensi .bib)",
    ],
  },
  {
    id: 21,
    title: "Tugas 5: Sitasi Otomatis",
    type: "task",
    icon: "21",
    subtitle: "Praktik BibTeX - 15 Menit",
    content: ["Mari gabungkan ilmu Bab 4/5 dengan Bab LaTeX."],
    checklist: [
      "Export 2 referensi dari Zotero/Mendeley Anda ke format `.bib`.",
      "Upload file `.bib` tersebut ke Overleaf Anda.",
      "Tulis 1 kalimat dan beri sitasi menggunakan perintah `\\cite{...}`.",
      "Panggil daftar pustaka di bagian bawah dengan `\\bibliographystyle{plain}` dan `\\bibliography{namafile}`.",
    ],
    tasks: [
      "Upload PDF hasil compile yang menampilkan sitasi [1] dan Daftar Pustaka di bawahnya.",
    ],
    requireUpload: true,
  },

  // --- BAGIAN 6: FINAL PROJECT & EVALUASI (Slide 22-25) ---
  {
    id: 22,
    title: "Final Project LaTeX",
    type: "challenge",
    icon: "22",
    subtitle: "Membuat Full Mini-Paper",
    content: [
      "**Tantangan Akhir:** Buatlah sebuah template artikel ilmiah mini yang lengkap (1-2 halaman).",
      "Proyek ini akan merangkum seluruh perintah LaTeX yang telah Anda pelajari.",
    ],
  },
  {
    id: 23,
    title: "Checklist Final Project",
    type: "task",
    icon: "23",
    subtitle: "Ketentuan Dokumen",
    content: [
      "Pastikan file Overleaf Anda memenuhi syarat berikut sebelum di-download:",
    ],
    checklist: [
      "Menggunakan `\\usepackage{geometry}` (Margin 3cm tiap sisi).",
      "Memiliki `\\title`, `\\author`, `\\date` dan dipanggil dengan `\\maketitle`.",
      "Memiliki Daftar Isi otomatis (`\\tableofcontents`).",
      "Memiliki minimal 3 `\\section` (Pendahuluan, Pembahasan, Kesimpulan).",
      "Terdapat 1 Gambar dengan caption dan direferensikan di teks (`\\ref`).",
      "Terdapat 1 Tabel dan 1 Rumus Matematika (Equation).",
      "Terdapat minimal 2 Sitasi (`\\cite`) yang bersumber dari file `.bib` dan menghasilkan Daftar Pustaka.",
    ],
    tasks: [
      "Upload file **Source Code (.tex)** DAN file **PDF** hasil Final Project Anda.",
    ],
    requireUpload: true,
  },
  {
    id: 24,
    title: "Quiz Akhir LaTeX",
    type: "quiz",
    icon: "24",
    subtitle: "Evaluasi Komprehensif (15 Soal)",
    content: ["Uji pemahaman Anda tentang semua fitur LaTeX."],
    quiz: [
      {
        question:
          "Lingkungan utama (environment) di mana teks dokumen LaTeX harus diketik adalah di antara...",
        options: [
          { label: "a", text: "\\start{doc} dan \\finish{doc}" },
          {
            label: "b",
            text: "\\begin{document} dan \\end{document}",
            correct: true,
          },
          { label: "c", text: "\\head dan \\body" },
        ],
        explanation:
          "Setiap teks yang ingin ditampilkan harus berada di dalam environment document.",
      },
      {
        question:
          "Perintah untuk membatalkan penomoran otomatis pada judul bab adalah dengan menambahkan...",
        options: [
          { label: "a", text: "Tanda Pagar (#)" },
          { label: "b", text: "Tanda Bintang (*)", correct: true },
          { label: "c", text: "Tanda Persen (%)" },
        ],
        explanation:
          "\\section*{Judul} akan membuat judul bab tanpa nomor urut.",
      },
      {
        question:
          "Paket (package) apa yang digunakan untuk mengatur ukuran kertas dan margin secara spesifik?",
        options: [
          { label: "a", text: "graphicx" },
          { label: "b", text: "amsmath" },
          { label: "c", text: "geometry", correct: true },
        ],
        explanation:
          "Package geometry memudahkan modifikasi dimensi halaman dan margin.",
      },
      {
        question:
          "Berapa kali kita biasanya harus menekan 'Recompile' setelah menambahkan perintah \\tableofcontents agar daftar isi muncul dengan benar?",
        options: [
          { label: "a", text: "1 kali" },
          { label: "b", text: "2 kali", correct: true },
          { label: "c", text: "Tidak perlu recompile" },
        ],
        explanation:
          "Kompilasi pertama mengumpulkan informasi struktur, kompilasi kedua menuliskannya ke halaman Daftar Isi.",
      },
      {
        question: "Simbol untuk membuat pecahan matematika di LaTeX adalah...",
        options: [
          { label: "a", text: "\\divide" },
          { label: "b", text: "\\frac", correct: true },
          { label: "c", text: "\\split" },
        ],
        explanation: "\\frac{numerator}{denominator} digunakan untuk pecahan.",
      },
      {
        question: "Environment untuk membuat list angka (1, 2, 3...) adalah...",
        options: [
          { label: "a", text: "itemize" },
          { label: "b", text: "enumerate", correct: true },
          { label: "c", text: "list" },
        ],
        explanation:
          "Enumerate men-generate numbered list, sedangkan itemize men-generate bullet list.",
      },
      {
        question:
          "Untuk merujuk (cross-reference) sebuah gambar secara otomatis, kombinasi perintah yang dipakai adalah...",
        options: [
          { label: "a", text: "\\caption dan \\cite" },
          { label: "b", text: "\\label dan \\ref", correct: true },
          { label: "c", text: "\\mark dan \\link" },
        ],
        explanation:
          "\\label menandai objek, \\ref memanggil nomor objek tersebut dalam teks.",
      },
      {
        question: "Perintah ganda backslash (\\\\) di LaTeX berfungsi untuk...",
        options: [
          { label: "a", text: "Komentar teks" },
          { label: "b", text: "Pindah baris (Line break)", correct: true },
          { label: "c", text: "Memulai dokumen" },
        ],
        explanation:
          "\\\\ memaksa teks pindah ke baris bawahnya tanpa membuat paragraf baru.",
      },
      {
        question:
          "Apa ekstensi file untuk menyimpan database referensi/daftar pustaka di LaTeX?",
        options: [
          { label: "a", text: ".tex" },
          { label: "b", text: ".bib", correct: true },
          { label: "c", text: ".doc" },
        ],
        explanation:
          "BibTeX menggunakan ekstensi file .bib untuk menyimpan metadata referensi.",
      },
      {
        question: "Perintah untuk memanggil sitasi di dalam teks adalah...",
        options: [
          { label: "a", text: "\\quote{...}" },
          { label: "b", text: "\\cite{...}", correct: true },
          { label: "c", text: "\\ref{...}" },
        ],
        explanation:
          "\\cite{citation_key} akan menghasilkan referensi sesuai style yang dipilih (misal [1] atau (Nama, Tahun)).",
      },
      {
        question: "Di mana kita mendeklarasikan \\bibliographystyle{...}?",
        options: [
          { label: "a", text: "Di Preamble" },
          {
            label: "b",
            text: "Di tempat dimana Daftar Pustaka ingin ditampilkan (sebelum \\bibliography)",
            correct: true,
          },
          { label: "c", text: "Di luar dokumen" },
        ],
        explanation:
          "Deklarasi style dan pemanggilan file .bib dilakukan di bagian akhir dokumen tempat daftar pustaka dicetak.",
      },
      {
        question:
          "Simbol apa yang digunakan sebagai pemisah antar kolom dalam environment tabular (tabel)?",
        options: [
          { label: "a", text: "|" },
          { label: "b", text: "&", correct: true },
          { label: "c", text: ";" },
        ],
        explanation:
          "Ampersand (&) berfungsi sebagai tabulator antar kolom dalam tabel atau matriks.",
      },
      {
        question: "Apa kegunaan tanda Persen (%) dalam penulisan kode LaTeX?",
        options: [
          { label: "a", text: "Membuat rumus persentase" },
          {
            label: "b",
            text: "Menjadikan teks sebagai komentar (tidak di-render ke PDF)",
            correct: true,
          },
          { label: "c", text: "Membesarkan ukuran huruf" },
        ],
        explanation:
          "Karakter % mengabaikan semua teks di sebelah kanannya hingga baris berakhir.",
      },
      {
        question:
          "Jika gambar yang kita masukkan dengan \\includegraphics terlalu besar, atribut apa yang ditambah?",
        options: [
          { label: "a", text: "[width=...]", correct: true },
          { label: "b", text: "{scale=...}" },
          { label: "c", text: "[zoom=...]" },
        ],
        explanation:
          "Atribut opsional seperti [width=0.5\\textwidth] digunakan untuk men-skalakan gambar.",
      },
      {
        question: "Perintah \\maketitle berfungsi untuk...",
        options: [
          { label: "a", text: "Menyimpan file" },
          {
            label: "b",
            text: "Mencetak blok Judul, Penulis, dan Tanggal di halaman PDF",
            correct: true,
          },
          { label: "c", text: "Membuat daftar isi" },
        ],
        explanation:
          "Setelah mendefinisikan \\title dan \\author di Preamble, \\maketitle wajib dipanggil di dalam document untuk menampilkannya.",
      },
    ],
  },
  {
    id: 25,
    title: "Penutup Modul LaTeX",
    type: "content",
    icon: "25",
    subtitle: "Selamat!",
    content: [
      "Anda telah berhasil menyelesaikan pengenalan komprehensif LaTeX dari nol hingga integrasi Daftar Pustaka.",
      "Kemampuan LaTeX sangat dihargai di dunia akademik internasional dan penelitian sains.",
      "**Saran Lanjutan:** Eksplorasi template (IEEE, Elsevier) di Overleaf untuk mempercepat penulisan jurnal Anda di masa depan.",
      "Terima kasih dan semoga sukses dalam penyusunan tugas akhir/riset Anda!",
    ],
  },
];
