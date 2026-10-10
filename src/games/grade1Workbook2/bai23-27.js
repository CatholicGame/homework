/**
 * Vở bài tập Toán 1 — Tập hai (Kết nối tri thức): Bài 23–27 (sách trang 22–40).
 * Bảng các số từ 1 đến 100, Luyện tập chung, Dài hơn ngắn hơn, Đơn vị đo độ dài,
 * Thực hành ước lượng và đo độ dài.
 * Mọi hình là SVG vẽ lại theo nét riêng (scripts/redraw/g1t2_bai23.py … g1t2_bai27.py, kit_l1t2_b.py).
 * Bài "vẽ bút chì" (Bài 25 Tiết 1 câu 2) đổi thành chọn bút chì đã vẽ sẵn; bài đo bằng gang tay, thước,
 * bước chân của chính bé (Bài 27 Tiết 1) nhận mọi số đo hợp lí.
 */
import { blank, listValidate, setValidate, dsValidate, textValidate, mau } from '../grade3Workbook.js';
import imgB23Rabbit from '../../assets/grade1-workbook-2/bai23_q5a_houses.svg';
import imgB23Cat from '../../assets/grade1-workbook-2/bai23_q5b_houses.svg';
import imgB24Mau from '../../assets/grade1-workbook-2/bai24_t1_q1_mau.svg';
import imgB24A from '../../assets/grade1-workbook-2/bai24_t1_q1_a.svg';
import imgB24B from '../../assets/grade1-workbook-2/bai24_t1_q1_b.svg';
import imgB24C from '../../assets/grade1-workbook-2/bai24_t1_q1_c.svg';
import imgB24Tangram from '../../assets/grade1-workbook-2/bai24_t1_q3_tangram.svg';
import imgB24Grids from '../../assets/grade1-workbook-2/bai24_t1_q5_grids.svg';
import imgB24Bears from '../../assets/grade1-workbook-2/bai24_t2_q3_bears.svg';
import imgB24Dots from '../../assets/grade1-workbook-2/bai24_t2_q4_dots.svg';
import imgB24Cards from '../../assets/grade1-workbook-2/bai24_t2_q5_cards.svg';

import imgB25Pairs from '../../assets/grade1-workbook-2/bai25_t1_q1_pairs.svg';
import imgB25Pencils from '../../assets/grade1-workbook-2/bai25_t1_q2_pencils.svg';
import imgB25PencilsABC from '../../assets/grade1-workbook-2/bai25_t1_q3_pencils.svg';
import imgB25Mau from '../../assets/grade1-workbook-2/bai25_t1_q4_mau.svg';
import imgB25Cars from '../../assets/grade1-workbook-2/bai25_t1_q4_a.svg';
import imgB25Tools from '../../assets/grade1-workbook-2/bai25_t1_q4_b.svg';
import imgB25Fish from '../../assets/grade1-workbook-2/bai25_t1_q4_c.svg';
import imgB25Animals from '../../assets/grade1-workbook-2/bai25_t2_q1_animals.svg';
import imgB25Trees from '../../assets/grade1-workbook-2/bai25_t2_q2_trees_blocks.svg';
import imgB25Kids from '../../assets/grade1-workbook-2/bai25_t2_q3_kids.svg';
import imgB25Girls from '../../assets/grade1-workbook-2/bai25_t2_q4a_girls.svg';
import imgB25Line from '../../assets/grade1-workbook-2/bai25_t2_q4b_kids.svg';
import imgB26Clips from '../../assets/grade1-workbook-2/bai26_t1_q1_clips.svg';
import icPencil from '../../assets/grade1-workbook-2/bai26_ic_pencil.svg';
import icClip from '../../assets/grade1-workbook-2/bai26_ic_clip.svg';
import icPen from '../../assets/grade1-workbook-2/bai26_ic_pen.svg';
import icRuler from '../../assets/grade1-workbook-2/bai26_ic_ruler.svg';
import icScissors from '../../assets/grade1-workbook-2/bai26_ic_scissors.svg';
import imgB26Animals from '../../assets/grade1-workbook-2/bai26_t1_q2_animals.svg';
import icHedgehog from '../../assets/grade1-workbook-2/bai26_ic_hedgehog.svg';
import icLeaf from '../../assets/grade1-workbook-2/bai26_ic_leaf.svg';
import icFox from '../../assets/grade1-workbook-2/bai26_ic_fox.svg';
import icUnicorn from '../../assets/grade1-workbook-2/bai26_ic_unicorn.svg';
import icRabbit from '../../assets/grade1-workbook-2/bai26_ic_rabbit.svg';
import icGiraffe from '../../assets/grade1-workbook-2/bai26_ic_giraffe.svg';
import imgB26Comb from '../../assets/grade1-workbook-2/bai26_t1_q3_comb.svg';
import imgB26Paste from '../../assets/grade1-workbook-2/bai26_t1_q3_toothpaste.svg';
import imgB26Brush from '../../assets/grade1-workbook-2/bai26_t1_q3_toothbrush.svg';
import imgB26Spoon from '../../assets/grade1-workbook-2/bai26_t1_q3_spoon.svg';
import imgB26Fork from '../../assets/grade1-workbook-2/bai26_t1_q3_fork.svg';
import imgB26Ladle from '../../assets/grade1-workbook-2/bai26_t1_q3_ladle.svg';
import imgB26Measure from '../../assets/grade1-workbook-2/bai26_t2_q1_measure.svg';
import imgB26Seven from '../../assets/grade1-workbook-2/bai26_t2_q2_seven.svg';
import imgB26CarA from '../../assets/grade1-workbook-2/bai26_t2_q3_a.svg';
import imgB26CarB from '../../assets/grade1-workbook-2/bai26_t2_q3_b.svg';
import imgB26CarC from '../../assets/grade1-workbook-2/bai26_t2_q3_c.svg';
import imgB26CarD from '../../assets/grade1-workbook-2/bai26_t2_q3_d.svg';
import imgB27Clips from '../../assets/grade1-workbook-2/bai27_t1_q1_clips.svg';
import icCrayon from '../../assets/grade1-workbook-2/bai27_ic_crayon.svg';
import icPencil27 from '../../assets/grade1-workbook-2/bai27_ic_pencil.svg';
import icSharpener from '../../assets/grade1-workbook-2/bai27_ic_sharpener.svg';
import imgB27Hand from '../../assets/grade1-workbook-2/bai27_t1_q2_hand.svg';
import imgB27Table from '../../assets/grade1-workbook-2/bai27_t1_q3_table.svg';
import imgB27Wall from '../../assets/grade1-workbook-2/bai27_t1_q4_wall.svg';
import imgB27Pencil from '../../assets/grade1-workbook-2/bai27_t2_q2_pencil.svg';
import imgB27Desk from '../../assets/grade1-workbook-2/bai27_t2_q2_table.svg';
import imgB27Floor from '../../assets/grade1-workbook-2/bai27_t2_q2_floor.svg';
import imgB27Floors from '../../assets/grade1-workbook-2/bai27_t2_q3_floors.svg';
import imgB27Buildings from '../../assets/grade1-workbook-2/bai27_t2_q4_buildings.svg';

