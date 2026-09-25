/**
 * Bé Học Vui Toán — Tiền tiểu học, Tập 1: Đếm và viết số.
 * Nguồn: docs/pre_1/toan-tien-tieu-hoc-tap-1-dem-va-viet-so.pdf. Hình cắt bằng
 * scripts/extract-pre1.py (src/assets/pre1), toạ độ đồ vật/ô trống trong items.json, zones.json.
 *
 * Mỗi "trạm" trên bản đồ là một nhóm lượt chơi; mỗi lượt là một bài có sao
 * (khoá sao `pre1:<trạm>:<lượt>`, bảng độ khó trong src/data/starRatings.js).
 *
 * Các dạng lượt chơi:
 *   intro  — làm quen số: nghe đọc số, chạm đếm đồ vật, tô màu hàng số rỗng
 *   match  — "nối số": chọn (các) hình có đúng n đồ vật
 *   count  — đếm rồi chọn số (options: các số để chọn)
 *   trace  — tô số bằng ngón tay theo nét
 *   order  — chạm các quả theo thứ tự 1 → 10
 *   fill   — kéo số vào ô trống trên hình
 *   rows   — hàng trên + hàng dưới = tổng (11–20)
 */

import ITEMS from './items.json';
import ZONES from './zones.json';

const IMG = Object.fromEntries(Object.entries(
  import.meta.glob('../../assets/pre1/*.webp', { eager: true, import: 'default' }),
).map(([path, url]) => [path.match(/([^/]+)\.webp$/)[1], url]));

export const img = (name) => IMG[name];

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// ── Phần 1: Bé làm quen với các số từ 1 đến 10 ──────────────────────────────
// [lời minh hoạ, câu hỏi đếm, vị trí hình đúng trong 4 hình nối số]
const LESSONS = [
  ['Một cái bánh sinh nhật', 'con bướm', [1]],
  ['Hai cái kẹo mút', 'cái bánh ngọt', [0, 1]],
  ['Ba cái bánh ngọt', 'con cừu', [0]],
  ['Bốn con cua', 'cái ô', [3]],
  ['Năm cái máy bay', 'cái xe đạp', [1]],
  ['Sáu quả cà chua', 'cây bắp cải', [3]],
  ['Bảy cái hamburger', 'cái trống', [3]],
  ['Tám nải chuối', 'quả dưa hấu', [3]],
  ['Chín quả bóng', 'cốc nước trái cây', [2]],
  ['Mười quả dứa', 'đĩa bánh', [3]],
];

// Sách (trang 10) không có hình nào đủ 5 đồ vật — thay hình củ cà rốt (1, trùng Bài 1)
// bằng hình 5 cây xúc xích ở trang 30 của sách.
const MATCH_OVERRIDE = { '5:1': 'c30_4' };

const PART1 = LESSONS.map(([caption, thing, answers], i) => {
  const n = i + 1;
  return {
    id: `bai-${n}`,
    part: 1,
    n,
    title: `Số ${n}`,
    name: `Bài ${n}: Bé làm quen với số ${n}`,
    rounds: [
      { type: 'intro', n, img: img(`b${n}_intro`), items: ITEMS[n].intro, caption },
      {
        type: 'match', n,
        choices: [0, 1, 2, 3].map(k => img(MATCH_OVERRIDE[`${n}:${k}`] || `b${n}_m${k}`)),
        answers,
      },
      { type: 'count', img: img(`b${n}_count`), items: ITEMS[n].count, answer: n, thing, options: range(1, 10) },
      { type: 'trace', n },
    ],
  };
});

// ── Phần 2: Thực hành ─────────────────────────────────────────────────────────
const fillRound = (name, zones, blanks) => ({
  type: 'fill', img: img(name),
  blanks: blanks.map(([zone, value]) => ({ zone: zones[zone], value })),
});

const FRUITS = ['quả cam', 'quả táo', 'quả bí ngô', 'quả măng cụt', 'quả cà chua', 'quả dưa hấu'];

// Đáp án các ô đếm (đếm tay trên hình, theo thứ tự trái → phải, trên → dưới).
const COUNT_28 = [3, 4, 7, 8, 5, 6, 3, 5, 7, 2, 4, 6];
const COUNT_29 = [8, 5, 6, 4, 7, 3, 2, 5, 8, 3, 10, 4];
const PICK_1_5 = { 30: [3, 2, 2, 1, 5, 4], 31: [3, 1, 4, 5, 3, 2] };
const PICK_6_10 = { 32: [6, 10, 8, 6, 7, 9], 33: [6, 10, 8, 9, 7, 8] };
const PICK_11_20 = { 38: [15, 13, 12, 14], 39: [12, 13, 14, 15], 40: [13, 12, 14, 15], 41: [13, 15, 12, 14] };
// Hàng trên + hàng dưới (trang 34–37).
const ROWS = [[5, 6], [6, 6], [7, 6], [7, 7], [10, 5], [8, 8], [9, 8], [11, 6], [10, 9], [10, 10]];

