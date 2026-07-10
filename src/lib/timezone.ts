/**
 * Timezone utilities — semua operasi tanggal menggunakan Asia/Jakarta (UTC+7).
 * Backend menyimpan dan mengembalikan datetime string dalam format
 * "YYYY-MM-DD HH:mm:ss" yang merepresentasikan waktu Jakarta.
 * Frontend harus memperlakukan semua datetime string sebagai Jakarta time,
 * bukan UTC atau browser local time.
 */

const JAKARSA_TZ = "Asia/Jakarta";
const JAKARTA_OFFSET = "+07:00";

/**
 * Ambil current time sebagai Date yang sudah dikonversi ke Jakarta timezone.
 * Berguna untuk perbandingan `now < openedAt / closedAt`.
 */
export function getJakartaNow(): Date {
  const now = new Date();
  const jakartaStr = now.toLocaleString("sv-SE", {
    timeZone: JAKARSA_TZ,
    hour12: false,
  });
  // "2026-07-06 14:30:00" + "+07:00" → correct UTC epoch
  return new Date(Date.parse(jakartaStr + " " + JAKARTA_OFFSET));
}

/**
 * Parse string datetime Jakarta "YYYY-MM-DD HH:mm:ss" → Date object
 * dengan offset UTC+7 yang benar.
 */
function jakartaStringToEpoch(dateString: string): number {
  // Hilangkan spasi jadi T biar ISO-friendly, lalu +07:00
  const cleaned = String(dateString).replace("T", " ").trim();
  // Cek format YYYY-MM-DD HH:mm:ss
  const match = cleaned.match(
    /^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})(?::(\d{2}))?$/,
  );
  if (match) {
    return Date.parse(
      `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6] || "00"}${JAKARTA_OFFSET}`,
    );
  }
  // Fallback: biarkan JS parse sendiri
  return Date.parse(cleaned);
}

/**
 * Cek apakah string datetime Jakarta sudah lewat dari sekarang.
 */
export function isBeforeNow(jakartaDateString: string | null | undefined): boolean {
  if (!jakartaDateString) return false;
  return getJakartaNow().getTime() > jakartaStringToEpoch(jakartaDateString);
}

/**
 * Cek apakah current Jakarta time berada dalam window waktu tertentu.
 * Returns { isOpen, reason?, openDate?, closeDate? }
 */
export function checkTimeWindow(
  openedAt: string | null | undefined,
  closedAt: string | null | undefined,
): {
  isOpen: boolean;
  reason?: "not-yet-open" | "already-closed";
  openDate?: string;
  closeDate?: string;
} {
  const now = getJakartaNow().getTime();

  if (openedAt) {
    const openMs = jakartaStringToEpoch(openedAt);
    if (now < openMs) {
      return { isOpen: false, reason: "not-yet-open", openDate: openedAt };
    }
  }

  if (closedAt) {
    const closeMs = jakartaStringToEpoch(closedAt);
    if (now > closeMs) {
      return { isOpen: false, reason: "already-closed", closeDate: closedAt };
    }
  }

  return { isOpen: true };
}

/**
 * Format datetime string Jakarta untuk display.
 * Output: "06 Jul 2026 14:30" (locale id-ID, timezone Jakarta)
 */
export function formatJakartaDate(
  dateString: string | null | undefined,
): string {
  if (!dateString) return "-";
  const ms = jakartaStringToEpoch(dateString);
  if (Number.isNaN(ms)) return String(dateString);
  return new Date(ms).toLocaleDateString("id-ID", {
    timeZone: JAKARSA_TZ,
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Format datetime string Jakarta untuk display panjang.
 * Output: "Senin, 6 Juli 2026 14:30 WIB"
 */
export function formatJakartaDateLong(
  dateString: string | null | undefined,
): string {
  if (!dateString) return "-";
  const ms = jakartaStringToEpoch(dateString);
  if (Number.isNaN(ms)) return String(dateString);
  return new Date(ms).toLocaleDateString("id-ID", {
    timeZone: JAKARSA_TZ,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

/**
 * Convert datetime string Jakarta → value untuk <input type="datetime-local" />.
 * Input: "2026-07-06 14:30:00"
 * Output: "2026-07-06T14:30" (sudah dalam waktu Jakarta, sesuai yg diinput)
 */
export function toJakartaDateTimeLocal(
  dateString: string | null | undefined,
): string {
  if (!dateString) return "";
  const match = String(dateString).match(
    /^(\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2})/,
  );
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}`;
  }
  return "";
}
