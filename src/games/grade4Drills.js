/**
 * 🧮 Luyện Tính (lớp 4): nhân, chia đặt tính với số có nhiều chữ số, làm theo đúng cách học ở lớp (SGK Toán 4 Kết nối tri thức,
 * Tập Hai, Chủ đề Phép nhân và phép chia: Bài 38, 39, 43, 44). Cùng khung với Luyện Tính lớp 2, 3: hub và vòng chơi chung của
 * trò chơi tăng cường, cảnh lớp học, tờ vở ô li, bàn phím số (grade3Drills/kit.js). Sao ghi vào lớp 4 (tiền tố 'drill4').
 *   ✖️ Nhân nhiều chữ số: tích riêng lùi cột rồi cộng (grade4Drills/mul.js)
 *   ➗ Chia nhiều chữ số: dùng lại chia đặt tính lớp 3, số chia có hai, ba chữ số có bước ước lượng thương.
 * Số có ba chữ số (nhân, chia) là cấp nâng cao, ngoài SGK.
 */

import { renderGamesHub } from './grade3Games.js';
import { DIVISION_GAME } from './grade3Drills/division.js';
import { MUL_GAME } from './grade4Drills/mul.js';

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

// ── Hub ───────────────────────────────────────────────────────────────────────────────────────────────
const tool = (id, game, desc, tags) => ({ id, icon: game.icon, title: game.title, desc, tags, single: true, stalls: [{ game }] });

export const DRILL4_LIST = [
  tool('mul', MUL_GAME, 'Nhân với số có một, hai, ba chữ số: tích riêng lùi một cột rồi cộng.', ['Tích riêng', 'Số có hai chữ số', 'Nâng cao']),
  tool('div', DIV4_GAME, 'Chia cho số có một, hai, ba chữ số: ước lượng thương rồi chia, nhân, trừ, hạ.', ['Ước lượng thương', 'Thương có chữ số 0', 'Nâng cao']),
];

export function render(app, onBack) {
  renderGamesHub(app, {
    // Cấp ghi "Bài 43…" theo SGK Toán 4 (số bài liên tục qua Tập Một, Tập Hai); không mở bài từ đây.
    book: 'sgk4', units: [], unitName: (u) => `Bài ${u.number}`, storageKey: 'g4-drill-none',
    openUnit() {}, onBack,
  }, null, {
    games: DRILL4_LIST, kicker: '🧮 Toán 4', title: 'Luyện Tính', icon: '🧮', unitFocus: null,
    lead: 'Luyện nhân, chia số có nhiều chữ số. Mỗi lượt là số mới!',
    levelLead: 'Chọn cấp. Cấp nào cũng làm được!',
  });
}
