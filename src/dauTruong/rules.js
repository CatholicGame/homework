/**
 * Đấu Trường Nhí: hằng và hàm thuần dùng chung giữa trình duyệt (src/dauTruong/*, src/games/dauTruong.js) và máy chủ phòng
 * (realtime/room.js, phòng `arena-g<lớp>`). Không import gì của trình duyệt.
 */

/** Đổi giao thức phòng arena (tin mới, đổi nghĩa tin cũ) thì tăng số này và deploy Worker cùng lúc với web. */
export const ARENA_PROTO = 1;

// ---- giờ giấc (giờ Việt Nam, UTC+7, không đổi giờ mùa hè)
const VN = 7 * 3600e3, DAY = 86400e3;
/** Phòng mở trước giờ bắt đầu (sảnh chờ: chọn ghế, câu làm nóng). */
export const OPEN_BEFORE = 15 * 60e3;
/** Một lượt kéo dài (thiet-ke.md §3). */
export const LIVE_MS = 45 * 60e3;
/** Phòng thử (`arena-g3-test`) và máy chủ dev: bắt đầu sau từng này kể từ khi phòng có người đầu tiên. */
export const TEST_LEAD = 90e3;
/**
 * Phòng mở mọi lúc, lượt cuốn chiếu (2026-11-09): người đầu tiên vào thì sảnh chờ TEST_LEAD, đủ 4 bạn trên bục là bắt đầu
 * (người thật bật "Em muốn lên bục" lên trước, thiếu thì MC mời bạn ảo), hết lượt mà còn người thì mở lượt mới ngay.
 * false: quay về lịch SLOTS (phòng đóng ngoài giờ). Đổi thì deploy cả Worker lẫn web.
 */
export const ALWAYS_OPEN = true;


/**
 * Lịch tạm, chờ tab 📅 Lịch của admin (thiet-ke.md §12, Firestore arenaEvents): mỗi buổi { at: 'HH:MM' giờ VN, days: thứ trong
 * tuần (0 = Chủ nhật), grades }. Đổi lịch ở đây thì deploy cả Worker lẫn web.
 */
export const SLOTS = [{ at: '19:30', days: [0, 1, 2, 3, 4, 5, 6], grades: [1, 2, 3, 4, 5] }];

/** Giờ bắt đầu (ms) của lượt gần nhất chưa kết thúc của lớp `grade` tính từ `now`; không có buổi nào trong 2 tuần thì 0. */
export function nextStart(grade, now = Date.now(), slots = SLOTS) {
  const today = Math.floor((now + VN) / DAY);
  let best = 0;
  for (let d = -1; d <= 14 && !best; d++) {
    const day = today + d, wd = (day + 4) % 7, midnight = day * DAY - VN;   // 1/1/1970 là thứ Năm
    for (const s of slots) {
      if (!s.days.includes(wd) || !s.grades.includes(grade)) continue;
      const [h, m] = s.at.split(':').map(Number);
      const t = midnight + h * 3600e3 + m * 60e3;
      if (t + LIVE_MS > now && (!best || t < best)) best = t;
    }
  }
  return best;
}

/** Bước của phòng theo giờ: 'closed' (chưa mở / đã xong), 'lobby' (sảnh chờ 15 phút trước giờ), 'live' (đang diễn). */
export function stepAt(startAt, now = Date.now()) {
  if (!startAt || now < startAt - OPEN_BEFORE || now >= startAt + LIVE_MS) return 'closed';
  return now < startAt ? 'lobby' : 'live';
}

const WD = ['Chủ nhật', 'thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy'];
/** "19:30 hôm nay", "19:30 ngày mai", "19:30 thứ Bảy" (giờ Việt Nam). */
export function whenText(startAt, now = Date.now()) {
  if (!startAt) return '';
  const v = new Date(startAt + VN), hm = `${v.getUTCHours()}:${String(v.getUTCMinutes()).padStart(2, '0')}`;
  const d = Math.floor((startAt + VN) / DAY) - Math.floor((now + VN) / DAY);
  return `${hm} ${d <= 0 ? 'hôm nay' : d === 1 ? 'ngày mai' : WD[v.getUTCDay()]}`;
}
/** Đếm ngược: "1:05:09", "12:04", "0:09". */
export function clockText(ms) {
  const s = Math.max(0, Math.ceil(ms / 1000)), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, x = s % 60;
  return h ? `${h}:${String(m).padStart(2, '0')}:${String(x).padStart(2, '0')}` : `${m}:${String(x).padStart(2, '0')}`;
}

// ---- khán phòng: 5 hàng (A gần sân khấu) × 10 ghế, số 1–10 từ trái sang phải nhìn từ khán phòng, lối đi giữa ghế 5 và 6
export const ROWS = 5, COLS = 10, AISLE_AFTER = 5;
export const SEAT_IDS = Array.from({ length: ROWS * COLS }, (_, i) => `${'ABCDE'[Math.floor(i / COLS)]}${(i % COLS) + 1}`);
const SEAT_SET = new Set(SEAT_IDS);
export const arenaSeatOk = (id) => SEAT_SET.has(id);

// ---- nhân vật: học sinh Hyper3D (public/thandong/characters/<kind>.glb), ảnh chọn ở public/dautruong/pupils/<kind>.webp (scripts/.tmp/pupil-thumb.mjs)
export const PUPILS = ['pupil_boy', 'pupil_glasses', 'pupil_curly', 'pupil_buzz', 'pupil_girl', 'pupil_pony', 'pupil_buns'];
export const PUPIL_NAMES = ['Bạn tóc ngắn', 'Bạn đeo kính', 'Bạn tóc xoăn', 'Bạn tóc húi cua', 'Bạn tóc dài', 'Bạn buộc tóc', 'Bạn búi tóc'];
/** Nhân vật đi qua phòng trong chuỗi bộ đồ `o` (room.js lookOf chỉ nhận chữ, số, ':' và ','): "p:3". */
export const lookOfPupil = (i) => `p:${i}`;
export function pupilOfLook(o) {
  const m = /(?:^|,)p:(\d)(?:,|$)/.exec(o || '');
  return m && +m[1] < PUPILS.length ? +m[1] : -1;
}
