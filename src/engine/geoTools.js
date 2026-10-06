/**
 * Đồ dùng hình học đặt thẳng lên hình của bài (lớp phủ lớn, hình gốc nằm dưới):
 *   📐 Ê ke     q.ekePlay   kéo ê ke đặt vào một góc. Khít: ô vuông xanh ∟. Không khít: khe hở đỏ.
 *   📏 Thước    q.rulerPlay chạm một cạnh (hoặc chạm hai điểm): thước nằm lên cạnh, đọc số đo.
 *   🔢 Đếm hình q.countPlay chạm lần lượt các đỉnh: hình được tô màu, đếm +1; đếm trùng thì tên cũ nhấp nháy.
 *   🟦 Ô vuông  q.areaPlay  phủ hình bằng ô vuông 1 cm², mỗi ô tự đánh số để đếm.
 *   ∥ Chọn cặp  q.pairPlay  chạm hai cạnh: máy kéo dài cho thấy song song / cắt nhau / vuông góc; ghi các cặp tìm được.
 *
 * Hình có nhiều hình rời nhau xếp một hàng (nhìn nhỏ): lớp phủ mở với cả hàng hình, bé chạm hình nào thì
 * phóng to hình đó để đo; dải nút trên hình đổi hình / về "Tất cả" (shapesOf, ZOOM_GAIN).
 * Mở được ngay từ đầu, không chấm điểm. Bé thao tác tới đâu, kết quả điền ngay vào ô trả lời của câu
 * tới đó (cfg.fill, xem FILL bên dưới); bé vẫn sửa được, vẫn bấm Kiểm tra như thường. Câu chọn đáp án
 * thì chỉ nháy sáng đáp án hợp với kết quả, bé tự chạm. Kết quả giữ theo câu (MEMO) nên đóng rồi mở
 * lại vẫn còn.
 * Máy tắt hiệu ứng (prefers-reduced-motion): vẫn bay, chậm và êm hơn, không nảy.
 *
 * Toạ độ theo viewBox của q.img. Tên điểm 'P2' hiện là P (hai điểm cùng tên trong sách);
 * tên bắt đầu bằng '_' là điểm không có tên trong sách. Cạnh: 'AB' hoặc ['P2', 'Q'].
 *   q.ekePlay   = true (dùng points, segs của q.geoPlay) | { points, segs, tol: 4 (độ) }
 *   q.rulerPlay = { points, segs, unit: 'cm' | 'ô', per: 61.5 (đơn vị hình / 1 cm hay 1 ô), free }
 *                 không có points: lấy points, segs của q.geoPlay
 *                 free: chạm hai điểm bất kì cũng đo được (mặc định: hai điểm phải cùng nằm trên một cạnh)
 *   q.countPlay = { points, kinds: { 'tam giác': ['ABI', …], 'tứ giác': ['ABCI', …] } }
 *                 mọi hình cần đếm, tên theo thứ tự đi vòng quanh hình (để tô màu)
 *   q.pairPlay  = { kinds: ['song song', 'vuông góc', 'cắt nhau'], fill } (points, segs lấy của q.geoPlay)
 *   q.areaPlay  = { cell: 30, origin: [14, 14], map: ['AA..B', …] (mỗi chữ là một ô của hình đó),
 *                   names: { A: 'Hình A' }, unit: 'cm²' | 'ô vuông' }
 */

const NS = 'http://www.w3.org/2000/svg';
const INK = '#1E293B';
const TOOLS = [
  { id: 'eke', key: 'ekePlay', icon: '📐', label: 'Ê ke' },
  { id: 'ruler', key: 'rulerPlay', icon: '📏', label: 'Thước' },
  { id: 'count', key: 'countPlay', icon: '🔢', label: 'Đếm hình' },
  { id: 'area', key: 'areaPlay', icon: '🟦', label: 'Ô vuông' },
  { id: 'pairs', key: 'pairPlay', icon: '∥', label: 'Chọn cặp' },
];
const PALETTE = ['#2563EB', '#F97316', '#16A34A', '#A855F7', '#DB2777', '#0891B2', '#CA8A04', '#DC2626'];

/** Các công cụ của câu (cho danh sách câu hỏi: icon + tên). */
export const geoToolsOf = (q) => TOOLS.filter((t) => q[t.key]);

const calm = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const len = (a) => Math.hypot(a[0], a[1]);
const cross = (a, b) => a[0] * b[1] - a[1] * b[0];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const dir = (t) => [Math.cos(t), Math.sin(t)];
const angDiff = (a, b) => { let d = (a - b) % (2 * Math.PI); if (d > Math.PI) d -= 2 * Math.PI; if (d <= -Math.PI) d += 2 * Math.PI; return d; };
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
const easeOutBack = (t) => 1 + 2.2 * (t - 1) ** 3 + 1.2 * (t - 1) ** 2;
const ends = (s) => (Array.isArray(s) ? s : [s[0], s.slice(1)]);
const shown = (n) => n.replace(/\d+$/, '');
const hidden = (n) => n.startsWith('_');
const polyPts = (name, P) => (Array.isArray(name) ? name : [...name]).map((n) => P[n]);

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  if (parent) parent.appendChild(e);
  return e;
}

function inPoly(p, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
const centroid = (poly) => mul(poly.reduce((s, p) => add(s, p), [0, 0]), 1 / poly.length);

// ── âm thanh ngắn (Web Audio) ───────────────────────────────────────────────
let actx = null;
function audio() {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    if (actx.state === 'suspended') actx.resume();
    return actx;
  } catch { return null; }
}
function tone(freqs, { type = 'sine', gap = 0.09, dur = 0.22, vol = 0.18 } = {}) {
  const ctx = audio();
  if (!ctx) return;
  freqs.forEach((f, i) => {
    const t = ctx.currentTime + i * gap;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f, t);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + dur + 0.02);
  });
}
const soundFit = () => tone([660, 880, 1320], { gap: 0.08 });
const soundGap = () => tone([220, 180], { type: 'triangle', gap: 0.12, dur: 0.18, vol: 0.14 });
const soundTick = (n = 0) => tone([520 + (n % 8) * 40], { type: 'triangle', dur: 0.08, vol: 0.12 });
const soundDone = () => tone([523, 659, 784, 1046], { gap: 0.1, dur: 0.3 });

// ── nút dưới hình ───────────────────────────────────────────────────────────
export function attachGeoTools(root, q) {
  const img = root.querySelector('.e3-question-card > .e3-q-img');
  const tools = geoToolsOf(q);
  if (!img || !tools.length) return;
  injectStyles();
  const row = document.createElement('div');
  row.className = 'gt-row';
  tools.forEach((t) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'gt-open';
    b.textContent = `${t.icon} ${t.label}`;
    b.onclick = () => openGeoTools(q, t.id, (vals) => fillBlanks(root, vals));
    row.appendChild(b);
  });
  // Sau hình, sau nút "📷 Ảnh gốc" (lightbox.js) và nút "📐 Kéo dài" (geoPlay.js) nếu có.
  let at = img;
  while (at.nextElementSibling?.matches('.e3-orig-toggle, .gp-open, .cp-open')) at = at.nextElementSibling;
  at.after(row);
  // nút "↔️ Kéo dài" (geoPlay.js) đứng cùng hàng
  const gp = img.parentElement.querySelector(':scope > .gp-open');
  if (gp) { gp.classList.add('gt-in-row'); row.prepend(gp); }
}

// ── kết quả của đồ dùng → ô trả lời ─────────────────────────────────────────
// Kết quả bé làm được, giữ theo câu: MEMO.get(q)[id công cụ] (các Map / mảng bên trong từng công cụ).
const MEMO = new WeakMap();
function memoOf(q, id) {
  let m = MEMO.get(q);
  if (!m) MEMO.set(q, (m = {}));
  return (m[id] ||= {});
}

/**
 * Ghi kết quả vào ô trả lời. vals: { số thứ tự ô trống: chữ | [chữ cho từng chỗ trống của ô], '#choice': i }.
 * Ô Đ/S: bấm nút Đ/S. Câu chọn đáp án: chỉ nháy sáng đáp án i. Trả về các ô vừa đổi.
 */
export function fillBlanks(root, vals) {
  const changed = [];
  Object.entries(vals).forEach(([idx, v]) => {
    if (idx === '#choice') {
      const opts = [...root.querySelectorAll('.e3-option')];
      if (!opts[v] || opts.some((o) => o.disabled)) return;
      opts.forEach((o, i) => o.classList.toggle('gt-suggest', i === v));
      changed.push(opts[v]);
      return;
    }
    const inputs = [...root.querySelectorAll(`.e3-blank-input[data-idx="${idx}"]`)];
    if (!inputs.length || inputs.some((i) => i.disabled)) return;
    const list = Array.isArray(v) ? v : inputs.length > 1 ? String(v).split(/\s*,\s*/) : [v];
    inputs.forEach((inp, i) => {
      const val = list[i];
      if (val == null || val === '' || inp.value === val) return;
      if (inp.classList.contains('gw-ds-input')) inp.parentElement.querySelector(`.gw-ds-btn[data-v="${val}"]`)?.click();
      else { inp.value = val; inp.dispatchEvent(new Event('input', { bubbles: true })); }
      changed.push(inp);
    });
  });
  return changed;
}

const near = (x, y) => Math.abs(x - y) < 0.06;
const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();

/**
 * cfg.fill của từng công cụ: một quy tắc hoặc mảng quy tắc (blank = số thứ tự ô trống, từ 0).
 *   ê ke  { blank, count: 'right' | 'notRight', at? }          số góc (vuông / không vuông, ở đỉnh at)
 *         { blanks: [..], list: 'right' | 'notRight', as: 'angle' | 'sides', at? }
 *                                                             mỗi góc một ô: 'A','AB','AC' hoặc 'OA','OB'
 *         { blank, list, as: 'pairs', within?, exclude? }     mọi cặp cạnh vào một ô: AB, BC, CD, DA…
 *         { blank, list: 'right', line: 'DH' }                các cạnh vuông góc với đường DH
 *         { blank, angle: 'IHK' | ['HAB', 'HAC'], yes: 'Có', no: 'Không' }  góc đỉnh I, hai cạnh hướng về H, K
 *         { rects: ['ABCD', …], options: [1, 2, 3, 4] }      nháy đáp án số hình chữ nhật (khi hình nào cũng đã rõ)
 *         số n: { blank: n, count: 'right' }
 *   thước { blank, mid: 'B', of: 'AC', yes: 'Đ', no: 'S' }    B có là trung điểm AC
 *         { blank, midOf: 'DC' }                              tên trung điểm của DC
 *         { blank, midsAt: 'O', of: ['AC', 'BD'] }            các đoạn có trung điểm O
 *         { blank, allMid: [['A','O','C'], …], yes, no }      O là trung điểm của mọi đoạn
 *         { blank, len: [['B','I'], …], equals?: 5, yes, no } độ dài một cạnh (hoặc Đ/S so với equals)
 *         { choice: [[i, [['A','M','B'], …]], …] }            nháy đáp án i khi mọi M là trung điểm
 *   đếm   { 'tam giác': 0, 'tứ giác': 1 }                     tên các hình đã đếm, theo thứ tự bé đếm
 *   ô vuông { blank, shape: 'A', input? }                     số ô vuông khi hình A đã phủ kín
 *         { blank, compare: ['A', 'B'], values: [lớn hơn, bé hơn, bằng] }
 *         { choice: 'V', options: [10, 12, 11] }              nháy đáp án có số ô của hình V
 *   chọn cặp { blank, kind: 'song song', within?, exclude?: [['AB', 'DC']] }  mọi cặp vào một ô: AD, BC, …
 *         { blanks: [1, 2], kind }                           mỗi cặp một ô
 *         { blank, kind, with: 'BE' }                         các cạnh cùng cặp với BE
 *         { blank, kind, pair: ['AB', 'AD'], yes: 'Đ', no: 'S', neg? }  cặp này có đúng loại không (neg: hỏi "không …")
 *         { blank, kind, all: [['PQ', 'SR'], ['PS', 'QR']], yes, no }
 */
function fillsOf(q) {
  const vals = {};
  const put = (blank, v, input) => {
    if (v == null || v === '' || (Array.isArray(v) && !v.length)) return;
    if (input == null) {
      // hai công cụ cùng điền một ô danh sách (vd. ê ke và chọn cặp): giữ danh sách dài hơn
      if (Array.isArray(v) && Array.isArray(vals[blank]) && vals[blank].length >= v.length) return;
      vals[blank] = v;
      return;
    }
    const a = Array.isArray(vals[blank]) ? vals[blank] : [];
    a[input] = v;
    vals[blank] = a;
  };
  const M = MEMO.get(q) || {};
  geoToolsOf(q).forEach((t) => {
    const cfg = cfgOf(q, t);
    const m = M[t.id];
    if (!m || cfg.fill == null) return;
    const rules = typeof cfg.fill === 'number' ? [{ blank: cfg.fill, count: 'right' }]
      : Array.isArray(cfg.fill) ? cfg.fill
        : t.id === 'count' ? Object.entries(cfg.fill).map(([kind, blank]) => ({ blank, kind })) : [cfg.fill];
    rules.forEach((r) => FILL[t.id](r, m, cfg, put));
  });
  return vals;
}

