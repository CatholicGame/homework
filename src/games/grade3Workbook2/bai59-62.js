/**
 * Vở bài tập Toán 3 — Tập hai: Bài 59–62 (sách trang 54–66).
 * Các số có năm chữ số, số 100 000; so sánh các số trong phạm vi 100 000;
 * làm tròn số đến hàng nghìn, hàng chục nghìn; luyện tập chung.
 */
import { blank, mau, dsValidate, stripVN } from '../grade3Workbook.js';
import imgB59Line from '../../assets/grade3-workbook-2/bai59_t1_q2_numberline.svg';
import imgB59Photos from '../../assets/grade3-workbook-2/bai59_t3_q4_photos.svg';
import imgB60Roads from '../../assets/grade3-workbook-2/bai60_t1_q3_roads.svg';
import imgB62Airport from '../../assets/grade3-workbook-2/bai62_t1_q4_airport.svg';
import imgB62Venn from '../../assets/grade3-workbook-2/bai62_t3_q1_venn.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// A number >= 1000 is printed with a thin space ("23 451"): the child may type
// it with or without spaces, or with dots ("23.451").
const digits = (v) => String(v).replace(/[\s.  ]/g, '');

// One number in one blank.
const numV = (n) => (v) => digits(v) === String(n);
function N(label, n) {
  return { label, answer: String(n), validate: numV(n) };
}

// "Khoanh vào chữ" written as one letter (A/B/C tiles), so it can share a question with fill blanks.
const letterV = (L) => (v) => String(v).trim().toUpperCase() === L;

// Several "..." in one row: one number per slot, in the book's order.
function NN(label, ...ns) {
  return {
    label,
    answer: ns.map(String).join(','),
    validate: (v) => {
      const got = String(v).split(',').map(digits);
      return got.length === ns.length && got.every((g, i) => g === String(ns[i]));
    },
  };
}

// Several numbers written in ONE blank, separated by commas / "và".
const splitList = (v) => String(v).split(/\s*(?:,|;|\svà\s)\s*/).map(digits).filter(Boolean);
function numSetV(ns) {
  const target = ns.map(String).sort().join('|');
  return (v) => splitList(v).sort().join('|') === target;
}
function numOrderV(ns) {
  const target = ns.map(String).join('|');
  return (v) => splitList(v).join('|') === target;
}

// A number read out in words: "mốt/một", "lăm/năm", "linh/lẻ", "tư/bốn",
// "nghìn/ngàn" are all accepted, with any case and spacing.
const foldRead = (s) => ` ${String(s).toLowerCase().replace(/[.,]/g, ' ').trim().replace(/\s+/g, ' ')} `
  .replace(/ mốt /g, ' một ').replace(/ lăm /g, ' năm ').replace(/ linh /g, ' lẻ ')
  .replace(/ tư /g, ' bốn ').replace(/ ngàn /g, ' nghìn ').trim();
