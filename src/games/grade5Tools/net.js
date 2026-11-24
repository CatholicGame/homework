/**
 * 📦 Hình khai triển (Toán 5 Bài 49, 50, 51): gấp, mở hình khai triển của hình lập phương, hình hộp chữ nhật, hình trụ.
 * Mỗi mặt là một đa giác trên mặt giấy, gắn với mặt cha qua một cạnh (bản lề). Gấp = xoay quanh bản lề (ghép dần
 * từ mặt gốc ra), chiếu xiên ra SVG, vẽ mặt xa trước mặt gần sau. Khi gấp, khung nhìn nghiêng dần từ nhìn thẳng
 * xuống tờ giấy sang nhìn chéo từ trên xuống, để thấy hình khối.
 *
 *   const t = createNet(host, { steps })
 *   t.set(faces)          faces từ rectNet / boxNet / cubeNet / cylNet (vẽ phẳng)
 *   await t.fold(1)       gấp (0 = phẳng, 1 = gấp xong); t.fold(0) mở ra
 *   t.state(id, 'on' | 'off' | 'glow')   'off': mặt bỏ đi (nét đứt, không tô, vd. bể không nắp)
 *   t.clash()             các mặt chồng lên nhau khi gấp xong (hình không gấp được)
 *   t.opposite(id)        mặt đối diện (gấp xong)
 *   t.flats(list, { letters }) vẽ phẳng nhiều hình khai triển cạnh nhau (A, B, C…) để chọn
 */

import { createGeo, txt, INK, sfx, tween } from './tri.js';
import { anim } from '../grade4Tools/canvas.js';

// ── Hình học 3D nhỏ ─────────────────────────────────────────────────────────────────────────────────────
const I3 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]];
const ap = (M, v) => [0, 1, 2].map(r => M[r][0] * v[0] + M[r][1] * v[1] + M[r][2] * v[2] + M[r][3]);
const apv = (M, v) => [0, 1, 2].map(r => M[r][0] * v[0] + M[r][1] * v[1] + M[r][2] * v[2]);
const mul = (A, B) => [0, 1, 2].map(r => [0, 1, 2, 3].map(c => A[r][0] * B[0][c] + A[r][1] * B[1][c] + A[r][2] * B[2][c] + (c === 3 ? A[r][3] : 0)));
/** Xoay góc th (rad) quanh trục qua điểm a, hướng u (đơn vị). */
function rotAxis(a, u, th) {
  const [x, y, z] = u, c = Math.cos(th), s = Math.sin(th), k = 1 - c;
  const R = [[c + x * x * k, x * y * k - z * s, x * z * k + y * s], [y * x * k + z * s, c + y * y * k, y * z * k - x * s], [z * x * k - y * s, z * y * k + x * s, c + z * z * k]];
  const Ra = [0, 1, 2].map(r => R[r][0] * a[0] + R[r][1] * a[1] + R[r][2] * a[2]);
  return R.map((row, r) => [...row, a[r] - Ra[r]]);
}
const centroid = (poly) => [poly.reduce((s, p) => s + p[0], 0) / poly.length, poly.reduce((s, p) => s + p[1], 0) / poly.length];

/** Ma trận của từng mặt khi gấp được e (0…1). faces đã có parent, hinge, ang, sign. */
function transforms(faces, e) {
  const M = new Map();
  const byId = new Map(faces.map(f => [f.id, f]));
  const get = (f) => {
    if (M.has(f.id)) return M.get(f.id);
    let m = I3;
    if (f.parent != null) {
      const [p, q] = f.hinge;
      const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const R = rotAxis([p[0], p[1], 0], [(q[0] - p[0]) / d, (q[1] - p[1]) / d, 0], (f.sign * f.ang * e * Math.PI) / 180);
      m = mul(get(byId.get(f.parent)), R);
    }
    M.set(f.id, m);
    return m;
  };
  faces.forEach(get);
  return M;
}
/** Chọn chiều gấp: mặt con gập về phía +z của mặt cha (cùng một mặt giấy ở trong). */
function prepare(faces) {
  for (const f of faces) {
    if (f.parent == null) continue;
    f.ang ??= 90;
    const [p, q] = f.hinge;
    const d = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const R = rotAxis([p[0], p[1], 0], [(q[0] - p[0]) / d, (q[1] - p[1]) / d, 0], (f.ang * Math.PI) / 180);
    const c = centroid(f.poly);
    f.sign = ap(R, [c[0], c[1], 0])[2] >= 0 ? 1 : -1;
  }
  return faces;
}

