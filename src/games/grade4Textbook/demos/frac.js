/**
 * Ví dụ phân số (📘 Kiến thức SGK Toán 4, chương bốn): hình tròn / băng giấy chia phần bằng nhau, tô màu,
 * quy đồng (chia nhỏ mỗi phần), cộng trừ (ghép, bớt phần tô), nhân (ô vuông 1m²), phân số của một số.
 */

import { frames, svg, txt, C, fr, numAsk, signHtml } from './util.js';
import { docSo } from '../../../engine/numberWords.js';

const W = 360;
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
const lcm = (a, b) => (a * b) / gcd(a, b);
/** Đọc phân số như sách: 3/4 "ba phần tư", 5/6 "năm phần sáu". */
export const readFrac = (a, b) => `${docSo(a)} phần ${b === 4 ? 'tư' : docSo(b)}`;

/** Hình tròn chia n phần bằng nhau; fill(i) → màu hoặc null; cls(i) → class thêm cho phần i. */
function pie(cx, cy, r, n, fill = () => null, { cls = () => '', lines = true, stroke = C.ink } = {}) {
  let h = '';
  if (n === 1) {
    h += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill(0) || '#fff'}" class="${cls(0)}"/>`;
  } else {
    for (let i = 0; i < n; i++) {
      const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
      const p = (a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
      h += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 ${n === 2 ? 0 : 0} 1 ${p(a1)} Z" fill="${fill(i) || '#fff'}" class="${cls(i)}" stroke="${lines ? stroke : 'none'}" stroke-width="1.5" stroke-linejoin="round"/>`;
    }
  }
  return `${h}<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${stroke}" stroke-width="2.5"/>`;
}

/** Băng giấy chia n phần; thick: cứ thick phần thì kẻ đậm (gộp phần khi rút gọn / chia nhỏ khi quy đồng). */
function bar(x, y, w, h, n, fill = () => null, { cls = () => '', thick = 0, lines = true, stroke = C.ink } = {}) {
  let s = '';
  const pw = w / n;
  for (let i = 0; i < n; i++) {
    const f = fill(i);
    if (f) s += `<rect x="${(x + i * pw).toFixed(2)}" y="${y}" width="${pw.toFixed(2)}" height="${h}" fill="${f}" class="${cls(i)}"/>`;
  }
  if (lines) {
    for (let i = 1; i < n; i++) {
      const bold = thick && i % thick === 0;
      s += `<line x1="${(x + i * pw).toFixed(2)}" y1="${y}" x2="${(x + i * pw).toFixed(2)}" y2="${y + h}" stroke="${stroke}" stroke-width="${bold ? 2.5 : 1.2}" ${bold ? '' : 'stroke-opacity="0.6"'}/>`;
    }
  }
  return `${s}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="3" fill="none" stroke="${stroke}" stroke-width="2.5"/>`;
}

/** Nhãn phân số trong svg: tử, gạch, mẫu. */
function fracLabel(x, y, a, b, { size = 22, color = C.ink, clsA = '', clsB = '' } = {}) {
  const wd = Math.max(String(a).length, String(b).length) * size * 0.62 + 8;
  return `<g>${txt(x, y - size * 0.62, a, { size, fill: color, cls: clsA })}
    <line x1="${x - wd / 2}" y1="${y}" x2="${x + wd / 2}" y2="${y}" stroke="${color}" stroke-width="2.5" stroke-linecap="round"/>
    ${txt(x, y + size * 0.66, b, { size, fill: color, cls: clsB })}</g>`;
}

const delay = (i, step = 0.08) => `style="animation-delay:${(i * step).toFixed(2)}s"`;

