/**
 * Exam Generator — Tạo bộ 20 câu hỏi kiểm tra tổng hợp
 * Phủ đều 6 nhóm kiến thức Toán Lớp 2
 */

import { randInt, randPick, shuffle } from '../engine/gameEngine.js';

// ─── helpers ────────────────────────────────────────────────────────────────
function wrong4(correct, pool, transform = x => x) {
  // Tạo 3 đáp án sai từ pool, trả về 4 options đã shuffle
  const wrongs = new Set();
  wrongs.add(transform(correct));
  let tries = 0;
  while (wrongs.size < 4 && tries < 100) {
    wrongs.add(transform(randPick(pool)));
    tries++;
  }
  // Nếu không đủ, thêm sai bằng ±random
  while (wrongs.size < 4) {
    const delta = randPick([-3,-2,-1,1,2,3]);
    wrongs.add(correct + delta);
  }
  const arr = [...wrongs];
  const idx = arr.indexOf(transform(correct));
  return { options: shuffle(arr.map(String)), answer: String(transform(correct)) };
}

function makeOptions(correct, ...wrongs) {
  const all = shuffle([String(correct), ...wrongs.map(String)]);
  return { options: all, answer: String(correct) };
}

// ─── Group 1: Nhân / Chia cơ bản (4 câu) ────────────────────────────────────
function mulDivQuestions() {
  const qs = [];
  const tables = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Q1 – Tích
  {
    const a = randPick(tables), b = randInt(2, 9);
    const ans = a * b;
    const w = [a*(b+1), a*(b-1), (a+1)*b].map(String);
    qs.push({
      text: `${a} × ${b} = ?`,
      ...makeOptions(ans, w[0], w[1], w[2]),
      topic: 'Nhân',
    });
  }
  // Q2 – Thương
  {
    const a = randPick(tables), b = randInt(2, 9);
    const product = a * b;
    const w = [b+1, b-1, b+2].filter(x => x > 0);
    qs.push({
      text: `${product} ÷ ${a} = ?`,
      ...makeOptions(b, w[0], w[1], w[2]),
      topic: 'Chia',
    });
  }
  // Q3 – Tìm thừa số còn thiếu
  {
    const a = randPick(tables), b = randInt(2, 9);
    const product = a * b;
    const w = [b+2, b-1, b+3].filter(x => x > 0);
    qs.push({
      text: `? × ${a} = ${product}`,
      ...makeOptions(b, w[0], w[1], w[2]),
      topic: 'Nhân',
    });
  }
  // Q4 – Tính nhanh biểu thức
  {
    const a = randPick([2,3,4,5]), b = randInt(2, 5), c = randInt(1, 4);
    const ans = a * b + c;
    const w = [a*b, a*b+c+1, a*(b+c)];
    qs.push({
      text: `${a} × ${b} + ${c} = ?`,
      ...makeOptions(ans, ...w.map(String)),
      topic: 'Biểu thức',
    });
  }
  return qs;
}

// ─── Group 2: So sánh >, <, = (3 câu) ───────────────────────────────────────
function compareQuestions() {
  const qs = [];

  // Q5 – So sánh tích với số
  {
    const a = randPick([2,3,4,5,6]), b = randInt(3, 8);
    const product = a * b;
    const compare = randPick([product - 2, product - 1, product, product + 1, product + 2]);
    const sign = product > compare ? '>' : product < compare ? '<' : '=';
    const wrongs = ['>', '<', '='].filter(s => s !== sign);
    qs.push({
      text: `${a} × ${b}  ○  ${compare}`,
      ...makeOptions(sign, wrongs[0], wrongs[1], '≠'),
      topic: 'So sánh',
    });
  }
  // Q6 – So sánh hai tích
  {
    const a = randPick([2,3,4,5]), b = randInt(2,8), c = randPick([2,3,4,5,6]);
    const d = Math.round((a * b) / c) + randPick([-1, 0, 1]);
    const lhs = a * b, rhs = c * Math.max(1, d);
    const sign = lhs > rhs ? '>' : lhs < rhs ? '<' : '=';
    const wrongs = ['>', '<', '='].filter(s => s !== sign);
    qs.push({
      text: `${a} × ${b}  ○  ${c} × ${Math.max(1,d)}`,
      ...makeOptions(sign, wrongs[0], wrongs[1], '≠'),
      topic: 'So sánh',
    });
  }
  // Q7 – Tìm số điền vào ô để đẳng thức đúng
  {
    const a = randPick([2,3,4,5,6]), b = randInt(3, 9);
    const product = a * b;
    const divisor = randPick([2, 4, 5]);
    // a × b = ? × divisor  → ? = product/divisor (nếu chia hết)
    const ans = product % divisor === 0 ? product / divisor : a;
    const realProduct = ans * divisor;
    const realB = realProduct / a;
    const rAns = a;
    const rB = randInt(3,9);
    const rProduct = a * rB;
    const rDiv = randPick([2,5]);
    const rAns2 = rProduct % rDiv === 0 ? rProduct / rDiv : rB;
    const altProduct = rAns2 * rDiv;
    qs.push({
      text: `${a} × ${rB} = ? × ${rDiv}${altProduct !== a * rB ? '\n(tìm ?)'  : ''}`,
      ...makeOptions(rAns2, rAns2 + 1, rAns2 - 1, rAns2 + 3),
      topic: 'So sánh',
    });
  }
  return qs;
}

