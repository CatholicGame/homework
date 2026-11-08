/**
 * 🏆 Đấu Trường Nhí: hình vẽ của câu hỏi (vẽ bằng canvas 2D lên màn LED, và vẽ trong nút phương án).
 *
 * Câu có `fig` (một hình hoặc mảng hình đặt cạnh nhau). Mọi hình vẽ trên một tấm bảng sáng, nét đậm, chữ to để đọc khi camera áp sát.
 * Dữ liệu viết tay trong ngân hàng (bank/hk1/g<lớp>/*.js), nên mỗi loại hình nhận ít trường, mặc định hợp lý.
 *
 * Thẻ hình (token), dùng trong `tokens`, `balance` và phương án dạng "[tri.red sq.blue]":
 *   tên[.màu][.số][.o]   tên: circle sq rect tri star heart diamond hex pent arrow moon cloud dice stick
 *                         màu: red blue green yellow orange purple pink brown black gray white
 *                         số: arrow, tri = góc xoay (độ); dice = số chấm; stick = số que
 *                         .o = chỉ viền, .h = tô nửa trái
 *   ?  = ô dấu hỏi nét đứt;  _ = ô trống;  chữ / số / emoji khác: viết nguyên (🍎, 5, +, =, →, ×)
 *
 * Các loại hình { type, … }:
 *   tokens   { rows: [[thẻ…]…] } hoặc { row: [thẻ…] }, center?   các hàng thẳng cột (center: true căn giữa từng hàng); dãy hình, đếm, phép tính bằng hình
 *   clock    { h, m }                                       đồng hồ kim
 *   numline  { from, to, step=1, label?: [số có ghi], ask?: [số thay bằng ?], hops?: [[a, b, chữ?]…], mark?: { số: 'A' } }
 *   frac     { shape: 'bar'|'circle'|'grid', n, k, cols? }   chia n phần bằng nhau, tô k phần
 *   grid     { cols, rows, fill: ['##..', '.#..'] , color? } ô vuông (mỗi dòng một chuỗi, # tô, . trống, chữ cái = màu riêng)
 *   poly     { pts: [[x, y]…], sides?: [nhãn cạnh i (từ đỉnh i tới i+1)], names?: [tên đỉnh], right?: [chỉ số đỉnh góc vuông], fill? }
 *   lines    { pts: { A: [x, y] }, segs: [['A','B']…], dash?: [['A','C']…], circles?: [[cx, cy, r]…], match?: true, labels?: true,
 *            lens?: [['A','B','3 cm']…] (độ dài ghi giữa đoạn) }
 *   angle    { deg, names?: ['A', 'O', 'B'] }               góc đỉnh O (names[1])
 *   bars     { labels: [], values: [], unit?: '', step? }   biểu đồ cột
 *   table    { head: [], rows: [[]] }                       bảng số liệu
 *   money    { items: [500, 1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000] } tờ tiền / đồng xu
 *   ruler    { len, start=0, max?, obj?: 'pencil'|'nail'|'ribbon' } vật đặt trên thước cm
 *   balance  { left: [chữ / thẻ…], right: [...], tilt: -1 (trái nặng) | 0 | 1 }
 *   cubes    { cols: [[chiều cao…]…] }                       khối lập phương xếp chồng (mỗi phần tử là một hàng từ sau ra trước)
 *   calendar { days, start (0 = thứ Hai), mark?: [ngày], title? }
 *   thermo   { v, min=0, max=50 }                           nhiệt kế °C
 *   jug      { items: [{ cap, v, unit: 'l' | 'ml' }…] }      bình nước có vạch
 *   text     { lines: ['…'] }                               khung chữ (bài thơ, đoạn văn ngắn, phép tính đặt cột)
 *   vcalc    { a, b, op: '+'|'−'|'×', res?: '?'|số, hide?: { a|b|res: [chỉ số chữ số thay ?] } } đặt tính theo cột
 */

export const COLORS = {
  red: '#ef4444', blue: '#3b82f6', green: '#22c55e', yellow: '#facc15', orange: '#f97316', purple: '#a855f7',
  pink: '#ec4899', brown: '#a16207', black: '#1f2937', gray: '#9ca3af', white: '#ffffff',
};
const NAME_VI = {
  red: 'đỏ', blue: 'xanh dương', green: 'xanh lá', yellow: 'vàng', orange: 'cam', purple: 'tím', pink: 'hồng', brown: 'nâu', black: 'đen',
  gray: 'xám', white: 'trắng',
};
const SHAPE_VI = {
  circle: 'hình tròn', sq: 'hình vuông', rect: 'hình chữ nhật', tri: 'hình tam giác', star: 'ngôi sao', heart: 'trái tim', diamond: 'hình thoi',
  hex: 'hình sáu cạnh', pent: 'hình năm cạnh', arrow: 'mũi tên', moon: 'mặt trăng', cloud: 'đám mây', dice: 'mặt xúc xắc', stick: 'que tính',
};
const INK = '#1e293b', BOARD = '#f8fbff', SOFT = '#cbd5e1';
const FONT = (s, w = 800) => `${w} ${s}px "Segoe UI", system-ui, sans-serif`;
const EMOJI_FONT = (s) => `${s}px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", sans-serif`;

/* ---------- Thẻ hình ---------- */
export function parseTok(t) {
  t = String(t).trim();
  if (t === '?' || t === '_') return { kind: t };
  const p = t.split('.');
  if (!SHAPE_VI[p[0]]) return { kind: 'text', text: t };
  const o = { kind: 'shape', name: p[0], color: null, n: null, outline: false, half: false };
  for (const x of p.slice(1)) {
    if (COLORS[x]) o.color = x; else if (/^-?\d+$/.test(x)) o.n = +x; else if (x === 'o') o.outline = true; else if (x === 'h') o.half = true;
  }
  if (!o.color) o.color = { star: 'yellow', moon: 'yellow', cloud: 'gray', dice: 'white', stick: 'orange' }[o.name] || 'blue';
  return o;
}
/** Chuỗi phương án dạng "[tri.red sq.blue]" là dãy thẻ hình; trả mảng thẻ hoặc null. */
export function optTokens(s) {
  const m = String(s).match(/^\[(.+)\]$/);
  return m ? m[1].trim().split(/\s+/) : null;
}
/** Tên thẻ để MC đọc ("tam giác đỏ"). Các thẻ giống nhau liền nhau đọc gộp ("3 ngôi sao vàng"). */
export function sayTokens(toks) {
  const one = (t) => {
    const o = parseTok(t);
    if (o.kind === '?') return 'dấu hỏi';
    if (o.kind === '_') return '';
    if (o.kind === 'text') return o.text;
    if (o.name === 'dice') return `mặt xúc xắc ${o.n ?? 1} chấm`;
    if (o.name === 'stick') return `${o.n ?? 1} que tính`;
    return `${SHAPE_VI[o.name]}${o.name === 'arrow' ? ` chỉ ${dirVi(o.n || 0)}` : ''} ${NAME_VI[o.color] || ''}`.trim();
  };
  const out = [];
  for (let i = 0; i < toks.length;) {
    let j = i; while (j < toks.length && toks[j] === toks[i]) j++;
    const w = one(toks[i]);
    if (w) out.push(j - i > 1 ? `${j - i} ${w}` : w);
    i = j;
  }
  return out.join(', ');
}
function dirVi(deg) { return ({ 0: 'sang phải', 90: 'xuống dưới', 180: 'sang trái', 270: 'lên trên', '-90': 'lên trên' })[((deg % 360) + 360) % 360] || 'chéo'; }

