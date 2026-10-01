/**
 * 🐜 Chú kiến tìm đường cấp 5 — Bản đồ đảo (Bài 55: Đề-xi-mét, mét, ki-lô-mét; Vở BT Toán 2 Tập Hai).
 * Kiến Vàng chèo thuyền lá đi giữa các đảo. Bản đồ vẽ ĐÚNG TỈ LỆ: mỗi chặng dài theo số ki-lô-mét ghi trên chặng,
 * nên đảo xa thì nằm xa thật, vòng "50 km" quanh bến là vòng tròn thật. Bốn kiểu lượt (xen kẽ trong một ván):
 *   trip:    đi từ bến qua 1–2 đảo tới đảo cuối: gõ tổng số km; thuyền đi từng chặng, bảng cộng dần (như Vở BT bài 4).
 *   nearer:  hai đảo, đảo nào gần bến hơn (chạm đảo), gần hơn mấy km (gõ số); hai thuyền đi cùng tốc độ.
 *   convert: đổi đơn vị 1 km = 1 000 m, 1 m = 10 dm = 100 cm, 1 dm = 10 cm: thanh đo chia 10 phần, đếm 100, 200 …
 *   far:     chạm các đảo cách bến xa hơn X km (như "tỉnh thành xa Hà Nội hơn 100 km"); vòng X km hiện ra kiểm chứng.
 * App không báo trước lúc đúng. Dùng khung quầy (market/stall.js) như các lượt khác của trò kiến, theme 'ant'.
 */

import { antTopSvg, antIcon, INK } from './art/ant.js';
import { cap } from '../grade3Games/npc.js';
import { mountStall, Q } from '../grade3Games/market/stall.js';
import { makeRng } from '../grade3Games/loop.js';
import { calmMotion } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

const NS = 'http://www.w3.org/2000/svg';
const MINUS = '−';
const FONT = "'Baloo 2', Quicksand, sans-serif";
const WANT = (t) => `<b class="g3f-want">${t}</b>`;
const f1 = (n) => (Math.round(n * 10) / 10).toString();
const fmt = (n) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : String(n));
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const ISLANDS = ['Đảo Dừa', 'Đảo Rùa', 'Đảo Sò', 'Đảo Ngọc', 'Đảo Hoa', 'Đảo Cát', 'Đảo Mây', 'Đảo Ốc'];
const PORT = 'Bến Kiến';
export const MAP_PLAN = ['trip', 'nearer', 'convert', 'far', 'trip'];

// Đổi đơn vị (Bài 55 tiết 1–3). q: câu hỏi; parts: thanh đo chia 10 phần, mỗi phần step đơn vị nhỏ.
const FACTS = [
  { id: 'km-m', big: '1 km', small: 'm', ans: 1000, step: 100, rev: false },
  { id: 'm-km', big: '1 km', small: 'm', ans: 1000, step: 100, rev: true },
  { id: 'm-dm', big: '1 m', small: 'dm', ans: 10, step: 1, rev: false },
  { id: 'dm-m', big: '1 m', small: 'dm', ans: 10, step: 1, rev: true },
  { id: 'm-cm', big: '1 m', small: 'cm', ans: 100, step: 10, rev: false },
  { id: 'dm-cm', big: '1 dm', small: 'cm', ans: 10, step: 1, rev: false },
];
const UNIT_WORD = { km: 'ki-lô-mét', m: 'mét', dm: 'đề-xi-mét', cm: 'xăng-ti-mét' };

// ── Sinh số liệu ────────────────────────────────────────────────────────────────────────────────
const tries = (make, ok, n = 200) => { let v; for (let t = 0; t < n; t++) { v = make(); if (ok(v)) break; } return v; };

export function makeMapData(rng, mode, h) {
  const same = h.filter(x => x.mode === mode);
  const names = rng.shuffle(ISLANDS);
  if (mode === 'trip') {
    // Lượt đầu 2 chặng, lượt sau 3 chặng; số km tròn chục hoặc lẻ, tổng ≤ 99, thường có nhớ.
    const k = same.length ? 3 : 2;
    const legs = tries(() => Array.from({ length: k }, () => rng.int(k === 2 ? 15 : 14, k === 2 ? 48 : 35)),
      (ls) => ls.reduce((a, b) => a + b, 0) <= 99 && (ls[0] % 10) + (ls[1] % 10) >= 10 && new Set(ls).size === ls.length);
    return { legs, names: names.slice(0, k + 1) }; // names[k]: đảo phụ nối với bến (không nằm trên đường)
  }
  if (mode === 'nearer') {
    const [a, b] = tries(() => [rng.int(18, 85), rng.int(18, 85)], ([x, y]) => Math.abs(x - y) >= 4 && Math.abs(x - y) <= 30 && x % 10 !== y % 10);
    return { km: [a, b], names: names.slice(0, 2) };
  }
  if (mode === 'far') {
    const X = rng.pick([30, 40, 50]);
    const n = 5;
    const km = tries(() => Array.from({ length: n }, () => rng.int(18, 78)), (ks) => {
      const out = ks.filter(v => v > X).length;
      return out >= 1 && out <= n - 1 && ks.every(v => Math.abs(v - X) >= 4) && new Set(ks).size === n;
    });
    return { X, km, names: names.slice(0, n) };
  }
  // convert
  const f = tries(() => rng.pick(FACTS), (x) => !same.some(s => s.fact === x.id));
  return { fact: f.id };
}