/** Gấp xong: tâm và pháp tuyến từng mặt (thế giới). */
export function foldInfo(faces) {
  prepare(faces);
  const M = transforms(faces, 1);
  return faces.map((f) => { const m = M.get(f.id); const c = centroid(f.poly); return { id: f.id, c: ap(m, [c[0], c[1], 0]), n: apv(m, [0, 0, 1]) }; });
}
/** Các cặp mặt chồng nhau khi gấp xong (hình không gấp được). */
export function clashes(faces) {
  const info = foldInfo(faces);
  const out = new Set();
  for (let i = 0; i < info.length; i++) for (let j = i + 1; j < info.length; j++) {
    const a = info[i].c, b = info[j].c;
    if (Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]) < 0.05) { out.add(info[i].id); out.add(info[j].id); }
  }
  return [...out];
}
/** Mặt đối diện mặt id (hình lập phương / hộp gấp đúng). */
export function oppositeFace(faces, id) {
  const info = foldInfo(faces);
  const me = info.find(x => x.id === id);
  let best = null, bd = 0;
  for (const x of info) { if (x.id === id) continue; const d = -(x.n[0] * me.n[0] + x.n[1] * me.n[1] + x.n[2] * me.n[2]); if (d > bd + 1e-6) { bd = d; best = x.id; } }
  return bd > 0.9 ? best : null;
}

// ── Dựng hình khai triển ────────────────────────────────────────────────────────────────────────────────
/**
 * Các hình chữ nhật trên giấy: [{ x, y, w, h, color, label, id }]. Nối các hình có chung một đoạn cạnh
 * (cây từ hình root), bản lề là đoạn chung đó.
 */
export function rectNet(rects, { root = 0 } = {}) {
  const faces = rects.map((r, i) => ({ ...r, id: r.id ?? i, poly: [[r.x, r.y], [r.x + r.w, r.y], [r.x + r.w, r.y + r.h], [r.x, r.y + r.h]], parent: null }));
  const shared = (a, b) => {
    const e = 1e-6;
    // cạnh dọc chung
    for (const [xa, xb] of [[a.x + a.w, b.x], [a.x, b.x + b.w]]) if (Math.abs(xa - xb) < e) {
      const y0 = Math.max(a.y, b.y), y1 = Math.min(a.y + a.h, b.y + b.h);
      if (y1 - y0 > e) return [[xa, y0], [xa, y1]];
    }
    for (const [ya, yb] of [[a.y + a.h, b.y], [a.y, b.y + b.h]]) if (Math.abs(ya - yb) < e) {
      const x0 = Math.max(a.x, b.x), x1 = Math.min(a.x + a.w, b.x + b.w);
      if (x1 - x0 > e) return [[x0, ya], [x1, ya]];
    }
    return null;
  };
  const seen = new Set([root]);
  const queue = [root];
  while (queue.length) {
    const i = queue.shift();
    rects.forEach((r, j) => {
      if (seen.has(j)) return;
      const h = shared(rects[i], r);
      if (h) { seen.add(j); queue.push(j); faces[j].parent = faces[i].id; faces[j].hinge = h; }
    });
  }
  return prepare(faces);
}

