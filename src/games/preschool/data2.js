/**
 * Bé Học Vui Toán — Tiền tiểu học, Tập 2: So sánh (trang 44–65 của sách).
 * Nguồn: docs/pre_1/toan-tien-tieu-hoc-tap-2-so-sanh.pdf. Hình cắt bằng scripts/extract-pre2.py
 * (src/assets/pre2: pNN_K = khung thứ K của trang NN, rNN_K = hàng đồ vật), ô đồ vật trong zones2.json.
 * Trang 66 (thẻ dấu để cắt rời) không đưa vào: app đã có sẵn các thẻ dấu để bé chọn.
 *
 * Dạng lượt chơi (ngoài các dạng của Tập 1, xem data.js):
 *   compare  — so sánh 2 nhóm A, B (counts [a, b]). steps:
 *                'full' đếm A → đếm B → chọn dấu; 'sign' chỉ chọn dấu; 'more' đếm rồi chạm nhóm nhiều hơn
 *              layout 'rows' (hàng trên / hàng dưới) hoặc mặc định trái / phải; `img` = một hình chứa cả hai nhóm.
 *   crossout — gạch bớt đồ vật ở hàng nhiều hơn để hai hàng bằng nhau
 *   pairs    — nối các nhóm có số lượng bằng nhau (cột trái ↔ cột phải)
 *   pick     — chạm hình có số lượng nhiều nhất / ít nhất
 *   lesson   — xem và nghe giới thiệu dấu bé, dấu lớn
 */

import ZONES from './zones2.json';

const IMG = Object.fromEntries(Object.entries(
  import.meta.glob('../../assets/pre2/*.webp', { eager: true, import: 'default' }),
).map(([path, url]) => [path.match(/([^/]+)\.webp$/)[1], url]));

const img = (name) => IMG[name];

/** Các cặp khung [trái, phải] liên tiếp của một trang: [[p57_0, p57_1], [p57_2, p57_3], …]. */
const pairsOf = (page, counts, extra = {}) => counts.map(([a, b], k) => ({
  type: 'compare', imgs: [img(`p${page}_${2 * k}`), img(`p${page}_${2 * k + 1}`)], counts: [a, b], ...extra,
}));

// Số đồ vật trong từng khung (đếm tay trên hình phóng to).
const EQUAL_ROWS = [
  ['r44_0', 'r44_1', 7, 7, 'Số quả cam bằng số quả lê.'],
  ['r44_2', 'r44_3', 8, 8, 'Số bánh ngọt bằng số que kem.'],
  ['r44_4', 'r44_5', 7, 7, 'Số bánh bằng số quả táo.'],
];
const CROSS = ['p45_0', 'p45_1', 'p45_2', 'p45_3', 'p45_4', 'p46_0', 'p46_1', 'p46_2', 'p46_3', 'p46_4'];
const MORE_ROWS = [
  ['r49_0', 'r49_1', 3, 8, 'Số bông hoa màu hồng ít hơn số bông hoa đỏ. Số bông hoa đỏ nhiều hơn số bông hoa màu hồng.'],
  ['r49_2', 'r49_3', 4, 7, 'Số bông hoa ít hơn số lọ hoa. Số lọ hoa nhiều hơn số bông hoa.'],
  ['r49_4', 'r49_5', 6, 3, 'Số quả táo nhiều hơn số chùm nho. Số chùm nho ít hơn số quả táo.'],
];
const MORE_50_51 = { 50: [[2, 7], [10, 4], [6, 5]], 51: [[9, 5], [3, 7], [4, 10]] };
const MOST = [[7, 6, 8], [10, 3, 7], [4, 1, 2]];     // trang 52
const LEAST = [[8, 6, 9], [3, 6, 8], [2, 4, 3]];     // trang 53
const SIGN_54 = [[8, 6], [2, 5]];
const FULL_55_56 = { 55: [[4, 3], [8, 10], [7, 5]], 56: [[5, 6], [11, 12], [13, 7]] };
const SIGN_57_60 = {
  57: [[5, 6], [8, 8], [4, 7], [4, 3], [5, 4]],
  58: [[3, 6], [5, 5], [8, 4], [3, 6], [5, 5], [6, 6]],
  59: [[4, 3], [4, 4], [3, 5], [5, 5], [3, 4], [5, 6]],
  60: [[8, 8], [6, 6], [6, 5], [5, 5], [8, 6], [5, 6]],
};
const FULL_61_65 = {
  61: [[2, 3], [5, 3], [2, 1], [4, 3], [7, 9]],
  62: [[6, 6], [8, 8], [9, 10], [8, 7], [6, 6]],
  63: [[8, 9], [10, 9], [8, 8], [6, 7]],
  64: [[5, 6], [7, 8], [4, 10]],
  65: [[12, 11], [6, 6], [3, 2]],
};

