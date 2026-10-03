/**
 * Luyện nhanh từng phép của Toán 2, mỗi lượt 4 phép xếp thành 4 dòng to trên tờ vở (dùng chung phần chơi của
 * Luyện Tính lớp 3: grade3Drills/facts.js factsGame):
 *   ⚡ Bảng cộng, bảng trừ qua 10, số còn thiếu (□ + 7 = 15), tính dãy hai dấu (9 + 5 − 7).
 *   🔢 Bảng nhân 2, 5 và bảng chia 2, 5.
 *   🧠 Tính nhẩm số tròn chục, tròn trăm và cộng, trừ không nhớ trong phạm vi 100.
 * Lời nhắc khi sai theo đúng cách học ở lớp 2: làm tròn 10, "vì 2 × 6 = 12 nên 12 : 2 = 6", đổi ra chục, trăm.
 * Phép hay sai được ghi lại (kit.js noteFact) và ra lại nhiều hơn ở các lượt sau.
 */

import { factsGame, makeMental } from '../grade3Drills/facts.js';
import { weightedPick, loadWeak, how, MINUS } from '../grade3Drills/kit.js';

const PER = 4;

/** Chọn PER phép từ `pool` (không trùng trong lượt, ít trùng các lượt trước), phép hay sai được ưu tiên. */
function picker(makePool) {
  return (rng, history) => {
    const used = new Set(history.flatMap(h => h?.facts?.map(f => f.id) || []));
    const weak = loadWeak();
    const pool = makePool();
    const facts = [];
    for (let i = 0; i < PER; i++) {
      const notNow = pool.filter(f => !facts.some(x => x.id === f.id));
      const free = notNow.filter(f => !used.has(f.id));
      facts.push(weightedPick(rng, free.length ? free : notNow, (x) => 1 + 3 * (weak[x.id] || 0)));
    }
    return { facts };
  };
}

// ── Bảng cộng, bảng trừ (qua 10) ───────────────────────────────────────────────────────────────────────
/** a + b qua 10: "8 thêm 2 được 10, thêm 3 nữa được 13". */
const roundTip = (a, b) => `${a} + ${b}: ${a} thêm ${10 - a} được 10, thêm ${b - (10 - a)} nữa được ${a + b}.`;
const subTip = (s, b) => `${s} ${MINUS} ${b}: ${s} bớt ${s - 10} được 10, bớt tiếp ${b - (s - 10)} còn ${s - b}.`;

const addPairs = () => {
  const out = [];
  for (let a = 2; a <= 9; a++) for (let b = 2; b <= 9; b++) if (a + b > 10) out.push([a, b]);
  return out;
};

const addFact = ([a, b]) => ({ id: `${a}+${b}`, parts: [a, '+', b, '=', null], ans: a + b, say: `${a} cộng ${b} bằng ${a + b}.`, tip: roundTip(a, b) });
const subFact = ([a, b]) => {
  const s = a + b;
  return { id: `${s}-${b}`, parts: [s, MINUS, b, '=', null], ans: a, say: `${s} trừ ${b} bằng ${a}.`, tip: subTip(s, b) };
};
/** Số còn thiếu: □ + b = s, a + □ = s, s − □ = a (lớp 2 nhẩm bằng bảng cộng). */
const missFacts = ([a, b]) => {
  const s = a + b;
  return [
    { id: `?+${b}=${s}`, parts: [null, '+', b, '=', s], ans: a, say: `${a} cộng ${b} bằng ${s}, số cần điền là ${a}.`, tip: `Vì ${a} + ${b} = ${s} nên số cần điền là ${a}.` },
    { id: `${a}+?=${s}`, parts: [a, '+', null, '=', s], ans: b, say: `${a} cộng ${b} bằng ${s}, số cần điền là ${b}.`, tip: `Vì ${a} + ${b} = ${s} nên số cần điền là ${b}.` },
    { id: `${s}-?=${a}`, parts: [s, MINUS, null, '=', a], ans: b, say: `${s} trừ ${b} bằng ${a}, số cần điền là ${b}.`, tip: `Vì ${s} ${MINUS} ${b} = ${a} nên số cần điền là ${b}.` },
  ];
};
/** Dãy hai dấu trong phạm vi 20, tính từ trái sang phải: 9 + 5 − 7, 15 − 8 + 6. */
const chainFacts = () => {
  const out = [];
  for (const [a, b] of addPairs()) {
    const s = a + b;
    for (let c = 2; c <= 9; c++) {
      if (s - c >= 0 && (c > s - 10)) out.push({ x: a, o1: '+', y: b, m: s, o2: MINUS, z: c, r: s - c });
    }
  }
  for (let s = 11; s <= 18; s++) for (let b = s - 9; b <= 9; b++) {
    const m = s - b;
    for (let c = 2; c <= 9; c++) if (m + c > 10 && m + c <= 20) out.push({ x: s, o1: MINUS, y: b, m, o2: '+', z: c, r: m + c });
  }
  const w = { '+': 'cộng', [MINUS]: 'trừ' };
  return out.map(q => ({
    id: `${q.x}${q.o1}${q.y}${q.o2}${q.z}`, parts: [q.x, q.o1, q.y, q.o2, q.z, '=', null], ans: q.r,
    say: `${q.x} ${w[q.o1]} ${q.y} bằng ${q.m}, ${q.m} ${w[q.o2]} ${q.z} bằng ${q.r}.`,
    tip: `Tính từ trái sang phải: ${q.x} ${q.o1} ${q.y} = ${q.m}, ${q.m} ${q.o2} ${q.z} = ${q.r}.`,
  }));
};

