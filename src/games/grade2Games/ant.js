/**
 * 🐜 Chú kiến tìm đường — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.7. Bám Vở BT Toán 2 Tập Một, Bài 25–27:
 *   ant-1 (Bài 25): ba điểm thẳng hàng (chạm 3 hạt đường rồi căng chỉ: chỉ thẳng thì kiến đi một mạch) xen kẽ
 *          nhận ra đoạn thẳng / đường thẳng / đường cong.
 *   ant-2 (Bài 25, 26): đo cành cây bằng thước (chạm thước: thước nằm lên cành, vạch 0 ở một đầu, gõ số cm) xen kẽ
 *          độ dài đường gấp khúc (gõ tổng, kiến đi từng đoạn, bảng cộng dần 3 cm + 4 cm + 2 cm = 9 cm).
 *   ant-3 (Bài 26): chọn đường về tổ ngắn hơn (hai kiến đi cùng tốc độ, đường ngắn tới trước) · chạm các hòn sỏi
 *          hình tứ giác (đếm đỉnh từng hòn) · đếm hình tứ giác trong vườn chia ô (tính cả hình ghép).
 *   ant-4 (Bài 27): vẽ đoạn thẳng dài cho trước dọc theo thước, xen kẽ vẽ trên giấy kẻ ô vuông (mỗi cạnh ô 1 cm).
 * Cấp 5 (bản đồ km, Bài 55, Tập Hai) chưa làm. Dùng khung quầy Chợ phiên lớp 3 (market/stall.js), theme 'ant'.
 * Hình phẳng tính bằng cm (U đơn vị SVG cho 1 cm), vẽ đúng tỉ lệ: thước, kiến đi, nhãn độ dài khớp nhau.
 * Bố cục sinh lúc dựng màn theo khung thật (ngang / dọc), từ seed của nhiệm vụ.
 * App không báo trước lúc đúng: bé tự bấm "✓ Căng chỉ" / "✓ Chọn xong" / "✓ Vẽ xong".
 */

