/**
 * 🧮 Luyện Tính (lớp 4): luyện các dạng bài của SGK Toán 4 Kết nối tri thức, làm theo đúng cách học ở lớp. Cùng khung với
 * Luyện Tính lớp 2, 3, 5: hub và vòng chơi chung của trò chơi tăng cường, cảnh lớp học, tờ vở ô li, bàn phím số
 * (grade3Drills/kit.js). Sao ghi vào lớp 4 (tiền tố 'drill4').
 *   ✍️ Cộng, trừ số nhiều chữ số: dùng lại đặt tính lớp 3 với số tới bảy chữ số (Bài 2, 22, 23).
 *   ✖️ Nhân nhiều chữ số: tích riêng lùi cột rồi cộng (grade4Drills/mul.js, Bài 38, 43).
 *   ➗ Chia nhiều chữ số: dùng lại chia đặt tính lớp 3, số chia có hai, ba chữ số có bước ước lượng thương (Bài 39, 44).
 *   💯 Số có nhiều chữ số, ⚙️ Biểu thức, 📊 Bài toán có lời văn, ⚖️ Đơn vị đo, 📐 Đo góc: các dạng câu Thực hành của
 *     🧰 Toán 4 công cụ (grade4Tools/lessons) ghép thành cấp; mỗi câu ghi bài SGK chứa kiến thức của câu đó.
 *   🍫 Phân số (Tập Hai): các dạng câu phân số của Toán 5 công cụ (cộng trừ khác mẫu, nhân chia), không ghi bài SGK lớp 5.
 * Số có ba chữ số (nhân, chia) là cấp nâng cao, ngoài SGK.
 */

import { renderGamesHub } from './grade3Games.js';
import { DIVISION_GAME } from './grade3Drills/division.js';
import { COLUMN_GAME, columnSteps } from './grade3Drills/column.js';
import { MUL_GAME } from './grade4Drills/mul.js';
import { SHARK4_GAME } from './grade3Drills/shark.js';
import { UFO4_GAME } from './grade3Drills/ufo.js';
import { how, TEACHER } from './grade3Drills/kit.js';
import { practiceGame } from './grade4Tools/practice.js';
import { tasksOf } from './grade4Tools/lessons/index.js';
import { lessonByN, pagesText } from './grade4Tools/catalog.js';
import { FRACTION_DRILL_LEVELS } from './grade5Tools/lessons/fractions.js';

// ── ✍️ Cộng, trừ số nhiều chữ số ─────────────────────────────────────────────────────────────────────
const carries = (op, a, b) => columnSteps(op, a, b).filter(s => s.kind === 'carry').length;
const len = (n) => String(n).length;

/** Phép cộng / trừ có ít nhất `minC` lần nhớ; phép trừ: hiệu không ngắn hơn số bị trừ quá một chữ số. */
function makeCol(rng, op, [aLo, aHi], [bLo, bHi], { max = 9999999, minC = 2 } = {}) {
  for (;;) {
    const a = rng.int(aLo, aHi), b = rng.int(bLo, bHi);
    if (op === '+' ? a + b > max : b >= a || len(a - b) < len(a) - 1) continue;
    if (carries(op, a, b) >= minC) return { op, a, b };
  }
}

