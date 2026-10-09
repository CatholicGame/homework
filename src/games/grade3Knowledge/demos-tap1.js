/**
 * Ví dụ "xem từng bước" riêng của 📘 Kiến thức Toán 3 Tập Một (Bài 1–44), thêm vào knowledgeDemo.js bằng registerDemos.
 * Mỗi loại: build(spec) → { title, frames } (xem grade4Textbook/demos/util.js). Mọi bước của một ví dụ dùng cùng viewBox,
 * phần chưa tới vẫn có trong hình nhưng ẩn (kd-ghost), nên hình không nhảy giữa các bước.
 *
 *   { kind: 'g3a-blocks', n: 243 }                          Bài 1   số có ba chữ số bằng tấm trăm, thanh chục, khối đơn vị
 *   { kind: 'g3a-find', op: '+', a: 32, b: 28, hide: 0 }    Bài 3, 13  tìm thành phần (hide: 0 số thứ nhất, 1 số thứ hai)
 *   { kind: 'g3a-table', a: 3, n: 4 }                       Bài 4–12  a được lấy n lần, rồi chia ngược lại
 *   { kind: 'g3a-part', n: 3, shape: 'circle' | 'rect' | 'set', count, thing }   Bài 14  một phần mấy
 *   { kind: 'g3a-line3' }                                   Bài 7   ba điểm thẳng hàng
 *   { kind: 'g3a-clock', h: 15, m: 30 }                     Bài 7   xem giờ buổi chiều
 *   { kind: 'g3a-mid', len: 6 }                             Bài 16  điểm ở giữa, trung điểm
 *   { kind: 'g3a-circle', r: 3 }                            Bài 17, 20  tâm, bán kính, đường kính; vẽ bằng com-pa
 *   { kind: 'g3a-right' }                                   Bài 18  kiểm tra góc vuông bằng ê ke
 *   { kind: 'g3a-poly', shape: 'tri' | 'quad' | 'rect' | 'square' }   Bài 19
 *   { kind: 'g3a-grid', w: 4, h: 3 }                        Bài 20  vẽ hình chữ nhật, hình vuông trên giấy ô vuông
 *   { kind: 'g3a-cube', box: false }                        Bài 21  đỉnh, cạnh, mặt
 *   { kind: 'g3a-times', mode: 'up' | 'down' | 'ratio', a, k | b, unit }   Bài 24, 27, 39
 *   { kind: 'g3a-share', n: 9, k: 2, thing }                Bài 25  chia hết, chia có dư
 *   { kind: 'g3a-twostep', a, rel: '+' | '−' | '×', d, want: 'total' | 'diff', names, unit, story? }   Bài 28
 *   { kind: 'g3a-ruler', mm: 35, thing }                    Bài 30  mi-li-mét
 *   { kind: 'g3a-scale', weights: [500, 200], thing }       Bài 31  gam
 *   { kind: 'g3a-jug', v: 400, cap: 1000, step: 100 }       Bài 32  mi-li-lít
 *   { kind: 'g3a-thermo', t: 30, min: 0, max: 50 }          Bài 33  nhiệt độ
 */

import { registerDemos } from '../grade4Textbook/knowledgeDemo.js';
import { frames, svg, txt, C, fr, numAsk, fmt } from '../grade4Textbook/demos/util.js';
import { docSo } from '../../engine/numberWords.js';

const W = 360;
const vis = (shown, isNew) => (!shown ? 'kd-ghost' : isNew ? 'is-new' : '');
const dl = (i, s = 0.06) => `animation-delay:${(i * s).toFixed(2)}s`;
const seg = (x1, y1, x2, y2, { color = C.ink, w = 3, dash = '', cls = '', style = '' } = {}) =>
  `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"${dash ? ` stroke-dasharray="${dash}"` : ''} class="${cls}"${style ? ` style="${style}"` : ''}/>`;
const dot = (x, y, { r = 5, fill = C.ink, cls = '', style = '' } = {}) =>
  `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${fill}" class="${cls}"${style ? ` style="${style}"` : ''}/>`;
const drawLen = (x1, y1, x2, y2) => `--len:${Math.ceil(Math.hypot(x2 - x1, y2 - y1)) + 2}`;
const PART = { 2: 'hai', 3: 'ba', 4: 'tư', 5: 'năm', 6: 'sáu', 7: 'bảy', 8: 'tám', 9: 'chín', 10: 'mười' };
const apply = (x, op, y) => (op === '+' ? x + y : op === '−' ? x - y : op === '×' ? x * y : x / y);
const normOp = (op) => (op === '-' ? '−' : op === 'x' || op === '*' ? '×' : op === '/' ? ':' : op);

/** Câu hỏi chọn: đáp án đúng và các phương án sai (bỏ trùng); số thì xếp từ bé đến lớn. */
function choice(right, wrongs, ok) {
  const all = [right, ...wrongs].filter((v, i, a) => a.indexOf(v) === i);
  const plain = (v) => String(v).replace(/<[^>]+>/g, '').replace(/\s/g, '');
  let opts;
  if (all.every((v) => /^\d+$/.test(plain(v)))) opts = [...all].sort((x, y) => Number(plain(x)) - Number(plain(y)));
  else { opts = all.slice(1); opts.splice(plain(right).length % all.length, 0, right); }
  return { options: opts, answer: opts.indexOf(right), ok };
}

/** Ngoặc nhọn nằm ngang từ x1 tới x2, đỉnh nhọn hướng lên (dir -1) hoặc xuống (1). */
function hbrace(x1, x2, y, dir = -1, d = 8, { color = C.soft, cls = '' } = {}) {
  const m = (x1 + x2) / 2;
  return `<path d="M${x1} ${y - dir * d} Q${x1} ${y} ${x1 + d} ${y} L${m - d} ${y} Q${m} ${y} ${m} ${y + dir * d} Q${m} ${y} ${m + d} ${y} L${x2 - d} ${y} Q${x2} ${y} ${x2} ${y - dir * d}" fill="none" stroke="${color}" stroke-width="2" class="${cls}"/>`;
}
function vbrace(x, y1, y2, d = 8, { color = C.soft, cls = '' } = {}) {
  const m = (y1 + y2) / 2;
  return `<path d="M${x - d} ${y1} Q${x} ${y1} ${x} ${y1 + d} L${x} ${m - d} Q${x} ${m} ${x + d} ${m} Q${x} ${m} ${x} ${m + d} L${x} ${y2 - d} Q${x} ${y2} ${x - d} ${y2}" fill="none" stroke="${color}" stroke-width="2" class="${cls}"/>`;
}

// ── Bài 1: số có ba chữ số (tấm trăm, thanh chục, khối đơn vị) ──────────────────
function blocks({ n = 243 }) {
  const [t, c, u] = String(n).padStart(3, '0').split('').map(Number);
  const F = frames(`Số ${n}`);
  // ba vùng: trăm (5 tấm một hàng), chục (5 thanh một hàng), đơn vị (3 khối một hàng); cao theo số hàng cần
  const ZONES = [[6, 196], [208, 74], [290, 64]];
  const ZX = ZONES.map(([x, w]) => x + w / 2);
  const ZH = Math.max(44 * Math.max(1, Math.ceil(t / 5)), 44 * Math.max(1, Math.ceil(c / 5)), 13 * Math.ceil(u / 3) + 8) + 12;
  const hundred = (x, y) => {
    let h = `<rect x="${x}" y="${y}" width="36" height="36" rx="2" fill="#BFDBFE" stroke="${C.blue}" stroke-width="1.5"/>`;
    for (let i = 1; i < 10; i++) h += `<line x1="${x + i * 3.6}" y1="${y}" x2="${x + i * 3.6}" y2="${y + 36}" stroke="${C.blue}" stroke-width="0.5" opacity="0.6"/><line x1="${x}" y1="${y + i * 3.6}" x2="${x + 36}" y2="${y + i * 3.6}" stroke="${C.blue}" stroke-width="0.5" opacity="0.6"/>`;
    return h;
  };
  const ten = (x, y) => {
    let h = `<rect x="${x}" y="${y}" width="7" height="36" rx="1.5" fill="#FED7AA" stroke="${C.orange}" stroke-width="1.5"/>`;
    for (let i = 1; i < 10; i++) h += `<line x1="${x}" y1="${y + i * 3.6}" x2="${x + 7}" y2="${y + i * 3.6}" stroke="${C.orange}" stroke-width="0.5" opacity="0.7"/>`;
    return h;
  };
  const one = (x, y) => `<rect x="${x}" y="${y}" width="8" height="8" rx="1.5" fill="#BBF7D0" stroke="${C.green}" stroke-width="1.5"/>`;
  const draw = ({ counts = false, num = false, sum = false, isNew = '' }) => {
    let h = '';
    ZONES.forEach(([x, w]) => { h += `<rect x="${x}" y="6" width="${w}" height="${ZH}" rx="10" fill="#F8FAFC"/>`; });
    const rowOf = (k, per, i) => Math.min(per, k - Math.floor(i / per) * per); // số khối trên hàng của khối i
    for (let i = 0; i < t; i++) h += hundred(ZX[0] - (rowOf(t, 5, i) * 40 - 4) / 2 + (i % 5) * 40, 14 + Math.floor(i / 5) * 44);
    for (let i = 0; i < c; i++) h += ten(ZX[1] - (rowOf(c, 5, i) * 11 - 4) / 2 + (i % 5) * 11, 14 + Math.floor(i / 5) * 44);
    for (let i = 0; i < u; i++) h += one(ZX[2] - (rowOf(u, 3, i) * 13 - 5) / 2 + (i % 3) * 13, 14 + Math.floor(i / 3) * 13);
    const lab = [`${t} trăm`, `${c} chục`, `${u} đơn vị`];
    const col = [C.blue, C.orange, C.green];
    ZX.forEach((x, i) => {
      h += txt(x, ZH + 24, lab[i], { size: 15, fill: col[i], cls: vis(counts, isNew === 'counts') });
      h += txt(x, ZH + 58, [t, c, u][i], { size: 32, fill: col[i], cls: vis(num, isNew === 'num') });
    });
    void sum;
    return svg(W, ZH + 82, h);
  };
  F.add(draw({}), 'Mỗi tấm vuông là <b>1 trăm</b>, mỗi thanh là <b>1 chục</b>, mỗi khối nhỏ là <b>1 đơn vị</b>.');
  F.add(draw({ counts: true, isNew: 'counts' }), `Đếm từng loại: <b>${t} trăm, ${c} chục, ${u} đơn vị</b>.`);
  const S = String(n);
  const wrongs = [S[0] + S[2] + S[1], S[2] + S[1] + S[0], `${t}${u}`].map(Number).filter((v) => v !== n && v >= 10);
  F.add(draw({ counts: true }), 'Số này viết thế nào?', { ask: choice(String(n), wrongs.map(String), `Đúng rồi! Viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị: <b>${n}</b>.`) });
  F.add(draw({ counts: true, num: true, isNew: 'num' }), `Viết số: <b>${n}</b>. Đọc số: <b>${docSo(n)}</b>.${c === 0 && u ? ' Hàng chục là 0 thì đọc "linh".' : ''}`);
  const parts = [t * 100, c * 10, u].filter(Boolean);
  F.add(draw({ counts: true, num: true, sum: true, isNew: 'sum' }), `Viết thành tổng các trăm, chục và đơn vị: <b>${n} = ${parts.join(' + ')}</b>.`, { result: `${n} = ${parts.join(' + ')}` });
  return F.done();
}

// ── Bài 3, 13: tìm thành phần của phép tính ─────────────────────────────────────
const NAMES = { '+': ['Số hạng', 'Số hạng', 'Tổng'], '−': ['Số bị trừ', 'Số trừ', 'Hiệu'], '×': ['Thừa số', 'Thừa số', 'Tích'], ':': ['Số bị chia', 'Số chia', 'Thương'] };
const FLIP = { '+': '−', '−': '+', '×': ':', ':': '×' };

