/**
 * SGK Toán 4: bài 49–65, Phép nhân; đề-xi-mét vuông, mét vuông (sách trang 57–75).
 * Hình vẽ lại: scripts/redraw/g4t_bai049_065.py (bộ vẽ kit_g4t.py).
 */
import { blank, listValidate, mau, dsValidate, calc, nham, readBlank, readCell, num } from './kit.js';
import imgVuongHcn from '../../assets/grade4-textbook/bai54_q5_hinhvuong_hcn.svg';
import imgMiengBia from '../../assets/grade4-textbook/bai55_q4_mieng_bia.svg';
import imgDatTinh from '../../assets/grade4-textbook/bai63_q2_dat_tinh.svg';

const DM2 = 'dm<sup>2</sup>', CM2 = 'cm<sup>2</sup>', M2 = 'm<sup>2</sup>';
/** Chữ dài trong ô bảng được xuống dòng (ô bảng mặc định không xuống dòng, điện thoại dọc phải cuộn ngang). */
const wrap = (s) => `<span style="white-space:normal">${s}</span>`;
/** Dòng tiếp theo của một mẫu nhiều dòng (chữ xanh, không lặp lại "Mẫu:"). */
const smp = (s) => `<span class="gw-sample-text">${s}</span>`;
/** "... + ... = ..." : hai số hạng theo thứ tự nào cũng được, rồi đến tổng. */
const sumParts = (parts, total) => (v) => {
  const x = String(v).split(',').map(t => t.replace(/\s+/g, ''));
  return x.length === 3 && x[2] === String(total) && [x[0], x[1]].sort().join() === parts.map(String).sort().join();
};
const cmp = (l, r, a, b) => ({ left: l, right: r, answer: a > b ? '>' : a < b ? '<' : '=' });
/** Ô nhiều chỗ trống: đáp án theo thứ tự các "...". */
const multi = (label, vals, opts = {}) => ({ label, answer: vals.map(String).join(','), validate: listValidate(vals.map(String)), ...opts });
/** Phép nhân đặt tính: "a) 341231 × 2 = ..." + nút ✍️ Tính. */
const mul = (prefix, a, b) => calc(`${prefix}${a} × ${b}`, a * b);
/** "S = a × a": nhận a × a, a x a, a*a, a.a, có hoặc không có "S =". */
const formulaValidate = (want) => (v) => String(v).toLowerCase().replace(/\s+/g, '').replace(/^s=/, '')
  .replace(/[x*.·]/g, '×') === want;