export const COL4_LEVELS = [
  {
    id: 'd4-col-1', n: 1, title: 'Cộng số có sáu chữ số', missions: 5,
    desc: 'Vd. 427 358 + 285 916, 36 058 + 47 295.',
    knowledge: 'cộng có nhớ số có năm chữ số', lessons: { sgk4: ['bai-2', 'bai-22'] },
    ask: () => 'Viết thẳng cột, cộng từ hàng đơn vị. Đừng quên số nhớ!',
    gen: (rng, k) => (k % 3 === 2 ? makeCol(rng, '+', [10000, 69999], [10000, 29999], { max: 99999 })
      : makeCol(rng, '+', [100000, 699999], [100000, 299999], { max: 999999, minC: 3 })),
  },
  {
    id: 'd4-col-2', n: 2, title: 'Trừ số có sáu chữ số', missions: 5,
    desc: 'Vd. 725 314 − 368 152, 62 413 − 27 586.',
    knowledge: 'trừ có nhớ số có năm chữ số', lessons: { sgk4: ['bai-2', 'bai-23'] },
    ask: () => 'Cột nào không trừ được thì lấy thêm 1 chục, rồi nhớ 1 sang cột bên trái!',
    gen: (rng, k) => (k % 3 === 2 ? makeCol(rng, '-', [20000, 99999], [10000, 79999])
      : makeCol(rng, '-', [200000, 999999], [100000, 799999], { minC: 3 })),
  },
  {
    id: 'd4-col-3', n: 3, title: 'Hai số dài ngắn khác nhau', missions: 5,
    desc: 'Vd. 486 315 + 92 708, 704 015 − 86 427. Hàng đơn vị vẫn thẳng hàng đơn vị.',
    knowledge: 'cộng, trừ số có sáu chữ số', lessons: { sgk4: ['bai-22', 'bai-23'] },
    ask: () => 'Số ngắn hơn: hàng đơn vị vẫn thẳng hàng đơn vị!',
    gen: (rng, k) => (k % 2 ? makeCol(rng, '-', [300000, 999999], [10000, 99999])
      : makeCol(rng, '+', [100000, 899999], k % 4 ? [10000, 99999] : [100, 9999], { max: 999999 })),
  },
  {
    id: 'd4-col-4', n: 4, title: 'Số có bảy chữ số', missions: 4,
    desc: 'Vd. 2 458 637 + 3 765 294, 7 203 518 − 2 846 739.',
    knowledge: 'cộng, trừ số có sáu chữ số', lessons: { sgk4: ['bai-22', 'bai-23'] },
    ask: () => 'Số lớn cũng làm như số nhỏ: thẳng cột, từ hàng đơn vị sang trái!',
    gen: (rng, k) => (k % 2 ? makeCol(rng, '-', [2000000, 9999999], [1000000, 7999999], { minC: 3 })
      : makeCol(rng, '+', [1000000, 5999999], [1000000, 3999999], { minC: 3 })),
  },
];

export const COL4_GAME = {
  ...COLUMN_GAME, id: 'd4-col', title: 'Cộng, trừ số nhiều chữ số', starPrefix: 'drill4', levels: COL4_LEVELS,
  purpose: 'Giúp em đặt tính rồi tính cộng, trừ các số có sáu, bảy chữ số: viết thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.',
  howTo: how(['📝', 'Đặt tính'], ['➡️', 'Từ phải sang trái'], ['🔴', 'Viết số nhớ'], ['✅', 'Đúng hết']),
};

// ── ➗ Chia nhiều chữ số ──────────────────────────────────────────────────────────────────────────────
/** D = q × d + r với số chia, thương cho trước; zero: thương có (true) / không có (false) chữ số 0. */
function makeDiv(rng, [dLo, dHi], [qLo, qHi], { rem = null, zero = null, minD = 0 } = {}) {
  for (;;) {
    const d = rng.int(dLo, dHi), q = rng.int(qLo, qHi);
    if (d % 10 === 0 || /[01]$/.test(String(d)) && d > 9 && rng() < 0.5) continue; // ít số chia tròn chục, đuôi 1
    if (zero !== null && String(q).includes('0') !== zero) continue;
    const r = rem === false ? 0 : rem === true ? rng.int(1, d - 1) : (rng() < 0.5 ? 0 : rng.int(1, d - 1));
    if (q * d + r < minD) continue;
    return { D: q * d + r, d };
  }
}

