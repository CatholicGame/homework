/**
 * 🛤️ Kỹ sư đường sắt (Toán 4, Bài 27–30). Thiết kế: docs/lop_4/thiet-ke-ky-su-duong-sat.md.
 * Bé làm kỹ sư trên một bản vẽ giấy ô (📐 grade4Tools/square.js, ê ke kéo / xoay / trượt như công cụ):
 *   check (Bài 27): đường bộ cắt đường ray tại O có vuông góc không? Đặt ê ke vào O để thấy khít hay khe hở.
 *   perp  (Bài 28): vẽ đường bộ qua điểm H vuông góc với đường ray AB (đặt ê ke dọc ray, trượt tới H, vẽ).
 *   pair  (Bài 29): chọn hai thanh ray song song trong 4 thanh; ↔️ Kéo dài để thấy hai thanh có gặp nhau không.
 *   para  (Bài 30): vẽ đường tránh tàu qua nhà ga M song song với đường ray AB (vẽ vuông góc hai lần).
 * Nút "Xong" có từ đầu; đúng sai chỉ lộ sau Xong: bản vẽ "thành thật" (lưới mờ, cỏ, ray, đường nhựa), tàu và xe
 * đạp chạy thử; sai thì có hậu quả (xe khựng, tàu phanh) rồi ê ke tự làm lại cách đúng bằng nét xanh lá.
 * Ê ke ở cấp vẽ khớp với BẤT KỲ đường nào trên bản vẽ (bases), nên bé có thể đặt nhầm dọc đường đất cũ.
 * Dải tuyến đường dưới bản vẽ dài thêm một đoạn sau mỗi bản vẽ thành công.
 */

import { createSquare, dirOf, foot, clipLine, CELL } from '../grade4Tools/square.js';
import { css, sfx } from '../grade4Tools/frame.js';
import { calmMotion } from '../grade3Games/fly.js';
import { LAB_NPCS, WORKER_NPCS, npcPic } from '../grade3Games/npc.js';
import { stallMeta, levelMeta } from './catalog.js';
import {
  INK, place, trackLocal, roadLocal, dirtLocal, barLocal, trainLocal, bikeLocal, TRAIN_LEN, PLACES,
  ekeIcon, railIcon, backdropSvg, routeSvg,
} from './art/rail.js';

const COLS = 18, ROWS = 11;
const L1 = 6, L2 = 3.8; // hai cạnh góc vuông của ê ke (ô), như square.js
const PARK = { c: { x: COLS - 6.6, y: ROWS - 0.4 }, rot: 0 };
const inPark = (p) => p.x > COLS - 7.4 && p.y > ROWS - 4.6;

const KYSU = LAB_NPCS.find(n => n.id === 'kysu');
const LAITAU = { ...WORKER_NPCS.find(n => n.id === 'taixe'), id: 'laitau', name: 'Bác Ba lái tàu' };

// ── Hình học (toạ độ ô; hướng = độ màn hình, 0 sang phải, 90 xuống) ─────────────────────────────────
const rad = (d) => (d * Math.PI) / 180;
const norm = (d) => ((d % 360) + 360) % 360;
const diff = (a, b) => { const d = norm(a - b); return d > 180 ? d - 360 : d; };
const dist = (p, q) => Math.hypot(p.x - q.x, p.y - q.y);
const unit = (d) => ({ x: Math.cos(rad(d)), y: Math.sin(rad(d)) });
const add = (p, v, k = 1) => ({ x: p.x + v.x * k, y: p.y + v.y * k });
const along = (a, d, tol = 0.5) => Math.abs(diff(a, d)) < tol || Math.abs(diff(a, d + 180)) < tol;
const lineDist = (p, a, d) => dist(p, foot(p, a, d));
const inside = (p, m = 0) => p.x >= m && p.x <= COLS - m && p.y >= m && p.y <= ROWS - m;
/** Giao điểm hai đường thẳng (qua a hướng d), null nếu song song. */
function meet(a1, d1, a2, d2) {
  const u = unit(d1), v = unit(d2);
  const den = u.x * v.y - u.y * v.x;
  if (Math.abs(den) < 1e-6) return null;
  const t = ((a2.x - a1.x) * v.y - (a2.y - a1.y) * v.x) / den;
  return add(a1, u, t);
}
/** Khoảng cách từ p tới đoạn ab. */
function segDist(p, a, b) {
  const vx = b.x - a.x, vy = b.y - a.y, L = vx * vx + vy * vy;
  const k = Math.max(0, Math.min(1, ((p.x - a.x) * vx + (p.y - a.y) * vy) / L));
  return Math.hypot(p.x - a.x - k * vx, p.y - a.y - k * vy);
}
function segsCross(a, b, c, d) {
  const o = (p, q, r) => Math.sign((q.x - p.x) * (r.y - p.y) - (q.y - p.y) * (r.x - p.x));
  return o(a, b, c) !== o(a, b, d) && o(c, d, a) !== o(c, d, b);
}
const segSeg = (s, r) => (segsCross(s.a, s.b, r.a, r.b) ? 0 : Math.min(segDist(s.a, r.a, r.b), segDist(s.b, r.a, r.b), segDist(r.a, s.a, s.b), segDist(r.b, s.a, s.b)));

/** Hướng theo lưới: vectơ nguyên (để điểm luôn ở giao điểm ô) và góc. */
const V = (x, y) => ({ v: { x, y }, d: norm((Math.atan2(y, x) * 180) / Math.PI) });
const AXIS = [V(1, 0), V(0, 1)];
const DIAG = [V(1, 1), V(-1, 1), V(2, 1), V(1, 2), V(-1, 2), V(-2, 1)];
const ALL_DIRS = [...AXIS, ...DIAG];

// ── Sinh đề ───────────────────────────────────────────────────────────────────────────────────────
/** Không quá 2 lần liền cùng một đáp án. */
function balanced(rng, prev) {
  return prev.length >= 2 && prev[prev.length - 1] === prev[prev.length - 2] ? !prev[prev.length - 1] : rng() < 0.5;
}

function genCheck(rng, idx, history) {
  const right = balanced(rng, history.filter(h => h.kind === 'check').map(h => h.right));
  const lastD = history[history.length - 1]?.dr;
  for (let k = 0; k < 400; k++) {
    const D = rng.pick(ALL_DIRS.filter(x => x.d !== lastD));
    const O = { x: rng.int(5, 11), y: rng.int(3, 7) };
    if (inPark(O)) continue;
    const delta = [16, 14, 12, 11, 10, 9][idx % 6] * (rng() < 0.5 ? -1 : 1);
    return { kind: 'check', right, O, dr: D.d, dRoad: norm(D.d + 90 + (right ? 0 : delta)) };
  }
  return { kind: 'check', right, O: { x: 8, y: 5 }, dr: 0, dRoad: 90 };
}

/** Đường ray qua P0 (điểm lưới) hướng D; A, B là hai điểm lưới trên ray, xa nhau, trong giấy. */
function railAB(P0, D) {
  const pts = [];
  for (let j = -12; j <= 12; j++) { const p = add(P0, D.v, j); if (inside(p, 0.8) && !inPark(p)) pts.push({ j, p }); }
  return { A: pts[0].p, B: pts[pts.length - 1].p };
}