/** Ô vuông cạnh 1: cells [[cx, cy]…] (vd. hình chữ thập), root mặc định là ô có nhiều ô kề nhất. */
export function cubeNet(cells, { colors = [], labels = [], root = null } = {}) {
  const nb = (c) => cells.filter(d => Math.abs(d[0] - c[0]) + Math.abs(d[1] - c[1]) === 1).length;
  const r = root ?? cells.reduce((b, c, i) => (nb(c) > nb(cells[b]) ? i : b), 0);
  return rectNet(cells.map(([x, y], i) => ({ x, y, w: 1, h: 1, color: colors[i] || NET_COLORS[i % NET_COLORS.length], label: labels[i] || '' })), { root: r });
}

/**
 * Hộp chữ nhật dài a, rộng b, cao c như sách: hàng 4 mặt bên (rộng b, a, b, a; cao c), hai đáy a × b trên và dưới mặt bên
 * thứ hai. bad: 'sameSide' (hai đáy cùng một phía: không gấp được), 'noTop' (thiếu một đáy), 'wrongBase' (đáy sai cỡ).
 */
export function boxNet(a, b, c, { side = '#86EFAC', base = '#FDE68A', labels = true, bad = null, unit = '' } = {}) {
  /** unit: ghi độ dài cạnh đáy lên từng mặt bên ("4 m", "5 m"…). */
  const sl = (w) => (unit ? `${String(w).replace('.', ',')} ${unit}` : '');
  const r = [
    { id: 'bot', x: b, y: c, w: a, h: b, color: base, label: labels ? 'đáy' : '' },
    { id: 's0', x: 0, y: 0, w: b, h: c, color: side, label: sl(b) },
    { id: 's1', x: b, y: 0, w: a, h: c, color: side, label: sl(a) },
    { id: 's2', x: b + a, y: 0, w: b, h: c, color: side, label: sl(b) },
    { id: 's3', x: 2 * b + a, y: 0, w: a, h: c, color: side, label: sl(a) },
  ];
  if (bad === 'sameSide') r[0] = { ...r[0], x: 2 * b + a, y: -b }; // đáy dưới chuyển lên trên mặt bên thứ tư
  if (bad !== 'noTop') r.push({ id: 'top', x: b, y: -b, w: a, h: b, color: base, label: labels ? 'đáy' : '' });
  if (bad === 'wrongBase') r[r.length - 1] = { ...r[r.length - 1], h: b * 0.5, y: -b * 0.5 };
  return rectNet(r, { root: 0 });
}

/**
 * Hình trụ bán kính r, cao h: hình chữ nhật dài 2 × 3,14 × r (chia N dải để cuộn) và hai hình tròn chạm hai cạnh dài.
 * caps: 'ok' (một trên, một dưới) | 'same' (cả hai ở trên) | 'one' (một hình tròn) | 'three'.
 */
export function cylNet(r, h, { N = 24, caps = 'ok', side = '#93C5FD', cap = '#FCA5A5' } = {}) {
  const L = 2 * Math.PI * r, w = L / N, m = Math.floor(N / 2);
  const faces = [];
  for (let i = 0; i < N; i++) {
    const x0 = i * w;
    faces.push({ id: `d${i}`, strip: true, color: side, poly: [[x0, 0], [x0 + w, 0], [x0 + w, h], [x0, h]], parent: i === m ? null : i < m ? `d${i + 1}` : `d${i - 1}`,
      hinge: i < m ? [[x0 + w, 0], [x0 + w, h]] : i > m ? [[x0, 0], [x0, h]] : null, ang: 360 / N });
  }
  const circ = (cx, cy) => Array.from({ length: 28 }, (_, k) => [cx + r * Math.cos((k / 28) * 2 * Math.PI), cy + r * Math.sin((k / 28) * 2 * Math.PI)]);
  let nc = 0;
  const at = (i, top) => {
    const x0 = i * w, cx = x0 + w / 2;
    return { id: `c${nc++}`, color: cap, poly: circ(cx, top ? -r : h + r), parent: `d${i}`, hinge: top ? [[x0, 0], [x0 + w, 0]] : [[x0, h], [x0 + w, h]], ang: 90 };
  };
  if (caps === 'ok') faces.push(at(m, true), at(m, false));
  else if (caps === 'same') faces.push(at(m, true), at(Math.min(N - 1, m + Math.round(N / 2.6)), true));
  else if (caps === 'one') faces.push(at(m, true));
  else faces.push(at(m, true), at(m, false), at(Math.min(N - 1, m + Math.round(N / 2.6)), false));
  return prepare(faces);
}

