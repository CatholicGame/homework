/**
 * Vở bài tập Toán 2 — Tập một: Bài 1–6 (sách trang 5–28).
 */
import {
  blank, soDoc, foldVN, stripVN, listValidate, setValidate, dsValidate, mau, sampleCell,
} from '../grade3Workbook.js';
import imgB1Row1 from '../../assets/grade2-workbook/bai1_t1_q1_row1.png';
import imgB1Row2 from '../../assets/grade2-workbook/bai1_t1_q1_row2.png';
import imgB1Row3 from '../../assets/grade2-workbook/bai1_t1_q1_row3.png';
import imgB1Row4 from '../../assets/grade2-workbook/bai1_t1_q1_row4.png';
import imgB1Cats from '../../assets/grade2-workbook/bai1_t1_q2_cats.png';
import imgB1Trains from '../../assets/grade2-workbook/bai1_t1_q4_trains.png';
import imgB1Robots from '../../assets/grade2-workbook/bai1_t2_q1_robots.png';
import imgB1Shoes from '../../assets/grade2-workbook/bai1_t2_q2_shoes.png';
import imgB1Seats from '../../assets/grade2-workbook/bai1_t3_q1_seats.png';
import imgB1Sticks from '../../assets/grade2-workbook/bai1_t3_q2_sticks.svg';
import imgB2Line10 from '../../assets/grade2-workbook/bai2_t1_q1_numberline.svg';
import imgB2Balloons from '../../assets/grade2-workbook/bai2_t1_q2_balloons.png';
import imgB2Line30 from '../../assets/grade2-workbook/bai2_t2_q1_numberline.svg';
import imgB2Train from '../../assets/grade2-workbook/bai2_t2_q3_train.png';
import imgB2Rabbits from '../../assets/grade2-workbook/bai2_t2_q5_rabbits.png';
import imgB3Shells from '../../assets/grade2-workbook/bai3_t1_q3_shells.png';
import imgB3Chains from '../../assets/grade2-workbook/bai3_t3_q2_chains.svg';
import imgB3Trains from '../../assets/grade2-workbook/bai3_t3_q3_trains.png';
import imgB3Shells2 from '../../assets/grade2-workbook/bai3_t3_q4_shells.png';
import imgB4Ducks from '../../assets/grade2-workbook/bai4_t1_q1_ducks.png';
import imgB4Pens from '../../assets/grade2-workbook/bai4_t2_q1_pens.png';
import imgB4Robots from '../../assets/grade2-workbook/bai4_t2_q2_robots.png';
import imgB4Boats from '../../assets/grade2-workbook/bai4_t2_q3_boats.png';
import imgB5Flow from '../../assets/grade2-workbook/bai5_t1_q3b_flowchart.svg';
import imgB5Calcs from '../../assets/grade2-workbook/bai5_t2_q1_calcs.svg';
import imgB5Puzzles from '../../assets/grade2-workbook/bai5_t2_q4_puzzles.svg';
import imgB5Clovers from '../../assets/grade2-workbook/bai5_t3_q5_clovers.png';
import imgB6Lines from '../../assets/grade2-workbook/bai6_t1_q1_numberlines.svg';
import imgB6Ribbon from '../../assets/grade2-workbook/bai6_t1_q4_ribbon.png';
import imgB6Puzzles from '../../assets/grade2-workbook/bai6_t2_q4_puzzles.svg';
import imgB6Triangle from '../../assets/grade2-workbook/bai6_t2_q5_triangle.svg';

// ── Local helpers ───────────────────────────────────────────────────────────

// "Đọc số" cell: the book writes 64 as "sáu mươi tư", 25 as "hai mươi lăm";
// "bốn"/"tư", "năm"/"lăm", "một"/"mốt" are all accepted.
const foldRead = (s) => foldVN(s).replace(/\btư\b/g, 'bốn');
function readValidate(n) {
  const target = foldRead(soDoc(n));
  return (value) => foldRead(value) === target;
}
const readCell = (n) => blank(soDoc(n), { validate: readValidate(n) });

// "Số gồm" cell ("8 chục và 2 đơn vị"): accents, spacing and the word "và" don't matter.
function gomValidate(tens, units) {
  const norm = (s) => stripVN(s).replace(/[^a-z0-9]/g, '').replace('va', '');
  const target = `${tens}chuc${units}donvi`;
  return (value) => norm(value) === target;
}

// "56 = ........": the tens-and-units sum, in either order ("50 + 6" or "6 + 50").
function tensSumValidate(n) {
  const t = Math.floor(n / 10) * 10, u = n % 10;
  const ok = new Set([`${t}+${u}`, `${u}+${t}`]);
  return (value) => ok.has(String(value).replace(/\s+/g, '').replace(/^\d+=/, ''));
}
const sumBlank = (n) => ({ label: `${n} = ...`, answer: `${Math.floor(n / 10) * 10} + ${n % 10}`, validate: tensSumValidate(n) });

// A line of several equations written in one blank ("51 + 14 = 65; 22 + 16 = 38"),
// in any order, separated by ";" or ","; the book's own sample may be copied too.
// For "+" the two addends may be swapped.
function eqSetValidate(op, eqs, sample) {
  const key = ([a, b, c]) => (op === '+' ? [a, b].sort((x, y) => x - y).join('+') : `${a}-${b}`) + `=${c}`;
  const target = eqs.map(key).sort().join('|');
  const sampleKey = sample ? key(sample) : null;
  return (value) => {
    const v = String(value).replace(/[−–—]/g, '-').replace(/\s+/g, '');
    const parts = v.split(/[;,]+/).filter(Boolean);
    const keys = [];
    for (const p of parts) {
      const m = p.match(op === '+' ? /^(\d+)\+(\d+)=(\d+)$/ : /^(\d+)-(\d+)=(\d+)$/);
      if (!m) return false;
      keys.push(key([+m[1], +m[2], +m[3]]));
    }
    return keys.filter(k => k !== sampleKey).sort().join('|') === target;
  };
}

