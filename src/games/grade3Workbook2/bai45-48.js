/**
 * Vở bài tập Toán 3 — Tập hai: Bài 45–48 (sách trang 3–13).
 * Các số có bốn chữ số, số 10 000; so sánh các số trong phạm vi 10 000;
 * làm quen với chữ số La Mã; làm tròn số đến hàng chục, hàng trăm.
 */
import {
  blank, mau, dsValidate, foldVN, stripVN, phraseValidate, phraseOrderValidate,
} from '../grade3Workbook.js';
import imgB45Maze from '../../assets/grade3-workbook-2/bai45_t3_q4_maze.svg';
import imgB46Caves from '../../assets/grade3-workbook-2/bai46_t1_q2_caves.svg';
import imgB46Objects from '../../assets/grade3-workbook-2/bai46_t1_q3_objects.svg';
import imgB46Mugs from '../../assets/grade3-workbook-2/bai46_t2_q4_mugs.svg';
import imgB47Clock1 from '../../assets/grade3-workbook-2/bai47_t1_q1_clock1.svg';
import imgB47Clock2 from '../../assets/grade3-workbook-2/bai47_t1_q1_clock2.svg';
import imgB47Clock3 from '../../assets/grade3-workbook-2/bai47_t1_q1_clock3.svg';
import imgB47Clock4 from '../../assets/grade3-workbook-2/bai47_t1_q1_clock4.svg';
import imgB47Book from '../../assets/grade3-workbook-2/bai47_t1_q4_book.svg';
import imgB47Sticks from '../../assets/grade3-workbook-2/bai47_t2_q1_sticks.svg';
import imgB47SunA from '../../assets/grade3-workbook-2/bai47_t2_q3_sundialA.svg';
import imgB47SunB from '../../assets/grade3-workbook-2/bai47_t2_q3_sundialB.svg';
import imgB47SunC from '../../assets/grade3-workbook-2/bai47_t2_q3_sundialC.svg';
import imgB47SunD from '../../assets/grade3-workbook-2/bai47_t2_q3_sundialD.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// The book prints numbers from 1 000 up with a thin space ("2 191"); a child may
// type "2191", "2 191" or "2.191" — all the same number.
const digitsOf = (v) => String(v).trim().replace(/[\s.]/g, '');
const numV = (n) => (v) => digitsOf(v) === String(n);
const numCell = (n) => blank(n, { validate: numV(n) });

// A blank row whose slots (one per "...") each hold a number, in the book's order.
function N(label, ...nums) {
  return {
    label,
    answer: nums.join(','),
    validate: (v) => {
      const parts = String(v).split(',');
      return parts.length === nums.length && parts.every((p, i) => digitsOf(p) === String(nums[i]));
    },
  };
}

// Several numbers written in one blank, any order ("5 200, 5 700, …"). Numbers in
// `extra` (the book's own circled samples) may be written again or left out.
function numSetValidate(nums, extra = []) {
  const want = nums.map(String).sort().join('|');
  return (v) => {
    const got = String(v).split(/[,;]|\bvà\b/).map(digitsOf).filter(Boolean)
      .filter(x => !extra.map(String).includes(x));
    return new Set(got).size === got.length && [...got].sort().join('|') === want;
  };
}

// "Viết hai số có bốn chữ số" (Bài 45 Tiết 2 Q3): any two different four-digit
// numbers whose digit at `place` (0 = đơn vị, 1 = chục, 2 = trăm, 3 = nghìn) is `d`.
function twoNumsValidate(place, d) {
  const ok = (s) => /^[1-9]\d{3}$/.test(s) && s[3 - place] === String(d);
  return (v) => {
    const parts = String(v).split(',').map(digitsOf);
    return parts.length === 2 && parts[0] !== parts[1] && parts.every(ok);
  };
}

// A number read out in words, one slot per "...": "bảy", "mười ba" (mốt/một, lăm/năm alike).
const wordsListValidate = (list) => (v) => {
  const parts = String(v).split(',');
  return parts.length === list.length && parts.every((p, i) => foldVN(p) === foldVN(list[i]));
};

// Roman numerals written in one blank, in order ("XVI, XVII, XVIII, XIX, XX").
const romanListValidate = (list) => (v) =>
  String(v).toUpperCase().split(/[,;\s]+/).filter(Boolean).join('|') === list.join('|');

