/**
 * Vở bài tập Toán 3, Tập hai: Bài 68–71 (sách trang 82–95).
 * Tiền Việt Nam; luyện tập chung (xem đồng hồ, xem lịch, tiền); nhân và chia số có
 * năm chữ số với (cho) số có một chữ số.
 */
import { stripVN, dsValidate, exprValidate } from '../grade3Workbook.js';
import imgB68Pigs from '../../assets/grade3-workbook-2/bai68_t1_q1_pigs.svg';
import imgB68Note5000 from '../../assets/grade3-workbook-2/bai68_note_5000.svg';
import imgB68Note10000 from '../../assets/grade3-workbook-2/bai68_note_10000.svg';
import imgB68Note20000 from '../../assets/grade3-workbook-2/bai68_note_20000.svg';
import imgB68Items from '../../assets/grade3-workbook-2/bai68_t1_q3_items.svg';
import imgB68Sweets from '../../assets/grade3-workbook-2/bai68_t2_q1_sweets.svg';
import imgB68Bread from '../../assets/grade3-workbook-2/bai68_t2_q1_bread.svg';
import imgB68Donut from '../../assets/grade3-workbook-2/bai68_t2_q1_donut.svg';
import imgB68Candy from '../../assets/grade3-workbook-2/bai68_t2_q1_candy.svg';
import imgB69T1Clocks from '../../assets/grade3-workbook-2/bai69_t1_q1_clocks.svg';
import imgB69June from '../../assets/grade3-workbook-2/bai69_t1_q2_june.svg';
import imgB69T1Q5Clocks from '../../assets/grade3-workbook-2/bai69_t1_q5_clocks.svg';
import imgB69Subjects from '../../assets/grade3-workbook-2/bai69_t2_q1_subjects.svg';
import imgB69July from '../../assets/grade3-workbook-2/bai69_t2_q3_july.svg';
import imgB69T3Clocks from '../../assets/grade3-workbook-2/bai69_t3_q1_clocks.svg';
import imgB69T3Q4Clocks from '../../assets/grade3-workbook-2/bai69_t3_q4_clocks.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// The book prints numbers from 1 000 up with a thin space ("24 316"). Labels use a
// no-break space so a number never wraps in the middle.
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '\u00a0');

// A number answer: "72948", "72 948" and "72.948" are all the same answer.
const numOk = (n) => (v) => {
  const d = String(v).replace(/[\s.\u00a0\u202f]/g, '');
  return /^\d+$/.test(d) && Number(d) === n;
};
// One blank row; with 2+ numbers (one per "...") each slot is compared in order.
function N(label, ...ns) {
  if (ns.length === 1) return { label, answer: String(ns[0]), validate: numOk(ns[0]) };
  return {
    label,
    answer: ns.join(','),
    validate: (v) => {
      const p = String(v).split(',');
      return p.length === ns.length && p.every((x, i) => numOk(ns[i])(x));
    },
  };
}
// "Đ, S" row.
const DS = (label, isTrue) => ({ label, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });
// "a × b =" (Đặt tính rồi tính): one answer line per phép tính, computed here.
const mul = (a, b) => N(`${fmt(a)} × ${b} =`, a * b);
const div = (a, b) => N(`${fmt(a)} : ${b} =`, a / b);

// A column multiplication as the book prints it ("Tính."): the factors stacked,
// a rule, then the product line (a "..." there becomes the answer input).
const colMul = (a, b, res) => `<span style="display:inline-grid;grid-template-columns:auto auto;column-gap:6px;align-items:center;font-variant-numeric:tabular-nums;margin:4px 0;vertical-align:middle">`
  + `<span style="grid-row:1 / 3;padding-bottom:2px">×</span><span style="text-align:right">${fmt(a)}</span><span style="text-align:right">${b}</span>`
  + `<span style="grid-column:1 / 3;border-top:2px solid currentColor;text-align:right;padding-top:4px">${res}</span></span>`;

