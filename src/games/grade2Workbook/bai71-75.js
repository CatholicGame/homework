/**
 * Vở bài tập Toán 2 — Tập hai: Bài 71–75 (sách trang 111–127).
 * Ôn tập phép nhân, phép chia; ôn tập hình học; ôn tập đo lường; ôn tập kiểm
 * đếm số liệu và lựa chọn khả năng; ôn tập chung.
 */
import {
  blank, sampleCell, mau, listValidate, letterValidate, letterGroupsValidate, stripVN,
} from '../grade3Workbook.js';
import imgB71Spiders from '../../assets/grade2-workbook/bai71_t1_q1_spiders.png';
import imgB71Ducks from '../../assets/grade2-workbook/bai71_t1_q1_ducks.png';
import imgB71Rabbits from '../../assets/grade2-workbook/bai71_t1_q1_rabbits.png';
import imgB71Ladybugs from '../../assets/grade2-workbook/bai71_t1_q1_ladybugs.png';
import imgB71Flow from '../../assets/grade2-workbook/bai71_t2_q3_flow.svg';
import imgB72Trap from '../../assets/grade2-workbook/bai72_t1_q1a_figure.svg';
import imgB72Square from '../../assets/grade2-workbook/bai72_t1_q1b_square.svg';
import imgB72Shapes from '../../assets/grade2-workbook/bai72_t1_q2_shapes.png';
import imgB72Points from '../../assets/grade2-workbook/bai72_t1_q3_figure.svg';
import imgB72Segments from '../../assets/grade2-workbook/bai72_t2_q1_segments.svg';
import imgB72Poly from '../../assets/grade2-workbook/bai72_t2_q3_polyline.svg';
import imgB72Ants from '../../assets/grade2-workbook/bai72_t2_q4_ants.svg';
import imgB72Bridge from '../../assets/grade2-workbook/bai72_t2_q5_bridge.png';
import imgB73Scales from '../../assets/grade2-workbook/bai73_t1_q2_scales.png';
import imgB73Cans from '../../assets/grade2-workbook/bai73_t1_q4_cans.png';
import imgB73Clock1 from '../../assets/grade2-workbook/bai73_t2_q3_clock1.svg';
import imgB73Clock2 from '../../assets/grade2-workbook/bai73_t2_q3_clock2.svg';
import imgB73Clock3 from '../../assets/grade2-workbook/bai73_t2_q3_clock3.svg';
import imgB73Clock4 from '../../assets/grade2-workbook/bai73_t2_q3_clock4.svg';
import imgB73Clocks from '../../assets/grade2-workbook/bai73_t2_q4_clocks.svg';
import imgB74Shapes from '../../assets/grade2-workbook/bai74_q1_shapes.svg';
import imgB74Chart from '../../assets/grade2-workbook/bai74_q2_chart.svg';
import imgB74Rabbits from '../../assets/grade2-workbook/bai74_q3_rabbits.png';
import imgB75Cows from '../../assets/grade2-workbook/bai75_t2_q2_cows.png';
import imgB75Triangle from '../../assets/grade2-workbook/bai75_t2_q3_triangle.svg';
import imgB75Seq from '../../assets/grade2-workbook/bai75_t2_q3_seq.png';
import imgB75OptA from '../../assets/grade2-workbook/bai75_t2_q3_optA.png';
import imgB75OptB from '../../assets/grade2-workbook/bai75_t2_q3_optB.png';
import imgB75OptC from '../../assets/grade2-workbook/bai75_t2_q3_optC.png';
import imgB75Poly from '../../assets/grade2-workbook/bai75_t2_q4_polyline.svg';

// ── Local helpers ────────────────────────────────────────────────────────────

// A blank row; with 2+ answers (one per "...") the slots are compared one by one.
function B(label, ...answers) {
  const answer = answers.map(String).join(',');
  return answers.length > 1 ? { label, answer, validate: listValidate(answers.map(String)) } : { label, answer };
}

// An arrow with its operation written above it in the book ("5 —×4→ ☐").
const ar = (op) => `<span style="white-space:nowrap">—${op}→</span>`;

const norm = (s) => String(s).replace(/\s+/g, '').replace(/[xX*]/g, '×').replace(/[÷/]/g, ':').replace(/[−–—]/g, '-');

