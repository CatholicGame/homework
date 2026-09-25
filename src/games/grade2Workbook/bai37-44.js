/**
 * Vở bài tập Toán 2 — Tập hai: Bài 37–44 (sách trang 3–23).
 * Phép nhân, thừa số – tích, bảng nhân 2 và 5, phép chia, số bị chia – số chia –
 * thương, bảng chia 2 và 5.
 */
import {
  blank, sampleCell, mau, listValidate, letterValidate, exprValidate, swapPairValidate,
} from '../grade3Workbook.js';
import imgB37T1Q1 from '../../assets/grade2-workbook/bai37_t1_q1_dice.svg';
import imgB37G5x3 from '../../assets/grade2-workbook/bai37_t1_q2_g5x3.svg';
import imgB37G6x4 from '../../assets/grade2-workbook/bai37_t1_q2_g6x4.svg';
import imgB37G10x2 from '../../assets/grade2-workbook/bai37_t1_q2_g10x2.svg';
import imgB37G4x3 from '../../assets/grade2-workbook/bai37_t1_q2_g4x3.svg';
import imgB37G5x6 from '../../assets/grade2-workbook/bai37_t1_q2_g5x6.svg';
import imgB37T1Q3 from '../../assets/grade2-workbook/bai37_t1_q3_fans.png';
import imgB37Rabbits from '../../assets/grade2-workbook/bai37_t2_q2_rabbits.png';
import imgB37Chicks from '../../assets/grade2-workbook/bai37_t2_q2_chicks.png';
import imgB37Beetles from '../../assets/grade2-workbook/bai37_t2_q2_beetles.png';
import imgB37Spiders from '../../assets/grade2-workbook/bai37_t2_q2_spiders.png';
import imgB37Ladybugs from '../../assets/grade2-workbook/bai37_t2_q2_ladybugs.png';
import imgB38Jugs from '../../assets/grade2-workbook/bai38_t1_q2_jugs.png';
import imgB38Cans5 from '../../assets/grade2-workbook/bai38_t1_q2_cans5.png';
import imgB38Cans3 from '../../assets/grade2-workbook/bai38_t1_q2_cans3.png';
import imgB38Bottles from '../../assets/grade2-workbook/bai38_t1_q2_bottles.png';
import imgB38T2Q3 from '../../assets/grade2-workbook/bai38_t2_q3_cars.png';
import imgB38T2Q4 from '../../assets/grade2-workbook/bai38_t2_q4_balls.png';
import imgB39T2Q4 from '../../assets/grade2-workbook/bai39_t2_q4_farm.png';
import imgB40T1Q3 from '../../assets/grade2-workbook/bai40_t1_q3_lanterns.png';
import imgB41T1Q1 from '../../assets/grade2-workbook/bai41_t1_q1_trungthu.png';
import imgB41T2Q3 from '../../assets/grade2-workbook/bai41_t2_q3_bars.svg';
import imgB41T2Q4 from '../../assets/grade2-workbook/bai41_t2_q4_robot.png';
import imgB42T2Q4 from '../../assets/grade2-workbook/bai42_t2_q4_flowers.png';
import imgB43T2Q4 from '../../assets/grade2-workbook/bai43_t2_q4_socks.png';

// ── Local helpers ────────────────────────────────────────────────────────────

// A blank row; with 2+ answers (one per "...") the slots are compared one by
// one (the engine's default compare only reads the first two slots correctly).
function B(label, ...answers) {
  const answer = answers.map(String).join(',');
  return answers.length > 1 ? { label, answer, validate: listValidate(answers.map(String)) } : { label, answer };
}

// An arrow with its operation written above it in the book ("5 —×3→ ☐").
const ar = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1;vertical-align:middle;margin:0 4px"><span style="font-size:.85em">${op.replace(/^([×:+−])/, '$1 ')}</span><span style="font-size:1.3em">⟶</span></span>`;

const norm = (s) => String(s).replace(/\s+/g, '').replace(/[xX*]/g, '×').replace(/[÷/]/g, ':').replace(/[−–—]/g, '-');

// "a + a + … + a" (n terms), optionally followed by "= a·n", as written on the
// book's dotted line ("3 × 7 = 3 + 3 + 3 + 3 + 3 + 3 + 3 = 21"). Any further
// slots on the row must hold the value a·n.
function repSumOk(s, a, n) {
  const [lhs, res, extra] = norm(s).split('=');
  if (extra !== undefined) return false;
  const terms = lhs.split('+');
  if (terms.length !== n || terms.some(t => t !== String(a))) return false;
  return res === undefined || res === String(a * n);
}
function repSumValidate(a, n) {
  return (value) => {
    const [first, ...rest] = String(value).split(',');
    return repSumOk(first, a, n) && rest.every(v => v.trim() === String(a * n));
  };
}
const repSum = (a, n, sep = ' + ') => Array(n).fill(a).join(sep);
// Compact form for dotted-line slots: the slot is sized from the answer's
// length (capped at 24ch), so "3+3+3+3+3+3+3+3 = 24" still fits when typed.
const repSumC = (a, n) => repSum(a, n, '+');
// "a) 5 × 3 = ....... = ..... Vậy 5 × 3 = ....." (Bài 37, 38: "Tính (theo mẫu)").
const sumRow = (label, a, n) => ({
  label: `${label}${a} × ${n} = ... = ... Vậy ${a} × ${n} = ...`,
  answer: `${repSumC(a, n)},${a * n},${a * n}`,
  validate: repSumValidate(a, n),
});
// A table cell holding a repeated addition ("2 + 2 + 2 + 2 + 2 + 2 = 12").
const sumCell = (a, n) => blank(`${repSum(a, n)} = ${a * n}`, { validate: repSumValidate(a, n) });
// A table cell holding a multiplication ("2 × 6 = 12"), with or without the result.
const mulCell = (a, b) => blank(`${a} × ${b} = ${a * b}`, { validate: exprValidate(`${a}×${b}=${a * b}`, `${a}×${b}`) });

