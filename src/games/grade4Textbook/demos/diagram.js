/**
 * Ví dụ sơ đồ, biểu đồ, tia số (📘 Kiến thức SGK Toán 4), vẽ bằng SVG. Mọi bước của một ví dụ dùng cùng một viewBox
 * và cùng bố cục: phần chưa tới vẫn có trong hình nhưng ẩn (kd-ghost), nên hình không nhảy giữa các bước.
 *
 *   { kind: 'sumDiff', sum: 70, diff: 10, way: 1 | 2 }                       Bài 37  tổng và hiệu
 *   { kind: 'ratioParts', mode: 'sum' | 'diff', total, a, b, names, unit, first } Bài 138, 142 (first: 1 tính số thứ hai trước)
 *   { kind: 'ratio', a: 5, b: 7 }                                             Bài 137 xe tải, xe khách
 *   { kind: 'avg', values: [6, 4], unit: 'lít' } | { values, unit, names, each } Bài 22 (≤ 10 thì xếp khối, lớn hơn thì vẽ cột)
 *   { kind: 'picto' }                                                         Bài 24 các con của năm gia đình
 *   { kind: 'barchart', items: [[tên, số]…], max, step, prefix, what }        Bài 25
 *   { kind: 'numline' }                                                       Bài 14 tia số
 *   { kind: 'century', year: 1945 }                                           Bài 20
 *   { kind: 'mapScale', mode: 'real' | 'map', scale, map | real, mapUnit, realUnit, thing: 'gate' | 'road', what } Bài 147–149
 *   { kind: 'array', cols: 7, rows: 5 }                                       Bài 50
 *   { kind: 'distrib', a: 4, b: 3, c: 5, op: '+' | '-' }                      Bài 56, 57
 */

import { frames, svg, C, fmt, fr, numAsk } from './util.js';

// ── Dụng cụ vẽ ───────────────────────────────────────────────────────────────
const T = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '', style = '' } = {}) =>
  `<text x="${r1(x)}" y="${r1(y)}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle"${cls ? ` class="${cls}"` : ''}${style ? ` style="${style}"` : ''}>${t}</text>`;
const r1 = (v) => Math.round(v * 10) / 10;
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

/** Ngoặc nhọn nằm ngang trên/dưới đoạn x1..x2 (dir −1: mũi lên trên, 1: mũi xuống dưới). */
function hbrace(x1, x2, y, dir = -1, d = 7) {
  d = Math.min(d, (x2 - x1) / 4);
  const m = (x1 + x2) / 2, e = y + dir * d, t = y + dir * 2 * d;
  return `M${r1(x1)} ${y}Q${r1(x1)} ${e} ${r1(x1 + d)} ${e}L${r1(m - d)} ${e}Q${r1(m)} ${e} ${r1(m)} ${t}Q${r1(m)} ${e} ${r1(m + d)} ${e}L${r1(x2 - d)} ${e}Q${r1(x2)} ${e} ${r1(x2)} ${y}`;
}
/** Ngoặc nhọn đứng bên phải đoạn y1..y2 (mũi sang phải). */
function vbrace(x, y1, y2, d = 7) {
  d = Math.min(d, (y2 - y1) / 4);
  const m = (y1 + y2) / 2, e = x + d, t = x + 2 * d;
  return `M${x} ${r1(y1)}Q${e} ${r1(y1)} ${e} ${r1(y1 + d)}L${e} ${r1(m - d)}Q${e} ${r1(m)} ${t} ${r1(m)}Q${e} ${r1(m)} ${e} ${r1(m + d)}L${e} ${r1(y2 - d)}Q${e} ${r1(y2)} ${x} ${r1(y2)}`;
}
/** Phân số trong svg: tử, gạch, mẫu, tâm (x, y) ở gạch ngang. */
function sfr(x, y, a, b, { size = 20, fill = C.ink, cls = '', style = '' } = {}) {
  const w = Math.max(String(a).length, String(b).length) * size * 0.62 + 8;
  return g(cls, T(x, y - size * 0.6, a, { size, fill }) + ln(x - w / 2, y, x + w / 2, y, { stroke: fill, sw: 2.2 }) + T(x, y + size * 0.62, b, { size, fill }), style);
}
/** Cỡ chữ cho một dòng tính vừa bề ngang (từ 14 tới max). */
const fit = (t, max = 16, avail = 334) => Math.max(14, Math.min(max, Math.floor(avail / (String(t).replace(/<[^>]+>/g, '').length * 0.55))));
/** Các dòng lời giải dưới hình (khoá L0, L1, …). */
const calcLines = (s, lines, y0, gap, { x = 14, max = 16 } = {}) =>
  lines.map((t, i) => T(x, y0 + i * gap, t, { size: fit(t, max, 360 - x - 8), anchor: 'start', cls: s.c(`L${i}`) })).join('');

/**
 * Bộ bước: s.show(khoá…) hiện phần mới (có hiệu ứng ở bước này), s.hide(khoá…) cất đi, s.c(khoá, hiệu ứng) cho class,
 * s.snap(lời, { result, ask }) chụp một bước. draw(s) vẽ cả hình từ trạng thái hiện tại.
 */
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

const unitTail = (u) => (!u ? '' : u.length <= 2 ? u : ` ${u}`);
const paren = (u) => (u ? ` (${u})` : '');

// ── Bài 37: tìm hai số khi biết tổng và hiệu ─────────────────────────────────
function sumDiff(spec) {
  const { sum = 70, diff = 10, way = 1 } = spec;
  const big = (sum + diff) / 2, small = (sum - diff) / 2;
  const X0 = 78, LEN = 200, h = 28, yB = 50, yS = 112;
  const ext = Math.max(28, Math.min(110, Math.round((LEN * diff) / big))), sw = LEN - ext;
  const lines = way === 1
    ? [`Hai lần số bé: ${fmt(sum)} − ${fmt(diff)} = ${fmt(sum - diff)}`, `Số bé: ${fmt(sum - diff)} : 2 = ${fmt(small)}`, `Số lớn: ${fmt(small)} + ${fmt(diff)} = ${fmt(big)}`]
    : [`Hai lần số lớn: ${fmt(sum)} + ${fmt(diff)} = ${fmt(sum + diff)}`, `Số lớn: ${fmt(sum + diff)} : 2 = ${fmt(big)}`, `Số bé: ${fmt(big)} − ${fmt(diff)} = ${fmt(small)}`];
  const s = stepper(`Tổng ${fmt(sum)}, hiệu ${fmt(diff)}: tìm hai số`, 360, 250, (s) => {
    let b = T(10, yB + h / 2, 'Số lớn', { anchor: 'start', size: 15, fill: C.orange });
    b += T(10, yS + h / 2, 'Số bé', { anchor: 'start', size: 15, fill: C.blue });
    b += g(s.c('bars', 'is-grow'),
      rect(X0, yB, sw, h, { fill: C.orangeL, stroke: C.orange }) + rect(X0 + sw, yB, ext, h, { fill: C.orangeL, stroke: C.orange })
      + rect(X0, yS, sw, h, { fill: C.blueL, stroke: C.blue }));
    // bớt hiệu (cách 1): phần thừa mờ đi, gạch chéo
    b += g(s.c('cut', 'is-fade'), rect(X0 + sw, yB, ext, h, { fill: '#fff', stroke: C.soft, dash: '4 3', op: 0.85 })
      + ln(X0 + sw + 6, yB + 5, X0 + LEN - 6, yB + h - 5, { stroke: C.red, sw: 2.5 }) + ln(X0 + sw + 6, yB + h - 5, X0 + LEN - 6, yB + 5, { stroke: C.red, sw: 2.5 }));
    b += rect(X0 + sw, yB, ext, h, { fill: C.orangeL, stroke: C.orange, cls: s.c('back', 'is-fade') });
    // thêm hiệu (cách 2): đoạn đứt nét nối dài số bé
    b += rect(X0 + sw, yS, ext, h, { fill: C.blueL, stroke: C.blue, dash: '5 4', op: 0.9, cls: s.c('add', 'is-grow') });
    // hiệu
    b += g(s.c('diff'), ln(X0 + sw, yB, X0 + sw, yS + h, { stroke: C.soft, sw: 1.5, dash: '4 4' })
      + path(hbrace(X0 + sw, X0 + LEN, yB - 4), { stroke: C.violet }) + T(X0 + sw + ext / 2, yB - 30, `hiệu ${fmt(diff)}`, { size: 15, fill: C.violet }));
    // tổng
    const my = (yB + yS + h) / 2;
    b += g(s.c('sum'), path(vbrace(X0 + LEN + 8, yB, yS + h), { stroke: C.green }) + T(326, my - 10, 'Tổng', { size: 15, fill: C.green }) + T(326, my + 10, fmt(sum), { size: 17, fill: C.green }));
    // giá trị trên hai đoạn
    b += T(X0 + LEN / 2, yB + h / 2, s.has('vB') ? fmt(big) : '?', { size: 16, fill: s.has('vB') ? C.ink : C.soft, cls: s.has('vB') ? s.c('vB') : '' });
    b += T(X0 + sw / 2, yS + h / 2, s.has('vS') ? fmt(small) : '?', { size: 16, fill: s.has('vS') ? C.ink : C.soft, cls: s.has('vS') ? s.c('vS') : '' });
    b += calcLines(s, lines, 182, 26);
    return b;
  });
  s.show('bars').snap(`Tổng hai số là <b>${fmt(sum)}</b>, hiệu là <b>${fmt(diff)}</b>. Vẽ hai đoạn thẳng: đoạn <b>số lớn</b> dài hơn đoạn <b>số bé</b>.`);
  s.show('diff').snap(`Phần số lớn dài hơn số bé chính là <b>hiệu ${fmt(diff)}</b>.`);
  s.show('sum').snap(`Cả hai đoạn gộp lại là <b>tổng ${fmt(sum)}</b>.`);
  if (way === 1) {
    s.show('cut').snap('<b>Cách 1:</b> bớt phần hiệu ở số lớn. Số lớn còn bằng số bé, hai đoạn bằng nhau là <b>hai lần số bé</b>.');
    s.show('L0').snap(`Hai lần số bé là <b>${fmt(sum)} − ${fmt(diff)} = ${fmt(sum - diff)}</b>.`);
    s.snap(`Số bé là ${fmt(sum - diff)} : 2 = ?`, { ask: numAsk(small, { near: [2, -2, 10], ok: `Đúng rồi! ${fmt(sum - diff)} : 2 = ${fmt(small)}.` }) });
    s.show('L1', 'vS').snap(`Chia hai lần số bé thành 2 phần bằng nhau: <b>số bé là ${fmt(small)}</b>.`);
    s.hide('cut').show('back', 'L2', 'vB').snap(`Số bé thêm hiệu thì được số lớn: <b>${fmt(small)} + ${fmt(diff)} = ${fmt(big)}</b>.`, { result: `Số lớn ${fmt(big)}; số bé ${fmt(small)}` });
  } else {
    s.show('add').snap('<b>Cách 2:</b> thêm vào số bé một đoạn bằng hiệu. Số bé thành bằng số lớn, hai đoạn bằng nhau là <b>hai lần số lớn</b>.');
    s.show('L0').snap(`Hai lần số lớn là <b>${fmt(sum)} + ${fmt(diff)} = ${fmt(sum + diff)}</b>.`);
    s.snap(`Số lớn là ${fmt(sum + diff)} : 2 = ?`, { ask: numAsk(big, { near: [2, -2, 10], ok: `Đúng rồi! ${fmt(sum + diff)} : 2 = ${fmt(big)}.` }) });
    s.show('L1', 'vB').snap(`Chia hai lần số lớn thành 2 phần bằng nhau: <b>số lớn là ${fmt(big)}</b>.`);
    s.hide('add').show('L2', 'vS').snap(`Số lớn bớt hiệu thì được số bé: <b>${fmt(big)} − ${fmt(diff)} = ${fmt(small)}</b>.`, { result: `Số lớn ${fmt(big)}; số bé ${fmt(small)}` });
  }
  return s.done();
}

