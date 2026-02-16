import React from "react";
import type { Slide } from "./slides";
import { FiCheckCircle, FiEdit } from "react-icons/fi";

export const slidesP3: Slide[] = [
  {
    id: 1,
    title: "Opening Problem",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Kasus Nyata",
    content: [
      "Mahasiswa membuat skripsi:",
      "• Cover tidak boleh ada nomor halaman",
      "• Kata Pengantar pakai i, ii, iii",
      "• BAB I mulai dari 1",
    ],
    note: "❓ Kenapa sering gagal?",
  },
  {
    id: 2,
    title: "Quiz Diagnostik",
    type: "quiz",
    icon: React.createElement(FiEdit),
    subtitle: "Quiz 1",
    quiz: [
      {
        question:
          "Kalau nomor halaman berubah semua saat diedit, kemungkinan karena:",
        options: [
          { label: "a", text: "Tidak pakai Section Break", correct: true },
          { label: "b", text: "Salah font" },
          { label: "c", text: "Salah margin" },
        ],
        explanation:
          "Section Break memungkinkan setiap bagian dokumen memiliki pengaturan nomor halaman yang berbeda.",
      },
    ],
  },
  {
    id: 3,
    title: "Eksperimen 1: Buat Salah Dulu",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Learning by Mistake",
    timer: 10,
    tasks: [
      "Buat 3 halaman",
      "Tambahkan nomor halaman",
      "Coba hapus nomor di halaman 1",
    ],
    requireUpload: true,
    note: "⏱ 10 menit. Tujuan: Mahasiswa sadar masalahnya.",
    content: ["Apa yang terjadi?"],
  },
  {
    id: 4,
    title: "Konsep Inti",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Understanding Sections",
    content: [
      "Section = bagian dokumen yang bisa punya aturan berbeda.",
      "Tanpa Section Break → semua halaman satu sistem.",
    ],
  },
  {
    id: 5,
    title: "Eksperimen 2: Perbaiki",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Hands-On Practice",
    timer: 20,
    tasks: [
      "Hapus semua nomor halaman",
      "Tambahkan Section Break (Next Page) di akhir halaman 1",
      "Masuk ke footer halaman 2",
      "Klik 'Link to Previous' → MATIKAN",
      "Tambahkan page number",
    ],
    requireUpload: true,
    note: "⏱ 20 menit",
  },
  {
    id: 6,
    title: "Mini Quiz",
    type: "quiz",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Quiz 2",
    quiz: [
      {
        question: "Kenapa harus mematikan 'Link to Previous'?",
        options: [
          {
            label: "a",
            text: "Agar halaman bisa diatur secara terpisah",
            correct: true,
          },
          { label: "b", text: "Untuk menambah kecepatan Word" },
          { label: "c", text: "Supaya file lebih kecil" },
        ],
        explanation:
          "Link to Previous menyambungkan footer antar section. Mematikannya memungkinkan pengaturan independen.",
      },
    ],
  },
  {
    id: 7,
    title: "Level 2 Challenge",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Advanced Task",
    timer: 25,
    content: ["Buat:"],
    tasks: [
      "Halaman 1 = Cover (tanpa nomor)",
      "Halaman 2–3 = i, ii (Romawi kecil)",
      "Halaman 4 = mulai 1",
    ],
    requireUpload: true,
    note: "💡 Petunjuk: Page Number → Format Page Numbers. ⏱ 25 menit",
  },
  {
    id: 8,
    title: "Checkpoint",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Verification",
    checklist: [
      "Section Break benar",
      "Link to Previous mati",
      "Format angka berbeda",
      "Nomor mulai dari 1 di BAB I",
    ],
  },
  {
    id: 9,
    title: "Quiz Refleksi",
    type: "quiz",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Quiz 3",
    quiz: [
      {
        question: "Apa fungsi Section Break?",
        options: [
          {
            label: "a",
            text: "Memisahkan dokumen menjadi bagian dengan aturan berbeda",
            correct: true,
          },
          { label: "b", text: "Menambah halaman baru" },
          { label: "c", text: "Mengubah warna halaman" },
        ],
        explanation:
          "Section Break membagi dokumen menjadi section yang dapat memiliki pengaturan berbeda.",
      },
      {
        question: "Kapan kita perlu mematikan Link to Previous?",
        options: [
          {
            label: "a",
            text: "Saat ingin header/footer berbeda di section berbeda",
            correct: true,
          },
          { label: "b", text: "Saat dokumen terlalu panjang" },
          { label: "c", text: "Saat mengedit font" },
        ],
        explanation:
          "Link to Previous harus dimatikan agar footer bisa berbeda antar section.",
      },
      {
        question: "Apa beda Page Break dan Section Break?",
        options: [
          {
            label: "a",
            text: "Page Break hanya pindah halaman, Section Break membagi dokumen menjadi bagian independen",
            correct: true,
          },
          { label: "b", text: "Tidak ada bedanya" },
          { label: "c", text: "Page Break lebih profesional" },
        ],
        explanation:
          "Page Break hanya memulai halaman baru, Section Break memungkinkan pengaturan berbeda per bagian.",
      },
    ],
  },
  {
    id: 10,
    title: "Final Mini Project",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Complete Document",
    timer: 20,
    content: ["Buat dokumen dengan struktur:"],
    tasks: ["Cover", "Kata Pengantar", "Daftar Isi", "BAB I"],
    requireUpload: true,
    checklist: [
      "Cover tanpa nomor",
      "Kata Pengantar pakai i",
      "BAB I mulai dari 1",
    ],
    note: "⏱ 20 menit",
  },
];