export const ADD_LEVELS = [
  { id: 'd2-add-1', n: 1, title: 'Bảng cộng qua 10', desc: 'Vd. 8 + 5 = ?', knowledge: 'cộng qua 10 trong phạm vi 20', lessons: { g2: ['bai-8'] }, gen: picker(() => addPairs().map(addFact)) },
  { id: 'd2-add-2', n: 2, title: 'Bảng trừ qua 10', desc: 'Vd. 13 − 5 = ?', knowledge: 'trừ qua 10 trong phạm vi 20', lessons: { g2: ['bai-12'] }, gen: picker(() => addPairs().map(subFact)) },
  { id: 'd2-add-3', n: 3, title: 'Số còn thiếu', desc: 'Vd. ? + 7 = 15, 14 − ? = 6.', knowledge: 'bảng cộng, bảng trừ qua 10', lessons: { g2: ['bai-3', 'bai-14'] }, gen: picker(() => addPairs().flatMap(missFacts)) },
  { id: 'd2-add-4', n: 4, title: 'Tính từ trái sang phải', desc: 'Vd. 9 + 5 − 7 = ?', knowledge: 'bảng cộng, bảng trừ qua 10', lessons: { g2: ['bai-10', 'bai-14'] }, gen: picker(chainFacts) },
].map(l => ({ ...l, missions: 5, ask: () => 'Mỗi lượt 4 phép tính. Tính thật nhanh mà vẫn đúng!' }));

// ── Bảng nhân 2, 5 và bảng chia 2, 5 ─────────────────────────────────────────────────────────────────
const mulFact = (t, b) => ({
  id: `${t}x${b}`, parts: [t, '×', b, '=', null], ans: t * b, say: `${t} nhân ${b} bằng ${t * b}.`,
  tip: b > 1 ? `${t} × ${b} = ${t * b}. Mẹo: ${t} × ${b - 1} = ${t * (b - 1)}, thêm ${t} nữa là ${t * b}.` : `${t} × 1 = ${t}.`,
});
const divFact = (t, b) => ({
  id: `${t * b}:${t}`, parts: [t * b, ':', t, '=', null], ans: b, say: `${t * b} chia ${t} bằng ${b}.`,
  tip: `Vì ${t} × ${b} = ${t * b} nên ${t * b} : ${t} = ${b}.`,
});
const mulMiss = (t, b) => ({
  id: `${t}x?${b}`, parts: [t, '×', null, '=', t * b], ans: b, say: `${t} nhân ${b} bằng ${t * b}, số cần điền là ${b}.`,
  tip: `Nhẩm bảng nhân ${t}: ${t} × ${b} = ${t * b}.`,
});
const tablePool = (tables, kinds) => () => tables.flatMap(t => Array.from({ length: 10 }, (_, i) => i + 1)
  .flatMap(b => kinds.map(kd => (kd === 'mul' ? mulFact(t, b) : kd === 'div' ? divFact(t, b) : mulMiss(t, b)))));

export const TAB_LEVELS = [
  { id: 'd2-tab-1', n: 1, title: 'Bảng nhân 2', desc: 'Vd. 2 × 7 = ?', knowledge: 'phép nhân', lessons: { g2: ['bai-39'] }, gen: picker(tablePool([2], ['mul'])) },
  { id: 'd2-tab-2', n: 2, title: 'Bảng nhân 5', desc: 'Vd. 5 × 6 = ?', knowledge: 'phép nhân', lessons: { g2: ['bai-40'] }, gen: picker(tablePool([5], ['mul'])) },
  { id: 'd2-tab-3', n: 3, title: 'Bảng chia 2', desc: 'Vd. 14 : 2 = ?', knowledge: 'bảng nhân 2, phép chia', lessons: { g2: ['bai-43'] }, gen: picker(tablePool([2], ['div'])) },
  { id: 'd2-tab-4', n: 4, title: 'Bảng chia 5', desc: 'Vd. 30 : 5 = ?', knowledge: 'bảng nhân 5, phép chia', lessons: { g2: ['bai-44'] }, gen: picker(tablePool([5], ['div'])) },
  { id: 'd2-tab-5', n: 5, title: 'Trộn nhân, chia 2 và 5', desc: 'Vd. 5 × ? = 35, 18 : 2 = ?', knowledge: 'bảng nhân, bảng chia 2 và 5', lessons: { g2: ['bai-45', 'bai-71'] }, gen: picker(tablePool([2, 5], ['mul', 'div', 'miss'])) },
].map(l => ({ ...l, missions: 5, ask: () => 'Mỗi lượt 4 phép tính. Đọc thầm bảng nhân để nhớ!' }));