// ─── Group 3: Dãy số (3 câu) ─────────────────────────────────────────────────
function sequenceQuestions() {
  const qs = [];

  // Q8 – Điền số còn thiếu (cộng đều)
  {
    const start = randInt(2, 20), step = randPick([2, 3, 4, 5, 10]);
    const seq = [start, start+step, start+2*step, '?', start+4*step];
    const ans = start + 3*step;
    qs.push({
      text: `Điền số còn thiếu: ${seq.join('  ')}`,
      ...makeOptions(ans, ans+step, ans-step, ans+2),
      topic: 'Dãy số',
    });
  }
  // Q9 – Quy luật nhân
  {
    const start = randPick([1, 2, 3]), mult = randPick([2, 3]);
    const seq = [start, start*mult, start*mult*mult, '?'];
    const ans = start * mult * mult * mult;
    qs.push({
      text: `Điền số tiếp theo: ${seq.join('  ')}`,
      ...makeOptions(ans, ans+mult, ans-1, ans*mult),
      topic: 'Dãy số',
    });
  }
  // Q10 – Số nào không thuộc dãy
  {
    const mult = randPick([2, 3, 4, 5]);
    const valid = [mult, mult*2, mult*3, mult*4, mult*5, mult*6];
    const intruder = valid[2] + 1; // không chia hết
    const shown = [...valid.slice(0, 4), intruder, valid[4]];
    qs.push({
      text: `Số nào KHÔNG thuộc bảng ${mult}?\n${shown.join(' ')}`,
      ...makeOptions(intruder, valid[1], valid[2], valid[3]),
      topic: 'Dãy số',
    });
  }
  return qs;
}

// ─── Group 4: Hình khối (3 câu) ──────────────────────────────────────────────
const SHAPES = [
  { name: 'Khối cầu', faces: 0, canRoll: true, canStack: false, example: 'quả bóng' },
  { name: 'Khối trụ', faces: 2, canRoll: true, canStack: true, example: 'lon nước' },
  { name: 'Khối lập phương', faces: 6, canRoll: false, canStack: true, example: 'con xúc xắc' },
  { name: 'Khối hộp chữ nhật', faces: 6, canRoll: false, canStack: true, example: 'hộp giày' },
];

function shapeQuestions() {
  const qs = [];

  // Q11 – Vật nào có dạng khối nào
  {
    const s = randPick(SHAPES);
    const others = SHAPES.filter(x => x.name !== s.name);
    qs.push({
      text: `"${s.example}" có dạng hình gì?`,
      ...makeOptions(s.name, others[0].name, others[1].name, others[2].name),
      topic: 'Hình khối',
    });
  }
  // Q12 – Đặc điểm
  {
    const roll = SHAPES.filter(s => s.canRoll);
    const noRoll = SHAPES.filter(s => !s.canRoll);
    const correct = randPick(roll).name;
    const wrongs = noRoll.map(s => s.name);
    qs.push({
      text: `Hình khối nào CÓ THỂ lăn được?`,
      ...makeOptions(correct, wrongs[0], wrongs[1], randPick(roll.filter(s=>s.name!==correct)).name),
      topic: 'Hình khối',
    });
  }
  // Q13 – Đếm mặt phẳng
  {
    const s = randPick(SHAPES.filter(sh => sh.faces > 0));
    const w = [s.faces + 1, s.faces - 1, s.faces + 2].filter(x => x >= 0);
    qs.push({
      text: `${s.name} có bao nhiêu mặt phẳng?`,
      ...makeOptions(s.faces, w[0], w[1], w[2]),
      topic: 'Hình khối',
    });
  }
  return qs;
}

// ─── Group 5: Toán đố (3 câu) ────────────────────────────────────────────────
const CONTEXTS = [
  { item: 'quyển vở', unit: 'quyển', emoji: '📓' },
  { item: 'bông hoa', unit: 'bông', emoji: '🌸' },
  { item: 'cái bánh', unit: 'cái', emoji: '🧁' },
  { item: 'quả cam', unit: 'quả', emoji: '🍊' },
  { item: 'con cá', unit: 'con', emoji: '🐟' },
  { item: 'chiếc bút', unit: 'chiếc', emoji: '✏️' },
];