const FILL = {
  eke(r, m, cfg, put) {
    const P = cfg.points;
    const items = (list) => [...(m[list === 'notRight' ? 'notRight' : 'right']?.values() || [])];
    let xs = items(r.list || r.count || 'right');
    if (r.at) xs = xs.filter((x) => x.v === r.at);
    if (r.within) xs = xs.filter((x) => [x.v, x.a, x.b].every((n) => r.within.includes(shown(n))));
    if (r.exclude) xs = xs.filter((x) => !r.exclude.includes(x.v));
    const side = (x, e) => `${shown(x.v)}${shown(e)}`;
    if (r.count) { if (xs.length) put(r.blank, String(xs.length)); return; }
    // góc 'IHK': đỉnh I, hai cạnh hướng về H, K (so theo hướng: đầu tia có thể là điểm khác trên cạnh đó)
    const isAngle = (name) => {
      const [v, e1, e2] = [...name];
      const ang = (e) => Math.atan2(P[e][1] - P[v][1], P[e][0] - P[v][0]);
      const want = [ang(e1), ang(e2)];
      return (x) => x.v === v && want.every((w) => [x.a1, x.a2].some((a) => Math.abs(angDiff(a, w)) < 0.03));
    };
    if (r.angle) {
      const tests = [].concat(r.angle).map(isAngle);
      if (tests.some((t) => items('right').some(t))) put(r.blank, r.yes ?? 'Có');
      else if (tests.some((t) => items('notRight').some(t))) put(r.blank, r.no ?? 'Không');
      return;
    }
    if (r.rects) {
      // đếm hình chữ nhật: hình nào cũng đã rõ (đủ 4 góc vuông, hoặc có một góc không vuông)
      const corners = (sh) => [...sh].map((v, i) => `${v}${sh[(i + 3) % 4]}${sh[(i + 1) % 4]}`);
      const state = r.rects.map((sh) => (corners(sh).some((c) => items('notRight').some(isAngle(c))) ? 0
        : corners(sh).every((c) => items('right').some(isAngle(c))) ? 1 : null));
      if (state.includes(null)) return;
      const i = r.options.indexOf(state.reduce((a, b) => a + b, 0));
      if (i >= 0) put('#choice', i);
      return;
    }
    if (r.line) {
      // cạnh còn lại của mỗi góc vuông có một cạnh nằm trên đường r.line
      const [a, b] = ends(r.line);
      const d = Math.atan2(P[b][1] - P[a][1], P[b][0] - P[a][0]);
      const onLine = (x) => Math.abs(cross(sub(P[b], P[a]), sub(P[x.v], P[a]))) / len(sub(P[b], P[a])) < 2;
      const along = (t) => Math.abs(Math.sin(angDiff(t, d))) < 0.03;
      const out = [];
      xs.filter(onLine).forEach((x) => {
        const other = along(x.a1) ? x.b : along(x.a2) ? x.a : null;
        if (other && !out.some((o) => sameSet([...o], [...side(x, other)]))) out.push(side(x, other));
      });
      put(r.blank, out);
      return;
    }
    if (r.as === 'pairs') { put(r.blank, xs.flatMap((x) => [side(x, x.a), side(x, x.b)])); return; }
    const fmt = (x) => (r.as === 'sides' ? [side(x, x.a), side(x, x.b)] : [shown(x.v), side(x, x.a), side(x, x.b)]);
    xs.slice(0, r.blanks.length).forEach((x, i) => put(r.blanks[i], fmt(x)));
  },

  ruler(r, m, cfg, put) {
    const P = cfg.points;
    const get = (a, b) => m.len?.get([a, b].sort().join('|'))?.v;
    const midOk = (a, o, c) => { const x = get(a, o), y = get(o, c); return x == null || y == null ? null : near(x, y); };
    const yes = r.yes ?? 'Đ', no = r.no ?? 'S';
    if (r.mid) {
      const [a, c] = ends(r.of);
      const ok = midOk(a, r.mid, c);
      if (ok != null) put(r.blank, ok ? yes : no);
    } else if (r.midOf) {
      const [a, c] = ends(r.midOf);
      const ac = sub(P[c], P[a]);
      const X = Object.keys(P).find((n) => n !== a && n !== c && midOk(a, n, c)
        && Math.abs(cross(ac, sub(P[n], P[a]))) / len(ac) < 2);
      if (X) put(r.blank, shown(X));
    } else if (r.midsAt) {
      put(r.blank, r.of.filter((sg) => { const [a, c] = ends(sg); return midOk(a, r.midsAt, c); }));
    } else if (r.allMid) {
      const res = r.allMid.map(([a, o, c]) => midOk(a, o, c));
      if (res.includes(false)) put(r.blank, no);
      else if (res.every(Boolean)) put(r.blank, yes);
    } else if (r.len) {
      const v = r.len.map(([a, b]) => get(a, b)).find((x) => x != null);
      if (v == null) return;
      if (r.equals != null) put(r.blank, near(v, r.equals) ? yes : no);
      else if (near(v, Math.round(v))) put(r.blank, String(Math.round(v)));
    } else if (r.choice) {
      const hit = r.choice.find(([, triples]) => triples.every(([a, o, c]) => midOk(a, o, c)));
      if (hit) put('#choice', hit[0]);
    }
  },

  count(r, m, cfg, put) {
    const i = Object.keys(cfg.kinds).indexOf(r.kind);
    const names = (m.found?.[i] || []).map((x) => shown(x.name));
    if (names.length) put(r.blank, names.join(', '));
  },

  pairs(r, m, cfg, put) {
    const kinds = cfg.kinds || ['song song'];
    const k = kinds.indexOf(r.kind ?? kinds[0]);
    let ps = (m.found?.[k] || []).map((x) => [x.a, x.b]);
    const not = m.not?.[k] || [];
    const has = (a, b) => ps.some(([x, y]) => pairKey(x, y) === pairKey(a, b));
    const yes = r.yes ?? 'Đ', no = r.no ?? 'S';
    if (r.pair) {
      const t = has(...r.pair) ? true : not.includes(pairKey(...r.pair)) ? false : null;
      if (t != null) put(r.blank, t !== !!r.neg ? yes : no);
      return;
    }
    if (r.all) {
      if (r.all.some(([a, b]) => not.includes(pairKey(a, b)))) put(r.blank, no);
      else if (r.all.every(([a, b]) => has(a, b))) put(r.blank, yes);
      return;
    }
    if (r.within) ps = ps.filter((p) => [...p.join('')].every((c) => r.within.includes(c)));
    if (r.exclude) ps = ps.filter(([a, b]) => !r.exclude.some(([x, y]) => pairKey(x, y) === pairKey(a, b)));
    if (r.with) {
      const w = segKey(r.with);
      put(r.blank, ps.filter((p) => p.map(segKey).includes(w)).map((p) => p.find((x) => segKey(x) !== w)));
    } else if (r.blanks) ps.slice(0, r.blanks.length).forEach((p, i) => put(r.blanks[i], p));
    else put(r.blank, ps.flat());
  },

  area(r, m, cfg, put) {
    const full = (id) => (m.order?.[id] && m.order[id].length === m.total?.[id] ? m.total[id] : null);
    if (r.shape) {
      const n = full(r.shape);
      if (n != null) put(r.blank, String(n), r.input);
    } else if (r.compare) {
      const [a, b] = r.compare.map(full);
      if (a != null && b != null) put(r.blank, a > b ? r.values[0] : a < b ? r.values[1] : r.values[2]);
    } else if (r.choice) {
      const n = full(r.choice);
      const i = n == null ? -1 : r.options.indexOf(n);
      if (i >= 0) put('#choice', i);
    }
  },
};


// true: dùng điểm, cạnh của q.geoPlay; { unit, per } không có points: q.geoPlay + các khoá đó.
const cfgOf = (q, t) => {
  const v = q[t.key];
  if (v.points) return v;
  // chỉ lấy hình (điểm, cạnh) của Kéo dài: "fill" bên đó là đa giác tô nền, không phải quy tắc điền
  const { points, segs } = q.geoPlay;
  return v === true ? { points, segs } : { points, segs, ...v };
};

export async function figureBox(src) {
  try {
    const txt = await (await fetch(src)).text();
    const vb = txt.match(/viewBox="([^"]+)"/)?.[1]?.trim().split(/[\s,]+/).map(Number);
    if (vb?.length === 4 && vb[2] > 0) return { x: vb[0], y: vb[1], w: vb[2], h: vb[3] };
  } catch { /* hình không đọc được: lấy cỡ ảnh */ }
  const im = new Image();
  im.src = src;
  await im.decode().catch(() => {});
  return { x: 0, y: 0, w: im.naturalWidth || 400, h: im.naturalHeight || 300 };
}

// ── lớp phủ ─────────────────────────────────────────────────────────────────
export function openGeoTools(q, first, onApply) {
  injectStyles();
  const tools = geoToolsOf(q);
  const overlay = document.createElement('div');
  overlay.className = 'gt-overlay';
  overlay.innerHTML = `
    <div class="gt-panel" role="dialog" aria-label="Đồ dùng hình học">
      <div class="gt-head">
        <div class="gt-tabs">${tools.map((t) => `<button type="button" class="gt-tab" data-t="${t.id}">${t.icon} ${t.label}</button>`).join('')}</div>
        <button type="button" class="gt-close">✓ Xong</button>
      </div>
      <div class="gt-how" aria-hidden="true"></div>
      <div class="gt-shapes" hidden></div>
      <div class="gt-stage">
        <svg class="gt-svg" preserveAspectRatio="xMidYMid meet"></svg>
        <div class="gt-verdict">&nbsp;</div>
      </div>
      <div class="gt-bar"></div>
    </div>`;
  document.body.appendChild(overlay);
  const svg = overlay.querySelector('.gt-svg');
  const verdict = overlay.querySelector('.gt-verdict');
  const how = overlay.querySelector('.gt-how');
  const bar = overlay.querySelector('.gt-bar');
  const strip = overlay.querySelector('.gt-shapes');
  let mounted = null;
  let box = null;
  let shapes = null; // các hình rời nhau (khi phóng to từng hình có ích), null: xem cả hình
  let focus = null;  // hình đang phóng to (chỉ số trong shapes), null: cả hàng hình
  let cur = first;   // công cụ đang mở
  const filled = new Set(); // ô vừa được điền trong lần mở này: nháy khi đóng
  let raf = 0;

  const close = () => {
    cancelAnimationFrame(raf);
    mounted?.destroy?.();
    overlay.remove();
    document.removeEventListener('keydown', onKey);
    filled.forEach((e) => { e.classList.remove('gt-filled'); void e.offsetWidth; e.classList.add('gt-filled'); });
  };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
  overlay.querySelector('.gt-close').onclick = close;
  // bé vừa làm được thêm: điền lại các ô theo kết quả mới
  const changed = () => { (onApply?.(fillsOf(q)) || []).forEach((e) => filled.add(e)); };
  overlay.querySelectorAll('.gt-tab').forEach((b) => { b.onclick = () => show(b.dataset.t); });

  const say = (html, cls = '') => {
    verdict.className = `gt-verdict${html ? ' gt-show' : ''} ${cls}`;
    verdict.innerHTML = `<span>${html || '&nbsp;'}</span>`; // một khối chữ: căn giữa được trong bảng đếm
  };
  const ppu = () => svg.getScreenCTM()?.a || 1;
  const toSvg = (e) => {
    const m = svg.getScreenCTM().inverse();
    return [m.a * e.clientX + m.c * e.clientY + m.e, m.b * e.clientX + m.d * e.clientY + m.f];
  };
  // vùng thật sự nhìn thấy (viewBox "meet" nên rộng hơn hình theo một chiều)
  const view = () => {
    const r = svg.getBoundingClientRect();
    const [x, y] = toSvg({ clientX: r.left, clientY: r.top });
    const k = 1 / ppu();
    return { x, y, w: r.width * k, h: r.height * k, pxW: r.width, pxH: r.height };
  };
  // hoạt ảnh nhỏ: f(t) với t chạy 0 → 1 trong ms mili giây
  // (hoạt ảnh trước chưa xong mà bé đã chạm tiếp: cho nó tới đích luôn, không mất kết quả)
  let pending = null;
  const flush = () => {
    cancelAnimationFrame(raf);
    if (pending) { const p = pending; pending = null; p.f(1); p.done?.(); }
  };
  overlay.__flush = flush; // trang thử: cho hoạt ảnh đang chạy tới đích ngay
  overlay.__pickShape = (k) => pick(k); // trang thử: phóng to hình k (null: cả hàng)
  const animate = (ms, f, done) => {
    flush();
    const t0 = performance.now();
    const me = { f, done };
    pending = me;
    const step = () => {
      const t = Math.min(1, (performance.now() - t0) / ms);
      f(t);
      if (t < 1) raf = requestAnimationFrame(step);
      else if (pending === me) { pending = null; done?.(); }
    };
    raf = requestAnimationFrame(step);
  };

  const vbOf = (R, k) => {
    const pad = Math.max(R.w, R.h) * k;
    return [R.x - pad, R.y - pad, R.w + 2 * pad, R.h + 2 * pad];
  };
  function paintStrip() {
    if (!shapes) return;
    strip.innerHTML = `<button type="button" class="gt-shape-btn${focus == null ? ' gt-on' : ''}" data-k="all">🔍 Tất cả</button>`
      + shapes.map((sh, k) => `<button type="button" class="gt-shape-btn${focus === k ? ' gt-on' : ''}" data-k="${k}">${sh.label}</button>`).join('');
    strip.querySelectorAll('.gt-shape-btn').forEach((b) => { b.onclick = () => pick(b.dataset.k === 'all' ? null : +b.dataset.k); });
  }
  function pick(k) {
    if (k === focus) return;
    focus = k;
    paintStrip();
    show(cur, { zoom: true });
  }

  function show(id, { zoom = false } = {}) {
    cancelAnimationFrame(raf);
    pending = null;
    mounted?.destroy?.();
    mounted = null;
    cur = id;
    overlay.querySelectorAll('.gt-tab').forEach((b) => b.classList.toggle('gt-on', b.dataset.t === id));
    overlay.querySelector('.gt-tabs').classList.toggle('gt-single', tools.length < 2);
    const t = tools.find((x) => x.id === id) || tools[0];
    const sh = shapes && t.id !== 'area' ? shapes : null;
    const R = sh && focus != null ? sh[focus].r : box;
    const prevVB = svg.getAttribute('viewBox')?.split(/\s+/).map(Number);
    const target = vbOf(R, sh && focus != null ? 0.1 : 0.07);
    svg.replaceChildren();
    svg.setAttribute('viewBox', target.join(' '));
    const image = el('image', { href: q.img, x: box.x, y: box.y, width: box.w, height: box.h, preserveAspectRatio: 'none' }, svg);
    if (R !== box) {
      // chỉ hiện hình đang đo (hình bên cạnh không lấn vào khung)
      const clip = el('clipPath', { id: 'gt-clip' }, el('defs', {}, svg));
      el('rect', { x: R.x, y: R.y, width: R.w, height: R.h }, clip);
      image.setAttribute('clip-path', 'url(#gt-clip)');
    }
    const L = { under: el('g', {}, svg), marks: el('g', {}, svg), tool: el('g', {}, svg), top: el('g', {}, svg) };
    bar.replaceChildren();
    bar.className = `gt-bar gt-bar-${t.id}`;
    say('');
    const mount = () => {
      if (sh && focus == null) { mountPicker(); return; }
      const ctx = { svg, L, cfg: sh ? onlyShape(cfgOf(q, t), sh[focus]) : cfgOf(q, t), box: R, bar, how, say, ppu, toSvg, view, animate, flush, quiet: calm(), overlay, memo: memoOf(q, t.id), changed };
      mounted = { eke: mountEke, ruler: mountRuler, count: mountCount, area: mountArea, pairs: mountPairs }[t.id](ctx);
    };
    // phóng to / thu nhỏ: khung nhìn bay êm tới hình mới rồi mới dựng công cụ (công cụ vẽ theo px màn hình)
    if (zoom && prevVB?.length === 4) {
      svg.setAttribute('viewBox', prevVB.join(' '));
      animate(calm() ? 420 : 380, (u) => {
        const e = easeInOut(u);
        svg.setAttribute('viewBox', prevVB.map((v, i) => v + (target[i] - v) * e).join(' '));
      }, mount);
    } else mount();

    // cả hàng hình: mỗi hình là một vùng chạm có khung nét đứt và kính lúp
    function mountPicker() {
      how.innerHTML = '<span>👆 Chạm vào hình muốn đo, hình sẽ <b>phóng to</b>.</span>';
      bar.innerHTML = '<span class="gt-found-lbl">Chọn một hình để bắt đầu</span>';
      const k = 1 / ppu();
      sh.forEach((x, i) => {
        const g = el('g', { class: 'gt-shape-hit', 'data-k': i }, L.top);
        el('rect', { x: x.r.x, y: x.r.y, width: x.r.w, height: x.r.h, rx: 14 * k }, g);
        const tag = screenAt({ ppu }, [x.r.x + x.r.w / 2, x.r.y + x.r.h], g);
        el('circle', { r: 17, cy: 0, class: 'gt-shape-tag' }, tag);
        el('text', { y: 7, class: 'gt-shape-tagtext' }, tag).textContent = '🔍';
        g.addEventListener('click', () => pick(i));
      });
    }
  }

  figureBox(q.img).then((b) => {
    box = b;
    // đợi lớp phủ có kích thước rồi mới dựng (ê ke, chữ vẽ theo px màn hình)
    requestAnimationFrame(() => {
      shapes = shapesOf(q, tools, box, svg.parentElement.getBoundingClientRect());
      if (shapes) { strip.hidden = false; paintStrip(); }
      // dải nút vừa hiện làm khung hình thấp đi: đợi thêm một khung rồi mới dựng
      requestAnimationFrame(() => show(first));
    });
  });
  return overlay;
}