// ── Bài 138, 142: tổng (hiệu) và tỉ số ───────────────────────────────────────
function ratioParts(spec) {
  const { mode = 'sum', total = 96, a = 3, b = 5, names = ['Số bé', 'Số lớn'], unit = '', first = 0 } = spec;
  const isSum = mode === 'sum';
  const k = isSum ? a + b : b - a, one = total / k, vals = [one * a, one * b], parts = [a, b];
  const X0 = 102, pw = Math.min(40, 190 / Math.max(a, b)), h = 30, ys = [36, 100];
  const other = 1 - first, u = paren(unit);
  const lines = [
    isSum ? `Tổng số phần: ${a} + ${b} = ${k} (phần)` : `Hiệu số phần: ${b} − ${a} = ${k} (phần)`,
    `Một phần: ${fmt(total)} : ${k} = ${fmt(one)}${u}`,
    `${names[first]}: ${fmt(one)} × ${parts[first]} = ${fmt(vals[first])}${u}`,
    isSum ? `${names[other]}: ${fmt(total)} − ${fmt(vals[first])} = ${fmt(vals[other])}${u}`
      : first === 0 ? `${names[1]}: ${fmt(vals[0])} + ${fmt(total)} = ${fmt(vals[1])}${u}` : `${names[0]}: ${fmt(vals[1])} − ${fmt(total)} = ${fmt(vals[0])}${u}`,
  ];
  const H = isSum ? 268 : 280, y0 = isSum ? 182 : 194;
  const s = stepper(`${isSum ? 'Tổng' : 'Hiệu'} ${fmt(total)}, tỉ số ${a} : ${b}`, 360, H, (s) => {
    let out = '';
    [0, 1].forEach((r) => {
      const y = ys[r], col = r ? C.orange : C.blue, colL = r ? C.orangeL : C.blueL;
      out += T(8, y + 7, names[r], { anchor: 'start', size: 15, fill: col });
      const vk = `v${r}`;
      out += T(8, y + 27, s.has(vk) ? `= ${fmt(vals[r])}` : '?', { anchor: 'start', size: 15, fill: s.has(vk) ? C.green : C.soft, cls: s.has(vk) ? s.c(vk) : '' });
      let bar = '';
      for (let i = 0; i < parts[r]; i++) bar += rect(X0 + i * pw, y, pw, h, { fill: colL, stroke: col, rx: 2 });
      out += g(s.c(`r${r}`, 'is-grow'), bar);
      let lab = '';
      for (let i = 0; i < parts[r]; i++) lab += T(X0 + i * pw + pw / 2, y + h / 2, fmt(one), { size: 14, cls: s.c('pv'), style: delay(i + r * a, 0.1) });
      out += lab;
    });
    if (isSum) {
      const x = X0 + Math.max(a, b) * pw + 8, my = (ys[0] + ys[1] + h) / 2;
      out += g(s.c('br'), path(vbrace(x, ys[0], ys[1] + h), { stroke: C.green }) + T(x + 32, my - 10, 'Tổng', { size: 15, fill: C.green }) + T(x + 32, my + 10, fmt(total), { size: 17, fill: C.green }));
    } else {
      const x1 = X0 + a * pw, x2 = X0 + b * pw;
      out += g(s.c('br'), ln(x1, ys[0], x1, ys[1] + h, { stroke: C.soft, sw: 1.5, dash: '4 4' })
        + path(hbrace(x1, x2, ys[1] + h + 4, 1), { stroke: C.violet }) + T((x1 + x2) / 2, ys[1] + h + 30, `hiệu ${fmt(total)}`, { size: 15, fill: C.violet }));
    }
    out += calcLines(s, lines, y0, 24);
    return out;
  });
  s.show('r0').snap(`<b>Bước 1:</b> vẽ sơ đồ. Tỉ số là ${fr(a, b)}: <b>${names[0]}</b> được vẽ <b>${a} phần</b> bằng nhau.`);
  s.show('r1').snap(`<b>${names[1]}</b> được vẽ <b>${b} phần</b> như thế.`);
  s.show('br').snap(isSum ? `Cả hai gộp lại là tổng <b>${fmt(total)}</b>.` : `Phần ${names[1].toLowerCase()} dài hơn ${names[0].toLowerCase()} ứng với hiệu <b>${fmt(total)}</b>.`);
  s.snap(isSum ? '<b>Bước 2:</b> có tất cả bao nhiêu phần bằng nhau?' : `<b>Bước 2:</b> ${names[1]} hơn ${names[0].toLowerCase()} mấy phần?`,
    { ask: numAsk(k, { near: [1, -1, 2], ok: `Đúng rồi! ${isSum ? `${a} + ${b}` : `${b} − ${a}`} = ${k} (phần).` }) });
  s.show('L0').snap(`${isSum ? 'Tổng' : 'Hiệu'} số phần bằng nhau là <b>${isSum ? `${a} + ${b}` : `${b} − ${a}`} = ${k}</b> (phần).`);
  s.snap(`<b>Bước 3:</b> giá trị một phần là ${fmt(total)} : ${k} = ?`, { ask: numAsk(one, { near: [1, -1, 2], ok: `Đúng rồi! ${fmt(total)} : ${k} = ${fmt(one)}.` }) });
  s.show('L1', 'pv').snap(`Mỗi phần là <b>${fmt(one)}</b>. Ghi ${fmt(one)} vào từng phần.`);
  s.show('L2', `v${first}`).snap(`${names[first]} có ${parts[first]} phần: <b>${fmt(one)} × ${parts[first]} = ${fmt(vals[first])}</b>.`);
  const last = isSum ? `${fmt(total)} − ${fmt(vals[first])}` : first === 0 ? `${fmt(vals[0])} + ${fmt(total)}` : `${fmt(vals[1])} − ${fmt(total)}`;
  s.show('L3', `v${other}`).snap(`<b>Bước 4:</b> ${names[other].toLowerCase()} là <b>${last} = ${fmt(vals[other])}</b>.`,
    { result: `${names[0]} ${fmt(vals[0])}${unitTail(unit)}; ${names[1].toLowerCase()} ${fmt(vals[1])}${unitTail(unit)}` });
  return s.done();
}

// ── Bài 137: tỉ số (xe tải, xe khách) ────────────────────────────────────────
const truck = (x, y) => rect(x, y + 2, 23, 18, { fill: C.blue, stroke: '#1D4ED8', sw: 1.2, rx: 2 })
  + path(`M${x + 24} ${y + 20}V${y + 7}h6l5 6v7z`, { fill: C.blueL, stroke: '#1D4ED8', sw: 1.2 })
  + rect(x + 26, y + 9, 4, 4, { fill: '#fff', rx: 1 })
  + circ(x + 7, y + 22, 3.8, { fill: C.ink, stroke: '#fff', sw: 1.2 }) + circ(x + 28, y + 22, 3.8, { fill: C.ink, stroke: '#fff', sw: 1.2 });