function find(spec) {
  const op = normOp(spec.op || '+');
  const { a, b, hide = 0 } = spec;
  const r = apply(a, op, b);
  const vals = [a, b, r];
  const x = vals[hide];
  let sol, rule;
  if (op === '+') { sol = [r, '−', vals[1 - hide]]; rule = 'Muốn tìm số hạng, ta lấy tổng trừ đi số hạng kia.'; }
  else if (op === '×') { sol = [r, ':', vals[1 - hide]]; rule = 'Muốn tìm thừa số, ta lấy tích chia cho thừa số kia.'; }
  else if (op === '−') {
    if (hide === 0) { sol = [r, '+', b]; rule = 'Muốn tìm số bị trừ, ta lấy hiệu cộng với số trừ.'; }
    else { sol = [a, '−', r]; rule = 'Muốn tìm số trừ, ta lấy số bị trừ trừ đi hiệu.'; }
  } else if (hide === 0) { sol = [r, '×', b]; rule = 'Muốn tìm số bị chia, ta lấy thương nhân với số chia.'; }
  else { sol = [a, ':', r]; rule = 'Muốn tìm số chia, ta lấy số bị chia chia cho thương.'; }
  const solStr = `${sol[0]} ${sol[1]} ${sol[2]}`;
  const wrongStr = `${sol[0]} ${FLIP[sol[1]]} ${sol[2]}`;
  const show = (i) => (i === hide ? '?' : fmt(vals[i]));
  const eqStr = `${show(0)} ${op} ${show(1)} = ${show(2)}`;
  const F = frames(`Tìm ${NAMES[op][hide].toLowerCase()}: ${eqStr}`);
  const XS = [62, 122, 182, 240, 300];
  const draw = ({ names = false, diag = false, calc = 0, solved = false, isNew = '' }) => {
    let h = '';
    const term = (i, xc) => {
      if (i !== hide) return txt(xc, 40, fmt(vals[i]), { size: 30 });
      if (solved) return `<rect x="${xc - 30}" y="18" width="60" height="44" rx="10" fill="${C.greenL}"/>${txt(xc, 40, fmt(x), { size: 30, fill: C.green, cls: isNew === 'solved' ? 'is-new' : '' })}`;
      return `<rect x="${xc - 30}" y="18" width="60" height="44" rx="10" fill="#FFF7ED" stroke="${C.orange}" stroke-width="2" stroke-dasharray="5 4"/>${txt(xc, 40, '?', { size: 30, fill: C.orange })}`;
    };
    h += term(0, XS[0]) + txt(XS[1], 40, op, { size: 28, fill: C.soft }) + term(1, XS[2]) + txt(XS[3], 40, '=', { size: 28, fill: C.soft }) + term(2, XS[4]);
    [0, 2, 4].forEach((xi, i) => { h += txt(XS[xi], 78, NAMES[op][i], { size: 13, fill: i === hide ? C.orange : C.violet, cls: vis(names, isNew === 'names') }); });
    // sơ đồ
    let d = '';
    const X0 = 40, BW = 280, Y = 128, BH = 28;
    const lab = (i) => (i === hide && !solved ? '?' : fmt(vals[i]));
    const labCol = (i) => (i === hide ? (solved ? C.green : C.orange) : C.ink);
    if (op === '+' || op === '−') {
      const whole = op === '+' ? 2 : 0, p = op === '+' ? [0, 1] : [1, 2];
      const tot = vals[whole];
      const w0 = Math.max(56, Math.min(BW - 56, (BW * vals[p[0]]) / tot));
      d += hbrace(X0, X0 + BW, Y - 10, -1) + txt(X0 + BW / 2, Y - 30, lab(whole), { size: 17, fill: labCol(whole) });
      d += `<rect x="${X0}" y="${Y}" width="${w0}" height="${BH}" fill="${C.blueL}" stroke="${C.blue}" stroke-width="1.5"/>`;
      d += `<rect x="${X0 + w0}" y="${Y}" width="${BW - w0}" height="${BH}" fill="${C.orangeL}" stroke="${C.orange}" stroke-width="1.5"/>`;
      d += txt(X0 + w0 / 2, Y + BH / 2, lab(p[0]), { size: 16, fill: labCol(p[0]) }) + txt(X0 + w0 + (BW - w0) / 2, Y + BH / 2, lab(p[1]), { size: 16, fill: labCol(p[1]) });
    } else {
      // ×: b đoạn, mỗi đoạn a, cả đoạn r; ':': cả đoạn a chia b phần, mỗi phần r
      const k = b, eachI = op === '×' ? 0 : 2, whole = op === '×' ? 2 : 0;
      const sw = BW / k;
      for (let i = 0; i < k; i++) d += `<rect x="${(X0 + i * sw).toFixed(1)}" y="${Y}" width="${sw.toFixed(1)}" height="${BH}" fill="${i % 2 ? C.blueL : '#DBEAFE'}" stroke="${C.blue}" stroke-width="1.5"/>`;
      for (let i = 0; i < k; i++) d += txt(X0 + (i + 0.5) * sw, Y + BH / 2, lab(eachI), { size: k > 7 ? 12 : 15, fill: labCol(eachI) });
      d += hbrace(X0, X0 + BW, Y - 10, -1) + txt(X0 + BW / 2, Y - 30, lab(whole), { size: 17, fill: labCol(whole) });
      const cntLab = lab(1);
      d += txt(X0 + BW / 2, Y + BH + 16, op === '×' ? `${cntLab} lần` : `${cntLab} phần bằng nhau`, { size: 14, fill: hide === 1 ? labCol(1) : C.soft, weight: 700 });
    }
    h += `<g class="${vis(diag, isNew === 'diag')}">${d}</g>`;
    const calcTxt = calc === 2 ? `${solStr} = ${fmt(x)}` : `${solStr} = ?`;
    h += txt(W / 2, 205, calcTxt, { size: 22, fill: calc === 2 ? C.green : C.blue, cls: vis(calc > 0, isNew === 'calc') });
    return svg(W, 222, h);
  };
  F.add(draw({}), `Tìm số thích hợp thay cho dấu <b>?</b>: ${eqStr}.`);
  F.add(draw({ names: true, isNew: 'names' }), `Gọi tên: ${[0, 1, 2].map((i) => `${show(i)} là <b>${NAMES[op][i].toLowerCase()}</b>`).join(', ')}.`);
  const L = (i) => (i === hide ? '?' : fmt(vals[i]));
  const diagCap = {
    '+': `Sơ đồ: tổng ${L(2)} gồm hai số hạng ${L(0)} và ${L(1)}.`,
    '−': `Sơ đồ: số bị trừ ${L(0)} gồm số trừ ${L(1)} và hiệu ${L(2)}.`,
    '×': `Sơ đồ: ${L(0)} được lấy ${L(1)} lần thì được ${L(2)}.`,
    ':': `Sơ đồ: chia ${L(0)} thành ${L(1)} phần bằng nhau, mỗi phần là ${L(2)}.`,
  }[op];
  F.add(draw({ names: true, diag: true, isNew: 'diag' }), diagCap);
  F.add(draw({ names: true, diag: true }), `Muốn tìm ${NAMES[op][hide].toLowerCase()} (dấu ?), em làm phép tính nào?`, { ask: choice(solStr, [wrongStr], `Đúng rồi! ${rule}`) });
  const near = sol[1] === '×' ? [sol[2], -sol[2], 10] : sol[1] === ':' ? [1, -1, 2] : [10, -10, 1];
  F.add(draw({ names: true, diag: true, calc: 1, isNew: 'calc' }), `${solStr} = ?`, { ask: numAsk(x, { near }) });
  F.add(draw({ names: true, diag: true, calc: 2, solved: true, isNew: 'solved' }), `Vậy <b>? = ${fmt(x)}</b>. Thử lại: ${fmt(a)} ${op} ${fmt(b)} = ${fmt(r)}. Đúng!`, { result: `${fmt(a)} ${op} ${fmt(b)} = ${fmt(r)}` });
  return F.done();
}

// ── Bài 4–12: bảng nhân, bảng chia ──────────────────────────────────────────
function table({ a = 3, n = 4 }) {
  const P = a * n;
  const perRow = n <= 5 ? n : Math.ceil(n / 2), rowsG = Math.ceil(n / perRow);
  const cols = a <= 3 ? a : Math.ceil(a / 2), drow = Math.ceil(a / cols);
  const gap = 8, gw = Math.min(66, (W - 16 - (perRow - 1) * gap) / perRow);
  const sp = Math.min(15, (gw - 8) / cols);
  const gh = drow * sp + 10;
  const top = 8, rowH = gh + 26;
  const x0 = (W - (perRow * gw + (perRow - 1) * gap)) / 2;
  const H = top + rowsG * rowH + 44;
  const F = frames(`${a} × ${n} và ${P} : ${a}`);
  const draw = ({ shownG = n, newG = false, labels = false, nums = false, tone = 'mul', line = '', lineCol = C.ink, newLine = false }) => {
    let h = '';
    for (let g = 0; g < n; g++) {
      const r = Math.floor(g / perRow), c = g % perRow;
      const gx = x0 + c * (gw + gap), gy = top + r * rowH;
      const isNew = newG && g > 0;
      let gg = `<rect x="${gx.toFixed(1)}" y="${gy}" width="${gw.toFixed(1)}" height="${gh.toFixed(1)}" rx="8" fill="${tone === 'div' ? '#EDE9FE' : '#E0F2FE'}" stroke="${tone === 'div' ? '#A78BFA' : '#7DD3FC'}" stroke-width="1.5"/>`;
      const dx0 = gx + (gw - cols * sp) / 2 + sp / 2;
      for (let i = 0; i < a; i++) gg += dot(dx0 + (i % cols) * sp, gy + 5 + sp / 2 + Math.floor(i / cols) * sp, { r: (sp * 0.36).toFixed(1), fill: tone === 'div' ? C.violet : C.orange });
      if (labels) gg += txt(gx + gw / 2, gy + gh + 13, (g + 1) * a, { size: 14, fill: C.blue });
      if (nums) gg += txt(gx + gw / 2, gy + gh + 13, `nhóm ${g + 1}`, { size: 11, fill: C.violet, weight: 700 });
      h += `<g class="${vis(g < shownG, isNew)}"${isNew ? ` style="${dl(g)}"` : ''}>${gg}</g>`;
    }
    const size = Math.min(22, 640 / Math.max(10, line.length));
    h += txt(W / 2, H - 20, line || '.', { size, fill: lineCol, cls: line ? (newLine ? 'is-new' : '') : 'kd-ghost' });
    return svg(W, H, h);
  };
  const adds = Array(n).fill(a).join(' + ');
  F.add(draw({ shownG: 1 }), `Mỗi nhóm có <b>${a}</b> chấm tròn.`);
  F.add(draw({ newG: true }), `Lấy <b>${n} nhóm</b> như thế: ${a} được lấy ${n} lần.`);
  F.add(draw({ line: `${adds} = ?`, newLine: true }), `Đếm thêm ${a} (cộng ${a} lấy ${n} lần): có tất cả bao nhiêu chấm?`, { ask: numAsk(P, { near: [a, -a, 1] }) });
  const skip = Array.from({ length: n }, (_, i) => (i + 1) * a).join(', ');
  F.add(draw({ labels: true, line: `${a} × ${n} = ${adds} = ${P}`.length < 46 ? `${a} × ${n} = ${adds} = ${P}` : `${a} × ${n} = ${P}`, lineCol: C.green, newLine: true }), `Đếm thêm ${a}: ${skip}. ${a} được lấy ${n} lần, ta viết <b>${a} × ${n} = ${P}</b>.`, { result: '' });
  F.add(draw({ tone: 'div', line: `${P} : ${a} = ?`, newLine: true }), `Ngược lại: có ${P} chấm, chia thành các nhóm, mỗi nhóm ${a} chấm. Được mấy nhóm?`, { ask: numAsk(n, { near: [1, -1, 2] }) });
  F.add(draw({ tone: 'div', nums: true, line: `${P} : ${a} = ${n}`, lineCol: C.violet, newLine: true }), `Được ${n} nhóm: <b>${P} : ${a} = ${n}</b>. Từ ${a} × ${n} = ${P} ta có ${P} : ${a} = ${n} và ${P} : ${n} = ${a}.`, { result: `${a} × ${n} = ${P}; ${P} : ${a} = ${n}` });
  return F.done();
}

