/**
 * 🤖 Rô-bốt biểu thức — rô-bốt cần đúng "mã năng lượng" (giá trị biểu thức) để chạy. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.5.
 *   Cấp 1–3 (calc): biểu thức trên băng chuyền. Bé chạm vào dấu phép tính phải làm trước (thứ tự thực hiện), gõ kết quả
 *     phép tính đó; rô-bốt nuốt ba thẻ, tính, nhả ra thẻ kết quả thay vào chỗ cũ, dòng ghi bên dưới chép thêm "= …" như vở.
 *     Còn một phép tính thì không phải chọn nữa. Hết phép tính: số còn lại là mã, pin sạc đầy.
 *     Cấp 1 chỉ cộng trừ hoặc chỉ nhân chia (từ trái sang phải), cấp 2 có cả nhân chia và cộng trừ, cấp 3 có ngoặc.
 *   Cấp 4 (Bài 42): cho mã, bé tự lắp biểu thức — signs (đặt dấu vào ô trống: 4 ☐ 4 ☐ 4 = 20), paren (đặt dấu ngoặc),
 *     pick (chọn một trong ba thẻ biểu thức). Bấm "Chạy" thì rô-bốt tự tính từng bước để kiểm chứng.
 * Biểu thức sinh ngẫu nhiên trong phạm vi Tập 1: kết quả mọi bước từ 2 đến 999, nhân có một thừa số một chữ số,
 * chia cho số có một chữ số và chia hết.
 * Dùng khung quầy của Chợ phiên (market/stall.js), theme 'robot'.
 */