// ── hình rời nhau: phóng to từng hình ──────────────────────────────────────
// Phóng to từng hình chỉ khi mỗi hình to lên ít nhất ZOOM_GAIN lần so với khi xem cả hàng.
const ZOOM_GAIN = 1.5;

/**
 * Các hình rời nhau của câu (nhóm điểm nối với nhau bằng cạnh), xếp trái → phải, trên → dưới:
 * [{ names, label: 'ABCD', r: { x, y, w, h } (khung hình + lề cho chữ tên đỉnh) }]. null nếu chỉ có một hình
 * hoặc hình đã đủ to (xem cả hàng là được).
 */
function shapesOf(q, tools, box, stage) {
  const t = tools.find((x) => x.id !== 'area' && cfgOf(q, x).points);
  if (!t || !stage.width) return null;
  const cfg = cfgOf(q, t);
  const P = cfg.points;
  const names = Object.keys(P);
  const up = Object.fromEntries(names.map((n) => [n, n]));
  const root = (n) => (up[n] === n ? n : (up[n] = root(up[n])));
  const join = (a, b) => { if (P[a] && P[b]) up[root(a)] = root(b); };
  (cfg.segs || q.geoPlay?.segs || []).forEach((sg) => join(...ends(sg)));
  Object.values(cfg.kinds || {}).flat().forEach((poly) => {
    const v = Array.isArray(poly) ? poly : [...poly];
    v.forEach((n, i) => join(n, v[(i + 1) % v.length]));
  });
  const groups = {};
  names.forEach((n) => { (groups[root(n)] ||= []).push(n); });
  const bb = (ns) => {
    const xs = ns.map((n) => P[n][0]), ys = ns.map((n) => P[n][1]);
    return { x: Math.min(...xs), y: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
  };
  // điểm lẻ (không nối cạnh nào) hoặc hai nhóm chồng lên nhau: gộp vào nhóm có khung chứa nó
  let list = Object.values(groups).map((ns) => ({ names: ns, b: bb(ns) }));
  const overlap = (a, b) => a.x <= b.x + b.w && b.x <= a.x + a.w && a.y <= b.y + b.h && b.y <= a.y + a.h;
  for (let merged = true; merged;) {
    merged = false;
    outer: for (let i = 0; i < list.length; i++) {
      for (let j = i + 1; j < list.length; j++) {
        if (overlap(list[i].b, list[j].b)) {
          const ns = [...list[i].names, ...list[j].names];
          list.splice(j, 1);
          list[i] = { names: ns, b: bb(ns) };
          merged = true;
          break outer;
        }
      }
    }
  }
  list = list.filter((x) => x.names.length >= 2);
  if (list.length < 2) return null;
  const S = Math.max(box.w, box.h);
  list.forEach((x) => {
    const m = Math.max(S * 0.025, Math.max(x.b.w, x.b.h) * 0.16);
    x.r = { x: x.b.x - m, y: x.b.y - m, w: x.b.w + 2 * m, h: x.b.h + 2 * m };
    x.label = x.names.filter((n) => !hidden(n)).map(shown).sort((a, b) => P_ORDER(P, a, b, x.names)).join('') || '•';
  });
  list.sort((a, b) => (Math.abs(a.b.y - b.b.y) > S * 0.15 ? a.b.y - b.b.y : a.b.x - b.b.x));
  // có đáng phóng to không: cỡ hình khi xem cả hàng so với khi phóng to
  const fit = (w, h, k) => Math.min(stage.width / (w * (1 + 2 * k)), stage.height / (h * (1 + 2 * k)));
  const s0 = fit(box.w, box.h, 0.07);
  const gain = Math.min(...list.map((x) => fit(x.r.w, x.r.h, 0.1) / s0));
  return gain >= ZOOM_GAIN ? list : null;
}
/** Cấu hình công cụ chỉ còn điểm, cạnh, hình của một hình (hình bên cạnh không có chấm chạm, không bắt dính). */
function onlyShape(cfg, shape) {
  const keep = new Set(shape.names);
  const out = { ...cfg, points: Object.fromEntries(Object.entries(cfg.points).filter(([n]) => keep.has(n))) };
  if (cfg.segs) out.segs = cfg.segs.filter((sg) => ends(sg).every((n) => keep.has(n)));
  // đếm hình: chỉ các hình nằm trong hình đang phóng to (chọn cặp: kinds là danh sách loại, giữ nguyên)
  if (cfg.kinds && !Array.isArray(cfg.kinds)) {
    out.kinds = Object.fromEntries(Object.entries(cfg.kinds).map(([k, list]) => [k, list.filter((poly) => [...(Array.isArray(poly) ? poly : poly)].every((n) => keep.has(n)))]));
  }
  return out;
}
// tên hình theo thứ tự trong sách: thứ tự xuất hiện trong points (ABCD, MNPQ)
const P_ORDER = (P, a, b) => Object.keys(P).findIndex((n) => shown(n) === a) - Object.keys(P).findIndex((n) => shown(n) === b);

// Nhóm vẽ theo px màn hình, đặt tại một điểm của hình (chữ, chấm, nhãn…).
function screenAt(ctx, at, parent, attrs = {}) {
  const g = el('g', attrs, parent);
  g.setAttribute('transform', `translate(${at[0]} ${at[1]}) scale(${1 / ctx.ppu()})`);
  return g;
}
function pill(ctx, at, text, color, parent, cls = '') {
  const g = screenAt(ctx, at, parent, { class: `gt-pill ${cls}` });
  const w = 14 + text.length * 9.5;
  el('rect', { x: -w / 2, y: -15, width: w, height: 30, rx: 15, fill: '#fff', stroke: color, 'stroke-width': 3 }, g);
  el('text', { y: 6.5, class: 'gt-pilltext', fill: color }, g).textContent = text;
  return g;
}
function howStrip(ctx, items) {
  ctx.how.innerHTML = items.map((s) => `<span>${s}</span>`).join('');
}

// Tia đi ra từ điểm v theo các cạnh: v là đầu cạnh, hoặc nằm giữa cạnh (hai tia).
function raysAt(v, P, segs) {
  const V = P[v];
  const out = [];
  const push = (to) => {
    const d = sub(P[to], V);
    if (len(d) < 1) return;
    const ang = Math.atan2(d[1], d[0]);
    const same = out.find((r) => Math.abs(angDiff(r.ang, ang)) < 0.02);
    if (same) { if (len(d) < same.dist) Object.assign(same, { to, dist: len(d) }); return; }
    out.push({ ang, to, dist: len(d) });
  };
  segs.forEach((s) => {
    const [a, b] = ends(s);
    if (a === v) push(b);
    else if (b === v) push(a);
    else {
      const ab = sub(P[b], P[a]);
      const t = dot(sub(V, P[a]), ab) / dot(ab, ab);
      if (t > 0.01 && t < 0.99 && Math.abs(cross(ab, sub(V, P[a]))) / len(ab) < 2) { push(a); push(b); }
    }
  });
  // tên tia: điểm có tên gần v nhất nằm trên tia
  out.forEach((r) => {
    const u = dir(r.ang);
    Object.entries(P).forEach(([n, p]) => {
      const d = sub(p, V);
      const s = dot(d, u);
      if (n !== v && s > 1 && s < r.dist - 1 && Math.abs(cross(u, d)) < 2) { r.to = n; r.dist = s; }
    });
  });
  return out;
}

// ═══ 📐 Ê ke ═══════════════════════════════════════════════════════════════
function mountEke(ctx) {
  const { cfg, L, say, bar } = ctx;
  const P = cfg.points;
  const tol = ((cfg.tol ?? 4) * Math.PI) / 180;
  const rays = {};
  Object.keys(P).forEach((v) => { rays[v] = raysAt(v, P, cfg.segs); });
  // đỉnh có góc để thử: ít nhất hai tia không thẳng hàng
  const verts = Object.keys(P).filter((v) => rays[v].some((a) => rays[v].some((b) => Math.abs(Math.abs(angDiff(a.ang, b.ang)) - Math.PI) > 0.05 && a !== b)));
  howStrip(ctx, ['👆 Kéo ê ke, đặt góc vuông của ê ke vào một góc.', '🔄 Chạm ê ke để xoay.', '✅ Khít là <b>góc vuông</b>, ❌ hở là <b>góc không vuông</b>.']);
  bar.innerHTML = `
    <div class="gt-found"><span class="gt-found-lbl">Góc vuông tìm được:</span><span class="gt-chips"></span></div>
    <button type="button" class="gt-reset" title="Làm lại">↺</button>`;
  const chips = bar.querySelector('.gt-chips');
  // các góc đã thử, giữ theo câu: khoá → { v, a, b (tên đầu tia), a1, a2 (hướng tia), label }
  const found = (ctx.memo.right ||= new Map());
  const tried = (ctx.memo.notRight ||= new Map());
  const paintChips = () => {
    chips.innerHTML = found.size ? [...found.values()].map((x) => `<span class="gt-chip gt-chip-ok">∟ ${x.label}</span>`).join('') : '<span class="gt-chip gt-chip-empty">chưa có</span>';
  };
  paintChips();
  // dấu ở lại trên hình: ∟ xanh cho góc vuông, cung đỏ đứt cho góc không vuông
  const markRight = (x) => {
    const u = mul(dir(x.a1), 20), w = mul(dir(x.a2), 20);
    el('path', { d: `M${u[0]} ${u[1]} L${u[0] + w[0]} ${u[1] + w[1]} L${w[0]} ${w[1]}`, class: 'gt-right-mark' }, screenAt(ctx, P[x.v], ctx.L.marks));
  };
  const markNot = (x) => {
    const b0 = dir(x.a1), b1 = dir(x.a2);
    const sw = angDiff(x.a2, x.a1) > 0 ? 1 : 0;
    el('path', { d: `M${b0[0] * 22} ${b0[1] * 22} A22 22 0 0 ${sw} ${b1[0] * 22} ${b1[1] * 22}`, class: 'gt-notright-mark' }, screenAt(ctx, P[x.v], ctx.L.marks));
  };
  found.forEach(markRight);
  tried.forEach(markNot);

  // ê ke: cỡ theo px màn hình
  const view0 = ctx.view();
  const S = Math.max(130, Math.min(260, Math.min(view0.pxW, view0.pxH) * 0.42));
  const l1 = S, l2 = S * 0.68;
  const pose = { c: [0, 0], th: -Math.PI / 2 };
  let at = null; // đỉnh ê ke đang đặt vào
  const park = () => {
    const v = ctx.view();
    const k = 1 / ctx.ppu();
    pose.c = [v.x + v.w - (l2 + 26) * k, v.y + v.h - 22 * k];
    pose.th = -Math.PI / 2;
    at = null;
  };

  const halo = el('g', { class: 'gt-halo', visibility: 'hidden' }, L.tool);
  const vhit = el('g', {}, L.tool);
  verts.forEach((v) => {
    const g = screenAt(ctx, P[v], vhit, { class: 'gt-vhit', 'data-v': v });
    el('circle', { r: 24, fill: 'transparent' }, g);
    el('circle', { r: 6, class: 'gt-vdot' }, g);
    g.addEventListener('click', () => snapTo(v, at === v ? 'next' : 'near'));
  });
  const res = el('g', {}, L.tool); // khe hở / cạnh tô đậm của lần đặt hiện tại
  const eke = el('g', { class: 'gt-eke' }, L.top);
  // thân ê ke (toạ độ px; góc vuông ở (0,0), cạnh 1 theo +x, cạnh 2 theo +y)
  el('polygon', { points: `0,0 ${l1},0 0,${l2}`, class: 'gt-eke-body' }, eke);
  const hx = l1 * 0.2, hy = l2 * 0.2, hs = 0.42;
  el('polygon', { points: `${hx},${hy} ${hx + l1 * hs},${hy} ${hx},${hy + l2 * hs}`, class: 'gt-eke-hole' }, eke);
  for (let x = 10; x < l1 - 12; x += 10) el('line', { x1: x, y1: 0, x2: x, y2: x % 50 ? 6 : 11, class: 'gt-eke-tick' }, eke);
  for (let y = 10; y < l2 - 12; y += 10) el('line', { x1: 0, y1: y, x2: y % 50 ? 6 : 11, y2: y, class: 'gt-eke-tick' }, eke);
  el('path', { d: 'M15 0 V15 H0', class: 'gt-eke-corner' }, eke);
  el('circle', { r: 4.5, class: 'gt-eke-dot' }, eke);

  const render = () => {
    eke.setAttribute('transform', `translate(${pose.c[0]} ${pose.c[1]}) rotate(${(pose.th * 180) / Math.PI}) scale(${1 / ctx.ppu()})`);
  };
  const nearestVert = (c, px = 46) => {
    let best = null, bd = px / ctx.ppu();
    verts.forEach((v) => { const d = len(sub(P[v], c)); if (d < bd) { bd = d; best = v; } });
    return best;
  };
  const showHalo = (v) => {
    halo.setAttribute('visibility', v ? 'visible' : 'hidden');
    if (!v) return;
    halo.replaceChildren();
    el('circle', { r: 26, class: 'gt-halo-ring' }, screenAt(ctx, P[v], halo));
  };
  const clearRes = () => { res.replaceChildren(); say(''); };

  // các hướng đặt ê ke ở đỉnh v: cạnh 1 nằm trên một tia, hoặc cạnh 2 nằm trên một tia,
  // và phía trong ê ke có cạnh khác của góc (không thì chẳng có góc nào để thử)
  const poses = (v) => {
    const out = [];
    const R = rays[v];
    const side = (from, sign) => R.some((r) => { const d = angDiff(r.ang, from) * sign; return d > tol && d < Math.PI - tol; });
    const on = (t) => R.some((r) => Math.abs(angDiff(r.ang, t)) < tol);
    const inside = (t) => (on(t) && side(t, 1)) || (on(t + Math.PI / 2) && side(t + Math.PI / 2, -1));
    R.forEach((r) => [r.ang, r.ang - Math.PI / 2].forEach((t) => {
      if (inside(t) && !out.some((o) => Math.abs(angDiff(o, t)) < 0.02)) out.push(t);
    }));
    return out.sort((a, b) => angDiff(a, -Math.PI) - angDiff(b, -Math.PI));
  };
  function snapTo(v, how = 'near') {
    const list = poses(v);
    let th;
    if (how === 'next' && at === v) {
      const i = list.findIndex((t) => Math.abs(angDiff(t, pose.th)) < 0.02);
      th = list[(i + 1) % list.length];
    } else {
      th = list.reduce((a, b) => (Math.abs(angDiff(b, pose.th)) < Math.abs(angDiff(a, pose.th)) ? b : a));
    }
    flyTo(P[v], th, () => { at = v; evaluate(v); });
  }
  function flyTo(c, th, done) {
    ctx.flush();
    clearRes();
    showHalo(null);
    const c0 = pose.c.slice(), th0 = pose.th, dth = angDiff(th, th0);
    const ms = ctx.quiet ? 700 : 420;
    ctx.animate(ms, (t) => {
      const e = ctx.quiet ? easeInOut(t) : easeOutBack(t);
      pose.c = add(c0, mul(sub(c, c0), Math.min(1, ctx.quiet ? e : easeInOut(t))));
      pose.th = th0 + dth * e;
      render();
    }, () => { pose.c = c; pose.th = th; render(); done?.(); });
  }

  function evaluate(v) {
    const R = rays[v];
    const th = pose.th;
    const on = (d) => R.find((r) => Math.abs(angDiff(r.ang, d)) < tol);
    const r1 = on(th), r2 = on(th + Math.PI / 2);
    const k = 1 / ctx.ppu();
    const V = P[v];
    const edge = (r, color) => {
      const e = add(V, mul(dir(r.ang), r.dist));
      el('line', { x1: V[0], y1: V[1], x2: e[0], y2: e[1], stroke: color, class: 'gt-edge', 'vector-effect': 'non-scaling-stroke' }, res);
    };
    const nameV = hidden(v) ? '' : shown(v);
    const angleName = (a, b) => (nameV ? `góc đỉnh <b>${nameV}</b>${hidden(a.to) || hidden(b.to) ? '' : `; cạnh <b>${nameV}${shown(a.to)}</b>, <b>${nameV}${shown(b.to)}</b>`}` : 'góc này');
    if (r1 && r2) {
      edge(r1, '#10B981'); edge(r2, '#10B981');
      const u = mul(dir(r1.ang), 20), w = mul(dir(r2.ang), 20);
      const key = `${v}|${[r1.to, r2.to].sort().join()}`;
      if (!found.has(key)) {
        const x = { v, a: r1.to, b: r2.to, a1: r1.ang, a2: r2.ang, label: nameV || `${found.size + 1}` };
        found.set(key, x);
        markRight(x);
        paintChips();
        ctx.changed();
      }
      // ô vuông xanh nhấp nháy ở góc ê ke
      const g = screenAt(ctx, V, res, { class: 'gt-fit' });
      el('path', { d: `M${u[0] * 1.6} ${u[1] * 1.6} L${(u[0] + w[0]) * 1.6} ${(u[1] + w[1]) * 1.6} L${w[0] * 1.6} ${w[1] * 1.6} L0 0 Z`, class: 'gt-fit-sq' }, g);
      soundFit();
      const A = angleName(r1, r2);
      say(`✅ Khít! ${A[0].toUpperCase()}${A.slice(1)} là <b>góc vuông</b>.`, 'gt-good');
      return;
    }
    const base = r1 || r2;
    if (!base) { say('Kéo ê ke cho một cạnh ê ke nằm trên một cạnh của góc.', 'gt-ask'); return; }
    // cạnh ê ke còn trống: tìm cạnh của hình gần nó nhất, cùng phía thân ê ke
    const emptyDir = r1 ? th + Math.PI / 2 : th;
    const sign = r1 ? 1 : -1;
    const others = R.filter((r) => r !== base).filter((r) => {
      const d = angDiff(r.ang, base.ang) * sign;
      return d > tol && d < Math.PI - tol;
    });
    if (!others.length) {
      edge(base, '#F59E0B');
      say('Phía trong ê ke không có cạnh nào. Chạm ê ke để xoay.', 'gt-ask');
      return;
    }
    const g2 = others.reduce((a, b) => (Math.abs(angDiff(b.ang, emptyDir)) < Math.abs(angDiff(a.ang, emptyDir)) ? b : a));
    edge(base, '#2563EB'); edge(g2, '#DC2626');
    // khe hở: hình quạt đỏ giữa cạnh ê ke và cạnh của góc
    const Rr = Math.min(l1, l2) * 0.85 * k;
    const a0 = dir(emptyDir), a1 = dir(g2.ang);
    const sweep = angDiff(g2.ang, emptyDir) > 0 ? 1 : 0;
    el('path', {
      d: `M${V[0]} ${V[1]} L${V[0] + a0[0] * Rr} ${V[1] + a0[1] * Rr} A${Rr} ${Rr} 0 0 ${sweep} ${V[0] + a1[0] * Rr} ${V[1] + a1[1] * Rr} Z`,
      class: 'gt-gap',
    }, res);
    const mid = dir(emptyDir + angDiff(g2.ang, emptyDir) / 2);
    const lab = screenAt(ctx, add(V, mul(mid, Rr * 1.12)), res);
    el('text', { class: 'gt-gap-text', y: 6 }, lab).textContent = 'hở';
    const key = `${v}|${[base.to, g2.to].sort().join()}`;
    if (!tried.has(key)) {
      const x = { v, a: base.to, b: g2.to, a1: base.ang, a2: g2.ang };
      tried.set(key, x);
      markNot(x);
      ctx.changed();
    }
    soundGap();
    const A = angleName(base, g2);
    say(`❌ Không khít, còn khe hở: ${A} <b>không phải góc vuông</b>.`, 'gt-bad');
  }

  // kéo ê ke
  let drag = null;
  eke.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    eke.setPointerCapture(e.pointerId);
    drag = { start: ctx.toSvg(e), c0: pose.c.slice(), moved: false };
  });
  eke.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const d = sub(ctx.toSvg(e), drag.start);
    if (!drag.moved && len(d) * ctx.ppu() < 7) return;
    if (!drag.moved) { drag.moved = true; clearRes(); at = null; }
    pose.c = add(drag.c0, d);
    render();
    showHalo(nearestVert(pose.c));
  });
  const up = () => {
    if (!drag) return;
    const { moved } = drag;
    drag = null;
    showHalo(null);
    if (!moved) {
      // chạm: xoay ê ke (đang ở một đỉnh thì thử hướng tiếp theo ở đỉnh đó)
      if (at) snapTo(at, 'next');
      else flyTo(pose.c, pose.th + Math.PI / 2);
      return;
    }
    const v = nearestVert(pose.c);
    if (v) snapTo(v);
    else say('Đặt góc vuông của ê ke (chấm xanh) vào đỉnh của góc.', 'gt-ask');
  };
  eke.addEventListener('pointerup', up);
  eke.addEventListener('pointercancel', up);

  bar.querySelector('.gt-reset').onclick = () => {
    found.clear(); tried.clear(); ctx.L.marks.replaceChildren(); clearRes(); paintChips(); park(); render();
  };
  park();
  render();

  ctx.overlay.__gt = { snap: (v, n = 0) => { at = null; snapTo(v); for (let i = 0; i < n; i++) setTimeout(() => snapTo(v, 'next'), 900 * (i + 1)); }, place: (x, y, th) => { pose.c = [x, y]; if (th != null) pose.th = th; render(); } };
  return {};
}

