import ExcelJS from "exceljs";
import * as XLSX from "xlsx";

// ==================== KONSTANTA TEMPLATE (sesuai 26439.xlsx) ====================

const REPORT_META = {
  judul:
    "REKAP KEGIATAN PER TUTOR PROGRAM PELATIHAN INFORMATION AND COMMUNICATION TECHNOLOGY (ICT)",
  subJudulKiri: "BAGI MAHASISWA ICT GELOMBANG",
  subJudulKanan: "TAHUN 2026 UIN SUNAN AMPEL SURABAYA",
  skText: "(Sesuai dengan SK Rektor Nomor 451 Tahun 2026 )",
  gelombang: "IV",
  namaTutor: "Muhammad Aziz Almi",
  namaKelas: 26439,
  kepalaJabatan: "Kepala PUSTIPD,",
  kepalaNama: "Dr. Achmad Teguh Wibowo, MT., MTCNA, MTCRE",
};

const TOTAL_PERTEMUAN = 20;
const DURASI_MENIT = 90;
const DOKUMENTASI_NIM = "20260101";

const HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
const BULAN = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

const FONT_TITLE = { name: "Times New Roman", size: 12, bold: true };
const FONT_TNR12 = { name: "Times New Roman", size: 12 };
const FONT_TNR11 = { name: "Times New Roman", size: 11 };
const FONT_TNR11B = { name: "Times New Roman", size: 11, bold: true };

const THIN = { style: "thin" };
const BORDER_ALL = { top: THIN, left: THIN, bottom: THIN, right: THIN };
const FILL_GRAY = {
  type: "pattern",
  pattern: "solid",
  fgColor: { argb: "FFD8D8D8" },
};

// Tinggi baris terakhir tiap blok foto DOKUMENTASI (persis template)
const DOK_LAST_ROW_HEIGHTS = [7.5, 23.25, 24, 18.75, 15.75, 19.5, 16.5, 14.25, 25.5, 30];

// ==================== HELPER TANGGAL/JAM ====================

// Parse "YYYY-MM-DD HH:MM:SS" tanpa konversi timezone (jam apa adanya dari DB)
function parseDbDateTime(value) {
  if (!value) return null;
  const match = String(value).match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/,
  );
  if (!match) return null;
  const [, y, mo, d, h, mi] = match.map(Number);
  return { y, mo, d, h, mi };
}

function fmtTanggal(t) {
  return `${String(t.d).padStart(2, "0")} ${BULAN[t.mo - 1]} ${t.y}`;
}

function fmtHari(t) {
  return HARI[new Date(t.y, t.mo - 1, t.d).getDay()];
}

function fmtJam(h, mi) {
  return `${String(h).padStart(2, "0")}.${String(mi).padStart(2, "0")}`;
}

function fmtRentangJam(t, durasiMenit) {
  const start = fmtJam(t.h, t.mi);
  const total = t.h * 60 + t.mi + durasiMenit;
  const end = fmtJam(Math.floor(total / 60) % 24, total % 60);
  return `${start}-${end}`;
}

// ==================== BUILDER ====================

/**
 * meetings: [{ meeting_number, opened_at }] (opened_at string "YYYY-MM-DD HH:MM:SS")
 * images:   [{ meetingNumber, buffer, extension }] extension: png|jpeg|gif
 */
export function buildTeacherReportWorkbook({ meetings = [], images = [] }) {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "ICT Learning";
  workbook.created = new Date();

  // Data pertemuan 1..20
  const rows = [];
  for (let n = 1; n <= TOTAL_PERTEMUAN; n += 1) {
    const meeting = meetings.find((m) => Number(m.meeting_number) === n);
    const t = parseDbDateTime(meeting?.opened_at);
    rows.push({
      no: n,
      hari: t ? fmtHari(t) : "",
      tanggal: t ? fmtTanggal(t) : "",
      jam: t ? fmtRentangJam(t, DURASI_MENIT) : "",
    });
  }

  // Waktu pelaksanaan = tanggal pertemuan pertama s/d terakhir
  const dates = meetings
    .map((m) => parseDbDateTime(m.opened_at))
    .filter(Boolean)
    .sort((a, b) => new Date(a.y, a.mo - 1, a.d) - new Date(b.y, b.mo - 1, b.d));
  const waktuPelaksanaan = dates.length
    ? `${fmtTanggal(dates[0])} - ${fmtTanggal(dates[dates.length - 1])}`
    : "";

  buildJadwalSheet(workbook, rows, waktuPelaksanaan);
  buildDokumentasiSheet(workbook, rows, images);

  return workbook;
}