// ── Tính nhẩm ─────────────────────────────────────────────────────────────────────────────────────────
/** Cộng, trừ không nhớ trong phạm vi 100: 34 + 5, 67 − 4, 52 + 30, 86 − 40 (nhẩm theo chục, đơn vị). */
function noCarryPool() {
  const out = [];
  for (let t = 1; t <= 9; t++) for (let u = 0; u <= 9; u++) {
    const x = t * 10 + u;
    for (let d = 1; d <= 9; d++) {
      if (u + d <= 9) out.push({ x, op: '+', y: d, r: x + d, tip: `${t} chục ${u} đơn vị thêm ${d} đơn vị là ${t} chục ${u + d} đơn vị: ${x + d}.` });
      if (u - d >= 0 && u > 0) out.push({ x, op: MINUS, y: d, r: x - d, tip: `${t} chục ${u} đơn vị bớt ${d} đơn vị là ${t} chục ${u - d} đơn vị: ${x - d}.` });
      if (t + d <= 9 && u > 0) out.push({ x, op: '+', y: d * 10, r: x + d * 10, tip: `${t} chục thêm ${d} chục là ${t + d} chục, vậy ${x} + ${d * 10} = ${x + d * 10}.` });
      if (t - d >= 1 && u > 0) out.push({ x, op: MINUS, y: d * 10, r: x - d * 10, tip: `${t} chục bớt ${d} chục là ${t - d} chục, vậy ${x} ${MINUS} ${d * 10} = ${x - d * 10}.` });
    }
  }
  const w = { '+': 'cộng', [MINUS]: 'trừ' };
  return out.map(q => ({ id: `n:${q.x}${q.op}${q.y}`, parts: [q.x, q.op, q.y, '=', null], ans: q.r, say: `${q.x} ${w[q.op]} ${q.y} bằng ${q.r}.`, tip: q.tip }));
}

export const MEN_LEVELS = [
  { id: 'd2-men-1', n: 1, title: 'Số tròn chục', desc: 'Vd. 30 + 50, 90 − 40.', knowledge: 'cộng, trừ trong phạm vi 10', lessons: { g2: ['bai-5'] }, gen: makeMental([10], ['+', '−']) },
  { id: 'd2-men-2', n: 2, title: 'Cộng, trừ không nhớ', desc: 'Vd. 34 + 5, 67 − 4, 52 + 30.', knowledge: 'chục và đơn vị, cộng trừ trong phạm vi 10', lessons: { g2: ['bai-5'] }, gen: picker(noCarryPool) },
  { id: 'd2-men-3', n: 3, title: 'Số tròn trăm', desc: 'Vd. 300 + 400, 800 − 500.', knowledge: 'số tròn trăm', lessons: { g2: ['bai-49', 'bai-59', 'bai-61'] }, gen: makeMental([100], ['+', '−']) },
].map(l => ({ ...l, missions: 5, ask: () => 'Nhẩm theo chục, trăm: 3 chục cộng 5 chục bằng 8 chục!' }));

// ── Ba công cụ ────────────────────────────────────────────────────────────────────────────────────────
const g2 = (meta, levels) => ({ ...factsGame(meta, levels), starPrefix: 'drill2' });

export const ADD_GAME = g2({
  id: 'd2-add', icon: '⚡', title: 'Bảng cộng, bảng trừ',
  purpose: 'Giúp em thuộc bảng cộng, bảng trừ qua 10 trong phạm vi 20, tìm số còn thiếu và tính từ trái sang phải. Phép nào em hay sai sẽ được ra lại nhiều hơn.',
  howTo: how(['👀', 'Đọc phép tính'], ['🔟', 'Làm tròn 10'], ['⌨️', 'Gõ kết quả'], ['✅', 'Đúng cả 4 phép']),
}, ADD_LEVELS);

export const TAB_GAME = g2({
  id: 'd2-tab', icon: '🔢', title: 'Bảng nhân, bảng chia 2 và 5',
  purpose: 'Giúp em thuộc bảng nhân 2, bảng nhân 5, bảng chia 2, bảng chia 5. Phép nào em hay sai sẽ được ra lại nhiều hơn cho tới khi em thuộc.',
  howTo: how(['👀', 'Đọc phép tính'], ['⌨️', 'Gõ kết quả'], ['✅', 'Đúng cả 4 phép']),
}, TAB_LEVELS);

export const MEN_GAME = g2({
  id: 'd2-men', icon: '🧠', title: 'Tính nhẩm',
  purpose: 'Giúp em tính nhẩm số tròn chục, tròn trăm và cộng, trừ không nhớ như cách học ở lớp: đổi ra chục, trăm rồi tính với số nhỏ.',
  howTo: how(['🔟', 'Đổi ra chục, trăm'], ['🧠', 'Nhẩm số nhỏ'], ['⌨️', 'Gõ kết quả']),
}, MEN_LEVELS);