// ── Bài 14: một phần mấy ────────────────────────────────────────────────────
function pieParts(cx, cy, r, n, shadeFirst, cls = '') {
  let h = '';
  if (n <= 1) h += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FEF3C7"/>`;
  else for (let i = 0; i < n; i++) {
    const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
    const p = (a) => `${(cx + r * Math.cos(a)).toFixed(2)} ${(cy + r * Math.sin(a)).toFixed(2)}`;
    h += `<path d="M${cx} ${cy} L${p(a0)} A${r} ${r} 0 0 1 ${p(a1)} Z" fill="${i === 0 && shadeFirst ? '#FB923C' : '#FEF3C7'}" class="${i === 0 && shadeFirst ? cls : ''}" stroke="${C.ink}" stroke-width="1.5" stroke-linejoin="round"/>`;
  }
  return `${h}<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
}
function svgFrac(x, y, a, b, { size = 30, color = C.ink, cls = '' } = {}) {
  return `<g class="${cls}">${txt(x, y - size * 0.62, a, { size, fill: color })}<line x1="${x - size * 0.5}" y1="${y}" x2="${x + size * 0.5}" y2="${y}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>${txt(x, y + size * 0.66, b, { size, fill: color })}</g>`;
}
const fish = (x, y, fill) => `<g><path d="M${x - 13} ${y} Q${x - 2} ${y - 11} ${x + 10} ${y} Q${x - 2} ${y + 11} ${x - 13} ${y} Z" fill="${fill}" stroke="#0369A1" stroke-width="1.3"/><path d="M${x + 8} ${y} L${x + 17} ${y - 7} L${x + 17} ${y + 7} Z" fill="${fill}" stroke="#0369A1" stroke-width="1.3"/><circle cx="${x - 6}" cy="${y - 2}" r="1.6" fill="#0F172A"/></g>`;
const flower = (x, y, fill) => `<g>${[0, 72, 144, 216, 288].map((d) => `<circle cx="${(x + 6 * Math.cos((d * Math.PI) / 180)).toFixed(1)}" cy="${(y + 6 * Math.sin((d * Math.PI) / 180)).toFixed(1)}" r="5" fill="${fill}"/>`).join('')}<circle cx="${x}" cy="${y}" r="4" fill="#FACC15"/></g>`;
const ball = (x, y, fill) => `<circle cx="${x}" cy="${y}" r="10" fill="${fill}" stroke="#C2410C" stroke-width="1.3"/>`;

function part({ n = 3, shape = 'circle', count = 12, thing = 'con cá' }) {
  const F = frames(shape === 'set' ? `${fr(1, n)} của ${count} ${thing}` : `Một phần ${PART[n]}`);
  const read = `một phần ${PART[n]}`;
  if (shape !== 'set') {
    const draw = ({ split = false, shade = false, newShade = false, label = false }) => {
      let h = '';
      if (shape === 'circle') h += pieParts(120, 104, 86, split ? n : 1, shade, newShade ? 'is-fade' : '');
      else {
        const x = 20, y = 70, w = 220, hh = 66, pw = w / n;
        if (shade) h += `<rect x="${x}" y="${y}" width="${pw.toFixed(1)}" height="${hh}" fill="#FB923C" class="${newShade ? 'is-fade' : ''}"/>`;
        if (split) for (let i = 1; i < n; i++) h += seg(x + i * pw, y, x + i * pw, y + hh, { w: 1.5 });
        h += `<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="3" fill="none" stroke="${C.ink}" stroke-width="2.5"/>`;
      }
      h += svgFrac(305, 104, 1, n, { size: 34, color: C.orange, cls: vis(label, label === 'new') });
      return svg(W, 210, h);
    };
    const what = shape === 'circle' ? 'cái bánh hình tròn' : 'băng giấy';
    F.add(draw({}), `Đây là một ${what}.`);
    F.add(draw({ split: true }), `Chia ${what} thành <b>${n} phần bằng nhau</b>.`);
    F.add(draw({ split: true, shade: true, newShade: true }), 'Tô màu <b>1 phần</b>.');
    F.add(draw({ split: true, shade: true }), `Đã tô màu mấy phần của ${what}?`, {
      ask: choice(fr(1, n), [fr(1, n + 1), fr(1, n > 2 ? n - 1 : n + 2)], `Đúng rồi! Chia thành ${n} phần bằng nhau, tô màu 1 phần: đã tô màu ${fr(1, n)} ${what}.`),
    });
    F.add(draw({ split: true, shade: true, label: 'new' }), `${fr(1, n)} đọc là <b>${read}</b>. Chú ý: các phần phải <b>bằng nhau</b> thì mới nói được ${read}.`, { result: `${fr(1, n)}: ${read}` });
    return F.done();
  }
  const per = count / n;
  const icon = /cá/.test(thing) ? fish : /hoa/.test(thing) ? flower : ball;
  const sp = Math.min(40, 300 / per), rowH = Math.min(44, 180 / n);
  const H = 24 + n * rowH;
  const draw = ({ group = false, take = false, newEl = '' }) => {
    let h = '';
    for (let r = 0; r < n; r++) {
      const y = 14 + r * rowH + rowH / 2, x1 = W / 2 - (per * sp) / 2;
      if (group) h += `<rect x="${(x1 - 6).toFixed(1)}" y="${(y - rowH / 2 + 3).toFixed(1)}" width="${(per * sp + 12).toFixed(1)}" height="${rowH - 6}" rx="10" fill="${take && r === 0 ? '#FFEDD5' : '#F1F5F9'}" stroke="${take && r === 0 ? C.orange : C.line}" stroke-width="2" class="${(newEl === 'group') || (newEl === 'take' && r === 0) ? 'is-fade' : ''}"/>`;
      for (let i = 0; i < per; i++) h += icon(x1 + (i + 0.5) * sp, y, take && r === 0 ? '#FB923C' : '#BAE6FD');
    }
    return svg(W, H, h);
  };
  F.add(draw({}), `Có <b>${count} ${thing}</b>.`);
  F.add(draw({ group: true, newEl: 'group' }), `Chia ${count} ${thing} thành <b>${n} phần bằng nhau</b> (${n} hàng).`);
  F.add(draw({ group: true }), `Mỗi phần có mấy ${thing}?`, { ask: numAsk(per, { near: [1, -1, 2], ok: `Đúng rồi! ${count} : ${n} = ${per}.` }) });
  F.add(draw({ group: true, take: true, newEl: 'take' }), `${fr(1, n)} số ${thing} là 1 phần trong ${n} phần bằng nhau: <b>${per} ${thing}</b>.`, { result: `${fr(1, n)} của ${count} ${thing} là ${per} ${thing}` });
  return F.done();
}

// ── Bài 7: ba điểm thẳng hàng ───────────────────────────────────────────────
function ruler2(p, q, cls = '') {
  // thước thẳng: mép trên đi qua p và q, thân thước nằm dưới
  const dx = q.x - p.x, dy = q.y - p.y, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, nx = -uy, ny = ux;
  const e = 26, th = 20;
  const a = { x: p.x - ux * e, y: p.y - uy * e }, b = { x: q.x + ux * e, y: q.y + uy * e };
  const pts = [a, b, { x: b.x + nx * th, y: b.y + ny * th }, { x: a.x + nx * th, y: a.y + ny * th }];
  return `<g class="${cls}"><polygon points="${pts.map((t) => `${t.x.toFixed(1)},${t.y.toFixed(1)}`).join(' ')}" fill="rgba(251,191,36,0.35)" stroke="#D97706" stroke-width="1.5"/>${seg(a.x, a.y, b.x, b.y, { color: '#D97706', w: 2 })}</g>`;
}
function line3() {
  const F = frames('Ba điểm thẳng hàng');
  const A = { x: 50, y: 82 }, B = { x: 168, y: 58 }, Cc = { x: 300, y: 31 };
  const M = { x: 50, y: 196 }, N = { x: 170, y: 150 }, P = { x: 300, y: 196 };
  const pt = (p, name, col = C.ink, dy = -16) => dot(p.x, p.y, { r: 6, fill: col }) + txt(p.x, p.y + dy, name, { size: 18, fill: col });
  const draw = ({ r1 = false, low = false, r2 = false, isNew = '' }) => {
    let h = '';
    h += ruler2(A, Cc, vis(r1, isNew === 'r1'));
    h += pt(A, 'A') + pt(B, 'B', C.blue) + pt(Cc, 'C');
    h += `<g class="${vis(low, isNew === 'low')}">${ruler2(M, P)}${pt(M, 'M')}${pt(N, 'N', C.orange)}${pt(P, 'P')}</g>`;
    void r2;
    return svg(W, 232, h);
  };
  F.add(draw({}), 'Ba điểm A, B, C. Chúng có thẳng hàng không?');
  F.add(draw({ r1: true, isNew: 'r1' }), 'Đặt <b>mép thước</b> đi qua hai điểm A và C.');
  F.add(draw({ r1: true }), 'Điểm B có nằm sát mép thước không?', { ask: { options: ['Có', 'Không'], answer: 0, ok: 'Đúng rồi! B nằm trên mép thước: <b>A, B, C là ba điểm thẳng hàng</b>.' } });
  F.add(draw({ r1: true, low: true, isNew: 'low' }), 'Ba điểm M, N, P. Đặt mép thước qua M và P. M, N, P có thẳng hàng không?', { ask: { options: ['Thẳng hàng', 'Không thẳng hàng'], answer: 1, ok: 'Đúng rồi! N nằm lệch ra ngoài mép thước: M, N, P <b>không</b> thẳng hàng.' } });
  F.add(draw({ r1: true, low: true }), 'Ba điểm cùng nằm trên <b>một đường thẳng</b> là ba điểm thẳng hàng.', { result: 'A, B, C thẳng hàng' });
  return F.done();
}

// ── Bài 7: xem đồng hồ, giờ buổi chiều ───────────────────────────────────────
function clock({ h = 15, m = 30 }) {
  const h12 = h % 12 || 12, when = h >= 18 ? 'tối' : 'chiều';
  const F = frames(`${h12} giờ ${m} phút ${when}`);
  const cx = 104, cy = 108, R = 94;
  const draw = ({ hiH = false, hiM = false, text = 0, isNew = '' }) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#fff" stroke="#0EA5E9" stroke-width="6"/>`;
    for (let i = 0; i < 60; i++) {
      const a = (i * Math.PI) / 30, big = i % 5 === 0;
      s += seg(cx + (R - 4) * Math.sin(a), cy - (R - 4) * Math.cos(a), cx + (R - (big ? 12 : 8)) * Math.sin(a), cy - (R - (big ? 12 : 8)) * Math.cos(a), { color: big ? C.ink : C.line, w: big ? 2.5 : 1.2 });
    }
    for (let i = 1; i <= 12; i++) { const a = (i * Math.PI) / 6; s += txt(cx + (R - 27) * Math.sin(a), cy - (R - 27) * Math.cos(a) + 1, i, { size: 17, fill: (hiH && i === h12) || (hiM && i === m / 5) ? C.orange : C.ink }); }
    const ah = ((h12 % 12) + m / 60) * (Math.PI / 6), am = (m * Math.PI) / 30;
    s += seg(cx, cy, cx + R * 0.45 * Math.sin(ah), cy - R * 0.45 * Math.cos(ah), { color: hiH ? C.orange : C.ink, w: 7 });
    s += seg(cx, cy, cx + R * 0.64 * Math.sin(am), cy - R * 0.64 * Math.cos(am), { color: hiM ? C.blue : C.ink, w: 4.5 });
    s += dot(cx, cy, { r: 6, fill: C.ink });
    s += txt(282, 72, `${h12} giờ ${m} phút`, { size: 19, fill: C.blue, cls: vis(text >= 1, isNew === 't1') });
    s += txt(282, 104, `buổi ${when}`, { size: 15, fill: C.soft, cls: vis(text >= 2, isNew === 't2') });
    s += txt(282, 142, `${h} giờ ${m} phút`, { size: 20, fill: C.green, cls: vis(text >= 2, isNew === 't2') });
    return svg(W, 212, s);
  };
  F.add(draw({}), 'Kim ngắn là <b>kim giờ</b>, kim dài là <b>kim phút</b>.');
  F.add(draw({ hiH: true }), `Kim giờ ở giữa số ${h12} và số ${h12 % 12 + 1}: đã quá <b>${h12} giờ</b>.`);
  F.add(draw({ hiM: true }), `Kim phút chỉ số ${m / 5}. Đó là bao nhiêu phút?`, { ask: choice(`${m} phút`, [`${m / 5} phút`, `${m + 5} phút`], `Đúng rồi! Mỗi số trên mặt đồng hồ cách nhau 5 phút: ${m / 5} × 5 = ${m}.`) });
  F.add(draw({ text: 1, isNew: 't1' }), `Đồng hồ chỉ ${h12} giờ ${m} phút. Nếu là buổi ${when} thì đó là mấy giờ?`, { ask: choice(`${h} giờ ${m} phút`, [`${h + 1} giờ ${m} phút`, `${h - 2} giờ ${m} phút`], `Đúng rồi! Buổi ${when}: ${h12} + 12 = ${h}.`) });
  F.add(draw({ text: 2, isNew: 't2' }), 'Giờ buổi chiều, buổi tối: lấy số giờ <b>cộng thêm 12</b>.', { result: `${h12} giờ ${m} phút ${when} = ${h} giờ ${m} phút` });
  return F.done();
}

