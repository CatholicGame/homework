/**
 * Question Generators — Dynamic question generation from templates
 * Each generator creates varied questions with different values/objects
 */

import { randInt, randPick, shuffle } from '../engine/gameEngine.js';

// ===== OBJECTS / CONTEXTS for word problems =====
const ANIMALS = [
  { name: 'con thỏ', part: 'tai', count: 2, emoji: '🐰' },
  { name: 'con mèo', part: 'chân', count: 4, emoji: '🐱' },
  { name: 'con chó', part: 'chân', count: 4, emoji: '🐕' },
  { name: 'con gà', part: 'chân', count: 2, emoji: '🐔' },
  { name: 'con bò', part: 'chân', count: 4, emoji: '🐄' },
  { name: 'con chim', part: 'cánh', count: 2, emoji: '🐦' },
  { name: 'con cá', part: 'vây', count: 2, emoji: '🐟' },
  { name: 'con bướm', part: 'cánh', count: 2, emoji: '🦋' },
  { name: 'con nhện', part: 'chân', count: 8, emoji: '🕷️' },
];

const CONTAINER_ITEMS = [
  { container: 'lọ', item: 'bông hoa', emoji: '🌸' },
  { container: 'đĩa', item: 'quả cam', emoji: '🍊' },
  { container: 'rổ', item: 'quả táo', emoji: '🍎' },
  { container: 'hộp', item: 'cái bánh', emoji: '🧁' },
  { container: 'túi', item: 'cái kẹo', emoji: '🍬' },
  { container: 'khay', item: 'quả trứng', emoji: '🥚' },
  { container: 'bàn', item: 'quyển sách', emoji: '📚' },
  { container: 'ngăn', item: 'cái bút', emoji: '✏️' },
  { container: 'hàng', item: 'bạn', emoji: '👦' },
];

const UNITS = ['kg', 'l', 'cm', 'm'];

// ===== MULTIPLICATION GENERATORS =====
export function genMultiplicationFlower(factor) {
  // Flower wheel: center = factor, petals = numbers to multiply
  const nums = [];
  for (let i = 1; i <= 10; i++) nums.push(i);
  shuffle(nums);
  return nums.slice(0, 8).map(n => ({
    input: n,
    answer: factor * n,
    expression: `${factor} × ${n}`
  }));
}

export function genMultiplicationTable(count = 8) {
  // Fill-in table: Thừa số | Thừa số | Tích
  const questions = [];
  for (let i = 0; i < count; i++) {
    const a = randInt(2, 10);
    const b = randInt(1, 10);
    const product = a * b;
    const missingType = randPick(['a', 'b', 'product']);
    questions.push({
      a, b, product,
      missing: missingType,
      answer: missingType === 'a' ? a : missingType === 'b' ? b : product
    });
  }
  return questions;
}

export function genMultiplicationMatch(count = 6) {
  // Matching: expression ↔ result
  const pairs = [];
  const used = new Set();
  while (pairs.length < count) {
    const a = randInt(2, 5);
    const b = randInt(2, 10);
    const key = `${a}x${b}`;
    if (used.has(key)) continue;
    used.add(key);
    pairs.push({
      expression: `${a} × ${b}`,
      result: a * b,
      id: pairs.length
    });
  }
  return pairs;
}

// ===== DIVISION GENERATORS =====
export function genDivisionFlower(divisor) {
  const nums = [];
  for (let i = 1; i <= 10; i++) {
    nums.push(divisor * i);
  }
  shuffle(nums);
  return nums.slice(0, 8).map(n => ({
    input: n,
    answer: n / divisor,
    expression: `${n} ÷ ${divisor}`
  }));
}

export function genDivisionTable(count = 8) {
  // Fill-in table: Số bị chia | Số chia | Thương
  const questions = [];
  for (let i = 0; i < count; i++) {
    const b = randPick([2, 5]);
    const quotient = randInt(1, 10);
    const a = b * quotient;
    const missingType = randPick(['a', 'b', 'quotient']);
    questions.push({
      a, b, quotient,
      missing: missingType,
      answer: missingType === 'a' ? a : missingType === 'b' ? b : quotient
    });
  }
  return questions;
}