// ── Hình ────────────────────────────────────────────────────────────────────────────────────────
function islandSvg(x, y, r, { port = false, seed = 0 } = {}) {
  const tilt = (seed % 7) - 3;
  const sand = `<ellipse cx="${f1(x)}" cy="${f1(y + r * 0.12)}" rx="${f1(r * 1.25)}" ry="${f1(r * 0.95)}" fill="#BFE7F7" opacity=".7"/>`
    + `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r)}" ry="${f1(r * 0.78)}" fill="#F3D9A0" stroke="${INK}" stroke-width="${f1(r * 0.07)}"/>`;
  if (port) {
    // Bến: ụ đất có lỗ tổ kiến + cầu tàu gỗ.
    return sand
      + `<rect x="${f1(x + r * 0.5)}" y="${f1(y - r * 0.12)}" width="${f1(r * 0.9)}" height="${f1(r * 0.24)}" fill="#B7793F" stroke="${INK}" stroke-width="${f1(r * 0.05)}"/>`
      + `<ellipse cx="${f1(x - r * 0.1)}" cy="${f1(y - r * 0.05)}" rx="${f1(r * 0.55)}" ry="${f1(r * 0.42)}" fill="#C08A55" stroke="${INK}" stroke-width="${f1(r * 0.06)}"/>`
      + `<ellipse cx="${f1(x - r * 0.1)}" cy="${f1(y - r * 0.12)}" rx="${f1(r * 0.17)}" ry="${f1(r * 0.11)}" fill="#5B3A1E"/>`;
  }
  const tx = x + r * 0.1, ty = y - r * 0.15;
  const leaf = (a) => `<path d="M${f1(tx)} ${f1(ty - r * 0.75)} q${f1(Math.cos(a) * r * 0.35)} ${f1(-r * 0.25)} ${f1(Math.cos(a) * r * 0.7)} ${f1(Math.sin(a) * r * 0.35 + r * 0.1)}" stroke="#2F8F4E" stroke-width="${f1(r * 0.16)}" fill="none" stroke-linecap="round"/>`;
  return sand
    + `<ellipse cx="${f1(x - r * 0.3)}" cy="${f1(y + r * 0.05)}" rx="${f1(r * 0.42)}" ry="${f1(r * 0.28)}" fill="#7BCB8B" stroke="${INK}" stroke-width="${f1(r * 0.05)}"/>`
    + `<path d="M${f1(tx)} ${f1(ty + r * 0.15)} Q${f1(tx + tilt * r * 0.03)} ${f1(ty - r * 0.3)} ${f1(tx)} ${f1(ty - r * 0.75)}" stroke="#8B5A2B" stroke-width="${f1(r * 0.13)}" fill="none" stroke-linecap="round"/>`
    + [-2.6, -1.9, -0.6, 0.1, 0.8].map(leaf).join('');
}
function boatSvg(s) {
  // Thuyền lá (mũi về +x) chở Kiến Vàng nhìn từ trên.
  return `<path d="M${f1(-s)} 0 Q${f1(-s * 0.4)} ${f1(-s * 0.55)} ${f1(s)} 0 Q${f1(-s * 0.4)} ${f1(s * 0.55)} ${f1(-s)} 0 Z" fill="#6CC08B" stroke="${INK}" stroke-width="${f1(s * 0.09)}"/>`
    + `<path d="M${f1(-s * 0.9)} 0 H${f1(s * 0.85)}" stroke="#2F8F4E" stroke-width="${f1(s * 0.06)}"/>`
    + `<g transform="scale(${f1(s / 40)})">${antTopSvg(32)}</g>`;
}
const boatIcon = (size = 40) => `<svg viewBox="-24 -16 48 32" width="${size}" height="${size}" aria-hidden="true">${boatSvg(20)}</svg>`;
export const mapIcon = boatIcon;

function labelSvg(x, y, text, fs, { color = INK, bg = '#FFFDF5', cls = '' } = {}) {
  const w = text.length * fs * 0.52 + fs * 0.8;
  return `<g class="g2m-label ${cls}" pointer-events="none"><rect x="${f1(x - w / 2)}" y="${f1(y - fs * 0.75)}" width="${f1(w)}" height="${f1(fs * 1.35)}" rx="${f1(fs * 0.45)}" fill="${bg}" stroke="${color}" stroke-width="${f1(fs * 0.12)}"/>`
    + `<text x="${f1(x)}" y="${f1(y + fs * 0.33)}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${f1(fs)}" fill="${color}">${text}</text></g>`;
}

