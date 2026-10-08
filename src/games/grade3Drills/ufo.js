/**
 * 🛸 Bảo vệ Trái Đất: đĩa bay của bọn Zíp Zắp mang "ổ khoá" phép tính có một số bị giấu (biến số) bay xuống thành phố.
 * Bé chọn viên đạn pha lê mang giá trị của số bị giấu (x = 45). Đạn trúng thì giá trị đó thay vào chỗ x ngay trên ổ khoá:
 * phép tính đúng (45 − 18 = 27 ✓) thì khiên vỡ, tàu bay về, con số bị cướp bay về lại một ô cửa sổ; sai (35 − 18 = 17 ≠ 27)
 * thì đạn bật ra, tàu Zíp bắn trả một quả cầu năng lượng xuống vòm khiên Trái Đất, Rô-bốt Bíp đọc quy tắc tìm.
 * Vòm khiên có 5 vạch: mỗi phát trúng (bắn sai, hoặc tàu lọt xuống chạm vòm) để lại một vết nứt đúng chỗ trúng, vòm đổi
 * màu dần xanh → vàng → cam → đỏ; hết vạch thì vòm vỡ tan, thua đợt.
 * Hết các tàu thường thì tàu mẹ xuống: mỗi vòng khiên là một bước tính, viết từng dòng như trong vở.
 * Thiết kế: docs/tro-choi-bao-ve-trai-dat.md, hình mockup docs/bao-ve-trai-dat/.
 *
 * Số bị giấu theo lớp: lớp 1 con Zíp nhỏ trong ô, lớp 2 ô "?", lớp 3 trở lên chữ x; lớp 4, 5 thêm biểu thức chứa chữ
 * với mật mã của đợt (a = 7), đổi mật mã giữa đợt. Cấp số lớn dùng bàn phím (gõ đúng là bắn ngay, như 🦈 Săn cá mập).
 *
 * Bố cục (không đổi trong lượt): ngang = bầu trời | bàn điều khiển (Bíp, ổ khoá, 4 nút đạn hoặc bàn phím);
 * dọc = bầu trời / bàn điều khiển. Thẻ kết quả đè giữa bầu trời (lúc đó trời đã trống).
 */

import { injectGameStyles } from '../grade3Games/styles.js';
import { loopSound } from '../preschool/fx.js';
import { preloadSfx } from '../../engine/sfx.js';
import { sfx, calmMotion, sleep, how, flyOne, fmt, noteFact, MINUS } from './kit.js';
import { solveRule } from './findx.js';
import { STARS, MOON, PLANET, citySvg, saucerSvg, SHIP_COLORS, MOTHER, CANNON, ROBOT, CRYSTAL, ZIP_TOKEN, MINI_UFO, SHIELD_ICON, robotImg } from './ufoArt.js';

// ── Số ───────────────────────────────────────────────────────────────────────────────────────────────
const num = (v) => Math.round(v * 100) / 100;
/** 4523 → "4 523", 4.5 → "4,5". */
const show = (v) => (Number.isInteger(v) ? fmt(v) : String(num(v)).replace('.', ','));
const speak = (v) => String(num(v)).replace('.', ' phẩy ');
const OPW = { '+': 'cộng', [MINUS]: 'trừ', '×': 'nhân', ':': 'chia' };
const calc = (x, op, y) => num(op === '+' ? x + y : op === MINUS ? x - y : op === '×' ? x * y : x / y);
const shuffle = (rng, a) => { const b = [...a]; for (let i = b.length - 1; i > 0; i--) { const j = rng.int(0, i); [b[i], b[j]] = [b[j], b[i]]; } return b; };
const pick = (rng, a) => a[rng.int(0, a.length - 1)];
/** Cộng quên nhớ: 27 + 18 → 35 (cộng từng hàng, bỏ số nhớ). */
const noCarryAdd = (a, b) => {
  let r = 0, p = 1;
  while (a > 0 || b > 0) { r += ((a % 10 + b % 10) % 10) * p; a = Math.floor(a / 10); b = Math.floor(b / 10); p *= 10; }
  return r;
};

/** Ba đạn sai: lấy theo thứ tự lỗi hay gặp, thiếu thì thêm số liền kề. */
function options(rng, ans, cands, decimals) {
  const ok = (v) => Number.isFinite(v) && v > 0 && num(v) !== num(ans) && (decimals || Number.isInteger(num(v))) && num(v) < 100000;
  const out = [];
  const add = (v) => { v = num(v); if (ok(v) && !out.includes(v)) out.push(v); };
  cands.forEach(add);
  const step = decimals && !Number.isInteger(ans) ? 0.5 : 1;
  [step, -step, 10 * step, -10 * step, 2 * step, -2 * step, 3 * step].forEach(d => add(ans + d));
  return shuffle(rng, [num(ans), ...out.slice(0, 3)]);
}

// ── Số bị giấu theo lớp ─────────────────────────────────────────────────────────────────────────────
const STYLE = {
  zip: { tok: () => `<span class="ufo-box ufo-box-zip">${ZIP_TOKEN}</span>`, say: 'con Zíp', name: 'Con Zíp', label: (v) => show(v), len: 1.6 },
  q: { tok: () => '<span class="ufo-box">?</span>', say: 'số nào', name: 'Số cần tìm', label: (v) => show(v), len: 1.5 },
  x: { tok: (l = 'x') => `<i class="ufo-v">${l}</i>`, say: 'ích', name: 'x', label: (v) => `<i class="ufo-v">x</i> = ${show(v)}`, len: 1 },
};
const plainLen = (s) => s.replace(/<[^>]+>/g, '').length;
const okNum = (v) => `<b class="ufo-n-ok">${show(v)}</b>`;
const badNum = (v) => `<b class="ufo-n-bad">${show(v)}</b>`;

/**
 * Ổ khoá "a op b = c" có một chỗ bị giấu: pos 0 (số thứ nhất), 2 (số thứ hai), 'r' (kết quả: phép tính thường).
 * Trả về câu hỏi chung { id, plate, len, ans, options, label(v), sub(v) → { ok, html }, say, hint, solve, solveSay, ret }.
 */
function eqQ(rng, { a, op, b, c, pos }, style, decimals = false) {
  const st = STYLE[style];
  const ans = pos === 0 ? a : pos === 2 ? b : c;
  const tok = pos === 'r' ? '<span class="ufo-box">?</span>' : st.tok();
  const A = pos === 0 ? tok : show(a), B = pos === 2 ? tok : show(b), C = pos === 'r' ? tok : show(c);
  const plate = `${A} ${op} ${B} = ${C}`;
  const len = plainLen(`${show(a)} ${op} ${show(b)} = ${show(c)}`) + (pos === 'r' ? 0 : st.len - show(ans).length);
  const sayPart = (p, v) => (p === pos ? (pos === 'r' ? 'mấy' : st.say) : speak(v));
  const say = `${sayPart(0, a)} ${OPW[op]} ${sayPart(2, b)} bằng ${sayPart('r', c)}${pos === 'r' ? '?' : '.'}`;
  const sub = (v) => {
    if (pos === 'r') {
      const ok = num(v) === num(c);
      return { ok, html: ok ? `${show(a)} ${op} ${show(b)} = ${okNum(v)} ✓` : `${show(a)} ${op} ${show(b)} ≠ ${badNum(v)}` };
    }
    const x = pos === 0 ? v : a, y = pos === 2 ? v : b;
    const X = pos === 0 ? (num(v) === num(ans) ? okNum(v) : badNum(v)) : show(a);
    const Y = pos === 2 ? (num(v) === num(ans) ? okNum(v) : badNum(v)) : show(b);
    const lhs = calc(x, op, y);
    const valid = Number.isFinite(lhs) && lhs >= 0 && (decimals || Number.isInteger(lhs));
    const ok = valid && num(lhs) === num(c);
    return { ok, html: ok ? `${X} ${op} ${Y} = ${show(c)} ✓` : valid ? `${X} ${op} ${Y} = ${show(lhs)} ≠ ${show(c)}` : `${X} ${op} ${Y} ≠ ${show(c)}` };
  };
  let hint, cands;
  const k = pos === 0 ? b : a; // số đã biết cùng vế
  if (pos === 'r') {
    hint = `Tính lại thật chậm: ${show(a)} ${op} ${show(b)}.`;
    cands = op === '+' ? [noCarryAdd(a, b), a - b, c + 10, c - 10]
      : op === MINUS ? [a + b, c + 10, c - 10]
        : op === '×' ? [a + b, a * (b + 1), a * (b - 1)]
          : [a - b, c + 1, c - 1];
  } else {
    const sol = solveRule(op, pos, a, b, c);
    const how1 = `${show(sol.x)} ${sol.op} ${show(sol.y)}`;
    hint = style === 'x' ? `${sol.rule.replace('Muốn tìm', 'x là').replace(', ta', ': ta')} Tính ${how1}.` : `${st.name} bằng ${how1}.`;
    if (op === '+') cands = [c + k, ans + (rng() < 0.5 ? 10 : -10), ans + 1, ans - 1];
    else if (op === MINUS && pos === 0) cands = [c - b, noCarryAdd(c, b), ans + (rng() < 0.5 ? 10 : -10), ans - 1];
    else if (op === MINUS) cands = [a + c, c, ans + 1, ans - 10];
    else if (op === '×') cands = [c * k, c - k, ans + 1, ans - 1];
    else if (pos === 0) cands = [c / b, c + b, ans + b, ans - b];
    else cands = [a * c, a - c, ans + 1, ans - 1];
    if (decimals) cands = [...cands.slice(0, 1), ans * 10, ans / 10, ...cands.slice(1)];
  }
  const okHtml = sub(ans).html;
  return {
    id: `${show(a)}${op}${show(b)}=${show(c)}@${pos}`, plate, len, ans: num(ans), say, hint, decimals,
    options: options(rng, ans, cands, decimals),
    label: pos === 'r' ? (v) => show(v) : st.label,
    sub,
    solve: pos === 'r' || style !== 'x' ? okHtml : `${st.label(ans)}: ${okHtml}`,
    solveSay: pos === 'r' ? `${speak(a)} ${OPW[op]} ${speak(b)} bằng ${speak(c)}.` : `${style === 'x' ? 'ích' : st.name} là ${speak(ans)}.`,
    ret: c,
  };
}

/** Biểu thức chứa chữ "a × 8" với mật mã vars = { a: 7 }. text dùng chữ a, b; wrongs là các lỗi hay gặp. */
function exprQ(rng, text, vars, ans, wrongs, decimals = false) {
  const letters = (s, f) => s.replace(/\b([ab])\b/g, (m) => f(m));
  const plate = letters(text, (l) => `<i class="ufo-v">${l}</i>`);
  const subbed = letters(text, (l) => show(vars[l]));
  const sayT = (s) => s.replace(/×/g, ' nhân ').replace(/:/g, ' chia ').replace(/\+/g, ' cộng ').replace(/−/g, ' trừ ').replace(/=/g, ' bằng ')
    .replace(/\(/g, ' mở ngoặc ').replace(/\)/g, ' đóng ngoặc ').replace(/(\d+)\.(\d+)/g, '$1 phẩy $2').replace(/\s+/g, ' ').trim();
  const sayVars = Object.keys(vars).filter(l => new RegExp(`\\b${l}\\b`).test(text)).map(l => `${l} bằng ${speak(vars[l])}`).join(', ');
  return {
    id: `${text}|${Object.values(vars).join(',')}`, plate, len: plainLen(text) + 2, ans: num(ans), decimals,
    say: `${sayT(text)}, với ${sayVars}.`,
    hint: `Thay chữ bằng số: ${subbed}.${/\(/.test(text) ? ' Tính trong ngoặc trước.' : ''}`,
    options: options(rng, ans, wrongs, decimals),
    label: (v) => show(v),
    sub: (v) => (num(v) === num(ans) ? { ok: true, html: `${subbed} = ${okNum(v)} ✓` } : { ok: false, html: `${subbed} ≠ ${badNum(v)}` }),
    solve: `${subbed} = ${show(ans)}`,
    solveSay: `${sayT(subbed)} bằng ${speak(ans)}.`,
    ret: ans,
  };
}

