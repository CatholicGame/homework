/**
 * Ví dụ "xem từng bước" riêng của 📘 Kiến thức Toán 2 Tập Một (Bài 1–36), đăng kí bằng registerDemos
 * (xem grade4Textbook/knowledgeDemo.js). Mọi bước của một ví dụ dùng cùng một viewBox, phần chưa tới thì ẩn
 * (kd-ghost), nên hình không nhảy giữa các bước.
 *
 *   { kind: 'g2a-tens', n: 45 }                         Bài 1: bó một chục và que lẻ, đọc số, viết số thành tổng
 *   { kind: 'g2a-ray', from: 40, n: 47 }                Bài 2: tia số, số liền trước, số liền sau
 *   { kind: 'g2a-parts', op: '+' | '-', a, b }          Bài 3: số hạng, tổng / số bị trừ, số trừ, hiệu
 *   { kind: 'g2a-story', mode, a, b, icon, names, unit, short, event, question, say }
 *        mode 'diff' (Bài 4 hơn kém), 'add' | 'take' (Bài 9 thêm, bớt), 'more' | 'less' (Bài 13 nhiều hơn, ít hơn)
 *   { kind: 'g2a-ten', op: '+' | '-', a, b }            Bài 7, 11: tách số để làm tròn 10 trên hai khung mười ô
 *   { kind: 'g2a-table', op: '+' | '-', n }             Bài 8, 12: một cột của bảng cộng, bảng trừ (qua 10)
 *   { kind: 'g2a-scale', mode: 'compare', left, right, heavier } | { mode: 'weigh', name, weights }   Bài 15
 *   { kind: 'g2a-jug', l: 4 }                           Bài 16: rót hết can vào các ca 1 lít
 *   { kind: 'g2a-geo', mode: 'lines' | 'polyline' | 'quad' | 'draw', lens?, len? }   Bài 25, 26, 27
 *   { kind: 'g2a-clock', h: 8, m: 0 | 15 | 30, pm }     Bài 29: kim giờ, kim phút
 *   { kind: 'g2a-day', h: 15 }                          Bài 29: một ngày có 24 giờ, các buổi
 *   { kind: 'g2a-cal', month, first, days, day }        Bài 30: tờ lịch tháng (first: cột của ngày 1, 0 = Thứ Hai)
 */

import { frames, svg, C, numAsk } from '../grade4Textbook/demos/util.js';
import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { docSo } from '../../engine/numberWords.js';

// ── Dụng cụ vẽ ───────────────────────────────────────────────────────────────
const r1 = (v) => Math.round(v * 10) / 10;
const attrs = (o) => Object.entries(o).filter(([, v]) => v !== '' && v != null).map(([k, v]) => ` ${k}="${v}"`).join('');
const T = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '', style = '' } = {}) =>
  `<text${attrs({ x: r1(x), y: r1(y), 'font-size': size, fill, 'font-weight': weight, 'text-anchor': anchor, 'dominant-baseline': 'middle', class: cls, style })}>${t}</text>`;
const rect = (x, y, w, h, { fill = 'none', stroke = 'none', sw = 1.5, rx = 3, cls = '', style = '', dash = '', op = '' } = {}) =>
  `<rect${attrs({ x: r1(x), y: r1(y), width: r1(w), height: r1(h), rx, fill, stroke, 'stroke-width': sw, 'stroke-dasharray': dash, opacity: op, class: cls, style })}/>`;
const ln = (x1, y1, x2, y2, { stroke = C.ink, sw = 2, dash = '', cls = '', style = '', op = '' } = {}) =>
  `<line${attrs({ x1: r1(x1), y1: r1(y1), x2: r1(x2), y2: r1(y2), stroke, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-dasharray': dash, opacity: op, class: cls, style })}/>`;
const path = (d, { stroke = C.ink, sw = 2, fill = 'none', cls = '', style = '', dash = '' } = {}) =>
  `<path${attrs({ d, fill, stroke, 'stroke-width': sw, 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-dasharray': dash, class: cls, style })}/>`;
const circ = (x, y, r, { fill = 'none', stroke = 'none', sw = 1.5, cls = '', style = '', dash = '', op = '' } = {}) =>
  `<circle${attrs({ cx: r1(x), cy: r1(y), r, fill, stroke, 'stroke-width': sw, 'stroke-dasharray': dash, opacity: op, class: cls, style })}/>`;
const g = (cls, body, style = '') => `<g${attrs({ class: cls, style })}>${body}</g>`;
const delay = (i, step = 0.1) => (i ? `animation-delay:${(i * step).toFixed(2)}s` : '');
/** Hình vẽ biểu tượng (emoji): không có viền trắng như chữ. */
const emo = (x, y, e, size, cls = '', style = '') => T(x, y + size * 0.06, e, { size, cls: `plain ${cls}`.trim(), style });
const range = (a, b) => Array.from({ length: Math.max(0, b - a + 1) }, (_, i) => a + i);
const slow = () => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const lit = '<i class="g2a-l">l</i>';
const cap1 = (t) => t.charAt(0).toUpperCase() + t.slice(1);

/**
 * Bộ bước: s.show(khoá…) hiện phần mới (có hiệu ứng ở bước này), s.hide(khoá…) cất đi, s.c(khoá, hiệu ứng) cho class,
 * s.snap(lời, { result, ask }) chụp một bước. wrap(svgHtml, s) thêm phần HTML (vd. lời giải) quanh hình.
 */
function stepper(title, W, H, draw, wrap) {
  const f = frames(title), on = new Set();
  let fresh = new Set();
  const s = {
    v: {},
    has: (k) => on.has(k),
    isNew: (k) => fresh.has(k),
    show(...k) { k.flat().forEach((x) => { on.add(x); fresh.add(x); }); return s; },
    hide(...k) { k.flat().forEach((x) => { on.delete(x); fresh.delete(x); }); return s; },
    c: (k, anim = 'is-new') => (!on.has(k) ? 'kd-ghost' : fresh.has(k) ? anim : ''),
    snap(caption, extra = {}) {
      const pic = svg(W, H, draw(s));
      f.add(wrap ? wrap(pic, s) : pic, caption, extra);
      fresh = new Set();
      if (s.after) s.after();
      return s;
    },
    done: () => f.done(),
  };
  return s;
}

// ── Bài 1: chục và đơn vị ────────────────────────────────────────────────────
function tens({ n }) {
  const t = Math.floor(n / 10), u = n % 10;
  const BW = 24, BG = 9, OW = 8, OG = 8, GAP = 28, Y0 = 12, SH = 88;
  const tw = t * BW + (t - 1) * BG, uw = u ? u * OW + (u - 1) * OG : 64;
  const x0 = (360 - (tw + GAP + uw)) / 2, xu = x0 + tw + GAP;
  const bundle = (x, i) => {
    let b = '';
    for (let k = 0; k < 5; k++) b += rect(x + k * 4.4, Y0, 4.8, SH, { fill: '#FCD34D', stroke: '#D97706', sw: 1, rx: 2 });
    b += rect(x - 1.5, Y0 + SH / 2 - 5, BW + 3, 10, { fill: '#EF4444', rx: 3 });
    return g('', b, delay(i, 0.06));
  };
  const s = stepper(`Số ${n}`, 360, 196, (s) => {
    let o = '';
    if (s.has('hiT')) o += rect(x0 - 7, Y0 - 6, tw + 14, SH + 12, { fill: C.blueL, rx: 8, cls: s.c('hiT', 'is-fade') });
    for (let i = 0; i < t; i++) o += bundle(x0 + i * (BW + BG), i);
    for (let i = 0; i < u; i++) o += rect(xu + i * (OW + OG), Y0, OW, SH, { fill: '#FCD34D', stroke: '#D97706', sw: 1.2, rx: 3 });
    o += T(x0 + tw / 2, Y0 + SH + 20, `${t} chục`, { size: 18, fill: C.blue, cls: s.c('lt') });
    o += T(xu + uw / 2, Y0 + SH + 20, `${u} đơn vị`, { size: 18, fill: C.orange, cls: s.c('lu') });
    const nx = u ? 168 : 180;
    o += `<text x="${nx}" y="160" font-size="38" font-weight="800" text-anchor="${u ? 'end' : 'middle'}" dominant-baseline="middle" class="${s.c('num')}"><tspan fill="${C.blue}">${t}</tspan><tspan fill="${C.orange}">${u}</tspan></text>`;
    if (u) o += T(180, 161, `= ${t * 10} + ${u}`, { size: 28, anchor: 'start', fill: C.green, cls: s.c('sum') });
    return o;
  });
  s.snap(`Có bao nhiêu que tính? Mỗi bó có <b>10 que</b>, là <b>1 chục</b>.`);
  s.show('hiT').snap('Đếm số bó một chục. Có mấy bó?', { ask: numAsk(t, { near: [1, -1, 2], ok: `Đúng rồi! ${t} bó là <b>${t} chục</b>.` }) });
  s.show('lt').snap(`${t} bó một chục: <b>${t} chục</b>.`);
  s.hide('hiT').show('lu').snap(u ? `Còn ${u} que lẻ: <b>${u} đơn vị</b>.` : 'Không còn que lẻ nào: <b>0 đơn vị</b>.');
  s.show('num').snap(`${t} chục và ${u} đơn vị viết là <b>${n}</b>, đọc là <b>${docSo(n)}</b>.`);
  if (u) {
    s.snap(`${n} = ${t * 10} + ?`, { ask: numAsk(u, { near: [1, -1, 2], ok: `Đúng rồi! ${n} gồm ${t * 10} và ${u}.` }) });
    s.show('sum').snap(`Viết ${n} thành tổng của số chục và số đơn vị: <b>${n} = ${t * 10} + ${u}</b>.`, { result: `${n} = ${t * 10} + ${u}` });
  } else {
    s.snap(`${n} là <b>số tròn chục</b>: chữ số hàng đơn vị là 0.`, { result: `${n} gồm ${t} chục và 0 đơn vị` });
  }
  return s.done();
}