// ── Hình học ────────────────────────────────────────────────────────────────────────────────────
const P = (x, y) => ({ x, y });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const toward = (p, deg, L) => P(p.x + Math.cos(deg * Math.PI / 180) * L, p.y + Math.sin(deg * Math.PI / 180) * L);
function segDist(p, a, b) {
  const dx = b.x - a.x, dy = b.y - a.y, L2 = dx * dx + dy * dy || 1;
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / L2));
  return Math.hypot(p.x - a.x - t * dx, p.y - a.y - t * dy);
}
const bbox = (pts, pad) => {
  const xs = pts.map(p => p.x), ys = pts.map(p => p.y);
  const x0 = Math.min(...xs) - pad, y0 = Math.min(...ys) - pad;
  return { x0, y0, w: Math.max(...xs) + pad - x0, h: Math.max(...ys) + pad - y0 };
};
/** Điểm số: khung hình gần tỉ lệ khung chơi, không đảo nào chồng đảo khác, không chặng nào cắt ngang đảo khác. */
function layoutScore(nodes, edges, ratio, R) {
  for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) if (dist(nodes[i], nodes[j]) < R * 3.2) return -1;
  for (const [a, b] of edges) for (let i = 0; i < nodes.length; i++) {
    if (i !== a && i !== b && segDist(nodes[i], nodes[a], nodes[b]) < R * 1.9) return -1;
  }
  const bb = bbox(nodes, R * 2.2);
  const r = bb.w / bb.h;
  return 1 / (1 + Math.abs(Math.log(r / ratio)));
}

// ── Màn chơi ────────────────────────────────────────────────────────────────────────────────────
export function mountMap(stage, m, api, { npc: n }) {
  injectMapStyles();
  const SIGN = { trip: 'Bản đồ đảo: đi mấy km?', nearer: 'Đảo nào gần hơn?', convert: 'Đổi đơn vị đo', far: 'Đảo nào xa hơn?' };
  const s = mountStall(stage, {
    npc: n, api, theme: 'ant', cameo: false,
    sign: `${boatIcon(34)}<span><strong>Kiến Vàng đi biển</strong><br>${SIGN[m.mode]}</span>`,
    counter: `
      <div class="g2a-bench g2m-bench">
        <div class="g2a-board" data-board hidden></div>
        <div class="g2a-stage" data-stage></div>
        <div class="g2a-acts" data-acts></div>
      </div>`,
  });
  const scene = stage.querySelector('.g3f-scene');
  if (m.mode === 'far') scene.classList.add('g2a-nopad');
  const { counter, main } = s;
  const q = (sel) => counter.querySelector(sel);
  const bench = q('.g2a-bench'), acts = q('[data-acts]'), board = q('[data-board]'), stageEl = q('[data-stage]');
  new MutationObserver(() => requestAnimationFrame(() => {
    const card = main.querySelector(':scope > .g3g-result');
    if (!card) return;
    acts.style.visibility = 'hidden';
    bench.style.paddingBottom = `${Math.max(0, card.offsetHeight - acts.offsetHeight + 8)}px`;
  })).observe(main, { childList: true });
  const ok = (text, line) => { const l = line || `Cảm ơn ${n.you}!`; s.speak(l, 'happy', `${l} 🎉`); api.succeed(text); };
  const bad = (line, text, tip) => { s.speak(line, 'sad', line); api.fail(text, tip); };
  const say = (html) => { board.hidden = false; board.innerHTML = `<span class="g2a-say">${html}</span>`; };
  const doneBtn = (label) => {
    acts.insertAdjacentHTML('beforeend', `<button type="button" class="g2a-act" data-done>${label}</button>`);
    return acts.querySelector('[data-done]');
  };
  const r0 = stageEl.getBoundingClientRect();
  const ratio = r0.width > 40 && r0.height > 40 ? r0.width / r0.height : (matchMedia('(orientation: portrait)').matches ? 0.8 : 1.8);
  const ctx = { m, n, ...s, ok, bad, say, doneBtn, stageEl, acts, ratio, rnd: makeRng(m.seed) };
  ({ trip: levelTrip, nearer: levelNearer, convert: levelConvert, far: levelFar })[m.mode](ctx);
}

