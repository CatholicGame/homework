/**
 * SGK Toán 4: bài 29–48, Phép cộng, phép trừ, biểu thức có chứa hai chữ, ba chữ, tìm hai số khi biết tổng và hiệu,
 * góc, hai đường thẳng vuông góc, song song, vẽ hình chữ nhật, hình vuông (sách trang 38–56).
 * Hình vẽ lại: scripts/redraw/g4t_bai029_048.py (bộ vẽ kit_g4t.py).
 * Bài vẽ hình (dùng ê ke, thước) chuyển thành điều có thể chấm: tên cặp cạnh, tên hình, chu vi, Có/Không.
 */
import { blank, listValidate, textValidate, dsValidate, calc, nham } from './kit.js';
import imgQuangDuong from '../../assets/grade4-textbook/bai30_q3_quangduong.svg';
import imgTamGiacAbc from '../../assets/grade4-textbook/bai34_q4_tamgiac.svg';
import imgHcnAb from '../../assets/grade4-textbook/bai36_q5_hcn.svg';
import imgGoc from '../../assets/grade4-textbook/bai40_q1_goc.svg';
import imgBaTamGiac from '../../assets/grade4-textbook/bai40_q2_tamgiac.svg';
import imgVuongGoc from '../../assets/grade4-textbook/bai41_q1_vuonggoc.svg';
import imgHcn41 from '../../assets/grade4-textbook/bai41_q2_hcn.svg';
import imgVuongGoc3 from '../../assets/grade4-textbook/bai41_q3_vuonggoc.svg';
import imgTuGiac41 from '../../assets/grade4-textbook/bai41_q4_tugiac.svg';
import imgSongSong from '../../assets/grade4-textbook/bai42_q1_songsong.svg';
import imgSongSong2 from '../../assets/grade4-textbook/bai42_q2_songsong.svg';
import imgLuoi from '../../assets/grade4-textbook/bai42_q3_luoi.svg';
import imgHcn43 from '../../assets/grade4-textbook/bai43_q3_hcn.svg';
import imgSongSong44 from '../../assets/grade4-textbook/bai44_q2_songsong.svg';
import imgTuGiac44 from '../../assets/grade4-textbook/bai44_q3_tugiac.svg';
import imgDuongCheo from '../../assets/grade4-textbook/bai45_q2_duongcheo.svg';
import imgGoc47 from '../../assets/grade4-textbook/bai47_q1_goc.svg';
import imgDuongCao from '../../assets/grade4-textbook/bai47_q2_duongcao.svg';
import imgHcn47 from '../../assets/grade4-textbook/bai47_q4_hcn.svg';
import imgHinhVuong48 from '../../assets/grade4-textbook/bai48_q3_hinhvuong.svg';

const cmp = (l, r, a, b) => ({ left: l, right: r, answer: a > b ? '>' : a < b ? '<' : '=' });

// ── Tên đoạn thẳng, cặp cạnh, tên hình: không phụ thuộc thứ tự (AB = BA, "AB và BC" = "BC và AB") ──
const letters = (s) => String(s).trim().toUpperCase();
const segKey = (s) => [...letters(s)].sort().join('');
const isName = (s, n) => new RegExp(`^[A-Z]{${n}}$`).test(letters(s));
const sameSet = (got, want) => got.length === want.length && new Set(got).size === got.length
  && [...got].sort().join('|') === [...want].sort().join('|');

/** Các cặp cạnh (ô "... và ... ; ... và ..."): pairs = [['AB', 'BC'], …], cặp nào trước cũng được. */
function pairsValidate(pairs) {
  const key = ([a, b]) => [segKey(a), segKey(b)].sort().join('-');
  const want = pairs.map(key);
  return (v) => {
    const parts = String(v).split(',').map(s => s.trim());
    if (parts.length !== pairs.length * 2 || !parts.every(s => isName(s, 2))) return false;
    const got = [];
    for (let i = 0; i < parts.length; i += 2) got.push(key([parts[i], parts[i + 1]]));
    return sameSet(got, want);
  };
}
const pairs = (label, list) => ({ label, answer: list.flat().join(','), validate: pairsValidate(list) });

/** Một nhóm tên (đoạn thẳng, tam giác, hình chữ nhật), n chữ mỗi tên, thứ tự tùy ý. */
function namesValidate(names) {
  const n = names[0].length;
  const want = names.map(segKey);
  // Tên hình 4 đỉnh phải đọc theo vòng quanh hình (ABCD, BCDA, DCBA… đều được; ACBD thì không).
  const cyc = (w) => { const r = [...w].reverse().join(''); return [...w].flatMap((_, i) => [w.slice(i) + w.slice(0, i), r.slice(i) + r.slice(0, i)]); };
  const okOrder = (s) => n < 4 || names.some(w => cyc(letters(w)).includes(letters(s)));
  return (v) => {
    const parts = String(v).split(',').map(s => s.trim());
    return parts.every(s => isName(s, n) && okOrder(s)) && sameSet(parts.map(segKey), want);
  };
}
const names = (label, list) => ({ label, answer: list.join(','), validate: namesValidate(list) });

// Chọn bằng thẻ: loại góc, Có/Không.
const GOC = ['vuông', 'nhọn', 'tù', 'bẹt'];
const goc = (label, kind) => ({ label: `${label} là góc ...`, answer: kind, tiles: GOC, tileOne: true, validate: textValidate(kind) });
const coKhong = (label, yes) => {
  const a = yes ? 'Có' : 'Không';
  return { label: `${label} ...`, answer: a, tiles: ['Có', 'Không'], tileOne: true, validate: textValidate(a) };
};

/** "P = a + b + c": các chữ a, b, c theo thứ tự nào cũng được, có hay không viết "P =". */
const formulaValidate = (want) => (v) => {
  const s = String(v).toLowerCase().replace(/\s+/g, '').replace(/^p=/, '');
  return /^[a-z](\+[a-z])*$/.test(s) && s.split('+').sort().join('+') === want;
};

