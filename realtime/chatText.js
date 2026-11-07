/**
 * Lời chat trong phòng Gặp gỡ online (máy chủ realtime/room.js và client src/church/chat.js cùng dùng, nên hai bên làm sạch giống
 * hệt nhau). Người dùng có trẻ em, nên:
 *  - bỏ ký tự điều khiển / định hướng / vô hình, gộp khoảng trắng, dài nhất CHAT_MAX ký tự;
 *  - che đường dẫn (http…, www…, tên miền) và số điện thoại / dãy số dài: không mời nhau sang chỗ khác, không lộ số;
 *  - che các từ tục thường gặp (tiếng Việt có / không dấu, tiếng Anh) bằng dấu *.
 * Đây chỉ là lớp lọc cơ bản, không thay được người lớn để ý.
 */
export const CHAT_MAX = 120;

// Từ tục: hai danh sách. FOLDED khớp trên chữ đã bỏ dấu (chỉ những từ không trùng chữ thường: "dm", "vcl"…); ACCENT khớp
// đúng dấu, vì bỏ dấu thì trùng chữ lành ("lồn" / "lớn", "cặc" / "các", "buồi" / "buổi", "đéo" / "đeo", "chó đẻ" / "cho dễ").
// Khớp nguyên từ, cho phép chữ lặp và dấu chấm / gạch chen giữa ("d.m", "đmmm").
const FOLDED = ['dm', 'dmm', 'dcm', 'dkm', 'vcl', 'vkl', 'vcc', 'clgt', 'cmm', 'cmn', 'fuck', 'fck', 'shit', 'bitch', 'dick', 'pussy', 'cunt',
  'asshole', 'bastard', 'sex', 'porn'];
const ACCENT = ['lồn', 'cặc', 'buồi', 'địt', 'đéo', 'đụ', 'đù má', 'đĩ', 'chó đẻ', 'mất dạy', 'óc chó', 'súc vật'];
const sep = '[\\s._\\-*]*';
const wordRe = (list) => new RegExp(`(?<![\\p{L}\\p{N}])(?:${list.map(w => Array.from(w).map(c => (c === ' ' ? '\\s+' : `${c}+`)).join(sep)).join('|')})(?![\\p{L}\\p{N}])`, 'gu');
const FOLDED_RE = wordRe(FOLDED), ACCENT_RE = wordRe(ACCENT);
const LINK_RE = /(?:https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|net|org|vn|io|me|ly|gg|tk|xyz|info|top|app|link)(?:\/\S*)?/gi;
const DIGITS_RE = /(?:\+?\d[\s.\-]?){7,}/g;   // số điện thoại, số tài khoản
// bỏ dấu từng ký tự (giữ số đơn vị UTF-16), để vị trí khớp trên bản dò cũng là vị trí trên chữ gốc
const fold1 = (c) => {
  const b = c.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return (b.length === c.length ? b : c).replace(/[đĐ]/, 'd').toLowerCase();
};
// che bằng * những đoạn mà `re` khớp trên bản dò `hay` (cùng độ dài với s)
function mask(s, hay, re) {
  if (hay.length !== s.length) return s;
  let out = '', at = 0;
  for (const m of hay.matchAll(re)) {
    out += s.slice(at, m.index) + s.slice(m.index, m.index + m[0].length).replace(/\S/g, '*');
    at = m.index + m[0].length;
  }
  return out + s.slice(at);
}

/** Làm sạch một lời chat; '' nếu không còn gì để gửi. */
export function cleanChat(v) {
  if (typeof v !== 'string') return '';
  let s = v.normalize('NFC').replace(/[\p{C}\p{Zl}\p{Zp}]/gu, '').replace(/\s+/gu, ' ').trim();
  const ch = Array.from(s);
  if (ch.length > CHAT_MAX) s = ch.slice(0, CHAT_MAX).join('').trim();
  s = s.replace(LINK_RE, '***').replace(DIGITS_RE, (m) => m.replace(/\d/g, '*'));
  s = mask(s, s.toLowerCase(), ACCENT_RE);
  s = mask(s, s.split('').map(fold1).join(''), FOLDED_RE);
  return /[\p{L}\p{N}\p{So}]/u.test(s) ? s : '';
}