// ── Đề theo lớp ─────────────────────────────────────────────────────────────────────────────────────
/** Phép a op b = c có một chỗ giấu (pos 0 hoặc 2): đủ sáu vị trí như ở lớp. */
const E = (a, op, b, pos) => ({ a, op, b, c: calc(a, op, b), pos });
/** Cộng / trừ: biết số hạng, tổng (hoặc số bị trừ, số trừ, hiệu): dạng k = 0..3 lần lượt x + a, a + x, x − a, a − x. */
const addSub = (x, y, k) => (k === 0 ? E(x, '+', y, 0) : k === 1 ? E(y, '+', x, 2) : k === 2 ? E(num(x + y), MINUS, y, 0) : E(num(x + y), MINUS, x, 2));
const mulDiv = (t, u, k) => (k === 0 ? E(t, '×', u, 0) : k === 1 ? E(u, '×', t, 2) : k === 2 ? E(t * u, ':', u, 0) : E(t * u, ':', t, 2));

const G1 = {
  /** Trong phạm vi 10: 3 + ▢ = 7, ▢ − 2 = 5. */
  within10: (rng) => { const x = rng.int(1, 8), y = rng.int(1, 9 - x); return addSub(x, y, rng.int(0, 3)); },
  /** Trong phạm vi 20 không nhớ, số tròn chục. */
  within20: (rng) => {
    if (rng() < 0.4) { const x = rng.int(1, 8) * 10, y = rng.int(1, 9 - x / 10) * 10; return addSub(x, y, rng.int(0, 3)); }
    const u = rng.int(0, 7), y = rng.int(1, 9 - u), k = rng.int(0, 3);
    return k === 0 || k === 2 ? addSub(10 + u, y, k) : addSub(y, 10 + u, k);
  },
};
const G2 = {
  /** Qua 10 trong phạm vi 20: ? + 8 = 15, 13 − ? = 6. */
  cross: (rng) => { const x = rng.int(2, 9), y = rng.int(Math.max(2, 11 - x), 9); return addSub(x, y, rng.int(0, 3)); },
  /** Có nhớ trong phạm vi 100. */
  carry: (rng) => { let x, y; do { x = rng.int(12, 69); y = rng.int(3, 39); } while (x % 10 + y % 10 < 10 || x + y > 99); return addSub(x, y, rng.int(0, 3)); },
  /** Bảng nhân, chia 2 và 5. */
  table25: (rng) => mulDiv(rng.int(2, 10), pick(rng, [2, 5]), rng.int(0, 3)),
};
const G3 = {
  addSub: (rng) => { const x = rng.int(12, 89), y = rng.int(11, 99 - x > 11 ? 99 - x : 60); return addSub(x, y, rng.int(0, 3)); },
  mulDiv: (rng) => mulDiv(rng.int(2, 9), rng.int(2, 9), rng.int(0, 3)),
  big: (rng) => (rng() < 0.5
    ? addSub(rng.int(1000, 4999), rng.int(1000, 4999), rng.int(0, 3))
    : mulDiv(rng.int(102, 1999), rng.int(2, 5), rng.int(0, 3))),
};
const G4 = {
  big: (rng) => (rng() < 0.5
    ? addSub(rng.int(10, 79) * 50, rng.int(10, 79) * 50, rng.int(0, 3))
    : mulDiv(rng.int(2, 20) * 100, rng.int(2, 9), rng.int(0, 3))),
};
const G5 = {
  /** Cộng, trừ số thập phân một chữ số sau dấu phẩy. */
  dec: (rng) => { const x = rng.int(3, 79) / 10, y = rng.int(5, 40) / 10; return addSub(num(rng() < 0.4 ? Math.round(x) || 1 : x), num(y), rng.int(0, 3)); },
  /** Nhân, chia với 10, 100. */
  ten: (rng) => {
    const t = pick(rng, [10, 100]), k = rng.int(0, 1);
    if (k === 0) { const x = num(rng.int(11, 99) / (t === 10 ? 10 : 100)); return E(x, '×', t, 0); }
    const x = rng.int(2, 99); return E(x, ':', t, 0);
  },
};

/** Mật mã của đợt (lớp 4, 5): hai bộ, đổi giữa đợt. */
const VARS = {
  one: (rng) => ({ a: rng.int(3, 9) }),
  two: (rng) => { const a = rng.int(2, 9); let b; do { b = rng.int(2, 9); } while (b === a); return { a, b }; },
  dec: (rng) => ({ a: pick(rng, [2.5, 3.5, 4, 5, 6, 7.5, 8]), b: rng.int(2, 9) }),
};
const X4 = {
  /** Một chữ: a × 8, 125 − a, a + a + a, 56 : a, a × 6 + 4. */
  one: (rng, { a }) => {
    const k = rng.int(3, 9), m = rng.int(10, 15) * 10, q = rng.int(2, 9), d = rng.int(2, 9);
    return pick(rng, [
      () => exprQ(rng, `a × ${k}`, { a }, a * k, [a + k, Number(`${a}${k}`), a * (k - 1), a * (k + 1)]),
      () => exprQ(rng, `${m} − a`, { a }, m - a, [m + a, m - a + 10, m - a - 1]),
      () => exprQ(rng, 'a + a + a', { a }, 3 * a, [2 * a, 4 * a, a + 3]),
      () => exprQ(rng, `${a * q} : a`, { a }, q, [a * q - a, q + 1, q - 1]),
      () => exprQ(rng, `a × ${k} + ${d}`, { a }, a * k + d, [a * (k + d), a * k, a * k + d + 10]),
    ])();
  },
  /** Hai chữ: a + b, a × b, (a + b) × 2, a × b − a. */
  two: (rng, { a, b }) => {
    const k = rng.int(2, 5);
    return pick(rng, [
      () => exprQ(rng, 'a + b', { a, b }, a + b, [a * b, a + b + 10, a + b - 1]),
      () => exprQ(rng, 'a × b', { a, b }, a * b, [a + b, a * (b + 1), a * (b - 1)]),
      () => exprQ(rng, `(a + b) × ${k}`, { a, b }, (a + b) * k, [a + b * k, a + b, (a + b) * (k + 1)]),
      () => exprQ(rng, 'a × b + a', { a, b }, a * b + a, [a * (b + a), a * b, a * b + a + 10]),
    ])();
  },
  /** Lớp 5: công thức chu vi, diện tích. */
  shape: (rng, { a, b }) => pick(rng, [
    () => exprQ(rng, 'S = a × b', { a, b }, a * b, [(a + b) * 2, a + b, a * (b + 1)], true),
    () => exprQ(rng, 'P = (a + b) × 2', { a, b }, (a + b) * 2, [a * b, a + b, a + b * 2], true),
    () => exprQ(rng, 'P = a × 4', { a }, a * 4, [a * a, a + 4, a * 2], true),
    () => exprQ(rng, 'S = a × a', { a }, a * a, [a * 4, a * 2, a + a], true),
  ])(),
};

// ── Tàu mẹ: mỗi vòng khiên là một bước tính ─────────────────────────────────────────────────────────
/**
 * Lớp 1–3, lớp 5 cấp 1, 2: tìm số bị giấu, rồi dùng chính số đó tính tiếp (x + 18 = 50 → x : 4 = ?).
 * lines: các dòng trên bảng dưới tàu mẹ; steps[i] = { q, line, active, after }: active là dòng i lúc đang bắn.
 */
function chainBoss(rng, level) {
  let e;
  do e = level.eq(rng); while (e.pos === 'r');
  const q1 = eqQ(rng, e, level.style, level.decimals);
  const v = q1.ans, st = STYLE[level.style];
  const [op, k] = chainStep(rng, level, v);
  const q2 = eqQ(rng, { a: v, op, b: k, c: calc(v, op, k), pos: 'r' }, level.style, level.decimals);
  const tok = st.tok();
  const head = `${tok} ${op} ${show(k)}`;
  return {
    lines: [q1.plate, `${head} = ?`],
    steps: [
      { q: q1, line: 0, active: q1.plate, after: q1.sub(v).html },
      // Số vừa tìm thay thẳng vào chỗ bị giấu (tô xanh): mỗi dòng một dấu "=" (không viết nối "▢ + 3 = 2 + 3 = ?").
      { q: q2, line: 1, active: `${okNum(v)} ${op} ${show(k)} = ?`, after: `${okNum(v)} ${op} ${show(k)} = ${okNum(q2.ans)} ✓` },
    ],
  };
}
/** Bước thứ hai của tàu mẹ: tính tiếp với số vừa tìm, vừa sức từng lớp (lớp 1 không nhớ, lớp 2 bảng 2 và 5). */
function chainStep(rng, level, v) {
  if (level.decimals) return ['+', rng.int(1, 5)];
  if (level.style === 'zip') {
    if (v >= 10 && v % 10 === 0) return v <= 50 ? ['+', rng.int(1, (90 - v) / 10) * 10] : [MINUS, rng.int(1, v / 10 - 1) * 10];
    const lim = v <= 10 ? 10 : 19;
    if (v < lim && (v <= lim - 3 || rng() < 0.5)) return ['+', rng.int(1, lim - v)];
    return [MINUS, rng.int(1, v <= 10 ? v - 1 : v % 10 || 1)];
  }
  if (level.style === 'q' && level.mulOk) return v <= 10 ? ['×', pick(rng, [2, 5])] : v % 5 === 0 ? [':', 5] : v % 2 === 0 ? [':', 2] : ['+', rng.int(2, 9)];
  if (level.mulOk && v <= 10) return ['×', rng.int(2, 5)];
  if (level.mulOk && v % 4 === 0) return [':', 4];
  if (level.mulOk && v % 2 === 0) return [':', 2];
  return ['+', v >= 1000 ? rng.int(1, 9) * 100 : rng.int(2, 9)];
}

/** Lớp 4, lớp 5 cấp 3: (a + b) × k với mật mã: thay chữ (có sẵn), tính trong ngoặc, rồi nhân. */
function exprBoss(rng, level, vars) {
  const two = vars.b != null; // cấp một chữ: (a + 4) × k, cấp hai chữ: (a + b) × k
  const a = vars.a, b = two ? vars.b : rng.int(2, 9);
  const k = rng.int(2, 5), s = num(a + b);
  const q1 = eqQ(rng, { a, op: '+', b, c: s, pos: 'r' }, 'x', level.decimals);
  const q2 = eqQ(rng, { a: s, op: '×', b: k, c: num(s * k), pos: 'r' }, 'x', level.decimals);
  q1.hint = `Tính trong ngoặc trước: ${show(a)} + ${show(b)}.`;
  q2.options = options(rng, q2.ans, [a + b * k, s + k, s * (k + 1)], level.decimals);
  return {
    vars: two ? { a, b } : { a },
    lines: [`(<i class="ufo-v">a</i> + ${two ? '<i class="ufo-v">b</i>' : show(b)}) × ${k}`, `= (${show(a)} + ${show(b)}) × ${k}`, `= ? × ${k}`, '= ?'],
    steps: [
      { q: q1, line: 2, active: `= ? × ${k}`, after: `= ${okNum(s)} × ${k}` },
      { q: q2, line: 3, active: '= ?', after: `= ${okNum(q2.ans)} ✓` },
    ],
  };
}

