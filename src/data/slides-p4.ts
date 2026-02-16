import React from "react";
import type { Slide } from "./slides";
import { FiCheckCircle, FiEdit } from "react-icons/fi";

export const slidesP4: Slide[] = [
  {
    id: 1,
    title: "Opening Problem",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Kasus Nyata",
    content: [
      "Mahasiswa membuat 30 halaman laporan.",
      "Setelah revisi, halaman berubah.",
      "Daftar isi harus diketik ulang.",
    ],
    note: "❓ Kenapa bisa begitu?",
  },
  {
    id: 2,
    title: "Quiz Diagnostik",
    type: "quiz",
    icon: React.createElement(FiEdit),
    subtitle: "Quiz 1",
    quiz: [
      {
        question: "Daftar isi otomatis bekerja berdasarkan:",
        options: [
          { label: "a", text: "Bold text" },
          { label: "b", text: "Font size besar" },
          { label: "c", text: "Heading styles", correct: true },
          { label: "d", text: "Manual numbering" },
        ],
        explanation:
          "Table of Contents otomatis menggunakan Heading Styles untuk mendeteksi struktur dokumen.",
      },
    ],
  },
  {
    id: 3,
    title: "Eksperimen 1: Cek Struktur",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Check Document Structure",
    timer: 10,
    tasks: [
      "Buka dokumen pertemuan 3",
      "Aktifkan Navigation Pane",
      "Periksa: Apakah semua BAB dan Subbab muncul?",
    ],
    requireUpload: true,
    note: "💡 Jika tidak → berarti belum pakai Heading. ⏱ 10 menit",
  },
  {
    id: 4,
    title: "Perbaiki Struktur",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Fix Document Structure",
    timer: 15,
    tasks: [
      "Jadikan BAB → Heading 1",
      "Subbab → Heading 2",
      "Sub-subbab → Heading 3",
    ],
    requireUpload: true,
    note: "⚠️ JANGAN format manual. ⏱ 15 menit",
  },
  {
    id: 5,
    title: "Insert Table of Contents",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Eksplorasi",
    timer: 10,
    content: ["Langkah eksplorasi:"],
    tasks: [
      "Buat halaman baru untuk Daftar Isi",
      "Klik References",
      "Pilih Table of Contents (Automatic)",
    ],
    requireUpload: true,
    note: "⏱ 10 menit",
  },
  {
    id: 6,
    title: "Quiz Cepat",
    type: "quiz",
    icon: React.createElement(FiEdit),
    subtitle: "Quiz 2",
    quiz: [
      {
        question: "Jika isi dokumen berubah, cara update daftar isi:",
        options: [
          { label: "a", text: "Hapus lalu buat ulang" },
          { label: "b", text: "Klik Update Table", correct: true },
          { label: "c", text: "Refresh Word" },
        ],
        explanation:
          "Update Table akan menyegarkan daftar isi dengan perubahan terbaru tanpa perlu membuat ulang.",
      },
    ],
  },
  {
    id: 7,
    title: "Eksperimen 2: Simulasi Revisi",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Test Auto-Update",
    timer: 10,
    tasks: [
      "Tambahkan 1 subbab baru",
      "Lihat apakah daftar isi berubah otomatis",
      "Klik Update Table",
    ],
    requireUpload: true,
    note: "⏱ 10 menit. Tujuan: Mahasiswa sadar sistem otomatis.",
  },
  {
    id: 8,
    title: "Level 2 Challenge",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Advanced Customization",
    timer: 15,
    content: ["Modifikasi:"],
    tasks: [
      "Ubah format titik-titik (leader)",
      "Ubah level heading yang muncul",
      "Atur hanya sampai Heading 2",
    ],
    requireUpload: true,
    note: "⏱ 15 menit",
  },
  {
    id: 9,
    title: "Kesalahan Umum",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Common Mistakes",
    content: [
      "❌ Tidak pakai heading",
      "❌ Nomor bab manual",
      "❌ Tidak update table",
    ],
    note: "Diskusi singkat 5 menit",
  },
  {
    id: 10,
    title: "Mini Project",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Complete Document",
    timer: 20,
    content: ["Buat dokumen 4–5 halaman dengan:"],
    checklist: [
      "Cover",
      "Kata Pengantar",
      "Daftar Isi otomatis",
      "BAB I & II",
      "Subbab",
    ],
    note: "⏱ 20 menit",
  },
  {
    id: 11,
    title: "Refleksi",
    type: "quiz",
    icon: "🟢",
    subtitle: "Quiz 3",
    quiz: [
      {
        question: "Kenapa Heading sangat penting?",
        options: [
          {
            label: "a",
            text: "Untuk membuat dokumen terstruktur dan bisa auto-generate TOC",
            correct: true,
          },
          { label: "b", text: "Hanya untuk estetika" },
          { label: "c", text: "Untuk menambah jumlah halaman" },
        ],
        explanation:
          "Heading memberikan struktur dokumen yang penting untuk navigasi dan pembuatan daftar isi otomatis.",
      },
      {
        question: "Apa keuntungan daftar isi otomatis?",
        options: [
          {
            label: "a",
            text: "Terbarui otomatis saat dokumen berubah",
            correct: true,
          },
          { label: "b", text: "Lebih cepat diketik" },
          { label: "c", text: "Bisa diedit warnanya" },
        ],
        explanation:
          "Daftar isi otomatis akan update sendiri saat struktur dokumen berubah.",
      },
      {
        question: "Apa risiko jika format manual?",
        options: [
          {
            label: "a",
            text: "Perlu update manual setiap ada perubahan",
            correct: true,
          },
          { label: "b", text: "File lebih besar" },
          { label: "c", text: "Tidak bisa dicetak" },
        ],
        explanation:
          "Format manual memerlukan update manual setiap kali ada perubahan, membuang waktu dan rawan error.",
      },
    ],
  },
];