// ── Bài 16: điểm ở giữa, trung điểm ─────────────────────────────────────────
function mid({ len = 6 }) {
  const half = len / 2;
  const F = frames(`Trung điểm của đoạn thẳng AB dài ${len} cm`);
  const u = Math.min(40, 300 / (len + 1)), x0 = (W - (len + 1) * u) / 2 + u / 2, Y = 46;
  const X = (cm) => x0 + cm * u;
  const draw = ({ rul = false, M = false, lens = false, isNew = '' }) => {
    let h = '';
    let r = `<rect x="${X(0) - u / 2}" y="${Y + 22}" width="${(len + 1) * u}" height="42" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>`;
    for (let i = 0; i <= len * 2; i++) {
      const xx = X(i / 2), big = i % 2 === 0;
      r += seg(xx, Y + 22, xx, Y + 22 + (big ? 14 : 8), { color: '#92400E', w: big ? 2 : 1.2 });
      if (big) r += txt(xx, Y + 50, i / 2, { size: 13, fill: '#92400E', cls: 'plain' });
    }
    h += `<g class="${vis(rul, isNew === 'rul')}">${r}</g>`;
    h += seg(X(0), Y, X(len), Y, { color: C.blue, w: 5 });
    h += dot(X(0), Y, { r: 6 }) + dot(X(len), Y, { r: 6 }) + txt(X(0), Y - 20, 'A', { size: 18 }) + txt(X(len), Y - 20, 'B', { size: 18 });
    h += dot(X(1), Y, { r: 5, fill: C.soft }) + txt(X(1), Y - 20, 'O', { size: 16, fill: C.soft });
    h += `<g class="${vis(M, isNew === 'M')}">${dot(X(half), Y, { r: 7, fill: C.orange })}${txt(X(half), Y - 22, 'M', { size: 20, fill: C.orange })}</g>`;
    h += `<g class="${vis(lens, isNew === 'lens')}">${hbrace(X(0) + 2, X(half) - 2, Y + 82, 1)}${hbrace(X(half) + 2, X(len) - 2, Y + 82, 1)}${txt((X(0) + X(half)) / 2, Y + 106, `AM = ${half} cm`, { size: 15, fill: C.green })}${txt((X(half) + X(len)) / 2, Y + 106, `MB = ${half} cm`, { size: 15, fill: C.green })}</g>`;
    return svg(W, 168, h);
  };
  F.add(draw({}), 'A, O, B thẳng hàng, O nằm giữa A và B: <b>O là điểm ở giữa</b> hai điểm A và B.');
  F.add(draw({ rul: true, isNew: 'rul' }), `Tìm trung điểm M của AB. Đặt thước: vạch 0 trùng điểm A. B ở vạch ${len}: <b>AB = ${len} cm</b>.`);
  F.add(draw({ rul: true }), 'Trung điểm M cách A mấy xăng-ti-mét?', { ask: numAsk(half, { near: [1, -1, half], fmtFn: (v) => `${v} cm`, ok: `Đúng rồi! Lấy một nửa độ dài AB: ${len} : 2 = ${half} (cm).` }) });
  F.add(draw({ rul: true, M: true, isNew: 'M' }), `Chấm điểm M ở vạch ${half} của thước.`);
  F.add(draw({ rul: true, M: true, lens: true, isNew: 'lens' }), `M nằm giữa A và B, lại có AM = MB = ${half} cm: <b>M là trung điểm của đoạn thẳng AB</b>. O không cách đều A và B nên O không phải trung điểm.`, { result: `AM = MB = ${half} cm` });
  return F.done();
}

// ── Bài 17, 20: hình tròn, com-pa ──────────────────────────────────────────
function compass(O, A, cls = '') {
  const hx = (O.x + A.x) / 2, hy = Math.min(O.y, A.y) - 70;
  return `<g class="${cls}">${seg(hx, hy, O.x, O.y, { color: '#475569', w: 5 })}${seg(hx, hy, A.x, A.y - 8, { color: '#475569', w: 5 })}
    <path d="M${A.x - 4} ${A.y - 10} L${A.x + 4} ${A.y - 10} L${A.x} ${A.y} Z" fill="#F59E0B"/>
    <circle cx="${hx}" cy="${hy}" r="7" fill="#64748B"/>${seg(hx, hy - 6, hx, hy - 22, { color: '#64748B', w: 5 })}</g>`;
}
function circle({ r = 3 }) {
  const F = frames(`Hình tròn tâm O, bán kính ${r} cm`);
  const O = { x: 130, y: 128 }, R = Math.min(30 * r, 92);
  const ang = (-50 * Math.PI) / 180, A = { x: O.x + R * Math.cos(ang), y: O.y + R * Math.sin(ang) };
  const Cc = { x: O.x - R, y: O.y }, D = { x: O.x + R, y: O.y };
  const len = Math.ceil(2 * Math.PI * R) + 4;
  const draw = ({ comp = false, circ = false, rad = false, dia = false, cdv = false, isNew = '' }) => {
    let h = '';
    h += `<circle cx="${O.x}" cy="${O.y}" r="${R}" fill="${circ ? '#E0F2FE' : 'none'}" stroke="${C.ink}" stroke-width="3" class="${vis(circ, false)}${isNew === 'circ' ? ' is-draw' : ''}" style="--len:${len}" transform="rotate(-50 ${O.x} ${O.y})"/>`;
    h += `<g class="${vis(rad, isNew === 'rad')}">${seg(O.x, O.y, A.x, A.y, { color: C.green, w: 4 })}${dot(A.x, A.y, { r: 5 })}${txt(A.x + 12, A.y - 10, 'A', { size: 17 })}</g>`;
    h += `<g class="${vis(dia, isNew === 'dia')}">${seg(Cc.x, Cc.y, D.x, D.y, { color: C.orange, w: 4 })}${dot(Cc.x, Cc.y, { r: 5 })}${dot(D.x, D.y, { r: 5 })}${txt(Cc.x - 14, Cc.y - 2, 'C', { size: 17 })}${txt(D.x + 14, D.y - 2, 'D', { size: 17 })}</g>`;
    h += dot(O.x, O.y, { r: 6 }) + txt(O.x, O.y + 20, 'O', { size: 17 });
    h += compass(O, A, vis(comp, isNew === 'comp'));
    h += txt(300, 96, `OA = ${r} cm`, { size: 17, fill: C.green, cls: vis(rad, isNew === 'rad') });
    h += txt(300, 136, `CD = ${cdv ? `${2 * r} cm` : '?'}`, { size: 17, fill: C.orange, cls: vis(dia, isNew === 'dia' || isNew === 'cdv') });
    return svg(W, 232, h);
  };
  F.add(draw({}), 'Chấm một điểm O làm <b>tâm</b>.');
  F.add(draw({ comp: true, isNew: 'comp' }), `Mở com-pa rộng <b>${r} cm</b>, đặt đầu nhọn ở O.`);
  F.add(draw({ comp: true, circ: true, isNew: 'circ' }), 'Giữ đầu nhọn ở O, quay com-pa một vòng: được <b>hình tròn tâm O</b>.');
  F.add(draw({ circ: true, rad: true, isNew: 'rad' }), `OA nối tâm O với một điểm trên đường tròn: OA là <b>bán kính</b>. Mọi bán kính đều dài ${r} cm.`);
  F.add(draw({ circ: true, rad: true, dia: true, isNew: 'dia' }), 'CD đi qua tâm O, nối hai điểm trên đường tròn: CD là <b>đường kính</b>. CD dài mấy xăng-ti-mét?', { ask: numAsk(2 * r, { near: [-r, 1, r], fmtFn: (v) => `${v} cm`, ok: `Đúng rồi! CD = OC + OD = ${r} + ${r} = ${2 * r} (cm).` }) });
  F.add(draw({ circ: true, rad: true, dia: true, cdv: true, isNew: 'cdv' }), `Đường kính dài <b>gấp 2 lần</b> bán kính: ${r} × 2 = ${2 * r} (cm).`, { result: `Bán kính ${r} cm, đường kính ${2 * r} cm` });
  return F.done();
}

// ── Bài 18: góc vuông, góc không vuông (ê ke) ───────────────────────────────
function eke(V, cls = '', style = '') {
  return `<g class="${cls}"${style ? ` style="${style}"` : ''}><polygon points="${V.x},${V.y} ${V.x + 96},${V.y} ${V.x},${V.y - 78}" fill="rgba(251,191,36,0.35)" stroke="#D97706" stroke-width="2"/>
    <polyline points="${V.x},${V.y - 12} ${V.x + 12},${V.y - 12} ${V.x + 12},${V.y}" fill="none" stroke="#D97706" stroke-width="1.5"/></g>`;
}
function right() {
  const F = frames('Kiểm tra góc vuông bằng ê ke');
  const O = { x: 40, y: 180 }, M = { x: 210, y: 180 };
  const P = { x: M.x + 130 * Math.cos((-68 * Math.PI) / 180), y: M.y + 130 * Math.sin((-68 * Math.PI) / 180) };
  const draw = ({ e = 'none', mark = false, angM = false, isNew = '' }) => {
    let h = '';
    h += seg(O.x, O.y, O.x, O.y - 140, { w: 4 }) + seg(O.x, O.y, O.x + 130, O.y, { w: 4 });
    h += dot(O.x, O.y, { r: 5 }) + txt(O.x - 4, O.y + 20, 'O', { size: 17 }) + txt(O.x + 16, O.y - 140, 'A', { size: 17 }) + txt(O.x + 140, O.y + 18, 'B', { size: 17 });
    h += `<polyline points="${O.x},${O.y - 16} ${O.x + 16},${O.y - 16} ${O.x + 16},${O.y}" fill="none" stroke="${C.green}" stroke-width="2.5" class="${vis(mark, isNew === 'mark')}"/>`;
    h += `<g class="${vis(angM, isNew === 'angM')}">${seg(M.x, M.y, M.x + 130, M.y, { w: 4 })}${seg(M.x, M.y, P.x, P.y, { w: 4 })}${dot(M.x, M.y, { r: 5 })}${txt(M.x - 4, M.y + 20, 'M', { size: 17 })}${txt(M.x + 140, M.y + 18, 'N', { size: 17 })}${txt(P.x + 14, P.y, 'P', { size: 17 })}</g>`;
    if (e === 'O') h += eke(O, isNew === 'eke' ? 'is-fade' : '');
    if (e === 'M') h += eke(M, isNew === 'eke' ? 'is-move' : '', `--dx:${O.x - M.x}px;--dy:0px`);
    return svg(W, 212, h);
  };
  F.add(draw({}), 'Góc đỉnh O; cạnh OA, OB.');
  F.add(draw({ e: 'O', isNew: 'eke' }), 'Đặt ê ke: <b>góc vuông của ê ke trùng đỉnh O</b>, một cạnh ê ke nằm trên cạnh OB.');
  F.add(draw({ e: 'O' }), 'Cạnh OA có nằm khít cạnh kia của ê ke không?', { ask: { options: ['Có', 'Không'], answer: 0, ok: 'Đúng rồi! Khít với ê ke: góc đỉnh O là <b>góc vuông</b>.' } });
  F.add(draw({ mark: true, angM: true, isNew: 'angM' }), 'Góc đỉnh M; cạnh MN, MP. Kiểm tra góc này bằng ê ke.');
  F.add(draw({ mark: true, angM: true, e: 'M', isNew: 'eke' }), 'Đặt ê ke ở đỉnh M, một cạnh ê ke trên cạnh MN. Góc đỉnh M là góc gì?', { ask: { options: ['Góc vuông', 'Góc không vuông'], answer: 1, ok: 'Đúng rồi! Cạnh MP không khít cạnh ê ke: góc đỉnh M là <b>góc không vuông</b>.' } });
  F.add(draw({ mark: true, angM: true }), 'Ê ke giúp em biết góc nào vuông, góc nào không vuông.', { result: 'Góc đỉnh O vuông, góc đỉnh M không vuông' });
  return F.done();
}

