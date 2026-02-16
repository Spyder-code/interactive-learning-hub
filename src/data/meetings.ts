import React from "react";
import { slides as slidesP1 } from "./slides";
import { slidesP2 } from "./slides-p2";
import { slidesP3 } from "./slides-p3";
import { slidesP4 } from "./slides-p4";
import { slidesP5 } from "./slides-p5";
import type { Slide } from "./slides";
import {
  FiFileText,
  FiFile,
  FiScissors,
  FiBookmark,
  FiImage,
} from "react-icons/fi";

export interface Meeting {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  duration: number;
  slides: Slide[];
}

export const meetings: Meeting[] = [
  {
    id: "pertemuan-1",
    number: 1,
    title: "Pertemuan 1",
    subtitle: "Microsoft Word — Self Learning",
    icon: React.createElement(FiFileText, { className: "text-primary" }),
    duration: 90,
    slides: slidesP1,
  },
  {
    id: "pertemuan-2",
    number: 2,
    title: "Pertemuan 2",
    subtitle: "Struktur Dokumen Akademik Profesional",
    icon: React.createElement(FiFile, { className: "text-primary" }),
    duration: 90,
    slides: slidesP2,
  },
  {
    id: "pertemuan-3",
    number: 3,
    title: "Pertemuan 3",
    subtitle: "Mastering Section Break & Page Number",
    icon: React.createElement(FiScissors, { className: "text-primary" }),
    duration: 90,
    slides: slidesP3,
  },
  {
    id: "pertemuan-4",
    number: 4,
    title: "Pertemuan 4",
    subtitle: "Table of Contents Otomatis (Profesional Academic Format)",
    icon: React.createElement(FiBookmark, { className: "text-primary" }),
    duration: 90,
    slides: slidesP4,
  },
  {
    id: "pertemuan-5",
    number: 5,
    title: "Pertemuan 5",
    subtitle: "Caption & Daftar Gambar/Tabel Otomatis",
    icon: React.createElement(FiImage, { className: "text-primary" }),
    duration: 90,
    slides: slidesP5,
  },
];