// ── Một đợt ─────────────────────────────────────────────────────────────────────────────────────────
const clash = (x, y) => { const a = String(x), b = String(y); return a.startsWith(b) || b.startsWith(a); };

function makeWave(rng, level, history) {
  const used = new Set(history.flatMap(h => h?.qs?.map(q => q.id) || []));
  const n = level.count;
  const vars = level.vars ? [level.vars(rng), level.vars(rng)] : null;
  if (vars && Object.values(vars[0]).join() === Object.values(vars[1]).join()) vars[1] = level.vars(rng);
  const qs = [];
  for (let i = 0; i < n; i++) {
    let q;
    for (let t = 0; t < 40; t++) {
      q = level.expr ? level.expr(rng, vars[i < n / 2 ? 0 : 1]) : eqQ(rng, level.eq(rng), level.style, level.decimals);
      const dup = qs.some(o => o.id === q.id || (level.typed && clash(o.ans, q.ans)));
      if (!dup && (!used.has(q.id) || t > 30)) break;
    }
    q.vars = vars ? vars[i < n / 2 ? 0 : 1] : null;
    qs.push(q);
  }
  const boss = level.expr ? exprBoss(rng, level, vars[1]) : chainBoss(rng, level);
  return { qs, boss, vars, secs: level.secs * (1 - 0.04 * Math.min(history.length, 4)), first: history.length === 0 };
}

// ── Màn chơi ────────────────────────────────────────────────────────────────────────────────────────
const LANES = [0.165, 0.39, 0.61, 0.835];
const HP = 5; // vạch khiên của vòm bảo vệ Trái Đất
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'del', '0', 'ok'];

// Nền trời đêm: bật khi vào đợt đầu, chạy liền qua các đợt và thẻ kết quả, tắt khi rời trò
// (chỉ đợt mới nhất được tắt, vì đợt sau dựng xong rồi đợt trước mới biết mình bị gỡ). Như nền biển của 🦈.
const spaceBg = loopSound('spaceLoop', { vol: 0.45 }); // file đã chuẩn hoá rms −20 dB, đủ rõ trên loa máy tính bảng
let bgOwner = 0;