const bus = (x, y) => rect(x, y + 1, 35, 20, { fill: C.orange, stroke: '#C2410C', sw: 1.2, rx: 4 })
  + [0, 1, 2, 3].map((i) => rect(x + 3 + i * 8, y + 4, 6, 6, { fill: '#fff', rx: 1 })).join('')
  + ln(x + 2, y + 14, x + 33, y + 14, { stroke: '#FED7AA', sw: 1.5 })
  + circ(x + 8, y + 22, 3.8, { fill: C.ink, stroke: '#fff', sw: 1.2 }) + circ(x + 27, y + 22, 3.8, { fill: C.ink, stroke: '#fff', sw: 1.2 });

function ratio(spec) {
  const { a = 5, b = 7 } = spec;
  const X0 = 94, step = 37, ys = [24, 86];
  const s = stepper(`Tỉ số ${a} : ${b}`, 360, 232, (s) => {
    let out = '';
    out += rect(4, ys[0] - 8, 352, 44, { fill: '#DBEAFE', rx: 10, cls: s.c('hA', 'is-fade') });
    out += rect(4, ys[1] - 8, 352, 44, { fill: '#FFEDD5', rx: 10, cls: s.c('hB', 'is-fade') });
    [[a, truck, 'Xe tải', C.blue, 'rA'], [b, bus, 'Xe khách', C.orange, 'rB']].forEach(([n, icon, name, col, key], r) => {
      const y = ys[r];
      out += T(10, y + 6, name, { anchor: 'start', size: 15, fill: col, cls: s.c(key) });
      out += T(10, y + 25, `${n} xe`, { anchor: 'start', size: 15, fill: C.ink, cls: s.c(key) });
      for (let i = 0; i < n; i++) out += g(s.c(key), icon(X0 + i * step, y), delay(i, 0.1));
    });
    // hai tỉ số
    const blk = (cx, head, p, q, col, k1, k2) => T(cx, 152, head, { size: 14, fill: C.soft, cls: s.c(k1) })
      + T(cx - 46, 194, `${p} : ${q}`, { size: 22, fill: col, cls: s.c(k1) })
      + T(cx + 5, 194, 'hay', { size: 14, fill: C.soft, cls: s.c(k2) }) + sfr(cx + 44, 194, p, q, { size: 19, fill: col, cls: s.c(k2) });
    out += blk(92, 'xe tải : xe khách', a, b, C.blue, 'q1', 'q1f');
    out += ln(180, 142, 180, 222, { stroke: C.line, sw: 1.5, cls: s.c('q2') });
    out += blk(270, 'xe khách : xe tải', b, a, C.orange, 'q2', 'q2');
    return out;
  });
  s.show('rA').snap(`Một đội xe có <b>${a} xe tải</b>…`);
  s.show('rB').snap(`… và <b>${b} xe khách</b>.`);
  s.show('hA', 'q1').snap(`Nói số xe tải trước: tỉ số của số xe tải và số xe khách là <b>${a} : ${b}</b>.`);
  s.show('q1f').snap(`Viết ${a} : ${b} hay ${fr(a, b)}. Số xe tải bằng <b>${fr(a, b)}</b> số xe khách.`);
  s.hide('hA').snap('Tỉ số của số xe khách và số xe tải là?',
    { ask: { options: [fr(b, a), fr(a, b), fr(a, a + b)], answer: 0, ok: `Đúng rồi! Số xe khách nói trước nên viết ${b} trước: ${b} : ${a} hay ${fr(b, a)}.` } });
  s.show('hB', 'q2').snap(`Tỉ số của số xe khách và số xe tải là <b>${b} : ${a}</b> hay ${fr(b, a)}. Đổi thứ tự thì tỉ số cũng đổi.`,
    { result: `${a} : ${b} = ${fr(a, b)}; ${b} : ${a} = ${fr(b, a)}` });
  return s.done();
}

// ── Bài 22: số trung bình cộng ───────────────────────────────────────────────
function avg(spec) {
  const { values = [6, 4], unit = 'lít' } = spec;
  const n = values.length, sum = values.reduce((x, y) => x + y, 0), mean = sum / n, max = Math.max(...values);
  const plus = values.join(' + ');
  const blocks = spec.blocks ?? (max <= 10 && Number.isInteger(mean) && n <= 4);
  return blocks ? avgBlocks(spec, values, unit, n, sum, mean, max, plus) : avgBars(spec, values, unit, n, sum, mean, max, plus);
}

function avgBlocks(spec, values, unit, n, sum, mean, max, plus) {
  const names = spec.names || (n === 2 ? ['Can thứ nhất', 'Can thứ hai'] : values.map((_, i) => `Can ${i + 1}`));
  const base = 196, bh = Math.min(16, 104 / max), cw = 54;
  const cx = values.map((_, i) => 180 + (i - (n - 1) / 2) * Math.min(130, 300 / n));
  // các khối: vị trí trước (cột, tầng) và sau khi rót đều
  const blk = [];
  values.forEach((v, c) => { for (let i = 0; i < v; i++) blk.push({ c, i, c2: c, i2: i }); });
  const h = [...values];
  for (let guard = 0; guard < 200; guard++) {
    const hi = h.indexOf(Math.max(...h)), lo = h.indexOf(Math.min(...h));
    if (h[hi] <= mean) break;
    const top = blk.find((x) => x.c2 === hi && x.i2 === h[hi] - 1);
    top.c2 = lo; top.i2 = h[lo]; top.moved = true;
    h[hi]--; h[lo]++;
  }
  const moved = blk.filter((x) => x.moved).length;
  const canTop = base - max * bh - 16, ly = (y) => base - y * bh;
  const s = stepper(`Trung bình cộng của ${values.join(' và ')}`, 360, 232, (s) => {
    const poured = s.has('pour');
    let out = T(180, 22, `(${plus}) : ${n} = ${mean}${paren(unit)}`, { size: 18, fill: C.green, cls: s.c('L0') });
    values.forEach((v, c) => {
      const x = cx[c];
      // can: thân, nắp, quai
      out += rect(x - cw / 2 - 5, canTop, cw + 10, base - canTop + 4, { fill: '#F8FAFC', stroke: C.soft, sw: 2, rx: 8 });
      out += rect(x + 6, canTop - 9, 14, 9, { fill: C.line, stroke: C.soft, sw: 1.5, rx: 2 });
      out += path(`M${x - 22} ${canTop}q0 -14 14 -14h8`, { stroke: C.soft, sw: 3 });
      out += T(x, base + 18, names[c], { size: 14, fill: C.ink });
      out += T(x, canTop - 22, `${poured ? mean : v} ${unit}`, { size: 15, fill: poured ? C.green : C.orange, cls: poured && s.isNew('pour') ? 'is-new' : '' });
    });
    blk.forEach((b0, k) => {
      const c = poured ? b0.c2 : b0.c, i = poured ? b0.i2 : b0.i;
      const x = cx[c] - cw / 2 + 3, y = ly(i + 1) + 1;
      let cls = s.c('blocks'), style = delay(k, 0.06);
      if (poured && b0.moved) {
        cls = s.isNew('pour') ? 'is-move' : '';
        style = `--dx:${r1(cx[b0.c] - cx[c])}px;--dy:${r1(ly(b0.i + 1) - ly(i + 1))}px`;
      }
      out += rect(x, y, cw - 6, bh - 2, { fill: b0.moved && poured ? '#FDE68A' : C.yellowL, stroke: C.yellow, sw: 1.2, rx: 2, cls, style });
    });
    const yl = ly(mean);
    out += g(s.c('mean'), ln(cx[0] - cw / 2 - 18, yl, cx[n - 1] + cw / 2 + 18, yl, { stroke: C.green, sw: 2.5, dash: '6 5' })
      + T(cx[n - 1] + cw / 2 + 24, yl, String(mean), { size: 16, fill: C.green, anchor: 'start' }));
    return out;
  });
  const story = values.map((v, i) => `${names[i]} có <b>${v} ${unit}</b>`).join(', ');
  s.show('blocks').snap(`${story}. Mỗi khối là 1 ${unit}.`);
  s.snap(`Rót đều số ${unit === 'lít' ? 'dầu' : unit} đó vào ${n} can thì mỗi can có mấy ${unit}?`, { ask: numAsk(mean, { near: [1, -1, 2], ok: 'Đúng rồi! Em xem rót cho đều.' }) });
  s.show('pour').snap(n === 2
    ? `Rót <b>${moved} ${unit}</b> từ can nhiều sang can ít: hai can bằng nhau, mỗi can <b>${mean} ${unit}</b>.`
    : `Rót từ can nhiều sang can ít cho đều: mỗi can <b>${mean} ${unit}</b>.`);
  s.show('mean').snap(`Ta gọi <b>${mean}</b> là <b>số trung bình cộng</b> của ${values.join(' và ')}.`);
  s.show('L0').snap(`Tính nhanh: lấy tổng chia cho số can, <b>(${plus}) : ${n} = ${mean}</b>.`, { result: `(${plus}) : ${n} = ${mean}` });
  return s.done();
}