// "a × b = a + a + … + a = p. Vậy a × b = p" (Bài 71 Tiết 1 Q2): slot 1 is the
// repeated sum (b terms of a), slots 2 and 3 the product.
function repSumValidate(a, n) {
  return (value) => {
    const [sum, r1, r2] = String(value).split(',');
    const terms = norm(sum).replace(/=.*$/, '').split('+');
    return terms.length === n && terms.every(t => t === String(a))
      && String(r1).trim() === String(a * n) && String(r2).trim() === String(a * n);
  };
}
const sumRow = (label, a, n) => ({
  label: `${label}${a} × ${n} = ... = ... Vậy ${a} × ${n} = ...`,
  answer: `${Array(n).fill(a).join(' + ')},${a * n},${a * n}`,
  validate: repSumValidate(a, n),
});

// The two divisions written from one multiplication (Bài 71 Tiết 1 Q3), in
// either order: 35 : 5 = 7 and 35 : 7 = 5.
function divPair(label, a, b) {
  const p = a * b;
  const target = [`${p}:${a}=${b}`, `${p}:${b}=${a}`].sort().join('|');
  return {
    label: `${label}${a} × ${b} = ${p} &nbsp;→ ... &nbsp;→ ...`,
    answer: `${p} : ${a} = ${b},${p} : ${b} = ${a}`,
    validate: (v) => String(v).split(',').map(norm).sort().join('|') === target,
  };
}

// Letters written as a list ("C, D, E", "C, D và E"), any order. `extra` letters
// (the book's own blue sample "A,") may be repeated or left out.
function lettersValidate(letters, extra = []) {
  const target = [...letters].sort().join('');
  return (value) => {
    const got = stripVN(value).toUpperCase().replace(/\bVA\b/g, ' ').replace(/[^A-Z]/g, '').split('')
      .filter(ch => !extra.includes(ch));
    return [...new Set(got)].sort().join('') === target && got.length === letters.length;
  };
}

// Several rows of "Điểm ..., điểm ... và điểm ..." (Bài 72 Tiết 1 Q3): each row
// is one set of 3 collinear points, rows in any order, letters in any order.
function pointTriplesValidate(triples) {
  const key = (arr) => arr.map(s => s.trim().toUpperCase()).sort().join('');
  const target = triples.map(key).sort().join('|');
  return (value) => {
    const v = String(value).split(',');
    const got = [];
    for (let i = 0; i < v.length; i += 3) got.push(key(v.slice(i, i + 3)));
    return got.sort().join('|') === target;
  };
}

// "786 = 700 + 80 + 6" (Bài 75 Tiết 1 Q2): the hundreds, tens, ones in order; a
// "+ 0" term for a zero digit may be written or left out.
function placeSumValidate(n) {
  const parts = [Math.floor(n / 100) * 100, Math.floor((n % 100) / 10) * 10, n % 10].filter(Boolean).join('+');
  return (value) => {
    const terms = norm(value).split('+').filter(t => t !== '0' && t !== '');
    return terms.join('+') === parts;
  };
}

// A unit word written in the blank ("cm", "dm", "m", "km").
const unitWord = (u) => (v) => String(v).trim().toLowerCase().replace(/\s+/g, '').replace(/\.$/, '') === u;

// A small figure shown inside a blank label (a second figure of one question).
const inlineFig = (src, w) => `<img class="e3-q-img" src="${src}" alt="" style="display:block;width:${w}px;max-width:100%;margin:6px 0">`;

const optImg = (src) => `<img src="${src}" alt="" style="height:56px;vertical-align:middle">`;

