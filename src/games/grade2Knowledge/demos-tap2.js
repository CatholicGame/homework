/**
 * Ví dụ "xem từng bước" của 📘 Kiến thức Toán 2 Tập Hai (Bài 37–75). Đăng ký vào knowledgeDemo.js bằng registerDemos.
 * Mọi bước của một ví dụ dùng chung một viewBox (phần chưa tới vẫn vẽ nhưng ẩn), nên hình không nhảy.
 *
 *   { kind: 'g2b-groups', mode: 'mul', per: 2, n: 3, item: 'cam', names? }      nhóm bằng nhau → phép nhân (names: thừa số, tích)
 *   { kind: 'g2b-groups', mode: 'share', total: 6, k: 3, item, names? }         chia đều vào k đĩa (names: số bị chia, số chia, thương)
 *   { kind: 'g2b-groups', mode: 'group', total: 8, m: 2, item }                 chia thành các nhóm, mỗi nhóm m
 *   { kind: 'g2b-table', n: 2 | 5, op: 'mul' | 'div', ask: 4 }                  bảng nhân / bảng chia
 *   { kind: 'g2b-blocks', n: 243, mode: 'read' | 'sum' } | { mode: 'units' }    khối trăm, chục, đơn vị
 *   { kind: 'g2b-round', step: 100 | 10, lo, missing: [..] }                    số tròn trăm, tròn chục trên tia số
 *   { kind: 'g2b-ruler', mode: 'dm' | 'm' }                                     1 dm = 10 cm; 1 m = 10 dm = 100 cm; 1 km = 1 000 m
 *   { kind: 'g2b-money', notes: [200, 200, 100] }                               tờ tiền, cộng tiền
 *   { kind: 'g2b-tally', items: 'TCT…', cats: { T: ['tao', 'Táo'], … } }        kiểm đếm bằng vạch
 *   { kind: 'g2b-picto', rows: [['tao', 'Táo', 4], …], what, unit }             biểu đồ tranh
 *   { kind: 'g2b-chance', box: ['xanh', 'xanh', 'đỏ'], ask: ['xanh', 'vàng'] }   chắc chắn, có thể, không thể
 *   { kind: 'g2b-solids' }                                                      khối trụ, khối cầu
 */

import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { frames, svg, C, numAsk } from '../grade4Textbook/demos/util.js';
import { docSo } from '../../engine/numberWords.js';
import { artAt, LABEL, noteBody, fmtVN, ballBody, BALL } from './art-tap2.js';