// ── Local helpers ───────────────────────────────────────────────────────────

// Hình đặt trong dòng chữ, rộng cố định (giữ đúng tỉ lệ dài ngắn giữa các hình cùng câu).
const pic = (src, w) => `<img src="${src}" alt="" style="width:${w}px;max-width:100%;height:auto;vertical-align:middle">`;
// Biểu tượng nhỏ đứng cạnh ô trống: không co lại khi dòng hẹp.
const icon = (src, w) => `<img src="${src}" alt="" style="width:${w}px;flex:none;height:auto;vertical-align:middle">`;
const NUM = 'display:inline-flex;align-items:center;justify-content:center;width:2.6rem;height:2.6rem;font-weight:700;line-height:1;margin:0 4px 4px 0;vertical-align:middle;background:#CDEBFA;color:#1E293B';
// Số cho sẵn trong hình tròn / vuông / thoi / tam giác (dãy số "Viết số thích hợp vào ô trống").
const circ = (n) => `<span style="${NUM};border:2px solid #475569;border-radius:50%">${n}</span>`;
const sqr = (n) => `<span style="${NUM};border:2px solid #475569;border-radius:3px">${n}</span>`;
const dia = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.9rem;height:2.9rem;margin:0 2px 4px 0;vertical-align:middle;position:relative"><span style="position:absolute;inset:.45rem;transform:rotate(45deg);background:#CDEBFA;border:2px solid #475569"></span><span style="position:relative;font-weight:700">${n}</span></span>`;
const tri = (n) => `<span style="display:inline-flex;align-items:flex-end;justify-content:center;width:3.6rem;height:3.1rem;margin:0 2px 4px 0;vertical-align:middle;position:relative;padding-bottom:.3rem;font-size:.95em;box-sizing:border-box"><svg viewBox="0 0 60 54" style="position:absolute;inset:0;width:100%;height:100%"><path d="M30,3 L57,51 L3,51 Z" fill="#CDEBFA" stroke="#475569" stroke-width="3" stroke-linejoin="round"/></svg><span style="position:relative;font-weight:700">${n}</span></span>`;
// Đám mây ghi các số cần sắp xếp.
const cloud = (txt) => `<span style="display:inline-block;padding:.5rem 1.2rem;border-radius:999px;background:#CDEBFA;border:2px solid #7CC6E8;font-weight:700;margin:0 10px 4px 0;white-space:nowrap">${txt}</span>`;
// Một dãy ô số; '...' là ô trống, answers = các số của ô trống theo thứ tự.
function chain(label, answers) {
  const a = answers.map(String);
  return { label, answer: a.join(','), validate: listValidate(a), boxes: true };
}
const nums = (from, to, step) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
// Một hàng số nhà: cho sẵn các số đầu, còn lại để trống.
const houseRow = (from, given, to) => [nums(from, to, 2).map((n, i) => (i < given ? n : blank(n)))];
// Bảng các số từ 1 đến 100: '.' là ô bé viết.
const BOARD = [
  'xxx.x.xx.x', 'xx.x.xxx.x', 'xxx.xx.x.x', '.x.xx.xxx.', 'xx.x..xx.x',
  'xx.xx.xx.x', '.xx.xx.xx.', 'xx.xxx.x.x', 'xx.xx.x.xx', 'xxx.x.xx.x',
].map((row, r) => [...row].map((c, i) => (c === 'x' ? r * 10 + i + 1 : blank(r * 10 + i + 1))));
// Thiên nga ghép hình: hai mảnh tam giác to (E, G) như nhau nên 46, 37 đổi chỗ cho nhau cũng đúng.
function swanValidate(value) {
  const v = String(value).split(',').map(s => s.trim());
  if (v.length !== 6) return false;
  const [a, b, c, d, e, g] = v;
  return a === '10' && b === '15' && c === '1' && d === '24'
    && ((e === '46' && g === '37') || (e === '37' && g === '46'));
}

