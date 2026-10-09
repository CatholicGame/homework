/**
 * Ví dụ "xem từng bước" cho 📘 Kiến thức Toán 3 Tập Hai (Bài 45–81), thêm vào knowledgeDemo.js bằng registerDemos.
 * Mọi bước của một ví dụ dùng cùng một viewBox; phần chưa tới vẫn vẽ sẵn nhưng ẩn (kd-ghost), nên hình không nhảy.
 * Số từ bốn chữ số viết tách lớp như Vở bài tập Toán 3: 2 191, 10 000.
 *
 *   { kind: 'g3b-place', n: 2191 }                 Bài 45, 59: đếm thẻ từng hàng, viết số, đọc số
 *   { kind: 'g3b-place', n: 5437, mode: 'sum' }    viết số thành tổng 5 437 = 5 000 + 400 + 30 + 7
 *   { kind: 'g3b-compare', a, b } / 'g3b-order' { nums, desc }       Bài 46, 60 (bảng chữ số của board.js)
 *   { kind: 'g3b-add' | 'g3b-sub', a, b } / 'g3b-mul' { a, b } / 'g3b-div' { a, b }   đặt tính (board.js, chia viết đầy đủ)
 *   { kind: 'g3b-mental', a, b, op: '+' | '-' | '×' | ':', unit: 1000 }  tính nhẩm theo nghìn, chục nghìn
 *   { kind: 'g3b-roman', n: 14 } / { kind: 'g3b-roman', s: 'XIX' }       Bài 47: viết, đọc số La Mã bằng que tính
 *   { kind: 'g3b-round', n: 3012, to: 100 }       Bài 48, 61: làm tròn trên tia số
 *   { kind: 'g3b-perim', shape: 'tri' | 'quad' | 'rect' | 'square', sides: [...], unit }   Bài 50
 *   { kind: 'g3b-area', mode: 'count' } / { kind: 'g3b-area', w: 5, h: 3 }   Bài 51, 52 (ô vuông 1 cm²)
 *   { kind: 'g3b-clock', h: 8, m: 50, pm }         Bài 66: xem đồng hồ, giờ kém
 *   { kind: 'g3b-months', ask: 2 }                 Bài 66: tháng, năm, số ngày từng tháng, mẹo nắm tay
 *   { kind: 'g3b-cal', month: 12, start: 3, days: 31, d: 10 }   Bài 66, 67: xem lịch (start: thứ của ngày 1, 0 = thứ Hai)
 *   { kind: 'g3b-money', notes: [...] } / { kind: 'g3b-money', items: [[tên, giá]…], pay }   Bài 68
 *   { kind: 'g3b-table', items: [[tên, số]…], what, head }   Bài 73: kiểm đếm, bảng số liệu
 *   { kind: 'g3b-chance', want: 'red' | 'yellow' }  Bài 74: chắc chắn, có thể, không thể
 */

import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { BOARD } from '../grade4Textbook/demos/board.js';
import { frames, svg, C, numAsk } from '../grade4Textbook/demos/util.js';
import { readVN } from '../grade4Tools/num.js';