// ── Bài 2: tia số, số liền trước, số liền sau ───────────────────────────────
function ray({ from, n }) {
  const y = 70, X = (v) => 26 + (v - from) * 30.8;
  const s = stepper(`Số liền trước, số liền sau của ${n}`, 360, 116, (s) => {
    let o = ln(10, y, 350, y, { stroke: C.ink, sw: 2.5 }) + path(`M342 ${y - 6}L351 ${y}L342 ${y + 6}`, { stroke: C.ink, sw: 2.5 });
    for (let v = from; v <= from + 10; v++) {
      o += ln(X(v), y - 7, X(v), y + 7, { stroke: C.ink, sw: 2 });
      o += T(X(v), y + 24, v, { size: 15, fill: v === n ? C.orange : C.ink });
    }
    o += circ(X(n), y + 24, 15, { stroke: C.orange, sw: 2.5, cls: s.c('cn') });
    const arc = (b, col, label, key) => {
      const x1 = X(n), x2 = X(b), m = (x1 + x2) / 2, d = b > n ? 1 : -1;
      return g(s.c(key, 'is-fade'),
        path(`M${x1} ${y - 9}Q${m} ${y - 50} ${x2} ${y - 9}`, { stroke: col, sw: 2.5 })
        + path(`M${x2 - 8 * d} ${y - 16}L${x2} ${y - 9}L${x2 - 10 * d} ${y - 6}`, { stroke: col, sw: 2.5 })
        + T(m, y - 40, label, { size: 15, fill: col }));
    };
    o += arc(n + 1, C.green, '+1', 'aA') + circ(X(n + 1), y + 24, 15, { stroke: C.green, sw: 2.5, cls: s.c('aA') });
    o += arc(n - 1, C.violet, '−1', 'aB') + circ(X(n - 1), y + 24, 15, { stroke: C.violet, sw: 2.5, cls: s.c('aB') });
    return o;
  });
  s.snap(`Trên tia số, các số xếp theo thứ tự <b>từ bé đến lớn</b>, từ trái sang phải. Hai vạch liền nhau hơn kém nhau 1.`);
  s.show('cn').snap(`Số liền sau của <b>${n}</b> là số nào?`, { ask: numAsk(n + 1, { near: [-2, 1], ok: `Đúng rồi! ${n} + 1 = ${n + 1}.` }) });
  s.show('aA').snap(`<b>${n + 1}</b> là số liền sau của ${n}. Số liền sau ở ngay bên phải, hơn ${n} là 1.`);
  s.snap(`Số liền trước của <b>${n}</b> là số nào?`, { ask: numAsk(n - 1, { near: [2, -1], ok: `Đúng rồi! ${n} − 1 = ${n - 1}.` }) });
  s.show('aB').snap(`<b>${n - 1}</b> là số liền trước của ${n}. Số liền trước ở ngay bên trái, kém ${n} là 1.`);
  s.snap(`Số liền trước bé hơn, số liền sau lớn hơn: <b>${n - 1} &lt; ${n} &lt; ${n + 1}</b>.`, { result: `${n - 1} &lt; ${n} &lt; ${n + 1}` });
  return s.done();
}

// ── Bài 3: thành phần của phép cộng, phép trừ ───────────────────────────────
function parts({ op, a, b }) {
  const add = op === '+';
  const c = add ? a + b : a - b, sign = add ? '+' : '−';
  const names = add ? ['Số hạng', 'Số hạng', 'Tổng'] : ['Số bị trừ', 'Số trừ', 'Hiệu'];
  const tone = add ? ['t0', 't0', 't2'] : ['t0', 't1', 't2'];
  const f = frames(`${a} ${sign} ${b} = ${c}`);
  const shown = new Set();
  let fresh = new Set();
  const html = () => {
    const num = (v, i) => `<span class="g2a-n${shown.has(i) ? ` ${tone[i]}` : ''}">${v}</span>`;
    const lab = (i, col) => `<span class="g2a-lb ${tone[i]} ${shown.has(i) ? (fresh.has(i) ? 'is-new' : '') : 'kd-ghost'}" style="grid-column:${col}">${names[i]}</span>`;
    return `<div class="g2a-eq">${num(a, 0)}<span>${sign}</span>${num(b, 1)}<span>=</span>${num(c, 2)}${lab(0, 1)}${lab(1, 3)}${lab(2, 5)}</div>`;
  };
  const snap = (caption, extra) => { f.add(html(), caption, extra); fresh = new Set(); };
  const show = (...i) => i.forEach((k) => { shown.add(k); fresh.add(k); });
  snap(`Phép ${add ? 'cộng' : 'trừ'}: <b>${a} ${sign} ${b} = ${c}</b>. Mỗi số trong phép tính có một tên gọi.`);
  if (add) {
    show(0, 1);
    snap(`${a} và ${b} là các <b>số hạng</b>.`);
    snap(`${c} gọi là gì?`, { ask: { options: ['Số hạng', 'Tổng'], answer: 1, ok: `Đúng rồi! ${c} là <b>tổng</b>.` } });
    show(2);
    snap(`${c} là <b>tổng</b>. ${a} + ${b} cũng gọi là tổng.`, { result: 'Số hạng + Số hạng = Tổng' });
  } else {
    show(0);
    snap(`${a} là <b>số bị trừ</b> (số ta lấy đi bớt).`);
    show(1);
    snap(`${b} là <b>số trừ</b> (số bị lấy đi).`);
    snap(`${c} gọi là gì?`, { ask: { options: names, answer: 2, ok: `Đúng rồi! ${c} là <b>hiệu</b>.` } });
    show(2);
    snap(`${c} là <b>hiệu</b>. ${a} − ${b} cũng gọi là hiệu.`, { result: 'Số bị trừ − Số trừ = Hiệu' });
  }
  return f.done();
}