export const QUESTIONS = {
  // ── Bài 49. Nhân với số có một chữ số (trang 57) ───────────────────────────────────────────────
  'bai-49': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 341231, 2), mul('', 214325, 4), mul('b) ', 102426, 5), mul('', 410536, 3)],
      hints: ['Bấm ✍️ Tính để đặt tính: nhân lần lượt từ phải sang trái, nhớ sang hàng bên trái.'],
    },
    {
      type: 'table', stars: 3,
      q: '2. Viết giá trị của biểu thức vào ô trống:',
      headers: ['m', '2', '3', '4', '5'], colWidths: ['24%', '19%', '19%', '19%', '19%'],
      rows: [['201634 × m', ...[2, 3, 4, 5].map(m => blank(201634 * m))]],
      calcs: [2, 3, 4, 5].map(m => `201634 × ${m}`),
      hints: ['Thay m bằng từng số rồi tính: với m = 2 thì 201634 × m = 201634 × 2.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính:',
      blanks: [
        { label: 'a) 321475 + 423507 × 2 = ...', answer: String(321475 + 423507 * 2) },
        { label: '843275 − 123568 × 5 = ...', answer: String(843275 - 123568 * 5) },
        { label: 'b) 1306 × 8 + 24573 = ...', answer: String(1306 * 8 + 24573) },
        { label: '609 × 9 − 4845 = ...', answer: String(609 * 9 - 4845) },
      ],
      hints: ['Tính phép nhân trước, rồi mới cộng hoặc trừ.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Một huyện miền núi có 8 xã vùng thấp và 9 xã vùng cao. Mỗi xã vùng thấp được cấp 850 quyển truyện, mỗi xã vùng cao được cấp 980 quyển truyện. Hỏi huyện đó được cấp bao nhiêu quyển truyện?',
      blanks: [
        { label: 'Số quyển truyện 8 xã vùng thấp được cấp là: ... quyển', answer: String(850 * 8) },
        { label: 'Số quyển truyện 9 xã vùng cao được cấp là: ... quyển', answer: String(980 * 9) },
        { label: 'Huyện đó được cấp tất cả: ... quyển truyện', answer: String(850 * 8 + 980 * 9) },
      ],
      hints: ['Tìm số truyện của các xã vùng thấp (850 × 8) và của các xã vùng cao (980 × 9), rồi cộng lại.'],
    },
  ],

  // ── Bài 50. Tính chất giao hoán của phép nhân (trang 58) ───────────────────────────────────────
  'bai-50': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết số thích hợp vào ô trống:',
      blanks: [
        { label: 'a) 4 × 6 = 6 × ...', answer: '4', boxes: true },
        { label: '207 × 7 = ... × 207', answer: '7', boxes: true },
        { label: 'b) 3 × 5 = 5 × ...', answer: '3', boxes: true },
        { label: '2138 × 9 = ... × 2138', answer: '9', boxes: true },
      ],
      hints: ['Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        mul('a) ', 1357, 5), mul('', 7, 853), mul('b) ', 40263, 7),
        mul('', 5, 1326), mul('c) ', 23109, 8), mul('', 9, 1427),
      ],
      hints: ['7 × 853 = 853 × 7: đổi chỗ để đặt số có nhiều chữ số ở trên, số có một chữ số ở dưới.'],
    },
    {
      type: 'match', stars: 2,
      q: '3. Tìm hai biểu thức có giá trị bằng nhau:\na) 4 × 2145 ;   b) (3 + 2) × 10287 ;   c) 3964 × 6 ;\nd) (2100 + 45) × 4 ;   e) 10287 × 5 ;   g) (4 + 2) × (3000 + 964).',
      left: [
        { id: 'a', text: 'a) 4 × 2145' }, { id: 'c', text: 'c) 3964 × 6' }, { id: 'e', text: 'e) 10287 × 5' },
      ],
      right: [
        { id: 'b', text: 'b) (3 + 2) × 10287' }, { id: 'd', text: 'd) (2100 + 45) × 4' }, { id: 'g', text: 'g) (4 + 2) × (3000 + 964)' },
      ],
      pairs: [['a', 'd'], ['c', 'g'], ['e', 'b']],
      hints: ['Tính trong ngoặc trước: (3 + 2) = 5, (2100 + 45) = 2145, … rồi dùng tính chất giao hoán.'],
    },
    {
      type: 'fill', stars: 1,
      q: '4. Số?',
      blanks: [
        { label: 'a) a × ... = ... × a = a', answer: '1,1', validate: listValidate(['1', '1']), boxes: true },
        { label: 'b) a × ... = ... × a = 0', answer: '0,0', validate: listValidate(['0', '0']), boxes: true },
      ],
      hints: ['Số nào nhân với a vẫn được a? Số nào nhân với a luôn được 0?'],
    },
  ],

  // ── Bài 51. Nhân với 10, 100, 1000, … Chia cho 10, 100, 1000, … (trang 59–60) ────────────────────
  'bai-51': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính nhẩm:',
      blanks: [
        nham('a) 18 × 10', 180), nham('18 × 100', 1800), nham('18 × 1000', 18000),
        nham('82 × 100', 8200), nham('75 × 1000', 75000), nham('19 × 10', 190),
        nham('256 × 1000', 256000), nham('302 × 10', 3020), nham('400 × 100', 40000),
        nham('b) 9000 : 10', 900), nham('9000 : 100', 90), nham('9000 : 1000', 9),
        nham('6800 : 100', 68), nham('420 : 10', 42), nham('2000 : 1000', 2),
        nham('20020 : 10', 2002), nham('200200 : 100', 2002), nham('2002000 : 1000', 2002),
      ],
      hints: ['Nhân với 10, 100, 1000: viết thêm một, hai, ba chữ số 0 vào bên phải.', 'Chia cho 10, 100, 1000: bỏ bớt một, hai, ba chữ số 0 ở bên phải.'],
    },
    {
      type: 'fill', stars: 2,
      q: `2. Viết số thích hợp vào chỗ chấm:\n${mau('300kg = 3 tạ. Cách làm: ta có 100kg = 1 tạ; nhẩm 300 : 100 = 3; vậy 300kg = 3 tạ.')}`,
      blanks: [
        { label: '70kg = ... yến', answer: '7' }, { label: '800kg = ... tạ', answer: '8' },
        { label: '300 tạ = ... tấn', answer: '30' }, { label: '120 tạ = ... tấn', answer: '12' },
        { label: '5000kg = ... tấn', answer: '5' }, { label: '4000g = ... kg', answer: '4' },
      ],
      hints: ['1 yến = 10kg, 1 tạ = 100kg, 1 tấn = 10 tạ = 1000kg, 1kg = 1000g.'],
    },
  ],

  // ── Bài 52. Tính chất kết hợp của phép nhân (trang 60–61) ──────────────────────────────────────
  'bai-52': [
    {
      type: 'fill', stars: 2,
      q: `1. Tính bằng hai cách (theo mẫu):\n${mau('2 × 5 × 4 = ?')}\n${smp('Cách 1: 2 × 5 × 4 = (2 × 5) × 4 = 10 × 4 = 40.')}\n${smp('Cách 2: 2 × 5 × 4 = 2 × (5 × 4) = 2 × 20 = 40.')}`,
      blanks: [[4, 5, 3, 'a) '], [3, 5, 6, ''], [5, 2, 7, 'b) '], [3, 4, 5, '']].flatMap(([a, b, c, p]) => [
        multi(`${p}Cách 1: (${a} × ${b}) × ${c} = ... × ${c} = ...`, [a * b, a * b * c]),
        multi(`Cách 2: ${a} × (${b} × ${c}) = ${a} × ... = ...`, [b * c, a * b * c]),
      ]),
      hints: ['Cách 1: nhân hai số đầu trước. Cách 2: nhân hai số sau trước. Hai cách cho cùng một kết quả.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tính bằng cách thuận tiện nhất:',
      blanks: [
        nham('a) 13 × 5 × 2', 130), nham('5 × 2 × 34', 340),
        nham('b) 2 × 26 × 5', 260), nham('5 × 9 × 3 × 2', 270),
      ],
      hints: ['Nhóm hai thừa số có tích tròn chục: 5 × 2 = 10, rồi nhân với số còn lại.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '3. Có 8 phòng học, mỗi phòng học có 15 bộ bàn ghế, mỗi bộ bàn ghế có 2 học sinh đang ngồi học. Hỏi có tất cả bao nhiêu học sinh đang ngồi học?',
      blanks: [{ label: 'Có tất cả ... học sinh đang ngồi học.', answer: String(8 * 15 * 2) }],
      hints: ['Mỗi phòng có bao nhiêu học sinh (15 × 2)? Rồi nhân với 8 phòng.'],
    },
  ],

  // ── Bài 53. Nhân với số có tận cùng là chữ số 0 (trang 61–62) ──────────────────────────────────
  'bai-53': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 1342, 40), mul('b) ', 13546, 30), mul('c) ', 5642, 200)],
      hints: ['Nhân với chữ số khác 0 trước (1342 × 4), rồi viết thêm các chữ số 0 vào bên phải.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [mul('a) ', 1326, 300), mul('b) ', 3450, 20), mul('c) ', 1450, 800)],
      hints: ['Nhân phần khác 0 với nhau, rồi viết thêm vào bên phải tất cả các chữ số 0 ở cuối hai thừa số.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Một bao gạo cân nặng 50kg, một bao ngô cân nặng 60kg. Một xe ô tô chở 30 bao gạo và 40 bao ngô. Hỏi xe ô tô đó chở tất cả bao nhiêu ki-lô-gam gạo và ngô?',
      blanks: [
        { label: '30 bao gạo cân nặng: ... kg', answer: String(50 * 30) },
        { label: '40 bao ngô cân nặng: ... kg', answer: String(60 * 40) },
        { label: 'Xe ô tô chở tất cả: ... kg gạo và ngô', answer: String(50 * 30 + 60 * 40) },
      ],
      hints: ['Tính số ki-lô-gam gạo (50 × 30) và ngô (60 × 40), rồi cộng lại.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Một tấm kính hình chữ nhật có chiều rộng 30cm, chiều dài gấp đôi chiều rộng. Tính diện tích của tấm kính đó.',
      blanks: [
        { label: 'Chiều dài tấm kính là: ... cm', answer: '60' },
        { label: `Diện tích tấm kính là: ... ${CM2}`, answer: '1800' },
      ],
      hints: ['Chiều dài = 30 × 2. Diện tích hình chữ nhật = chiều dài × chiều rộng.'],
    },
  ],

  // ── Bài 54. Đề-xi-mét vuông (trang 62–64) ──────────────────────────────────────────────────────
  'bai-54': [
    {
      type: 'fill', stars: 2,
      q: `1. Đọc: 32${DM2} ; 911${DM2} ; 1952${DM2} ; 492 000${DM2}.`,
      blanks: [32, 911, 1952, 492000].map(n => readBlank(`${num(n)}${DM2}: ... đề-xi-mét vuông`, n)),
      hints: ['Đọc số trước rồi đọc tên đơn vị "đề-xi-mét vuông".'],
    },
    {
      type: 'table', stars: 1,
      q: '2. Viết theo mẫu:',
      headers: ['Đọc', 'Viết'], colWidths: ['68%', '32%'],
      rows: [
        { sample: true, cells: [wrap('Một trăm linh hai đề-xi-mét vuông'), `102${DM2}`] },
        [wrap('Tám trăm mười hai đề-xi-mét vuông'), blank(812, { suffix: DM2 })],
        [wrap('Một nghìn chín trăm sáu mươi chín đề-xi-mét vuông'), blank(1969, { suffix: DM2 })],
        [wrap('Hai nghìn tám trăm mười hai đề-xi-mét vuông'), blank(2812, { suffix: DM2 })],
      ],
      hints: [`Viết số rồi viết kí hiệu ${DM2}.`],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: `1${DM2} = ... ${CM2}`, answer: '100' },
        { label: `48${DM2} = ... ${CM2}`, answer: '4800' },
        { label: `1997${DM2} = ... ${CM2}`, answer: '199700' },
        { label: `100${CM2} = ... ${DM2}`, answer: '1' },
        { label: `2000${CM2} = ... ${DM2}`, answer: '20' },
        { label: `9900${CM2} = ... ${DM2}`, answer: '99' },
      ],
      hints: [`1${DM2} = 100${CM2}: đổi ${DM2} ra ${CM2} thì nhân với 100, đổi ${CM2} ra ${DM2} thì chia cho 100.`],
    },
    {
      type: 'compare', stars: 2,
      q: '4. >, <, = ?',
      rows: [
        cmp(`210${CM2}`, `2${DM2}10${CM2}`, 210, 210),
        cmp(`1954${CM2}`, `19${DM2}50${CM2}`, 1954, 1950),
        cmp(`6${DM2}3${CM2}`, `603${CM2}`, 603, 603),
        cmp(`2001${CM2}`, `20${DM2}10${CM2}`, 2001, 2010),
      ],
      hints: [`Đổi về cùng đơn vị ${CM2}: 2${DM2}10${CM2} = 200${CM2} + 10${CM2}.`],
    },
    {
      type: 'fill', stars: 2, img: imgVuongHcn,
      q: '5. Đúng ghi Đ, sai ghi S:',
      blanks: [
        { label: 'a) Hình vuông và hình chữ nhật có diện tích bằng nhau. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'b) Diện tích hình vuông và diện tích hình chữ nhật không bằng nhau. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'c) Hình vuông có diện tích lớn hơn diện tích hình chữ nhật. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'd) Hình chữ nhật có diện tích bé hơn diện tích hình vuông. ...', answer: 'S', validate: dsValidate(false) },
      ],
      hints: ['Đổi 1dm = 10cm rồi tính diện tích từng hình theo xăng-ti-mét vuông.'],
    },
  ],

  // ── Bài 55. Mét vuông (trang 64–65) ────────────────────────────────────────────────────────────
  'bai-55': [
    {
      type: 'table', stars: 2,
      q: '1. Viết theo mẫu:',
      headers: ['Đọc', 'Viết'], colWidths: ['68%', '32%'],
      rows: [
        { sample: true, cells: [wrap('Chín trăm chín mươi mét vuông'), `990${M2}`] },
        [wrap('Hai nghìn không trăm linh năm mét vuông'), blank(2005, { suffix: M2 })],
        [{ ...readCell(1980), suffix: 'mét vuông' }, `1980${M2}`],
        [{ ...readCell(8600), suffix: 'đề-xi-mét vuông' }, `8600${DM2}`],
        [wrap('Hai mươi tám nghìn chín trăm mười một xăng-ti-mét vuông'), blank(28911, { suffix: CM2 })],
      ],
      hints: ['Đọc số trước rồi đọc tên đơn vị: m² là "mét vuông", dm² là "đề-xi-mét vuông", cm² là "xăng-ti-mét vuông".'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: `1${M2} = ... ${DM2}`, answer: '100' },
        { label: `100${DM2} = ... ${M2}`, answer: '1' },
        { label: `1${M2} = ... ${CM2}`, answer: '10000' },
        { label: `10 000${CM2} = ... ${M2}`, answer: '1' },
        { label: `400${DM2} = ... ${M2}`, answer: '4' },
        { label: `2110${M2} = ... ${DM2}`, answer: '211000' },
        { label: `15${M2} = ... ${CM2}`, answer: '150000' },
        { label: `10${DM2} 2${CM2} = ... ${CM2}`, answer: '1002' },
      ],
      hints: [`1${M2} = 100${DM2}, 1${DM2} = 100${CM2}, nên 1${M2} = 10 000${CM2}.`],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Để lát nền một căn phòng, người ta đã sử dụng hết 200 viên gạch hình vuông có cạnh 30cm. Hỏi căn phòng đó có diện tích bao nhiêu mét vuông, biết diện tích phần mạch vữa không đáng kể?',
      blanks: [
        { label: `Diện tích một viên gạch là: ... ${CM2}`, answer: '900' },
        multi(`Diện tích căn phòng là: ... ${CM2} = ... ${M2}`, [180000, 18]),
      ],
      hints: ['Diện tích viên gạch = 30 × 30. Diện tích phòng = diện tích một viên × 200.', `Đổi ra mét vuông: 10 000${CM2} = 1${M2}.`],
    },
    {
      type: 'fill', stars: 4, img: imgMiengBia,
      q: '4. Tính diện tích của miếng bìa có các kích thước theo hình vẽ dưới đây:',
      blanks: [{ label: `Diện tích miếng bìa là: ... ${CM2}`, answer: '60' }],
      calcFree: true,
      hints: ['Chia miếng bìa thành các hình chữ nhật, hoặc lấy hình chữ nhật lớn 15cm × 5cm trừ đi phần bị khoét.', 'Phần bị khoét rộng 15 − 4 − 6 = 5cm, sâu 3cm.'],
    },
  ],

  // ── Bài 56. Nhân một số với một tổng (trang 66–67) ─────────────────────────────────────────────
  'bai-56': [
    {
      type: 'table', stars: 2,
      q: '1. Tính giá trị của biểu thức rồi viết vào ô trống (theo mẫu):',
      headers: ['a', 'b', 'c', 'a × (b + c)', 'a × b + a × c'],
      rows: [
        { sample: true, cells: ['4', '5', '2', '4 × (5 + 2) = 28', '4 × 5 + 4 × 2 = 28'] },
        ['3', '4', '5', blank(27), blank(27)],
        ['6', '2', '3', blank(30), blank(30)],
      ],
      hints: ['Thay a, b, c bằng các số trong cùng một hàng rồi tính.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: `2. a) Tính bằng hai cách: 36 × (7 + 3) ; 207 × (2 + 6).\nb) Tính bằng hai cách (theo mẫu): 5 × 38 + 5 × 62 ; 135 × 8 + 135 × 2.\n${mau('38 × 6 + 38 × 4 = ?')}\n${smp('Cách 1: 38 × 6 + 38 × 4 = 228 + 152 = 380.')}\n${smp('Cách 2: 38 × 6 + 38 × 4 = 38 × (6 + 4) = 38 × 10 = 380.')}`,
      blanks: [
        multi('a) Cách 1: 36 × (7 + 3) = 36 × ... = ...', [10, 360]),
        multi('Cách 2: 36 × (7 + 3) = 36 × 7 + 36 × 3 = ... + ... = ...', [252, 108, 360]),
        multi('Cách 1: 207 × (2 + 6) = 207 × ... = ...', [8, 1656]),
        multi('Cách 2: 207 × (2 + 6) = 207 × 2 + 207 × 6 = ... + ... = ...', [414, 1242, 1656]),
        multi('b) Cách 1: 5 × 38 + 5 × 62 = ... + ... = ...', [190, 310, 500]),
        multi('Cách 2: 5 × 38 + 5 × 62 = 5 × (38 + 62) = 5 × ... = ...', [100, 500]),
        multi('Cách 1: 135 × 8 + 135 × 2 = ... + ... = ...', [1080, 270, 1350]),
        multi('Cách 2: 135 × 8 + 135 × 2 = 135 × (8 + 2) = 135 × ... = ...', [10, 1350]),
      ],
      hints: ['a × (b + c) = a × b + a × c: tính tổng trong ngoặc rồi nhân, hoặc nhân với từng số hạng rồi cộng.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Tính và so sánh giá trị của hai biểu thức: (3 + 5) × 4 và 3 × 4 + 5 × 4.\nTừ kết quả so sánh, nêu cách nhân một tổng với một số.',
      blanks: [
        nham('(3 + 5) × 4', 32), nham('3 × 4 + 5 × 4', 32),
        { label: 'Vậy: (3 + 5) × 4 ... 3 × 4 + 5 × 4', answer: '=' },
      ],
      hints: ['Khi nhân một tổng với một số, ta có thể nhân từng số hạng của tổng với số đó rồi cộng các kết quả.'],
    },
    {
      type: 'fill', stars: 3,
      q: `4. Áp dụng tính chất nhân một số với một tổng để tính (theo mẫu):\n${mau('36 × 11 = 36 × (10 + 1) = 36 × 10 + 36 × 1 = 360 + 36 = 396.')}`,
      blanks: [[26, 11, 'a) '], [35, 101, ''], [213, 11, 'b) '], [123, 101, '']].map(([a, b, p]) =>
        ({ label: `${p}${a} × ${b} = ... + ... = ...`, answer: [a * (b - 1), a, a * b].join(','), validate: sumParts([a * (b - 1), a], a * b) })),
      hints: ['11 = 10 + 1, 101 = 100 + 1. Nhân với 10, 100 chỉ cần viết thêm chữ số 0.'],
    },
  ],

  // ── Bài 57. Nhân một số với một hiệu (trang 67–68) ─────────────────────────────────────────────
  'bai-57': [
    {
      type: 'table', stars: 2,
      q: '1. Tính giá trị của biểu thức rồi viết vào ô trống (theo mẫu):',
      headers: ['a', 'b', 'c', 'a × (b − c)', 'a × b − a × c'],
      rows: [
        { sample: true, cells: ['3', '7', '3', '3 × (7 − 3) = 12', '3 × 7 − 3 × 3 = 12'] },
        ['6', '9', '5', blank(24), blank(24)],
        ['8', '5', '2', blank(24), blank(24)],
      ],
      hints: ['Thay a, b, c bằng các số trong cùng một hàng rồi tính.'],
    },
    {
      type: 'fill', stars: 3,
      q: `2. Áp dụng tính chất nhân một số với một hiệu để tính (theo mẫu):\n${mau('26 × 9 = 26 × (10 − 1) = 26 × 10 − 26 × 1 = 260 − 26 = 234.')}`,
      blanks: [[47, 9, 'a) '], [24, 99, ''], [138, 9, 'b) '], [123, 99, '']].map(([a, b, p]) =>
        multi(`${p}${a} × ${b} = ... − ... = ...`, [a * (b + 1), a, a * b])),
      hints: ['9 = 10 − 1, 99 = 100 − 1.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một cửa hàng bán trứng có 40 giá để trứng, mỗi giá để trứng có 175 quả. Cửa hàng đã bán hết 10 giá trứng. Hỏi cửa hàng đó còn lại bao nhiêu quả trứng?',
      blanks: [{ label: 'Cửa hàng còn lại ... quả trứng.', answer: String(175 * (40 - 10)) }],
      hints: ['Cửa hàng còn lại 40 − 10 giá trứng, mỗi giá 175 quả.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Tính và so sánh giá trị của hai biểu thức: (7 − 5) × 3 và 7 × 3 − 5 × 3.\nTừ kết quả so sánh, nêu cách nhân một hiệu với một số.',
      blanks: [
        nham('(7 − 5) × 3', 6), nham('7 × 3 − 5 × 3', 6),
        { label: 'Vậy: (7 − 5) × 3 ... 7 × 3 − 5 × 3', answer: '=' },
      ],
      hints: ['Khi nhân một hiệu với một số, ta có thể nhân số bị trừ và số trừ với số đó rồi trừ hai kết quả.'],
    },
  ],

  // ── Bài 58. Luyện tập (trang 68) ───────────────────────────────────────────────────────────────
  'bai-58': [
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '1. Tính:',
      blanks: [
        { label: 'a) 135 × (20 + 3) = ...', answer: String(135 * 23) },
        { label: '427 × (10 + 8) = ...', answer: String(427 * 18) },
        { label: 'b) 642 × (30 − 6) = ...', answer: String(642 * 24) },
        { label: '287 × (40 − 8) = ...', answer: String(287 * 32) },
      ],
      hints: ['Nhân số đó với từng số trong ngoặc rồi cộng (hoặc trừ) hai kết quả: 135 × 20 + 135 × 3.'],
    },
    {
      type: 'fill', stars: 3,
      q: `2. a) Tính bằng cách thuận tiện nhất: 134 × 4 × 5 ; 5 × 36 × 2 ; 42 × 2 × 7 × 5.\nb) Tính (theo mẫu):\n${mau('145 × 2 + 145 × 98 = 145 × (2 + 98) = 145 × 100 = 14500.')}`,
      blanks: [
        nham('a) 134 × 4 × 5', 2680), nham('5 × 36 × 2', 360), nham('42 × 2 × 7 × 5', 2940),
        multi('b) 137 × 3 + 137 × 97 = 137 × ... = ...', [100, 13700]),
        multi('94 × 12 + 94 × 88 = 94 × ... = ...', [100, 9400]),
        multi('428 × 12 − 428 × 2 = 428 × ... = ...', [10, 4280]),
        multi('537 × 39 − 537 × 19 = 537 × ... = ...', [20, 10740]),
      ],
      hints: ['a) Nhóm các thừa số có tích tròn chục: 4 × 5 = 20, 2 × 5 = 10.', 'b) Hai tích có chung thừa số: đưa thừa số chung ra ngoài ngoặc.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính:',
      blanks: [
        { label: 'a) 217 × 11 = ...', answer: String(217 * 11) },
        { label: '217 × 9 = ...', answer: String(217 * 9) },
        { label: 'b) 413 × 21 = ...', answer: String(413 * 21) },
        { label: '413 × 19 = ...', answer: String(413 * 19) },
        { label: 'c) 1234 × 31 = ...', answer: String(1234 * 31) },
        { label: '875 × 29 = ...', answer: String(875 * 29) },
      ],
      hints: ['Tách số thứ hai thành tổng hoặc hiệu: 217 × 11 = 217 × (10 + 1), 217 × 9 = 217 × (10 − 1).'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Một sân vận động hình chữ nhật có chiều dài 180m, chiều rộng bằng nửa chiều dài. Tính chu vi và diện tích của sân vận động đó.',
      blanks: [
        { label: 'Chiều rộng sân vận động là: ... m', answer: '90' },
        { label: 'Chu vi sân vận động là: ... m', answer: '540' },
        { label: `Diện tích sân vận động là: ... ${M2}`, answer: '16200' },
      ],
      hints: ['Chiều rộng = 180 : 2. Chu vi = (dài + rộng) × 2. Diện tích = dài × rộng.'],
      // 🐜 Đo chu vi (engine/perimPlay.js)
      perimPlay: { rect: [180, 90], unit: 'm', name: 'sân vận động', look: 'field', texts: ['180 m', '180 : 2 = 90 m', '180 m', '180 : 2 = 90 m'], fill: 1 },
    },
  ],

  // ── Bài 59. Nhân với số có hai chữ số (trang 69) ───────────────────────────────────────────────
  'bai-59': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 86, 53), mul('b) ', 33, 44), mul('c) ', 157, 24), mul('d) ', 1122, 19)],
      hints: ['Nhân với chữ số hàng đơn vị được tích riêng thứ nhất; nhân với chữ số hàng chục được tích riêng thứ hai, viết lùi sang trái một cột; rồi cộng.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính giá trị của biểu thức 45 × a với a bằng 13 ; 26 ; 39.',
      blanks: [13, 26, 39].map(a => ({ label: `Với a = ${a} thì 45 × a = 45 × ${a} = ...`, answer: String(45 * a), calc: `45 × ${a}` })),
      hints: ['Thay a bằng từng số rồi tính.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Mỗi quyển vở có 48 trang. Hỏi 25 quyển vở cùng loại có tất cả bao nhiêu trang?',
      blanks: [{ label: '25 quyển vở có tất cả ... trang.', answer: String(48 * 25) }],
      hints: ['Lấy số trang một quyển nhân với số quyển.'],
    },
  ],

  // ── Bài 60. Luyện tập (trang 69–70) ────────────────────────────────────────────────────────────
  'bai-60': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 17, 86), mul('b) ', 428, 39), mul('c) ', 2057, 23)],
      hints: ['Bấm ✍️ Tính: viết hai tích riêng, tích riêng thứ hai lùi sang trái một cột, rồi cộng.'],
    },
    {
      type: 'table', stars: 3,
      q: '2. Viết giá trị của biểu thức vào ô trống:',
      headers: ['m', '3', '30', '23', '230'], colWidths: ['24%', '19%', '19%', '19%', '19%'],
      rows: [['m × 78', ...[3, 30, 23, 230].map(m => blank(m * 78))]],
      calcs: [3, 30, 23, 230].map(m => `${m} × 78`),
      hints: ['Thay m bằng từng số: với m = 3 thì m × 78 = 3 × 78.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Tim người khoẻ mạnh bình thường mỗi phút đập khoảng 75 lần. Hãy tính số lần đập của tim người đó trong 24 giờ.',
      blanks: [
        { label: '24 giờ có: ... phút', answer: String(60 * 24) },
        { label: 'Trong 24 giờ tim người đó đập khoảng: ... lần', answer: String(75 * 60 * 24) },
      ],
      hints: ['1 giờ = 60 phút. Tính số phút trong 24 giờ trước, rồi nhân với 75.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Một cửa hàng bán 13kg đường loại 5200 đồng một ki-lô-gam và 18kg đường loại 5500 đồng một ki-lô-gam. Hỏi khi bán hết hai loại đường trên cửa hàng đó thu được tất cả bao nhiêu tiền?',
      blanks: [
        { label: 'Bán 13kg đường loại 5200 đồng thu được: ... đồng', answer: String(13 * 5200) },
        { label: 'Bán 18kg đường loại 5500 đồng thu được: ... đồng', answer: String(18 * 5500) },
        { label: 'Cửa hàng thu được tất cả: ... đồng', answer: String(13 * 5200 + 18 * 5500) },
      ],
      hints: ['Tiền bán mỗi loại = giá 1kg × số ki-lô-gam. Rồi cộng hai số tiền.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Một trường học có 18 lớp, trong đó 12 lớp, mỗi lớp có 30 học sinh và 6 lớp, mỗi lớp có 35 học sinh. Hỏi trường đó có tất cả bao nhiêu học sinh?',
      blanks: [
        { label: '12 lớp có: ... học sinh', answer: String(12 * 30) },
        { label: '6 lớp có: ... học sinh', answer: String(6 * 35) },
        { label: 'Trường đó có tất cả: ... học sinh', answer: String(12 * 30 + 6 * 35) },
      ],
      hints: ['Tính số học sinh của 12 lớp và của 6 lớp, rồi cộng lại.'],
    },
  ],

  // ── Bài 61. Giới thiệu nhân nhẩm số có hai chữ số với 11 (trang 70–71) ───────────────────────────
  'bai-61': [
    {
      type: 'fill', stars: 2,
      q: '1. Tính nhẩm:',
      blanks: [nham('a) 34 × 11', 374), nham('b) 11 × 95', 1045), nham('c) 82 × 11', 902)],
      hints: ['Cộng hai chữ số rồi viết tổng vào giữa: 3 + 4 = 7, được 374.', 'Tổng có hai chữ số thì viết chữ số hàng đơn vị vào giữa và thêm 1 vào chữ số đầu: 9 + 5 = 14, được 1045.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Tìm x:',
      blanks: [
        { label: 'a) x : 11 = 25 → x = ...', answer: String(25 * 11) },
        { label: 'b) x : 11 = 78 → x = ...', answer: String(78 * 11) },
      ],
      hints: ['Số bị chia = thương × số chia. Nhân nhẩm với 11.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '3. Khối lớp Bốn xếp thành 17 hàng, mỗi hàng có 11 học sinh. Khối lớp Năm xếp thành 15 hàng, mỗi hàng cũng có 11 học sinh. Hỏi cả hai khối lớp có tất cả bao nhiêu học sinh?',
      blanks: [{ label: 'Cả hai khối lớp có tất cả ... học sinh.', answer: String((17 + 15) * 11) }],
      hints: ['Tính số học sinh mỗi khối (nhân nhẩm với 11) rồi cộng; hoặc tính tổng số hàng rồi nhân với 11.'],
    },
    {
      type: 'fill', stars: 3,
      q: '4. Phòng họp A có 12 dãy ghế, mỗi dãy ghế có 11 người ngồi. Phòng họp B có 14 dãy ghế, mỗi dãy ghế có 9 người ngồi. Trong các câu dưới đây, câu nào đúng, câu nào sai? (Đúng ghi Đ, sai ghi S)',
      blanks: [
        { label: 'a) Phòng họp A có nhiều hơn phòng họp B 9 người. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) Phòng họp A có nhiều hơn phòng họp B 6 người. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'c) Phòng họp A có ít hơn phòng họp B 6 người. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'd) Hai phòng họp có số người như nhau. ...', answer: 'S', validate: dsValidate(false) },
      ],
      hints: ['Tính số người mỗi phòng: phòng A 12 × 11, phòng B 14 × 9, rồi so sánh.'],
    },
  ],

  // ── Bài 62. Nhân với số có ba chữ số (trang 72–73) ─────────────────────────────────────────────
  'bai-62': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 248, 321), mul('b) ', 1163, 125), mul('c) ', 3124, 213)],
      hints: ['Ba tích riêng: tích riêng thứ hai lùi sang trái một cột, tích riêng thứ ba lùi sang trái hai cột, rồi cộng.'],
    },
    {
      type: 'table', stars: 3,
      q: '2. Viết giá trị của biểu thức vào ô trống:',
      headers: ['a', '262', '262', '263'], colWidths: ['16%', '28%', '28%', '28%'],
      rows: [
        ['b', '130', '131', '131'],
        ['a × b', blank(262 * 130), blank(262 * 131), blank(263 * 131)],
      ],
      calcs: ['262 × 130', '262 × 131', '263 × 131'],
      hints: ['Mỗi cột: nhân số a với số b ở cùng cột.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Tính diện tích của mảnh vườn hình vuông có cạnh dài 125m.',
      blanks: [{ label: `Diện tích mảnh vườn là: ... ${M2}`, answer: String(125 * 125) }],
      hints: ['Diện tích hình vuông = cạnh × cạnh.'],
    },
  ],

  // ── Bài 63. Nhân với số có ba chữ số (tiếp theo) (trang 73) ────────────────────────────────────
  'bai-63': [
    {
      type: 'fill', stars: 3,
      q: '1. Đặt tính rồi tính:',
      blanks: [mul('a) ', 523, 305), mul('b) ', 308, 563), mul('c) ', 1309, 202)],
      hints: ['Chữ số 0 ở hàng chục cho tích riêng toàn chữ số 0, không cần viết; tích riêng tiếp theo lùi sang trái hai cột.'],
    },
    {
      type: 'fill', stars: 3, img: imgDatTinh,
      q: '2. Đúng ghi Đ, sai ghi S:',
      blanks: [
        { label: 'a) 456 × 203 = 2280 ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) 456 × 203 = 10488 ...', answer: 'S', validate: dsValidate(false) },
        { label: 'c) 456 × 203 = 92568 ...', answer: 'Đ', validate: dsValidate(true) },
      ],
      hints: ['912 là 456 × 2 trăm, nên phải viết lùi sang trái hai cột so với tích riêng thứ nhất.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Trung bình mỗi con gà mái đẻ ăn hết 104g thức ăn trong một ngày. Hỏi trại chăn nuôi cần bao nhiêu ki-lô-gam thức ăn cho 375 con gà mái đẻ ăn trong 10 ngày?',
      blanks: [
        { label: '375 con gà ăn trong một ngày hết: ... g', answer: String(104 * 375) },
        multi('375 con gà ăn trong 10 ngày hết: ... g = ... kg', [104 * 375 * 10, 104 * 375 * 10 / 1000]),
      ],
      hints: ['Tính số thức ăn một ngày (104 × 375), rồi nhân với 10.', '1kg = 1000g.'],
    },
  ],

  // ── Bài 64. Luyện tập (trang 74) ───────────────────────────────────────────────────────────────
  'bai-64': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính:',
      blanks: [mul('a) ', 345, 200), mul('b) ', 237, 24), mul('c) ', 403, 346)],
      hints: ['Bấm ✍️ Tính để đặt tính rồi ghi kết quả vào ô.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '2. Tính:',
      blanks: [
        { label: 'a) 95 + 11 × 206 = ...', answer: String(95 + 11 * 206) },
        { label: 'b) 95 × 11 + 206 = ...', answer: String(95 * 11 + 206) },
        { label: 'c) 95 × 11 × 206 = ...', answer: String(95 * 11 * 206) },
      ],
      hints: ['Nhân trước, cộng sau. Có hai phép nhân thì tính từ trái sang phải.'],
    },
    {
      type: 'fill', stars: 3, calcFree: true,
      q: '3. Tính bằng cách thuận tiện nhất:',
      blanks: [
        { label: 'a) 142 × 12 + 142 × 18 = ...', answer: String(142 * 30) },
        { label: 'b) 49 × 365 − 39 × 365 = ...', answer: String(10 * 365) },
        { label: 'c) 4 × 18 × 25 = ...', answer: String(4 * 18 * 25) },
      ],
      hints: ['a), b) Đưa thừa số chung ra ngoài ngoặc: 142 × (12 + 18).', 'c) Nhóm 4 × 25 = 100.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Nhà trường dự định lắp bóng điện cho 32 phòng học, mỗi phòng 8 bóng. Nếu mỗi bóng điện giá 3500 đồng thì nhà trường phải trả bao nhiêu tiền để mua đủ số bóng điện lắp cho các phòng học?',
      blanks: [
        { label: 'Số bóng điện cần lắp là: ... bóng', answer: String(32 * 8) },
        { label: 'Nhà trường phải trả: ... đồng', answer: String(32 * 8 * 3500) },
      ],
      hints: ['Tính số bóng điện (32 × 8), rồi nhân với giá một bóng.'],
    },
    {
      type: 'fill', stars: 3,
      q: '5. Diện tích S của hình chữ nhật có chiều dài là a và chiều rộng là b được tính theo công thức:\nS = a × b (a, b cùng một đơn vị đo)\na) Tính S, biết: a = 12cm, b = 5cm ; a = 15m, b = 10m.\nb) Nếu gấp chiều dài lên 2 lần và giữ nguyên chiều rộng thì diện tích hình chữ nhật gấp lên mấy lần?',
      blanks: [
        { label: `a) Với a = 12cm, b = 5cm thì S = ... ${CM2}`, answer: '60' },
        { label: `Với a = 15m, b = 10m thì S = ... ${M2}`, answer: '150' },
        { label: 'b) Diện tích hình chữ nhật gấp lên ... lần.', answer: '2' },
      ],
      hints: ['Thay a, b vào công thức S = a × b.', 'b) Thử với a = 12cm, b = 5cm: gấp chiều dài thành 24cm rồi so sánh hai diện tích.'],
    },
  ],

  // ── Bài 65. Luyện tập chung (trang 75) ─────────────────────────────────────────────────────────
  'bai-65': [
    {
      type: 'fill', stars: 2,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 10kg = ... yến', answer: '1' }, { label: '50kg = ... yến', answer: '5' }, { label: '80kg = ... yến', answer: '8' },
        { label: '100kg = ... tạ', answer: '1' }, { label: '300kg = ... tạ', answer: '3' }, { label: '1200kg = ... tạ', answer: '12' },
        { label: 'b) 1000kg = ... tấn', answer: '1' }, { label: '8000kg = ... tấn', answer: '8' }, { label: '15 000kg = ... tấn', answer: '15' },
        { label: '10 tạ = ... tấn', answer: '1' }, { label: '30 tạ = ... tấn', answer: '3' }, { label: '200 tạ = ... tấn', answer: '20' },
        { label: `c) 100${CM2} = ... ${DM2}`, answer: '1' }, { label: `800${CM2} = ... ${DM2}`, answer: '8' }, { label: `1700${CM2} = ... ${DM2}`, answer: '17' },
        { label: `100${DM2} = ... ${M2}`, answer: '1' }, { label: `900${DM2} = ... ${M2}`, answer: '9' }, { label: `1000${DM2} = ... ${M2}`, answer: '10' },
      ],
      hints: ['1 yến = 10kg, 1 tạ = 100kg, 1 tấn = 1000kg = 10 tạ.', `1${DM2} = 100${CM2}, 1${M2} = 100${DM2}.`],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        mul('a) ', 268, 235), mul('', 324, 250), mul('b) ', 475, 205), mul('', 309, 207),
        { label: 'c) 45 × 12 + 8 = ...', answer: String(45 * 12 + 8) },
        { label: '45 × (12 + 8) = ...', answer: String(45 * (12 + 8)) },
      ],
      hints: ['c) Không có ngoặc: nhân trước, cộng sau. Có ngoặc: tính trong ngoặc trước.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính bằng cách thuận tiện nhất:',
      blanks: [
        { label: 'a) 2 × 39 × 5 = ...', answer: String(2 * 39 * 5) },
        { label: 'b) 302 × 16 + 302 × 4 = ...', answer: String(302 * 20) },
        { label: 'c) 769 × 85 − 769 × 75 = ...', answer: String(769 * 10) },
      ],
      hints: ['a) Nhóm 2 × 5 = 10.', 'b), c) Đưa thừa số chung ra ngoài ngoặc: 302 × (16 + 4).'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '4. Hai vòi nước cùng bắt đầu chảy vào một bể. Vòi thứ nhất mỗi phút chảy được 25l nước. Vòi thứ hai mỗi phút chảy được 15l nước. Hỏi sau 1 giờ 15 phút cả hai vòi đó chảy vào bể được bao nhiêu lít nước? (Giải bài toán bằng hai cách khác nhau).',
      blanks: [
        { label: '1 giờ 15 phút = ... phút', answer: '75' },
        { label: 'Cách 1: Vòi thứ nhất chảy được: ... l', answer: String(25 * 75) },
        { label: 'Vòi thứ hai chảy được: ... l', answer: String(15 * 75) },
        { label: 'Cả hai vòi chảy được: ... l', answer: String(40 * 75) },
        { label: 'Cách 2: Mỗi phút cả hai vòi chảy được: ... l', answer: '40' },
        { label: 'Sau 1 giờ 15 phút cả hai vòi chảy được: ... l', answer: String(40 * 75) },
      ],
      hints: ['1 giờ = 60 phút.', 'Cách 1: tính riêng từng vòi rồi cộng. Cách 2: tính cả hai vòi trong một phút rồi nhân với số phút.'],
    },
    {
      type: 'fill', stars: 3,
      q: '5. Một hình vuông có cạnh là a. Gọi S là diện tích của hình vuông.\na) Viết công thức tính diện tích của hình vuông đó.\nb) Tính diện tích của hình vuông khi a = 25m.',
      blanks: [
        { label: 'a) S = ...', answer: 'a × a', validate: formulaValidate('a×a') },
        { label: `b) Với a = 25m thì S = ... ${M2}`, answer: String(25 * 25), calc: '25 × 25' },
      ],
      hints: ['Diện tích hình vuông = cạnh × cạnh.'],
    },
  ],
};

// Nhãn ô điền là một dòng inline-flex: "cm" và "<sup>2</sup>" nằm riêng thì bị tách bởi khoảng cách giữa các phần.
// Gói mỗi đoạn chữ giữa các "..." vào một <span> để "48dm²" liền nhau.
for (const list of Object.values(QUESTIONS)) {
  for (const q of list) {
    for (const b of q.blanks || []) {
      if (b.label?.includes('<sup>')) b.label = b.label.split('...').map(p => (p.trim() ? `<span>${p}</span>` : p)).join('...');
    }
  }
}