// ── Phân số: chia phần, tô màu, tử số, mẫu số (Bài 96) ──────────────────────
function frac({ a = 5, b = 6, shape = 'circle' }) {
  const F = frames(`Phân số ${fr(a, b)}`);
  const H = 200;
  const draw = ({ split, shade, showA, showB, newA, newB, newShade }) => {
    const fill = (i) => (shade && i < a ? C.blue : null);
    const cls = (i) => (newShade && i < a ? 'is-fade' : '');
    const fig = shape === 'circle'
      ? pie(120, 100, 80, split ? b : 1, fill, { cls })
      : bar(20, 70, 220, 60, split ? b : 1, fill, { cls });
    const lab = fracLabel(305, 100, a, b, { size: 32, clsA: showA ? (newA ? 'is-new' : '') : 'kd-ghost', clsB: showB ? (newB ? 'is-new' : '') : 'kd-ghost', color: C.ink });
    const tags = (showB ? txt(305, 168, 'mẫu số', { size: 14, fill: C.soft, cls: newB ? 'is-new' : '' }) : '') + (showA ? txt(305, 32, 'tử số', { size: 14, fill: C.blue, cls: newA ? 'is-new' : '' }) : '');
    return svg(W, H, fig + (showA || showB ? lab.replace('<line', `<line class="${newB ? 'is-new' : ''}"`) : '') + tags);
  };
  F.add(draw({}), `Đây là ${shape === 'circle' ? 'một hình tròn' : 'một băng giấy'}.`);
  F.add(draw({ split: true }), `Chia ${shape === 'circle' ? 'hình tròn' : 'băng giấy'} thành <b>${b} phần bằng nhau</b>.`);
  F.add(draw({ split: true, shade: true, newShade: true }), `Tô màu <b>${a} phần</b>.`);
  F.add(draw({ split: true, shade: true }), 'Phần đã tô màu là phân số nào?', {
    ask: { options: [fr(a, b), fr(b, a), fr(b - a || 1, b)].filter((v, i, x) => x.indexOf(v) === i), answer: 0, ok: `Đúng rồi! Tô màu ${a} phần trong ${b} phần bằng nhau: ${fr(a, b)}.` },
  });
  F.add(draw({ split: true, shade: true, showB: true, newB: true }), `<b>Mẫu số ${b}</b> viết dưới gạch ngang: hình được chia thành ${b} phần bằng nhau.`);
  F.add(draw({ split: true, shade: true, showB: true, showA: true, newA: true }), `<b>Tử số ${a}</b> viết trên gạch ngang: đã tô màu ${a} phần.`);
  F.add(draw({ split: true, shade: true, showA: true, showB: true }), `Phân số ${fr(a, b)} đọc là <b>${readFrac(a, b)}</b>.`, { result: `${fr(a, b)}: ${readFrac(a, b)}` });
  return F.done();
}

// ── Chia đều: thương là phân số (Bài 97) ────────────────────────────────────
function share({ cakes = 3, kids = 4 }) {
  const F = frames(`${cakes} cái bánh chia đều cho ${kids} em`);
  const H = 190;
  const KID = [C.blue, C.orange, C.green, C.violet, '#EC4899', '#14B8A6'];
  const r = Math.min(52, (W - 20) / cakes / 2 - 8);
  const cx = (i) => W / 2 + (i - (cakes - 1) / 2) * (2 * r + 16);
  const draw = (split, upTo, newKid) => {
    let h = '';
    for (let c = 0; c < cakes; c++) {
      h += pie(cx(c), 80, r, split ? kids : 1, (i) => (i < upTo ? KID[i] : '#FDE68A'), { cls: (i) => (i === newKid ? 'is-fade' : ''), stroke: '#92400E' });
    }
    // các em
    for (let k = 0; k < kids; k++) {
      const x = W / 2 + (k - (kids - 1) / 2) * 52;
      h += `<circle cx="${x}" cy="168" r="13" fill="${k < upTo ? KID[k] : '#E2E8F0'}"/>${txt(x, 168, k + 1, { size: 14, fill: '#fff' })}`;
    }
    return svg(W, H, h);
  };
  F.add(draw(false, 0), `Có <b>${cakes} cái bánh</b>, chia đều cho <b>${kids} em</b>. Mỗi em được bao nhiêu cái bánh?`);
  F.add(draw(true, 0), `Chia mỗi cái bánh thành <b>${kids} phần bằng nhau</b>.`);
  F.add(draw(true, 1, 0), `Em thứ nhất lấy ở mỗi cái bánh một phần: được <b>${cakes} phần</b>, mỗi phần là ${fr(1, kids)} cái bánh.`);
  F.add(draw(true, kids, -1), `Mỗi em đều được ${cakes} phần như thế. Mỗi em được mấy phần mấy cái bánh?`, {
    ask: { options: [fr(cakes, kids), fr(kids, cakes), fr(1, kids)], answer: 0, ok: `Đúng rồi! ${cakes} phần, mỗi phần ${fr(1, kids)} cái bánh: ${fr(cakes, kids)} cái bánh.` },
  });
  F.add(draw(true, kids, -1), `Ta viết <b>${cakes} : ${kids} = ${fr(cakes, kids)}</b> (cái bánh). Số bị chia là tử số, số chia là mẫu số.`, { result: `${cakes} : ${kids} = ${fr(cakes, kids)}` });
  return F.done();
}