// ── Dụng cụ chung ───────────────────────────────────────────────────────────
const NB = ' ';
/** 2191 → "2 191", 45887 → "45 887" (khoảng trống không ngắt dòng). */
export const f3 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, NB);
/** Viết tách lớp các số bốn chữ số trong lời của board.js (1234 → 1 234). */
const sp4 = (s) => String(s).replace(/(?<![\d#.\-\w])(\d)(\d{3})(?![\d])/g, `$1${NB}$2`);
const r1 = (v) => Math.round(v * 10) / 10;
const T = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '', style = '' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${t}</text>`;
const R = (x, y, w, h, { fill = 'none', stroke = 'none', sw = 1.5, rx = 4, cls = '', style = '', dash = '' } = {}) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const L = (x1, y1, x2, y2, { stroke = C.ink, sw = 2, cls = '', style = '', dash = '' } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const P = (d, { stroke = C.ink, sw = 2, fill = 'none', cls = '', style = '', dash = '' } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const O = (x, y, r, { fill = 'none', stroke = 'none', sw = 1.5, cls = '', style = '' } = {}) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const G = (cls, body, style = '') => `<g${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${body}</g>`;
const delay = (i, step = 0.08) => `animation-delay:${(i * step).toFixed(2)}s`;
const pick = (list, answer) => ({ options: list, answer: list.indexOf(answer) });

/**
 * Bộ chụp bước như diagram.js: show(k) hiện phần k (có hiệu ứng ở bước này), hide(k) ẩn đi;
 * c(k) → lớp của phần k: 'kd-ghost' khi chưa hiện, anim khi vừa hiện, '' khi đã hiện từ trước.
 */
function stepper(title, W, H, draw) {
  const f = frames(title), on = new Set();
  let fresh = new Set();
  const s = {
    v: {},
    has: (k) => on.has(k),
    show(...k) { k.flat().forEach((x) => { on.add(x); fresh.add(x); }); return s; },
    hide(...k) { k.flat().forEach((x) => on.delete(x)); return s; },
    c: (k, anim = 'is-new') => (!on.has(k) ? 'kd-ghost' : fresh.has(k) ? anim : ''),
    snap(caption, extra = {}) { f.add(svg(W, H, draw(s)), caption, extra); fresh = new Set(); return s; },
    done: () => f.done(),
  };
  return s;
}

const PLACE3 = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn'];
const CARD = ['#FEF3C7', '#DCFCE7', '#DBEAFE', '#FCE7F3', '#EDE9FE'];
const CARD_LINE = ['#F59E0B', '#22C55E', '#3B82F6', '#EC4899', '#8B5CF6'];
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// ── Bảng chữ số của board.js, số bốn chữ số viết tách lớp ─────────────────────
function boardKind(name) {
  return (spec) => {
    const kind = name === 'add' || name === 'sub' ? name : spec.kind;
    const d = BOARD[name]({ ...spec, kind, mode: name === 'div' ? spec.mode || 'full' : spec.mode });
    if (name === 'order') {
      // hỏi số đứng đầu dãy trước bước kết quả (board.js không có câu hỏi cho loại này)
      const sorted = [...spec.nums].sort((x, y) => (spec.desc ? y - x : x - y));
      const opts = [...spec.nums].sort((x, y) => x - y).map(f3);
      const prev = d.frames[d.frames.length - 2] || d.frames[0];
      d.frames.splice(d.frames.length - 1, 0, {
        html: prev.html, result: prev.result,
        caption: `Số nào ${spec.desc ? 'lớn' : 'bé'} nhất, viết đầu tiên?`,
        ask: { options: opts, answer: opts.indexOf(f3(sorted[0])), ok: `Đúng rồi! ${f3(sorted[0])} ${spec.desc ? 'lớn' : 'bé'} nhất.` },
      });
    }
    return {
      title: sp4(d.title),
      frames: d.frames.map((fr) => ({
        ...fr,
        caption: sp4(fr.caption || ''),
        result: fr.result ? sp4(fr.result) : fr.result,
        ask: fr.ask ? { ...fr.ask, options: fr.ask.options.map(sp4), ok: fr.ask.ok ? sp4(fr.ask.ok) : fr.ask.ok } : fr.ask,
      })),
    };
  };
}

// ── Bài 45, 59: số có bốn, năm chữ số trên bảng hàng (thẻ số) ──────────────────
function place(spec) {
  const { n, mode = 'build' } = spec;
  const S = String(n), W = S.length, digits = S.split('').map(Number);
  const Wd = 360, H = mode === 'sum' ? 232 : 212, cw = 340 / W, x0 = 10;
  const pl = (i) => W - 1 - i; // hàng của cột i
  const val = (i) => 10 ** pl(i);
  const cx = (i) => x0 + cw * i + cw / 2;
  const fn = f3(n);
  const s = stepper(`${mode === 'sum' ? 'Viết thành tổng' : 'Viết và đọc số'} ${fn}`, Wd, H, (s) => {
    let out = '';
    for (let i = 0; i < W; i++) {
      const hot = s.v.hot === i;
      out += R(x0 + cw * i + 2, 2, cw - 4, 30, { fill: hot ? '#FED7AA' : '#F1F5F9', rx: 6 });
      out += T(cx(i), 17, cap1(PLACE3[pl(i)]), { size: W > 4 ? 10.5 : 14, fill: hot ? '#9A3412' : C.ink });
      out += R(x0 + cw * i + 2, 36, cw - 4, 132, { fill: hot ? '#FFF7ED' : '#fff', stroke: hot ? C.orange : C.line, sw: hot ? 2 : 1, rx: 6 });
      // thẻ số xếp chồng
      const cwid = Math.min(cw - 14, 70), ch = 12.5;
      for (let k = 0; k < digits[i]; k++) {
        const y = 40 + k * 14;
        out += G(s.c(`card${i}`), R(cx(i) - cwid / 2, y, cwid, ch, { fill: CARD[pl(i)], stroke: CARD_LINE[pl(i)], sw: 1.2, rx: 3 })
          + T(cx(i), y + ch / 2 + 0.5, f3(val(i)), { size: 10.5, fill: C.ink, cls: 'plain' }), delay(k, 0.07));
      }
      if (!digits[i]) out += T(cx(i), 100, '(không có thẻ)', { size: 10.5, fill: C.soft, weight: 700, cls: s.c(`card${i}`) });
      // chữ số
      out += R(x0 + cw * i + 6, 174, cw - 12, 34, { fill: '#fff', stroke: C.line, sw: 1.5, rx: 6 });
      out += T(cx(i), 192, digits[i], { size: 24, fill: C.blue, cls: s.c(`d${i}`) });
      if (mode === 'sum') out += T(cx(i), 222, f3(digits[i] * val(i)), { size: W > 4 ? 13 : 15, fill: digits[i] ? C.green : C.soft, cls: s.c(`v${i}`) });
    }
    return out;
  });
  if (mode === 'sum') {
    for (let i = 0; i < W; i++) s.show(`card${i}`, `d${i}`);
    s.snap(`Số <b>${fn}</b> trên bảng hàng. Mỗi chữ số cho biết có mấy thẻ ở hàng đó.`);
    const parts = [];
    const askAt = digits.findIndex((x, i) => i >= 1 && x > 0);
    for (let i = 0; i < W; i++) {
      s.v.hot = i;
      const v = digits[i] * val(i);
      if (i === askAt) {
        s.snap(`Chữ số <b>${digits[i]}</b> ở hàng ${PLACE3[pl(i)]}: ${digits[i]} thẻ ${f3(val(i))}. Giá trị là bao nhiêu?`, { ask: numAsk(v, { near: [val(i), -val(i), v * 9], fmtFn: f3 }) });
      }
      s.show(`v${i}`);
      if (v) parts.push(f3(v));
      s.snap(digits[i]
        ? `${digits[i]} ${PLACE3[pl(i)]} là <b>${f3(v)}</b>.`
        : `Hàng ${PLACE3[pl(i)]} là chữ số 0: không viết vào tổng.`, { result: parts.join(' + ') });
    }
    s.v.hot = -1;
    const res = `${fn} = ${parts.join(' + ')}`;
    return s.snap(`Viết số thành tổng giá trị các hàng: <b>${res}</b>.`, { result: res }).done();
  }
  s.snap(`Đếm số thẻ ở từng hàng, từ hàng ${PLACE3[W - 1]} (bên trái) sang hàng đơn vị.`);
  let asked = false;
  for (let i = 0; i < W; i++) {
    s.v.hot = i;
    s.show(`card${i}`);
    const name = `thẻ ${f3(val(i))}`;
    if (!asked && i >= 1 && digits[i] > 1) {
      asked = true;
      s.snap(`Hàng ${PLACE3[pl(i)]} có mấy ${name}?`, { ask: numAsk(digits[i], { near: [1, -1, 2] }) });
    }
    s.show(`d${i}`);
    s.snap(digits[i]
      ? `Hàng ${PLACE3[pl(i)]} có <b>${digits[i]} ${name}</b>: viết ${digits[i]} ở hàng ${PLACE3[pl(i)]}.`
      : `Hàng ${PLACE3[pl(i)]} không có thẻ nào: viết <b>0</b> ở hàng ${PLACE3[pl(i)]}.`);
  }
  s.v.hot = -1;
  const rev = Number(S.split('').reverse().join(''));
  const opts = [fn, f3(rev), f3(Number(S.replace(/0/g, '')) || n + 1)].filter((v, i, a) => a.indexOf(v) === i);
  s.snap('Viết các chữ số từ hàng cao nhất đến hàng đơn vị. Số đó là số nào?', { ask: { options: opts, answer: 0, ok: `Đúng rồi! Viết số: <b>${fn}</b>.` } });
  return s.snap(`Viết số: <b>${fn}</b>. Đọc số: <b>${readVN(n)}</b>.`, { result: fn }).done();
}

// ── Tính nhẩm theo nghìn, chục nghìn ─────────────────────────────────────────
const UNIT_NAME = { 10: 'chục', 100: 'trăm', 1000: 'nghìn', 10000: 'chục nghìn' };
function mental(spec) {
  const { a, b, op = '+', unit = 1000 } = spec;
  const opv = op === '-' ? '−' : op;
  const res = op === '+' ? a + b : op === '-' ? a - b : op === '×' ? a * b : a / b;
  const nm = UNIT_NAME[unit];
  const u = (v) => `${f3(v / unit)} ${nm}`;
  const bIsNum = op === '×' || op === ':';
  const left = `${f3(a)} ${opv} ${f3(b)}`;
  const nhamL = `${u(a)} ${opv} ${bIsNum ? b : u(b)}`;
  const rows = [`${left} = ?`, `Nhẩm: ${nhamL} = ${u(res)}`, `${left} = ${f3(res)}`];
  const html = (k, hi = -1) => `<div class="g3b-lines">${rows.map((r, i) => `<div class="g3b-line${i <= k ? '' : ' kd-ghost'}${i === hi ? ' is-new' : ''}${i === 1 ? ' is-nham' : ''}">${r}</div>`).join('')}</div>`;
  const f = frames(`Nhẩm ${left}`);
  f.add(html(0, 0), `Tính nhẩm <b>${left}</b>. Đọc các số theo <b>${nm}</b> cho dễ tính.`);
  f.add(html(0), `${f3(a)} là <b>${u(a)}</b>${bIsNum ? '' : `, ${f3(b)} là <b>${u(b)}</b>`}. ${nhamL} bằng mấy ${nm}?`,
    { ask: numAsk(res / unit, { near: op === '×' ? [b, -b, 1] : [1, -1, 2], fmtFn: (v) => `${f3(v)} ${nm}`, ok: `Đúng rồi! ${nhamL} = ${u(res)}.` }) });
  f.add(html(1, 1), `Nhẩm: <b>${nhamL} = ${u(res)}</b>.`);
  f.add(html(2, 2), `${u(res)} viết là <b>${f3(res)}</b>. Vậy ${left} = ${f3(res)}.`, { result: `${left} = ${f3(res)}` });
  return f.done();
}

// ── Bài 47: chữ số La Mã bằng que tính ───────────────────────────────────────
const RV = { I: 1, V: 5, X: 10 };
function toRoman(n) {
  const T10 = 'X'.repeat(Math.floor(n / 10));
  const u = n % 10;
  const U = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'][u];
  return T10 + U;
}
function fromRoman(s) {
  let v = 0;
  for (let i = 0; i < s.length; i++) { const a = RV[s[i]], b = RV[s[i + 1]] || 0; v += a < b ? -a : a; }
  return v;
}
const STICK = '#D97706', STICK_HEAD = '#DC2626';
function stickLetter(ch, x, y, h, { cls = '', style = '', color = STICK } = {}) {
  const w = 0.62 * h;
  const st = (x1, y1, x2, y2) => L(x1, y1, x2, y2, { stroke: color, sw: Math.max(4, h / 9) });
  let body;
  if (ch === 'I') body = st(x, y, x, y + h);
  else if (ch === 'V') body = st(x - w / 2, y, x, y + h) + st(x + w / 2, y, x, y + h);
  else body = st(x - w / 2, y, x + w / 2, y + h) + st(x + w / 2, y, x - w / 2, y + h);
  return G(cls, body, style);
}
const letterW = (ch, h) => (ch === 'I' ? 0.2 * h : 0.62 * h);
function layoutWord(word, h, gap, cxMid) {
  const ws = word.split('').map((c) => letterW(c, h));
  const tot = ws.reduce((a, b) => a + b, 0) + gap * (word.length - 1);
  let x = cxMid - tot / 2;
  return ws.map((w) => { const c = x + w / 2; x += w + gap; return c; });
}
function roman(spec) {
  const write = spec.n != null;
  const n = write ? spec.n : fromRoman(spec.s);
  const word = write ? toRoman(n) : spec.s;
  const W = 360, H = 200, h = 70, y0 = 86, gap = 20;
  const xs = layoutWord(word, h, gap, W / 2);
  const signOf = (i) => (RV[word[i]] < (RV[word[i + 1]] || 0) ? '−' : '+');
  const s = stepper(write ? `Viết số ${n} bằng chữ số La Mã` : `Đọc số La Mã ${word}`, W, H, (s) => {
    let out = '';
    // bảng ba chữ số cơ bản
    [['I', 1], ['V', 5], ['X', 10]].forEach(([c, v], k) => {
      const bx = 70 + k * 110;
      out += G(s.c('legend'), R(bx - 46, 4, 92, 50, { fill: '#FFFBEB', stroke: '#FDE68A', rx: 10 })
        + stickLetter(c, bx - 18, 13, 32) + T(bx + 18, 30, `= ${v}`, { size: 18, fill: C.ink }), delay(k, 0.15));
    });
    word.split('').forEach((c, i) => {
      out += stickLetter(c, xs[i], y0, h, { cls: s.c(`L${i}`), style: delay(i, write ? 0.12 : 0.1) });
      const sg = i === 0 && signOf(i) === '+' ? '' : signOf(i);
      out += T(xs[i], y0 + h + 22, `${sg}${RV[c]}`, { size: 19, fill: signOf(i) === '−' ? C.red : C.green, cls: s.c(`v${i}`) });
    });
    if (s.v.box) {
      const [i, j] = s.v.box;
      out += R(xs[i] - letterW(word[i], h) / 2 - 10, y0 - 10, xs[j] - xs[i] + (letterW(word[i], h) + letterW(word[j], h)) / 2 + 20, h + 20,
        { stroke: C.orange, sw: 2.5, rx: 10, dash: '6 5', cls: 'is-new' });
    }
    return out;
  });
  s.show('legend').snap('Ba chữ số La Mã cơ bản: <b>I</b> là một, <b>V</b> là năm, <b>X</b> là mười. Ta xếp chúng bằng que tính.');
  if (write) {
    const tens = Math.floor(n / 10), u = n % 10, tStr = 'X'.repeat(tens);
    const idx = (a, b) => Array.from({ length: b - a }, (_, k) => `L${a + k}`);
    const vIdx = (a, b) => Array.from({ length: b - a }, (_, k) => `v${a + k}`);
    if (tens && !u) {
      const opts = ['X', 'XX', 'XXX'];
      s.snap(`${n} là ${tens} chục. Mỗi chữ X là 10. Số ${n} viết thế nào?`, { ask: { options: opts, answer: tens - 1, ok: `Đúng rồi! ${tens} chữ X: ${Array(tens).fill(10).join(' + ')} = ${n}.` } });
    }
    if (tens) {
      s.show(idx(0, tens), vIdx(0, tens)).snap(u ? `${n} = ${tens * 10} + ${u}. Viết ${tens * 10} trước: ${tens === 1 ? 'một chữ X' : 'hai chữ X'} (<b>${tStr}</b>).` : `${n} là ${tens === 1 ? 'mười' : 'hai mươi'}: viết <b>${tStr}</b>.`);
    }
    if (u) {
      const uStr = toRoman(u);
      const wrong = [...new Set([uStr, u === 4 ? 'IIII' : u === 9 ? 'VIIII' : uStr.split('').reverse().join(''), u === 4 ? 'VI' : u === 9 ? 'XI' : `${uStr}I`])].slice(0, 3);
      const opts = [...wrong].sort();
      s.snap(`Còn <b>${u}</b>. Số ${u} viết bằng chữ số La Mã thế nào?`, {
        ask: { options: opts, answer: opts.indexOf(uStr), ok: u === 4 || u === 9 ? `Đúng rồi! I đứng <b>trước</b> ${u === 4 ? 'V' : 'X'} nghĩa là bớt 1: ${u === 4 ? '5 − 1 = 4' : '10 − 1 = 9'}.` : `Đúng rồi! ${u} viết là ${uStr}.` },
      });
      if (uStr.length >= 2 && RV[uStr[0]] < RV[uStr[1]]) s.v.box = [tens, tens + 1];
      s.show(idx(tens, word.length), vIdx(tens, word.length)).snap(u === 4 || u === 9
        ? `I đứng <b>trước</b> chữ số lớn hơn thì <b>bớt 1</b>: ${uStr} là ${u}.`
        : u > 5 ? `I đứng <b>sau</b> V thì <b>thêm</b>: ${uStr} là 5 + ${u - 5} = ${u}.` : `Viết <b>${uStr}</b> là ${u}.`);
    } else if (!tens) s.show(idx(0, word.length), vIdx(0, word.length));
    s.v.box = null;
    return s.snap(`Vậy số ${n} viết bằng chữ số La Mã là <b>${word}</b>.`, { result: `${n} = ${word}` }).done();
  }
  // đọc: hiện cả số, rồi đọc từng phần từ trái sang phải (cặp "I trước V/X" là một phần)
  s.show(word.split('').map((_, i) => `L${i}`)).snap(`Số La Mã <b>${word}</b>. Đọc giá trị từng chữ số từ trái sang phải.`);
  const groups = [];
  for (let i = 0; i < word.length; i++) {
    if (signOf(i) === '−') { groups.push({ at: [i, i + 1], v: RV[word[i + 1]] - RV[word[i]] }); i++; } else groups.push({ at: [i], v: RV[word[i]] });
  }
  const parts = [];
  groups.forEach((gr, k) => {
    const last = k === groups.length - 1;
    gr.at.forEach((i) => s.show(`v${i}`));
    if (gr.at.length === 2) {
      const [i, j] = gr.at;
      s.v.box = [i, j];
      const txt = `${word[i]}${word[j]} = ${RV[word[j]]} − ${RV[word[i]]}`;
      if (groups.length === 1) {
        s.snap(`<b>${word[i]}</b> đứng <b>trước</b> ${word[j]} (lớn hơn) nên <b>bớt ${RV[word[i]]}</b>: ${txt} = ?`, { ask: numAsk(gr.v, { near: [2, -2, 1], ok: `Đúng rồi! ${txt} = ${gr.v}.` }) });
      }
      parts.push(String(gr.v));
      s.snap(`<b>${word[i]}</b> đứng <b>trước</b> ${word[j]} (lớn hơn) nên <b>bớt ${RV[word[i]]}</b>: ${txt} = <b>${gr.v}</b>.`, { result: parts.join(' + ') });
    } else {
      s.v.box = null;
      parts.push(String(gr.v));
      s.snap(`<b>${word[gr.at[0]]}</b> là ${gr.v}${k ? ', đứng sau nên cộng thêm' : ''}.`, { result: parts.join(' + ') });
    }
    if (last && groups.length > 1) {
      s.v.box = null;
      s.snap(`${parts.join(' + ')} bằng mấy?`, { ask: numAsk(n, { near: [2, -2, 1], ok: `Đúng rồi! ${parts.join(' + ')} = ${n}.` }), result: parts.join(' + ') });
    }
  });
  s.v.box = null;
  return s.snap(`Vậy <b>${word}</b> là ${n}, đọc là <b>${readVN(n)}</b>.`, { result: `${word} = ${n}` }).done();
}

// ── Bài 48, 61: làm tròn số trên tia số ──────────────────────────────────────
function round(spec) {
  const { n, to } = spec;
  const lo = Math.floor(n / to) * to, hi = lo + to, mid = lo + to / 2;
  const res = n - lo < to / 2 ? lo : hi;
  const pi = Math.round(Math.log10(to)); // hàng làm tròn
  const dPlace = PLACE3[pi - 1], tPlace = PLACE3[pi];
  const S = String(n), di = S.length - pi; // vị trí chữ số quyết định
  const d = Number(S[di]);
  const W = 360, H = 196, X1 = 34, X2 = 326, y = 124;
  const xv = (v) => X1 + (X2 - X1) * (v - lo) / to;
  const s = stepper(`Làm tròn ${f3(n)} đến hàng ${tPlace}`, W, H, (s) => {
    let out = '';
    // số ở trên, chữ số quyết định tô màu
    const digs = f3(n).split('');
    let k = 0, body = '';
    digs.forEach((c) => {
      if (c === NB) { body += ' '; return; }
      const hot = s.has('digit') && k === di;
      body += `<tspan${hot ? ` fill="${C.orange}"` : ''}>${c}</tspan>`;
      k++;
    });
    out += `<text x="${W / 2}" y="28" font-size="30" font-weight="800" fill="${C.ink}" text-anchor="middle" dominant-baseline="middle">${body}</text>`;
    out += G(s.c('digit'), T(W / 2, 52, `chữ số hàng ${dPlace}: ${d}`, { size: 13, fill: '#9A3412', weight: 700 }));
    // tia số
    out += L(X1 - 8, y, X2 + 8, y, { stroke: C.ink, sw: 2.5 });
    for (let t = 0; t <= 10; t++) {
      const x = X1 + (X2 - X1) * t / 10;
      const big = t === 0 || t === 10;
      out += L(x, y - (big ? 10 : 6), x, y + (big ? 10 : 6), { stroke: t === 5 && s.has('mid') ? C.orange : C.ink, sw: big ? 2.5 : 1.5 });
    }
    out += T(X1, y + 26, f3(lo), { size: 15, fill: s.v.win === lo ? C.green : C.ink });
    out += T(X2, y + 26, f3(hi), { size: 15, fill: s.v.win === hi ? C.green : C.ink });
    out += G(s.c('mid'), L(xv(mid), y - 30, xv(mid), y + 12, { stroke: C.orange, sw: 2, dash: '4 4' }) + T(xv(mid), y + 26, f3(mid), { size: 13, fill: C.orange }));
    if (s.v.win != null) out += R(xv(s.v.win) - 34, y + 15, 68, 22, { stroke: C.green, sw: 2, rx: 11, cls: s.c('win') });
    // điểm của số n
    const xn = xv(n);
    out += G(s.c('pt'), O(xn, y, 7, { fill: C.blue, stroke: '#fff', sw: 2 }) + P(`M${xn} ${y - 9}L${xn} ${y - 40}`, { stroke: C.blue, sw: 2 })
      + T(xn, y - 50, f3(n), { size: 13, fill: C.blue }));
    // mũi tên tới số tròn gần hơn
    if (s.v.win != null) {
      const xt = xv(s.v.win), m = (xn + xt) / 2, hh = Math.min(34, Math.abs(xt - xn) / 2 + 14), dir = xt > xn ? 1 : -1;
      out += G(s.c('win'), P(`M${r1(xn)} ${y - 8}Q${r1(m)} ${r1(y - 8 - 2 * hh)} ${r1(xt)} ${y - 8}`, { stroke: C.green, sw: 2.5, dash: '5 4' })
        + P(`M${r1(xt - dir * 7)} ${y - 16}L${r1(xt)} ${y - 8}L${r1(xt + dir * 2)} ${y - 18}`, { stroke: C.green, sw: 2.5 }));
    }
    return out;
  });
  s.v.win = null;
  s.snap(`Làm tròn <b>${f3(n)}</b> đến hàng ${tPlace}. ${f3(n)} nằm giữa hai số tròn ${tPlace}: <b>${f3(lo)}</b> và <b>${f3(hi)}</b>.`);
  s.show('pt').snap(`Đánh dấu ${f3(n)} trên tia số, giữa ${f3(lo)} và ${f3(hi)}.`);
  s.show('mid').snap(`Điểm chính giữa là <b>${f3(mid)}</b>. Số ở bên trái điểm này gần ${f3(lo)} hơn, số từ điểm này trở sang phải thì làm tròn lên ${f3(hi)}.`);
  s.snap(`${f3(n)} gần số tròn ${tPlace} nào hơn?`, {
    ask: { options: [f3(lo), f3(hi)], answer: res === lo ? 0 : 1, ok: n === mid ? `Đúng rồi! ${f3(n)} ở chính giữa thì làm tròn <b>lên</b> ${f3(hi)}.` : `Đúng rồi! ${f3(n)} gần ${f3(res)} hơn.` },
  });
  s.v.win = res;
  s.show('win', 'digit').snap(`Cách nhanh: nhìn <b>chữ số hàng ${dPlace}</b> là <b>${d}</b>. ${d < 5 ? `${d} &lt; 5 nên làm tròn <b>xuống</b>` : `${d} ${d === 5 ? '=' : '&gt;'} 5 nên làm tròn <b>lên</b>`}.`);
  return s.snap(`Làm tròn số ${f3(n)} đến hàng ${tPlace} ta được số <b>${f3(res)}</b>.`, { result: `${f3(n)} → ${f3(res)}` }).done();
}

// ── Bài 50: chu vi ───────────────────────────────────────────────────────────
function perim(spec) {
  const { shape = 'tri', unit = 'cm' } = spec;
  let sides = spec.sides;
  if (shape === 'rect') sides = [spec.a, spec.b, spec.a, spec.b];
  if (shape === 'square') sides = [spec.a, spec.a, spec.a, spec.a];
  const W = 360, H = 206;
  // các đỉnh (khung 40..320 × 30..170)
  let pts, names;
  if (shape === 'tri') {
    const [a, b, c] = sides; // AB = c (đáy), BC = a, CA = b; vẽ theo đúng tỉ lệ
    const x = (c * c + b * b - a * a) / (2 * c), hh = Math.sqrt(Math.max(0, b * b - x * x));
    const x1 = Math.min(0, x), x2 = Math.max(c, x);
    const k = Math.min(270 / (x2 - x1), 130 / (hh || 1));
    const ox = (W - (x2 - x1) * k) / 2 - x1 * k, oy = (190 + hh * k) / 2 + 4;
    pts = [[ox, oy], [ox + c * k, oy], [ox + x * k, oy - hh * k]];
    names = ['A', 'B', 'C'];
    sides = [c, a, b]; // AB, BC, CA
  } else if (shape === 'quad') {
    pts = [[60, 160], [300, 160], [270, 44], [100, 58]];
    names = ['A', 'B', 'C', 'D'];
  } else {
    const [a, b] = [sides[0], sides[1]];
    const k = Math.min(220 / a, 112 / b);
    const ox = (W - a * k) / 2, oy = 92 + b * k / 2;
    pts = [[ox, oy], [ox + a * k, oy], [ox + a * k, oy - b * k], [ox, oy - b * k]];
    names = ['A', 'B', 'C', 'D'];
  }
  const nS = pts.length;
  const cxm = pts.reduce((a, p) => a + p[0], 0) / nS, cym = pts.reduce((a, p) => a + p[1], 0) / nS;
  const sum = sides.reduce((a, b) => a + b, 0);
  const title = { tri: 'Chu vi hình tam giác', quad: 'Chu vi hình tứ giác', rect: 'Chu vi hình chữ nhật', square: 'Chu vi hình vuông' }[shape];
  const s = stepper(title, W, H, (s) => {
    let out = `<polygon points="${pts.map((p) => p.map(r1).join(',')).join(' ')}" fill="#E0F2FE" stroke="${C.ink}" stroke-width="2.5" stroke-linejoin="round"/>`;
    for (let i = 0; i < nS; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % nS];
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const len = Math.hypot(x2 - x1, y2 - y1) || 1;
      let nx = -(y2 - y1) / len, ny = (x2 - x1) / len; // pháp tuyến, quay ra ngoài hình
      if (nx * (mx - cxm) + ny * (my - cym) < 0) { nx = -nx; ny = -ny; }
      const off = Math.abs(nx) * 30 + Math.abs(ny) * 14;
      out += L(x1, y1, x2, y2, { stroke: C.orange, sw: 6, cls: s.c(`s${i}`, 'is-draw'), style: `--len:${Math.ceil(len)}` });
      out += T(mx + nx * off, my + ny * off, `${sides[i]} ${unit}`, { size: 15, fill: s.has(`s${i}`) ? '#C2410C' : C.ink });
    }
    pts.forEach(([x, y], i) => {
      let dx = x - cxm, dy = y - cym; const l = Math.hypot(dx, dy) || 1; dx /= l; dy /= l;
      out += O(x, y, 3.5, { fill: C.ink }) + T(x + dx * 14, y + dy * 14, names[i], { size: 15, fill: C.ink });
    });
    if (shape === 'rect' || shape === 'square') {
      out += T(W / 2, 198, shape === 'rect' ? `chiều dài ${spec.a} ${unit}, chiều rộng ${spec.b} ${unit}` : `cạnh ${spec.a} ${unit}`, { size: 13, fill: C.soft, weight: 700 });
    }
    return out;
  });
  s.snap(`<b>Chu vi</b> của một hình là <b>tổng độ dài các cạnh</b> của hình đó. Ta đi một vòng quanh hình, cộng độ dài từng cạnh.`);
  const run = [];
  for (let i = 0; i < nS; i++) {
    s.show(`s${i}`);
    run.push(sides[i]);
    const nm = `${names[i]}${names[(i + 1) % nS]}`;
    if (i === nS - 1) {
      s.snap(`Cạnh cuối ${nm} dài ${sides[i]} ${unit}. ${run.join(' + ')} bằng mấy?`, { ask: numAsk(sum, { near: [sides[i], -sides[i], 1], ok: `Đúng rồi! ${run.join(' + ')} = ${sum}.` }), result: run.join(' + ') });
    }
    s.snap(`Cạnh ${nm} dài <b>${sides[i]} ${unit}</b>.`, { result: i === nS - 1 ? `${run.join(' + ')} = ${sum} (${unit})` : run.join(' + ') });
  }
  if (shape === 'rect') {
    return s.snap(`Hai chiều dài bằng nhau, hai chiều rộng bằng nhau. Tính gọn: chu vi = (chiều dài + chiều rộng) × 2 = (${spec.a} + ${spec.b}) × 2 = <b>${sum} (${unit})</b>.`, { result: `(${spec.a} + ${spec.b}) × 2 = ${sum} (${unit})` }).done();
  }
  if (shape === 'square') {
    return s.snap(`Bốn cạnh bằng nhau. Tính gọn: chu vi = độ dài một cạnh × 4 = ${spec.a} × 4 = <b>${sum} (${unit})</b>.`, { result: `${spec.a} × 4 = ${sum} (${unit})` }).done();
  }
  return s.snap(`Chu vi ${title.replace('Chu vi ', '')} ${names.join('')} là: ${sides.join(' + ')} = <b>${sum} (${unit})</b>.`, { result: `${sides.join(' + ')} = ${sum} (${unit})` }).done();
}

// ── Bài 51, 52: diện tích, xăng-ti-mét vuông ─────────────────────────────────
function areaCount() {
  // hình A: 3 × 2 ô; hình B: một dải dài 5 ô (trông dài hơn nhưng ít ô hơn)
  const A = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]];
  const B = [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]];
  const W = 360, H = 190, u = 30, ax = 26, ay = 52, bx = 176, by = 82;
  const s = stepper('Hình nào có diện tích lớn hơn?', W, H, (s) => {
    let out = '';
    for (let i = 0; i <= 11; i++) out += L(10 + i * u, 22, 10 + i * u, 172, { stroke: '#E2E8F0', sw: 1 });
    for (let j = 0; j <= 5; j++) out += L(10, 22 + j * u, 340, 22 + j * u, { stroke: '#E2E8F0', sw: 1 });
    const cells = (list, ox, oy, fill, line, key) => list.map(([x, y], k) => R(ox + x * u, oy + y * u, u, u, { fill, stroke: line, sw: 1.5, rx: 0 })
      + T(ox + x * u + u / 2, oy + y * u + u / 2 + 1, k + 1, { size: 14, fill: line, cls: s.c(`${key}${k}`) })).join('');
    out += cells(A, ax, ay, '#BFDBFE', C.blue, 'a') + T(ax + 45, ay - 14, 'Hình A', { size: 15, fill: C.blue });
    out += cells(B, bx, by, '#FED7AA', '#C2410C', 'b') + T(bx + 75, by - 14, 'Hình B', { size: 15, fill: '#C2410C' });
    out += G(s.c('one'), R(ax, ay + 2 * u + 18, u, u, { fill: '#BBF7D0', stroke: C.green, sw: 2, rx: 0 }) + T(ax + u + 8, ay + 2 * u + 18 + u / 2, '1 cm²', { size: 15, fill: C.green, anchor: 'start' }));
    return out;
  });
  s.snap('Hình B trông <b>dài</b> hơn. Nhưng diện tích là phần mặt phẳng hình đó chiếm. Ta đếm số ô vuông để so sánh.');
  s.show('one').snap('Mỗi ô vuông có cạnh <b>1 cm</b>. Diện tích một ô vuông như thế là <b>1 xăng-ti-mét vuông</b>, viết tắt <b>1 cm²</b>.');
  s.show(A.map((_, k) => `a${k}`)).snap('Hình A gồm mấy ô vuông?', { ask: numAsk(6, { near: [-1, 1, 2] }) });
  s.snap('Hình A gồm <b>6 ô vuông</b>: diện tích hình A là <b>6 cm²</b>.', { result: 'A: 6 cm²' });
  s.show(B.map((_, k) => `b${k}`)).snap('Hình B gồm <b>5 ô vuông</b>: diện tích hình B là <b>5 cm²</b>.', { result: 'A: 6 cm² · B: 5 cm²' });
  s.snap('Hình nào có diện tích lớn hơn?', { ask: { options: ['Hình A', 'Hình B'], answer: 0, ok: 'Đúng rồi! 6 cm² &gt; 5 cm².' }, result: 'A: 6 cm² · B: 5 cm²' });
  return s.snap('Hình A có diện tích <b>lớn hơn</b> hình B, dù hình B trông dài hơn.', { result: '6 cm² &gt; 5 cm²' }).done();
}

function areaRect(spec) {
  const { w, h } = spec;
  const sq = w === h;
  const W = 360, H = 214;
  const u = Math.min(250 / w, 150 / h, 34);
  const ox = (W - w * u) / 2 + 12, oy = 18 + (156 - h * u) / 2;
  const s = stepper(sq ? `Diện tích hình vuông cạnh ${w} cm` : `Diện tích hình chữ nhật ${w} cm × ${h} cm`, W, H, (s) => {
    let out = '';
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        out += R(ox + x * u, oy + y * u, u, u, { fill: y === 0 ? '#BFDBFE' : '#BBF7D0', stroke: '#fff', sw: 1, rx: 0, cls: s.c(`row${y}`), style: delay(x + y * 0.5, 0.05) });
      }
    }
    for (let x = 0; x <= w; x++) out += L(ox + x * u, oy, ox + x * u, oy + h * u, { stroke: '#94A3B8', sw: 1, dash: '3 3' });
    for (let y = 0; y <= h; y++) out += L(ox, oy + y * u, ox + w * u, oy + y * u, { stroke: '#94A3B8', sw: 1, dash: '3 3' });
    out += R(ox, oy, w * u, h * u, { stroke: C.ink, sw: 2.5, rx: 0 });
    out += G(s.c('one'), R(ox, oy, u, u, { fill: '#FDE68A', stroke: C.orange, sw: 2.5, rx: 0 }) + T(ox + u / 2, oy + u / 2 + 1, '1', { size: Math.min(15, u * 0.5), fill: '#9A3412' }));
    out += T(ox + w * u / 2, oy + h * u + 18, `${w} cm`, { size: 15, fill: C.ink });
    out += T(ox - 10, oy + h * u / 2, `${h} cm`, { size: 15, fill: C.ink, anchor: 'end' });
    if (s.v.rowN) for (let y = 0; y < h; y++) out += T(ox + w * u + 8, oy + y * u + u / 2, `${w}`, { size: 13, fill: y === 0 ? C.blue : C.green, anchor: 'start', cls: s.c(`row${y}`) });
    return out;
  });
  s.snap(`${sq ? `Hình vuông cạnh <b>${w} cm</b>` : `Hình chữ nhật có chiều dài <b>${w} cm</b>, chiều rộng <b>${h} cm</b>`}, chia thành các ô vuông cạnh 1 cm.`);
  s.show('one').snap('Mỗi ô vuông cạnh 1 cm có diện tích là <b>1 cm²</b>.');
  s.v.rowN = true;
  s.hide('one').show('row0').snap(`Mỗi hàng có <b>${w} ô vuông</b> (bằng ${sq ? 'độ dài cạnh' : 'chiều dài'}).`);
  for (let y = 1; y < h; y++) s.show(`row${y}`);
  s.snap(`Có <b>${h} hàng</b> như thế (bằng ${sq ? 'độ dài cạnh' : 'chiều rộng'}).`);
  s.snap(`${h} hàng, mỗi hàng ${w} ô. Có tất cả bao nhiêu ô vuông?`, { ask: numAsk(w * h, { near: [w, -w, 1], ok: `Đúng rồi! ${w} × ${h} = ${w * h}.` }) });
  return s.snap(sq
    ? `Muốn tính diện tích hình vuông, ta lấy <b>độ dài một cạnh nhân với chính nó</b>: ${w} × ${w} = <b>${w * w} (cm²)</b>.`
    : `Muốn tính diện tích hình chữ nhật, ta lấy <b>chiều dài nhân với chiều rộng</b> (cùng đơn vị đo): ${w} × ${h} = <b>${w * h} (cm²)</b>.`,
  { result: `${w} × ${h} = ${w * h} (cm²)` }).done();
}
const area = (spec) => (spec.mode === 'count' ? areaCount(spec) : areaRect(spec));

// ── Bài 66: xem đồng hồ ──────────────────────────────────────────────────────
function clock(spec) {
  const { h, m, pm = false } = spec;
  const W = 360, H = 228, cx = 116, cy = 114, r = 92;
  const ang = (t) => (t - 15) / 60 * 2 * Math.PI; // t: số phút trên mặt đồng hồ
  const at = (t, rr) => [cx + rr * Math.cos(ang(t)), cy + rr * Math.sin(ang(t))];
  const hourT = ((h % 12) + m / 60) * 5;
  const five = Math.floor(m / 5), extra = m % 5;
  const kem = m >= 35;
  const s = stepper(`Đồng hồ chỉ ${h} giờ ${m} phút`, W, H, (s) => {
    let out = O(cx, cy, r + 4, { fill: '#FDE68A' }) + O(cx, cy, r, { fill: '#fff', stroke: '#F59E0B', sw: 3 });
    for (let t = 0; t < 60; t++) {
      const [x1, y1] = at(t, r - 3), [x2, y2] = at(t, r - (t % 5 ? 8 : 13));
      out += L(x1, y1, x2, y2, { stroke: C.ink, sw: t % 5 ? 1.2 : 2.4 });
    }
    for (let k = 1; k <= 12; k++) { const [x, y] = at(k * 5, r - 26); out += T(x, y + 1, k, { size: 17, fill: C.ink }); }
    // phần đã đi của kim phút (từ số 12) hoặc phần còn thiếu (giờ kém)
    if (s.has('sweep')) {
      const [sx, sy] = at(0, r - 15), [ex, ey] = at(m, r - 15);
      out += P(`M${cx} ${cy}L${r1(sx)} ${r1(sy)}A${r - 15} ${r - 15} 0 ${m > 30 ? 1 : 0} 1 ${r1(ex)} ${r1(ey)}Z`, { fill: 'rgba(59,130,246,0.14)', stroke: 'none', cls: s.c('sweep', 'is-fade') });
    }
    if (s.has('kem')) {
      const [sx, sy] = at(m, r - 15), [ex, ey] = at(60, r - 15);
      out += P(`M${cx} ${cy}L${r1(sx)} ${r1(sy)}A${r - 15} ${r - 15} 0 0 1 ${r1(ex)} ${r1(ey)}Z`, { fill: 'rgba(249,115,22,0.22)', stroke: 'none', cls: s.c('kem', 'is-fade') });
    }
    // đếm 5, 10, 15… ngoài mặt số
    for (let k = 1; k <= five; k++) {
      const [x, y] = at(k * 5, r + 15);
      out += T(x, y, k * 5, { size: 11.5, fill: C.blue, cls: s.c('count'), style: delay(k, 0.12) });
    }
    for (let k = 1; k <= extra; k++) {
      const [x, y] = at(five * 5 + k, r + 15);
      out += O(x, y, 2.6, { fill: C.blue, cls: s.c('count'), style: delay(five + k, 0.12) });
    }
    const hot = s.v.hot;
    const [hx, hy] = at(hourT, r * 0.46), [mx, my] = at(m, r * 0.7);
    out += L(cx, cy, hx, hy, { stroke: hot === 'h' ? C.red : C.ink, sw: 7 });
    out += L(cx, cy, mx, my, { stroke: hot === 'm' ? C.blue : C.ink, sw: 4.5 });
    out += O(cx, cy, 6, { fill: C.ink });
    // bảng bên phải
    out += R(232, 40, 118, 52, { fill: '#0F172A', rx: 10, cls: s.c('digital') });
    out += T(291, 67, `${pm ? h + 12 : h}:${String(m).padStart(2, '0')}`, { size: 28, fill: '#4ADE80', cls: s.c('digital'), style: 'font-family:monospace' });
    out += T(291, 114, `${h} giờ ${m} phút`, { size: 15, fill: C.ink, cls: s.c('read1') });
    if (kem) out += T(291, 140, `${h + 1 > 12 ? 1 : h + 1} giờ kém ${60 - m}`, { size: 15, fill: '#C2410C', cls: s.c('read2') });
    if (pm) out += T(291, 168, `${h + 12} giờ ${m} phút`, { size: 15, fill: C.violet, cls: s.c('read3') });
    return out;
  });
  s.snap('Kim <b>ngắn</b> là kim giờ, kim <b>dài</b> là kim phút. Xem kim giờ trước, rồi xem kim phút.');
  s.v.hot = 'h';
  s.snap(m ? `Kim giờ ở giữa số <b>${h}</b> và số <b>${h % 12 + 1}</b>: đã qua ${h} giờ, chưa tới ${h % 12 + 1} giờ.` : `Kim giờ chỉ số <b>${h}</b>.`);
  s.v.hot = 'm';
  s.show('count', 'sweep').snap(`Kim phút: từ số 12, mỗi khoảng giữa hai số liền nhau là <b>5 phút</b>. Đếm 5, 10, 15 cho tới kim phút${extra ? ', rồi đếm thêm từng vạch nhỏ (1 phút)' : ''}.`);
  s.snap(`Kim phút chỉ ${extra ? `qua số ${five} thêm ${extra} vạch nhỏ` : `số ${five}`}. Đó là bao nhiêu phút?`, { ask: numAsk(m, { near: [5, -5, 1], ok: `Đúng rồi! ${extra ? `${five * 5} + ${extra} = ${m}` : `${five} × 5 = ${m}`} phút.` }) });
  s.v.hot = null;
  s.show('digital', 'read1').snap(`Đồng hồ chỉ <b>${h} giờ ${m} phút</b>.`, { result: `${h} giờ ${m} phút` });
  if (kem) {
    s.hide('sweep').show('kem', 'read2').snap(`Còn <b>${60 - m} phút</b> nữa là đến ${h % 12 + 1} giờ. Nên ${h} giờ ${m} phút còn gọi là <b>${h % 12 + 1} giờ kém ${60 - m}</b>.`, { result: `${h % 12 + 1} giờ kém ${60 - m}` });
  }
  if (pm) {
    s.show('read3').snap(`Buổi chiều, buổi tối thì cộng thêm 12 giờ: ${h} giờ ${m} phút tối còn gọi là <b>${h + 12} giờ ${m} phút</b>.`, { result: `${h + 12} giờ ${m} phút` });
  }
  return s.done();
}

// ── Bài 66: các tháng trong năm ─────────────────────────────────────────────
const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
function months(spec) {
  const q = spec.ask || 2;
  const W = 360, H = 232;
  const s = stepper('Các tháng trong năm', W, H, (s) => {
    let out = '';
    for (let i = 0; i < 12; i++) {
      const col = i % 4, row = Math.floor(i / 4);
      const x = 8 + col * 87, y = 6 + row * 44;
      const d = DAYS[i];
      const tone = !s.has('d31') ? 0 : d === 31 ? 1 : d === 30 && s.has('d30') ? 2 : d === 28 && s.has('d28') ? 3 : 0;
      const fill = ['#F8FAFC', '#FFEDD5', '#DBEAFE', '#DCFCE7'][tone];
      const hot = s.v.hot === i + 1;
      out += G(s.c('tiles'), R(x, y, 81, 38, { fill, stroke: hot ? C.red : C.line, sw: hot ? 3 : 1.2, rx: 8 })
        + T(x + 40.5, y + 13, `Tháng ${i + 1}`, { size: 13, fill: C.ink })
        + T(x + 40.5, y + 29, i === 1 ? '28 / 29 ngày' : `${d} ngày`, { size: 11.5, fill: tone ? C.ink : C.soft, weight: 700, cls: s.has('d31') && tone ? '' : 'kd-ghost' }), delay(i, 0.04));
    }
    // mẹo nắm tay: bốn khớp lồi (31 ngày) và ba chỗ lõm giữa các khớp
    const yk = 180;
    let hand = R(36, yk, 288, 34, { fill: '#FDE68A', stroke: '#B45309', sw: 2.5, rx: 14 });
    const top = ['1 · 8', '3 · 10', '5 · 12', '7'], low = ['2 · 9', '4 · 11', '6'];
    top.forEach((t, j) => {
      const x = 66 + j * 76;
      hand += O(x, yk + 2, 17, { fill: '#FDE68A', stroke: '#B45309', sw: 2.5 }) + R(x - 15, yk + 3, 30, 14, { fill: '#FDE68A', rx: 0 });
      hand += T(x, yk - 26, t, { size: 13, fill: '#C2410C' });
    });
    low.forEach((t, j) => { hand += T(104 + j * 76, yk + 20, t, { size: 13, fill: C.blue }); });
    out += G(s.c('hand'), hand);
    return out;
  });
  s.show('tiles').snap('Một năm có <b>12 tháng</b>: tháng 1, tháng 2, …, tháng 12.');
  s.show('d31').snap('Các tháng có <b>31 ngày</b>: tháng 1, 3, 5, 7, 8, 10, 12.');
  s.show('d30').snap('Các tháng có <b>30 ngày</b>: tháng 4, 6, 9, 11.');
  s.v.hot = q;
  const ans = DAYS[q - 1] === 28 ? '28 hoặc 29' : String(DAYS[q - 1]);
  const opts = ['28 hoặc 29', '30', '31'];
  s.snap(`Tháng ${q} có bao nhiêu ngày?`, { ask: { options: opts, answer: opts.indexOf(ans), ok: q === 2 ? 'Đúng rồi! Tháng 2 có 28 ngày, có năm có 29 ngày.' : `Đúng rồi! Tháng ${q} có ${ans} ngày.` } });
  s.show('d28').snap(`${q === 2 ? '' : 'Còn '}<b>tháng 2</b> có 28 ngày, có năm có 29 ngày.`);
  s.v.hot = null;
  return s.show('hand').snap('Mẹo nắm tay: đếm tháng lần lượt trên khớp và chỗ lõm giữa hai khớp. Tháng rơi vào <b>khớp lồi</b> có 31 ngày; chỗ lõm có 30 ngày (trừ tháng 2). Hết tay thì đếm lại từ khớp đầu: tháng 8.', { result: '1 năm = 12 tháng' }).done();
}

// ── Bài 66, 67: xem lịch ─────────────────────────────────────────────────────
const DOW = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
function cal(spec) {
  const { month = 12, start = 3, days = 31, d = 10 } = spec;
  const W = 360, H = 232, cw = 49, x0 = 8.5, y0 = 52, ch = 28;
  const pos = (day) => { const k = start + day - 1; return [k % 7, Math.floor(k / 7)]; };
  const wd = pos(d)[0];
  const s = stepper(`Tờ lịch tháng ${month}`, W, H, (s) => {
    let out = R(4, 2, 352, 228, { fill: '#fff', stroke: C.line, rx: 12 });
    out += R(4, 2, 352, 26, { fill: '#EF4444', rx: 12 }) + R(4, 16, 352, 12, { fill: '#EF4444', rx: 0 });
    out += T(180, 16, `THÁNG ${month}`, { size: 15, fill: '#fff', cls: 'plain' });
    DOW.forEach((t, i) => {
      const hot = s.v.col === i;
      out += R(x0 + i * cw + 1, 31, cw - 2, 19, { fill: hot ? '#FED7AA' : '#F1F5F9', rx: 5 });
      out += T(x0 + i * cw + cw / 2, 41, t, { size: 9.5, fill: i === 6 ? C.red : C.ink, weight: 800 });
    });
    if (s.v.col != null) out += R(x0 + s.v.col * cw + 1, y0, cw - 2, ch * 6, { fill: 'rgba(249,115,22,0.10)', rx: 6, cls: 'is-fade' });
    for (let day = 1; day <= days; day++) {
      const [c, r] = pos(day);
      const x = x0 + c * cw + cw / 2, y = y0 + r * ch + ch / 2;
      const ring = s.v.ring?.includes(day);
      if (ring) out += O(x, y, 12, { fill: day === s.v.ring[0] ? '#FDE68A' : '#BBF7D0', stroke: day === s.v.ring[0] ? C.orange : C.green, sw: 2, cls: 'is-new' });
      out += T(x, y + 1, day, { size: 14, fill: c === 6 ? C.red : C.ink, weight: ring ? 800 : 700 });
    }
    if (s.v.arrow) {
      const [c, r] = pos(d);
      const x = x0 + c * cw + cw / 2 + 15, y1 = y0 + r * ch + ch / 2 + 2, y2 = y1 + ch - 4;
      out += P(`M${x} ${y1}Q${x + 12} ${(y1 + y2) / 2} ${x} ${y2}`, { stroke: C.green, sw: 2, cls: 'is-new' })
        + T(x + 16, (y1 + y2) / 2, '+7', { size: 11, fill: C.green, cls: 'is-new' });
    }
    return out;
  });
  s.snap(`Tờ lịch <b>tháng ${month}</b> có <b>${days} ngày</b>. Mỗi cột là một thứ trong tuần, một tuần có 7 ngày.`);
  s.v.ring = [1]; s.v.col = pos(1)[0];
  s.snap(`Ngày 1 tháng ${month} nằm ở cột <b>${DOW[pos(1)[0]]}</b>: ngày 1 là ${DOW[pos(1)[0]].toLowerCase()}.`);
  s.v.ring = [d]; s.v.col = null;
  const opts = [DOW[(wd + 6) % 7], DOW[wd], DOW[(wd + 1) % 7]];
  s.snap(`Ngày <b>${d}</b> tháng ${month} là thứ mấy? Tìm ô ngày ${d}, nhìn lên đầu cột.`, { ask: { options: opts, answer: 1, ok: `Đúng rồi! Ngày ${d} ở cột ${DOW[wd]}.` } });
  s.v.col = wd;
  s.snap(`Ngày ${d} tháng ${month} là <b>${DOW[wd].toLowerCase()}</b>.`, { result: `Ngày ${d}: ${DOW[wd]}` });
  if (d + 7 <= days) {
    s.v.arrow = true;
    s.snap(`Một tuần sau ngày ${d} (thêm 7 ngày) là ngày nào?`, { ask: numAsk(d + 7, { near: [-1, 1, -7], ok: `Đúng rồi! ${d} + 7 = ${d + 7}.` }) });
    s.v.ring = [d, d + 7];
    s.snap(`Ngày <b>${d + 7}</b> cũng là ${DOW[wd].toLowerCase()}. Các ngày trong <b>cùng một cột</b> cách nhau 7 ngày, nên cùng một thứ.`, { result: `${d} + 7 = ${d + 7}: ${DOW[wd]}` });
  }
  return s.done();
}

// ── Bài 68: tiền Việt Nam ────────────────────────────────────────────────────
const NOTE = {
  1000: ['#E9D5FF', '#7E22CE'], 2000: ['#E7D7C1', '#78350F'], 5000: ['#BFDBFE', '#1D4ED8'], 10000: ['#FDE68A', '#A16207'],
  20000: ['#BAE6FD', '#0369A1'], 50000: ['#FBCFE8', '#BE185D'], 100000: ['#BBF7D0', '#15803D'], 200000: ['#FED7AA', '#C2410C'], 500000: ['#A5F3FC', '#0E7490'],
};
function note(v, x, y, { w = 84, h = 42, cls = '', style = '' } = {}) {
  const [bg, ink] = NOTE[v] || ['#F1F5F9', C.ink];
  return G(cls, R(x, y, w, h, { fill: bg, stroke: ink, sw: 1.5, rx: 5 })
    + R(x + 4, y + 4, w - 8, h - 8, { stroke: ink, sw: 0.8, rx: 3 })
    + O(x + w - 12, y + h / 2, 6, { fill: '#fff', stroke: ink, sw: 1 })
    + T(x + (w - 16) / 2 + 2, y + h / 2 - 5, f3(v), { size: h > 44 ? 14 : 12.5, fill: ink, cls: 'plain' })
    + T(x + (w - 16) / 2 + 2, y + h / 2 + 10, 'đồng', { size: 9.5, fill: ink, weight: 700, cls: 'plain' }), style);
}
function money(spec) {
  const W = 360;
  if (spec.items) {
    const H = 128;
    const { items, pay } = spec;
    const total = items.reduce((a, [, p]) => a + p, 0), change = pay - total;
    const s = stepper(`Trả tiền và nhận tiền thừa`, W, H, (s) => {
      let out = '';
      items.forEach(([name, p], i) => {
        const x = 14 + i * 116;
        out += G(s.c(`it${i}`), R(x, 8, 106, 56, { fill: '#FFF7ED', stroke: '#FDBA74', rx: 10 }) + T(x + 53, 27, name, { size: 14, fill: C.ink })
          + T(x + 53, 48, `${f3(p)} đồng`, { size: 13, fill: '#C2410C' }), delay(i, 0.15));
      });
      out += T(W - 12, 36, s.has('total') ? `= ${f3(total)} đồng` : '', { size: 14, fill: C.ink, anchor: 'end', cls: s.c('total') });
      out += G(s.c('pay'), T(14, 98, 'Đưa:', { size: 14, fill: C.ink, anchor: 'start' }) + note(pay, 60, 76));
      out += G(s.c('change'), T(170, 98, 'Trả lại:', { size: 14, fill: C.ink, anchor: 'start' }) + note(change, 230, 76, { cls: 'is-move', style: '--dx:-120px' }));
      return out;
    });
    s.show(items.map((_, i) => `it${i}`)).snap(`Mua ${items.map(([n, p]) => `${n.toLowerCase()} hết ${f3(p)} đồng`).join(', ')}.`);
    if (items.length > 1) {
      s.snap(`Phải trả tất cả bao nhiêu tiền? ${items.map(([, p]) => f3(p)).join(' + ')} = ?`, { ask: numAsk(total, { near: [10000, -10000, 1000], fmtFn: (v) => `${f3(v)} đồng` }) });
      s.show('total').snap(`Phải trả: ${items.map(([, p]) => f3(p)).join(' + ')} = <b>${f3(total)} đồng</b>.`);
    }
    s.show('pay').snap(`Đưa cho cô bán hàng tờ <b>${f3(pay)} đồng</b>. Muốn biết được trả lại bao nhiêu, lấy số tiền đưa trừ đi số tiền phải trả.`);
    s.snap(`${f3(pay)} − ${f3(total)} = ?`, { ask: numAsk(change, { near: [10000, -1000, 1000], fmtFn: (v) => `${f3(v)} đồng` }) });
    return s.show('change').snap(`Cô bán hàng trả lại <b>${f3(change)} đồng</b>.`, { result: `${f3(pay)} − ${f3(total)} = ${f3(change)} (đồng)` }).done();
  }
  const notes = [...spec.notes].sort((a, b) => b - a);
  const total = notes.reduce((a, b) => a + b, 0);
  const nw = 100, nh = 50, H = 118;
  const step = Math.min(nw + 10, (W - 12 - nw) / Math.max(1, notes.length - 1));
  const x0 = (W - (step * (notes.length - 1) + nw)) / 2;
  const s = stepper('Đếm tiền', W, H, (s) => {
    let out = '';
    notes.forEach((v, i) => {
      const x = x0 + i * step, y = 8 + (i % 2) * 12;
      out += note(v, x, y, { w: nw, h: nh, cls: s.c(`n${i}`) });
      out += T(x + nw / 2, 96, i ? `+ ${f3(v)}` : f3(v), { size: 14, fill: C.ink, cls: s.c(`n${i}`) });
    });
    return out;
  });
  s.snap('Đếm tiền: xếp các tờ tiền từ tờ có mệnh giá <b>lớn</b> đến tờ <b>bé</b>, rồi cộng dần.');
  let run = 0;
  notes.forEach((v, i) => {
    run += v;
    s.show(`n${i}`);
    if (i === notes.length - 1 && i > 0) s.snap(`Thêm tờ ${f3(v)} đồng. Tất cả là bao nhiêu tiền?`, { ask: numAsk(run, { near: [v, -v, 1000], fmtFn: (x) => `${f3(x)} đồng` }) });
    s.snap(i ? `Thêm tờ <b>${f3(v)} đồng</b>: được ${f3(run)} đồng.` : `Tờ thứ nhất: <b>${f3(v)} đồng</b>.`, { result: `${f3(run)} đồng` });
  });
  return s.snap(`Có tất cả <b>${f3(total)} đồng</b>.`, { result: `${f3(total)} đồng` }).done();
}

// ── Bài 73: kiểm đếm, bảng số liệu ───────────────────────────────────────────
function tally(n, x, y, { cls = '', style = '' } = {}) {
  let out = '';
  for (let g = 0; g * 5 < n; g++) {
    const k = Math.min(5, n - g * 5), gx = x + (g % 2) * 30, gy = y + Math.floor(g / 2) * 24;
    for (let i = 0; i < Math.min(4, k); i++) out += L(gx + i * 6, gy, gx + i * 6, gy + 18, { stroke: C.ink, sw: 2.2 });
    if (k === 5) out += L(gx - 3, gy + 15, gx + 21, gy + 3, { stroke: C.red, sw: 2.2 });
  }
  return G(cls, out, style);
}
function table(spec) {
  const { items, what = 'bạn', head = 'Môn học', rowName = 'Số bạn' } = spec;
  const n = items.length, W = 360, H = 196, lw = 92, cw = (W - 12 - lw) / n, x0 = 6;
  const max = items.reduce((a, b) => (b[1] > a[1] ? b : a));
  const min = items.reduce((a, b) => (b[1] < a[1] ? b : a));
  const s = stepper('Bảng số liệu', W, H, (s) => {
    let out = T(x0, 16, 'Kiểm đếm:', { size: 13, fill: C.soft, anchor: 'start', weight: 700 });
    items.forEach(([name, v], i) => {
      const x = x0 + lw + i * cw;
      const hot = s.v.hot === i;
      out += R(x + 2, 26, cw - 4, 76, { fill: hot ? '#FFF7ED' : '#F8FAFC', stroke: hot ? C.orange : C.line, sw: hot ? 2 : 1, rx: 8 });
      out += T(x + cw / 2, 40, name, { size: 12.5, fill: C.ink });
      out += tally(v, x + cw / 2 - (v > 5 ? 27 : 9), 52, { cls: s.c('tally') });
    });
    // bảng hai hàng như sách
    const ty = 120, rh = 34;
    out += G(s.c('table'), R(x0, ty, W - 12, rh * 2, { fill: '#fff', stroke: C.ink, sw: 1.5, rx: 0 })
      + L(x0, ty + rh, W - 6, ty + rh, { stroke: C.ink, sw: 1.2 })
      + R(x0, ty, lw, rh * 2, { fill: '#E0F2FE', stroke: C.ink, sw: 1.2, rx: 0 })
      + T(x0 + lw / 2, ty + rh / 2, head, { size: 11.5, fill: C.ink })
      + T(x0 + lw / 2, ty + rh * 1.5, rowName, { size: 12.5, fill: C.ink })
      + items.map(([name], i) => L(x0 + lw + i * cw, ty, x0 + lw + i * cw, ty + rh * 2, { stroke: C.ink, sw: 1.2 })
        + T(x0 + lw + i * cw + cw / 2, ty + rh / 2, name, { size: 12.5, fill: C.ink })).join(''));
    items.forEach(([, v], i) => { out += T(x0 + lw + i * cw + cw / 2, ty + rh * 1.5, v, { size: 18, fill: C.blue, cls: s.c(`v${i}`) }); });
    return out;
  });
  s.show('tally').snap(`Mỗi khi có một ${what} chọn, ta vạch <b>một vạch</b>. Vạch thứ năm gạch chéo qua bốn vạch trước, thành một nhóm 5 cho dễ đếm.`);
  s.show('table').snap(`Ghi kết quả vào <b>bảng số liệu</b>: hàng trên ghi tên, hàng dưới ghi số ${what}.`);
  let asked = false;
  items.forEach(([name, v], i) => {
    s.v.hot = i;
    if (!asked && v > 5) {
      asked = true;
      s.snap(`${name}: đếm theo nhóm 5 rồi đếm thêm. Có mấy ${what}?`, { ask: numAsk(v, { near: [-1, 1, 5] }) });
    }
    s.show(`v${i}`).snap(`${name}: <b>${v}</b> ${what}.`);
  });
  s.v.hot = null;
  const opts = items.map(([nm]) => nm);
  s.snap(`Nhìn bảng: ${head.toLowerCase()} nào có nhiều ${what} chọn nhất?`, { ask: { options: opts, answer: opts.indexOf(max[0]), ok: `Đúng rồi! ${max[0]} có ${max[1]} ${what}, nhiều nhất.` } });
  return s.snap(`${max[0]} nhiều nhất (${max[1]}), ${min[0]} ít nhất (${min[1]}). ${max[0]} nhiều hơn ${min[0]}: ${max[1]} − ${min[1]} = <b>${max[1] - min[1]}</b> ${what}.`, { result: `${max[1]} − ${min[1]} = ${max[1] - min[1]}` }).done();
}

// ── Bài 74: khả năng xảy ra ──────────────────────────────────────────────────
const BALL = { red: ['#EF4444', '#B91C1C', 'đỏ'], yellow: ['#FACC15', '#A16207', 'vàng'] };
function chance(spec) {
  const want = spec.want || 'red', other = want === 'red' ? 'yellow' : 'red';
  const boxes = [['red', 'red', 'red', 'red'], ['red', 'yellow', 'red', 'yellow'], ['yellow', 'yellow', 'yellow', 'yellow']];
  const W = 360, H = 182, bw = 104;
  const word = (b) => (b.every((c) => c === want) ? 'chắc chắn' : b.some((c) => c === want) ? 'có thể' : 'không thể');
  const color = { 'chắc chắn': C.green, 'có thể': C.yellow, 'không thể': C.red };
  const s = stepper(`Lấy được bi ${BALL[want][2]}?`, W, H, (s) => {
    let out = '';
    boxes.forEach((b, i) => {
      const x = 8 + i * (bw + 14), hot = s.v.hot === i;
      out += R(x, 34, bw, 96, { fill: hot ? '#FFF7ED' : '#F8FAFC', stroke: hot ? C.orange : '#94A3B8', sw: hot ? 2.5 : 1.5, rx: 10 });
      out += P(`M${x - 4} 40 L${x + bw + 4} 40`, { stroke: '#94A3B8', sw: 4 });
      out += T(x + bw / 2, 18, `Hộp ${i + 1}`, { size: 15, fill: C.ink });
      b.forEach((c, k) => {
        const bx = x + 28 + (k % 2) * 48, by = 70 + Math.floor(k / 2) * 38;
        out += O(bx, by, 15, { fill: BALL[c][0], stroke: BALL[c][1], sw: 1.5 }) + O(bx - 5, by - 5, 4, { fill: 'rgba(255,255,255,0.6)' });
      });
      const w = word(b);
      out += G(s.c(`w${i}`), R(x + 4, 144, bw - 8, 32, { fill: '#fff', stroke: color[w], sw: 2, rx: 16 }) + T(x + bw / 2, 160, w, { size: 15, fill: color[w] }));
    });
    return out;
  });
  const opts = ['chắc chắn', 'có thể', 'không thể'];
  const desc = (b) => (b.every((c) => c === b[0]) ? `chỉ có bi ${BALL[b[0]][2]}` : `có cả bi ${BALL.red[2]} và bi ${BALL.yellow[2]}`);
  s.snap(`Không nhìn vào hộp, lấy ra 1 viên bi. Có lấy được bi <b>${BALL[want][2]}</b> không? Ta dùng các từ: <b>chắc chắn</b>, <b>có thể</b>, <b>không thể</b>.`);
  boxes.forEach((b, i) => {
    s.v.hot = i;
    const w = word(b);
    s.snap(`Hộp ${i + 1} ${desc(b)}. Lấy được bi ${BALL[want][2]} là …`, { ask: { options: opts, answer: opts.indexOf(w), ok: `Đúng rồi! <b>${w[0].toUpperCase() + w.slice(1)}</b> lấy được bi ${BALL[want][2]}.` } });
    s.show(`w${i}`).snap(w === 'chắc chắn' ? `Hộp ${i + 1}: mọi viên đều ${BALL[want][2]}, nên <b>chắc chắn</b> lấy được bi ${BALL[want][2]}.`
      : w === 'có thể' ? `Hộp ${i + 1}: có thể lấy được bi ${BALL[want][2]}, cũng có thể lấy được bi ${BALL[other][2]}. Ta nói <b>có thể</b>.`
        : `Hộp ${i + 1}: không có viên bi ${BALL[want][2]} nào, nên <b>không thể</b> lấy được bi ${BALL[want][2]}.`);
  });
  s.v.hot = null;
  return s.snap('Khi nói về khả năng xảy ra của một sự kiện, ta dùng: <b>chắc chắn</b>, <b>có thể</b> hoặc <b>không thể</b>.', { result: 'chắc chắn · có thể · không thể' }).done();
}

const CSS = `
  .g3b-lines { display: flex; flex-direction: column; align-items: flex-start; gap: 0.35em; font: 800 clamp(1.05rem, 5.2cqi, 1.75rem)/1.35 Quicksand, sans-serif; color: #1E293B; }
  .g3b-line { padding: 0.1em 0.5em; border-radius: 0.5em; }
  .g3b-line.is-nham { background: #FEF3C7; color: #92400E; }
`;

/** Các loại ví dụ của tệp này (trang thử dựng mọi nút Thử với). */
export const G3B_KINDS = {
  'g3b-place': place,
  'g3b-compare': boardKind('compare'),
  'g3b-order': boardKind('order'),
  'g3b-add': boardKind('add'),
  'g3b-sub': boardKind('sub'),
  'g3b-mul': boardKind('mul'),
  'g3b-div': boardKind('div'),
  'g3b-mental': mental,
  'g3b-roman': roman,
  'g3b-round': round,
  'g3b-perim': perim,
  'g3b-area': area,
  'g3b-clock': clock,
  'g3b-months': months,
  'g3b-cal': cal,
  'g3b-money': money,
  'g3b-table': table,
  'g3b-chance': chance,
};
registerDemos(G3B_KINDS, CSS, 'g3b');
