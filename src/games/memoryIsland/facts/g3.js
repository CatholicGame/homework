/**
 * Kho thẻ kiến thức lớp 3 (Vở BT Toán 3 Tập Một + Tập Hai) cho 🏝️ Đảo Trí Nhớ.
 * Mỗi chủ đề gắn với Bài trong sách (chỉ để hiện "phù hợp nếu em đã học Bài …" và dấu ✓, không khoá).
 * Số liệu trong một thẻ cố định (id không đổi để nhớ qua nhiều ngày); chỉ việc chọn thẻ là ngẫu nhiên.
 * Cấu trúc thẻ: xem facts/index.js.
 */

import { num, numSay, mulFact, divFact, unitFact, romanFact, partFact } from './kit.js';

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

/** Bảng nhân + bảng chia một số (2 → 10 lần): `7 × 8` ↔ `56`, `56 : 7` ↔ `8`. */
// Màu dải trên dây phơi theo chủ đề (bé nhìn là biết dải thuộc chủ đề nào khi trộn).
const TABLE_COLOR = { 2: '#EC4899', 3: '#F97316', 4: '#EAB308', 5: '#84CC16', 6: '#14B8A6', 7: '#3B82F6', 8: '#8B5CF6', 9: '#D946EF' };

const table = (n, bai) => ({
  id: `g3-t${n}`, icon: '✖️', color: TABLE_COLOR[n], title: `Bảng ${n}`, sub: `nhân, chia ${n}`, lessons: { 'grade3-workbook': [bai] },
  facts: () => [...range(2, 10).map((k) => mulFact(n, k)), ...range(2, 10).map((k) => divFact(n, k))],
});

export const topics = [
  table(2, 'bai-4'),
  table(5, 'bai-4'),
  table(3, 'bai-5'),
  table(4, 'bai-6'),
  table(6, 'bai-9'),
  table(7, 'bai-10'),
  table(8, 'bai-11'),
  table(9, 'bai-12'),
  {
    id: 'g3-part', color: '#22C55E', icon: '🍰', title: 'Một phần mấy', sub: 'hình tô ↔ phân số', lessons: { 'grade3-workbook': ['bai-14'] },
    facts: () => range(2, 9).map(partFact),
  },
  {
    id: 'g3-mm', color: '#0EA5E9', icon: '📏', title: 'mm, cm, dm, m', sub: 'đổi độ dài', lessons: { 'grade3-workbook': ['bai-30'] },
    facts: () => [
      ...range(1, 9).map((k) => unitFact('len', k, 'cm', k * 10, 'mm')),
      unitFact('len', 1, 'dm', 10, 'cm'),
      unitFact('len', 1, 'm', 100, 'cm'),
      unitFact('len', 1, 'm', 1000, 'mm'),
      unitFact('len', 1, 'dm', 100, 'mm'),
      unitFact('len', 2, 'dm', 20, 'cm'),
      unitFact('len', 3, 'dm', 30, 'cm'),
      unitFact('len', 2, 'm', 200, 'cm'),
    ],
  },
  {
    id: 'g3-g', color: '#A855F7', icon: '⚖️', title: 'g, kg', sub: 'đổi khối lượng', lessons: { 'grade3-workbook': ['bai-31'] },
    facts: () => range(1, 9).map((k) => unitFact('mass', k, 'kg', k * 1000, 'g')),
  },
  {
    id: 'g3-ml', color: '#06B6D4', icon: '💧', title: 'ml, l', sub: 'đổi dung tích', lessons: { 'grade3-workbook': ['bai-32'] },
    facts: () => range(1, 9).map((k) => unitFact('vol', k, 'l', k * 1000, 'ml')),
  },
  {
    id: 'g3-roman', color: '#F59E0B', icon: '🏛️', title: 'Số La Mã', sub: 'I đến XX', lessons: { 'grade3-workbook-2': ['bai-47'] },
    facts: () => range(1, 20).map(romanFact),
  },
];

// Dùng lại trong kiểm tra dữ liệu (scripts) và trang thử.
export { num, numSay };
