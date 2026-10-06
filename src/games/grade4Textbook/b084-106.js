/**
 * SGK Toán 4: bài 84–106 (sách trang 94–118).
 * Dấu hiệu chia hết cho 2, 5, 9, 3; ki-lô-mét vuông; hình bình hành; phân số, phân số bằng nhau,
 * rút gọn, quy đồng mẫu số.
 * Hình vẽ lại: scripts/redraw/g4t_bai084_106.py (bộ vẽ kit_g4t.py).
 */
import { blank, fr, fracValidate, mau, dsValidate, num, docSo } from './kit.js';
import { foldReading, docSoValidate } from '../../engine/numberWords.js';
import imgMatDo from '../../assets/grade4-textbook/bai92_q5_matdo.svg';
import imgHinhBH from '../../assets/grade4-textbook/bai93_q1_hinh.svg';
import imgTuGiac from '../../assets/grade4-textbook/bai93_q2_tugiac.svg';
import imgDtHbh from '../../assets/grade4-textbook/bai94_q1_hbh.svg';
import imgCnHbh from '../../assets/grade4-textbook/bai94_q2_hinh.svg';
import imgCanh from '../../assets/grade4-textbook/bai95_q1_canh.svg';
import imgChuViHbh from '../../assets/grade4-textbook/bai95_q3_hbh.svg';
import imgToMau from '../../assets/grade4-textbook/bai96_q1_tomau.svg';
import imgHinh76 from '../../assets/grade4-textbook/bai98_q2_hinh.svg';
import imgDoan from '../../assets/grade4-textbook/bai99_q5_doan.svg';
import imgSao from '../../assets/grade4-textbook/bai106_q4_sao.svg';

// ── Đồ dùng riêng của các bài này ───────────────────────────────────────────────────────────────
const strip = (s) => String(s).replace(/\s+/g, '');
const parts = (v) => String(v).split(/[;,]/).map(strip).filter(Boolean);

/** Tập số, không kể thứ tự ("98; 1000; 744"); số lớn gõ có hay không có khoảng trắng đều được. */
const numSet = (nums) => {
  const want = nums.map(String).sort().join('|');
  return (v) => parts(v).sort().join('|') === want;
};

/** "Trong các số …, số nào …?": ô chọn từ các số của đề (bấm số để viết), chấm không theo thứ tự. */
const pick = (label, nums, all) => ({
  label: `${label} ...`, answer: nums.map(num).join('; '), validate: numSet(nums), tiles: all.map(num), tileSep: '; ',
});

/** "Viết n số …": n số khác nhau, mỗi số đúng tính chất pred (không có chữ số 0 đứng đầu). */
const propNums = (n, pred) => (v) => {
  const xs = parts(v);
  return xs.length === n && new Set(xs).size === n && xs.every(s => /^[1-9]\d*$/.test(s) && pred(Number(s)));
};
const digits3 = (n) => n >= 100 && n <= 999;

/** Ô trống chữ số: mỗi ô một chữ số, ô thứ i đúng khi preds[i](chữ số) đúng (nhận mọi chữ số hợp lệ). */
const digitsV = (...preds) => (v) => {
  const ds = String(v).split(',').map(s => s.trim());
  return ds.length === preds.length && ds.every((d, i) => /^\d$/.test(d) && preds[i](Number(d)));
};

/** Đọc phân số a/b: "ba phần tư" = "ba phần bốn", "năm phần tám" … */
const readFrac = (a, b) => {
  const want = foldReading(`${docSo(a)} phần ${docSo(b)}`);
  return (v) => foldReading(v) === want;
};
const fracRead = (label, a, b) => ({ label, answer: `${docSo(a)} phần ${docSo(b)}`, validate: readFrac(a, b) });

/** Ô viết phân số đúng dạng (không nhận phân số bằng). */
const frx = (label, a, b) => ({ label, answer: `${a},${b}`, validate: fracValidate(a, b, true) });

/** Nhiều phân số trong một ô (quy đồng): đúng một trong các bộ đáp án alts (mỗi bộ: [tử, mẫu, tử, mẫu, …]). */
const fracsV = (...alts) => (v) => {
  const got = String(v).split(',').map(s => Number(s.trim()));
  return alts.some(alt => alt.length === got.length && alt.every((x, i) => x === got[i]));
};
const qd = (label, ...alts) => ({ label, answer: alts[0].join(','), validate: fracsV(...alts) });

/** Phân số có ô trống ở tử và/hoặc mẫu: "..." là ô điền, chữ khác là phần sách đã in. */
const row = (s) => (s.includes('...') && s.trim() !== '...' ? `<span style="display:inline-flex;align-items:center;gap:0.15em">${s}</span>` : s);
const F = (top, bot) => `[[fa]]${row(top)}[[fb]]${row(bot)}[[fc]]`;

/** Hai cặp cạnh đối diện "AB và DC ; AD và BC": không kể thứ tự cặp, thứ tự cạnh, AB = BA. */
const pairsV = (p1, p2) => {
  const seg = (s) => [...String(s).trim().toUpperCase()].sort().join('');
  const key = (a, b, c, d) => [[seg(a), seg(b)].sort().join('-'), [seg(c), seg(d)].sort().join('-')].sort().join('|');
  const want = key(...p1, ...p2);
  return (v) => {
    const s = String(v).split(',');
    return s.length === 4 && s.every(x => /^[A-Za-z]{2}$/.test(x.trim())) && key(...s) === want;
  };
};

/** Ô diện tích như mẫu "7 × 16 = 112": nhận cả phép tính lẫn chỉ kết quả. */
const areaV = (a, b) => (v) => {
  const s = strip(v).replace(/[x*]/gi, '×');
  if (s === String(a * b)) return true;
  const m = s.match(/^(\d+)×(\d+)=(\d+)$/);
  return !!m && Number(m[3]) === a * b && [m[1], m[2]].sort().join() === [String(a), String(b)].sort().join();
};

const CMP = ['>', '<', '='];

/** Ô "Đọc" diện tích km²: mọi cách đọc đúng của số, có hay không có "ki-lô-mét vuông" ở cuối. */
const readKm2 = (n) => {
  const ok = docSoValidate(n);
  return blank(`${docSo(n)} ki-lô-mét vuông`, { validate: (v) => ok(String(v).replace(/\s*(ki-?lô-?mét vuông|km²|km2)\s*\.?$/i, '')) });
};
const tile1 = (label, answer, tiles) => ({ label, answer, tiles, tileOne: true });