function star(c, x, y, r, k = 5, inner = 0.45) {
  c.beginPath();
  for (let i = 0; i < k * 2; i++) {
    const a = -Math.PI / 2 + (i * Math.PI) / k, rr = i % 2 ? r * inner : r;
    c.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr);
  }
  c.closePath();
}
function regular(c, x, y, r, k, rot = -Math.PI / 2) {
  c.beginPath();
  for (let i = 0; i < k; i++) { const a = rot + (i * 2 * Math.PI) / k; c.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r); }
  c.closePath();
}
/** Vẽ một thẻ vào ô vuông tâm (x, y) cạnh s. */
export function drawTok(c, t, x, y, s, dark = false) {
  const o = parseTok(t);
  const r = s * 0.4;
  c.save();
  c.lineJoin = 'round'; c.lineCap = 'round';
  if (o.kind === '?') {
    c.setLineDash([s * 0.08, s * 0.06]); c.lineWidth = Math.max(2, s * 0.04); c.strokeStyle = dark ? '#ffd36b' : '#f59e0b';
    c.beginPath(); c.roundRect(x - r, y - r, 2 * r, 2 * r, s * 0.1); c.stroke(); c.setLineDash([]);
    c.fillStyle = dark ? '#ffd36b' : '#f59e0b'; c.font = FONT(s * 0.56, 900); c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText('?', x, y + s * 0.03);
    c.restore(); return;
  }
  if (o.kind === '_') { c.restore(); return; }
  if (o.kind === 'text') {
    const emoji = /\p{Extended_Pictographic}/u.test(o.text);
    let fs = s * (emoji ? 0.7 : 0.62);
    c.font = emoji ? EMOJI_FONT(fs) : FONT(fs, 900);
    const w = c.measureText(o.text).width;
    if (w > s * 0.84) { fs *= (s * 0.84) / w; c.font = emoji ? EMOJI_FONT(fs) : FONT(fs, 900); }
    c.fillStyle = dark ? '#fff' : INK; c.textAlign = 'center'; c.textBaseline = 'middle';
    c.fillText(o.text, x, y + s * 0.04);
    c.restore(); return;
  }
  const col = COLORS[o.color];
  // chỉ viền (.o): viền đậm màu của thẻ (trắng / không màu thì viền mực)
  c.fillStyle = col; c.strokeStyle = o.color === 'white' ? (dark ? '#fff' : INK) : o.outline ? col : shade(col, -0.35);
  if (o.outline) c.lineWidth = Math.max(3, s * 0.08);
  if (!o.outline) c.lineWidth = Math.max(2, s * 0.045);
  c.translate(x, y);
  if (o.name === 'arrow' || o.name === 'tri') c.rotate(((o.n || 0) * Math.PI) / 180);
  switch (o.name) {
    case 'circle': c.beginPath(); c.arc(0, 0, r, 0, 7); break;
    case 'sq': c.beginPath(); c.rect(-r * 0.88, -r * 0.88, r * 1.76, r * 1.76); break;
    case 'rect': c.beginPath(); c.rect(-r, -r * 0.6, r * 2, r * 1.2); break;
    case 'tri': regular(c, 0, r * 0.15, r * 1.08, 3); break;
    case 'star': star(c, 0, r * 0.06, r * 1.08); break;
    case 'diamond': c.beginPath(); c.moveTo(0, -r); c.lineTo(r * 0.75, 0); c.lineTo(0, r); c.lineTo(-r * 0.75, 0); c.closePath(); break;
    case 'hex': regular(c, 0, 0, r, 6, 0); break;
    case 'pent': regular(c, 0, r * 0.08, r * 1.02, 5); break;
    case 'heart':
      c.beginPath(); c.moveTo(0, r * 0.95);
      c.bezierCurveTo(-r * 1.4, r * 0.05, -r * 0.75, -r * 1.05, 0, -r * 0.35);
      c.bezierCurveTo(r * 0.75, -r * 1.05, r * 1.4, r * 0.05, 0, r * 0.95); c.closePath(); break;
    case 'moon': c.beginPath(); c.arc(0, 0, r, Math.PI * 0.3, Math.PI * 1.7); c.arc(r * 0.45, -r * 0.05, r * 0.8, Math.PI * 1.55, Math.PI * 0.45, true); c.closePath(); break;
    case 'cloud':
      c.beginPath(); c.arc(-r * 0.45, r * 0.15, r * 0.45, Math.PI * 0.5, Math.PI * 1.5); c.arc(0, -r * 0.2, r * 0.55, Math.PI, 0);
      c.arc(r * 0.5, r * 0.15, r * 0.42, Math.PI * 1.5, Math.PI * 0.5); c.closePath(); break;
    case 'arrow':
      c.beginPath(); c.moveTo(-r, -r * 0.28); c.lineTo(r * 0.2, -r * 0.28); c.lineTo(r * 0.2, -r * 0.65); c.lineTo(r, 0);
      c.lineTo(r * 0.2, r * 0.65); c.lineTo(r * 0.2, r * 0.28); c.lineTo(-r, r * 0.28); c.closePath(); break;
    case 'dice': {
      c.beginPath(); c.roundRect(-r, -r, 2 * r, 2 * r, r * 0.25); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = INK; c.stroke();
      const n = Math.max(1, Math.min(6, o.n || 1)), d = r * 0.5, P = {
        1: [[0, 0]], 2: [[-d, -d], [d, d]], 3: [[-d, -d], [0, 0], [d, d]], 4: [[-d, -d], [d, -d], [-d, d], [d, d]],
        5: [[-d, -d], [d, -d], [0, 0], [-d, d], [d, d]], 6: [[-d, -d], [d, -d], [-d, 0], [d, 0], [-d, d], [d, d]] }[n];
      c.fillStyle = o.color === 'white' ? INK : col;
      for (const [px, py] of P) { c.beginPath(); c.arc(px, py, r * 0.17, 0, 7); c.fill(); }
      c.restore(); return;
    }
    case 'stick': {
      const n = Math.max(1, Math.min(10, o.n || 1)), gap = (r * 2) / Math.max(1, n);
      for (let i = 0; i < n; i++) {
        const sx = -r + gap * (i + 0.5);
        c.strokeStyle = '#d97706'; c.lineWidth = Math.max(3, Math.min(gap * 0.45, s * 0.07)); c.beginPath(); c.moveTo(sx, -r * 0.85); c.lineTo(sx, r); c.stroke();
        c.fillStyle = COLORS.red; c.beginPath(); c.arc(sx, -r * 0.88, c.lineWidth * 0.7, 0, 7); c.fill();
      }
      c.restore(); return;
    }
  }
  if (o.half) {
    c.save(); c.clip(); c.fillStyle = col; c.fillRect(-r * 1.5, -r * 1.5, r * 1.5, r * 3); c.restore(); c.stroke();
  } else {
    if (!o.outline) c.fill();
    c.stroke();
  }
  c.restore();
}
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16), f = (v) => Math.max(0, Math.min(255, Math.round(v + (k < 0 ? v * k : (255 - v) * k))));
  return `rgb(${f(n >> 16)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

/* ---------- Khung chung ---------- */
function text(c, s, x, y, size, { color = INK, align = 'center', weight = 800, base = 'middle', max } = {}) {
  c.font = FONT(size, weight); c.fillStyle = color; c.textAlign = align; c.textBaseline = base;
  max ? c.fillText(String(s), x, y, max) : c.fillText(String(s), x, y);
}
/** Ánh xạ hộp nội dung tỉ lệ (bw × bh) vào khung (x, y, w, h), giữ tỉ lệ, căn giữa. */
function fit(x, y, w, h, bw, bh) {
  const k = Math.min(w / bw, h / bh);
  return { k, ox: x + (w - bw * k) / 2, oy: y + (h - bh * k) / 2 };
}

/** Tỉ lệ rộng / cao mong muốn của một hình (để chia chỗ trên màn LED). */
export function figAspect(fig) {
  if (Array.isArray(fig)) return fig.reduce((s, f) => s + figAspect(f), 0) + 0.15 * (fig.length - 1);
  switch (fig.type) {
    case 'tokens': {
      const rows = fig.rows || [fig.row || []];
      return Math.max(1, Math.max(...rows.map(r => r.length))) / rows.length;
    }
    case 'clock': case 'angle': case 'frac': return fig.shape === 'bar' ? 3.2 : 1.15;
    case 'numline': return 4;
    case 'grid': return (fig.cols + 0.6) / (fig.rows + 0.6);
    case 'bars': return 1.6;
    case 'table': return Math.max(1.4, ((fig.head || fig.rows?.[0])?.length || 2) * 0.9);
    case 'money': return Math.min(4, (fig.items?.length || 1) * 1.05);
    case 'ruler': return 3.4;
    case 'balance': return 1.5;
    case 'calendar': return 1.3;
    case 'thermo': return 0.5;
    case 'jug': return Math.max(0.8, (fig.items?.length || 1) * 0.75);
    case 'text': {
      const ls = textLines(fig).length ? textLines(fig) : [''], mx = Math.max(...ls.map(l => l.length));
      return Math.max(1.1, Math.min(3.6, (mx * 0.55 + 2) / (ls.length * 1.3 + 0.8)));
    }
    case 'vcalc': return 0.9;
    case 'cubes': return 1.3;
    default: {
      const P = (Array.isArray(fig.pts) ? fig.pts : Object.values(fig.pts || {}))
        .concat((fig.circles || []).flatMap(([cx, cy, r]) => [[cx - r, cy - r], [cx + r, cy + r]]));
      if (!P.length) return 1.4;
      const xs = P.map(p => p[0]), ys = P.map(p => p[1]);
      return Math.max(0.5, Math.min(3.5, (Math.max(...xs) - Math.min(...xs) + 2) / (Math.max(...ys) - Math.min(...ys) + 2)));
    }
  }
}

/**
 * Vẽ hình `fig` vào khung (x, y, w, h) của canvas `c`. Có bảng sáng bo góc phía sau (board: false để bỏ).
 */
export function drawFig(c, fig, x, y, w, h, { board = true } = {}) {
  if (!fig) return;
  c.save();
  c.textBaseline = 'middle';
  if (board) {
    c.fillStyle = BOARD; c.shadowColor = 'rgba(0,0,0,.35)'; c.shadowBlur = 18;
    c.beginPath(); c.roundRect(x, y, w, h, Math.min(28, h * 0.08)); c.fill(); c.shadowBlur = 0;
    const p = Math.min(w, h) * 0.06; x += p; y += p; w -= 2 * p; h -= 2 * p;
  }
  if (Array.isArray(fig)) {
    const as = fig.map(figAspect), gap = w * 0.03, tot = as.reduce((a, b) => a + b, 0);
    const fws = as.map(a => (w - gap * (fig.length - 1)) * (a / tot));
    // nhiều lưới ô vuông trong một câu: chung một cỡ ô (hình 1 ô không phóng to bằng hình 3 × 3)
    const cell = fig.every(f => f.type === 'grid') ? Math.min(...fig.map((f, i) => Math.min(fws[i] / f.cols, h / f.rows))) : 0;
    let cx = x;
    fig.forEach((f, i) => { drawOne(c, cell ? { ...f, _s: cell } : f, cx, y, fws[i], h); cx += fws[i] + gap; });
  } else drawOne(c, fig, x, y, w, h);
  c.restore();
}
function drawOne(c, f, x, y, w, h) {
  const fn = DRAW[f.type];
  if (!fn) { text(c, `(hình lạ: ${f.type})`, x + w / 2, y + h / 2, 30, { color: '#b91c1c' }); return; }
  c.save(); fn(c, f, x, y, w, h); c.restore();
}

/* ---------- Từng loại hình ---------- */
const DRAW = {
  tokens(c, f, x, y, w, h) {
    const rows = f.rows || [f.row || []];
    const n = Math.max(...rows.map(r => r.length)), s = Math.min(w / n, h / rows.length, 440);
    const oy = y + (h - s * rows.length) / 2;
    rows.forEach((r, j) => {
      const ox = x + (w - s * (f.center ? r.length : n)) / 2;   // các hàng chung một lưới (thẳng cột để so sánh); center: true căn giữa từng hàng
      r.forEach((t, i) => drawTok(c, t, ox + s * (i + 0.5), oy + s * (j + 0.5), s * 0.92));
    });
  },
  clock(c, f, x, y, w, h) {
    const r = Math.min(w, h) / 2 * 0.96, cx = x + w / 2, cy = y + h / 2;
    c.fillStyle = '#fff'; c.strokeStyle = '#2563eb'; c.lineWidth = r * 0.07;
    c.beginPath(); c.arc(cx, cy, r, 0, 7); c.fill(); c.stroke();
    for (let i = 0; i < 60; i++) {
      const a = (i * Math.PI) / 30, big = i % 5 === 0, r1 = r * (big ? 0.84 : 0.88);
      c.strokeStyle = big ? INK : SOFT; c.lineWidth = big ? r * 0.025 : r * 0.012;
      c.beginPath(); c.moveTo(cx + Math.sin(a) * r1, cy - Math.cos(a) * r1); c.lineTo(cx + Math.sin(a) * r * 0.92, cy - Math.cos(a) * r * 0.92); c.stroke();
    }
    for (let i = 1; i <= 12; i++) {
      const a = (i * Math.PI) / 6;
      text(c, i, cx + Math.sin(a) * r * 0.7, cy - Math.cos(a) * r * 0.7 + r * 0.02, r * 0.19, { weight: 800 });
    }
    // kim dừng trước vòng số (không che số)
    const hm = ((f.h % 12) + (f.m || 0) / 60) * (Math.PI / 6), mm = ((f.m || 0) * Math.PI) / 30;
    const hand = (a, len, wd, col) => { c.strokeStyle = col; c.lineWidth = wd; c.lineCap = 'round'; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx + Math.sin(a) * len, cy - Math.cos(a) * len); c.stroke(); };
    hand(hm, r * 0.38, r * 0.075, '#dc2626');
    hand(mm, r * 0.56, r * 0.045, '#1d4ed8');
    c.fillStyle = INK; c.beginPath(); c.arc(cx, cy, r * 0.06, 0, 7); c.fill();
  },
  numline(c, f, x, y, w, h) {
    const step = f.step || 1, n = Math.round((f.to - f.from) / step);
    // lề hai đầu đủ cho nửa nhãn dài nhất ở đầu / cuối tia (vd "1 000 000")
    const ends = [f.from, f.to].map(v => fmtN(v).length), fs0 = Math.min(h * (f.hops ? 0.2 : 0.28), ((w * 0.88) / n) * 0.75, 72);
    const pad = Math.max(w * 0.06, Math.max(...ends) * fs0 * 0.32);
    const x0 = x + pad, x1 = x + w - pad, ly = y + h * (f.hops ? 0.62 : 0.45);
    const X = (v) => x0 + ((v - f.from) / (f.to - f.from)) * (x1 - x0);
    const fs = Math.min(fs0, ((x1 - x0) / n) * 0.75);
    c.strokeStyle = INK; c.lineWidth = Math.max(3, fs * 0.09);
    c.beginPath(); c.moveTo(x0 - pad * 0.6, ly); c.lineTo(x1 + pad * 0.6, ly); c.stroke();
    c.beginPath(); c.moveTo(x1 + pad * 0.6, ly); c.lineTo(x1 + pad * 0.3, ly - fs * 0.25); c.moveTo(x1 + pad * 0.6, ly); c.lineTo(x1 + pad * 0.3, ly + fs * 0.25); c.stroke();
    const lab = new Set(f.label || Array.from({ length: n + 1 }, (_, i) => +(f.from + i * step).toFixed(6)));
    const ask = new Set(f.ask || []);
    let lastR = -1e9;
    for (let i = 0; i <= n; i++) {
      const v = +(f.from + i * step).toFixed(6), tx = X(v);
      c.beginPath(); c.moveTo(tx, ly - fs * 0.3); c.lineTo(tx, ly + fs * 0.3); c.stroke();
      if (ask.has(v)) { drawTok(c, '?', tx, ly + fs * 1.15, fs * 1.6); lastR = tx + fs * 0.8; }
      else if (lab.has(v)) {
        // nhãn chạm nhãn trước (số dài 6–7 chữ số) thì bỏ, trừ nhãn cuối tia
        c.font = FONT(fs); const tw = c.measureText(fmtN(v)).width;
        if (tx - tw / 2 > lastR + fs * 0.25 || i === n) { text(c, fmtN(v), tx, ly + fs * 0.95, fs); lastR = tx + tw / 2; }
      }
    }
    for (const [k, nm] of Object.entries(f.mark || {})) {
      const tx = X(+k); c.fillStyle = '#dc2626'; c.beginPath(); c.arc(tx, ly, fs * 0.22, 0, 7); c.fill();
      text(c, nm, tx, ly - fs * 0.8, fs, { color: '#dc2626' });
    }
    for (const [a, b, lb] of f.hops || []) {
      const xa = X(a), xb = X(b), mid = (xa + xb) / 2, hh = Math.min(h * 0.4, Math.abs(xb - xa) * 0.5);
      c.strokeStyle = '#7c3aed'; c.lineWidth = Math.max(3, fs * 0.08);
      c.beginPath(); c.moveTo(xa, ly - fs * 0.35); c.quadraticCurveTo(mid, ly - fs * 0.35 - hh * 1.4, xb, ly - fs * 0.35); c.stroke();
      const d = Math.sign(xb - xa) || 1;
      c.beginPath(); c.moveTo(xb, ly - fs * 0.35); c.lineTo(xb - d * fs * 0.3, ly - fs * 0.7); c.moveTo(xb, ly - fs * 0.35); c.lineTo(xb - d * fs * 0.05, ly - fs * 0.85); c.stroke();
      if (lb) text(c, lb, mid, ly - fs * 0.35 - hh * 0.8, fs * 0.8, { color: '#7c3aed' });
    }
  },
  frac(c, f, x, y, w, h) {
    const n = f.n, k = f.k, fill = COLORS[f.color] || '#60a5fa';
    c.strokeStyle = INK; c.lineWidth = Math.max(3, Math.min(w, h) * 0.012);
    if (f.shape === 'circle') {
      const r = Math.min(w, h) / 2 * 0.94, cx = x + w / 2, cy = y + h / 2;
      for (let i = 0; i < n; i++) {
        const a0 = -Math.PI / 2 + (i * 2 * Math.PI) / n, a1 = a0 + (2 * Math.PI) / n;
        c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, r, a0, a1); c.closePath();
        c.fillStyle = i < k ? fill : '#fff'; c.fill(); c.stroke();
      }
      return;
    }
    const cols = f.shape === 'grid' ? (f.cols || Math.ceil(Math.sqrt(n))) : n, rows = Math.ceil(n / cols);
    const cell = Math.min(w / cols, h / rows, f.shape === 'bar' ? h * 0.7 : 1e9);
    const cw = f.shape === 'bar' ? Math.min(w / cols, cell * 2.2) : cell, ch = f.shape === 'bar' ? Math.min(h * 0.6, cw * 1.1) : cell;
    const ox = x + (w - cw * cols) / 2, oy = y + (h - ch * rows) / 2;
    for (let i = 0; i < n; i++) {
      const cx = ox + (i % cols) * cw, cy = oy + Math.floor(i / cols) * ch;
      c.fillStyle = i < k ? fill : '#fff'; c.fillRect(cx, cy, cw, ch); c.strokeRect(cx, cy, cw, ch);
    }
  },
  grid(c, f, x, y, w, h) {
    const s = f._s || Math.min(w / f.cols, h / f.rows), ox = x + (w - s * f.cols) / 2, oy = y + (h - s * f.rows) / 2;
    const base = COLORS[f.color] || '#60a5fa', cmap = { r: COLORS.red, b: COLORS.blue, g: COLORS.green, y: COLORS.yellow, o: COLORS.orange, p: COLORS.purple };
    for (let j = 0; j < f.rows; j++) for (let i = 0; i < f.cols; i++) {
      const ch = (f.fill?.[j] || '')[i] || '.';
      c.fillStyle = ch === '.' ? '#fff' : ch === '#' ? base : (cmap[ch] || base);
      c.fillRect(ox + i * s, oy + j * s, s, s);
    }
    c.strokeStyle = SOFT; c.lineWidth = Math.max(1.5, s * 0.03);
    for (let i = 0; i <= f.cols; i++) { c.beginPath(); c.moveTo(ox + i * s, oy); c.lineTo(ox + i * s, oy + s * f.rows); c.stroke(); }
    for (let j = 0; j <= f.rows; j++) { c.beginPath(); c.moveTo(ox, oy + j * s); c.lineTo(ox + s * f.cols, oy + j * s); c.stroke(); }
    // viền đậm quanh các ô được tô
    c.strokeStyle = INK; c.lineWidth = Math.max(3, s * 0.07);
    const on = (i, j) => (f.fill?.[j] || '')[i] && (f.fill[j][i] !== '.');
    for (let j = 0; j < f.rows; j++) for (let i = 0; i < f.cols; i++) if (on(i, j)) {
      const X0 = ox + i * s, Y0 = oy + j * s;
      c.beginPath();
      if (!on(i, j - 1)) { c.moveTo(X0, Y0); c.lineTo(X0 + s, Y0); }
      if (!on(i, j + 1)) { c.moveTo(X0, Y0 + s); c.lineTo(X0 + s, Y0 + s); }
      if (!on(i - 1, j)) { c.moveTo(X0, Y0); c.lineTo(X0, Y0 + s); }
      if (!on(i + 1, j)) { c.moveTo(X0 + s, Y0); c.lineTo(X0 + s, Y0 + s); }
      c.stroke();
    }
  },
  poly(c, f, x, y, w, h) {
    const P = f.pts, xs = P.map(p => p[0]), ys = P.map(p => p[1]);
    const minX = Math.min(...xs), minY = Math.min(...ys), bw = Math.max(...xs) - minX || 1, bh = Math.max(...ys) - minY || 1;
    const fs = Math.max(28, Math.min(64, Math.min(w, h) * 0.13));
    const lab = (f.sides || []).some(Boolean), nam = (f.names || []).some(Boolean);
    const mx0 = lab ? fs * 2.6 : nam ? fs * 1.2 : fs * 0.3, my0 = lab ? fs * 1.5 : nam ? fs * 1.2 : fs * 0.3;   // lề cho nhãn cạnh / tên đỉnh
    const k = Math.min((w - 2 * mx0) / bw, (h - 2 * my0) / bh), ox = x + (w - bw * k) / 2, oy = y + (h - bh * k) / 2;
    const T = ([px, py]) => [ox + (px - minX) * k, oy + (py - minY) * k];
    const Q = P.map(T);
    c.beginPath(); Q.forEach(([a, b], i) => (i ? c.lineTo(a, b) : c.moveTo(a, b))); c.closePath();
    c.fillStyle = COLORS[f.fill] ? shade(COLORS[f.fill], 0.55) : '#dbeafe'; c.fill();
    c.strokeStyle = INK; c.lineWidth = Math.max(3, fs * 0.09); c.lineJoin = 'round'; c.stroke();
    const cx = Q.reduce((s, p) => s + p[0], 0) / Q.length, cy = Q.reduce((s, p) => s + p[1], 0) / Q.length;
    for (const i of f.right || []) {
      const p = Q[i], a = Q[(i + Q.length - 1) % Q.length], b = Q[(i + 1) % Q.length], d = fs * 0.45;
      const ua = norm([a[0] - p[0], a[1] - p[1]]), ub = norm([b[0] - p[0], b[1] - p[1]]);
      c.lineWidth = Math.max(2, fs * 0.05); c.beginPath();
      c.moveTo(p[0] + ua[0] * d, p[1] + ua[1] * d); c.lineTo(p[0] + (ua[0] + ub[0]) * d, p[1] + (ua[1] + ub[1]) * d); c.lineTo(p[0] + ub[0] * d, p[1] + ub[1] * d); c.stroke();
    }
    (f.sides || []).forEach((lb, i) => {
      if (!lb) return;
      // nhãn ra phía NGOÀI cạnh (pháp tuyến của cạnh, thử điểm trong / ngoài: đúng cả hình lõm chữ L)
      const a = Q[i], b = Q[(i + 1) % Q.length], mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      let nx = b[1] - a[1], ny = -(b[0] - a[0]); const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
      if (inside(Q, mx + nx * 4, my + ny * 4)) { nx = -nx; ny = -ny; }
      c.font = FONT(fs * 0.8); const tw = c.measureText(lb).width;
      const off = fs * 0.55 + Math.abs(nx) * tw * 0.5;
      text(c, lb, mx + nx * off, my + ny * off, fs * 0.8, { color: '#1d4ed8' });
    });
    (f.names || []).forEach((nm, i) => {
      if (!nm) return;
      const p = Q[i], nx = p[0] - cx, ny = p[1] - cy, L = Math.hypot(nx, ny) || 1;
      text(c, nm, p[0] + (nx / L) * fs * 0.7, p[1] + (ny / L) * fs * 0.7, fs * 0.85, { color: INK, weight: 900 });
    });
  },
  lines(c, f, x, y, w, h) {
    const P = f.pts || {}, all = Object.values(P).concat((f.circles || []).flatMap(([cx, cy, r]) => [[cx - r, cy - r], [cx + r, cy + r]]));
    const xs = all.map(p => p[0]), ys = all.map(p => p[1]);
    // hình dẹt (các điểm thẳng hàng): cho bề kia tối thiểu 30% để không thành một đường mảnh sát mép
    const minX0 = Math.min(...xs), minY0 = Math.min(...ys), bw0 = Math.max(...xs) - minX0, bh0 = Math.max(...ys) - minY0, big = Math.max(bw0, bh0, 1);
    const bw = Math.max(bw0, big * 0.3), bh = Math.max(bh0, big * 0.3), minX = minX0 - (bw - bw0) / 2, minY = minY0 - (bh - bh0) / 2;
    const m = 0.16 * Math.max(bw, bh);
    const { k, ox, oy } = fit(x, y, w, h, bw + 2 * m, bh + 2 * m);
    const T = ([px, py]) => [ox + (px - minX + m) * k, oy + (py - minY + m) * k];
    const fs = Math.max(30, Math.min(66, Math.min(w, h) * 0.12));
    const seg = (a, b, dash) => {
      const [x1, y1] = T(P[a]), [x2, y2] = T(P[b]);
      if (f.match) {
        c.strokeStyle = '#d97706'; c.lineWidth = fs * 0.24; c.lineCap = 'round';
        const ux = (x2 - x1), uy = (y2 - y1);
        c.beginPath(); c.moveTo(x1 + ux * 0.06, y1 + uy * 0.06); c.lineTo(x2 - ux * 0.06, y2 - uy * 0.06); c.stroke();
        c.fillStyle = '#dc2626'; c.beginPath(); c.arc(x2 - ux * 0.06, y2 - uy * 0.06, fs * 0.17, 0, 7); c.fill();
        return;
      }
      c.strokeStyle = INK; c.lineWidth = Math.max(3, fs * 0.09); c.lineCap = 'round';
      c.setLineDash(dash ? [fs * 0.3, fs * 0.22] : []);
      c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke(); c.setLineDash([]);
    };
    for (const [cx, cy, r] of f.circles || []) {
      const [X, Y] = T([cx, cy]); c.strokeStyle = INK; c.lineWidth = Math.max(3, fs * 0.09);
      c.beginPath(); c.arc(X, Y, r * k, 0, 7); c.stroke();
    }
    for (const [a, b] of f.segs || []) seg(a, b, false);
    for (const [a, b] of f.dash || []) seg(a, b, true);
    if (f.match) return;
    // độ dài đoạn: lens: [['A', 'B', '3 cm']…], ghi giữa đoạn, lệch ra phía ngoài hình
    const gx = xs.reduce((s2, v) => s2 + v, 0) / xs.length, gy = ys.reduce((s2, v) => s2 + v, 0) / ys.length;
    for (const [a, b, lb] of f.lens || []) {
      if (!P[a] || !P[b]) continue;
      const [x1, y1] = T(P[a]), [x2, y2] = T(P[b]), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      let nx = -(y2 - y1), ny = x2 - x1; const L = Math.hypot(nx, ny) || 1; nx /= L; ny /= L;
      const [cx0, cy0] = T([gx, gy]); if ((mx - cx0) * nx + (my - cy0) * ny < 0) { nx = -nx; ny = -ny; }
      text(c, lb, mx + nx * fs * 0.75, my + ny * fs * 0.75, fs * 0.8, { color: '#1d4ed8' });
    }
    const cx = xs.reduce((s, v) => s + v, 0) / xs.length, cy = ys.reduce((s, v) => s + v, 0) / ys.length;
    for (const [nm, p] of Object.entries(P)) {
      if (nm.startsWith('_')) continue;            // điểm phụ (giữ khung hình): không chấm, không tên
      const [X, Y] = T(p);
      c.fillStyle = INK; c.beginPath(); c.arc(X, Y, fs * 0.12, 0, 7); c.fill();
      if (f.labels === false) continue;
      let dx = p[0] - cx, dy = p[1] - cy; const L = Math.hypot(dx, dy);
      if (L < 1e-6) { dx = 0.7; dy = -0.7; } else { dx /= L; dy /= L; }
      // các điểm thẳng hàng (ngang / dọc): tên đặt vuông góc với đường, không đè lên nét
      if (bh0 < big * 0.05) { dx = 0; dy = 1; } else if (bw0 < big * 0.05) { dx = 1; dy = 0; }
      text(c, nm, X + dx * fs * 0.75, Y + dy * fs * 0.75, fs * 0.85, { weight: 900 });
    }
  },
  angle(c, f, x, y, w, h) {
    const deg = f.deg, a = (-deg * Math.PI) / 180, co = Math.cos(a), si = Math.max(0.25, -Math.sin(a));
    const fs = Math.max(26, Math.min(w, h) * 0.12);
    // hai cạnh dài L: bề ngang từ min(0, cos)·L tới L, bề cao sin·L; chừa chỗ cho tên điểm
    const L = Math.min((w - fs * 3) / (1 - Math.min(0, co)), (h - fs * 2.6) / si);
    const cx = x + (w - L * (1 - Math.min(0, co))) / 2 - Math.min(0, co) * L, cy = y + h / 2 + (si * L) / 2;
    c.strokeStyle = INK; c.lineWidth = Math.max(3, fs * 0.12); c.lineCap = 'round';
    const pA = [cx + Math.cos(a) * L, cy + Math.sin(a) * L], pB = [cx + L, cy];
    c.beginPath(); c.moveTo(pA[0], pA[1]); c.lineTo(cx, cy); c.lineTo(pB[0], pB[1]); c.stroke();
    c.strokeStyle = '#dc2626'; c.lineWidth = Math.max(2, fs * 0.07);
    if (deg === 90) { const d = L * 0.16; c.beginPath(); c.moveTo(cx + d, cy); c.lineTo(cx + d, cy - d); c.lineTo(cx, cy - d); c.stroke(); }
    else { c.beginPath(); c.arc(cx, cy, L * 0.2, a, 0); c.stroke(); }
    const [nA, nO, nB] = f.names || [];
    if (nO) text(c, nO, cx - fs * 0.3, cy + fs * 0.75, fs, { weight: 900 });
    if (nA) text(c, nA, pA[0] + Math.cos(a) * fs * 0.8, pA[1] + Math.sin(a) * fs * 0.8, fs, { weight: 900 });
    if (nB) text(c, nB, pB[0] + fs * 0.7, pB[1], fs, { weight: 900 });
  },
  bars(c, f, x, y, w, h) {
    const n = f.values.length, max = Math.max(...f.values), step = f.step || niceStep(max);
    const top = Math.ceil(max / step) * step, fs = Math.max(22, Math.min(46, h * 0.075, (w / n) * 0.3));
    const x0 = x + fs * 2.6, x1 = x + w - fs * 0.5, y0 = y + h - fs * 1.6, y1 = y + fs * (f.unit ? 1.4 : 0.6);
    c.strokeStyle = SOFT; c.lineWidth = 2;
    for (let v = 0; v <= top; v += step) {
      const yy = y0 - (v / top) * (y0 - y1);
      c.beginPath(); c.moveTo(x0, yy); c.lineTo(x1, yy); c.stroke();
      text(c, fmtN(v), x0 - fs * 0.3, yy, fs * 0.8, { align: 'right', weight: 700 });
    }
    if (f.unit) text(c, f.unit, x0, y + fs * 0.5, fs * 0.8, { align: 'left', weight: 700, color: '#475569' });
    const bw = ((x1 - x0) / n) * 0.6, pal = ['#3b82f6', '#f97316', '#22c55e', '#a855f7', '#ec4899', '#eab308'];
    f.values.forEach((v, i) => {
      const bx = x0 + ((x1 - x0) / n) * (i + 0.2), bh = (v / top) * (y0 - y1);
      c.fillStyle = pal[i % pal.length]; c.fillRect(bx, y0 - bh, bw, bh);
      text(c, f.labels[i], bx + bw / 2, y0 + fs * 0.8, fs * 0.85, { max: (x1 - x0) / n });
    });
    c.strokeStyle = INK; c.lineWidth = 3; c.beginPath(); c.moveTo(x0, y1 - fs * 0.3); c.lineTo(x0, y0); c.lineTo(x1, y0); c.stroke();
  },
  table(c, f, x, y, w, h) {
    const rows = [f.head, ...(f.rows || [])].filter(Boolean), nc = Math.max(...rows.map(r => r.length)), nr = rows.length;
    const cw = w / nc, ch = Math.min(h / nr, cw * 0.7), oy = y + (h - ch * nr) / 2;
    const fs = Math.min(ch * 0.5, 54);
    rows.forEach((r, j) => r.forEach((v, i) => {
      const cx = x + i * cw, cy = oy + j * ch;
      c.fillStyle = j === 0 && f.head ? '#dbeafe' : '#fff'; c.fillRect(cx, cy, cw, ch);
      c.strokeStyle = '#64748b'; c.lineWidth = 2.5; c.strokeRect(cx, cy, cw, ch);
      const tok = /\p{Extended_Pictographic}/u.test(String(v));
      c.font = tok ? EMOJI_FONT(fs) : FONT(fs, j === 0 && f.head ? 900 : 700);
      fitText(c, String(v), cx + cw / 2, cy + ch / 2, cw * 0.9, fs, tok);
    }));
  },
  money(c, f, x, y, w, h) {
    const items = f.items || [], n = items.length;
    const cell = Math.min(w / n, h * 1.9), oy = y + h / 2;
    const NOTE = { 1000: '#a3a380', 2000: '#b08968', 5000: '#5b8fb9', 10000: '#c2a33e', 20000: '#3b82c4', 50000: '#d9467a', 100000: '#3f9e6a', 200000: '#c0603c', 500000: '#2aa1a8' };
    items.forEach((v, i) => {
      const cx = x + (w - cell * n) / 2 + cell * (i + 0.5);
      if (v < 1000) {               // đồng xu
        const r = Math.min(cell * 0.4, h * 0.36);
        c.fillStyle = '#e5c158'; c.strokeStyle = '#a16207'; c.lineWidth = r * 0.08;
        c.beginPath(); c.arc(cx, oy, r, 0, 7); c.fill(); c.stroke();
        text(c, v, cx, oy, r * 0.62, { color: '#5b3a07', weight: 900 });
        return;
      }
      const nw = cell * 0.9, nh = Math.min(h * 0.8, nw * 0.5);
      c.fillStyle = NOTE[v] || '#7c9a5e'; c.beginPath(); c.roundRect(cx - nw / 2, oy - nh / 2, nw, nh, nh * 0.08); c.fill();
      c.strokeStyle = 'rgba(255,255,255,.7)'; c.lineWidth = nh * 0.03; c.beginPath(); c.roundRect(cx - nw / 2 + nh * 0.07, oy - nh / 2 + nh * 0.07, nw - nh * 0.14, nh * 0.86, nh * 0.06); c.stroke();
      c.font = FONT(nh * 0.34, 900); c.fillStyle = '#fff'; c.textAlign = 'center';
      c.fillText(fmtN(v), cx, oy - nh * 0.04, nw * 0.86);
      text(c, 'đồng', cx, oy + nh * 0.28, nh * 0.16, { color: '#fff', weight: 700 });
    });
  },
  ruler(c, f, x, y, w, h) {
    const max = f.max || Math.max(f.start + f.len + 1, 10), unit = (w * 0.94) / max, x0 = x + w * 0.03;
    const ry = y + h * 0.55, rh = h * 0.38, fs = Math.max(20, Math.min(46, unit * 0.55, rh * 0.32));
    c.fillStyle = '#fde68a'; c.strokeStyle = '#a16207'; c.lineWidth = 3; c.beginPath(); c.roundRect(x0 - unit * 0.3, ry, unit * (max + 0.6), rh, 8); c.fill(); c.stroke();
    for (let i = 0; i <= max * 10; i++) {
      const tx = x0 + (i / 10) * unit, L = i % 10 === 0 ? rh * 0.4 : i % 5 === 0 ? rh * 0.28 : rh * 0.17;
      if (unit < 40 && i % 10 && i % 5) continue;
      c.strokeStyle = INK; c.lineWidth = i % 10 ? 1.5 : 3; c.beginPath(); c.moveTo(tx, ry); c.lineTo(tx, ry + L); c.stroke();
      if (i % 10 === 0) text(c, i / 10, tx, ry + rh * 0.68, fs);
    }
    const a = x0 + f.start * unit, b = x0 + (f.start + f.len) * unit, oy = ry - h * 0.2, th = h * 0.2;
    if (f.obj === 'ribbon') { c.fillStyle = '#ec4899'; c.fillRect(a, oy - th / 3, b - a, th * 0.66); }
    else if (f.obj === 'nail') {
      c.fillStyle = '#94a3b8'; c.fillRect(a, oy - th * 0.12, b - a - th * 0.4, th * 0.24);
      c.beginPath(); c.moveTo(b - th * 0.4, oy - th * 0.12); c.lineTo(b, oy); c.lineTo(b - th * 0.4, oy + th * 0.12); c.fill();
      c.fillRect(a, oy - th * 0.4, th * 0.12, th * 0.8);
    } else {
      c.fillStyle = '#facc15'; c.fillRect(a + th * 0.3, oy - th / 2, b - a - th * 1.1, th);
      c.fillStyle = '#f9a8d4'; c.fillRect(a, oy - th / 2, th * 0.3, th);
      c.fillStyle = '#fcd9b6'; c.beginPath(); c.moveTo(b - th * 0.8, oy - th / 2); c.lineTo(b, oy); c.lineTo(b - th * 0.8, oy + th / 2); c.fill();
      c.fillStyle = INK; c.beginPath(); c.moveTo(b - th * 0.25, oy - th * 0.16); c.lineTo(b, oy); c.lineTo(b - th * 0.25, oy + th * 0.16); c.fill();
    }
    c.strokeStyle = '#dc2626'; c.setLineDash([6, 6]); c.lineWidth = 2;
    for (const px of [a, b]) { c.beginPath(); c.moveTo(px, oy - th * 0.7); c.lineTo(px, ry); c.stroke(); }
    c.setLineDash([]);
  },
  balance(c, f, x, y, w, h) {
    const cx = x + w / 2, by = y + h * 0.98, top = y + h * 0.16, arm = w * 0.31, tilt = (f.tilt || 0) * 0.12;   // đĩa không ra ngoài khung (cân đặt cạnh nhau)
    c.fillStyle = '#64748b'; c.beginPath(); c.moveTo(cx - w * 0.1, by); c.lineTo(cx + w * 0.1, by); c.lineTo(cx + w * 0.02, top); c.lineTo(cx - w * 0.02, top); c.fill();
    // tilt -1 = trái nặng: đĩa trái thấp xuống (y lớn hơn), đĩa phải nâng lên
    const lx = cx - Math.cos(tilt) * arm, ly = top - Math.sin(tilt) * arm, rx = cx + Math.cos(tilt) * arm, ry2 = top + Math.sin(tilt) * arm;
    c.strokeStyle = INK; c.lineWidth = Math.max(4, h * 0.025); c.beginPath(); c.moveTo(lx, ly); c.lineTo(rx, ry2); c.stroke();
    c.fillStyle = '#f59e0b'; c.beginPath(); c.arc(cx, top, h * 0.03, 0, 7); c.fill();
    const pan = (px, py, items) => {
      const pw = w * 0.36 * 0.9, ph = h * 0.05, py2 = py + h * 0.5, py2b = py2;
      c.strokeStyle = '#475569'; c.lineWidth = 2; c.beginPath(); c.moveTo(px, py); c.lineTo(px - pw / 2, py2); c.moveTo(px, py); c.lineTo(px + pw / 2, py2); c.stroke();
      c.fillStyle = '#94a3b8'; c.beginPath(); c.ellipse(px, py2, pw / 2, ph, 0, 0, Math.PI); c.fill();
      // 3 vật trở lên: xếp hai tầng để mỗi vật vẫn to
      const n = items.length, per = n >= 3 ? Math.ceil(n / 2) : n, s = Math.min((pw * 1.05) / Math.max(1, per), h * (n >= 3 ? 0.27 : 0.4));
      items.forEach((t, i0) => {
        // hai tầng: tầng dưới per vật, tầng trên phần còn lại (đặt lên trên, lệch nửa ô)
        const up = i0 >= per, i = up ? i0 - per : i0, row = up ? n - per : per;
        const tx = px - (s * row) / 2 + s * (i + 0.5), o = parseTok(t);
        const py2 = py2b - (up ? s * 0.85 : 0);
        if (o.kind === 'text' && !/\p{Extended_Pictographic}/u.test(o.text)) {
          // quả cân có chữ ("2 kg")
          const ww = s * 0.9, hh = s * 0.7;
          c.fillStyle = '#334155'; c.beginPath(); c.moveTo(tx - ww * 0.35, py2 - hh); c.lineTo(tx + ww * 0.35, py2 - hh); c.lineTo(tx + ww / 2, py2); c.lineTo(tx - ww / 2, py2); c.fill();
          c.font = FONT(hh * 0.42, 900); c.fillStyle = '#fff'; c.textAlign = 'center'; c.fillText(o.text, tx, py2 - hh * 0.45, ww * 0.8);
        } else drawTok(c, t, tx, py2 - s * 0.45, s * 0.9);
      });
    };
    pan(lx, ly, f.left || []); pan(rx, ry2, f.right || []);
  },
  cubes(c, f, x, y, w, h) {
    // hàng từ sau ra trước; mỗi cột một chồng; chiếu xiên kiểu sách giáo khoa
    const rows = f.cols || [[1]], nr = rows.length, nc = Math.max(...rows.map(r => r.length)), maxH = Math.max(...rows.flat());
    const s = Math.min(w / (nc + nr * 0.5 + 0.4), h / (maxH + nr * 0.5 + 0.4)), dx = s * 0.5, dy = s * 0.5;
    const ox = x + (w - s * (nc + nr * 0.5)) / 2, oy = y + h - (h - s * (maxH + nr * 0.5)) / 2;
    const cube = (px, py) => {
      c.lineWidth = Math.max(1.5, s * 0.04); c.strokeStyle = INK;
      c.fillStyle = '#60a5fa'; c.fillRect(px, py - s, s, s); c.strokeRect(px, py - s, s, s);
      c.fillStyle = '#93c5fd'; c.beginPath(); c.moveTo(px, py - s); c.lineTo(px + dx, py - s - dy); c.lineTo(px + s + dx, py - s - dy); c.lineTo(px + s, py - s); c.closePath(); c.fill(); c.stroke();
      c.fillStyle = '#2563eb'; c.beginPath(); c.moveTo(px + s, py); c.lineTo(px + s + dx, py - dy); c.lineTo(px + s + dx, py - s - dy); c.lineTo(px + s, py - s); c.closePath(); c.fill(); c.stroke();
    };
    for (let j = 0; j < nr; j++) {
      const back = nr - 1 - j;   // hàng 0 ở sau cùng
      rows[j].forEach((hgt, i) => {
        for (let k = 0; k < hgt; k++) cube(ox + i * s + back * dx, oy - back * dy - k * s - (nr - 1 - back) * 0);
      });
    }
  },
  calendar(c, f, x, y, w, h) {
    const head = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'], weeks = Math.ceil((f.start + f.days) / 7);
    const titleH = f.title ? h * 0.13 : 0, cw = w / 7, ch = Math.min((h - titleH) / (weeks + 1), cw * 0.8);
    const oy = y + titleH, fs = Math.min(ch * 0.5, 44);
    if (f.title) text(c, f.title, x + w / 2, y + titleH / 2, Math.min(titleH * 0.6, 48), { color: '#1d4ed8', weight: 900 });
    head.forEach((t, i) => {
      c.fillStyle = i === 6 ? '#fecaca' : '#dbeafe'; c.fillRect(x + i * cw, oy, cw, ch);
      text(c, t, x + i * cw + cw / 2, oy + ch / 2, fs, { color: i === 6 ? '#b91c1c' : INK, weight: 900 });
    });
    const mark = new Set(f.mark || []);
    for (let d = 1; d <= f.days; d++) {
      const p = f.start + d - 1, i = p % 7, j = Math.floor(p / 7) + 1, cx = x + i * cw, cy = oy + j * ch;
      c.fillStyle = '#fff'; c.fillRect(cx, cy, cw, ch); c.strokeStyle = SOFT; c.lineWidth = 1.5; c.strokeRect(cx, cy, cw, ch);
      if (mark.has(d)) { c.strokeStyle = '#dc2626'; c.lineWidth = 4; c.beginPath(); c.arc(cx + cw / 2, cy + ch / 2, Math.min(cw, ch) * 0.42, 0, 7); c.stroke(); }
      text(c, d, cx + cw / 2, cy + ch / 2, fs * 0.9, { color: i === 6 ? '#b91c1c' : INK, weight: 700 });
    }
  },
  thermo(c, f, x, y, w, h) {
    const min = f.min ?? 0, max = f.max ?? 50, cx = x + w * 0.4, t0 = y + h * 0.05, t1 = y + h * 0.8, tw = Math.min(w * 0.22, h * 0.07);
    const Y = (v) => t1 - ((v - min) / (max - min)) * (t1 - t0);
    c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 3;
    c.beginPath(); c.roundRect(cx - tw / 2, t0 - tw / 2, tw, t1 - t0 + tw, tw / 2); c.fill(); c.stroke();
    c.beginPath(); c.arc(cx, t1 + tw * 0.9, tw * 1.05, 0, 7); c.fillStyle = '#ef4444'; c.fill(); c.stroke();
    c.fillStyle = '#ef4444'; c.fillRect(cx - tw * 0.25, Y(f.v), tw * 0.5, t1 + tw * 0.5 - Y(f.v));
    // vạch lớn 10 (hoặc 5 độ với thang hẹp), vạch nhỏ mỗi 1 độ để đọc được số lẻ (thang quá rộng thì 2 độ)
    const step = (max - min) / 10 >= 5 ? 10 : 5, minor = max - min <= 60 ? 1 : 2, fs = Math.max(18, Math.min(34, h * 0.05));
    for (let v = min; v <= max; v += minor) {
      const big = Math.abs(v % step) < 1e-9, yy = Y(v);
      c.strokeStyle = INK; c.lineWidth = big ? 3 : 1.5;
      c.beginPath(); c.moveTo(cx + tw / 2, yy); c.lineTo(cx + tw / 2 + (big ? tw * 0.8 : tw * 0.45), yy); c.stroke();
      if (big) text(c, v, cx + tw * 1.5, yy, fs, { align: 'left', weight: 700 });
    }
    text(c, '°C', cx + tw * 1.4, t0 - tw * 0.9, fs, { align: 'left', weight: 900 });
  },
  jug(c, f, x, y, w, h) {
    const items = f.items || [], n = items.length, cell = w / n;
    items.forEach((it, i) => {
      const jw = Math.min(cell * 0.62, h * 0.5), jh = h * 0.78, cx = x + cell * (i + 0.5), bot = y + h * 0.95, top = bot - jh;
      const fill = (it.v / it.cap) * jh * 0.92;
      c.fillStyle = '#7dd3fc'; c.fillRect(cx - jw / 2, bot - fill, jw, fill);
      c.strokeStyle = INK; c.lineWidth = 4; c.beginPath(); c.moveTo(cx - jw / 2, top); c.lineTo(cx - jw / 2, bot); c.lineTo(cx + jw / 2, bot); c.lineTo(cx + jw / 2, top); c.stroke();
      const marks = it.marks || (it.unit === 'ml' ? Math.min(10, it.cap / 100) : it.cap), fs = Math.max(18, Math.min(32, jh / (marks + 2)));
      for (let k = 1; k <= marks; k++) {
        const yy = bot - (k / marks) * jh * 0.92;
        c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(cx - jw / 2, yy); c.lineTo(cx - jw / 2 + jw * 0.25, yy); c.stroke();
        text(c, fmtN(Math.round((k / marks) * it.cap)), cx - jw / 2 + jw * 0.3, yy, fs, { align: 'left', weight: 700 });
      }
      if (it.unit) text(c, it.unit === 'l' ? 'lít' : it.unit, cx, top - fs * 0.8, fs * 1.1, { weight: 900 });
    });
  },
  text(c, f, x, y, w, h) {
    const lines = textLines(f);
    let fs = Math.min(110, h / (lines.length * 1.35));
    c.font = FONT(fs, 700);
    const mw = Math.max(...lines.map(l => c.measureText(l).width));
    if (mw > w * 0.94) fs *= (w * 0.94) / mw;
    const lh = fs * 1.3, oy = y + (h - lh * lines.length) / 2 + lh / 2;
    lines.forEach((l, i) => text(c, l, x + w / 2, oy + i * lh, fs, { weight: 700, color: f.color ? COLORS[f.color] : INK }));
  },
  vcalc(c, f, x, y, w, h) {
    const toks = (v, key) => String(v).split('').map((d, i) => (f.hide?.[key]?.includes(i) ? '?' : d));
    // res '?': cả hàng kết quả là các ô ? (bằng số chữ số của kết quả đúng, nếu có ghi f.len, mặc định bằng số dài nhất)
    const A = toks(f.a, 'a'), B = toks(f.b, 'b');
    const R = f.res == null ? [] : String(f.res) === '?' ? Array(f.len || Math.max(String(f.a).length, String(f.b).length)).fill('?') : toks(f.res, 'res');
    const cols = Math.max(A.length, B.length, R.length) + 1, rows = R.length ? 3 : 2;
    const s = Math.min(w / cols, h / (rows + 0.4)), ox = x + (w - s * cols) / 2 + s * 0.2, oy = y + (h - s * (rows + 0.3)) / 2;
    const put = (arr, j) => arr.forEach((d, i) => drawTok(c, d, ox + s * (cols - arr.length + i + 0.5), oy + s * (j + 0.5), s * 0.95));
    put(A, 0); put(B, 1);
    drawTok(c, f.op || '+', ox + s * 0.1, oy + s, s * 0.8);
    c.strokeStyle = INK; c.lineWidth = Math.max(3, s * 0.06); c.beginPath(); c.moveTo(ox + s * 0.3, oy + s * 2.05); c.lineTo(ox + s * cols, oy + s * 2.05); c.stroke();
    if (R.length) put(R, 2.15);
  },
};
function inside(Q, px, py) {
  let r = false;
  for (let i = 0, j = Q.length - 1; i < Q.length; j = i++) {
    const [xi, yi] = Q[i], [xj, yj] = Q[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) r = !r;
  }
  return r;
}
/** Dòng của hình `text`: dòng dài hơn 28 ký tự tự ngắt theo từ (dòng thơ ngắn giữ nguyên). */
function textLines(f) {
  const out = [];
  for (const l of f.lines || []) {
    if (l.length <= 28) { out.push(l); continue; }
    let cur = '';
    for (const w of l.split(' ')) { if (cur && (cur + ' ' + w).length > 26) { out.push(cur); cur = w; } else cur = cur ? cur + ' ' + w : w; }
    if (cur) out.push(cur);
  }
  return out;
}
function norm([a, b]) { const L = Math.hypot(a, b) || 1; return [a / L, b / L]; }
function niceStep(max) { for (const s of [1, 2, 5, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000]) if (max / s <= 8) return s; return 10000; }
function fmtN(v) {
  const s = String(v).replace('.', ',');
  return Math.abs(v) >= 10000 ? s.replace(/^(\d+)/, (m) => m.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')) : s;
}
function fitText(c, s, x, y, max, fs, emoji) {
  const w = c.measureText(s).width;
  if (w > max) c.font = emoji ? EMOJI_FONT(fs * (max / w)) : FONT(fs * (max / w), 700);
  c.fillStyle = INK; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(s, x, y);
}

/** Danh sách loại hình hợp lệ (script kiểm tra dùng). */
export const FIG_TYPES = Object.keys(DRAW);

/**
 * Canvas nhỏ cho nút phương án dạng thẻ hình ("[tri.red sq.blue]"). Trả phần tử <canvas> (DOM), vẽ trên nền trong suốt, chữ sáng.
 */
export function tokenCanvas(toks, px = 64) {
  const dpr = Math.min(2, globalThis.devicePixelRatio || 1);
  const cv = document.createElement('canvas');
  cv.width = toks.length * px * dpr; cv.height = px * dpr;
  cv.style.width = `${toks.length * px}px`; cv.style.height = `${px}px`; cv.style.verticalAlign = 'middle';
  const c = cv.getContext('2d'); c.scale(dpr, dpr);
  toks.forEach((t, i) => drawTok(c, t, px * (i + 0.5), px / 2, px * 0.92, true));
  return cv;
}

/* ---------- Câu hỏi trên màn LED (game và trang xem trước dùng chung) ---------- */
function wrap(c, s, maxW) {
  const out = []; let line = '';
  for (const w of String(s).split(' ')) {
    const t = line ? `${line} ${w}` : w;
    if (line && c.measureText(t).width > maxW) { out.push(line); line = w; } else line = t;
  }
  if (line) out.push(line);
  return out;
}
/** Chữ to nhất (≤ big) mà vẫn vừa khung (w × h); trả { fs, lines }. */
function fitLines(c, s, w, h, big = 128, small = 40) {
  let fs = big, lines;
  for (;;) {
    c.font = FONT(fs); lines = wrap(c, s, w);
    if ((lines.length * fs * 1.18 <= h && lines.every(l => c.measureText(l).width <= w)) || fs <= small) return { fs, lines };
    fs -= 4;
  }
}
function paintLines(c, { fs, lines }, cx, cy) {
  const lh = fs * 1.18;
  c.font = FONT(fs); c.textAlign = 'center'; c.textBaseline = 'alphabetic';
  c.fillStyle = '#fff'; c.shadowColor = 'rgba(0,0,0,.5)'; c.shadowBlur = 12;
  lines.forEach((l, k) => c.fillText(l, cx, cy + (k - (lines.length - 1) / 2) * lh + fs * 0.36));
  c.shadowBlur = 0;
}
/**
 * Vẽ câu hỏi `Q` (chữ + hình nếu có) vào khung (x, y, w, h) trên nền tối của màn LED.
 * Có hình: hình hẹp (tỉ lệ < 1,7) đặt bên phải, chữ bên trái; hình dài đặt dưới chữ. Không hình: chữ to giữa khung.
 */
export function drawQBody(c, Q, x, y, w, h) {
  c.save();
  if (!Q.fig) { paintLines(c, fitLines(c, Q.q, w, h), x + w / 2, y + h / 2); c.restore(); return; }
  const asp = figAspect(Q.fig), gap = 30;
  if (asp < 1.7) {
    const fw = Math.min(w * 0.55, Math.max(w * 0.34, h * asp)), tw = w - fw - gap;
    const t = fitLines(c, Q.q, tw, h, 96, 34);
    paintLines(c, t, x + tw / 2, y + h / 2);
    const fh = Math.min(h, fw / asp * 1.12);
    drawFig(c, Q.fig, x + tw + gap, y + (h - fh) / 2, fw, fh);
  } else {
    const t = fitLines(c, Q.q, w, h * 0.34, 84, 34), th = t.lines.length * t.fs * 1.18;
    paintLines(c, t, x + w / 2, y + th / 2);
    const fh = h - th - gap, fw = Math.min(w, fh * asp * 1.1);
    drawFig(c, Q.fig, x + (w - fw) / 2, y + th + gap, fw, fh);
  }
  c.restore();
}
