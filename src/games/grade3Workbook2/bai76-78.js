/**
 * Vở bài tập Toán 3 — Tập hai: Bài 76–78 (sách trang 107–118).
 * Ôn tập các số trong phạm vi 10 000, 100 000; ôn tập phép cộng, phép trừ;
 * ôn tập phép nhân, phép chia trong phạm vi 100 000.
 */
import { dsValidate, opsValidate, stripVN, mau } from '../grade3Workbook.js';
import imgB77Map from '../../assets/grade3-workbook-2/bai77_t2_q3_map.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// Numbers >= 1000 are printed "26 030" in the book: the child may type
// "26030", "26 030" or "26.030". A unit typed after the number ("30 000 đồng")
// is ignored.
const digitsOnly = (v) => String(v).replace(/[\s ]+/g, '').replace(/(\d)\.(?=\d{3}(\D|$))/g, '$1');
const numOk = (v, n) => digitsOnly(v).replace(/[^\d]+$/, '') === String(n);
const numV = (n) => (v) => numOk(v, n);
// Several numbers, one per "..." of the row, in the book's order.
const numListV = (ns) => (v) => {
  const got = String(v).split(',');
  return got.length === ns.length && got.every((g, i) => numOk(g, ns[i]));
};

// One number blank / a row with several number slots.
const N = (label, n) => ({ label, answer: String(n), validate: numV(n) });
const NL = (label, ...ns) => ({ label, answer: ns.join(','), validate: numListV(ns) });

// A step of "Tính giá trị của biểu thức": the expression left after the first
// operation ("9 460 − 700"). Spacing, a thousands dot, a leading "=" and the
// typed forms of each operator (- for −, x or * for ×, / or ÷ for :) don't matter.
const normExpr = (s) => digitsOnly(s).replace(/^=/, '')
  .replace(/[−–—]/g, '-').replace(/[xX*]/g, '×').replace(/[÷/]/g, ':');
const exprV = (...exprs) => {
  const targets = new Set(exprs.map(normExpr));
  return (v) => targets.has(normExpr(v));
};
// "a) 6 837 + 2 623 − 700 = ...  / = ..." — two answer lines.
const steps = (label, step, value, ...alts) => [
  { label: `${label} = ...`, answer: step, validate: exprV(step, ...alts) },
  { label: '= ...', answer: String(value), validate: numV(value) },
];

// "Viết số thành tổng": 9 136 = 9 000 + 100 + 30 + 6 (a "+ 0" term for a zero
// digit may be written or left out, terms in any order).
function placeSumV(n) {
  const s = String(n);
  const terms = [...s].map((d, i) => d + '0'.repeat(s.length - 1 - i)).filter(t => !/^0+$/.test(t));
  const key = (arr) => [...arr].sort().join('+');
  const target = key(terms);
  return (v) => key(normExpr(v).split('+').filter(t => t && !/^0+$/.test(t))) === target;
}
const placeSum = (label, n) => {
  const s = String(n);
  const terms = [...s].map((d, i) => d + '0'.repeat(s.length - 1 - i)).filter(t => !/^0+$/.test(t));
  return { label: `${label} = ...`, answer: terms.join(' + '), validate: placeSumV(n) };
};

// A name chosen from the book's list, with or without the leading word the
// sentence already prints ("Cá", "công ty", "Sông"), accents optional.
const nameKey = (s, drop) => {
  let t = stripVN(s).trim().replace(/\s+/g, ' ');
  drop.forEach(w => { t = t.replace(new RegExp(`^${w}\\s+`), ''); });
  return t.replace(/[^a-z0-9]/g, '');
};
const namesV = (names, drop) => (v) => {
  const got = stripVN(v).split(/\s*(?:,|;|→|>|\bva\b)\s*/).map(x => nameKey(x, drop)).filter(Boolean);
  return got.length === names.length && got.every((g, i) => g === nameKey(names[i], drop));
};
const FISH = ['mập voi', 'nhám phơi nắng', 'mập hổ', 'đuối khổng lồ'];
const fishDrop = ['ca'];
const COMPANIES = ['Sông Hồng', 'Sông Đà', 'Sông Thao', 'Sông Cửu Long'];
const coDrop = ['cong ty', 'song'];

