/**
 * Hằng và hàm dùng chung giữa máy chủ phòng (room.js) và trình duyệt (net.js, nameTag.js, nick.js). Tệp nhỏ, không kéo theo
 * room.js / show.js / bộ câu hỏi vào bản web.
 */
export const ANIMS = ['idle', 'walk', 'bow', 'pray', 'sit', 'hover', 'soar', 'clap', 'sitClap', 'shake', 'sitYes', 'sitCheer', 'cheer', 'sitSad']; // chỉ thêm vào cuối: số thứ tự là giao thức
export const LOOKS = 8;          // số màu áo cũ (trước Tủ đồ)
export const NAME_MAX = 12;      // ký tự: tên trên đầu (lý do ở src/church/nameTag.js)
/** Tên trên đầu: bỏ ký tự điều khiển / định hướng, gộp khoảng trắng, cắt NAME_MAX ký tự. */
export function cleanName(v, max = NAME_MAX) {
  if (typeof v !== 'string') return '';
  const s = v.normalize('NFC').replace(/[\p{C}\p{Zl}\p{Zp}]/gu, '').replace(/\s+/gu, ' ').trim();
  const ch = Array.from(s);
  return ch.length > max ? `${ch.slice(0, max - 1).join('').trim()}…` : s;
}