export function genDivisionMatch(count = 6) {
  const pairs = [];
  const used = new Set();
  while (pairs.length < count) {
    const b = randPick([2, 5]);
    const q = randInt(1, 10);
    const a = b * q;
    const key = `${a}/${b}`;
    if (used.has(key)) continue;
    used.add(key);
    pairs.push({
      expression: `${a} ÷ ${b}`,
      result: q,
      id: pairs.length
    });
  }
  return pairs;
}

// ===== MIXED CALC GENERATOR =====
export function genQuickCalc(count = 15) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    if (Math.random() > 0.5) {
      // Multiplication
      const a = randInt(2, 5);
      const b = randInt(1, 10);
      questions.push({ expression: `${a} × ${b}`, answer: a * b, type: 'mul' });
    } else {
      // Division
      const b = randPick([2, 5]);
      const q = randInt(1, 10);
      const a = b * q;
      questions.push({ expression: `${a} ÷ ${b}`, answer: q, type: 'div' });
    }
  }
  return shuffle(questions);
}

// ===== COMPARISON GENERATOR =====
export function genComparison(count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    let left, right, leftVal, rightVal;
    const mode = randPick(['calc_calc', 'calc_num', 'num_num', 'big_num']);

    if (mode === 'calc_calc') {
      const a1 = randInt(2, 5), b1 = randInt(1, 10);
      const a2 = randInt(2, 5), b2 = randInt(1, 10);
      const op1 = Math.random() > 0.5;
      const op2 = Math.random() > 0.5;
      if (op1) { left = `${a1} × ${b1}`; leftVal = a1 * b1; }
      else { const d = randPick([2, 5]); const q = randInt(1, 10); left = `${d * q} ÷ ${d}`; leftVal = q; }
      if (op2) { right = `${a2} × ${b2}`; rightVal = a2 * b2; }
      else { const d = randPick([2, 5]); const q = randInt(1, 10); right = `${d * q} ÷ ${d}`; rightVal = q; }
    } else if (mode === 'calc_num') {
      const a = randInt(2, 5), b = randInt(1, 10);
      left = `${a} × ${b}`;
      leftVal = a * b;
      rightVal = leftVal + randPick([-3, -2, -1, 0, 1, 2, 3]);
      if (rightVal < 0) rightVal = leftVal + randInt(0, 5);
      right = `${rightVal}`;
    } else if (mode === 'num_num') {
      leftVal = randInt(100, 999);
      rightVal = leftVal + randPick([-50, -10, 0, 10, 50]);
      if (rightVal < 100) rightVal = leftVal + randInt(0, 100);
      left = `${leftVal}`;
      right = `${rightVal}`;
    } else {
      leftVal = randInt(1, 9) * 100;
      rightVal = randInt(1, 9) * 100;
      left = `${leftVal}`;
      right = `${rightVal}`;
    }

    const answer = leftVal > rightVal ? '>' : leftVal < rightVal ? '<' : '=';
    questions.push({ left, right, leftVal, rightVal, answer });
  }
  return questions;
}