// A long division laid out like the book: dividend | divisor, the quotient under the
// divisor. `steps` are the book's written lines under the dividend, one string per
// line with one character per digit column (space = empty column).
function longDiv(dividend, divisor, quotient, steps = []) {
  const digits = String(dividend).split('');
  const n = digits.length;
  const split = n - 3; // thin space before the last three digits
  const cols = [];
  for (let i = 0; i < n; i++) { if (i === split) cols.push('.3em'); cols.push('.62em'); }
  const colOf = (i) => i + 1 + (i >= split ? 1 : 0);
  const cell = (ch, row, i) => (ch === ' ' ? '' : `<span style="grid-row:${row};grid-column:${colOf(i)};text-align:center">${ch}</span>`);
  const right = n + 2;
  const rows = [digits, ...steps.map(s => s.padEnd(n).split(''))];
  const body = rows.map((r, ri) => r.map((ch, i) => cell(ch, ri + 1, i)).join('')).join('');
  return `<span style="display:inline-grid;grid-template-columns:${cols.join(' ')} auto;row-gap:2px;font-variant-numeric:tabular-nums;margin:4px 0;vertical-align:top">`
    + body
    + `<span style="grid-row:1;grid-column:${right};border-left:2px solid currentColor;border-bottom:2px solid currentColor;padding:0 10px 2px 14px;margin-left:10px">${divisor}</span>`
    + `<span style="grid-row:2;grid-column:${right};border-left:2px solid currentColor;padding:4px 0 0 8px;margin-left:10px">${quotient}</span>`
    + '</span>';
}

// The book's chain of boxes: a blue given number, then arrows with the operation
// written above them (14 071, arrow "× 7", box, arrow "− 5 928", box).
const pill = (s) => `<span style="display:inline-block;padding:2px 14px;border:2px solid #3FA7DC;border-radius:999px;background:#CDEBFA;font-weight:700">${s}</span>`;
const ar = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:stretch;vertical-align:middle;margin:0 6px;min-width:3.2em;white-space:nowrap">`
  + `<span style="text-align:center;font-size:.9em;line-height:1.1">${op}</span>`
  + `<svg viewBox="0 0 60 10" preserveAspectRatio="none" style="width:100%;height:10px"><path d="M1 5 H52" stroke="currentColor" stroke-width="2.2"/><path d="M50 1 L59 5 L50 9 Z" fill="currentColor"/></svg></span>`;

// A small picture inside a blank label (a tờ tiền, a loại bánh).
const pic = (src, h, alt) => `<img src="${src}" alt="${alt}" style="height:${h}px;vertical-align:middle;margin-right:6px">`;

// A school subject written in the blank, with or without the word "môn".
const subjectOk = (name) => {
  const norm = (s) => stripVN(s).replace(/[^a-z]/g, '').replace(/^mon/, '');
  const target = norm(name);
  return (v) => norm(v) === target;
};
// A weekday after the printed "thứ": "Tư", "4", "bốn" (and "thứ Tư" copied in full).
const weekdayOk = (word, num) => {
  const ok = new Set([stripVN(word), String(num)]);
  return (v) => ok.has(stripVN(v).replace(/\s+/g, '').replace(/^thu/, ''));
};
// Every number the child wrote, in any order ("5, 12, 19, 26" / "5; 12; 19 và 26").
const numSetOk = (list) => {
  const target = [...list].sort((a, b) => a - b).join('|');
  return (v) => (String(v).match(/\d+/g) || []).map(Number).sort((a, b) => a - b).join('|') === target;
};
// A date written in the "ngày ..." blank: "11", "11 tháng 7", "11/7".
const dayOk = (d, m) => (v) => {
  const x = stripVN(v).replace(/\s+/g, ' ').trim().replace(/^ngay /, '');
  return [String(d), `${d} thang ${m}`, `${d}/${m}`, `${d}-${m}`].includes(x);
};