const readV = (words) => (v) => foldRead(v) === foldRead(words);
const readBlank = (words) => blank(words, { validate: readV(words) });
// The answer is padded to the printed length ("49 997" = 6 characters) so a
// blank column is exactly as wide as its given "49 994" neighbours, while it
// still reads as a plain integer (numeric keypad).
const numBlank = (n) => blank(String(n).padEnd(String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ').length), { validate: numV(n) });

// A name typed or tapped from the tiles ("Kĩ năng sống" / "Kỹ năng sống",
// with or without accents, "tàu"/"dân tộc" in front or not).
const nameKey = (s) => stripVN(s).replace(/ky/g, 'ki').replace(/^\s*(tau|dan toc|chuong trinh|thanh pho)\s+/, '')
  .replace(/[^a-z0-9]/g, '');
const nameV = (name) => (v) => nameKey(v) === nameKey(name);
function namesV(names) {
  const target = names.map(nameKey).sort().join('|');
  return (v) => stripVN(v).split(/\s*(?:,|;|\bva\b)\s*/).map(nameKey).filter(Boolean).sort().join('|') === target;
}

// City letters ("D", "thành phố D", "A và C", "C, A").
function cityV(letters) {
  const target = [...letters].sort().join('');
  return (v) => {
    const got = stripVN(v).toUpperCase().replace(/THANH PHO/g, ' ').replace(/\bVA\b/g, ' ').replace(/[^A-Z]/g, '').split('');
    return got.length === letters.length && [...got].sort().join('') === target;
  };
}

// "Đ, S ?" box after a statement.
const DS = (label, ok) => ({ label: `${label} ...`, boxes: true, answer: ok ? 'Đ' : 'S', validate: dsValidate(ok) });

// A number card of the book, printed inline.
const card = (d) => `<span style="display:inline-block;min-width:1.6em;padding:2px 6px;margin:0 3px;border:2px solid #1E9AD6;border-radius:6px;background:#B8E5FC;font-weight:700;text-align:center">${d}</span>`;

// A number printed with a thin space ("20 060") must not break over two lines
// in the question text: its spaces become non-breaking (display only; answers
// and compare options/answers are left as they are).
const NB = (s) => (typeof s === 'string' ? s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1 ') : s);
function keepNumbersTogether(units) {
  for (const u of units) {
    for (const q of u.questions) {
      q.q = NB(q.q);
      (q.blanks || []).forEach((b) => { b.label = NB(b.label); });
      if (q.type === 'compare') q.rows.forEach((r) => { r.left = NB(r.left); if (r.right) r.right = NB(r.right); });
      if (q.type === 'choice') q.options = q.options.map(NB);
      [q.left, q.right].forEach((col) => (col || []).forEach((it) => { it.text = NB(it.text); }));
      (q.tables || (q.rows && q.type === 'table' ? [{ rows: q.rows }] : [])).forEach((t) => t.rows.forEach((row) => {
        const cells = Array.isArray(row) ? row : row.cells;
        cells.forEach((c, i) => { if (typeof c === 'string') cells[i] = NB(c); });
      }));
    }
  }
  return units;
}

// ── Content ─────────────────────────────────────────────────────────────────

export const BAI_59_62 = keepNumbersTogether([
  // ── BÀI 59 (trang 54–58) ──────────────────────────────────────────────────
  {
    id: 'bai-59', number: 59, title: 'Các số có năm chữ số. Số 100 000',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Hàng<br>chục<br>nghìn', 'Hàng<br>nghìn', 'Hàng<br>trăm', 'Hàng<br>chục', 'Hàng<br>đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [2, 3, 4, 5, 1, '23 451', 'hai mươi ba nghìn bốn trăm năm mươi mốt'] },
          [1, 8, 0, 2, 3, numBlank(18023), readBlank('mười tám nghìn không trăm hai mươi ba')],
          [blank(6), blank(0), blank(1), blank(0), blank(4), '60 104', readBlank('sáu mươi nghìn một trăm linh bốn')],
          [blank(2), blank(9), blank(5), blank(1), blank(5), numBlank(29515), 'hai mươi chín nghìn năm trăm mười lăm'],
        ],
        hints: ['Đọc từ hàng chục nghìn: "mười tám nghìn", rồi đọc ba chữ số còn lại như số có ba chữ số.', 'Hàng trăm là 0 thì đọc "không trăm".'],
      },
      {
        // Số dưới mỗi vạch của tia số: một hàng 7 ô, ô trống là chỗ chấm.
        type: 'table', section: 'Tiết 1', img: imgB59Line,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        rows: [['49 994', '49 995', '49 996', numBlank(49997), '49 998', numBlank(49999), numBlank(50000)]],
        hints: ['Mỗi vạch tiếp theo lớn hơn vạch trước 1 đơn vị.', 'Số liền sau của 49 999 là 50 000.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số rồi đọc số, biết số đó gồm:',
        blanks: [
          N('a) 4 chục nghìn, 0 nghìn, 5 trăm, 1 chục và 3 đơn vị.<br>Viết số: ...', 40513),
          { label: 'Đọc số: ...', answer: 'bốn mươi nghìn năm trăm mười ba', validate: readV('bốn mươi nghìn năm trăm mười ba') },
          N('b) 1 chục nghìn, 5 nghìn, 0 trăm, 3 chục và 0 đơn vị.<br>Viết số: ...', 15030),
          { label: 'Đọc số: ...', answer: 'mười lăm nghìn không trăm ba mươi', validate: readV('mười lăm nghìn không trăm ba mươi') },
          N('c) 8 chục nghìn, 9 nghìn, 2 trăm, 0 chục và 5 đơn vị.<br>Viết số: ...', 89205),
          { label: 'Đọc số: ...', answer: 'tám mươi chín nghìn hai trăm linh năm', validate: readV('tám mươi chín nghìn hai trăm linh năm') },
          N('d) 6 chục nghìn, 0 nghìn, 0 trăm, 0 chục và 0 đơn vị.<br>Viết số: ...', 60000),
          { label: 'Đọc số: ...', answer: 'sáu mươi nghìn', validate: readV('sáu mươi nghìn') },
        ],
        hints: ['Viết lần lượt các chữ số từ hàng chục nghìn đến hàng đơn vị.', 'Hàng nào có 0 thì viết chữ số 0 ở hàng đó.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối số với cách đọc số đó.',
        left: [
          { id: 'n90', text: '90 000' }, { id: 'n30', text: '30 000' },
          { id: 'n50', text: '50 000' }, { id: 'n10', text: '10 000' },
        ],
        right: [
          { id: 'r50', text: 'Năm mươi nghìn' }, { id: 'r10', text: 'Mười nghìn' },
          { id: 'r30', text: 'Ba mươi nghìn' }, { id: 'r90', text: 'Chín mươi nghìn' },
        ],
        pairs: [['n90', 'r90'], ['n30', 'r30'], ['n50', 'r50'], ['n10', 'r10']],
        hints: ['90 000 là 9 chục nghìn, đọc là "chín mươi nghìn".'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố tròn chục nghìn lớn nhất và bé hơn 50 000 là:',
        options: ['A. 20 000', 'B. 30 000', 'C. 40 000', 'D. 60 000'], answer: 2,
        hints: ['Các số tròn chục nghìn: 10 000, 20 000, 30 000, 40 000, 50 000, ...'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối số với cách đọc số đó.',
        left: [
          { id: 'a', text: '100 000' }, { id: 'b', text: '68 204' },
          { id: 'c', text: '15 015' }, { id: 'd', text: '70 000' },
        ],
        right: [
          { id: 'rd', text: 'Bảy mươi nghìn' }, { id: 'ra', text: 'Một trăm nghìn' },
          { id: 'rb', text: 'Sáu mươi tám nghìn hai trăm linh tư' }, { id: 'rc', text: 'Mười lăm nghìn không trăm mười lăm' },
        ],
        pairs: [['a', 'ra'], ['b', 'rb'], ['c', 'rc'], ['d', 'rd']],
        hints: ['"Linh tư" nghĩa là hàng chục là 0, hàng đơn vị là 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) Số liền trước của số 10 000 là ...', 9999),
          N('b) Số liền sau của số 26 034 là ...', 26035),
          N('c) Số liền sau của số 69 999 là ...', 70000),
          N('d) Số liền trước của số 100 000 là ...', 99999),
        ],
        hints: ['Số liền trước bé hơn 1 đơn vị, số liền sau lớn hơn 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số?',
        blanks: [NN('10 000 → 20 000 → 30 000 → ... → 50 000 → 60 000 → ... → ... → ... → ...', 40000, 70000, 80000, 90000, 100000)],
        hints: ['Các số tròn chục nghìn liên tiếp: mỗi số hơn số trước 10 000.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố nào dưới đây có chữ số hàng chục nghìn là 4 và chữ số hàng trăm là 5?',
        options: ['A. 45 307', 'B. 50 400', 'C. 100 000', 'D. 46 508'], answer: 3,
        hints: ['Số có năm chữ số: chữ số đầu tiên là hàng chục nghìn, chữ số thứ ba là hàng trăm.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `5. Viết số thích hợp vào chỗ chấm.\nDùng năm thẻ số dưới đây để lập các số tròn trăm có năm chữ số.\n${card(1)} ${card(9)} ${card(3)} ${card(0)} ${card(0)}`,
        blanks: [{
          label: 'Các số tròn trăm lập được là: ...',
          answer: '13 900, 19 300, 31 900, 39 100, 91 300, 93 100',
          validate: numSetV([13900, 19300, 31900, 39100, 91300, 93100]),
        }],
        hints: ['Số tròn trăm có hai chữ số cuối là 0 0.', 'Ba thẻ 1, 3, 9 xếp ở ba hàng đầu: có 6 cách xếp.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 99 999 = 90 000 + ... + 900 + 90 + 9', 9000),
          N('b) 27 000 = ... + 7 000', 20000),
          N('c) 16 078 = 10 000 + 6 000 + ... + 8', 70),
          N('d) 83 404 = 80 000 + 3 000 + 400 + ...', 4),
        ],
        hints: ['Tách số theo từng hàng: chục nghìn, nghìn, trăm, chục, đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đ, S?\nBạn Hưng viết lên bảng một số tròn chục nghìn có năm chữ số. Như vậy:',
        blanks: [
          DS('a) Bạn Hưng có thể viết số 100 000.', false),
          DS('b) Bạn Hưng chắc chắn viết số 60 000.', false),
          DS('c) Bạn Hưng không thể viết số 86 937.', true),
        ],
        hints: ['100 000 có sáu chữ số.', 'Có nhiều số tròn chục nghìn có năm chữ số: 10 000, 20 000, ..., 90 000.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Trong nhà máy sản xuất đồ hộp, các hộp cá đã được đánh số lần lượt từ 1 đến 45 887. Ba hộp cá tiếp theo được đánh các số là:',
        blanks: [NN('..., ..., ...', 45888, 45889, 45890)],
        hints: ['Số tiếp theo lớn hơn số trước 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB59Photos,
        q: '4. Viết số thích hợp vào chỗ chấm.\nMỗi bạn bọ cánh cứng và nhện đều có một bức ảnh chụp ở cùng một gốc cây. Mỗi bạn đã che đi một phần bảng ghi chiều cao của cây đó. Biết chiều cao của cây đó là số có năm chữ số.',
        blanks: [
          N('a) Chiều cao của cây đó là ... cm.', 53089),
          N('b) Làm tròn chiều cao của cây đến hàng trăm được ... cm.', 53100),
        ],
        hints: ['Ảnh nhện cho thấy ba chữ số đầu, ảnh bọ cánh cứng cho thấy ba chữ số cuối.', 'Chữ số hàng chục là 8 (lớn hơn 5) nên làm tròn lên.'],
      },
      {
        type: 'match', section: 'Tiết 4',
        q: '1. Nối số với cách đọc số đó.',
        left: [
          { id: 's1', text: '🚢 9 765' }, { id: 's2', text: '🚢 64 000' },
          { id: 's3', text: '🚢 93 801' }, { id: 's4', text: '🚢 50 014' },
        ],
        right: [
          { id: 'c2', text: 'Sáu mươi tư nghìn' }, { id: 'c3', text: 'Chín mươi ba nghìn tám trăm linh một' },
          { id: 'c1', text: 'Chín nghìn bảy trăm sáu mươi lăm' }, { id: 'c4', text: 'Năm mươi nghìn không trăm mười bốn' },
        ],
        pairs: [['s1', 'c1'], ['s2', 'c2'], ['s3', 'c3'], ['s4', 'c4']],
        hints: ['9 765 chỉ có bốn chữ số: "chín nghìn ...".'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '2. a) Số?',
        blanks: [
          NN('75 000 → 80 000 → 85 000 → ... → ... → ...', 90000, 95000, 100000),
          {
            label: 'b) Viết số thích hợp vào chỗ chấm.<br>Trong các số bên, các số tròn chục nghìn là: ...',
            answer: '80 000, 90 000, 100 000',
            validate: numSetV([80000, 90000, 100000]),
          },
        ],
        hints: ['a) Mỗi số hơn số trước 5 000.', 'b) Số tròn chục nghìn có bốn chữ số cuối là 0.'],
      },
      {
        type: 'choice', section: 'Tiết 4',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nTìm số từ bốn số cho trước 65 080, 79 289, 70 375, 70 281, biết rằng:\n– Hàng chục nghìn của số cần tìm là 7.\n– Nếu làm tròn số cần tìm đến hàng chục thì chữ số hàng chục của số làm tròn là 8.\n– Nếu làm tròn số cần tìm đến hàng trăm thì chữ số hàng trăm của số làm tròn là 3.\nSố cần tìm là:',
        options: ['A. 65 080', 'B. 79 289', 'C. 70 375', 'D. 70 281'], answer: 3,
        hints: ['Loại dần: số nào có hàng chục nghìn khác 7?', '79 289 làm tròn đến hàng chục được 79 290; 70 375 làm tròn đến hàng trăm được 70 400.'],
      },
    ],
  },

  // ── BÀI 60 (trang 59–61) ──────────────────────────────────────────────────
  {
    id: 'bai-60', number: 60, title: 'So sánh các số trong phạm vi 100 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đ, S?',
        blanks: [
          DS('a) 4 832 < 14 920', true),
          DS('b) 47 399 > 50 000', false),
          DS('c) 52 000 < 51 999', false),
          DS('d) 60 000 + 6 = 60 006', true),
        ],
        hints: ['Số nào có nhiều chữ số hơn thì lớn hơn.', 'Cùng số chữ số: so sánh từng hàng từ trái sang phải.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 32 160', right: '32 200', answer: '<' },
          { left: 'b) 57 950', right: '56 950', answer: '>' },
          { left: 'c) 34 890', right: '30 000 + 4 000 + 800 + 90', answer: '=' },
        ],
        hints: ['So sánh từ hàng chục nghìn, rồi hàng nghìn, hàng trăm, ...'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB60Roads,
        q: '3. Khoanh vào địa điểm ô tô sẽ đi đến và tô màu đường đi của ô tô, biết rằng ô tô sẽ đi theo các ngã rẽ ghi số lớn hơn.\nÔ tô sẽ đi đến:',
        options: ['Sân vận động', 'Trường tiểu học', 'Công viên', 'Bệnh viện'], answer: 2,
        hints: ['Ngã rẽ đầu tiên: so sánh 32 728 và 40 050.', 'Ngã rẽ tiếp theo: so sánh 90 000 và 88 888.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tên các tàu vào chỗ chấm cho thích hợp.\nLượng hàng hoá mà mỗi tàu đang chở bằng số ghi trên thân tàu đó. Biết tàu Đại Dương chở hàng hoá nặng nhất và tàu Vươn Khơi chở hàng hoá nặng hơn tàu Khát Vọng.',
        blanks: [
          { label: '🚢 27 000 kg: ...', answer: 'Khát Vọng', validate: nameV('Khát Vọng'), tiles: ['Đại Dương', 'Vươn Khơi', 'Khát Vọng'], tileOne: true },
          { label: '🚢 41 000 kg: ...', answer: 'Đại Dương', validate: nameV('Đại Dương'), tiles: ['Đại Dương', 'Vươn Khơi', 'Khát Vọng'], tileOne: true },
          { label: '🚢 29 000 kg: ...', answer: 'Vươn Khơi', validate: nameV('Vươn Khơi'), tiles: ['Đại Dương', 'Vươn Khơi', 'Khát Vọng'], tileOne: true },
        ],
        hints: ['Tàu chở nặng nhất ghi số lớn nhất.', 'Hai tàu còn lại: 29 000 kg > 27 000 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Theo số liệu thống kê năm 2019, số dân của bốn dân tộc được cho như sau:\nDân tộc Thổ: 91 430 người.\nDân tộc Bru Vân Kiều: 94 598 người.\nDân tộc Tà Ôi: 52 356 người.\nDân tộc La Chí: 15 126 người.',
        blanks: [
          {
            label: 'a) Viết các số dân trên theo thứ tự từ bé đến lớn.<br>...',
            answer: '15 126, 52 356, 91 430, 94 598',
            validate: numOrderV([15126, 52356, 91430, 94598]),
          },
          {
            label: 'b) Viết tên dân tộc vào chỗ chấm cho thích hợp.<br>Trong bốn dân tộc trên:<br>– Dân tộc ... đông dân nhất.',
            answer: 'Bru Vân Kiều', validate: nameV('Bru Vân Kiều'), tiles: ['Thổ', 'Bru Vân Kiều', 'Tà Ôi', 'La Chí'], tileOne: true,
          },
          {
            label: '– Dân tộc ... ít dân nhất.',
            answer: 'La Chí', validate: nameV('La Chí'), tiles: ['Thổ', 'Bru Vân Kiều', 'Tà Ôi', 'La Chí'], tileOne: true,
          },
        ],
        hints: ['So sánh hàng chục nghìn trước: 1 < 5 < 9.', '91 430 và 94 598 cùng 9 chục nghìn: so sánh hàng nghìn.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nSố lượt xem các chương trình truyền hình tính đến một thời điểm được cho như bảng dưới đây:',
        headers: ['STT', 'Tên chương trình', 'Số lượt xem'],
        rows: [
          ['1', 'Tiếng Anh lớp 3', '73 353'],
          ['2', 'Thủ công lớp 3', '32 795'],
          ['3', 'Ca nhạc thiếu nhi', '45 728'],
          ['4', 'Kĩ năng sống', '78 000'],
        ],
        blanks: [
          {
            label: 'Trong các chương trình trên:<br>a) Chương trình có lượt xem nhiều nhất là: ...',
            answer: 'Kĩ năng sống', validate: nameV('Kĩ năng sống'),
            tiles: ['Tiếng Anh lớp 3', 'Thủ công lớp 3', 'Ca nhạc thiếu nhi', 'Kĩ năng sống'], tileOne: true,
          },
          {
            label: 'b) Chương trình có lượt xem ít nhất là: ...',
            answer: 'Thủ công lớp 3', validate: nameV('Thủ công lớp 3'),
            tiles: ['Tiếng Anh lớp 3', 'Thủ công lớp 3', 'Ca nhạc thiếu nhi', 'Kĩ năng sống'], tileOne: true,
          },
          {
            label: 'c) Những chương trình có trên 50 000 lượt xem là: ...',
            answer: 'Tiếng Anh lớp 3, Kĩ năng sống', validate: namesV(['Tiếng Anh lớp 3', 'Kĩ năng sống']),
            tiles: ['Tiếng Anh lớp 3', 'Thủ công lớp 3', 'Ca nhạc thiếu nhi', 'Kĩ năng sống'],
          },
        ],
        hints: ['So sánh các số ở cột "Số lượt xem".', 'Trên 50 000: số có hàng chục nghìn từ 5 trở lên.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Số ghi trên mỗi ô tô là số ki-lô-mét ô tô đó đã đi được. Tô màu xanh cho ô tô đi được số ki-lô-mét ít nhất và màu vàng cho ô tô đi được số ki-lô-mét nhiều nhất.\nCác ô tô ghi: 🚐 42 857 &nbsp; 🚐 43 000 &nbsp; 🚐 60 000',
        rows: [
          { left: '🟦 Ô tô tô màu xanh:', options: ['42 857', '43 000', '60 000'], answer: '42 857' },
          { left: '🟨 Ô tô tô màu vàng:', options: ['42 857', '43 000', '60 000'], answer: '60 000' },
        ],
        hints: ['42 857 và 43 000 cùng 4 chục nghìn: so sánh hàng nghìn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 73 281 > 73 28...', boxes: true, answer: '0' },
          { label: 'b) 62 874 < 62 ...74', boxes: true, answer: '9' },
        ],
        hints: ['a) Chữ số hàng đơn vị phải bé hơn 1.', 'b) Chữ số hàng trăm phải lớn hơn 8.'],
      },
    ],
  },

  // ── BÀI 61 (trang 62) — không chia tiết ─────────────────────────────────
  {
    id: 'bai-61', number: 61, title: 'Làm tròn số đến hàng nghìn, hàng chục nghìn',
    questions: [
      {
        type: 'fill',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          NN('a) Làm tròn các số 80 304, 61 500, 6 811 đến hàng nghìn được các số tương ứng là: ..., ..., ... .', 80000, 62000, 7000),
          NN('b) Làm tròn các số 90 000, 54 215, 78 302 đến hàng chục nghìn được các số tương ứng là: ..., ..., ... .', 90000, 50000, 80000),
        ],
        hints: ['Làm tròn đến hàng nghìn: nhìn chữ số hàng trăm. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.', 'Làm tròn đến hàng chục nghìn: nhìn chữ số hàng nghìn.'],
      },
      {
        type: 'fill',
        q: '2. Viết số thích hợp vào chỗ chấm.\nSau 5 năm, một gia đình thu hoạch được 97 418 kg gỗ keo.',
        blanks: [N('Nếu làm tròn số đến hàng nghìn thì ta nói gia đình đó thu hoạch được khoảng ... kg gỗ keo.', 97000)],
        hints: ['Chữ số hàng trăm là 4, bé hơn 5.'],
      },
      {
        type: 'fill',
        q: '3. Sau 15 năm, một công ty đã chế tạo được 97 602 rô-bốt.',
        blanks: [
          N('a) Nếu làm tròn số rô-bốt đến hàng nghìn thì được số ...', 98000),
          N('b) Nếu làm tròn số rô-bốt đến hàng chục nghìn thì được số ...', 100000),
        ],
        hints: ['a) Chữ số hàng trăm là 6.', 'b) Chữ số hàng nghìn là 7: làm tròn lên, 9 chục nghìn thành 10 chục nghìn.'],
      },
      {
        type: 'match',
        q: '4. Người ta đo được một ngọn núi trên Sao Hoả cao 21 229 m. Nối mỗi cách làm tròn số đó với kết quả (theo mẫu).\n21 229',
        left: [
          { id: 'tr', text: 'Làm tròn đến hàng trăm' }, { id: 'ch', text: 'Làm tròn đến hàng chục' },
          { id: 'ng', text: 'Làm tròn đến hàng nghìn' }, { id: 'cn', text: 'Làm tròn đến hàng chục nghìn' },
        ],
        right: [
          { id: 'v20', text: '20 000' }, { id: 'v212', text: '21 200' },
          { id: 'v2123', text: '21 230' }, { id: 'v21', text: '21 000' },
        ],
        pairs: [['tr', 'v212'], ['ch', 'v2123'], ['ng', 'v21'], ['cn', 'v20']],
        matchSample: ['tr', 'v212'],
        hints: ['Mẫu: 21 229 làm tròn đến hàng trăm được 21 200.', 'Làm tròn đến hàng chục: chữ số hàng đơn vị là 9, làm tròn lên.'],
      },
    ],
  },

  // ── BÀI 62 (trang 63–66) ──────────────────────────────────────────────────
  {
    id: 'bai-62', number: 62, title: 'Luyện tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: ['39 210', 'ba mươi chín nghìn hai trăm mười'] },
          [numBlank(25464), 'hai mươi lăm nghìn bốn trăm sáu mươi tư'],
          ['40 578', readBlank('bốn mươi nghìn năm trăm bảy mươi tám')],
          [numBlank(80500), 'tám mươi nghìn năm trăm'],
        ],
        hints: ['"Tám mươi nghìn năm trăm": hàng chục và hàng đơn vị đều là 0.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [
          NN('a) 34 520 → 34 530 → 34 540 → ... → ...', 34550, 34560),
          NN('b) 57 600 → 57 700 → ... → 57 900 → ...', 57800, 58000),
          NN('c) 96 000 → ... → 98 000 → 99 000 → ...', 97000, 100000),
        ],
        hints: ['a) Thêm 10 mỗi lần. b) Thêm 100 mỗi lần. c) Thêm 1 000 mỗi lần.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đ, S?',
        blanks: [
          DS('a) 12 345 > 9 876', true),
          DS('b) 62 920 < 70 000', true),
          DS('c) 8 400 + 600 < 9 000', false),
          DS('d) 2 300 – 300 = 2 000', true),
        ],
        hints: ['c) Tính 8 400 + 600 trước rồi mới so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB62Airport,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nKhoảng cách từ sân bay đến các thành phố được cho như hình dưới đây:',
        blanks: [
          { label: 'Trong các thành phố trên:<br>a) Thành phố xa sân bay nhất là ...', answer: 'D', validate: cityV('D') },
          { label: 'b) Thành phố gần sân bay nhất là ...', answer: 'B', validate: cityV('B') },
          { label: 'c) Thành phố có khoảng cách đến sân bay lớn hơn 60 000 m nhưng bé hơn 90 000 m là ...', answer: 'A và C', validate: cityV('AC') },
        ],
        hints: ['Xa nhất: khoảng cách lớn nhất. Gần nhất: khoảng cách bé nhất.', 'c) Có hai thành phố như vậy.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [NN('50 000 → 60 000 → ... → 80 000 → 90 000 → ...', 70000, 100000)],
        hints: ['Mỗi số hơn số trước 10 000.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Mỗi xe chở xăng sẽ bơm vào cây xăng ghi biểu thức có giá trị là số ghi trên xe đó. Nối để tìm xe cho mỗi cây xăng.',
        left: [
          { id: 'p1', text: '⛽ 10 000 + 2 000 + 600 + 70' },
          { id: 'p2', text: '⛽ 30 000 + 2 000 + 700 + 5' },
          { id: 'p3', text: '⛽ 30 000 + 3 000 + 700 + 40 + 5' },
        ],
        right: [
          { id: 't2', text: '🚚 32 705' }, { id: 't3', text: '🚚 33 745' }, { id: 't1', text: '🚚 12 670' },
        ],
        pairs: [['p1', 't1'], ['p2', 't2'], ['p3', 't3']],
        hints: ['Ghép các hàng lại: 10 000 + 2 000 + 600 + 70 = 12 670.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết số thích hợp vào chỗ chấm.\nTrong một trận bóng đá có 39 634 khán giả đến sân.',
        blanks: [
          N('a) Làm tròn đến hàng trăm thì ta nói số khán giả đến sân khoảng ... người.', 39600),
          N('b) Làm tròn đến hàng nghìn thì ta nói số khán giả đến sân khoảng ... người.', 40000),
        ],
        hints: ['a) Nhìn chữ số hàng chục (3). b) Nhìn chữ số hàng trăm (6).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nChim sẻ, chim chích và chim sâu cùng học số. Mỗi bạn viết một trong các số 20 060, 43 060, 53 000 lên lá cây. Mỗi bạn đã viết số nào?\n🐦 Chim sẻ: “Số tớ viết có chữ số hàng nghìn giống chữ số hàng nghìn chim sâu viết.”\n🐦 Chim chích: “Số tớ viết có chữ số hàng chục giống chữ số hàng chục chim sâu viết.”',
        blanks: [
          N('Chim sẻ đã viết số ...', 53000),
          N('Chim sâu đã viết số ...', 43060),
          N('Chim chích đã viết số ...', 20060),
        ],
        hints: ['Chữ số hàng nghìn: 20 060 là 0, 43 060 là 3, 53 000 là 3.', 'Chữ số hàng chục: 20 060 là 6, 43 060 là 6, 53 000 là 0.'],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB62Venn,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hình bên, số bé nhất nằm ở vị trí nào?',
        options: [
          'A. Ở trong hình tròn nhưng ở ngoài hình chữ nhật.',
          'B. Ở trong hình tròn và ở trong hình chữ nhật.',
          'C. Ở trong hình chữ nhật nhưng ở ngoài hình tròn.',
        ],
        answer: 1,
        hints: ['Tìm số bé nhất trước: so sánh 25 690 và 25 728.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Khoảng cách giữa thành phố A và thành phố B là 63 725 m.\na) Khoanh vào chữ đặt trước câu trả lời đúng.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Làm tròn đến hàng nghìn thì khoảng cách giữa thành phố A và thành phố B khoảng:<br>A. 63 000 m &nbsp;&nbsp; B. 64 000 m &nbsp;&nbsp; C. 65 000 m<br>Chữ đặt trước câu trả lời đúng:', answer: 'B', validate: letterV('B'), tiles: ['A', 'B', 'C'], tileOne: true },
          { label: 'Làm tròn đến hàng trăm thì khoảng cách giữa thành phố A và thành phố B khoảng:<br>A. 63 700 m &nbsp;&nbsp; B. 63 600 m &nbsp;&nbsp; C. 63 720 m<br>Chữ đặt trước câu trả lời đúng:', answer: 'A', validate: letterV('A'), tiles: ['A', 'B', 'C'], tileOne: true },
          N('b) Làm tròn đến hàng chục nghìn thì khoảng cách giữa thành phố A và thành phố B khoảng ... km.', 60),
        ],
        hints: ['a) Hàng nghìn: nhìn chữ số hàng trăm (7). Hàng trăm: nhìn chữ số hàng chục (2).', 'b) 63 725 m làm tròn đến hàng chục nghìn được 60 000 m, mà 60 000 m = 60 km.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết số thích hợp vào chỗ chấm.\nMỗi bạn Mai, Việt và Nam viết một số trong các số 39 283, 44 930, 39 400 lên bảng con. Biết số Mai viết lớn hơn số Nam viết nhưng bé hơn số Việt viết.',
        blanks: [
          NN('a) Mai đã viết số ... &nbsp; Việt đã viết số ...', 39400, 44930),
          N('Nam đã viết số ...', 39283),
          N('b) Số Mai đã viết làm tròn đến hàng trăm là: ...', 39400),
          N('c) Số Việt đã viết làm tròn đến hàng chục nghìn là: ...', 40000),
          N('d) Số Nam đã viết làm tròn đến hàng nghìn là: ...', 39000),
        ],
        hints: ['Số của Mai ở giữa: xếp ba số từ bé đến lớn.', 'b) 39 400 đã là số tròn trăm.'],
      },
    ],
  },
]);
