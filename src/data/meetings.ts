import React from "react";
import { slides as slidesP1 } from "./slides";
import { slidesP2 } from "./slides-p2";
import { slidesP3 } from "./slides-p3";
import { slidesP4 } from "./slides-p4";
import { slidesP5 } from "./slides-p5";
import { slides as slidesP6 } from "./slides-p6";
import { slides as slidesP7 } from "./slides-p7";
import { slides as slidesP8 } from "./slides-p8";
import { slides as slidesP9 } from "./slides-p9";
import { slides as slidesP10 } from "./slides-p10";
import { slides as slidesP11 } from "./slides-p11";
import { slides as slidesP12 } from "./slides-p12";
import { slides as slidesP13 } from "./slides-p13";
import { slides as slidesP14 } from "./slides-p14";
import { slides as slidesP15 } from "./slides-p15";
import { slides as slidesP16 } from "./slides-p16";
import { slides as slidesP17 } from "./slides-p17";
import { slides as slidesP18 } from "./slides-18";
import type { Slide } from "./slides";
import {
  FiFileText,
  FiFile,
  FiScissors,
  FiBookmark,
  FiImage,
  FiGrid,
  FiBarChart2,
  FiTrendingUp,
  FiAlignLeft,
  FiType,
  FiPrinter,
  FiMonitor,
  FiFilm,
  FiLink,
  FiBook,
  FiEdit3,
  FiArchive,
  FiDatabase,
  FiAward,
  FiTarget,
} from "react-icons/fi";
import { slidesP21 } from "./slides-21";
import { slidesP20 } from "./slides-20";
import { slidesP19 } from "./slides-19";

export interface Meeting {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  duration: number;
  slides: Slide[];
  openedAt?: string; // ISO date string - meeting dibuka mulai tanggal ini
  closedAt?: string; // ISO date string - meeting ditutup setelah tanggal ini
}

// Helper function to convert meeting ID to number
// "pertemuan-1" => 1, "pertemuan-2" => 2, etc.
export const getMeetingNumber = (meetingId: string): number => {
  // If meetingId is already a number string, return it
  const directNumber = parseInt(meetingId);
  if (!isNaN(directNumber)) return directNumber;

  // Extract number from "pertemuan-X" format
  const match = meetingId.match(/\d+/);
  if (match) return parseInt(match[0]);

  // Fallback: try to find meeting by ID and return its number
  const meeting = meetings.find((m) => m.id === meetingId);
  return meeting?.number || 1;
};

// Helper function to convert meeting number to ID
// 1 => "pertemuan-1", 2 => "pertemuan-2", etc.
export const getMeetingId = (meetingNumber: number): string => {
  const meeting = meetings.find((m) => m.number === meetingNumber);
  return meeting?.id || `pertemuan-${meetingNumber}`;
};

const pad = (n: number) => String(n).padStart(2, "0");