function avgBars(spec, values, unit, n, sum, mean, max, plus) {
  const names = spec.names || values.map((_, i) => `Số ${i + 1}`);
  const each = spec.each || 'phần';
  const base = 200, maxH = 118, k = maxH / max, bw = 46;
  const cx = values.map((_, i) => (n === 1 ? 180 : 90 + (i * 200) / (n - 1)));
  const yv = (v) => base - v * k;
  const lines = [`Tổng: ${plus} = ${fmt(sum)}${paren(unit)}`, `Trung bình: ${fmt(sum)} : ${n} = ${fmt(mean)}${paren(unit)}`];
  const s = stepper(`Trung bình cộng của ${values.join(', ')}`, 360, 236, (s) => {
    let out = calcLines(s, lines, 18, 24, { max: 15 });
    out += ln(40, base, 330, base, { stroke: C.soft, sw: 2 });
    const tints = [[C.blue, C.blueL], [C.orange, C.orangeL], [C.violet, C.violetL], [C.green, C.greenL]];
    values.forEach((v, i) => {
      const [col, colL] = tints[i % 4];
      out += g(s.c('bars', 'dg-up'), rect(cx[i] - bw / 2, yv(v), bw, v * k, { fill: colL, stroke: col, rx: 3 }), delay(i, 0.15));
      out += T(cx[i], yv(v) + 15, fmt(v), { size: 15, fill: col, cls: s.c('bars'), style: delay(i + 2, 0.15) });
      out += T(cx[i], base + 17, names[i], { size: 14 });
      // phần cao hơn vạch trung bình / phần còn thiếu
      if (v > mean) out += rect(cx[i] - bw / 2, yv(v), bw, (v - mean) * k, { fill: '#fff', stroke: col, dash: '4 3', op: 0.75, cls: s.c('even', 'is-fade') });
      if (v < mean) out += rect(cx[i] - bw / 2, yv(mean), bw, (mean - v) * k, { fill: C.greenL, stroke: C.green, dash: '4 3', cls: s.c('even') });
    });
    const yl = yv(mean);
    out += g(s.c('mean', 'is-draw'), ln(48, yl, 318, yl, { stroke: C.green, sw: 2.5, dash: '6 5' }), '--len:280');
    out += T(324, yl, fmt(mean), { size: 16, fill: C.green, anchor: 'start', cls: s.c('mean') });
    return out;
  });
  const story = values.map((v, i) => `${names[i]} có <b>${fmt(v)}</b> ${unit}`).join(', ');
  s.show('bars').snap(`${story}.`);
  s.show('L0').snap(`Tính tổng: <b>${plus} = ${fmt(sum)}</b> (${unit}).`);
  s.snap(`Chia đều cho ${n} ${each}: ${fmt(sum)} : ${n} = ?`, { ask: numAsk(mean, { near: [1, -1, 2], ok: `Đúng rồi! ${fmt(sum)} : ${n} = ${fmt(mean)}.` }) });
  s.show('L1', 'mean').snap(`Trung bình mỗi ${each} có <b>${fmt(mean)} ${unit}</b>. ${fmt(mean)} là <b>số trung bình cộng</b> của ${values.join(', ').replace(/, (\d+)$/, ' và $1')}.`);
  s.show('even').snap(`Phần cột cao hơn vạch bù vào phần còn thiếu của cột thấp thì các cột <b>bằng nhau</b>, đều bằng ${fmt(mean)}.`,
    { result: `(${plus}) : ${n} = ${fmt(mean)}` });
  return s.done();
}

// ── Bài 24: biểu đồ tranh ────────────────────────────────────────────────────
const kid = (x, y, girl) => {
  const skin = '#FCD9B6', hair = '#5B3A29';
  let b = '';
  if (girl) b += circ(x + 4, y + 9, 4, { fill: hair }) + circ(x + 22, y + 9, 4, { fill: hair });
  b += circ(x + 13, y + 9, 8, { fill: skin, stroke: '#E9B48A', sw: 1 });
  b += path(`M${x + 5} ${y + 9}q0 -9 8 -9q8 0 8 9q-3 -5 -8 -5q-5 0 -8 5z`, { fill: hair, stroke: 'none' });
  b += circ(x + 10, y + 10, 1.1, { fill: C.ink }) + circ(x + 16, y + 10, 1.1, { fill: C.ink });
  b += girl
    ? path(`M${x + 13} ${y + 17}l-9 15h18z`, { fill: '#F472B6', stroke: '#DB2777', sw: 1.2 })
    : rect(x + 6, y + 17, 14, 13, { fill: C.blue, stroke: '#1D4ED8', sw: 1.2, rx: 4 });
  b += rect(x + 8, y + (girl ? 32 : 30), 4, girl ? 5 : 7, { fill: girl ? '#E9B48A' : '#475569', rx: 1 }) + rect(x + 14, y + (girl ? 32 : 30), 4, girl ? 5 : 7, { fill: girl ? '#E9B48A' : '#475569', rx: 1 });
  return b;
};

const PICTO = [['Mai', 'gg'], ['Lan', 'b'], ['Hồng', 'bg'], ['Đào', 'g'], ['Cúc', 'bb']];

function picto(spec) {
  const rows = spec.rows || PICTO;
  const y0 = 10, rh = 38, X1 = 112;
  const cnt = (kids) => { const bn = [...kids].filter((c) => c === 'b').length; return { b: bn, g: kids.length - bn }; };
  const say = (kids) => { const { b, g: gn } = cnt(kids); return [b && `${b} con trai`, gn && `${gn} con gái`].filter(Boolean).join(' và '); };
  const s = stepper('Biểu đồ tranh: Các con của năm gia đình', 360, 252, (s) => {
    let out = '';
    const yEnd = y0 + rows.length * rh;
    out += rect(4, y0 - 2, 108, rows.length * rh + 4, { fill: '#FEF3C7', rx: 8, cls: s.c('hcol', 'is-fade') });
    rows.forEach((_, i) => { out += rect(X1 + 2, y0 + i * rh + 1, 242, rh - 2, { fill: '#FEF3C7', rx: 8, cls: s.c(`h${i}`, 'is-fade') }); });
    out += rect(4, 212, 352, 36, { fill: '#FEF3C7', rx: 8, cls: s.c('hleg', 'is-fade') });
    out += g('', rows.map((_, i) => (i ? ln(8, y0 + i * rh, 352, y0 + i * rh, { stroke: C.line, sw: 1 }) : '')).join('')
      + ln(X1, y0, X1, yEnd, { stroke: C.line, sw: 1.5 }) + rect(4, y0 - 2, 352, rows.length * rh + 4, { stroke: C.line, rx: 8 }));
    rows.forEach(([name, kids], i) => {
      const y = y0 + i * rh;
      out += T(58, y + rh / 2, `Cô ${name}`, { size: 15 });
      [...kids].forEach((c, j) => { out += g(s.c('chart'), kid(X1 + 16 + j * 36, y + 1, c === 'g'), delay(i * 2 + j, 0.07)); });
      const { b, g: gn } = cnt(kids);
      out += T(350, y + rh / 2, [b && `${b} trai`, gn && `${gn} gái`].filter(Boolean).join(', '), { size: 14, anchor: 'end', fill: C.green, cls: s.c(`n${i}`) });
    });
    out += kid(70, 213, false) + T(102, 230, 'con trai', { size: 14, anchor: 'start' });
    out += kid(200, 213, true) + T(232, 230, 'con gái', { size: 14, anchor: 'start' });
    return out;
  });
  const fam = (i) => `Gia đình cô ${rows[i][0]}`;
  s.show('chart').snap('Biểu đồ tranh <b>Các con của năm gia đình</b>. Đọc biểu đồ theo từng hàng.');
  s.show('hcol').snap('Cột bên trái ghi tên <b>năm gia đình</b>: cô Mai, cô Lan, cô Hồng, cô Đào, cô Cúc.');
  s.hide('hcol').show('hleg').snap('Hình bạn mặc áo xanh chỉ <b>một con trai</b>, hình bạn mặc váy hồng chỉ <b>một con gái</b>.');
  const gm = cnt(rows[0][1]).g;
  s.hide('hleg').show('h0').snap(`${fam(0)} có mấy con gái?`, { ask: numAsk(gm, { near: [1, -1, 2], ok: `Đúng rồi! Hàng của cô ${rows[0][0]} có ${gm} hình bạn gái: ${fam(0).toLowerCase()} có <b>${say(rows[0][1])}</b>.` }) });
  s.show('n0').snap(`${fam(0)} có <b>${say(rows[0][1])}</b>.`);
  for (let i = 1; i < rows.length - 1; i++) s.hide(`h${i - 1}`).show(`h${i}`, `n${i}`).snap(`${fam(i)} có <b>${say(rows[i][1])}</b>.`);
  const L = rows.length - 1;
  const twoBoys = rows.findIndex(([, k]) => cnt(k).b === 2);
  const opts = [0, 2, L].map((i) => `Cô ${rows[i][0]}`);
  s.hide(`h${L - 1}`).snap('Gia đình nào có <b>2 con trai</b>?', { ask: { options: opts, answer: [0, 2, L].indexOf(twoBoys), ok: `Đúng rồi! Hàng của cô ${rows[twoBoys][0]} có 2 hình bạn trai.` } });
  s.show(`h${L}`, `n${L}`).snap(`${fam(L)} có <b>${say(rows[L][1])}</b>. Đọc hết các hàng là biết số con của từng gia đình.`, { result: `${fam(twoBoys)}: 2 con trai` });
  return s.done();
}