import {
  antTopSvg, antNpcUrl, nestSvg, sugarSvg, letterSvg, tagSvg, groundSvg, pencilSvg, antIcon, INK,
} from './art/ant.js';
import { rulerSvg } from '../grade3Games/art/ribbon.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectAntStyles } from './styles.js';
import { cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { makeRng } from '../grade3Games/loop.js';
import { sfx } from '../preschool/fx.js';

const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// Kiến Vàng: nhân vật duy nhất, xưng "mình", gọi bé là "bạn" (ba nét mặt vẽ SVG, art/ant.js).
const ANT = {
  id: 'kienvang', name: 'Kiến Vàng', me: 'mình', you: 'bạn',
  img: antNpcUrl('wait'), sad: antNpcUrl('sad'),
  moods: { wait: antNpcUrl('wait'), happy: antNpcUrl('happy'), sad: antNpcUrl('sad') },
};

export const ANT_LEVELS = [
  {
    ...levelMeta('ant-1'), missions: 5, kind: 'line',
    knowledge: 'điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng',
    ask: () => 'Bạn giúp mình tìm đường thẳng qua các hạt đường!',
    desc: 'Ba điểm thẳng hàng khi cùng nằm trên một đường thẳng. Chạm 3 hạt đường rồi căng chỉ.',
    how: [['👆', 'Chạm 3 hạt đường'], ['🧵', 'Căng chỉ'], ['ant', 'Kiến đi thẳng']],
  },
  {
    ...levelMeta('ant-2'), missions: 5, kind: 'poly',
    knowledge: 'đo độ dài đoạn thẳng, độ dài đường gấp khúc',
    ask: () => 'Bạn đo đường giúp mình!',
    desc: 'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng: 3 cm + 4 cm + 2 cm = 9 cm.',
    how: [['ruler', 'Đặt thước'], ['🔢', 'Gõ số cm'], ['ant', 'Kiến đi đo']],
  },
  {
    ...levelMeta('ant-3'), missions: 5, kind: 'route',
    knowledge: 'so sánh độ dài đường gấp khúc, hình tứ giác',
    ask: () => 'Bạn chọn đường giúp mình về tổ!',
    desc: 'Cộng độ dài từng đoạn để biết đường nào ngắn hơn. Hình tứ giác có 4 cạnh.',
    how: [['➕', 'Cộng từng đoạn'], ['👆', 'Chọn đường'], ['ant', 'Hai kiến đua']],
  },
  {
    ...levelMeta('ant-4'), missions: 5, kind: 'draw',
    knowledge: 'vẽ đoạn thẳng có độ dài cho trước',
    ask: () => 'Bạn vẽ cầu giúp mình!',
    desc: 'Vẽ đoạn thẳng AB dài 5 cm: chấm A ở vạch 0, chấm B ở vạch 5 của thước rồi nối lại.',
    how: [['ruler', 'Nhìn thước'], ['✏️', 'Kéo bút chì'], ['✓', 'Vẽ xong']],
  },
];

// ── Sinh nhiệm vụ (số liệu); bố cục hình sinh lúc dựng màn từ m.seed ─────────────────────────────
const LETTERS = 'ABCDEGHIKMNPQ'.split(''); // Vở BT không dùng F, J
const NAMES = ['ABCDE', 'MNPQR', 'GHIKL'];
const KIND = { doan: 'đoạn thẳng', duong: 'đường thẳng', cong: 'đường cong' };
const PLANS = {
  line: ['line', 'kind', 'line', 'kind', 'line'],
  poly: ['measure', 'total', 'measure', 'total', 'total'],
  route: ['shorter', 'quad', 'count', 'shorter', 'quad'],
  draw: ['ruler', 'dots', 'ruler', 'dots', 'ruler'],
};
const tries = (make, ok) => { let v; for (let t = 0; t < 60; t++) { v = make(); if (ok(v)) break; } return v; };

function makeData(rng, mode, h) {
  const same = h.filter(x => x.mode === mode);
  if (mode === 'line') return { letters: rng.shuffle(LETTERS).slice(0, 5) };
  if (mode === 'kind') {
    const want = tries(() => rng.pick(Object.keys(KIND)), (k) => !same.some(x => x.want === k));
    const ls = rng.shuffle(LETTERS);
    return { want, seg: ls.slice(0, 2).sort().join(''), line: ls.slice(2, 4).sort().join('') };
  }
  if (mode === 'measure') {
    const L = tries(() => rng.int(2, 8), (v) => !same.some(x => x.L === v));
    const ls = rng.shuffle(LETTERS).slice(0, 2).sort();
    return { L, name: ls.join('') };
  }
  if (mode === 'total') {
    // Lượt đầu 3 đoạn; lượt sau có thể 2 hoặc 4 đoạn. Tổng tới 16 cm (có lượt cộng qua 10), vừa khung chơi.
    const k = same.length === 0 ? 3 : rng.pick([2, 3, 4, 3]);
    const lens = tries(() => Array.from({ length: k }, () => rng.int(2, k === 4 ? 4 : k === 2 ? 7 : 6)),
      (ls) => new Set(ls).size >= Math.min(k, 3) - 1 && ls.reduce((a, b) => a + b, 0) <= 16 && !same.some(x => x.lens.join() === ls.join()));
    return { lens, name: rng.pick(NAMES).slice(0, k + 1) };
  }
  if (mode === 'count') {
    return { cfg: tries(() => rng.pick(['strip2', 'strip3', 'slant', 'corner']), (c) => !same.some(x => x.cfg === c)) };
  }
  if (mode === 'ruler') return { k: tries(() => rng.int(3, 10), (v) => !same.some(x => x.k === v)) };
  if (mode === 'dots') return { k: tries(() => rng.int(2, 7), (v) => !same.some(x => x.k === v)) };
  return {}; // shorter, quad: sinh hết lúc dựng màn
}

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const ANT_GAME = {
  ...stallMeta('ant'),
  unitWord: 'lượt',
  npcs: [ANT],
  starPrefix: 'g2games',
  levels: ANT_LEVELS,
  stallIcon: () => antIcon(60),
  summaryText: (ok, total) => `Em đã giúp Kiến Vàng đúng <strong>${ok}/${total}</strong> lượt.`,

  howTo(level) {
    const pic = (p) => (p === 'ant' ? antIcon(46) : p === 'ruler' ? rulerIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Kiến vui' }];
  },

  makeMission(rng, level, history) {
    const plan = PLANS[level.kind];
    const mode = plan[history.length % plan.length];
    return { mode, level: level.kind, ...makeData(rng, mode, history), seed: rng.int(1, 2 ** 30), npc: ANT };
  },

  mountMission(stage, m, level, api) {
    injectAntStyles();
    if (import.meta.env.DEV) window.__g2ant = m;
    return mountAntGame(stage, m, api);
  },
};

const rulerIcon = (size = 28) =>
  `<svg viewBox="4 -2 92 40" width="${size}" height="${size}" aria-hidden="true">${rulerSvg(8, 6, { cm: 2, ppm: 3.4, pad: 2, h: 26 })}</svg>`;
const twigIcon = (size = 30) =>
  `<svg viewBox="0 0 40 24" width="${size}" height="${Math.round(size * 0.6)}" aria-hidden="true"><line x1="4" y1="19" x2="36" y2="5" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><line x1="4" y1="19" x2="36" y2="5" stroke="#B7793F" stroke-width="4.5" stroke-linecap="round"/></svg>`;

// ── Hình học (cm) ───────────────────────────────────────────────────────────────────────────────
const U = 40; // đơn vị SVG cho 1 cm
const M = 0.8; // lề cảnh (cm)
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const u = (v) => f1(v * U);
const NS = 'http://www.w3.org/2000/svg';
const P = (x, y) => ({ x, y });
const add = (a, b) => P(a.x + b.x, a.y + b.y);
const sub = (a, b) => P(a.x - b.x, a.y - b.y);
const mul = (a, k) => P(a.x * k, a.y * k);
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const norm = (a) => { const l = Math.hypot(a.x, a.y) || 1; return P(a.x / l, a.y / l); };
const perp = (a) => P(-a.y, a.x);
const dot = (a, b) => a.x * b.x + a.y * b.y;
const cross = (a, b) => a.x * b.y - a.y * b.x;
const dirOf = (deg) => P(Math.cos((deg * Math.PI) / 180), Math.sin((deg * Math.PI) / 180));
const angOf = (a, b) => (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
const centroid = (pts) => mul(pts.reduce(add, P(0, 0)), 1 / pts.length);
const sumOf = (a) => a.reduce((x, y) => x + y, 0);
const lenOf = (pts) => sumOf(pts.slice(1).map((p, i) => dist(pts[i], p)));
/** Góc trong (độ) tại b của đường a → b → c. */
const inner = (a, b, c) => {
  const v1 = norm(sub(a, b)), v2 = norm(sub(c, b));
  return (Math.acos(Math.max(-1, Math.min(1, dot(v1, v2)))) * 180) / Math.PI;
};
/** Chiều cao nhỏ nhất của tam giác abc (0 khi ba điểm thẳng hàng). */
const minHeight = (a, b, c) => {
  const area2 = Math.abs(cross(sub(b, a), sub(c, a)));
  return area2 / Math.max(dist(a, b), dist(b, c), dist(a, c));
};
/** Hai đoạn thẳng pq và rs cắt nhau (không tính chạm ở đầu mút). */
const crosses = (p, q, r, s) => {
  const d1 = cross(sub(q, p), sub(r, p)), d2 = cross(sub(q, p), sub(s, p));
  const d3 = cross(sub(s, r), sub(p, r)), d4 = cross(sub(s, r), sub(q, r));
  return d1 * d2 < -1e-9 && d3 * d4 < -1e-9;
};
const segDist = (p, a, b) => {
  const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / (dot(ab, ab) || 1)));
  return dist(p, add(a, mul(ab, t)));
};
const polyOk = (pts) => {
  for (let i = 0; i < pts.length - 1; i++) {
    for (let j = i + 2; j < pts.length - 1; j++) if (crosses(pts[i], pts[i + 1], pts[j], pts[j + 1])) return false;
  }
  // đỉnh không nằm sát một đoạn không kề nó
  for (let i = 0; i < pts.length; i++) {
    for (let j = 0; j < pts.length - 1; j++) if (j !== i && j + 1 !== i && segDist(pts[i], pts[j], pts[j + 1]) < 1) return false;
  }
  return true;
};

/**
 * Cỡ cảnh (cm) theo khung chơi thật: diện tích ≈ area cm², cùng tỉ lệ ngang / dọc với khung.
 * minW, minH: cảnh ít nhất rộng / cao bấy nhiêu (vd. thước dài).
 */
function boxFor(stageEl, { area = 110, minW = 0, minH = 0 } = {}) {
  const r0 = stageEl.getBoundingClientRect();
  const ratio = r0.width > 40 && r0.height > 40 ? r0.width / r0.height : (matchMedia('(orientation: portrait)').matches ? 0.8 : 1.8);
  let W = Math.sqrt(area * ratio), H = area / W;
  W = Math.max(minW, Math.min(17, Math.max(8.4, W)));
  H = Math.max(minH, Math.min(14, Math.max(7.2, H)));
  return { W: Math.round(W * 10) / 10, H: Math.round(H * 10) / 10, land: W >= H };
}
const inBox = (p, W, H, pad = 0) => p.x >= M + pad && p.x <= W - M - pad && p.y >= M + pad && p.y <= H - M - pad;

// ── Cảnh SVG ────────────────────────────────────────────────────────────────────────────────────
function makeScene(stageEl, { W, H, rnd, water = false }) {
  stageEl.innerHTML = `
    <svg class="g2a-svg" viewBox="0 0 ${u(W)} ${u(H)}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g data-bg>${groundSvg(W * U, H * U, rnd, { water })}</g>
      <g data-fig></g><g data-over></g><g data-ants></g><g data-top></g>
    </svg>`;
  const svg = stageEl.querySelector('svg');
  const layer = (k) => svg.querySelector(`[data-${k}]`);
  const put = (k, html) => { const g = document.createElementNS(NS, 'g'); g.innerHTML = html; layer(k).appendChild(g); return g; };
  /** Toạ độ cm của con trỏ. */
  const at = (e) => {
    const p = svg.createSVGPoint();
    p.x = e.clientX; p.y = e.clientY;
    const v = p.matrixTransform(svg.getScreenCTM().inverse());
    return P(v.x / U, v.y / U);
  };
  return { svg, W, H, layer, put, at };
}

const setPose = (g, p, deg) => g.setAttribute('transform', `translate(${u(p.x)} ${u(p.y)}) rotate(${f1(deg)})`);

function addAnt(sc, p, deg = 0, { carry = false, cls = '' } = {}) {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', `g2a-ant ${cls}`);
  g.innerHTML = `<g class="g2a-ant-in">${antTopSvg(U * 0.9, { carry })}</g>`;
  sc.layer('ants').appendChild(g);
  setPose(g, p, deg);
  return g;
}

/**
 * Kiến đi theo đường gấp khúc pts (cm), tốc độ speed cm/giây; quay đầu mềm ở mỗi đỉnh.
 * onCm(k, p): vừa đi hết xăng-ti-mét thứ k (tính từ đầu đường). onVertex(i): vừa tới đỉnh thứ i (1 … n).
 */
function walk(g, pts, { speed = 3.4, onCm, onVertex } = {}) {
  return new Promise((res) => {
    const segs = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const L = dist(pts[i], pts[i + 1]);
      segs.push({ a: pts[i], b: pts[i + 1], L, s0: total, ang: angOf(pts[i], pts[i + 1]) });
      total += L;
    }
    const pointAt = (d) => {
      const s = segs.find(x => d <= x.s0 + x.L + 1e-9) || segs[segs.length - 1];
      const f = s.L ? Math.min(1, (d - s.s0) / s.L) : 1;
      return add(s.a, mul(sub(s.b, s.a), f));
    };
    const turn = (a, b, f) => { let d = ((b - a + 540) % 360) - 180; return a + d * f; };
    g.classList.add('g2a-walking');
    let t0 = null, lastCm = 0, lastSeg = 0;
    const step = (now) => {
      if (!g.isConnected) { res(); return; }
      t0 ??= now;
      const d = Math.min(total, ((now - t0) / 1000) * speed);
      let k = segs.findIndex(x => d <= x.s0 + x.L + 1e-9);
      if (k < 0) k = segs.length - 1;
      const s = segs[k];
      let ang = s.ang;
      const into = d - s.s0;
      if (k > 0 && into < 0.35) ang = turn(segs[k - 1].ang, s.ang, 0.5 + into / 0.7);
      setPose(g, pointAt(d), ang);
      while (lastSeg < k) { lastSeg++; onVertex?.(lastSeg); }
      while (Math.floor(d + 1e-6) > lastCm) { lastCm++; onCm?.(lastCm, pointAt(lastCm)); }
      if (d >= total) {
        g.classList.remove('g2a-walking');
        onVertex?.(segs.length);
        res();
        return;
      }
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

/** Chỗ đặt nhãn tên điểm thứ i của đường gấp khúc: ra ngoài góc (đỉnh giữa) hoặc nối dài (hai đầu). */
function vertexLabel(pts, i, off = 0.55) {
  const p = pts[i];
  let d;
  if (pts.length === 1) d = P(-0.7, -0.7);
  else if (i === 0) d = sub(p, pts[1]);
  else if (i === pts.length - 1) d = sub(p, pts[i - 1]);
  else {
    const s = add(norm(sub(pts[i - 1], p)), norm(sub(pts[i + 1], p)));
    d = Math.hypot(s.x, s.y) < 0.2 ? perp(sub(pts[i + 1], p)) : mul(s, -1);
  }
  return add(p, mul(norm(d), off));
}
/** Chỗ đặt nhãn độ dài của đoạn ab: giữa đoạn, lệch ra phía xa tâm hình c. */
function segLabel(a, b, c, off = 0.5) {
  const mid = mul(add(a, b), 0.5);
  let n = norm(perp(sub(b, a)));
  if (dot(n, sub(mid, c)) < 0) n = mul(n, -1);
  return add(mid, mul(n, off));
}

const polyD = (pts) => pts.map((p, i) => `${i ? 'L' : 'M'}${u(p.x)} ${u(p.y)}`).join(' ');
/** Cành cây (đường gấp khúc) có viền mực, chấm đen ở các điểm. */
const twigSvg = (pts, { dots = true, color = '#B7793F' } = {}) => `
  <path d="${polyD(pts)}" fill="none" stroke="${INK}" stroke-width="${u(0.3)}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="${polyD(pts)}" fill="none" stroke="${color}" stroke-width="${u(0.18)}" stroke-linecap="round" stroke-linejoin="round"/>
  ${dots ? pts.map(p => `<circle cx="${u(p.x)}" cy="${u(p.y)}" r="${u(0.12)}" fill="${INK}"/>`).join('') : ''}`;
const FS = 0.5 * U; // cỡ chữ nhãn

// ── Dựng màn ────────────────────────────────────────────────────────────────────────────────────
const SIGN = {
  line: 'Ba điểm thẳng hàng', kind: 'Đoạn, đường thẳng', measure: 'Đo cành cây', total: 'Đường gấp khúc',
  shorter: 'Đường nào ngắn hơn?', quad: 'Sỏi tứ giác', count: 'Đếm hình tứ giác', ruler: 'Vẽ đoạn thẳng', dots: 'Giấy kẻ ô',
};
const PAD_MODES = new Set(['measure', 'total', 'count']);

function mountAntGame(stage, m, api) {
  const n = ANT;
  const s = mountStall(stage, {
    npc: n, api, theme: 'ant', cameo: false,
    sign: `${antIcon(34)}<span><strong>Kiến Vàng</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2a-bench">
        <div class="g2a-board" data-board hidden></div>
        <div class="g2a-stage" data-stage></div>
        <div class="g2a-acts" data-acts></div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  if (!PAD_MODES.has(m.mode)) scene.classList.add('g2a-nopad');
  const { counter, main } = s;
  const q = (sel) => counter.querySelector(sel);
  const bench = q('.g2a-bench'), acts = q('[data-acts]');

  // Thẻ kết quả: cất hàng nút, chừa đáy quầy để bé vẫn thấy kiến đi.
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.style.visibility = 'hidden';
    bench.style.paddingBottom = `${Math.max(0, card.offsetHeight - acts.offsetHeight + 8)}px`;
  })).observe(main, { childList: true });

  const ok = (text, line) => { const l = line || `Cảm ơn ${n.you}!`; s.speak(l, 'happy', `${l} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  const hint = (el) => { if (!el) return; el.classList.remove('g2a-hint'); void el.getBoundingClientRect(); el.classList.add('g2a-hint'); };
  const doneBtn = (label) => {
    acts.insertAdjacentHTML('beforeend', `<button type="button" class="g2a-act" data-done>${label}</button>`);
    return acts.querySelector('[data-done]');
  };
  const board = q('[data-board]');
  const say = (html) => { board.hidden = false; board.innerHTML = `<span class="g2a-say">${html}</span>`; };
  const ctx = { m, n, ...s, ok, bad, hint, doneBtn, board, say, stageEl: q('[data-stage]'), acts, rnd: makeRng(m.seed) };
  const LEVELS = {
    line: levelLine, kind: levelKind, measure: levelMeasure, total: levelTotal,
    shorter: levelShorter, quad: levelQuad, count: levelCount, ruler: levelRuler, dots: levelDots,
  };
  LEVELS[m.mode](ctx);
}

// ════ Cấp 1: ba điểm thẳng hàng ════════════════════════════════════════════════════════════════
function levelLine({ m, n, speak, ok, bad, hint, doneBtn, stageEl, rnd }) {
  const { W, H } = boxFor(stageEl, { area: 100 });
  const inside = (p) => inBox(p, W, H, 0.6);
  let pts = null;
  for (let t = 0; t < 3000 && !pts; t++) {
    const d = dirOf(rnd() * 180);
    const p0 = P(M + 0.6 + rnd() * (W - 2 * M - 1.2), M + 0.6 + rnd() * (H - 2 * M - 1.2));
    const p1 = add(p0, mul(d, 2.3 + rnd() * 1.6)), p2 = add(p1, mul(d, 2.3 + rnd() * 1.6));
    if (!inside(p1) || !inside(p2)) continue;
    const all = [p0, p1, p2];
    for (let k = 0; k < 2; k++) {
      for (let tt = 0; tt < 80; tt++) {
        const c = P(M + 0.6 + rnd() * (W - 2 * M - 1.2), M + 0.6 + rnd() * (H - 2 * M - 1.2));
        if (all.every(p => dist(p, c) >= 1.8)) { all.push(c); break; }
      }
    }
    if (all.length < 5) continue;
    let good = true;
    for (let a = 0; a < 5 && good; a++) for (let b = a + 1; b < 5 && good; b++) for (let c = b + 1; c < 5 && good; c++) {
      if (!(a === 0 && b === 1 && c === 2) && minHeight(all[a], all[b], all[c]) < 1.1) good = false;
    }
    if (good) pts = all;
  }
  // Tên điểm: A, B, C… theo thứ tự ngẫu nhiên (không lộ ba điểm nào thẳng hàng).
  const order = [0, 1, 2, 3, 4].sort(() => rnd() - 0.5);
  const grains = order.map((i, k) => ({ p: pts[i], name: m.letters[k], good: i <= 2 }));
  const ansNames = grains.filter(g => g.good).map(g => g.name).sort();
  m.geo = { grains: grains.map(g => ({ ...g.p, name: g.name, good: g.good })) };
  const sc = makeScene(stageEl, { W, H, rnd });
  const labelAt = (g) => {
    let best = null, bestD = -1;
    for (let a = 0; a < 360; a += 45) {
      const c = add(g.p, mul(dirOf(a - 90), 0.62));
      const dmin = Math.min(...grains.filter(x => x !== g).map(x => dist(x.p, c)), inBox(c, W, H, -0.5) ? 9 : 0);
      if (dmin > bestD) { bestD = dmin; best = c; }
    }
    return best;
  };
  sc.put('fig', grains.map((g, i) => {
    const l = labelAt(g);
    return `<g class="g2a-grain" data-g="${i}">
      <circle class="g2a-grain-ring" cx="${u(g.p.x)}" cy="${u(g.p.y)}" r="${u(0.5)}"/>
      ${sugarSvg(g.p.x * U, g.p.y * U, 0.52 * U, rnd() * 60 - 30)}
      <circle cx="${u(g.p.x)}" cy="${u(g.p.y)}" r="${u(0.07)}" fill="${INK}"/>
      <circle cx="${u(g.p.x)}" cy="${u(g.p.y)}" r="${u(0.75)}" fill="transparent"/>
      ${letterSvg(l.x * U, l.y * U, g.name, FS)}
    </g>`;
  }).join(''));
  // Kiến đợi ở góc xa các hạt đường nhất.
  const corners = [P(M + 0.2, M + 0.2), P(W - M - 0.2, M + 0.2), P(M + 0.2, H - M - 0.2), P(W - M - 0.2, H - M - 0.2)];
  const home = corners.sort((a, b) => Math.min(...pts.map(p => dist(p, b))) - Math.min(...pts.map(p => dist(p, a))))[0];
  const ant = addAnt(sc, home, angOf(home, P(W / 2, H / 2)));

  const picked = [];
  let locked = false;
  const paint = () => sc.svg.querySelectorAll('[data-g]').forEach(el => el.classList.toggle('g2a-picked', picked.includes(Number(el.dataset.g))));
  sc.svg.addEventListener('click', (e) => {
    const el = e.target.closest('[data-g]');
    if (!el || locked) return;
    const i = Number(el.dataset.g);
    const at = picked.indexOf(i);
    if (at >= 0) picked.splice(at, 1);
    else { picked.push(i); if (picked.length > 3) picked.shift(); }
    sfx.tap();
    paint();
  });
  const go = doneBtn('🧵 Căng chỉ');
  go.onclick = async () => {
    if (picked.length !== 3) {
      speak(`${cap(n.you)} chạm vào đúng 3 hạt đường trước đã!`, null, '👉 Chạm vào <b>3 hạt đường</b>!');
      hint(sc.layer('fig'));
      return;
    }
    locked = true;
    go.disabled = true;
    // Sợi chỉ nối ba hạt theo thứ tự trên đường đi (hai hạt xa nhau nhất ở hai đầu).
    const ps = picked.map(i => grains[i]);
    let far = [0, 1];
    for (const [a, b] of [[0, 1], [0, 2], [1, 2]]) if (dist(ps[a].p, ps[b].p) > dist(ps[far[0]].p, ps[far[1]].p)) far = [a, b];
    const axis = sub(ps[far[1]].p, ps[far[0]].p);
    const seq = [...ps].sort((a, b) => dot(sub(a.p, ps[far[0]].p), axis) - dot(sub(b.p, ps[far[0]].p), axis));
    const right = ps.every(g => g.good);
    sfx.swish();
    sc.put('over', `<path class="g2a-thread${right ? '' : ' g2a-thread-bent'}" pathLength="1" d="${polyD(seq.map(g => g.p))}" fill="none" stroke="#E5484D" stroke-width="${u(0.09)}" stroke-linecap="round" stroke-linejoin="round"/>`);
    await sleep(750);
    const names = ansNames.join(', ');
    const fact = `Ba điểm <b>${names}</b> thẳng hàng: cả ba cùng nằm trên một đường thẳng.`;
    if (right) {
      const path = [home, seq[0].p, seq[1].p, seq[2].p];
      await walk(ant, path, { speed: 3.6, onVertex: (i) => { if (i >= 1) { sfx.pop(i * 2); sc.svg.querySelector(`[data-g="${grains.indexOf(seq[i - 1])}"]`)?.classList.add('g2a-ok'); } } });
      return ok(fact, `Chỉ căng thẳng tắp, ${n.me} đi một mạch rồi!`);
    }
    // Sai: chỉ bị gấp khúc; hiện đường thẳng đúng (nét đứt xanh, kéo dài hai phía).
    const good = grains.filter(g => g.good);
    const d = norm(sub(good[2].p, good[0].p));
    let a = good[0].p, b = good[0].p;
    for (const g of good) { if (dot(sub(g.p, a), d) < 0) a = g.p; if (dot(sub(g.p, b), d) > 0) b = g.p; }
    sc.put('over', `<line class="g2a-ghost" x1="${u(a.x - d.x * 1.2)}" y1="${u(a.y - d.y * 1.2)}" x2="${u(b.x + d.x * 1.2)}" y2="${u(b.y + d.y * 1.2)}" stroke="#16A34A" stroke-width="${u(0.1)}" stroke-dasharray="${u(0.25)} ${u(0.18)}" stroke-linecap="round"/>`);
    grains.forEach((g, i) => { if (g.good) sc.svg.querySelector(`[data-g="${i}"]`)?.classList.add('g2a-want'); });
    bad('Sợi chỉ bị gấp rồi!', fact, 'Đặt mép thước qua hai hạt đường, xem hạt thứ ba có nằm đúng mép thước không.');
  };
  speak(`${cap(n.me)} muốn đi thẳng một mạch qua 3 hạt đường. ${cap(n.you)} chạm vào 3 hạt đường thẳng hàng rồi căng chỉ!`, null,
    `👉 Chạm ${WANT('3 hạt đường thẳng hàng')}!`);
}

// ── Đoạn thẳng, đường thẳng, đường cong ──
function levelKind({ m, n, speak, ok, bad, hint, doneBtn, stageEl, rnd }) {
  const { W, H, land } = boxFor(stageEl, { area: 100 });
  const Lu = land ? W : H, Lv = land ? H : W;
  const mp = (uu, vv) => (land ? P(uu, vv) : P(vv, uu));
  const bh = (Lv - 2 * M) / 3;
  const kinds = ['doan', 'duong', 'cong'].sort(() => rnd() - 0.5);
  const paths = kinds.map((k, i) => {
    const vc = M + (i + 0.5) * bh;
    const tilt = (rnd() - 0.5) * bh * 0.5;
    if (k === 'doan') {
      const len = Math.min(Lu - 2 * M - 2.5, 4.5 + rnd() * 2.5);
      const u0 = M + 1 + rnd() * (Lu - 2 * M - 2 - len);
      const a = mp(u0, vc - tilt / 2), b = mp(u0 + len, vc + tilt / 2);
      return { k, pts: [a, b], marks: [a, b], names: m.seg.split('') };
    }
    if (k === 'duong') {
      const u1 = M + 1.5 + rnd() * (Lu - 2 * M - 7), u2 = u1 + 3 + rnd() * 2;
      const slope = tilt / Lu;
      const v = (uu) => vc + (uu - Lu / 2) * slope;
      return { k, pts: [mp(0.1, v(0.1)), mp(Lu - 0.1, v(Lu - 0.1))], marks: [mp(u1, v(u1)), mp(u2, v(u2))], names: m.line.split('') };
    }
    const amp = bh * (0.22 + rnd() * 0.1), per = 3.2 + rnd() * 1.6, ph = rnd() * 6.28;
    const pts = [];
    for (let uu = M + 0.5; uu <= Lu - M - 0.5 + 1e-6; uu += 0.2) pts.push(mp(uu, vc + amp * Math.sin((2 * Math.PI * uu) / per + ph)));
    return { k, pts, marks: [], names: [] };
  });
  m.geo = { kinds };
  const sc = makeScene(stageEl, { W, H, rnd });
  const off = land ? P(0, -0.6) : P(-0.6, 0);
  sc.put('fig', paths.map((p, i) => `<g class="g2a-path" data-p="${i}">
      <path class="g2a-path-line" d="${polyD(p.pts)}" fill="none" stroke="${INK}" stroke-width="${u(0.1)}" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="${polyD(p.pts)}" fill="none" stroke="transparent" stroke-width="${u(Math.min(1.2, bh * 0.9))}" stroke-linecap="round"/>
      ${p.marks.map((q2, j) => `<circle cx="${u(q2.x)}" cy="${u(q2.y)}" r="${u(0.11)}" fill="${INK}"/>${letterSvg((q2.x + off.x) * U, (q2.y + off.y) * U, p.names[j], FS * 0.9)}`).join('')}
    </g>`).join(''));
  let pick = null, locked = false;
  sc.svg.addEventListener('click', (e) => {
    const el = e.target.closest('[data-p]');
    if (!el || locked) return;
    pick = Number(el.dataset.p);
    sfx.tap();
    sc.svg.querySelectorAll('[data-p]').forEach(x => x.classList.toggle('g2a-picked', x === el));
  });
  const nameOf = (p) => (p.k === 'cong' ? KIND.cong : `${KIND[p.k]} ${p.names.join('')}`);
  const go = doneBtn('✓ Chọn xong');
  go.onclick = async () => {
    if (pick == null) { speak(`Chạm vào ${KIND[m.want]} trước đã!`, null, `👉 Chạm vào ${WANT(KIND[m.want])}!`); hint(sc.layer('fig')); return; }
    locked = true;
    go.disabled = true;
    const p = paths[pick];
    const ant = addAnt(sc, p.pts[0], angOf(p.pts[0], p.pts[1]), { cls: 'g2a-pop-in' });
    await walk(ant, p.pts, { speed: 4 });
    // Tên cả ba đường hiện ra (dưới / bên cạnh mỗi đường).
    const tagOff = land ? P(0, bh * 0.36) : P(bh * 0.36, 0);
    paths.forEach((pp, i) => {
      const c = centroid(pp.marks.length ? pp.marks : pp.pts);
      const at = add(land ? P(c.x, M + (i + 0.5) * bh) : P(M + (i + 0.5) * bh, c.y), tagOff);
      sc.put('top', tagSvg(at.x * U, at.y * U, nameOf(pp), FS * 0.8, pp.k === m.want ? '#16A34A' : INK, 'g2a-pop'));
    });
    const want = paths.find(x => x.k === m.want);
    const fact = `Đây là <b>${nameOf(want)}</b>. ${{
      doan: 'Đoạn thẳng có hai đầu là hai điểm.',
      duong: 'Đường thẳng kéo dài mãi về hai phía, không có điểm đầu, điểm cuối.',
      cong: 'Đường cong uốn lượn, không thẳng.',
    }[m.want]}`;
    if (p.k === m.want) { sc.svg.querySelector(`[data-p="${pick}"]`).classList.add('g2a-ok'); return ok(fact); }
    sc.svg.querySelector(`[data-p="${pick}"]`).classList.add('g2a-no');
    sc.svg.querySelector(`[data-p="${paths.indexOf(want)}"]`).classList.add('g2a-want');
    bad(`Đó là ${nameOf(p)} cơ!`, fact, 'Đoạn thẳng có hai điểm ở hai đầu. Đường thẳng đi qua hai điểm và kéo dài ra mãi. Đường cong thì uốn lượn.');
  };
  speak(`${cap(n.me)} muốn bò trên một ${KIND[m.want]}. ${cap(n.you)} chạm vào ${KIND[m.want]} rồi bấm chọn xong!`, null,
    `${cap(n.me)} muốn bò trên ${WANT(KIND[m.want])}!`);
}

// ════ Cấp 2: đo cành cây, độ dài đường gấp khúc ═════════════════════════════════════════════════
const PPM = U / 10, RPAD = 3, RH = 1.1; // thước: px mỗi mm, lề hai đầu (mm), bề cao (cm)
const rulerW = (cm) => (cm * 10 + RPAD * 2) / 10; // bề dài thước (cm)
/** Thước có vạch 0 ở gốc toạ độ, mép có vạch nằm trên trục x, thân thước ở phía +y. */
const rulerG = (cm) => `<g class="g2a-ruler-in">${rulerSvg(-RPAD * PPM, 0, { cm, ppm: PPM, pad: RPAD, h: RH * U })}</g>`;
/** Bốn góc thước (cm) khi đặt vạch 0 ở e, quay deg độ. */
const rulerRect = (e, deg, cm) => {
  const d = dirOf(deg), nn = perp(d), a = add(e, mul(d, -RPAD / 10)), L = rulerW(cm);
  return [a, add(a, mul(d, L)), add(add(a, mul(d, L)), mul(nn, RH)), add(a, mul(nn, RH))];
};

function levelMeasure({ m, n, speak, row, ask, ok, bad, hint, stageEl, rnd }) {
  const cm = Math.max(m.L + 1, 9);
  const { W, H } = boxFor(stageEl, { area: 100, minW: rulerW(cm) + 2 * M + 0.4 });
  const restE = P(M + 0.2 + RPAD / 10, H - M - RH - 0.1);
  let A, B, E, deg;
  for (let t = 0; t < 4000; t++) {
    const a = P(M + 0.5 + rnd() * (W - 2 * M - 1), M + 0.5 + rnd() * (H - 2 * M - RH - 1.8));
    const b = add(a, mul(dirOf(rnd() * 360), m.L));
    if (!inBox(b, W, H, 0.5) || b.y > H - M - RH - 1.2) continue;
    // Vạch 0 đặt ở đầu nào để số trên thước đứng thẳng (không lộn ngược).
    const dd = angOf(a, b);
    const [e, g] = Math.abs(dd) <= 90 ? [a, dd] : [b, angOf(b, a)];
    if (rulerRect(e, g, cm).every(p => p.x > 0.15 && p.x < W - 0.15 && p.y > 0.15 && p.y < H - 0.15)) { A = a; B = b; E = e; deg = g; break; }
  }
  m.geo = { A, B };
  const sc = makeScene(stageEl, { W, H, rnd });
  const [nA, nB] = m.name.split('');
  // Tên hai đầu nằm phía không có thân thước (thước đặt xuống không che chữ).
  const ax = norm(sub(B, A)), away = mul(perp(dirOf(deg)), -0.62);
  const labA = add(add(A, away), mul(ax, -0.25)), labB = add(add(B, away), mul(ax, 0.25));
  sc.put('fig', `<g class="g2a-twig" data-twig>${twigSvg([A, B])}
      <path d="${polyD([A, B])}" stroke="transparent" stroke-width="${u(1)}" stroke-linecap="round"/></g>
    ${letterSvg(labA.x * U, labA.y * U, nA, FS)}${letterSvg(labB.x * U, labB.y * U, nB, FS)}`);
  const ruler = sc.put('over', rulerG(cm));
  ruler.setAttribute('class', 'g2a-ruler');
  setPose(ruler, restE, 0);
  let placed = false, locked = false;
  const place = async () => {
    if (placed) return;
    placed = true;
    sfx.swish();
    const t0 = performance.now(), T = 750;
    await new Promise((res) => {
      const f = (now) => {
        const k = Math.min(1, (now - t0) / T), e = 1 - (1 - k) ** 3;
        setPose(ruler, add(restE, mul(sub(E, restE), e)), deg * e);
        if (k < 1) requestAnimationFrame(f); else res();
      };
      requestAnimationFrame(f);
    });
    sfx.pop(5);
    speak(`Đọc số ở đầu kia của cành cây rồi gõ số!`, null, `Cành cây ${WANT(m.name)} dài ${WANT('mấy xăng-ti-mét')}?`);
    askLen();
  };
  sc.svg.addEventListener('click', (e) => {
    if (locked || placed) return;
    if (e.target.closest('.g2a-ruler') || e.target.closest('[data-twig]')) place();
  });
  const askLen = () => ask(row(twigIcon(), `Cành cây ${m.name}`, `${Q} cm`, true), 'cm', async (v, pad) => {
    pad.lock();
    locked = true;
    // Kiểm chứng: kiến bò từ đầu vạch 0, mỗi xăng-ti-mét hiện một số đếm.
    const other = E === A ? B : A;
    const ant = addAnt(sc, E, angOf(E, other), { cls: 'g2a-pop-in' });
    const side = mul(norm(perp(sub(other, E))), -0.55);
    await walk(ant, [E, other], {
      speed: 2.6,
      onCm: (k, p) => { sfx.pop(Math.min(9, k)); sc.put('top', tagSvg((p.x + side.x) * U, (p.y + side.y) * U, String(k), FS * 0.7, '#B45309', 'g2a-pop')); },
    });
    const fact = `Cành cây ${m.name} dài <b>${m.L} cm</b>: một đầu ở vạch 0, đầu kia ở vạch ${m.L} của thước.`;
    if (v === m.L) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng ${m.L} xăng-ti-mét rồi!`); }
    pad.lock('g3g-keypad-bad');
    bad(`Cành cây dài ${m.L} xăng-ti-mét cơ!`, fact, 'Vạch 0 của thước trùng với một đầu cành cây. Đọc số ở đầu kia.');
  });
  speak(`${cap(n.you)} đo giúp ${n.me} cành cây ${m.name} dài bao nhiêu xăng-ti-mét. Chạm vào thước để đặt thước lên cành cây!`, null,
    `👉 Chạm vào ${WANT('thước')} để đo cành cây!`);
  setTimeout(() => { if (!placed) hint(ruler.firstElementChild); }, 1200);
}

/**
 * Đường gấp khúc có độ dài các đoạn `lens` (cm), đi dần theo trục dài của cảnh, không tự cắt, góc gấp rõ.
 * start: điểm đầu (nếu có). Trả về mảng điểm hoặc null.
 */
function makePoly(rnd, lens, W, H, { start = null, pad = 0.7, land = W >= H } = {}) {
  for (let t = 0; t < 4000; t++) {
    const free = t > 1500; // khó xếp thì cho đi mọi hướng (đường gấp khúc gập lại)
    const p0 = start || (land ? P(M + pad + rnd() * 1.5, M + pad + rnd() * (H - 2 * M - 2 * pad)) : P(M + pad + rnd() * (W - 2 * M - 2 * pad), M + pad + rnd() * 1.5));
    const base = land ? 0 : 90;
    let sign = rnd() < 0.5 ? 1 : -1;
    const pts = [p0];
    let good = true;
    for (const L of lens) {
      const a = free ? rnd() * 360 : base + sign * (15 + rnd() * 50);
      sign = rnd() < 0.8 ? -sign : sign;
      const p = add(pts[pts.length - 1], mul(dirOf(a), L));
      if (!inBox(p, W, H, pad)) { good = false; break; }
      pts.push(p);
    }
    if (!good) continue;
    let angles = true;
    for (let i = 1; i < pts.length - 1; i++) { const g = inner(pts[i - 1], pts[i], pts[i + 1]); if (g < 45 || g > 150) angles = false; }
    if (angles && polyOk(pts)) return pts;
  }
  return null;
}

function levelTotal({ m, n, speak, row, ask, ok, bad, say, stageEl, rnd }) {
  const { W, H, land } = boxFor(stageEl, { area: 120 });
  const pts = makePoly(rnd, m.lens, W, H, { land });
  if (!pts) throw new Error(`poly ${m.lens} ${W}x${H}`);
  m.geo = { pts };
  const sc = makeScene(stageEl, { W, H, rnd });
  const c = centroid(pts);
  const names = m.name.split('');
  const sum = sumOf(m.lens);
  sc.put('fig', twigSvg(pts)
    + pts.map((p, i) => { const l = vertexLabel(pts, i, i === pts.length - 1 ? 1.05 : 0.55); return letterSvg(l.x * U, l.y * U, names[i], FS); }).join('')
    + m.lens.map((L, i) => { const l = segLabel(pts[i], pts[i + 1], c, 0.55); return tagSvg(l.x * U, l.y * U, `${L} cm`, FS * 0.8); }).join(''));
  const end = pts[pts.length - 1];
  sc.put('fig', nestSvg(end.x * U, end.y * U, 0.62 * U));
  const ant = addAnt(sc, pts[0], angOf(pts[0], pts[1]), { carry: true });
  ask(row(antIcon(26, 0), `Đường gấp khúc ${m.name}`, `${Q} cm`, true), 'cm', async (v, pad) => {
    pad.lock();
    // Kiểm chứng: kiến đi từng đoạn, bảng cộng dần độ dài.
    const expr = (k) => m.lens.slice(0, k).map(L => `${L} cm`).join(' + ');
    say('🐜 …');
    await walk(ant, pts, {
      speed: Math.max(3.4, sum / 5),
      onVertex: (i) => { sfx.pop(i * 2); say(`${expr(i)}${i === m.lens.length ? ` = <b class="g2a-ans">${sum} cm</b>` : ''}`); },
    });
    ant.classList.add('g2a-into-nest');
    const fact = `Độ dài đường gấp khúc ${m.name}: ${expr(m.lens.length)} = <b>${sum} cm</b>.`;
    if (v === sum) { pad.lock('g3g-keypad-ok'); return ok(fact, `Về tới tổ rồi! Đường dài ${sum} xăng-ti-mét.`); }
    pad.lock('g3g-keypad-bad');
    bad(`Đường dài ${sum} xăng-ti-mét cơ!`, fact, 'Cộng độ dài từng đoạn thẳng của đường gấp khúc.');
  });
  speak(`${cap(n.me)} tha mồi về tổ theo đường gấp khúc ${m.name}. Đường đó dài bao nhiêu xăng-ti-mét?`, null,
    `Đường gấp khúc ${WANT(m.name)} dài ${WANT('mấy xăng-ti-mét')}?`);
}

// ════ Cấp 3: đường ngắn hơn, hình tứ giác ═══════════════════════════════════════════════════════
const ROUTES = [{ key: 'do', name: 'đỏ', color: '#E5484D', dark: '#B42318' }, { key: 'xanh', name: 'xanh', color: '#2F7FD8', dark: '#1D4F91' }];

/** Hai giao điểm của hai đường tròn (tâm a bán kính r1, tâm b bán kính r2). */
function circles(a, r1, b, r2) {
  const d = dist(a, b);
  if (d > r1 + r2 - 0.05 || d < Math.abs(r1 - r2) + 0.05) return [];
  const x = (d * d + r1 * r1 - r2 * r2) / (2 * d), h = Math.sqrt(Math.max(0, r1 * r1 - x * x));
  const e = norm(sub(b, a)), mid = add(a, mul(e, x)), nn = perp(e);
  return [add(mid, mul(nn, h)), add(mid, mul(nn, -h))];
}

function levelShorter({ m, n, speak, ok, bad, hint, doneBtn, say, stageEl, rnd }) {
  const { W, H, land } = boxFor(stageEl, { area: 118 });
  const S = land ? P(M + 0.5, H / 2 + (rnd() - 0.5) * 0.8) : P(W / 2 + (rnd() - 0.5) * 0.8, M + 0.5);
  const N = land ? P(W - M - 0.8, H / 2 + (rnd() - 0.5) * 0.8) : P(W / 2 + (rnd() - 0.5) * 0.8, H - M - 0.8);
  const axis = norm(sub(N, S)), nrm = perp(axis);
  const sideOf = (p) => dot(sub(p, S), nrm);
  const route = (side) => {
    for (let t = 0; t < 600; t++) {
      const L1 = 2 + Math.floor(rnd() * 6), L2 = 2 + Math.floor(rnd() * 7), L3 = 2 + Math.floor(rnd() * 7);
      const a1 = ((20 + rnd() * 50) * Math.PI) / 180;
      const P1 = add(S, mul(add(mul(axis, Math.cos(a1)), mul(nrm, side * Math.sin(a1))), L1));
      const cands = circles(P1, L2, N, L3).filter(p => sideOf(p) * side > 0.8);
      if (!cands.length || sideOf(P1) * side < 0.8) continue;
      const P2 = cands.sort((a, b) => Math.abs(sideOf(b)) - Math.abs(sideOf(a)))[0];
      const pts = [S, P1, P2, N];
      if (!pts.every(p => inBox(p, W, H, 0.35))) continue;
      const g1 = inner(S, P1, P2), g2 = inner(P1, P2, N);
      if (g1 < 50 || g1 > 160 || g2 < 50 || g2 > 160) continue;
      if (!polyOk(pts)) continue;
      return { pts, lens: [L1, L2, L3] };
    }
    return null;
  };
  let rs = null;
  for (let t = 0; t < 200 && !rs; t++) {
    const a = route(-1), b = a && route(1);
    if (!a || !b) continue;
    const d = Math.abs(sumOf(a.lens) - sumOf(b.lens));
    if (d >= 1 && d <= 3) rs = [a, b];
  }
  const routes = ROUTES.map((r, i) => ({ ...r, ...rs[i], sum: sumOf(rs[i].lens) }));
  const best = routes[0].sum < routes[1].sum ? 0 : 1;
  m.geo = { routes: routes.map(r => ({ key: r.key, sum: r.sum, lens: r.lens })), best: routes[best].key };
  const sc = makeScene(stageEl, { W, H, rnd });
  const c = mul(add(S, N), 0.5);
  sc.put('fig', routes.map((r, i) => `<g class="g2a-route" data-r="${i}">
      <path class="g2a-route-glow" d="${polyD(r.pts)}" fill="none" stroke="#FACC15" stroke-width="${u(0.5)}" stroke-linecap="round" stroke-linejoin="round"/>
      ${twigSvg(r.pts, { color: r.color, dots: false })}
      <path d="${polyD(r.pts)}" fill="none" stroke="transparent" stroke-width="${u(1.1)}" stroke-linecap="round" stroke-linejoin="round"/>
      ${r.lens.map((L, k) => { const l = segLabel(r.pts[k], r.pts[k + 1], c, 0.5); return tagSvg(l.x * U, l.y * U, `${L} cm`, FS * 0.78, r.dark); }).join('')}
    </g>`).join('') + nestSvg(N.x * U, N.y * U, 0.62 * U));
  const ant = addAnt(sc, S, angOf(S, N), { carry: true });
  let pick = null, locked = false;
  sc.svg.addEventListener('click', (e) => {
    const el = e.target.closest('[data-r]');
    if (!el || locked) return;
    pick = Number(el.dataset.r);
    sfx.tap();
    sc.svg.querySelectorAll('[data-r]').forEach(x => x.classList.toggle('g2a-picked', x === el));
  });
  const go = doneBtn('✓ Chọn xong');
  const expr = (r) => `${r.lens.map(L => `${L} cm`).join(' + ')} = ${r.sum} cm`;
  go.onclick = async () => {
    if (pick == null) { speak('Chạm vào một đường trước đã!', null, '👉 Chạm vào <b>đường đỏ</b> hoặc <b>đường xanh</b>!'); hint(sc.layer('fig')); return; }
    locked = true;
    go.disabled = true;
    // Kiểm chứng: hai kiến đi cùng tốc độ trên hai đường, đường ngắn hơn về tổ trước.
    ant.remove();
    const ants = routes.map(r => addAnt(sc, S, angOf(r.pts[0], r.pts[1]), { carry: true }));
    const speed = Math.max(routes[0].sum, routes[1].sum) / 5;
    say(`<span class="g2a-race">🔴 …</span><span class="g2a-race">🔵 …</span>`);
    const spans = () => board().querySelectorAll('.g2a-race');
    const board = () => stageEl.closest('.g2a-bench').querySelector('[data-board]');
    let first = null;
    await Promise.all(routes.map((r, i) => walk(ants[i], r.pts, {
      speed,
      onVertex: (k) => {
        if (k === r.lens.length) {
          first ??= i;
          sfx.pop(first === i ? 9 : 4);
          spans()[i].innerHTML = `${i ? '🔵' : '🔴'} ${expr(r)}${first === i ? ' 🏁' : ''}`;
          ants[i].classList.add('g2a-into-nest');
        }
      },
    })));
    const fact = `Đường ${routes[best].name} ngắn hơn. Đường đỏ: ${expr(routes[0])}. Đường xanh: ${expr(routes[1])}.`;
    if (pick === best) { sc.svg.querySelector(`[data-r="${pick}"]`).classList.add('g2a-ok'); return ok(fact, `Đường ${routes[best].name} về tổ nhanh hơn!`); }
    sc.svg.querySelector(`[data-r="${pick}"]`).classList.add('g2a-no');
    bad(`Đường ${routes[best].name} ngắn hơn cơ!`, fact, 'Cộng độ dài từng đoạn của mỗi đường rồi so sánh hai tổng.');
  };
  speak(`Có hai đường về tổ. ${cap(n.you)} cộng độ dài từng đoạn rồi chọn giúp ${n.me} đường ngắn hơn!`, null,
    `Đường nào ${WANT('ngắn hơn')}?`);
}

// ── Sỏi hình tứ giác ──
const STONE_FILL = ['#CBD5E1', '#E2C9A6', '#C7DDB5', '#D9C6E8', '#F3D1B0', '#BFD7EA'];
function stonePoly(type, R, rnd) {
  const ring = (angs, rr) => angs.map((a, i) => mul(dirOf(a), Array.isArray(rr) ? rr[i] : rr));
  const jit = (k) => (rnd() - 0.5) * k;
  switch (type) {
    case 'square': return ring([45, 135, 225, 315], R);
    case 'rect': { const w = R * 1.05, h = R * 0.6; return [P(-w, -h), P(w, -h), P(w, h), P(-w, h)]; }
    case 'rhombus': return [P(R, 0), P(0, R * 0.68), P(-R, 0), P(0, -R * 0.68)];
    case 'trap': return [P(-R * 0.5, -R * 0.62), P(R * 0.55, -R * 0.62), P(R * 1.02, R * 0.62), P(-R * 1.02, R * 0.62)];
    case 'para': return [P(-R * 0.55, -R * 0.6), P(R * 1.02, -R * 0.6), P(R * 0.55, R * 0.6), P(-R * 1.02, R * 0.6)];
    case 'quad': return ring([0, 90, 180, 270].map(a => a + jit(40)), [0, 1, 2, 3].map(() => R * (0.72 + rnd() * 0.3)));
    case 'tri': return ring([-90, 30, 150].map(a => a + jit(36)), [0, 1, 2].map(() => R * (0.85 + rnd() * 0.2)));
    case 'penta': return ring([0, 72, 144, 216, 288].map(a => a - 90 + jit(16)), R * 0.95);
    case 'hexa': return ring([0, 60, 120, 180, 240, 300].map(a => a + jit(10)), R * 0.92);
    default: return null; // tròn / bầu dục
  }
}
const QUADS = ['square', 'rect', 'rhombus', 'trap', 'para', 'quad'];
const NOT_QUADS = ['tri', 'tri', 'penta', 'hexa', 'round'];

function levelQuad({ m, n, speak, ok, bad, hint, doneBtn, stageEl, rnd }) {
  const { W, H, land } = boxFor(stageEl, { area: 108 });
  const cols = land ? 4 : 2, rows = land ? 2 : 4;
  const cw = (W - 2 * M - 1.2) / cols, ch = (H - 2 * M - 0.6) / rows;
  const R = Math.min(cw, ch) * 0.36;
  const nq = rnd() < 0.5 ? 3 : 4;
  const types = [...[...QUADS].sort(() => rnd() - 0.5).slice(0, nq), ...[...NOT_QUADS].sort(() => rnd() - 0.5).slice(0, cols * rows - nq)]
    .sort(() => rnd() - 0.5);
  const stones = types.map((type, i) => {
    const cx = M + 0.6 + (i % cols + 0.5) * cw + (rnd() - 0.5) * cw * 0.15;
    const cy = M + 0.3 + (Math.floor(i / cols) + 0.5) * ch + (rnd() - 0.5) * ch * 0.15;
    const rot = rnd() * 360, poly = stonePoly(type, R, rnd);
    const pts = poly && poly.map(p => { const d = dirOf(rot); return P(cx + p.x * d.x - p.y * d.y, cy + p.x * d.y + p.y * d.x); });
    return { type, c: P(cx, cy), pts, quad: QUADS.includes(type), ry: R * (0.7 + rnd() * 0.3), rot, fill: STONE_FILL[Math.floor(rnd() * STONE_FILL.length)] };
  });
  m.geo = { quads: stones.map((s2, i) => (s2.quad ? i : -1)).filter(i => i >= 0) };
  const sc = makeScene(stageEl, { W, H, rnd, water: true });
  sc.put('fig', stones.map((st, i) => `<g class="g2a-stone" data-s="${i}">
      ${st.pts
    ? `<polygon points="${st.pts.map(p => `${u(p.x)},${u(p.y)}`).join(' ')}" fill="${st.fill}" stroke="${INK}" stroke-width="${u(0.08)}" stroke-linejoin="round"/>`
    : `<ellipse cx="${u(st.c.x)}" cy="${u(st.c.y)}" rx="${u(R)}" ry="${u(st.ry)}" transform="rotate(${f1(st.rot)} ${u(st.c.x)} ${u(st.c.y)})" fill="${st.fill}" stroke="${INK}" stroke-width="${u(0.08)}"/>`}
      <circle cx="${u(st.c.x)}" cy="${u(st.c.y)}" r="${u(R * 1.15)}" fill="transparent"/>
      <text class="g2a-check" x="${u(st.c.x)}" y="${u(st.c.y + 0.22)}" text-anchor="middle" font-size="${u(0.6)}">✔</text>
    </g>`).join(''));
  const picked = new Set();
  let locked = false;
  sc.svg.addEventListener('click', (e) => {
    const el = e.target.closest('[data-s]');
    if (!el || locked) return;
    const i = Number(el.dataset.s);
    if (picked.has(i)) picked.delete(i); else picked.add(i);
    el.classList.toggle('g2a-picked', picked.has(i));
    sfx.tap();
  });
  const go = doneBtn('✓ Chọn xong');
  go.onclick = async () => {
    if (!picked.size) { speak('Chạm vào các hòn sỏi hình tứ giác trước đã!', null, '👉 Chạm vào <b>sỏi tứ giác</b>!'); hint(sc.layer('fig')); return; }
    locked = true;
    go.disabled = true;
    // Kiểm chứng: đếm đỉnh từng hòn sỏi (mọi hòn cùng lúc), rồi hòn nào có 4 đỉnh thì sáng xanh.
    for (let k = 0; k < 6; k++) {
      let any = false;
      stones.forEach((st) => {
        const p = st.pts?.[k];
        if (!p) return;
        any = true;
        const o = add(p, mul(norm(sub(p, st.c)), 0.26));
        sc.put('top', `<g class="g2a-pop"><circle cx="${u(o.x)}" cy="${u(o.y)}" r="${u(0.2)}" fill="#F59E0B" stroke="#fff" stroke-width="2"/><text x="${u(o.x)}" y="${u(o.y + 0.1)}" text-anchor="middle" font-family="Quicksand, sans-serif" font-weight="800" font-size="${u(0.28)}" fill="#fff">${k + 1}</text></g>`);
      });
      if (!any) break;
      sfx.pop(k * 2);
      await sleep(420);
    }
    let right = true;
    stones.forEach((st, i) => {
      const el = sc.svg.querySelector(`[data-s="${i}"]`);
      if (st.quad && picked.has(i)) el.classList.add('g2a-ok');
      else if (st.quad) { el.classList.add('g2a-want'); right = false; } else if (picked.has(i)) { el.classList.add('g2a-no'); right = false; }
    });
    const nQ = stones.filter(x => x.quad).length;
    const fact = `Có <b>${nQ} hòn sỏi hình tứ giác</b>: mỗi hình tứ giác có 4 cạnh, 4 đỉnh.`;
    if (right) {
      const hops = stones.filter(x => x.quad).map(x => x.c).sort((a, b) => (land ? a.x - b.x : a.y - b.y));
      const from = land ? P(0.35, hops[0].y) : P(hops[0].x, 0.35);
      const ant = addAnt(sc, from, angOf(from, hops[0]), { cls: 'g2a-pop-in' });
      await walk(ant, [from, ...hops], { speed: 4.5, onVertex: (i) => sfx.pop(i * 2) });
      return ok(fact, `${cap(n.me)} nhảy qua vũng nước rồi!`);
    }
    bad('Chưa đúng các hòn sỏi tứ giác rồi!', fact, 'Hình tứ giác có 4 cạnh. Đếm số cạnh (số đỉnh) của từng hòn sỏi.');
  };
  speak(`${cap(n.me)} chỉ bước lên các hòn sỏi hình tứ giác để qua vũng nước. ${cap(n.you)} chạm vào tất cả các hòn sỏi hình tứ giác!`, null,
    `👉 Chạm vào các ${WANT('hòn sỏi hình tứ giác')}!`);
}

// ── Đếm hình tứ giác trong vườn chia ô ──
function levelCount({ m, n, speak, row, ask, ok, bad, stageEl, rnd }) {
  const { W, H, land } = boxFor(stageEl, { area: 100 });
  const Lu = land ? W : H, Lv = land ? H : W;
  const mp = (uu, vv) => (land ? P(uu, vv) : P(vv, uu));
  const w = Math.min(Lu - 2 * M - 0.8, 11), h = Math.min(Lv - 2 * M - 0.8, 5.6);
  const u0 = (Lu - w) / 2, v0 = (Lv - h) / 2;
  const at = (a, b) => mp(u0 + a * w, v0 + b * h); // a, b ∈ [0, 1]
  const rect = (a1, a2) => [at(a1, 0), at(a2, 0), at(a2, 1), at(a1, 1)];
  let cuts, quads, tri = null;
  const r = (lo, hi) => lo + rnd() * (hi - lo);
  if (m.cfg === 'strip2') { const a = r(0.35, 0.62); cuts = [[at(a, 0), at(a, 1)]]; quads = [rect(0, a), rect(a, 1), rect(0, 1)]; }
  else if (m.cfg === 'strip3') {
    const a = r(0.25, 0.38), b = r(0.58, 0.75);
    cuts = [[at(a, 0), at(a, 1)], [at(b, 0), at(b, 1)]];
    quads = [rect(0, a), rect(a, b), rect(b, 1), rect(0, b), rect(a, 1), rect(0, 1)];
  } else if (m.cfg === 'slant') {
    const a1 = r(0.3, 0.42), a2 = r(0.58, 0.7);
    const [t, b] = rnd() < 0.5 ? [a1, a2] : [a2, a1];
    cuts = [[at(t, 0), at(b, 1)]];
    quads = [[at(0, 0), at(t, 0), at(b, 1), at(0, 1)], [at(t, 0), at(1, 0), at(1, 1), at(b, 1)], rect(0, 1)];
  } else {
    const a = r(0.45, 0.62);
    cuts = [[at(0, 0), at(a, 1)]];
    tri = [at(0, 0), at(a, 1), at(0, 1)];
    quads = [[at(0, 0), at(1, 0), at(1, 1), at(a, 1)], rect(0, 1)];
  }
  const ans = quads.length;
  m.geo = { ans };
  const sc = makeScene(stageEl, { W, H, rnd });
  const whole = rect(0, 1);
  const ptsAttr = (ps) => ps.map(p => `${u(p.x)},${u(p.y)}`).join(' ');
  // Cây rau nhỏ trang trí trong vườn (xa hàng rào).
  const sprouts = [];
  for (let t = 0; t < 60 && sprouts.length < 9; t++) {
    const p = at(0.06 + rnd() * 0.88, 0.12 + rnd() * 0.76);
    if (cuts.every(([a, b]) => segDist(p, a, b) > 0.55) && sprouts.every(q2 => dist(q2, p) > 1)) sprouts.push(p);
  }
  sc.put('fig', `<polygon points="${ptsAttr(whole)}" fill="#CDEFC0"/>
    ${sprouts.map(p => `<path d="M${u(p.x)} ${u(p.y + 0.15)} q${u(-0.05)} ${u(-0.3)} ${u(-0.25)} ${u(-0.35)} M${u(p.x)} ${u(p.y + 0.15)} q${u(0.05)} ${u(-0.3)} ${u(0.25)} ${u(-0.35)}" fill="none" stroke="#4E8A3A" stroke-width="${u(0.07)}" stroke-linecap="round"/>`).join('')}
    <polygon points="${ptsAttr(whole)}" fill="none" stroke="#8B5A2B" stroke-width="${u(0.14)}" stroke-linejoin="round"/>
    ${cuts.map(([a, b]) => `<line x1="${u(a.x)}" y1="${u(a.y)}" x2="${u(b.x)}" y2="${u(b.y)}" stroke="#8B5A2B" stroke-width="${u(0.14)}" stroke-linecap="round"/>`).join('')}`);
  ask(row('🟩', 'Hình tứ giác', `${Q} hình`, true), 'hình', async (v, pad) => {
    pad.lock();
    // Kiểm chứng: sáng lần lượt từng hình tứ giác, kèm số đếm.
    for (let k = 0; k < quads.length; k++) {
      const c = centroid(quads[k]);
      const g = sc.put('over', `<polygon class="g2a-hl" points="${ptsAttr(quads[k])}" fill="#FDE047" fill-opacity=".55" stroke="#CA8A04" stroke-width="${u(0.12)}" stroke-linejoin="round"/>
        ${tagSvg(c.x * U, c.y * U, String(k + 1), FS * 1.1, '#B45309', 'g2a-pop')}`);
      sfx.pop(k * 2);
      await sleep(820);
      g.querySelector('.g2a-hl')?.setAttribute('fill-opacity', '0');
      g.querySelector('.g2a-hl')?.setAttribute('stroke-opacity', '0');
      g.querySelector('.g2a-tag')?.remove();
    }
    if (tri) {
      const c = centroid(tri);
      sc.put('over', `<polygon points="${ptsAttr(tri)}" fill="#FCA5A5" fill-opacity=".55" stroke="#DC2626" stroke-width="${u(0.1)}"/>${tagSvg(c.x * U, c.y * U, '3 cạnh', FS * 0.75, '#DC2626', 'g2a-pop')}`);
      await sleep(700);
    }
    const fact = `Trong vườn có <b>${ans} hình tứ giác</b>${m.cfg === 'corner' ? ' (mảnh có 3 cạnh là hình tam giác)' : ''}, tính cả hình ghép và cả mảnh vườn lớn.`;
    if (v === ans) { pad.lock('g3g-keypad-ok'); return ok(fact); }
    pad.lock('g3g-keypad-bad');
    bad(`Có ${ans} hình tứ giác cơ!`, fact, m.cfg === 'corner' ? 'Hình tứ giác có 4 cạnh. Mảnh có 3 cạnh là hình tam giác. Nhớ đếm cả mảnh vườn lớn.' : 'Đếm các ô nhỏ, rồi đếm cả hình ghép từ hai, ba ô và cả mảnh vườn lớn.');
  });
  speak(`Vườn rau nhà ${n.me} chia thành các ô bằng hàng rào. Trong hình có bao nhiêu hình tứ giác?`, null, `Có ${WANT('mấy hình tứ giác')}?`);
}

// ════ Cấp 4: vẽ đoạn thẳng ═════════════════════════════════════════════════════════════════════
/** Kéo để vẽ: onMove(p cm) khi kéo, onUp() khi nhả. */
function dragDraw(sc, { onMove, onUp }) {
  let on = false;
  sc.svg.classList.add('g2a-drawable');
  sc.svg.addEventListener('pointerdown', (e) => { if (sc.locked) return; on = true; sc.svg.setPointerCapture(e.pointerId); onMove(sc.at(e), true); e.preventDefault(); });
  sc.svg.addEventListener('pointermove', (e) => { if (on) onMove(sc.at(e), false); });
  const up = () => { if (!on) return; on = false; onUp?.(); };
  sc.svg.addEventListener('pointerup', up);
  sc.svg.addEventListener('pointercancel', up);
}

/** Kiểm chứng chung của cấp 4: kiến đi trên đoạn vừa vẽ, đếm từng xăng-ti-mét. */
async function walkCount(sc, A, B, side) {
  const ant = addAnt(sc, A, angOf(A, B), { cls: 'g2a-pop-in' });
  await walk(ant, [A, B], {
    speed: 2.8,
    onCm: (k, p) => { sfx.pop(Math.min(9, k)); sc.put('top', tagSvg((p.x + side.x) * U, (p.y + side.y) * U, String(k), FS * 0.7, '#B45309', 'g2a-pop')); },
  });
  return ant;
}

function levelRuler({ m, n, speak, ok, bad, hint, doneBtn, stageEl, rnd }) {
  // Khung dọc (điện thoại dựng đứng) hẹp: thước ngắn lại (tới 7 cm) cho vạch cm đủ to.
  const r0 = stageEl.getBoundingClientRect();
  const narrow = r0.width > 40 && r0.width < r0.height * 1.05;
  if (narrow && m.k > 7) m.k = 3 + ((m.k - 3) % 5);
  const { k } = m;
  const cm = narrow ? Math.max(k + 1, 7) : Math.max(k + 2, 10);
  const { W, H } = boxFor(stageEl, { area: 90, minW: rulerW(cm) + 2 * M + 0.6 });
  const A = P((W - rulerW(cm)) / 2 + RPAD / 10, H / 2 - 0.1);
  m.geo = { A, cm };
  const sc = makeScene(stageEl, { W, H, rnd });
  const ruler = sc.put('fig', rulerG(cm));
  setPose(ruler, P(A.x, A.y + 0.12), 0);
  const Y = A.y;
  sc.put('over', `<line data-line x1="${u(A.x)}" y1="${u(Y)}" x2="${u(A.x)}" y2="${u(Y)}" stroke="${INK}" stroke-width="${u(0.1)}" stroke-linecap="round"/>
    <circle cx="${u(A.x)}" cy="${u(Y)}" r="${u(0.11)}" fill="${INK}"/>
    <circle data-bdot cx="${u(A.x)}" cy="${u(Y)}" r="${u(0.11)}" fill="${INK}" opacity="0"/>
    ${letterSvg(A.x * U, (Y - 0.75) * U, 'A', FS)}
    <g data-blabel opacity="0">${letterSvg(0, 0, 'B', FS)}</g>
    <g data-pencil class="g2a-pencil"><g class="g2a-pencil-in">${pencilSvg(0, 0, U * 1.4)}</g></g>`);
  const line = sc.svg.querySelector('[data-line]'), bdot = sc.svg.querySelector('[data-bdot]');
  const blab = sc.svg.querySelector('[data-blabel]'), pencil = sc.svg.querySelector('[data-pencil]');
  let v = 0;
  const draw = () => {
    const x = A.x + v;
    line.setAttribute('x2', u(x));
    bdot.setAttribute('cx', u(x));
    bdot.setAttribute('opacity', v ? '1' : '0');
    blab.setAttribute('opacity', v ? '1' : '0');
    blab.setAttribute('transform', `translate(${u(x)} ${u(Y - 0.75)})`);
    pencil.setAttribute('transform', `translate(${u(x)} ${u(Y)})`);
  };
  draw();
  dragDraw(sc, {
    onMove: (p) => {
      const nv = Math.max(0, Math.min(cm, Math.round(p.x - A.x)));
      if (nv !== v) { v = nv; sfx.tap(); draw(); }
    },
  });
  const go = doneBtn('✓ Vẽ xong');
  go.onclick = async () => {
    if (!v) { speak('Kéo bút chì từ điểm A dọc theo mép thước!', null, '👉 Kéo <b>bút chì</b> từ điểm A!'); hint(pencil.firstElementChild); return; }
    sc.locked = true;
    go.disabled = true;
    const B = P(A.x + v, Y);
    await walkCount(sc, A, B, P(0, -1.35));
    const fact = `Đoạn thẳng AB dài <b>${k} cm</b>: điểm A ở vạch 0, điểm B ở vạch ${k} của thước.`;
    if (v === k) return ok(fact, `Cây cầu dài đúng ${k} xăng-ti-mét rồi!`);
    sc.put('over', `<line x1="${u(A.x)}" y1="${u(Y - 0.02)}" x2="${u(A.x + k)}" y2="${u(Y - 0.02)}" stroke="#16A34A" stroke-width="${u(0.1)}" stroke-dasharray="${u(0.22)} ${u(0.16)}"/>
      <circle cx="${u(A.x + k)}" cy="${u(Y)}" r="${u(0.14)}" fill="#16A34A"/>`);
    bad(`Đoạn ${n.you} vẽ dài ${v} xăng-ti-mét rồi!`, fact, 'Đặt điểm A ở vạch 0. Chấm điểm B đúng vạch số cần vẽ rồi nối A với B.');
  };
  speak(`${cap(n.you)} vẽ giúp ${n.me} đoạn thẳng AB dài ${k} xăng-ti-mét làm cây cầu. Kéo bút chì từ điểm A dọc theo thước!`, null,
    `Vẽ đoạn thẳng AB dài ${WANT(`${k} cm`)}!`);
  setTimeout(() => { if (!v) hint(pencil.firstElementChild); }, 1400);
}

function levelDots({ m, n, speak, ok, bad, hint, doneBtn, stageEl, rnd }) {
  const { k } = m;
  const { W, H } = boxFor(stageEl, { area: 100, minW: k + 2 * M + 1.2, minH: 6.6 });
  const cols = Math.floor(W - 2 * M - 0.4), rows = Math.floor(H - 2 * M - 0.4);
  const x0 = (W - cols) / 2, y0 = (H - rows) / 2;
  const dotAt = (i, j) => P(x0 + i, y0 + j);
  // Điểm A: chỗ vẽ được đoạn ngang hoặc dọc dài k.
  let ai, aj;
  for (let t = 0; t < 200; t++) {
    ai = Math.floor(rnd() * (cols + 1)); aj = Math.floor(rnd() * (rows + 1));
    if ((ai + k <= cols || ai - k >= 0) && (rnd() < 0.6 || aj + k <= rows || aj - k >= 0)) break;
  }
  const A = dotAt(ai, aj);
  m.geo = { A: { i: ai, j: aj }, cols, rows };
  const sc = makeScene(stageEl, { W, H, rnd });
  let grid = `<rect x="${u(x0 - 0.35)}" y="${u(y0 - 0.35)}" width="${u(cols + 0.7)}" height="${u(rows + 0.7)}" rx="${u(0.2)}" fill="#FFFDF7" stroke="${INK}" stroke-width="2.5"/>`;
  for (let i = 0; i <= cols; i++) grid += `<line x1="${u(x0 + i)}" y1="${u(y0)}" x2="${u(x0 + i)}" y2="${u(y0 + rows)}" stroke="#A5C8E8" stroke-width="2"/>`;
  for (let j = 0; j <= rows; j++) grid += `<line x1="${u(x0)}" y1="${u(y0 + j)}" x2="${u(x0 + cols)}" y2="${u(y0 + j)}" stroke="#A5C8E8" stroke-width="2"/>`;
  for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) grid += `<circle cx="${u(x0 + i)}" cy="${u(y0 + j)}" r="${u(0.06)}" fill="#64748B"/>`;
  const lab = add(A, P(ai >= cols - 1 ? 0.45 : -0.45, aj === 0 ? 0.45 : -0.45));
  sc.put('fig', grid);
  sc.put('over', `<line data-line x1="${u(A.x)}" y1="${u(A.y)}" x2="${u(A.x)}" y2="${u(A.y)}" stroke="#E5484D" stroke-width="${u(0.11)}" stroke-linecap="round"/>
    <circle cx="${u(A.x)}" cy="${u(A.y)}" r="${u(0.13)}" fill="${INK}"/>
    <circle data-bdot cx="${u(A.x)}" cy="${u(A.y)}" r="${u(0.13)}" fill="#E5484D" opacity="0"/>
    ${letterSvg(lab.x * U, lab.y * U, 'A', FS * 0.9)}
    <g data-pencil class="g2a-pencil" transform="translate(${u(A.x)} ${u(A.y)})"><g class="g2a-pencil-in">${pencilSvg(0, 0, U * 1.2)}</g></g>`);
  const line = sc.svg.querySelector('[data-line]'), bdot = sc.svg.querySelector('[data-bdot]'), pencil = sc.svg.querySelector('[data-pencil]');
  let B = A;
  dragDraw(sc, {
    onMove: (p) => {
      const i = Math.max(0, Math.min(cols, Math.round(p.x - x0))), j = Math.max(0, Math.min(rows, Math.round(p.y - y0)));
      const nb = dotAt(i, j);
      if (nb.x === B.x && nb.y === B.y) return;
      B = nb;
      sfx.tap();
      line.setAttribute('x2', u(B.x)); line.setAttribute('y2', u(B.y));
      bdot.setAttribute('cx', u(B.x)); bdot.setAttribute('cy', u(B.y)); bdot.setAttribute('opacity', dist(A, B) ? '1' : '0');
      pencil.setAttribute('transform', `translate(${u(B.x)} ${u(B.y)})`);
    },
  });
  const go = doneBtn('✓ Vẽ xong');
  go.onclick = async () => {
    const len = dist(A, B);
    if (!len) { speak('Kéo bút chì từ điểm A theo đường kẻ ô!', null, '👉 Kéo <b>bút chì</b> từ điểm A!'); hint(pencil.firstElementChild); return; }
    sc.locked = true;
    go.disabled = true;
    const side = mul(norm(perp(sub(B, A))), 0.5);
    await walkCount(sc, A, B, side);
    m.drawn = Math.round(len * 100) / 100;
    const fact = `Đoạn thẳng dài <b>${k} cm</b> đi qua ${k} cạnh ô vuông, mỗi cạnh dài 1 cm.`;
    if (Math.abs(len - k) < 1e-6) return ok(fact, `Đúng ${k} xăng-ti-mét rồi!`);
    const dir = ai + k <= cols ? P(1, 0) : ai - k >= 0 ? P(-1, 0) : aj + k <= rows ? P(0, 1) : P(0, -1);
    const C = add(A, mul(dir, k));
    sc.put('over', `<line x1="${u(A.x)}" y1="${u(A.y)}" x2="${u(C.x)}" y2="${u(C.y)}" stroke="#16A34A" stroke-width="${u(0.11)}" stroke-dasharray="${u(0.22)} ${u(0.16)}"/><circle cx="${u(C.x)}" cy="${u(C.y)}" r="${u(0.14)}" fill="#16A34A"/>`);
    const said = Number.isInteger(m.drawn) ? `Đoạn ${n.you} vẽ dài ${m.drawn} xăng-ti-mét rồi!` : `Đoạn ${n.you} vẽ chưa đúng độ dài rồi!`;
    bad(said, fact, 'Vẽ theo đường kẻ ô. Đếm số cạnh ô vuông từ điểm A: mỗi cạnh dài 1 cm.');
  };
  speak(`Mỗi ô vuông có cạnh dài 1 xăng-ti-mét. ${cap(n.you)} vẽ đoạn thẳng dài ${k} xăng-ti-mét, bắt đầu từ điểm A!`, null,
    `Vẽ đoạn thẳng dài ${WANT(`${k} cm`)} từ điểm A!`);
  setTimeout(() => { if (B === A) hint(pencil.firstElementChild); }, 1400);
}