export const NET_COLORS = ['#FDE68A', '#93C5FD', '#86EFAC', '#F9A8D4', '#FDBA74', '#C4B5FD'];

// ── Tấm vẽ ─────────────────────────────────────────────────────────────────────────────────────────────
export function createNet(host, { steps = 0, tilt = 58, turn = -24, bg = '#fff' } = {}) {
  const t = createGeo(host, { bg });
  const { W, H } = t;
  t.box = { x: 40, y: 30, w: W - 80, h: H - 60 };
  if (steps) {
    const side = H / W < 0.62;
    if (side) { t.box.w = W * 0.56 - 50; t.stepBox = { x: W * 0.58, y: 30, w: W * 0.4, h: H - 60 }; }
    else { const sh = Math.min(H * 0.4, steps * 66 + 20); t.box.h = H - 70 - sh; t.stepBox = { x: 40, y: H - sh - 10, w: W - 80, h: sh }; }
  }
  const g = t.L.fig;
  let faces = [], e = 0, fit = null;
  const st = new Map(); // id → trạng thái
  const al = (tilt * Math.PI) / 180, be = (turn * Math.PI) / 180;

  /** Chiếu điểm thế giới với khung nhìn nghiêng k (0 = nhìn thẳng tờ giấy, 1 = nhìn chéo). */
  const proj = (v, k) => {
    const b = be * k, a = al * k;
    const x1 = v[0] * Math.cos(b) - v[1] * Math.sin(b), y1 = v[0] * Math.sin(b) + v[1] * Math.cos(b), z1 = v[2];
    return { x: x1, y: y1 * Math.cos(a) - z1 * Math.sin(a), d: y1 * Math.sin(a) + z1 * Math.cos(a) };
  };
  const projN = (n, k) => { const p = proj(n, k); return p.d; };

  function scene(ef) {
    const M = transforms(faces, ef);
    return faces.map((f) => {
      const m = M.get(f.id);
      const P3 = f.poly.map(p => ap(m, [p[0], p[1], 0]));
      const P2 = P3.map(v => proj(v, ef));
      const c = centroid(f.poly);
      const C = proj(ap(m, [c[0], c[1], 0]), ef);
      return { f, P2, C, d: P2.reduce((s, p) => s + p.d, 0) / P2.length, nd: projN(apv(m, [0, 0, 1]), ef) };
    });
  }
  /** Khung vừa tấm vẽ cho từng mức gấp (phẳng: vừa hình khai triển; gấp xong: hình khối to hơn); fitAt(e) nội suy. */
  let fits = [];
  function computeFit() {
    fits = [];
    for (let k = 0; k <= 10; k++) {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const s of scene(k / 10)) for (const p of s.P2) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); y0 = Math.min(y0, p.y); y1 = Math.max(y1, p.y); }
      fits.push({ x0, x1, y0, y1 });
    }
    // giữa chừng: không thu nhỏ hơn mức cần cho mọi khung hình đã qua (khung gộp dần từ hai đầu)
    const fitOf = (b) => { const s = Math.min(t.box.w / (b.x1 - b.x0), t.box.h / (b.y1 - b.y0), 520); return { s, ox: t.box.x + (t.box.w - (b.x1 - b.x0) * s) / 2 - b.x0 * s, oy: t.box.y + (t.box.h - (b.y1 - b.y0) * s) / 2 - b.y0 * s }; };
    const u = (a, b) => ({ x0: Math.min(a.x0, b.x0), x1: Math.max(a.x1, b.x1), y0: Math.min(a.y0, b.y0), y1: Math.max(a.y1, b.y1) });
    const mid = fits.slice(1, 10).reduce(u, fits[5]);
    fits = { a: fitOf(fits[0]), m: fitOf(u(u(fits[0], fits[10]), mid)), b: fitOf(fits[10]) };
    fit = fitAt(e);
  }
  const lerp = (p, q, k) => ({ s: p.s + (q.s - p.s) * k, ox: p.ox + (q.ox - p.ox) * k, oy: p.oy + (q.oy - p.oy) * k });
  /** Khung ở mức gấp e: phẳng → khung giữa (gộp mọi trạng thái, không bị cắt) → gấp xong. */
  const fitAt = (ef) => (ef < 0.5 ? lerp(fits.a, fits.m, Math.min(1, ef * 2.4)) : lerp(fits.m, fits.b, Math.max(0, ef * 2.4 - 1.4)));
  const S = (p) => `${(fit.ox + p.x * fit.s).toFixed(1)},${(fit.oy + p.y * fit.s).toFixed(1)}`;

  function render() {
    fit = fitAt(e);
    const sc = scene(e).sort((p, q) => p.d - q.d);
    const fs = Math.max(26, Math.min(50, fit.s * 0.42));
    let out = '';
    for (const s of sc) {
      const k = st.get(s.f.id) || 'on';
      const strip = s.f.strip;
      const sw = strip ? 0 : 3.2;
      if (k === 'off') {
        out += `<polygon points="${s.P2.map(S).join(' ')}" fill="none" stroke="#94A3B8" stroke-width="2.6" stroke-dasharray="10 8"/>`;
        continue;
      }
      const fill = k === 'glow' ? '#FB923C' : k === 'clash' ? '#F87171' : s.f.color;
      out += `<polygon points="${s.P2.map(S).join(' ')}" fill="${fill}" fill-opacity="${k === 'dim' ? 0.35 : 0.96}" stroke="${strip ? fill : INK}" stroke-width="${strip ? 1.2 : sw}" stroke-linejoin="round"/>`;
      if (s.f.label && Math.abs(s.nd) > 0.4) {
        const p = { x: fit.ox + s.C.x * fit.s, y: fit.oy + s.C.y * fit.s };
        out += txt(p.x, p.y + fs * 0.35, s.f.label, { size: fs * Math.min(1, Math.abs(s.nd) + 0.2), color: INK });
      }
    }
    // viền hình chữ nhật mặt xung quanh của hình trụ (các dải không có viền riêng)
    if (faces.some(f => f.strip) && e < 0.02) {
      const ss = faces.filter(f => f.strip);
      const xs = ss.flatMap(f => f.poly.map(p => p[0])), ys = ss.flatMap(f => f.poly.map(p => p[1]));
      const a = proj([Math.min(...xs), Math.min(...ys), 0], 0), b = proj([Math.max(...xs), Math.max(...ys), 0], 0);
      out += `<rect x="${(fit.ox + a.x * fit.s).toFixed(1)}" y="${(fit.oy + a.y * fit.s).toFixed(1)}" width="${((b.x - a.x) * fit.s).toFixed(1)}" height="${((b.y - a.y) * fit.s).toFixed(1)}" fill="none" stroke="${INK}" stroke-width="3.2"/>`;
    }
    g.innerHTML = out;
  }

  t.set = (fs, { at = 0 } = {}) => {
    faces = fs; e = at; st.clear();
    t.L.top.innerHTML = '';
    computeFit();
    render();
    return t;
  };
  t.fold = async (to = 1, ms = 1800) => {
    const from = e;
    if (Math.abs(to - from) < 1e-3) return;
    sfx.swish();
    await tween(ms, (k) => { e = from + (to - from) * k; render(); });
    e = to;
    render();
    if (to === 1) sfx.pop(3);
  };
  t.state = (id, s) => { [].concat(id).forEach(x => st.set(x, s)); render(); };
  t.clash = () => clashes(faces);
  t.opposite = (id) => oppositeFace(faces, id);
  t.faces = () => faces;
  /** Điểm màn hình (SVG) của điểm (x, y) trên mặt phẳng giấy khi đang phẳng. */
  t.flatAt = (x, y) => ({ x: fit.ox + x * fit.s, y: fit.oy + y * fit.s });
  t.scale = () => fit.s;
  /** Mặt nhấp nháy để chú ý. */
  t.blink = async (id, n = 2) => { for (let i = 0; i < n; i++) { t.state(id, 'glow'); sfx.tap(); await new Promise(r => setTimeout(r, anim(320))); t.state(id, 'on'); await new Promise(r => setTimeout(r, anim(220))); } };

  /**
   * Vẽ phẳng nhiều hình khai triển (để chọn): list = [faces…], mỗi hình một ô có chữ A, B, C… (dọc: lưới 2 cột).
   */
  t.flats = (list, { letters = 'ABCD' } = {}) => {
    faces = []; st.clear();
    const n = list.length;
    const cols = t.port ? Math.min(2, n) : n, rows = Math.ceil(n / cols);
    const cw = t.box.w / cols, ch = t.box.h / rows;
    const fsz = Math.max(34, Math.min(56, ch * 0.14));
    let out = '';
    list.forEach((fs, i) => {
      const cx = t.box.x + (i % cols) * cw, cy = t.box.y + Math.floor(i / cols) * ch;
      const pts = fs.flatMap(f => f.poly);
      const x0 = Math.min(...pts.map(p => p[0])), x1 = Math.max(...pts.map(p => p[0])), y0 = Math.min(...pts.map(p => p[1])), y1 = Math.max(...pts.map(p => p[1]));
      const pad = 22, top = fsz * 1.3;
      const s = Math.min((cw - 2 * pad) / (x1 - x0), (ch - top - pad) / (y1 - y0));
      const ox = cx + (cw - (x1 - x0) * s) / 2 - x0 * s, oy = cy + top + (ch - top - pad - (y1 - y0) * s) / 2 - y0 * s;
      out += `<rect x="${cx + 6}" y="${cy + 6}" width="${cw - 12}" height="${ch - 12}" rx="18" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>`;
      out += txt(cx + cw / 2, cy + fsz * 1.05, letters[i], { size: fsz, color: '#1D4ED8' });
      for (const f of fs) {
        out += `<polygon points="${f.poly.map(p => `${(ox + p[0] * s).toFixed(1)},${(oy + p[1] * s).toFixed(1)}`).join(' ')}" fill="${f.color}" stroke="${f.strip ? f.color : INK}" stroke-width="${f.strip ? 1 : 2.8}" stroke-linejoin="round"/>`;
        if (f.label) { const c = centroid(f.poly); out += txt(ox + c[0] * s, oy + c[1] * s + Math.min(40, s * 0.3) * 0.35, f.label, { size: Math.max(22, Math.min(40, s * 0.3)), color: INK }); }
      }
      const ss = fs.filter(f => f.strip);
      if (ss.length) {
        const xs = ss.flatMap(f => f.poly.map(p => p[0])), ys = ss.flatMap(f => f.poly.map(p => p[1]));
        out += `<rect x="${(ox + Math.min(...xs) * s).toFixed(1)}" y="${(oy + Math.min(...ys) * s).toFixed(1)}" width="${((Math.max(...xs) - Math.min(...xs)) * s).toFixed(1)}" height="${((Math.max(...ys) - Math.min(...ys)) * s).toFixed(1)}" fill="none" stroke="${INK}" stroke-width="2.8"/>`;
      }
    });
    g.innerHTML = out;
    g.animate([{ opacity: 0 }, { opacity: 1 }], { duration: anim(350) });
  };
  return t;
}