// ── Bài 25: biểu đồ cột ──────────────────────────────────────────────────────
const RATS = [['Đông', 2000], ['Đoài', 2200], ['Trung', 1600], ['Thượng', 2750]];

function barchart(spec) {
  const { items = RATS, max = 3000, step = 500, prefix = 'thôn', what = 'con chuột', axis = 'Số chuột', title = 'Biểu đồ: Số chuột bốn thôn đã diệt được' } = spec;
  const X = 54, base = 206, top = 34, k = (base - top) / max, bw = 44;
  const cx = items.map((_, i) => X + 42 + (i * (308 - X - 42)) / Math.max(1, items.length - 1));
  const yv = (v) => base - v * k;
  const best = items.reduce((m, it, i) => (it[1] > items[m][1] ? i : m), 0);
  const s = stepper(title, 360, 244, (s) => {
    let out = T(8, 14, axis, { size: 14, anchor: 'start', fill: C.soft });
    for (let v = 0; v <= max; v += step) {
      out += ln(X, yv(v), 350, yv(v), { stroke: v ? '#E2E8F0' : C.soft, sw: v ? 1 : 2 });
      out += T(X - 6, yv(v), fmt(v), { size: 14, anchor: 'end', fill: '#64748B' });
    }
    out += ln(X, top - 8, X, base, { stroke: C.soft, sw: 2 });
    out += rect(cx[best] - bw / 2 - 6, 18, bw + 12, base - 18 + 34, { fill: '#FEF3C7', rx: 8, cls: s.c('best', 'is-fade') });
    items.forEach(([name, v], i) => {
      out += rect(cx[i] - bw / 2, yv(v), bw, v * k, { fill: i === best && s.has('best') ? '#FDBA74' : C.blueL, stroke: i === best && s.has('best') ? C.orange : C.blue, rx: 3, cls: s.c(`b${i}`, 'dg-up') });
      out += T(cx[i], yv(v) - 11, fmt(v), { size: 15, fill: '#1D4ED8', cls: s.c(`v${i}`) });
      out += T(cx[i], base + 18, name, { size: 15 });
    });
    return out;
  });
  const P = prefix ? `${prefix} ` : '';
  const cap = (i) => `Cột ${P}${items[i][0]}: số ghi trên đỉnh cột là <b>${fmt(items[i][1])}</b>, ${P}${items[i][0]} được <b>${fmt(items[i][1])} ${what}</b>.`;
  s.snap(`<b>${title.replace(/^Biểu đồ: /, '')}</b>. Hàng dưới ghi tên ${prefix ? `các ${prefix}` : 'từng cột'}, các số bên trái chỉ số ${what.replace(/^con /, '')}.`);
  const onGrid = items.findIndex(([, v]) => v % step === 0);
  items.forEach(([name, v], i) => {
    if (i === onGrid) {
      s.show(`b${i}`).snap(`Cột ${P}${name} cao tới vạch nào? ${P ? P[0].toUpperCase() + P.slice(1) : ''}${name} được bao nhiêu ${what}?`,
        { ask: numAsk(v, { near: [-step, step], fmtFn: fmt, ok: `Đúng rồi! Đỉnh cột ngang vạch ${fmt(v)}.` }) });
      s.show(`v${i}`).snap(cap(i));
    } else s.show(`b${i}`, `v${i}`).snap(cap(i));
  });
  s.snap(`${P ? P[0].toUpperCase() + P.slice(1) : 'Cột'} nào được nhiều ${what.replace(/^con /, '')} nhất?`,
    { ask: { options: items.map(([nm]) => nm), answer: best, ok: `Đúng rồi! Cột ${P}${items[best][0]} cao nhất.` } });
  s.show('best').snap(`Cột ${P}${items[best][0]} <b>cao nhất</b> nên ${P}${items[best][0]} được <b>nhiều ${what.replace(/^con /, '')} nhất</b>. Cột càng cao thì số càng lớn.`,
    { result: `${P ? P[0].toUpperCase() + P.slice(1) : ''}${items[best][0]}: ${fmt(items[best][1])} ${what}` });
  return s.done();
}

// ── Bài 14: dãy số tự nhiên trên tia số ─────────────────────────────────────
function numline() {
  const X0 = 40, sp = 26, y = 82, xn = (n) => X0 + n * sp;
  const arc = (n1, n2, col, label, key, dir = 1) => {
    const x1 = xn(n1), x2 = typeof n2 === 'number' && n2 >= 0 ? xn(n2) : n2 === -1 ? X0 - 26 : 330, m = (x1 + x2) / 2;
    const d = `M${x1} ${y - 6}Q${m} ${y - 44} ${x2} ${y - 6}`;
    const head = `M${x2 - 4 * dir} ${y - 13}L${x2} ${y - 6}L${x2 + (dir > 0 ? -7 : 7)} ${y - 9}`;
    return g('', path(d, { stroke: col, sw: 2.5, cls: s0.c(key, 'is-draw'), style: '--len:70' })
      + path(head, { stroke: col, sw: 2.5, cls: s0.c(key), style: 'animation-delay:.6s' })
      + T(m, y - 36, label, { size: 15, fill: col, cls: s0.c(key), style: 'animation-delay:.4s' }));
  };
  let s0;
  const s = stepper('Dãy số tự nhiên trên tia số', 360, 136, (s) => {
    s0 = s;
    let out = '';
    out += g(s.c('ray', 'is-draw'), ln(X0, y, 344, y, { stroke: C.ink, sw: 2.5 }) + path(`M336 ${y - 6}L346 ${y}L336 ${y + 6}`, { stroke: C.ink, sw: 2.5 }), '--len:320');
    out += circ(X0, y, 5, { fill: C.red, cls: s.c('ray') }) + T(X0, y + 20, '0', { size: 16, fill: C.red, cls: s.c('ray') });
    out += T(X0, y + 42, 'điểm gốc', { size: 14, fill: C.red, cls: s.c('ray') });
    for (let n = 1; n <= 10; n++) {
      out += circ(xn(n), y, 4, { fill: C.blue, cls: s.c('pts'), style: delay(n, 0.08) });
      out += T(xn(n), y + 20, n, { size: 15, cls: s.c('pts'), style: delay(n, 0.08) });
    }
    out += T(322, y + 20, '…', { size: 16, cls: s.c('pts'), style: delay(11, 0.08) });
    for (const [n, col] of [[7, C.blue], [8, C.green], [4, C.orange], [3, C.green], [1, C.orange]]) out += circ(xn(n), y + 20, 11, { stroke: col, sw: 2, cls: s.c(`c${n}`) });
    out += circ(X0, y + 20, 11, { stroke: C.red, sw: 2.5, cls: s.c('c0') });
    out += arc(7, 8, C.green, '+1', 'a78');
    out += arc(4, 3, C.orange, '−1', 'a43', -1);
    out += arc(1, 0, C.orange, '−1', 'a10', -1);
    out += g(s.c('no0'), path(`M${X0} ${y - 6}Q${X0 - 13} ${y - 34} ${X0 - 26} ${y - 6}`, { stroke: C.red, sw: 2, dash: '4 4' })
      + T(X0 - 14, y - 34, '✗', { size: 18, fill: C.red }));
    out += arc(10, 'end', C.green, '+1', 'aEnd');
    return out;
  });
  s.show('ray').snap('Vẽ tia số. Số <b>0</b> ứng với <b>điểm gốc</b> của tia số.');
  s.show('pts').snap('Mỗi số tự nhiên ứng với <b>một điểm</b> trên tia số: 0; 1; 2; 3; … Các điểm cách đều nhau.');
  s.show('c7').snap('Thêm 1 vào 7 thì được số nào? Số liền sau của 7 là?', { ask: numAsk(8, { near: [-2, 1], ok: 'Đúng rồi! 7 + 1 = 8.' }) });
  s.show('a78', 'c8').snap('Thêm 1 vào 7 được <b>8</b>: 8 là <b>số liền sau</b> của 7. Trên tia số, số liền sau ở ngay bên phải.');
  s.hide('c7', 'c8').show('c4', 'a43', 'c3').snap('Bớt 1 ở 4 được <b>3</b>: 3 là <b>số liền trước</b> của 4, ở ngay bên trái.');
  s.hide('c4', 'c3').show('c1').snap('Số liền trước của 1 là?', { ask: numAsk(0, { near: [1, 2], ok: 'Đúng rồi! 1 bớt 1 được 0.' }) });
  s.show('a10', 'c0').snap('Bớt 1 ở 1 được <b>0</b>.');
  s.hide('c1').show('no0').snap('Không có số tự nhiên nào liền trước số 0: <b>0 là số tự nhiên bé nhất</b>.');
  s.hide('c0').show('aEnd').snap('Số nào thêm 1 cũng được số liền sau, tia số kéo dài mãi: <b>không có số tự nhiên lớn nhất</b>.', { result: '0; 1; 2; 3; 4; …' });
  return s.done();
}

// ── Bài 20: thế kỉ ──────────────────────────────────────────────────────────
const roman = (n) => {
  const R = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let out = '';
  R.forEach(([v, t]) => { while (n >= v) { out += t; n -= v; } });
  return out;
};