// ── Dụng cụ vẽ ───────────────────────────────────────────────────────────────
const r1 = (v) => Math.round(v * 10) / 10;
const T = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '', style = '' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${t}</text>`;
const rect = (x, y, w, h, { fill = 'none', stroke = 'none', sw = 1.5, rx = 3, cls = '', style = '', dash = '', op = '' } = {}) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${dash ? ` stroke-dasharray="${dash}"` : ''}${op ? ` opacity="${op}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const ln = (x1, y1, x2, y2, { stroke = C.ink, sw = 2, dash = '', cls = '', style = '' } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const path = (d, { stroke = C.ink, sw = 2, fill = 'none', cls = '', style = '', dash = '' } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"${dash ? ` stroke-dasharray="${dash}"` : ''}${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const circ = (x, y, r, { fill = 'none', stroke = 'none', sw = 1.5, cls = '', style = '' } = {}) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}/>`;
const g = (cls, body, style = '') => `<g${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${body}</g>`;
const delay = (i, step = 0.12) => (i ? `animation-delay:${(i * step).toFixed(2)}s` : '');
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
/** Ngoặc nhọn nằm ngang dưới đoạn x1..x2 (mũi xuống). */
function hbrace(x1, x2, y, dir = 1, d = 6) {
  d = Math.min(d, (x2 - x1) / 4);
  const m = (x1 + x2) / 2, e = y + dir * d, t = y + dir * 2 * d;
  return `M${r1(x1)} ${y}Q${r1(x1)} ${e} ${r1(x1 + d)} ${e}L${r1(m - d)} ${e}Q${r1(m)} ${e} ${r1(m)} ${t}Q${r1(m)} ${e} ${r1(m + d)} ${e}L${r1(x2 - d)} ${e}Q${r1(x2)} ${e} ${r1(x2)} ${y}`;
}

/** Bộ bước như diagram.js: show/hide khoá, c(khoá) → class, snap(lời, { result, ask }). */
function stepper(title, W, H, draw) {
  const f = frames(title), on = new Set();
  let fresh = new Set();
  const s = {
    v: {},
    has: (k) => on.has(k),
    isNew: (k) => fresh.has(k),
    show(...k) { k.flat().forEach((x) => { on.add(x); fresh.add(x); }); return s; },
    hide(...k) { k.flat().forEach((x) => on.delete(x)); return s; },
    c: (k, anim = 'is-new') => (!on.has(k) ? 'kd-ghost' : fresh.has(k) ? anim : ''),
    snap(caption, extra = {}) { f.add(svg(W, H, draw(s)), caption, extra); fresh = new Set(); return s; },
    done: () => f.done(),
  };
  return s;
}

/** Phép tính trên một dòng, mỗi phần ở chỗ cố định (để ghi tên thành phần bên dưới). */
function eqLine(s, key, parts, y, { x0 = 180, gap = 50, size = 26, names = null, nameKey = '', colors = [] } = {}) {
  const n = parts.length, xs = parts.map((_, i) => x0 + (i - (n - 1) / 2) * gap);
  let out = parts.map((p, i) => T(xs[i], y, p, { size, fill: colors[i] || C.ink })).join('');
  out = g(s.c(key), out);
  if (names) {
    let lab = '';
    names.forEach((nm, i) => {
      if (!nm) return;
      lab += path(`M${r1(xs[i])} ${y + size * 0.55}L${r1(xs[i])} ${y + size * 0.55 + 10}`, { stroke: C.violet, sw: 2 });
      lab += T(xs[i], y + size * 0.55 + 22, nm, { size: 14, fill: C.violet });
    });
    out += g(s.c(nameKey), lab);
  }
  return out;
}

const plural = (item) => LABEL[item] || 'đồ vật';

// ── Nhóm bằng nhau: phép nhân, phép chia ─────────────────────────────────────
/** Vẽ một đĩa ở (x, y) cỡ w × h, có `cnt` đồ vật (chỗ cho `capN` đồ vật). */
function plate(x, y, w, h, item, cnt, capN, { cls = '', itemCls = () => '', tone = '#FEF3C7' } = {}) {
  const ic = capN <= 3 ? capN : Math.ceil(capN / 2), ir = Math.ceil(capN / ic);
  const sz = Math.min((w - 10) / ic, (h - 10) / ir, 30);
  const ox = x + (w - ic * sz) / 2, oy = y + (h - ir * sz) / 2;
  let out = g(cls, rect(x, y, w, h, { fill: tone, stroke: '#D6B98C', sw: 2, rx: h / 2.4 }));
  for (let i = 0; i < cnt; i++) {
    const cx = ox + (i % ic) * sz, cy = oy + Math.floor(i / ic) * sz;
    out += g(itemCls(i), artAt(item, cx + sz * 0.04, cy + sz * 0.04, sz * 0.92));
  }
  return out;
}

function groups(spec) {
  const { mode = 'mul', item = 'cam', names = false } = spec;
  const box = spec.box || (item === 'ban' ? 'nhóm' : 'đĩa');
  if (mode === 'mul') return groupsMul(spec, item, names, box);
  return groupsDiv(spec, item, names, mode, box);
}

function groupsMul({ per = 2, n = 3 }, item, names, box) {
  const total = per * n, cols = n <= 5 ? n : Math.ceil(n / 2), rows = Math.ceil(n / cols);
  const pw = Math.min(84, (344 - (cols - 1) * 10) / cols), ph = Math.min(64, pw * 0.8);
  const X0 = 180 - (cols * pw + (cols - 1) * 10) / 2, Y0 = 8;
  const yL1 = Y0 + rows * (ph + 10) + 18, yL2 = yL1 + 40, H = yL2 + (names ? 52 : 26);
  const sum = (k) => Array(k).fill(per).join(' + ');
  const thing = plural(item);
  const s = stepper(`${per} × ${n}`, 360, H, (s) => {
    let out = '';
    for (let i = 0; i < n; i++) {
      const x = X0 + (i % cols) * (pw + 10), y = Y0 + Math.floor(i / cols) * (ph + 10);
      out += g(s.c(i ? 'rest' : 'p0'), plate(x, y, pw, ph, item, per, per), i > 1 ? delay(i - 1, 0.15) : '');
    }
    const k = s.v.k || 0;
    out += T(180, yL1, k ? `${sum(k)}${s.has('tot') ? ` = ${total}` : ''}` : '', { size: Math.min(24, 600 / Math.max(8, sum(k).length + 5)), fill: C.blue });
    out += eqLine(s, 'mul', [per, '×', n, '=', total], yL2, { names: names ? ['Thừa số', '', 'Thừa số', '', 'Tích'] : null, nameKey: 'names', colors: [C.orange, C.ink, C.green, C.ink, C.blue] });
    return out;
  });
  s.v.k = 1;
  s.show('p0').snap(`Mỗi ${box} có <b>${per} ${thing}</b>.`);
  s.v.k = n;
  s.show('rest').snap(`Có <b>${n} ${box}</b> như thế. Số ${thing} là tổng của ${n} số hạng đều bằng ${per}: <b>${sum(n)}</b>.`);
  s.snap(`${sum(n)} = ?`, { ask: numAsk(total, { near: [-per, per, 1], ok: `Đúng rồi! ${sum(n)} = ${total}.` }) });
  s.show('tot').snap(`Có tất cả <b>${total} ${thing}</b>.`);
  s.show('mul').snap(`${per} được lấy ${n} lần, ta viết thành phép nhân: <b>${per} × ${n} = ${total}</b>. Đọc là: ${docSo(per)} nhân ${docSo(n)} bằng ${docSo(total)}.`, names ? {} : { result: `${per} × ${n} = ${total}` });
  if (names) {
    s.show('names').snap(`Trong phép nhân <b>${per} × ${n} = ${total}</b>: ${per} và ${n} là <b>thừa số</b>, ${total} là <b>tích</b>.`);
    s.snap(`Số ${total} gọi là gì?`, { ask: { options: ['Thừa số', 'Tích', 'Tổng'], answer: 1, ok: `Đúng rồi! ${total} là tích. ${per} × ${n} cũng gọi là tích.` } });
    s.snap(`${per} × ${n} cũng gọi là <b>tích</b>.`, { result: `${per} × ${n} = ${total}` });
  }
  return s.done();
}

function groupsDiv({ total = 6, k = 3, m = 2 }, item, names, mode, box) {
  const share = mode === 'share';
  const nPl = share ? k : total / m, each = share ? total / k : m;
  const thing = plural(item);
  // đồ vật ban đầu: một hàng (≤ 10) hoặc hai hàng
  const pc = total <= 10 ? total : Math.ceil(total / 2), pr = Math.ceil(total / pc);
  const isz = Math.min(30, 340 / pc), PX = 180 - (pc * isz) / 2, PY = 6;
  const cols = nPl <= 5 ? nPl : Math.ceil(nPl / 2), rows = Math.ceil(nPl / cols);
  const pw = Math.min(84, (344 - (cols - 1) * 10) / cols), ph = Math.min(60, pw * 0.75);
  const X0 = 180 - (cols * pw + (cols - 1) * 10) / 2, Y0 = PY + pr * isz + 16;
  const yL = Y0 + rows * (ph + 10) + 20, H = yL + (names ? 52 : 24);
  const op = share ? k : m, res = share ? each : nPl;
  const s = stepper(share ? `Chia đều ${total} ${thing} vào ${k} ${box}` : `${total} ${thing}, mỗi ${box} ${m}`, 360, H, (s) => {
    let out = '';
    const given = s.v.given || 0; // số đồ vật đã chia
    out += rect(PX - 6, PY - 3, pc * isz + 12, pr * isz + 6, { fill: '#F1F5F9', rx: 10 });
    for (let i = 0; i < total; i++) {
      out += g(i < given ? 'kd-ghost' : '', artAt(item, PX + (i % pc) * isz + 1, PY + Math.floor(i / pc) * isz, isz - 2));
    }
    for (let p = 0; p < nPl; p++) {
      const x = X0 + (p % cols) * (pw + 10), y = Y0 + Math.floor(p / cols) * (ph + 10);
      // chia đều: lượt r cho mỗi ${box} một cái; chia nhóm: đĩa p nhận m cái liền
      const cnt = share ? Math.floor(given / k) + (p < given % k ? 1 : 0) : Math.max(0, Math.min(m, given - p * m));
      const prev = s.v.prev || 0;
      const was = share ? Math.floor(prev / k) + (p < prev % k ? 1 : 0) : Math.max(0, Math.min(m, prev - p * m));
      out += plate(x, y, pw, ph, item, cnt, each, { itemCls: (i) => (i >= was ? 'is-new' : '') });
    }
    out += eqLine(s, 'div', [total, ':', op, '=', res], yL, { names: names ? ['Số bị chia', '', 'Số chia', '', 'Thương'] : null, nameKey: 'names', colors: [C.orange, C.ink, C.green, C.ink, C.blue], gap: 52 });
    return out;
  });
  const give = (n, cap0, extra) => { s.v.prev = s.v.given || 0; s.v.given = n; s.snap(cap0, extra); };
  s.v.given = 0;
  s.snap(share ? `Có <b>${total} ${thing}</b>, chia đều vào <b>${k} ${box}</b>.` : `Có <b>${total} ${thing}</b>, xếp vào các ${box}, mỗi ${box} <b>${m} ${thing}</b>.`);
  if (share) {
    give(k, `Lượt 1: mỗi ${box} nhận <b>1 ${thing}</b>.`);
    if (each > 2) give(2 * k, `Lượt 2: mỗi ${box} nhận thêm 1. Chia lần lượt, các ${box} luôn bằng nhau.`);
    s.v.prev = s.v.given; s.v.given = total;
    s.snap(`Chia tiếp cho tới khi hết. Mỗi ${box} được mấy?`, { ask: numAsk(each, { near: [1, -1, 2], ok: `Đúng rồi! Mỗi ${box} được ${each} ${thing}.` }) });
    s.v.prev = total;
    s.show('div').snap(`Chia đều ${total} ${thing} vào ${k} ${box}, mỗi ${box} ${each}. Ta có phép chia: <b>${total} : ${k} = ${each}</b>. Đọc là: ${docSo(total)} chia ${docSo(k)} bằng ${docSo(each)}.`, names ? {} : { result: `${total} : ${k} = ${each}` });
  } else {
    give(m, `Lấy <b>${m} ${thing}</b> xếp vào ${box} thứ nhất.`);
    if (nPl > 2) give(2 * m, `Lấy tiếp ${m} ${thing} xếp vào ${box} thứ hai.`);
    s.v.prev = s.v.given; s.v.given = total;
    s.snap(`Xếp cho tới khi hết. Được mấy ${box}?`, { ask: numAsk(nPl, { near: [1, -1, 2], ok: `Đúng rồi! Được ${nPl} ${box}.` }) });
    s.v.prev = total;
    s.show('div').snap(`${total} ${thing}, mỗi ${box} ${m}, được ${nPl} ${box}. Ta có phép chia: <b>${total} : ${m} = ${nPl}</b>.`, names ? {} : { result: `${total} : ${m} = ${nPl}` });
  }
  if (names) {
    s.show('names').snap(`Trong phép chia <b>${total} : ${op} = ${res}</b>: ${total} là <b>số bị chia</b>, ${op} là <b>số chia</b>, ${res} là <b>thương</b>.`);
    s.snap(`Số ${res} gọi là gì?`, { ask: { options: ['Số bị chia', 'Số chia', 'Thương'], answer: 2, ok: `Đúng rồi! ${res} là thương. ${total} : ${op} cũng gọi là thương.` } });
    s.snap(`${total} : ${op} cũng gọi là <b>thương</b>.`, { result: `${total} : ${op} = ${res}` });
  }
  return s.done();
}

// ── Bảng nhân, bảng chia ─────────────────────────────────────────────────────
function table({ n = 2, op = 'mul', ask = 4 }) {
  const mul = op === 'mul';
  const line = (k, hide) => (mul ? `${n} × ${k} = ${hide ? '?' : n * k}` : `${n * k} : ${n} = ${hide ? '?' : k}`);
  const colX = [16, 122], rowY = (k) => 22 + ((k - 1) % 5) * 30;
  const DX = 236, dsp = n === 2 ? 18 : 15;
  const s = stepper(mul ? `Bảng nhân ${n}` : `Bảng chia ${n}`, 360, 172, (s) => {
    let out = rect(4, 4, 222, 160, { fill: '#F8FAFC', rx: 10 });
    const k0 = s.v.k || 0, q = s.v.q || 0;
    for (let k = 1; k <= 10; k++) {
      const shown = k <= k0 || k === q;
      out += T(colX[k > 5 ? 1 : 0], rowY(k), line(k, k === q && k > k0), { size: 17, anchor: 'start', fill: k === Math.max(k0, q) ? C.blue : C.ink, cls: !shown ? 'kd-ghost' : k > (s.v.k0 || 0) ? 'is-new' : '' });
    }
    // chấm tròn: k nhóm, mỗi nhóm n chấm (một hàng)
    const kk = Math.max(k0, q);
    out += rect(DX - 6, 4, 360 - DX + 2, 160, { fill: '#FFF7ED', rx: 10 });
    for (let k = 1; k <= 10; k++) {
      const y = 12 + (k - 1) * 15.2;
      for (let j = 0; j < n; j++) out += circ(DX + 8 + j * dsp, y + 2, 6.2, { fill: k <= kk ? (k === kk ? C.orange : '#FDBA74') : '#F1F5F9' });
      out += T(DX + 2 + n * dsp + 4, y + 2, k <= kk ? (mul ? n * k : k) : '', { size: 12, anchor: 'start', fill: C.orange });
    }
    return out;
  });
  const set = (k, q, cap0, extra) => { s.v.k0 = s.v.k; s.v.k = k; s.v.q = q; s.snap(cap0, extra); };
  if (mul) {
    set(1, 0, `<b>${n} × 1 = ${n}</b>: ${n} được lấy 1 lần.`);
    set(2, 0, `<b>${n} × 2 = ${2 * n}</b>: thêm ${n} nữa, ${n} + ${n} = ${2 * n}.`);
    set(3, 0, `<b>${n} × 3 = ${3 * n}</b>: thêm ${n} nữa, ${2 * n} + ${n} = ${3 * n}.`);
    const a = Math.max(4, Math.min(10, ask));
    if (a > 4) set(a - 1, 0, `Cứ thêm ${n} vào kết quả trước: ${Array.from({ length: a - 1 }, (_, i) => n * (i + 1)).join(', ')}.`);
    set(a - 1, a, `${n} × ${a} = ?`, { ask: numAsk(n * a, { near: [n, -n, 1], ok: `Đúng rồi! ${n * (a - 1)} + ${n} = ${n * a}.` }) });
    set(10, 0, `Bảng nhân ${n}: các kết quả là đếm thêm ${n}: ${Array.from({ length: 10 }, (_, i) => n * (i + 1)).join(', ')}.`, { result: `${n} × 10 = ${n * 10}` });
  } else {
    set(1, 0, `Từ ${n} × 1 = ${n} ta có <b>${n} : ${n} = 1</b>.`);
    set(2, 0, `Từ ${n} × 2 = ${2 * n} ta có <b>${2 * n} : ${n} = 2</b>.`);
    set(3, 0, `Từ ${n} × 3 = ${3 * n} ta có <b>${3 * n} : ${n} = 3</b>.`);
    const a = Math.max(4, Math.min(10, ask));
    if (a > 4) set(a - 1, 0, `Mỗi dòng: số bị chia thêm ${n}, thương thêm 1.`);
    set(a - 1, a, `${n * a} : ${n} = ? (Nhớ lại: ${n} × ${a} = ${n * a})`, { ask: numAsk(a, { near: [1, -1, 2], ok: `Đúng rồi! Vì ${n} × ${a} = ${n * a} nên ${n * a} : ${n} = ${a}.` }) });
    set(10, 0, `Bảng chia ${n}: lấy bảng nhân ${n} mà suy ra. Thương là 1, 2, 3, …, 10.`, { result: `${n * 10} : ${n} = 10` });
  }
  return s.done();
}

// ── Khối trăm, chục, đơn vị ──────────────────────────────────────────────────
function hundred(x, y, c, { fill = '#93C5FD', stroke = '#1D4ED8' } = {}) {
  let out = rect(x, y, 10 * c, 10 * c, { fill, stroke, sw: 1.5, rx: 1.5 });
  let d = '';
  for (let i = 1; i < 10; i++) d += `M${r1(x + i * c)} ${r1(y)}V${r1(y + 10 * c)}M${r1(x)} ${r1(y + i * c)}H${r1(x + 10 * c)}`;
  return out + path(d, { stroke, sw: 0.6 });
}
function ten(x, y, c, { fill = '#86EFAC', stroke = '#15803D' } = {}) {
  let d = '';
  for (let i = 1; i < 10; i++) d += `M${r1(x)} ${r1(y + i * c)}H${r1(x + c)}`;
  return rect(x, y, c, 10 * c, { fill, stroke, sw: 1.5, rx: 1 }) + path(d, { stroke, sw: 0.6 });
}
const one = (x, y, c) => rect(x, y, c, c, { fill: '#FDE68A', stroke: '#B45309', sw: 1.4, rx: 1 });

function blocks(spec) {
  if (spec.mode === 'units') return blockUnits();
  const { n = 243, mode = 'read' } = spec;
  const h = Math.floor(n / 100), t = Math.floor(n / 10) % 10, u = n % 10;
  const c = h > 6 ? 4.4 : 6, side = 10 * c, hc = h <= 3 ? Math.max(1, h) : Math.ceil(h / 2) > 3 ? 3 : Math.ceil(h / 2), hr = Math.max(1, Math.ceil(h / hc));
  const hw0 = hc * (side + 5), tw0 = Math.max(1, t) * (c + 6), uw0 = 2 * (c + 3);
  const hw = Math.max(76, hw0), tw = Math.max(76, tw0), uw = Math.max(80, uw0);
  const gap = Math.max(6, (344 - hw - tw - uw) / 2);
  const X = 8 + (hw - hw0) / 2, Y = 8, areaH = hr * (side + 5);
  const xT0 = 8 + hw + gap, xU0 = xT0 + tw + gap;
  const xT = xT0 + (tw - tw0) / 2, xU = xU0 + (uw - uw0) / 2;
  const yLab = Y + areaH + 14, yTab = yLab + 20, yLine = yTab + 84, H = mode === 'sum' ? yLine + 18 : yTab + 62;
  const terms = [h * 100, t * 10, u].filter(Boolean);
  const s = stepper(`Số ${n}`, 360, H, (s) => {
    let out = '';
    let hh = '';
    for (let i = 0; i < h; i++) hh += hundred(X + (i % hc) * (side + 5), Y + Math.floor(i / hc) * (side + 5), c);
    out += g(s.c('h'), hh);
    let tt = '';
    for (let i = 0; i < t; i++) tt += ten(xT + i * (c + 6), Y + areaH - side - 5, c);
    out += g(s.c('t'), tt);
    let uu = '';
    for (let i = 0; i < u; i++) uu += one(xU + (i % 2) * (c + 3), Y + areaH - 5 - c - Math.floor(i / 2) * (c + 3), c);
    out += g(s.c('u'), uu);
    out += T(X + hw0 / 2, yLab, `${h} trăm`, { size: 15, fill: '#1D4ED8', cls: s.c('h') });
    out += T(xT + tw0 / 2, yLab, `${t} chục`, { size: 15, fill: '#15803D', cls: s.c('t') });
    out += T(xU + uw0 / 2, yLab, `${u} đơn vị`, { size: 15, fill: '#B45309', cls: s.c('u') });
    // bảng hàng
    const cw = 84, tx = 180 - 1.5 * cw;
    out += rect(tx, yTab, 3 * cw, 56, { fill: '#fff', stroke: C.line, rx: 8 }) + ln(tx, yTab + 22, tx + 3 * cw, yTab + 22, { stroke: C.line, sw: 1.5 })
      + ln(tx + cw, yTab, tx + cw, yTab + 56, { stroke: C.line, sw: 1.5 }) + ln(tx + 2 * cw, yTab, tx + 2 * cw, yTab + 56, { stroke: C.line, sw: 1.5 });
    ['Trăm', 'Chục', 'Đơn vị'].forEach((nm, i) => { out += T(tx + cw * (i + 0.5), yTab + 11, nm, { size: 13, fill: ['#1D4ED8', '#15803D', '#B45309'][i] }); });
    [h, t, u].forEach((d, i) => { out += T(tx + cw * (i + 0.5), yTab + 40, d, { size: 24, fill: ['#1D4ED8', '#15803D', '#B45309'][i], cls: s.c('dig') }); });
    const sumTxt = s.v.sum != null ? `${n} = ${terms.slice(0, s.v.sum).join(' + ')}` : '';
    out += T(180, yLine, sumTxt, { size: 22, fill: C.blue });
    return out;
  });
  s.show('h').snap(h ? `Có <b>${h} tấm</b>, mỗi tấm 100 ô vuông: <b>${h} trăm</b>.` : 'Không có tấm trăm nào: 0 trăm.');
  s.show('t').snap(t ? `Có <b>${t} thanh</b>, mỗi thanh 10 ô vuông: <b>${t} chục</b>.` : 'Không có thanh chục nào: <b>0 chục</b>.');
  s.show('u').snap(u ? `Có <b>${u} ô vuông</b> lẻ: <b>${u} đơn vị</b>.` : 'Không có ô vuông lẻ nào: <b>0 đơn vị</b>.');
  const swap = Number(`${h}${u}${t}`), alt = Number(`${t || 1}${h}${u}`);
  const opts = [...new Set([n, swap, alt])].filter((v) => v >= 100);
  if (opts.length < 3) opts.push(n + 100 <= 999 ? n + 100 : n - 100);
  opts.sort((a, b) => a - b);
  s.snap(`Số gồm ${h} trăm, ${t} chục, ${u} đơn vị là số nào?`, { ask: { options: opts.map(String), answer: opts.indexOf(n), ok: `Đúng rồi! Viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị: <b>${n}</b>.` } });
  s.show('dig').snap(`Viết số: <b>${n}</b>. Đọc số: <b>${docSo(n)}</b>.`, mode === 'read' ? { result: `${n}: ${docSo(n)}` } : {});
  if (mode === 'sum') {
    terms.forEach((x, i) => { s.v.sum = i + 1; s.snap(`${x >= 100 ? `${h} trăm là ${x}` : x >= 10 ? `${t} chục là ${x}` : `${u} đơn vị là ${x}`}.`); });
    s.snap(`Viết số ${n} thành tổng các trăm, chục, đơn vị: <b>${n} = ${terms.join(' + ')}</b>.${terms.length < 3 ? ' Hàng nào là 0 thì không viết vào tổng.' : ''}`, { result: `${n} = ${terms.join(' + ')}` });
  }
  return s.done();
}

function blockUnits() {
  const c = 7.2;
  const s = stepper('Đơn vị, chục, trăm, nghìn', 360, 200, (s) => {
    let out = '';
    const yB = 140; // đáy hình
    out += g(s.c('u'), one(24, yB - c * 1.6, c * 1.6) + T(30, yB + 18, '1 đơn vị', { size: 13, fill: '#B45309' }));
    // 10 đơn vị xếp thành 1 thanh
    let col = '';
    for (let i = 0; i < 10; i++) col += one(92, yB - (i + 1) * c, c);
    out += g(s.c('uu'), col);
    out += g(s.c('t'), ten(92, yB - 10 * c, c) + T(96, yB + 18, '1 chục', { size: 13, fill: '#15803D' }));
    // 10 chục → 1 trăm
    let bars = '';
    for (let i = 0; i < 10; i++) bars += ten(136 + i * c, yB - 10 * c, c);
    out += g(s.c('tt'), bars);
    out += g(s.c('h'), hundred(136, yB - 10 * c, c) + T(136 + 5 * c, yB + 18, '1 trăm', { size: 13, fill: '#1D4ED8' }));
    // 10 trăm → 1 nghìn (khối lập phương)
    let stack = '';
    for (let i = 9; i >= 0; i--) stack += hundred(236 + i * 4.4, yB - 10 * c - i * 4.4, c, { fill: i ? '#BFDBFE' : '#93C5FD' });
    out += g(s.c('hh'), stack);
    out += g(s.c('k'), T(236 + 5 * c + 20, yB + 18, '1 nghìn', { size: 13, fill: '#7C3AED' }) + T(236 + 5 * c + 20, 14, '1 000', { size: 18, fill: '#7C3AED' }));
    out += T(10, 40, s.has('t') ? '10 đơn vị = 1 chục' : '', { size: 12, fill: '#15803D', anchor: 'start' });
    out += T(136, 20, s.has('h') ? '10 chục = 1 trăm' : '', { size: 12, fill: '#1D4ED8', anchor: 'start' });
    return out;
  });
  s.show('u').snap('Mỗi ô vuông nhỏ là <b>1 đơn vị</b>.');
  s.show('uu').snap('Xếp 10 ô vuông thành một cột: <b>10 đơn vị</b>.');
  s.show('t').snap('<b>10 đơn vị = 1 chục</b>. Một thanh chục có 10 ô vuông.');
  s.show('tt').snap('Xếp 10 thanh chục cạnh nhau. 10 chục bằng mấy?', { ask: { options: ['1 trăm', '1 nghìn', '10 đơn vị'], answer: 0, ok: 'Đúng rồi! <b>10 chục = 1 trăm</b>. Một tấm trăm có 100 ô vuông.' } });
  s.show('h').snap('<b>10 chục = 1 trăm</b>. Một tấm trăm có 100 ô vuông.');
  s.show('hh').snap('Xếp chồng 10 tấm trăm thành một khối.');
  s.show('k').snap('<b>10 trăm = 1 nghìn</b>. Một nghìn viết là <b>1 000</b>.', { result: '10 trăm = 1 nghìn' });
  return s.done();
}

// ── Số tròn trăm, tròn chục trên tia số ──────────────────────────────────────
function round({ step = 100, lo = 0, missing }) {
  const vals = Array.from({ length: 11 }, (_, i) => lo + i * step);
  const miss = missing || (step === 100 ? [300, 700] : [lo + 30, lo + 80]);
  const X0 = 22, X1 = 338, y = 78, xs = (i) => X0 + (i * (X1 - X0)) / 10;
  const s = stepper(step === 100 ? 'Các số tròn trăm' : `Các số tròn chục từ ${lo} đến ${lo + 100}`, 360, 150, (s) => {
    let out = ln(X0 - 10, y, X1 + 14, y, { stroke: C.ink, sw: 2.5 }) + path(`M${X1 + 8} ${y - 6}L${X1 + 16} ${y}L${X1 + 8} ${y + 6}`, { stroke: C.ink, sw: 2.5 });
    vals.forEach((v, i) => {
      out += ln(xs(i), y - 8, xs(i), y + 8, { stroke: C.ink, sw: 2 });
      const m = miss.includes(v), filled = s.has(`f${v}`);
      const fs = v >= 1000 ? 11 : 12.5, lx = v >= 1000 ? xs(i) + 7 : xs(i);
      if (m && !filled) out += g(s.c('lab'), rect(xs(i) - 14, y + 14, 28, 22, { fill: '#FFF7ED', stroke: C.orange, sw: 2, rx: 5 }) + T(xs(i), y + 26, '?', { size: 15, fill: C.orange }));
      else out += T(lx, y + 26, fmtVN(v), { size: fs, fill: m ? C.green : C.ink, cls: m ? s.c(`f${v}`) : s.c('lab') });
      if (i < 10) out += g(s.c('hop'), path(`M${r1(xs(i) + 2)} ${y - 10}Q${r1((xs(i) + xs(i + 1)) / 2)} ${y - 34} ${r1(xs(i + 1) - 2)} ${y - 10}`, { stroke: C.blue, sw: 2 }), delay(i, 0.08));
    });
    out += T(180, 22, s.has('hop') ? `Mỗi bước thêm ${step}` : '', { size: 15, fill: C.blue });
    out += T(180, 134, s.has('end') ? (step === 100 ? 'Số tròn trăm: hai chữ số cuối là 0 0' : 'Số tròn chục: chữ số hàng đơn vị là 0') : '', { size: 15, fill: C.violet });
    return out;
  });
  s.show('lab').snap(step === 100 ? 'Tia số có các số <b>100, 200, 300, …, 1 000</b>: đó là các số <b>tròn trăm</b>.' : `Các số <b>${lo}, ${lo + 10}, ${lo + 20}, …</b> là các số <b>tròn chục</b>.`);
  s.show('hop').snap(`Từ vạch này sang vạch bên phải là thêm <b>${step}</b>.`);
  miss.forEach((v, i) => {
    s.snap(`Ô ${i ? 'thứ hai' : 'thứ nhất'} ghi số nào? (Đếm thêm ${step} từ ${fmtVN(v - step)})`, { ask: numAsk(v, { near: [step, -step], fmtFn: fmtVN, ok: `Đúng rồi! ${fmtVN(v - step)} thêm ${step} là ${fmtVN(v)}.` }) });
    s.show(`f${v}`).snap(`Ô đó là <b>${fmtVN(v)}</b>.`);
  });
  s.show('end').snap(step === 100 ? 'Số tròn trăm có chữ số hàng chục và hàng đơn vị đều là <b>0</b>: 100, 200, …, 900. Mười trăm là 1 000.' : 'Số tròn chục có chữ số hàng đơn vị là <b>0</b>.', { result: step === 100 ? '100, 200, 300, …, 900, 1 000' : `${lo}, ${lo + 10}, ${lo + 20}, …, ${lo + 100}` });
  return s.done();
}

// ── Đề-xi-mét, mét, ki-lô-mét ────────────────────────────────────────────────
function ruler({ mode = 'dm' }) {
  if (mode === 'dm') {
    const X0 = 30, cm = 30;
    const s = stepper('1 dm = 10 cm', 360, 150, (s) => {
      let out = rect(X0 - 14, 70, 10 * cm + 28, 52, { fill: '#FEF3C7', stroke: '#D97706', sw: 2, rx: 6 });
      for (let i = 0; i <= 10; i++) {
        out += ln(X0 + i * cm, 70, X0 + i * cm, 88, { stroke: C.ink, sw: 2 });
        if (i < 10) out += ln(X0 + i * cm + cm / 2, 70, X0 + i * cm + cm / 2, 80, { stroke: C.ink, sw: 1.2 });
        out += T(X0 + i * cm, 102, i, { size: 14 });
      }
      out += T(X0 + 5 * cm, 116, 'cm', { size: 11, fill: C.soft });
      out += rect(X0, 46, cm, 16, { fill: C.blue, rx: 3, cls: s.c('one', 'is-grow') });
      out += T(X0 + cm / 2, 34, '1 cm', { size: 13, fill: C.blue, cls: s.c('one') });
      out += rect(X0, 46, 10 * cm, 16, { fill: C.orange, rx: 3, cls: s.c('ten', 'is-grow'), op: '0.9' });
      out += g(s.c('dm'), path(hbrace(X0, X0 + 10 * cm, 40, -1), { stroke: C.violet, sw: 2 }) + T(X0 + 5 * cm, 18, '1 dm = 10 cm', { size: 16, fill: C.violet }));
      return out;
    });
    s.snap('Thước kẻ có các vạch từ <b>0</b> đến <b>10</b> xăng-ti-mét.');
    s.show('one').snap('Từ vạch 0 đến vạch 1 dài <b>1 cm</b>.');
    s.hide('one').show('ten').snap('Đoạn từ vạch 0 đến vạch 10 dài <b>10 cm</b>.');
    s.snap('Độ dài 10 cm còn gọi là gì?', { ask: { options: ['1 dm', '1 m', '1 km'], answer: 0, ok: 'Đúng rồi! 10 cm là <b>1 đề-xi-mét</b>, viết tắt là dm.' } });
    s.show('dm').snap('<b>Đề-xi-mét</b> viết tắt là <b>dm</b>. 1 dm = 10 cm. Ngược lại 10 cm = 1 dm.', { result: '1 dm = 10 cm' });
    return s.done();
  }
  const X0 = 30, dm = 30;
  const s = stepper('1 m = 10 dm = 100 cm', 360, 150, (s) => {
    let out = '';
    let segs = '';
    for (let i = 0; i < 10; i++) {
      segs += g(i ? s.c('all') : s.c('d1'), rect(X0 + i * dm, 60, dm, 26, { fill: i % 2 ? '#FDBA74' : '#FCD34D', stroke: '#B45309', sw: 1.5, rx: 2 }) + T(X0 + i * dm + dm / 2, 73, i + 1, { size: 12, fill: '#7C2D12' }), i ? delay(i, 0.08) : '');
    }
    out += g(s.has('road') ? 'kd-ghost' : '', segs);
    out += T(X0 + dm / 2, 100, s.has('road') ? '' : '1 dm', { size: 12, fill: '#B45309', cls: s.c('d1') });
    out += g(s.has('road') ? 'kd-ghost' : s.c('m'), path(hbrace(X0, X0 + 10 * dm, 54, -1), { stroke: C.violet, sw: 2 }) + T(180, 32, '1 m = 10 dm', { size: 16, fill: C.violet }));
    out += T(180, 120, s.has('cm') && !s.has('road') ? '1 m = 100 cm' : '', { size: 18, fill: C.blue });
    // đường 1 km
    let road = rect(X0 - 10, 64, 10 * dm + 20, 22, { fill: '#94A3B8', rx: 4 }) + ln(X0 - 6, 75, X0 + 10 * dm + 6, 75, { stroke: '#fff', sw: 2, dash: '8 7' });
    for (let i = 0; i <= 10; i++) road += ln(X0 + i * dm, 58, X0 + i * dm, 92, { stroke: C.ink, sw: i % 5 ? 1.5 : 2.5 }) + (i && i % 5 === 0 ? T(X0 + i * dm, 104, `${fmtVN(i * 100)} m`, { size: 12 }) : '');
    road += T(X0, 104, '0', { size: 12 }) + path(hbrace(X0, X0 + 10 * dm, 54, -1), { stroke: C.green, sw: 2 }) + T(180, 32, s.has('km') ? '1 km = 1 000 m' : 'Mỗi đoạn 100 m', { size: 16, fill: C.green });
    out += g(s.c('road'), road);
    return out;
  });
  s.show('d1').snap('Mỗi đoạn vàng dài <b>1 dm</b> (10 cm).');
  s.show('all').snap('Xếp 10 đoạn 1 dm nối nhau. Đoạn dài này bằng mấy đề-xi-mét?', { ask: numAsk(10, { near: [-1, 1, 90], ok: 'Đúng rồi! 10 dm.' }) });
  s.show('m').snap('<b>10 dm = 1 m</b>. Mét viết tắt là <b>m</b>.');
  s.snap('1 m bằng bao nhiêu xăng-ti-mét? (Mỗi dm là 10 cm)', { ask: { options: ['10 cm', '100 cm', '1 000 cm'], answer: 1, ok: 'Đúng rồi! 10 lần 10 cm là <b>100 cm</b>.' } });
  s.show('cm').snap('<b>1 m = 10 dm</b>, <b>1 m = 100 cm</b>.');
  s.show('road').snap('Đo quãng đường dài, ta dùng <b>ki-lô-mét</b>. Con đường có 10 đoạn, mỗi đoạn 100 m.');
  s.snap('10 đoạn, mỗi đoạn 100 m. Cả con đường dài bao nhiêu mét?', { ask: { options: ['100 m', '1 000 m', '10 m'], answer: 1, ok: 'Đúng rồi! 1 000 m.' } });
  s.show('km').snap('<b>1 km = 1 000 m</b>. Ki-lô-mét viết tắt là <b>km</b>.', { result: '1 m = 10 dm = 100 cm · 1 km = 1 000 m' });
  return s.done();
}

// ── Tiền Việt Nam ────────────────────────────────────────────────────────────
function money({ notes = [200, 200, 100] }) {
  const kinds = [100, 200, 500, 1000];
  const total = notes.reduce((a, b) => a + b, 0);
  const nw = Math.min(84, (340 - (notes.length - 1) * 10) / notes.length), nh = nw / 2;
  const NX = 180 - (notes.length * nw + (notes.length - 1) * 10) / 2;
  const s = stepper('Tiền Việt Nam', 360, 190, (s) => {
    let out = '';
    kinds.forEach((v, i) => { out += g(s.c('kinds'), `<g transform="translate(${8 + i * 88} 8)">${noteBody(v)}</g>`, delay(i, 0.15)); });
    out += T(180, 64, s.has('kinds') ? '100 đồng · 200 đồng · 500 đồng · 1 000 đồng' : '', { size: 13, fill: C.soft });
    out += rect(4, 78, 352, 70, { fill: '#F0FDF4', rx: 12, cls: s.c('pay', 'is-fade') });
    const k = s.v.k || 0;
    notes.forEach((v, i) => { out += g(i < k ? (i === k - 1 ? 'is-new' : '') : 'kd-ghost', `<g transform="translate(${r1(NX + i * (nw + 10))} ${r1(113 - nh / 2)}) scale(${r1(nw / 80 * 100) / 100})">${noteBody(v)}</g>`); });
    const run = notes.slice(0, k);
    out += T(180, 170, k ? `${run.map(fmtVN).join(' + ')}${s.has('tot') ? ` = ${fmtVN(total)}` : ''} (đồng)` : '', { size: 17, fill: C.blue });
    return out;
  });
  s.show('kinds').snap('Một số tờ tiền Việt Nam: <b>100 đồng, 200 đồng, 500 đồng, 1 000 đồng</b>. Số trên tờ tiền cho biết tờ tiền đó là bao nhiêu đồng.');
  s.show('pay');
  notes.forEach((v, i) => { s.v.k = i + 1; s.snap(i ? `Thêm tờ <b>${fmtVN(v)} đồng</b>.` : `Mai có tờ <b>${fmtVN(v)} đồng</b>.`); });
  s.snap(`Mai có tất cả bao nhiêu tiền?`, { ask: numAsk(total, { near: [100, -100, 200], fmtFn: (x) => `${fmtVN(x)} đồng`, ok: `Đúng rồi! ${notes.map(fmtVN).join(' + ')} = ${fmtVN(total)}.` }) });
  s.show('tot').snap(`Cộng các tờ tiền lại: Mai có <b>${fmtVN(total)} đồng</b>.`, { result: `${fmtVN(total)} đồng` });
  return s.done();
}

// ── Kiểm đếm ─────────────────────────────────────────────────────────────────
function tallyMarks(x, y, n, { h = 20, gap = 6, stroke = C.ink, cls = '' } = {}) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const grp = Math.floor(i / 5), k = i % 5, gx = x + grp * (4 * gap + 14);
    if (k < 4) out += ln(gx + k * gap, y, gx + k * gap, y + h, { stroke, sw: 2.4 });
    else out += ln(gx - 4, y + h - 3, gx + 3 * gap + 4, y + 3, { stroke: C.red, sw: 2.4 });
  }
  return g(cls, out);
}
function tally({ unit = 'quả', items = 'TCTBTCBTTC', cats = { T: ['tao', 'Táo'], C: ['cam', 'Cam'], B: ['chuoi', 'Chuối'] } }) {
  const keys = Object.keys(cats), N = items.length;
  const pc = Math.min(N, 8), pr = Math.ceil(N / pc), isz = Math.min(36, 330 / pc);
  const PX = 180 - (pc * isz) / 2, PY = 8, TY = PY + pr * isz + 14, rh = 32, H = TY + keys.length * rh + 8;
  const cnt = Object.fromEntries(keys.map((k) => [k, [...items].filter((x) => x === k).length]));
  const s = stepper('Kiểm đếm bằng vạch', 360, H, (s) => {
    let out = '';
    const cur = s.v.cur;
    [...items].forEach((ch, i) => {
      const x = PX + (i % pc) * isz, y = PY + Math.floor(i / pc) * isz;
      if (ch === cur) out += circ(x + isz / 2, y + isz / 2, isz * 0.48, { fill: '#FEF08A' });
      out += g(s.has(`d${ch}`) && ch !== cur ? 'kd-dim' : '', artAt(cats[ch][0], x + 2, y + 2, isz - 4));
    });
    keys.forEach((k, i) => {
      const y = TY + i * rh;
      out += rect(6, y, 348, rh - 4, { fill: k === cur ? '#FEF9C3' : '#F8FAFC', stroke: C.line, rx: 8 });
      out += artAt(cats[k][0], 12, y + 1, rh - 6) + T(48, y + rh / 2 - 2, cats[k][1], { size: 14, anchor: 'start' });
      out += tallyMarks(130, y + 5, cnt[k], { h: rh - 14, cls: s.c(`d${k}`) });
      out += T(334, y + rh / 2 - 2, cnt[k], { size: 18, fill: C.blue, cls: s.c(`n${k}`) });
    });
    return out;
  });
  s.v.cur = null;
  s.snap(`Có ${N} đồ vật. Em đếm xem mỗi loại có bao nhiêu. Mỗi đồ vật đếm được, vạch <b>một vạch</b>.`);
  keys.forEach((k, i) => {
    s.v.cur = k;
    const nm = `${unit} ${cats[k][1].toLowerCase()}`;
    if (i === 1) {
      s.show(`d${k}`).snap(`Đếm ${nm}: mỗi lần thấy một ${nm} thì vạch một vạch. Vạch thứ năm gạch chéo qua bốn vạch trước. Có mấy ${nm}?`, { ask: numAsk(cnt[k], { near: [1, -1, 2], ok: `Đúng rồi! Có ${cnt[k]} vạch, vậy có ${cnt[k]} ${nm}.` }) });
      s.show(`n${k}`).snap(`${cats[k][1]}: <b>${cnt[k]}</b>.`);
    } else s.show(`d${k}`, `n${k}`).snap(`${cats[k][1]}: ${cnt[k]} vạch, viết số <b>${cnt[k]}</b>.`);
  });
  s.v.cur = null;
  s.snap('Kiểm đếm xong. Đếm vạch, cứ mỗi nhóm có gạch chéo là 5.', { result: keys.map((k) => `${cats[k][1]}: ${cnt[k]}`).join(' · ') });
  return s.done();
}

// ── Biểu đồ tranh ────────────────────────────────────────────────────────────
function picto({ rows = [['tao', 'Táo', 4], ['cam', 'Cam', 6], ['le', 'Lê', 3]], what = 'Số quả Mai hái được' }) {
  const rh = 40, Y0 = 26, X1 = 92, max = Math.max(...rows.map((r) => r[2])), isz = Math.min(34, 248 / max);
  const H = Y0 + rows.length * rh + 30;
  const big = rows.reduce((m, r, i) => (r[2] > rows[m][2] ? i : m), 0), small = rows.reduce((m, r, i) => (r[2] < rows[m][2] ? i : m), 0);
  const s = stepper(what, 360, H, (s) => {
    let out = T(180, 12, what, { size: 14, fill: C.soft });
    rows.forEach(([ic, nm, n], i) => {
      const y = Y0 + i * rh;
      out += rect(4, y, 352, rh - 4, { fill: s.has(`h${i}`) ? '#FEF9C3' : i % 2 ? '#F8FAFC' : '#fff', stroke: C.line, rx: 8 });
      out += T(46, y + rh / 2 - 2, nm, { size: 15 });
      out += ln(X1, y + 3, X1, y + rh - 7, { stroke: C.line });
      for (let j = 0; j < n; j++) out += g(s.c('chart'), artAt(ic, X1 + 6 + j * isz, y + (rh - 4 - isz) / 2, isz - 2), delay(i * 3 + j, 0.04));
      out += T(346, y + rh / 2 - 2, n, { size: 17, fill: C.blue, anchor: 'end', cls: s.c(`n${i}`) });
    });
    out += T(180, H - 12, 'Mỗi hình chỉ 1 quả', { size: 13, fill: C.violet, cls: s.c('chart') });
    return out;
  });
  s.show('chart').snap(`Biểu đồ tranh: <b>${what.toLowerCase()}</b>. Mỗi hàng là một loại, mỗi hình chỉ 1 quả.`);
  s.show('h0', 'n0').snap(`Hàng ${rows[0][1].toLowerCase()} có ${rows[0][2]} hình: <b>${rows[0][2]} quả ${rows[0][1].toLowerCase()}</b>.`);
  s.hide('h0').show('h1').snap(`Hàng ${rows[1][1].toLowerCase()} có mấy hình?`, { ask: numAsk(rows[1][2], { near: [1, -1, 2], ok: `Đúng rồi! ${rows[1][2]} quả ${rows[1][1].toLowerCase()}.` }) });
  s.hide('h1').show(rows.map((_, i) => `n${i}`)).snap('Loại quả nào nhiều nhất?', { ask: { options: rows.map((r) => r[1]), answer: big, ok: `Đúng rồi! Hàng ${rows[big][1].toLowerCase()} dài nhất, có ${rows[big][2]} hình.` } });
  s.snap(`Hàng dài nhất là nhiều nhất, hàng ngắn nhất là ít nhất: ${rows[small][1].toLowerCase()} ít nhất.`, { result: rows.map((r) => `${r[1]}: ${r[2]}`).join(' · ') });
  return s.done();
}

// ── Chắc chắn, có thể, không thể ─────────────────────────────────────────────
const WORDS = ['chắc chắn', 'có thể', 'không thể'];
function chance({ box = ['xanh', 'xanh', 'xanh', 'đỏ'], ask }) {
  const colors = Object.keys(BALL);
  const asks = ask || colors.filter((c) => box.includes(c)).concat(colors.filter((c) => !box.includes(c)).slice(0, 1));
  const kindOf = (c) => (box.every((b) => b === c) ? 0 : box.includes(c) ? 1 : 2);
  const count = (c) => box.filter((b) => b === c).length;
  const desc = colors.filter((c) => box.includes(c)).map((c) => `${count(c)} quả bóng ${c}`).join(', ');
  const bs = Math.min(40, 220 / box.length);
  const s = stepper('Chắc chắn, có thể, không thể', 360, 150, (s) => {
    let out = path('M60 40h240l-14 100H74z', { fill: '#FDE68A', stroke: '#B45309', sw: 3 }) + path('M50 40h260', { stroke: '#B45309', sw: 5 });
    box.forEach((c, i) => { out += `<g transform="translate(${r1(180 - (box.length * bs) / 2 + i * bs)} ${r1(88 - bs / 2 + (i % 2) * 8)}) scale(${r1(bs / 40 * 100) / 100})">${ballBody(c)}</g>`; });
    const cur = s.v.cur;
    if (cur) out += g('is-new', `<g transform="translate(316 6) scale(0.9)">${ballBody(cur)}</g>`) + T(334, 54, '?', { size: 18, fill: C.ink });
    return out;
  });
  s.snap(`Trong hộp có ${desc}. Không nhìn vào hộp, lấy ra 1 quả bóng.`);
  asks.forEach((c) => {
    s.v.cur = c;
    const k = kindOf(c);
    const why = k === 0 ? `Trong hộp toàn bóng ${c}, lấy quả nào cũng là bóng ${c}.` : k === 1 ? `Trong hộp có bóng ${c} và có bóng màu khác, có lúc lấy được bóng ${c}, có lúc không.` : `Trong hộp không có quả bóng ${c} nào.`;
    s.snap(`Lấy được quả bóng <b>${c}</b> là ... ?`, { ask: { options: WORDS.map(cap), answer: k, ok: `Đúng rồi! <b>${cap(WORDS[k])}</b>. ${why}` } });
  });
  s.v.cur = null;
  s.snap('Toàn là thì <b>chắc chắn</b>. Có nhưng còn màu khác thì <b>có thể</b>. Không có thì <b>không thể</b>.', { result: 'chắc chắn · có thể · không thể' });
  return s.done();
}

// ── Khối trụ, khối cầu ───────────────────────────────────────────────────────
function solids() {
  const items = [['lon', 0], ['bong', 1], ['trong', 0], ['cam', 1], ['nen', 0], ['dia', 1]];
  const s = stepper('Khối trụ, khối cầu', 360, 182, (s) => {
    let out = '';
    // khối trụ mẫu
    out += g('', path('M30 30v54q34 16 68 0V30', { fill: '#BFDBFE', stroke: '#1D4ED8', sw: 2.5 }) + `<ellipse cx="64" cy="30" rx="34" ry="10" fill="#DBEAFE" stroke="#1D4ED8" stroke-width="2.5"/>`
      + path('M30 84q34 -16 68 0', { stroke: '#1D4ED8', sw: 1.5, dash: '4 4' }) + T(64, 112, 'Khối trụ', { size: 15, fill: '#1D4ED8' }));
    // khối cầu mẫu
    out += g('', circ(296, 58, 38, { fill: '#FBCFE8', stroke: '#BE185D', sw: 2.5 }) + `<ellipse cx="296" cy="58" rx="38" ry="11" fill="none" stroke="#BE185D" stroke-width="1.5" stroke-dasharray="4 4"/>`
      + T(296, 112, 'Khối cầu', { size: 15, fill: '#BE185D' }));
    // đồ vật
    items.forEach(([k, t], i) => {
      const x = 8 + i * 58, y = 124;
      const on = (t === 0 && s.has('cyl')) || (t === 1 && s.has('sph'));
      if (on) out += rect(x - 1, y - 1, 56, 56, { fill: t ? '#FCE7F3' : '#DBEAFE', stroke: t ? '#BE185D' : '#1D4ED8', sw: 2, rx: 10, cls: 'is-new' });
      out += artAt(k, x + 3, y + 3, 48);
    });
    return out;
  });
  s.snap('<b>Khối trụ</b> có hai mặt đáy là hình tròn, thân tròn đều. <b>Khối cầu</b> tròn đều mọi phía, như quả bóng.');
  s.show('cyl').snap('Lon nước, cái trống, cây nến có dạng <b>khối trụ</b>.');
  s.hide('cyl').snap('Quả bóng có dạng khối gì?', { ask: { options: ['Khối trụ', 'Khối cầu'], answer: 1, ok: 'Đúng rồi! Quả bóng tròn đều mọi phía: <b>khối cầu</b>.' } });
  s.show('sph').snap('Quả bóng, quả cam, quả địa cầu có dạng <b>khối cầu</b>.');
  s.hide('sph').snap('Cái trống có dạng khối gì?', { ask: { options: ['Khối trụ', 'Khối cầu'], answer: 0, ok: 'Đúng rồi! Cái trống có hai mặt tròn, thân thẳng: <b>khối trụ</b>.' } });
  s.show('cyl', 'sph').snap('Khối trụ đặt đứng được và lăn được. Khối cầu lăn được về mọi phía.', { result: 'Khối trụ · Khối cầu' });
  return s.done();
}

const CSS = `
  .kd-svg .kd-dim { opacity: 0.3; }
`;

registerDemos({
  'g2b-groups': groups, 'g2b-table': table, 'g2b-blocks': blocks, 'g2b-round': round, 'g2b-ruler': ruler,
  'g2b-money': money, 'g2b-tally': tally, 'g2b-picto': picto, 'g2b-chance': chance, 'g2b-solids': solids,
}, CSS, 'g2b');