function genPerp(rng, idx, kind = 'perp') {
  const diag = kind === 'perp' ? idx >= 3 : idx >= 2;
  const onLine = kind === 'perp' && idx === 2;
  const decoy = kind === 'perp' ? idx >= 3 : idx >= 4;
  for (let k = 0; k < 600; k++) {
    const D = rng.pick(diag ? DIAG : AXIS);
    const P0 = { x: rng.int(5, 12), y: rng.int(3, 7) };
    const n = { x: -D.v.y, y: D.v.x }, nl = Math.hypot(n.x, n.y);
    const kk = onLine ? 0 : rng.pick([-3, -2, -1, 1, 2, 3]);
    const s = rng.int(-1, 1);
    const H = add(add(P0, n, kk), D.v, s);
    const off = Math.abs(kk) * nl;
    if (!onLine && (off < 2 || off > (kind === 'para' ? 4.6 : 5.6))) continue;
    if (!inside(H, 1.5) || inPark(H)) continue;
    const F = foot(H, P0, D.d);
    if (!inside(F, 1.6) || inPark(F)) continue;
    const { A, B } = railAB(P0, D);
    if (dist(A, B) < 8) continue;
    const m = { kind, D: D.d, P0, H, F, A, B, place: kind === 'para' ? 'station' : rng.pick(['school', 'market', 'clinic', 'hall']) };
    if (decoy) {
      m.dOld = norm(D.d + 90 + (rng() < 0.5 ? -1 : 1) * rng.int(24, 36));
      // đường đất cắt ray trong giấy, không quá sát chỗ cần làm
      const X = meet(H, m.dOld, P0, D.d);
      if (!X || !inside(X, 0.5) || dist(X, F) < 1.5) continue;
    }
    return m;
  }
  return { kind, D: 0, P0: { x: 8, y: 6 }, H: { x: 8, y: 3 }, F: { x: 8, y: 6 }, A: { x: 1, y: 6 }, B: { x: 11, y: 6 }, place: kind === 'para' ? 'station' : 'school' };
}

function genPair(rng, idx) {
  const delta = [20, 18, 16, 14, 12, 10][idx % 6];
  for (let k = 0; k < 4000; k++) {
    const D = rng.pick(ALL_DIRS);
    const nrm = unit(D.d + 90);
    const len = rng.int(8, 12) / 2;
    const cA = { x: rng.int(4, COLS - 4), y: rng.int(2, ROWS - 2) };
    const cB = add(cA, nrm, rng.int(4, 7) / 2 * (rng() < 0.5 ? -1 : 1));
    const dC = norm(D.d + delta * (rng() < 0.5 ? -1 : 1));
    const dE = norm(D.d + rng.int(30, 70) * (rng() < 0.5 ? -1 : 1));
    const seg = (c, d, L) => { const w = unit(d); return { c, d, a: add(c, w, -L / 2), b: add(c, w, L / 2) }; };
    const segs = [
      seg(cA, D.d, len), seg(cB, D.d, len),
      seg({ x: rng.int(3, COLS - 3) + 0.5, y: rng.int(2, ROWS - 2) }, dC, rng.int(8, 12) / 2),
      seg({ x: rng.int(3, COLS - 3), y: rng.int(2, ROWS - 2) + 0.5 }, dE, rng.int(7, 11) / 2),
    ];
    if (!segs.every(s => inside(s.a, 0.8) && inside(s.b, 0.8))) continue;
    let ok = true;
    for (let i = 0; i < 4 && ok; i++) for (let j = i + 1; j < 4 && ok; j++) {
      if (segSeg(segs[i], segs[j]) < 1) ok = false;
      if (i === 0 && j === 1) continue;
      const X = meet(segs[i].a, segs[i].d, segs[j].a, segs[j].d);
      if (!X || !inside(X, 0.4)) ok = false;
    }
    if (!ok) continue;
    const order = rng.shuffle([0, 1, 2, 3]);
    return { kind: 'pair', segs: order.map(i => segs[i]), good: [order.indexOf(0), order.indexOf(1)].sort() };
  }
  // dự phòng: hai thanh ngang song song + hai thanh xiên
  const s = (a, b) => ({ a, b, d: dirOf(a, b), c: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 } });
  return { kind: 'pair', segs: [s({ x: 2, y: 2 }, { x: 7, y: 2 }), s({ x: 2, y: 5 }, { x: 7, y: 5 }), s({ x: 10, y: 3 }, { x: 15, y: 5 }), s({ x: 10, y: 9 }, { x: 14, y: 6 })], good: [0, 1] };
}

// ── Cấp ──────────────────────────────────────────────────────────────────────────────────────────
export const RAIL_LEVELS = [
  {
    ...levelMeta('rail-1'), missions: 6, kind: 'check',
    knowledge: 'hai đường thẳng vuông góc, dùng ê ke kiểm tra góc vuông',
    ask: () => 'Đường ngang có vuông góc với đường ray không? Lấy ê ke ra kiểm tra!',
    desc: 'Đặt góc vuông của ê ke vào chỗ giao nhau, một cạnh dọc đường ray: cạnh kia trùng đường bộ thì hai đường vuông góc.',
    how: [['eke', 'Đặt ê ke'], ['👀', 'Nhìn khe hở'], ['⊥', 'Chọn']],
  },
  {
    ...levelMeta('rail-2'), missions: 6, kind: 'perp',
    knowledge: 'vẽ đường thẳng vuông góc với một đường thẳng, đi qua một điểm',
    ask: () => 'Làm đường từ cổng trường, cắt vuông góc qua đường ray!',
    desc: 'Đặt một cạnh góc vuông của ê ke dọc đường ray, trượt tới khi cạnh kia chạm điểm H, rồi vẽ theo cạnh ê ke.',
    how: [['eke', 'Đặt dọc ray'], ['↔️', 'Trượt tới H'], ['✏️', 'Vẽ']],
  },
  {
    ...levelMeta('rail-3'), missions: 6, kind: 'pair',
    knowledge: 'hai đường thẳng song song',
    ask: () => 'Chọn hai thanh ray song song để ghép thành đường tàu!',
    desc: 'Hai đường thẳng song song kéo dài mãi cũng không gặp nhau. Chọn hai thanh rồi kéo dài để kiểm tra.',
    how: [['👆', 'Chọn 2 thanh'], ['↔️', 'Kéo dài'], ['🛤️', 'Ghép ray']],
  },
  {
    ...levelMeta('rail-4'), missions: 6, kind: 'para',
    knowledge: 'vẽ đường thẳng song song qua một điểm (vẽ vuông góc hai lần)',
    ask: () => 'Làm đường tránh tàu song song với đường ray, đi qua nhà ga!',
    desc: 'Vẽ đường vuông góc với đường ray đi qua nhà ga M, rồi vẽ đường vuông góc với đường vừa vẽ, cũng đi qua M.',
    how: [['eke', 'Vẽ vuông góc'], ['eke', 'Vẽ lần hai'], ['🚉', 'Đường tránh']],
  },
];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const slow = (ms) => (calmMotion() ? Math.round(ms * 1.15) : ms);
let clipSeq = 0;