// Khung "Viết các số 1, 2, 3 vào ô trống": cột ô trống bên trái, hình ba đồ vật bên phải.
const sideBoxes = (src, w) => `<span style="display:inline-flex;align-items:stretch;gap:10px;vertical-align:middle"><span style="display:flex;flex-direction:column;justify-content:space-around;padding-top:4%">... ... ...</span>${pic(src, w)}</span>`;
// Ô số cho sẵn (mẫu) màu xanh như sách.
const given = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.4rem;height:2.4rem;border:2px solid #1E88D0;border-radius:4px;color:#1E88D0;font-weight:700;vertical-align:middle;margin:0 4px">${n}</span>`;
// Số đo bằng gang tay, thước, bước chân của chính bé: mọi số hợp lí trong khoảng [lo, hi] đều đúng.
const rangeValidate = (lo, hi) => (value) => {
  const v = String(value).trim();
  return /^\d{1,3}$/.test(v) && +v >= lo && +v <= hi;
};
// Hình với các ô trống ngay dưới từng bạn: `at` = vị trí (phần trăm bề rộng hình) của mỗi ô.
function underPic(img, width, at) {
  const spans = at.map(x => `<span style="position:absolute;left:${x}%;top:0;transform:translateX(-50%)">...</span>`).join('');
  return `<span style="display:inline-block;width:${width}px;max-width:100%;vertical-align:top">`
    + `<img src="${img}" alt="" style="display:block;width:100%;height:auto">`
    + `<span style="display:block;position:relative;height:3.1rem">${spans}</span></span>`;
}
const THIRDS = [100 / 6, 50, 500 / 6];
const LEN3 = ['dài hơn', 'ngắn hơn'];
const HEIGHT3 = ['cao hơn', 'thấp hơn', 'cao bằng'];