export const DIV4_LEVELS = [
  {
    id: 'd4-div-1', n: 1, title: 'Chia cho số có một chữ số', missions: 4,
    desc: 'Số có sáu chữ số, vd. 128 472 : 6, 405 315 : 5.',
    knowledge: 'chia số có năm chữ số cho số có một chữ số', lessons: { sgk4: ['bai-39'] },
    ask: () => 'Chia từ trái sang phải: chia, nhân, trừ, hạ cho tới chữ số cuối!',
    gen: (rng, k) => makeDiv(rng, [2, 9], [11112, 99999], { zero: k % 2 === 1 ? true : null, minD: 100000 }),
  },
  {
    id: 'd4-div-2', n: 2, title: 'Số chia có hai chữ số, thương một chữ số', missions: 5,
    desc: 'Vd. 128 : 32, 179 : 25. Ước lượng thương: 17 : 2 được 8, thử 8 × 25 = 200 lớn quá, giảm còn 7.',
    knowledge: 'nhân với số có hai chữ số, phép chia có dư', lessons: { sgk4: ['bai-44'] },
    ask: () => 'Bỏ chữ số cuối của hai số rồi nhẩm. Nhân thử, lớn quá thì giảm đi 1!',
    gen: (rng) => makeDiv(rng, [12, 98], [2, 9]),
  },
  {
    id: 'd4-div-3', n: 3, title: 'Số chia có hai chữ số, thương nhiều chữ số', missions: 5,
    desc: 'Vd. 672 : 21, 8 192 : 64, 4 674 : 82.',
    knowledge: 'chia cho số có hai chữ số, thương một chữ số', lessons: { sgk4: ['bai-44'] },
    ask: () => 'Lấy đủ chữ số để chia được, rồi đi vòng chia, nhân, trừ, hạ!',
    gen: (rng, k) => makeDiv(rng, [12, 98], k % 2 ? [102, 499] : [12, 99], { zero: false }),
  },
  {
    id: 'd4-div-4', n: 4, title: 'Thương có chữ số 0', missions: 4,
    desc: 'Vd. 9 450 : 35 = 270, 23 576 : 56 = 421. Hạ xuống mà bé hơn số chia thì viết 0.',
    knowledge: 'chia cho số có hai chữ số', lessons: { sgk4: ['bai-44'] },
    ask: () => 'Hạ xuống mà vẫn bé hơn số chia thì viết 0 vào thương rồi hạ tiếp!',
    gen: (rng, k) => makeDiv(rng, [12, 98], k % 2 ? [1003, 1909] : [102, 990], { zero: true }),
  },
  {
    id: 'd4-div-5', n: 5, title: 'Số chia có ba chữ số', missions: 4,
    desc: 'Nâng cao: vd. 1 944 : 162, 8 649 : 241. Ước lượng: bỏ hai chữ số cuối rồi nhẩm.',
    knowledge: 'chia cho số có hai chữ số', lessons: { sgk4: ['bai-44'] },
    ask: () => 'Bỏ hai chữ số cuối của số đem chia và số chia rồi nhẩm thương!',
    gen: (rng, k) => makeDiv(rng, [112, 489], k % 2 ? [102, 299] : [12, 89], { zero: false }),
  },
];

export const DIV4_GAME = {
  ...DIVISION_GAME, id: 'd4-div', title: 'Chia nhiều chữ số', starPrefix: 'drill4', levels: DIV4_LEVELS,
  purpose: 'Giúp em chia đặt tính cho số có một, hai, ba chữ số: ước lượng thương, nhân thử, rồi chia, nhân, trừ, hạ như trong vở.',
};

// ── Các dạng câu Thực hành của Toán 4 công cụ, ghép thành cấp ────────────────────────────────────────
const G4_BOOK = { label: 'Toán 4', lessonByN, pagesText, starPrefix: 'drill4', idPrefix: 'd4', comma: false };
// Câu phân số lấy của Toán 5 công cụ: không ghi dòng "📖 SGK" (số bài trong câu là của sách lớp 5).
const NO_REF_BOOK = { ...G4_BOOK, lessonByN: () => null };

/** Các dạng câu Thực hành của bài n (chỉ các mã `ids`, theo thứ tự, nếu có). */
const pick = (n, ...ids) => {
  const all = tasksOf(n);
  return ids.length ? ids.map(id => all.find(t => t.id === id)) : all;
};