// ── Bài 19: hình tam giác, tứ giác, chữ nhật, vuông ─────────────────────────
function poly({ shape = 'tri' }) {
  if (shape === 'rect' || shape === 'square') return rectShape(shape === 'square');
  const tri = shape === 'tri';
  const names = tri ? ['A', 'B', 'C'] : ['M', 'N', 'P', 'Q'];
  const pts = tri ? [{ x: 175, y: 28 }, { x: 55, y: 190 }, { x: 310, y: 190 }] : [{ x: 70, y: 52 }, { x: 270, y: 30 }, { x: 315, y: 188 }, { x: 45, y: 182 }];
  const kind = tri ? 'tam giác' : 'tứ giác', k = names.length, nm = names.join('');
  const sides = names.map((v, i) => v + names[(i + 1) % k]);
  const cx = pts.reduce((s, p) => s + p.x, 0) / k, cy = pts.reduce((s, p) => s + p.y, 0) / k;
  const F = frames(`Hình ${kind} ${nm}`);
  const draw = ({ verts = false, edges = false, isNew = '' }) => {
    let h = `<polygon points="${pts.map((p) => `${p.x},${p.y}`).join(' ')}" fill="#E0F2FE" stroke="${C.ink}" stroke-width="3" stroke-linejoin="round"/>`;
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % k];
      h += `<g class="${vis(edges, isNew === 'edges')}" ${isNew === 'edges' ? `style="${dl(i, 0.25)}"` : ''}>${seg(p.x, p.y, q.x, q.y, { color: C.orange, w: 5 })}</g>`;
      const mx = (p.x + q.x) / 2, my = (p.y + q.y) / 2, dx = mx - cx, dy = my - cy, d = Math.hypot(dx, dy);
      h += txt(mx + (dx / d) * 22, my + (dy / d) * 18, sides[i], { size: 14, fill: C.orange, cls: vis(edges, isNew === 'edges') });
    });
    pts.forEach((p, i) => {
      const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy);
      h += `<g class="${vis(verts, isNew === 'verts')}">${dot(p.x, p.y, { r: 6, fill: C.blue })}${txt(p.x + (dx / d) * 20, p.y + (dy / d) * 18, names[i], { size: 19, fill: C.blue })}</g>`;
    });
    return svg(W, 220, h);
  };
  F.add(draw({}), `Đây là một <b>hình ${kind}</b>.`);
  F.add(draw({ verts: true, isNew: 'verts' }), `Hình có ${k} đỉnh: <b>${names.join(', ')}</b>. Tên hình: hình ${kind} ${nm}.`);
  F.add(draw({ verts: true }), `Hình ${kind} ${nm} có mấy cạnh?`, { ask: numAsk(k, { near: [1, -1], ok: `Đúng rồi! Hình ${kind} có ${k} cạnh.` }) });
  F.add(draw({ verts: true, edges: true, isNew: 'edges' }), `Các cạnh: <b>${sides.join(', ')}</b>. Mỗi cạnh nối hai đỉnh liền nhau, đọc đi vòng quanh hình.`, { result: `${k} đỉnh, ${k} cạnh` });
  return F.done();
}
function rectShape(sq) {
  const w = sq ? 4 : 6, hgt = sq ? 4 : 3, u = 30;
  const gx = (W - (w + 4) * u) / 2, gy = 10;
  const A = { x: gx + 2 * u, y: gy + u }, B = { x: A.x + w * u, y: A.y }, Cc = { x: B.x, y: A.y + hgt * u }, D = { x: A.x, y: Cc.y };
  const what = sq ? 'vuông' : 'chữ nhật';
  const F = frames(`Hình ${what} ABCD`);
  const H = gy + (hgt + 2) * u + 10;
  const draw = ({ marks = false, lens = false, isNew = '' }) => {
    let h = '';
    for (let i = 0; i <= w + 4; i++) h += seg(gx + i * u, gy, gx + i * u, gy + (hgt + 2) * u, { color: '#E2E8F0', w: 1 });
    for (let j = 0; j <= hgt + 2; j++) h += seg(gx, gy + j * u, gx + (w + 4) * u, gy + j * u, { color: '#E2E8F0', w: 1 });
    h += `<polygon points="${[A, B, Cc, D].map((p) => `${p.x},${p.y}`).join(' ')}" fill="${sq ? 'rgba(250,204,21,0.25)' : 'rgba(56,189,248,0.2)'}" stroke="${C.ink}" stroke-width="3"/>`;
    const corner = (V, sx, sy) => `<polyline points="${V.x + sx * 11},${V.y} ${V.x + sx * 11},${V.y + sy * 11} ${V.x},${V.y + sy * 11}" fill="none" stroke="${C.green}" stroke-width="2.5"/>`;
    h += `<g class="${vis(marks, isNew === 'marks')}">${corner(A, 1, 1)}${corner(B, -1, 1)}${corner(Cc, -1, -1)}${corner(D, 1, -1)}</g>`;
    h += txt(A.x - 12, A.y - 10, 'A', { size: 17 }) + txt(B.x + 12, B.y - 10, 'B', { size: 17 }) + txt(Cc.x + 12, Cc.y + 12, 'C', { size: 17 }) + txt(D.x - 12, D.y + 12, 'D', { size: 17 });
    const lc = sq ? C.orange : C.blue, lc2 = sq ? C.orange : C.violet;
    h += `<g class="${vis(lens, isNew === 'lens')}">${txt((A.x + B.x) / 2, A.y - 12, `${w} cm`, { size: 14, fill: lc })}${txt((D.x + Cc.x) / 2, D.y + 14, `${w} cm`, { size: 14, fill: lc })}${txt(A.x - 26, (A.y + D.y) / 2, `${hgt} cm`, { size: 14, fill: lc2 })}${txt(B.x + 26, (B.y + Cc.y) / 2, `${hgt} cm`, { size: 14, fill: lc2 })}</g>`;
    return svg(W, H, h);
  };
  F.add(draw({}), `Hình ${what} ABCD vẽ trên giấy ô vuông, mỗi ô dài 1 cm.`);
  F.add(draw({ marks: true, isNew: 'marks' }), 'Dùng ê ke kiểm tra: cả <b>4 góc đều là góc vuông</b>.');
  F.add(draw({ marks: true }), 'Đếm ô: cạnh AB dài mấy xăng-ti-mét?', { ask: numAsk(w, { near: [1, -1, 2], fmtFn: (v) => `${v} cm`, ok: `Đúng rồi! AB dài ${w} ô, tức là ${w} cm.` }) });
  F.add(draw({ marks: true, lens: true, isNew: 'lens' }), sq
    ? `AB = BC = CD = DA = ${w} cm. Hình vuông có 4 góc vuông và <b>4 cạnh bằng nhau</b>.`
    : `AB = DC = ${w} cm là <b>chiều dài</b>, AD = BC = ${hgt} cm là <b>chiều rộng</b>. Hình chữ nhật có 4 góc vuông, hai cạnh dài bằng nhau, hai cạnh ngắn bằng nhau.`,
  { result: sq ? '4 góc vuông, 4 cạnh bằng nhau' : `Dài ${w} cm, rộng ${hgt} cm, 4 góc vuông` });
  return F.done();
}

// ── Bài 20: vẽ hình chữ nhật, hình vuông trên giấy ô vuông ──────────────────
function grid({ w = 4, h: hgt = 3 }) {
  const sq = w === hgt, u = 30;
  const what = sq ? 'vuông' : 'chữ nhật';
  const gx = (W - (w + 4) * u) / 2, gy = 10;
  const A = { x: gx + 2 * u, y: gy + u }, B = { x: A.x + w * u, y: A.y }, Cc = { x: B.x, y: A.y + hgt * u }, D = { x: A.x, y: Cc.y };
  const H = gy + (hgt + 2) * u + 10;
  const F = frames(`Vẽ hình ${what} trên giấy ô vuông`);
  const draw = (stage, isNew) => {
    let s = '';
    for (let i = 0; i <= w + 4; i++) s += seg(gx + i * u, gy, gx + i * u, gy + (hgt + 2) * u, { color: '#E2E8F0', w: 1 });
    for (let j = 0; j <= hgt + 2; j++) s += seg(gx, gy + j * u, gx + (w + 4) * u, gy + j * u, { color: '#E2E8F0', w: 1 });
    const side = (P, Q, k) => (stage >= k ? seg(P.x, P.y, Q.x, Q.y, { color: C.blue, w: 4, cls: isNew === k ? 'is-draw' : '', style: drawLen(P.x, P.y, Q.x, Q.y) }) : '');
    s += side(A, B, 1) + side(B, Cc, 2) + side(Cc, D, 3) + side(D, A, 3);
    if (stage >= 2) s += `<polyline points="${B.x - 11},${B.y} ${B.x - 11},${B.y + 11} ${B.x},${B.y + 11}" fill="none" stroke="${C.green}" stroke-width="2.5" class="${isNew === 2 ? 'is-new' : ''}"/>`;
    const lab = (P, t, dx, dy, k) => `<g class="${vis(stage >= k, isNew === k)}">${dot(P.x, P.y, { r: 5 })}${txt(P.x + dx, P.y + dy, t, { size: 17 })}</g>`;
    s += lab(A, 'A', -12, -10, 0) + lab(B, 'B', 12, -10, 1) + lab(Cc, 'C', 12, 12, 2) + lab(D, 'D', -12, 12, 3);
    return svg(W, H, s);
  };
  F.add(draw(0, -1), `Vẽ hình ${what} ${sq ? `cạnh ${w} ô` : `dài ${w} ô, rộng ${hgt} ô`} (mỗi ô 1 cm). Bắt đầu từ điểm A ở góc một ô.`);
  F.add(draw(1, 1), `Dùng thước, kẻ đoạn <b>AB dài ${w} ô</b> theo đường kẻ ngang.`);
  F.add(draw(2, 2), `Từ B kẻ <b>BC dài ${hgt} ô</b> theo đường kẻ dọc. Đường kẻ ngang và dọc tạo thành <b>góc vuông</b> ở B.`);
  F.add(draw(2, -1), 'Từ C kẻ CD sang trái theo đường kẻ ngang. CD dài mấy ô?', { ask: numAsk(w, { near: [1, -1, 2], ok: `Đúng rồi! CD = AB = ${w} ô.` }) });
  F.add(draw(3, 3), `Kẻ CD dài ${w} ô, rồi nối D với A. Được hình ${what} ABCD có 4 góc vuông.`, { result: `Hình ${what} ABCD` });
  return F.done();
}