// ── So sánh phân số với 1 (Bài 98) ──────────────────────────────────────────
function over1({ a = 5, b = 4 }) {
  const F = frames(`Phân số ${fr(a, b)} và 1`);
  const n = Math.max(1, Math.ceil(a / b));
  const H = 180;
  const r = Math.min(64, (W - 30) / n / 2 - 10);
  const cx = (i) => W / 2 + (i - (n - 1) / 2) * (2 * r + 24);
  const draw = (upTo) => {
    let h = '';
    for (let c = 0; c < n; c++) h += pie(cx(c), 82, r, b, (i) => (c * b + i < upTo ? C.orange : null), { cls: (i) => (c * b + i === upTo - 1 ? 'is-fade' : '') });
    for (let c = 0; c < n; c++) h += txt(cx(c), 170, '1 quả cam', { size: 14, fill: C.soft, weight: 700 });
    return svg(W, H, h);
  };
  F.add(draw(0), `Mỗi hình tròn là 1 quả cam, chia thành ${b} phần bằng nhau. Mỗi phần là ${fr(1, b)} quả.`);
  F.add(draw(a), `Lấy <b>${a} phần</b>: được ${fr(a, b)} quả cam.`);
  const sg = a > b ? '>' : a === b ? '=' : '<';
  F.add(draw(a), `So sánh ${fr(a, b)} với 1: chọn dấu đúng.`, {
    ask: { options: ['&gt;', '=', '&lt;'], answer: ['>', '=', '<'].indexOf(sg), ok: `Đúng rồi! Tử số ${a} ${signHtml(sg)} mẫu số ${b}, nên ${fr(a, b)} ${signHtml(sg)} 1.` },
  });
  const why = a > b ? `nhiều hơn 1 quả cam (1 quả và ${fr(a - b, b)} quả)` : a === b ? 'đúng bằng 1 quả cam' : 'chưa đủ 1 quả cam';
  F.add(draw(a), `${fr(a, b)} quả cam ${why}. Tử số ${a > b ? 'lớn hơn' : a === b ? 'bằng' : 'bé hơn'} mẫu số thì phân số ${a > b ? 'lớn hơn' : a === b ? 'bằng' : 'bé hơn'} 1.`, { result: `${fr(a, b)} ${signHtml(sg)} 1` });
  return F.done();
}

// ── Phân số bằng nhau (Bài 100) ─────────────────────────────────────────────
function equiv({ a = 3, b = 4, k = 2 }) {
  const F = frames(`${fr(a, b)} = ${fr(a * k, b * k)}`);
  const H = 190, x = 40, w = 280;
  const draw = (top, bottom, guide, lab) => {
    let h = '';
    h += bar(x, 30, w, 44, b, (i) => (top && i < a ? C.blue : null), { cls: () => (top === 'new' ? 'is-fade' : '') });
    h += `<g class="${bottom ? (bottom === 'new' ? 'is-fade' : '') : 'kd-ghost'}">${bar(x, 108, w, 44, b * k, (i) => (bottom === 'shade' || bottom === 'new' ? (i < a * k ? C.green : null) : null), { thick: k })}</g>`;
    if (guide) h += `<line x1="${x + (w * a) / b}" y1="18" x2="${x + (w * a) / b}" y2="166" stroke="${C.red}" stroke-width="2.5" stroke-dasharray="6 5" class="is-fade"/>`;
    if (lab) h += txt(x - 22, 52, fr2(a, b), { size: 15 }) + txt(x - 22, 130, fr2(a * k, b * k), { size: 15 });
    return svg(W, H, h);
  };
  const fr2 = (p, q) => `${p}/${q}`;
  F.add(draw('new', null), `Băng giấy thứ nhất chia ${b} phần bằng nhau, tô màu ${a} phần: ${fr(a, b)} băng giấy.`);
  F.add(draw(true, 'lines'), `Băng giấy thứ hai dài bằng băng thứ nhất, chia mỗi phần thành ${k} phần nhỏ: được ${b * k} phần bằng nhau.`);
  F.add(draw(true, 'new'), `Tô màu ${a * k} phần: ${fr(a * k, b * k)} băng giấy.`);
  F.add(draw(true, 'shade', true), `Hai phần tô màu dài bằng nhau. Vậy ${fr(a, b)} bằng phân số nào?`, {
    ask: { options: [fr(a * k, b * k), fr(a + k, b + k), fr(a, b * k)], answer: 0, ok: `Đúng rồi! ${fr(a, b)} = ${fr(a * k, b * k)}.` },
  });
  F.add(draw(true, 'shade', true), `Nhân cả tử số và mẫu số với ${k}: ${fr(a, b)} = ${fr(`${a} × ${k}`, `${b} × ${k}`)} = ${fr(a * k, b * k)}.`);
  F.add(draw(true, 'shade', true), `Ngược lại, chia cả tử số và mẫu số cho ${k}: ${fr(a * k, b * k)} = ${fr(`${a * k} : ${k}`, `${b * k} : ${k}`)} = ${fr(a, b)}.`, { result: `${fr(a, b)} = ${fr(a * k, b * k)}` });
  return F.done();
}