// ── Bài 4, 9, 13: bài toán có lời văn trên hàng đồ vật ──────────────────────
const OPS = { add: '+', more: '+', take: '−', less: '−', diff: '−' };
const WHY = {
  add: 'Đúng rồi! Có thêm thì làm <b>phép cộng</b>.',
  take: 'Đúng rồi! Bớt đi thì làm <b>phép trừ</b>.',
  more: 'Đúng rồi! Nhiều hơn thì làm <b>phép cộng</b>.',
  less: 'Đúng rồi! Ít hơn thì làm <b>phép trừ</b>.',
  diff: 'Đúng rồi! Lấy số lớn trừ số bé.',
};
function story(spec) {
  const { mode, a, b, icon = '🔵', names = ['', ''], unit = '', short = unit, say = '', event = '', question = '' } = spec;
  const sign = OPS[mode], c = sign === '+' ? a + b : a - b, ex = `${a} ${sign} ${b}`;
  const two = mode === 'diff' || mode === 'more' || mode === 'less';
  const N = mode === 'add' || mode === 'more' ? a + b : a;
  const left = names[0] ? 84 : 10, sp = Math.min(two ? 30 : 34, (350 - left) / N), size = Math.min(two ? 25 : 30, sp * 0.95);
  const x0 = names[0] ? left : (360 - N * sp) / 2;
  const X = (i) => x0 + sp * i + sp / 2;
  const Y1 = two ? 34 : 36, Y2 = 84;
  const wrap = say ? (pic, s) => `<div class="g2a-story">${pic}<div class="g2a-sol">
      <div class="h ${s.c('sol')}">Bài giải</div>
      <div class="${s.c('sol')}">${say}</div>
      <div class="${s.c('calc')}">${ex} = ${c} (${short})</div>
      <div class="${s.c('ans')}">Đáp số: ${c} ${unit}.</div></div></div>` : null;
  const s = stepper(mode === 'diff' ? `${names[0]} và ${names[1].toLowerCase()}` : [spec.intro, event].filter(Boolean).join(' ') || ex, 360, two ? 128 : 66, (s) => {
    let o = '';
    if (names[0]) o += T(76, Y1, names[0], { size: 14, anchor: 'end', fill: '#475569' });
    if (two && names[1]) o += T(76, Y2, names[1], { size: 14, anchor: 'end', fill: '#475569' });
    // hàng trên
    for (let i = 0; i < a; i++) {
      const gone = mode === 'take' && i >= a - b && s.has('go');
      if (gone) {
        o += g(s.c('go', 'g2a-away'), emo(X(i), Y1, icon, size), delay(i - (a - b), 0.08));
        o += g(s.c('go'), ln(X(i) - 9, Y1 - 9, X(i) + 9, Y1 + 9, { stroke: C.red, sw: 2.5 }) + ln(X(i) + 9, Y1 - 9, X(i) - 9, Y1 + 9, { stroke: C.red, sw: 2.5 }), delay(i - (a - b), 0.08));
      } else o += emo(X(i), Y1, icon, size);
      if (mode === 'diff' && i >= b) o += rect(X(i) - sp / 2 + 1, Y1 - 15, sp - 2, 30, { stroke: C.orange, sw: 2, rx: 6, cls: s.c('ext', 'is-fade') });
    }
    if (mode === 'add') for (let j = 0; j < b; j++) o += circ(X(a + j), Y1, sp / 2 - 0.5, { fill: C.greenL, cls: s.c('b', 'is-fade') });
    if (mode === 'add') for (let j = 0; j < b; j++) o += emo(X(a + j), Y1, icon, size, s.c('b', 'is-move'), `--dx:${60 + j * 6}px;${delay(j, 0.08)}`);
    // hàng dưới
    if (mode === 'diff') {
      for (let i = 0; i < b; i++) o += emo(X(i), Y2, spec.icon2 || icon, size);
      for (let i = 0; i < b; i++) o += ln(X(i), Y1 + 13, X(i), Y2 - 13, { stroke: C.soft, sw: 1.6, dash: '3 3', cls: s.c('pair', 'is-fade'), style: delay(i, 0.06) });
      o += T((X(b) + X(a - 1)) / 2, Y2, `${c} ${short}`, { size: 17, fill: C.orange, cls: s.c('val') });
    }
    if (mode === 'more' || mode === 'less') {
      const k = mode === 'more' ? a : a - b;
      for (let i = 0; i < k; i++) o += emo(X(i), Y2, icon, size, s.c('eq'), delay(i, 0.05));
      for (let i = 0; i < k; i++) o += ln(X(i), Y1 + 13, X(i), Y2 - 13, { stroke: C.soft, sw: 1.6, dash: '3 3', cls: s.c('eq', 'is-fade'), style: delay(i, 0.05) });
      for (let j = 0; j < b; j++) {
        const x = X(k + j);
        o += mode === 'more' ? emo(x, Y2, icon, size, s.c('ext'), delay(j, 0.08)) : circ(x, Y2, size / 2 - 1, { stroke: C.red, sw: 1.8, dash: '3 3', cls: s.c('ext', 'is-fade'), style: delay(j, 0.08) });
      }
      const x1 = X(k) - sp / 2 + 2, x2 = X(k + b - 1) + sp / 2 - 2, by = Y2 + 18, m = (x1 + x2) / 2;
      o += g(s.c('ext', 'is-fade'), path(`M${x1} ${by}Q${x1} ${by + 6} ${x1 + 6} ${by + 6}L${m - 5} ${by + 6}L${m} ${by + 11}L${m + 5} ${by + 6}L${x2 - 6} ${by + 6}Q${x2} ${by + 6} ${x2} ${by}`, { stroke: mode === 'more' ? C.green : C.red, sw: 2 })
        + T(m, by + 22, `${mode === 'more' ? 'nhiều hơn' : 'ít hơn'} ${b}`, { size: 14, fill: mode === 'more' ? C.green : C.red }));
    }
    return o;
  }, wrap);
  const askOp = () => s.snap(question || 'Em làm phép tính nào?', { ask: { options: [`${a} + ${b}`, `${a} − ${b}`], answer: sign === '+' ? 0 : 1, ok: WHY[mode] } });
  if (mode === 'diff') {
    s.snap(`${names[0]} có ${a} ${short}, ${names[1].toLowerCase()} có ${b} ${short}.`);
    s.show('pair').snap(`Ghép từng cặp một: mỗi ${short} ở hàng trên với một ${short} ở hàng dưới.`);
    s.show('ext').snap(`Hàng trên thừa ra mấy ${short}?`, { ask: numAsk(c, { near: [1, -1, 2], ok: `Đúng rồi! Thừa ra ${c} ${short}.` }) });
    s.show('val').snap(`Số thừa ra chính là <b>${a} − ${b} = ${c}</b>: lấy số lớn trừ số bé.`);
    s.snap(`${names[0]} <b>hơn</b> ${names[1].toLowerCase()} ${c} ${short}; ${names[1].toLowerCase()} <b>kém</b> ${names[0].toLowerCase()} ${c} ${short}.`, { result: `${a} − ${b} = ${c}` });
    return s.done();
  }
  s.snap(spec.intro || `Có ${a} ${unit}.`);
  if (mode === 'add') s.show('b').snap(event);
  if (mode === 'take') s.show('go').snap(event);
  if (mode === 'more') {
    s.show('eq').snap(`${names[1]} có phần bằng ${names[0]}: ${a} ${short}.`);
    s.show('ext').snap(event);
  }
  if (mode === 'less') s.show('eq', 'ext').snap(event);
  askOp();
  s.show('sol').snap(`Viết câu lời giải: <b>${say}</b>`);
  s.snap(`${ex} = ?`, { ask: numAsk(c, { near: [1, -1, 10], ok: `Đúng rồi! ${ex} = ${c}.` }) });
  s.show('calc').snap(`Viết phép tính, tên đơn vị để trong ngoặc: <b>${ex} = ${c} (${short})</b>.`);
  s.show('ans').snap(`Viết đáp số: <b>${c} ${unit}</b>.`, { result: `${ex} = ${c}` });
  return s.done();
}

// ── Bài 7, 11: làm tròn 10 trên hai khung mười ô ─────────────────────────────
function ten({ op, a, b }) {
  const add = op === '+';
  const FX = [30, 200], FY = 12, CS = 26;
  const pos = (f, i) => ({ x: FX[f] + 13 + (i % 5) * CS, y: FY + 13 + Math.floor(i / 5) * CS });
  const res = add ? a + b : a - b;
  const need = 10 - a, rest = b - need, u = a - 10;
  const lines = add
    ? [`• Tách: ${b} = ${need} + ${rest}`, `• ${a} + ${need} = 10`, `• 10 + ${rest} = ${res}`]
    : [`• Tách: ${a} = 10 + ${u}`, `• 10 − ${b} = ${10 - b}`, `• ${10 - b} + ${u} = ${res}`];
  const s = stepper(`${a} ${add ? '+' : '−'} ${b}`, 360, 160, (s) => {
    let o = '';
    FX.forEach((x) => {
      o += rect(x, FY, 130, 52, { fill: '#fff', stroke: '#94A3B8', sw: 2, rx: 4 });
      for (let k = 1; k < 5; k++) o += ln(x + k * CS, FY, x + k * CS, FY + 52, { stroke: C.line, sw: 1.5 });
      o += ln(x, FY + 26, x + 130, FY + 26, { stroke: C.line, sw: 1.5 });
    });
    s.v.dots.forEach((d, k) => {
      const p = pos(d.f, d.i);
      if (d.from) {
        const q = pos(d.from.f, d.from.i);
        o += circ(p.x, p.y, 10, { fill: d.col, cls: 'is-move', style: `--dx:${q.x - p.x}px;--dy:${q.y - p.y}px;${delay(k % 3, 0.15)}` });
      } else if (d.x) {
        o += circ(p.x, p.y, 10, { fill: C.redL });
        o += g(d.xNew ? 'is-new' : '', ln(p.x - 8, p.y - 8, p.x + 8, p.y + 8, { stroke: C.ink, sw: 2.5 }) + ln(p.x + 8, p.y - 8, p.x - 8, p.y + 8, { stroke: C.ink, sw: 2.5 }), delay(k % 4, 0.12));
      } else o += circ(p.x, p.y, 10, { fill: d.col });
    });
    if (s.has('ten')) o += T(FX[0] + 65, FY + 64, '10', { size: 15, fill: C.green, cls: s.c('ten') });
    lines.forEach((t, i) => { o += T(70, 96 + i * 25, t, { size: 16, anchor: 'start', fill: i === 2 ? C.green : C.ink, cls: s.c(`l${i}`) }); });
    return o;
  });
  s.after = () => s.v.dots.forEach((d) => { d.from = null; d.xNew = false; });
  if (add) {
    s.v.dots = [...range(0, a - 1).map((i) => ({ f: 0, i, col: C.red })), ...range(0, b - 1).map((i) => ({ f: 1, i, col: C.blue }))];
    s.snap(`Tính <b>${a} + ${b}</b>. Khung trái có ${a} chấm đỏ, khung phải có ${b} chấm xanh.`);
    s.snap(`${a} cần thêm mấy để được 10 (đầy khung)?`, { ask: numAsk(need, { near: [1, -1, 2], ok: `Đúng rồi! ${a} + ${need} = 10.` }) });
    s.show('l0').snap(`Tách ${b} thành <b>${need}</b> và <b>${rest}</b>.`);
    s.v.dots.filter((d) => d.f === 1 && d.i >= rest).forEach((d, j) => { d.from = { f: 1, i: d.i }; d.f = 0; d.i = a + j; });
    s.show('l1', 'ten').snap(`Chuyển ${need} chấm xanh sang cho đầy khung: <b>${a} + ${need} = 10</b>.`);
    s.snap(`10 + ${rest} = ?`, { ask: numAsk(res, { near: [1, -1, 10], ok: `Đúng rồi! Mười với ${rest} là ${res}.` }) });
    s.show('l2').snap(`<b>10 + ${rest} = ${res}</b>. Vậy ${a} + ${b} = ${res}.`, { result: `${a} + ${b} = ${res}` });
  } else {
    s.v.dots = [...range(0, 9).map((i) => ({ f: 0, i, col: C.red })), ...range(0, u - 1).map((i) => ({ f: 1, i, col: C.red }))];
    s.snap(`Tính <b>${a} − ${b}</b>. ${a} gồm một khung đầy (10 chấm) và ${u} chấm.`);
    s.show('l0').snap(`Tách <b>${a} = 10 + ${u}</b>. Lấy ${b} chấm ở khung đầy đi trước.`);
    s.snap(`10 − ${b} = ?`, { ask: numAsk(10 - b, { near: [1, -1, 2], ok: `Đúng rồi! 10 − ${b} = ${10 - b}.` }) });
    s.v.dots.filter((d) => d.f === 0 && d.i >= 10 - b).forEach((d) => { d.x = true; d.xNew = true; });
    s.show('l1').snap(`Gạch đi ${b} chấm: khung trái còn <b>10 − ${b} = ${10 - b}</b> chấm.`);
    s.snap(`Gộp ${10 - b} chấm còn lại với ${u} chấm ở khung phải: ${10 - b} + ${u} = ?`, { ask: numAsk(res, { near: [1, -1, 2], ok: `Đúng rồi! ${10 - b} + ${u} = ${res}.` }) });
    s.show('l2').snap(`<b>${10 - b} + ${u} = ${res}</b>. Vậy ${a} − ${b} = ${res}.`, { result: `${a} − ${b} = ${res}` });
  }
  return s.done();
}

