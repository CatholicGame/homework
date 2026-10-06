/**
 * SGK Toán 4: bài 107–136 (sách trang 119–145): so sánh phân số, bốn phép tính với phân số,
 * tìm phân số của một số, hình thoi, diện tích hình thoi.
 * Hình vẽ lại: scripts/redraw/g4t_bai107_136.py (bộ vẽ kit_g4t.py).
 */
import { fr, fracValidate, dsValidate, textValidate, mau, calc, divCalc } from './kit.js';
import { letterValidate, setValidate } from '../grade3Workbook.js';
import imgHbh from '../../assets/grade4-textbook/bai112_q5_hbh.svg';
import imgAmcn from '../../assets/grade4-textbook/bai113_q3_amcn.svg';
import imgNamHinh from '../../assets/grade4-textbook/bai133_q1_hinh.svg';
import imgThoiCheo from '../../assets/grade4-textbook/bai133_q2_thoi.svg';
import imgThoiDt from '../../assets/grade4-textbook/bai134_q1_thoi.svg';
import imgThoiDs from '../../assets/grade4-textbook/bai134_q3_ds.svg';
import imgTamGiac from '../../assets/grade4-textbook/bai135_q3_tamgiac.svg';
import imgHcn from '../../assets/grade4-textbook/bai136_q1_hcn.svg';
import imgPqrs from '../../assets/grade4-textbook/bai136_q2_thoi.svg';
import imgDienTich from '../../assets/grade4-textbook/bai136_q3_dientich.svg';

// ── Phân số: biểu thức viết gọn "2/5 + 3/5", "(1/3 + 1/5) × 1/2", "3 : 5/7" ─────────────────────────
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
const red = ([a, b]) => { const d = gcd(a, b) || 1; return [a / d, b / d]; };
const tok = (s) => s.match(/\d+\/\d+|\d+|[()+−×:]/g);

/** Giá trị [tử, mẫu] (tối giản) của biểu thức; nhân, chia trước, cộng, trừ sau, ngoặc trước hết. */
function value(s) {
  const t = tok(s);
  let i = 0;
  const factor = () => {
    const x = t[i++];
    if (x === '(') { const v = expr(); i++; return v; }
    const [a, b = 1] = x.split('/').map(Number);
    return [a, b];
  };
  const term = () => {
    let v = factor();
    while (t[i] === '×' || t[i] === ':') {
      const o = t[i++], w = factor();
      v = red(o === '×' ? [v[0] * w[0], v[1] * w[1]] : [v[0] * w[1], v[1] * w[0]]);
    }
    return v;
  };
  const expr = () => {
    let v = term();
    while (t[i] === '+' || t[i] === '−') {
      const o = t[i++], w = term();
      v = red([o === '+' ? v[0] * w[1] + w[0] * v[1] : v[0] * w[1] - w[0] * v[1], v[1] * w[1]]);
    }
    return v;
  };
  return red(expr());
}

/** Biểu thức hiển thị như sách: "2/5" → phân số tử trên, mẫu dưới. */
const show = (s) => tok(s).map(x => (x.includes('/') ? fr(...x.split('/')) : x)).join(' ').replace(/\( /g, '(').replace(/ \)/g, ')');

/** "a) 2/5 + 3/5 = {/}": bé viết kết quả; exact = phải là phân số tối giản (Tính rồi rút gọn). */
function T(prefix, s, exact = false) {
  const [a, b] = value(s);
  return { label: `${prefix}${show(s)} = {/}`, answer: `${a},${b}`, validate: fracValidate(a, b, exact) };
}

const pairsOf = (v) => {
  const n = String(v).split(',').map(x => Number(String(x).trim()));
  const out = [];
  for (let k = 0; k + 1 < n.length; k += 2) out.push([n[k], n[k + 1]]);
  return n.length % 2 || n.some(x => !Number.isInteger(x)) ? null : out;
};
const eqv = ([a, b], [c, d]) => b !== 0 && a * d === b * c;

/** Sắp xếp phân số: bé viết lần lượt các phân số (giá trị đúng từng vị trí). desc: từ lớn đến bé. */
function ord(prefix, list, desc = false) {
  const vals = list.map(s => s.split('/').map(Number));
  const sorted = [...vals].sort((x, y) => (x[0] * y[1] - y[0] * x[1]) * (desc ? -1 : 1));
  return {
    label: `${prefix}${sorted.map(() => '{/}').join(' ; ')}`,
    answer: sorted.map(p => p.join(',')).join(','),
    validate: (v) => { const p = pairsOf(v); return !!p && p.length === sorted.length && p.every((x, k) => eqv(x, sorted[k])); },
  };
}

/** Viết một tập phân số (không kể thứ tự), đúng từng phân số. */
function frSet(label, list) {
  const want = list.map(s => s.split('/').map(Number));
  const key = (arr) => arr.map(p => p.join('/')).sort().join('|');
  return {
    label, answer: want.map(p => p.join(',')).join(','),
    validate: (v) => { const p = pairsOf(v); return !!p && key(p) === key(want); },
  };
}

/** Một phân số bé viết (nhãn tự do có {/}). */
const F = (label, a, b, exact = false) => ({ label, answer: `${a},${b}`, validate: fracValidate(a, b, exact) });

const lt = (x) => (typeof x === 'string' && x.includes('/') ? x.split('/').map(Number) : [Number(x), 1]);
const sh = (x) => (typeof x === 'string' && x.includes('/') ? fr(...x.split('/')) : String(x));
/** Hàng so sánh ">, <, =": hai vế là "3/7" hoặc số tự nhiên. */
const cmp = (l, r) => {
  const [a, b] = lt(l), [c, d] = lt(r);
  const s = a * d - c * b;
  return { left: sh(l), right: sh(r), answer: s > 0 ? '>' : s < 0 ? '<' : '=' };
};
/** Dấu so sánh viết vào chỗ chấm giữa hai biểu thức (chọn ô >, <, =). */
const sign = (l, r) => {
  const [a, b] = value(l), [c, d] = value(r);
  const s = a * d - c * b;
  return { label: `${show(l)} ... ${show(r)}`, answer: s > 0 ? '>' : s < 0 ? '<' : '=', tiles: ['>', '<', '='], tileOne: true };
};
const ABCD = ['A', 'B', 'C', 'D'];
const pick = (label, letter) => ({ label: `${label} ...`, answer: letter, validate: letterValidate(letter), tiles: ABCD, tileOne: true });
const yesNo = (label, yes) => ({ label: `${label} ...`, answer: yes ? 'Có' : 'Không', validate: textValidate(yes ? 'Có' : 'Không'), tiles: ['Có', 'Không'], tileOne: true });
const ds = (label, ok) => ({ label: `${label} ...`, answer: ok ? 'Đ' : 'S', validate: dsValidate(ok) });

const H_CUNG_MAU = 'Hai phân số cùng mẫu số: phân số nào có tử số lớn hơn thì lớn hơn.';
const H_KHAC_MAU = 'Quy đồng mẫu số hai phân số rồi so sánh các tử số.';
const H_VOI_1 = 'Tử số bé hơn mẫu số thì phân số bé hơn 1; tử số bằng mẫu số thì bằng 1; tử số lớn hơn mẫu số thì lớn hơn 1.';
const H_CONG = 'Cùng mẫu số: cộng hai tử số, giữ nguyên mẫu số. Khác mẫu số: quy đồng mẫu số trước.';
const H_TRU = 'Cùng mẫu số: lấy tử số thứ nhất trừ tử số thứ hai, giữ nguyên mẫu số. Khác mẫu số: quy đồng mẫu số trước.';
const H_NHAN = 'Tử số nhân với tử số, mẫu số nhân với mẫu số.';
const H_CHIA = 'Lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.';
const H_SO_TN = 'Viết số tự nhiên thành phân số có mẫu số 1 (vd. 3 = 3/1) rồi tính như hai phân số.';
const H_GON = 'Rút gọn: chia cả tử số và mẫu số cho cùng một số lớn hơn 1, đến khi không chia được nữa.';