// ═══ 📏 Thước ══════════════════════════════════════════════════════════════
function fmtLen(v, unit) {
  if (unit === 'ô') {
    const n = Math.floor(v + 0.08), f = v - n;
    if (f < 0.08) return `${n} ô`;
    if (!n) return 'chưa tới 1 ô';
    if (f > 0.4 && f < 0.6) return `${n} ô rưỡi`;
    return `hơn ${n} ô`;
  }
  const mm = Math.round(v * 10);
  const cm = Math.floor(mm / 10), r = mm % 10;
  return r ? (cm ? `${cm} ${unit} ${r} mm` : `${r} mm`) : `${cm} ${unit}`;
}

function mountRuler(ctx) {
  const { cfg, L, say, bar } = ctx;
  const P = cfg.points;
  const unit = cfg.unit || 'cm';
  const per = cfg.per;
  const segs = cfg.segs.map(ends);
  const free = !!cfg.free;
  const C = centroid(Object.values(P));
  howStrip(ctx, ['👆 Chạm một cạnh, thước tự nằm lên cạnh đó.', '✌️ Hoặc chạm hai điểm để đo từ điểm này tới điểm kia.', '✋ Kéo thước để đặt vạch 0 vào một điểm.']);
  bar.innerHTML = `
    <div class="gt-found"><span class="gt-found-lbl">Đã đo:</span><span class="gt-chips"></span></div>
    <button type="button" class="gt-reset" title="Làm lại">↺</button>`;
  const chips = bar.querySelector('.gt-chips');
  const done = (ctx.memo.len ||= new Map()); // khoá 'a|b' → { a, b, v (số đơn vị), name, text, color }, giữ theo câu
  const paintChips = () => {
    chips.innerHTML = done.size ? [...done.values()].map((d) => `<span class="gt-chip" style="background:${d.color}">${d.name ? `${d.name} ` : ''}${d.text}</span>`).join('') : '<span class="gt-chip gt-chip-empty">chưa đo</span>';
  };
  paintChips();

  const maxLen = Math.max(...segs.map(([a, b]) => len(sub(P[b], P[a]))));
  const nUnits = Math.max(5, Math.ceil(maxLen / per) + 1);
  const Lu = nUnits * per;
  const pose = { o: [0, 0], th: 0, side: 1 };

  // chạm cạnh / chạm điểm
  const hits = el('g', {}, L.tool);
  segs.forEach(([a, b]) => {
    const g = el('g', { class: 'gt-seg' }, hits);
    el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'gt-seg-hit', 'vector-effect': 'non-scaling-stroke' }, g);
    el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'gt-seg-line', 'vector-effect': 'non-scaling-stroke' }, g);
    g.addEventListener('click', () => measure(a, b));
  });
  let first = null;
  const pts = el('g', {}, L.tool);
  Object.keys(P).forEach((n) => {
    const g = screenAt(ctx, P[n], pts, { class: 'gt-pt', 'data-p': n });
    el('circle', { r: 20, fill: 'transparent' }, g);
    el('circle', { r: 9, class: 'gt-pt-ring' }, g);
    g.addEventListener('click', (e) => { e.stopPropagation(); tapPoint(n); });
  });
  const markPt = () => pts.querySelectorAll('.gt-pt').forEach((g) => g.classList.toggle('gt-pt-on', g.dataset.p === first));
  const onOneSeg = (a, b) => segs.some(([s, t]) => {
    const A = P[s], B = P[t], ab = sub(B, A);
    const inside = (p) => { const u = dot(sub(p, A), ab) / dot(ab, ab); return u > -0.01 && u < 1.01 && Math.abs(cross(ab, sub(p, A))) / len(ab) < 2; };
    return inside(P[a]) && inside(P[b]);
  });
  function tapPoint(n) {
    if (!first || first === n) { first = first === n ? null : n; markPt(); if (first) say(`Chạm thêm một điểm nữa để đo từ <b>${hidden(n) ? 'điểm này' : shown(n)}</b>.`, 'gt-ask'); else say(''); return; }
    const a = first;
    first = null;
    markPt();
    if (!free && !onOneSeg(a, n)) { say('Hai điểm này không cùng nằm trên một đoạn thẳng của hình.', 'gt-ask'); return; }
    measure(a, n);
  }

  const marks = el('g', {}, L.marks);
  // nhãn số đo ở lại trên cạnh (phía trong hình), không đè lên cạnh
  const label = (rec) => {
    const A = P[rec.a], B = P[rec.b];
    const th = Math.atan2(B[1] - A[1], B[0] - A[0]);
    const nrm = [-Math.sin(th), Math.cos(th)];
    const inward = dot(sub(C, A), nrm) > 0 ? 1 : -1;
    const k = 1 / ctx.ppu();
    const off = (Math.abs(nrm[0]) * (14 + rec.text.length * 9.5) / 2 + Math.abs(nrm[1]) * 15 + 6) * k;
    const key = [rec.a, rec.b].sort().join('|');
    marks.querySelector(`[data-k="${key}"]`)?.remove();
    pill(ctx, add(mul(add(A, B), 0.5), mul(nrm, inward * off)), rec.text, rec.color, marks).dataset.k = key;
  };
  const ruler = el('g', { class: 'gt-ruler' }, L.top);
  const endMark = el('g', {}, L.top);
  const buildRuler = () => {
    ruler.replaceChildren();
    const k = 1 / ctx.ppu();
    const W = 54 * k, s = pose.side, padL = 14 * k;
    el('rect', { x: -padL, y: s > 0 ? 0 : -W, width: Lu + 2 * padL, height: W, rx: 6 * k, class: 'gt-ruler-body' }, ruler);
    const mmPx = (per / 10) * ctx.ppu();
    const sub10 = unit === 'cm' && mmPx >= 3.2;
    const steps = sub10 ? 10 : 2;
    for (let i = 0; i <= nUnits * steps; i++) {
      const x = (i / steps) * per;
      const major = i % steps === 0, half = steps === 10 && i % 5 === 0;
      const h = (major ? 0.42 : half ? 0.3 : 0.18) * W;
      el('line', { x1: x, y1: 0, x2: x, y2: s * h, class: major ? 'gt-tick gt-tick-major' : 'gt-tick', 'vector-effect': 'non-scaling-stroke' }, ruler);
      if (major) {
        const t = el('g', { class: 'gt-rn' }, ruler);
        t.__at = [x, s * 0.68 * W];
        el('text', { y: 6, class: 'gt-ruler-num' }, t).textContent = i / steps;
      }
    }
    const t = el('g', { class: 'gt-rn' }, ruler);
    t.__at = [Lu - 0.5 * per, s * 0.68 * W];
    el('text', { y: 6, class: 'gt-ruler-unit' }, t).textContent = unit;
  };
  // số trên thước luôn đứng thẳng, thước nằm nghiêng hay dọc cũng đọc được
  const render = () => {
    const deg = (pose.th * 180) / Math.PI;
    const k = 1 / ctx.ppu();
    ruler.setAttribute('transform', `translate(${pose.o[0]} ${pose.o[1]}) rotate(${deg})`);
    ruler.querySelectorAll('.gt-rn').forEach((g) => g.setAttribute('transform', `translate(${g.__at[0]} ${g.__at[1]}) rotate(${-deg}) scale(${k})`));
  };
  const park = () => {
    const v = ctx.view();
    const k = 1 / ctx.ppu();
    pose.o = [Math.max(v.x + 24 * k, v.x + (v.w - Lu) / 2), v.y + v.h - 62 * k];
    pose.th = 0;
    pose.side = 1;
    buildRuler();
    render();
  };

  function measure(a, b) {
    let A = P[a], B = P[b];
    if (B[0] < A[0] - 0.5 || (Math.abs(B[0] - A[0]) <= 0.5 && B[1] < A[1])) { [a, b] = [b, a]; [A, B] = [B, A]; }
    const d = sub(B, A);
    const th = Math.atan2(d[1], d[0]);
    const nrm = [-Math.sin(th), Math.cos(th)];
    // thân thước nằm phía ngoài hình; phía đó tràn ra khỏi khung nhìn thì nằm phía trong
    const out = dot(sub(C, A), nrm) > 0 ? -1 : 1;
    const vw = ctx.view();
    const W0 = 54 / ctx.ppu();
    const fits = (sd) => [A, B].every((p) => {
      const q = add(p, mul(nrm, sd * W0));
      return q[0] > vw.x && q[0] < vw.x + vw.w && q[1] > vw.y && q[1] < vw.y + vw.h;
    });
    const side = fits(out) || !fits(-out) ? out : -out;
    ctx.flush(); // lần đo trước đang bay: cho xong hẳn rồi mới xoá vạch đỏ của nó
    const o0 = pose.o.slice(), th0 = pose.th, dth = angDiff(th, th0);
    endMark.replaceChildren();
    say('');
    if (side !== pose.side) { pose.side = side; buildRuler(); }
    ctx.animate(ctx.quiet ? 750 : 480, (t) => {
      const e = easeInOut(t);
      pose.o = add(o0, mul(sub(A, o0), e));
      pose.th = th0 + dth * e;
      render();
    }, () => {
      pose.o = A; pose.th = th; render();
      const v = len(d) / per;
      const text = fmtLen(v, unit);
      const name = hidden(a) || hidden(b) ? '' : `${shown(a)}${shown(b)}`;
      const key = [a, b].sort().join('|');
      const color = done.get(key)?.color || PALETTE[done.size % PALETTE.length];
      // vạch đỏ ở đầu kia + bong bóng số đo, ở lại tới lần đo sau
      const k = 1 / ctx.ppu();
      const W = 54 * k;
      const u = [Math.cos(th), Math.sin(th)];
      const halfW = (14 + text.length * 9.5) / 2; // nửa bề ngang bong bóng (px), như pill()
      el('line', { x1: B[0], y1: B[1], x2: B[0] + nrm[0] * side * W, y2: B[1] + nrm[1] * side * W, class: 'gt-endline', 'vector-effect': 'non-scaling-stroke' }, endMark);
      // bong bóng nằm trên thân thước, ngay sau vạch đọc số
      const along = (Math.abs(u[0]) * halfW + Math.abs(u[1]) * 15 + 8) * k;
      pill(ctx, add(add(B, mul(u, along)), mul(nrm, side * W * 0.5)), text, '#DC2626', endMark, 'gt-pop');
      const rec = { a, b, v, name, text, color };
      done.set(key, rec);
      label(rec);
      paintChips();
      ctx.changed();
      soundFit();
      say(`📏 ${name ? `<b>${name}</b>` : 'Đoạn này'} dài <b>${text}</b>.`, 'gt-good');
    });
  }

  // kéo thước: thả vạch 0 gần một điểm thì đo cạnh đi ra từ điểm đó (cạnh cùng hướng thước nhất)
  let drag = null;
  ruler.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    ruler.setPointerCapture(e.pointerId);
    drag = { start: ctx.toSvg(e), o0: pose.o.slice(), moved: false };
  });
  ruler.addEventListener('pointermove', (e) => {
    if (!drag) return;
    const d = sub(ctx.toSvg(e), drag.start);
    if (!drag.moved && len(d) * ctx.ppu() < 7) return;
    if (!drag.moved) { drag.moved = true; endMark.replaceChildren(); say(''); }
    pose.o = add(drag.o0, d);
    render();
  });
  const up = () => {
    if (!drag) return;
    const { moved } = drag;
    drag = null;
    if (!moved) return;
    let best = null, bd = 46 / ctx.ppu();
    Object.entries(P).forEach(([n, p]) => { const dd = len(sub(p, pose.o)); if (dd < bd) { bd = dd; best = n; } });
    if (!best) { say('Đặt vạch 0 của thước vào một điểm của hình.', 'gt-ask'); return; }
    const R = raysAt(best, P, cfg.segs);
    if (!R.length) return;
    const r = R.reduce((a, b) => (Math.abs(Math.sin(angDiff(b.ang, pose.th))) < Math.abs(Math.sin(angDiff(a.ang, pose.th))) ? b : a));
    measure(best, r.to);
  };
  ruler.addEventListener('pointerup', up);
  ruler.addEventListener('pointercancel', up);

  bar.querySelector('.gt-reset').onclick = () => { done.clear(); marks.replaceChildren(); endMark.replaceChildren(); first = null; markPt(); say(''); paintChips(); park(); };
  park();
  done.forEach(label);
  ctx.overlay.__gt = { measure: (a, b) => measure(a, b), tap: (n) => tapPoint(n) };
  return {};
}