// ── Bài 8, 12: bảng cộng, bảng trừ (qua 10) ─────────────────────────────────
function table({ op, n }) {
  const add = op === '+';
  const ks = add ? range(11 - n, 9) : range(n - 9, 9);
  const rows = ks.map((k) => (add
    ? { e: `${n} + ${k}`, r: n + k, p: `${k} + ${n} = ${n + k}` }
    : { e: `${n} − ${k}`, r: n - k, p: `${n - k} + ${k} = ${n}` }));
  const f = frames(add ? `Bảng ${n} cộng với một số` : `Bảng ${n} trừ đi một số`);
  const html = ({ res = 0, resNew = false, part = false, partNew = false, hi = -1 }) => `<div class="g2a-tab">${rows.map((r, i) => `
      <span class="e${i === hi ? ' on' : ''}">${r.e} =</span>
      <span class="r${i < res ? '' : ' q'}${i < res && resNew ? ' is-new' : ''}"${resNew ? ` style="${delay(i, 0.08)}"` : ''}>${i < res ? r.r : '?'}</span>
      <span class="p ${part ? (partNew ? 'is-new' : '') : 'kd-ghost'}"${partNew ? ` style="${delay(i, 0.08)}"` : ''}>${r.p}</span>`).join('')}</div>`;
  const k0 = ks[0], r0 = rows[0].r;
  if (add) {
    f.add(html({}), `Bảng cộng của ${n}: ${n} + ${k0}, ${n} + ${k0 + 1}, …, ${n} + 9. Các tổng đều lớn hơn 10.`);
    f.add(html({ hi: 0 }), `${n} + ${k0} = ? (${n} cần thêm ${10 - n} để được 10)`, { ask: numAsk(r0, { near: [1, -1, 10], ok: `Đúng rồi! ${n} + ${10 - n} = 10, 10 + ${k0 - 10 + n} = ${r0}.` }) });
    f.add(html({ res: rows.length, resNew: true }), `Số hạng thứ hai thêm 1 thì tổng cũng thêm 1: ${rows.map((r) => r.r).join(', ')}.`);
    f.add(html({ res: rows.length, part: true, partNew: true }), `Đổi chỗ các số hạng thì tổng không thay đổi: ${k0} + ${n} = ${n} + ${k0} = ${r0}.`,
      { result: 'Thuộc bảng cộng để tính nhẩm nhanh' });
  } else {
    f.add(html({}), `Bảng trừ của ${n}: ${n} − ${k0}, ${n} − ${k0 + 1}, …, ${n} − 9. Các hiệu đều bé hơn 10.`);
    f.add(html({ hi: 0 }), `${n} − ${k0} = ? (Nhớ: ${k0} cộng mấy bằng ${n}?)`, { ask: numAsk(r0, { near: [1, -1, 2], ok: `Đúng rồi! ${r0} + ${k0} = ${n} nên ${n} − ${k0} = ${r0}.` }) });
    f.add(html({ res: rows.length, resNew: true }), `Số trừ thêm 1 thì hiệu bớt đi 1: ${rows.map((r) => r.r).join(', ')}.`);
    f.add(html({ res: rows.length, part: true, partNew: true }), 'Thử lại bằng bảng cộng: lấy hiệu cộng với số trừ thì được số bị trừ.',
      { result: 'Dựa vào bảng cộng để trừ nhẩm' });
  }
  return f.done();
}