// ── Rút gọn phân số (Bài 101) ───────────────────────────────────────────────
function simplify({ a = 6, b = 8 }) {
  const steps = [];
  let p = a, q = b;
  while (gcd(p, q) > 1) {
    const g = gcd(p, q);
    // như sách: chia cho số nhỏ dễ thấy trước (2, 3, 5…), rồi tiếp
    const d = [2, 3, 5, 7].find(x => p % x === 0 && q % x === 0) || g;
    const use = steps.length === 0 && d !== g && b > 30 ? d : steps.length ? g : d;
    steps.push({ p, q, d: use });
    p /= use; q /= use;
  }
  const F = frames(`Rút gọn ${fr(a, b)}`);
  const H = 120, x = 20, w = 320;
  const draw = (k, isNew) => svg(W, H, bar(x, 30, w, 50, b, (i) => (i < a ? C.blue : null), { thick: k, lines: b <= 40 }) +
    (k > 1 ? `<g class="${isNew ? 'is-fade' : ''}">${Array.from({ length: b / k - 1 }, (_, i) => `<line x1="${x + ((i + 1) * k * w) / b}" y1="24" x2="${x + ((i + 1) * k * w) / b}" y2="86" stroke="${C.orange}" stroke-width="3"/>`).join('')}</g>` : ''));
  let chain = fr(a, b);
  let k = 1;
  F.add(draw(1), `Rút gọn ${fr(a, b)}: tìm phân số bằng nó mà tử số và mẫu số bé hơn.`);
  steps.forEach((s, n) => {
    F.add(draw(k), `${s.p} và ${s.q} cùng chia hết cho số nào?`, {
      ask: { options: [s.d, s.d + 1, s.d === 2 ? 5 : 2].map(String).filter((v, i, xs) => xs.indexOf(v) === i).sort(), answer: [s.d, s.d + 1, s.d === 2 ? 5 : 2].map(String).filter((v, i, xs) => xs.indexOf(v) === i).sort().indexOf(String(s.d)), ok: `Đúng rồi! ${s.p} : ${s.d} = ${s.p / s.d}; ${s.q} : ${s.d} = ${s.q / s.d}.` },
    });
    k *= s.d;
    chain += ` = ${fr(`${s.p} : ${s.d}`, `${s.q} : ${s.d}`)} = ${fr(s.p / s.d, s.q / s.d)}`;
    F.add(draw(k, true), `${n ? 'Rút gọn tiếp: ' : ''}chia cả tử số và mẫu số cho ${s.d}: ${fr(s.p, s.q)} = ${fr(`${s.p} : ${s.d}`, `${s.q} : ${s.d}`)} = ${fr(s.p / s.d, s.q / s.d)}. Gộp mỗi ${k} phần nhỏ thành một phần.`);
  });
  F.add(draw(k), `${p} và ${q} không cùng chia hết cho số nào lớn hơn 1: ${fr(p, q)} là <b>phân số tối giản</b>.`, { result: `${fr(a, b)} = ${fr(p, q)}` });
  return F.done();
}