// ===== WORD PROBLEM GENERATOR (with Activity Data for Step 2) =====
export function genWordProblem(count = 10) {
  const questions = [];

  for (let i = 0; i < count; i++) {
    const type = randPick(['animal_parts', 'container_equal', 'container_divide']);

    if (type === 'animal_parts') {
      const animal = randPick(ANIMALS);
      const n = randInt(2, 4); // keep small for drag-and-drop
      const answer = animal.count * n;
      questions.push({
        text: `Mỗi ${animal.name} có ${animal.count} ${animal.part}. Hỏi ${n} ${animal.name} có bao nhiêu ${animal.part}?`,
        emoji: animal.emoji,
        operandA: animal.count,
        operandB: n,
        operator: '×',
        answer,
        unit: animal.part,
        mathType: 'mul',
        activity: {
          type: 'group',
          totalItems: answer,
          groups: n,
          perGroup: animal.count,
          itemEmoji: '⭐',
          itemName: animal.part,
          groupEmoji: animal.emoji,
          groupLabel: animal.name,
          instruction: `Kéo ${answer} ${animal.part} vào ${n} ${animal.name}, mỗi ${animal.name} có ${animal.count} ${animal.part}`
        }
      });
    } else if (type === 'container_equal') {
      const item = randPick(CONTAINER_ITEMS);
      const perContainer = randInt(2, 4);
      const nContainers = randInt(2, 4);
      const answer = perContainer * nContainers;
      questions.push({
        text: `Mỗi ${item.container} có ${perContainer} ${item.item}. Hỏi ${nContainers} ${item.container} có bao nhiêu ${item.item}?`,
        emoji: item.emoji,
        operandA: perContainer,
        operandB: nContainers,
        operator: '×',
        answer,
        unit: item.item,
        mathType: 'mul',
        activity: {
          type: 'group',
          totalItems: answer,
          groups: nContainers,
          perGroup: perContainer,
          itemEmoji: item.emoji,
          itemName: item.item,
          groupEmoji: '📥',
          groupLabel: item.container,
          instruction: `Kéo ${item.item} vào ${nContainers} ${item.container}, mỗi ${item.container} có ${perContainer} ${item.item}`
        }
      });
    } else {
      const item = randPick(CONTAINER_ITEMS);
      const perContainer = randInt(2, 4);
      const nContainers = randInt(2, 4);
      const total = perContainer * nContainers;
      questions.push({
        text: `Có ${total} ${item.item} chia đều vào ${nContainers} ${item.container}. Hỏi mỗi ${item.container} có bao nhiêu ${item.item}?`,
        emoji: item.emoji,
        operandA: total,
        operandB: nContainers,
        operator: '÷',
        answer: perContainer,
        unit: item.item,
        mathType: 'div',
        activity: {
          type: 'divide', // split items equally into groups
          totalItems: total,
          groups: nContainers,
          perGroup: perContainer,
          itemEmoji: item.emoji,
          itemName: item.item,
          groupEmoji: '📥',
          groupLabel: item.container,
          instruction: `Chia đều ${total} ${item.item} vào ${nContainers} ${item.container}`
        }
      });
    }
  }
  return shuffle(questions);
}


// ===== SEQUENCE GENERATOR =====
export function genNumberSequence(count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const seqType = randPick(['add1', 'add10', 'add100', 'sub1', 'sub10', 'sub100', 'add2', 'add5']);
    let start, step, length = randInt(5, 7);

    switch (seqType) {
      case 'add1': start = randInt(100, 500); step = 1; break;
      case 'add10': start = randInt(100, 500); step = 10; break;
      case 'add100': start = randInt(100, 500); step = 100; break;
      case 'sub1': start = randInt(200, 600); step = -1; break;
      case 'sub10': start = randInt(200, 600); step = -10; break;
      case 'sub100': start = randInt(500, 900); step = -100; break;
      case 'add2': start = randInt(100, 500); step = 2; break;
      case 'add5': start = randInt(100, 500); step = 5; break;
    }

    const sequence = [];
    for (let j = 0; j < length; j++) {
      sequence.push(start + step * j);
    }

    // Pick 2 random positions to hide
    const hidePositions = [];
    while (hidePositions.length < 2) {
      const pos = randInt(1, length - 2); // avoid first and last
      if (!hidePositions.includes(pos)) hidePositions.push(pos);
    }

    questions.push({
      sequence,
      hidePositions,
      step,
      description: step > 0 ? `Đếm thêm ${Math.abs(step)}` : `Đếm lùi ${Math.abs(step)}`
    });
  }
  return questions;
}