// ── Bài 15: cân đĩa, ki-lô-gam ──────────────────────────────────────────────
function weight(x, kg, cls = '', style = '') {
  const w = 24 + kg * 2, h = 16 + kg * 2;
  return g(cls, path(`M${x - w / 2 + 4} ${-h}L${x + w / 2 - 4} ${-h}L${x + w / 2} 0L${x - w / 2} 0Z`, { fill: '#64748B', stroke: '#334155', sw: 1.5 })
    + rect(x - 4, -h - 5, 8, 6, { fill: '#64748B', stroke: '#334155', sw: 1.2, rx: 2 })
    + T(x, -h / 2, `${kg} kg`, { size: 9, fill: '#fff', cls: 'plain' }), style);
}
function bag(x, label, cls = '') {
  return g(cls, path(`M${x - 20} 0Q${x - 24} -22 ${x - 14} -36L${x - 8} -40L${x + 8} -40L${x + 14} -36Q${x + 24} -22 ${x + 20} 0Z`, { fill: '#FEF3C7', stroke: '#B45309', sw: 2 })
    + ln(x - 9, -40, x + 9, -40, { stroke: '#B45309', sw: 3 }) + T(x, -17, label, { size: 11, fill: '#92400E', cls: 'plain' }));
}
function scale(spec) {
  const PX = 180, PY = 58, L = 112;
  const dur = slow() ? 1.6 : 0.9;
  const end = (ang, d) => { const t = ang * Math.PI / 180; return { x: PX + d * L * Math.cos(t), y: PY + d * L * Math.sin(t) }; };
  const draw = (s) => {
    const { ang, prev } = s.v;
    const moving = prev !== ang;
    let o = path(`M${PX - 54} 196L${PX + 54} 196L${PX + 34} 180L${PX - 34} 180Z`, { fill: '#CBD5E1', stroke: '#64748B', sw: 2 });
    o += rect(PX - 5, PY, 10, 124, { fill: '#94A3B8', stroke: '#64748B', sw: 1.5, rx: 3 });
    o += `<g transform="rotate(${ang} ${PX} ${PY})">${rect(PX - L - 4, PY - 4, 2 * L + 8, 8, { fill: '#475569', rx: 4 })}${path(`M${PX} ${PY - 18}L${PX} ${PY - 4}`, { stroke: C.red, sw: 3 })}`
      + (moving ? `<animateTransform attributeName="transform" type="rotate" from="${prev} ${PX} ${PY}" to="${ang} ${PX} ${PY}" dur="${dur}s" fill="freeze"/>` : '') + '</g>';
    o += circ(PX, PY, 6, { fill: '#334155' });
    [-1, 1].forEach((d) => {
      const e = end(ang, d), p0 = end(prev, d);
      let pan = path('M-40 44L0 0L40 44', { stroke: '#94A3B8', sw: 1.5 }) + path('M-50 44Q0 66 50 44Z', { fill: '#E2E8F0', stroke: '#64748B', sw: 2 });
      pan += g('', (d < 0 ? s.v.left : s.v.right) || '', 'transform:translateY(44px)');
      o += `<g transform="translate(${r1(e.x)} ${r1(e.y)})">${pan}`
        + (moving ? `<animateTransform attributeName="transform" type="translate" from="${r1(p0.x)} ${r1(p0.y)}" to="${r1(e.x)} ${r1(e.y)}" dur="${dur}s" fill="freeze"/>` : '') + '</g>';
    });
    return o;
  };
  const s = stepper('Cân đĩa', 360, 200, draw);
  s.after = () => { s.v.prev = s.v.ang; };
  s.v.ang = 0; s.v.prev = 0;
  if (spec.mode === 'weigh') {
    const { name = 'túi gạo', tag = 'Gạo', weights = [2, 1] } = spec;
    const kg = weights.reduce((x, y) => x + y, 0);
    const right = (k) => {
      const ws = weights.slice(0, k).map((w) => 24 + w * 2), tot = ws.reduce((x, y) => x + y, 0) + (k - 1) * 3;
      let x = -tot / 2;
      return weights.slice(0, k).map((w, i) => { const c = x + ws[i] / 2; x += ws[i] + 3; return weight(c, w, i === k - 1 ? 'is-new' : ''); }).join('');
    };
    s.snap(`Muốn biết ${name} nặng bao nhiêu ki-lô-gam, ta dùng cân đĩa và các quả cân <b>ki-lô-gam (kg)</b>.`);
    s.v.left = bag(0, tag, 'is-new'); s.v.ang = -9;
    s.snap(`Đặt ${name} lên đĩa bên trái. Đĩa đó thấp xuống.`);
    s.v.left = bag(0, tag);
    for (let k = 1; k < weights.length; k++) {
      s.v.right = right(k);
      const sum = weights.slice(0, k).reduce((x, y) => x + y, 0);
      s.v.ang = -Math.min(9, (kg - sum) * 4);
      s.snap(`Đặt quả cân ${weights[k - 1]} kg lên đĩa bên phải. Cân vẫn lệch: ${name} nặng hơn ${sum} kg.`);
    }
    s.v.right = right(weights.length); s.v.ang = 0;
    s.snap(`Thêm quả cân ${weights[weights.length - 1]} kg: hai đĩa ngang nhau, cân <b>thăng bằng</b>.`);
    s.snap(`${cap1(name)} nặng mấy ki-lô-gam?`, { ask: numAsk(kg, { near: [1, -1, 2], ok: `Đúng rồi! ${weights.map((w) => `${w} kg`).join(' + ')} = ${kg} kg.` }) });
    s.snap(`Cân thăng bằng nên ${name} nặng bằng các quả cân: <b>${kg} kg</b>.`, { result: `${cap1(name)} nặng ${kg} kg` });
    return s.done();
  }
  const { left, right, heavier = 'left' } = spec;
  const heavy = heavier === 'left' ? left : right, light = heavier === 'left' ? right : left;
  s.snap('Đây là <b>cân đĩa</b>. Hai đĩa trống thì cân thăng bằng.');
  s.v.left = emo(0, -18, left.icon, 34, 'is-new'); s.v.right = emo(0, -15, right.icon, 26, 'is-new');
  s.v.ang = heavier === 'left' ? -8 : 8;
  s.snap(`Đặt ${left.name} lên đĩa bên trái, ${right.name} lên đĩa bên phải. Cân bị lệch.`);
  s.v.left = emo(0, -18, left.icon, 34); s.v.right = emo(0, -15, right.icon, 26);
  s.snap('Vật nào nặng hơn?', { ask: { options: [cap1(left.name), cap1(right.name)], answer: heavier === 'left' ? 0 : 1, ok: `Đúng rồi! Đĩa có ${heavy.name} thấp hơn.` } });
  s.snap(`Đĩa nào thấp hơn thì vật trên đĩa đó nặng hơn: <b>${heavy.name} nặng hơn ${light.name}</b>, ${light.name} nhẹ hơn ${heavy.name}.`,
    { result: `${cap1(heavy.name)} nặng hơn ${light.name}` });
  return s.done();
}

// ── Bài 16: lít ─────────────────────────────────────────────────────────────
function jug({ l }) {
  const sp = Math.min(50, 246 / l), CX = (i) => 104 + sp * i + sp / 2;
  const IN_T = 52, IN_B = 146, INH = IN_B - IN_T;
  const s = stepper(`Can có mấy lít nước?`, 360, 176, (s) => {
    let o = '';
    // can
    o += path('M30 40L30 28Q30 20 38 20L60 20Q68 20 68 28L68 40', { stroke: '#B91C1C', sw: 5 });
    o += path('M80 50L92 34L98 38L86 56', { fill: '#DC2626', stroke: '#991B1B', sw: 1.5 });
    o += rect(14, 40, 72, 112, { fill: '#FEE2E2', stroke: '#DC2626', sw: 3, rx: 10 });
    const lev = INH * s.v.left / l;
    if (lev > 0) o += rect(20, IN_B - lev, 60, lev, { fill: '#7DD3FC', rx: 4, cls: s.v.drop ? 'g2a-drop' : '' });
    o += `<text x="50" y="98" font-size="22" font-weight="800" fill="#0C4A6E" text-anchor="middle" dominant-baseline="middle" class="${s.has('ans') ? s.c('ans') : ''}">${s.has('ans') ? l : '?'} <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif">l</tspan></text>`;
    for (let i = 0; i < l; i++) {
      const x = CX(i);
      if (s.v.full > i) o += path(`M${x - 15} 112L${x + 15} 112L${x + 12} 146L${x - 12} 146Z`, { fill: '#38BDF8', stroke: 'none', cls: i >= s.v.was ? 'dg-up' : '', style: i >= s.v.was ? delay(i - s.v.was, 0.25) : '' });
      o += path(`M${x - 18} 100L${x + 18} 100L${x + 14} 150L${x - 14} 150Z`, { stroke: '#64748B', sw: 2.5 });
      o += path(`M${x + 17} 110Q${x + 28} 112 ${x + 26} 124Q${x + 24} 134 ${x + 15} 134`, { stroke: '#64748B', sw: 2.5 });
      o += `<text x="${r1(x)}" y="166" font-size="13" font-weight="800" fill="#475569" text-anchor="middle" dominant-baseline="middle">1 <tspan font-style="italic" font-family="Georgia, 'Times New Roman', serif">l</tspan></text>`;
    }
    if (s.v.pour != null) o += path(`M92 36Q${CX(s.v.pour) - 10} 30 ${CX(s.v.pour)} 96`, { stroke: '#38BDF8', sw: 5, cls: 'is-fade' });
    return o;
  });
  s.after = () => { s.v.was = s.v.full; s.v.pour = null; s.v.drop = false; };
  Object.assign(s.v, { left: l, full: 0, was: 0, pour: null });
  s.snap(`Mỗi ca chứa được <b>1 lít</b> nước, viết là <b>1 ${lit}</b>. Rót hết nước trong can vào các ca.`);
  Object.assign(s.v, { left: l - 1, full: 1, pour: 0, drop: true });
  s.snap(`Rót đầy ca thứ nhất: được <b>1 ${lit}</b> nước. Nước trong can vơi đi.`);
  Object.assign(s.v, { left: 0, full: l, pour: l - 1, drop: true });
  s.snap('Rót tiếp cho tới khi can hết nước.');
  s.snap('Can có bao nhiêu lít nước?', { ask: numAsk(l, { near: [1, -1, 2], ok: `Đúng rồi! Rót được đầy ${l} ca 1 ${lit}.` }) });
  s.show('ans').snap(`Rót được ${l} ca 1 ${lit} nên can có <b>${l} ${lit}</b> nước.`, { result: `Can có ${l} ${lit} nước` });
  return s.done();
}

// ── Bài 25, 26, 27: hình học ────────────────────────────────────────────────
const dot = (x, y, name, dx, dy, col = C.ink) => circ(x, y, 4, { fill: col }) + (name ? T(x + dx, y + dy, name, { size: 16, fill: col }) : '');
const dist = (p, q) => Math.hypot(q[0] - p[0], q[1] - p[1]);
const drawn = (x1, y1, x2, y2, o = {}) => ln(x1, y1, x2, y2, { ...o, style: `--len:${Math.ceil(Math.hypot(x2 - x1, y2 - y1))};${o.style || ''}` });