/** Vẽ biển + đảo + chặng. nodes[0] là bến. Trả về { svg, put, R, fs, nodeG }. */
function drawMap(stageEl, nodes, edges, { names, kmOf, R, extra = '' }) {
  const bb = bbox(nodes, R * 2.4);
  const fs = Math.max(R * 0.62, Math.max(bb.w, bb.h) * 0.03);
  let waves = '';
  const rnd = makeRng(nodes.length * 97 + Math.round(bb.w));
  for (let i = 0; i < 26; i++) {
    const x = bb.x0 + rnd() * bb.w, y = bb.y0 + rnd() * bb.h, w = R * (0.5 + rnd() * 0.6);
    waves += `<path class="g2m-wave" style="animation-delay:${f1(-rnd() * 5)}s" d="M${f1(x)} ${f1(y)} q${f1(w / 4)} ${f1(-R * 0.15)} ${f1(w / 2)} 0 t${f1(w / 2)} 0" stroke="#E0F5FF" stroke-width="${f1(R * 0.08)}" fill="none" stroke-linecap="round"/>`;
  }
  let routes = '';
  edges.forEach(([a, b], k) => {
    routes += `<line class="g2m-route" data-e="${k}" x1="${f1(nodes[a].x)}" y1="${f1(nodes[a].y)}" x2="${f1(nodes[b].x)}" y2="${f1(nodes[b].y)}" stroke="#fff" stroke-width="${f1(R * 0.16)}" stroke-dasharray="${f1(R * 0.35)} ${f1(R * 0.28)}" stroke-linecap="round"/>`;
  });
  let isl = '', labels = '';
  nodes.forEach((p, i) => {
    isl += `<g class="g2m-isl${i ? '' : ' g2m-port'}" data-i="${i}">${islandSvg(p.x, p.y, R, { port: i === 0, seed: i * 3 })}`
      + `<circle class="g2m-hit" cx="${f1(p.x)}" cy="${f1(p.y)}" r="${f1(R * 1.5)}" fill="transparent"/></g>`;
    labels += labelSvg(p.x, p.y + R * 1.25, i ? names[i - 1] : PORT, fs * 0.9, { color: i ? '#0F4C75' : '#78350F' });
  });
  edges.forEach(([a, b], k) => {
    const pa = nodes[a], pb = nodes[b];
    const mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
    const L = dist(pa, pb) || 1, nx = -(pb.y - pa.y) / L, ny = (pb.x - pa.x) / L;
    const off = R * 0.85;
    labels += labelSvg(mx + nx * off, my + ny * off, `${kmOf[k]} km`, fs, { color: '#B45309', cls: 'g2m-km' });
  });
  stageEl.innerHTML = `
    <svg class="g2a-svg g2m-svg" viewBox="${f1(bb.x0)} ${f1(bb.y0)} ${f1(bb.w)} ${f1(bb.h)}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="${f1(bb.x0)}" y="${f1(bb.y0)}" width="${f1(bb.w)}" height="${f1(bb.h)}" rx="${f1(R * 0.8)}" fill="#5BB8E0"/>
      <g>${waves}</g><g data-under>${extra}</g><g>${routes}</g><g data-isl>${isl}</g><g data-fx></g><g data-boats></g><g>${labels}</g><g data-top></g>
    </svg>`;
  const svg = stageEl.querySelector('svg');
  const put = (k, html) => { const g = document.createElementNS(NS, 'g'); g.innerHTML = html; svg.querySelector(`[data-${k}]`).appendChild(g); return g; };
  return { svg, put, R, fs };
}

function addBoat(sc, p, deg, cls = '') {
  const g = document.createElementNS(NS, 'g');
  g.setAttribute('class', `g2m-boat ${cls}`);
  g.innerHTML = boatSvg(sc.R * 0.75);
  sc.svg.querySelector('[data-boats]').appendChild(g);
  g.setAttribute('transform', `translate(${f1(p.x)} ${f1(p.y)}) rotate(${f1(deg)})`);
  return g;
}
const angOf = (a, b) => Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
/** Thuyền đi theo pts, speed đơn vị bản đồ (km) / giây; onVertex(i) khi tới đỉnh i. Dừng cách bờ đảo một chút. */
function sail(boat, pts, speed, { onVertex, stopShort = 0 } = {}) {
  const calm = calmMotion();
  const v = speed * (calm ? 0.75 : 1);
  return new Promise((resolve) => {
    let i = 0;
    const leg = () => {
      if (i >= pts.length - 1) return resolve();
      const a = pts[i], b = pts[i + 1], L = dist(a, b);
      const end = i === pts.length - 2 ? Math.max(0, L - stopShort) : L;
      const deg = angOf(a, b);
      const ms = (end / v) * 1000;
      const t0 = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - t0) / ms);
        const d = end * t;
        boat.setAttribute('transform', `translate(${f1(a.x + (b.x - a.x) * d / L)} ${f1(a.y + (b.y - a.y) * d / L)}) rotate(${f1(deg)})`);
        if (t < 1) return requestAnimationFrame(step);
        i++;
        onVertex?.(i);
        setTimeout(leg, 120);
      };
      requestAnimationFrame(step);
    };
    leg();
  });
}