// ═══ 🔢 Đếm hình ═══════════════════════════════════════════════════════════
// Bé chạm lần lượt các đỉnh (3 đỉnh: tam giác, 4 đỉnh: tứ giác). Đủ đỉnh thì hình được tô màu
// (mỗi lúc chỉ tô một hình, không chồng lên nhau), bộ đếm +1 và ghi tên hình.
// Hình đã đếm rồi: tên hình cũ nhấp nháy.
function mountCount(ctx) {
  const { cfg, L, say, bar } = ctx;
  const P = cfg.points;
  const setKey = (names) => [...names].sort().join(',');
  const kinds = Object.entries(cfg.kinds).map(([kind, list]) => ({
    kind,
    need: [...list[0]].length,
    shapes: list.map((s) => ({ name: s, poly: polyPts(s, P), key: setKey(s) })),
  }));
  const allNamed = Object.keys(P).every((n) => !hidden(n));
  const verts = [...new Set(kinds.flatMap((k) => k.shapes.flatMap((s) => [...s.name])))];
  let cur = 0;
  const found = (ctx.memo.found ||= kinds.map(() => [])); // giữ theo câu
  let sel = [];
  howStrip(ctx, ['👆 Chạm lần lượt các đỉnh của một hình.', '🎨 Đủ đỉnh thì hình được tô màu và đếm thêm 1.', '🔁 Đếm trùng thì tên hình cũ nhấp nháy.']);
  bar.innerHTML = `
    ${kinds.length > 1 ? `<div class="gt-kinds">${kinds.map((k, i) => `<button type="button" class="gt-kind" data-i="${i}">Hình ${k.kind}</button>`).join('')}</div>` : ''}
    <button type="button" class="gt-reset" title="Làm lại">↺</button>`;
  const B = makeBoard(ctx); // dựng trước các chấm đỉnh
  const { chips, num, lbl } = B;

  const fill = el('g', {}, L.under);
  const path = el('g', {}, L.marks);
  const vg = el('g', {}, L.top);
  const dots = {};
  verts.forEach((n) => {
    const g = screenAt(ctx, P[n], vg, { class: 'gt-cv' });
    el('circle', { r: 24, fill: 'transparent' }, g);
    el('circle', { r: 10, class: 'gt-cv-ring' }, g);
    el('text', { y: 5, class: 'gt-cv-num' }, g);
    g.addEventListener('click', () => tap(n));
    dots[n] = g;
  });
  const showFill = (s) => {
    fill.replaceChildren();
    if (s) el('polygon', { points: s.poly.map((q) => q.join(',')).join(' '), fill: s.color, class: 'gt-count-fill' }, fill);
  };
  const paintSel = () => {
    verts.forEach((n) => {
      const i = sel.indexOf(n);
      dots[n].classList.toggle('gt-cv-on', i >= 0);
      dots[n].querySelector('text').textContent = i >= 0 ? i + 1 : '';
    });
    path.replaceChildren();
    if (sel.length > 1) el('polyline', { points: sel.map((n) => P[n].join(',')).join(' '), class: 'gt-cv-path', 'vector-effect': 'non-scaling-stroke' }, path);
  };
  const paint = () => {
    bar.querySelectorAll('.gt-kind').forEach((b) => b.classList.toggle('gt-on', +b.dataset.i === cur));
    num.textContent = found[cur].length;
    lbl.textContent = `hình ${kinds[cur].kind}`;
    chips.innerHTML = found[cur].map((s, j) => `<button type="button" class="gt-chip gt-chip-btn" data-j="${j}" style="background:${s.color}">${allNamed ? shown(s.name) : j + 1}</button>`).join('');
    // chạm tên hình đã đếm: tô lại hình đó
    chips.querySelectorAll('.gt-chip-btn').forEach((b) => { b.onclick = () => { showFill(found[cur][+b.dataset.j]); blink(+b.dataset.j); }; });
  };
  const blink = (j) => {
    const c = chips.querySelector(`[data-j="${j}"]`);
    if (!c) return;
    c.classList.remove('gt-blink');
    void c.offsetWidth;
    c.classList.add('gt-blink');
  };

  function tap(n) {
    const i = sel.indexOf(n);
    if (i >= 0) { sel.splice(i, 1); paintSel(); say(''); return; }
    if (!sel.length) showFill(null);
    sel.push(n);
    paintSel();
    const K = kinds[cur];
    if (sel.length < K.need) { say(''); return; }
    const key = setKey(sel);
    const picked = allNamed ? sel.map(shown).join(', ') : '';
    sel = [];
    paintSel();
    const hit = K.shapes.find((s) => s.key === key);
    if (!hit) {
      soundGap();
      say(`${picked ? `${picked}: ` : ''}chưa phải một hình ${K.kind} trong hình vẽ. Chạm lại các đỉnh khác.`, 'gt-bad');
      return;
    }
    const j = found[cur].findIndex((s) => s.key === key);
    if (j >= 0) {
      soundGap();
      showFill(found[cur][j]);
      blink(j);
      say(`🔁 Hình ${K.kind} ${allNamed ? `<b>${shown(hit.name)}</b> ` : 'này '}đếm rồi! Tìm hình khác.`, 'gt-ask');
      return;
    }
    const s = { ...hit, color: PALETTE[found[cur].length % PALETTE.length] };
    found[cur].push(s);
    ctx.changed();
    paint();
    showFill(s);
    blink(found[cur].length - 1);
    soundTick(found[cur].length);
    const all = found[cur].length === K.shapes.length;
    if (all) setTimeout(soundDone, 250);
    say(`${all ? '🎉 ' : '✔️ '}Hình ${K.kind} thứ <b>${found[cur].length}</b>${allNamed ? `: <b>${shown(hit.name)}</b>` : ''}.${all ? ' Đếm đủ rồi!' : ''}`, all ? 'gt-good' : 'gt-mix');
  }

  bar.querySelectorAll('.gt-kind').forEach((b) => { b.onclick = () => { cur = +b.dataset.i; sel = []; paintSel(); showFill(null); say(''); paint(); }; });
  bar.querySelector('.gt-reset').onclick = () => { found.forEach((f) => { f.length = 0; }); sel = []; paintSel(); showFill(null); say(''); paint(); };
  paint();
  paintSel();
  ctx.overlay.__gt = { tap: (...names) => names.forEach((n) => tap(n)), kind: (i) => bar.querySelector(`.gt-kind[data-i="${i}"]`)?.click() };
  return { destroy: B.remove };
}

