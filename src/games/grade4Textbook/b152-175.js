/**
 * SGK Toán 4: bài 152–175, Chương sáu: Ôn tập (sách trang 160–180).
 * Hình vẽ lại: scripts/redraw/g4t_bai152_175.py (bộ vẽ kit_g4t.py).
 */
import { blank, fr, fracValidate, mau, dsValidate, textValidate, calc, divCalc, nham, placeSum, readCell, readBlank, num } from './kit.js';
import { stripVN, letterGroupsValidate, letterValidate } from '../grade3Workbook.js';
import imgHinhCat from '../../assets/grade4-textbook/bai158_q1_hinhcat.svg';
import imgDienTich from '../../assets/grade4-textbook/bai158_q2_dientich.svg';
import imgVai from '../../assets/grade4-textbook/bai158_q3_vai.svg';
import imgPhanSo from '../../assets/grade4-textbook/bai159_q1_hinh.svg';
import imgTiaSo from '../../assets/grade4-textbook/bai159_q2_tiaso.svg';
import imgAbcd from '../../assets/grade4-textbook/bai167_q1_abcd.svg';
import imgHaiHinh from '../../assets/grade4-textbook/bai167_q3_hinh.svg';
import imgDuong from '../../assets/grade4-textbook/bai168_q1_duong.svg';
import imgVuongNhat from '../../assets/grade4-textbook/bai168_q2_hinh.svg';
import imgHinhH from '../../assets/grade4-textbook/bai168_q4_hinhH.svg';
import imgLtc from '../../assets/grade4-textbook/bai175_q1_hinh.svg';

// ── Đồ dùng riêng của tệp này ─────────────────────────────────────────────────────────────────
const cmp = (l, r, a, b) => ({ left: l, right: r, answer: a > b ? '>' : a < b ? '<' : '=' });
const noSp = (s) => String(s).replace(/\s+/g, '');
const parts = (v) => String(v).split(/[,;]+/).map(noSp).filter(Boolean);

/** Dãy số theo đúng thứ tự (bỏ qua khoảng trắng trong số: "10 261" = "10261"). */
const numListValidate = (nums) => (v) => parts(v).join('|') === nums.map(noSp).join('|');
/** Tập số, thứ tự nào cũng được. */
const numSetValidate = (nums) => (v) => parts(v).sort().join('|') === nums.map(noSp).sort().join('|');
const order = (label, nums, tiles) => ({
  label: `${label} ...`, answer: nums.map(num).join('; '), validate: numListValidate(nums.map(String)),
  tiles: tiles.map(num), tileSep: '; ',
});

/** Ô viết phân số: nhãn "… = {/}". exact: phải đúng phân số đó (không nhận phân số bằng). */
const F = (expr, a, b, exact = false) => ({ label: `${expr} = {/}`, answer: `${a},${b}`, validate: fracValidate(a, b, exact) });
/** Kết quả là số tự nhiên. */
const W = (expr, n) => ({ label: `${expr} = ...`, answer: String(n) });

/** Nhiều {/} trong một nhãn: đáp án "a,b,c,d,…"; exact: đúng từng phân số, ngược lại nhận phân số bằng. */
const fracsValidate = (pairs, exact = false) => (v) => {
  const n = String(v).split(',').map(t => Number(t.trim()));
  if (n.length !== pairs.length * 2 || n.some(x => !Number.isInteger(x))) return false;
  return pairs.every(([a, b], i) => {
    const x = n[2 * i], y = n[2 * i + 1];
    return y !== 0 && (exact ? x === a && y === b : x * b === y * a);
  });
};
/** Quy đồng mẫu số: mỗi phân số bằng phân số đã cho và mọi mẫu số bằng nhau. */
const quyDongValidate = (pairs) => (v) => {
  const n = String(v).split(',').map(t => Number(t.trim()));
  if (n.length !== pairs.length * 2 || n.some(x => !Number.isInteger(x) || x <= 0)) return false;
  const dens = pairs.map((_, i) => n[2 * i + 1]);
  return dens.every(d => d === dens[0]) && pairs.every(([a, b], i) => n[2 * i] * b === n[2 * i + 1] * a);
};
const quyDong = (prefix, pairs, want) => ({
  label: `${prefix}${pairs.map(([a, b]) => `${fr(a, b)} = {/}`).join(' ; ')}`,
  answer: want.join(','), validate: quyDongValidate(pairs),
});

/** "Số gồm có": "2 chục nghìn, 4 nghìn, 3 trăm, 8 đơn vị" (có dấu hoặc không dấu; các phần cộng lại đúng số đó). */
const PLACE = { 'don vi': 1, chuc: 10, tram: 100, nghin: 1e3, ngan: 1e3, 'chuc nghin': 1e4, 'chuc ngan': 1e4, 'tram nghin': 1e5, 'tram ngan': 1e5, trieu: 1e6, 'chuc trieu': 1e7, 'tram trieu': 1e8 };
const gomCoValidate = (n) => (v) => {
  const items = stripVN(v).split(/[,;+]|\bva\b/).map(s => s.trim().replace(/\s+/g, ' ')).filter(Boolean);
  const used = new Set();
  let sum = 0;
  for (const it of items) {
    const m = it.match(/^(\d)\s*(.+)$/);
    if (!m || m[1] === '0') return false;
    const unit = PLACE[m[2].trim()];
    if (!unit || used.has(unit)) return false;
    used.add(unit);
    sum += Number(m[1]) * unit;
  }
  return sum === n;
};
const gomCo = (n, text) => blank(text, { validate: gomCoValidate(n) });

/** Tên hàng (bỏ chữ "hàng"/"lớp" nếu bé gõ thêm), có dấu hoặc không dấu. */
const placeName = (s) => stripVN(s).trim().replace(/^(hang|lop)\s+/, '').replace(/\s+/g, ' ');
const HANG = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
/** "chữ số 5 thuộc hàng ..., lớp ..." */
const hangLop = (n, hang, lop) => ({
  label: `${num(n)}: chữ số 5 thuộc hàng ..., lớp ...`, answer: `${hang},${lop}`, tiles: HANG,
  validate: (v) => { const [a, b] = String(v).split(','); return placeName(a ?? '') === placeName(hang) && placeName(b ?? '') === placeName(lop); },
});
/** "chữ số 9 ở hàng ..., có giá trị là ..." */
const hangGiaTri = (n, hang, value) => ({
  label: `${num(n)}: chữ số 9 ở hàng ..., có giá trị là ...`, answer: `${hang},${value}`,
  validate: (v) => { const [a, b] = String(v).split(','); return placeName(a ?? '') === placeName(hang) && noSp(b ?? '') === String(value); },
});
/** Hai cạnh (đoạn thẳng): AB = BA, hai cạnh viết theo thứ tự nào cũng được. */
const seg2 = (label, a, b) => ({ label, answer: `${a},${b}`, validate: letterGroupsValidate([a, b]) });
const seg1 = (label, a) => ({ label, answer: a, validate: letterGroupsValidate([a]) });
const ABCD = ['A', 'B', 'C', 'D'];
const pick = (label, letter) => ({ label: `${label}<br>Chữ đặt trước câu trả lời đúng: ...`, answer: letter, validate: letterValidate(letter), tiles: ABCD, tileOne: true });