// ════ Đi mấy km? ════════════════════════════════════════════════════════════════════════════════
function levelTrip({ m, n, speak, row, ask, ok, bad, say, stageEl, ratio, rnd }) {
  const k = m.legs.length;
  const extraKm = Math.max(16, Math.min(45, Math.round(m.legs[0] * (0.7 + rnd() * 0.6))));
  const R = Math.max(4.2, m.legs.reduce((a, b) => a + b, 0) * 0.055);
  let best = null;
  for (let t = 0; t < 900; t++) {
    const axis = ratio >= 1 ? 0 : 90;
    const nodes = [P(0, 0)];
    let dir = axis + (rnd() - 0.5) * 70, side = rnd() < 0.5 ? 1 : -1;
    for (let i = 0; i < k; i++) {
      nodes.push(toward(nodes[i], dir, m.legs[i]));
      side = -side;
      dir = axis + side * (20 + rnd() * 45);
    }
    nodes.push(toward(nodes[0], axis + 180 * (rnd() < 0.3 ? 1 : 0) + (rnd() < 0.5 ? 1 : -1) * (55 + rnd() * 70), extraKm));
    const edges = [...Array(k)].map((_, i) => [i, i + 1]).concat([[0, k + 1]]);
    const sc = layoutScore(nodes, edges, ratio, R);
    if (sc > (best?.sc ?? -2)) best = { sc, nodes, edges };
    if (sc > 0.9) break;
  }
  const { nodes, edges } = best;
  const kmOf = [...m.legs, extraKm];
  const names = [...m.names.slice(0, k), m.names[k]];
  m.geo = { nodes, kmOf };
  const map = drawMap(stageEl, nodes, edges, { names, kmOf, R });
  const pathPts = nodes.slice(0, k + 1);
  const boat = addBoat(map, nodes[0], angOf(nodes[0], nodes[1]));
  const sum = m.legs.reduce((a, b) => a + b, 0);
  const via = names.slice(0, k - 1);
  const dest = names[k - 1];
  const route = [PORT, ...via, dest].join(' → ');
  // Đường cần đi: chặng sáng vàng.
  edges.slice(0, k).forEach((_, e) => map.svg.querySelector(`[data-e="${e}"]`)?.classList.add('g2m-route-on'));
  ask(row(boatIcon(26), route.replace(/Đảo /g, ''), `${Q} km`, true), 'km', async (v, pad) => {
    pad.lock();
    const expr = (j) => m.legs.slice(0, j).map(L => `${L} km`).join(' + ');
    say('⛵ …');
    await sail(boat, pathPts, Math.max(14, sum / 4), {
      stopShort: R * 0.9,
      onVertex: (i) => { sfx.pop(i * 2); say(`${expr(i)}${i === k ? ` = <b class="g2a-ans">${sum} km</b>` : ''}`); },
    });
    const fact = `Từ ${PORT}${via.length ? ` qua ${via.join(', ')}` : ''} tới ${dest}: ${expr(k)} = <b>${sum} km</b>.`;
    if (v === sum) { pad.lock('g3g-keypad-ok'); return ok(fact, `Tới ${dest} rồi! Đường dài ${sum} ki-lô-mét.`); }
    pad.lock('g3g-keypad-bad');
    bad(`Đường dài ${sum} ki-lô-mét cơ!`, fact, 'Cộng số ki-lô-mét của từng chặng thuyền đi.');
  });
  const viaText = via.length ? ` qua ${via.join(', ')}` : '';
  speak(`${cap(n.me)} chèo thuyền từ ${PORT}${viaText} tới ${dest}. ${cap(n.me)} phải đi bao nhiêu ki-lô-mét?`, null,
    `Từ ${PORT}${viaText} tới ${WANT(dest)}: đi ${WANT('mấy ki-lô-mét')}?`);
}