export const BAI_71_75 = [
  // ── BÀI 71 (trang 111–115) ────────────────────────────────────────────────
  {
    id: 'bai-71', number: 71, title: 'Ôn tập phép nhân, phép chia',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối (theo mẫu).\nMỗi nhóm con vật có bao nhiêu cái chân?',
        left: [
          { id: 'g1', img: imgB71Spiders }, { id: 'g2', img: imgB71Ducks },
          { id: 'g3', img: imgB71Rabbits }, { id: 'g4', img: imgB71Ladybugs },
        ],
        right: [
          { id: 'e1', text: '6 × 4 = 24' }, { id: 'e2', text: '4 × 3 = 12' },
          { id: 'e3', text: '8 × 3 = 24' }, { id: 'e4', text: '2 × 5 = 10' },
        ],
        pairs: [['g1', 'e3'], ['g2', 'e4'], ['g3', 'e2'], ['g4', 'e1']],
        hints: ['Mẫu: 3 con nhện, mỗi con 8 chân: 8 × 3 = 24.', 'Con vịt có 2 chân, con thỏ có 4 chân, con bọ rùa có 6 chân.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. Viết tích thành tổng các số hạng bằng nhau rồi tính (theo mẫu).\n${mau('6 × 4 = 6 + 6 + 6 + 6 = 24. Vậy 6 × 4 = 24.')}`,
        blanks: [sumRow('a) ', 4, 5), sumRow('b) ', 4, 6), sumRow('c) ', 10, 3)],
        hints: ['4 × 5 là 4 được lấy 5 lần.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `3. Viết phép chia thích hợp vào ô trống (theo mẫu).\n${mau('5 × 4 = 20 &nbsp;→ 20 : 5 = 4 &nbsp;→ 20 : 4 = 5')}`,
        blanks: [divPair('a) ', 5, 7), divPair('b) ', 2, 8), divPair('c) ', 2, 9)],
        hints: ['Lấy tích chia cho thừa số này thì được thừa số kia.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '4. Có 12 kg đường chia đều vào 2 túi. Hỏi mỗi túi có mấy ki-lô-gam đường?',
        blanks: [{ label: 'Số ki-lô-gam đường mỗi túi', answer: '6' }],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nMỗi lọ hoa có 5 bông hồng và 2 bông cúc. Hỏi 6 lọ hoa như vậy có:',
        rows: [
          { left: 'a) Bao nhiêu bông hoa hồng?', options: ['A. 25 bông', 'B. 30 bông', 'C. 35 bông'], answer: 'B' },
          { left: 'b) Bao nhiêu bông hoa cúc?', options: ['A. 14 bông', 'B. 12 bông', 'C. 10 bông'], answer: 'B' },
        ],
        hints: ['5 bông được lấy 6 lần; 2 bông được lấy 6 lần.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['Thừa số', 2, 2, 2, 5, 5, 5],
              ['Thừa số', 6, 7, 8, 4, 5, 9],
              ['Tích', blank(12), blank(14), blank(16), blank(20), blank(25), blank(45)],
            ],
          },
          {
            label: 'b)',
            rows: [
              ['Số bị chia', 12, 14, 16, 15, 30, 45],
              ['Số chia', 2, 2, 2, 5, 5, 5],
              ['Thương', blank(6), blank(7), blank(8), blank(3), blank(6), blank(9)],
            ],
          },
        ],
        hints: ['Dùng bảng nhân 2, bảng nhân 5 và bảng chia 2, bảng chia 5.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).\nMỗi chìa khoá mở được ổ khoá nào?',
        left: [
          { id: 'l1', text: '🔒 12 : 2' }, { id: 'l2', text: '🔒 2 × 4' }, { id: 'l3', text: '🔒 10 : 2' },
          { id: 'l4', text: '🔒 2 × 5' }, { id: 'l5', text: '🔒 20 : 5' },
        ],
        right: [
          { id: 'k1', text: '🔑 40 : 5' }, { id: 'k2', text: '🔑 2 × 3' }, { id: 'k3', text: '🔑 20 : 2' },
          { id: 'k4', text: '🔑 2 × 2' }, { id: 'k5', text: '🔑 5 × 1' },
        ],
        pairs: [['l1', 'k2'], ['l2', 'k1'], ['l3', 'k5'], ['l4', 'k3'], ['l5', 'k4']],
        hints: ['Mẫu: 12 : 2 = 6 và 2 × 3 = 6, nên chìa 2 × 3 mở ổ 12 : 2.', 'Chìa và ổ khoá có kết quả bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB71Flow,
        q: '3. Số?',
        blanks: [
          B('Ô bên phải, hàng trên: ...', 20),
          B('Ô bên trái, hàng dưới: ...', 8),
          B('Ô bên phải, hàng dưới: ...', 4),
        ],
        hints: ['Đi theo chiều mũi tên, làm phép tính ghi trên mũi tên.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Mỗi chuyến hàng chở vào miền Trung giúp đỡ đồng bào bị lũ lụt có 5 ô tô chở hàng. Hỏi 3 chuyến hàng như vậy có bao nhiêu ô tô chở hàng?',
        blanks: [{ label: 'Số ô tô chở hàng', answer: '15' }],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Cứ 5 thanh tre dài bằng nhau, Rô-bốt đan được một ngôi sao 5 cánh. Hỏi phải dùng bao nhiêu thanh tre như vậy để đan được 4 ngôi sao 5 cánh?',
        blanks: [{ label: 'Số thanh tre', answer: '20' }],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['', sampleCell(2), 2, 2, 5, 5, 5],
              ['×', sampleCell(7), 6, 5, 4, 3, 2],
              ['', sampleCell(14), blank(12), blank(10), blank(20), blank(15), blank(10)],
            ],
          },
          {
            label: 'b)',
            rows: [
              ['', sampleCell(14), 16, 18, 40, 45],
              [':', sampleCell(2), 2, 2, 5, 5],
              ['', sampleCell(7), blank(8), blank(9), blank(8), blank(9)],
            ],
          },
        ],
        hints: ['Mẫu: 2 × 7 = 14; 14 : 2 = 7.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Thỏ vào được chuồng khi kết quả của phép tính ghi trên thỏ bằng số ghi ở chuồng đó.\na) Nối mỗi con thỏ với chuồng nó được vào (theo mẫu).',
        left: [
          { id: 'r1', text: '🐇 12 : 2' }, { id: 'r2', text: '🐇 10 : 2' }, { id: 'r3', text: '🐇 5 × 1' },
          { id: 'r4', text: '🐇 2 × 3' }, { id: 'r5', text: '🐇 2 × 5' }, { id: 'r6', text: '🐇 50 : 5' },
          { id: 'r7', text: '🐇 30 : 5' }, { id: 'r8', text: '🐇 3 × 2' }, { id: 'r9', text: '🐇 20 : 4' },
          { id: 'r10', text: '🐇 20 : 2' },
        ],
        right: [{ id: 'h6', text: '🏠 6' }, { id: 'h5', text: '🏠 5' }, { id: 'h10', text: '🏠 10' }],
        pairs: [
          ['r1', 'h6'], ['r2', 'h5'], ['r3', 'h5'], ['r4', 'h6'], ['r5', 'h10'],
          ['r6', 'h10'], ['r7', 'h6'], ['r8', 'h6'], ['r9', 'h5'], ['r10', 'h10'],
        ],
        hints: ['Mẫu: 2 × 3 = 6, thỏ vào chuồng số 6.', 'Tính kết quả trên từng con thỏ trước.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '2. b) Khoanh vào chữ đặt trước câu trả lời đúng.\n(Các con thỏ: 12 : 2; 10 : 2; 5 × 1; 2 × 3; 2 × 5; 50 : 5; 30 : 5; 3 × 2; 20 : 4; 20 : 2.)',
        rows: [{ left: 'Chuồng nào có nhiều thỏ được vào nhất?', options: ['A. Chuồng số 6', 'B. Chuồng số 5', 'C. Chuồng số 10'], answer: 'A' }],
        hints: ['Đếm số thỏ vào mỗi chuồng ở câu a).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Số?',
        blanks: [
          B(`a) 5 ${ar('× 4')} ... ${ar(': 2')} ...`, 20, 10),
          B(`b) 2 ${ar('× 9')} ... ${ar('+ 17')} ... ${ar(': 5')} ...`, 18, 35, 7),
        ],
        hints: ['Làm lần lượt từng phép tính theo chiều mũi tên.'],
      },
      {
        type: 'fill', section: 'Tiết 3', wordProblem: true,
        q: '4. Trong nhà để xe có 10 xe máy. Hỏi có tất cả bao nhiêu bánh xe máy?',
        blanks: [{ label: 'Số bánh xe máy', answer: '20' }],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong chuồng có cả gà và thỏ. Biết cả gà và thỏ có 10 cái chân và số gà nhiều hơn số thỏ. Hỏi trong chuồng có bao nhiêu con gà?',
        rows: [{ left: 'Số con gà là:', options: ['A. 6 con gà', 'B. 3 con gà', 'C. 2 con gà'], answer: 'B' }],
        hints: ['Gà có 2 chân, thỏ có 4 chân. Thử từng đáp án: đủ 10 chân và gà nhiều hơn thỏ không?'],
      },
    ],
  },

  // ── BÀI 72 (trang 116–119) ────────────────────────────────────────────────
  {
    id: 'bai-72', number: 72, title: 'Ôn tập hình học',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB72Trap,
        q: '1. Số?',
        blanks: [
          B('a) Trong hình bên:<br>• Có ... đoạn thẳng;', 7),
          B('• Có ... hình tam giác;', 1),
          B('• Có ... hình tứ giác.', 2),
          B(`b) Trong hình bên:<br>${inlineFig(imgB72Square, 170)}<br>• Có ... đoạn thẳng;`, 4),
          // 4 cung + 4 chữ S + 1 hình tròn = 9; nếu không tính hình tròn là 8 — chấp nhận cả hai.
          { ...B('• Có ... đường cong.', 9), validate: (v) => ['9', '8'].includes(String(v).trim()) },
        ],
        hints: ['a) Trên cạnh AC có điểm B ở giữa: đừng quên các đoạn AB, BC và AC.', 'b) Đếm cả hình tròn ở giữa và các nét chữ S.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB72Shapes,
        q: '2. Cho các hình A, B, C, D, E như sau:\nViết tiếp vào chỗ chấm cho thích hợp (theo mẫu).',
        blanks: [
          { label: 'a) Những hình không là khối trụ: <span class="gw-sample-text">A,</span> ...', answer: 'C, D, E', validate: lettersValidate(['C', 'D', 'E'], ['A']) },
          { label: 'b) Những hình không là khối cầu: ...', answer: 'A, B, C, D', validate: lettersValidate(['A', 'B', 'C', 'D']) },
        ],
        hints: ['Hình B là khối trụ, hình E là khối cầu.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB72Points,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp (theo mẫu).\nBa điểm thẳng hàng trong hình vẽ là:\n• Điểm <span class="gw-sample-text">A</span>, điểm <span class="gw-sample-text">O</span> và điểm <span class="gw-sample-text">D</span>;',
        blanks: [{
          label: '• Điểm ..., điểm ... và điểm ...;<br>• Điểm ..., điểm ... và điểm ...',
          answer: 'B,O,E,E,D,C',
          validate: pointTriplesValidate([['B', 'O', 'E'], ['E', 'D', 'C']]),
        }],
        hints: ['Tìm ba điểm cùng nằm trên một đường thẳng, giống A, O, D.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Segments,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nĐo độ dài các đoạn thẳng rồi cho biết đoạn thẳng nào dài nhất, đoạn thẳng nào ngắn nhất.',
        blanks: [
          { label: '• Đoạn thẳng dài nhất là ...', answer: 'EG', validate: letterGroupsValidate(['EG']) },
          { label: '• Đoạn thẳng ngắn nhất là ...', answer: 'AB', validate: letterGroupsValidate(['AB']) },
        ],
        hints: ['Đặt thước (hoặc mép tờ giấy) dọc theo từng đoạn thẳng để so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Poly,
        q: '3. Số?',
        blanks: [
          B('a) Độ dài đường gấp khúc ABC là ... cm.', 27),
          B('b) Độ dài đường gấp khúc BCD là ... cm.', 28),
          B('c) Độ dài đường gấp khúc ABCD là ... cm.', 41),
        ],
        hints: ['Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Ants,
        q: '4. Số?\nKiến xám đến đĩa kẹo theo đường MNPQO. Kiến đen đến đĩa kẹo theo đường ABCDEGHO.',
        blanks: [
          B('a) Độ dài đường đi của kiến xám là ... cm.', 16),
          B('b) Độ dài đường đi của kiến đen là ... cm.', 15),
          B('c) Tổng độ dài đường đi của hai con kiến là ... cm.', 31),
        ],
        hints: ['Mỗi cạnh ô vuông dài 1 cm. Đếm số cạnh ô vuông trên từng đoạn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB72Bridge, wordProblem: true,
        q: '5. Cây cầu là đường gấp khúc ABCD dài 130 m. Tính độ dài đoạn cầu nằm ngang BC, biết tổng độ dài hai đoạn cầu AB và CD là 80 m.',
        blanks: [{ label: 'Độ dài đoạn cầu BC (m)', answer: '50' }],
      },
    ],
  },

  // ── BÀI 73 (trang 120–122) ────────────────────────────────────────────────
  {
    id: 'bai-73', number: 73, title: 'Ôn tập đo lường',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) 25 kg + 18 kg = ... kg', 43),
          B('43 kg – 18 kg = ... kg', 25),
          B('43 kg – 25 kg = ... kg', 18),
          B('b) 27 <i>l</i> + 8 <i>l</i> = ... <i>l</i>', 35),
          B('35 <i>l</i> – 8 <i>l</i> = ... <i>l</i>', 27),
          B('35 <i>l</i> – 7 <i>l</i> = ... <i>l</i>', 28),
          B('c) 2 kg × 2 = ... kg', 4),
          B('4 kg : 2 = ... kg', 2),
          B('d) 5 <i>l</i> × 5 = ... <i>l</i>', 25),
          B('25 <i>l</i> : 5 = ... <i>l</i>', 5),
        ],
        hints: ['Tính như với số, rồi viết thêm tên đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB73Scales,
        q: '2. Số?',
        blanks: [B('a) Con mèo cân nặng ... kg.', 7), B('b) Quả dưa cân nặng ... kg.', 3)],
        hints: ['Cân thăng bằng: hai đĩa cân nặng bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Giải bài toán theo tóm tắt sau:\n<i>Tóm tắt</i>\nCon bò cân nặng: 250 kg\nCon trâu nặng hơn con bò: 92 kg\nCon trâu cân nặng: ... kg?',
        blanks: [{ label: 'Con trâu cân nặng (kg)', answer: '342' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB73Cans,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nCác can đựng số lít nước như sau:',
        blanks: [
          B('a) Can đựng nhiều nước nhất hơn can đựng ít nước nhất là ... <i>l</i> nước.', 8),
          { label: 'b) Muốn lấy 2 can để được 7 <i>l</i> nước thì cần lấy: can B và can ...', answer: 'D', validate: letterValidate('D') },
          {
            label: 'c) Muốn lấy được 10 <i>l</i> nước thì cần lấy các can: ...',
            answer: 'B, C, D',
            validate: (v) => lettersValidate(['B', 'C', 'D'])(v) || lettersValidate(['A'])(v),
          },
        ],
        hints: ['Can A đựng 10 l, can B 2 l, can C 3 l, can D 5 l.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết <span class="gw-sample-text"><i>cm</i>, <i>dm</i>, <i>m</i>, <i>km</i></span> thích hợp vào chỗ chấm trong các câu sau:',
        blanks: [
          { label: 'a) Bút sáp màu dài khoảng 10 ...', answer: 'cm', validate: unitWord('cm') },
          { label: 'b) Cột cờ cao khoảng 10 ...', answer: 'm', validate: unitWord('m') },
          { label: 'c) Gang tay của cô Hòa dài khoảng 2 ...', answer: 'dm', validate: unitWord('dm') },
          { label: 'd) Quãng đường từ nhà Mai đến trường dài khoảng 2 ...', answer: 'km', validate: unitWord('km') },
        ],
        hints: ['1 dm = 10 cm, 1 m = 10 dm, 1 km = 1000 m.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) 25 <i>l</i> + 17 <i>l</i> = ... <i>l</i>', 42),
          B('42 <i>l</i> – 25 <i>l</i> = ... <i>l</i>', 17),
          B('42 <i>l</i> – 17 <i>l</i> = ... <i>l</i>', 25),
          B('b) 2 kg × 5 = ... kg', 10),
          B('10 kg : 5 = ... kg', 2),
          B('10 kg : 2 = ... kg', 5),
          B('c) 30 m + 43 m = ... m', 73),
          B('73 m – 30 m = ... m', 43),
          B('73 m – 43 m = ... m', 30),
          B('d) 5 km × 2 = ... km', 10),
          B('10 km : 2 = ... km', 5),
          B('10 km : 5 = ... km', 2),
        ],
        hints: ['Tính như với số, rồi viết thêm tên đơn vị.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. a) Nối (theo mẫu).\nVào buổi chiều hoặc buổi tối, hai đồng hồ nào chỉ cùng giờ?',
        left: [
          { id: 'c1', img: imgB73Clock1 }, { id: 'c2', img: imgB73Clock2 },
          { id: 'c3', img: imgB73Clock3 }, { id: 'c4', img: imgB73Clock4 },
        ],
        right: [
          { id: 'd1', text: '18 : 15' }, { id: 'd2', text: '14 : 30' },
          { id: 'd3', text: '22 : 00' }, { id: 'd4', text: '19 : 30' },
        ],
        pairs: [['c1', 'd2'], ['c2', 'd3'], ['c3', 'd1'], ['c4', 'd4']],
        hints: ['Mẫu: 2 giờ 30 phút chiều là 14 giờ 30 phút.', 'Buổi chiều, buổi tối: cộng thêm 12 vào số giờ.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. b) Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{
          left: 'Nếu hôm nay là thứ Năm, ngày 14 tháng 5. Hỏi thứ Năm tuần trước là ngày nào?',
          options: ['A. Ngày 9 tháng 5', 'B. Ngày 8 tháng 5', 'C. Ngày 7 tháng 5'], answer: 'C',
        }],
        hints: ['Một tuần lễ có 7 ngày.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB73Clocks,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nGiờ vào lớp học hát là 7 giờ 15 phút. Giờ đến lớp của các bạn rùa, thỏ, sóc như sau:',
        rows: [
          { left: 'a) Bạn nào đến lớp muộn sau giờ vào học?', options: ['A. Rùa', 'B. Thỏ', 'C. Sóc'], answer: 'B' },
          { left: 'b) Bạn nào đến lớp sớm trước giờ vào học?', options: ['A. Rùa', 'B. Thỏ', 'C. Sóc'], answer: 'C' },
          { left: 'c) Bạn nào đến lớp đúng giờ vào học?', options: ['A. Rùa', 'B. Thỏ', 'C. Sóc'], answer: 'A' },
        ],
        hints: ['Đọc giờ trên từng đồng hồ rồi so với 7 giờ 15 phút.'],
      },
    ],
  },

  // ── BÀI 74 (trang 123–124) ────────────────────────────────────────────────
  {
    id: 'bai-74', number: 74, title: 'Ôn tập kiểm đếm số liệu và lựa chọn khả năng',
    questions: [
      {
        type: 'table', img: imgB74Shapes, blanksFirst: true,
        q: '1. Dưới đây là các hình vuông, hình tròn, hình tam giác mà bạn Nam cắt được:\na) Số?\nEm ước lượng xem cả ba loại (hình tròn, hình vuông, hình tam giác), bạn Nam cắt tất cả được khoảng mấy chục hình rồi đếm lại.',
        blanks: [
          B('• Em ước lượng có tất cả khoảng ... chục hình.', 3),
          B('• Em đếm được có tất cả ... hình.', 28),
        ],
        tables: [{
          label: 'b) Số?',
          headers: ['Hình', 'Hình vuông', 'Hình tròn', 'Hình tam giác'],
          rows: [['Số hình', blank(10), blank(11), blank(7)]],
        }],
        hints: ['Phần khoanh nét đứt có khoảng 1 chục hình.', 'Đếm từng loại, đánh dấu hình đã đếm để không bỏ sót.'],
      },
      {
        type: 'compare', img: imgB74Shapes,
        q: '1. c) Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [{ left: 'Hình nào có nhiều nhất?', options: ['A. Hình vuông', 'B. Hình tròn', 'C. Hình tam giác'], answer: 'B' }],
        hints: ['Dùng số hình đếm được ở câu b).'],
      },
      {
        type: 'fill', img: imgB74Chart,
        q: '2. Mai đã vẽ được 10 hình tròn, 9 hình vuông và 10 hình tam giác. Em hãy vẽ thêm các hình tròn, hình vuông, hình tam giác vào biểu đồ tranh sau cho thích hợp:\nSỐ HÌNH BẠN MAI ĐÃ VẼ ĐƯỢC\n(Viết số hình em cần vẽ thêm vào mỗi cột.)',
        blanks: [
          B('Hình tròn: vẽ thêm ... hình', 1),
          B('Hình vuông: vẽ thêm ... hình', 2),
          B('Hình tam giác: vẽ thêm ... hình', 2),
        ],
        hints: ['Đếm số hình đã có ở mỗi cột, rồi so với số hình Mai đã vẽ.'],
      },
      {
        type: 'compare', img: imgB74Rabbits,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nCó 3 con thỏ chạy vào cả hai chuồng Ⓜ và Ⓝ, chuồng nào cũng có thỏ.\nKhả năng nào xảy ra trong mỗi trường hợp sau:',
        rows: [
          { left: 'a) Chuồng Ⓜ có 2 con thỏ.', options: ['A. Có thể', 'B. Không thể', 'C. Chắc chắn'], answer: 'A' },
          { left: 'b) Chuồng Ⓝ có 3 con thỏ.', options: ['A. Có thể', 'B. Không thể', 'C. Chắc chắn'], answer: 'B' },
          { left: 'c) Chuồng Ⓝ có ít nhất 1 con thỏ.', options: ['A. Có thể', 'B. Không thể', 'C. Chắc chắn'], answer: 'C' },
        ],
        hints: ['Chuồng nào cũng có ít nhất 1 con thỏ.'],
      },
    ],
  },

  // ── BÀI 75 (trang 125–127) ────────────────────────────────────────────────
  {
    id: 'bai-75', number: 75, title: 'Ôn tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Số gồm 3 trăm, 6 chục và 7 đơn vị là ...', 367),
          B('b) Số gồm 2 trăm, 8 chục và 8 đơn vị là ...', 288),
          B('c) Số gồm 7 trăm, 0 chục và 3 đơn vị là ...', 703),
          B('d) Số gồm 5 trăm, 9 chục và 0 đơn vị là ...', 590),
        ],
        hints: ['Viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. Viết số thành tổng các trăm, chục, đơn vị (theo mẫu).\n${mau('576 = 500 + 70 + 6.')}`,
        blanks: [
          { label: '786 = ...', answer: '700 + 80 + 6', validate: placeSumValidate(786) },
          { label: '425 = ...', answer: '400 + 20 + 5', validate: placeSumValidate(425) },
          { label: '650 = ...', answer: '600 + 50', validate: placeSumValidate(650) },
          { label: '902 = ...', answer: '900 + 2', validate: placeSumValidate(902) },
        ],
        hints: ['Tách số thành trăm, chục, đơn vị như mẫu.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Cho các số 263; 326; 236; 362.',
        blanks: [
          { label: 'a) Viết các số đã cho theo thứ tự:<br>• Từ bé đến lớn: ...', answer: '236, 263, 326, 362', validate: listValidate(['236', '263', '326', '362']) },
          { label: '• Từ lớn đến bé: ...', answer: '362, 326, 263, 236', validate: listValidate(['362', '326', '263', '236']) },
          B('b) Viết số thích hợp vào chỗ chấm.<br>Trong bốn số đã cho, số lớn nhất là ...; số bé nhất là ...', 362, 236),
        ],
        hints: ['So sánh chữ số hàng trăm trước, rồi đến hàng chục.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '4. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['Thừa số', 2, 2, 2, 2, 5, 5, 5, 5],
              ['Thừa số', 6, 7, 8, 9, 5, 4, 3, 2],
              ['Tích', blank(12), blank(14), blank(16), blank(18), blank(25), blank(20), blank(15), blank(10)],
            ],
          },
          {
            label: 'b)',
            rows: [
              ['Số bị chia', 25, 35, 45, 50, 18, 16, 14, 20],
              ['Số chia', 5, 5, 5, 5, 2, 2, 2, 2],
              ['Thương', blank(5), blank(7), blank(9), blank(10), blank(9), blank(8), blank(7), blank(10)],
            ],
          },
        ],
        hints: ['Dùng bảng nhân 2, bảng nhân 5 và bảng chia 2, bảng chia 5.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '5. Ngày thứ nhất, nhà Biển làm được 150 <i>l</i> nước mắm. Ngày thứ hai, nhà Biển làm được nhiều hơn ngày thứ nhất 65 <i>l</i> nước mắm. Hỏi ngày thứ hai nhà Biển làm được bao nhiêu lít nước mắm?',
        blanks: [{ label: 'Số lít nước mắm ngày thứ hai', answer: '215' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [B('47 + 26 = ...', 73), B('247 + 172 = ...', 419), B('82 – 48 = ...', 34), B('543 – 109 = ...', 434)],
        hints: ['Viết các chữ số cùng hàng thẳng cột, tính từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB75Cows,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          B('a) Con bò A và con bò D cân nặng tất cả là ... kg.', 763),
          B('b) Con bò B nặng hơn con bò C là ... kg.', 3),
        ],
        hints: ['“Tất cả” là phép cộng; “nặng hơn … là” là phép trừ.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB75Triangle,
        q: '3. a) Số?\nTrong hình bên:',
        blanks: [B('• Có ... hình tam giác;', 5), B('• Có ... hình tứ giác.', 6)],
        hints: ['Đếm cả các hình ghép từ 2 hoặc 3 hình nhỏ.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB75Seq,
        q: '3. b) Khoanh vào chữ đặt trước câu trả lời đúng.\nHình thích hợp đặt vào dấu “?” là:',
        options: [optImg(imgB75OptA), optImg(imgB75OptB), optImg(imgB75OptC)],
        answer: 1,
        hints: ['Các hình lặp lại theo một thứ tự.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB75Poly,
        q: '4. Viết số thích hợp vào chỗ chấm.\nCho đường gấp khúc ABCD như hình vẽ.',
        blanks: [
          B('a) Đoạn thẳng AB dài hơn đoạn thẳng BC là ... m.', 9),
          B('b) Độ dài đường gấp khúc ABCD là ... m.', 140),
        ],
        hints: ['Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Tàu thứ nhất chở 26 khách du lịch. Tàu thứ hai chở nhiều hơn tàu thứ nhất 4 khách du lịch. Hỏi tàu thứ hai chở bao nhiêu khách du lịch?',
        blanks: [{ label: 'Số khách du lịch tàu thứ hai', answer: '30' }],
      },
    ],
  },
];