function geoLines() {
  const s = stepper('Điểm, đoạn thẳng, đường thẳng, đường cong', 360, 220, (s) => {
    let o = rect(4, 4, 352, 212, { stroke: '#E2E8F0', sw: 1.5, rx: 10 }) + ln(180, 12, 180, 208, { stroke: '#E2E8F0', sw: 1.5 }) + ln(12, 110, 348, 110, { stroke: '#E2E8F0', sw: 1.5 });
    o += g(s.c('A'), dot(36, 66, 'A', -4, -16));
    o += g(s.c('B'), dot(150, 50, 'B', 4, -16));
    o += drawn(36, 66, 150, 50, { stroke: C.blue, sw: 3, cls: s.c('AB', 'is-draw') });
    o += T(93, 92, 'đoạn thẳng AB', { size: 13, fill: C.blue, cls: s.c('AB') });
    o += drawn(232, 70, 304, 40, { stroke: C.ink, sw: 3, cls: s.c('CD') }) + g(s.c('CD'), dot(232, 70, 'C', 0, 16) + dot(304, 40, 'D', 0, 16));
    o += g(s.c('line', 'is-fade'), ln(190, 87.5, 232, 70, { stroke: C.green, sw: 3 }) + ln(304, 40, 346, 22.5, { stroke: C.green, sw: 3 }));
    o += T(240, 24, 'đường thẳng CD', { size: 13, fill: C.green, cls: s.c('line') });
    o += path('M26 180C56 120 96 214 124 150S160 140 168 170', { stroke: C.violet, sw: 3, cls: s.c('curve', 'is-draw'), style: '--len:260' });
    o += T(92, 203, 'đường cong', { size: 13, fill: C.violet, cls: s.c('curve') });
    const M = [204, 192], N = [262, 166], P = [326, 137], Q = [236, 132];
    o += g(s.c('mnp'), dot(...M, 'M', -2, 15) + dot(...N, 'N', 2, 15) + dot(...P, 'P', 4, 15) + dot(...Q, 'Q', 0, -14));
    o += drawn(192, 197.4, 346, 128, { stroke: C.orange, sw: 2.5, dash: '6 5', cls: s.c('row', 'is-fade') });
    return o;
  });
  s.show('A').snap('Dùng bút chấm một chấm: đó là <b>điểm A</b>. Ta đặt tên điểm bằng chữ in hoa.');
  s.show('B', 'AB').snap('Chấm thêm điểm B. Dùng thước nối A với B được <b>đoạn thẳng AB</b>.');
  s.show('CD').snap('Đây là đoạn thẳng CD.');
  s.show('line').snap('Kéo dài đoạn thẳng CD về <b>hai phía</b>, ta được <b>đường thẳng CD</b>.');
  s.show('curve').snap('Đường không thẳng gọi là <b>đường cong</b>.');
  s.show('mnp').snap('Ba điểm nào cùng nằm trên một đường thẳng?', { ask: { options: ['M, N, P', 'M, Q, P', 'Q, N, P'], answer: 0, ok: 'Đúng rồi! Đặt thước thì M, N, P nằm trên cùng một mép thước.' } });
  s.show('row').snap('M, N, P cùng nằm trên một đường thẳng: <b>M, N, P là ba điểm thẳng hàng</b>. Q không thẳng hàng với chúng.', { result: 'M, N, P thẳng hàng' });
  return s.done();
}

function geoPolyline({ lens = [3, 2, 4] }) {
  const P3 = [[26, 160], [104, 54], [200, 140], [334, 46]], P4 = [[16, 150], [88, 52], [170, 140], [248, 50], [344, 132]];
  const pts = lens.length === 3 ? P3 : P4;
  const names = 'ABCDE'.slice(0, pts.length).split('');
  const nm = names.join(''), total = lens.reduce((x, y) => x + y, 0);
  const s = stepper(`Đường gấp khúc ${nm}`, 360, 210, (s) => {
    let o = '';
    for (let i = 0; i < lens.length; i++) {
      const [x1, y1] = pts[i], [x2, y2] = pts[i + 1];
      o += drawn(x1, y1, x2, y2, { stroke: s.has('hi') ? [C.blue, C.orange, C.green, C.violet][i] : C.ink, sw: 3.5, cls: s.c('pl', 'is-draw'), style: delay(i, 0.5) });
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, nx = (y2 - y1) / dist(pts[i], pts[i + 1]), ny = -(x2 - x1) / dist(pts[i], pts[i + 1]);
      const side = i % 2 ? -1 : 1;
      o += T(mx + nx * 22 * side, my + ny * 22 * side, `${lens[i]} cm`, { size: 15, fill: [C.blue, C.orange, C.green, C.violet][i], cls: s.c('len'), style: delay(i, 0.2) });
    }
    pts.forEach((p, i) => { o += g(s.c('pl'), dot(p[0], p[1], names[i], 0, i % 2 ? -16 : 18)); });
    o += T(180, 196, `${lens.join(' + ')} = ${total} (cm)`, { size: 20, fill: C.green, cls: s.c('sum') });
    return o;
  });
  s.show('pl').snap(`Đây là <b>đường gấp khúc ${nm}</b>: các đoạn thẳng nối tiếp nhau, mỗi đoạn đi một hướng khác.`);
  s.snap(`Đường gấp khúc ${nm} gồm mấy đoạn thẳng?`, { ask: numAsk(lens.length, { near: [-1, 1], ok: `Đúng rồi! Gồm ${lens.length} đoạn thẳng: ${names.slice(0, -1).map((n, i) => n + names[i + 1]).join(', ')}.` }) });
  s.show('hi').snap(`Các đoạn thẳng: ${names.slice(0, -1).map((n, i) => `<b>${n}${names[i + 1]}</b>`).join(', ')}.`);
  s.show('len').snap(`Độ dài: ${names.slice(0, -1).map((n, i) => `${n}${names[i + 1]} = ${lens[i]} cm`).join(', ')}.`);
  s.snap(`Độ dài đường gấp khúc là <b>tổng</b> độ dài các đoạn thẳng: ${lens.join(' + ')} = ?`, { ask: numAsk(total, { near: [1, -1, 2], ok: `Đúng rồi! ${lens.join(' + ')} = ${total}.` }) });
  s.show('sum').snap(`Độ dài đường gấp khúc ${nm} là: <b>${lens.join(' + ')} = ${total} (cm)</b>.`, { result: `${total} cm` });
  return s.done();
}

function geoQuad() {
  const Q = [[34, 40], [176, 26], [196, 160], [20, 140]], names = ['M', 'N', 'P', 'Q'], off = [[-10, -10], [10, -10], [10, 12], [-10, 12]];
  const cols = [C.blue, C.orange, C.green, C.violet];
  const s = stepper('Hình tứ giác', 360, 190, (s) => {
    let o = `<polygon points="${Q.map((p) => p.join(',')).join(' ')}" fill="#E0F2FE" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round" class="${s.c('q', 'is-fade')}"/>`;
    for (let i = 0; i < 4; i++) {
      const [x1, y1] = Q[i], [x2, y2] = Q[(i + 1) % 4];
      o += drawn(x1, y1, x2, y2, { stroke: cols[i], sw: 5, cls: s.c('sides', 'is-draw'), style: delay(i, 0.35) });
    }
    Q.forEach((p, i) => { o += dot(p[0], p[1], names[i], off[i][0], off[i][1]); });
    o += g(s.c('v', 'is-fade'), Q.map((p) => circ(p[0], p[1], 9, { stroke: C.red, sw: 2.5 })).join(''));
    o += g(s.c('more', 'is-fade'), rect(232, 26, 70, 70, { fill: '#FEF3C7', stroke: C.ink, sw: 3, rx: 1 }) + T(267, 108, 'hình vuông', { size: 13 })
      + rect(222, 124, 116, 46, { fill: '#DCFCE7', stroke: C.ink, sw: 3, rx: 1 }) + T(280, 182, 'hình chữ nhật', { size: 13 }));
    return o;
  });
  s.show('q').snap('Đây là <b>hình tứ giác MNPQ</b>.');
  s.snap('Hình tứ giác có mấy cạnh?', { ask: numAsk(4, { near: [-1, 1], ok: 'Đúng rồi! Hình tứ giác có 4 cạnh.' }) });
  s.show('sides').snap('4 cạnh: <b>MN, NP, PQ, QM</b>.');
  s.show('v').snap('4 đỉnh: <b>M, N, P, Q</b>. Tên hình đọc theo các đỉnh, đi một vòng.');
  s.hide('sides', 'v').show('more').snap('Hình vuông, hình chữ nhật cũng có 4 cạnh, 4 đỉnh: chúng cũng là <b>hình tứ giác</b>.', { result: 'Tứ giác: 4 cạnh, 4 đỉnh' });
  return s.done();
}