// "Viết chữ số thích hợp vào ô trống" printed as a column calculation: each row
// is a string, "?" = one box, right-aligned under each other with the sign on
// the left and the result line under the second row. One box per "?", read row
// by row, left to right.
const CELL = 'display:flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;font-size:1.3rem';
function colPuzzle(label, op, rows, digits) {
  const w = Math.max(...rows.map(r => r.length));
  const cells = [];
  rows.forEach((r, ri) => {
    const pad = w - r.length;
    const line = ri === rows.length - 1 ? ';border-top:2.5px solid #231F20' : '';
    if (ri === rows.length - 1) cells.push(`<span style="grid-column:1;grid-row:${ri + 1}${line}"></span>`);
    [...r].forEach((ch, ci) => {
      cells.push(`<span style="${CELL};grid-column:${pad + ci + 2};grid-row:${ri + 1}${line}">${ch === '?' ? '...' : ch}</span>`);
    });
    if (line) for (let c = 0; c < pad; c++) cells.push(`<span style="grid-column:${c + 2};grid-row:${ri + 1}${line}"></span>`);
  });
  cells.push(`<span style="grid-column:1;grid-row:1 / span 2;align-self:center;font-size:1.3rem;padding-right:0.2rem">${op}</span>`);
  const grid = `<span style="display:inline-grid;grid-template-columns:auto repeat(${w}, 2.75rem);row-gap:0.2rem;column-gap:0;line-height:1;margin:0.2rem 0 0.4rem 0.6rem">${cells.join('')}</span>`;
  return { label: `${label}${grid}`, boxes: true, answer: digits.join(','), validate: numListV(digits) };
}

// A "Khoanh vào chữ" row of four lettered choices.
const pick = (left, options, answer) => ({ left, options, answer });

// "Đặt tính rồi tính" for a division: quotient and remainder (0 when exact).
const divRow = (a, b, label) => {
  const q = Math.floor(a / b), r = a % b;
  return { label: `${label} = ... (dư ...)`, answer: `${q},${r}`, validate: numListV([q, r]) };
};