// Two Roman numerals in either order (Bài 47 Tiết 1 Q4: the two lost pages).
const romanPairValidate = (a, b) => (v) => {
  const p = String(v).toUpperCase().split(',').map(s => s.trim());
  return p.length === 2 && ((p[0] === a && p[1] === b) || (p[0] === b && p[1] === a));
};

// A time read on a clock: "8 giờ 30 phút", "8 giờ rưỡi", "8:30" (and the
// afternoon form "20 giờ 30 phút") are accepted.
function timeValidate(h, m) {
  const ok = new Set();
  for (const hh of [h, h + 12, h === 12 ? 0 : null].filter(x => x !== null)) {
    if (m === 0) { ok.add(`${hh}gio`); ok.add(`${hh}gio00phut`); ok.add(`${hh}:00`); }
    else {
      ok.add(`${hh}gio${m}phut`); ok.add(`${hh}:${m}`); ok.add(`${hh}gio${m}`);
      if (m === 30) ok.add(`${hh}giorui`);
    }
  }
  return (v) => ok.has(stripVN(v).replace(/\s+/g, '').replace(/\.$/, '').replace(/ruoi/, 'rui'));
}

// Names of the four objects of Bài 46 Tiết 1 Q3; "túi / hộp / can / cái" in front is optional.
const objKey = (s) => stripVN(s).replace(/\b(tui|hop|can|cai|chai|binh|goi|noi com)\b/g, ' ').replace(/[^a-z]/g, '');
const objListValidate = (names) => (v) => {
  const parts = String(v).split(/[,;<>→]|\bvà\b/).map(objKey).filter(Boolean);
  return parts.join('|') === names.map(objKey).join('|');
};

// The food an ant reaches (Bài 46 Tiết 1 Q2): "viên kẹo" / "kẹo".
const foodValidate = (key) => (v) => stripVN(v).replace(/[^a-z]/g, '').includes(key);

// A box of the book's number chains / trains, drawn inline.
const box = (t) => `<span style="display:inline-block;border:2px solid #00AEEF;border-radius:9px;padding:1px 10px;margin:2px;background:#E6F6FD;white-space:nowrap">${t}</span>`;
// A number card ("thẻ số").
const card = (t) => `<span style="display:inline-block;min-width:1.6em;text-align:center;border:2px solid #2E9BD6;border-radius:6px;padding:0 5px;margin:0 2px;background:#8FD3F4;font-weight:700">${t}</span>`;
// A train of the book (Bài 45 Tiết 2 Q2): engine, then cars with a white label each.
const car = (t) => `<span style="display:inline-block;background:#8FD3F4;border:2px solid #2E9BD6;border-radius:7px;padding:5px 6px;margin:0 2px;vertical-align:middle"><span style="display:inline-block;background:#fff;border-radius:5px;padding:0 6px;min-width:3.4em;text-align:center">${t}</span></span>`;
const train = (...cars) => `<span style="font-size:1.6em;vertical-align:middle">🚂</span>${cars.map(car).join('')}`;
// An arrow with two lines of text on it (Bài 48 Q1: "Làm tròn / đến hàng chục").
const arrow = (dir, line1, line2) => `<span style="display:inline-flex;flex-direction:column;align-items:center;font-size:.8em;line-height:1.1;margin:0 3px;vertical-align:middle"><span>${line1}</span><span style="font-size:1.3em;line-height:.8">${dir === 'left' ? '⟵────' : '────⟶'}</span><span>${line2}</span></span>`;
const roundRow = (label, left, mid, right) => `${label}${left}${arrow('left', 'Làm tròn', 'đến hàng chục')}${box(mid)}${arrow('right', 'Làm tròn', 'đến hàng trăm')}${right}`;
const cImg = (src) => `<img class="e3-q-img" src="${src}" alt="" style="display:inline-block;width:96px;margin:2px 10px 2px 0;vertical-align:middle">`;