/**
 * Trò Luyện Tính từ các dạng câu Thực hành, chạy bằng practiceGame (thầy, tờ giấy, bàn phím).
 * Cấp: { id, n, title, desc, knowledge, sgk: [số Bài], say, tasks }.
 */
function taskDrill({ id, icon, title, purpose, howTo, levels, book = G4_BOOK }) {
  const inner = new Map(levels.map(lv => [lv.id, practiceGame({ id: lv.id, n: lv.sgk?.[0] }, lv.tasks, book)]));
  const first = inner.get(levels[0].id);
  return {
    id, icon, title, purpose, unitWord: 'câu', starPrefix: 'drill4', npcs: [TEACHER],
    stallIcon: () => icon,
    summaryText: first.summaryText, againText: 'Làm lượt mới',
    howTo,
    levels: levels.map(({ tasks, sgk = [], say, ...lv }) => ({ missions: 5, lessons: { sgk4: sgk.map(n => `bai-${n}`) }, ask: () => say, ...lv })),
    makeMission(rng, level, history) { return inner.get(level.id).makeMission(rng, level, history); },
    mountMission(stage, m, level, api) { inner.get(level.id).mountMission(stage, m, level, api); },
  };
}

export const NUM4_GAME = taskDrill({
  id: 'd4-num', icon: '💯', title: 'Số có nhiều chữ số',
  purpose: 'Giúp em đọc, viết, phân tích, so sánh, làm tròn các số đến lớp triệu, nhận ra số chẵn, số lẻ như trong sách.',
  howTo: how(['🔊', 'Đọc, viết số'], ['🧱', 'Hàng và lớp'], ['⚖️', 'So sánh'], ['🎯', 'Làm tròn']),
  levels: [
    { id: 'd4-num-1', n: 1, title: 'Đọc, viết số', desc: 'Vd. 3 205 418 đọc là ba triệu hai trăm linh năm nghìn bốn trăm mười tám.', knowledge: 'đọc, viết số có năm chữ số',
      sgk: [10, 12], say: 'Tách số thành từng lớp ba chữ số, đọc từ lớp cao nhất!', tasks: [...pick(10, 'build6', 'read6'), ...pick(12, 'read9', 'build7')] },
    { id: 'd4-num-2', n: 2, title: 'Hàng và lớp', desc: 'Vd. chữ số 5 trong 352 718 ở hàng chục nghìn, lớp nghìn, có giá trị 50 000.', knowledge: 'đọc, viết số có sáu chữ số',
      sgk: [11, 12], say: 'Mỗi lớp có ba hàng: đơn vị, chục, trăm!', tasks: [...pick(11), ...pick(12, 'placeof9', 'expand8')] },
    { id: 'd4-num-3', n: 3, title: 'So sánh số', desc: 'Vd. 2 345 678 > 2 345 099. Số nào nhiều chữ số hơn thì lớn hơn.', knowledge: 'hàng và lớp',
      sgk: [14], say: 'Đếm chữ số trước, rồi so sánh từng cặp chữ số từ trái sang phải!', tasks: pick(14) },
    { id: 'd4-num-4', n: 4, title: 'Làm tròn số', desc: 'Vd. làm tròn 3 458 216 đến hàng trăm nghìn được 3 500 000.', knowledge: 'làm tròn số đến hàng nghìn, chục nghìn',
      sgk: [13], say: 'Nhìn chữ số ở hàng ngay bên phải: bé hơn 5 thì xuống, từ 5 trở lên thì lên!', tasks: pick(13) },
    { id: 'd4-num-5', n: 5, title: 'Dãy số, chẵn lẻ', desc: 'Số liền trước, liền sau, dãy số tự nhiên, số chẵn, số lẻ.', knowledge: 'số tự nhiên',
      sgk: [3, 15], say: 'Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8!', tasks: [...pick(15), ...pick(3)] },
    { id: 'd4-num-6', n: 6, title: 'Trộn các dạng', desc: 'Đọc, viết, hàng và lớp, so sánh, làm tròn, dãy số.', knowledge: 'các số đến lớp triệu',
      sgk: [16], say: 'Mỗi câu một dạng: đọc kĩ thầy hỏi gì!', tasks: pick(16), missions: 6 },
  ],
});