const STATIONS = [
  {
    id: 'dau-bang', icon: '🟰', color: '#2563EB', title: 'Dấu bằng', name: 'Đếm hai hàng, hai hàng bằng nhau',
    rounds: EQUAL_ROWS.map(([a, b, x, y, say]) => ({ type: 'compare', layout: 'rows', imgs: [img(a), img(b)], counts: [x, y], steps: 'full', say })),
  },
  {
    id: 'gach-bo', icon: '✂️', color: '#DC2626', title: 'Gạch bỏ', name: 'Gạch bớt đồ vật để hai hàng bằng nhau',
    rounds: CROSS.map(name => ({ type: 'crossout', img: img(name), items: ZONES.crossout[name] })),
  },
  {
    id: 'noi-bang-nhau', icon: '🔗', color: '#14B8A6', title: 'Nối bằng nhau', name: 'Nối các nhóm có số lượng bằng nhau',
    rounds: [
      // Trang 47: cột trái (khung 0, 2, 4, 6) ↔ cột phải (1, 3, 5, 7).
      { type: 'pairs', left: [0, 2, 4, 6].map(k => img(`p47_${k}`)), right: [1, 3, 5, 7].map(k => img(`p47_${k}`)), leftCounts: [3, 5, 4, 2], rightCounts: [4, 3, 2, 5] },
      { type: 'pairs', left: [0, 2, 4, 6].map(k => img(`p48_${k}`)), right: [1, 3, 5, 7].map(k => img(`p48_${k}`)), leftCounts: [9, 8, 7, 6], rightCounts: [6, 7, 9, 8] },
    ],
  },
  {
    id: 'nhieu-it', icon: '⚖️', color: '#F97316', title: 'Nhiều hơn – ít hơn', name: 'Hàng nào nhiều hơn?',
    rounds: MORE_ROWS.map(([a, b, x, y, say]) => ({ type: 'compare', layout: 'rows', imgs: [img(a), img(b)], counts: [x, y], steps: 'more', say })),
  },
  {
    id: 'ben-nao-nhieu', icon: '🐝', color: '#EAB308', title: 'Bên nào nhiều hơn', name: 'Đếm rồi tìm bên nhiều hơn',
    rounds: [...pairsOf(50, MORE_50_51[50], { steps: 'more' }), ...pairsOf(51, MORE_50_51[51], { steps: 'more' })],
  },
  {
    id: 'nhieu-nhat', icon: '🍔', color: '#16A34A', title: 'Nhiều nhất', name: 'Chạm hình có số lượng nhiều nhất',
    rounds: MOST.map((counts, r) => ({ type: 'pick', want: 'most', imgs: [0, 1, 2].map(k => img(`p52_${3 * r + k}`)), counts })),
  },
  {
    id: 'it-nhat', icon: '🧁', color: '#DB2777', title: 'Ít nhất', name: 'Chạm hình có số lượng ít nhất',
    rounds: LEAST.map((counts, r) => ({ type: 'pick', want: 'least', imgs: [0, 1, 2].map(k => img(`p53_${3 * r + k}`)), counts })),
  },
  {
    id: 'dau-be-lon', icon: '🐊', color: '#7C3AED', title: 'Dấu bé, dấu lớn', name: 'Làm quen dấu bé < và dấu lớn >',
    rounds: [
      { type: 'lesson', imgs: [img('lesson_lt'), img('lesson_gt')] },
      // Mỗi khung trang 54 chứa cả hai nhóm (bên trái, bên phải).
      ...SIGN_54.map((counts, k) => ({ type: 'compare', img: img(`p54_${k + 2}`), counts, steps: 'full' })),
    ],
  },
  {
    id: 'dien-dau', icon: '🍗', color: '#0EA5E9', title: 'Điền dấu', name: 'Đếm rồi điền dấu > < =',
    rounds: [...pairsOf(55, FULL_55_56[55], { steps: 'full' }), ...pairsOf(56, FULL_55_56[56], { steps: 'full' })],
  },
  {
    id: 'so-sanh-1', icon: '🍭', color: '#EC4899', title: 'So sánh 1', name: 'Chọn dấu > < = cho đúng',
    rounds: [...pairsOf(57, SIGN_57_60[57], { steps: 'sign' }), ...pairsOf(58, SIGN_57_60[58], { steps: 'sign' })],
  },
  {
    id: 'so-sanh-2', icon: '🦒', color: '#65A30D', title: 'So sánh 2', name: 'Chọn dấu > < = cho đúng',
    rounds: [...pairsOf(59, SIGN_57_60[59], { steps: 'sign' }), ...pairsOf(60, SIGN_57_60[60], { steps: 'sign' })],
  },
  {
    id: 'dem-so-sanh-1', icon: '🔺', color: '#E11D48', title: 'Đếm và so sánh', name: 'Đếm, điền số rồi điền dấu',
    rounds: [61, 62, 63].flatMap(p => pairsOf(p, FULL_61_65[p], { steps: 'full' })),
  },
  {
    id: 'dem-so-sanh-2', icon: '🍰', color: '#0891B2', title: 'Thử thách', name: 'Đếm, điền số rồi điền dấu',
    rounds: [64, 65].flatMap(p => pairsOf(p, FULL_61_65[p], { steps: 'full' })),
  },
].map(s => ({ ...s, part: 1 }));

export const BOOK2 = {
  key: 'pre2',
  title: 'Bé Học Vui Toán',
  subtitle: 'Tiền tiểu học · Tập 2: So sánh',
  note: 'Nguồn: Toán tiền tiểu học — Tập 2: So sánh.',
  stations: STATIONS,
  parts: [{ num: 1, title: 'So sánh: bằng nhau, nhiều hơn, ít hơn, dấu > < =' }],
};