// ── Bài 21: khối lập phương, khối hộp chữ nhật ──────────────────────────────
function cube({ box = false }) {
  const w = box ? 170 : 120, h = box ? 90 : 120, dx = 62, dy = -46;
  const x = (W - w - dx) / 2, y = 58 + (box ? 30 : 0);
  const Fv = [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];
  const Bv = Fv.map((p) => ({ x: p.x + dx, y: p.y + dy }));
  const what = box ? 'khối hộp chữ nhật' : 'khối lập phương';
  const F = frames(`Đỉnh, cạnh, mặt của ${what}`);
  const P = (l) => l.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const edges = [[Fv[0], Fv[1]], [Fv[1], Fv[2]], [Fv[2], Fv[3]], [Fv[3], Fv[0]], [Bv[0], Bv[1]], [Bv[1], Bv[2]], [Bv[2], Bv[3]], [Bv[3], Bv[0]], [Fv[0], Bv[0]], [Fv[1], Bv[1]], [Fv[2], Bv[2]], [Fv[3], Bv[3]]];
  const hidden = (e) => e.includes(Bv[3]);
  const draw = ({ faces = false, eds = false, verts = false, isNew = '' }) => {
    let s = '';
    const fc = faces ? ['#BAE6FD', '#7DD3FC', '#E0F2FE'] : ['#F1F5F9', '#E2E8F0', '#F8FAFC'];
    s += `<polygon points="${P([Fv[0], Fv[1], Bv[1], Bv[0]])}" fill="${fc[0]}" class="${isNew === 'faces' ? 'is-fade' : ''}"/>`;
    s += `<polygon points="${P([Fv[1], Bv[1], Bv[2], Fv[2]])}" fill="${fc[1]}" class="${isNew === 'faces' ? 'is-fade' : ''}"/>`;
    s += `<polygon points="${P(Fv)}" fill="${fc[2]}" class="${isNew === 'faces' ? 'is-fade' : ''}"/>`;
    edges.forEach((e, i) => {
      const col = eds ? C.orange : C.ink;
      s += seg(e[0].x, e[0].y, e[1].x, e[1].y, { color: col, w: eds ? 3.5 : 2.5, dash: hidden(e) ? '6 5' : '', cls: isNew === 'eds' ? 'is-fade' : '', style: isNew === 'eds' ? dl(i, 0.08) : '' });
    });
    [...Fv, ...Bv].forEach((p, i) => { s += dot(p.x, p.y, { r: 6, fill: C.blue, cls: vis(verts, isNew === 'verts'), style: isNew === 'verts' ? dl(i, 0.08) : '' }); });
    return svg(W, 196, s);
  };
  F.add(draw({}), box ? 'Đây là <b>khối hộp chữ nhật</b> (như bao diêm, hộp bánh). Nét đứt là cạnh bị khuất phía sau.' : 'Đây là <b>khối lập phương</b> (như con xúc xắc). Nét đứt là cạnh bị khuất phía sau.');
  F.add(draw({ faces: true, isNew: 'faces' }), `Nhìn thấy 3 mặt, còn 3 mặt khuất (đáy, mặt sau, mặt bên trái). ${box ? 'Khối hộp chữ nhật' : 'Khối lập phương'} có mấy mặt?`, { ask: numAsk(6, { near: [-2, 2], ok: `Đúng rồi! 6 mặt, mỗi mặt là một <b>${box ? 'hình chữ nhật' : 'hình vuông'}</b>.` }) });
  F.add(draw({ faces: true, eds: true, isNew: 'eds' }), '4 cạnh ở mặt trước, 4 cạnh ở mặt sau, 4 cạnh nối hai mặt đó: có <b>12 cạnh</b>.');
  F.add(draw({ faces: true, eds: true, verts: true, isNew: 'verts' }), `${box ? 'Khối hộp chữ nhật' : 'Khối lập phương'} có mấy đỉnh?`, { ask: numAsk(8, { near: [-2, 4], ok: 'Đúng rồi! 4 đỉnh ở mặt trước, 4 đỉnh ở mặt sau: <b>8 đỉnh</b>.' }) });
  F.add(draw({ faces: true, eds: true, verts: true }), box ? 'Khối hộp chữ nhật có 8 đỉnh, 12 cạnh, 6 mặt là hình chữ nhật.' : 'Khối lập phương có 8 đỉnh, 12 cạnh, 6 mặt là hình vuông bằng nhau.', { result: '8 đỉnh, 12 cạnh, 6 mặt' });
  return F.done();
}

// ── Bài 24, 27, 39: gấp lên, giảm đi, gấp mấy lần ───────────────────────────
function times({ mode = 'up', a = 2, k = 3, b, unit = 'cm' }) {
  const big = mode === 'up' ? a * k : a;
  const u = Math.min(40, (mode === 'ratio' ? 230 : 270) / big), X0 = 60;
  const X = (v) => X0 + v * u;
  const bar = (y, from, to, { color = C.blue, cls = '', style = '' } = {}) => `<g class="${cls}"${style ? ` style="${style}"` : ''}>${seg(X(from), y, X(to), y, { color, w: 6 })}${seg(X(from), y - 8, X(from), y + 8, { color: C.ink, w: 2 })}${seg(X(to), y - 8, X(to), y + 8, { color: C.ink, w: 2 })}</g>`;
  const F = frames(mode === 'up' ? `Gấp ${a} ${unit} lên ${k} lần` : mode === 'down' ? `Giảm ${a} ${unit} đi ${k} lần` : `${a} ${unit} gấp mấy lần ${b} ${unit}?`);
  if (mode === 'up') {
    const draw = ({ cd = false, lab = false, isNew = '' }) => {
      let s = txt(28, 56, 'AB', { size: 16, fill: C.soft }) + bar(56, 0, a) + txt((X(0) + X(a)) / 2, 34, `${a} ${unit}`, { size: 15, fill: C.blue });
      s += txt(28, 132, 'CD', { size: 16, fill: C.soft, cls: vis(cd, isNew === 'cd') });
      for (let i = 0; i < k; i++) s += bar(132, i * a, (i + 1) * a, { color: i % 2 ? C.orange : '#FB923C', cls: vis(cd, isNew === 'cd'), style: isNew === 'cd' ? dl(i, 0.25) : '' }) + txt((X(i * a) + X((i + 1) * a)) / 2, 112, a, { size: 13, fill: C.soft, cls: vis(cd, isNew === 'cd') });
      s += `<g class="${vis(lab, isNew === 'lab')}">${hbrace(X(0), X(a * k), 152, 1)}${txt((X(0) + X(a * k)) / 2, 176, `${a * k} ${unit}`, { size: 17, fill: C.green })}</g>`;
      return svg(W, 192, s);
    };
    F.add(draw({}), `Đoạn thẳng AB dài ${a} ${unit}.`);
    F.add(draw({ cd: true, isNew: 'cd' }), `<b>Gấp ${a} ${unit} lên ${k} lần</b>: đoạn CD gồm ${k} đoạn, mỗi đoạn dài ${a} ${unit}.`);
    F.add(draw({ cd: true }), `Đoạn CD dài bao nhiêu?`, { ask: numAsk(a * k, { near: [a, -a, k], fmtFn: (v) => `${v} ${unit}`, ok: `Đúng rồi! ${a} được lấy ${k} lần: ${a} × ${k} = ${a * k}.` }) });
    F.add(draw({ cd: true, lab: true, isNew: 'lab' }), `Muốn <b>gấp một số lên nhiều lần</b>, ta lấy số đó <b>nhân</b> với số lần.`, { result: `${a} × ${k} = ${a * k}` });
    return F.done();
  }
  if (mode === 'down') {
    const p = a / k;
    const draw = ({ ticks = false, cd = false, lab = false, isNew = '' }) => {
      let s = txt(28, 56, 'AB', { size: 16, fill: C.soft }) + bar(56, 0, a) + txt((X(0) + X(a)) / 2, 34, `${a} ${unit}`, { size: 15, fill: C.blue });
      for (let i = 1; i < k; i++) s += seg(X(i * p), 46, X(i * p), 66, { color: C.orange, w: 2.5, cls: vis(ticks, isNew === 'ticks') });
      for (let i = 0; i < k; i++) s += txt((X(i * p) + X((i + 1) * p)) / 2, 80, `phần ${i + 1}`, { size: 11, fill: C.orange, weight: 700, cls: vis(ticks, isNew === 'ticks') });
      s += `<g class="${vis(cd, isNew === 'cd')}">${txt(28, 132, 'CD', { size: 16, fill: C.soft })}${bar(132, 0, p, { color: C.orange })}</g>`;
      s += `<g class="${vis(lab, isNew === 'lab')}">${txt(X(p) + 16, 133, `${p} ${unit}`, { size: 17, fill: C.green, anchor: 'start' })}</g>`;
      return svg(W, 170, s);
    };
    F.add(draw({}), `Đoạn thẳng AB dài ${a} ${unit}.`);
    F.add(draw({ ticks: true, isNew: 'ticks' }), `Chia AB thành <b>${k} phần bằng nhau</b>.`);
    F.add(draw({ ticks: true, cd: true, isNew: 'cd' }), `<b>Giảm ${a} ${unit} đi ${k} lần</b> thì được một phần: đoạn CD. CD dài bao nhiêu?`, { ask: numAsk(p, { near: [1, -1, k], fmtFn: (v) => `${v} ${unit}`, ok: `Đúng rồi! ${a} : ${k} = ${p}.` }) });
    F.add(draw({ ticks: true, cd: true, lab: true, isNew: 'lab' }), `Muốn <b>giảm một số đi nhiều lần</b>, ta lấy số đó <b>chia</b> cho số lần.`, { result: `${a} : ${k} = ${p}` });
    return F.done();
  }
  const kk = a / b;
  const draw = ({ copies = false, lab = false, isNew = '' }) => {
    let s = txt(28, 50, 'AB', { size: 16, fill: C.soft }) + bar(50, 0, a) + txt((X(0) + X(a)) / 2, 28, `${a} ${unit}`, { size: 15, fill: C.blue });
    for (let i = 0; i < kk; i++) s += bar(86, i * b, (i + 1) * b, { color: i % 2 ? C.orange : '#FB923C', cls: vis(copies, isNew === 'copies'), style: isNew === 'copies' ? dl(i, 0.25) : '' }) + txt((X(i * b) + X((i + 1) * b)) / 2, 104, i + 1, { size: 13, fill: C.orange, cls: vis(copies, isNew === 'copies') });
    s += txt(28, 150, 'CD', { size: 16, fill: C.soft }) + bar(150, 0, b, { color: C.orange }) + txt(X(b) + 10, 151, `${b} ${unit}`, { size: 15, fill: C.orange, anchor: 'start' });
    s += txt(X(a) + 12, 87, `${kk} lần`, { size: 17, fill: C.green, anchor: 'start', cls: vis(lab, isNew === 'lab') });
    return svg(W, 172, s);
  };
  F.add(draw({}), `AB dài ${a} ${unit}, CD dài ${b} ${unit}. AB dài gấp mấy lần CD?`);
  F.add(draw({ copies: true, isNew: 'copies' }), `Đặt đoạn CD liên tiếp dọc theo AB.`);
  F.add(draw({ copies: true }), `AB dài gấp mấy lần CD?`, { ask: numAsk(kk, { near: [1, -1, 2], fmtFn: (v) => `${v} lần`, ok: `Đúng rồi! CD vừa đúng ${kk} lần trên AB: ${a} : ${b} = ${kk}.` }) });
  F.add(draw({ copies: true, lab: true, isNew: 'lab' }), `Muốn tìm <b>số lớn gấp mấy lần số bé</b>, ta lấy số lớn <b>chia</b> cho số bé.`, { result: `${a} : ${b} = ${kk} (lần)` });
  return F.done();
}