// Every number >= 1000 in the displayed text keeps its thousands group on one
// line (non-breaking space), like the printed page.
const NB = (s) => (typeof s === 'string' ? s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ') : s);
function nbsp(units) {
  units.forEach(u => u.questions.forEach(q => {
    q.q = NB(q.q);
    (q.blanks || []).forEach(b => { b.label = NB(b.label); });
    (q.rows || []).forEach(r => {
      if (Array.isArray(r)) return;
      r.left = NB(r.left); r.right = NB(r.right);
      if (r.options) r.options = r.options.map(NB);
    });
    [q.left, q.right].forEach(col => (col || []).forEach(it => { it.text = NB(it.text); }));
  }));
  return units;
}

export const BAI_76_78 = nbsp([
  // ── BÀI 76 (trang 107–109) ───────────────────────────────────────────────
  {
    id: 'bai-76', number: 76, title: 'Ôn tập các số trong phạm vi 10 000, 100 000',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối mỗi số với cách đọc của số đó.',
        left: [
          { id: 'n26030', text: '26 030' }, { id: 'n88544', text: '88 544' }, { id: 'n9375', text: '9 375' },
          { id: 'n90621', text: '90 621' }, { id: 'n64109', text: '64 109' },
        ],
        right: [
          { id: 'r9375', text: 'Chín nghìn ba trăm bảy mươi lăm.' },
          { id: 'r26030', text: 'Hai mươi sáu nghìn không trăm ba mươi.' },
          { id: 'r64109', text: 'Sáu mươi tư nghìn một trăm linh chín.' },
          { id: 'r88544', text: 'Tám mươi tám nghìn năm trăm bốn mươi tư.' },
          { id: 'r90621', text: 'Chín mươi nghìn sáu trăm hai mươi mốt.' },
        ],
        pairs: [['n26030', 'r26030'], ['n88544', 'r88544'], ['n9375', 'r9375'], ['n90621', 'r90621'], ['n64109', 'r64109']],
        hints: ['Đọc số theo từng lớp: số nghìn trước, rồi đến trăm, chục, đơn vị. Ví dụ 26 030: hai mươi sáu nghìn không trăm ba mươi.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          NL('a) 5 897 ; 5 898 ; 5 899 ; ... ; 5 901 ; ... ; ... ; 5 904.', 5900, 5902, 5903),
          NL('b) 26 650 ; 26 660 ; ... ; 26 680 ; ... ; 26 700 ; ... .', 26670, 26690, 26710),
          NL('c) 99 400 ; ... ; 99 600 ; 99 700 ; 99 800 ; ... ; ... .', 99500, 99900, 100000),
        ],
        hints: ['a) Hai số liền nhau hơn kém nhau 1. b) Hơn kém nhau 10. c) Hơn kém nhau 100.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '3. >; <; = ?',
        rows: [
          { left: 'a) 8 578', right: '8 587', answer: '<' },
          { left: '9 450', right: '9 399', answer: '>' },
          { left: 'b) 10 000', right: '9 999', answer: '>' },
          { left: '30 870', right: '31 000', answer: '<' },
          { left: 'c) 85 605', right: '85 610', answer: '<' },
          { left: '70 376', right: '70 376', answer: '=' },
        ],
        hints: ['Số nào có nhiều chữ số hơn thì lớn hơn. Nếu cùng số chữ số, so sánh từng hàng từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nCho biết: Cá mập voi cân nặng 21 000 kg;\nCá nhám phơi nắng cân nặng 2 200 kg;\nCá mập hổ cân nặng 3 100 kg;\nCá đuối khổng lồ cân nặng 2 900 kg.',
        blanks: [
          { label: 'a) Trong bốn loại cá trên: Cá ... nặng nhất.', answer: 'mập voi', validate: namesV(['mập voi'], fishDrop), tiles: FISH, tileOne: true },
          { label: 'Cá ... nhẹ nhất.', answer: 'nhám phơi nắng', validate: namesV(['nhám phơi nắng'], fishDrop), tiles: FISH, tileOne: true },
          {
            label: 'b) Tên các loại cá viết theo thứ tự cân nặng từ nhẹ nhất đến nặng nhất là: ...',
            answer: 'nhám phơi nắng, đuối khổng lồ, mập hổ, mập voi',
            validate: namesV(['nhám phơi nắng', 'đuối khổng lồ', 'mập hổ', 'mập voi'], fishDrop),
            tiles: FISH,
          },
        ],
        hints: ['So sánh bốn số 21 000, 2 200, 3 100, 2 900. Số có năm chữ số lớn nhất; ba số còn lại so sánh hàng trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết số thích hợp vào chỗ chấm.\nTuấn hỏi Tú: Đường từ nhà bạn đến bưu điện huyện dài bao nhiêu mét?\nTú hóm hỉnh nói: Bạn tính nhé! Đường từ nhà mình đến bưu điện huyện chỉ tính đơn vị là mét thôi! Đó là số tròn chục bé nhất có năm chữ số khác nhau.',
        blanks: [N('Đường từ nhà Tú đến bưu điện huyện dài ... m.', 12340)],
        hints: ['Số tròn chục có chữ số hàng đơn vị là 0. Các chữ số phải khác nhau, nên chữ số 0 chỉ dùng một lần.', 'Chữ số hàng chục nghìn bé nhất là 1, các hàng tiếp theo chọn chữ số bé nhất chưa dùng.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nDưới đây là số khẩu trang bốn công ty may được trong một ngày.\nCông ty Sông Hồng: 39 000; Công ty Sông Đà: 43 000;\nCông ty Sông Thao: 51 000; Công ty Sông Cửu Long: 29 000.',
        blanks: [
          {
            label: 'a) Trong một ngày, công ty ... may được ít khẩu trang nhất, công ty ... may được nhiều khẩu trang nhất.',
            answer: 'Sông Cửu Long, Sông Thao', validate: namesV(['Sông Cửu Long', 'Sông Thao'], coDrop), tiles: COMPANIES,
          },
          {
            label: 'b) Tên các công ty viết theo thứ tự số khẩu trang may được trong một ngày từ nhiều nhất đến ít nhất là: ...',
            answer: 'Sông Thao, Sông Đà, Sông Hồng, Sông Cửu Long',
            validate: namesV(['Sông Thao', 'Sông Đà', 'Sông Hồng', 'Sông Cửu Long'], coDrop),
            tiles: COMPANIES,
          },
        ],
        hints: ['So sánh bốn số 39 000, 43 000, 51 000, 29 000: xem chữ số hàng chục nghìn trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Viết số thành tổng (theo mẫu).\n${mau('12 307 = 10 000 + 2 000 + 300 + 7')}`,
        blanks: [placeSum('9 136', 9136), placeSum('21 058', 21058), placeSum('35 270', 35270), placeSum('50 493', 50493), placeSum('72 364', 72364)],
        hints: ['Tách số theo từng hàng: chục nghìn, nghìn, trăm, chục, đơn vị. Hàng nào có chữ số 0 thì bỏ qua, như mẫu bỏ hàng chục.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối mỗi tổng với số thích hợp.',
        left: [
          { id: 's43260', text: '40 000 + 3 000 + 200 + 60' }, { id: 's64302', text: '60 000 + 4 000 + 300 + 2' },
          { id: 's9725', text: '9 000 + 700 + 20 + 5' }, { id: 's50528', text: '50 000 + 500 + 20 + 8' },
        ],
        right: [
          { id: 'v9725', text: '9 725' }, { id: 'v43260', text: '43 260' },
          { id: 'v50528', text: '50 528' }, { id: 'v64302', text: '64 302' },
        ],
        pairs: [['s43260', 'v43260'], ['s64302', 'v64302'], ['s9725', 'v9725'], ['s50528', 'v50528']],
        hints: ['Viết mỗi số hạng vào đúng hàng của nó: 40 000 là 4 chục nghìn, 3 000 là 3 nghìn…'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 7 000 + 400 + ... = 7 450', 50),
          N('b) 50 000 + 6 000 + 200 + ... = 56 207', 7),
          N('c) 8 000 + 300 + ... = 8 303', 3),
          N('d) 30 000 + 5 000 + ... + 90 = 35 190', 100),
        ],
        hints: ['Tách số ở vế phải thành tổng theo các hàng, rồi tìm hàng còn thiếu. Ví dụ 7 450 = 7 000 + 400 + 50.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          N('a) Số lớn nhất có năm chữ số khác nhau là ...', 98765),
          N('b) Số tròn chục lớn nhất có năm chữ số khác nhau là ...', 98760),
        ],
        hints: ['Chọn chữ số lớn nhất chưa dùng cho từng hàng, bắt đầu từ hàng chục nghìn.', 'Số tròn chục có chữ số hàng đơn vị là 0.'],
      },
    ],
  },

  // ── BÀI 77 (trang 110–113) ───────────────────────────────────────────────
  {
    id: 'bai-77', number: 77, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 100 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          N('725 + 6 548 = ...', 7273), N('14 683 − 7 629 = ...', 7054),
          N('53 846 + 24 738 = ...', 78584), N('68 748 − 9 562 = ...', 59186),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi cộng hoặc trừ từ phải sang trái. Nhớ số nhớ.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Tô màu xanh vào những đám mây ghi phép tính có kết quả lớn hơn 30 000, màu vàng vào những đám mây ghi phép tính có kết quả bé hơn 9 000.\nChọn màu cho mỗi đám mây.',
        rows: [
          pick('4 600 + 3 400', ['Xanh', 'Vàng', 'Không tô'], 'Vàng'),
          pick('13 436 − 5 000', ['Xanh', 'Vàng', 'Không tô'], 'Vàng'),
          pick('27 000 + 4 000', ['Xanh', 'Vàng', 'Không tô'], 'Xanh'),
          pick('54 700 − 24 500', ['Xanh', 'Vàng', 'Không tô'], 'Xanh'),
          pick('39 000 − 8 000', ['Xanh', 'Vàng', 'Không tô'], 'Xanh'),
        ],
        hints: ['Tính kết quả từng đám mây rồi so sánh với 30 000 và 9 000.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          ...steps('a) 6 837 + 2 623 − 700', '9460 − 700', 8760),
          ...steps('b) 8 575 + (36 156 − 24 156)', '8575 + 12000', 20575),
          ...steps('c) 25 800 + 12 750 + 3 200', '38550 + 3200', 41750, '25800 + 15950'),
        ],
        hints: ['Biểu thức chỉ có cộng, trừ thì tính từ trái sang phải. Có dấu ngoặc thì tính trong ngoặc trước.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Nam mua một đôi giày giá 54 000 đồng, mua một hộp bút giá 16 000 đồng. Nam đưa cho cô bán hàng 100 000 đồng. Hỏi cô bán hàng trả lại Nam bao nhiêu tiền?',
        blanks: [N('Số tiền cô bán hàng trả lại Nam (đồng)', 30000)],
        hints: ['Tính số tiền Nam phải trả: 54 000 + 16 000. Rồi lấy 100 000 trừ đi số tiền đó.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          colPuzzle('a)', '+', ['37?82', '254?9', '??79?'], [3, 0, 6, 2, 1]),
          colPuzzle('b)', '−', ['?9?72', '?6?5', '7283?'], [7, 4, 6, 3, 7]),
          colPuzzle('c)', '+', ['5?89?', '7?43', '?39?8'], [6, 5, 0, 6, 3]),
        ],
        hints: ['Làm từ hàng đơn vị sang trái. Nhớ số nhớ (phép cộng) hoặc số mượn (phép trừ) ở mỗi hàng.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          N('6 593 + 85 = ...', 6678), N('8 674 − 592 = ...', 8082),
          N('34 562 + 19 287 = ...', 53849), N('56 061 − 23 458 = ...', 32603),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          pick('a) Tổng của 8 593 và 6 345 là:', ['A. 14 838', 'B. 14 938', 'C. 14 937', 'D. 41 938'], 'B'),
          pick('b) Hiệu của 43 958 − 26 384 là:', ['A. 27 574', 'B. 17 674', 'C. 17 574', 'D. 17 564'], 'C'),
          pick('c) Giá trị của biểu thức 18 609 + 5 132 − 5 000 là:', ['A. 24 041', 'B. 18 741', 'C. 19 031', 'D. 19 041'], 'B'),
        ],
        hints: ['Đặt tính ra nháp rồi so với các đáp án. c) Tính từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB77Map,
        q: '3. Đ, S?',
        blanks: [
          { label: 'a) Đường đi từ cổng công viên đến sân khấu nhạc nước gần hơn đến rạp chiếu phim. ...', boxes: true, answer: 'S', validate: dsValidate(false) },
          { label: 'b) Đường đi từ cổng công viên đến sân khấu nhạc nước xa hơn đến rạp chiếu phim. ...', boxes: true, answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đường đến nhạc nước: 470 m + 240 m + 260 m. Đường đến rạp chiếu phim: 280 m + 530 m. So sánh hai kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Lễ kỉ niệm 100 năm ngày sinh Bác Hồ (Chủ tịch Hồ Chí Minh) được tổ chức vào năm 1990. Hỏi:',
        blanks: [
          N('a) Bác Hồ sinh năm nào?', 1890),
          N('b) Năm 1968 Bác Hồ bao nhiêu tuổi?', 78),
        ],
        hints: ['a) Năm sinh = 1990 − 100.', 'b) Số tuổi = 1968 − năm sinh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Một công ty thiết bị y tế, lần thứ nhất đã nhập về 24 900 chiếc khẩu trang, lần thứ hai nhập ít hơn lần thứ nhất 9 800 chiếc khẩu trang. Hỏi cả hai lần công ty đã nhập về bao nhiêu chiếc khẩu trang?',
        blanks: [N('Số khẩu trang cả hai lần (chiếc)', 40000)],
        hints: ['Tìm số khẩu trang lần thứ hai trước: 24 900 − 9 800. Rồi cộng với lần thứ nhất.'],
      },
    ],
  },

  // ── BÀI 78 (trang 114–118) ───────────────────────────────────────────────
  {
    id: 'bai-78', number: 78, title: 'Ôn tập phép nhân, phép chia trong phạm vi 100 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [
          N('814 × 7 = ...', 5698), N('7 215 × 6 = ...', 43290),
          divRow(8469, 9, '8 469 : 9'), divRow(38254, 5, '38 254 : 5'),
        ],
        hints: ['Phép nhân: nhân từ phải sang trái, nhớ sang hàng bên trái. Phép chia: chia từ trái sang phải.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [{ id: 'a1', text: '60 000 : 2' }, { id: 'a2', text: '7 000 × 5' }, { id: 'a3', text: '84 000 : 6' }],
        right: [{ id: 'b1', text: '5 000 × 7' }, { id: 'b2', text: '70 000 : 5' }, { id: 'b3', text: '15 000 × 2' }],
        pairs: [['a1', 'b3'], ['a2', 'b1'], ['a3', 'b2']],
        hints: ['Tính nhẩm theo nghìn: 60 nghìn : 2 = 30 nghìn; 7 nghìn × 5 = 35 nghìn…'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          ...steps('a) 4 235 : 7 × 8', '605 × 8', 4840),
          ...steps('b) 7 015 × (48 : 8)', '7015 × 6', 42090),
          ...steps('c) 7 209 × 4 : 9', '28836 : 9', 3204),
          ...steps('d) 30 168 : (2 × 3)', '30168 : 6', 5028),
        ],
        hints: ['Chỉ có nhân, chia thì tính từ trái sang phải. Có dấu ngoặc thì tính trong ngoặc trước.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Một trang trại nuôi 5 400 con gà, số con vịt trang trại nuôi gấp 3 lần số con gà. Hỏi trang trại đó nuôi tất cả bao nhiêu con gà và con vịt?',
        blanks: [N('Số con gà và con vịt (con)', 21600)],
        hints: ['Tìm số con vịt: 5 400 × 3. Rồi cộng với số con gà.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          colPuzzle('a)', '×', ['7?4', '7', '?99?'], [1, 4, 8]),
          colPuzzle('b)', '×', ['1?0?', '8', '??640'], [7, 5, 1, 3]),
        ],
        hints: ['Làm từ hàng đơn vị: a) 4 × 7 = 28, viết 8 nhớ 2.', 'b) Chữ số nào nhân 8 có tận cùng là 0 và nhớ 4 sang hàng chục?'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          pick('a) Tích của 1 316 và 5 là:', ['A. 6 508', 'B. 6 580', 'C. 6 550', 'D. 5 580'], 'B'),
          pick('b) Thương của 48 344 và 8 là:', ['A. 6 403', 'B. 643', 'C. 6 034', 'D. 6 043'], 'D'),
          pick('c) Giá trị của biểu thức 8 107 × (36 : 4) là:', ['A. 2 963', 'B. 72 903', 'C. 72 963', 'D. 27 963'], 'C'),
        ],
        hints: ['Đặt tính ra nháp. c) Tính trong ngoặc trước: 36 : 4 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [
          N('a) (4 000 + 5 000) × 6 = ...', 54000), N('b) 32 000 : 4 × 7 = ...', 56000),
          N('c) (55 000 − 7 000) : 6 = ...', 8000), N('d) 8 000 × (4 × 2) = ...', 64000),
        ],
        hints: ['Tính theo nghìn: a) 9 nghìn × 6 = 54 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          ...steps('a) 6 115 × 3 × 2', '18345 × 2', 36690, '6115 × 6'),
          ...steps('b) 8 340 + 7 286 + 1 560', '15626 + 1560', 17186, '9900 + 7286', '7286 + 9900'),
        ],
        hints: ['Tính từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Cô Bình mua 5 kg bột mì hết 80 000 đồng. Hỏi:',
        blanks: [
          N('a) Mỗi ki-lô-gam bột mì giá bao nhiêu tiền? (đồng)', 16000),
          N('b) Bác Hoà mua 6 kg bột mì như thế thì phải trả người bán hàng bao nhiêu tiền? (đồng)', 96000),
        ],
        hints: ['a) 80 000 : 5.', 'b) Lấy giá 1 kg nhân với 6.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Năm nay Mi 6 tuổi, mẹ hơn Mi 30 tuổi. Hỏi:',
        blanks: [
          N('a) Năm nay, tuổi mẹ gấp mấy lần tuổi Mi?', 6),
          N('b) Khi mẹ 45 tuổi thì Mi bao nhiêu tuổi?', 15),
        ],
        hints: ['a) Tuổi mẹ năm nay: 6 + 30. Rồi chia cho tuổi Mi.', 'b) Mẹ luôn hơn Mi 30 tuổi.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          pick('a) Phép tính nào dưới đây có kết quả lớn nhất?', ['A. 2 324 × 4', 'B. 1 405 × 7', 'C. 1 207 × 8'], 'B'),
          pick('b) Phép tính nào dưới đây có kết quả bé nhất?', ['A. 65 136 : 6', 'B. 94 050 : 9', 'C. 71 813 : 7'], 'C'),
        ],
        hints: ['Tính kết quả từng phép tính ra nháp rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Tính giá trị của biểu thức.',
        blanks: [
          ...steps('a) 7 108 × 9 − 25 367', '63972 − 25367', 38605),
          ...steps('b) 43 608 : 6 + 5 814', '7268 + 5814', 13082),
          ...steps('c) 967 + 8 105 × 5', '967 + 40525', 41492),
          ...steps('d) 13 941 − 52 104 : 8', '13941 − 6513', 7428),
        ],
        hints: ['Biểu thức có cộng, trừ và nhân, chia thì làm nhân, chia trước, cộng, trừ sau.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '3. Một cửa hàng xăng dầu có 12 280 <i>l</i> xăng, sau khi bán thì số lít xăng giảm đi 4 lần. Hỏi cửa hàng đó còn lại bao nhiêu lít xăng?',
        blanks: [N('Số lít xăng còn lại (<i>l</i>)', 3070)],
        hints: ['Giảm đi 4 lần thì lấy số lít xăng chia cho 4.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '4. Chú Sáu dự tính xây tường rào quanh một khu vườn hết 76 500 viên gạch. Chú Sáu đã mua 6 lần, mỗi lần 11 500 viên gạch. Hỏi theo dự tính, chú Sáu còn phải mua bao nhiêu viên gạch nữa?',
        blanks: [N('Số viên gạch còn phải mua (viên)', 7500)],
        hints: ['Tìm số gạch đã mua: 11 500 × 6. Rồi lấy 76 500 trừ đi số gạch đó.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. a) Viết dấu phép tính “×; :” thích hợp vào ô trống.\nb) Viết thêm dấu ngoặc để được biểu thức có giá trị bằng 2.',
        blanks: [
          { label: 'a) 9 ... 3 ... 5 = 15', boxes: true, answer: ':,×', validate: opsValidate([':', '×']), tiles: ['×', ':'] },
          { label: 'b) 16 : 4 × 2 &nbsp;→ ...', answer: '16 : (4 × 2)', validate: exprV('16 : (4 × 2)') },
        ],
        hints: ['a) Thử lần lượt: 9 : 3 × 5 và 9 × 3 : 5.', 'b) Muốn được 2 thì phải lấy 16 chia cho 8. Số 8 ở đâu ra?'],
      },
    ],
  },
]);