function geoDraw({ len = 5 }) {
  const U = 30, X0 = 30, RY = 62, X = (cm) => X0 + cm * U;
  const s = stepper(`Vẽ đoạn thẳng AB dài ${len} cm`, 360, 128, (s) => {
    let r = rect(14, RY, 332, 48, { fill: '#FEF3C7', stroke: '#D97706', sw: 2, rx: 4 });
    for (let i = 0; i <= 10; i++) {
      r += ln(X(i), RY, X(i), RY + 16, { stroke: '#92400E', sw: 1.8 });
      if (i < 10) r += ln(X(i + 0.5), RY, X(i + 0.5), RY + 9, { stroke: '#92400E', sw: 1.2 });
      r += T(X(i), RY + 30, i, { size: 13, fill: '#92400E', weight: 700 });
    }
    r += T(338, RY + 40, 'cm', { size: 10, fill: '#92400E', weight: 700, anchor: 'end' });
    let o = s.has('off') ? g('g2a-down', r) : r;
    if (s.has('hiB')) o += rect(X(len) - 12, RY + 20, 24, 20, { stroke: C.orange, sw: 2.5, rx: 6 });
    o += g(s.c('A'), dot(X(0), RY - 6, 'A', 0, -18, C.blue));
    o += drawn(X(0), RY - 6, X(len), RY - 6, { stroke: C.ink, sw: 3.5, cls: s.c('AB', 'is-draw') });
    o += g(s.c('B'), dot(X(len), RY - 6, 'B', 0, -18, C.blue));
    o += T(X(len / 2), RY - 26, `${len} cm`, { size: 16, fill: C.green, cls: s.c('lab') });
    return o;
  });
  s.snap(`Vẽ <b>đoạn thẳng AB dài ${len} cm</b>. Đặt thước thẳng trên giấy.`);
  s.show('A').snap('Chấm <b>điểm A</b> ở mép thước, ngay vạch <b>0</b>.');
  s.show('hiB').snap('Chấm điểm B ở vạch số mấy?', { ask: numAsk(len, { near: [1, -1], ok: `Đúng rồi! AB dài ${len} cm nên B ở vạch ${len}.` }) });
  s.hide('hiB').show('B').snap(`Chấm <b>điểm B</b> ở vạch <b>${len}</b>.`);
  s.show('AB').snap('Giữ chặt thước, dùng bút <b>nối A với B</b> theo mép thước.');
  s.show('off', 'lab').snap(`Nhấc thước ra, viết tên hai điểm và độ dài: <b>đoạn thẳng AB dài ${len} cm</b>.`, { result: `AB = ${len} cm` });
  return s.done();
}

function geo(spec) {
  if (spec.mode === 'polyline') return geoPolyline(spec);
  if (spec.mode === 'quad') return geoQuad(spec);
  if (spec.mode === 'draw') return geoDraw(spec);
  return geoLines(spec);
}

// ── Bài 29: đồng hồ ─────────────────────────────────────────────────────────
const BUOI = (h24) => (h24 <= 10 ? 'sáng' : h24 <= 12 ? 'trưa' : h24 <= 18 ? 'chiều' : h24 <= 21 ? 'tối' : 'đêm');
const pad = (v) => String(v).padStart(2, '0');
function clock({ h, m = 0, pm = false }) {
  const CX = 104, CY = 108, R = 94;
  const h24 = pm ? h + 12 : h, k = m / 5;
  const pt = (deg, r) => ({ x: CX + r * Math.sin(deg * Math.PI / 180), y: CY - r * Math.cos(deg * Math.PI / 180) });
  const s = stepper(m ? `${h} giờ ${m} phút` : `${h} giờ`, 360, 216, (s) => {
    let o = circ(CX, CY, R, { fill: '#fff', stroke: '#0EA5E9', sw: 5 });
    for (let i = 0; i < 60; i++) {
      const a = pt(i * 6, R - 6), b = pt(i * 6, i % 5 ? R - 10 : R - 14);
      o += ln(a.x, a.y, b.x, b.y, { stroke: i % 5 ? '#CBD5E1' : '#64748B', sw: i % 5 ? 1.2 : 2.2 });
    }
    for (let i = 1; i <= 12; i++) {
      const p = pt(i * 30, R - 28);
      const on = (s.has('hiH') && (i === h || i === h % 12 + 1) && m) || (s.has('hiH') && !m && i === h) || (s.has('mins') && i === (k || 12));
      o += T(p.x, p.y, i, { size: 17, fill: on ? C.orange : C.ink });
    }
    if (s.has('mins')) for (let i = 1; i <= k; i++) { const p = pt(i * 30, R + 11); o += T(p.x, p.y, 5 * i, { size: 11, fill: C.green, cls: s.c('mins'), style: delay(i, 0.25) }); }
    const ha = ((h % 12) + m / 60) * 30, ma = m * 6;
    const hp = pt(ha, 40), mp = pt(ma, 56);
    o += ln(CX, CY, mp.x, mp.y, { stroke: C.blue, sw: 4.5 }) + ln(CX, CY, hp.x, hp.y, { stroke: C.red, sw: 7 }) + circ(CX, CY, 6, { fill: C.ink });
    o += g(s.c('dig', 'is-fade'), rect(226, 26, 124, 54, { fill: '#0F172A', rx: 10 }) + T(288, 54, `${pad(h24)}:${pad(m)}`, { size: 30, fill: '#4ADE80', cls: 'plain' }));
    o += ln(232, 120, 256, 120, { stroke: C.red, sw: 7 }) + T(264, 120, 'kim ngắn: giờ', { size: 14, anchor: 'start', fill: C.red });
    o += ln(232, 150, 262, 150, { stroke: C.blue, sw: 4.5 }) + T(268, 150, 'kim dài: phút', { size: 14, anchor: 'start', fill: C.blue });
    return o;
  });
  const name = m === 30 ? `${h} giờ 30 phút (${h} giờ rưỡi)` : m ? `${h} giờ ${m} phút` : `${h} giờ`;
  s.snap('Đồng hồ có <b>kim ngắn</b> chỉ giờ và <b>kim dài</b> chỉ phút. Kim dài đi hết một vòng là <b>60 phút</b>, tức là <b>1 giờ</b>.');
  if (!m) {
    s.show('hiH').snap('Kim dài chỉ số 12. Kim ngắn chỉ số mấy?', { ask: numAsk(h, { near: [1, -1, 2], ok: `Đúng rồi! Kim ngắn chỉ số ${h}.` }) });
    s.snap(`Kim dài chỉ số 12, kim ngắn chỉ số ${h}: đồng hồ chỉ <b>${h} giờ</b> đúng.`, pm ? {} : { result: `${h} giờ` });
    if (pm) s.show('dig').snap(`Nếu là buổi ${BUOI(h24)} thì ${h} giờ ${BUOI(h24)} còn gọi là <b>${h24} giờ</b> (${h} + 12 = ${h24}). Đồng hồ điện tử hiện ${h24}:00.`, { result: `${h} giờ ${BUOI(h24)} = ${h24} giờ` });
    return s.done();
  }
  s.show('hiH').snap(`Kim ngắn ở giữa số ${h} và số ${h % 12 + 1}. Đồng hồ chỉ hơn mấy giờ?`, { ask: { options: [`Hơn ${h} giờ`, `Hơn ${h % 12 + 1} giờ`], answer: 0, ok: `Đúng rồi! Kim ngắn đã qua số ${h}, chưa tới số ${h % 12 + 1}.` } });
  s.hide('hiH').show('mins').snap(`Kim dài đi từ số 12 tới số ${k}. Mỗi khoảng giữa hai số là <b>5 phút</b>: đếm 5, 10, ….`);
  s.snap(`Kim dài chỉ số ${k} là bao nhiêu phút?`, { ask: numAsk(m, { near: [5, -5, 10], ok: `Đúng rồi! Kim dài chỉ số ${k} là ${m} phút.` }) });
  s.show('dig').snap(`Đồng hồ chỉ <b>${name}</b>. Đồng hồ điện tử hiện ${pad(h24)}:${pad(m)}.`, { result: name });
  return s.done();
}

// ── Bài 29: một ngày có 24 giờ ──────────────────────────────────────────────
const PARTS = [['sáng', 0, 10, '#FEF08A'], ['trưa', 10, 12, '#FDBA74'], ['chiều', 12, 18, '#FCA5A5'], ['tối', 18, 21, '#C4B5FD'], ['đêm', 21, 24, '#93C5FD']];
function day({ h }) {
  const X = (v) => 18 + v * 13.5, Y = 64;
  const b = BUOI(h);
  const s = stepper(`${h} giờ`, 360, 150, (s) => {
    let o = '';
    PARTS.forEach(([name, a, z, col], i) => {
      o += rect(X(a), Y, X(z) - X(a), 24, { fill: col, rx: 0, stroke: '#fff', sw: 1 });
      o += T((X(a) + X(z)) / 2, Y + 12.5, name, { size: name === 'trưa' ? 10 : 13, fill: '#334155', cls: s.c('names'), style: delay(i, 0.15) });
    });
    for (let v = 0; v <= 24; v++) {
      o += ln(X(v), Y + 24, X(v), Y + (v % 6 ? 30 : 34), { stroke: '#64748B', sw: v % 6 ? 1 : 2 });
      if (v % 3 === 0) o += T(X(v), Y + 44, v, { size: 12, fill: '#475569' });
    }
    o += g(s.c('mk'), path(`M${X(h)} ${Y - 2}L${X(h) - 7} ${Y - 16}L${X(h) + 7} ${Y - 16}Z`, { fill: C.orange, stroke: '#fff', sw: 1.5 }) + T(X(h), Y - 30, `${h} giờ`, { size: 16, fill: C.orange }));
    o += T(X(h), Y + 66, `= ${h - 12} giờ ${b}`, { size: 16, fill: C.green, cls: s.c('eq') });
    return o;
  });
  s.snap('Một ngày có <b>24 giờ</b>, tính từ 12 giờ đêm hôm trước đến 12 giờ đêm hôm sau.');
  s.show('names').snap('Một ngày có các buổi: <b>sáng</b>, <b>trưa</b>, <b>chiều</b>, <b>tối</b>, <b>đêm</b>. Từ 13 giờ trở đi, ta đếm tiếp sau 12 giờ trưa.');
  s.show('mk').snap(`${h} giờ là buổi ${b}. ${h} giờ còn gọi là mấy giờ ${b}?`, { ask: numAsk(h - 12, { near: [1, -1, 2], ok: `Đúng rồi! ${h} − 12 = ${h - 12}.` }) });
  s.show('eq').snap(`<b>${h} giờ</b> hay <b>${h - 12} giờ ${b}</b>.`, { result: `${h} giờ = ${h - 12} giờ ${b}` });
  return s.done();
}