// Bảng đếm nằm trong khoảng trống của sân: trên hình (màn dọc) hoặc bên cạnh hình (màn ngang).
// Gọi trước khi vẽ chấm / chữ theo px: hình co lại đúng chỗ rồi mới đo.
function makeBoard(ctx) {
  const stage = ctx.svg.parentElement;
  const sr = stage.getBoundingClientRect();
  const side = sr.width / sr.height > (ctx.box.w / ctx.box.h) * 1.35;
  stage.classList.add('gt-has-board', side ? 'gt-board-side' : 'gt-board-top');
  const board = document.createElement('div');
  board.className = 'gt-board';
  board.innerHTML = `
    <div class="gt-counter"><span class="gt-count-num">0</span><span class="gt-count-lbl"></span></div>
    <div class="gt-chips gt-board-chips"></div>`;
  stage.insertBefore(board, ctx.svg);
  // bảng ở trên: lời máy nói nằm đầu bảng, chừa sẵn chỗ hai dòng (không đè lên số đếm, hình không xê dịch)
  const verdict = stage.querySelector('.gt-verdict');
  if (!side) board.prepend(verdict);
  return {
    chips: board.querySelector('.gt-chips'),
    num: board.querySelector('.gt-count-num'),
    lbl: board.querySelector('.gt-count-lbl'),
    remove: () => { stage.append(verdict); board.remove(); stage.classList.remove('gt-has-board', 'gt-board-side', 'gt-board-top'); },
  };
}

// ═══ ∥ Chọn cặp ════════════════════════════════════════════════════════════
// Bé chạm hai cạnh. Máy kéo dài hai cạnh cho thấy ngay: song song (không gặp nhau), cắt nhau ở
// chấm đỏ, vuông góc (dấu ∟). Cặp đúng loại đang tìm thì ghi lại (+1); chọn trùng thì cặp cũ nháy.
const PAIR_KINDS = {
  'song song': { tab: 'Song song', sym: '∥', lbl: 'cặp song song' },
  'vuông góc': { tab: 'Vuông góc', sym: '⊥', lbl: 'cặp vuông góc' },
  'cắt nhau': { tab: 'Cắt, không vuông góc', sym: '✕', lbl: 'cặp cắt nhau, không vuông góc' },
};
const segKey = (s) => [...s].sort().join('');
const pairKey = (a, b) => [segKey(a), segKey(b)].sort().join('|');

function mountPairs(ctx) {
  const { cfg, L, say, bar } = ctx;
  const P = cfg.points;
  const kinds = cfg.kinds || ['song song'];
  const segName = (s) => (Array.isArray(s) ? s.join('') : s);
  const segs = cfg.segs.map((s) => ({ name: segName(s), ab: ends(s) }));
  const found = (ctx.memo.found ||= kinds.map(() => []));
  const nots = (ctx.memo.not ||= kinds.map(() => []));
  let cur = 0;
  let sel = [];
  howStrip(ctx, ['👆 Chạm hai cạnh.', '↔ Máy kéo dài hai cạnh: gặp nhau ở chấm đỏ là <b>cắt nhau</b>, không bao giờ gặp là <b>song song</b>.', '🔁 Chọn trùng thì cặp cũ nhấp nháy.']);
  bar.innerHTML = `
    ${kinds.length > 1 ? `<div class="gt-kinds">${kinds.map((k, i) => `<button type="button" class="gt-kind" data-i="${i}">${PAIR_KINDS[k].tab}</button>`).join('')}</div>` : ''}
    <button type="button" class="gt-reset" title="Làm lại">↺</button>`;
  const B = makeBoard(ctx);

  const res = el('g', {}, L.marks);
  const hits = el('g', {}, L.tool);
  const lines = {};
  segs.forEach((s) => {
    const [a, b] = s.ab;
    const g = el('g', { class: 'gt-seg gt-pseg' }, hits);
    el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'gt-seg-hit', 'vector-effect': 'non-scaling-stroke' }, g);
    lines[s.name] = el('line', { x1: P[a][0], y1: P[a][1], x2: P[b][0], y2: P[b][1], class: 'gt-seg-line', 'vector-effect': 'non-scaling-stroke' }, g);
    g.addEventListener('click', () => tap(s));
  });
  const COL = ['#2563EB', '#F97316'];
  const paintSel = () => segs.forEach((s) => {
    const i = sel.indexOf(s);
    lines[s.name].classList.toggle('gt-pick', i >= 0);
    lines[s.name].style.stroke = i >= 0 ? COL[i] : '';
  });
  const chipText = (x) => `${shown(x.a)} ${PAIR_KINDS[kinds[cur]].sym} ${shown(x.b)}`;
  const paint = () => {
    bar.querySelectorAll('.gt-kind').forEach((b) => b.classList.toggle('gt-on', +b.dataset.i === cur));
    B.num.textContent = found[cur].length;
    B.lbl.textContent = PAIR_KINDS[kinds[cur]].lbl;
    B.chips.innerHTML = found[cur].map((x, j) => `<button type="button" class="gt-chip gt-chip-btn" data-j="${j}" style="background:${PALETTE[j % PALETTE.length]}">${chipText(x)}</button>`).join('');
    B.chips.querySelectorAll('.gt-chip-btn').forEach((b) => { b.onclick = () => { const x = found[cur][+b.dataset.j]; show(byName(x.a), byName(x.b)); blink(+b.dataset.j); }; });
  };
  const byName = (n) => segs.find((s) => s.name === n);
  const blink = (j) => {
    const c = B.chips.querySelector(`[data-j="${j}"]`);
    if (!c) return;
    c.classList.remove('gt-blink');
    void c.offsetWidth;
    c.classList.add('gt-blink');
  };

  // hình học của một cặp: song song / cùng đường thẳng / cắt nhau tại X (vuông góc hay không)
  const relOf = (s1, s2) => {
    const [a1, b1] = s1.ab.map((n) => P[n]), [a2, b2] = s2.ab.map((n) => P[n]);
    const d1 = sub(b1, a1), d2 = sub(b2, a2);
    const sin = cross(d1, d2) / (len(d1) * len(d2));
    if (Math.abs(sin) < 0.02) return Math.abs(cross(sub(a2, a1), d1)) / len(d1) < 1.5 ? { same: true } : { par: true };
    const X = add(a1, mul(d1, cross(sub(a2, a1), d2) / cross(d1, d2)));
    return { X, perp: Math.abs(dot(d1, d2)) / (len(d1) * len(d2)) < 0.035 };
  };
  // vẽ: hai cạnh đậm, phần kéo dài vạch đứt; cắt nhau thì chấm đỏ (và ∟ nếu vuông góc)
  function show(s1, s2) {
    res.replaceChildren();
    const r = relOf(s1, s2);
    const v = ctx.view();
    const far = Math.hypot(v.w, v.h) * 2;
    [s1, s2].forEach((s, i) => {
      const [a, b] = s.ab.map((n) => P[n]);
      const u = mul(sub(b, a), 1 / len(sub(b, a)));
      let p0 = a, p1 = b;
      if (r.X) {
        // kéo dài tới chỗ gặp (về phía chỗ gặp), không quá xa
        const t = dot(sub(r.X, a), u);
        if (t < 0) p0 = add(a, mul(u, Math.max(t, -far)));
        if (t > len(sub(b, a))) p1 = add(a, mul(u, Math.min(t, far)));
      } else if (r.par) { p0 = add(a, mul(u, -far)); p1 = add(b, mul(u, far)); }
      el('line', { x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], stroke: COL[i], class: 'gt-pext', 'vector-effect': 'non-scaling-stroke' }, res);
      el('line', { x1: a[0], y1: a[1], x2: b[0], y2: b[1], stroke: COL[i], class: 'gt-pline', 'vector-effect': 'non-scaling-stroke' }, res);
      if (r.par) {
        const m = screenAt(ctx, mul(add(a, b), 0.5), res);
        el('text', { y: -10, class: 'gt-parmark', fill: COL[i] }, m).textContent = '∥';
      }
    });
    if (r.X) {
      const g = screenAt(ctx, r.X, res);
      if (r.perp) {
        const toward = (s) => { const [a, b] = s.ab.map((n) => P[n]); const far2 = len(sub(a, r.X)) > len(sub(b, r.X)) ? a : b; return mul(sub(far2, r.X), 20 / len(sub(far2, r.X))); };
        const u = toward(s1), w = toward(s2);
        el('path', { d: `M${u[0]} ${u[1]} L${u[0] + w[0]} ${u[1] + w[1]} L${w[0]} ${w[1]}`, class: 'gt-right-mark' }, g);
      }
      el('circle', { r: 8, fill: '#DC2626', stroke: '#fff', 'stroke-width': 3 }, g);
    }
    return r;
  }

  function tap(s) {
    const i = sel.indexOf(s);
    if (i >= 0) { sel.splice(i, 1); paintSel(); return; }
    if (sel.length === 2) sel = [];
    if (!sel.length) res.replaceChildren();
    sel.push(s);
    paintSel();
    say('');
    if (sel.length < 2) return;
    const [s1, s2] = sel;
    const r = show(s1, s2);
    const kind = kinds[cur];
    const tag = `<b>${shown(s1.name)}</b> và <b>${shown(s2.name)}</b>`;
    const ok = kind === 'song song' ? r.par : kind === 'vuông góc' ? r.X && r.perp : r.X && !r.perp;
    const key = pairKey(s1.name, s2.name);
    if (!ok) {
      if (!nots[cur].includes(key)) { nots[cur].push(key); ctx.changed(); }
      soundGap();
      say(r.same ? `${tag} nằm trên cùng một đường thẳng.`
        : r.par ? `↔ Kéo dài mãi ${tag} vẫn không gặp nhau: <b>song song</b>, không cắt nhau.`
          : r.perp ? `${tag} cắt nhau ở chấm đỏ và <b>vuông góc</b> (∟).`
            : `${tag} cắt nhau ở chấm đỏ, ${kind === 'vuông góc' ? '<b>không vuông góc</b>' : '<b>không song song</b>'}.`, 'gt-bad');
      return;
    }
    const j = found[cur].findIndex((x) => pairKey(x.a, x.b) === key);
    if (j >= 0) { soundGap(); blink(j); say('🔁 Cặp này chọn rồi! Tìm cặp khác.', 'gt-ask'); return; }
    found[cur].push({ a: s1.name, b: s2.name });
    ctx.changed();
    paint();
    blink(found[cur].length - 1);
    soundTick(found[cur].length);
    say(`✔️ ${tag} ${kind === 'song song' ? '<b>song song</b>: kéo dài mãi không gặp nhau' : kind === 'vuông góc' ? 'cắt nhau và <b>vuông góc</b>' : 'cắt nhau, <b>không vuông góc</b>'}.`, 'gt-good');
  }

  bar.querySelectorAll('.gt-kind').forEach((b) => { b.onclick = () => { cur = +b.dataset.i; sel = []; paintSel(); res.replaceChildren(); say(''); paint(); }; });
  bar.querySelector('.gt-reset').onclick = () => { found.forEach((f) => { f.length = 0; }); nots.forEach((f) => { f.length = 0; }); sel = []; paintSel(); res.replaceChildren(); say(''); paint(); };
  paint();
  ctx.overlay.__gt = { pick: (a, b) => { sel = []; tap(byName(a)); tap(byName(b)); }, kind: (i) => bar.querySelector(`.gt-kind[data-i="${i}"]`)?.click() };
  return { destroy: B.remove };
}

