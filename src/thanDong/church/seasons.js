/**
 * Mùa của đồ theo mùa trong Tủ đồ (wardrobe.js `season`), theo giờ Việt Nam:
 *   giang-sinh  Mùa Vọng và Mùa Giáng Sinh: từ Chúa Nhật I Mùa Vọng tới lễ Chúa Giê-su chịu phép rửa (Chúa Nhật sau 6/1)
 *   le-la       Tuần Thánh: Chúa Nhật Lễ Lá tới thứ Bảy Tuần Thánh
 *   phuc-sinh   Mùa Phục Sinh: lễ Phục Sinh tới lễ Hiện Xuống
 *   thang-hoa   Tháng Hoa: tháng Năm
 *   man-coi     Tháng Mân Côi: tháng Mười
 * Dev: `?mua=<id>` coi như đang trong mùa đó.
 */
export const SEASONS = {
  'giang-sinh': { vi: 'Mùa Giáng Sinh', en: 'Christmas season' },
  'le-la': { vi: 'Tuần Thánh', en: 'Holy Week' },
  'phuc-sinh': { vi: 'Mùa Phục Sinh', en: 'Easter season' },
  'thang-hoa': { vi: 'Tháng Hoa', en: 'May, the month of Mary' },
  'man-coi': { vi: 'Tháng Mân Côi', en: 'October, the month of the Rosary' },
};

const DAY = 864e5;
const utc = (y, m, d) => Date.UTC(y, m - 1, d);

/** Lễ Phục Sinh (lịch Gregory, thuật toán Meeus / Jones / Butcher), ms UTC lúc 0 giờ. */
export function easter(y) {
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(y, month, day);
}
/** Chúa Nhật I Mùa Vọng: Chúa Nhật thứ tư trước 25/12. */
function advent(y) {
  const xmas = utc(y, 12, 25), dow = new Date(xmas).getUTCDay();
  return xmas - (dow === 0 ? 7 : dow) * DAY - 21 * DAY;
}
/** Lễ Chúa chịu phép rửa: Chúa Nhật sau 6/1 (ngày cuối Mùa Giáng Sinh). */
function baptism(y) {
  const ep = utc(y, 1, 6), dow = new Date(ep).getUTCDay();
  return ep + (7 - dow) * DAY;
}

/** Ngày hôm nay theo giờ Việt Nam, ms UTC lúc 0 giờ. */
export function vnDay(ms = Date.now()) {
  const d = new Date(ms + 7 * 3600e3);
  return utc(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
}

/** Khoảng [từ, đến] (ms) của mùa `id` gần nhất chưa qua tính từ ngày `day`. */
export function rangeOf(id, day = vnDay()) {
  const y = new Date(day).getUTCFullYear();
  const spans = (yy) => {
    const e = easter(yy);
    return {
      'giang-sinh': [advent(yy - 1), baptism(yy)],
      'le-la': [e - 7 * DAY, e - DAY],
      'phuc-sinh': [e, e + 49 * DAY],
      'thang-hoa': [utc(yy, 5, 1), utc(yy, 5, 31)],
      'man-coi': [utc(yy, 10, 1), utc(yy, 10, 31)],
    }[id];
  };
  for (const yy of [y, y + 1]) {
    const r = spans(yy);
    if (r && day <= r[1]) return r;
  }
  return spans(y + 1);
}

const forced = typeof location !== 'undefined' && import.meta.env?.DEV ? new URLSearchParams(location.search).get('mua') : null;

export function inSeason(id, day = vnDay()) {
  if (forced) return forced === id;
  const [a, b] = rangeOf(id, day);
  return day >= a && day <= b;
}

/** "từ 29/11" hoặc "tới 10/1" cho nhãn của món theo mùa. */
export function seasonHint(id, lang = 'vi', day = vnDay()) {
  const [a, b] = rangeOf(id, day);
  const fmt = (ms) => { const d = new Date(ms); return `${d.getUTCDate()}/${d.getUTCMonth() + 1}`; };
  const name = SEASONS[id]?.[lang] || id;
  if (inSeason(id, day)) return lang === 'en' ? `${name}, until ${fmt(b)}` : `${name}, tới ${fmt(b)}`;
  return lang === 'en' ? `${name}, from ${fmt(a)}` : `${name}, từ ${fmt(a)}`;
}