// ════ Đảo nào gần hơn? ══════════════════════════════════════════════════════════════════════════
function levelNearer({ m, n, speak, row, ask, ok, bad, say, doneBtn, stageEl, ratio, rnd, acts }) {
  const R = Math.max(4.2, Math.max(...m.km) * 0.065);
  const extraKm = tries(() => rnd() * 60 + 20 | 0, (v) => m.km.every(x => Math.abs(x - v) >= 6));
  let best = null;
  for (let t = 0; t < 900; t++) {
    const base = ratio >= 1 ? 0 : 90;
    const a1 = base + (rnd() < 0.5 ? -1 : 1) * (15 + rnd() * 50);
    const a2 = a1 + (a1 > base ? -1 : 1) * (45 + rnd() * 70);
    const a3 = base + 180 + (rnd() - 0.5) * 80;
    const nodes = [P(0, 0), toward(P(0, 0), a1, m.km[0]), toward(P(0, 0), a2, m.km[1]), toward(P(0, 0), a3, extraKm)];
    const edges = [[0, 1], [0, 2], [0, 3]];
    const sc = layoutScore(nodes, edges, ratio, R);
    if (sc > (best?.sc ?? -2)) best = { sc, nodes, edges };
    if (sc > 0.9) break;
  }
  const { nodes, edges } = best;
  const names = [m.names[0], m.names[1], ISLANDS.find(x => !m.names.includes(x))];
  const kmOf = [m.km[0], m.km[1], extraKm];
  m.geo = { nodes, kmOf };
  const map = drawMap(stageEl, nodes, edges, { names, kmOf, R });
  const near = m.km[0] < m.km[1] ? 0 : 1, d = Math.abs(m.km[0] - m.km[1]);
  let pick = null;
  const isl = (i) => map.svg.querySelector(`.g2m-isl[data-i="${i + 1}"]`);
  [0, 1].forEach(i => isl(i).classList.add('g2m-pickable'));
  const onTap = (e) => {
    const g = e.target.closest('.g2m-pickable');
    if (!g || pick != null) return;
    pick = +g.dataset.i - 1;
    sfx.tap();
    g.classList.add('g2m-picked');
    map.svg.querySelectorAll('.g2m-pickable').forEach(x => x.classList.remove('g2m-pickable'));
    say(`${names[pick]} gần hơn`);
    speak(`${names[pick]} gần ${PORT} hơn. Gần hơn bao nhiêu ki-lô-mét?`, null, `Gần hơn ${WANT('mấy ki-lô-mét')}?`);
    ask(row(boatIcon(26), 'Gần hơn', `${Q} km`, true), 'km', async (v, pad) => {
      pad.lock();
      await race();
      const fact = `${names[near]} cách bến ${m.km[near]} km, ${names[1 - near]} cách bến ${m.km[1 - near]} km: ${names[near]} gần hơn, ${m.km[1 - near]} km ${MINUS} ${m.km[near]} km = <b>${d} km</b>.`;
      const okPick = pick === near, okD = v === d;
      if (okPick && okD) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi! ${names[near]} gần hơn ${d} ki-lô-mét.`); }
      pad.lock(okD ? 'g3g-keypad-ok' : 'g3g-keypad-bad');
      bad(okPick ? `Gần hơn ${d} ki-lô-mét cơ!` : `${names[near]} mới gần hơn!`, fact,
        'Đảo gần hơn có số ki-lô-mét bé hơn. Muốn biết gần hơn bao nhiêu, lấy số lớn trừ số bé.');
    });
  };
  map.svg.addEventListener('click', onTap);
  async function race() {
    say('⛵ ⛵ …');
    const speed = Math.max(m.km[0], m.km[1]) / 2.6;
    const b0 = addBoat(map, nodes[0], angOf(nodes[0], nodes[1]));
    const b1 = addBoat(map, nodes[0], angOf(nodes[0], nodes[2]));
    let first = true;
    const flag = (i) => {
      if (first) { first = false; sfx.pop(6); map.put('top', labelSvg(nodes[i + 1].x, nodes[i + 1].y - R * 1.6, '🏁', map.fs * 1.1, { color: '#16A34A', bg: '#DCFCE7' })); }
      else sfx.pop(2);
    };
    await Promise.all([
      sail(b0, [nodes[0], nodes[1]], speed, { stopShort: R * 0.9 }).then(() => flag(0)),
      sail(b1, [nodes[0], nodes[2]], speed, { stopShort: R * 0.9 }).then(() => flag(1)),
    ]);
    say(`${m.km[1 - near]} km ${MINUS} ${m.km[near]} km = <b class="g2a-ans">${d} km</b>`);
    await sleep(500);
  }
  speak(`${names[0]} cách ${PORT} ${m.km[0]} ki-lô-mét, ${names[1]} cách ${m.km[1]} ki-lô-mét. ${cap(n.you)} chạm vào đảo gần ${PORT} hơn!`, null,
    `Chạm vào đảo ${WANT('gần')} ${PORT} hơn!`);
  void doneBtn; void acts;
}

// ════ Đảo nào xa hơn X km? ══════════════════════════════════════════════════════════════════════
function levelFar({ m, n, speak, ok, bad, say, doneBtn, stageEl, ratio, rnd }) {
  const R = Math.max(4.2, Math.max(...m.km) * 0.075);
  const N = m.km.length;
  let best = null;
  for (let t = 0; t < 1500; t++) {
    const start = rnd() * 360;
    const order = [...Array(N).keys()].sort(() => rnd() - 0.5);
    const nodes = [P(0, 0)];
    const angles = order.map((_, j) => start + j * (360 / N) + (rnd() - 0.5) * 30);
    m.km.forEach((km, i) => nodes.push(toward(P(0, 0), angles[order.indexOf(i)], km)));
    const edges = m.km.map((_, i) => [0, i + 1]);
    const sc = layoutScore(nodes, edges, ratio, R);
    if (sc > (best?.sc ?? -2)) best = { sc, nodes, edges };
    if (sc > 0.92) break;
  }
  const { nodes, edges } = best;
  m.geo = { nodes };
  const ring = `<circle class="g2m-ring" cx="0" cy="0" r="${m.X}" fill="#FEF3C7" fill-opacity=".0" stroke="#F59E0B" stroke-width="${f1(R * 0.2)}" stroke-dasharray="${f1(R * 0.5)} ${f1(R * 0.3)}"/>`;
  const map = drawMap(stageEl, nodes, edges, { names: m.names, kmOf: m.km, R, extra: ring });
  const picked = new Set();
  const want = new Set(m.km.map((v, i) => (v > m.X ? i : -1)).filter(i => i >= 0));
  for (let i = 0; i < N; i++) map.svg.querySelector(`.g2m-isl[data-i="${i + 1}"]`).classList.add('g2m-pickable');
  let over = false;
  map.svg.addEventListener('click', (e) => {
    const g = e.target.closest('.g2m-isl[data-i]');
    if (!g || over || g.dataset.i === '0') return;
    const i = +g.dataset.i - 1;
    if (picked.has(i)) picked.delete(i); else picked.add(i);
    g.classList.toggle('g2m-picked', picked.has(i));
    sfx.tap();
  });
  const btn = doneBtn('✓ Chọn xong');
  btn.onclick = async () => {
    if (over) return;
    if (!picked.size) {
      speak(`${cap(n.you)} chạm vào các đảo xa hơn ${m.X} ki-lô-mét trước đã!`, null, 'Chạm vào đảo trước!');
      map.svg.querySelectorAll('.g2m-pickable').forEach(x => { x.classList.remove('g2a-hint'); void x.getBoundingClientRect(); x.classList.add('g2a-hint'); });
      return;
    }
    over = true;
    btn.disabled = true;
    sfx.swish();
    // Kiểm chứng: vòng X km quanh bến hiện ra (bản đồ đúng tỉ lệ) — đảo nằm ngoài vòng là xa hơn X km.
    map.svg.querySelector('.g2m-ring')?.classList.add('g2m-ring-on');
    map.put('top', labelSvg(0, -m.X - R * 0.2, `${m.X} km`, map.fs, { color: '#B45309', bg: '#FEF3C7' }));
    say(`Vòng ${m.X} km`);
    await sleep(900);
    for (let i = 0; i < N; i++) {
      const g = map.svg.querySelector(`.g2m-isl[data-i="${i + 1}"]`);
      g.classList.add(want.has(i) ? 'g2m-far' : 'g2m-near');
      if (picked.has(i) !== want.has(i)) g.classList.add('g2m-wrong');
      sfx.pop(i + 1);
      await sleep(260);
    }
    const list = [...want].map(i => `${m.names[i]} (${m.km[i]} km)`).join(', ');
    const fact = `Các đảo xa ${PORT} hơn ${m.X} km: <b>${list}</b>.`;
    const good = picked.size === want.size && [...want].every(i => picked.has(i));
    if (good) return ok(fact, `Đúng rồi! Các đảo đó đều ở ngoài vòng ${m.X} ki-lô-mét.`);
    bad('Ơ, chưa đúng rồi!', fact, `Xa hơn ${m.X} km là số ki-lô-mét lớn hơn ${m.X}.`);
  };
  speak(`${cap(n.me)} muốn đi tới các đảo cách ${PORT} xa hơn ${m.X} ki-lô-mét. ${cap(n.you)} chạm vào các đảo đó rồi bấm Chọn xong!`, null,
    `Chạm các đảo xa bến hơn ${WANT(`${m.X} km`)}!`);
}

// ════ Đổi đơn vị ════════════════════════════════════════════════════════════════════════════════
function levelConvert({ m, n, speak, row, ask, ok, bad, say, stageEl }) {
  const f = FACTS.find(x => x.id === m.fact);
  const bigUnit = f.big.split(' ')[1];
  // Thanh đo dài 1 km / 1 m / 1 dm chia 10 phần bằng nhau, mỗi phần step (đơn vị nhỏ).
  const W = 300, H = 120, X0 = 20, BW = 260, Y = 58, BH = 20;
  let segs = '';
  for (let i = 0; i < 10; i++) {
    segs += `<rect class="g2m-seg" data-seg="${i}" x="${X0 + i * BW / 10}" y="${Y}" width="${BW / 10}" height="${BH}" fill="${i % 2 ? '#FDE68A' : '#FFF7D6'}" stroke="${INK}" stroke-width="1.2"/>`;
  }
  const scene = f.small === 'm' ? '🌊' : f.small === 'dm' ? '🪵' : '📏';
  stageEl.innerHTML = `
    <svg class="g2a-svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="#EAF6FB"/>
      <text x="${W / 2}" y="34" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="20" fill="#0F4C75">${scene} ${f.big}</text>
      <path d="M${X0} ${Y - 8} V${Y - 2} M${X0} ${Y - 5} H${X0 + BW} M${X0 + BW} ${Y - 8} V${Y - 2}" stroke="#0F4C75" stroke-width="2"/>
      <g>${segs}</g>
      <rect x="${X0}" y="${Y}" width="${BW}" height="${BH}" fill="none" stroke="${INK}" stroke-width="2.2" rx="2"/>
      <g data-ticks></g>
      <g data-boats></g>
    </svg>`;
  const svg = stageEl.querySelector('svg');
  const ticks = svg.querySelector('[data-ticks]');
  const boat = document.createElementNS(NS, 'g');
  boat.innerHTML = boatSvg(11);
  boat.setAttribute('transform', `translate(${X0} ${Y + BH / 2}) rotate(0)`);
  svg.querySelector('[data-boats]').appendChild(boat);
  const qText = f.rev ? `? ${f.small} = ${f.big}` : `${f.big} = ? ${f.small}`;
  ask(row('📏', qText.replace('?', '…'), `${Q} ${f.small}`, true), f.small, async (v, pad) => {
    pad.lock();
    say(`${f.big} …`);
    const calm = calmMotion();
    for (let i = 0; i < 10; i++) {
      const x = X0 + (i + 1) * BW / 10;
      await new Promise((res) => {
        const t0 = performance.now(), ms = calm ? 360 : 260, x0 = X0 + i * BW / 10;
        const step = (now) => {
          const t = Math.min(1, (now - t0) / ms);
          boat.setAttribute('transform', `translate(${f1(x0 + (x - x0) * t)} ${Y + BH / 2}) rotate(0)`);
          if (t < 1) requestAnimationFrame(step); else res();
        };
        requestAnimationFrame(step);
      });
      svg.querySelector(`[data-seg="${i}"]`)?.classList.add('g2m-seg-on');
      const val = (i + 1) * f.step;
      ticks.insertAdjacentHTML('beforeend', `<text class="g2m-tick" x="${x}" y="${Y + BH + 16}" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="${f.ans >= 1000 ? 10 : 12}" fill="${i === 9 ? '#16A34A' : '#78350F'}">${fmt(val)}</text>`);
      sfx.pop(i % 8);
    }
    const fact = `${f.big} = <b>${fmt(f.ans)} ${f.small}</b>.`;
    say(`${f.big} = <b class="g2a-ans">${fmt(f.ans)} ${f.small}</b>`);
    if (v === f.ans) { pad.lock('g3g-keypad-ok'); return ok(fact, `Đúng rồi! Một ${UNIT_WORD[bigUnit]} bằng ${fmt(f.ans)} ${UNIT_WORD[f.small]}.`); }
    pad.lock('g3g-keypad-bad');
    bad(`${f.big} bằng ${fmt(f.ans)} ${f.small} cơ!`, fact, '1 km = 1 000 m; 1 m = 10 dm = 100 cm; 1 dm = 10 cm.');
  });
  const unitQ = `Một ${UNIT_WORD[bigUnit]} bằng bao nhiêu ${UNIT_WORD[f.small]}?`;
  const shownQ = f.rev ? `${WANT(`Mấy ${f.small}`)} thì bằng ${f.big}?` : `${f.big} bằng ${WANT(`mấy ${f.small}`)}?`;
  speak(f.small === 'm'
    ? `Còn ${f.big.replace('km', 'ki-lô-mét')} nữa là tới đảo. ${unitQ}`
    : `${cap(n.me)} đo mái chèo dài ${f.big.replace('dm', 'đề-xi-mét').replace(/ m$/, ' mét')}. ${unitQ}`, null, shownQ);
}

function injectMapStyles() {
  if (document.getElementById('g2m-styles')) return;
  const st = document.createElement('style');
  st.id = 'g2m-styles';
  st.textContent = `
    .g2m-wave { animation: g2mWave 4.5s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: center; }
    @keyframes g2mWave { from { transform: translateX(-6%); opacity: .3; } to { transform: translateX(6%); opacity: .8; } }
    @media (prefers-reduced-motion: reduce) { .g2m-wave { animation-duration: 9s; } }
    .g2m-route-on { stroke: #FDE047; }
    .g2m-isl { transform-box: fill-box; transform-origin: center; }
    .g2m-pickable { cursor: pointer; }
    .g2m-pickable:hover { filter: brightness(1.06); }
    .g2m-picked > ellipse:nth-child(2) { stroke: #2563EB; stroke-width: 1.2; fill: #DBEAFE; }
    .g2m-picked { filter: drop-shadow(0 0 2px #2563EB); }
    .g2m-far > ellipse:nth-child(2) { fill: #DCFCE7; }
    .g2m-near { opacity: .55; }
    .g2m-wrong { filter: drop-shadow(0 0 2.5px #DC2626) drop-shadow(0 0 1px #DC2626); }
    .g2m-ring { opacity: 0; transition: opacity .6s ease, fill-opacity .6s ease; }
    .g2m-ring-on { opacity: 1; fill-opacity: .35; }
    .g2m-seg-on { fill: #86EFAC; }
    .g2m-tick { animation: g2aPopIn .3s cubic-bezier(.2,1.5,.4,1); }
  `;
  document.head.appendChild(st);
}