// Several "☐ × ☐ = ☐" (or "☐ : ☐ = ☐") frames the child builds from given
// numbers (Bài 38, 39, 44): each frame must be one of the expected facts, in
// any order of the frames, and no fact may be written twice. For × the two
// factors may come in either order.
function factsValidate(facts, op) {
  const key = (a, b, c) => (op === '×' ? [a, b].sort().join('×') : `${a}:${b}`) + '=' + c;
  const target = facts.map(([a, b, c]) => key(String(a), String(b), String(c))).sort().join('|');
  return (value) => {
    const v = String(value).split(',').map(s => s.trim().replace(/^0+(?=\d)/, ''));
    if (v.length !== facts.length * 3) return false;
    const got = [];
    for (let i = 0; i < v.length; i += 3) got.push(key(v[i], v[i + 1], v[i + 2]));
    return got.sort().join('|') === target;
  };
}
const facts3 = (n, op) => Array(n).fill(`... ${op} ... = ...`).join('<br>');

// Two divisions from one multiplication (Bài 41): "p : ☐ = ☐" then "☐ : ☐ = ☐".
// The first may use either factor; the second must be the other division.
function divPairValidate(p, a, b) {
  return (value) => {
    const [x, y, z, u, w] = String(value).split(',').map(s => s.trim());
    const firstOk = (x === String(a) && y === String(b)) || (x === String(b) && y === String(a));
    return firstOk && z === String(p) && u === y && w === x;
  };
}

// Rows of two slots whose pairs must be exactly the given ones, in any order
// (Bài 42 Tiết 2 Q4: "15 : ☐ = ☐" twice → 15 : 3 = 5 and 15 : 5 = 3).
function pairsValidate(pairs) {
  const target = pairs.map(p => p.join(':')).sort().join('|');
  return (value) => {
    const v = String(value).split(',').map(s => s.trim());
    const got = [];
    for (let i = 0; i < v.length; i += 2) got.push(`${v[i]}:${v[i + 1]}`);
    return got.length === pairs.length && got.sort().join('|') === target;
  };
}

// Bài 42 Tiết 2 Q3: the table in b) copies the two divisions written in a) as
// (A) and (B) — whichever order the child chose there — so each cell is
// checked against the a) slot it copies. The a) frames themselves are graded
// by factsValidate on the same "Kiểm tra".
const b42aSlot = (i) => {
  const inputs = document.querySelectorAll('#e3-blanks .e3-blank-input');
  return inputs[i] ? inputs[i].value.trim() : '';
};
const b42Cell = (answer, i) => blank(answer, { validate: (v) => v.trim() !== '' && v.trim() === b42aSlot(i) });