// ===== PLACE VALUE GENERATOR =====
export function genPlaceValue(count = 10) {
  const questions = [];
  for (let i = 0; i < count; i++) {
    const type = randPick(['decompose', 'compose', 'identify']);

    if (type === 'decompose') {
      const num = randInt(100, 999);
      const hundreds = Math.floor(num / 100);
      const tens = Math.floor((num % 100) / 10);
      const ones = num % 10;
      questions.push({
        type: 'decompose',
        number: num,
        hundreds, tens, ones,
        text: `Số ${num} gồm ... trăm, ... chục, ... đơn vị`
      });
    } else if (type === 'compose') {
      const hundreds = randInt(1, 9);
      const tens = randInt(0, 9);
      const ones = randInt(0, 9);
      const num = hundreds * 100 + tens * 10 + ones;
      questions.push({
        type: 'compose',
        number: num,
        hundreds, tens, ones,
        text: `${hundreds} trăm, ${tens} chục, ${ones} đơn vị = ?`
      });
    } else {
      const num = randInt(100, 999);
      const digit = randPick(['hundreds', 'tens', 'ones']);
      const digitName = digit === 'hundreds' ? 'hàng trăm' : digit === 'tens' ? 'hàng chục' : 'hàng đơn vị';
      const answer = digit === 'hundreds' ? Math.floor(num / 100) : digit === 'tens' ? Math.floor((num % 100) / 10) : num % 10;
      questions.push({
        type: 'identify',
        number: num,
        digit,
        digitName,
        answer,
        text: `Chữ số ${digitName} của số ${num} là?`
      });
    }
  }
  return shuffle(questions);
}