function mountUfo(stage, m, level, api) {
  const bgId = ++bgOwner;
  spaceBg.start();
  preloadSfx('motherIn', 'fireworks'); // tiếng dài chỉ tải khi cần: tải trước để tàu mẹ, pháo hoa kêu đúng lúc
  injectGameStyles();
  injectUfoStyles();
  const typed = !!level.typed;
  const total = m.qs.length;
  stage.innerHTML = `
    <div class="ufo-scene animate-fadeIn">
      <div class="ufo-sky" data-result-host>
        ${STARS}
        <div class="ufo-moon-w">${MOON}</div><div class="ufo-planet-w">${PLANET}</div>
        <div class="ufo-dome"><svg class="ufo-cracks" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true"><clipPath id="ufoDomeClip"><path d="M0 500 A500 500 0 0 1 1000 500 Z"/></clipPath><g clip-path="url(#ufoDomeClip)"></g></svg></div>
        <div class="ufo-city-w">${citySvg(5 + Math.floor(Math.random() * 40))}</div>
        <div class="ufo-cannon">${CANNON}</div>
        <div class="ufo-layer"></div>
        <svg class="ufo-fx" aria-hidden="true"></svg>
        <div class="ufo-hud">
          <div class="ufo-count">${m.qs.map(() => `<span class="ufo-mini">${MINI_UFO}</span>`).join('')}<span class="ufo-mini ufo-mini-boss">${MINI_UFO}</span></div>
          <div class="ufo-shields">${Array.from({ length: HP }, () => `<span class="ufo-sh">${SHIELD_ICON}</span>`).join('')}</div>
        </div>
      </div>
      <div class="ufo-console">
        <div class="ufo-bip bip-happy"><div class="ufo-robot">${ROBOT}</div><div class="ufo-bubble"><span>&nbsp;</span></div></div>
        <button type="button" class="ufo-lock" aria-label="Đọc ổ khoá">
          <span class="ufo-lock-h"><i class="ufo-lock-dot"></i><span class="ufo-lock-t">&nbsp;</span></span>
          <span class="ufo-lock-eq"><span class="ufo-lock-v">&nbsp;</span></span>
        </button>
        ${typed ? `<div class="ufo-pad"><div class="ufo-lcd"><span class="ufo-lcd-val">&nbsp;</span></div>
            <div class="ufo-keys">${KEYS.map(k => `<button type="button" class="ufo-key ${k === 'del' ? 'ufo-key-del' : k === 'ok' ? 'ufo-key-ok' : ''}" data-k="${k}">${k === 'del' ? '⌫' : k === 'ok' ? 'Bắn' : k}</button>`).join('')}</div></div>`
    : `<div class="ufo-ammo">${[0, 1, 2, 3].map(i => `<button type="button" class="ufo-shell" data-i="${i}" disabled><span class="ufo-shell-in"><span class="ufo-shell-c">${CRYSTAL}</span><span class="ufo-shell-v"><span class="ufo-shell-t">&nbsp;</span></span></span></button>`).join('')}</div>`}
      </div>
    </div>`;
  const $ = (s) => stage.querySelector(s);
  const sky = $('.ufo-sky'), layer = $('.ufo-layer'), fx = $('.ufo-fx'), dome = $('.ufo-dome');
  const cannonEl = $('.ufo-cannon'), barrel = cannonEl.querySelector('.ufo-barrel'), core = cannonEl.querySelector('.ufo-core');
  const bipBox = $('.ufo-bip'), bubble = $('.ufo-bubble span');
  const lockBtn = $('.ufo-lock'), lockT = $('.ufo-lock-t'), lockDot = $('.ufo-lock-dot'), lockV = $('.ufo-lock-v'), lockEq = $('.ufo-lock-eq');
  const shells = [...stage.querySelectorAll('.ufo-shell')];
  const minis = [...stage.querySelectorAll('.ufo-mini')];
  const shieldEls = [...stage.querySelectorAll('.ufo-sh')];
  const calm = calmMotion();

  let W = sky.clientWidth, H = sky.clientHeight;
  const ro = new ResizeObserver(() => { W = sky.clientWidth; H = sky.clientHeight; fx.setAttribute('viewBox', `0 0 ${W} ${H}`); ships.forEach(measure); });
  ro.observe(sky);
  fx.setAttribute('viewBox', `0 0 ${W} ${H}`);
  const rel = (el) => { const r = el.getBoundingClientRect(), o = sky.getBoundingClientRect(); return { x: r.left - o.left, y: r.top - o.top, w: r.width, h: r.height }; };

  // ── Cửa sổ: mỗi tàu đã cướp một con số (một ô tắt đèn); bắn trúng thì số bay về, ô sáng lại ──
  const wins = [...sky.querySelectorAll('.ufo-win-c.ufo-win-on')].sort(() => Math.random() - 0.5);
  const dark = wins.slice(0, total + 1);
  dark.forEach(w => w.classList.remove('ufo-win-on'));
  const lit = wins.slice(total + 1);

  // ── Rô-bốt Bíp ──
  /** Đọc to; nhạc nền nhỏ lại trong lúc đọc. */
  function talk(text) {
    const plain = text.replace(/<[^>]+>/g, '');
    spaceBg.duck(0.35, 900 + plain.length * 75);
    api.say(plain);
  }
  let bipTimer = 0;
  function bip(text, mood = 'happy', { voice = true } = {}) {
    bipBox.className = `ufo-bip bip-${mood} bip-talk`;
    bubble.innerHTML = text;
    bubble.parentElement.classList.add('ufo-bubble-on');
    clearTimeout(bipTimer);
    bipTimer = setTimeout(() => bipBox.classList.remove('bip-talk'), 1600);
    if (voice) talk(text);
  }

  // ── Đĩa bay ──
  const ships = new Set();
  let resolved = 0, spawned = 0, shields = HP, over = false, finished = false, firstHits = 0, busy = false;
  let lockS = null, boss = null, group2At = null, t = 0;
  const escaped = [];
  const measure = (s) => { if (s.el) { s.w = s.el.offsetWidth; s.h = s.el.offsetHeight; } };
  const live = () => [...ships].filter(s => s.state === 'fly');
  const group = (i) => (m.vars && i >= total / 2 ? 1 : 0);

  /** Đỉnh vòm khiên ở hoành độ x (toạ độ trời). */
  function domeY(x) {
    const d = rel(dome), cx = d.x + d.w / 2, rx = d.w / 2;
    const u = Math.min(0.98, Math.abs(x - cx) / rx);
    return d.y + d.h - d.h * Math.sqrt(1 - u * u);
  }

  function spawn() {
    const i = spawned++;
    const q = m.qs[i];
    const busyLanes = live().filter(s => s.p < 0.45).map(s => s.lane);
    const free = [0, 1, 2, 3].filter(l => !busyLanes.includes(l) && !live().some(s => s.lane === l && s.p < 0.7));
    const lane = (free.length ? free : [0, 1, 2, 3])[Math.floor(Math.random() * (free.length || 4))];
    const col = SHIP_COLORS[i % SHIP_COLORS.length];
    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'ufo-ship';
    el.style.setProperty('--len', Math.max(6, q.len));
    el.innerHTML = `<span class="ufo-ship-in">${saucerSvg(col)}<span class="ufo-plate"><span class="ufo-plate-t">${q.plate}</span></span><i class="ufo-lockmark"></i></span>`;
    layer.appendChild(el);
    const s = { el, q, i, lane, col, p: 0, enter: calm ? 0.4 : 0, state: 'fly', wrongs: 0, used: new Set(), phase: Math.random() * 6 };
    measure(s);
    ships.add(s);
    place(s);
    sfx.ufoIn();
    el.addEventListener('click', () => { if (s.state === 'fly' && !boss) { setLock(s); sfx.tap(); } });
    if (!lockS || lockS.state !== 'fly') setLock(s);
  }

  /** Tàu bay vào nhanh tới ngay dưới bảng đợt, rồi mới chậm rãi xuống vòm khiên. */
  const hud = $('.ufo-hud');
  function place(s) {
    const x = LANES[s.lane] * W;
    const hb = rel(hud), yS = hb.y + hb.h + H * 0.012, y1 = domeY(x) - s.h * 0.92;
    const base = yS + (y1 - yS) * s.p;
    const e = 1 - (1 - Math.min(1, s.enter)) ** 3;
    s.x = x; s.y = -s.h - 4 + (base + 4 + s.h) * e + Math.sin(t * 2 + s.phase) * H * 0.006;
    s.el.style.transform = `translate(${(x - s.w / 2).toFixed(1)}px, ${s.y.toFixed(1)}px)`;
  }

  // ── Khoá mục tiêu: bàn điều khiển hiện ổ khoá + 4 viên đạn của tàu đang khoá ──
  function setLock(s) {
    if (lockS && lockS.el) lockS.el.classList.remove('ufo-locked');
    lockS = s;
    if (s?.el) s.el.classList.add('ufo-locked');
    if (s && level.style === 'zip' && s.state === 'fly') talk(s.q.say);
    renderConsole();
  }
  function autoLock() {
    if (boss) return;
    const best = live().sort((a, b) => b.p - a.p)[0] || null;
    if (best !== lockS) setLock(best);
  }
  function target() { return over ? null : boss ? boss.cur : lockS && lockS.state === 'fly' ? lockS : null; }
  function curQ() { const s = target(); return !s ? null : boss ? boss.data.steps[boss.k]?.q || null : s.q; }

  function renderConsole() {
    const s = target(), q = curQ();
    if (!q) {
      lockT.textContent = 'Rađa đang quét…';
      lockDot.style.background = '#94A3B8';
      lockV.innerHTML = '&nbsp;';
      shells.forEach(b => { b.disabled = true; b.classList.remove('ufo-used', 'ufo-glow'); b.querySelector('.ufo-shell-t').innerHTML = '&nbsp;'; });
      return;
    }
    const vars = boss ? boss.data.vars : s.q.vars;
    lockT.innerHTML = vars ? `Mật mã: ${Object.entries(vars).map(([l, v]) => `<i class="ufo-v">${l}</i> = ${show(v)}`).join(', ')}` : boss ? 'Tàu mẹ' : `Ổ khoá tàu ${s.col[3]}`;
    lockDot.style.background = boss ? '#A78BFA' : s.col[0];
    lockV.innerHTML = q.plate;
    lockEq.style.setProperty('--len', Math.max(7, q.len));
    const len = Math.max(4, ...q.options.map(v => plainLen(q.label(v)))); // bốn nút cùng cỡ chữ
    shells.forEach((b, i) => {
      const v = q.options[i];
      b.querySelector('.ufo-shell-t').innerHTML = q.label(v);
      b.style.setProperty('--len', len);
      const used = s.used.has(i);
      b.disabled = used || over;
      b.classList.toggle('ufo-used', used);
      b.classList.toggle('ufo-glow', s.wrongs >= 2 && num(v) === q.ans);
    });
  }
  lockBtn.addEventListener('click', () => { const q = curQ(); if (q) talk(q.say); });

  // ── Pháo: nòng xoay về mục tiêu, tia sáng từ đầu nòng ──
  let ang = 0, angTo = 0;
  const pivot = () => { const r = rel(cannonEl), k = r.h / 272; return { x: r.x + r.w / 2, y: r.y + 158 * k, k }; };
  function aimAt(x, y) { const p = pivot(); angTo = Math.max(-70, Math.min(70, Math.atan2(x - p.x, p.y - y) * 180 / Math.PI)); }
  function muzzle() { const p = pivot(), a = ang * Math.PI / 180, d = 129 * p.k; return { x: p.x + Math.sin(a) * d, y: p.y - Math.cos(a) * d }; }

  function laser(x, y, ok) {
    const mz = muzzle();
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'ufo-beam');
    const wd = Math.max(6, H * 0.012);
    g.innerHTML = `<line x1="${mz.x}" y1="${mz.y}" x2="${x}" y2="${y}" stroke="${ok ? '#22D3EE' : '#FCA5A5'}" stroke-width="${wd * 2.4}" stroke-linecap="round" opacity=".4"/>
      <line x1="${mz.x}" y1="${mz.y}" x2="${x}" y2="${y}" stroke="#ECFEFF" stroke-width="${wd}" stroke-linecap="round"/>`;
    fx.appendChild(g);
    setTimeout(() => g.remove(), 380);
    cannonEl.classList.remove('ufo-fire'); void cannonEl.offsetWidth; cannonEl.classList.add('ufo-fire');
  }

  // ── Bắn: viên đạn bay vào pháo, nòng xoay, tia sáng, số thay vào chỗ x trên ổ khoá ──
  async function shoot(v, fromEl, idx) {
    const s = target(), q = curQ();
    if (!s || !q || busy || over) return;
    busy = true;
    shells.forEach(b => b.classList.add('ufo-wait'));
    const plate = boss ? boss.lineEls[boss.data.steps[boss.k].line] : s.el.querySelector('.ufo-plate');
    const pr = rel(plate);
    aimAt(pr.x + pr.w / 2, pr.y + pr.h / 2);
    const src = fromEl.querySelector('.ufo-shell-c, .ufo-lcd') || fromEl;
    sfx.ufoLoad();
    await new Promise(r => flyOne(CRYSTAL, src.getBoundingClientRect(), core.getBoundingClientRect(), { minMs: 280, maxMs: 520, onLand: r }));
    await sleep(calm ? 120 : 220);
    const res = q.sub(v);
    const pr2 = rel(plate);
    laser(pr2.x + pr2.w / 2, pr2.y + pr2.h / 2, res.ok);
    sfx.laser();
    const sr = sky.getBoundingClientRect(), mz = muzzle();
    await new Promise(r => flyOne(`<b class="ufo-tag">${q.label(v)}</b>`, { left: sr.left + mz.x - 50, top: sr.top + mz.y - 20, width: 100, height: 40 }, plate.getBoundingClientRect(), { minMs: 260, maxMs: 420, onLand: r }));
    if (boss) await bossHit(v, res, idx);
    else if (res.ok) hit(s, res);
    else miss(s, res, idx);
    busy = false;
    shells.forEach(b => b.classList.remove('ufo-wait'));
  }

  /** Đổi chữ trên ổ khoá của tàu, cỡ chữ theo độ dài chữ mới. */
  function setPlate(s, html, cls) {
    const pl = s.el.querySelector('.ufo-plate');
    pl.querySelector('.ufo-plate-t').innerHTML = html;
    pl.style.setProperty('--len', Math.max(6, plainLen(html)));
    pl.classList.remove('ufo-plate-ok', 'ufo-plate-bad', 'ufo-plate-solve');
    if (cls) pl.classList.add(cls);
    return pl;
  }

  function hit(s, res) {
    s.state = 'hit';
    const first = s.wrongs === 0;
    if (first) firstHits++;
    noteFact(`ufo:${s.q.id}`, first);
    setPlate(s, res.html, 'ufo-plate-ok');
    s.el.classList.remove('ufo-locked', 'ufo-bounce');
    s.el.classList.add('ufo-cracked');
    sfx.shieldBreak();
    minis[s.i].classList.add('ufo-mini-ok');
    returnNumber(s.el, s.q.ret);
    setTimeout(() => { s.el.classList.add('ufo-away'); sfx.ufoAway(); }, calm ? 700 : 900);
    setTimeout(() => { ships.delete(s); s.el.remove(); }, 2300);
    if (lockS === s) { lockS = null; autoLock(); }
    done1();
  }

  function miss(s, res, idx) {
    s.wrongs++;
    if (idx != null) s.used.add(idx);
    sfx.deflect();
    setPlate(s, res.html, 'ufo-plate-bad');
    s.el.classList.remove('ufo-bounce'); void s.el.offsetWidth; s.el.classList.add('ufo-bounce');
    bip(s.q.hint, 'think');
    // Tàu Zíp bắn trả: quả cầu năng lượng màu của tàu rơi xuống vòm ngay dưới nó
    setTimeout(() => { if (!over && s.state === 'fly') alienFire(s.x, s.y + s.h * 0.52, s.col[0]); }, 450);
    setTimeout(() => { if (s.state === 'fly') { setPlate(s, s.q.plate); s.el.querySelector('.ufo-plate').style.setProperty('--len', Math.max(6, s.q.len)); } }, 1900);
    renderConsole();
  }

  // ── Vòm khiên Trái Đất: mỗi phát trúng để lại một vết nứt đúng chỗ trúng; hết vạch thì vỡ ──
  const cracks = dome.querySelector('.ufo-cracks g');
  /** Vết nứt kính kiểu mạng nhện tại điểm trúng (toạ độ vòm: viewBox 1000 × 500, nửa elip): tia gãy khúc toả đều quanh tâm
   *  + một vòng nối ngang giữa các tia; đo theo px màn hình nên không bị kéo méo, càng về sau càng to và nhiều tia. */
  function crackAt(x) {
    const d = rel(dome);
    const cx = Math.max(60, Math.min(940, (x - d.x) / d.w * 1000));
    const u = (cx - 500) / 500, cy = 500 - 500 * Math.sqrt(Math.max(0, 1 - u * u)) + 10;
    const sx = 1000 / d.w, sy = 500 / d.h; // px màn hình → đơn vị vòm
    const dmg = HP - shields, rays = 5 + Math.min(3, dmg), R = Math.min(d.w * 0.06, d.h * 0.16) * (0.8 + dmg * 0.12);
    const pt = (a, r) => [cx + Math.cos(a) * r * sx, cy + Math.sin(a) * r * sy];
    const f = (p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
    const a0 = Math.random() * Math.PI * 2, ring = [];
    let path = '';
    for (let r = 0; r < rays; r++) {
      const a = a0 + Math.PI * 2 * (r + (Math.random() - 0.5) * 0.5) / rays, len = R * (0.65 + Math.random() * 0.45);
      path += `M${f([cx, cy])}`;
      for (let seg = 1; seg <= 3; seg++) path += ` L${f(pt(a + (Math.random() - 0.5) * 0.35, len * seg / 3))}`;
      ring.push(pt(a + (Math.random() - 0.5) * 0.15, len * (0.35 + Math.random() * 0.12)));
    }
    ring.forEach((p, n) => { if (n % 3 !== 2) path += ` M${f(p)} L${f(ring[(n + 1) % rays])}`; });
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    g.setAttribute('class', 'ufo-crack-new');
    g.innerHTML = `<path class="ufo-crk-glow" d="${path}"/><path class="ufo-crk" d="${path}"/><ellipse class="ufo-crk-dot" cx="${cx.toFixed(0)}" cy="${cy.toFixed(0)}" rx="${(5 * sx).toFixed(1)}" ry="${(5 * sy).toFixed(1)}"/>`;
    cracks.appendChild(g);
  }
  /** Vòm trúng một phát ở hoành độ x: mất một vạch, nứt thêm, đổi màu; hết vạch thì vỡ tan và thua đợt. */
  function hitDome(x) {
    if (over || shields <= 0) return;
    shields--;
    shieldEls[shields]?.classList.add('ufo-sh-lost');
    dome.dataset.dmg = HP - shields;
    dome.classList.remove('ufo-dome-hit'); void dome.offsetWidth; dome.classList.add('ufo-dome-hit');
    crackAt(x);
    sfx.domeHit();
    if (!shields) { dome.classList.add('ufo-dome-broken'); setTimeout(() => sfx.domeBreak(), 250); lose(); }
  }
  /** Tàu bắn trả một quả cầu năng lượng từ (x0, y0) xuống vòm ngay bên dưới. */
  function alienFire(x0, y0, color) {
    const x1 = x0 + (Math.random() - 0.5) * W * 0.05, y1 = domeY(x1);
    const b = document.createElement('i');
    b.className = 'ufo-bolt';
    b.style.setProperty('--c', color);
    layer.appendChild(b);
    sfx.alienShot();
    b.animate([{ transform: `translate(${x0}px, ${y0}px) scale(.5)` }, { transform: `translate(${x1}px, ${y1}px) scale(1)` }],
      { duration: calm ? 700 : 560, easing: 'ease-in', fill: 'forwards' })
      .finished.then(() => { b.remove(); hitDome(x1); }, () => b.remove());
  }

  /** Con số bị cướp bay từ tàu về một ô cửa sổ tối, ô đó sáng lại. */
  function returnNumber(fromEl, n) {
    const w = dark.shift();
    if (!w) return;
    const r = fromEl.querySelector('.ufo-plate')?.getBoundingClientRect() || fromEl.getBoundingClientRect();
    const box = { left: r.left + r.width / 2 - 30, top: r.top, width: 60, height: 40 };
    const wr = w.getBoundingClientRect();
    flyOne(`<b class="ufo-num">${show(n)}</b>`, box, { left: wr.left + wr.width / 2 - 15, top: wr.top + wr.height / 2 - 10, width: 30, height: 20 },
      { delay: 350, minMs: 600, maxMs: 1000, onLand: () => { w.classList.add('ufo-win-on', 'ufo-win-pop'); lit.push(w); sfx.numberHome(); } });
  }

  /** Tàu chạm khiên thành phố: mất một vạch, một ô cửa sổ tắt; ổ khoá hiện lời giải. */
  async function escape(s) {
    s.state = 'esc';
    escaped.push(s.q);
    noteFact(`ufo:${s.q.id}`, false);
    minis[s.i].classList.add('ufo-mini-bad');
    const w = lit.splice(Math.floor(Math.random() * lit.length), 1)[0];
    if (w) w.classList.remove('ufo-win-on');
    setPlate(s, s.q.solve, 'ufo-plate-solve');
    s.el.classList.remove('ufo-locked');
    if (lockS === s) { lockS = null; autoLock(); }
    hitDome(s.x);
    if (!shields) return; // vòm vỡ: lose() đã chạy
    talk(s.q.solveSay);
    bip('Khiên bị trúng! Bắn nhanh hơn!', 'alarm', { voice: false });
    await sleep(1800);
    s.el.classList.add('ufo-flee');
    await sleep(1000);
    ships.delete(s); s.el.remove();
    done1();
  }

  function done1() {
    resolved++;
    renderConsole();
    if (over) return;
    if (m.vars && resolved === total / 2) {
      group2At = t + 2.2;
      setTimeout(() => !over && sfx.radarAlarm(), 300);
      setTimeout(() => !over && bip(`Đổi mật mã! ${Object.entries(m.vars[1]).map(([l, v]) => `${l} bằng ${speak(v)}`).join(', ')}.`, 'alarm'), 500);
    }
    if (resolved === total) setTimeout(() => !over && startBoss(), 1600);
  }

  // ── Tàu mẹ ──
  function startBoss() {
    const data = m.boss;
    const el = document.createElement('div');
    el.className = 'ufo-mother';
    el.innerHTML = `<div class="ufo-mother-pic">${MOTHER}</div><div class="ufo-mboard">${data.lines.map((l, i) => `<div class="ufo-mline ${i === data.steps[0].line ? 'ufo-mline-now' : data.steps.some(s => s.line === i) ? 'ufo-mline-next' : ''}">${l}</div>`).join('')}</div>`;
    layer.appendChild(el);
    boss = { el, data, k: 0, cur: { el, used: new Set(), wrongs: 0, state: 'fly' }, lineEls: [...el.querySelectorAll('.ufo-mline')] };
    boss.lineEls[data.steps[0].line].innerHTML = data.steps[0].active;
    lockS = null;
    bip(data.vars ? 'Tàu mẹ tới! Tính từng bước như trong vở!' : 'Tàu mẹ tới! Phá từng lớp khiên!', 'alarm');
    sfx.radarAlarm();
    setTimeout(() => sfx.motherIn(), 250);
    renderConsole();
  }

  async function bossHit(v, res, idx) {
    const st = boss.data.steps[boss.k], ln = boss.lineEls[st.line], c = boss.cur;
    if (!res.ok) {
      c.wrongs++; c.used.add(idx);
      sfx.deflect();
      ln.innerHTML = res.html; ln.classList.add('ufo-mline-bad');
      boss.el.classList.remove('ufo-bounce'); void boss.el.offsetWidth; boss.el.classList.add('ufo-bounce');
      bip(st.q.hint, 'think');
      const mp = rel(boss.el.querySelector('.ufo-mother-pic'));
      setTimeout(() => { if (!over) alienFire(mp.x + mp.w * (0.3 + Math.random() * 0.4), mp.y + mp.h * 0.8, '#C4B5FD'); }, 450);
      setTimeout(() => { if (boss && boss.k === boss.data.steps.indexOf(st)) { ln.innerHTML = st.active; ln.classList.remove('ufo-mline-bad'); } }, 1900);
      renderConsole();
      return;
    }
    ln.innerHTML = st.after;
    ln.classList.remove('ufo-mline-now', 'ufo-mline-bad');
    ln.classList.add('ufo-mline-done');
    sfx.shieldBreak();
    boss.k++;
    const last = boss.k >= boss.data.steps.length;
    const rings = last ? [1, 2, 3] : [boss.k];
    rings.forEach(r => boss.el.querySelector(`.ufo-ring-${r}`)?.classList.add('ufo-ring-broken'));
    boss.cur = { el: boss.el, used: new Set(), wrongs: 0, state: 'fly' };
    if (!last) {
      const nx = boss.data.steps[boss.k];
      boss.lineEls[nx.line].innerHTML = nx.active;
      boss.lineEls[nx.line].classList.remove('ufo-mline-next');
      boss.lineEls[nx.line].classList.add('ufo-mline-now');
      renderConsole();
      return;
    }
    minis[minis.length - 1].classList.add('ufo-mini-ok');
    returnNumber(boss.el.querySelector('.ufo-mboard'), boss.data.steps[boss.data.steps.length - 1].q.ans);
    await sleep(700);
    boss.el.classList.add('ufo-away');
    sfx.ufoAway();
    boss = null;
    renderConsole();
    await sleep(1600);
    win();
  }

  // ── Kết thúc ──
  async function win() {
    if (finished) return;
    finished = over = true;
    cleanup();
    sky.classList.add('ufo-won');
    dark.forEach(w => w.classList.add('ufo-win-on'));
    sfx.fireworks();
    bip('Thành phố an toàn rồi!', 'happy');
    await sleep(1200);
    const remember = escaped.map(q => `<b>${q.solve}</b>`).join(', ');
    api.succeed(escaped.length
      ? `Khiên còn ${shields} vạch! Em bắn trúng ngay ${firstHits}/${total} đĩa bay. Ghi nhớ: ${remember}.`
      : `Thành phố an toàn! Em bắn trúng ngay phát đầu ${firstHits}/${total} đĩa bay.`);
  }
  async function lose() {
    if (finished) return;
    finished = over = true;
    cleanup();
    for (const s of ships) if (s.state === 'fly' || s.state === 'esc') { s.state = 'flee'; s.el.classList.add('ufo-flee'); }
    if (boss) boss.el.classList.add('ufo-flee');
    bip('Khiên vỡ hết rồi. Đợt sau ta giữ chặt hơn!', 'alarm');
    await sleep(2400);
    const remember = escaped.map(q => `<b>${q.solve}</b>`).join(', ');
    api.fail('Khiên thành phố vỡ hết rồi!', remember ? `Các ổ khoá để lọt: ${remember}.` : 'Em đọc kỹ ổ khoá, thử thay số vào chỗ bị giấu trước khi bắn.');
  }
  function cleanup() {
    if (lockS?.el) lockS.el.classList.remove('ufo-locked');
    lockS = null;
    renderConsole();
    shells.forEach(b => { b.disabled = true; });
    stage.querySelector('.ufo-pad')?.classList.add('ufo-pad-off');
    document.removeEventListener('keydown', onKey);
  }

  // ── Vòng lặp: tàu bay xuống, nòng pháo xoay ──
  let last = performance.now();
  const gap = m.secs * 0.2;
  let nextAt = m.first ? 1.4 : 0.8, opening = 2; // hai tàu đầu ra sát nhau cho trời có việc ngay
  const maxLive = level.maxLive || 3;
  const tick = (now) => {
    if (!sky.isConnected) { ro.disconnect(); document.removeEventListener('keydown', onKey); if (bgId === bgOwner) spaceBg.stop(); return; }
    const dt = Math.min(0.25, (now - last) / 1000);
    last = now; t += dt;
    if (!over) {
      const g = group(spawned);
      const groupOpen = g === 0 || (group2At != null && t >= group2At);
      const groupLimit = m.vars && g === 0 ? total / 2 : total;
      if (spawned < groupLimit && groupOpen && t >= nextAt && live().length < maxLive) { spawn(); nextAt = t + (opening-- > 1 ? 1.6 : gap); }
      for (const s of ships) {
        if (s.state !== 'fly') continue;
        s.enter += dt / 1.1;
        s.p = Math.min(1, s.p + (s.enter < 1 ? 0 : dt / m.secs));
        if (level.hold && s.p > 0.9) s.p = 0.9; // lớp 1: tàu dừng trên khiên, chờ bé bắn
        if (s.p > 0.7 && !s.near) { s.near = true; s.el.classList.add('ufo-near'); sfx.ufoNear(); }
        place(s);
        if (s.p >= 1) escape(s);
      }
      if (lockS && lockS.state !== 'fly') autoLock();
      else if (!lockS) autoLock();
    }
    if (Math.abs(angTo - ang) > 0.1) { ang += (angTo - ang) * Math.min(1, dt * 12); barrel.setAttribute('transform', `rotate(${ang.toFixed(2)} 0 -112)`); }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);

  // ── Nút đạn ──
  shells.forEach((b, i) => b.addEventListener('click', () => {
    const q = curQ();
    if (!q || b.disabled) return;
    shoot(q.options[i], b, i); // tiếng nạp đạn (ufoLoad) thay tiếng chạm
  }));

  // ── Bàn phím (cấp số lớn): gõ đúng đáp số của tàu nào là bắn ngay tàu đó; "Bắn" bắn số đang gõ vào tàu đang khoá ──
  let typedS = '';
  const lcd = $('.ufo-lcd'), lcdVal = $('.ufo-lcd-val');
  const showTyped = () => { if (lcdVal) lcdVal.innerHTML = typedS ? fmt(Number(typedS)) : '&nbsp;'; };
  function badTyped() { sfx.boing(); lcd.classList.remove('ufo-lcd-bad'); void lcd.offsetWidth; lcd.classList.add('ufo-lcd-bad'); setTimeout(() => { typedS = ''; showTyped(); }, 380); }
  function checkTyped(submit) {
    const v = Number(typedS);
    if (boss) { const ans = boss.data.steps[boss.k].q.ans; if (num(v) === ans || submit) { typedS = ''; showTyped(); shoot(v, lcd, null); } else if (typedS.length >= String(ans).length) badTyped(); return; }
    const hitS = live().filter(s => s.q.ans === v).sort((a, b) => b.p - a.p)[0];
    if (hitS) { typedS = ''; showTyped(); setLock(hitS); shoot(v, lcd, null); return; }
    if (submit) { typedS = ''; showTyped(); if (target()) shoot(v, lcd, null); else badTyped(); return; }
    const longest = Math.max(0, ...live().map(s => String(s.q.ans).length));
    if (live().length && typedS.length >= longest) badTyped();
  }
  function press(k) {
    if (over || busy || !typed) return;
    if (k === 'del') { typedS = typedS.slice(0, -1); sfx.tap(); showTyped(); return; }
    if (k === 'ok') { if (typedS) checkTyped(true); return; }
    if (typedS.length >= 5) return;
    typedS = typedS === '0' ? k : typedS + k;
    sfx.tap();
    showTyped();
    checkTyped(false);
  }
  $('.ufo-keys')?.addEventListener('click', (e) => { const b = e.target.closest('[data-k]'); if (b) press(b.dataset.k); });
  function onKey(e) {
    if (!sky.isConnected) { document.removeEventListener('keydown', onKey); return; }
    if (typed) {
      if (/^[0-9]$/.test(e.key)) press(e.key);
      else if (e.key === 'Backspace') press('del');
      else if (e.key === 'Enter') press('ok');
      else return;
    } else {
      const i = ['1', '2', '3', '4'].indexOf(e.key);
      if (i < 0) return;
      shells[i]?.click();
    }
    e.preventDefault();
  }
  document.addEventListener('keydown', onKey);

  renderConsole();
  if (m.first) bip(typed ? 'Đĩa bay tới! Gõ số bị giấu để bắn!' : 'Đĩa bay tới! Chọn viên đạn mang đúng số bị giấu!', 'alarm');
  else if (m.vars) bip(`Mật mã đợt này: ${Object.entries(m.vars[0]).map(([l, v]) => `${l} bằng ${speak(v)}`).join(', ')}.`, 'happy');

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      ships: () => [...ships].map(s => ({ i: s.i, p: +s.p.toFixed(2), enter: +s.enter.toFixed(2), state: s.state, y: Math.round(s.y) })), shields: () => shields,
      /** Bắn đúng mục tiêu đang khoá (chụp màn giữa / cuối lượt). */
      step: () => { const q = curQ(); if (!q) return; const i = q.options.indexOf(q.ans); if (typed) shoot(q.ans, lcd, null); else shells[i]?.click(); },
      /** Đẩy mọi tàu đang bay sát khiên thành phố (thử đường mất vạch khiên, thua đợt). */
      rush: () => { for (const s of ships) if (s.state === 'fly') { s.enter = 1; s.p = Math.max(s.p, 0.97); } },
      /** Bắn sai một phát. */
      miss: () => { const q = curQ(); if (!q) return; const i = q.options.findIndex((v, k) => v !== q.ans && !shells[k].disabled); shells[i]?.click(); },
    };
  }
}