function buildJadwalSheet(workbook, rows, waktuPelaksanaan) {
  const ws = workbook.addWorksheet("JADWAL");

  const widths = [12.14, 19.71, 1.29, 21.14, 3.43, 25.86, 31.43, 14.86];
  widths.forEach((w, i) => {
    ws.getColumn(i + 1).width = w;
  });
  for (let r = 1; r <= 38; r += 1) ws.getRow(r).height = 24.75;

  const center = { horizontal: "center", vertical: "middle" };
  const middle = { vertical: "middle" };

  // Judul
  ws.mergeCells("A1:H1");
  ws.getCell("A1").value = REPORT_META.judul;
  ws.getCell("A1").font = FONT_TITLE;
  ws.getCell("A1").alignment = center;

  ws.mergeCells("A2:D2");
  ws.getCell("A2").value = REPORT_META.subJudulKiri;
  ws.getCell("A2").font = FONT_TITLE;
  ws.getCell("A2").alignment = { horizontal: "right", vertical: "middle" };
  ws.getCell("E2").value = { formula: "D5", result: REPORT_META.gelombang };
  ws.getCell("E2").font = FONT_TITLE;
  ws.getCell("E2").alignment = center;
  ws.mergeCells("F2:H2");
  ws.getCell("F2").value = REPORT_META.subJudulKanan;
  ws.getCell("F2").font = FONT_TITLE;
  ws.getCell("F2").alignment = { horizontal: "left", vertical: "middle" };

  ws.mergeCells("A3:H3");
  ws.getCell("A3").value = REPORT_META.skText;
  ws.getCell("A3").font = FONT_TITLE;
  ws.getCell("A3").alignment = center;

  // Info kelas
  const info = [
    ["Gelombang", REPORT_META.gelombang],
    ["Waktu Pelaksanaan", waktuPelaksanaan],
    ["Nama Tutor", REPORT_META.namaTutor],
    ["Nama Kelas", REPORT_META.namaKelas],
  ];
  info.forEach(([label, value], i) => {
    const r = 5 + i;
    ws.mergeCells(`A${r}:B${r}`);
    ws.getCell(`A${r}`).value = label;
    ws.getCell(`A${r}`).font = FONT_TNR11;
    ws.getCell(`A${r}`).alignment = { horizontal: "left", vertical: "middle" };
    ws.getCell(`C${r}`).value = ":";
    ws.getCell(`C${r}`).font = FONT_TNR11;
    ws.getCell(`C${r}`).alignment = middle;
    ws.getCell(`D${r}`).value = value;
    ws.getCell(`D${r}`).font = FONT_TNR11;
    ws.getCell(`D${r}`).alignment =
      r === 5 ? middle : { horizontal: "left", vertical: "middle" };
  });

  // Header tabel (baris 10)
  ws.mergeCells("B10:C10");
  ws.mergeCells("E10:F10");
  const headers = [
    ["B10", "PERTEMUAN KE -", true],
    ["D10", "HARI", false],
    ["E10", "TANGGAL", true],
    ["G10", "JAM", false],
  ];
  headers.forEach(([addr, text, gray]) => {
    const cell = ws.getCell(addr);
    cell.value = text;
    cell.font = FONT_TNR11B;
    cell.alignment = center;
    if (gray) cell.fill = FILL_GRAY;
  });
  ["B10", "C10", "D10", "E10", "F10", "G10"].forEach((addr) => {
    ws.getCell(addr).border = BORDER_ALL;
  });

  // Isi tabel (baris 11..30)
  rows.forEach((row, i) => {
    const r = 11 + i;
    ws.mergeCells(`B${r}:C${r}`);
    ws.mergeCells(`E${r}:F${r}`);
    ws.getCell(`B${r}`).value = row.no;
    ws.getCell(`D${r}`).value = row.hari;
    ws.getCell(`E${r}`).value = row.tanggal;
    ws.getCell(`G${r}`).value = row.jam;
    ["B", "C", "D", "E", "F", "G"].forEach((col) => {
      const cell = ws.getCell(`${col}${r}`);
      cell.font = FONT_TNR11;
      cell.alignment = center;
      cell.border = BORDER_ALL;
    });
  });

  // Tanda tangan
  ws.getCell("G33").value = "Mengetahui,";
  ws.getCell("G33").alignment = { vertical: "middle", wrapText: true };
  ws.getCell("G34").value = REPORT_META.kepalaJabatan;
  ws.getCell("G34").alignment = middle;
  ws.getCell("G38").value = REPORT_META.kepalaNama;
  ws.getCell("G38").alignment = middle;
  ["G33", "G34", "G38"].forEach((addr) => {
    ws.getCell(addr).font = FONT_TNR12;
  });
}