// "Tính hiệu ..." / "Tổng của ... là: ......": the result alone ("60") or the whole
// calculation ("90 − 30 = 60") are both accepted.
function calcValidate(a, op, b, result) {
  const ok = new Set([String(result), `${a}${op}${b}=${result}`]);
  if (op === '+') ok.add(`${b}+${a}=${result}`);
  return (value) => ok.has(String(value).replace(/[−–—]/g, '-').replace(/\s+/g, ''));
}

// "Ghép ...... vào ......" rows (Bài 1 Tiết 3 Q4): the rows may be filled in any order,
// so each row accepts any correct (miếng bìa, ô trống) pair.
function pairAnyValidate(pairs) {
  const ok = new Set(pairs.map(p => p.join(',')));
  return (value) => ok.has(String(value).toUpperCase().replace(/\s+/g, ''));
}

// Number cards / circled numbers printed inline in the question, like the book.
const CARD = 'display:inline-flex;align-items:center;justify-content:center;width:2.3em;height:2.7em;margin:6px 10px 6px 0;border-radius:10px;border:2px solid #29A9E0;background:linear-gradient(160deg,#E4F5FD,#8ED6F5);font-weight:800;font-size:1.15em;color:#231F20;box-shadow:0 3px 0 #29A9E0';
const cards = (...nums) => `<span style="display:inline-flex;flex-wrap:wrap">${nums.map(n => `<span style="${CARD}">${n}</span>`).join('')}</span>`;
const CIRC = 'display:inline-flex;align-items:center;justify-content:center;min-width:1.7em;height:1.7em;padding:0 2px;border:2px solid #231F20;border-radius:999px;font-size:.9em;line-height:1;vertical-align:middle';
const circ = (n) => `<span style="${CIRC}">${n}</span>`;
const cellImg = (src) => `<img src="${src}" alt="" style="height:34px;width:auto;display:block">`;

// Bài 1 Tiết 3 Q4: the 1–100 board with four holes A–D and the loose pieces E, G, H, K.
const BD = 'border:1.5px solid #29A9E0;padding:0;text-align:center;font-size:.8em;font-weight:600;height:2em;min-width:2.1em';
function board100() {
  const holes = { 23: 'A', 27: 'B', 63: 'C', 67: 'D' };
  const covered = new Set([23, 24, 33, 34, 27, 28, 37, 38, 63, 64, 73, 74, 67, 68, 77, 78]);
  let rows = '';
  for (let r = 0; r < 10; r++) {
    let tr = '';
    for (let c = 1; c <= 10; c++) {
      const n = r * 10 + c;
      if (holes[n]) tr += `<td rowspan="2" colspan="2" style="${BD};font-size:1em;font-weight:700;background:#fff">${holes[n]}</td>`;
      else if (!covered.has(n)) tr += `<td style="${BD}">${n}</td>`;
    }
    rows += `<tr>${tr}</tr>`;
  }
  return `<table style="border-collapse:collapse;margin:8px 0;table-layout:fixed">${rows}</table>`;
}
const piece = (name, a) => `<span style="display:inline-flex;align-items:center;gap:4px;margin:0 12px 6px 0"><b>${name}</b><table style="border-collapse:collapse"><tr><td style="${BD}">${a}</td><td style="${BD}">${a + 1}</td></tr><tr><td style="${BD}">${a + 10}</td><td style="${BD}">${a + 11}</td></tr></table></span>`;
const pieces = () => `<span style="display:flex;flex-wrap:wrap">${piece('E', 63)}${piece('G', 27)}${piece('H', 23)}${piece('K', 67)}</span>`;