// ── Quy đồng mẫu số (Bài 103, 104) ──────────────────────────────────────────
function common({ a = 1, b = 3, c = 2, d = 5 }) {
  const m = b % d === 0 ? b : d % b === 0 ? d : b * d;
  const kb = m / b, kd = m / d;
  const F = frames(`Quy đồng mẫu số ${fr(a, b)} và ${fr(c, d)}`);
  const H = 190, x = 40, w = 300;
  const draw = (s1, s2) => svg(W, H,
    txt(18, 52, `${a}/${b}`, { size: 15 }) + txt(18, 136, `${c}/${d}`, { size: 15 }) +
    `<g class="${s1 === 'new' ? 'is-fade' : ''}">${bar(x, 30, w, 44, s1 ? m : b, (i) => (i < (s1 ? a * kb : a) ? C.blue : null), { thick: s1 ? kb : 0 })}</g>` +
    `<g class="${s2 === 'new' ? 'is-fade' : ''}">${bar(x, 114, w, 44, s2 ? m : d, (i) => (i < (s2 ? c * kd : c) ? C.orange : null), { thick: s2 ? kd : 0 })}</g>`);
  F.add(draw(0, 0), `Hai phân số có mẫu số khác nhau: phần chia của hai băng giấy không bằng nhau.`);
  const why = m === b * d ? `Lấy ${b} × ${d} = ${m} làm mẫu số chung.` : `Vì ${m} : ${m === b ? d : b} = ${m === b ? kd : kb}, chọn ${m} làm mẫu số chung.`;
  const opts = [m, b + d, Math.max(b, d)].filter((v, i, xs) => xs.indexOf(v) === i);
  F.add(draw(0, 0), `Chọn mẫu số chung là bao nhiêu?`, { ask: { options: opts.map(String), answer: 0, ok: `Đúng rồi! ${why}` } });
  if (kb > 1) F.add(draw('new', 0), `${fr(a, b)} = ${fr(`${a} × ${kb}`, `${b} × ${kb}`)} = ${fr(a * kb, m)}: chia mỗi phần thành ${kb} phần nhỏ.`);
  else F.add(draw(0, 0), `Giữ nguyên ${fr(a, b)} vì mẫu số đã là ${m}.`);
  if (kd > 1) F.add(draw(kb > 1 ? 1 : 0, 'new'), `${fr(c, d)} = ${fr(`${c} × ${kd}`, `${d} × ${kd}`)} = ${fr(c * kd, m)}: chia mỗi phần thành ${kd} phần nhỏ.`);
  else F.add(draw(kb > 1 ? 1 : 0, 0), `Giữ nguyên ${fr(c, d)} vì mẫu số đã là ${m}.`);
  F.add(draw(kb > 1 ? 1 : 0, kd > 1 ? 1 : 0), `Hai băng giấy giờ chia cùng ${m} phần bằng nhau. Mẫu số chung là <b>${m}</b>.`, { result: `${fr(a * kb, m)} và ${fr(c * kd, m)}` });
  return F.done();
}

// ── So sánh hai phân số (Bài 107, 109) ──────────────────────────────────────
function fcmp({ a = 2, b = 5, c = 3, d = 5 }) {
  const m = b === d ? b : lcm(b, d) === Math.max(b, d) ? Math.max(b, d) : b * d;
  const A = a * (m / b), Cc = c * (m / d);
  const F = frames(`So sánh ${fr(a, b)} và ${fr(c, d)}`);
  const H = 190, x = 40, w = 300;
  const draw = (q, guide) => svg(W, H,
    bar(x, 30, w, 44, q ? m : b, (i) => (i < (q ? A : a) ? C.blue : null), { thick: q && m !== b ? m / b : 0 }) +
    bar(x, 114, w, 44, q ? m : d, (i) => (i < (q ? Cc : c) ? C.orange : null), { thick: q && m !== d ? m / d : 0 }) +
    (guide ? `<line x1="${x + (w * a) / b}" y1="18" x2="${x + (w * a) / b}" y2="170" stroke="${C.red}" stroke-width="2.5" stroke-dasharray="6 5" class="is-fade"/>` : ''));
  const sg = a * d < c * b ? '<' : a * d > c * b ? '>' : '=';
  if (b === d) {
    F.add(draw(false), `Hai phân số <b>cùng mẫu số ${b}</b>: hai băng giấy chia cùng ${b} phần bằng nhau.`);
  } else {
    F.add(draw(false), `Hai phân số <b>khác mẫu số</b>: phần chia của hai băng không bằng nhau, khó so sánh.`);
    F.add(draw(true), `Quy đồng mẫu số: ${fr(a, b)} = ${fr(A, m)}; ${fr(c, d)} = ${fr(Cc, m)}.`);
  }
  F.add(draw(b !== d, true), `So sánh ${fr(a, b)} và ${fr(c, d)}: chọn dấu đúng.`, {
    ask: { options: ['&lt;', '=', '&gt;'], answer: ['<', '=', '>'].indexOf(sg), ok: `Đúng rồi! ${b === d ? `${a} ${signHtml(sg)} ${c}` : `${fr(A, m)} ${signHtml(sg)} ${fr(Cc, m)} vì ${A} ${signHtml(sg)} ${Cc}`}.` },
  });
  F.add(draw(b !== d, true), `${b === d ? `Cùng mẫu số: tử số ${a} ${signHtml(sg)} ${c}` : `Sau khi quy đồng, so sánh tử số: ${A} ${signHtml(sg)} ${Cc}`}, nên <b>${fr(a, b)} ${signHtml(sg)} ${fr(c, d)}</b>.`, { result: `${fr(a, b)} ${signHtml(sg)} ${fr(c, d)}` });
  return F.done();
}