function century(spec) {
  const { year = 1945 } = spec;
  const c = Math.ceil(year / 100);
  const c0 = c >= 19 && c <= 21 ? 19 : Math.max(1, c - 1);
  const cs = [c0, c0 + 1, c0 + 2], base = (c0 - 1) * 100, k = 320 / 300, X = 20;
  const xy = (yr) => X + (yr - base - 0.5) * k;
  const tints = [[C.blue, C.blueL], [C.orange, C.orangeL], [C.green, C.greenL]];
  const ci = cs.indexOf(c);
  const s = stepper(`Năm ${year} thuộc thế kỉ nào?`, 360, 196, (s) => {
    let out = '';
    cs.forEach((cc, i) => {
      const x = X + i * 100 * k, [col, colL] = tints[i], hot = i === ci && s.has('hot');
      out += g(s.c('blocks', 'is-grow'), rect(x + 1, 76, 100 * k - 2, 44, { fill: colL, stroke: col, sw: hot ? 4 : 1.5, rx: 6 }), delay(i, 0.25));
      out += T(x + 50 * k, 98, `thế kỉ ${roman(cc)}`, { size: 16, fill: C.ink, cls: s.c('blocks'), style: delay(i + 1, 0.25) });
      out += T(x + 50 * k, 136, `${(cc - 1) * 100 + 1}–${cc * 100}`, { size: 14, fill: col, cls: s.c('years') });
    });
    out += rect(X + ci * 100 * k - 3, 73, 100 * k + 6, 50, { stroke: C.yellow, sw: 3, rx: 8, cls: s.c('hot') });
    const mx = X + 150 * k;
    out += g(s.c('brace'), path(hbrace(X + 100 * k + 2, X + 200 * k - 2, 148, 1), { stroke: C.violet }) + T(mx, 180, '1 thế kỉ = 100 năm', { size: 15, fill: C.violet }));
    const px = xy(year);
    out += g(s.c('pin', 'is-move'), ln(px, 34, px, 82, { stroke: C.red, sw: 3 }) + circ(px, 30, 7, { fill: C.red, stroke: '#fff', sw: 2 })
      + T(Math.max(30, Math.min(330, px)), 12, String(year), { size: 17, fill: C.red }), '--dy:-30px');
    return out;
  });
  const [mid] = [cs[1]];
  s.show('blocks', 'years').snap('Dải thời gian: mỗi ô là <b>một thế kỉ</b>. Thế kỉ được viết bằng chữ số La Mã.');
  s.show('brace').snap(`<b>1 thế kỉ = 100 năm</b>. Từ năm ${(mid - 1) * 100 + 1} đến năm ${mid * 100} là thế kỉ ${roman(mid)}.`);
  s.show('pin').snap(`Đánh dấu <b>năm ${year}</b> trên dải thời gian.`);
  s.snap(`Năm ${year} thuộc thế kỉ nào?`, { ask: { options: cs.map((cc) => `Thế kỉ ${roman(cc)}`), answer: ci, ok: `Đúng rồi! Năm ${year} thuộc thế kỉ ${roman(c)}.` } });
  const last = year % 100 === 0 ? ` Năm ${year} là <b>năm cuối</b> của thế kỉ ${roman(c)}.` : '';
  s.show('hot').snap(`Năm ${year} nằm trong khoảng từ năm ${(c - 1) * 100 + 1} đến năm ${c * 100}, nên thuộc <b>thế kỉ ${roman(c)}</b>.${last}`, { result: `Năm ${year} thuộc thế kỉ ${roman(c)}` });
  return s.done();
}

// ── Bài 147, 148, 149: tỉ lệ bản đồ ─────────────────────────────────────────
const UF = { mm: 1, cm: 10, dm: 100, m: 1000, km: 1e6 };
const UNAME = { mm: 'mi-li-mét', cm: 'xăng-ti-mét', dm: 'đề-xi-mét', m: 'mét', km: 'ki-lô-mét' };

function gate(x1, x2, yT, yB, big) {
  const w = x2 - x1, pw = Math.max(3, w * 0.09), hh = yB - yT;
  let b = '';
  for (let i = 1; i < 8; i++) { const x = x1 + pw + ((w - 2 * pw) * i) / 8; b += ln(x, yT + hh * 0.42, x, yB, { stroke: '#94A3B8', sw: big ? 2.5 : 1 }); }
  b += ln(x1 + pw, yT + hh * 0.48, x2 - pw, yT + hh * 0.48, { stroke: '#94A3B8', sw: big ? 2.5 : 1 });
  b += rect(x1, yT + hh * 0.18, pw, hh * 0.82, { fill: C.orangeL, stroke: C.orange, sw: big ? 1.5 : 0.8, rx: 1 });
  b += rect(x2 - pw, yT + hh * 0.18, pw, hh * 0.82, { fill: C.orangeL, stroke: C.orange, sw: big ? 1.5 : 0.8, rx: 1 });
  b += rect(x1 + w * 0.25, yT, w * 0.5, hh * 0.3, { fill: C.blue, stroke: '#1D4ED8', sw: big ? 1.5 : 0.8, rx: 2 });
  if (big) b += T((x1 + x2) / 2, yT + hh * 0.15, 'TRƯỜNG', { size: 14, fill: '#fff', cls: 'plain' });
  return b;
}
function road(x1, x2, y, big) {
  const hw = big ? 9 : 3;
  let b = rect(x1, y - hw, x2 - x1, 2 * hw, { fill: '#CBD5E1', rx: hw });
  if (big) b += ln(x1 + 10, y, x2 - 10, y, { stroke: '#fff', sw: 2, dash: '8 7' });
  b += circ(x1, y, big ? 7 : 3.5, { fill: C.red, stroke: '#fff', sw: 1.5 }) + circ(x2, y, big ? 7 : 3.5, { fill: C.red, stroke: '#fff', sw: 1.5 });
  b += T(x1, y - (big ? 20 : 12), 'A', { size: big ? 16 : 14, fill: C.red }) + T(x2, y - (big ? 20 : 12), 'B', { size: big ? 16 : 14, fill: C.red });
  return b;
}

function mapScale(spec) {
  const { mode = 'real', scale = 300, mapUnit = 'cm', realUnit = 'm' } = spec;
  const toMap = mode === 'map';
  const thing = spec.thing || (toMap || mapUnit === 'mm' || spec.map === 1 ? 'road' : 'gate');
  let mapLen, realLen, same;
  if (toMap) { realLen = spec.real ?? 20; same = (realLen * UF[realUnit]) / UF[mapUnit]; mapLen = same / scale; } else { mapLen = spec.map ?? 2; same = mapLen * scale; realLen = (same * UF[mapUnit]) / UF[realUnit]; }
  const conv = realUnit !== mapUnit;
  const label = spec.what || (thing === 'gate' ? 'cổng trường rộng' : 'quãng đường AB dài');
  const segPx = Math.max(36, Math.min(150, mapLen * (mapUnit === 'mm' ? 1.4 : 36)));
  const mx1 = 180 - segPx / 2, mx2 = 180 + segPx / 2, rx1 = 40, rx2 = 320;
  const ticks = Number.isInteger(mapLen) && mapLen <= 6 && mapUnit !== 'mm' ? mapLen : 0;
  const lines = toMap
    ? [`${fmt(realLen)}${realUnit} = ${fmt(same)}${mapUnit}`, `Trên bản đồ: ${fmt(same)} : ${fmt(scale)} = ${fmt(mapLen)} (${mapUnit})`]
    : [`Độ dài thật: ${fmt(mapLen)} × ${fmt(scale)} = ${fmt(same)} (${mapUnit})`, `${fmt(same)}${mapUnit} = ${fmt(realLen)}${realUnit}`];
  if (!toMap && fit(lines[0]) <= 14 && lines[0].length > 38) lines[0] = `${fmt(mapLen)} × ${fmt(scale)} = ${fmt(same)} (${mapUnit})`;
  const s = stepper(`Tỉ lệ bản đồ 1 : ${fmt(scale)}`, 360, 268, (s) => {
    let out = '';
    // bản đồ
    out += rect(6, 6, 348, 90, { fill: '#FEF9C3', stroke: '#FACC15', rx: 10 });
    out += T(16, 22, 'Bản đồ', { size: 14, anchor: 'start', fill: '#A16207' });
    out += T(344, 22, `Tỉ lệ 1 : ${fmt(scale)}`, { size: 14, anchor: 'end', fill: '#A16207' });
    out += g(toMap ? s.c('mseg', 'is-new') : '', thing === 'gate' ? gate(mx1, mx2, 36, 58, false) : road(mx1, mx2, 50, false));
    out += rect(mx1 - 10, 64, segPx + 20, 12, { fill: '#fff', stroke: C.soft, sw: 1, rx: 2 });
    if (ticks) for (let i = 0; i <= ticks; i++) out += ln(mx1 + (i * segPx) / ticks, 64, mx1 + (i * segPx) / ticks, 71, { stroke: C.soft, sw: 1 });
    out += rect(mx1, 66, segPx, 5, { fill: C.blue, rx: 2, cls: toMap ? s.c('mseg', 'is-grow') : '' });
    if (ticks) out += rect(mx1, 63, segPx / ticks, 11, { fill: 'none', stroke: C.orange, sw: 2.5, rx: 2, cls: s.c('one', 'is-fade') });
    const ml = toMap && !s.has('mseg') ? '? cm'.replace('cm', mapUnit) : `${fmt(mapLen)}${mapUnit}`;
    out += T(180, 86, ml, { size: 14, fill: '#1D4ED8', cls: toMap && s.has('mseg') ? s.c('mseg') : '' });
    // phóng to / thu nhỏ
    const z = toMap ? `M${rx1} 118L${mx1} 78M${rx2} 118L${mx2} 78` : `M${mx1} 78L${rx1} 118M${mx2} 78L${rx2} 118`;
    out += path(z, { stroke: C.violet, sw: 1.5, dash: '3 4', cls: s.c('zoom', 'is-draw'), style: '--len:160' });
    // thật
    out += g(s.c('real'), rect(6, 108, 348, 104, { fill: '#F0FDF4', stroke: '#BBF7D0', rx: 10 }) + T(16, 200, 'Thật', { size: 14, anchor: 'start', fill: C.green })
      + (thing === 'gate' ? ln(14, 160, 346, 160, { stroke: '#86EFAC', sw: 3 }) + gate(rx1, rx2, 114, 160, true) : road(rx1, rx2, 152, true))
      + ln(rx1, 186, rx2, 186, { stroke: C.ink, sw: 1.5 }) + ln(rx1, 179, rx1, 193, { stroke: C.ink, sw: 1.5 }) + ln(rx2, 179, rx2, 193, { stroke: C.ink, sw: 1.5 })
      + (ticks ? Array.from({ length: ticks - 1 }, (_, i) => ln(rx1 + ((i + 1) * (rx2 - rx1)) / ticks, 182, rx1 + ((i + 1) * (rx2 - rx1)) / ticks, 190, { stroke: C.ink, sw: 1.5 })).join('') : ''));
    if (ticks) out += g(s.c('one', 'is-fade'), rect(rx1, 182, (rx2 - rx1) / ticks, 8, { fill: C.orange, rx: 2, op: 0.7 }) + T(rx1 + (rx2 - rx1) / ticks / 2, 173, `${fmt(scale)}${mapUnit}`, { size: 14, fill: C.orange }));
    const rl = toMap ? (s.has('L0') ? `${fmt(same)}${mapUnit}` : `${fmt(realLen)}${realUnit}`) : s.has('L1') && conv ? `${fmt(realLen)}${realUnit}` : s.has('L0') ? `${fmt(same)}${mapUnit}` : `? ${realUnit}`;
    const rk = toMap ? 'L0' : s.has('L1') ? 'L1' : 'L0';
    out += T(180, 202, rl, { size: 16, fill: C.green, cls: s.has(rk) && s.isNew(rk) ? 'is-new' : s.has('real') ? '' : 'kd-ghost' });
    out += calcLines(s, lines, 232, 26);
    return out;
  });
  return mapSteps(s, { toMap, sc: fmt(scale), scale, mapLen, realLen, same, mapUnit, realUnit, conv, label, ticks });
}