// ── Mẫu trò ─────────────────────────────────────────────────────────────────────────────────────────
/** level: { id, n, title, desc, knowledge, style, eq(rng) | expr(rng, vars) + vars(rng), secs, typed?, hold?, max?, mulOk?, decimals? } */
const BIP_NPC = { id: 'bip', name: 'Rô-bốt Bíp', me: 'Bíp', you: 'Đội trưởng', img: robotImg('happy'), sad: robotImg('sad') };

export const ufoGame = (meta, levels) => ({
  id: 'ufo', icon: '🛸', title: 'Bảo vệ Trái Đất', unitWord: 'đợt', npcs: [BIP_NPC],
  purpose: 'Giúp em tìm số bị giấu trong phép tính. Mỗi đĩa bay mang một ổ khoá có số bị giấu, em chọn viên đạn mang đúng số đó: đạn trúng thì số thay vào ổ khoá, phép tính đúng là khiên tàu vỡ. Chọn sai thì tàu bắn trả, vòm khiên Trái Đất nứt thêm. Cuối đợt có tàu mẹ, em tính từng bước như trong vở.',
  howTo: how(['🛸', 'Đọc ổ khoá dưới đĩa bay'], ['💎', 'Chọn đạn mang số bị giấu'], ['✅', 'Số thay vào, phép tính đúng là trúng'], ['🛡️', 'Sai là bị bắn trả, giữ khiên!']),
  ...meta,
  levels: levels.map(l => ({ count: 6, missions: 3, ask: () => 'Bọn Zíp Zắp tới cướp các con số! Chọn đúng viên đạn để phá khiên!', ...l })),
  stallIcon: () => '🛸',
  summaryText: (ok, total) => `Em giữ an toàn cho thành phố ở <strong>${ok}/${total}</strong> đợt tấn công.`,
  againText: 'Chơi đợt mới',
  makeMission: makeWave,
  mountMission: mountUfo,
});