import { robotSvg, robotIcon, numCard, opCard, OP_COLOR } from './art/robot.js';
import { LAB_NPCS as NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { sfx } from '../preschool/fx.js';
import { flyOne, svgBoxOnScreen, calmMotion } from './fly.js';

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const SYM = { '+': '+', '-': '−', '*': '×', '/': ':' };
const OPS = ['+', '−', '×', ':'];
const HIGH = (op) => op === '×' || op === ':';

// ── Biểu thức: mảng thẻ { n } | { op } | { p: '(' | ')' } ──────────────────────────────────────────────

/** Phép tính làm tiếp theo: trong ngoặc trước; nhân chia trước cộng trừ; cùng loại thì từ trái sang phải. */
export function stepIndex(tokens) {
  let lo = 0, hi = tokens.length;
  const r = tokens.findIndex(t => t.p === ')');
  if (r >= 0) { let l = r; while (tokens[l].p !== '(') l--; lo = l + 1; hi = r; }
  for (let k = lo; k < hi; k++) if (HIGH(tokens[k].op)) return k;
  for (let k = lo; k < hi; k++) if (tokens[k].op) return k;
  return -1;
}

/** strict: giới hạn khi sinh đề (Tập 1). Không strict: rô-bốt tính mọi phép đúng toán học (bé tự lắp ở cấp 4). */
function calc(a, op, b, strict) {
  if (op === '+') return a + b;
  if (op === '−') return a >= b ? a - b : null;
  if (op === '×') return !strict || Math.min(a, b) <= 9 ? a * b : null;
  if (op === ':') return b > 0 && a % b === 0 && (!strict || b <= 9) ? a / b : null;
  return null;
}

/** Thay phép tính ở vị trí i bằng kết quả v; ngoặc chỉ còn một số thì bỏ ngoặc. Trả về { tokens, at } (at: chỗ thẻ kết quả). */
export function applyStep(tokens, i, v) {
  const t = [...tokens.slice(0, i - 1), { n: v }, ...tokens.slice(i + 2)];
  let at = i - 1;
  if (t[at - 1]?.p === '(' && t[at + 1]?.p === ')') { t.splice(at + 1, 1); t.splice(at - 1, 1); at--; }
  return { tokens: t, at };
}

/** Tính hết: { steps: [{ i, a, op, b, v, tokens }], value } — hoặc error = bước không tính được. */
export function evaluate(tokens, strict = false) {
  const steps = [];
  let t = tokens;
  while (t.length > 1) {
    const i = stepIndex(t);
    const a = t[i - 1].n, op = t[i].op, b = t[i + 1].n;
    const v = calc(a, op, b, strict);
    if (v === null) return { steps, error: { i, a, op, b } };
    t = applyStep(t, i, v).tokens;
    steps.push({ i, a, op, b, v, tokens: t });
  }
  return { steps, value: t[0].n };
}

/** "12 × (7 − 4)" */
export function exprText(tokens) {
  let s = '';
  for (const t of tokens) {
    if (t.p === '(') s += `${s ? ' ' : ''}(`;
    else if (t.p === ')') s += ')';
    else s += `${s && !s.endsWith('(') ? ' ' : ''}${t.n ?? t.op}`;
  }
  return s;
}

/** Hình mẫu 'a+b*c' → cây { op, l, r, paren } (lá { leaf: 'a' }). */
function parse(shape) {
  let i = 0;
  const expr = () => { let l = term(); while (shape[i] === '+' || shape[i] === '-') { const op = shape[i++]; l = { op, l, r: term() }; } return l; };
  const term = () => { let l = factor(); while (shape[i] === '*' || shape[i] === '/') { const op = shape[i++]; l = { op, l, r: factor() }; } return l; };
  const factor = () => { if (shape[i] === '(') { i++; const e = expr(); i++; e.paren = true; return e; } return { leaf: shape[i++] }; };
  return expr();
}

/**
 * Điền số cho các lá của cây sao cho mọi bước tính đẹp (chia hết, không âm, nhân với số một chữ số).
 * want 'small': kết quả nhánh này là số một chữ số (để làm số chia / thừa số nhỏ). Trả về giá trị hoặc null.
 */
function fillTree(node, rng, vals, want) {
  const set = (leaf, v) => { vals[leaf.leaf] = v; return v; };
  const sub = (x, w) => (x.leaf ? null : fillTree(x, rng, vals, w));
  const { op, l, r } = node;
  if (op === '+') {
    if (want === 'small') {
      const a = l.leaf ? set(l, rng.int(2, 5)) : sub(l, 'small');
      const b = r.leaf ? set(r, rng.int(2, 4)) : sub(r, 'small');
      return a === null || b === null ? null : a + b;
    }
    const a = l.leaf ? set(l, rng.int(10, 480)) : sub(l);
    const b = r.leaf ? set(r, rng.int(10, 380)) : sub(r);
    return a === null || b === null ? null : a + b;
  }
  if (op === '-') {
    if (want === 'small') {
      if (!l.leaf || !r.leaf) return null;
      const b = set(r, rng.int(3, 80));
      return set(l, b + rng.int(2, 9)) - b;
    }
    if (!r.leaf) { const b = sub(r); if (b === null) return null; const a = l.leaf ? set(l, b + rng.int(8, 400)) : sub(l); return a === null ? null : a - b; }
    const a = l.leaf ? set(l, rng.int(40, 700)) : sub(l);
    if (a === null || a < 6) return null;
    return a - set(r, rng.int(2, Math.min(a - 3, 400)));
  }
  if (op === '*') {
    if (l.leaf && r.leaf) {
      const small = rng.int(2, 9), big = want === 'small' ? rng.int(2, 4) : rng.int(11, 99);
      const [x, y] = rng() < 0.5 ? [small, big] : [big, small];
      set(l, x); set(r, y);
      return x * y;
    }
    const tree = l.leaf ? r : l, leaf = l.leaf ? l : r;
    const s = sub(tree, rng() < 0.5 ? 'small' : undefined);
    if (s === null) return null;
    return s * set(leaf, s <= 9 ? rng.int(11, Math.min(99, Math.floor(999 / s))) : rng.int(2, 9));
  }
  if (op === '/') {
    if (r.leaf) {
      if (l.leaf) {
        const d = set(r, rng.int(2, 9));
        const q = want === 'small' ? rng.int(2, 9) : rng.int(2, Math.floor(999 / d));
        set(l, q * d);
        return q;
      }
      const a = sub(l);
      if (a === null) return null;
      const ds = [2, 3, 4, 5, 6, 7, 8, 9].filter(d => a % d === 0 && a / d >= 2);
      if (!ds.length) return null;
      return a / set(r, rng.pick(ds));
    }
    const d = sub(r, 'small');
    if (d === null || d < 2 || d > 9 || !l.leaf) return null;
    return set(l, d * rng.int(2, Math.floor(999 / d))) / d;
  }
  return null;
}

/** Thẻ của hình mẫu với các số đã điền. */
const shapeTokens = (shape, vals) => [...shape].map(ch => (ch === '(' || ch === ')' ? { p: ch } : SYM[ch] ? { op: SYM[ch] } : { n: vals[ch] }));

/** Mọi bước (và kết quả) từ 2 đến 999, đúng giới hạn Tập 1. */
function niceSteps(tokens) {
  const e = evaluate(tokens, true);
  return !e.error && e.steps.every(s => s.v >= 2 && s.v <= 999) && tokens.every(t => !('n' in t) || t.n <= 999) ? e : null;
}

/** Sinh một biểu thức theo hình mẫu (thử lại tới khi đẹp). */
export function makeExpr(shape, rng) {
  const tree = parse(shape);
  for (let k = 0; k < 400; k++) {
    const vals = {};
    if (fillTree(tree, rng, vals) === null) continue;
    const tokens = shapeTokens(shape, vals);
    const e = niceSteps(tokens);
    if (e) return { tokens, value: e.value };
  }
  return null;
}

/** Thêm ngoặc quanh phép tính ở vị trí k (bỏ ngoặc cũ). */
function withParen(tokens, k) {
  const t = tokens.filter(x => !x.p);
  return [...t.slice(0, k - 1), { p: '(' }, ...t.slice(k - 1, k + 2), { p: ')' }, ...t.slice(k + 2)];
}
const noParen = (tokens) => tokens.filter(x => !x.p);

// Hình mẫu mỗi cấp (a, b, c: số; + - * /: dấu). Cấp 1 xen kẽ nhóm cộng trừ và nhóm nhân chia.
const SHAPES = {
  as: ['a-b+c', 'a+b-c', 'a-b-c'],
  md: ['a*b/c', 'a/b*c', 'a/b/c'],
  mix: ['a+b*c', 'a-b*c', 'a+b/c', 'a-b/c', 'a*b+c', 'a*b-c', 'a/b+c', 'a/b-c'],
  paren: ['a*(b-c)', 'a*(b+c)', '(a+b)*c', '(a-b)*c', '(a+b)/c', '(a-b)/c', 'a/(b-c)', 'a-(b+c)', 'a-(b-c)', 'a*(b/c)', 'a/(b*c)', 'a+(b-c)'],
};
// Cấp 4 — đặt ngoặc: biểu thức có ngoặc đổi được giá trị so với không ngoặc.
const PAREN_SHAPES = ['(a+b)/c', '(a-b)/c', '(a+b)*c', '(a-b)*c', 'a*(b-c)', 'a*(b+c)', 'a-(b+c)', 'a-(b-c)', 'a/(b-c)'];

const RULE = {
  as: 'Biểu thức chỉ có phép cộng, phép trừ thì thực hiện các phép tính theo thứ tự từ trái sang phải.',
  md: 'Biểu thức chỉ có phép nhân, phép chia thì thực hiện các phép tính theo thứ tự từ trái sang phải.',
  mix: 'Biểu thức có phép cộng, trừ, nhân, chia thì thực hiện phép nhân, phép chia trước; rồi thực hiện phép cộng, phép trừ sau.',
  paren: 'Biểu thức có dấu ngoặc thì thực hiện các phép tính trong ngoặc trước.',
};
const ruleFor = (tokens) => (tokens.some(t => t.p) ? RULE.paren
  : tokens.some(t => HIGH(t.op)) && tokens.some(t => t.op && !HIGH(t.op)) ? RULE.mix
  : tokens.some(t => HIGH(t.op)) ? RULE.md : RULE.as);

/** "48 − 25 + 29 = 23 + 29 = 52" */
const solutionText = (tokens) => [exprText(tokens), ...evaluate(tokens).steps.map(s => exprText(s.tokens))].join(' = ');

export const ROBOT_LEVELS = [
  {
    ...levelMeta('robot-1'), missions: 5,
    knowledge: 'biểu thức số, tính từ trái sang phải',
    ask: () => 'Rô-bốt cần mã năng lượng. Tính giá trị biểu thức từ trái sang phải!',
    desc: '48 − 25 + 29 = 23 + 29 = 52. Chỉ có cộng trừ (hoặc chỉ có nhân chia) thì tính từ trái sang phải.',
    kind: 'calc', families: ['as', 'md'],
    how: [['👆', 'Chọn phép tính trước'], ['🧮', 'Gõ kết quả'], ['robot', 'Rô-bốt tính']],
  },
  {
    ...levelMeta('robot-2'), missions: 5,
    knowledge: 'biểu thức số, nhân chia trước, cộng trừ sau',
    ask: () => 'Biểu thức có cả nhân chia và cộng trừ. Phép nào làm trước nhỉ?',
    desc: '30 + 9 : 3 = 30 + 3 = 33. Nhân, chia trước; cộng, trừ sau.',
    kind: 'calc', families: ['mix'],
    how: [['👆', 'Nhân chia trước'], ['🧮', 'Gõ kết quả'], ['robot', 'Rô-bốt tính']],
  },
  {
    ...levelMeta('robot-3'), missions: 5,
    knowledge: 'biểu thức có dấu ngoặc',
    ask: () => 'Biểu thức có dấu ngoặc. Tính trong ngoặc trước!',
    desc: '12 × (7 − 4) = 12 × 3 = 36. Có ngoặc thì tính trong ngoặc trước.',
    kind: 'calc', families: ['paren'],
    how: [['👆', 'Trong ngoặc trước'], ['🧮', 'Gõ kết quả'], ['robot', 'Rô-bốt tính']],
  },
  {
    ...levelMeta('robot-4'), missions: 6,
    knowledge: 'biểu thức số, thứ tự thực hiện các phép tính',
    ask: () => 'Rô-bốt cho biết mã rồi. Em lắp biểu thức ra đúng mã đó!',
    desc: 'Mã 20: 4 × 4 + 4 = 20. Đặt dấu, đặt ngoặc hoặc chọn thẻ biểu thức cho ra đúng mã.',
    kind: 'build',
    how: [['🔋', 'Xem mã'], ['🧩', 'Lắp biểu thức'], ['robot', 'Chạy rô-bốt']],
  },
];

/** Cấp 4 — đặt dấu: 3 số, 2 ô trống; mã có ít cách lắp (≤ 2) để bé phải thử. */
function makeSigns(rng) {
  for (let k = 0; k < 400; k++) {
    const same = rng() < 0.35;
    const x = rng.int(2, 9);
    const nums = same ? [x, x, x] : [rng() < 0.4 ? rng.pick([10, 20, 30, 40, 50]) : rng.int(2, 9), rng.int(2, 9), rng() < 0.3 ? rng.pick([10, 20, 30]) : rng.int(2, 9)];
    const tok = (o1, o2) => [{ n: nums[0] }, { op: o1 }, { n: nums[1] }, { op: o2 }, { n: nums[2] }];
    const byValue = new Map();
    for (const o1 of OPS) for (const o2 of OPS) {
      const e = niceSteps(tok(o1, o2));
      if (e) byValue.set(e.value, [...(byValue.get(e.value) || []), [o1, o2]]);
    }
    // Mã đẹp: 2–999, ít cách lắp, lời giải có ít nhất một phép nhân / chia (thứ tự tính mới có ý nghĩa).
    const cands = [...byValue].filter(([v, ways]) => v >= 2 && ways.length <= 2 && ways.some(w => w.some(HIGH)));
    if (!cands.length) continue;
    const [target, ways] = rng.pick(cands);
    return { nums, target, sol: tok(...ways[0]) };
  }
  return null;
}

/** Cấp 4 — đặt ngoặc: biểu thức không ngoặc; ngoặc đúng chỗ mới ra mã (khác giá trị khi không có ngoặc). */
function makeParen(rng, avoid) {
  for (let k = 0; k < 200; k++) {
    const shape = rng.pick(PAREN_SHAPES.filter(s => s !== avoid));
    const ex = makeExpr(shape, rng);
    if (!ex) continue;
    const plain = noParen(ex.tokens);
    const v0 = evaluate(plain);
    const other = withParen(plain, ex.tokens[0].p === '(' ? 3 : 1); // ngoặc ở phép tính còn lại
    // Chạm dấu nào cũng tính được (rô-bốt kiểm chứng được cả lựa chọn sai), và ngoặc đúng chỗ mới ra mã.
    const vo = niceSteps(other);
    if (v0.error || !vo || v0.value === ex.value || vo.value === ex.value) continue;
    return { shape, plain, target: ex.value, sol: ex.tokens };
  }
  return null;
}

/** Cấp 4 — chọn thẻ: 3 biểu thức, đúng 1 thẻ ra mã. Bẫy: cùng các số, đổi / bỏ ngoặc. */
function makePick(rng, avoid) {
  for (let k = 0; k < 200; k++) {
    const shape = rng.pick([...SHAPES.mix, ...SHAPES.paren].filter(s => s !== avoid));
    const ex = makeExpr(shape, rng);
    if (!ex) continue;
    const plain = noParen(ex.tokens);
    const v0 = evaluate(plain).value;
    // Bẫy: cùng các số và dấu, bỏ ngoặc hoặc đặt ngoặc chỗ khác. Ngoặc quanh phép tính vốn làm trước là thừa
    // (sách không viết vậy) — không dùng.
    const traps = [plain, withParen(plain, 1), withParen(plain, 3)]
      .filter(t => exprText(t) !== exprText(ex.tokens))
      .filter(t => { const e = niceSteps(t); return e && e.value !== ex.value && (t === plain || e.value !== v0); });
    if (!traps.length) continue;
    const trap = rng.pick(traps);
    let third = null;
    for (let j = 0; j < 30 && !third; j++) {
      const o = makeExpr(rng.pick(SHAPES.mix.filter(s => s !== shape)), rng);
      if (o && o.value !== ex.value && o.value !== evaluate(trap).value) third = o.tokens;
    }
    if (!third) continue;
    const options = rng.shuffle([ex.tokens, trap, third]);
    return { shape, options, target: ex.value, right: options.indexOf(ex.tokens) };
  }
  return null;
}

export const ROBOT_GAME = {
  ...stallMeta('robot'),
  unitWord: 'mã',
  npcs: NPCS,
  levels: ROBOT_LEVELS,
  stallIcon: () => robotIcon(56),
  summaryText: (ok, total) => `Em đã nạp đúng <strong>${ok}/${total}</strong> mã năng lượng cho rô-bốt.`,

  howTo(level) {
    const pic = (p) => (p === 'robot' ? robotIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '🔋', label: 'Pin đầy' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    const i = history.length;
    if (level.kind === 'calc') {
      // Cấp 1: xen kẽ cộng trừ / nhân chia (bắt đầu ngẫu nhiên). Hình mẫu không lặp lại trong ván tới khi dùng hết.
      const famStart = history[0]?.famStart ?? rng.int(0, 1);
      const fam = level.families[(i + famStart) % level.families.length];
      const used = history.map(h => h.shape);
      const fresh = SHAPES[fam].filter(s => !used.includes(s));
      const shape = rng.pick(fresh.length ? fresh : SHAPES[fam].filter(s => s !== prev?.shape));
      const ex = makeExpr(shape, rng);
      return { npc, kind: 'calc', fam, famStart, shape, tokens: ex.tokens, value: ex.value };
    }
    // Cấp 4: mỗi ván đủ 3 kiểu, không hai lượt liền cùng kiểu.
    const order = history[0]?.order || rng.shuffle(['signs', 'paren', 'pick']);
    const kind = order[i % 3];
    const base = { npc, kind, order };
    if (kind === 'signs') return { ...base, ...makeSigns(rng) };
    if (kind === 'paren') return { ...base, ...makeParen(rng, prev?.shape) };
    return { ...base, ...makePick(rng, prev?.shape) };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const build = m.kind !== 'calc';
    const { counter, main, speak, row, ask, rest, thanks } = mountStall(stage, {
      npc: n, api, theme: 'robot', cameo: false,
      sign: `<span class="g3o-sign-ic">🤖</span><span><strong>Xưởng rô-bốt</strong><br>Nạp mã năng lượng</span>`,
      counter: `
        <div class="g3o-bench g3o-k-${m.kind}">
          <div class="g3o-target"><span class="g3o-batt">🔋</span> Mã năng lượng: <b data-target>${build ? m.target : Q}</b></div>
          <div class="g3o-belt"><div class="g3o-expr" data-expr></div></div>
          <div class="g3o-log" data-log></div>
          <div class="g3o-tools" data-tools></div>
          <div class="g3o-bot">${robotSvg()}</div>
        </div>`,
    });
    const bench = counter.querySelector('.g3o-bench');
    const exprBox = counter.querySelector('[data-expr]');
    const logBox = counter.querySelector('[data-log]');
    const tools = counter.querySelector('[data-tools]');
    const targetEl = counter.querySelector('[data-target]');
    const robot = counter.querySelector('.g3o-robot');
    const codeEl = robot.querySelector('[data-code]');

    let tokens = build ? (m.kind === 'signs' ? null : m.kind === 'paren' ? m.plain : null) : m.tokens;
    const slots = [null, null]; // cấp 4 đặt dấu: dấu trong 2 ô trống
    let chosen = -1; // cấp 4 chọn thẻ

    // ── Vẽ băng chuyền ────────────────────────────────────────────────────────────────────────────
    /** hideAt: thẻ vừa tính xong (còn ẩn, chờ thẻ bay từ rô-bốt tới). */
    const renderBelt = ({ hideAt = -1, pop = -1 } = {}) => {
      if (m.kind === 'signs') {
        const [a, b, c] = m.nums;
        const box = (k) => (slots[k]
          ? `<button type="button" class="g3o-tk g3o-op g3o-box-on" data-box="${k}" style="--c:${OP_COLOR[slots[k]]}">${slots[k]}</button>`
          : `<button type="button" class="g3o-tk g3o-box" data-box="${k}" aria-label="Ô trống"></button>`);
        if (!tokens) { exprBox.innerHTML = `<span class="g3o-tk g3o-n">${a}</span>${box(0)}<span class="g3o-tk g3o-n">${b}</span>${box(1)}<span class="g3o-tk g3o-n">${c}</span>`; fit(); return; }
      }
      if (!tokens) { exprBox.innerHTML = `<span class="g3o-empty">${Q}</span>`; fit(); return; }
      exprBox.innerHTML = tokens.map((t, i) => {
        const cls = `${i === hideAt ? ' g3o-hide' : ''}${i === pop && !calmMotion() ? ' g3o-pop' : ''}`;
        if (t.p) return `<span class="g3o-tk g3o-p${cls}" data-i="${i}">${t.p}</span>`;
        if (t.op) return `<button type="button" class="g3o-tk g3o-op${cls}" data-i="${i}" style="--c:${OP_COLOR[t.op]}">${t.op}</button>`;
        return `<span class="g3o-tk g3o-n${cls}" data-i="${i}">${t.n}</span>`;
      }).join('');
      fit();
    };
    const tokEl = (i) => exprBox.querySelector(`[data-i="${i}"]`);
    /** Các thẻ của phép tính ở vị trí i (kể cả ngoặc sẽ mất đi). */
    const groupIdx = (t, i) => {
      const g = [i - 1, i, i + 1];
      if (t[i - 2]?.p === '(' && t[i + 2]?.p === ')') g.unshift(i - 2), g.push(i + 2);
      return g;
    };
    const log = [];
    const renderLog = () => {
      logBox.innerHTML = log.map((l, k) => `<div class="g3o-line${k === log.length - 1 && k ? ' g3o-line-new' : ''}">${k ? '<span class="g3o-eq">=</span> ' : ''}${l}</div>`).join('');
      fit();
    };

    // ── Cỡ chữ theo khung: băng chuyền vừa một hàng, rô-bốt to hết cỡ còn lại ──────────────────────────
    const res0 = () => main.querySelector(':scope > .g3g-result');
    const fit = () => {
      if (!bench.isConnected) { obs.disconnect(); return; }
      // Thẻ kết quả hiện ra: chừa đáy quầy cho thẻ — không che băng chuyền, dòng ghi các bước và rô-bốt.
      const res = res0();
      bench.style.paddingBottom = res ? `${res.offsetHeight + 14}px` : '';
      bench.classList.toggle('g3o-done', !!res);
      const W = bench.clientWidth, H = bench.clientHeight;
      if (!W || !H) return;
      // Ngang: rô-bốt cột phải cao hết khung. Khung hẹp (điện thoại dọc, kể cả lúc bàn phím hiện làm quầy thấp đi)
      // luôn xếp dọc; thẻ gọn hơn để biểu thức dài vẫn to.
      const wide = W >= H * 1.15 && W >= 520;
      const tight = W < 520;
      bench.classList.toggle('g3o-wide', wide);
      bench.classList.toggle('g3o-tight', tight);
      const cs = getComputedStyle(bench);
      const Hc = H - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      const ratio = 200 / 262; // rô-bốt rộng / cao
      const botW0 = wide ? Math.min(W * 0.36, Hc * ratio) : 0;
      const workW = wide ? W - botW0 - 16 : W;
      // Độ rộng băng chuyền theo "em": số ~0.62em mỗi chữ số + lề thẻ, dấu 1.5em, ngoặc 0.5em, khe 0.28em (thẻ gọn: nhỏ hơn).
      const toks = [...exprBox.children];
      let em = tight ? 0.8 : 1.2;
      toks.forEach(el => {
        if (el.classList.contains('g3o-n')) em += 0.62 * el.textContent.length + (tight ? 0.45 : 0.75);
        else if (el.classList.contains('g3o-p')) em += 0.5;
        else em += tight ? 1.2 : 1.5;
        em += tight ? 0.16 : 0.28;
      });
      const fs = Math.max(16, Math.min(workW / em, Hc * (wide ? 0.16 : 0.1), 76));
      bench.style.setProperty('--fs', `${Math.floor(fs)}px`);
      // Rô-bốt to hết chỗ còn lại: màn ngang cao hết cột phải; màn dọc cao bằng hàng dòng ghi, chừa đủ chỗ cho dòng ghi.
      let botW = botW0;
      if (!wide) {
        bench.style.setProperty('--bot', '0px');
        const rowH = bench.querySelector('.g3o-bot').clientHeight;
        botW = Math.min(W - logBox.scrollWidth - 20, rowH * ratio, W * 0.6);
      }
      bench.style.setProperty('--bot', `${Math.floor(Math.max(70, botW))}px`);
    };
    const obs = new ResizeObserver(fit);
    obs.observe(counter);
    new MutationObserver(() => requestAnimationFrame(fit)).observe(main, { childList: true });

    // ── Rô-bốt ────────────────────────────────────────────────────────────────────────────────────
    const mood = (md) => { robot.dataset.mood = md; };
    const intakeRect = () => svgBoxOnScreen(robot, 80, 28, 40, 14);
    const slotRect = () => svgBoxOnScreen(robot, 78, 198, 44, 16);
    const flyHtml = (t) => (t.op ? opCard(t.op) : numCard(t.n));

    /**
     * Rô-bốt tính phép tính ở vị trí i của `tokens`: thẻ sáng lên, bay vào khe trên đầu, rô-bốt chạy, thẻ kết quả
     * bay ra khe dưới pin về chỗ cũ trên băng chuyền; dòng ghi thêm "= …". Trả về { v } hoặc { error } (không tính được).
     */
    const robotStep = async (i) => {
      const a = tokens[i - 1].n, op = tokens[i].op, b = tokens[i + 1].n;
      const g = groupIdx(tokens, i);
      g.forEach(k => tokEl(k)?.classList.add('g3o-hl'));
      await sleep(450);
      const to = intakeRect();
      let end = 0;
      [i - 1, i, i + 1].forEach((k, j) => {
        const el = tokEl(k);
        end = Math.max(end, flyOne(flyHtml(tokens[k]), el.getBoundingClientRect(), to, { delay: j * 110, minMs: 450, maxMs: 700, onLand: () => sfx.tap() }));
      });
      setTimeout(() => g.forEach(k => { const el = tokEl(k); if (el) el.style.visibility = 'hidden'; }), 120);
      await sleep(end + 50);
      mood('work');
      bench.classList.add('g3o-on');
      sfx.swish();
      await sleep(calmMotion() ? 900 : 750);
      bench.classList.remove('g3o-on');
      const v = calc(a, op, b, false);
      if (v === null) {
        mood('sad');
        sfx.boing();
        g.forEach(k => { const el = tokEl(k); if (el) { el.style.visibility = ''; el.classList.remove('g3o-hl'); el.classList.add('g3o-bad'); } });
        return { error: { a, op, b } };
      }
      const r = applyStep(tokens, i, v);
      tokens = r.tokens;
      renderBelt({ hideAt: r.at });
      const dst = tokEl(r.at);
      await sleep(flyOne(numCard(v, { color: '#DCFCE7' }), slotRect(), dst.getBoundingClientRect(), { minMs: 500, maxMs: 750, onLand: () => sfx.pop(1) }));
      dst.classList.remove('g3o-hide');
      if (!calmMotion()) dst.classList.add('g3o-pop');
      dst.classList.add('g3o-new');
      log.push(exprText(tokens));
      renderLog();
      mood('idle');
      await sleep(350);
      return { v, a, op, b };
    };

    /** Mã đúng: màn hình hiện mã, pin sạc từng vạch, rô-bốt vẫy tay. */
    const charge = async (code) => {
      targetEl.textContent = code;
      codeEl.textContent = code;
      mood('code');
      await sleep(500);
      const cells = [...robot.querySelectorAll('[data-cell]')];
      for (let k = 0; k < cells.length; k++) { cells[k].setAttribute('fill', '#4ADE80'); sfx.pop(k); await sleep(170); }
      mood('happy');
      bench.classList.add('g3o-dance');
      thanks();
    };
    const failWith = (line, text, tip) => {
      mood('sad');
      speak(line, 'sad', line);
      api.fail(text, tip);
    };

    renderBelt();
    if (m.kind === 'calc') { log.push(exprText(tokens)); renderLog(); } // cấp 4: dòng ghi bắt đầu khi rô-bốt chạy
    if (import.meta.env.DEV) window.__g3robot = { m, get tokens() { return tokens; }, stepIndex };

    // ════ Cấp 1–3: chọn phép tính làm trước, gõ kết quả, rô-bốt tính ══════════════════════════════════
    if (m.kind === 'calc') {
      let picking = -1; // vị trí phép tính đúng đang chờ bé chạm
      let first = true;
      const opEls = () => [...exprBox.querySelectorAll('.g3o-op')];
      const askValue = (i) => {
        const a = tokens[i - 1].n, op = tokens[i].op, b = tokens[i + 1].n;
        groupIdx(tokens, i).forEach(k => tokEl(k)?.classList.add('g3o-hl'));
        const last = tokens.filter(t => t.op).length === 1;
        speak(last ? `Còn một phép tính: ${a} ${op} ${b}. Bằng bao nhiêu?` : `Đúng rồi, tính ${a} ${op} ${b} trước. Bằng bao nhiêu?`, null,
          `<b class="g3f-want">${a} ${op} ${b}</b> = ?`);
        ask(row('🤖', `${a} ${op} ${b} =`, Q, true), '', async (v, pad) => {
          pad.lock();
          const r = await robotStep(i);
          if (v !== r.v) {
            pad.lock('g3g-keypad-bad');
            failWith(`Rô-bốt tính ra ${r.v}, không phải ${v}!`, `${a} ${op} ${b} = <b>${r.v}</b>${tokens.length > 1 ? `. Mã đúng: <b>${m.value}</b>` : ''}.`,
              `${solutionText(m.tokens)}.`);
            return;
          }
          pad.lock('g3g-keypad-ok');
          if (tokens.length === 1) { rest(); await charge(tokens[0].n); return; }
          rest();
          nextTurn();
        });
      };
      const nextTurn = () => {
        const i = stepIndex(tokens);
        if (tokens.filter(t => t.op).length === 1) { askValue(i); return; }
        picking = i;
        opEls().forEach(el => el.classList.add('g3o-ask'));
        const line = first
          ? `Rô-bốt phải tính phép nào trước? ${cap(n.you)} chạm vào dấu của phép tính đó!`
          : `Tiếp theo tính phép nào? ${cap(n.you)} chạm vào dấu!`;
        speak(line, null, first ? 'Tính phép nào trước? <b class="g3f-want">Chạm vào dấu!</b>' : 'Tiếp theo tính phép nào? <b class="g3f-want">Chạm vào dấu!</b>');
        first = false;
      };
      exprBox.addEventListener('click', (e) => {
        const b = e.target.closest('.g3o-op');
        if (!b || picking < 0) return;
        const k = Number(b.dataset.i), i = picking;
        picking = -1;
        opEls().forEach(el => el.classList.remove('g3o-ask'));
        if (k === i) { sfx.tap(); askValue(i); return; }
        // Chọn sai thứ tự: nhóm bé chọn đỏ, nhóm đúng sáng xanh.
        groupIdx(tokens, i).forEach(x => tokEl(x)?.classList.add('g3o-hl'));
        tokEl(k).classList.add('g3o-bad');
        const [a, op, bb] = [tokens[i - 1].n, tokens[i].op, tokens[i + 1].n];
        failWith(`Phải tính ${a} ${op} ${bb} trước!`, `Phải tính <b>${a} ${op} ${bb}</b> trước. Mã đúng: <b>${m.value}</b>.`,
          `${ruleFor(tokens)} ${solutionText(m.tokens)}.`);
      });
      nextTurn();
      return;
    }

    // ════ Cấp 4: lắp biểu thức cho ra mã ══════════════════════════════════════════════════════════════
    const runBtn = document.createElement('button');
    runBtn.type = 'button';
    runBtn.className = 'g3g-btn g3o-run g3o-run-wait';
    runBtn.innerHTML = '▶ Chạy rô-bốt';
    let ready = false, running = false;
    const setReady = (on) => {
      ready = on;
      runBtn.classList.toggle('g3o-run-wait', !on);
      runBtn.classList.toggle('g3o-run-ready', on);
    };
    const hintEl = (el) => { if (!el) return; el.classList.remove('g3o-hint'); void el.offsetWidth; el.classList.add('g3o-hint'); };

    const run = async () => {
      if (running) return;
      if (!ready) {
        const say = m.kind === 'signs' ? 'Đặt dấu vào đủ các ô trống trước!' : m.kind === 'paren' ? 'Chạm vào một dấu phép tính để đặt ngoặc trước!' : 'Chọn một thẻ biểu thức trước!';
        speak(say, null, say);
        hintEl(tools.querySelector('.g3o-pal, .g3o-picks') || exprBox);
        return;
      }
      running = true;
      setReady(false);
      runBtn.disabled = true;
      tools.classList.add('g3o-locked');
      if (m.kind === 'signs') tokens = [{ n: m.nums[0] }, { op: slots[0] }, { n: m.nums[1] }, { op: slots[1] }, { n: m.nums[2] }];
      renderBelt();
      log.length = 0;
      log.push(exprText(tokens));
      renderLog();
      const built = tokens;
      speak('Rô-bốt chạy đây!', null, 'Rô-bốt đang tính…');
      while (tokens.length > 1) {
        const r = await robotStep(stepIndex(tokens));
        if (r.error) {
          const { a, op, b } = r.error;
          const why = op === ':' ? `${a} : ${b} không chia hết` : `${a} không trừ được ${b}`;
          failWith(`${why}, rô-bốt không tính được!`, `${why}. Một cách đúng: <b>${solutionText(m.sol ?? m.options[m.right])}</b>.`,
            `${ruleFor(built)}`);
          return;
        }
      }
      const got = tokens[0].n;
      if (got === m.target) { await charge(got); return; }
      const right = m.sol ?? m.options[m.right];
      if (m.kind === 'pick') tools.querySelector(`[data-pick="${m.right}"]`)?.classList.add('g3o-pick-right');
      failWith(`Ra ${got}, chưa đúng mã ${m.target}!`, `${exprText(built)} = <b>${got}</b>. Mã cần là <b>${m.target}</b>: ${solutionText(right)}.`,
        ruleFor(right));
    };
    runBtn.onclick = run;

    if (m.kind === 'signs') {
      tools.innerHTML = `<div class="g3o-pal">${OPS.map(op => `<button type="button" class="g3o-tk g3o-op g3o-tile" data-op="${op}" style="--c:${OP_COLOR[op]}">${op}</button>`).join('')}</div>`;
      tools.appendChild(runBtn);
      const place = (op, from) => {
        const k = slots.indexOf(null);
        if (k < 0) { speak('Hai ô đã có dấu. Chạm vào dấu trong ô để bỏ ra!', null, 'Chạm vào dấu trong ô để bỏ ra!'); return; }
        slots[k] = op;
        const target = exprBox.querySelector(`[data-box="${k}"]`).getBoundingClientRect();
        renderBelt();
        const el = exprBox.querySelector(`[data-box="${k}"]`);
        el.style.visibility = 'hidden';
        flyOne(opCard(op), from.getBoundingClientRect(), target, { minMs: 380, maxMs: 560, onLand: () => { el.style.visibility = ''; sfx.pop(k); } });
        setReady(slots.every(Boolean));
      };
      tools.addEventListener('click', (e) => {
        const t = e.target.closest('[data-op]');
        if (!t || running) return;
        sfx.tap();
        place(t.dataset.op, t);
      });
      exprBox.addEventListener('click', (e) => {
        const b = e.target.closest('[data-box]');
        if (!b || running) return;
        const k = Number(b.dataset.box);
        if (!slots[k]) { hintEl(tools.querySelector('.g3o-pal')); return; }
        sfx.tap();
        slots[k] = null;
        renderBelt();
        setReady(false);
      });
      speak(`Rô-bốt cần mã ${m.target}. ${cap(n.you)} đặt dấu phép tính vào ô trống để biểu thức ra đúng ${m.target}!`, null,
        `Đặt dấu để ra mã <b class="g3f-want">${m.target}</b>!`);
      return;
    }

    if (m.kind === 'paren') {
      tools.innerHTML = '<div class="g3o-note">👆 Chạm vào dấu phép tính để đặt ngoặc</div>';
      tools.appendChild(runBtn);
      exprBox.addEventListener('click', (e) => {
        const b = e.target.closest('.g3o-op');
        if (!b || running) return;
        const plainIdx = noParen(tokens).indexOf(tokens[Number(b.dataset.i)]);
        tokens = withParen(m.plain, plainIdx);
        sfx.pop(1);
        const inner = tokens.findIndex(t => t.p === '(');
        renderBelt({ pop: inner });
        tokEl(inner + 4)?.classList.add('g3o-pop');
        setReady(true);
      });
      exprBox.classList.add('g3o-tap-ops');
      speak(`Rô-bốt cần mã ${m.target}. ${cap(n.you)} đặt dấu ngoặc vào đúng chỗ để biểu thức ra ${m.target}!`, null,
        `Đặt ngoặc để ra mã <b class="g3f-want">${m.target}</b>!`);
      return;
    }

    // pick
    tools.innerHTML = `<div class="g3o-picks">${m.options.map((t, k) => `<button type="button" class="g3g-btn g3o-pick" data-pick="${k}">${exprText(t)}</button>`).join('')}</div>`;
    tools.appendChild(runBtn);
    tools.addEventListener('click', (e) => {
      const b = e.target.closest('[data-pick]');
      if (!b || running) return;
      chosen = Number(b.dataset.pick);
      sfx.tap();
      tools.querySelectorAll('[data-pick]').forEach(x => x.classList.toggle('g3o-pick-on', x === b));
      const from = b.getBoundingClientRect();
      tokens = m.options[chosen];
      renderBelt();
      exprBox.style.visibility = 'hidden';
      flyOne(`<div class="g3o-flycard">${exprText(tokens)}</div>`, from, exprBox.getBoundingClientRect(), { minMs: 420, maxMs: 620, onLand: () => { exprBox.style.visibility = ''; } });
      setReady(true);
    });
    speak(`Rô-bốt cần mã ${m.target}. Thẻ biểu thức nào có giá trị bằng ${m.target}? ${cap(n.you)} chọn một thẻ!`, null,
      `Thẻ nào ra mã <b class="g3f-want">${m.target}</b>?`);
  },
};
