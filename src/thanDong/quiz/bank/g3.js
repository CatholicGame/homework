/**
 * Lớp 3 (Kết nối tri thức): bảng nhân chia 2–9, gấp / giảm một số lần, một phần mấy, nhân chia số có nhiều chữ số với số có một chữ số,
 * chia có dư, biểu thức, mm / g / ml, chu vi diện tích hình chữ nhật hình vuông, số đến 100 000, làm tròn, số La Mã, giờ phút,
 * hình tròn, tìm thành phần, lời văn hai bước, tiền.
 */
import { ri, pick, shuffle, fmt, numQ } from './util.js';

const tables = (r) => {
  const a = ri(r, 6, 9), b = ri(r, 3, 9);
  return numQ(r, `${a} × ${b} = ?`, a * b, [a * b + a, a * b - a, a * b + b], `${a} × ${b} = ${a * b}.`);
};
const divTables = (r) => {
  const a = ri(r, 3, 9), b = ri(r, 3, 9);
  return numQ(r, `${a * b} : ${a} = ?`, b, [b + 1, b - 1, a], `Vì ${a} × ${b} = ${a * b} nên ${a * b} : ${a} = ${b}.`);
};
const times = (r) => {
  const a = ri(r, 3, 12), k = ri(r, 2, 8);
  return r() < 0.5
    ? numQ(r, `Gấp ${a} lên ${k} lần thì được bao nhiêu?`, a * k, [a + k, a * k + a, a * k - k], `Gấp lên ${k} lần là nhân với ${k}: ${a} × ${k} = ${a * k}.`)
    : numQ(r, `Giảm ${a * k} đi ${k} lần thì được bao nhiêu?`, a, [a * k - k, a + 1, a * k + k], `Giảm đi ${k} lần là chia cho ${k}: ${a * k} : ${k} = ${a}.`);
};
const part = (r) => {
  const k = ri(r, 2, 9), v = ri(r, 2, 9), u = pick(r, [['kg', 'ki-lô-gam'], ['m', 'mét'], ['l', 'lít'], ['quả', 'quả']]);
  return numQ(r, `1/${k} của ${k * v} ${u[0]} là bao nhiêu?`, v, [k * v - k, v + 1, k * v * k], `Lấy ${k * v} : ${k} = ${v} (${u[0]}).`, { unit: ` ${u[0]}` });
};
const mul2by1 = (r) => {
  const a = ri(r, 12, 49), b = ri(r, 3, 6);
  if (a % 10 === 0 || (a % 10) * b < 10) return mul2by1(r);   // có nhớ: lỗi quên nhớ mới là nhiễu
  const noCarry = Math.floor(a / 10) * b * 10 + ((a % 10) * b) % 10;
  return numQ(r, `${a} × ${b} = ?`, a * b, [noCarry, a * b + 10, a * b - b], `${a % 10} × ${b} = ${(a % 10) * b}, viết ${(a % 10) * b % 10} nhớ ${Math.floor((a % 10) * b / 10)}; ${Math.floor(a / 10)} × ${b} thêm nhớ được ${Math.floor(a * b / 10)}. Vậy ${a} × ${b} = ${a * b}.`);
};
const remainder = (r) => {
  const d = ri(r, 3, 9), q = ri(r, 3, 9), m = ri(r, 1, d - 1), n = d * q + m;
  const A = `${q} dư ${m}`;
  return { q: `${n} : ${d} được bao nhiêu?`, a: A, w: [`${q - 1} dư ${m + d}`, `${q} dư ${m === 1 ? 2 : m - 1}`, `${q + 1} dư ${m}`].filter(x => x !== A), ex: `${d} × ${q} = ${d * q}, ${n} − ${d * q} = ${m}. Số dư ${m} bé hơn số chia ${d}: ${n} : ${d} = ${q} dư ${m}.` };
};
const expr = (r) => pick(r, [
  () => { const a = ri(r, 10, 50), b = ri(r, 2, 9), c = ri(r, 2, 9); return numQ(r, `${a} + ${b} × ${c} = ?`, a + b * c, [(a + b) * c, a + b + c, a * b + c], `Nhân trước, cộng sau: ${b} × ${c} = ${b * c}; ${a} + ${b * c} = ${a + b * c}.`); },
  () => { const a = ri(r, 2, 9), b = ri(r, 2, 9), c = ri(r, 2, 6); return numQ(r, `(${a} + ${b}) × ${c} = ?`, (a + b) * c, [a + b * c, a * c + b, (a + b) * c + c], `Trong ngoặc trước: ${a} + ${b} = ${a + b}; ${a + b} × ${c} = ${(a + b) * c}.`); },
  () => { const d = ri(r, 3, 9), q = ri(r, 3, 9), c = ri(r, 2, 20); return numQ(r, `${d * q} : ${d} + ${c} = ?`, q + c, [Math.floor(d * q / (d + c)) || q + c + 1, q + c + 1, q * c], `Chia trước, cộng sau: ${d * q} : ${d} = ${q}; ${q} + ${c} = ${q + c}.`); },
])();
const units = (r) => pick(r, [
  () => numQ(r, '1 cm bằng bao nhiêu mi-li-mét?', 10, [100, 1000, 1], '1 cm = 10 mm.', { unit: ' mm' }),
  () => numQ(r, '1 kg bằng bao nhiêu gam?', 1000, [100, 10, 10000], '1 kg = 1000 g.', { unit: ' g' }),
  () => numQ(r, '1 l bằng bao nhiêu mi-li-lít?', 1000, [100, 10, 500], '1 l = 1000 ml.', { unit: ' ml' }),
  () => { const m = ri(r, 2, 8), c = ri(r, 1, 9); return numQ(r, `${m} m ${c} cm bằng bao nhiêu xăng-ti-mét?`, m * 100 + c, [m * 10 + c, m * 100 + c * 10, m + c], `${m} m = ${m * 100} cm; ${m * 100} + ${c} = ${m * 100 + c} (cm).`, { unit: ' cm' }); },
  () => { const k = ri(r, 2, 5), g = pick(r, [200, 250, 500]); return numQ(r, `${k} gói kẹo, mỗi gói nặng ${g} g. Cả ${k} gói nặng bao nhiêu gam?`, k * g, [k + g, k * g + g, k * g - g], `${g} × ${k} = ${k * g} (g).`, { unit: ' g' }); },
])();
const perimeter = (r) => {
  if (r() < 0.6) {
    const a = ri(r, 6, 15), b = ri(r, 2, a - 1);
    return numQ(r, `Hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm. Chu vi hình chữ nhật là bao nhiêu?`, (a + b) * 2, [a + b, a * b, a * 2 + b], `Chu vi = (dài + rộng) × 2 = (${a} + ${b}) × 2 = ${(a + b) * 2} (cm).`, { unit: ' cm' });
  }
  const a = ri(r, 3, 12);
  return numQ(r, `Hình vuông có cạnh ${a} cm. Chu vi hình vuông là bao nhiêu?`, a * 4, [a * a, a * 2, a + 4], `Chu vi = cạnh × 4 = ${a} × 4 = ${a * 4} (cm).`, { unit: ' cm' });
};
const area = (r) => {
  if (r() < 0.6) {
    const a = ri(r, 4, 12), b = ri(r, 2, a - 1);
    return numQ(r, `Hình chữ nhật có chiều dài ${a} cm, chiều rộng ${b} cm. Diện tích hình chữ nhật là bao nhiêu?`, a * b, [(a + b) * 2, a + b, a * b + a], `Diện tích = dài × rộng = ${a} × ${b} = ${a * b} (cm²).`, { unit: ' cm²' });
  }
  const a = ri(r, 3, 9);
  return numQ(r, `Hình vuông có cạnh ${a} cm. Diện tích hình vuông là bao nhiêu?`, a * a, [a * 4, a * 2, a * a + a], `Diện tích = cạnh × cạnh = ${a} × ${a} = ${a * a} (cm²).`, { unit: ' cm²' });
};
const big = (r) => {
  const n = ri(r, 10000, 99999);
  return pick(r, [
    () => { const s = String(n), d = +s[1]; return numQ(r, `Chữ số hàng nghìn của số ${fmt(n)} là chữ số nào?`, d, [+s[0], +s[2], +s[3], +s[4]], `${fmt(n)}: chục nghìn ${s[0]}, nghìn ${s[1]}, trăm ${s[2]}, chục ${s[3]}, đơn vị ${s[4]}.`, { step: 1 }); },
    () => { const v = Math.round(n / 1000) * 1000; return numQ(r, `Làm tròn số ${fmt(n)} đến hàng nghìn thì được số nào?`, v, [Math.floor(n / 1000) * 1000 === v ? v + 1000 : Math.floor(n / 1000) * 1000, Math.round(n / 100) * 100, Math.round(n / 10000) * 10000], `Xét chữ số hàng trăm của ${fmt(n)}: ${String(n)[2]} ${+String(n)[2] >= 5 ? 'từ 5 trở lên thì làm tròn lên' : 'bé hơn 5 thì làm tròn xuống'}: ${fmt(v)}.`); },
    () => { const xs = shuffle(r, [n, n + 1000, n - 90, +String(n).split('').reverse().join('') % 100000 || n + 7]); const m = Math.max(...xs); return { q: `Số nào lớn nhất: ${xs.map(fmt).join('; ')}?`, a: fmt(m), w: xs.filter(x => x !== m).map(fmt).concat([fmt(m + 1)]), ex: `So sánh từ hàng chục nghìn: ${fmt(m)} lớn nhất.` }; },
  ])();
};
const bigCalc = (r) => {
  if (r() < 0.5) {
    const a = ri(r, 1012, 2999), b = ri(r, 2, 3);
    return numQ(r, `${fmt(a)} × ${b} = ?`, a * b, [a * b + 10, a * b - 100, a * b + 1000], `Nhân từ hàng đơn vị, nhớ sang hàng trên: ${fmt(a)} × ${b} = ${fmt(a * b)}.`);
  }
  const b = ri(r, 2, 9), q = ri(r, 1002, Math.floor(9999 / b)), a = b * q;
  return numQ(r, `${fmt(a)} : ${b} = ?`, q, [q + 10, q - 100, q * 10], `Chia lần lượt từ hàng nghìn: ${fmt(a)} : ${b} = ${fmt(q)}.`);
};
const ROMAN = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
const roman = (n) => { let s = ''; for (const [v, c] of ROMAN) while (n >= v) { s += c; n -= v; } return s; };
const mixed = (r) => pick(r, [
  () => { const n = ri(r, 4, 20); return numQ(r, `Số La Mã ${roman(n)} là số nào?`, n, [n + 2, n - 2, n === 9 || n === 19 || n === 4 || n === 14 ? n + 2 : n + 1], `${roman(n)} = ${n}.`); },
  () => { const h = ri(r, 7, 9), m = pick(r, [40, 45, 50]), add = ri(r, 25, 40); const t = m + add; return numQ(r, `Từ ${h} giờ ${m} phút đến ${h + 1} giờ ${t - 60} phút là bao nhiêu phút?`, add, [t - 60, add + 10, 60 - m], `Từ ${h} giờ ${m} phút đến ${h + 1} giờ là ${60 - m} phút, thêm ${t - 60} phút: ${60 - m} + ${t - 60} = ${add} (phút).`, { unit: ' phút' }); },
  () => { const rr = ri(r, 2, 9); return r() < 0.5 ? numQ(r, `Hình tròn có bán kính ${rr} cm. Đường kính hình tròn dài bao nhiêu?`, rr * 2, [rr, rr * 4, rr + 2], `Đường kính gấp đôi bán kính: ${rr} × 2 = ${rr * 2} (cm).`, { unit: ' cm' }) : numQ(r, `Hình tròn có đường kính ${rr * 2} cm. Bán kính dài bao nhiêu?`, rr, [rr * 4, rr * 2, rr + 1], `Bán kính bằng một nửa đường kính: ${rr * 2} : 2 = ${rr} (cm).`, { unit: ' cm' }); },
  () => ({ q: 'Góc vuông là góc như thế nào?', a: 'Góc như góc của ê ke', w: ['Góc nhọn hơn góc ê ke', 'Góc rộng hơn góc ê ke', 'Góc của hình tròn'], ex: 'Dùng ê ke để kiểm tra góc vuông.' }),
])();
const findX = (r) => pick(r, [
  () => { const a = ri(r, 3, 9), x = ri(r, 12, 120); return numQ(r, `x × ${a} = ${a * x}. Tìm x.`, x, [a * x - a, x + 10, a * x * a], `Muốn tìm thừa số, lấy tích chia cho thừa số kia: ${a * x} : ${a} = ${x}.`); },
  () => { const a = ri(r, 3, 9), x = ri(r, 12, 150); return numQ(r, `x : ${a} = ${x}. Tìm x.`, a * x, [x - a > 0 ? x - a : x + a, a + x, a * x + a], `Muốn tìm số bị chia, lấy thương nhân số chia: ${x} × ${a} = ${a * x}.`); },
  () => { const a = ri(r, 3, 9), q = ri(r, 4, 30); return numQ(r, `${a * q} : x = ${a}. Tìm x.`, q, [a * q * a, q + 1, a * q - a], `Muốn tìm số chia, lấy số bị chia chia cho thương: ${a * q} : ${a} = ${q}.`); },
])();
const twoStep = (r) => pick(r, [
  () => { const t = ri(r, 3, 6), each = pick(r, [12, 15, 20, 24, 25]), sold = ri(r, 10, t * each - 10); return numQ(r, `Cửa hàng có ${t} thùng nước, mỗi thùng ${each} chai. Cửa hàng đã bán ${sold} chai. Cửa hàng còn lại bao nhiêu chai?`, t * each - sold, [t * each, t * each - sold + 10, t + each - sold > 0 ? t + each - sold : t * each + sold], `Có ${each} × ${t} = ${t * each} chai; còn ${t * each} − ${sold} = ${t * each - sold} (chai).`, { unit: ' chai' }); },
  () => { const k = ri(r, 2, 5), p = pick(r, [6000, 8000, 9000, 12000]), give = k * p < 50000 ? 50000 : 100000; return numQ(r, `Mua ${k} quyển vở, mỗi quyển giá ${fmt(p)} đồng. Đưa cô bán hàng ${fmt(give)} đồng thì được trả lại bao nhiêu tiền?`, give - k * p, [k * p, give - p, give - k * p + 1000], `Mua hết ${fmt(p)} × ${k} = ${fmt(k * p)} đồng; trả lại ${fmt(give)} − ${fmt(k * p)} = ${fmt(give - k * p)} (đồng).`, { unit: ' đồng' }); },
  () => { const a = ri(r, 20, 60), k = ri(r, 2, 4); return numQ(r, `Ngăn trên có ${a} quyển sách, ngăn dưới gấp ${k} lần ngăn trên. Cả hai ngăn có bao nhiêu quyển sách?`, a + a * k, [a * k, a + k, a * k + k], `Ngăn dưới: ${a} × ${k} = ${a * k} quyển; cả hai ngăn: ${a} + ${a * k} = ${a + a * k} (quyển).`, { unit: ' quyển' }); },
])();

export const LEVELS = [
  ['nhan-chia', [tables]],
  ['nhan-chia', [divTables]],
  ['nhan-chia', [times]],
  ['nhan-chia', [part]],
  ['nhan-chia', [mul2by1]],
  ['nhan-chia', [remainder]],
  ['bieu-thuc', [expr]],
  ['do-luong', [units]],
  ['hinh', [perimeter]],
  ['hinh', [area]],
  ['so', [big]],
  ['nhan-chia', [bigCalc]],
  ['tong-hop', [mixed]],
  ['tim-x', [findX]],
  ['loi-van', [twoStep]],
];