export const UFO1_GAME = ufoGame({ id: 'g1-ufo', starPrefix: 'ufo1' }, [
  { id: 'g1-ufo-1', n: 1, title: 'Con Zíp trốn trong phép tính (phạm vi 10)', desc: 'Vd. 3 + ▢ = 7, ▢ − 2 = 5.', knowledge: 'cộng, trừ trong phạm vi 10', style: 'zip', eq: G1.within10, secs: 40, hold: true, max: 10, count: 5 },
  { id: 'g1-ufo-2', n: 2, title: 'Phạm vi 20, số tròn chục', desc: 'Vd. 12 + ▢ = 17, ▢ − 30 = 40.', knowledge: 'cộng, trừ trong phạm vi 20, số tròn chục', style: 'zip', eq: G1.within20, secs: 40, hold: true, count: 5 },
]);

export const UFO2_GAME = ufoGame({ id: 'd2-ufo', starPrefix: 'drill2' }, [
  { id: 'd2-ufo-1', n: 1, title: 'Số còn thiếu: cộng, trừ qua 10', desc: 'Vd. ? + 8 = 15, 13 − ? = 6.', knowledge: 'bảng cộng, bảng trừ qua 10', lessons: { g2: ['bai-8', 'bai-12'] }, style: 'q', eq: G2.cross, secs: 34 },
  { id: 'd2-ufo-2', n: 2, title: 'Số còn thiếu: có nhớ trong phạm vi 100', desc: 'Vd. ? + 25 = 63, ? − 18 = 47.', knowledge: 'cộng, trừ có nhớ trong phạm vi 100', lessons: { g2: ['bai-21', 'bai-24'] }, style: 'q', eq: G2.carry, secs: 36 },
  { id: 'd2-ufo-3', n: 3, title: 'Số còn thiếu: nhân, chia 2 và 5', desc: 'Vd. ? × 5 = 35, ? : 2 = 8.', knowledge: 'bảng nhân, bảng chia 2 và 5', lessons: { g2: ['bai-39', 'bai-40', 'bai-43', 'bai-44'] }, style: 'q', eq: G2.table25, secs: 34, mulOk: true },
]);

export const UFO_GAME = ufoGame({ id: 'drill-ufo', starPrefix: 'drill' }, [
  { id: 'drill-ufo-1', n: 1, title: 'Tìm x trong phép cộng, phép trừ', desc: 'Vd. x + 25 = 60, 70 − x = 32.', knowledge: 'tìm thành phần trong phép cộng, phép trừ', lessons: { workbook: ['bai-3'] }, style: 'x', eq: G3.addSub, secs: 34 },
  { id: 'drill-ufo-2', n: 2, title: 'Tìm x trong phép nhân, phép chia', desc: 'Vd. x × 4 = 28, 56 : x = 8.', knowledge: 'tìm thành phần trong phép nhân, phép chia', lessons: { workbook: ['bai-13'] }, style: 'x', eq: G3.mulDiv, secs: 32, mulOk: true },
  { id: 'drill-ufo-3', n: 3, title: 'Tìm x với số lớn (gõ số)', desc: 'Vd. x − 2 518 = 4 736.', knowledge: 'cộng, trừ, nhân, chia số đến 10 000', lessons: { workbook: ['bai-54', 'bai-55', 'bai-56', 'bai-57'] }, style: 'x', eq: G3.big, secs: 50, typed: true, count: 5 },
]);

export const UFO4_GAME = ufoGame({ id: 'd4-ufo', starPrefix: 'drill4' }, [
  { id: 'd4-ufo-1', n: 1, title: 'Biểu thức chứa một chữ', desc: 'Mật mã a = 7: a × 8, 125 − a.', knowledge: 'biểu thức chứa chữ, tính giá trị', style: 'x', vars: VARS.one, expr: X4.one, secs: 34 },
  { id: 'd4-ufo-2', n: 2, title: 'Biểu thức chứa hai chữ', desc: 'Mật mã a = 6, b = 9: a + b, (a + b) × 2.', knowledge: 'biểu thức chứa hai chữ', style: 'x', vars: VARS.two, expr: X4.two, secs: 36 },
  { id: 'd4-ufo-3', n: 3, title: 'Tìm x với số lớn (gõ số)', desc: 'Vd. x + 1 250 = 3 000, x × 6 = 4 800.', knowledge: 'tìm thành phần chưa biết, số nhiều chữ số', style: 'x', eq: G4.big, secs: 50, typed: true, count: 5, mulOk: true },
]);

export const UFO5_GAME = ufoGame({ id: 'd5-ufo', starPrefix: 'drill5' }, [
  { id: 'd5-ufo-1', n: 1, title: 'Tìm x với số thập phân', desc: 'Vd. x + 2,5 = 7, x − 1,2 = 3,8.', knowledge: 'cộng, trừ số thập phân', style: 'x', eq: G5.dec, secs: 36, decimals: true },
  { id: 'd5-ufo-2', n: 2, title: 'Nhân, chia với 10, 100', desc: 'Vd. x × 10 = 45, x : 100 = 0,3.', knowledge: 'nhân, chia số thập phân với 10, 100', style: 'x', eq: G5.ten, secs: 34, decimals: true },
  { id: 'd5-ufo-3', n: 3, title: 'Công thức chu vi, diện tích', desc: 'Mật mã a = 6, b = 4: S = a × b, P = (a + b) × 2.', knowledge: 'chu vi, diện tích hình chữ nhật, hình vuông', style: 'x', vars: VARS.dec, expr: X4.shape, secs: 38, decimals: true },
]);