// ═══ 🟦 Phủ ô vuông ════════════════════════════════════════════════════════
function mountArea(ctx) {
  const { cfg, L, say, bar } = ctx;
  const { cell: C, origin: [ox, oy], map } = cfg;
  const names = cfg.names || {};
  const unit = cfg.unit || 'cm²';
  const shapes = {};
  map.forEach((row, r) => [...row].forEach((ch, c) => {
    if (ch === '.' || ch === ' ') return;
    (shapes[ch] ||= { id: ch, name: names[ch] || `Hình ${ch}`, cells: [], placed: 0 }).cells.push({ r, c, x: ox + c * C, y: oy + r * C, on: false });
  }));
  const list = Object.values(shapes);
  list.forEach((s, i) => { s.color = PALETTE[i % PALETTE.length]; });
  // thứ tự các ô bé đã phủ của từng hình (số thứ tự ô trong s.cells), giữ theo câu
  const order = (ctx.memo.order ||= {});
  ctx.memo.total = Object.fromEntries(list.map((s) => [s.id, s.cells.length]));
  howStrip(ctx, ['👆 Chạm vào một ô trong hình để đặt ô vuông 1 cm².', '🔢 Ô tự đánh số, đếm theo.', `⚡ Bấm <b>Phủ tiếp</b> để phủ nốt.`]);
  bar.innerHTML = `
    <div class="gt-tray" title="Ô vuông 1 cm²"><span class="gt-tile-ico"></span><span>1 ${unit === 'cm²' ? 'cm²' : 'ô'}</span></div>
    <div class="gt-area-list">${list.map((s) => `<button type="button" class="gt-area-btn" data-s="${s.id}" style="--c:${s.color}"><span class="gt-area-name">${s.name}</span><span class="gt-area-n">0</span><span class="gt-area-unit">ô vuông</span><span class="gt-area-fill">⚡ Phủ tiếp</span></button>`).join('')}</div>
    <button type="button" class="gt-reset" title="Làm lại">↺</button>`;
  const tray = bar.querySelector('.gt-tray');
  const tiles = el('g', {}, L.tool);
  const hitG = el('g', {}, L.top);
  const outl = el('g', {}, L.marks);
  let queue = [];
  let timer = 0;

  const tileAt = (s, cl, n) => {
    const g = el('g', { class: 'gt-tile' }, tiles);
    const inset = C * 0.07;
    el('rect', { x: cl.x + inset, y: cl.y + inset, width: C - 2 * inset, height: C - 2 * inset, rx: C * 0.1, fill: s.color, class: 'gt-tile-rect' }, g);
    el('text', { x: cl.x + C / 2, y: cl.y + C / 2 + C * 0.17, 'font-size': C * 0.46, class: 'gt-tile-num' }, g).textContent = n;
    return g;
  };
  // ô bay từ khay xuống chỗ ô vuông
  const fly = (s, cl, n) => {
    const tr = tray.getBoundingClientRect();
    const [sx, sy] = ctx.toSvg({ clientX: tr.left + tr.width / 2, clientY: tr.top + tr.height / 2 });
    const g = tileAt(s, cl, n);
    const dx = sx - (cl.x + C / 2), dy = sy - (cl.y + C / 2);
    const ms = ctx.quiet ? 520 : 340;
    g.animate([
      { transform: `translate(${dx}px, ${dy}px) scale(0.6)`, opacity: 0.6 },
      { transform: 'translate(0, 0) scale(1.08)', opacity: 1, offset: 0.85 },
      { transform: 'translate(0, 0) scale(1)', opacity: 1 },
    ], { duration: ms, easing: 'ease-out' });
    g.style.transformBox = 'fill-box';
    g.style.transformOrigin = 'center';
  };
  const update = (s, silent) => {
    const btn = bar.querySelector(`.gt-area-btn[data-s="${s.id}"]`);
    btn.querySelector('.gt-area-n').textContent = s.placed;
    const full = s.placed === s.cells.length;
    btn.classList.toggle('gt-full', full);
    if (full) {
      outl.querySelector(`[data-s="${s.id}"]`)?.remove();
      const g = el('g', { 'data-s': s.id, class: 'gt-area-done' }, outl);
      s.cells.forEach((cl) => el('rect', { x: cl.x, y: cl.y, width: C, height: C, fill: 'none', stroke: '#10B981', 'stroke-width': 3, 'vector-effect': 'non-scaling-stroke' }, g));
      if (silent) return;
      soundDone();
      say(`🎉 ${s.name} phủ kín bằng <b>${s.placed}</b> ô vuông${unit === 'cm²' ? ' 1 cm²' : ''}.`, 'gt-good');
    }
  };
  const place = (s, cl, quietSound, instant) => {
    if (cl.on) return false;
    cl.on = true;
    s.placed++;
    if (instant) tileAt(s, cl, s.placed);
    else fly(s, cl, s.placed);
    if (!quietSound) soundTick(s.placed);
    update(s, instant);
    if (!instant) { (order[s.id] ||= []).push(s.cells.indexOf(cl)); ctx.changed(); }
    return true;
  };
  // mở lại: đặt lại các ô đã phủ, đúng thứ tự cũ
  list.forEach((s) => (order[s.id] || []).forEach((i) => place(s, s.cells[i], true, true)));
  list.forEach((s) => s.cells.forEach((cl) => {
    const h = el('rect', { x: cl.x, y: cl.y, width: C, height: C, class: 'gt-area-hit' }, hitG);
    h.addEventListener('click', () => {
      if (cl.on) { say(`Ô này có ô vuông rồi. ${s.name} đang có <b>${s.placed}</b> ô vuông.`, 'gt-mix'); return; }
      if (place(s, cl) && s.placed < s.cells.length) say(`${s.name}: <b>${s.placed}</b> ô vuông.`, 'gt-mix');
    });
  }));
  // chạm ra ngoài hình
  const outside = (e) => {
    if (e.target.closest('.gt-area-hit')) return;
    tray.classList.remove('gt-shake');
    void tray.offsetWidth;
    tray.classList.add('gt-shake');
    say('Đặt ô vuông vào bên trong hình.', 'gt-ask');
  };
  ctx.svg.addEventListener('click', outside);
  const fillRest = (s) => {
    clearInterval(timer);
    queue = s.cells.filter((cl) => !cl.on);
    if (!queue.length) return;
    const step = () => {
      const cl = queue.shift();
      if (!cl) { clearInterval(timer); return; }
      place(s, cl);
      if (s.placed < s.cells.length) say(`${s.name}: <b>${s.placed}</b> ô vuông…`, 'gt-mix');
    };
    step();
    timer = setInterval(step, ctx.quiet ? 320 : 170);
  };
  bar.querySelectorAll('.gt-area-btn').forEach((b) => { b.onclick = () => fillRest(shapes[b.dataset.s]); });
  bar.querySelector('.gt-reset').onclick = () => {
    clearInterval(timer);
    list.forEach((s) => { s.placed = 0; s.cells.forEach((cl) => { cl.on = false; }); update(s, true); delete order[s.id]; });
    tiles.replaceChildren(); outl.replaceChildren(); say('');
  };
  ctx.overlay.__gt = { fill: (id, n = Infinity) => { const s = shapes[id]; s.cells.filter((cl) => !cl.on).slice(0, n).forEach((cl) => place(s, cl, true)); } };
  return { destroy: () => { clearInterval(timer); ctx.svg.removeEventListener('click', outside); } };
}