function wordProblemQuestions() {
  const qs = [];

  // Q14 – Nhân (bao nhiêu tất cả)
  {
    const ctx = randPick(CONTEXTS);
    const groups = randInt(3, 7), each = randInt(2, 6);
    const ans = groups * each;
    qs.push({
      text: `Có ${groups} lọ, mỗi lọ có ${each} ${ctx.item}.\nHỏi tất cả có bao nhiêu ${ctx.unit}?`,
      ...makeOptions(ans, ans + each, ans - groups, ans + 2),
      topic: 'Toán đố',
    });
  }
  // Q15 – Chia đều
  {
    const ctx = randPick(CONTEXTS);
    const total = randPick([12,15,16,18,20,24,25,30]), groups = randPick([2,3,4,5,6]);
    const each = Math.round(total / groups);
    const realTotal = each * groups;
    qs.push({
      text: `Có ${realTotal} ${ctx.item} chia đều vào ${groups} ${randPick(['đĩa','lọ','hộp','rổ'])}.\nMỗi ${randPick(['đĩa','lọ','hộp','rổ'])} có bao nhiêu ${ctx.unit}?`,
      ...makeOptions(each, each+1, each-1, each+2),
      topic: 'Toán đố',
    });
  }
  // Q16 – Tìm số nhóm
  {
    const ctx = randPick(CONTEXTS);
    const each = randInt(3, 8), total = each * randInt(3, 7);
    const groups = total / each;
    qs.push({
      text: `Có ${total} ${ctx.item}, xếp thành các nhóm,\nmỗi nhóm ${each} ${ctx.unit}. Được bao nhiêu nhóm?`,
      ...makeOptions(groups, groups+1, groups-1, groups+2),
      topic: 'Toán đố',
    });
  }
  return qs;
}

// ─── Group 6: Tư duy số (4 câu) ──────────────────────────────────────────────
function thinkingQuestions() {
  const qs = [];

  // Q17 – Số nào chia hết cho X
  {
    const divisor = randPick([2, 5]);
    const valid = [];
    const invalid = [];
    for (let i = 10; i <= 50; i++) {
      if (i % divisor === 0) valid.push(i);
      else invalid.push(i);
    }
    const ans = randPick(valid);
    const w = shuffle(invalid).slice(0, 3);
    qs.push({
      text: `Số nào chia hết cho ${divisor}?`,
      ...makeOptions(ans, w[0], w[1], w[2]),
      topic: 'Tư duy',
    });
  }
  // Q18 – Tổng / hiệu liên quan đến bảng nhân
  {
    const a = randPick([2,3,4,5]), b = randInt(3, 8);
    const c = randPick([2,3,4,5]), d = randInt(2, 6);
    const ans = a * b - c * d;
    if (ans > 0) {
      qs.push({
        text: `${a} × ${b} − ${c} × ${d} = ?`,
        ...makeOptions(ans, ans+c, ans-a, ans+d),
        topic: 'Tư duy',
      });
    } else {
      const ans2 = a * b + c;
      qs.push({
        text: `${a} × ${b} + ${c} = ?`,
        ...makeOptions(ans2, ans2+1, ans2-a, ans2+a),
        topic: 'Tư duy',
      });
    }
  }
  // Q19 – Em cần tìm số bí ẩn
  {
    const mystery = randInt(3, 9);
    const mult = randPick([2, 3, 4, 5]);
    const result = mystery * mult;
    const clue2 = mystery + randInt(2, 5);
    qs.push({
      text: `Tìm số bí ẩn ★:\n★ × ${mult} = ${result}\nVà ★ + ? = ${clue2}`,
      options: shuffle([String(mystery), String(mystery+1), String(mystery-1), String(mystery+2)]),
      answer: String(mystery),
      topic: 'Tư duy',
    });
  }
  // Q20 – Lớn nhất / nhỏ nhất trong danh sách tích
  {
    const pairs = [[2,8],[3,6],[4,5],[2,9],[5,4],[3,8]];
    const selected = shuffle(pairs).slice(0, 4);
    const products = selected.map(([a,b]) => ({ expr: `${a}×${b}`, val: a*b }));
    const maxP = products.reduce((m, p) => p.val > m.val ? p : m, products[0]);
    qs.push({
      text: `Giá trị nào lớn nhất?\n${products.map(p=>p.expr).join('  ')}`,
      ...makeOptions(maxP.expr, ...products.filter(p=>p.expr!==maxP.expr).map(p=>p.expr)),
      topic: 'Tư duy',
    });
  }
  return qs;
}