// ── Cộng, trừ phân số (Bài 114, 115, 118, 119) ──────────────────────────────
function fop({ a = 3, b = 8, c = 2, d = 8, op = '+' }) {
  const m = b === d ? b : Math.max(b, d) % Math.min(b, d) === 0 ? Math.max(b, d) : b * d;
  const A = a * (m / b), Cc = c * (m / d), R = op === '+' ? A + Cc : A - Cc;
  const sym = op === '+' ? '+' : '−';
  const F = frames(`${fr(a, b)} ${sym} ${fr(c, d)}`);
  const nb = Math.max(1, Math.ceil(R / m), Math.ceil(A / m));
  const H = 200, x = 30, gap = 10, w = (300 - gap * (nb - 1)) / nb;
  // các băng kết quả (mỗi băng là 1 đơn vị)
  const result = (shown, cross) => {
    let h = '';
    for (let u = 0; u < nb; u++) {
      const bx = x + u * (w + gap);
      h += bar(bx, 120, w, 44, m, (i) => {
        const k = u * m + i;
        if (op === '+') return k < A ? C.blue : k < R && shown ? C.orange : null;
        return k < A ? (cross && k >= R ? C.redL : C.blue) : null;
      }, { cls: (i) => (op === '+' && u * m + i >= A && u * m + i < R ? 'is-fade' : ''), lines: m <= 40 });
      if (op === '−' && cross) for (let i = 0; i < m; i++) { const k = u * m + i; if (k >= R && k < A) { const px = bx + (i + 0.5) * (w / m); h += `<path d="M${px - 6} 134 l12 16 M${px + 6} 134 l-12 16" stroke="${C.red}" stroke-width="2.5" class="is-new"/>`; } }
    }
    return h;
  };
  const top = (q) => bar(x, 30, 140, 40, q ? m : b, (i) => (i < (q ? A : a) ? C.blue : null), { thick: q && m !== b ? m / b : 0, lines: m <= 40 }) +
    bar(x + 160, 30, 140, 40, q ? m : d, (i) => (i < (q ? Cc : c) ? C.orange : null), { thick: q && m !== d ? m / d : 0, lines: m <= 40 }) +
    txt(x + 150, 50, sym, { size: 20 });
  const draw = (q, res, cross) => svg(W, H, top(q) + `<g class="${res ? '' : 'kd-ghost'}">${result(res === 'all' || res === 'cross', cross)}</g>` + txt(x - 14, 142, '=', { size: 20, cls: res ? '' : 'kd-ghost' }));
  F.add(draw(false), `${op === '+' ? 'Cộng' : 'Trừ'} hai phân số ${fr(a, b)} và ${fr(c, d)}.`);
  if (b !== d) {
    F.add(draw(false), 'Hai phân số khác mẫu số. Bước đầu tiên là gì?', { ask: { options: ['Quy đồng mẫu số', `${op === '+' ? 'Cộng' : 'Trừ'} ngay tử số, mẫu số`], answer: 0, ok: 'Đúng rồi! Phải quy đồng mẫu số trước, để các phần bằng nhau.' } });
    F.add(draw(true), `Quy đồng: ${m === b ? `giữ ${fr(a, b)}` : `${fr(a, b)} = ${fr(`${a} × ${m / b}`, `${b} × ${m / b}`)} = ${fr(A, m)}`}; ${m === d ? `giữ ${fr(c, d)}` : `${fr(c, d)} = ${fr(`${c} × ${m / d}`, `${d} × ${m / d}`)} = ${fr(Cc, m)}`}.`);
  }
  const q = b !== d;
  if (op === '+') {
    F.add(draw(q, 'first'), `Lấy ${fr(A, m)}: ${A} phần.`);
    F.add(draw(q, 'first'), `Thêm ${Cc} phần nữa thì được tất cả bao nhiêu phần?`, { ask: numAsk(R, { near: [1, -1, m], ok: `Đúng rồi! ${A} + ${Cc} = ${R} phần.` }) });
    F.add(draw(q, 'all'), `Cộng hai tử số, <b>giữ nguyên mẫu số</b>: ${fr(A, m)} + ${fr(Cc, m)} = ${fr(`${A} + ${Cc}`, m)} = ${fr(R, m)}.`, { result: `${fr(a, b)} + ${fr(c, d)} = ${fr(R, m)}` });
  } else {
    F.add(draw(q, 'first'), `Có ${fr(A, m)}: ${A} phần.`);
    F.add(draw(q, 'cross', true), `Bớt đi ${Cc} phần. Còn lại bao nhiêu phần?`, { ask: numAsk(R, { near: [1, -1, Cc], ok: `Đúng rồi! ${A} − ${Cc} = ${R} phần.` }) });
    F.add(draw(q, 'cross', true), `Trừ hai tử số, <b>giữ nguyên mẫu số</b>: ${fr(A, m)} − ${fr(Cc, m)} = ${fr(`${A} − ${Cc}`, m)} = ${fr(R, m)}.`, { result: `${fr(a, b)} − ${fr(c, d)} = ${fr(R, m)}` });
  }
  return F.done();
}