function buildDokumentasiSheet(workbook, rows, images) {
  const ws = workbook.addWorksheet("DOKUMENTASI");

  const widths = [12.71, 35, 12.14, 37.14];
  widths.forEach((w, i) => {
    ws.getColumn(i + 1).width = w;
  });

  const middle = { vertical: "middle" };

  // Judul + info (formula merujuk sheet JADWAL, persis template)
  ws.mergeCells("A1:D1");
  ws.getCell("A1").value = "DOKUMENTASI PELATIHAN ICT";
  ws.getCell("A1").font = FONT_TITLE;
  ws.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };

  const info = [
    ["A3", "Gelombang :", "JADWAL!D5", REPORT_META.gelombang],
    ["A4", "Nama Tutor :", "JADWAL!D7", REPORT_META.namaTutor],
    ["A5", "Nama Kelas :", "JADWAL!D8", REPORT_META.namaKelas],
  ];
  info.forEach(([addr, label, formula, result]) => {
    ws.getCell(addr).value = label;
    ws.getCell(addr).font = FONT_TNR12;
    ws.getCell(addr).alignment = middle;
    const valueCell = ws.getCell(addr.replace("A", "B"));
    valueCell.value = { formula, result };
    valueCell.font = FONT_TNR12;
    valueCell.alignment = { horizontal: "left", vertical: "middle" };
  });

  // Tinggi baris
  for (let r = 1; r <= 7; r += 1) ws.getRow(r).height = 24.75;

  // 10 blok x 2 kolom = 20 pertemuan
  for (let g = 0; g < 10; g += 1) {
    const lr = 6 + 8 * g; // baris "Tanggal :"
    const boxTop = lr + 2;
    const boxBottom = lr + 7;

    // Tinggi baris blok
    ws.getRow(lr).height = 24.75;
    ws.getRow(lr + 1).height = 24.75;
    for (let r = boxTop; r < boxBottom; r += 1) ws.getRow(r).height = 30;
    ws.getRow(boxBottom).height = DOK_LAST_ROW_HEIGHTS[g];

    [0, 1].forEach((side) => {
      const n = g * 2 + side + 1; // nomor pertemuan
      if (n > TOTAL_PERTEMUAN) return;
      const row = rows[n - 1];
      const jadwalRow = 10 + n;
      const [labelCol, valueCol] = side === 0 ? ["A", "B"] : ["C", "D"];

      // Label Tanggal / Pukul
      const tglCell = ws.getCell(`${labelCol}${lr}`);
      tglCell.value = "Tanggal :";
      const tglVal = ws.getCell(`${valueCol}${lr}`);
      tglVal.value = {
        formula: `JADWAL!D${jadwalRow}&", "&JADWAL!E${jadwalRow}`,
        result: row.hari ? `${row.hari}, ${row.tanggal}` : ", ",
      };
      const pklCell = ws.getCell(`${labelCol}${lr + 1}`);
      pklCell.value = "Pukul :";
      const pklVal = ws.getCell(`${valueCol}${lr + 1}`);
      pklVal.value = { formula: `JADWAL!G${jadwalRow}`, result: row.jam };
      pklVal.alignment = { horizontal: "left", vertical: "middle" };
      [tglCell, tglVal, pklCell, pklVal].forEach((cell) => {
        cell.font = FONT_TNR12;
        cell.alignment = { ...cell.alignment, vertical: "middle" };
      });

      // Kotak foto (merged)
      ws.mergeCells(`${labelCol}${boxTop}:${valueCol}${boxBottom}`);

      // Border kotak keliling blok (label + kotak foto)
      for (let r = lr; r <= boxBottom; r += 1) {
        const left = ws.getCell(`${labelCol}${r}`);
        const right = ws.getCell(`${valueCol}${r}`);
        left.border = {
          ...left.border,
          left: THIN,
          ...(r === lr ? { top: THIN } : {}),
          ...(r === boxBottom ? { bottom: THIN } : {}),
        };
        right.border = {
          ...right.border,
          right: THIN,
          ...(r === lr ? { top: THIN } : {}),
          ...(r === boxBottom ? { bottom: THIN } : {}),
        };
      }

      // Foto dokumentasi (dari absensi)
      const image = images.find((img) => Number(img.meetingNumber) === n);
      if (image) {
        const imageId = workbook.addImage({
          buffer: image.buffer,
          extension: image.extension,
        });
        // Gambar memenuhi seluruh kotak (full width & height kolom merge)
        const colStart = side === 0 ? 0 : 2;
        ws.addImage(imageId, {
          tl: { col: colStart, row: boxTop - 1 },
          br: { col: colStart + 2, row: boxBottom },
          editAs: "oneCell",
        });
      }
    });
  }
}

