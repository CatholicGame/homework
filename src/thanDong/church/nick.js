/**
 * Biệt danh trong Gặp gỡ online: tên MC gọi ở trường quay ("Xin mời {ten} lên ghế nóng") và tên trên đầu ở máy người khác.
 * Quy tắc để MC đọc tròn vành và để ai cũng gọi được:
 *   - 2 đến NICK_MAX (12) ký tự, tối đa hai chữ (như "Minh", "Phương Thảo"); 12 là giới hạn thẻ tên của nameTag.js / máy chủ phòng
 *   - chỉ chữ cái (có dấu tiếng Việt), cách nhau một dấu cách: không số, không ký hiệu, không biểu tượng cảm xúc
 *   - mỗi chữ ít nhất 2 chữ cái và có nguyên âm (đọc được), không một chữ cái lặp 3 lần liền ("Aaaa")
 *   - không lời tục, không mạo danh (MC, Admin, tên Chúa…)
 *   - tự viết hoa chữ đầu mỗi chữ: "bảo anh" → "Bảo Anh"
 * Khớp khuôn `{ten}` của MC (quiz/mc.js LIVE) nên api/tts.js đọc được.
 */
import { NAME_MAX } from '../../../realtime/shared.js';

export const NICK_MAX = NAME_MAX;   // 12: thẻ tên trên đầu (nameTag.js) và máy chủ phòng cắt ở đó

const plain = (w) => w.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
// lời tục (giữ dấu, so trọn chữ) và tiếng Anh (bỏ dấu, so trọn chữ hay nằm trong)
const BAD_VI = new Set(['lồn', 'buồi', 'cặc', 'đụ', 'địt', 'đéo', 'đĩ', 'điếm', 'ngu', 'chó', 'đần', 'khốn', 'vãi', 'cứt', 'đái', 'ỉa']);
const BAD_IN = ['fuck', 'shit', 'bitch', 'porn', 'sex', 'dick', 'cock', 'pussy', 'nigg'];
const BAD_WORD = new Set(['dm', 'dmm', 'vcl', 'vkl', 'clm', 'cmm', 'dcm', 'ass', 'xxx']);
// mạo danh: người dẫn chương trình, quản trị, danh xưng thánh thiêng
const RESERVED = new Set(['mc', 'admin', 'quan tri', 'nguoi dan', 'chua', 'giesu', 'jesus', 'thien chua', 'duc chua', 'chua oi',
  'ba ngoi', 'thanh than', 'linh muc', 'giam muc', 'giao hoang', 'satan', 'ma quy']);
const RESERVED_WORD = new Set(['admin', 'giesu', 'jesus', 'satan']);   // cấm cả khi đứng cạnh chữ khác

/**
 * Kiểm tra một biệt danh: { ok, value (đã chuẩn hoá), why } với why:
 * 'empty' | 'short' | 'long' | 'words' | 'chars' | 'wordShort' | 'vowel' | 'repeat' | 'bad' | 'reserved'.
 */
export function checkNick(raw) {
  const s = String(raw || '').normalize('NFC').replace(/\s+/gu, ' ').trim();
  if (!s) return { ok: false, value: '', why: 'empty' };
  if (!/^[\p{L}\p{M} ]+$/u.test(s)) return { ok: false, value: s, why: 'chars' };
  const words = s.split(' ');
  const value = words.map(w => w.charAt(0).toLocaleUpperCase('vi') + w.slice(1).toLocaleLowerCase('vi')).join(' ');
  const n = Array.from(value).length;
  if (n < 2) return { ok: false, value, why: 'short' };
  if (n > NICK_MAX) return { ok: false, value, why: 'long' };
  if (words.length > 2) return { ok: false, value, why: 'words' };
  const low = words.map(w => w.toLocaleLowerCase('vi')), flat = low.map(plain);
  if (flat.some(w => w.length < 2)) return { ok: false, value, why: 'wordShort' };
  if (flat.some(w => !/[aeiouy]/.test(w))) return { ok: false, value, why: 'vowel' };
  if (/(.)\1\1/u.test(low.join(' '))) return { ok: false, value, why: 'repeat' };
  if (low.some(w => BAD_VI.has(w)) || flat.some(w => BAD_WORD.has(w)) || BAD_IN.some(b => flat.join('').includes(b))) {
    return { ok: false, value, why: 'bad' };
  }
  if (RESERVED.has(flat.join(' ')) || flat.some(w => RESERVED_WORD.has(w))) return { ok: false, value, why: 'reserved' };
  return { ok: true, value, why: '' };
}

/** Lời giải thích (tiếng Việt, đưa qua t()) cho mỗi lý do. */
export const NICK_WHY = {
  empty: 'Hãy đặt một biệt danh để MC gọi bạn.',
  short: 'Biệt danh cần ít nhất 2 chữ cái.',
  long: `Biệt danh dài nhất ${NICK_MAX} ký tự.`,
  words: 'Biệt danh tối đa hai chữ, ví dụ "Bảo Anh".',
  chars: 'Chỉ dùng chữ cái và dấu cách, không số hay ký hiệu.',
  wordShort: 'Mỗi chữ cần ít nhất 2 chữ cái.',
  vowel: 'Biệt danh cần đọc được thành tiếng, hãy thêm nguyên âm.',
  repeat: 'Đừng lặp một chữ cái quá hai lần liền.',
  bad: 'Biệt danh này chưa đẹp, bạn chọn tên khác.',
  reserved: 'Tên này dành riêng, bạn chọn tên khác.',
};
