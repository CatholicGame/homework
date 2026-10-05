/**
 * SGK Toán 4: bài 4–17 (sách trang 6–22): biểu thức có chứa một chữ, các số có sáu chữ số,
 * hàng và lớp, triệu và lớp triệu, dãy số tự nhiên, so sánh và xếp thứ tự các số tự nhiên.
 * Hình vẽ lại: scripts/redraw/g4t_bai004_017.py (bộ vẽ kit_g4t.py).
 */
import { blank, mau, placeSum, readCell, readBlank, num } from './kit.js';
import { sampleCell, stripVN } from '../grade3Workbook.js';
import imgHinhVuong from '../../assets/grade4-textbook/bai5_q4_hinhvuong.svg';
// Bài 6 câu 1: mỗi cột của bảng hàng là một hình các thẻ xếp chồng (tên tệp: the_<giá trị>_<số thẻ>)
const THE_SO = import.meta.glob('../../assets/grade4-textbook/bai6_q1_the_*.svg', { eager: true, import: 'default' });
const theCell = (card, n) => `<img src="${THE_SO[`../../assets/grade4-textbook/bai6_q1_the_${card}_${n}.svg`]}" alt="${n} thẻ ${num(card)}" style="width:100%;max-width:120px;display:block;margin:0 auto">`;
const CARDS = [100000, 10000, 1000, 100, 10, 1];
const theRow = (counts) => counts.map((n, i) => theCell(CARDS[i], n));

// ── Đồ dùng riêng của tệp này ────────────────────────────────────────────────────────────────
const digitsOf = (n) => String(n).split('').map(Number);
const noSpace = (s) => String(s).replace(/\s+/g, '');
const cmp = (a, b) => ({ left: num(a), right: num(b), answer: a > b ? '>' : a < b ? '<' : '=' });

/** Một ô viết các số theo đúng thứ tự (gõ có hay không có khoảng trắng đều được). */
const orderValidate = (nums) => (v) => {
  const got = String(v).split(/[,;]+/).map(noSpace).filter(Boolean);
  return got.length === nums.length && got.every((g, i) => g === String(nums[i]));
};
/** "Viết các số theo thứ tự": một ô, có thẻ số của sách để bấm. */
const order = (label, nums, given) => ({
  label: `${label} ...`, answer: nums.map(num).join('; '), validate: orderValidate(nums),
  tiles: given.map(num), tileSep: '; ',
});
/** Các số viết vào nhiều chỗ trống, không phụ thuộc thứ tự. */
const anyOrderValidate = (nums) => (v) => {
  const got = String(v).split(/[,;]+/).map(noSpace).filter(Boolean).sort();
  const want = nums.map(String).sort();
  return got.length === want.length && got.every((g, i) => g === want[i]);
};

/** Tên hàng / lớp ("trăm", "hàng trăm", "Hang tram" đều được); nhiều chỗ trống nối bằng dấu phẩy. */
const normPlace = (s) => stripVN(s).replace(/^\s*(hang|lop)\s+/, '').replace(/[^a-z]/g, '');
const placeValidate = (names) => (v) => {
  const got = String(v).split(',').map(normPlace);
  return got.length === names.length && got.every((g, i) => g === normPlace(names[i]));
};
const HANG_TILES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn'];

/** Hàng của chữ số d trong số n (chữ số đó chỉ có một lần trong số). */
const PLACE = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
const posOf = (n, d) => { const s = String(n); return s.length - 1 - s.indexOf(String(d)); };
const valueOf = (n, d) => d * 10 ** posOf(n, d);

/** "Số gồm có": "5 nghìn, 8 trăm, 6 chục, 4 đơn vị" (thứ tự, dấu phẩy, chữ "và" tùy ý). */
const UNIT_POW = { donvi: 0, chuc: 1, tram: 2, nghin: 3, chucnghin: 4, tramnghin: 5, trieu: 6, chuctrieu: 7, tramtrieu: 8 };
const gomValidate = (n) => (v) => {
  const s = stripVN(v).replace(/\bva\b/g, ',');
  const parts = [...s.matchAll(/(\d+)\s*([a-z\s]+)/g)];
  if (!parts.length) return false;
  const seen = new Set();
  let sum = 0;
  for (const [, d, u] of parts) {
    const p = UNIT_POW[u.replace(/hang/g, '').replace(/\s+/g, '')];
    if (p === undefined || seen.has(p) || +d < 1 || +d > 9) return false;
    seen.add(p);
    sum += +d * 10 ** p;
  }
  return sum === n && seen.size === digitsOf(n).filter(Boolean).length;
};
const gomText = (n) => {
  const s = String(n);
  return [...s].map((d, i) => [d, s.length - 1 - i]).filter(([d]) => d !== '0').map(([d, p]) => `${d} ${PLACE[p]}`).join(', ');
};

/** Cách đọc có chữ "tỉ" (tỷ cũng được). */
const tiValidate = (...forms) => (v) => {
  const norm = (x) => stripVN(x).replace(/ty/g, 'ti').replace(/[^a-z]/g, '');
  return forms.map(norm).includes(norm(v));
};

// Bảng hàng và lớp (đầu cột hai tầng)
const H6 = ['Hàng trăm nghìn', 'Hàng chục nghìn', 'Hàng nghìn', 'Hàng trăm', 'Hàng chục', 'Hàng đơn vị'];
const H9 = ['Hàng trăm triệu', 'Hàng chục triệu', 'Hàng triệu', ...H6];
// Đầu cột hẹp như sách: chữ xuống dòng (bảng 11 cột vừa màn hình ngang)
const stack = (h) => h.replace(/ /g, '<br>');
const headLop = (lead, classes) => [
  [...lead.map((t) => ({ text: t, rowspan: 2 })), ...classes.map((t) => ({ text: t, colspan: 3 }))],
  (classes.length === 3 ? H9 : H6).map(stack),
];
/** Các ô chữ số của n trong k cột (cột thiếu để trống); blankDigits: ô điền. */
const digitCells = (n, k, blankDigits) => {
  const ds = digitsOf(n);
  return Array.from({ length: k }, (_, i) => {
    const d = ds[i - (k - ds.length)];
    if (d === undefined) return '';
    return blankDigits ? blank(d) : d;
  });
};
/** Chữ dài trong ô bảng (ô cho sẵn không tự xuống dòng). */
const wrap = (t) => `<span style="white-space:normal;display:inline-block;min-width:9rem">${t}</span>`;
const W8 = ['26%', '12%', ...Array(6).fill('10.3%')];
const W11 = ['25%', '12%', ...Array(9).fill('7%')];
const H6_SHORT = ['Trăm nghìn', 'Chục nghìn', 'Nghìn', 'Trăm', 'Chục', 'Đơn vị'];