// ── Nhân phân số: diện tích hình chữ nhật trong hình vuông 1m² (Bài 122) ────
function fmul({ a = 4, b = 5, c = 2, d = 3 }) {
  const F = frames(`${fr(a, b)} × ${fr(c, d)}`);
  const H = 240, S = 180, x0 = 70, y0 = 30;
  const draw = ({ grid, shade, count }) => {
    let h = `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="#fff" stroke="${C.ink}" stroke-width="2.5"/>`;
    if (shade) h += `<rect x="${x0}" y="${y0 + S - (S * c) / d}" width="${(S * a) / b}" height="${(S * c) / d}" fill="${C.blueL}" class="${shade === 'new' ? 'is-fade' : ''}"/>`;
    if (grid) {
      for (let i = 1; i < b; i++) h += `<line x1="${x0 + (i * S) / b}" y1="${y0}" x2="${x0 + (i * S) / b}" y2="${y0 + S}" stroke="${C.soft}" stroke-width="1.2" class="${grid === 'new' ? 'is-fade' : ''}"/>`;
      for (let j = 1; j < d; j++) h += `<line x1="${x0}" y1="${y0 + (j * S) / d}" x2="${x0 + S}" y2="${y0 + (j * S) / d}" stroke="${C.soft}" stroke-width="1.2" class="${grid === 'new' ? 'is-fade' : ''}"/>`;
    }
    if (shade) h += `<rect x="${x0}" y="${y0 + S - (S * c) / d}" width="${(S * a) / b}" height="${(S * c) / d}" fill="none" stroke="${C.blue}" stroke-width="3"/>`;
    if (count) {
      let k = 0;
      for (let j = 0; j < c; j++) for (let i = 0; i < a; i++) {
        k++;
        h += txt(x0 + (i + 0.5) * (S / b), y0 + S - (j + 0.5) * (S / d), k, { size: 15, fill: C.blue, cls: 'is-new' }).replace('class="is-new"', `class="is-new" ${delay(k, 0.06)}`);
      }
    }
    h += txt(x0 + S / 2, y0 - 12, '1m', { size: 14, fill: C.soft });
    h += txt(x0 - 18, y0 + S / 2, '1m', { size: 14, fill: C.soft });
    if (shade) {
      h += txt(x0 + (S * a) / b / 2, y0 + S + 14, `${a}/${b}m`, { size: 14, fill: C.blue });
      h += txt(x0 + S + 30, y0 + S - (S * c) / d / 2, `${c}/${d}m`, { size: 14, fill: C.blue });
    }
    return svg(W, H, h);
  };
  F.add(draw({}), `Hình vuông cạnh 1m có diện tích <b>1m²</b>. Tính diện tích hình chữ nhật dài ${fr(a, b)}m, rộng ${fr(c, d)}m.`);
  F.add(draw({ grid: 'new' }), `Chia hình vuông thành ${b} × ${d} = <b>${b * d} ô</b> bằng nhau. Mỗi ô là ${fr(1, b * d)}m².`);
  F.add(draw({ grid: true, shade: 'new' }), `Hình chữ nhật dài ${fr(a, b)}m, rộng ${fr(c, d)}m. Nó chiếm bao nhiêu ô?`, { ask: numAsk(a * c, { near: [1, -1, a + c - a * c], ok: `Đúng rồi! ${a} ô mỗi hàng, ${c} hàng: ${a} × ${c} = ${a * c} ô.` }) });
  F.add(draw({ grid: true, shade: true, count: true }), `Hình chữ nhật chiếm <b>${a * c} ô</b>: diện tích là ${fr(a * c, b * d)}m².`);
  F.add(draw({ grid: true, shade: true }), `Lấy tử số nhân tử số, mẫu số nhân mẫu số: ${fr(a, b)} × ${fr(c, d)} = ${fr(`${a} × ${c}`, `${b} × ${d}`)} = ${fr(a * c, b * d)}.`, { result: `${fr(a, b)} × ${fr(c, d)} = ${fr(a * c, b * d)}` });
  return F.done();
}

