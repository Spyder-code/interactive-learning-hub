import { slides as slidesP1 } from "./slides";
import { slidesP2 } from "./slides-p2";
import type { Slide } from "./slides";

export interface Meeting {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  icon: string;
  duration: number;
  slides: Slide[];
}

export const meetings: Meeting[] = [
  {
    id: "pertemuan-1",
    number: 1,
    title: "Pertemuan 1",
    subtitle: "Microsoft Word — Self Learning",
    icon: "📝",
    duration: 90,
    slides: slidesP1,
  },
  {
    id: "pertemuan-2",
    number: 2,
    title: "Pertemuan 2",
    subtitle: "Struktur Dokumen Akademik Profesional",
    icon: "📄",
    duration: 90,
    slides: slidesP2,
  },
];