export const BAI_1_6 = [
  // ── BÀI 1 (trang 5–9) ─────────────────────────────────────────────────────
  {
    id: 'bai-1', number: 1, title: 'Ôn tập các số đến 100',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết (theo mẫu).',
        headers: ['', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [cellImg(imgB1Row1), 2, 5, 25, 'hai mươi lăm'] },
          [cellImg(imgB1Row2), blank(3), blank(4), blank(34), readCell(34)],
          [cellImg(imgB1Row3), blank(4), blank(0), blank(40), readCell(40)],
          [cellImg(imgB1Row4), blank(3), blank(1), blank(31), readCell(31)],
        ],
        hints: ['Mỗi tháp táo có 10 quả (1 chục). Đếm số tháp để biết số chục, đếm số quả lẻ để biết số đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB1Cats,
        q: '2. Viết số thích hợp vào con cá mà mèo câu được (theo mẫu).',
        blanks: [
          { label: 'Con cá ngoài cùng bên trái: ...', answer: '41' },
          { label: 'Con cá ở giữa: ...', answer: '32' },
          { label: 'Con cá ngoài cùng bên phải: ...', answer: '67' },
        ],
        hints: ['Lần theo sợi dây câu từ mỗi chú mèo đến con cá. Ví dụ: mèo "2 chục và 4 đơn vị" câu được cá số 24.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Viết vào ô trống (theo mẫu).',
        headers: ['Số gồm', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: ['6 chục và 4 đơn vị', 64, 'sáu mươi tư'] },
          ['5 chục và 5 đơn vị', blank(55), readCell(55)],
          [blank('8 chục và 2 đơn vị', { validate: gomValidate(8, 2) }), 82, readCell(82)],
          [blank('9 chục và 1 đơn vị', { validate: gomValidate(9, 1) }), blank(91), 'chín mươi mốt'],
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB1Trains,
        q: '4. a) Tô màu vàng vào các toa của đoàn tàu A ghi số bé hơn 60.\nb) Ở đoàn tàu B, tô màu đỏ vào toa ghi số lớn nhất, màu xanh vào toa ghi số bé nhất.\nc) Viết tiếp vào chỗ chấm.',
        blanks: [
          { label: 'a) Các toa tô màu vàng ghi số: ...', answer: '59, 47', validate: setValidate(['59', '47']) },
          { label: 'b) Toa tô màu đỏ ghi số ...; toa tô màu xanh ghi số ...', answer: '56,48', validate: listValidate(['56', '48']) },
          { label: 'c) Ở cả hai đoàn tàu, những số vừa bé hơn 60 vừa lớn hơn 50 là: ...', answer: '59, 56, 51, 53', validate: setValidate(['59', '56', '51', '53']) },
        ],
        hints: ['Tàu A: 65, 59, 47, 60. Tàu B: 56, 48, 51, 53.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB1Robots,
        q: `1. Số?\n${mau('67 = 60 + 7')}`,
        blanks: [
          { label: '54 = ... + ...', answer: '50,4', validate: listValidate(['50', '4']) },
          { label: '88 = ... + ...', answer: '80,8', validate: listValidate(['80', '8']) },
          { label: '36 = ... + ...', answer: '30,6', validate: listValidate(['30', '6']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB1Shoes,
        q: '2. Viết các số ghi trên mỗi chiếc giày theo thứ tự:',
        blanks: [
          { label: 'Từ bé đến lớn:', answer: '37, 39, 40, 43', validate: listValidate(['37', '39', '40', '43']) },
          { label: 'Từ lớn đến bé:', answer: '43, 40, 39, 37', validate: listValidate(['43', '40', '39', '37']) },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Số?',
        headers: ['Số', 'Số chục', 'Số đơn vị'],
        rows: [
          { sample: true, cells: [47, 4, 7] },
          [62, blank(6), blank(2)],
          [77, blank(7), blank(7)],
          [80, blank(8), blank(0)],
          [89, blank(8), blank(9)],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `4. Viết tất cả các số có hai chữ số lập được từ ba thẻ bên.\n${cards(2, 5, 8)}`,
        blanks: [{ label: 'Các số đó là:', answer: '25, 28, 52, 58, 82, 85', validate: setValidate(['25', '28', '52', '58', '82', '85']) }],
        hints: ['Chọn chữ số hàng chục trước (2, 5 hoặc 8), rồi chọn chữ số hàng đơn vị từ hai thẻ còn lại.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB1Seats,
        q: '1. Viết số thích hợp vào chỗ chấm.\nDưới đây là sơ đồ ghế của một phòng họp, mỗi hình người chỉ một ghế.',
        blanks: [
          { label: '– Em ước lượng: Khoảng ... chục ghế.', answer: '4' },
          { label: '– Em đếm được: ... ghế.', answer: '42' },
        ],
        hints: ['Hàng ghế trong khung nét đứt có 10 ghế (1 chục). Có khoảng bao nhiêu hàng như vậy?'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB1Sticks,
        q: '2. Viết số thích hợp vào chỗ chấm.\nHình vẽ bên gồm các hình vuông và hình tam giác được xếp bởi các que tính.',
        blanks: [
          { label: '– Em ước lượng: Khoảng ... chục que tính.', answer: '6' },
          { label: '– Em đếm được: ... que tính.', answer: '59' },
        ],
        hints: ['Trong vòng nét đứt có 10 que tính. Mỗi hình tam giác có 3 que, mỗi hình vuông có 4 que.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l63', text: 'Số 63 gồm 6 chục và 3 đơn vị' },
          { id: 'l49', text: 'Số 49 gồm 4 chục và 9 đơn vị' },
          { id: 'l55', text: 'Số 55 gồm 5 chục và 5 đơn vị' },
          { id: 'l81', text: 'Số 81 gồm 8 chục và 1 đơn vị' },
        ],
        right: [
          { id: 'r55', text: '55 = 50 + 5' }, { id: 'r81', text: '81 = 80 + 1' },
          { id: 'r63', text: '63 = 60 + 3' }, { id: 'r49', text: '49 = 40 + 9' },
        ],
        pairs: [['l63', 'r63'], ['l49', 'r49'], ['l55', 'r55'], ['l81', 'r81']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `4. a) Viết tiếp vào chỗ chấm (theo mẫu).\nViệt đã ghép mỗi miếng bìa (E, G, H, K) vào một ô trống (A, B, C, D) để được bảng các số từ 1 đến 100.\n${pieces()}${board100()}Việt ghép như sau:\n– Ghép E vào C.`,
        blanks: [
          { label: '– Ghép ... vào ...', answer: 'H,A', validate: pairAnyValidate([['H', 'A'], ['G', 'B'], ['K', 'D']]) },
          { label: '– Ghép ... vào ...', answer: 'G,B', validate: pairAnyValidate([['H', 'A'], ['G', 'B'], ['K', 'D']]) },
          { label: '– Ghép ... vào ...', answer: 'K,D', validate: pairAnyValidate([['H', 'A'], ['G', 'B'], ['K', 'D']]) },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>– Trong các số ở miếng bìa E, số bé nhất là ...', answer: '63' },
          { label: '– Trong các số ở miếng bìa G, số bé nhất là ...', answer: '27' },
          { label: '– Trong các số ở miếng bìa H, số bé nhất là ...', answer: '23' },
          { label: '– Trong các số ở miếng bìa K, số bé nhất là ...', answer: '67' },
        ],
        hints: ['Ô trống A nằm sau số 22, nên miếng bìa ghép vào A phải bắt đầu bằng 23.'],
      },
    ],
  },

  // ── BÀI 2 (trang 10–12) ───────────────────────────────────────────────────
  {
    id: 'bai-2', number: 2, title: 'Tia số. Số liền trước, số liền sau',
    questions: [
      {
        type: 'table', section: 'Tiết 1', img: imgB2Line10,
        q: '1. a) Số?\nb) Viết tiếp vào chỗ chấm cho thích hợp.',
        rows: [[0, 1, blank(2), 3, blank(4), blank(5), blank(6), blank(7), 8, blank(9), 10]],
        blanks: [{ label: 'b) Quan sát tia số ở câu a, các số lớn hơn 3 và bé hơn 10 là: ...', answer: '4, 5, 6, 7, 8, 9', validate: setValidate(['4', '5', '6', '7', '8', '9']) }],
        hints: ['Trên tia số, mỗi vạch liền sau lớn hơn vạch liền trước 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB2Balloons,
        q: '2. Nối (theo mẫu).\nMẫu: quả bóng 10 + 2 nối với số 12 trên tia số. Viết số mà mỗi quả bóng được nối tới.',
        blanks: [
          { label: 'Quả bóng 5 nối với số ...', answer: '5' },
          { label: 'Quả bóng 8 nối với số ...', answer: '8' },
          { label: 'Quả bóng 10 + 1 nối với số ...', answer: '11' },
          { label: 'Quả bóng 1 nối với số ...', answer: '1' },
          { label: 'Quả bóng 10 + 7 nối với số ...', answer: '17' },
          { label: 'Quả bóng 10 + 4 nối với số ...', answer: '14' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. a) Đ, S?\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) • Số liền trước của 18 là 17.', answer: 'Đ', validate: dsValidate(true) },
          { label: '• Số liền sau của 17 là 18.', answer: 'Đ', validate: dsValidate(true) },
          { label: '• Số liền trước của 0 là 1.', answer: 'S', validate: dsValidate(false) },
          { label: '• Số liền sau của 0 là 1.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) 3 < ... < 5', answer: '4' },
        ],
        hints: ['Số liền trước bé hơn số đã cho 1 đơn vị; số liền sau lớn hơn 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB2Line30,
        q: '1. Quan sát tia số dưới đây rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Các số lớn hơn 36 và bé hơn 41 là: ...', answer: '37, 38, 39, 40', validate: setValidate(['37', '38', '39', '40']) },
          { label: 'b) Các số có số chục bằng 3 là: ...', answer: '30, 31, 32, 33, 34, 35, 36, 37, 38, 39', validate: setValidate(['30', '31', '32', '33', '34', '35', '36', '37', '38', '39']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Viết tất cả các số có hai chữ số lập được từ ba thẻ số bên.\n${cards(5, 0, 2)}`,
        blanks: [{ label: 'Các số đó là:', answer: '20, 25, 50, 52', validate: setValidate(['20', '25', '50', '52']) }],
        hints: ['Chữ số 0 không đứng ở hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB2Train,
        q: '3. Số?',
        blanks: [
          { label: `a) Toa liền sau toa ${circ(48)} là toa ... .`, answer: '49' },
          { label: `Toa liền trước toa ${circ(53)} là toa ... .`, answer: '52' },
          { label: `b) Toa liền trước toa ${circ(50)} là toa ... .`, answer: '49' },
          { label: `Toa liền sau toa ${circ(50)} là toa ... .`, answer: '51' },
          { label: `c) Ở giữa toa ${circ(48)} và toa ${circ(50)} là toa ... .`, answer: '49' },
          { label: `Ở giữa toa ${circ(49)} và toa ${circ(52)} là toa ... và toa ... .`, answer: '50,51', validate: listValidate(['50', '51']) },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '4. Số?',
        headers: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
        rows: [
          { sample: true, cells: [44, 45, 46] },
          [blank(47), 48, blank(49)],
          [blank(50), 51, blank(52)],
          [blank(53), 54, blank(55)],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB2Rabbits,
        q: '5. Viết số thích hợp vào chỗ chấm.\nCác chú thỏ A, B, C, D, E đang chuẩn bị chạy thi. Các làn chạy được đánh số lần lượt từ 4 đến 8.',
        blanks: [
          { label: '– Thỏ C chạy ở làn số ...', answer: '6' },
          { label: '– Thỏ D chạy ở làn số ...', answer: '7' },
        ],
        hints: ['Thỏ A chạy ở làn số 4, thỏ B ở làn liền sau.'],
      },
    ],
  },

  // ── BÀI 3 (trang 13–17) ───────────────────────────────────────────────────
  {
    id: 'bai-3', number: 3, title: 'Các thành phần của phép cộng, phép trừ',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Số hạng', 32, 40, 25, 80],
          ['Số hạng', 4, 30, 61, 7],
          ['Tổng', sampleCell(36), blank(70), blank(86), blank(87)],
        ],
        hints: ['Tổng = Số hạng + Số hạng.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Tính tổng rồi nối với kết quả tương ứng (theo mẫu).',
        left: [
          { id: 'l1', text: 'Tổng của 40 và 30' }, { id: 'l2', text: 'Tổng của 46 và 13' },
          { id: 'l3', text: 'Tổng của 24 và 11' }, { id: 'l4', text: 'Tổng của 50 và 37' },
        ],
        right: [{ id: 'r59', text: '59' }, { id: 'r70', text: '70' }, { id: 'r87', text: '87' }, { id: 'r35', text: '35' }],
        pairs: [['l1', 'r70'], ['l2', 'r59'], ['l3', 'r35'], ['l4', 'r87']],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB3Shells,
        q: '3. Viết tiếp vào chỗ chấm (theo mẫu).\nTừ các số hạng và tổng, lập được các phép cộng thích hợp là:',
        blanks: [{ label: '33 + 20 = 53; ...', answer: '51 + 14 = 65; 22 + 16 = 38', validate: eqSetValidate('+', [[51, 14, 65], [22, 16, 38]], [33, 20, 53]) }],
        hints: ['Lấy một số ở nhóm Số hạng thứ nhất cộng với một số ở nhóm Số hạng thứ hai, xem có bằng một số ở nhóm Tổng không. Viết các phép cộng cách nhau bởi dấu ";".'],
      },
      {
        type: 'choice', section: 'Tiết 1', multi: true,
        q: '4. Tô màu hai thẻ ghi hai số có tổng bằng 34.\nChọn hai thẻ cần tô màu.',
        options: ['14', '24', '10'],
        answer: [1, 2],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        headers: ['Phép trừ', '40 − 10 = 30', '76 − 25 = 51', '64 − 32 = 32'],
        rows: [
          ['Số bị trừ', sampleCell(40), blank(76), blank(64)],
          ['Số trừ', sampleCell(10), blank(25), blank(32)],
          ['Hiệu', sampleCell(30), blank(51), blank(32)],
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          ['Số bị trừ', 70, 36, 49, 77],
          ['Số trừ', 20, 11, 32, 55],
          ['Hiệu', sampleCell(50), blank(25), blank(17), blank(22)],
        ],
        hints: ['Hiệu = Số bị trừ − Số trừ.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Số bị trừ: 60, số trừ: 40' }, { id: 'l2', text: 'Số bị trừ: 73, số trừ: 21' },
          { id: 'l3', text: 'Số bị trừ: 47, số trừ: 37' }, { id: 'l4', text: 'Số bị trừ: 58, số trừ: 16' },
        ],
        right: [{ id: 'r10', text: 'Hiệu là 10' }, { id: 'r20', text: 'Hiệu là 20' }, { id: 'r42', text: 'Hiệu là 42' }, { id: 'r52', text: 'Hiệu là 52' }],
        pairs: [['l1', 'r20'], ['l2', 'r52'], ['l3', 'r10'], ['l4', 'r42']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nCó 16 con chim đậu trên cành, sau đó có 5 con bay đi. Hỏi trên cành còn lại bao nhiêu con chim?',
        blanks: [
          { label: '... − ... = ...', answer: '16,5,11', validate: listValidate(['16', '5', '11']) },
          { label: 'Trên cành còn lại ... con chim.', answer: '11' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `1. a) Viết số thích hợp vào chỗ chấm (theo mẫu).\n${mau('45 = 40 + 5')}`,
        blanks: [
          { label: '76 = ... + 6', answer: '70' },
          { label: '81 = ... + ...', answer: '80,1', validate: listValidate(['80', '1']) },
          { label: '... = 50 + 3', answer: '53' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '1. b) Nối (theo mẫu).',
        left: [{ id: 'l42', text: '42' }, { id: 'l51', text: '51' }, { id: 'l47', text: '47' }, { id: 'l63', text: '63' }, { id: 'l35', text: '35' }],
        right: [{ id: 'r42', text: '40 + 2' }, { id: 'r35', text: '30 + 5' }, { id: 'r63', text: '60 + 3' }, { id: 'r47', text: '40 + 7' }, { id: 'r51', text: '50 + 1' }],
        pairs: [['l42', 'r42'], ['l51', 'r51'], ['l47', 'r47'], ['l63', 'r63'], ['l35', 'r35']],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB3Chains,
        q: '2. a) Quan sát ba dây ở trên rồi tô màu đỏ vào các hình tròn, màu vàng vào các hình vuông, màu xanh vào các hình tam giác.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '• Tổng số các hình có ở dây 2 và dây 3 là:<br>... + ... = ... (hình)', answer: '9,10,19', validate: listValidate(['9', '10', '19']) },
          { label: '• Hiệu số các hình màu đỏ và các hình màu xanh ở cả ba dây là:<br>... − ... = ... (hình)', answer: '10,7,3', validate: listValidate(['10', '7', '3']) },
        ],
        hints: ['Dây 2 có 9 hình, dây 3 có 10 hình.', 'Hình màu đỏ là hình tròn, hình màu xanh là hình tam giác — đếm ở cả ba dây.'],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB3Chains,
        q: '2. c) Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong cả ba dây, hình nào có ít nhất?',
        options: ['Hình tròn', 'Hình vuông', 'Hình tam giác'],
        answer: 2,
        hints: ['Cả ba dây có 10 hình tròn, 10 hình vuông và 7 hình tam giác.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB3Trains,
        q: '3. Trên mỗi toa tàu ghi một số.\na) Đổi chỗ hai toa của đoàn tàu B để được các số xếp theo thứ tự từ bé đến lớn bằng cách vẽ mũi tên (theo mẫu).\nb) Tính hiệu của số lớn nhất ở đoàn tàu A và số bé nhất ở đoàn tàu B.',
        blanks: [
          { label: 'a) Đổi chỗ toa ... và toa ... .', answer: '67,30', validate: setValidate(['67', '30']) },
          { label: 'b)', answer: '90 − 30 = 60', validate: calcValidate(90, '-', 30, 60) },
        ],
        hints: ['Ở đoàn tàu A, đổi chỗ toa 80 và toa 30 thì được 30, 50, 80, 90.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB3Shells2,
        q: '4. Viết tiếp vào chỗ chấm (theo mẫu).\nTừ số bị trừ, số trừ và hiệu, lập được các phép trừ thích hợp là:',
        blanks: [{ label: '55 − 2 = 53; ...', answer: '66 − 30 = 36; 54 − 34 = 20', validate: eqSetValidate('-', [[66, 30, 36], [54, 34, 20]], [55, 2, 53]) }],
        hints: ['Lấy một số bị trừ trừ đi một số trừ, xem có bằng một số ở nhóm Hiệu không. Viết các phép trừ cách nhau bởi dấu ";".'],
      },
    ],
  },

  // ── BÀI 4 (trang 18–21) ───────────────────────────────────────────────────
  {
    id: 'bai-4', number: 4, title: 'Hơn, kém nhau bao nhiêu',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB4Ducks,
        q: '1. Viết số thích hợp vào chỗ chấm.\nSố vịt ở trên bờ hơn số vịt ở dưới ao bao nhiêu con?',
        wordProblem: true, subQuestions: false,
        blanks: [
          { label: '<i>Bài giải</i><br>Số vịt ở trên bờ hơn số vịt ở dưới ao là:<br>... − ... = ... (con)', answer: '8,5,3', validate: listValidate(['8', '5', '3']) },
          { label: '<i>Đáp số:</i> ... con vịt.', answer: '3' },
        ],
        hints: ['Đếm số vịt trên bờ và số vịt dưới ao, rồi lấy số lớn trừ số bé.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.\nCây bưởi có 14 quả. Rô-bốt đã hái 4 quả. Hỏi trên cây còn lại bao nhiêu quả bưởi?',
        wordProblem: true, subQuestions: false,
        blanks: [
          { label: '<i>Bài giải</i><br>Số bưởi còn lại trên cây là:<br>... − ... = ... (quả)', answer: '14,4,10', validate: listValidate(['14', '4', '10']) },
          { label: '<i>Đáp số:</i> ... quả bưởi.', answer: '10' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.\nRùa nâu 16 tuổi, rùa vàng 12 tuổi, rùa xám 10 tuổi.\na) Rùa vàng hơn rùa xám mấy tuổi?\nb) Rùa vàng kém rùa nâu mấy tuổi?',
        wordProblem: true,
        blanks: [
          { label: 'a) <i>Bài giải</i><br>Rùa vàng hơn rùa xám số tuổi là:<br>... − ... = ... (tuổi)', answer: '12,10,2', validate: listValidate(['12', '10', '2']) },
          { label: '<i>Đáp số:</i> ... tuổi.', answer: '2' },
          { label: 'b) <i>Bài giải</i><br>Rùa vàng kém rùa nâu số tuổi là:<br>... − ... = ... (tuổi)', answer: '16,12,4', validate: listValidate(['16', '12', '4']) },
          { label: '<i>Đáp số:</i> ... tuổi.', answer: '4' },
        ],
        hints: ['Muốn biết hơn (kém) nhau bao nhiêu, lấy số lớn trừ số bé.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 35 bông hoa hồng và 20 bông hoa cúc. Hỏi hoa hồng hơn hoa cúc bao nhiêu bông?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa hồng nhiều hơn hoa cúc', answer: '15' }],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB4Pens,
        q: '1. a) Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: '– Bút nào dài nhất?', options: ['A. Bút mực', 'B. Bút sáp', 'C. Bút chì'], answer: 'A' },
          { left: '– Bút nào ngắn nhất?', options: ['A. Bút mực', 'B. Bút sáp', 'C. Bút chì'], answer: 'B' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB4Pens,
        q: '1. b) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '– Bút mực dài hơn bút chì mấy xăng-ti-mét?<br>... cm − ... cm = ... cm', answer: '13,10,3', validate: listValidate(['13', '10', '3']) },
          { label: '– Bút sáp ngắn hơn bút chì mấy xăng-ti-mét?<br>... cm − ... cm = ... cm', answer: '10,5,5', validate: listValidate(['10', '5', '5']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB4Robots,
        q: '2. Bốn bạn rô-bốt rủ nhau đo chiều cao.\na) Viết số thích hợp vào chỗ chấm.\nb) Viết tên các rô-bốt theo thứ tự từ thấp nhất đến cao nhất.',
        blanks: [
          { label: 'a) – Rô-bốt C cao hơn rô-bốt B bao nhiêu xăng-ti-mét?<br>... cm − ... cm = ... cm', answer: '59,54,5', validate: listValidate(['59', '54', '5']) },
          { label: '– Rô-bốt D thấp hơn rô-bốt C bao nhiêu xăng-ti-mét?<br>... cm − ... cm = ... cm', answer: '59,49,10', validate: listValidate(['59', '49', '10']) },
          { label: 'b) D; ...', answer: 'B; A; C', validate: listValidate(['B', 'A', 'C']) },
        ],
        hints: ['A cao 56 cm, B cao 54 cm, C cao 59 cm, D cao 49 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB4Boats,
        q: '3. Mai và Nam gấp được các thuyền giấy như hình dưới đây.\na) Nam gấp được kém Mai mấy cái thuyền?',
        wordProblem: true,
        blanks: [{ label: 'Số thuyền Nam gấp được kém Mai', answer: '4' }],
        hints: ['Đếm số thuyền của Mai (bên trái bàn) và của Nam (bên phải bàn), kể cả chiếc bạn đang cầm trên tay.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB4Boats,
        q: '3. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nMai cần cho Nam mấy cái thuyền để số thuyền của hai bạn bằng nhau?',
        options: ['4 cái thuyền', '3 cái thuyền', '2 cái thuyền'],
        answer: 2,
        hints: ['Mai có 10 cái, Nam có 6 cái. Mai cho Nam 1 cái thì còn 9 cái, Nam có 7 cái — thử tiếp nhé!'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBút đỏ dài hơn bút vàng 2 cm, bút vàng dài hơn bút xanh 3 cm. Hỏi bút đỏ dài hơn bút xanh mấy xăng-ti-mét?',
        options: ['2 cm', '3 cm', '5 cm'],
        answer: 2,
        hints: ['Bút đỏ dài hơn bút vàng, bút vàng lại dài hơn bút xanh: cộng hai phần dài hơn lại.'],
      },
    ],
  },

  // ── BÀI 5 (trang 22–25) ───────────────────────────────────────────────────
  {
    id: 'bai-5', number: 5, title: 'Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 40 + 60 = ...', answer: '100' },
          { label: '30 + 70 = ...', answer: '100' },
          { label: '90 + 10 = ...', answer: '100' },
          { label: 'b) 100 − 40 = ...', answer: '60' },
          { label: '100 − 70 = ...', answer: '30' },
          { label: '100 − 80 = ...', answer: '20' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '52 + 6', answer: '58' },
          { label: '24 + 73', answer: '97' },
          { label: '88 − 43', answer: '45' },
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột với nhau, rồi tính từ phải sang trái.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. a) Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [{ id: 'l1', text: '40 + 30' }, { id: 'l2', text: '60 + 6' }, { id: 'l3', text: '20 + 80' }, { id: 'l4', text: '52 + 2' }],
        right: [{ id: 'r1', text: '68 − 2' }, { id: 'r2', text: '64 − 10' }, { id: 'r3', text: '100 − 30' }, { id: 'r4', text: '50 + 50' }],
        pairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r2']],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB5Flow,
        q: '3. b) Số?',
        blanks: [
          { label: 'Ô vuông: ...', answer: '40' },
          { label: 'Hình tam giác: ...', answer: '74' },
          { label: 'Hình ngôi sao: ...', answer: '44' },
        ],
        hints: ['Đi theo mũi tên: 60 − 20 = ?, rồi lấy kết quả + 34, rồi − 30.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Đầu năm học, lớp 2A có 31 học sinh. Đến đầu học kì 2, lớp 2A có 4 học sinh chuyển đến. Hỏi khi đó lớp 2A có tất cả bao nhiêu học sinh?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh lớp 2A khi đó', answer: '35' }],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '5. >; <; = ?',
        rows: [
          { left: 'a) 60 + 30', right: '100', answer: '<' },
          { left: '100 − 50', right: '40', answer: '>' },
          { left: 'b) 50 + 20', right: '20 + 50', answer: '=' },
          { left: '40 + 40', right: '100 − 10', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB5Calcs,
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) 53 + 5 = 58', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) 84 − 3 = 54', answer: 'S', validate: dsValidate(false) },
          { label: 'c) 45 + 32 = 77', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) 98 − 67 = 31', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Ở câu b), chữ số 3 phải viết thẳng cột với chữ số 4 (hàng đơn vị).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính.',
        blanks: [
          { label: 'a) 50 + 8 = ...', answer: '58' },
          { label: '35 − 5 = ...', answer: '30' },
          { label: '4 + 70 = ...', answer: '74' },
          { label: 'b) 27 + 40 = ...', answer: '67' },
          { label: '86 − 30 = ...', answer: '56' },
          { label: '73 − 23 = ...', answer: '50' },
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Tô màu đỏ vào những ô tô ghi phép tính có kết quả bé hơn 40, màu xanh vào những ô tô ghi phép tính có kết quả lớn hơn 70.\nChọn màu cho mỗi ô tô (ô tô không cần tô thì chọn "Không tô").',
        rows: [
          { left: '70 + 9', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Xanh' },
          { left: '43 + 3', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Không tô' },
          { left: '90 − 60', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Đỏ' },
          { left: '36 + 2', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Đỏ' },
          { left: '100 − 60', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Không tô' },
          { left: '84 − 4', options: ['Đỏ', 'Xanh', 'Không tô'], answer: 'Xanh' },
        ],
        hints: ['Tính kết quả từng ô tô trước. 40 không bé hơn 40, nên ô tô 100 − 60 không tô màu.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB5Puzzles,
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 45 + 3... = ...8', boxes: true, answer: '3,7', validate: listValidate(['3', '7']) },
          { label: 'b) ...9 − 27 = 5...', boxes: true, answer: '7,2', validate: listValidate(['7', '2']) },
          { label: 'c) ...6 + 4... = 79', boxes: true, answer: '3,3', validate: listValidate(['3', '3']) },
          { label: 'd) 8... − ...5 = 41', boxes: true, answer: '6,4', validate: listValidate(['6', '4']) },
        ],
        hints: ['Tính hàng đơn vị trước, rồi đến hàng chục. Ví dụ a): 5 + ? = 8.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Nam có 37 viên bi màu xanh và màu đỏ, trong đó có 13 viên bi màu xanh. Hỏi Nam có bao nhiêu viên bi màu đỏ?',
        wordProblem: true,
        blanks: [{ label: 'Số viên bi màu đỏ', answer: '24' }],
      },
      {
        type: 'choice', section: 'Tiết 3', multi: true,
        q: '1. a) Tô màu vàng vào những quả xoài ghi phép tính có cùng kết quả.\nChọn tất cả các quả xoài cần tô màu.',
        options: ['35 + 52', '79 − 6', '7 + 80', '65 − 5'],
        answer: [0, 2],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '1. b) Tô màu xanh vào quả cam ghi phép tính có kết quả lớn nhất.',
        options: ['98 − 63', '54 + 5', '25 + 40', '78 − 20'],
        answer: 2,
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 70 + ... = 100', answer: '30' },
          { label: 'b) 100 − 60 = ...', answer: '40' },
          { label: 'c) 90 − ... = 80', answer: '10' },
          { label: 'd) ... + 60 = 100', answer: '40' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tính.',
        blanks: [
          { label: 'a) 25 + 42 − 30 = ...', answer: '37' },
          { label: 'b) 89 − 57 + 46 = ...', answer: '78' },
        ],
        hints: ['Tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Một ô tô có 45 ghế ngồi cho hành khách, trong đó có 31 ghế đã có hành khách ngồi. Hỏi trên ô tô còn bao nhiêu ghế trống?',
        wordProblem: true,
        blanks: [{ label: 'Số ghế trống', answer: '14' }],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB5Clovers,
        q: '5. Viết số thích hợp vào chỗ trống.',
        blanks: [{ label: 'Số ở cánh lá còn trống: ...', answer: '5' }],
        hints: ['Ở mỗi cây, số ở giữa bằng tổng ba số ở ba cánh lá: 5 + 20 + 2 = 27.'],
      },
    ],
  },

  // ── BÀI 6 (trang 26–28) ───────────────────────────────────────────────────
  {
    id: 'bai-6', number: 6, title: 'Luyện tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1', img: imgB6Lines,
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [21, 22, blank(23), 24, 25, blank(26), blank(27), 28, blank(29), 30] },
          { label: 'b)', cells: [54, 55, 56, blank(57), blank(58), 59, blank(60), 61, blank(62), blank(63)] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. a) Viết số thành tổng (theo mẫu).\n${mau('45 = 40 + 5')}`,
        blanks: [
          sumBlank(56), sumBlank(64), sumBlank(42), sumBlank(87), sumBlank(29), sumBlank(77),
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>55 = 50 + ...', answer: '5' },
          { label: '23 = ... + 3', answer: '20' },
          { label: '97 = ... + 7', answer: '90' },
          { label: '48 = 40 + ...', answer: '8' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Số?',
        headers: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
        rows: [
          { sample: true, cells: [29, 30, 31] },
          [blank(58), 59, blank(60)],
          [blank(65), 66, blank(67)],
          [blank(86), 87, blank(88)],
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB6Ribbon,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [{ label: 'Các số trên viết theo thứ tự từ bé đến lớn là:', answer: '23, 34, 39, 56', validate: listValidate(['23', '34', '39', '56']) }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Trong vườn có 37 cây cam và 32 cây chanh. Hỏi số cây cam hơn số cây chanh bao nhiêu cây?',
        wordProblem: true,
        blanks: [{ label: 'Số cây cam hơn số cây chanh', answer: '5' }],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Tổng của 43 và 5 là:', options: ['A. 48', 'B. 84', 'C. 47'], answer: 'A' },
          { left: 'b) Hiệu của 89 và 54 là:', options: ['A. 34', 'B. 35', 'C. 53'], answer: 'B' },
          { left: 'c) Số liền trước của số lớn nhất có hai chữ số là:', options: ['A. 91', 'B. 100', 'C. 98'], answer: 'C' },
          { left: 'd) Số liền sau của số tròn chục lớn nhất có hai chữ số là:', options: ['A. 91', 'B. 89', 'C. 100'], answer: 'A' },
        ],
        hints: ['Số lớn nhất có hai chữ số là 99; số tròn chục lớn nhất có hai chữ số là 90.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Viết tiếp vào chỗ chấm cho thích hợp.\nCho ba tấm thẻ số như hình dưới đây:\n${cards(0, 2, 7)}`,
        blanks: [
          { label: 'a) Ghép hai trong ba tấm thẻ trên được các số có hai chữ số là:', answer: '20, 27, 70, 72', validate: setValidate(['20', '27', '70', '72']) },
          { label: 'b) Tổng của số lớn nhất và số bé nhất trong các số lập được ở trên là:', answer: '72 + 20 = 92', validate: calcValidate(72, '+', 20, 92) },
        ],
        hints: ['Chữ số 0 không đứng ở hàng chục.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. >; <; = ?',
        rows: [
          { left: 'a) 42 + 6', right: '50', answer: '<' },
          { left: '79 − 7', right: '70', answer: '>' },
          { left: 'b) 68 − 44', right: '20 + 4', answer: '=' },
          { left: '35 + 54', right: '95 − 5', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB6Puzzles,
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) ...2 + 43 = 8...', boxes: true, answer: '4,5', validate: listValidate(['4', '5']) },
          { label: 'b) 8... − 25 = ...2', boxes: true, answer: '7,6', validate: listValidate(['7', '6']) },
          { label: 'c) 6... + ...4 = 99', boxes: true, answer: '5,3', validate: listValidate(['5', '3']) },
          { label: 'd) ...7 − 5... = 35', boxes: true, answer: '8,2', validate: listValidate(['8', '2']) },
        ],
        hints: ['Tính hàng đơn vị trước, rồi đến hàng chục. Ví dụ a): 2 + 3 = ?'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB6Triangle,
        q: '5. Viết các số 20, 30, 50 thích hợp vào ô trống, biết rằng cộng ba số trên mỗi hàng đều có kết quả bằng 100.',
        blanks: [
          { label: 'Ô tròn góc bên trái: ...', answer: '30' },
          { label: 'Ô tròn ở giữa cạnh dưới: ...', answer: '20' },
          { label: 'Ô tròn góc bên phải: ...', answer: '50' },
        ],
        hints: ['Cạnh bên trái: 10 + 60 + ? = 100. Cạnh bên phải: 10 + 40 + ? = 100.'],
      },
    ],
  },
];