// ==================== EXPORT NILAI (.xls, sesuai template_nilai.xls) ====================

const NILAI_HEADERS = [
  "No",
  "NIM",
  "Nama Mahasiswa",
  "Hadir %",
  "UAS",
  "KEHADIRAN",
  "Latex",
  "TUGAS EXCELL",
  "TUGAS MENDELEY",
  "TUGAS POWER POINT",
  "TUGAS WORD",
  "TUGAS ZOTERO",
];

/**
 * Hitung komponen nilai (integer 0-100, bukan persentase berbobot).
 * Komposisi mengikuti score di /students/summary:
 *  - TUGAS WORD        : rata-rata pertemuan 1-5
 *  - TUGAS EXCELL      : rata-rata pertemuan 6-11
 *  - TUGAS POWER POINT : rata-rata pertemuan 12-14
 *  - TUGAS MENDELEY    : rata-rata pertemuan 15-16
 *  - TUGAS ZOTERO      : rata-rata pertemuan 17-18
 *  - Latex             : pertemuan 19
 *  - UAS               : pertemuan 20
 *  - Hadir % / KEHADIRAN : hadir/20 x 100
 */
export function computeNilaiComponents(userMeetings, presentCount) {
  const getAvg = (start, end) => {
    let sum = 0;
    const expectedCount = end - start + 1;
    for (let i = start; i <= end; i += 1) {
      const m = userMeetings.find(
        (um) => um.meeting_id === i && um.is_completed,
      );
      if (m) sum += Number(m.percentage);
    }
    return sum / expectedCount;
  };

  const getPct = (id) => {
    const m = userMeetings.find(
      (um) => um.meeting_id === id && um.is_completed,
    );
    return m ? Number(m.percentage) : 0;
  };

  const hadir = Math.round((Math.min(presentCount, 20) / 20) * 100);

  return {
    hadirPersen: hadir,
    kehadiran: hadir,
    uas: Math.round(getPct(20)),
    latex: Math.round(getPct(19)),
    tugasExcel: Math.round(getAvg(6, 11)),
    tugasMendeley: Math.round(getAvg(15, 16)),
    tugasPowerPoint: Math.round(getAvg(12, 14)),
    tugasWord: Math.round(getAvg(1, 5)),
    tugasZotero: Math.round(getAvg(17, 18)),
  };
}

/**
 * students: [{ nim, name, nilai: hasil computeNilaiComponents }]
 * Return: Buffer file .xls (BIFF8)
 */
export function buildNilaiXlsBuffer(students) {
  const rows = [NILAI_HEADERS];

  students.forEach((student, i) => {
    const n = student.nilai;
    rows.push([
      i + 1,
      student.nim, // string agar leading zero NIM tidak hilang
      student.name,
      n.hadirPersen,
      n.uas,
      n.kehadiran,
      n.latex,
      n.tugasExcel,
      n.tugasMendeley,
      n.tugasPowerPoint,
      n.tugasWord,
      n.tugasZotero,
    ]);
  });

  const ws = XLSX.utils.aoa_to_sheet(rows);
  // Pastikan kolom NIM bertipe teks
  for (let r = 1; r <= students.length; r += 1) {
    const cell = ws[XLSX.utils.encode_cell({ r, c: 1 })];
    if (cell) cell.t = "s";
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Worksheet");

  return XLSX.write(wb, { bookType: "biff8", type: "buffer" });
}

export const TEACHER_REPORT_CONSTANTS = {
  TOTAL_PERTEMUAN,
  DOKUMENTASI_NIM,
  NAMA_KELAS: REPORT_META.namaKelas,
};
