/**
 * Lớp 1 (Kết nối tri thức): đếm, so sánh, cộng trừ trong phạm vi 10, 20, 100, hình phẳng, giờ đúng, ngày trong tuần, lời văn một bước.
 * LEVELS[i] = khuôn của câu số i + 1 (1–5 rất dễ, 6–10 khó hơn, 11–15 thử thách mà vẫn trong sức bé).
 */
import { ri, pick, shuffle, fmt, numQ } from './util.js';

const THINGS = [['🍎', 'quả táo'], ['⭐', 'ngôi sao'], ['🐟', 'con cá'], ['🌸', 'bông hoa'], ['🎈', 'quả bóng bay'], ['🐥', 'chú gà con'], ['🚗', 'chiếc ô tô']];
const DAYS = ['thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy', 'Chủ nhật'];
const SHAPES = ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật'];
const NAMES = ['Lan', 'Minh', 'Hoa', 'Nam', 'Mai', 'An', 'Bình', 'Hà'];

const count = (r) => {
  const [e, n] = pick(r, THINGS), k = ri(r, 3, 9);
  return numQ(r, `Có bao nhiêu ${n}: ${e.repeat(k)}?`, k, [k - 1, k + 1, k + 2], `Đếm lần lượt từng ${n}: có ${k} ${n}.`);
};
const biggest = (r, small = false) => {
  const xs = shuffle(r, [...new Set(Array.from({ length: 8 }, () => ri(r, 0, 10)))]).slice(0, 4);
  while (xs.length < 4) { const v = ri(r, 0, 10); if (!xs.includes(v)) xs.push(v); }
  const ans = small ? Math.min(...xs) : Math.max(...xs);
  return { q: `Trong các số ${xs.join(', ')}, số nào ${small ? 'bé' : 'lớn'} nhất?`, a: String(ans), w: xs.filter(v => v !== ans).map(String), ex: `Số ${ans} ${small ? 'bé' : 'lớn'} nhất trong các số đó.` };
};
const add = (r, lo, hi, max) => {
  const a = ri(r, lo, hi), b = ri(r, lo, Math.max(lo, max - a));
  return numQ(r, `${a} + ${b} = ?`, a + b, [a + b - 1, a + b + 1, Math.abs(a - b)], `${a} + ${b} = ${a + b}.`);
};
const sub = (r, max) => {
  const a = ri(r, 3, max), b = ri(r, 1, a - 1);
  return numQ(r, `${a} − ${b} = ?`, a - b, [a - b + 1, a - b - 1, a + b], `${a} − ${b} = ${a - b}.`);
};
const nextPrev = (r) => {
  const n = ri(r, 1, 19), after = r() < 0.5;
  const ans = after ? n + 1 : n - 1;
  return numQ(r, `Số liền ${after ? 'sau' : 'trước'} của ${n} là số nào?`, ans, [after ? n - 1 : n + 1, n, ans + (after ? 1 : -1)], `Số liền ${after ? 'sau' : 'trước'} của ${n} là ${ans}.`);
};
const teen = (r) => {
  const a = ri(r, 10, 15), b = ri(r, 1, 19 - a);
  return r() < 0.5
    ? numQ(r, `${a} + ${b} = ?`, a + b, [a + b + 1, a + b - 1, a + b + 10], `${a} + ${b} = ${a + b}.`)
    : numQ(r, `${a + b} − ${b} = ?`, a, [a + 1, a - 1, a + 2 * b], `${a + b} − ${b} = ${a}.`);
};
const shape = (r) => pick(r, [
  () => ({ q: 'Hình nào có 3 cạnh?', a: 'Hình tam giác', w: SHAPES.filter(s => s !== 'Hình tam giác'), ex: 'Hình tam giác có 3 cạnh và 3 góc.' }),
  () => ({ q: 'Hình nào không có cạnh nào?', a: 'Hình tròn', w: SHAPES.filter(s => s !== 'Hình tròn'), ex: 'Hình tròn có đường cong, không có cạnh thẳng.' }),
  () => ({ q: 'Hình nào có 4 cạnh dài bằng nhau?', a: 'Hình vuông', w: SHAPES.filter(s => s !== 'Hình vuông'), ex: 'Hình vuông có 4 cạnh dài bằng nhau.' }),
  () => ({ q: 'Hình vuông có mấy cạnh?', a: '4 cạnh', w: ['3 cạnh', '5 cạnh', '2 cạnh'], ex: 'Hình vuông có 4 cạnh.' }),
  () => ({ q: 'Hình tam giác có mấy góc?', a: '3 góc', w: ['4 góc', '2 góc', '5 góc'], ex: 'Hình tam giác có 3 góc.' }),
  () => ({ q: 'Hình chữ nhật có mấy cạnh?', a: '4 cạnh', w: ['3 cạnh', '2 cạnh', '5 cạnh'], ex: 'Hình chữ nhật có 4 cạnh: 2 cạnh dài và 2 cạnh ngắn.' }),
  () => ({ q: 'Hình nào có 2 cạnh dài và 2 cạnh ngắn?', a: 'Hình chữ nhật', w: SHAPES.filter(s => s !== 'Hình chữ nhật'), ex: 'Hình chữ nhật có 2 cạnh dài bằng nhau và 2 cạnh ngắn bằng nhau.' }),
  () => ({ q: 'Quả bóng có dạng khối gì?', a: 'Khối cầu', w: ['Khối lập phương', 'Khối hộp chữ nhật', 'Hình tròn'], ex: 'Quả bóng tròn đều mọi phía: khối cầu.' }),
  () => ({ q: 'Con xúc xắc có dạng khối gì?', a: 'Khối lập phương', w: ['Khối cầu', 'Khối hộp chữ nhật', 'Hình vuông'], ex: 'Xúc xắc có 6 mặt là hình vuông bằng nhau: khối lập phương.' }),
  () => ({ q: 'Hộp bút thường có dạng khối gì?', a: 'Khối hộp chữ nhật', w: ['Khối cầu', 'Khối lập phương', 'Hình chữ nhật'], ex: 'Hộp bút dài, các mặt là hình chữ nhật: khối hộp chữ nhật.' }),
])();
const tensUnits = (r) => {
  const c = ri(r, 1, 9), d = ri(r, 0, 9);
  if (r() < 0.5) return numQ(r, `Số gồm ${c} chục và ${d} đơn vị là số nào?`, c * 10 + d, [d * 10 + c, c + d, c * 10], `${c} chục là ${c * 10}, thêm ${d} đơn vị được ${c * 10 + d}.`);
  const n = c * 10 + d;
  return { q: `Số ${n} gồm mấy chục và mấy đơn vị?`, a: `${c} chục và ${d} đơn vị`, w: [`${d} chục và ${c} đơn vị`, `${n} chục`, `${c} đơn vị và ${d} chục`, `${c + 1} chục và ${d} đơn vị`].filter(x => x !== `${c} chục và ${d} đơn vị`), ex: `${n} = ${c * 10} + ${d}: ${c} chục và ${d} đơn vị.` };
};
const roundTens = (r) => {
  const a = ri(r, 1, 8) * 10, b = ri(r, 1, 9 - a / 10) * 10;
  return r() < 0.5
    ? numQ(r, `${a} + ${b} = ?`, a + b, [a + b - 10, a + b + 10, a / 10 + b / 10], `${a / 10} chục cộng ${b / 10} chục là ${(a + b) / 10} chục: ${a + b}.`)
    : numQ(r, `${a + b} − ${b} = ?`, a, [a + 10, a - 10, a + 2 * b], `${(a + b) / 10} chục trừ ${b / 10} chục là ${a / 10} chục: ${a}.`);
};
const add100 = (r) => {
  const a1 = ri(r, 1, 7), b1 = ri(r, 1, 8 - a1), a0 = ri(r, 0, 8), b0 = ri(r, 0, 9 - a0);
  const a = a1 * 10 + a0, b = b1 * 10 + b0;
  return numQ(r, `${a} + ${b} = ?`, a + b, [a + b + 10, a + b - 10, a + b + 1], `Cộng đơn vị: ${a0} + ${b0} = ${a0 + b0}; cộng chục: ${a1} + ${b1} = ${a1 + b1}. Vậy ${a} + ${b} = ${a + b}.`);
};
const sub100 = (r) => {
  const a1 = ri(r, 3, 9), b1 = ri(r, 1, a1 - 1), a0 = ri(r, 1, 9), b0 = ri(r, 0, a0);
  const a = a1 * 10 + a0, b = b1 * 10 + b0;
  return numQ(r, `${a} − ${b} = ?`, a - b, [a - b + 10, a - b - 10, a - b + 1], `Trừ đơn vị: ${a0} − ${b0} = ${a0 - b0}; trừ chục: ${a1} − ${b1} = ${a1 - b1}. Vậy ${a} − ${b} = ${a - b}.`);
};
const clock = (r) => {
  if (r() < 0.5) {
    const h = ri(r, 1, 12);
    return { q: `Kim ngắn chỉ số ${h}, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?`, a: `${h} giờ`, w: [`12 giờ`, `${h % 12 + 1} giờ`, `${h === 1 ? 11 : h - 1} giờ`].filter(x => x !== `${h} giờ`).concat(['6 giờ', '9 giờ']), ex: `Kim dài chỉ số 12, kim ngắn chỉ số ${h}: đúng ${h} giờ.` };
  }
  const d = ri(r, 0, 6), fwd = r() < 0.5;
  const ans = DAYS[(d + (fwd ? 1 : 6)) % 7];
  return { q: `Hôm nay là ${DAYS[d]}. ${fwd ? 'Ngày mai' : 'Hôm qua'} là thứ mấy?`, a: ans, w: shuffle(r, DAYS.filter(x => x !== ans && x !== DAYS[d])).concat([DAYS[d]]).slice(0, 3), ex: `Thứ tự các ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật. ${fwd ? 'Ngày mai' : 'Hôm qua'} của ${DAYS[d]} là ${ans}.` };
};
const story = (r) => {
  const n = pick(r, NAMES), give = r() < 0.5;
  if (give) {
    const a = ri(r, 12, 19), b = ri(r, 2, a - 10);
    return numQ(r, `${n} có ${a} cái kẹo, ${n} cho bạn ${b} cái. ${n} còn lại bao nhiêu cái kẹo?`, a - b, [a + b, a - b + 1, b], `${a} − ${b} = ${a - b} (cái kẹo).`, { unit: ' cái' });
  }
  const a = ri(r, 10, 40), b = ri(r, 10, 99 - a - 5);
  return numQ(r, `Lớp 1A có ${a} bạn nữ và ${b} bạn nam. Lớp 1A có tất cả bao nhiêu bạn?`, a + b, [a + b - 10, a + b + 1, Math.abs(a - b)], `${a} + ${b} = ${a + b} (bạn).`, { unit: ' bạn' });
};
const missing = (r) => {
  const a = ri(r, 11, 50), b = ri(r, 10, 99 - a);
  return r() < 0.5
    ? numQ(r, `? + ${b} = ${a + b}. Số cần điền là số nào?`, a, [a + 2 * b, a + 10, a - 1], `Lấy ${a + b} − ${b} = ${a}.`)
    : numQ(r, `${a + b} − ? = ${a}. Số cần điền là số nào?`, b, [a + b + a, b + 10, b - 1], `Lấy ${a + b} − ${a} = ${b}.`);
};
const chain = (r) => {
  const a = ri(r, 2, 5) * 10, b = ri(r, 1, 4) * 10, c = ri(r, 1, (a + b) / 10 - 1) * 10;
  return numQ(r, `${a} + ${b} − ${c} = ?`, a + b - c, [a + b + c, a - b + c, a + b - c + 10], `${a} + ${b} = ${a + b}; ${a + b} − ${c} = ${a + b - c}.`);
};
const tricky = (r) => pick(r, [
  () => numQ(r, 'Số lớn nhất có hai chữ số là số nào?', 99, [90, 98, 100], 'Hai chữ số lớn nhất đều là 9: số 99.'),
  () => numQ(r, 'Số bé nhất có hai chữ số là số nào?', 10, [11, 1, 0], 'Số bé nhất có hai chữ số là 10.'),
  () => numQ(r, 'Số lớn nhất có hai chữ số khác nhau là số nào?', 98, [99, 89, 90], 'Chữ số hàng chục lớn nhất là 9, chữ số hàng đơn vị khác 9 lớn nhất là 8: số 98.'),
  () => { const c = ri(r, 1, 9); return numQ(r, `Có bao nhiêu số có hai chữ số mà chữ số hàng chục là ${c}?`, 10, [9, 11, c], `Đó là các số từ ${c}0 đến ${c}9: có 10 số.`); },
  () => { const a = ri(r, 5, 8), d = ri(r, 2, 5); return numQ(r, `Năm nay em ${a} tuổi, chị hơn em ${d} tuổi. Hai năm nữa chị bao nhiêu tuổi?`, a + d + 2, [a + d, a + 2, a + d + 1], `Chị năm nay ${a} + ${d} = ${a + d} tuổi; hai năm nữa chị ${a + d + 2} tuổi.`, { unit: ' tuổi' }); },
  () => { const a = ri(r, 20, 60), b = a + ri(r, 4, 9); return numQ(r, `Có bao nhiêu số lớn hơn ${a} và bé hơn ${b}?`, b - a - 1, [b - a, b - a + 1, b - a - 2], `Các số đó là từ ${a + 1} đến ${b - 1}: có ${b - a - 1} số.`); },
])();
const biggestExpr = (r) => {
  const xs = []; const seen = new Set();
  while (xs.length < 4) {
    const a = ri(r, 10, 60), b = ri(r, 1, 30), plus = r() < 0.5;
    const v = plus ? a + b : a - b;
    if (v < 0 || seen.has(v)) continue;
    seen.add(v); xs.push({ t: `${a} ${plus ? '+' : '−'} ${b}`, v });
  }
  const top = xs.reduce((m, x) => (x.v > m.v ? x : m));
  return { q: 'Phép tính nào có kết quả lớn nhất?', a: top.t, w: xs.filter(x => x !== top).map(x => x.t), ex: xs.map(x => `${x.t} = ${x.v}`).join('; ') + '.' };
};

export const LEVELS = [
  ['dem', [count, (r) => biggest(r)]],
  ['cong-tru', [(r) => add(r, 1, 5, 10)]],
  ['cong-tru', [(r) => sub(r, 10)]],
  ['so-sanh', [(r) => biggest(r, true), (r) => biggest(r)]],
  ['so', [nextPrev, teen]],
  ['hinh', [shape]],
  ['so', [tensUnits]],
  ['cong-tru', [roundTens]],
  ['cong-tru', [add100]],
  ['cong-tru', [sub100]],
  ['thoi-gian', [clock]],
  ['loi-van', [story]],
  ['tim-so', [missing]],
  ['cong-tru', [chain, biggestExpr]],
  ['thu-thach', [tricky]],
];
export { fmt };
