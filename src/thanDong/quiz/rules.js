/**
 * Luật chơi "Ai tài năng nhất?" (chép từ "Ai là môn đệ thông thái" của kinh-thanh) dùng chung cho máy chủ phòng (realtime/show.js, chạy trên Cloudflare / Node) và trình duyệt
 * (quizShow.js, ladder.js, seeds.js). Không phụ thuộc DOM, localStorage hay import.meta: chỉ số liệu và hàm thuần.
 */

/** Ghế nóng: sao theo số câu đã vượt (0..15). Mốc 5 và 10 (vào sổ sao của homework, prefix thandong<lớp>). */
export const HOT = [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 17, 20, 25, 30];
export const MILESTONES = [5, 10];
/** Sao mang về khi hết lượt: passed = số câu đã vượt; stop = tự dừng (giữ câu vừa vượt), không thì sai / hết giờ (giữ mốc). */
export function hotKeep(passed, stop = false) {
  if (stop || passed >= 15) return HOT[Math.min(15, passed)];
  if (passed >= 10) return HOT[passed];
  return passed >= 5 ? HOT[5] : 0;
}

/** Giây để trả lời câu k: câu dễ ngắn, câu khó dài hơn (thiếu nhi đọc chậm: rộng tay). */
export const LIMIT = (k) => (k <= 5 ? 30 : k <= 10 ? 45 : 60);
export const HELPS = ['fifty', 'audience', 'skip', 'friend'];
export const VOTE = 8;          // giây khán giả bình chọn
export const FRIEND_WAIT = 25;  // giây chờ người thân trong phòng trả lời
export const PHONE = 30;        // giây gọi điện cho người thân
export const LOCK = 2.5;        // giây hồi hộp tối thiểu sau khi chốt

/**
 * Mỗi bước của chương trình (máy chủ giữ, realtime/show.js): [tối thiểu, tối đa] giây. Bước theo lời MC thì máy người chơi báo
 * "MC nói xong" (['go', seq]) để sang bước sau sớm, nhưng không trước `min`; không ai báo (máy treo, tab ẩn, rớt mạng) thì tới `max`
 * máy chủ tự sang. Nhờ vậy một máy hỏng không bao giờ giữ cả phòng lâu hơn `max` của một bước.
 * Bước không có ở đây (answer, vote, friend, phone, friendAsk) có hạn riêng (LIMIT, VOTE, FRIEND_WAIT, PHONE).
 */
export const STEP = {
  invite: [6, 35],      // MC chào / mời, người chơi đi lên ghế nóng (báo khi đã ngồi)
  greet: [2, 15],       // MC chào người chơi; lượt đầu của buổi đọc luật: GREET_FIRST
  ask: [3, 40],         // MC đọc câu hỏi và bốn phương án
  lock: [LOCK, 10],     // chốt đáp án, lời hồi hộp
  reveal: [6, 35],      // lật đáp án, lời giải thích
  timeup: [5, 35],
  skip: [3.5, 18],
  quit: [4, 30],
  fifty: [1.5, 9],      // MC dẫn 50:50
  fiftyScan: [4, 4],    // vệt quét chạy qua bốn ô (cố định)
  audience: [1.5, 9],   // MC mời khán giả bình chọn
  voteResult: [3, 9],
  friendSaid: [2.5, 9],
  end: [7, 7],          // thẻ kết quả, người chơi về chỗ
};
export const GREET_FIRST = [4, 75];

/** Phiếu khán giả thật (counts = số phiếu bốn phương án, ít nhất một phiếu) ra phần trăm, tổng 100; phương án đã loại 0%. */
export function realPoll(counts, hide = []) {
  const total = counts.reduce((a, b) => a + b, 0);
  if (!total) return [0, 0, 0, 0];
  const pct = [0, 1, 2, 3].map(i => (hide.includes(i) ? 0 : Math.round(counts[i] / total * 100)));
  const top = pct.indexOf(Math.max(...pct));
  pct[top] += 100 - pct.reduce((a, b) => a + b, 0);
  return pct;
}

/** Số ngẫu nhiên có hạt giống (mulberry32): mọi máy cùng hạt thì cùng dãy (MC chọn cùng một câu nói). */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Phiên bản giao thức trường quay giữa trình duyệt và máy chủ phòng. Đổi cách hai bên nói chuyện thì tăng số này và deploy máy chủ
 * (`npx wrangler deploy` trong realtime/) cùng lúc với web: tab mở từ bản cũ được máy chủ báo tải lại trang thay vì chơi lệch.
 */
export const PROTO = 2;