export const QUESTIONS = {
  // ── Bài 107. So sánh hai phân số cùng mẫu số (trang 119) ──────────────────────────────────────
  'bai-107': [
    {
      type: 'compare', stars: 1,
      q: '1. So sánh hai phân số:',
      rows: [cmp('3/7', '5/7'), cmp('4/3', '2/3'), cmp('7/8', '5/8'), cmp('2/11', '9/11')],
      hints: [H_CUNG_MAU],
    },
    {
      type: 'compare', stars: 2,
      q: `2. a) Nhận xét: ${fr(2, 5)} < ${fr(5, 5)} mà ${fr(5, 5)} = 1 nên ${fr(2, 5)} < 1. Nếu tử số bé hơn mẫu số thì phân số bé hơn 1.\n${fr(8, 5)} > ${fr(5, 5)} mà ${fr(5, 5)} = 1 nên ${fr(8, 5)} > 1. Nếu tử số lớn hơn mẫu số thì phân số lớn hơn 1.\nb) So sánh các phân số sau với 1:`,
      rows: [cmp('1/2', 1), cmp('4/5', 1), cmp('7/3', 1), cmp('6/5', 1), cmp('9/9', 1), cmp('12/7', 1)],
      hints: [H_VOI_1],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các phân số bé hơn 1, có mẫu số là 5 và tử số khác 0.',
      blanks: [frSet('{/} ; {/} ; {/} ; {/}', ['1/5', '2/5', '3/5', '4/5'])],
      hints: ['Mẫu số là 5, phân số bé hơn 1 thì tử số bé hơn 5. Tử số khác 0: 1, 2, 3, 4.'],
    },
  ],

  // ── Bài 108. Luyện tập (trang 120) ────────────────────────────────────────────────────────────
  'bai-108': [
    {
      type: 'compare', stars: 1,
      q: '1. So sánh hai phân số:',
      rows: [cmp('3/5', '1/5'), cmp('9/10', '11/10'), cmp('13/17', '15/17'), cmp('25/19', '22/19')],
      hints: [H_CUNG_MAU],
    },
    {
      type: 'compare', stars: 2,
      q: '2. So sánh các phân số sau với 1:',
      rows: [cmp('1/4', 1), cmp('3/7', 1), cmp('9/5', 1), cmp('7/3', 1), cmp('14/15', 1), cmp('16/16', 1), cmp('14/11', 1)],
      hints: [H_VOI_1],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Viết các phân số theo thứ tự từ bé đến lớn:\na) ${fr(1, 5)} ; ${fr(4, 5)} ; ${fr(3, 5)}.&emsp;&emsp;b) ${fr(6, 7)} ; ${fr(8, 7)} ; ${fr(5, 7)}.\nc) ${fr(8, 9)} ; ${fr(5, 9)} ; ${fr(7, 9)}.&emsp;&emsp;d) ${fr(12, 11)} ; ${fr(16, 11)} ; ${fr(10, 11)}.`,
      blanks: [ord('a) ', ['1/5', '4/5', '3/5']), ord('b) ', ['6/7', '8/7', '5/7']), ord('c) ', ['8/9', '5/9', '7/9']), ord('d) ', ['12/11', '16/11', '10/11'])],
      hints: ['Các phân số cùng mẫu số: xếp theo tử số từ bé đến lớn.'],
    },
  ],

  // ── Bài 109. So sánh hai phân số khác mẫu số (trang 121–122) ──────────────────────────────────
  'bai-109': [
    {
      type: 'compare', stars: 2,
      q: '1. So sánh hai phân số:',
      rows: [cmp('3/4', '4/5'), cmp('5/6', '7/8'), cmp('2/5', '3/10')],
      hints: [H_KHAC_MAU, `Ví dụ: ${fr(3, 4)} = ${fr(15, 20)}, ${fr(4, 5)} = ${fr(16, 20)}.`],
    },
    {
      type: 'compare', stars: 2,
      q: '2. Rút gọn rồi so sánh hai phân số:',
      rows: [cmp('6/10', '4/5'), cmp('3/4', '6/12')],
      hints: [`Rút gọn trước: ${fr(6, 10)} = ${fr(3, 5)}; ${fr(6, 12)} = ${fr(1, 2)}. Sau đó so sánh.`],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `3. Mai ăn ${fr(3, 8)} cái bánh, Hoa ăn ${fr(2, 5)} cái bánh đó. Ai ăn nhiều bánh hơn?`,
      blanks: [{ label: 'Bạn ... ăn nhiều bánh hơn.', answer: 'Hoa', validate: textValidate('Hoa'), tiles: ['Mai', 'Hoa'], tileOne: true }],
      hints: [`So sánh ${fr(3, 8)} và ${fr(2, 5)}: quy đồng mẫu số 40.`],
    },
  ],

  // ── Bài 110. Luyện tập (trang 122) ────────────────────────────────────────────────────────────
  'bai-110': [
    {
      type: 'compare', stars: 2,
      q: '1. So sánh hai phân số:',
      rows: [cmp('5/8', '7/8'), cmp('15/25', '4/5'), cmp('9/7', '9/8'), cmp('11/20', '6/10')],
      hints: ['Cùng mẫu số: so sánh tử số. Khác mẫu số: rút gọn hoặc quy đồng mẫu số trước.'],
    },
    {
      type: 'compare', stars: 2,
      q: '2. So sánh hai phân số bằng hai cách khác nhau:',
      rows: [cmp('8/7', '7/8'), cmp('9/5', '5/8'), cmp('12/16', '28/21')],
      hints: ['Cách 1: quy đồng mẫu số. Cách 2: so sánh mỗi phân số với 1.'],
    },
    {
      type: 'compare', stars: 2,
      q: `3. So sánh hai phân số có cùng tử số:\na) Ví dụ: So sánh ${fr(4, 5)} và ${fr(4, 7)}. Ta có ${fr(4, 5)} = ${fr('4 × 7', '5 × 7')} = ${fr(28, 35)} và ${fr(4, 7)} = ${fr('4 × 5', '7 × 5')} = ${fr(20, 35)}; vì ${fr(28, 35)} > ${fr(20, 35)} nên ${fr(4, 5)} > ${fr(4, 7)}.\nNhận xét: Trong hai phân số (khác 0) có tử số bằng nhau, phân số nào có mẫu số bé hơn thì phân số đó lớn hơn.\nb) So sánh hai phân số:`,
      rows: [cmp('9/11', '9/14'), cmp('8/9', '8/11')],
      hints: ['Cùng tử số: phân số nào có mẫu số bé hơn thì lớn hơn.'],
    },
    {
      type: 'fill', stars: 3,
      q: `4. Viết các phân số theo thứ tự từ bé đến lớn:\na) ${fr(6, 7)} ; ${fr(4, 7)} ; ${fr(5, 7)}.&emsp;&emsp;b) ${fr(2, 3)} ; ${fr(5, 6)} ; ${fr(3, 4)}.`,
      blanks: [ord('a) ', ['6/7', '4/7', '5/7']), ord('b) ', ['2/3', '5/6', '3/4'])],
      hints: [`b) Quy đồng mẫu số 12: ${fr(2, 3)} = ${fr(8, 12)}, ${fr(5, 6)} = ${fr(10, 12)}, ${fr(3, 4)} = ${fr(9, 12)}.`],
    },
  ],

  // ── Bài 111. Luyện tập chung (trang 123) ──────────────────────────────────────────────────────
  'bai-111': [
    {
      type: 'compare', stars: 2,
      q: '1. >, <, = ?',
      rows: [cmp('9/14', '11/14'), cmp('4/25', '4/23'), cmp('14/15', 1), cmp('8/9', '24/27'), cmp('20/19', '20/27'), cmp(1, '15/14')],
      hints: ['Cùng mẫu số: so sánh tử số. Cùng tử số: mẫu số bé hơn thì phân số lớn hơn.', H_VOI_1],
    },
    {
      type: 'fill', stars: 1,
      q: '2. Với hai số tự nhiên 3 và 5, hãy viết:',
      blanks: [F('a) Phân số bé hơn 1: {/}', 3, 5, true), F('b) Phân số lớn hơn 1: {/}', 5, 3, true)],
      hints: ['Phân số bé hơn 1 có tử số bé hơn mẫu số.'],
    },
    {
      type: 'fill', stars: 3,
      q: `3. Viết các phân số theo thứ tự từ bé đến lớn:\na) ${fr(6, 11)} ; ${fr(6, 5)} ; ${fr(6, 7)}.&emsp;&emsp;b) ${fr(6, 20)} ; ${fr(9, 12)} ; ${fr(12, 32)}.`,
      blanks: [ord('a) ', ['6/11', '6/5', '6/7']), ord('b) ', ['6/20', '9/12', '12/32'])],
      hints: ['a) Cùng tử số: mẫu số lớn hơn thì phân số bé hơn.', `b) Rút gọn trước: ${fr(6, 20)} = ${fr(3, 10)}, ${fr(9, 12)} = ${fr(3, 4)}, ${fr(12, 32)} = ${fr(3, 8)}.`],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Tính:',
      blanks: [
        F(`a) ${fr('2 × 3 × 4 × 5', '3 × 4 × 5 × 6')} = {/}`, 1, 3),
        F(`b) ${fr('9 × 8 × 5', '6 × 4 × 15')} = {/}`, 1, 1),
      ],
      hints: ['Gạch bỏ các thừa số giống nhau ở tử số và mẫu số trước khi nhân.'],
    },
  ],

  // ── Bài 112. Luyện tập chung (trang 123–124) ──────────────────────────────────────────────────
  'bai-112': [
    {
      type: 'fill', stars: 3,
      q: '1. Tìm chữ số thích hợp để viết vào ô trống, sao cho:',
      blanks: [
        { label: 'a) 75... chia hết cho 2 nhưng không chia hết cho 5.', answer: '2', boxes: true, validate: (v) => /^[2468]$/.test(String(v).trim()) },
        { label: 'b) 75... chia hết cho 2 và chia hết cho 5.', answer: '0', boxes: true },
        yesNo('Số vừa tìm được có chia hết cho 3 không?', true),
        { label: 'c) 75... chia hết cho 9.', answer: '6', boxes: true },
        yesNo('Số vừa tìm được có chia hết cho 2 và 3 không?', true),
      ],
      hints: ['Chia hết cho 2: chữ số tận cùng chẵn. Chia hết cho 5: tận cùng 0 hoặc 5.', 'Chia hết cho 9 (cho 3): tổng các chữ số chia hết cho 9 (cho 3).'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Một lớp học có 14 học sinh trai và 17 học sinh gái.',
      blanks: [
        F('a) Phân số chỉ phần học sinh trai trong số học sinh của cả lớp học đó: {/}', 14, 31),
        F('b) Phân số chỉ phần học sinh gái trong số học sinh của cả lớp học đó: {/}', 17, 31),
      ],
      hints: ['Tìm số học sinh cả lớp trước: 14 + 17. Đó là mẫu số.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: `3. Trong các phân số ${fr(20, 36)} ; ${fr(15, 18)} ; ${fr(45, 25)} ; ${fr(35, 63)} phân số nào bằng ${fr(5, 9)}?`,
      options: [fr(20, 36), fr(15, 18), fr(45, 25), fr(35, 63)],
      answer: [0, 3],
      hints: ['Rút gọn từng phân số rồi so với 5/9.'],
    },
    {
      type: 'fill', stars: 3,
      q: `4. Viết các phân số ${fr(8, 12)} ; ${fr(12, 15)} ; ${fr(15, 20)} theo thứ tự từ lớn đến bé.`,
      blanks: [ord('', ['8/12', '12/15', '15/20'], true)],
      hints: [`Rút gọn: ${fr(8, 12)} = ${fr(2, 3)}, ${fr(12, 15)} = ${fr(4, 5)}, ${fr(15, 20)} = ${fr(3, 4)}; rồi quy đồng mẫu số để so sánh.`],
    },
    {
      type: 'fill', stars: 2, img: imgHbh,
      q: '5. Hai hình chữ nhật có phần chung là hình tứ giác ABCD (xem hình vẽ).',
      blanks: [
        yesNo('b) Đo độ dài các cạnh của hình tứ giác ABCD: từng cặp cạnh đối diện có bằng nhau không?', true),
        { label: 'c) Hình tứ giác ABCD là hình bình hành có độ dài đáy DC là 4cm, chiều cao AH là 2cm. Diện tích của hình bình hành ABCD là: ... cm²', answer: '8' },
      ],
      hints: ['Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.', 'Diện tích hình bình hành = độ dài đáy × chiều cao.'],
    },
  ],

  // ── Bài 113. Luyện tập chung (trang 124–125) ──────────────────────────────────────────────────
  'bai-113': [
    {
      type: 'fill', stars: 2,
      q: '1. Mỗi bài tập dưới đây có nêu kèm theo một số câu trả lời A, B, C, D (là đáp số, kết quả tính...). Hãy khoanh vào chữ đặt trước câu trả lời đúng:',
      blanks: [
        pick('a) Trong các số 5451 ; 5514 ; 5145 ; 5541 số chia hết cho 5 là:<br>A. 5451&emsp;&emsp;B. 5514&emsp;&emsp;C. 5145&emsp;&emsp;D. 5541<br>Chọn:', 'C'),
        pick(`b) Hùng có 8 viên bi gồm 4 viên bi màu xanh, 3 viên bi màu đỏ, 1 viên bi màu vàng. Phân số chỉ phần các viên bi màu đỏ trong số viên bi của Hùng là:<br>A. ${fr(4, 8)}&emsp;&emsp;B. ${fr(3, 4)}&emsp;&emsp;C. ${fr(1, 8)}&emsp;&emsp;D. ${fr(3, 8)}<br>Chọn:`, 'D'),
        pick(`c) Phân số ${fr(5, 9)} bằng phân số nào dưới đây?<br>A. ${fr(10, 27)}&emsp;&emsp;B. ${fr(15, 18)}&emsp;&emsp;C. ${fr(15, 27)}&emsp;&emsp;D. ${fr(20, 27)}<br>Chọn:`, 'C'),
        pick(`d) Trong các phân số ${fr(9, 8)} ; ${fr(9, 9)} ; ${fr(8, 8)} ; ${fr(8, 9)} phân số nào bé hơn 1?<br>A. ${fr(9, 8)}&emsp;&emsp;B. ${fr(9, 9)}&emsp;&emsp;C. ${fr(8, 8)}&emsp;&emsp;D. ${fr(8, 9)}<br>Chọn:`, 'D'),
      ],
      hints: ['Số chia hết cho 5 có chữ số tận cùng là 0 hoặc 5.', 'Nhân cả tử số và mẫu số của 5/9 với cùng một số để tìm phân số bằng nó.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Đặt tính rồi tính:',
      blanks: [calc('a) 53867 + 49608', 103475), calc('b) 482 × 307', 147974), calc('c) 864752 − 91846', 772906), divCalc(18490, 215, 'd) ')],
      hints: ['Bấm ✍️ Tính để đặt tính: viết các chữ số thẳng cột, tính từ hàng đơn vị. Phép chia thì chia từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 3, img: imgAmcn,
      q: '3. Cho hình chữ nhật ABCD có chiều dài 12cm, chiều rộng 5cm. Nối đỉnh A với trung điểm N của cạnh DC. Nối đỉnh C với trung điểm M của cạnh AB. Cho biết hình tứ giác AMCN là hình bình hành có chiều cao MN bằng chiều rộng của hình chữ nhật.',
      blanks: [
        { label: 'b) Diện tích hình chữ nhật ABCD gấp mấy lần diện tích hình bình hành AMCN?<br>Diện tích hình chữ nhật ABCD là: ... cm²', answer: '60' },
        { label: 'Diện tích hình bình hành AMCN là: ... cm²', answer: '30' },
        { label: 'Diện tích hình chữ nhật gấp ... lần diện tích hình bình hành.', answer: '2' },
      ],
      hints: ['Đáy NC của hình bình hành bằng nửa chiều dài: 12 : 2 = 6 (cm); chiều cao MN = 5cm.'],
    },
  ],

  // ── Bài 114. Phép cộng phân số (trang 126) ────────────────────────────────────────────────────
  'bai-114': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính:',
      blanks: [T('a) ', '2/5 + 3/5'), T('b) ', '3/4 + 5/4'), T('c) ', '3/8 + 7/8'), T('d) ', '35/25 + 7/25')],
      hints: [H_CONG],
    },
    {
      type: 'fill', stars: 1,
      q: '2. Tính chất giao hoán. Viết tiếp vào chỗ chấm:',
      blanks: [T('', '3/7 + 2/7'), T('', '2/7 + 3/7'), sign('3/7 + 2/7', '2/7 + 3/7')],
      hints: ['Khi ta đổi chỗ hai phân số trong một tổng thì tổng của chúng không thay đổi.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Hai ô tô cùng chuyển gạo ở một kho. Ô tô thứ nhất chuyển được ${fr(2, 7)} số gạo trong kho, ô tô thứ hai chuyển được ${fr(3, 7)} số gạo trong kho. Hỏi cả hai ô tô chuyển được bao nhiêu phần số gạo trong kho?`,
      blanks: [F('Cả hai ô tô chuyển được {/} số gạo trong kho.', 5, 7)],
      hints: ['Cộng hai phân số chỉ số gạo của hai ô tô.'],
    },
  ],

  // ── Bài 115. Phép cộng phân số (tiếp theo) (trang 127) ───────────────────────────────────────
  'bai-115': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [T('a) ', '2/3 + 3/4'), T('b) ', '9/4 + 3/5'), T('c) ', '2/5 + 4/7'), T('d) ', '3/5 + 4/3')],
      hints: [H_CONG, `Ví dụ: ${fr(2, 3)} = ${fr(8, 12)}, ${fr(3, 4)} = ${fr(9, 12)}.`],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Tính (theo mẫu):\n${mau(`${fr(13, 21)} + ${fr(5, 7)} = ${fr(13, 21)} + ${fr('5 × 3', '7 × 3')} = ${fr(13, 21)} + ${fr(15, 21)} = ${fr(28, 21)}`)}`,
      blanks: [T('a) ', '3/12 + 1/4'), T('b) ', '4/25 + 3/5'), T('c) ', '26/81 + 4/27'), T('d) ', '5/64 + 7/8')],
      hints: ['Mẫu số lớn chia hết cho mẫu số bé: chỉ cần quy đồng phân số có mẫu số bé.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Một xe ô tô giờ đầu chạy được ${fr(3, 8)} quãng đường, giờ thứ hai chạy được ${fr(2, 7)} quãng đường. Hỏi sau hai giờ ô tô đó chạy được bao nhiêu phần của quãng đường?`,
      blanks: [F('Sau hai giờ ô tô chạy được {/} quãng đường.', 37, 56)],
      hints: [`Tính ${fr(3, 8)} + ${fr(2, 7)}: quy đồng mẫu số 56.`],
    },
  ],

  // ── Bài 116. Luyện tập (trang 128) ────────────────────────────────────────────────────────────
  'bai-116': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính:',
      blanks: [T('a) ', '2/3 + 5/3'), T('b) ', '6/5 + 9/5'), T('c) ', '12/27 + 7/27 + 8/27')],
      hints: [H_CONG],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '3/4 + 2/7'), T('b) ', '5/16 + 3/8'), T('c) ', '1/3 + 7/5')],
      hints: [H_CONG],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Rút gọn rồi tính:',
      blanks: [T('a) ', '3/15 + 2/5'), T('b) ', '4/6 + 18/27'), T('c) ', '15/25 + 6/21')],
      hints: [`Rút gọn từng phân số trước, ví dụ ${fr(3, 15)} = ${fr(1, 5)}; rồi cộng.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `4. Trong một buổi sinh hoạt, chi đội lớp 4A có ${fr(3, 7)} số đội viên tập hát và ${fr(2, 5)} số đội viên tham gia đá bóng. Hỏi số đội viên tham gia hai hoạt động trên bằng bao nhiêu phần số đội viên của chi đội?`,
      blanks: [F('Số đội viên tham gia hai hoạt động bằng {/} số đội viên của chi đội.', 29, 35)],
      hints: [`Tính ${fr(3, 7)} + ${fr(2, 5)}: quy đồng mẫu số 35.`],
    },
  ],

  // ── Bài 117. Luyện tập (trang 128–129) ────────────────────────────────────────────────────────
  'bai-117': [
    {
      type: 'fill', stars: 2,
      q: `1. Tính (theo mẫu):\n${mau(`3 + ${fr(4, 5)} = ${fr(3, 1)} + ${fr(4, 5)} = ${fr(15, 5)} + ${fr(4, 5)} = ${fr(19, 5)}`)}\nTa có thể viết gọn như sau: 3 + ${fr(4, 5)} = ${fr(15, 5)} + ${fr(4, 5)} = ${fr(19, 5)}.`,
      blanks: [T('a) ', '3 + 2/3'), T('b) ', '3/4 + 5'), T('c) ', '12/21 + 2')],
      hints: [H_SO_TN],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính chất kết hợp. Viết tiếp vào chỗ chấm:',
      blanks: [T('', '(3/8 + 2/8) + 1/8'), T('', '3/8 + (2/8 + 1/8)'), sign('(3/8 + 2/8) + 1/8', '3/8 + (2/8 + 1/8)')],
      hints: ['Khi cộng một tổng hai phân số với phân số thứ ba, ta có thể cộng phân số thứ nhất với tổng của phân số thứ hai và phân số thứ ba.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Một hình chữ nhật có chiều dài ${fr(2, 3)}m, chiều rộng ${fr(3, 10)}m. Tính nửa chu vi của hình chữ nhật đó.`,
      blanks: [F('Nửa chu vi hình chữ nhật là: {/} m', 29, 30)],
      hints: ['Nửa chu vi = chiều dài + chiều rộng.'],
    },
  ],

  // ── Bài 118. Phép trừ phân số (trang 129) ─────────────────────────────────────────────────────
  'bai-118': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính:',
      blanks: [T('a) ', '15/16 − 7/16'), T('b) ', '7/4 − 3/4'), T('c) ', '9/5 − 3/5'), T('d) ', '17/49 − 12/49')],
      hints: [H_TRU],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Rút gọn rồi tính:',
      blanks: [T('a) ', '2/3 − 3/9'), T('b) ', '7/5 − 15/25'), T('c) ', '3/2 − 4/8'), T('d) ', '11/4 − 6/8')],
      hints: [`Rút gọn phân số thứ hai trước, ví dụ ${fr(3, 9)} = ${fr(1, 3)}; rồi trừ.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Tại Hội khoẻ Phù Đổng toàn quốc lần thứ VI năm 2004, số huy chương vàng của đoàn học sinh tỉnh Đồng Tháp bằng ${fr(5, 19)} tổng số huy chương của đoàn đã giành được, còn lại là huy chương bạc và huy chương đồng. Hỏi số huy chương bạc và huy chương đồng của đoàn Đồng Tháp bằng bao nhiêu phần tổng số huy chương mà đoàn đã giành được?`,
      blanks: [F('Số huy chương bạc và đồng bằng {/} tổng số huy chương.', 14, 19)],
      hints: [`Tổng số huy chương là ${fr(19, 19)}. Lấy ${fr(19, 19)} trừ đi phần huy chương vàng.`],
    },
  ],

  // ── Bài 119. Phép trừ phân số (tiếp theo) (trang 130) ────────────────────────────────────────
  'bai-119': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [T('a) ', '4/5 − 1/3'), T('b) ', '5/6 − 3/8'), T('c) ', '8/7 − 2/3'), T('d) ', '5/3 − 3/5')],
      hints: [H_TRU],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '20/16 − 3/4'), T('b) ', '30/45 − 2/5'), T('c) ', '10/12 − 3/4'), T('d) ', '12/9 − 1/4')],
      hints: ['Quy đồng mẫu số (hoặc rút gọn phân số thứ nhất) rồi trừ.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Trong một công viên có ${fr(6, 7)} diện tích đã trồng hoa và cây xanh, trong đó ${fr(2, 5)} diện tích của công viên đã trồng hoa. Hỏi diện tích để trồng cây xanh là bao nhiêu phần diện tích của công viên?`,
      blanks: [F('Diện tích trồng cây xanh là {/} diện tích công viên.', 16, 35)],
      hints: [`Tính ${fr(6, 7)} − ${fr(2, 5)}: quy đồng mẫu số 35.`],
    },
  ],

  // ── Bài 120. Luyện tập (trang 131) ────────────────────────────────────────────────────────────
  'bai-120': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính:',
      blanks: [T('a) ', '8/3 − 5/3'), T('b) ', '16/5 − 9/5'), T('c) ', '21/8 − 3/8')],
      hints: [H_TRU],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '3/4 − 2/7'), T('b) ', '3/8 − 5/16'), T('c) ', '7/5 − 2/3'), T('d) ', '31/36 − 5/6')],
      hints: [H_TRU],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Tính (theo mẫu):\n${mau(`2 − ${fr(3, 4)} = ${fr(8, 4)} − ${fr(3, 4)} = ${fr(5, 4)}`)}`,
      blanks: [T('a) ', '2 − 3/2'), T('b) ', '5 − 14/3'), T('c) ', '37/12 − 3')],
      hints: [`Viết số tự nhiên thành phân số có cùng mẫu số với phân số kia, ví dụ 2 = ${fr(8, 4)}.`],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Rút gọn rồi tính:',
      blanks: [T('a) ', '3/15 − 5/35'), T('b) ', '18/27 − 2/6'), T('c) ', '15/25 − 3/21'), T('d) ', '24/36 − 6/12')],
      hints: [`Rút gọn từng phân số trước, ví dụ ${fr(3, 15)} = ${fr(1, 5)}, ${fr(5, 35)} = ${fr(1, 7)}.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `5. Trong một ngày thời gian để học và ngủ của bạn Nam là ${fr(5, 8)} ngày, trong đó thời gian học của Nam là ${fr(1, 4)} ngày. Hỏi thời gian ngủ của bạn Nam là bao nhiêu phần của một ngày?`,
      blanks: [F('Thời gian ngủ của Nam là {/} ngày.', 3, 8)],
      hints: [`Tính ${fr(5, 8)} − ${fr(1, 4)}.`],
    },
  ],

  // ── Bài 121. Luyện tập chung (trang 131–132) ──────────────────────────────────────────────────
  'bai-121': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [T('a) ', '2/3 + 5/4'), T('b) ', '3/5 + 9/8'), T('c) ', '3/4 − 2/7'), T('d) ', '11/5 − 4/3')],
      hints: ['Quy đồng mẫu số hai phân số rồi cộng (trừ) hai tử số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '4/5 + 17/25'), T('b) ', '7/3 − 5/6'), T('c) ', '1 + 2/3'), T('d) ', '9/2 − 3')],
      hints: [`Số tự nhiên viết thành phân số: 1 = ${fr(3, 3)}, 3 = ${fr(6, 2)}.`],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tìm x:',
      blanks: [
        F(`a) x + ${fr(4, 5)} = ${fr(3, 2)} → x = {/}`, 7, 10),
        F(`b) x − ${fr(3, 2)} = ${fr(11, 4)} → x = {/}`, 17, 4),
        F(`c) ${fr(25, 3)} − x = ${fr(5, 6)} → x = {/}`, 15, 2),
      ],
      hints: ['Số hạng = tổng − số hạng kia; số bị trừ = hiệu + số trừ; số trừ = số bị trừ − hiệu.'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Tính bằng cách thuận tiện nhất:',
      blanks: [T('a) ', '12/17 + 19/17 + 8/17'), T('b) ', '2/5 + 7/12 + 13/12')],
      hints: [`Cộng trước hai phân số có tổng gọn: ${fr(12, 17)} + ${fr(8, 17)} = ${fr(20, 17)}; ${fr(7, 12)} + ${fr(13, 12)} = ${fr(20, 12)}.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `5. Trong một giờ học tự chọn, lớp 4A có ${fr(2, 5)} số học sinh học Tiếng Anh và ${fr(3, 7)} số học sinh học Tin học. Hỏi số học sinh học Tin học và Tiếng Anh bằng bao nhiêu phần tổng số học sinh cả lớp?`,
      blanks: [F('Số học sinh học Tin học và Tiếng Anh bằng {/} số học sinh cả lớp.', 29, 35)],
      hints: [`Tính ${fr(2, 5)} + ${fr(3, 7)}.`],
    },
  ],

  // ── Bài 122. Phép nhân phân số (trang 132–133) ────────────────────────────────────────────────
  'bai-122': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính:',
      blanks: [T('a) ', '4/5 × 6/7'), T('b) ', '2/9 × 1/2'), T('c) ', '1/2 × 8/3'), T('d) ', '1/8 × 1/7')],
      hints: [H_NHAN],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Rút gọn rồi tính:',
      blanks: [T('a) ', '2/6 × 7/5'), T('b) ', '11/9 × 5/10'), T('c) ', '3/9 × 6/8')],
      hints: [`Rút gọn trước, ví dụ ${fr(2, 6)} = ${fr(1, 3)}; rồi nhân.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Một hình chữ nhật có chiều dài ${fr(6, 7)}m và chiều rộng ${fr(3, 5)}m. Tính diện tích hình chữ nhật đó.`,
      blanks: [F('Diện tích hình chữ nhật là: {/} m²', 18, 35)],
      hints: ['Diện tích hình chữ nhật = chiều dài × chiều rộng.'],
    },
  ],

  // ── Bài 123. Luyện tập (trang 133) ────────────────────────────────────────────────────────────
  'bai-123': [
    {
      type: 'fill', stars: 1,
      q: `1. Tính (theo mẫu):\n${mau(`${fr(2, 9)} × 5 = ${fr(2, 9)} × ${fr(5, 1)} = ${fr('2 × 5', '9 × 1')} = ${fr(10, 9)}`)}\nTa có thể viết gọn như sau: ${fr(2, 9)} × 5 = ${fr('2 × 5', 9)} = ${fr(10, 9)}.`,
      blanks: [T('a) ', '9/11 × 8'), T('b) ', '5/6 × 7'), T('c) ', '4/5 × 1'), T('d) ', '5/8 × 0')],
      hints: ['Nhân số tự nhiên với tử số, giữ nguyên mẫu số.'],
    },
    {
      type: 'fill', stars: 1,
      q: `2. Tính (theo mẫu):\n${mau(`2 × ${fr(3, 7)} = ${fr(2, 1)} × ${fr(3, 7)} = ${fr('2 × 3', '1 × 7')} = ${fr(6, 7)}`)}\nTa có thể viết gọn như sau: 2 × ${fr(3, 7)} = ${fr('2 × 3', 7)} = ${fr(6, 7)}.`,
      blanks: [T('a) ', '4 × 6/7'), T('b) ', '3 × 4/11'), T('c) ', '1 × 5/4'), T('d) ', '0 × 2/5')],
      hints: ['Nhân số tự nhiên với tử số, giữ nguyên mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Tính rồi so sánh kết quả: ${fr(2, 5)} × 3 và ${fr(2, 5)} + ${fr(2, 5)} + ${fr(2, 5)}.`,
      blanks: [T('', '2/5 × 3'), T('', '2/5 + 2/5 + 2/5'), sign('2/5 × 3', '2/5 + 2/5 + 2/5')],
      hints: ['Nhân với 3 là cộng ba lần.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Tính rồi rút gọn:',
      blanks: [T('a) ', '5/3 × 4/5', true), T('b) ', '2/3 × 3/7', true), T('c) ', '7/13 × 13/7', true)],
      hints: [H_NHAN, H_GON],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `5. Tính chu vi và diện tích hình vuông có cạnh ${fr(5, 7)}m.`,
      blanks: [F('Chu vi hình vuông là: {/} m', 20, 7), F('Diện tích hình vuông là: {/} m²', 25, 49)],
      hints: ['Chu vi hình vuông = cạnh × 4; diện tích = cạnh × cạnh.'],
    },
  ],

  // ── Bài 124. Luyện tập (trang 134) ────────────────────────────────────────────────────────────
  'bai-124': [
    {
      type: 'fill', stars: 3,
      q: '1. a) Viết tiếp vào chỗ chấm (tính chất giao hoán, tính chất kết hợp, nhân một tổng với một phân số):\nb) Tính bằng hai cách:',
      blanks: [
        T('a) ', '2/3 × 4/5'), T('', '4/5 × 2/3'), sign('2/3 × 4/5', '4/5 × 2/3'),
        T('', '(1/3 × 2/5) × 3/4'), T('', '1/3 × (2/5 × 3/4)'), sign('(1/3 × 2/5) × 3/4', '1/3 × (2/5 × 3/4)'),
        T('', '(1/5 + 2/5) × 3/4'), T('', '1/5 × 3/4 + 2/5 × 3/4'), sign('(1/5 + 2/5) × 3/4', '1/5 × 3/4 + 2/5 × 3/4'),
        T('b) ', '3/22 × 3/11 × 22'), T('', '(1/2 + 1/3) × 2/5'), T('', '3/5 × 17/21 + 17/21 × 2/5'),
      ],
      hints: ['Khi đổi chỗ các phân số trong một tích thì tích không thay đổi.', `b) Ví dụ: ${fr(3, 5)} × ${fr(17, 21)} + ${fr(17, 21)} × ${fr(2, 5)} = (${fr(3, 5)} + ${fr(2, 5)}) × ${fr(17, 21)}.`],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `2. Tính chu vi hình chữ nhật có chiều dài ${fr(4, 5)}m và chiều rộng ${fr(2, 3)}m.`,
      blanks: [F('Chu vi hình chữ nhật là: {/} m', 44, 15)],
      hints: ['Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. May một chiếc túi hết ${fr(2, 3)}m vải. Hỏi may 3 chiếc túi như thế hết mấy mét vải?`,
      blanks: [F('May 3 chiếc túi hết {/} m vải.', 2, 1)],
      hints: [`Tính ${fr(2, 3)} × 3.`],
    },
  ],

  // ── Bài 125. Tìm phân số của một số (trang 135) ───────────────────────────────────────────────
  'bai-125': [
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `1. Một lớp học có 35 học sinh, trong đó ${fr(3, 5)} số học sinh được xếp loại khá. Tính số học sinh xếp loại khá của lớp học đó.`,
      blanks: [{ label: 'Số học sinh xếp loại khá là: ... học sinh', answer: '21' }],
      hints: [`Muốn tìm ${fr(3, 5)} của 35 ta lấy 35 nhân với ${fr(3, 5)}.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `2. Một sân trường hình chữ nhật có chiều dài 120m, chiều rộng bằng ${fr(5, 6)} chiều dài. Tính chiều rộng của sân trường.`,
      blanks: [{ label: 'Chiều rộng của sân trường là: ... m', answer: '100' }],
      hints: [`Chiều rộng = 120 × ${fr(5, 6)}.`],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `3. Lớp 4A có 16 học sinh nam và số học sinh nữ bằng ${fr(9, 8)} số học sinh nam. Hỏi lớp 4A có bao nhiêu học sinh nữ?`,
      blanks: [{ label: 'Lớp 4A có ... học sinh nữ.', answer: '18' }],
      hints: [`Số học sinh nữ = 16 × ${fr(9, 8)}.`],
    },
  ],

  // ── Bài 126. Phép chia phân số (trang 135–136) ────────────────────────────────────────────────
  'bai-126': [
    {
      type: 'fill', stars: 1,
      q: `1. Viết phân số đảo ngược của mỗi phân số sau: ${fr(2, 3)} ; ${fr(4, 7)} ; ${fr(3, 5)} ; ${fr(9, 4)} ; ${fr(10, 7)}.`,
      blanks: [F(`${fr(2, 3)} → {/}`, 3, 2, true), F(`${fr(4, 7)} → {/}`, 7, 4, true), F(`${fr(3, 5)} → {/}`, 5, 3, true), F(`${fr(9, 4)} → {/}`, 4, 9, true), F(`${fr(10, 7)} → {/}`, 7, 10, true)],
      hints: ['Phân số đảo ngược: đổi chỗ tử số và mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '3/7 : 5/8'), T('b) ', '8/7 : 3/4'), T('c) ', '1/3 : 1/2')],
      hints: [H_CHIA],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Tính:',
      blanks: [T('a) ', '2/3 × 5/7'), T('', '10/21 : 5/7'), T('', '10/21 : 2/3'), T('b) ', '1/5 × 1/3'), T('', '1/15 : 1/5'), T('', '1/15 : 1/3')],
      hints: [H_NHAN, H_CHIA],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `4. Một hình chữ nhật có diện tích ${fr(2, 3)}m², chiều rộng ${fr(3, 4)}m. Tính chiều dài của hình đó.`,
      blanks: [F('Chiều dài của hình chữ nhật là: {/} m', 8, 9)],
      hints: ['Chiều dài = diện tích : chiều rộng.'],
    },
  ],

  // ── Bài 127. Luyện tập (trang 136) ────────────────────────────────────────────────────────────
  'bai-127': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính rồi rút gọn:',
      blanks: [T('a) ', '3/5 : 3/4', true), T('', '2/5 : 3/10', true), T('', '9/8 : 3/4', true), T('b) ', '1/4 : 1/2', true), T('', '1/8 : 1/6', true), T('', '1/5 : 1/10', true)],
      hints: [H_CHIA, H_GON],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tìm x:',
      blanks: [F(`a) ${fr(3, 5)} × x = ${fr(4, 7)} → x = {/}`, 20, 21), F(`b) ${fr(1, 8)} : x = ${fr(1, 5)} → x = {/}`, 5, 8)],
      hints: ['Thừa số chưa biết = tích : thừa số đã biết; số chia = số bị chia : thương.'],
    },
    {
      type: 'fill', stars: 1,
      q: '3. Tính:',
      blanks: [T('a) ', '2/3 × 3/2'), T('b) ', '4/7 × 7/4'), T('c) ', '1/2 × 2/1')],
      hints: ['Nhân một phân số với phân số đảo ngược của nó thì được 1.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `4. Một hình bình hành có diện tích ${fr(2, 5)}m², chiều cao ${fr(2, 5)}m. Tính độ dài đáy của hình đó.`,
      blanks: [F('Độ dài đáy của hình bình hành là: {/} m', 1, 1)],
      hints: ['Độ dài đáy = diện tích : chiều cao.'],
    },
  ],

  // ── Bài 128. Luyện tập (trang 137) ────────────────────────────────────────────────────────────
  'bai-128': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính rồi rút gọn:',
      blanks: [T('a) ', '2/7 : 4/5', true), T('b) ', '3/8 : 9/4', true), T('c) ', '8/21 : 4/7', true), T('d) ', '5/8 : 15/8', true)],
      hints: [H_CHIA, H_GON],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Tính (theo mẫu):\n${mau(`2 : ${fr(3, 4)} = ${fr(2, 1)} : ${fr(3, 4)} = ${fr(2, 1)} × ${fr(4, 3)} = ${fr(8, 3)}`)}\nTa có thể viết gọn như sau: 2 : ${fr(3, 4)} = ${fr('2 × 4', 3)} = ${fr(8, 3)}.`,
      blanks: [T('a) ', '3 : 5/7'), T('b) ', '4 : 1/3'), T('c) ', '5 : 1/6')],
      hints: ['Lấy số tự nhiên nhân với mẫu số, được tử số; tử số của phân số chia trở thành mẫu số.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính bằng hai cách:',
      blanks: [T('a) ', '(1/3 + 1/5) × 1/2'), T('b) ', '(1/3 − 1/5) × 1/2')],
      hints: ['Cách 1: tính trong ngoặc trước. Cách 2: nhân từng phân số trong ngoặc với 1/2 rồi cộng (trừ).'],
    },
    {
      type: 'fill', stars: 2,
      q: `4. Cho các phân số ${fr(1, 2)} ; ${fr(1, 3)} ; ${fr(1, 4)} ; ${fr(1, 6)}. Hỏi mỗi phân số đó gấp mấy lần ${fr(1, 12)}?\n${mau(`${fr(1, 2)} : ${fr(1, 12)} = ${fr(1, 2)} × ${fr(12, 1)} = ${fr(12, 2)} = 6. Vậy: ${fr(1, 2)} gấp 6 lần ${fr(1, 12)}`)}`,
      blanks: [
        { label: `${fr(1, 3)} gấp ... lần ${fr(1, 12)}`, answer: '4' },
        { label: `${fr(1, 4)} gấp ... lần ${fr(1, 12)}`, answer: '3' },
        { label: `${fr(1, 6)} gấp ... lần ${fr(1, 12)}`, answer: '2' },
      ],
      hints: [`Chia phân số đó cho ${fr(1, 12)}.`],
    },
  ],

  // ── Bài 129. Luyện tập chung (trang 137–138) ──────────────────────────────────────────────────
  'bai-129': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [T('a) ', '5/9 : 4/7'), T('b) ', '1/5 : 1/3'), T('c) ', '1 : 2/3')],
      hints: [H_CHIA],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Tính (theo mẫu):\n${mau(`${fr(3, 4)} : 2 = ${fr(3, 4)} : ${fr(2, 1)} = ${fr(3, 4)} × ${fr(1, 2)} = ${fr(3, 8)}`)}\nTa có thể viết gọn như sau: ${fr(3, 4)} : 2 = ${fr(3, '4 × 2')} = ${fr(3, 8)}.`,
      blanks: [T('a) ', '5/7 : 3'), T('b) ', '1/2 : 5'), T('c) ', '2/3 : 4')],
      hints: ['Giữ nguyên tử số, lấy mẫu số nhân với số tự nhiên.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [T('a) ', '3/4 × 2/9 + 1/3'), T('b) ', '1/4 : 1/3 − 1/2')],
      hints: ['Nhân, chia trước; cộng, trừ sau.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Một mảnh vườn hình chữ nhật có chiều dài 60m, chiều rộng bằng ${fr(3, 5)} chiều dài. Tính chu vi và diện tích mảnh vườn đó.`,
      blanks: [
        { label: 'Chiều rộng mảnh vườn là: ... m', answer: '36' },
        { label: 'Chu vi mảnh vườn là: ... m', answer: '192' },
        { label: 'Diện tích mảnh vườn là: ... m²', answer: '2160' },
      ],
      hints: [`Chiều rộng = 60 × ${fr(3, 5)}.`, 'Chu vi = (dài + rộng) × 2; diện tích = dài × rộng.'],
    },
  ],

  // ── Bài 130. Luyện tập chung (trang 138) ──────────────────────────────────────────────────────
  'bai-130': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [T('a) ', '2/3 + 4/5'), T('b) ', '5/12 + 1/6'), T('c) ', '3/4 + 5/6')],
      hints: [H_CONG],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '23/5 − 11/3'), T('b) ', '3/7 − 1/14'), T('c) ', '5/6 − 3/4')],
      hints: [H_TRU],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Tính:',
      blanks: [T('a) ', '3/4 × 5/6'), T('b) ', '4/5 × 13'), T('c) ', '15 × 4/5')],
      hints: [H_NHAN, 'Nhân phân số với số tự nhiên: nhân số đó với tử số, giữ nguyên mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Tính:',
      blanks: [T('a) ', '8/5 : 1/3'), T('b) ', '3/7 : 2'), T('c) ', '2 : 2/4')],
      hints: [H_CHIA],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `5. Một cửa hàng có 50kg đường. Buổi sáng đã bán 10kg đường, buổi chiều bán ${fr(3, 8)} số đường còn lại. Hỏi cả hai buổi cửa hàng đã bán được bao nhiêu ki-lô-gam đường?`,
      blanks: [
        { label: 'Số đường còn lại sau buổi sáng: ... kg', answer: '40' },
        { label: 'Buổi chiều bán được: ... kg', answer: '15' },
        { label: 'Cả hai buổi bán được: ... kg', answer: '25' },
      ],
      hints: ['Tìm số đường còn lại sau buổi sáng trước.', `Buổi chiều bán ${fr(3, 8)} của số đường còn lại.`],
    },
  ],

  // ── Bài 131. Luyện tập chung (trang 138–139) ──────────────────────────────────────────────────
  'bai-131': [
    {
      type: 'choice', stars: 2,
      q: '1. Trong các phép tính sau, phép tính nào làm đúng?',
      options: [
        `${fr(5, 6)} + ${fr(1, 3)} = ${fr('5 + 1', '6 + 3')} = ${fr(6, 9)} = ${fr(2, 3)}`,
        `${fr(5, 6)} − ${fr(1, 3)} = ${fr('5 − 1', '6 − 3')} = ${fr(4, 3)}`,
        `${fr(5, 6)} × ${fr(1, 3)} = ${fr('5 × 1', '6 × 3')} = ${fr(5, 18)}`,
        `${fr(5, 6)} : ${fr(1, 3)} = ${fr(1, 3)} × ${fr(5, 6)} = ${fr('1 × 5', '3 × 6')} = ${fr(5, 18)}`,
      ],
      answer: 2,
      hints: ['Cộng, trừ phân số khác mẫu: phải quy đồng mẫu số, không cộng (trừ) mẫu số với nhau.', 'Chia: nhân phân số thứ nhất với phân số thứ hai đảo ngược.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính:',
      blanks: [T('a) ', '1/2 × 1/4 × 1/6'), T('b) ', '1/2 × 1/4 : 1/6'), T('c) ', '1/2 : 1/4 × 1/6')],
      hints: ['Chỉ có nhân, chia: tính lần lượt từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [T('a) ', '5/2 × 1/3 + 1/4'), T('b) ', '5/2 + 1/3 × 1/4'), T('c) ', '5/2 − 1/3 : 1/4')],
      hints: ['Nhân, chia trước; cộng, trừ sau.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `4. Người ta cho một vòi nước chảy vào bể chưa có nước. Lần thứ nhất chảy vào ${fr(3, 7)} bể, lần thứ hai chảy vào thêm ${fr(2, 5)} bể. Hỏi còn mấy phần của bể chưa có nước?`,
      blanks: [F('Hai lần chảy được {/} bể.', 29, 35), F('Còn {/} bể chưa có nước.', 6, 35)],
      hints: ['Cả bể là 1. Cộng hai lần chảy rồi lấy 1 trừ đi.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Một kho chứa 23 450kg cà phê. Lần đầu lấy ra 2710kg cà phê, lần sau lấy ra gấp đôi lần đầu. Hỏi trong kho còn lại bao nhiêu ki-lô-gam cà phê?',
      blanks: [
        { label: 'Lần sau lấy ra: ... kg', answer: '5420' },
        { label: 'Cả hai lần lấy ra: ... kg', answer: '8130' },
        { label: 'Trong kho còn lại: ... kg', answer: '15320' },
      ],
      hints: ['Lần sau = 2710 × 2.', 'Lấy số cà phê trong kho trừ đi số đã lấy ra.'],
    },
  ],

  // ── Bài 132. Luyện tập chung (trang 139) ──────────────────────────────────────────────────────
  'bai-132': [
    {
      type: 'fill', stars: 3,
      q: `1. Cho các phân số: ${fr(3, 5)} ; ${fr(5, 6)} ; ${fr(25, 30)} ; ${fr(9, 15)} ; ${fr(10, 12)} ; ${fr(6, 10)}.\na) Rút gọn các phân số trên;\nb) Cho biết trong các phân số trên có những phân số nào bằng nhau.`,
      blanks: [
        F(`a) ${fr(25, 30)} = {/}`, 5, 6, true), F(`${fr(9, 15)} = {/}`, 3, 5, true), F(`${fr(10, 12)} = {/}`, 5, 6, true), F(`${fr(6, 10)} = {/}`, 3, 5, true),
        frSet(`b) Các phân số bằng ${fr(3, 5)} là: {/} ; {/}`, ['9/15', '6/10']),
        frSet(`Các phân số bằng ${fr(5, 6)} là: {/} ; {/}`, ['25/30', '10/12']),
      ],
      hints: [`${fr(3, 5)} và ${fr(5, 6)} đã tối giản.`, 'Những phân số rút gọn được cùng một phân số thì bằng nhau.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '2. Lớp 4A có 32 học sinh được chia đều thành 4 tổ. Hỏi:\na) 3 tổ chiếm mấy phần số học sinh của lớp?\nb) 3 tổ có bao nhiêu học sinh?',
      blanks: [F('a) 3 tổ chiếm {/} số học sinh của lớp.', 3, 4), { label: 'b) 3 tổ có ... học sinh.', answer: '24' }],
      hints: ['Lớp chia đều thành 4 tổ: mỗi tổ là 1/4 số học sinh.', `b) Tìm ${fr(3, 4)} của 32.`],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `3. Quãng đường từ nhà anh Hải đến thị xã dài 15km. Anh Hải đi từ nhà ra thị xã, khi đi được ${fr(2, 3)} quãng đường thì dừng lại nghỉ một lúc. Hỏi anh Hải còn phải đi tiếp bao nhiêu ki-lô-mét nữa thì đến thị xã?`,
      blanks: [{ label: 'Anh Hải đã đi được: ... km', answer: '10' }, { label: 'Anh Hải còn phải đi tiếp: ... km', answer: '5' }],
      hints: [`Quãng đường đã đi = 15 × ${fr(2, 3)}.`],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Có một kho chứa xăng. Lần đầu người ta lấy ra 32 850l xăng, lần sau lấy ra bằng ${fr(1, 3)} lần đầu thì trong kho còn lại 56 200l xăng. Hỏi lúc đầu trong kho có bao nhiêu lít xăng?`,
      blanks: [
        { label: 'Lần sau lấy ra: ... l', answer: '10950' },
        { label: 'Cả hai lần lấy ra: ... l', answer: '43800' },
        { label: 'Lúc đầu trong kho có: ... l', answer: '100000' },
      ],
      hints: ['Lần sau = 32 850 : 3.', 'Lúc đầu = số đã lấy ra + số còn lại.'],
    },
  ],

  // ── Bài 133. Hình thoi (trang 140–141) ────────────────────────────────────────────────────────
  'bai-133': [
    {
      type: 'fill', stars: 2, img: imgNamHinh,
      q: '1. Trong các hình dưới đây:\nHình nào là hình thoi? Hình nào là hình chữ nhật?',
      blanks: [
        { label: 'Hình thoi là: Hình ...', answer: '1, 3', validate: setValidate(['1', '3']) },
        { label: 'Hình chữ nhật là: Hình ...', answer: '2', validate: setValidate(['2']) },
      ],
      hints: ['Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.', 'Hình chữ nhật có bốn góc vuông.'],
    },
    {
      type: 'fill', stars: 2, img: imgThoiCheo,
      q: '2. Trong hình thoi ABCD, AC và BD là hai đường chéo của hình thoi, chúng cắt nhau tại điểm O.',
      blanks: [
        yesNo('a) Dùng ê ke để kiểm tra: hai đường chéo có vuông góc với nhau không?', true),
        yesNo('b) Dùng thước có vạch chia xăng-ti-mét để kiểm tra: hai đường chéo có cắt nhau tại trung điểm của mỗi đường không?', true),
      ],
      hints: ['Đặt góc vuông của ê ke vào điểm O. Đo OA, OC rồi đo OB, OD.'],
      // 📐 Kéo dài: toạ độ theo bai133_q2_thoi.svg.
      geoPlay: { points: { A: [60, 125], B: [230, 35], C: [400, 125], D: [230, 215], O: [230, 125] }, segs: ['AB', 'BC', 'CD', 'DA', 'AC', 'BD'], fill: 'ABCD', pick: 'AC' },
      ekePlay: { fill: { blank: 0, angle: 'OAB' } },
      // 📏 Thước: AC = 10 cm (1 cm = 34)
      rulerPlay: { unit: 'cm', per: 34, fill: { blank: 1, allMid: [['A', 'O', 'C'], ['B', 'O', 'D']], yes: 'Có', no: 'Không' } },
    },
  ],

  // ── Bài 134. Diện tích hình thoi (trang 142–143) ──────────────────────────────────────────────
  'bai-134': [
    {
      type: 'fill', stars: 2, img: imgThoiDt,
      q: '1. Tính diện tích của:\na) Hình thoi ABCD, biết: AC = 3cm ; BD = 4cm.\nb) Hình thoi MNPQ, biết: MP = 7cm ; NQ = 4cm.',
      blanks: [{ label: 'a) Diện tích hình thoi ABCD là: ... cm²', answer: '6' }, { label: 'b) Diện tích hình thoi MNPQ là: ... cm²', answer: '14' }],
      hints: ['Diện tích hình thoi = độ dài đường chéo thứ nhất × độ dài đường chéo thứ hai : 2.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính diện tích hình thoi, biết:\na) Độ dài các đường chéo là 5dm và 20dm;\nb) Độ dài các đường chéo là 4m và 15dm.',
      blanks: [{ label: 'a) Diện tích hình thoi là: ... dm²', answer: '50' }, { label: 'b) Diện tích hình thoi là: ... dm²', answer: '300' }],
      hints: ['Hai đường chéo phải cùng một đơn vị đo: b) 4m = 40dm.'],
    },
    {
      type: 'fill', stars: 2, img: imgThoiDs,
      q: '3. Đúng ghi Đ, sai ghi S:',
      blanks: [ds('a) Diện tích hình thoi bằng diện tích hình chữ nhật.', false), ds(`b) Diện tích hình thoi bằng ${fr(1, 2)} diện tích hình chữ nhật.`, true)],
      hints: ['Hình thoi: 5 × 2 : 2. Hình chữ nhật: 5 × 2.'],
    },
  ],

  // ── Bài 135. Luyện tập (trang 143–144) ────────────────────────────────────────────────────────
  'bai-135': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính diện tích hình thoi, biết:\na) Độ dài các đường chéo là 19cm và 12cm;\nb) Độ dài các đường chéo là 30cm và 7dm.',
      blanks: [{ label: 'a) Diện tích hình thoi là: ... cm²', answer: '114' }, { label: 'b) Diện tích hình thoi là: ... cm²', answer: '1050' }],
      hints: ['Diện tích hình thoi = tích hai đường chéo : 2.', 'b) Đổi 7dm = 70cm trước.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '2. Một miếng kính hình thoi có độ dài các đường chéo là 14cm và 10cm. Tính diện tích miếng kính đó.',
      blanks: [{ label: 'Diện tích miếng kính là: ... cm²', answer: '70' }],
      hints: ['Diện tích hình thoi = tích hai đường chéo : 2.'],
    },
    {
      type: 'fill', stars: 3, img: imgTamGiac,
      q: '3. Cho bốn hình tam giác, mỗi hình như hình bên (hai cạnh góc vuông 2cm và 3cm).',
      blanks: [
        { label: 'a) Xếp bốn hình tam giác đó thành một hình thoi như hình bên. Hai đường chéo của hình thoi dài: ... cm và ... cm', answer: '6,4', validate: (v) => { const s = String(v).split(',').map(x => x.trim()).sort().join(','); return s === '4,6'; } },
        { label: 'b) Diện tích hình thoi là: ... cm²', answer: '12' },
      ],
      hints: ['Bốn tam giác ghép quanh tâm: mỗi đường chéo gồm hai cạnh góc vuông bằng nhau.', 'Đường chéo thứ nhất: 3 + 3; đường chéo thứ hai: 2 + 2.'],
    },
  ],

  // ── Bài 136. Luyện tập chung (trang 144–145) ──────────────────────────────────────────────────
  'bai-136': [
    {
      type: 'fill', stars: 2, img: imgHcn,
      q: '1. Đúng ghi Đ, sai ghi S:\nTrong hình bên:',
      blanks: [
        ds('a) AB và DC là hai cạnh đối diện song song và bằng nhau.', true),
        ds('b) AB vuông góc với AD.', true),
        ds('c) Hình tứ giác ABCD có 4 góc vuông.', true),
        ds('d) Hình tứ giác ABCD có 4 cạnh bằng nhau.', false),
      ],
      hints: ['Hình chữ nhật có bốn góc vuông, hai cặp cạnh đối diện song song và bằng nhau.'],
      // 📐 Kéo dài: toạ độ theo bai136_q1_hcn.svg.
      geoPlay: { points: { A: [50, 50], B: [330, 50], C: [330, 200], D: [50, 200] }, segs: ['AB', 'BC', 'DC', 'AD'], fill: 'ABCD', pick: 'AB', answer: [{ blank: 1, pair: ['AB', 'AD'], rel: 'perp' }] },
    },
    {
      type: 'fill', stars: 2, img: imgPqrs,
      q: '2. Đúng ghi Đ, sai ghi S:\nTrong hình thoi PQRS (xem hình bên):',
      blanks: [
        ds('a) PQ và SR không bằng nhau.', false),
        ds('b) PQ không song song với PS.', true),
        ds('c) Các cặp cạnh đối diện song song.', true),
        ds('d) Bốn cạnh đều bằng nhau.', true),
      ],
      hints: ['Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau. PQ và PS là hai cạnh kề nhau.'],
      // 📐 Kéo dài: toạ độ theo bai136_q2_thoi.svg.
      geoPlay: { points: { P: [40, 130], Q: [200, 30], R: [360, 130], S: [200, 230] }, segs: ['PQ', 'QR', 'SR', 'PS'], fill: 'PQRS', pick: 'PQ', answer: [{ blank: 1, pair: ['PQ', 'PS'], rel: 'notpar' }, { blank: 2, allPar: [['PQ', 'SR'], ['PS', 'QR']] }] },
    },
    {
      type: 'choice', stars: 3, img: imgDienTich,
      q: '3. Khoanh vào chữ đặt trước câu trả lời đúng:\nTrong các hình trên, hình có diện tích lớn nhất là:',
      options: ['A. Hình vuông', 'B. Hình chữ nhật', 'C. Hình bình hành', 'D. Hình thoi'],
      answer: 0,
      hints: ['Tính diện tích từng hình: hình vuông 5 × 5, hình chữ nhật 6 × 4, hình bình hành 5 × 4, hình thoi 6 × 4 : 2.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Chu vi của hình chữ nhật là 56m, chiều dài là 18m. Tính diện tích hình chữ nhật.',
      blanks: [
        { label: 'Nửa chu vi hình chữ nhật là: ... m', answer: '28' },
        { label: 'Chiều rộng hình chữ nhật là: ... m', answer: '10' },
        { label: 'Diện tích hình chữ nhật là: ... m²', answer: '180' },
      ],
      hints: ['Nửa chu vi = chiều dài + chiều rộng.'],
    },
  ],
};