function mapSteps(s, o) {
  const { toMap, sc, scale, mapLen, realLen, same, mapUnit, realUnit, conv, label, ticks } = o;
  if (!toMap) {
    s.snap(`Bản đồ tỉ lệ <b>1 : ${sc}</b>. Trên bản đồ, ${label} <b>${fmt(mapLen)}${mapUnit}</b>. Độ dài thật là bao nhiêu?`);
    s.show('zoom', 'real').snap(`Hình trên bản đồ được <b>thu nhỏ ${sc} lần</b> so với thật. Ngoài thật dài gấp ${sc} lần.`);
    s.show(ticks ? 'one' : []).snap(`Tỉ lệ 1 : ${sc} nghĩa là <b>1${mapUnit}</b> trên bản đồ ứng với <b>${sc}${mapUnit}</b> thật.`);
    if (mapLen > 1) s.snap(`Độ dài thật: ${fmt(mapLen)} × ${sc} = ?`, { ask: { ...numAsk(same, { near: [scale, -scale], fmtFn: fmt }), ok: `Đúng rồi! ${fmt(mapLen)} × ${sc} = ${fmt(same)} (${mapUnit}).` } });
    s.show('L0').snap(`Lấy độ dài trên bản đồ nhân với ${sc}: <b>${fmt(mapLen)} × ${sc} = ${fmt(same)}</b> (${mapUnit}).`, conv ? {} : { result: `Độ dài thật: ${fmt(same)}${mapUnit}` });
    if (conv) {
      if (mapLen <= 1) {
        const vals = [realLen / 10, realLen, realLen * 10];
        s.snap(`Đổi ra ${UNAME[realUnit]}: ${fmt(same)}${mapUnit} = ? ${realUnit}`, { ask: { options: vals.map((v) => `${fmt(v)}${realUnit}`), answer: 1, ok: `Đúng rồi! ${fmt(same)}${mapUnit} = ${fmt(realLen)}${realUnit}.` } });
      }
      s.show('L1').snap(`Đổi ra ${UNAME[realUnit]}: <b>${fmt(same)}${mapUnit} = ${fmt(realLen)}${realUnit}</b>.`, { result: `Độ dài thật: ${fmt(realLen)}${realUnit}` });
    }
  } else {
    s.show('real').snap(`Hai điểm A và B cách nhau <b>${fmt(realLen)}${realUnit}</b>. Trên bản đồ tỉ lệ <b>1 : ${sc}</b>, ${label} mấy ${UNAME[mapUnit]}?`);
    s.show('L0').snap(`Đổi ra đơn vị cần tìm trước: <b>${fmt(realLen)}${realUnit} = ${fmt(same)}${mapUnit}</b>.`);
    s.show('zoom').snap(`Trên bản đồ, độ dài được <b>thu nhỏ ${sc} lần</b>.`);
    s.snap(`Trên bản đồ: ${fmt(same)} : ${sc} = ?`, { ask: { ...numAsk(mapLen, { near: [1, mapLen * 9], fmtFn: fmt }), ok: `Đúng rồi! ${fmt(same)} : ${sc} = ${fmt(mapLen)} (${mapUnit}).` } });
    s.show('L1', 'mseg').snap(`Lấy độ dài thật chia cho ${sc}: <b>${fmt(same)} : ${sc} = ${fmt(mapLen)}</b> (${mapUnit}).`, { result: `Trên bản đồ: ${fmt(mapLen)}${mapUnit}` });
  }
  return s.done();
}

// ── Bài 50: a × b = b × a ───────────────────────────────────────────────────
function array(spec) {
  const { cols = 7, rows = 5 } = spec;
  const sp = Math.min(32, 224 / cols, 150 / rows), X0 = 180 - ((cols - 1) * sp) / 2 - 18, Y0 = 26, rad = sp * 0.34;
  const total = cols * rows, xc = (i) => X0 + i * sp, yr = (j) => Y0 + j * sp;
  const yLab = yr(rows - 1) + sp * 0.5 + 14;
  const s = stepper(`${cols} × ${rows} và ${rows} × ${cols}`, 360, yLab + 50, (s) => {
    let out = '';
    for (let j = 0; j < rows; j++) {
      out += rect(xc(0) - sp / 2 + 2, yr(j) - sp / 2 + 2, cols * sp - 4, sp - 4, { fill: '#DBEAFE', rx: sp / 2, cls: s.c('rows', 'is-grow'), style: delay(j, 0.25) });
      out += T(xc(cols - 1) + sp * 0.5 + 10, yr(j), (j + 1) * cols, { size: 15, anchor: 'start', fill: C.blue, cls: s.c('rsum'), style: delay(j, 0.3) });
    }
    for (let i = 0; i < cols; i++) {
      out += rect(xc(i) - sp / 2 + 2, yr(0) - sp / 2 + 2, sp - 4, rows * sp - 4, { fill: '#FFEDD5', rx: sp / 2, cls: s.c('cols', 'dg-up'), style: delay(i, 0.18) });
      out += T(xc(i), yLab, (i + 1) * rows, { size: 14, fill: C.orange, cls: s.c('csum'), style: delay(i, 0.2) });
    }
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) out += circ(xc(i), yr(j), rad, { fill: C.violet, stroke: '#fff', sw: 1.5, cls: s.c('dots'), style: delay(j * cols + i, 0.02) });
    out += T(90, yLab + 32, `${cols} × ${rows} = ${total}`, { size: 18, fill: C.blue, cls: s.c('f1') });
    out += T(180, yLab + 32, '=', { size: 18, cls: s.c('eq') });
    out += T(270, yLab + 32, `${rows} × ${cols} = ${total}`, { size: 18, fill: C.orange, cls: s.c('f2') });
    return out;
  });
  s.show('dots').snap('Có bao nhiêu chấm tròn? Em đếm theo <b>hai cách</b>.');
  s.show('rows').snap(`Đếm theo <b>hàng</b>: mỗi hàng có <b>${cols} chấm</b>, có <b>${rows} hàng</b>.`);
  s.snap(`${cols} chấm được lấy ${rows} lần: ${cols} × ${rows} = ?`, { ask: numAsk(total, { near: [cols, -cols], ok: `Đúng rồi! ${cols} × ${rows} = ${total}.` }) });
  s.show('rsum', 'f1').snap(`Đếm thêm từng hàng: ${Array.from({ length: rows }, (_, j) => (j + 1) * cols).join(', ')}. Vậy <b>${cols} × ${rows} = ${total}</b>.`);
  s.hide('rows', 'rsum').show('cols').snap(`Đếm theo <b>cột</b>: mỗi cột có <b>${rows} chấm</b>, có <b>${cols} cột</b>.`);
  s.show('csum', 'f2').snap(`Đếm thêm từng cột: ${Array.from({ length: cols }, (_, i) => (i + 1) * rows).join(', ')}. Vậy <b>${rows} × ${cols} = ${total}</b>.`);
  s.show('eq').snap(`Vẫn là những chấm tròn ấy, nên <b>${cols} × ${rows} = ${rows} × ${cols}</b>. Đổi chỗ các thừa số thì tích không thay đổi.`, { result: `${cols} × ${rows} = ${rows} × ${cols}` });
  return s.done();
}

