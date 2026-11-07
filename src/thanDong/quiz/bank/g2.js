/**
 * Lớp 2 (Kết nối tri thức): cộng trừ qua 10, có nhớ trong phạm vi 100 và 1000, bảng nhân chia 2 và 5, số đến 1000, đơn vị đo
 * (cm, dm, m, km, kg, lít), giờ phút, ngày tháng, tiền Việt Nam, đường gấp khúc, lời văn.
 */
import { ri, pick, shuffle, fmt, numQ } from './util.js';

const NAMES = ['Lan', 'Minh', 'Hoa', 'Nam', 'Mai', 'An', 'Bình', 'Hà'];

const carry20 = (r) => {
  const a = ri(r, 6, 9), b = ri(r, 11 - a, 9);
  return r() < 0.5
    ? numQ(r, `${a} + ${b} = ?`, a + b, [a + b - 1, a + b + 1, a + b - 10], `${a} + ${b}: tách ${b} = ${10 - a} + ${b - 10 + a}; ${a} + ${10 - a} = 10; 10 + ${b - 10 + a} = ${a + b}.`)
    : numQ(r, `${a + b} − ${b} = ?`, a, [a + 1, a - 1, a + 10], `${a + b} − ${b} = ${a}.`);
};
const neighbours = (r) => {
  const n = ri(r, 11, 98);
  return pick(r, [
    () => numQ(r, `Số liền sau của ${n} là số nào?`, n + 1, [n - 1, n + 10, n + 2], `Số liền sau của ${n} là ${n + 1}.`),
    () => numQ(r, `Số liền trước của ${n} là số nào?`, n - 1, [n + 1, n - 10, n - 2], `Số liền trước của ${n} là ${n - 1}.`),
    () => { const xs = shuffle(r, [n, (n % 10) * 10 + Math.floor(n / 10), n + 9, Math.max(1, n - 11)]); const m = Math.max(...xs); return { q: `Số nào lớn nhất: ${xs.join(', ')}?`, a: String(m), w: xs.filter(x => x !== m).map(String).concat([String(m + 1)]), ex: `So sánh chữ số hàng chục trước: ${m} lớn nhất.` }; },
  ])();
};
const mul25 = (r) => {
  const t = pick(r, [2, 5]), k = ri(r, 2, 10);
  return numQ(r, `${t} × ${k} = ?`, t * k, [t * k + t, t * k - t, t + k], `${t} được lấy ${k} lần: ${t} × ${k} = ${t * k}.`);
};
const div25 = (r) => {
  const t = pick(r, [2, 5]), k = ri(r, 2, 10);
  return numQ(r, `${t * k} : ${t} = ?`, k, [k + 1, k - 1, t * k - t], `Vì ${t} × ${k} = ${t * k} nên ${t * k} : ${t} = ${k}.`);
};
const carryAdd = (r) => {
  const a0 = ri(r, 3, 9), b0 = ri(r, 10 - a0, 9), a1 = ri(r, 1, 6), b1 = ri(r, 1, 8 - a1);
  const a = a1 * 10 + a0, b = b1 * 10 + b0;
  return numQ(r, `${a} + ${b} = ?`, a + b, [a + b - 10, a + b + 10, a + b - 1], `${a0} + ${b0} = ${a0 + b0}, viết ${(a0 + b0) % 10} nhớ 1; ${a1} + ${b1} thêm 1 bằng ${a1 + b1 + 1}. Vậy ${a} + ${b} = ${a + b}.`);
};
const borrowSub = (r) => {
  const a1 = ri(r, 3, 9), b1 = ri(r, 1, a1 - 1), a0 = ri(r, 0, 7), b0 = ri(r, a0 + 1, 9);
  const a = a1 * 10 + a0, b = b1 * 10 + b0;
  return numQ(r, `${a} − ${b} = ?`, a - b, [a - b + 10, (a1 - b1) * 10 + (b0 - a0), a - b - 1], `${a0} không trừ được ${b0}, lấy ${a0 + 10} − ${b0} = ${a0 + 10 - b0}, nhớ 1; ${b1} thêm 1 bằng ${b1 + 1}, ${a1} − ${b1 + 1} = ${a1 - b1 - 1}. Vậy ${a} − ${b} = ${a - b}.`);
};
const units = (r) => pick(r, [
  () => numQ(r, '1 dm bằng bao nhiêu xăng-ti-mét?', 10, [100, 1, 1000], '1 dm = 10 cm.', { unit: ' cm' }),
  () => numQ(r, '1 m bằng bao nhiêu xăng-ti-mét?', 100, [10, 1000, 50], '1 m = 100 cm.', { unit: ' cm' }),
  () => numQ(r, '1 m bằng bao nhiêu đề-xi-mét?', 10, [100, 1, 1000], '1 m = 10 dm.', { unit: ' dm' }),
  () => numQ(r, '1 km bằng bao nhiêu mét?', 1000, [100, 10, 10000], '1 km = 1000 m.', { unit: ' m' }),
  () => { const a = ri(r, 12, 40), b = ri(r, 10, 40); return numQ(r, `Bao gạo nặng ${a} kg, bao ngô nặng ${b} kg. Cả hai bao nặng bao nhiêu ki-lô-gam?`, a + b, [Math.abs(a - b), a + b + 10, a + b - 1], `${a} + ${b} = ${a + b} (kg).`, { unit: ' kg' }); },
  () => { const a = ri(r, 10, 30), b = ri(r, 2, a - 3); return numQ(r, `Thùng có ${a} l nước, đã dùng ${b} l. Thùng còn bao nhiêu lít nước?`, a - b, [a + b, a - b + 1, a - b - 10], `${a} − ${b} = ${a - b} (l).`, { unit: ' l' }); },
])();
const hundreds = (r) => {
  const t = ri(r, 1, 9), c = ri(r, 0, 9), d = ri(r, 0, 9), n = t * 100 + c * 10 + d;
  return pick(r, [
    () => numQ(r, `Số gồm ${t} trăm, ${c} chục và ${d} đơn vị là số nào?`, n, [d * 100 + c * 10 + t, t * 100 + d * 10 + c, t + c + d], `${t * 100} + ${c * 10} + ${d} = ${n}.`),
    () => numQ(r, `Số ${n} có chữ số hàng trăm là mấy?`, t, [c, d, t * 100], `${n} = ${t} trăm ${c} chục ${d} đơn vị: chữ số hàng trăm là ${t}.`),
    () => { const m = t * 100 + d; return { q: `Số ${m} đọc là gì?`, a: `${read3(m)}`, w: [read3(t * 100 + d * 10), read3(d * 100 + t), read3(t * 100 + d + 10)].filter((x, i, a) => x !== read3(m) && a.indexOf(x) === i).concat([read3(m + 100)]), ex: `${m}: ${read3(m)}.` }; },
  ])();
};
const DIG = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
/** Đọc số có ba chữ số kiểu lớp 2 (607: sáu trăm linh bảy, 215: hai trăm mười lăm, 341: ba trăm bốn mươi mốt). */
export function read3(n) {
  const t = Math.floor(n / 100), c = Math.floor(n / 10) % 10, d = n % 10;
  let s = `${DIG[t]} trăm`;
  if (c === 0 && d === 0) return cap(s);
  if (c === 0) return cap(`${s} linh ${DIG[d]}`);
  s += c === 1 ? ' mười' : ` ${DIG[c]} mươi`;
  if (d === 0) return cap(s);
  if (d === 5) return cap(`${s} lăm`);
  if (d === 1 && c > 1) return cap(`${s} mốt`);
  if (d === 4 && c > 1) return cap(`${s} tư`);
  return cap(`${s} ${DIG[d]}`);
}
const cap = (s) => s[0].toUpperCase() + s.slice(1);
const add1000 = (r) => {
  const p = () => [ri(r, 1, 4), ri(r, 0, 4), ri(r, 0, 4)];
  const [a2, a1, a0] = p(), [b2, b1, b0] = p();
  const a = a2 * 100 + a1 * 10 + a0, b = b2 * 100 + b1 * 10 + b0;
  return r() < 0.5
    ? numQ(r, `${a} + ${b} = ?`, a + b, [a + b + 100, a + b - 10, a + b + 1], `Cộng từng hàng từ phải sang trái: ${a} + ${b} = ${a + b}.`)
    : numQ(r, `${a + b} − ${b} = ?`, a, [a + 100, a - 10, a + 2 * b], `Trừ từng hàng từ phải sang trái: ${a + b} − ${b} = ${a}.`);
};
const time = (r) => pick(r, [
  () => numQ(r, '1 giờ bằng bao nhiêu phút?', 60, [100, 30, 24], '1 giờ = 60 phút.', { unit: ' phút' }),
  () => numQ(r, 'Một ngày có bao nhiêu giờ?', 24, [12, 60, 30], 'Một ngày có 24 giờ.', { unit: ' giờ' }),
  () => numQ(r, 'Một tuần lễ có bao nhiêu ngày?', 7, [5, 6, 10], 'Một tuần có 7 ngày: thứ Hai đến Chủ nhật.', { unit: ' ngày' }),
  () => { const h = ri(r, 7, 11); return { q: `${h} giờ 30 phút còn gọi là gì?`, a: `${h} giờ rưỡi`, w: [`${h} giờ kém 30`, `${h + 1} giờ rưỡi`, `${h} giờ 3 phút`], ex: `30 phút là nửa giờ: ${h} giờ 30 phút là ${h} giờ rưỡi.` }; },
  () => { const h = ri(r, 7, 10); return { q: `${h} giờ 15 phút còn gọi là gì?`, a: `${h} giờ 15 phút`, w: [`${h} giờ rưỡi`, `${h + 1} giờ kém 15 phút`, `${h} giờ 50 phút`], ex: `Kim phút chỉ số 3 là 15 phút: ${h} giờ 15 phút.` }; },
  () => { const m = pick(r, [[1, 31], [3, 31], [4, 30], [6, 30], [8, 31], [12, 31]]); return numQ(r, `Tháng ${m[0]} có bao nhiêu ngày?`, m[1], [m[1] === 31 ? 30 : 31, 28, 29], `Tháng ${m[0]} có ${m[1]} ngày.`, { unit: ' ngày' }); },
])();
const mulStory = (r) => pick(r, [
  () => { const k = ri(r, 3, 9); return numQ(r, `Mỗi bông hoa có 5 cánh. ${k} bông hoa có bao nhiêu cánh hoa?`, 5 * k, [5 + k, 5 * k - 5, 5 * k + 5], `5 × ${k} = ${5 * k} (cánh hoa).`, { unit: ' cánh' }); },
  () => { const k = ri(r, 3, 10); return numQ(r, `Mỗi bạn có 2 chiếc đũa. ${k} bạn có bao nhiêu chiếc đũa?`, 2 * k, [2 + k, 2 * k + 2, k], `2 × ${k} = ${2 * k} (chiếc đũa).`, { unit: ' chiếc' }); },
  () => { const k = ri(r, 3, 10); return numQ(r, `Có ${5 * k} quả cam chia đều vào 5 đĩa. Mỗi đĩa có bao nhiêu quả cam?`, k, [5 * k - 5, k + 1, 5 + k], `${5 * k} : 5 = ${k} (quả).`, { unit: ' quả' }); },
  () => { const k = ri(r, 3, 10); return numQ(r, `Có ${2 * k} học sinh xếp đều thành 2 hàng. Mỗi hàng có bao nhiêu học sinh?`, k, [2 * k - 2, k + 2, k - 1], `${2 * k} : 2 = ${k} (học sinh).`, { unit: ' bạn' }); },
])();
const carry1000 = (r) => {
  const a = ri(r, 150, 650), b = ri(r, 105, 990 - a);
  return r() < 0.6
    ? numQ(r, `${a} + ${b} = ?`, a + b, [a + b - 10, a + b + 100, a + b - 100], `Đặt tính rồi cộng từ hàng đơn vị, nhớ sang hàng trên: ${a} + ${b} = ${a + b}.`)
    : numQ(r, `${a + b} − ${a} = ?`, b, [b + 10, b - 100, b + 100], `Đặt tính rồi trừ từ hàng đơn vị, mượn khi cần: ${a + b} − ${a} = ${b}.`);
};
const geoMoney = (r) => pick(r, [
  () => { const a = ri(r, 3, 9), b = ri(r, 3, 9), c = ri(r, 3, 9); return numQ(r, `Đường gấp khúc gồm ba đoạn dài ${a} cm, ${b} cm và ${c} cm. Đường gấp khúc dài bao nhiêu?`, a + b + c, [a + b, a + b + c + 1, a * 3], `${a} + ${b} + ${c} = ${a + b + c} (cm).`, { unit: ' cm' }); },
  () => ({ q: 'Hình tứ giác có mấy cạnh?', a: '4 cạnh', w: ['3 cạnh', '5 cạnh', '6 cạnh'], ex: 'Tứ giác là hình có 4 cạnh, 4 đỉnh.' }),
  () => { const k = ri(r, 1, 4); return numQ(r, `Mẹ có 1 tờ 500 đồng và ${k} tờ 100 đồng. Mẹ có tất cả bao nhiêu tiền?`, 500 + 100 * k, [500 + k, 600, 500 + 100 * k + 100], `500 + ${k} × 100 = ${500 + 100 * k} (đồng).`, { unit: ' đồng' }); },
  () => { const p = pick(r, [200, 500]), k = ri(r, 2, 4); return numQ(r, `Một cái bút giá ${p} đồng. Mua ${k} cái bút hết bao nhiêu tiền?`, p * k, [p + k, p * k + p, p * k - p], `${p} × ${k} = ${p * k} (đồng).`, { unit: ' đồng' }); },
])();
const findX = (r) => pick(r, [
  () => { const t = pick(r, [2, 5]), k = ri(r, 2, 10); return numQ(r, `? × ${t} = ${t * k}. Số cần điền là số nào?`, k, [t * k - t, k + 1, t * k + t], `${t * k} : ${t} = ${k}.`); },
  () => { const a = ri(r, 100, 500), b = ri(r, 100, 450); return numQ(r, `x − ${b} = ${a}. Tìm x.`, a + b, [a - b > 0 ? a - b : a + b + 10, a + b - 10, a + b + 100], `Muốn tìm số bị trừ, lấy hiệu cộng số trừ: ${a} + ${b} = ${a + b}.`); },
  () => { const a = ri(r, 100, 500), b = ri(r, 100, 480); return numQ(r, `x + ${b} = ${a + b}. Tìm x.`, a, [a + 2 * b, a + 10, a - 100], `Muốn tìm số hạng, lấy tổng trừ số hạng kia: ${a + b} − ${b} = ${a}.`); },
])();
const tricky = (r) => pick(r, [
  () => numQ(r, 'Số lớn nhất có ba chữ số khác nhau là số nào?', 987, [999, 789, 998], 'Hàng trăm 9, hàng chục 8, hàng đơn vị 7: số 987.'),
  () => numQ(r, 'Số bé nhất có ba chữ số là số nào?', 100, [101, 102, 99], 'Số bé nhất có ba chữ số là 100.'),
  () => numQ(r, 'Hiệu của số lớn nhất có hai chữ số và số bé nhất có hai chữ số là bao nhiêu?', 89, [90, 88, 109], '99 − 10 = 89.'),
  () => { const d = ri(r, 2, 20); return numQ(r, `Thứ Hai tuần này là ngày ${d}. Thứ Hai tuần sau là ngày bao nhiêu?`, d + 7, [d + 1, d + 6, d + 8], `Một tuần có 7 ngày: ${d} + 7 = ${d + 7}.`); },
  () => { const k = ri(r, 3, 8); return numQ(r, `Có ${k} con gà và ${k} con chó. Tất cả có bao nhiêu cái chân?`, 6 * k, [4 * k, 2 * k, 5 * k], `Gà 2 chân, chó 4 chân: ${k} × 2 + ${k} × 4 = ${2 * k} + ${4 * k} = ${6 * k}.`, { unit: ' chân' }); },
  () => { const n = pick(r, NAMES), k = ri(r, 3, 8); return numQ(r, `${n} cưa một khúc gỗ thành ${k} đoạn. ${n} phải cưa mấy lần?`, k - 1, [k, k + 1, k - 2], `Cắt ${k} đoạn cần ${k} − 1 = ${k - 1} nhát cưa.`, { unit: ' lần' }); },
])();

export const LEVELS = [
  ['cong-tru', [carry20]],
  ['so', [neighbours]],
  ['nhan-chia', [mul25]],
  ['nhan-chia', [div25]],
  ['cong-tru', [carryAdd]],
  ['cong-tru', [borrowSub]],
  ['do-luong', [units]],
  ['so', [hundreds]],
  ['cong-tru', [add1000]],
  ['thoi-gian', [time]],
  ['loi-van', [mulStory]],
  ['cong-tru', [carry1000]],
  ['hinh-tien', [geoMoney]],
  ['tim-x', [findX]],
  ['thu-thach', [tricky]],
];
export { fmt };
