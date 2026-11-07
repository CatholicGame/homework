/**
 * Lớp 5 (Kết nối tri thức): số thập phân (đọc, so sánh, cộng trừ nhân chia, nhân chia với 10, 100), đổi đơn vị dạng thập phân,
 * hỗn số và phân số, tỉ số phần trăm, diện tích tam giác, hình thang, hình tròn, thể tích, vận tốc quãng đường thời gian,
 * số đo thời gian, toán chuyển động.
 */
import { ri, pick, shuffle, fmtD, numQ, frac } from './util.js';

const D = { f: fmtD, dec: true };
const dec = (r, lo, hi, dp = 1) => Math.round((lo + r() * (hi - lo)) * 10 ** dp) / 10 ** dp;

const readDec = (r) => pick(r, [
  () => { const a = ri(r, 1, 20), b = ri(r, 1, 9), c = ri(r, 1, 9); return numQ(r, `Số thập phân gồm ${a} đơn vị, ${b} phần mười và ${c} phần trăm là số nào?`, a + b / 10 + c / 100, [a + c / 10 + b / 100, a + b / 100 + c / 1000, a * 10 + b + c / 10], `${a} đơn vị, ${b} phần mười, ${c} phần trăm: ${fmtD(a + b / 10 + c / 100)}.`, { ...D, step: 0.01 }); },
  () => { const xs = shuffle(r, [dec(r, 1, 9, 2), dec(r, 1, 9, 1), dec(r, 1, 9, 3), dec(r, 1, 9, 2)]); if (new Set(xs).size < 4) return readDec(r); const m = Math.max(...xs); return { q: `Số nào lớn nhất: ${xs.map(x => fmtD(x)).join('; ')}?`, a: fmtD(m), w: xs.filter(x => x !== m).map(x => fmtD(x)), ex: `So sánh phần nguyên trước, rồi phần mười, phần trăm…: ${fmtD(m)} lớn nhất.` }; },
])();
const addDec = (r) => {
  const a = dec(r, 1, 50, 2), b = dec(r, 1, 30, 1);
  return r() < 0.5
    ? numQ(r, `${fmtD(a)} + ${fmtD(b)} = ?`, a + b, [a + b * 10, a + b / 10, a + b + 1], `Viết các chữ số cùng hàng thẳng cột, dấu phẩy thẳng dấu phẩy: ${fmtD(a + b)}.`, D)
    : numQ(r, `${fmtD(a + b)} − ${fmtD(b)} = ?`, a, [a + 1, a - b / 10 > 0 ? a + b - b / 10 : a + 0.1, a + 0.1], `Dấu phẩy thẳng cột rồi trừ như số tự nhiên: ${fmtD(a)}.`, D);
};
const by10 = (r) => {
  const a = dec(r, 1, 99, 2), p = pick(r, [10, 100, 1000]);
  return r() < 0.5
    ? numQ(r, `${fmtD(a)} × ${p} = ?`, a * p, [a * p / 10, a * p * 10, a + p], `Nhân với ${p}: dời dấu phẩy sang phải ${String(p).length - 1} chữ số: ${fmtD(a * p)}.`, D)
    : numQ(r, `${fmtD(a)} : ${p} = ?`, a / p, [a / p * 10, a / p / 10, a * p], `Chia cho ${p}: dời dấu phẩy sang trái ${String(p).length - 1} chữ số: ${fmtD(a / p, 5)}.`, { f: (v) => fmtD(v, 5), dec: true });
};
const units = (r) => pick(r, [
  () => { const m = ri(r, 1, 9), c = ri(r, 1, 99); return numQ(r, `${m} m ${c} cm = ? m`, m + c / 100, [m + c / 10, m * 100 + c, m + c / 1000], `${c} cm = ${fmtD(c / 100)} m: ${fmtD(m + c / 100)} m.`, { ...D, unit: ' m' }); },
  () => { const k = dec(r, 1, 9, 1); return numQ(r, `${fmtD(k)} kg = ? g`, k * 1000, [k * 100, k * 10, k * 10000], `1 kg = 1000 g: ${fmtD(k)} × 1000 = ${fmtD(k * 1000)} (g).`, { ...D, unit: ' g' }); },
  () => { const t = ri(r, 1, 9), k = ri(r, 1, 999); return numQ(r, `${t} tấn ${k} kg = ? tấn`, t + k / 1000, [t + k / 100, t + k / 10, t * 1000 + k], `${k} kg = ${fmtD(k / 1000)} tấn: ${fmtD(t + k / 1000)} tấn.`, { ...D, unit: ' tấn' }); },
  () => numQ(r, '1 ha bằng bao nhiêu mét vuông?', 10000, [1000, 100, 100000], '1 ha = 1 hm² = 10 000 m².', { unit: ' m²', f: fmtD }),
])();
const mixedNum = (r) => pick(r, [
  () => { const w = ri(r, 1, 5), b = ri(r, 2, 9), a = ri(r, 1, b - 1); const A = `${w * b + a}/${b}`; return { q: `Hỗn số ${w} ${a}/${b} viết thành phân số nào?`, a: A, w: [`${w * a + b}/${b}`, `${w + a}/${b}`, `${w * b + a}/${a}`].filter(x => x !== A), ex: `Lấy phần nguyên nhân mẫu số rồi cộng tử số: ${w} × ${b} + ${a} = ${w * b + a}; được ${A}.` }; },
  () => { const b = ri(r, 2, 9), a = ri(r, 1, b - 1), d = ri(r, 2, 9), c = ri(r, 1, d - 1); const A = frac(a * c, b * d); return { q: `${a}/${b} × ${c}/${d} = ?`, a: A, w: [frac(a * d, b * c), frac(a + c, b + d), frac(a * c, b + d)].filter(x => x !== A), ex: `Tử nhân tử, mẫu nhân mẫu: ${a * c}/${b * d}${A !== `${a * c}/${b * d}` ? ` = ${A}` : ''}.` }; },
  () => { const b = ri(r, 2, 9), a = ri(r, 1, b - 1), d = ri(r, 2, 9), c = ri(r, 1, d - 1); const A = frac(a * d, b * c); return { q: `${a}/${b} : ${c}/${d} = ?`, a: A, w: [frac(a * c, b * d), frac(b * c, a * d), frac(a + d, b + c)].filter(x => x !== A), ex: `Nhân với phân số đảo ngược: ${a}/${b} × ${d}/${c} = ${a * d}/${b * c}${A !== `${a * d}/${b * c}` ? ` = ${A}` : ''}.` }; },
])();
const mulDec = (r) => {
  const a = ri(r, 11, 99) / 10, b = ri(r, 11, 59) / 10;
  if (Number.isInteger(a) || Number.isInteger(b)) return mulDec(r);
  return numQ(r, `${fmtD(a)} × ${fmtD(b)} = ?`, a * b, [a * b * 10, a * b / 10, a * b + 1], `Nhân như số tự nhiên: ${Math.round(a * 10)} × ${Math.round(b * 10)} = ${Math.round(a * b * 100)}; hai thừa số có tất cả 2 chữ số ở phần thập phân, tách 2 chữ số từ phải sang: ${fmtD(a * b)}.`, D);
};
const divDec = (r) => {
  const b = ri(r, 2, 9), q = dec(r, 1.1, 20, 1), a = Math.round(b * q * 10) / 10;
  return numQ(r, `${fmtD(a)} : ${b} = ?`, q, [q * 10, q / 10, q + 1], `Chia phần nguyên trước, viết dấu phẩy vào thương rồi chia tiếp: ${fmtD(q)}.`, D);
};
const percent = (r) => pick(r, [
  () => { const p = pick(r, [10, 20, 25, 50, 75]), n = ri(r, 2, 20) * 4 * (p === 75 ? 1 : 1); return numQ(r, `${p}% của ${n} là bao nhiêu?`, n * p / 100, [n * p / 10, n - n * p / 100, p], `${n} : 100 × ${p} = ${fmtD(n * p / 100)}.`, D); },
  () => { const [a, b] = pick(r, [[1, 4], [3, 4], [1, 2], [2, 5], [3, 5], [1, 5], [7, 20], [9, 10]]); const p = a / b * 100; return numQ(r, `Tỉ số phần trăm của ${a} và ${b} là bao nhiêu?`, p, [b / a * 100 === Math.round(b / a * 100) ? b / a * 100 : p + 10, a * b, p / 10], `${a} : ${b} = ${fmtD(a / b)} = ${fmtD(p)}%.`, { ...D, unit: '%' }); },
])();
const triangle = (r) => {
  if (r() < 0.5) {
    const a = ri(r, 4, 20), h = ri(r, 2, 15) * 2;
    return numQ(r, `Tam giác có đáy ${a} cm, chiều cao ${h} cm. Diện tích tam giác là bao nhiêu?`, a * h / 2, [a * h, a + h, (a + h) * 2], `S = đáy × chiều cao : 2 = ${a} × ${h} : 2 = ${a * h / 2} (cm²).`, { ...D, unit: ' cm²' });
  }
  const a = ri(r, 6, 20), b = ri(r, 2, a - 2), h = ri(r, 2, 10) * 2;
  return numQ(r, `Hình thang có hai đáy ${a} cm và ${b} cm, chiều cao ${h} cm. Diện tích hình thang là bao nhiêu?`, (a + b) * h / 2, [(a + b) * h, a * b * h / 2, (a + b + h) * 2], `S = (đáy lớn + đáy bé) × chiều cao : 2 = (${a} + ${b}) × ${h} : 2 = ${(a + b) * h / 2} (cm²).`, { ...D, unit: ' cm²' });
};
const circle = (r) => {
  const rad = ri(r, 2, 10);
  return r() < 0.5
    ? numQ(r, `Hình tròn có bán kính ${rad} cm. Chu vi hình tròn là bao nhiêu?`, rad * 2 * 3.14, [rad * 3.14, rad * rad * 3.14, rad * 2 * 3.14 + 1], `C = r × 2 × 3,14 = ${rad} × 2 × 3,14 = ${fmtD(rad * 2 * 3.14)} (cm).`, { ...D, unit: ' cm' })
    : numQ(r, `Hình tròn có bán kính ${rad} cm. Diện tích hình tròn là bao nhiêu?`, rad * rad * 3.14, [rad * 2 * 3.14, rad * 3.14, rad * rad * 3.14 * 2], `S = r × r × 3,14 = ${rad} × ${rad} × 3,14 = ${fmtD(rad * rad * 3.14)} (cm²).`, { ...D, unit: ' cm²' });
};
const volume = (r) => pick(r, [
  () => { const a = ri(r, 3, 12), b = ri(r, 2, 10), c = ri(r, 2, 8); return numQ(r, `Hình hộp chữ nhật dài ${a} cm, rộng ${b} cm, cao ${c} cm. Thể tích là bao nhiêu?`, a * b * c, [(a + b) * 2 * c, a * b, a + b + c], `V = dài × rộng × cao = ${a} × ${b} × ${c} = ${a * b * c} (cm³).`, { unit: ' cm³', f: fmtD }); },
  () => { const a = ri(r, 2, 10); return numQ(r, `Hình lập phương có cạnh ${a} cm. Thể tích là bao nhiêu?`, a ** 3, [a * a * 6, a * a, a * 3], `V = cạnh × cạnh × cạnh = ${a} × ${a} × ${a} = ${a ** 3} (cm³).`, { unit: ' cm³', f: fmtD }); },
  () => numQ(r, '1 dm³ bằng bao nhiêu xăng-ti-mét khối?', 1000, [100, 10, 10000], '1 dm³ = 1000 cm³.', { unit: ' cm³', f: fmtD }),
  () => numQ(r, '1 m³ bằng bao nhiêu đề-xi-mét khối?', 1000, [100, 10, 1000000], '1 m³ = 1000 dm³.', { unit: ' dm³', f: fmtD }),
])();
const speed = (r) => pick(r, [
  () => { const v = ri(r, 30, 60), t = ri(r, 2, 5); return numQ(r, `Ô tô đi ${v * t} km trong ${t} giờ. Vận tốc của ô tô là bao nhiêu?`, v, [v * t * t, v + t, v * 2], `v = s : t = ${v * t} : ${t} = ${v} (km/giờ).`, { unit: ' km/giờ', f: fmtD }); },
  () => { const v = ri(r, 4, 15), t = ri(r, 2, 4); return numQ(r, `Một người đi xe đạp với vận tốc ${v} km/giờ trong ${t} giờ. Quãng đường đi được là bao nhiêu?`, v * t, [v + t, v * t + v, Math.round(v / t)], `s = v × t = ${v} × ${t} = ${v * t} (km).`, { unit: ' km', f: fmtD }); },
  () => { const v = ri(r, 30, 50), t = ri(r, 2, 4); return numQ(r, `Xe máy đi quãng đường ${v * t} km với vận tốc ${v} km/giờ. Hết bao nhiêu giờ?`, t, [t + 1, v * t * v, t * 2], `t = s : v = ${v * t} : ${v} = ${t} (giờ).`, { unit: ' giờ', f: fmtD }); },
])();
const timeCalc = (r) => pick(r, [
  () => { const h1 = ri(r, 1, 3), m1 = ri(r, 20, 55), h2 = ri(r, 1, 3), m2 = ri(r, 10, 50); const tot = (h1 + h2) * 60 + m1 + m2; const A = `${Math.floor(tot / 60)} giờ ${tot % 60} phút`; return { q: `${h1} giờ ${m1} phút + ${h2} giờ ${m2} phút = ?`, a: A, w: [`${h1 + h2} giờ ${m1 + m2} phút`, `${Math.floor(tot / 60) + 1} giờ ${tot % 60} phút`, `${Math.floor(tot / 60)} giờ ${(tot % 60 + 10) % 60} phút`].filter(x => x !== A), ex: `${m1} + ${m2} = ${m1 + m2} phút${m1 + m2 >= 60 ? ` = 1 giờ ${m1 + m2 - 60} phút` : ''}: kết quả ${A}.` }; },
  () => { const h = pick(r, [1.5, 2.5, 0.75, 1.25, 0.5]); return numQ(r, `${fmtD(h)} giờ bằng bao nhiêu phút?`, h * 60, [h * 100, h * 60 + 30, h * 10], `${fmtD(h)} × 60 = ${h * 60} (phút).`, { unit: ' phút', f: fmtD }); },
])();
const percentStory = (r) => pick(r, [
  () => { const n = pick(r, [20, 25, 30, 40, 50]), p = pick(r, [20, 40, 60, 30, 50]); return numQ(r, `Lớp có ${n} học sinh, trong đó ${p}% là học sinh nữ. Lớp có bao nhiêu học sinh nữ?`, n * p / 100, [n - n * p / 100, p, n * p / 10], `${n} × ${p} : 100 = ${fmtD(n * p / 100)} (bạn).`, { ...D, unit: ' bạn' }); },
  () => { const price = ri(r, 2, 9) * 50000, p = pick(r, [10, 20, 30]); return numQ(r, `Chiếc cặp giá ${fmtD(price)} đồng, nay giảm ${p}%. Giá mới là bao nhiêu?`, price * (100 - p) / 100, [price * p / 100, price - p * 1000, price * (100 + p) / 100], `Số tiền giảm: ${fmtD(price)} × ${p} : 100 = ${fmtD(price * p / 100)}; giá mới: ${fmtD(price)} − ${fmtD(price * p / 100)} = ${fmtD(price * (100 - p) / 100)} (đồng).`, { unit: ' đồng', f: fmtD }); },
])();
const motion = (r) => pick(r, [
  () => { const v1 = ri(r, 3, 6) * 10, v2 = ri(r, 3, 6) * 10, t = ri(r, 1, 3); const s = (v1 + v2) * t; return numQ(r, `Hai xe ở hai đầu quãng đường dài ${s} km, đi ngược chiều nhau, vận tốc ${v1} km/giờ và ${v2} km/giờ. Sau mấy giờ hai xe gặp nhau?`, t, [t + 1, s / v1 === Math.round(s / v1) ? s / v1 : t * 2, t * 2 + 1], `Mỗi giờ hai xe gần nhau ${v1} + ${v2} = ${v1 + v2} km; ${s} : ${v1 + v2} = ${t} (giờ).`, { unit: ' giờ', f: fmtD }); },
  () => { const avg = ri(r, 20, 60), a = avg + ri(r, 1, 10), b = avg * 3 - a - (avg - 3); return numQ(r, `Trung bình cộng của ba số là ${avg}. Hai số đầu là ${a} và ${avg - 3}. Số thứ ba là bao nhiêu?`, b, [avg * 3, b + 3, avg], `Tổng ba số: ${avg} × 3 = ${avg * 3}; số thứ ba: ${avg * 3} − ${a} − ${avg - 3} = ${b}.`, { f: fmtD }); },
  () => { const k = ri(r, 3, 8), m = ri(r, 2, 4), each = ri(r, 2, 6) * 10; return numQ(r, `${k} người làm xong một công việc trong ${m * each / 10} ngày. Muốn làm xong trong ${(m * each / 10) / m} ngày thì cần bao nhiêu người (sức làm như nhau)?`, k * m, [k + m, k * m + k, Math.round(k / m) || k + 1], `Thời gian giảm ${m} lần thì số người gấp ${m} lần: ${k} × ${m} = ${k * m} (người).`, { unit: ' người', f: fmtD }); },
])();

export const LEVELS = [
  ['so-thap-phan', [readDec]],
  ['so-thap-phan', [addDec]],
  ['so-thap-phan', [by10]],
  ['do-luong', [units]],
  ['phan-so', [mixedNum]],
  ['so-thap-phan', [mulDec]],
  ['so-thap-phan', [divDec]],
  ['phan-tram', [percent]],
  ['hinh', [triangle]],
  ['hinh', [circle]],
  ['hinh', [volume]],
  ['chuyen-dong', [speed]],
  ['thoi-gian', [timeCalc]],
  ['phan-tram', [percentStory]],
  ['thu-thach', [motion]],
];