// ── Tìm phân số của một số (Bài 125) ────────────────────────────────────────
function fof({ n = 12, a = 2, b = 3, thing = 'quả cam' }) {
  const per = n / b;
  const F = frames(`${fr(a, b)} của ${n} ${thing}`);
  const H = 40 + b * 46;
  const orange = (x, y, cls) => `<g class="${cls}"><circle cx="${x}" cy="${y}" r="15" fill="#FB923C" stroke="#C2410C" stroke-width="1.5"/><path d="M${x} ${y - 15} q4 -7 10 -6" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  const draw = ({ group, take }) => {
    let h = '';
    for (let r = 0; r < b; r++) {
      const y = 34 + r * 46;
      if (group) h += `<rect x="${W / 2 - per * 19 - 10}" y="${y - 21}" width="${per * 38 + 20}" height="42" rx="12" fill="${take && r < a ? C.greenL : '#F1F5F9'}" stroke="${take && r < a ? C.green : C.line}" stroke-width="2" class="${group === 'new' || (take === 'new' && r < a) ? 'is-fade' : ''}"/>`;
      for (let i = 0; i < per; i++) h += orange(W / 2 + (i - (per - 1) / 2) * 38, y, '');
      if (group) h += txt(W / 2 + per * 19 + 28, y, `${fr2(1, b)}`, { size: 14, fill: C.soft });
    }
    return svg(W, H, h);
  };
  const fr2 = (p, q) => `${p}/${q}`;
  F.add(draw({}), `Có <b>${n} ${thing}</b>. Tìm ${fr(a, b)} số ${thing} đó.`);
  F.add(draw({ group: 'new' }), `Chia ${n} ${thing} thành <b>${b} phần bằng nhau</b>. Mỗi phần có bao nhiêu ${thing}?`, { ask: numAsk(per, { near: [1, -1, 2], ok: `Đúng rồi! ${fr(1, b)} số ${thing} là ${n} : ${b} = ${per} (${thing}).` }) });
  F.add(draw({ group: true, take: 'new' }), `${fr(a, b)} số ${thing} là ${a} phần như thế: ${per} × ${a} = <b>${per * a}</b> (${thing}).`);
  F.add(draw({ group: true, take: true }), `Tính gọn: lấy số đó nhân với phân số: <b>${n} × ${fr(a, b)} = ${n * a / b}</b> (${thing}).`, { result: `${n} × ${fr(a, b)} = ${n * a / b}` });
  return F.done();
}

export const FRAC = { frac, share, over1, equiv, simplify, common, fcmp, fop, fmul, fof };
export const FRAC_CSS = '';