// ===== NUMBER THINKER GENERATOR =====
export function genNumberThinker(count = 10) {
  const questions = [];

  const templates = [
    // Template 1: Smallest/largest single digit
    () => {
      const num = randInt(100, 999);
      const h = Math.floor(num / 100), t = Math.floor((num % 100) / 10), o = num % 10;
      const clues = [];
      const digitDescs = {
        'hundreds': { val: h, name: 'hàng trăm' },
        'tens': { val: t, name: 'hàng chục' },
        'ones': { val: o, name: 'hàng đơn vị' },
      };

      // Build description from the number
      Object.entries(digitDescs).forEach(([key, info]) => {
        if (info.val === 0) clues.push(`chữ số ${info.name} là số bé nhất có một chữ số`);
        else if (info.val === 9) clues.push(`chữ số ${info.name} là số lớn nhất có một chữ số`);
        else if (info.val === 1) clues.push(`chữ số ${info.name} là số bé nhất có một chữ số khác 0`);
        else clues.push(`chữ số ${info.name} là ${info.val}`);
      });

      // Generate wrong options
      const options = [num];
      while (options.length < 4) {
        const wrong = randInt(100, 999);
        if (!options.includes(wrong)) options.push(wrong);
      }
      shuffle(options);

      return { text: clues.join(', '), answer: num, options };
    },

    // Template 2: "Liền trước/sau"
    () => {
      const num = randInt(100, 998);
      const isAfter = Math.random() > 0.5;
      const answer = isAfter ? num + 1 : num - 1;
      const text = isAfter ? `Số liền sau của ${num} là?` : `Số liền trước của ${num} là?`;

      const options = [answer];
      while (options.length < 4) {
        const wrong = answer + randPick([-2, -1, 1, 2, 10, -10]);
        if (wrong > 0 && !options.includes(wrong)) options.push(wrong);
      }
      shuffle(options);

      return { text, answer, options };
    },

    // Template 3: Larger/smaller of two
    () => {
      const a = randInt(100, 999);
      let b = a + randPick([-50, -20, -10, 10, 20, 50]);
      if (b < 100) b = a + randInt(10, 50);
      if (b > 999) b = a - randInt(10, 50);
      const isLarger = Math.random() > 0.5;
      const answer = isLarger ? Math.max(a, b) : Math.min(a, b);
      const text = isLarger
        ? `Trong hai số ${a} và ${b}, số nào lớn hơn?`
        : `Trong hai số ${a} và ${b}, số nào bé hơn?`;

      // Always include BOTH a and b, plus 2 close distractors
      const options = new Set([a, b]);
      while (options.size < 4) {
        const base = randPick([a, b]);
        const offset = randPick([-5, -3, -1, 1, 3, 5]);
        const wrong = base + offset;
        if (wrong >= 100 && wrong <= 999 && wrong !== a && wrong !== b) options.add(wrong);
      }
      const optArr = shuffle([...options]);

      return { text, answer, options: optArr };
    },

    // Template 4: "Số tròn chục/tròn trăm gần nhất"
    () => {
      const num = randInt(101, 998);
      const isRoundTen = Math.random() > 0.5;
      let answer;
      if (isRoundTen) {
        answer = Math.round(num / 10) * 10;
      } else {
        answer = Math.round(num / 100) * 100;
      }
      const text = isRoundTen
        ? `Số tròn chục gần nhất của ${num} là?`
        : `Số tròn trăm gần nhất của ${num} là?`;

      const options = [answer];
      while (options.length < 4) {
        const wrong = isRoundTen
          ? (randInt(0, 99) * 10)
          : (randInt(1, 9) * 100);
        if (wrong > 0 && !options.includes(wrong)) options.push(wrong);
      }
      shuffle(options);

      return { text, answer, options };
    },

    // Template 5: "Viết số có ba chữ số biết..."
    () => {
      const h = randInt(1, 9);
      const t = randInt(0, 9);
      const o = randInt(0, 9);
      const num = h * 100 + t * 10 + o;
      const descs = [];

      // Pick descriptive way for each digit
      if (h <= 3) descs.push(`chữ số hàng trăm là ${h}`);
      else descs.push(`chữ số hàng trăm lớn hơn ${h - 1}`);

      if (t === 0) descs.push(`chữ số hàng chục là số bé nhất`);
      else descs.push(`chữ số hàng chục là ${t}`);

      if (o === 9) descs.push(`chữ số hàng đơn vị là số lớn nhất có một chữ số`);
      else descs.push(`chữ số hàng đơn vị là ${o}`);

      const text = `Viết số có ba chữ số, biết ${descs.join(', ')}. Số đó là?`;

      const options = [num];
      while (options.length < 4) {
        const wrong = randInt(100, 999);
        if (!options.includes(wrong)) options.push(wrong);
      }
      shuffle(options);

      return { text, answer: num, options };
    }
  ];

  for (let i = 0; i < count; i++) {
    const genFn = randPick(templates);
    questions.push(genFn());
  }
  return questions;
}

// ===== SHAPE DATA (enriched with properties for harder questions) =====
export const SHAPES_3D = [
  {
    name: 'Khối cầu', id: 'sphere',
    examples: [
      { item: 'quả bóng', emoji: '⚽' },
      { item: 'quả cam', emoji: '🍊' },
      { item: 'hòn bi', emoji: '🔮' },
      { item: 'quả địa cầu', emoji: '🌍' },
    ],
    surfaces: 0, flatFaces: 0, canRoll: true, canStack: false,
    desc: 'Không có mặt phẳng, lăn được mọi hướng',
  },
  {
    name: 'Khối trụ', id: 'cylinder',
    examples: [
      { item: 'lon nước', emoji: '🥫' },
      { item: 'cái cốc', emoji: '🥤' },
      { item: 'ống nước', emoji: '🧴' },
      { item: 'cây nến', emoji: '🕯️' },
    ],
    surfaces: 3, flatFaces: 2, canRoll: true, canStack: true,
    desc: 'Có 2 mặt đáy tròn, lăn được một hướng',
  },
  {
    name: 'Khối lập phương', id: 'cube',
    examples: [
      { item: 'con xúc xắc', emoji: '🎲' },
      { item: 'khối Rubik', emoji: '🧊' },
      { item: 'hộp quà vuông', emoji: '🎁' },
      { item: 'viên đá vuông', emoji: '🧱' },
    ],
    surfaces: 6, flatFaces: 6, canRoll: false, canStack: true,
    desc: 'Có 6 mặt vuông bằng nhau, không lăn được',
  },
  {
    name: 'Khối hộp chữ nhật', id: 'rectangular',
    examples: [
      { item: 'hộp giày', emoji: '👟' },
      { item: 'cục gạch', emoji: '🧱' },
      { item: 'tủ lạnh', emoji: '🧊' },
      { item: 'chiếc vali', emoji: '🧳' },
    ],
    surfaces: 6, flatFaces: 6, canRoll: false, canStack: true,
    desc: 'Có 6 mặt chữ nhật, không lăn được',
  },
];