// ── Kiểu dáng ───────────────────────────────────────────────────────────────────────────────────────
let styled = false;
function injectUfoStyles() {
  if (styled) return;
  styled = true;
  const st = document.createElement('style');
  st.textContent = `
    .ufo-scene { position: relative; min-height: 0; height: 100%; display: grid; grid-template-columns: minmax(0, 1fr) clamp(250px, 29%, 430px); gap: 0.6rem; font-family: 'Baloo 2', 'Quicksand', sans-serif; }
    .ufo-v { color: #EA580C; font-style: italic; font-weight: 900; padding: 0 0.04em; }
    .ufo-box { display: inline-flex; align-items: center; justify-content: center; min-width: 1.15em; height: 1.15em; vertical-align: -0.2em; border: 0.08em solid #EA580C; border-radius: 0.2em; background: #FFF7ED; color: #EA580C; line-height: 1; }
    .ufo-box-zip svg { width: 1em; height: 1em; display: block; }
    .ufo-n-ok { color: #16A34A; } .ufo-n-bad { color: #DC2626; }

    /* Bầu trời: vùng chơi, mọi thứ cỡ theo khung (cq) */
    .ufo-sky { position: relative; overflow: hidden; border-radius: 1.1rem; container-type: size; min-height: 0;
      background: linear-gradient(#0B1033, #26205A 62%, #5B2C83); --uw: min(24cqi, 30cqh); }
    .ufo-stars { position: absolute; inset: 0; width: 100%; height: 100%; }
    .ufo-tw { transform-box: fill-box; transform-origin: center; animation: ufoTw 2.4s ease-in-out infinite alternate; }
    .ufo-tw1 { animation-delay: -.8s; } .ufo-tw2 { animation-delay: -1.6s; }
    @keyframes ufoTw { from { opacity: .35; transform: scale(.7); } to { opacity: 1; transform: none; } }
    .ufo-moon-w { position: absolute; right: 3cqi; top: 3cqh; width: min(11cqh, 9cqi); }
    .ufo-planet-w { position: absolute; left: 2cqi; top: 4cqh; width: min(13cqh, 11cqi); }
    .ufo-moon-w svg, .ufo-planet-w svg { width: 100%; display: block; overflow: visible; }
    .ufo-dome { position: absolute; left: -9%; right: -9%; bottom: 3cqh; height: 44cqh; border-radius: 50% 50% 0 0 / 100% 100% 0 0;
      border: 4px solid rgba(103,232,249,.85); border-bottom: none; background: radial-gradient(ellipse at 50% 100%, rgba(103,232,249,.02), rgba(103,232,249,.12)); }
    .ufo-dome::after { content: ''; position: absolute; inset: 14px 14px 0; border-radius: inherit; border: 2px dashed rgba(103,232,249,.4); border-bottom: none; }
    .ufo-dome { transition: border-color .5s; }
    .ufo-dome[data-dmg="2"] { border-color: #FDE047; }
    .ufo-dome[data-dmg="3"] { border-color: #FB923C; }
    .ufo-dome[data-dmg="4"] { border-color: #F87171; animation: ufoDomeWeak 1.2s ease-in-out infinite alternate; }
    @keyframes ufoDomeWeak { to { border-color: #FCA5A5; } }
    .ufo-cracks { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; pointer-events: none; }
    .ufo-crk, .ufo-crk-glow { fill: none; stroke-linecap: round; stroke-linejoin: round; vector-effect: non-scaling-stroke; }
    .ufo-crk { stroke: #F0F9FF; stroke-width: 2px; }
    .ufo-crk-glow { stroke: #67E8F9; stroke-width: 5px; opacity: .35; }
    .ufo-crk-dot { fill: #F0F9FF; opacity: .85; }
    .ufo-crack-new { animation: ufoCrackIn .5s ease-out; }
    @keyframes ufoCrackIn { 0% { opacity: 0; } 30% { opacity: 1; filter: drop-shadow(0 0 6px #fff); } }
    @keyframes ufoDomeBreak { 0%, 20%, 40% { opacity: 1; border-color: #fff; } 10%, 30% { opacity: .4; } 100% { opacity: 0; transform: translateY(4cqh) scaleY(.9); } }
    .ufo-bolt { position: absolute; left: 0; top: 0; width: min(4.4cqh, 3.4cqi); aspect-ratio: 1; margin: calc(min(4.4cqh, 3.4cqi) / -2) 0 0 calc(min(4.4cqh, 3.4cqi) / -2);
      border-radius: 50%; background: radial-gradient(circle at 40% 35%, #fff 0 25%, var(--c) 60%); border: 2px solid #3F3A40;
      box-shadow: 0 0 10px var(--c), 0 0 22px var(--c); z-index: 4; pointer-events: none; }
    .ufo-dome.ufo-dome-hit { animation: ufoDomeHit .8s ease-out; }
    .ufo-dome.ufo-dome-broken { animation: ufoDomeBreak 1.4s ease-in forwards; }
    @keyframes ufoDomeHit { 0%, 60% { border-color: #F87171; background: radial-gradient(ellipse at 50% 100%, rgba(248,113,113,.05), rgba(248,113,113,.3)); } }
    .ufo-city-w { position: absolute; left: 0; right: 0; bottom: 0; height: 21cqh; }
    .ufo-city { width: 100%; height: 100%; display: block; }
    .ufo-win { fill: #1E293B; transition: fill .4s; }
    .ufo-win-on { fill: #FDE047; }
    .ufo-win-pop { animation: ufoWin .7s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes ufoWin { 30% { fill: #fff; transform: scale(1.8); } }
    .ufo-beacon { animation: ufoBeacon 1.6s steps(2) infinite; }
    @keyframes ufoBeacon { 50% { fill: #7F1D1D; } }
    .ufo-cannon { position: absolute; left: 50%; bottom: 1.5cqh; height: min(30cqh, 22cqi); aspect-ratio: 140 / 272; transform: translateX(-50%); z-index: 2; }
    .ufo-cannon svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .ufo-fire .ufo-muzzle { animation: ufoMuzzle .35s ease-out; }
    @keyframes ufoMuzzle { 0% { fill: #fff; } 100% { fill: #22D3EE; } }
    .ufo-fire .ufo-core { animation: ufoCore .4s ease-out; }
    @keyframes ufoCore { 0% { fill: #fff; } }
    .ufo-layer { position: absolute; inset: 0; z-index: 3; pointer-events: none; }
    .ufo-fx { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 4; pointer-events: none; overflow: visible; }
    .ufo-beam { animation: ufoBeam .38s ease-out forwards; }
    @keyframes ufoBeam { 0% { opacity: 1; } 70% { opacity: 1; } 100% { opacity: 0; } }

    /* Bảng đợt: số tàu, vạch khiên (góc trên trái) */
    .ufo-hud { position: absolute; z-index: 5; top: 1.4cqh; left: 50%; transform: translateX(-50%); display: flex; align-items: center; gap: min(2cqh, 1.6cqi);
      padding: min(1cqh, 0.8cqi) min(2cqh, 1.6cqi); background: #fff; border: 3px solid #3F3A40; border-radius: 999px; box-shadow: 0 4px 0 rgba(0,0,0,.25); }
    .ufo-count { display: flex; gap: min(0.6cqh, 0.5cqi); }
    .ufo-mini { width: min(5.5cqh, 4.4cqi); color: #CBD5E1; }
    .ufo-mini-boss { width: min(8cqh, 6.4cqi); color: #C4B5FD; }
    .ufo-mini svg { width: 100%; display: block; }
    .ufo-mini-ok { color: #4ADE80; } .ufo-mini-bad { color: #F87171; }
    .ufo-shields { display: flex; gap: min(0.6cqh, 0.5cqi); }
    .ufo-sh { width: min(5.6cqh, 4.4cqi); }
    .ufo-sh svg { width: 100%; display: block; }
    .ufo-sh-fill { fill: #67E8F9; transition: fill .3s; }
    .ufo-sh-bad { display: none; }
    .ufo-sh-lost .ufo-sh-fill { fill: #CBD5E1; } .ufo-sh-lost .ufo-sh-ok { display: none; } .ufo-sh-lost .ufo-sh-bad { display: inline; }
    .ufo-sh-lost { animation: ufoLost .6s ease-out; }
    @keyframes ufoLost { 30% { transform: scale(1.4) rotate(-8deg); } }

    /* Đĩa bay: cỡ theo trời, ổ khoá trắng đục treo dưới bụng */
    .ufo-ship { position: absolute; left: 0; top: 0; width: var(--uw); height: calc(var(--uw) * 0.86); padding: 0; border: none; background: none; cursor: pointer; pointer-events: auto; will-change: transform; font: inherit; }
    .ufo-ship-in { position: absolute; inset: 0; display: block; }
    .ufo-saucer { position: absolute; left: 0; top: 0; width: 100%; height: 62%; display: block; overflow: visible; }
    .ufo-eye-dizzy, .ufo-crack { display: none; }
    .ufo-light { animation: ufoLight 1s steps(2) infinite; } .ufo-light1 { animation-delay: -.5s; }
    @keyframes ufoLight { 50% { opacity: .45; } }
    .ufo-plate { position: absolute; left: 4%; right: 4%; top: 64%; height: 33%; container-type: size; display: flex; align-items: center; justify-content: center;
      background: #fff; border: max(3px, 0.016 * var(--uw)) solid #3F3A40; border-radius: 0.9rem; box-shadow: 0 4px 0 rgba(0,0,0,.25); }
    .ufo-plate::before, .ufo-plate::after { content: ''; position: absolute; bottom: 100%; width: 3px; height: 22%; background: #3F3A40; }
    .ufo-plate::before { left: 30%; } .ufo-plate::after { right: 30%; }
    .ufo-plate-t { white-space: nowrap; font-weight: 800; color: #1E293B; line-height: 1; font-size: min(64cqh, calc(172cqi / var(--len))); }
    .ufo-plate-ok { background: #DCFCE7; border-color: #16A34A; }
    .ufo-plate-bad { background: #FEE2E2; border-color: #DC2626; animation: ufoShake .4s ease-in-out; }
    .ufo-plate-solve { background: #FEF3C7; border-color: #D97706; }
    /* Sau khi thay số: dòng kiểm dài hơn đề, bảng nới rộng ra hai bên cho chữ đủ to */
    .ufo-plate-ok, .ufo-plate-bad, .ufo-plate-solve { left: -14%; right: -14%; z-index: 2; }
    @keyframes ufoShake { 20%, 60% { transform: translateX(-4%); } 40%, 80% { transform: translateX(4%); } }
    .ufo-lockmark { position: absolute; inset: -5% -6% -4%; display: none; pointer-events: none;
      background: linear-gradient(#F87171, #F87171) left top / 18% 4% no-repeat, linear-gradient(#F87171, #F87171) left top / 4% 18% no-repeat,
        linear-gradient(#F87171, #F87171) right top / 18% 4% no-repeat, linear-gradient(#F87171, #F87171) right top / 4% 18% no-repeat,
        linear-gradient(#F87171, #F87171) left bottom / 18% 4% no-repeat, linear-gradient(#F87171, #F87171) left bottom / 4% 18% no-repeat,
        linear-gradient(#F87171, #F87171) right bottom / 18% 4% no-repeat, linear-gradient(#F87171, #F87171) right bottom / 4% 18% no-repeat; }
    .ufo-locked .ufo-lockmark { display: block; animation: ufoLockIn .3s ease-out; }
    @keyframes ufoLockIn { from { transform: scale(1.25); opacity: 0; } }
    .ufo-locked .ufo-plate:not(.ufo-plate-ok):not(.ufo-plate-bad):not(.ufo-plate-solve), .ufo-mline-now:not(.ufo-mline-bad) { animation: ufoAim 1s ease-in-out infinite; }
    @keyframes ufoAim { 50% { background: #FEF08A; border-color: #F87171; box-shadow: 0 4px 0 rgba(0,0,0,.25), 0 0 0 max(4px, 0.03 * var(--uw, 200px)) rgba(248,113,113,.55); } }
    .ufo-mline-now:not(.ufo-mline-bad) { animation-name: ufoAimLine; }
    @keyframes ufoAimLine { 50% { background: #FEF08A; box-shadow: inset 0 0 0 3px #F87171; } }
    .ufo-near .ufo-shield { stroke: #F87171; }
    .ufo-near .ufo-plate { border-color: #EA580C; }
    .ufo-bounce .ufo-saucer { animation: ufoBounce .5s ease-out; }
    @keyframes ufoBounce { 25% { transform: translateY(-6%) rotate(-5deg); } 60% { transform: translateY(3%) rotate(3deg); } }
    .ufo-cracked .ufo-shield { display: none; } .ufo-cracked .ufo-crack { display: inline; }
    .ufo-cracked .ufo-eye-ok { display: none; } .ufo-cracked .ufo-eye-dizzy { display: inline; }
    .ufo-cracked .ufo-crack { animation: ufoCrack .8s ease-out forwards; transform-box: view-box; transform-origin: 150px 106px; }
    @keyframes ufoCrack { 0% { opacity: 1; } 100% { opacity: 0; transform: scale(1.5); } }
    .ufo-away .ufo-ship-in, .ufo-mother.ufo-away { transition: transform 1.3s cubic-bezier(.5,0,.9,.5), opacity 1.3s ease-in; transform: translate(40cqi, -90cqh) rotate(-540deg) scale(.3); opacity: 0; }
    .ufo-flee .ufo-ship-in, .ufo-mother.ufo-flee { transition: transform 1s ease-in, opacity 1s ease-in; transform: translateY(-90cqh); opacity: 0; }

    /* Tàu mẹ + bảng các bước */
    .ufo-mother { position: absolute; left: 50%; top: 12cqh; width: min(70cqi, 92cqh); margin-left: calc(min(70cqi, 92cqh) / -2); pointer-events: none;
      display: flex; flex-direction: column; align-items: center; animation: ufoMotherIn 1.4s cubic-bezier(.3,1.2,.5,1) both; }
    @keyframes ufoMotherIn { from { transform: translateY(-60cqh); } }
    .ufo-mother-pic { width: 100%; }
    .ufo-mother-svg { width: 100%; display: block; overflow: visible; }
    .ufo-ring { transition: opacity .6s, transform .6s; transform-box: fill-box; transform-origin: center; }
    .ufo-ring-broken { opacity: 0; transform: scale(1.25); }
    .ufo-mother.ufo-bounce .ufo-mother-pic { animation: ufoBounce .5s ease-out; }
    .ufo-mboard { position: relative; z-index: 1; margin-top: -1.5cqh; background: #fff; border: 4px solid #3F3A40; border-radius: 1.2rem; box-shadow: 0 5px 0 rgba(0,0,0,.25);
      padding: 0.8cqh 2.6cqh; display: flex; flex-direction: column; gap: 0.3cqh; min-width: 56%; }
    .ufo-mline { font-size: min(5.6cqh, 4.2cqi); font-weight: 800; color: #1E293B; white-space: nowrap; line-height: 1.25; padding: 0 0.3em; border-radius: 0.4em; }
    .ufo-mline-now { background: #FEF9C3; box-shadow: inset 0 0 0 3px #FACC15; }
    .ufo-mline-next { color: #94A3B8; }
    .ufo-mline-bad { background: #FEE2E2; box-shadow: inset 0 0 0 3px #DC2626; }
    .ufo-mline-done { color: #1E293B; }

    /* Thẻ kết quả: giữa bầu trời (lúc đó đã trống) */
    .ufo-sky > .g3g-result { position: absolute; z-index: 8; left: 0; right: 0; margin: 0 auto; width: min(480px, 88%); top: 46%; transform: translateY(-50%); max-height: calc(100% - 1rem); overflow-y: auto;
      border-width: 3px; border-radius: 1.3rem; text-align: center; align-items: stretch; box-shadow: 0 6px 0 rgba(0,0,0,0.1), 0 16px 36px rgba(0,0,0,0.35); }
    .ufo-sky > .g3g-result .g3g-result-text { font-size: clamp(1rem, 1.8vh + 0.55rem, 1.45rem); }
    .ufo-sky > .g3g-result .g3g-tip { font-size: clamp(0.95rem, 1.5vh + 0.5rem, 1.3rem); }

    /* Bàn điều khiển: Bíp, ổ khoá, đạn */
    .ufo-console { position: relative; min-height: 0; display: flex; flex-direction: column; gap: 0.55rem; padding: 0.6rem; border-radius: 1.1rem;
      background: linear-gradient(#334155, #1E293B); box-shadow: inset 0 0 0 3px #0F172A; container-type: size; }
    .ufo-bip { flex: 0 0 auto; height: 21cqh; display: flex; align-items: center; gap: 0.4rem; }
    .ufo-robot { height: 100%; aspect-ratio: 128 / 172; flex: 0 0 auto; }
    .bip-svg { width: 100%; height: 100%; display: block; overflow: visible; }
    .bip-svg > g, .bip-oh { display: none; }
    .bip-happy .bip-happy, .bip-think .bip-think, .bip-alarm .bip-alarm { display: inline; }
    .bip-alarm .bip-smile { display: none; } .bip-alarm .bip-oh { display: inline; }
    .bip-bulb { fill: #FDE047; } .bip-chest { fill: #4ADE80; }
    .bip-alarm .bip-bulb, .bip-alarm .bip-chest { fill: #F87171; animation: ufoBeacon .8s steps(2) infinite; }
    .bip-talk .bip-smile { animation: bipTalk .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
    @keyframes bipTalk { to { transform: scaleY(2.2); } }
    .ufo-bubble { flex: 1 1 0; min-width: 0; height: 100%; display: flex; align-items: center; background: #fff; border: 3px solid #3F3A40; border-radius: 1rem; padding: 0.3rem 0.6rem; visibility: hidden; position: relative; }
    .ufo-bubble-on { visibility: visible; }
    .ufo-bubble span { font-weight: 800; color: #1E293B; font-size: min(4.6cqh, 6.4cqi); line-height: 1.2; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
    .ufo-lock { flex: 0 0 auto; height: 22cqh; display: flex; flex-direction: column; padding: 0; border: 3px solid #3F3A40; border-radius: 1rem; background: #fff; overflow: hidden; cursor: pointer; font: inherit; }
    .ufo-lock-h { flex: 0 0 auto; display: flex; align-items: center; gap: 0.4em; padding: 0.15em 0.6em; background: #FFEDD5; border-bottom: 3px solid #3F3A40; font-weight: 800; color: #9A3412; font-size: min(3.6cqh, 5cqi); white-space: nowrap; overflow: hidden; }
    .ufo-lock-dot { width: 0.8em; height: 0.8em; border-radius: 50%; border: 2px solid #3F3A40; flex: 0 0 auto; }
    .ufo-lock-eq { flex: 1 1 0; min-height: 0; container-type: size; display: flex; align-items: center; justify-content: center; }
    .ufo-lock-v { white-space: nowrap; font-weight: 800; color: #1E293B; line-height: 1; font-size: min(62cqh, calc(170cqi / var(--len, 8))); }
    .ufo-ammo { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 0.6rem; padding-bottom: 6px; }
    .ufo-shell { position: relative; min-height: 0; padding: 0;
      border: 3px solid #3F3A40; border-radius: 1.1rem; background: #fff; cursor: pointer; font: inherit; box-shadow: 0 6px 0 #0E7490; touch-action: manipulation; }
    .ufo-shell:active:not(:disabled) { transform: translateY(4px); box-shadow: 0 2px 0 #0E7490; }
    .ufo-shell:disabled { cursor: default; }
    .ufo-shell-in { position: absolute; inset: 0; container-type: size; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4cqh; }
    .ufo-shell-c { flex: 0 0 auto; height: 40cqh; aspect-ratio: 44 / 80; }
    .ufo-crystal { width: 100%; height: 100%; display: block; }
    .ufo-shell-v { flex: 0 0 auto; width: 100%; display: flex; justify-content: center; }
    .ufo-shell-t { white-space: nowrap; font-weight: 800; color: #1E293B; line-height: 1; font-size: min(34cqh, calc(160cqi / var(--len, 4))); }
    .ufo-used { opacity: .4; background: #E2E8F0; box-shadow: 0 6px 0 #64748B; }
    .ufo-glow { box-shadow: 0 6px 0 #0E7490, 0 0 0 5px #FDE047; animation: ufoGlow 1s ease-in-out infinite alternate; }
    @keyframes ufoGlow { to { box-shadow: 0 6px 0 #0E7490, 0 0 0 9px rgba(253,224,71,.55); } }
    .ufo-wait { pointer-events: none; }
    .ufo-pad { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; gap: 0.4rem; }
    .ufo-pad-off .ufo-keys { opacity: .45; pointer-events: none; }
    .ufo-lcd { flex: 0 0 auto; background: #D9F99D; border-radius: 0.7rem; border: 3px solid #0F172A; display: flex; justify-content: center; box-shadow: inset 0 2px 6px rgba(0,0,0,.3); }
    .ufo-lcd-val { font-size: min(8cqh, 11cqi); font-weight: 800; color: #1A2E05; line-height: 1.2; min-width: 3ch; text-align: center; }
    .ufo-lcd-bad { animation: ufoShake .38s ease-in-out; background: #FECACA; }
    .ufo-keys { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: 1fr; gap: 0.35rem; padding-bottom: 4px; }
    .ufo-key { min-height: 0; border: none; border-radius: 0.7rem; background: #F8FAFC; color: #1E293B; font-weight: 800; font-size: min(6.5cqh, 9cqi); font-family: inherit; cursor: pointer; box-shadow: 0 4px 0 #94A3B8; touch-action: manipulation; }
    .ufo-key:active { transform: translateY(3px); box-shadow: 0 1px 0 #94A3B8; }
    .ufo-key-del { background: #FEE2E2; color: #991B1B; box-shadow: 0 4px 0 #FCA5A5; }
    .ufo-key-ok { background: #22D3EE; color: #083344; box-shadow: 0 4px 0 #0E7490; }
    .g3-fly .ufo-crystal { width: 100%; height: 100%; }
    .g3-fly .ufo-tag, .g3-fly .ufo-num { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; white-space: nowrap; font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .g3-fly .ufo-tag { background: #fff; border: 3px solid #3F3A40; border-radius: 999px; font-size: 1.15rem; color: #1E293B; }
    .g3-fly .ufo-num { color: #FDE047; font-size: 1.6rem; text-shadow: 0 0 6px #FDE047, 0 2px 0 #3F3A40; }
    .ufo-won .ufo-dome { border-color: #FDE047; }

    /* Màn dọc: trời trên, bàn điều khiển dưới (Bíp + ổ khoá một hàng, 4 nút đạn 2 × 2); lời Bíp nổi trên mép dưới trời */
    @media (orientation: portrait) {
      .ufo-scene { grid-template-columns: 1fr; grid-template-rows: minmax(0, 1fr) clamp(220px, 34%, 400px); }
      .ufo-sky { --uw: min(27cqi, 25cqh); }
      .ufo-console { display: grid; grid-template-columns: auto minmax(0, 1fr); grid-template-rows: minmax(0, 30fr) minmax(0, 70fr); }
      .ufo-bip { grid-column: 1; grid-row: 1; height: 100%; }
      .ufo-bubble { position: absolute; left: 0.6rem; right: 0.6rem; bottom: calc(100% + 0.9rem); height: auto; min-height: 2.6em; z-index: 9; }
      .ufo-bubble span { font-size: clamp(0.95rem, 2.2vh, 1.3rem); }
      .ufo-lock { grid-column: 2; grid-row: 1; height: 100%; }
      .ufo-lock-h { font-size: min(5cqh, 3.6cqi); }
      .ufo-ammo, .ufo-pad { grid-column: 1 / -1; grid-row: 2; }
      .ufo-keys { grid-template-columns: repeat(6, 1fr); }
      .ufo-key { font-size: min(9cqh, 6cqi); }
      .ufo-lcd-val { font-size: min(10cqh, 7cqi); }
      .ufo-shell-in { flex-direction: row; gap: 6cqi; }
      .ufo-shell-v { width: auto; }
      .ufo-shell-c { height: 62cqh; }
      .ufo-shell-t { font-size: min(52cqh, calc(120cqi / var(--len, 4))); }
    }
    @media (prefers-reduced-motion: reduce) {
      .ufo-tw, .ufo-light, .ufo-beacon { animation: none; }
      .ufo-away .ufo-ship-in, .ufo-mother.ufo-away { transform: translateY(-90cqh) scale(.5); }
    }
  `;
  document.head.appendChild(st);
}