const CIRCLE_NUMS = ['2 100', '3 200', '4 000', '8 000', '5 400', '7 800', '9 000', '6 720'];
const OBJECTS = ['túi đường', 'hộp sữa bột', 'can dầu ăn', 'cái nồi'];
const FOODS = ['bánh quy', 'cục đường', 'viên kẹo'];
const PEAKS = ['Nhìu Cô San', 'Ngọc Linh', 'Tả Liên', 'Tà Xùa'];

// A line must never break inside a number the book prints with a thin space
// ("7 | 800"): every "d ddd" of the display texts gets a no-break space.
const NB = (s) => (typeof s === 'string' ? s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00A0') : s);
function keepNumbersTogether(units) {
  const cellsNB = (rows) => rows.forEach((row) => {
    const cells = Array.isArray(row) ? row : row.cells;
    cells.forEach((c, i) => { if (typeof c === 'string') cells[i] = NB(c); });
  });
  units.forEach(u => u.questions.forEach((q) => {
    q.q = NB(q.q);
    if (q.options) q.options = q.options.map(NB);
    if (q.hints) q.hints = q.hints.map(NB);
    (q.blanks || []).forEach((b) => { b.label = NB(b.label); });
    [...(q.left || []), ...(q.right || [])].forEach((it) => { if (it.text) it.text = NB(it.text); });
    if (q.type === 'compare') q.rows.forEach((r) => { r.left = NB(r.left); r.right = NB(r.right); });
    if (q.type === 'table') (q.tables || [{ rows: q.rows }]).forEach(t => cellsNB(t.rows));
  }));
  return units;
}

export const BAI_45_48 = keepNumbersTogether([
  // ── BÀI 45 (trang 3–6) ──────────────────────────────────────────────────────
  {
    id: 'bai-45', number: 45, title: 'Các số có bốn chữ số. Số 10 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Viết số thích hợp lên mỗi tấm bìa.\n${mau('“Hai nghìn một trăm chín mươi mốt.” → 2 191')}`,
        blanks: [
          { label: '“Năm nghìn không trăm linh sáu.” → ...', answer: '5006', validate: numV(5006) },
          { label: '“Sáu nghìn ba trăm năm mươi.” → ...', answer: '6350', validate: numV(6350) },
          { label: '“Tám nghìn bảy trăm linh năm.” → ...', answer: '8705', validate: numV(8705) },
        ],
        hints: ['Viết lần lượt chữ số hàng nghìn, hàng trăm, hàng chục, hàng đơn vị. Hàng nào không có thì viết chữ số 0.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          N('a) 2 995, 2 996, 2 997, ..., ..., ..., 3 001, 3 002.', 2998, 2999, 3000),
          N('b) ..., ..., 2 701, 2 702, 2 703, ..., 2 705.', 2699, 2700, 2704),
          N('c) 1 138, 1 139, ..., 1 141, 1 142, ..., ..., 1 145.', 1140, 1143, 1144),
        ],
        hints: ['Mỗi số hơn số đứng trước nó 1 đơn vị. Số liền sau 2 999 là 3 000.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Số?',
        headers: ['Hàng nghìn', 'Hàng trăm', 'Hàng chục', 'Hàng đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          [1, 8, 2, 0, numCell(1820), 'một nghìn tám trăm hai mươi'],
          [blank(4), 6, 5, 5, numCell(4655), 'bốn nghìn sáu trăm năm mươi lăm'],
          [5, blank(9), 0, blank(0), numCell(5900), 'năm nghìn chín trăm'],
          [7, 8, blank(0), 4, numCell(7804), 'bảy nghìn tám trăm linh tư'],
        ],
        hints: ['Đọc số ở cột "Đọc số" để biết chữ số của từng hàng. "Linh tư" nghĩa là hàng chục bằng 0.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `4. Khoanh vào các số tròn trăm bằng bút màu xanh và khoanh vào các số tròn nghìn bằng bút màu đen (theo mẫu).\n${CIRCLE_NUMS.join(' &nbsp; ')}\n${mau('2 100 khoanh màu xanh; 4 000 khoanh cả màu xanh và màu đen.')}`,
        blanks: [
          { label: 'Các số em khoanh màu xanh (số tròn trăm) là: ...', answer: '3 200, 8 000, 5 400, 7 800, 9 000', validate: numSetValidate([3200, 8000, 5400, 7800, 9000], [2100, 4000]), tiles: CIRCLE_NUMS },
          { label: 'Các số em khoanh màu đen (số tròn nghìn) là: ...', answer: '8 000, 9 000', validate: numSetValidate([8000, 9000], [4000]), tiles: CIRCLE_NUMS },
        ],
        hints: ['Số tròn trăm có hai chữ số tận cùng là 00. Số tròn nghìn có ba chữ số tận cùng là 000.', 'Số tròn nghìn cũng là số tròn trăm, nên được khoanh cả hai màu.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số ... gồm 3 nghìn, 6 trăm, 9 chục và 0 đơn vị.', answer: '3690', validate: numV(3690) },
          { label: 'b) Số ... gồm 6 nghìn, 4 trăm, 2 chục và 8 đơn vị.', answer: '6428', validate: numV(6428) },
          { label: 'c) Số ... gồm 9 nghìn, 7 trăm, 1 chục và 3 đơn vị.', answer: '9713', validate: numV(9713) },
          { label: 'd) Số ... gồm 8 nghìn, 0 trăm, 3 chục và 0 đơn vị.', answer: '8030', validate: numV(8030) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `2. Viết số thích hợp vào toa tàu còn trống (theo mẫu).\n${mau(train('2 999', '3 000'))}`,
        blanks: [
          { label: train('...', '4 890'), answer: '4889', validate: numV(4889) },
          { label: train('...', '3 785'), answer: '3784', validate: numV(3784) },
          { label: train('7 000', '...'), answer: '7001', validate: numV(7001) },
        ],
        hints: ['Hai toa của mỗi đoàn tàu ghi hai số liên tiếp: số ở toa sau hơn số ở toa trước 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết hai số có bốn chữ số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số có chữ số hàng đơn vị là 8: ..., ...', answer: '1238,5678', validate: twoNumsValidate(0, 8) },
          { label: 'b) Số có chữ số hàng chục là 7: ..., ...', answer: '1275,3470', validate: twoNumsValidate(1, 7) },
          { label: 'c) Số có chữ số hàng trăm là 0: ..., ...', answer: '2045,7009', validate: twoNumsValidate(2, 0) },
          { label: 'd) Số có chữ số hàng nghìn là 2: ..., ...', answer: '2345,2019', validate: twoNumsValidate(3, 2) },
        ],
        hints: ['Có nhiều cách viết. Số có bốn chữ số: hàng nghìn, hàng trăm, hàng chục, hàng đơn vị (tính từ trái sang phải).'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMã số mở cửa nhà của Rô-bốt là một số có bốn chữ số gồm các chữ số 0, 3, 5, 8. Biết chữ số hàng chục là 3 và chữ số hàng nghìn lớn hơn 5. Hỏi số nào dưới đây có thể là mã số mở cửa nhà của Rô-bốt?',
        options: ['3 508', '5 038', '5 083', '8 530'], answer: 3,
        hints: ['Chữ số hàng nghìn lớn hơn 5 nên chỉ có thể là 8.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Số gồm bốn nghìn, hai trăm, tám chục và ba đơn vị là ...', answer: '4283', validate: numV(4283) },
          { label: 'b) Số gồm năm nghìn, bảy chục và một đơn vị là ...', answer: '5071', validate: numV(5071) },
          { label: 'c) Số gồm chín nghìn, hai trăm và ba chục là ...', answer: '9230', validate: numV(9230) },
          { label: 'd) Số gồm hai nghìn, tám trăm, chín chục và hai đơn vị là ...', answer: '2892', validate: numV(2892) },
        ],
        hints: ['Hàng nào không được nhắc đến thì viết chữ số 0 ở hàng đó.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Số?',
        blanks: [
          N(`a) ${box('3 000')} → ${box('4 000')} → ... → ... → ${box('7 000')}`, 5000, 6000),
          N(`b) ${box('5 800')} → ${box('5 900')} → ${box('6 000')} → ... → ...`, 6100, 6200),
          N(`c) ... → ... → ${box('4 000')} → ${box('4 010')} → ${box('4 020')}`, 3980, 3990),
        ],
        hints: ['a) Mỗi số hơn số trước 1 000.', 'b) Mỗi số hơn số trước 100. c) Mỗi số hơn số trước 10.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `3. Viết số thích hợp vào chỗ chấm (theo mẫu).\n${mau('5 437 = 5 000 + 400 + 30 + 7')}`,
        blanks: [
          N('a) 6 728 = 6 000 + ... + ... + 8', 700, 20),
          N('b) 9 170 = 9 000 + ... + ...', 100, 70),
          N('c) 2 089 = 2 000 + ... + ...', 80, 9),
          N('d) 4 650 = 4 000 + ... + ...', 600, 50),
        ],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB45Maze,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMột con kiến bò từ điểm A đến điểm B theo hướng mũi tên. Trong suốt thời gian di chuyển, nó chỉ đọc các số ở bên phải của nó. Hỏi số cuối cùng mà kiến đọc là số nào?',
        options: ['Ba nghìn hai trăm tám mươi sáu', 'Hai nghìn sáu trăm ba mươi tám', 'Ba nghìn tám trăm sáu mươi hai', 'Sáu nghìn hai trăm tám mươi ba'],
        answer: 2,
        hints: ['Đi cùng con kiến: đi lên, rẽ trái, đi xuống, rẽ sang phải… Mỗi lần rẽ, xem bên tay phải của kiến là phía nào.', 'Biển 6 283 nằm bên tay trái của kiến khi kiến đi xuống điểm B.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: `5. Viết số thích hợp vào chỗ chấm.\nTừ các thẻ số ${card('0')} ${card('5')} ${card('0')} ${card('2')} ${card('7')}, Mai có thể lập được các số tròn trăm có bốn chữ số là:`,
        blanks: [
          { label: '...', answer: '2500, 2700, 5200, 5700, 7200, 7500', validate: numSetValidate([2500, 2700, 5200, 5700, 7200, 7500]) },
        ],
        hints: ['Số tròn trăm có hai chữ số tận cùng là 00, nên dùng cả hai thẻ số 0 ở cuối.', 'Hai chữ số đầu chọn từ 2, 5, 7 (khác nhau): có 6 số.'],
      },
    ],
  },

  // ── BÀI 46 (trang 7–9) ──────────────────────────────────────────────────────
  {
    id: 'bai-46', number: 46, title: 'So sánh các số trong phạm vi 10 000',
    questions: [
      {
        type: 'compare', section: 'Tiết 1',
        q: '1. >; <; = ?',
        rows: [
          { left: 'a) 2 194', right: '395', answer: '>' },
          { left: 'b) 4 198', right: '4 200', answer: '<' },
          { left: 'c) 5 100', right: '5 099', answer: '>' },
          { left: 'd) 7 000', right: '7 010', answer: '<' },
          { left: 'e) 899', right: '1 000', answer: '<' },
          { left: 'g) 3 257', right: '3 000 + 200 + 50 + 7', answer: '=' },
        ],
        hints: ['Số nào có nhiều chữ số hơn thì lớn hơn. Nếu cùng số chữ số, so sánh từng hàng từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB46Caves,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Cửa hang ghi số bé nhất đưa kiến đến chỗ ...', answer: 'viên kẹo', validate: foodValidate('keo'), tiles: FOODS, tileOne: true },
          { label: 'b) Cửa hang ghi số lớn nhất đưa kiến đến chỗ ...', answer: 'bánh quy', validate: foodValidate('banhquy'), tiles: FOODS, tileOne: true },
        ],
        hints: ['So sánh 3 198, 3 891, 3 819 để tìm số bé nhất, số lớn nhất.', 'Dùng ngón tay dò theo đường hầm từ cửa hang đó xuống dưới.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB46Objects,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nCho các đồ vật với cân nặng như sau:',
        blanks: [
          { label: 'a) Trong các đồ vật trên, đồ vật nặng nhất là ... và đồ vật nhẹ nhất là ...', answer: 'can dầu ăn,hộp sữa bột', validate: objListValidate(['can dầu ăn', 'hộp sữa bột']), tiles: OBJECTS },
          { label: 'b) Tên các đồ vật theo thứ tự từ nhẹ nhất đến nặng nhất là: ...', answer: 'hộp sữa bột, túi đường, cái nồi, can dầu ăn', validate: objListValidate(['hộp sữa bột', 'túi đường', 'cái nồi', 'can dầu ăn']), tiles: OBJECTS },
        ],
        hints: ['So sánh 1 000 g, 980 g, 1 890 g, 1 200 g.', '980 g là số bé nhất vì chỉ có ba chữ số.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nTừ các tấm thẻ ghi số 5, 9, 0, 4 lập được:',
        blanks: [
          { label: 'a) Số có bốn chữ số lớn nhất là ...', answer: '9540', validate: numV(9540) },
          { label: 'b) Số có bốn chữ số bé nhất là ...', answer: '4059', validate: numV(4059) },
        ],
        hints: ['Số lớn nhất: xếp các chữ số từ lớn đến bé.', 'Số bé nhất: chữ số 0 không đứng đầu, nên hàng nghìn là 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) 8 500 < 7 989 ...', answer: 'S', validate: dsValidate(false), boxes: true },
          { label: '3 870 > 3 780 ...', answer: 'Đ', validate: dsValidate(true), boxes: true },
          { label: '2 187 < 1 872 ...', answer: 'S', validate: dsValidate(false), boxes: true },
          { label: '7 645 > 7 654 ...', answer: 'S', validate: dsValidate(false), boxes: true },
          { label: 'b) 2 400 = 2 000 + 400 ...', answer: 'Đ', validate: dsValidate(true), boxes: true },
          { label: '4 020 > 400 + 20 ...', answer: 'Đ', validate: dsValidate(true), boxes: true },
          { label: '700 + 8 < 7 008 ...', answer: 'Đ', validate: dsValidate(true), boxes: true },
          { label: '3 451 = 3 000 + 400 + 50 + 1 ...', answer: 'Đ', validate: dsValidate(true), boxes: true },
        ],
        hints: ['Tính tổng trước rồi mới so sánh: 400 + 20 = 420; 700 + 8 = 708.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.\nMai có bốn cuốn sách. Trên bìa sau của mỗi cuốn sách có ghi một trong các số: 3 001, 2 999, 2 998, 3 000. Mai cần xếp các cuốn sách đó lên giá sách theo thứ tự từ cuốn sách ghi số bé nhất đến cuốn sách ghi số lớn nhất.',
        blanks: [
          N('Vậy cuốn sách đầu tiên được xếp lên giá sách là cuốn sách ghi số ... và cuốn sách cuối cùng được xếp lên giá sách là cuốn sách ghi số ...', 2998, 3001),
        ],
        hints: ['Cuốn đầu tiên ghi số bé nhất, cuốn cuối cùng ghi số lớn nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong năm vừa qua, bố của Mai đã leo lên bốn đỉnh núi có chiều cao như sau:\nNhìu Cô San: 2 965 m\nNgọc Linh: 2 598 m\nTả Liên: 3 009 m\nTà Xùa: 2 865 m',
        blanks: [
          { label: 'Tên các đỉnh núi đó theo thứ tự từ đỉnh núi thấp nhất đến đỉnh núi cao nhất là: ...', answer: 'Ngọc Linh, Tà Xùa, Nhìu Cô San, Tả Liên', validate: phraseOrderValidate(['Ngọc Linh', 'Tà Xùa', 'Nhìu Cô San', 'Tả Liên']), tiles: PEAKS },
        ],
        hints: ['So sánh 2 965, 2 598, 3 009, 2 865. Đỉnh thấp nhất có số đo bé nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB46Mugs,
        q: '4. Viết số thích hợp vào chỗ chấm.\nGia đình Mai gồm bố, mẹ, Mai và Mi. Cốc của mỗi người được đánh dấu bằng cách ghi số năm sinh.',
        blanks: [
          { label: 'Cốc của em Mi ghi số lớn nhất vì em Mi sinh ra muộn nhất. Cốc của bố và mẹ ghi hai số bằng nhau vì bố và mẹ sinh ra trong cùng một năm. Cốc của Mai ghi số ...', answer: '2011', validate: numV(2011) },
        ],
        hints: ['Hai cốc ghi 1 983 là của bố và mẹ. Trong hai số còn lại, số lớn nhất là của em Mi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `5. Viết số thích hợp vào chỗ chấm.\nTừ các thẻ số ${card('5')}, ${card('0')}, ${card('1')}, ${card('9')}, Mai lập được:`,
        blanks: [
          { label: 'a) Số tròn chục bé nhất có bốn chữ số là ...', answer: '1590', validate: numV(1590) },
          { label: 'b) Số tròn chục lớn nhất có bốn chữ số là ...', answer: '9510', validate: numV(9510) },
        ],
        hints: ['Số tròn chục có chữ số hàng đơn vị là 0, nên thẻ số 0 đứng cuối.'],
      },
    ],
  },

  // ── BÀI 47 (trang 10–12) ────────────────────────────────────────────────────
  {
    id: 'bai-47', number: 47, title: 'Làm quen với chữ số La Mã',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: `1. Viết vào chỗ chấm (theo mẫu).\n${mau(`${cImg(imgB47Clock1)} 3 giờ`)}`,
        blanks: [
          { label: `${cImg(imgB47Clock2)} ...`, answer: '8 giờ 30 phút', validate: timeValidate(8, 30) },
          { label: `${cImg(imgB47Clock3)} ...`, answer: '12 giờ', validate: timeValidate(12, 0) },
          { label: `${cImg(imgB47Clock4)} ...`, answer: '5 giờ 15 phút', validate: timeValidate(5, 15) },
        ],
        hints: ['Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài chỉ số VI là 30 phút, chỉ số III là 15 phút.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'n10', text: '(10)' }, { id: 'n5', text: '(5)' },
          { id: 'n9', text: '(9)' }, { id: 'n20', text: '(20)' },
        ],
        right: [
          { id: 'rIX', text: '(IX)' }, { id: 'rXX', text: '(XX)' },
          { id: 'rX', text: '(X)' }, { id: 'rV', text: '(V)' },
        ],
        pairs: [['n10', 'rX'], ['n5', 'rV'], ['n9', 'rIX'], ['n20', 'rXX']],
        // Sách đã nối sẵn mẫu: (10) → (X).
        matchSample: ['n10', 'rX'],
        hints: ['I là 1, V là 5, X là 10. IX là 10 bớt 1.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. a) Viết cách đọc các số La Mã sau (theo mẫu):',
        blanks: [
          { label: '<span class="gw-sample-text">I: một</span>; VII: ...; XIII: ...; XIX: ...', answer: 'bảy,mười ba,mười chín', validate: wordsListValidate(['bảy', 'mười ba', 'mười chín']) },
          { label: 'b) Viết các số từ 16 đến 20 bằng chữ số La Mã:<br>...', answer: 'XVI, XVII, XVIII, XIX, XX', validate: romanListValidate(['XVI', 'XVII', 'XVIII', 'XIX', 'XX']) },
        ],
        hints: ['VII = V + II; XIII = X + III; XIX = X + IX.', 'XVI là 16: X (10) và VI (6).'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB47Book,
        q: '4. Viết số La Mã thích hợp vào chỗ chấm.\nMột cuốn sách bị mất một tờ (như hình bên). Các trang sách được ghi bằng số La Mã.',
        blanks: [
          { label: 'Các trang bị mất được ghi số ... và ...', answer: 'XII,XIII', validate: romanPairValidate('XII', 'XIII') },
        ],
        hints: ['Trang XI rồi đến trang XIV: các trang ở giữa là 12 và 13.', 'Một tờ giấy có hai trang (mặt trước và mặt sau).'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB47Sticks,
        q: '1. Viết số thích hợp vào chỗ chấm.\nDùng que tính có thể xếp thành các số La Mã như hình bên:',
        blanks: [
          { label: 'a) Để xếp cả số 3 và số 6 bằng chữ số La Mã thì dùng hết ... que tính.', answer: '6' },
          { label: 'b) Để xếp ba số 12 bằng chữ số La Mã thì dùng hết ... que tính.', answer: '12' },
        ],
        hints: ['III cần 3 que, V cần 2 que, X cần 2 que.', '12 viết là XII: cần 2 + 1 + 1 = 4 que.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Viết số La Mã thích hợp vào thùng hàng còn trống.',
        rows: [['V', 'VI', 'VII', blank('VIII'), 'IX', blank('X'), blank('XI')]],
        hints: ['Các số tăng dần từng 1: V (5), VI (6), VII (7), …'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối hai đồng hồ chỉ cùng giờ (theo mẫu).',
        left: [
          { id: 'A', img: imgB47SunA, text: 'A' }, { id: 'B', img: imgB47SunB, text: 'B' },
          { id: 'C', img: imgB47SunC, text: 'C' }, { id: 'D', img: imgB47SunD, text: 'D' },
        ],
        right: [
          { id: 'E', text: 'E. 15:00' }, { id: 'G', text: 'G. 23:00' },
          { id: 'H', text: 'H. 8:00' }, { id: 'I', text: 'I. 12:00' },
        ],
        pairs: [['A', 'H'], ['B', 'I'], ['C', 'E'], ['D', 'G']],
        // Sách đã nối sẵn mẫu: đồng hồ A → H (8:00).
        matchSample: ['A', 'H'],
        // Đồng hồ vẽ to để bé nhìn rõ bóng nắng.
        bigImg: true,
        hints: ['Bóng của cây cọc chỉ vào số giờ. Ban đêm không có bóng nắng.'],
      },
    ],
  },

  // ── BÀI 48 (trang 13) ───────────────────────────────────────────────────────
  {
    id: 'bai-48', number: 48, title: 'Làm tròn số đến hàng chục, hàng trăm',
    questions: [
      {
        type: 'fill',
        q: `1. Số?\n${roundRow('a) ', box('5 070'), '5 072', box('5 100'))}`,
        blanks: [
          N(roundRow('b) ', '...', '8 135', '...'), 8140, 8100),
          N(roundRow('c) ', '...', '9 588', '...'), 9590, 9600),
        ],
        hints: ['Làm tròn đến hàng chục: nhìn chữ số hàng đơn vị. Bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.', 'Làm tròn đến hàng trăm: nhìn chữ số hàng chục.'],
      },
      {
        type: 'fill',
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nĐỉnh núi Khang Su Văn (Lai Châu) cao 3 012 m. Khi làm tròn số đo đó đến hàng trăm:\nNam nói: “Đỉnh núi Khang Su Văn cao khoảng 3 000 m”.\nMai nói: “Đỉnh núi đó cao khoảng 3 100 m”.',
        blanks: [
          { label: 'Bạn nói đúng là bạn ...', answer: 'Nam', validate: phraseValidate('Nam'), tiles: ['Nam', 'Mai'], tileOne: true },
        ],
        hints: ['3 012 có chữ số hàng chục là 1, bé hơn 5, nên làm tròn xuống.'],
      },
      {
        type: 'fill',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nRô-bốt cùng Mai ghé thăm vườn quốc gia. Ở đó, hai bạn đã gặp một con hà mã nặng 3 945 kg.\n– Mai nói: “Con hà mã đó nặng khoảng 3 900 kg”.\n– Rô-bốt nói: “Con hà mã đó nặng khoảng 3 950 kg”.',
        blanks: [
          { label: 'Mai đã làm tròn số đến hàng ...', answer: 'trăm', validate: (v) => phraseValidate('trăm')(String(v).replace(/^\s*hàng\s+/i, '')), tiles: ['chục', 'trăm'], tileOne: true },
          { label: 'Rô-bốt đã làm tròn số đến hàng ...', answer: 'chục', validate: (v) => phraseValidate('chục')(String(v).replace(/^\s*hàng\s+/i, '')), tiles: ['chục', 'trăm'], tileOne: true },
        ],
        hints: ['3 900 là số tròn trăm, 3 950 là số tròn chục.'],
      },
      {
        type: 'fill',
        q: `4. Viết số thích hợp vào chỗ chấm.\nDựa vào quy tắc làm tròn số, một chiếc máy đã lần lượt “biến” các số 2 517, 7 512, 1 275 thành các số như sau:\n${box('2 517')} → ${box('2 520')} &nbsp; ${box('7 512')} → ${box('7 510')} &nbsp; ${box('1 275')} → ${box('1 280')}`,
        blanks: [
          { label: 'Vậy chiếc máy đó sẽ biến số 5 271 thành số ...', answer: '5270', validate: numV(5270) },
        ],
        hints: ['Máy làm tròn các số đến hàng chục.'],
      },
    ],
  },
]);