// ── Bài 25: chia hết, chia có dư ────────────────────────────────────────────
function share({ n = 9, k = 2, thing = 'quả cam' }) {
  const q = Math.floor(n / k), r = n % k;
  const F = frames(`Chia ${n} ${thing} vào ${k} đĩa`);
  const perTop = Math.min(n, 10), sp = 28;
  const topX = (i) => W / 2 - ((perTop - 1) * sp) / 2 + (i % perTop) * sp, topY = (i) => 24 + Math.floor(i / perTop) * 28;
  const pw = Math.min(96, (W - 16) / k - 10);
  const plateX = (p) => W / 2 + (p - (k - 1) / 2) * (pw + 10);
  const cols = Math.max(1, Math.min(q, 3)), stackRows = Math.ceil(q / cols);
  const PY = topY(n - 1) + 34 + stackRows * 20 + 6, H = PY + 18;
  const item = (x, y, cls = '', col = '#FB923C', style = '') => `<g class="${cls}"${style ? ` style="${style}"` : ''}><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="10" fill="${col}" stroke="#C2410C" stroke-width="1.3"/><path d="M${x.toFixed(1)} ${(y - 10).toFixed(1)} q3 -5 8 -4" stroke="#15803D" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>`;
  const draw = (rounds, { newRound = -1, ring = false } = {}) => {
    let s = '';
    const left = n - rounds * k;
    for (let i = 0; i < n; i++) if (i < left) s += item(topX(i), topY(i), '', ring && r ? '#FCA5A5' : '#FB923C');
    if (ring && r) s += `<rect x="${(topX(0) - 16).toFixed(1)}" y="${topY(0) - 16}" width="${((Math.min(r, perTop) - 1) * sp + 32).toFixed(1)}" height="32" rx="14" fill="none" stroke="${C.red}" stroke-width="2.5" stroke-dasharray="5 4" class="is-new"/>`;
    for (let p = 0; p < k; p++) {
      const x = plateX(p);
      s += `<ellipse cx="${x.toFixed(1)}" cy="${PY}" rx="${(pw / 2).toFixed(1)}" ry="11" fill="#F1F5F9" stroke="${C.soft}" stroke-width="2"/>`;
      for (let j = 0; j < rounds; j++) {
        const cx = x + ((j % cols) - (cols - 1) / 2) * 22, cy = PY - 12 - Math.floor(j / cols) * 20;
        s += item(cx, cy, j === newRound ? 'is-new' : '', '#FB923C', j === newRound ? dl(p, 0.12) : '');
      }
    }
    return svg(W, H, s);
  };
  F.add(draw(0), `Chia đều <b>${n} ${thing}</b> vào <b>${k} đĩa</b>.`);
  F.add(draw(1, { newRound: 0 }), `Lượt 1: mỗi đĩa 1 ${thing}. Còn lại ${n - k} ${thing}.`);
  F.add(draw(q, { newRound: q - 1 }), `Cứ chia mỗi lượt mỗi đĩa 1 ${thing} cho tới khi không chia được nữa. Mỗi đĩa được mấy ${thing}?`, { ask: numAsk(q, { near: [1, -1, 2], ok: `Đúng rồi! Mỗi đĩa ${q} ${thing}.` }) });
  F.add(draw(q, { ring: true }), r
    ? `Còn thừa <b>${r} ${thing}</b>, không đủ chia cho ${k} đĩa nữa. ${n} : ${k} = ${q} (dư ${r}): đây là <b>phép chia có dư</b>. Số dư ${r} bé hơn số chia ${k}.`
    : `Chia vừa hết, không còn thừa: ${n} : ${k} = ${q}. Đây là <b>phép chia hết</b> (số dư là 0).`,
  { result: r ? `${n} : ${k} = ${q} (dư ${r})` : `${n} : ${k} = ${q}` });
  return F.done();
}

// ── Bài 28: bài toán giải bằng hai bước tính ────────────────────────────────
function twostep({ a = 4, rel = '+', d = 3, want = 'total', names = ['Bể thứ nhất', 'Bể thứ hai'], unit = 'con cá', story }) {
  rel = normOp(rel);
  const b = rel === '+' ? a + d : rel === '−' ? a - d : a * d;
  const ans = want === 'total' ? a + b : b - a;
  const relTxt = rel === '×' ? `gấp ${d} lần ${names[0].toLowerCase()}` : `${rel === '+' ? 'nhiều hơn' : 'ít hơn'} ${names[0].toLowerCase()} ${d} ${unit}`;
  const askTxt = want === 'total' ? `cả hai có tất cả bao nhiêu ${unit}` : `${names[1].toLowerCase()} nhiều hơn ${names[0].toLowerCase()} bao nhiêu ${unit}`;
  const st = story || `${names[0]} có ${a} ${unit}. ${names[1]} ${relTxt}. Hỏi ${askTxt}?`;
  const F = frames('Giải bài toán bằng hai bước tính');
  const max = Math.max(a, b), X0 = 114, BW = 152, u = BW / max, Y1 = 44, Y2 = 98, BH = 22;
  const X = (v) => X0 + v * u;
  const op1 = rel === '×' ? '×' : rel;
  const line1 = `Bước 1: ${a} ${op1} ${d} = ${b} (${unit})`;
  const line2 = want === 'total' ? `Bước 2: ${a} + ${b} = ${ans} (${unit})` : `Bước 2: ${b} − ${a} = ${ans} (${unit})`;
  const draw = ({ row2 = false, s1 = false, s2 = false, isNew = '' }) => {
    let s = txt(8, Y1 + BH / 2, names[0], { size: 12, fill: C.blue, anchor: 'start' });
    s += `<rect x="${X0}" y="${Y1}" width="${(a * u).toFixed(1)}" height="${BH}" rx="3" fill="${C.blueL}" stroke="${C.blue}" stroke-width="1.5"/>` + txt(X(a / 2), Y1 + BH / 2, a, { size: 14 });
    let r2 = txt(8, Y2 + BH / 2, names[1], { size: 12, fill: C.orange, anchor: 'start' });
    if (rel === '×') for (let i = 0; i < d; i++) r2 += `<rect x="${X(i * a).toFixed(1)}" y="${Y2}" width="${(a * u).toFixed(1)}" height="${BH}" rx="3" fill="${C.orangeL}" stroke="${C.orange}" stroke-width="1.5"/>`;
    else if (rel === '+') r2 += `<rect x="${X0}" y="${Y2}" width="${(a * u).toFixed(1)}" height="${BH}" rx="3" fill="${C.orangeL}" stroke="${C.orange}" stroke-width="1.5"/><rect x="${X(a)}" y="${Y2}" width="${(d * u).toFixed(1)}" height="${BH}" rx="3" fill="#FFF7ED" stroke="${C.orange}" stroke-width="1.5" stroke-dasharray="4 3"/>${txt(X(a + d / 2), Y2 + BH / 2, d, { size: 13, fill: C.orange })}`;
    else r2 += `<rect x="${X0}" y="${Y2}" width="${(b * u).toFixed(1)}" height="${BH}" rx="3" fill="${C.orangeL}" stroke="${C.orange}" stroke-width="1.5"/><rect x="${X(b)}" y="${Y2}" width="${(d * u).toFixed(1)}" height="${BH}" rx="3" fill="none" stroke="${C.soft}" stroke-width="1.5" stroke-dasharray="4 3"/>${txt(X(b + d / 2), Y2 + BH + 10, d, { size: 13, fill: C.soft })}`;
    r2 += txt(X(Math.max(a, b)) + 8, Y2 + BH / 2, s1 ? b : '?', { size: 15, fill: s1 ? C.green : C.orange, anchor: 'start', cls: isNew === 's1' ? 'is-new' : '' });
    if (want === 'total') r2 += `${vbrace(X(max) + 46, Y1 - 2, Y2 + BH + 2)}${txt(X(max) + 60, (Y1 + Y2 + BH) / 2, s2 ? ans : '?', { size: 17, fill: s2 ? C.green : C.violet, anchor: 'start', cls: isNew === 's2' ? 'is-new' : '' })}`;
    else r2 += `${hbrace(X(a), X(b), Y2 - 10, -1, 6)}${txt((X(a) + X(b)) / 2, Y2 - 26, s2 ? ans : '?', { size: 15, fill: s2 ? C.green : C.violet, cls: isNew === 's2' ? 'is-new' : '' })}`;
    s += `<g class="${vis(row2, isNew === 'row2')}">${r2}</g>`;
    s += txt(16, 168, line1, { size: 16, fill: C.blue, anchor: 'start', cls: vis(s1, isNew === 's1') });
    s += txt(16, 200, line2, { size: 16, fill: C.green, anchor: 'start', cls: vis(s2, isNew === 's2') });
    return svg(W, 218, s);
  };
  F.add(draw({}), st);
  F.add(draw({ row2: true, isNew: 'row2' }), `Vẽ sơ đồ: ${names[1].toLowerCase()} ${relTxt}.`);
  F.add(draw({ row2: true }), `<b>Bước 1</b>: tìm ${names[1].toLowerCase()} trước: ${a} ${op1} ${d} = ?`, { ask: numAsk(b, { near: rel === '×' ? [a, -a, 1] : [1, -1, 2] }) });
  F.add(draw({ row2: true, s1: true, isNew: 's1' }), `${names[1]} có <b>${b} ${unit}</b>.`);
  F.add(draw({ row2: true, s1: true }), `<b>Bước 2</b>: ${want === 'total' ? `cả hai: ${a} + ${b} = ?` : `nhiều hơn: ${b} − ${a} = ?`}`, { ask: numAsk(ans, { near: [1, -1, 10] }) });
  F.add(draw({ row2: true, s1: true, s2: true, isNew: 's2' }), `Hai bước tính: tìm ${names[1].toLowerCase()} trước, rồi mới trả lời câu hỏi. <b>Đáp số: ${ans} ${unit}</b>.`, { result: `Đáp số: ${ans} ${unit}` });
  return F.done();
}

// ── Bài 30: mi-li-mét ───────────────────────────────────────────────────────
function ruler({ mm = 35, thing = 'chiếc bút chì' }) {
  const cm = Math.floor(mm / 10), rm = mm % 10, cms = Math.ceil(mm / 10) + 1;
  const u = Math.min(7, 320 / (cms * 10)), x0 = (W - cms * 10 * u) / 2, RY = 48;
  const X = (m) => x0 + m * u;
  const F = frames(`Đo ${thing} bằng mi-li-mét`);
  const draw = ({ band = false, small = false, obj = false, lab = false, isNew = '' }) => {
    let s = `<rect x="${x0 - 12}" y="${RY}" width="${cms * 10 * u + 24}" height="58" rx="5" fill="#FEF3C7" stroke="#D97706" stroke-width="1.5"/>`;
    s += `<rect x="${X(0)}" y="${RY}" width="${10 * u}" height="58" fill="rgba(56,189,248,0.25)" class="${vis(band, isNew === 'band')}"/>`;
    for (let m = 0; m <= cms * 10; m++) {
      const big = m % 10 === 0, half = m % 5 === 0;
      if (big) s += seg(X(m), RY, X(m), RY + 20, { color: '#92400E', w: 2 }) + txt(X(m), RY + 36, m / 10, { size: 14, fill: '#92400E', cls: 'plain' });
      else s += seg(X(m), RY, X(m), RY + (half ? 14 : 9), { color: '#92400E', w: 1.2, cls: vis(small, isNew === 'small') });
    }
    s += txt(X(cms * 10) + 2, RY + 50, 'cm', { size: 12, fill: '#92400E', cls: 'plain', anchor: 'end' });
    const ob = `<rect x="${X(0)}" y="${RY - 34}" width="${(mm * u - 14).toFixed(1)}" height="22" rx="4" fill="#FACC15" stroke="#A16207" stroke-width="1.5"/><path d="M${X(mm) - 14} ${RY - 34} L${X(mm)} ${RY - 23} L${X(mm) - 14} ${RY - 12} Z" fill="#FDE68A" stroke="#A16207" stroke-width="1.5"/>${seg(X(0), RY - 8, X(0), RY, { color: C.red, w: 2 })}${seg(X(mm), RY - 8, X(mm), RY, { color: C.red, w: 2 })}`;
    s += `<g class="${vis(obj, isNew === 'obj')}">${ob}</g>`;
    void lab;
    return svg(W, RY + 66, s);
  };
  F.add(draw({ band: true, isNew: 'band' }), 'Trên thước, từ vạch 0 đến vạch 1 dài <b>1 cm</b>.');
  F.add(draw({ band: true, small: true, isNew: 'small' }), 'Từ 0 đến 1 có 10 khoảng nhỏ bằng nhau, mỗi khoảng dài <b>1 mi-li-mét</b> (1 mm). 1 cm bằng mấy mi-li-mét?', { ask: { options: ['1 mm', '10 mm', '100 mm'], answer: 1, ok: 'Đúng rồi! <b>1 cm = 10 mm</b>.' } });
  F.add(draw({ small: true, obj: true, isNew: 'obj' }), `Đo ${thing}: đặt một đầu ở vạch 0.`);
  F.add(draw({ small: true, obj: true }), `${thing[0].toUpperCase()}${thing.slice(1)} dài bao nhiêu mi-li-mét?`, { ask: numAsk(mm, { near: [10, -10, 1], fmtFn: (v) => `${v} mm`, ok: `Đúng rồi! ${cm} cm là ${cm * 10} mm${rm ? `, thêm ${rm} mm: ${mm} mm` : ''}.` }) });
  F.add(draw({ small: true, obj: true, lab: true, isNew: 'lab' }), 'Mi-li-mét viết tắt là <b>mm</b>. <b>1 cm = 10 mm</b>, <b>1 m = 1000 mm</b>.', { result: rm ? `${mm} mm = ${cm} cm ${rm} mm` : `${mm} mm = ${cm} cm` });
  return F.done();
}