// Generate Shape Sorter questions — mixed types for difficulty
export function genShapeSorter() {
  const questions = [];

  // --- Type 1: SORT multiple objects into shape bins (drag and drop) ---
  // Pick 2-3 shapes, give 2 objects per shape, child must sort them
  const sortShapes = shuffle([...SHAPES_3D]).slice(0, 3);
  const sortItems = [];
  sortShapes.forEach(shape => {
    const examples = shuffle([...shape.examples]).slice(0, 2);
    examples.forEach(ex => {
      sortItems.push({
        item: ex.item,
        emoji: ex.emoji,
        correctShapeId: shape.id,
        correctShapeName: shape.name,
      });
    });
  });
  questions.push({
    type: 'sort',
    items: shuffle(sortItems),
    bins: sortShapes.map(s => ({ id: s.id, name: s.name })),
    instruction: 'Kéo hoặc bấm mỗi đồ vật vào khay hình khối đúng',
  });

  // --- Type 2: Property questions (text-based, multiple choice) ---
  const propertyTemplates = [
    () => {
      // "Khối nào lăn được?"
      const canRoll = SHAPES_3D.filter(s => s.canRoll);
      const cantRoll = SHAPES_3D.filter(s => !s.canRoll);
      const correct = randPick(canRoll);
      const wrongs = shuffle([...cantRoll]).slice(0, 2);
      wrongs.push(randPick(canRoll.filter(s => s.id !== correct.id)));
      const options = shuffle([correct, ...wrongs.slice(0, 3)].slice(0, 4));
      return {
        type: 'property',
        text: 'Hình khối nào có thể lăn được?',
        options: options.map(s => s.name),
        correctAnswers: canRoll.map(s => s.name), // accept any rolling shape
        multi: false,
      };
    },
    () => {
      // "Khối nào KHÔNG lăn được?"
      const cantRoll = SHAPES_3D.filter(s => !s.canRoll);
      const canRoll = SHAPES_3D.filter(s => s.canRoll);
      const options = shuffle([...SHAPES_3D]).slice(0, 4);
      return {
        type: 'property',
        text: 'Hình khối nào KHÔNG thể lăn được?',
        options: options.map(s => s.name),
        correctAnswers: cantRoll.map(s => s.name),
        multi: false,
      };
    },
    () => {
      // "Khối lập phương có bao nhiêu mặt?"
      const shape = randPick(SHAPES_3D.filter(s => s.flatFaces > 0));
      const answers = [shape.flatFaces];
      const options = new Set([shape.flatFaces]);
      while (options.size < 4) options.add(randPick([0, 1, 2, 3, 4, 5, 6, 8]));
      return {
        type: 'property',
        text: `${shape.name} có bao nhiêu mặt phẳng?`,
        options: shuffle([...options]).map(String),
        correctAnswers: [String(shape.flatFaces)],
        multi: false,
      };
    },
    () => {
      // "Khối nào có 6 mặt phẳng bằng nhau?"
      return {
        type: 'property',
        text: 'Hình khối nào có 6 mặt phẳng bằng nhau?',
        options: shuffle(SHAPES_3D.map(s => s.name)),
        correctAnswers: ['Khối lập phương'],
        multi: false,
      };
    },
    () => {
      // "Vật nào có dạng khối trụ?"
      const shape = randPick(SHAPES_3D);
      const correctEx = randPick(shape.examples);
      const wrongExamples = SHAPES_3D
        .filter(s => s.id !== shape.id)
        .map(s => randPick(s.examples));
      const options = shuffle([correctEx, ...wrongExamples.slice(0, 3)]);
      return {
        type: 'property',
        text: `Vật nào sau đây có dạng ${shape.name}?`,
        options: options.map(o => o.item),
        correctAnswers: [correctEx.item],
        multi: false,
      };
    },
    () => {
      // "Khối cầu khác khối trụ ở điểm nào?"
      return {
        type: 'property',
        text: 'Khối cầu và khối trụ khác nhau ở điểm nào?',
        options: shuffle([
          'Khối cầu không có mặt phẳng, khối trụ có 2 mặt phẳng',
          'Khối cầu có 2 mặt phẳng, khối trụ không có',
          'Cả hai đều không lăn được',
          'Cả hai đều có 6 mặt phẳng',
        ]),
        correctAnswers: ['Khối cầu không có mặt phẳng, khối trụ có 2 mặt phẳng'],
        multi: false,
      };
    },
    () => {
      // "Khối nào vừa lăn được vừa xếp chồng được?"
      return {
        type: 'property',
        text: 'Hình khối nào vừa lăn được vừa xếp chồng được?',
        options: shuffle(SHAPES_3D.map(s => s.name)),
        correctAnswers: ['Khối trụ'],
        multi: false,
      };
    },
    () => {
      // true/false: "Khối hộp chữ nhật có thể lăn được"
      const shape = randPick(SHAPES_3D);
      const prop = randPick(['roll', 'stack']);
      let statement, isTrue;
      if (prop === 'roll') {
        statement = `${shape.name} có thể lăn được`;
        isTrue = shape.canRoll;
      } else {
        statement = `${shape.name} có thể xếp chồng được`;
        isTrue = shape.canStack;
      }
      return {
        type: 'property',
        text: `Đúng hay sai: "${statement}"?`,
        options: ['Đúng', 'Sai'],
        correctAnswers: [isTrue ? 'Đúng' : 'Sai'],
        multi: false,
      };
    },
  ];

  // Add 7 property questions
  const selected = shuffle([...propertyTemplates]).slice(0, 7);
  selected.forEach(fn => questions.push(fn()));

  // --- Type 3: Another SORT round with remaining shapes ---
  const sortShapes2 = shuffle([...SHAPES_3D]).slice(0, 2);
  const sortItems2 = [];
  sortShapes2.forEach(shape => {
    const examples = shuffle([...shape.examples]).slice(0, 3);
    examples.forEach(ex => {
      sortItems2.push({
        item: ex.item,
        emoji: ex.emoji,
        correctShapeId: shape.id,
        correctShapeName: shape.name,
      });
    });
  });
  questions.push({
    type: 'sort',
    items: shuffle(sortItems2),
    bins: sortShapes2.map(s => ({ id: s.id, name: s.name })),
    instruction: 'Phân loại các đồ vật vào đúng hình khối',
  });

  return questions; // ~9 questions total
}


// ===== PATH MAZE GENERATOR =====
export function genPathMaze(nodeCount = 8) {
  const nodes = [];
  for (let i = 0; i < nodeCount; i++) {
    if (Math.random() > 0.5) {
      const a = randInt(2, 5), b = randInt(1, 10);
      nodes.push({ expression: `${a} × ${b}`, answer: a * b });
    } else {
      const d = randPick([2, 5]);
      const q = randInt(1, 10);
      nodes.push({ expression: `${d * q} ÷ ${d}`, answer: q });
    }
  }
  return nodes;
}
