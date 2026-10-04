/**
 * 📷 Bé Chụp Ảnh Chim — dạng lượt 'photo' (play5.js). Hai sách cùng một trò:
 *   BOOK5    (Tiền tiểu học, khoá sao 'pre5'): đếm đến 5, đến 10, chỉ đếm một loài, đếm đến 20.
 *   BOOK5_G1 (Lớp 1, khoá sao 'g1bird'): đếm đến 10, đến 20, chỉ đếm một loài, đếm theo chục đến 100.
 * Số chim mỗi lượt cố định (đổi loài chim, hướng bay, cách xếp mỗi lần chơi).
 */

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/** Ba số liền nhau quanh đáp án (đếm số lớn: đủ để bé chọn, không phải đọc cả dãy 11–20). */
const near = (n, lo, hi) => { const a = Math.max(lo, Math.min(n - 1, hi - 2)); return [a, a + 1, a + 2]; };

const all = (ns, options) => ns.map(n => ({ type: 'photo', n, options: options || near(n, 1, 100) }));
const kind = (pairs, options) => pairs.map(([n, other]) => ({ type: 'photo', mode: 'kind', n, other, options: options || near(n, 1, 100) }));
const tens = (pairs) => pairs.map(([t, o]) => ({ type: 'photo', mode: 'tens', tens: t, ones: o, options: [t * 10 + o - 10, t * 10 + o, t * 10 + o + 10].filter(v => v > 0).sort((a, b) => a - b) }));

const S = (id, icon, color, title, name, part, rounds) => ({ id, icon, color, title, name, part, rounds });

export const BOOK5 = {
  key: 'pre5',
  title: 'Bé Chụp Ảnh Chim',
  subtitle: 'Tiền tiểu học · Chụp ảnh rồi chạm đếm',
  stations: [
    S('chup-5', '🐦', '#0EA5E9', 'Đếm đến 5', 'Chụp ảnh đàn chim, đếm đến 5', 1, all([3, 5, 2, 4], range(1, 5))),
    S('chup-10-a', '🕊️', '#22C55E', 'Đếm đến 10', 'Chụp ảnh đàn chim, đếm đến 10', 2, all([6, 8, 7], range(1, 10))),
    S('chup-10-b', '🦆', '#F59E0B', 'Đếm đến 10', 'Chụp ảnh đàn chim, đếm đến 10', 2, all([10, 9, 6], range(1, 10))),
    S('chup-loai', '🐤', '#EC4899', 'Chỉ đếm một loài', 'Đàn có hai loài chim, chỉ đếm loài được hỏi', 3, kind([[3, 2], [5, 3], [4, 4], [6, 3]], range(1, 10))),
    S('chup-20-a', '🌤️', '#8B5CF6', 'Đếm đến 20', 'Chụp ảnh đàn chim, đếm đến 20', 4, all([12, 15, 11])),
    S('chup-20-b', '🌈', '#DC2626', 'Đếm đến 20', 'Chụp ảnh đàn chim, đếm đến 20', 4, all([18, 14, 20])),
  ],
  parts: [
    { num: 1, title: 'Phần 1: Đếm đến 5' },
    { num: 2, title: 'Phần 2: Đếm đến 10' },
    { num: 3, title: 'Phần 3: Chỉ đếm một loài chim' },
    { num: 4, title: 'Phần 4: Đếm đến 20' },
  ],
};

export const BOOK5_G1 = {
  key: 'g1bird',
  title: 'Bé Chụp Ảnh Chim',
  subtitle: 'Lớp 1 · Chụp ảnh rồi chạm đếm, đếm theo chục',
  stations: [
    S('chup-10', '🐦', '#0EA5E9', 'Đếm đến 10', 'Chụp ảnh đàn chim, đếm đến 10', 1, all([7, 10, 8, 9], range(1, 10))),
    S('chup-20', '🕊️', '#22C55E', 'Đếm đến 20', 'Chụp ảnh đàn chim, đếm đến 20', 2, all([13, 16, 19, 20])),
    S('chup-loai', '🐤', '#EC4899', 'Chỉ đếm một loài', 'Đàn có hai loài chim, chỉ đếm loài được hỏi', 3, kind([[7, 4], [9, 5], [12, 4]])),
    S('chup-chuc-a', '🦆', '#F59E0B', 'Đếm theo chục', 'Mỗi cột 10 con: đếm chục rồi đếm con lẻ', 4, tens([[2, 0], [2, 4], [3, 6]])),
    S('chup-chuc-b', '🌈', '#8B5CF6', 'Đếm theo chục', 'Mỗi cột 10 con: đếm chục rồi đếm con lẻ', 4, tens([[4, 0], [4, 7], [5, 3]])),
  ],
  parts: [
    { num: 1, title: 'Phần 1: Đếm đến 10' },
    { num: 2, title: 'Phần 2: Đếm đến 20' },
    { num: 3, title: 'Phần 3: Chỉ đếm một loài chim' },
    { num: 4, title: 'Phần 4: Đếm theo chục (đến 100)' },
  ],
};