// ── Bài 56, 57: nhân một số với một tổng, một hiệu ──────────────────────────
function distrib(spec) {
  const { a = 4, b = 3, c = 5, op = '+' } = spec;
  const minus = op === '-' || op === '−';
  const ncol = minus ? b : b + c, sp = Math.min(30, 236 / ncol, 100 / a), rad = sp * 0.34;
  const X0 = 196 - (ncol * sp) / 2, Y0 = 44, xc = (i) => X0 + sp / 2 + i * sp, yr = (j) => Y0 + sp / 2 + j * sp;
  const yG = Y0 + a * sp; // đáy lưới
  const split = minus ? b - c : b; // cột chia
  const xs = X0 + split * sp;
  const o = minus ? '−' : '+', r1v = a * b, r2v = a * c, inner = minus ? b - c : b + c, res = a * inner;
  const lines = minus
    ? [`${a} × (${b} − ${c}) = ${a} × ${inner} = ${res}`, `${a} × ${b} − ${a} × ${c} = ${r1v} − ${r2v} = ${res}`]
    : [`${a} × (${b} + ${c}) = ${a} × ${inner} = ${res}`, `${a} × ${b} + ${a} × ${c} = ${r1v} + ${r2v} = ${res}`];
  const H = yG + 108;
  const s = stepper(`${a} × (${b} ${o} ${c})`, 360, H, (s) => {
    let out = '';
    // dải tô
    out += rect(X0, Y0, ncol * sp, a * sp, { fill: '#F1F5F9', rx: 8, cls: s.c('all', 'is-fade') });
    if (!minus) {
      out += rect(X0, Y0, b * sp, a * sp, { fill: '#DBEAFE', rx: 8, cls: s.c('pA', 'is-grow') });
      out += rect(X0 + b * sp, Y0, c * sp, a * sp, { fill: '#FFEDD5', rx: 8, cls: s.c('pB', 'is-grow') });
    } else {
      out += rect(X0, Y0, b * sp, a * sp, { fill: '#DBEAFE', rx: 8, cls: s.c('pA', 'is-grow') });
      out += rect(X0, Y0, (b - c) * sp, a * sp, { fill: C.greenL, rx: 8, cls: s.c('pR', 'is-grow') });
    }
    for (let j = 0; j < a; j++) for (let i = 0; i < ncol; i++) {
      const second = i >= split;
      out += circ(xc(i), yr(j), rad, { fill: second ? C.orange : C.blue, stroke: '#fff', sw: 1.5, cls: s.c('dots'), style: delay(j * ncol + i, 0.025) });
      if (minus && second) out += g(s.c('cross'), ln(xc(i) - rad, yr(j) - rad, xc(i) + rad, yr(j) + rad, { stroke: C.red, sw: 2.2 }) + ln(xc(i) - rad, yr(j) + rad, xc(i) + rad, yr(j) - rad, { stroke: C.red, sw: 2.2 }), delay(j * c + i - split, 0.04));
    }
    out += ln(xs, Y0 - 6, xs, yG + 6, { stroke: C.ink, sw: 2, dash: '5 4', cls: s.c('dots') });
    // số hàng bên trái
    out += g(s.c('dots'), T(X0 - 20, (Y0 + yG) / 2, a, { size: 18, fill: C.violet }) + T(X0 - 20, (Y0 + yG) / 2 + 18, 'hàng', { size: 14, fill: C.violet }));
    // ngoặc trên
    if (!minus) {
      out += g(s.c('dots'), path(hbrace(X0 + 2, xs - 2, Y0 - 6), { stroke: C.blue }) + T((X0 + xs) / 2, Y0 - 30, b, { size: 16, fill: C.blue })
        + path(hbrace(xs + 2, X0 + ncol * sp - 2, Y0 - 6), { stroke: C.orange }) + T((xs + X0 + ncol * sp) / 2, Y0 - 30, c, { size: 16, fill: C.orange }));
    } else {
      out += g(s.c('dots'), path(hbrace(X0 + 2, X0 + ncol * sp - 2, Y0 - 6), { stroke: C.blue }) + T(X0 + (ncol * sp) / 2, Y0 - 30, b, { size: 16, fill: C.blue }));
    }
    // nhãn dưới lưới
    const yl = yG + 16;
    if (!minus) {
      out += T((X0 + xs) / 2, yl, `${a} × ${b} = ${r1v}`, { size: 15, fill: C.blue, cls: s.c('tA') });
      out += T((xs + X0 + ncol * sp) / 2, yl, `${a} × ${c} = ${r2v}`, { size: 15, fill: C.orange, cls: s.c('tB') });
    } else {
      out += T((X0 + xs) / 2, yl, `${a} × ${inner} = ${res}`, { size: 15, fill: C.green, cls: s.c('tR') });
      out += T((xs + X0 + ncol * sp) / 2, yl, `${a} × ${c} = ${r2v}`, { size: 15, fill: C.orange, cls: s.c('tB') });
    }
    out += calcLines(s, lines, yG + 50, 28, { max: 17 });
    return out;
  });
  if (!minus) {
    s.show('dots').snap(`Có <b>${a} hàng</b>, mỗi hàng có <b>${b} chấm xanh</b> và <b>${c} chấm cam</b>.`);
    s.show('all', 'L0').snap(`Đếm cả hình: mỗi hàng có ${b} + ${c} = ${inner} chấm, ${a} hàng: <b>${a} × (${b} + ${c}) = ${a} × ${inner} = ${res}</b>.`);
    s.hide('all').show('pA').snap(`Phần xanh: ${a} hàng, mỗi hàng ${b} chấm. ${a} × ${b} = ?`, { ask: numAsk(r1v, { near: [a, -a], ok: `Đúng rồi! ${a} × ${b} = ${r1v}.` }) });
    s.show('tA').snap(`Phần xanh có <b>${a} × ${b} = ${r1v}</b> chấm.`);
    s.show('pB', 'tB').snap(`Phần cam có <b>${a} × ${c} = ${r2v}</b> chấm.`);
    s.snap(`Cả hai phần: ${r1v} + ${r2v} = ?`, { ask: numAsk(res, { near: [1, -1, 10], ok: `Đúng rồi! ${r1v} + ${r2v} = ${res}, đúng bằng số chấm cả hình.` }) });
    s.show('L1').snap(`Cộng hai phần: <b>${a} × ${b} + ${a} × ${c} = ${r1v} + ${r2v} = ${res}</b>. Hai cách đếm cùng ra ${res}.`);
    s.snap(`Nhân một số với một tổng: nhân số đó với <b>từng số hạng</b> rồi <b>cộng</b> các kết quả.`, { result: `${a} × (${b} + ${c}) = ${a} × ${b} + ${a} × ${c}` });
  } else {
    s.show('dots', 'pA').snap(`Có <b>${a} hàng</b>, mỗi hàng <b>${b} chấm</b>. ${a} × ${b} = ?`, { ask: numAsk(r1v, { near: [a, -a], ok: `Đúng rồi! ${a} × ${b} = ${r1v}.` }) });
    s.show('cross', 'tB').snap(`Gạch bỏ ${c} cột bên phải: bớt đi <b>${a} × ${c} = ${r2v}</b> chấm.`);
    s.snap(`Còn lại: ${r1v} − ${r2v} = ?`, { ask: numAsk(res, { near: [1, -1, 2], ok: `Đúng rồi! ${r1v} − ${r2v} = ${res}.` }) });
    s.show('L1').snap(`Số chấm còn lại: <b>${a} × ${b} − ${a} × ${c} = ${r1v} − ${r2v} = ${res}</b>.`);
    s.show('pR', 'tR').snap(`Nhìn phần còn lại: mỗi hàng còn ${b} − ${c} = ${inner} chấm, ${a} hàng: <b>${a} × ${inner} = ${res}</b>.`);
    s.show('L0').snap(`Hai cách cùng ra ${res}. Nhân một số với một hiệu: nhân số đó với <b>số bị trừ</b> và <b>số trừ</b>, rồi <b>trừ</b> hai kết quả.`, { result: `${a} × (${b} − ${c}) = ${a} × ${b} − ${a} × ${c}` });
  }
  return s.done();
}

export const DIAGRAM = { sumDiff, ratioParts, ratio, avg, picto, barchart, numline, century, mapScale, array, distrib };

export const DIAGRAM_CSS = `
  .kd-svg .dg-up { animation: dgUp 0.7s ease-out both; transform-box: fill-box; transform-origin: center bottom; }
  @keyframes dgUp { from { transform: scaleY(0); } }
  @media (prefers-reduced-motion: reduce) {
    .kd-svg .dg-up { animation: dgUp 1.4s linear both; }
  }
`;