export const QUESTIONS = {
  // ── Bài 84. Dấu hiệu chia hết cho 2 (trang 94–95) ─────────────────────────────────────────────
  'bai-84': [
    {
      type: 'fill', stars: 2,
      q: '1. Trong các số 35 ; 89 ; 98 ; 1000 ; 744 ; 867 ; 7536 ; 84 683 ; 5782 ; 8401 :',
      blanks: [
        pick('a) Số chia hết cho 2:', [98, 1000, 744, 7536, 5782], [35, 89, 98, 1000, 744, 867, 7536, 84683, 5782, 8401]),
        pick('b) Số không chia hết cho 2:', [35, 89, 867, 84683, 8401], [35, 89, 98, 1000, 744, 867, 7536, 84683, 5782, 8401]),
      ],
      hints: ['Nhìn chữ số tận cùng: 0, 2, 4, 6, 8 thì chia hết cho 2; 1, 3, 5, 7, 9 thì không chia hết cho 2.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a) Viết bốn số có hai chữ số, mỗi số đều chia hết cho 2.\nb) Viết hai số có ba chữ số, mỗi số đều không chia hết cho 2.',
      blanks: [
        { label: 'a) ... ; ... ; ... ; ...', answer: '90,92,94,96', validate: propNums(4, n => n >= 10 && n <= 99 && n % 2 === 0) },
        { label: 'b) ... ; ...', answer: '901,903', validate: propNums(2, n => digits3(n) && n % 2 === 1) },
      ],
      hints: ['a) Số có hai chữ số, chữ số tận cùng là 0, 2, 4, 6 hoặc 8.', 'b) Số có ba chữ số, chữ số tận cùng là 1, 3, 5, 7 hoặc 9. Các số phải khác nhau.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. a) Với ba chữ số 3 ; 4 ; 6 hãy viết các số chẵn có ba chữ số, mỗi số có cả ba chữ số đó.\nb) Với ba chữ số 3 ; 5 ; 6 hãy viết các số lẻ có ba chữ số, mỗi số có cả ba chữ số đó.',
      blanks: [
        { label: 'a) ... ; ... ; ... ; ...', answer: '346,364,436,634', validate: numSet([346, 364, 436, 634]) },
        { label: 'b) ... ; ... ; ... ; ...', answer: '365,635,563,653', validate: numSet([365, 635, 563, 653]) },
      ],
      hints: ['a) Số chẵn thì chữ số cuối là 4 hoặc 6; hai chữ số còn lại đổi chỗ cho nhau.', 'b) Số lẻ thì chữ số cuối là 3 hoặc 5.'],
    },
    {
      type: 'fill', stars: 1,
      q: '4. a) Viết số chẵn thích hợp vào chỗ chấm.\nb) Viết số lẻ thích hợp vào chỗ chấm.',
      blanks: [
        { label: 'a) 340 ; 342 ; 344 ; ... ; ... ; 350.', answer: '346,348' },
        { label: 'b) 8347 ; 8349 ; 8351 ; ... ; ... ; 8357.', answer: '8353,8355' },
      ],
      hints: ['Hai số chẵn (hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị.'],
    },
  ],

  // ── Bài 85. Dấu hiệu chia hết cho 5 (trang 95–96) ─────────────────────────────────────────────
  'bai-85': [
    {
      type: 'fill', stars: 2,
      q: '1. Trong các số 35 ; 8 ; 57 ; 660 ; 4674 ; 3000 ; 945 ; 5553 :',
      blanks: [
        pick('a) Số chia hết cho 5:', [35, 660, 3000, 945], [35, 8, 57, 660, 4674, 3000, 945, 5553]),
        pick('b) Số không chia hết cho 5:', [8, 57, 4674, 5553], [35, 8, 57, 660, 4674, 3000, 945, 5553]),
      ],
      hints: ['Số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số chia hết cho 5 thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 150 < ... < 160 ;', answer: '155' },
        { label: 'b) 3575 < ... < 3585 ;', answer: '3580' },
        { label: 'c) 335 ; 340 ; 345 ; ... ; ... ; 360.', answer: '350,355' },
      ],
      hints: ['Các số chia hết cho 5 liên tiếp hơn kém nhau 5 đơn vị.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Với ba chữ số 0 ; 5 ; 7 hãy viết các số có ba chữ số, mỗi số có cả ba chữ số đó và đều chia hết cho 5.',
      blanks: [{ label: '... ; ... ; ...', answer: '750,570,705', validate: numSet([750, 570, 705]) }],
      hints: ['Chữ số cuối phải là 0 hoặc 5. Chữ số 0 không đứng đầu.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Trong các số 35 ; 8 ; 57 ; 660 ; 945 ; 5553 ; 3000 :',
      blanks: [
        pick('a) Số vừa chia hết cho 5 vừa chia hết cho 2:', [660, 3000], [35, 8, 57, 660, 945, 5553, 3000]),
        pick('b) Số chia hết cho 5 nhưng không chia hết cho 2:', [35, 945], [35, 8, 57, 660, 945, 5553, 3000]),
      ],
      hints: ['Chia hết cho cả 2 và 5: chữ số tận cùng là 0. Chia hết cho 5 mà không chia hết cho 2: tận cùng là 5.'],
    },
  ],

  // ── Bài 86. Luyện tập (trang 96) ──────────────────────────────────────────────────────────────
  'bai-86': [
    {
      type: 'fill', stars: 2,
      q: '1. Trong các số 3457 ; 4568 ; 66 814 ; 2050 ; 2229 ; 3576 ; 900 ; 2355 :',
      blanks: [
        pick('a) Số chia hết cho 2:', [4568, 66814, 2050, 3576, 900], [3457, 4568, 66814, 2050, 2229, 3576, 900, 2355]),
        pick('b) Số chia hết cho 5:', [2050, 900, 2355], [3457, 4568, 66814, 2050, 2229, 3576, 900, 2355]),
      ],
      hints: ['Chia hết cho 2: tận cùng 0, 2, 4, 6, 8. Chia hết cho 5: tận cùng 0 hoặc 5.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a) Hãy viết ba số có ba chữ số và chia hết cho 2.\nb) Hãy viết ba số có ba chữ số và chia hết cho 5.',
      blanks: [
        { label: 'a) ... ; ... ; ...', answer: '900,902,904', validate: propNums(3, n => digits3(n) && n % 2 === 0) },
        { label: 'b) ... ; ... ; ...', answer: '905,910,915', validate: propNums(3, n => digits3(n) && n % 5 === 0) },
      ],
      hints: ['Viết ba số khác nhau, mỗi số có ba chữ số; chọn chữ số tận cùng cho đúng dấu hiệu.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Trong các số 345 ; 480 ; 296 ; 341 ; 2000 ; 3995 ; 9010 ; 324 :',
      blanks: [
        pick('a) Số vừa chia hết cho 2 vừa chia hết cho 5:', [480, 2000, 9010], [345, 480, 296, 341, 2000, 3995, 9010, 324]),
        pick('b) Số chia hết cho 2 nhưng không chia hết cho 5:', [296, 324], [345, 480, 296, 341, 2000, 3995, 9010, 324]),
        pick('c) Số chia hết cho 5 nhưng không chia hết cho 2:', [345, 3995], [345, 480, 296, 341, 2000, 3995, 9010, 324]),
      ],
      hints: ['Tận cùng là 0: chia hết cho cả 2 và 5. Tận cùng 2, 4, 6, 8: chỉ chia hết cho 2. Tận cùng 5: chỉ chia hết cho 5.'],
    },
    {
      type: 'fill', stars: 1,
      q: '4. Số vừa chia hết cho 2 vừa chia hết cho 5 thì có chữ số tận cùng là chữ số nào?',
      blanks: [{ label: 'Chữ số tận cùng là chữ số ...', answer: '0' }],
      hints: ['Chia hết cho 5 thì tận cùng là 0 hoặc 5; trong hai chữ số đó, chữ số nào là số chẵn?'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '5. Loan có ít hơn 20 quả táo. Biết rằng, nếu Loan đem số táo đó chia đều cho 5 bạn hoặc chia đều cho 2 bạn thì cũng vừa hết. Hỏi Loan có bao nhiêu quả táo?',
      blanks: [{ label: 'Loan có ... quả táo.', answer: '10' }],
      hints: ['Số táo vừa chia hết cho 5 vừa chia hết cho 2, nên có chữ số tận cùng là 0.', 'Số đó lớn hơn 0 và bé hơn 20.'],
    },
  ],

  // ── Bài 87. Dấu hiệu chia hết cho 9 (trang 97) ────────────────────────────────────────────────
  'bai-87': [
    {
      type: 'choice', stars: 2, multi: true,
      q: '1. Trong các số sau, số nào chia hết cho 9?\n99 ; 1999 ; 108 ; 5643 ; 29 385.',
      options: ['99', '1999', '108', '5643', '29 385'], answer: [0, 2, 3, 4],
      hints: ['Cộng các chữ số của mỗi số. Tổng chia hết cho 9 thì số đó chia hết cho 9.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: '2. Trong các số sau, số nào không chia hết cho 9?\n96 ; 108 ; 7853 ; 5554 ; 1097.',
      options: ['96', '108', '7853', '5554', '1097'], answer: [0, 2, 3, 4],
      hints: ['Tổng các chữ số không chia hết cho 9 thì số đó không chia hết cho 9.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết hai số có ba chữ số và chia hết cho 9.',
      blanks: [{ label: '... ; ...', answer: '900,909', validate: propNums(2, n => digits3(n) && n % 9 === 0) }],
      hints: ['Chọn ba chữ số có tổng là 9 hoặc 18, ví dụ 1, 2, 6 (1 + 2 + 6 = 9).'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Tìm chữ số thích hợp viết vào ô trống để được số chia hết cho 9:',
      blanks: [{
        label: '31... ; ...35 ; 2...5.', answer: '5,1,2', boxes: true,
        validate: digitsV(d => (310 + d) % 9 === 0, d => d > 0 && (d * 100 + 35) % 9 === 0, d => (205 + d * 10) % 9 === 0),
      }],
      hints: ['Cộng các chữ số đã có, rồi tìm chữ số thêm vào để tổng chia hết cho 9.', 'Chữ số đứng đầu một số phải khác 0.'],
    },
  ],

  // ── Bài 88. Dấu hiệu chia hết cho 3 (trang 97–98) ─────────────────────────────────────────────
  'bai-88': [
    {
      type: 'choice', stars: 2, multi: true,
      q: '1. Trong các số sau, số nào chia hết cho 3?\n231 ; 109 ; 1872 ; 8225 ; 92 313.',
      options: ['231', '109', '1872', '8225', '92 313'], answer: [0, 2, 4],
      hints: ['Cộng các chữ số. Tổng chia hết cho 3 thì số đó chia hết cho 3.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: '2. Trong các số sau, số nào không chia hết cho 3?\n96 ; 502 ; 6823 ; 55 553 ; 641 311.',
      options: ['96', '502', '6823', '55 553', '641 311'], answer: [1, 2, 3, 4],
      hints: ['Tổng các chữ số không chia hết cho 3 thì số đó không chia hết cho 3.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết ba số có ba chữ số và chia hết cho 3.',
      blanks: [{ label: '... ; ... ; ...', answer: '900,903,906', validate: propNums(3, n => digits3(n) && n % 3 === 0) }],
      hints: ['Chọn các chữ số có tổng chia hết cho 3, ví dụ 1, 1, 1 hoặc 1, 2, 3.'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Tìm chữ số thích hợp viết vào ô trống để được các số chia hết cho 3 nhưng không chia hết cho 9:',
      blanks: [{
        label: '56... ; 79... ; 2...35.', answer: '1,5,2', boxes: true,
        validate: digitsV(...[(d) => 560 + d, (d) => 790 + d, (d) => 2035 + d * 100].map(f => (d) => f(d) % 3 === 0 && f(d) % 9 !== 0)),
      }],
      hints: ['Tổng các chữ số phải chia hết cho 3 nhưng không chia hết cho 9.'],
    },
  ],

  // ── Bài 89. Luyện tập (trang 98) ──────────────────────────────────────────────────────────────
  'bai-89': [
    {
      type: 'fill', stars: 2,
      q: '1. Trong các số 3451 ; 4563 ; 2050 ; 2229 ; 3576 ; 66 816 :',
      blanks: [
        pick('a) Số chia hết cho 3:', [4563, 2229, 3576, 66816], [3451, 4563, 2050, 2229, 3576, 66816]),
        pick('b) Số chia hết cho 9:', [4563, 66816], [3451, 4563, 2050, 2229, 3576, 66816]),
        pick('c) Số chia hết cho 3 nhưng không chia hết cho 9:', [2229, 3576], [3451, 4563, 2050, 2229, 3576, 66816]),
      ],
      hints: ['Tính tổng các chữ số của từng số rồi xét tổng đó chia hết cho 3, cho 9 hay không.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tìm chữ số thích hợp để viết vào ô trống sao cho:',
      blanks: [
        { label: 'a) 94... chia hết cho 9 ;', answer: '5', boxes: true, validate: digitsV(d => (940 + d) % 9 === 0) },
        { label: 'b) 2...5 chia hết cho 3 ;', answer: '2', boxes: true, validate: digitsV(d => (205 + d * 10) % 3 === 0) },
        { label: 'c) 76... chia hết cho 3 và chia hết cho 2.', answer: '2', boxes: true, validate: digitsV(d => (760 + d) % 6 === 0) },
      ],
      hints: ['Cộng các chữ số đã có rồi tìm chữ số còn thiếu.', 'c) Chia hết cho 2 nên chữ số cuối phải là số chẵn.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Câu nào đúng, câu nào sai?',
      blanks: [
        { label: 'a) Số 13 465 không chia hết cho 3 ; ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'b) Số 70 009 chia hết cho 9 ; ...', answer: 'S', validate: dsValidate(false) },
        { label: 'c) Số 78 435 không chia hết cho 9 ; ...', answer: 'S', validate: dsValidate(false) },
        { label: 'd) Số có chữ số tận cùng là 0 thì vừa chia hết cho 2 vừa chia hết cho 5. ...', answer: 'Đ', validate: dsValidate(true) },
      ],
      hints: ['Tính tổng các chữ số: 1 + 3 + 4 + 6 + 5, 7 + 0 + 0 + 0 + 9, 7 + 8 + 4 + 3 + 5.'],
    },
    {
      type: 'fill', stars: 4,
      q: '4. Với bốn chữ số 0 ; 6 ; 1 ; 2.\na) Hãy viết ít nhất ba số có ba chữ số (ba chữ số khác nhau) và chia hết cho 9 ;\nb) Hãy viết một số có ba chữ số (ba chữ số khác nhau) chia hết cho 3 nhưng không chia hết cho 9.',
      blanks: [
        { label: 'a) ... ; ... ; ...', answer: '612,621,126', validate: propNums(3, n => digits3(n) && new Set(String(n)).size === 3 && [...String(n)].every(d => '0612'.includes(d)) && n % 9 === 0) },
        { label: 'b) ...', answer: '120', validate: propNums(1, n => digits3(n) && new Set(String(n)).size === 3 && [...String(n)].every(d => '0612'.includes(d)) && n % 3 === 0 && n % 9 !== 0) },
      ],
      hints: ['a) Chọn ba chữ số có tổng là 9: 6 + 1 + 2 = 9, rồi đổi chỗ các chữ số.', 'b) Chọn ba chữ số có tổng chia hết cho 3 nhưng không chia hết cho 9: 0 + 1 + 2 = 3. Chữ số 0 không đứng đầu.'],
    },
  ],

  // ── Bài 90. Luyện tập chung (trang 99) ────────────────────────────────────────────────────────
  'bai-90': [
    {
      type: 'fill', stars: 3,
      q: '1. Trong các số 7435 ; 4568 ; 66 811 ; 2050 ; 2229 ; 35 766 :',
      blanks: [
        pick('a) Số chia hết cho 2:', [4568, 2050, 35766], [7435, 4568, 66811, 2050, 2229, 35766]),
        pick('b) Số chia hết cho 3:', [2229, 35766], [7435, 4568, 66811, 2050, 2229, 35766]),
        pick('c) Số chia hết cho 5:', [7435, 2050], [7435, 4568, 66811, 2050, 2229, 35766]),
        pick('d) Số chia hết cho 9:', [35766], [7435, 4568, 66811, 2050, 2229, 35766]),
      ],
      hints: ['Chia hết cho 2, cho 5: nhìn chữ số tận cùng. Chia hết cho 3, cho 9: tính tổng các chữ số.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Trong các số 57 234 ; 64 620 ; 5270 ; 77 285 :',
      blanks: [
        pick('a) Số chia hết cho cả 2 và 5:', [64620, 5270], [57234, 64620, 5270, 77285]),
        pick('b) Số chia hết cho cả 3 và 2:', [57234, 64620], [57234, 64620, 5270, 77285]),
        pick('c) Số chia hết cho cả 2 ; 3 ; 5 và 9:', [64620], [57234, 64620, 5270, 77285]),
      ],
      hints: ['Số phải đúng cùng lúc mọi dấu hiệu được nêu.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tìm chữ số thích hợp để viết vào ô trống sao cho:',
      blanks: [
        { label: 'a) 5...8 chia hết cho 3 ;', answer: '2', boxes: true, validate: digitsV(d => (508 + d * 10) % 3 === 0) },
        { label: 'b) 6...3 chia hết cho 9 ;', answer: '0', boxes: true, validate: digitsV(d => (603 + d * 10) % 9 === 0) },
        { label: 'c) 24... chia hết cho cả 3 và 5 ;', answer: '0', boxes: true, validate: digitsV(d => (240 + d) % 15 === 0) },
        { label: 'd) 35... chia hết cho cả 2 và 3.', answer: '4', boxes: true, validate: digitsV(d => (350 + d) % 6 === 0) },
      ],
      hints: ['Chia hết cho 5: chữ số cuối là 0 hoặc 5. Chia hết cho 2: chữ số cuối chẵn.', 'Chia hết cho 3, cho 9: xét tổng các chữ số.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '4. Tính giá trị của mỗi biểu thức sau rồi xét xem giá trị đó chia hết cho những số nào trong các số 2 ; 5 :',
      blanks: [
        { label: 'a) 2253 + 4315 − 173 = ...', answer: '6395' },
        { label: 'chia hết cho: ...', answer: '5', validate: numSet([5]), tiles: ['2', '5'], tileSep: '; ' },
        { label: 'b) 6438 − 2325 × 2 = ...', answer: '1788' },
        { label: 'chia hết cho: ...', answer: '2', validate: numSet([2]), tiles: ['2', '5'], tileSep: '; ' },
        { label: 'c) 480 − 120 : 4 = ...', answer: '450' },
        { label: 'chia hết cho: ...', answer: '2; 5', validate: numSet([2, 5]), tiles: ['2', '5'], tileSep: '; ' },
        { label: 'd) 63 + 24 × 3 = ...', answer: '135' },
        { label: 'chia hết cho: ...', answer: '5', validate: numSet([5]), tiles: ['2', '5'], tileSep: '; ' },
      ],
      hints: ['Nhân, chia trước; cộng, trừ sau.', 'Rồi nhìn chữ số tận cùng của kết quả.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '5. Một lớp học có ít hơn 35 học sinh và nhiều hơn 20 học sinh. Nếu học sinh trong lớp xếp đều thành 3 hàng hoặc thành 5 hàng thì không thừa, không thiếu bạn nào. Tìm số học sinh của lớp học đó.',
      blanks: [{ label: 'Lớp học đó có ... học sinh.', answer: '30' }],
      hints: ['Số học sinh vừa chia hết cho 3 vừa chia hết cho 5, và ở giữa 20 và 35.'],
    },
  ],

  // ── Bài 91. Ki-lô-mét vuông (trang 99–100) ────────────────────────────────────────────────────
  'bai-91': [
    {
      type: 'table', stars: 2,
      q: '1. Viết số hoặc chữ thích hợp vào ô trống:',
      headers: ['Đọc', 'Viết'], colWidths: ['68%', '32%'],
      rows: [
        ['Chín trăm hai mươi mốt<br>ki-lô-mét vuông', blank('921', { suffix: 'km²' })],
        ['Hai nghìn<br>ki-lô-mét vuông', blank('2000', { suffix: 'km²' })],
        [readKm2(509), '509km²'],
        [readKm2(320000), '320 000km²'],
      ],
      hints: ['Đọc số trước rồi đọc tên đơn vị "ki-lô-mét vuông"; km² viết sau số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '1km² = ... m²', answer: '1000000' },
        { label: '1m² = ... dm²', answer: '100' },
        { label: '32m² 49dm² = ... dm²', answer: '3249' },
        { label: '1 000 000m² = ... km²', answer: '1' },
        { label: '5km² = ... m²', answer: '5000000' },
        { label: '2 000 000m² = ... km²', answer: '2' },
      ],
      hints: ['1km² = 1 000 000m²; 1m² = 100dm².'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '3. Một khu rừng hình chữ nhật có chiều dài 3km và chiều rộng 2km. Hỏi diện tích của khu rừng đó bằng bao nhiêu ki-lô-mét vuông?',
      blanks: [{ label: 'Diện tích khu rừng là: ... km²', answer: '6' }],
      hints: ['Diện tích hình chữ nhật = chiều dài × chiều rộng.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Trong các số dưới đây, chọn ra số đo thích hợp chỉ:\na) Diện tích phòng học: 81cm² ; 900dm² ; 40m².\nb) Diện tích nước Việt Nam: 5 000 000m² ; 324 000dm² ; 330 991km².',
      blanks: [
        { ...tile1('a) Diện tích phòng học: ...', '40m²', ['81cm²', '900dm²', '40m²']), validate: (v) => strip(v) === '40m²' },
        { ...tile1('b) Diện tích nước Việt Nam: ...', '330 991km²', ['5 000 000m²', '324 000dm²', '330 991km²']), validate: (v) => strip(v) === '330991km²' },
      ],
      hints: ['900dm² chỉ bằng 9m², nhỏ như một cái bàn lớn. 5 000 000m² chỉ bằng 5km².'],
    },
  ],

  // ── Bài 92. Luyện tập (trang 100–101) ─────────────────────────────────────────────────────────
  'bai-92': [
    {
      type: 'fill', stars: 2,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '530dm² = ... cm²', answer: '53000' },
        { label: '84 600cm² = ... dm²', answer: '846' },
        { label: '10km² = ... m²', answer: '10000000' },
        { label: '13dm² 29cm² = ... cm²', answer: '1329' },
        { label: '300dm² = ... m²', answer: '3' },
        { label: '9 000 000m² = ... km²', answer: '9' },
      ],
      hints: ['1dm² = 100cm²; 1m² = 100dm²; 1km² = 1 000 000m².'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính diện tích khu đất hình chữ nhật, biết:\na) Chiều dài 5km, chiều rộng 4km ;\nb) Chiều dài 8000m, chiều rộng 2km.',
      blanks: [
        { label: 'a) Diện tích khu đất là: ... km²', answer: '20' },
        { label: 'b) Diện tích khu đất là: ... km²', answer: '16' },
      ],
      hints: ['b) Đổi 8000m = 8km rồi mới nhân.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Cho biết diện tích của ba thành phố (theo số liệu năm 2002) là:<table class="gw-book-table"><tr><td>Hà Nội<br>921km²</td><td>Đà Nẵng<br>1255km²</td><td>TP. Hồ Chí Minh<br>2095km²</td></tr></table>a) So sánh diện tích của: Hà Nội và Đà Nẵng ; Đà Nẵng và Thành phố Hồ Chí Minh ; Thành phố Hồ Chí Minh và Hà Nội.\nb) Thành phố nào có diện tích lớn nhất? Thành phố nào có diện tích bé nhất?',
      blanks: [
        tile1('a) Diện tích Hà Nội ... diện tích Đà Nẵng', '<', CMP),
        tile1('Diện tích Đà Nẵng ... diện tích TP. Hồ Chí Minh', '<', CMP),
        tile1('Diện tích TP. Hồ Chí Minh ... diện tích Hà Nội', '>', CMP),
        tile1('b) Thành phố có diện tích lớn nhất: ...', 'TP. Hồ Chí Minh', ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh']),
        tile1('Thành phố có diện tích bé nhất: ...', 'Hà Nội', ['Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh']),
      ],
      hints: ['So sánh 921, 1255 và 2095.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `4. Một khu đất hình chữ nhật có chiều dài 3km, chiều rộng bằng ${fr(1, 3)} chiều dài. Tính diện tích khu đất đó.`,
      blanks: [
        { label: 'Chiều rộng khu đất là: ... km', answer: '1' },
        { label: 'Diện tích khu đất là: ... km²', answer: '3' },
      ],
      hints: [`Chiều rộng bằng ${fr(1, 3)} chiều dài: lấy 3 : 3.`, 'Diện tích = chiều dài × chiều rộng.'],
    },
    {
      type: 'fill', stars: 3, img: imgMatDo,
      q: '5. Cho biết mật độ dân số chỉ số dân trung bình sinh sống trên diện tích 1km². Biểu đồ dưới đây nói về mật độ dân số của ba thành phố lớn (theo số liệu năm 1999).\nDựa vào biểu đồ trên hãy trả lời các câu hỏi sau:',
      blanks: [
        tile1('a) Thành phố có mật độ dân số lớn nhất là: ...', 'Hà Nội', ['Hà Nội', 'Hải Phòng', 'TP. Hồ Chí Minh']),
        { label: 'b) Mật độ dân số ở Thành phố Hồ Chí Minh gấp khoảng ... lần mật độ dân số ở Hải Phòng.', answer: '2' },
      ],
      hints: ['b) 2375 gần bằng 2 lần 1126 (1126 × 2 = 2252).'],
    },
  ],

  // ── Bài 93. Hình bình hành (trang 102–103) ────────────────────────────────────────────────────
  'bai-93': [
    {
      type: 'choice', stars: 2, multi: true, img: imgHinhBH,
      q: '1. Trong các hình sau, hình nào là hình bình hành?',
      options: ['Hình 1', 'Hình 2', 'Hình 3', 'Hình 4', 'Hình 5'], answer: [0, 1, 4],
      hints: ['Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.'],
    },
    {
      type: 'choice', stars: 1, img: imgTuGiac,
      q: '2. Cho biết trong hình tứ giác ABCD: AB và DC là hai cạnh đối diện. AD và BC là hai cạnh đối diện.\nHình tứ giác ABCD và hình bình hành MNPQ, trong hai hình đó hình nào có cặp cạnh đối diện song song và bằng nhau?',
      options: ['Hình tứ giác ABCD', 'Hình bình hành MNPQ'], answer: 1,
      hints: ['So sánh độ dài cạnh MN với QP, cạnh AB với DC.'],
      // 📐 Kéo dài: toạ độ theo bai93_q2_tugiac.svg.
      geoPlay: { points: { A: [90, 70], B: [240, 40], C: [290, 200], D: [40, 185], M: [440, 50], N: [640, 50], P: [580, 190], Q: [380, 190] }, segs: ['AB', 'BC', 'DC', 'AD', 'MN', 'NP', 'QP', 'MQ'], fill: ['ABCD', 'MNPQ'], pick: 'AB' },
    },
  ],

  // ── Bài 94. Diện tích hình bình hành (trang 103–104) ──────────────────────────────────────────
  'bai-94': [
    {
      type: 'fill', stars: 2, img: imgDtHbh,
      q: '1. Tính diện tích mỗi hình bình hành sau:',
      blanks: [
        { label: 'Hình thứ nhất: ... cm²', answer: '45' },
        { label: 'Hình thứ hai: ... cm²', answer: '52' },
        { label: 'Hình thứ ba: ... cm²', answer: '63' },
      ],
      hints: ['Diện tích hình bình hành = độ dài đáy × chiều cao.'],
    },
    {
      type: 'fill', stars: 2, img: imgCnHbh,
      q: '2. Tính diện tích của:\na) Hình chữ nhật ;\nb) Hình bình hành.',
      blanks: [
        { label: 'a) Diện tích hình chữ nhật: ... cm²', answer: '50' },
        { label: 'b) Diện tích hình bình hành: ... cm²', answer: '50' },
      ],
      hints: ['Hình chữ nhật: dài × rộng. Hình bình hành: đáy × chiều cao.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính diện tích hình bình hành, biết:\na) Độ dài đáy là 4dm, chiều cao là 34cm ;\nb) Độ dài đáy là 4m, chiều cao là 13dm.',
      blanks: [
        { label: 'a) Diện tích hình bình hành là: ... cm²', answer: '1360' },
        { label: 'b) Diện tích hình bình hành là: ... dm²', answer: '520' },
      ],
      hints: ['Đổi về cùng một đơn vị đo trước: 4dm = 40cm, 4m = 40dm.'],
    },
  ],

  // ── Bài 95. Luyện tập (trang 104–105) ─────────────────────────────────────────────────────────
  'bai-95': [
    {
      type: 'fill', stars: 2, img: imgCanh,
      // 🔤 Gọi tên: toạ độ theo bai95_q1_canh.svg; mỗi hình một việc, ô điền 4 chỗ "... và ... ; ... và ...".
      namePlay: { shapes: [{
        button: '🔤 Cặp cạnh đối diện',
        points: { A: [40, 80], B: [260, 80], C: [260, 230], D: [40, 230], E: [320, 30], G: [440, 30], H: [540, 230], K: [420, 230], M: [640, 85], N: [750, 50], P: [880, 230], Q: [610, 230] },
        segs: ['AB', 'BC', 'CD', 'DA', 'EG', 'GH', 'HK', 'KE', 'MN', 'NP', 'PQ', 'QM'],
        tasks: [
          { kind: 'opposite', title: 'Hình chữ nhật <b>ABCD</b>', row: 'ABCD:', poly: 'ABCD', of: ['AB DC', 'AD BC'], fill: 0 },
          { kind: 'opposite', title: 'Hình bình hành <b>EGHK</b>', row: 'EGHK:', poly: 'EGHK', of: ['EG KH', 'EK GH'], fill: 1 },
          { kind: 'opposite', title: 'Hình tứ giác <b>MNPQ</b>', row: 'MNPQ:', poly: 'MNPQ', of: ['MN QP', 'MQ NP'], fill: 2 },
        ],
      }] },
      q: '1. Hãy nêu tên các cặp cạnh đối diện trong: hình chữ nhật ABCD, hình bình hành EGHK, hình tứ giác MNPQ.',
      blanks: [
        { label: 'Hình chữ nhật ABCD: ... và ... ; ... và ...', answer: 'AB,DC,AD,BC', validate: pairsV(['AB', 'DC'], ['AD', 'BC']) },
        { label: 'Hình bình hành EGHK: ... và ... ; ... và ...', answer: 'EG,KH,EK,GH', validate: pairsV(['EG', 'KH'], ['EK', 'GH']) },
        { label: 'Hình tứ giác MNPQ: ... và ... ; ... và ...', answer: 'MN,QP,MQ,NP', validate: pairsV(['MN', 'QP'], ['MQ', 'NP']) },
      ],
      hints: ['Hai cạnh đối diện không có chung đỉnh nào.'],
    },
    {
      type: 'table', stars: 2,
      q: '2. Viết vào ô trống (theo mẫu):',
      headers: ['Độ dài đáy', 'Chiều cao', 'Diện tích hình bình hành'],
      rows: [
        { sample: true, cells: ['7cm', '16cm', '7 × 16 = 112 (cm²)'] },
        ['14dm', '13dm', blank('14 × 13 = 182', { validate: areaV(14, 13), suffix: '(dm²)' })],
        ['23m', '16m', blank('23 × 16 = 368', { validate: areaV(23, 16), suffix: '(m²)' })],
      ],
      calcFree: true,
      hints: ['Diện tích hình bình hành = độ dài đáy × chiều cao.'],
    },
    {
      type: 'fill', stars: 2, img: imgChuViHbh,
      q: '3. Hình bình hành ABCD có độ dài cạnh AB là a, độ dài cạnh BC là b.\nCông thức tính chu vi P của hình bình hành là: P = (a + b) × 2 (a và b cùng một đơn vị đo).\nÁp dụng công thức trên để tính chu vi hình bình hành, biết:\na) a = 8cm ; b = 3cm ;\nb) a = 10dm ; b = 5dm.',
      blanks: [
        { label: 'a) P = ... cm', answer: '22' },
        { label: 'b) P = ... dm', answer: '30' },
      ],
      hints: ['Cộng a với b trước, rồi nhân với 2.'],
      // 🐜 Đo chu vi (engine/perimPlay.js)
      perimPlay: [
        { label: 'a)', path: 'ABCD', rect: [8, 3], kind: 'para', fill: 0 },
        { label: 'b)', path: 'ABCD', rect: [10, 5], kind: 'para', unit: 'dm', fill: 1 },
      ],
    },
    {
      type: 'fill', stars: 2, wordProblem: true, calcFree: true,
      q: '4. Một mảnh đất trồng hoa hình bình hành có độ dài đáy là 40dm, chiều cao là 25dm. Tính diện tích của mảnh đất đó.',
      blanks: [{ label: 'Diện tích mảnh đất là: ... dm²', answer: '1000' }],
      hints: ['Diện tích = độ dài đáy × chiều cao.'],
    },
  ],

  // ── Bài 96. Phân số (trang 106–107) ───────────────────────────────────────────────────────────
  'bai-96': [
    {
      type: 'fill', stars: 3, img: imgToMau,
      q: '1. a) Viết rồi đọc phân số chỉ phần đã tô màu trong mỗi hình dưới đây:',
      blanks: [
        frx('Hình 1: {/}', 2, 5), fracRead('đọc là: ...', 2, 5),
        frx('Hình 2: {/}', 5, 8), fracRead('đọc là: ...', 5, 8),
        frx('Hình 3: {/}', 3, 4), fracRead('đọc là: ...', 3, 4),
        frx('Hình 4: {/}', 7, 10), fracRead('đọc là: ...', 7, 10),
        frx('Hình 5: {/}', 3, 6), fracRead('đọc là: ...', 3, 6),
        frx('Hình 6: {/}', 3, 7), fracRead('đọc là: ...', 3, 7),
      ],
      hints: ['Mẫu số: hình được chia thành bao nhiêu phần bằng nhau. Tử số: đã tô màu bao nhiêu phần.', `Đọc tử số, rồi "phần", rồi mẫu số: ${fr(1, 2)} đọc là một phần hai.`],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Viết theo mẫu:\n${mau(`phân số ${fr(6, 11)}: tử số 6, mẫu số 11`)}`,
      blanks: [
        { label: `${fr(8, 10)}: tử số ... ; mẫu số ...`, answer: '8,10' },
        { label: `${fr(5, 12)}: tử số ... ; mẫu số ...`, answer: '5,12' },
        frx('Tử số 3, mẫu số 8: phân số {/}', 3, 8),
        { label: `${fr(18, 25)}: tử số ... ; mẫu số ...`, answer: '18,25' },
        frx('Tử số 12, mẫu số 55: phân số {/}', 12, 55),
      ],
      hints: ['Tử số viết trên gạch ngang, mẫu số viết dưới gạch ngang.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các phân số:',
      blanks: [
        frx('a) Hai phần năm: {/}', 2, 5),
        frx('b) Mười một phần mười hai: {/}', 11, 12),
        frx('c) Bốn phần chín: {/}', 4, 9),
        frx('d) Chín phần mười: {/}', 9, 10),
        frx('e) Năm mươi hai phần tám mươi tư: {/}', 52, 84),
      ],
      hints: ['Số đọc trước chữ "phần" là tử số, số đọc sau là mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: `4. Đọc các phân số: ${fr(5, 9)} ; ${fr(8, 17)} ; ${fr(3, 27)} ; ${fr(19, 33)} ; ${fr(80, 100)}.`,
      blanks: [
        fracRead(`${fr(5, 9)}: ...`, 5, 9), fracRead(`${fr(8, 17)}: ...`, 8, 17), fracRead(`${fr(3, 27)}: ...`, 3, 27),
        fracRead(`${fr(19, 33)}: ...`, 19, 33), fracRead(`${fr(80, 100)}: ...`, 80, 100),
      ],
      hints: ['Đọc tử số, rồi đọc "phần", rồi đọc mẫu số.'],
    },
  ],

  // ── Bài 97. Phân số và phép chia số tự nhiên (trang 108) ──────────────────────────────────────
  'bai-97': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết thương của mỗi phép chia sau dưới dạng phân số: 7 : 9 ; 5 : 8 ; 6 : 19 ; 1 : 3.',
      blanks: [frx('7 : 9 = {/}', 7, 9), frx('5 : 8 = {/}', 5, 8), frx('6 : 19 = {/}', 6, 19), frx('1 : 3 = {/}', 1, 3)],
      hints: ['Số bị chia là tử số, số chia là mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Viết theo mẫu:\n${mau(`24 : 8 = ${fr(24, 8)} = 3`)}`,
      blanks: [
        { label: '36 : 9 = {/} = ...', answer: '36,9,4' },
        { label: '88 : 11 = {/} = ...', answer: '88,11,8' },
        { label: '0 : 5 = {/} = ...', answer: '0,5,0' },
        { label: '7 : 7 = {/} = ...', answer: '7,7,1' },
      ],
      hints: ['Viết phép chia thành phân số (số bị chia trên, số chia dưới), rồi tính thương.'],
    },
    {
      type: 'fill', stars: 1,
      q: `3. a) Viết mỗi số tự nhiên dưới dạng một phân số có mẫu số bằng 1 (theo mẫu):\n${mau(`9 = ${fr(9, 1)}`)}`,
      blanks: [frx('6 = {/}', 6, 1), frx('1 = {/}', 1, 1), frx('27 = {/}', 27, 1), frx('0 = {/}', 0, 1), frx('3 = {/}', 3, 1)],
      hints: ['Tử số là chính số đó, mẫu số là 1.'],
    },
  ],

  // ── Bài 98. Phân số và phép chia số tự nhiên (tiếp theo) (trang 109–110) ──────────────────────
  'bai-98': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết thương của mỗi phép chia sau dưới dạng phân số: 9 : 7 ; 8 : 5 ; 19 : 11 ; 3 : 3 ; 2 : 15.',
      blanks: [frx('9 : 7 = {/}', 9, 7), frx('8 : 5 = {/}', 8, 5), frx('19 : 11 = {/}', 19, 11), frx('3 : 3 = {/}', 3, 3), frx('2 : 15 = {/}', 2, 15)],
      hints: ['Số bị chia là tử số, số chia là mẫu số.'],
    },
    {
      type: 'fill', stars: 2, img: imgHinh76,
      q: `2. Có hai phân số ${fr(7, 6)} và ${fr(7, 12)}, phân số nào chỉ phần đã tô màu của hình 1? Phân số nào chỉ phần đã tô màu của hình 2?`,
      blanks: [
        frx('a) Hình 1: {/}', 7, 6),
        frx('b) Hình 2: {/}', 7, 12),
      ],
      hints: ['Hình 1: mỗi hình được chia thành 6 phần bằng nhau, đã tô bao nhiêu phần như thế?', 'Hình 2: cả hình chia thành 12 phần bằng nhau.'],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Trong các phân số ${fr(3, 4)} ; ${fr(9, 14)} ; ${fr(7, 5)} ; ${fr(6, 10)} ; ${fr(19, 17)} ; ${fr(24, 24)} :`,
      blanks: [
        { label: 'a) Phân số bé hơn 1: ...', answer: '3/4; 9/14; 6/10', validate: fracSet(['3/4', '9/14', '6/10']), tiles: ['3/4', '9/14', '7/5', '6/10', '19/17', '24/24'], tileSep: '; ' },
        { label: 'b) Phân số bằng 1: ...', answer: '24/24', validate: fracSet(['24/24']), tiles: ['3/4', '9/14', '7/5', '6/10', '19/17', '24/24'], tileSep: '; ' },
        { label: 'c) Phân số lớn hơn 1: ...', answer: '7/5; 19/17', validate: fracSet(['7/5', '19/17']), tiles: ['3/4', '9/14', '7/5', '6/10', '19/17', '24/24'], tileSep: '; ' },
      ],
      hints: ['Tử số bé hơn mẫu số: phân số bé hơn 1. Tử số bằng mẫu số: bằng 1. Tử số lớn hơn mẫu số: lớn hơn 1.'],
    },
  ],

  // ── Bài 99. Luyện tập (trang 110–111) ─────────────────────────────────────────────────────────
  'bai-99': [
    {
      type: 'fill', stars: 2,
      q: `1. Đọc các số đo đại lượng: ${fr(1, 2)}kg ; ${fr(5, 8)}m ; ${fr(19, 12)} giờ ; ${fr(6, 100)}m.`,
      blanks: [
        fracRead(`${fr(1, 2)}kg: ... ki-lô-gam`, 1, 2),
        fracRead(`${fr(5, 8)}m: ... mét`, 5, 8),
        fracRead(`${fr(19, 12)} giờ: ... giờ`, 19, 12),
        fracRead(`${fr(6, 100)}m: ... mét`, 6, 100),
      ],
      hints: ['Đọc phân số trước ("một phần hai"), rồi đọc tên đơn vị.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết các phân số: một phần tư ; sáu phần mười ; mười tám phần tám mươi lăm ; bảy mươi hai phần một trăm.',
      blanks: [
        frx('Một phần tư: {/}', 1, 4), frx('Sáu phần mười: {/}', 6, 10),
        frx('Mười tám phần tám mươi lăm: {/}', 18, 85), frx('Bảy mươi hai phần một trăm: {/}', 72, 100),
      ],
      hints: ['Số đọc trước chữ "phần" là tử số, số đọc sau là mẫu số. "Tư" là 4.'],
    },
    {
      type: 'fill', stars: 1,
      q: '3. Viết mỗi số tự nhiên sau dưới dạng phân số có mẫu số bằng 1: 8 ; 14 ; 32 ; 0 ; 1.',
      blanks: [frx('8 = {/}', 8, 1), frx('14 = {/}', 14, 1), frx('32 = {/}', 32, 1), frx('0 = {/}', 0, 1), frx('1 = {/}', 1, 1)],
      hints: ['Tử số là chính số đó, mẫu số là 1.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Viết một phân số:\na) Bé hơn 1 ;\nb) Bằng 1 ;\nc) Lớn hơn 1.',
      blanks: [
        { label: 'a) {/}', answer: '1,2', validate: fracCmp((a, b) => a < b) },
        { label: 'b) {/}', answer: '5,5', validate: fracCmp((a, b) => a === b) },
        { label: 'c) {/}', answer: '3,2', validate: fracCmp((a, b) => a > b) },
      ],
      hints: ['Tử số bé hơn mẫu số thì phân số bé hơn 1; bằng mẫu số thì bằng 1; lớn hơn mẫu số thì lớn hơn 1.'],
    },
    {
      type: 'fill', stars: 3, img: imgDoan,
      q: `5. Mỗi đoạn thẳng dưới đây đều được chia thành các phần có độ dài bằng nhau. Viết vào chỗ chấm theo mẫu:\n${mau(`AI = ${fr(1, 3)} AB ; IB = ${fr(2, 3)} AB`)}`,
      blanks: [
        frx('a) CP = {/} CD', 3, 4), frx('PD = {/} CD', 1, 4),
        frx('b) MO = {/} MN', 2, 5), frx('ON = {/} MN', 3, 5),
      ],
      hints: ['Đếm xem cả đoạn thẳng có mấy phần bằng nhau (mẫu số) và đoạn cần tìm có mấy phần (tử số).'],
    },
  ],

  // ── Bài 100. Phân số bằng nhau (trang 111–112) ────────────────────────────────────────────────
  'bai-100': [
    {
      type: 'fill', stars: 3,
      q: '1. Viết số thích hợp vào ô trống:',
      blanks: [
        { label: `a) ${fr(2, 5)} = ${fr('2 × 3', '5 × 3')} = ${F('...', '...')}`, answer: '6,15', boxes: true },
        { label: `${fr(4, 7)} = ${fr('4 × 2', '7 × 2')} = ${F('...', '...')}`, answer: '8,14', boxes: true },
        { label: `${fr(3, 8)} = ${F('3 × ...', '8 × 4')} = ${F('...', '...')}`, answer: '4,12,32', boxes: true },
        { label: `${fr(6, 15)} = ${F('6 : ...', '15 : ...')} = ${fr(2, 5)}`, answer: '3,3', boxes: true },
        { label: `${fr(15, 35)} = ${F('15 : ...', '35 : ...')} = ${F('3', '...')}`, answer: '5,5,7', boxes: true },
        { label: `${fr(48, 16)} = ${F('48 : 8', '16 : ...')} = ${F('...', '...')}`, answer: '8,6,2', boxes: true },
        { label: `b) ${fr(2, 3)} = ${F('...', '6')}`, answer: '4', boxes: true },
        { label: `${fr(18, 60)} = ${F('3', '...')}`, answer: '10', boxes: true },
        { label: `${fr(56, 32)} = ${F('...', '4')}`, answer: '7', boxes: true },
        { label: `${fr(3, 4)} = ${F('...', '16')}`, answer: '12', boxes: true },
      ],
      hints: ['Nhân (hoặc chia) cả tử số và mẫu số với (cho) cùng một số tự nhiên khác 0.', 'b) Xem mẫu số (hoặc tử số) đã gấp lên hay giảm đi mấy lần.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính rồi so sánh kết quả:\na) 18 : 3 và (18 × 4) : (3 × 4) ;\nb) 81 : 9 và (81 : 3) : (9 : 3).',
      blanks: [
        { label: 'a) 18 : 3 = ...', answer: '6' },
        { label: '(18 × 4) : (3 × 4) = ...', answer: '6' },
        tile1('18 : 3 ... (18 × 4) : (3 × 4)', '=', CMP),
        { label: 'b) 81 : 9 = ...', answer: '9' },
        { label: '(81 : 3) : (9 : 3) = ...', answer: '9' },
        tile1('81 : 9 ... (81 : 3) : (9 : 3)', '=', CMP),
      ],
      hints: ['Tính trong ngoặc trước: 18 × 4 = 72, 3 × 4 = 12.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Viết số thích hợp vào ô trống:',
      blanks: [
        { label: `a) ${fr(50, 75)} = ${F('10', '...')} = ${F('...', '3')}`, answer: '15,2', boxes: true },
        { label: `b) ${fr(3, 5)} = ${F('...', '10')} = ${F('9', '...')} = ${F('...', '20')}`, answer: '6,15,12', boxes: true },
      ],
      hints: ['a) 50 : 5 = 10 thì 75 cũng chia cho 5. b) 5 × 2 = 10 thì 3 cũng nhân với 2.'],
    },
  ],

  // ── Bài 101. Rút gọn phân số (trang 112–114) ──────────────────────────────────────────────────
  'bai-101': [
    {
      type: 'fill', stars: 3,
      q: '1. Rút gọn các phân số:',
      blanks: [
        frx(`a) ${fr(4, 6)} = {/}`, 2, 3), frx(`${fr(12, 8)} = {/}`, 3, 2), frx(`${fr(15, 25)} = {/}`, 3, 5),
        frx(`${fr(11, 22)} = {/}`, 1, 2), frx(`${fr(36, 10)} = {/}`, 18, 5), frx(`${fr(75, 36)} = {/}`, 25, 12),
        frx(`b) ${fr(5, 10)} = {/}`, 1, 2), frx(`${fr(12, 36)} = {/}`, 1, 3), frx(`${fr(9, 72)} = {/}`, 1, 8),
        frx(`${fr(75, 300)} = {/}`, 1, 4), frx(`${fr(15, 35)} = {/}`, 3, 7), frx(`${fr(4, 100)} = {/}`, 1, 25),
      ],
      hints: ['Chia cả tử số và mẫu số cho cùng một số lớn hơn 1.', 'Cứ làm như thế đến khi được phân số tối giản.'],
    },
    {
      type: 'fill', stars: 3,
      q: `2. Trong các phân số ${fr(1, 3)} ; ${fr(4, 7)} ; ${fr(8, 12)} ; ${fr(30, 36)} ; ${fr(72, 73)} :\na) Phân số nào tối giản? Vì sao?\nb) Phân số nào rút gọn được? Hãy rút gọn phân số đó.`,
      blanks: [
        { label: 'a) Các phân số tối giản: ...', answer: '1/3; 4/7; 72/73', validate: fracSet(['1/3', '4/7', '72/73']), tiles: ['1/3', '4/7', '8/12', '30/36', '72/73'], tileSep: '; ' },
        { label: 'b) {/} = {/}', answer: '8,12,2,3', validate: fracsV([8, 12, 2, 3], [30, 36, 5, 6]) },
        { label: '{/} = {/}', answer: '30,36,5,6', validate: fracsV([30, 36, 5, 6], [8, 12, 2, 3]) },
      ],
      hints: ['Phân số tối giản: tử số và mẫu số không cùng chia hết cho số nào lớn hơn 1.', 'b) Viết phân số rút gọn được ở bên trái, phân số tối giản bằng nó ở bên phải.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Viết số thích hợp vào ô trống:',
      blanks: [{ label: `${fr(54, 72)} = ${F('27', '...')} = ${F('...', '12')} = ${F('3', '...')}`, answer: '36,9,4', boxes: true }],
      hints: ['54 : 2 = 27, vậy 72 cũng chia cho 2. Mẫu số 12 = 72 : 6.'],
    },
  ],

  // ── Bài 102. Luyện tập (trang 114) ────────────────────────────────────────────────────────────
  'bai-102': [
    {
      type: 'fill', stars: 2,
      q: `1. Rút gọn các phân số: ${fr(14, 28)} ; ${fr(25, 50)} ; ${fr(48, 30)} ; ${fr(81, 54)}.`,
      blanks: [frx(`${fr(14, 28)} = {/}`, 1, 2), frx(`${fr(25, 50)} = {/}`, 1, 2), frx(`${fr(48, 30)} = {/}`, 8, 5), frx(`${fr(81, 54)} = {/}`, 3, 2)],
      hints: ['Rút gọn đến phân số tối giản.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: `2. Trong các phân số dưới đây, phân số nào bằng ${fr(2, 3)}?`,
      options: [fr(20, 30), fr(8, 9), fr(8, 12)], answer: [0, 2],
      hints: ['Rút gọn từng phân số rồi so với ' + fr(2, 3) + '.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: `3. Trong các phân số dưới đây, phân số nào bằng ${fr(25, 100)}?`,
      options: [fr(50, 150), fr(5, 20), fr(8, 32)], answer: [1, 2],
      hints: [`${fr(25, 100)} rút gọn được ${fr(1, 4)}.`],
    },
    {
      type: 'fill', stars: 3,
      q: `4. Tính (theo mẫu):\na) ${fr('2 × 3 × 5', '3 × 5 × 7')} ; b) ${fr('8 × 7 × 5', '11 × 8 × 7')} ; c) ${fr('19 × 2 × 5', '19 × 3 × 5')}.\n${mau(`${fr('2 × <s>3</s> × <s>5</s>', '<s>3</s> × <s>5</s> × 7')} = ${fr(2, 7)}`)}`,
      blanks: [frx(`b) ${fr('8 × 7 × 5', '11 × 8 × 7')} = {/}`, 5, 11), frx(`c) ${fr('19 × 2 × 5', '19 × 3 × 5')} = {/}`, 2, 3)],
      hints: ['Gạch bỏ thừa số giống nhau ở trên và ở dưới gạch ngang.'],
    },
  ],

  // ── Bài 103. Quy đồng mẫu số các phân số (trang 115–116) ──────────────────────────────────────
  'bai-103': [
    {
      type: 'fill', stars: 3,
      q: '1. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(5, 6)} và ${fr(1, 4)}: {/} và {/}`, [20, 24, 6, 24]),
        qd(`b) ${fr(3, 5)} và ${fr(3, 7)}: {/} và {/}`, [21, 35, 15, 35]),
        qd(`c) ${fr(9, 8)} và ${fr(8, 9)}: {/} và {/}`, [81, 72, 64, 72]),
      ],
      hints: ['Lấy tử số và mẫu số của phân số thứ nhất nhân với mẫu số của phân số thứ hai.', 'Lấy tử số và mẫu số của phân số thứ hai nhân với mẫu số của phân số thứ nhất.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(7, 5)} và ${fr(8, 11)}: {/} và {/}`, [77, 55, 40, 55]),
        qd(`b) ${fr(5, 12)} và ${fr(3, 8)}: {/} và {/}`, [40, 96, 36, 96]),
        qd(`c) ${fr(17, 10)} và ${fr(9, 7)}: {/} và {/}`, [119, 70, 90, 70]),
      ],
      hints: ['Mẫu số chung là tích hai mẫu số.'],
    },
  ],

  // ── Bài 104. Quy đồng mẫu số các phân số (tiếp theo) (trang 116–117) ──────────────────────────
  'bai-104': [
    {
      type: 'fill', stars: 3,
      q: '1. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(7, 9)} và ${fr(2, 3)}: {/} và {/}`, [7, 9, 6, 9]),
        qd(`b) ${fr(4, 10)} và ${fr(11, 20)}: {/} và {/}`, [8, 20, 11, 20]),
        qd(`c) ${fr(9, 25)} và ${fr(16, 75)}: {/} và {/}`, [27, 75, 16, 75]),
      ],
      hints: ['Mẫu số lớn chia hết cho mẫu số bé: lấy mẫu số lớn làm mẫu số chung, giữ nguyên phân số có mẫu số lớn.'],
    },
    {
      type: 'fill', stars: 4,
      q: '2. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(4, 7)} và ${fr(5, 12)}: {/} và {/}`, [48, 84, 35, 84]),
        qd(`b) ${fr(3, 8)} và ${fr(19, 24)}: {/} và {/}`, [9, 24, 19, 24]),
        qd(`c) ${fr(21, 22)} và ${fr(7, 11)}: {/} và {/}`, [21, 22, 14, 22]),
        qd(`d) ${fr(8, 15)} và ${fr(11, 16)}: {/} và {/}`, [128, 240, 165, 240]),
        qd(`e) ${fr(4, 25)} và ${fr(72, 100)}: {/} và {/}`, [16, 100, 72, 100]),
        qd(`g) ${fr(17, 60)} và ${fr(4, 5)}: {/} và {/}`, [17, 60, 48, 60]),
      ],
      hints: ['Xem mẫu số này có chia hết cho mẫu số kia không. Có: lấy mẫu số lớn làm mẫu số chung. Không: nhân hai mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: `3. Viết các phân số lần lượt bằng ${fr(5, 6)} ; ${fr(9, 8)} và có mẫu số chung là 24.`,
      blanks: [frx(`${fr(5, 6)} = {/}`, 20, 24), frx(`${fr(9, 8)} = {/}`, 27, 24)],
      hints: ['24 : 6 = 4, nên nhân cả tử số và mẫu số của ' + fr(5, 6) + ' với 4.'],
    },
  ],

  // ── Bài 105. Luyện tập (trang 117–118) ────────────────────────────────────────────────────────
  'bai-105': [
    {
      type: 'fill', stars: 3,
      q: '1. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(1, 6)} và ${fr(4, 5)}: {/} và {/}`, [5, 30, 24, 30]),
        qd(`${fr(11, 49)} và ${fr(8, 7)}: {/} và {/}`, [11, 49, 56, 49]),
        qd(`${fr(12, 5)} và ${fr(5, 9)}: {/} và {/}`, [108, 45, 25, 45]),
        qd(`b) ${fr(5, 9)} và ${fr(7, 36)}: {/} và {/}`, [20, 36, 7, 36]),
        qd(`${fr(47, 100)} và ${fr(17, 25)}: {/} và {/}`, [47, 100, 68, 100]),
        qd(`${fr(4, 9)} và ${fr(5, 8)}: {/} và {/}`, [32, 72, 45, 72]),
      ],
      hints: ['Mẫu số này chia hết cho mẫu số kia thì lấy mẫu số lớn làm mẫu số chung; nếu không thì nhân hai mẫu số.'],
    },
    {
      type: 'fill', stars: 3,
      q: `2. a) Hãy viết ${fr(3, 5)} và 2 thành hai phân số đều có mẫu số là 5.\nb) Hãy viết 5 và ${fr(5, 9)} thành hai phân số đều có mẫu số là 9 ; là 18.`,
      blanks: [
        qd(`a) ${fr(3, 5)} = {/} ; 2 = {/}`, [3, 5, 10, 5]),
        qd('b) Mẫu số là 9: 5 = {/} ; ' + fr(5, 9) + ' = {/}', [45, 9, 5, 9]),
        qd('Mẫu số là 18: 5 = {/} ; ' + fr(5, 9) + ' = {/}', [90, 18, 10, 18]),
      ],
      hints: ['2 = ' + fr(2, 1) + ': nhân cả tử số và mẫu số với 5.'],
    },
    {
      type: 'fill', stars: 4,
      q: `3. Quy đồng mẫu số các phân số (theo mẫu):\n${mau(`Quy đồng mẫu số các phân số ${fr(1, 2)} ; ${fr(1, 3)} và ${fr(2, 5)}: ${fr(1, 2)} = ${fr('1 × 3 × 5', '2 × 3 × 5')} = ${fr(15, 30)} ; ${fr(1, 3)} = ${fr('1 × 2 × 5', '3 × 2 × 5')} = ${fr(10, 30)} ; ${fr(2, 5)} = ${fr('2 × 2 × 3', '5 × 2 × 3')} = ${fr(12, 30)}`)}`,
      blanks: [
        qd(`a) ${fr(1, 3)} ; ${fr(1, 4)} và ${fr(4, 5)}: {/} ; {/} và {/}`, [20, 60, 15, 60, 48, 60]),
        qd(`b) ${fr(1, 2)} ; ${fr(2, 3)} và ${fr(3, 4)}: {/} ; {/} và {/}`, [12, 24, 16, 24, 18, 24]),
      ],
      hints: ['Nhân cả tử số và mẫu số của mỗi phân số với tích các mẫu số của hai phân số kia.'],
    },
    {
      type: 'fill', stars: 2,
      q: `4. Viết các phân số lần lượt bằng ${fr(7, 12)} ; ${fr(23, 30)} và có mẫu số chung là 60.`,
      blanks: [frx(`${fr(7, 12)} = {/}`, 35, 60), frx(`${fr(23, 30)} = {/}`, 46, 60)],
      hints: ['60 : 12 = 5 ; 60 : 30 = 2.'],
    },
    {
      type: 'fill', stars: 3,
      q: `5. Tính (theo mẫu):\na) ${fr('15 × 7', '30 × 11')} ; b) ${fr('4 × 5 × 6', '12 × 15 × 9')} ; c) ${fr('6 × 8 × 11', '33 × 16')}.\n${mau(`${fr('15 × 7', '30 × 11')} = ${fr('<s>15</s> × 7', '<s>15</s> × 2 × 11')} = ${fr(7, 22)}`)}`,
      blanks: [
        frx(`b) ${fr('4 × 5 × 6', '12 × 15 × 9')} = {/}`, 2, 27),
        { label: `c) ${fr('6 × 8 × 11', '33 × 16')} = ...`, answer: '1', validate: (v) => strip(v) === '1' },
      ],
      hints: ['Tách các số thành tích để có thừa số giống nhau ở trên và ở dưới: 12 = 4 × 3, 15 = 5 × 3, 33 = 3 × 11, 16 = 8 × 2.'],
    },
  ],

  // ── Bài 106. Luyện tập chung (trang 118) ──────────────────────────────────────────────────────
  'bai-106': [
    {
      type: 'fill', stars: 2,
      q: `1. Rút gọn các phân số: ${fr(12, 30)} ; ${fr(20, 45)} ; ${fr(28, 70)} ; ${fr(34, 51)}.`,
      blanks: [frx(`${fr(12, 30)} = {/}`, 2, 5), frx(`${fr(20, 45)} = {/}`, 4, 9), frx(`${fr(28, 70)} = {/}`, 2, 5), frx(`${fr(34, 51)} = {/}`, 2, 3)],
      hints: ['Rút gọn đến phân số tối giản. 34 và 51 cùng chia hết cho 17.'],
    },
    {
      type: 'choice', stars: 2, multi: true,
      q: `2. Trong các phân số dưới đây, phân số nào bằng ${fr(2, 9)}?`,
      options: [fr(5, 18), fr(6, 27), fr(14, 63), fr(10, 36)], answer: [1, 2],
      hints: ['Rút gọn từng phân số rồi so với ' + fr(2, 9) + '.'],
    },
    {
      type: 'fill', stars: 4,
      q: '3. Quy đồng mẫu số các phân số:',
      blanks: [
        qd(`a) ${fr(4, 3)} và ${fr(5, 8)}: {/} và {/}`, [32, 24, 15, 24]),
        qd(`b) ${fr(4, 5)} và ${fr(5, 9)}: {/} và {/}`, [36, 45, 25, 45]),
        qd(`c) ${fr(4, 9)} và ${fr(7, 12)}: {/} và {/}`, [48, 108, 63, 108], [16, 36, 21, 36]),
        qd(`d) ${fr(1, 2)} ; ${fr(2, 3)} và ${fr(7, 12)}: {/} ; {/} và {/}`, [6, 12, 8, 12, 7, 12], [36, 72, 48, 72, 42, 72]),
      ],
      hints: ['Mẫu số này chia hết cho mẫu số kia thì lấy mẫu số lớn làm mẫu số chung; nếu không thì nhân các mẫu số.', 'd) 12 chia hết cho cả 2 và 3.'],
    },
    {
      type: 'choice', stars: 2, img: imgSao,
      q: `4. Nhóm nào dưới đây có ${fr(2, 3)} số ngôi sao đã tô màu?`,
      options: ['Nhóm a', 'Nhóm b', 'Nhóm c', 'Nhóm d'], answer: 1,
      hints: ['Đếm số ngôi sao cả nhóm (mẫu số) và số ngôi sao đã tô màu (tử số).'],
    },
  ],
};

/** Một phân số bất kì đúng điều kiện cmp(tử, mẫu) (mẫu khác 0). */
function fracCmp(cmp) {
  return (v) => {
    const [a, b] = String(v).split(',').map(s => s.trim());
    if (!/^\d+$/.test(a ?? '') || !/^\d+$/.test(b ?? '') || Number(b) === 0) return false;
    return cmp(Number(a), Number(b));
  };
}

/** Tập phân số viết dạng "1/3; 4/7", không kể thứ tự. */
function fracSet(list) {
  const want = [...list].sort().join('|');
  return (v) => parts(v).sort().join('|') === want;
}