// Every printed number keeps its thin space but never wraps in the middle
// ("20 000 đồng" must not break into "20 / 000 đồng" on a phone).
const nb = (t) => (typeof t === 'string' ? t.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00a0') : t);
function keepNumbersTogether(units) {
  units.forEach(u => u.questions.forEach(q => {
    q.q = nb(q.q);
    if (q.hints) q.hints = q.hints.map(nb);
    if (q.options) q.options = q.options.map(nb);
    if (q.blanks) q.blanks.forEach(b => { b.label = nb(b.label); });
    if (q.type === 'compare') q.rows.forEach(r => { r.left = nb(r.left); });
    if (q.type === 'table') q.rows = q.rows.map(r => r.map(nb));
  }));
  return units;
}

export const BAI_68_71 = keepNumbersTogether([
  // ── BÀI 68 (trang 82–84) ─────────────────────────────────────────────────
  {
    id: 'bai-68', number: 68, title: 'Tiền Việt Nam',
    questions: [
      {
        type: 'compare', section: 'Tiết 1', img: imgB68Pigs,
        q: '1. Tô màu đỏ cho chú lợn đựng ít tiền nhất, màu xanh cho các chú lợn còn lại.',
        rows: [
          { left: 'Chú lợn bên trái', options: ['Đỏ', 'Xanh'], answer: 'Xanh' },
          { left: 'Chú lợn bên phải', options: ['Đỏ', 'Xanh'], answer: 'Đỏ' },
          { left: 'Chú lợn ở giữa', options: ['Đỏ', 'Xanh'], answer: 'Xanh' },
        ],
        hints: ['Cộng số tiền trong từng chú lợn: bên trái 2 000 + 10 000 + 10 000, ở giữa 50 000 + 50 000, bên phải 20 000.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đ, S?\nMẹ vào một cửa hàng mua rau hết 20 000 đồng và mua thịt hết 70 000 đồng. Mẹ đưa cho cô bán hàng tờ 100 000 đồng. Số tiền cô bán hàng có thể trả lại cho mẹ là:',
        blanks: [
          DS(`a) ${pic(imgB68Note10000, 52, 'tờ 10 000 đồng')} ...`, true),
          DS(`b) ${pic(imgB68Note5000, 52, 'tờ 5 000 đồng')}${pic(imgB68Note5000, 52, 'tờ 5 000 đồng')} ...`, true),
          DS(`c) ${pic(imgB68Note20000, 52, 'tờ 20 000 đồng')} ...`, false),
        ],
        hints: ['Mẹ mua hết 20 000 + 70 000 = 90 000 đồng, nên được trả lại 100 000 − 90 000 = 10 000 đồng.', 'Hai tờ 5 000 đồng cũng là 10 000 đồng.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB68Items,
        q: '3. Viết số thích hợp vào chỗ chấm.\na) Mỗi món đồ sau được trả bằng một tờ tiền trong hình dưới đây. Biết giá tiền của bút bi thấp nhất, giá tiền của chiếc hộp cười cao nhất và giá tiền của quả bóng gỗ gấp đôi giá tiền của quyển vở.\nVậy giá tiền của mỗi món đồ là:',
        blanks: [
          N('Bút bi: ... đồng; chiếc hộp cười: ... đồng;', 2000, 50000),
          N('quả bóng gỗ: ... đồng; quyển vở: ... đồng.', 20000, 10000),
          N('b) Nam muốn mua 4 chiếc bút bi. Nam phải trả ... đồng.', 8000),
        ],
        hints: ['Tờ tiền ít nhất (2 000 đồng) là giá bút bi, tờ nhiều nhất (50 000 đồng) là giá hộp cười.', 'Còn lại 10 000 và 20 000 đồng: 20 000 gấp đôi 10 000.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB68Sweets,
        q: '1. Viết số thích hợp vào chỗ chấm.\nGiá tiền của từng loại bánh kẹo là:',
        blanks: [
          N(`${pic(imgB68Bread, 34, 'bánh mì')}: ... đồng`, 3000),
          N(`${pic(imgB68Donut, 34, 'bánh vòng')}: ... đồng`, 2000),
          N(`${pic(imgB68Candy, 40, 'kẹo gậy')}: ... đồng`, 5000),
        ],
        hints: ['Khay thứ ba chỉ có bánh mì: 3 000 đồng.', 'Bánh vòng: 5 000 − 3 000. Kẹo gậy: 10 000 − 5 000.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.\nVào ngày đầu tháng và rằm, mẹ mua hoa cúc với giá 6 000 đồng một bông. Vào ngày bình thường, với 6 000 đồng, mẹ mua được 2 bông hoa cúc.',
        blanks: [
          N('a) Ngày thường, giá tiền một bông hoa cúc là ... đồng.', 3000),
          N('b) Giá tiền một bông hoa cúc vào ngày thường ít hơn giá tiền một bông hoa cúc vào ngày đầu tháng và rằm là ... đồng.', 3000),
        ],
        hints: ['Ngày thường: 6 000 : 2.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Viết số thích hợp vào chỗ chấm.\nBi làm một máy phát điện đồ chơi. Bánh răng và dây điện, Bi tháo ra từ những chiếc xe hỏng của em Gấu, còn lại Bi phải mua một số vật dụng như trong bảng bên:',
        headers: ['Loại', 'Giá tiền (đồng)'],
        rows: [['Nam châm', '30 000'], ['Bóng đèn điện tử', '4 000'], ['Bảng lắp', '20 000']],
        blanks: [
          N('a) Để làm máy phát điện đồ chơi, Bi cần bỏ ra ... đồng.', 54000),
          N('b) Bi bán máy phát điện đồ chơi cho một cửa hàng lưu niệm được 100 000 đồng. Như vậy, so với số tiền bỏ ra, Bi đã được thêm ... đồng.', 46000),
        ],
        hints: ['Cộng giá ba vật dụng: 30 000 + 4 000 + 20 000.', 'b) Lấy 100 000 trừ đi số tiền Bi đã bỏ ra.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\n• 5 tờ 10 000 đồng đổi được 1 tờ 50 000 đồng.',
        blanks: [
          N('• ... tờ 10 000 đồng đổi được 1 tờ 100 000 đồng.', 10),
          N('• ... tờ 2 000 đồng đổi được 1 tờ 20 000 đồng.', 10),
          N('• 4 tờ 5 000 đồng đổi được ... tờ 10 000 đồng.', 2),
        ],
        hints: ['100 000 là 10 lần 10 000.', '4 tờ 5 000 đồng là 20 000 đồng.'],
      },
    ],
  },

  // ── BÀI 69 (trang 85–89) ─────────────────────────────────────────────────
  {
    id: 'bai-69', number: 69, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB69T1Clocks,
        q: '1. Viết số thích hợp vào chỗ chấm.\nDưới đây là đồng hồ chỉ thời gian bắt đầu của 4 môn học trong buổi sáng.\nSáng nay, Rô-bốt sẽ học 4 môn: Đạo đức, Toán, Tiếng Việt và Mĩ thuật. Biết môn Toán bắt đầu sớm nhất và môn Đạo đức học vào tiết cuối cùng. Rô-bốt học Mĩ thuật sau khi học Tiếng Việt. Hỏi Rô-bốt bắt đầu mỗi môn học vào lúc mấy giờ?',
        blanks: [
          N('Đạo đức: ... giờ ... phút', 10, 20),
          N('Toán: ... giờ ... phút', 8, 0),
          N('Tiếng Việt: ... giờ ... phút', 8, 40),
          N('Mĩ thuật: ... giờ ... phút', 9, 40),
        ],
        hints: ['Toán học sớm nhất, Đạo đức học muộn nhất; Tiếng Việt học trước Mĩ thuật.', 'Bốn đồng hồ chỉ 8 giờ, 8 giờ 40 phút, 9 giờ 40 phút, 10 giờ 20 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB69June,
        q: '2. Quan sát tờ lịch tháng 6 rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          N('a) Một túi bánh mì có hạn sử dụng là 4 ngày kể từ ngày sản xuất. Mai đã mua 1 túi bánh mì có ghi ngày sản xuất là ngày 8 tháng 6. Vậy hạn sử dụng của túi bánh mì đó là ngày ... tháng ...', 12, 6),
          N('b) Một hộp cà phê hoà tan có 10 gói. Mỗi ngày bố của Mai đều pha 1 gói cà phê. Bố đã mở hộp cà phê đó vào thứ Năm của tuần thứ hai. Bố sẽ mở hộp cà phê tiếp theo vào ngày ... tháng ...', 19, 6),
          N('c) Gia đình Mai đã lên kế hoạch đi chơi vào ngày 26 tháng 6. Nhưng vì lịch công tác đột xuất của bố mà gia đình phải dời kế hoạch đó sang ngày Chủ nhật của tuần kế tiếp, đó là ngày ... tháng ...', 3, 7),
        ],
        hints: [
          'a) Đếm thêm 4 ngày từ ngày 8 tháng 6.',
          'b) Thứ Năm của tuần thứ hai là ngày 9 tháng 6. Hộp có 10 gói nên dùng từ ngày 9 đến hết ngày 18.',
          'c) Ngày 26 tháng 6 là Chủ nhật. Tháng 6 có 30 ngày.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.\nMẹ đưa Nam đi mua sách. Nam đã chọn một cuốn sách về khoa học. Mẹ đã đưa cho người bán 2 tờ 20 000 đồng và 1 tờ 10 000 đồng. Sau đó, người bán đưa lại cho mẹ 5 000 đồng tiền thừa.',
        blanks: [N('Cuốn sách đó có giá ... đồng.', 45000)],
        hints: ['Mẹ đã đưa 20 000 + 20 000 + 10 000 = 50 000 đồng, rồi trừ đi tiền thừa.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [N('a) 4 giờ = ... phút', 240), N('b) 4 giờ 30 phút = ... phút', 270)],
        hints: ['1 giờ = 60 phút, nên 4 giờ = 60 × 4 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB69T1Q5Clocks,
        q: '5. Viết số thích hợp vào chỗ chấm.\nDưới đây là đồng hồ chỉ thời gian lúc Rô-bốt bắt đầu rời khỏi nhà và lúc Rô-bốt đến sân bóng.',
        blanks: [N('Rô-bốt đi từ nhà đến sân bóng hết ... phút.', 6)],
        hints: ['Đọc từng đồng hồ đến từng phút: kim dài chỉ vạch phút nào?', 'Rô-bốt rời nhà lúc 5 giờ 17 phút và đến sân bóng lúc 5 giờ 23 phút.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB69Subjects,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\na) Sáng thứ Hai, Rô-bốt có ba môn học là: Toán, Âm nhạc và Tiếng Anh. Dưới đây là thời gian mà Rô-bốt đang tham gia học các môn học đó.\nb) Chiều thứ Hai, Rô-bốt có ba môn học là: Toán, Tiếng Việt và Giáo dục thể chất. Dưới đây là thời gian mà Rô-bốt đang tham gia học các môn học đó.',
        blanks: [
          { label: 'a) Rô-bốt học môn ... sau cùng.', answer: 'Tiếng Anh', validate: subjectOk('Tiếng Anh') },
          { label: 'b) Rô-bốt học môn ... đầu tiên.', answer: 'Tiếng Việt', validate: subjectOk('Tiếng Việt') },
        ],
        hints: [
          'a) Âm nhạc lúc 9 giờ 40 phút, Tiếng Anh lúc 10 giờ 20 phút, Toán lúc 8 giờ 40 phút.',
          'b) Buổi chiều: Toán lúc 2 giờ 30 phút, Giáo dục thể chất lúc 3 giờ 30 phút, Tiếng Việt lúc 1 giờ 50 phút.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.\nMai mua 2 cái bút chì và 1 cục tẩy hết 13 000 đồng. Việt mua 1 cái bút chì và 1 cục tẩy như thế hết 8 000 đồng.',
        blanks: [N('Vậy: 1 cái bút chì có giá là ... đồng, 1 cục tẩy có giá là ... đồng.', 5000, 3000)],
        hints: ['Mai mua nhiều hơn Việt đúng 1 cái bút chì và trả nhiều hơn 13 000 − 8 000 đồng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB69July,
        q: '3. Quan sát tờ lịch tháng 7 rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Mai học bơi vào sáng thứ Bảy hằng tuần. Vậy trong tháng 7, Mai học bơi vào các ngày: ...', answer: '5, 12, 19, 26', validate: numSetOk([5, 12, 19, 26]) },
          { label: 'b) Vào ngày 20 tháng 7, gia đình Nam hoàn thành chuyến đi xuyên Việt kéo dài 10 ngày.<br>Vậy gia đình Nam bắt đầu chuyến đi đó vào ngày ...', answer: '11 tháng 7', validate: dayOk(11, 7) },
        ],
        hints: ['a) Xem cột Thứ Bảy của tờ lịch.', 'b) Chuyến đi 10 ngày kết thúc vào ngày 20: đếm lùi để ngày 20 là ngày thứ mười.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nMai sinh ngày 23 tháng 4 và Việt sinh ngày 13 tháng 4. Biết năm nay, sinh nhật của Việt là một ngày Chủ nhật.',
        blanks: [{ label: 'Vậy năm nay, sinh nhật của Mai là thứ ...', answer: 'Tư', validate: weekdayOk('Tư', 4) }],
        hints: ['Ngày 13 tháng 4 là Chủ nhật thì ngày 20 tháng 4 cũng là Chủ nhật. Đếm tiếp đến ngày 23.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB69T3Clocks,
        q: '1. Khoanh vào chữ đặt dưới câu trả lời đúng.\na) Bây giờ là 8 giờ. Một giờ trước, trọng tài đã thổi còi bắt đầu hiệp 1 của trận bóng đá giữa Việt Nam và Thái Lan. Hỏi đồng hồ nào chỉ lúc trận đấu bắt đầu?\nb) 30 phút trước là 2 giờ 15 phút, các bạn lớp 3A bắt đầu làm bài kiểm tra cuối học kì 2. Hỏi đồng hồ nào chỉ thời điểm bây giờ?',
        rows: [
          { left: 'a) Đồng hồ chỉ lúc trận đấu bắt đầu:', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          { left: 'b) Đồng hồ chỉ thời điểm bây giờ:', options: ['A', 'B', 'C', 'D'], answer: 'D' },
        ],
        hints: ['a) Một giờ trước 8 giờ là 7 giờ.', 'b) 2 giờ 15 phút thêm 30 phút là 2 giờ 45 phút: kim dài chỉ số 9.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 3 giờ 20 phút = ... phút', 200),
          N('b) 1 tuần 3 ngày = ... ngày', 10),
          N('c) 2 ngày 6 giờ = ... giờ', 54),
          N('d) 1 năm 4 tháng = ... tháng', 16),
        ],
        hints: ['1 giờ = 60 phút; 1 tuần = 7 ngày; 1 ngày = 24 giờ; 1 năm = 12 tháng.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nGia đình Nam dự định về quê thăm ông bà vào thứ Bảy, ngày 6 tháng 11, nhưng hôm đó ông bà đi du lịch. Vì vậy, gia đình Nam đã lùi kế hoạch lại 1 tuần. Sau đó, vì ảnh hưởng của bão mà gia đình Nam phải lùi kế hoạch thêm 1 tuần nữa và họ về thăm ông bà vào Chủ nhật của tuần đó.',
        blanks: [N('Vậy gia đình Nam về quê thăm ông bà vào ngày ... tháng ...', 21, 11)],
        hints: ['Lùi 1 tuần: thứ Bảy ngày 13. Lùi thêm 1 tuần: thứ Bảy ngày 20. Chủ nhật là ngày hôm sau.'],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB69T3Q4Clocks,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBây giờ, bốn chiếc đồng hồ treo tường tại một cửa hàng hiển thị thời gian như hình bên:\nBiết trong số đó có:\n– Một đồng hồ chạy đúng giờ.\n– Một đồng hồ chạy chậm 5 phút.\n– Một đồng hồ chạy nhanh 5 phút.\n– Một đồng hồ bị hết pin từ hôm qua.\nHỏi bây giờ là mấy giờ?',
        options: ['4 giờ 25 phút', '4 giờ 15 phút', '8 giờ 55 phút', '4 giờ 20 phút'],
        answer: 3,
        hints: ['Bốn đồng hồ chỉ 4 giờ 25 phút, 4 giờ 15 phút, 8 giờ 55 phút và 4 giờ 20 phút.', 'Đồng hồ hết pin chỉ giờ khác hẳn. Giờ đúng nằm giữa giờ chậm 5 phút và giờ nhanh 5 phút.'],
      },
    ],
  },

  // ── BÀI 70 (trang 90–92) ─────────────────────────────────────────────────
  {
    id: 'bai-70', number: 70, title: 'Nhân số có năm chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          N(colMul(24316, 3, '...'), 72948),
          N(colMul(45107, 2, '...'), 90214),
          N(colMul(4713, 6, '...'), 28278),
        ],
        hints: ['Nhân lần lượt từ phải sang trái: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn, hàng chục nghìn; nhân được từ 10 trở lên thì nhớ sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [mul(13081, 7), mul(24170, 4)],
        hints: ['Viết thừa số thứ hai thẳng cột với hàng đơn vị của thừa số thứ nhất, rồi nhân từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đ, S?',
        blanks: [
          DS(`a) ${colMul(16242, 4, fmt(64968))} ...`, true),
          DS(`b) ${colMul(27063, 3, fmt(61089))} ...`, false),
        ],
        hints: ['Tự nhân lại từ phải sang trái rồi so với kết quả đã cho. Nhớ cộng phần nhớ vào hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mỗi lần may quần áo đồng phục cho công nhân, xưởng may dùng hết 12 150 m vải. Hỏi 3 lần may như vậy, xưởng may đã dùng hết bao nhiêu mét vải?',
        wordProblem: true,
        blanks: [N('Số mét vải', 36450)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [mul(12107, 8), mul(14019, 5), mul(13109, 7)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [
          N(`a) ${fmt(12000)} × 8 = ...`, 96000),
          N(`b) ${fmt(13000)} × 7 = ...`, 91000),
          N(`c) ${fmt(24000)} × 4 = ...`, 96000),
          N(`d) ${fmt(15000)} × 6 = ...`, 90000),
        ],
        hints: ['Nhẩm theo nghìn: 12 nghìn × 8 = 96 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số?',
        blanks: [N(`${pill(fmt(14071))} ${ar('× 7')} ... ${ar(`−\u00a0${fmt(5928)}`)} ...`, 98497, 92569)],
        hints: ['Tính lần lượt theo mũi tên: 14 071 × 7, rồi lấy kết quả trừ đi 5 928.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Hiện tại trong kho còn 8 000 <i>l</i> dầu. Người ta đã chuyển thêm dầu vào kho 3 lần, mỗi lần 1 400 <i>l</i> dầu. Hỏi sau khi chuyển, trong kho có tất cả bao nhiêu lít dầu?',
        wordProblem: true,
        blanks: [N('Số lít dầu', 12200)],
        hints: ['Tìm số lít dầu chuyển thêm: 1 400 × 3, rồi cộng với số dầu đang có trong kho.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Số?',
        blanks: [
          N(`a) ${pill(fmt(14000))} ${ar('× 2')} ... ${ar('× 3')} ...`, 28000, 84000),
          N(`b) ${pill(fmt(14000))} ${ar('× 3')} ... ${ar('× 2')} ...`, 42000, 84000),
        ],
        hints: ['Tính lần lượt theo mũi tên từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đặt tính rồi tính.',
        blanks: [mul(23072, 4), mul(15141, 6)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tính giá trị của biểu thức.',
        blanks: [
          { label: `${fmt(13081)} × 7 − ${fmt(37149)} = ...`, answer: '91567 − 37149', validate: exprValidate('91567 − 37149') },
          N('= ...', 54418),
        ],
        hints: ['Biểu thức có phép nhân và phép trừ: thực hiện phép nhân trước, rồi đến phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Mẹ đưa cho Mai 5 tờ tiền loại 10 000 đồng. Mai mua bút và vở hết 45 000 đồng. Hỏi Mai còn lại bao nhiêu tiền?',
        wordProblem: true,
        blanks: [N('Số tiền Mai còn lại (đồng)', 5000)],
        hints: ['Mẹ đưa cho Mai 10 000 × 5 đồng.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N(`a) Gấp số ${fmt(10500)} lên 4 lần rồi trừ đi ${fmt(25000)} ta được số ...`, 17000),
          N(`b) Gấp số ${fmt(12260)} lên 3 lần rồi cộng với ${fmt(24070)} ta được số ...`, 60850),
        ],
        hints: ['Gấp một số lên 4 lần: lấy số đó nhân với 4.'],
      },
    ],
  },

  // ── BÀI 71 (trang 93–95) ─────────────────────────────────────────────────
  {
    id: 'bai-71', number: 71, title: 'Chia số có năm chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          N(`a) ${longDiv(84625, 5, '...')}`, 16925),
          N(`b) ${longDiv(61432, 4, '...')}`, 15358),
        ],
        hints: ['Chia lần lượt từ trái sang phải, bắt đầu từ chữ số hàng cao nhất; mỗi lần chia xong thì hạ chữ số tiếp theo xuống.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [div(71628, 3), div(98376, 6)],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đ, S?',
        blanks: [
          DS(`a) ${longDiv(85348, 4, fmt(21337), ['013', '  14', '   28', '    0'])} ...`, true),
          DS(`b) ${longDiv(27045, 5, '549', [' 20', '  045', '    0'])} ...`, false),
        ],
        hints: ['Thử lại bằng phép nhân: thương × số chia phải bằng số bị chia.', 'b) Khi hạ 4 xuống mà 4 bé hơn 5 thì phải viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Một xưởng bánh kẹo, trong dịp tết Trung thu đã làm được 10 560 cái bánh. Người ta đã đóng số bánh đó vào các hộp, mỗi hộp 4 cái bánh. Hỏi đã đóng được bao nhiêu hộp bánh như vậy?',
        wordProblem: true,
        blanks: [N('Số hộp bánh', 2640)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [
          N(`a) ${longDiv(26375, 4, '...')}<br>Số dư: ...`, 6593, 3),
          N(`b) ${longDiv(34429, 5, '...')}<br>Số dư: ...`, 6885, 4),
        ],
        hints: ['Viết thương dưới số chia; số còn lại ở dòng cuối cùng là số dư. Số dư luôn bé hơn số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư.)',
        blanks: [
          N(`a) ${fmt(13765)} : 6 = ... (dư ...)`, 2294, 1),
          N(`b) ${fmt(29609)} : 7 = ... (dư ...)`, 4229, 6),
        ],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố dư trong phép chia 97 687 : 8 là:',
        options: ['5', '6', '7', '8'],
        answer: 2,
        hints: ['Đặt tính rồi chia từ trái sang phải. Nhớ rằng số dư phải bé hơn 8.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. May mỗi bộ quần áo bảo hộ lao động hết 4 m vải. Hỏi với 10 243 m vải có thể may được nhiều nhất bao nhiêu bộ quần áo như vậy và còn thừa mấy mét vải?',
        wordProblem: true,
        subQuestions: false,
        blanks: [N('Số bộ quần áo may được', 2560), N('Số mét vải còn thừa', 3)],
        hints: ['Lấy 10 243 chia cho 4: thương là số bộ quần áo, số dư là số mét vải còn thừa.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính nhẩm.',
        blanks: [
          N(`a) ${fmt(27000)} : 3 = ...`, 9000),
          N(`b) ${fmt(25000)} : 5 = ...`, 5000),
          N(`c) ${fmt(36000)} : 6 = ...`, 6000),
          N(`d) ${fmt(81000)} : 9 = ...`, 9000),
        ],
        hints: ['Nhẩm theo nghìn: 27 nghìn : 3 = 9 nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đặt tính rồi tính.',
        blanks: [div(32675, 5), div(41824, 8)],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả lớn nhất?',
        options: ['15 762 : 3', '30 852 : 6', '35 945 : 7'],
        answer: 0,
        hints: ['Tính từng phép chia rồi so sánh các thương.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Có 15 050 kg hải sản đông lạnh được đóng gói vào các túi, mỗi túi 3 kg. Hỏi cần ít nhất bao nhiêu túi để đóng gói hết số hải sản đó?',
        wordProblem: true,
        blanks: [N('Số túi cần ít nhất', 5017)],
        hints: ['15 050 : 3 = 5 016 (dư 2). Số hải sản còn dư cũng cần thêm một túi nữa.'],
      },
    ],
  },
]);
