import React from "react";
import type { Slide } from "./slides";
import { FiCheckCircle, FiEdit } from "react-icons/fi";

export const slidesP5: Slide[] = [
  {
    id: 1,
    title: "Opening Problem",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Kasus Nyata",
    content: [
      "Mahasiswa punya 15 gambar.",
      "Saat tambah 1 gambar di tengah,",
      "nomor gambar berantakan.",
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
        question: "Nomor gambar yang benar dibuat dengan:",
        options: [
          { label: "a", text: "Diketik manual" },
          { label: "b", text: "Insert Caption", correct: true },
          { label: "c", text: "Copy paste nomor sebelumnya" },
        ],
        explanation:
          "Insert Caption menciptakan penomoran otomatis yang akan update sendiri saat ada perubahan.",
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
      "Masukkan 3 gambar",
      "Nomori manual: Gambar 1, Gambar 2, Gambar 3",
      "Tambahkan 1 gambar di tengah",
    ],
    requireUpload: true,
    note: "⏱ 10 menit. Tujuan: Mahasiswa sadar masalah sistem manual.",
    content: ["Apa yang terjadi?"],
  },
  {
    id: 4,
    title: "Konsep Inti",
    type: "content",
    icon: React.createElement(FiCheckCircle, { className: "text-success" }),
    subtitle: "Understanding Captions",
    content: [
      "Caption = sistem penomoran otomatis berbasis field Word.",
      "Tanpa Caption → tidak bisa buat daftar gambar otomatis.",
    ],
  },
  {
    id: 5,
    title: "Eksplorasi 2: Insert Caption",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Hands-On Practice",
    timer: 15,
    tasks: [
      "Klik gambar",
      "References → Insert Caption",
      "Pilih label: Gambar",
      "Posisi: Below selected item",
      "Lakukan untuk 3 gambar",
    ],
    requireUpload: true,
    note: "⏱ 15 menit",
  },
  {
    id: 6,
    title: "Mini Quiz",
    type: "quiz",
    icon: React.createElement(FiEdit),
    subtitle: "Quiz 2",
    quiz: [
      {
        question: "Jika ingin nomor berubah otomatis setelah tambah gambar:",
        options: [
          { label: "a", text: "Update Field", correct: true },
          { label: "b", text: "Rename manual" },
          { label: "c", text: "Restart Word" },
        ],
        explanation:
          "Update Field akan menyegarkan semua penomoran otomatis di dokumen.",
      },
    ],
  },
  {
    id: 7,
    title: "Level 2 Challenge",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Multiple Caption Types",
    timer: 15,
    content: ["Tambahkan:"],
    tasks: ["2 tabel", "Beri caption label: Tabel"],
    requireUpload: true,
    note: "⏱ 15 menit. Periksa: Apakah nomor terpisah antara Gambar dan Tabel?",
  },
  {
    id: 8,
    title: "Membuat Daftar Gambar",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Table of Figures",
    timer: 10,
    tasks: [
      "Buat halaman baru",
      "References → Insert Table of Figures",
      "Pilih label: Gambar",
    ],
    requireUpload: true,
    note: "⏱ 10 menit",
  },
  {
    id: 9,
    title: "Simulasi Revisi",
    type: "task",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Test Auto-Update",
    timer: 10,
    content: ["Tambahkan 1 gambar di tengah."],
    tasks: [
      "Klik: Update Field",
      "Klik: Update Entire Table",
      "Periksa perubahan",
    ],
    requireUpload: true,
    note: "⏱ 10 menit",
  },
  {
    id: 10,
    title: "Quiz Refleksi",
    type: "quiz",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Quiz 3",
    quiz: [
      {
        question: "Kenapa tidak boleh nomor manual?",
        options: [
          {
            label: "a",
            text: "Karena tidak akan update otomatis saat ada perubahan",
            correct: true,
          },
          { label: "b", text: "Karena terlihat tidak profesional" },
          { label: "c", text: "Karena lebih lambat" },
        ],
        explanation:
          "Nomor manual tidak akan update otomatis dan harus diubah manual setiap ada perubahan struktur.",
      },
      {
        question: "Apa beda Table of Contents dan Table of Figures?",
        options: [
          {
            label: "a",
            text: "TOC untuk heading, TOF untuk gambar/tabel",
            correct: true,
          },
          { label: "b", text: "Tidak ada bedanya" },
          { label: "c", text: "TOC hanya untuk buku" },
        ],
        explanation:
          "Table of Contents dibuat dari heading, Table of Figures dari caption gambar/tabel.",
      },
      {
        question: "Kapan harus update field?",
        options: [
          {
            label: "a",
            text: "Setelah menambah/mengubah gambar atau tabel",
            correct: true,
          },
          { label: "b", text: "Hanya saat akan mencetak" },
          { label: "c", text: "Tidak perlu, otomatis" },
        ],
        explanation:
          "Field harus di-update manual setelah perubahan untuk menampilkan informasi terbaru.",
      },
    ],
  },
  {
    id: 11,
    title: "Mini Project Akhir Word",
    type: "challenge",
    icon: React.createElement(FiCheckCircle, { className: "text-info" }),
    subtitle: "Complete Professional Document",
    timer: 20,
    content: ["Buat dokumen berisi:"],
    checklist: [
      "Cover",
      "Daftar Isi otomatis",
      "BAB I",
      "3 Gambar dengan caption",
      "2 Tabel dengan caption",
      "Daftar Gambar otomatis",
    ],
    note: "⏱ 20 menit. 🎓 Dengan ini, mahasiswa sudah menguasai: Section Break, Page Number berbeda, Heading, TOC, Caption, Daftar Gambar. Ini sudah level 'rapi skripsi'.",
  },
];