function injectStyles() {
  if (document.getElementById('gt-styles')) return;
  const style = document.createElement('style');
  style.id = 'gt-styles';
  style.textContent = `
    .gt-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 6px auto 0; }
    .gw-app .gw-pin-zone .gw-card-has-img > .gt-row { grid-column: 2; }
    .gt-open {
      padding: 4px 12px; border: 1.5px solid #0EA5E9; border-radius: 999px; background: #F0F9FF; color: #075985;
      font: 700 0.85rem Quicksand, sans-serif; cursor: pointer;
    }
    .gt-open:hover { background: #E0F2FE; }
    .gt-filled { animation: gt-filled 1.4s ease-out; }
    .e3-option.gt-suggest:not(:disabled) { animation: gt-suggest 1s ease-in-out 3; box-shadow: 0 0 0 3px #FACC15; }
    @keyframes gt-suggest { 50% { box-shadow: 0 0 0 7px #FDE047; } }
    @keyframes gt-filled { 0%, 40% { background: #FEF08A; box-shadow: 0 0 0 4px #FDE047; } }
    .gt-row > .gp-open.gt-in-row { display: inline-block; margin: 0; }
    .gt-overlay {
      position: fixed; inset: 0; z-index: 5000; background: rgba(15, 23, 42, 0.8);
      display: flex; align-items: stretch; justify-content: center; padding: 10px;
    }
    .gt-panel {
      background: #fff; border-radius: 1rem; box-shadow: 0 10px 40px rgba(0,0,0,.35);
      width: min(1200px, 100%); height: 100%; overflow: hidden;
      padding: 0.6rem 0.8rem 0.8rem; display: flex; flex-direction: column; gap: 0.5rem;
    }
    .gt-head { flex: none; display: flex; align-items: center; gap: 0.5rem; }
    .gt-tabs { flex: 1 1 auto; display: flex; justify-content: center; gap: 4px; padding: 3px; border-radius: 999px; background: #F1F5F9; min-width: 0; }
    .gt-tab {
      flex: 0 1 auto; padding: 0.4rem 1rem; border-radius: 999px; border: none; background: transparent;
      font: 800 1rem Quicksand, sans-serif; color: #475569; cursor: pointer; white-space: nowrap;
    }
    .gt-tab.gt-on { background: #0284C7; color: #fff; box-shadow: 0 2px 6px rgba(2,132,199,.35); }
    .gt-tabs.gt-single { background: transparent; }
    .gt-tabs.gt-single .gt-tab.gt-on { background: transparent; color: #0F172A; box-shadow: none; font-size: 1.15rem; cursor: default; }
    .gt-close {
      flex: none; height: 2.3rem; padding: 0 1rem; border-radius: 1.15rem; border: none; background: #10B981; color: #fff;
      font: 700 0.95rem Quicksand, sans-serif; cursor: pointer;
    }
    /* chỉ là lời dặn: chữ thường, không nền, không viền */
    .gt-how {
      flex: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 0 1rem;
      font: 600 0.88rem/1.4 Quicksand, sans-serif; color: #64748B; text-align: center; cursor: default; user-select: none;
    }
    .gt-how b { color: #334155; }
    .gt-shapes { flex: none; display: flex; flex-wrap: wrap; justify-content: center; gap: 0.4rem; }
    .gt-shapes[hidden] { display: none; }
    .gt-shape-btn {
      min-width: 3.4rem; padding: 0.4rem 0.9rem; border-radius: 0.8rem; border: 2px solid #CBD5E1; background: #fff;
      font: 800 1.05rem Quicksand, sans-serif; color: #334155; cursor: pointer; box-shadow: 0 3px 0 #CBD5E1;
    }
    .gt-shape-btn:active { transform: translateY(2px); box-shadow: 0 1px 0 #CBD5E1; }
    .gt-shape-btn.gt-on { background: #0284C7; border-color: #0369A1; color: #fff; box-shadow: 0 3px 0 #075985; }
    .gt-shape-hit { cursor: pointer; }
    .gt-shape-hit rect { fill: rgba(2,132,199,0.04); stroke: #0284C7; stroke-width: 2.5; stroke-dasharray: 8 6; vector-effect: non-scaling-stroke; }
    .gt-shape-hit:hover rect { fill: rgba(2,132,199,0.12); }
    .gt-shape-tag { fill: #fff; stroke: #0284C7; stroke-width: 2.5; }
    .gt-shape-tagtext { font-size: 17px; text-anchor: middle; }
    .gt-stage {
      position: relative; flex: 1 1 0; min-height: 0; border-radius: 0.8rem; overflow: hidden;
      background: #fff; box-shadow: inset 0 0 0 1.5px #E2E8F0;
    }
    .gt-svg { display: block; width: 100%; height: 100%; touch-action: none; user-select: none; }
    .gt-verdict {
      position: absolute; left: 50%; top: 10px; transform: translateX(-50%);
      width: max-content; max-width: calc(100% - 20px); text-align: center;
      padding: 0.5rem 1rem; border-radius: 0.9rem; background: #fff; box-shadow: 0 4px 14px rgba(15,23,42,.18);
      font: 700 1.1rem/1.35 Quicksand, sans-serif; color: #1E293B; visibility: hidden; pointer-events: none;
    }
    .gt-verdict.gt-show { visibility: visible; }
    .gt-verdict.gt-good { box-shadow: 0 0 0 3px #10B981, 0 4px 14px rgba(15,23,42,.18); }
    .gt-verdict.gt-bad { box-shadow: 0 0 0 3px #DC2626, 0 4px 14px rgba(15,23,42,.18); }
    .gt-verdict.gt-mix { box-shadow: 0 0 0 3px #2563EB, 0 4px 14px rgba(15,23,42,.18); }
    .gt-verdict.gt-ask { box-shadow: 0 0 0 3px #F59E0B, 0 4px 14px rgba(15,23,42,.18); }
    .gt-bar { flex: none; min-height: 3.6rem; display: flex; align-items: center; justify-content: center; gap: 0.7rem; flex-wrap: wrap; }
    .gt-found { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }
    .gt-found-lbl { font: 700 1rem Quicksand, sans-serif; color: #475569; }
    .gt-chips { display: flex; flex-wrap: wrap; gap: 0.35rem; justify-content: center; }
    .gt-chip {
      min-width: 2.6rem; text-align: center; padding: 0.35rem 0.7rem; border-radius: 0.7rem; border: none;
      font: 800 1.15rem Quicksand, sans-serif; color: #fff; background: #64748B;
    }
    .gt-chip-ok { background: #10B981; }
    .gt-chip-empty { background: #fff; color: #94A3B8; box-shadow: inset 0 0 0 2px #CBD5E1; font-size: 1rem; }
    .gt-chip-btn { cursor: pointer; }
    .gt-reset {
      flex: none; width: 3rem; height: 3rem; border-radius: 50%; border: 2px solid #CBD5E1; background: #fff;
      font: 800 1.4rem Quicksand, sans-serif; color: #334155; cursor: pointer;
    }
    .gt-pilltext { font: 800 16px Quicksand, sans-serif; text-anchor: middle; }
    .gt-pop { animation: gt-pop .45s ease-out; transform-box: fill-box; transform-origin: center; }
    @keyframes gt-pop { 0% { opacity: 0; } 60% { opacity: 1; } }

    /* 📐 ê ke */
    .gt-eke { cursor: grab; }
    .gt-eke:active { cursor: grabbing; }
    .gt-eke-body { fill: rgba(125, 211, 252, .55); stroke: #0369A1; stroke-width: 2.5; stroke-linejoin: round; }
    .gt-eke-hole { fill: rgba(255,255,255,.55); stroke: #0369A1; stroke-width: 1.5; stroke-linejoin: round; }
    .gt-eke-tick { stroke: #075985; stroke-width: 1.4; }
    .gt-eke-corner { fill: none; stroke: #075985; stroke-width: 2; }
    .gt-eke-dot { fill: #0284C7; stroke: #fff; stroke-width: 2; }
    .gt-vhit { cursor: pointer; }
    .gt-vdot { fill: rgba(2,132,199,.25); stroke: #0284C7; stroke-width: 2; }
    .gt-halo-ring { fill: rgba(250, 204, 21, .3); stroke: #F59E0B; stroke-width: 3; }
    .gt-edge { stroke-width: 7; stroke-linecap: round; opacity: .85; }
    .gt-right-mark { fill: none; stroke: #10B981; stroke-width: 4; }
    .gt-notright-mark { fill: none; stroke: #DC2626; stroke-width: 3; stroke-dasharray: 4 3; }
    .gt-fit-sq { fill: rgba(16,185,129,.45); stroke: #059669; stroke-width: 3; animation: gt-blink .9s ease-in-out 3; }
    @keyframes gt-blink { 50% { opacity: .25; } }
    .gt-gap { fill: rgba(220, 38, 38, .32); stroke: #DC2626; stroke-width: 0; animation: gt-blink 1s ease-in-out 2; }
    .gt-gap-text { font: 900 18px Quicksand, sans-serif; fill: #B91C1C; text-anchor: middle; stroke: #fff; stroke-width: 5; paint-order: stroke; }

    /* ∥ chọn cặp */
    .gt-pseg .gt-seg-line.gt-pick { stroke-width: 9; }
    .gt-pext { stroke-width: 3.5; stroke-dasharray: 9 7; stroke-linecap: round; opacity: .85; }
    .gt-pline { stroke-width: 8; stroke-linecap: round; }
    .gt-parmark { font: 900 22px Quicksand, sans-serif; text-anchor: middle; stroke: #fff; stroke-width: 5; paint-order: stroke; }

    /* 📏 thước */
    .gt-seg { cursor: pointer; }
    .gt-seg-hit { stroke: transparent; stroke-width: 28; stroke-linecap: round; }
    .gt-seg-line { stroke: transparent; stroke-width: 6; stroke-linecap: round; }
    .gt-seg:hover .gt-seg-line { stroke: rgba(2,132,199,.45); }
    .gt-pt { cursor: pointer; }
    .gt-pt-ring { fill: rgba(255,255,255,.01); stroke: rgba(2,132,199,.55); stroke-width: 2.5; }
    .gt-pt-on .gt-pt-ring { fill: #FACC15; stroke: #CA8A04; stroke-width: 3; }
    .gt-ruler { cursor: grab; }
    .gt-ruler-body { fill: rgba(254, 240, 138, .78); stroke: #B45309; stroke-width: 0; }
    .gt-tick { stroke: #78350F; stroke-width: 1.2; }
    .gt-tick-major { stroke-width: 2; }
    .gt-ruler-num { font: 800 14px Quicksand, sans-serif; fill: #78350F; text-anchor: middle; }
    .gt-ruler-unit { font: 700 13px Quicksand, sans-serif; fill: #92400E; text-anchor: middle; }
    .gt-endline { stroke: #DC2626; stroke-width: 3.5; }

    /* 🔢 đếm hình */
    .gt-has-board { display: flex; flex-direction: column; }
    .gt-has-board > .gt-svg { flex: 1 1 0; min-height: 0; height: auto; }
    .gt-board-side { flex-direction: row-reverse; }
    .gt-board-side > .gt-svg { min-width: 0; width: auto; height: 100%; }
    .gt-board {
      flex: none; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.6rem;
      padding: 4.2rem 1rem 0.8rem; background: #FAF5FF; border-bottom: 2px dashed #DDD6FE;
    }
    .gt-board-top .gt-board { padding-top: 0.6rem; }
    .gt-board .gt-verdict {
      position: static; transform: none; width: auto; max-width: 100%; visibility: visible;
      min-height: calc(2 * 1.35em + 1rem); box-sizing: border-box; display: flex; align-items: center; justify-content: center;
    }
    .gt-board .gt-verdict:not(.gt-show) { box-shadow: none; background: transparent; }
    .gt-board-side .gt-board { width: min(15rem, 32%); border-bottom: none; border-left: 2px dashed #DDD6FE; padding-top: 4.6rem; justify-content: flex-start; }
    .gt-board .gt-counter { font-size: 1.15rem; }
    .gt-board .gt-count-num { font-size: 3rem; line-height: 1; }
    .gt-board-chips { min-height: 2.8rem; }
    .gt-board-chips .gt-chip { font-size: 1.45rem; padding: 0.4rem 0.9rem; }
    .gt-cv { cursor: pointer; }
    .gt-cv-ring { fill: rgba(255,255,255,.85); stroke: #7C3AED; stroke-width: 2.5; }
    .gt-cv-on .gt-cv-ring { fill: #FACC15; stroke: #A16207; stroke-width: 3; }
    .gt-cv-num { font: 900 13px Quicksand, sans-serif; fill: #422006; text-anchor: middle; pointer-events: none; }
    .gt-cv-path { fill: none; stroke: #F59E0B; stroke-width: 4; stroke-dasharray: 8 6; stroke-linejoin: round; }
    .gt-count-fill { opacity: .45; }
    .gt-blink { animation: gt-chipblink .45s ease-in-out 4; }
    @keyframes gt-chipblink { 50% { transform: scale(1.18); box-shadow: 0 0 0 4px #FDE047; } }
    .gt-kinds { display: flex; padding: 3px; border-radius: 999px; background: #F1F5F9; }
    .gt-kind { padding: 0.45rem 1.1rem; border-radius: 999px; border: none; background: transparent; font: 800 1rem Quicksand, sans-serif; color: #475569; cursor: pointer; }
    .gt-kind.gt-on { background: #7C3AED; color: #fff; }
    .gt-count-row { display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap; justify-content: center; }
    .gt-counter { display: flex; align-items: baseline; gap: 0.35rem; font: 700 1rem Quicksand, sans-serif; color: #475569; }
    .gt-count-num { font: 900 2rem Quicksand, sans-serif; color: #7C3AED; min-width: 1.4rem; text-align: center; }

    /* 🟦 ô vuông */
    .gt-area-hit { fill: transparent; cursor: pointer; }
    .gt-area-hit:hover { fill: rgba(14,165,233,.15); }
    .gt-tile-rect { stroke: #fff; stroke-width: 2; vector-effect: non-scaling-stroke; opacity: .9; }
    .gt-tile-num { font-family: Quicksand, sans-serif; font-weight: 900; fill: #fff; text-anchor: middle; pointer-events: none; }
    .gt-tile { pointer-events: none; }
    .gt-tray {
      display: flex; align-items: center; gap: 0.45rem; padding: 0.45rem 0.8rem; border-radius: 0.9rem;
      background: #F0F9FF; box-shadow: inset 0 0 0 2px #BAE6FD; font: 800 1.05rem Quicksand, sans-serif; color: #075985;
    }
    .gt-tile-ico { width: 1.6rem; height: 1.6rem; border-radius: 0.3rem; background: #0EA5E9; box-shadow: 3px 3px 0 #7DD3FC, 6px 6px 0 #BAE6FD; }
    .gt-shake { animation: gt-shake .3s linear; }
    @keyframes gt-shake { 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    .gt-area-list { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
    .gt-area-btn {
      display: grid; grid-template-columns: auto auto; grid-template-areas: "name n" "fill unit"; align-items: baseline; column-gap: 0.5rem;
      padding: 0.35rem 0.9rem; border-radius: 0.9rem; border: 3px solid var(--c); background: #fff; cursor: pointer;
      font: 700 0.95rem Quicksand, sans-serif; color: #334155; min-width: 10.5rem;
    }
    .gt-area-name { grid-area: name; font-weight: 800; color: var(--c); }
    .gt-area-n { grid-area: n; font: 900 1.7rem Quicksand, sans-serif; color: var(--c); text-align: right; }
    .gt-area-unit { grid-area: unit; font-size: 0.8rem; text-align: right; color: #64748B; }
    .gt-area-fill { grid-area: fill; font-size: 0.85rem; color: #0369A1; }
    .gt-area-btn.gt-full { background: #ECFDF5; border-color: #10B981; }
    .gt-area-btn.gt-full .gt-area-fill { visibility: hidden; }
    @media (max-width: 560px) {
      .gt-tab { padding: 0.4rem 0.6rem; font-size: 0.9rem; }
      .gt-close { height: 2.1rem; padding: 0 0.8rem; }
      .gt-how { font-size: 0.8rem; }
      .gt-area-btn { min-width: 0; }
    }
    @media (prefers-reduced-motion: reduce) {
      .gt-fit-sq, .gt-gap { animation-duration: 1.8s; animation-iteration-count: 1; }
      .gt-blink { animation-iteration-count: 2; }
      .gt-shake { animation: none; }
    }
  `;
  document.head.appendChild(style);
}