// ─── Main export ─────────────────────────────────────────────────────────────
export function genExam() {
  const questions = [
    ...mulDivQuestions(),   // 4 câu
    ...compareQuestions(),  // 3 câu
    ...sequenceQuestions(), // 3 câu
    ...shapeQuestions(),    // 3 câu
    ...wordProblemQuestions(), // 3 câu
    ...thinkingQuestions(), // 4 câu
  ]; // Total: 20
  // Shuffle within groups but keep group order for balanced coverage
  return questions.map((q, i) => ({ ...q, index: i + 1 }));
}

export const GRADE_SCALE = [
  { min: 19, rank: 'A+', color: '#F59E0B', bg: '#FFFBEB', label: 'Xuất Sắc', emoji: '🌟' },
  { min: 16, rank: 'A',  color: '#10B981', bg: '#ECFDF5', label: 'Giỏi',     emoji: '🎉' },
  { min: 13, rank: 'B',  color: '#3B82F6', bg: '#EFF6FF', label: 'Khá',      emoji: '😊' },
  { min: 10, rank: 'C',  color: '#F97316', bg: '#FFF7ED', label: 'Trung Bình',emoji: '💪' },
  { min: 0,  rank: 'D',  color: '#EF4444', bg: '#FEF2F2', label: 'Cần Cố Gắng',emoji: '📚' },
];

export const COMMENTS = {
  'A+': [
    'Tuyệt vời! Em là ngôi sao toán học sáng chói! Bài kiểm tra gần như hoàn hảo — em nắm vững mọi kiến thức từ phép tính đến hình học. Hãy tiếp tục phát huy nhé! ⭐',
    'Xuất sắc! Không có gì có thể ngăn cản em trên con đường chinh phục toán học. Em trả lời chính xác gần như tất cả câu hỏi — một kết quả đáng tự hào!',
    'Hoàn hảo! Em thật sự hiểu sâu tất cả kiến thức Toán Lớp 2. Bảng nhân, hình khối, dãy số — em làm chủ tất cả! 🏆',
  ],
  'A': [
    'Giỏi lắm! Em nắm vững kiến thức và làm bài rất tốt. Chỉ vài câu nhỏ cần chú ý thêm. Cứ đà này em sẽ đạt A+ trong lần tới! 🎉',
    'Rất tốt! Em hiểu rõ các phép tính nhân chia và biết phân loại hình khối. Hãy ôn lại một chút để đạt điểm tuyệt đối nhé! 💪',
    'Giỏi! Kết quả của em thật ấn tượng. Em làm chủ hầu hết kiến thức — thêm một chút luyện tập là em sẽ xuất sắc thôi! 🌟',
  ],
  'B': [
    'Khá tốt! Em hiểu phần lớn bài học và đang trên đà tiến bộ. Hãy ôn lại phần em còn yếu — chắc chắn em sẽ làm tốt hơn lần sau! 😊',
    'Kết quả khá! Em đã cố gắng và hiểu được nhiều phần. Luyện tập thêm bảng nhân và toán đố để điểm tăng lên nhé! 📖',
    'Tiến bộ đấy! Em đang học tốt. Hãy dành thêm thời gian ôn các dạng toán tư duy — em hoàn toàn có thể đạt hạng A! 🎯',
  ],
  'C': [
    'Cố gắng thêm! Em đã làm được nhiều điều tốt, nhưng hãy ôn lại bảng nhân chia và các dạng toán đố. Kiên trì luyện tập, em sẽ tiến bộ thôi! 💪',
    'Chưa đạt như mong đợi, nhưng đừng nản lòng! Hãy chơi lại các trò chơi luyện tập, đặc biệt là Hoa Cánh và So Sánh. Em làm được! 🌱',
    'Điểm trung bình nhưng không sao — mỗi lần luyện tập là một bước tiến! Hãy ôn lại từng phần và thử lại nhé. Thầy/cô tin em! 📚',
  ],
  'D': [
    'Đừng buồn! Mỗi lần thử là em học thêm được điều gì đó mới. Hãy quay lại các trò chơi luyện tập từng phần rồi thi lại nhé — em nhất định sẽ tiến bộ! 🌱',
    'Bài này khó đấy! Nhưng với sự kiên trì, em sẽ làm được. Hãy ôn lại từ đầu: bắt đầu với Hoa Cánh để nắm chắc bảng nhân, rồi dần dần lên. Cổ vũ em! 💪',
    'Chưa tốt lần này — nhưng đây là bước bắt đầu! Hãy luyện tập thêm và thử lại. Thầy/cô tin rằng lần sau em sẽ tiến bộ nhiều! 🤗',
  ],
};

export function getGrade(score) {
  return GRADE_SCALE.find(g => score >= g.min) || GRADE_SCALE[GRADE_SCALE.length - 1];
}

export const EXAM_DURATION = 15 * 60; // 15 phút = 900 giây