// ── Bài 30: tờ lịch tháng ───────────────────────────────────────────────────
const THU = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
const TEN_THANG = ['', 'MỘT', 'HAI', 'BA', 'TƯ', 'NĂM', 'SÁU', 'BẢY', 'TÁM', 'CHÍN', 'MƯỜI', 'MƯỜI MỘT', 'MƯỜI HAI'];
function cal({ month, first, days, day: d }) {
  const CW = 48, X0 = 12, Y0 = 60, RH = 26;
  const rows = Math.ceil((first + days) / 7);
  const cell = (n) => { const k = first + n - 1; return { x: X0 + (k % 7) * CW, y: Y0 + Math.floor(k / 7) * RH, col: k % 7 }; };
  const d2 = d + 7 <= days ? d + 7 : d - 7;
  const col = cell(d).col;
  const s = stepper(`Tháng ${month}`, 360, Y0 + rows * RH + 8, (s) => {
    let o = rect(X0, 4, 7 * CW, 24, { fill: '#DC2626', rx: 6 }) + T(X0 + 3.5 * CW, 17, `THÁNG ${TEN_THANG[month]}`, { size: 14, fill: '#fff', cls: 'plain' });
    THU.forEach((t, i) => {
      const x = X0 + i * CW;
      if (s.has('col') && i === col) o += rect(x + 1, 30, CW - 2, Y0 + rows * RH - 30, { fill: C.yellowL, rx: 6, cls: s.c('col', 'is-fade') });
      const [w1, w2] = t === 'Chủ nhật' ? ['Chủ', 'nhật'] : ['Thứ', t.slice(4)];
      const c = i === 6 ? C.blue : '#334155';
      o += T(x + CW / 2, 38, w1, { size: 10, fill: c, weight: 700 }) + T(x + CW / 2, 51, w2, { size: 11, fill: c });
    });
    for (let r = 0; r <= rows; r++) o += ln(X0, Y0 + r * RH, X0 + 7 * CW, Y0 + r * RH, { stroke: '#E2E8F0', sw: 1 });
    for (let n = 1; n <= days; n++) {
      const p = cell(n);
      o += T(p.x + CW / 2, p.y + RH / 2, n, { size: 15, fill: p.col === 6 ? C.blue : C.ink, weight: 700 });
    }
    const ring = (n, key, colr) => { const p = cell(n); return circ(p.x + CW / 2, p.y + RH / 2, 12, { stroke: colr, sw: 2.5, cls: s.c(key) }); };
    o += ring(days, 'last', C.green) + ring(d, 'd', C.orange) + ring(d2, 'd2', C.blue);
    return o;
  });
  const opts = [col - 1, col, col + 1].map((i) => (i + 7) % 7);
  s.snap(`Tờ lịch <b>tháng ${month}</b>. Hàng trên ghi các thứ trong tuần, mỗi ô ghi một ngày của tháng.`);
  s.snap(`Tháng ${month} có bao nhiêu ngày?`, { ask: numAsk(days, { near: [-1, -2, 1], ok: `Đúng rồi! Ngày cuối cùng của tháng là ngày ${days}.` }) });
  s.show('last').snap(`Ngày cuối cùng là ngày ${days}: tháng ${month} có <b>${days} ngày</b>.`);
  s.hide('last').show('d').snap(`Ngày ${d} tháng ${month} là thứ mấy?`, { ask: { options: opts.map((i) => THU[i]), answer: 1, ok: `Đúng rồi! Ngày ${d} nằm ở cột ${THU[col]}.` } });
  s.show('col').snap(`Dò theo cột lên hàng trên: ngày ${d} tháng ${month} là <b>${THU[col]}</b>.`);
  s.show('d2').snap(`Một tuần lễ có <b>7 ngày</b>. Cùng cột ${THU[col]}, ${d2 > d ? 'tuần sau' : 'tuần trước'} là ngày <b>${d2 > d ? `${d} + 7 = ${d2}` : `${d} − 7 = ${d2}`}</b>.`,
    { result: `Ngày ${d} tháng ${month}: ${THU[col]}` });
  return s.done();
}

export const DEMOS_G2A = {
  'g2a-tens': tens, 'g2a-ray': ray, 'g2a-parts': parts, 'g2a-story': story, 'g2a-ten': ten, 'g2a-table': table,
  'g2a-scale': scale, 'g2a-jug': jug, 'g2a-geo': geo, 'g2a-clock': clock, 'g2a-day': day, 'g2a-cal': cal,
};

const CSS = `
  .g2a-l { font-family: Georgia, 'Times New Roman', serif; }
  .g2a-eq { display: grid; grid-template-columns: repeat(5, auto); column-gap: 0.3em; row-gap: 0.2em; justify-items: center; align-items: center;
    font: 800 clamp(1.8rem, 12cqi, 3.2rem)/1.15 Quicksand, sans-serif; color: #1E293B; padding: 0.3em 0 0.2em; }
  .g2a-eq .g2a-n { padding: 0 0.15em; border-radius: 0.2em; }
  .g2a-eq .g2a-n.t0 { color: #2563EB; } .g2a-eq .g2a-n.t1 { color: #7C3AED; } .g2a-eq .g2a-n.t2 { color: #16A34A; }
  .g2a-lb { font-size: 0.36em; line-height: 1.2; padding: 0.25em 0.55em; border-radius: 0.7em; white-space: nowrap; }
  .g2a-lb.t0 { background: #DBEAFE; color: #1D4ED8; } .g2a-lb.t1 { background: #EDE9FE; color: #6D28D9; } .g2a-lb.t2 { background: #DCFCE7; color: #15803D; }
  .g2a-tab { display: grid; grid-template-columns: auto auto auto; column-gap: 0.4em; row-gap: 0.12em; align-items: center;
    font: 800 clamp(1.05rem, 5.6cqi, 1.7rem)/1.25 Quicksand, sans-serif; color: #1E293B; }
  .g2a-tab .e { text-align: right; padding: 0 0.25em; border-radius: 0.3em; }
  .g2a-tab .e.on { background: #FFEDD5; color: #C2410C; }
  .g2a-tab .r { min-width: 1.6em; text-align: left; color: #2563EB; }
  .g2a-tab .r.q { color: #CBD5E1; }
  .g2a-tab .p { margin-left: 0.8em; font-size: 0.82em; color: #15803D; background: #F0FDF4; border-radius: 0.4em; padding: 0 0.4em; }
  .g2a-story { width: 100%; display: flex; flex-direction: column; align-items: center; }
  .g2a-sol { align-self: stretch; margin: 0.2rem 0.4rem 0; padding: 0.35em 0.7em; border-radius: 0.6em; background: #F8FAFC; border: 1px dashed #CBD5E1;
    font: 700 clamp(0.95rem, 4.2cqi, 1.2rem)/1.45 Quicksand, sans-serif; color: #1E293B; }
  .g2a-sol .h { text-align: center; font-weight: 800; color: #0369A1; }
  .g2a-sol > div:nth-child(3) { padding-left: 2em; color: #2563EB; font-weight: 800; }
  .g2a-sol > div:nth-child(4) { padding-left: 4em; }
  .g2a-sol .is-new { animation: kdDrop 0.5s cubic-bezier(.3,1.6,.5,1) both; }
  .kd-svg .g2a-away { animation: g2aAway 1s ease-in both; transform-box: fill-box; transform-origin: center; }
  .kd-svg .g2a-drop { animation: g2aDrop 0.9s ease-out both; transform-box: fill-box; transform-origin: center bottom; }
  .kd-svg .g2a-down { animation: g2aDown 0.8s ease-in-out both; }
  .kd-svg .g2a-away, .kd-svg .g2a-away text { opacity: 0.35; }
  .kd-svg .g2a-down { opacity: 0.45; transform: translateY(14px); }
  @keyframes g2aAway { from { opacity: 1; transform: translateY(0); } to { opacity: 0.35; transform: translateY(-6px); } }
  @keyframes g2aDrop { from { transform: scaleY(1.25); } }
  @keyframes g2aDown { from { opacity: 1; transform: translateY(0); } to { opacity: 0.45; transform: translateY(14px); } }
  @media (prefers-reduced-motion: reduce) {
    .kd-svg .g2a-away { animation-duration: 1.8s; }
    .kd-svg .g2a-down { animation-duration: 1.6s; }
    .g2a-sol .is-new { animation: kdFade 0.6s ease-out both; }
  }
`;

registerDemos(DEMOS_G2A, CSS, 'g2a');