export const EXPR4_GAME = taskDrill({
  id: 'd4-expr', icon: '⚙️', title: 'Biểu thức, tính thuận tiện',
  purpose: 'Giúp em tính giá trị biểu thức chứa chữ, dùng tính chất giao hoán, kết hợp của phép cộng để tính thuận tiện.',
  howTo: how(['🔤', 'Thay chữ bằng số'], ['🧩', 'Ghép số tròn'], ['⌨️', 'Tính'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd4-expr-1', n: 1, title: 'Biểu thức chứa chữ', desc: 'Vd. với a = 7, b = 5 thì (a + b) × 2 = (7 + 5) × 2 = 24.', knowledge: 'tính giá trị biểu thức',
      sgk: [4], say: 'Thay chữ bằng số rồi tính như biểu thức số!', tasks: pick(4) },
    { id: 'd4-expr-2', n: 2, title: 'Giao hoán, kết hợp', desc: 'Vd. 345 + 128 = 128 + ?; (a + b) + c = a + (? + c).', knowledge: 'phép cộng, biểu thức chứa chữ',
      sgk: [24], say: 'Đổi chỗ các số hạng thì tổng không đổi!', tasks: pick(24, 'blank', 'blanka') },
    { id: 'd4-expr-3', n: 3, title: 'Tính thuận tiện', desc: 'Vd. 98 + 145 + 2 = 145 + (98 + 2) = 245.', knowledge: 'tính chất giao hoán, kết hợp',
      sgk: [24], say: 'Tìm hai số cộng lại được số tròn chục, tròn trăm, cộng chúng trước!', tasks: pick(24, 'conv', 'conv4') },
  ],
});

export const WORD4_GAME = taskDrill({
  id: 'd4-word', icon: '📊', title: 'Bài toán có lời văn',
  purpose: 'Giúp em giải bài toán có ba bước tính và bài toán tìm hai số khi biết tổng và hiệu, nhìn sơ đồ đoạn thẳng.',
  howTo: how(['📖', 'Đọc đề'], ['📊', 'Nhìn sơ đồ'], ['🔢', 'Chọn phép tính'], ['✅', 'Đáp số']),
  levels: [
    { id: 'd4-word-1', n: 1, title: 'Ba bước tính', desc: 'Tìm từng số trên sơ đồ, rồi tính tổng.', knowledge: 'bài toán giải bằng hai bước tính',
      sgk: [5], say: 'Tìm từng số trên sơ đồ trước, rồi mới tính tổng!', tasks: pick(5) },
    { id: 'd4-word-2', n: 2, title: 'Tổng và hiệu', desc: 'Số bé = (Tổng − Hiệu) : 2, Số lớn = Số bé + Hiệu.', knowledge: 'sơ đồ đoạn thẳng',
      sgk: [25], say: 'Bớt phần hơn đi thì còn hai phần bằng nhau!', tasks: pick(25) },
    { id: 'd4-word-3', n: 3, title: 'Trộn các dạng', desc: 'Ba bước tính và tổng, hiệu.', knowledge: 'tìm hai số biết tổng và hiệu',
      sgk: [5, 25], say: 'Đọc kĩ đề: biết tổng và hiệu, hay biết từng số?', tasks: [...pick(5), ...pick(25)], missions: 6 },
  ],
});