export const BAI_37_44 = [
  // ── BÀI 37 (trang 3–5) ────────────────────────────────────────────────────
  {
    id: 'bai-37', number: 37, title: 'Phép nhân',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB37T1Q1,
        q: '1. a) Số?',
        blanks: [
          B('3 + 3 + 3 + 3 = ...', 12),
          B('3 × 4 = ...', 12),
          B('3 + 3 + 3 + 3 + 3 = ...', 15),
          B('3 × ... = ...', 5, 15),
          B('3 + 3 + 3 = ...', 9),
          B('3 × ... = ...', 3, 9),
          B('3 + 3 + 3 + 3 + 3 + 3 = ...', 18),
          B('3 × ... = ...', 6, 18),
          {
            label: `b) Viết vào chỗ chấm (theo mẫu).<br>${mau('3 × 4 = 3 + 3 + 3 + 3 = 12. Vậy 3 × 4 = 12.')}<br>3 × 7 = ... Vậy 3 × 7 = ...`,
            answer: `${repSumC(3, 7)} = 21,21`, validate: repSumValidate(3, 7),
          },
          {
            label: '3 × 8 = ... Vậy 3 × 8 = ...',
            answer: `${repSumC(3, 8)} = 24,24`, validate: repSumValidate(3, 8),
          },
        ],
        hints: ['Mỗi con xúc xắc có 3 chấm. 3 được lấy 4 lần: 3 × 4.', 'b) 3 × 7 là 3 được lấy 7 lần: 3 + 3 + 3 + 3 + 3 + 3 + 3.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'g1', img: imgB37G5x3 }, { id: 'g2', img: imgB37G6x4 }, { id: 'g3', img: imgB37G10x2 },
          { id: 'g4', img: imgB37G4x3 }, { id: 'g5', img: imgB37G5x6 },
        ],
        right: [
          { id: 'e1', text: '5 × 6' }, { id: 'e2', text: '5 × 3' }, { id: 'e3', text: '10 × 2' },
          { id: 'e4', text: '6 × 4' }, { id: 'e5', text: '4 × 3' },
        ],
        pairs: [['g1', 'e2'], ['g2', 'e4'], ['g3', 'e3'], ['g4', 'e5'], ['g5', 'e1']],
        hints: ['Mẫu: 3 con xúc xắc, mỗi con 5 chấm: 5 được lấy 3 lần là 5 × 3.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB37T1Q3, wordProblem: true, subQuestions: false,
        q: '3. Số?\nCó tất cả bao nhiêu cánh quạt?',
        blanks: [
          B('Số cánh quạt có tất cả là:<br>3 × ... = ... (cánh quạt)', 4, 12),
          B('Đáp số: ... cánh quạt.', 12),
        ],
        hints: ['Mỗi quạt có 3 cánh, có 4 cái quạt.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Viết theo mẫu.',
        tables: [
          {
            label: 'a) Viết phép cộng các số hạng bằng nhau thành phép nhân (theo mẫu).',
            headers: ['Phép cộng', 'Phép nhân'],
            rows: [
              { sample: true, cells: ['2 + 2 + 2 + 2 = 8', '2 × 4 = 8'] },
              ['2 + 2 + 2 + 2 + 2 + 2 = 12', mulCell(2, 6)],
              ['2 + 2 + 2 + 2 + 2 + 2 + 2 + 2 = 16', mulCell(2, 8)],
            ],
          },
          {
            label: 'b) Viết phép nhân thành phép cộng các số hạng bằng nhau (theo mẫu).',
            headers: ['Phép nhân', 'Phép cộng'],
            rows: [
              { sample: true, cells: ['2 × 5 = 10', '2 + 2 + 2 + 2 + 2 = 10'] },
              ['3 × 6 = 18', sumCell(3, 6)],
              ['4 × 5 = 20', sumCell(4, 5)],
            ],
          },
        ],
        hints: ['Đếm xem số 2 được cộng mấy lần. 2 được lấy 6 lần là 2 × 6.', '3 × 6 là 3 được lấy 6 lần.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).\nTìm số chân của mỗi nhóm các con vật.',
        left: [
          { id: 'a1', img: imgB37Rabbits }, { id: 'a2', img: imgB37Chicks }, { id: 'a3', img: imgB37Beetles },
          { id: 'a4', img: imgB37Spiders }, { id: 'a5', img: imgB37Ladybugs },
        ],
        right: [
          { id: 'm1', text: '6 × 3 = 18' }, { id: 'm2', text: '8 × 2 = 16' }, { id: 'm3', text: '6 × 4 = 24' },
          { id: 'm4', text: '4 × 6 = 24' }, { id: 'm5', text: '2 × 5 = 10' },
        ],
        pairs: [['a1', 'm4'], ['a2', 'm5'], ['a3', 'm3'], ['a4', 'm2'], ['a5', 'm1']],
        hints: ['Mẫu: 6 con thỏ, mỗi con 4 chân: 4 × 6 = 24.', 'Con gà có 2 chân, con bọ có 6 chân, con nhện có 8 chân.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `3. Tính (theo mẫu).\n${mau('3 × 4 = 3 + 3 + 3 + 3 = 12. Vậy 3 × 4 = 12.')}`,
        blanks: [sumRow('a) ', 5, 3), sumRow('b) ', 3, 5), sumRow('c) ', 6, 3)],
        hints: ['5 × 3 là 5 được lấy 3 lần: 5 + 5 + 5.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true, subQuestions: false,
        q: '4. Số?\nMỗi con bọ rùa có 6 chân. Hỏi 3 con bọ rùa có bao nhiêu chân?',
        blanks: [
          B('Số chân của 3 con bọ rùa có là:<br>... × 3 = ... (chân).', 6, 18),
          B('Đáp số: ... chân.', 18),
        ],
        hints: ['6 chân được lấy 3 lần.'],
      },
    ],
  },

  // ── BÀI 38 (trang 6–8) ────────────────────────────────────────────────────
  {
    id: 'bai-38', number: 38, title: 'Thừa số, tích',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Phép nhân', '3 × 5 = 15', '2 × 5 = 10', '4 × 2 = 8', '6 × 3 = 18'],
          ['Thừa số', sampleCell(3), blank(2), blank(4), blank(6)],
          ['Thừa số', sampleCell(5), blank(5), blank(2), blank(3)],
          ['Tích', sampleCell(15), blank(10), blank(8), blank(18)],
        ],
        hints: ['Trong 3 × 5 = 15: 3 và 5 là thừa số, 15 là tích.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối (theo mẫu).',
        left: [
          { id: 'w1', img: imgB38Jugs }, { id: 'w2', img: imgB38Cans5 },
          { id: 'w3', img: imgB38Cans3 }, { id: 'w4', img: imgB38Bottles },
        ],
        right: [
          { id: 'A', text: '5 × 3 = 15 (l) (A)' }, { id: 'B', text: '2 × 5 = 10 (l) (B)' },
          { id: 'C', text: '2 × 3 = 6 (l) (C)' }, { id: 'D', text: '3 × 4 = 12 (l) (D)' },
        ],
        pairs: [['w1', 'C'], ['w2', 'A'], ['w3', 'D'], ['w4', 'B']],
        hints: ['Mẫu: 3 ca, mỗi ca 2 l: 2 × 3 = 6 (l).'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. b) Số?\n(A) 5 × 3 = 15 (l); (B) 2 × 5 = 10 (l); (C) 2 × 3 = 6 (l); (D) 3 × 4 = 12 (l).',
        rows: [
          ['Phép nhân', '(A)', '(B)', '(C)', '(D)'],
          ['Thừa số', sampleCell(5), blank(2), blank(2), blank(3)],
          ['Thừa số', sampleCell(3), blank(5), blank(3), blank(4)],
          ['Tích', sampleCell(15), blank(10), blank(6), blank(12)],
        ],
        hints: ['Viết hai thừa số và tích của từng phép nhân (A), (B), (C), (D).'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Số?\nTừ các thừa số là 5, 4, 3, 2 và các tích là 8, 15, em hãy lập hai phép nhân thích hợp.',
        blanks: [{ label: facts3(2, '×'), answer: '5,3,15,4,2,8', validate: factsValidate([[5, 3, 15], [4, 2, 8]], '×') }],
        hints: ['Hai thừa số nào nhân với nhau được 15? Hai thừa số nào được 8?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Viết tích thành tổng các số hạng bằng nhau rồi tính (theo mẫu).\n${mau('6 × 3 = 6 + 6 + 6 = 18. Vậy 6 × 3 = 18.')}`,
        blanks: [sumRow('a) ', 3, 4), sumRow('b) ', 4, 3), sumRow('c) ', 2, 7)],
        hints: ['3 × 4 là 3 được lấy 4 lần: 3 + 3 + 3 + 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tô màu đỏ vào các thừa số, màu xanh vào tích tương ứng trong mỗi phép nhân sau:\n(Viết các số em tô màu đỏ và số em tô màu xanh.)',
        blanks: [
          { label: 'a) 4 × 2 = 8. Tô đỏ: ... và ...; tô xanh: ...', answer: '4,2,8', validate: swapPairValidate(4, 2, 8) },
          { label: 'b) 3 × 3 = 9. Tô đỏ: ... và ...; tô xanh: ...', answer: '3,3,9', validate: swapPairValidate(3, 3, 9) },
          { label: 'c) 6 × 5 = 30. Tô đỏ: ... và ...; tô xanh: ...', answer: '6,5,30', validate: swapPairValidate(6, 5, 30) },
          { label: 'd) 2 × 7 = 14. Tô đỏ: ... và ...; tô xanh: ...', answer: '2,7,14', validate: swapPairValidate(2, 7, 14) },
        ],
        hints: ['Hai số được nhân với nhau là thừa số, kết quả là tích.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB38T2Q3, wordProblem: true, subQuestions: false,
        q: '3. Số?\na) 3 hàng có tất cả bao nhiêu ô tô?\nb) 4 cột có tất cả bao nhiêu ô tô?',
        blanks: [
          B('a) Số ô tô ở cả 3 hàng là:<br>... × 3 = ... (ô tô)', 4, 12),
          B('Đáp số: ... ô tô.', 12),
          B('b) Số ô tô ở cả 4 cột là:<br>... × 4 = ... (ô tô)', 3, 12),
          B('Đáp số: ... ô tô.', 12),
          B('c) Nhận xét: 3 × ... = ... × 3', 4, 4),
        ],
        hints: ['Mỗi hàng có 4 ô tô, có 3 hàng. Mỗi cột có 3 ô tô, có 4 cột.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB38T2Q4,
        q: '4. >; <; = ?',
        rows: [
          { left: 'a) 2 × 5', right: '5 × 2', answer: '=' },
          { left: 'b) 5 × 2', right: '5 × 3', answer: '<' },
          { left: 'c) 2 × 5', right: '2 × 4', answer: '>' },
        ],
        hints: ['Đếm quả bóng: 2 hàng, mỗi hàng 5 quả, hay 5 cột, mỗi cột 2 quả.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '5. Mỗi xe đạp có 2 bánh xe. Hỏi 5 xe đạp như vậy có bao nhiêu bánh xe?',
        blanks: [{ label: 'Số bánh xe', answer: '10' }],
      },
    ],
  },

  // ── BÀI 39 (trang 9–11) ───────────────────────────────────────────────────
  {
    id: 'bai-39', number: 39, title: 'Bảng nhân 2',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          B('2 × 2 = ...', 4), B('2 × 3 = ...', 6), B('2 × 4 = ...', 8),
          B('2 × 7 = ...', 14), B('2 × 8 = ...', 16), B('2 × 6 = ...', 12),
          B('2 × 9 = ...', 18), B('2 × 5 = ...', 10), B('2 × 10 = ...', 20),
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Thừa số', sampleCell(2), 2, 2, 2, 2, 2],
          ['Thừa số', sampleCell(4), 5, 6, 7, 8, 9],
          ['Tích', sampleCell(8), blank(10), blank(12), blank(14), blank(16), blank(18)],
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Các bông hoa ghi phép nhân:\nA: 2 × 8   B: 2 × 5   C: 2 × 6   D: 2 × 3\nE: 2 × 10   G: 2 × 7   H: 2 × 4   I: 2 × 9\na) Số?',
        rows: [
          ['Bông hoa', 'A', 'B', 'C', 'D', 'E', 'G', 'H', 'I'],
          ['Tích', sampleCell(16), blank(10), blank(12), blank(6), blank(20), blank(14), blank(8), blank(18)],
        ],
        blanks: [
          { label: 'b) Viết tiếp vào chỗ chấm cho thích hợp.<br>Trong bốn bông hoa C, D, E, G:<br>• Bông hoa ... ghi tích lớn nhất.', answer: 'E', validate: letterValidate('E') },
          { label: '• Bông hoa ... ghi tích bé nhất.', answer: 'D', validate: letterValidate('D') },
        ],
        hints: ['Tích ở bông hoa C là 12, D là 6, E là 20, G là 14.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Số?\na) Chú ong mang “2 ×”, mỗi mũi tên ghi một thừa số, bông hoa ghi tích.\n${mau(`2 ${ar('×4')} 8; &nbsp;2 ${ar('×2')} 4`)}`,
        blanks: [
          B(`2 ${ar('×5')} ...`, 10),
          B(`2 ${ar('×6')} ...`, 12),
          B(`2 ${ar('×9')} ...`, 18),
          B(`2 ${ar('×8')} ...`, 16),
          B(`b) 2 ${ar('×6')} ... ${ar('−10')} ... ${ar('×7')} ...`, 12, 2, 14),
        ],
        hints: ['b) Làm lần lượt theo mũi tên: 2 × 6 = 12, rồi 12 − 10 = ...'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Đếm thêm 2 rồi viết số thích hợp vào ô trống.',
        rows: [
          ['A', 2, 4, blank(6), blank(8), blank(10), blank(12), 14, blank(16), blank(18), 20],
          ['B', 1, 3, blank(5), blank(7), blank(9), blank(11), 13, blank(15), blank(17), 19],
        ],
        hints: ['Mỗi toa sau hơn toa trước 2 đơn vị: 4 + 2 = 6.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Số?\nLập ba phép nhân thích hợp từ các thừa số và tích trong bảng.',
        headers: ['Thừa số', 'Thừa số', 'Tích'],
        rows: [[2, 4, 14], [2, 7, 16], [2, 8, 8]],
        blanks: [{
          label: `Các phép nhân lập được là:<br>${facts3(3, '×')}`,
          answer: '2,4,8,2,7,14,2,8,16', validate: factsValidate([[2, 4, 8], [2, 7, 14], [2, 8, 16]], '×'),
        }],
        hints: ['2 × 4 = 8. Tìm tích của 2 × 7 và 2 × 8 trong cột Tích.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB39T2Q4,
        q: '4. Số?',
        blanks: [
          B('a) Có ... con thỏ, ... con gà, ... con vịt.', 4, 10, 6),
          { label: 'b) Số chân vịt có là:<br>... × ... = ... (cái chân)', answer: '2,6,12', validate: swapPairValidate(2, 6, 12) },
          { label: 'c) Số chân cả đàn gà có là:<br>... × ... = ... (cái chân)', answer: '2,10,20', validate: swapPairValidate(2, 10, 20) },
          { label: 'd) Số tai thỏ có là:<br>... × ... = ... (cái tai)', answer: '2,4,8', validate: swapPairValidate(2, 4, 8) },
          { label: 'e) Số chân gà con có là:<br>... × ... = ... (cái chân)', answer: '2,8,16', validate: swapPairValidate(2, 8, 16) },
        ],
        hints: ['Đàn gà gồm gà trống, gà mái và các chú gà con.', 'Mỗi con gà, con vịt có 2 chân; mỗi con thỏ có 2 tai.'],
      },
    ],
  },

  // ── BÀI 40 (trang 12–13) ──────────────────────────────────────────────────
  {
    id: 'bai-40', number: 40, title: 'Bảng nhân 5',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          B(`a) 5 ${ar('×3')} ...`, 15), B(`5 ${ar('×7')} ...`, 35), B(`5 ${ar('×4')} ...`, 20),
          B(`b) 5 ${ar('×2')} ...`, 10), B(`5 ${ar('×5')} ...`, 25), B(`5 ${ar('×9')} ...`, 45),
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'c20', text: '☕ 20' }, { id: 'c15', text: '☕ 15' }, { id: 'c14', text: '☕ 14' },
          { id: 'c18', text: '☕ 18' }, { id: 'c30', text: '☕ 30' },
        ],
        right: [
          { id: 'd1', text: '🍽️ 2 × 9' }, { id: 'd2', text: '🍽️ 5 × 4' }, { id: 'd3', text: '🍽️ 5 × 6' },
          { id: 'd4', text: '🍽️ 5 × 3' }, { id: 'd5', text: '🍽️ 2 × 7' },
        ],
        pairs: [['c20', 'd2'], ['c15', 'd4'], ['c14', 'd5'], ['c18', 'd1'], ['c30', 'd3']],
        hints: ['Mẫu: 5 × 4 = 20, nên cốc 20 nối với đĩa 5 × 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB40T1Q3, wordProblem: true, subQuestions: false,
        q: '3. Số?\nMỗi đèn ông sao có 5 cánh. Hỏi 4 đèn ông sao như vậy có bao nhiêu cánh?',
        blanks: [
          { label: 'Số cánh của 4 đèn ông sao là:<br>... × ... = ... (cánh)', answer: '5,4,20', validate: swapPairValidate(5, 4, 20) },
          B('Đáp số: ... cánh sao.', 20),
        ],
        hints: ['5 cánh được lấy 4 lần: 5 × 4.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?\na)',
        rows: [
          ['Thừa số', sampleCell(5), 5, 5, 5, 5, 5, 5, 5],
          ['Thừa số', sampleCell(3), 6, 7, 4, 2, 8, 9, 10],
          ['Tích', sampleCell(15), blank(30), blank(35), blank(20), blank(10), blank(40), blank(45), blank(50)],
        ],
        blanks: [
          B(`b) 5 ${ar('×3')} △ ... ${ar('−8')} ☐ ...`, 15, 7),
          B(`2 ${ar('×7')} ☐ ... ${ar('−9')} ○ ... ${ar('×8')} ☐ ...`, 14, 5, 40),
        ],
        hints: ['b) Làm lần lượt theo mũi tên: 5 × 3 = 15, rồi 15 − 8 = ...'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Đếm thêm 5 rồi viết số thích hợp vào ô trống.',
        rows: [[5, 10, blank(15), blank(20), blank(25), 30, blank(35), blank(40), blank(45), 50]],
        hints: ['Mỗi số sau hơn số trước 5 đơn vị: 10 + 5 = 15.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. Tô màu đỏ vào bông hoa ghi phép tính có kết quả lớn nhất, màu xanh vào bông hoa ghi phép tính có kết quả bé nhất.\nCác bông hoa ghi: 5 × 4; 2 × 8; 5 × 5; 5 × 3.',
        rows: [
          { left: 'Bông hoa tô màu đỏ:', options: ['A. 5 × 4', 'B. 2 × 8', 'C. 5 × 5', 'D. 5 × 3'], answer: 'C' },
          { left: 'Bông hoa tô màu xanh:', options: ['A. 5 × 4', 'B. 2 × 8', 'C. 5 × 5', 'D. 5 × 3'], answer: 'D' },
        ],
        hints: ['Tính: 5 × 4 = 20, 2 × 8 = 16, 5 × 5 = 25, 5 × 3 = 15.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '4. Một đĩa cam có 5 quả. Hỏi 4 đĩa như vậy có bao nhiêu quả cam?',
        blanks: [{ label: 'Số quả cam', answer: '20' }],
      },
    ],
  },

  // ── BÀI 41 (trang 14–16) ──────────────────────────────────────────────────
  {
    id: 'bai-41', number: 41, title: 'Phép chia',
    questions: [
      {
        type: 'match', section: 'Tiết 1', img: imgB41T1Q1,
        q: '1. Nối (theo mẫu).',
        left: [
          { id: 'p1', text: 'Có 3 đèn ông sao, mỗi đèn có 5 cánh sao. Hỏi có tất cả bao nhiêu cánh sao?' },
          { id: 'p2', text: 'Đếm được 15 cánh sao. Hỏi có bao nhiêu đèn ông sao 5 cánh?' },
          { id: 'p3', text: 'Có 15 bông hoa dán đều vào 3 đèn ông sao. Hỏi mỗi đèn ông sao có mấy bông hoa?' },
        ],
        right: [{ id: 'k1', text: '15 : 5 = 3' }, { id: 'k2', text: '15 : 3 = 5' }, { id: 'k3', text: '5 × 3 = 15' }],
        pairs: [['p1', 'k3'], ['p2', 'k1'], ['p3', 'k2']],
        hints: ['Mẫu: 5 cánh được lấy 3 lần: 5 × 3 = 15.', 'Mỗi đèn 5 cánh, 15 cánh thì có 15 : 5 đèn.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: `2. Số?\n${mau('2 × 5 = 10 → 10 : 2 = 5; 10 : 5 = 2')}`,
        blanks: [
          B('a) 5 × 4 = 20 → 20 : 5 = ...', 4),
          B('20 : 4 = ...', 5),
          B('b) 5 × 3 = 15 → 15 : ... = 3', 5),
          B('15 : ... = 5', 3),
          { label: 'c) 2 × 3 = 6 → 6 : ... = ...<br>... : ... = ...', answer: '2,3,6,3,2', validate: divPairValidate(6, 2, 3) },
        ],
        hints: ['Từ một phép nhân lập được hai phép chia: lấy tích chia cho thừa số này được thừa số kia.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Số?\nTừ ba thẻ số 2, 6, 3, em lập được hai phép chia là:',
        blanks: [{ label: '6 : ... = ... ; &nbsp;... : ... = ...', answer: '2,3,6,3,2', validate: divPairValidate(6, 2, 3) }],
        hints: ['2 × 3 = 6, nên 6 : 2 = 3 và 6 : 3 = 2.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['×', sampleCell(2), 2, 2, 2, 2],
              ['', sampleCell(6), 7, 8, 9, 10],
              ['', sampleCell(12), blank(14), blank(16), blank(18), blank(20)],
            ],
          },
          {
            label: 'b)',
            rows: [
              [':', sampleCell(12), 14, 16, 18, 20],
              ['', sampleCell(2), 2, 2, 2, 2],
              ['', sampleCell(6), blank(7), blank(8), blank(9), blank(10)],
            ],
          },
        ],
        hints: ['a) 2 × 6 = 12 (mẫu). b) 12 : 2 = 6 (mẫu), 14 : 2 = ... vì 2 × 7 = 14.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          B('a) 2 cm × 6 = ... cm', 12), B('12 cm : 2 = ... cm', 6), B('18 cm : 2 = ... cm', 9),
          B('b) 2 kg × 5 = ... kg', 10), B('10 kg : 2 = ... kg', 5), B('16 kg : 2 = ... kg', 8),
          B('c) 2 l × 7 = ... l', 14), B('14 l : 2 = ... l', 7), B('20 l : 2 = ... l', 10),
        ],
        hints: ['Tính như với số rồi viết thêm đơn vị: 12 : 2 = 6, nên 12 cm : 2 = 6 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB41T2Q3, wordProblem: true, subQuestions: false,
        q: '3. Số?\na) Chia băng giấy dài 6 cm thành 3 phần bằng nhau. Hỏi mỗi phần dài bao nhiêu xăng-ti-mét?\nb) Chia băng giấy dài 6 cm thành 2 phần bằng nhau. Hỏi mỗi phần dài bao nhiêu xăng-ti-mét?',
        blanks: [
          B('a) Chiều dài mỗi phần là:<br>... : ... = ... (cm)', 6, 3, 2),
          B('Đáp số: ... cm.', 2),
          B('b) Chiều dài mỗi phần là:<br>... : ... = ... (cm)', 6, 2, 3),
          B('Đáp số: ... cm.', 3),
        ],
        hints: ['Chia 6 cm thành 3 phần bằng nhau: 6 : 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB41T2Q4, wordProblem: true,
        q: '4. Rô-bốt chia 15 l nước mắm vào các can, mỗi can 5 l. Hỏi được bao nhiêu can nước mắm như vậy?',
        blanks: [{ label: 'Số can nước mắm', answer: '3' }],
      },
    ],
  },

  // ── BÀI 42 (trang 17–19) ──────────────────────────────────────────────────
  {
    id: 'bai-42', number: 42, title: 'Số bị chia, số chia, thương',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. Nối (theo mẫu).\n(Số trong ngoặc vuông [ ] là số cần nối.)',
        left: [
          { id: 'n1', text: '[14] : 2 = 7' }, { id: 'n2', text: '14 : [2] = 7' }, { id: 'n3', text: '14 : 2 = [7]' },
          { id: 'n4', text: '[15] : 3 = 5' }, { id: 'n5', text: '15 : [3] = 5' }, { id: 'n6', text: '15 : 3 = [5]' },
          { id: 'n7', text: '[8] : 2 = 4' }, { id: 'n8', text: '8 : [2] = 4' }, { id: 'n9', text: '8 : 2 = [4]' },
          { id: 'n10', text: '[10] : 5 = 2' }, { id: 'n11', text: '10 : [5] = 2' }, { id: 'n12', text: '10 : 5 = [2]' },
          { id: 'n13', text: '[15] : 5 = 3' }, { id: 'n14', text: '15 : [5] = 3' }, { id: 'n15', text: '15 : 5 = [3]' },
          { id: 'n16', text: '[8] : 4 = 2' }, { id: 'n17', text: '8 : [4] = 2' }, { id: 'n18', text: '8 : 4 = [2]' },
        ],
        right: [{ id: 'sbc', text: 'Số bị chia' }, { id: 'sc', text: 'Số chia' }, { id: 'th', text: 'Thương' }],
        pairs: [
          ['n1', 'sbc'], ['n2', 'sc'], ['n3', 'th'], ['n4', 'sbc'], ['n5', 'sc'], ['n6', 'th'],
          ['n7', 'sbc'], ['n8', 'sc'], ['n9', 'th'], ['n10', 'sbc'], ['n11', 'sc'], ['n12', 'th'],
          ['n13', 'sbc'], ['n14', 'sc'], ['n15', 'th'], ['n16', 'sbc'], ['n17', 'sc'], ['n18', 'th'],
        ],
        hints: ['Mẫu: trong 14 : 2 = 7, 14 là số bị chia, 2 là số chia, 7 là thương.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối mỗi bài toán với bài giải rồi viết số thích hợp vào ô trống.',
        left: [
          { id: 'bt1', text: 'Chia 15 bạn thành các nhóm, mỗi nhóm 5 bạn. Hỏi có mấy nhóm như vậy?' },
          { id: 'bt2', text: 'Chia đều 15 cái bánh vào 3 hộp. Hỏi mỗi hộp có mấy cái bánh?' },
        ],
        right: [
          { id: 'bg1', text: 'Bài giải: Số nhóm có là: 15 : 5 = ☐ (nhóm)' },
          { id: 'bg2', text: 'Bài giải: Số cái bánh ở mỗi hộp là: 15 : 3 = ☐ (cái)' },
        ],
        pairs: [['bt1', 'bg1'], ['bt2', 'bg2']],
        hints: ['Bài toán hỏi "mấy nhóm" thì nối với bài giải "Số nhóm có là".'],
      },
      {
        type: 'table', section: 'Tiết 1', blanksFirst: true,
        q: '2. a) (tiếp) Viết số thích hợp vào ô trống trong hai bài giải.\nb) Số?',
        blanks: [
          B('Số nhóm có là: 15 : 5 = ... (nhóm)', 3),
          B('Đáp số: ... nhóm.', 3),
          B('Số cái bánh ở mỗi hộp là: 15 : 3 = ... (cái)', 5),
          B('Đáp số: ... cái bánh.', 5),
        ],
        rows: [
          ['Phép chia', '15 : 3 = 5', '15 : 5 = 3'],
          ['Số bị chia', blank(15), blank(15)],
          ['Số chia', blank(3), blank(5)],
          ['Thương', blank(5), blank(3)],
        ],
        hints: ['Trong 15 : 3 = 5: 15 là số bị chia, 3 là số chia, 5 là thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Chia 8 bạn thành các cặp để đấu cờ. Hỏi có mấy cặp đấu cờ như vậy?',
        blanks: [{ label: 'Số cặp đấu cờ', answer: '4' }],
        hints: ['Mỗi cặp có 2 bạn.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            headers: ['Phép nhân', 'Thừa số', 'Thừa số', 'Tích'],
            rows: [
              ['2 × 7 = 14', sampleCell(2), sampleCell(7), sampleCell(14)],
              ['2 × 6 = 12', blank(2), blank(6), blank(12)],
              ['5 × 8 = 40', blank(5), blank(8), blank(40)],
            ],
          },
          {
            label: 'b)',
            headers: ['Phép chia', 'Số bị chia', 'Số chia', 'Thương'],
            rows: [
              ['14 : 2 = 7', sampleCell(14), sampleCell(2), sampleCell(7)],
              ['12 : 6 = 2', blank(12), blank(6), blank(2)],
              ['40 : 5 = 8', blank(40), blank(5), blank(8)],
            ],
          },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?\nTìm thương trong phép chia, biết:',
        blanks: [
          B('a) Số bị chia là 16, số chia là 2.<br>... : ... = ...', 16, 2, 8),
          B('Vậy thương là ....', 8),
          B('b) Số bị chia là 18, số chia là 2.<br>... : ... = ...', 18, 2, 9),
          B('Vậy thương là ....', 9),
        ],
        hints: ['Lấy số bị chia chia cho số chia: 16 : 2.'],
      },
      {
        type: 'table', section: 'Tiết 2', blanksFirst: true,
        q: '3. Số?\na) Từ ba số 2, 4, 8, em lập được hai phép chia là:',
        blanks: [{
          label: '(A) ... : ... = ...<br>(B) ... : ... = ...',
          answer: '8,2,4,8,4,2', validate: factsValidate([[8, 2, 4], [8, 4, 2]], ':'),
        }],
        tables: [{
          label: 'b) Từ hai phép chia lập được ở câu a, hãy viết các số bị chia, số chia và thương tương ứng vào bảng sau:',
          headers: ['Phép chia', 'Số bị chia', 'Số chia', 'Thương'],
          rows: [
            ['(A)', b42Cell(8, 0), b42Cell(2, 1), b42Cell(4, 2)],
            ['(B)', b42Cell(8, 3), b42Cell(4, 4), b42Cell(2, 5)],
          ],
        }],
        hints: ['2 × 4 = 8, nên 8 : 2 = 4 và 8 : 4 = 2.', 'Bảng b) chép lại đúng phép chia (A) và (B) em đã viết ở câu a.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB42T2Q4,
        q: '4. Số?\nQuan sát tranh rồi lập hai phép chia thích hợp.',
        blanks: [{ label: '15 : ... = ...<br>15 : ... = ...', answer: '3,5,5,3', validate: pairsValidate([[3, 5], [5, 3]]) }],
        hints: ['Có 3 hàng, mỗi hàng 5 bông hoa: 15 bông hoa.'],
      },
    ],
  },

  // ── BÀI 43 (trang 20–21) ──────────────────────────────────────────────────
  {
    id: 'bai-43', number: 43, title: 'Bảng chia 2',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          B(`a) 10 ${ar(':2')} ...`, 5), B(`14 ${ar(':2')} ...`, 7), B(`18 ${ar(':2')} ...`, 9),
          B('b) ... : 2 = 5', 10), B('... : 2 = 6', 12), B('... : 2 = 7', 14),
        ],
        hints: ['b) Số nào chia 2 được 5? Nhớ 2 × 5 = 10.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Hai đoàn tàu A và B có các toa ghi phép tính như sau:\na) Tính nhẩm các phép tính ở cả hai đoàn tàu.',
        tables: [
          { label: 'Đoàn tàu A', rows: [['16 : 2', '10 : 2', '18 : 2', '12 : 2'], [blank(8), blank(5), blank(9), blank(6)]] },
          { label: 'Đoàn tàu B', rows: [['14 : 2', '6 : 2', '20 : 2', '8 : 2'], [blank(7), blank(3), blank(10), blank(4)]] },
        ],
        blanks: [
          { label: 'b) Ở đoàn tàu A, tô màu đỏ vào phép tính có kết quả bé nhất.<br>Phép tính tô màu đỏ là: ...', answer: '10 : 2', validate: exprValidate('10:2') },
          { label: 'c) Ở đoàn tàu B, tô màu xanh vào phép tính có kết quả lớn nhất.<br>Phép tính tô màu xanh là: ...', answer: '20 : 2', validate: exprValidate('20:2') },
        ],
        hints: ['Nhớ bảng chia 2: 16 : 2 = 8 vì 2 × 8 = 16.', 'b), c) Viết cả phép tính, ví dụ: 16 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Mỗi chuồng chim bồ câu có 2 cái cửa. Bạn Việt đếm được có tất cả 12 cái cửa. Hỏi có bao nhiêu chuồng chim bồ câu như vậy?',
        blanks: [{ label: 'Số chuồng chim bồ câu', answer: '6' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [
              ['Thừa số', 2, 2, 2, 2, 2],
              ['Thừa số', 4, 8, 6, 5, 9],
              ['Tích', blank(8), blank(16), blank(12), blank(10), blank(18)],
            ],
          },
          {
            label: 'b)',
            rows: [
              ['Số bị chia', 8, 16, 12, 10, 18],
              ['Số chia', 2, 2, 2, 2, 2],
              ['Thương', blank(4), blank(8), blank(6), blank(5), blank(9)],
            ],
          },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          B(`a) 14 ${ar(':2')} △ ... ${ar('−2')} ☐ ...`, 7, 5),
          B(`b) 18 ${ar(':2')} ○ ... ${ar('+5')} △ ... ${ar(':2')} ☐ ...`, 9, 14, 7),
        ],
        hints: ['Làm lần lượt theo mũi tên: 14 : 2 = 7, rồi 7 − 2 = ...'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).\nNối mỗi chú ong với cánh hoa ghi kết quả phép tính của chú ong đó.',
        left: [
          { id: 'b1', text: '🐝 8 : 2' }, { id: 'b2', text: '🐝 2 × 3' }, { id: 'b3', text: '🐝 2 × 2' },
          { id: 'b4', text: '🐝 20 : 2' }, { id: 'b5', text: '🐝 12 : 2' }, { id: 'b6', text: '🐝 4 × 2' },
          { id: 'b7', text: '🐝 10 : 2' }, { id: 'b8', text: '🐝 16 : 2' }, { id: 'b9', text: '🐝 5 × 1' },
          { id: 'b10', text: '🐝 2 × 4' },
        ],
        right: [
          { id: 'h4', text: '🌸 4' }, { id: 'h10', text: '🌸 10' }, { id: 'h6', text: '🌸 6' },
          { id: 'h8', text: '🌸 8' }, { id: 'h5', text: '🌸 5' },
        ],
        pairs: [
          ['b1', 'h4'], ['b2', 'h6'], ['b3', 'h4'], ['b4', 'h10'], ['b5', 'h6'],
          ['b6', 'h8'], ['b7', 'h5'], ['b8', 'h8'], ['b9', 'h5'], ['b10', 'h8'],
        ],
        hints: ['Mẫu: 8 : 2 = 4, nên chú ong 8 : 2 nối với cánh hoa 4.', 'Một cánh hoa có thể nối với nhiều chú ong.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB43T2Q4, wordProblem: true,
        q: '4. Chia 12 chiếc tất giống nhau thành các đôi tất. Hỏi có tất cả bao nhiêu đôi tất?',
        blanks: [{ label: 'Số đôi tất', answer: '6' }],
        hints: ['Mỗi đôi tất có 2 chiếc.'],
      },
    ],
  },

  // ── BÀI 44 (trang 22–23) ──────────────────────────────────────────────────
  {
    id: 'bai-44', number: 44, title: 'Bảng chia 5',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          B(`a) 10 ${ar(':5')} ...`, 2), B(`15 ${ar(':5')} ...`, 3), B(`35 ${ar(':5')} ...`, 7),
          B('b) ... : 5 = 4', 20), B('... : 5 = 6', 30), B('... : 5 = 8', 40),
        ],
        hints: ['b) Số nào chia 5 được 4? Nhớ 5 × 4 = 20.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. a) Nối củ cà rốt với thỏ (theo mẫu).',
        left: [
          { id: 't1', text: '🐰 2 : 2' }, { id: 't2', text: '🐰 8 : 2' },
          { id: 't3', text: '🐰 2 × 5' }, { id: 't4', text: '🐰 40 : 5' },
        ],
        right: [
          { id: 'r1', text: '🥕 16 : 2' }, { id: 'r2', text: '🥕 5 : 5' },
          { id: 'r3', text: '🥕 50 : 5' }, { id: 'r4', text: '🥕 20 : 5' },
        ],
        pairs: [['t1', 'r2'], ['t2', 'r4'], ['t3', 'r3'], ['t4', 'r1']],
        hints: ['Mẫu: 2 : 2 = 1 và 5 : 5 = 1.', 'Tính kết quả ở mỗi con thỏ và mỗi củ cà rốt rồi nối hai phép tính có cùng kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. b) Viết phép tính thích hợp vào chỗ chấm.\n(Con thỏ: 2 : 2; 8 : 2; 2 × 5; 40 : 5. Củ cà rốt: 5 : 5; 16 : 2; 50 : 5; 20 : 5.)',
        blanks: [
          { label: '• Trong các phép tính ghi ở con thỏ, phép tính ... có kết quả bé nhất.', answer: '2 : 2', validate: exprValidate('2:2') },
          { label: '• Trong các phép tính ghi ở củ cà rốt, phép tính ... có kết quả lớn nhất.', answer: '50 : 5', validate: exprValidate('50:5') },
        ],
        hints: ['Con thỏ: 2 : 2 = 1, 8 : 2 = 4, 2 × 5 = 10, 40 : 5 = 8.', 'Củ cà rốt: 5 : 5 = 1, 16 : 2 = 8, 50 : 5 = 10, 20 : 5 = 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1', wordProblem: true,
        q: '3. Cô giáo chia đều 20 bạn vào 5 nhóm để tập múa. Hỏi mỗi nhóm có bao nhiêu bạn?',
        blanks: [{ label: 'Số bạn mỗi nhóm', answer: '4' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          ['Số bị chia', sampleCell(15), 35, 10, 10, 45, 50, 20, 40],
          ['Số chia', sampleCell(5), 5, 5, 2, 5, 5, 2, 5],
          ['Thương', sampleCell(3), blank(7), blank(2), blank(5), blank(9), blank(10), blank(10), blank(8)],
        ],
        hints: ['Nhớ bảng chia 5: 35 : 5 = 7 vì 5 × 7 = 35.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?\nTừ các số bị chia, số chia, thương ở bảng trên, em lập được ba phép chia sau:',
        headers: ['Số bị chia', 'Số chia', 'Thương'],
        rows: [[45, 5, 10], [20, 2, 9], [15, 5, 3]],
        blanks: [{ label: facts3(3, ':'), answer: '45,5,9,20,2,10,15,5,3', validate: factsValidate([[45, 5, 9], [20, 2, 10], [15, 5, 3]], ':') }],
        hints: ['45 : 5 = ? Tìm kết quả trong cột Thương.'],
      },
      {
        type: 'fill', section: 'Tiết 2', wordProblem: true,
        q: '3. Bác Hoà rót 30 l mật vào các can, mỗi can 5 l. Hỏi bác Hoà rót được bao nhiêu can mật như vậy?',
        blanks: [{ label: 'Số can mật', answer: '6' }],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Nối (theo mẫu).\nNối mỗi phép tính với số là kết quả của phép tính đó.',
        left: [
          { id: 'x1', text: '2 : 2' }, { id: 'x2', text: '6 : 2' }, { id: 'x3', text: '20 : 5' }, { id: 'x4', text: '2 × 1' },
          { id: 'x5', text: '25 : 5' }, { id: 'x6', text: '2 × 3' }, { id: 'x7', text: '10 : 2' },
          { id: 'y1', text: '5 : 5' }, { id: 'y2', text: '15 : 5' }, { id: 'y3', text: '2 × 2' }, { id: 'y4', text: '4 : 2' },
          { id: 'y5', text: '5 × 1' }, { id: 'y6', text: '30 : 5' }, { id: 'y7', text: '12 : 2' },
        ],
        right: [1, 2, 3, 4, 5, 6].map(n => ({ id: `k${n}`, text: String(n) })),
        pairs: [
          ['x1', 'k1'], ['x2', 'k3'], ['x3', 'k4'], ['x4', 'k2'], ['x5', 'k5'], ['x6', 'k6'], ['x7', 'k5'],
          ['y1', 'k1'], ['y2', 'k3'], ['y3', 'k4'], ['y4', 'k2'], ['y5', 'k5'], ['y6', 'k6'], ['y7', 'k6'],
        ],
        hints: ['Mẫu: 2 : 2 = 1, nên 2 : 2 nối với số 1.', 'Một số có thể nối với nhiều phép tính.'],
      },
    ],
  },
];