export const QUESTIONS = {
  // ── Bài 29. Phép cộng (trang 38–39) ──────────────────────────────────────────────────────────────
  'bai-29': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        calc('a) 4682 + 2305', 6987), calc('5247 + 2741', 7988),
        calc('b) 2968 + 6524', 9492), calc('3917 + 5267', 9184),
      ],
      hints: ['Viết số hạng này dưới số hạng kia, các chữ số cùng hàng thẳng cột. Cộng theo thứ tự từ phải sang trái.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        calc('a) 4685 + 2347', 7032), calc('6094 + 8566', 14660), calc('57696 + 814', 58510),
        calc('b) 186954 + 247436', 434390), calc('514625 + 82398', 597023), calc('793575 + 6425', 800000),
      ],
      hints: ['Cộng từ hàng đơn vị; hàng nào được từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ 1 sang hàng bên trái.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một huyện trồng 325 164 cây lấy gỗ và 60 830 cây ăn quả. Hỏi huyện đó trồng được tất cả bao nhiêu cây?',
      blanks: [{ label: 'Huyện đó trồng được tất cả ... cây.', answer: '385994' }],
      hints: ['Tất cả = số cây lấy gỗ + số cây ăn quả.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '4. Tìm x:',
      blanks: [
        { label: 'a) x − 363 = 975 → x = ...', answer: '1338' },
        { label: 'b) 207 + x = 815 → x = ...', answer: '608' },
      ],
      hints: ['Số bị trừ = hiệu + số trừ.', 'Số hạng chưa biết = tổng − số hạng đã biết.'],
    },
  ],

  // ── Bài 30. Phép trừ (trang 39–40) ───────────────────────────────────────────────────────────────
  'bai-30': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        calc('a) 987864 − 783251', 204613), calc('969696 − 656565', 313131),
        calc('b) 839084 − 246937', 592147), calc('628450 − 35813', 592637),
      ],
      hints: ['Viết số trừ dưới số bị trừ, thẳng cột. Trừ từ phải sang trái; chữ số trên bé hơn thì mượn 1 chục, rồi nhớ 1 vào hàng bên trái của số trừ.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        calc('a) 48600 − 9455', 39145), calc('65102 − 13859', 51243),
        calc('b) 80000 − 48765', 31235), calc('941302 − 298764', 642538),
      ],
      hints: ['Trừ theo thứ tự từ phải sang trái, nhớ đúng sang hàng bên trái.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true, img: imgQuangDuong,
      q: '3. Quãng đường xe lửa từ Hà Nội đến Thành phố Hồ Chí Minh dài 1730km. Quãng đường xe lửa từ Hà Nội đến Nha Trang dài 1315km. Tính quãng đường xe lửa từ Nha Trang đến Thành phố Hồ Chí Minh.',
      blanks: [{ label: 'Quãng đường từ Nha Trang đến Thành phố Hồ Chí Minh dài ... km', answer: '415' }],
      hints: ['Nhìn sơ đồ: cả quãng đường bớt đi đoạn Hà Nội đến Nha Trang.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Năm nay học sinh của một tỉnh miền núi trồng được 214 800 cây, năm ngoái trồng được ít hơn năm nay 80 600 cây. Hỏi cả hai năm học sinh của tỉnh đó trồng được bao nhiêu cây?',
      blanks: [
        { label: 'Năm ngoái trồng được ... cây.', answer: '134200' },
        { label: 'Cả hai năm trồng được ... cây.', answer: '349000' },
      ],
      hints: ['Tìm số cây năm ngoái trước: lấy số cây năm nay trừ đi 80 600.', 'Rồi cộng số cây của hai năm.'],
    },
  ],

  // ── Bài 31. Luyện tập (trang 40–41) ──────────────────────────────────────────────────────────────
  'bai-31': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Thử lại phép cộng.\na) Mẫu: 2416 + 5164 = 7580. Thử lại: 7580 − 2416 = 5164.\nMuốn thử lại phép cộng ta có thể lấy tổng trừ đi một số hạng, nếu được kết quả là số hạng còn lại thì phép tính làm đúng.\nb) Tính rồi thử lại (theo mẫu):',
      blanks: [
        calc('35462 + 27519', 62981), { label: 'Thử lại: ... − 35462 = ...', answer: '62981,27519', validate: listValidate(['62981', '27519']) },
        calc('69108 + 2074', 71182), { label: 'Thử lại: ... − 69108 = ...', answer: '71182,2074', validate: listValidate(['71182', '2074']) },
        calc('267345 + 31925', 299270), { label: 'Thử lại: ... − 267345 = ...', answer: '299270,31925', validate: listValidate(['299270', '31925']) },
      ],
      hints: ['Tính tổng trước. Thử lại: lấy tổng vừa tìm trừ số hạng thứ nhất, phải được số hạng thứ hai.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Thử lại phép trừ.\na) Mẫu: 6839 − 482 = 6357. Thử lại: 6357 + 482 = 6839.\nMuốn thử lại phép trừ ta có thể lấy hiệu cộng với số trừ, nếu được kết quả là số bị trừ thì phép tính làm đúng.\nb) Tính rồi thử lại (theo mẫu):',
      blanks: [
        calc('4025 − 312', 3713), { label: 'Thử lại: ... + 312 = ...', answer: '3713,4025', validate: listValidate(['3713', '4025']) },
        calc('5901 − 638', 5263), { label: 'Thử lại: ... + 638 = ...', answer: '5263,5901', validate: listValidate(['5263', '5901']) },
        calc('7521 − 98', 7423), { label: 'Thử lại: ... + 98 = ...', answer: '7423,7521', validate: listValidate(['7423', '7521']) },
      ],
      hints: ['Tính hiệu trước. Thử lại: lấy hiệu cộng số trừ, phải được số bị trừ.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tìm x:',
      blanks: [
        { label: 'a) x + 262 = 4848 → x = ...', answer: '4586' },
        { label: 'b) x − 707 = 3535 → x = ...', answer: '4242' },
      ],
      hints: ['Số hạng chưa biết = tổng − số hạng đã biết.', 'Số bị trừ = hiệu + số trừ.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '4. Núi Phan-xi-păng (ở tỉnh Lào Cai) cao 3143m. Núi Tây Côn Lĩnh (ở tỉnh Hà Giang) cao 2428m. Hỏi núi nào cao hơn và cao hơn bao nhiêu mét?',
      blanks: [
        { label: 'Núi ... cao hơn.', answer: 'Phan-xi-păng', tiles: ['Phan-xi-păng', 'Tây Côn Lĩnh'], tileOne: true, validate: textValidate('Phan-xi-păng') },
        { label: 'Cao hơn ... m', answer: '715' },
      ],
      hints: ['So sánh 3143 và 2428. Muốn biết cao hơn bao nhiêu, lấy số lớn trừ số bé.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Tính nhẩm hiệu của số lớn nhất có năm chữ số và số bé nhất có năm chữ số.',
      blanks: [
        { label: 'Số lớn nhất có năm chữ số: ...', answer: '99999' },
        { label: 'Số bé nhất có năm chữ số: ...', answer: '10000' },
        { label: 'Hiệu: ...', answer: '89999' },
      ],
      hints: ['Số lớn nhất có năm chữ số gồm năm chữ số 9; số bé nhất có năm chữ số là 1 và bốn chữ số 0.'],
    },
  ],

  // ── Bài 32. Biểu thức có chứa hai chữ (trang 41–42) ──────────────────────────────────────────────
  'bai-32': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính giá trị của c + d nếu:',
      blanks: [
        { label: 'a) c = 10 và d = 25 thì c + d = ...', answer: '35' },
        { label: 'b) c = 15cm và d = 45cm thì c + d = ... cm', answer: '60' },
      ],
      hints: ['Thay chữ bằng số rồi tính: c + d = 10 + 25.'],
    },
    {
      type: 'fill', stars: 1,
      q: '2. a − b là biểu thức có chứa hai chữ. Tính giá trị của a − b nếu:',
      blanks: [
        { label: 'a) a = 32 và b = 20 thì a − b = ...', answer: '12' },
        { label: 'b) a = 45 và b = 36 thì a − b = ...', answer: '9' },
        { label: 'c) a = 18m và b = 10m thì a − b = ... m', answer: '8' },
      ],
      hints: ['Thay a, b bằng số rồi tính hiệu.'],
    },
    {
      type: 'table', stars: 2,
      q: '3. a × b và a : b là các biểu thức có chứa hai chữ.\nViết giá trị của biểu thức vào ô trống (theo mẫu):',
      rows: [
        ['a', '12', '28', '60', '70'],
        ['b', '3', '4', '6', '10'],
        ['a × b', '36', blank(112), blank(360), blank(700)],
        ['a : b', '4', blank(7), blank(10), blank(7)],
      ],
      hints: ['Mỗi cột: thay a, b của cột đó vào biểu thức. Cột đầu là mẫu: 12 × 3 = 36, 12 : 3 = 4.'],
    },
    {
      type: 'table', stars: 3,
      q: '4. Viết giá trị của biểu thức vào ô trống:',
      rows: [
        ['a', '300', '3200', '24 687', '54 036'],
        ['b', '500', '1800', '63 805', '31 894'],
        ['a + b', blank(800), blank(5000), blank(88492), blank(85930)],
        ['b + a', blank(800), blank(5000), blank(88492), blank(85930)],
      ],
      calcs: ['24687 + 63805', '54036 + 31894'],
      hints: ['Tính a + b ở mỗi cột. So sánh hàng a + b với hàng b + a, em thấy điều gì?'],
    },
  ],

  // ── Bài 33. Tính chất giao hoán của phép cộng (trang 42–43) ──────────────────────────────────────
  'bai-33': [
    {
      type: 'fill', stars: 1,
      q: '1. Nêu kết quả tính:',
      blanks: [
        { label: 'a) 468 + 379 = 847 nên 379 + 468 = ...', answer: '847' },
        { label: 'b) 6509 + 2876 = 9385 nên 2876 + 6509 = ...', answer: '9385' },
        { label: 'c) 4268 + 76 = 4344 nên 76 + 4268 = ...', answer: '4344' },
      ],
      hints: ['Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số hoặc chữ thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 48 + 12 = 12 + ...', answer: '48' },
        { label: '65 + 297 = ... + 65', answer: '297' },
        { label: '... + 89 = 89 + 177', answer: '177' },
        { label: 'b) m + n = n + ...', answer: 'm', validate: textValidate('m') },
        { label: '84 + 0 = ... + 84', answer: '0' },
        { label: 'a + 0 = ... + a = ...', answer: '0,a', validate: listValidate(['0', 'a']) },
      ],
      hints: ['a + b = b + a: đổi chỗ hai số hạng, tổng vẫn thế.', 'Số nào cộng với 0 cũng bằng chính số đó.'],
    },
    {
      type: 'compare', stars: 2,
      q: '3. >, <, = ?',
      rows: [
        cmp('2975 + 4017', '4017 + 2975', 6992, 6992),
        cmp('2975 + 4017', '4017 + 3000', 6992, 7017),
        cmp('2975 + 4017', '4017 + 2900', 6992, 6917),
        cmp('8264 + 927', '927 + 8300', 9191, 9227),
        cmp('8264 + 927', '900 + 8264', 9191, 9164),
        cmp('927 + 8264', '8264 + 927', 9191, 9191),
      ],
      hints: ['Không cần tính hết: hai tổng có chung một số hạng thì so sánh số hạng còn lại.'],
    },
  ],

  // ── Bài 34. Biểu thức có chứa ba chữ (trang 43–44) ───────────────────────────────────────────────
  'bai-34': [
    {
      type: 'fill', stars: 1,
      q: '1. Tính giá trị của a + b + c nếu:',
      blanks: [
        { label: 'a) a = 5, b = 7, c = 10 thì a + b + c = ...', answer: '22' },
        { label: 'b) a = 12, b = 15, c = 9 thì a + b + c = ...', answer: '36' },
      ],
      hints: ['Thay chữ bằng số rồi cộng từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a × b × c là biểu thức có chứa ba chữ.\nNếu a = 4, b = 3 và c = 5 thì giá trị của biểu thức a × b × c là: a × b × c = 4 × 3 × 5 = 12 × 5 = 60.\nTính giá trị của a × b × c nếu:',
      blanks: [
        { label: 'a) a = 9, b = 5 và c = 2 thì a × b × c = ...', answer: '90' },
        { label: 'b) a = 15, b = 0 và c = 37 thì a × b × c = ...', answer: '0' },
      ],
      hints: ['Nhân lần lượt từ trái sang phải. Số nào nhân với 0 cũng bằng 0.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Cho biết m = 10, n = 5, p = 2, tính giá trị của biểu thức:',
      blanks: [
        { label: 'a) m + n + p = ...', answer: '17' },
        { label: 'm + (n + p) = ...', answer: '17' },
        { label: 'b) m − n − p = ...', answer: '3' },
        { label: 'm − (n + p) = ...', answer: '3' },
        { label: 'c) m + n × p = ...', answer: '20' },
        { label: '(m + n) × p = ...', answer: '30' },
      ],
      hints: ['Trong ngoặc tính trước; nhân trước, cộng sau.'],
    },
    {
      type: 'fill', stars: 2, img: imgTamGiacAbc,
      q: '4. Độ dài các cạnh của hình tam giác là a, b, c.\na) Gọi P là chu vi của hình tam giác. Viết công thức tính chu vi P của hình tam giác đó.\nb) Tính chu vi của hình tam giác biết:',
      blanks: [
        { label: 'a) P = ...', answer: 'a + b + c', validate: formulaValidate('a+b+c') },
        { label: 'b) a = 5cm, b = 4cm và c = 3cm: P = ... cm', answer: '12' },
        { label: 'a = 10cm, b = 10cm và c = 5cm: P = ... cm', answer: '25' },
        { label: 'a = 6dm, b = 6dm và c = 6dm: P = ... dm', answer: '18' },
      ],
      hints: ['Chu vi hình tam giác bằng tổng độ dài ba cạnh.'],
    },
  ],

  // ── Bài 35. Tính chất kết hợp của phép cộng (trang 45) ───────────────────────────────────────────
  'bai-35': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Tính bằng cách thuận tiện nhất:',
      blanks: [
        { label: 'a) 3254 + 146 + 1698 = ...', answer: '5098' },
        { label: '4367 + 199 + 501 = ...', answer: '5067' },
        { label: '4400 + 2148 + 252 = ...', answer: '6800' },
        { label: 'b) 921 + 898 + 2079 = ...', answer: '3898' },
        { label: '1255 + 436 + 145 = ...', answer: '1836' },
        { label: '467 + 999 + 9533 = ...', answer: '10999' },
      ],
      hints: ['Tìm hai số cộng lại được số tròn trăm, tròn nghìn rồi cộng chúng trước: 3254 + 146 = 3400.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Một quỹ tiết kiệm ngày đầu nhận được 75 500 000 đồng, ngày thứ hai nhận được 86 950 000 đồng, ngày thứ ba nhận được 14 500 000 đồng. Hỏi cả ba ngày quỹ tiết kiệm đó nhận được bao nhiêu tiền?',
      blanks: [{ label: 'Cả ba ngày quỹ nhận được ... đồng.', answer: '176950000' }],
      hints: ['Cộng 75 500 000 với 14 500 000 trước cho tròn, rồi cộng thêm số tiền ngày thứ hai.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết số hoặc chữ thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) a + 0 = ... + a = ...', answer: '0,a', validate: listValidate(['0', 'a']) },
        { label: 'b) 5 + a = ... + 5', answer: 'a', validate: textValidate('a') },
        { label: 'c) (a + 28) + 2 = a + (28 + ...) = a + ...', answer: '2,30', validate: listValidate(['2', '30']) },
      ],
      hints: ['(a + b) + c = a + (b + c): cộng số thứ hai với số thứ ba trước cũng được.'],
    },
  ],

  // ── Bài 36. Luyện tập (trang 46) ─────────────────────────────────────────────────────────────────
  'bai-36': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Đặt tính rồi tính tổng:',
      blanks: [
        { label: 'a) 2814 + 1429 + 3046 = ...', answer: '7289' },
        { label: '3925 + 618 + 535 = ...', answer: '5078' },
        { label: 'b) 26387 + 14075 + 9210 = ...', answer: '49672' },
        { label: '54293 + 61934 + 7652 = ...', answer: '123879' },
      ],
      hints: ['Viết ba số hạng thẳng cột rồi cộng một lần. Với nút ✍️ Đặt tính: cộng hai số đầu trước, rồi cộng tiếp số thứ ba.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính bằng cách thuận tiện nhất:',
      blanks: [
        nham('a) 96 + 78 + 4', 178), nham('67 + 21 + 79', 167), nham('408 + 85 + 92', 585),
        nham('b) 789 + 285 + 15', 1089), nham('448 + 594 + 52', 1094), nham('677 + 969 + 123', 1769),
      ],
      hints: ['Ghép hai số có tổng tròn chục, tròn trăm: 96 + 4 = 100, rồi cộng số còn lại.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tìm x:',
      blanks: [
        { label: 'a) x − 306 = 504 → x = ...', answer: '810' },
        { label: 'b) x + 254 = 680 → x = ...', answer: '426' },
      ],
      hints: ['Số bị trừ = hiệu + số trừ.', 'Số hạng chưa biết = tổng − số hạng đã biết.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '4. Một xã có 5256 người. Sau một năm số dân tăng thêm 79 người. Sau một năm nữa số dân lại tăng thêm 71 người. Hỏi:\na) Sau hai năm số dân của xã đó tăng thêm bao nhiêu người?\nb) Sau hai năm số dân của xã đó có bao nhiêu người?',
      blanks: [
        { label: 'a) Sau hai năm số dân tăng thêm ... người.', answer: '150' },
        { label: 'b) Sau hai năm số dân của xã có ... người.', answer: '5406' },
      ],
      hints: ['a) Cộng số người tăng của hai năm.', 'b) Lấy số dân lúc đầu cộng số người tăng thêm.'],
    },
    {
      type: 'fill', stars: 2, img: imgHcnAb,
      q: '5. Một hình chữ nhật có chiều dài là a, chiều rộng là b. Gọi P là chu vi của hình chữ nhật. Ta có công thức tính chu vi hình chữ nhật là: P = (a + b) × 2 (a, b cùng một đơn vị đo).\nÁp dụng công thức trên để tính chu vi hình chữ nhật, biết:',
      blanks: [
        { label: 'a) a = 16cm, b = 12cm: P = ... cm', answer: '56' },
        { label: 'b) a = 45m, b = 15m: P = ... m', answer: '120' },
      ],
      hints: ['Cộng chiều dài với chiều rộng trước, rồi nhân với 2.'],
    },
  ],

  // ── Bài 37. Tìm hai số khi biết tổng và hiệu của hai số đó (trang 47) ────────────────────────────
  'bai-37': [
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '1. Tuổi bố và tuổi con cộng lại được 58 tuổi. Bố hơn con 38 tuổi. Hỏi bố bao nhiêu tuổi, con bao nhiêu tuổi?',
      blanks: [
        { label: 'Tuổi con là: ... tuổi', answer: '10' },
        { label: 'Tuổi bố là: ... tuổi', answer: '48' },
      ],
      hints: ['Số bé = (Tổng − Hiệu) : 2.', 'Số lớn = (Tổng + Hiệu) : 2, hoặc lấy số bé cộng hiệu.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '2. Một lớp học có 28 học sinh. Số học sinh trai hơn số học sinh gái là 4 em. Hỏi lớp học đó có bao nhiêu học sinh trai, bao nhiêu học sinh gái?',
      blanks: [
        { label: 'Số học sinh trai là: ... em', answer: '16' },
        { label: 'Số học sinh gái là: ... em', answer: '12' },
      ],
      hints: ['Số học sinh trai là số lớn: (Tổng + Hiệu) : 2.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Cả hai lớp 4A và 4B trồng được 600 cây. Lớp 4A trồng được ít hơn lớp 4B là 50 cây. Hỏi mỗi lớp trồng được bao nhiêu cây?',
      blanks: [
        { label: 'Lớp 4A trồng được: ... cây', answer: '275' },
        { label: 'Lớp 4B trồng được: ... cây', answer: '325' },
      ],
      hints: ['Lớp 4A trồng ít hơn nên là số bé: (600 − 50) : 2.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Tính nhẩm: Tổng của hai số bằng 8, hiệu của chúng cũng bằng 8. Tìm hai số đó.',
      blanks: [
        { label: 'Số lớn là: ...', answer: '8' },
        { label: 'Số bé là: ...', answer: '0' },
      ],
      hints: ['Số bé = (8 − 8) : 2.'],
    },
  ],

  // ── Bài 38. Luyện tập (trang 48) ─────────────────────────────────────────────────────────────────
  'bai-38': [
    {
      type: 'fill', stars: 3,
      q: '1. Tìm hai số biết tổng và hiệu của chúng lần lượt là:',
      blanks: [
        { label: 'a) 24 và 6: số lớn ..., số bé ...', answer: '15,9', validate: listValidate(['15', '9']) },
        { label: 'b) 60 và 12: số lớn ..., số bé ...', answer: '36,24', validate: listValidate(['36', '24']) },
        { label: 'c) 325 và 99: số lớn ..., số bé ...', answer: '212,113', validate: listValidate(['212', '113']) },
      ],
      hints: ['Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng − Hiệu) : 2.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '2. Tuổi chị và tuổi em cộng lại được 36 tuổi. Em kém chị 8 tuổi. Hỏi chị bao nhiêu tuổi, em bao nhiêu tuổi?',
      blanks: [
        { label: 'Tuổi chị là: ... tuổi', answer: '22' },
        { label: 'Tuổi em là: ... tuổi', answer: '14' },
      ],
      hints: ['Em kém chị 8 tuổi: hiệu là 8. Tuổi chị là số lớn.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '3. Một thư viện trường học cho học sinh mượn 65 quyển sách gồm hai loại: sách giáo khoa và sách đọc thêm. Số sách giáo khoa nhiều hơn số sách đọc thêm 17 quyển. Hỏi thư viện đã cho học sinh mượn mỗi loại bao nhiêu quyển sách?',
      blanks: [
        { label: 'Sách giáo khoa: ... quyển', answer: '41' },
        { label: 'Sách đọc thêm: ... quyển', answer: '24' },
      ],
      hints: ['Tổng là 65, hiệu là 17. Sách giáo khoa nhiều hơn nên là số lớn.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Hai phân xưởng làm được 1200 sản phẩm. Phân xưởng thứ nhất làm được ít hơn phân xưởng thứ hai 120 sản phẩm. Hỏi mỗi phân xưởng làm được bao nhiêu sản phẩm?',
      blanks: [
        { label: 'Phân xưởng thứ nhất: ... sản phẩm', answer: '540' },
        { label: 'Phân xưởng thứ hai: ... sản phẩm', answer: '660' },
      ],
      hints: ['Phân xưởng thứ nhất làm ít hơn nên là số bé: (1200 − 120) : 2.'],
    },
    {
      type: 'fill', stars: 5, wordProblem: true, calcFree: true,
      q: '5. Thu hoạch từ hai thửa ruộng được 5 tấn 2 tạ thóc. Thu hoạch ở thửa ruộng thứ nhất được nhiều hơn ở thửa ruộng thứ hai 8 tạ thóc. Hỏi thu hoạch ở mỗi thửa ruộng được bao nhiêu ki-lô-gam thóc?',
      blanks: [
        { label: '5 tấn 2 tạ = ... kg; 8 tạ = ... kg', answer: '5200,800', validate: listValidate(['5200', '800']) },
        { label: 'Thửa ruộng thứ nhất: ... kg thóc', answer: '3000' },
        { label: 'Thửa ruộng thứ hai: ... kg thóc', answer: '2200' },
      ],
      hints: ['Đổi ra ki-lô-gam trước: 1 tấn = 1000kg, 1 tạ = 100kg.', 'Thửa thứ nhất nhiều hơn nên là số lớn: (Tổng + Hiệu) : 2.'],
    },
  ],

  // ── Bài 39. Luyện tập chung (trang 48) ───────────────────────────────────────────────────────────
  'bai-39': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Tính rồi thử lại:',
      blanks: [
        calc('a) 35269 + 27485', 62754), { label: 'Thử lại: ... − 35269 = ...', answer: '62754,27485', validate: listValidate(['62754', '27485']) },
        calc('80326 − 45719', 34607), { label: 'Thử lại: ... + 45719 = ...', answer: '34607,80326', validate: listValidate(['34607', '80326']) },
        calc('b) 48796 + 63584', 112380), { label: 'Thử lại: ... − 48796 = ...', answer: '112380,63584', validate: listValidate(['112380', '63584']) },
        calc('10000 − 8989', 1011), { label: 'Thử lại: ... + 8989 = ...', answer: '1011,10000', validate: listValidate(['1011', '10000']) },
      ],
      hints: ['Thử lại phép cộng: tổng trừ một số hạng được số hạng kia. Thử lại phép trừ: hiệu cộng số trừ được số bị trừ.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính giá trị của biểu thức:',
      blanks: [
        { label: 'a) 570 − 225 − 167 + 67 = ...', answer: '245' },
        { label: '168 × 2 : 6 × 4 = ...', answer: '224' },
        { label: 'b) 468 : 6 + 61 × 2 = ...', answer: '200' },
        { label: '5625 − 5000 : (726 : 6 − 113) = ...', answer: '5000' },
      ],
      hints: ['Chỉ có cộng, trừ (hoặc chỉ có nhân, chia): tính từ trái sang phải.', 'Có ngoặc: tính trong ngoặc trước; nhân, chia trước rồi cộng, trừ sau.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Tính bằng cách thuận tiện nhất:',
      blanks: [
        nham('a) 98 + 3 + 97 + 2', 200), nham('56 + 399 + 1 + 4', 460),
        nham('b) 364 + 136 + 219 + 181', 900), nham('178 + 277 + 123 + 422', 1000),
      ],
      hints: ['Ghép từng cặp số có tổng tròn: 98 + 2 = 100, 3 + 97 = 100.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '4. Hai thùng chứa được tất cả là 600l nước. Thùng bé chứa được ít hơn thùng to 120l nước. Hỏi mỗi thùng chứa được bao nhiêu lít nước?',
      blanks: [
        { label: 'Thùng to chứa được: ... l nước', answer: '360' },
        { label: 'Thùng bé chứa được: ... l nước', answer: '240' },
      ],
      hints: ['Thùng to là số lớn: (600 + 120) : 2.'],
    },
    {
      type: 'fill', stars: 1,
      q: '5. Tìm x:',
      blanks: [
        { label: 'a) x × 2 = 10 → x = ...', answer: '5' },
        { label: 'b) x : 6 = 5 → x = ...', answer: '30' },
      ],
      hints: ['Thừa số chưa biết = tích : thừa số đã biết. Số bị chia = thương × số chia.'],
    },
  ],

  // ── Bài 40. Góc nhọn, góc tù, góc bẹt (trang 49) ─────────────────────────────────────────────────
  'bai-40': [
    {
      type: 'fill', stars: 2, img: imgGoc,
      q: '1. Trong các góc sau đây, góc nào là: góc vuông, góc nhọn, góc tù, góc bẹt?',
      blanks: [
        goc('Góc đỉnh A; cạnh AM, AN', 'nhọn'),
        goc('Góc đỉnh B; cạnh BP, BQ', 'tù'),
        goc('Góc đỉnh C; cạnh CI, CK', 'vuông'),
        goc('Góc đỉnh E; cạnh EX, EY', 'bẹt'),
        goc('Góc đỉnh D; cạnh DV, DU', 'nhọn'),
        goc('Góc đỉnh O; cạnh OG, OH', 'tù'),
      ],
      hints: ['Góc nhọn bé hơn góc vuông, góc tù lớn hơn góc vuông, góc bẹt bằng hai góc vuông (hai cạnh nằm trên một đường thẳng).'],
    },
    {
      type: 'fill', stars: 2, img: imgBaTamGiac,
      q: '2. Trong các hình tam giác sau:\n– Hình tam giác nào có ba góc nhọn?\n– Hình tam giác nào có góc vuông?\n– Hình tam giác nào có góc tù?',
      blanks: [
        names('Hình tam giác có ba góc nhọn: ...', ['ABC']),
        names('Hình tam giác có góc vuông: ...', ['DEG']),
        names('Hình tam giác có góc tù: ...', ['MNP']),
      ],
      hints: ['Xem góc lớn nhất của mỗi hình: bằng góc vuông, lớn hơn hay bé hơn góc vuông.'],
    },
  ],

  // ── Bài 41. Hai đường thẳng vuông góc (trang 50) ─────────────────────────────────────────────────
  'bai-41': [
    {
      type: 'fill', stars: 1, img: imgVuongGoc,
      q: '1. Dùng ê ke để kiểm tra hai đường thẳng có vuông góc với nhau hay không.',
      blanks: [
        coKhong('a) Hai đường thẳng HI và IK có vuông góc với nhau không?', true),
        coKhong('b) Hai đường thẳng PM và MQ có vuông góc với nhau không?', false),
      ],
      hints: ['Hai đường thẳng vuông góc tạo thành bốn góc vuông. Đặt góc vuông của ê ke vào chỗ hai đường cắt nhau.'],
      // 📐 Kéo dài: toạ độ theo bai41_q1_vuonggoc.svg.
      geoPlay: { points: { H: [140, 20], I: [140, 120], K: [270, 120], P: [577.1, 28.1], M: [500, 120], Q: [620, 120] }, segs: ['HI', 'IK', 'PM', 'MQ'], pick: 'HI' },
      ekePlay: { fill: [{ blank: 0, angle: 'IHK' }, { blank: 1, angle: 'MPQ' }] },
    },
    {
      type: 'fill', stars: 2, img: imgHcn41,
      q: '2. Cho hình chữ nhật ABCD, AB và BC là một cặp cạnh vuông góc với nhau. Hãy nêu tên từng cặp cạnh vuông góc với nhau có trong hình chữ nhật đó.',
      blanks: [
        pairs('Ngoài AB và BC, các cặp cạnh vuông góc còn lại: ... và ... ; ... và ... ; ... và ...', [['BC', 'CD'], ['CD', 'DA'], ['DA', 'AB']]),
      ],
      hints: ['Hình chữ nhật có bốn góc vuông; mỗi góc vuông cho một cặp cạnh vuông góc.'],
      // 📐 Kéo dài: toạ độ theo bai41_q2_hcn.svg.
      geoPlay: { points: { A: [40, 40], B: [260, 40], C: [260, 160], D: [40, 160] }, segs: ['AB', 'BC', 'CD', 'DA'], fill: 'ABCD', pick: 'AB' },
      ekePlay: { fill: { blank: 0, list: 'right', as: 'pairs', exclude: ['B'] } },
    },
    {
      type: 'fill', stars: 2, img: imgVuongGoc3,
      q: '3. Dùng ê ke để kiểm tra góc vuông rồi nêu tên từng cặp đoạn thẳng vuông góc với nhau có trong mỗi hình sau:',
      blanks: [
        pairs('a) ... và ... ; ... và ...', [['AE', 'ED'], ['ED', 'DC']]),
        pairs('b) ... và ... ; ... và ...', [['MN', 'NP'], ['NP', 'PQ']]),
      ],
      hints: ['Tìm các góc vuông trước, mỗi góc vuông có hai cạnh là một cặp đoạn thẳng vuông góc.'],
      // 📐 Kéo dài: toạ độ theo bai41_q3_vuonggoc.svg.
      geoPlay: { points: { A: [40, 90], B: [130, 30], C: [220, 90], D: [220, 170], E: [40, 170], M: [310, 170], N: [420, 170], P: [420, 60], Q: [540, 60], R: [610, 170] }, segs: ['AB', 'BC', 'CD', 'DE', 'AE', 'MN', 'NP', 'PQ', 'QR'], fill: 'ABCDE' },
      ekePlay: { fill: [{ blank: 0, list: 'right', as: 'pairs', within: 'ABCDE' }, { blank: 1, list: 'right', as: 'pairs', within: 'MNPQR' }] },
    },
    {
      type: 'fill', stars: 2, img: imgTuGiac41,
      q: '4. Cho hình tứ giác ABCD có góc đỉnh A và góc đỉnh D là các góc vuông.\na) Hãy nêu tên từng cặp cạnh vuông góc với nhau.\nb) Hãy nêu tên từng cặp cạnh cắt nhau mà không vuông góc với nhau.',
      blanks: [
        pairs('a) ... và ... ; ... và ...', [['AB', 'AD'], ['AD', 'DC']]),
        pairs('b) ... và ... ; ... và ...', [['AB', 'BC'], ['BC', 'CD']]),
      ],
      hints: ['a) Hai cạnh của góc vuông đỉnh A, hai cạnh của góc vuông đỉnh D.', 'b) Xem các góc còn lại ở đỉnh B và đỉnh C.'],
      // 📐 Kéo dài: toạ độ theo bai41_q4_tugiac.svg.
      geoPlay: { points: { A: [40, 40], B: [150, 40], C: [260, 220], D: [40, 220] }, segs: ['AB', 'BC', 'CD', 'AD'], fill: 'ABCD', pick: 'AB' },
      ekePlay: { fill: [{ blank: 0, list: 'right', as: 'pairs' }, { blank: 1, list: 'notRight', as: 'pairs' }] },
    },
  ],

  // ── Bài 42. Hai đường thẳng song song (trang 51) ─────────────────────────────────────────────────
  'bai-42': [
    {
      type: 'fill', stars: 2, img: imgSongSong,
      q: '1. a) Cho hình chữ nhật ABCD, AB và DC là một cặp cạnh song song với nhau. Hãy nêu tên từng cặp cạnh song song với nhau có trong hình chữ nhật đó.\nb) Nêu tên từng cặp cạnh song song với nhau có trong hình vuông MNPQ.',
      blanks: [
        pairs('a) Ngoài AB và DC, cặp cạnh song song còn lại: ... và ...', [['AD', 'BC']]),
        pairs('b) ... và ... ; ... và ...', [['MN', 'QP'], ['MQ', 'NP']]),
      ],
      hints: ['Hai cạnh đối diện của hình chữ nhật, hình vuông thì song song với nhau.'],
      // 📐 Kéo dài: toạ độ theo bai42_q1_songsong.svg.
      geoPlay: { points: { A: [40, 40], B: [300, 40], C: [300, 190], D: [40, 190], M: [400, 40], N: [550, 40], P: [550, 190], Q: [400, 190] }, segs: ['AB', 'BC', 'DC', 'AD', 'MN', 'NP', 'QP', 'MQ'], fill: ['ABCD', 'MNPQ'], pick: 'AB', answer: [{ blank: 0, list: 'par', within: 'ABCD', exclude: [['AB', 'DC']] }, { blank: 1, list: 'par', within: 'MNPQ' }] },
    },
    {
      type: 'fill', stars: 2, img: imgSongSong2,
      q: '2. Trong hình bên, cho biết các hình tứ giác ABEG, ACDG, BCDE đều là hình chữ nhật. Cạnh BE song song với những cạnh nào?',
      blanks: [names('Cạnh BE song song với cạnh ... và cạnh ...', ['AG', 'CD'])],
      hints: ['Trong mỗi hình chữ nhật có cạnh BE, tìm cạnh đối diện với BE.'],
      // 📐 Kéo dài: toạ độ theo bai42_q2_songsong.svg; "Thử thêm": MN, PQ nhìn tưởng song song nhưng gặp nhau ở xa.
      geoPlay: {
        answer: [{ blank: 0, list: 'par', with: 'BE' }],
        points: { A: [40, 40], B: [210, 40], C: [300, 40], D: [300, 190], E: [210, 190], G: [40, 190] },
        segs: ['AB', 'BC', 'CD', 'DE', 'EG', 'AG', 'BE'], fill: 'ACDG', pick: 'BE',
        more: [{ name: 'Thử thêm', points: { M: [40, 60], N: [300, 60], P: [40, 170], Q: [300, 155] }, segs: ['MN', 'PQ'] }],
      },
    },
    {
      type: 'fill', stars: 3, img: imgLuoi,
      q: '3. Trong mỗi hình dưới đây:\na) Nêu tên cặp cạnh song song với nhau;\nb) Nêu tên cặp cạnh vuông góc với nhau.',
      blanks: [
        pairs('Hình MNPQ: a) ... và ...', [['MN', 'QP']]),
        pairs('b) ... và ... ; ... và ...', [['MQ', 'MN'], ['MQ', 'QP']]),
        pairs('Hình DEGHI: a) ... và ...', [['DI', 'GH']]),
        pairs('b) ... và ... ; ... và ... ; ... và ...', [['DE', 'EG'], ['DI', 'IH'], ['GH', 'IH']]),
      ],
      hints: ['Đếm ô vuông: cạnh nằm trên đường kẻ ngang song song với nhau, cạnh trên đường kẻ dọc vuông góc với cạnh trên đường kẻ ngang.', 'Kiểm tra cả góc ở đỉnh E: mỗi cạnh DE, EG đi chéo qua hai ô.'],
      // 📐 Kéo dài: toạ độ theo bai42_q3_luoi.svg.
      geoPlay: { points: { M: [100, 140], N: [220, 140], P: [340, 260], Q: [100, 260], D: [500, 140], E: [580, 60], G: [660, 140], H: [660, 260], I: [500, 260] }, segs: ['MN', 'NP', 'QP', 'MQ', 'DE', 'EG', 'GH', 'IH', 'DI'], fill: ['MNPQ', 'DEGHI'], cell: 40, origin: [20, 20], pick: 'MN', answer: [{ blank: 0, list: 'par', within: 'MNPQ' }, { blank: 2, list: 'par', within: 'DEGHI' }] },
      ekePlay: { fill: [{ blank: 1, list: 'right', as: 'pairs', within: 'MNPQ' }, { blank: 3, list: 'right', as: 'pairs', within: 'DEGHI' }] },
    },
  ],

  // ── Bài 43. Vẽ hai đường thẳng vuông góc (trang 52–53) ───────────────────────────────────────────
  // Câu 1 (vẽ AB qua E vuông góc CD), câu 2 (vẽ đường cao AH): bài vẽ bằng ê ke, không có điều để chấm.
  'bai-43': [
    {
      type: 'fill', stars: 2, img: imgHcn43,
      q: '3. Cho hình chữ nhật ABCD và điểm E trên cạnh AB. Hãy vẽ đường thẳng đi qua điểm E và vuông góc với cạnh DC, cắt cạnh DC tại điểm G. Ta được các hình tứ giác đều là hình chữ nhật, nêu tên các hình chữ nhật đó.',
      blanks: [names('Các hình chữ nhật: ... ; ... ; ...', ['AEGD', 'EBCG', 'ABCD'])],
      hints: ['Đường EG chia hình chữ nhật ABCD thành hai hình chữ nhật nhỏ. Đừng quên hình lớn ABCD.'],
    },
  ],

  // ── Bài 44. Vẽ hai đường thẳng song song (trang 53–54) ───────────────────────────────────────────
  // Câu 1 (vẽ AB qua M song song CD): bài vẽ, không có điều để chấm.
  'bai-44': [
    {
      type: 'fill', stars: 2, img: imgSongSong44,
      q: '2. Cho hình tam giác ABC có góc đỉnh A là góc vuông. Qua đỉnh A, hãy vẽ đường thẳng AX song song với cạnh BC; qua đỉnh C, hãy vẽ đường thẳng CY song song với cạnh AB. Hai đường thẳng AX và CY cắt nhau tại điểm D, nêu tên các cặp cạnh song song với nhau có trong hình tứ giác ADCB.',
      blanks: [pairs('... và ... ; ... và ...', [['AD', 'BC'], ['DC', 'AB']])],
      hints: ['AD nằm trên đường AX, DC nằm trên đường CY.'],
      // 📐 Kéo dài: toạ độ theo bai44_q2_songsong.svg.
      geoPlay: { points: { A: [257.5, 84.4], B: [40, 210], C: [330, 210], D: [547.5, 84.4] }, segs: ['AB', 'BC', 'AC', 'AD', 'DC'], fill: 'ABC', pick: 'AD', answer: [{ blank: 0, list: 'par' }] },
    },
    {
      type: 'fill', stars: 1, img: imgTuGiac44,
      q: '3. Cho hình tứ giác ABCD có góc đỉnh A và góc đỉnh D là các góc vuông (xem hình vẽ).\na) Hãy vẽ đường thẳng đi qua B và song song với cạnh AD, cắt cạnh DC tại điểm E.\nb) Dùng ê ke kiểm tra xem góc đỉnh E của hình tứ giác BEDA có là góc vuông hay không.',
      blanks: [coKhong('b) Góc đỉnh E của hình tứ giác BEDA có là góc vuông không?', true)],
      hints: ['BE song song với AD, mà AD vuông góc với DC.'],
      // 📐 Kéo dài: toạ độ theo bai44_q3_tugiac.svg.
      geoPlay: { points: { A: [60, 220], B: [60, 130], C: [280, 40], D: [280, 220], E: [280, 130] }, segs: ['AB', 'BC', 'CE', 'ED', 'DA', 'BE'], fill: 'ABCD', pick: 'BE' },
      ekePlay: { fill: { blank: 0, angle: 'EBD' } },
    },
  ],

  // ── Bài 45. Thực hành vẽ hình chữ nhật (trang 54) ────────────────────────────────────────────────
  'bai-45': [
    {
      type: 'fill', stars: 2,
      q: '1. a) Hãy vẽ hình chữ nhật có chiều dài 5cm, chiều rộng 3cm.\nb) Tính chu vi hình chữ nhật đó.',
      blanks: [{ label: 'b) Chu vi hình chữ nhật là: ... cm', answer: '16' }],
      hints: ['Chu vi hình chữ nhật = (chiều dài + chiều rộng) × 2.'],
    },
    {
      type: 'fill', stars: 1, img: imgDuongCheo,
      q: '2. a) Hãy vẽ hình chữ nhật ABCD có chiều dài AB = 4cm, chiều rộng BC = 3cm.\nb) Trong hình chữ nhật ABCD, hai đoạn thẳng AC và BD được gọi là hai đường chéo của hình chữ nhật. Hãy dùng thước có vạch chia xăng-ti-mét kiểm tra xem độ dài hai đường chéo AC và BD có bằng nhau hay không.',
      blanks: [coKhong('b) Hai đường chéo AC và BD có bằng nhau không?', true)],
      hints: ['Vẽ hình chữ nhật 4cm, 3cm vào vở rồi đo hai đường chéo bằng thước.'],
    },
  ],

  // ── Bài 46. Thực hành vẽ hình vuông (trang 55) ───────────────────────────────────────────────────
  // Câu 2 (vẽ theo mẫu trên giấy kẻ ô): bài vẽ, không có điều để chấm.
  'bai-46': [
    {
      type: 'fill', stars: 2,
      q: '1. a) Hãy vẽ hình vuông có cạnh 4cm.\nb) Tính chu vi và diện tích hình vuông đó.',
      blanks: [
        { label: 'Chu vi hình vuông là: ... cm', answer: '16' },
        { label: 'Diện tích hình vuông là: ... cm²', answer: '16' },
      ],
      hints: ['Chu vi hình vuông = cạnh × 4. Diện tích hình vuông = cạnh × cạnh.'],
    },
    {
      type: 'fill', stars: 1,
      q: '3. Hãy vẽ hình vuông ABCD có cạnh 5cm, rồi kiểm tra xem hai đường chéo AC và BD:\na) Có vuông góc với nhau hay không;\nb) Có bằng nhau hay không.',
      blanks: [
        coKhong('a) Hai đường chéo AC và BD có vuông góc với nhau không?', true),
        coKhong('b) Hai đường chéo AC và BD có bằng nhau không?', true),
      ],
      hints: ['Vẽ hình vuông vào vở, dùng ê ke kiểm tra góc ở chỗ hai đường chéo cắt nhau, dùng thước đo độ dài.'],
    },
  ],

  // ── Bài 47. Luyện tập (trang 55–56) ──────────────────────────────────────────────────────────────
  // Câu 3 (vẽ hình vuông ABCD có cạnh AB = 3cm): bài vẽ, không có điều để chấm.
  'bai-47': [
    {
      type: 'fill', stars: 3, img: imgGoc47,
      q: '1. Nêu các góc vuông, góc nhọn, góc tù, góc bẹt có trong mỗi hình sau:',
      blanks: [
        goc('a) Góc đỉnh A; cạnh AB, AC', 'vuông'),
        goc('Góc đỉnh B; cạnh BA, BM', 'nhọn'),
        goc('Góc đỉnh B; cạnh BM, BC', 'nhọn'),
        goc('Góc đỉnh B; cạnh BA, BC', 'nhọn'),
        goc('Góc đỉnh C; cạnh CA, CB', 'nhọn'),
        goc('Góc đỉnh M; cạnh MA, MB', 'nhọn'),
        goc('Góc đỉnh M; cạnh MB, MC', 'tù'),
        goc('Góc đỉnh M; cạnh MA, MC', 'bẹt'),
        goc('b) Góc đỉnh A; cạnh AB, AD', 'vuông'),
        goc('Góc đỉnh B; cạnh BD, BC', 'vuông'),
        goc('Góc đỉnh D; cạnh DA, DC', 'vuông'),
        goc('Góc đỉnh B; cạnh BA, BD', 'nhọn'),
        goc('Góc đỉnh B; cạnh BA, BC', 'tù'),
        goc('Góc đỉnh D; cạnh DA, DB', 'nhọn'),
        goc('Góc đỉnh D; cạnh DB, DC', 'nhọn'),
        goc('Góc đỉnh C; cạnh CB, CD', 'nhọn'),
      ],
      hints: ['Ba điểm A, M, C nằm trên một đường thẳng nên góc đỉnh M cạnh MA, MC là góc bẹt.', 'b) AB song song với DC, nên góc đỉnh D cạnh DA, DC cũng vuông. Góc đỉnh B cạnh BA, BC gồm một góc vuông và thêm một góc nữa.'],
    },
    {
      type: 'fill', stars: 2, img: imgDuongCao,
      q: '2. Đúng ghi Đ, sai ghi S vào ô trống:',
      blanks: [
        { label: '– AH là đường cao của hình tam giác ABC ...', answer: 'S', validate: dsValidate(false) },
        { label: '– AB là đường cao của hình tam giác ABC ...', answer: 'Đ', validate: dsValidate(true) },
      ],
      hints: ['Đường cao kẻ từ A phải vuông góc với cạnh BC. AH có vuông góc với BC không?'],
      // 📐 Kéo dài: toạ độ theo bai47_q2_duongcao.svg.
      geoPlay: { points: { A: [60, 30], B: [60, 200], C: [380, 200], H: [240, 200] }, segs: ['AB', 'BC', 'AC', 'AH'], fill: 'ABC', pick: 'BC' },
      ekePlay: { fill: [{ blank: 0, angle: ['HAB', 'HAC'], yes: 'Đ', no: 'S' }, { blank: 1, angle: 'BAC', yes: 'Đ', no: 'S' }] },
    },
    {
      type: 'fill', stars: 2, img: imgHcn47,
      q: '4. a) Hãy vẽ hình chữ nhật ABCD có chiều dài AB = 6cm, chiều rộng AD = 4cm.\nb) Xác định trung điểm M của cạnh AD, trung điểm N của cạnh BC. Nối điểm M và điểm N ta được các hình tứ giác đều là hình chữ nhật.\n– Nêu tên các hình chữ nhật đó.\n– Nêu tên các cạnh song song với cạnh AB.',
      blanks: [
        names('Các hình chữ nhật: ... ; ... ; ...', ['ABNM', 'MNCD', 'ABCD']),
        names('Các cạnh song song với cạnh AB: ... và ...', ['MN', 'DC']),
      ],
      hints: ['MN chia hình ABCD thành hai hình chữ nhật nhỏ; hình lớn ABCD cũng là hình chữ nhật.'],
      // 📐 Kéo dài: toạ độ theo bai47_q4_hcn.svg.
      geoPlay: { points: { A: [80, 40], B: [380, 40], C: [380, 240], D: [80, 240], M: [80, 140], N: [380, 140] }, segs: ['AB', 'BN', 'NC', 'DC', 'MD', 'AM', 'MN'], fill: 'ABCD', pick: 'AB', answer: [{ blank: 1, list: 'par', with: 'AB' }] },
      ekePlay: true,
      rulerPlay: { unit: 'cm', per: 50 },
    },
  ],

  // ── Bài 48. Luyện tập chung (trang 56) ───────────────────────────────────────────────────────────
  'bai-48': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [
        calc('a) 386259 + 260837', 647096), calc('726485 − 452936', 273549),
        calc('b) 528946 + 73529', 602475), calc('435260 − 92753', 342507),
      ],
      hints: ['Viết các chữ số cùng hàng thẳng cột, tính từ hàng đơn vị, nhớ đúng sang hàng bên trái.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính bằng cách thuận tiện nhất:',
      blanks: [
        { label: 'a) 6257 + 989 + 743 = ...', answer: '7989' },
        { label: 'b) 5798 + 322 + 4678 = ...', answer: '10798' },
      ],
      hints: ['Tìm hai số có tổng tròn nghìn rồi cộng chúng trước: 6257 + 743 = 7000.', 'b) Xem 322 cộng với số nào thì tròn nghìn.'],
    },
    {
      type: 'fill', stars: 3, img: imgHinhVuong48,
      q: '3. Cho hình vuông ABCD có cạnh 3cm. Vẽ tiếp hình vuông BIHC để có hình chữ nhật AIHD (xem hình vẽ).\na) Hình vuông BIHC có cạnh bằng mấy xăng-ti-mét?\nb) Cạnh DH vuông góc với những cạnh nào?\nc) Tính chu vi hình chữ nhật AIHD.',
      blanks: [
        { label: 'a) Hình vuông BIHC có cạnh bằng ... cm', answer: '3' },
        names('b) Cạnh DH vuông góc với các cạnh: ... ; ... ; ...', ['AD', 'BC', 'IH']),
        { label: 'c) Chu vi hình chữ nhật AIHD là: ... cm', answer: '18' },
      ],
      hints: ['BIHC có chung cạnh BC với hình vuông ABCD.', 'Chiều dài AI = 3 + 3; chu vi = (dài + rộng) × 2.'],
      // 📐 Kéo dài: toạ độ theo bai48_q3_hinhvuong.svg.
      geoPlay: { points: { A: [40, 40], B: [200, 40], I: [360, 40], D: [40, 200], C: [200, 200], H: [360, 200] }, segs: ['AB', 'BI', 'IH', 'DH', 'AD', 'BC'], fill: 'AIHD', pick: 'DH' },
      ekePlay: { fill: { blank: 1, list: 'right', line: 'DH' } },
      rulerPlay: { unit: 'cm', per: 160 / 3, fill: { blank: 0, len: [['B', 'I'], ['I', 'H'], ['B', 'C']] } },
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '4. Một hình chữ nhật có nửa chu vi là 16cm, chiều dài hơn chiều rộng 4cm. Tính diện tích của hình chữ nhật đó.',
      blanks: [
        { label: 'Chiều dài là: ... cm', answer: '10' },
        { label: 'Chiều rộng là: ... cm', answer: '6' },
        { label: 'Diện tích hình chữ nhật là: ... cm²', answer: '60' },
      ],
      hints: ['Nửa chu vi = chiều dài + chiều rộng: đây là bài tìm hai số khi biết tổng (16) và hiệu (4).', 'Diện tích = chiều dài × chiều rộng.'],
    },
  ],
};