// ── Bài 31: gam (cân đĩa) ───────────────────────────────────────────────────
function scale({ weights = [500, 200], thing = 'gói đường' }) {
  const sum = weights.reduce((x, y) => x + y, 0);
  const F = frames(`${thing[0].toUpperCase()}${thing.slice(1)} nặng bao nhiêu gam?`);
  const CX = 180, CY = 26, L = 118;
  const wW = (w) => (w >= 500 ? 40 : w >= 200 ? 32 : w >= 100 ? 27 : 22);
  const draw = (k, { isNew = false } = {}) => {
    const on = weights.slice(0, k).reduce((x, y) => x + y, 0);
    const th = on === sum ? 0 : on > sum ? -0.16 : 0.16 * (1 - on / sum * 0.5);
    const lx = CX - L * Math.cos(th), ly = CY + L * Math.sin(th), rx = CX + L * Math.cos(th), ry = CY - L * Math.sin(th);
    let s = `<path d="M140 164 L220 164 L200 148 L160 148 Z" fill="#94A3B8"/>${seg(CX, 148, CX, CY, { color: '#64748B', w: 8 })}`;
    s += seg(lx, ly, rx, ry, { color: '#475569', w: 6 }) + dot(CX, CY, { r: 7, fill: '#334155' });
    const pan = (x, y) => `${seg(x, y, x - 40, y + 56, { color: C.soft, w: 1.5 })}${seg(x, y, x + 40, y + 56, { color: C.soft, w: 1.5 })}<path d="M${x - 48} ${y + 56} Q${x} ${y + 76} ${x + 48} ${y + 56} Z" fill="#CBD5E1" stroke="#64748B" stroke-width="2"/>`;
    s += pan(lx, ly) + pan(rx, ry);
    // vật bên trái
    s += `<rect x="${lx - 26}" y="${ly + 16}" width="52" height="40" rx="8" fill="#F9A8D4" stroke="#BE185D" stroke-width="2"/>${txt(lx, ly + 36, '?', { size: 20, fill: '#9D174D' })}`;
    // quả cân bên phải
    let x = rx - weights.slice(0, k).reduce((t, w) => t + wW(w) + 3, 0) / 2;
    weights.slice(0, k).forEach((w, i) => {
      const ww = wW(w), hh = ww * 0.95;
      s += `<g class="${isNew && i === k - 1 ? 'is-new' : ''}"><path d="M${x + 3} ${ry + 56} L${x + ww - 3} ${ry + 56} L${x + ww - 7} ${ry + 56 - hh * 0.8} L${x + 7} ${ry + 56 - hh * 0.8} Z" fill="#94A3B8" stroke="#475569" stroke-width="1.5"/><rect x="${x + ww / 2 - 4}" y="${ry + 56 - hh}" width="8" height="${hh * 0.22}" rx="2" fill="#64748B"/>${txt(x + ww / 2, ry + 56 - hh * 0.4, `${w}g`, { size: ww >= 32 ? 10 : 8, fill: '#fff', cls: 'plain' })}</g>`;
      x += ww + 3;
    });
    return svg(W, 168, s);
  };
  F.add(draw(0), `Đặt ${thing} lên đĩa cân bên trái. Đĩa bên trái nặng hơn nên hạ xuống.`);
  weights.forEach((w, i) => {
    const on = weights.slice(0, i + 1).reduce((x, y) => x + y, 0);
    F.add(draw(i + 1, { isNew: true }), on === sum ? `Thêm quả cân ${w} g: cân <b>thăng bằng</b>.` : `Thêm quả cân ${w} g vào đĩa bên phải: đĩa bên trái vẫn nặng hơn.`);
  });
  F.add(draw(weights.length), `${thing[0].toUpperCase()}${thing.slice(1)} nặng bằng các quả cân. ${thing[0].toUpperCase()}${thing.slice(1)} nặng bao nhiêu gam?`, { ask: numAsk(sum, { near: [100, -100, 50], fmtFn: (v) => `${v} g`, ok: `Đúng rồi! ${weights.join(' g + ')} g = ${sum} g.` }) });
  F.add(draw(weights.length), `Gam viết tắt là <b>g</b>. <b>1 kg = 1000 g</b>.`, { result: `${thing[0].toUpperCase()}${thing.slice(1)} nặng ${sum} g` });
  return F.done();
}

// ── Bài 32: mi-li-lít ───────────────────────────────────────────────────────
function jug({ v = 400, cap = 1000, step = 100 }) {
  const F = frames(`Đọc số mi-li-lít trên ca có vạch chia`);
  const x = 120, w = 110, top = 22, bot = 196, H = bot - top - 10;
  const Y = (ml) => bot - (ml / cap) * H;
  const draw = ({ water = 0, isNew = false, lab = false }) => {
    let s = `<path d="M${x + w} ${top + 30} q34 4 34 40 q0 40 -34 46" fill="none" stroke="#94A3B8" stroke-width="7"/>`;
    s += `<rect x="${x}" y="${top}" width="${w}" height="${bot - top}" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>`;
    if (water) s += `<rect x="${x + 3}" y="${Y(water).toFixed(1)}" width="${w - 6}" height="${(bot - 3 - Y(water)).toFixed(1)}" rx="6" fill="#7DD3FC" class="${isNew ? 'g3a-rise' : ''}"/>`;
    for (let ml = step; ml <= cap; ml += step) {
      const big = (ml / step) % (cap / step >= 10 ? 2 : 1) === 0 || ml === cap;
      s += seg(x, Y(ml), x + (big ? 26 : 16), Y(ml), { color: '#334155', w: 2 });
      if (big) s += txt(x - 8, Y(ml), `${ml} ml`, { size: 12, fill: C.ink, anchor: 'end' });
    }
    s += txt(x + w + 42, Y(water || v), `◀ ${water || v} ml`, { size: 17, fill: C.green, anchor: 'start', cls: vis(lab, isNew) });
    return svg(W, 210, s);
  };
  F.add(draw({}), `Ca có vạch chia, mỗi vạch là ${step} ml. Mi-li-lít viết tắt là <b>ml</b>.`);
  F.add(draw({ water: v, isNew: true }), 'Rót nước vào ca. Mặt nước ngang vạch nào?');
  F.add(draw({ water: v }), 'Trong ca có bao nhiêu mi-li-lít nước?', { ask: numAsk(v, { near: [step, -step, step * 2], fmtFn: (val) => `${val} ml`, ok: `Đúng rồi! Mặt nước ngang vạch ${v} ml.` }) });
  F.add(draw({ water: v, lab: true }), `Trong ca có <b>${v} ml</b> nước.`);
  F.add(draw({ water: cap, isNew: true, lab: true }), cap === 1000 ? 'Rót thêm cho đầy tới vạch 1000 ml: vừa đúng <b>1 lít</b>. <b>1 l = 1000 ml</b>.' : `Rót thêm cho đầy tới vạch ${cap} ml.`, { result: '1 l = 1000 ml' });
  return F.done();
}

// ── Bài 33: nhiệt độ ────────────────────────────────────────────────────────
function thermo({ t = 30, min = 0, max = 50 }) {
  const F = frames(`Nhiệt kế chỉ bao nhiêu độ C?`);
  const x0 = 62, x1 = 326, Y = 30;
  const X = (d) => x0 + ((d - min) / (max - min)) * (x1 - x0);
  const draw = ({ level = min, grow = false, lab = false }) => {
    let s = `<rect x="${x0 - 22}" y="${Y - 12}" width="${x1 - x0 + 40}" height="24" rx="12" fill="#F1F5F9" stroke="#94A3B8" stroke-width="2"/>`;
    s += `<circle cx="${x0 - 22}" cy="${Y}" r="20" fill="#EF4444" stroke="#B91C1C" stroke-width="2"/>`;
    s += `<rect x="${x0 - 22}" y="${Y - 5}" width="${(X(level) - x0 + 22).toFixed(1)}" height="10" fill="#EF4444" class="${grow ? 'is-grow' : ''}"/>`;
    for (let d = min; d <= max; d++) {
      const big = d % 10 === 0, half = d % 5 === 0;
      s += seg(X(d), Y + 16, X(d), Y + 16 + (big ? 16 : half ? 11 : 6), { color: '#334155', w: big ? 2 : 1 });
      if (big) s += txt(X(d), Y + 46, d, { size: 14, fill: C.ink });
    }
    s += txt(x1 + 22, Y + 46, '°C', { size: 14, fill: C.ink });
    void lab;
    return svg(W, Y + 60, s);
  };
  F.add(draw({}), 'Nhiệt kế dùng để đo nhiệt độ. Đơn vị đo nhiệt độ là <b>độ C</b>, viết là <b>°C</b>. Mỗi vạch nhỏ là 1 °C.');
  F.add(draw({ level: t, grow: true }), 'Cột màu đỏ dâng lên. Nhìn đầu cột màu đỏ: nó ở gần số nào, cách số đó mấy vạch?');
  F.add(draw({ level: t }), 'Nhiệt kế chỉ bao nhiêu độ C?', { ask: numAsk(t, { near: [1, -1, 10, -10], fmtFn: (v) => `${v} °C`, ok: `Đúng rồi! Đầu cột màu đỏ ở vạch ${t}.` }) });
  F.add(draw({ level: t, lab: true }), `Nhiệt kế chỉ <b>${t} °C</b>, đọc là ${docSo(t)} độ C.${t >= 30 ? ' Trời nóng.' : t <= 15 ? ' Trời lạnh.' : ''}`, { result: `${t} °C` });
  return F.done();
}

export const G3A_KINDS = {
  'g3a-blocks': blocks, 'g3a-find': find, 'g3a-table': table, 'g3a-part': part, 'g3a-line3': line3, 'g3a-clock': clock,
  'g3a-mid': mid, 'g3a-circle': circle, 'g3a-right': right, 'g3a-poly': poly, 'g3a-grid': grid, 'g3a-cube': cube,
  'g3a-times': times, 'g3a-share': share, 'g3a-twostep': twostep, 'g3a-ruler': ruler, 'g3a-scale': scale, 'g3a-jug': jug,
  'g3a-thermo': thermo,
};

const CSS = `
  .kd-svg .g3a-rise { animation: g3aRise 0.9s ease-out both; transform-box: fill-box; transform-origin: center bottom; }
  @keyframes g3aRise { from { transform: scaleY(0); } }
  @media (prefers-reduced-motion: reduce) { .kd-svg .g3a-rise { animation: g3aRise 1.8s linear both; } }
`;

registerDemos(G3A_KINDS, CSS, 'g3a');