export const UNIT4_GAME = taskDrill({
  id: 'd4-unit', icon: '⚖️', title: 'Đơn vị đo',
  purpose: 'Giúp em đổi và tính với yến, tạ, tấn; đề-xi-mét vuông, mét vuông, mi-li-mét vuông; giây, thế kỉ.',
  howTo: how(['🪜', 'Thang đơn vị'], ['🔁', 'Đổi đơn vị'], ['⚖️', 'So sánh'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd4-unit-1', n: 1, title: 'Yến, tạ, tấn', desc: 'Vd. 1 tấn = 10 tạ = 1 000 kg; 3 tạ 5 kg = 305 kg.', knowledge: 'ki-lô-gam, gam',
      sgk: [17], say: '1 yến = 10 kg, 1 tạ = 100 kg, 1 tấn = 1 000 kg!', tasks: pick(17) },
    { id: 'd4-unit-2', n: 2, title: 'dm², m², mm²', desc: 'Vd. 1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².', knowledge: 'xăng-ti-mét vuông, diện tích',
      sgk: [18], say: 'Hai đơn vị diện tích liền nhau gấp nhau 100 lần!', tasks: pick(18) },
    { id: 'd4-unit-3', n: 3, title: 'Giây, thế kỉ', desc: 'Vd. 1 phút = 60 giây; 1 thế kỉ = 100 năm; năm 2026 thuộc thế kỉ XXI.', knowledge: 'giờ, phút, năm',
      sgk: [19], say: '1 phút = 60 giây, 1 thế kỉ = 100 năm!', tasks: pick(19) },
    { id: 'd4-unit-4', n: 4, title: 'Trộn các dạng', desc: 'Khối lượng, diện tích, thời gian.', knowledge: 'yến, tạ, tấn, m², giây, thế kỉ',
      sgk: [21], say: 'Nhìn đơn vị trước: khối lượng, diện tích hay thời gian?', tasks: pick(21), missions: 6 },
  ],
});

export const ANGLE4_GAME = taskDrill({
  id: 'd4-angle', icon: '📐', title: 'Đo góc',
  purpose: 'Giúp em đặt thước đo góc cho đúng, đọc số đo góc, nhận ra góc nhọn, góc vuông, góc tù, góc bẹt.',
  howTo: how(['📐', 'Đặt thước'], ['🔢', 'Đọc số đo'], ['🔺', 'Nhọn, tù, bẹt'], ['✅', 'Đúng hết']),
  levels: [
    { id: 'd4-angle-1', n: 1, title: 'Đo góc', desc: 'Tâm thước trùng đỉnh góc, vạch 0° nằm trên một cạnh, đọc số ở cạnh kia.', knowledge: 'góc vuông, góc không vuông',
      sgk: [7], say: 'Đặt tâm thước vào đỉnh góc, vạch 0 trùng một cạnh!', tasks: pick(7) },
    { id: 'd4-angle-2', n: 2, title: 'Góc nhọn, góc tù, góc bẹt', desc: 'Bé hơn 90° là góc nhọn, lớn hơn 90° là góc tù, bằng 180° là góc bẹt.', knowledge: 'đo góc, đơn vị đo góc',
      sgk: [8], say: 'So với góc vuông 90°: bé hơn là nhọn, lớn hơn là tù!', tasks: pick(8) },
  ],
});

export const FRAC4_GAME = taskDrill({
  id: 'd4-frac', icon: '🍫', title: 'Phân số',
  purpose: 'Giúp em rút gọn, quy đồng mẫu số, cộng trừ phân số khác mẫu số, nhân, chia phân số, tìm phân số của một số.',
  howTo: how(['✂️', 'Rút gọn'], ['🍫', 'Quy đồng'], ['➕', 'Tính'], ['✅', 'Đúng hết']),
  book: NO_REF_BOOK,
  levels: [
    { id: 'd4-frac-1', n: 1, title: 'Quy đồng, cộng trừ', desc: 'Vd. 1/5 + 1/2; 2/5 − 1/4; 3 − 11/8; rút gọn 12/18.', knowledge: 'tính chất cơ bản của phân số',
      say: 'Khác mẫu số thì quy đồng trước rồi mới cộng, trừ!', tasks: FRACTION_DRILL_LEVELS[0].tasks },
    { id: 'd4-frac-2', n: 2, title: 'Nhân, chia phân số', desc: 'Vd. 2/3 × 4/5; 3/4 : 2/5; 3/4 của 20.', knowledge: 'cộng, trừ phân số',
      say: 'Chia cho một phân số là nhân với phân số đảo ngược!', tasks: FRACTION_DRILL_LEVELS[1].tasks },
  ],
});