const countRounds = (page, answers, options) => answers.map((answer, k) => ({
  type: 'count', img: img(`c${page}_${k}`), answer, options,
}));

const PART2 = [
  {
    id: 'dau-tay', color: '#EF4444', icon: '🍓', title: 'Dâu tây', name: 'Chạm các quả dâu theo thứ tự từ 1 đến 10',
    rounds: [{ type: 'order', img: img('p2_strawberry'), zones: ZONES.strawberry }],
  },
  {
    id: 'doan-tau', color: '#2563EB', icon: '🚂', title: 'Đoàn tàu', name: 'Viết số còn thiếu lên toa tàu',
    rounds: [fillRound('p2_train', ZONES.train, [[1, 1], [3, 3], [6, 6], [8, 8]])],
  },
  {
    id: 'bong-bay', color: '#A855F7', icon: '🎈', title: 'Bóng bay', name: 'Viết số còn thiếu lên quả bóng',
    rounds: [fillRound('p2_balloons', ZONES.balloons, [[0, 2], [1, 6], [2, 9]])],
  },
  {
    id: 'vuon-qua', color: '#F97316', icon: '🍊', title: 'Vườn quả', name: 'Viết tiếp các số từ 1 đến 10',
    rounds: FRUITS.map((fruit, k) => ({
      ...fillRound(`p2_fruit${k}`, ZONES[`fruit${k}`], [[0, 1], [1, 4], [2, 7], [3, 8]]), fruit,
    })),
  },
  {
    id: 'dem-dien-1', color: '#EC4899', icon: '🧁', title: 'Đếm và điền', name: 'Bé hãy đếm đồ vật và điền số',
    rounds: countRounds(28, COUNT_28, range(1, 10)),
  },
  {
    id: 'dem-dien-2', color: '#14B8A6', icon: '🫖', title: 'Đếm và điền', name: 'Bé hãy đếm đồ vật và điền số',
    rounds: countRounds(29, COUNT_29, range(1, 10)),
  },
  {
    id: 'khoanh-1-5', color: '#8B5CF6', icon: '🍭', title: 'Số 1 – 5', name: 'Đếm rồi khoanh vào số đúng',
    rounds: [...countRounds(30, PICK_1_5[30], range(1, 5)), ...countRounds(31, PICK_1_5[31], range(1, 5))],
  },
  {
    id: 'khoanh-6-10', color: '#EAB308', icon: '🍍', title: 'Số 6 – 10', name: 'Đếm rồi khoanh vào số đúng',
    rounds: [...countRounds(32, PICK_6_10[32], range(6, 10)), ...countRounds(33, PICK_6_10[33], range(6, 10))],
  },
  {
    id: 'hang-11-20', color: '#0EA5E9', icon: '🚗', title: 'Số 11 – 20', name: 'Bé làm quen các số từ 11 đến 20',
    rounds: ROWS.map(([top, bottom], k) => ({ type: 'rows', img: img(`r${k}`), top, bottom, bands: ZONES.rowBands[k] })),
  },
  {
    id: 'khoanh-11-20-a', color: '#DC2626', icon: '🚁', title: 'Đếm 11 – 20', name: 'Đếm rồi khoanh vào số đúng',
    rounds: [...countRounds(38, PICK_11_20[38], range(11, 20)), ...countRounds(39, PICK_11_20[39], range(11, 20))],
  },
  {
    id: 'khoanh-11-20-b', color: '#16A34A', icon: '🥕', title: 'Đếm 11 – 20', name: 'Đếm rồi khoanh vào số đúng',
    rounds: [...countRounds(40, PICK_11_20[40], range(11, 20)), ...countRounds(41, PICK_11_20[41], range(11, 20))],
  },
].map(s => ({ ...s, part: 2 }));

export const BOOK1 = {
  key: 'pre1',
  title: 'Bé Học Vui Toán',
  subtitle: 'Tiền tiểu học · Tập 1: Đếm và viết số',
  note: 'Nguồn: Toán tiền tiểu học — Tập 1: Đếm và viết số.',
  stations: [...PART1, ...PART2],
  parts: [
    { num: 1, title: 'Phần 1: Bé làm quen với các số từ 1 đến 10' },
    { num: 2, title: 'Phần 2: Thực hành' },
  ],
};