export const QUESTIONS = {
  // ── Bài 152. Ôn tập về số tự nhiên (trang 160–161) ────────────────────────────────────────────
  'bai-152': [
    {
      type: 'table', stars: 3,
      q: '1. Viết theo mẫu:',
      headers: ['Đọc số', 'Viết số', 'Số gồm có'],
      rows: [
        { sample: true, cells: ['Hai mươi tư nghìn ba trăm linh tám', '24 308', '2 chục nghìn, 4 nghìn, 3 trăm, 8 đơn vị'] },
        ['Một trăm sáu mươi nghìn hai trăm bảy mươi tư', blank(160274), gomCo(160274, '1 trăm nghìn, 6 chục nghìn, 2 trăm, 7 chục, 4 đơn vị')],
        [readCell(1237005), '1 237 005', gomCo(1237005, '1 triệu, 2 trăm nghìn, 3 chục nghìn, 7 nghìn, 5 đơn vị')],
        [readCell(8004090), blank(8004090), '8 triệu, 4 nghìn, 9 chục'],
      ],
      hints: ['Số gồm có: mỗi chữ số khác 0 viết kèm tên hàng của nó, ví dụ "3 trăm", "8 đơn vị".', 'Hàng nào không có thì viết chữ số 0 ở hàng đó (8 triệu, 4 nghìn, 9 chục: 8 004 090).'],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Viết mỗi số sau thành tổng (theo mẫu): 1763 ; 5794 ; 20 292 ; 190 909.\n${mau('1763 = 1000 + 700 + 60 + 3.')}`,
      blanks: [placeSum(5794), placeSum(20292), placeSum(190909)],
      hints: ['Mỗi chữ số khác 0 cho một số hạng: chữ số hàng chục nghìn → … 0000, hàng nghìn → … 000.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. a) Đọc các số sau và nêu rõ chữ số 5 trong mỗi số thuộc hàng nào, lớp nào: 67 358 ; 851 904 ; 3 205 700 ; 195 080 126.\nb) Nêu giá trị của chữ số 3 trong mỗi số sau: 103 ; 1379 ; 8932 ; 13 064 ; 3 265 910.',
      blanks: [
        readBlank('a) 67 358 đọc là: ...', 67358), hangLop(67358, 'chục', 'đơn vị'),
        readBlank('851 904 đọc là: ...', 851904), hangLop(851904, 'chục nghìn', 'nghìn'),
        readBlank('3 205 700 đọc là: ...', 3205700), hangLop(3205700, 'nghìn', 'nghìn'),
        readBlank('195 080 126 đọc là: ...', 195080126), hangLop(195080126, 'triệu', 'triệu'),
        { label: 'b) Trong số 103, chữ số 3 có giá trị là ...', answer: '3' },
        { label: 'Trong số 1379, chữ số 3 có giá trị là ...', answer: '300' },
        { label: 'Trong số 8932, chữ số 3 có giá trị là ...', answer: '30' },
        { label: 'Trong số 13 064, chữ số 3 có giá trị là ...', answer: '3000' },
        { label: 'Trong số 3 265 910, chữ số 3 có giá trị là ...', answer: '3000000' },
      ],
      hints: ['Đếm từ phải sang trái: đơn vị, chục, trăm (lớp đơn vị); nghìn, chục nghìn, trăm nghìn (lớp nghìn); triệu, chục triệu, trăm triệu (lớp triệu).', 'Giá trị của chữ số = chữ số đó rồi viết thêm số chữ số 0 bằng số chữ số đứng sau nó.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. a) Trong dãy số tự nhiên, hai số liên tiếp hơn (hoặc kém) nhau mấy đơn vị?\nb) Số tự nhiên bé nhất là số nào?\nc) Có số tự nhiên lớn nhất không? Vì sao?',
      blanks: [
        { label: 'a) Hai số tự nhiên liên tiếp hơn (hoặc kém) nhau ... đơn vị.', answer: '1' },
        { label: 'b) Số tự nhiên bé nhất là số ...', answer: '0' },
        { label: 'c) Có số tự nhiên lớn nhất không? ...', answer: 'Không', validate: textValidate('Không'), tiles: ['Có', 'Không'], tileOne: true },
      ],
      hints: ['c) Lấy một số tự nhiên bất kì, thêm 1 vào số đó thì được số nào?'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Viết số thích hợp vào chỗ chấm để có:\na) Ba số tự nhiên liên tiếp;\nb) Ba số chẵn liên tiếp;\nc) Ba số lẻ liên tiếp.',
      blanks: [
        { label: 'a) 67 ; ... ; 69.', answer: '68' }, { label: '798 ; 799 ; ... .', answer: '800' }, { label: '... ; 1000 ; 1001.', answer: '999' },
        { label: 'b) 8 ; 10 ; ... .', answer: '12' }, { label: '98 ; ... ; 102.', answer: '100' }, { label: '... ; 1000 ; 1002.', answer: '998' },
        { label: 'c) 51 ; 53 ; ... .', answer: '55' }, { label: '199 ; ... ; 203.', answer: '201' }, { label: '... ; 999 ; 1001.', answer: '997' },
      ],
      hints: ['Số tự nhiên liên tiếp hơn kém nhau 1; số chẵn (số lẻ) liên tiếp hơn kém nhau 2.'],
    },
  ],

  // ── Bài 153. Ôn tập về số tự nhiên (tiếp theo) (trang 161) ────────────────────────────────────
  'bai-153': [
    {
      type: 'compare', stars: 2,
      q: '1. >, <, = ?',
      rows: [
        cmp('989', '1321', 989, 1321), cmp('27 105', '7985', 27105, 7985), cmp('8300 : 10', '830', 830, 830),
        cmp('34 579', '34 601', 34579, 34601), cmp('150 482', '150 459', 150482, 150459), cmp('72 600', '726 × 100', 72600, 72600),
      ],
      hints: ['Số nào có nhiều chữ số hơn thì lớn hơn. Cùng số chữ số: so từng hàng từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết các số sau theo thứ tự từ bé đến lớn:\na) 7426 ; 999 ; 7642 ; 7624.   b) 3158 ; 3518 ; 1853 ; 3190.',
      blanks: [
        order('a)', [999, 7426, 7624, 7642], [7426, 999, 7642, 7624]),
        order('b)', [1853, 3158, 3190, 3518], [3158, 3518, 1853, 3190]),
      ],
      hints: ['Tìm số bé nhất trước, rồi số bé nhất trong các số còn lại.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết các số sau theo thứ tự từ lớn đến bé:\na) 1567 ; 1590 ; 897 ; 10 261.   b) 2476 ; 4270 ; 2490 ; 2518.',
      blanks: [
        order('a)', [10261, 1590, 1567, 897], [1567, 1590, 897, 10261]),
        order('b)', [4270, 2518, 2490, 2476], [2476, 4270, 2490, 2518]),
      ],
      hints: ['Số có nhiều chữ số nhất là số lớn nhất; các số cùng số chữ số thì so từng hàng từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. a) Viết số bé nhất: có một chữ số; có hai chữ số; có ba chữ số.\nb) Viết số lớn nhất: có một chữ số; có hai chữ số; có ba chữ số.\nc) Viết số lẻ bé nhất: có một chữ số; có hai chữ số; có ba chữ số.\nd) Viết số chẵn lớn nhất: có một chữ số; có hai chữ số; có ba chữ số.',
      blanks: [
        { label: 'a) Số bé nhất: ... ; ... ; ...', answer: '0,10,100' },
        { label: 'b) Số lớn nhất: ... ; ... ; ...', answer: '9,99,999' },
        { label: 'c) Số lẻ bé nhất: ... ; ... ; ...', answer: '1,11,101' },
        { label: 'd) Số chẵn lớn nhất: ... ; ... ; ...', answer: '8,98,998' },
      ],
      hints: ['Số tự nhiên bé nhất có một chữ số là 0. Số chẵn có chữ số tận cùng 0, 2, 4, 6, 8; số lẻ tận cùng 1, 3, 5, 7, 9.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Tìm x, biết 57 < x < 62 và:\na) x là số chẵn;   b) x là số lẻ;   c) x là số tròn chục.',
      blanks: [
        { label: 'a) x = ... hoặc x = ...', answer: '58,60', validate: numSetValidate(['58', '60']) },
        { label: 'b) x = ... hoặc x = ...', answer: '59,61', validate: numSetValidate(['59', '61']) },
        { label: 'c) x = ...', answer: '60' },
      ],
      hints: ['Các số lớn hơn 57 và bé hơn 62 là 58, 59, 60, 61. Chọn số hợp với từng yêu cầu.'],
    },
  ],

  // ── Bài 154. Ôn tập về số tự nhiên (tiếp theo) (trang 161–162) ────────────────────────────────
  'bai-154': (() => {
    const T = ['605', '7362', '2640', '4136', '1207', '20 601'];
    const set = (label, nums) => ({ label: `${label} ...`, answer: nums.join('; '), validate: numSetValidate(nums), tiles: T, tileSep: '; ' });
    return [
      {
        type: 'fill', stars: 3,
        q: '1. Trong các số 605 ; 7362 ; 2640 ; 4136 ; 1207 ; 20 601:\na) Số nào chia hết cho 2? Số nào chia hết cho 5?\nb) Số nào chia hết cho 3? Số nào chia hết cho 9?\nc) Số nào chia hết cho cả 2 và 5?\nd) Số nào chia hết cho 5 nhưng không chia hết cho 3?\ne) Số nào không chia hết cho cả 2 và 9?',
        blanks: [
          set('a) Các số chia hết cho 2:', ['7362', '2640', '4136']), set('Các số chia hết cho 5:', ['605', '2640']),
          set('b) Các số chia hết cho 3:', ['7362', '2640', '20601']), set('Các số chia hết cho 9:', ['7362', '20601']),
          set('c) Các số chia hết cho cả 2 và 5:', ['2640']),
          set('d) Các số chia hết cho 5 nhưng không chia hết cho 3:', ['605']),
          set('e) Các số không chia hết cho cả 2 và 9:', ['605', '1207']),
        ],
        hints: ['Chia hết cho 2: tận cùng 0, 2, 4, 6, 8. Chia hết cho 5: tận cùng 0 hoặc 5.', 'Chia hết cho 3 (cho 9): tổng các chữ số chia hết cho 3 (cho 9).'],
      },
      {
        type: 'fill', stars: 3,
        q: '2. Viết chữ số thích hợp vào ô trống để được:',
        blanks: [
          { label: 'a) ...52 chia hết cho 3;', boxes: true, answer: '2', validate: (v) => ['2', '5', '8'].includes(noSp(v)) },
          { label: 'b) 1...8 chia hết cho 9;', boxes: true, answer: '0', validate: (v) => ['0', '9'].includes(noSp(v)) },
          { label: 'c) 92... chia hết cho cả 2 và 5;', boxes: true, answer: '0' },
          { label: 'd) 25... chia hết cho cả 5 và 3.', boxes: true, answer: '5' },
        ],
        hints: ['Chia hết cho 3 (cho 9): cộng các chữ số, tổng phải chia hết cho 3 (cho 9).', 'Chia hết cho cả 2 và 5: tận cùng là 0.'],
      },
      {
        type: 'fill', stars: 2,
        q: '3. Tìm x, biết 23 < x < 31 và x là số lẻ chia hết cho 5.',
        blanks: [{ label: 'x = ...', answer: '25' }],
        hints: ['Số chia hết cho 5 tận cùng là 0 hoặc 5; số lẻ thì tận cùng là 5.'],
      },
      {
        type: 'fill', stars: 3,
        q: '4. Với ba chữ số 0 ; 5 ; 2 hãy viết các số có ba chữ số (mỗi số có cả ba chữ số đó) vừa chia hết cho 5 và vừa chia hết cho 2.',
        blanks: [{ label: 'Các số đó là: ... ; ...', answer: '520,250', validate: numSetValidate(['520', '250']) }],
        hints: ['Chia hết cho cả 2 và 5 thì chữ số tận cùng phải là 0.'],
      },
      {
        type: 'fill', stars: 3, wordProblem: true,
        q: '5. Mẹ mua một số cam rồi xếp vào các đĩa. Nếu xếp mỗi đĩa 3 quả thì vừa hết số cam, nếu xếp mỗi đĩa 5 quả thì cũng vừa hết số cam đó. Biết rằng số cam ít hơn 20 quả, hỏi mẹ mua bao nhiêu quả cam?',
        blanks: [{ label: 'Mẹ mua ... quả cam.', answer: '15' }],
        hints: ['Số cam vừa chia hết cho 3, vừa chia hết cho 5 và bé hơn 20 (khác 0).'],
      },
    ];
  })(),

  // ── Bài 155. Ôn tập về các phép tính với số tự nhiên (trang 162–163) ──────────────────────────
  'bai-155': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        calc('a) 6195 + 2785', 8980), calc('47836 + 5409', 53245), calc('10592 + 79438', 90030),
        calc('b) 5342 − 4185', 1157), calc('29041 − 5987', 23054), calc('80200 − 19194', 61006),
      ],
      hints: ['Bấm ✍️ Tính để đặt tính: viết các chữ số cùng hàng thẳng cột, tính từ hàng đơn vị, nhớ sang hàng bên trái.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tìm x:',
      blanks: [
        { label: 'a) x + 126 = 480 → x = ...', answer: '354' },
        { label: 'b) x − 209 = 435 → x = ...', answer: '644' },
      ],
      hints: ['Số hạng chưa biết = tổng − số hạng kia. Số bị trừ = hiệu + số trừ.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết chữ hoặc số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a + b = b + ...', answer: 'a' }, { label: 'a − ... = a', answer: '0' },
        { label: '(a + b) + c = ... + (b + c)', answer: 'a' }, { label: '... − a = 0', answer: 'a' },
        { label: 'a + 0 = ... + a = ...', answer: '0,a' },
      ],
      hints: ['Tính chất giao hoán, kết hợp của phép cộng; cộng với 0, trừ đi 0.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '4. Tính bằng cách thuận tiện nhất:',
      blanks: [
        nham('a) 1268 + 99 + 501', 1868), nham('745 + 268 + 732', 1745), nham('1295 + 105 + 1460', 2860),
        nham('b) 168 + 2080 + 32', 2280), nham('87 + 94 + 13 + 6', 200), nham('121 + 85 + 115 + 469', 790),
      ],
      hints: ['Ghép các số cộng với nhau được số tròn trăm, tròn nghìn trước: 99 + 501 = 600, 168 + 32 = 200.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Trong đợt quyên góp ủng hộ học sinh vùng lũ lụt, Trường Tiểu học Thành Công đã quyên góp được 1475 quyển vở, Trường Tiểu học Thắng Lợi quyên góp được ít hơn Trường Tiểu học Thành Công 184 quyển vở. Hỏi cả hai trường quyên góp được bao nhiêu quyển vở?',
      blanks: [
        { label: 'Trường Thắng Lợi quyên góp được: ... quyển vở', answer: '1291' },
        { label: 'Cả hai trường quyên góp được: ... quyển vở', answer: '2766' },
      ],
      hints: ['Tìm số vở của Trường Thắng Lợi trước (1475 − 184), rồi cộng số vở hai trường.'],
    },
  ],

  // ── Bài 156. Ôn tập về các phép tính với số tự nhiên (tiếp theo) (trang 163) ──────────────────
  'bai-156': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        calc('a) 2057 × 13', 26741), calc('428 × 125', 53500), calc('3167 × 204', 646068),
        divCalc(7368, 24, 'b) '), divCalc(13498, 32), divCalc(285120, 216),
      ],
      hints: ['Bấm ✍️ Tính để đặt tính. Nhân với số có nhiều chữ số: viết các tích riêng lùi sang trái một cột rồi cộng lại.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tìm x:',
      blanks: [
        { label: 'a) 40 × x = 1400 → x = ...', answer: '35' },
        { label: 'b) x : 13 = 205 → x = ...', answer: '2665' },
      ],
      hints: ['Thừa số chưa biết = tích : thừa số kia. Số bị chia = thương × số chia.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết chữ hoặc số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a × b = ... × a', answer: 'b' }, { label: 'a : ... = a', answer: '1' },
        { label: '(a × b) × c = a × (b × ...)', answer: 'c' }, { label: '... : a = 1   (a khác 0)', answer: 'a' },
        { label: 'a × 1 = ... × a = ...', answer: '1,a' }, { label: '... : a = 0   (a khác 0)', answer: '0' },
        { label: 'a × (b + c) = a × b + a × ...', answer: 'c' },
      ],
      hints: ['Tính chất giao hoán, kết hợp của phép nhân; nhân một số với một tổng; chia cho 1, chia cho chính nó.'],
    },
    {
      type: 'compare', stars: 3,
      q: '4. >, <, = ?',
      rows: [
        cmp('13 500', '135 × 100', 13500, 13500), cmp('257', '8762 × 0', 257, 0),
        cmp('26 × 11', '280', 286, 280), cmp('320 : (16 × 2)', '320 : 16 : 2', 10, 10),
        cmp('1600 : 10', '1006', 160, 1006), cmp('15 × 8 × 37', '37 × 15 × 8', 1, 1),
      ],
      hints: ['Tính giá trị mỗi vế rồi so sánh. Đổi chỗ các thừa số thì tích không thay đổi.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Một ô tô cứ đi 12km thì tiêu hao hết 1l xăng, giá tiền 1l xăng là 7500 đồng. Tính số tiền phải mua xăng để ô tô đó đi được quãng đường dài 180km.',
      blanks: [
        { label: 'Số lít xăng cần để đi 180km: ... l', answer: '15' },
        { label: 'Số tiền phải mua xăng: ... đồng', answer: '112500' },
      ],
      hints: ['Tìm số lít xăng trước: 180 : 12. Rồi nhân với giá tiền 1l xăng.'],
    },
  ],

  // ── Bài 157. Ôn tập về các phép tính với số tự nhiên (tiếp theo) (trang 164) ──────────────────
  'bai-157': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính giá trị của các biểu thức: m + n ; m − n ; m × n ; m : n, với:\na) m = 952, n = 28;   b) m = 2006, n = 17.',
      blanks: [
        { label: 'a) m + n = ...', answer: '980', calc: '952 + 28' }, { label: 'm − n = ...', answer: '924', calc: '952 − 28' },
        { label: 'm × n = ...', answer: '26656', calc: '952 × 28' }, { label: 'm : n = ...', answer: '34', calc: '952 : 28' },
        { label: 'b) m + n = ...', answer: '2023', calc: '2006 + 17' }, { label: 'm − n = ...', answer: '1989', calc: '2006 − 17' },
        { label: 'm × n = ...', answer: '34102', calc: '2006 × 17' }, { label: 'm : n = ...', answer: '118', calc: '2006 : 17' },
      ],
      hints: ['Thay chữ bằng số: với m = 952, n = 28 thì m + n = 952 + 28.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính:',
      blanks: [
        { label: 'a) 12054 : (15 + 67) = ...', answer: '147' }, { label: '29150 − 136 × 201 = ...', answer: '1814' },
        { label: 'b) 9700 : 100 + 36 × 12 = ...', answer: '529' }, { label: '(160 × 5 − 25 × 4) : 4 = ...', answer: '175' },
      ],
      hints: ['Trong ngoặc tính trước; nhân, chia trước rồi cộng, trừ sau.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính bằng cách thuận tiện nhất:',
      blanks: [
        nham('a) 36 × 25 × 4', 3600), nham('18 × 24 : 9', 48), nham('41 × 2 × 8 × 5', 3280),
        nham('b) 108 × (23 + 7)', 3240), nham('215 × 86 + 215 × 14', 21500), nham('53 × 128 − 43 × 128', 1280),
      ],
      hints: ['25 × 4 = 100, 2 × 5 = 10, 18 : 9 = 2.', 'a × b + a × c = a × (b + c); a × c − b × c = (a − b) × c.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Một cửa hàng tuần đầu bán được 319m vải, tuần sau bán được nhiều hơn tuần đầu 76m. Hỏi trong hai tuần đó, trung bình mỗi ngày cửa hàng bán được bao nhiêu mét vải, biết rằng cửa hàng mở cửa tất cả các ngày trong tuần?',
      blanks: [
        { label: 'Tuần sau bán được: ... m', answer: '395' },
        { label: 'Cả hai tuần bán được: ... m', answer: '714' },
        { label: 'Hai tuần có: ... ngày', answer: '14' },
        { label: 'Trung bình mỗi ngày bán được: ... m', answer: '51' },
      ],
      hints: ['Một tuần có 7 ngày. Trung bình mỗi ngày = tổng số mét vải : số ngày.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Một hộp bánh giá 24 000 đồng và một chai sữa giá 9800 đồng. Sau khi mua 2 hộp bánh và 6 chai sữa, mẹ còn lại 93 200 đồng. Hỏi lúc đầu mẹ có bao nhiêu tiền?',
      blanks: [
        { label: 'Tiền mua 2 hộp bánh: ... đồng', answer: '48000' },
        { label: 'Tiền mua 6 chai sữa: ... đồng', answer: '58800' },
        { label: 'Lúc đầu mẹ có: ... đồng', answer: '200000' },
      ],
      hints: ['Tính số tiền đã mua bánh và sữa, rồi cộng thêm số tiền còn lại.'],
    },
  ],

  // ── Bài 158. Ôn tập về biểu đồ (trang 164–166) ────────────────────────────────────────────────
  'bai-158': [
    {
      type: 'fill', stars: 2, img: imgHinhCat,
      q: '1. Dựa vào biểu đồ dưới đây, hãy trả lời các câu hỏi sau:\na) Cả bốn tổ cắt được bao nhiêu hình? Trong đó có bao nhiêu hình tam giác, bao nhiêu hình vuông và bao nhiêu hình chữ nhật?\nb) Tổ 3 cắt được nhiều hơn tổ 2 bao nhiêu hình vuông nhưng ít hơn tổ 2 bao nhiêu hình chữ nhật?',
      blanks: [
        { label: 'a) Cả bốn tổ cắt được ... hình.', answer: '16' },
        { label: 'Trong đó có ... hình tam giác, ... hình vuông, ... hình chữ nhật.', answer: '4,7,5' },
        { label: 'b) Tổ 3 cắt được nhiều hơn tổ 2: ... hình vuông.', answer: '1' },
        { label: 'Tổ 3 cắt được ít hơn tổ 2: ... hình chữ nhật.', answer: '1' },
      ],
      hints: ['Đếm từng loại hình trong mỗi hàng của biểu đồ rồi cộng lại.'],
    },
    {
      type: 'fill', stars: 2, img: imgDienTich,
      q: '2. Biểu đồ dưới đây nói về diện tích của ba thành phố của nước ta (theo số liệu năm 2002). Dựa vào biểu đồ, hãy trả lời các câu hỏi sau:\na) Diện tích Hà Nội, Đà Nẵng, Thành phố Hồ Chí Minh là bao nhiêu ki-lô-mét vuông?\nb) Diện tích Đà Nẵng lớn hơn diện tích Hà Nội bao nhiêu ki-lô-mét vuông và bé hơn diện tích Thành phố Hồ Chí Minh bao nhiêu ki-lô-mét vuông?',
      blanks: [
        { label: 'a) Diện tích Hà Nội: ... km²', answer: '921' },
        { label: 'Diện tích Đà Nẵng: ... km²', answer: '1255' },
        { label: 'Diện tích Thành phố Hồ Chí Minh: ... km²', answer: '2095' },
        { label: 'b) Đà Nẵng lớn hơn Hà Nội: ... km²', answer: '334', calc: '1255 − 921' },
        { label: 'Đà Nẵng bé hơn Thành phố Hồ Chí Minh: ... km²', answer: '840', calc: '2095 − 1255' },
      ],
      hints: ['Số ghi trên đỉnh mỗi cột là diện tích của thành phố đó.', 'b) Lớn hơn, bé hơn bao nhiêu: lấy số lớn trừ số bé.'],
    },
    {
      type: 'fill', stars: 3, img: imgVai, calcFree: true,
      q: '3. Biểu đồ dưới đây nói về số vải của một cửa hàng bán được trong tháng 12. Cho biết mỗi cuộn vải dài 50m. Dựa vào biểu đồ, hãy trả lời các câu hỏi dưới đây:\na) Trong tháng 12 cửa hàng bán được bao nhiêu mét vải hoa?\nb) Trong tháng 12 cửa hàng bán được tất cả bao nhiêu mét vải?',
      blanks: [
        { label: 'a) Cửa hàng bán được ... m vải hoa.', answer: '2100' },
        { label: 'b) Cửa hàng bán được tất cả ... cuộn vải,', answer: '129' },
        { label: 'tức là ... m vải.', answer: '6450' },
      ],
      hints: ['Đọc số cuộn mỗi loại vải trên biểu đồ. Số mét vải = số cuộn × 50.'],
    },
  ],

  // ── Bài 159. Ôn tập về phân số (trang 166–167) ────────────────────────────────────────────────
  'bai-159': [
    {
      type: 'choice', stars: 2, img: imgPhanSo,
      q: `1. Khoanh vào chữ đặt trước câu trả lời đúng:\n${fr(2, 5)} là phân số chỉ phần đã tô màu của hình nào?`,
      options: ['A. Hình 1', 'B. Hình 2', 'C. Hình 3', 'D. Hình 4'],
      answer: 2,
      hints: ['Đếm số phần bằng nhau của mỗi hình (mẫu số) và số phần đã tô màu (tử số).'],
    },
    {
      type: 'fill', stars: 2, img: imgTiaSo,
      q: '2. Viết tiếp phân số thích hợp vào chỗ chấm:',
      blanks: [{
        label: `0 ; ${fr(1, 10)} ; ${fr(2, 10)} ; {/} ; {/} ; ${fr(5, 10)} ; {/} ; ${fr(7, 10)} ; {/} ; ${fr(9, 10)} ; 1`,
        answer: '3,10,4,10,6,10,8,10', validate: fracsValidate([[3, 10], [4, 10], [6, 10], [8, 10]], true),
      }],
      hints: ['Đoạn từ 0 đến 1 chia thành 10 phần bằng nhau; mỗi vạch hơn vạch trước nó một phần mười.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Rút gọn các phân số:',
      blanks: [
        F(fr(12, 18), 2, 3, true), F(fr(4, 40), 1, 10, true), F(fr(18, 24), 3, 4, true), F(fr(20, 35), 4, 7, true),
        { label: `${fr(60, 12)} = ...`, answer: '5', validate: (v) => ['5', '5/1'].includes(noSp(v)) },
      ],
      hints: ['Chia cả tử số và mẫu số cho cùng một số lớn hơn 1, làm đến khi được phân số tối giản.'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Quy đồng mẫu số các phân số:',
      blanks: [
        quyDong('a) ', [[2, 5], [3, 7]], [14, 35, 15, 35]),
        quyDong('b) ', [[4, 15], [6, 45]], [12, 45, 6, 45]),
        quyDong('c) ', [[1, 2], [1, 5], [1, 3]], [15, 30, 6, 30, 10, 30]),
      ],
      hints: ['Tìm một mẫu số chung chia hết cho mọi mẫu số (b: 45 chia hết cho 15).', 'Nhân cả tử số và mẫu số của mỗi phân số với cùng một số để được mẫu số chung.'],
    },
    {
      type: 'fill', stars: 3,
      q: `5. Sắp xếp các phân số ${fr(1, 3)} ; ${fr(1, 6)} ; ${fr(5, 2)} ; ${fr(3, 2)} theo thứ tự tăng dần.`,
      blanks: [{ label: '{/} ; {/} ; {/} ; {/}', answer: '1,6,1,3,3,2,5,2', validate: fracsValidate([[1, 6], [1, 3], [3, 2], [5, 2]], true) }],
      hints: ['Phân số bé hơn 1 đứng trước phân số lớn hơn 1. Cùng tử số: mẫu số lớn hơn thì phân số bé hơn.'],
    },
  ],

  // ── Bài 160. Ôn tập về các phép tính với phân số (trang 167–168) ──────────────────────────────
  'bai-160': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính:',
      blanks: [
        F(`a) ${fr(2, 7)} + ${fr(4, 7)}`, 6, 7), F(`${fr(6, 7)} − ${fr(2, 7)}`, 4, 7), F(`${fr(6, 7)} − ${fr(4, 7)}`, 2, 7), F(`${fr(4, 7)} + ${fr(2, 7)}`, 6, 7),
        F(`b) ${fr(1, 3)} + ${fr(5, 12)}`, 3, 4), F(`${fr(9, 12)} − ${fr(1, 3)}`, 5, 12), F(`${fr(9, 12)} − ${fr(5, 12)}`, 1, 3), F(`${fr(5, 12)} + ${fr(1, 3)}`, 3, 4),
      ],
      hints: ['Cùng mẫu số: cộng (trừ) hai tử số, giữ nguyên mẫu số.', 'b) Viết 1/3 thành phân số có mẫu số 12 trước.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        F(`a) ${fr(2, 7)} + ${fr(3, 5)}`, 31, 35), F(`${fr(31, 35)} − ${fr(2, 7)}`, 3, 5), F(`${fr(31, 35)} − ${fr(3, 5)}`, 2, 7), F(`${fr(3, 5)} + ${fr(2, 7)}`, 31, 35),
        F(`b) ${fr(3, 4)} + ${fr(1, 6)}`, 11, 12), F(`${fr(11, 12)} − ${fr(3, 4)}`, 1, 6), F(`${fr(11, 12)} − ${fr(1, 6)}`, 3, 4), F(`${fr(1, 6)} + ${fr(3, 4)}`, 11, 12),
      ],
      hints: ['Khác mẫu số: quy đồng mẫu số rồi cộng (trừ) như hai phân số cùng mẫu số.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tìm x:',
      blanks: [
        { label: `a) ${fr(2, 9)} + x = 1 → x = {/}`, answer: '7,9', validate: fracValidate(7, 9) },
        { label: `b) ${fr(6, 7)} − x = ${fr(2, 3)} → x = {/}`, answer: '4,21', validate: fracValidate(4, 21) },
        { label: `c) x − ${fr(1, 2)} = ${fr(1, 4)} → x = {/}`, answer: '3,4', validate: fracValidate(3, 4) },
      ],
      hints: ['Số hạng = tổng − số hạng kia; số trừ = số bị trừ − hiệu; số bị trừ = hiệu + số trừ.', 'a) 1 = 9/9.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Diện tích của vườn hoa nhà trường được sử dụng như sau: ${fr(3, 4)} diện tích vườn hoa dùng để trồng các loại hoa, ${fr(1, 5)} diện tích vườn hoa để làm đường đi, diện tích phần còn lại của vườn hoa để xây bể nước.\na) Hỏi diện tích để xây bể nước chiếm bao nhiêu phần diện tích vườn hoa?\nb) Biết vườn hoa là hình chữ nhật có chiều dài 20m, chiều rộng 15m. Hỏi diện tích để xây bể nước là bao nhiêu mét vuông?`,
      blanks: [
        { label: 'a) Diện tích xây bể nước chiếm {/} diện tích vườn hoa.', answer: '1,20', validate: fracValidate(1, 20) },
        { label: 'b) Diện tích vườn hoa: ... m²', answer: '300' },
        { label: 'Diện tích xây bể nước: ... m²', answer: '15' },
      ],
      hints: ['a) Cả vườn hoa là 1 (20/20). Lấy 1 trừ phần trồng hoa và phần làm đường đi.', 'b) Diện tích bể nước = diện tích vườn hoa × phân số tìm được ở câu a.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `5. Con sên thứ nhất trong 15 phút bò được ${fr(2, 5)}m. Con sên thứ hai trong ${fr(1, 4)} giờ bò được 45cm. Hỏi con sên nào bò nhanh hơn?`,
      blanks: [
        { label: `${fr(2, 5)}m = ... cm`, answer: '40' },
        { label: `${fr(1, 4)} giờ = ... phút`, answer: '15' },
        { label: 'Con sên thứ ... bò nhanh hơn.', answer: 'hai', validate: textValidate('hai'), tiles: ['nhất', 'hai'], tileOne: true },
      ],
      hints: ['Đổi về cùng đơn vị: 1m = 100cm, 1 giờ = 60 phút. Cùng thời gian, con nào bò được xa hơn thì nhanh hơn.'],
    },
  ],

  // ── Bài 161. Ôn tập về các phép tính với phân số (tiếp theo) (trang 168–169) ──────────────────
  'bai-161': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính:',
      blanks: [
        F(`a) ${fr(2, 3)} × ${fr(4, 7)}`, 8, 21), F(`${fr(8, 21)} : ${fr(2, 3)}`, 4, 7), F(`${fr(8, 21)} : ${fr(4, 7)}`, 2, 3), F(`${fr(4, 7)} × ${fr(2, 3)}`, 8, 21),
        F(`b) ${fr(3, 11)} × 2`, 6, 11), W(`${fr(6, 11)} : ${fr(3, 11)}`, 2), F(`${fr(6, 11)} : 2`, 3, 11), F(`2 × ${fr(3, 11)}`, 6, 11),
        F(`c) 4 × ${fr(2, 7)}`, 8, 7), W(`${fr(8, 7)} : ${fr(2, 7)}`, 4), F(`${fr(8, 7)} : 4`, 2, 7), F(`${fr(2, 7)} × 4`, 8, 7),
      ],
      hints: ['Nhân: tử nhân tử, mẫu nhân mẫu. Chia: nhân với phân số thứ hai đảo ngược.', 'Kết quả rút gọn được thành số tự nhiên thì viết số tự nhiên.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tìm x:',
      blanks: [
        { label: `a) ${fr(2, 7)} × x = ${fr(2, 3)} → x = {/}`, answer: '7,3', validate: fracValidate(7, 3) },
        { label: `b) ${fr(2, 5)} : x = ${fr(1, 3)} → x = {/}`, answer: '6,5', validate: fracValidate(6, 5) },
        { label: `c) x : ${fr(7, 11)} = 22 → x = ...`, answer: '14' },
      ],
      hints: ['Thừa số = tích : thừa số kia; số chia = số bị chia : thương; số bị chia = thương × số chia.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [
        W(`a) ${fr(3, 7)} × ${fr(7, 3)}`, 1), W(`b) ${fr(3, 7)} : ${fr(3, 7)}`, 1),
        F(`c) ${fr(2, 3)} × ${fr(1, 6)} × ${fr(9, 11)}`, 1, 11), F(`d) ${fr('2 × 3 × 4', '2 × 3 × 4 × 5')}`, 1, 5),
      ],
      hints: ['Viết thành một phân số rồi rút gọn: tử số và mẫu số có cùng thừa số thì gạch bỏ thừa số đó.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Một tờ giấy hình vuông có cạnh ${fr(2, 5)}m.\na) Tính chu vi và diện tích tờ giấy hình vuông đó.\nb) Bạn An cắt tờ giấy đó thành các ô vuông, mỗi ô có cạnh ${fr(2, 25)}m thì cắt được tất cả bao nhiêu ô vuông?\nc) Một tờ giấy hình chữ nhật có chiều dài ${fr(4, 5)}m và có cùng diện tích với tờ giấy hình vuông đó. Tìm chiều rộng tờ giấy hình chữ nhật.`,
      blanks: [
        { label: 'a) Chu vi tờ giấy: {/} m', answer: '8,5', validate: fracValidate(8, 5) },
        { label: 'Diện tích tờ giấy: {/} m²', answer: '4,25', validate: fracValidate(4, 25) },
        { label: 'b) Cắt được tất cả ... ô vuông.', answer: '25' },
        { label: 'c) Chiều rộng tờ giấy hình chữ nhật: {/} m', answer: '1,5', validate: fracValidate(1, 5) },
      ],
      hints: ['Chu vi hình vuông = cạnh × 4; diện tích = cạnh × cạnh.', 'b) Mỗi cạnh cắt được (2/5 : 2/25) ô. c) Chiều rộng = diện tích : chiều dài.'],
    },
  ],

  // ── Bài 162. Ôn tập về các phép tính với phân số (tiếp theo) (trang 169) ──────────────────────
  'bai-162': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính bằng hai cách:',
      blanks: [
        F(`a) (${fr(6, 11)} + ${fr(5, 11)}) × ${fr(3, 7)}`, 3, 7),
        F(`b) ${fr(3, 5)} × ${fr(7, 9)} − ${fr(3, 5)} × ${fr(2, 9)}`, 1, 3),
        F(`c) (${fr(6, 7)} − ${fr(4, 7)}) : ${fr(2, 5)}`, 5, 7),
        F(`d) ${fr(8, 15)} : ${fr(2, 11)} + ${fr(7, 15)} : ${fr(2, 11)}`, 11, 2),
      ],
      hints: ['Cách 1: tính trong ngoặc (hoặc từng tích, từng thương) trước. Cách 2: dùng a × c + b × c = (a + b) × c.', 'Hai cách phải ra cùng một kết quả; ghi kết quả vào ô.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        F(`a) ${fr('2 × 3 × 4', '3 × 4 × 5')}`, 2, 5),
        W(`b) ${fr(2, 3)} × ${fr(3, 4)} × ${fr(4, 5)} : ${fr(1, 5)}`, 2),
        F(`c) ${fr('1 × 2 × 3 × 4', '5 × 6 × 7 × 8')}`, 1, 70),
        F(`d) ${fr(2, 5)} × ${fr(3, 4)} × ${fr(5, 6)} : ${fr(3, 4)}`, 1, 3),
      ],
      hints: ['Gạch bỏ các thừa số giống nhau ở tử số và mẫu số.', 'Chia cho một phân số là nhân với phân số đảo ngược.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `3. Một tấm vải dài 20m. Đã may quần áo hết ${fr(4, 5)} tấm vải đó. Số vải còn lại người ta đem may các túi, mỗi túi hết ${fr(2, 3)}m. Hỏi may được tất cả bao nhiêu cái túi như vậy?`,
      blanks: [
        { label: 'Số vải đã may quần áo: ... m', answer: '16' },
        { label: 'Số vải còn lại: ... m', answer: '4' },
        { label: 'May được tất cả ... cái túi.', answer: '6' },
      ],
      hints: ['Tìm 4/5 của 20m, rồi tìm số vải còn lại.', 'Số túi = số vải còn lại : 2/3.'],
    },
    {
      type: 'choice', stars: 3,
      q: `4. Khoanh vào chữ đặt trước câu trả lời đúng:\nCho ${fr(4, 5)} : ${fr('□', 5)} = ${fr(1, 5)}\nSố thích hợp để viết vào ô trống là:`,
      options: ['A. 1', 'B. 4', 'C. 5', 'D. 20'],
      answer: 3,
      hints: ['4/5 : □/5 = 4/5 × 5/□. Thử từng số xem phép tính nào ra 1/5.'],
    },
  ],

  // ── Bài 163. Ôn tập về các phép tính với phân số (tiếp theo) (trang 170) ──────────────────────
  'bai-163': [
    {
      type: 'fill', stars: 3,
      q: `1. Phân số thứ nhất là ${fr(4, 5)}, phân số thứ hai là ${fr(2, 7)}. Hãy tính tổng, hiệu, tích, thương của phân số thứ nhất và phân số thứ hai.`,
      blanks: [
        F(`Tổng: ${fr(4, 5)} + ${fr(2, 7)}`, 38, 35), F(`Hiệu: ${fr(4, 5)} − ${fr(2, 7)}`, 18, 35),
        F(`Tích: ${fr(4, 5)} × ${fr(2, 7)}`, 8, 35), F(`Thương: ${fr(4, 5)} : ${fr(2, 7)}`, 14, 5),
      ],
      hints: ['Cộng, trừ: quy đồng mẫu số 35. Nhân: tử nhân tử, mẫu nhân mẫu. Chia: nhân với 7/2.'],
    },
    {
      type: 'fill', stars: 4,
      q: `2. Số?\n<table class="gw-book-table"><tr><td>Số bị trừ</td><td>${fr(4, 5)}</td><td><b>(2)</b></td><td>${fr(7, 9)}</td></tr><tr><td>Số trừ</td><td>${fr(1, 3)}</td><td>${fr(1, 4)}</td><td><b>(3)</b></td></tr><tr><td>Hiệu</td><td><b>(1)</b></td><td>${fr(1, 2)}</td><td>${fr(1, 5)}</td></tr></table>\n<table class="gw-book-table"><tr><td>Thừa số</td><td>${fr(2, 3)}</td><td><b>(5)</b></td><td>${fr(2, 9)}</td></tr><tr><td>Thừa số</td><td>${fr(4, 7)}</td><td>${fr(1, 3)}</td><td><b>(6)</b></td></tr><tr><td>Tích</td><td><b>(4)</b></td><td>${fr(8, 9)}</td><td>${fr(6, 11)}</td></tr></table>`,
      blanks: [
        { label: 'a) (1) = {/}', answer: '7,15', validate: fracValidate(7, 15) },
        { label: '(2) = {/}', answer: '3,4', validate: fracValidate(3, 4) },
        { label: '(3) = {/}', answer: '26,45', validate: fracValidate(26, 45) },
        { label: 'b) (4) = {/}', answer: '8,21', validate: fracValidate(8, 21) },
        { label: '(5) = {/}', answer: '8,3', validate: fracValidate(8, 3) },
        { label: '(6) = {/}', answer: '27,11', validate: fracValidate(27, 11) },
      ],
      hints: ['Hiệu = số bị trừ − số trừ; số bị trừ = hiệu + số trừ; số trừ = số bị trừ − hiệu.', 'Tích = thừa số × thừa số; thừa số chưa biết = tích : thừa số kia.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [
        F(`a) ${fr(2, 3)} + ${fr(5, 2)} − ${fr(3, 4)}`, 29, 12), F(`${fr(2, 5)} × ${fr(1, 2)} : ${fr(1, 3)}`, 3, 5), F(`${fr(2, 9)} : ${fr(2, 9)} × ${fr(1, 2)}`, 1, 2),
        F(`b) ${fr(4, 5)} − ${fr(1, 2)} + ${fr(1, 3)}`, 19, 30), F(`${fr(1, 2)} × ${fr(1, 3)} + ${fr(1, 4)}`, 5, 12), F(`${fr(2, 7)} : ${fr(2, 3)} − ${fr(1, 7)}`, 2, 7),
      ],
      hints: ['Chỉ có cộng, trừ (hoặc chỉ có nhân, chia): tính từ trái sang phải. Có cả hai: nhân, chia trước.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `4. Người ta cho một vòi nước chảy vào bể chưa có nước, giờ thứ nhất chảy được ${fr(2, 5)} bể, giờ thứ hai chảy được ${fr(2, 5)} bể.\na) Hỏi sau 2 giờ vòi nước đó chảy vào được mấy phần bể?\nb) Nếu đã dùng hết một lượng nước bằng ${fr(1, 2)} bể thì số nước còn lại là mấy phần bể?`,
      blanks: [
        { label: 'a) Sau 2 giờ vòi nước chảy được {/} bể.', answer: '4,5', validate: fracValidate(4, 5) },
        { label: 'b) Số nước còn lại là {/} bể.', answer: '3,10', validate: fracValidate(3, 10) },
      ],
      hints: ['a) Cộng lượng nước hai giờ. b) Lấy kết quả câu a trừ 1/2.'],
    },
  ],

  // ── Bài 164. Ôn tập về đại lượng (trang 170–171) ──────────────────────────────────────────────
  'bai-164': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '1 yến = ... kg', answer: '10' }, { label: '1 tạ = ... yến', answer: '10' },
        { label: '1 tạ = ... kg', answer: '100' }, { label: '1 tấn = ... tạ', answer: '10' },
        { label: '1 tấn = ... kg', answer: '1000' }, { label: '1 tấn = ... yến', answer: '100' },
      ],
      hints: ['Mỗi đơn vị đo khối lượng gấp 10 lần đơn vị bé hơn tiếp liền: tấn, tạ, yến, kg.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 10 yến = ... kg', answer: '100' }, { label: `${fr(1, 2)} yến = ... kg`, answer: '5' },
        { label: '50kg = ... yến', answer: '5' }, { label: '1 yến 8kg = ... kg', answer: '18' },
        { label: 'b) 5 tạ = ... yến', answer: '50' }, { label: '1500kg = ... tạ', answer: '15' },
        { label: '30 yến = ... tạ', answer: '3' }, { label: '7 tạ 20kg = ... kg', answer: '720' },
        { label: 'c) 32 tấn = ... tạ', answer: '320' }, { label: '4000kg = ... tấn', answer: '4' },
        { label: '230 tạ = ... tấn', answer: '23' }, { label: '3 tấn 25kg = ... kg', answer: '3025' },
      ],
      hints: ['1 yến = 10kg, 1 tạ = 100kg, 1 tấn = 1000kg.', `${fr(1, 2)} yến là một nửa của 10kg.`],
    },
    {
      type: 'compare', stars: 2,
      q: '3. >, <, = ?',
      rows: [
        cmp('2kg 7hg', '2700g', 2700, 2700), cmp('60kg 7g', '6007g', 60007, 6007),
        cmp('5kg 3g', '5035g', 5003, 5035), cmp('12 500g', '12kg 500g', 12500, 12500),
      ],
      hints: ['Đổi về cùng đơn vị gam: 1kg = 1000g, 1hg = 100g.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Một con cá cân nặng 1kg 700g, một bó rau cân nặng 300g. Hỏi cả cá và rau cân nặng bao nhiêu ki-lô-gam?',
      blanks: [
        { label: 'Cả cá và rau cân nặng: ... g', answer: '2000' },
        { label: 'tức là ... kg', answer: '2' },
      ],
      hints: ['Đổi 1kg 700g ra gam rồi cộng với 300g. 1000g = 1kg.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '5. Một xe ô tô chở được 32 bao gạo, mỗi bao cân nặng 50kg. Hỏi chiếc xe đó chở được tất cả bao nhiêu tạ gạo?',
      blanks: [
        { label: 'Xe chở được: ... kg gạo', answer: '1600', calc: '32 × 50' },
        { label: 'tức là ... tạ gạo', answer: '16' },
      ],
      hints: ['Tìm số ki-lô-gam gạo (32 × 50) rồi đổi ra tạ: 100kg = 1 tạ.'],
    },
  ],

  // ── Bài 165. Ôn tập về đại lượng (tiếp theo) (trang 171–172) ──────────────────────────────────
  'bai-165': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '1 giờ = ... phút', answer: '60' }, { label: '1 năm = ... tháng', answer: '12' },
        { label: '1 phút = ... giây', answer: '60' }, { label: '1 thế kỉ = ... năm', answer: '100' },
        { label: '1 giờ = ... giây', answer: '3600' }, { label: '1 năm không nhuận = ... ngày', answer: '365' },
        { label: '1 năm nhuận = ... ngày', answer: '366' },
      ],
      hints: ['1 giờ = 60 phút, 1 phút = 60 giây nên 1 giờ = 60 × 60 giây.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 5 giờ = ... phút', answer: '300' }, { label: '3 giờ 15 phút = ... phút', answer: '195' },
        { label: '420 giây = ... phút', answer: '7' }, { label: `${fr(1, 12)} giờ = ... phút`, answer: '5' },
        { label: 'b) 4 phút = ... giây', answer: '240' }, { label: '3 phút 25 giây = ... giây', answer: '205' },
        { label: '2 giờ = ... giây', answer: '7200' }, { label: `${fr(1, 10)} phút = ... giây`, answer: '6' },
        { label: 'c) 5 thế kỉ = ... năm', answer: '500' }, { label: `${fr(1, 20)} thế kỉ = ... năm`, answer: '5' },
        { label: '12 thế kỉ = ... năm', answer: '1200' }, { label: '2000 năm = ... thế kỉ', answer: '20' },
      ],
      hints: ['1/12 giờ: lấy 60 phút chia cho 12. 1/10 phút: lấy 60 giây chia cho 10.'],
    },
    {
      type: 'compare', stars: 2,
      q: '3. >, <, = ?',
      rows: [
        cmp('5 giờ 20 phút', '300 phút', 320, 300), cmp(`${fr(1, 3)} giờ`, '20 phút', 20, 20),
        cmp('495 giây', '8 phút 15 giây', 495, 495), cmp(`${fr(1, 5)} phút`, `${fr(1, 3)} phút`, 12, 20),
      ],
      hints: ['Đổi về cùng một đơn vị rồi so sánh: 1 giờ = 60 phút, 1 phút = 60 giây.'],
    },
    {
      type: 'fill', stars: 2,
      q: `4. Bảng dưới đây cho biết một số hoạt động của bạn Hà trong mỗi buổi sáng hằng ngày:<table class="gw-book-table"><tr><th>Thời gian</th><th>Hoạt động</th></tr><tr><td>Từ 6 giờ 10 phút đến 6 giờ 30 phút</td><td>Vệ sinh cá nhân và tập thể dục</td></tr><tr><td>Từ 6 giờ 30 phút đến 7 giờ</td><td>Ăn sáng</td></tr><tr><td>Từ 7 giờ 30 phút đến 11 giờ 30 phút</td><td>Học và chơi ở trường</td></tr></table>a) Hà ăn sáng trong bao nhiêu phút?\nb) Buổi sáng Hà ở trường trong bao lâu?`,
      blanks: [
        { label: 'a) Hà ăn sáng trong ... phút.', answer: '30' },
        { label: 'b) Buổi sáng Hà ở trường trong ... giờ.', answer: '4' },
      ],
      hints: ['Lấy giờ kết thúc trừ giờ bắt đầu.'],
    },
    {
      type: 'choice', stars: 3,
      q: '5. Trong các khoảng thời gian sau, khoảng thời gian nào là dài nhất?',
      options: ['600 giây', '20 phút', `${fr(1, 4)} giờ`, `${fr(3, 10)} giờ`],
      answer: 1,
      hints: ['Đổi tất cả ra phút: 600 giây = 10 phút, 1/4 giờ = 15 phút, 3/10 giờ = 18 phút.'],
    },
  ],

  // ── Bài 166. Ôn tập về đại lượng (tiếp theo) (trang 172–173) ──────────────────────────────────
  'bai-166': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '1m² = ... dm²', answer: '100' }, { label: '1km² = ... m²', answer: '1000000' },
        { label: '1m² = ... cm²', answer: '10000' }, { label: '1dm² = ... cm²', answer: '100' },
      ],
      hints: ['Mỗi đơn vị đo diện tích gấp 100 lần đơn vị bé hơn tiếp liền: m², dm², cm². 1km² = 1 000 000m².'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 15m² = ... cm²', answer: '150000' }, { label: `${fr(1, 10)}m² = ... dm²`, answer: '10' },
        { label: '103m² = ... dm²', answer: '10300' }, { label: `${fr(1, 10)}dm² = ... cm²`, answer: '10' },
        { label: '2110dm² = ... cm²', answer: '211000' }, { label: `${fr(1, 10)}m² = ... cm²`, answer: '1000' },
        { label: 'b) 500cm² = ... dm²', answer: '5' }, { label: '1cm² = {/} dm²', answer: '1,100', validate: fracValidate(1, 100) },
        { label: '1300dm² = ... m²', answer: '13' }, { label: '1dm² = {/} m²', answer: '1,100', validate: fracValidate(1, 100) },
        { label: '60 000cm² = ... m²', answer: '6' }, { label: '1cm² = {/} m²', answer: '1,10000', validate: fracValidate(1, 10000) },
        { label: 'c) 5m² 9dm² = ... dm²', answer: '509' }, { label: '700dm² = ... m²', answer: '7' },
        { label: '8m² 50cm² = ... cm²', answer: '80050' }, { label: '50 000cm² = ... m²', answer: '5' },
      ],
      hints: ['1m² = 100dm² = 10 000cm²; 1dm² = 100cm².', '1cm² là một phần trăm của 1dm², nên 1cm² = 1/100 dm².'],
    },
    {
      type: 'compare', stars: 2,
      q: '3. >, <, = ?',
      rows: [
        cmp('2m² 5dm²', '25dm²', 205, 25), cmp('3m² 99dm²', '4m²', 399, 400),
        cmp('3dm² 5cm²', '305cm²', 305, 305), cmp('65m²', '6500dm²', 6500, 6500),
      ],
      hints: ['Đổi về cùng đơn vị bé hơn rồi so sánh: 1m² = 100dm², 1dm² = 100cm².'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Một thửa ruộng hình chữ nhật có chiều dài 64m và chiều rộng 25m. Trung bình cứ 1m² ruộng đó thì thu hoạch được ${fr(1, 2)} kg thóc. Hỏi trên cả thửa ruộng đó người ta thu hoạch được bao nhiêu tạ thóc?`,
      blanks: [
        { label: 'Diện tích thửa ruộng: ... m²', answer: '1600', calc: '64 × 25' },
        { label: 'Số thóc thu hoạch được: ... kg', answer: '800' },
        { label: 'tức là ... tạ thóc', answer: '8' },
      ],
      hints: ['Diện tích = chiều dài × chiều rộng. Số thóc = diện tích × 1/2 kg (lấy diện tích chia 2).', '100kg = 1 tạ.'],
    },
  ],

  // ── Bài 167. Ôn tập về hình học (trang 173) ───────────────────────────────────────────────────
  'bai-167': [
    {
      type: 'fill', stars: 2, img: imgAbcd, blanksAnyOrder: true,
      q: '1. Quan sát hình bên, hãy chỉ ra:\na) Các cạnh song song với nhau;\nb) Các cạnh vuông góc với nhau.',
      blanks: [
        seg2('a) Cạnh ... song song với cạnh ...', 'AB', 'DC'),
        seg2('b) Cạnh ... vuông góc với cạnh ...', 'AD', 'AB'),
        seg2('Cạnh ... vuông góc với cạnh ...', 'AD', 'DC'),
      ],
      hints: ['Hai cạnh tạo thành góc vuông (có kí hiệu góc vuông) thì vuông góc với nhau.'],
      // 📐 Kéo dài: toạ độ theo bai167_q1_abcd.svg.
      geoPlay: { points: { A: [50, 50], B: [330, 50], C: [220, 170], D: [50, 170] }, segs: ['AB', 'BC', 'DC', 'AD'], fill: 'ABCD', pick: 'AB', answer: [{ blank: 0, list: 'par' }] },
      ekePlay: { fill: { blanks: [1, 2], list: 'right', as: 'sides' } },
    },
    {
      type: 'fill', stars: 2,
      q: '2. Hãy vẽ một hình vuông có cạnh dài 3cm. Tính chu vi và diện tích hình vuông đó.',
      blanks: [
        { label: 'Chu vi hình vuông: ... cm', answer: '12' },
        { label: 'Diện tích hình vuông: ... cm²', answer: '9' },
      ],
      hints: ['Chu vi hình vuông = cạnh × 4; diện tích = cạnh × cạnh.'],
    },
    {
      type: 'fill', stars: 3, img: imgHaiHinh,
      q: '3. Đúng ghi Đ, sai ghi S:',
      blanks: [
        { label: 'a) Chu vi hình 1 bằng chu vi hình 2. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) Diện tích hình 1 bằng diện tích hình 2. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'c) Diện tích hình 2 lớn hơn diện tích hình 1. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'd) Chu vi hình 1 lớn hơn chu vi hình 2. ...', answer: 'Đ', validate: dsValidate(true) },
      ],
      hints: ['Tính chu vi, diện tích của từng hình rồi so sánh: hình 1 là hình chữ nhật 4cm × 3cm, hình 2 là hình vuông cạnh 3cm.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Để lát nền một phòng học hình chữ nhật, người ta dùng loại gạch men hình vuông có cạnh 20cm. Hỏi cần bao nhiêu viên gạch để lát kín nền phòng học đó, biết rằng nền phòng học có chiều rộng 5m, chiều dài 8m và phần mạch vữa không đáng kể?',
      blanks: [
        { label: 'Diện tích nền phòng học: ... m²', answer: '40' },
        { label: 'tức là ... cm²', answer: '400000' },
        { label: 'Diện tích một viên gạch: ... cm²', answer: '400' },
        { label: 'Cần ... viên gạch.', answer: '1000' },
      ],
      hints: ['Đổi diện tích nền ra xăng-ti-mét vuông: 1m² = 10 000cm².', 'Số viên gạch = diện tích nền : diện tích một viên gạch.'],
    },
  ],

  // ── Bài 168. Ôn tập về hình học (tiếp theo) (trang 174) ───────────────────────────────────────
  'bai-168': [
    {
      type: 'fill', stars: 2, img: imgDuong,
      q: '1. Quan sát hình bên, hãy chỉ ra:\na) Đoạn thẳng song song với AB;\nb) Đoạn thẳng vuông góc với BC.',
      blanks: [
        seg1('a) Đoạn thẳng ... song song với AB.', 'DE'),
        seg1('b) Đoạn thẳng ... vuông góc với BC.', 'CD'),
      ],
      hints: ['Hai đường thẳng song song không bao giờ cắt nhau. Hai đoạn thẳng vuông góc tạo thành góc vuông.'],
      // 📐 Kéo dài: toạ độ theo bai168_q1_duong.svg.
      geoPlay: { points: { A: [40, 50], B: [260, 50], C: [320, 153.9], D: [164.1, 243.9], E: [394.1, 243.9] }, segs: ['AB', 'BC', 'CD', 'DE'], pick: 'AB', answer: [{ blank: 0, list: 'par', with: 'AB' }] },
      ekePlay: { fill: { blank: 1, list: 'right', line: 'BC' } },
    },
    {
      type: 'choice', stars: 3, img: imgVuongNhat,
      q: '2. Hình vuông ABCD và hình chữ nhật MNPQ có cùng diện tích. Hãy chọn số đo chỉ đúng chiều dài của hình chữ nhật:',
      options: ['64cm', '32cm', '16cm', '12cm'],
      answer: 2,
      hints: ['Diện tích hình vuông = 8 × 8. Chiều dài hình chữ nhật = diện tích : chiều rộng 4cm.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Hãy vẽ hình chữ nhật có chiều dài 5cm, chiều rộng 4cm. Tính chu vi và diện tích hình chữ nhật đó.',
      blanks: [
        { label: 'Chu vi hình chữ nhật: ... cm', answer: '18' },
        { label: 'Diện tích hình chữ nhật: ... cm²', answer: '20' },
      ],
      hints: ['Chu vi = (dài + rộng) × 2; diện tích = dài × rộng.'],
    },
    {
      type: 'fill', stars: 4, img: imgHinhH,
      q: '4. Cho hình H tạo bởi hình bình hành ABCD và hình chữ nhật BEGC như hình vẽ bên. Tính diện tích hình H.',
      blanks: [
        { label: 'Diện tích hình bình hành ABCD: ... cm²', answer: '12' },
        { label: 'Diện tích hình chữ nhật BEGC: ... cm²', answer: '12' },
        { label: 'Diện tích hình H: ... cm²', answer: '24' },
      ],
      hints: ['Hình bình hành ABCD có đáy BC = EG = 4cm, chiều cao 3cm. Diện tích hình bình hành = đáy × chiều cao.', 'Diện tích hình H = tổng diện tích hai hình.'],
    },
  ],

  // ── Bài 169. Ôn tập về tìm số trung bình cộng (trang 175) ─────────────────────────────────────
  'bai-169': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Tìm số trung bình cộng của các số sau:',
      blanks: [
        { label: 'a) 137 ; 248 và 395: số trung bình cộng là ...', answer: '260' },
        { label: 'b) 348 ; 219 ; 560 và 725: số trung bình cộng là ...', answer: '463' },
      ],
      hints: ['Số trung bình cộng = tổng các số : số các số hạng.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Trong 5 năm liền số dân của một phường tăng lần lượt là: 158 người, 147 người, 132 người, 103 người, 95 người. Hỏi trong 5 năm đó, trung bình số dân tăng hằng năm là bao nhiêu người?',
      blanks: [
        { label: 'Trong 5 năm số dân tăng: ... người', answer: '635' },
        { label: 'Trung bình mỗi năm tăng: ... người', answer: '127' },
      ],
      hints: ['Cộng số dân tăng của 5 năm rồi chia cho 5.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Tổ Một góp được 36 quyển vở. Tổ Hai góp được nhiều hơn tổ Một 2 quyển nhưng lại ít hơn tổ Ba 2 quyển. Hỏi trung bình mỗi tổ góp được bao nhiêu quyển vở?',
      blanks: [
        { label: 'Tổ Hai góp được: ... quyển', answer: '38' },
        { label: 'Tổ Ba góp được: ... quyển', answer: '40' },
        { label: 'Trung bình mỗi tổ góp được: ... quyển', answer: '38' },
      ],
      hints: ['Tổ Ba nhiều hơn tổ Hai 2 quyển. Cộng số vở ba tổ rồi chia cho 3.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Một công ti chuyển máy bơm bằng ô tô. Lần đầu có 3 ô tô, mỗi ô tô chở được 16 máy. Lần sau có 5 ô tô, mỗi ô tô chở được 24 máy. Hỏi trung bình mỗi ô tô chở được bao nhiêu máy bơm?',
      blanks: [
        { label: 'Lần đầu chở được: ... máy', answer: '48' },
        { label: 'Lần sau chở được: ... máy', answer: '120' },
        { label: 'Trung bình mỗi ô tô chở được: ... máy bơm', answer: '21' },
      ],
      hints: ['Tổng số máy bơm chia cho tổng số ô tô (3 + 5).'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '5. Trung bình cộng của hai số bằng 15. Tìm hai số đó, biết số lớn gấp đôi số bé.',
      blanks: [
        { label: 'Tổng hai số: ...', answer: '30' },
        { label: 'Số bé: ...', answer: '10' },
        { label: 'Số lớn: ...', answer: '20' },
      ],
      hints: ['Tổng hai số = 15 × 2. Số bé là 1 phần, số lớn là 2 phần như thế.'],
    },
  ],

  // ── Bài 170. Ôn tập về tìm hai số khi biết tổng và hiệu của hai số đó (trang 175) ─────────────
  'bai-170': [
    {
      type: 'table', stars: 3, calcFree: true,
      q: '1. Viết số thích hợp vào ô trống:',
      rows: [
        ['Tổng hai số', '318', '1945', '3271'],
        ['Hiệu hai số', '42', '87', '493'],
        ['Số lớn', blank(180), blank(1016), blank(1882)],
        ['Số bé', blank(138), blank(929), blank(1389)],
      ],
      hints: ['Số lớn = (tổng + hiệu) : 2; số bé = (tổng − hiệu) : 2.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Hai đội trồng rừng trồng được 1375 cây. Đội thứ nhất trồng nhiều hơn đội thứ hai 285 cây. Hỏi mỗi đội trồng được bao nhiêu cây?',
      blanks: [
        { label: 'Đội thứ nhất trồng được: ... cây', answer: '830' },
        { label: 'Đội thứ hai trồng được: ... cây', answer: '545' },
      ],
      hints: ['Số lớn = (tổng + hiệu) : 2.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một thửa ruộng hình chữ nhật có chu vi 530m, chiều rộng kém chiều dài 47m. Tính diện tích của thửa ruộng.',
      blanks: [
        { label: 'Nửa chu vi thửa ruộng: ... m', answer: '265' },
        { label: 'Chiều dài: ... m', answer: '156' },
        { label: 'Chiều rộng: ... m', answer: '109' },
        { label: 'Diện tích thửa ruộng: ... m²', answer: '17004' },
      ],
      hints: ['Nửa chu vi = tổng chiều dài và chiều rộng. Chiều dài = (nửa chu vi + 47) : 2.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Trung bình cộng của hai số bằng 135. Biết một trong hai số là 246. Tìm số kia.',
      blanks: [
        { label: 'Tổng hai số: ...', answer: '270' },
        { label: 'Số kia là: ...', answer: '24' },
      ],
      hints: ['Tổng hai số = 135 × 2. Số kia = tổng − 246.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Tìm hai số biết tổng của chúng bằng số lớn nhất có ba chữ số và hiệu của hai số đó bằng số lớn nhất có hai chữ số.',
      blanks: [
        { label: 'Tổng: ... ; hiệu: ...', answer: '999,99' },
        { label: 'Số lớn: ...', answer: '549' },
        { label: 'Số bé: ...', answer: '450' },
      ],
      hints: ['Số lớn nhất có ba chữ số là 999, có hai chữ số là 99.'],
    },
  ],

  // ── Bài 171. Ôn tập về tìm hai số khi biết tổng hoặc hiệu và tỉ số của hai số đó (trang 176) ──
  'bai-171': [
    {
      type: 'table', stars: 3, calcFree: true,
      q: '1. Viết số thích hợp vào ô trống:',
      rows: [
        ['Tổng hai số', '91', '170', '216'],
        ['Tỉ số của hai số', fr(1, 6), fr(2, 3), fr(3, 5)],
        ['Số bé', blank(13), blank(68), blank(81)],
        ['Số lớn', blank(78), blank(102), blank(135)],
      ],
      hints: ['Tỉ số 2/3: số bé 2 phần, số lớn 3 phần. Giá trị một phần = tổng : tổng số phần.'],
    },
    {
      type: 'table', stars: 3, calcFree: true,
      q: '2. Viết số thích hợp vào ô trống:',
      rows: [
        ['Hiệu hai số', '72', '63', '105'],
        ['Tỉ số của hai số', fr(1, 5), fr(3, 4), fr(4, 7)],
        ['Số bé', blank(18), blank(189), blank(140)],
        ['Số lớn', blank(90), blank(252), blank(245)],
      ],
      hints: ['Tỉ số 3/4: số bé 3 phần, số lớn 4 phần. Giá trị một phần = hiệu : hiệu số phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `3. Hai kho chứa 1350 tấn thóc. Tìm số thóc của mỗi kho, biết rằng số thóc của kho thứ nhất bằng ${fr(4, 5)} số thóc của kho thứ hai.`,
      blanks: [
        { label: 'Kho thứ nhất: ... tấn thóc', answer: '600' },
        { label: 'Kho thứ hai: ... tấn thóc', answer: '750' },
      ],
      hints: ['Kho thứ nhất 4 phần, kho thứ hai 5 phần: tổng số phần là 9.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Một cửa hàng bán được 56 hộp kẹo và hộp bánh, trong đó số hộp kẹo bằng ${fr(3, 4)} số hộp bánh. Hỏi cửa hàng bán được bao nhiêu hộp mỗi loại?`,
      blanks: [
        { label: 'Số hộp kẹo: ... hộp', answer: '24' },
        { label: 'Số hộp bánh: ... hộp', answer: '32' },
      ],
      hints: ['Kẹo 3 phần, bánh 4 phần: tổng số phần là 7.'],
    },
    {
      type: 'fill', stars: 5, wordProblem: true,
      q: '5. Mẹ hơn con 27 tuổi. Sau 3 năm nữa tuổi mẹ sẽ gấp 4 lần tuổi con. Tính tuổi của mỗi người hiện nay.',
      blanks: [
        { label: 'Tuổi con hiện nay: ... tuổi', answer: '6' },
        { label: 'Tuổi mẹ hiện nay: ... tuổi', answer: '33' },
      ],
      hints: ['Sau 3 năm mẹ vẫn hơn con 27 tuổi. Lúc đó tuổi con 1 phần, tuổi mẹ 4 phần: hiệu số phần là 3.', 'Tìm tuổi con sau 3 năm rồi trừ đi 3.'],
    },
  ],

  // ── Bài 172. Luyện tập chung (trang 176–177) ──────────────────────────────────────────────────
  'bai-172': [
    {
      type: 'fill', stars: 2,
      q: '1. Diện tích của bốn tỉnh (theo số liệu năm 2003) được cho trong bảng sau:<table class="gw-book-table"><tr><th>Tỉnh</th><th>Lâm Đồng</th><th>Đắk Lắk</th><th>Kon Tum</th><th>Gia Lai</th></tr><tr><td>Diện tích</td><td>9765km²</td><td>19 599km²</td><td>9615km²</td><td>15 496km²</td></tr></table>Hãy nêu tên các tỉnh có diện tích theo thứ tự từ bé đến lớn.',
      blanks: [{
        label: 'Từ bé đến lớn: ...', answer: 'Kon Tum, Lâm Đồng, Gia Lai, Đắk Lắk',
        validate: (v) => String(v).split(/[,;>]+/).map(s => stripVN(s).replace(/[^a-z]/g, '')).filter(Boolean).join('|') === 'kontum|lamdong|gialai|daklak',
        tiles: ['Lâm Đồng', 'Đắk Lắk', 'Kon Tum', 'Gia Lai'],
      }],
      hints: ['So sánh các số đo diện tích: số có nhiều chữ số hơn thì lớn hơn.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        F(`a) ${fr(2, 5)} + ${fr(3, 10)} − ${fr(1, 2)}`, 1, 5), F(`b) ${fr(8, 11)} + ${fr(8, 33)} × ${fr(3, 4)}`, 10, 11),
        F(`c) ${fr(7, 9)} × ${fr(3, 14)} : ${fr(5, 8)}`, 4, 15), F(`d) ${fr(5, 12)} − ${fr(7, 32)} : ${fr(21, 16)}`, 1, 4),
      ],
      hints: ['Nhân, chia trước; cộng, trừ sau. Rút gọn kết quả nếu được.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tìm x:',
      blanks: [
        { label: `a) x − ${fr(3, 4)} = ${fr(1, 2)} → x = {/}`, answer: '5,4', validate: fracValidate(5, 4) },
        { label: `b) x : ${fr(1, 4)} = 8 → x = ...`, answer: '2' },
      ],
      hints: ['Số bị trừ = hiệu + số trừ; số bị chia = thương × số chia.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '4. Tìm ba số tự nhiên liên tiếp biết tổng của ba số đó là 84.',
      blanks: [{ label: 'Ba số đó là: ... ; ... ; ...', answer: '27,28,29' }],
      hints: ['Số ở giữa là trung bình cộng của ba số: 84 : 3.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `5. Bố hơn con 30 tuổi. Tuổi con bằng ${fr(1, 6)} tuổi bố. Tính tuổi của mỗi người.`,
      blanks: [
        { label: 'Tuổi con: ... tuổi', answer: '6' },
        { label: 'Tuổi bố: ... tuổi', answer: '36' },
      ],
      hints: ['Tuổi con 1 phần, tuổi bố 6 phần: hiệu số phần là 5.'],
    },
  ],

  // ── Bài 173. Luyện tập chung (trang 177) ──────────────────────────────────────────────────────
  'bai-173': [
    {
      type: 'fill', stars: 3,
      q: '1. a) Đọc các số: 975 368 ; 6 020 975 ; 94 351 708 ; 80 060 090.\nb) Trong mỗi số trên, chữ số 9 ở hàng nào và có giá trị là bao nhiêu?',
      blanks: [
        readBlank('a) 975 368: ...', 975368), readBlank('6 020 975: ...', 6020975),
        readBlank('94 351 708: ...', 94351708), readBlank('80 060 090: ...', 80060090),
        { ...hangGiaTri(975368, 'trăm nghìn', 900000), label: 'b) 975 368: chữ số 9 ở hàng ..., có giá trị là ...' },
        hangGiaTri(6020975, 'trăm', 900), hangGiaTri(94351708, 'chục triệu', 90000000), hangGiaTri(80060090, 'chục', 90),
      ],
      hints: ['Tách số thành các lớp ba chữ số từ phải sang trái: lớp đơn vị, lớp nghìn, lớp triệu.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Đặt tính rồi tính:',
      blanks: [
        calc('a) 24579 + 43867', 68446), calc('82604 − 35246', 47358),
        calc('b) 235 × 325', 76375), divCalc(101598, 287),
      ],
      hints: ['Bấm ✍️ Tính để đặt tính rồi ghi kết quả vào ô.'],
    },
    {
      type: 'compare', stars: 3,
      q: '3. >, <, = ?',
      rows: [
        cmp(fr(5, 7), fr(7, 9), 45, 49), cmp(fr(7, 8), fr(5, 6), 21, 20),
        cmp(fr(10, 15), fr(16, 24), 2, 2), cmp(fr(19, 43), fr(19, 34), 34, 43),
      ],
      hints: ['Quy đồng mẫu số rồi so sánh tử số. Rút gọn trước nếu được. Cùng tử số: mẫu số bé hơn thì phân số lớn hơn.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Một thửa ruộng hình chữ nhật có chiều dài 120m, chiều rộng bằng ${fr(2, 3)} chiều dài. Người ta cấy lúa ở đó, tính ra cứ 100m² thu hoạch được 50kg thóc. Hỏi đã thu hoạch được ở thửa ruộng đó bao nhiêu tạ thóc?`,
      blanks: [
        { label: 'Chiều rộng thửa ruộng: ... m', answer: '80' },
        { label: 'Diện tích thửa ruộng: ... m²', answer: '9600' },
        { label: 'Số thóc thu hoạch được: ... kg', answer: '4800' },
        { label: 'tức là ... tạ thóc', answer: '48' },
      ],
      hints: ['Chiều rộng = 120 × 2/3. Diện tích có bao nhiêu lần 100m² thì thóc có bấy nhiêu lần 50kg.'],
    },
    {
      type: 'fill', stars: 5,
      q: '5. Thay chữ a, b bằng chữ số thích hợp:\na) ab0 − ab = 207   b) ab0 + ab = 748',
      blanks: [
        { label: 'a) a = ... ; b = ...', boxes: true, answer: '2,3' },
        { label: 'b) a = ... ; b = ...', boxes: true, answer: '6,8' },
      ],
      hints: ['Đặt tính theo cột: hàng đơn vị 0 − b phải mượn, được 7, vậy b = 3.', 'b) Hàng đơn vị: 0 + b = 8, vậy b = 8; rồi tính tiếp hàng chục.'],
    },
  ],

  // ── Bài 174. Luyện tập chung (trang 178) ──────────────────────────────────────────────────────
  'bai-174': [
    {
      type: 'fill', stars: 2,
      q: '1. Viết các số:',
      blanks: [
        { label: 'a) Ba trăm sáu mươi lăm nghìn tám trăm bốn mươi bảy: ...', answer: '365847' },
        { label: 'b) Mười sáu triệu năm trăm ba mươi nghìn bốn trăm sáu mươi tư: ...', answer: '16530464' },
        { label: 'c) Một trăm linh năm triệu không trăm bảy mươi hai nghìn không trăm linh chín: ...', answer: '105072009' },
      ],
      hints: ['Viết từng lớp: lớp triệu, lớp nghìn, lớp đơn vị; mỗi lớp (trừ lớp đầu) đủ ba chữ số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 2 yến = ... kg', answer: '20' }, { label: '2 yến 6kg = ... kg', answer: '26' }, { label: '40kg = ... yến', answer: '4' },
        { label: 'b) 5 tạ = ... kg', answer: '500' }, { label: '5 tạ 75kg = ... kg', answer: '575' }, { label: '800kg = ... tạ', answer: '8' },
        { label: '5 tạ = ... yến', answer: '50' }, { label: '9 tạ 9kg = ... kg', answer: '909' }, { label: `${fr(2, 5)} tạ = ... kg`, answer: '40' },
        { label: 'c) 1 tấn = ... kg', answer: '1000' }, { label: '4 tấn = ... kg', answer: '4000' }, { label: '2 tấn 800kg = ... kg', answer: '2800' },
        { label: '1 tấn = ... tạ', answer: '10' }, { label: '7000kg = ... tấn', answer: '7' }, { label: '12 000kg = ... tấn', answer: '12' },
        { label: '3 tấn 90kg = ... kg', answer: '3090' }, { label: `${fr(3, 4)} tấn = ... kg`, answer: '750' }, { label: '6000kg = ... tạ', answer: '60' },
      ],
      hints: ['1 yến = 10kg, 1 tạ = 100kg, 1 tấn = 1000kg.', '2/5 tạ: chia 100kg thành 5 phần, lấy 2 phần.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [
        F(`a) ${fr(2, 5)} + ${fr(1, 2)} + ${fr(7, 10)}`, 8, 5), F(`b) ${fr(4, 9)} + ${fr(11, 8)} − ${fr(5, 6)}`, 71, 72),
        F(`c) ${fr(9, 20)} − ${fr(8, 15)} × ${fr(5, 12)}`, 41, 180), F(`d) ${fr(2, 3)} : ${fr(4, 5)} : ${fr(7, 12)}`, 10, 7),
      ],
      hints: ['Quy đồng mẫu số khi cộng, trừ. Nhân, chia trước; chia cho một phân số là nhân với phân số đảo ngược.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Một lớp học có 35 học sinh, trong đó số học sinh trai bằng ${fr(3, 4)} số học sinh gái. Hỏi lớp học đó có bao nhiêu học sinh gái?`,
      blanks: [{ label: 'Lớp học có ... học sinh gái.', answer: '20' }],
      hints: ['Trai 3 phần, gái 4 phần: tổng số phần là 7.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. a) Hình vuông và hình chữ nhật cùng có những đặc điểm gì?\nb) Hình chữ nhật và hình bình hành cùng có những đặc điểm gì?\nĐúng ghi Đ, sai ghi S:',
      blanks: [
        { label: 'a) Hình vuông và hình chữ nhật đều có bốn góc vuông. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Hình vuông và hình chữ nhật đều có các cặp cạnh đối diện song song và bằng nhau. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Hình vuông và hình chữ nhật đều có bốn cạnh bằng nhau. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) Hình chữ nhật và hình bình hành đều có hai cặp cạnh đối diện song song và bằng nhau. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Hình chữ nhật và hình bình hành đều có bốn góc vuông. ...', answer: 'S', validate: dsValidate(false) },
      ],
      hints: ['Hình chữ nhật có bốn góc vuông, hai cặp cạnh đối diện song song và bằng nhau. Hình bình hành không nhất thiết có góc vuông.'],
    },
  ],

  // ── Bài 175. Luyện tập chung (trang 179–180) ──────────────────────────────────────────────────
  'bai-175': [
    {
      type: 'fill', stars: 3, img: imgLtc,
      q: '1. Mỗi bài tập dưới đây có nêu kèm theo một số câu trả lời A, B, C, D (là đáp số, kết quả tính, …). Hãy khoanh vào chữ đặt trước câu trả lời đúng:',
      blanks: [
        pick('a) Giá trị của chữ số 3 trong số 683 941 là:<br>A. 3 ; B. 300 ; C. 3000 ; D. 30 000', 'C'),
        pick('b) Trong phép nhân (hình b), số thích hợp để viết vào chỗ chấm là:<br>A. 7028 ; B. 7038 ; C. 6928 ; D. 6938', 'B'),
        pick(`c) Phân số nào chỉ phần đã tô màu của hình c?<br>A. ${fr(4, 5)} ; B. ${fr(5, 9)} ; C. ${fr(5, 4)} ; D. ${fr(4, 9)}`, 'D'),
        pick(`d) Số thích hợp để viết vào ô trống của ${fr('□', 9)} = ${fr(4, 36)} là:<br>A. 1 ; B. 4 ; C. 9 ; D. 36`, 'A'),
        pick('e) Nếu một quả táo cân nặng 50g thì cần có bao nhiêu quả táo như thế để cân được 4kg?<br>A. 80 ; B. 50 ; C. 40 ; D. 20', 'A'),
      ],
      hints: ['b) Chỗ chấm là tích riêng thứ hai: 2346 × 3.', 'e) Đổi 4kg = 4000g rồi chia cho 50g.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [F(`a) 2 − ${fr(1, 4)}`, 7, 4), F(`b) ${fr(5, 8)} + ${fr(3, 8)} × ${fr(4, 9)}`, 19, 24)],
      hints: ['a) Viết 2 thành phân số có mẫu số 4. b) Nhân trước, cộng sau.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Viết số thích hợp vào chỗ chấm:\na) Tượng đài Vua Lý Thái Tổ ở Hà Nội cao 1010cm, hay ...m ...cm.\nb) Năm 2010 cả nước ta kỉ niệm "Một nghìn năm Thăng Long - Hà Nội". Như vậy, Thủ đô Hà Nội được thành lập năm ... thuộc thế kỉ ... .',
      blanks: [
        { label: 'a) 1010cm = ... m ... cm', answer: '10,10' },
        {
          label: 'b) Hà Nội được thành lập năm ... thuộc thế kỉ ...', answer: '1010,XI',
          validate: (v) => { const [y, c] = String(v).split(','); return noSp(y) === '1010' && ['XI', '11'].includes(noSp(c ?? '').toUpperCase()); },
        },
      ],
      hints: ['a) 100cm = 1m. b) Lấy 2010 trừ 1000. Thế kỉ XI từ năm 1001 đến năm 1100.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `4. Một mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 24m và chiều rộng bằng ${fr(2, 5)} chiều dài.\na) Tính chiều dài, chiều rộng của mảnh vườn;\nb) Tính diện tích của mảnh vườn.`,
      blanks: [
        { label: 'a) Chiều dài: ... m', answer: '40' },
        { label: 'Chiều rộng: ... m', answer: '16' },
        { label: 'b) Diện tích mảnh vườn: ... m²', answer: '640' },
      ],
      hints: ['Chiều rộng 2 phần, chiều dài 5 phần: hiệu số phần là 3, ứng với 24m.'],
    },
  ],
};