export const BAI_23_27 = [
  // ── BÀI 23 (trang 22–23) ─────────────────────────────────────────────────
  {
    id: 'bai-23', number: 23, title: 'Bảng các số từ 1 đến 100',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết số còn thiếu vào bảng các số từ 1 đến 100.',
        rows: BOARD,
        hints: ['Mỗi hàng có 10 số, số sau hơn số trước 1. Đọc theo cột: mỗi số ở dưới hơn số ở trên 10.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong bảng các số từ 1 đến 100:',
        blanks: [
          { label: 'a) Các số có một chữ số là: ...', answer: '1, 2, 3, 4, 5, 6, 7, 8, 9', validate: setValidate(['1', '2', '3', '4', '5', '6', '7', '8', '9']) },
          { label: 'b) Các số có hai chữ số giống nhau là: ...', answer: '11, 22, 33, 44, 55, 66, 77, 88, 99', validate: setValidate(['11', '22', '33', '44', '55', '66', '77', '88', '99']) },
          { label: 'c) Có ... số có hai chữ số.', answer: '90' },
          { label: 'd) Số bé nhất có hai chữ số là ...', answer: '10' },
          { label: 'Số lớn nhất có hai chữ số là ...', answer: '99' },
        ],
        hints: ['Số có hai chữ số bắt đầu từ 10 và kết thúc ở 99. Từ 10 đến 99 có 9 hàng, mỗi hàng 10 số.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào ô trống.',
        blanks: [
          chain(`a) ${circ(40)}${circ(42)}${circ(44)}...&nbsp;...&nbsp;${circ(50)}...&nbsp;...&nbsp;${circ(56)}...`, [46, 48, 52, 54, 58]),
          chain(`b) ${circ(63)}${circ(65)}${circ(67)}...&nbsp;${circ(71)}...&nbsp;...&nbsp;${circ(77)}...&nbsp;...`, [69, 73, 75, 79, 81]),
        ],
        hints: ['a) Mỗi số hơn số đứng trước 2: 40, 42, 44, 46, …', 'b) Mỗi số hơn số đứng trước 2: 63, 65, 67, 69, …'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. a) Viết các số theo thứ tự từ bé đến lớn.\nb) Viết các số theo thứ tự từ lớn đến bé.',
        blanks: [
          { label: `a) ${cloud('32, 29, 37')}...`, answer: '29, 32, 37', validate: listValidate(['29', '32', '37']), tiles: ['32', '29', '37'] },
          { label: `${cloud('54, 90, 86, 75')}...`, answer: '54, 75, 86, 90', validate: listValidate(['54', '75', '86', '90']), tiles: ['54', '90', '86', '75'] },
          { label: `b) ${cloud('68, 75, 71')}...`, answer: '75, 71, 68', validate: listValidate(['75', '71', '68']), tiles: ['68', '75', '71'] },
          { label: `${cloud('38, 42, 29, 61')}...`, answer: '61, 42, 38, 29', validate: listValidate(['61', '42', '38', '29']), tiles: ['38', '42', '29', '61'] },
        ],
        hints: ['So sánh chữ số hàng chục trước: số nào có chữ số hàng chục bé hơn thì bé hơn.'],
      },
      {
        type: 'table', section: 'Tiết 1', img: imgB23Rabbit,
        q: '5. a) Chú thỏ sẽ trốn vào ngôi nhà số 24, tô màu ngôi nhà đó.\nViết tiếp số nhà theo dãy để tìm ra ngôi nhà số 24:',
        rows: houseRow(2, 4, 24),
        hints: ['Các nhà đầu ghi 2, 4, 6, 8: nhà sau hơn nhà trước 2. Đi theo dãy nhà, đếm thêm 2 cho tới 24.'],
      },
      {
        type: 'table', section: 'Tiết 1', img: imgB23Cat,
        q: '5. b) Chú mèo sẽ trốn vào ngôi nhà số 23, tô màu ngôi nhà đó.\nViết tiếp số nhà theo dãy để tìm ra ngôi nhà số 23:',
        rows: houseRow(1, 4, 23),
        hints: ['Các nhà đầu ghi 1, 3, 5, 7: nhà sau hơn nhà trước 2. Đi theo dãy nhà, đếm thêm 2 cho tới 23.'],
      },
    ],
  },

  // ── BÀI 24 (trang 24–27) ─────────────────────────────────────────────────
  {
    id: 'bai-24', number: 24, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Viết số thích hợp vào chỗ chấm (theo mẫu).\n${pic(imgB24Mau, 300)}\n${mau('56 gồm 5 chục và 6 đơn vị.')}`,
        blanks: [
          { label: `a) ${pic(imgB24A, 300)}<br>... gồm ... chục và ... đơn vị.`, answer: '38,3,8' },
          { label: `b) ${pic(imgB24B, 300)}<br>... gồm ... chục và ... đơn vị.`, answer: '64,6,4' },
          { label: `c) ${pic(imgB24C, 300)}<br>... gồm ... chục và ... đơn vị.`, answer: '74,7,4' },
        ],
        hints: ['Mỗi bó có 10 que tính là 1 chục. Đếm số bó, rồi đếm số que lẻ.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. Viết vào chỗ chấm (theo mẫu).\n${mau('a) Sáu mươi mốt : 61')}\n${mau('b) 53 : năm mươi ba')}`,
        blanks: [
          { label: 'a) Bốn mươi lăm : ...', answer: '45' },
          { label: 'Bảy mươi tư : ...', answer: '74' },
          { label: 'Tám mươi chín : ...', answer: '89' },
          { label: 'b) 65 : ...', answer: 'sáu mươi lăm' },
          { label: '37 : ...', answer: 'ba mươi bảy' },
          { label: '94 : ...', answer: 'chín mươi tư' },
        ],
        hints: ['Đọc số có hai chữ số: đọc chữ số hàng chục với "mươi" trước, rồi đọc chữ số hàng đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB24Tangram,
        q: '3. Viết số thích hợp vào các mảnh ghép (theo mẫu).',
        blanks: [
          { label: 'A ... &nbsp; B ... &nbsp; C ... &nbsp; D ... &nbsp; E ... &nbsp; G ...', answer: '10,15,1,24,46,37', validate: swanValidate, boxes: true },
        ],
        hints: ['Mảnh đầu thiên nga là tam giác nhỏ ghi 2 (mẫu). Tìm mảnh cùng hình dạng, cùng cỡ ở hình vuông: hình vuông nhỏ, hình bình hành, tam giác nhỏ, tam giác vừa, hai tam giác to.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối (theo mẫu).',
        left: [
          { id: 'f37', text: 'Ba mươi bảy' },
          { id: 'f53', text: 'Năm mươi ba' },
          { id: 'f88', text: 'Tám mươi tám' },
          { id: 'f64', text: 'Sáu mươi tư' },
          { id: 'f91', text: 'Chín mươi mốt' },
          { id: 'f75', text: 'Bảy mươi lăm' },
        ],
        right: [
          { id: 'p37', text: '37' },
          { id: 'p53', text: '53' },
          { id: 'p64', text: '64' },
          { id: 'p75', text: '75' },
          { id: 'p88', text: '88' },
          { id: 'p91', text: '91' },
        ],
        pairs: [['f37', 'p37'], ['f53', 'p53'], ['f88', 'p88'], ['f64', 'p64'], ['f91', 'p91'], ['f75', 'p75']],
        matchSample: ['f37', 'p37'],
        hints: ['"Sáu mươi tư": chữ số hàng chục là 6, chữ số hàng đơn vị là 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB24Grids,
        q: '5. Tô màu đỏ vào hình có số ô vuông nhiều nhất, màu xanh vào hai hình có số ô vuông bằng nhau, màu vàng vào hình có số ô vuông ít nhất.',
        blanks: [
          { label: 'Hình tô màu đỏ: Hình ...', answer: '4', tiles: ['1', '2', '3', '4'], tileOne: true },
          { label: 'Hai hình tô màu xanh: Hình ... và Hình ...', answer: '2,3', validate: setValidate(['2', '3']), tiles: ['1', '2', '3', '4'] },
          { label: 'Hình tô màu vàng: Hình ...', answer: '1', tiles: ['1', '2', '3', '4'], tileOne: true },
        ],
        hints: ['Đếm số ô vuông của từng hình: Hình 1 có 10 ô. Đếm tiếp các hình còn lại.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào ô trống.',
        blanks: [
          chain(`a) ${dia(12)}${dia(14)}${dia(16)}... ... ...`, [18, 20, 22]),
          chain(`b) ${circ(21)}${circ(23)}...&nbsp;${circ(27)}... ...`, [25, 29, 31]),
          chain(`c) ${sqr(50)}${sqr(55)}${sqr(60)}... ... ...`, [65, 70, 75]),
          chain(`d) ${tri(40)}${tri(50)}...&nbsp;${tri(70)}... ...`, [60, 80, 90]),
        ],
        hints: ['Xem hai số cho sẵn đầu dãy hơn kém nhau bao nhiêu: 12, 14 hơn kém 2; 50, 55 hơn kém 5; 40, 50 hơn kém 10.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. a) Viết dấu >; <; = thích hợp vào ô trống.',
        rows: [
          { left: '53', right: '49', answer: '>' },
          { left: '68', right: '86', answer: '<' },
          { left: '27', right: '21', answer: '>' },
          { left: '40 + 6', right: '50', answer: '<' },
          { left: '80 + 7', right: '85', answer: '>' },
          { left: '70 + 5', right: '80', answer: '<' },
          { left: '40 + 3', right: '40 + 5', answer: '<' },
          { left: '50 + 6', right: '50 + 6', answer: '=' },
          { left: '90 + 9', right: '90 + 7', answer: '>' },
        ],
        hints: ['Tính phép cộng trước (40 + 6 = 46), rồi so sánh chữ số hàng chục, sau đó đến hàng đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. b) Đúng ghi Đ, sai ghi S.',
        blanks: [
          { label: '– Số 76 gồm 7 chục và 6 đơn vị. ...', answer: 'Đ', validate: dsValidate(true) },
          { label: '– Số 76 gồm 6 chục và 7 đơn vị. ...', answer: 'S', validate: dsValidate(false) },
          { label: '– Số 76 gồm 7 và 6. ...', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Trong số 76, chữ số 7 chỉ 7 chục, chữ số 6 chỉ 6 đơn vị.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB24Bears,
        q: '3. a) Tô màu xanh vào gấu bông có số lớn nhất.\nb) Tô màu vàng vào gấu bông có số bé nhất.',
        rows: [
          { left: 'a) Gấu bông tô màu xanh:', options: ['28', '57', '79', '51'], answer: '79' },
          { left: 'b) Gấu bông tô màu vàng:', options: ['73', '69', '90', '75'], answer: '69' },
        ],
        hints: ['So sánh chữ số hàng chục trước: số nào có chữ số hàng chục lớn nhất thì lớn nhất.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB24Dots,
        q: '4. Nối các số theo thứ tự từ bé đến lớn rồi tô màu hình vẽ.\nNối xong từ 1 đến 30, em được hình con gì?',
        options: ['Con mèo', 'Con chó', 'Con gà'],
        answer: 1,
        hints: ['Kéo bút sáp từ điểm 1 sang điểm 2, 3, 4, … cho tới 30. Con vật có cái tai to, có vòng cổ đeo thẻ.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB24Cards,
        q: '5. Viết tiếp vào chỗ chấm cho thích hợp.\nCho ba tấm thẻ dưới đây:\nGhép hai trong ba tấm thẻ trên được:',
        blanks: [
          { label: '– Các số là: ...', answer: '56, 58, 65, 68, 85, 86', validate: setValidate(['56', '58', '65', '68', '85', '86']) },
          { label: '– Số bé nhất là ...', answer: '56' },
          { label: '– Số lớn nhất là ...', answer: '86' },
        ],
        hints: ['Chọn một thẻ làm chữ số hàng chục, một thẻ khác làm chữ số hàng đơn vị. Thẻ 5 đứng đầu: 56, 58.'],
      },
    ],
  },

  // ── BÀI 25 (trang 28–31) ─────────────────────────────────────────────────
  {
    id: 'bai-25', number: 25, title: 'Dài hơn, ngắn hơn',
    questions: [
      {
        type: 'compare', section: 'Tiết 1', img: imgB25Pairs,
        q: '1. Tô màu xanh cho vật ngắn hơn, tô màu vàng cho vật dài hơn.\nChọn vật ngắn hơn (tô màu xanh) trong mỗi khung.',
        rows: [
          { left: 'a)', options: ['Cái đinh', 'Cái búa'], answer: 'Cái đinh' },
          { left: 'b)', options: ['Xe ở trên', 'Xe ở dưới'], answer: 'Xe ở trên' },
          { left: 'c)', options: ['Cái thìa', 'Chìa khoá'], answer: 'Chìa khoá' },
          { left: 'd)', options: ['Cây gậy', 'Cái xẻng'], answer: 'Cái xẻng' },
        ],
        hints: ['Đặt hai vật thẳng mép bên trái. Vật nào thò ra xa hơn ở bên phải là vật dài hơn.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB25Pencils,
        q: '2. Cho bút chì A.\nTrong các bút chì B, C, D, em chọn bút chì nào?',
        rows: [
          { left: 'a) Bút chì dài hơn bút chì A:', options: ['B', 'C', 'D'], answer: 'C' },
          { left: 'b) Bút chì ngắn hơn bút chì A:', options: ['B', 'C', 'D'], answer: 'D' },
          { left: 'c) Bút chì dài bằng bút chì A:', options: ['B', 'C', 'D'], answer: 'B' },
        ],
        hints: ['Các bút chì cùng thẳng mép bên trái với bút chì A. So đầu ngòi bút bên phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB25PencilsABC,
        q: '3. Viết <i>dài hơn</i>, <i>ngắn hơn</i> vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Bút A ... bút B.', answer: 'ngắn hơn', validate: textValidate('ngắn hơn'), tiles: LEN3, tileOne: true },
          { label: 'b) Bút B ... bút C.', answer: 'dài hơn', validate: textValidate('dài hơn'), tiles: LEN3, tileOne: true },
          { label: 'c) Bút C ... bút A.', answer: 'ngắn hơn', validate: textValidate('ngắn hơn'), tiles: LEN3, tileOne: true },
        ],
        hints: ['Bút B dài nhất, bút C ngắn nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `4. Viết các số 1, 2, 3 vào ô trống theo thứ tự từ ngắn nhất đến dài nhất (theo mẫu).\n${mau('')}\n${pic(imgB25Mau, 340)}`,
        blanks: [
          { label: `a) ${sideBoxes(imgB25Cars, 300)}`, answer: '2,1,3', boxes: true },
          { label: `b) ${sideBoxes(imgB25Tools, 300)}`, answer: '3,2,1', boxes: true },
          { label: `c) ${sideBoxes(imgB25Fish, 300)}`, answer: '1,3,2', boxes: true },
        ],
        hints: ['Vật ngắn nhất ghi 1, vật dài nhất ghi 3, vật còn lại ghi 2.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB25Animals,
        q: '1. a) Khoanh vào con vật cao hơn trong mỗi cặp.\nb) Khoanh vào con vật thấp hơn trong mỗi cặp.',
        rows: [
          { left: 'a) Cao hơn:', options: ['Chuột túi', 'Gấu túi'], answer: 'Chuột túi' },
          { left: 'a) Cao hơn:', options: ['Con nhím', 'Con sóc'], answer: 'Con sóc' },
          { left: 'b) Thấp hơn:', options: ['Sư tử', 'Hươu cao cổ'], answer: 'Sư tử' },
          { left: 'b) Thấp hơn:', options: ['Con khỉ', 'Con thỏ'], answer: 'Con thỏ' },
        ],
        hints: ['Hai con vật đứng trên cùng một vạch. Con nào có đầu (tai) lên cao hơn thì cao hơn.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB25Trees,
        q: '2. a) Tô màu xanh cho cây cao nhất, màu vàng cho cây thấp nhất.\nb) Tô màu đỏ vào hình cao hơn hình A, màu vàng vào hình thấp hơn hình A.',
        rows: [
          { left: 'a) Cây tô màu xanh:', options: ['Cây chuối', 'Cây tre', 'Cây dừa'], answer: 'Cây tre' },
          { left: 'a) Cây tô màu vàng:', options: ['Cây chuối', 'Cây tre', 'Cây dừa'], answer: 'Cây chuối' },
          { left: 'b) Hình tô màu đỏ:', options: ['Hình bên trái', 'Hình bên phải'], answer: 'Hình bên phải' },
          { left: 'b) Hình tô màu vàng:', options: ['Hình bên trái', 'Hình bên phải'], answer: 'Hình bên trái' },
        ],
        hints: ['Hình A có 3 tầng gạch. Đếm số tầng gạch của hai hình kia.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB25Kids,
        q: '3. Viết <i>cao hơn, thấp hơn, cao bằng</i> vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Mai ... Việt.', answer: 'thấp hơn', validate: textValidate('thấp hơn'), tiles: HEIGHT3, tileOne: true },
          { label: 'b) Việt ... Nam.', answer: 'thấp hơn', validate: textValidate('thấp hơn'), tiles: HEIGHT3, tileOne: true },
          { label: 'c) Nam ... Rô-bốt.', answer: 'cao bằng', validate: textValidate('cao bằng'), tiles: HEIGHT3, tileOne: true },
          { label: 'd) Rô-bốt ... Việt.', answer: 'cao hơn', validate: textValidate('cao hơn'), tiles: HEIGHT3, tileOne: true },
        ],
        hints: ['Nhìn theo đường kẻ chấm: đầu Nam và đầu Rô-bốt chạm cùng một đường kẻ.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết các số 1, 2, 3 vào mỗi ô trống theo thứ tự các bạn từ thấp nhất đến cao nhất.',
        blanks: [
          { label: `a) ${underPic(imgB25Girls, 360, THIRDS)}`, answer: '2,3,1', boxes: true },
          { label: `b) ${underPic(imgB25Line, 360, THIRDS)}`, answer: '2,1,3', boxes: true },
        ],
        hints: ['Bạn thấp nhất ghi 1, bạn cao nhất ghi 3. Ô thứ nhất là của bạn đứng bên trái.'],
      },
    ],
  },

  // ── BÀI 26 (trang 32–36) ─────────────────────────────────────────────────
  {
    id: 'bai-26', number: 26, title: 'Đơn vị đo độ dài',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB26Clips,
        q: `1. Quan sát tranh rồi trả lời.\na) Viết số thích hợp vào ô trống (theo mẫu).\n${mau('')} ${icon(icPencil, 90)} ${given(5)} ${icon(icClip, 34)}`,
        blanks: [
          { label: `${icon(icPen, 100)} ... ${icon(icClip, 34)}`, answer: '6', boxes: true },
          { label: `${icon(icRuler, 100)} ... ${icon(icClip, 34)}`, answer: '10', boxes: true },
          { label: `${icon(icScissors, 100)} ... ${icon(icClip, 34)}`, answer: '7', boxes: true },
        ],
        hints: ['Đếm số ghim giấy nằm giữa hai đường kẻ chấm ở hai đầu đồ vật.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB26Clips,
        q: '1. b) Đánh dấu ✓ vào ô trống trước đồ vật dài nhất.\nc) Đánh dấu ✓ vào ô trống trước đồ vật ngắn nhất.',
        rows: [
          { left: 'b) Dài nhất:', options: ['Bút chì', 'Bút mực', 'Thước kẻ', 'Cái kéo'], answer: 'Thước kẻ' },
          { left: 'c) Ngắn nhất:', options: ['Bút chì', 'Bút mực', 'Thước kẻ', 'Cái kéo'], answer: 'Bút chì' },
        ],
        hints: ['Bút chì dài 5 ghim, bút mực 6 ghim, thước kẻ 10 ghim, kéo 7 ghim.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB26Clips,
        q: '1. d) Viết tên đồ vật vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: '– Đồ vật dài hơn kéo là ...', answer: 'thước kẻ', validate: textValidate('thước kẻ'), tiles: ['bút chì', 'bút mực', 'thước kẻ'], tileOne: true },
          { label: '– Đồ vật ngắn hơn bút mực là ...', answer: 'bút chì', validate: textValidate('bút chì'), tiles: ['bút chì', 'thước kẻ', 'kéo'], tileOne: true },
        ],
        hints: ['Kéo dài 7 ghim: đồ vật nào dài hơn 7 ghim? Bút mực dài 6 ghim: đồ vật nào ngắn hơn 6 ghim?'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB26Animals,
        q: `2. Quan sát tranh và trả lời.\na) Viết số thích hợp vào ô trống.\n${mau('')} ${icon(icHedgehog, 46)} ${given(2)} ${icon(icLeaf, 16)}`,
        blanks: [
          { label: `${icon(icFox, 46)} ... ${icon(icLeaf, 16)}`, answer: '5', boxes: true },
          { label: `${icon(icUnicorn, 46)} ... ${icon(icLeaf, 16)}`, answer: '7', boxes: true },
          { label: `${icon(icRabbit, 46)} ... ${icon(icLeaf, 16)}`, answer: '5', boxes: true },
          { label: `${icon(icGiraffe, 46)} ... ${icon(icLeaf, 16)}`, answer: '10', boxes: true },
        ],
        hints: ['Mỗi khoảng giữa hai đường kẻ chấm cao bằng một chiếc lá. Đếm từ dưới chân lên tới đỉnh đầu con vật.'],
      },
      {
        type: 'compare', section: 'Tiết 1', img: imgB26Animals,
        q: '2. b) Đánh dấu ✓ vào ô trống trước con vật cao nhất.\nc) Đánh dấu ✓ vào ô trống trước con vật thấp nhất.',
        rows: [
          { left: 'b) Cao nhất:', options: ['Nhím', 'Cáo', 'Ngựa một sừng', 'Thỏ', 'Hươu cao cổ'], answer: 'Hươu cao cổ' },
          { left: 'c) Thấp nhất:', options: ['Nhím', 'Cáo', 'Ngựa một sừng', 'Thỏ', 'Hươu cao cổ'], answer: 'Nhím' },
        ],
        hints: ['Nhím cao 2 lá, cáo 5 lá, ngựa một sừng 7 lá, thỏ 5 lá, hươu cao cổ 10 lá.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB26Animals, multi: true,
        q: '2. d) Đánh dấu ✓ vào các ô trống trước các con vật cao bằng nhau.',
        options: ['Nhím', 'Cáo', 'Ngựa một sừng', 'Thỏ', 'Hươu cao cổ'],
        answer: [1, 3],
        hints: ['Tìm hai con vật cùng cao 5 lá.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `3. Quan sát, ước lượng rồi viết số thích hợp vào ô trống (theo mẫu).\n${mau('')} ${icon(imgB26Comb, 190)} ${given(7)} ${icon(icClip, 34)}`,
        blanks: [
          { label: `${icon(imgB26Paste, 190)} ... ${icon(icClip, 34)}`, answer: '5', boxes: true },
          { label: `${icon(imgB26Brush, 190)} ... ${icon(icClip, 34)}`, answer: '6', boxes: true },
          { label: `${icon(imgB26Spoon, 190)} ... ${icon(icClip, 34)}`, answer: '5', boxes: true },
          { label: `${icon(imgB26Fork, 190)} ... ${icon(icClip, 34)}`, answer: '4', boxes: true },
          { label: `${icon(imgB26Ladle, 190)} ... ${icon(icClip, 34)}`, answer: '8', boxes: true },
        ],
        hints: ['Hình dung xếp tiếp các ghim giấy cùng cỡ cho tới đường kẻ chấm ở đầu kia đồ vật, rồi đếm.'],
      },
      {
        type: 'match', section: 'Tiết 2', img: imgB26Measure,
        // 📏 Thước: toạ độ theo bai26_t2_q1_measure.svg; 1 cm = 47,5.
        rulerPlay: {
          points: { _a1: [20, 64], _a2: [400, 64], _b1: [20, 158], _b2: [305, 158], _c1: [20, 250], _c2: [257.5, 250], _d1: [20, 330], _d2: [495, 330] },
          segs: [['_a1', '_a2'], ['_b1', '_b2'], ['_c1', '_c2'], ['_d1', '_d2']], unit: 'cm', per: 47.5,
        },
        q: '1. Đo rồi nối đồ vật với số đo độ dài thích hợp.',
        left: [
          { id: 'brush', text: 'Bàn chải đánh răng' },
          { id: 'paste', text: 'Tuýp kem đánh răng' },
          { id: 'nail', text: 'Cái đinh' },
          { id: 'hammer', text: 'Cái búa' },
        ],
        right: [
          { id: 'c5', text: '5 cm' },
          { id: 'c6', text: '6 cm' },
          { id: 'c10', text: '10 cm' },
          { id: 'c8', text: '8 cm' },
        ],
        pairs: [['brush', 'c8'], ['paste', 'c6'], ['nail', 'c5'], ['hammer', 'c10']],
        hints: ['Dùng 📏 Thước: chạm vào một đồ vật để đặt thước, vạch 0 ở đường kẻ chấm bên trái.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB26Seven, multi: true,
        q: '2. Tô màu vào những đồ vật có độ dài bằng 7 cm.',
        options: ['Ô tô', 'Đoàn tàu', 'Cái kéo'],
        answer: [0, 2],
        hints: ['Mỗi đồ vật bắt đầu ở vạch 0. Xem đầu kia của đồ vật chạm vạch số mấy trên thước.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. Viết số thích hợp vào ô trống (theo mẫu).\na) ${pic(imgB26CarA, 360)}\n${mau('7 − 2 = 5 (cm)')}`,
        blanks: [
          { label: `b) ${pic(imgB26CarB, 360)}<br>... − ... = ... (cm)`, answer: '8,2,6', boxes: true },
          { label: `c) ${pic(imgB26CarC, 360)}<br>... − ... = ... (cm)`, answer: '10,1,9', boxes: true },
          { label: `d) ${pic(imgB26CarD, 360)}<br>... − ... = ... (cm)`, answer: '9,2,7', boxes: true },
        ],
        hints: ['Xe không bắt đầu ở vạch 0. Lấy số ở đầu xe trừ số ở đuôi xe: ô tô từ vạch 2 tới vạch 7 dài 7 − 2 = 5 cm.'],
      },
    ],
  },

  // ── BÀI 27 (trang 37–40) ─────────────────────────────────────────────────
  {
    id: 'bai-27', number: 27, title: 'Thực hành ước lượng và đo độ dài',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB27Clips,
        q: '1. a) Viết số thích hợp vào ô trống.\nb) Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: `a) ${icon(icCrayon, 70)} ... ${icon(icClip, 34)}`, answer: '2', boxes: true },
          { label: `${icon(icPencil27, 100)} ... ${icon(icClip, 34)}`, answer: '3', boxes: true },
          { label: `${icon(icSharpener, 40)} ... ${icon(icClip, 34)}`, answer: '1', boxes: true },
          { label: 'b) Trong các đồ vật ở câu a, đồ vật dài nhất là ...', answer: 'bút chì', validate: textValidate('bút chì'), tiles: ['bút sáp', 'bút chì', 'gọt bút chì'], tileOne: true },
        ],
        hints: ['Đếm số ghim giấy nằm giữa hai đường kẻ chấm ở hai đầu mỗi đồ vật.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB27Hand,
        q: `2. Thực hành đo độ dài bằng gang tay của em rồi viết số thích hợp vào chỗ chấm (theo mẫu).\n${mau('Tấm gỗ dài 5 gang tay.')}`,
        blanks: [
          { label: '– Cặp sách của em dài khoảng ... gang tay.', answer: '3', validate: rangeValidate(1, 6) },
          { label: '– Bàn học của em dài khoảng ... gang tay.', answer: '8', validate: rangeValidate(3, 15) },
        ],
        hints: ['Xoè bàn tay, đặt ngón cái ở một đầu rồi đếm số gang tay tới đầu kia. Mỗi bạn có thể đo ra số khác nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB27Table,
        q: `3. Thực hành đo độ dài bằng thước kẻ rồi viết số thích hợp vào chỗ chấm (theo mẫu).\n${mau('Bàn dài bằng 5 cái thước kẻ.')}`,
        blanks: [
          { label: '– Bàn học của em dài khoảng ... cái thước kẻ.', answer: '5', validate: rangeValidate(2, 10) },
          { label: '– Bảng lớp em dài khoảng ... cái thước kẻ.', answer: '15', validate: rangeValidate(5, 30) },
        ],
        hints: ['Đặt thước kẻ nối tiếp nhau, đầu thước sau chạm đuôi thước trước, rồi đếm số lần đặt thước.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB27Wall,
        q: `4. Thực hành đo độ dài bằng bước chân của em rồi viết số thích hợp vào chỗ chấm (theo mẫu).\n${mau('Bức tường dài khoảng 9 bước chân.')}`,
        blanks: [
          { label: 'Bức tường phòng học lớp em dài khoảng ... bước chân.', answer: '20', validate: rangeValidate(8, 40) },
        ],
        hints: ['Đi dọc theo bức tường, gót chân sau chạm mũi chân trước, vừa đi vừa đếm bước.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. Khoanh vào chữ đặt trước câu trả lời thích hợp.',
        rows: [
          { left: 'a) Hộp bút của em dài khoảng:', options: ['A. 20 cm', 'B. 1 bước chân của em'], answer: 'A' },
          { left: 'b) Quyển sách của em dài khoảng:', options: ['A. 5 cm', 'B. 2 gang tay của em'], answer: 'B' },
          { left: 'c) Đồ vật nào dưới đây dài khoảng 4 gang tay của em?', options: ['A. Quyển vở', 'B. Bút chì', 'C. Cặp sách'], answer: 'C' },
        ],
        hints: ['5 cm chỉ dài bằng ngón tay. Một gang tay của em dài khoảng 10 cm đến 12 cm.'],
      },
      {
        type: 'match', section: 'Tiết 2', bigImg: true,
        q: '2. Nối đồ vật với số đo độ dài thích hợp trong thực tế.',
        left: [
          { id: 'pencil', img: imgB27Pencil, text: '' },
          { id: 'desk', img: imgB27Desk, text: '' },
          { id: 'floor', img: imgB27Floor, text: '' },
        ],
        right: [
          { id: 'step', text: '10 bước chân' },
          { id: 'cm', text: '10 cm' },
          { id: 'hand', text: '10 gang tay' },
        ],
        pairs: [['pencil', 'cm'], ['desk', 'hand'], ['floor', 'step']],
        hints: ['Bút chì ngắn nhất, nền nhà dài nhất. 10 cm ngắn hơn 10 gang tay, 10 gang tay ngắn hơn 10 bước chân.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB27Floors,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nNền nhà Nam và nền nhà Việt cùng được lát bởi một loại gạch men.',
        blanks: [
          { label: 'a) Nền nhà Nam dài ... viên gạch men.', answer: '11' },
          { label: 'b) Nền nhà Việt dài ... viên gạch men.', answer: '10' },
          { label: 'c) Nền nhà ... dài hơn nền nhà ...', answer: 'Nam,Việt', validate: listValidate(['Nam', 'Việt']), tiles: ['Nam', 'Việt'] },
        ],
        hints: ['Đếm số viên gạch trên một hàng, theo chiều mũi tên.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB27Buildings,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nCác tầng của hai toà nhà trên cao bằng nhau.',
        blanks: [
          { label: 'a) Toà nhà A cao ... tầng.', answer: '9' },
          { label: 'b) Toà nhà B cao ... tầng.', answer: '8' },
          { label: 'c) Toà nhà A ... toà nhà B.', answer: 'cao hơn', validate: textValidate('cao hơn'), tiles: HEIGHT3, tileOne: true },
        ],
        hints: ['Đếm số hàng cửa sổ của mỗi toà nhà, mỗi hàng là một tầng.'],
      },
    ],
  },
];