/** Bảng chữ số cho sẵn (in trong đề), hai tầng: lớp triệu, lớp nghìn, lớp đơn vị. */
function bookTable9(rows) {
  const top = '<tr><th colspan="3">Lớp triệu</th><th colspan="3">Lớp nghìn</th><th colspan="3">Lớp đơn vị</th></tr>';
  const mid = `<tr>${H9.map((h) => `<th>${h}</th>`).join('')}</tr>`;
  const body = rows.map((n) => `<tr>${digitCells(n, 9, false).map((d) => `<td>${d}</td>`).join('')}</tr>`).join('');
  return `<div style="overflow-x:auto;max-width:100%"><table class="gw-book-table">${top}${mid}${body}</table></div>`;
}

export const QUESTIONS = {
  // ── Bài 4. Biểu thức có chứa một chữ (trang 6) ────────────────────────────────────────────────
  'bai-4': [
    {
      type: 'fill', stars: 1,
      q: `1. Tính giá trị của biểu thức (theo mẫu):\na) 6 − b với b = 4 ; b) 115 − c với c = 7 ; c) a + 80 với a = 15.\n${mau('a) Nếu b = 4 thì 6 − b = 6 − 4 = 2.')}`,
      blanks: [
        { label: 'b) Nếu c = 7 thì 115 − c = ... − ... = ...', answer: '115,7,108' },
        { label: 'c) Nếu a = 15 thì a + 80 = ... + ... = ...', answer: '15,80,95' },
      ],
      hints: ['Thay chữ bằng số đã cho rồi tính.'],
    },
    {
      type: 'table', stars: 2,
      q: '2. Viết vào ô trống (theo mẫu):',
      tables: [
        { label: 'a)', rows: [['<i>x</i>', sampleCell(8), 30, 100], ['125 + <i>x</i>', sampleCell('125 + 8 = 133'), blank(155), blank(225)]] },
        { label: 'b)', rows: [['y', 200, 960, 1350], ['y − 20', blank(180), blank(940), blank(1330)]] },
      ],
      hints: ['Mỗi cột: thay chữ bằng số ở dòng trên rồi tính. Ví dụ x = 30 thì 125 + x = 125 + 30.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. a) Tính giá trị của biểu thức 250 + m với: m = 10 ; m = 0 ; m = 80 ; m = 30.\nb) Tính giá trị của biểu thức 873 − n với: n = 10 ; n = 0 ; n = 70 ; n = 300.',
      blanks: [
        { label: 'a) Với m = 10 thì 250 + m = 250 + ... = ...', answer: '10,260' },
        { label: 'Với m = 0 thì 250 + m = 250 + ... = ...', answer: '0,250' },
        { label: 'Với m = 80 thì 250 + m = 250 + ... = ...', answer: '80,330' },
        { label: 'Với m = 30 thì 250 + m = 250 + ... = ...', answer: '30,280' },
        { label: 'b) Với n = 10 thì 873 − n = 873 − ... = ...', answer: '10,863' },
        { label: 'Với n = 0 thì 873 − n = 873 − ... = ...', answer: '0,873' },
        { label: 'Với n = 70 thì 873 − n = 873 − ... = ...', answer: '70,803' },
        { label: 'Với n = 300 thì 873 − n = 873 − ... = ...', answer: '300,573' },
      ],
      hints: ['Mỗi lần thay chữ bằng một số, ta tính được một giá trị của biểu thức.', 'Cộng hay trừ với 0 thì số đó không đổi.'],
    },
  ],

  // ── Bài 5. Luyện tập (trang 7) ────────────────────────────────────────────────────────────────
  'bai-5': [
    {
      type: 'table', stars: 2,
      q: '1. Tính giá trị của biểu thức (theo mẫu):',
      tables: [
        { label: 'a)', headers: ['a', '6 × a'], rows: [{ sample: true, cells: [5, '6 × 5 = 30'] }, [7, blank(42)], [10, blank(60)]] },
        { label: 'b)', headers: ['b', '18 : b'], rows: [[2, blank(9)], [3, blank(6)], [6, blank(3)]] },
        { label: 'c)', headers: ['a', 'a + 56'], rows: [[50, blank(106)], [26, blank(82)], [100, blank(156)]] },
        { label: 'd)', headers: ['b', '97 − b'], rows: [[18, blank(79)], [37, blank(60)], [90, blank(7)]] },
      ],
      hints: ['Mỗi dòng: thay chữ bằng số ở cột bên trái rồi tính.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính giá trị của biểu thức:\na) 35 + 3 × n với n = 7 ; b) 168 − m × 5 với m = 9 ;\nc) 237 − (66 + <i>x</i>) với <i>x</i> = 34 ; d) 37 × (18 : y) với y = 9.',
      blanks: [
        { label: 'a) 35 + 3 × n = 35 + 3 × ... = 35 + ... = ...', answer: '7,21,56' },
        { label: 'b) 168 − m × 5 = 168 − ... × 5 = 168 − ... = ...', answer: '9,45,123' },
        { label: 'c) 237 − (66 + <i>x</i>) = 237 − (66 + ...) = 237 − ... = ...', answer: '34,100,137' },
        { label: 'd) 37 × (18 : y) = 37 × (18 : ...) = 37 × ... = ...', answer: '9,2,74' },
      ],
      hints: ['Thay chữ bằng số trước.', 'Nhân, chia trước rồi cộng, trừ sau; có ngoặc thì tính trong ngoặc trước.'],
    },
    {
      type: 'table', stars: 2,
      q: '3. Viết vào ô trống (theo mẫu):',
      headers: ['c', 'Biểu thức', 'Giá trị của biểu thức'],
      rows: [
        { sample: true, cells: [5, '8 × c', 40] },
        [7, '7 + 3 × c', blank(28)],
        [6, '(92 − c) + 81', blank(167)],
        [0, '66 × c + 32', blank(32)],
      ],
      hints: ['Thay c bằng số ở cột đầu. Nhân trước, cộng sau; có ngoặc thì tính trong ngoặc trước.', 'Số nào nhân với 0 cũng bằng 0.'],
    },
    {
      type: 'fill', stars: 2, img: imgHinhVuong,
      q: '4. Một hình vuông có độ dài cạnh là a. Gọi chu vi hình vuông là P. Ta có:\nP = a × 4\nHãy tính chu vi hình vuông với: a = 3cm ; a = 5dm ; a = 8m.',
      blanks: [
        { label: 'Với a = 3cm thì P = ... × 4 = ... (cm)', answer: '3,12' },
        { label: 'Với a = 5dm thì P = ... × 4 = ... (dm)', answer: '5,20' },
        { label: 'Với a = 8m thì P = ... × 4 = ... (m)', answer: '8,32' },
      ],
      hints: ['Thay a bằng độ dài cạnh rồi nhân với 4. Đơn vị của chu vi giống đơn vị của cạnh.'],
    },
  ],

  // ── Bài 6. Các số có sáu chữ số (trang 8–10) ──────────────────────────────────────────────────
  'bai-6': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      tables: [
        { label: `a) ${mau('Viết số: 313 214. Đọc số: Ba trăm mười ba nghìn hai trăm mười bốn.')}`, headers: H6_SHORT.map(stack), colWidths: Array(6).fill('16.6%'), rows: [theRow([3, 1, 3, 2, 1, 4]), { sample: true, cells: [3, 1, 3, 2, 1, 4] }] },
        { label: 'b)', headers: H6_SHORT.map(stack), colWidths: Array(6).fill('16.6%'), rows: [theRow([5, 2, 3, 4, 5, 3]), digitCells(523453, 6, true)] },
      ],
      blanks: [
        { label: 'Viết số: ...', answer: '523453' },
        readBlank('Đọc số: ...', 523453),
      ],
      hints: ['Mỗi hàng có bao nhiêu thẻ thì chữ số ở hàng đó là bấy nhiêu.', 'Đọc lớp nghìn trước ("... nghìn"), rồi đọc ba chữ số cuối.'],
    },
    {
      type: 'table', stars: 2,
      q: '2. Viết theo mẫu:',
      headers: ['Viết số', ...H6_SHORT, 'Đọc số'],
      rows: [
        { sample: true, cells: ['425 671', 4, 2, 5, 6, 7, 1, wrap('bốn trăm hai mươi lăm nghìn sáu trăm bảy mươi mốt')] },
        ['369 815', ...digitCells(369815, 6, true), readCell(369815)],
        [blank(579623), ...digitCells(579623, 6, false), readCell(579623)],
        [blank(786612), ...digitCells(786612, 6, true), wrap('bảy trăm tám mươi sáu nghìn sáu trăm mười hai')],
      ],
      hints: ['Từ trái sang phải: trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị.', 'Đọc: ba chữ số đầu kèm chữ "nghìn", rồi đọc ba chữ số cuối.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Đọc các số sau: 96 315 ; 796 315 ; 106 315 ; 106 827.',
      blanks: [96315, 796315, 106315, 106827].map((n) => readBlank(`${num(n)}: ...`, n)),
      hints: ['Đọc phần nghìn trước rồi đến ba chữ số cuối. Hàng chục là 0 thì đọc "linh".'],
    },
    {
      type: 'fill', stars: 1,
      q: '4. Viết các số sau:',
      blanks: [
        { label: 'a) Sáu mươi ba nghìn một trăm mười lăm: ...', answer: '63115' },
        { label: 'b) Bảy trăm hai mươi ba nghìn chín trăm ba mươi sáu: ...', answer: '723936' },
        { label: 'c) Chín trăm bốn mươi ba nghìn một trăm linh ba: ...', answer: '943103' },
        { label: 'd) Tám trăm sáu mươi nghìn ba trăm bảy mươi hai: ...', answer: '860372' },
      ],
      hints: ['Viết số trước chữ "nghìn" (lớp nghìn), rồi viết đủ ba chữ số của lớp đơn vị.'],
    },
  ],

  // ── Bài 7. Luyện tập (trang 10) ───────────────────────────────────────────────────────────────
  'bai-7': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      headers: ['Viết số', ...H6_SHORT, 'Đọc số'],
      rows: [
        { sample: true, cells: ['653 267', 6, 5, 3, 2, 6, 7, wrap('sáu trăm năm mươi ba nghìn hai trăm sáu mươi bảy')] },
        [blank(425301), ...digitCells(425301, 6, false), readCell(425301)],
        [blank(728309), ...digitCells(728309, 6, true), wrap('bảy trăm hai mươi tám nghìn ba trăm linh chín')],
        ['425 736', ...digitCells(425736, 6, true), readCell(425736)],
      ],
      hints: ['Mỗi chữ số đứng ở một hàng. Hàng chục là 0 thì đọc "linh".'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a) Đọc các số sau: 2453 ; 65 243 ; 762 543 ; 53 620.\nb) Cho biết chữ số 5 ở mỗi số trên thuộc hàng nào.',
      blanks: [
        ...[2453, 65243, 762543, 53620].map((n, i) => readBlank(`${i ? '' : 'a) '}${num(n)}: ...`, n)),
        ...[2453, 65243, 762543, 53620].map((n, i) => ({
          label: `${i ? '' : 'b) '}Trong số ${num(n)}, chữ số 5 thuộc hàng ...`, answer: PLACE[posOf(n, 5)],
          validate: placeValidate([PLACE[posOf(n, 5)]]), tiles: HANG_TILES, tileOne: true,
        })),
      ],
      hints: ['Đếm từ phải sang trái: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn.'],
    },
    {
      type: 'fill', stars: 1,
      q: '3. Viết các số sau:',
      blanks: [
        { label: 'a) Bốn nghìn ba trăm: ...', answer: '4300' },
        { label: 'b) Hai mươi bốn nghìn ba trăm mười sáu: ...', answer: '24316' },
        { label: 'c) Hai mươi bốn nghìn ba trăm linh một: ...', answer: '24301' },
        { label: 'd) Một trăm tám mươi nghìn bảy trăm mười lăm: ...', answer: '180715' },
        { label: 'e) Ba trăm linh bảy nghìn bốn trăm hai mươi mốt: ...', answer: '307421' },
        { label: 'g) Chín trăm chín mươi chín nghìn chín trăm chín mươi chín: ...', answer: '999999' },
      ],
      hints: ['Lớp đơn vị luôn viết đủ ba chữ số: "ba trăm linh một" là 301.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 300 000 ; 400 000 ; 500 000 ; ... ; ... ; ...', answer: '600000,700000,800000' },
        { label: 'b) 350 000 ; 360 000 ; 370 000 ; ... ; ... ; ...', answer: '380000,390000,400000' },
        { label: 'c) 399 000 ; 399 100 ; 399 200 ; ... ; ... ; ...', answer: '399300,399400,399500' },
        { label: 'd) 399 940 ; 399 950 ; 399 960 ; ... ; ... ; ...', answer: '399970,399980,399990' },
        { label: 'e) 456 784 ; 456 785 ; 456 786 ; ... ; ... ; ...', answer: '456787,456788,456789' },
      ],
      hints: ['Tìm xem hai số liền nhau hơn kém nhau bao nhiêu, rồi cứ thế cộng thêm.'],
    },
  ],

  // ── Bài 8. Hàng và lớp (trang 11–12) ──────────────────────────────────────────────────────────
  'bai-8': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      headers: headLop(['Đọc số', 'Viết số'], ['Lớp nghìn', 'Lớp đơn vị']), colWidths: W8,
      rows: [
        { sample: true, cells: [wrap('Năm mươi tư nghìn ba trăm mười hai'), '54 312', '', 5, 4, 3, 1, 2] },
        [wrap('Bốn mươi lăm nghìn hai trăm mười ba'), blank(45213), ...digitCells(45213, 6, true)],
        [readCell(54302), '54 302', ...digitCells(54302, 6, true)],
        [readCell(654300), blank(654300), ...digitCells(654300, 6, false)],
        [wrap('Chín trăm mười hai nghìn tám trăm'), blank(912800), ...digitCells(912800, 6, true)],
      ],
      hints: ['Hàng trăm, chục, đơn vị là lớp đơn vị; hàng nghìn, chục nghìn, trăm nghìn là lớp nghìn.', 'Số có năm chữ số thì ô hàng trăm nghìn để trống.'],
    },
    {
      type: 'table', stars: 3, blanksFirst: true,
      q: '2. a) Đọc các số sau và cho biết chữ số 3 ở mỗi số đó thuộc hàng nào, lớp nào:\n46 307 ; 56 032 ; 123 517 ; 305 804 ; 960 783.\nb) Ghi giá trị của chữ số 7 trong mỗi số ở bảng sau (theo mẫu):',
      blanks: [46307, 56032, 123517, 305804, 960783].flatMap((n, i) => {
        const h = PLACE[posOf(n, 3)], l = posOf(n, 3) < 3 ? 'đơn vị' : 'nghìn';
        return [
          readBlank(`${i ? '' : 'a) '}${num(n)}: ...`, n),
          { label: 'Chữ số 3 thuộc hàng ..., lớp ...', answer: `${h},${l}`, validate: placeValidate([h, l]), tiles: HANG_TILES },
        ];
      }),
      rows: [
        ['Số', '38 753', '67 021', '79 518', '302 671', '715 519'],
        ['Giá trị của chữ số 7', sampleCell(700), blank(7000), blank(70000), blank(70), blank(700000)],
      ],
      hints: ['Đếm hàng từ phải sang trái. Ba hàng cuối là lớp đơn vị, ba hàng tiếp theo là lớp nghìn.', 'b) Chữ số 7 ở hàng nghìn có giá trị 7000, ở hàng chục có giá trị 70.'],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Viết mỗi số sau thành tổng (theo mẫu): 52 314 ; 503 060 ; 83 760 ; 176 091.\n${mau('52314 = 50000 + 2000 + 300 + 10 + 4')}`,
      blanks: [placeSum(503060), placeSum(83760), placeSum(176091)],
      hints: ['Mỗi chữ số khác 0 cho một số hạng; chữ số 0 thì bỏ qua.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Viết số, biết số đó gồm:',
      blanks: [
        { label: 'a) 5 trăm nghìn, 7 trăm, 3 chục và 5 đơn vị: ...', answer: '500735' },
        { label: 'b) 3 trăm nghìn, 4 trăm và 2 đơn vị: ...', answer: '300402' },
        { label: 'c) 2 trăm nghìn, 4 nghìn và 6 chục: ...', answer: '204060' },
        { label: 'd) 8 chục nghìn và 2 đơn vị: ...', answer: '80002' },
      ],
      hints: ['Hàng nào không được nhắc đến thì viết chữ số 0 ở hàng đó.'],
    },
    {
      type: 'fill', stars: 2,
      q: `5. Viết số thích hợp vào chỗ chấm (theo mẫu):\n${mau('Lớp nghìn của số 832 573 gồm các chữ số: 8 ; 3 ; 2.')}`,
      blanks: [
        { label: 'a) Lớp nghìn của số 603 786 gồm các chữ số: ... ; ... ; ...', answer: '6,0,3' },
        { label: 'b) Lớp đơn vị của số 603 785 gồm các chữ số: ... ; ... ; ...', answer: '7,8,5' },
        { label: 'c) Lớp đơn vị của số 532 004 gồm các chữ số: ... ; ... ; ...', answer: '0,0,4' },
      ],
      hints: ['Lớp đơn vị là ba chữ số cuối; lớp nghìn là ba chữ số đứng trước đó.'],
    },
  ],

  // ── Bài 9. So sánh các số có nhiều chữ số (trang 12–13) ───────────────────────────────────────
  'bai-9': [
    {
      type: 'compare', stars: 1,
      q: '1. >, <, = ?',
      rows: [cmp(9999, 10000), cmp(99999, 100000), cmp(726585, 557652), cmp(653211, 653211), cmp(43256, 432510), cmp(845713, 854713)],
      hints: ['Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số thì so từng hàng từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 1,
      q: '2. Tìm số lớn nhất trong các số sau: 59 876 ; 651 321 ; 499 873 ; 902 011.',
      blanks: [{ label: 'Số lớn nhất là: ...', answer: '902011', tiles: ['59 876', '651 321', '499 873', '902 011'], tileOne: true }],
      hints: ['Chọn trong các số có sáu chữ số, rồi so chữ số hàng trăm nghìn.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Xếp các số sau theo thứ tự từ bé đến lớn: 2467 ; 28 092 ; 943 567 ; 932 018.',
      blanks: [order('Từ bé đến lớn:', [2467, 28092, 932018, 943567], [2467, 28092, 943567, 932018])],
      hints: ['Số ít chữ số hơn thì bé hơn. Hai số sáu chữ số: so chữ số hàng chục nghìn.'],
    },
    {
      type: 'fill', stars: 1,
      q: '4. a) Số lớn nhất có ba chữ số là số nào?\nb) Số bé nhất có ba chữ số là số nào?\nc) Số lớn nhất có sáu chữ số là số nào?\nd) Số bé nhất có sáu chữ số là số nào?',
      blanks: [
        { label: 'a) ...', answer: '999' }, { label: 'b) ...', answer: '100' },
        { label: 'c) ...', answer: '999999' }, { label: 'd) ...', answer: '100000' },
      ],
      hints: ['Số lớn nhất: mọi chữ số đều là 9. Số bé nhất: chữ số đầu là 1, các chữ số sau là 0.'],
    },
  ],

  // ── Bài 10. Triệu và lớp triệu (trang 13–14) ──────────────────────────────────────────────────
  'bai-10': [
    {
      type: 'fill', stars: 1,
      q: '1. Đếm thêm 1 triệu từ 1 triệu đến 10 triệu.',
      blanks: [{ label: '1 000 000 ; 2 000 000 ; ... ; ... ; ... ; ... ; ... ; ... ; ... ; 10 000 000', answer: [3, 4, 5, 6, 7, 8, 9].map((k) => k * 1e6).join(',') }],
      hints: ['1 triệu viết là 1 000 000: chữ số 1 và sáu chữ số 0.'],
    },
    {
      type: 'fill', stars: 1,
      q: `2. Viết số thích hợp vào chỗ chấm (theo mẫu):\n${mau('1 chục triệu: 10 000 000 ; 2 chục triệu: 20 000 000 ; 1 trăm triệu: 100 000 000')}`,
      blanks: [
        ...[3, 4, 5, 6, 7, 8, 9].map((k) => ({ label: `${k} chục triệu: ...`, answer: String(k * 1e7) })),
        { label: '2 trăm triệu: ...', answer: '200000000' },
        { label: '3 trăm triệu: ...', answer: '300000000' },
      ],
      hints: ['1 chục triệu có bảy chữ số 0 phía sau chữ số 1; 1 trăm triệu có tám chữ số 0.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các số sau và cho biết mỗi số có bao nhiêu chữ số, mỗi số có bao nhiêu chữ số 0:',
      blanks: [
        ['Mười lăm nghìn', 15000], ['Ba trăm năm mươi', 350], ['Sáu trăm', 600], ['Một nghìn ba trăm', 1300],
        ['Năm mươi nghìn', 50000], ['Bảy triệu', 7000000], ['Ba mươi sáu triệu', 36000000], ['Chín trăm triệu', 900000000],
      ].map(([w, n]) => ({
        label: `${w}: ..., có ... chữ số, có ... chữ số 0`,
        answer: `${n},${String(n).length},${(String(n).match(/0/g) || []).length}`,
      })),
      hints: ['Viết số ra trước rồi đếm tất cả các chữ số, sau đó đếm riêng các chữ số 0.'],
    },
    {
      type: 'table', stars: 2,
      q: '4. Viết theo mẫu:',
      headers: headLop(['Đọc số', 'Viết số'], ['Lớp triệu', 'Lớp nghìn', 'Lớp đơn vị']), colWidths: W11,
      rows: [
        { sample: true, cells: [wrap('Ba trăm mười hai triệu'), '312 000 000', ...digitCells(312000000, 9, false)] },
        [readCell(236000000), '236 000 000', ...digitCells(236000000, 9, true)],
        [wrap('Chín trăm chín mươi triệu'), blank(990000000), ...digitCells(990000000, 9, true)],
        [wrap('Bảy trăm linh tám triệu'), blank(708000000), ...digitCells(708000000, 9, true)],
        [readCell(500000000), blank(500000000), ...digitCells(500000000, 9, false)],
      ],
      hints: ['Lớp triệu gồm hàng triệu, chục triệu, trăm triệu. Đọc ba chữ số của lớp triệu rồi thêm chữ "triệu".'],
    },
  ],

  // ── Bài 11. Triệu và lớp triệu (tiếp theo) (trang 14–15) ──────────────────────────────────────
  'bai-11': [
    {
      type: 'fill', stars: 2,
      q: `1. Viết và đọc số theo bảng:${bookTable9([32000000, 32516000, 32516497, 834291712, 308250705, 500209037])}`,
      blanks: [32000000, 32516000, 32516497, 834291712, 308250705, 500209037].flatMap((n, i) => [
        { label: `Dòng ${i + 1}. Viết số: ...`, answer: String(n) },
        readBlank('Đọc số: ...', n),
      ]),
      hints: ['Tách số thành từng lớp, mỗi lớp ba hàng.', 'Đọc từ trái sang phải: lớp triệu ("... triệu"), lớp nghìn ("... nghìn"), rồi lớp đơn vị.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Đọc các số sau: 7 312 836 ; 57 602 511 ; 351 600 307 ; 900 370 200 ; 400 070 192.',
      blanks: [7312836, 57602511, 351600307, 900370200, 400070192].map((n) => readBlank(`${num(n)}: ...`, n)),
      hints: ['Tách lớp từ phải sang trái, rồi đọc từ trái sang phải. Lớp có đủ ba chữ số mà hàng trăm là 0 thì đọc "không trăm".'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các số sau:',
      blanks: [
        { label: 'a) Mười triệu hai trăm năm mươi nghìn hai trăm mười bốn: ...', answer: '10250214' },
        { label: 'b) Hai trăm năm mươi ba triệu năm trăm sáu mươi tư nghìn tám trăm tám mươi tám: ...', answer: '253564888' },
        { label: 'c) Bốn trăm triệu không trăm ba mươi sáu nghìn một trăm linh năm: ...', answer: '400036105' },
        { label: 'd) Bảy trăm triệu không nghìn hai trăm ba mươi mốt: ...', answer: '700000231' },
      ],
      hints: ['Viết lớp triệu trước, sau đó lớp nghìn và lớp đơn vị, mỗi lớp viết đủ ba chữ số.'],
    },
    {
      type: 'fill', stars: 1,
      q: `4. Bảng dưới đây cho biết một vài số liệu về giáo dục phổ thông năm học 2003 – 2004:<table class="gw-book-table"><tr><th></th><th>Tiểu học</th><th>Trung học cơ sở</th><th>Trung học phổ thông</th></tr><tr><td>Số trường</td><td>14 316</td><td>9873</td><td>2140</td></tr><tr><td>Số học sinh</td><td>8 350 191</td><td>6 612 099</td><td>2 616 207</td></tr><tr><td>Số giáo viên</td><td>362 627</td><td>280 943</td><td>98 714</td></tr></table>Dựa vào bảng trên hãy trả lời các câu hỏi sau. Trong năm học 2003 – 2004:`,
      blanks: [
        { label: 'a) Số trường trung học cơ sở là: ...', answer: '9873' },
        { label: 'b) Số học sinh tiểu học là: ...', answer: '8350191' },
        { label: 'c) Số giáo viên trung học phổ thông là: ...', answer: '98714' },
      ],
      hints: ['Tìm dòng (số trường, số học sinh, số giáo viên) rồi tìm cột (cấp học); ô gặp nhau là câu trả lời.'],
    },
  ],

  // ── Bài 12. Luyện tập (trang 16) ──────────────────────────────────────────────────────────────
  'bai-12': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      headers: headLop(['Đọc số', 'Viết số'], ['Lớp triệu', 'Lớp nghìn', 'Lớp đơn vị']), colWidths: W11,
      rows: [
        { sample: true, cells: [wrap('Ba trăm mười lăm triệu bảy trăm nghìn tám trăm linh sáu'), '315 700 806', ...digitCells(315700806, 9, false)] },
        [wrap('Tám trăm năm mươi triệu ba trăm linh bốn nghìn chín trăm'), blank(850304900), ...digitCells(850304900, 9, true)],
        [readCell(403210715), '403 210 715', ...digitCells(403210715, 9, true)],
      ],
      hints: ['Mỗi lớp có ba hàng; lớp nào thiếu hàng thì viết chữ số 0 vào hàng đó.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Đọc các số sau: 32 640 507 ; 8 500 658 ; 830 402 960 ; 85 000 120 ; 178 320 005 ; 1 000 001.',
      blanks: [32640507, 8500658, 830402960, 85000120, 178320005, 1000001].map((n) => readBlank(`${num(n)}: ...`, n)),
      hints: ['Tách số thành lớp triệu, lớp nghìn, lớp đơn vị rồi đọc từ trái sang phải. Lớp toàn chữ số 0 thì không cần đọc.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các số sau:',
      blanks: [
        { label: 'a) Sáu trăm mười ba triệu: ...', answer: '613000000' },
        { label: 'b) Một trăm ba mươi mốt triệu bốn trăm linh năm nghìn: ...', answer: '131405000' },
        { label: 'c) Năm trăm mười hai triệu ba trăm hai mươi sáu nghìn một trăm linh ba: ...', answer: '512326103' },
        { label: 'd) Tám mươi sáu triệu không trăm linh bốn nghìn bảy trăm linh hai: ...', answer: '86004702' },
        { label: 'e) Tám trăm triệu không trăm linh bốn nghìn bảy trăm hai mươi: ...', answer: '800004720' },
      ],
      hints: ['Viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị; lớp nghìn và lớp đơn vị luôn đủ ba chữ số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Nêu giá trị của chữ số 5 trong mỗi số sau:',
      blanks: [[715638, 'a)'], [571638, 'b)'], [836571, 'c)']].map(([n, p]) => ({ label: `${p} ${num(n)}: chữ số 5 có giá trị là ...`, answer: String(valueOf(n, 5)) })),
      hints: ['Chữ số 5 ở hàng nào thì giá trị là 5 kèm theo số chữ số 0 đúng bằng số hàng đứng sau nó.'],
    },
  ],

  // ── Bài 13. Luyện tập (trang 17–18) ───────────────────────────────────────────────────────────
  'bai-13': [
    {
      type: 'fill', stars: 3,
      q: '1. Đọc số và nêu giá trị của chữ số 3 và chữ số 5 trong mỗi số sau:\na) 35 627 449 ; b) 123 456 789 ; c) 82 175 263 ; d) 850 003 200.',
      blanks: [[35627449, 'a)'], [123456789, 'b)'], [82175263, 'c)'], [850003200, 'd)']].flatMap(([n, p]) => [
        readBlank(`${p} ${num(n)}: ...`, n),
        { label: 'Chữ số 3 có giá trị ..., chữ số 5 có giá trị ...', answer: `${valueOf(n, 3)},${valueOf(n, 5)}` },
      ]),
      hints: ['Tìm hàng của chữ số rồi viết giá trị: chữ số 3 ở hàng chục triệu có giá trị 30 000 000.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số, biết số đó gồm:',
      blanks: [
        { label: 'a) 5 triệu, 7 trăm nghìn, 6 chục nghìn, 3 trăm, 4 chục và 2 đơn vị: ...', answer: '5760342' },
        { label: 'b) 5 triệu, 7 trăm nghìn, 6 nghìn, 3 trăm, 4 chục và 2 đơn vị: ...', answer: '5706342' },
        { label: 'c) 5 chục triệu, 7 chục nghìn, 6 nghìn, 3 trăm, 4 chục và 2 đơn vị: ...', answer: '50076342' },
        { label: 'd) 5 chục triệu, 7 triệu, 6 trăm nghìn, 3 chục nghìn, 4 nghìn và 2 đơn vị: ...', answer: '57634002' },
      ],
      hints: ['Kẻ các hàng từ trái sang phải, điền chữ số đã cho, hàng nào không có thì viết 0.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Số liệu điều tra dân số của một số nước vào tháng 12 năm 1999 được viết ở bảng bên:<table class="gw-book-table"><tr><th>Tên nước</th><th>Số dân</th></tr><tr><td>Việt Nam</td><td>77 263 000</td></tr><tr><td>Lào</td><td>5 300 000</td></tr><tr><td>Cam-pu-chia</td><td>10 900 000</td></tr><tr><td>Liên bang Nga</td><td>147 200 000</td></tr><tr><td>Hoa Kỳ</td><td>273 300 000</td></tr><tr><td>Ấn Độ</td><td>989 200 000</td></tr></table>',
      blanks: (() => {
        const T = ['Việt Nam', 'Lào', 'Cam-pu-chia', 'Liên bang Nga', 'Hoa Kỳ', 'Ấn Độ'];
        const one = (label, a) => ({ label, answer: a, validate: (v) => stripVN(v).replace(/[^a-z]/g, '') === stripVN(a).replace(/[^a-z]/g, ''), tiles: T, tileOne: true });
        const asc = ['Lào', 'Cam-pu-chia', 'Việt Nam', 'Liên bang Nga', 'Hoa Kỳ', 'Ấn Độ'];
        const norm = (x) => stripVN(x).replace(/[^a-z]/g, '');
        return [
          one('a) Nước có số dân nhiều nhất là: ...', 'Ấn Độ'),
          one('Nước có số dân ít nhất là: ...', 'Lào'),
          { label: 'b) Các nước theo thứ tự số dân từ ít đến nhiều: ...', answer: asc.join(', '), tiles: T, validate: (v) => norm(v) === asc.map(norm).join('') },
        ];
      })(),
      hints: ['So sánh các số dân: số nào có nhiều chữ số hơn thì lớn hơn; cùng số chữ số thì so từ hàng cao nhất.'],
    },
    {
      type: 'fill', stars: 2,
      q: `4. Cho biết: <b>Một nghìn triệu gọi là một tỉ.</b>\nViết vào chỗ chấm (theo mẫu):\n${mau('Viết 1 000 000 000, đọc "một nghìn triệu" hay "một tỉ".')}`,
      blanks: [
        { label: 'Viết 5 000 000 000, đọc "năm nghìn triệu" hay ...', answer: 'năm tỉ', validate: tiValidate('năm tỉ') },
        { label: 'Viết 315 000 000 000, đọc "ba trăm mười lăm nghìn triệu" hay ... tỉ', answer: 'ba trăm mười lăm', validate: tiValidate('ba trăm mười lăm', 'ba trăm mười năm') },
        {
          label: 'Viết ..., đọc ... triệu hay "ba tỉ"', answer: '3000000000,ba nghìn',
          validate: (v) => { const [a, b = ''] = String(v).split(','); return noSpace(a) === '3000000000' && tiValidate('ba nghìn')(b); },
        },
      ],
      hints: ['1 tỉ = 1000 triệu, viết là 1 000 000 000 (chín chữ số 0).', 'Mấy nghìn triệu thì gọi là mấy tỉ.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Trong lược đồ có ghi số dân của một số tỉnh, thành phố năm 2003. Đọc số dân của các tỉnh, thành phố đó:',
      blanks: [
        ['Hà Giang', 648100], ['Hà Nội', 3007000], ['Quảng Bình', 818300], ['Gia Lai', 1075200],
        ['Ninh Thuận', 546100], ['TP. Hồ Chí Minh', 5554800], ['Cà Mau', 1181200],
      ].map(([t, n]) => readBlank(`${t}: ${num(n)} người, đọc là ...`, n)),
      hints: ['Tách lớp từ phải sang trái, đọc từ trái sang phải: "... triệu ... nghìn ...".'],
    },
  ],

  // ── Bài 14. Dãy số tự nhiên (trang 19) ────────────────────────────────────────────────────────
  'bai-14': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết số tự nhiên liền sau của mỗi số sau vào ô trống:',
      blanks: [6, 29, 99, 100, 1000].map((n) => ({ label: `${num(n)} ; ...`, answer: String(n + 1) })),
      hints: ['Số liền sau = số đó thêm 1.'],
    },
    {
      type: 'fill', stars: 1,
      q: '2. Viết số tự nhiên liền trước của mỗi số sau vào ô trống:',
      blanks: [12, 100, 1000, 1002, 10000].map((n) => ({ label: `... ; ${num(n)}`, answer: String(n - 1) })),
      hints: ['Số liền trước = số đó bớt 1.'],
    },
    {
      type: 'fill', stars: 1,
      q: '3. Viết số thích hợp vào chỗ chấm để có ba số tự nhiên liên tiếp:',
      blanks: [
        { label: 'a) 4 ; 5 ; ...', answer: '6' }, { label: 'b) ... ; 87 ; 88', answer: '86' },
        { label: 'c) 896 ; ... ; 898', answer: '897' }, { label: 'd) 9 ; 10 ; ...', answer: '11' },
        { label: 'e) 99 ; 100 ; ...', answer: '101' }, { label: 'g) 9998 ; 9999 ; ...', answer: '10000' },
      ],
      hints: ['Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 909 ; 910 ; 911 ; ... ; ... ; ... ; ... ; ...', answer: '912,913,914,915,916' },
        { label: 'b) 0 ; 2 ; 4 ; 6 ; ... ; ... ; ... ; ... ; ... ; ... ; ...', answer: '8,10,12,14,16,18,20' },
        { label: 'c) 1 ; 3 ; 5 ; 7 ; ... ; ... ; ... ; ... ; ... ; ... ; ...', answer: '9,11,13,15,17,19,21' },
      ],
      hints: ['a) Mỗi số hơn số trước 1. b), c) Mỗi số hơn số trước 2.'],
    },
  ],

  // ── Bài 15. Viết số tự nhiên trong hệ thập phân (trang 20) ────────────────────────────────────
  'bai-15': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      headers: ['Đọc số', 'Viết số', 'Số gồm có'],
      rows: [
        { sample: true, cells: [wrap('Tám mươi nghìn bảy trăm mười hai'), '80 712', '8 chục nghìn, 7 trăm, 1 chục, 2 đơn vị'] },
        [wrap('Năm nghìn tám trăm sáu mươi tư'), blank(5864), blank(gomText(5864), { validate: gomValidate(5864) })],
        [readCell(2020), '2020', blank(gomText(2020), { validate: gomValidate(2020) })],
        [wrap('Năm mươi lăm nghìn năm trăm'), blank(55500), blank(gomText(55500), { validate: gomValidate(55500) })],
        [readCell(9000509), blank(9000509), '9 triệu, 5 trăm, 9 đơn vị'],
      ],
      hints: ['"Số gồm có": mỗi chữ số khác 0 viết kèm tên hàng của nó, ví dụ 8 chục nghìn, 7 trăm.'],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Viết mỗi số sau thành tổng (theo mẫu): 387 ; 873 ; 4738 ; 10 837.\n${mau('387 = 300 + 80 + 7')}`,
      blanks: [placeSum(873), placeSum(4738), placeSum(10837)],
      hints: ['Mỗi chữ số khác 0 cho một số hạng: giá trị của chữ số đó theo hàng.'],
    },
    {
      type: 'table', stars: 2,
      q: '3. Ghi giá trị của chữ số 5 trong mỗi số ở bảng sau (theo mẫu):',
      rows: [
        ['Số', 45, 57, 561, 5824, '5 842 769'],
        ['Giá trị của chữ số 5', sampleCell(5), blank(50), blank(500), blank(5000), blank(5000000)],
      ],
      hints: ['Giá trị của mỗi chữ số phụ thuộc vào vị trí (hàng) của nó trong số.'],
    },
  ],

  // ── Bài 16. So sánh và xếp thứ tự các số tự nhiên (trang 21–22) ───────────────────────────────
  'bai-16': [
    {
      type: 'compare', stars: 1,
      q: '1. >, <, = ?',
      rows: [
        cmp(1234, 999), cmp(8754, 87540),
        { left: '39 680', right: '39000 + 680', answer: '=' },
        cmp(35784, 35790), cmp(92501, 92410),
        { left: '17 600', right: '17000 + 600', answer: '=' },
      ],
      hints: ['Có phép tính thì tính trước rồi mới so sánh.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết các số sau theo thứ tự từ bé đến lớn:\na) 8316 ; 8136 ; 8361.\nb) 5724 ; 5742 ; 5740.\nc) 64 831 ; 64 813 ; 63 841.',
      blanks: [
        order('a)', [8136, 8316, 8361], [8316, 8136, 8361]),
        order('b)', [5724, 5740, 5742], [5724, 5742, 5740]),
        order('c)', [63841, 64813, 64831], [64831, 64813, 63841]),
      ],
      hints: ['So sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các số sau theo thứ tự từ lớn đến bé:\na) 1942 ; 1978 ; 1952 ; 1984.\nb) 1890 ; 1945 ; 1969 ; 1954.',
      blanks: [
        order('a)', [1984, 1978, 1952, 1942], [1942, 1978, 1952, 1984]),
        order('b)', [1969, 1954, 1945, 1890], [1890, 1945, 1969, 1954]),
      ],
      hints: ['Các số đều có hàng nghìn là 1: so hàng trăm, rồi hàng chục.'],
    },
  ],

  // ── Bài 17. Luyện tập (trang 22) ──────────────────────────────────────────────────────────────
  'bai-17': [
    {
      type: 'fill', stars: 1,
      q: '1. a) Viết số bé nhất: có một chữ số ; có hai chữ số ; có ba chữ số.\nb) Viết số lớn nhất: có một chữ số ; có hai chữ số ; có ba chữ số.',
      blanks: [
        { label: 'a) Có một chữ số: ... ; có hai chữ số: ... ; có ba chữ số: ...', answer: '0,10,100' },
        { label: 'b) Có một chữ số: ... ; có hai chữ số: ... ; có ba chữ số: ...', answer: '9,99,999' },
      ],
      hints: ['Số tự nhiên bé nhất là 0.', 'Số lớn nhất: mọi chữ số đều là 9.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a) Có bao nhiêu số có một chữ số?\nb) Có bao nhiêu số có hai chữ số?',
      blanks: [
        { label: 'a) Có ... số có một chữ số.', answer: '10' },
        { label: 'b) Có ... số có hai chữ số.', answer: '90' },
      ],
      hints: ['Số có một chữ số: từ 0 đến 9. Số có hai chữ số: từ 10 đến 99.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết chữ số thích hợp vào ô trống:',
      blanks: [
        { label: 'a) 859 ... 67 < 859 167', answer: '0', boxes: true },
        { label: 'b) 4 ... 2 037 > 482 037', answer: '9', boxes: true },
        { label: 'c) 609 608 < 609 60 ...', answer: '9', boxes: true },
        { label: 'd) 264 309 = ... 64 309', answer: '2', boxes: true },
      ],
      hints: ['So từng hàng từ trái sang phải; ô trống ở hàng đầu tiên khác nhau quyết định số nào lớn hơn.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Tìm số tự nhiên <i>x</i>, biết:\na) <i>x</i> < 5 ; b) 2 < <i>x</i> < 5.\nChú ý: Có thể giải như sau, chẳng hạn: a) Các số tự nhiên bé hơn 5 là: 0 ; 1 ; 2 ; 3 ; 4. Vậy <i>x</i> là: 0 ; 1 ; 2 ; 3 ; 4.',
      blanks: [
        { label: 'a) <i>x</i> là: ... ; ... ; ... ; ... ; ...', answer: '0,1,2,3,4', validate: anyOrderValidate([0, 1, 2, 3, 4]) },
        { label: 'b) <i>x</i> là: ... ; ...', answer: '3,4', validate: anyOrderValidate([3, 4]) },
      ],
      hints: ['b) Tìm các số tự nhiên lớn hơn 2 và bé hơn 5.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Tìm số tròn chục <i>x</i>, biết: 68 < <i>x</i> < 92.',
      blanks: [{ label: '<i>x</i> là: ... ; ... ; ...', answer: '70,80,90', validate: anyOrderValidate([70, 80, 90]) }],
      hints: ['Số tròn chục có chữ số hàng đơn vị là 0: 10, 20, 30, …'],
    },
  ],
};