export const RAIL_GAME = {
  ...stallMeta('rail'),
  starPrefix: 'g4games',
  unitWord: 'bản vẽ',
  npcs: [KYSU, LAITAU],
  levels: RAIL_LEVELS,
  againText: 'Chơi lại (bản vẽ mới)',
  stallIcon: () => railIcon(56),
  summaryText: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> bản vẽ. Tuyến đường sắt dài thêm ${ok} đoạn!`,

  howTo(level) {
    const pic = (p) => (p === 'eke' ? ekeIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '🚆', label: 'Tàu chạy' }];
  },

  makeMission(rng, level, history) {
    const idx = history.length;
    const past = history.map(h => h.ok === true);
    const base = { idx, past };
    if (level.kind === 'check') return { ...base, ...genCheck(rng, idx, history) };
    if (level.kind === 'pair') return { ...base, ...genPair(rng, idx) };
    return { ...base, ...genPerp(rng, idx, level.kind) };
  },

  mountMission(stage, m, level, api) {
    injectRailStyles();
    const npc = KYSU;
    const total = level.missions || 6;
    stage.innerHTML = `
      <div class="g4r-scene animate-fadeIn">
        ${backdropSvg()}
        <div class="g4r-board"><div class="g4r-paper"></div></div>
        <div class="g4r-route">${routeSvg(m.past, m.idx, total)}</div>
        <div class="g4r-side" data-result-host>
          <div class="g4r-npc">
            <div class="g4r-bubble"><b class="g4r-name">${npc.name}</b><span class="g4r-say">&nbsp;</span></div>
            <div class="g4r-npc-pic">${npcPic(npc, 'wait')}</div>
          </div>
          <div class="g4r-acts">${actsHtml(m.kind)}</div>
        </div>
      </div>`;
    const scene = stage.querySelector('.g4r-scene');
    // Màn ngang: bề rộng cột bản vẽ = chiều cao hàng × tỉ lệ giấy (không để lề trắng thừa, không lấn cột bên phải).
    const fitBoard = () => {
      if (!scene.isConnected) { ro.disconnect(); return; }
      const cs = getComputedStyle(scene);
      const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight), padY = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
      const rowH = scene.clientHeight - padY - scene.querySelector('.g4r-route').offsetHeight - parseFloat(cs.rowGap);
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const bw = Math.max(0, Math.min(rowH * ((COLS + 0.8) / (ROWS + 0.8)), scene.clientWidth - padX - parseFloat(cs.columnGap) - 13 * rem));
      scene.style.setProperty('--bw', `${Math.floor(bw)}px`);
    };
    const ro = new ResizeObserver(fitBoard);
    ro.observe(scene);
    fitBoard();
    const sayBox = stage.querySelector('.g4r-say');
    const picBox = stage.querySelector('.g4r-npc-pic');
    const acts = stage.querySelector('.g4r-acts');
    const doneBtn = acts.querySelector('[data-act="done"]');
    const speak = (text, mood, shown) => {
      sayBox.innerHTML = shown || text;
      if (mood) picBox.innerHTML = npcPic(npc, mood);
      api.say(text);
    };
    // Hình SVG (núm xoay, thanh ray) đã có transform riêng: chỉ nhấp nháy sáng, không phóng to.
    const blink = (el) => {
      if (!el) return;
      const cls = el instanceof SVGElement ? 'g4r-sblink' : 'g4r-blink';
      el.classList.remove(cls); void el.getBoundingClientRect(); el.classList.add(cls);
    };

    // ── Bản vẽ ──
    const t = createSquare(stage.querySelector('.g4r-paper'), { cols: COLS, rows: ROWS });
    const svg = t.svg;
    const NS = 'http://www.w3.org/2000/svg';
    const mk = (tag, attrs = {}, html = '') => { const e = document.createElementNS(NS, tag); for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v); if (html) e.innerHTML = html; return e; };
    const clipId = `g4r-clip-${++clipSeq}`;
    svg.insertAdjacentHTML('afterbegin', `<defs><clipPath id="${clipId}"><rect x="0" y="0" width="${COLS * CELL}" height="${ROWS * CELL}"/></clipPath></defs>`);
    const grid = svg.querySelector('.g4s-grid');
    const gDeco = mk('g', { 'clip-path': `url(#${clipId})` });
    grid.after(gDeco);
    const ekeG = svg.querySelector('.g4s-eke');
    const gReal = mk('g', { 'clip-path': `url(#${clipId})`, class: 'g4r-realg' }); // đường thật hiện khi "thành thật"
    const gFit = mk('g', { 'pointer-events': 'none' }); // dấu khít / khe hở: trên ê ke, không chặn kéo
    const gHits = mk('g', { class: 'g4r-hits' });
    const gAnim = mk('g', { 'clip-path': `url(#${clipId})` });
    ekeG.before(gReal, gHits, gAnim);
    ekeG.after(gFit);
    // đường thật mới (đường nhựa, đường tránh) nằm dưới đường ray có sẵn: đường ray vẽ đè lên chỗ giao
    gDeco.before(gReal);
    const X = (p) => ({ x: p.x * CELL, y: p.y * CELL });
    /** Vẽ một đường thẳng trọn khổ giấy kiểu `kind` (track / road / dirt) vào nhóm g. */
    const fullDeco = (g, a, d, kind) => {
      const [q0, q1] = clipLine(a, d, COLS, ROWS);
      const len = dist(q0, q1) * CELL;
      const fn = kind === 'track' ? trackLocal : kind === 'road' ? roadLocal : dirtLocal;
      const e = mk('g', {}, place(X(q0), dirOf(q0, q1), fn(len)));
      g.append(e);
      return e;
    };
    const placeIcon = (p) => {
      // biểu tượng nằm bên cạnh điểm (lệch theo hướng đường ray, ra phía giữa giấy), không nằm trên đường sẽ vẽ qua điểm
      let v = unit(m.D ?? 0);
      if ((COLS / 2 - p.x) * v.x + (ROWS / 2 - p.y) * v.y < 0) v = { x: -v.x, y: -v.y };
      const c = X(add(p, v, 1.5));
      gDeco.insertAdjacentHTML('beforeend', PLACES[m.place].icon(c.x, c.y));
    };

    let locked = false;
    let ready = false;
    const setReady = (on) => { ready = on; doneBtn.classList.toggle('g4r-wait', !on); };
    setReady(false);
    const lockAll = () => {
      locked = true;
      t.lock(true);
      acts.querySelectorAll('button').forEach(b => { b.disabled = true; });
    };

    /** Lời nhắc khi bé bấm Xong mà chưa làm xong việc. */
    let notReady = () => {};
    doneBtn.onclick = () => {
      if (locked) return;
      if (!ready) { sfx.tap(); notReady(); return; }
      sfx.tap();
      lockAll();
      finish();
    };
    let finish = async () => {};

    const realize = () => { svg.classList.add('g4r-real'); return sleep(slow(650)); };
    /** Kết thúc lượt: ok / sai + lời cô kỹ sư + thẻ kết quả (loop.js), rồi (sai) chạy cách làm đúng. */
    const conclude = (ok, text, tip, line, demo) => {
      m.ok = ok;
      if (ok) {
        const seg = scene.querySelector(`[data-seg="${m.idx}"]`);
        seg?.classList.add('g4r-seg-built');
        speak(line || 'Đúng rồi! Tàu chạy êm lắm!', 'happy');
        api.succeed(text);
      } else {
        speak(line || 'Ơ, bản vẽ này chưa đúng rồi.', 'sad');
        api.fail(text, tip);
        if (demo) setTimeout(() => { if (svg.isConnected) demo(); }, slow(700));
      }
    };

    // ── Chuyển động trên bản vẽ (toạ độ ô) ──
    /** Đặt hình `inner` (vẽ theo +x) chạy dọc đường từ p0 tới p1 trong ms; stopAt < 1 thì dừng sớm (phanh) và rung. */
    const runAlong = (inner, p0, p1, ms, { stopAt = 1, layer = gAnim, keep = false } = {}) => new Promise((res) => {
      const d = dirOf(p0, p1);
      const outer = mk('g'), mid = mk('g', {}, inner);
      outer.append(mid);
      layer.append(outer);
      const t0 = performance.now(), dur = slow(ms) * stopAt;
      const ease = (k) => (stopAt < 1 ? 1 - (1 - k) ** 2 : k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);
      const step = (now) => {
        if (!outer.isConnected) return res();
        const k = Math.min(1, (now - t0) / dur), f = ease(k) * stopAt;
        const p = X({ x: p0.x + (p1.x - p0.x) * f, y: p0.y + (p1.y - p0.y) * f });
        outer.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${d.toFixed(1)})`);
        if (k < 1) return requestAnimationFrame(step);
        if (stopAt < 1) {
          sfx.boing();
          if (!calmMotion()) mid.classList.add('g4r-shake');
          setTimeout(() => { if (!keep) outer.remove(); res(); }, slow(1100));
        } else { if (!keep) outer.remove(); res(); }
      };
      requestAnimationFrame(step);
    });
    /** Tàu chạy trọn một đường thẳng (từ mép giấy này sang mép kia). */
    const trainOn = (a, d, opts = {}) => {
      const [q0, q1] = clipLine(a, d, COLS, ROWS);
      const back = TRAIN_LEN / CELL;
      const u = unit(dirOf(q0, q1));
      sfx.swish();
      return runAlong(trainLocal(opts.look), q0, add(q1, u, back + 0.4), opts.ms || 2600, opts);
    };
    /** Đèn đỏ nhấp nháy hai bên chỗ đường ngang cắt đường ray. */
    const lights = (at, dRoad) => {
      const v = unit(dRoad), n = unit(dRoad + 90);
      const g = mk('g', { class: 'g4r-lights' });
      for (const s of [-1, 1]) {
        const p = X(add(add(at, v, s * 1.1), n, s * 0.75));
        g.insertAdjacentHTML('beforeend', `<rect x="${p.x - 9}" y="${p.y - 9}" width="18" height="18" rx="4" fill="${INK}"/><circle class="g4r-lamp" cx="${p.x}" cy="${p.y}" r="6.5" fill="#EF4444"/>`);
      }
      gAnim.append(g);
      return g;
    };

    // ── Ê ke: dáng đặt đúng (dạy lại khi sai) ──
    /** Đỉnh ở `c`, cạnh dài dọc hướng `dBase`, cạnh ngắn quay về phía `toward` (nếu có). */
    const poseFor = (c, dBase, toward) => {
      for (const rot of [dBase, dBase + 180]) {
        const s = unit(rot - 90);
        if (!toward || dist(toward, c) < 0.1 || (toward.x - c.x) * s.x + (toward.y - c.y) * s.y > 0) return { c, rot: norm(rot) };
      }
      return { c, rot: norm(dBase) };
    };

    if (import.meta.env.DEV) window.__g4rail = { m, t };
    const steps = []; // DEV: từng bước tự giải cho scripts/games-preview.html (&steps=N)
    if (import.meta.env.DEV) window.__g3drill = { step: () => steps.shift()?.() };

    // ════════ Cấp 1: kiểm tra đường ngang ════════
    if (m.kind === 'check') {
      const { O } = m;
      fullDeco(gDeco, O, m.dRoad, 'road');
      fullDeco(gDeco, O, m.dr, 'track');
      t.line('rail', O, add(O, unit(m.dr), 3), { full: true, color: 'transparent' });
      t.line('road', O, add(O, unit(m.dRoad), 3), { full: true, color: 'transparent' });
      t.point('O', O.x, O.y, { dx: -0.55, dy: -0.5 });
      t.eke({ ...PARK });
      const fitMarks = () => {
        gFit.innerHTML = '';
        if (dist(t.S.c, O) > 0.02) return;
        const legs = [{ d: norm(t.S.rot), len: L1 }, { d: norm(t.S.rot - 90), len: L2 }];
        const lines = [m.dr, m.dRoad];
        const on = legs.map(g => lines.find(d => along(g.d, d)));
        legs.forEach((g, i) => {
          if (on[i] === undefined) return;
          const e = X(add(O, unit(g.d), g.len * 0.92)), o = X(O);
          gFit.insertAdjacentHTML('beforeend', `<line x1="${o.x}" y1="${o.y}" x2="${e.x}" y2="${e.y}" stroke="#22C55E" stroke-width="12" stroke-linecap="round" opacity=".55"/>`);
        });
        const i = on.findIndex(d => d !== undefined);
        if (i < 0 || on[1 - i] !== undefined) return;
        // khe hở: giữa cạnh kia của ê ke và tia gần nhất của đường còn lại
        const other = legs[1 - i].d, rest = lines.find(d => !along(legs[i].d, d));
        const ray = Math.abs(diff(rest, other)) < 90 ? rest : norm(rest + 180);
        const gap = diff(ray, other);
        if (Math.abs(gap) > 50) return;
        const R = legs[1 - i].len * 0.95, o = X(O);
        const p1 = X(add(O, unit(other), R)), p2 = X(add(O, unit(ray), R));
        gFit.insertAdjacentHTML('beforeend', `<path d="M${o.x} ${o.y} L${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A${R * CELL} ${R * CELL} 0 0 ${gap > 0 ? 1 : 0} ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} Z" fill="#EF4444" fill-opacity=".38" stroke="#DC2626" stroke-width="3"/>`);
      };
      t.on(fitMarks);
      let choice = null;
      acts.querySelectorAll('[data-pick]').forEach(b => {
        b.onclick = () => {
          if (locked) return;
          sfx.tap();
          choice = b.dataset.pick === 'yes';
          acts.querySelectorAll('[data-pick]').forEach(x => x.classList.toggle('g4r-on', x === b));
          setReady(true);
        };
      });
      speak('Đường bộ này có vuông góc với đường ray không? Đặt ê ke vào điểm O để kiểm tra!', null, 'Đường bộ có <b>vuông góc</b> với đường ray không?');
      notReady = () => { speak('Em chọn vuông góc hay không vuông góc trước!', null, 'Chọn một ô trước!'); acts.querySelectorAll('[data-pick]').forEach(blink); };
      // Ê ke đặt ở O, một cạnh dọc đường ray: chọn 1 trong 4 hướng cho cả ê ke nằm gọn trong giấy nhất.
      const goodPose = () => {
        const room = (p) => Math.min(p.x, COLS - p.x, p.y, ROWS - p.y);
        const score = (rot) => Math.min(room(add(O, unit(rot), L1)), room(add(O, unit(rot - 90), L2)));
        const rot = [0, 90, 180, 270].map(k => norm(m.dr + k)).reduce((a, b) => (score(b) > score(a) ? b : a));
        return { c: O, rot };
      };
      finish = async () => {
        t.ekeVisible(false);
        gFit.innerHTML = '';
        await realize();
        const lg = lights(O, m.dRoad);
        await trainOn(O, m.dr);
        lg.remove();
        const v = unit(m.dRoad);
        await runAlong(bikeLocal(), add(O, v, -4.5), add(O, v, 4.5), 2200, { stopAt: m.right ? 1 : 0.5 });
        const ok = choice === m.right;
        const demo = async () => {
          const p = goodPose();
          t.eke({ ...PARK });
          t.ekeVisible(true);
          await t.moveEke(p.c, p.rot);
          if (!m.right) await t.drawAlong('fix', O, m.dr + 90, { color: '#16A34A' });
        };
        if (ok) conclude(true, m.right ? 'Đúng! Đường ngang vuông góc với đường ray, xe qua thẳng.' : 'Đúng! Đường này không vuông góc, đội thi công phải làm lại.', null,
          m.right ? 'Đúng rồi! Ê ke khít cả hai cạnh.' : 'Đúng rồi! Có khe hở nên không vuông góc.');
        else conclude(false, m.right ? 'Đường ngang này vuông góc đấy!' : 'Đường ngang này không vuông góc.',
          m.right ? 'Đặt đỉnh ê ke vào O, một cạnh dọc đường ray: cạnh kia trùng khít đường bộ.' : 'Đặt đỉnh ê ke vào O, một cạnh dọc đường ray: cạnh kia lệch khỏi đường bộ, có khe hở đỏ.',
          m.right ? 'Ơ, đường này vuông góc mà. Xem ê ke nè!' : 'Ơ, xe đạp bị khựng ở đường ray. Xem khe hở nè!', demo);
      };
      steps.push(() => { const p = goodPose(); t.eke({ c: p.c, rot: p.rot }); t.emit('eke'); },
        () => acts.querySelector(`[data-pick="${m.right ? 'yes' : 'no'}"]`).click(), () => doneBtn.click());
    }

    // ════════ Cấp 2, 4: vẽ bằng ê ke ════════
    if (m.kind === 'perp' || m.kind === 'para') {
      const name = m.kind === 'perp' ? 'H' : 'M';
      const { H, F, A, B } = m;
      if (m.dOld !== undefined) fullDeco(gDeco, H, m.dOld, 'dirt');
      fullDeco(gDeco, A, m.D, 'track');
      t.line('rail', A, B, { full: true, color: 'transparent' });
      if (m.dOld !== undefined) t.line('old', H, add(H, unit(m.dOld), 3), { full: true, color: 'transparent' });
      t.point('A', A.x, A.y, { dx: -0.5, dy: -0.55 });
      t.point('B', B.x, B.y, { dx: 0.5, dy: -0.55 });
      t.point(name, H.x, H.y, { color: '#DC2626', dx: dist(H, F) < 0.1 ? -0.55 : -0.6, dy: -0.6 });
      placeIcon(H);
      const bases = ['rail', ...(m.dOld !== undefined ? ['old'] : [])];
      t.eke({ ...PARK, bases: [...bases], through: name });
      const drawBtn = acts.querySelector('[data-act="draw"]');
      const againBtn = acts.querySelector('[data-act="again"]');
      const dots = acts.querySelectorAll('.g4r-step-dot');
      const maxDraw = m.kind === 'perp' ? 99 : 3; // cấp 2: vẽ lần nữa là thay nét cũ
      let drawn = []; // [{ id, base, p, d }]
      let busy = false;
      const sync = () => {
        drawBtn.classList.toggle('g4r-go', t.S.aligned);
        dots.forEach((d, i) => d.classList.toggle('g4r-step-done', i < drawn.length));
        setReady(drawn.length > 0);
      };
      t.on(sync);
      const placeName = PLACES[m.place].name;
      if (m.kind === 'perp') {
        const onLine = dist(H, F) < 0.1;
        speak(onLine ? `Làm đường ngang vuông góc với đường ray AB, đi qua điểm H!` : `Làm đường từ ${placeName} H, cắt vuông góc qua đường ray AB!`, null,
          onLine ? 'Vẽ đường qua <b>H</b> vuông góc với đường ray <b>AB</b>!' : `Vẽ đường từ ${placeName} <b>H</b>, vuông góc với ray <b>AB</b>!`);
      } else {
        speak('Làm đường tránh tàu song song với đường ray AB, đi qua nhà ga M!', null, 'Vẽ đường qua nhà ga <b>M</b>, song song với ray <b>AB</b>!');
      }
      drawBtn.onclick = async () => {
        if (locked || busy) return;
        if (!t.S.aligned) {
          sfx.tap();
          const L = t.LINES.rail;
          const dirOk = [0, 90, 180, 270].some(k => Math.abs(diff(t.S.rot + k, L.d)) < 0.3);
          speak(dirOk ? `Trượt ê ke dọc đường tới khi cạnh kia chạm điểm ${name}!` : 'Đặt một cạnh góc vuông của ê ke nằm dọc theo đường ray trước! Kéo núm vàng để xoay.', null,
            dirOk ? `Trượt ê ke tới điểm <b>${name}</b>!` : 'Xoay ê ke cho một cạnh nằm dọc đường ray!');
          blink(svg.querySelector('.g4s-knob'));
          return;
        }
        if (drawn.length >= maxDraw) { sfx.tap(); speak('Bấm Làm lại để vẽ lại từ đầu!', null, 'Bấm <b>↺ Làm lại</b>!'); blink(againBtn); return; }
        busy = true;
        t.lock(true);
        const base = t.S.onBase, L = t.LINES[base], p = { ...t.S.c }, d = norm(L.d + 90);
        if (m.kind === 'perp' && drawn.length) { t.LINES[drawn[0].id].el.remove(); delete t.LINES[drawn[0].id]; t.clearMarks(); drawn = []; }
        const id = `n${drawn.length + 1}`;
        await t.drawAlong(id, p, d, { color: ['#2563EB', '#7C3AED', '#DB2777'][drawn.length] });
        t.rightMark(p, L.d, d, { color: '#2563EB' });
        drawn.push({ id, base, p, d });
        if (m.kind === 'para') t.S.bases = [...bases, ...drawn.map(x => x.id)];
        t.lock(false);
        busy = false;
        sync();
        if (m.kind === 'para' && drawn.length === 1) speak('Bây giờ đặt ê ke dọc đường vừa vẽ, cạnh kia chạm M!', null, 'Lần hai: ê ke dọc đường <b>vừa vẽ</b>!');
      };
      againBtn.onclick = () => {
        if (locked || busy || !drawn.length) return;
        sfx.tap();
        for (const x of drawn) { t.LINES[x.id]?.el.remove(); delete t.LINES[x.id]; }
        drawn = [];
        t.clearMarks();
        t.S.bases = [...bases];
        t.eke({});
        sync();
      };
      sync();
      notReady = () => {
        speak('Em vẽ đường bằng ê ke trước, rồi bấm Xong!', null, 'Vẽ đường bằng ê ke trước!');
        blink(t.S.aligned ? drawBtn : svg.querySelector('.g4s-knob'));
      };

      const fixDemo = async (ids) => {
        t.ekeVisible(true);
        // nét bé vẽ mờ đi, ê ke làm lại cách đúng
        for (const x of drawn) t.LINES[x.id]?.el.setAttribute('opacity', '0.25');
        const p1 = poseFor(F, m.D, dist(H, F) < 0.1 ? null : H);
        await t.moveEke(p1.c, p1.rot);
        await t.drawAlong(ids[0], F, m.D + 90, { color: '#16A34A' });
        t.rightMark(F, m.D, m.D + 90);
        if (m.kind === 'para') {
          const p2 = poseFor(H, m.D + 90, add(H, unit(m.D), 2));
          await t.moveEke(p2.c, p2.rot);
          await t.drawAlong(ids[1], H, m.D, { color: '#16A34A' });
          t.rightMark(H, m.D + 90, m.D);
        }
      };

      finish = async () => {
        const last = drawn[drawn.length - 1];
        const through = lineDist(H, last.p, last.d) < 0.05;
        t.ekeVisible(false);
        t.clearMarks();
        await realize();
        if (m.kind === 'perp') {
          const ok = last.base === 'rail' && through;
          for (const x of drawn) t.LINES[x.id].el.setAttribute('opacity', '0');
          fullDeco(gReal, last.p, last.d, 'road');
          const X0 = meet(last.p, last.d, A, m.D) || F;
          const lg = lights(X0, last.d);
          await trainOn(A, m.D);
          lg.remove();
          if (!through) {
            // đường mới không tới chỗ cần đi: bạn nhỏ đứng ở H, lắc đầu
            const fp = foot(H, last.p, last.d);
            await runAlong(bikeLocal(), H, add(H, unit(dirOf(H, fp)), 0.01), 600, { stopAt: 0.5 });
          } else {
            const v = unit(dirOf(H, X0)), far = add(X0, v, 3.5);
            await runAlong(bikeLocal(), H, far, 2200, { stopAt: last.base === 'rail' ? 1 : dist(H, X0) / dist(H, far) });
          }
          if (ok) conclude(true, `Đường ngang vuông góc với đường ray, đi thẳng từ ${placeName}!`, null, 'Đúng rồi! Đường ngang vuông góc, đi qua H.');
          else if (last.base !== 'rail') conclude(false, 'Đường mới vuông góc với đường đất cũ, không vuông góc với đường ray.', 'Đặt cạnh ê ke dọc theo đường ray AB, không phải đường đất.', 'Ơ, đường mới cắt chéo qua đường ray rồi.', () => fixDemo(['fix']));
          else conclude(false, `Đường mới chưa đi qua ${placeName} H.`, 'Trượt ê ke dọc đường ray tới khi cạnh kia chạm điểm H, rồi mới vẽ.', `Ơ, đường mới không tới ${placeName}.`, () => fixDemo(['fix']));
          return;
        }
        // para: nét cuối là đường tránh tàu; các nét trước là nét phụ (mờ, đứt nét)
        const para = along(last.d, m.D);
        const ok = para && through;
        drawn.forEach((x, i) => {
          const e = t.LINES[x.id].el;
          if (i < drawn.length - 1) { e.setAttribute('stroke-dasharray', '14 12'); e.setAttribute('opacity', '0.45'); } else e.setAttribute('opacity', '0');
        });
        fullDeco(gReal, last.p, last.d, 'track');
        const [q0, q1] = clipLine(last.p, last.d, COLS, ROWS);
        const runMain = trainOn(A, m.D);
        const look = { color: '#38BDF8', car: '#FDE68A' };
        if (para) {
          // hai đoàn tàu chạy ngược chiều trên hai đường
          await Promise.all([runMain, trainOn(last.p, m.D + 180, { look, ms: 2900 })]);
        } else {
          await runMain;
          const X0 = meet(last.p, last.d, A, m.D);
          const far = dist(q0, X0) > dist(q1, X0) ? q0 : q1;
          const u = unit(dirOf(far, X0));
          const stop = add(X0, u, -1.2);
          await runAlong(trainLocal(look), add(far, u, -0.2), stop, 1800, { stopAt: 0.999, keep: true });
        }
        if (ok) conclude(true, 'Đường tránh tàu song song với đường ray, đi qua nhà ga M. Hai tàu tránh nhau an toàn!', null, 'Đúng rồi! Hai đường ray song song, không bao giờ gặp nhau.');
        else if (!para && drawn.length === 1 && along(last.d, m.D + 90)) conclude(false, 'Đường này vuông góc với đường ray, chưa song song.', 'Vẽ thêm một lần: đặt cạnh ê ke dọc đường vừa vẽ, cạnh kia chạm M.', 'Ơ, mới vẽ một lần thôi.', () => fixDemo(['fix1', 'fix2']));
        else if (para) conclude(false, 'Đường mới song song với đường ray nhưng chưa đi qua nhà ga M.', 'Hai lần đặt ê ke, cạnh kia đều phải chạm điểm M.', 'Ơ, đường tránh không đi qua nhà ga.', () => fixDemo(['fix1', 'fix2']));
        else conclude(false, 'Đường mới không song song với đường ray, tàu phải phanh gấp.', 'Lần 1 đặt ê ke dọc đường ray AB. Lần 2 đặt ê ke dọc đường vừa vẽ.', 'Ơ, đường tránh đâm vào đường chính rồi.', () => fixDemo(['fix1', 'fix2']));
      };

      const solve1 = () => { const p = poseFor(F, m.D, dist(H, F) < 0.1 ? null : H); t.eke({ c: p.c, rot: p.rot }); t.emit('eke'); };
      steps.push(solve1, () => drawBtn.click());
      if (m.kind === 'para') steps.push(() => {}, () => { const p = poseFor(H, m.D + 90, add(H, unit(m.D), 2)); t.eke({ c: p.c, rot: p.rot }); t.emit('eke'); }, () => drawBtn.click());
      steps.push(() => {}, () => doneBtn.click());
    }

    // ════════ Cấp 3: chọn cặp ray song song ════════
    if (m.kind === 'pair') {
      t.ekeVisible(false);
      t.lock(true);
      const segs = m.segs;
      const sel = [];
      let meetDot = null;
      const glow = [], bars = [];
      segs.forEach((s, i) => {
        const a = X(s.a), len = dist(s.a, s.b) * CELL, d = dirOf(s.a, s.b);
        const gl = mk('g', { class: 'g4r-glow' }, place(a, d, `<rect x="-12" y="-22" width="${len + 24}" height="44" rx="20" fill="#FB923C"/>`));
        gDeco.append(gl); glow.push(gl);
        const bar = mk('g', {}, place(a, d, barLocal(len)));
        gDeco.append(bar); bars.push(bar);
        t.line(`b${i}`, s.a, s.b, { color: 'transparent' });
        const hit = mk('line', { x1: a.x, y1: a.y, x2: X(s.b).x, y2: X(s.b).y, stroke: 'transparent', 'stroke-width': 56, 'stroke-linecap': 'round', 'data-bar': i });
        gHits.append(hit);
      });
      const extBtn = acts.querySelector('[data-act="extend"]');
      const slots = acts.querySelectorAll('.g4r-slot');
      const clearExt = () => {
        segs.forEach((_, i) => { const L = t.LINES[`b${i}`]; L.ext?.remove(); delete L.ext; });
        meetDot?.remove(); meetDot = null;
      };
      const sync = () => {
        glow.forEach((g, i) => g.classList.toggle('g4r-on', sel.includes(i)));
        slots.forEach((s, k) => s.classList.toggle('g4r-slot-on', k < sel.length));
        extBtn.classList.toggle('g4r-go', sel.length === 2);
        setReady(sel.length === 2);
      };
      let busy = false;
      gHits.addEventListener('click', (e) => {
        const h = e.target.closest('[data-bar]');
        if (!h || locked || busy) return;
        const i = +h.dataset.bar;
        sfx.tap();
        clearExt();
        const k = sel.indexOf(i);
        if (k >= 0) sel.splice(k, 1);
        else { if (sel.length === 2) sel.shift(); sel.push(i); }
        sync();
      });
      /** Kéo dài hai thanh đang chọn; cắt nhau trong giấy thì chấm đỏ ở chỗ gặp. */
      const extendPair = async (pair, color = '#F97316') => {
        await Promise.all(pair.map(i => t.extend(`b${i}`, { color })));
        const [s1, s2] = pair.map(i => segs[i]);
        const P = meet(s1.a, s1.d, s2.a, s2.d);
        if (P && inside(P, 0)) {
          const c = X(P);
          meetDot = mk('g', { class: 'g4r-meet' }, `<circle cx="${c.x}" cy="${c.y}" r="16" fill="#EF4444" stroke="#fff" stroke-width="5"/><circle cx="${c.x}" cy="${c.y}" r="30" fill="none" stroke="#EF4444" stroke-width="4" class="g4r-ring"/>`);
          gFit.append(meetDot);
          sfx.pop(2);
          return true;
        }
        sfx.ding();
        return false;
      };
      extBtn.onclick = async () => {
        if (locked || busy) return;
        if (sel.length < 2) { sfx.tap(); speak('Chạm chọn hai thanh ray trước!', null, 'Chạm chọn <b>hai</b> thanh ray!'); bars.forEach(b => blink(b)); return; }
        busy = true;
        clearExt();
        const met = await extendPair([...sel]);
        speak(met ? 'Hai thanh này kéo dài thì gặp nhau.' : 'Hai thanh này kéo dài tới mép giấy vẫn không gặp nhau.', null, met ? 'Hai thanh <b>gặp nhau</b>.' : 'Hai thanh <b>không gặp nhau</b>.');
        busy = false;
      };
      speak('Chọn hai thanh ray song song để ghép thành đường tàu!', null, 'Chọn hai thanh ray <b>song song</b>!');
      notReady = () => { speak('Chạm chọn hai thanh ray trước!', null, 'Chạm chọn <b>hai</b> thanh ray!'); bars.forEach(b => blink(b)); };
      sync();
      finish = async () => {
        const pick = [...sel].sort();
        const ok = pick[0] === m.good[0] && pick[1] === m.good[1];
        clearExt();
        await realize();
        // tà vẹt nối hai thanh: điểm tương ứng trên hai thanh (cùng chiều)
        let [s1, s2] = pick.map(i => segs[i]);
        if ((s1.b.x - s1.a.x) * (s2.b.x - s2.a.x) + (s1.b.y - s1.a.y) * (s2.b.y - s2.a.y) < 0) s2 = { ...s2, a: s2.b, b: s2.a };
        const n = 9;
        let ties = '';
        for (let k = 0; k <= n; k++) {
          const f = k / n, p = X(add(s1.a, { x: s1.b.x - s1.a.x, y: s1.b.y - s1.a.y }, f)), q = X(add(s2.a, { x: s2.b.x - s2.a.x, y: s2.b.y - s2.a.y }, f));
          ties += `<line x1="${p.x.toFixed(1)}" y1="${p.y.toFixed(1)}" x2="${q.x.toFixed(1)}" y2="${q.y.toFixed(1)}" stroke="#B07A45" stroke-width="14" stroke-linecap="round"/>`;
        }
        const tieG = mk('g', { class: 'g4r-ties' }, ties);
        gDeco.insertBefore(tieG, gDeco.firstChild);
        sfx.pop(1);
        await sleep(slow(600));
        const m0 = { x: (s1.a.x + s2.a.x) / 2, y: (s1.a.y + s2.a.y) / 2 }, m1 = { x: (s1.b.x + s2.b.x) / 2, y: (s1.b.y + s2.b.y) / 2 };
        const u = unit(dirOf(m0, m1));
        const gap = Math.min(dist(s1.a, s2.a), dist(s1.b, s2.b));
        const k = Math.max(0.45, Math.min(1.3, (gap * CELL * 0.55) / 40));
        glow.forEach(g => g.classList.remove('g4r-on'));
        await runAlong(`<g transform="scale(${k.toFixed(2)})">${trainLocal()}</g>`, add(m0, u, -0.3), add(m1, u, ok ? TRAIN_LEN / CELL + 0.3 : 0), ok ? 2600 : 2000, { stopAt: ok ? 1 : 0.55, keep: !ok });
        if (ok) conclude(true, 'Hai thanh ray song song, cách đều nhau. Tàu chạy êm!', null, 'Đúng rồi! Kéo dài mãi cũng không gặp nhau.');
        else {
          conclude(false, 'Hai thanh này không song song, chỗ ray chụm lại làm tàu khựng.', 'Kéo dài hai thanh: thanh nào gặp nhau thì không song song. Cặp đúng tô xanh lá.', 'Ơ, hai thanh này chụm lại rồi.', async () => {
            await extendPair(pick, '#F97316');
            glow.forEach((g, i) => { g.classList.toggle('g4r-on', false); g.classList.toggle('g4r-good', m.good.includes(i)); });
            await Promise.all(m.good.map(i => t.extend(`b${i}`, { color: '#16A34A' })));
          });
        }
      };
      steps.push(() => gHits.querySelector(`[data-bar="${m.good[0]}"]`).dispatchEvent(new MouseEvent('click', { bubbles: true })),
        () => gHits.querySelector(`[data-bar="${m.good[1]}"]`).dispatchEvent(new MouseEvent('click', { bubbles: true })),
        () => extBtn.click(), () => {}, () => doneBtn.click());
    }
  },
};

/** Cột nút: chỗ cho từng cấp giữ sẵn từ đầu lượt, nút Xong luôn ở dưới cùng. */
function actsHtml(kind) {
  const done = '<button type="button" class="g4r-done" data-act="done">✔ Xong</button>';
  if (kind === 'check') {
    return `
      <button type="button" class="g4r-big g4r-pick" data-pick="yes"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M20 4 V36 M4 36 H36" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M20 26 H30 V36" fill="none" stroke="#16A34A" stroke-width="4"/></svg><span>Vuông góc</span></button>
      <button type="button" class="g4r-big g4r-pick" data-pick="no"><svg viewBox="0 0 40 40" aria-hidden="true"><path d="M27 4 L15 36 M4 36 H36" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M14 6 L26 18 M26 6 L14 18" stroke="#DC2626" stroke-width="4" stroke-linecap="round" transform="translate(-8 0)"/></svg><span>Không vuông góc</span></button>
      ${done}`;
  }
  if (kind === 'pair') {
    return `
      <button type="button" class="g4r-big g4r-tool" data-act="extend"><span class="g4r-ext-ic" aria-hidden="true">↔️</span><span>Kéo dài</span>
        <span class="g4r-slots" aria-hidden="true"><i class="g4r-slot"></i><i class="g4r-slot"></i></span></button>
      ${done}`;
  }
  const dots = kind === 'para' ? '<span class="g4r-steps" aria-hidden="true"><i class="g4r-step-dot">1</i><i class="g4r-step-dot">2</i></span>' : '';
  return `
    <button type="button" class="g4r-big g4r-tool" data-act="draw"><span aria-hidden="true">✏️</span><span>Vẽ theo ê ke</span>${dots}</button>
    <button type="button" class="g4r-small" data-act="again">↺ ${kind === 'para' ? 'Làm lại' : 'Vẽ lại'}</button>
    ${done}`;
}

function injectRailStyles() {
  css('g4-rail', `
    /* Ngang: bản vẽ cao hết hàng, rộng theo tỉ lệ giấy (--bw, đo bằng JS); cột cô kỹ sư nhận phần còn lại (tối đa 34rem, dư thì cảnh hai bên). */
    .g4r-scene { position: relative; flex: 1; min-height: 0; display: grid; grid-template-columns: var(--bw, minmax(0, 1fr)) minmax(13rem, 34rem); grid-template-rows: minmax(0, 1fr) auto; justify-content: center;
      gap: 0.5rem 0.7rem; padding: 0.55rem; border-radius: 1rem; overflow: hidden; background: linear-gradient(180deg, #8FD3F4 0%, #D6F1FF 60%, #E8F7D4 100%); font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g4r-back { position: absolute; inset: 0; width: 100%; height: 100%; display: block; pointer-events: none; }
    .g4r-board { grid-column: 1; grid-row: 1; position: relative; z-index: 1; min-width: 0; min-height: 0; display: flex; box-sizing: border-box; background: #fff; border-radius: 1.1rem; padding: 0.3rem;
      box-shadow: 0 6px 0 rgba(30, 58, 95, 0.18), 0 12px 26px rgba(0, 0, 0, 0.14); }
    .g4r-paper { flex: 1; min-width: 0; min-height: 0; display: flex; }
    .g4r-board .g4s-cap { display: none; }
    .g4r-route { grid-column: 1; grid-row: 2; z-index: 1; height: clamp(2.4rem, 8.5vh, 4.6rem); display: flex; }
    .g4r-route-svg { width: 100%; height: 100%; filter: drop-shadow(0 3px 0 rgba(30, 58, 95, 0.15)); }
    .g4r-seg-build { transition: opacity .6s; }
    .g4r-seg-built .g4r-seg-build { opacity: 1; }
    .g4r-seg-now > rect { animation: g4rDash 1.2s linear infinite; }
    @keyframes g4rDash { to { stroke-dashoffset: -28; } }
    .g4r-side { grid-column: 2; grid-row: 1 / span 2; position: relative; z-index: 2; display: flex; flex-direction: column; gap: 0.5rem; min-height: 0; container-type: size; }
    .g4r-npc { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; align-items: stretch; }
    .g4r-bubble { position: relative; flex: none; background: #fff; border-radius: 1rem; padding: 0.45rem 0.7rem 0.55rem; color: #1E293B; font-weight: 700; line-height: 1.3;
      font-size: clamp(0.85rem, min(5.4cqi, 4.4cqh), 1.45rem); min-height: 3.9em; box-shadow: 0 4px 0 rgba(30, 58, 95, 0.15); }
    .g4r-bubble::after { content: ''; position: absolute; left: 50%; bottom: -10px; border: 10px solid transparent; border-bottom: 0; border-top-color: #fff; transform: translateX(-50%); }
    .g4r-name { display: block; font-size: 0.72em; color: #0369A1; }
    .g4r-say b { color: #DC2626; }
    .g4r-npc-pic { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; align-items: flex-end; padding-top: 0.6rem; }
    .g4r-npc-pic img { height: 100%; width: auto; max-width: 100%; object-fit: contain; object-position: bottom; }
    .g4r-acts { flex: none; display: flex; flex-direction: column; gap: 0.5rem; }
    .g3g-has-result .g4r-acts { visibility: hidden; }
    .g4r-big { display: flex; align-items: center; gap: 0.6rem; width: 100%; border: 4px solid #fff; border-radius: 1.1rem; background: #fff; color: #1E293B; cursor: pointer; font-weight: 800;
      font-size: clamp(0.95rem, min(6.2cqi, 6.4cqh), 1.6rem); padding: clamp(0.3rem, 2.2cqh, 0.8rem) 0.8rem; box-shadow: 0 6px 0 #93C5FD, 0 10px 18px rgba(2, 132, 199, 0.15); transition: transform .1s, box-shadow .1s, background .15s; text-align: left; line-height: 1.15; }
    .g4r-big svg { width: 2.1em; height: 2.1em; flex: none; }
    .g4r-big:active { transform: translateY(4px); box-shadow: 0 2px 0 #93C5FD; }
    .g4r-pick.g4r-on { background: #FEF3C7; border-color: #F59E0B; box-shadow: 0 6px 0 #D97706, 0 10px 18px rgba(217, 119, 6, 0.25); }
    .g4r-tool.g4r-go { background: #E0F2FE; border-color: #38BDF8; }
    .g4r-tool > span:first-child { font-size: 1.35em; }
    .g4r-slots, .g4r-steps { margin-left: auto; display: flex; gap: 0.3rem; }
    .g4r-slot { width: 1.6em; height: 0.55em; border-radius: 0.3em; background: #E2E8F0; border: 2px solid #CBD5E1; }
    .g4r-slot-on { background: #FB923C; border-color: #C2410C; }
    .g4r-step-dot { font-style: normal; width: 1.45em; height: 1.45em; border-radius: 50%; display: grid; place-items: center; font-size: 0.8em; background: #E2E8F0; color: #64748B; }
    .g4r-step-done { background: #2563EB; color: #fff; }
    .g4r-small { align-self: center; border: 0; border-radius: 999px; background: #fff; color: #334155; font-weight: 800; cursor: pointer; padding: 0.3rem 1.1rem; font-size: clamp(0.9rem, 4.6cqi, 1.2rem); box-shadow: 0 4px 0 #CBD5E1; }
    .g4r-done { width: 100%; border: 4px solid #fff; border-radius: 1.1rem; background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; font-weight: 800; cursor: pointer;
      font-size: clamp(1.05rem, min(7cqi, 7cqh), 1.8rem); padding: clamp(0.25rem, 2cqh, 0.7rem) 0.8rem; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); box-shadow: 0 6px 0 #15803D, 0 10px 18px rgba(21, 128, 61, 0.25); }
    .g4r-done:active { transform: translateY(4px); box-shadow: 0 2px 0 #15803D; }
    .g4r-done.g4r-wait { background: linear-gradient(180deg, #CBD5E1, #94A3B8); box-shadow: 0 6px 0 #64748B; }
    .g4r-acts button:disabled { cursor: default; }
    .g4r-blink { animation: g4rBlink .5s ease-in-out 3; }
    @keyframes g4rBlink { 50% { filter: drop-shadow(0 0 10px #F97316) brightness(1.15); transform: scale(1.06); } }
    .g4r-sblink { animation: g4rSBlink .5s ease-in-out 3; }
    @keyframes g4rSBlink { 50% { filter: drop-shadow(0 0 12px #F97316) brightness(1.2); } }
    .g4r-side > .g3g-result { position: absolute; z-index: 5; left: 0; right: 0; bottom: 0; max-height: 100%; overflow-y: auto; border-width: 3px; border-radius: 1.2rem; text-align: center; align-items: stretch;
      box-shadow: 0 6px 0 rgba(0, 0, 0, 0.1), 0 16px 36px rgba(0, 0, 0, 0.25); animation: g4rCard .35s cubic-bezier(.2, 1.4, .4, 1); }
    .g4r-side > .g3g-result .g3g-result-text { font-size: clamp(1rem, 5.4cqi, 1.4rem); }
    .g4r-side > .g3g-result .g3g-tip { font-size: clamp(0.92rem, 4.8cqi, 1.25rem); }
    .g4r-side > .g3g-result .g3g-btn { white-space: normal; font-size: clamp(1rem, 5.6cqi, 1.4rem); }
    @keyframes g4rCard { from { transform: translateY(30px); opacity: 0; } }
    /* bản vẽ "thành thật" */
    .g4s-svg > rect:first-of-type { transition: fill .6s; }
    .g4s-grid { transition: opacity .6s; }
    .g4r-real > rect:first-of-type { fill: #C9EBA5; }
    .g4r-real .g4s-grid { opacity: 0.18; }
    .g4r-glow { opacity: 0; transition: opacity .2s; }
    .g4r-glow.g4r-on { opacity: 0.75; }
    .g4r-glow.g4r-good { opacity: 0.75; }
    .g4r-glow.g4r-good rect { fill: #4ADE80; }
    .g4r-hits line { cursor: pointer; pointer-events: stroke; }
    .g4r-lamp { animation: g4rLamp .5s steps(1) infinite; }
    @keyframes g4rLamp { 50% { fill: #450A0A; } }
    .g4r-shake { animation: g4rShake .5s ease-in-out 2; }
    @keyframes g4rShake { 25% { transform: translate(0, -5px) rotate(-4deg); } 75% { transform: translate(0, 5px) rotate(4deg); } }
    .g4r-ring { animation: g4rRing 1s ease-out infinite; transform-box: fill-box; transform-origin: center; }
    @keyframes g4rRing { from { transform: scale(0.5); opacity: 1; } to { transform: scale(1.4); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .g4r-lamp, .g4r-ring, .g4r-seg-now > rect { animation-duration: 1.6s; } }
    @media (orientation: portrait) {
      .g4r-scene { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr) auto; }
      .g4r-scene { --bw: minmax(0, 1fr) !important; }
      .g4r-board { grid-row: 1; aspect-ratio: ${COLS + 0.8} / ${ROWS + 0.8}; }
      .g4r-side { grid-column: 1; grid-row: 2; flex-direction: row; align-items: stretch; }
      .g4r-npc { flex: 0 0 42%; }
      .g4r-acts { flex: 1 1 0; justify-content: center; }
      .g4r-bubble { font-size: clamp(0.95rem, 4.2cqh, 1.4rem); }
      .g4r-big { font-size: clamp(1.05rem, 6cqh, 1.6rem); }
      .g4r-done { font-size: clamp(1.1rem, 6.6cqh, 1.8rem); }
      .g4r-route { grid-row: 3; }
    }
  `);
}
