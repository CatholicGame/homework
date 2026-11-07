/**
 * Lớp 4 (Kết nối tri thức): số đến lớp triệu, hàng và lớp, làm tròn, cộng trừ số lớn, yến tạ tấn, giây, thế kỉ, nhân chia với
 * 10, 100, 1000, biểu thức chứa chữ, trung bình cộng, nhân chia với số có hai chữ số, góc và độ, tổng hiệu, dấu hiệu chia hết,
 * phân số, tổng tỉ / hiệu tỉ, m² dm².
 */
import { ri, pick, shuffle, fmt, numQ, frac, gcd } from './util.js';

const HANG = ['Hàng đơn vị', 'Hàng chục', 'Hàng trăm', 'Hàng nghìn', 'Hàng chục nghìn', 'Hàng trăm nghìn', 'Hàng triệu', 'Hàng chục triệu'];
const place = (r) => {
  let s; do { s = String(ri(r, 1000000, 99999999)); } while (new Set(s).size < s.length - 1);
  const pos = ri(r, 2, s.length - 1), dig = s[s.length - 1 - pos];
  if (s.split('').filter(c => c === dig).length > 1) return numQ(r, `Chữ số ${HANG[pos].toLowerCase()} của số ${fmt(+s)} là chữ số nào?`, +dig, s.split('').map(Number), `${fmt(+s)}: ${HANG[pos].toLowerCase()} là chữ số ${dig}.`, { step: 1 });
  return { q: `Trong số ${fmt(+s)}, chữ số ${dig} thuộc hàng nào?`, a: HANG[pos], w: shuffle(r, [HANG[pos - 1], HANG[pos + 1] || HANG[pos - 2], HANG[pos - 2] || HANG[pos + 2]].filter(Boolean)), ex: `Đếm từ phải sang: chữ số ${dig} đứng ở ${HANG[pos].toLowerCase()}.` };
};
const roundBig = (r) => {
  const n = ri(r, 1000000, 9999999);
  if (r() < 0.5) {
    const v = Math.round(n / 100000) * 100000;
    return numQ(r, `Làm tròn số ${fmt(n)} đến hàng trăm nghìn thì được số nào?`, v, [Math.floor(n / 100000) * 100000 === v ? v + 100000 : Math.floor(n / 100000) * 100000, Math.round(n / 10000) * 10000, Math.round(n / 1000000) * 1000000], `Xét chữ số hàng chục nghìn: ${String(n)[2]}, ${+String(n)[2] >= 5 ? 'làm tròn lên' : 'làm tròn xuống'}: ${fmt(v)}.`);
  }
  const xs = shuffle(r, [n, n + 90000, n - 9000, +(String(n).slice(0, 2) + String(n).slice(3) + String(n)[2])]); const m = Math.max(...xs);
  return { q: `Số nào lớn nhất: ${xs.map(fmt).join('; ')}?`, a: fmt(m), w: xs.filter(x => x !== m).map(fmt).concat([fmt(m - 1)]), ex: `So sánh lần lượt từ hàng cao nhất: ${fmt(m)} lớn nhất.` };
};
const addBig = (r) => {
  const a = ri(r, 120000, 600000), b = ri(r, 100000, 380000);
  return r() < 0.5
    ? numQ(r, `${fmt(a)} + ${fmt(b)} = ?`, a + b, [a + b - 10000, a + b + 1000, a + b - 100], `Đặt tính, cộng từ phải sang trái, có nhớ: ${fmt(a + b)}.`)
    : numQ(r, `${fmt(a + b)} − ${fmt(b)} = ?`, a, [a + 10000, a - 1000, a + 100], `Đặt tính, trừ từ phải sang trái, có mượn: ${fmt(a)}.`);
};
const units = (r) => pick(r, [
  () => numQ(r, '1 tấn bằng bao nhiêu ki-lô-gam?', 1000, [100, 10, 10000], '1 tấn = 10 tạ = 100 yến = 1000 kg.', { unit: ' kg' }),
  () => numQ(r, '1 tạ bằng bao nhiêu ki-lô-gam?', 100, [10, 1000, 50], '1 tạ = 100 kg.', { unit: ' kg' }),
  () => numQ(r, '1 yến bằng bao nhiêu ki-lô-gam?', 10, [100, 1000, 5], '1 yến = 10 kg.', { unit: ' kg' }),
  () => numQ(r, '1 phút bằng bao nhiêu giây?', 60, [100, 30, 120], '1 phút = 60 giây.', { unit: ' giây' }),
  () => numQ(r, '1 thế kỉ bằng bao nhiêu năm?', 100, [10, 1000, 50], '1 thế kỉ = 100 năm.', { unit: ' năm' }),
  () => { const y = pick(r, [[1945, 'XX'], [2025, 'XXI'], [1010, 'XI'], [1890, 'XIX'], [938, 'X'], [1288, 'XIII']]); const all = ['X', 'XI', 'XIII', 'XIX', 'XX', 'XXI', 'XII', 'XVIII']; return { q: `Năm ${y[0]} thuộc thế kỉ nào?`, a: `Thế kỉ ${y[1]}`, w: shuffle(r, all.filter(c => c !== y[1])).slice(0, 3).map(c => `Thế kỉ ${c}`), ex: `Thế kỉ thứ n gồm các năm từ (n − 1) × 100 + 1 đến n × 100: năm ${y[0]} thuộc thế kỉ ${y[1]}.` }; },
  () => { const t = ri(r, 2, 9), k = ri(r, 1, 9) * 10; return numQ(r, `${t} tạ ${k} kg bằng bao nhiêu ki-lô-gam?`, t * 100 + k, [t * 10 + k, t * 1000 + k, t + k], `${t} tạ = ${t * 100} kg; ${t * 100} + ${k} = ${t * 100 + k} (kg).`, { unit: ' kg' }); },
])();
const by10 = (r) => {
  const p = pick(r, [10, 100, 1000]), a = ri(r, 12, 999);
  return r() < 0.5
    ? numQ(r, `${a} × ${p} = ?`, a * p, [a * p / 10, a * p * 10, a + p], `Nhân với ${p}: viết thêm ${String(p).length - 1} chữ số 0 vào bên phải: ${fmt(a * p)}.`)
    : numQ(r, `${fmt(a * p)} : ${p} = ?`, a, [a * 10, Math.round(a / 10) || a + 1, a * p / 10], `Chia cho ${p}: bỏ bớt ${String(p).length - 1} chữ số 0 ở bên phải: ${a}.`);
};
const letters = (r) => pick(r, [
  () => { const a = ri(r, 3, 15), k = ri(r, 3, 9), c = ri(r, 5, 50); return numQ(r, `Tính giá trị của biểu thức a × ${k} + ${c} với a = ${a}.`, a * k + c, [a * (k + c), a * k, a + k + c], `Thay a = ${a}: ${a} × ${k} + ${c} = ${a * k} + ${c} = ${a * k + c}.`); },
  () => { const a = ri(r, 20, 90), b = ri(r, 2, 19), c = ri(r, 2, 6); return numQ(r, `Tính giá trị của biểu thức (a − b) × ${c} với a = ${a}, b = ${b}.`, (a - b) * c, [a - b * c, (a - b) * c + c, a * c - b], `Thay a = ${a}, b = ${b}: (${a} − ${b}) × ${c} = ${a - b} × ${c} = ${(a - b) * c}.`); },
  () => { const a = ri(r, 3, 25); return numQ(r, `Hình vuông có cạnh a. Chu vi P = a × 4. Tính P khi a = ${a} cm.`, a * 4, [a * a, a + 4, a * 2], `P = ${a} × 4 = ${a * 4} (cm).`, { unit: ' cm' }); },
])();
const average = (r) => {
  const n = pick(r, [2, 3, 4]), avg = ri(r, 12, 60);
  const xs = Array.from({ length: n - 1 }, () => avg + ri(r, -10, 10));
  xs.push(avg * n - xs.reduce((a, b) => a + b, 0));
  if (xs.some(x => x <= 0)) return average(r);
  return numQ(r, `Trung bình cộng của các số ${xs.join(', ')} là bao nhiêu?`, avg, [avg * n, avg + 1, Math.round(avg * n / (n + 1))], `Tổng ${xs.join(' + ')} = ${avg * n}; ${avg * n} : ${n} = ${avg}.`);
};
const mul2 = (r) => {
  const a = ri(r, 12, 89), b = ri(r, 12, 49);
  const slip = a * (b % 10) + a * Math.floor(b / 10);   // quên viết lùi tích riêng thứ hai
  return numQ(r, `${a} × ${b} = ?`, a * b, [slip, a * b + 10, a * b - a], `${a} × ${b % 10} = ${a * (b % 10)}; ${a} × ${Math.floor(b / 10)} = ${a * Math.floor(b / 10)}, viết lùi sang trái một hàng; cộng lại: ${a * b}.`);
};
const div2 = (r) => {
  const b = ri(r, 12, 45), q = ri(r, 12, 99), a = b * q;
  return numQ(r, `${fmt(a)} : ${b} = ?`, q, [q + 1, q - 1, q * 10], `Ước lượng thương rồi chia: ${b} × ${q} = ${fmt(a)}, nên ${fmt(a)} : ${b} = ${q}.`);
};
const angles = (r) => pick(r, [
  () => numQ(r, 'Góc vuông có số đo bao nhiêu độ?', 90, [180, 60, 45], 'Góc vuông bằng 90°.', { unit: '°' }),
  () => numQ(r, 'Góc bẹt có số đo bao nhiêu độ?', 180, [90, 360, 100], 'Góc bẹt bằng 180°, bằng hai góc vuông.', { unit: '°' }),
  () => { const d = pick(r, [35, 50, 72, 85]); return { q: `Góc ${d}° là góc gì?`, a: 'Góc nhọn', w: ['Góc tù', 'Góc vuông', 'Góc bẹt'], ex: `Góc bé hơn 90° là góc nhọn.` }; },
  () => { const d = pick(r, [100, 120, 135, 150]); return { q: `Góc ${d}° là góc gì?`, a: 'Góc tù', w: ['Góc nhọn', 'Góc vuông', 'Góc bẹt'], ex: `Góc lớn hơn 90° và bé hơn 180° là góc tù.` }; },
  () => ({ q: 'Hai đường thẳng vuông góc tạo thành mấy góc vuông?', a: '4 góc vuông', w: ['2 góc vuông', '1 góc vuông', '3 góc vuông'], ex: 'Hai đường thẳng vuông góc cắt nhau tạo thành 4 góc vuông chung đỉnh.' }),
])();
const sumDiff = (r) => {
  const big = ri(r, 30, 300), small = ri(r, 10, big - 5), s = big + small, d = big - small;
  return r() < 0.5
    ? numQ(r, `Tổng của hai số là ${s}, hiệu của hai số là ${d}. Số lớn là bao nhiêu?`, big, [small, s - d, (s + d)], `Số lớn = (tổng + hiệu) : 2 = (${s} + ${d}) : 2 = ${big}.`)
    : numQ(r, `Tổng của hai số là ${s}, hiệu của hai số là ${d}. Số bé là bao nhiêu?`, small, [big, s - d, Math.round(s / 2)], `Số bé = (tổng − hiệu) : 2 = (${s} − ${d}) : 2 = ${small}.`);
};
const divisible = (r) => {
  const k = pick(r, [2, 3, 5, 9, 10]);
  const ok = (n) => (k === 10 ? n % 10 === 0 : n % k === 0);
  let ans; do { ans = ri(r, 100, 9999); } while (!ok(ans));
  const ws = []; while (ws.length < 3) { const v = ri(r, 100, 9999); if (!ok(v) && !ws.includes(v)) ws.push(v); }
  const rule = { 2: 'chữ số tận cùng là 0, 2, 4, 6, 8', 3: 'tổng các chữ số chia hết cho 3', 5: 'chữ số tận cùng là 0 hoặc 5', 9: 'tổng các chữ số chia hết cho 9', 10: 'chữ số tận cùng là 0 (chia hết cho cả 2 và 5)' }[k];
  return { q: `Số nào chia hết cho ${k === 10 ? 'cả 2 và 5' : k}?`, a: fmt(ans), w: ws.map(fmt), ex: `Số chia hết cho ${k === 10 ? 'cả 2 và 5' : k} có ${rule}: ${fmt(ans)}.` };
};
const fractions = (r) => pick(r, [
  () => { const b = ri(r, 2, 9), a = ri(r, 1, b - 1), k = ri(r, 2, 6); const g = gcd(a, b); const A = frac(a / g, b / g); return { q: `Rút gọn phân số ${a * k}/${b * k} được phân số tối giản nào?`, a: A, w: [`${a * k}/${b}`, `${a}/${b * k}`, frac(a + 1, b, false), `${a * k / k + 1}/${b * k}`].filter(x => x !== A), ex: `Chia cả tử và mẫu cho ${k * g}: ${a * k}/${b * k} = ${A}.` }; },
  () => { const b = ri(r, 5, 12), a = ri(r, 1, b - 3), c = ri(r, 1, b - a - 1); return { q: `${a}/${b} + ${c}/${b} = ?`, a: frac(a + c, b, false), w: [`${a + c}/${2 * b}`, frac(a + c + 1, b, false), frac(Math.abs(a - c) || a + c + 2, b, false)], ex: `Cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số: ${a + c}/${b}.` }; },
  () => { const b = ri(r, 3, 10), a = ri(r, 1, b - 1), c = ri(r, 1, b - 1); if (a === c) return fractions(r); const big = a > c ? a : c; return { q: `Phân số nào lớn hơn: ${a}/${b} hay ${c}/${b}?`, a: `${big}/${b}`, w: [`${a + c - big}/${b}`, 'Hai phân số bằng nhau', `${b}/${big}`], ex: `Cùng mẫu số, tử số lớn hơn thì phân số lớn hơn: ${big}/${b}.` }; },
])();
const fractions2 = (r) => pick(r, [
  () => { const b = pick(r, [2, 3, 4, 5]), d = b * pick(r, [2, 3]), a = ri(r, 1, b - 1), c = ri(r, 1, d - 1); const A = frac(a * (d / b) + c, d); return { q: `${a}/${b} + ${c}/${d} = ?`, a: A, w: [`${a + c}/${b + d}`, `${a + c}/${d}`, frac(a * (d / b) + c + 1, d)].filter(x => x !== A), ex: `Quy đồng: ${a}/${b} = ${a * (d / b)}/${d}; ${a * (d / b)}/${d} + ${c}/${d} = ${A}.` }; },
  () => { const b = pick(r, [3, 4, 5, 6]), a = ri(r, 1, b - 1), unit = ri(r, 4, 20), n = b * unit; return numQ(r, `${a}/${b} của ${n} là bao nhiêu?`, a * unit, [unit, n - a * unit === a * unit ? n : n - a * unit, a * n], `${n} : ${b} × ${a} = ${unit} × ${a} = ${a * unit}.`); },
  () => { const a = ri(r, 2, 7), b = ri(r, 2, 9), c = ri(r, 2, 9); const A = frac(a * c, b); return { q: `${a}/${b} × ${c} = ?`, a: A, w: [frac(a * c, b * c), frac(a + c, b), frac(a, b * c)].filter(x => x !== A), ex: `Nhân tử số với ${c}, giữ nguyên mẫu số: ${a * c}/${b}${frac(a * c, b) !== `${a * c}/${b}` ? ` = ${A}` : ''}.` }; },
])();
const ratio = (r) => pick(r, [
  () => { const m = ri(r, 2, 5), unit = ri(r, 6, 40), s = unit * (m + 1); return numQ(r, `Tổng của hai số là ${s}. Số bé bằng 1/${m} số lớn. Số lớn là bao nhiêu?`, unit * m, [unit, s / 2, unit * (m - 1)], `Tổng số phần bằng nhau: ${m} + 1 = ${m + 1}; một phần: ${s} : ${m + 1} = ${unit}; số lớn: ${unit} × ${m} = ${unit * m}.`); },
  () => { const m = ri(r, 2, 5), unit = ri(r, 6, 40), d = unit * (m - 1); return numQ(r, `Hiệu của hai số là ${d}. Số lớn gấp ${m} lần số bé. Số bé là bao nhiêu?`, unit, [unit * m, d, d / m === Math.round(d / m) ? d / m + 1 : unit + 1], `Hiệu số phần: ${m} − 1 = ${m - 1}; số bé: ${d} : ${m - 1} = ${unit}.`); },
  () => numQ(r, '1 m² bằng bao nhiêu đề-xi-mét vuông?', 100, [10, 1000, 10000], '1 m² = 100 dm².', { unit: ' dm²' }),
  () => numQ(r, '1 dm² bằng bao nhiêu xăng-ti-mét vuông?', 100, [10, 1000, 50], '1 dm² = 100 cm².', { unit: ' cm²' }),
])();

export const LEVELS = [
  ['so', [place]],
  ['so', [roundBig]],
  ['cong-tru', [addBig]],
  ['do-luong', [units]],
  ['nhan-chia', [by10]],
  ['bieu-thuc', [letters]],
  ['tong-hop', [average]],
  ['nhan-chia', [mul2]],
  ['nhan-chia', [div2]],
  ['hinh', [angles]],
  ['loi-van', [sumDiff]],
  ['so', [divisible]],
  ['phan-so', [fractions]],
  ['phan-so', [fractions2]],
  ['thu-thach', [ratio]],
];