function toLocalISO(d: Date) {
  const tzOffset = -d.getTimezoneOffset();
  const sign = tzOffset >= 0 ? "+" : "-";
  const tzHours = Math.floor(Math.abs(tzOffset) / 60);
  const tzMinutes = Math.abs(tzOffset) % 60;
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}:00${sign}${pad(tzHours)}:${pad(tzMinutes)}`;
}

const now = new Date();
const openedAtDate = new Date(now);
openedAtDate.setHours(15, 0, 0, 0);
const closedAtDate = new Date(now);
closedAtDate.setHours(23, 59, 0, 0);


export const meetings: Meeting[] = [
  {
    id: "pertemuan-1",
    number: 1,
    title: "Pertemuan 1",
    subtitle: "Microsoft Word — Self Learning",
    icon: React.createElement(FiFileText, { className: "text-primary" }),
    duration: 90,
    slides: slidesP1,
    openedAt: toLocalISO(new Date("2026-05-05T19:00:00")),
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")),
  },
  {
    id: "pertemuan-2",
    number: 2,
    title: "Pertemuan 2",
    subtitle: "Struktur Dokumen Akademik Profesional",
    icon: React.createElement(FiFile, { className: "text-primary" }),
    duration: 90,
    slides: slidesP2,
    openedAt: toLocalISO(new Date("2026-05-05T19:00:00")), // Dibuka mulai 1 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-3",
    number: 3,
    title: "Pertemuan 3",
    subtitle: "Mastering Section Break & Page Number",
    icon: React.createElement(FiScissors, { className: "text-primary" }),
    duration: 90,
    slides: slidesP3,
    openedAt: toLocalISO(new Date("2026-05-06T19:00:00")), // Dibuka mulai 2 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-4",
    number: 4,
    title: "Pertemuan 4",
    subtitle: "Table of Contents Otomatis (Profesional Academic Format)",
    icon: React.createElement(FiBookmark, { className: "text-primary" }),
    duration: 90,
    slides: slidesP4,
    openedAt: toLocalISO(new Date("2026-05-06T19:00:00")), // Dibuka mulai 2 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-5",
    number: 5,
    title: "Pertemuan 5",
    subtitle: "Caption & Daftar Gambar/Tabel Otomatis",
    icon: React.createElement(FiImage, { className: "text-primary" }),
    duration: 90,
    slides: slidesP5,
    openedAt: toLocalISO(new Date("2026-05-07T19:00:00")), // Dibuka mulai 6 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-6",
    number: 6,
    title: "Pertemuan 6",
    subtitle: "Pengenalan Microsoft Excel",
    icon: React.createElement(FiGrid, { className: "text-primary" }),
    duration: 90,
    slides: slidesP6,
    openedAt: toLocalISO(new Date("2026-05-07T19:00:00")), // Dibuka mulai 6 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-7",
    number: 7,
    title: "Pertemuan 7",
    subtitle: "Excel: Struktur & Data",
    icon: React.createElement(FiBarChart2, { className: "text-primary" }),
    duration: 90,
    slides: slidesP7,
    openedAt: toLocalISO(new Date("2026-05-08T15:00:00")), // Dibuka mulai 7 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-8",
    number: 8,
    title: "Pertemuan 8",
    subtitle: "Excel: Otomatisasi & Format",
    icon: React.createElement(FiTrendingUp, { className: "text-primary" }),
    duration: 90,
    slides: slidesP8,
    openedAt: toLocalISO(new Date("2026-05-08T15:00:00")), // Dibuka mulai 8 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-9",
    number: 9,
    title: "Pertemuan 9",
    subtitle: "Excel: Perataan & Rumus",
    icon: React.createElement(FiAlignLeft, { className: "text-primary" }),
    duration: 90,
    slides: slidesP9,
    openedAt: toLocalISO(new Date("2026-05-11T15:00:00")), // Dibuka mulai 8 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-10",
    number: 10,
    title: "Pertemuan 10",
    subtitle: "Excel: Fungsi Teks & Visual",
    icon: React.createElement(FiType, { className: "text-primary" }),
    duration: 90,
    slides: slidesP10,
    openedAt: toLocalISO(new Date("2026-05-11T15:00:00")), // Dibuka mulai 8 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-11",
    number: 11,
    title: "Pertemuan 11",
    subtitle: "Excel: Mencetak Dokumen",
    icon: React.createElement(FiPrinter, { className: "text-primary" }),
    duration: 90,
    slides: slidesP11,
    openedAt: toLocalISO(new Date("2026-05-12T19:00:00")), // Dibuka mulai 9 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-12",
    number: 12,
    title: "Pertemuan 12",
    subtitle: "Pengenalan Microsoft PowerPoint",
    icon: React.createElement(FiMonitor, { className: "text-primary" }),
    duration: 90,
    slides: slidesP12,
    openedAt: toLocalISO(new Date("2026-05-12T19:00:00")), // Dibuka mulai 10 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-13",
    number: 13,
    title: "Pertemuan 13",
    subtitle: "PowerPoint: Visual & Gerak",
    icon: React.createElement(FiFilm, { className: "text-primary" }),
    duration: 90,
    slides: slidesP13,
    openedAt: toLocalISO(new Date("2026-05-13T19:00:00")), // Dibuka mulai 10 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-14",
    number: 14,
    title: "Pertemuan 14",
    subtitle: "PowerPoint: Interaktivitas & Finalisasi",
    icon: React.createElement(FiLink, { className: "text-primary" }),
    duration: 90,
    slides: slidesP14,
    openedAt: toLocalISO(new Date("2026-05-13T19:00:00")), // Dibuka mulai 11 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 27 Feb 2024, jam 18:00
  },
  {
    id: "pertemuan-15",
    number: 15,
    title: "Pertemuan 15",
    subtitle: "Pengenalan Manajemen Referensi - Mendeley",
    icon: React.createElement(FiBook, { className: "text-primary" }),
    duration: 90,
    slides: slidesP15,
    openedAt: toLocalISO(new Date("2026-05-18T15:00:00")), // Dibuka mulai 13 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-16",
    number: 16,
    title: "Pertemuan 16",
    subtitle: "Mendeley: Manajemen & Sitasi",
    icon: React.createElement(FiEdit3, { className: "text-primary" }),
    duration: 90,
    slides: slidesP16,
    openedAt: toLocalISO(new Date("2026-05-18T15:00:00")), // Dibuka mulai 13 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-17",
    number: 17,
    title: "Pertemuan 17",
    subtitle: "Pengenalan Zotero",
    icon: React.createElement(FiArchive, { className: "text-primary" }),
    duration: 90,
    slides: slidesP17,
    openedAt: toLocalISO(new Date("2026-05-19T19:00:00")), // Dibuka mulai 14 Apr 2026, jam 19:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-18",
    number: 18,
    title: "Pertemuan 18",
    subtitle: "Zotero: Manajemen & Sitasi",
    icon: React.createElement(FiDatabase, { className: "text-primary" }),
    duration: 90,
    slides: slidesP18,
    openedAt: toLocalISO(new Date("2026-05-19T19:00:00")), // Dibuka mulai 15 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 2 Mar 2024, jam 18:00
  },
  {
    id: "pertemuan-19",
    number: 19,
    title: "Pertemuan 19",
    subtitle: "Pengenalan LaTeX",
    icon: React.createElement(FiAward, { className: "text-primary" }),
    duration: 90,
    slides: slidesP19,
    openedAt: toLocalISO(new Date("2026-05-20T19:00:00")), // Dibuka mulai 15 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-20",
    number: 20,
    title: "Pertemuan 20",
    subtitle: "Last Exam: Final Quiz",
    icon: React.createElement(FiTarget, { className: "text-primary" }),
    duration: 90,
    slides: slidesP20,
    openedAt: toLocalISO(new Date("2026-05-20T19:00:00")), // Dibuka mulai 15 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
  {
    id: "pertemuan-21",
    number: 21,
    title: "Pertemuan 21",
    subtitle: "Final Project Remedial",
    icon: React.createElement(FiTarget, { className: "text-primary" }),
    duration: 90,
    slides: slidesP21,
    openedAt: toLocalISO(new Date("2026-05-20T19:00:00")), // Dibuka mulai 15 Apr 2026, jam 15:00
    closedAt: toLocalISO(new Date("2026-06-10T23:59:00")), // Ditutup setelah 10 Mei 2026, jam 23:59
  },
];