// ── Hub ───────────────────────────────────────────────────────────────────────────────────────────────
const tool = (id, game, desc, tags) => ({ id, icon: game.icon, title: game.title, desc, tags, single: true, stalls: [{ game }] });

export const DRILL4_LIST = [
  tool('num', NUM4_GAME, 'Đọc, viết, phân tích, so sánh, làm tròn các số đến lớp triệu, số chẵn, số lẻ.', ['Hàng và lớp', 'So sánh', 'Làm tròn']),
  tool('col', COL4_GAME, 'Đặt tính cộng, trừ các số có sáu, bảy chữ số: thẳng cột, nhớ đúng số nhớ.', ['Có nhớ', 'Sáu chữ số', 'Bảy chữ số']),
  tool('mul', MUL_GAME, 'Nhân với số có một, hai, ba chữ số: tích riêng lùi một cột rồi cộng.', ['Tích riêng', 'Số có hai chữ số', 'Nâng cao']),
  tool('div', DIV4_GAME, 'Chia cho số có một, hai, ba chữ số: ước lượng thương rồi chia, nhân, trừ, hạ.', ['Ước lượng thương', 'Thương có chữ số 0', 'Nâng cao']),
  tool('expr', EXPR4_GAME, 'Tính giá trị biểu thức chứa chữ, ghép các số tròn chục, tròn trăm để tính thuận tiện.', ['Biểu thức chứa chữ', 'Giao hoán', 'Kết hợp']),
  tool('word', WORD4_GAME, 'Bài toán ba bước tính, tìm hai số khi biết tổng và hiệu bằng sơ đồ đoạn thẳng.', ['Ba bước tính', 'Tổng và hiệu']),
  tool('unit', UNIT4_GAME, 'Đổi, so sánh, tính với yến, tạ, tấn, dm², m², mm², giây, thế kỉ.', ['Yến, tạ, tấn', 'm², dm², mm²', 'Thế kỉ']),
  tool('angle', ANGLE4_GAME, 'Đặt thước đo góc, đọc số đo, phân biệt góc nhọn, góc tù, góc bẹt.', ['Thước đo góc', 'Nhọn, tù, bẹt']),
  tool('frac', FRAC4_GAME, 'Rút gọn, quy đồng, cộng, trừ, nhân, chia phân số.', ['Quy đồng', 'Khác mẫu số', 'Nhân, chia']),
  tool('shark', SHARK4_GAME, 'Cá mập mang phép tính bơi tới: tính nhẩm số tới ba chữ số, gõ đúng kết quả để bắn trúng!', ['Tính nhẩm', 'Nhân, chia với 10, 100', 'Tính nhanh']),
  tool('ufo', UFO4_GAME, 'Đĩa bay mang ổ khoá có số bị giấu: chọn đúng viên đạn, số thay vào ổ khoá là thấy đúng sai!', ['Biểu thức chứa chữ', 'Tìm x']),
];

export function render(app, onBack) {
  renderGamesHub(app, {
    // Cấp ghi "Bài 43…" theo SGK Toán 4 (số bài liên tục qua Tập Một, Tập Hai); không mở bài từ đây.
    book: 'sgk4', units: [], unitName: (u) => `Bài ${u.number}`, storageKey: 'g4-drill-none',
    openUnit() {}, onBack,
  }, null, {
    games: DRILL4_LIST, kicker: '🧮 Toán 4', title: 'Luyện Tính', icon: '🧮', unitFocus: null,
    lead: 'Luyện số lớn, phép tính, đơn vị đo, phân số như cách học ở lớp. Mỗi lượt là số mới!',
    levelLead: 'Chọn cấp. Cấp nào cũng làm được!',
  });
}
